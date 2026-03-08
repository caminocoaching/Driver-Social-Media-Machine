// ═══════════════════════════════════════════════════════════════
// 🏍️ PRODUCTION PIPELINE — Manus + Canva + HeyGen Automation
// Auto-builds slide decks, post images, and videos from AI output
// ═══════════════════════════════════════════════════════════════

import { loadSettings } from './settings.js';

// ─── Pipeline Status Tracking ────────────────────────────────
const PIPELINE_KEY = 'rider-social-media-pipeline-jobs';

function getPipelineJobs() {
    try {
        return JSON.parse(localStorage.getItem(PIPELINE_KEY) || '[]');
    } catch { return []; }
}

function savePipelineJob(job) {
    const jobs = getPipelineJobs();
    const existing = jobs.findIndex(j => j.id === job.id);
    if (existing >= 0) {
        jobs[existing] = job;
    } else {
        jobs.push(job);
    }
    localStorage.setItem(PIPELINE_KEY, JSON.stringify(jobs.slice(-50)));
    return job;
}

// ═══════════════════════════════════════════════════════════════
// MANUS API — Slide Deck Generation
// ═══════════════════════════════════════════════════════════════

const MANUS_API_BASE = 'https://api.manus.ai/v1';

/**
 * Send a slide deck brief to Manus AI to auto-generate the presentation.
 * Manus will create the slides as a downloadable PDF/PPTX.
 */
export async function createManusSlideTask(slideBrief, topic) {
    const settings = loadSettings();
    const apiKey = settings.manusApiKey;

    if (!apiKey) {
        throw new Error('Manus API key not configured. Go to Settings to add your key.');
    }

    const prompt = `Create a professional slide deck presentation for a short-form video about motorcycle racing mental performance.

BRAND GUIDELINES:
- Background: #0A1628 (deep navy/dark)
- Accent colour: #00BFA5 (teal)  
- Secondary accent: #4488FF (blue)
- Warning/highlight: #DAA520 (gold)
- Font: Montserrat (headings), Inter (body)
- Style: Clean, dark, premium — think Apple Keynote meets motorsport
- NO clipart. NO stock photos with text. Minimal text per slide.
- Each slide should be 1080x1920 pixels (9:16 vertical for Reels)

TOPIC: ${topic}

SLIDE DECK BRIEF:
${slideBrief}

REQUIREMENTS:
1. Create each slide as described in the brief above
2. Use the exact text content specified for each slide
3. Apply the brand colours and fonts consistently
4. Export as individual PNG images (1080x1920 each)
5. Make the data/stat slides visually impactful — large numbers, bold typography
6. The hook slide should grab attention immediately
7. Keep all text large and readable on mobile screens`;

    const response = await fetch(`${MANUS_API_BASE}/tasks`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'API_KEY': apiKey
        },
        body: JSON.stringify({
            prompt: prompt,
            taskMode: 'agent',
            agentProfile: 'manus-1.6'
        })
    });

    if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.message || error.error || `Manus API error: ${response.status}`);
    }

    const data = await response.json();
    const taskId = data.task_id || data.taskId || data.data?.taskId || data.id;

    // Save job for tracking
    const job = savePipelineJob({
        id: `manus-${taskId}`,
        type: 'manus-slides',
        taskId,
        topic,
        status: 'processing',
        createdAt: new Date().toISOString()
    });

    return { taskId, job };
}

/**
 * Check the status of a Manus task and retrieve output files
 */
export async function checkManusTaskStatus(taskId) {
    const settings = loadSettings();
    const apiKey = settings.manusApiKey;

    if (!apiKey) throw new Error('Manus API key not configured.');

    const response = await fetch(`${MANUS_API_BASE}/tasks/${taskId}`, {
        headers: { 'API_KEY': apiKey }
    });

    if (!response.ok) {
        throw new Error(`Manus status check failed: ${response.status}`);
    }

    const data = await response.json();
    const status = data.status || data.data?.status || 'unknown';

    let files = [];
    if (status === 'completed' || status === 'done') {
        // Fetch output files
        try {
            const filesResponse = await fetch(`${MANUS_API_BASE}/tasks/${taskId}/files`, {
                headers: { 'API_KEY': apiKey }
            });
            if (filesResponse.ok) {
                const filesData = await filesResponse.json();
                files = filesData.files || filesData.data?.files || [];
            }
        } catch (e) {
            console.warn('Could not fetch Manus files:', e.message);
        }
    }

    // Update pipeline job
    savePipelineJob({
        id: `manus-${taskId}`,
        type: 'manus-slides',
        taskId,
        status: status === 'completed' || status === 'done' ? 'completed' : status,
        files,
        updatedAt: new Date().toISOString()
    });

    return { status, files };
}


