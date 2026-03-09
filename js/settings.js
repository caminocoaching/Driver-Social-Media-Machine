// ═══════════════════════════════════════════════════════════════
// 🏁 DRIVER SOCIAL MEDIA MACHINE — Settings Manager
// LocalStorage persistence for API keys, preferences
// ═══════════════════════════════════════════════════════════════

const STORAGE_KEY = 'driver-social-media-machine-settings';
const ERROR_LOG_KEY = 'driver-social-media-error-log';
const MAX_LOG_ENTRIES = 100;

// ─── Error Logger ─────────────────────────────────────────────────
function getErrorLog() {
  try {
    return JSON.parse(localStorage.getItem(ERROR_LOG_KEY) || '[]');
  } catch { return []; }
}

function saveErrorLog(log) {
  try {
    // Keep only the latest MAX_LOG_ENTRIES
    const trimmed = log.slice(-MAX_LOG_ENTRIES);
    localStorage.setItem(ERROR_LOG_KEY, JSON.stringify(trimmed));
  } catch { /* storage full — silently fail */ }
}

function logError(source, message, extra = '') {
  const log = getErrorLog();
  log.push({
    time: new Date().toISOString(),
    source,
    message: String(message).substring(0, 500),
    extra: String(extra).substring(0, 200)
  });
  saveErrorLog(log);

  // Update badge if settings page is visible
  const badge = document.getElementById('error-log-count');
  if (badge) badge.textContent = log.length;
}

export function clearErrorLog() {
  localStorage.removeItem(ERROR_LOG_KEY);
}

// ─── Global Error Capture ─────────────────────────────────────────
window.addEventListener('error', (event) => {
  logError('JS Error', event.message, `${event.filename}:${event.lineno}`);
});

window.addEventListener('unhandledrejection', (event) => {
  const msg = event.reason?.message || event.reason || 'Unknown promise rejection';
  logError('Promise Rejection', msg);
});

// Intercept console.error to capture API errors etc.
const _origConsoleError = console.error;
console.error = function (...args) {
  _origConsoleError.apply(console, args);
  const msg = args.map(a => {
    if (a instanceof Error) return `${a.name}: ${a.message}`;
    if (typeof a === 'object' && a !== null) {
      try {
        if (a.message) return `${a.name || 'Error'}: ${a.message}`;
        if (a.error?.message) return `API Error: ${a.error.message}`;
        const s = JSON.stringify(a);
        return s === '{}' ? Object.prototype.toString.call(a) : s;
      } catch { return String(a); }
    }
    return String(a);
  }).join(' ');
  logError('console.error', msg.substring(0, 500));
};

// Public API for explicit error logging from other modules
window.appLog = {
  error(source, message) { logError(source, message); },
  getLog() { return getErrorLog(); },
  clear() { clearErrorLog(); }
};

const DEFAULT_SETTINGS = {
  geminiApiKey: '',
  claudeApiKey: '',
  heygenApiKey: '',
  heygenAvatarId: '',
  heygenVoiceId: '',
  manusApiKey: '',
  canvaApiToken: '',
  canvaPostTemplateId: '',
  ghlToken: '',
  ghlLocationId: '',
  ghlEmailFrom: '',
  publishMethod: 'csv',
  facebookGroups: [
    { name: 'Racing Drivers & Track Day Enthusiasts', url: '', enabled: true },
    { name: 'British GT & Club Racing Community', url: '', enabled: true },
    { name: 'Motorsport Performance Discussion Group', url: '', enabled: true }
  ],
  postLength: 'medium',
  brandName: 'Camino Coaching',
  reviewUrl: 'improve-rider.scoreapp.com',
  seasonReviewUrl: 'riderseason.scoreapp.com',
  flowProfileUrl: '',
  mindsetQuizUrl: '',
  sleepTestUrl: '',
  blueprintUrl: 'https://academy.caminocoaching.co.uk/podium-contenders-blueprint/order/'
};

