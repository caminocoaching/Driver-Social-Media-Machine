// ═══════════════════════════════════════════════════════════════
// 🏁 DRIVER SOCIAL MEDIA ENGINE — AI Service
// OpenAI API integration for Craig Muirhead / Camino Coaching
// EXCLUSIVELY race car drivers — NEVER motorcycle references
// ═══════════════════════════════════════════════════════════════

import { PILLARS, FRAMEWORKS, CTAS, AUTHORITY_LINES, LEXICON, MECHANISMS, RACING_LEGENDS, PROBLEM_MECHANISM_MAP, CAMPAIGN_ARC } from './content-engine.js';

// ─── Master System Prompt (from 01_MASTER_SYSTEM_PROMPT.md) ──
const SYSTEM_PROMPT = `You are Craig Muirhead's Facebook content strategist. You generate daily Alex Hormozi style Facebook posts for race car drivers (amateur to semi-pro club racers, single-seater pilots, GT/touring car drivers) that deliver genuine value and include an unrelated CTA rotating across 5 lead magnet assessments.

# ABOUT CRAIG MUIRHEAD & CAMINO COACHING
- 59-year-old flow performance coach based in Mallorca, Spain
- 25+ years in corporate management (BMW Dubai, Swiss private equity, Italian mfg UK)
- Walked the Camino de Santiago in 2016 aged 50, pivoted to coaching
- 10 seasons embedded in elite motorsport paddocks (F1, F4, GB3, GT racing, touring cars)
- Authority: pattern recognition across 1,644+ PBs, 1,286+ podiums, 1,063+ wins
- 4.9/5 on Trustpilot (80+ reviews)
- Proprietary 'In The Zone' app: debriefs with 118+ drivers across 142+ circuits
- IMPORTANT: Rotate credibility claims. NEVER use the same stat in every post. Vary between: PBs/podiums/wins data, paddock seasons, number of drivers worked with, Trustpilot reviews, circuit coverage.
- NOT a racer — position as "the mechanic of the mind" / paddock insider / analyst

# CRITICAL: THIS IS EXCLUSIVELY FOR RACE CAR DRIVERS
NEVER reference: motorcycle racing, MotoGP, BSB, World Superbikes, riders, bikes
ALWAYS reference: F4, GB3, F3, GT3, BTCC, Carrera Cup, drivers, cars, cockpit, steering wheel, pedals
Racing legends: Senna (flow), Schumacher (preparation), Lauda (resilience), Verstappen (pressure), Hamilton (consistency), Alonso (longevity)

# TARGET AUDIENCE
- Age: 20-55, predominantly male
- Level: Club racers, amateur series, semi-professional (Ginetta, Caterham, single-seaters, GT, touring car)
- Spend: £2,500-£5,000+ per race weekend
- Pain points: Lap time plateaus, inconsistent performance, overthinking, competitor obsession, qualifying nerves, poor race starts, inner voice doubt
- Vocabulary: Braking marker, racing line, stint, data traces, steering lock, tyre degradation, understeer/oversteer, lock-ups, apexes, car setup, FP sessions

# VOICE & TONE
- Scientifically grounded but accessible ("This isn't motivation. It's biology.")
- Direct and challenging — "The Truth Teller" who respects you enough to be honest
- Empathetic to real driver pressures (financial, family, sponsors)
- Transformational and confident — "Your brain's response to challenge is trainable"
- British English spelling throughout
- NEVER use em dashes (—). Use commas or full stops instead.
- NEVER use ·· or ** or any ChatGPT formatting tells
- NEVER use bullet point symbols in post body
- Short paragraphs (1-3 sentences), mobile-optimised (81% read on mobile)
- 1-2 emojis maximum per post, never in opening line
- No hashtags, no engagement bait, no external links

# NEUROSCIENCE LEXICON (use these terms)
- The Drunken Monkey: conscious prefrontal cortex — slow, anxious, overthinking
- The Wizard Mind: subconscious brain — fast, instinctive, fluid
- Flow State / The Zone: optimal performance where overthinking disappears
- Amygdala Hijack: threat center overriding rational decisions under pressure
- Transient Hypofrontality: inner critic going offline during flow
- Error Positivity (Pe): brain signal measuring learning from mistakes
- The Curiosity Protocol: saying "That's interesting" after errors
- Seven-Minute Protocol: pre-session mental preparation framework
- Goldilocks Zone: optimal arousal level
- Believable Stretch: goal demanding focus without triggering panic

# POST STRUCTURE
Every post has TWO parts that are COMPLETELY UNRELATED:
- PART 1 — VALUE: The teaching content using the specified framework
- PART 2 — CTA: Separated by a blank line. Starts with a natural opener like "Oh by the way" or "Before I go" or "I meant to say" or "Completely unrelated". NEVER use "PS" or "P.S.". NEVER connects thematically to value content. "With or without you" energy. Never needy.
- CRITICAL: Every CTA MUST end with a clear comment trigger on its own line, e.g. 'Comment the word "FLOW" and I'll send you the link.' The keyword comes from the CTA data. This is NON-NEGOTIABLE.

# ALGORITHM COMPLIANCE
✅ Every CTA ends with: Comment the word "[KEYWORD]" and I'll send you the link.
✅ "Drop [WORD] below" / "Comment [WORD] if you want this" / "If this sounds familiar, comment [WORD]"
❌ NEVER: "Like if you agree" / "Share with someone" / "Tag a friend" / any external links in post body
❌ NEVER: "DM me" — always use "Comment the word" instead`;