// ═══════════════════════════════════════════════════════════════
// CANVA CONNECT API — Post Image Generation
// ═══════════════════════════════════════════════════════════════

const CANVA_API_BASE = 'https://api.canva.com/rest/v1';

/**
 * Create a post image using a Canva brand template.
 * Requires a pre-configured template with autofill fields:
 * - headline_text: The hook text or key stat
 * - subheading_text: Secondary text
 * - background_image: Optional hero image
 */
export async function createCanvaPostImage({ templateId, headlineText, subheadingText, backgroundImageUrl }) {
    const settings = loadSettings();
    const apiToken = settings.canvaApiToken;

    if (!apiToken) {
        throw new Error('Canva API token not configured. Go to Settings to add your token.');
    }

    if (!templateId) {
        throw new Error('No Canva template ID configured. Create a brand template in Canva first, then add its ID in Settings.');
    }

    // Step 1: Create autofill job
    const autofillData = {};
    if (headlineText) autofillData.headline_text = { type: 'text', text: headlineText };
    if (subheadingText) autofillData.subheading_text = { type: 'text', text: subheadingText };
    if (backgroundImageUrl) autofillData.background_image = { type: 'image', asset_id: backgroundImageUrl };

    const autofillResponse = await fetch(`${CANVA_API_BASE}/autofills`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiToken}`
        },
        body: JSON.stringify({
            brand_template_id: templateId,
            data: autofillData,
            title: `Post Image — ${headlineText?.substring(0, 30) || 'Untitled'}`
        })
    });

    if (!autofillResponse.ok) {
        const error = await autofillResponse.json().catch(() => ({}));
        throw new Error(error.error?.message || `Canva API error: ${autofillResponse.status}`);
    }

    const autofillResult = await autofillResponse.json();
    const jobId = autofillResult.job?.id;

    // Save pipeline job
    savePipelineJob({
        id: `canva-${jobId}`,
        type: 'canva-image',
        jobId,
        headlineText,
        status: 'processing',
        createdAt: new Date().toISOString()
    });

    return { jobId, designId: autofillResult.job?.result?.design?.id };
}

/**
 * Check Canva autofill job status
 */
export async function checkCanvaJobStatus(jobId) {
    const settings = loadSettings();
    const apiToken = settings.canvaApiToken;

    if (!apiToken) throw new Error('Canva API token not configured.');

    const response = await fetch(`${CANVA_API_BASE}/autofills/${jobId}`, {
        headers: { 'Authorization': `Bearer ${apiToken}` }
    });

    if (!response.ok) {
        throw new Error(`Canva status check failed: ${response.status}`);
    }

    const data = await response.json();
    return {
        status: data.job?.status || 'unknown',
        designId: data.job?.result?.design?.id || null,
        designUrl: data.job?.result?.design?.url || null
    };
}

/**
 * Export a Canva design as PNG
 */
export async function exportCanvaDesign(designId, format = 'png') {
    const settings = loadSettings();
    const apiToken = settings.canvaApiToken;

    if (!apiToken) throw new Error('Canva API token not configured.');

    const response = await fetch(`${CANVA_API_BASE}/exports`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiToken}`
        },
        body: JSON.stringify({
            design_id: designId,
            format: { type: format },
            quality: 'regular'
        })
    });

    if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.error?.message || `Canva export error: ${response.status}`);
    }

    const data = await response.json();
    return {
        exportId: data.job?.id,
        status: data.job?.status
    };
}

/**
 * Check Canva export status and get download URL
 */
export async function checkCanvaExportStatus(exportId) {
    const settings = loadSettings();
    const apiToken = settings.canvaApiToken;

    if (!apiToken) throw new Error('Canva API token not configured.');

    const response = await fetch(`${CANVA_API_BASE}/exports/${exportId}`, {
        headers: { 'Authorization': `Bearer ${apiToken}` }
    });

    if (!response.ok) {
        throw new Error(`Canva export check failed: ${response.status}`);
    }

    const data = await response.json();
    return {
        status: data.job?.status || 'unknown',
        urls: data.job?.result?.urls || []
    };
}


// ═══════════════════════════════════════════════════════════════
// HEYGEN API — Video Assembly
// ═══════════════════════════════════════════════════════════════

const HEYGEN_API_BASE = 'https://api.heygen.com';

