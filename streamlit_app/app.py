"""
🏁 DRIVER SOCIAL MEDIA MACHINE — Streamlit App
Craig Muirhead / Camino Coaching
Generates weekly social media content for racing drivers
"""
import streamlit as st
import json
import csv
import io
from datetime import datetime, timedelta

from modules.content_engine import (
    PILLARS, FRAMEWORKS, CTAS, AUTHORITY_LINES, NEUROCHEMICALS,
    DATA_LAYERS, CAMPAIGN_ARC, F1_2026,
    get_weekly_pillars, get_weekly_frameworks, get_weekly_neurochemicals,
    get_rotating_cta, get_rotating_authority, is_race_week,
)
from modules.ai_service import (
    generate_topics, generate_post, generate_video_script,
    generate_shorts_script, generate_email, parse_post,
)

# ─── Page Config ─────────────────────────────────────────────────
st.set_page_config(
    page_title="Driver Social Media Machine",
    page_icon="🏁",
    layout="wide",
    initial_sidebar_state="expanded",
)

# ─── Custom CSS ──────────────────────────────────────────────────
st.markdown("""
<style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

    /* Global */
    .stApp { font-family: 'Inter', sans-serif; }

    /* Header bar */
    .header-bar {
        background: linear-gradient(135deg, #0A1628 0%, #1a2744 100%);
        border-bottom: 3px solid #DAA520;
        padding: 1.2rem 2rem;
        margin: -1rem -1rem 1.5rem -1rem;
        border-radius: 0 0 12px 12px;
    }
    .header-bar h1 {
        color: #DAA520;
        font-size: 1.6rem;
        font-weight: 700;
        margin: 0;
        letter-spacing: 0.5px;
    }
    .header-bar p {
        color: #8B949E;
        font-size: 0.85rem;
        margin: 0.3rem 0 0 0;
    }

    /* Cards */
    .content-card {
        background: #161B22;
        border: 1px solid rgba(218,165,32,0.15);
        border-radius: 12px;
        padding: 1.5rem;
        margin-bottom: 1rem;
        transition: border-color 0.3s ease;
    }
    .content-card:hover {
        border-color: rgba(218,165,32,0.4);
    }

    /* Pillar badges */
    .pillar-badge {
        display: inline-block;
        padding: 0.25rem 0.75rem;
        border-radius: 20px;
        font-size: 0.75rem;
        font-weight: 600;
        letter-spacing: 0.5px;
        color: white;
        margin-right: 0.5rem;
        margin-bottom: 0.5rem;
    }

    /* Stats row */
    .stat-card {
        background: linear-gradient(135deg, #0A1628, #161B22);
        border: 1px solid rgba(218,165,32,0.15);
        border-radius: 10px;
        padding: 1rem;
        text-align: center;
    }
    .stat-card h3 {
        color: #DAA520;
        font-size: 1.8rem;
        margin: 0;
        font-weight: 700;
    }
    .stat-card p {
        color: #8B949E;
        font-size: 0.75rem;
        margin: 0.3rem 0 0 0;
        text-transform: uppercase;
        letter-spacing: 1px;
    }

    /* Topic card */
    .topic-card {
        background: #161B22;
        border-left: 4px solid #DAA520;
        border-radius: 0 8px 8px 0;
        padding: 1rem 1.2rem;
        margin-bottom: 0.75rem;
    }
    .topic-card h4 {
        color: #F0F6FC;
        margin: 0 0 0.5rem 0;
        font-size: 1rem;
    }
    .topic-card .source {
        color: #8B949E;
        font-size: 0.8rem;
    }
    .topic-card .summary {
        color: #C8D1DC;
        font-size: 0.85rem;
        margin-top: 0.5rem;
    }

    /* Post display */
    .post-content {
        background: #0D1117;
        border: 1px solid rgba(255,255,255,0.06);
        border-radius: 8px;
        padding: 1.2rem;
        color: #C8D1DC;
        font-size: 0.9rem;
        line-height: 1.7;
        white-space: pre-wrap;
        word-wrap: break-word;
    }

    /* Sidebar styling */
    section[data-testid="stSidebar"] {
        background: #0A1628;
        border-right: 1px solid rgba(218,165,32,0.2);
    }
    section[data-testid="stSidebar"] .stMarkdown h1,
    section[data-testid="stSidebar"] .stMarkdown h2,
    section[data-testid="stSidebar"] .stMarkdown h3 {
        color: #DAA520;
    }

    /* Button styling */
    .stButton > button {
        border: 1px solid #DAA520;
        color: #DAA520;
        background: transparent;
        transition: all 0.3s ease;
    }
    .stButton > button:hover {
        background: #DAA520;
        color: #0A1628;
    }

    /* Primary button */
    .stButton > button[kind="primary"],
    div[data-testid="stFormSubmitButton"] > button {
        background: linear-gradient(135deg, #DAA520, #B8860B);
        color: #0A1628;
        border: none;
        font-weight: 700;
    }

    /* Tab styling */
    .stTabs [data-baseweb="tab-list"] {
        gap: 8px;
        background: #0A1628;
        padding: 0.5rem;
        border-radius: 10px;
    }
    .stTabs [data-baseweb="tab"] {
        border-radius: 8px;
        color: #8B949E;
        padding: 0.5rem 1rem;
    }
    .stTabs [aria-selected="true"] {
        background: rgba(218,165,32,0.15);
        color: #DAA520;
    }

    /* Scrollbar */
    ::-webkit-scrollbar { width: 6px; }
    ::-webkit-scrollbar-track { background: #0D1117; }
    ::-webkit-scrollbar-thumb { background: #30363D; border-radius: 3px; }

    /* Hide Streamlit branding */
    #MainMenu { visibility: hidden; }
    footer { visibility: hidden; }
    header { visibility: hidden; }
</style>
""", unsafe_allow_html=True)


