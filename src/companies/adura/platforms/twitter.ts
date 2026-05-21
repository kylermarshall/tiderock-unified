import type { TwitterInputs, TwitterOutput } from '../types'
import { scoreContent } from '../lib/scoring'

const SINGLE_POSTS: Record<string, string[]> = {
  'energy-cost': [
    'Most facilities switch to LED and assume the energy problem is solved.\n\nIt isn\'t.\n\nFixture mismatch alone causes 15–40% energy loss — before any other variable.\n\nThe LED is fine. The specification is wrong.',
    'A 100,000 sq ft warehouse with mismatched LED fixtures wastes $18K–$45K/year in energy.\n\nThat\'s not a utility rate problem.\n\nThat\'s a specification problem that was locked in at purchase.',
    'Your lighting bill didn\'t drop after the LED upgrade?\n\nCheck the spec.\n\nLED doesn\'t mean efficient. The right LED system, properly specified, does.',
  ],
  'downtime': [
    'Lighting failures don\'t cost what the fixture costs.\n\nThey cost what stops while you\'re fixing it.\n\nIn a production facility: $50,000/hour.\n\nMost maintenance plans don\'t account for this number.',
    'Aging lighting systems fail in clusters — not randomly.\n\nFacilities that track work orders by event miss the pattern.\n\nTrack them by frequency. The acceleration tells you when the system is ending.',
    'Every unplanned lighting repair costs 2–3x a scheduled one.\n\nMost facilities wait for failure.\n\nThe math on that decision is straightforward — and it\'s not in the facility\'s favor.',
  ],
  'maintenance-costs': [
    '70% of lighting maintenance cost is labor.\n\nMost procurement decisions are made on the other 30%.\n\nThe purchase order looks optimized.\n\nThe P&L disagrees.',
    'Replacing a high-bay fixture costs $150–$400 in labor alone.\n\nBefore the lift rental.\n\nBefore the crew coordination.\n\nBefore the production window.\n\nThe fixture was $80.',
    'Facilities underestimate lighting maintenance by 40–60% on average.\n\nNot because they\'re careless.\n\nBecause they measure fixture cost, not system cost.',
  ],
  'fixture-lifespan': [
    'A fixture rated for 50,000 hours is a projection, not a promise.\n\nUnder real facility load — heat, vibration, voltage variation — budget LEDs regularly fail at 22,000.\n\nThat\'s two replacement cycles where one was budgeted.',
    'Budget LED failures aren\'t random.\n\nThey\'re thermal.\n\nThe chip is fine. The driver is undersized for the environment.\n\nHeat management determines what the rating actually means in your facility.',
    '30–50% lifespan reduction from driver mismatch alone.\n\nIn high-temperature environments, that\'s the rule, not the exception.\n\nMost spec sheets don\'t tell you this. The field does.',
  ],
  'facility-safety': [
    'OSHA requires 30 foot-candles in assembly areas.\n\nMost facilities haven\'t measured since installation.\n\nLumen output degrades. The standard doesn\'t.\n\nIf you haven\'t measured, you don\'t know.',
    'Warehouse accident rates increase 20% in facilities with inadequate lighting.\n\nThat stat exists in published research.\n\nOSHA inspectors know it.\n\nPlaintiff attorneys know it.\n\nMost facility managers don\'t.',
    'One lighting-related safety incident: $50,000–$500,000.\n\nA photometric audit: a fraction of that.\n\nThe ROI on compliance is obvious.\n\nThe timeline for acting on it usually isn\'t.',
  ],
  'warehouse-visibility': [
    'The picking error rate in your high-shadow zones is a lighting problem before it\'s a training problem.\n\nShadow zones cause up to 25% more errors.\n\nThe workers are fine. The environment isn\'t.',
    'CRI below 70 slows barcode scanning by 25%.\n\nOn 10,000 picks per day, that\'s not a rounding error.\n\nIt\'s a throughput gap with a measurable dollar value.',
    'Returns, re-picks, and mis-ships.\n\nWhen you map error concentration by zone and overlay the photometric plan, the pattern is almost always there.\n\nThe environment produces the error. Not the employee.',
  ],
  'labor-inefficiency': [
    'Eye fatigue after four hours under poor lighting reduces cognitive performance by 20%.\n\nThat\'s your entire afternoon shift running at reduced output.\n\nEvery shift. Every day.\n\nThe cost never appears on a lighting invoice.',
    'Workers in properly lit environments are 15–20% more productive.\n\nA 50-person operation is absorbing a 7–10 person equivalent productivity gap.\n\nThe labor line is full. The output isn\'t.',
    'Lighting affects human output.\n\nMost facility managers know this in theory.\n\nAlmost none have measured it.\n\nThe ones who do find the number is larger than expected.',
  ],
  'total-cost-ownership': [
    'The $30 fixture looks cheap.\n\nAfter five years: $180 in total cost.\n\nThe $80 fixture: $120 in total cost.\n\nThe purchase order showed a different story.\n\nThe P&L doesn\'t lie.',
    '60% of total lighting cost comes after installation.\n\nMost procurement decisions treat lighting as a one-time expense.\n\nThe other 60% shows up on the operating budget — not the capital line.',
    'Buying lighting on fixture price is like buying trucks on tire cost.\n\nYou\'re optimizing for 40% of the actual number.\n\nThe other 60% is maintenance and energy. Both are outcomes of the specification decision.',
  ],
  'retrofitting': [
    '50% of LED retrofit projects miss their energy savings projections.\n\nAlmost always the same reason: driver mismatch.\n\nThe fixture is LED. The system is still wrong.',
    'Cheap retrofit kits fail at 3x the rate of engineered systems within 18 months.\n\nThe warranty period ends.\n\nThe failures don\'t.\n\nThe "cost reduction" project becomes a maintenance expense.',
    'Mismatched driver-LED combinations lose 15–25% efficiency from day one.\n\nThe projected savings you calculated never existed in that system.\n\nThe retrofit looked good on paper. The audit tells a different story.',
  ],
  'operational-disruption': [
    'Facilities with aging lighting systems average 6–8 hours of unplanned disruption per year.\n\nThat\'s not random.\n\nIt\'s a predictable output of a system past its maintenance inflection point.',
    'Emergency lighting repairs cost 2–3x scheduled maintenance.\n\nMost facilities pay the premium 6–8 times per year.\n\nThe math on proactive replacement pays for itself inside 18 months for most facility sizes.',
    'Cascade failures in aging systems affect 30% more fixtures in year two than year one.\n\nThe deterioration doesn\'t plateau.\n\nThe facilities that wait for stability are waiting for something that won\'t come.',
  ],
}

