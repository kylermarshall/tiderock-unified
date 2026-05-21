import type { InstagramInputs, InstagramOutput } from '../types'
import { PROBLEM_DATA, PROBLEM_LABELS } from '../lib/companyProfile'
import { scoreContent } from '../lib/scoring'

const VISUAL_HOOKS: Record<string, string[]> = {
  'machining-bottlenecks': [
    'Close-up of a CNC machining queue board with multiple jobs in red status',
    'Time-lapse of a precision part moving through a multi-operation machining sequence',
    'Wide shot of idle machining centers with a single bottlenecked operation running',
  ],
  'tight-tolerance-failures': [
    'Macro shot of a CMM probe measuring a precision bore on a turned component',
    'Split screen: in-process gauging vs. final inspection rejection table',
    'Engineer reviewing a tolerance callout on an engineering drawing under magnification',
  ],
  'production-delays': [
    'Calendar with missed delivery dates marked in red alongside a CNC operation still running',
    'Empty assembly station with a "waiting for parts" status indicator',
    'Side-by-side: planned schedule vs. actual — the gap highlighted in the machining phase',
  ],
  'scrap-rework-cost': [
    'Bin of scrapped precision components alongside a cost tally board',
    'Operator performing rework on a machined component at a manual bench',
    'Quality lab — rejected parts lined up for disposition decision',
  ],
  'material-waste': [
    'Machined titanium chips and offcuts on the floor beside a turned component',
    'Stock-to-part comparison — large billet next to the finished precision part',
    'CAM screen showing toolpath optimization with and without stock nesting',
  ],
  'process-downtime': [
    'CNC machining center with maintenance lights on and "DOWN" status indicator',
    'Maintenance technician servicing a spindle on a precision machining center',
    'Empty production floor with idle machines and a production schedule on the wall',
  ],
  'cost-leakage': [
    'Job cost report with a wide variance column highlighted in red',
    'Operator logging time on paper versus time stamped to a work order in an ERP system',
    'Closed precision machining job folder with actual cost significantly above estimate',
  ],
  'precision-inconsistency': [
    'CMM report showing dimensional variation across 10 parts from the same program',
    'Side-by-side of two identical precision components with dimensional callouts showing different measurements',
    'Operator at machine with no work instruction visible versus operator with laminated setup sheet',
  ],
  'scaling-operations': [
    'Single prototype part next to a production bin of 500 — and a quality escape report',
    'Ramp-up production floor with a bottleneck station surrounded by waiting parts',
    'Comparison chart: prototype quality metrics vs. first 90 days of production',
  ],
  'tool-wear-inefficiency': [
    'New carbide insert versus worn insert at the same magnification — visible wear land on the cutting edge',
    'CMM report showing dimensional drift across 100 parts from the same tool without a change',
    'Broken end mill on the shop floor next to an in-process precision component',
  ],
}

const ON_SCREEN_TEXTS: Record<string, string[]> = {
  'machining-bottlenecks': [
    'Your CNC program bottlenecked before the first cut.',
    'The constraint isn\'t at the machine. It\'s upstream.',
    '1 bottleneck. 5 downstream operations waiting.',
  ],
  'tight-tolerance-failures': [
    'Tolerance failure at final inspection costs 12x more.',
    '1 in 5 assemblies fails because of 1 machined part.',
    'Your inspection is positioned at the wrong point.',
  ],
  'production-delays': [
    '72% of precision delays start in the machining phase.',
    '$6,000/day in idle downstream capacity.',
    'The schedule was lost before assembly started.',
  ],
  'scrap-rework-cost': [
    'Rework has 3 costs. Most programs track 1.',
    '14% of your production budget goes to scrap.',
    'In-process gauging vs. final inspection: 5x scrap rate difference.',
  ],
  'material-waste': [
    '25% of your titanium is waste. It\'s in the quote.',
    'Two quotes. Same alloy. Different waste rate.',
    '$75K in preventable stock waste on one program.',
  ],
  'process-downtime': [
    '$3,500/hour when the CNC goes down.',
    '65% more downtime without a maintenance program.',
    'High utilization without maintenance = scheduled failure.',
  ],
  'cost-leakage': [
    '22% of your program cost is leaking.',
    'Setup time no one coded to the job.',
    '$88K/year in untracked labor. Named as overhead.',
  ],
  'precision-inconsistency': [
    'Same machine. Different shift. Different tolerances.',
    '3–6x more variance without standardized work instructions.',
    'It\'s not the operator. It\'s the process.',
  ],
  'scaling-operations': [
    'Scaling scales the defects too.',
    '40–70% more quality escapes at production volume.',
    'Prototype success ≠ production readiness.',
  ],
  'tool-wear-inefficiency': [
    '0.008" drift. Batch failed. Nobody scheduled the change.',
    '40% more breakage without tool life management.',
    'Catalog estimate ≠ drift control.',
  ],
}

