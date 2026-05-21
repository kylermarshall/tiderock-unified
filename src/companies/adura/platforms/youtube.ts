import type { YouTubeInputs, YouTubeOutput } from '../types'
import { PROBLEM_DATA } from '../lib/companyProfile'
import { scoreContent } from '../lib/scoring'

const TITLES: Record<string, string[][]> = {
  'energy-cost': [
    ["Why Your Facility Is Losing $40K/Year to Lighting (Not the Electric Bill)", "Why Cheap LED Fixtures Cost More Than Quality Ones", "3 Signs Your Lighting System Is Wasting Money Right Now"],
    ["The Fixture Spec That's Costing You $45K a Year", "LED Doesn't Mean Efficient: The Mismatch Problem", "Why Your Energy Bill Didn't Drop After the LED Upgrade"],
    ["Your Lighting Budget Is Wrong — Here's the Real Number", "The Energy Audit That Reveals the Hidden Lighting Cost", "How to Stop Losing $1.50/Sq Ft on Lighting Annually"],
  ],
  'downtime': [
    ["The Lighting Failure That Costs $50K/Hour to Ignore", "Why Aging Lighting Systems Fail When You Can't Afford It", "Unplanned Lighting Downtime: The $50K/Hour Problem"],
    ["Why Your Facility Has 3x More Lighting Failures Than It Should", "The Maintenance Pattern That Predicts a System Breakdown", "Lighting Downtime Is Predictable. Here's How to See It Coming."],
    ["What Happens When a Light Fails in an Active Production Zone", "Cascade Failures in Aging LED Systems: What to Watch For", "The True Cost of Waiting Until a Lighting System Fails"],
  ],
  'maintenance-costs': [
    ["Why 70% of Lighting Maintenance Cost Is Never on the Invoice", "The Real Cost of Replacing a High-Bay Fixture: $400 in Labor", "What Facilities Underestimate About Lighting Maintenance"],
    ["High-Bay Fixture Replacement: The Cost Nobody Budgets For", "Why Procurement Pays $80 and Operations Pays $400", "The Maintenance Cost Gap Between Year 1 and Year 3"],
    ["How Facilities Underestimate Lighting Maintenance by 60%", "The Labor Cost That Makes Cheap Fixtures Expensive", "Lighting Maintenance Budgets: What the Real Number Looks Like"],
  ],
  'fixture-lifespan': [
    ["The 50,000-Hour LED Claim That Falls Apart Under Real Load", "Why Budget LED Fixtures Fail at Hour 22,000, Not 50,000", "What Actually Determines LED Fixture Lifespan in the Field"],
    ["Thermal Management: The Spec That Determines Real LED Life", "The Hidden Reason Your LED Fixtures Are Failing Early", "How Driver Mismatch Cuts LED Lifespan in Half"],
    ["Why the Lab Rating and the Field Rating Are Different Numbers", "Budget vs. Quality LED Fixtures: The 10-Year Cost Model", "The Thermal Spec Most Buyers Never Ask About"],
  ],
  'facility-safety': [
    ["The OSHA Lighting Exposure Most Facilities Don't Know They Have", "Why Accident Rates Climb 20% in Underlit Warehouses", "$500K Liability From Poor Lighting: The Safety Math Explained"],
    ["Footcandle Compliance: What Most Facilities Fail to Measure", "OSHA Lighting Standards and the Facilities That Fall Short", "When Poor Lighting Becomes a Workers' Comp Claim"],
    ["How Lumen Degradation Creates Compliance Risk Over Time", "The Safety Incident That Starts With a Lighting Specification", "Why 'No Incidents' Doesn't Mean Compliant"],
  ],
  'warehouse-visibility': [
    ["The Picking Error Problem That's Actually a Lighting Problem", "How Shadow Zones Create a 25% Error Rate in Warehouses", "Why Mis-Ships Trace Back to the Facility, Not the Worker"],
    ["CRI 70 vs CRI 80: What Barcode Scanning Speed Really Costs You", "15–30% Drop in Picking Accuracy From Lighting Inconsistency", "How to Find the Error-Prone Zones on Your Warehouse Floor"],
    ["The Throughput Tax of Poor Color Rendering in Distribution", "Why Zone 3 Has the Highest Error Rate (It's the Lighting)", "How Lighting Consistency Improves Picking Accuracy"],
  ],
  'labor-inefficiency': [
    ["The 20% Productivity Loss That Never Appears on a Lighting Invoice", "Why Poor Lighting Costs More on the Labor Line Than the Energy Line", "Eye Fatigue After Hour Four: The Shift-Long Tax on Output"],
    ["How Lighting Affects Cognitive Performance in Sustained Tasks", "Why Your Second Shift Underperforms Your First", "15–20% Productivity Gap From Lighting: The Data Explained"],
    ["The Environmental Variable Nobody Measures in Operations", "How Calibrated Lighting Improves Throughput Without Adding Headcount", "What Workers' Output Looks Like in Properly vs. Poorly Lit Facilities"],
  ],
  'total-cost-ownership': [
    ["The $30 Fixture That Costs $180: A 5-Year Cost Model Breakdown", "Why First-Cost Purchasing Is One of the Most Expensive Strategies", "60% of Lighting Cost Comes After Installation — Here's the Breakdown"],
    ["How to Build a TCO Model for a Lighting Procurement Decision", "What Procurement Gets Wrong About Lighting Bids", "The 40/60 Rule Every Facility Manager Should Know"],
    ["Why the Lowest Lighting Bid Is Rarely the Lowest Cost", "Budget vs. Quality Fixtures: The Real 10-Year Math", "1,000 Fixtures at $30 Each: What the P&L Shows at Year Three"],
  ],
  'retrofitting': [
    ["50% of LED Retrofit Projects Miss Their Savings Target — Here's Why", "The Driver Mismatch Problem That Kills Retrofit ROI", "Why Cheap LED Retrofits Fail at 3x the Rate of Engineered Systems"],
    ["The Post-Retrofit Audit Most Facilities Skip (And Why It Costs Them)", "How LED Retrofit Projects Become Recurring Maintenance Expenses", "What a Proper Retrofit Engineering Review Actually Includes"],
    ["Day-One Efficiency Loss From Driver Mismatch: The Hidden Retrofit Gap", "Why Your LED Retrofit Didn't Save What Was Projected", "The LED Retrofit Red Flags That Appear Before Year Two"],
  ],
  'operational-disruption': [
    ["6–8 Hours of Unplanned Lighting Downtime Per Year: The Facility Average", "Emergency Lighting Repairs at 3x Cost: The Math on Waiting", "Cascade Failures in Aging Systems: When the Problem Accelerates"],
    ["Proactive vs. Reactive Lighting Maintenance: A Cost Comparison", "The Work Order Pattern That Predicts a System Breakdown", "What Aging Lighting Systems Actually Cost Per Year"],
    ["How to Build a Proactive Lighting Replacement Schedule", "Why Aging Lighting Systems Get More Expensive Every Year", "The Disruption Budget That Makes the Case for Replacement"],
  ],
}

