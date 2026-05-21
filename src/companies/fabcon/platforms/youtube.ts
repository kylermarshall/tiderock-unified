import type { YouTubeInputs, YouTubeOutput } from '../types'
import { PROBLEM_DATA } from '../lib/companyProfile'
import { scoreContent } from '../lib/scoring'

const TITLES: Record<string, string[][]> = {
  'fabrication-bottlenecks': [
    ["Why Your Fabrication Program Is Always Behind Schedule (It's Not the Welders)", "The 4-Week Delay That Starts Before Any Steel Is Cut", "Fabrication Bottlenecks: Where Projects Really Fall Apart"],
    ["How One Bottleneck Delays an Entire Construction Project", "The Multi-Vendor Fabrication Problem Nobody Tracks", "Why 70% of Project Phases Fail Because of One Fab Delay"],
    ["Single-Source vs. Multi-Vendor Fabrication: The Real Cost Difference", "The Coordination Failure That's Costing Your Projects Weeks", "What Fabrication Bottlenecks Actually Cost Per Day Downstream"],
  ],
  'production-delays': [
    ["$2,500/Day in Idle Labor: The Real Cost of a Fabrication Delay", "Why 68% of Construction Overruns Start in the Fab Shop", "The Production Delay Nobody Traced Back to Fabrication"],
    ["How a 3-Week Fab Delay Becomes a $200K Problem On-Site", "Why Project Timelines Break at the Fabrication Stage", "The Downstream Cost Clock That Starts When Fab Falls Behind"],
    ["Fabrication Lead Times: What Vendors Quote vs. What Happens", "The Out-of-Sequence Work Problem Caused by Fabrication Delay", "Why 'On Track' at the Fab Shop Means Something Different Than You Think"],
  ],
  'rework-scrap-cost': [
    ["12% of Your Project Budget Is Going to Rework (Here's Why)", "The Three Costs of Fabrication Rework Most Teams Never Track", "Why the Cheapest Fab Quote Has the Highest Real Cost"],
    ["Scrap Rate: What 15% vs. 3% Means for Your Project Budget", "How a Missing QC Checkpoint Creates $60,000 in Rework", "The Weld That Took 8 Hours to Fix and 2 Weeks to Schedule"],
    ["Rework Discovered Post-Delivery vs. During Production: The Cost Gap", "What First-Article Inspection Prevents (And What It Costs to Skip It)", "How to Measure Rework as a Financial Metric, Not a Quality Metric"],
  ],
  'labor-inefficiency': [
    ["Why Fabrication Labor Is the Most Expensive Thing Nobody Measures", "Shop Floor Inefficiency: The 25% Labor Cost Overrun That Wasn't in the Estimate", "20–35% Productivity Loss from Poor Sequencing: The Real Number"],
    ["Why Busy Fabrication Shops Still Miss Deadlines", "The Supervisor Hours Wasted on Status Chasing Every Week", "How Labor Inefficiency in Fabrication Becomes Your Problem"],
    ["Optimized Shop Floor vs. Default Layout: What the Production Rate Difference Looks Like", "Why the Variance Report Reveals What the Estimate Didn't", "Fabrication Labor: Where the Budget Goes vs. Where It Should"],
  ],
  'poor-project-coordination': [
    ["Why 1 in 4 Complex Fabrication Projects Has a Specification Error", "2.3x More Failures When You Use 3+ Vendors: The Coordination Math", "The Coordination Gap That Causes 40% of Late Project Completions"],
    ["How a Missing Handoff Between Fab and Finishing Kills a Timeline", "The Specification Error That Was a Communication Error First", "Multi-Vendor Fabrication: Where Coordination Fails and What It Costs"],
    ["Single-Source Fabrication as a Coordination Risk Strategy", "The Role Nobody Has in Your Fabrication Program (But Should)", "Why Vendor Count Is a Project Risk Multiplier"],
  ],
  'missed-deadlines': [
    ["$25,000/Week in Penalty Exposure: The Fab Deadline Most Teams Ignore", "Why 72% of Project Managers Can't Forecast Fabrication Timing", "The 6-Week Installation Push That Started with One Missed Fab Date"],
    ["What 'Four Weeks' Means When Your Fabricator Is Overcommitted", "How to Tell Which Vendors Will Hit Their Dates Before You Order", "Missed Fabrication Deadlines: The Cascade Nobody Plans For"],
    ["Fabrication Schedule Transparency: What Reliable Vendors Provide", "Why Deadline Risk Is Almost Never in Project Contingency", "The Scope Gap That Caused the Missed Deadline (And It Wasn't the Shop's Fault)"],
  ],
  'cost-overruns': [
    ["18–28% Over Budget on Structural Fabrication: Why It Keeps Happening", "Why the Lowest Fab Bid Has the Highest Total Cost", "$85,000 in Change Orders from One Missing Line in the Drawing Package"],
    ["The Change Order Conversation That Starts with 'We Found Something'", "3x More Cost Overruns Without Front-End Engineering Review", "How to Stop Paying for Fabrication Scope Gaps After Production Starts"],
    ["Procurement Strategy That Controls Cost vs. Procurement That Minimizes Bid", "What a Pre-Production Engineering Review Actually Catches", "Why Your Fabrication Budget Was Wrong Before the Steel Was Ordered"],
  ],
  'quality-inconsistency': [
    ["20% Rejection Rate at First Inspection: The Multi-Vendor Reality", "3x More Dimensional Failures with 4 Fabrication Sources", "Why Quality Inconsistency Is Always Discovered After Delivery"],
    ["What 'Acceptable Tolerance' Means at Four Different Shops", "The Field Correction Cost That Should Have Been a Shop Correction", "Single-Source Fabrication: What Consistent Quality Actually Looks Like"],
    ["How to Build a QC Standard Across Multiple Fabrication Vendors", "Why First-Article Inspection Is the Cheapest QC Tool You're Not Using", "Quality Inconsistency in Fabrication: A Structural Problem, Not a Vendor Problem"],
  ],
  'equipment-downtime': [
    ["$4,500/Hour When the CNC Goes Down: The Fabrication Downtime Cost", "How One Machine Failure Stops an Entire Fabrication Sequence", "40–60% More Downtime Without a Preventive Maintenance Program"],
    ["Why CNC Equipment Fails at the Worst Possible Time (And How to Prevent It)", "The $270,000/Year Throughput Loss Most Shops Don't Track", "Running at 80%+ Utilization Without Maintenance: When the Failure Happens"],
    ["Preventive Maintenance vs. Reactive Repair: The Cost Comparison", "How Equipment Downtime Ends Up in Your Delivery Dates", "The Maintenance Work Order That Predicted a Production Stoppage"],
  ],
  'material-waste': [
    ["22% Plate Steel Waste: The Cost Hidden in Every Fabrication Quote", "Manual Nesting vs. Programmed Nesting: What the Difference Costs You", "Why Two Identical Quotes Can Have Very Different Real Material Costs"],
    ["$112,500 in Preventable Material Waste on One Structural Program", "How to Ask Your Fab Vendor About Plate Yield Rate (And Why You Should)", "The Nesting Efficiency Gap Between Shops: What It Means for Your Budget"],
    ["Why 'Material Cost' in a Fabrication Quote Includes Waste You Could Eliminate", "Plate Yield vs. Quote Price: What Actually Determines Your Material Cost", "The Planning Cost That Shows Up as a Material Cost on Every Invoice"],
  ],
}

const THUMBNAIL_TEXTS: Record<string, string> = {
  'fabrication-bottlenecks': '4 WEEK DELAY|STARTS BEFORE STEEL IS CUT|REAL BOTTLENECK COST',
  'production-delays': '$2,500/DAY IDLE COST|REAL COST OF FAB DELAYS|68% OF OVERRUNS START HERE',
  'rework-scrap-cost': '12% LOST TO REWORK|3 COSTS NOBODY TRACKS|REAL COST OF CHEAP FAB',
  'labor-inefficiency': '25% LABOR OVERRUN|NOT IN THE ESTIMATE|SHOP FLOOR EFFICIENCY GAP',
  'poor-project-coordination': '1 IN 4 SPEC ERRORS|COORDINATION IS WHY|VENDOR COUNT = RISK',
  'missed-deadlines': '$25K/WEEK PENALTY|72% CAN\'T FORECAST THIS|THE DEADLINE MATH',
  'cost-overruns': '28% OVER BUDGET|THE CHANGE ORDER PATTERN|LOWEST BID ≠ LOWEST COST',
  'quality-inconsistency': '20% REJECTION RATE|MULTI-VENDOR PROBLEM|FOUND AFTER DELIVERY',
  'equipment-downtime': '$4,500/HR DOWNTIME|CNC DOWN = LINE DOWN|40% MORE FAILURES',
  'material-waste': '22% WASTE IN QUOTE|YOU\'RE PAYING FOR IT|NESTING EFFICIENCY GAP',
}