function buildReelScript(problem: string, v: number): string {
  const pd = PROBLEM_DATA[problem] ?? PROBLEM_DATA['machining-bottlenecks']
  const label = PROBLEM_LABELS[problem] ?? 'Machining Bottlenecks'

  const scripts = [
    `[SCENE 1 — 0:00–0:03]\n[On screen: ${VISUAL_HOOKS[problem]?.[0] ?? 'CNC machining operation'}]\nText overlay: "${ON_SCREEN_TEXTS[problem]?.[0] ?? 'Your process has a hidden problem'}"\n\n[SCENE 2 — 0:03–0:10]\nVO or text: "${pd.stat1}."\n\n[SCENE 3 — 0:10–0:20]\nVO or text: "The financial consequence?\n${pd.cost1}."\n\n[SCENE 4 — 0:20–0:28]\nVO or text: "${pd.consequence}"\n\n[SCENE 5 — 0:28–0:30]\nText overlay: "Precision Advanced Manufacturing\nPrecision machining insights — follow for more."`,

    `[SCENE 1 — 0:00–0:03]\n[On screen: ${VISUAL_HOOKS[problem]?.[1] ?? 'Quality inspection'}]\nText overlay: "${ON_SCREEN_TEXTS[problem]?.[1] ?? 'The problem is upstream'}"\n\n[SCENE 2 — 0:03–0:12]\nVO or text: "Here's the real stat on ${label.toLowerCase()}:\n${pd.stat2}."\n\n[SCENE 3 — 0:12–0:22]\nVO or text: "And the cost that doesn't show up in the report:\n${pd.cost2}."\n\n[SCENE 4 — 0:22–0:28]\nVO or text: "This is a process problem — and it's fixable."\n\n[SCENE 5 — 0:28–0:30]\nText overlay: "Follow for precision machining cost and process insights."`,

    `[SCENE 1 — 0:00–0:03]\n[On screen: ${VISUAL_HOOKS[problem]?.[2] ?? 'Production floor'}]\nText overlay: "${ON_SCREEN_TEXTS[problem]?.[2] ?? 'This is costing more than you know'}"\n\n[SCENE 2 — 0:03–0:12]\nVO or text: "${pd.stat3}."\n\n[SCENE 3 — 0:12–0:22]\nVO or text: "The upstream cause:\n${pd.consequence}"\n\n[SCENE 4 — 0:22–0:28]\nVO or text: "Precision Advanced Manufacturing addresses ${label.toLowerCase()} at the process level — before the cost compounds."\n\n[SCENE 5 — 0:28–0:30]\nText overlay: "Link in bio to learn more."`,
  ]

  return scripts[v % scripts.length]
}

function buildCarouselSlides(problem: string, v: number): string[] {
  const pd = PROBLEM_DATA[problem] ?? PROBLEM_DATA['machining-bottlenecks']
  const label = PROBLEM_LABELS[problem] ?? 'Machining Bottlenecks'

  const decks = [
    [
      `Slide 1: "${ON_SCREEN_TEXTS[problem]?.[0] ?? 'Your machining process has a hidden cost'}"`,
      `Slide 2: "Not because of machine speed."`,
      `Slide 3: "Because of ${label.toLowerCase()}."`,
      `Slide 4: "${pd.stat1}."`,
      `Slide 5: "The financial consequence: ${pd.cost1}."`,
      `Slide 6: "${pd.consequence}"`,
      `Slide 7: "This is a process problem — and it's fixable at the source."`,
      `Slide 8: "Precision Advanced Manufacturing | Link in bio"`,
    ],
    [
      `Slide 1: "The real cost of ${label.toLowerCase()} in precision machining:"`,
      `Slide 2: "${pd.stat1}."`,
      `Slide 3: "${pd.stat2}."`,
      `Slide 4: "${pd.stat3}."`,
      `Slide 5: "Total exposure: ${pd.cost1}. ${pd.cost2}."`,
      `Slide 6: "${pd.consequence}"`,
      `Slide 7: "High-performance precision shops address this upstream — before the cost accumulates."`,
      `Slide 8: "Follow for weekly precision machining cost insights."`,
    ],
    [
      `Slide 1: "3 things most precision programs get wrong about ${label.toLowerCase()}:"`,
      `Slide 2: "1. They detect it too late. ${pd.stat2}."`,
      `Slide 3: "2. They undercount the cost. ${pd.cost1}."`,
      `Slide 4: "3. They treat it as a quality issue — not a financial one. ${pd.cost2}."`,
      `Slide 5: "${pd.consequence}"`,
      `Slide 6: "The upstream fix costs a fraction of what the downstream consequence does."`,
      `Slide 7: "Precision Advanced Manufacturing | Precision machining without the downstream failures."`,
      `Slide 8: "Link in bio — or comment with your program type for a specific breakdown."`,
    ],
  ]

  return decks[v % decks.length]
}

