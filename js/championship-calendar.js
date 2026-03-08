// ═══════════════════════════════════════════════════════════════
// 🏁 2026 CHAMPIONSHIP CALENDAR MODULE
// Source: 2026 Motorcycle Championship Research.pdf
// UK (BSB), USA (MotoAmerica + Pro MX), Australia (ASBK),
// Canada (CSBK), New Zealand (NZSBK)
// ═══════════════════════════════════════════════════════════════

// ─── BSB: ZYN British Superbike Championship (BSB30) ─────────
export const BSB_2026 = {
    name: 'ZYN British Superbike Championship',
    shortName: 'BSB',
    country: 'UK',
    flag: '🇬🇧',
    season: 'BSB30 — 30th Anniversary Season',
    titleSponsor: 'ZYN (from Bennetts)',
    showdownRounds: [9, 10, 11],
    events: [
        { type: 'test', round: null, name: 'R&G Official Test 1', date: '2026-04-03', dateEnd: '2026-04-04', venue: 'Donington Park', config: 'GP Circuit' },
        { type: 'test', round: null, name: 'R&G Official Test 2', date: '2026-04-21', dateEnd: '2026-04-22', venue: 'Oulton Park', config: 'International' },
        { type: 'race', round: 1, name: 'Round 1 (Opening)', date: '2026-05-02', dateEnd: '2026-05-04', venue: 'Oulton Park', config: 'International' },
        { type: 'race', round: 2, name: 'Round 2', date: '2026-05-15', dateEnd: '2026-05-17', venue: 'Donington Park', config: 'GP Circuit' },
        { type: 'race', round: 3, name: 'Round 3', date: '2026-06-19', dateEnd: '2026-06-21', venue: 'Knockhill', config: 'Full Circuit' },
        { type: 'race', round: 4, name: 'Round 4', date: '2026-07-03', dateEnd: '2026-07-05', venue: 'Snetterton', config: '300 Circuit' },
        { type: 'race', round: 5, name: 'Round 5', date: '2026-07-17', dateEnd: '2026-07-19', venue: 'Brands Hatch', config: 'GP Circuit', special: 'Century of Power centenary celebrations' },
        { type: 'race', round: 6, name: 'Round 6', date: '2026-07-31', dateEnd: '2026-08-02', venue: 'Oulton Park', config: 'International' },
        { type: 'race', round: 7, name: 'Round 7', date: '2026-08-14', dateEnd: '2026-08-16', venue: 'Thruxton', config: 'Full Circuit' },
        { type: 'race', round: 8, name: 'Round 8', date: '2026-08-29', dateEnd: '2026-08-31', venue: 'Cadwell Park', config: 'Full Circuit', special: 'Party in the Park festival' },
        { type: 'race', round: 9, name: 'Round 9 (Showdown)', date: '2026-09-18', dateEnd: '2026-09-20', venue: 'TT Circuit Assen (NLD)', config: 'GP Circuit', showdown: true },
        { type: 'race', round: 10, name: 'Round 10 (Showdown)', date: '2026-10-02', dateEnd: '2026-10-04', venue: 'Donington Park', config: 'GP Circuit', showdown: true },
        { type: 'race', round: 11, name: 'Round 11 (Finale)', date: '2026-10-16', dateEnd: '2026-10-18', venue: 'Brands Hatch', config: 'GP Circuit', showdown: true }
    ]
};

