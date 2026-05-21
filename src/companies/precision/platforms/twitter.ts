import type { TwitterInputs, TwitterOutput } from '../types'
import { PROBLEM_DATA } from '../lib/companyProfile'
import { scoreContent } from '../lib/scoring'

const SINGLE_POSTS: Record<string, string[]> = {
  'machining-bottlenecks': [
    `Most CNC programs don't bottleneck at the spindle.\n\nThey bottleneck at setup sequencing, fixture staging, or programming gaps — decisions made before the job dropped.\n\n${PROBLEM_DATA['machining-bottlenecks'].stat1}.\n\nThe constraint was built in. The machine just revealed it.`,
    `The throughput problem in your machining program is upstream of where your team is looking.\n\n${PROBLEM_DATA['machining-bottlenecks'].stat2}.\n\nEvery additional operation in sequence adds a handoff. Every handoff is a potential stall point.\n\nMapping the constraint before job release is not overhead. It's how you prevent a 5-week delay.`,
    `${PROBLEM_DATA['machining-bottlenecks'].stat3}.\n\nOne constrained step stops the sequence. Six downstream operations wait. The delivery date moves.\n\nMost of this is preventable — if the constraint was identified before the first cut, not during week three.`,
  ],
  'tight-tolerance-failures': [
    `Tolerance failures at final inspection cost 4–12x more to correct than those caught in-process.\n\nMost precision shops still position primary inspection at the end of the line.\n\n${PROBLEM_DATA['tight-tolerance-failures'].stat1}.\n\nThe inspection placement is the cost driver — not the part geometry.`,
    `1 in 5 complex assemblies fails fit because of one machined component out of tolerance.\n\n${PROBLEM_DATA['tight-tolerance-failures'].stat2}.\n\nThe assembly team reports it. The machining process — three operations ago — created it.\n\nIf your QC process can't catch it in-process, you're paying the 12x rate every time.`,
    `${PROBLEM_DATA['tight-tolerance-failures'].stat3}.\n\nThe failure isn't random. It's the output of a measurement process that inspects too late to act cheaply.\n\n4–12x cost multiplier at final inspection. That's not a quality stat — it's a financial one.`,
  ],
  'production-delays': [
    `72% of precision manufacturing schedule overruns originate in the machining phase.\n\nNot in finishing. Not in assembly.\n\n${PROBLEM_DATA['production-delays'].stat2}.\n\nThe schedule was lost before downstream operations ever started. Most teams don't trace it back.`,
    `${PROBLEM_DATA['production-delays'].stat1}.\n\nA 30% timeline extension on a 12-week precision program is 3–4 weeks of downstream exposure.\n\nAt $3,000/day per idle operation — with three operations waiting — that's a $189,000 problem.\n\nAll of it traces back to setup planning and material staging decisions made pre-production.`,
    `The machining vendor confirmed 4 weeks.\n\nAt week 3 they said 6.\n\n${PROBLEM_DATA['production-delays'].stat2}.\n\nDownstream idle cost was already running before the conversation happened.\n\nThe delay didn't start at week 3. It started in the planning assumptions that were never pressure-tested.`,
  ],
  'scrap-rework-cost': [
    `Rework in precision machining has three costs:\n\n1. The material\n2. The direct labor\n3. The schedule impact on every part waiting behind it\n\nMost programs track the first one.\n\n${PROBLEM_DATA['scrap-rework-cost'].stat1}.\n\nThe third cost is almost always the largest.`,
    `${PROBLEM_DATA['scrap-rework-cost'].stat3}.\n\nSame alloy. Same tooling. 3–5x different scrap rate.\n\nThe difference is in-process measurement discipline — not material quality or machine capability.\n\nThe scrap problem is a process problem wearing a quality label.`,
    `${PROBLEM_DATA['scrap-rework-cost'].stat2}.\n\nSix to fourteen hours per rework event. On a program with a hard delivery date, those hours aren't in the schedule.\n\nMost rework in precision machining is preventable at the first-article stage — before full production commits to the same tooling offset.`,
  ],
  'material-waste': [
    `There is material waste in most precision machining quotes.\n\nIt's not a line item.\n\nIt's priced into stock cost by the shop that already knows their utilization rate.\n\n${PROBLEM_DATA['material-waste'].stat1}.\n\nOn a titanium program, that percentage is not rounding error. It's a budget line nobody labeled.`,
    `Two shops quote the same precision part.\n\nSame alloy. Same tolerances. 15% price difference.\n\nThe delta is usually toolpath efficiency and stock utilization — not material cost.\n\n${PROBLEM_DATA['material-waste'].stat3}.\n\nThe shop wasting 20% quotes from a fundamentally different cost basis.`,
    `${PROBLEM_DATA['material-waste'].stat2}.\n\nOn a 2,000-pound titanium billet program with 18% waste — that's $16,200 in material purchased, machined down, and discarded.\n\nIt appeared in the quote as "material cost." Nobody labeled it as waste. The customer absorbed it.`,
  ],
  'process-downtime': [
    `CNC downtime doesn't stop one job.\n\nIt stops the queue.\n\n${PROBLEM_DATA['process-downtime'].stat1}.\n\nEvery job waiting in sequence shifts on the delivery calendar. The cascade is immediate and the financial exposure compounds hourly.`,
    `${PROBLEM_DATA['process-downtime'].stat2}.\n\n45–65% more unplanned downtime without a maintenance program.\n\nThat differential is in your lead times. Your customers are absorbing it as schedule variance — whether the vendor tells them or not.`,
    `A CNC machining center averaging 10 unplanned downtime hours per month at $2,000/hour:\n\n$20,000/month\n$240,000/year\n\nNone of it shows up in a maintenance report. It shows up in late deliveries and expedite charges.\n\n${PROBLEM_DATA['process-downtime'].stat3}.`,
  ],
  'cost-leakage': [
    `Precision machining programs lose margin in three places most job costing systems don't capture:\n\n1. Setup time not coded to the work order\n2. Tooling attrition charged to overhead\n3. Rework absorbed as department variance\n\n${PROBLEM_DATA['cost-leakage'].stat1}.\n\nThe variance shows up when the job closes. The cause was invisible the entire time.`,
    `${PROBLEM_DATA['cost-leakage'].stat2}.\n\n18–35% of total labor in untracked setup time.\n\nAt $85/hour fully burdened, that's $88,000/year for an operation running 20 hours of unlogged setup per week.\n\nThe number exists. Nobody labeled it.`,
    `2.5–4x more budget overruns without real-time job cost visibility.\n\nThe shops that close jobs on budget aren't luckier.\n\nThey track differently.\n\n${PROBLEM_DATA['cost-leakage'].stat3}.\n\nThe tracking gap is not a system limitation. It's a process decision.`,
  ],
  'precision-inconsistency': [
    `Same machine. Same alloy. Same program.\n\nDifferent operator. Different shift. Different result.\n\n${PROBLEM_DATA['precision-inconsistency'].stat3}.\n\nPrecision inconsistency is not a machine problem. It's a process standardization problem — and it compounds with every shift that runs without a documented anchor.`,
    `${PROBLEM_DATA['precision-inconsistency'].stat1}.\n\n25–45% higher rejection rates from multi-operator variation.\n\nIn a 1,000-part run, that's 250–450 additional non-conformances driven not by machine failure — but by offset interpretations and measurement practices that vary between shifts.`,
    `15–30% of downstream assembly fit failures trace back to machining inconsistency.\n\nThe assembly team files the report. The machining process created the problem.\n\n${PROBLEM_DATA['precision-inconsistency'].stat3}.\n\nThe documentation gap is not overhead. It's the mechanism that controls part-to-part quality across shifts.`,
  ],
  'scaling-operations': [
    `Scaling a precision machining program doesn't multiply output.\n\nIt multiplies whatever is already in the process.\n\nIf the process has variation, scaling multiplies variation.\nIf it has waste, scaling multiplies waste.\n\n${PROBLEM_DATA['scaling-operations'].stat1}.\n\n40–70% more quality escapes at volume. The prototype ran clean. The process was never validated for scale.`,
    `${PROBLEM_DATA['scaling-operations'].stat3}.\n\n65–80% of CNC scale-ups hit throughput bottlenecks within 90 days.\n\nMost were identifiable before the ramp started — if anyone mapped the upstream constraints before production volume began.\n\nMost don't.`,
    `The prototype ran one part with one operator and full engineering support.\n\nThe production run introduced three operators, a fixed cycle time target, and no additional engineering bandwidth.\n\n${PROBLEM_DATA['scaling-operations'].stat2}.\n\n20–45% cycle time variance per unit. The estimate was based on prototype data. The actuals were not.`,
  ],
  'tool-wear-inefficiency': [
    `Tool wear in precision machining is silent until it isn't.\n\nThe part looks correct for 80% of tool life.\n\nThen dimensional drift exceeds the tolerance band.\n\n${PROBLEM_DATA['tool-wear-inefficiency'].stat1}.\n\nBy the time it's detected at inspection — the batch is already non-conforming.`,
    `${PROBLEM_DATA['tool-wear-inefficiency'].stat2}.\n\n20–40% more breakage events without structured tool life management.\n\nEvery breakage during a live cut means:\n— Immediate machine stop\n— Scrap evaluation on in-process part\n— 2–4 hour diagnostic cycle\n\nThe planned tool change costs the tool. The unplanned breakage costs all of that plus delivery.`,
    `Shops manage tool life based on catalog estimates.\n\nParts reject based on actual dimensional drift data.\n\nThose are different numbers.\n\n${PROBLEM_DATA['tool-wear-inefficiency'].stat1}.\n\n0.002–0.008 inches per interval. In a ±0.001 tolerance program, the catalog estimate is not a control mechanism — it's a starting point for measurement.`,
  ],
}