const THUMBNAIL_TEXTS: Record<string, string> = {
  'energy-cost': '$40K WASTED ANNUALLY|YOU\'RE LOSING MONEY|REAL COST: $45K/YEAR',
  'downtime': '$50K/HOUR RISK|THIS IS WHY IT FAILS|REAL COST OF DOWNTIME',
  'maintenance-costs': '$400 PER FIXTURE|HIDDEN COST EXPOSED|LABOR IS THE COST',
  'fixture-lifespan': 'FAILS AT 22K HRS|NOT 50K HOURS|THE REAL LIFESPAN',
  'facility-safety': 'OSHA EXPOSURE|$500K LIABILITY|THIS IS THE RISK',
  'warehouse-visibility': '25% MORE ERRORS|SHADOW ZONE COST|IT\'S THE LIGHTING',
  'labor-inefficiency': '20% LESS OUTPUT|EVERY SHIFT|HIDDEN LABOR COST',
  'total-cost-ownership': '$30 → $180 REAL COST|YOU\'RE PAYING MORE|60% COMES AFTER',
  'retrofitting': '50% MISS TARGET|3X FAILURE RATE|RETROFIT REALITY',
  'operational-disruption': '3X EMERGENCY COST|6–8 HRS DOWNTIME|WAIT = PAY MORE',
}

