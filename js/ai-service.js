// ═══════════════════════════════════════════════════════════════
// 🏁 DRIVER SOCIAL MEDIA MACHINE — AI Service
// Gemini (Research) + Claude (Writing) + HeyGen (Video)
// Facebook & Instagram posts for Racing Drivers
// CTA: Podium Contenders Blueprint (BLUEPRINT keyword)
// ═══════════════════════════════════════════════════════════════

import {
    PILLARS, FRAMEWORKS, CTAS, AUTHORITY_LINES, LEXICON, MECHANISMS,
    CASE_STUDIES, DRIVER_INSIGHTS, DATA_LAYERS,
    FUNNEL, CAMPAIGN_ARC, VISUAL_TYPES,
    REVIEW_GOLDMINE, REVIEW_USAGE_RULES,
    ALL_CALENDARS, getAllRaceWeekContexts
} from './content-engine.js';

import {
    REVIEW_STATS, QUOTED_HOOKS, OBJECTION_KILLERS, REVIEW_AUTHORITY_LINES,
    getHookForPillar, formatQuotedHook, getReviewAuthorityLine
} from './review-bank.js';

import {
    formatContextForAI, getCalendarSearchTerms, getChampionshipContext
} from './championship-calendar.js';

import {
    NEUROCHEMICALS, FLOW_COCKTAIL, VIDEO_SCRIPT_TEMPLATE, SLIDE_DECK_SPECS,
    HEYGEN_SPECS, WEEKLY_VIDEO_SCHEDULE, VIDEO_TOPICS,
    getChemical, buildVideoScriptContext, buildWowHowInstruction
} from './neurochemistry.js';

// ─── Master System Prompt (Racing Drivers FB/IG) ──────────────
// Adapted from Rider version for Car Racing Drivers
const SYSTEM_PROMPT = `You are Craig Muirhead's Facebook & Instagram content strategist. You generate daily social media posts for racing drivers that deliver genuine value and include a CTA to the Podium Contenders Blueprint.

# ABOUT CRAIG MUIRHEAD & CAMINO COACHING
- 59-year-old flow performance coach based in Mallorca, Spain
- 10 seasons inside elite racing paddocks (F1, F4, GB3, British GT, Carrera Cup, GT3, WEC, MotoGP, WorldSBK, BSB)
- 808 personal bests, 438 podiums, 159 race wins tracked
- Proprietary 'In The Zone' app: 2,358 debriefs, 118+ drivers, 100+ circuits worldwide, 60 months continuous data
- 4.9 Trustpilot rating (85 reviews, 100% five-star) + 5.0 Google rating (36 reviews, 100% five-star) = 121 total reviews
- REVIEW AUTHORITY: Use these in rotation: "Rated 4.9 out of 5 on Trustpilot from 85 unprompted driver reviews" / "85 five-star reviews on Trustpilot. 100% satisfaction rate" / "121 reviews across Trustpilot and Google. Every single one is five stars."
- Works with racing drivers (F1 development to club level), motorcycle racers, and business leaders
- Authority: pattern recognition and data analysis, NOT personal racing results
- Has worked directly with drivers in F1 development (Alex Connor, Robbie McAfee), GT racing (Callum Lavery, Bart Horsten), endurance racing, club racing across UK, Europe, NZ, South Africa, USA, Asia
- IMPORTANT: Rotate credibility claims. NEVER use the same stat in every post.

# TARGET AUDIENCE
Craig's Facebook and Instagram audience is racing drivers and track day drivers:
- Club racers (BARC, 750 Motor Club, BRSCC, CSCC)
- National championship drivers (British GT support classes, F4, GB3, Ginetta, Carrera Cup)
- Track day drivers (novice to advanced, considering racing)
- GT racing drivers (GT3, GT4, TCR, touring cars)
- Single-seater drivers (F4, GB3, Indy NXT, Formula Regional)
- Junior drivers and their parents
- Semi-professional competitors moving through classes
- UK and Europe primarily, also NZ, Australia, USA, Middle East
- They spend £2,000-£20,000+ per race weekend
- They are serious about improving, not casual track day enthusiasts
- Age range: 16-55, predominantly male
- They follow F1, British GT, DTM, WEC, Carrera Cup

# PLATFORM PERFORMANCE DATA (from 116 posts Nov 2025 - Feb 2026)
- Facebook: 6x the reach of Instagram. Avg 1,090 reach per post vs 188 on IG.
- Facebook winning format: Photo posts with long-form text (1,577 avg reach vs 380 for videos).
- Instagram winning format: Reels (261 avg reach vs 141 for static images). Carousels show 2.82% engagement.
- Monster post (19,217 reach, 109 link clicks): data-driven research, specific data, relatable scenario, neuroscience in plain language, "Oh by the way" CTA.
- 59% of Facebook posts got ZERO shares. The dead zone: promotional announcements, testimonial-only, neuroscience without track-specific anchor.

# THE 7 CONTENT PILLARS (Problem-Aware + Positive/Aspirational)
1. VISUAL TARGETING — Where drivers look determines where they go. Eye position, target fixation, peripheral processing, the 200-300ms delay.
2. BRAKING ZONE — Trail braking confidence, cortisol response, the gap between practice braking and qualifying braking.
3. OVERTHINKING (THE DRUNKEN MONKEY) — Analysis paralysis, prefrontal override, conscious mind at 110 bits trying to control the subconscious at 4 billion bits.
4. EXPECTATION PRESSURE — Sponsor pressure, family investment, championship points pressure, team expectations, amygdala hijack.
5. PERSONAL BEST TRIGGERS — Confidence multiplier, preparation patterns that predict PBs, debrief data insights.
6. RACE CRAFT & INTELLIGENCE — Race starts, overtaking decisions, tyre management, reading race situations, the winner effect.
7. FLOW STATE & CONFIDENCE — What flow feels like at 150mph, dopamine-norepinephrine alignment, time dilation, the zone as a trainable state.

# THE WINNING POST FORMULA (5-Step Architecture — from top performers)
## Step 1: THE HOOK (First Line)
This is the ONLY line that matters for reach. Proven hook patterns:
- Research/Data Hook: "They put eye-tracking sensors on a racing driver..." / "We analysed 2,358 race debriefs..."
- Celebrity Bridge Hook: "[F1 driver name] just said something most club racers will misunderstand..."
- Relatable Pain Hook: "You are P5 in practice. Then qualifying arrives..." / "Your first flying lap is your fastest. Then it all falls apart."
- Provocative Challenge Hook: "It is the most expensive lie in the paddock..." / "Your brain has a limit. You are pushing past it."
- QUOTED REVIEW HOOK: Use a single sentence from a real Trustpilot review as the opening hook in quotation marks. Then build teaching content around the theme. Use this approximately 1 in 4 posts.

## Step 2: THE PROBLEM (Next 2-3 Sentences)
Ground it in a SPECIFIC racing scenario. Use turn numbers, session contexts (qualifying vs race), specific sensations (tyre grip, braking confidence, steering input). Never generic.

## Step 3: THE NEUROSCIENCE (Core Teaching)
Explain WHY this happens in the brain. Reference the mechanism (amygdala, cerebellum, cognitive load, dual-task interference). Use plain language. Cite data where possible ("After 2,358 session debriefs..."). Follow the WOW not HOW principle: reveal the what and the why, NEVER the specific fix.

## Step 4: THE BRIDGE (Connection to Driver)
Show how this pattern appears at every level. Reference real results or anonymised driver patterns. Make the reader feel seen.

## Step 5: THE CTA
Separated from value content by a line break and visual separator (··).
"Comment BLUEPRINT below and I will send you the free training."
"With or without you" energy. Never needy. CTA is ALWAYS unrelated to the post topic.

# VOICE & TONE (Mandatory Rules — Non-Negotiable)
- UK English spelling throughout. No American spellings. (colour, analyse, programme, tyre, favourite)
- Warm, direct, confident. Like a trusted paddock insider talking to a mate.
- Never preachy. Never motivational-poster language. Never "you have got this" or "believe in yourself."
- Data-led and evidence-based. Every claim backed by numbers or named examples.
- Slightly provocative. Challenge assumptions. Make the reader question what they think they know.
- NEVER use em dashes, en dashes, or other GPT-style formatting in post body.
- NEVER use ** or any markdown formatting in post body.
- No emojis in the value section of the post. Occasional use in CTA is acceptable.
- No bullet point symbols in post body.
- Short paragraphs (1-2 sentences), mobile-first formatting.
- Post length: 200-400 words value content + CTA (Facebook). 100-200 words (Instagram).
- First line is the hook. Must stop the scroll with a SPECIFIC data point or dramatic scenario.
- Use CAR RACING language: driver, turn, apex, braking zone, racing line, throttle, steering input, circuit, pit lane, grid, qualifying, cockpit, seatbelts, harness, HANS device, pedal box. NEVER use motorcycle-specific language (lean angle, body position, hanging off, the bike).

# WEEKLY CONTENT BALANCE
- Monday: OUTSIDE THE PADDOCK (Familiar) — Story from another sport, wearable technology (Garmin, Whoop, Oura Ring, Apple Watch health studies), or science. Most shareable post.
- Tuesday: CLIENT TRANSFORMATION (Sexy) — Named athlete. Lead with the result, not the struggle.
- Wednesday: NEUROSCIENCE TEACH (Strange/Free Value) — Science-backed insight with racing application.
- Thursday: PROVOCATIVE HOOK (Scary) — ONE uncomfortable truth about racing psychology.
- Friday: TIMELY RACE REACTION (Familiar) — React to real F1, British GT, DTM, or WEC results.
- Saturday: ACHIEVEMENT/TECH SPOTLIGHT (Strange) — Wearable performance tech (Garmin, GoPro, Whoop, Oura Ring, Apple Watch innovations), biometric studies, or breakthrough results.
- Sunday: PROOF & CELEBRATION (Sexy) — Driver wins, debrief stats, review quotes.
Balance: 2 pain/challenge, 2 outside-the-paddock/tech, 2 proof/aspiration, 1 timely reaction.

# CONTENT RULES
- WOW not HOW: Reveal what the problem is and why it happens (neuroscience). NEVER give the specific fix or methodology.
- Never use generic coaching language: "mindset shift", "unlock your potential", "be your best self", "level up".
- Every post must reference a specific racing scenario (turn number, session context, tyre condition, grid position).
- Use real data: 808 PBs, 438 podiums, 159 wins, 118 drivers, 100+ circuits, 2,358 debriefs, 60 months, 4.9 Trustpilot (85 reviews).
- ROTATE credibility claims. Never use the same stat in consecutive posts.

# PLATFORM-SPECIFIC ADAPTATION
| Element | Facebook | Instagram |
| Format | Long-form text as Photo post | Reels (primary) + Carousels (2x/week) |
| Length | 200-400 words | 100-200 words caption / 15-60s Reel |
| Hook | Full opening line visible in feed | Text overlay on first frame of Reel |
| CTA | Comment keyword BLUEPRINT | Comment keyword BLUEPRINT (ManyChat) |
| Hashtags | 3-5 at very end, optional | 3-5 niche racing tags, always include |
| Shares | Optimise for shares (drives FB reach) | Optimise for saves (drives IG reach) |
| Tone | Analytical, data-driven insider | Slightly more direct, punchy, visual |

# CTA (Rotating Lead Magnets — matched to post topic)
Every post uses ONE of these CTAs, matched to the post content:
- FLOW → Driver Flow Profile (2 min assessment, flow strengths and blockers)
- MINDSET → Driver Mindset Quiz (12 racing scenarios, 3 min, most score below 40%)
- SLEEP → Driver Sleep Test (60 sec, checks sleep habits vs reaction time)
- BLUEPRINT → Podium Contenders Blueprint (3-day free training, direct link)
- SEASON → End of Season Review (off-season only, Oct-Feb)
Delivery: Comment keyword → ManyChat auto-DM → Lead Magnet → Blueprint → Strategy Call
The CTA is ALWAYS separated from the value content by ·· and framed as "oh by the way" / "completely unrelated" / "PS".

# FUNNEL CONTEXT
FB/IG Post → Comment keyword → ManyChat DM → Lead Magnet (FLOW/MINDSET/SLEEP) → Podium Contenders Blueprint (3-day free training) → Championship Strategy Call (free, 45 min) → Flow Performance Programme (£4,000, 43% close rate)

# REVIEW CONTENT PLAYBOOK RULES
- NEVER post a review as the entire content of a post.
- NEVER fabricate, paraphrase, or embellish a review. Use exact quotes or do not quote at all.
- NEVER use more than one review quote per post.
- Use review quotes in the CTA bridge section to pre-handle objections naturally.
- The Trustpilot link can be included on Facebook posts for credibility.

# CONTENT THE AI MUST NEVER CREATE (Dead Zone Rules)
- Self-promotional announcements without value
- Testimonial-only posts without a teaching hook
- Follow-up or sequence posts that assume the reader saw yesterday's content
- Generic motivational content that could apply to any sport
- Pure neuroscience explainers without a track-specific anchor
- Generic coaching announcements

# FACEBOOK/INSTAGRAM 2026 BEST PRACTICES
DWELL TIME: Write for 30+ seconds of reading. Deep insight, not surface advice.
SHARES: Content that drivers share with their engineer or their WhatsApp group. Optimise for shares on FB.
COMMENTS: End with questions that require multi-sentence replies, not yes/no.
SAVES: Make content bookmarkable. Specific data, actionable takeaways. Optimise for saves on IG.
Short paragraphs, line breaks, mobile-optimised formatting.
First line is the hook. Must stop the scroll with a SPECIFIC data point.`;