const THREE_SECOND_HOOKS: Record<string, string[]> = {
  'fabrication-bottlenecks': [
    "Your fabrication program is behind schedule. The bottleneck you're tracking isn't the one that caused it.",
    "Every downstream trade waiting on a delayed fabrication component costs $800–$2,500 per day. That clock started weeks ago.",
    "One fabrication bottleneck delays two to four weeks of project timeline. Here's where it actually starts.",
  ],
  'production-delays': [
    "68% of construction project overruns trace back to fabrication. Not on-site execution. Not weather. Fabrication.",
    "Your fab delivery is three weeks late. Three trades are idle at $2,500/day each. That's $7,500/day and climbing.",
    "A 15–25% timeline extension from production delays is the average. Most projects never price that risk.",
  ],
  'rework-scrap-cost': [
    "Rework is costing 5–12% of your total project budget. Most of it is traceable to one missing QC step.",
    "A single structural rework event discovered post-delivery. 8 hours of remediation. 2 weeks of timeline impact. One wrong cut.",
    "Shops running 15% scrap rates aren't using bad steel. They're using bad planning. Here's what that costs.",
  ],
  'labor-inefficiency': [
    "Labor is 40% of fabrication cost. It's also the variable almost nobody audits until after the job closes.",
    "Your fab shop looked busy. The job still ran over by 25% on labor. Here's what actually happened.",
    "Poor shop floor sequencing costs 20–35% in productivity. That gap doesn't show up daily — it shows up on the final variance report.",
  ],
  'poor-project-coordination': [
    "1 in 4 complex fabrication projects has a specification error caused by coordination failure. This is how they happen.",
    "2.3x more coordination failures at three or more vendors. Here's why every additional vendor multiplies your risk.",
    "40% of late project completions trace to the gap between fabrication, finishing, and delivery. Not to any single vendor.",
  ],
  'missed-deadlines': [
    "The fabrication vendor said four weeks. It's now week six. The penalty clock is running at $25,000/week.",
    "$25,000/week in penalty exposure from a missed fab deadline. Most project managers signed the clause and never ran the number.",
    "72% of project managers cannot reliably forecast fabrication timing. This is why — and what to do about it.",
  ],
  'cost-overruns': [
    "Your fabrication program budgeted $300,000. The final invoice came in at $375,000. Here's exactly how that happens.",
    "The lowest fabrication bid. The highest total cost. Why cheap quotes produce expensive projects.",
    "Projects that skip front-end engineering review in fabrication see 3x more cost overruns. The review costs a fraction of one overrun.",
  ],
  'quality-inconsistency': [
    "20% rejection rate at first inspection. Not one bad vendor. Four vendors with four different standards.",
    "Quality inconsistency in fabrication is never discovered when it's cheapest to fix. Here's why — and how to change that.",
    "3x dimensional failures across four fabrication sources. The steel is the same. The standard isn't.",
  ],
  'equipment-downtime': [
    "$4,500 per hour. That's what unplanned CNC downtime costs in a mid-size fabrication shop. One failure. One day.",
    "One plasma table down. Cutting stops. Forming stops. Welding waits. Here's what the cascade looks like.",
    "Shops without preventive maintenance programs spend 40–60% more in unplanned downtime. That cost is in your delivery date.",
  ],
  'material-waste': [
    "22% of the plate steel your fabricator ordered was wasted. You paid for it. It's built into the quote.",
    "Two vendors. Same steel. Same drawings. One quotes 10% less. The difference is nesting efficiency — and who absorbs the waste.",
    "12–22% plate waste from manual nesting versus 2–4% from programmed nesting. The gap is a planning decision — not a materials decision.",
  ],
}

const OPENING_LINES: Record<string, string[]> = {
  'fabrication-bottlenecks': [
    "When a fabrication program runs late, the project manager starts looking for the bottleneck. By the time they find it, the damage is already done.",
    "Fabrication bottlenecks are almost never random. They're the predictable output of program structures that were designed to fail.",
    "The bottleneck in your fabrication program was decided when you selected your vendor structure — not when production started.",
  ],
  'production-delays': [
    "Production delays in fabrication don't stay in the fab shop. They travel downstream and multiply.",
    "When fabrication falls behind, the project manager's problem has a daily price tag — and it isn't the fabricator paying it.",
    "The 15–25% timeline extension from production delays is an average. In contract manufacturing terms, it's a benchmark your planning should account for.",
  ],
  'rework-scrap-cost': [
    "Rework in metal fabrication has three costs. Most project teams only track one.",
    "The most expensive rework is always the rework discovered after delivery — not because the fix is more complex, but because the schedule has no room for it.",
    "Scrap rate tells you more about a fabrication shop's process discipline than almost any other single metric.",
  ],
  'labor-inefficiency': [
    "Fabrication labor efficiency is the variable most shops don't measure and most customers never ask about.",
    "The variance between planned and actual labor hours on a closed fabrication job is where efficiency losses live.",
    "Shop floor sequencing determines labor productivity more than equipment quality, headcount, or material availability.",
  ],
  'poor-project-coordination': [
    "The specification error in your fabrication program didn't start at the weld table. It started at the last meeting where two vendors didn't compare notes.",
    "Coordination failures in fabrication are not vendor quality problems. They are structural problems — created by program designs with too many interfaces.",
    "Every vendor in a fabrication program adds a communication surface. Every surface is a potential misalignment. Most programs never map those surfaces.",
  ],
  'missed-deadlines': [
    "Fabrication vendors don't miss deadlines because they're careless. They miss them because they're overcommitted — and nobody asked the right questions before order placement.",
    "The penalty clause in a construction contract is not theoretical. It activates on a specific date — and the fabrication timeline determines whether that date is a problem.",
    "Missed fabrication deadlines are predictable when you know what to look for. Most project teams look after the date has passed.",
  ],
  'cost-overruns': [
    "The change order conversation in fabrication almost always starts with: 'We need to discuss something we found during production.'",
    "Fabrication cost overruns are not bad luck. They are the output of procurement decisions that optimized for bid price instead of total cost.",
    "The projects that beat the 18–28% overrun average have one thing in common: a front-end engineering review that caught scope gaps before production started.",
  ],
  'quality-inconsistency': [
    "Quality inconsistency in fabrication programs almost never gets traced back to its structural cause: too many vendors with too many different standards.",
    "The rejection rate at first inspection tells you when the quality failure happened — but it doesn't tell you where in the process it was created.",
    "Dimensional tolerance failures in multi-vendor programs are predictable. Three times the failure rate of single-source programs is a documented outcome, not a coincidence.",
  ],
  'equipment-downtime': [
    "Unplanned equipment downtime in a fabrication shop doesn't just affect one machine. It affects every process that depends on that machine's output.",
    "The cost of equipment downtime in fabrication is not the repair invoice. It's the throughput value that didn't get produced while the machine was down.",
    "Preventive maintenance programs in fabrication shops aren't an optional best practice. They're the mechanism that keeps $4,500/hour risk from randomly entering your production calendar.",
  ],
  'material-waste': [
    "The material waste rate in a fabrication shop is built into every quote they write — whether it appears as a line item or not.",
    "Two fabrication shops can buy steel from the same mill at the same price and quote very different numbers. The difference is often how much of the steel they plan to waste.",
    "Material waste in fabrication is a planning decision, not a material quality issue. The steel is fine. The nesting efficiency determines what percentage of it becomes the product.",
  ],
}