const THREADS: Record<string, string[][]> = {
  'energy-cost': [
    [
      '1/7 Most facilities run LED lighting and assume the energy problem is solved.\n\nIt isn\'t.\n\nHere\'s why 40% of facilities are still overpaying — and what to do about it. 🧵',
      '2/7 The problem isn\'t the LED chip.\n\nIt\'s the specification.\n\nWhen fixture output doesn\'t match zone requirements, you pay for lumens you don\'t use.\n\nIndustrial facilities lose 15–40% of lighting energy to this mismatch alone.',
      '3/7 On a 100,000 sq ft warehouse, that\'s $18,000–$45,000/year in wasted energy.\n\nNot from a bad product.\n\nFrom a procurement decision that didn\'t account for photometric design.',
      '4/7 Most energy audits reveal this in year 2 or 3.\n\nBy then, the money is already gone.\n\nAnd the fixture decision is locked in for another 5+ years.',
      '5/7 The common assumption: "We switched to LED, so we\'re good."\n\nThat assumption costs $18K–$45K per year.\n\nLED doesn\'t mean efficient. The right system, properly specified, does.',
      '6/7 What a properly designed system does differently:\n\n→ Zones are modeled photometrically, not estimated\n→ Fixture output matches zone requirements\n→ Driver spec matches fixture and environment\n→ Post-install verification confirms performance',
      '7/7 If your facility is over 50,000 sq ft and you haven\'t run a lighting cost audit in two years, that\'s the starting point.\n\nThe audit is 15 minutes.\n\nThe cost of skipping it is in this thread.\n\nWhat does your facility run per sq ft in lighting energy?',
    ],
    [
      '1/6 A simple question for facility managers:\n\nWhen did you last verify that your LED upgrade actually delivered its projected savings?\n\nFor most: never.\n\nHere\'s what the data shows. 🧵',
      '2/6 Lighting energy costs in poorly designed facilities average $1.50–$3.00 per sq ft annually.\n\nFor a 200,000 sq ft facility, that\'s $300,000–$600,000/year.\n\nThe specification determines where on that range you land.',
      '3/6 Fixture mismatch — running the wrong fixture in the wrong zone — accounts for 15–40% of energy loss before any other variable.\n\nThis happens in LED facilities.\n\nIt happens in facilities that did a "proper upgrade."',
      '4/6 Most facilities discover this during a utility rebate review or a sustainability audit.\n\nWhen the numbers don\'t match projections, the gap traces back to specification — not the product.',
      '5/6 The fix isn\'t replacing the fixtures again.\n\nIt\'s a photometric audit that maps actual performance against design spec.\n\nMost gaps close with repositioning and driver adjustment — not hardware.',
      '6/6 The audit takes 15 minutes for an initial assessment.\n\nThe cost of not doing it is $18K–$45K per year for a mid-size facility.\n\nDrop your sq footage and I\'ll tell you where your facility likely sits.\n\nWhat does your current energy cost per sq ft look like?',
    ],
  ],
  'downtime': [
    [
      '1/7 Most facility managers have a number for what production downtime costs per hour.\n\nAlmost none have calculated what lighting contributes to that number.\n\nHere\'s why they should. 🧵',
      '2/7 A single LED failure in an active production zone can halt $50,000/hour operations.\n\nThe fixture cost: $80–$200.\n\nThe downtime cost: multiples of $50,000.\n\nThese are not the same problem.',
      '3/7 Unplanned lighting maintenance in high-bay areas averages 4–6 hours per incident.\n\nLift availability. Crew scheduling. Parts sourcing. Production hold.\n\nEach of those variables has a cost. None appear on the maintenance invoice.',
      '4/7 Facilities with aging lighting systems experience 3x more unplanned maintenance calls than those with properly specified systems.\n\nThat 3x multiplier is the cost of the original specification decision.',
      '5/7 The failure pattern is predictable.\n\nMaintenance calls cluster — three in a month, then five. Then a cascade.\n\nFacilities that track frequency (not just events) see it coming.\n\nMost track events.',
      '6/7 The comparison that matters:\n\nEmergency repair: 2–3x scheduled maintenance cost, on their timeline.\nScheduled replacement: baseline cost, on your timeline.\n\nMost facilities pay the emergency premium 6–8 times per year.',
      '7/7 If your facility has had more than 3 unplanned lighting calls in the past 12 months, the pattern is starting.\n\nWhat\'s your current call volume for lighting maintenance?',
    ],
  ],
  'maintenance-costs': [
    [
      '1/7 Facility lighting maintenance is consistently underestimated by 40–60%.\n\nNot because of bad accounting.\n\nBecause the wrong thing is being measured.\n\nHere\'s what the real number looks like. 🧵',
      '2/7 70% of lighting maintenance cost is labor.\n\nNot parts. Labor.\n\nThe fixture is 30% of the invoice. The person replacing it is 70%.\n\nMost procurement decisions optimize for the 30%.',
      '3/7 In high-bay industrial environments, replacing a fixture costs $150–$400 in labor alone.\n\nBefore lift rental.\n\nBefore crew coordination.\n\nBefore the operational window required to safely do the work.',
      '4/7 A facility with 500 high-bay fixtures on a 5-year replacement cycle:\n\n→ $75,000–$200,000 in labor costs alone\n→ Before parts\n→ Before lift rental\n→ Before any production disruption\n\nThe fixture cost is almost never the expensive part.',
      '5/7 Most facilities don\'t track this number accurately.\n\nThey track work orders — not total system cost per event.\n\nThe gap between budgeted and actual maintenance spend is 40–60%.\n\nThat gap has a root cause: specification.',
      '6/7 Properly specified fixtures for a given environment require significantly less maintenance.\n\nNot because they\'re better products.\n\nBecause they\'re matched to thermal load, access frequency, and operational conditions.',
      '7/7 What does your facility spend on lighting maintenance annually?\n\nMost operators don\'t know the real number.\n\nIf you want to find it, start with total labor hours × average rate + lift rental + parts. The result is usually a surprise.',
    ],
  ],
  'total-cost-ownership': [
    [
      '1/8 A $30 LED fixture vs. an $80 LED fixture.\n\nThe $30 one wins every RFP.\n\nFive years later, the $30 one has cost $180. The $80 one: $120.\n\nHere\'s the math. 🧵',
      '2/8 First cost is 40% of total lighting system cost over a 10-year operating period.\n\nIf you\'re evaluating lighting on first cost, you\'re evaluating 40% of the actual number.\n\nThe other 60% is maintenance and energy.',
      '3/8 Maintenance and energy costs represent 60% of total lighting cost of ownership in industrial settings.\n\nNeither shows up on the purchase order.\n\nBoth show up on the P&L — starting in year two.',
      '4/8 Why the $30 fixture loses over time:\n\n→ Shorter lifespan → more replacement cycles\n→ Higher maintenance frequency → more labor hours\n→ Lower driver efficiency → higher energy draw\n→ More failures → more unplanned repairs at emergency rates',
      '5/8 Why procurement keeps choosing it:\n\n→ Budget is evaluated at purchase, not at year three\n→ Maintenance cost appears on operating budget, not capital line\n→ Energy cost is treated as a utility variable, not a specification output\n→ No one connects the fixture decision to the P&L impact',
      '6/8 What a proper TCO model changes:\n\nWhen you show procurement the 5-year cost comparison side by side, the $80 fixture wins every time.\n\nThe problem is no one builds that model before the purchase order.',
      '7/8 How to fix it:\n\n→ Require TCO projections in lighting RFPs\n→ Include 5-year maintenance estimates in capital evaluations\n→ Track actual vs. projected maintenance spend by year\n→ Build the comparison before the next decision',
      '8/8 What percentage of your lighting budget covers post-installation costs?\n\nMost facilities: under 20%.\n\nActual post-install cost: 60%.\n\nThat gap is the TCO problem.\n\nDrop your facility type and I\'ll share the range for your operation.',
    ],
  ],
}

