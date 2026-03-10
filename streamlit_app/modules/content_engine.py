"""
Content Engine — Pillars, Frameworks, CTAs, Authority Lines, Data Layers
Ported from js/content-engine.js
"""
import random
from datetime import datetime

# ─── 7 Content Pillars ──────────────────────────────────────────
PILLARS = [
    {"id": "visual-targeting", "name": "Visual Targeting", "icon": "👁️", "color": "#ff6b6b", "group": "problem",
     "description": "Where drivers look on track determines where they go. Eye position, target fixation, peripheral processing, the 200-300ms delay when eyes are too close."},
    {"id": "braking-zone", "name": "Braking Zone", "icon": "🛑", "color": "#ffa94d", "group": "problem",
     "description": "The mental game of commitment in the braking zone. Trail braking confidence, the cortisol response that makes drivers brake early under pressure."},
    {"id": "overthinking", "name": "Overthinking (The Drunken Monkey)", "icon": "🧠", "color": "#69db7c", "group": "problem",
     "description": "Analysis paralysis, prefrontal override, the conscious mind running at 110 bits trying to control what the subconscious handles at 4 billion bits."},
    {"id": "expectation-pressure", "name": "Expectation Pressure", "icon": "💪", "color": "#f783ac", "group": "problem",
     "description": "Sponsor pressure, family investment, championship points pressure, team expectations, the weight of external expectations creating amygdala hijack."},
    {"id": "personal-best-triggers", "name": "Personal Best Triggers", "icon": "🎯", "color": "#4dabf7", "group": "positive",
     "description": "What the debrief data shows about drivers who break through plateaus. The confidence multiplier. The preparation patterns that predict PBs."},
    {"id": "race-craft", "name": "Race Craft & Intelligence", "icon": "🏆", "color": "#ffd43b", "group": "positive",
     "description": "Race starts, overtaking decisions, tyre management, reading a race situation, knowing when to attack and when to consolidate."},
    {"id": "flow-state-confidence", "name": "Flow State & Confidence", "icon": "✨", "color": "#9775fa", "group": "positive",
     "description": "What flow feels like at 150mph, dopamine-norepinephrine alignment, time dilation, the zone as a trainable state."},
]

# ─── 5 Frameworks (3S + 2F) ─────────────────────────────────────
FRAMEWORKS = [
    {"id": "scary", "name": "Scary", "icon": "😱", "color": "#ff4444",
     "hookStyle": "Start with a fear-inducing consequence or hidden cost. Make them feel the urgency."},
    {"id": "strange", "name": "Strange", "icon": "🤔", "color": "#ffa500",
     "hookStyle": "Open with something that contradicts what every driver 'knows' is true. Create cognitive dissonance."},
    {"id": "sexy", "name": "Sexy", "icon": "✨", "color": "#ff69b4",
     "hookStyle": "Paint a vivid picture of the ideal result or transformation. Make them FEEL what peak performance is like."},
    {"id": "free-value", "name": "Free Value", "icon": "🎁", "color": "#00cc88",
     "hookStyle": "Lead with a practical tip, technique, or protocol they can use immediately."},
    {"id": "familiar", "name": "Familiar", "icon": "🤝", "color": "#4488ff",
     "hookStyle": 'Start with a situation every driver has experienced. Make them think "that\'s exactly what happens to me".'},
]