const THREE_SECOND_HOOKS: Record<string, string[]> = {
  'energy-cost': [
    "You switched to LED two years ago. Your energy bill barely moved. Here's exactly why.",
    "A 100,000 sq ft warehouse with mismatched LED fixtures wastes $40,000 a year. Is yours one of them?",
    "Your lighting is LED. Your specification is wrong. That gap costs $18,000–$45,000 annually.",
  ],
  'downtime': [
    "One lighting failure in your production zone. $50,000 per hour in stopped operations. Here's what causes it.",
    "Facilities with aging lighting systems have 3x more maintenance calls. Here's what that costs annually.",
    "Unplanned lighting repairs cost 2–3x more than scheduled ones. Most facilities still wait for failure.",
  ],
  'maintenance-costs': [
    "70% of your lighting maintenance cost is labor. Most procurement decisions are made on the other 30%.",
    "Replacing a high-bay fixture isn't $80. It's $80 plus $150 to $400 in labor alone.",
    "Your facility is underestimating lighting maintenance costs by 40–60%. Here's the real number.",
  ],
  'fixture-lifespan': [
    "Your fixtures are rated for 50,000 hours. Under real facility load, they'll fail at 22,000.",
    "Budget LED fixtures don't fade slowly. They fail early — and thermal management is almost always why.",
    "The driver on your LED fixture is undersized. It's losing 30–50% of rated lifespan right now.",
  ],
  'facility-safety': [
    "OSHA requires 30 foot-candles in assembly areas. If you haven't measured, you don't know if you're compliant.",
    "Warehouse accident rates increase 20% in facilities with inadequate lighting. That's documented data.",
    "A single lighting-related safety incident costs $50,000 to $500,000. Most are preventable with one audit.",
  ],
  'warehouse-visibility': [
    "Your picking error rate in the high-shadow zones is a lighting problem, not a training problem.",
    "Below CRI 70, barcode scanning is 25% slower. If your facility runs CRI 65, the throughput gap is real.",
    "Shadow zones from poor fixture placement cause up to 25% more picking errors. Here's how to find yours.",
  ],
  'labor-inefficiency': [
    "After four hours under poor lighting, cognitive performance drops 20%. That's your afternoon shift.",
    "Workers in properly lit environments are 15–20% more productive. Most facilities absorb the opposite.",
    "Poor lighting costs more on the labor line than the energy line. Here's the math.",
  ],
  'total-cost-ownership': [
    "The $30 fixture looks cheap. After five years of maintenance and energy, it's cost $180.",
    "60% of total lighting cost comes after installation. Most procurement decisions treat it as a one-time expense.",
    "First cost is 40% of what the lighting system actually costs. Here's what the other 60% looks like.",
  ],
  'retrofitting': [
    "50% of LED retrofit projects miss their projected energy savings. Driver mismatch is almost always why.",
    "Cheap retrofit kits fail at 3x the rate of engineered systems within 18 months. Here's the pattern.",
    "Your retrofit installed LED fixtures. It may not have fixed the system. Here's the difference.",
  ],
  'operational-disruption': [
    "Facilities with aging lighting systems average 6–8 hours of unplanned downtime per year. Track yours.",
    "Emergency lighting repairs cost 2–3x more than scheduled maintenance. Every unplanned call burns the premium.",
    "Cascade failures in aging systems affect 30% more fixtures each year. Year two is always worse than year one.",
  ],
}