const CONTRARIAN_POSTS: Record<string, string[]> = {
  'energy-cost': [
    'Counterpoint: switching to LED doesn\'t save money.\n\nFor 40% of facilities, the energy bill barely moves after the upgrade.\n\nBecause LED is a technology, not a specification.\n\nThe specification is what determines the savings. Most LED upgrades skip it.',
    'Everyone says LED lighting pays for itself in 18 months.\n\nFor facilities with mismatched specifications, the payback period doesn\'t exist.\n\nThe fixture is efficient. The system isn\'t.\n\nThat\'s not a product problem. It\'s a design problem.',
  ],
  'maintenance-costs': [
    'Hot take: cheap LED fixtures cost more than expensive ones.\n\nNot at purchase.\n\nOver five years.\n\n$30 fixture = $180 total cost.\n$80 fixture = $120 total cost.\n\nThe purchase order lied. The P&L is honest.',
  ],
  'total-cost-ownership': [
    'The lowest bid on a lighting project is rarely the lowest cost.\n\nThis sounds obvious.\n\nIt gets ignored every procurement cycle.\n\nBecause the person who approves the bid doesn\'t manage the maintenance budget.',
    'Facility managers who say "we can\'t afford quality lighting" are usually the ones paying the most for it.\n\n$30 fixture at year one. $180 total at year five.\n\nThe decision that looked cheap became the expensive one.',
  ],
  'retrofitting': [
    'Everyone says LED retrofits save money.\n\nFor 50% of facilities, they don\'t hit their projections.\n\nDriver mismatch. Wrong spec. No post-install audit.\n\nThe fixture is LED. The system is still wrong.',
  ],
  'downtime': [
    'Most facilities treat lighting maintenance as reactive.\n\nEmergency call. Fix it. Move on.\n\nThat approach costs 2–3x more per incident than scheduled maintenance.\n\nAnd 6–8 incidents per year means the premium compounds.\n\nThe reactive strategy is the expensive one.',
  ],
}

