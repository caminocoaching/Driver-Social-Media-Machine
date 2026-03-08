// ═══════════════════════════════════════════════════════════════
// 🏍️ REVIEW CONTENT PLAYBOOK — Review Bank Module
// Source: Trustpilot (85 reviews, 4.9★, 100% five-star)
//         Google (36 reviews, 5.0★, 100% five-star)
// For Craig Muirhead / Camino Coaching
// ═══════════════════════════════════════════════════════════════

// ─── Review Stats (Authority Anchor) ─────────────────────────
export const REVIEW_STATS = {
    trustpilot: {
        rating: 4.9,
        count: 85,
        fiveStarPercent: 100,
        url: 'https://uk.trustpilot.com/review/caminocoaching.co.uk',
        evaluateUrl: 'https://uk.trustpilot.com/evaluate/caminocoaching.co.uk'
    },
    google: {
        rating: 5.0,
        count: 36,
        fiveStarPercent: 100
    },
    combined: {
        totalReviews: 121,
        platforms: 2
    },
    lastScanned: '2026-02-28'
};

// ─── Authority Anchor Lines (Section 6 of Playbook) ──────────
export const REVIEW_AUTHORITY_LINES = [
    'Rated 4.9 out of 5 on Trustpilot from 85 unprompted driver reviews.',
    '85 five-star reviews on Trustpilot. 100% satisfaction rate.',
    '85 drivers have left a review. All five stars. Read them yourself: https://uk.trustpilot.com/review/caminocoaching.co.uk',
    '121 reviews across Trustpilot and Google. Every single one is five stars.',
    '4.9 on Trustpilot. 5.0 on Google. 121 drivers reviewed. 100% five stars.'
];