const THREADS: Record<string, string[][]> = {
  'machining-bottlenecks': [
    [
      "Most precision machining programs have a throughput bottleneck that was built in before the job dropped.\n\nHere's where it comes from and what it costs:\n\n🧵",
      `The constraint is almost never at the machine that's running slowest.\n\nIt's upstream — in setup sequencing, fixture staging, or programming decisions that weren't validated before production started.\n\n${PROBLEM_DATA['machining-bottlenecks'].stat1}.`,
      `When one operation in a multi-step sequence stalls — everything behind it waits.\n\n${PROBLEM_DATA['machining-bottlenecks'].stat3}.\n\nThe downstream operations don't pause efficiently. They idle, work out of sequence, or create rework trying to keep moving.`,
      `${PROBLEM_DATA['machining-bottlenecks'].stat2}.\n\nEvery additional handoff in a machining program adds a potential failure point.\n\nThe coordination overhead grows faster than most shops' capacity to manage it.`,
      `Financial exposure:\n\n${PROBLEM_DATA['machining-bottlenecks'].cost1}.\n${PROBLEM_DATA['machining-bottlenecks'].cost2}.\n\nThree downstream assembly operations idle at $3,000/day for two weeks = $126,000.\n\nNone of it shows up as a "machining cost" on the budget report.`,
      `What high-performance precision shops do differently:\n\n— They map the full operation sequence before job release\n— They identify constraint points in setup and staging, not just cycle time\n— They position capacity buffers at the constraint, not uniformly across the program`,
      `The question that predicts whether a machining program will bottleneck:\n\n"What happens if this operation runs two days late?"\n\nIf the answer is "nothing downstream can start" — you have an unmanaged constraint.\n\nMap it before it costs you five weeks.`,
    ],
    [
      "A machining bottleneck that costs $126,000 in downstream exposure doesn't start at the machine.\n\nIt starts at the planning table.\n\nHere's the full breakdown:\n\n🧵",
      `Setup sequencing is where most precision machining programs lose throughput before a single chip hits the floor.\n\n${PROBLEM_DATA['machining-bottlenecks'].stat1}.\n\nThe delay is not in the machining. It's in the assumptions that were made about setup readiness.`,
      `${PROBLEM_DATA['machining-bottlenecks'].stat2}.\n\nEvery additional vendor or operation in a machining sequence adds communication surface.\n\nEvery surface is a potential stall point that the downstream program depends on.`,
      `When the constraint clears — everyone rushes.\n\nRushed precision machining produces out-of-tolerance parts.\n\nNow the bottleneck has a rework tail.\n\n${PROBLEM_DATA['machining-bottlenecks'].stat3}.`,
      `${PROBLEM_DATA['machining-bottlenecks'].cost2}.\n\nThe PM tracking floor progress often learns about the bottleneck after it's been running for two weeks.\n\nBy then the downstream impact is locked in.`,
      `The fix is upstream — before job release:\n\n1. Map every handoff in the machining sequence\n2. Identify which steps are on the critical path\n3. Validate setup readiness before production begins\n4. Buffer the constraint — not the whole program`,
      `The question most precision programs skip:\n\n"Where is the constraint in this operation sequence — and what is the downstream cost if it slips three days?"\n\nIf you haven't answered that before the job drops — you'll answer it in a delay conversation instead.`,
    ],
  ],
  'tight-tolerance-failures': [
    [
      "Most precision machining programs catch tolerance failures at the wrong point in the process.\n\nHere's what that costs — and how to fix the inspection placement:\n\n🧵",
      `Final inspection is not a quality strategy. It's a detection strategy.\n\n${PROBLEM_DATA['tight-tolerance-failures'].stat2}.\n\nBy the time a tolerance failure surfaces at final inspection — the part has already been machined, deburred, cleaned, and staged. Correction means starting over on schedule time that wasn't allocated.`,
      `${PROBLEM_DATA['tight-tolerance-failures'].stat1}.\n\n8–18% rejection for tolerance non-conformance in shops without first-article inspection.\n\nIn a 500-part program, that's 40–90 pieces requiring re-evaluation before shipping.`,
      `${PROBLEM_DATA['tight-tolerance-failures'].stat3}.\n\n1 in 5 complex assemblies fails fit because of one machined component.\n\nThe assembly engineer discovers it. The machining process — three operations ago — created it.`,
      `Financial exposure:\n\n${PROBLEM_DATA['tight-tolerance-failures'].cost1}.\n${PROBLEM_DATA['tight-tolerance-failures'].cost2}.\n\nOn a complex aerospace component at $800 average cost:\n— In-process detection: $200–$400 per event\n— Final inspection detection: $3,200–$9,600 per event`,
      `The in-process checkpoint that prevents most tolerance failures:\n\n— First-article CMM report before full production commits to the tooling offset\n— In-process measurement at defined intervals (every 25th part, for example)\n— A decision rule for offset adjustment tied to the measurement result`,
      `The question that separates high-performance precision shops from the rest:\n\n"At what point in our process can we detect a tolerance deviation for the lowest correction cost?"\n\nIf the answer is "at final inspection" — the detection is too late and the cost is 4–12x what it should be.`,
    ],
  ],
  'production-delays': [
    [
      "72% of precision manufacturing schedule overruns originate in the machining phase.\n\nHere's the full financial picture — and where the delay was actually created:\n\n🧵",
      `The machining delay is never the final cost.\n\n${PROBLEM_DATA['production-delays'].stat2}.\n\nWhen three downstream operations idle at $3,000/day for three weeks — the total exposure reaches $189,000.\n\nNone of it is labeled as "machining delay cost" in the budget report.`,
      `${PROBLEM_DATA['production-delays'].stat1}.\n\nA 30% timeline extension on a 12-week program is 3–4 weeks.\n\nIn contract manufacturing environments, those weeks carry real financial consequences at every tier of the supply chain.`,
      `${PROBLEM_DATA['production-delays'].stat3}.\n\nThe schedule was lost before finishing and assembly started.\n\nMost operations teams don't trace the overrun back to the machining phase — because by the time it's visible, the conversation is about recovery, not root cause.`,
      `Where machining delays actually come from:\n\n— Unresolved drawing questions held until job release\n— Material not staged before the job dropped\n— Programming not validated against first-article results\n— Setup sequence not reviewed against available fixture capacity`,
      `What the planning window before job release should include:\n\n1. Confirmed material availability and staging\n2. Validated programming for first operation\n3. Resolved tolerance questions and feature callouts\n4. Setup sequence mapped against current floor capacity\n5. First-article plan with decision authority identified`,
      `The machining program is late. Three trades are idle.\n\nThe question everyone is asking is "how do we recover?"\n\nThe question that should have been asked six weeks earlier:\n\n"Are we ready to release this job without creating a delay?"`,
    ],
  ],
  'cost-leakage': [
    [
      "Precision machining programs leak 12–22% of total program cost through three gaps most job costing systems don't capture.\n\nHere's where the money goes:\n\n🧵",
      `Gap #1: Setup time not coded to the work order.\n\n${PROBLEM_DATA['cost-leakage'].stat2}.\n\n18–35% of total labor consumed by setup time that hits department overhead instead of the job.\n\nAt $85/hour fully burdened, 20 hours of untracked setup per week = $88,000/year that nobody named.`,
      `Gap #2: Tooling attrition charged to overhead.\n\nTool changes, broken inserts, and unplanned tooling events that don't get coded to the job they happened on.\n\nEvery time this occurs, the work order closes under-cost — and the overhead bucket absorbs what the customer should have been charged for, or the shop should have priced in.`,
      `Gap #3: Rework hours absorbed as department variance.\n\n${PROBLEM_DATA['cost-leakage'].stat1}.\n\nRework that isn't coded to a job doesn't appear in the program cost. It appears in the department variance — which gets distributed across all jobs and inflates overhead rather than identifying the specific program where the cost was incurred.`,
      `${PROBLEM_DATA['cost-leakage'].stat3}.\n\n2.5–4x more budget overruns without real-time cost visibility.\n\nThe gap is not a software problem. It's a process discipline problem — whether or not there's a system in place to capture it.`,
      `What job-level cost tracking looks like in high-performance precision shops:\n\n— Time stamped to work order, not department\n— Tooling events logged per job\n— Rework coded to the originating work order\n— Variance reviewed at job close, not quarter close`,
      `The precision machining programs that close on budget are not better at estimating.\n\nThey're better at tracking.\n\nThe estimate is a plan. The tracking system is what makes the plan financially accountable.`,
    ],
  ],
  'tool-wear-inefficiency': [
    [
      "Tool wear in precision machining is the silent quality failure.\n\nThe part looks correct — until it doesn't.\n\nHere's the full cost picture:\n\n🧵",
      `${PROBLEM_DATA['tool-wear-inefficiency'].stat1}.\n\n0.002–0.008 inches of dimensional drift per tool interval.\n\nIn a ±0.001 tolerance program, that drift doesn't produce a gradual trend on the CMM report.\n\nIt produces a hard rejection — after the batch has already run.`,
      `The drift is not linear. A tool can perform within acceptable limits for 80% of its rated catalog life — then drift 0.005 inches in the final 20%.\n\nOperators running to catalog estimates are running through the performance cliff without a measurement anchor.`,
      `${PROBLEM_DATA['tool-wear-inefficiency'].stat2}.\n\n20–40% more tool breakage events without structured life management.\n\nEvery breakage during a live precision cut means:\n— Immediate machine stop\n— Scrap evaluation on in-process part\n— 2–4 hour diagnostic cycle before production resumes`,
      `${PROBLEM_DATA['tool-wear-inefficiency'].stat3}.\n\nPremature failure during an active precision cut averages 2–4 unplanned diagnostic hours — plus the inspection overhead for every part machined during the tool's degraded performance window.`,
      `What data-driven tool life management looks like:\n\n— Spindle load trending per operation to detect wear before it reaches the tolerance limit\n— In-process dimensional check at defined intervals (every 50 parts, for example)\n— A change interval based on measured drift rate, not catalog estimate\n— Formal breakage event log coded to the affected work order`,
      `The question that separates precision shops managing tool life from those reacting to it:\n\n"At what cycle count does dimensional drift on this operation approach the tolerance limit?"\n\nIf the answer is "we use the catalog number" — you're running on an estimate, not a control mechanism.`,
    ],
  ],
}