function buildStorySequence(problem: string, v: number): string[] {
  const pd = PROBLEM_DATA[problem] ?? PROBLEM_DATA['machining-bottlenecks']
  const label = PROBLEM_LABELS[problem] ?? 'Machining Bottlenecks'

  const sequences = [
    [
      `Story 1: [Poll] "Do you track ${label.toLowerCase()} cost separately from production overhead?" Yes / No`,
      `Story 2: [Stat] "${pd.stat1}." — Tap for the cost breakdown →`,
      `Story 3: [Cost] "${pd.cost1}. ${pd.cost2}."`,
      `Story 4: [Consequence] "${pd.consequence}"`,
      `Story 5: [CTA] "Swipe up (or link in bio) to see how Precision Advanced Manufacturing addresses this at the process level."`,
    ],
    [
      `Story 1: [Question] "What's the #1 hidden cost in your precision machining program?" ${label} / Scrap-Rework / Downtime / Cost Leakage`,
      `Story 2: [Reveal] "Most programs undercount ${label.toLowerCase()}." "${pd.stat2}."`,
      `Story 3: [Financial] "The real cost: ${pd.cost2}."`,
      `Story 4: [Insight] "${pd.consequence}"`,
      `Story 5: [Follow-up] "Want the full breakdown for your program type? Comment below or tap the link."`,
    ],
    [
      `Story 1: [Hook] "${ON_SCREEN_TEXTS[problem]?.[v % 3] ?? 'Your process has a hidden problem'}"`,
      `Story 2: [Data] "${pd.stat3}."`,
      `Story 3: [Cost] "Financial exposure: ${pd.cost1}."`,
      `Story 4: [Root cause] "The upstream process is where this starts. ${pd.consequence}"`,
      `Story 5: [CTA] "Precision Advanced Manufacturing | Tap for program-specific insights."`,
    ],
  ]

  return sequences[v % sequences.length]
}