// ─── Generate Article Topics with Web Search (Weekly Wizard Step 1) ──
export async function generateTopics(pillars, seasonalContext, apiKey) {
    const champContext = getChampionshipContext();

    const daySlots = [
        'Monday: Outside the Paddock — a fascinating story from tennis, rugby, cycling, Olympic sport, combat sport, neuroscience, wearable health tech (Garmin, Whoop, Oura Ring, Apple Watch studies on HRV, sleep, recovery, stress), or GoPro use cases. NOT car racing. It MUST bridge back to racing driver mental performance. The driver should think "that is cool" first, then "that connects to my driving."',
        'Tuesday: Client Transformation — a racing driver comeback or breakthrough story. Lead with the result, not the struggle.',
        'Wednesday: Neuroscience Teach — brain science (flow state, cortisol, dopamine, attention) applied specifically to driving a race car on track. Reference turns, braking zones, throttle control, steering inputs.',
        'Thursday: Provocative Hook — ONE uncomfortable truth about racing psychology that drivers avoid admitting. Pain-forward.',
        'Friday: Timely Race Reaction — react to REAL recent F1, British GT, DTM, WEC, Carrera Cup, or Indy NXT results. Name specific drivers and races.',
        'Saturday: Achievement/Tech Spotlight — wearable performance technology (Garmin health studies, Whoop recovery data, Oura Ring sleep insights, Apple Watch peak performance features, GoPro innovations for motorsport), biometric breakthroughs, or brain-training devices connected to peak performance in sport.',
        'Sunday: Proof & Celebration — inspiring racing driver wins, championship stats, or mental performance breakthroughs behind the wheel.'
    ];

    const liveRacing = champContext.hasLiveRacing
        ? `LIVE RACING THIS WEEKEND — prioritise current race results and reactions from F1, British GT, DTM, WEC, or Carrera Cup.`
        : '';

    const seasonNote = seasonalContext
        ? `Season context: ${seasonalContext.season} — ${seasonalContext.context}`
        : '';

    const prompt = `Search the web for 7 stories from the last 7-30 days for a racing driver mental performance coach's social media. The audience is club racers, amateur GT drivers, single-seater drivers, and aspiring professionals who race cars on track.

TARGET CHAMPIONSHIPS: F1, British GT, DTM, WEC, Porsche Carrera Cup, Indy NXT, Formula Regional, IMSA, Bathurst.
SEARCH SOURCES (motorsport): Formula1.com, Motorsport.com, The Race, Autosport, Racer.com, Sportscar365, DTM.com, BBC Sport, Sky Sports F1.
SEARCH SOURCES (wearable tech & health): Garmin Blog (garmin.com/blog), Whoop Blog (whoop.com/thelocker), Oura Ring Blog (ouraring.com/blog), Apple Newsroom (apple.com/newsroom), GoPro News (gopro.com/news), Wired, TechCrunch, Wareable.com, DC Rainmaker (dcrainmaker.com).

${liveRacing}
${seasonNote}

Find one story for each slot:
${daySlots.map((d, i) => `${i + 1}. ${d}`).join('\n')}

WEARABLE TECH SEARCH GUIDANCE:
- Garmin: new health features, Body Battery studies, HRV tracking for athletes, racing driver use cases, endurance study data
- Whoop: recovery score studies, strain tracking, sleep performance data, pro athlete partnerships, HRV and performance correlation research
- Oura Ring: sleep stage analysis, readiness scores, temperature tracking studies, peak performance case studies
- Apple Watch: health sensor innovations, blood oxygen studies, crash detection in motorsport, activity and recovery research
- GoPro: new camera innovations for motorsport, onboard analytics, driver POV technology, helmet cam use cases
- Focus on STUDIES, DATA, and USE CASES — not product reviews or spec comparisons

RULES:
- Every headline must connect to the MENTAL PERFORMANCE side of car racing
- Use CAR RACING language: driver, turn, apex, braking zone, racing line, throttle, steering input, circuit, pit lane, grid, qualifying, cockpit, harness, pit wall, engineer
- NO MOTORCYCLE RACING — do NOT use MotoGP, BSB, WorldSBK, or any motorcycle-specific stories. This is a car racing driver audience.
- Related topics are welcome: neuroscience, peak performance, biometrics (HRV, EEG, wearables, sleep tracking), other sports (tennis, rugby, cycling, combat sports, Olympic athletes), technology, brain science, wearable health tech innovations
- Wearable tech stories (Garmin, Whoop, Oura, Apple Watch, GoPro) are HIGHLY VALUED — especially when they reveal data about sleep, recovery, stress, or performance that connects to what a racing driver experiences
- At least 2 stories should reference SPECIFIC real racing drivers or real race results
- At least 1 story should come from the wearable tech / health data world
- "Outside the paddock" stories must still bridge back to what a racing driver experiences on track

=== URL AND TITLE ACCURACY ===

- Use the accurate article title from the source. Do not invent or heavily paraphrase titles.
- Provide the real URL from your search results. Do not fabricate or simulate URLs.
- If no URL is available for a story, use an empty string "" for articleUrl.

Return a JSON array with 7 objects:
[
  {
    "pillarId": "${pillars[0]?.id || 'flow-state-confidence'}",
    "headline": "Compelling headline connecting the story to driver mental performance",
    "sourceArticle": "Accurate article title from the website",
    "articleUrl": "Real URL from your search results (never fabricated)",
    "source": "Publication name | Date published",
    "summary": "3 sentences describing the key finding of the article",
    "talkingPoints": ["Point 1", "Point 2", "Point 3"],
    "killerDataPoint": "The specific number, percentage, measurement, or direct quote that makes this article valuable. Must be concrete.",
    "emotionalHook": "What should the racing driver feel?",
    "mechanism": "Neuroscience mechanism referenced",
    "racingRelevance": "One sentence connecting to car racing on track, using car racing language (turn, apex, braking zone, throttle, steering input, the car, cockpit, harness, pit wall)",
    "contentBrief": "Type of post"
  }
]

Return ONLY the JSON array with exactly 7 items.`;

    return await callGeminiWithSearch(prompt, apiKey, true);
}