const FOUNDER_POSTS: Record<string, string[]> = {
  'energy-cost': [
    'Something I\'ve noticed after auditing dozens of facilities:\n\nThe ones spending the most on lighting energy are almost never the ones with the oldest systems.\n\nThey\'re the ones who upgraded to LED without redesigning the specification.\n\nSwapping fixtures isn\'t a redesign. It\'s a product swap.\n\nThe money lives in the design.',
    'Early in my career I assumed LED meant efficient.\n\nThen I ran a utility audit on a facility that had upgraded 18 months earlier.\n\n$38,000/year in energy waste. Post-LED.\n\nThe product was right. The spec was wrong.\n\nThat audit changed how I think about every lighting project.',
  ],
  'downtime': [
    'A facility manager told me his operation hadn\'t had a major lighting failure in two years.\n\nI looked at his maintenance log.\n\n6 calls in the prior 12 months. Each one 4–6 hours.\n\nHis definition of "no major failure" was three calls in a month.\n\nHe had normalized the disruption. The cost was still there.',
  ],
  'total-cost-ownership': [
    'I\'ve watched the same conversation happen dozens of times:\n\nProcurement gets three bids. Selects the lowest.\n\nOperations manages the consequences for five years.\n\nThen procurement gets three more bids.\n\nNo one ever runs the TCO model on what the last decision actually cost.\n\nThe cycle continues.',
  ],
}