const CONTRARIAN_TAKES: Record<string, string> = {
  'machining-bottlenecks': `Unpopular take: most machining throughput problems are not machine capacity problems.\n\nThey're sequencing problems. Planning problems. Fixture availability problems.\n\nBuying a new machining center when your job sequencing isn't optimized is like widening a highway that feeds into an unmanaged intersection.\n\n${PROBLEM_DATA['machining-bottlenecks'].stat2}.\n\nFix the upstream process first. The machine is rarely the constraint.`,
  'tight-tolerance-failures': `Unpopular take: end-of-line inspection is not a quality program.\n\nIt's a defect sorting program. You're not preventing failures — you're finding them at the most expensive point possible.\n\n${PROBLEM_DATA['tight-tolerance-failures'].stat2}.\n\n4–12x the correction cost at final inspection versus in-process.\n\nEvery dollar spent on in-process gauging returns 4–12 dollars in prevented rework. The ROI is not close.`,
  'production-delays': `Unpopular take: most CNC production delays are not vendor problems.\n\nThey're buyer planning problems that show up as vendor failures.\n\nUnresolved drawing questions. Material not staged. Programming not validated.\n\n${PROBLEM_DATA['production-delays'].stat3}.\n\n72% of overruns originate in the machining phase — where the upstream planning decisions are made, not just executed.`,
  'scrap-rework-cost': `Unpopular take: scrap rate is not a quality metric.\n\nIt's a cost metric that gets reported in quality terms.\n\n${PROBLEM_DATA['scrap-rework-cost'].stat1}.\n\n6–14% of total production cost. That belongs in the financial review — not the quality dashboard — because that's the only place where the actual consequence is visible.`,
  'material-waste': `Unpopular take: material cost in precision machining is not just a market price problem.\n\nA significant portion of it is a programming discipline problem.\n\n${PROBLEM_DATA['material-waste'].stat3}.\n\nThe shop wasting 20% of titanium input is quoting you from a fundamentally different cost basis than the shop wasting 5% — even if they buy from the same mill at the same price per pound.`,
  'process-downtime': `Unpopular take: high utilization in a CNC shop is not always a sign of efficiency.\n\nAbove 75% utilization without a preventive maintenance protocol, it's a sign of accumulated failure risk.\n\n${PROBLEM_DATA['process-downtime'].stat3}.\n\n8–15 unplanned downtime hours per month at high utilization. The shop looks busy. The deliveries slip. The connection is rarely made in the report.`,
  'cost-leakage': `Unpopular take: most precision machining cost overruns are not caused by bad estimates.\n\nThey're caused by tracking gaps that make actual cost invisible until the job closes.\n\n${PROBLEM_DATA['cost-leakage'].stat3}.\n\n2.5–4x more overruns without real-time cost visibility. The estimate was fine. The tracking system let the variance accumulate without triggering a decision.`,
  'precision-inconsistency': `Unpopular take: precision inconsistency is not an operator training problem.\n\nYou can't train your way out of a process that doesn't control the variables.\n\n${PROBLEM_DATA['precision-inconsistency'].stat3}.\n\n3–6x more dimensional variance without standardized work instructions. The operators are not the variable. The process is. Fix the process — not the people.`,
  'scaling-operations': `Unpopular take: prototype success is not evidence of production readiness.\n\nThe prototype succeeded because one skilled operator had full engineering support and unlimited setup time.\n\nProduction success requires that the process works without all three of those advantages.\n\n${PROBLEM_DATA['scaling-operations'].stat1}.\n\n40–70% more quality escapes at volume. The prototype was proof of concept — not proof of process.`,
  'tool-wear-inefficiency': `Unpopular take: catalog tool life estimates are not a control mechanism for tight-tolerance machining.\n\nThey're a starting point for measurement.\n\n${PROBLEM_DATA['tool-wear-inefficiency'].stat1}.\n\nDimensional drift varies by alloy, feed rate, depth of cut, coolant, and spindle condition. The catalog number accounts for none of your specific conditions.\n\nRun to measured drift data — not estimated cycles.`,
}

