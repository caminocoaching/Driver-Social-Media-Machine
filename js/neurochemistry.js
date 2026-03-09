// ═══════════════════════════════════════════════════════════════
// 🧪 NEUROCHEMISTRY ENGINE — Racing Brain Chemistry Layer
// ═══════════════════════════════════════════════════════════════
// Source: Video_Content_System_Neurochemistry_v2.md
// Maps 6 neurochemicals to racing scenarios, video angles,
// WOW/HOW boundaries, and slide deck specifications.
// ═══════════════════════════════════════════════════════════════

// ─── 6 Neurochemicals Mapped to Racing ────────────────────────

export const NEUROCHEMICALS = [
    {
        id: 'cortisol',
        name: 'Cortisol',
        nickname: 'The Threat Chemical',
        icon: '🔴',
        color: '#ef4444',
        description: 'Released by the adrenal glands in response to perceived threat. Increases heart rate, narrows attention, triggers fight-or-flight. In small doses it sharpens focus. In sustained doses it destroys motor control, locks muscles, and kills flow state.',
        racingScenarios: [
            'Standing on the grid before a race start',
            'Entering a corner where you crashed last time',
            'Seeing a rival closing in your mirrors',
            'Losing grip mid-corner and feeling the rear slide',
            'Rain starting during a dry setup session',
            'First lap of qualifying when the pressure is on'
        ],
        pillarConnections: ['race-pressure', 'braking-zone-panic', 'confidence', 'the-7-mistakes'],
        videoAngles: [
            'What your brain does in the 30 seconds before the lights go out',
            'Why you brake 5 metres earlier at the corner where you crashed',
            'Your rival is closing. Here\'s why your lap times just got worse, not better',
            'Cortisol is the chemical that turns a fast rider into a cautious one. Here\'s when it fires.'
        ],
        wowNotHow: {
            reveal: 'That cortisol floods the system and how it manifests (tight shoulders, early braking, choppy inputs).',
            neverReveal: 'The specific protocol for managing it (that\'s the programme).'
        },
        symptoms: ['Tighter grip', 'Earlier braking', 'Narrowed vision', 'Choppy inputs', 'Muscle tension'],
        costMetric: '0.3-0.5s per corner, tighter lines, earlier braking',
        bridgeLine: 'This is one of the 7 mental errors we measure in 2,358 debriefs'
    },
    {
        id: 'dopamine',
        name: 'Dopamine',
        nickname: 'The Reward & Risk Chemical',
        icon: '🟡',
        color: '#f59e0b',
        description: 'Released in anticipation of reward, not just after receiving it. Drives motivation, risk-taking, and novelty-seeking. Creates the sensation of "wanting" and pursuit. In flow state, dopamine is one of the five neurochemicals that produce the zone experience.',
        racingScenarios: [
            'The buzz of qualifying well and wanting more',
            'Chasing a personal best and feeling the momentum build',
            'The excitement of a new track or a new bike',
            'Overtaking someone and wanting to overtake the next one immediately',
            'The addictive pull of "one more lap" when you should pit',
            'Pre-season excitement and goal-setting'
        ],
        pillarConnections: ['flow-state', 'confidence', 'client-transformations', 'tyre-grip-management'],
        videoAngles: [
            'The chemical reason you over-push after a fast lap',
            'Why your best laps happen when you\'re chasing, not defending',
            'New track, new bike, instant speed. Here\'s the neurochemistry behind fresh motivation.',
            'Dopamine made you fast in FP1. Then it disappeared in FP3. Here\'s why.'
        ],
        wowNotHow: {
            reveal: 'That dopamine is anticipation-based and that it\'s one of the flow state chemicals. Explain why riders feel invincible after a fast lap and then crash on the next one.',
            neverReveal: 'The specific flow triggers or dopamine management techniques from the programme.'
        },
        symptoms: ['Over-pushing', 'Risk escalation', 'Novelty-seeking', 'Pursuit drive', 'Restlessness after a still lap'],
        costMetric: 'Crashes on the lap after a PB, escalating risk through a session',
        bridgeLine: 'The riders who crash on the lap after their fastest one share this pattern'
    },
    {
        id: 'serotonin',
        name: 'Serotonin',
        nickname: 'The Confidence Chemical',
        icon: '🔵',
        color: '#3b82f6',
        description: 'Regulates mood, social hierarchy perception, and feelings of significance. High serotonin = feeling calm, confident, and worthy of your grid position. Low serotonin = self-doubt, impostor syndrome, feeling like you don\'t belong.',
        racingScenarios: [
            'Impostor syndrome when stepping up to a faster class',
            'Feeling calm and "in your right" on the grid vs feeling like a fraud',
            'Post-win confidence that carries into the next round',
            'The spiral after a DNF or a bad weekend',
            'Comparing yourself to your teammate who\'s faster'
        ],
        pillarConnections: ['confidence', 'race-pressure', 'client-transformations'],
        videoAngles: [
            'Why Cormac Buchanan felt like he didn\'t belong in Moto3. And the chemical that changed.',
            'The rider who\'s fast in testing but disappears in qualifying has a serotonin problem, not a speed problem.',
            'Confidence isn\'t a personality trait. It\'s a chemical state. And it\'s trainable.',
            'Why your best weekends start with one good session. The serotonin snowball effect.'
        ],
        wowNotHow: {
            reveal: 'That confidence has a neurochemical basis and that it cascades (one good session builds serotonin for the next).',
            neverReveal: 'The Confidence Protocol or pre-session serotonin management techniques.'
        },
        symptoms: ['Self-doubt on the grid', 'Impostor syndrome', 'Inconsistent across sessions', 'Performance drop after DNF'],
        costMetric: 'Testing pace never translates to qualifying; confidence collapse after bad results',
        bridgeLine: 'Cormac Buchanan scored 2 out of 10 for confidence before his breakout season'
    },
    {
        id: 'oxytocin',
        name: 'Oxytocin',
        nickname: 'The Trust & Connection Chemical',
        icon: '🟢',
        color: '#22c55e',
        description: 'Released through social bonding, trust, and team connection. Creates feelings of safety and belonging. In racing context, it\'s the relationship between rider and team, rider and coach, rider and the bike itself. Low oxytocin = feeling isolated, unsupported, paranoid about team decisions.',
        racingScenarios: [
            'Trust in your team\'s setup decisions',
            'The rider who performs better when their family is at the track',
            'The parent-child dynamic in junior racing',
            'Feeling connected to the bike vs fighting it',
            'The calm that comes from a pre-race routine shared with your team'
        ],
        pillarConnections: ['race-pressure', 'sleep-recovery', 'client-transformations'],
        videoAngles: [
            'Why some riders are faster when their family is trackside. It\'s not luck. It\'s oxytocin.',
            'The chemical reason you ride better with a team you trust.',
            'If you\'re fighting your bike, you might be fighting your brain\'s trust system.',
            'Grant runs a race team in New Zealand. He noticed something change in his riders when they started this.'
        ],
        wowNotHow: {
            reveal: 'The connection between trust/belonging and performance chemistry.',
            neverReveal: 'Specific team-building or relationship-based protocols from the programme.'
        },
        symptoms: ['Fighting the bike', 'Distrust of setup', 'Isolation', 'Paranoia about team decisions'],
        costMetric: 'Riders with strong team trust are measurably faster; isolated riders fight the bike',
        bridgeLine: 'The best teams produce the best riders. Not because of budgets. Because of this chemical.'
    },
    {
        id: 'testosterone',
        name: 'Testosterone',
        nickname: 'The Dominance Chemical',
        icon: '🟠',
        color: '#f97316',
        description: 'Drives competitive behaviour, aggression, risk tolerance, and territorial response. Peaks in competition. Rises after wins, drops after losses. Creates the "hunter" mindset on track.',
        racingScenarios: [
            'First lap aggression and race starts',
            'Defending position under attack',
            'The "red mist" that causes over-aggressive overtaking',
            'Post-win confidence and carrying momentum into the next race',
            'The psychological impact of losing: testosterone drops after defeats'
        ],
        pillarConnections: ['race-pressure', 'confidence', 'the-7-mistakes', 'motogp-wsbk-moments'],
        videoAngles: [
            'Why your best race starts happen when you feel like a predator, not a prey animal.',
            'The chemical reason you make risky overtakes you wouldn\'t attempt in practice.',
            'Marc Marquez\'s brain chemistry after winning a race is measurably different from every other rider on the grid.',
            'You lost Sunday\'s race. Here\'s what happened to your brain chemistry by Monday. And why it matters for next round.'
        ],
        wowNotHow: {
            reveal: 'The competition/testosterone cycle and how wins and losses chemically affect subsequent performance.',
            neverReveal: 'Recovery or testosterone-management techniques.'
        },
        symptoms: ['Red mist', 'Over-aggressive overtaking', 'Territorial defending', 'Post-loss motivation drop'],
        costMetric: 'Risky overtakes riders wouldn\'t attempt in practice; post-loss performance spirals',
        bridgeLine: 'Wins breed more wins. Losses breed more losses. The chemical cycle explains why.'
    },
    {
        id: 'endorphins',
        name: 'Endorphins',
        nickname: 'The Pain Gate Chemical',
        icon: '🟣',
        color: '#a855f7',
        description: 'Natural painkillers released during intense physical effort, stress, or after sustained exertion. Create the "high" feeling after a session. Mask physical discomfort. In motorsport, they reduce awareness of fatigue and physical strain during long sessions.',
        racingScenarios: [
            'Mid-race when arms pump and fatigue sets in but you stop noticing',
            'The euphoria after crossing the finish line on a good lap',
            'Why riders describe the best sessions as "effortless" even though they were physically demanding',
            'The addictive nature of track days and racing',
            'Recovery: why you feel exhausted hours after a session but felt fine at the time'
        ],
        pillarConnections: ['flow-state', 'tyre-grip-management', 'sleep-recovery'],
        videoAngles: [
            'Why you feel nothing during a flow lap but everything hurts an hour later.',
            'The chemical reason some sessions feel effortless and others feel like a fight.',
            'Endorphins are your brain\'s natural painkiller. Here\'s when they switch on during a race.',
            'The post-session crash is real. Here\'s the neurochemistry behind it.'
        ],
        wowNotHow: {
            reveal: 'The endorphin cycle and its relationship to flow state.',
            neverReveal: 'Specific endorphin-triggering techniques or recovery protocols.'
        },
        symptoms: ['Masked fatigue', 'Post-session crash', 'Effort feels effortless', 'Delayed exhaustion'],
        costMetric: 'Flow laps feel effortless; non-flow laps feel like a fight. Same physical effort.',
        bridgeLine: 'Your brain has a painkiller that activates in flow. Most riders never trigger it.'
    }
];

