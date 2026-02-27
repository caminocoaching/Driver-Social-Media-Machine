// ═══════════════════════════════════════════════════════════════
// 🏁 DRIVER SOCIAL MEDIA ENGINE — Content Engine
// For Craig Muirhead / Camino Coaching
// EXCLUSIVELY for race car drivers — NEVER motorcycle references
// ═══════════════════════════════════════════════════════════════

// ─── 7 Content Pillars ─────────────────────────────────────────
export const PILLARS = [
  {
    id: 'visual-targeting',
    name: 'Visual Targeting',
    icon: '👁️',
    color: '#ff6b6b',
    description: 'Where drivers look on track determines where they go — target fixation, vision scanning, eye movement under pressure',
    topics: [
      'Target fixation under pressure in qualifying',
      'Vision scanning techniques on corner entry',
      'How eye movement patterns change with fatigue during stints',
      'Looking through the apex vs fixating on the kerb',
      'The link between visual focus and car placement at 150mph'
    ]
  },
  {
    id: 'braking-zone',
    name: 'Braking Zone',
    icon: '🛑',
    color: '#ffa94d',
    description: 'Braking technique, confidence, trail braking, and the mental game of commitment — braking markers, threshold vs trail',
    topics: [
      'Trail braking vs threshold braking — the mental shift',
      'Why braking later doesn\'t always mean faster lap times',
      'Brake release technique and corner rotation',
      'Building braking confidence progressively at a new circuit',
      'How cortisol makes you brake 5 metres too early in qualifying'
    ]
  },
  {
    id: 'competitor-obsession',
    name: 'Competitor Obsession',
    icon: '🏆',
    color: '#ffd43b',
    description: 'Focusing too much on rivals, teammates, data comparison — identity threat from others\' success',
    topics: [
      'Why watching your teammate\'s data is costing you tenths',
      'Racing your own race vs reacting to the car behind',
      'Social media comparison trap in the paddock',
      'When competitor analysis becomes destructive obsession',
      'The driver who stopped checking the timing screen and found 3 tenths'
    ]
  },
  {
    id: 'overthinking',
    name: 'Overthinking',
    icon: '🧠',
    color: '#69db7c',
    description: 'Analysis paralysis, the Drunken Monkey, prefrontal override — too many coaching inputs, data overload',
    topics: [
      'Too many coaching inputs between sessions',
      'When data analysis becomes overthinking that kills feel',
      'Simplifying your focus to one thing per stint',
      'The paradox of trying too hard in qualifying',
      'How overthinking activates the Drunken Monkey and blocks flow'
    ]
  },
  {
    id: 'lap-time-plateau',
    name: 'Lap Time Plateau',
    icon: '📊',
    color: '#4dabf7',
    description: 'Stuck at the same lap times despite more seat time, coaching, and data — fixed mindset, Error Positivity gaps',
    topics: [
      'Why more seat time isn\'t always the answer to finding pace',
      'The 80/20 of finding lap time — it\'s not where you think',
      'Mental blocks that create physical lap time plateaus',
      'Diminishing returns from technical coaching alone',
      'Breaking through when effort isn\'t the problem — it\'s neural patterns'
    ]
  },
  {
    id: 'change-mode',
    name: 'Change Mode',
    icon: '🔄',
    color: '#9775fa',
    description: 'Adapting to wet weather, new cars, setup changes, different circuits — threat perception in unfamiliar conditions',
    topics: [
      'Wet weather panic — why confidence disappears in the rain',
      'Adapting to a new car or stepping up to a faster series',
      'When setup changes require mental adjustment, not just mechanical',
      'First session at a new circuit — how to build speed safely',
      'Managing the mental transition between qualifying mode and race mode'
    ]
  },
  {
    id: 'expectation-pressure',
    name: 'Expectation Pressure',
    icon: '💪',
    color: '#f783ac',
    description: 'Sponsor pressure, family investment, championship points pressure, identity threat — amygdala hijack under stakes',
    topics: [
      'Sponsor pressure and how it triggers performance anxiety',
      'When team expectations create amygdala hijack on the out-lap',
      'Self-imposed pressure vs external pressure — both are trainable',
      'Managing family expectations when they\'ve invested £200k in your season',
      'Championship pressure collapse — why drivers fold when points matter'
    ]
  }
];

