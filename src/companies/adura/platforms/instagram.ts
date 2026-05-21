import type { InstagramInputs, InstagramOutput } from '../types'
import { PROBLEM_DATA } from '../lib/companyProfile'
import { scoreContent } from '../lib/scoring'

const VISUAL_HOOKS: Record<string, string[]> = {
  'energy-cost': [
    'Close-up of a utility bill. Dollar amount clearly visible. Text overlay: "LED doesn\'t mean efficient. The spec does."',
    'Split screen: industrial warehouse left (dim, mismatched lighting) vs. right (uniform, calibrated). Text: "$40K/year difference."',
    'Hand pointing to a line on an energy report. Text overlay: "This number shouldn\'t be this high."',
  ],
  'downtime': [
    'Empty production line, lights out in one zone. Text overlay: "$50,000/hour. One fixture."',
    'Maintenance worker with lift equipment in a high-bay facility. Text: "This call costs more than the fixture."',
    'Close-up of a work order log, multiple entries in the same month. Text: "Clustering. The system is telling you something."',
  ],
  'maintenance-costs': [
    'Wide shot of high-bay industrial ceiling with scissor lift visible. Text: "$400 in labor. Before parts."',
    'Invoice with two lines highlighted: fixture ($80) and labor ($340). Text: "The invoice lied."',
    'Facility manager looking up at high-bay fixtures. Text: "70% of this cost is not the fixture."',
  ],
  'fixture-lifespan': [
    'Side-by-side: spec sheet showing 50,000 hours vs. failed fixture at 22,000. Text: "Lab vs. field."',
    'Thermal image of LED fixture showing heat concentration. Text: "This is what kills it early."',
    'Budget LED fixture with visible driver housing. Text: "The chip is fine. The driver isn\'t."',
  ],
  'facility-safety': [
    'OSHA footcandle measurement tool in a warehouse aisle. Text: "When did you last measure?"',
    'Accident report form. Text: "$50,000–$500,000. Preventable."',
    'Warehouse aisle with clearly visible shadow zone. Text: "20% higher accident rate. Documented."',
  ],
  'warehouse-visibility': [
    'Distribution floor with visible shadow zones between fixture rows. Text: "This is where errors happen."',
    'Worker scanning a barcode label under warm, low-CRI lighting. Text: "25% slower. Every scan."',
    'Side-by-side: mislabeled package vs. correct package. Text: "The environment produced this error."',
  ],
  'labor-inefficiency': [
    'Worker at a sustained task station under industrial lighting. Text: "20% less cognitive output. Every afternoon shift."',
    'Split shift productivity chart — first 4 hours vs. last 4 hours. Text: "The gap is measurable."',
    'Two workers side by side — one in proper lighting, one in shadow zone. Text: "Same task. Different environment. Different output."',
  ],
  'total-cost-ownership': [
    'Two fixtures side by side: "$30" and "$80" label. Underneath: "$180 total" and "$120 total." Text: "The math changed."',
    'Purchase order line item showing lowest bid selected. Text: "40% of the actual cost."',
    'Year 1 vs. Year 3 maintenance log comparison. Text: "This is what the PO didn\'t show."',
  ],
  'retrofitting': [
    'Before/after: fluorescent fixture vs. LED retrofit kit. Energy savings chart doesn\'t match projection. Text: "50% miss target."',
    'Driver component close-up, mismatched with fixture specs visible. Text: "Day one efficiency loss: 25%."',
    'Maintenance call log 18 months post-retrofit. Text: "3x the failures. Warranty expired."',
  ],
  'operational-disruption': [
    'Calendar with 8 maintenance call dates marked across 12 months. Text: "This is predictable. Not random."',
    'Emergency repair crew working during operating hours. Text: "2–3x the cost. On their timeline."',
    'Work order comparison: scheduled maintenance cost vs. emergency call cost. Text: "You choose the number."',
  ],
}