const FOUNDER_POSTS: Record<string, string> = {
  'machining-bottlenecks': `Something I've seen repeatedly in precision machining programs:\n\nThe throughput constraint was visible at job planning — but nobody was looking for it there.\n\nBy the time it surfaced on the floor, three downstream operations were already waiting.\n\n${PROBLEM_DATA['machining-bottlenecks'].stat1}.\n\nThe most valuable thing a precision shop can do before releasing a high-complexity job:\n\nMap every handoff in the operation sequence. Identify which step has the narrowest capacity margin. Ask what happens downstream if that step slips two days.\n\nIf the answer is "everything stops" — you have an unmanaged constraint.\n\nThat conversation costs an hour. The alternative costs five weeks.`,
  'tight-tolerance-failures': `Something I see consistently across precision machining programs:\n\nInspection is positioned where it's convenient — not where it's cheapest.\n\n${PROBLEM_DATA['tight-tolerance-failures'].stat2}.\n\nThe in-process measurement checkpoint that catches a deviation costs $200–$400 to execute.\n\nThe same deviation caught at final inspection costs $3,200–$9,600 to resolve.\n\nBoth numbers are known. Most programs still default to final inspection because it's "less disruptive to the process."\n\nThe math doesn't support that choice. And the programs that consistently hit quality targets have made a different one.`,
  'production-delays': `Something I see in almost every precision manufacturing delay I've reviewed:\n\nThe delay didn't start when it was reported. It started in the pre-production window — in assumptions about setup readiness, material staging, and programming that nobody validated before the job dropped.\n\n${PROBLEM_DATA['production-delays'].stat3}.\n\nThe most predictable production delays have a common upstream signature:\n\n— Drawing questions that weren't resolved before job release\n— Material staged after the planned start, not before\n— Programming released to the floor without first-article validation\n\nEach of these is manageable. None of them require more budget — just a pre-production checklist and someone accountable for clearing it before the job runs.`,
  'cost-leakage': `Something I notice in precision machining operations that consistently close jobs on budget:\n\nThey don't estimate better than everyone else.\n\nThey track differently.\n\n${PROBLEM_DATA['cost-leakage'].stat3}.\n\nThe variance isn't random. It accumulates in the same three places every time — setup time that doesn't hit the work order, tooling events that go to overhead, rework that gets absorbed into department variance.\n\nOnce you see where the leakage is, it's not hard to capture. The hard part is building the discipline to capture it before the job closes — not after the margin is already gone.`,
  'tool-wear-inefficiency': `Something I see repeatedly in precision machining programs that struggle with batch rejections:\n\nThey're managing tool life based on catalog estimates.\n\nParts are rejecting based on actual dimensional drift data.\n\nThose are different numbers — for every alloy, every spindle condition, every feed and speed combination.\n\n${PROBLEM_DATA['tool-wear-inefficiency'].stat1}.\n\nThe fix isn't buying better tools. It's building a change interval based on measured drift rate on your actual program — not on the tool manufacturer's general guidance.\n\nOne in-process dimensional check at a defined interval gives you the data. The catalog gives you a starting point. Reject rates give you the consequence of confusing the two.`,
}