// ─── Pre-Approved Quoted Hooks (Section 1 of Playbook) ───────
// Each hook maps to content pillars and has a hook angle
export const QUOTED_HOOKS = [
    {
        id: 'hook-angela-fierceness',
        reviewer: 'Angela B.',
        country: 'US',
        date: 'Feb 2026',
        source: 'trustpilot',
        quote: 'I felt new levels of both fierceness and joy on the track which I had never before experienced during the past 10 years of racing.',
        pillars: ['the-money-lie', 'client-transformations'],
        hookAngle: '10 years of upgrades vs one mental shift',
        fullReview: 'I have spent more than I\'d like to admit on new bikes, fancy parts, private coaches, and race schools. Now, after incorporating some of the Camino Coaching techniques that I\'ve learned, I felt new levels of both fierceness and joy on the track which I had never before experienced during the past 10 years of racing. Thanks Coach!'
    },
    {
        id: 'hook-seb-fear-success',
        reviewer: 'Sebastian Downie',
        country: 'AU',
        date: 'Aug 2025',
        source: 'trustpilot',
        quote: 'One of my personal revealings has been a fear of success.',
        pillars: ['confidence', 'the-7-mistakes'],
        hookAngle: 'The fear nobody talks about in the paddock',
        fullReview: 'The knowledge and understanding of what can go on inside my helmet at speed combined with or compounded by activities outside of the race. Otherwise known as life can and does reflect on decisions made at critical moments. Camino coaching has deeped my understanding of balance and subconscious actions/reactions. One of my personal revealings has been a fear of success.'
    },
    {
        id: 'hook-seb-away-machine',
        reviewer: 'Sebastian Downie',
        country: 'AU',
        date: 'Aug 2025',
        source: 'trustpilot',
        quote: 'My problem is away from the machine where I have to front up to the world. This is the part of winning I really don\'t like!',
        pillars: ['race-pressure', 'confidence'],
        hookAngle: 'What happens when winning scares you more than losing',
        fullReview: 'Camino coaching showed me quite clearly my race craft is top notice whilst with the machine. My problem is away from the machine where I have to front up to the world. This is the part of winning I really don\'t like!'
    },
    {
        id: 'hook-sami-seat-time',
        reviewer: 'Sami C',
        country: 'US',
        date: 'Dec 2025',
        source: 'trustpilot',
        quote: 'I thought it was seat time or bike, but I\'ve done both at no avail.',
        pillars: ['the-money-lie'],
        hookAngle: 'What if seat time is not the answer?',
        fullReview: 'I\'ve been riding track for years. Often times I feel like I could\'ve done better. I thought it was seat time or bike, but I\'ve done both at no avail. My mentality has changed since I started with Camino coaching.'
    },
    {
        id: 'hook-sami-hesitant',
        reviewer: 'Sami C',
        country: 'US',
        date: 'Dec 2025',
        source: 'trustpilot',
        quote: 'Yes, I was hesitant at first. Yes, you\'ll need to face yourself and be honest about your thought process.',
        pillars: ['confidence'],
        hookAngle: 'The honesty most riders avoid',
        fullReview: 'Yes, I was hesitant at first Yes, you\'ll need to face yourself and be honest about your thought process. Once you take action, you\'ll find this training extremely valuable.'
    },
    {
        id: 'hook-jonathan-podiums',
        reviewer: 'Jonathan Prince',
        country: 'NZ',
        date: 'Oct 2025',
        source: 'trustpilot',
        quote: 'Podiums in all four of my starts for the season. This included one 1st overall and 2nd overall.',
        pillars: ['client-transformations'],
        hookAngle: 'Four starts. Four podiums. What changed?',
        fullReview: 'Craig and Camino Coaching course has been instrumental in getting my head right and consistently performing. My results last year were testament to the improvements with podiums in all four of my starts for the season. This included one 1st overall and 2nd overall, two 1st in class, one 2nd in class, and one 3rd in class.'
    },
    {
        id: 'hook-nibbler-mental',
        reviewer: 'The Nibbler',
        country: 'NL',
        date: 'Oct 2025',
        source: 'trustpilot',
        quote: 'It\'s been so helpful for me mentally helping set the right goals and keeping a realistic and good mindset on race weekends but also away from the racing too.',
        pillars: ['race-pressure', 'sleep-recovery'],
        hookAngle: 'The mental game does not stop when you leave the circuit',
        fullReview: 'I\'ve used Camino coaching for many years now and it\'s been so helpful for me mentally helping set the right goals and keeping a realistic and good mindset on race weekends but also away from the racing too.'
    },
    {
        id: 'hook-sherwick-retired',
        reviewer: 'Sherwick Min',
        country: 'US',
        date: 'Jun 2025',
        source: 'trustpilot',
        quote: 'I\'m a retired professional racer who was not having fun at track days.',
        pillars: ['flow-state'],
        hookAngle: 'When the fastest thing on track is your anxiety',
        fullReview: 'I\'m a retired professional racer who was not having fun at track days. I have had rider coaches who helped with analyzing my data, but I have never fully explored the mental aspect of racing.'
    },
    {
        id: 'hook-harry-generic',
        reviewer: 'Harry Cook',
        country: 'GB',
        date: 'Jan 2026',
        source: 'trustpilot',
        quote: 'Craig doesn\'t just give generic advice \u2013 he actually takes the time to understand you, your goals, and what\'s holding you back.',
        pillars: ['client-transformations'],
        hookAngle: 'Why generic mental coaching does not work for racers',
        fullReview: 'I\'ve been working with Camino Coaching with Craig and honestly it\'s been a game changer for me. Craig doesn\'t just give generic advice \u2013 he actually takes the time to understand you, your goals, and what\'s holding you back, then builds a clear plan around that.'
    },
    {
        id: 'hook-grant-team-manager',
        reviewer: 'Grant',
        country: 'NZ',
        date: 'Aug 2024',
        source: 'trustpilot',
        quote: 'I personally noticed massive changes in both riders, the focus, understanding how to correct a bad day, being relaxed, following processes, personally taking responsibility.',
        pillars: ['client-transformations'],
        hookAngle: 'What a team manager sees when the rider changes their approach',
        fullReview: 'I had the pleasure of meeting Craig two years ago, I watched his work with a rider in Europe. Last year I had two of my riders on his course, I personally noticed massive changes in both riders, the focus, understanding how to correct a bad day, being relaxed, following processes, personally taking responsibility, was big.'
    },
    {
        id: 'hook-rory-sponsorship',
        reviewer: 'Rory',
        country: 'IM',
        date: 'Dec 2024',
        source: 'trustpilot',
        quote: 'I looked at sponsorship course as it\'s always been something I find very uncomfortable.',
        pillars: ['confidence'],
        hookAngle: 'The uncomfortable conversation every racer avoids',
        fullReview: 'After completing the performance principles and ride in the zone training, I looked at sponsorship course as it\'s always been something I find very uncomfortable.'
    },
    {
        id: 'hook-neil-mindset',
        reviewer: 'Neil D',
        country: 'IE',
        date: 'Feb 2026',
        source: 'trustpilot',
        quote: 'The change in mindset is unbelievable.',
        pillars: ['confidence', 'client-transformations'],
        hookAngle: 'Short punchy bridge or CTA reinforcement',
        fullReview: 'Brillant so far, the change in mindset is unbelievable.'
    },
    {
        id: 'hook-chloe-nerves',
        reviewer: 'Chloe Gleeson (via Becky)',
        country: 'GB',
        date: 'Oct 2025',
        source: 'trustpilot',
        quote: 'I was able to apply the theory to my practical race experience which gave me a chance to understand how to control my nerves and mindset.',
        pillars: ['race-pressure', 'confidence'],
        hookAngle: 'Controlling nerves is not about calming down',
        fullReview: 'Written by Chloe Gleeson. Craig is very professional, all sessions are exceptionally interesting and helpful. I was able to apply the theory to my practical race experience which gave me a chance to understand how to control my nerves and mindset.'
    },
    {
        id: 'hook-andrew-titles',
        reviewer: 'Andrew Clarke',
        country: 'US',
        date: 'Google',
        source: 'google',
        quote: 'Helped me bring home 2 National titles and almost a dozen regional titles.',
        pillars: ['client-transformations'],
        hookAngle: '2 national titles from mental performance work',
        fullReview: 'Took the performance principals class and the results were amazing. Helped me bring home 2 National titles and almost a dozen regional titles.'
    },
    {
        id: 'hook-laurence-grid',
        reviewer: 'Laurence Norrington-Parois',
        country: 'GB',
        date: 'Google',
        source: 'google',
        quote: 'I started the year qualifying and finishing middle to back of the grid; by the end of the year, I qualified and finished 3rd.',
        pillars: ['client-transformations', 'confidence'],
        hookAngle: 'From back of grid to podium in one season',
        fullReview: 'I worked with Craig last year - I started the year qualifying and finishing middle to back of the grid; by the end of the year, I qualified and finished 3rd.'
    }
];

