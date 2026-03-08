// ═══════════════════════════════════════════════════════════════
// 🏍️ GHL EMAIL SERVICE — Direct Dispatch via HighLevel API v2
// Contact upsert + HTML email send via Conversations API
// ═══════════════════════════════════════════════════════════════

import { loadSettings } from './settings.js';

const GHL_API_BASE = 'https://services.leadconnectorhq.com';
const GHL_API_VERSION = '2021-07-28';

// ─── GHL API Call Helper ──────────────────────────────────────
async function ghlFetch(endpoint, method, body = null) {
    const settings = loadSettings();
    const token = settings.ghlToken;

    if (!token) {
        throw new Error('GHL Private Integration Token not configured. Go to Settings → GHL Integration.');
    }

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Version': GHL_API_VERSION
    };

    const options = { method, headers };
    if (body) options.body = JSON.stringify(body);

    const response = await fetch(`${GHL_API_BASE}${endpoint}`, options);

    if (response.status === 429) {
        throw new Error('GHL rate limit hit (100 requests/10s). Wait a moment and retry.');
    }

    if (response.status === 401) {
        throw new Error('GHL token expired or invalid. Rotate your token in GHL Settings → Private Integrations.');
    }

    if (response.status === 403) {
        throw new Error('GHL token lacks required permissions. Ensure conversations/message.write and contacts.write scopes are enabled.');
    }

    if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.message || error.msg || `GHL API error: ${response.status}`);
    }

    return response.json();
}


// ═══════════════════════════════════════════════════════════════
// CONTACT UPSERT — Resolve or create contact by email
// ═══════════════════════════════════════════════════════════════

/**
 * Upsert a contact in GHL by email address.
 * Returns the contactId needed for messaging.
 */
export async function upsertContact({ email, firstName, lastName, tags = [] }) {
    const settings = loadSettings();
    const locationId = settings.ghlLocationId;

    if (!locationId) {
        throw new Error('GHL Location ID not configured. Go to Settings → GHL Integration.');
    }

    const body = {
        locationId,
        email,
        source: 'Rider Social Media Machine'
    };

    if (firstName) body.firstName = firstName;
    if (lastName) body.lastName = lastName;
    if (tags.length > 0) body.tags = tags;

    const data = await ghlFetch('/contacts/upsert', 'POST', body);
    const contactId = data.contact?.id;

    if (!contactId) {
        throw new Error('Failed to resolve contact ID from GHL upsert response.');
    }

    return {
        contactId,
        isNew: data.new || false,
        contact: data.contact
    };
}


// ═══════════════════════════════════════════════════════════════
// SEND EMAIL — Direct dispatch via Conversations API
// ═══════════════════════════════════════════════════════════════

/**
 * Send an HTML email to a specific contact via GHL Conversations API.
 * Requires a resolved contactId from upsertContact().
 */
export async function sendEmail({ contactId, subject, html, emailFrom }) {
    const settings = loadSettings();

    if (!contactId) {
        throw new Error('Contact ID is required. Upsert the contact first.');
    }

    // Use configured sender or fall back
    const sender = emailFrom || settings.ghlEmailFrom;
    if (!sender) {
        throw new Error('Sender email address not configured. Go to Settings → GHL Integration → Verified Sender Email.');
    }

    const body = {
        type: 'Email',
        contactId,
        emailFrom: sender,
        subject,
        html
    };

    const data = await ghlFetch('/conversations/messages', 'POST', body);

    return {
        messageId: data.message?.id || data.id,
        conversationId: data.conversationId || data.message?.conversationId,
        status: data.message?.status || 'queued'
    };
}


// ═══════════════════════════════════════════════════════════════
// FULL DISPATCH — Upsert contact + send email in one call
// ═══════════════════════════════════════════════════════════════

/**
 * One-shot: resolve the contact and send the email.
 * If contact doesn't exist in GHL, it gets created.
 */
export async function dispatchEmail({ recipientEmail, recipientName, subject, html, tags = [] }) {
    // Step 1: Parse name
    const nameParts = (recipientName || '').trim().split(/\s+/);
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';

    // Step 2: Upsert contact
    const { contactId, isNew } = await upsertContact({
        email: recipientEmail,
        firstName,
        lastName,
        tags: ['rider-social-media-machine', ...tags]
    });

    // Step 3: Send email
    const result = await sendEmail({
        contactId,
        subject,
        html
    });

    return {
        ...result,
        contactId,
        isNewContact: isNew,
        recipientEmail
    };
}


