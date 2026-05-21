import type { YouTubeInputs, YouTubeOutput } from '../types'
import { PROBLEM_DATA, PROBLEM_LABELS } from '../lib/companyProfile'
import { scoreContent } from '../lib/scoring'

const VIDEO_TITLES: Record<string, string[]> = {
  'machining-bottlenecks': [
    'Why Your CNC Program Is Bottlenecked Before the First Cut',
    'The Hidden Throughput Constraint Slowing Every Precision Machining Job',
    'Machining Bottlenecks: Where They Start and What They Actually Cost',
  ],
  'tight-tolerance-failures': [
    'Tolerance Failures in Precision Machining: Where They Start and What They Cost',
    'Why Parts Fail Tolerance at Final Inspection (And How to Stop It)',
    'The In-Process Inspection Gap That\'s Costing Your Program $15,000 Per Event',
  ],
  'production-delays': [
    'Why 72% of Precision Manufacturing Delays Start in the Machining Phase',
    'The $6,000/Day Cost of a CNC Production Delay Nobody Tracked',
    'CNC Production Delays: The Upstream Causes Most Schedules Ignore',
  ],
  'scrap-rework-cost': [
    'Precision Machining Rework: The Three Costs Most Programs Only Track One Of',
    'Why Your Scrap Rate Is 3–5x Higher Than It Should Be',
    'The $84,000 Rework Problem Built Into Your Precision Machining Quote',
  ],
  'material-waste': [
    'The Material Waste Hidden in Every Precision Machining Quote',
    'CAM Programming Discipline: The Difference Between 5% and 25% Stock Waste',
    'Why Two Identical Precision Parts Can Have Very Different True Material Costs',
  ],
  'process-downtime': [
    'Unplanned CNC Downtime: $3,500/Hour and Counting',
    'Why High-Utilization CNC Shops Fail at the Worst Possible Moment',
    'The $240,000/Year Throughput Loss Nobody Reports as Machine Downtime',
  ],
  'cost-leakage': [
    'How Precision Machining Programs Lose 22% of Budget to Cost Leakage',
    'Untracked Setup Time: The $88,000/Year Labor Cost Hidden in Your Overhead',
    'Job-Level Cost Tracking in Precision Machining: What It Catches and Why It Matters',
  ],
  'precision-inconsistency': [
    'Part-to-Part Variation in CNC Machining: Where It Comes From and What It Costs',
    'Why the Same Machine Produces Different Results Across Operator Shifts',
    '3–6x More Dimensional Variance Without Standardized Work Instructions',
  ],
  'scaling-operations': [
    'Why Scaling a Precision Machining Program Scales the Defects Too',
    'The Prototype-to-Production Gap That Causes Six-Figure Ramp Cost',
    '65–80% of CNC Scale-Ups Hit Bottlenecks Within 90 Days — Here\'s Why',
  ],
  'tool-wear-inefficiency': [
    'The Batch That Failed Tolerance Because Nobody Scheduled a Tool Change',
    'Tool Wear and Dimensional Drift: The Silent Precision Failure',
    'Why Unmanaged Tool Life Costs More Than the Tool',
  ],
}

const THUMBNAIL_TEXTS: Record<string, string[]> = {
  'machining-bottlenecks': ['BOTTLENECK BEFORE FIRST CUT', 'YOUR CNC QUEUE IS BROKEN', 'WHY THROUGHPUT STALLS'],
  'tight-tolerance-failures': ['TOLERANCE FAILED AT FINAL INSPECTION', 'WHY PARTS FAIL', '4–12X REMEDIATION COST'],
  'production-delays': ['72% OF DELAYS START HERE', '$6,000/DAY IDLE COST', 'CNC DELAY = REAL MONEY'],
  'scrap-rework-cost': ['REWORK COSTS MORE THAN YOU TRACK', 'THREE COSTS OF REWORK', '14% OF YOUR PROGRAM BUDGET'],
  'material-waste': ['25% WASTE IN YOUR QUOTE', 'CAM WASTE VS. OPTIMIZED', 'YOU\'RE PAYING FOR SCRAP ALREADY'],
  'process-downtime': ['$3,500/HOUR DOWNTIME COST', 'CNC DOWN = CASCADE STOP', '65% MORE DOWNTIME WITHOUT THIS'],
  'cost-leakage': ['22% LEAKING FROM PROGRAM COST', 'SETUP TIME NOBODY TRACKED', 'WHERE MARGIN DISAPPEARS'],
  'precision-inconsistency': ['SAME MACHINE, DIFFERENT RESULTS', '3–6X MORE VARIANCE', 'SHIFT-TO-SHIFT REJECTION RATE'],
  'scaling-operations': ['SCALING SCALES THE DEFECTS', '90 DAYS TO BOTTLENECK', '40–70% MORE ESCAPES AT RAMP'],
  'tool-wear-inefficiency': ['0.008" DRIFT = SCRAP BATCH', 'THE TOOL CHANGE NOBODY SCHEDULED', '20–40% MORE BREAKAGE EVENTS'],
}