const OPENING_LINES: Record<string, string[]> = {
  'energy-cost': [
    `Most facilities assume the LED upgrade solved the energy problem. It didn't — because the specification is where the money actually lives. ${PROBLEM_DATA['energy-cost'].stat1}. That gap exists before you factor in any other variable.`,
    `Your electricity rates aren't the problem. Your fixture specification is. ${PROBLEM_DATA['energy-cost'].stat2}. That's the cost of running a system that was never properly designed.`,
    `The lighting invoice looks fine. The energy audit tells a different story. ${PROBLEM_DATA['energy-cost'].stat3}. For a 100,000 sq ft facility, that's $150,000–$300,000 per year — before any efficiency gap from mismatch.`,
  ],
  'downtime': [
    `Lighting failures don't cost what the fixture costs. They cost what the operation costs while it's down. ${PROBLEM_DATA['downtime'].stat1}. That's the number most maintenance managers never calculate until it happens.`,
    `${PROBLEM_DATA['downtime'].stat3}. When maintenance calls start clustering, the system is telling you something. Most facilities don't listen until they're mid-failure.`,
    `${PROBLEM_DATA['downtime'].stat2}. Four to six hours per incident. In a lift-required environment. During operating hours. That's the real cost calculation.`,
  ],
  'maintenance-costs': [
    `${PROBLEM_DATA['maintenance-costs'].stat1}. The fixture on the invoice is the smaller number. The labor is the cost nobody accounts for at procurement.`,
    `${PROBLEM_DATA['maintenance-costs'].stat2}. That's before the lift rental, the crew coordination, and the production window. The fixture was $80. The replacement was $480.`,
    `${PROBLEM_DATA['maintenance-costs'].stat3}. The gap isn't carelessness — it's the wrong measurement. Facilities budget on fixture cost. Maintenance happens at system cost.`,
  ],
  'fixture-lifespan': [
    `${PROBLEM_DATA['fixture-lifespan'].stat1}. The 50,000-hour rating assumes a lab environment. Your facility runs at higher temperature, higher vibration, and inconsistent voltage. The field performance is different.`,
    `${PROBLEM_DATA['fixture-lifespan'].stat2}. When the thermal management fails, the lumen output drops first. The driver follows. By hour 22,000, you're scheduling a replacement you budgeted for hour 50,000.`,
    `${PROBLEM_DATA['fixture-lifespan'].stat3}. A 30–50% lifespan reduction from driver mismatch means two replacement cycles where one was planned. The cost doubles. The maintenance exposure doubles.`,
  ],
  'facility-safety': [
    `${PROBLEM_DATA['facility-safety'].stat1}. Many aging systems that met code at installation fall short today because lumen output degrades. Nobody remeasures.`,
    `${PROBLEM_DATA['facility-safety'].stat2}. A 20% higher accident rate in facilities with poor lighting isn't a theory. It's a published figure that OSHA inspectors and plaintiff attorneys both know.`,
    `${PROBLEM_DATA['facility-safety'].stat3}. One incident. Properly documented. In a facility where nobody measured footcandle levels in years. That's the exposure.`,
  ],
  'warehouse-visibility': [
    `${PROBLEM_DATA['warehouse-visibility'].stat1}. The workers in the low-performing zone aren't less capable. The environment is working against them.`,
    `${PROBLEM_DATA['warehouse-visibility'].stat3}. CRI matters in distribution because label reading and barcode scanning are continuous, repetitive tasks. A 25% slowdown per scan compounds across every pick.`,
    `${PROBLEM_DATA['warehouse-visibility'].stat2}. Shadow zones from poor fixture placement concentrate errors in specific floor areas. Most facilities track total error rate. The pattern is in the zones.`,
  ],
  'labor-inefficiency': [
    `${PROBLEM_DATA['labor-inefficiency'].stat2}. For a 10-hour shift, that's six hours of reduced cognitive performance per worker, per day. The labor line is full. The output isn't.`,
    `${PROBLEM_DATA['labor-inefficiency'].stat1}. A 50-person operation with a 15–20% productivity gap from poor lighting is outputting at the equivalent of 40–42 people. The headcount is there. The environment isn't.`,
    `${PROBLEM_DATA['labor-inefficiency'].stat3}. Fewer complaints is a symptom metric. The real output metric is throughput — picks per hour, error rate, cycle time. Lighting moves all of them.`,
  ],
  'total-cost-ownership': [
    `${PROBLEM_DATA['total-cost-ownership'].stat2}. If first cost is 40% of total, procurement decisions made on first cost are optimizing for less than half the actual number.`,
    `${PROBLEM_DATA['total-cost-ownership'].stat1}. The math is clear: a $30 fixture that totals $180 in cost over five years is more expensive than an $80 fixture that totals $120. The purchase order showed a different story.`,
    `${PROBLEM_DATA['total-cost-ownership'].stat3}. Maintenance and energy — 60% of total cost — are treated as operating expenses, not as outputs of a procurement decision. They are both.`,
  ],
  'retrofitting': [
    `${PROBLEM_DATA['retrofitting'].stat2}. Half of all retrofit projects miss their savings target. Not because LEDs don't work — because the driver wasn't matched and the system wasn't engineered.`,
    `${PROBLEM_DATA['retrofitting'].stat1}. Cheap retrofit kits fail at 3x the rate of properly designed systems in 18 months. The warranty ends. The failures don't.`,
    `${PROBLEM_DATA['retrofitting'].stat3}. A mismatched driver-LED combination loses 15–25% efficiency from day one. The projected savings your team modeled never existed in that system.`,
  ],
  'operational-disruption': [
    `${PROBLEM_DATA['operational-disruption'].stat1}. Six to eight hours of unplanned disruption from lighting annually is the average. Facilities in the late stages of system aging can double that.`,
    `${PROBLEM_DATA['operational-disruption'].stat2}. Every emergency call burns the 2–3x premium. Six to eight calls per year at that premium is a predictable, avoidable cost.`,
    `${PROBLEM_DATA['operational-disruption'].stat3}. The cascade accelerates. Year two is always worse than year one. The problem doesn't stabilize — it compounds until you address the system.`,
  ],
}