# ─── Session State Init ──────────────────────────────────────────
def init_state():
    defaults = {
        "topics": [], "posts": [], "confirmed_posts": [],
        "current_step": "find_topics",
        "pillars": [], "frameworks": [], "neurochemicals_list": [],
        "generation_in_progress": False,
    }
    for k, v in defaults.items():
        if k not in st.session_state:
            st.session_state[k] = v

init_state()


# ─── Sidebar ─────────────────────────────────────────────────────
with st.sidebar:
    st.markdown("### 🏁 Driver Social Media Machine")
    st.markdown("---")

    # API Keys
    st.markdown("#### 🔑 API Keys")
    gemini_key = st.text_input(
        "Gemini API Key", type="password",
        help="For research (Google Search grounding)", key="gemini_key"
    )
    claude_key = st.text_input(
        "Claude API Key", type="password",
        help="For content writing (Anthropic)", key="claude_key"
    )
    heygen_key = st.text_input(
        "HeyGen API Key (optional)", type="password",
        help="For video generation", key="heygen_key"
    )

    # API status checks with key prefix for verification
    gemini_ok = bool(st.session_state.gemini_key)
    claude_ok = bool(st.session_state.claude_key)
    gemini_prefix = f" ({st.session_state.gemini_key[:8]}...)" if gemini_ok else ""
    claude_prefix = f" ({st.session_state.claude_key[:8]}...)" if claude_ok else ""
    st.markdown(f"Gemini: {'🟢 Set' + gemini_prefix if gemini_ok else '🔴 Not set'}")
    st.markdown(f"Claude: {'🟢 Set' + claude_prefix if claude_ok else '🔴 Not set'}")

    st.markdown("---")

    # Race week detection
    race = is_race_week()
    if race:
        st.markdown(f"#### 🏎️ Race Week!")
        st.markdown(f"**{race['name']}** — {race['circuit']}, {race['country']}")
    else:
        st.markdown("#### 📅 No race this week")

    st.markdown("---")

    # Quick data stats
    st.markdown("#### 📊 Coaching Data")
    stats = DATA_LAYERS["layer1"]["stats"]
    cols = st.columns(2)
    cols[0].metric("PBs", stats["pbs"])
    cols[1].metric("Podiums", stats["podiums"])
    cols = st.columns(2)
    cols[0].metric("Wins", stats["wins"])
    cols[1].metric("Drivers", stats["drivers"])

    st.markdown("---")

    # Tool launch links
    st.markdown("#### 🔗 Tools")
    st.markdown("[HeyGen](https://app.heygen.com) · [Manus](https://manus.im) · [Canva](https://www.canva.com) · [Descript](https://web.descript.com)")

    st.markdown("---")
    st.markdown(f"<small style='color:#484F58;'>v2.0 Streamlit · {datetime.now().strftime('%d %b %Y')}</small>", unsafe_allow_html=True)


