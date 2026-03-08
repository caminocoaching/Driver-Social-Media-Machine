// ═══════════════════════════════════════════════════════════════
// 🏁 DRIVER SOCIAL MEDIA ENGINE — Review Scanner
// Weekly Trustpilot review scraper and content extractor
// ═══════════════════════════════════════════════════════════════

const TRUSTPILOT_URL = 'https://uk.trustpilot.com/review/caminocoaching.co.uk';
const STORAGE_KEY = 'driverSocialMedia_reviews';
const SCAN_INTERVAL_DAYS = 7;

// ─── Load Saved Reviews ──────────────────────────────────────
export function loadSavedReviews() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return { reviews: [], lastScanned: null, totalCount: 0, rating: 0 };
        return JSON.parse(raw);
    } catch (e) {
        console.warn('Failed to load saved reviews:', e);
        return { reviews: [], lastScanned: null, totalCount: 0, rating: 0 };
    }
}

// ─── Save Reviews ────────────────────────────────────────────
function saveReviews(data) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
        console.warn('Failed to save reviews:', e);
    }
}

// ─── Check If Scan Is Due ────────────────────────────────────
export function isScanDue() {
    const data = loadSavedReviews();
    if (!data.lastScanned) return true;

    const lastScan = new Date(data.lastScanned);
    const now = new Date();
    const daysSince = (now - lastScan) / (1000 * 60 * 60 * 24);
    return daysSince >= SCAN_INTERVAL_DAYS;
}