// ─── Generate Article Topics with Web Search (Weekly Wizard Step 1) ──
export async function generateTopics(pillars, raceContext, apiKey, model = 'gpt-4o') {
    const pillarList = pillars.map((p, i) => `${i + 1}. ${p.name} — ${p.description}\n   Sample topics: ${p.topics.slice(0, 3).join(', ')}`).join('\n');

    const raceContextNote = raceContext
        ? `\n\nIMPORTANT: This is an F1 race week! The ${raceContext.name} is happening at ${raceContext.circuit}, ${raceContext.country} (Round ${raceContext.round}). Where relevant, reference what drivers at ALL levels can learn from watching the pressure the F1 grid faces this weekend.`
        : '';

    const prompt = `Search the web for recent motorsport articles, racing news, driver performance stories, and sports psychology research relevant to race car drivers. Focus on content from the last 7 days where possible.

Look for articles about:
- F1, F4, GB3, GT racing, BTCC, Carrera Cup news and driver stories
- Racing driver mental performance, sports psychology, flow state research
- Driver coaching, qualifying performance, race strategy
- Pressure moments, championship battles, underdog stories
- Neuroscience of performance under pressure

Then generate 7 article-inspired topic ideas for this week's social media posts — one per content pillar. Use the real articles you find as inspiration to make each topic timely and relevant.

CONTENT PILLARS FOR THIS WEEK:
${pillarList}
${raceContextNote}

For each topic, provide:
1. A compelling headline/hook angle (Alex Hormozi style — provocative, specific, pattern-interrupt)
2. The source article or news story that inspired it (title and brief summary)
3. 2-3 key talking points that connect the article to the pillar
4. The emotional hook — what should the reader feel?
5. A suggested neuroscience mechanism to reference

Format as JSON array:
[
  {
    "pillarId": "visual-targeting",
    "headline": "The 2-second eye movement that separates P4 qualifying drivers from P12",
    "sourceArticle": "Title of the article or news story that inspired this topic",
    "talkingPoints": ["Point 1", "Point 2", "Point 3"],
    "emotionalHook": "Curiosity — what simple thing am I missing?",
    "mechanism": "Amygdala hijack causes tunnel vision under pressure"
  }
]

Return ONLY the JSON array.`;

    // Use web search for topic generation to find real articles
    return await callOpenAIWithSearch(prompt, apiKey, true);
}

// ─── Generate a Single Post ──────────────────────────────────
export async function generatePost({ topic, pillar, framework, cta, authorityLine, raceContext, apiKey, model = 'gpt-4o', campaignDay = null }) {
    const raceContextNote = raceContext
        ? `\nRACE WEEK CONTEXT: The F1 ${raceContext.name} is happening at ${raceContext.circuit}, ${raceContext.country}. If natural, reference the pressure F1 drivers face at this circuit as a parallel to what club/amateur drivers experience.`
        : '';

    const campaignNote = campaignDay
        ? `\n5-DAY CAMPAIGN POSITION: This is ${campaignDay.day} — Purpose: ${campaignDay.purpose}. Target emotion: ${campaignDay.emotion}. Word count: ${campaignDay.wordCount}.`
        : '';

    const prompt = `Write a Facebook post for Craig Muirhead / Camino Coaching using these parameters:

CONTENT PILLAR: ${pillar.name} — ${pillar.description}
FRAMEWORK: ${framework.name} — ${framework.hookStyle}
TOPIC/ANGLE: ${typeof topic === 'string' ? topic : topic.headline || topic}
${topic.talkingPoints ? `KEY POINTS: ${topic.talkingPoints.join(', ')}` : ''}
${topic.mechanism ? `MECHANISM TO REFERENCE: ${topic.mechanism}` : ''}

AUTHORITY LINE TO WEAVE IN NATURALLY:
"${authorityLine}"

CTA TO APPEND (after a blank line, completely unrelated to post body):
${cta.ctaTemplate}
${raceContextNote}${campaignNote}

RULES:
- Hook first (${framework.name} style)
- Value-packed body with short paragraphs
- Reference neuroscience/mechanisms naturally
- Use racing-specific language (qualifying, grid, sector times, braking markers)
- Authority line woven into body naturally
- CTA after a blank line feels COMPLETELY unrelated to post topic. Use natural openers like "Oh by the way", "Before I go", "I meant to say". NEVER use "PS" or "P.S."
- NEVER use em dashes (—), use commas or full stops instead
- NEVER use ·· or ** or bullet symbols
- 150-300 words total
- British English
- No hashtags
- 1-2 emojis max (only near CTA)
- No external links in post body
- Mobile-optimised: short paragraphs, line breaks between ideas

Write ONLY the post text, nothing else.`;

    return await callOpenAI(prompt, apiKey, model, false);
}