function buildScript(inputs: YouTubeInputs, v: number): string {
  const p = inputs.problem
  const pd = PROBLEM_DATA[p] ?? PROBLEM_DATA['energy-cost']
  const hook = THREE_SECOND_HOOKS[p]?.[v] ?? THREE_SECOND_HOOKS['energy-cost'][0]
  const opening = OPENING_LINES[p]?.[v] ?? OPENING_LINES['energy-cost'][0]

  if (inputs.videoFormat === 'shorts') {
    return `[0:00 — HOOK]
${hook}

[0:05 — PROBLEM]
${opening}

[0:15 — THE COST]
${pd.cost1}. ${pd.cost2}.

Most ${inputs.targetAudience} don't track this number — because it doesn't show up on one invoice.

[0:28 — THE MISTAKE]
${pd.consequence}

The assumption everyone makes: the system is fine because nothing has failed yet. That's not the same as the system performing well.

[0:42 — THE FIX]
The difference between a facility absorbing this cost and one that isn't comes down to specification — not product selection.

A properly designed system eliminates this gap. The audit to find it takes 15 minutes.

[0:55 — TAKEAWAY]
If you're managing a facility over 50,000 sq ft, follow for more on this. Link in bio to run the numbers for your operation.`
  }

  if (inputs.videoFormat === '60-90s') {
    return `[0:00 — HOOK]
${hook}

[0:08 — EXPAND THE PROBLEM]
${opening}

[0:20 — FIRST DATA POINT]
${pd.stat1}.

This isn't a new product problem. It's a specification problem — and it exists in facilities that have already upgraded to LED.

[0:35 — SECOND DATA POINT]
${pd.stat2}.

That's not an outlier. That's the average. The facilities on the better side of that range are there because someone specified the system correctly.

[0:52 — THE HIDDEN CONSEQUENCE]
${pd.consequence}

The cost accumulates silently. It shows up on the P&L, not on the lighting invoice.

[1:05 — WHAT GOOD LOOKS LIKE]
A properly engineered lighting system doesn't just use less energy — it eliminates the maintenance cycles, the downtime exposure, and the performance gaps that make the operating cost high.

${pd.cost1}. That's the gap between a well-specified system and an average one.

[1:22 — CTA]
If you want to know where your facility sits on that range, the assessment takes 15 minutes. Comment below or visit adurasolutions.com.`
  }

  // long-form
  return `[FULL OUTLINE — 8–12 MINUTE VIDEO]

[0:00–0:45 — INTRO HOOK]
Open with the core tension: ${hook}

Establish credibility fast. You're going to walk through the actual cost structure — not theory, not vendor pitch.

State the video's promise: by the end, you'll know exactly where your facility is losing money on lighting and what to do about it.

[0:45–2:00 — PROBLEM FRAME]
${opening}

Define the scope: this affects facilities that have already upgraded to LED and facilities that haven't. The root cause is the same — specification, not product.

Establish who this is for: ${inputs.targetAudience}. Operations side, not IT or marketing.

[2:00–4:00 — COST BREAKDOWN]
Walk through the numbers systematically.

First number: ${pd.stat1}.
Explain what causes this. Be specific about the mechanism — driver mismatch, lumen mismatch, thermal load mismatch.

Second number: ${pd.stat2}.
Translate this into a dollar figure for a mid-size facility. Use the 100,000 sq ft reference point.

Third number: ${pd.cost1}.
This is the operational consequence. Not theoretical — average across facility audits.

[4:00–5:30 — COMMON MISTAKES]
Mistake 1: Evaluating lighting on first cost alone.
Explain why this is the wrong variable to optimize.

Mistake 2: Assuming the LED upgrade solved the problem.
${pd.consequence}

Mistake 3: Not measuring performance after installation.
Most facilities spec a system, install it, and never verify it delivered what was projected.

[5:30–7:30 — SYSTEM DESIGN PRINCIPLES]
What a properly engineered system looks like:
- Photometric design per zone, not per building
- Driver spec matched to fixture and environment
- Thermal management rated for actual operating conditions
- Post-installation verification against design spec

What this prevents:
${pd.cost2}. And the operational disruption that comes with unplanned failures.

[7:30–9:00 — WHAT TO LOOK FOR]
When evaluating a lighting vendor or specification, ask for:
1. Zone-by-zone photometric layout
2. Driver thermal rating for your operating environment
3. Post-installation audit protocol
4. 10-year TCO projection, not just first-cost quote

Any vendor unwilling to provide these is selling product, not a system.

[9:00–10:00 — CASE STUDY BRIDGE]
Walk through a representative facility scenario.
A 200,000 sq ft distribution facility. Legacy lighting. 3–4 unplanned maintenance calls per quarter.
The audit revealed: ${pd.stat3}.
After proper specification and installation: maintenance calls dropped to near-zero. Energy savings hit projections. No downtime in 18 months.

[10:00–11:00 — CTA]
If you're managing a facility over 50,000 sq ft and you haven't run a lighting cost audit in the past two years, that's the starting point.

The audit is 15 minutes. The cost of not doing it is in this video.

Link in the description to schedule one. Or drop your facility size in the comments and I'll walk you through the range for your operation type.`
}