// ─── The Flow State Cocktail (Signature Video Concept) ────────

export const FLOW_COCKTAIL = {
    name: 'The Flow State Cocktail',
    icon: '⚡',
    color: '#00BFA5',
    description: 'Flow state is not one chemical. It is a cocktail of five neurochemicals firing together. This is the WOW that no other motorsport content creator is teaching.',
    chemicals: [
        { name: 'Dopamine', role: 'Focus and pursuit drive' },
        { name: 'Norepinephrine', role: 'Arousal and alertness' },
        { name: 'Endorphins', role: 'Pain masking and effort reduction' },
        { name: 'Serotonin', role: 'Confidence and calm' },
        { name: 'Anandamide', role: 'Pattern recognition and lateral thinking' }
    ],
    processingSpeed: {
        flow: '4 billion bits per second',
        conscious: '110 bits per second'
    },
    videoAngle: 'Flow state is not a mindset. It is a measurable chemical cocktail in your brain. Five neurochemicals firing in sequence. When they align, you process at 4 billion bits per second. When they don\'t, you\'re stuck at 110. Here\'s what triggers each one.',
    wowNotHow: {
        reveal: 'Name the chemicals. Explain what each one does in the context of a fast lap. Show that flow is neurobiological, not mystical.',
        neverReveal: 'The specific sequence of triggers or the training protocol that produces the cocktail on demand.'
    }
};