// ─── Generate a Single Post ──────────────────────────────────
export async function generatePost({ topic, pillar, framework, cta, authorityLine, apiKey, campaignDay = null, neurochemical = null }) {

    const campaignNote = campaignDay
        ? `\nCAMPAIGN POSITION: This is ${campaignDay.day} — Purpose: ${campaignDay.purpose}. Target emotion: ${campaignDay.emotion}. Word count: ${campaignDay.wordCount}.`
        : '';

    // Inject championship context into post generation
    const champCtx = getChampionshipContext();
    let raceWeekendNote = '';
    if (champCtx.hasLiveRacing) {
        raceWeekendNote = `\nRACE WEEKEND CONTEXT: There is live racing this weekend — ${champCtx.currentWeekend.map(e => `${e.flag} ${e.championship} at ${e.venue}`).join(', ')}. You may naturally reference this if relevant to the topic, but do NOT force it.`;
    } else if (champCtx.hasRecentResults) {
        raceWeekendNote = `\nRECENT RACE CONTEXT: Recent results available from ${champCtx.recent.map(e => `${e.flag} ${e.championship} at ${e.venue}`).join(', ')}. Reference if naturally relevant.`;
    }

    // Neurochemistry context if provided
    const chemNote = neurochemical
        ? `\nNEUROCHEMICAL FOCUS: ${neurochemical.name} (${neurochemical.nickname || neurochemical.label}) — ${neurochemical.description || neurochemical.whatItDoes}
When referencing this chemical in the post, describe how it manifests in racing: ${neurochemical.symptoms?.join(', ') || neurochemical.onTrack || ''}.`
        : '';

    const prompt = `Write a Facebook post AND an Instagram caption for Craig Muirhead / Camino Coaching using these parameters:

CONTENT PILLAR: ${pillar.name} — ${pillar.description}
FRAMEWORK: ${framework.name} — ${framework.hookStyle}
TOPIC / ANGLE: ${typeof topic === 'string' ? topic : topic.headline || topic}
${topic.talkingPoints ? `KEY POINTS: ${topic.talkingPoints.join(', ')}` : ''}
${topic.mechanism ? `MECHANISM TO REFERENCE: ${topic.mechanism}` : ''}
${topic.sourceArticle ? `SOURCE ARTICLE: ${topic.sourceArticle}` : ''}
${topic.racingRelevance ? `RACING RELEVANCE: ${topic.racingRelevance}` : ''}
${raceWeekendNote}
${chemNote}

AUTHORITY LINE TO WEAVE IN NATURALLY:
"${authorityLine}"

${(() => {
            // Try to get a review hook
            const reviews = REVIEW_GOLDMINE.filter(r => r.pillar === pillar.id || r.pillar === 'all');
            const review = reviews.length > 0 ? reviews[Math.floor(Math.random() * reviews.length)] : null;
            if (review && Math.random() < 0.25) {
                return `OPTIONAL REVIEW HOOK (use if it fits naturally, approximately 1 in 4 posts):
Reviewer: ${review.reviewer} (${review.location})
Quote: "${review.keyQuote}"
Hook angle: ${review.hookDerivation}
Format: Use as opening line in quotation marks with reviewer's first name. Then build the teaching content around this theme.
`;
            }
            return '';
        })()}

CTA TO APPEND (after ·· separator, completely unrelated to post body):
${cta.ctaTemplate}

CTA TRIGGER WORD: ${cta.triggerWord || cta.keyword || 'BLUEPRINT'}
${campaignNote}

THE 5-STEP WINNING FORMULA (follow this architecture):
1. HOOK (First Line): Start with a specific data point, research finding, or dramatic racing scenario. This is the ONLY line that matters for reach.
2. PROBLEM (Next 2-3 sentences): Ground it in a SPECIFIC racing scenario. Use turn numbers, session contexts (qualifying vs race), specific sensations (tyre grip, braking confidence). Never generic.
3. NEUROSCIENCE (Core Teaching): Explain WHY this happens in the brain. Reference the mechanism. Use plain language. Cite data. WOW not HOW: reveal what the problem is, NEVER the specific fix.
4. BRIDGE (Connection to Driver): Show how this pattern appears at every level. Reference real results or anonymised patterns. Make the reader feel seen.
5. CTA (Separated): After ·· separator. "Oh, by the way" or "Completely unrelated" or "PS". BLUEPRINT keyword included. "With or without you" energy.

RULES (racing driver Facebook / Instagram format):
- Use CAR RACING language throughout: driver, turn, apex, braking zone, racing line, throttle, steering input, circuit, pit lane, grid, qualifying, cockpit, harness, pit wall, engineer, stint. NEVER use motorcycle language (lean angle, body position, hanging off, the bike).
- UK English spelling throughout (colour, analyse, programme, tyre, favourite)
- WOW not HOW: Reveal the problem and why it happens. NEVER give the specific fix or methodology.
- Every post must reference a specific racing scenario (turn number, session context, tyre condition, grid position)
- Use real data: 808 PBs, 438 podiums, 159 wins, 118 drivers, 100+ circuits, 2,358 debriefs, 60 months, 4.9 Trustpilot (85 reviews)
- NEVER use em dashes or en dashes. Use commas or full stops instead.
- NEVER use ** or bullet symbols in the post body
- No emojis in the value section. Occasional use in CTA is acceptable.
- NEVER use generic coaching language: "mindset shift", "unlock your potential", "be your best self", "level up"
- Short paragraphs (1-2 sentences), mobile-first formatting
- End with an engagement question that drives comments

FACEBOOK VERSION:
- 200-400 words value content + CTA
- Long-form text. Optimise for SHARES (drives FB reach).

INSTAGRAM VERSION:
- 100-200 words caption. Shorter, punchier, more direct.
- Optimise for SAVES (drives IG reach).
- CTA uses comment keyword BLUEPRINT only (ManyChat delivery). No direct links.
- Include 3-5 niche hashtags at the end (#F1 #RacingDriver #MentalPerformance #FlowState #Motorsport)

DEAD ZONE RULES (never create these):
- No self-promotional announcements without value
- No testimonial-only posts without a teaching hook
- No sequence posts that assume the reader saw yesterday's content
- No generic motivational content that could apply to any sport
- No pure neuroscience explainers without a track-specific anchor

Format your response as:
=== FACEBOOK POST ===
[Facebook post text here]

=== INSTAGRAM CAPTION ===
[Instagram caption here]

=== IMAGE TEXT ===
[Suggest 1-2 lines of text for the image (max 12 words). Use the hook data point or most powerful stat.]`;

    return await callClaude(prompt, apiKey, false);
}