const QUOTE_RESPONSES: Record<string, string[]> = {
  'energy-cost': [
    'Re: "LED lighting pays for itself in under 2 years"\n\nTrue — when the system is properly specified.\n\nFor the 40% of facilities with mismatched fixtures, the payback period is measured in decades, not months.\n\nThe technology is right. The application often isn\'t.',
    'Re: "Just swap to LED and you\'ll see the savings"\n\nThe swap is the easy part.\n\nThe specification is the part that determines whether the savings materialize.\n\nMost swaps skip the photometric design. That\'s where the money is.',
  ],
  'total-cost-ownership': [
    'Re: "We always go with the lowest bid to control costs"\n\nIf the lowest bid is on first cost, you\'re controlling 40% of the actual number.\n\nThe other 60% — maintenance and energy — shows up on the operating budget 2 years later.\n\nThe bid won. The facility paid.',
  ],
  'retrofitting': [
    'Re: "LED retrofit projects always deliver the projected savings"\n\nHalf of them don\'t.\n\nDriver mismatch alone reduces system efficiency by 15–25% from day one.\n\nThe projections were right. The installation wasn\'t designed to hit them.',
  ],
}

const ALT_HOOKS: Record<string, string[]> = {
  'energy-cost': [
    'Your LED upgrade didn\'t solve the energy problem. The specification did — or didn\'t.',
    'Fixture mismatch: the gap between what LED promises and what your bill shows.',
    'Most energy audits reveal the waste was there before the utility rate changed.',
  ],
  'downtime': [
    'The lighting failure cost calculator most facilities have never run.',
    'Aging system + production facility = predictable downtime. Just not predicted.',
    'When did "no major issues" become an acceptable maintenance posture?',
  ],
  'maintenance-costs': [
    'The invoice shows the fixture. The P&L shows the real cost.',
    'Labor is 70% of lighting maintenance. The purchasing decision ignored it.',
    'Your maintenance budget is wrong. Here\'s the line it\'s missing.',
  ],
  'fixture-lifespan': [
    'The fixture rating that only holds in a laboratory.',
    'Early LED failures are thermal, not random. That\'s fixable.',
    'Two replacement cycles where one was budgeted: driver mismatch in action.',
  ],
  'facility-safety': [
    'The compliance gap that appears slowly, then all at once.',
    'OSHA footcandle standards don\'t account for lumen degradation. Your system does.',
    'Safety incident liability: the cost no lighting spec sheet calculates.',
  ],
  'warehouse-visibility': [
    'The error-prone zone isn\'t a people problem. It\'s a photometric problem.',
    'Barcode scanning speed is a lighting spec, not a training outcome.',
    'Your mis-ship rate has a zone. That zone has a lighting plan.',
  ],
  'labor-inefficiency': [
    'The productivity variable that costs more than the energy line.',
    'Second-half shift underperformance: a lighting problem, not a morale problem.',
    'The environmental input most operations never measure.',
  ],
  'total-cost-ownership': [
    'The 60% of lighting cost that doesn\'t appear on the purchase order.',
    'Optimizing for 40% of the total is the most common lighting mistake.',
    'The 5-year math on the cheap fixture doesn\'t look cheap at year three.',
  ],
  'retrofitting': [
    'LED retrofit ROI: real in theory, 50% miss it in practice.',
    'The savings gap that appears 18 months after installation.',
    'Driver mismatch: the retrofit problem that was avoidable from day one.',
  ],
  'operational-disruption': [
    'Proactive replacement: the decision that costs less than waiting.',
    'The cascade failure timeline that aging systems always follow.',
    'Emergency repair premium: 2–3x, 6–8 times a year, predictably.',
  ],
}