// ─── Objection Killers (Section 3 of Playbook) ───────────────
export const OBJECTION_KILLERS = {
    sceptical: [
        {
            reviewer: 'Sami C',
            quote: 'Yes, I was hesitant at first.',
            context: 'Now calls it "the real deal"'
        },
        {
            reviewer: 'MT (BSB-level rider)',
            quote: 'At first when I was discussing the course I was on the fence whether to do it but Craig was very helpful and answered all of my questions and I was still a little sceptical. Within the first week of the course I had my first race weekend and even though I\'d only completed 1 week I was able to make changes.',
            context: 'Had 100% confidence after one race weekend'
        }
    ],
    triedEverything: [
        {
            reviewer: 'Angela B.',
            quote: 'I have spent more than I\'d like to admit on new bikes, fancy parts, private coaches, and race schools.',
            context: 'Found speed in mental performance, not parts'
        },
        {
            reviewer: 'Sami C',
            quote: 'I thought it was seat time or bike, but I\'ve done both at no avail.',
            context: 'Mentality changed after starting coaching'
        },
        {
            reviewer: 'Sebastian Downie',
            quote: 'I\'ve been racing all types of machines over 30 years.',
            context: 'Found something coaching showed him he couldn\'t see before'
        },
        {
            reviewer: 'John B',
            quote: 'Ive always wanted to better myself on track and get quicker....weight loss, buying fast bits and bobs but never really had any considerable gains.',
            context: 'Course highlighted mental weaknesses'
        },
        {
            reviewer: 'Tim Banish Jr',
            quote: 'There\'s a saying that racing is 90% mental. However most people decide to buy a shiny part for their motorcycle thinking it will "make them faster" and they ignore the elephant in room.',
            context: 'Son noticeably more focused and confident'
        }
    ],
    worthTheMoney: [
        {
            reviewer: 'MT (BSB-level rider)',
            quote: 'It\'s definitely worth the money.',
            context: 'This by far is the first thing you should be doing'
        },
        {
            reviewer: 'Sebastian Downie',
            quote: 'This coaching could have cut my learning time massively, also saving me massively too.',
            context: '30 years of self-funded racing'
        },
        {
            reviewer: 'Mike',
            quote: 'All the time you\'re hesitating about signing up for the course, you\'re standing still!',
            context: 'PB after PB after starting'
        },
        {
            reviewer: 'Nick Lascelles',
            quote: 'The online content and the coaching time provided makes the course good value, even with the New Zealand dollar exchange rate.',
            context: 'Already paying off'
        },
        {
            reviewer: 'Ross',
            quote: 'It\'s defiantly worth the money.',
            context: 'Programmes well put together'
        }
    ]
};

// ─── Screenshot Priority List (Section 4 of Playbook) ────────
export const SCREENSHOT_PRIORITIES = [
    { reviewer: 'Angela B.', reason: 'Emotional, powerful language — "fierceness and joy"', hookId: 'hook-angela-fierceness' },
    { reviewer: 'Jonathan Prince', reason: 'Specific results — podium stats in all four starts', hookId: 'hook-jonathan-podiums' },
    { reviewer: 'Sebastian Downie', reason: 'Unexpected, shareable — "fear of success" revelation', hookId: 'hook-seb-fear-success' },
    { reviewer: 'Sami C', reason: 'Hesitant-then-converted narrative — "the real deal"', hookId: 'hook-sami-hesitant' },
    { reviewer: 'The Nibbler', reason: 'Long-term client — "many years now" (longevity proof)', hookId: 'hook-nibbler-mental' },
    { reviewer: 'Sherwick Min', reason: 'Retired pro — appeals to experienced riders', hookId: 'hook-sherwick-retired' },
    { reviewer: 'Trustpilot Header', reason: 'Overall page showing 4.9 and 85 reviews', hookId: null }
];

// ─── Carousel Concepts (Section 5 of Playbook) ──────────────
export const CAROUSEL_CONCEPTS = [
    {
        id: 'carousel-bike-not-problem',
        title: 'What Riders Said After They Stopped Upgrading the Bike',
        slides: [
            { type: 'hook', text: 'THE BIKE WAS NEVER THE PROBLEM' },
            { type: 'review', reviewer: 'Angela B.', text: 'Spent 10 years on parts, found speed in her head' },
            { type: 'review', reviewer: 'Sami C', text: 'Thought it was seat time, was wrong' },
            { type: 'review', reviewer: 'Sebastian Downie', text: '30 years of racing, coaching showed him "something I was not able to see before"' },
            { type: 'data', text: 'Riders with 50+ debriefs hit PBs in over half their sessions' },
            { type: 'cta', text: 'Comment MINDSET', triggerWord: 'MINDSET' }
        ]
    },
    {
        id: 'carousel-first-week',
        title: 'What Changed in the First Week',
        slides: [
            { type: 'hook', text: 'WITHIN THE FIRST WEEK' },
            { type: 'review', reviewer: 'MT', text: 'Sceptical but saw changes in week one' },
            { type: 'review', reviewer: 'Neil D', text: '"The change in mindset is unbelievable"' },
            { type: 'review', reviewer: 'Ruben Boyd', text: '"I feel I have already learnt a lot"' },
            { type: 'data', text: 'Flow scores improve measurably within the first 4-6 debriefs' },
            { type: 'cta', text: 'Comment FLOW', triggerWord: 'FLOW' }
        ]
    },
    {
        id: 'carousel-sceptic-believer',
        title: 'From Sceptic to Believer',
        slides: [
            { type: 'hook', text: 'I WAS ON THE FENCE' },
            { type: 'review', reviewer: 'Sami C', text: 'Hesitant at first, now calls it "the real deal"' },
            { type: 'review', reviewer: 'MT', text: 'Sceptical, then 100% confident after one weekend' },
            { type: 'review', reviewer: 'Sebastian Downie', text: '30 years self-taught, wished he\'d found this sooner' },
            { type: 'review', reviewer: 'Jonathan Prince', text: 'Four starts, four podiums' },
            { type: 'cta', text: 'Take the free Rider Mindset Quiz', triggerWord: 'MINDSET' }
        ]
    }
];