// ─── Generate Multiple Posts in Parallel ──────────────────────
export async function generatePosts(topics, config) {
    const { pillars, frameworks, ctas, authorityLines, apiKey, campaignDays, neurochemicals } = config;

    const promises = topics.map((topic, i) => {
        return generatePost({
            topic,
            pillar: pillars[i],
            framework: frameworks[i],
            cta: ctas[i],
            authorityLine: authorityLines[i],
            apiKey,
            campaignDay: campaignDays ? campaignDays[i] : null,
            neurochemical: neurochemicals ? neurochemicals[i] : null
        });
    });

    const results = await Promise.allSettled(promises);

    return results.map((result, i) => ({
        id: `post-${Date.now()}-${i}`,
        content: result.status === 'fulfilled' ? result.value : `Error generating post: ${result.reason}`,
        pillar: pillars[i],
        framework: frameworks[i],
        cta: ctas[i],
        authorityLine: authorityLines[i],
        topic: topics[i],
        status: result.status,
        imageUrl: '',
        edited: false,
        campaignDay: campaignDays ? campaignDays[i] : null,
        neurochemical: neurochemicals ? neurochemicals[i] : null
    }));
}

// ─── Regenerate a Single Post ─────────────────────────────────
export async function regeneratePost(post, apiKey) {
    const newContent = await generatePost({
        topic: post.topic,
        pillar: post.pillar,
        framework: post.framework,
        cta: post.cta,
        authorityLine: post.authorityLine,
        apiKey,
        campaignDay: post.campaignDay,
        neurochemical: post.neurochemical
    });
    return { ...post, content: newContent, edited: false };
}