const RETENTION_BEATS: Record<string, string[][]> = {
  'energy-cost': [
    ["0:00 — Hook: \"You're losing $40K/year on lighting. Here's proof.\"", "0:28 — Twist: \"The fixture is fine. The specification is wrong.\"", "0:50 — Payoff: \"Here's the exact number for your facility size.\""],
    ["0:00 — Hook: Specific dollar figure tied to facility size", "0:30 — Twist: Reveal that LED doesn't guarantee savings", "0:55 — Payoff: The one spec change that closes the gap"],
    ["0:00 — Hook: Contradiction — \"You upgraded. You're still overpaying.\"", "0:32 — Twist: Show the driver mismatch mechanism", "0:52 — Payoff: What a proper spec review reveals"],
  ],
  'downtime': [
    ["0:00 — Hook: \"$50,000/hour. One fixture.\"", "0:30 — Twist: \"The fixture isn't the cost. The stopped operation is.\"", "0:52 — Payoff: How to predict failures before they happen"],
    ["0:00 — Hook: Specific downtime scenario", "0:28 — Twist: Reveal the 3x maintenance call pattern", "0:50 — Payoff: The work order review that spots it early"],
    ["0:00 — Hook: The cost nobody calculates until it's too late", "0:32 — Twist: Cascade failure mechanism explained", "0:55 — Payoff: The proactive replacement math"],
  ],
}

