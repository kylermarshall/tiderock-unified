import type { FacebookInputs, FacebookOutput } from '../types'
import { PROBLEM_DATA } from '../lib/companyProfile'
import { scoreContent } from '../lib/scoring'

function buildShortPost(p: string, v: number): string {
  const pd = PROBLEM_DATA[p] ?? PROBLEM_DATA['energy-cost']
  const hooks: Record<string, string[]> = {
    'energy-cost': [
      `Most facilities that upgrade to LED still overpay on energy. Here's the number: ${pd.stat1}. The fixture isn't the variable. The specification is. ${pd.cost1}. Most operators discover this during a utility audit — after the money is already gone.`,
      `Your lighting bill didn't drop after the LED upgrade? ${pd.stat2}. The fix isn't new fixtures — it's a proper specification review. That takes 15 minutes.`,
      `${pd.cost2}. For a 100,000 sq ft facility, that's $18,000–$45,000/year in wasted energy from a specification decision made at purchase. Most facilities never trace the bill back to the spec.`,
    ],
    'downtime': [
      `Lighting failures don't cost what the fixture costs. They cost what stops. ${pd.stat1}. ${pd.cost1}. The maintenance team knows this. The procurement team usually doesn't.`,
      `${pd.stat3}. When maintenance calls cluster, the system is giving you a warning. Most facilities wait for the cascade before responding. By then, the cost is already significant.`,
      `${pd.stat2}. Unplanned lighting maintenance in high-bay areas is expensive — not because of parts, but because of everything that stops while you wait for it.`,
    ],
    'maintenance-costs': [
      `${pd.stat1}. The fixture on the invoice is the small number. The labor to replace it in a high-bay environment is the real cost — $150–$400 before parts.`,
      `${pd.stat3}. The gap between what facilities budget for lighting maintenance and what they actually spend is 40–60%. It's not carelessness — it's measuring the wrong thing.`,
      `${pd.stat2}. That's the labor floor for a high-bay replacement. Before the lift rental. Before the production window. Before overtime. The fixture was $80.`,
    ],
    'fixture-lifespan': [
      `${pd.stat1}. The 50,000-hour rating is a lab number. In an industrial facility with real thermal load and vibration, the field performance is different — often significantly.`,
      `${pd.stat2}. When the thermal management fails — which it does in undersized drivers under sustained load — the lumen output drops before the fixture fails outright.`,
      `${pd.stat3}. A 30–50% lifespan reduction from driver mismatch means two replacement cycles where one was budgeted. That doubles both the cost and the operational exposure.`,
    ],
    'facility-safety': [
      `${pd.stat2}. That's a documented figure, not an estimate. Facilities with aging lighting systems that have never been remeasured may be well below the OSHA minimums they met at installation.`,
      `${pd.stat3}. One incident. Properly documented. In a facility with no photometric audit on record. That's the liability exposure that a 15-minute audit eliminates.`,
      `${pd.stat1}. Lumen output degrades over time. The standard doesn't. Most facilities never remeasure after installation.`,
    ],
    'warehouse-visibility': [
      `${pd.stat1}. The workers in the low-performing zone aren't less capable. The environment is working against them. Shadow zones and inconsistent lighting produce measurable error concentration.`,
      `${pd.stat3}. CRI matters in distribution operations because label and barcode identification is a continuous, high-frequency task. A 25% slowdown per scan compounds across every pick in every shift.`,
      `${pd.stat2}. If you know where your error-concentration zones are on the floor, those are almost always your shadow zones. The photometric plan shows the correlation.`,
    ],
    'labor-inefficiency': [
      `${pd.stat2}. That's not a comfort issue — it's a throughput issue. For a 10-hour shift, six hours of reduced cognitive performance per worker per day adds up fast on the labor line.`,
      `${pd.stat1}. A 50-person operation with a 15–20% productivity gap from poor lighting is running at the equivalent of 40–42 people. The headcount is there. The environment isn't working.`,
      `${pd.stat3}. Fewer complaints is a symptom metric. The real output metric is throughput — picks per hour, error rates, cycle time. Lighting moves all of them.`,
    ],
    'total-cost-ownership': [
      `${pd.stat1}. The math is consistent: a $30 fixture typically costs $180 total over five years. An $80 properly specified fixture totals $120. The PO showed the opposite story.`,
      `${pd.stat3}. Maintenance and energy — 60% of total cost — are treated as operating expenses, not as outputs of a procurement decision. They're both.`,
      `${pd.stat2}. If you're evaluating lighting on first cost, you're optimizing for 40% of the actual number. The other 60% shows up on the operating budget starting in year two.`,
    ],
    'retrofitting': [
      `${pd.stat2}. The failure isn't the LED technology — it's the driver specification. A mismatched driver-LED combination runs at 15–25% lower efficiency from day one.`,
      `${pd.stat1}. The warranty period ends. The failures don't. A retrofit that was supposed to reduce maintenance costs becomes the source of recurring maintenance expenses.`,
      `${pd.stat3}. Day-one efficiency loss from driver mismatch: 15–25%. The projected savings you calculated never existed in that configuration.`,
    ],
    'operational-disruption': [
      `${pd.stat1}. Six to eight hours of unplanned disruption from lighting is the annual average. In facilities with aging systems approaching end-of-life, that number is consistently higher.`,
      `${pd.stat2}. Every emergency call burns the 2–3x premium. Six to eight calls per year at that rate adds up to a predictable, avoidable annual expense.`,
      `${pd.stat3}. Cascade failures accelerate. The facilities that wait for the pattern to stabilize are waiting for something that won't happen.`,
    ],
  }

  const shortPosts = hooks[p] ?? hooks['energy-cost']
  return shortPosts[v % shortPosts.length]
}