// ─── Video Script Template Structure ──────────────────────────

export const VIDEO_SCRIPT_TEMPLATE = {
    sections: [
        {
            id: 'hook',
            name: 'HOOK',
            timing: '0-5 seconds',
            instruction: 'One sentence. Text overlay on the first slide. Must stop the scroll.',
            example: 'Your brain releases cortisol 0.3 seconds before you reach the braking marker. Here\'s what it does to your riding.'
        },
        {
            id: 'scenario',
            name: 'SCENARIO',
            timing: '5-15 seconds',
            instruction: 'Describe the on-track moment the rider recognises.',
            example: 'You\'re approaching Turn 3. You crashed here two rounds ago. Your hands tighten on the bars. Your braking point moves 5 metres earlier. You didn\'t decide to brake early. Your brain decided for you.'
        },
        {
            id: 'science',
            name: 'THE SCIENCE',
            timing: '15-35 seconds',
            instruction: 'Name the chemical. Explain what it does in plain language. One slide with a simple visual.',
            example: 'That\'s cortisol. Your brain\'s threat detection system flooding your body with stress hormones because it remembers this corner is dangerous. It narrows your vision, tenses your muscles, and switches you from automatic riding to conscious control.'
        },
        {
            id: 'cost',
            name: 'THE COST',
            timing: '35-45 seconds',
            instruction: 'Quantify the impact in lap time or race position.',
            example: 'In our data from 2,358 debriefs, riders with elevated stress markers in specific corners consistently lose 0.3 to 0.5 seconds per corner compared to their own baseline. That\'s not a bike problem. That\'s a brain problem.'
        },
        {
            id: 'bridge',
            name: 'THE BRIDGE',
            timing: '45-55 seconds',
            instruction: 'Connect to the bigger picture. Tease the solution without giving it away.',
            example: 'The fix is not more bravery. Trying harder makes cortisol worse. There\'s a specific process for retraining your brain\'s response to that corner. That\'s what we work on.'
        },
        {
            id: 'cta',
            name: 'CTA',
            timing: '55-60 seconds',
            instruction: 'Casual, low-pressure.',
            example: 'If you want to find out which mental patterns are costing you the most, I built a free Rider Mindset Quiz. 12 real racing scenarios. 3 minutes. Link in the comments.'
        }
    ]
};

