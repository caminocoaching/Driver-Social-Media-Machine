"""
AI Service — Gemini (Research with Google Search) + Claude (Writing)
Uses raw requests (matching the original JS fetch approach)
"""
import json
import re
import requests
from .content_engine import PILLARS, AUTHORITY_LINES, CTAS, NEUROCHEMICALS, F1_2026, is_race_week

# ─── System Prompt (identical to JS version) ─────────────────────
SYSTEM_PROMPT = """You are Craig Muirhead's Facebook & Instagram content strategist. You generate daily social media posts for racing drivers that deliver genuine value and include a CTA to the Podium Contenders Blueprint.

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
- Use CAR RACING language: driver, turn, apex, braking zone, racing line, throttle, steering input, circuit, pit lane, grid, qualifying, cockpit, seatbelts, harness, HANS device, pedal box. NEVER use motorcycle-specific language.

# CTA (Rotating Lead Magnets — matched to post topic)
Every post uses ONE of these CTAs, matched to the post content:
- FLOW → Driver Flow Profile (2 min assessment, flow strengths and blockers)
- MINDSET → Driver Mindset Quiz (12 racing scenarios, 3 min, most score below 40%)
- SLEEP → Driver Sleep Test (60 sec, checks sleep habits vs reaction time)
- BLUEPRINT → Podium Contenders Blueprint (3-day free training, direct link)
- SEASON → End of Season Review (off-season only, Oct-Feb)
Delivery: Comment keyword → ManyChat auto-DM → Lead Magnet → Blueprint → Strategy Call
The CTA is ALWAYS separated from the value content by ·· and framed as "oh by the way" / "completely unrelated" / "PS".

# CONTENT RULES
- WOW not HOW: Reveal what the problem is and why it happens (neuroscience). NEVER give the specific fix or methodology.
- Never use generic coaching language: "mindset shift", "unlock your potential", "be your best self", "level up".
- Every post must reference a specific racing scenario (turn number, session context, tyre condition, grid position).
- Use real data: 808 PBs, 438 podiums, 159 wins, 118 drivers, 100+ circuits, 2,358 debriefs, 60 months, 4.9 Trustpilot (85 reviews).
- ROTATE credibility claims. Never use the same stat in consecutive posts.

# CONTENT THE AI MUST NEVER CREATE (Dead Zone Rules)
- Self-promotional announcements without value
- Testimonial-only posts without a teaching hook
- Follow-up or sequence posts that assume the reader saw yesterday's content
- Generic motivational content that could apply to any sport
- Pure neuroscience explainers without a track-specific anchor
- Generic coaching announcements"""


# ─── Claude API Call (raw requests — matches JS fetch) ────────────
def call_claude(prompt: str, api_key: str, parse_json: bool = True):
    """Call Claude via raw HTTP request (same approach as JS version)."""
    if not api_key or not api_key.strip():
        raise ValueError("Claude API key is empty. Please enter your key in the sidebar.")

    clean_key = api_key.strip()

    # Validate key format
    if not clean_key.startswith("sk-ant-"):
        raise ValueError(f"Claude API key should start with 'sk-ant-'. Your key starts with '{clean_key[:6]}...' — please check you pasted the correct key.")

    response = requests.post(
        "https://api.anthropic.com/v1/messages",
        headers={
            "Content-Type": "application/json",
            "x-api-key": clean_key,
            "anthropic-version": "2023-06-01",
        },
        json={
            "model": "claude-sonnet-4-20250514",
            "max_tokens": 4096,
            "system": SYSTEM_PROMPT,
            "messages": [{"role": "user", "content": prompt}],
            "temperature": 0.85,
        },
        timeout=120,
    )

    if response.status_code == 401:
        raise RuntimeError(
            f"Claude API authentication failed (401). "
            f"Key starts with '{clean_key[:10]}...'. "
            f"Please verify your API key is correct and active at console.anthropic.com"
        )

    if response.status_code != 200:
        try:
            error_data = response.json()
            error_msg = error_data.get("error", {}).get("message", f"HTTP {response.status_code}")
        except Exception:
            error_msg = f"HTTP {response.status_code}"
        raise RuntimeError(f"Claude API error: {error_msg}")

    data = response.json()
    content = ""
    for block in data.get("content", []):
        if block.get("type") == "text":
            content += block.get("text", "")

    content = content.strip()
    if not content:
        raise RuntimeError("No content returned from Claude API.")

    if parse_json:
        return _extract_json(content)
    return content