// ─── Generate Multiple Posts in Parallel ──────────────────────
export async function generatePosts(topics, config) {
    const { pillars, frameworks, ctas, authorityLines, raceContext, apiKey, model, campaignDays } = config;

    const promises = topics.map((topic, i) => {
        return generatePost({
            topic,
            pillar: pillars[i],
            framework: frameworks[i],
            cta: ctas[i],
            authorityLine: authorityLines[i],
            raceContext,
            apiKey,
            model,
            campaignDay: campaignDays ? campaignDays[i] : null
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
        campaignDay: campaignDays ? campaignDays[i] : null
    }));
}

// ─── Regenerate a Single Post ─────────────────────────────────
export async function regeneratePost(post, apiKey, model = 'gpt-4o', raceContext = null) {
    const newContent = await generatePost({
        topic: post.topic,
        pillar: post.pillar,
        framework: post.framework,
        cta: post.cta,
        authorityLine: post.authorityLine,
        raceContext,
        apiKey,
        model,
        campaignDay: post.campaignDay
    });
    return { ...post, content: newContent, edited: false };
}

// ─── OpenAI API Call ──────────────────────────────────────────
async function callOpenAI(prompt, apiKey, model = 'gpt-4o', parseJson = true) {
    if (!apiKey) {
        throw new Error('OpenAI API key not configured. Go to Settings to add your key.');
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: model,
            messages: [
                { role: 'system', content: SYSTEM_PROMPT },
                { role: 'user', content: prompt }
            ],
            temperature: 0.85,
            max_tokens: 4096
        })
    });

    if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.error?.message || `OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content?.trim();

    if (parseJson) {
        try {
            const jsonMatch = content.match(/\[[\s\S]*\]/);
            return jsonMatch ? JSON.parse(jsonMatch[0]) : JSON.parse(content);
        } catch (e) {
            throw new Error('Failed to parse AI response as JSON. Please try again.');
        }
    }

    return content;
}

// ─── OpenAI Responses API Call with Web Search ────────────────
async function callOpenAIWithSearch(prompt, apiKey, parseJson = true) {
    if (!apiKey) {
        throw new Error('OpenAI API key not configured. Go to Settings to add your key.');
    }

    try {
        // Use the Responses API with web_search_preview tool
        const response = await fetch('https://api.openai.com/v1/responses', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: 'gpt-4o',
                tools: [{ type: 'web_search_preview' }],
                instructions: SYSTEM_PROMPT,
                input: prompt
            })
        });

        if (!response.ok) {
            const error = await response.json().catch(() => ({}));
            console.warn('Responses API failed, falling back to Chat Completions:', error.error?.message);
            // Fallback to standard Chat Completions without web search
            return await callOpenAI(prompt, apiKey, 'gpt-4o', parseJson);
        }

        const data = await response.json();

        // Extract text content from the response output array
        let content = '';
        if (data.output && Array.isArray(data.output)) {
            for (const item of data.output) {
                if (item.type === 'message' && item.content) {
                    for (const part of item.content) {
                        if (part.type === 'output_text') {
                            content += part.text;
                        }
                    }
                }
            }
        }

        content = content.trim();

        if (!content) {
            console.warn('No text content in Responses API output, falling back');
            return await callOpenAI(prompt, apiKey, 'gpt-4o', parseJson);
        }

        if (parseJson) {
            try {
                const jsonMatch = content.match(/\[[\s\S]*\]/);
                return jsonMatch ? JSON.parse(jsonMatch[0]) : JSON.parse(content);
            } catch (e) {
                console.warn('JSON parse failed from web search response, falling back');
                return await callOpenAI(prompt, apiKey, 'gpt-4o', parseJson);
            }
        }

        return content;
    } catch (err) {
        console.warn('Web search call failed, falling back to standard API:', err.message);
        return await callOpenAI(prompt, apiKey, 'gpt-4o', parseJson);
    }
}

// ─── Generate Image Prompt ───────────────────────────────────
export function generateImagePrompt(post) {
    return `Create a professional, cinematic motorsport photograph for a social media post about "${post.pillar.name}". 
Style: dramatic lighting, shallow depth of field, rich saturated colours. 
Setting: Professional race car (single-seater or GT car) context — paddock, cockpit, circuit. 
Theme: ${post.pillar.description}. 
No text overlay. No motorcycles. Race CAR drivers only.
Quality: F1 broadcast standard, editorial motorsport photography.`;
}