const SCRIPT_OUTLINES: Record<string, string[]> = {
  'fabrication-bottlenecks': [
    `PROBLEM (0:00–0:20): Show the scenario — a project running behind schedule, PM tracking the delay, field crew idle on-site. Introduce the question: where did the bottleneck actually start?\n\nCOST (0:20–0:40): ${PROBLEM_DATA['fabrication-bottlenecks'].stat1}. Downstream idle labor running at $800–$2,500/day per trade. On a multi-trade project, the daily cost of the bottleneck is a four-to-five figure number before any remediation begins.\n\nMISTAKE (0:40–1:00): ${PROBLEM_DATA['fabrication-bottlenecks'].stat2}. The structural problem is vendor count. Every additional vendor adds a communication surface. When any one of them hits a delay, the others can't proceed — but they keep billing.\n\nFIX (1:00–1:20): ${PROBLEM_DATA['fabrication-bottlenecks'].stat3}. Single-source fabrication eliminates inter-vendor handoff failures. One shop, one schedule, one point of accountability.\n\nTAKEAWAY (1:20–1:30): The bottleneck isn't a quality problem. It's a program structure problem. Structure the program to prevent it — don't manage it after it happens.`,
    `PROBLEM (0:00–0:20): Two projects. Same scope. One delivers on time. One is four weeks late. The only difference: vendor count. This is what happened in the delayed project.\n\nCOST (0:20–0:45): ${PROBLEM_DATA['fabrication-bottlenecks'].stat2}. At three vendors, every inter-vendor handoff is a risk surface. When a forming vendor runs behind, the welding vendor can't start — but their clock is running.\n\nMISTAKE (0:45–1:05): ${PROBLEM_DATA['fabrication-bottlenecks'].stat3}. The cascade is the structural outcome of disconnected vendor timelines. Nobody missed their individual deadline badly. The inter-dependencies created the problem.\n\nFIX (1:05–1:20): ${PROBLEM_DATA['fabrication-bottlenecks'].stat1}. Reducing vendor count is the structural fix. One shop managing all sequences means one timeline, one accountability point, one bottleneck surface instead of five.\n\nTAKEAWAY (1:20–1:30): Program structure determines bottleneck risk before any steel is cut. Design the structure with that in mind.`,
    `PROBLEM (0:00–0:15): The PM got the call. Fabrication is running three weeks behind. Installation window starts in four days. Three trades are mobilized on-site.\n\nCOST (0:15–0:35): $800–$2,500/day per trade, three trades waiting. That's $7,500–$7,500/day in idle labor cost beginning the day of the call. ${PROBLEM_DATA['fabrication-bottlenecks'].stat1}.\n\nMISTAKE (0:35–0:55): The bottleneck was visible in week two of the fab program. The forming sequence fell behind cutting by five days. With three vendors, nobody was responsible for flagging the cascade.\n\nFIX (0:55–1:15): ${PROBLEM_DATA['fabrication-bottlenecks'].stat2}. Single-source fabrication means one shop owns the sequence — and one point of contact is responsible for surfacing the problem before it becomes a field cost.\n\nTAKEAWAY (1:15–1:30): The field cost of a fabrication bottleneck always exceeds the fab shop cost. The way to control it is upstream — in vendor selection, not in crisis management.`,
  ],
  'production-delays': [
    `PROBLEM (0:00–0:20): The fabrication vendor quoted four weeks. It's week six. The project has three trades on-site, mobilized and waiting. The meter is running.\n\nCOST (0:20–0:40): ${PROBLEM_DATA['production-delays'].stat2}. Three trades at $2,000/day each is $6,000/day in downstream idle cost. At two weeks of delay, that's $84,000 in idle labor — from a fabrication slip that wasn't flagged until week five.\n\nMISTAKE (0:40–1:00): ${PROBLEM_DATA['production-delays'].stat3}. 68% of construction overruns trace to fabrication. Not weather. Not labor. Fabrication timing was the variable that failed — and nobody priced the risk.\n\nFIX (1:00–1:20): ${PROBLEM_DATA['production-delays'].stat1}. A 15–25% timeline extension is the documented average. Projects that control for it choose fabrication partners with transparent production tracking — not partners who quote optimistically.\n\nTAKEAWAY (1:20–1:30): The downstream cost of a production delay is a multiplier on the delay duration. Fabrication partner selection determines whether you're exposed to that multiplier.`,
    `PROBLEM (0:00–0:25): A commercial buildout. Four active trades. Structural fabrication component needed for phase two start. Fab vendor: "We're on track." Week four delivery date. Week six: still in the shop.\n\nCOST (0:25–0:50): Phase two labor mobilized and waiting. ${PROBLEM_DATA['production-delays'].stat2}. At four trades, two weeks idle = $80,000–$250,000 in downstream idle cost from a delivery that slipped without warning.\n\nMISTAKE (0:50–1:05): ${PROBLEM_DATA['production-delays'].stat3}. The project manager assumed fabrication timing was reliable because the vendor had done one job successfully before. That's not a data set — it's an anecdote.\n\nFIX (1:05–1:20): Production tracking visibility between order and delivery. What are the production milestones? What's the material readiness status? When was the last shop check-in? These questions catch the delay before it's a field cost.\n\nTAKEAWAY (1:20–1:30): You can't control a delay you can't see coming. Production visibility is the variable that converts a delay from a surprise into a managed risk.`,
    `PROBLEM (0:00–0:20): 15–25% timeline extension from production delays is the documented average. Most project budgets don't have 25% contingency. Most project managers know this but schedule optimistically anyway.\n\nCOST (0:20–0:40): ${PROBLEM_DATA['production-delays'].stat2}. The daily idle cost starts the moment the expected delivery passes. It doesn't stop until the material arrives on-site and the crew can work.\n\nMISTAKE (0:40–1:00): ${PROBLEM_DATA['production-delays'].stat3}. The assumption: on-site execution is the variable to manage. The data: fabrication is the variable that determines the project outcome.\n\nFIX (1:00–1:20): Build fabrication timeline risk into project contingency — and select vendors based on production track record, not bid price. The two are often inversely correlated.\n\nTAKEAWAY (1:20–1:30): You don't control what you don't measure. Measure fabrication timeline variance across projects and you'll know which vendor relationship is costing you the most.`,
  ],
  'rework-scrap-cost': [
    `PROBLEM (0:00–0:20): The weldment arrived at inspection. Three structural components are out of spec. Remediation required. Delivery date: three days from now.\n\nCOST (0:20–0:40): ${PROBLEM_DATA['rework-scrap-cost'].stat2}. Eight hours of remediation per component. 24 hours total. The delivery date moves two weeks. Every downstream installation phase shifts. ${PROBLEM_DATA['rework-scrap-cost'].stat1}.\n\nMISTAKE (0:40–1:00): The inspection checkpoint that would have caught this was skipped. First-article review before weld start was not in the vendor's process. By the time the parts reached final inspection, the cost of correction was maximum.\n\nFIX (1:00–1:20): ${PROBLEM_DATA['rework-scrap-cost'].stat3}. Shops running 3–4% scrap rates have formal QC checkpoints at every process transition — cutting to forming, forming to welding, weld to final inspection. The check at each step is what prevents the eight-hour structural rework.\n\nTAKEAWAY (1:20–1:30): Rework cost has three components — material, labor, and schedule. The schedule component is always the largest. The inspection process is the only lever that controls it.`,
    `PROBLEM (0:00–0:25): Two fabrication quotes for the same structural package. Quote A: $280,000. Quote B: $310,000. The project manager selects Quote A.\n\nCOST (0:25–0:50): Eight weeks into the program, three components require rework. ${PROBLEM_DATA['rework-scrap-cost'].stat1}. The rework costs $34,000. Quote A plus rework: $314,000 — $4,000 more than Quote B. And the project is two weeks behind.\n\nMISTAKE (0:50–1:05): Quote A had no QC process documented. No first-article inspection. No inter-stage inspection. The lower price was real — because the process that prevents rework was removed.\n\nFIX (1:05–1:20): ${PROBLEM_DATA['rework-scrap-cost'].stat3}. Scrap rates between 2–4% in well-run shops versus 8–15% in poorly managed ones represent a 4–6x quality performance gap. That gap determines whether the low bid is actually the low cost.\n\nTAKEAWAY (1:20–1:30): Ask for the vendor's first-article inspection process, their scrap rate on comparable projects, and their documented QC checkpoints. These questions filter out the quotes that will cost you more.`,
    `PROBLEM (0:00–0:20): The fabrication program looks on track. Production is 85% complete. Two weeks to delivery. Then the QC hold notice arrives. Four structural components rejected.\n\nCOST (0:20–0:40): ${PROBLEM_DATA['rework-scrap-cost'].stat2}. 32 hours of remediation. Two components need replacement. New material lead time: ten days. Delivery now five weeks out — from two. ${PROBLEM_DATA['rework-scrap-cost'].stat1}.\n\nMISTAKE (0:40–1:00): The QC process was end-of-production only. No staged inspection. No first-article check. The error was introduced at forming — seven processes ago — and compounded through every step that followed.\n\nFIX (1:00–1:20): Staged inspection is the structural fix. First-article after the first piece off each new setup. Dimensional check at forming before weld. Final inspection before shipping. Each checkpoint catches what the next process can't undo.\n\nTAKEAWAY (1:20–1:30): The later in production a quality failure is discovered, the more expensive it is. The inspection process is not a cost — it's the mechanism that keeps discovery early and cost low.`,
  ],
  'labor-inefficiency': [
    `PROBLEM (0:00–0:20): The fabrication job was estimated at 480 labor hours. It closed at 630. 31% over estimate. The variance report shows it. Nobody can explain where the hours went.\n\nCOST (0:20–0:40): ${PROBLEM_DATA['labor-inefficiency'].stat3}. At 40% of fabrication cost, a 31% labor overrun is a 12.4% total cost overrun on the job. On a $400,000 program, that's $49,600 that was not in the estimate. ${PROBLEM_DATA['labor-inefficiency'].stat1}.\n\nMISTAKE (0:40–1:00): ${PROBLEM_DATA['labor-inefficiency'].stat2}. Supervisors spending 6–10 hours per week chasing status, resolving sequencing conflicts, and coordinating around disorganized job routing. That time is not available for production management — where it belongs.\n\nFIX (1:00–1:20): Sequenced job routing. Visual management systems on the shop floor. Clear handoff protocols between process stations. The shops that run 4–6% labor overruns (versus 25–30%) have these systems in place — not better welders.\n\nTAKEAWAY (1:20–1:30): Labor efficiency is a process problem, not a people problem. The way to close the gap is in shop floor design and supervision structure — not in pushing the team harder.`,
    `PROBLEM (0:00–0:20): Two fabrication shops. Same equipment. Same headcount. Shop A delivers on time. Shop B is consistently 2–3 weeks behind. The difference is not the shop floor workers.\n\nCOST (0:20–0:40): ${PROBLEM_DATA['labor-inefficiency'].stat1}. Shop B's poor sequencing creates a 20–35% productivity loss. At 40% of fabrication cost, that loss directly extends timelines — which creates downstream idle labor costs for the customer.\n\nMISTAKE (0:40–1:00): Shop B measures output — parts completed, welds done, hours clocked. It doesn't measure efficiency — how productively those hours were used. The output looks similar. The productivity isn't.\n\nFIX (1:00–1:20): ${PROBLEM_DATA['labor-inefficiency'].stat2}. Eliminating the supervisor status-chasing cycle and replacing it with a visual production management system closes 30–40% of the efficiency gap. The supervisors manage production instead of chasing it.\n\nTAKEAWAY (1:20–1:30): Before selecting a fabrication vendor, ask what their shop floor management system looks like. The answer tells you more about on-time delivery performance than the equipment list.`,
    `PROBLEM (0:00–0:25): A fabrication shop running at full capacity is still missing delivery dates. Equipment is modern. Workforce is experienced. Management can't identify why jobs are running over.\n\nCOST (0:25–0:50): ${PROBLEM_DATA['labor-inefficiency'].stat1}. The 20–35% productivity loss from poor sequencing is invisible in a busy shop. Every station has work. Every worker is occupied. But the sequence is wrong — and time is lost in handoffs, waiting, and rework caused by out-of-order processing.\n\nMISTAKE (0:50–1:10): ${PROBLEM_DATA['labor-inefficiency'].stat3}. Labor is 35–50% of fab cost and is being managed by anecdote — who's fastest, which welder to put on which job, where to move capacity when a deadline is close. These decisions should be systematic, not reactive.\n\nFIX (1:10–1:25): Sequenced job routing mapped to equipment capacity and labor availability before production starts. Adjust when constraints are identified — not when deadlines are missed.\n\nTAKEAWAY (1:25–1:30): Shop floor efficiency is designed before production begins. The planning process determines the outcome.`,
  ],
  'poor-project-coordination': [
    `PROBLEM (0:00–0:20): The structural steel package was fabricated to the correct dimensions. The finishing vendor primed it with the wrong specification. It needs to be stripped and recoated. Delivery was Monday.\n\nCOST (0:20–0:40): ${PROBLEM_DATA['poor-project-coordination'].stat2}. The specification mismatch was a coordination failure between two vendors who never spoke. Both did their jobs correctly against their own specs. The specs didn't match. ${PROBLEM_DATA['poor-project-coordination'].stat3}.\n\nMISTAKE (0:40–1:00): ${PROBLEM_DATA['poor-project-coordination'].stat1}. At three vendors, no single party was responsible for ensuring specifications were aligned across all three. The project manager assumed vendors were communicating. They weren't — because nobody asked them to.\n\nFIX (1:00–1:20): Single-source fabrication includes fabrication, finishing, and delivery coordination under one contract. One vendor owns all three handoffs. There is no inter-vendor specification gap because there is no inter-vendor gap.\n\nTAKEAWAY (1:20–1:30): Coordination failures are structural — created by program architecture, not by vendor negligence. Fix the architecture and the failures stop.`,
    `PROBLEM (0:00–0:25): A fabrication program for a commercial installation. Four vendors: cutting, forming, welding, finishing. The project manager is the de facto coordinator. It works — until one handoff fails.\n\nCOST (0:25–0:50): ${PROBLEM_DATA['poor-project-coordination'].stat1}. 2.3x more failures at three or more vendors. On a ten-project program, that multiplier means 23 coordination failures versus 10 in a consolidated program. Each failure has a cost. Each one is traceable to the program structure.\n\nMISTAKE (0:50–1:10): ${PROBLEM_DATA['poor-project-coordination'].stat2}. 1 in 4 complex projects has a specification error. The project manager catching these errors was not a designed function — it was an afterthought. Specification errors are found at delivery, not at drawing review.\n\nFIX (1:10–1:25): A designated coordination role — either internal to the project team or inherent in a single-source fabrication structure — that owns specification alignment across all vendors and process stages.\n\nTAKEAWAY (1:25–1:30): The question to ask before a program starts: who is accountable for inter-vendor specification alignment? If the answer is unclear, the 1-in-4 error rate is your expected outcome.`,
    `PROBLEM (0:00–0:20): Three vendors, each hitting their individual milestone. Cutting done on time. Forming done on time. Delivery missed by four weeks. How does that happen?\n\nCOST (0:20–0:40): ${PROBLEM_DATA['poor-project-coordination'].stat3}. The gaps between vendors are where schedule is lost. Each vendor owns their piece. Nobody owns the transition between pieces. That's where time disappears.\n\nMISTAKE (0:40–1:00): The project timeline was built assuming each vendor's milestone was additive. It wasn't accounting for the coordination overhead — scheduling handoffs, resolving specification questions, waiting for one vendor's output before the next can start.\n\nFIX (1:00–1:20): Map the coordination surface area before the program starts. Define: who handles specification questions between vendors? What's the handoff protocol? What happens when a vendor is late? These questions have better answers before production than after.\n\nTAKEAWAY (1:20–1:30): The coordination cost is always in the program. The question is whether it's planned or unplanned.`,
  ],
  'missed-deadlines': [
    `PROBLEM (0:00–0:20): The fabrication deadline was six weeks out. Four weeks in, the vendor flags a delay. Two additional weeks needed. The project manager calls the contractor. The contractor calls the field crew. Three trades have been mobilized.\n\nCOST (0:20–0:40): ${PROBLEM_DATA['missed-deadlines'].stat2}. $5,000–$25,000/week in penalty exposure. Plus $2,500/day per idle trade. The penalty clause activates. The mobilized crew bills standby rates. The total cost of this two-week slip will exceed $100,000 before remediation.\n\nMISTAKE (0:40–1:00): ${PROBLEM_DATA['missed-deadlines'].stat3}. 72% of project managers can't forecast fab timing reliably. The indicator of a deadline miss was visible at week three — when production showed it was behind internal schedule. Nobody was looking.\n\nFIX (1:00–1:20): Production milestone visibility between order and delivery. A fabrication partner who flags internal schedule pressure before it becomes external delay. Not every shop does this. The ones that do are identifiable by how they manage communication.\n\nTAKEAWAY (1:20–1:30): A missed deadline is never a surprise to the vendor. It's almost always a surprise to the customer. That information gap is the problem — and it's solvable.`,
    `PROBLEM (0:00–0:25): Fabrication vendor selection. Three quotes. The project manager selects the middle quote from a shop that "has done this before." Six weeks later: delivery slip.\n\nCOST (0:25–0:45): ${PROBLEM_DATA['missed-deadlines'].stat1}. The 3–6 week installation push costs more than the delay itself. Every subsequent trade in the sequence moves. Extended general conditions. Escalated labor rates if overtime is required. The delivery slip is a four-to-five figure daily problem.\n\nMISTAKE (0:45–1:05): Vendor selection was based on past performance on a different project type with a different lead time. The production capacity audit that would have revealed an overcommitment was never done.\n\nFIX (1:05–1:20): Ask the questions before order placement. What is the current production load? What is the backlog? What are the production milestones for this order? Which equipment is running this job and what's its current utilization?\n\nTAKEAWAY (1:20–1:30): The deadline conversation is cheapest before the contract is signed. The production capacity audit is the tool that makes that conversation factual.`,
    `PROBLEM (0:00–0:20): A contract with a $20,000/week penalty clause for late delivery. Fabrication vendor: four-week lead time. Week five: "We need two more weeks." Week seven: delivery.\n\nCOST (0:20–0:40): $40,000 in penalties. ${PROBLEM_DATA['missed-deadlines'].stat2}. Three trades stood down for two weeks. Field mobilization and remobilization costs. The total project cost impact from one missed fab deadline: six figures. The fabrication value: $90,000.\n\nMISTAKE (0:40–1:00): The penalty clause was signed with a four-week lead time that was never stress-tested against the vendor's actual production capacity. ${PROBLEM_DATA['missed-deadlines'].stat3}. The lead time was an estimate. The penalty was a contract commitment.\n\nFIX (1:00–1:20): Never commit a penalty clause timeline without a production capacity confirmation from the vendor. Confirm: current backlog, material procurement status, equipment availability for this job, and their process for flagging delay risk.\n\nTAKEAWAY (1:20–1:30): The fabrication lead time in a contract is only as reliable as the vendor's capacity to deliver it. Verify the capacity before signing the clause.`,
  ],
  'cost-overruns': [
    `PROBLEM (0:00–0:20): The fabrication program was budgeted at $320,000 based on the winning bid. The final invoice: $395,000. No single catastrophic event. Just a series of change orders that started at week three.\n\nCOST (0:20–0:40): ${PROBLEM_DATA['cost-overruns'].stat2}. $12,000–$85,000 in change orders from scope gaps. Each one identified during production — when the cost to fix is maximum and the leverage to negotiate is minimum. ${PROBLEM_DATA['cost-overruns'].stat1}.\n\nMISTAKE (0:40–1:00): ${PROBLEM_DATA['cost-overruns'].stat3}. No front-end engineering review. The drawings were issued to bid. The bid came back. The review that would have identified the scope gaps before production never happened.\n\nFIX (1:00–1:20): A pre-production engineering review between the project team and the fabrication shop covers: drawing completeness, material specification clarity, tolerance requirements, and surface treatment specs. One four-hour session prevents three months of change order management.\n\nTAKEAWAY (1:20–1:30): The cost of a front-end review is fixed and known. The cost of discovering scope gaps during production is variable, larger, and non-negotiable. Run the review.`,
    `PROBLEM (0:00–0:25): Two projects. Same project manager. Both used competitive bidding. Project A: final cost 8% over budget. Project B: 26% over budget. The difference was not the vendors' quality — it was the process before production started.\n\nCOST (0:25–0:45): ${PROBLEM_DATA['cost-overruns'].stat1}. 18–28% average overrun on complex structural programs. Project A had a pre-production scope alignment review. Project B didn't. ${PROBLEM_DATA['cost-overruns'].stat2}. Project B had $67,000 in change orders.\n\nMISTAKE (0:45–1:05): The assumption: if the drawings are complete, the scope is clear. The reality: drawings are not specifications. Material callouts, tolerance requirements, surface treatment, and weld standards require explicit confirmation before production — not during it.\n\nFIX (1:05–1:20): ${PROBLEM_DATA['cost-overruns'].stat3}. The front-end review is the mechanism that catches the gaps. The discipline to require it before order release is the practice that separates 8% variance from 26% variance.\n\nTAKEAWAY (1:20–1:30): The overrun is not inevitable. It's the predictable output of skipping the process that prevents it.`,
    `PROBLEM (0:00–0:20): The lowest bid won the job. By the end of the program, it had the highest total cost.\n\nCOST (0:20–0:40): ${PROBLEM_DATA['cost-overruns'].stat2}. Change orders from scope gaps identified during production. Each one was legitimate — the drawing didn't specify clearly, the vendor didn't assume, the project team had to decide and pay. ${PROBLEM_DATA['cost-overruns'].stat1}.\n\nMISTAKE (0:40–1:00): Procurement optimized for bid price. It should have optimized for total cost. The distinction: bid price is what the vendor thinks they can do with what was provided. Total cost includes what the project will pay when what was provided was insufficient.\n\nFIX (1:00–1:20): A fabrication procurement process that requires drawing completeness review, explicit specification confirmation, and a cost-to-complete commitment — not just an initial bid — before selection.\n\nTAKEAWAY (1:20–1:30): The vendors that bid low and bill high are identifiable before the contract is signed. The question is whether the procurement process is designed to identify them.`,
  ],
  'quality-inconsistency': [
    `PROBLEM (0:00–0:20): A 200-component fabrication program across four vendors. Delivery begins. First-inspection rejection rate: 18%. 36 components requiring remediation. Schedule impact: four weeks.\n\nCOST (0:20–0:40): ${PROBLEM_DATA['quality-inconsistency'].stat2}. $150–$400 per weld remediation event. At 36 components, that's $5,400–$14,400 in direct remediation cost. Plus four weeks of installation delay, downstream idle labor, and potential penalty clause exposure. ${PROBLEM_DATA['quality-inconsistency'].stat1}.\n\nMISTAKE (0:40–1:00): ${PROBLEM_DATA['quality-inconsistency'].stat3}. With four vendors, tolerance interpretation varied. Two vendors interpreted the drawing the same way. Two interpreted it differently. There was no unified QC standard — just four different shops doing their best with their own processes.\n\nFIX (1:00–1:20): Single-source fabrication or a formal multi-vendor QC alignment before production begins. Define tolerance requirements, weld quality standards, and surface prep expectations explicitly — with sign-off from each vendor before first article production.\n\nTAKEAWAY (1:20–1:30): Quality consistency is a structural outcome, not a vendor effort outcome. The structure that produces it requires explicit standards, not assumed shared understanding.`,
    `PROBLEM (0:00–0:25): The fabrication was complete. The components were on the truck. The inspector was on-site. First-inspection fail rate: 14%.\n\nCOST (0:25–0:50): The components that failed were the structural elements required for week-one installation. ${PROBLEM_DATA['quality-inconsistency'].stat2}. The remediation cost is $9,800. The schedule cost — three weeks of installation delay on a project with penalty clause exposure — is $75,000.\n\nMISTAKE (0:50–1:10): ${PROBLEM_DATA['quality-inconsistency'].stat1}. The program used three vendors. Each ran their standard process. None of them ran the project-specific QC standard — because no project-specific QC standard was ever communicated.\n\nFIX (1:10–1:25): Project-specific QC documentation issued to each vendor before production, with mandatory first-article inspection results submitted before full production run begins. The inspection result tells you whether the vendor understood the standard — before 200 parts are made to the wrong spec.\n\nTAKEAWAY (1:25–1:30): Quality failures in fabrication are almost never caused by vendor intent. They're caused by standard ambiguity. Eliminate the ambiguity and the failure rate follows.`,
    `PROBLEM (0:00–0:20): A high-volume fabrication program for repeat production. First batch: 12% rejection rate. Second batch: 9%. Third batch: 15%. The quality is inconsistent across batches, not just across vendors.\n\nCOST (0:20–0:40): ${PROBLEM_DATA['quality-inconsistency'].stat1}. An average 12% rejection rate across a 500-component annual program is 60 components requiring remediation per year. At $300 average per event: $18,000 in direct remediation cost annually. Plus the schedule disruption of intermittent delivery holds.\n\nMISTAKE (0:40–1:00): No formal inspection checkpoint between process stages. Quality is inspected at shipping — after all value has been added. By then, the cost of finding a problem is maximum and the cost of the process that would have prevented it is sunk.\n\nFIX (1:00–1:20): ${PROBLEM_DATA['quality-inconsistency'].stat3}. Single-source programs run 3x fewer dimensional tolerance failures. The mechanism: one QC standard, consistently applied, at every process stage. Inspect earlier, catch cheaper, deliver cleaner.\n\nTAKEAWAY (1:20–1:30): Consistency is not a characteristic — it's an output of a consistent process. The process is in the shop, or it isn't.`,
  ],
  'equipment-downtime': [
    `PROBLEM (0:00–0:20): CNC plasma table. Tuesday morning. Mid-program. Eight jobs in queue. Unplanned failure. The parts for a commercial installation that starts Thursday are in queue.\n\nCOST (0:20–0:40): ${PROBLEM_DATA['equipment-downtime'].stat1}. $4,500/hour in throughput loss. Eight hours of repair and restart time: $36,000 in production value that didn't happen. The installation on Thursday shifts. The trades scheduled for Thursday are already mobilized. ${PROBLEM_DATA['equipment-downtime'].stat2}.\n\nMISTAKE (0:40–1:00): ${PROBLEM_DATA['equipment-downtime'].stat3}. The shop was running at 85% utilization. Above 80%, CNC equipment without a preventive maintenance program averages 6–12 unplanned hours per month. This was month four of running at 85%. The failure was not random — it was overdue.\n\nFIX (1:00–1:20): A preventive maintenance program tied to utilization rate — not calendar date. High-utilization machines need more frequent maintenance, not less. Shops that map maintenance to load experience 40–60% less unplanned downtime.\n\nTAKEAWAY (1:20–1:30): The cost of unplanned downtime is not the repair invoice. It's the ripple. Ask your fabrication vendor what their preventive maintenance schedule looks like. The answer predicts delivery reliability.`,
    `PROBLEM (0:00–0:20): Two fabrication shops with identical equipment. Shop A: 8 days behind on current deliveries. Shop B: on schedule. The equipment is the same. The maintenance program is not.\n\nCOST (0:20–0:40): ${PROBLEM_DATA['equipment-downtime'].stat2}. Shop A averages 60% more unplanned downtime than Shop B. ${PROBLEM_DATA['equipment-downtime'].stat1}. At $3,000/hour average and 9 extra unplanned hours per month, Shop A absorbs $27,000/month in throughput loss. That loss is in every delivery date they quote.\n\nMISTAKE (0:40–1:00): Shop A manages maintenance reactively — when equipment fails, they fix it. Shop B manages maintenance proactively — scheduled service tied to utilization and runtime hours. The maintenance investment is similar. The downtime cost is very different.\n\nFIX (1:00–1:20): ${PROBLEM_DATA['equipment-downtime'].stat3}. At above 80% utilization, CNC equipment failure is a when question, not an if question. The maintenance program determines when — and whether it happens during planned maintenance windows or during production.\n\nTAKEAWAY (1:20–1:30): Before selecting a fabrication vendor, ask about their maintenance program. A shop running at high utilization without a documented program is building a production failure into your delivery schedule.`,
    `PROBLEM (0:00–0:25): The fabrication program is three weeks in. Delivery in two weeks. The shop's laser cutter — the primary cutting tool for this job — goes offline. Unexpected failure. No backup machine for this cut spec.\n\nCOST (0:25–0:45): ${PROBLEM_DATA['equipment-downtime'].stat1}. $1,200–$4,500/hour in throughput loss while the machine is down. Three-day repair and restart. The job is now behind. Delivery moves from two weeks to four weeks. ${PROBLEM_DATA['equipment-downtime'].stat2}.\n\nMISTAKE (0:45–1:05): The shop hadn't run a maintenance check on the laser since the previous quarter. At the current utilization rate, the recommended interval was monthly. The machine failed predictably — the schedule just didn't account for it.\n\nFIX (1:05–1:25): Maintenance records are a customer tool, not just a shop tool. Ask for maintenance logs on critical equipment as part of vendor qualification. Shops that maintain them have better delivery records. Shops that don't are quoting lead times that don't account for their actual failure rate.\n\nTAKEAWAY (1:25–1:30): The fabrication lead time is only achievable if the equipment runs. Verify that the equipment will run before you commit to the timeline.`,
  ],
  'material-waste': [
    `PROBLEM (0:00–0:20): A structural fabrication program. $200,000 in plate steel material. The shop's nesting process is manual — cut layout marked with chalk and cut freehand. Standard practice for this shop type.\n\nCOST (0:20–0:40): ${PROBLEM_DATA['material-waste'].stat1}. Manual nesting generates 12–22% waste. At 20% waste on $200,000 in plate: $40,000 of purchased steel becomes scrap. ${PROBLEM_DATA['material-waste'].stat2}. That $40,000 is in the quote — as material cost. The customer paid for it.\n\nMISTAKE (0:40–1:00): ${PROBLEM_DATA['material-waste'].stat3}. The shop using manual layout generates 2–3x the waste of programmed nesting. It's not bad practice — it's an older practice. But the cost difference is material, and it's absorbed by the project budget.\n\nFIX (1:00–1:20): Programmed nesting software runs cut optimization algorithms that reduce waste to 2–4%. The same drawing, the same material, cut by a CNC with programmed nesting: $200,000 in plate yields $196,000 in product versus $160,000 in a manual-layout shop. The difference is $36,000 — on one job.\n\nTAKEAWAY (1:20–1:30): Ask your fabrication vendor how they handle cut layout. The answer tells you whether the material cost in their quote reflects engineering or estimation.`,
    `PROBLEM (0:00–0:25): Two quotes for the same structural program. Vendor A: $295,000. Vendor B: $275,000. Same steel supplier. Same specs. Same delivery window. Vendor B wins.\n\nCOST (0:25–0:50): ${PROBLEM_DATA['material-waste'].stat1}. Vendor B uses manual nesting. At 18% waste on their material spend, $52,200 in plate was purchased and scrapped. Vendor A uses programmed nesting at 4% waste. Vendor A's actual material cost was $30,000 lower than Vendor B's — but their price reflected a different cost base. ${PROBLEM_DATA['material-waste'].stat2}.\n\nMISTAKE (0:50–1:10): The project manager compared bid prices. They didn't compare material efficiency. The lower bid had a higher waste rate built in — and the project paid for it in material cost the quote didn't isolate.\n\nFIX (1:10–1:25): Material efficiency is a vendor qualification criterion, not an afterthought. Ask for plate yield rate on comparable programs. The vendor who wastes 3% of material versus the vendor who wastes 18% is offering different actual value — regardless of quoted price.\n\nTAKEAWAY (1:25–1:30): Bid price reflects cost basis. Cost basis reflects efficiency. Efficiency is something you can measure before you sign — if you ask.`,
    `PROBLEM (0:00–0:20): A repeat fabrication customer runs the same structural program every quarter. Four vendors rotate through the work based on capacity. Cost variance per quarter: up to 22%. Same drawings. Same specs. The material cost moves.\n\nCOST (0:20–0:40): ${PROBLEM_DATA['material-waste'].stat3}. The high-waste vendor runs 20% material waste. The low-waste vendor runs 3%. On a $150,000 material program, that's a $25,500 cost differential — per quarter. Over a year: $102,000 in material cost variance from nesting efficiency differences alone.\n\nMISTAKE (0:40–1:00): ${PROBLEM_DATA['material-waste'].stat1}. The customer didn't track waste rate by vendor. They tracked quote price. The low-quote vendor in a given quarter was not always the low-cost vendor — because the material efficiency gap wasn't in the comparison.\n\nFIX (1:00–1:20): Track total cost per unit — not quote price per program. Include material yield, scrap rate, and rework rate in the vendor performance scorecard. The vendor with the best total cost is identifiable with this data. Without it, you're comparing quotes.\n\nTAKEAWAY (1:20–1:30): Vendor performance data is only useful if you collect the right variables. Material efficiency is one of the most impactful — and one of the least tracked.`,
  ],
}