const QUOTE_RESPONSES: Record<string, string> = {
  'machining-bottlenecks': `Worth adding: the bottleneck in most CNC programs isn't at the machine with the lowest utilization — it's at the handoff that nobody mapped before the job dropped.\n\n${PROBLEM_DATA['machining-bottlenecks'].stat2}.\n\nConstraint analysis before job release catches this. Most shops do it after the delay is already confirmed.`,
  'tight-tolerance-failures': `This is the inspection placement problem. The measurement checkpoint that catches the deviation for $300 is in-process. The same checkpoint at final inspection costs $3,000–$9,600.\n\n${PROBLEM_DATA['tight-tolerance-failures'].stat2}.\n\nMost programs optimize for process flow — not inspection ROI. The cost of that choice is 4–12x per defect event.`,
  'production-delays': `The part that's missing from most delay post-mortems: where in the pre-production window did the constraint first appear?\n\n${PROBLEM_DATA['production-delays'].stat3}.\n\n72% of overruns originate in machining. But the cause is almost always an upstream planning decision — not a machining execution failure.`,
  'cost-leakage': `The tracking gap is the real problem here. Not the cost itself — but the fact that it accumulates invisibly until the job closes.\n\n${PROBLEM_DATA['cost-leakage'].stat3}.\n\n2.5–4x more overruns without real-time visibility. The estimate was probably fine. The tracking system just didn't surface the variance until it was too late to act on it.`,
  'tool-wear-inefficiency': `The catalog life estimate is not a control mechanism for tight tolerances — it's a starting point.\n\n${PROBLEM_DATA['tool-wear-inefficiency'].stat1}.\n\n0.002–0.008 inch drift per interval means your change interval needs to be anchored to a measured dimensional check — not a cycle count from the manufacturer's general guidance.`,
}