const THREE_SECOND_HOOKS: Record<string, string[]> = {
  'machining-bottlenecks': [
    'Your CNC program has a bottleneck — and it was created before anyone turned on a machine.',
    'If your throughput is inconsistent, the constraint is not at the spindle. It\'s upstream.',
    'One sequencing decision made before job release can delay your entire downstream program by five weeks.',
  ],
  'tight-tolerance-failures': [
    'If you\'re catching tolerance failures at final inspection, you\'re paying 4–12x more per defect than you should be.',
    'One out of five precision assemblies fails fit because of a single machined part. That failure was preventable.',
    'Your rejection rate is not a machining problem. It\'s an inspection placement problem.',
  ],
  'production-delays': [
    'The machining delay on your program didn\'t start at the machine. It started in setup planning three weeks ago.',
    '72% of precision manufacturing overruns originate in the machining phase — not in assembly or finishing.',
    'Every day your CNC program runs late costs $1,500 to $6,000 in downstream idle capacity.',
  ],
  'scrap-rework-cost': [
    'Your precision machining program has a rework rate. Most of it is preventable. Almost none of it is tracked correctly.',
    '6 to 14 percent of total production cost consumed by rework is not a quality stat — it\'s a financial problem.',
    'Shops without in-process gauging generate 3 to 5 times the scrap rate. The tool is the same. The process is not.',
  ],
  'material-waste': [
    'There\'s material waste in the precision machining quote you\'re reviewing. You just can\'t see it as a line item.',
    '10 to 25 percent of your titanium billet is getting machined down and discarded. That\'s in the quote as "material cost."',
    'Two shops quote the same precision part. The difference is usually toolpath efficiency — not alloy price.',
  ],
  'process-downtime': [
    'When a CNC machining center goes down, it doesn\'t just stop one job. It stops every job behind it in the queue.',
    '$3,500 per hour in throughput loss. That\'s what unplanned CNC downtime costs before downstream delays are counted.',
    'Facilities without preventive maintenance absorb 45 to 65 percent more unplanned downtime. That cost is in your lead times.',
  ],
  'cost-leakage': [
    'Your precision machining program is leaking 12 to 22 percent of its total cost through gaps nobody is tracking.',
    'Setup time that isn\'t coded to a job. Tooling that doesn\'t hit the work order. These are where margin disappears.',
    'Operations without real-time job cost visibility run 2.5 to 4 times more budget overruns. The tracking gap is the cause.',
  ],
  'precision-inconsistency': [
    'The same machine produces different dimensional results depending on who\'s running it and which shift it\'s on.',
    'Shops without standardized work instructions have 3 to 6 times more dimensional variance. Same equipment. Different process.',
    'Precision inconsistency doesn\'t come from the machine. It comes from the process — and it compounds with every shift.',
  ],
  'scaling-operations': [
    'Scaling a precision machining program without fixing upstream constraints doesn\'t multiply output — it multiplies defects.',
    '40 to 70 percent more quality escapes during production ramp-up. The prototype ran clean. The process wasn\'t validated for volume.',
    '65 to 80 percent of CNC scale-ups hit throughput bottlenecks within 90 days. Most were visible before the ramp started.',
  ],
  'tool-wear-inefficiency': [
    'Tool wear doesn\'t show up on the floor until the part fails tolerance. By then, the batch may already be non-conforming.',
    '0.002 to 0.008 inches of dimensional drift per tool interval. In a tight-tolerance program, that\'s a silent rejection event.',
    'Your tool change intervals are probably based on catalog estimates. Your parts are rejecting based on actual wear data.',
  ],
}