const RETENTION_BEATS: Record<string, string[]> = {
  'fabrication-bottlenecks': ['Name the bottleneck type at 0:15 to give viewers a concrete scenario to track', 'Introduce the cost number at 0:35 before explaining the cause — leads with the consequence', 'Reveal the structural fix at 1:05 to give viewers a clear action orientation before the CTA'],
  'production-delays': ['Open with the downstream cost metric — makes the delay tangible before the cause explanation', 'Use the 68% stat at the midpoint to anchor the "fabrication first" framing', 'End with the vendor selection implication — connects watching the video to a decision they can make'],
  'rework-scrap-cost': ['Lead with the discovery scenario — post-delivery QC failure creates immediate tension', 'Introduce the three-cost framework at the midpoint — most viewers have only considered one', 'Close with the inspection process as the fix — a specific, actionable takeaway'],
  'labor-inefficiency': ['Open with the variance report reveal — a number that surprises most viewers', 'Use the supervisor time stat to make inefficiency concrete and relatable', 'Close with the shop floor management system question — gives viewers a vendor evaluation tool'],
  'poor-project-coordination': ['Open with the coordination failure scenario — a situation most PM viewers recognize', 'Name the 2.3x multiplier early — it quantifies a risk most viewers feel but haven\'t measured', 'Close with the pre-program question about coordination accountability — a clear action point'],
  'missed-deadlines': ['Lead with the penalty clause consequence — maximum tension at the start', 'Use the 72% stat to validate the difficulty before positioning the solution', 'Close with the production capacity question — a specific thing to ask before the next vendor selection'],
  'cost-overruns': ['Open with the change order conversation — most viewers have had it', 'Name the 3x overrun stat at the midpoint — makes the front-end review ROI obvious', 'Close with the procurement process implication — connects the insight to an actionable change'],
  'quality-inconsistency': ['Lead with the rejection rate at delivery — maximum cost scenario creates urgency', 'Name the multi-vendor structural cause early — most viewers blame individual vendors instead', 'Close with the unified QC standard as the fix — a specific, achievable structural change'],
  'equipment-downtime': ['Open with the failure scenario mid-program — maximizes tension', 'Introduce the utilization-rate connection at the midpoint — explains why it happens when it does', 'Close with the maintenance program question — a vendor qualification tool viewers can use immediately'],
  'material-waste': ['Lead with the waste rate and dollar impact — makes an abstract concept concrete', 'Use the nesting comparison to show the fix is process, not material quality', 'Close with the vendor qualification question — gives viewers a specific evaluation tool'],
}