// ─── 5 Frameworks (3S + 2F) — Alex Hormozi Style ──────────────
export const FRAMEWORKS = [
  {
    id: 'scary',
    name: 'Scary',
    icon: '😱',
    prefix: 'S',
    color: '#ff4444',
    description: 'Fear-based hook — consequence, risk, or hidden danger most drivers ignore',
    hookStyle: 'Start with a fear-inducing consequence or hidden cost. Make them feel the urgency of not addressing this.',
    example: 'The thing that\'s costing you 2 seconds a lap isn\'t your car setup. It\'s what your brain does in the 30 seconds after you make a mistake.'
  },
  {
    id: 'strange',
    name: 'Strange',
    icon: '🤔',
    prefix: 'S',
    color: '#ffa500',
    description: 'Counterintuitive or surprising — challenges conventional paddock wisdom',
    hookStyle: 'Open with something that contradicts what every driver "knows" is true. Create cognitive dissonance.',
    example: 'The fastest drivers I work with actually think LESS on track than everyone else. Here\'s why that matters...'
  },
  {
    id: 'sexy',
    name: 'Sexy',
    icon: '✨',
    prefix: 'S',
    color: '#ff69b4',
    description: 'Aspirational — paint the picture of the transformed driver they could become',
    hookStyle: 'Paint a vivid picture of the ideal result or transformation. Make them FEEL what it\'s like to perform at their peak.',
    example: 'Imagine walking to the car for qualifying, completely calm. No knot in your stomach. Just focus. That\'s not fantasy — it\'s a trainable state.'
  },
  {
    id: 'free-value',
    name: 'Free Value',
    icon: '🎁',
    prefix: 'F',
    color: '#00cc88',
    description: 'Actionable tip, technique, or protocol they can use in their next session',
    hookStyle: 'Lead with a practical tip, technique, or protocol they can use immediately. Give away a specific framework.',
    example: 'Here\'s the exact protocol I use with F4 drivers before qualifying. Takes 7 minutes. Changes everything.'
  },
  {
    id: 'familiar',
    name: 'Familiar',
    icon: '🤝',
    prefix: 'F',
    color: '#4488ff',
    description: 'Relatable story — "that\'s me" moment every driver recognises',
    hookStyle: 'Start with a situation every driver has experienced. Make them think "that\'s exactly what happens to me".',
    example: 'You know that feeling when you come out of Turn 1 on Lap 1 and you\'ve already lost three positions? Let me tell you what\'s happening...'
  }
];