const OPENING_LINES: Record<string, string> = {
  'machining-bottlenecks': "Most CNC shops look for bottlenecks at the machine that's running slowest. That's not where the constraint lives — and finding the real one requires looking upstream into how the job was planned and sequenced before production started.",
  'tight-tolerance-failures': "Tolerance failures in precision machining are almost never random events. They are process outcomes — built into the operation at setup, allowed to propagate without in-process measurement, and discovered at the worst possible moment.",
  'production-delays': "Precision manufacturing schedules are made or lost in the machining phase. Not in finishing. Not in assembly. The timeline decisions that determine whether a program ships on time are made — or missed — before the first operation begins.",
  'scrap-rework-cost': "Scrap and rework in precision machining carry three separate costs: the material, the direct labor, and the schedule impact on every part waiting behind the rework event. Most programs track the first one and undercount the other two.",
  'material-waste': "There is material waste built into most precision machining quotes. It's not a line item. It's priced into the stock cost by the shop that already knows their utilization rate — and passed to the customer as a standard material charge.",
  'process-downtime': "Unplanned CNC downtime does not stop one machine. It stops the production queue — and every job waiting in sequence shifts on the delivery schedule. The financial exposure begins at the machine and multiplies downstream.",
  'cost-leakage': "Precision machining programs lose margin in three primary places that most job costing systems don't capture: setup time that isn't coded to the work order, tooling attrition that hits overhead instead of the job, and rework hours that disappear into the department variance.",
  'precision-inconsistency': "Part-to-part dimensional variation in precision CNC machining is not a machine problem. It is a process standardization problem — and it compounds with every operator shift, every new setup, and every program that runs without documented control points.",
  'scaling-operations': "The transition from prototype to production volume in precision machining is where most quality and cost problems are created. Not because the parts change — but because the process assumptions that worked at one unit don't scale to one hundred.",
  'tool-wear-inefficiency': "Tool wear in precision machining operates silently until it produces a defect. The part looks correct through most of the tool's life. Then dimensional drift accumulates past the tolerance band — and the failure is discovered at inspection, not at the machine.",
}

function buildScript(problem: string, format: 'shorts' | '60-90s' | 'long-form', v: number): string {
  const pd = PROBLEM_DATA[problem] ?? PROBLEM_DATA['machining-bottlenecks']
  const label = PROBLEM_LABELS[problem] ?? 'Machining Bottlenecks'

  if (format === 'shorts') {
    const scripts = [
      `[On screen: live CNC footage or CMM measurement]\n\nHere's the problem with ${label.toLowerCase()} that most precision shops don't talk about.\n\n${pd.stat1}.\n\nThat's not a quality issue. That's a financial issue.\n\n${pd.cost1}.\n\nIf your program doesn't have a process for this — you're absorbing it every run.\n\n[CTA on screen] Follow for more precision machining insights.`,
      `[On screen: tolerance callout on engineering drawing]\n\n${pd.consequence}\n\nAnd the financial exposure is real:\n\n${pd.cost2}.\n\nMost teams don't catch it until the job closes.\n\n[CTA] Drop your program type below — I'll show you where this typically concentrates.`,
      `[On screen: machined part in quality lab]\n\nFact: ${pd.stat2}.\n\nMost precision machining programs accept this as a cost of doing business.\n\nIt's not. It's a process gap — and it's fixable.\n\n[CTA on screen] Follow for weekly precision manufacturing insights.`,
    ]
    return scripts[v % scripts.length]
  }

  if (format === '60-90s') {
    return `[HOOK — first 3 seconds]\n${THREE_SECOND_HOOKS[problem]?.[v] ?? THREE_SECOND_HOOKS['machining-bottlenecks'][0]}\n\n[SETUP — 10 seconds]\n${OPENING_LINES[problem] ?? OPENING_LINES['machining-bottlenecks']}\n\n[PROBLEM — 20 seconds]\n${pd.stat1}.\n\n${pd.stat2}.\n\n[FINANCIAL CONSEQUENCE — 20 seconds]\nThe financial exposure here is real. ${pd.cost1}. ${pd.cost2}.\n\n${pd.consequence}\n\n[RESOLUTION BRIDGE — 10 seconds]\nThe shops that avoid this problem share one common trait: they address the upstream process — before production begins, not after the rejection report comes back.\n\n[CTA — 5 seconds]\nIf you want to understand where this applies to your precision program — link in bio. Let's map it.`
  }

  // long-form
  return `[INTRO — 0:00–0:45]\n${OPENING_LINES[problem] ?? OPENING_LINES['machining-bottlenecks']}\n\nToday we're covering ${label} in detail — what causes it, what it costs, and how high-performance precision shops prevent it.\n\n[SEGMENT 1: THE PROBLEM — 0:45–3:00]\nLet's start with the data.\n\n${pd.stat1}.\n\n${pd.stat2}.\n\n${pd.stat3}.\n\nThese are not outlier scenarios. They're consistent patterns across precision machining environments — aerospace, medical, defense, industrial.\n\n[SEGMENT 2: THE FINANCIAL EXPOSURE — 3:00–5:30]\nHere's what this actually costs.\n\n${pd.cost1}.\n\n${pd.cost2}.\n\n${pd.consequence}\n\nThe number that appears on the budget report is rarely the full exposure. The direct cost is the visible part. The downstream impact — schedule, rework, downstream idle capacity, customer relationships — is almost always larger.\n\n[SEGMENT 3: WHERE IT COMES FROM — 5:30–8:00]\nThe root cause of ${label.toLowerCase()} in most precision programs is not the machine, the operator, or the material.\n\nIt's the upstream process — the planning, the documentation, the measurement protocol, and the sequencing decisions that were made before production started.\n\nWe'll walk through each contributing factor and what the high-performance alternatives look like.\n\n[SEGMENT 4: WHAT TO DO ABOUT IT — 8:00–10:30]\nHere's how precision shops that consistently hit schedule, quality, and cost targets approach this problem.\n\nFirst: they map the constraint before the job drops — not after the delay is confirmed.\n\nSecond: they position measurement and verification at the in-process stage — not only at final inspection.\n\nThird: they track cost at the job level — so the variance is visible in real time, not in a post-mortem.\n\n[CLOSE — 10:30–11:00]\nIf any of this sounds familiar in your precision machining environment — the comments are open. Tell me your program type and I'll outline where this exposure typically concentrates for your application.\n\nAnd if you found this useful — subscribe. We cover precision manufacturing cost and process topics every week.`
}

