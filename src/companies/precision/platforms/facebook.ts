import type { FacebookInputs, FacebookOutput } from '../types'
import { PROBLEM_DATA, PROBLEM_LABELS } from '../lib/companyProfile'
import { scoreContent } from '../lib/scoring'

const SHORT_POSTS: Record<string, string[]> = {
  'machining-bottlenecks': [
    `Most CNC throughput problems aren't machine problems.\n\nThey're sequencing problems — created upstream before the job dropped and discovered on the floor after the downstream impact is already locked in.\n\n${PROBLEM_DATA['machining-bottlenecks'].stat1}.\n\nMapping the constraint before job release prevents most of it. Takes about an hour. Saves 2–5 weeks.`,
    `${PROBLEM_DATA['machining-bottlenecks'].stat2}.\n\nEvery additional operation in a machining sequence adds a handoff. Every handoff is a surface where timing failures form.\n\nThe shops that hit their delivery dates consistently are the ones that map constraint points before the job runs — not after the delay is confirmed.`,
    `Quick stat for operations teams managing precision machining programs:\n\n${PROBLEM_DATA['machining-bottlenecks'].stat3}.\n\nIf you've ever had a five-week delay that started with one setup issue — this is why. The cascade was built into the program structure. It just needed one trigger.`,
  ],
  'tight-tolerance-failures': [
    `Here's a cost comparison worth knowing if you manage precision machining programs:\n\nTolerance failure caught in-process: $200–$400 to correct.\nTolerance failure caught at final inspection: $3,200–$9,600 to correct.\n\n${PROBLEM_DATA['tight-tolerance-failures'].stat2}.\n\nMost programs still default to end-of-line inspection because it's "less disruptive." The math doesn't support that choice.`,
    `${PROBLEM_DATA['tight-tolerance-failures'].stat1}.\n\n8–18% rejection for tolerance non-conformance in shops without a structured first-article process.\n\nIn a 500-part precision run, that's 40–90 pieces requiring re-evaluation before they can ship.\n\nThe fix isn't harder machining — it's better inspection placement.`,
    `Something worth knowing about tolerance failures in precision machining:\n\n${PROBLEM_DATA['tight-tolerance-failures'].stat3}.\n\n1 in 5 complex assemblies fails fit because of a single out-of-tolerance machined component.\n\nThe assembly engineer discovers it. The machining process — several operations earlier — created it. By then, the correction cost is 4–12x what it would have been in-process.`,
  ],
  'production-delays': [
    `72% of precision manufacturing schedule overruns originate in the machining phase.\n\nNot in finishing. Not in assembly. Not on-site.\n\n${PROBLEM_DATA['production-delays'].stat2}.\n\nThe timeline was lost before downstream operations ever started. Most teams don't trace the overrun back to where it was created.`,
    `A production delay in the machining phase isn't just a machining problem.\n\n${PROBLEM_DATA['production-delays'].stat2}.\n\n$1,500–$6,000 per day per idle downstream operation.\n\nWith three operations waiting on machined parts, a three-week delay is a $189,000 exposure — before overtime or expedite costs are added.`,
    `${PROBLEM_DATA['production-delays'].stat1}.\n\nA 30% timeline extension on a 12-week precision program is 3–4 weeks of downstream exposure.\n\nIn contract manufacturing, those weeks carry consequences at every tier.\n\nThe cause is almost always the same: planning assumptions that weren't validated before the job dropped.`,
  ],
  'scrap-rework-cost': [
    `Rework in precision machining has three costs that most programs only track one of:\n\n1. The material\n2. The direct labor to rework and re-inspect\n3. The schedule impact on every part waiting in queue behind it\n\n${PROBLEM_DATA['scrap-rework-cost'].stat1}.\n\nThe third cost is almost always the largest — and it rarely shows up in the quality report.`,
    `${PROBLEM_DATA['scrap-rework-cost'].stat3}.\n\n3–5x more scrap in shops without in-process gauging.\n\nSame alloy. Same machine. Same program. Different inspection protocol — and a dramatically different scrap rate.\n\nThe scrap problem is a process discipline problem wearing a quality label.`,
    `${PROBLEM_DATA['scrap-rework-cost'].stat2}.\n\n6–14 additional hours per rework event on a tight-tolerance component.\n\nMost of those events are preventable at the first-article stage — before full production commits to the same tooling offset that will produce the same deviation 200 more times.`,
  ],
  'material-waste': [
    `Quick reality check on precision machining material costs:\n\n${PROBLEM_DATA['material-waste'].stat1}.\n\n10–25% of raw stock wasted from unoptimized toolpath planning. On a titanium or Inconel program, that's not a minor inefficiency — it's a significant budget line that nobody labeled.\n\nAnd it's in the quote. You just can't see it as a line item.`,
    `Two shops quote the same precision component at the same alloy price.\n\nThe difference in their numbers often comes down to stock utilization:\n\n${PROBLEM_DATA['material-waste'].stat3}.\n\nThe shop wasting 20% of titanium input is quoting from a fundamentally different cost basis — even if they buy from the same mill.`,
    `${PROBLEM_DATA['material-waste'].stat2}.\n\n$15–$60 per pound of wasted aerospace-grade alloy.\n\nOn a 2,000-pound titanium program with 18% waste — that's $16,200 in material purchased and discarded.\n\nIt appeared as "material cost." Nobody labeled it as waste. The customer absorbed it.`,
  ],
  'process-downtime': [
    `CNC machine downtime doesn't just stop one job.\n\nIt stops the queue — and every job waiting in sequence shifts on the delivery schedule.\n\n${PROBLEM_DATA['process-downtime'].stat1}.\n\n$800–$3,500 per hour in lost throughput. In a six-hour unplanned event, that's $4,800–$21,000 in production that didn't happen.`,
    `${PROBLEM_DATA['process-downtime'].stat2}.\n\n45–65% more unplanned downtime in facilities without preventive maintenance programs.\n\nThat differential is in your delivery commitments — whether your machining vendor mentions it or not.\n\nA preventive maintenance program isn't overhead. It's how you keep $3,500/hour risk off the schedule.`,
    `${PROBLEM_DATA['process-downtime'].stat3}.\n\nAbove 75% utilization, CNC machines average 8–15 unplanned downtime hours per month without a maintenance protocol.\n\nHigh utilization looks like efficiency. Without maintenance discipline, it's accumulated failure risk building toward the worst possible moment.`,
  ],
  'cost-leakage': [
    `Precision machining programs lose 12–22% of total program cost through gaps that most job costing systems don't see.\n\n${PROBLEM_DATA['cost-leakage'].stat2}.\n\nSetup time charged to overhead. Tooling events not coded to the job. Rework absorbed into department variance.\n\nThe margin erodes invisibly — and the damage is done before the job closes.`,
    `${PROBLEM_DATA['cost-leakage'].stat3}.\n\n2.5–4x more budget overruns without real-time cost visibility.\n\nThe precision shops that consistently close jobs on budget are not better estimators.\n\nThey track differently — at the job level, in real time, before the variance is irreversible.`,
    `Here's a cost leakage stat worth knowing if you're managing precision machining programs:\n\n${PROBLEM_DATA['cost-leakage'].stat2}.\n\n18–35% of total labor in untracked setup time. At $85/hr fully burdened, 20 untracked hours/week = $88,000/year.\n\nThe number is real. Nobody in the budget review named it.`,
  ],
  'precision-inconsistency': [
    `Same machine. Same alloy. Same CNC program.\n\nDifferent operator. Different shift. Different dimensional result.\n\n${PROBLEM_DATA['precision-inconsistency'].stat3}.\n\n3–6x more dimensional variance in shops without standardized work instructions.\n\nThis isn't a machine calibration problem. It's a process documentation problem — and it's fixable.`,
    `${PROBLEM_DATA['precision-inconsistency'].stat1}.\n\n25–45% higher rejection rates from multi-operator variation.\n\nIn a 1,000-part run, that's 250–450 additional non-conformances driven not by machine failure — but by offset interpretations that vary from shift to shift without a documented anchor.`,
    `15–30% of downstream assembly fit failures trace back to machining inconsistency.\n\n${PROBLEM_DATA['precision-inconsistency'].stat3}.\n\nThe assembly team reports it as an assembly problem. The root cause is in the machining process — in the absence of a standardized work instruction that controls the critical variables consistently.`,
  ],
  'scaling-operations': [
    `Scaling a precision machining program doesn't multiply output.\n\nIt multiplies whatever is in the process.\n\n${PROBLEM_DATA['scaling-operations'].stat1}.\n\n40–70% more quality escapes at production volume. The prototype ran clean because it had one skilled operator with full engineering support.\n\nProduction volume removes both of those advantages.`,
    `${PROBLEM_DATA['scaling-operations'].stat3}.\n\n65–80% of CNC scale-ups hit throughput bottlenecks within 90 days.\n\nMost were identifiable before the ramp started — if the upstream constraints were mapped before production volume began.\n\nMost scale-up plans don't include that step.`,
    `${PROBLEM_DATA['scaling-operations'].stat2}.\n\n20–45% cycle time variance increase per unit when fixturing and tooling repeatability aren't addressed before volume ramp.\n\nThe production cost estimate was based on prototype cycle time. The actuals are not.\n\nThat gap is where ramp cost overruns originate.`,
  ],
  'tool-wear-inefficiency': [
    `Tool wear in precision machining is silent until it produces a defect.\n\n${PROBLEM_DATA['tool-wear-inefficiency'].stat1}.\n\n0.002–0.008 inches of dimensional drift per tool interval.\n\nIn a ±0.001 tolerance program, that drift doesn't produce a trend on the CMM report. It produces a hard batch rejection — after the run is complete.`,
    `${PROBLEM_DATA['tool-wear-inefficiency'].stat2}.\n\n20–40% more tool breakage events without structured life management.\n\nEvery breakage during a live precision cut means: machine stop, scrap evaluation, and 2–4 hours of unplanned diagnostic time before production resumes.\n\nThe planned change costs the tool. The unplanned breakage costs all of that — plus the delivery commitment.`,
    `Here's the real cost comparison in tool life management:\n\nPlanned tool change: cost of the tool.\nUnplanned breakage during a live precision cut: tool + in-process part scrap + 2–4 diagnostic hours + delivery delay.\n\n${PROBLEM_DATA['tool-wear-inefficiency'].stat2}.\n\nManaged tool life is not overhead — it's the mechanism that keeps the expensive outcome off the production calendar.`,
  ],
}