// ─── Full Trustpilot Reviews (all 85) ────────────────────────
export const TRUSTPILOT_REVIEWS = [
    // Page 1
    { name: 'Angela B.', country: 'US', date: 'Feb 2026', title: 'Getting your mind ready to compete is priceless', text: 'I have spent more than I\'d like to admit on new bikes, fancy parts, private coaches, and race schools. Now, after incorporating some of the Camino Coaching techniques that I\'ve learned, I felt new levels of both fierceness and joy on the track which I had never before experienced during the past 10 years of racing. Thanks Coach!' },
    { name: 'Neil D', country: 'IE', date: 'Feb 2026', title: 'Brillant so far', text: 'Brillant so far, the change in mindset is unbelievable' },
    { name: 'Harry Cook', country: 'GB', date: 'Jan 2026', title: 'I\'ve been working with Camino Coaching…', text: 'I\'ve been working with Camino Coaching with Craig and honestly it\'s been a game changer for me. Craig doesn\'t just give generic advice – he actually takes the time to understand you, your goals, and what\'s holding you back, then builds a clear plan around that.' },
    { name: 'Sami C', country: 'US', date: 'Dec 2025', title: 'This is the real deal', text: 'I\'ve been riding track for years. Often times I feel like I could\'ve done better. I thought it was seat time or bike, but I\'ve done both at no avail. My mentality has changed since I started with Camino coaching. I started understanding the inner me, how I think, my shortcomings, and how to approach a breakthrough. Yes, I was hesitant at first Yes, you\'ll need to face yourself and be honest about your thought process. Once you take action, you\'ll find this training extremely valuable. Craig is pretty awesome with his one call away approach, yet gives you the space to absorb the courses and discuss frequently.' },
    { name: 'Sam', country: 'GB', date: 'Nov 2025', title: 'Camino coaching guided me through the…', text: 'Camino coaching guided me through the \'mind mastery\' module, coaching methods and little pointers on how to improve your mental game through visualisation and achieving goals through the methods.' },
    { name: 'Ruben Boyd', country: 'GB', date: 'Nov 2025', title: 'Each step of the module was easy to…', text: 'Each step of the module was easy to follow and the application is very easy to navigate. I feel I have already learnt a lot.' },
    { name: 'Jonathan Prince', country: 'IT', date: 'Oct 2025', title: 'Camino Coaching\'s High Performance Flow course is Phenomenal', text: 'I\'d have to say that Craig and Camino Coaching\'s High Performance Flow course has been a phenomenal course and has done wonders for my racing. I\'m only an amateur but still race in a very competitive competition in NZ. Craig and Camino Coaching course has been instrumental in getting my head right and consistently performing. My results last year were testament to the improvements with podiums in all four of my starts for the season. This included one 1st overall and 2nd overall, two 1st in class, one 2nd in class, and one 3rd in class.' },
    { name: 'Becky (Chloe Gleeson)', country: 'GB', date: 'Oct 2025', title: 'Camino Coaching is awesome!', text: 'Written by Chloe Gleeson. Craig is very professional, all sessions are exceptionally interesting and helpful. I was able to apply the theory to my practical race experience which gave me a chance to understand how to control my nerves and mindset. Can\'t wait to work with him again next year!' },
    { name: 'Consumer', country: 'GB', date: 'Oct 2025', title: 'Incredible platform', text: 'Incredible platform, a complete game changer to my racing' },
    { name: 'Bart Horsten', country: 'GB', date: 'Oct 2025', title: 'Camino Coaching is a game changer', text: 'Camino Coaching has been a game changer for my racing. Helping me to perform at my best and enjoy my racing to the fullest.' },
    { name: 'Consumer', country: 'GB', date: 'Oct 2025', title: 'Excellent material and delivered in an …', text: 'Excellent material and delivered in an engaging way. Transformed my approach to my driving and definitely took me up a level. Lap times down and confidence up. Great results. Highly recommend Craig and his skills.' },
    { name: 'Johann Reeves', country: 'MY', date: 'Oct 2025', title: 'I\'ve been in This company for over 2…', text: 'I\'ve been in This company for over 2 years Now and i have learnt a lot and have always had they\'re support when required' },
    { name: 'The Nibbler', country: 'NL', date: 'Oct 2025', title: 'Camino coaching', text: 'I\'ve used Camino coaching for many years now and it\'s been so helpful for me mentally helping set the right goals and keeping a realistic and good mindset on race weekends but also away from the racing too. Also the debriefs after each session are great as you can really break down how your session went and the goal setting calls are super helpful too.' },
    { name: 'Geoffrey Reviven', country: 'ES', date: 'Oct 2025', title: 'Helps a lot to focus on small things…', text: 'Helps a lot to focus on small things and be in the right mindset during training and competition.' },
    { name: 'Wouter Alblas', country: 'NL', date: 'Sep 2025', title: 'Craig taught me to be the better version of me', text: 'In know Craig for a while now. First from the motor racing paddock and now also as a life and business coach. Focusing on growth mindset made my life more complete and successful.' },
    { name: 'Sebastian Downie', country: 'AU', date: 'Aug 2025', title: 'Its not just race day! Wining is built not bought.', text: 'The knowledge and understanding of what can go on inside my helmet at speed combined with or compounded by activities outside of the race. One of my personal revealings has been a fear of success. Camino coaching showed me quite clearly my race craft is top notice whilst with the machine. My problem is away from the machine where I have to front up to the world. This is the part of winning I really don\'t like! I\'ve been racing all types of machines over 30 years as an owner operator. This coaching could have cut my learning time massively, also saving me massively too. With this coaching, I can see something I was not able to before.' },
    { name: 'Sherwick Min', country: 'US', date: 'Jun 2025', title: 'Not having fun at the track any more?', text: 'I\'m a retired professional racer who was not having fun at track days. I have had rider coaches who helped with analyzing my data, but I have never fully explored the mental aspect of racing. I found Craig Muirhead\'s Flow Performance course to be extremely interesting addressing gaps I had in my focus as well as anxiety around track day riders. He helped me structure my track day weekend as if it were a real race weekend, setting goals and collecting feedback which helped me ride more relaxed and having fun again.' },
    { name: 'Grant', country: 'NZ', date: 'Aug 2024', title: 'I had the pleasure of meeting Craig two…', text: 'I run a road racing team here in New Zealand, last year I had two of my riders on his course, I personally noticed massive changes in both riders, the focus, understanding how to correct a bad day, being relaxed, following processes, personally taking responsibility, was big.' },
    { name: 'Calum', country: 'GB', date: 'Feb 2025', title: 'A great course', text: 'I have been on this course for a few months now and I am really happy with it all. Craig is super helpful and really explains his knowledge really well.' },
    { name: 'Rory', country: 'IM', date: 'Dec 2024', title: 'Camino coaching', text: 'Camino coaching and Craig have been a huge part of the improvements and development in my racing, the step by step layout of the course allows you to take it on board and put it in to practice. After completing the performance principles and ride in the zone training, I looked at sponsorship course as it\'s always been something I find very uncomfortable.' },
    // Page 2
    { name: 'Adam Mclean', country: 'GB', date: 'Dec 2024', title: 'Really enjoyed working with Craig…', text: 'Really enjoyed working with Craig during the 2024 season, highly recommended!' },
    { name: 'Joe Talbot', country: 'GB', date: 'Dec 2024', title: 'Craig was very up to date on if I was I…', text: 'Craig was very up to date on if I was I was having a hard weekend or not, he made time even if he was at another race track that day and in a different country. Would highly recommend if you want to find that missing factor you need!' },
    { name: 'Maxwell Dodds', country: 'GB', date: 'Jun 2024', title: 'It\'s been amazing!', text: 'It\'s been great to help me stay focussed in my races and to enjoy it more, whilst also staying in the present moment!' },
    { name: 'Ollie Walker', country: 'GB', date: 'Jan 2024', title: 'Great experience', text: 'Great experience, no difficulties and learnt so much' },
    { name: 'Giles Fabris', country: 'US', date: 'Jan 2024', title: 'Simply stated Camino Coaching…', text: 'Simply stated Camino Coaching offers world class coaching - whether you\'re an occasional trackday rider or a full time Racer - there is MUCH value here!' },
    { name: 'Rachel Robertson', country: 'GB', date: 'Jan 2024', title: 'Transformed my way of thinking', text: 'I\'ve just recently finished the course and how I now approach/act on my karting race weekends has completely transformed since starting Camino Coaching. Before I started the coaching I would often have a bad session/race and let my negative thoughts take over me, affecting me for the rest of the weekend. That has completely changed now.' },
    { name: 'E Cormack', country: 'GB', date: 'Dec 2023', title: 'camino coaching is a great program and…', text: 'camino coaching is a great program and has really brought my driving forward and confidence in so many ways' },
    { name: 'Iulian Danciu', country: 'RO', date: 'Nov 2023', title: 'Excellent - Next Level Information', text: 'It\'s a one-of-a-kind course touching on the most neglected part of a professional rider: the head/mind. The course is very thorough, so you will need at least a couple of weeks to get this through. Comes with regular calls to talk about your progress and questions, which I found extremely useful. As a professional racer - you need to go through this.' },
    { name: 'Andy', country: 'GB', date: 'Nov 2023', title: 'Craig is always available to take a…', text: 'Craig is always available to take a call when i need advice.' },
    { name: 'Customer', country: 'GB', date: 'Nov 2023', title: 'Superb mindset coaching', text: 'My son has been working with Craig at Camino Coaching during the 2023 race season. The support and structure of the mindset coaching has helped him enormously on and off track. Not only does the coaching help with racing but it also provides invaluable life skills.' },
    { name: 'Kate Buchanan', country: 'NZ', date: 'Oct 2023', title: 'The best investment', text: 'The Sponsorship Blueprint was a fantastic resource. After completing the course, I had a greater understanding of sponsorship, the trigger points for potential investors and, most importantly, the confidence to pursue them.' },
    { name: 'Nick Guthrie', country: 'GB', date: 'Jul 2023', title: 'Really well structured course', text: 'Really well structured course, very enjoyable and easy to follow. Already seeing improvements in my attitude to racing and also general life.' },
    { name: 'Adrian', country: 'AU', date: 'May 2023', title: 'Prepare yourself for your track day', text: 'The delivery of the Keys to Performance training is very clear and in easy, daily-manageable sized lessons. Highly recommend this course for anyone looking to approach their riding with the right mindset.' },
    { name: 'Grant Payne', country: 'FR', date: 'Apr 2023', title: 'Pleasure to work with and very professional', text: 'Craig has been coaching my teenage son for 2 seasons and the results are clear to see, professional, personable and extremely enthusiastic about his work.' },
    { name: 'John', country: 'GB', date: 'Apr 2023', title: 'Great what the course done for my lad…', text: 'Great what the course done for my lad alfie. After a bad accident his confidence was knocked and this helped him thanks' },
    { name: 'Sam', country: 'GB', date: 'Apr 2023', title: 'Excellent course all round!', text: 'I have been working with Craig from Camino Coaching for the past 5 years. From the first day of working together I managed to improve my mental approach of my racing and make gains immediately.' },
    { name: 'Mrs Sarah Chandler', country: 'GB', date: 'Apr 2023', title: 'This course is great and well worth the…', text: 'This course is great and well worth the investment. I was a very nervous rider and knew that it was only myself holding me back. I felt like I didn\'t belong in the paddock with the boys. After completing the course I did 3 days in Cartagena and the difference was incredible. I had a new found self belief and my lap times reflected it.' },
    { name: 'Jacque', country: 'IE', date: 'Jan 2023', title: 'Great training', text: 'Great training, delivery of training and follow up with clients. Highly recommended.' },
    { name: 'Tim Banish Jr', country: 'US', date: 'Jul 2022', title: 'There\'s a saying that racing is 90%…', text: 'There\'s a saying that racing is 90% mental. However most people decide to buy a shiny part for their motorcycle thinking it will "make them faster" and they ignore the elephant in room, how to improve the pilot. The programs that Camino Coaching offer have been brilliant in helping my son take a different approach in preparing for race weekends.' },
    { name: 'Simon Walters', country: 'AU', date: 'Jun 2022', title: 'Transformational.', text: 'This course has transformed me as rider. Fantastic material well presented within a good structure, with plenty of personal attention. Results that you can feel. Improvement that you can measure.' },
    // Page 3
    { name: 'Mark Pattinson', country: 'GB', date: 'May 2022', title: 'A brilliant course if your serious…', text: 'A brilliant course if your serious about your racing try this course with Craig it will change your mindset.' },
    { name: 'Dan Nurrish', country: 'GB', date: 'Apr 2022', title: 'I have recently completed the…', text: 'I have recently completed the performance principles course and it has given me a totally different mindset when approaching my race meetings.' },
    { name: 'Joe K', country: 'US', date: 'Apr 2022', title: 'Performance Principles has made my…', text: 'Performance Principles has made my transition from track days to racing a very seamless process. Highly recommend.' },
    { name: 'Toby T', country: 'GB', date: 'Feb 2022', title: 'Great course - Improve your performance!', text: 'Great course! Craig really knows his stuff when it comes to improving performance.' },
    { name: 'Greg Nicholson', country: 'NZ', date: 'Feb 2022', title: 'Camino Coaching for racers who want to be better', text: 'I am a club level racer and Craig made me feel just as important as one of his clients in the Moto gp paddock. Craig is a fantastic teacher. I now feel alot more prepared to go racing.' },
    { name: 'Cormac Racing', country: 'NZ', date: 'Nov 2021', title: 'The right tools for racing success', text: 'Working with Craig and using his Performance Principles has equipped me with the right tools to improve my racing. The mental aspect of our sport is vital to success.' },
    { name: 'Christian Smith', country: 'GB', date: 'Oct 2021', title: 'Performance Principles 3.0', text: 'The performance principles course by Craig is a very powerful genuine course which has helped me improve my racing massively in just 8 weeks.' },
    { name: 'Mark Purslow', country: 'GB', date: 'Sep 2021', title: 'Great course to do to push your racing…', text: 'Great course to do to push your racing to the next level and get your true potential. Really opened my eyes and mind into thinking differently about my racing.' },
    { name: 'Mike', country: 'GB', date: 'Sep 2021', title: 'The performance principles course from…', text: 'The performance principles course from Craig at Camino Coaching is a game changer for taking positive steps forward in your motorcycle racing. PB after PB! All the time you\'re hesitating about signing up for the course, you\'re standing still!' },
    { name: 'Steve Wilkinson', country: 'GB', date: 'Aug 2021', title: 'Really enjoyed the course', text: 'Really enjoyed the course. I found it well layed out and in easy to digest sections. I feel much more confident and feel it was well worth the investment.' },
    { name: 'Shawn Bandel', country: 'US', date: 'Jun 2021', title: 'Professional Coaching- Highly Recommend', text: 'Craig is a true professional. He has gone deep into what tools can tap into the mind of the racer to bring out top level performance under stressful circumstances. I am 3 months into the program and my racing is right where I want it to be, top of the box, having fun, and continuing to improve.' },
    { name: 'Dan Jones', country: 'GB', date: 'Jun 2021', title: 'Massively beneficial', text: 'Camino Coaching has helped me massively with improving my performance. It is not just speed, but the consistency.' },
    { name: 'MT', country: 'GB', date: 'Jun 2021', title: 'The most valuable investment!', text: 'Craig muirhead is a legend! At first when I was discussing the course I was on the fence whether to do it but Craig was very helpful. Within the first week of the course i had my first race weekend and even though I\'d only completed 1 week I was able to make changes. After that I had 100% confidence I had made the correct decision. This by far is the first thing you should be doing if you want to take your racing to the next level.' },
    { name: 'Bikeholic_girl', country: 'IN', date: 'Jun 2021', title: 'Performance principles changed my approach', text: 'Performance principles changed my approach towards racing. It helped me channelize my focus, manage my emotions and get off my distractions. I could personally see a lot of improvement in my performance which was quite evidential with my lap times and results.' },
    { name: 'Harry Cook', country: 'GB', date: 'Jun 2021', title: 'Really helpful and make you think…', text: 'Really helpful and make you think clearly throughout race weekends. Craig really helps as I contact him through messenger doing debriefs. Performance principles helps massively.' },
    { name: 'John Kilcar', country: 'GB', date: 'Apr 2021', title: 'a real performance upgrade', text: 'Craig gives you the tools and knowledge you need to create a performance mindset. One of the best performance upgrades you can get.' },
    { name: 'Christian', country: 'US', date: 'Apr 2021', title: 'Craig provides the missing link…', text: 'Absolutely splendid presentation on how to specifically improve one\'s mindset when it comes to the sport of motorcycle racing. Definitely a game-changer for the off-season, and then carries over into the track season.' },
    { name: 'Sam Vhoutte', country: 'BE', date: 'Feb 2021', title: 'Life changing course', text: 'It\'s an eye opener. It\'s learning me things I never thought of before. Everything is explained in a clear language. It\'s a lifechanger for the rest of my life.' },
    { name: 'Iain Hopcroft', country: 'GB', date: 'Jan 2021', title: 'Unlocking parts of my brain to help me…', text: 'Unlocking parts of my brain to help me achieve the best version of myself. I thought I was doing everything I needed to and my limit was reached... I was wrong.' },
    { name: 'Romain Thomas', country: 'GB', date: 'Jan 2021', title: 'We know that the brain has got way more…', text: 'Craig explains how the brain works and how to use a lot more capacity. I use some of the principles for my winter fitness training, and the result is amazing! Now it\'s not a magic pill! That course requires commitment, practice and consistency.' },
    // Page 4
    { name: 'Finley Arscott', country: 'GB', date: 'Dec 2020', title: 'Camino coaching', text: 'Camino coaching has really brought my riding on and not only that but my mental approach to my racing. The short video format is very easy to understand.' },
    { name: 'Nick Lascelles', country: 'NZ', date: 'Dec 2020', title: 'Worth the investment', text: 'Craig has produced a well thought out and professionally presented online course. Putting these skills into practice is already paying off for me.' },
    { name: 'Ben Taylor', country: 'GB', date: 'Nov 2020', title: 'Great course- recommend it', text: 'Great course- recommend it. It has helped calm my nerves before races and has made me a more confident rider.' },
    { name: 'Chris Johnson', country: 'GB', date: 'Aug 2020', title: 'Great experience, recommended', text: 'Helped me improve as a person and as a rider, feel more confident going into each round and results are improving.' },
    { name: 'Noel Smith', country: 'IE', date: 'Aug 2020', title: 'A MUST for anyone serious about their Racing', text: 'The course is gamechanger in my eyes. Giving me control over my mindset and thoughts leading up to and during race meetings.' },
    { name: 'Liam', country: 'US', date: 'Aug 2020', title: 'Half way through and already seeing results.', text: 'The mental preparation tools and drills after only a week or so allowed me to be in a much better mindset through the whole weekend. I honestly can\'t recommend this enough.' },
    { name: 'Owen Hunt', country: 'GB', date: 'Aug 2020', title: 'Very good', text: 'Very good! Teaches you about things that involve everyday life not just racing.' },
    { name: 'John B', country: 'GB', date: 'Jul 2020', title: 'Highly recommended!', text: 'Ive always wanted to better myself on track and get quicker....weight loss, buying fast bits and bobs but never really had any considerable gains. Once I saw this course I had to give it a go! The course has highlighted where my weaknesses are mentally.' },
    { name: 'Clifford Ogle', country: 'ZA', date: 'Jul 2020', title: 'Really enjoying the bite sized lessons', text: 'Really enjoying the bite sized lessons. Some of the information seems quite basic when addressed, but is very often overlooked. As a package it really does give the rider a good foundation to build on.' },
    { name: 'Paul Whitby', country: 'GB', date: 'Jul 2020', title: 'Excellent!', text: 'In a word, Excellent! Craig has got me thinking and looking at matters from a new angle, providing the science and explanation behind what is happening.' },
    { name: 'Will Hodgson', country: 'GB', date: 'Jul 2020', title: 'Camino coaching help me to understand…', text: 'Camino coaching help me to understand that having your head in the right place every time you get on your bike is the difference from being a good rider and winning championships. My only wish was that I had discovered it early on in my racing journey.' },
    { name: 'Benjamin', country: 'US', date: 'Jul 2020', title: 'Gamechanger', text: 'Going in, I didn\'t know what to expect. Across the last few weeks taking the course I learned a massive amount about myself and gained a greater understanding of the processes that determine the eventual outcomes of competition. This is a complete gamechanger.' },
    { name: 'Sam Wilford', country: 'GB', date: 'Jul 2020', title: 'My experience with Camino Coaching', text: 'I have been working with Craig for many years, and he has helped me a lot. He has a lot of experience in the racing paddock which helps him understand what the rider needs.' },
    { name: 'Angela Chapman', country: 'GB', date: 'Jul 2020', title: 'Amazing... life changing for our team.', text: 'Thank you, a productive training program with a young team who have now grown into their roles. Growth in personal and professional space. Results showing year on year!' },
    { name: 'Ross', country: 'GB', date: 'Jul 2020', title: 'Camino Coaching Review 2020', text: 'Working with Craig at Camino Coaching has been very beneficial to my riding and my results. The programmes are well put together. I recommend working with Craig and it\'s defiantly worth the money.' },
    { name: 'Paul', country: 'GB', date: 'Jul 2020', title: 'Without doubt one of the best decisions…', text: 'Without doubt one of the best decisions made was to work with Craig. Professional, thorough and trustworthy. But what counts is what we have seen on the Stopwatch!' }
];