// ═══════════════════════════════════════════════════════════════
// BULK DISPATCH — Send to multiple contacts with rate limiting
// ═══════════════════════════════════════════════════════════════

/**
 * Send the same email to multiple recipients with rate limiting.
 * Implements exponential backoff and drip-style batching.
 * 
 * @param {Array} recipients - [{email, name}]
 * @param {string} subject - Email subject (supports {{contact.first_name}} merge tags)
 * @param {string} html - HTML email body
 * @param {Function} onProgress - Progress callback
 * @param {number} batchSize - Contacts per batch (default: 10)
 * @param {number} delayMs - Delay between batches in ms (default: 2000)
 */
export async function bulkDispatchEmails({ recipients, subject, html, tags = [], onProgress, batchSize = 10, delayMs = 2000 }) {
    const results = [];
    let successCount = 0;
    let errorCount = 0;

    for (let i = 0; i < recipients.length; i++) {
        const { email, name } = recipients[i];

        try {
            const result = await dispatchEmail({
                recipientEmail: email,
                recipientName: name,
                subject,
                html,
                tags
            });

            results.push({ email, status: 'sent', ...result });
            successCount++;
        } catch (err) {
            // Handle rate limiting with exponential backoff
            if (err.message.includes('rate limit')) {
                onProgress?.({
                    current: i + 1,
                    total: recipients.length,
                    message: `Rate limited — waiting 10s before retry...`,
                    warning: true
                });
                await new Promise(r => setTimeout(r, 10000));

                // Retry once
                try {
                    const result = await dispatchEmail({
                        recipientEmail: email,
                        recipientName: name,
                        subject,
                        html,
                        tags
                    });
                    results.push({ email, status: 'sent', ...result });
                    successCount++;
                } catch (retryErr) {
                    results.push({ email, status: 'error', error: retryErr.message });
                    errorCount++;
                }
            } else {
                results.push({ email, status: 'error', error: err.message });
                errorCount++;
            }
        }

        // Progress callback
        onProgress?.({
            current: i + 1,
            total: recipients.length,
            successCount,
            errorCount,
            message: `Sent ${successCount}/${i + 1} emails`
        });

        // Drip delay between sends (skip on last item)
        if (i < recipients.length - 1) {
            // Add extra delay every batch
            const isEndOfBatch = (i + 1) % batchSize === 0;
            await new Promise(r => setTimeout(r, isEndOfBatch ? delayMs * 2 : delayMs));
        }
    }

    return {
        total: recipients.length,
        sent: successCount,
        errors: errorCount,
        results
    };
}


// ═══════════════════════════════════════════════════════════════
// CONTACT SEARCH — Find contacts by tag or list
// ═══════════════════════════════════════════════════════════════

/**
 * Search GHL contacts by query string.
 */
export async function searchContacts(query, limit = 20) {
    const settings = loadSettings();
    const locationId = settings.ghlLocationId;

    if (!locationId) throw new Error('GHL Location ID not configured.');

    const data = await ghlFetch(
        `/contacts/?locationId=${locationId}&query=${encodeURIComponent(query)}&limit=${limit}`,
        'GET'
    );

    return (data.contacts || []).map(c => ({
        id: c.id,
        email: c.email,
        name: `${c.firstName || ''} ${c.lastName || ''}`.trim(),
        tags: c.tags || [],
        dnd: c.dnd || false
    }));
}

/**
 * Get contacts by tag for bulk emailing.
 */
export async function getContactsByTag(tag, limit = 100) {
    const settings = loadSettings();
    const locationId = settings.ghlLocationId;

    if (!locationId) throw new Error('GHL Location ID not configured.');

    const data = await ghlFetch(
        `/contacts/?locationId=${locationId}&query=${encodeURIComponent(tag)}&limit=${limit}`,
        'GET'
    );

    return (data.contacts || [])
        .filter(c => !c.dnd) // Respect DND settings
        .map(c => ({
            id: c.id,
            email: c.email,
            name: `${c.firstName || ''} ${c.lastName || ''}`.trim(),
            tags: c.tags || []
        }));
}