// ─── Load Settings ────────────────────────────────────────────
export function loadSettings() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return { ...DEFAULT_SETTINGS, ...JSON.parse(stored) };
    }
  } catch (e) {
    console.warn('Failed to load settings:', e);
  }
  return { ...DEFAULT_SETTINGS };
}

// ─── Save Settings ────────────────────────────────────────────
export function saveSettings(settings) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    return true;
  } catch (e) {
    console.error('Failed to save settings:', e);
    return false;
  }
}

// ─── Get Single Setting ──────────────────────────────────────
export function getSetting(key) {
  const settings = loadSettings();
  return settings[key];
}

// ─── Update Single Setting ───────────────────────────────────
export function updateSetting(key, value) {
  const settings = loadSettings();
  settings[key] = value;
  return saveSettings(settings);
}

// ─── Render Error Log Entries ─────────────────────────────────────
function renderErrorLogEntries() {
  const log = getErrorLog();
  if (log.length === 0) {
    return '<div style="color:var(--text-muted);text-align:center;padding:1.5rem;font-style:italic;">No errors logged ✅</div>';
  }
  return log.slice().reverse().map(entry => {
    const time = new Date(entry.time);
    const timeStr = time.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }) + ' ' + time.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const sourceColor = entry.source === 'JS Error' ? '#ef4444' : entry.source === 'Promise Rejection' ? '#f59e0b' : entry.source === 'console.error' ? '#f97316' : '#8b5cf6';
    const escapedMsg = entry.message.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    const escapedExtra = entry.extra ? entry.extra.replace(/</g, '&lt;').replace(/>/g, '&gt;') : '';
    return `<div style="padding:0.35rem 0;border-bottom:1px solid rgba(255,255,255,0.04);">
      <span style="color:var(--text-muted);">${timeStr}</span>
      <span style="color:${sourceColor};font-weight:600;margin-left:0.4rem;">[${entry.source}]</span>
      <span style="color:var(--text-secondary);margin-left:0.3rem;">${escapedMsg}</span>
      ${escapedExtra ? `<span style="color:var(--text-muted);margin-left:0.3rem;font-size:0.65rem;">(${escapedExtra})</span>` : ''}
    </div>`;
  }).join('');
}