const CAPTIONS: Record<string, string[]> = {
  'machining-bottlenecks': [
    `Most CNC throughput problems aren't machine problems.\n\nThey're sequencing and planning problems — created before the job dropped and discovered after the downstream impact is already locked in.\n\n${PROBLEM_DATA['machining-bottlenecks'].stat1}.\n\nThe constraint was built in. The floor just revealed it.\n\n→ What's your constraint mapping process before a high-complexity job releases? Drop it in the comments.\n\n#PrecisionMachining #CNCMachining #ManufacturingOperations #AdvancedManufacturing`,
    `${PROBLEM_DATA['machining-bottlenecks'].stat2}.\n\nEvery additional operation in a machining sequence adds a handoff.\nEvery handoff is a potential bottleneck.\nEvery bottleneck has a downstream cost most programs never trace back to the source.\n\nThe fix is upstream — before job release.\n\n→ Follow for weekly precision machining cost and process insights.\n\n#CNCMachining #MachiningBottlenecks #ManufacturingEfficiency #Throughput`,
    `The throughput problem in your precision machining program is upstream of where you\'re looking.\n\n${PROBLEM_DATA['machining-bottlenecks'].stat3}.\n\nMap the constraint before the job drops. It\'s not overhead — it\'s how you prevent a 5-week delivery miss.\n\n→ Comment with your program type for a specific constraint mapping breakdown.\n\n#AdvancedManufacturing #PrecisionMachining #CNCOperations`,
  ],
  'tight-tolerance-failures': [
    `Tolerance failures at final inspection cost 4–12x more to correct than those caught in-process.\n\nMost precision shops still position their primary inspection checkpoint at the end of the line.\n\n${PROBLEM_DATA['tight-tolerance-failures'].stat1}.\n\nThe inspection placement is the cost driver — not the part geometry.\n\n→ Where in your production process are tolerance deviations typically detected?\n\n#PrecisionMachining #QualityControl #ToleranceControl #Metrology`,
    `1 in 5 complex assemblies fails fit because of one machined component out of tolerance.\n\nThe assembly engineer discovers it. The machining process created it.\n\n${PROBLEM_DATA['tight-tolerance-failures'].stat2}.\n\nIn-process measurement doesn\'t disrupt production — it prevents the rework that does.\n\n→ Follow for precision manufacturing quality and cost insights.\n\n#CMM #InProcessInspection #AdvancedManufacturing #QualityEngineering`,
    `${PROBLEM_DATA['tight-tolerance-failures'].stat3}.\n\nThe fix: position a first-article CMM checkpoint before full production commits to the tooling offset.\n\nCost of that checkpoint: $200–$400.\nCost of a tolerance failure at final inspection: $3,200–$9,600.\n\nThe math is not close.\n\n→ Tag a quality engineer who should see this.\n\n#PrecisionMachining #FirstArticleInspection #ManufacturingQuality`,
  ],
  'production-delays': [
    `72% of precision manufacturing schedule overruns originate in the machining phase.\n\nNot in finishing. Not in assembly.\n\n${PROBLEM_DATA['production-delays'].stat2}.\n\nThe schedule was lost before downstream operations ever started. Most teams don\'t trace it back.\n\n→ What\'s your pre-production checklist before a precision machining job releases?\n\n#ManufacturingSchedule #CNCProduction #AdvancedManufacturing #ProductionPlanning`,
    `A 3-week machining delay with 3 downstream operations idle at $3,000/day each:\n\n$189,000 in downstream exposure.\n\n${PROBLEM_DATA['production-delays'].stat1}.\n\nNone of it shows up as "machining delay cost" in the budget report. It shows up as downstream idle labor and extended overhead.\n\n→ Follow for precision manufacturing cost insights.\n\n#PrecisionMachining #ProductionDelays #ManufacturingCost #CNCOperations`,
    `${PROBLEM_DATA['production-delays'].stat3}.\n\nThe most predictable precision manufacturing delays share one signature:\n\nA pre-production planning window that didn\'t validate setup readiness, material staging, and programming before the job dropped.\n\n→ Comment with your program type — I\'ll outline the specific planning checkpoints for your environment.\n\n#ManufacturingOperations #CNCMachining #ProductionSchedule`,
  ],
  'scrap-rework-cost': [
    `Rework in precision machining has three costs:\n\n1. The material\n2. The direct labor\n3. The schedule impact on every part waiting behind it\n\n${PROBLEM_DATA['scrap-rework-cost'].stat1}.\n\nMost programs track the first one. The schedule cost is almost always the largest.\n\n→ How does your team track rework cost on closed precision jobs?\n\n#PrecisionMachining #ScrappedParts #QualityControl #ManufacturingCost`,
    `${PROBLEM_DATA['scrap-rework-cost'].stat3}.\n\nSame alloy. Same tooling. 3–5x different scrap rate.\n\nThe difference is in-process measurement discipline — not material quality or machine capability.\n\n→ What\'s your current scrap rate on tight-tolerance production runs? Drop it in the comments.\n\n#ScrapsAndRework #AdvancedManufacturing #ProcessControl #CNCMachining`,
    `${PROBLEM_DATA['scrap-rework-cost'].stat2}.\n\n6–14 additional hours per rework event on a tight-tolerance component.\n\nIn a program with a hard delivery date, those hours are not in the schedule — and no amount of overtime fully recovers them.\n\nThe first-article inspection that prevents this costs $200–$400.\n\n→ Follow for precision machining process and cost insights.\n\n#FirstArticle #PrecisionMachining #Rework #ManufacturingQuality`,
  ],
  'material-waste': [
    `There is material waste in most precision machining quotes.\n\nIt\'s not a line item. It\'s embedded in stock cost before the quote is written — and passed to the customer as "material."\n\n${PROBLEM_DATA['material-waste'].stat1}.\n\nOn a titanium program, that percentage is not rounding error.\n\n→ Have you asked your machining vendor for their stock utilization rate?\n\n#TitaniumMachining #MaterialWaste #AdvancedManufacturing #CAMProgramming`,
    `Two shops. Same precision part. Same alloy. 15% price difference.\n\n${PROBLEM_DATA['material-waste'].stat3}.\n\nThe delta isn\'t the alloy price. It\'s toolpath efficiency and stock allocation — invisible to the buyer comparing quotes.\n\n→ Follow for precision manufacturing sourcing and cost insights.\n\n#CNCMachining #CAMOptimization #PrecisionMachining #Aerospace`,
    `${PROBLEM_DATA['material-waste'].stat2}.\n\nOn a 2,000-pound titanium program at 18% waste:\n360 lbs × $45/lb = $16,200 in material purchased, machined down, and discarded.\n\nIt appeared as "material cost." Nobody labeled it as waste.\n\n→ Comment with your typical alloy mix — I\'ll estimate the waste exposure for your program type.\n\n#MaterialUtilization #TitaniumMachining #PrecisionManufacturing`,
  ],
  'process-downtime': [
    `When a CNC machining center goes down, it doesn\'t stop one job.\n\nIt stops the queue.\n\n${PROBLEM_DATA['process-downtime'].stat1}.\n\nEvery job waiting in sequence shifts on the delivery schedule. The downstream cost compounds hourly.\n\n→ Does your CNC vendor publish a maintenance schedule? Most don\'t.\n\n#CNCDowntime #MachineMaintenace #AdvancedManufacturing #PrecisionMachining`,
    `${PROBLEM_DATA['process-downtime'].stat2}.\n\n45–65% more unplanned downtime without a maintenance program.\n\nThat differential is in your lead times and delivery dates — whether the machining vendor mentions it or not.\n\n→ Follow for precision manufacturing reliability and cost insights.\n\n#PreventiveMaintenance #CNCMachining #ManufacturingReliability #Throughput`,
    `A precision machining center averaging 10 unplanned downtime hours/month at $2,000/hour:\n\n$240,000/year in throughput loss.\n\nNone of it shows up in a maintenance report. It shows up in late deliveries.\n\n${PROBLEM_DATA['process-downtime'].stat3}.\n\n→ Tag a plant manager who should be tracking downtime cost against throughput rate.\n\n#CNCOperations #DowntimeCost #ManufacturingOperations`,
  ],
  'cost-leakage': [
    `Precision machining programs lose margin through three gaps most job costing systems don\'t capture:\n\n1. Setup time not coded to the work order\n2. Tooling attrition charged to overhead\n3. Rework absorbed as department variance\n\n${PROBLEM_DATA['cost-leakage'].stat1}.\n\n→ When did you last run a closed-job cost variance review?\n\n#JobCosting #ManufacturingCost #CNCMachining #CostControl`,
    `${PROBLEM_DATA['cost-leakage'].stat2}.\n\n18–35% of total labor in setup time that hits overhead instead of the job.\n\nAt $85/hr fully burdened, 20 untracked hours/week = $88,000/year.\n\nThe number exists. Nobody labeled it.\n\n→ Follow for precision manufacturing cost visibility insights.\n\n#SetupTime #ManufacturingEfficiency #CNCProduction #CostLeakage`,
    `${PROBLEM_DATA['cost-leakage'].stat3}.\n\n2.5–4x more budget overruns without real-time cost visibility.\n\nThe precision shops that close jobs on budget aren\'t better at estimating.\n\nThey track differently.\n\n→ Comment with your program type — I\'ll outline where cost leakage concentrates in your environment.\n\n#PrecisionMachining #BudgetControl #ManufacturingOperations`,
  ],
  'precision-inconsistency': [
    `Same machine. Same alloy. Same program.\n\nDifferent operator. Different shift. Different dimensional result.\n\n${PROBLEM_DATA['precision-inconsistency'].stat3}.\n\nThis isn\'t a machine calibration problem. It\'s a process standardization problem — and it compounds with every shift.\n\n→ How does your machining program control consistency across operator shifts?\n\n#CNCMachining #ProcessControl #QualityControl #PrecisionMachining`,
    `${PROBLEM_DATA['precision-inconsistency'].stat1}.\n\n25–45% higher rejection rates from multi-operator dimensional variation.\n\nIn a 1,000-part run, that\'s 250–450 additional non-conformances driven not by machine failure — but by process inconsistency.\n\n→ Follow for precision manufacturing quality and process insights.\n\n#ManufacturingQuality #DimensionalControl #AdvancedManufacturing`,
    `${PROBLEM_DATA['precision-inconsistency'].stat2}.\n\n15–30% downstream assembly failures trace back to machining inconsistency.\n\nThe assembly team files the report. The machining process — three operations ago — created it.\n\nDocumented work instructions don\'t add overhead. They remove the variance that causes downstream failures.\n\n→ Tag a manufacturing engineer who manages this type of program.\n\n#PrecisionMachining #AssemblyFailures #ProcessStandardization`,
  ],
  'scaling-operations': [
    `Scaling a precision machining program doesn\'t multiply output.\n\nIt multiplies whatever is already in the process.\n\n${PROBLEM_DATA['scaling-operations'].stat1}.\n\n40–70% more quality escapes at production volume. The prototype ran clean. The process was never validated for scale.\n\n→ What does your prototype-to-production readiness review look like?\n\n#ProductionRamp #PrecisionMachining #ManufacturingScale #QualityEscape`,
    `${PROBLEM_DATA['scaling-operations'].stat3}.\n\n65–80% of CNC scale-ups hit throughput bottlenecks within 90 days.\n\nMost are visible before the ramp starts — if the upstream constraints are mapped before volume begins.\n\n→ Follow for precision manufacturing scale-up and process insights.\n\n#ManufacturingScale #CNCProduction #AdvancedManufacturing #Throughput`,
    `Prototype success ≠ production readiness.\n\n${PROBLEM_DATA['scaling-operations'].stat2}.\n\n20–45% cycle time variance increase per unit when fixturing and tooling repeatability aren\'t addressed before ramp.\n\nThe estimate was based on prototype data. The production actuals are not.\n\n→ Comment with your current program phase — prototype or production ramp?\n\n#PrecisionMachining #ProductionLaunch #CycleTime #ManufacturingEngineering`,
  ],
  'tool-wear-inefficiency': [
    `Tool wear in precision machining is silent until the batch fails tolerance.\n\n${PROBLEM_DATA['tool-wear-inefficiency'].stat1}.\n\nIn a ±0.001 tolerance program, that drift doesn\'t produce a gradual trend — it produces a hard rejection after the batch has already run.\n\n→ Are your tool change intervals based on measured drift data or catalog estimates?\n\n#ToolWear #CNCMachining #PrecisionMachining #ToleranceControl`,
    `${PROBLEM_DATA['tool-wear-inefficiency'].stat2}.\n\n20–40% more tool breakage events without structured life management.\n\nEvery breakage during a live precision cut:\n— Immediate machine stop\n— Scrap evaluation\n— 2–4 hour diagnostic cycle\n\nThe planned change costs the tool. The unplanned breakage costs all of that.\n\n→ Follow for precision machining process and tool management insights.\n\n#ToolLife #CarbideTooling #CNCMachining #MachineMaintenance`,
    `${PROBLEM_DATA['tool-wear-inefficiency'].stat3}.\n\nPremature tool failure during a live aerospace or medical cut requires:\n— Machine stop\n— Part disposition\n— 2–4 hours diagnostic\n— Program re-qualification\n\nA structured tool life management protocol costs a fraction of one unplanned event.\n\n→ Tag a CNC programmer who manages tool life on tight-tolerance programs.\n\n#ToolManagement #PrecisionMachining #AerospaceMachining #MedicalMachining`,
  ],
}