const ENGAGEMENT_QUESTIONS: Record<string, string> = {
  'energy-cost': 'What does your facility currently spend on lighting energy per sq ft annually? Most operators don\'t have this number. It\'s worth finding.',
  'downtime': 'How many unplanned lighting maintenance calls did your facility have in the past 12 months? That number is a system health indicator.',
  'maintenance-costs': 'What\'s your true cost per high-bay fixture replacement — including labor, lift, and production window? Most facilities don\'t track the full number.',
  'fixture-lifespan': 'Are your fixtures hitting their rated lifespan? If you\'ve had early failures, what was the root cause diagnosis?',
  'facility-safety': 'When was the last time you measured footcandle levels in your assembly and picking areas? Most facilities haven\'t done it since installation.',
  'warehouse-visibility': 'Have you mapped your picking error rate by zone? If so, does the pattern correlate to lighting coverage areas?',
  'labor-inefficiency': 'Have you tracked productivity by shift half — first four hours vs. last four hours? The second half often shows measurable degradation.',
  'total-cost-ownership': 'When did you last build a TCO model for a lighting decision? Or was the last decision made on first cost alone?',
  'retrofitting': 'Did your most recent LED retrofit project hit its projected energy savings? If not, was driver mismatch part of the diagnosis?',
  'operational-disruption': 'Is your lighting maintenance call volume increasing year over year? That trend is worth tracking — it usually means the system is entering an accelerating failure phase.',
}

const TW_REPURPOSING: string[] = [
  'Expand the thread into a LinkedIn post — use the hook as the opening and the thread structure as the body.',
  'Turn each thread tweet into a single slide in an Instagram carousel.',
  'Pull the contrarian take as a YouTube Shorts hook — the tension drives immediate view retention.',
  'Use the engagement question as a cold email opener for outreach to operations directors.',
  'Turn the founder-style post into a LinkedIn personal story post — first-person narrative drives higher engagement.',
]