// ─── 5 Lead Magnet CTAs with URLs ────────────────────────────
export const CTAS = [
  {
    id: 'review',
    name: 'Driver Race Weekend Review',
    shortName: 'Race Review',
    url: 'improve-driver.scoreapp.com',
    season: 'REVIEW',
    primary: true,
    keyword: 'REVIEW',
    frequency: '3-4x per week (workhorse CTA)',
    when: 'Race weekend posts, post-race content, any performance topic',
    measures: 'Pre-session routine, sleep, food/hydration, visualisation, preparation, car/track connection, FP speed, relaxation, plateaus, overthinking, inner voice, championship pressure',
    ctaTemplate: '\n\nOh by the way, after every race weekend I send a free Race Weekend Review to drivers who want to know exactly where they left performance on the table. 3-minute assessment that scores your preparation, focus, and mental approach across every session.\n\nComment the word "REVIEW" and I\'ll send you the link.'
  },
  {
    id: 'season',
    name: 'End of Season Review',
    shortName: 'Season Review',
    url: 'driverseason.scoreapp.com',
    season: 'SEASON',
    primary: false,
    keyword: 'SEASON',
    frequency: '1x/week off-season, occasionally during season',
    when: 'Off-season (Oct-Feb), season reflection posts, goal-setting posts',
    measures: 'Overall, Season Goals, Mindset, FP, Qualifying, Race, Funding, Warm Up & Preparation',
    ctaTemplate: '\n\nBefore I go, completely unrelated. I\'ve built a free End of Season Review that scores your entire season across 8 performance pillars. Most drivers score below 60%. Takes 3 minutes. Instant report.\n\nComment the word "SEASON" and I\'ll send you the link.'
  },
  {
    id: 'flow',
    name: 'Driver Flow Profile',
    shortName: 'Flow Profile',
    url: '',
    season: 'FLOW',
    primary: false,
    keyword: 'FLOW',
    frequency: '1x/week',
    when: 'Flow state content, "in the zone" posts, neuroscience posts',
    measures: 'Flow recognition, confidence, fun while driving, zone access, nerves/anxiety',
    ctaTemplate: '\n\nI meant to say, ever wondered if you actually experience flow on track, or just think you do? Free Driver Flow Profile maps how often you access the zone, what triggers it, and what blocks it. 2 minutes. Might surprise you.\n\nComment the word "FLOW" and I\'ll send you the link.'
  },
  {
    id: 'mindset',
    name: 'Driver Mindset Quiz',
    shortName: 'Mindset Quiz',
    url: '',
    season: 'MINDSET',
    primary: false,
    keyword: 'MINDSET',
    frequency: '1x/week',
    when: 'Mental toughness posts, resilience content, competitor comparison posts',
    measures: '12 scenario-based reactions (missing podium by 0.001s, teammate beating you, crash, pushed wide Lap 1). Most score below 40%.',
    ctaTemplate: '\n\nOh by the way, I built a free Driver Mindset Quiz with 12 real racing scenarios. You miss the podium by 0.001s. Your teammate beats you with your old setup. You\'re pushed wide at Turn 1. How do you respond? Most drivers score below 40%. Takes 2 minutes.\n\nComment the word "MINDSET" and I\'ll send you the link.'
  },
  {
    id: 'sleep',
    name: 'Driver Sleep Test',
    shortName: 'Sleep Test',
    url: '',
    season: 'SLEEP',
    primary: false,
    keyword: 'SLEEP',
    frequency: '1-2x/month',
    when: 'Sleep/recovery posts, race weekend prep, HRV/biofeedback content',
    measures: 'Sleep quality, recovery markers, race weekend sleep patterns',
    ctaTemplate: '\n\nBefore I go, I built a free Driver Sleep Test after finding that over 80% of the drivers I work with can\'t wake up without an alarm. Your reaction time is 30-50ms slower. You\'re missing visual cues. And you\'re taking that brain onto track. 2 minutes. Might change how you prepare for race weekends.\n\nComment the word "SLEEP" and I\'ll send you the link.'
  }
];

// ─── 5 Authority Lines (Craig Muirhead specific, rotating) ────
export const AUTHORITY_LINES = [
  'Pattern recognition across 1,644+ PBs, 1,286+ podiums, and 1,063+ wins has shown me this pattern over and over again.',
  'After 10 seasons embedded in elite motorsport paddocks, from F1 to F4, GT racing to touring cars, I see this in 90% of drivers I work with.',
  'Working with 118+ drivers across 142 circuits, the data on this is very clear.',
  'I have sat beside drivers across F4, GB3, GT3, and Carrera Cup. The pattern is always the same.',
  '80+ five-star reviews on Trustpilot and 4.9 out of 5. Most of them mention this exact breakthrough.'
];

// ─── Racing Legends (for reference in posts) ─────────────────
export const RACING_LEGENDS = [
  { name: 'Ayrton Senna', useFor: 'Flow state access, Monaco \'88 qualifying — "I was no longer driving consciously"', concept: 'Transient hypofrontality / Wizard Mind' },
  { name: 'Niki Lauda', useFor: 'Resilience, growth mindset — returned 42 days after Nürburgring crash 1976', concept: 'Growth mindset under catastrophic failure' },
  { name: 'Max Verstappen', useFor: 'Pressure management, 2021 championship battle — "Stress is very bad for you"', concept: 'Reframing pressure, process focus' },
  { name: 'Michael Schumacher', useFor: 'Preparation, process focus, Seven-Minute Protocol mindset', concept: 'Structured mental preparation' },
  { name: 'Lewis Hamilton', useFor: 'Consistency, mental fortitude over long career', concept: 'Sustained performance, adaptability' },
  { name: 'Fernando Alonso', useFor: 'Longevity, strategic thinking', concept: 'Adaptability, growth mindset in older age' }
];