const RETENTION_BEATS: Record<string, string[]> = {
  'machining-bottlenecks': [
    '0:00 — Hook: the bottleneck was created before the first cut',
    '0:45 — Where throughput constraints actually originate in CNC programs',
    '2:30 — The stat that reframes bottlenecks as planning problems, not machine problems',
    '4:00 — Financial exposure: downstream idle cost per day of delay',
    '6:30 — What high-performance shops do differently in job sequencing',
    '9:00 — The one upstream question that predicts whether a program will bottleneck',
  ],
  'tight-tolerance-failures': [
    '0:00 — Hook: 1 in 5 assemblies fails fit from one machined part',
    '0:40 — Why end-of-line inspection is the most expensive quality strategy',
    '2:15 — The 4–12x cost multiplier at final inspection versus in-process',
    '4:30 — What in-process gauging actually looks like at a first-article checkpoint',
    '7:00 — The callout format that causes the most tolerance interpretation failures',
    '9:30 — How to set an in-process inspection frequency that eliminates most rework',
  ],
  'production-delays': [
    '0:00 — Hook: 72% of overruns start in the machining phase',
    '0:50 — The upstream planning gaps that cause most CNC delays',
    '2:45 — $1,500–$6,000/day downstream idle cost explained',
    '4:00 — How a 3-week machining delay becomes a $189,000 program event',
    '6:30 — What precision shops do in the pre-production window to eliminate delay risk',
    '9:15 — Schedule buffer methodology for high-complexity precision programs',
  ],
  'scrap-rework-cost': [
    '0:00 — Hook: rework costs three things and most programs track one',
    '0:45 — The 6–14% rework rate explained as a process discipline problem',
    '2:30 — In-process gauging vs. end-of-line: the scrap rate differential',
    '4:15 — Real cost of a single rework event on an aerospace component',
    '6:45 — The first-article inspection format that eliminates most rework risk',
    '9:00 — How to track rework as a financial metric on closed jobs',
  ],
  'material-waste': [
    '0:00 — Hook: the waste is already in the quote',
    '0:40 — How toolpath optimization changes stock utilization by 2–4x',
    '2:20 — The alloy-specific cost of unoptimized CAM programming',
    '4:00 — What a structured material utilization review looks like before job release',
    '6:30 — How to compare vendor waste rates as part of a sourcing evaluation',
    '9:00 — The programming discipline checklist for high-alloy precision programs',
  ],
  'process-downtime': [
    '0:00 — Hook: $3,500/hour and the queue stops',
    '0:45 — Why high-utilization shops fail at the worst moment',
    '2:30 — The 45–65% downtime differential explained',
    '4:00 — What a preventive maintenance protocol actually includes for CNC machining centers',
    '6:45 — The utilization threshold where failure risk accelerates',
    '9:15 — How to calculate the ROI of a maintenance program against unplanned downtime cost',
  ],
  'cost-leakage': [
    '0:00 — Hook: 22% of program cost is leaking and nobody labeled it',
    '0:45 — The three primary leakage points in high-mix precision machining',
    '2:30 — How untracked setup time becomes an $88,000/year labor cost',
    '4:15 — What job-level cost tracking looks like versus departmental overhead buckets',
    '7:00 — How to run a cost leakage audit on a closed precision job',
    '9:30 — The tracking frequency that catches leakage in real time, not at job close',
  ],
  'precision-inconsistency': [
    '0:00 — Hook: same machine, different results on different shifts',
    '0:45 — Why precision inconsistency is a process problem, not an operator problem',
    '2:30 — The 3–6x variance differential explained',
    '4:00 — What a standardized work instruction for CNC machining actually includes',
    '6:30 — The in-process measurement frequency that controls shift-to-shift variation',
    '9:00 — How to build a process control plan that transfers across operators',
  ],
  'scaling-operations': [
    '0:00 — Hook: scaling the program scales the defects',
    '0:50 — Why prototype-to-production transitions fail in precision machining',
    '2:30 — The 40–70% escape rate increase explained',
    '4:15 — What a scale-up readiness review covers before volume ramp',
    '7:00 — The 90-day bottleneck pattern and how to map it before it appears',
    '9:30 — Documentation deliverables that transfer prototype knowledge to production control',
  ],
  'tool-wear-inefficiency': [
    '0:00 — Hook: the batch failed tolerance because nobody scheduled a tool change',
    '0:45 — How dimensional drift operates silently in precision machining',
    '2:30 — The 0.002–0.008 inch drift range explained in tolerance context',
    '4:00 — What structured tool life management looks like versus catalog-based intervals',
    '6:30 — Spindle load trending as a wear detection method',
    '9:00 — How to build a data-driven change interval for tight-tolerance programs',
  ],
}