# ─── 5 CTAs ──────────────────────────────────────────────────────
CTAS = [
    {"id": "cta-b", "name": "LM2: End of Season Review", "shortName": "Season Review", "triggerWord": "SEASON",
     "ctaTemplate": '\n\n·· Completely unrelated - I\'ve built a free End of Season Review that scores your entire season across 8 performance pillars. Most drivers score below 60%. Takes 3 minutes. Instant report. --> riderseason.scoreapp.com'},
    {"id": "cta-c", "name": "LM3: Driver Flow Profile", "shortName": "Flow Profile", "triggerWord": "FLOW",
     "ctaTemplate": '\n\n·· PS - Ever wondered if you actually experience flow on track, or just think you do? Free Driver Flow Profile maps how often you access the zone, what triggers it, and what blocks it. 2 minutes. Might surprise you. Comment "FLOW" and I\'ll send you the link.'},
    {"id": "cta-d", "name": "LM4: Driver Mindset Quiz", "shortName": "Mindset Quiz", "triggerWord": "MINDSET",
     "ctaTemplate": '\n\n·· Oh, by the way - I built a free Driver Mindset Quiz with 12 real racing scenarios. Most drivers score below 40%. Takes 3 minutes. Comment "MINDSET" for the link.'},
    {"id": "cta-e", "name": "LM5: Driver Sleep Test", "shortName": "Sleep Test", "triggerWord": "SLEEP",
     "ctaTemplate": '\n\n·· Completely unrelated - I built a 60-second sleep test for racing drivers. Checks whether your sleep habits are helping or hurting your reaction times. Free. Instant results. Comment "SLEEP" and I\'ll send you the link.'},
    {"id": "cta-f", "name": "Podium Contenders Blueprint (Direct)", "shortName": "Blueprint", "triggerWord": "BLUEPRINT",
     "url": "https://academy.caminocoaching.co.uk/podium-contenders-blueprint/order/",
     "ctaTemplate": '\n\n·· Side note - three times a year I release a free training called the Podium Contenders Blueprint for drivers who know they\'re leaving speed on the table. 3 days. The next window just opened. --> academy.caminocoaching.co.uk/podium-contenders-blueprint/order/'},
]

# ─── Authority Lines ─────────────────────────────────────────────
AUTHORITY_LINES = [
    "Pattern recognition across 808 personal bests, 438 podiums, and 159 race wins has shown me this pattern over and over again.",
    "After 10 seasons embedded in elite motorsport paddocks, from F1 to F4, GT racing to touring cars, I see this in 90% of drivers I work with.",
    "Working with 118+ drivers across 100+ circuits, the data on this is very clear.",
    "I have sat beside drivers across F4, GB3, GT3, and Carrera Cup. The pattern is always the same.",
    "85 five-star reviews on Trustpilot, 4.9 out of 5, 100% five-star. Drivers from 12 countries have reviewed this programme. Most of them mention the same breakthrough.",
    "I have analysed 2,358 performance debriefs over 60 months. The pattern in the data is impossible to ignore.",
    "808 documented personal bests. All traceable back to specific mental preparation patterns in our debrief system.",
    "Across 2,358 debriefs and 100+ circuits, we can see exactly what separates the drivers who improve from the ones who plateau.",
    "438 podiums and 159 race wins documented through our In The Zone system.",
    "No other motorsport performance coach has a dataset of this scale and depth. 60 months of continuous, verified data.",
]