// ─── Neuroscience Mechanisms ──────────────────────────────────
export const MECHANISMS = [
  { name: 'Fixed vs Growth Mindset', ref: 'Carol Dweck, Stanford 2006', description: 'Two fundamental beliefs create measurably different neural responses to challenge and failure' },
  { name: 'Error Positivity (Pe)', ref: 'EEG studies', description: 'Growth mindset drivers show larger Error Positivity signals — more attention to learning from mistakes' },
  { name: 'Amygdala Hijack', ref: 'Daniel Goleman', description: 'Under pressure, the amygdala overrides the prefrontal cortex — rational thinking goes offline' },
  { name: 'Transient Hypofrontality', ref: 'Arne Dietrich 2003', description: 'Flow state = temporary down-regulation of prefrontal cortex (inner critic goes offline)' },
  { name: 'Cortisol Flooding', ref: 'Stress physiology', description: 'Pre-qualifying nerves release cortisol → earlier braking, tighter grip, conservative lines' },
  { name: 'The Goldilocks Zone', ref: 'Csikszentmihalyi', description: 'Peak performance occurs when challenge matches skill — too much = anxiety, too little = boredom' }
];

// ─── Lexicon (Drunken Monkey / Wizard Mind) ──────────────────
export const LEXICON = {
  'Drunken Monkey': 'The conscious, prefrontal cortex — slow, anxious, overthinking',
  'Wizard Mind': 'The subconscious brain — fast, instinctive, capable of complex tasks at speed',
  'Flow State / The Zone': 'Optimal performance state where overthinking disappears',
  'Amygdala Hijack': 'When the threat center overrides rational decision-making',
  'Transient Hypofrontality': 'Temporary down-regulation of the inner critic during flow',
  'Error Positivity': 'Brain signal measuring attention allocated to learning from mistakes',
  'The Curiosity Protocol': 'Say "That\'s interesting" after every mistake — redirects brain from threat to learning',
  'Seven-Minute Protocol': 'Pre-session mental preparation framework',
  'Goldilocks Zone': 'Optimal arousal level — challenge matches skill',
  'Believable Stretch': 'Goal hard enough to demand 100% focus but realistic enough to avoid panic',
  'Protective Mode': 'When brain prioritises safety over performance'
};

// ─── 5-Day Campaign Arc ──────────────────────────────────────
export const CAMPAIGN_ARC = [
  { day: 'Monday', purpose: 'Describe the Problem', emotion: 'Recognition: "That\'s me"', wordCount: '150-250' },
  { day: 'Tuesday', purpose: 'Agitate the Pain', emotion: 'Frustration: "This is costing me"', wordCount: '200-300' },
  { day: 'Wednesday', purpose: 'Explain the Neuroscience', emotion: 'Understanding: "Now I get it"', wordCount: '250-350' },
  { day: 'Thursday', purpose: 'Future-Pace the Solution', emotion: 'Hope: "This could work"', wordCount: '200-300' },
  { day: 'Friday', purpose: 'Release Free Training', emotion: 'Action: "I want this"', wordCount: '3 variations' }
];

// ─── Problem → Mechanism Reference ───────────────────────────
export const PROBLEM_MECHANISM_MAP = [
  { problem: 'Practice vs. Race Gap', mechanism: 'Fixed mindset activation under pressure', secondary: 'Amygdala hijack' },
  { problem: 'Qualifying Nerves', mechanism: 'Amygdala hijack, cortisol flooding', secondary: 'Identity threat' },
  { problem: 'First-Lap Disasters', mechanism: 'Threat response override', secondary: 'Tunnel vision' },
  { problem: 'Wet Weather Panic', mechanism: 'Heightened threat perception', secondary: 'Skill lock-up' },
  { problem: 'Post-Mistake Spiral', mechanism: 'Low Error Positivity signals', secondary: 'Fixed mindset response' },
  { problem: 'Inconsistent Pace', mechanism: 'Flow state blocked by overthinking', secondary: 'Prefrontal override' },
  { problem: 'Championship Pressure', mechanism: 'Identity-threat response', secondary: 'Cortisol flooding' }
];

