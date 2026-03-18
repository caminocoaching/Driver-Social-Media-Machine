// ═══════════════════════════════════════════════════════════════
// 🏁 DRIVER SOCIAL MEDIA ENGINE — Content Engine
// For Craig Muirhead / Camino Coaching
// EXCLUSIVELY for race car drivers — NEVER motorcycle references
// ═══════════════════════════════════════════════════════════════

// ─── 7 Content Pillars (4 Problem-Aware + 3 Positive/Aspirational) ──
// v2: Every week must use at least one from each group. No more than 2 negative-emotion posts.
export const PILLARS = [
  // ─── PROBLEM-AWARE PILLARS ───
  {
    id: 'visual-targeting',
    name: 'Visual Targeting',
    icon: '👁️',
    color: '#ff6b6b',
    group: 'problem',
    description: 'Where drivers look on track determines where they go. Eye position, target fixation, peripheral processing, the 200-300ms delay when eyes are too close.',
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
    group: 'problem',
    description: 'The mental game of commitment in the braking zone. Trail braking confidence, the cortisol response that makes drivers brake early under pressure, the gap between practice braking and qualifying braking.',
    topics: [
      'Trail braking vs threshold braking — the mental shift',
      'Why braking later doesn\'t always mean faster lap times',
      'Brake release technique and corner rotation',
      'Building braking confidence progressively at a new circuit',
      'How cortisol makes you brake 5 metres too early in qualifying'
    ]
  },
  {
    id: 'overthinking',
    name: 'Overthinking (The Drunken Monkey)',
    icon: '🧠',
    color: '#69db7c',
    group: 'problem',
    description: 'Analysis paralysis, prefrontal override, the conscious mind running at 110 bits trying to control what the subconscious handles at 4 billion bits. The inner critic voice that sabotages sessions.',
    topics: [
      'Too many coaching inputs between sessions',
      'When data analysis becomes overthinking that kills feel',
      'Simplifying your focus to one thing per stint',
      'The paradox of trying too hard in qualifying',
      'How overthinking activates the Drunken Monkey and blocks flow'
    ]
  },
  {
    id: 'expectation-pressure',
    name: 'Expectation Pressure',
    icon: '💪',
    color: '#f783ac',
    group: 'problem',
    description: 'Sponsor pressure, family investment, championship points pressure, team expectations, the weight of external expectations creating amygdala hijack.',
    topics: [
      'Sponsor pressure and how it triggers performance anxiety',
      'When team expectations create amygdala hijack on the out-lap',
      'Self-imposed pressure vs external pressure — both are trainable',
      'Managing family expectations when they\'ve invested £200k in your season',
      'Championship pressure collapse — why drivers fold when points matter'
    ]
  },
  // ─── POSITIVE / ASPIRATIONAL PILLARS ───
  {
    id: 'personal-best-triggers',
    name: 'Personal Best Triggers',
    icon: '🎯',
    color: '#4dabf7',
    group: 'positive',
    description: 'What the debrief data shows about drivers who break through plateaus. The confidence multiplier. The preparation patterns that predict PBs. Framed as "what works" rather than "what is broken."',
    topics: [
      'The preparation patterns behind 808 documented personal bests',
      'Why drivers who debrief consistently achieve PB rates above 50%',
      'The confidence multiplier — what the data shows about drivers who believe they belong',
      'Breaking through plateaus: the single variable that changes everything',
      'What separates a one-off fast lap from sustained improvement'
    ]
  },
  {
    id: 'race-craft',
    name: 'Race Craft & Intelligence',
    icon: '🏆',
    color: '#ffd43b',
    group: 'positive',
    description: 'Race starts, overtaking decisions, tyre management, reading a race situation, knowing when to attack and when to consolidate, competitor awareness used constructively.',
    topics: [
      'Race starts — the neurochemistry of the first 3 corners',
      'Overtaking decisions: when to attack and when to consolidate',
      'Tyre management as a mental discipline, not just a technical one',
      'Reading a race situation 5 laps ahead',
      'The winner effect — why momentum in a championship is neurochemical'
    ]
  },
  {
    id: 'flow-state-confidence',
    name: 'Flow State & Confidence',
    icon: '✨',
    color: '#9775fa',
    group: 'positive',
    description: 'What flow feels like, how to trigger it, what the data shows when a driver is in flow versus out of it. Time dilation, automatic execution, the zone.',
    topics: [
      'What flow state actually feels like at 150mph',
      'The flow state cocktail — dopamine, norepinephrine, and what happens when they align',
      'Time dilation on track — when a 90-second lap feels like 30 seconds',
      'Why the second flying lap is often worse than the first',
      'The zone is not luck — it is a trainable neurochemical state'
    ]
  }
];

// ─── 7 Frameworks (3S + 2F + 2K) — Hormozi + Kern ────────────
// v3: Added South Park Rule and Expectation Violation from Frank Kern's Content Pipeline
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
  },
  // ─── KERN PIPELINE FRAMEWORKS ───
  {
    id: 'south-park-rule',
    name: 'South Park Rule',
    icon: '🎭',
    prefix: 'K',
    color: '#E91E8C',
    description: 'BUT/THEREFORE tension engineering — replaces linear "and then" with conflict and consequence. Creates narrative tension that keeps the reader engaged through the entire post to resolve the dissonance.',
    hookStyle: 'Start with a compelling statistic or statement. Follow with "BUT" to introduce conflict/contradiction. Then "THEREFORE" to deliver the consequence. The reader stays to resolve the tension.',
    example: '81% of racing drivers now use data analysis tools. But it just means 81% of racing drivers are overthinking their next session. Therefore, the question is not whether you are using data. It is whether the data is making you faster or slower.'
  },
  {
    id: 'expectation-violation',
    name: 'Expectation Violation',
    icon: '⚡',
    prefix: 'K',
    color: '#9B59B6',
    description: 'Purposefully subvert audience expectations. Instead of generic paddock wisdom, challenge the driver\'s existing beliefs with a provocative truth that creates immediate curiosity. The goal is to make the reader stop and wonder.',
    hookStyle: 'Lead with a headline that directly contradicts what the driver believes is true. Create cognitive dissonance by challenging the accepted approach. The headline should make them think "wait, that cannot be right" — then explain why it IS right.',
    example: 'YOUR PRE-SESSION ROUTINE IS MAKING YOU SLOWER. Every driver I talk to has one. 73% of them are doing the exact opposite of what the neuroscience says. The routine is not the problem. The timing is.'
  }
];

// ─── Frank Kern Content Pipeline Stages ───────────────────────
// Reference: The 4-stage pipeline that orchestrates the entire content creation process.
// Mapped to existing SMM features for the Pipeline Dashboard.
export const PIPELINE_STAGES = [
  {
    id: 'strategic-planning',
    name: 'Strategic Planning',
    icon: '🎯',
    color: '#FF6B35',
    kernConcept: 'Chief Revenue Officer',
    smmFeature: 'Content Pillars + Championship Calendar + Research Pipeline',
    description: 'Analyse where content impact is highest. Pick the week\'s topics based on championship calendar, neurochemistry rotation, and audience gaps.',
    tools: ['Gemini Search', 'Content Pillars', 'Championship Calendar'],
    action: 'Find Stories'
  },
  {
    id: 'ai-copywriting',
    name: 'AI Copywriting',
    icon: '✍️',
    color: '#8B5CF6',
    kernConcept: 'Project Shepherd',
    smmFeature: 'Claude Post Generation with Voice Training',
    description: 'Generate posts using voice-trained AI. Every post follows the 5-step architecture (Hook → Problem → Neuroscience → Bridge → CTA) with PAS structure.',
    tools: ['Claude Sonnet', 'Voice Training', '5-Step Formula'],
    action: 'Write All 7'
  },
  {
    id: 'visual-generation',
    name: 'Visual Generation',
    icon: '🎨',
    color: '#00BFA5',
    kernConcept: 'Two-Step Image Process',
    smmFeature: 'Cinematic Image Prompts + Manus Slide Decks',
    description: 'Build cinematic, scroll-stopping visuals. Step 1: AI reads the post and generates a detailed image prompt. Step 2: Generate the visual with strict brand requirements.',
    tools: ['Gemini Image', 'Manus Slides', 'Canva Templates'],
    action: 'Build Visuals'
  },
  {
    id: 'multi-platform-publish',
    name: 'Multi-Platform Publishing',
    icon: '🚀',
    color: '#2EA043',
    kernConcept: 'Review + Schedule + Distribute',
    smmFeature: 'Edit/Confirm → CSV Export → GHL Social Planner',
    description: 'Review each post across FB/IG. Edit in-place, confirm, then schedule across platforms. Track post IDs and engagement.',
    tools: ['GHL Planner', 'GHL Email', 'HeyGen Video', 'ManyChat'],
    action: 'Publish'
  }
];