const BUSINESS_INSIGHTS: Record<string, string> = {
  'machining-bottlenecks': `${PROBLEM_DATA['machining-bottlenecks'].stat1}. The cascade is immediate: when one operation stalls, every dependent step waits. ${PROBLEM_DATA['machining-bottlenecks'].cost2} — and that exposure grows daily until the constraint clears.`,
  'tight-tolerance-failures': `${PROBLEM_DATA['tight-tolerance-failures'].stat2}. The cost multiplier at final inspection is not theoretical. On a complex aerospace or medical component at $800 average part cost, a 4–12x correction premium translates to $3,200–$9,600 per event — before the schedule impact is calculated.`,
  'production-delays': `${PROBLEM_DATA['production-delays'].stat3}. ${PROBLEM_DATA['production-delays'].cost2}. With three downstream idle operations at $3,000/day each, a three-week machining delay generates $189,000 in downstream exposure before a single overtime hour is authorized.`,
  'scrap-rework-cost': `${PROBLEM_DATA['scrap-rework-cost'].stat1}. ${PROBLEM_DATA['scrap-rework-cost'].cost1}. On a $600,000 precision program, that's $36,000–$84,000 in rework cost that was not in the estimate — and it excludes the downstream schedule impact, which is routinely the larger number.`,
  'material-waste': `${PROBLEM_DATA['material-waste'].stat1}. ${PROBLEM_DATA['material-waste'].cost2}. On a 2,000-pound titanium program at 18% waste, that's 360 pounds of material — $16,200 at $45/lb — purchased, partially machined, and discarded. The cost was in the quote as "material." Nobody labeled it as waste.`,
  'process-downtime': `${PROBLEM_DATA['process-downtime'].stat1}. ${PROBLEM_DATA['process-downtime'].cost2}. A shop averaging 10 unplanned downtime hours per month at $2,000/hour absorbs $240,000/year in production capacity that did not exist — and every delivery commitment in that year was made against a schedule that didn't account for it.`,
  'cost-leakage': `${PROBLEM_DATA['cost-leakage'].stat1}. ${PROBLEM_DATA['cost-leakage'].cost2}. On a $500,000 precision program with 15% cost leakage, $75,000 in cost was incurred and untraceable at job close. On a recurring contract, that number compounds with every production run until the program is unviable.`,
  'precision-inconsistency': `${PROBLEM_DATA['precision-inconsistency'].stat1}. ${PROBLEM_DATA['precision-inconsistency'].cost2}. In a 1,000-part production run with a 35% rejection rate increase from operator variation, 350 additional parts require rework, re-inspection, or scrap. At $400 average part cost, the direct exposure approaches six figures — before downstream assembly delays are factored in.`,
  'scaling-operations': `${PROBLEM_DATA['scaling-operations'].stat1}. ${PROBLEM_DATA['scaling-operations'].cost1}. A 500-part ramp with 50% more quality escapes than the prototype rate generates 250 additional non-conformances at production cost levels. At $600 per escaping part for rework and reinspection, that's $150,000 in unplanned scale-up cost not in the production launch budget.`,
  'tool-wear-inefficiency': `${PROBLEM_DATA['tool-wear-inefficiency'].stat2}. ${PROBLEM_DATA['tool-wear-inefficiency'].cost2}. In a 20-machine precision shop with 30% excess breakage events, averaging 3 unplanned diagnostic hours per event at $2,000/hour throughput rate, annual unplanned downtime cost from tool management gaps alone exceeds $180,000.`,
}