# ─── Gemini API (Research with Google Search Grounding) ──────────
def call_gemini_with_search(prompt: str, api_key: str, parse_json: bool = True):
    """Call Gemini 2.5 Flash with Google Search grounding."""
    if not api_key or not api_key.strip():
        raise ValueError("Gemini API key is empty. Please enter your key in the sidebar.")

    clean_key = api_key.strip()
    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={clean_key}"

    payload = {
        "contents": [{"parts": [{"text": prompt}]}],
        "tools": [{"google_search": {}}],
        "generationConfig": {"temperature": 0.8, "maxOutputTokens": 8192},
    }

    resp = requests.post(url, json=payload, timeout=120)

    if resp.status_code != 200:
        try:
            error = resp.json().get("error", {})
            error_msg = error.get("message", f"HTTP {resp.status_code}")
        except Exception:
            error_msg = f"HTTP {resp.status_code}"
        raise RuntimeError(f"Gemini API error: {error_msg}")

    data = resp.json()

    # Extract text content
    content = ""
    parts = data.get("candidates", [{}])[0].get("content", {}).get("parts", [])
    for part in parts:
        if "text" in part:
            content += part["text"]

    # Extract grounding URLs
    grounding_chunks = []
    gm = data.get("candidates", [{}])[0].get("groundingMetadata", {})
    for chunk in gm.get("groundingChunks", []):
        web = chunk.get("web", {})
        if web.get("uri"):
            grounding_chunks.append({"uri": web["uri"], "title": web.get("title", "")})

    # Handle RECITATION block
    finish_reason = data.get("candidates", [{}])[0].get("finishReason", "")
    if not content.strip() and finish_reason == "RECITATION" and "[RETRY]" not in prompt:
        retry_prompt = prompt + '\n\n[RETRY] Summarise your findings in your own words. Do not quote large blocks of text from articles.'
        return call_gemini_with_search(retry_prompt, api_key, parse_json)

    if not content.strip():
        raise RuntimeError(f"No content from Gemini (reason: {finish_reason or 'unknown'}). Try again.")

    # Strip markdown code fences
    content = re.sub(r"```json\s*", "", content)
    content = re.sub(r"```\s*", "", content)
    content = content.strip()

    if parse_json:
        parsed = _extract_json(content)
        if isinstance(parsed, list):
            _assign_grounding_urls(parsed, grounding_chunks)
        return parsed

    return content


def _extract_json(content: str):
    """Extract JSON array or object from text."""
    # Try direct parse
    try:
        return json.loads(content)
    except json.JSONDecodeError:
        pass

    # Find JSON array with balanced brackets
    arr_start = content.find("[")
    if arr_start != -1:
        depth = 0
        for i in range(arr_start, len(content)):
            if content[i] == "[":
                depth += 1
            elif content[i] == "]":
                depth -= 1
                if depth == 0:
                    try:
                        return json.loads(content[arr_start:i + 1])
                    except json.JSONDecodeError:
                        break

    # Find JSON object
    obj_start = content.find("{")
    if obj_start != -1:
        depth = 0
        for i in range(obj_start, len(content)):
            if content[i] == "{":
                depth += 1
            elif content[i] == "}":
                depth -= 1
                if depth == 0:
                    try:
                        return json.loads(content[obj_start:i + 1])
                    except json.JSONDecodeError:
                        break

    raise ValueError(f"Could not extract JSON from response. First 200 chars: {content[:200]}")


def _assign_grounding_urls(topics: list, chunks: list):
    """Map grounding URLs to topics based on similarity scoring."""
    clean_chunks = [c for c in chunks if "youtube.com" not in c["uri"] and "youtu.be" not in c["uri"]]
    used = set()

    for i, item in enumerate(topics):
        url = item.get("articleUrl", "")
        if url and not any(x in url for x in ["grounding-api-redirect", "googleapis.com"]) and url.startswith("http"):
            item["urlMatchMethod"] = "gemini-direct"
            continue

        # Try to match by title similarity
        story_text = f"{item.get('headline', '')} {item.get('sourceArticle', '')} {item.get('racingRelevance', '')}".lower()
        best_score, best_idx = 0, -1

        for ci, chunk in enumerate(clean_chunks):
            if ci in used:
                continue
            chunk_text = chunk.get("title", "").lower()
            story_words = set(w for w in re.findall(r'\w+', story_text) if len(w) > 3)
            chunk_words = set(w for w in re.findall(r'\w+', chunk_text) if len(w) > 3)
            if not story_words or not chunk_words:
                continue
            overlap = len(story_words & chunk_words)
            score = overlap / max(min(len(story_words), len(chunk_words)), 1)
            if score > best_score:
                best_score = score
                best_idx = ci

        if best_idx >= 0 and best_score > 0:
            used.add(best_idx)
            item["articleUrl"] = clean_chunks[best_idx]["uri"]
            item["urlMatchMethod"] = "title-match" if best_score >= 0.25 else "best-guess"
        else:
            for ci, chunk in enumerate(clean_chunks):
                if ci not in used:
                    used.add(ci)
                    item["articleUrl"] = chunk["uri"]
                    item["urlMatchMethod"] = "best-guess"
                    break
            else:
                item["articleUrl"] = ""
                item["urlMatchMethod"] = "unverified"