// ─── Cinematic Image Prompt Specs (Kern Two-Step Process) ──────
// Step 1: buildImagePrompt() reads the post and outputs a detailed image prompt + headline text
// Step 2: generateImage() receives the prompt and creates the visual
export const CINEMATIC_IMAGE_SPECS = {
  style: 'cinematic movie poster',
  aspectRatio: '4:5',
  camera: '85mm portrait lens, shallow depth of field',
  composition: 'Movie poster composition. Mid-chest up. Subject stares DIRECTLY at the camera.',
  lighting: 'Rich, natural dramatic sunlight, film grain, high-end editorial photography',
  textOverlay: {
    position: 'UPPER THIRD of the image, ABOVE the subject\'s head',
    font: 'Thick bold sans-serif font (like Impact or Bebas Neue)',
    style: 'Large, bold, UPPERCASE',
    colors: ['stark white with subtle drop shadow', 'bold navy blue', 'deep red'],
    hierarchy: 'The text is the FIRST thing the viewer should see. Large enough to read even if the image is small.',
    maxWords: 7
  },
  prohibited: [
    'robots', 'cyborgs', 'circuit boards', 'futuristic neon', 'AI branding',
    'sci-fi cliches', 'stock photos', 'abstract designs', 'generic backgrounds',
    'corporate office settings', 'cartoon illustrations'
  ],
  subjects: [
    { type: 'racing-driver', description: 'Racing driver in fireproof suit or team gear, helmet nearby or in hand, pit lane or paddock background' },
    { type: 'pit-lane', description: 'Atmospheric pit lane shot, blurred racing cars in background, dramatic lighting' },
    { type: 'cockpit', description: 'Driver\'s perspective from cockpit, steering wheel visible, visor reflections' },
    { type: 'data-screen', description: 'Telemetry data on screens with driver silhouette, dramatic racing tech atmosphere' },
    { type: 'authority-portrait', description: 'Confident coaching figure in smart-casual attire, motorsport environment backdrop' }
  ]
};