const BUSINESS_INSIGHTS: Record<string, string> = {
  'energy-cost': `For a 100,000 sq ft facility, the gap between a properly specified LED system and an average one is $18,000–$45,000 per year in wasted energy. Over five years, that's $90,000–$225,000 that doesn't appear on any lighting invoice — but shows up on the utility bill every month.`,
  'downtime': `A single unplanned lighting failure in an active production zone can halt $50,000/hour operations. Facilities with aging systems average 6–8 such events per year. The operational exposure from lighting alone, when calculated at production cost per hour, routinely exceeds $100,000–$200,000 annually in high-throughput environments.`,
  'maintenance-costs': `Labor accounts for 70% of total lighting maintenance cost. A facility running 500 high-bay fixtures on a 5-year replacement cycle is looking at $75,000–$200,000 in labor costs alone — before parts, lift rental, or production disruption. The per-fixture price is almost never the expensive part.`,
  'fixture-lifespan': `A system designed for one replacement cycle over 10 years — but delivering two due to premature failures — doubles maintenance cost and doubles operational exposure. That delta traces directly to thermal management and driver specification decisions made at procurement, not to manufacturing defects.`,
  'facility-safety': `The liability exposure from a lighting-related safety incident in a documented underlit facility ranges from $50,000 to $500,000 per event. A photometric audit costs a fraction of a single OSHA citation. The insurance math is clear; most facilities never run it.`,
  'warehouse-visibility': `A distribution operation running 10,000 picks per day at 15% lower accuracy due to lighting inconsistency is processing 1,500 error-prone picks daily. At an average re-pick cost of $8–$15, the annual throughput loss from lighting alone ranges from $30,000 to $55,000 — before accounting for returned goods and mis-ship penalties.`,
  'labor-inefficiency': `A 50-person operation with a 15–20% productivity gap from poor lighting is outputting at the equivalent of 40–42 people. At an average fully-loaded labor cost of $22–$35/hour, the daily productivity deficit ranges from $880–$2,800. Over a 250-day operating year, that's $220,000–$700,000 in absorbed productivity loss.`,
  'total-cost-ownership': `The math on budget vs. quality fixtures is consistent: a $30 fixture typically totals $180 in cost over five years. A properly specified $80 fixture totals $120. On a 1,000-fixture installation, the TCO difference is $60,000 — in favor of the more expensive fixture. The purchase order told the opposite story.`,
  'retrofitting': `A retrofit project projected to save $40,000 annually that delivers 50% of savings due to driver mismatch effectively saves $20,000 — while generating 3x the maintenance call volume of a properly engineered system. The payback period doubles. The maintenance budget doesn't reflect that until year two.`,
  'operational-disruption': `Emergency lighting repairs at 2–3x scheduled maintenance cost, six to eight times per year, accumulates to a significant annual premium over a proactive replacement schedule. In facilities where each maintenance call requires lift equipment and crew coordination, the total operational cost of reactive maintenance consistently exceeds the cost of a scheduled replacement program.`,
}

const YT_REPURPOSING: string[] = [
  'Pull the 3-second hook as a Twitter/X post — add the stat and a question to drive engagement.',
  'Extract the cost breakdown section as a standalone LinkedIn post — no editing needed.',
  'Use the retention beat structure as a framework for a 5-slide Instagram carousel.',
  'Turn the CTA into a cold email subject line for outreach to operations directors.',
  'Post the thumbnail text as a text-only social post — the contrast drives clicks.',
]