function buildEducationalPost(p: string, v: number): string {
  const pd = PROBLEM_DATA[p] ?? PROBLEM_DATA['energy-cost']

  const intros: Record<string, string[]> = {
    'energy-cost': [
      'If you\'ve upgraded your facility to LED but haven\'t seen the energy savings you expected, you\'re not alone — and the cause is almost always the same thing.',
      'Lighting energy cost in industrial facilities is one of the most consistently misunderstood line items on the operating budget.',
      'The assumption most facility operators make after an LED upgrade: the energy problem is solved. The data says otherwise.',
    ],
    'downtime': [
      'Lighting downtime is one of the least-tracked costs in facility operations — and one of the most consistent.',
      'Most facility managers know their production downtime cost per hour. Very few have calculated what lighting contributes to that number.',
      'Unplanned lighting maintenance in industrial facilities is expensive in a way that rarely shows up on a single invoice.',
    ],
    'maintenance-costs': [
      'Lighting maintenance costs are almost universally underestimated — not because of poor accounting, but because the wrong thing is being measured.',
      'The gap between what facilities budget for lighting maintenance and what they actually spend averages 40–60%. It\'s structural, not accidental.',
      'High-bay fixture maintenance is operationally complex in a way that per-fixture pricing never captures.',
    ],
    'fixture-lifespan': [
      'LED fixture lifespan ratings are frequently misunderstood — and the gap between the rated spec and the field performance has real cost consequences.',
      'The 50,000-hour LED fixture rating is a laboratory measurement. Industrial facilities are not laboratories.',
      'Premature LED fixture failure is almost always traceable to thermal management — not product quality.',
    ],
    'facility-safety': [
      'Lighting compliance in industrial facilities is a moving target that most operations never track after initial installation.',
      'The OSHA lighting standards that apply to your facility don\'t account for lumen degradation. Your aging system does — whether you track it or not.',
      'The liability exposure from poor facility lighting is significant, consistent, and almost entirely preventable.',
    ],
    'warehouse-visibility': [
      'Picking accuracy, error concentration, and mis-ship rates in distribution operations have a strong and measurable correlation with lighting quality.',
      'The error rate in your warehouse\'s highest-concentration zones is almost always a lighting problem before it\'s anything else.',
      'Color rendering and lighting consistency are operational variables in distribution environments — not just comfort preferences.',
    ],
    'labor-inefficiency': [
      'Lighting affects human cognitive output. Most facility P&Ls never connect the two — but the relationship is measurable and consistent.',
      'The productivity gap between properly and poorly lit work environments is documented, consistent, and frequently absorbed invisibly by operations teams.',
      'Eye fatigue under poor lighting reduces cognitive performance in ways that compound over the course of a shift — every shift.',
    ],
    'total-cost-ownership': [
      'Lighting procurement decisions made on first cost are optimizing for 40% of what the system actually costs. Here\'s what the other 60% looks like.',
      'Total cost of ownership for industrial lighting is one of the most misunderstood concepts in facility management — and one of the most consequential.',
      'The $30 vs. $80 fixture conversation looks obvious at purchase. It looks very different at year three.',
    ],
    'retrofitting': [
      'LED retrofit projects fail to hit their projected savings roughly half the time. The cause is almost always the same.',
      'A retrofit that doesn\'t deliver on its savings projection isn\'t a product problem. It\'s a specification and engineering problem.',
      'The LED retrofit decision looks straightforward: replace fluorescent with LED, reduce energy costs, improve reliability. For 50% of facilities, the second and third outcomes don\'t materialize.',
    ],
    'operational-disruption': [
      'Facilities with aging lighting systems follow a predictable disruption pattern. Most facilities track the events without recognizing the pattern.',
      'Unplanned lighting maintenance is almost always more expensive than planned maintenance — and almost always avoidable.',
      'The operational disruption from aging lighting systems is predictable, trackable, and avoidable with a defined replacement strategy.',
    ],
  }

  const introsForP = intros[p] ?? intros['energy-cost']
  const intro = introsForP[v % introsForP.length]

  return `${intro}

Here are the key factors every ${p === 'energy-cost' ? 'facility manager' : p === 'total-cost-ownership' ? 'procurement officer' : 'operations professional'} should understand:

**1. The primary cost mechanism**
${pd.stat1}. This is the baseline — before any other variable. Most facilities are somewhere on this range and don't know where.

**2. The dollar impact**
${pd.cost1}. For a mid-size industrial facility, this is a real number — not a theoretical one. It shows up on the utility bill, the maintenance log, or both.

**3. The compounding factor**
${pd.stat2}. This is where the cost accelerates. The first number is the floor. This is what builds on top of it when the underlying problem isn't addressed.

**4. The hidden consequence**
${pd.consequence}

Most facilities discover this in year two or three — after the procurement decision is already locked in for the next five-plus years.

**What this means in practice:**
The difference between a facility absorbing this cost and one that isn't usually traces back to one decision: whether the lighting system was specified by a photometric engineer or selected by price from a catalog.

Both facilities have LED. One has a system. The other has products.

If your facility is over 50,000 sq ft and this resonates, a cost audit takes 15 minutes and reveals exactly where on the cost range your facility sits. Comment below or message us directly.`
}