// ─── Build Cinematic Image Prompt from Post Content ───────────
// Kern Step 1: Reads the post text and generates a structured image prompt
export function buildCinematicImagePrompt(postContent, pillar, hookText = '') {
  const specs = CINEMATIC_IMAGE_SPECS;
  const subjectPool = specs.subjects;
  const subject = subjectPool[Math.floor(Math.random() * subjectPool.length)];

  // Extract first line as potential text overlay if no hookText provided
  const textForOverlay = hookText || (postContent ? postContent.split('\n')[0].replace(/["']/g, '').substring(0, 50).toUpperCase() : 'STOP OVERTHINKING');

  // Select text colour based on pillar
  const textColour = pillar?.color ? specs.textOverlay.colors[0] : specs.textOverlay.colors[Math.floor(Math.random() * specs.textOverlay.colors.length)];

  return {
    imagePrompt: `${specs.style} portrait, shot from mid-chest up on an ${specs.camera}. ${subject.description}. ${specs.composition} ${specs.lighting}. The image MUST include text overlay in the ${specs.textOverlay.position}: "${textForOverlay}" in a ${specs.textOverlay.font}, ${specs.textOverlay.style}, using ${textColour}. ${specs.textOverlay.hierarchy} NEVER include: ${specs.prohibited.join(', ')}.`,
    headlineText: textForOverlay,
    aspectRatio: specs.aspectRatio,
    subjectType: subject.type,
    textColour: textColour
  };
}

// ─── 5 CTA Templates — Lead Magnets + Free Training ──────────
// 4 Lead Magnets (LM2-LM5) + 1 Direct Blueprint CTA
// LM1 (Race Weekend Review) excluded — not used as a CTA
// Each LM feeds into Podium Contenders Blueprint → Strategy Call → Programme
export const CTAS = [
  {
    id: 'cta-b',
    name: 'LM2: End of Season Review',
    shortName: 'Season Review',
    leadMagnet: 'LM2',
    frequency: '1x/week off-season (Oct-Feb), occasionally mid-season after bad run',
    primary: false,
    triggerWord: 'SEASON',
    deliveryMethod: 'Public link in post — drivers click directly.',
    url: 'riderseason.scoreapp.com',
    whenToUse: 'Off-season (Oct-Feb), season reflection posts, goal-setting content, "what would you change about this season" hooks, occasionally mid-season after tough run',
    whatDriverGets: '3-minute assessment scoring entire season across 8 pillars: Overall Satisfaction, Season Goals, Mindset, Practice Performance, Qualifying Performance, Race Performance, Funding & Sponsorship, Preparation. Most drivers score below 60%.',
    ctaTemplate: '\n\n·· Completely unrelated - I\'ve built a free End of Season Review that scores your entire season across 8 performance pillars. Most drivers score below 60%. Takes 3 minutes. Instant report. --> riderseason.scoreapp.com'
  },
  {
    id: 'cta-c',
    name: 'LM3: Driver Flow Profile',
    shortName: 'Flow Profile',
    leadMagnet: 'LM3',
    frequency: '1x/week',
    primary: false,
    triggerWord: 'FLOW',
    deliveryMethod: 'ManyChat — driver comments FLOW, receives DM with link.',
    whenToUse: 'Flow state content, neuroscience posts (transient hypofrontality, dopamine), "ever had a session where everything felt effortless" hooks, gap between good and great sessions, automatic execution vs conscious driving',
    whatDriverGets: '2-3 minute assessment measuring: Flow Recognition, Confidence Baseline, Fun & Enjoyment, Zone Access Frequency, Nerves & Anxiety Levels. Personalised Flow Profile showing flow strengths and blockers.',
    ctaTemplate: '\n\n·· PS - Ever wondered if you actually experience flow on track, or just think you do? Free Driver Flow Profile maps how often you access the zone, what triggers it, and what blocks it. 2 minutes. Might surprise you. Comment "FLOW" and I\'ll send you the link.'
  },
  {
    id: 'cta-d',
    name: 'LM4: Driver Mindset Quiz',
    shortName: 'Mindset Quiz',
    leadMagnet: 'LM4',
    frequency: '1x/week',
    primary: false,
    triggerWord: 'MINDSET',
    deliveryMethod: 'ManyChat — driver comments MINDSET, receives DM with link.',
    whenToUse: 'Mental toughness posts, competitor comparison posts, reaction to setbacks (incidents, bad results), "how would you react if" engagement, gap between intention and execution under pressure',
    whatDriverGets: '3-minute quiz with 12 real racing scenarios. Scores: Below 40% = Mental Performance Gap, 40-60% = Podium Potential, 60-80% = Contender Mindset, 80%+ = Champion Mindset. Most drivers score below 40%.',
    ctaTemplate: '\n\n·· Oh, by the way - I built a free Driver Mindset Quiz with 12 real racing scenarios. You miss the podium by 0.001s. Your teammate beats you in identical conditions. You spin at your best corner. How you react reveals everything. Most drivers score below 40%. Takes 3 minutes. Comment "MINDSET" for the link.'
  },
  {
    id: 'cta-e',
    name: 'LM5: Driver Sleep Test',
    shortName: 'Sleep Test',
    leadMagnet: 'LM5',
    frequency: '1-2x per month — sparingly, pattern interrupt effect',
    primary: false,
    triggerWord: 'SLEEP',
    deliveryMethod: 'ManyChat — driver comments SLEEP, receives DM with link.',
    whenToUse: 'Sleep and recovery posts, race weekend preparation, HRV/biofeedback content, wearable tech posts (Whoop, Oura Ring, Garmin), "the thing nobody talks about" pattern interrupts, why drivers feel slower Sunday vs Saturday',
    whatDriverGets: '60-second assessment measuring: sleep duration race weekends vs normal, sleep quality/interruptions, caffeine timing, screen time before bed, wake-up routine/cognitive readiness, Saturday night recovery before Sunday.',
    ctaTemplate: '\n\n·· Completely unrelated - I built a 60-second sleep test for racing drivers. Checks whether your sleep habits are helping or hurting your reaction times, concentration, and consistency. Most drivers have no idea. Free. Instant results. Comment "SLEEP" and I\'ll send you the link.'
  },
  {
    id: 'cta-f',
    name: 'Podium Contenders Blueprint (Direct)',
    shortName: 'Blueprint',
    leadMagnet: null,
    frequency: 'During training windows (3x/year: Jan, May, Sep). Between windows, shows waitlist.',
    primary: true,
    triggerWord: 'BLUEPRINT',
    deliveryMethod: 'Direct link to training landing page.',
    url: 'https://academy.caminocoaching.co.uk/podium-contenders-blueprint/order/',
    whenToUse: 'During training windows (3x/year), skip lead magnet and go straight to training. Also used when driver has already completed a lead magnet.',
    whatDriverGets: '3-day free advanced training. Day 1: 7 biggest mental mistakes costing lap times. Day 2: 5-pillar system for accessing flow state on command. Day 3: Race weekend mental preparation protocol.',
    ctaTemplate: '\n\n·· Side note - three times a year I release a free training called the Podium Contenders Blueprint for drivers who know they\'re leaving speed on the table. 3 days. Shows you the 7 biggest mental mistakes, the exact warm-up routine that stops pre-race nerves, and how to access flow state on demand. The next window just opened. --> academy.caminocoaching.co.uk/podium-contenders-blueprint/order/'
  }
];

// ─── 7 Neurochemicals (v2) ────────────────────────────────────
// Every video should connect the topic to specific brain chemicals.
export const NEUROCHEMICALS = [
  {
    id: 'cortisol',
    name: 'Cortisol',
    label: 'The Stress Chemical',
    icon: '🔴',
    color: '#ff4444',
    whatItDoes: 'Released when the brain perceives threat. Narrows focus, increases heart rate, triggers fight-or-flight.',
    onTrack: 'Causes early braking, tense inputs, tunnel vision, reactive driving instead of flowing driving. The driver feels wired, tight, unable to relax into the corner.',
    whenToReference: 'Expectation pressure, qualifying anxiety, race start panic, comeback after a crash, braking zone fear.'
  },
  {
    id: 'dopamine',
    name: 'Dopamine',
    label: 'The Reward and Focus Chemical',
    icon: '🟡',
    color: '#ffd43b',
    whatItDoes: 'Released during anticipation of reward and during flow state. Drives motivation, focus, pattern recognition, risk assessment.',
    onTrack: 'The chemical behind the "locked in" feeling. When dopamine is flowing, the driver feels sharp, confident, reading the track ahead. When it drops, motivation dips and the driver goes through the motions.',
    whenToReference: 'Flow state content, personal best triggers, the feeling after a great lap, why the second flying lap is often worse (dopamine spike on lap 1 triggers conscious analysis on lap 2).'
  },
  {
    id: 'serotonin',
    name: 'Serotonin',
    label: 'The Confidence and Status Chemical',
    icon: '🔵',
    color: '#4dabf7',
    whatItDoes: 'Regulates mood, confidence, and sense of wellbeing. Linked to social status and self-belief.',
    onTrack: 'The chemical behind sustained confidence across a race weekend. Drivers with healthy serotonin levels feel they belong at the front. Low serotonin manifests as imposter syndrome, self-doubt, and the feeling of not deserving the position.',
    whenToReference: 'Confidence protocols, the gap between practice confidence and race confidence, why some drivers feel like they belong at the front and others do not.'
  },
  {
    id: 'norepinephrine',
    name: 'Norepinephrine',
    label: 'The Alertness Chemical',
    icon: '⚡',
    color: '#ffa94d',
    whatItDoes: 'Sharpens attention, increases arousal, enhances sensory processing. Works with dopamine in flow state.',
    onTrack: 'The chemical that makes reaction times faster and sensory input clearer. The feeling that you can see everything, process every detail, react before you consciously decide to.',
    whenToReference: 'Flow state content, reaction time discussions, the difference between alert focus and anxious hypervigilance.'
  },
  {
    id: 'oxytocin',
    name: 'Oxytocin',
    label: 'The Trust and Connection Chemical',
    icon: '💙',
    color: '#20c997',
    whatItDoes: 'Released during social bonding, trust, and feeling supported. Reduces cortisol.',
    onTrack: 'The driver who trusts their team, trusts their preparation, and feels supported performs differently from the driver who feels isolated and under scrutiny. Oxytocin in the paddock comes from genuine team connection, parental support done right, and coach-driver trust.',
    whenToReference: 'Team dynamics, parent-driver relationships, why some paddock environments produce champions and others produce burnout.'
  },
  {
    id: 'testosterone',
    name: 'Testosterone',
    label: 'The Competitive Drive Chemical',
    icon: '🟠',
    color: '#ff6b6b',
    whatItDoes: 'Drives competitive behaviour, risk tolerance, and dominance. Increases before competition (winner effect) and decreases after repeated losses (loser effect).',
    onTrack: 'The chemical behind the driver who goes wheel to wheel and wins the battle versus the driver who backs off. The "winner effect" means previous wins chemically prime the brain for future aggression. The "loser effect" means a string of bad results literally reduces the chemical drive to compete.',
    whenToReference: 'Race craft, overtaking confidence, the winner effect, why momentum in a championship is real and neurochemical not just psychological, comeback after a bad run.'
  },
  {
    id: 'endorphins',
    name: 'Endorphins',
    label: 'The Pain and Pressure Buffer',
    icon: '💚',
    color: '#69db7c',
    whatItDoes: 'The body\'s natural painkiller. Released during intense physical effort, stress, and excitement. Creates the "high" feeling.',
    onTrack: 'Acts as a buffer against physical discomfort (G-forces, heat, fatigue) and emotional pain (frustration after a mistake). Drivers with strong endorphin response can push through physical limits and bounce back from setbacks faster.',
    whenToReference: 'Physical endurance in long races, recovery from incidents, the ability to push through discomfort, why some drivers thrive under pressure and others crumble.'
  }
];

// ─── Two-Layer Data System ────────────────────────────────────
// Layer 1: Total career coaching outcomes (broad authority)
// Layer 2: Verified In The Zone debrief dataset (specific, data-backed)
export const DATA_LAYERS = {
  layer1: {
    label: 'Career Coaching Totals',
    useFor: 'Broad authority statements, hooks, credibility openers',
    stats: {
      pbs: '808',
      podiums: '438',
      wins: '159',
      drivers: '89',
      circuits: '107',
      seasons: '10',
      months: '60',
      trustpilot: '4.9/5 (85 reviews, 100% five-star)'
    }
  },
  layer2: {
    label: 'Verified In The Zone Debrief Dataset',
    useFor: 'Specific data-backed insights, correlations, named athlete results, WOW not HOW content',
    stats: {
      debriefs: '2,358',
      pbs: '808',
      podiums: '438',
      wins: '159',
      circuits: '107',
      months: '60',
      pbRate: '44.3%',
      podiumRate: '22.4%',
      avgFlowScore: '7.8/10'
    }
  }
};

// ─── Authority Lines (Layer 1 + Layer 2 rotating) ─────────────
export const AUTHORITY_LINES = [
  // Layer 1 — Career totals (broad authority)
  'Pattern recognition across 808 personal bests, 438 podiums, and 159 race wins has shown me this pattern over and over again.',
  'After 10 seasons embedded in elite motorsport paddocks, from F1 to F4, GT racing to touring cars, I see this in 90% of drivers I work with.',
  'Working with 89 drivers across 107 circuits, the data on this is very clear.',
  'I have sat beside drivers across F4, GB3, GT3, and Carrera Cup. The pattern is always the same.',
  '85 five-star reviews on Trustpilot, 4.9 out of 5, 100% five-star. Drivers from 12 countries have reviewed this programme. Most of them mention the same breakthrough.',
  // Layer 2 — Verified ITZ debrief data (specific, data-backed)
  'I have analysed 2,358 performance debriefs over 60 months. The pattern in the data is impossible to ignore.',
  '808 documented personal bests. All traceable back to specific mental preparation patterns in our debrief system.',
  'Across 2,358 debriefs and 107 circuits, we can see exactly what separates the drivers who improve from the ones who plateau.',
  '438 podiums and 159 race wins documented through our In The Zone system. Each one tracked back to what the driver was thinking and feeling before the session.',
  'No other motorsport performance coach has a dataset of this scale and depth. 60 months of continuous, verified data from real drivers in real races.'
];

// ─── Car Racing Case Studies ──────────────────────────────────
export const CASE_STUDIES = [
  // Named ITZ athletes (from debrief report — verified data)
  { name: 'Cormac Buchanan', series: 'WorldSSP / MotoGP pathway', debriefs: 30, avgFlow: 9.11, useFor: 'Elite flow state access, top-tier consistency, what peak performance data looks like', layer: 2 },
  { name: 'Becky Gleeson', series: 'Racing driver', debriefs: 58, pbs: 30, pbRate: '52%', useFor: 'Consistent PB rate over large sample, female driver representation, what sustained improvement looks like', layer: 2 },
  { name: 'Al Hoogie Racing', series: 'Racing team', debriefs: 27, wins: 19, podiumRate: '70%', useFor: 'Team-level results, high win rate, proof the system works at team scale', layer: 2 },
  { name: 'Calum Beach', series: 'Racing driver', debriefs: 26, podiumRate: '85%', useFor: 'Highest podium rate in the system, consistency under pressure, what a trained brain produces', layer: 2 },
  { name: 'Callum Lavery', series: 'GT/touring car', debriefs: null, flowImprovement: '36%', useFor: 'Flow score improvement, adapting between car types, endurance race mentality, measurable mental growth', layer: 2 },
  { name: 'Max Sheridan', series: 'Racing driver', debriefs: null, useFor: 'Most improved driver by flow score, what transformation looks like in the data', layer: 2 },
  // General case studies (Layer 1 — career knowledge)
  { name: 'Alex Connor', series: 'GB3 Championship', useFor: 'Single-seater pressure, young driver development, qualifying nerves', layer: 1 },
  { name: 'Robbie McAfee', series: 'F4 single-seater', useFor: 'Building confidence in junior formula, braking zone commitment', layer: 1 },
  { name: 'Bart Horsten', series: 'Formula racing', useFor: 'Lap time plateaus, data vs feel balance', layer: 1 },
  { name: 'Eric Wisniewski', series: 'US-based racing', useFor: 'International driver perspective, self-funded pressure', layer: 1 },
  { name: 'Kieran McConomy', series: 'Single-seater', useFor: 'Competitor obsession, identity under pressure', layer: 1 }
];

// ─── Driver Insight Data Points ──────────────────────────────
export const DRIVER_INSIGHTS = [
  // Layer 1 — Assessment data
  'Only 27% of drivers have a pre-session routine.',
  'Most drivers rate themselves "Slightly Satisfied" with performance.',
  'Over 60% of drivers plateau regularly despite more seat time.',
  'Most drivers score below 40% on the Mindset Quiz.',
  'Over 80% of drivers can\'t wake up without an alarm on race weekends.',
  'The average driver loses 0.3-0.5s per corner from visual targeting errors.',
  // Layer 2 — Verified ITZ debrief data
  '2,358 performance debriefs analysed across 60 months of continuous data.',
  '808 personal bests documented and traceable to specific mental preparation patterns.',
  'Drivers who debrief consistently achieve PB rates above 50%. Those who do not stay stuck.',
  'Becky Gleeson: 30 PBs across 58 sessions. That is a 52% PB rate, sustained over time.',
  'Calum Beach has an 85% podium rate across 26 documented sessions. That is not talent. That is a system.',
  'Cormac Buchanan averages a 9.11 flow score across 30 debriefs. Elite-level consistency.',
  'Al Hoogie Racing: 19 wins, 70% podium rate. Documented through the In The Zone system.',
  'The most improved driver in our system increased their flow score by 36%. It translated directly into results.',
  'No other motorsport performance coach has a dataset of this scale. 2,358 debriefs. 107 circuits. 60 months.'
];

// ─── Review Data (Trustpilot + Google) ────────────────────────
export const REVIEW_SOURCES = {
  trustpilot: {
    url: 'https://uk.trustpilot.com/review/caminocoaching.co.uk',
    totalReviews: 85,
    rating: 4.9,
    fiveStarPercent: 100,
    lastScanned: new Date().toISOString().split('T')[0]
  },
  google: {
    url: 'https://www.google.com/search?q=Camino+Coaching+reviews',
    lastScanned: null
  }
};

// ─── Review Goldmine (key reviews for AI content creation) ─────
export const REVIEW_GOLDMINE = [
  {
    reviewer: 'Angela B.',
    location: 'US',
    title: 'Getting your mind ready to compete is priceless',
    keyQuote: 'I felt new levels of both fierceness and joy on the track which I had never before experienced during the past 10 years of racing.',
    contentAngle: 'hook',
    hookDerivation: 'A racer with 10 years of experience just told me she felt something on track she had never felt before. Here is what changed.',
    pillar: 'all'
  },
  {
    reviewer: 'Jonathan Prince',
    location: 'NZ',
    title: 'High Performance Flow course is Phenomenal',
    keyQuote: 'Podiums in all four starts. One 1st overall, 2nd overall, two 1st in class, one 2nd in class, one 3rd in class. A huge step up from previous seasons.',
    contentAngle: 'case-study',
    hookDerivation: 'An amateur racer in New Zealand podiumed in all four starts last season. He had never done that before. Here is the single variable that changed.',
    pillar: 'client-case-studies'
  },
  {
    reviewer: 'Sami C.',
    location: 'US',
    title: 'This is the real deal',
    keyQuote: 'I was hesitant at first. You will need to face yourself and be honest about your thought process. Once you take action, you will find this training extremely valuable.',
    contentAngle: 'objection-handling',
    hookDerivation: 'Most drivers who come to me were sceptical before they started. The ones who took the step anyway are the ones setting personal bests now.',
    pillar: 'cta-reinforcement'
  },
  {
    reviewer: 'Harry Cook',
    location: 'GB',
    title: 'A game changer for me',
    keyQuote: 'Proper support, proper structure, and real results. Not scripted or forced. Craig genuinely cares about your progress. Whether that is sport, work, or life in general.',
    contentAngle: 'proof-point',
    hookDerivation: 'The most common thing drivers say after working with me is that it changed more than just their racing. Here is why that is not a coincidence.',
    pillar: 'all'
  },
  {
    reviewer: 'Bart Horsten',
    location: 'GB',
    title: 'A game changer',
    keyQuote: 'Helping me to perform at my best and enjoy my racing to the fullest.',
    contentAngle: 'case-study',
    hookDerivation: 'A formula driver told me he had forgotten how to enjoy racing. Here is what was actually happening inside his brain.',
    pillar: 'overthinking'
  },
  {
    reviewer: 'Sebastian Downie',
    location: 'AU',
    title: 'Winning is built not bought',
    keyQuote: 'My problem is away from the machine where I have to front up to the world. One of my personal revealings has been a fear of success. This coaching could have cut my learning time massively.',
    contentAngle: 'case-study',
    hookDerivation: 'A driver with 30 years of experience discovered his biggest limitation was not skill. It was a fear of what would happen if he actually won.',
    pillar: 'expectation-pressure'
  },
  {
    reviewer: 'Chloe Gleeson',
    location: 'GB',
    title: 'Camino Coaching is awesome!',
    keyQuote: 'I was able to apply the theory to my practical race experience which gave me a chance to understand how to control my nerves and mindset.',
    contentAngle: 'proof-point',
    hookDerivation: 'A young driver said the difference was being able to apply the theory practically. Not just understand it. Apply it. Under pressure. On race day.',
    pillar: 'braking-zone'
  },
  {
    reviewer: 'Consumer (anonymous)',
    location: 'GB',
    title: 'Excellent material',
    keyQuote: 'Lap times down and confidence up. I tend to look deep into subjects and think this is what is missing in motor racing for many to be really improving competitively.',
    contentAngle: 'proof-point',
    hookDerivation: 'A driver who looks deep into subjects said this is the thing missing in motorsport. The part nobody is training. And it is the part that makes you faster.',
    pillar: 'lap-time-plateau'
  },
  {
    reviewer: 'Wouter Alblas',
    location: 'NL',
    title: 'The better version of me',
    keyQuote: 'Focusing on growth mindset made my life more complete and successful. The moment we conquer our brain we become stronger, more resilient, happier.',
    contentAngle: 'proof-point',
    hookDerivation: 'A paddock regular said conquering his brain changed everything. Not more seat time. Not a faster car. Conquering the thing between his ears.',
    pillar: 'overthinking'
  },
  {
    reviewer: 'Grant',
    location: 'NZ',
    title: 'Team manager perspective',
    keyQuote: 'I personally noticed massive changes in both riders. The focus, understanding how to correct a bad day, being relaxed, following processes, personally taking responsibility.',
    contentAngle: 'proof-point',
    hookDerivation: 'A team manager said he noticed the change before his drivers even mentioned it. Other people in the paddock started commenting on how relaxed they looked.',
    pillar: 'all'
  }
];

// ─── Review Usage Rules ──────────────────────────────────────
export const REVIEW_USAGE_RULES = {
  approved: [
    'Voice-of-customer hooks: extract client language and scenarios for video script openers',
    'Proof points in WOW sections: reference common review themes without direct quotation',
    'Case study scripts: build full video narratives from detailed reviews (Jonathan Prince, Sebastian Downie, Angela B.)',
    'Objection handling in CTA framing: use Sami C. pattern for overcoming scepticism',
    'Authority data: "85 five-star reviews, 4.9/5 on Trustpilot" as rotating credibility stat'
  ],
  forbidden: [
    'NEVER copy-paste a full review into a post caption (looks like testimonial ad, algorithm penalty)',
    'NEVER tag or name a reviewer in content without explicit permission',
    'NEVER fabricate a quote or combine elements from different reviews into one fictional testimonial'
  ]
};

export const VISUAL_TYPES = [
  {
    id: 'talking-camera',
    tier: 1,
    name: 'AI Avatar (HeyGen)',
    icon: '🤖',
    color: '#ff6b6b',
    format: 'Video',
    description: 'AI avatar video of Craig talking to camera. Script → HeyGen → finished video.',
    equipment: 'HeyGen AI Clone — paste script, select avatar, render',
    background: 'Your HeyGen clone avatar with office/neutral background',
    guidance: 'Write the script as spoken word. Short sentences. Natural pauses. HeyGen renders your AI clone delivering it. Edit in Descript if needed (trim, add captions). This is your highest-trust, highest-conversion format.',
    frequency: '2x per week (backbone content)',
    tool: 'HeyGen',
    toolUrl: 'https://app.heygen.com',
    toolIcon: '🎭',
    workflow: '1. Copy script from post card → 2. Paste into HeyGen → 3. Select your AI clone avatar → 4. Render video → 5. (Optional) Edit in Descript for captions/trim → 6. Upload to Meta/GHL'
  },
  {
    id: 'slide-deck-avatar',
    tier: 2,
    name: 'Slide Deck + Talking Head (Manus + HeyGen)',
    icon: '📽️',
    color: '#f59f00',
    format: 'Video',
    description: 'Manus-generated slide deck as the main visual with HeyGen talking head in the corner. Presentation mode.',
    equipment: 'Manus AI (slide deck) + HeyGen (corner avatar overlay)',
    background: 'Professional slide deck — neuroscience diagrams, frameworks, data visualisations, step-by-step breakdowns',
    guidance: 'Best for neuroscience explainers, framework breakdowns, numbered lists, and data-heavy content. Manus creates the slide deck visuals. HeyGen renders your avatar delivering the script with slides behind. The slide deck adds visual authority and keeps viewers watching longer.',
    frequency: '1x per week',
    tool: 'Manus + HeyGen',
    toolUrl: 'https://manus.im/app/project/5ndQv7naHNFmzkfVtH4dfq',
    toolIcon: '📽️',
    workflow: '1. Copy script from post card → 2. Create slide deck in Manus (3-6 slides matching key points) → 3. Paste script into HeyGen → 4. Select avatar with slide deck background or composite in Descript → 5. Export → 6. Upload to Meta/GHL'
  },
  {
    id: 'broll-overlay',
    tier: 3,
    name: 'B-Roll + Voiceover (Descript)',
    icon: '🏎️',
    color: '#ffa94d',
    format: 'Video',
    description: 'Your voiceover recorded in Descript with real track/paddock footage layered behind.',
    equipment: 'Descript — record voiceover, drag in B-roll footage, auto-caption',
    background: 'Self-filmed pit lane, on-track, paddock, grid walk footage',
    guidance: 'Record voiceover directly in Descript reading the script. Layer B-roll footage from your library on top. Descript auto-generates captions. One race weekend of footage = 20+ posts.',
    frequency: '1x per week',
    tool: 'Descript',
    toolUrl: 'https://web.descript.com',
    toolIcon: '🎬',
    workflow: '1. Open Descript → 2. Record voiceover reading the script → 3. Drag B-roll clips from footage library → 4. Add auto-captions → 5. Export → 6. Upload to Meta/GHL'
  },
  {
    id: 'screen-telestrator',
    tier: 4,
    name: 'Screen Recording (Descript)',
    icon: '🖥️',
    color: '#4dabf7',
    format: 'Video',
    description: 'Screen recording of sim racing or onboard footage with pause-and-draw annotation.',
    equipment: 'Descript screen recorder + sim racing (Assetto Corsa, iRacing, rFactor) or subscriber onboards',
    background: 'Sim racing cockpit view or real onboard footage',
    guidance: 'Use Descript\'s screen recorder to capture sim racing footage. Pause and annotate braking points, eye lines, racing lines using Descript\'s drawing tools. Every corner on every circuit is new content. Positions you as the analyst.',
    frequency: '1x per week',
    tool: 'Descript',
    toolUrl: 'https://web.descript.com',
    toolIcon: '🎬',
    workflow: '1. Load sim racing / onboard footage → 2. Screen record in Descript → 3. Pause at key moments, annotate with drawings → 4. Add voiceover commentary → 5. Export → 6. Upload to Meta/GHL'
  },
  {
    id: 'data-visual',
    tier: 5,
    name: 'Client Data Visual',
    icon: '📊',
    color: '#69db7c',
    format: 'Static',
    description: 'Charts, before/after lap times, assessment scores, confidence-to-PB data.',
    equipment: 'Canva — use brand template, populate with In The Zone app data (anonymised)',
    background: 'Brand colours, clean design',
    guidance: 'Your competitive moat. 2,358 debrief sessions. Show the data. Before/after comparisons, correlation charts, stat highlights.',
    frequency: '1-2x per week (supporting)',
    tool: 'Canva',
    toolUrl: 'https://www.canva.com',
    toolIcon: '🎨',
    workflow: '1. Open Canva brand template → 2. Input stat/data from post card → 3. Export as image → 4. Upload to Meta/GHL'
  },
  {
    id: 'text-card',
    tier: 6,
    name: 'Branded Text Card',
    icon: '💬',
    color: '#9775fa',
    format: 'Static',
    description: 'Quote cards, stat highlights, Big Mistake headers. Clean branded typography.',
    equipment: 'Canva with locked brand template',
    background: 'Brand colours, Camino logo',
    guidance: 'Maximum 1-2 per week. Near-zero organic reach. Use for reinforcing brand identity only. No AI generation needed.',
    frequency: 'Max 1-2x per week',
    tool: 'Canva',
    toolUrl: 'https://www.canva.com',
    toolIcon: '🎨',
    workflow: '1. Open Canva brand template → 2. Type quote or stat → 3. Export as image → 4. Upload to Meta/GHL'
  }
];

// ─── Weekly Visual Schedule (Video-First) ─────────────────────
export const WEEKLY_VISUAL_SCHEDULE = {
  1: 'talking-camera',     // Monday: HeyGen AI avatar — pure talking head
  2: 'slide-deck-avatar',  // Tuesday: Manus slide deck + HeyGen talking head
  3: 'screen-telestrator', // Wednesday: Descript screen recording / telestrator
  4: 'broll-overlay',      // Thursday: Descript B-roll + voiceover
  5: 'talking-camera',     // Friday: HeyGen AI avatar — pure talking head
  6: 'data-visual',        // Saturday: Canva data visual (static)
  0: 'text-card'           // Sunday: Canva text card (static)
};

// ─── Visual Type Helpers ──────────────────────────────────────
export function getVisualTypeForDay(dayOfWeek) {
  const typeId = WEEKLY_VISUAL_SCHEDULE[dayOfWeek];
  return VISUAL_TYPES.find(v => v.id === typeId) || VISUAL_TYPES[0];
}

export function getVisualGuidance(visualType) {
  return {
    type: visualType.name,
    icon: visualType.icon,
    format: visualType.format,
    tier: visualType.tier,
    guidance: visualType.guidance,
    equipment: visualType.equipment,
    color: visualType.color,
    tool: visualType.tool || '',
    toolUrl: visualType.toolUrl || '',
    toolIcon: visualType.toolIcon || '',
    workflow: visualType.workflow || ''
  };
}

// ─── AI Image Prompts (Tier 3/4 concept illustration only) ────
// v3: Updated with Kern cinematic specs. Use buildCinematicImagePrompt() for per-post generation.
export const AI_IMAGE_PROMPTS = {
  'visual-targeting': 'Cinematic movie poster portrait. Racing driver in cockpit, eyes locked forward through visor with intense focus. Natural dramatic sunlight through windscreen, shallow depth of field, film grain. Eye-tracking data visualised as subtle teal HUD overlay. 85mm lens, mid-chest up. High-end editorial photography.',
  'braking-zone': 'Cinematic movie poster portrait. Racing driver\'s hands gripping steering wheel, knuckles white, brake marker board blurred in background. Warm amber and red tones, dramatic side lighting, shallow depth of field, film grain. 85mm lens, mid-chest up. High-end editorial photography.',
  'overthinking': 'Cinematic movie poster portrait. Racing driver sat in cockpit, helmet off, head slightly bowed, hand on brow. Cluttered data screens behind transitioning from chaotic red to calm teal. Film grain, shallow depth of field. 85mm lens. High-end editorial photography.',
  'expectation-pressure': 'Cinematic movie poster portrait. Racing driver walking through pit lane, team members and sponsors blurred behind. Weight-of-the-world body language, dramatic shadows. Red warning tones in background shifting to calm blue. 85mm lens, film grain.',
  'personal-best-triggers': 'Cinematic movie poster portrait. Racing driver punching the air on pit wall, team celebrating in background blur. Golden victory light, dopamine-rush energy. Confetti or champagne spray, shallow depth of field. 85mm lens, film grain.',
  'race-craft': 'Cinematic movie poster portrait. Racing driver in helmet making split-second overtaking decision, competitor\'s car reflected in visor. Amber and red competitive tones, dramatic side lighting. 85mm lens, film grain.',
  'flow-state-confidence': 'Cinematic movie poster portrait. Racing driver in zen-like calm before session, eyes closed, helmet resting beside them. Serene golden glow with deep teal neural pathway overlay. Pit lane sunrise atmosphere. 85mm lens, film grain.'
};

// ─── Data Card Templates (Tier 4) ────────────────────────────
export const DATA_CARD_TEMPLATES = [
  { stat: '81%', subtext: 'of drivers who set PBs used a pre-session routine', source: 'In The Zone App Data', color: '#4dabf7' },
  { stat: '27%', subtext: 'of drivers have ANY pre-session mental routine', source: 'Driver Assessment Data', color: '#ff6b6b' },
  { stat: '0.3-0.5s', subtext: 'lost per corner from visual targeting errors', source: 'Debrief Analysis', color: '#ffa94d' },
  { stat: '60%+', subtext: 'of drivers plateau despite more seat time', source: 'Season Review Data', color: '#9775fa' },
  { stat: '80%+', subtext: 'of drivers can\'t wake without an alarm on race weekends', source: 'Sleep Test Results', color: '#69db7c' },
  { stat: '2.7x', subtext: 'more PBs for drivers scoring 8.5+ on confidence', source: 'Confidence-PB Correlation', color: '#ffd43b' },
  { stat: '2,358', subtext: 'debrief sessions analysed across 89 drivers over 60 months', source: 'In The Zone App', color: '#f783ac' }
];

// ─── Text Quote Templates (Tier 5) ───────────────────────────
export const TEXT_QUOTE_TEMPLATES = [
  'You don\'t rise to the level of your talent in a race. You fall to the level of your mental preparation.',
  'The fastest drivers are not trying to go fast. They have learned to get out of their own way.',
  'Confidence is not a personality trait. It is a neurochemical state. And you can train it.',
  'Your qualifying lap should be faster than your race pace. If it is not, the problem isn\'t your car.',
  'The frustration loop is costing you podiums and you don\'t even know it is happening.',
  'You cannot out-drive a stressed nervous system. But you can reset it in under 60 seconds.'
];

// ─── Funnel Path (v2) ─────────────────────────────────────────
export const FUNNEL = {
  step1: 'Facebook/Instagram video post (value content with CTA)',
  step2: 'Comment "BLUEPRINT" (triggers ManyChat automation)',
  step3: 'ManyChat DM (delivers link to Driver Mindset Assessment on ScoreApp)',
  step4: 'Driver Mindset Assessment (ScoreApp, captures email, instant results)',
  step5: 'Podium Contenders Blueprint (free 3-day training, demonstrates the Camino Process)',
  step6: 'Strategy Call (43% close rate)',
  step7: 'Flow Performance Programme (GBP 4,000)'
};

// ─── CTA Schedule (v2: single BLUEPRINT keyword) ─────────────
// v2 uses BLUEPRINT for every post. No rotation needed.
export const CTA_ROTATION_SCHEDULE = {
  1: 'blueprint', 2: 'blueprint', 3: 'blueprint',
  4: 'blueprint', 5: 'blueprint', 6: 'blueprint', 0: 'blueprint'
};

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
  'Protective Mode': 'When brain prioritises safety over performance',
  // ─── Kern Pipeline Concepts ───
  'South Park Rule': 'BUT/THEREFORE structure — replace "and then" with conflict (BUT) and consequence (THEREFORE) to maintain narrative tension',
  'Expectation Violation': 'Purposefully subvert audience expectations with provocative truths that create curiosity and cognitive dissonance',
  'Significant Objects': 'Story-based value amplification — narrative increases perceived value of a concept exponentially',
  'Intent-Based Branding': 'Build a bond by providing value before selling. Pre-frame, indoctrinate with useful info, then convert.',
  'Demonstration Logic': 'Show value rather than teach "how-to" — attract buyers not students',
  'AI + HI Formula': 'AI finds the story, Human Intelligence bridges the gap between narrative and specific business lesson'
};

// ─── 5-Day Campaign Arc (PAS + South Park Rule) ──────────────
// v3: Added Kern narrative tension engineering to each day
export const CAMPAIGN_ARC = [
  { day: 'Monday', purpose: 'Describe the Problem', emotion: 'Recognition: "That\'s me"', wordCount: '150-250', tension: 'Open with a statistic or scenario the driver recognises. End with BUT — the hidden cost they have not calculated.' },
  { day: 'Tuesday', purpose: 'Agitate the Pain', emotion: 'Frustration: "This is costing me"', wordCount: '200-300', tension: 'BUT this problem compounds. THEREFORE the gap between where they are and where they could be is widening every race weekend.' },
  { day: 'Wednesday', purpose: 'Explain the Neuroscience', emotion: 'Understanding: "Now I get it"', wordCount: '250-350', tension: 'The science explains WHY. BUT most drivers do the opposite of what the data shows. THEREFORE the fix is counterintuitive.' },
  { day: 'Thursday', purpose: 'Future-Pace the Solution', emotion: 'Hope: "This could work"', wordCount: '200-300', tension: 'Show the transformation. BUT it requires one specific shift. THEREFORE the question becomes: are you willing to do it differently?' },
  { day: 'Friday', purpose: 'Release Free Training', emotion: 'Action: "I want this"', wordCount: '3 variations', tension: 'THEREFORE the next step is clear. Comment BLUEPRINT. No selling. "With or without you" energy.' }
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

// ─── F1 2026 Calendar ─────────────────────────────────────────
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

// ─── Indy NXT 2026 Calendar ──────────────────────────────────
export const INDY_NXT_2026 = [
  { round: 1, name: 'St. Petersburg', circuit: 'Streets of St. Petersburg', date: '2026-03-01', country: 'USA' },
  { round: 2, name: 'Arlington', circuit: 'Streets of Arlington', date: '2026-03-15', country: 'USA' },
  { round: '3-4', name: 'Barber Doubleheader', circuit: 'Barber Motorsports Park', date: '2026-03-29', country: 'USA' },
  { round: '5-6', name: 'Indianapolis Doubleheader', circuit: 'Indianapolis Motor Speedway Road Course', date: '2026-05-09', country: 'USA' },
  { round: 7, name: 'Detroit', circuit: 'Streets of Detroit', date: '2026-05-31', country: 'USA' },
  { round: 8, name: 'Gateway', circuit: 'Gateway Motorsports Park', date: '2026-06-07', country: 'USA' },
  { round: '9-10', name: 'Road America Doubleheader', circuit: 'Road America', date: '2026-06-20', country: 'USA' },
  { round: '11-12', name: 'Mid-Ohio Doubleheader', circuit: 'Mid-Ohio Sports Car Course', date: '2026-07-05', country: 'USA' },
  { round: 13, name: 'Nashville', circuit: 'Nashville Superspeedway', date: '2026-07-19', country: 'USA' },
  { round: 14, name: 'Portland', circuit: 'Portland International Raceway', date: '2026-08-09', country: 'USA' },
  { round: 15, name: 'Milwaukee', circuit: 'Milwaukee Mile', date: '2026-08-30', country: 'USA' },
  { round: '16-17', name: 'Laguna Seca Doubleheader', circuit: 'WeatherTech Raceway Laguna Seca', date: '2026-09-06', country: 'USA' }
];

// ─── Porsche Carrera Cup North America 2026 Calendar ─────────
export const PORSCHE_CUP_NA_2026 = [
  { round: 1, name: 'Sebring', circuit: 'Sebring International Raceway', date: '2026-03-20', country: 'USA' },
  { round: 2, name: 'Long Beach', circuit: 'Grand Prix of Long Beach', date: '2026-04-19', country: 'USA' },
  { round: 3, name: 'Miami (F1 Support)', circuit: 'Miami International Autodrome', date: '2026-05-03', country: 'USA' },
  { round: 4, name: 'Watkins Glen', circuit: 'Watkins Glen International', date: '2026-06-27', country: 'USA' },
  { round: 5, name: 'Road America', circuit: 'Road America', date: '2026-08-01', country: 'USA' },
  { round: 6, name: 'Indianapolis', circuit: 'Indianapolis Motor Speedway', date: '2026-09-19', country: 'USA' },
  { round: 7, name: 'Road Atlanta', circuit: 'Road Atlanta', date: '2026-10-02', country: 'USA' },
  { round: 8, name: 'COTA (F1 Support)', circuit: 'Circuit of the Americas', date: '2026-10-25', country: 'USA' }
];

// ─── DTM 2026 Calendar ────────────────────────────────────────
export const DTM_2026 = [
  { round: 1, name: 'Red Bull Ring', circuit: 'Red Bull Ring', date: '2026-04-26', country: 'Austria' },
  { round: 2, name: 'Zandvoort', circuit: 'Circuit Zandvoort', date: '2026-05-24', country: 'Netherlands' },
  { round: 3, name: 'Lausitzring', circuit: 'DEKRA Lausitzring', date: '2026-06-21', country: 'Germany' },
  { round: 4, name: 'Norisring', circuit: 'Norisring', date: '2026-07-05', country: 'Germany' },
  { round: 5, name: 'Oschersleben', circuit: 'Motorsport Arena Oschersleben', date: '2026-07-26', country: 'Germany' },
  { round: 6, name: 'Nürburgring', circuit: 'Nürburgring', date: '2026-08-16', country: 'Germany' },
  { round: 7, name: 'Sachsenring', circuit: 'Sachsenring', date: '2026-09-13', country: 'Germany' },
  { round: 8, name: 'Hockenheimring Finale', circuit: 'Hockenheimring', date: '2026-10-11', country: 'Germany' }
];

// ─── Porsche Carrera Cup Australia 2026 Calendar ──────────────
export const PORSCHE_CUP_AU_2026 = [
  { round: 1, name: 'Australian GP (F1 Support)', circuit: 'Albert Park', date: '2026-03-08', country: 'Australia' },
  { round: 2, name: 'Darwin Triple Crown', circuit: 'Hidden Valley Raceway', date: '2026-06-21', country: 'Australia' },
  { round: 3, name: 'Ipswich Super440', circuit: 'Queensland Raceway', date: '2026-08-23', country: 'Australia' },
  { round: 4, name: 'The Bend 500', circuit: 'The Bend Motorsport Park', date: '2026-09-13', country: 'Australia' },
  { round: 5, name: 'Bathurst 1000', circuit: 'Mount Panorama', date: '2026-10-11', country: 'Australia' },
  { round: 6, name: 'Gold Coast 500', circuit: 'Surfers Paradise Street Circuit', date: '2026-10-25', country: 'Australia' },
  { round: 7, name: 'Adelaide Grand Final', circuit: 'Adelaide Street Circuit', date: '2026-12-06', country: 'Australia' }
];

// ─── NZ Porsche Race Championship 2025/26 Calendar ───────────
export const PORSCHE_NZ_2026 = [
  { round: 1, name: 'Manfeild Rd 1', circuit: 'Manfeild: Circuit Chris Amon', date: '2025-10-25', country: 'New Zealand' },
  { round: 2, name: 'Hampton Downs Endurance', circuit: 'Hampton Downs Motorsport Park', date: '2025-11-02', country: 'New Zealand' },
  { round: 3, name: 'Hampton Downs Endurance Rd 3', circuit: 'Hampton Downs Motorsport Park', date: '2026-01-11', country: 'New Zealand' },
  { round: 4, name: 'Manfeild Rd 4', circuit: 'Manfeild: Circuit Chris Amon', date: '2026-03-01', country: 'New Zealand' },
  { round: 5, name: 'Taupo Endurance', circuit: 'Taupo International Motorsport Park', date: '2026-03-28', country: 'New Zealand' },
  { round: 6, name: 'Taupo Finale', circuit: 'Taupo International Motorsport Park', date: '2026-04-25', country: 'New Zealand' }
];

// ─── All Calendars Combined ──────────────────────────────────
export const ALL_CALENDARS = [
  { series: 'Formula 1', shortName: 'F1', calendar: F1_2026 },
  { series: 'Indy NXT', shortName: 'Indy NXT', calendar: INDY_NXT_2026 },
  { series: 'Porsche Carrera Cup North America', shortName: 'Porsche Cup NA', calendar: PORSCHE_CUP_NA_2026 },
  { series: 'DTM', shortName: 'DTM', calendar: DTM_2026 },
  { series: 'Porsche Carrera Cup Australia', shortName: 'Porsche Cup AU', calendar: PORSCHE_CUP_AU_2026 },
  { series: 'NZ Porsche Race Championship', shortName: 'Porsche NZ', calendar: PORSCHE_NZ_2026 }
];

// ─── CTA Logic (5 CTAs with seasonal rotation) ──────────────
export function getActiveCTAs() {
  const month = new Date().getMonth();
  // Off-season (Oct-Feb): Include Season Review (LM2), all others active
  if (month >= 9 || month <= 1) {
    return [...CTAS];
  }
  // Race season (Mar-Sep): Drop Season Review, keep Flow, Mindset, Sleep, Blueprint
  return CTAS.filter(c => c.id !== 'cta-b');
}

// ─── CTA Getter (rotates through active CTAs) ────────────────
let ctaRotationIndex = 0;
export function getRotatingCTA() {
  const active = getActiveCTAs();
  const cta = active[ctaRotationIndex % active.length];
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

// ─── Race Week Detection (all calendars) ─────────────────────
export function isRaceWeek(date = new Date()) {
  return getAllRaceWeekContexts(date).length > 0;
}

// Legacy single-result function (returns first match, usually F1)
export function getRaceWeekContext(date = new Date()) {
  const all = getAllRaceWeekContexts(date);
  return all.length > 0 ? all[0] : null;
}

// Returns ALL championship events happening in the current week
export function getAllRaceWeekContexts(date = new Date()) {
  const checkDate = new Date(date);
  const results = [];

  for (const cal of ALL_CALENDARS) {
    for (const race of cal.calendar) {
      const raceDate = new Date(race.date);
      const raceDay = raceDate.getDay();
      const monday = new Date(raceDate);
      monday.setDate(raceDate.getDate() - (raceDay === 0 ? 6 : raceDay - 1));
      const sunday = new Date(monday);
      sunday.setDate(monday.getDate() + 6);
      sunday.setHours(23, 59, 59);

      if (checkDate >= monday && checkDate <= sunday) {
        results.push({
          series: cal.series,
          shortName: cal.shortName,
          round: race.round,
          name: race.name,
          circuit: race.circuit,
          country: race.country,
          raceDate: race.date,
          isRaceDay: checkDate.toISOString().slice(0, 10) === race.date
        });
      }
    }
  }
  return results;
}

// ─── Weekly Content Balance Check (v2 mandatory) ──────────────
// Before generating a week of content, verify these constraints.
export function weeklyBalanceCheck(posts) {
  const issues = [];

  // Count problem/negative posts
  const problemPosts = posts.filter(p => p.pillar?.group === 'problem');
  if (problemPosts.length > 2) {
    issues.push(`Too many problem-aware posts (${problemPosts.length}/2 max)`);
  }

  // Check for transformation/aspirational post
  const positivePosts = posts.filter(p => p.pillar?.group === 'positive');
  if (positivePosts.length < 1) {
    issues.push('Missing at least 1 positive/aspirational post');
  }

  // Check neurochemical variety (at least 3 different)
  const chemicals = new Set(posts.map(p => p.neurochemical).filter(Boolean));
  if (chemicals.size < 3) {
    issues.push(`Only ${chemicals.size} neurochemicals referenced (need 3+)`);
  }

  return {
    valid: issues.length === 0,
    issues
  };
}

// ─── Weekly Neurochemical Assignment ──────────────────────────
// Assigns neurochemicals to each post ensuring at least 3 different ones
export function getWeeklyNeurochemicals(count = 7) {
  const shuffle = arr => {
    const s = [...arr];
    for (let i = s.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [s[i], s[j]] = [s[j], s[i]];
    }
    return s;
  };

  // Ensure at least 3 unique chemicals, fill to count
  const shuffled = shuffle(NEUROCHEMICALS);
  const result = shuffled.slice(0, Math.min(count, NEUROCHEMICALS.length));
  while (result.length < count) {
    result.push(NEUROCHEMICALS[Math.floor(Math.random() * NEUROCHEMICALS.length)]);
  }
  return result;
}

// ─── Weekly Helpers (v2: 7 pillars, balanced mix) ─────────────
export function getWeeklyPillars() {
  // v2 content mix per week (7 posts):
  // - 5 narrated slide videos (mix of problem + positive pillars)
  // - 1 carousel or data graphic post
  // - 1 external story post
  // Balance: max 2 problem-aware, rest from positive + mix
  // All pillar groups must be represented

  const shuffle = arr => {
    const s = [...arr];
    for (let i = s.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [s[i], s[j]] = [s[j], s[i]];
    }
    return s;
  };

  const problemPillars = PILLARS.filter(p => p.group === 'problem');
  const positivePillars = PILLARS.filter(p => p.group === 'positive');

  // v2 balance: 2 problem + 3 positive + 2 mixed (from either group)
  const selected = [
    ...shuffle(problemPillars).slice(0, 2),
    ...shuffle(positivePillars),  // all 3 positive pillars
    ...shuffle([...problemPillars, ...positivePillars]).slice(0, 2)
  ];

  return shuffle(selected).slice(0, 7);
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