const BUSINESS_INSIGHTS: Record<string, string> = {
  'fabrication-bottlenecks': `The downstream financial exposure from a fabrication bottleneck is not linear — it multiplies by trade count. ${PROBLEM_DATA['fabrication-bottlenecks'].cost1}. ${PROBLEM_DATA['fabrication-bottlenecks'].cost2}. A project with four active trades downstream of a delayed fabrication sequence is absorbing $3,200–$10,000/day in idle labor cost — from a bottleneck that started in the shop, not on the jobsite.`,
  'production-delays': `The financial exposure from production delays compounds daily. ${PROBLEM_DATA['production-delays'].cost1}. ${PROBLEM_DATA['production-delays'].cost2}. At three active downstream trades and a three-week delay, the idle labor exposure reaches $168,000–$525,000 — before the project manager has written the first change order or had the first conversation with the fabrication vendor about the delay.`,
  'rework-scrap-cost': `Rework cost in fabrication has a known range and a calculable impact. ${PROBLEM_DATA['rework-scrap-cost'].cost1}. ${PROBLEM_DATA['rework-scrap-cost'].cost2}. On a $600,000 fabrication program, 10% rework cost is $60,000 in direct exposure. The downstream schedule impact — typically 2–4 weeks of installation delay — adds a multiple of that number in idle labor and general conditions costs.`,
  'labor-inefficiency': `Labor efficiency is the highest-leverage cost variable in fabrication — and the least measured. ${PROBLEM_DATA['labor-inefficiency'].cost1}. ${PROBLEM_DATA['labor-inefficiency'].cost2}. At 40% of fabrication cost, a 25% productivity gap means every $1M in fabrication volume absorbs $100,000 in preventable labor cost. That cost is embedded in every quote from every shop running at poor efficiency — and the customer pays it invisibly.`,
  'poor-project-coordination': `Coordination failures in fabrication are high-frequency, high-cost events that are structural in origin. ${PROBLEM_DATA['poor-project-coordination'].cost1}. ${PROBLEM_DATA['poor-project-coordination'].cost2}. The specification error that surfaces at delivery — not at drawing review — is a schedule problem, not just a technical problem. By the time it's found, the correction cost is maximum and the timeline impact is immediate.`,
  'missed-deadlines': `The financial exposure from a missed fabrication deadline has two components: direct and downstream. ${PROBLEM_DATA['missed-deadlines'].cost1}. ${PROBLEM_DATA['missed-deadlines'].cost2}. Combined with downstream idle labor at $2,000–$2,500/day per trade across multiple mobilized crews, a two-week fabrication slip routinely generates total project cost impact in the six-figure range from a single delivery miss.`,
  'cost-overruns': `Fabrication cost overruns are a documented pattern — not random events. ${PROBLEM_DATA['cost-overruns'].cost1}. ${PROBLEM_DATA['cost-overruns'].cost2}. The change order that arrives mid-production at $85,000 was preventable. The front-end engineering review that would have caught it costs a fraction of that number and requires one structured meeting before production starts. The ROI is explicit.`,
  'quality-inconsistency': `Quality inconsistency in fabrication has a measurable, recurring cost. ${PROBLEM_DATA['quality-inconsistency'].cost1}. ${PROBLEM_DATA['quality-inconsistency'].cost2}. A 200-component program with 15% rejection at first inspection generates 30 remediation events. At $300 average per event: $9,000 in direct cost. At 3–4 weeks of installation delay from discovering this at delivery: the downstream exposure is 10–20x the direct remediation cost.`,
  'equipment-downtime': `Equipment downtime is a throughput problem, not just a maintenance problem. ${PROBLEM_DATA['equipment-downtime'].cost1}. ${PROBLEM_DATA['equipment-downtime'].cost2}. A shop averaging 9 unplanned downtime hours per month absorbs $10,800–$40,500/month in throughput loss. Over a year, that's $130,000–$486,000 in production value that didn't get produced — and every job that ran through that year absorbed a proportional share of the delay.`,
  'material-waste': `Material waste is the cost variable that hides in plain sight on every fabrication quote. ${PROBLEM_DATA['material-waste'].cost1}. ${PROBLEM_DATA['material-waste'].cost2}. On a $300,000 plate steel program, the difference between 3% waste and 20% waste is $51,000 in material purchased and scrapped. That $51,000 is in the quote — as "material cost." No line item. No explanation. Just a cost that competent nesting programming eliminates.`,
}