// ─── Generate Video Script — Article-First Architecture ───────
// The video script MUST use the same source article as the text post.
// Article is the hook. Neurochemistry explains why. Bridge connects to driver.
export async function generateVideoScript({ topic, postContent, pillar, chemicalId, videoLength = '45-60s', platform = 'FB Reel + IG Reel', outputFormat = '9:16', apiKey }) {

    const chemContext = buildVideoScriptContext(chemicalId, typeof topic === 'string' ? topic : topic.headline || topic);

    // Get championship context for timely references
    const champCtx = getChampionshipContext();
    let raceNote = '';
    if (champCtx.hasLiveRacing) {
        raceNote = `\nRACE WEEKEND CONTEXT: Live racing this weekend — ${champCtx.currentWeekend.map(e => `${e.flag} ${e.championship} at ${e.venue}`).join(', ')}. Reference if naturally relevant.`;
    } else if (champCtx.hasRecentResults) {
        raceNote = `\nRECENT RACE CONTEXT: Recent results from ${champCtx.recent.map(e => `${e.flag} ${e.championship} at ${e.venue}`).join(', ')}.`;
    }

    // Build the source article context — this is the backbone of the video
    const headline = typeof topic === 'string' ? topic : (topic.headline || topic.topic || topic);
    const sourceArticle = topic?.sourceArticle || '';
    const articleUrl = topic?.articleUrl || '';
    const talkingPoints = topic?.talkingPoints || [];
    const mechanism = topic?.mechanism || '';
    const racingRelevance = topic?.racingRelevance || '';
    const emotionalHook = topic?.emotionalHook || '';

    const prompt = `You are Craig Muirhead's video content strategist. Write a complete video script for a ${videoLength} HeyGen avatar video.

CRITICAL RULE — ARTICLE-FIRST ARCHITECTURE:
The video script MUST be built on the same source article as the text post. The article is the hook. It is the borrowed authority. It is the reason people watch. The neurochemistry layer explains WHY the article's story works. The bridge connects it to the driver's experience and Camino Coaching data.

This is the formula that generated 19,217 reach on a single post: third-party authority first, your expertise second, CTA last.

THE SOURCE ARTICLE (this is the backbone — NOT optional background):
Headline: ${headline}
${sourceArticle ? `Source: ${sourceArticle}` : ''}
${articleUrl ? `URL: ${articleUrl}` : ''}
${talkingPoints.length > 0 ? `Key Points:\n${talkingPoints.map(p => `- ${p}`).join('\n')}` : ''}
${mechanism ? `Neuroscience Mechanism: ${mechanism}` : ''}
${racingRelevance ? `Racing Relevance: ${racingRelevance}` : ''}
${emotionalHook ? `Emotional Hook: ${emotionalHook}` : ''}
${pillar ? `Content Pillar: ${pillar.name} — ${pillar.description || ''}` : ''}

${postContent ? `THE TEXT POST (for context — the video should tell the same story in video format, not invent a new angle):\n${postContent.substring(0, 800)}\n` : ''}

PRODUCTION CONTEXT:
- This video uses AI avatar (Craig's likeness) narrating over a Manus slide deck
- Platform: ${platform}
- Output format: ${outputFormat}
- Target length: ${videoLength}
${raceNote}

${chemContext}

HOW TO USE THE ARTICLE IN THE VIDEO:
1. HOOK must reference the article directly. Name the person, the study, or the discovery from the article in the first sentence.
2. SCENARIO must include at least one named example from the article in the first 15 seconds. Show WHY this person/study is fascinating.
3. THE SCIENCE explains the brain chemistry behind WHY the article's story works. This is where the neurochemical layer adds depth.
4. THE COST quantifies what happens when drivers DON'T have this. Use Camino debrief data (2,358 debriefs, 118 drivers, 100+ circuits).
5. THE BRIDGE connects the article's insight to the driver watching. "After 2,358 performance debriefs, the pattern is identical in motorsport..."
6. CTA is casual and separate.

The viewer should watch a video about [the article's fascinating story] and walk away thinking about their own mental preparation on track.

RULES:
- Use UK English spelling throughout (colour, analyse, programme, tyre, favourite)
- Use CAR RACING language: driver, turn, apex, braking zone, racing line, throttle, steering input, circuit, pit lane, grid, qualifying, cockpit, stint
- NEVER use motorcycle language (lean angle, body position, hanging off, the bike)
- Write numbers out in full text for voice synthesis (e.g., "two thousand three hundred and fifty eight" not "2,358")
- WOW not HOW: Reveal the chemical and what it does. NEVER give the specific fix or programme methodology
- Warm, direct, confident tone. Like a trusted paddock insider talking to a mate.
- The article is NOT optional. It must appear in the HOOK and SCENARIO. If the article references a person, NAME THEM.

FORMAT YOUR RESPONSE EXACTLY LIKE THIS:

=== VIDEO SCRIPT ===
HOOK (0-5s):
[Open with the article. Name the person, study, or discovery. One scroll-stopping sentence that makes the viewer curious. This becomes text overlay on Slide 1.]

SCENARIO (5-15s):
[Expand on the article. Give the fascinating detail — what they did, what they found, why it matters. Then pivot: "Now think about your last qualifying session..." Connect to the driver's experience.]

THE SCIENCE (15-35s):
[Name the neurochemical. Explain WHY the article's story works at a brain chemistry level. One clear mechanism in plain language. This is where you add the science layer that the original article didn't have.]

THE COST (35-45s):
[Quantify the impact for a racing driver who doesn't understand this. Lap time, sector time, race position. Use Camino debrief data.]

THE BRIDGE (45-55s):
[Connect the article's insight to Camino Coaching data. "After two thousand two hundred and forty nine performance debriefs, the pattern is identical in motorsport..." Tease the solution. Never give the fix.]

CTA (55-60s):
[Casual, low-pressure. Comment BLUEPRINT and I will send you the free training.]

=== SLIDE DECK BRIEF (FOR MANUS) ===
Slide 1 — Hook: [The article reference. Bold text. Max 15 words.]
Slide 2 — The Story: [The fascinating detail from the article. Max 15 words.]
Slide 3 — The Pivot: [Connection to the driver's own racing. Max 15 words.]
Slide 4 — The Chemical: [Chemical name in accent colour. One-line description.]
Slide 5 — The Mechanism: [2-3 short bullet points of how it manifests on track.]
Slide 6 — The Data: [One big Camino stat. Large number + short label.]
Slide 7 — The Bridge: [Teaser line connecting the article to the solution.]
Slide 8 — CTA: [Comment BLUEPRINT + Camino Coaching branding.]

=== HEYGEN NOTES ===
[Avatar position, gesture suggestions, pace notes for this specific video.]

=== SOCIAL CAPTION ===
[A short Facebook/Instagram caption to post alongside the video. Reference the article. 50-100 words. Include CTA and 3-5 hashtags.]`;

    return await callClaude(prompt, apiKey, false);
}

// ─── Content Deduplication Storage ────────────────────────────────────────
const DEDUP_ARTICLES_KEY = 'driver-social-media-used-articles';
const DEDUP_HOOKS_KEY = 'driver-social-media-used-hooks';

function getUsedArticleUrls() {
    try {
        return JSON.parse(localStorage.getItem(DEDUP_ARTICLES_KEY) || '[]');
    } catch { return []; }
}

export function storeUsedArticles(topics) {
    const existing = getUsedArticleUrls();
    const newUrls = topics
        .filter(t => t.articleUrl)
        .map(t => ({ url: t.articleUrl, headline: t.headline, date: new Date().toISOString() }));
    const combined = [...existing, ...newUrls].slice(-60);
    localStorage.setItem(DEDUP_ARTICLES_KEY, JSON.stringify(combined));
}

function getUsedHooks() {
    try {
        return JSON.parse(localStorage.getItem(DEDUP_HOOKS_KEY) || '[]');
    } catch { return []; }
}

export function storeUsedHooks(posts) {
    const existing = getUsedHooks();
    const newHooks = posts
        .filter(p => p.content)
        .map(p => (p.content || '').split('\n')[0]);
    const combined = [...existing, ...newHooks].slice(-30);
    localStorage.setItem(DEDUP_HOOKS_KEY, JSON.stringify(combined));
}

function buildDeduplicationContext() {
    const usedUrls = getUsedArticleUrls();
    const usedHooks = getUsedHooks();
    let ctx = '';
    if (usedUrls.length > 0) {
        ctx += `\n\nDEDUPLICATION — DO NOT return any article from these previously used URLs:\n${usedUrls.map(a => a.url).join('\n')}\n`;
    }
    if (usedHooks.length > 0) {
        ctx += `\n\nDEDUPLICATION — DO NOT repeat or closely paraphrase these previously used hooks:\n${usedHooks.join('\n')}\n`;
    }
    return ctx;
}