const EDUCATIONAL_POSTS: Record<string, string[]> = {
  'machining-bottlenecks': [
    `Understanding CNC Machining Bottlenecks: Where They Form and What They Cost\n\nIf you manage a precision machining program, understanding where bottlenecks form is one of the most valuable operational skills you can develop.\n\nHere's the core principle: bottlenecks in CNC machining rarely form at the machine with the lowest utilization. They form at the handoff points — the transitions between operations where sequencing, staging, and fixture availability create constraints that aren't visible until they've already cost several days.\n\nWhy it matters:\n\n${PROBLEM_DATA['machining-bottlenecks'].stat1}.\n\n${PROBLEM_DATA['machining-bottlenecks'].stat2}.\n\nThe upstream cause:\n\nMost machining bottlenecks are created at the job planning stage — not on the shop floor. The three most common sources:\n\n1. Setup sequences that weren't validated against available fixture capacity before job release\n2. Material that wasn't staged before the planned start date\n3. Multi-operation sequences with no capacity buffer at the critical path step\n\nWhat you can do:\n\nBefore releasing a high-complexity precision job, ask: "What is the downstream consequence if this operation runs two days late?" If the answer is "everything waits" — you have an unmanaged constraint. Map it. Buffer it. Or restructure the sequence before the job drops.\n\n${PROBLEM_DATA['machining-bottlenecks'].cost1}. ${PROBLEM_DATA['machining-bottlenecks'].cost2}.\n\nThe cost of pre-production constraint analysis: approximately one hour. The cost of a five-week downstream delay: significantly more.`,
  ],
  'tight-tolerance-failures': [
    `Understanding Tolerance Failures in Precision Machining: A Practical Guide for Operations Teams\n\nTolerance failures are one of the most financially significant events in a precision machining program — and one of the most preventable, if the inspection process is positioned correctly.\n\nHere's what most operations teams need to understand:\n\nThe cost of a tolerance failure is not fixed. It depends entirely on when the failure is detected.\n\n${PROBLEM_DATA['tight-tolerance-failures'].stat2}.\n\nA deviation caught during an in-process measurement checkpoint costs $200–$400 to correct — because the fix is an offset adjustment before the full batch runs.\n\nThe same deviation caught at final inspection costs $3,200–$9,600 — because the fix is remachining, re-inspection, and recertification of parts that were already fully processed.\n\nWhere tolerance failures come from:\n\n${PROBLEM_DATA['tight-tolerance-failures'].stat1}.\n\nMost tolerance failures are not random events. They are predictable outputs of machining processes that allow dimensional drift without a measurement checkpoint to catch it before it propagates.\n\nCommon sources: tool wear past the defined change interval, fixture seating variation between setups, thermal growth during long production runs, and tooling offset entries that aren't verified against a baseline.\n\nWhat to implement:\n\nA first-article CMM report before full production begins is the single highest-ROI quality action in a tight-tolerance program. It catches setup deviations before they become batch-level problems. Cost: $200–$400 per event. Value: prevention of $3,200–$9,600 in correction per deviation that would have propagated unchecked.\n\nFollowed by in-process measurement at a defined frequency — every 25th part, for example — with a documented decision rule for offset adjustment when a measurement approaches the control limit.\n\n${PROBLEM_DATA['tight-tolerance-failures'].cost1}. ${PROBLEM_DATA['tight-tolerance-failures'].cost2}.`,
  ],
  'cost-leakage': [
    `How Precision Machining Programs Lose 12–22% of Total Cost to Leakage — and How to Stop It\n\nCost leakage in precision machining is not dramatic. It doesn't show up in a single large variance. It accumulates across hundreds of small, undocumented events — and by the time it's visible in the job cost report, the margin is already gone.\n\nHere are the three primary leakage points:\n\n1. Setup time not coded to the work order\n\n${PROBLEM_DATA['cost-leakage'].stat2}.\n\n18–35% of total labor in setup time that hits department overhead instead of the originating job. At $85/hour fully burdened, 20 untracked setup hours per week = $88,000/year in labor that has no job assignment.\n\n2. Tooling attrition charged to overhead\n\nTool changes, broken inserts, and special tooling events that don't get logged against the work order they occurred on. The job closes under-cost. The overhead bucket absorbs what the program actually required.\n\n3. Rework absorbed as department variance\n\nRework hours that don't get coded back to the originating job. They become part of the department variance — distributed across all jobs — rather than assigned to the specific program where the cost was incurred.\n\n${PROBLEM_DATA['cost-leakage'].stat1}.\n\nThe combined effect: 12–22% of total program cost that was incurred but cannot be traced to a specific job, operation, or decision at close.\n\nWhat to do:\n\n${PROBLEM_DATA['cost-leakage'].stat3}.\n\nOperations with real-time cost visibility at the job level experience 2.5–4x fewer budget overruns. The tracking system is not overhead — it's the mechanism that makes estimates financially accountable.`,
  ],
}