function buildDiscussionPost(p: string, v: number): string {
  const pd = PROBLEM_DATA[p] ?? PROBLEM_DATA['energy-cost']
  const questions: Record<string, string[]> = {
    'energy-cost': [
      `Quick question for facility managers: when did you last verify that your LED upgrade actually delivered its projected energy savings?\n\nI ask because ${pd.stat2}.\n\nAnd the gap between projected and actual savings almost always traces back to specification — not the product.\n\nHas anyone run a post-upgrade energy audit? What did you find?`,
      `For those managing facilities over 100,000 sq ft: what does your lighting energy cost per square foot look like annually?\n\n${pd.stat3}.\n\nMost operators I talk to don't have this number readily accessible — and the ones who find it are usually surprised.\n\nWorth knowing. Happy to help you calculate it if you share your sq footage.`,
      `${pd.consequence}\n\nHas anyone experienced this — an LED upgrade that looked like a win on the purchase order but didn't move the energy bill?\n\nWhat turned out to be the root cause?`,
    ],
    'downtime': [
      `For maintenance managers: how many unplanned lighting calls did your facility handle in the past 12 months?\n\n${pd.stat3}.\n\nIf your number is increasing year over year, that's a system-health signal — not random variance.\n\nWhat's your current approach when you see clustering in the maintenance log?`,
      `${pd.stat1}.\n\nHas anyone done the calculation on what a lighting failure in an active production zone actually costs their operation?\n\nNot the fixture cost — the total operational cost of the downtime event.\n\nThe number usually surprises people.`,
      `${pd.consequence}\n\nWhat's your facility's protocol when a lighting failure happens mid-shift? Curious how others balance safety, production continuity, and repair urgency.`,
    ],
    'maintenance-costs': [
      `For facility and maintenance managers: what does a high-bay fixture replacement actually cost your operation when you include labor, lift, and the production window?\n\n${pd.stat2}.\n\nMost facilities I've worked with track the fixture cost and not much else. The labor math is almost always a surprise.\n\nWhat's your actual all-in number?`,
      `${pd.stat3}.\n\nI'm curious how others approach lighting maintenance budgeting. Do you track actual vs. projected spend annually? Or is it managed reactively?`,
      `${pd.consequence}\n\nThis comes up a lot in facilities that spec fixtures by price: the year-one invoice looks fine, and the year-two maintenance bill is a surprise.\n\nHas anyone built a 5-year maintenance cost model before a lighting procurement decision? How did it change the outcome?`,
    ],
    'total-cost-ownership': [
      `Quick poll for procurement and operations teams: does your organization evaluate lighting on first cost, total cost of ownership, or some combination?\n\n${pd.stat3}.\n\nI've seen facilities save $60,000+ over five years by shifting the evaluation criteria — and I've seen them absorb the same amount in unexpected maintenance from going the other direction.\n\nHow does your team currently make this decision?`,
      `${pd.stat1}.\n\nThe math on first cost vs. TCO in lighting procurement is pretty clear when you lay it out — but most purchasing decisions still default to first cost.\n\nWhat would it take to change that in your organization? Is it a data problem, a budget structure problem, or something else?`,
      `${pd.consequence}\n\nFor anyone who's run a 5-year TCO comparison on a lighting decision: did it change what you selected? And how did you present it to the decision-makers?`,
    ],
  }

  const fallback = [
    `${pd.stat1}.\n\n${pd.consequence}\n\nFor those managing facilities dealing with this: what's been your approach? Has anyone found an effective way to track and address this cost?`,
    `${pd.stat2}.\n\nCurious how other ${p === 'facility-safety' ? 'safety managers' : p === 'warehouse-visibility' ? 'distribution operators' : 'facility managers'} are handling this. What's worked? What hasn't?\n\nSharing what I've seen work — and what typically doesn't.`,
    `${pd.cost1}. ${pd.cost2}.\n\nHas anyone built a comprehensive tracking system for this in their facility? What metrics are you actually monitoring?\n\nWould love to hear what the practical approaches look like in the field.`,
  ]

  const disc = questions[p] ?? fallback
  return disc[v % disc.length]
}