const TW_IMPROVEMENTS: Record<string, string[]> = {
  'energy-cost': [
    'Add a specific utility rate anchor (e.g., $0.12/kWh industrial average) to make the dollar claims verifiable.',
    'Include a before/after comparison format for the contrarian take — it drives more saves and shares.',
    'For threads, add a visual prompt suggestion (e.g., "save this") at the midpoint to boost algorithm performance.',
  ],
  'downtime': [
    'Name a specific industry in the hook (automotive, food processing, cold storage) to sharpen targeting.',
    'Add the work order clustering pattern as a concrete observation — readers recognize it immediately.',
    'Include the break-even math between emergency repair and proactive replacement as a final thread tweet.',
  ],
  'maintenance-costs': [
    'Build the itemized cost comparison into the thread — fixture cost vs. labor vs. lift vs. production window.',
    'Add a poll to the thread asking what percentage of maintenance cost is labor vs. parts — it drives engagement and anchors the stat.',
    'For the founder post, add a specific facility type and size — it makes the story more credible and relatable.',
  ],
  'total-cost-ownership': [
    'Build a table-format tweet with the $30 vs. $80 fixture 5-year cost model — visual data drives saves.',
    'Add the percentage improvement in TCO from proper specification vs. first-cost selection — quantify the gap.',
    'For the contrarian take, add "and here\'s the fix" as a follow-up tweet — engagement questions alone don\'t convert.',
  ],
}

export function generateTwitter(inputs: TwitterInputs, seed: number = 0): TwitterOutput {
  const v = seed % 3
  const p = inputs.problem

  const single = SINGLE_POSTS[p] ?? SINGLE_POSTS['energy-cost']
  const mainPost = single[v % single.length]

  let thread: string[] | undefined
  if (inputs.postFormat === 'thread') {
    const threads = THREADS[p] ?? THREADS['energy-cost']
    thread = threads[v % threads.length]
  } else if (inputs.postFormat === 'contrarian') {
    const contra = CONTRARIAN_POSTS[p] ?? CONTRARIAN_POSTS['energy-cost']
    thread = contra[v % contra.length] ? [contra[v % contra.length]] : undefined
  } else if (inputs.postFormat === 'founder') {
    const founder = FOUNDER_POSTS[p] ?? FOUNDER_POSTS['energy-cost']
    thread = founder[v % founder.length] ? [founder[v % founder.length]] : undefined
  } else if (inputs.postFormat === 'quote-response') {
    const qr = QUOTE_RESPONSES[p] ?? QUOTE_RESPONSES['energy-cost']
    thread = qr[v % qr.length] ? [qr[v % qr.length]] : undefined
  }

  const altHooks = ALT_HOOKS[p] ?? ALT_HOOKS['energy-cost']
  const alternateHook = altHooks[v % altHooks.length]

  const cta = v === 0
    ? 'Follow for more on this. Link in bio for the full cost audit framework.'
    : v === 1
    ? 'Comment your facility size and operation type. I\'ll share the relevant cost range.'
    : 'Repost if you know a facility manager dealing with this. The conversation is worth having.'

  const engagementQuestion = ENGAGEMENT_QUESTIONS[p] ?? ENGAGEMENT_QUESTIONS['energy-cost']
  const improvements = TW_IMPROVEMENTS[p] ?? TW_IMPROVEMENTS['energy-cost']

  const fullText = [mainPost, ...(thread ?? [])].join(' ')
  const qualityScore = scoreContent(inputs, true, true, true, fullText.split(' ').length)

  return {
    platform: 'twitter',
    mainPost,
    thread,
    alternateHook,
    cta,
    engagementQuestion,
    repurposingSuggestions: TW_REPURPOSING.slice(0, 3),
    qualityScore,
    improvementSuggestions: improvements.slice(0, 3),
  }
}