const DISCUSSION_PROMPTS: Record<string, string[]> = {
  'machining-bottlenecks': [
    `Question for operations directors and plant managers managing precision machining programs:\n\nWhen you have a CNC throughput bottleneck, where does it typically originate?\n\n— At the machine (speed, capacity, or downtime)\n— In setup sequencing (fixtures not staged, setup order not validated)\n— In programming (released late or requiring rework before first operation)\n— In material staging (stock not available at planned start)\n\n${PROBLEM_DATA['machining-bottlenecks'].stat1}.\n\nDrop your answer below — and if there's a pattern I've missed, add it in the comments. We'll compile the responses and share the breakdown.`,
    `Let's talk about precision machining throughput.\n\nWhat's the biggest constraint you've seen in a CNC machining program that wasn't obvious until after the delay was already locked in?\n\n${PROBLEM_DATA['machining-bottlenecks'].stat2}.\n\nSharing real experiences here — what did you find, and when did you find it relative to when the delay started?`,
  ],
  'tight-tolerance-failures': [
    `Question for quality engineers and manufacturing engineers managing tight-tolerance programs:\n\nAt what point in your production process are tolerance failures typically caught?\n\n— During setup (before full production begins)\n— In-process (during the production run)\n— At final inspection (after the batch is complete)\n— At the customer (after delivery)\n\n${PROBLEM_DATA['tight-tolerance-failures'].stat2}.\n\nThe stage of detection determines the cost of correction. Where does your process currently catch most failures — and what's the cost differential you've observed?`,
  ],
  'cost-leakage': [
    `Question for operations directors and finance leads at precision machining shops:\n\nHow do you currently track cost on closed precision machining jobs — and at what level of granularity?\n\n— Department-level overhead only\n— Work order level, reviewed at job close\n— Job-level real-time tracking during production\n— Program-level tracking across multiple work orders\n\n${PROBLEM_DATA['cost-leakage'].stat3}.\n\nThe precision shops that consistently close jobs on budget track at the work order level, in real time. What's your current approach — and where do you see the most variance when jobs close?`,
  ],
}