// ─── MotoAmerica: 50th Anniversary of AMA Superbike ──────────
export const MOTOAMERICA_2026 = {
    name: 'MotoAmerica Superbike Championship',
    shortName: 'MotoAmerica',
    country: 'USA',
    flag: '🇺🇸',
    season: '50th Anniversary of AMA Superbike Racing (first race Daytona 1976)',
    notes: 'Stock 1000 merged into Superbike as "Superbike Cup". Samsung TV Plus FAST streaming deal for live coverage.',
    events: [
        { type: 'race', round: null, name: 'Daytona 200', date: '2026-03-05', dateEnd: '2026-03-07', venue: 'Daytona International Speedway', classes: 'Supersport, KOTB, Twins Cup' },
        { type: 'race', round: null, name: 'COTA MotoGP Support', date: '2026-03-27', dateEnd: '2026-03-29', venue: 'Circuit of The Americas', classes: 'Talent Cup' },
        { type: 'race', round: 1, name: 'Road Atlanta', date: '2026-04-17', dateEnd: '2026-04-19', venue: 'Michelin Raceway Road Atlanta', classes: 'Superbike, KOTB, Supersport' },
        { type: 'race', round: 2, name: 'Barber', date: '2026-05-15', dateEnd: '2026-05-17', venue: 'Barber Motorsports Park', classes: 'Superbike, Supersport, Twins' },
        { type: 'race', round: 3, name: 'Road America', date: '2026-05-29', dateEnd: '2026-05-31', venue: 'Road America', classes: 'Superbike, KOTB, Vintage MotoFest' },
        { type: 'race', round: 4, name: 'The Ridge', date: '2026-06-26', dateEnd: '2026-06-28', venue: 'Ridge Motorsports Park', classes: 'Superbike, Supersport, Hooligans' },
        { type: 'race', round: 5, name: 'Laguna Seca', date: '2026-07-10', dateEnd: '2026-07-12', venue: 'WeatherTech Raceway Laguna Seca', classes: 'Superbike, KOTB, Hooligans' },
        { type: 'race', round: 6, name: 'Mid-Ohio', date: '2026-07-31', dateEnd: '2026-08-02', venue: 'Mid-Ohio Sports Car Course', classes: 'Superbike, KOTB, Hooligans' },
        { type: 'race', round: 7, name: 'COTA', date: '2026-09-11', dateEnd: '2026-09-13', venue: 'Circuit of The Americas', classes: 'Superbike, KOTB, Supersport' },
        { type: 'race', round: 8, name: 'New Jersey (Finale)', date: '2026-09-25', dateEnd: '2026-09-27', venue: 'New Jersey Motorsports Park', classes: 'Superbike Finale (Tripleheader)' }
    ]
};

// ─── US Pro Motocross: 55th Edition ──────────────────────────
export const PROMX_2026 = {
    name: 'AMA Pro Motocross Championship',
    shortName: 'Pro MX',
    country: 'USA',
    flag: '🇺🇸',
    season: '55th Edition — feeds into SuperMotocross (SMX) Playoffs in September',
    events: [
        { type: 'race', round: 1, name: 'Fox Raceway', date: '2026-05-30', venue: 'Fox Raceway at Pala', location: 'Pala, CA' },
        { type: 'race', round: 2, name: 'Prairie City', date: '2026-06-06', venue: 'Prairie City SVRA', location: 'Rancho Cordova, CA' },
        { type: 'race', round: 3, name: 'Thunder Valley', date: '2026-06-13', venue: 'Thunder Valley Motocross Park', location: 'Lakewood, CO' },
        { type: 'race', round: 4, name: 'High Point', date: '2026-06-20', venue: 'High Point Raceway', location: 'Mt. Morris, PA' },
        { type: 'race', round: 5, name: 'RedBud', date: '2026-07-04', venue: 'RedBud MX', location: 'Buchanan, MI' },
        { type: 'race', round: 6, name: 'The Wick', date: '2026-07-11', venue: 'The Wick 338', location: 'Southwick, MA' },
        { type: 'race', round: 7, name: 'Spring Creek', date: '2026-07-18', venue: 'Spring Creek MX Park', location: 'Millville, MN' },
        { type: 'race', round: 8, name: 'Washougal', date: '2026-07-25', venue: 'Washougal MX Park', location: 'Washougal, WA' },
        { type: 'race', round: 9, name: 'Unadilla', date: '2026-08-15', venue: 'Unadilla MX', location: 'New Berlin, NY' },
        { type: 'race', round: 10, name: 'Budds Creek', date: '2026-08-22', venue: 'Budds Creek Motocross Park', location: 'Mechanicsville, MD' },
        { type: 'race', round: 11, name: 'Ironman (Finale)', date: '2026-08-29', venue: 'Ironman Raceway', location: 'Crawfordsville, IN' }
    ]
};