const ALTERNATE_HOOKS: Record<string, string> = {
  'machining-bottlenecks': 'The throughput constraint you\'re managing at the floor was created at the planning table. Here\'s the sequence that causes it every time.',
  'tight-tolerance-failures': 'Your rejection rate is not a machining problem. It\'s where in the process your team positioned the inspection checkpoint.',
  'production-delays': 'The CNC job is behind schedule. Three downstream operations are idle. The question isn\'t "how do we recover?" — it\'s "where was this delay created?"',
  'scrap-rework-cost': 'Rework in precision machining carries three costs. Most programs recognize one. The third — schedule impact — is almost always the largest.',
  'material-waste': 'The material cost line in most precision machining quotes includes waste the customer never asked for and can\'t see.',
  'process-downtime': 'Your machining center isn\'t just down for maintenance. It\'s down for a predictable, preventable failure that a $200 PM protocol would have avoided.',
  'cost-leakage': 'The precision machining program closed 20% over budget. The estimate wasn\'t wrong — the tracking system just couldn\'t surface the variance until it was too late.',
  'precision-inconsistency': 'The same machine produces different dimensional results on different shifts. That\'s not a calibration problem — it\'s a process standardization gap.',
  'scaling-operations': 'The prototype ran clean. The production ramp produced 40% more quality escapes. The difference is not the part — it\'s the process assumptions that only work at one unit.',
  'tool-wear-inefficiency': 'Your tool change intervals are based on catalog estimates. Your parts are rejecting based on actual drift data. Those are different numbers — and the gap is what\'s driving your batch failures.',
}