# ─── Header ──────────────────────────────────────────────────────
st.markdown("""
<div class="header-bar">
    <h1>🏁 Driver Social Media Machine</h1>
    <p>Craig Muirhead · Camino Coaching — AI-Powered Social Content for Racing Drivers</p>
</div>
""", unsafe_allow_html=True)


# ─── Main Content Tabs ──────────────────────────────────────────
tab_find, tab_write, tab_review, tab_export, tab_calendar, tab_data = st.tabs([
    "🔍 Find Stories", "✍️ Write All", "📋 Review & Edit", "📤 Export", "📅 Calendar", "📊 Data"
])


# ═══════════════════════════════════════════════════════════════════
# TAB 1: FIND STORIES
# ═══════════════════════════════════════════════════════════════════
with tab_find:
    st.markdown("### 🔍 Step 1: Find Stories")
    st.markdown("Search the web for 7 fresh stories using Gemini with Google Search grounding.")

    if not st.session_state.gemini_key:
        st.warning("⚠️ Enter your Gemini API key in the sidebar to search for stories.")
    else:
        col1, col2 = st.columns([3, 1])
        with col1:
            st.info("Each story maps to a day of the week (Mon-Sun) with a specific content purpose.")
        with col2:
            find_btn = st.button("🔍 Find Stories", type="primary", use_container_width=True)

        if find_btn:
            with st.spinner("🌐 Searching the web for fresh stories with Gemini..."):
                try:
                    pillars = get_weekly_pillars()
                    st.session_state.pillars = pillars
                    st.session_state.frameworks = get_weekly_frameworks()
                    st.session_state.neurochemicals_list = get_weekly_neurochemicals()

                    topics = generate_topics(pillars, st.session_state.gemini_key)
                    st.session_state.topics = topics
                    st.success(f"✅ Found {len(topics)} stories!")
                except Exception as e:
                    st.error(f"❌ Error: {str(e)}")

    # Display found topics
    if st.session_state.topics:
        st.markdown("---")
        days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

        for i, topic in enumerate(st.session_state.topics):
            day = days[i] if i < len(days) else f"Day {i+1}"
            purpose = CAMPAIGN_ARC[i]["purpose"] if i < len(CAMPAIGN_ARC) else ""

            with st.container():
                st.markdown(f"""
                <div class="topic-card">
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                        <h4>{topic.get('headline', 'No headline')}</h4>
                        <span class="pillar-badge" style="background:{PILLARS[i % len(PILLARS)]['color']};">{day} — {purpose}</span>
                    </div>
                    <div class="source">📰 {topic.get('source', 'Unknown source')}
                        {f' · <a href="{topic.get("articleUrl", "")}" target="_blank" style="color:#DAA520;">View Article ↗</a>' if topic.get('articleUrl') else ''}
                    </div>
                    <div class="summary">{topic.get('summary', '')}</div>
                    <div style="margin-top:0.5rem; color:#8B949E; font-size:0.8rem;">
                        💡 <strong>Data Point:</strong> {topic.get('killerDataPoint', 'N/A')} · 🧠 {topic.get('mechanism', 'N/A')}
                    </div>
                </div>
                """, unsafe_allow_html=True)