// ─── Manus Slide Deck Specifications ──────────────────────────

export const SLIDE_DECK_SPECS = {
    style: {
        background: '#0A1628',
        backgroundAlt: '#000000',
        font: 'Montserrat',
        accent: '#00BFA5',
        maxWordsPerSlide: 15
    },
    slides: [
        { number: 1, name: 'Hook', content: 'Bold text only. The hook sentence. Large font. No images. This is the scroll-stopper frame.' },
        { number: 2, name: 'Scenario', content: 'Short scenario description. Could include a simple track diagram or corner illustration.' },
        { number: 3, name: 'The Chemical', content: 'Name of the chemical in large teal text. One-line description of what it does. Optional: simple brain region highlight or chemical structure icon (keep it clean, not clinical).' },
        { number: 4, name: 'The Mechanism', content: 'How the chemical manifests in riding. 2-3 bullet points maximum.' },
        { number: 5, name: 'The Data', content: 'One stat from the debrief data. Large number. Short label. Source line. Data Visualisation Card format.' },
        { number: 6, name: 'The Bridge', content: '"This is one of the patterns we measure across 2,358 debriefs." Or a teaser line about the solution.' },
        { number: 7, name: 'CTA', content: '"Free Rider Mindset Quiz" with the URL or comment keyword. Clean, simple.' },
        { number: 8, name: 'End Card (Optional)', content: 'Camino Coaching logo. "85 five-star reviews on Trustpilot."' }
    ]
};

// ─── HeyGen Production Notes ──────────────────────────────────

export const HEYGEN_SPECS = {
    avatar: {
        position: 'Bottom-right corner circle',
        size: 'Small enough not to obscure slide content but large enough that facial expressions are visible',
        behaviour: 'Talking directly to camera. Natural gestures. Not reading from a script.'
    },
    voice: {
        source: 'ElevenLabs clone of Craig\'s voice',
        style: 'Conversational pace. UK English.',
        numberRule: 'Numbers written out in full text (e.g., "two thousand three hundred and fifty eight" not "2,358")'
    },
    transitions: 'Simple slide transitions. No flashy effects. The content and the avatar carry the video, not the production.',
    outputFormats: {
        reels: '9:16 (vertical) for Reels',
        native: '16:9 (horizontal) for longer Facebook native video'
    }
};

// ─── Weekly Video Schedule ────────────────────────────────────

export const WEEKLY_VIDEO_SCHEDULE = [
    {
        day: 'Monday',
        contentType: 'Research Drop',
        chemicalFocus: ['cortisol', 'dopamine'],
        videoLength: '45-60s',
        platform: 'FB Reel + IG Reel',
        outputFormat: '9:16',
        brief: 'AI finds a real article or study related to cortisol or dopamine in performance. Script bridges to racing with neurochemistry.'
    },
    {
        day: 'Tuesday',
        contentType: 'Client Story',
        chemicalFocus: ['serotonin'],
        videoLength: '30-45s',
        platform: 'IG Reel',
        outputFormat: '9:16',
        brief: 'Named athlete transformation through the lens of confidence chemistry. Serotonin shift before their breakthrough.'
    },
    {
        day: 'Wednesday',
        contentType: 'Neuroscience Teach',
        chemicalFocus: ['flow-cocktail'],
        videoLength: '90s-3min',
        platform: 'FB native video + IG Carousel',
        outputFormat: '16:9',
        brief: 'Deep-dive into the Flow Cocktail or a single chemical. Longer format. More detail. The premium teaching content.'
    },
    {
        day: 'Thursday',
        contentType: 'Provocative Hook',
        chemicalFocus: ['cortisol'],
        videoLength: '30-45s',
        platform: 'FB Reel + IG Reel',
        outputFormat: '9:16',
        brief: 'Cost-focused. Cortisol as the threat chemical costing lap time. Data-led, slightly provocative.'
    },
    {
        day: 'Friday',
        contentType: 'Timely / Race Reaction',
        chemicalFocus: ['any'],
        videoLength: '45-60s',
        platform: 'FB Reel + IG Reel',
        outputFormat: '9:16',
        brief: 'React to the upcoming or recent race weekend. Match the chemical to what happened on track.'
    },
    {
        day: 'Saturday',
        contentType: 'Outside the Paddock',
        chemicalFocus: ['any'],
        videoLength: '45-60s',
        platform: 'FB Reel + IG Reel',
        outputFormat: '9:16',
        brief: 'Elite athlete or other sport. Link the chemical story back to riding.'
    },
    {
        day: 'Sunday',
        contentType: 'Proof / Aspiration',
        chemicalFocus: ['dopamine', 'serotonin'],
        videoLength: '30-45s',
        platform: 'IG Reel',
        outputFormat: '9:16',
        brief: 'Positive, aspirational. The dopamine/serotonin upside. Show what\'s possible when the chemistry is right.'
    }
];