// ─── Google Reviews (36) ─────────────────────────────────────
export const GOOGLE_REVIEWS = [
    { name: 'Ghage Plowman', date: '2 months ago', text: 'Craig at Camino Coaching has helped me sharpen my mindset and confidence big time. Practical, honest, and actually works under pressure. Highly recommend.' },
    { name: 'Jamie', date: '2 months ago', text: 'After initially speaking with Craig at Camino I felt like his coaching style suited the way I like to learn. Everything is broken down well and transfers across all aspects of life with consistency being the main part.' },
    { name: 'Jonathan Prince', date: '4 months ago', text: 'Craig and Camino Coaching\'s High Performance Flow course has been a phenomenal course and has done wonders for my racing.' },
    { name: 'Gerard Lavery', date: '2 years ago', text: 'My son calum races junior rotax and has been doing the speed solutions course with Craig at camino coaching for almost a year now. The difference the course has made to calums focus and results on track has been amazing.' },
    { name: 'Sami Captain', date: '4 months ago', text: 'This training has been transformative to my racing journey. I was skeptical at first... It\'s the real deal, but you have to be willing to listen and work with it.' },
    { name: 'Danica H', date: 'a month ago', text: 'Practical and informative, it provides useable mindset tools and techniques to improve your motorcycle racing.' },
    { name: 'RGM GARAGE', date: '4 months ago', text: 'Craig has helped me to create a plan for the future and pointed me in the right direction.' },
    { name: 'Sherwick Min', date: '8 months ago', text: 'I\'m a retired professional racer who was not having fun at track days. I found the mental aspect of racing through Camino Coaching highly beneficial.' },
    { name: 'Keir McConomy', date: '2 years ago', text: 'Excellent course & coaching support for racing drivers. The material is easy and enjoyable to follow in 10 min daily videos plus regular video coaching calls with Craig.' },
    { name: 'Dawn Tumbridge', date: '2 years ago', text: 'First class training! There is no doubt in my mind that if this course is followed diligently then results will come.' },
    { name: 'Laurence Norrington-Parois', date: '3 years ago', text: 'I worked with Craig last year - I started the year qualifying and finishing middle to back of the grid; by the end of the year, I qualified and finished 3rd.' },
    { name: 'Kerry Woodcock', date: '2 years ago', text: 'Craig has been working with our son for over a year now. Innovative, responsive, curious - willing to co-create with the rider and their family!' },
    { name: 'Cormac Buchanan', date: '3 years ago', text: 'If you\'re a racer looking to take your riding to the next level, Camino Coaching is the tool you need. Essential to my progress through the classes in my European career.' },
    { name: 'Kate Buchanan', date: '2 years ago', text: 'The Camino Coaching Sponsorship Blueprint - the best investment!' },
    { name: 'Troy Jeffrey', date: '3 years ago', text: 'Started in the middle of the 2022 season as I had lost a lot of my confidence on track. The coaching helped me regain my confidence and take my racing to a whole new level.' },
    { name: 'Andrew Clarke', date: '3 years ago', text: 'Took the performance principals class and the results were amazing. Helped me bring home 2 National titles and almost a dozen regional titles.' },
    { name: 'Nick Guthrie', date: '2 years ago', text: 'Really well structured course, very enjoyable and easy to follow. Already seeing improvements in my attitude to racing and also general life.' },
    { name: 'Iulian Danciu', date: '2 years ago', text: 'It\'s a one-of-a-kind course touching on the most neglected part of a professional rider: the head/mind.' },
    { name: 'Robert Mcafee', date: '2 years ago', text: 'Speed Solutions has been absolutely vital so far as part of my training programme.' },
    { name: 'Harrison Dessoy', date: '3 years ago', text: 'Craig has been a fantastic help since 2020. Shown what it takes to be mentally prepared for racing, helping me be more relaxed and comfortable.' },
    { name: 'Nick Lascelles', date: '3 years ago', text: 'Well thought out, practical and very useful online content. Craig is also an excellent coach one to one.' },
    { name: 'Giovanni Beliossi', date: '2 years ago', text: 'Their instruction is a game-changer if you\'re serious about motor racing. Effective, result-oriented method.' },
    { name: 'Domenico Posa', date: '2 years ago', text: 'Really helping me out in transforming my track day experience. I\'m starting having a lot of fun, and with fun comes speed.' },
    { name: 'Bart Horsten', date: '2 years ago', text: 'Enabled me to truly enjoy my racing and learn the tools to compete at my best.' },
    { name: 'Darren G', date: '2 years ago', text: 'I now concentrate on my racing and not have my mind wandering about other things. Great course.' },
    { name: 'Kat James', date: '2 years ago', text: 'Keys to performance has been a game changer for me. 10 mins a day videos made it easy to learn and hugely improved my laptimes.' },
    { name: '7th rose tattoo', date: '2 years ago', text: 'Worth every dollar so far. Very happy with the decision and looking forward to more.' },
    { name: 'Vidya Srihari', date: '2 years ago', text: 'Helped me keep my mind calm at all times irrespective of the result. Learned to focus only on my performance.' },
    { name: 'Joel Kelso', date: '3 years ago', text: 'Very positive, and great for learning how to control your emotions when racing/riding! Definitely recommend.' },
    { name: 'Lani Zena Fernandez', date: '3 years ago', text: 'Truly a great program for racers, resources are helpful post-program.' },
    { name: 'Lissy Whitmore', date: '3 years ago', text: 'Brilliant methods, really nice and understanding guy with great communication. Helped my career massively.' },
    { name: 'Richard Connole', date: 'a year ago', text: 'Craig\'s programme has been a massive help in understanding what was going wrong and improving things.' },
    { name: 'Giles Fabris', date: '2 years ago', text: 'Amazing coaching - HIGHLY recommended.' },
    { name: 'Freddie Barnes', date: 'a year ago', text: '' },
    { name: 'Richard Knegt', date: '3 years ago', text: '' },
    { name: 'Torin Collins', date: '3 years ago', text: '' }
];