# ═══════════════════════════════════════════════════════════════════
# TAB 2: WRITE ALL
# ═══════════════════════════════════════════════════════════════════
with tab_write:
    st.markdown("### ✍️ Step 2: Write All Posts")
    st.markdown("Generate Facebook and Instagram posts for all 7 stories using Claude.")

    if not st.session_state.topics:
        st.warning("⚠️ Find stories first (Step 1) before writing posts.")
    elif not st.session_state.claude_key:
        st.warning("⚠️ Enter your Claude API key in the sidebar to write posts.")
    else:
        write_btn = st.button("✍️ Write All 7 Posts", type="primary", use_container_width=True)

        if write_btn:
            progress = st.progress(0, text="Generating posts...")
            posts = []

            for i, topic in enumerate(st.session_state.topics):
                progress.progress((i) / 7, text=f"Writing post {i+1}/7: {topic.get('headline', '')[:50]}...")
                try:
                    pillar = st.session_state.pillars[i] if i < len(st.session_state.pillars) else PILLARS[i % len(PILLARS)]
                    framework = st.session_state.frameworks[i] if i < len(st.session_state.frameworks) else FRAMEWORKS[i % len(FRAMEWORKS)]
                    cta = get_rotating_cta()
                    authority = get_rotating_authority()
                    neurochemical = st.session_state.neurochemicals_list[i] if i < len(st.session_state.neurochemicals_list) else None

                    raw = generate_post(topic, pillar, framework, cta, authority, st.session_state.claude_key, neurochemical)
                    parsed = parse_post(raw)

                    posts.append({
                        "id": f"post-{i}",
                        "topic": topic,
                        "pillar": pillar,
                        "framework": framework,
                        "cta": cta,
                        "authority": authority,
                        "neurochemical": neurochemical,
                        "raw": raw,
                        "facebook": parsed["facebook"],
                        "instagram": parsed["instagram"],
                        "confirmed": False,
                    })
                except Exception as e:
                    posts.append({
                        "id": f"post-{i}",
                        "topic": topic,
                        "pillar": st.session_state.pillars[i] if i < len(st.session_state.pillars) else PILLARS[0],
                        "framework": FRAMEWORKS[0],
                        "cta": CTAS[-1],
                        "authority": AUTHORITY_LINES[0],
                        "neurochemical": None,
                        "raw": f"Error: {str(e)}",
                        "facebook": f"Error generating post: {str(e)}",
                        "instagram": "",
                        "confirmed": False,
                    })

            progress.progress(1.0, text="✅ All posts generated!")
            st.session_state.posts = posts
            st.success(f"✅ Generated {len(posts)} posts!")