// ─── 30 Ready-Made Video Topics ───────────────────────────────

export const VIDEO_TOPICS = [
    { topic: 'Cortisol fires 0.3 seconds before the braking marker. Here\'s what it does to your inputs.', chemical: 'cortisol' },
    { topic: 'Why your best laps happen when you stop trying. The dopamine paradox.', chemical: 'dopamine' },
    { topic: 'Cormac Buchanan\'s brain chemistry changed before his riding did. Serotonin is why.', chemical: 'serotonin' },
    { topic: 'The chemical reason you\'re faster in the wet. Norepinephrine explained.', chemical: 'flow-cocktail' },
    { topic: 'You crashed at Turn 7. Now your brain won\'t let you commit there. Cortisol memory.', chemical: 'cortisol' },
    { topic: 'Why riders who trust their team are measurably faster. Oxytocin on track.', chemical: 'oxytocin' },
    { topic: 'The post-race crash is real. What happens to your endorphins after the flag.', chemical: 'endorphins' },
    { topic: 'Your rival just overtook you. Here\'s the testosterone spike that will cost you the next corner.', chemical: 'testosterone' },
    { topic: 'Flow state is not a mindset. It\'s five chemicals firing in sequence.', chemical: 'flow-cocktail' },
    { topic: 'Dopamine peaks in anticipation, not achievement. That\'s why qualifying feels different.', chemical: 'dopamine' },
    { topic: '85% podium rate. The chemical state that produces consistent results.', chemical: 'serotonin' },
    { topic: 'Serotonin drops after a DNF. Here\'s why the next round already feels harder.', chemical: 'serotonin' },
    { topic: 'Why fresh tracks feel fast. Dopamine and novelty explained.', chemical: 'dopamine' },
    { topic: 'The chemical stack behind a personal best. What your brain does differently.', chemical: 'flow-cocktail' },
    { topic: 'Home track pressure is cortisol dressed up as expectation.', chemical: 'cortisol' },
    { topic: 'Over-pushing after a fast lap. Testosterone made you do it.', chemical: 'testosterone' },
    { topic: 'Your pre-race warm-up changes your brain chemistry. Most riders skip it.', chemical: 'cortisol' },
    { topic: 'Endorphins mask fatigue until the session ends. Then the bill arrives.', chemical: 'endorphins' },
    { topic: 'The rider who\'s calm on the grid has different cortisol regulation. It\'s trainable.', chemical: 'cortisol' },
    { topic: 'Marc Marquez said he doesn\'t feel pressure. Here\'s the serotonin reason he\'s right.', chemical: 'serotonin' },
    { topic: 'Why practice pace and race pace feel like different riders. Chemical switching.', chemical: 'flow-cocktail' },
    { topic: 'The dopamine cliff: why your third session is always worse than your first.', chemical: 'dopamine' },
    { topic: 'Oxytocin is the reason the best teams produce the best riders. Not budgets.', chemical: 'oxytocin' },
    { topic: 'Your inner critic has a chemical signature. We measure it.', chemical: 'cortisol' },
    { topic: 'One rider improved their flow score by 36%. Here\'s the chemical shift that produced it.', chemical: 'flow-cocktail' },
    { topic: 'Why screaming at yourself in the helmet makes you slower. Cortisol amplification.', chemical: 'cortisol' },
    { topic: 'The 4 billion bits vs 110 bits gap. Which chemical cocktail opens the fast lane.', chemical: 'flow-cocktail' },
    { topic: 'Grip loss triggers cortisol. Here\'s what that does to the next three corners.', chemical: 'cortisol' },
    { topic: 'Sleep deprivation cuts serotonin in half. That\'s why Friday practice feels awful.', chemical: 'serotonin' },
    { topic: '699 personal bests in our data. The chemical pattern they all share.', chemical: 'flow-cocktail' }
];