const ON_SCREEN_TEXTS: Record<string, string[]> = {
  'energy-cost': [
    'You upgraded to LED.\nYour bill barely moved.\n\n[Pause]\n\nThe fixture isn\'t the problem.\nThe specification is.',
    'Lighting energy waste:\n15–40% from fixture mismatch alone.\n\n[Pause]\n\n$18K–$45K/year.\nPer facility.\nBefore any other variable.',
    '100,000 sq ft warehouse.\nLED fixtures.\n$38,000/year in wasted energy.\n\n[Pause]\n\nNot a utility problem.\nA specification problem.',
  ],
  'downtime': [
    'One fixture fails.\nProduction zone goes dark.\n\n[Pause]\n\n$50,000/hour.\nThe fixture costs $120.\n\n[Pause]\n\nThese are different problems.',
    '3x more maintenance calls.\nIn facilities with aging systems.\n\n[Pause]\n\nNot bad luck.\nSystem design.',
    'Unplanned repair.\n4–6 hours per call.\nLift required.\nProduction on hold.\n\n[Pause]\n\nThe fixture was the cheap part.',
  ],
  'maintenance-costs': [
    'Fixture cost: $80.\nLabor to replace it: $150–$400.\n\n[Pause]\n\nThe invoice shows one line.\nThe real cost is the other one.',
    '70% of lighting maintenance\nis labor.\n\n[Pause]\n\nMost purchasing decisions\nare made on the other 30%.',
    'High-bay replacement.\nLift rental.\nCrew coordination.\nProduction window.\n\n[Pause]\n\n$400.\nBefore parts.',
  ],
  'fixture-lifespan': [
    'Rated: 50,000 hours.\nField failure: 22,000 hours.\n\n[Pause]\n\nDifference: your operating environment.',
    '60% of early LED failures:\nthermal management.\n\n[Pause]\n\nNot the chip.\nThe driver.',
    'Driver mismatch.\nLifespan reduction: 30–50%.\n\n[Pause]\n\nTwo replacement cycles.\nOne was budgeted.',
  ],
  'facility-safety': [
    'OSHA minimum: 30 foot-candles.\nAssembly areas.\n\n[Pause]\n\nWhen did you last measure?',
    'Poor lighting.\n20% higher accident rate.\n\n[Pause]\n\nNot a theory.\nPublished data.',
    'One safety incident.\n$50,000–$500,000.\n\n[Pause]\n\nMost are preventable.\nWith one audit.',
  ],
  'warehouse-visibility': [
    'Picking accuracy.\n15–30% drop.\nFrom lighting inconsistency alone.\n\n[Pause]\n\nThe error isn\'t the employee.\nIt\'s the environment.',
    'CRI below 70.\nBarcode scanning: 25% slower.\n\n[Pause]\n\n10,000 picks per day.\nEvery scan.',
    'Shadow zones.\n25% more picking errors.\n\n[Pause]\n\nYou know where they are.\nIt\'s in the lighting plan.',
  ],
  'labor-inefficiency': [
    'After 4 hours: poor lighting.\nCognitive performance: −20%.\n\n[Pause]\n\nEvery shift.\nEvery day.',
    'Properly lit workers:\n15–20% more productive.\n\n[Pause]\n\nYour facility is absorbing\nthe opposite.',
    'Lighting affects output.\n\n[Pause]\n\nThat cost never appears\non a lighting invoice.',
  ],
  'total-cost-ownership': [
    '$30 fixture.\n5-year total cost: $180.\n\n$80 fixture.\n5-year total cost: $120.\n\n[Pause]\n\nThe purchase order lied.',
    '60% of lighting cost:\nafter installation.\n\n[Pause]\n\nMost procurement decisions:\ntreated as one-time.',
    'First cost: 40% of total.\n\n[Pause]\n\nYou\'re optimizing\nfor the smaller number.',
  ],
  'retrofitting': [
    '50% of LED retrofits\nmiss energy savings target.\n\n[Pause]\n\nDriver mismatch.\nAlmost always.',
    'Cheap retrofits:\n3x failure rate.\nWithin 18 months.\n\n[Pause]\n\nWarranty expires.\nFailures don\'t.',
    'Day one efficiency loss\nfrom driver mismatch: 25%.\n\n[Pause]\n\nThe savings never existed\nin that system.',
  ],
  'operational-disruption': [
    '6–8 unplanned disruption hours.\nPer facility.\nPer year.\n\n[Pause]\n\nNot random.\nPredictable.',
    'Emergency repair:\n2–3x scheduled cost.\n\n[Pause]\n\nYou choose the timing.\nOr the system does.',
    'Year 2 cascade failures:\n30% more fixtures than year 1.\n\n[Pause]\n\nThe deterioration accelerates.\nIt doesn\'t stabilize.',
  ],
}

