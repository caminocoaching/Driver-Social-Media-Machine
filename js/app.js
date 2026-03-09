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
  getAllRaceWeekContexts
} from './content-engine.js';

import {
  generateTopics, generatePost, generatePosts, regeneratePost, generateImagePrompt,
  generateVideoScript, storeUsedArticles, storeUsedHooks,
  generateEmail, renderEmailHTML
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
  weeklyPillars: [],
  weeklyFrameworks: [],
  weeklyCTAs: [],
  weeklyAuthorities: [],
  allRaceContexts: []
};

const STORAGE_KEY = 'driverSocialMedia_session';

// ─── Auto-Save / Restore ──────────────────────────────────────
function saveSession() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      stories: state.stories,
      topics: state.topics,
      posts: state.posts,
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
  localStorage.removeItem(STORAGE_KEY);
  state.stories = [];
  state.topics = [];
  state.posts = [];
  state.weeklyPillars = [];
  state.weeklyFrameworks = [];
  state.weeklyCTAs = [];
  state.weeklyAuthorities = [];

  // Reset UI
  document.getElementById('stories-container')?.classList.add('hidden');
  document.getElementById('posts-container')?.classList.add('hidden');
  showToast('Session cleared — ready for a fresh week!', 'success');
}


// ─── Initialise ───────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initWeeklyMode();
  initSinglePost();
  renderSettingsPage();
  checkRaceWeek();
  restoreSession();
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

  const pageMap = { weekly: 'weekly-page', single: 'single-page', settings: 'settings-page' };
  document.getElementById(pageMap[page])?.classList.add('active');
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
          <button class="story-generate-btn" onclick="window.appActions.regenerateStory && window.appActions.regenerateStory(${i})" style="font-size:0.7rem;padding:0.3rem 0.6rem;background:none;border:1px solid var(--border);color:var(--text-muted);" title="Find a different story for this slot">
            🔄 Swap
          </button>
          <button class="story-generate-btn" onclick="window.appActions.generateStory(${i})">
            Generate →
          </button>
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
              <span style="font-size:0.8rem;font-weight:700;color:var(--neuro-teal,#00BFA5);">🎬 Video Script (clean TXT)</span>
              <div style="display:flex;gap:0.4rem;">
                <button class="post-action-btn" onclick="window.appActions.copyVideoScript(${i})" style="font-size:0.7rem;">📋 Copy Script</button>
                <button class="post-action-btn" onclick="window.appActions.openManusPrompt(${i})" style="font-size:0.7rem;">📊 Manus Prompt</button>
              </div>
            </div>
            <pre style="white-space:pre-wrap;font-size:0.8rem;line-height:1.7;color:var(--text-primary,#F0F6FC);font-family:var(--font);background:rgba(0,0,0,0.3);padding:1rem;border-radius:8px;border:1px solid rgba(255,255,255,0.06);max-height:300px;overflow-y:auto;">${escapeHtml(post._videoNarration)}</pre>
          </div>
          ` : ''}
          ${isConfirmed && !post._emailHTML ? `
          <div style="border-top:1px solid rgba(255,255,255,0.06);padding:1.5rem;text-align:center;">
            <div style="font-size:0.8rem;color:var(--text-muted);" id="confirm-status-${i}">⏳ Generating email + video script...</div>
          </div>
          ` : ''}

          ${isConfirmed ? `
          <!-- 🚀 LAUNCH LINKS -->
          <div style="border-top:1px solid rgba(255,255,255,0.06);padding:0.6rem 1rem;display:flex;gap:0.5rem;flex-wrap:wrap;align-items:center;">
            <span style="font-size:0.72rem;font-weight:700;color:var(--text-muted);">🚀 NEXT:</span>
            <a href="https://manus.im/app/project/9SDGQdQC5wMtzPWss5vc4K" target="_blank" rel="noopener" style="font-size:0.72rem;padding:0.25rem 0.6rem;background:rgba(0,191,165,0.12);color:var(--neuro-teal,#00BFA5);border:1px solid rgba(0,191,165,0.3);border-radius:5px;text-decoration:none;font-weight:700;">🎨 Manus Slides</a>
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
    if (post._editing) {
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

    setStatus(`✅ Confirmed post ${index + 1} — generating email + video script...`, true);

    try {
      const [emailData, videoScript] = await Promise.all([
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
        })
      ]);

      const emailHTML = renderEmailHTML(emailData, post.pillar);
      post._emailHTML = emailHTML;
      post._emailSubject = emailData.subject;

      const parsed = parseVideoScript(videoScript);
      post._videoNarration = parsed.pureNarration;
      post._videoFull = videoScript;
      post._manusPrompt = buildManusPrompt(parsed.slideBrief, chemData, index, topicData);

      saveSession();
      renderPosts();
      showToast(`Post ${index + 1} confirmed — email + video script ready!`, 'success');
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
    if (post?._videoNarration) { copyToClipboard(post._videoNarration); showToast('Video script copied!', 'success'); }
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

  async generateStory(index) {
    const story = state.stories[index];
    if (!story) return;
    const settings = loadSettings();
    if (!settings.claudeApiKey) { showToast('Claude API key needed.', 'error'); return; }

    setStatus(`Writing post for story ${index + 1}...`, true);
    try {
      const content = await generatePost({
        topic: story.headline || story.topic,
        pillar: story.pillar,
        framework: story.framework,
        cta: story.cta,
        authorityLine: state.weeklyAuthorities[index] || getRotatingAuthority(),
        apiKey: settings.claudeApiKey
      });

      // Add to posts array at this index
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

      // If all posts are generated, show posts view
      if (state.posts.filter(Boolean).length === state.stories.length) {
        renderPosts();
        showContainer('posts-container');
      } else {
        // Show inline preview on the story card
        const card = document.querySelector(`.story-card[data-index="${index}"]`);
        if (card) {
          card.querySelector('.story-card-actions').innerHTML = `
                        <span style="color:var(--green);font-size:0.75rem;font-weight:600;">✅ Generated</span>
                    `;
          card.style.borderColor = 'rgba(46,160,67,0.3)';
        }
      }
    } catch (err) {
      showToast(`Error: ${err.message}`, 'error');
    } finally { setStatus('Ready'); }
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

  clearSession() { clearSession(); }
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
  // Removes lines like "HOOK (0-5s):", "THE SCIENCE (15-35s):", etc.
  const pureNarration = rawVideoScript
    .replace(/^(HOOK|SCENARIO|THE SCIENCE|THE COST|THE BRIDGE|CTA)\s*(\([^)]*\))?\s*:?\s*$/gim, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();

  // Extract social caption
  const captionMatch = script.match(/=== SOCIAL CAPTION ===([\s\S]*?)(?:===|$)/i);
  const socialCaption = (captionMatch?.[1] || '').trim();

  // Extract HeyGen notes
  const heygenMatch = script.match(/=== HEYGEN NOTES ===([\s\S]*?)(?:===|$)/i);
  const heygenNotes = (heygenMatch?.[1] || '').trim();

  return { slideBrief, pureNarration, socialCaption, heygenNotes, rawVideoScript };
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
// MODE 2: SINGLE POST
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
  if (state.posts.length === 0) { showToast('No posts to export.', 'error'); return; }
  const dates = getScheduleDates(state.posts.length);
  const filename = exportCSV(state.posts, dates);
  showToast(`Exported ${state.posts.length} posts to ${filename}`, 'success');
}

function handleCopyCSV() {
  if (state.posts.length === 0) { showToast('No posts to copy.', 'error'); return; }
  const dates = getScheduleDates(state.posts.length);
  const csvString = buildCSVString(state.posts, dates);
  copyToClipboard(csvString);
  showToast(`CSV for ${state.posts.length} posts copied!`, 'success');
}