function buildBusinessOwnerPost(p: string, v: number): string {
  const pd = PROBLEM_DATA[p] ?? PROBLEM_DATA['energy-cost']

  const posts: Record<string, string[]> = {
    'energy-cost': [
      `A straightforward question for business owners with industrial or warehouse facilities:\n\nDo you know what your lighting system is actually costing you annually — not just the utility bill, but the total operating cost including maintenance?\n\nFor most: no.\n\n${pd.stat2}.\n\nThat's not a utility rate problem. It's a specification problem that was locked in when the fixtures were selected.\n\n${pd.consequence}\n\nThe business case for running an audit is simple: the audit costs less than one month of the gap. For most facilities over 100,000 sq ft, the gap is $18,000–$45,000/year.\n\nIf you haven't reviewed your lighting specification in the past three years, the audit is the starting point.`,
    ],
    'total-cost-ownership': [
      `For business owners making capital decisions: lighting procurement is almost always evaluated on first cost.\n\n${pd.stat2}.\n\nThat means the purchasing decision is being made on 40% of the actual number. The other 60% — maintenance and energy — shows up on the operating budget, not the capital line. A different budget, a different review cycle, a different decision-maker.\n\nThe result: facilities consistently pay more than they should.\n\n${pd.stat1}.\n\nIf your procurement team is selecting lighting on bid price, they're optimizing for the wrong variable.\n\nA 5-year TCO comparison changes the decision almost every time. The math is not close.`,
    ],
    'downtime': [
      `For business owners with production or distribution operations: have you calculated what a lighting failure in an active zone actually costs?\n\nNot the fixture. The operation that stops.\n\n${pd.stat1}.\n\nThis is not an edge case. This is the average consequence when lighting fails in a high-utilization environment.\n\n${pd.stat3}.\n\nWhen maintenance call frequency is increasing, the system is in its end-of-life phase. The cost of waiting is always higher than the cost of acting on your timeline.\n\nThe question isn't whether to replace the system. It's whether you control the timing.`,
    ],
  }

  const bizPosts = posts[p] ?? posts['energy-cost']
  const fallbackPost = `As a business owner with industrial or warehouse operations, the lighting system is one of the least-visible operating costs — until it isn't.\n\n${pd.stat1}.\n\n${pd.cost1}.\n\n${pd.consequence}\n\nThe audit that surfaces this problem takes 15 minutes. The cost of not running it compounds every month.`

  return bizPosts[v % bizPosts.length] ?? fallbackPost
}