# ═══════════════════════════════════════════════════════════════════
# TAB 3: REVIEW & EDIT
# ═══════════════════════════════════════════════════════════════════
with tab_review:
    st.markdown("### 📋 Step 3: Review, Edit & Confirm")

    if not st.session_state.posts:
        st.warning("⚠️ Write posts first (Step 2) before reviewing.")
    else:
        days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
        confirmed_count = sum(1 for p in st.session_state.posts if p.get("confirmed"))
        st.markdown(f"**{confirmed_count}/{len(st.session_state.posts)}** posts confirmed")

        for i, post in enumerate(st.session_state.posts):
            day = days[i] if i < len(days) else f"Day {i+1}"
            pillar = post["pillar"]
            is_confirmed = post.get("confirmed", False)
            status_icon = "✅" if is_confirmed else "📝"

            with st.expander(f"{status_icon} {day}: {post['topic'].get('headline', 'Post')[:60]}", expanded=not is_confirmed):
                # Pillar & framework badges
                col1, col2, col3 = st.columns(3)
                col1.markdown(f"**Pillar:** {pillar['icon']} {pillar['name']}")
                col2.markdown(f"**Framework:** {post['framework']['icon']} {post['framework']['name']}")
                col3.markdown(f"**CTA:** {post['cta']['shortName']}")

                # Platform tabs
                fb_tab, ig_tab, video_tab, shorts_tab, email_tab = st.tabs([
                    "📘 Facebook", "📸 Instagram", "🎬 Video Script", "⏱️ 30s Short", "📧 Email"
                ])

                with fb_tab:
                    fb_key = f"fb_{i}"
                    edited_fb = st.text_area(
                        "Facebook Post", value=post["facebook"],
                        height=400, key=fb_key,
                        label_visibility="collapsed"
                    )
                    # Update if edited
                    if edited_fb != post["facebook"]:
                        st.session_state.posts[i]["facebook"] = edited_fb

                with ig_tab:
                    ig_key = f"ig_{i}"
                    edited_ig = st.text_area(
                        "Instagram Caption", value=post["instagram"],
                        height=300, key=ig_key,
                        label_visibility="collapsed"
                    )
                    if edited_ig != post["instagram"]:
                        st.session_state.posts[i]["instagram"] = edited_ig

                with video_tab:
                    video_key = f"video_{i}"
                    if f"video_script_{i}" not in st.session_state:
                        st.session_state[f"video_script_{i}"] = ""

                    if st.button(f"🎬 Generate Video Script", key=f"gen_video_{i}"):
                        if st.session_state.claude_key:
                            with st.spinner("Generating video script..."):
                                try:
                                    script = generate_video_script(
                                        post["topic"], post["facebook"], post["pillar"],
                                        st.session_state.claude_key
                                    )
                                    st.session_state[f"video_script_{i}"] = script
                                    st.success("✅ Video script generated!")
                                except Exception as e:
                                    st.error(f"Error: {e}")

                    if st.session_state[f"video_script_{i}"]:
                        st.text_area("Video Script", value=st.session_state[f"video_script_{i}"],
                                    height=400, key=f"video_text_{i}")

                with shorts_tab:
                    if f"shorts_script_{i}" not in st.session_state:
                        st.session_state[f"shorts_script_{i}"] = ""

                    if st.button(f"⏱️ Generate 30s Short", key=f"gen_shorts_{i}"):
                        if st.session_state.claude_key:
                            with st.spinner("Generating 30-second Short script..."):
                                try:
                                    script = generate_shorts_script(
                                        post["topic"], post["facebook"],
                                        st.session_state.claude_key
                                    )
                                    st.session_state[f"shorts_script_{i}"] = script
                                    st.success("✅ Short script generated!")
                                except Exception as e:
                                    st.error(f"Error: {e}")

                    if st.session_state[f"shorts_script_{i}"]:
                        st.text_area("30s Short Script", value=st.session_state[f"shorts_script_{i}"],
                                    height=300, key=f"shorts_text_{i}")

                with email_tab:
                    if f"email_data_{i}" not in st.session_state:
                        st.session_state[f"email_data_{i}"] = None

                    if st.button(f"📧 Generate Email", key=f"gen_email_{i}"):
                        if st.session_state.claude_key:
                            with st.spinner("Generating email..."):
                                try:
                                    email_data = generate_email(
                                        post["topic"], post["pillar"], post["cta"],
                                        post["facebook"], st.session_state.claude_key
                                    )
                                    st.session_state[f"email_data_{i}"] = email_data
                                    st.success("✅ Email generated!")
                                except Exception as e:
                                    st.error(f"Error: {e}")

                    if st.session_state[f"email_data_{i}"]:
                        ed = st.session_state[f"email_data_{i}"]
                        st.markdown(f"**Subject:** {ed.get('subject', '')}")
                        st.markdown(f"**Preheader:** {ed.get('preheader', '')}")
                        st.markdown("---")
                        st.markdown(ed.get("hook", ""))
                        st.markdown(ed.get("articleInsight", ""))
                        if ed.get("dataHighlight"):
                            st.info(f"📊 {ed['dataHighlight']}")
                        st.markdown(ed.get("problem", ""))
                        st.markdown(ed.get("racingScenario", ""))
                        st.markdown(ed.get("bridge", ""))

                # Action buttons
                col_confirm, col_regen = st.columns(2)
                with col_confirm:
                    if st.button(
                        "✅ Confirm" if not is_confirmed else "↩️ Unconfirm",
                        key=f"confirm_{i}", type="primary" if not is_confirmed else "secondary"
                    ):
                        st.session_state.posts[i]["confirmed"] = not is_confirmed
                        st.rerun()

                with col_regen:
                    if st.button("🔄 Regenerate", key=f"regen_{i}"):
                        if st.session_state.claude_key:
                            with st.spinner("Regenerating post..."):
                                try:
                                    raw = generate_post(
                                        post["topic"], post["pillar"], post["framework"],
                                        post["cta"], post["authority"],
                                        st.session_state.claude_key, post.get("neurochemical")
                                    )
                                    parsed = parse_post(raw)
                                    st.session_state.posts[i]["raw"] = raw
                                    st.session_state.posts[i]["facebook"] = parsed["facebook"]
                                    st.session_state.posts[i]["instagram"] = parsed["instagram"]
                                    st.session_state.posts[i]["confirmed"] = False
                                    st.rerun()
                                except Exception as e:
                                    st.error(f"Error: {e}")