// ─── F1 2026 Calendar (for race week detection) ──────────────
export const F1_2026 = [
  { round: 1, name: 'Australian GP', circuit: 'Albert Park', date: '2026-03-15', country: 'Australia' },
  { round: 2, name: 'Chinese GP', circuit: 'Shanghai International', date: '2026-03-29', country: 'China' },
  { round: 3, name: 'Japanese GP', circuit: 'Suzuka', date: '2026-04-05', country: 'Japan' },
  { round: 4, name: 'Bahrain GP', circuit: 'Sakhir', date: '2026-04-19', country: 'Bahrain' },
  { round: 5, name: 'Saudi Arabian GP', circuit: 'Jeddah Corniche', date: '2026-05-03', country: 'Saudi Arabia' },
  { round: 6, name: 'Miami GP', circuit: 'Miami International', date: '2026-05-17', country: 'USA' },
  { round: 7, name: 'Emilia Romagna GP', circuit: 'Imola', date: '2026-05-31', country: 'Italy' },
  { round: 8, name: 'Monaco GP', circuit: 'Circuit de Monaco', date: '2026-06-07', country: 'Monaco' },
  { round: 9, name: 'Spanish GP', circuit: 'Barcelona-Catalunya', date: '2026-06-21', country: 'Spain' },
  { round: 10, name: 'Canadian GP', circuit: 'Circuit Gilles Villeneuve', date: '2026-07-05', country: 'Canada' },
  { round: 11, name: 'Austrian GP', circuit: 'Red Bull Ring', date: '2026-07-12', country: 'Austria' },
  { round: 12, name: 'British GP', circuit: 'Silverstone', date: '2026-07-19', country: 'UK' },
  { round: 13, name: 'Belgian GP', circuit: 'Spa-Francorchamps', date: '2026-07-26', country: 'Belgium' },
  { round: 14, name: 'Hungarian GP', circuit: 'Hungaroring', date: '2026-08-02', country: 'Hungary' },
  { round: 15, name: 'Dutch GP', circuit: 'Zandvoort', date: '2026-08-30', country: 'Netherlands' },
  { round: 16, name: 'Italian GP', circuit: 'Monza', date: '2026-09-06', country: 'Italy' },
  { round: 17, name: 'Azerbaijan GP', circuit: 'Baku City Circuit', date: '2026-09-20', country: 'Azerbaijan' },
  { round: 18, name: 'Singapore GP', circuit: 'Marina Bay', date: '2026-10-04', country: 'Singapore' },
  { round: 19, name: 'US GP', circuit: 'Circuit of the Americas', date: '2026-10-18', country: 'USA' },
  { round: 20, name: 'Mexico GP', circuit: 'Hermanos Rodríguez', date: '2026-10-25', country: 'Mexico' },
  { round: 21, name: 'Brazilian GP', circuit: 'Interlagos', date: '2026-11-08', country: 'Brazil' },
  { round: 22, name: 'Las Vegas GP', circuit: 'Las Vegas Strip', date: '2026-11-22', country: 'USA' },
  { round: 23, name: 'Qatar GP', circuit: 'Lusail', date: '2026-11-29', country: 'Qatar' },
  { round: 24, name: 'Abu Dhabi GP', circuit: 'Yas Marina', date: '2026-12-06', country: 'UAE' }
];