const BUSINESS_OWNER_POSTS: Record<string, string[]> = {
  'machining-bottlenecks': [
    `If you run a precision machining operation, here's a question worth asking before your next high-complexity job releases:\n\n"What is the downstream consequence if this operation runs two days late?"\n\nIf the answer is "everything waiting behind it stops" — you have an unmanaged constraint.\n\n${PROBLEM_DATA['machining-bottlenecks'].stat1}.\n\nThe constraint map takes about an hour before job release. The five-week delay it prevents costs significantly more than that — in labor, in downstream idle capacity, and in the customer relationship.\n\nWe map machining sequences before jobs drop. It's not overhead — it's how we protect delivery commitments.`,
  ],
  'cost-leakage': [
    `Something I've learned running precision machining programs:\n\nThe margin doesn't disappear in one large event. It leaks out across dozens of small ones — setup time that wasn't coded to the job, tooling events that hit overhead, rework hours that absorbed into department variance instead of the originating work order.\n\n${PROBLEM_DATA['cost-leakage'].stat1}.\n\n12–22% of total program cost in a precision machining environment. On a $500,000 program, that's $60,000–$110,000 in cost that was incurred and cannot be explained at job close.\n\nThe shops that close jobs on budget aren't better at estimating. They track differently — at the job level, in real time, before the variance becomes irreversible.\n\nThat's the discipline that makes precision machining programs financially predictable.`,
  ],
  'precision-inconsistency': [
    `Something I see consistently in precision machining operations that struggle with part-to-part variation:\n\nThey assume the machine is controlling the quality.\n\n${PROBLEM_DATA['precision-inconsistency'].stat3}.\n\nSame machine. Different operator. Different shift. Different offset interpretation. Different dimensional result.\n\nThe machine is not the variable. The process is — specifically, the absence of a standardized work instruction that defines the fixture reference, the offset baseline, and the in-process measurement checkpoint.\n\nDocumenting that process doesn't slow production. It removes the variation that produces the 25–45% rejection rate increase from multi-operator programs — and the downstream assembly failures that trace back to it.`,
  ],
}