// ─── ASBK: Australian Superbike — Transitional Season ────────
export const ASBK_2026 = {
    name: 'Australian Superbike Championship',
    shortName: 'ASBK',
    country: 'Australia',
    flag: '🇦🇺',
    season: 'Transitional "short and sharp" season — moving to 2026/27 Summer Championship in October',
    notes: 'New Teams Championship introduced. Podium protocols revised — top 3 per race instead of "overall" round podium. Harrison Voight won R1 at Phillip Island. Josh Waters defending 5x champion.',
    events: [
        { type: 'race', round: 1, name: 'Rd 1 — Phillip Island', date: '2026-02-20', dateEnd: '2026-02-22', venue: 'Phillip Island, VIC', special: 'With WorldSBK' },
        { type: 'race', round: 2, name: 'Rd 2 — Sydney Motorsport Park', date: '2026-03-27', dateEnd: '2026-03-28', venue: 'Sydney Motorsport Park, NSW', special: 'Night Race' },
        { type: 'race', round: 3, name: 'Rd 3 — The Bend', date: '2026-05-01', dateEnd: '2026-05-03', venue: 'The Bend, SA', special: 'Full Track' },
        { type: 'race', round: 4, name: 'Rd 4 — Morgan Park', date: '2026-05-29', dateEnd: '2026-05-31', venue: 'Morgan Park Raceway, QLD' },
        { type: 'race', round: 5, name: 'Rd 5 — Queensland Raceway (Phase 1 Finale)', date: '2026-06-26', dateEnd: '2026-06-28', venue: 'Queensland Raceway, QLD', special: 'Phase 1 Finale' }
    ],
    summerSeries: {
        name: '2026/27 ASBK Summer Championship',
        status: 'Provisional',
        events: [
            { round: 1, month: 'Oct 2026', venue: 'TBA' },
            { round: 2, month: 'Nov 2026', venue: 'The Bend, SA' },
            { round: 3, month: 'Dec 2026', venue: 'One Raceway, NSW' },
            { round: 4, month: 'Jan 2027', venue: 'TBA' },
            { round: 5, month: 'Feb 2027', venue: 'Phillip Island, VIC (WorldSBK)' },
            { round: 6, month: 'Mar 2027', venue: 'Queensland Raceway, QLD' },
            { round: 7, month: 'Apr 2027', venue: 'The Bend, SA' }
        ]
    }
};

// ─── CSBK: Bridgestone Canadian Superbike ────────────────────
export const CSBK_2026 = {
    name: 'Bridgestone Canadian Superbike Championship',
    shortName: 'CSBK',
    country: 'Canada',
    flag: '🇨🇦',
    season: 'Bridgestone title sponsorship and spec-tire agreement. Calabogie returns. Ben Young chasing history — 86.3% podium rate.',
    notes: 'Kawasaki $150,000 contingency program. Ben Young pursuing all-time wins record behind Jordan Szoke.',
    events: [
        { type: 'race', round: 1, name: 'Shannonville', date: '2026-05-15', dateEnd: '2026-05-17', venue: 'Shannonville Motorsport Park', location: 'Shannonville, ON' },
        { type: 'race', round: 2, name: 'Atlantic Motorsport Park', date: '2026-06-05', dateEnd: '2026-06-07', venue: 'Atlantic Motorsport Park', location: 'Shubenacadie, NS' },
        { type: 'race', round: 3, name: 'Calabogie', date: '2026-06-26', dateEnd: '2026-06-28', venue: 'Calabogie Motorsports Park', location: 'Calabogie, ON', special: 'Return of professional racing to Calabogie' },
        { type: 'race', round: 4, name: 'Grand Bend', date: '2026-07-10', dateEnd: '2026-07-12', venue: 'Grand Bend Motorplex', location: 'Grand Bend, ON' },
        { type: 'race', round: 5, name: 'Canadian Tire Motorsport Park (Finale)', date: '2026-08-06', dateEnd: '2026-08-09', venue: 'Canadian Tire Motorsport Park', location: 'Bowmanville, ON' }
    ]
};

// ─── NZSBK: New Zealand Superbike ────────────────────────────
export const NZSBK_2026 = {
    name: 'New Zealand Superbike Championship',
    shortName: 'NZSBK',
    country: 'New Zealand',
    flag: '🇳🇿',
    season: 'Compressed summer window (Jan-Mar). New Trophy class introduced. Rogan Chandler (M1 BMW) leading by 19 points.',
    notes: 'Superbike Supersport Trophy class — "Grid within a Grid" format with lap time cut-offs. Superbike Pathways Foundation launched for junior/amateur development.',
    events: [
        { type: 'race', round: 1, name: 'Iconic Motorbikes NZGP', date: '2026-01-31', dateEnd: '2026-02-01', venue: 'Ruapuna Raceway' },
        { type: 'race', round: 2, name: 'Burt Munro Challenge', date: '2026-02-07', dateEnd: '2026-02-08', venue: 'Teretonga' },
        { type: 'race', round: 3, name: 'MotoFest', date: '2026-03-07', dateEnd: '2026-03-08', venue: 'Hampton Downs' },
        { type: 'race', round: 4, name: 'MotoMania (Finale)', date: '2026-03-14', dateEnd: '2026-03-15', venue: 'Taupo Motorsport Park' }
    ]
};