# ─── Generate Topics (Gemini Web Search) ─────────────────────────
def generate_topics(pillars: list, api_key: str):
    """Search the web for 7 stories using Gemini with Google Search grounding."""
    race_week = is_race_week()
    live_racing = f"LIVE RACING THIS WEEKEND — prioritise current race results from {race_week['name']}." if race_week else ""

    day_slots = [
        "Monday: Outside the Paddock — a fascinating story from another sport, wearable health tech, or science. It MUST bridge back to racing driver mental performance.",
        "Tuesday: Client Transformation — a racing driver comeback or breakthrough story.",
        "Wednesday: Neuroscience Teach — brain science applied to driving a race car on track.",
        "Thursday: Provocative Hook — ONE uncomfortable truth about racing psychology.",
        "Friday: Timely Race Reaction — react to REAL recent F1, British GT, DTM, or WEC results.",
        "Saturday: Achievement/Tech Spotlight — wearable performance technology or biometric breakthroughs.",
        "Sunday: Proof & Celebration — inspiring racing driver wins or mental performance breakthroughs.",
    ]

    pillar_ids = [p["id"] for p in pillars]

    prompt = f"""Search the web for 7 stories from the last 7-30 days for a racing driver mental performance coach's social media.

TARGET CHAMPIONSHIPS: F1, British GT, DTM, WEC, Porsche Carrera Cup, Indy NXT, Formula Regional, IMSA.
SEARCH SOURCES (motorsport): Formula1.com, Motorsport.com, The Race, Autosport, Racer.com, BBC Sport, Sky Sports F1, PlanetF1.
SEARCH SOURCES (science): PubMed, Frontiers, Journal of Neuroscience, PMC, Sports Psychiatry.
SEARCH SOURCES (wearable tech): Garmin Blog, Whoop Blog, Oura Ring Blog, Apple Newsroom, GoPro News, Wired, Wareable.com.

{live_racing}

Find one story for each slot:
{chr(10).join(f'{i+1}. {d}' for i, d in enumerate(day_slots))}

RULES:
- Every headline must connect to MENTAL PERFORMANCE of car racing
- Use CAR RACING language (driver, turn, apex, braking zone, throttle, steering input, circuit, qualifying)
- NO MOTORCYCLE RACING stories
- At least 2 stories should reference SPECIFIC real racing drivers or race results
- At least 1 story from scientific research (neuroscience, psychology, sports science)
- At least 1 story from wearable tech / health data world

Return a JSON array with 7 objects:
[
  {{
    "pillarId": "{pillar_ids[0] if pillar_ids else 'flow-state-confidence'}",
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
  }}
]

Return ONLY the JSON array with exactly 7 items."""

    return call_gemini_with_search(prompt, api_key, parse_json=True)