# ─── Neurochemicals (compact) ────────────────────────────────────
NEUROCHEMICALS = [
    {"id": "cortisol", "name": "Cortisol", "label": "The Stress Chemical", "icon": "🔴", "color": "#ff4444",
     "whatItDoes": "Released when the brain perceives threat. Narrows focus, increases heart rate, triggers fight-or-flight.",
     "onTrack": "Causes early braking, tense inputs, tunnel vision, reactive driving instead of flowing driving."},
    {"id": "dopamine", "name": "Dopamine", "label": "The Reward and Focus Chemical", "icon": "🟡", "color": "#ffd43b",
     "whatItDoes": "Released during anticipation of reward and during flow state. Drives motivation, focus, pattern recognition.",
     "onTrack": 'The chemical behind the "locked in" feeling. When dopamine is flowing, the driver feels sharp, confident.'},
    {"id": "serotonin", "name": "Serotonin", "label": "The Confidence and Status Chemical", "icon": "🔵", "color": "#4dabf7",
     "whatItDoes": "Regulates mood, confidence, and sense of wellbeing. Linked to social status and self-belief.",
     "onTrack": "The chemical behind sustained confidence across a race weekend."},
    {"id": "norepinephrine", "name": "Norepinephrine", "label": "The Alertness Chemical", "icon": "⚡", "color": "#ffa94d",
     "whatItDoes": "Sharpens attention, increases arousal, enhances sensory processing. Works with dopamine in flow state.",
     "onTrack": "Makes reaction times faster and sensory input clearer."},
    {"id": "oxytocin", "name": "Oxytocin", "label": "The Trust and Connection Chemical", "icon": "💙", "color": "#20c997",
     "whatItDoes": "Released during social bonding, trust, and feeling supported. Reduces cortisol.",
     "onTrack": "The driver who trusts their team performs differently from the driver who feels isolated."},
    {"id": "testosterone", "name": "Testosterone", "label": "The Competitive Drive Chemical", "icon": "🟠", "color": "#ff6b6b",
     "whatItDoes": "Drives competitive behaviour, risk tolerance, and dominance.",
     "onTrack": 'The chemical behind the driver who goes wheel to wheel and wins the battle.'},
    {"id": "endorphins", "name": "Endorphins", "label": "The Pain and Pressure Buffer", "icon": "💚", "color": "#69db7c",
     "whatItDoes": "The body's natural painkiller. Released during intense physical effort, stress, and excitement.",
     "onTrack": "Acts as a buffer against physical discomfort (G-forces, heat, fatigue)."},
]

# ─── Data Layers ─────────────────────────────────────────────────
DATA_LAYERS = {
    "layer1": {"label": "Career Coaching Totals", "stats": {"pbs": "808", "podiums": "438", "wins": "159", "drivers": "118+", "circuits": "100+", "trustpilot": "4.9/5 (85 reviews, 100% five-star)"}},
    "layer2": {"label": "Verified In The Zone Debrief Dataset", "stats": {"debriefs": "2,358", "pbs": "808", "podiums": "438", "wins": "159", "months": "60", "pbRate": "34%", "podiumRate": "19%"}},
}

# ─── Campaign Arc ────────────────────────────────────────────────
CAMPAIGN_ARC = [
    {"day": "Monday", "purpose": "Describe the Problem", "emotion": 'Recognition: "That\'s me"', "wordCount": "150-250"},
    {"day": "Tuesday", "purpose": "Agitate the Pain", "emotion": 'Frustration: "This is costing me"', "wordCount": "200-300"},
    {"day": "Wednesday", "purpose": "Explain the Neuroscience", "emotion": 'Understanding: "Now I get it"', "wordCount": "250-350"},
    {"day": "Thursday", "purpose": "Future-Pace the Solution", "emotion": 'Hope: "This could work"', "wordCount": "200-300"},
    {"day": "Friday", "purpose": "Release Free Training", "emotion": 'Action: "I want this"', "wordCount": "3 variations"},
    {"day": "Saturday", "purpose": "Achievement/Tech Spotlight", "emotion": "Inspiration", "wordCount": "200-300"},
    {"day": "Sunday", "purpose": "Proof & Celebration", "emotion": "Trust", "wordCount": "150-250"},
]