const SUGGESTED_VISUALS: Record<string, string[]> = {
  'machining-bottlenecks': [
    'B-roll: CNC machining center in operation with multiple jobs staged in queue behind it',
    'Infographic: machining sequence flowchart with a single bottleneck step highlighted and downstream operations shown in waiting state',
    'Time-lapse: multi-operation precision program moving through turning, milling, and grinding with a visible stall at one transition',
  ],
  'tight-tolerance-failures': [
    'Close-up footage: CMM probe measuring a bore diameter on a turned aerospace component',
    'Split screen: in-process inspection report (conforming) vs. final inspection rejection tag (non-conforming) for the same part family',
    'Macro photography: tolerance callout on engineering drawing with ±0.001 highlighted',
  ],
  'production-delays': [
    'Wide shot: empty assembly station with a "waiting for machined parts" sign and a delivery calendar visible on the wall',
    'Side-by-side graphic: planned production schedule vs. actual with the machining phase gap highlighted',
    'B-roll: machining center running late on a tight-tolerance job while adjacent stations show idle operators',
  ],
  'scrap-rework-cost': [
    'Bin of scrapped precision components with a cost tally — each part labeled with its rejection code',
    'Operator remachining a component at a manual lathe with a quality hold tag on the part',
    'CMM report showing out-of-tolerance measurements on a rejected batch with the dimensional deviation highlighted',
  ],
  'material-waste': [
    'Side-by-side: large titanium billet next to the small finished component with the weight differential labeled',
    'Shop floor: machined titanium chips and offcuts with a pound-per-run waste calculation overlaid',
    'CAM software screenshot: optimized toolpath layout vs. unoptimized — showing the material utilization percentage for each',
  ],
  'process-downtime': [
    'CNC machining center with maintenance warning lights active and a "machine down" placard',
    'Technician performing spindle maintenance on a precision machining center with a production schedule visible in the background',
    'Time-lapse: production floor activity stopping as a single machine failure propagates through the queue',
  ],
  'cost-leakage': [
    'Job cost report printout with actual cost significantly above estimate — variance column highlighted in red',
    'Split screen: operator logging setup time on paper vs. ERP work order time stamp',
    'Overhead view: precision machining work order folder open alongside a financial variance report',
  ],
  'precision-inconsistency': [
    'CMM report showing part-to-part dimensional variation across 10 identical components from the same production run',
    'Side-by-side: two precision components from the same program with measurement callouts showing different actual values',
    'Operator at machine with no process documentation visible vs. operator working from a laminated standardized work instruction',
  ],
  'scaling-operations': [
    'Single prototype component next to a production bin of 500 — quality escape report visible alongside',
    'Ramp-up production floor: work-in-process backing up at a bottleneck station with delivery board visible',
    'Comparison graphic: prototype program metrics (cycle time, reject rate) vs. first 90 days of production volume',
  ],
  'tool-wear-inefficiency': [
    'Macro photography: new carbide insert vs. worn insert at the same magnification — wear land clearly visible on cutting edge',
    'CMM dimensional report showing gradual dimensional drift across 100 consecutive parts from the same tool without a change',
    'Broken carbide end mill on the shop floor next to the in-process precision component that was being machined at failure',
  ],
}