const YOUTUBE_CTAS: Record<string, string> = {
  shorts: "Follow this channel for weekly precision machining cost and process insights.",
  '60-90s': "If this applies to your program — link in bio. We map precision machining cost exposure for operations teams.",
  'long-form': "Subscribe for weekly coverage of precision manufacturing efficiency, cost control, and process improvement. If you want to discuss your specific program — link in the description.",
}

const REPURPOSING: string[] = [
  'Pull the 3-second hook and opening line into a LinkedIn post — precision manufacturing professionals engage well with short-form operational insights tied to financial data.',
  'Break the retention beats into a Twitter/X thread — each beat is a standalone hook that drives replies from manufacturing engineers.',
  'Extract the business insight section as an Instagram carousel slide sequence — each stat becomes one slide with on-screen text optimized for vertical format.',
  'Use the video title as a cold email subject line for operations directors at aerospace and medical device manufacturers.',
  'Convert the long-form outline into a downloadable PDF guide: "The [Problem] Playbook for Precision Machining Operations Teams."',
]

const IMPROVEMENT_SUGGESTIONS: Record<string, string[]> = {
  'machining-bottlenecks': [
    'Add a real machining sequence diagram — turning → milling → grinding → inspection — with the constraint point labeled to make the cascade visual.',
    'Include a case study reference where a single setup constraint created a five-week downstream delay to anchor the stat in a recognizable scenario.',
    'Show what a constraint map looks like for a high-mix precision program so viewers understand what "mapping upstream" actually involves.',
  ],
  'tight-tolerance-failures': [
    'Add a specific tolerance callout example — a ±0.001 bore diameter on a turned component — to make the in-process measurement requirement concrete.',
    'Show the cost comparison between a first-article CMM measurement event ($200–$400) and a final-inspection rework event ($2,000–$15,000) to close the ROI argument visually.',
    'Include the inspection frequency formula for a production run — first article plus every 25th part, for example — so viewers have a practical protocol to reference.',
  ],
  'production-delays': [
    'Add the upstream planning checklist: resolved drawing questions, staged material, validated setup sequence, confirmed programming — the four items that prevent most delays.',
    'Show the schedule impact calculation for a three-week delay with three downstream operations to make the $189,000 figure visual and traceable.',
    'Include a timeline visual comparing a program with proactive upstream planning versus one that skips it, showing where the delay is created versus where it is discovered.',
  ],
  'scrap-rework-cost': [
    'Add a cost-per-event walkthrough for a specific rework scenario — off-tolerance bore requiring remachining, re-inspection, and recertification — to make the 14-hour figure tangible.',
    'Show the scrap rate comparison between a shop with in-process gauging and one without, using the same part family and alloy.',
    'Include the in-process measurement checkpoint that eliminates most rework — first-article verification before committing to full-run tooling offsets.',
  ],
  'material-waste': [
    'Show a before-and-after toolpath comparison — unoptimized versus structured CAM — with the stock utilization percentage for each to make the 2–4x gap visual.',
    'Add the alloy cost table — titanium, Inconel, 17-4 stainless — with waste cost per pound to let viewers calculate exposure for their specific material mix.',
    'Include the vendor evaluation question: "What is your stock-to-finished-part utilization ratio on comparable programs?" Explain what a good answer looks like versus a red flag.',
  ],
  'process-downtime': [
    'Show the preventive maintenance schedule for a CNC machining center — the specific checkpoints, intervals, and estimated time — so viewers understand what "PM program" actually means.',
    'Add the utilization-vs-failure-rate chart showing how unplanned downtime accelerates above 75% utilization without maintenance.',
    'Include the ROI calculation: annual PM program cost versus annual unplanned downtime cost at $2,000/hour, 10 hours/month — to close the investment argument.',
  ],
  'cost-leakage': [
    'Show the three leakage points on a job cost waterfall chart — setup time, tooling attrition, rework overhead — so viewers can map it to their own tracking system.',
    'Add the time-capture process that eliminates most untracked setup labor — a stamped operator log tied to the work order, reviewed at job close.',
    'Include the closed-job variance review format that identifies leakage after the fact — and the questions it should answer.',
  ],
  'precision-inconsistency': [
    'Show a part-to-part measurement chart across operator shifts — with and without standardized work instructions — to visualize the 3–6x variance claim.',
    'Add the standardized work instruction template elements: fixture reference points, tool offset baselines, in-process measurement checkpoints, operator sign-off criteria.',
    'Include the shift handoff protocol that controls most operator-to-operator variation — the three things that must be verified and documented at every setup transfer.',
  ],
  'scaling-operations': [
    'Show a scale-up readiness checklist — fixturing validation, tool life data, cycle time confirmation, operator certification — so viewers have a protocol to apply.',
    'Add the bottleneck identification walkthrough for a 90-day ramp: the three upstream constraints that appear most often and how to map them before volume starts.',
    'Include the documentation transfer list from prototype to production: setup sheets, first-article reports, tool offset baselines, control plans.',
  ],
  'tool-wear-inefficiency': [
    'Show the dimensional drift chart — part size versus tool age in cycles — to make the 0.002–0.008 inch drift range visual for viewers managing tight-tolerance programs.',
    'Add the spindle load trending chart and explain how load increase correlates with wear so viewers can implement this monitoring method.',
    'Include the data-driven change interval calculation: baseline part size at new tool, acceptable tolerance band, drift rate per cycle — resulting in a defined change point.',
  ],
}

