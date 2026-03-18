// ═══════════════════════════════════════════════════════════════
// 🏁 DRIVER SOCIAL MEDIA MACHINE — Main App
// Apple-style "Remote Control" interface
// 2 modes, 1 button. The complexity is in the engine.
// ═══════════════════════════════════════════════════════════════

import {
  PILLARS, FRAMEWORKS, CTAS, AUTHORITY_LINES, CAMPAIGN_ARC,
  NEUROCHEMICALS, getWeeklyNeurochemicals,
  getActiveCTAs, getRotatingCTA, resetCTARotation,
  getRotatingAuthority, resetAuthorityRotation,
  getWeeklyPillars, getWeeklyFrameworks,
  getRandomPillar, getRandomFramework,
  VISUAL_TYPES, getVisualTypeForDay, getVisualGuidance,
  getAllRaceWeekContexts,
  PIPELINE_STAGES, CINEMATIC_IMAGE_SPECS, buildCinematicImagePrompt, LEXICON
} from './content-engine.js';

import {
  generateTopics, generatePost, generatePosts, regeneratePost, generateImagePrompt,
  generateVideoScript, generateShortsScript, storeUsedArticles, storeUsedHooks,
  generateEmail, renderEmailHTML,
  runWeeklyResearch, formatResearchForClaude
} from './ai-service.js';

import {
  createManusSlideTask, checkManusTaskStatus,
  createHeyGenVideo, checkHeyGenStatus,
  createCanvaPostImage, runFullPipeline, getRecentPipelineJobs
} from './production-pipeline.js';

import { dispatchEmail } from './ghl-email.js';

import {
  NEUROCHEMICALS as NEURO_DATA, FLOW_COCKTAIL, WEEKLY_VIDEO_SCHEDULE, VIDEO_TOPICS,
  getChemical, getTopicsForChemical
} from './neurochemistry.js';

import {
  getScheduleDates, exportCSV, buildCSVString, downloadPostTxt, copyToClipboard
} from './scheduler.js';

import { loadSettings, renderSettingsPage } from './settings.js';

import {
  REVIEW_STATS, QUOTED_HOOKS, OBJECTION_KILLERS, CAROUSEL_CONCEPTS,
  REVIEW_AUTHORITY_LINES, TRUSTPILOT_REVIEWS, GOOGLE_REVIEWS,
  getReviewRequestTemplate
} from './review-bank.js';

import {
  getChampionshipContext, getUpcomingEvents, getRecentEvents
} from './championship-calendar.js';


// ─── App State ────────────────────────────────────────────────
const state = {
  currentPage: 'weekly',
  stories: [],    // Raw story cards from AI research
  topics: [],     // Structured topics with pillars/frameworks assigned
  posts: [],      // Generated posts
  doneData: {},   // Confirmed post data (email, video, shorts per index)
  weeklyPillars: [],
  weeklyFrameworks: [],
  weeklyCTAs: [],
  weeklyAuthorities: [],
  allRaceContexts: [],
  researchResults: [] // Weekly research results (7-area pipeline)
};

const STORAGE_KEY = 'driverSocialMedia_session';

// ─── Auto-Save / Restore ──────────────────────────────────────
function saveSession() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      stories: state.stories,
      topics: state.topics,
      posts: state.posts,
      doneData: state.doneData,
      weeklyPillars: state.weeklyPillars,
      weeklyFrameworks: state.weeklyFrameworks,
      weeklyCTAs: state.weeklyCTAs,
      weeklyAuthorities: state.weeklyAuthorities,
      timestamp: Date.now()
    }));
  } catch (e) { console.warn('Save failed:', e); }
}

function restoreSession() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!saved) return;

    // Expire sessions older than 3 days
    if (saved.timestamp && Date.now() - saved.timestamp > 3 * 86400000) {
      localStorage.removeItem(STORAGE_KEY);
      return;
    }

    Object.assign(state, {
      stories: saved.stories || [],
      topics: saved.topics || [],
      posts: saved.posts || [],
      doneData: saved.doneData || {},
      weeklyPillars: saved.weeklyPillars || [],
      weeklyFrameworks: saved.weeklyFrameworks || [],
      weeklyCTAs: saved.weeklyCTAs || [],
      weeklyAuthorities: saved.weeklyAuthorities || []
    });

    // Restore UI state
    if (state.posts.length > 0) {
      renderStoryCards();
      renderPosts();
      showContainer('posts-container');
    } else if (state.stories.length > 0) {
      renderStoryCards();
      showContainer('stories-container');
    }
  } catch (e) { console.warn('Restore failed:', e); }
}

function clearSession() {
  // Clear ALL known session/content keys (keep settings)
  localStorage.removeItem(STORAGE_KEY);                         // driverSocialMedia_session
  localStorage.removeItem('driver-social-media-used-articles'); // dedup articles
  localStorage.removeItem('driver-social-media-used-hooks');    // dedup hooks
  localStorage.removeItem('driver-social-media-pipeline-jobs'); // pipeline jobs
  // Also clear any leftover Rider keys (from fork)
  localStorage.removeItem('rider-social-media-pipeline-jobs');
  localStorage.removeItem('riderSocialMedia_session');

  // Reset in-memory state
  state.stories = [];
  state.topics = [];
  state.posts = [];
  state.doneData = {};
  state.weeklyPillars = [];
  state.weeklyFrameworks = [];
  state.weeklyCTAs = [];
  state.weeklyAuthorities = [];

  // Reset UI
  document.getElementById('stories-container')?.classList.add('hidden');
  document.getElementById('posts-container')?.classList.add('hidden');
  // Remove any inline post elements
  document.querySelectorAll('[id^="inline-post-"]').forEach(el => el.remove());
  showToast('Session cleared — ready for a fresh week!', 'success');
}


// ─── Initialise ───────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initWeeklyMode();
  initResearchMode();
  initSinglePost();
  renderSettingsPage();
  checkRaceWeek();
  restoreSession();

  // Pre-render pipeline if on that page
  if (state.currentPage === 'pipeline') renderPipelineDashboard();
});


// ─── Utility: Escape HTML ─────────────────────────────────────
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}


// ─── Toast System ─────────────────────────────────────────────
function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  container.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add('visible'));
  setTimeout(() => {
    toast.classList.remove('visible');
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}
window.showToast = showToast;


// ─── Navigation (2 modes + settings) ──────────────────────────
function initNavigation() {
  document.querySelectorAll('.nav-link[data-page]').forEach(link => {
    link.addEventListener('click', () => switchPage(link.dataset.page));
  });
}

function switchPage(page) {
  state.currentPage = page;
  document.querySelectorAll('.nav-link[data-page]').forEach(l => l.classList.remove('active'));
  document.querySelector(`.nav-link[data-page="${page}"]`)?.classList.add('active');
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));

  const pageMap = { weekly: 'weekly-page', research: 'research-page', pipeline: 'pipeline-page', single: 'single-page', settings: 'settings-page' };
  document.getElementById(pageMap[page])?.classList.add('active');

  // Render pipeline dashboard on first visit
  if (page === 'pipeline') {
    renderPipelineDashboard();
  }
}


// ─── Status Indicator ─────────────────────────────────────────
function setStatus(text, busy = false) {
  const dot = document.getElementById('status-dot');
  const label = document.getElementById('status-text');
  if (label) label.textContent = text;
  if (dot) dot.className = `status-dot ${busy ? 'busy' : ''}`;
}


// ─── UI Helpers ───────────────────────────────────────────────
function showContainer(id) {
  ['stories-container', 'posts-container'].forEach(cid => {
    document.getElementById(cid)?.classList.add('hidden');
  });
  document.getElementById(id)?.classList.remove('hidden');
}


// ═══════════════════════════════════════════════════════════════
// 🎯 PIPELINE DASHBOARD — Frank Kern Content Pipeline Visualisation
// ═══════════════════════════════════════════════════════════════
let pipelineRendered = false;