const VIDEO_CTAS: Record<string, string[]> = {
  'fabrication-bottlenecks': [
    'If your current fabrication program uses three or more vendors, the coordination surface audit is worth doing now — before delivery. Link in description.',
    'Comment with your current vendor count and project type. I\'ll tell you the coordination risk profile for your specific structure.',
    'Subscribe for weekly content on fabrication cost control for OEMs and project managers.',
  ],
  'production-delays': [
    'If you\'ve absorbed downstream idle labor cost from a fabrication delay in the last two projects, comment — I\'ll share the cost tracking framework we use.',
    'Subscribe for weekly fabrication management content that goes beyond the bid sheet.',
    'The production visibility framework mentioned in this video — link in description. Takes 15 minutes to implement before your next program.',
  ],
  'rework-scrap-cost': [
    'Comment \'QC\' and I\'ll share the pre-production inspection checklist that catches most rework before it compounds.',
    'If you\'re evaluating a fabrication vendor, ask for their scrap rate on comparable programs. The number is telling.',
    'Subscribe for more fabrication cost control content — new video every week.',
  ],
  'labor-inefficiency': [
    'Comment with your average labor variance on closed fab jobs. Most viewers have never calculated it.',
    'The shop floor efficiency audit framework is in the description — a 10-point checklist for evaluating a vendor before order placement.',
    'Subscribe for weekly content on operational efficiency in contract manufacturing.',
  ],
  'poor-project-coordination': [
    'Before your next multi-vendor program starts, download the coordination risk mapping template in the description.',
    'Comment with your current vendor count. I\'ll share the coordination failure rate data for your program structure.',
    'Subscribe for weekly content on fabrication program management.',
  ],
  'missed-deadlines': [
    'The vendor qualification questions mentioned in this video — link in description. Ask these before the next order.',
    'Comment with your fabrication deadline miss rate over the last year. The number tells you more than the individual incidents.',
    'Subscribe for weekly fabrication content — practical, no fluff.',
  ],
  'cost-overruns': [
    'The front-end engineering review checklist is in the description. It\'s what a pre-production scope alignment covers.',
    'Comment with your average fabrication bid-to-final cost variance. Most viewers have never calculated it across a project set.',
    'Subscribe for more fabrication cost control content.',
  ],
  'quality-inconsistency': [
    'The first-article inspection protocol is in the description — what it covers and how to require it from your vendors.',
    'Comment with your current rejection rate at first inspection on multi-vendor programs. The number will either confirm or surprise you.',
    'Subscribe for weekly quality and cost control content for fabrication programs.',
  ],
  'equipment-downtime': [
    'Ask your fab vendor for their maintenance schedule on the equipment running your job. The answer tells you a lot about delivery reliability.',
    'Comment with the worst equipment downtime story you\'ve had in a fabrication program. Most viewers have one.',
    'Subscribe for weekly fabrication operational content.',
  ],
  'material-waste': [
    'Ask your next fabrication vendor for their plate yield rate on comparable programs. It\'s the number that separates the quotes.',
    'The material efficiency scorecard is in the description — a framework for comparing vendors on actual cost, not bid price.',
    'Subscribe for weekly fabrication cost control content.',
  ],
}