const ENGAGEMENT_QUESTIONS: Record<string, string> = {
  'machining-bottlenecks': 'Where did your last CNC throughput bottleneck actually originate — at the machine or upstream in setup and sequencing? And did you trace it back to the planning decision that created it?',
  'tight-tolerance-failures': 'At what point in your production process are tolerance failures typically caught — in-process, at final inspection, or post-delivery? What\'s the cost differential between those detection points in your environment?',
  'production-delays': 'What percentage of your precision machining schedule overruns trace back to the machining phase versus finishing or assembly? Do you track the downstream idle cost when machining runs late?',
  'scrap-rework-cost': 'How does your team track rework cost on closed precision machining jobs — as a quality metric, a financial metric, or both? Do you capture the downstream schedule impact separately?',
  'material-waste': 'Have you asked your precision machining vendors for their stock utilization rate on comparable programs? What would a 5% versus 20% waste rate mean for your material budget on your current program?',
  'process-downtime': 'How many unplanned CNC downtime hours did your machining operations absorb last month? Do you track that number against a throughput cost rate — or just against maintenance labor?',
  'cost-leakage': 'What percentage of your precision machining program costs are tracked at the job level versus absorbed into overhead? When did you last run a closed-job cost variance review?',
  'precision-inconsistency': 'How consistent is part-to-part dimensional quality across operator shifts on your current production programs? Have you measured the variance — or is it tracked only when a customer raises a quality concern?',
  'scaling-operations': 'What does your scale-up readiness review look like before a precision machining program moves from prototype to production? What documents transfer between phases?',
  'tool-wear-inefficiency': 'Are your tool change intervals on tight-tolerance programs based on measured dimensional drift data or manufacturer catalog estimates? What\'s your breakage event frequency per month?',
}

const CTAS: Record<string, string> = {
  single: "If this applies to your precision program — reply with your program type and I\'ll outline where this exposure concentrates in your environment.",
  thread: "That\'s the full breakdown. If any of this applies to your precision machining operation — drop the program type in the replies.",
  contrarian: "What\'s the assumption in your machining program you haven\'t pressure-tested yet?",
  founder: "If you\'re managing a precision machining program dealing with any of this — DM me. Happy to map it without a sales conversation.",
  'quote-response': "What\'s been your experience with this in your precision manufacturing environment?",
}

const REPURPOSING: string[] = [
  'Expand the thread into a LinkedIn long-form post — replace the Twitter line breaks with paragraph structure and add the Business Impact section for the operations director audience.',
  'Extract the contrarian take as a standalone LinkedIn hook — it performs well as an opening line for a longer post on process discipline.',
  'Use the engagement question as a cold outreach opener for manufacturing engineers and plant managers at precision machining customers.',
  'Convert the founder post into a YouTube 60–90s script — the structure maps directly to the hook, problem, insight, resolution format.',
  'Extract the financial stats from the thread into an Instagram carousel slide sequence — one stat per slide with on-screen context.',
]