function buildCarouselSlides(inputs: InstagramInputs, v: number): string[] {
  const p = inputs.problem
  const pd = PROBLEM_DATA[p] ?? PROBLEM_DATA['energy-cost']
  const onScreen = ON_SCREEN_TEXTS[p]?.[v] ?? ON_SCREEN_TEXTS['energy-cost'][0]

  const slides: Record<string, string[][]> = {
    'energy-cost': [
      [
        'Slide 1 — HOOK\n"You upgraded to LED.\nYour energy bill barely moved.\n\nHere\'s why."',
        'Slide 2 — THE PROBLEM\nFixture mismatch causes 15–40% energy loss before any other variable.\n\nThis happens in facilities that already have LED.',
        'Slide 3 — THE NUMBER\nA 100,000 sq ft warehouse with mismatched fixtures:\n$18,000–$45,000/year in wasted energy.\n\nNot the utility. The spec.',
        'Slide 4 — THE MECHANISM\nYou pay for lumens you don\'t use.\nYou pay for driver losses the system can\'t absorb.\nYou pay for zones that were never modeled.',
        'Slide 5 — THE ASSUMPTION\nMost facilities assume: "We have LED, we\'re good."\n\nThat assumption costs $18K–$45K/year per facility.',
        'Slide 6 — THE CONSEQUENCE\nMost energy audits reveal this in year 2 or 3.\n\nBy then, the money is gone.\nThe decision is locked in for 5+ more years.',
        'Slide 7 — THE FIX\nProper lighting design is:\n→ Photometric layout by zone\n→ Driver spec matched to environment\n→ Post-install verification\n\nNot just a fixture swap.',
        'Slide 8 — CTA\nIf your facility is over 50,000 sq ft:\n\nThe cost audit takes 15 minutes.\nThe gap it finds is real.\n\nLink in bio.',
      ],
      [
        'Slide 1 — HOOK\n"The LED upgrade didn\'t solve the problem.\nThe specification did — or didn\'t."',
        'Slide 2 — THE STAT\nLighting energy costs in poorly designed facilities:\n$1.50–$3.00 per sq ft annually.\n\nFor 200,000 sq ft: up to $600,000/year.',
        'Slide 3 — FIXTURE MISMATCH\nRunning the wrong fixture in the wrong zone:\n→ Paying for unused lumens\n→ Absorbing driver inefficiency\n→ Missing energy targets by 15–40%',
        'Slide 4 — WHO THIS AFFECTS\nFacilities that haven\'t upgraded to LED.\nFacilities that have.\n\nThe spec is the variable. Not the product.',
        'Slide 5 — WHERE IT SHOWS UP\nNot on the lighting invoice.\n\nOn the utility bill — every month.\nIn the energy audit — usually year 2 or 3.',
        'Slide 6 — THE COMMON MISTAKE\nEvaluating lighting on fixture price.\n\nYou\'re optimizing for 40% of total system cost.\nThe other 60% lives in maintenance and energy.',
        'Slide 7 — WHAT GOOD LOOKS LIKE\nA properly specified system:\n→ Zone-by-zone photometric design\n→ Driver matched to fixture and thermal load\n→ Verified against design spec post-installation',
        'Slide 8 — CTA\nWant to know where your facility sits?\n\nDrop your sq footage in the comments.\nI\'ll share the cost range for your facility class.',
      ],
    ],
  }

  const fallbackSlides = [
    `Slide 1 — HOOK\n"${ON_SCREEN_TEXTS[p]?.[v]?.split('\n')[0] ?? 'The cost is real. Here\'s the breakdown.'}"`,
    `Slide 2 — THE PROBLEM\n${pd.stat1}.`,
    `Slide 3 — THE NUMBER\n${pd.cost1}.`,
    `Slide 4 — THE MECHANISM\n${pd.stat2}.`,
    `Slide 5 — THE CONSEQUENCE\n${pd.consequence}`,
    `Slide 6 — THE SECOND COST\n${pd.cost2}.`,
    `Slide 7 — THE FIX\nA properly specified system addresses this at the design stage — not after the fact.\n\nEngineering, not purchasing, determines the outcome.`,
    `Slide 8 — CTA\nIf your facility is over 50,000 sq ft:\n\nThe cost audit takes 15 minutes.\nThe savings it reveals are real.\n\nLink in bio.`,
  ]

  const slideSet = slides[p]?.[v % (slides[p]?.length ?? 1)]

  if (slideSet) return slideSet

  return fallbackSlides.map(s => s.replace('[ON_SCREEN]', onScreen))
}