# ═══════════════════════════════════════════════════════════════════
# TAB 4: EXPORT
# ═══════════════════════════════════════════════════════════════════
with tab_export:
    st.markdown("### 📤 Step 4: Export")

    confirmed = [p for p in st.session_state.posts if p.get("confirmed")]

    if not confirmed:
        st.warning("⚠️ Confirm at least one post (Step 3) to export.")
    else:
        st.success(f"✅ {len(confirmed)} posts ready to export")

        # CSV Export for GHL Social Planner
        st.markdown("#### 📁 CSV Export (GHL Social Planner)")
        start_date = st.date_input("Start Date", value=datetime.now().date())

        if st.button("📥 Download CSV", type="primary"):
            output = io.StringIO()
            writer = csv.writer(output)
            writer.writerow(["Date", "Time", "Platform", "Content", "Day", "Pillar", "Framework", "CTA"])

            days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
            for i, post in enumerate(confirmed):
                post_date = start_date + timedelta(days=i)
                day = days[i % 7]

                # Facebook row
                writer.writerow([
                    post_date.strftime("%Y-%m-%d"), "09:00",
                    "Facebook", post["facebook"],
                    day, post["pillar"]["name"], post["framework"]["name"],
                    post["cta"]["shortName"]
                ])
                # Instagram row
                if post["instagram"]:
                    writer.writerow([
                        post_date.strftime("%Y-%m-%d"), "12:00",
                        "Instagram", post["instagram"],
                        day, post["pillar"]["name"], post["framework"]["name"],
                        post["cta"]["shortName"]
                    ])

            csv_data = output.getvalue()
            st.download_button(
                "⬇️ Download CSV File",
                csv_data,
                file_name=f"social_content_{start_date.strftime('%Y%m%d')}.csv",
                mime="text/csv"
            )

        # JSON Export
        st.markdown("---")
        st.markdown("#### 📋 JSON Export (Full Data)")
        if st.button("📥 Download JSON"):
            json_data = json.dumps([{
                "day": i,
                "headline": p["topic"].get("headline", ""),
                "facebook": p["facebook"],
                "instagram": p["instagram"],
                "pillar": p["pillar"]["name"],
                "framework": p["framework"]["name"],
                "cta": p["cta"]["shortName"],
                "source": p["topic"].get("source", ""),
                "articleUrl": p["topic"].get("articleUrl", ""),
            } for i, p in enumerate(confirmed)], indent=2)

            st.download_button(
                "⬇️ Download JSON File",
                json_data,
                file_name=f"social_content_{start_date.strftime('%Y%m%d')}.json",
                mime="application/json"
            )

        # Copy all content
        st.markdown("---")
        st.markdown("#### 📋 Quick Copy")
        for i, post in enumerate(confirmed):
            days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
            day = days[i % 7]
            with st.expander(f"📋 {day}: {post['topic'].get('headline', '')[:50]}"):
                st.code(post["facebook"], language=None)
                if post["instagram"]:
                    st.markdown("---")
                    st.code(post["instagram"], language=None)