// ═══════════════════════════════════════════════════════════════
// COMBINED CALENDAR + SMART LOOKUP
// ═══════════════════════════════════════════════════════════════

export const ALL_CHAMPIONSHIPS = [BSB_2026, MOTOAMERICA_2026, PROMX_2026, ASBK_2026, CSBK_2026, NZSBK_2026];

/**
 * Get all events across all championships, sorted by date
 */
export function getAllEventsSorted() {
    const events = [];
    for (const champ of ALL_CHAMPIONSHIPS) {
        for (const event of champ.events) {
            events.push({
                ...event,
                championship: champ.shortName,
                country: champ.country,
                flag: champ.flag,
                championshipName: champ.name
            });
        }
    }
    return events.sort((a, b) => new Date(a.date) - new Date(b.date));
}

/**
 * Get upcoming events within the next N days
 */
export function getUpcomingEvents(daysAhead = 14) {
    const now = new Date();
    const cutoff = new Date(now.getTime() + daysAhead * 24 * 60 * 60 * 1000);
    const allEvents = getAllEventsSorted();

    return allEvents.filter(event => {
        const eventDate = new Date(event.date);
        return eventDate >= now && eventDate <= cutoff;
    });
}

/**
 * Get recent events from the last N days (for post-race content)
 */
export function getRecentEvents(daysBack = 7) {
    const now = new Date();
    const cutoff = new Date(now.getTime() - daysBack * 24 * 60 * 60 * 1000);
    const allEvents = getAllEventsSorted();

    return allEvents.filter(event => {
        const eventEnd = event.dateEnd ? new Date(event.dateEnd) : new Date(event.date);
        return eventEnd >= cutoff && eventEnd <= now;
    });
}

/**
 * Get the current race weekend (if any championship is racing this weekend)
 */
export function getCurrentRaceWeekend() {
    const now = new Date();
    const allEvents = getAllEventsSorted();

    return allEvents.filter(event => {
        const start = new Date(event.date);
        const end = event.dateEnd ? new Date(event.dateEnd) : new Date(event.date);
        // Extend end by 1 day to catch Sunday results on Monday
        end.setDate(end.getDate() + 1);
        return now >= start && now <= end;
    });
}

/**
 * Get championship context for AI topic generation
 * Returns a structured object the AI can use for search and post context
 */
export function getChampionshipContext() {
    const upcoming = getUpcomingEvents(14);
    const recent = getRecentEvents(7);
    const currentWeekend = getCurrentRaceWeekend();
    const now = new Date();
    const month = now.getMonth();

    // Determine which championships are in season
    const inSeason = [];
    if (month >= 1 && month <= 9) inSeason.push('NZSBK'); // Jan-Oct (summer series)
    if (month >= 3 && month <= 9) inSeason.push('BSB');    // Apr-Oct
    if (month >= 2 && month <= 8) inSeason.push('MotoAmerica', 'Pro MX'); // Mar-Sep
    if (month >= 1 && month <= 5) inSeason.push('ASBK');   // Feb-Jun (Phase 1)
    if (month >= 4 && month <= 7) inSeason.push('CSBK');   // May-Aug

    // Build search context strings
    const searchTerms = [];
    const postContext = [];

    if (currentWeekend.length > 0) {
        for (const event of currentWeekend) {
            searchTerms.push(`${event.championship} ${event.venue} ${new Date(event.date).getFullYear()} results`);
            postContext.push(`🏁 RACE WEEKEND NOW: ${event.flag} ${event.championship} — ${event.name} at ${event.venue}`);
        }
    }

    if (recent.length > 0) {
        for (const event of recent) {
            searchTerms.push(`${event.championship} ${event.venue} race results winner`);
            postContext.push(`📰 JUST RACED: ${event.flag} ${event.championship} — ${event.name} at ${event.venue} (results available for content)`);
        }
    }

    if (upcoming.length > 0) {
        for (const event of upcoming) {
            searchTerms.push(`${event.championship} ${event.venue} preview rider entries`);
            postContext.push(`📅 COMING UP: ${event.flag} ${event.championship} — ${event.name} at ${event.venue} (${event.date})`);
        }
    }

    // Add anniversary context
    const anniversaryContext = [];
    anniversaryContext.push('BSB30 — 30th anniversary of British Superbike Championship');
    anniversaryContext.push('AMA Superbike — 50th anniversary (first race Daytona 1976)');
    anniversaryContext.push('ASBK transition to summer racing calendar');

    return {
        inSeason,
        currentWeekend,
        upcoming,
        recent,
        searchTerms,
        postContext,
        anniversaryContext,
        hasLiveRacing: currentWeekend.length > 0,
        hasRecentResults: recent.length > 0,
        hasUpcoming: upcoming.length > 0
    };
}