# ─── F1 2026 Calendar ────────────────────────────────────────────
F1_2026 = [
    {"round": 1, "name": "Australian GP", "circuit": "Albert Park", "date": "2026-03-15", "country": "Australia"},
    {"round": 2, "name": "Chinese GP", "circuit": "Shanghai International", "date": "2026-03-29", "country": "China"},
    {"round": 3, "name": "Japanese GP", "circuit": "Suzuka", "date": "2026-04-05", "country": "Japan"},
    {"round": 4, "name": "Bahrain GP", "circuit": "Sakhir", "date": "2026-04-19", "country": "Bahrain"},
    {"round": 5, "name": "Saudi Arabian GP", "circuit": "Jeddah Corniche", "date": "2026-05-03", "country": "Saudi Arabia"},
    {"round": 6, "name": "Miami GP", "circuit": "Miami International", "date": "2026-05-17", "country": "USA"},
    {"round": 7, "name": "Emilia Romagna GP", "circuit": "Imola", "date": "2026-05-31", "country": "Italy"},
    {"round": 8, "name": "Monaco GP", "circuit": "Circuit de Monaco", "date": "2026-06-07", "country": "Monaco"},
    {"round": 9, "name": "Spanish GP", "circuit": "Barcelona-Catalunya", "date": "2026-06-21", "country": "Spain"},
    {"round": 10, "name": "Canadian GP", "circuit": "Circuit Gilles Villeneuve", "date": "2026-07-05", "country": "Canada"},
    {"round": 11, "name": "Austrian GP", "circuit": "Red Bull Ring", "date": "2026-07-12", "country": "Austria"},
    {"round": 12, "name": "British GP", "circuit": "Silverstone", "date": "2026-07-19", "country": "UK"},
    {"round": 13, "name": "Belgian GP", "circuit": "Spa-Francorchamps", "date": "2026-07-26", "country": "Belgium"},
    {"round": 14, "name": "Hungarian GP", "circuit": "Hungaroring", "date": "2026-08-02", "country": "Hungary"},
    {"round": 15, "name": "Dutch GP", "circuit": "Zandvoort", "date": "2026-08-30", "country": "Netherlands"},
    {"round": 16, "name": "Italian GP", "circuit": "Monza", "date": "2026-09-06", "country": "Italy"},
    {"round": 17, "name": "Azerbaijan GP", "circuit": "Baku City Circuit", "date": "2026-09-20", "country": "Azerbaijan"},
    {"round": 18, "name": "Singapore GP", "circuit": "Marina Bay", "date": "2026-10-04", "country": "Singapore"},
    {"round": 19, "name": "US GP", "circuit": "Circuit of the Americas", "date": "2026-10-18", "country": "USA"},
    {"round": 20, "name": "Mexico GP", "circuit": "Hermanos Rodríguez", "date": "2026-10-25", "country": "Mexico"},
    {"round": 21, "name": "Brazilian GP", "circuit": "Interlagos", "date": "2026-11-08", "country": "Brazil"},
    {"round": 22, "name": "Las Vegas GP", "circuit": "Las Vegas Strip", "date": "2026-11-22", "country": "USA"},
    {"round": 23, "name": "Qatar GP", "circuit": "Lusail", "date": "2026-11-29", "country": "Qatar"},
    {"round": 24, "name": "Abu Dhabi GP", "circuit": "Yas Marina", "date": "2026-12-06", "country": "UAE"},
]


# ─── Helper Functions ────────────────────────────────────────────
def get_weekly_pillars():
    problem = [p for p in PILLARS if p["group"] == "problem"]
    positive = [p for p in PILLARS if p["group"] == "positive"]
    selected = random.sample(problem, min(2, len(problem))) + positive + random.sample(PILLARS, min(2, len(PILLARS)))
    random.shuffle(selected)
    return selected[:7]


def get_weekly_frameworks():
    base = FRAMEWORKS.copy()
    extras = random.choices(FRAMEWORKS, k=2)
    all_fw = base + extras
    random.shuffle(all_fw)
    return all_fw[:7]


def get_weekly_neurochemicals(count=7):
    shuffled = NEUROCHEMICALS.copy()
    random.shuffle(shuffled)
    result = shuffled[:min(count, len(shuffled))]
    while len(result) < count:
        result.append(random.choice(NEUROCHEMICALS))
    return result


def get_rotating_cta():
    month = datetime.now().month
    if month >= 10 or month <= 2:
        active = CTAS
    else:
        active = [c for c in CTAS if c["id"] != "cta-b"]
    return random.choice(active)


def get_rotating_authority():
    return random.choice(AUTHORITY_LINES)


def is_race_week(date=None):
    if date is None:
        date = datetime.now()
    for race in F1_2026:
        race_date = datetime.strptime(race["date"], "%Y-%m-%d")
        diff = abs((date - race_date).days)
        if diff <= 3:
            return race
    return None