// ─── Claude API Call (Anthropic) — Content Writing ──────────────────
async function callClaude(prompt, apiKey, parseJson = true) {
    if (!apiKey) {
        throw new Error('Claude API key not configured. Go to Settings to add your key.');
    }

    const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': apiKey,
            'anthropic-version': '2023-06-01',
            'anthropic-dangerous-direct-browser-access': 'true'
        },
        body: JSON.stringify({
            model: 'claude-sonnet-4-20250514',
            max_tokens: 4096,
            system: SYSTEM_PROMPT,
            messages: [{ role: 'user', content: prompt }],
            temperature: 0.85
        })
    });

    if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.error?.message || `Claude API error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.content?.[0]?.text?.trim();

    if (!content) {
        throw new Error('No content returned from Claude API.');
    }

    if (parseJson) {
        try {
            // Try to extract JSON array first (for topics, posts)
            const arrayMatch = content.match(/\[[\s\S]*\]/);
            if (arrayMatch) return JSON.parse(arrayMatch[0]);

            // Try to extract JSON object (for emails, single responses)
            const objectMatch = content.match(/\{[\s\S]*\}/);
            if (objectMatch) return JSON.parse(objectMatch[0]);

            // Try raw parse
            return JSON.parse(content);
        } catch (e) {
            throw new Error('Failed to parse Claude response as JSON. Please try again.');
        }
    }

    return content;
}

// ─── Gemini API Call with Google Search Grounding — Research ────
async function callGeminiWithSearch(prompt, apiKey, parseJson = true) {
    if (!apiKey) {
        throw new Error('Gemini API key not configured. Go to Settings to add your key.');
    }

    const dedupPrompt = prompt + buildDeduplicationContext();

    const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: dedupPrompt }] }],
                tools: [{ google_search: {} }],
                generationConfig: {
                    temperature: 0.8,
                    maxOutputTokens: 8192
                }
            })
        }
    );

    if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.error?.message || `Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    console.log('[Gemini] Raw response:', JSON.stringify(data).substring(0, 500));

    let content = '';
    if (data.candidates?.[0]?.content?.parts) {
        for (const part of data.candidates[0].content.parts) {
            if (part.text) content += part.text;
        }
    }

    // Extract REAL URLs from Gemini's grounding metadata
    const groundingChunks = [];
    try {
        const gm = data.candidates?.[0]?.groundingMetadata;
        console.log('[Gemini] groundingMetadata keys:', gm ? Object.keys(gm) : 'NONE');
        if (gm?.groundingChunks) {
            for (const chunk of gm.groundingChunks) {
                if (chunk.web?.uri) {
                    groundingChunks.push({ uri: chunk.web.uri, title: chunk.web.title || '' });
                }
            }
        }
        if (gm?.groundingSupports) {
            for (const support of gm.groundingSupports) {
                if (support.groundingChunkIndices) {
                    console.log(`[Gemini] Support: "${(support.segment?.text || '').substring(0, 80)}" → chunks: [${support.groundingChunkIndices.join(', ')}]`);
                }
            }
        }
    } catch (e) {
        console.warn('[Gemini] Error extracting grounding metadata:', e);
    }

    console.log(`[Gemini] Found ${groundingChunks.length} grounding chunks:`, groundingChunks.map(c => c.uri));

    // Strip markdown code fences if present
    content = content.replace(/```json\s*/gi, '').replace(/```\s*/g, '').trim();

    if (!content) {
        const blockReason = data.candidates?.[0]?.finishReason;
        const safetyRatings = data.candidates?.[0]?.safetyRatings;
        console.error('[Gemini] No content. Finish reason:', blockReason, 'Safety:', safetyRatings);

        // Auto-retry on RECITATION block (Gemini thinks response is too close to copyrighted text)
        if (blockReason === 'RECITATION' && !prompt.includes('[RETRY]')) {
            console.warn('[Gemini] RECITATION block — retrying with softer prompt...');
            const retryPrompt = prompt.replace(/copy.*?word.for.word/gi, 'use the accurate title')
                .replace(/EXACT/g, 'accurate')
                .replace(/never fabricat/gi, 'do not fabricat') + '\n\n[RETRY] Summarise your findings in your own words. Do not quote large blocks of text from articles.';
            return callGeminiWithSearch(retryPrompt, apiKey, parseJson);
        }

        throw new Error(`No content from Gemini (reason: ${blockReason || 'unknown'}). Try again.`);
    }

    if (parseJson) {
        try {
            const jsonMatch = content.match(/\[[\s\S]*\]/);
            let parsed = jsonMatch ? JSON.parse(jsonMatch[0]) : JSON.parse(content);

            if (Array.isArray(parsed)) {
                // Remove YouTube from grounding chunks
                const cleanChunks = groundingChunks.filter(gc =>
                    !gc.uri.includes('youtube.com') && !gc.uri.includes('youtu.be')
                );
                const usedChunkIdxs = new Set();

                console.log(`[URL] ${cleanChunks.length} grounding chunks available (YouTube filtered):`);
                cleanChunks.forEach((c, i) => console.log(`  [${i}] ${c.uri} — "${c.title}"`));

                // Helper: compute word similarity score between two strings
                const wordSimilarity = (textA, textB) => {
                    const stopWords = new Set(['the', 'and', 'for', 'that', 'this', 'with', 'from', 'was', 'are', 'has', 'have', 'its', 'been', 'were', 'will', 'their', 'what', 'when', 'how', 'not', 'but', 'they', 'about', 'more', 'than', 'into', 'over', 'also', 'after', 'just', 'most', 'only', 'some', 'very', 'could', 'would', 'should', 'which', 'where', 'other', 'each', 'both', 'does', 'here', 'there', 'even', 'your', 'said', 'like', 'made', 'back', 'much']);
                    const wordsA = textA.toLowerCase().replace(/[^a-z0-9\s]/g, '').split(/\s+/).filter(w => w.length > 2 && !stopWords.has(w));
                    const wordsB = textB.toLowerCase().replace(/[^a-z0-9\s]/g, '').split(/\s+/).filter(w => w.length > 2 && !stopWords.has(w));
                    if (wordsA.length === 0 || wordsB.length === 0) return 0;
                    const overlap = wordsA.filter(w => wordsB.includes(w)).length;
                    return overlap / Math.max(Math.min(wordsA.length, wordsB.length), 1);
                };

                // Score ALL stories against ALL chunks, then assign best matches
                const storyScores = parsed.map((item, idx) => {
                    const url = item.articleUrl || '';

                    // Strip YouTube
                    if (url.includes('youtube.com') || url.includes('youtu.be')) {
                        item.articleUrl = '';
                    }

                    // If Gemini provided a valid, real URL — keep it
                    if (item.articleUrl && !item.articleUrl.includes('grounding-api-redirect') &&
                        !item.articleUrl.includes('googleapis.com') &&
                        (item.articleUrl.startsWith('http://') || item.articleUrl.startsWith('https://'))) {
                        item.urlMatchMethod = 'gemini-direct';
                        console.log(`[URL] Story ${idx + 1}: ✅ Gemini-provided URL → ${item.articleUrl}`);
                        for (let ci = 0; ci < cleanChunks.length; ci++) {
                            if (cleanChunks[ci].uri === item.articleUrl) {
                                usedChunkIdxs.add(ci);
                                item.groundingTitle = cleanChunks[ci].title || '';
                                break;
                            }
                        }
                        return null;
                    }

                    // Build combined text for matching
                    const storyText = `${item.headline || ''} ${item.sourceArticle || ''} ${item.emotionalHook || ''} ${item.racingRelevance || ''}`;

                    // Score each chunk
                    const chunkScores = cleanChunks.map((chunk, ci) => {
                        const chunkText = `${chunk.title || ''}`;
                        const chunkUri = chunk.uri || '';

                        let score = 0;
                        let method = '';

                        // Domain match
                        try {
                            const domain = new URL(chunkUri).hostname.replace('www.', '').split('.')[0];
                            const srcLower = (item.sourceArticle || '').toLowerCase().replace(/[\s\-\.]/g, '');
                            if (domain.length > 2 && srcLower.includes(domain)) {
                                score += 0.5;
                                method = 'domain-match';
                            }
                        } catch { }

                        // Title similarity
                        const titleScore = wordSimilarity(storyText, chunkText);
                        score += titleScore;
                        if (titleScore > 0.3 && !method) method = 'title-match';

                        // URL path keyword match
                        try {
                            const pathWords = new URL(chunkUri).pathname.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter(w => w.length > 3);
                            const headWords = (item.headline || '').toLowerCase().replace(/[^a-z0-9\s]/g, '').split(/\s+/).filter(w => w.length > 3);
                            const pathOverlap = headWords.filter(w => pathWords.some(pw => pw.includes(w) || w.includes(pw))).length;
                            if (pathOverlap > 0) {
                                score += pathOverlap * 0.15;
                                if (!method) method = 'path-match';
                            }
                        } catch { }

                        if (!method && score > 0) method = 'fuzzy-match';

                        return { ci, score, method, chunkTitle: chunk.title || '', chunkUri };
                    });

                    return { idx, chunkScores: chunkScores.sort((a, b) => b.score - a.score) };
                }).filter(Boolean);

                // Assign best matches, prioritising highest scores first
                storyScores.sort((a, b) => (b.chunkScores[0]?.score || 0) - (a.chunkScores[0]?.score || 0));

                for (const story of storyScores) {
                    const item = parsed[story.idx];
                    let assigned = false;

                    for (const cs of story.chunkScores) {
                        if (usedChunkIdxs.has(cs.ci)) continue;
                        if (cs.score <= 0) continue;

                        usedChunkIdxs.add(cs.ci);
                        item.articleUrl = cs.chunkUri;
                        item.groundingTitle = cs.chunkTitle;
                        item.urlMatchScore = cs.score;

                        if (cs.method === 'domain-match' || cs.score >= 0.5) {
                            item.urlMatchMethod = 'domain-match';
                        } else if (cs.score >= 0.25) {
                            item.urlMatchMethod = 'title-match';
                        } else {
                            item.urlMatchMethod = 'best-guess';
                        }

                        console.log(`[URL] Story ${story.idx + 1}: ${cs.score >= 0.25 ? '✅' : '🟡'} ${item.urlMatchMethod} (score: ${cs.score.toFixed(2)}) → ${cs.chunkUri}`);
                        assigned = true;
                        break;
                    }

                    if (!assigned) {
                        for (let ci = 0; ci < cleanChunks.length; ci++) {
                            if (!usedChunkIdxs.has(ci)) {
                                usedChunkIdxs.add(ci);
                                item.articleUrl = cleanChunks[ci].uri;
                                item.groundingTitle = cleanChunks[ci].title || '';
                                item.urlMatchMethod = 'best-guess';
                                item.urlMatchScore = 0;
                                console.warn(`[URL] Story ${story.idx + 1}: 🟡 best-guess → ${cleanChunks[ci].uri}`);
                                assigned = true;
                                break;
                            }
                        }
                    }

                    if (!assigned) {
                        item.articleUrl = '';
                        item.urlMatchMethod = 'unverified';
                        console.warn(`[URL] Story ${story.idx + 1}: ⚠️ No grounding chunk available`);
                    }
                }
            }

            return parsed;
        } catch (e) {
            console.error('[Gemini] JSON parse failed. Content:', content.substring(0, 500));
            throw new Error('Failed to parse Gemini response as JSON. Try again.');
        }
    }

    return content;
}