// ─── 30-SECOND SHORTS PLAYBOOK ────────────────────────────────
// Source: Camino Coaching 30-Second Shorts Playbook (March 2026)
// YouTube Shorts + Instagram Reels + Facebook Reels
// Compressed format: 4 slides, 75-85 words, razor-sharp structure.

export const SHORTS_SCRIPT_TEMPLATE = {
    targetLength: '30 seconds',
    wordCount: { min: 75, max: 85 },
    slideCount: 4,
    sections: [
        {
            id: 'hook',
            name: 'HOOK',
            timing: '0-5 seconds',
            slideNumber: 1,
            instruction: 'One scroll-stopping sentence. Maximum 12 words spoken. 5-7 words on screen. Voice starts at 0.0 seconds. No pause. No intro. No greeting.',
            maxScreenWords: 7,
            maxSpokenWords: 12,
            example: 'Simone Biles said her therapist was as crucial as her coach. Here\'s the chemical reason.'
        },
        {
            id: 'insight',
            name: 'THE INSIGHT',
            timing: '5-18 seconds',
            slideNumber: 2,
            instruction: 'The article reference + the chemical explanation. 3-4 sentences maximum. Approximately 35-40 words. Name the source. Name the chemical. Explain in one sentence why it matters to the driver.',
            maxWords: 40,
            example: 'When Biles visualises her routine before competition, her brain releases dopamine. The anticipation chemical. It primes her nervous system for performance before she even steps onto the mat. Your brain does the same thing when you visualise a lap. Or it would, if you trained it to.'
        },
        {
            id: 'proof',
            name: 'THE PROOF',
            timing: '18-25 seconds',
            slideNumber: 3,
            instruction: 'One data point from the debrief data or one specific result. 1-2 sentences. Approximately 15-20 words. Big number on screen. Voice states it once.',
            maxWords: 20,
            example: 'Six hundred and ninety nine personal bests in our debrief data. The drivers who prepare their brain chemistry before a session PB more than twice as often.'
        },
        {
            id: 'cta',
            name: 'CTA',
            timing: '25-30 seconds',
            slideNumber: 4,
            instruction: 'One sentence. 6-8 words maximum. Direct, effortless. No explanation of the quiz.',
            maxWords: 8,
            example: 'Comment MINDSET. I\'ll send you the free quiz.'
        }
    ]
};

export const SHORTS_SLIDE_SPECS = {
    style: {
        background: '#0A1628',
        font: 'Montserrat',
        accent: '#00BFA5',
        accentNegative: '#ef4444',
        maxWordsPerSlide: 7,
        format: '9:16 vertical (1080×1920px)'
    },
    slides: [
        { number: 1, name: 'Hook', content: 'Bold text, 5-7 words maximum. Must be readable in under 1 second. Text already on screen when video starts, not fading in. Large font. No images.', timing: '0-5s' },
        { number: 2, name: 'The Insight', content: 'Article reference + chemical name in accent colour. Background image with dark overlay. One-line mechanism explanation.', timing: '5-18s' },
        { number: 3, name: 'The Proof', content: 'One big number in teal/accent colour. Short label underneath. Data Visualisation Card format.', timing: '18-25s' },
        { number: 4, name: 'CTA', content: 'Comment keyword in teal. Minimal visual weight. Dark background. Small text. Must feel smooth transitioning back to Slide 1 for loop replay.', timing: '25-30s' }
    ],
    captionRules: {
        style: 'Bold, high-contrast, white text with slight dark shadow or background bar.',
        position: 'Top or centre of screen, NEVER bottom (avatar space).',
        maxLines: 2,
        highlighting: 'Keywords highlighted: teal for positive, red for cortisol/threat.'
    }
};

export const SHORTS_HOOK_STYLES = [
    {
        id: 'shock-stat',
        name: 'The Shock Stat',
        formula: 'Lead with a surprising number or percentage that stops the scroll.',
        example: '63% of crashes happen within 3 laps of a personal best.'
    },
    {
        id: 'impossible-claim',
        name: 'The Impossible Claim',
        formula: 'State something the viewer will instinctively want to verify.',
        example: 'Your brain makes you brake 5 metres earlier and you don\'t even know it.'
    },
    {
        id: 'named-authority',
        name: 'The Named Authority',
        formula: 'Open with a recognisable name + their insight.',
        example: 'Simone Biles said her therapist was as crucial as her coach.'
    },
    {
        id: 'direct-challenge',
        name: 'The Direct Challenge',
        formula: 'Challenge the viewer directly. Make it personal.',
        example: 'You\'ve never trained the 75% of performance that happens in your head.'
    },
    {
        id: 'specific-question',
        name: 'The Specific Question',
        formula: 'Ask a hyper-specific question they can\'t answer.',
        example: 'Where are your eyes 0.3 seconds before you hit the braking marker?'
    }
];