# ─── Generate a Single Post (Claude) ─────────────────────────────
def generate_post(topic, pillar, framework, cta, authority_line, api_key, neurochemical=None):
    """Generate a Facebook + Instagram post using Claude."""
    headline = topic if isinstance(topic, str) else topic.get("headline", str(topic))
    talking_points = topic.get("talkingPoints", []) if isinstance(topic, dict) else []
    mechanism = topic.get("mechanism", "") if isinstance(topic, dict) else ""
    source_article = topic.get("sourceArticle", "") if isinstance(topic, dict) else ""
    racing_relevance = topic.get("racingRelevance", "") if isinstance(topic, dict) else ""
    killer_data = topic.get("killerDataPoint", "") if isinstance(topic, dict) else ""
    article_url = topic.get("articleUrl", "") if isinstance(topic, dict) else ""
    summary = topic.get("summary", "") if isinstance(topic, dict) else ""

    chem_note = ""
    if neurochemical:
        chem_note = f"\nNEUROCHEMICAL FOCUS: {neurochemical['name']} ({neurochemical['label']}) — {neurochemical['whatItDoes']}\nOn track: {neurochemical['onTrack']}"

    prompt = f"""Write a Facebook post AND an Instagram caption for Craig Muirhead / Camino Coaching using these parameters:

CONTENT PILLAR: {pillar['name']} — {pillar['description']}
FRAMEWORK: {framework['name']} — {framework['hookStyle']}
TOPIC / ANGLE: {headline}
{f"SOURCE ARTICLE: {source_article}" if source_article else ""}
{f"ARTICLE URL: {article_url}" if article_url else ""}
{f"SUMMARY: {summary}" if summary else ""}
{f"KEY POINTS: {', '.join(talking_points)}" if talking_points else ""}
{f"KILLER DATA POINT: {killer_data}" if killer_data else ""}
{f"MECHANISM TO REFERENCE: {mechanism}" if mechanism else ""}
{f"RACING RELEVANCE: {racing_relevance}" if racing_relevance else ""}
{chem_note}

AUTHORITY LINE TO WEAVE IN NATURALLY:
"{authority_line}"

CTA TO APPEND (after ·· separator, completely unrelated to post body):
{cta['ctaTemplate']}

CTA TRIGGER WORD: {cta.get('triggerWord', 'BLUEPRINT')}

THE 5-STEP WINNING FORMULA (follow this architecture):
1. HOOK (First Line): Start with a specific data point, research finding, or dramatic racing scenario. This is the ONLY line that matters for reach.
2. PROBLEM (Next 2-3 sentences): Ground it in a SPECIFIC racing scenario. Use turn numbers, session contexts (qualifying vs race), specific sensations (tyre grip, braking confidence). Never generic.
3. NEUROSCIENCE (Core Teaching): Explain WHY this happens in the brain. Reference the mechanism. Use plain language. Cite data. WOW not HOW: reveal what the problem is, NEVER the specific fix.
4. BRIDGE (Connection to Driver): Show how this pattern appears at every level. Reference real results or anonymised patterns. Make the reader feel seen.
5. CTA (Separated): After ·· separator. "Oh, by the way" or "Completely unrelated" or "PS". BLUEPRINT keyword included. "With or without you" energy.

RULES (racing driver Facebook / Instagram format):
- Use CAR RACING language throughout: driver, turn, apex, braking zone, racing line, throttle, steering input, circuit, pit lane, grid, qualifying, cockpit, harness, pit wall, engineer, stint. NEVER use motorcycle language.
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
[Instagram caption here]"""

    return call_claude(prompt, api_key, parse_json=False)


# ─── Generate Video Script (Claude) ──────────────────────────────
def generate_video_script(topic, post_content, pillar, api_key):
    """Generate a 45-60s HeyGen video script."""
    headline = topic if isinstance(topic, str) else topic.get("headline", str(topic))
    source_article = topic.get("sourceArticle", "") if isinstance(topic, dict) else ""
    article_url = topic.get("articleUrl", "") if isinstance(topic, dict) else ""
    talking_points = topic.get("talkingPoints", []) if isinstance(topic, dict) else []
    mechanism = topic.get("mechanism", "") if isinstance(topic, dict) else ""

    prompt = f"""You are Craig Muirhead's video content strategist. Write a complete video script for a 45-60 second HeyGen avatar video.

CRITICAL RULE — ARTICLE-FIRST ARCHITECTURE:
The video script MUST be built on the same source article as the text post. The article is the hook. It is the borrowed authority.

THE SOURCE ARTICLE (backbone of the video):
Headline: {headline}
{f"Source: {source_article}" if source_article else ""}
{f"URL: {article_url}" if article_url else ""}
{f"Key Points: {chr(10).join('- ' + p for p in talking_points)}" if talking_points else ""}
{f"Mechanism: {mechanism}" if mechanism else ""}
{f"Pillar: {pillar['name']}" if pillar else ""}

{f"THE TEXT POST (for context):{chr(10)}{post_content[:800]}" if post_content else ""}

RULES:
- UK English spelling throughout (colour, analyse, programme, tyre, favourite)
- CAR RACING language only. NEVER motorcycle language.
- Write numbers out in full text for voice synthesis ("two thousand three hundred and fifty eight" not "2,358")
- WOW not HOW. Warm, direct, confident tone.

FORMAT YOUR RESPONSE EXACTLY LIKE THIS:

=== VIDEO SCRIPT ===
HOOK (0-5s):
[Open with the article. Name the person, study, or discovery.]

SCENARIO (5-15s):
[Expand on the article. Pivot to driver's experience.]

THE SCIENCE (15-35s):
[Name the neurochemical. Explain WHY in plain language.]

THE COST (35-45s):
[Quantify the impact. Use Camino debrief data.]

THE BRIDGE (45-55s):
[Connect article insight to Camino data. Tease the solution.]

CTA (55-60s):
[Casual, low-pressure. Comment BLUEPRINT.]

=== SLIDE DECK BRIEF (FOR MANUS) ===
Slide 1 — Hook: [Bold text. Max 15 words.]
Slide 2 — The Story: [Max 15 words.]
Slide 3 — The Pivot: [Max 15 words.]
Slide 4 — The Chemical: [Chemical name + description.]
Slide 5 — The Mechanism: [2-3 short bullet points.]
Slide 6 — The Data: [One big Camino stat.]
Slide 7 — The Bridge: [Teaser line.]
Slide 8 — CTA: [Comment BLUEPRINT + branding.]

=== HEYGEN NOTES ===
[Avatar position, gesture suggestions, pace notes.]

=== SOCIAL CAPTION ===
[50-100 word caption. Reference the article. Include CTA and 3-5 hashtags.]"""

    return call_claude(prompt, api_key, parse_json=False)