// ─── Seasonal CTA Logic ───────────────────────────────────────
// FLOW, MINDSET, SLEEP — always active year-round
// REVIEW — added when racing season starts (Mar–Nov)
export function getActiveCTAs(date = new Date()) {
  const month = date.getMonth(); // 0-indexed

  // Dec(11), Jan(0), Feb(1): FLOW, MINDSET, SLEEP only (off-season)
  if (month === 11 || month === 0 || month === 1) {
    return CTAS.filter(c => ['FLOW', 'MINDSET', 'SLEEP'].includes(c.season));
  }
  // Mar(2) - Nov(10): FLOW, MINDSET, SLEEP + REVIEW (race season)
  return CTAS.filter(c => ['FLOW', 'MINDSET', 'SLEEP', 'REVIEW'].includes(c.season));
}

// ─── Rotating CTA (no repetition within cycle) ────────────────
let ctaRotationIndex = 0;
export function getRotatingCTA(date = new Date()) {
  const active = getActiveCTAs(date);
  // Primary (REVIEW) should appear more often: 3-4x per week
  // Build weighted list: REVIEW x3, others x1
  const weighted = [];
  active.forEach(cta => {
    weighted.push(cta);
    if (cta.primary) { weighted.push(cta); weighted.push(cta); }
  });
  const cta = weighted[ctaRotationIndex % weighted.length];
  ctaRotationIndex++;
  return cta;
}

export function resetCTARotation() {
  ctaRotationIndex = 0;
}

// ─── Rotating Authority Line (no repetition) ──────────────────
let authorityRotationIndex = 0;
export function getRotatingAuthority() {
  const line = AUTHORITY_LINES[authorityRotationIndex % AUTHORITY_LINES.length];
  authorityRotationIndex++;
  return line;
}

export function resetAuthorityRotation() {
  authorityRotationIndex = 0;
}

// ─── Race Week Detection (F1 calendar) ───────────────────────
export function isRaceWeek(date = new Date()) {
  return getRaceWeekContext(date) !== null;
}

export function getRaceWeekContext(date = new Date()) {
  const checkDate = new Date(date);

  for (const race of F1_2026) {
    const raceDate = new Date(race.date);
    const raceDay = raceDate.getDay();
    const monday = new Date(raceDate);
    monday.setDate(raceDate.getDate() - (raceDay === 0 ? 6 : raceDay - 1));
    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);
    sunday.setHours(23, 59, 59);

    if (checkDate >= monday && checkDate <= sunday) {
      return {
        round: race.round,
        name: race.name,
        circuit: race.circuit,
        country: race.country,
        raceDate: race.date,
        isRaceDay: checkDate.toISOString().slice(0, 10) === race.date
      };
    }
  }
  return null;
}

// ─── Weekly Helpers ───────────────────────────────────────────
export function getWeeklyPillars() {
  const shuffled = [...PILLARS];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function getWeeklyFrameworks() {
  const base = [...FRAMEWORKS];
  const extras = [
    FRAMEWORKS[Math.floor(Math.random() * FRAMEWORKS.length)],
    FRAMEWORKS[Math.floor(Math.random() * FRAMEWORKS.length)]
  ];
  const all = [...base, ...extras];
  for (let i = all.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [all[i], all[j]] = [all[j], all[i]];
  }
  return all.slice(0, 7);
}

export function getRandomPillar(exclude = []) {
  const available = PILLARS.filter(p => !exclude.includes(p.id));
  if (available.length === 0) return PILLARS[Math.floor(Math.random() * PILLARS.length)];
  return available[Math.floor(Math.random() * available.length)];
}

export function getRandomFramework(exclude = []) {
  const available = FRAMEWORKS.filter(f => !exclude.includes(f.id));
  if (available.length === 0) return FRAMEWORKS[Math.floor(Math.random() * FRAMEWORKS.length)];
  return available[Math.floor(Math.random() * available.length)];
}

// ─── Banned / Safe Phrases ───────────────────────────────────
export const SAFE_PHRASES = [
  'Drop a "[WORD]" below',
  'Comment [WORD] if you want this',
  'If this sounds familiar, comment [WORD]',
  'Type [WORD] and I\'ll send it over',
  'Does this resonate? Let me know below'
];

export const BANNED_PHRASES = [
  'Like if you agree',
  'Share with someone who needs this',
  'Tag a friend',
  'Click the link below',
  'Link in bio',
  'Double tap if you relate'
];