export const SHORTS_CTA_VARIANTS = [
    'Comment MINDSET for the free quiz.',
    'Comment FLOW. I\'ll send you the training.',
    'Free quiz. Comment MINDSET.',
    'Link in bio. 3 minutes. Free.',
    'Comment BLUEPRINT for the free training.'
];

/**
 * Build the full 30-second Shorts context for AI prompt construction
 */
export function buildShortsScriptContext(chemicalId, topic) {
    const isFlowCocktail = chemicalId === 'flow-cocktail';

    let chemContext;
    if (isFlowCocktail) {
        chemContext = `CHEMICAL FOCUS: The Flow State Cocktail
Description: ${FLOW_COCKTAIL.description}
The 5 chemicals: ${FLOW_COCKTAIL.chemicals.map(c => `${c.name} (${c.role})`).join(', ')}
Processing speed: ${FLOW_COCKTAIL.processingSpeed.flow} (flow) vs ${FLOW_COCKTAIL.processingSpeed.conscious} (conscious)`;
    } else {
        const chem = getChemical(chemicalId);
        if (!chem) return '';
        chemContext = `CHEMICAL FOCUS: ${chem.name} — ${chem.nickname}
Description: ${chem.description}
Racing scenarios: ${chem.racingScenarios.slice(0, 3).join('; ')}
How it manifests: ${chem.symptoms.join(', ')}
The cost: ${chem.costMetric}
Bridge line: ${chem.bridgeLine}`;
    }

    const wowHow = buildWowHowInstruction(chemicalId);

    const templateInstructions = SHORTS_SCRIPT_TEMPLATE.sections.map(s =>
        `${s.name} (${s.timing}) | Slide ${s.slideNumber}: ${s.instruction}\nExample: "${s.example}"`
    ).join('\n\n');

    const hookStyles = SHORTS_HOOK_STYLES.map(h =>
        `- ${h.name}: ${h.formula} Example: "${h.example}"`
    ).join('\n');

    return `${chemContext}

${wowHow}

TOPIC: ${topic}

=== 30-SECOND SHORTS SCRIPT STRUCTURE (follow this EXACTLY) ===
${templateInstructions}

TOTAL WORD COUNT: ${SHORTS_SCRIPT_TEMPLATE.wordCount.min}-${SHORTS_SCRIPT_TEMPLATE.wordCount.max} words. No more.

HOOK STYLE OPTIONS (pick one):
${hookStyles}

SLIDE DECK SPEC (for Manus — 4 slides only):
- Format: ${SHORTS_SLIDE_SPECS.style.format}
- Background: ${SHORTS_SLIDE_SPECS.style.background} (dark)
- Font: ${SHORTS_SLIDE_SPECS.style.font}
- Accent colour: ${SHORTS_SLIDE_SPECS.style.accent} (teal for positive), ${SHORTS_SLIDE_SPECS.style.accentNegative} (red for threat)
- Max words per slide: ${SHORTS_SLIDE_SPECS.style.maxWordsPerSlide}
${SHORTS_SLIDE_SPECS.slides.map(s => `- Slide ${s.number} (${s.name}, ${s.timing}): ${s.content}`).join('\n')}

CAPTION RULES:
- ${SHORTS_SLIDE_SPECS.captionRules.style}
- Position: ${SHORTS_SLIDE_SPECS.captionRules.position}
- Max lines on screen: ${SHORTS_SLIDE_SPECS.captionRules.maxLines}
- ${SHORTS_SLIDE_SPECS.captionRules.highlighting}

HEYGEN AVATAR NOTES:
- Avatar in bottom-right corner circle. Slightly larger in Hook section (0-5s), then standard size.
- Direct eye contact with camera in first second.
- Facial expressions must match content: intense for cortisol/threat, energised for achievement/data.
- Gestures required: head nods, eyebrow raises, hand movements. NOT a still talking head.
- Voice pace: FAST for hook (0-5s), slightly SLOWER for insight (5-18s), conversational for CTA (25-30s).
- Voice starts at 0.3 seconds. No music intro. No greeting.

LOOP ENGINEERING:
- End the video with a statement that connects back to the opening.
- The final CTA slide should have minimal visual weight so the eye loops back to Slide 1.
- The transition from Slide 4 back to Slide 1 must feel smooth, not jarring.`;
}