/**
 * List available avatars from HeyGen account
 */
export async function listHeyGenAvatars() {
    const settings = loadSettings();
    const apiKey = settings.heygenApiKey;

    if (!apiKey) throw new Error('HeyGen API key not configured.');

    const response = await fetch(`${HEYGEN_API_BASE}/v2/avatars`, {
        headers: { 'X-Api-Key': apiKey }
    });

    if (!response.ok) throw new Error(`HeyGen avatars error: ${response.status}`);

    const data = await response.json();
    return data.data?.avatars || [];
}

/**
 * List available voices from HeyGen account
 */
export async function listHeyGenVoices() {
    const settings = loadSettings();
    const apiKey = settings.heygenApiKey;

    if (!apiKey) throw new Error('HeyGen API key not configured.');

    const response = await fetch(`${HEYGEN_API_BASE}/v2/voices`, {
        headers: { 'X-Api-Key': apiKey }
    });

    if (!response.ok) throw new Error(`HeyGen voices error: ${response.status}`);

    const data = await response.json();
    return data.data?.voices || [];
}

/**
 * Generate a video from a script with avatar overlay on slides.
 * Parses the structured video script into multi-scene HeyGen format.
 */
export async function createHeyGenVideo({ script, avatarId, voiceId, slideImageUrls = [] }) {
    const settings = loadSettings();
    const apiKey = settings.heygenApiKey;

    if (!apiKey) throw new Error('HeyGen API key not configured.');
    if (!avatarId) throw new Error('Please select an avatar from your HeyGen account.');

    // Parse script into scene narration blocks
    const scriptMatch = script.match(/=== VIDEO SCRIPT ===([\s\S]*?)(?:=== SLIDE DECK|$)/);
    const scriptText = scriptMatch ? scriptMatch[1].trim() : script;

    // Split by section markers (HOOK, SCENARIO, THE SCIENCE, etc.)
    const sectionPattern = /(?:HOOK|SCENARIO|THE SCIENCE|THE COST|THE BRIDGE|CTA)[^:]*:\s*/gi;
    const parts = scriptText.split(sectionPattern).filter(p => p.trim());

    // Build voice config — if no voiceId provided, use avatar's built-in voice clone
    const voiceConfig = voiceId
        ? { type: 'text', voice_id: voiceId, input_text: '' }
        : { type: 'text', input_text: '' };

    // Build scenes — each scene pairs narration with a slide background
    const scenes = parts.map((narration, i) => {
        const scene = {
            scene_type: 'talking_photo',
            character: {
                type: 'avatar',
                avatar_id: avatarId,
                voice: { ...voiceConfig, input_text: narration.trim() }
            }
        };

        // If we have slide images, use them as backgrounds
        if (slideImageUrls[i]) {
            scene.background = {
                type: 'image',
                url: slideImageUrls[i]
            };
        } else {
            scene.background = {
                type: 'color',
                value: '#0A1628'
            };
        }

        return scene;
    });

    const response = await fetch(`${HEYGEN_API_BASE}/v2/video/generate`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Api-Key': apiKey
        },
        body: JSON.stringify({
            video_inputs: scenes,
            dimension: { width: 1080, height: 1920 }
        })
    });

    if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.message || error.error?.message || `HeyGen API error: ${response.status}`);
    }

    const data = await response.json();
    const videoId = data.data?.video_id || data.video_id;

    // Save pipeline job
    savePipelineJob({
        id: `heygen-${videoId}`,
        type: 'heygen-video',
        videoId,
        status: 'processing',
        createdAt: new Date().toISOString()
    });

    return { videoId };
}

/**
 * Check HeyGen video rendering status
 */
export async function checkHeyGenStatus(videoId) {
    const settings = loadSettings();
    const apiKey = settings.heygenApiKey;

    if (!apiKey) throw new Error('HeyGen API key not configured.');

    const response = await fetch(`${HEYGEN_API_BASE}/v1/video_status.get?video_id=${videoId}`, {
        headers: { 'X-Api-Key': apiKey }
    });

    if (!response.ok) throw new Error(`HeyGen status check failed: ${response.status}`);

    const data = await response.json();
    const status = data.data?.status || 'unknown';

    // Update pipeline job
    savePipelineJob({
        id: `heygen-${videoId}`,
        type: 'heygen-video',
        videoId,
        status: status === 'completed' ? 'completed' : status,
        videoUrl: data.data?.video_url || null,
        thumbnailUrl: data.data?.thumbnail_url || null,
        updatedAt: new Date().toISOString()
    });

    return {
        status,
        videoUrl: data.data?.video_url || null,
        thumbnailUrl: data.data?.thumbnail_url || null,
        duration: data.data?.duration || null
    };
}