export function generateYouTube(inputs: YouTubeInputs, seed: number = 0): YouTubeOutput {
  const v = seed % 3
  const p = inputs.problem
  const fmt = inputs.videoFormat

  const titles = VIDEO_TITLES[p] ?? VIDEO_TITLES['machining-bottlenecks']
  const thumbs = THUMBNAIL_TEXTS[p] ?? THUMBNAIL_TEXTS['machining-bottlenecks']
  const hooks = THREE_SECOND_HOOKS[p] ?? THREE_SECOND_HOOKS['machining-bottlenecks']
  const beats = RETENTION_BEATS[p] ?? RETENTION_BEATS['machining-bottlenecks']
  const improvements = IMPROVEMENT_SUGGESTIONS[p] ?? IMPROVEMENT_SUGGESTIONS['machining-bottlenecks']

  const title = titles[v] ?? titles[0]
  const thumbnailText = thumbs[v] ?? thumbs[0]
  const threeSecondHook = hooks[v] ?? hooks[0]
  const openingLine = OPENING_LINES[p] ?? OPENING_LINES['machining-bottlenecks']
  const scriptOrOutline = buildScript(p, fmt, v)
  const businessInsight = BUSINESS_INSIGHTS[p] ?? BUSINESS_INSIGHTS['machining-bottlenecks']
  const cta = YOUTUBE_CTAS[fmt] ?? YOUTUBE_CTAS['long-form']

  const qualityScore = scoreContent(inputs, true, true, true, scriptOrOutline.split(' ').length)

  return {
    platform: 'youtube',
    title,
    thumbnailText,
    threeSecondHook,
    openingLine,
    scriptOrOutline,
    retentionBeats: beats,
    businessInsight,
    cta,
    repurposingSuggestions: REPURPOSING.slice(0, 3),
    qualityScore,
    improvementSuggestions: improvements.slice(0, 3),
  }
}