# ═══════════════════════════════════════════════════════════════════
# TAB 5: CALENDAR
# ═══════════════════════════════════════════════════════════════════
with tab_calendar:
    st.markdown("### 📅 2026 Championship Calendar")

    # Upcoming races
    now = datetime.now()
    upcoming = [r for r in F1_2026 if datetime.strptime(r["date"], "%Y-%m-%d") >= now][:6]

    if upcoming:
        st.markdown("#### 🏎️ Upcoming Races")
        for race in upcoming:
            race_date = datetime.strptime(race["date"], "%Y-%m-%d")
            days_until = (race_date - now).days

            if days_until <= 7:
                label = "🔴 THIS WEEK"
            elif days_until <= 14:
                label = "🟡 NEXT WEEK"
            else:
                label = f"📅 In {days_until} days"

            st.markdown(f"""
            <div class="topic-card">
                <h4>Round {race['round']}: {race['name']}</h4>
                <div class="source">{race['circuit']} · {race['country']} · {race['date']} · {label}</div>
            </div>
            """, unsafe_allow_html=True)

    # Full calendar
    with st.expander("📅 Full 2026 F1 Calendar"):
        for race in F1_2026:
            st.markdown(f"**R{race['round']}** {race['name']} — {race['circuit']}, {race['country']} — {race['date']}")


# ═══════════════════════════════════════════════════════════════════
# TAB 6: DATA
# ═══════════════════════════════════════════════════════════════════
with tab_data:
    st.markdown("### 📊 Content Engine Data")

    # Pillars
    with st.expander("📌 7 Content Pillars", expanded=True):
        for pillar in PILLARS:
            st.markdown(f"""
            <div style="display:flex; align-items:center; gap:0.75rem; margin-bottom:0.75rem; padding:0.75rem; background:#161B22; border-radius:8px; border-left:4px solid {pillar['color']};">
                <span style="font-size:1.5rem;">{pillar['icon']}</span>
                <div>
                    <strong style="color:{pillar['color']};">{pillar['name']}</strong>
                    <span style="color:#8B949E; font-size:0.75rem; margin-left:0.5rem;">({pillar['group']})</span>
                    <br/><span style="color:#C8D1DC; font-size:0.85rem;">{pillar['description'][:120]}...</span>
                </div>
            </div>
            """, unsafe_allow_html=True)

    # Frameworks
    with st.expander("🎭 5 Frameworks (3S + 2F)"):
        for fw in FRAMEWORKS:
            st.markdown(f"**{fw['icon']} {fw['name']}** — {fw['hookStyle']}")

    # CTAs
    with st.expander("📣 5 CTAs"):
        for cta in CTAS:
            st.markdown(f"**{cta['shortName']}** — Trigger: `{cta['triggerWord']}`")

    # Neurochemicals
    with st.expander("🧬 7 Neurochemicals"):
        for chem in NEUROCHEMICALS:
            st.markdown(f"""
            <div style="padding:0.5rem; margin-bottom:0.5rem; background:#161B22; border-radius:6px; border-left:3px solid {chem['color']};">
                <strong>{chem['icon']} {chem['name']}</strong> — {chem['label']}<br/>
                <span style="color:#8B949E; font-size:0.85rem;">{chem['whatItDoes']}</span>
            </div>
            """, unsafe_allow_html=True)

    # Authority Lines
    with st.expander("💪 Authority Lines"):
        for line in AUTHORITY_LINES:
            st.markdown(f"- {line}")

    # Data Layers
    with st.expander("📈 Data Layers"):
        for layer_key, layer in DATA_LAYERS.items():
            st.markdown(f"**{layer['label']}**")
            for k, v in layer["stats"].items():
                st.markdown(f"  - {k}: **{v}**")