const RETARGETING_POSTS: Record<string, string[]> = {
  'machining-bottlenecks': [
    `Still dealing with precision machining throughput issues?\n\nMost CNC bottlenecks are upstream problems — built into the job at the planning stage, not at the machine.\n\n${PROBLEM_DATA['machining-bottlenecks'].cost1}. ${PROBLEM_DATA['machining-bottlenecks'].cost2}.\n\nPrecision Advanced Manufacturing maps operation sequences and constraint points before jobs release. We've helped operations teams eliminate recurring bottlenecks that were treated as inevitable.\n\nIf throughput and delivery reliability matter on your precision program — visit h2ojet.com or reach out directly.`,
  ],
  'tight-tolerance-failures': [
    `Still seeing tolerance non-conformance on your precision machined components?\n\n${PROBLEM_DATA['tight-tolerance-failures'].cost1}. ${PROBLEM_DATA['tight-tolerance-failures'].cost2}.\n\nMost tolerance failures are preventable at the in-process stage — before the batch is complete and the correction cost multiplies.\n\nPrecision Advanced Manufacturing runs structured in-process measurement protocols that catch dimensional deviations before they become delivery problems.\n\nIf tolerance performance on tight-spec programs is an issue — h2ojet.com.`,
  ],
  'production-delays': [
    `Still absorbing production delays on your precision machining programs?\n\n${PROBLEM_DATA['production-delays'].cost1}. ${PROBLEM_DATA['production-delays'].cost2}.\n\n72% of precision manufacturing overruns originate in the machining phase — in upstream planning gaps that compound into delivery misses.\n\nPrecision Advanced Manufacturing uses pre-production planning protocols that address setup readiness, material staging, and programming validation before jobs drop.\n\nIf delivery reliability on your precision programs needs to improve — h2ojet.com.`,
  ],
}