const YT_IMPROVEMENTS: Record<string, string[]> = {
  'energy-cost': [
    'Add a visual prop — a utility bill or a facility floor plan — at the 30-second mark to anchor the cost claim visually.',
    'Name the specific fixture categories most likely to have mismatch issues (high-bay, linear, troffer) to increase relevance for search.',
    'Include a "what to ask your current vendor" segment — actionable questions drive shares and saves.',
  ],
  'downtime': [
    'Add B-roll of a maintenance lift in operation — it makes the cost of access tangible.',
    'Include a work order log visual to show the clustering pattern — viewers recognize it immediately.',
    'Add the break-even calculation between one emergency repair and a scheduled replacement.',
  ],
  'maintenance-costs': [
    'Show an itemized cost breakdown on screen — fixture, labor, lift, production window — it anchors the $400 figure.',
    'Add a comparison to HVAC maintenance cost for scale — most ops managers have that reference point.',
    'Include the facility size thresholds where high-bay access costs become the dominant maintenance variable.',
  ],
  'fixture-lifespan': [
    'Add a thermal image visual to illustrate fixture temperature under load — heat is abstract until visualized.',
    'Reference the IES LM-80 and LM-79 standards by name — they\'re searchable and credibility-building.',
    'Include a side-by-side lifespan projection chart for budget vs. quality fixtures at operating temperature.',
  ],
  'facility-safety': [
    'Reference the specific OSHA CFR citation on screen — it makes the compliance risk concrete.',
    'Show a footcandle measurement in action — the process demystifies compliance auditing.',
    'Add the workers\' comp premium multiplier for facilities with elevated incident rates.',
  ],
  'warehouse-visibility': [
    'Show a side-by-side visual of CRI 65 vs CRI 80 lighting on a label — the difference is immediately visible.',
    'Add a heat map of error distribution by zone — viewers will recognize their own floor in it.',
    'Include the re-pick cost calculation with specific numbers for a mid-size distribution operation.',
  ],
  'labor-inefficiency': [
    'Reference the specific color temperature range (4000K–5000K) that maximizes sustained task performance.',
    'Add a before/after productivity comparison from a real facility scenario (anonymized).',
    'Include the absenteeism data correlation — it broadens the argument beyond throughput.',
  ],
  'total-cost-ownership': [
    'Build the TCO model on screen in real time — a simple spreadsheet visual makes the math undeniable.',
    'Add the amortized cost-per-operating-hour metric — it reframes the conversation from capital to operational.',
    'Include the TCO comparison across three fixture tiers, not just two.',
  ],
  'retrofitting': [
    'Show the driver mismatch mechanism with a simple diagram — most viewers don\'t understand the technical cause.',
    'Add the warranty period gap between cheap and engineered systems — it\'s a tangible differentiator.',
    'Include a post-retrofit audit checklist — it\'s a high-value giveaway that drives subscribers.',
  ],
  'operational-disruption': [
    'Build a 5-year failure projection model on screen — showing cascade acceleration visually is compelling.',
    'Add the break-even analysis between continued reactive maintenance and a scheduled replacement program.',
    'Include the scheduling framework for proactive replacement — ops managers want to know how to implement it.',
  ],
}

export function generateYouTube(inputs: YouTubeInputs, seed: number = 0): YouTubeOutput {
  const v = seed % 3
  const p = inputs.problem
  const pd = PROBLEM_DATA[p] ?? PROBLEM_DATA['energy-cost']

  const titleSet = TITLES[p] ?? TITLES['energy-cost']
  const titleRow = titleSet[v] ?? titleSet[0]
  const formatIndex = inputs.videoFormat === 'shorts' ? 0 : inputs.videoFormat === '60-90s' ? 1 : 2
  const title = titleRow[formatIndex] ?? titleRow[0]

  const thumbStr = THUMBNAIL_TEXTS[p] ?? THUMBNAIL_TEXTS['energy-cost']
  const thumbArr = thumbStr.split('|')
  const thumbnailText = thumbArr[v % thumbArr.length]

  const hook = THREE_SECOND_HOOKS[p]?.[v] ?? THREE_SECOND_HOOKS['energy-cost'][0]
  const opening = OPENING_LINES[p]?.[v] ?? OPENING_LINES['energy-cost'][0]
  const script = buildScript(inputs, v)
  const businessInsight = BUSINESS_INSIGHTS[p] ?? BUSINESS_INSIGHTS['energy-cost']
  const improvements = YT_IMPROVEMENTS[p] ?? YT_IMPROVEMENTS['energy-cost']

  const retBeats = RETENTION_BEATS[p] ?? RETENTION_BEATS['energy-cost']
  const retentionBeats = retBeats[v % retBeats.length] ?? retBeats[0]

  const cta = inputs.videoFormat === 'shorts'
    ? 'Follow for more on this. Link in bio to run the numbers for your facility.'
    : `If you're managing a facility over 50,000 sq ft, the lighting cost audit in the description takes 15 minutes. It shows you exactly where the cost leakage lives. Link below. ${pd.cost1} — that gap is findable and fixable.`

  const qualityScore = scoreContent(inputs, true, true, true, script.split(' ').length)

  return {
    platform: 'youtube',
    title,
    thumbnailText,
    threeSecondHook: hook,
    openingLine: opening,
    scriptOrOutline: script,
    retentionBeats,
    businessInsight,
    cta,
    repurposingSuggestions: YT_REPURPOSING.slice(0, 3),
    qualityScore,
    improvementSuggestions: improvements.slice(0, 3),
  }
}