// ─── Scan Trustpilot Reviews via CORS Proxy ──────────────────
// Note: Trustpilot blocks direct browser fetches (CORS).
// This uses a lightweight proxy approach. In production, you'd
// use a server-side function or scheduled task.
export async function scanTrustpilotReviews() {
    // Try fetching via AllOrigins proxy (free CORS proxy)
    const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(TRUSTPILOT_URL)}`;

    try {
        const response = await fetch(proxyUrl, {
            signal: AbortSignal.timeout(15000)
        });

        if (!response.ok) {
            throw new Error(`Proxy returned ${response.status}`);
        }

        const html = await response.text();
        const reviews = parseTrustpilotHTML(html);

        const data = {
            reviews: reviews.items,
            totalCount: reviews.totalCount,
            rating: reviews.rating,
            fiveStarPercent: reviews.fiveStarPercent,
            lastScanned: new Date().toISOString(),
            source: 'trustpilot-auto'
        };

        saveReviews(data);
        return data;
    } catch (err) {
        console.warn('Auto-scan failed (CORS proxy issue):', err.message);
        // Fall back: return saved data with scan attempt noted
        const saved = loadSavedReviews();
        saved.lastScanAttempt = new Date().toISOString();
        saved.lastScanError = err.message;
        return saved;
    }
}

// ─── Parse Trustpilot HTML ───────────────────────────────────
function parseTrustpilotHTML(html) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    const items = [];

    // Try to extract review cards
    const reviewCards = doc.querySelectorAll('[data-review-id], .styles_cardWrapper__LcCPA, article');

    reviewCards.forEach(card => {
        try {
            const titleEl = card.querySelector('h2, [data-service-review-title-typography]');
            const bodyEl = card.querySelector('[data-service-review-text-typography], p');
            const authorEl = card.querySelector('[data-consumer-name-typography], span');
            const dateEl = card.querySelector('time');

            if (titleEl || bodyEl) {
                items.push({
                    title: titleEl?.textContent?.trim() || '',
                    body: bodyEl?.textContent?.trim() || '',
                    author: authorEl?.textContent?.trim() || 'Anonymous',
                    date: dateEl?.getAttribute('datetime') || '',
                    rating: 5 // All reviews are 5-star
                });
            }
        } catch (e) {
            // Skip malformed cards
        }
    });

    // Extract overall stats
    let totalCount = 92; // Default from known data
    let rating = 4.9;
    let fiveStarPercent = 100;

    const totalMatch = html.match(/(\d+)\s*(?:total|reviews)/i);
    if (totalMatch) totalCount = parseInt(totalMatch[1]);

    const ratingMatch = html.match(/TrustScore\s*(\d+\.?\d*)|(\d+\.?\d*)\s*out\s*of\s*5/i);
    if (ratingMatch) rating = parseFloat(ratingMatch[1] || ratingMatch[2]);

    return { items, totalCount, rating, fiveStarPercent };
}

// ─── Manual Review Entry ─────────────────────────────────────
// For when auto-scan fails, user can paste reviews manually
export function addManualReview(review) {
    const data = loadSavedReviews();

    // Check for duplicates by title
    const exists = data.reviews.some(r =>
        r.title === review.title && r.author === review.author
    );

    if (!exists) {
        data.reviews.unshift({
            ...review,
            addedManually: true,
            addedAt: new Date().toISOString()
        });
        data.totalCount = Math.max(data.totalCount, data.reviews.length);
        saveReviews(data);
    }

    return data;
}

// ─── Extract Content Angles from Review ──────────────────────
// Categorises a review by how the AI should use it
export function categoriseReview(review) {
    const text = `${review.title} ${review.body}`.toLowerCase();

    const angles = [];

    // Check for case study potential (specific results mentioned)
    if (text.match(/podium|win|first|1st|2nd|3rd|personal best|pb|improved|results|lap time/)) {
        angles.push('case-study');
    }

    // Check for hook potential (emotional/transformational language)
    if (text.match(/game changer|changed|transformed|fierceness|joy|never before|breakthrough|unlocked/)) {
        angles.push('hook');
    }

    // Check for proof-point potential (specific benefits described)
    if (text.match(/relaxed|focused|confidence|mindset|discipline|consistent|process|routine/)) {
        angles.push('proof-point');
    }

    // Check for objection handling (scepticism overcome)
    if (text.match(/hesitant|sceptic|fence|wasn't sure|doubted|at first/)) {
        angles.push('objection-handling');
    }

    return {
        ...review,
        contentAngles: angles.length > 0 ? angles : ['general'],
        analysedAt: new Date().toISOString()
    };
}

// ─── Get Reviews for AI Context ──────────────────────────────
// Returns a summary string suitable for injection into AI prompts
export function getReviewContextForAI(pillarId = null) {
    const data = loadSavedReviews();

    let summary = `Trustpilot: ${data.totalCount || 92} reviews, ${data.rating || 4.9}/5, 100% five-star.\n`;

    if (data.reviews && data.reviews.length > 0) {
        // Get most recent 5 reviews, optionally filtered
        const recent = data.reviews.slice(0, 5);
        summary += 'Recent review themes: ';
        summary += recent.map(r => `"${r.title}" (${r.author})`).join(', ');
    }

    return summary;
}

// ─── Render Review Scanner UI ────────────────────────────────
export function renderReviewScanner(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const data = loadSavedReviews();
    const scanDue = isScanDue();

    container.innerHTML = `
    <div class="review-scanner-card" style="background: var(--bg-secondary); border-radius: 8px; padding: 1rem; margin-top: 1rem; border: 1px solid var(--border);">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
        <h3 style="margin: 0; font-size: 0.9rem; color: var(--text-primary);">⭐ Review Scanner</h3>
        <div style="display: flex; gap: 0.5rem; align-items: center;">
          ${scanDue ? '<span style="font-size: 0.65rem; color: var(--accent); background: rgba(255,68,68,0.1); padding: 2px 6px; border-radius: 4px;">Scan due</span>' : '<span style="font-size: 0.65rem; color: var(--green); background: rgba(68,255,68,0.1); padding: 2px 6px; border-radius: 4px;">Up to date</span>'}
          <a href="https://uk.trustpilot.com/review/caminocoaching.co.uk" target="_blank" rel="noopener" style="font-size: 0.65rem; color: var(--blue); text-decoration: none;">View on Trustpilot →</a>
        </div>
      </div>
      
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.5rem; margin-bottom: 0.75rem;">
        <div style="text-align: center; padding: 0.5rem; background: rgba(255,215,0,0.08); border-radius: 6px;">
          <div style="font-size: 1.2rem; font-weight: 700; color: #ffd700;">${data.totalCount || 84}</div>
          <div style="font-size: 0.6rem; color: var(--text-muted);">Reviews</div>
        </div>
        <div style="text-align: center; padding: 0.5rem; background: rgba(255,215,0,0.08); border-radius: 6px;">
          <div style="font-size: 1.2rem; font-weight: 700; color: #ffd700;">${data.rating || 4.9}/5</div>
          <div style="font-size: 0.6rem; color: var(--text-muted);">Rating</div>
        </div>
        <div style="text-align: center; padding: 0.5rem; background: rgba(255,215,0,0.08); border-radius: 6px;">
          <div style="font-size: 1.2rem; font-weight: 700; color: #ffd700;">100%</div>
          <div style="font-size: 0.6rem; color: var(--text-muted);">5-Star</div>
        </div>
      </div>
      
      <div style="display: flex; gap: 0.5rem;">
        <button class="btn btn-sm btn-secondary" id="scan-reviews-btn" style="flex: 1;">🔄 Scan for New Reviews</button>
        <button class="btn btn-sm btn-secondary" id="update-review-count-btn" style="flex: 1;">✏️ Update Count</button>
      </div>
      
      ${data.lastScanned ? `<div style="font-size: 0.6rem; color: var(--text-muted); margin-top: 0.5rem; text-align: center;">Last scanned: ${new Date(data.lastScanned).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</div>` : ''}
    </div>
  `;

    // Attach event listeners
    document.getElementById('scan-reviews-btn')?.addEventListener('click', async () => {
        const btn = document.getElementById('scan-reviews-btn');
        btn.textContent = '⏳ Scanning...';
        btn.disabled = true;

        try {
            const result = await scanTrustpilotReviews();
            if (result.lastScanError) {
                showScanToast(`Scan couldn't reach Trustpilot (${result.lastScanError}). Review count unchanged. You can update manually.`, 'info');
            } else {
                showScanToast(`Found ${result.totalCount} reviews (${result.rating}/5). ${result.reviews?.length || 0} review texts captured.`, 'success');
            }
            renderReviewScanner(containerId);
        } catch (err) {
            showScanToast(`Scan failed: ${err.message}`, 'error');
            btn.textContent = '🔄 Scan for New Reviews';
            btn.disabled = false;
        }
    });

    document.getElementById('update-review-count-btn')?.addEventListener('click', () => {
        const newCount = prompt('Enter current Trustpilot review count:', data.totalCount || 84);
        if (newCount && !isNaN(parseInt(newCount))) {
            const updated = loadSavedReviews();
            updated.totalCount = parseInt(newCount);
            updated.lastScanned = new Date().toISOString();
            saveReviews(updated);
            renderReviewScanner(containerId);
            showScanToast(`Review count updated to ${newCount}`, 'success');
        }
    });
}

function showScanToast(message, type) {
    document.dispatchEvent(new CustomEvent('show-toast', {
        detail: { message, type }
    }));
}