const PRACTICAL_TAKEAWAYS: Record<string, string> = {
  'machining-bottlenecks': 'Before releasing any high-complexity precision machining job, map every handoff in the operation sequence and ask: "What is the downstream consequence if this step runs two days late?" If the answer is "everything stops" — you have an unmanaged constraint that should be buffered or restructured before production begins.',
  'tight-tolerance-failures': 'Position a first-article CMM checkpoint before full production commits to the tooling offset. Cost: $200–$400 per event. This single checkpoint prevents the majority of tolerance failures that would otherwise be discovered at final inspection at 4–12x the correction cost.',
  'production-delays': 'Build a pre-production readiness checklist for every precision machining job: confirmed material staging, validated programming, resolved drawing questions, and a setup sequence reviewed against current floor capacity. Clearing this list before job release eliminates the upstream planning gaps that cause most CNC production delays.',
  'scrap-rework-cost': 'Track rework cost on closed jobs as both a quality metric and a financial metric. Calculate: (rework events × average hours per event × fully burdened labor rate) + (scrapped part count × average part cost) + (schedule impact in days × downstream idle cost). The combined figure — not just the quality rejection count — is the number that drives decisions.',
  'material-waste': 'When evaluating precision machining vendors for a high-alloy program, ask for their stock utilization rate on comparable programs. A shop running 5% waste versus one running 20% waste on titanium is quoting from a fundamentally different cost basis — even at identical alloy prices per pound.',
  'process-downtime': 'Ask your precision machining vendor for their preventive maintenance schedule and their average unplanned downtime hours per month. Calculate: (unplanned hours/month × $2,000/hour average throughput rate) = monthly throughput loss. That number should be part of the vendor evaluation, not just the quoted lead time.',
  'cost-leakage': 'Run a closed-job cost variance review on your last three precision machining programs. Compare actual setup hours to planned setup hours, actual tooling cost to quoted tooling, and rework hours to zero. Each variance points to a leakage source. The three most common: setup time uncoded to the work order, tooling events to overhead, and rework to department variance.',
  'precision-inconsistency': 'Implement a standardized work instruction for every tight-tolerance CNC operation that covers: the fixture reference point, the tool offset baseline and entry procedure, the in-process measurement checkpoint and frequency, and the decision rule for offset adjustment. This instruction should be printed and at the machine — not in a shared drive.',
  'scaling-operations': 'Before moving a precision machining program from prototype to production, run a scale-up readiness review covering: fixturing validation at production volume, tool life data from prototype runs, cycle time confirmation with multiple operators, and operator certification for the setup procedure. Each item on this list prevents a class of quality escapes or throughput bottlenecks that emerge predictably in the first 90 days of ramp.',
  'tool-wear-inefficiency': 'Set tool change intervals on tight-tolerance programs based on measured dimensional drift data — not catalog estimates. Run a new tool to the catalog change point, measure part size every 25 cycles, plot the drift, and identify the cycle count where the part size approaches the tolerance limit. Use that number as your change interval going forward.',
}

const DISCUSSION_QUESTIONS: Record<string, string> = {
  'machining-bottlenecks': 'What\'s the most unexpected place you\'ve found a throughput constraint in a precision machining program — and at what point in the production cycle was it discovered?',
  'tight-tolerance-failures': 'At what stage of your production process are tolerance failures most commonly detected — and what\'s the approximate cost differential between catching them there versus earlier in the operation?',
  'production-delays': 'What\'s the single upstream planning gap you\'ve seen cause the most recurring production delays in precision machining — and how did you close it?',
  'scrap-rework-cost': 'How does your team currently track rework cost on precision machining programs — and do you separate the schedule impact from the direct material and labor cost?',
  'material-waste': 'Have you ever compared your precision machining vendor\'s stock utilization rate to what the program should theoretically require? What did you find?',
  'process-downtime': 'What\'s the average unplanned downtime your precision machining operations absorbed last month — and do you track it against a throughput cost rate?',
  'cost-leakage': 'What\'s the biggest gap between your precision machining program estimates and actuals — and where in the job costing process does the variance first become visible?',
  'precision-inconsistency': 'What\'s your current approach to controlling part-to-part dimensional consistency across operator shifts — and how do you verify that the process is performing consistently between scheduled CMM events?',
  'scaling-operations': 'What\'s the most common quality or throughput problem that emerged in the first 90 days of your last precision machining production ramp — and was it visible in the prototype data?',
  'tool-wear-inefficiency': 'Are your tool change intervals on tight-tolerance programs based on catalog estimates or measured drift data — and what\'s your current breakage event frequency?',
}