const REPURPOSING: string[] = [
  'Convert the carousel into a LinkedIn post — use the slide sequence as numbered bullets in a standard post format for the operations director audience.',
  'Pull the reel script hook into a YouTube Shorts script — replace the story-frame structure with direct camera delivery for the precision machining operator audience.',
  'Extract the caption stats into a Twitter/X single post — strip the hashtags and add a targeted engagement question for manufacturing engineers.',
  'Use the story sequence poll question as a LinkedIn survey post — precision machining professionals respond well to data-point questions about their own operations.',
  'Convert the on-screen text sequence into a cold email subject line test — each line is a potential opener for an operations director outreach sequence.',
]

const IMPROVEMENT_SUGGESTIONS: Record<string, string[]> = {
  'machining-bottlenecks': [
    'Add a before/after production sequence visual — the same job with and without upstream constraint mapping — to make the scheduling impact concrete.',
    'Include a specific alloy or part type reference (5-axis aerospace component, multi-op medical turned part) to anchor the scenario.',
    'Add a poll to the story sequence asking followers how they currently map constraints before job release.',
  ],
  'tight-tolerance-failures': [
    'Use a close-up of a real CMM report showing dimensional deviation to make the 4–12x cost multiplier visually grounded.',
    'Add a specific tolerance callout in the carousel — ±0.001 bore on a turned component — to make the inspection requirement concrete.',
    'Include a slide comparing in-process inspection cost versus final-inspection remediation cost as specific dollar amounts.',
  ],
  'production-delays': [
    'Add a visual timeline showing where the delay was created (pre-production planning) versus where it was discovered (week three of the machining run).',
    'Include the downstream idle cost calculation as a visual: $3,000/day × 3 operations × 21 days = $189,000.',
    'Use a split-screen format showing planned vs. actual schedule with the machining phase gap highlighted.',
  ],
  'scrap-rework-cost': [
    'Add a cost-per-event breakdown for a specific rework scenario — remachining a bore on a medical component — to make the 6–14 hour figure tangible.',
    'Include the scrap rate comparison (3–5x differential) as a visual bar chart for the carousel.',
    'Use actual CMM report imagery showing rejected dimensional callouts to ground the rejection rate stat.',
  ],
  'material-waste': [
    'Add a visual showing the weight difference between starting billet and finished component — labeled with the waste percentage.',
    'Include a side-by-side CAM toolpath comparison — unoptimized vs. optimized — with material utilization percentages for both.',
    'Use alloy-specific cost calculations in the caption — titanium at $45/lb versus aluminum at $4/lb — to show how the waste problem scales by material.',
  ],
  'process-downtime': [
    'Add a specific CNC machine type (Mazak, Haas, DMG MORI) to make the maintenance scenario relatable to the precision shop audience.',
    'Include a visual showing the utilization-vs-failure-rate relationship — how risk accelerates above 75% utilization.',
    'Use a production floor wide shot showing idle machines during a downtime event to make the cascade stop visual.',
  ],
  'cost-leakage': [
    'Add a job cost waterfall chart showing where cost leakage occurs across a precision machining program — from estimate to actual.',
    'Include a specific time-capture process visual — stamped operator log vs. overhead entry — to make the tracking gap concrete.',
    'Use a comparison of two identical job types — one with job-level tracking, one without — showing the variance at close.',
  ],
  'precision-inconsistency': [
    'Add a real CMM data chart showing part-to-part dimensional variation across operator shifts — the variance is immediately visual.',
    'Include a split-screen of an operator working with and without a standardized work instruction to make the process control gap concrete.',
    'Use a specific tolerance example — ±0.001 bore diameter varying from 0.999 to 1.003 across shifts — to quantify the inconsistency.',
  ],
  'scaling-operations': [
    'Add a ramp-up timeline visual showing quality escape rate versus production volume — with the 40–70% increase clearly plotted.',
    'Include a prototype vs. production comparison for a specific program type — aerospace bracket, medical device housing — to make the scale-up failure scenario relatable.',
    'Use a documentation checklist visual showing what transfers from prototype to production versus what most scale-ups leave behind.',
  ],
  'tool-wear-inefficiency': [
    'Add a macro photo comparison of new versus worn carbide insert to make the wear land visible — the visual impact is immediate.',
    'Include a dimensional drift chart — part size vs. tool cycle count — showing the tolerance band breach point.',
    'Use a spindle load trending chart to illustrate how load increase correlates with wear and how it serves as an early detection mechanism.',
  ],
}