/**
 * Format championship context for AI system prompt injection
 */
export function formatContextForAI() {
    const ctx = getChampionshipContext();
    let text = '\n\n# 2026 CHAMPIONSHIP CALENDAR CONTEXT\n';

    if (ctx.hasLiveRacing) {
        text += '\n## 🏁 LIVE RACING THIS WEEKEND\n';
        ctx.currentWeekend.forEach(e => {
            text += `- ${e.flag} ${e.championship}: ${e.name} at ${e.venue}\n`;
            if (e.special) text += `  Special: ${e.special}\n`;
        });
        text += 'USE THIS: Reference this weekend\'s racing in posts. Search for rider preview, grid, and early results.\n';
    }

    if (ctx.hasRecentResults) {
        text += '\n## 📰 RECENT RACE RESULTS (last 7 days)\n';
        ctx.recent.forEach(e => {
            text += `- ${e.flag} ${e.championship}: ${e.name} at ${e.venue} (${e.date})\n`;
        });
        text += 'USE THIS: Reference results and rider performances. Search for race reports, winner interviews, and key battles.\n';
    }

    if (ctx.hasUpcoming) {
        text += '\n## 📅 UPCOMING EVENTS (next 14 days)\n';
        ctx.upcoming.forEach(e => {
            text += `- ${e.flag} ${e.championship}: ${e.name} at ${e.venue} (${e.date})\n`;
            if (e.special) text += `  Special: ${e.special}\n`;
        });
        text += 'USE THIS: Build anticipation posts, preview content, and track-specific challenges.\n';
    }

    if (ctx.inSeason.length > 0) {
        text += `\n## Championships in season: ${ctx.inSeason.join(', ')}\n`;
    }

    text += '\n## Key 2026 Storylines\n';
    ctx.anniversaryContext.forEach(a => text += `- ${a}\n`);
    text += '- Samsung TV Plus FAST streaming deal for MotoAmerica live races\n';
    text += '- ASBK Night Race at Sydney Motorsport Park\n';
    text += '- Calabogie returns to CSBK calendar\n';
    text += '- Ben Young chasing all-time CSBK wins record\n';
    text += '- NZSBK Trophy class "Grid within a Grid" format for development riders\n';
    text += '- Harrison Voight vs Josh Waters generational clash in ASBK\n';

    return text;
}

/**
 * Get search terms for AI topic generation based on current calendar position
 */
export function getCalendarSearchTerms() {
    const ctx = getChampionshipContext();
    const terms = [...ctx.searchTerms];

    // Add general terms based on what's in season
    if (ctx.inSeason.includes('BSB')) {
        terms.push('BSB 2026 results standings rider interviews');
        terms.push('British Superbike BSB30 anniversary news');
    }
    if (ctx.inSeason.includes('MotoAmerica')) {
        terms.push('MotoAmerica 2026 Superbike results standings');
        terms.push('King of the Baggers KOTB 2026 results');
    }
    if (ctx.inSeason.includes('ASBK')) {
        terms.push('ASBK 2026 Australian Superbike results');
        terms.push('Harrison Voight Josh Waters ASBK 2026');
    }
    if (ctx.inSeason.includes('CSBK')) {
        terms.push('CSBK 2026 Canadian Superbike Ben Young');
    }
    if (ctx.inSeason.includes('NZSBK')) {
        terms.push('NZSBK New Zealand Superbike 2026 Rogan Chandler');
    }

    return terms;
}