const CTAS: string[] = [
  'If this matches what you\'re seeing on a current precision program — comment below or message us directly. We\'re happy to map it without a sales conversation.',
  'What\'s your current approach to this on your precision programs? Drop it in the comments — we\'re compiling real-world practices from operations teams.',
  'Tag a manufacturing engineer or plant manager who manages this type of program.',
  'Visit h2ojet.com for more on how Precision Advanced Manufacturing approaches this at the process level.',
  'Share this with your operations team if any of this reflects your current precision machining challenges.',
]

const REPURPOSING: string[] = [
  'Pull the educational post into a LinkedIn long-form article — the structure transfers directly and the operations director audience responds well to practical breakdowns.',
  'Convert the discussion prompt into a LinkedIn poll — precision manufacturing professionals engage with data-driven questions about their own operations.',
  'Use the practical takeaway as the body of a cold email to plant managers and operations directors at aerospace and medical device manufacturers.',
  'Extract the retargeting post as a Google Display or LinkedIn Sponsored Content ad — the financial exposure figures work as headline copy.',
  'Turn the short post into a Twitter/X single post — remove the Facebook-style paragraph breaks and tighten to the core stat and consequence.',
]

const IMPROVEMENT_SUGGESTIONS: Record<string, string[]> = {
  'machining-bottlenecks': [
    'Add a specific program type — multi-operation aerospace turning, 5-axis medical milling — to the short post to make the bottleneck scenario immediately recognizable.',
    'Include the pre-production constraint mapping checklist in the educational post so readers have a practical protocol to implement.',
    'Reference the cost of one hour of upstream planning versus five weeks of downstream delay to close the ROI argument in the short post.',
  ],
  'tight-tolerance-failures': [
    'Add the specific first-article inspection cost versus final-inspection remediation cost as dollar figures so readers can calculate their own exposure.',
    'Include a real tolerance example — ±0.001 bore on a turned component — to make the measurement requirement concrete in the educational post.',
    'Reference the in-process measurement frequency formula — first article plus every Nth part — as a practical takeaway for quality engineers.',
  ],
  'production-delays': [
    'Add the pre-production planning checklist items so readers have a direct action item: confirmed material, validated programming, resolved drawing questions, reviewed setup sequence.',
    'Include the downstream idle cost calculation broken down by operation type so plant managers can apply it to their specific program.',
    'Reference the communication protocol for when a machining delay should be reported to downstream operations — most teams discover it too late.',
  ],
  'scrap-rework-cost': [
    'Add a closed-job cost comparison — program with in-process gauging vs. without — using the scrap rate differential to anchor the financial impact.',
    'Include the rework cost formula (events × hours × rate + scrap parts × part cost) in the educational post so readers can calculate their own exposure.',
    'Reference the first-article inspection checkpoint explicitly — the step that eliminates most rework before full production begins.',
  ],
  'material-waste': [
    'Add an alloy-specific cost comparison — titanium versus aluminum — so readers can prioritize the waste reduction opportunity based on their material mix.',
    'Include the vendor evaluation question — "What is your stock utilization rate on comparable programs?" — in the educational post.',
    'Reference the CAM programming practice that drives the largest waste reduction to give readers a specific action to implement.',
  ],
  'process-downtime': [
    'Add the preventive maintenance schedule items for CNC machining centers so readers understand what a maintenance program actually includes.',
    'Include the ROI calculation comparing annual PM program cost to annual unplanned downtime cost — the numbers close the investment argument.',
    'Reference the utilization threshold (75%) where failure risk accelerates — most plant managers know they\'re above it.',
  ],
  'cost-leakage': [
    'Add the closed-job cost variance review format — the three questions it should answer — so operations directors have a specific audit protocol.',
    'Include the time-capture process that eliminates most untracked setup labor — a work-order-stamped operator log reviewed at job close.',
    'Reference the specific job type where cost leakage concentrates most predictably — high-mix, short-run programs with frequent setup changes.',
  ],
  'precision-inconsistency': [
    'Add the standardized work instruction elements — fixture reference, offset baseline, measurement checkpoint, decision rule — as a practical checklist.',
    'Include the shift handoff protocol: the three things that must be verified and documented at every setup transfer between operators.',
    'Reference the in-process measurement frequency that controls most operator-driven variation — and the cost of implementing it versus the cost of the rejection rate increase it prevents.',
  ],
  'scaling-operations': [
    'Add the scale-up readiness review checklist — fixturing validation, tool life data, cycle time confirmation, operator certification — as a practical action list.',
    'Include the documentation transfer items from prototype to production: setup sheets, first-article reports, tool offset baselines, control plans.',
    'Reference the 90-day bottleneck pattern with the specific upstream constraints that most commonly appear — so readers know what to look for.',
  ],
  'tool-wear-inefficiency': [
    'Add the dimensional drift measurement protocol — new tool baseline plus Nth-part checks plotted against the tolerance limit — so readers have a specific implementation path.',
    'Include the spindle load trending method as an early detection mechanism so readers understand what to monitor before drift reaches the tolerance band.',
    'Reference the cost comparison between a planned change and an unplanned breakage event — including all downstream costs — to close the investment argument.',
  ],
}