// ─── Render Settings Page ────────────────────────────────────
export function renderSettingsPage() {
  const settings = loadSettings();
  const container = document.getElementById('settings-page');

  container.innerHTML = `
    <div class="page-header">
      <h1>⚙️ Settings</h1>
      <p class="page-subtitle">Configure your API keys, lead magnet links, and publishing preferences</p>
    </div>

    <div class="settings-grid">
      <!-- API Keys -->
      <div class="settings-card">
        <div class="settings-card-header">
          <span class="settings-icon">🔑</span>
          <h2>API Keys</h2>
        </div>
        <div class="settings-card-body">
          <div class="form-group">
            <label for="gemini-key">🔍 Gemini API Key <span style="font-size:0.7rem;color:var(--neuro-teal);">(Research — Google Search Grounding)</span></label>
            <div class="input-with-toggle">
              <input type="password" id="gemini-key" class="form-input" 
                     value="${settings.geminiApiKey}" 
                     placeholder="AIza..." />
              <button class="btn-icon toggle-visibility" data-target="gemini-key" title="Show/Hide">
                <span class="eye-icon">👁️</span>
              </button>
            </div>
            <span class="form-hint">Searches live Google for fresh articles every week. Get yours at aistudio.google.com</span>
          </div>

          <div class="form-group">
            <label for="claude-key">✍️ Claude API Key <span style="font-size:0.7rem;color:var(--purple);">(Writing — Craig's Voice)</span></label>
            <div class="input-with-toggle">
              <input type="password" id="claude-key" class="form-input" 
                     value="${settings.claudeApiKey}" 
                     placeholder="sk-ant-..." />
              <button class="btn-icon toggle-visibility" data-target="claude-key" title="Show/Hide">
                <span class="eye-icon">👁️</span>
              </button>
            </div>
            <span class="form-hint">Writes all posts and video scripts in Craig's voice. Get yours at console.anthropic.com</span>
          </div>

          <div class="form-group">
            <label for="heygen-key">🎬 HeyGen API Key <span style="font-size:0.7rem;color:var(--gold);">(Video Production — AI Avatar)</span></label>
            <div class="input-with-toggle">
              <input type="password" id="heygen-key" class="form-input" 
                     value="${settings.heygenApiKey}" 
                     placeholder="Enter HeyGen API key..." />
              <button class="btn-icon toggle-visibility" data-target="heygen-key" title="Show/Hide">
                <span class="eye-icon">👁️</span>
              </button>
            </div>
            <span class="form-hint">For automated video generation with your AI avatar. Get yours at app.heygen.com/settings</span>
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.75rem;">
            <div class="form-group">
              <label for="heygen-avatar">HeyGen Avatar ID</label>
              <input type="text" id="heygen-avatar" class="form-input"
                     value="${settings.heygenAvatarId}" placeholder="e.g. josh_lite3_20230714" />
              <span class="form-hint">Your avatar's ID from HeyGen dashboard</span>
            </div>
            <div class="form-group">
              <label for="heygen-voice">HeyGen Voice ID</label>
              <input type="text" id="heygen-voice" class="form-input"
                     value="${settings.heygenVoiceId}" placeholder="e.g. 1bd001e7e50f421d891986aed6e1" />
              <span class="form-hint">Your voice clone or selected voice ID</span>
            </div>
          </div>

          <div class="form-group">
            <label for="manus-key">🎨 Manus API Key <span style="font-size:0.7rem;color:var(--purple);">(Slide Deck Generation)</span></label>
            <div class="input-with-toggle">
              <input type="password" id="manus-key" class="form-input"
                     value="${settings.manusApiKey}"
                     placeholder="Enter Manus API key..." />
              <button class="btn-icon toggle-visibility" data-target="manus-key" title="Show/Hide">
                <span class="eye-icon">👁️</span>
              </button>
            </div>
            <span class="form-hint">Auto-generates slide decks from video script briefs. Get yours at manus.im/settings</span>
          </div>

          <div class="form-group">
            <label for="canva-token">🖼️ Canva API Token <span style="font-size:0.7rem;color:var(--blue);">(Post Image Autofill)</span></label>
            <div class="input-with-toggle">
              <input type="password" id="canva-token" class="form-input"
                     value="${settings.canvaApiToken}"
                     placeholder="Enter Canva API token..." />
              <button class="btn-icon toggle-visibility" data-target="canva-token" title="Show/Hide">
                <span class="eye-icon">👁️</span>
              </button>
            </div>
            <span class="form-hint">Auto-fills brand templates with post content. Set up at canva.dev</span>
          </div>
          <div class="form-group">
            <label for="canva-template">Canva Post Template ID</label>
            <input type="text" id="canva-template" class="form-input"
                   value="${settings.canvaPostTemplateId}" placeholder="DAGx..." />
            <span class="form-hint">ID of your Canva brand template for post images (found in Canva template URL)</span>
          </div>
        </div>
      </div>

      <!-- Lead Magnet Links (from Motorcycle_Racer_Funnel_Complete_Reference.md) -->
      <div class="settings-card">
        <div class="settings-card-header">
          <span class="settings-icon">🎯</span>
          <h2>Lead Magnet URLs (5 ScoreApp Assessments)</h2>
        </div>
        <div class="settings-card-body">
          <div class="form-group">
            <label for="review-url">LM1: Rider Race Weekend Review (PRIMARY)</label>
            <input type="text" id="review-url" class="form-input"
                   value="${settings.reviewUrl}"
                   placeholder="improve-rider.scoreapp.com" />
            <span class="form-hint">✅ CONFIRMED — Trigger: REVIEW — DM delivery only — 3-4x/week</span>
          </div>
          <div class="form-group">
            <label for="season-review-url">LM2: End of Season Review</label>
            <input type="text" id="season-review-url" class="form-input"
                   value="${settings.seasonReviewUrl}"
                   placeholder="riderseason.scoreapp.com" />
            <span class="form-hint">✅ CONFIRMED — Trigger: SEASON — Public link — Off-season (Oct-Feb)</span>
          </div>
          <div class="form-group">
            <label for="flow-profile-url">LM3: Rider Flow Profile</label>
            <input type="text" id="flow-profile-url" class="form-input"
                   value="${settings.flowProfileUrl}"
                   placeholder="https://flow-profile-url.com" />
            <span class="form-hint">⏳ URL NEEDED — Trigger: FLOW — Public link — 1x/week</span>
          </div>
          <div class="form-group">
            <label for="mindset-quiz-url">LM4: Rider Mindset Quiz</label>
            <input type="text" id="mindset-quiz-url" class="form-input"
                   value="${settings.mindsetQuizUrl}"
                   placeholder="https://mindset-quiz-url.com" />
            <span class="form-hint">⏳ URL NEEDED — Trigger: MINDSET — Public link — 1x/week</span>
          </div>
          <div class="form-group">
            <label for="sleep-test-url">LM5: Rider Sleep Test</label>
            <input type="text" id="sleep-test-url" class="form-input"
                   value="${settings.sleepTestUrl || ''}"
                   placeholder="https://sleep-test-url.com" />
            <span class="form-hint">⏳ URL NEEDED — Trigger: SLEEP — Public link — 1-2x/month (pattern interrupt)</span>
          </div>
          <div class="form-group">
            <label for="blueprint-url">Podium Contenders Blueprint (Free Training)</label>
            <input type="text" id="blueprint-url" class="form-input"
                   value="${settings.blueprintUrl}"
                   placeholder="https://academy.caminocoaching.co.uk/podium-contenders-blueprint/order/" />
            <span class="form-hint">✅ CONFIRMED — Trigger: BLUEPRINT — Direct link — 3x/year training windows (Jan, May, Sep)</span>
          </div>
        </div>
      </div>

      <!-- GHL Integration -->
      <div class="settings-card">
        <div class="settings-card-header">
          <span class="settings-icon">📡</span>
          <h2>GHL Integration</h2>
        </div>
        <div class="settings-card-body">
          <div class="form-group">
            <label for="ghl-token">🔑 GHL Private Integration Token <span style="font-size:0.7rem;color:var(--green);">(API v2 — Bearer Auth)</span></label>
            <div class="input-with-toggle">
              <input type="password" id="ghl-token" class="form-input"
                     value="${settings.ghlToken}"
                     placeholder="Enter your GHL Private Integration token..." />
              <button class="btn-icon toggle-visibility" data-target="ghl-token" title="Show/Hide">
                <span class="eye-icon">👁️</span>
              </button>
            </div>
            <span class="form-hint">Required for direct email dispatch. Agency Settings → Private Integrations → ensure conversations/message.write + contacts.write scopes</span>
          </div>

          <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.75rem;">
            <div class="form-group">
              <label for="ghl-location">Location ID</label>
              <input type="text" id="ghl-location" class="form-input"
                     value="${settings.ghlLocationId}"
                     placeholder="e.g. vdgR8teGuIgHPMPzbQkK" />
              <span class="form-hint">Sub-account ID for contact upsert</span>
            </div>
            <div class="form-group">
              <label for="ghl-email-from">Verified Sender Email</label>
              <input type="email" id="ghl-email-from" class="form-input"
                     value="${settings.ghlEmailFrom}"
                     placeholder="e.g. craig@caminocoaching.co.uk" />
              <span class="form-hint">Must be from your LC Email dedicated domain</span>
            </div>
          </div>

          <div class="form-group">
            <label for="publish-method">Publishing Method</label>
            <div class="radio-group">
              <label class="radio-option ${settings.publishMethod === 'csv' ? 'active' : ''}">
                <input type="radio" name="publish-method" value="csv" 
                       ${settings.publishMethod === 'csv' ? 'checked' : ''} />
                <span class="radio-label">
                  <span class="radio-title">📄 CSV Export</span>
                  <span class="radio-desc">Download CSV for manual upload to GHL Social Planner</span>
                </span>
              </label>
              <label class="radio-option ${settings.publishMethod === 'ghl-api' ? 'active' : ''}">
                <input type="radio" name="publish-method" value="ghl-api"
                       ${settings.publishMethod === 'ghl-api' ? 'checked' : ''} />
                <span class="radio-label">
                  <span class="radio-title">🚀 GHL API Direct</span>
                  <span class="radio-desc">Schedule directly via GHL API (requires token above)</span>
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>

      <!-- Facebook/Instagram Groups -->
      <div class="settings-card full-width">
        <div class="settings-card-header">
          <span class="settings-icon">📱</span>
          <h2>Facebook & Instagram Audience Groups</h2>
          <button class="btn-sm btn-accent" id="add-group-btn">+ Add Group</button>
        </div>
        <div class="settings-card-body">
          <div id="groups-list" class="groups-list">
            ${settings.facebookGroups.map((group, i) => `
              <div class="group-item" data-index="${i}">
                <label class="toggle-switch">
                  <input type="checkbox" ${group.enabled ? 'checked' : ''} class="group-toggle" data-index="${i}" />
                  <span class="toggle-slider"></span>
                </label>
                <input type="text" class="form-input group-name" value="${group.name}" 
                       placeholder="Group name" data-index="${i}" />
                <input type="text" class="form-input group-url" value="${group.url}" 
                       placeholder="Group URL" data-index="${i}" />
                <button class="btn-icon btn-danger remove-group" data-index="${i}" title="Remove">✕</button>
              </div>
            `).join('')}
          </div>
          <p class="form-hint">Target Facebook groups for cross-posting</p>
        </div>
      </div>

      <!-- Brand -->
      <div class="settings-card">
        <div class="settings-card-header">
          <span class="settings-icon">🎨</span>
          <h2>Brand Settings</h2>
        </div>
        <div class="settings-card-body">
          <div class="form-group">
            <label for="brand-name">Brand Name</label>
            <input type="text" id="brand-name" class="form-input"
                   value="${settings.brandName}" placeholder="Your brand name" />
          </div>
          <div class="form-group">
            <label for="post-length">Default Post Length</label>
            <select id="post-length" class="form-select">
              <option value="short" ${settings.postLength === 'short' ? 'selected' : ''}>Short (100-200 words)</option>
              <option value="medium" ${settings.postLength === 'medium' ? 'selected' : ''}>Medium (200-350 words)</option>
              <option value="long" ${settings.postLength === 'long' ? 'selected' : ''}>Long (350-500 words)</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <div class="settings-actions">
      <button class="btn btn-primary btn-lg" id="save-settings-btn">
        <span class="btn-icon-left">💾</span> Save Settings
      </button>
      <span class="save-status" id="save-status"></span>
    </div>

    <!-- Data Management -->
    <div class="settings-card full-width" style="margin-top:1.5rem;border-color:rgba(218,165,32,0.15);">
      <div class="settings-card-header">
        <span class="settings-icon">🗑️</span>
        <h2>Data Management</h2>
      </div>
      <div class="settings-card-body">
        <div style="display:flex;gap:1rem;flex-wrap:wrap;align-items:flex-start;">
          <div style="flex:1;min-width:240px;">
            <button class="btn btn-lg" id="clear-session-btn" style="background:rgba(218,165,32,0.12);color:var(--gold,#DAA520);border:1px solid rgba(218,165,32,0.3);width:100%;font-weight:700;">
              🔄 Clear Current Session
            </button>
            <p class="form-hint" style="margin-top:0.4rem;">Clears this week's stories, posts, and generated content. API keys and settings are kept.</p>
          </div>
          <div style="flex:1;min-width:240px;">
            <button class="btn btn-lg" id="clear-dedup-btn" style="background:rgba(139,92,246,0.12);color:#8B5CF6;border:1px solid rgba(139,92,246,0.3);width:100%;font-weight:700;">
              📰 Clear Article History
            </button>
            <p class="form-hint" style="margin-top:0.4rem;">Resets the deduplication memory so previously used articles can appear again.</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Error Log -->
    <div class="settings-card full-width" style="margin-top:1.5rem;border-color:rgba(239,68,68,0.15);">
      <div class="settings-card-header">
        <span class="settings-icon">📝</span>
        <h2>Error Log <span id="error-log-count" style="font-size:0.75rem;padding:0.15rem 0.45rem;border-radius:10px;background:rgba(239,68,68,0.15);color:#ef4444;font-weight:700;margin-left:0.4rem;">${getErrorLog().length}</span></h2>
        <button class="btn-sm btn-accent" id="clear-error-log-btn" style="margin-left:auto;">Clear Log</button>
      </div>
      <div class="settings-card-body">
        <div id="error-log-entries" style="max-height:300px;overflow-y:auto;background:rgba(0,0,0,0.4);border-radius:8px;border:1px solid rgba(255,255,255,0.06);padding:0.5rem;font-family:'SF Mono',Monaco,Consolas,monospace;font-size:0.72rem;line-height:1.5;">
          ${renderErrorLogEntries()}
        </div>
        <p class="form-hint" style="margin-top:0.4rem;">Captures API errors, JS errors, and unhandled promise rejections. Max ${MAX_LOG_ENTRIES} entries. Oldest entries are removed automatically.</p>
      </div>
    </div>
  `;

  attachSettingsListeners(settings);
}