function buildRetargetingPost(p: string, v: number): string {
  const pd = PROBLEM_DATA[p] ?? PROBLEM_DATA['energy-cost']

  const posts: Record<string, string[]> = {
    'energy-cost': [
      `If you've looked at Adura's lighting audit before but haven't moved forward:\n\nThe gap we find in most facilities over 50,000 sq ft: ${pd.cost1}.\n\nThat's not projected. That's the average across the facilities we've assessed.\n\n${pd.consequence}\n\nThe audit takes 15 minutes. It identifies exactly where the cost leakage is — and whether it's recoverable without a full replacement.\n\nMost of the time, it is.\n\nIf this has been on your list, now is a reasonable time to run the numbers.`,
    ],
    'total-cost-ownership': [
      `If the lighting cost conversation has been on your radar but hasn't moved:\n\n${pd.stat1}.\n\nThat number keeps accumulating — whether the assessment happens this month or next year.\n\n${pd.consequence}\n\nThe gap between what your facility currently spends and what a properly specified system would cost is measurable. We've mapped it for dozens of operations like yours.\n\nThe 15-minute audit is the starting point. The decision after that is yours.`,
    ],
    'maintenance-costs': [
      `For facilities that have been considering a lighting review:\n\n${pd.stat2}.\n\nThat's the labor cost floor for one replacement event in a high-bay environment. Multiply that by your annual maintenance call volume.\n\n${pd.consequence}\n\nThe assessment we run doesn't require commitment beyond 15 minutes. It surfaces the actual cost structure and tells you where the gap is.\n\nIf that conversation makes sense for your facility, the link is below.`,
    ],
  }

  const retPosts = posts[p] ?? posts['energy-cost']
  const fallback = `If the lighting cost conversation has been on your list:\n\n${pd.cost1}. ${pd.cost2}.\n\n${pd.consequence}\n\nThe gap compounds every month. The 15-minute audit surfaces exactly where it lives in your facility.\n\nLink in comments.`

  return retPosts[v % retPosts.length] ?? fallback
}

const FB_REPURPOSING: string[] = [
  'Pull the educational post intro as a LinkedIn hook — it\'s written for B2B and translates directly.',
  'Use the discussion question as a Twitter/X engagement post — shorter format, same tension.',
  'Convert the business owner post into a YouTube Shorts script — keep the direct P&L framing.',
  'Turn the key points from the educational post into an Instagram carousel — one point per slide.',
  'Use the retargeting post as an email re-engagement sequence — same audience, same message.',
]

const FB_IMPROVEMENTS: Record<string, string[]> = {
  'energy-cost': [
    'Add a "Calculate your gap" prompt with a simple formula — it turns the post into a practical tool.',
    'For the educational post, include a specific utility rebate program reference — it gives readers a tangible financial lever.',
    'For the discussion post, add a follow-up comment with the industry benchmark data — it seeds the discussion with credible facts.',
  ],
  'downtime': [
    'Add a poll to the discussion post — "How do you handle unplanned lighting failures? Reactive / Scheduled / Mixed" — it drives comments.',
    'For the business owner post, include the break-even math between one emergency repair and proactive replacement.',
    'Add the work order frequency analysis process as a practical step — readers want to know how to apply this to their facility.',
  ],
  'maintenance-costs': [
    'Include a simple cost calculator prompt in the educational post — "Multiply your fixtures by your labor rate to get your annual exposure."',
    'For the discussion post, add a follow-up with the typical split between budgeted and actual spend — it validates the experience most readers have.',
    'Add a specific call-to-action for maintenance supervisors specifically — they\'re the ones with the most direct exposure to this cost.',
  ],
  'total-cost-ownership': [
    'Build out the TCO comparison as a simple visual and post it as an image — visual data outperforms text on Facebook.',
    'For the business owner post, frame the procurement structure problem explicitly — it names the organizational barrier readers recognize.',
    'Add the amortized cost-per-operating-hour metric — it\'s a concrete number that reframes the capital vs. operating cost debate.',
  ],
}