const REPURPOSING_SUGGESTIONS: Record<string, string[]> = {
  'fabrication-bottlenecks': ['Break the script into a 6-tweet thread about the cascade effect of multi-vendor fabrication programs', 'Turn the fix section into a LinkedIn carousel: "5 questions to ask before structuring a fabrication program"', 'Use the 3-second hook as an Instagram Reel opening with B-roll of an active fab shop floor'],
  'production-delays': ['Convert to a LinkedIn post using just the cost stat and the downstream multiplier', 'Turn into an Instagram carousel: "The downstream cost of a 3-week fabrication delay"', 'Break the retention beats into a Twitter thread framing each as a question project managers should ask'],
  'rework-scrap-cost': ['Pull the three-cost framework into a LinkedIn post — most readers have only considered direct material cost', 'Turn into a Facebook educational post with practical inspection checklist takeaway', 'Use the scrap rate stat as a standalone Twitter/X post for fabrication operators'],
  'labor-inefficiency': ['Convert the variance report scenario into a LinkedIn post hook', 'Turn into an Instagram carousel: "What shop floor efficiency actually looks like"', 'Break into a Twitter thread framing labor as the most impactful and least-measured fabrication variable'],
  'poor-project-coordination': ['Turn the 1-in-4 spec error stat into a standalone LinkedIn post', 'Use the coordination failure scenario as a Facebook discussion prompt for project managers', 'Convert the fix section into an Instagram carousel on coordination risk reduction'],
  'missed-deadlines': ['Pull the penalty clause cost scenario into a LinkedIn post', 'Convert the vendor qualification questions into an Instagram carousel', 'Break into a Twitter thread about what reliable fabrication partners provide'],
  'cost-overruns': ['Turn the "lowest bid, highest cost" angle into a contrarian LinkedIn post', 'Use the front-end review ROI into a Facebook educational post', 'Convert the change order pattern into a Twitter thread for procurement officers'],
  'quality-inconsistency': ['Pull the rejection rate stat into a standalone LinkedIn post for procurement directors', 'Turn the multi-vendor QC failure scenario into a Facebook discussion prompt', 'Use the single-source quality comparison as an Instagram carousel'],
  'equipment-downtime': ['Turn the downtime cost calculation into a LinkedIn post for operations directors', 'Convert the maintenance program comparison into a Facebook educational post', 'Use the cascade failure scenario as an Instagram Reel hook'],
  'material-waste': ['Pull the nesting efficiency cost comparison into a LinkedIn post', 'Turn the vendor comparison scenario into a Twitter thread', 'Convert the material waste audit approach into an Instagram carousel'],
}