function buildReelScript(p: string, v: number): string[] {
  const pd = PROBLEM_DATA[p] ?? PROBLEM_DATA['energy-cost']
  const onScreen = ON_SCREEN_TEXTS[p]?.[v] ?? ON_SCREEN_TEXTS['energy-cost'][0]
  const visualHook = VISUAL_HOOKS[p]?.[v] ?? VISUAL_HOOKS['energy-cost'][0]

  return [
    `[0:00 — VISUAL HOOK]\n${visualHook}\n\nOn-screen text: ${onScreen.split('\n')[0]}`,
    `[0:03 — HOOK LINE]\nNarration: "${ON_SCREEN_TEXTS[p]?.[v]?.split('\n').slice(0, 2).join(' ') ?? 'Here\'s the number nobody tracks.'}"`,
    `[0:08 — PROBLEM]\nNarration: "${pd.stat1}."\n\nOn-screen: Key stat displayed in large text`,
    `[0:15 — COST]\nNarration: "${pd.cost1}. ${pd.cost2}."\n\nOn-screen: Dollar figure isolated`,
    `[0:22 — CONSEQUENCE]\nNarration: "${pd.consequence}"\n\nB-roll: Facility overhead shot`,
    `[0:30 — CTA]\nNarration: "If you\'re managing a facility over 50,000 sq ft, follow for more on this."\n\nOn-screen: "Follow + link in bio"`,
  ]
}

function buildStories(p: string, v: number): string[] {
  const pd = PROBLEM_DATA[p] ?? PROBLEM_DATA['energy-cost']
  return [
    `Story 1 — HOOK\nPoll sticker: "Does your facility know its true lighting cost per sq ft?"\nYes / No\n\nBackground: ${VISUAL_HOOKS[p]?.[v]?.split('.')[0] ?? 'Industrial facility overhead'}`,
    `Story 2 — STAT\n"${pd.stat1}."\n\nReaction sticker: "Did you know this?"`,
    `Story 3 — COST\n"${pd.cost1}."\n\nPoll: "Is this higher than you expected?"\nYes, way higher / About what I expected`,
    `Story 4 — CONSEQUENCE\n"${pd.consequence}"\n\nQuestion sticker: "What does your facility spend on this annually?"`,
    `Story 5 — CTA\n"We run facility lighting audits that find exactly this gap."\n\nLink sticker: "Run the numbers for my facility"\nURL: adurasolutions.com`,
  ]
}