const IMPROVEMENT_SUGGESTIONS: Record<string, string[]> = {
  'machining-bottlenecks': [
    'Add a specific program type — aerospace 5-axis turning, multi-op medical component — to ground the bottleneck scenario in a recognizable context for the manufacturing engineering audience.',
    'Include the exact upstream mapping question that surfaces constraints before job release so followers have a practical takeaway.',
    'Quantify the cost of a pre-production constraint review ($500–$1,000 in labor) versus the cost of a five-week delay to close the ROI argument directly.',
  ],
  'tight-tolerance-failures': [
    'Add a specific tolerance example — ±0.001 bore on a turned component in 17-4 stainless — to anchor the in-process measurement requirement.',
    'Include the first-article CMM cost versus final-inspection rework cost as specific numbers so the 4–12x multiplier translates into real dollar amounts.',
    'Reference the in-process measurement interval formula — every Nth part based on demonstrated drift rate — so followers have a protocol to apply.',
  ],
  'production-delays': [
    'Add the pre-production planning checklist that eliminates most machining delays so followers have a direct action item.',
    'Include the stakeholder communication point — when a machining delay should be reported to downstream operations and what information should accompany it.',
    'Quantify the planning investment (hours) versus the downstream delay cost ($189,000) to make the ROI of pre-production discipline concrete.',
  ],
  'scrap-rework-cost': [
    'Add a specific rework scenario — off-tolerance bore requiring remachining, re-inspection, and recertification — to make the 6–14 hour figure relatable.',
    'Include the scrap rate benchmark for a well-run precision shop (2–4%) versus the industry average (6–14%) so followers have a performance target.',
    'Reference the in-process checkpoint that eliminates most rework and the approximate cost of implementing it versus the rework it prevents.',
  ],
  'material-waste': [
    'Add the specific CAM programming practice that drives the largest waste reduction — and what "structured toolpath planning" actually means in practice.',
    'Include an alloy-specific cost comparison — titanium versus aluminum — so followers can calculate their specific exposure based on their material mix.',
    'Reference the vendor evaluation question to ask about stock utilization so followers have a concrete action for their next sourcing conversation.',
  ],
  'process-downtime': [
    'Add the specific preventive maintenance protocol items for CNC machining centers — spindle load monitoring, coolant checks, axis lubrication intervals.',
    'Include the utilization-vs-failure-rate relationship so followers understand why the risk accelerates above 75% rather than at a uniform rate.',
    'Reference the annual PM cost versus annual unplanned downtime cost calculation so the investment decision has concrete numbers.',
  ],
  'cost-leakage': [
    'Add the time-capture process that eliminates most untracked setup labor — a time-stamped operator log tied to the work order — so followers have a specific implementation path.',
    'Include the closed-job variance review format that surfaces cost leakage after the fact so operations directors know what to look for.',
    'Reference a specific job type where cost leakage concentrates most predictably — high-mix, short-run programs — to make the scenario relatable.',
  ],
  'precision-inconsistency': [
    'Add the standardized work instruction elements that control most shift-to-shift variation so followers have a specific documentation target.',
    'Include the in-process measurement frequency that eliminates most operator-driven variance — and the decision rule for offset adjustment.',
    'Reference the shift handoff protocol — the three things that must be verified and documented at every setup transfer.',
  ],
  'scaling-operations': [
    'Add the scale-up readiness checklist items so followers have a protocol to reference before their next production ramp.',
    'Include the documentation deliverables that must transfer from prototype to production — setup sheets, first-article reports, tool offset baselines.',
    'Reference the 90-day bottleneck identification process so followers can map constraints before volume starts.',
  ],
  'tool-wear-inefficiency': [
    'Add the spindle load trending method for detecting wear before dimensional drift reaches the tolerance limit.',
    'Include the data-driven change interval calculation for a common precision application so followers can implement it immediately.',
    'Reference the cost comparison between a planned tool change and an unplanned breakage event — including all downstream costs — to close the ROI argument.',
  ],
}

export function generateTwitter(inputs: TwitterInputs, seed: number = 0): TwitterOutput {
  const v = seed % 3
  const p = inputs.problem
  const fmt = inputs.postFormat

  let mainPost = ''
  let thread: string[] | undefined

  if (fmt === 'single') {
    const posts = SINGLE_POSTS[p] ?? SINGLE_POSTS['machining-bottlenecks']
    mainPost = posts[v] ?? posts[0]
  } else if (fmt === 'thread') {
    const threads = THREADS[p] ?? THREADS['machining-bottlenecks']
    const selectedThread = threads[v % threads.length] ?? threads[0]
    thread = selectedThread
    mainPost = selectedThread[0]
  } else if (fmt === 'contrarian') {
    mainPost = CONTRARIAN_TAKES[p] ?? CONTRARIAN_TAKES['machining-bottlenecks']
  } else if (fmt === 'founder') {
    mainPost = FOUNDER_POSTS[p] ?? FOUNDER_POSTS['machining-bottlenecks']
  } else if (fmt === 'quote-response') {
    mainPost = QUOTE_RESPONSES[p] ?? QUOTE_RESPONSES['machining-bottlenecks']
  }

  const alternateHook = ALTERNATE_HOOKS[p] ?? ALTERNATE_HOOKS['machining-bottlenecks']
  const cta = CTAS[fmt] ?? CTAS['single']
  const engagementQuestion = ENGAGEMENT_QUESTIONS[p] ?? ENGAGEMENT_QUESTIONS['machining-bottlenecks']
  const improvements = IMPROVEMENT_SUGGESTIONS[p] ?? IMPROVEMENT_SUGGESTIONS['machining-bottlenecks']

  const qualityScore = scoreContent(inputs, true, true, true, mainPost.split(' ').length)

  return {
    platform: 'twitter',
    mainPost,
    thread,
    alternateHook,
    cta,
    engagementQuestion,
    repurposingSuggestions: REPURPOSING.slice(0, 3),
    qualityScore,
    improvementSuggestions: improvements.slice(0, 3),
  }
}