// ─── Helper: Get Random Quoted Hook ──────────────────────────
let hookRotationIndex = 0;
export function getRotatingQuotedHook() {
    const hook = QUOTED_HOOKS[hookRotationIndex % QUOTED_HOOKS.length];
    hookRotationIndex++;
    return hook;
}

export function resetHookRotation() {
    hookRotationIndex = 0;
}

// ─── Helper: Get Hook for Pillar ─────────────────────────────
export function getHookForPillar(pillarId) {
    const matching = QUOTED_HOOKS.filter(h => h.pillars.includes(pillarId));
    if (matching.length === 0) return null;
    return matching[Math.floor(Math.random() * matching.length)];
}

// ─── Helper: Get Objection Killer by Type ────────────────────
export function getObjectionKiller(type = 'sceptical') {
    const killers = OBJECTION_KILLERS[type] || OBJECTION_KILLERS.sceptical;
    return killers[Math.floor(Math.random() * killers.length)];
}

// ─── Helper: Get Random Authority Anchor ─────────────────────
export function getReviewAuthorityLine() {
    return REVIEW_AUTHORITY_LINES[Math.floor(Math.random() * REVIEW_AUTHORITY_LINES.length)];
}

// ─── Helper: Format Hook for Post ────────────────────────────
export function formatQuotedHook(hook) {
    return `"${hook.quote}" - ${hook.reviewer}, ${hook.date}`;
}