function renderPipelineDashboard() {
  if (pipelineRendered) return;
  const container = document.getElementById('pipeline-dashboard');
  if (!container) return;
  pipelineRendered = true;

  const settings = loadSettings();
  const hasClaudeKey = !!settings.claudeApiKey;
  const hasManusKey = !!settings.manusApiKey;
  const hasHeyGenKey = !!settings.heygenApiKey;

  // Count current session status
  const storiesCount = state.stories.length;
  const postsCount = state.posts.filter(p => p && p.content).length;
  const confirmedCount = state.posts.filter(p => p && p._confirmed).length;

  // Recent pipeline jobs
  const recentJobs = getRecentPipelineJobs();

  // --- Pipeline Flow ---
  const stagesHTML = PIPELINE_STAGES.map((stage, i) => {
    let status = 'pending', statusLabel = 'Not started', statusIcon = '⏳';
    if (stage.id === 'strategic-planning' && storiesCount > 0) { status = 'complete'; statusLabel = `${storiesCount} stories found`; statusIcon = '✅'; }
    if (stage.id === 'ai-copywriting' && postsCount > 0) { status = 'complete'; statusLabel = `${postsCount} posts written`; statusIcon = '✅'; }
    if (stage.id === 'ai-copywriting' && storiesCount > 0 && postsCount === 0) { status = 'ready'; statusLabel = 'Ready to write'; statusIcon = '🟡'; }
    if (stage.id === 'visual-generation' && confirmedCount > 0) { status = 'ready'; statusLabel = `${confirmedCount} confirmed`; statusIcon = '🟡'; }
    if (stage.id === 'multi-platform-publish' && confirmedCount > 0) { status = 'ready'; statusLabel = 'Ready to publish'; statusIcon = '🟡'; }
    const statusBg = status === 'complete' ? 'rgba(46,160,67,0.1)' : status === 'ready' ? 'rgba(218,165,32,0.1)' : 'rgba(255,255,255,0.03)';
    const arrow = i < PIPELINE_STAGES.length - 1 ? `<div style="text-align:center;padding:0.3rem 0;font-size:1.2rem;color:${stage.color};opacity:0.5;">↓</div>` : '';
    return `
      <div style="border:1px solid ${stage.color}25;border-radius:12px;padding:1.2rem;background:${statusBg};position:relative;overflow:hidden;">
        <div style="position:absolute;top:0;left:0;bottom:0;width:4px;background:${stage.color};border-radius:12px 0 0 12px;"></div>
        <div style="display:flex;align-items:center;gap:0.8rem;margin-bottom:0.6rem;">
          <span style="font-size:1.6rem;">${stage.icon}</span>
          <div>
            <div style="display:flex;align-items:center;gap:0.5rem;">
              <span style="font-size:1rem;font-weight:800;color:${stage.color};">${stage.name}</span>
              <span style="font-size:0.62rem;padding:0.15rem 0.45rem;background:${stage.color}18;color:${stage.color};border-radius:4px;font-weight:700;border:1px solid ${stage.color}30;">${stage.kernConcept}</span>
            </div>
            <p style="font-size:0.75rem;color:var(--text-secondary);margin:0.15rem 0 0;line-height:1.4;">${stage.description}</p>
          </div>
        </div>
        <div style="display:flex;gap:0.4rem;flex-wrap:wrap;margin-bottom:0.5rem;">
          ${stage.tools.map(t => `<span style="font-size:0.62rem;padding:0.15rem 0.4rem;background:rgba(255,255,255,0.06);border-radius:4px;color:var(--text-muted);border:1px solid rgba(255,255,255,0.08);">${t}</span>`).join('')}
        </div>
        <div style="display:flex;justify-content:space-between;align-items:center;">
          <span style="font-size:0.7rem;color:var(--text-muted);font-style:italic;">${stage.smmFeature}</span>
          <span style="font-size:0.65rem;font-weight:700;color:${status === 'complete' ? '#2EA043' : status === 'ready' ? '#DAA520' : 'var(--text-muted)'};">${statusIcon} ${statusLabel}</span>
        </div>
      </div>
      ${arrow}
    `;
  }).join('');

  // --- Video Generator UI ---
  const jobRows = recentJobs.slice(0, 8).map(j => {
    const t = new Date(j.createdAt);
    const ts = t.toLocaleDateString('en-GB',{day:'2-digit',month:'short'})+' '+t.toLocaleTimeString('en-GB',{hour:'2-digit',minute:'2-digit'});
    const sc = j.status === 'completed' ? '#2EA043' : j.status === 'processing' || j.status === 'rendering' ? '#DAA520' : j.status === 'failed' || j.status === 'error' ? '#ef4444' : 'var(--text-muted)';
    const si = j.status === 'completed' ? '✅' : j.status === 'processing' || j.status === 'rendering' ? '⏳' : j.status === 'failed' || j.status === 'error' ? '❌' : '🔘';
    const label = j.type === 'heygen-video' ? '🎬 HeyGen' : j.type === 'manus-slides' ? '🎨 Manus' : j.type === 'full-pipeline' ? '🚀 Pipeline' : j.type === 'canva-image' ? '🖼️ Canva' : j.type;
    const dl = j.videoUrl ? `<a href="${j.videoUrl}" target="_blank" style="font-size:0.6rem;color:#2EA043;text-decoration:underline;">Download</a>` : '';
    return `<div style="display:flex;align-items:center;gap:0.5rem;padding:0.35rem 0;border-bottom:1px solid rgba(255,255,255,0.04);font-size:0.7rem;">
      <span style="color:var(--text-muted);min-width:70px;">${ts}</span>
      <span style="min-width:80px;">${label}</span>
      <span style="color:${sc};font-weight:600;">${si} ${j.status}</span>
      <span style="flex:1;color:var(--text-muted);font-size:0.62rem;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${j.topic || j.taskId || j.videoId || ''}</span>
      ${dl}
    </div>`;
  }).join('');

  const videoGenHTML = `
    <div style="border:1px solid rgba(218,165,32,0.25);border-radius:12px;background:rgba(0,0,0,0.25);overflow:hidden;">
      <div style="padding:1rem 1.2rem;border-bottom:1px solid rgba(255,255,255,0.06);">
        <div style="display:flex;align-items:center;gap:0.5rem;margin-bottom:0.3rem;">
          <span style="font-size:1.3rem;">🎬</span>
          <span style="font-size:1rem;font-weight:800;color:var(--gold,#DAA520);">Video Generator</span>
          <span style="font-size:0.6rem;padding:0.1rem 0.35rem;background:rgba(218,165,32,0.15);color:var(--gold);border-radius:3px;font-weight:600;">Script → Slides → Video</span>
        </div>
        <p style="font-size:0.72rem;color:var(--text-secondary);margin:0;line-height:1.4;">Paste a post or narration script. Generate a video script with Claude, build slides with Manus, and render with HeyGen — or run the full pipeline in one click.</p>
      </div>

      <div style="padding:1rem 1.2rem;">
        <div style="margin-bottom:0.75rem;">
          <label style="font-size:0.7rem;font-weight:700;color:var(--text-primary);display:block;margin-bottom:0.25rem;">📝 Topic / Title</label>
          <input type="text" id="pipeline-video-topic" placeholder="e.g. Why your braking zone hesitation costs you 1.5 seconds" style="width:100%;padding:0.5rem 0.65rem;background:rgba(0,0,0,0.35);border:1px solid rgba(255,255,255,0.1);border-radius:6px;color:var(--text-primary);font-size:0.78rem;font-family:var(--font);box-sizing:border-box;" />
        </div>
        <div style="margin-bottom:0.75rem;">
          <label style="font-size:0.7rem;font-weight:700;color:var(--text-primary);display:block;margin-bottom:0.25rem;">🎙️ Narration Script / Post Content</label>
          <textarea id="pipeline-video-script" rows="8" placeholder="Paste your post text or video narration here...&#10;&#10;Or leave empty and click 'Generate Script' to create one from the topic above." style="width:100%;padding:0.6rem 0.65rem;background:rgba(0,0,0,0.35);border:1px solid rgba(255,255,255,0.1);border-radius:6px;color:var(--text-primary);font-size:0.78rem;font-family:var(--font);resize:vertical;line-height:1.5;box-sizing:border-box;"></textarea>
          <div style="display:flex;justify-content:space-between;align-items:center;margin-top:0.25rem;">
            <span id="pipeline-script-wc" style="font-size:0.6rem;color:var(--text-muted);">0 words</span>
            <button id="pipeline-clear-script-btn" style="font-size:0.6rem;background:none;border:none;color:var(--text-muted);cursor:pointer;text-decoration:underline;">Clear</button>
          </div>
        </div>

        <!-- Action Buttons -->
        <div style="display:flex;gap:0.5rem;flex-wrap:wrap;margin-bottom:1rem;">
          <button id="pipeline-gen-script-btn" style="flex:1;min-width:160px;padding:0.55rem 0.8rem;background:rgba(139,92,246,0.15);color:#8B5CF6;border:1px solid rgba(139,92,246,0.35);border-radius:8px;font-size:0.78rem;font-weight:700;cursor:pointer;transition:all 0.2s;">
            ✍️ Generate Script ${hasClaudeKey ? '' : '(no key)'}
          </button>
          <button id="pipeline-manus-btn" style="flex:1;min-width:120px;padding:0.55rem 0.8rem;background:rgba(0,191,165,0.12);color:var(--neuro-teal,#00BFA5);border:1px solid rgba(0,191,165,0.3);border-radius:8px;font-size:0.78rem;font-weight:700;cursor:pointer;transition:all 0.2s;">
            🎨 Manus Slides ${hasManusKey ? '' : '(no key)'}
          </button>
          <button id="pipeline-heygen-btn" style="flex:1;min-width:120px;padding:0.55rem 0.8rem;background:rgba(218,165,32,0.12);color:var(--gold,#DAA520);border:1px solid rgba(218,165,32,0.3);border-radius:8px;font-size:0.78rem;font-weight:700;cursor:pointer;transition:all 0.2s;">
            🎬 HeyGen Video ${hasHeyGenKey ? '' : '(no key)'}
          </button>
        </div>

        <button id="pipeline-auto-btn" style="width:100%;padding:0.65rem;background:linear-gradient(135deg,rgba(139,92,246,0.2),rgba(218,165,32,0.2));color:var(--text-primary);border:1px solid rgba(218,165,32,0.3);border-radius:8px;font-size:0.82rem;font-weight:800;cursor:pointer;transition:all 0.2s;letter-spacing:0.3px;">
          🚀 Auto Pipeline — Script → Manus Slides → HeyGen Video
        </button>
        <p style="font-size:0.62rem;color:var(--text-muted);text-align:center;margin:0.3rem 0 0;">Runs the full pipeline: generates video script, sends to Manus for slides, then renders with HeyGen avatar.</p>

        <!-- Status -->
        <div id="pipeline-video-status" style="margin-top:0.75rem;display:none;padding:0.6rem;background:rgba(0,0,0,0.3);border-radius:8px;border:1px solid rgba(255,255,255,0.06);">
          <div style="font-size:0.72rem;color:var(--text-primary);font-weight:600;" id="pipeline-video-msg">Working...</div>
          <div style="margin-top:0.3rem;height:3px;background:rgba(255,255,255,0.06);border-radius:2px;overflow:hidden;">
            <div id="pipeline-video-bar" style="height:100%;width:0%;background:var(--gold,#DAA520);border-radius:2px;transition:width 0.5s ease;"></div>
          </div>
        </div>
      </div>

      <!-- Recent Jobs -->
      ${recentJobs.length > 0 ? `
      <div style="padding:0.75rem 1.2rem;border-top:1px solid rgba(255,255,255,0.06);background:rgba(0,0,0,0.15);">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:0.4rem;">
          <span style="font-size:0.72rem;font-weight:700;color:var(--text-primary);">📋 Recent Pipeline Jobs</span>
          <span style="font-size:0.6rem;color:var(--text-muted);">${recentJobs.length} jobs</span>
        </div>
        ${jobRows}
      </div>` : ''}
    </div>
  `;

  // --- Kern Frameworks (South Park Rule + Expectation Violation) ---
  const kernFrameworks = FRAMEWORKS.filter(f => f.prefix === 'K');
  const frameworksHTML = kernFrameworks.map(f => `
    <div style="border:1px solid ${f.color}30;border-radius:10px;padding:1rem;background:rgba(0,0,0,0.2);flex:1;min-width:280px;">
      <div style="display:flex;align-items:center;gap:0.5rem;margin-bottom:0.5rem;">
        <span style="font-size:1.2rem;">${f.icon}</span>
        <span style="font-size:0.9rem;font-weight:800;color:${f.color};">${f.name}</span>
      </div>
      <p style="font-size:0.78rem;color:var(--text-secondary);line-height:1.5;margin:0 0 0.6rem;">${f.description}</p>
      <div style="background:rgba(0,0,0,0.3);border-radius:6px;padding:0.6rem;border-left:3px solid ${f.color};">
        <span style="font-size:0.65rem;font-weight:700;color:${f.color};display:block;margin-bottom:0.25rem;">HOOK STYLE:</span>
        <p style="font-size:0.72rem;color:var(--text-primary);line-height:1.4;margin:0;">${f.hookStyle}</p>
      </div>
      <div style="margin-top:0.5rem;background:rgba(0,0,0,0.2);border-radius:6px;padding:0.5rem;font-style:italic;">
        <span style="font-size:0.62rem;color:var(--text-muted);display:block;margin-bottom:0.15rem;">EXAMPLE:</span>
        <p style="font-size:0.72rem;color:var(--text-secondary);line-height:1.4;margin:0;">"${f.example}"</p>
      </div>
    </div>
  `).join('');

  // --- Cinematic Image Specs ---
  const specs = CINEMATIC_IMAGE_SPECS;
  const imageSpecsHTML = `
    <div style="border:1px solid rgba(0,191,165,0.2);border-radius:10px;padding:1rem;background:rgba(0,0,0,0.2);">
      <div style="display:flex;align-items:center;gap:0.5rem;margin-bottom:0.75rem;">
        <span style="font-size:1.2rem;">📸</span>
        <span style="font-size:0.9rem;font-weight:800;color:var(--neuro-teal,#00BFA5);">Cinematic Image Specs</span>
        <span style="font-size:0.6rem;padding:0.1rem 0.35rem;background:rgba(0,191,165,0.15);color:var(--neuro-teal);border-radius:3px;font-weight:600;">Kern Two-Step Process</span>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.5rem;margin-bottom:0.75rem;">
        <div style="background:rgba(0,0,0,0.25);border-radius:6px;padding:0.5rem;">
          <span style="font-size:0.62rem;font-weight:700;color:var(--neuro-teal);">STYLE</span>
          <p style="font-size:0.72rem;color:var(--text-primary);margin:0.15rem 0 0;">${specs.style}</p>
        </div>
        <div style="background:rgba(0,0,0,0.25);border-radius:6px;padding:0.5rem;">
          <span style="font-size:0.62rem;font-weight:700;color:var(--neuro-teal);">ASPECT RATIO</span>
          <p style="font-size:0.72rem;color:var(--text-primary);margin:0.15rem 0 0;">${specs.aspectRatio}</p>
        </div>
        <div style="background:rgba(0,0,0,0.25);border-radius:6px;padding:0.5rem;">
          <span style="font-size:0.62rem;font-weight:700;color:var(--neuro-teal);">CAMERA</span>
          <p style="font-size:0.72rem;color:var(--text-primary);margin:0.15rem 0 0;">${specs.camera}</p>
        </div>
        <div style="background:rgba(0,0,0,0.25);border-radius:6px;padding:0.5rem;">
          <span style="font-size:0.62rem;font-weight:700;color:var(--neuro-teal);">LIGHTING</span>
          <p style="font-size:0.72rem;color:var(--text-primary);margin:0.15rem 0 0;">dramatic sunlight, film grain</p>
        </div>
      </div>
      <div style="margin-bottom:0.5rem;">
        <span style="font-size:0.65rem;font-weight:700;color:var(--neuro-teal);">TEXT OVERLAY RULES:</span>
        <p style="font-size:0.72rem;color:var(--text-secondary);line-height:1.4;margin:0.15rem 0 0;">Position: ${specs.textOverlay.position}. Font: ${specs.textOverlay.font}. Style: ${specs.textOverlay.style}. Max ${specs.textOverlay.maxWords} words.</p>
      </div>
      <div>
        <span style="font-size:0.65rem;font-weight:700;color:#FF4444;">🚫 PROHIBITED:</span>
        <p style="font-size:0.68rem;color:var(--text-muted);line-height:1.4;margin:0.15rem 0 0;">${specs.prohibited.join(', ')}</p>
      </div>
    </div>
  `;

  // --- Kern Lexicon ---
  const kernTerms = ['South Park Rule', 'Expectation Violation', 'Significant Objects', 'Intent-Based Branding', 'Demonstration Logic', 'AI + HI Formula'];
  const lexiconHTML = kernTerms.filter(t => LEXICON[t]).map(term => `
    <div style="display:flex;gap:0.5rem;padding:0.4rem 0;border-bottom:1px solid rgba(255,255,255,0.04);">
      <span style="font-size:0.72rem;font-weight:700;color:var(--gold,#DAA520);min-width:140px;">${term}</span>
      <span style="font-size:0.72rem;color:var(--text-secondary);line-height:1.4;">${LEXICON[term]}</span>
    </div>
  `).join('');

  // --- Assemble Dashboard ---
  container.innerHTML = `
    <!-- Pipeline Flow -->
    <div style="margin-bottom:2rem;">
      <h2 style="font-size:1rem;font-weight:800;color:var(--text-primary);margin-bottom:1rem;display:flex;align-items:center;gap:0.5rem;">
        <span style="font-size:0.65rem;padding:0.2rem 0.5rem;background:rgba(255,107,53,0.12);color:#FF6B35;border-radius:4px;font-weight:700;">4 STAGES</span>
        Content Pipeline Flow
      </h2>
      <div style="display:flex;flex-direction:column;gap:0;">${stagesHTML}</div>
    </div>

    <!-- 🎬 Video Generator -->
    <div style="margin-bottom:2rem;">
      <h2 style="font-size:1rem;font-weight:800;color:var(--text-primary);margin-bottom:0.75rem;display:flex;align-items:center;gap:0.5rem;">
        <span style="font-size:0.65rem;padding:0.2rem 0.5rem;background:rgba(218,165,32,0.12);color:var(--gold);border-radius:4px;font-weight:700;">VIDEO</span>
        Video Generator
      </h2>
      ${videoGenHTML}
    </div>

    <!-- Kern Frameworks -->
    <div style="margin-bottom:2rem;">
      <h2 style="font-size:1rem;font-weight:800;color:var(--text-primary);margin-bottom:0.75rem;display:flex;align-items:center;gap:0.5rem;">
        <span style="font-size:0.65rem;padding:0.2rem 0.5rem;background:rgba(233,30,140,0.12);color:#E91E8C;border-radius:4px;font-weight:700;">KERN</span>
        Narrative Frameworks
      </h2>
      <div style="display:flex;gap:1rem;flex-wrap:wrap;">${frameworksHTML}</div>
    </div>

    <!-- Cinematic Image Specs -->
    <div style="margin-bottom:2rem;">
      <h2 style="font-size:1rem;font-weight:800;color:var(--text-primary);margin-bottom:0.75rem;display:flex;align-items:center;gap:0.5rem;">
        <span style="font-size:0.65rem;padding:0.2rem 0.5rem;background:rgba(0,191,165,0.12);color:var(--neuro-teal);border-radius:4px;font-weight:700;">VISUAL</span>
        Cinematic Image Generation
      </h2>
      ${imageSpecsHTML}
    </div>

    <!-- Subject Types -->
    <div style="margin-bottom:2rem;">
      <h3 style="font-size:0.85rem;font-weight:700;color:var(--text-primary);margin-bottom:0.5rem;">📷 Image Subject Library</h3>
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:0.5rem;">
        ${specs.subjects.map(s => `
          <div style="background:rgba(0,0,0,0.25);border:1px solid rgba(255,255,255,0.06);border-radius:8px;padding:0.6rem;">
            <span style="font-size:0.68rem;font-weight:700;color:var(--neuro-teal);text-transform:uppercase;letter-spacing:0.5px;">${s.type.replace(/-/g, ' ')}</span>
            <p style="font-size:0.7rem;color:var(--text-secondary);line-height:1.4;margin:0.15rem 0 0;">${s.description}</p>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- Kern Lexicon -->
    <div style="margin-bottom:2rem;">
      <h2 style="font-size:1rem;font-weight:800;color:var(--text-primary);margin-bottom:0.75rem;display:flex;align-items:center;gap:0.5rem;">
        <span style="font-size:0.65rem;padding:0.2rem 0.5rem;background:rgba(218,165,32,0.12);color:var(--gold);border-radius:4px;font-weight:700;">LEXICON</span>
        Kern Pipeline Concepts
      </h2>
      <div style="background:rgba(0,0,0,0.2);border:1px solid rgba(218,165,32,0.15);border-radius:10px;padding:0.75rem 1rem;">
        ${lexiconHTML}
      </div>
    </div>

    <!-- All Frameworks Reference -->
    <div style="margin-bottom:2rem;">
      <h2 style="font-size:1rem;font-weight:800;color:var(--text-primary);margin-bottom:0.75rem;display:flex;align-items:center;gap:0.5rem;">
        <span style="font-size:0.65rem;padding:0.2rem 0.5rem;background:rgba(139,92,246,0.12);color:#8B5CF6;border-radius:4px;font-weight:700;">ALL</span>
        Framework Reference (${FRAMEWORKS.length} total)
      </h2>
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(175px,1fr));gap:0.5rem;">
        ${FRAMEWORKS.map(f => `
          <div style="background:rgba(0,0,0,0.25);border:1px solid ${f.color}20;border-left:3px solid ${f.color};border-radius:6px;padding:0.5rem 0.6rem;">
            <div style="display:flex;align-items:center;gap:0.3rem;margin-bottom:0.2rem;">
              <span style="font-size:0.7rem;">${f.icon}</span>
              <span style="font-size:0.72rem;font-weight:700;color:${f.color};">${f.name}</span>
              <span style="font-size:0.55rem;padding:0.05rem 0.2rem;background:${f.color}15;color:${f.color};border-radius:2px;font-weight:700;">${f.prefix}</span>
            </div>
            <p style="font-size:0.65rem;color:var(--text-muted);line-height:1.35;margin:0;">${f.description.substring(0, 80)}${f.description.length > 80 ? '...' : ''}</p>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  // ─── Wire Video Generator Event Listeners ─────────────────────
  attachPipelineVideoListeners();
}

// ─── Pipeline Video Generator Listeners ─────────────────────────
function attachPipelineVideoListeners() {
  const scriptEl = document.getElementById('pipeline-video-script');
  const topicEl = document.getElementById('pipeline-video-topic');
  const wcEl = document.getElementById('pipeline-script-wc');
  const statusBox = document.getElementById('pipeline-video-status');
  const msgEl = document.getElementById('pipeline-video-msg');
  const barEl = document.getElementById('pipeline-video-bar');

  function setStatus(msg, pct) {
    statusBox.style.display = 'block';
    msgEl.textContent = msg;
    barEl.style.width = pct + '%';
  }

  // Word count
  scriptEl?.addEventListener('input', () => {
    const wc = scriptEl.value.trim().split(/\s+/).filter(Boolean).length;
    if (wcEl) wcEl.textContent = `${wc} words`;
  });

  // Clear
  document.getElementById('pipeline-clear-script-btn')?.addEventListener('click', () => {
    if (scriptEl) { scriptEl.value = ''; if (wcEl) wcEl.textContent = '0 words'; }
  });

  // ✍️ Generate Script (Claude)
  document.getElementById('pipeline-gen-script-btn')?.addEventListener('click', async () => {
    const settings = loadSettings();
    if (!settings.claudeApiKey) { showToast('Claude API key required. Add it in Settings.', 'error'); return; }
    const topic = topicEl?.value?.trim() || 'Racing driver mental performance';
    const postContent = scriptEl?.value?.trim() || '';
    setStatus('✍️ Generating video script with Claude...', 20);
    try {
      const script = await generateVideoScript({
        topic, postContent, pillar: null, chemicalId: null,
        videoLength: '45-60s', platform: 'FB Reel + IG Reel',
        outputFormat: '9:16', apiKey: settings.claudeApiKey
      });
      if (scriptEl) scriptEl.value = script;
      const wc = script.trim().split(/\s+/).filter(Boolean).length;
      if (wcEl) wcEl.textContent = `${wc} words`;
      setStatus('✅ Video script generated! Edit above, then send to Manus or HeyGen.', 100);
      showToast('Video script generated!', 'success');
    } catch (err) {
      setStatus(`❌ Script generation failed: ${err.message}`, 0);
      showToast('Script generation failed: ' + err.message, 'error');
    }
  });

  // 🎨 Manus Slides
  document.getElementById('pipeline-manus-btn')?.addEventListener('click', async () => {
    const settings = loadSettings();
    if (!settings.manusApiKey) { showToast('Manus API key required. Add it in Settings.', 'error'); return; }
    const script = scriptEl?.value?.trim();
    const topic = topicEl?.value?.trim() || 'Video';
    if (!script) { showToast('Paste or generate a script first.', 'error'); return; }
    setStatus('🎨 Sending to Manus for slide deck generation...', 30);
    try {
      const result = await createManusSlideTask(script, topic);
      setStatus(`✅ Manus task created (ID: ${result.taskId}). Building slides...`, 70);
      showToast(`Manus slides queued! Task ID: ${result.taskId}`, 'success');
    } catch (err) {
      setStatus(`❌ Manus error: ${err.message}`, 0);
      showToast('Manus error: ' + err.message, 'error');
    }
  });

  // 🎬 HeyGen Video
  document.getElementById('pipeline-heygen-btn')?.addEventListener('click', async () => {
    const settings = loadSettings();
    if (!settings.heygenApiKey) { showToast('HeyGen API key required. Add it in Settings.', 'error'); return; }
    const script = scriptEl?.value?.trim();
    if (!script) { showToast('Paste or generate a script first.', 'error'); return; }
    setStatus('🎬 Sending to HeyGen for video rendering...', 40);
    try {
      const result = await createHeyGenVideo({
        script,
        avatarId: settings.heygenAvatarId || 'default',
        voiceId: settings.heygenVoiceId || ''
      });
      setStatus(`✅ HeyGen video queued (ID: ${result.videoId}). Rendering...`, 80);
      showToast(`HeyGen video queued! ID: ${result.videoId}`, 'success');
    } catch (err) {
      setStatus(`❌ HeyGen error: ${err.message}`, 0);
      showToast('HeyGen error: ' + err.message, 'error');
    }
  });

  // 🚀 Auto Pipeline (Script → Manus → HeyGen)
  document.getElementById('pipeline-auto-btn')?.addEventListener('click', async () => {
    const settings = loadSettings();
    const topic = topicEl?.value?.trim() || 'Racing driver performance';
    let script = scriptEl?.value?.trim();

    // Step 1: Generate script if empty
    if (!script && settings.claudeApiKey) {
      setStatus('✍️ Step 1/3: Generating video script...', 10);
      try {
        script = await generateVideoScript({
          topic, postContent: '', pillar: null, chemicalId: null,
          videoLength: '45-60s', platform: 'FB Reel + IG Reel',
          outputFormat: '9:16', apiKey: settings.claudeApiKey
        });
        if (scriptEl) scriptEl.value = script;
        const wc = script.trim().split(/\s+/).filter(Boolean).length;
        if (wcEl) wcEl.textContent = `${wc} words`;
      } catch (err) {
        setStatus(`❌ Script generation failed: ${err.message}`, 0);
        return;
      }
    } else if (!script) {
      showToast('Enter a script or add your Claude API key to auto-generate.', 'error');
      return;
    }

    // Step 2/3: Run Manus → HeyGen
    setStatus('🚀 Step 2/3: Running full pipeline (Manus → HeyGen)...', 30);
    try {
      await runFullPipeline({
        script, topic,
        onProgress: ({ step, total, message, warning }) => {
          const pct = Math.round((step / total) * 100);
          setStatus(`${warning ? '⚠️' : '🔄'} Step ${step}/${total}: ${message}`, pct);
        }
      });
      setStatus('✅ Pipeline complete! Check Recent Jobs below for status.', 100);
      showToast('Auto pipeline launched!', 'success');
    } catch (err) {
      setStatus(`❌ Pipeline error: ${err.message}`, 0);
      showToast('Pipeline error: ' + err.message, 'error');
    }
  });
}


// ─── Race Week Check (all calendars) ──────────────────────────
function checkRaceWeek() {
  state.allRaceContexts = getAllRaceWeekContexts();
  const champCtx = getChampionshipContext();
  if (champCtx) renderCalendarSection(champCtx);
}

function renderCalendarSection(champCtx) {
  const el = document.getElementById('calendar-context');
  if (!el) return;

  let html = '';
  if (champCtx.liveThisWeekend?.length > 0) {
    const events = champCtx.liveThisWeekend.map(e => `${e.flag} ${e.champName} at ${e.venue}`).join(' · ');
    html += `<div class="calendar-badge live">🏁 LIVE: ${events}</div>`;
  }
  if (champCtx.nextEvent) {
    const ne = champCtx.nextEvent;
    const daysText = ne.daysUntil <= 7 ? `<span class="days-count">IN ${ne.daysUntil} DAYS</span>` : '';
    html += `<div class="calendar-badge next">📅 Next: ${ne.flag} ${ne.champName} — ${ne.eventName} at ${ne.venue} ${daysText}</div>`;
  }
  el.innerHTML = html;
}


// ═══════════════════════════════════════════════════════════════
// MODE 1: THIS WEEK'S 7
// ═══════════════════════════════════════════════════════════════

function initWeeklyMode() {
  document.getElementById('find-stories-btn')?.addEventListener('click', handleFindStories);
  document.getElementById('write-all-btn')?.addEventListener('click', handleWriteAll);
  document.getElementById('export-csv-btn')?.addEventListener('click', handleExportCSV);
  document.getElementById('copy-csv-btn')?.addEventListener('click', handleCopyCSV);
  document.getElementById('generate-emails-btn')?.addEventListener('click', handleGenerateAllEmails);
  document.getElementById('clear-session-btn')?.addEventListener('click', clearSession);
  document.getElementById('back-to-stories-btn')?.addEventListener('click', () => {
    renderStoryCards();
    showContainer('stories-container');
  });
}


// ─── Step 1: Find Stories ─────────────────────────────────────
async function handleFindStories() {
  const settings = loadSettings();
  if (!settings.geminiApiKey) {
    showToast('Please add your Gemini API key in Settings ⚙️ first.', 'error');
    return;
  }

  const btn = document.getElementById('find-stories-btn');
  btn.classList.add('loading');
  btn.disabled = true;
  setStatus('🔍 Searching the web for interesting stories...', true);

  try {
    // AI decides all the assignments
    state.weeklyPillars = getWeeklyPillars();
    state.weeklyFrameworks = getWeeklyFrameworks();
    resetCTARotation();
    resetAuthorityRotation();
    state.weeklyCTAs = state.weeklyPillars.map(() => getRotatingCTA());
    state.weeklyAuthorities = state.weeklyPillars.map(() => getRotatingAuthority());

    // Generate topics via Gemini web search
    state.topics = await generateTopics(
      state.weeklyPillars,
      state.allRaceContexts,
      settings.geminiApiKey
    );

    // Store articles for deduplication
    storeUsedArticles(state.topics);

    // Build story cards from topics + auto-assigned metadata
    state.stories = state.topics.map((topic, i) => ({
      ...topic,
      pillar: state.weeklyPillars[i],
      framework: state.weeklyFrameworks[i],
      cta: state.weeklyCTAs[i],
      chemical: assignChemical(topic, state.weeklyPillars[i]),
      postType: state.weeklyFrameworks[i]?.name || 'Familiar'
    }));

    renderStoryCards();
    showContainer('stories-container');
    saveSession();
    showToast('7 stories found! Tap any to generate, or Write All 7.', 'success');
  } catch (err) {
    showToast(`Error: ${err.message}`, 'error');
    console.error(err);
  } finally {
    btn.classList.remove('loading');
    btn.disabled = false;
    setStatus('Ready');
  }
}


// ─── Assign neurochemical to a story based on pillar/topic ────
const CHEM_DATA = {
  'visual-targeting': { name: 'Dopamine', icon: '🎯', color: '#FF6B35', id: 'dopamine' },
  'braking-zone': { name: 'Cortisol', icon: '🔥', color: '#FF4444', id: 'cortisol' },
  'overthinking': { name: 'Norepinephrine', icon: '⚡', color: '#4488FF', id: 'flow-cocktail' },
  'expectation-pressure': { name: 'Cortisol', icon: '🔥', color: '#FF4444', id: 'cortisol' },
  'personal-best-triggers': { name: 'Dopamine', icon: '🎯', color: '#FF6B35', id: 'dopamine' },
  'race-craft': { name: 'Testosterone', icon: '🏆', color: '#f97316', id: 'testosterone' },
  'flow-state-confidence': { name: 'Endorphins', icon: '🌊', color: '#00BFA5', id: 'endorphins' },
  'confidence': { name: 'Serotonin', icon: '🧘', color: '#FFD700', id: 'serotonin' },
  'race-pressure': { name: 'Cortisol', icon: '🔥', color: '#FF4444', id: 'cortisol' },
  'flow-state': { name: 'Endorphins', icon: '🌊', color: '#00BFA5', id: 'endorphins' },
  'client-transformation': { name: 'Oxytocin', icon: '🤝', color: '#E91E8C', id: 'oxytocin' }
};

function assignChemical(topic, pillar) {
  return CHEM_DATA[pillar?.id] || { name: 'Dopamine', icon: '🎯', color: '#FF6B35', id: 'dopamine' };
}


// ─── Parse Video Script into Slide Sections (for inline confirm) ──
function parseVideoSlides(rawScript) {
  if (!rawScript) return [];

  const scriptMatch = rawScript.match(/=== VIDEO SCRIPT ===\s*([\s\S]*?)(?:=== SLIDE DECK|$)/i);
  const narration = (scriptMatch?.[1] || rawScript).trim();

  const slidePatterns = [
    { label: 'Hook', icon: '🎯', timing: '0-5s', slide: 1, regex: /(?:^|\n)\s*HOOK\s*(?:\([^)]*\))?\s*:\s*([\s\S]*?)(?=\n\s*(?:SCENARIO|THE SCIENCE|THE COST|THE BRIDGE|CTA)\s*(?:\(|:)|$)/i },
    { label: 'Scenario', icon: '🎬', timing: '5-15s', slide: 2, regex: /(?:^|\n)\s*SCENARIO\s*(?:\([^)]*\))?\s*:\s*([\s\S]*?)(?=\n\s*(?:THE SCIENCE|THE COST|THE BRIDGE|CTA)\s*(?:\(|:)|$)/i },
    { label: 'The Science', icon: '🧪', timing: '15-35s', slide: 3, regex: /(?:^|\n)\s*THE SCIENCE\s*(?:\([^)]*\))?\s*:\s*([\s\S]*?)(?=\n\s*(?:THE COST|THE BRIDGE|CTA)\s*(?:\(|:)|$)/i },
    { label: 'The Cost', icon: '📊', timing: '35-45s', slide: 4, regex: /(?:^|\n)\s*THE COST\s*(?:\([^)]*\))?\s*:\s*([\s\S]*?)(?=\n\s*(?:THE BRIDGE|CTA)\s*(?:\(|:)|$)/i },
    { label: 'The Bridge', icon: '🌉', timing: '45-55s', slide: 5, regex: /(?:^|\n)\s*THE BRIDGE\s*(?:\([^)]*\))?\s*:\s*([\s\S]*?)(?=\n\s*CTA\s*(?:\(|:)|$)/i },
    { label: 'CTA', icon: '📢', timing: '55-60s', slide: 6, regex: /(?:^|\n)\s*CTA\s*(?:\([^)]*\))?\s*:\s*([\s\S]*?)$/i }
  ];

  const slides = [];
  for (const p of slidePatterns) {
    const match = narration.match(p.regex);
    if (match && match[1]?.trim()) {
      slides.push({
        label: p.label,
        icon: p.icon,
        timing: p.timing,
        slide: p.slide,
        content: match[1].replace(/^\[|\]$/g, '').trim()
      });
    }
  }
  return slides;
}

// Parse 30s Shorts script into slide sections
function parseShortsSlides(rawScript) {
  if (!rawScript) return [];

  const scriptMatch = rawScript.match(/=== SHORTS SCRIPT[^=]*===\s*([\s\S]*?)(?:=== SHORTS SLIDE|$)/i);
  const narration = (scriptMatch?.[1] || rawScript).trim();

  const slidePatterns = [
    { label: 'Hook', icon: '🎯', timing: '0-5s', slide: 1, regex: /(?:^|\n)\s*HOOK\s*(?:\([^)]*\))?\s*(?:\|\s*Slide\s*\d+\s*)?\s*:\s*([\s\S]*?)(?=\n\s*(?:THE INSIGHT|THE PROOF|CTA)\s*(?:\(|\|)|$)/i },
    { label: 'The Insight', icon: '🧪', timing: '5-18s', slide: 2, regex: /(?:^|\n)\s*THE INSIGHT\s*(?:\([^)]*\))?\s*(?:\|\s*Slide\s*\d+\s*)?\s*:\s*([\s\S]*?)(?=\n\s*(?:THE PROOF|CTA)\s*(?:\(|\|)|$)/i },
    { label: 'The Proof', icon: '📊', timing: '18-25s', slide: 3, regex: /(?:^|\n)\s*THE PROOF\s*(?:\([^)]*\))?\s*(?:\|\s*Slide\s*\d+\s*)?\s*:\s*([\s\S]*?)(?=\n\s*CTA\s*(?:\(|\|)|$)/i },
    { label: 'CTA', icon: '📢', timing: '25-30s', slide: 4, regex: /(?:^|\n)\s*CTA\s*(?:\([^)]*\))?\s*(?:\|\s*Slide\s*\d+\s*)?\s*:\s*([\s\S]*?)$/i }
  ];

  const slides = [];
  for (const p of slidePatterns) {
    const match = narration.match(p.regex);
    if (match && match[1]?.trim()) {
      let content = match[1].trim();
      const voiceMatch = content.match(/Voice:\s*([\s\S]*?)(?=\n\s*On screen:|$)/i);
      if (voiceMatch) {
        content = voiceMatch[1].trim();
      } else {
        content = content.replace(/^On screen:.*$/gim, '').replace(/^Voice:\s*/gim, '').trim();
      }
      slides.push({
        label: p.label,
        icon: p.icon,
        timing: p.timing,
        slide: p.slide,
        content: content.replace(/^\[|\]$/g, '').trim()
      });
    }
  }
  return slides;
}

// Render slide boxes with individual copy buttons
function renderSlideBoxes(slides, idPrefix, accentColor = '#00BFA5') {
  if (!slides || slides.length === 0) return '<div style="color:var(--text-muted);font-size:0.75rem;padding:0.5rem;">Parsing slides...</div>';

  return slides.map(s => `
    <div class="slide-box" style="margin-bottom:0.5rem;border:1px solid ${accentColor}22;border-radius:6px;overflow:hidden;">
      <div style="display:flex;align-items:center;justify-content:space-between;padding:0.3rem 0.6rem;background:${accentColor}0D;">
        <div style="display:flex;align-items:center;gap:0.35rem;">
          <span style="font-size:0.7rem;">${s.icon}</span>
          <span style="font-size:0.68rem;font-weight:700;color:${accentColor};">Slide ${s.slide}: ${s.label}</span>
          <span style="font-size:0.55rem;padding:0.1rem 0.35rem;background:${accentColor}15;color:${accentColor};border-radius:3px;font-weight:600;">${s.timing}</span>
        </div>
        <button class="post-action-btn" onclick="navigator.clipboard.writeText(this.closest('.slide-box').querySelector('.slide-content').textContent.trim());window.showToast('Slide ${s.slide} copied!','success');" style="font-size:0.62rem;color:${accentColor};padding:0.15rem 0.4rem;">📋 Copy</button>
      </div>
      <div class="slide-content" style="padding:0.5rem 0.6rem;font-size:0.78rem;line-height:1.55;color:var(--text-primary);white-space:pre-wrap;background:rgba(0,0,0,0.15);cursor:text;user-select:all;">${escapeHtml(s.content)}</div>
    </div>
  `).join('');
}


// ─── Render Story Cards ──────────────────────────────────────
function renderStoryCards() {
  const container = document.getElementById('stories-list');
  const meta = document.getElementById('stories-meta');
  if (!container) return;

  const chemicals = [...new Set(state.stories.map(s => s.chemical?.name))].filter(Boolean);
  if (meta) {
    meta.textContent = `${state.stories.length} stories found · ${chemicals.length} neurochemicals`;
  }

  container.innerHTML = state.stories.map((story, i) => {
    const chem = story.chemical || {};
    const articleTitle = story.sourceArticle || '';
    const articleUrl = story.articleUrl || story.sourceUrl || '';
    const sourceDomain = articleUrl ? (() => { try { return new URL(articleUrl).hostname.replace('www.', ''); } catch { return ''; } })() : '';
    const urlMatch = story.urlMatchMethod || (articleUrl ? 'gemini-direct' : 'unverified');
    const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    // Match confidence badge
    const matchBadges = {
      'gemini-direct': { label: '✅ Direct', color: '#2EA043', tip: 'URL provided directly by Gemini search' },
      'domain-match': { label: '🔗 Domain', color: '#00BFA5', tip: 'URL matched by domain name in source' },
      'title-match': { label: '🔍 Keywords', color: '#DAA520', tip: 'URL matched by title keywords' },
      'url-rescue': { label: '🔎 Rescued', color: '#9B59B6', tip: 'URL found via follow-up search rescue' },
      'best-guess': { label: '🟡 Best Guess', color: '#E8912A', tip: 'Best available URL — verify before using' },
      'unverified': { label: '⚠️ No URL', color: '#E84444', tip: 'No URL could be matched from search results' }
    };
    const badge = matchBadges[urlMatch] || matchBadges['unverified'];

    // Check if grounding title differs from Gemini's sourceArticle
    const groundingTitle = story.groundingTitle || '';
    const titleMismatch = groundingTitle && articleTitle &&
      groundingTitle.toLowerCase().replace(/[^a-z0-9]/g, '') !== articleTitle.toLowerCase().replace(/[^a-z0-9]/g, '');

    // Summary: use summary field, or join talkingPoints
    const summaryText = story.summary || (story.talkingPoints?.length ? story.talkingPoints.join('. ') + '.' : '');

    return `
      <div class="story-card" data-index="${i}">
        <div class="story-card-tags">
          <span class="story-tag chemical" style="background:${chem.color}15;color:${chem.color};border:1px solid ${chem.color}30;">
            ${chem.icon || '🧪'} ${chem.name || 'Dopamine'}
          </span>
          <span class="story-tag post-type">
            ${story.framework?.icon || '📌'} ${story.postType || 'Familiar'}
          </span>
          <span class="story-tag pillar" style="color:${story.pillar?.color || '#888'};">
            ${story.pillar?.icon || ''} ${story.pillar?.name || ''}
          </span>
          <span style="font-size:0.62rem;color:var(--text-muted);margin-left:auto;">${dayNames[i] || `Day ${i + 1}`}</span>
        </div>

        <div class="story-card-body" style="padding:0.6rem 0.8rem;">
          <!-- HEADLINE -->
          <h3 class="story-headline" style="margin:0 0 0.5rem;font-size:0.95rem;line-height:1.3;">${escapeHtml(story.headline || story.topic || '')}</h3>

          <!-- ARTICLE -->
          <div style="margin-bottom:0.35rem;">
            <span style="font-size:0.68rem;font-weight:700;color:var(--neuro-teal,#00BFA5);letter-spacing:0.5px;">ARTICLE:</span>
            <span style="font-size:0.75rem;color:var(--text-primary);margin-left:0.3rem;">${escapeHtml(articleTitle || groundingTitle || 'No article title')}</span>
          </div>

          <!-- URL -->
          <div style="margin-bottom:0.35rem;display:flex;align-items:center;gap:0.4rem;flex-wrap:wrap;">
            <span style="font-size:0.68rem;font-weight:700;color:var(--neuro-teal,#00BFA5);letter-spacing:0.5px;">URL:</span>
            ${articleUrl ? `
              <a href="${escapeHtml(articleUrl)}" target="_blank" rel="noopener" style="font-size:0.7rem;color:var(--neuro-teal,#00BFA5);word-break:break-all;text-decoration:underline;" onclick="event.stopPropagation();">${escapeHtml(articleUrl.length > 70 ? articleUrl.substring(0, 70) + '...' : articleUrl)}</a>
            ` : `<span style="font-size:0.7rem;color:var(--text-muted);font-style:italic;">No URL found</span>`}
            <span style="font-size:0.58rem;padding:0.1rem 0.3rem;border-radius:3px;background:${badge.color}18;color:${badge.color};border:1px solid ${badge.color}30;font-weight:600;" title="${badge.tip}">${badge.label}</span>
          </div>

          ${titleMismatch ? `
          <div style="margin-bottom:0.35rem;padding:0.25rem 0.5rem;background:rgba(232,145,42,0.08);border-radius:4px;border-left:2px solid #E8912A;">
            <span style="font-size:0.62rem;color:#E8912A;font-weight:700;">🔍 REAL TITLE:</span>
            <span style="font-size:0.68rem;color:var(--text-secondary);font-style:italic;margin-left:0.2rem;">${escapeHtml(groundingTitle)}</span>
          </div>` : ''}

          <!-- SOURCE -->
          ${story.source ? `
          <div style="margin-bottom:0.35rem;">
            <span style="font-size:0.68rem;font-weight:700;color:var(--neuro-teal,#00BFA5);letter-spacing:0.5px;">SOURCE:</span>
            <span style="font-size:0.72rem;color:var(--text-secondary);margin-left:0.3rem;">${escapeHtml(story.source)}</span>
          </div>` : (sourceDomain ? `
          <div style="margin-bottom:0.35rem;">
            <span style="font-size:0.68rem;font-weight:700;color:var(--neuro-teal,#00BFA5);letter-spacing:0.5px;">SOURCE:</span>
            <span style="font-size:0.72rem;color:var(--text-secondary);margin-left:0.3rem;">${escapeHtml(sourceDomain)}</span>
          </div>` : '')}

          <!-- SUMMARY -->
          ${summaryText ? `
          <div style="margin-bottom:0.35rem;">
            <span style="font-size:0.68rem;font-weight:700;color:var(--neuro-teal,#00BFA5);letter-spacing:0.5px;">SUMMARY:</span>
            <p style="font-size:0.72rem;color:var(--text-secondary);line-height:1.5;margin:0.15rem 0 0;">${escapeHtml(summaryText)}</p>
          </div>` : ''}

          <!-- KILLER DATA POINT -->
          ${story.killerDataPoint ? `
          <div style="margin-bottom:0.35rem;padding:0.3rem 0.5rem;background:rgba(218,165,32,0.08);border-radius:4px;border-left:2px solid var(--gold,#DAA520);">
            <span style="font-size:0.68rem;font-weight:700;color:var(--gold,#DAA520);letter-spacing:0.5px;">📊 KILLER DATA POINT:</span>
            <p style="font-size:0.72rem;color:var(--gold,#DAA520);line-height:1.4;margin:0.15rem 0 0;font-weight:600;">"${escapeHtml(story.killerDataPoint)}"</p>
          </div>` : ''}

          <!-- RACING RELEVANCE -->
          ${story.racingRelevance ? `
          <div style="margin-bottom:0.2rem;padding:0.3rem 0.5rem;background:rgba(0,191,165,0.06);border-radius:4px;border-left:2px solid var(--neuro-teal,#00BFA5);">
            <span style="font-size:0.68rem;font-weight:700;color:var(--neuro-teal,#00BFA5);letter-spacing:0.5px;">🏁 RACING RELEVANCE:</span>
            <p style="font-size:0.72rem;color:var(--text-secondary);line-height:1.4;margin:0.15rem 0 0;font-style:italic;">${escapeHtml(story.racingRelevance)}</p>
          </div>` : ''}

          <!-- MECHANISM -->
          ${story.mechanism ? `
          <div style="margin-top:0.2rem;">
            <span style="font-size:0.62rem;color:var(--text-muted);">🧠 ${escapeHtml(story.mechanism)}</span>
          </div>` : ''}
        </div>

        <div class="story-card-actions">
          ${state.posts[i] ? `
          <span style="color:var(--green,#2EA043);font-size:0.75rem;font-weight:600;">✅ Generated</span>
          <button class="story-generate-btn" onclick="window.appActions.toggleInlinePost(${i})" style="font-size:0.72rem;padding:0.3rem 0.75rem;">👁️ View Post</button>
          <button class="story-generate-btn" onclick="window.appActions.generateStory(${i})" style="font-size:0.7rem;padding:0.3rem 0.6rem;background:none;border:1px solid var(--border);color:var(--text-muted);" title="Regenerate this post">
            🔄 Regen
          </button>
          ` : `
          <button class="story-generate-btn" onclick="window.appActions.regenerateStory(${i})" style="font-size:0.7rem;padding:0.3rem 0.6rem;background:none;border:1px solid var(--border);color:var(--text-muted);" title="Find a different story for this slot">
            🔄 Swap
          </button>
          <button class="story-generate-btn" onclick="window.appActions.generateStory(${i})">
            Generate →
          </button>
          `}
        </div>
      </div>
    `;
  }).join('');
}


// ─── Write All 7 ──────────────────────────────────────────────
async function handleWriteAll() {
  const settings = loadSettings();
  if (!settings.claudeApiKey) {
    showToast('Please add your Claude API key in Settings ⚙️ first.', 'error');
    return;
  }

  const btn = document.getElementById('write-all-btn');
  btn.classList.add('loading');
  btn.disabled = true;
  setStatus('✍️ Writing all 7 posts with Claude...', true);

  try {
    const campaignDays = state.topics.map((_, i) => i < CAMPAIGN_ARC.length ? CAMPAIGN_ARC[i] : null);
    const neurochemicals = getWeeklyNeurochemicals(state.topics.length);

    state.posts = await generatePosts(state.topics, {
      pillars: state.weeklyPillars,
      frameworks: state.weeklyFrameworks,
      ctas: state.weeklyCTAs,
      authorityLines: state.weeklyAuthorities,
      apiKey: settings.claudeApiKey,
      campaignDays,
      neurochemicals
    });

    storeUsedHooks(state.posts);
    renderPosts();
    showContainer('posts-container');
    saveSession();
    showToast('All 7 posts ready! Review and export below.', 'success');
  } catch (err) {
    showToast(`Error: ${err.message}`, 'error');
    console.error(err);
  } finally {
    btn.classList.remove('loading');
    btn.disabled = false;
    setStatus('Ready');
  }
}


// ─── Render Posts ─────────────────────────────────────────────
function renderPosts() {
  const container = document.getElementById('posts-grid');
  if (!container) return;

  const dates = getScheduleDates(state.posts.length);

  container.innerHTML = state.posts.map((post, i) => {
    const date = dates[i];
    const chem = state.stories[i]?.chemical || {};
    const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    // Handle null posts (not yet generated)
    if (!post) {
      const story = state.stories[i];
      return `
        <div class="post-card" id="post-card-${i}" data-index="${i}" style="opacity:0.5;border-style:dashed;">
          <div class="post-card-header">
            <div class="post-card-header-left">
              <span class="post-number">${i + 1}</span>
              <span class="story-tag chemical" style="background:${chem.color}15;color:${chem.color};border:1px solid ${chem.color}30;">
                ${chem.icon || '🧪'} ${chem.name || ''}
              </span>
              <span style="font-size:0.78rem;color:var(--text-secondary);">${escapeHtml(story?.headline || `Story ${i + 1}`)}</span>
            </div>
            <div class="post-card-header-right">
              <span class="schedule-info">${dayNames[i] || `Day ${i + 1}`} ${date?.dateString || ''}</span>
            </div>
          </div>
          <div style="padding:2rem;text-align:center;">
            <p style="font-size:0.82rem;color:var(--text-muted);margin-bottom:1rem;">Post not yet written</p>
            <button class="story-generate-btn" onclick="window.appActions.generateStory(${i})" style="font-size:0.82rem;padding:0.5rem 1.2rem;">
              ✍️ Generate →
            </button>
          </div>
        </div>
      `;
    }

    const isConfirmed = post._confirmed || false;
    const isEditing = post._editing || false;
    const topicData = post.topic || state.topics?.[i] || {};

    // Parse FB/IG content — always produce two versions
    let fbContent = post._fbContent || '';
    let igContent = post._igContent || '';
    if (!fbContent && !igContent) {
      const raw = post.content || '';
      const hasDual = raw.includes('=== FACEBOOK POST ===');
      if (hasDual) {
        const fbMatch = raw.match(/=== FACEBOOK POST ===([\s\S]*?)(?:=== INSTAGRAM CAPTION ===|$)/);
        const igMatch = raw.match(/=== INSTAGRAM CAPTION ===([\s\S]*?)(?:=== IMAGE TEXT ===|$)/);
        fbContent = (fbMatch?.[1] || '').trim();
        igContent = (igMatch?.[1] || '').trim();
      } else {
        fbContent = raw;
        igContent = raw;
      }
      post._fbContent = fbContent;
      post._igContent = igContent;
    }

    const fbWords = fbContent.split(/\s+/).filter(w => w).length;
    const igWords = igContent.split(/\s+/).filter(w => w).length;

    // Status badge
    let statusBadge = '';
    if (isConfirmed) statusBadge = '<span style="font-size:0.7rem;color:var(--green,#2EA043);font-weight:700;margin-left:0.5rem;">✅ CONFIRMED</span>';
    else if (isEditing) statusBadge = '<span style="font-size:0.7rem;color:var(--gold,#DAA520);font-weight:700;margin-left:0.5rem;">✏️ EDITING</span>';

    // Source article link
    const articleLink = topicData.articleUrl
      ? `<div style="padding:0.4rem 1rem;background:rgba(0,191,165,0.04);border-top:1px solid rgba(255,255,255,0.04);font-size:0.72rem;">
                 <span style="color:var(--text-muted);">📰 Source:</span>
                 <a href="${escapeHtml(topicData.articleUrl)}" target="_blank" rel="noopener" style="color:var(--neuro-teal,#00BFA5);text-decoration:none;margin-left:0.3rem;">${escapeHtml(topicData.sourceArticle || topicData.headline || 'View Article')}</a>
               </div>` : '';

    return `
      <div class="post-card" id="post-card-${i}" data-index="${i}" style="${isConfirmed ? 'border-color:rgba(46,160,67,0.3);' : isEditing ? 'border-color:rgba(218,165,32,0.3);' : ''}">
        <div class="post-card-header">
          <div class="post-card-header-left">
            <span class="post-number">${i + 1}</span>
            <span class="story-tag chemical" style="background:${chem.color}15;color:${chem.color};border:1px solid ${chem.color}30;">
              ${chem.icon || '🧪'} ${chem.name || ''}
            </span>
            <span class="pillar-badge" style="border: 1px solid ${post.pillar.color}30; color: ${post.pillar.color};">
              ${post.pillar.icon} ${post.pillar.name}
            </span>
            <span class="framework-badge">${post.framework.icon} ${post.framework.name}</span>
            ${statusBadge}
          </div>
          <div class="post-card-header-right">
            <span class="schedule-info">${date.dayName} ${date.dateString}</span>
          </div>
        </div>

        ${articleLink}

        <!-- FB + IG Tabs (always visible) -->
        <div class="platform-tabs" id="platform-tabs-${i}">
          <button class="platform-tab active" data-platform="fb" onclick="window.appActions.switchTab(${i}, 'fb')">📘 Facebook <span style="font-size:0.65rem;opacity:0.6;">${fbWords}w</span></button>
          <button class="platform-tab" data-platform="ig" onclick="window.appActions.switchTab(${i}, 'ig')">📷 Instagram <span style="font-size:0.65rem;opacity:0.6;">${igWords}w</span></button>
        </div>

        ${isEditing ? `
        <!-- EDIT MODE -->
        <div id="edit-area-${i}">
          <div id="edit-fb-${i}" style="padding:0.5rem 1rem;">
            <label style="font-size:0.68rem;font-weight:600;color:var(--gold,#DAA520);display:block;margin-bottom:0.25rem;">📘 Facebook Post</label>
            <textarea id="edit-fb-text-${i}" style="width:100%;min-height:220px;background:rgba(0,0,0,0.3);color:var(--text-primary,#F0F6FC);border:1px solid rgba(218,165,32,0.2);border-radius:6px;padding:0.75rem;font-size:0.82rem;line-height:1.6;font-family:var(--font);resize:vertical;">${escapeHtml(fbContent)}</textarea>
          </div>
          <div id="edit-ig-${i}" style="padding:0.5rem 1rem;display:none;">
            <label style="font-size:0.68rem;font-weight:600;color:var(--gold,#DAA520);display:block;margin-bottom:0.25rem;">📷 Instagram Caption</label>
            <textarea id="edit-ig-text-${i}" style="width:100%;min-height:220px;background:rgba(0,0,0,0.3);color:var(--text-primary,#F0F6FC);border:1px solid rgba(218,165,32,0.2);border-radius:6px;padding:0.75rem;font-size:0.82rem;line-height:1.6;font-family:var(--font);resize:vertical;">${escapeHtml(igContent)}</textarea>
          </div>
        </div>
        ` : `
        <!-- READ MODE -->
        <div class="post-content" id="post-content-${i}" data-fb="${encodeURIComponent(fbContent)}" data-ig="${encodeURIComponent(igContent)}">${escapeHtml(fbContent)}</div>
        `}

        <div class="post-card-footer">
          <div class="post-meta">
            <span class="word-count">FB ${fbWords}w · IG ${igWords}w</span>
          </div>
          <div class="post-actions">
            <button class="post-action-btn" onclick="window.appActions.copyPost(${i})">📋 Copy</button>
            ${!isConfirmed && !isEditing ? `
            <button class="post-action-btn" onclick="window.appActions.editPost(${i})" style="color:var(--gold,#DAA520);font-weight:600;">✏️ Edit</button>
            <button class="post-action-btn" onclick="window.appActions.confirmPost(${i})" style="color:var(--green,#2EA043);font-weight:700;">✅ Confirm</button>
            <button class="post-action-btn" onclick="window.appActions.regenPost(${i})">🔄 Regen</button>
            ` : ''}
            ${isEditing ? `
            <button class="post-action-btn" onclick="window.appActions.cancelEdit(${i})" style="color:var(--text-muted);">✖ Cancel</button>
            <button class="post-action-btn" onclick="window.appActions.confirmPost(${i})" style="color:var(--green,#2EA043);font-weight:700;">✅ Save & Confirm</button>
            ` : ''}
          </div>
        </div>

        <!-- Email + Video Script (shown after confirm) -->
        <div id="confirmed-blocks-${i}" style="${isConfirmed ? '' : 'display:none;'}">
          ${isConfirmed && post._emailHTML ? `
          <div style="border-top:1px solid rgba(255,255,255,0.06);padding:1rem;">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:0.5rem;">
              <span style="font-size:0.8rem;font-weight:700;color:var(--gold,#DAA520);">📧 Email HTML</span>
              <div style="display:flex;gap:0.4rem;">
                <button class="post-action-btn" onclick="window.appActions.copyEmailHTML(${i})" style="font-size:0.7rem;">📋 Copy HTML</button>
                <button class="post-action-btn" onclick="window.appActions.copyEmailSubject(${i})" style="font-size:0.7rem;">📝 Subject</button>
              </div>
            </div>
            <div style="border:1px solid rgba(255,255,255,0.06);border-radius:8px;overflow:hidden;background:#0D1117;">
              <iframe id="email-frame-${i}" style="width:100%;height:320px;border:none;" srcdoc="${escapeHtml(post._emailHTML)}"></iframe>
            </div>
          </div>
          ` : ''}
          ${isConfirmed && post._videoNarration ? `
          <div style="border-top:1px solid rgba(255,255,255,0.06);padding:1rem;">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:0.5rem;">
              <span style="font-size:0.8rem;font-weight:700;color:var(--neuro-teal,#00BFA5);">🎬 Video Script — Per Slide</span>
              <div style="display:flex;gap:0.4rem;">
                <button class="post-action-btn" onclick="window.appActions.copyVideoScript(${i})" style="font-size:0.7rem;">📋 Copy All</button>
                <button class="post-action-btn" onclick="window.appActions.openManusPrompt(${i})" style="font-size:0.7rem;">📊 Manus Prompt</button>
              </div>
            </div>
            <div style="display:flex;flex-direction:column;gap:0.5rem;">
              ${(post._videoSections || []).map((sec, si) => `
              <div style="border:1px solid ${sec.color}22;border-left:3px solid ${sec.color};border-radius:8px;background:rgba(0,0,0,0.25);overflow:hidden;">
                <div style="display:flex;align-items:center;justify-content:space-between;padding:0.4rem 0.65rem;background:rgba(0,0,0,0.2);border-bottom:1px solid rgba(255,255,255,0.04);">
                  <span style="font-size:0.7rem;font-weight:700;color:${sec.color};">${sec.icon} Slide ${sec.slide}: ${sec.label} <span style="font-weight:400;opacity:0.6;">(${sec.time})</span></span>
                  <button class="post-action-btn" onclick="window.appActions.copySlideText(${i}, ${si})" style="font-size:0.65rem;padding:0.15rem 0.5rem;">📋 Copy</button>
                </div>
                <div style="padding:0.5rem 0.65rem;font-size:0.78rem;line-height:1.6;color:var(--text-primary,#F0F6FC);white-space:pre-wrap;font-family:var(--font);">${escapeHtml(sec.text) || '<span style=\"color:var(--text-muted);font-style:italic;\">No content</span>'}</div>
              </div>
              `).join('')}
            </div>
          </div>
          ` : ''}
          ${isConfirmed && !post._emailHTML ? `
          <div style="border-top:1px solid rgba(255,255,255,0.06);padding:1.5rem;text-align:center;">
            <div style="font-size:0.8rem;color:var(--text-muted);" id="confirm-status-${i}">⏳ Generating email + video script + 30s Short...</div>
          </div>
          ` : ''}}

          ${isConfirmed && post._shortsNarration ? `
          <div style="border-top:1px solid rgba(255,255,255,0.06);padding:1rem;">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:0.5rem;">
              <span style="font-size:0.8rem;font-weight:700;color:#FF6B35;">🎬 30-Second Short Script</span>
              <div style="display:flex;gap:0.4rem;">
                <button class="post-action-btn" onclick="window.appActions.copyShortsScript(${i})" style="font-size:0.7rem;">📋 Copy Script</button>
                <button class="post-action-btn" onclick="window.appActions.openShortsManusPrompt(${i})" style="font-size:0.7rem;">📊 Shorts Manus</button>
              </div>
            </div>
            ${post._shortsLoopNote ? `<div style="margin-bottom:0.5rem;padding:0.35rem 0.6rem;background:rgba(255,107,53,0.06);border-radius:5px;border-left:2px solid #FF6B35;font-size:0.68rem;color:var(--text-muted);">🔄 <strong>Loop:</strong> ${escapeHtml(post._shortsLoopNote)}</div>` : ''}
            <div style="display:flex;flex-direction:column;gap:0.5rem;">
              ${(post._shortsSections || []).map((sec, si) => `
              <div style="border:1px solid ${sec.color}22;border-left:3px solid ${sec.color};border-radius:8px;background:rgba(0,0,0,0.25);overflow:hidden;">
                <div style="display:flex;align-items:center;justify-content:space-between;padding:0.4rem 0.65rem;background:rgba(0,0,0,0.2);border-bottom:1px solid rgba(255,255,255,0.04);">
                  <span style="font-size:0.7rem;font-weight:700;color:${sec.color};">${sec.icon} Slide ${sec.slide}: ${sec.label} <span style="font-weight:400;opacity:0.6;">(${sec.time})</span></span>
                  <button class="post-action-btn" onclick="window.appActions.copyShortsSlideText(${i}, ${si})" style="font-size:0.65rem;padding:0.15rem 0.5rem;">📋 Copy</button>
                </div>
                ${sec.onScreen ? `<div style="padding:0.3rem 0.65rem;font-size:0.7rem;color:var(--text-muted);border-bottom:1px solid rgba(255,255,255,0.03);"><strong>On screen:</strong> ${escapeHtml(sec.onScreen)}</div>` : ''}
                <div style="padding:0.5rem 0.65rem;font-size:0.78rem;line-height:1.6;color:var(--text-primary,#F0F6FC);white-space:pre-wrap;font-family:var(--font);">${sec.voice ? escapeHtml(sec.voice) : escapeHtml(sec.text) || '<span style=\"color:var(--text-muted);font-style:italic;\">No content</span>'}</div>
              </div>
              `).join('')}
            </div>
          </div>
          ` : ''}

          ${isConfirmed ? `
          <!-- 🚀 LAUNCH LINKS -->
          <div style="border-top:1px solid rgba(255,255,255,0.06);padding:0.6rem 1rem;display:flex;gap:0.5rem;flex-wrap:wrap;align-items:center;">
            <span style="font-size:0.72rem;font-weight:700;color:var(--text-muted);">🚀 NEXT:</span>
            <a href="https://manus.im/app/project/5ndQv7naHNFmzkfVtH4dfq" target="_blank" rel="noopener" style="font-size:0.72rem;padding:0.25rem 0.6rem;background:rgba(0,191,165,0.12);color:var(--neuro-teal,#00BFA5);border:1px solid rgba(0,191,165,0.3);border-radius:5px;text-decoration:none;font-weight:700;">🎨 Manus Slides</a>
            <a href="https://app.heygen.com/avatar/ppt-to-video" target="_blank" rel="noopener" style="font-size:0.72rem;padding:0.25rem 0.6rem;background:rgba(218,165,32,0.12);color:var(--gold,#DAA520);border:1px solid rgba(218,165,32,0.3);border-radius:5px;text-decoration:none;font-weight:700;">🎬 HeyGen Video</a>
            <a href="https://app.gohighlevel.com/v2/location/vdgR8teGuIgHPMPzbQkK/marketing/social-planner" target="_blank" rel="noopener" style="font-size:0.72rem;padding:0.25rem 0.6rem;background:rgba(46,160,67,0.12);color:var(--green,#2EA043);border:1px solid rgba(46,160,67,0.3);border-radius:5px;text-decoration:none;font-weight:700;">📱 GHL Planner</a>
            <a href="https://app.usegoplus.com/location/C03hMrgoj4FLALDMqpWr/emails/create/69ae8a72a971f31b0e6df1c3/builder" target="_blank" rel="noopener" style="font-size:0.72rem;padding:0.25rem 0.6rem;background:rgba(139,92,246,0.12);color:#8B5CF6;border:1px solid rgba(139,92,246,0.3);border-radius:5px;text-decoration:none;font-weight:700;">📧 GHL Email</a>
          </div>
          <!-- 🔗 Source URL for Manus -->
          ${topicData.articleUrl ? `
          <div style="border-top:1px solid rgba(255,255,255,0.06);padding:0.4rem 1rem;display:flex;align-items:center;gap:0.5rem;">
            <span style="font-size:0.66rem;color:var(--neuro-teal,#00BFA5);font-weight:700;">🔗 Article URL for Manus:</span>
            <a href="${escapeHtml(topicData.articleUrl)}" target="_blank" rel="noopener" style="font-size:0.66rem;color:var(--text-secondary);flex:1;word-break:break-all;text-decoration:underline;">${escapeHtml(topicData.articleUrl)}</a>
            <button class="post-action-btn" onclick="navigator.clipboard.writeText('${escapeHtml(topicData.articleUrl)}');window.showToast && window.showToast('URL copied!','success')" style="font-size:0.62rem;">📋</button>
          </div>` : ''}
          ` : ''}
        </div>
      </div>
    `;
  }).join('');

  // Wire edit-mode tab switching for textareas
  state.posts.forEach((post, i) => {
    if (post && post._editing) {
      const tabs = document.getElementById(`platform-tabs-${i}`)?.querySelectorAll('.platform-tab');
      tabs?.forEach(tab => {
        tab.addEventListener('click', () => {
          const p = tab.dataset.platform;
          const fbPanel = document.getElementById(`edit-fb-${i}`);
          const igPanel = document.getElementById(`edit-ig-${i}`);
          if (fbPanel) fbPanel.style.display = p === 'fb' ? 'block' : 'none';
          if (igPanel) igPanel.style.display = p === 'ig' ? 'block' : 'none';
          tabs.forEach(t => t.classList.toggle('active', t.dataset.platform === p));
        });
      });
    }
  });
}


// ─── Post Actions ─────────────────────────────────────────────
window.appActions = {
  // Navigate to posts view and scroll to a specific post
  viewPost(index) {
    // Ensure posts array has slots
    while (state.posts.length < state.stories.length) {
      state.posts.push(null);
    }
    renderPosts();
    showContainer('posts-container');
    requestAnimationFrame(() => {
      const postCard = document.getElementById(`post-card-${index}`);
      if (postCard) {
        postCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
        postCard.style.transition = 'box-shadow 0.3s ease';
        postCard.style.boxShadow = '0 0 20px rgba(0,191,165,0.3)';
        setTimeout(() => { postCard.style.boxShadow = ''; }, 2000);
      }
    });
  },

  // Tab switching (works in both read and edit mode)
  switchTab(index, platform) {
    const post = state.posts[index];
    if (post?._editing) {
      const fbPanel = document.getElementById(`edit-fb-${index}`);
      const igPanel = document.getElementById(`edit-ig-${index}`);
      if (fbPanel) fbPanel.style.display = platform === 'fb' ? 'block' : 'none';
      if (igPanel) igPanel.style.display = platform === 'ig' ? 'block' : 'none';
    } else {
      const container = document.getElementById(`post-content-${index}`);
      if (container) {
        const content = platform === 'ig' ? decodeURIComponent(container.dataset.ig) : decodeURIComponent(container.dataset.fb);
        container.textContent = content;
      }
    }
    const tabs = document.getElementById(`platform-tabs-${index}`)?.querySelectorAll('.platform-tab');
    tabs?.forEach(t => t.classList.toggle('active', t.dataset.platform === platform));
  },

  copyPost(index) {
    const post = state.posts[index];
    if (!post) return;
    const activeTab = document.querySelector(`#platform-tabs-${index} .platform-tab.active`);
    const platform = activeTab?.dataset.platform || 'fb';
    const content = platform === 'ig' ? (post._igContent || post.content) : (post._fbContent || post.content);
    copyToClipboard(content);
    showToast(`${platform === 'ig' ? 'Instagram' : 'Facebook'} post copied!`, 'success');
  },

  editPost(index) {
    const post = state.posts[index];
    if (!post) return;
    post._editing = true;
    renderPosts();
    showToast('Edit mode — modify FB and IG versions, then Save & Confirm.', 'info');
  },

  cancelEdit(index) {
    const post = state.posts[index];
    if (!post) return;
    post._editing = false;
    renderPosts();
  },

  // ─── Confirm Post → Save Edits + Generate Email + Video ──
  async confirmPost(index) {
    const post = state.posts[index];
    if (!post) return;
    const settings = loadSettings();
    if (!settings.claudeApiKey) { showToast('Claude API key needed.', 'error'); return; }

    // If in edit mode, save the textarea contents
    if (post._editing) {
      const fbText = document.getElementById(`edit-fb-text-${index}`)?.value;
      const igText = document.getElementById(`edit-ig-text-${index}`)?.value;
      if (fbText !== undefined) post._fbContent = fbText.trim();
      if (igText !== undefined) post._igContent = igText.trim();
      post.content = `=== FACEBOOK POST ===\n${post._fbContent}\n\n=== INSTAGRAM CAPTION ===\n${post._igContent}`;
      post._editing = false;
    }

    post._confirmed = true;
    renderPosts();
    saveSession();

    const chemData = CHEM_DATA[post.pillar?.id] || { id: 'dopamine', name: 'Dopamine', icon: '🧪', color: '#ffd43b' };
    const topicData = post.topic || state.topics?.[index] || {};

    setStatus(`✅ Confirmed post ${index + 1} — generating email + video script + 30s Short...`, true);

    try {
      const [emailData, videoScript, shortsScript] = await Promise.all([
        generateEmail({
          postContent: post._fbContent || post.content,
          topic: topicData,
          pillar: post.pillar,
          cta: post.cta,
          apiKey: settings.claudeApiKey
        }),
        generateVideoScript({
          topic: topicData,
          postContent: post._fbContent || post.content,
          pillar: post.pillar,
          chemicalId: chemData.id,
          videoLength: '45-60s',
          platform: 'FB Reel + IG Reel',
          outputFormat: '9:16',
          apiKey: settings.claudeApiKey
        }),
        generateShortsScript({
          topic: topicData,
          postContent: post._fbContent || post.content,
          pillar: post.pillar,
          chemicalId: chemData.id,
          apiKey: settings.claudeApiKey
        })
      ]);

      const emailHTML = renderEmailHTML(emailData, post.pillar);
      post._emailHTML = emailHTML;
      post._emailSubject = emailData.subject;

      const parsed = parseVideoScript(videoScript);
      post._videoNarration = parsed.pureNarration;
      post._videoSections = parsed.sections;
      post._videoFull = videoScript;
      post._manusPrompt = buildManusPrompt(parsed.slideBrief, chemData, index, topicData);

      // 30-Second Short
      const shortsParsed = parseShortsScript(shortsScript);
      post._shortsNarration = shortsParsed.pureNarration;
      post._shortsFull = shortsScript;
      post._shortsManusPrompt = buildShortsManusPrompt(shortsParsed.slideBrief, chemData, index, topicData);
      post._shortsLoopNote = shortsParsed.loopNote;
      post._shortsSections = shortsParsed.shortsSections;

      saveSession();
      renderPosts();
      showToast(`Post ${index + 1} confirmed — email + video + 30s Short ready!`, 'success');
    } catch (err) {
      showToast(`Error generating assets: ${err.message}`, 'error');
      console.error(err);
      const statusEl = document.getElementById(`confirm-status-${index}`);
      if (statusEl) statusEl.innerHTML = `<span style="color:var(--accent);">❌ Error: ${escapeHtml(err.message)}</span>`;
    } finally { setStatus('Ready'); }
  },

  copyEmailHTML(index) {
    const post = state.posts[index];
    if (post?._emailHTML) { copyToClipboard(post._emailHTML); showToast('Email HTML copied!', 'success'); }
  },

  copyEmailSubject(index) {
    const post = state.posts[index];
    if (post?._emailSubject) { copyToClipboard(post._emailSubject); showToast('Subject copied!', 'success'); }
  },

  copyVideoScript(index) {
    const post = state.posts[index];
    if (post?._videoNarration) { copyToClipboard(post._videoNarration); showToast('Full video script copied!', 'success'); }
  },

  copySlideText(postIndex, slideIndex) {
    const post = state.posts[postIndex];
    const sec = post?._videoSections?.[slideIndex];
    if (sec?.text) {
      copyToClipboard(sec.text);
      showToast(`Slide ${sec.slide} (${sec.label}) copied!`, 'success');
    }
  },

  openManusPrompt(index) {
    const post = state.posts[index];
    if (!post?._manusPrompt) { showToast('No Manus prompt available.', 'error'); return; }
    const chemData = CHEM_DATA[post.pillar?.id] || {};
    showVideoModal(post._videoFull, index, chemData, loadSettings());
  },

  async regenPost(index) {
    const settings = loadSettings();
    if (!settings.claudeApiKey) { showToast('Claude API key needed.', 'error'); return; }

    setStatus(`Regenerating post ${index + 1}...`, true);
    try {
      const newPost = await regeneratePost(state.posts[index], settings.claudeApiKey);
      state.posts[index] = newPost;
      renderPosts();
      saveSession();
      showToast(`Post ${index + 1} regenerated!`, 'success');
    } catch (err) {
      showToast(`Regen error: ${err.message}`, 'error');
    } finally { setStatus('Ready'); }
  },

  async generateEmailForPost(index) {
    const post = state.posts[index];
    if (!post) return;
    const settings = loadSettings();
    if (!settings.claudeApiKey) { showToast('Claude API key needed for emails.', 'error'); return; }

    setStatus('Generating email...', true);
    try {
      const emailData = await generateEmail({
        postContent: post.content,
        topic: post.topic || state.topics[index],
        pillar: post.pillar,
        cta: post.cta,
        apiKey: settings.claudeApiKey
      });
      const emailHTML = renderEmailHTML(emailData);
      showEmailModal(emailData, emailHTML, index);
      showToast(`Email generated for post ${index + 1}!`, 'success');
    } catch (err) {
      showToast(`Email error: ${err.message}`, 'error');
    } finally { setStatus('Ready'); }
  },

  // ─── Regenerate (swap) a single story without affecting the rest ─────
  async regenerateStory(index) {
    const settings = loadSettings();
    if (!settings.geminiApiKey) { showToast('Gemini API key needed.', 'error'); return; }

    const card = document.querySelector(`.story-card[data-index="${index}"]`);
    if (card) {
      card.querySelector('.story-card-actions').innerHTML = `
        <span style="color:var(--neuro-teal,#00BFA5);font-size:0.75rem;font-weight:600;">🔄 Finding new story...</span>
      `;
      card.style.opacity = '0.6';
    }

    const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const daySlots = [
      'Outside the Paddock — a fascinating story from tennis, rugby, cycling, Olympic sport, combat sport, neuroscience, or tech. NOT motorcycle racing. Must bridge back to car racing mental performance.',
      'Client Transformation — a racing driver comeback or breakthrough story.',
      'Neuroscience Teach — brain science applied to driving a car on track.',
      'Provocative Hook — ONE uncomfortable truth about racing psychology.',
      'Timely Race Reaction — react to REAL recent F1, DTM, Porsche Carrera Cup, Indy NXT, or GT racing results.',
      'Achievement/Tech Spotlight — performance technology, wearable tech, biometric studies connected to car racing.',
      'Proof & Celebration — inspiring racing driver wins, championship stats, or mental performance breakthroughs.'
    ];

    const existingHeadlines = state.stories.map(s => s.headline || s.topic || '').filter(Boolean);

    setStatus(`🔄 Finding replacement story for ${dayNames[index]}...`, true);

    try {
      const prompt = `Search the web for 1 NEW story from the last 7-30 days for a car racing mental performance coach's social media.

SLOT: ${dayNames[index]}: ${daySlots[index]}

DO NOT use any of these stories (already in use):
${existingHeadlines.map(h => `- ${h}`).join('\n')}

SEARCH SOURCES: F1.com, DTM.com, The Race, Motorsport.com, Autosport.com, Crash.net, Racer.com, BBC Sport, Sky Sports F1, DC Rainmaker, Wareable.
NO YOUTUBE — only written articles.
NO MOTORCYCLE RACING.

CRITICAL URL RULE: The "articleUrl" MUST be a real, working URL from the Google Search results you received. Do NOT invent URLs. If you cannot find one, set articleUrl to "".

Return a JSON array with exactly 1 object:
[{
    "headline": "Compelling headline",
    "sourceArticle": "Article title — Publication",
    "articleUrl": "REAL URL from search results",
    "talkingPoints": ["Point 1", "Point 2", "Point 3"],
    "emotionalHook": "What should the driver feel?",
    "mechanism": "Neuroscience mechanism",
    "racingRelevance": "Connection to car racing",
    "contentBrief": "Type of post"
}]

Return ONLY the JSON array.`;

      const result = await callGeminiWithSearch(prompt, settings.geminiApiKey, true);
      const newStory = Array.isArray(result) ? result[0] : result;

      if (newStory) {
        const oldStory = state.stories[index];
        state.stories[index] = {
          ...newStory,
          pillar: oldStory.pillar,
          framework: oldStory.framework,
          cta: oldStory.cta,
          chemical: oldStory.chemical,
          postType: oldStory.postType,
          angle: newStory.emotionalHook || newStory.racingRelevance || ''
        };

        // Clear any generated post for this slot
        if (state.posts[index]) state.posts[index] = null;
        const inlinePost = document.getElementById(`inline-post-${index}`);
        if (inlinePost) inlinePost.remove();

        saveSession();
        renderStoryCards();
        showToast(`🔄 Story ${index + 1} swapped!`, 'success');
      } else {
        showToast('Could not find a replacement story. Try again.', 'error');
      }
    } catch (err) {
      showToast(`Error: ${err.message}`, 'error');
      if (card) {
        card.style.opacity = '1';
        card.querySelector('.story-card-actions').innerHTML = `
          <button class="story-generate-btn" onclick="window.appActions.regenerateStory(${index})" style="font-size:0.7rem;padding:0.3rem 0.6rem;background:none;border:1px solid var(--border);color:var(--text-muted);">🔄 Swap</button>
          <button class="story-generate-btn" onclick="window.appActions.generateStory(${index})">Generate →</button>
        `;
      }
    } finally { setStatus('Ready'); }
  },

  async generateStory(index) {
    const story = state.stories[index];
    if (!story) return;
    const settings = loadSettings();
    if (!settings.claudeApiKey) { showToast('Claude API key needed.', 'error'); return; }

    // Show loading on the button
    const card = document.querySelector(`.story-card[data-index="${index}"]`);
    if (card) {
      card.querySelector('.story-card-actions').innerHTML = `
        <span style="color:var(--neuro-teal,#00BFA5);font-size:0.75rem;font-weight:600;display:flex;align-items:center;gap:0.4rem;">
          <span class="spinner" style="width:14px;height:14px;border-width:2px;"></span> Writing post...
        </span>
      `;
    }

    setStatus(`Writing post for story ${index + 1}...`, true);
    try {
      const content = await generatePost({
        topic: story,
        pillar: story.pillar,
        framework: story.framework,
        cta: story.cta,
        authorityLine: state.weeklyAuthorities[index] || getRotatingAuthority(),
        apiKey: settings.claudeApiKey
      });

      // Ensure posts array has slots for all stories
      while (state.posts.length < state.stories.length) {
        state.posts.push(null);
      }

      // Add/update the post at this index
      if (!state.posts[index]) {
        state.posts[index] = {
          id: `post-${Date.now()}-${index}`,
          content,
          pillar: story.pillar,
          framework: story.framework,
          cta: story.cta,
          topic: state.topics[index],
          imageUrl: '',
          edited: false
        };
      } else {
        state.posts[index].content = content;
      }

      saveSession();
      showToast(`Post ${index + 1} generated!`, 'success');

      // If all posts are generated, show full posts view
      if (state.posts.filter(Boolean).length === state.stories.length) {
        renderPosts();
        showContainer('posts-container');
      } else {
        // Show the generated post inline below the story card
        if (card) {
          card.querySelector('.story-card-actions').innerHTML = `
            <span style="color:var(--green,#2EA043);font-size:0.75rem;font-weight:600;">✅ Generated</span>
            <button class="story-generate-btn" onclick="window.appActions.toggleInlinePost(${index})" style="font-size:0.72rem;padding:0.3rem 0.75rem;">👁️ View Post</button>
          `;
          card.style.borderColor = 'rgba(46,160,67,0.3)';

          // Render the inline post preview below the story card
          this.renderInlinePost(index, card);
        }
      }
    } catch (err) {
      showToast(`Error: ${err.message}`, 'error');
      if (card) {
        card.querySelector('.story-card-actions').innerHTML = `
          <button class="story-generate-btn" onclick="window.appActions.generateStory(${index})">🔄 Retry</button>
        `;
      }
    } finally { setStatus('Ready'); }
  },

  // Render single post inline below story card — full workflow
  renderInlinePost(index, card) {
    const post = state.posts[index];
    if (!post) return;

    const existingPreview = document.getElementById(`inline-post-${index}`);
    if (existingPreview) existingPreview.remove();

    const story = state.stories[index] || {};
    const articleTitle = story.sourceArticle || story.source || '';
    const articleLink = story.articleUrl || story.sourceUrl || '';
    const wordCount = (post.content || '').split(/\s+/).filter(Boolean).length;
    const isConfirmed = state.doneData?.[index]?.confirmed;

    const div = document.createElement('div');
    div.id = `inline-post-${index}`;
    div.style.cssText = `margin:0.5rem 0 1rem;border:1px solid ${isConfirmed ? 'rgba(0,191,165,0.3)' : 'rgba(0,191,165,0.2)'};border-radius:8px;background:var(--card);overflow:hidden;${isConfirmed ? 'border-left:3px solid var(--neuro-teal,#00BFA5);' : ''}`;

    div.innerHTML = `
      <!-- Source Article Bar -->
      ${articleTitle ? `
      <div style="padding:0.5rem 1rem;background:rgba(0,191,165,0.05);border-bottom:1px solid var(--border);display:flex;align-items:center;gap:0.5rem;${articleLink ? 'cursor:pointer;' : ''}" ${articleLink ? `onclick="window.open('${escapeHtml(articleLink)}','_blank')"` : ''}>
        <span style="font-size:0.72rem;font-weight:600;color:var(--neuro-teal,#00BFA5);">📰</span>
        <span style="font-size:0.72rem;color:var(--text-secondary);flex:1;">${escapeHtml(articleTitle)}</span>
        ${articleLink ? `<span style="font-size:0.68rem;color:var(--neuro-teal,#00BFA5);">👁️ Read</span>` : '<span style="font-size:0.68rem;color:var(--text-muted);">No link</span>'}
      </div>` : ''}

      <!-- Caption Header -->
      <div style="padding:0.4rem 1rem 0;display:flex;align-items:center;gap:0.5rem;">
        <span style="font-size:0.72rem;font-weight:700;color:var(--neuro-teal,#00BFA5);">📝 Post Caption</span>
        <span style="font-size:0.68rem;color:var(--text-muted);">(FB + IG)</span>
      </div>

      <!-- Read-only Caption -->
      <div id="inline-post-content-${index}" style="padding:0.5rem 1rem 0.75rem;font-size:0.82rem;line-height:1.6;color:var(--text-primary);white-space:pre-wrap;max-height:300px;overflow-y:auto;">${escapeHtml(post.content || '')}</div>

      <!-- Edit Textarea (hidden until Edit clicked) -->
      <div id="inline-edit-area-${index}" style="display:none;padding:0.5rem 1rem;">
        <textarea id="inline-edit-caption-${index}" style="width:100%;min-height:140px;background:var(--bg);color:var(--text-primary);border:1px solid var(--border);border-radius:6px;padding:0.5rem;font-size:0.8rem;line-height:1.5;resize:vertical;font-family:var(--font);">${escapeHtml(post.content || '')}</textarea>
      </div>

      <!-- Action Bar -->
      <div id="inline-actions-${index}" style="padding:0.5rem 1rem;border-top:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;">
        <span style="font-size:0.7rem;color:var(--text-muted);">${wordCount} words</span>
        <div style="display:flex;gap:0.3rem;align-items:center;">
          <span id="inline-status-${index}" style="font-size:0.7rem;font-weight:600;margin-right:0.3rem;"></span>
          ${isConfirmed ? `<span style="font-size:0.7rem;color:var(--green,#2EA043);font-weight:600;">✅ Confirmed</span>` : `
          <button id="inline-edit-btn-${index}" class="post-action-btn" onclick="window.appActions.inlineEdit(${index})" style="font-size:0.72rem;color:var(--gold,#DAA520);">✏️ Edit</button>
          <button id="inline-confirm-btn-${index}" class="post-action-btn" onclick="window.appActions.inlineConfirm(${index})" style="font-size:0.72rem;color:#0A1628;background:var(--neuro-teal,#00BFA5);padding:0.3rem 0.7rem;border-radius:4px;font-weight:700;">✅ Confirm → Generate Scripts</button>
          `}
          <button class="post-action-btn" onclick="window.appActions.copyInlinePost(${index})" style="font-size:0.72rem;">📋 Copy</button>
        </div>
      </div>

      <!-- Generated Output Panels (shown after Confirm) -->
      <div id="inline-output-${index}" style="display:${isConfirmed ? 'block' : 'none'};">
        <!-- Email HTML -->
        <div style="border-top:1px solid var(--border);padding:0.75rem 1rem;">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:0.5rem;">
            <span style="font-size:0.78rem;font-weight:700;color:var(--neuro-teal,#00BFA5);">📧 Email HTML</span>
            <div style="display:flex;gap:0.3rem;">
              <button class="post-action-btn" onclick="window.appActions.copyInlineEmail(${index})" style="font-size:0.7rem;">📋 Copy HTML</button>
              <button class="post-action-btn" onclick="window.appActions.previewInlineEmail(${index})" style="font-size:0.7rem;">👁️ Preview</button>
            </div>
          </div>
          <pre id="inline-email-code-${index}" style="background:var(--bg);border:1px solid var(--border);border-radius:6px;padding:0.5rem;font-size:0.7rem;max-height:150px;overflow-y:auto;white-space:pre-wrap;color:var(--text-secondary);">${isConfirmed ? escapeHtml(state.doneData[index]?.emailHTML || 'Loading...') : 'Generating on confirm...'}</pre>
        </div>

        <!-- Video Script (45-60s) — Per Slide -->
        <div style="border-top:1px solid var(--border);padding:0.75rem 1rem;">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:0.5rem;">
            <span style="font-size:0.78rem;font-weight:700;color:var(--gold,#DAA520);">🎬 Video Script (45-60s) — Per Slide</span>
            <button class="post-action-btn" onclick="window.appActions.copyInlineVideo(${index})" style="font-size:0.7rem;">📋 Copy All</button>
          </div>
          <div style="font-size:0.58rem;color:var(--text-muted);margin-bottom:0.4rem;">6 slides · Copy each slide for HeyGen narration</div>
          <div id="inline-video-slides-${index}">${isConfirmed && state.doneData[index]?.videoSlides ? renderSlideBoxes(state.doneData[index].videoSlides, `ivs-${index}`, '#DAA520') : '<div style="color:var(--text-muted);font-size:0.75rem;padding:0.5rem;">Generating on confirm...</div>'}</div>
        </div>

        <!-- Shorts Script (30s Playbook) — Per Slide -->
        <div style="border-top:1px solid var(--border);padding:0.75rem 1rem;">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:0.5rem;">
            <span style="font-size:0.78rem;font-weight:700;color:#FF6B6B;">⚡ Shorts (30s Playbook) — Per Slide</span>
            <button class="post-action-btn" onclick="window.appActions.copyInlineShorts(${index})" style="font-size:0.7rem;">📋 Copy All</button>
          </div>
          <div style="font-size:0.58rem;color:var(--text-muted);margin-bottom:0.4rem;">4 slides · 75-85 words · Loop-engineered</div>
          <div id="inline-shorts-slides-${index}">${isConfirmed && state.doneData[index]?.shortsSlides ? renderSlideBoxes(state.doneData[index].shortsSlides, `iss-${index}`, '#FF6B6B') : '<div style="color:var(--text-muted);font-size:0.75rem;padding:0.5rem;">Generating on confirm...</div>'}</div>
        </div>

        <!-- Quick Launch Links -->
        <div style="border-top:1px solid var(--border);padding:0.6rem 1rem;">
          <div style="display:flex;gap:0.4rem;flex-wrap:wrap;align-items:center;">
            <span style="font-size:0.68rem;font-weight:700;color:var(--text-muted);margin-right:0.2rem;">🚀 LAUNCH:</span>
            <a href="https://manus.im/app/project/5ndQv7naHNFmzkfVtH4dfq" target="_blank" rel="noopener" style="font-size:0.68rem;padding:0.2rem 0.5rem;background:rgba(0,191,165,0.1);color:var(--neuro-teal,#00BFA5);border:1px solid rgba(0,191,165,0.25);border-radius:4px;text-decoration:none;font-weight:600;">🎨 Manus</a>
            <a href="https://app.heygen.com/avatar/ppt-to-video" target="_blank" rel="noopener" style="font-size:0.68rem;padding:0.2rem 0.5rem;background:rgba(218,165,32,0.1);color:var(--gold,#DAA520);border:1px solid rgba(218,165,32,0.25);border-radius:4px;text-decoration:none;font-weight:600;">🎬 HeyGen</a>
            <a href="https://app.gohighlevel.com" target="_blank" rel="noopener" style="font-size:0.68rem;padding:0.2rem 0.5rem;background:rgba(46,160,67,0.1);color:var(--green,#2EA043);border:1px solid rgba(46,160,67,0.25);border-radius:4px;text-decoration:none;font-weight:600;">📱 GHL Planner</a>
          </div>
        </div>

        <!-- Source URL for Manus -->
        ${articleLink ? `
        <div style="border-top:1px solid var(--border);padding:0.5rem 1rem;display:flex;align-items:center;gap:0.5rem;">
          <span style="font-size:0.68rem;color:var(--neuro-teal,#00BFA5);font-weight:600;">🔗 Source for Manus:</span>
          <span style="font-size:0.68rem;color:var(--text-secondary);flex:1;word-break:break-all;">${escapeHtml(articleLink)}</span>
          <button class="post-action-btn" onclick="navigator.clipboard.writeText('${escapeHtml(articleLink)}');window.showToast('Source URL copied!','success')" style="font-size:0.66rem;">📋</button>
        </div>` : ''}

        <!-- Auto Video Pipeline (populated after Confirm if keys exist) -->
        <div id="inline-pipeline-${index}" style="display:none;"></div>
      </div>
    `;

    card.after(div);
  },

  toggleInlinePost(index) {
    const existing = document.getElementById(`inline-post-${index}`);
    if (existing) { existing.remove(); return; }
    const card = document.querySelector(`.story-card[data-index="${index}"]`);
    if (card) this.renderInlinePost(index, card);
  },

  copyInlinePost(index) {
    const post = state.posts[index];
    if (post) { copyToClipboard(post.content); showToast('Post copied!', 'success'); }
  },

  inlineEdit(index) {
    const readOnly = document.getElementById(`inline-post-content-${index}`);
    const editArea = document.getElementById(`inline-edit-area-${index}`);
    const editBtn = document.getElementById(`inline-edit-btn-${index}`);
    const confirmBtn = document.getElementById(`inline-confirm-btn-${index}`);
    const status = document.getElementById(`inline-status-${index}`);

    if (readOnly) readOnly.style.display = 'none';
    if (editArea) editArea.style.display = 'block';
    if (editBtn) editBtn.style.display = 'none';
    if (confirmBtn) confirmBtn.style.display = 'inline-flex';
    if (status) { status.textContent = '✏️ Editing'; status.style.color = 'var(--gold,#DAA520)'; }

    showToast('Edit the caption, then click ✅ Confirm', 'info');
  },

  // Confirm: save edits → generate Email + Video Script + Shorts Script
  async inlineConfirm(index) {
    const editCaption = document.getElementById(`inline-edit-caption-${index}`);
    const readOnly = document.getElementById(`inline-post-content-${index}`);
    const editArea = document.getElementById(`inline-edit-area-${index}`);
    const editBtn = document.getElementById(`inline-edit-btn-${index}`);
    const confirmBtn = document.getElementById(`inline-confirm-btn-${index}`);
    const status = document.getElementById(`inline-status-${index}`);
    const outputPanel = document.getElementById(`inline-output-${index}`);
    const inlineDiv = document.getElementById(`inline-post-${index}`);

    // Save the edited content
    const captionText = editCaption?.value || state.posts[index]?.content || '';
    state.posts[index].content = captionText;

    // Update read-only view
    if (readOnly) { readOnly.textContent = captionText; readOnly.style.display = 'block'; }

    // Hide edit, show generating state
    if (editArea) editArea.style.display = 'none';
    if (editBtn) editBtn.style.display = 'none';
    if (confirmBtn) confirmBtn.style.display = 'none';
    if (status) { status.textContent = '⏳ Generating...'; status.style.color = 'var(--neuro-teal,#00BFA5)'; }
    if (outputPanel) outputPanel.style.display = 'block';
    if (inlineDiv) inlineDiv.style.borderLeft = '3px solid var(--neuro-teal,#00BFA5)';

    saveSession();

    // Generate Email + Video + Shorts in parallel
    const post = state.posts[index];
    const settings = loadSettings();
    if (!settings.claudeApiKey) { showToast('Claude API key needed.', 'error'); return; }

    const chemData = CHEM_DATA[post.pillar?.id] || { id: 'dopamine', icon: '🧪', name: 'Dopamine' };
    const story = state.stories[index] || state.topics[index] || {};
    const topicData = post.topic || state.topics[index] || {};

    setStatus(`⏳ Generating email + video + shorts for story ${index + 1}...`, true);

    const [emailResult, videoResult, shortsResult] = await Promise.allSettled([
      // Email HTML
      (async () => {
        const emailData = await generateEmail({
          postContent: captionText,
          topic: topicData,
          pillar: post.pillar,
          cta: post.cta,
          apiKey: settings.claudeApiKey
        });
        return { emailData, emailHTML: renderEmailHTML(emailData, post.pillar) };
      })(),
      // Main video script (45-60s)
      (async () => {
        return await generateVideoScript({
          topic: topicData,
          postContent: captionText,
          pillar: post.pillar,
          chemicalId: chemData.id,
          videoLength: '45-60s',
          platform: 'FB Reel + IG Reel',
          outputFormat: '9:16',
          apiKey: settings.claudeApiKey
        });
      })(),
      // Shorts script (30s — Playbook-compliant)
      (async () => {
        return await generateShortsScript({
          topic: topicData,
          postContent: captionText,
          pillar: post.pillar,
          chemicalId: chemData.id,
          apiKey: settings.claudeApiKey
        });
      })()
    ]);

    // Handle results
    if (!state.doneData) state.doneData = {};
    if (!state.doneData[index]) state.doneData[index] = {};
    state.doneData[index].confirmed = true;

    // Email
    const emailCodeEl = document.getElementById(`inline-email-code-${index}`);
    if (emailResult.status === 'fulfilled') {
      const { emailData, emailHTML } = emailResult.value;
      state.doneData[index].emailHTML = emailHTML;
      state.doneData[index].emailData = emailData;
      if (emailCodeEl) emailCodeEl.textContent = emailHTML;
    } else {
      if (emailCodeEl) emailCodeEl.textContent = `Error: ${emailResult.reason?.message || 'Failed'}`;
    }

    // Video (45-60s) — parse into slides
    const videoSlidesEl = document.getElementById(`inline-video-slides-${index}`);
    if (videoResult.status === 'fulfilled') {
      const fullScript = videoResult.value;
      const scriptMatch = fullScript.match(/=== VIDEO SCRIPT ===\s*([\s\S]*?)(?:=== SLIDE DECK|$)/i);
      const rawNarration = (scriptMatch?.[1] || fullScript).trim();
      const cleanTXT = rawNarration
        .replace(/^(?:HOOK|SCENARIO|THE SCIENCE|THE COST|THE BRIDGE|CTA)\s*(?:\([^)]*\))?\s*:\s*/gim, '')
        .replace(/\n{3,}/g, '\n\n')
        .trim();

      state.doneData[index].videoScript = fullScript;
      state.doneData[index].cleanVideoTXT = cleanTXT;

      const videoSlides = parseVideoSlides(fullScript);
      state.doneData[index].videoSlides = videoSlides;
      if (videoSlidesEl) videoSlidesEl.innerHTML = renderSlideBoxes(videoSlides, `ivs-${index}`, '#DAA520');
    } else {
      if (videoSlidesEl) videoSlidesEl.innerHTML = `<div style="color:#FF6B6B;font-size:0.75rem;">Error: ${videoResult.reason?.message || 'Failed'}</div>`;
    }

    // Shorts (30s) — parse into slides
    const shortsSlidesEl = document.getElementById(`inline-shorts-slides-${index}`);
    if (shortsResult.status === 'fulfilled') {
      const fullShorts = shortsResult.value;
      const shortsScriptMatch = fullShorts.match(/=== SHORTS SCRIPT[^=]*===\s*([\s\S]*?)(?:=== SHORTS SLIDE|$)/i);
      const rawShorts = (shortsScriptMatch?.[1] || fullShorts).trim();
      const cleanShorts = rawShorts
        .replace(/^(?:HOOK|THE INSIGHT|THE PROOF|CTA)\s*(?:\([^)]*\))?\s*(?:\|\s*Slide\s*\d+\s*)?\s*:\s*/gim, '')
        .replace(/\n{3,}/g, '\n\n')
        .trim();

      state.doneData[index].shortsScript = fullShorts;
      state.doneData[index].shortsTXT = cleanShorts;

      const shortsSlides = parseShortsSlides(fullShorts);
      state.doneData[index].shortsSlides = shortsSlides;
      if (shortsSlidesEl) shortsSlidesEl.innerHTML = renderSlideBoxes(shortsSlides, `iss-${index}`, '#FF6B6B');
    } else {
      if (shortsSlidesEl) shortsSlidesEl.innerHTML = `<div style="color:#FF6B6B;font-size:0.75rem;">Error: ${shortsResult.reason?.message || 'Failed'}</div>`;
    }

    saveSession();
    if (status) { status.textContent = '✅ Confirmed'; status.style.color = 'var(--green,#2EA043)'; }
    setStatus('Ready');
    showToast(`✅ Story ${index + 1} confirmed — email + video + shorts ready!`, 'success');

    // Show the auto-pipeline button if Manus or HeyGen keys are configured
    const pipelineEl = document.getElementById(`inline-pipeline-${index}`);
    if (pipelineEl) {
      const hasManusKey = !!settings.manusApiKey;
      const hasHeyGenKey = !!settings.heygenApiKey;

      if (hasManusKey || hasHeyGenKey) {
        pipelineEl.style.display = 'block';
        pipelineEl.innerHTML = `
          <div style="border-top:1px solid var(--border);padding:0.75rem 1rem;">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:0.5rem;">
              <span style="font-size:0.78rem;font-weight:700;color:#9B59B6;">🎬 Auto Video Pipeline</span>
              <button class="post-action-btn" onclick="window.appActions.autoPipeline(${index})" style="font-size:0.72rem;color:#0A1628;background:#9B59B6;padding:0.3rem 0.7rem;border-radius:4px;font-weight:700;">▶️ Run Pipeline</button>
            </div>
            <div style="font-size:0.62rem;color:var(--text-muted);">
              ${hasManusKey ? '✅ Manus' : '❌ Manus (no key)'} · ${hasHeyGenKey ? '✅ HeyGen' : '❌ HeyGen (no key)'}
              <br>Sends slide prompt to Manus → builds deck → sends to HeyGen → renders AI avatar video
            </div>
            <div id="pipeline-progress-${index}" style="margin-top:0.5rem;"></div>
          </div>
        `;
      }
    }
  },

  // ─── AUTO PIPELINE: Manus → HeyGen in one click ─────────────
  async autoPipeline(index) {
    const settings = loadSettings();
    const doneData = state.doneData?.[index];
    if (!doneData) { showToast('Confirm the post first.', 'error'); return; }

    const progressEl = document.getElementById(`pipeline-progress-${index}`);
    const updateProgress = (step, total, msg, status = 'working') => {
      const icons = { working: '🔄', done: '✅', error: '❌', skip: '⏭️' };
      if (progressEl) {
        const existing = progressEl.querySelectorAll('.pipeline-step');
        // Don't replace, append
        const stepEl = document.createElement('div');
        stepEl.className = 'pipeline-step';
        stepEl.style.cssText = 'font-size:0.72rem;padding:0.3rem 0;color:var(--text-secondary);display:flex;align-items:center;gap:0.4rem;';
        stepEl.innerHTML = `<span>${icons[status]}</span> <span style="font-weight:600;">Step ${step}/${total}:</span> ${msg}`;
        progressEl.appendChild(stepEl);
        stepEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
      setStatus(`🎬 Pipeline ${step}/${total}: ${msg}`, true);
    };

    // Disable the Run Pipeline button
    const pipelineContainer = document.getElementById(`inline-pipeline-${index}`);
    const runBtn = pipelineContainer?.querySelector('button');
    if (runBtn) { runBtn.disabled = true; runBtn.textContent = '⏳ Running...'; runBtn.style.opacity = '0.6'; }

    // Clear previous progress
    if (progressEl) progressEl.innerHTML = '';

    const post = state.posts[index];
    const story = state.stories[index] || {};
    const chemData = CHEM_DATA[post?.pillar?.id] || { id: 'dopamine', icon: '🧪', name: 'Dopamine' };
    const topic = story.headline || story.topic || 'Racing mental performance';
    const articleTitle = story.sourceArticle || story.source || '';
    const articleLink = story.articleUrl || story.sourceUrl || '';

    // ─── STEP 1: Build the Manus slide prompt ────────────────
    let manusTaskId = null;
    let slideFiles = [];
    let slideDeckUrl = null;

    if (settings.manusApiKey) {
      updateProgress(1, 3, 'Sending slide deck brief to Manus...', 'working');

      // Build the full Manus prompt (same as the existing buildManusPrompt)
      const videoSlides = doneData.videoSlides || [];
      const slideContent = videoSlides.length > 0
        ? videoSlides.map(s => `Slide ${s.slide} (${s.label}): ${s.content}`).join('\n')
        : doneData.cleanVideoTXT || 'No slide content available';

      const manusPrompt = `CREATE A SLIDE DECK FOR A 45-60 SECOND VIDEO

BRAND: Camino Coaching — Racing Driver Mental Performance
PRESENTER: Craig Muirhead (AI avatar will narrate over these slides)
STYLE: Dark background (#0A1628), teal accents (#00BFA5), bold sans-serif headings, clean and minimal
FORMAT: 9:16 vertical (1080x1920), 7-8 slides
FONT: Inter or similar modern sans-serif
EXPORT: PowerPoint (.pptx)

${articleTitle ? `SOURCE ARTICLE: ${articleTitle}` : ''}
${articleLink ? `ARTICLE URL: ${articleLink}` : ''}
${articleTitle ? `\nIMPORTANT: The video is based on this article. Slide 1 (Hook) should reference the article's subject or finding. Include the source name on Slide 2 or as a subtitle on Slide 1 for third-party authority.\n` : ''}
NEUROCHEMISTRY FOCUS: ${chemData.icon} ${chemData.name}

SLIDE CONTENT:
${slideContent}

DESIGN NOTES:
- Slide 1 (Hook): Large bold text, dark background, teal accent. This is the scroll-stopper.${articleTitle ? ' Reference the source article.' : ''}
- Slide 3 (The Science): Show the chemical name in teal (#00BFA5) with a simple icon or molecule graphic.
- Slide 5 (The Data): One BIG number centred, with a short label below.
- Slide 7 (CTA): Include "Comment BLUEPRINT" or "Free Driver Mindset Quiz" with the Camino Coaching logo.
- Slide 8 (End Card): Camino Coaching logo, "4.9/5 Trustpilot · 85 five-star reviews", website URL.
- Keep text minimal on each slide — the avatar narrates the detail.
- No stock photos of cars or generic business imagery. Motorsport imagery only if needed.`;

      try {
        const result = await createManusSlideTask(manusPrompt, topic);
        manusTaskId = result.taskId;
        updateProgress(1, 3, `Manus task created (ID: ${manusTaskId}). Building slides...`, 'done');
      } catch (err) {
        updateProgress(1, 3, `Manus error: ${err.message}`, 'error');
      }
    } else {
      updateProgress(1, 3, 'Manus skipped — no API key. Build slides manually.', 'skip');
    }

    // ─── STEP 2: Poll Manus for completion ───────────────────
    if (manusTaskId) {
      updateProgress(2, 3, 'Waiting for Manus to finish slide deck...', 'working');

      const maxAttempts = 30; // 30 × 10s = 5 minutes
      let completed = false;
      for (let attempt = 0; attempt < maxAttempts; attempt++) {
        await new Promise(resolve => setTimeout(resolve, 10000)); // Wait 10s

        try {
          const statusResult = await checkManusTaskStatus(manusTaskId);
          if (statusResult.status === 'completed' || statusResult.status === 'done') {
            slideFiles = statusResult.files || [];
            // Find the PPTX or PDF file
            slideDeckUrl = slideFiles.find(f => f.url && (f.name?.match(/\.(pptx?|pdf)$/i)))?.url || slideFiles[0]?.url;
            updateProgress(2, 3, `Slides ready! ${slideFiles.length} files generated.`, 'done');
            completed = true;

            // Store in doneData
            state.doneData[index].manusTaskId = manusTaskId;
            state.doneData[index].slideFiles = slideFiles;
            state.doneData[index].slideDeckUrl = slideDeckUrl;
            saveSession();
            break;
          } else if (statusResult.status === 'failed' || statusResult.status === 'error') {
            updateProgress(2, 3, 'Manus task failed — try manual workflow.', 'error');
            break;
          }
          // Still running — update the last progress message
          const lastStep = progressEl?.querySelector('.pipeline-step:last-child');
          if (lastStep) lastStep.querySelector('span:last-child').textContent = `Manus building... (${attempt + 1}/${maxAttempts})`;
        } catch (err) {
          console.warn('Manus poll error:', err.message);
        }
      }

      if (!completed) {
        updateProgress(2, 3, 'Manus timed out (5 min). Check manus.im for result.', 'error');
      }
    } else if (!settings.manusApiKey) {
      updateProgress(2, 3, 'Skipped — upload slides to HeyGen manually.', 'skip');
    }

    // ─── STEP 3: Send to HeyGen for video rendering ─────────
    if (settings.heygenApiKey) {
      updateProgress(3, 3, 'Sending to HeyGen for video generation...', 'working');

      try {
        const narrationScript = doneData.videoScript || doneData.cleanVideoTXT || '';

        // Extract slide image URLs from Manus output (if available)
        const slideImageUrls = slideFiles
          .filter(f => f.url && (f.name?.match(/\.(png|jpg|jpeg|webp)$/i)))
          .map(f => f.url);

        const heygenResult = await createHeyGenVideo({
          script: narrationScript,
          avatarId: settings.heygenAvatarId || 'default',
          voiceId: settings.heygenVoiceId || '',
          slideImageUrls
        });

        state.doneData[index].heygenVideoId = heygenResult.videoId;
        saveSession();

        updateProgress(3, 3, `HeyGen video queued (ID: ${heygenResult.videoId}). Rendering...`, 'working');

        // Poll HeyGen for completion (max 10 minutes for video)
        const maxVideoAttempts = 60; // 60 × 10s = 10 minutes
        for (let attempt = 0; attempt < maxVideoAttempts; attempt++) {
          await new Promise(resolve => setTimeout(resolve, 10000)); // Wait 10s

          try {
            const videoStatus = await checkHeyGenStatus(heygenResult.videoId);
            if (videoStatus.status === 'completed') {
              state.doneData[index].videoUrl = videoStatus.videoUrl;
              state.doneData[index].thumbnailUrl = videoStatus.thumbnailUrl;
              state.doneData[index].videoDuration = videoStatus.duration;
              saveSession();
              updateProgress(3, 3, `Video rendered! ${videoStatus.duration ? videoStatus.duration + 's' : 'Ready'} ✨`, 'done');

              // Show download links
              if (progressEl) {
                const linksEl = document.createElement('div');
                linksEl.style.cssText = 'margin-top:0.5rem;display:flex;gap:0.4rem;flex-wrap:wrap;';
                linksEl.innerHTML = `
                  ${videoStatus.videoUrl ? `<a href="${videoStatus.videoUrl}" target="_blank" rel="noopener" style="font-size:0.72rem;padding:0.3rem 0.7rem;background:rgba(155,89,182,0.15);color:#9B59B6;border:1px solid rgba(155,89,182,0.3);border-radius:4px;text-decoration:none;font-weight:600;">📥 Download Video</a>` : ''}
                  ${slideDeckUrl ? `<a href="${slideDeckUrl}" target="_blank" rel="noopener" style="font-size:0.72rem;padding:0.3rem 0.7rem;background:rgba(0,191,165,0.15);color:var(--neuro-teal,#00BFA5);border:1px solid rgba(0,191,165,0.3);border-radius:4px;text-decoration:none;font-weight:600;">📥 Download Slides</a>` : ''}
                  ${videoStatus.videoUrl ? `<button class="post-action-btn" onclick="navigator.clipboard.writeText('${videoStatus.videoUrl}');window.showToast('Video URL copied!','success')" style="font-size:0.68rem;">📋 Copy URL</button>` : ''}
                `;
                progressEl.appendChild(linksEl);
              }
              break;
            } else if (videoStatus.status === 'failed' || videoStatus.status === 'error') {
              updateProgress(3, 3, 'HeyGen rendering failed. Try again later.', 'error');
              break;
            }
            // Still rendering
            const lastStep = progressEl?.querySelector('.pipeline-step:last-child');
            if (lastStep) lastStep.querySelector('span:last-child').textContent = `HeyGen rendering... (${attempt + 1}/${maxVideoAttempts})`;
          } catch (err) {
            console.warn('HeyGen poll error:', err.message);
          }
        }
      } catch (err) {
        updateProgress(3, 3, `HeyGen error: ${err.message}`, 'error');
      }
    } else {
      updateProgress(3, 3, 'HeyGen skipped — no API key. Send narration manually.', 'skip');
    }

    // Re-enable button
    if (runBtn) { runBtn.disabled = false; runBtn.textContent = '🔄 Re-run Pipeline'; runBtn.style.opacity = '1'; }
    setStatus('Ready');
  },

  // Copy handlers for inline panels
  copyInlineEmail(index) {
    const html = state.doneData?.[index]?.emailHTML;
    if (html) { copyToClipboard(html); showToast('Email HTML copied — paste into GHL!', 'success'); }
    else { showToast('Confirm the post first.', 'info'); }
  },

  previewInlineEmail(index) {
    const html = state.doneData?.[index]?.emailHTML;
    if (html) { const w = window.open('', '_blank', 'width=640,height=800'); w.document.write(html); w.document.close(); }
    else { showToast('Confirm the post first.', 'info'); }
  },

  copyInlineVideo(index) {
    const txt = state.doneData?.[index]?.cleanVideoTXT;
    if (txt) { copyToClipboard(txt); showToast('Video script copied — send to HeyGen!', 'success'); }
    else { showToast('Confirm the post first.', 'info'); }
  },

  copyInlineShorts(index) {
    const txt = state.doneData?.[index]?.shortsTXT;
    if (txt) { copyToClipboard(txt); showToast('Shorts script copied — send to HeyGen!', 'success'); }
    else { showToast('Confirm the post first.', 'info'); }
  },

  async generateVideoForPost(index) {
    const post = state.posts[index];
    if (!post) { showToast('Generate the post first.', 'error'); return; }
    const settings = loadSettings();
    if (!settings.claudeApiKey) { showToast('Claude API key needed.', 'error'); return; }

    setStatus('🎬 Generating video script...', true);
    showToast('Creating video script...', 'info');

    try {
      // Get chemicalId from the post's pillar
      const chemData = CHEM_DATA[post.pillar?.id] || { id: 'dopamine' };

      // Pass the FULL topic object so the video script uses the same source article
      const topicData = post.topic || state.topics[index] || {};

      const script = await generateVideoScript({
        topic: topicData,
        postContent: post.content,
        pillar: post.pillar,
        chemicalId: chemData.id,
        videoLength: '45-60s',
        platform: 'FB Reel + IG Reel',
        outputFormat: '9:16',
        apiKey: settings.claudeApiKey
      });

      showVideoModal(script, index, chemData, settings);
      showToast(`Video script generated for post ${index + 1}!`, 'success');
    } catch (err) {
      showToast(`Video error: ${err.message}`, 'error');
      console.error(err);
    } finally { setStatus('Ready'); }
  },

  openGHLMedia() {
    window.open('https://app.gohighlevel.com/v2/location/EwAyQ03cV2yxVYaxnY5S/media-storage', '_blank');
  },

  copyShortsSlideText(postIndex, slideIndex) {
    const post = state.posts[postIndex];
    const sec = post?._shortsSections?.[slideIndex];
    if (sec) {
      const text = sec.voice || sec.text;
      copyToClipboard(text);
      showToast(`Short slide ${sec.slide} (${sec.label}) copied!`, 'success');
    }
  },

  copyShortsScript(index) {
    const post = state.posts[index];
    if (post?._shortsNarration) { copyToClipboard(post._shortsNarration); showToast('30-second Short script copied!', 'success'); }
  },

  openShortsManusPrompt(index) {
    const post = state.posts[index];
    if (!post?._shortsManusPrompt) { showToast('No Shorts Manus prompt available.', 'error'); return; }
    // Copy the Shorts Manus prompt to clipboard and show toast
    copyToClipboard(post._shortsManusPrompt);
    showToast('Shorts Manus prompt copied! Paste into Manus for 4-slide deck.', 'success');
  },

  // ─── CLEAR SESSION ──────────────────────────────────────────
  clearSession() {
    if (!confirm('Clear all stories, posts, and generated content?\n\nYour API keys and settings will be kept.')) return;
    clearSession();
    location.reload();
  },

  // ─── RESEARCH MODE: Copy single card ────────────────────────
  copyResearchCard(index) {
    const r = state.researchResults[index];
    if (!r) return;
    const text = `---\nSEARCH ${r.searchNumber}: ${r.searchArea}\n\nARTICLE: ${r.article || 'No article found'}\nURL: ${r.url || 'No URL available'}\nSOURCE: ${r.source || 'Unknown'}\nSUMMARY: ${r.summary || 'N/A'}\nKILLER DATA POINT: ${r.killerDataPoint || 'None found'}\nRACING RELEVANCE: ${r.racingRelevance || 'N/A'}\n---`;
    copyToClipboard(text);
    showToast(`Search ${r.searchNumber} copied!`, 'success');
  }
};


// ─── Parse Script into Sections ──────────────────────────────────
function parseVideoScript(script) {
  // Extract the slide deck brief for Manus
  const slideBriefMatch = script.match(/=== SLIDE DECK BRIEF[^=]*===([\s\S]*?)(?:===|$)/i);
  const slideBrief = (slideBriefMatch?.[1] || '').trim();

  // Extract the video script section
  const videoScriptMatch = script.match(/=== VIDEO SCRIPT ===([\s\S]*?)(?:=== SLIDE|$)/i);
  const rawVideoScript = (videoScriptMatch?.[1] || script).trim();

  // Strip section headers and timestamps to get pure narration text
  const pureNarration = rawVideoScript
    .replace(/^(HOOK|SCENARIO|THE SCIENCE|THE COST|THE BRIDGE|CTA)\s*(\([^)]*\))?\s*:?\s*$/gim, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();

  // Extract individual slide sections for per-slide copy
  const sectionDefs = [
    { key: 'hook', label: 'HOOK', icon: '🎣', color: '#ef4444', slide: 1, time: '0-5s' },
    { key: 'scenario', label: 'SCENARIO', icon: '🏎️', color: '#f59e0b', slide: 2, time: '5-15s' },
    { key: 'science', label: 'THE SCIENCE', icon: '🧬', color: '#00BFA5', slide: 3, time: '15-35s' },
    { key: 'cost', label: 'THE COST', icon: '⏱️', color: '#8b5cf6', slide: 4, time: '35-45s' },
    { key: 'bridge', label: 'THE BRIDGE', icon: '🌉', color: '#3b82f6', slide: 5, time: '45-55s' },
    { key: 'cta', label: 'CTA', icon: '📣', color: '#DAA520', slide: 6, time: '55-60s' }
  ];

  const sections = [];
  for (let si = 0; si < sectionDefs.length; si++) {
    const def = sectionDefs[si];
    const nextLabel = sectionDefs[si + 1]?.label;
    let pattern;
    if (nextLabel) {
      pattern = new RegExp(def.label + '\\s*(?:\\([^)]*\\))?\\s*:([\\s\\S]*?)(?=' + nextLabel + '\\s*(?:\\([^)]*\\))?\\s*:)', 'i');
    } else {
      pattern = new RegExp(def.label + '\\s*(?:\\([^)]*\\))?\\s*:([\\s\\S]*)$', 'i');
    }
    const match = rawVideoScript.match(pattern);
    sections.push({
      ...def,
      text: (match?.[1] || '').trim()
    });
  }

  // Extract social caption
  const captionMatch = script.match(/=== SOCIAL CAPTION ===([\s\S]*?)(?:===|$)/i);
  const socialCaption = (captionMatch?.[1] || '').trim();

  // Extract HeyGen notes
  const heygenMatch = script.match(/=== HEYGEN NOTES ===([\s\S]*?)(?:===|$)/i);
  const heygenNotes = (heygenMatch?.[1] || '').trim();

  return { slideBrief, pureNarration, socialCaption, heygenNotes, rawVideoScript, sections };
}

// ─── Build Manus Slide Deck Prompt ───────────────────────────────
function buildManusPrompt(slideBrief, chemData, postIndex, topicData = {}) {
  // Build source article context for Manus
  const articleSection = topicData.articleUrl ? `
SOURCE ARTICLE (reference this in the slides):
- Headline: ${topicData.sourceArticle || topicData.headline || 'Unknown'}
- URL: ${topicData.articleUrl}
${topicData.talkingPoints?.length ? `- Key Points: ${topicData.talkingPoints.join(' | ')}` : ''}
${topicData.racingRelevance ? `- Racing Relevance: ${topicData.racingRelevance}` : ''}
${topicData.mechanism ? `- Neuroscience Mechanism: ${topicData.mechanism}` : ''}
Slide 1 (Hook) should reference this article directly. Name the person, study, or discovery.
Slide 2 (The Story) should expand on the article's fascinating detail.
` : '';

  return `Create a professional slide deck for a 45-60 second vertical video (9:16 format) about neurochemistry in car racing.

BRAND: Camino Coaching by Craig Muirhead
TOPIC: Post ${postIndex + 1} — ${chemData.icon} ${chemData.name}
STYLE: Dark premium theme. Background #0A1628 (deep navy). Accent colour ${chemData.color || '#00BFA5'} (teal/chemical colour). Clean modern typography (Inter or similar sans-serif). Minimal, high-contrast, motorsport-inspired.
${articleSection}
DESIGN RULES:
- 9:16 vertical format (1080×1920px) — this is for mobile Reels
- Dark background throughout (#0A1628 or similar deep navy)
- Accent colour for highlights, numbers, and chemical names: ${chemData.color || '#00BFA5'}
- White text for body copy, accent for emphasis
- Large bold numbers/stats when showing data points
- Camino Coaching logo on final slide
- Clean, minimal — no clipart, no stock photos, no busy backgrounds
- Each slide should have ONE clear message (not paragraphs of text)
- Use bold/large type for the hook and key stats

SLIDES:
${slideBrief}

IMPORTANT:
- Export as PowerPoint (.pptx) format
- This will be uploaded to HeyGen PPT-to-Video, so slides should be visually clean with space for an avatar overlay
- Keep text away from the bottom 20% of each slide (avatar space)
- Total: 7-8 slides maximum`;
}

// ─── Parse 30-Second Shorts Script ──────────────────────────────────
function parseShortsScript(script) {
  // Extract the 4-slide brief for Manus
  const slideBriefMatch = script.match(/=== SHORTS SLIDE BRIEF[^=]*===([\s\S]*?)(?:===|$)/i);
  const slideBrief = (slideBriefMatch?.[1] || '').trim();

  // Extract the Short script section
  const shortsMatch = script.match(/=== 30-SECOND SHORT SCRIPT ===([\s\S]*?)(?:=== SHORTS SLIDE|$)/i);
  const rawScript = (shortsMatch?.[1] || script).trim();

  // Strip section headers to get pure narration
  const voiceLines = rawScript.match(/Voice:\s*(.+)/gi) || [];
  const pureNarration = voiceLines.length > 0
    ? voiceLines.map(line => line.replace(/^Voice:\s*/i, '').trim()).join('\n\n')
    : rawScript
      .replace(/^(HOOK|THE INSIGHT|THE PROOF|CTA)\s*(\([^)]*\))?\s*\|?\s*(Slide \d+)?\s*:?\s*$/gim, '')
      .replace(/^On screen:\s*.+$/gim, '')
      .replace(/^Voice:\s*/gim, '')
      .replace(/^Total word count:\s*.+$/gim, '')
      .replace(/\n{3,}/g, '\n\n')
      .trim();

  // Extract individual 4-slide sections for per-slide copy
  const shortsSectionDefs = [
    { key: 'hook', label: 'HOOK', icon: '🎣', color: '#ef4444', slide: 1, time: '0-5s' },
    { key: 'insight', label: 'THE INSIGHT', icon: '🧬', color: '#00BFA5', slide: 2, time: '5-18s' },
    { key: 'proof', label: 'THE PROOF', icon: '📊', color: '#3b82f6', slide: 3, time: '18-25s' },
    { key: 'cta', label: 'CTA', icon: '📣', color: '#DAA520', slide: 4, time: '25-30s' }
  ];

  const shortsSections = [];
  for (let si = 0; si < shortsSectionDefs.length; si++) {
    const def = shortsSectionDefs[si];
    const nextLabel = shortsSectionDefs[si + 1]?.label;
    let pattern;
    if (nextLabel) {
      pattern = new RegExp(def.label + '\\s*(?:\\([^)]*\\))?\\s*(?:\\|[^:]*)?\\s*:([\\s\\S]*?)(?=' + nextLabel + '\\s*(?:\\([^)]*\\))?\\s*(?:\\|[^:]*)?\\s*:)', 'i');
    } else {
      pattern = new RegExp(def.label + '\\s*(?:\\([^)]*\\))?\\s*(?:\\|[^:]*)?\\s*:([\\s\\S]*?)(?=Total word count|$)', 'i');
    }
    const match = rawScript.match(pattern);
    const sectionText = (match?.[1] || '').trim();
    // Extract voice and on-screen text separately
    const voiceMatch = sectionText.match(/Voice:\s*(.+)/i);
    const onScreenMatch = sectionText.match(/On screen:\s*(.+)/i);
    shortsSections.push({
      ...def,
      text: sectionText,
      voice: (voiceMatch?.[1] || '').trim(),
      onScreen: (onScreenMatch?.[1] || '').trim()
    });
  }

  // Extract loop note
  const loopMatch = script.match(/=== LOOP NOTE ===([\s\S]*?)(?:===|$)/i);
  const loopNote = (loopMatch?.[1] || '').trim();

  // Extract HeyGen notes
  const heygenMatch = script.match(/=== HEYGEN NOTES ===([\s\S]*?)(?:===|$)/i);
  const heygenNotes = (heygenMatch?.[1] || '').trim();

  return { slideBrief, pureNarration, loopNote, heygenNotes, rawScript, shortsSections };
}

// ─── Build Manus Prompt for 30-Second Shorts (4 slides only) ────
function buildShortsManusPrompt(slideBrief, chemData, postIndex, topicData = {}) {
  const articleSection = topicData.articleUrl ? `
SOURCE ARTICLE:
- Headline: ${topicData.sourceArticle || topicData.headline || 'Unknown'}
- URL: ${topicData.articleUrl}
Slide 1 (Hook) must reference this article. Name the person, study, or discovery.
` : '';

  return `Create a 4-SLIDE presentation deck for a 30-SECOND vertical Short (9:16 format) about neurochemistry in car racing.

CRITICAL: This is a 30-second Short, NOT a full video. Only 4 slides. Each slide on screen for 5-8 seconds.

BRAND: Camino Coaching by Craig Muirhead
TOPIC: Post ${postIndex + 1} — ${chemData.icon} ${chemData.name}
STYLE: Dark premium theme. Background #0A1628 (deep navy). Accent colour ${chemData.color || '#00BFA5'}. Clean modern typography. Minimal, high-contrast.
${articleSection}
DESIGN RULES:
- 9:16 vertical format (1080×1920px) for mobile Shorts/Reels
- Dark background throughout (#0A1628)
- Maximum 5-7 words per slide (must be readable in under 1 second)
- Accent colour for highlights and chemical names: ${chemData.color || '#00BFA5'}
- Red (#ef4444) for cortisol/threat references
- Large bold text. One clear message per slide.
- Keep text away from bottom 20% (avatar space)
- Slide 1 text must be ALREADY visible when video starts (no fade-in animation)
- Slide 4 (CTA) must have minimal visual weight — dark background, small text — so the eye naturally loops back to Slide 1

SLIDES (4 ONLY):
${slideBrief}

IMPORTANT:
- Export as PowerPoint (.pptx) format
- ONLY 4 SLIDES. No bridge slide. No mechanism slide. No end card.
- This will be uploaded to HeyGen PPT-to-Video
- The transition from Slide 4 back to Slide 1 must feel visually smooth for loop replay`;
}

// ─── Video Script Modal (3-Step Workflow) ─────────────────────────
function showVideoModal(script, postIndex, chemData, settings) {
  const existing = document.getElementById('video-modal');
  if (existing) existing.remove();

  const parsed = parseVideoScript(script);
  const topicData = state.posts?.[postIndex]?.topic || state.topics?.[postIndex] || {};
  const manusPrompt = buildManusPrompt(parsed.slideBrief, chemData, postIndex, topicData);

  const modal = document.createElement('div');
  modal.id = 'video-modal';
  modal.className = 'modal-overlay';
  modal.innerHTML = `
      <div class="modal-content" style="max-width:820px;">
        <div class="modal-header">
          <div>
            <h3 style="margin:0;font-size:1.1rem;">🎬 Video Production — Post ${postIndex + 1}</h3>
            <span style="font-size:0.75rem;color:var(--text-muted);">${chemData.icon} ${chemData.name} · 3-step workflow</span>
          </div>
          <button class="modal-close" onclick="document.getElementById('video-modal').remove()">&times;</button>
        </div>

        <!-- Tab Navigation -->
        <div style="display:flex;border-bottom:1px solid var(--border,rgba(255,255,255,0.08));padding:0 1.5rem;" id="video-tabs">
          <button class="video-tab active" data-tab="manus" style="padding:0.6rem 1rem;background:none;border:none;border-bottom:2px solid var(--neuro-teal,#00BFA5);color:var(--text-primary);font-size:0.8rem;font-weight:600;cursor:pointer;">📊 Step 1: Manus Slides</button>
          <button class="video-tab" data-tab="heygen" style="padding:0.6rem 1rem;background:none;border:none;border-bottom:2px solid transparent;color:var(--text-muted);font-size:0.8rem;font-weight:600;cursor:pointer;">🎬 Step 2: HeyGen Script</button>
          <button class="video-tab" data-tab="upload" style="padding:0.6rem 1rem;background:none;border:none;border-bottom:2px solid transparent;color:var(--text-muted);font-size:0.8rem;font-weight:600;cursor:pointer;">🚀 Step 3: Upload</button>
        </div>

        <!-- Tab Content -->
        <div class="modal-body" style="max-height:55vh;overflow-y:auto;padding:1rem 1.5rem;">

          <!-- STEP 1: Manus Slide Deck Prompt -->
          <div class="video-tab-content" id="tab-manus">
            <div style="display:flex;align-items:center;gap:0.5rem;margin-bottom:0.75rem;">
              <span style="font-size:0.85rem;font-weight:700;color:var(--text-primary);">Slide Deck Prompt for Manus</span>
              <span style="font-size:0.65rem;padding:0.15rem 0.5rem;background:rgba(0,191,165,0.1);color:var(--neuro-teal,#00BFA5);border-radius:4px;font-weight:600;">COPY → PASTE INTO MANUS</span>
            </div>
            <pre id="manus-prompt-text" style="white-space:pre-wrap;font-size:0.78rem;line-height:1.6;color:var(--text-secondary,#C9D1D9);font-family:var(--font);background:rgba(0,0,0,0.3);padding:1rem;border-radius:8px;border:1px solid rgba(255,255,255,0.06);max-height:40vh;overflow-y:auto;">${escapeHtml(manusPrompt)}</pre>
            <div style="display:flex;gap:0.5rem;margin-top:0.75rem;">
              <button class="btn btn-primary" id="copy-manus-prompt" style="font-size:0.8rem;">📋 Copy Manus Prompt</button>
            </div>
            <div style="margin-top:0.75rem;padding:0.6rem;background:rgba(218,165,32,0.06);border:1px solid rgba(218,165,32,0.15);border-radius:6px;font-size:0.72rem;color:var(--text-muted);">
              💡 <strong>Workflow:</strong> Copy this prompt → paste into Manus → Manus creates the .pptx slide deck → download the .pptx file → upload to HeyGen in Step 2.
            </div>
          </div>

          <!-- STEP 2: HeyGen Pure Script -->
          <div class="video-tab-content" id="tab-heygen" style="display:none;">
            <div style="display:flex;align-items:center;gap:0.5rem;margin-bottom:0.75rem;">
              <span style="font-size:0.85rem;font-weight:700;color:var(--text-primary);">Pure Narration Script for HeyGen</span>
              <span style="font-size:0.65rem;padding:0.15rem 0.5rem;background:rgba(255,107,53,0.1);color:#FF6B35;border-radius:4px;font-weight:600;">COPY → PASTE INTO HEYGEN</span>
            </div>
            <pre id="heygen-script-text" style="white-space:pre-wrap;font-size:0.82rem;line-height:1.7;color:var(--text-primary,#F0F6FC);font-family:var(--font);background:rgba(0,0,0,0.3);padding:1rem;border-radius:8px;border:1px solid rgba(255,255,255,0.06);max-height:35vh;overflow-y:auto;">${escapeHtml(parsed.pureNarration)}</pre>
            <div style="display:flex;gap:0.5rem;margin-top:0.75rem;flex-wrap:wrap;">
              <button class="btn btn-primary" id="copy-heygen-script" style="font-size:0.8rem;">📋 Copy Script</button>
              <a href="https://app.heygen.com/avatar/ppt-to-video" target="_blank" class="btn btn-secondary" style="font-size:0.8rem;text-decoration:none;">🎬 Open HeyGen PPT-to-Video</a>
            </div>
            ${parsed.heygenNotes ? `
            <div style="margin-top:0.75rem;padding:0.6rem;background:rgba(0,191,165,0.06);border:1px solid rgba(0,191,165,0.15);border-radius:6px;font-size:0.72rem;color:var(--text-muted);">
              🎭 <strong>HeyGen Notes:</strong> ${escapeHtml(parsed.heygenNotes)}
            </div>` : ''}
            <div style="margin-top:0.5rem;padding:0.6rem;background:rgba(218,165,32,0.06);border:1px solid rgba(218,165,32,0.15);border-radius:6px;font-size:0.72rem;color:var(--text-muted);">
              💡 <strong>Workflow:</strong> Upload the .pptx from Manus to HeyGen "PPT to Video" → paste this narration script → select Craig's avatar → generate video → download.
            </div>
          </div>

          <!-- STEP 3: Upload -->
          <div class="video-tab-content" id="tab-upload" style="display:none;">
            <div style="text-align:center;padding:2rem 1rem;">
              <div style="font-size:2.5rem;margin-bottom:1rem;">🚀</div>
              <h3 style="margin:0 0 0.5rem;font-size:1rem;color:var(--text-primary);">Upload to GHL Social Planner</h3>
              <p style="font-size:0.82rem;color:var(--text-muted);margin-bottom:1.5rem;max-width:400px;margin-left:auto;margin-right:auto;">
                Once your video is downloaded from HeyGen, upload it to GHL Media Storage, then schedule it in the Social Planner.
              </p>
              <div style="display:flex;flex-direction:column;gap:0.75rem;align-items:center;">
                <a href="https://app.gohighlevel.com/v2/location/EwAyQ03cV2yxVYaxnY5S/media-storage" target="_blank" class="btn btn-primary" style="font-size:0.85rem;text-decoration:none;width:260px;text-align:center;">
                  📁 Open GHL Media Storage
                </a>
                <a href="https://app.gohighlevel.com/v2/location/EwAyQ03cV2yxVYaxnY5S/marketing/social-planner" target="_blank" class="btn btn-secondary" style="font-size:0.85rem;text-decoration:none;width:260px;text-align:center;">
                  📅 Open GHL Social Planner
                </a>
              </div>
              ${parsed.socialCaption ? `
              <div style="margin-top:1.5rem;text-align:left;">
                <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:0.5rem;">
                  <span style="font-size:0.8rem;font-weight:600;color:var(--text-primary);">Social Caption</span>
                  <button class="btn btn-secondary" id="copy-social-caption" style="font-size:0.72rem;padding:0.25rem 0.6rem;">📋 Copy</button>
                </div>
                <pre style="white-space:pre-wrap;font-size:0.78rem;line-height:1.5;color:var(--text-secondary);font-family:var(--font);background:rgba(0,0,0,0.3);padding:0.75rem;border-radius:6px;border:1px solid rgba(255,255,255,0.06);">${escapeHtml(parsed.socialCaption)}</pre>
              </div>` : ''}
            </div>
          </div>

        </div>
      </div>
    `;

  document.body.appendChild(modal);
  modal.addEventListener('click', (e) => { if (e.target === modal) modal.remove(); });

  // Tab switching
  modal.querySelectorAll('.video-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      modal.querySelectorAll('.video-tab').forEach(t => {
        t.style.borderBottomColor = 'transparent';
        t.style.color = 'var(--text-muted)';
        t.classList.remove('active');
      });
      tab.style.borderBottomColor = 'var(--neuro-teal,#00BFA5)';
      tab.style.color = 'var(--text-primary)';
      tab.classList.add('active');

      modal.querySelectorAll('.video-tab-content').forEach(c => c.style.display = 'none');
      document.getElementById(`tab-${tab.dataset.tab}`).style.display = 'block';
    });
  });

  // Copy buttons
  document.getElementById('copy-manus-prompt').addEventListener('click', () => {
    copyToClipboard(manusPrompt);
    showToast('Manus slide deck prompt copied!', 'success');
  });

  document.getElementById('copy-heygen-script').addEventListener('click', () => {
    copyToClipboard(parsed.pureNarration);
    showToast('Pure narration script copied!', 'success');
  });

  document.getElementById('copy-social-caption')?.addEventListener('click', () => {
    copyToClipboard(parsed.socialCaption);
    showToast('Social caption copied!', 'success');
  });
}


// ═══════════════════════════════════════════════════════════════
// MODE 2: RESEARCH (7-Area Pipeline — Replaces Gemini Gem)
// ═══════════════════════════════════════════════════════════════

function initResearchMode() {
  document.getElementById('run-research-btn')?.addEventListener('click', handleRunResearch);
  document.getElementById('copy-for-claude-btn')?.addEventListener('click', handleCopyForClaude);
  document.getElementById('copy-raw-research-btn')?.addEventListener('click', handleCopyRawResearch);
  document.getElementById('rerun-research-btn')?.addEventListener('click', () => {
    document.getElementById('research-results-container')?.classList.add('hidden');
    state.researchResults = [];
    handleRunResearch();
  });
}

async function handleRunResearch() {
  const settings = loadSettings();
  if (!settings.geminiApiKey) {
    showToast('Please add your Gemini API key in Settings ⚙️ first.', 'error');
    return;
  }

  const btn = document.getElementById('run-research-btn');
  const progressContainer = document.getElementById('research-progress');
  const progressText = document.getElementById('research-progress-text');
  const progressBar = document.getElementById('research-progress-bar');
  const bonusTopic = document.getElementById('research-bonus-topic')?.value?.trim() || '';

  btn.classList.add('loading');
  btn.disabled = true;
  progressContainer?.classList.remove('hidden');
  setStatus('🔬 Running 7-area research pipeline...', true);

  try {
    const totalAreas = bonusTopic ? 8 : 7;

    state.researchResults = await runWeeklyResearch(
      settings.geminiApiKey,
      bonusTopic,
      (current, total, areaName) => {
        const pct = Math.round((current / totalAreas) * 100);
        if (progressText) progressText.textContent = `🔍 Searching ${current}/${totalAreas}: ${areaName}`;
        if (progressBar) progressBar.style.width = `${pct}%`;
        setStatus(`🔬 Search ${current}/${totalAreas}: ${areaName}`, true);
      }
    );

    if (progressText) progressText.textContent = `✅ ${state.researchResults.length} articles found!`;
    if (progressBar) progressBar.style.width = '100%';

    renderResearchResults();
    document.getElementById('research-results-container')?.classList.remove('hidden');

    // Save to localStorage
    try {
      localStorage.setItem('driverResearch_results', JSON.stringify({
        results: state.researchResults,
        timestamp: Date.now()
      }));
    } catch (e) { console.warn('Failed to save research results:', e); }

    const goodArticles = state.researchResults.filter(r => r.article && !r.error).length;
    showToast(`Research complete! ${goodArticles} killer articles found. Copy All for Claude →`, 'success');
  } catch (err) {
    showToast(`Research error: ${err.message}`, 'error');
    console.error('[Research]', err);
    if (progressText) progressText.textContent = `❌ Error: ${err.message}`;
  } finally {
    btn.classList.remove('loading');
    btn.disabled = false;
    setStatus('Ready');
  }
}

function renderResearchResults() {
  const container = document.getElementById('research-results-list');
  if (!container || !state.researchResults.length) return;

  const qualityColors = {
    high: '#2EA043',   // 7-10
    medium: '#DAA520', // 4-6
    low: '#E84444',    // 1-3
    none: '#484F58'    // 0 / error
  };

  const getQualityLevel = (q) => {
    if (!q || q === 0) return 'none';
    if (q >= 7) return 'high';
    if (q >= 4) return 'medium';
    return 'low';
  };

  const areaIcons = {
    1: '🎯', // Attention & Focus
    2: '🌊', // Flow State
    3: '🏁', // Motorsport News
    4: '🧠', // Overthinking
    5: '🔄', // Adaptability
    6: '👁️', // Vision & Reaction
    7: '😰', // Performance Anxiety
    8: '⭐'  // Bonus
  };

  container.innerHTML = state.researchResults.map((r, i) => {
    const qLevel = getQualityLevel(r.quality);
    const qColor = qualityColors[qLevel];
    const icon = areaIcons[r.searchNumber] || '📰';
    const hasError = r.error || !r.article;
    const escapedUrl = r.url ? escapeHtml(r.url) : '';
    const isBonus = r.isBonus || r.searchNumber === 8;

    return `
      <div class="research-card" style="
        margin-bottom:1rem;
        border:1px solid ${hasError ? 'rgba(232,68,68,0.2)' : `${qColor}25`};
        border-left:4px solid ${hasError ? '#E84444' : qColor};
        border-radius:0 8px 8px 0;
        background:var(--card,#161B22);
        overflow:hidden;
        ${isBonus ? 'border-style:dashed;' : ''}
      ">
        <!-- Header -->
        <div style="
          display:flex;align-items:center;justify-content:space-between;
          padding:0.6rem 0.8rem;
          background:rgba(0,0,0,0.2);
          border-bottom:1px solid rgba(255,255,255,0.04);
        ">
          <div style="display:flex;align-items:center;gap:0.5rem;">
            <span style="font-size:1rem;">${icon}</span>
            <span style="font-size:0.82rem;font-weight:700;color:var(--text-primary);">
              ${isBonus ? 'BONUS #8' : `SEARCH ${r.searchNumber}`}: ${escapeHtml(r.searchArea)}
            </span>
            ${r.quality ? `<span style="
              font-size:0.6rem;padding:0.1rem 0.4rem;
              background:${qColor}18;color:${qColor};
              border:1px solid ${qColor}30;border-radius:3px;
              font-weight:700;
            ">${r.quality}/10</span>` : ''}
          </div>
          <button class="post-action-btn" onclick="window.appActions.copyResearchCard(${i})"
            style="font-size:0.68rem;color:var(--neuro-teal,#00BFA5);padding:0.15rem 0.5rem;">
            📋 Copy
          </button>
        </div>

        <!-- Body -->
        <div style="padding:0.6rem 0.8rem;">
          ${hasError ? `
            <div style="color:var(--text-muted);font-size:0.8rem;font-style:italic;padding:0.5rem 0;">
              ${escapeHtml(r.summary || 'No article found for this search area.')}
            </div>
          ` : `
            <!-- ARTICLE -->
            <div style="margin-bottom:0.4rem;">
              <span style="font-size:0.68rem;font-weight:700;color:var(--neuro-teal,#00BFA5);letter-spacing:0.5px;">ARTICLE:</span>
              <span style="font-size:0.8rem;color:var(--text-primary);margin-left:0.3rem;font-weight:600;">${escapeHtml(r.article)}</span>
            </div>

            <!-- URL -->
            <div style="margin-bottom:0.4rem;display:flex;align-items:center;gap:0.4rem;flex-wrap:wrap;">
              <span style="font-size:0.68rem;font-weight:700;color:var(--neuro-teal,#00BFA5);letter-spacing:0.5px;">URL:</span>
              ${escapedUrl ? `
                <a href="${escapedUrl}" target="_blank" rel="noopener"
                  style="font-size:0.72rem;color:var(--neuro-teal,#00BFA5);word-break:break-all;text-decoration:underline;">
                  ${escapeHtml(r.url.length > 80 ? r.url.substring(0, 80) + '...' : r.url)}
                </a>
              ` : `<span style="font-size:0.72rem;color:var(--text-muted);font-style:italic;">No URL found</span>`}
            </div>

            <!-- SOURCE -->
            ${r.source ? `
            <div style="margin-bottom:0.4rem;">
              <span style="font-size:0.68rem;font-weight:700;color:var(--neuro-teal,#00BFA5);letter-spacing:0.5px;">SOURCE:</span>
              <span style="font-size:0.75rem;color:var(--text-secondary);margin-left:0.3rem;">${escapeHtml(r.source)}</span>
            </div>` : ''}

            <!-- SUMMARY -->
            <div style="margin-bottom:0.4rem;">
              <span style="font-size:0.68rem;font-weight:700;color:var(--neuro-teal,#00BFA5);letter-spacing:0.5px;">SUMMARY:</span>
              <p style="font-size:0.75rem;color:var(--text-secondary);line-height:1.55;margin:0.15rem 0 0;">${escapeHtml(r.summary)}</p>
            </div>

            <!-- KILLER DATA POINT -->
            ${r.killerDataPoint ? `
            <div style="margin-bottom:0.4rem;padding:0.35rem 0.6rem;background:rgba(218,165,32,0.08);border-radius:4px;border-left:2px solid var(--gold,#DAA520);">
              <span style="font-size:0.68rem;font-weight:700;color:var(--gold,#DAA520);letter-spacing:0.5px;">📊 KILLER DATA POINT:</span>
              <p style="font-size:0.75rem;color:var(--gold,#DAA520);line-height:1.45;margin:0.15rem 0 0;font-weight:600;">"${escapeHtml(r.killerDataPoint)}"</p>
            </div>` : ''}

            <!-- RACING RELEVANCE -->
            ${r.racingRelevance ? `
            <div style="padding:0.35rem 0.6rem;background:rgba(0,191,165,0.06);border-radius:4px;border-left:2px solid var(--neuro-teal,#00BFA5);">
              <span style="font-size:0.68rem;font-weight:700;color:var(--neuro-teal,#00BFA5);letter-spacing:0.5px;">🏁 RACING RELEVANCE:</span>
              <p style="font-size:0.75rem;color:var(--text-secondary);line-height:1.45;margin:0.15rem 0 0;font-style:italic;">${escapeHtml(r.racingRelevance)}</p>
            </div>` : ''}
          `}
        </div>
      </div>
    `;
  }).join('');
}

function handleCopyForClaude() {
  if (!state.researchResults.length) {
    showToast('No research results to copy.', 'error');
    return;
  }
  const text = formatResearchForClaude(state.researchResults);
  copyToClipboard(text);
  showToast('Research copied for Claude! Paste into your Claude project.', 'success');
}

function handleCopyRawResearch() {
  if (!state.researchResults.length) {
    showToast('No research results to copy.', 'error');
    return;
  }

  let text = '';
  for (const r of state.researchResults) {
    text += `---\n`;
    text += `SEARCH ${r.searchNumber}: ${r.searchArea}\n\n`;
    text += `ARTICLE: ${r.article || 'No article found'}\n`;
    text += `URL: ${r.url || 'No URL available'}\n`;
    text += `SOURCE: ${r.source || 'Unknown'}\n`;
    text += `SUMMARY: ${r.summary || 'N/A'}\n`;
    text += `KILLER DATA POINT: ${r.killerDataPoint || 'None found'}\n`;
    text += `RACING RELEVANCE: ${r.racingRelevance || 'N/A'}\n`;
    text += `---\n\n`;
  }
  copyToClipboard(text);
  showToast('Raw research text copied!', 'success');
}


// ═══════════════════════════════════════════════════════════════
// MODE 3: SINGLE POST
// ═══════════════════════════════════════════════════════════════

function initSinglePost() {
  document.getElementById('generate-single-btn')?.addEventListener('click', handleGenerateSingle);
}

async function handleGenerateSingle() {
  const settings = loadSettings();
  if (!settings.claudeApiKey) {
    showToast('Please add your Claude API key in Settings ⚙️ first.', 'error');
    return;
  }

  const input = document.getElementById('single-input')?.value.trim();
  if (!input) {
    showToast('Type or paste something — a link, a quote, or describe what happened.', 'error');
    return;
  }

  // AI decides everything
  const pillar = getRandomPillar();
  const framework = getRandomFramework();
  const cta = getRotatingCTA();
  const authorityLine = getRotatingAuthority();

  const btn = document.getElementById('generate-single-btn');
  btn.classList.add('loading');
  btn.disabled = true;
  setStatus('⚡ Generating post...', true);

  const resultContainer = document.getElementById('single-result');
  resultContainer.classList.remove('hidden');
  resultContainer.innerHTML = `
        <div class="empty-state">
            <span class="spinner" style="width:32px;height:32px;border-width:3px;"></span>
            <p style="margin-top:1rem;">Generating your post...</p>
        </div>
    `;

  try {
    const content = await generatePost({
      topic: input,
      pillar,
      framework,
      cta,
      authorityLine,
      apiKey: settings.claudeApiKey,
    });

    const post = { id: `single-${Date.now()}`, content, pillar, framework, cta, topic: { headline: input }, imageUrl: '', edited: false };
    const wordCount = content.split(/\s+/).filter(w => w).length;
    const chem = assignChemical(null, pillar);

    resultContainer.innerHTML = `
      <div class="post-card">
        <div class="post-card-header">
          <div class="post-card-header-left">
            <span class="story-tag chemical" style="background:${chem.color}15;color:${chem.color};border:1px solid ${chem.color}30;">
              ${chem.icon} ${chem.name}
            </span>
            <span class="pillar-badge" style="border: 1px solid ${pillar.color}30; color: ${pillar.color};">
              ${pillar.icon} ${pillar.name}
            </span>
            <span class="framework-badge">${framework.icon} ${framework.name}</span>
            <span class="framework-badge">🎯 ${cta.shortName}</span>
          </div>
          <span class="word-count">${wordCount} words</span>
        </div>
        <div class="post-content" id="single-post-content">${escapeHtml(content)}</div>
        <div class="post-card-footer">
          <div class="post-meta"><span class="word-count">${wordCount} words</span></div>
          <div class="post-actions">
            <button class="post-action-btn" id="single-copy-btn">📋 Copy</button>
            <button class="post-action-btn" id="single-download-btn">💾 .txt</button>
          </div>
        </div>
      </div>
    `;

    document.getElementById('single-copy-btn')?.addEventListener('click', () => {
      copyToClipboard(post.content);
      showToast('Post copied!', 'success');
    });

    document.getElementById('single-download-btn')?.addEventListener('click', () => {
      downloadPostTxt(post, 0);
      showToast('Downloaded!', 'success');
    });

    showToast('Post generated!', 'success');
  } catch (err) {
    resultContainer.innerHTML = `
      <div class="empty-state">
        <span class="empty-icon">⚠️</span>
        <p>Failed to generate: ${err.message}</p>
      </div>
    `;
    showToast(`Error: ${err.message}`, 'error');
  } finally {
    btn.classList.remove('loading');
    btn.disabled = false;
    setStatus('Ready');
  }
}


// ═══════════════════════════════════════════════════════════════
// EMAIL GENERATION
// ═══════════════════════════════════════════════════════════════

function showEmailModal(emailData, emailHTML, postIndex) {
  document.getElementById('email-modal')?.remove();

  const modal = document.createElement('div');
  modal.id = 'email-modal';
  modal.style.cssText = `
        position:fixed;top:0;left:0;right:0;bottom:0;z-index:9999;
        background:rgba(0,0,0,0.8);display:flex;align-items:center;justify-content:center;
        padding:1rem;backdrop-filter:blur(4px);
    `;

  modal.innerHTML = `
        <div style="background:var(--bg-secondary,#161B22);border:1px solid rgba(255,255,255,0.08);border-radius:12px;max-width:720px;width:100%;max-height:90vh;display:flex;flex-direction:column;overflow:hidden;">
            <div style="display:flex;align-items:center;justify-content:space-between;padding:1rem 1.25rem;border-bottom:1px solid rgba(255,255,255,0.06);">
                <div>
                    <div style="font-weight:700;font-size:0.95rem;color:var(--text-primary,#F0F6FC);">📧 Email — Post ${postIndex + 1}</div>
                    <div style="font-size:0.75rem;color:var(--text-muted,#8B949E);margin-top:2px;">Subject: <strong style="color:var(--gold,#DAA520);">${escapeHtml(emailData.subject)}</strong></div>
                </div>
                <button onclick="document.getElementById('email-modal').remove()" style="background:none;border:none;color:var(--text-muted);font-size:1.5rem;cursor:pointer;">✕</button>
            </div>
            <div style="flex:1;overflow-y:auto;padding:1rem 1.25rem;">
                <div style="display:flex;gap:0.5rem;margin-bottom:1rem;flex-wrap:wrap;">
                    <button id="email-copy-html-btn" style="padding:0.5rem 1rem;background:var(--neuro-teal,#00BFA5);color:#0A1628;border:none;border-radius:6px;font-weight:700;font-size:0.8rem;cursor:pointer;">📋 Copy HTML</button>
                    <button id="email-download-btn" style="padding:0.5rem 1rem;background:rgba(255,255,255,0.08);color:var(--text-primary);border:1px solid rgba(255,255,255,0.1);border-radius:6px;font-size:0.8rem;cursor:pointer;">💾 Download</button>
                    <button id="email-copy-subject-btn" style="padding:0.5rem 1rem;background:rgba(255,255,255,0.08);color:var(--text-primary);border:1px solid rgba(255,255,255,0.1);border-radius:6px;font-size:0.8rem;cursor:pointer;">📝 Subject</button>
                    <button id="email-send-ghl-btn" style="padding:0.5rem 1rem;background:var(--gold,#DAA520);color:#0A1628;border:none;border-radius:6px;font-weight:700;font-size:0.8rem;cursor:pointer;">🚀 Send via GHL</button>
                </div>

                <div id="ghl-send-form" style="display:none;margin-bottom:1rem;padding:0.75rem;background:rgba(218,165,32,0.06);border:1px solid rgba(218,165,32,0.15);border-radius:8px;">
                    <label style="font-size:0.75rem;font-weight:600;color:var(--gold);display:block;margin-bottom:0.4rem;">Recipient Email</label>
                    <div style="display:flex;gap:0.5rem;">
                        <input type="email" id="ghl-recipient-email" class="form-input" placeholder="driver@example.com" style="flex:1;font-size:0.8rem;padding:0.4rem 0.6rem;" />
                        <input type="text" id="ghl-recipient-name" class="form-input" placeholder="Name (optional)" style="width:140px;font-size:0.8rem;padding:0.4rem 0.6rem;" />
                        <button id="ghl-send-confirm-btn" style="padding:0.4rem 1rem;background:var(--green,#2EA043);color:white;border:none;border-radius:6px;font-weight:700;font-size:0.8rem;cursor:pointer;white-space:nowrap;">✉️ Send</button>
                    </div>
                    <div id="ghl-send-status" style="font-size:0.7rem;color:var(--text-muted);margin-top:0.4rem;"></div>
                </div>

                <div style="border:1px solid rgba(255,255,255,0.06);border-radius:8px;overflow:hidden;background:#0D1117;">
                    <iframe id="email-preview-frame" style="width:100%;height:500px;border:none;"></iframe>
                </div>
            </div>
        </div>
    `;

  document.body.appendChild(modal);

  const iframe = document.getElementById('email-preview-frame');
  const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
  iframeDoc.open();
  iframeDoc.write(emailHTML);
  iframeDoc.close();

  // Button handlers
  document.getElementById('email-copy-html-btn').addEventListener('click', () => {
    copyToClipboard(emailHTML);
    showToast('HTML copied!', 'success');
  });

  document.getElementById('email-download-btn').addEventListener('click', () => {
    const blob = new Blob([emailHTML], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `email-post-${postIndex + 1}.html`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Email downloaded!', 'success');
  });

  document.getElementById('email-copy-subject-btn').addEventListener('click', () => {
    copyToClipboard(emailData.subject);
    showToast('Subject copied!', 'success');
  });

  document.getElementById('email-send-ghl-btn').addEventListener('click', () => {
    const form = document.getElementById('ghl-send-form');
    form.style.display = form.style.display === 'none' ? 'block' : 'none';
    if (form.style.display === 'block') document.getElementById('ghl-recipient-email')?.focus();
  });

  document.getElementById('ghl-send-confirm-btn').addEventListener('click', async () => {
    const recipientEmail = document.getElementById('ghl-recipient-email')?.value?.trim();
    const recipientName = document.getElementById('ghl-recipient-name')?.value?.trim();
    const statusEl = document.getElementById('ghl-send-status');

    if (!recipientEmail || !recipientEmail.includes('@')) {
      statusEl.innerHTML = '<span style="color:var(--accent);">Enter a valid email address.</span>';
      return;
    }

    const settings = loadSettings();
    if (!settings.ghlToken) {
      statusEl.innerHTML = '<span style="color:var(--accent);">GHL token not configured. Go to Settings.</span>';
      return;
    }

    statusEl.innerHTML = '<span style="color:var(--gold);">⏳ Sending...</span>';
    document.getElementById('ghl-send-confirm-btn').disabled = true;

    try {
      const result = await dispatchEmail({
        recipientEmail,
        recipientName: recipientName || '',
        subject: emailData.subject,
        html: emailHTML,
        tags: ['nurture-email', 'driver-social-media-machine']
      });
      statusEl.innerHTML = `<span style="color:var(--green);">✅ Sent! Contact: ${result.contactId} ${result.isNewContact ? '(new)' : '(existing)'}</span>`;
      showToast(`Email sent to ${recipientEmail}!`, 'success');
    } catch (err) {
      statusEl.innerHTML = `<span style="color:var(--accent);">❌ ${err.message}</span>`;
    } finally {
      document.getElementById('ghl-send-confirm-btn').disabled = false;
    }
  });

  modal.addEventListener('click', (e) => { if (e.target === modal) modal.remove(); });
}


// ─── Bulk Email Generation ────────────────────────────────────
async function handleGenerateAllEmails() {
  const settings = loadSettings();
  if (!settings.claudeApiKey) { showToast('Claude API key needed.', 'error'); return; }
  if (state.posts.length === 0) { showToast('No posts to email.', 'error'); return; }

  setStatus('📧 Generating emails for all posts...', true);
  const results = [];

  for (let i = 0; i < state.posts.length; i++) {
    try {
      setStatus(`📧 Generating email ${i + 1}/${state.posts.length}...`, true);
      const emailData = await generateEmail({
        postContent: state.posts[i].content,
        topic: state.posts[i].topic || state.topics[i],
        pillar: state.posts[i].pillar,
        cta: state.posts[i].cta,
        apiKey: settings.claudeApiKey
      });
      const emailHTML = renderEmailHTML(emailData);

      const blob = new Blob([emailHTML], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `email-post-${i + 1}.html`;
      a.click();
      URL.revokeObjectURL(url);
      results.push({ index: i, success: true });
    } catch (err) {
      results.push({ index: i, success: false, error: err.message });
    }
  }

  const successCount = results.filter(r => r.success).length;
  showToast(`${successCount}/${state.posts.length} emails generated and downloaded!`, 'success');
  setStatus('Ready');
}


// ─── Export CSV ────────────────────────────────────────────────
function handleExportCSV() {
  const validPosts = state.posts.filter(Boolean);
  if (validPosts.length === 0) { showToast('No posts to export.', 'error'); return; }
  const dates = getScheduleDates(state.posts.length);
  const filename = exportCSV(validPosts, dates);
  showToast(`Exported ${validPosts.length} posts to ${filename}`, 'success');
}

function handleCopyCSV() {
  const validPosts = state.posts.filter(Boolean);
  if (validPosts.length === 0) { showToast('No posts to copy.', 'error'); return; }
  const dates = getScheduleDates(state.posts.length);
  const csvString = buildCSVString(validPosts, dates);
  copyToClipboard(csvString);
  showToast(`CSV for ${validPosts.length} posts copied!`, 'success');
}