// ─── HeyGen Video Generation API ─────────────────────────────────────
export async function generateHeyGenVideo({ script, avatarId, voiceId, apiKey }) {
    if (!apiKey) {
        throw new Error('HeyGen API key not configured. Go to Settings to add your key.');
    }

    // Parse the script sections into scenes
    const sections = ['HOOK', 'SCENARIO', 'THE SCIENCE', 'THE COST', 'THE BRIDGE', 'CTA'];
    const scenes = sections.map((section, i) => {
        const regex = new RegExp(`${section}[^:]*:\\\\s*([\\\\s\\\\S]*?)(?=${sections[i + 1] ? sections[i + 1] : '==='}|$)`);
        const match = script.match(regex);
        const text = (match?.[1] || '').trim();
        return {
            scene_type: 'talking_photo',
            character: {
                type: 'avatar',
                avatar_id: avatarId || 'default',
                voice: { type: 'text', voice_id: voiceId || 'default', input_text: text }
            },
            background: { type: 'color', value: '#0A1628' }
        };
    }).filter(s => s.character.voice.input_text);

    const response = await fetch('https://api.heygen.com/v2/video/generate', {
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
        throw new Error(error.message || `HeyGen API error: ${response.status}`);
    }

    const data = await response.json();
    return data.data?.video_id || data.video_id;
}

// ─── HeyGen Video Status Check ───────────────────────────────────────
export async function checkHeyGenVideoStatus(videoId, apiKey) {
    const response = await fetch(`https://api.heygen.com/v1/video_status.get?video_id=${videoId}`, {
        headers: { 'X-Api-Key': apiKey }
    });

    if (!response.ok) {
        throw new Error(`HeyGen status check failed: ${response.status}`);
    }

    const data = await response.json();
    return {
        status: data.data?.status || 'unknown',
        videoUrl: data.data?.video_url || null,
        thumbnailUrl: data.data?.thumbnail_url || null
    };
}

// ─── Generate Email Copy (Claude) ─────────────────────────────
export async function generateEmail({ topic, pillar, cta, postContent, apiKey }) {
    const articleTitle = topic?.sourceArticle || topic?.headline || '';
    const articleUrl = topic?.articleUrl || '';
    const killerDataPoint = topic?.killerDataPoint || '';
    const summary = topic?.summary || '';
    const racingRelevance = topic?.racingRelevance || '';
    const mechanism = topic?.mechanism || '';
    const source = topic?.source || '';
    const talkingPoints = topic?.talkingPoints || [];

    const prompt = `You are Craig Muirhead, writing a detailed nurture email to your list of racing drivers. This email is built around a specific article you found during your weekly research.

TOPIC: ${topic?.headline || topic || 'Mental performance in car racing'}
PILLAR: ${pillar?.name || 'Mental Performance'} — ${pillar?.description || ''}
CTA: Podium Contenders Blueprint — Trigger: BLUEPRINT

=== THE SOURCE ARTICLE (use this as the backbone of the email) ===
${articleTitle ? `ARTICLE TITLE: ${articleTitle}` : ''}
${source ? `SOURCE: ${source}` : ''}
${articleUrl ? `URL: ${articleUrl}` : ''}
${summary ? `SUMMARY: ${summary}` : ''}
${killerDataPoint ? `KILLER DATA POINT: "${killerDataPoint}"` : ''}
${mechanism ? `NEUROSCIENCE MECHANISM: ${mechanism}` : ''}
${racingRelevance ? `RACING RELEVANCE: ${racingRelevance}` : ''}
${talkingPoints.length > 0 ? `KEY TALKING POINTS:\n${talkingPoints.map(p => '- ' + p).join('\n')}` : ''}

${postContent ? `RELATED SOCIAL POST (for voice/angle reference — do NOT copy):\n${postContent.substring(0, 600)}\n` : ''}

WRITE A DETAILED EMAIL (400-600 words). This is a proper article-style email that delivers genuine value. The reader should feel like they learned something specific.

EMAIL STRUCTURE:
1. HOOK (1-2 sentences): Open with the article's most fascinating finding. Name the study, researcher, or driver. Make them curious.
2. THE ARTICLE INSIGHT (3-5 sentences): Share the key finding in detail. Use the killer data point. Explain what the researchers/drivers discovered and WHY it matters.
3. THE NEUROSCIENCE (3-4 sentences): Explain the brain mechanism behind this finding. Reference ${mechanism || 'the relevant neuroscience'}. Use plain language.
4. THE RACING SCENARIO (3-4 sentences): Paint a vivid, specific car racing scenario where this exact pattern plays out. Turn numbers, session context (qualifying vs race), physical sensations (G-force, braking, tyre grip, steering input). Show the reader THEIR experience through the lens of this research.
5. THE DATA BRIDGE (2-3 sentences): Connect to Camino Coaching debrief data. "After 2,358 debriefs..." Show the pattern is real and measurable.
6. THE CTA (2-3 sentences): Separated by ·· — casual, unrelated. "Oh, by the way..." Direct link to Blueprint.

RULES:
- UK English throughout (colour, analyse, programme, tyre, favourite)
- Use CAR RACING language: driver, turn, apex, braking zone, steering input, cockpit, harness, pit wall, throttle application, session, qualifying, grid, paddock, the car
- WOW not HOW: reveal the problem and neuroscience, NEVER the specific fix or methodology
- Reference the source article by name — this is borrowed authority
- Include the killer data point prominently
- Write like you're talking to a mate in the paddock — direct, warm, data-driven
- NEVER use em dashes or en dashes. Use commas or full stops instead.
- No emojis except occasionally in CTA section
- Short paragraphs (1-3 sentences), mobile-friendly formatting

OUTPUT FORMAT (return as JSON):
{
  "subject": "Email subject line (max 50 chars, curiosity-driven, lowercase feel)",
  "preheader": "Preview text (max 80 chars, complements subject, teases the data point)",
  "hook": "Opening 1-2 sentences — reference the article directly. Name it.",
  "articleInsight": "3-5 sentences expanding on the article's key finding. Include the killer data point.",
  "dataHighlight": "The single killer data point or quote, formatted as a standalone callout",
  "problem": "3-4 sentences: the neuroscience mechanism explained in plain language.",
  "racingScenario": "3-4 sentences: vivid car racing scenario where this plays out. Turn numbers, session context, sensations.",
  "bridge": "2-3 sentences: connect to Camino debrief data. Tease the solution without giving it away.",
  "ctaText": "CTA button text (max 5 words, action-oriented)",
  "ctaUrl": "${cta?.url || 'https://academy.caminocoaching.co.uk/podium-contenders-blueprint/order/'}",
  "signoff": "Short sign-off line before the name (1 sentence, personal)"
}

Return ONLY the JSON object. No markdown, no code fences.`;

    const result = await callClaude(prompt, apiKey, true);

    if (Array.isArray(result)) {
        return result[0];
    }
    return result;
}

// ─── Render Email as GHL-Compatible HTML ─────────────────────
export function renderEmailHTML(emailData, pillar) {
    const {
        subject = 'From the paddock...',
        preheader = '',
        hook = '',
        articleInsight = '',
        dataHighlight = '',
        problem = '',
        racingScenario = '',
        bridge = '',
        ctaText = 'Get the Blueprint',
        ctaUrl = 'https://academy.caminocoaching.co.uk/podium-contenders-blueprint/order/',
        signoff = 'Speak soon'
    } = emailData;

    const pillarColor = pillar?.color || '#00BFA5';

    return `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title>${subject}</title>
<!--[if !mso]><!-->
<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
</style>
<!--<![endif]-->
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { margin: 0; padding: 0; background-color: #0D1117; font-family: 'Inter', Arial, Helvetica, sans-serif; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
  table { border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
  img { display: block; outline: none; text-decoration: none; border: 0; }
  a { color: #00BFA5; text-decoration: none; }
  @media only screen and (max-width: 620px) {
    .container { width: 100% !important; padding: 0 16px !important; }
    .content { padding: 28px 20px !important; }
    .cta-btn { display: block !important; text-align: center !important; }
    h1 { font-size: 22px !important; }
  }
</style>
</head>
<body style="margin:0;padding:0;background-color:#0D1117;">
<div style="display:none;max-height:0;overflow:hidden;mso-hide:all;">${preheader}</div>

<!-- Wrapper -->
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#0D1117;">
<tr><td align="center" style="padding:24px 0;">

<!-- Container -->
<table role="presentation" class="container" width="580" cellpadding="0" cellspacing="0" style="max-width:580px;width:100%;">

<!-- Header Bar -->
<tr><td style="padding:0 0 2px 0;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td style="background:linear-gradient(90deg,${pillarColor},#00BFA5);height:4px;border-radius:4px 4px 0 0;"></td>
    </tr>
  </table>
</td></tr>

<!-- Main Content Card -->
<tr><td class="content" style="background-color:#0A1628;padding:36px 32px;border-radius:0 0 8px 8px;">

  <!-- Logo/Brand -->
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
    <tr><td style="padding-bottom:24px;border-bottom:1px solid rgba(255,255,255,0.06);">
      <span style="font-size:13px;font-weight:700;color:#00BFA5;letter-spacing:1.5px;text-transform:uppercase;">CAMINO COACHING</span>
    </td></tr>
  </table>

  <!-- Hook -->
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
    <tr><td style="padding:28px 0 0 0;">
      <h1 style="font-size:24px;font-weight:700;color:#F0F6FC;line-height:1.3;margin:0;">${hook}</h1>
    </td></tr>
  </table>

  ${articleInsight ? `
  <!-- Article Insight -->
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
    <tr><td style="padding:20px 0 0 0;">
      <p style="font-size:15px;line-height:1.7;color:#C8D1DC;margin:0;">${articleInsight}</p>
    </td></tr>
  </table>` : ''}

  ${dataHighlight ? `
  <!-- Killer Data Point Callout -->
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
    <tr><td style="padding:24px 0 0 0;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:rgba(218,165,32,0.08);border-left:4px solid #DAA520;border-radius:0 6px 6px 0;">
        <tr><td style="padding:16px 20px;">
          <p style="font-size:16px;line-height:1.5;color:#F0F6FC;font-weight:600;margin:0;">"${dataHighlight}"</p>
        </td></tr>
      </table>
    </td></tr>
  </table>` : ''}

  <!-- Neuroscience -->
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
    <tr><td style="padding:20px 0 0 0;">
      <p style="font-size:15px;line-height:1.7;color:#B0BAC5;margin:0;">${problem}</p>
    </td></tr>
  </table>

  ${racingScenario ? `
  <!-- Racing Scenario -->
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
    <tr><td style="padding:20px 0 0 0;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:rgba(0,191,165,0.06);border-left:4px solid #00BFA5;border-radius:0 6px 6px 0;">
        <tr><td style="padding:16px 20px;">
          <p style="font-size:15px;line-height:1.65;color:#C8D1DC;margin:0;font-style:italic;">${racingScenario}</p>
        </td></tr>
      </table>
    </td></tr>
  </table>` : ''}

  <!-- Bridge -->
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
    <tr><td style="padding:20px 0 0 0;">
      <p style="font-size:15px;line-height:1.65;color:#D1D5DB;font-weight:600;margin:0;font-style:italic;">${bridge}</p>
    </td></tr>
  </table>

  <!-- CTA Button -->
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
    <tr><td style="padding:28px 0 0 0;" align="center">
      <table role="presentation" cellpadding="0" cellspacing="0">
        <tr><td class="cta-btn" style="background-color:#00BFA5;border-radius:6px;padding:14px 32px;">
          <a href="${ctaUrl}" target="_blank" style="color:#0A1628;font-size:15px;font-weight:700;text-decoration:none;display:inline-block;letter-spacing:0.5px;">${ctaText}</a>
        </td></tr>
      </table>
    </td></tr>
  </table>

  <!-- Sign-off -->
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
    <tr><td style="padding:28px 0 0 0;border-top:1px solid rgba(255,255,255,0.06);margin-top:28px;">
      <p style="font-size:14px;line-height:1.5;color:#8B949E;margin:0 0 4px 0;">${signoff}</p>
      <p style="font-size:14px;font-weight:700;color:#F0F6FC;margin:0;">Craig Muirhead</p>
      <p style="font-size:12px;color:#00BFA5;margin:2px 0 0 0;">Camino Coaching — Racing Driver Mental Performance</p>
    </td></tr>
  </table>

</td></tr>

<!-- Footer -->
<tr><td style="padding:20px 0 0 0;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
    <tr><td align="center" style="padding:12px 0;">
      <p style="font-size:11px;color:#484F58;margin:0;">
        You're receiving this because you signed up for mental performance insights for racing drivers.
        <br><a href="{{unsubscribe_link}}" style="color:#484F58;text-decoration:underline;">Unsubscribe</a> · <a href="{{preferences_link}}" style="color:#484F58;text-decoration:underline;">Email preferences</a>
      </p>
      <p style="font-size:11px;color:#30363D;margin:8px 0 0 0;">
        © ${new Date().getFullYear()} Camino Coaching · caminocoaching.co.uk
      </p>
    </td></tr>
  </table>
</td></tr>

</table>
<!-- /Container -->

</td></tr>
</table>
<!-- /Wrapper -->

</body>
</html>`;
}

// ─── Generate Image Prompt ───────────────────────────────────
export function generateImagePrompt(post) {
    return `Create a professional, editorial-quality car racing photograph for a Facebook/Instagram post about "${post.pillar.name}".
    Style: Photorealistic, shot on Canon EOS R5, 85mm f/1.4 lens, shallow depth of field, natural lighting, 8K resolution.
        Setting: Racing circuit, pit lane, garage, grid walk, parc fermé — authentic motorsport environment.
            Theme: ${post.pillar.description}.
Mood: Intense, authentic, professional motorsport. The driver experience.
No text overlay. No watermark. No logos. No writing on image. No identifiable faces of real drivers. No identifiable liveries or numbers.
Square format (1:1) for social media.`;
}