// ─── Helper Functions ─────────────────────────────────────────

/**
 * Get a neurochemical by ID
 */
export function getChemical(id) {
    return NEUROCHEMICALS.find(c => c.id === id);
}

/**
 * Get all chemicals relevant to a content pillar
 */
export function getChemicalsForPillar(pillarId) {
    return NEUROCHEMICALS.filter(c => c.pillarConnections.includes(pillarId));
}

/**
 * Get a random video angle for a specific chemical
 */
export function getRandomVideoAngle(chemicalId) {
    const chemical = getChemical(chemicalId);
    if (!chemical) return null;
    return chemical.videoAngles[Math.floor(Math.random() * chemical.videoAngles.length)];
}

/**
 * Get the video schedule for a specific day
 */
export function getVideoScheduleForDay(dayName) {
    return WEEKLY_VIDEO_SCHEDULE.find(d => d.day.toLowerCase() === dayName.toLowerCase());
}

/**
 * Get video topics filtered by chemical
 */
export function getTopicsForChemical(chemicalId) {
    return VIDEO_TOPICS.filter(t => t.chemical === chemicalId);
}

/**
 * Get a random unused topic for a chemical
 */
export function getRandomTopic(chemicalId = null) {
    const pool = chemicalId
        ? VIDEO_TOPICS.filter(t => t.chemical === chemicalId)
        : VIDEO_TOPICS;
    return pool[Math.floor(Math.random() * pool.length)];
}

/**
 * Build the WOW/HOW boundary instruction for AI prompts
 */
export function buildWowHowInstruction(chemicalId) {
    if (chemicalId === 'flow-cocktail') {
        return `WOW not HOW Boundary:\n- REVEAL: ${FLOW_COCKTAIL.wowNotHow.reveal}\n- NEVER REVEAL: ${FLOW_COCKTAIL.wowNotHow.neverReveal}`;
    }
    const chemical = getChemical(chemicalId);
    if (!chemical) return '';
    return `WOW not HOW Boundary:\n- REVEAL: ${chemical.wowNotHow.reveal}\n- NEVER REVEAL: ${chemical.wowNotHow.neverReveal}`;
}

/**
 * Build the full neurochemistry context for an AI video script prompt
 */
export function buildVideoScriptContext(chemicalId, topic) {
    const isFlowCocktail = chemicalId === 'flow-cocktail';

    let chemContext;
    if (isFlowCocktail) {
        chemContext = `CHEMICAL FOCUS: The Flow State Cocktail
Description: ${FLOW_COCKTAIL.description}
The 5 chemicals: ${FLOW_COCKTAIL.chemicals.map(c => `${c.name} (${c.role})`).join(', ')}
Processing speed: ${FLOW_COCKTAIL.processingSpeed.flow} (flow) vs ${FLOW_COCKTAIL.processingSpeed.conscious} (conscious)
Video angle: ${FLOW_COCKTAIL.videoAngle}`;
    } else {
        const chem = getChemical(chemicalId);
        if (!chem) return '';
        chemContext = `CHEMICAL FOCUS: ${chem.name} — ${chem.nickname}
Description: ${chem.description}
Racing scenarios: ${chem.racingScenarios.join('; ')}
How it manifests: ${chem.symptoms.join(', ')}
The cost: ${chem.costMetric}
Bridge line: ${chem.bridgeLine}`;
    }

    const wowHow = buildWowHowInstruction(chemicalId);

    const templateInstructions = VIDEO_SCRIPT_TEMPLATE.sections.map(s =>
        `${s.name} (${s.timing}): ${s.instruction}\nExample: "${s.example}"`
    ).join('\n\n');

    return `${chemContext}

${wowHow}

TOPIC: ${topic}

VIDEO SCRIPT STRUCTURE (follow this exactly):
${templateInstructions}

SLIDE DECK SPEC (for Manus):
- Background: ${SLIDE_DECK_SPECS.style.background} (dark)
- Font: ${SLIDE_DECK_SPECS.style.font}
- Accent color: ${SLIDE_DECK_SPECS.style.accent} (teal)
- Max words per slide: ${SLIDE_DECK_SPECS.style.maxWordsPerSlide}
${SLIDE_DECK_SPECS.slides.map(s => `- Slide ${s.number} (${s.name}): ${s.content}`).join('\n')}

HEYGEN NOTES:
- ${HEYGEN_SPECS.avatar.behaviour}
- ${HEYGEN_SPECS.voice.style}
- ${HEYGEN_SPECS.voice.numberRule}
- ${HEYGEN_SPECS.transitions}`;
}