// ─── Attach Settings Event Listeners ─────────────────────────
function attachSettingsListeners(settings) {
  document.getElementById('save-settings-btn')?.addEventListener('click', () => {
    const updated = gatherSettingsFromForm();
    if (saveSettings(updated)) {
      const status = document.getElementById('save-status');
      status.textContent = '✅ Settings saved!';
      status.classList.add('visible');
      setTimeout(() => status.classList.remove('visible'), 2000);
      showToast('Settings saved successfully', 'success');
    }
  });

  document.querySelectorAll('.toggle-visibility').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.dataset.target;
      const input = document.getElementById(targetId);
      if (input) {
        input.type = input.type === 'password' ? 'text' : 'password';
        btn.querySelector('.eye-icon').textContent = input.type === 'password' ? '👁️' : '🙈';
      }
    });
  });

  document.querySelectorAll('.radio-option input[type="radio"]').forEach(radio => {
    radio.addEventListener('change', () => {
      document.querySelectorAll('.radio-option').forEach(opt => opt.classList.remove('active'));
      radio.closest('.radio-option').classList.add('active');
    });
  });

  document.getElementById('add-group-btn')?.addEventListener('click', () => {
    const list = document.getElementById('groups-list');
    const index = list.children.length;
    const html = `
      <div class="group-item" data-index="${index}">
        <label class="toggle-switch">
          <input type="checkbox" checked class="group-toggle" data-index="${index}" />
          <span class="toggle-slider"></span>
        </label>
        <input type="text" class="form-input group-name" value="" 
               placeholder="Group name" data-index="${index}" />
        <input type="text" class="form-input group-url" value="" 
               placeholder="Group URL" data-index="${index}" />
        <button class="btn-icon btn-danger remove-group" data-index="${index}" title="Remove">✕</button>
      </div>
    `;
    list.insertAdjacentHTML('beforeend', html);

    list.lastElementChild.querySelector('.remove-group').addEventListener('click', (e) => {
      e.target.closest('.group-item').remove();
    });
  });

  document.querySelectorAll('.remove-group').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.closest('.group-item').remove();
    });
  });

  // ─── Data Management Buttons ──────────────────────────────
  document.getElementById('clear-session-btn')?.addEventListener('click', () => {
    if (confirm('Clear current session?\n\nThis will remove this week\'s stories, posts, and generated content (email, video scripts, Shorts).\n\nYour API keys and settings will be kept.')) {
      try {
        localStorage.removeItem('driverSocialMedia_session');
        showToast('Session cleared! Refresh the page to start fresh.', 'success');
        setTimeout(() => window.location.reload(), 1000);
      } catch (e) {
        showToast('Error clearing session: ' + e.message, 'error');
      }
    }
  });

  document.getElementById('clear-dedup-btn')?.addEventListener('click', () => {
    const articleCount = JSON.parse(localStorage.getItem('driver-social-media-used-articles') || '[]').length;
    const hookCount = JSON.parse(localStorage.getItem('driver-social-media-used-hooks') || '[]').length;
    if (articleCount === 0 && hookCount === 0) {
      showToast('Article history is already empty — nothing to clear.', 'info');
      return;
    }
    if (confirm(`Clear article history?\n\n${articleCount} used articles and ${hookCount} used hooks will be removed.\nPreviously blocked articles will appear in future searches again.`)) {
      try {
        localStorage.removeItem('driver-social-media-used-articles');
        localStorage.removeItem('driver-social-media-used-hooks');
        showToast(`Cleared ${articleCount} articles + ${hookCount} hooks. Fresh articles will appear in your next search.`, 'success');
      } catch (e) {
        showToast('Error clearing article history: ' + e.message, 'error');
      }
    }
  });

  // ─── Error Log Button ──────────────────────────────────────
  document.getElementById('clear-error-log-btn')?.addEventListener('click', () => {
    clearErrorLog();
    const logContainer = document.getElementById('error-log-entries');
    if (logContainer) logContainer.innerHTML = renderErrorLogEntries();
    const badge = document.getElementById('error-log-count');
    if (badge) badge.textContent = '0';
    showToast('Error log cleared.', 'success');
  });
}