export function generateFacebook(inputs: FacebookInputs, seed: number = 0): FacebookOutput {
  const v = seed % 3
  const p = inputs.problem
  const pd = PROBLEM_DATA[p] ?? PROBLEM_DATA['energy-cost']

  let primaryPost: string
  if (inputs.contentFormat === 'short') {
    primaryPost = buildShortPost(p, v)
  } else if (inputs.contentFormat === 'educational') {
    primaryPost = buildEducationalPost(p, v)
  } else if (inputs.contentFormat === 'discussion') {
    primaryPost = buildDiscussionPost(p, v)
  } else if (inputs.contentFormat === 'business-owner') {
    primaryPost = buildBusinessOwnerPost(p, v)
  } else {
    primaryPost = buildRetargetingPost(p, v)
  }

  const practicalTakeaways: Record<string, string[]> = {
    'energy-cost': [
      `Run a zone-by-zone energy audit using your utility data and fixture specs. The gap between actual and optimized energy draw is usually findable without outside help — but a photometric engineer will find it faster and more precisely.`,
      `Request a post-installation photometric report from your lighting vendor. If they don't provide one, that's meaningful information about the quality of the specification.`,
      `Calculate your lighting energy cost per sq ft annually. If it's above $1.50, the specification gap is likely there. Above $2.00, it's almost certainly there.`,
    ],
    'downtime': [
      `Pull your last 12 months of lighting work orders and sort by date. If you see clustering — three or more in a 30-day window — that's the beginning of a cascade pattern.`,
      `Calculate total operational disruption hours from lighting in the past year. Multiply by your production cost per hour. That's your annual lighting-related downtime exposure.`,
      `Compare your emergency repair invoices to your scheduled maintenance cost. If the emergency rate is more than 2x, the reactive maintenance posture is costing you.`,
    ],
    'maintenance-costs': [
      `Build an honest lighting maintenance cost model: (annual labor hours × average rate) + lift rental + parts + production window. Most facilities find this is 40–60% higher than their budgeted line.`,
      `Request itemized invoices from your next three lighting maintenance calls. Add up the labor component specifically. That's your true maintenance cost driver.`,
      `Calculate your 5-year maintenance cost projection based on current call volume and per-incident cost. Compare it to the cost of a proactive replacement on your timeline.`,
    ],
    'fixture-lifespan': [
      `Check the ambient operating temperature rating on your current fixtures against your facility's actual temperature. If there's a gap, you're likely in an accelerated failure zone.`,
      `Review your fixture spec sheet for driver thermal rating. If it's not specified for your environment, the lifespan rating is theoretical, not practical.`,
      `Track lumen output degradation over time by measuring footcandles in the same zones annually. The rate of decline is a leading indicator of impending failure.`,
    ],
    'facility-safety': [
      `Conduct a footcandle audit in your assembly areas, aisles, and picking zones. Compare results against OSHA minimums. Document the date and results for compliance purposes.`,
      `Review your incident log for any events that occurred in areas with documented lighting issues. The correlation is legally and operationally significant.`,
      `Schedule photometric re-measurement every two years for facilities with systems over five years old. Lumen degradation makes the initial measurement stale.`,
    ],
    'warehouse-visibility': [
      `Map your top 10 error-concentration zones on a floor plan. Overlay your photometric plan. The correlation between shadow zones and error zones is almost always visible.`,
      `Check the CRI specification on your current picking zone fixtures. If it's below CRI 70, that's a verified throughput and accuracy gap with a straightforward fix.`,
      `Track error rate by zone — not just total. Zone-level data reveals the environmental patterns that aggregate data obscures.`,
    ],
    'labor-inefficiency': [
      `Measure footcandle levels and color temperature in your primary work zones. Compare to the 4000K–5000K, 50+ footcandle standard for sustained cognitive task environments.`,
      `Track productivity and error rates by shift half — first four hours vs. last four. The second-half degradation pattern, if present, is one of the clearest indicators of poor lighting.`,
      `Survey your workers on eye strain and fatigue frequency. Correlate the responses by work zone. The zones with the highest complaint rates are usually the ones with the worst lighting specifications.`,
    ],
    'total-cost-ownership': [
      `Build a simple TCO model for your next lighting decision: fixture cost + (annual maintenance cost × 5) + (annual energy cost × 5). Compare at least two specification tiers.`,
      `Ask your lighting vendor for a 5-year cost projection, not just a first-cost quote. Vendors who can't provide this are selling product, not a system.`,
      `Review your last three lighting procurement decisions against actual maintenance and energy spend since installation. The gap between projected and actual is your TCO calibration data.`,
    ],
    'retrofitting': [
      `Audit your most recent retrofit project: compare projected energy savings to actual energy draw post-installation. If there's a gap, request a driver specification review from your installer.`,
      `Check that your retrofit drivers are rated for the operating temperature of your environment. This is the single most common failure point in retrofit projects.`,
      `Schedule a post-installation performance audit 90 days after any retrofit completion. This is the window where driver mismatch becomes visible in the performance data.`,
    ],
    'operational-disruption': [
      `Pull your lighting work order frequency data for the past 24 months. If the call volume in year two is more than 30% higher than year one, the system is entering the cascade phase.`,
      `Calculate the cost differential between your last three emergency lighting calls and a comparable scheduled maintenance event. That premium is your operational disruption cost per incident.`,
      `Build a proactive replacement schedule based on current call volume trend. The break-even point between continued reactive maintenance and a scheduled replacement program is usually reached within 18–24 months.`,
    ],
  }

  const takeaways = practicalTakeaways[p] ?? practicalTakeaways['energy-cost']
  const practicalTakeaway = takeaways[v % takeaways.length]

  const cta = v === 0
    ? 'If this applies to your facility, the 15-minute cost audit is the starting point. Comment below or message us directly.'
    : v === 1
    ? 'Share this post with a facility manager or maintenance supervisor in your network. The conversation is worth having.'
    : `We\'ve run facility lighting audits across dozens of operations. The gap is ${pd.cost1}. Comment \'AUDIT\' and we\'ll share the framework.`

  const discussionQuestions: Record<string, string> = {
    'energy-cost': 'Question for the facility managers in this group: has anyone run a post-upgrade energy audit after an LED installation? What did you find?',
    'downtime': 'For the maintenance managers here: what\'s your annual lighting maintenance call volume? Is it trending up or holding steady?',
    'maintenance-costs': 'What does a high-bay fixture replacement actually cost your operation — all-in, including labor and lift? Most facilities I talk to don\'t have this number.',
    'fixture-lifespan': 'Are your LED fixtures hitting their rated lifespan? If you\'ve had early failures, what did the post-mortem show?',
    'facility-safety': 'When was the last photometric measurement in your facility? And did the results match what you expected?',
    'warehouse-visibility': 'Have you ever mapped your error concentration zones against your lighting plan? The correlation usually shows up immediately.',
    'labor-inefficiency': 'Does your facility track productivity or error rates by shift half? The second half often looks meaningfully different from the first.',
    'total-cost-ownership': 'Does your organization evaluate lighting on first cost, TCO, or some combination? And how do you present the TCO argument to procurement?',
    'retrofitting': 'Did your most recent LED retrofit hit its projected energy savings? If not, did you identify the root cause?',
    'operational-disruption': 'Is your lighting maintenance call volume increasing year over year? That trend is worth tracking — it usually signals a system approaching its end-of-life phase.',
  }

  const improvements = FB_IMPROVEMENTS[p] ?? FB_IMPROVEMENTS['energy-cost']
  const fullText = primaryPost + ' ' + practicalTakeaway
  const qualityScore = scoreContent(inputs, true, true, true, fullText.split(' ').length)

  return {
    platform: 'facebook',
    primaryPost,
    practicalTakeaway,
    cta,
    discussionQuestion: discussionQuestions[p] ?? discussionQuestions['energy-cost'],
    repurposingSuggestions: FB_REPURPOSING.slice(0, 3),
    qualityScore,
    improvementSuggestions: improvements.slice(0, 3),
  }
}