// ═══════════════════════════════════════════════════════════════
// FULL PIPELINE ORCHESTRATOR
// ═══════════════════════════════════════════════════════════════

/**
 * Run the full production pipeline:
 * 1. Send slide brief to Manus → get slide deck
 * 2. Send script + slides to HeyGen → get video
 * 
 * Returns a pipeline job ID for tracking.
 */
export async function runFullPipeline({ script, topic, onProgress }) {
    const settings = loadSettings();
    const pipelineId = `pipeline-${Date.now()}`;

    onProgress?.({ step: 1, total: 3, message: 'Sending slide deck brief to Manus...' });

    // Step 1: Extract slide brief and send to Manus
    const slideBriefMatch = script.match(/=== SLIDE DECK BRIEF.*?===([\s\S]*?)(?:=== HEYGEN|$)/);
    const slideBrief = slideBriefMatch ? slideBriefMatch[1].trim() : '';

    let manusTaskId = null;
    if (slideBrief && settings.manusApiKey) {
        try {
            const manusResult = await createManusSlideTask(slideBrief, topic);
            manusTaskId = manusResult.taskId;
            onProgress?.({ step: 1, total: 3, message: `Manus task created (ID: ${manusTaskId}). Building slides...` });
        } catch (err) {
            onProgress?.({ step: 1, total: 3, message: `Manus skipped: ${err.message}`, warning: true });
        }
    } else {
        onProgress?.({ step: 1, total: 3, message: 'Manus skipped — build slides manually in Manus/Canva', warning: true });
    }

    // Step 2: Poll Manus for completion (max 5 minutes)
    let slideFiles = [];
    if (manusTaskId) {
        onProgress?.({ step: 2, total: 3, message: 'Waiting for Manus to finish slide deck...' });

        const maxAttempts = 30; // 30 x 10s = 5 minutes
        for (let attempt = 0; attempt < maxAttempts; attempt++) {
            await new Promise(resolve => setTimeout(resolve, 10000)); // Wait 10s

            try {
                const status = await checkManusTaskStatus(manusTaskId);
                if (status.status === 'completed' || status.status === 'done') {
                    slideFiles = status.files;
                    onProgress?.({ step: 2, total: 3, message: `Slide deck ready! ${slideFiles.length} files generated.` });
                    break;
                } else if (status.status === 'failed' || status.status === 'error') {
                    onProgress?.({ step: 2, total: 3, message: 'Manus task failed — proceed manually.', warning: true });
                    break;
                }

                onProgress?.({ step: 2, total: 3, message: `Manus still building... (attempt ${attempt + 1}/${maxAttempts})` });
            } catch (err) {
                console.warn('Manus poll error:', err.message);
            }
        }
    }

    // Step 3: Send to HeyGen
    if (settings.heygenApiKey) {
        onProgress?.({ step: 3, total: 3, message: 'Sending to HeyGen for video generation...' });

        try {
            const slideImageUrls = slideFiles
                .filter(f => f.url && (f.name?.endsWith('.png') || f.name?.endsWith('.jpg')))
                .map(f => f.url);

            const heygenResult = await createHeyGenVideo({
                script,
                avatarId: settings.heygenAvatarId || 'default',
                voiceId: settings.heygenVoiceId || 'default',
                slideImageUrls
            });

            onProgress?.({ step: 3, total: 3, message: `HeyGen video queued (ID: ${heygenResult.videoId}). Rendering...` });

            // Save full pipeline job
            savePipelineJob({
                id: pipelineId,
                type: 'full-pipeline',
                topic,
                manusTaskId,
                heygenVideoId: heygenResult.videoId,
                status: 'rendering',
                createdAt: new Date().toISOString()
            });

            return {
                pipelineId,
                manusTaskId,
                heygenVideoId: heygenResult.videoId,
                slideFiles
            };
        } catch (err) {
            onProgress?.({ step: 3, total: 3, message: `HeyGen error: ${err.message}`, warning: true });
        }
    } else {
        onProgress?.({ step: 3, total: 3, message: 'HeyGen skipped — no API key configured.', warning: true });
    }

    return { pipelineId, manusTaskId, slideFiles };
}

/**
 * Get all recent pipeline jobs for the dashboard
 */
export function getRecentPipelineJobs() {
    return getPipelineJobs()
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 20);
}