function buildCaption(inputs: InstagramInputs, v: number): string {
  const p = inputs.problem
  const pd = PROBLEM_DATA[p] ?? PROBLEM_DATA['energy-cost']
  const hooks: Record<string, string[]> = {
    'energy-cost': ['The LED upgrade doesn\'t guarantee savings. The specification does.', 'Your lighting bill didn\'t drop after the upgrade. Here\'s the most likely reason.', 'Fixture mismatch is the most common source of lighting energy waste — and the least discussed.'],
    'downtime': ['Lighting failures don\'t cost what the fixture costs. They cost what stops.', 'Aging systems fail in clusters. The work order log shows it. Most facilities don\'t look.', 'Every emergency lighting call costs 2–3x a scheduled one. Most facilities pay the premium.'],
    'maintenance-costs': ['70% of lighting maintenance cost is labor. Most specs never account for it.', 'The fixture replacement that costs $400 in labor was bought for $80.', 'High-bay maintenance isn\'t expensive because fixtures are pricey. It\'s expensive because it\'s operationally complex.'],
    'fixture-lifespan': ['The 50,000-hour rating assumes a lab. Your facility isn\'t one.', 'Budget LEDs don\'t fail slowly — they fail early. And thermal management is almost always why.', 'Two replacement cycles where one was budgeted: that\'s driver mismatch in practice.'],
    'facility-safety': ['OSHA doesn\'t adjust its standards for lumen degradation. Your aging system does.', 'Warehouse accident rates increase 20% in underlit facilities. The data is published.', 'One lighting-related safety incident: $50,000–$500,000. A photometric audit: a fraction of that.'],
    'warehouse-visibility': ['The picking error in Zone 3 isn\'t a training problem. It\'s a lighting problem.', 'CRI below 70 slows barcode scanning by 25%. On 10,000 picks a day, that\'s real throughput loss.', 'Shadow zones produce errors. The fixture plan determines where they are.'],
    'labor-inefficiency': ['Lighting affects human output. That cost never appears on a lighting invoice.', 'After four hours under poor lighting, cognitive performance drops 20%. That\'s the second half of every shift.', 'The productivity gap between a properly and poorly lit facility: 15–20%. Most facilities absorb it invisibly.'],
    'total-cost-ownership': ['The $30 fixture costs $180 over five years. The $80 fixture costs $120. The PO showed the wrong story.', '60% of lighting cost comes after installation. Most purchasing treats it as a one-time expense.', 'Buying lighting on first cost is optimizing for 40% of the actual number.'],
    'retrofitting': ['50% of LED retrofits miss their savings projections. Driver mismatch is the most common reason.', 'Cheap retrofit kits fail at 3x the rate of engineered systems within 18 months.', 'The retrofit looked like a cost reduction. Without proper engineering, it became a recurring maintenance expense.'],
    'operational-disruption': ['Facilities with aging lighting systems average 6–8 hours of unplanned disruption per year.', 'Emergency lighting repairs cost 2–3x more than scheduled ones. Most facilities still wait for failure.', 'Cascade failures in aging systems affect 30% more fixtures in year two. The deterioration accelerates.'],
  }

  const captionHooks = hooks[p] ?? hooks['energy-cost']
  const captionHook = captionHooks[v % captionHooks.length]

  const hashtags = [
    '#FacilityManagement', '#IndustrialLighting', '#LEDLighting', '#OperationsManagement',
    '#WarehouseManagement', '#FacilityManager', '#PlantMaintenance', '#EnergyEfficiency',
    '#MaintenanceManagement', '#B2BMarketing', '#OperationalExcellence', '#LightingDesign',
    '#IndustrialManufacturing', '#DistributionCenter', '#CapEx',
  ]

  return `${captionHook}\n\n${pd.stat1}.\n\n${pd.consequence}\n\nFor facilities over 50,000 sq ft, the gap between a well-specified system and an average one is measurable — and findable with a 15-minute audit.\n\nLink in bio to run the numbers for your facility.\n\n${hashtags.join(' ')}`
}

const IG_REPURPOSING: string[] = [
  'Pull the carousel hook slide as a standalone Twitter/X post — the bold claim drives engagement.',
  'Use the on-screen text script as a LinkedIn post body — it\'s built for quick reading.',
  'Convert the Story sequence into a 5-tweet thread — one story = one tweet.',
  'Turn the Reel script into a YouTube Shorts narration script — the structure maps directly.',
  'Extract the caption as a Facebook post — add two more paragraphs of context for the platform.',
]