export function generateInstagram(inputs: InstagramInputs, seed: number = 0): InstagramOutput {
  const v = seed % 3
  const p = inputs.problem
  const fmt = inputs.contentFormat

  const visualHooks = VISUAL_HOOKS[p] ?? VISUAL_HOOKS['machining-bottlenecks']
  const onScreenTexts = ON_SCREEN_TEXTS[p] ?? ON_SCREEN_TEXTS['machining-bottlenecks']
  const captions = CAPTIONS[p] ?? CAPTIONS['machining-bottlenecks']
  const visuals = SUGGESTED_VISUALS[p] ?? SUGGESTED_VISUALS['machining-bottlenecks']
  const improvements = IMPROVEMENT_SUGGESTIONS[p] ?? IMPROVEMENT_SUGGESTIONS['machining-bottlenecks']

  const visualHook = visualHooks[v] ?? visualHooks[0]
  const onScreenText = onScreenTexts[v] ?? onScreenTexts[0]
  const caption = captions[v] ?? captions[0]

  let scriptOrSlides: string[]
  if (fmt === 'reel') {
    scriptOrSlides = [buildReelScript(p, v)]
  } else if (fmt === 'carousel') {
    scriptOrSlides = buildCarouselSlides(p, v)
  } else if (fmt === 'story') {
    scriptOrSlides = buildStorySequence(p, v)
  } else {
    scriptOrSlides = [caption]
  }

  const cta = fmt === 'reel'
    ? 'Follow Precision Advanced Manufacturing for weekly precision machining cost and process insights.'
    : fmt === 'carousel'
    ? 'Follow for precision machining insights → Link in bio for program-specific breakdowns.'
    : fmt === 'story'
    ? 'Link in bio — or DM with your program type for a specific cost breakdown.'
    : 'Follow for weekly precision manufacturing insights. Link in bio.'

  const qualityScore = scoreContent(inputs, true, true, true, caption.split(' ').length)

  return {
    platform: 'instagram',
    visualHook,
    onScreenText,
    scriptOrSlides,
    caption,
    cta,
    suggestedVisuals: visuals,
    repurposingSuggestions: REPURPOSING.slice(0, 3),
    qualityScore,
    improvementSuggestions: improvements.slice(0, 3),
  }
}