export function generateYouTube(inputs: YouTubeInputs, seed: number = 0): YouTubeOutput {
  const v = seed % 3
  const p = inputs.problem
  const fmt = inputs.videoFormat

  const titleSet = TITLES[p] ?? TITLES['fabrication-bottlenecks']
  const titleIdx = fmt === 'shorts' ? 0 : fmt === '60-90s' ? 1 : 2
  const titles = titleSet[titleIdx] ?? titleSet[0]
  const title = titles[v % titles.length] ?? titles[0]

  const thumbnailRaw = THUMBNAIL_TEXTS[p] ?? THUMBNAIL_TEXTS['fabrication-bottlenecks']
  const thumbnailParts = thumbnailRaw.split('|')
  const thumbnailText = thumbnailParts[v % thumbnailParts.length] ?? thumbnailParts[0]

  const hooksArr = THREE_SECOND_HOOKS[p] ?? THREE_SECOND_HOOKS['fabrication-bottlenecks']
  const threeSecondHook = hooksArr[v] ?? hooksArr[0]

  const openingArr = OPENING_LINES[p] ?? OPENING_LINES['fabrication-bottlenecks']
  const openingLine = openingArr[v] ?? openingArr[0]

  const scriptArr = SCRIPT_OUTLINES[p] ?? SCRIPT_OUTLINES['fabrication-bottlenecks']
  const scriptOrOutline = scriptArr[v] ?? scriptArr[0]

  const beatsArr = RETENTION_BEATS[p] ?? RETENTION_BEATS['fabrication-bottlenecks']
  const retentionBeats = beatsArr

  const businessInsight = BUSINESS_INSIGHTS[p] ?? BUSINESS_INSIGHTS['fabrication-bottlenecks']

  const ctasArr = VIDEO_CTAS[p] ?? VIDEO_CTAS['fabrication-bottlenecks']
  const cta = ctasArr[v % ctasArr.length] ?? ctasArr[0]

  const repArr = REPURPOSING_SUGGESTIONS[p] ?? REPURPOSING_SUGGESTIONS['fabrication-bottlenecks']

  const qualityScore = scoreContent(inputs, true, true, true, scriptOrOutline.split(' ').length)

  const improvementSuggestions = [
    'Add a specific customer type (OEM, contractor, developer) to anchor the scenario to a recognizable audience segment.',
    'Include a specific dollar-per-unit calculation for your primary product category to make the cost stat more tangible.',
    'Reference a real fabrication process sequence (cutting → forming → welding) to give non-fabrication viewers a concrete mental model.',
  ]

  return {
    platform: 'youtube',
    title,
    thumbnailText,
    threeSecondHook,
    openingLine,
    scriptOrOutline,
    retentionBeats,
    businessInsight,
    cta,
    repurposingSuggestions: repArr.slice(0, 3),
    qualityScore,
    improvementSuggestions,
  }
}