export function generateFacebook(inputs: FacebookInputs, seed: number = 0): FacebookOutput {
  const v = seed % 3
  const p = inputs.problem
  const fmt = inputs.contentFormat

  let primaryPost = ''

  if (fmt === 'short') {
    const posts = SHORT_POSTS[p] ?? SHORT_POSTS['machining-bottlenecks']
    primaryPost = posts[v] ?? posts[0]
  } else if (fmt === 'educational') {
    const posts = EDUCATIONAL_POSTS[p] ?? EDUCATIONAL_POSTS['cost-leakage']
    primaryPost = posts[v % posts.length] ?? posts[0]
  } else if (fmt === 'discussion') {
    const prompts = DISCUSSION_PROMPTS[p] ?? DISCUSSION_PROMPTS['machining-bottlenecks']
    primaryPost = prompts[v % prompts.length] ?? prompts[0]
  } else if (fmt === 'business-owner') {
    const boPosts = BUSINESS_OWNER_POSTS[p] ?? BUSINESS_OWNER_POSTS['cost-leakage']
    primaryPost = boPosts[v % boPosts.length] ?? boPosts[0]
  } else if (fmt === 'retargeting') {
    const retargetPosts = RETARGETING_POSTS[p] ?? RETARGETING_POSTS['machining-bottlenecks']
    primaryPost = retargetPosts[v % retargetPosts.length] ?? retargetPosts[0]
  }

  const practicalTakeaway = PRACTICAL_TAKEAWAYS[p] ?? PRACTICAL_TAKEAWAYS['machining-bottlenecks']
  const discussionQuestion = DISCUSSION_QUESTIONS[p] ?? DISCUSSION_QUESTIONS['machining-bottlenecks']
  const cta = CTAS[v % CTAS.length]
  const improvements = IMPROVEMENT_SUGGESTIONS[p] ?? IMPROVEMENT_SUGGESTIONS['machining-bottlenecks']
  const label = PROBLEM_LABELS[p] ?? 'Machining Bottlenecks'

  const qualityScore = scoreContent(inputs, true, true, true, primaryPost.split(' ').length)

  return {
    platform: 'facebook',
    primaryPost,
    practicalTakeaway: `Practical takeaway for ${label.toLowerCase()}: ${practicalTakeaway}`,
    cta,
    discussionQuestion,
    repurposingSuggestions: REPURPOSING.slice(0, 3),
    qualityScore,
    improvementSuggestions: improvements.slice(0, 3),
  }
}