# ─── Generate 30-Second Short Script (Claude) ────────────────────
def generate_shorts_script(topic, post_content, api_key):
    """Generate a 30-second Short script."""
    headline = topic if isinstance(topic, str) else topic.get("headline", str(topic))

    prompt = f"""Write a COMPLETE 30-second Short script. 4 slides, 75-85 words total.

SOURCE: {headline}
{f"POST CONTEXT:{chr(10)}{post_content[:400]}" if post_content else ""}

FORMAT:
=== 30-SECOND SHORT SCRIPT ===
HOOK (0-5s) | Slide 1:
On screen: [5-7 words]
Voice: [Max 12 words]

THE INSIGHT (5-18s) | Slide 2:
On screen: [Description]
Voice: [3-4 sentences, ~35-40 words]

THE PROOF (18-25s) | Slide 3:
On screen: [Big number + label]
Voice: [1-2 sentences, ~15-20 words]

CTA (25-30s) | Slide 4:
On screen: [Comment keyword]
Voice: [6-8 words max]

Total word count: [NUMBER]

RULES: UK English, CAR RACING language, WOW not HOW, numbers in full text, 75-85 words total."""

    return call_claude(prompt, api_key, parse_json=False)


# ─── Generate Email (Claude) ─────────────────────────────────────
def generate_email(topic, pillar, cta, post_content, api_key):
    """Generate a nurture email in JSON format."""
    headline = topic if isinstance(topic, str) else topic.get("headline", str(topic))
    source_article = topic.get("sourceArticle", "") if isinstance(topic, dict) else ""
    killer_data = topic.get("killerDataPoint", "") if isinstance(topic, dict) else ""
    mechanism = topic.get("mechanism", "") if isinstance(topic, dict) else ""
    cta_url = cta.get("url", "https://academy.caminocoaching.co.uk/podium-contenders-blueprint/order/")

    prompt = f"""Write a detailed nurture email (400-600 words) for racing drivers about: {headline}
{f"SOURCE: {source_article}" if source_article else ""}
{f"KEY DATA: {killer_data}" if killer_data else ""}
{f"MECHANISM: {mechanism}" if mechanism else ""}
PILLAR: {pillar['name']}

{f"RELATED POST:{chr(10)}{post_content[:600]}" if post_content else ""}

OUTPUT FORMAT (return as JSON):
{{
  "subject": "Email subject (max 50 chars)",
  "preheader": "Preview text (max 80 chars)",
  "hook": "Opening 1-2 sentences",
  "articleInsight": "3-5 sentences on key finding",
  "dataHighlight": "Standalone callout data point",
  "problem": "3-4 sentences: neuroscience mechanism",
  "racingScenario": "3-4 sentences: vivid racing scenario",
  "bridge": "2-3 sentences: connect to Camino data",
  "ctaText": "CTA button text (max 5 words)",
  "ctaUrl": "{cta_url}",
  "signoff": "Short sign-off line"
}}

RULES: UK English, CAR RACING language, WOW not HOW. Return ONLY the JSON object."""

    result = call_claude(prompt, api_key, parse_json=True)
    return result[0] if isinstance(result, list) else result


# ─── Parse Post Content ──────────────────────────────────────────
def parse_post(raw_content: str):
    """Split raw Claude output into facebook and instagram sections."""
    fb, ig = "", ""
    if "=== FACEBOOK POST ===" in raw_content:
        parts = raw_content.split("=== INSTAGRAM CAPTION ===")
        fb = parts[0].replace("=== FACEBOOK POST ===", "").strip()
        ig = parts[1].strip() if len(parts) > 1 else ""
    else:
        fb = raw_content
        ig = raw_content
    return {"facebook": fb, "instagram": ig}