// ─── Gather Settings From Form ───────────────────────────────
function gatherSettingsFromForm() {
  const groups = [];
  document.querySelectorAll('.group-item').forEach(item => {
    groups.push({
      name: item.querySelector('.group-name')?.value || '',
      url: item.querySelector('.group-url')?.value || '',
      enabled: item.querySelector('.group-toggle')?.checked || false
    });
  });

  return {
    geminiApiKey: (document.getElementById('gemini-key')?.value || '').trim(),
    claudeApiKey: (document.getElementById('claude-key')?.value || '').trim(),
    heygenApiKey: (document.getElementById('heygen-key')?.value || '').trim(),
    heygenAvatarId: (document.getElementById('heygen-avatar')?.value || '').trim(),
    heygenVoiceId: (document.getElementById('heygen-voice')?.value || '').trim(),
    manusApiKey: (document.getElementById('manus-key')?.value || '').trim(),
    canvaApiToken: (document.getElementById('canva-token')?.value || '').trim(),
    canvaPostTemplateId: (document.getElementById('canva-template')?.value || '').trim(),
    ghlToken: (document.getElementById('ghl-token')?.value || '').trim(),
    ghlLocationId: (document.getElementById('ghl-location')?.value || '').trim(),
    ghlEmailFrom: (document.getElementById('ghl-email-from')?.value || '').trim(),
    publishMethod: document.querySelector('input[name="publish-method"]:checked')?.value || 'csv',
    facebookGroups: groups,
    brandName: document.getElementById('brand-name')?.value || 'Camino Coaching',
    postLength: document.getElementById('post-length')?.value || 'medium',
    reviewUrl: document.getElementById('review-url')?.value || '',
    seasonReviewUrl: document.getElementById('season-review-url')?.value || '',
    flowProfileUrl: document.getElementById('flow-profile-url')?.value || '',
    mindsetQuizUrl: document.getElementById('mindset-quiz-url')?.value || '',
    sleepTestUrl: document.getElementById('sleep-test-url')?.value || '',
    blueprintUrl: document.getElementById('blueprint-url')?.value || ''
  };
}

// ─── Toast Helper ────────────────────────────────────────────
function showToast(message, type = 'info') {
  const event = new CustomEvent('show-toast', { detail: { message, type } });
  document.dispatchEvent(event);
}