// ─── Helper: Get Review Request Template ─────────────────────
export function getReviewRequestTemplate(riderName) {
    return `Hey ${riderName}, brilliant result this weekend. Would you mind dropping a quick review on Trustpilot? Just your honest experience. No script needed. Here's the link: ${REVIEW_STATS.trustpilot.evaluateUrl}`;
}

// ─── Review Mining: Categorise Reviews ───────────────────────
export function mineReview(reviewText) {
    const categories = [];
    const text = reviewText.toLowerCase();

    // Specific results
    if (/podium|winner|champion|p[0-9]|1st|2nd|3rd|lap time|pb|personal best|title/i.test(text)) {
        categories.push('specific-results');
    }
    // Emotional language
    if (/game.?changer|fierceness|joy|fear|unbelievable|incredible|phenomenal|transformed|life.?chang/i.test(text)) {
        categories.push('emotional-language');
    }
    // Objection handling
    if (/fence|sceptic|skeptic|hesitant|worth the money|worth the investment|was unsure/i.test(text)) {
        categories.push('objection-handling');
    }
    // Unexpected revelations
    if (/fear of success|never thought|eye opener|didn.t realize|something I was not able to see/i.test(text)) {
        categories.push('unexpected-revelation');
    }
    // Long-term client
    if (/many years|over [2-9] years|[3-9] seasons|5 years|long time/i.test(text)) {
        categories.push('long-term-client');
    }

    return categories;
}