const IG_IMPROVEMENTS: Record<string, string[]> = {
  'energy-cost': [
    'Add a utility bill visual prop to the Reel — it makes the abstract dollar figure concrete.',
    'For the carousel, include a slide with a before/after photometric comparison — visual proof is more compelling than stats alone.',
    'Add a "save this" prompt on Slide 6 of the carousel — it explicitly drives the algorithm signal.',
  ],
  'downtime': [
    'Use B-roll of a scissor lift in a high-bay facility — it makes the "4–6 hours per call" claim visually real.',
    'Add a timeline visual showing the cascade failure pattern — the clustering effect is more compelling when shown.',
    'For the Story sequence, use a countdown format — "6 reasons your facility is headed for a breakdown" drives higher completion rates.',
  ],
  'maintenance-costs': [
    'Show an actual itemized cost breakdown as a visual — fixture, labor, lift, window — not just numbers in text.',
    'Add a "tag your maintenance supervisor" prompt at the end — it drives organic reach in the target audience.',
    'Use a split-screen visual comparing procurement\'s view vs. operations\' view of the same maintenance call.',
  ],
  'total-cost-ownership': [
    'Build a visible bar chart comparing 5-year costs — visual data is shared more than text data on Instagram.',
    'Add a save prompt on the TCO slide — "save this before your next procurement decision."',
    'For the Reel, end with a challenge: "Calculate your facility\'s real 5-year fixture cost. The math will surprise you."',
  ],
}

export function generateInstagram(inputs: InstagramInputs, seed: number = 0): InstagramOutput {
  const v = seed % 3
  const p = inputs.problem
  const pd = PROBLEM_DATA[p] ?? PROBLEM_DATA['energy-cost']

  const visualHook = VISUAL_HOOKS[p]?.[v] ?? VISUAL_HOOKS['energy-cost'][0]
  const onScreenText = ON_SCREEN_TEXTS[p]?.[v] ?? ON_SCREEN_TEXTS['energy-cost'][0]

  let scriptOrSlides: string[]
  if (inputs.contentFormat === 'carousel') {
    scriptOrSlides = buildCarouselSlides(inputs, v)
  } else if (inputs.contentFormat === 'reel') {
    scriptOrSlides = buildReelScript(p, v)
  } else if (inputs.contentFormat === 'story') {
    scriptOrSlides = buildStories(p, v)
  } else {
    scriptOrSlides = [buildCaption(inputs, v)]
  }

  const caption = buildCaption(inputs, v)

  const cta = v === 0
    ? 'Link in bio — run the 15-minute cost audit for your facility.'
    : v === 1
    ? 'Drop your facility sq footage in the comments. I\'ll show you the cost range for your operation type.'
    : 'Save this post. Share it with someone managing a facility over 50,000 sq ft.'

  const suggestedVisuals = [
    `Wide-angle shot of ${inputs.targetAudience.toLowerCase()} walking a facility floor — motion conveys operational scale`,
    'Close-up of industrial LED fixture from below — shows the hardware in context',
    `Split-screen: facility with shadow zones left vs. uniform lighting right — before/after contrast`,
    `${pd.cost1.split('.')[0]} displayed as large text on plain background — data-forward visual`,
    'Maintenance worker with lift equipment in high-bay environment — operational realism',
  ]

  const improvements = IG_IMPROVEMENTS[p] ?? IG_IMPROVEMENTS['energy-cost']
  const fullText = scriptOrSlides.join(' ') + ' ' + caption
  const qualityScore = scoreContent(inputs, true, true, true, fullText.split(' ').length)

  return {
    platform: 'instagram',
    visualHook,
    onScreenText,
    scriptOrSlides,
    caption,
    cta,
    suggestedVisuals,
    repurposingSuggestions: IG_REPURPOSING.slice(0, 3),
    qualityScore,
    improvementSuggestions: improvements.slice(0, 3),
  }
}
