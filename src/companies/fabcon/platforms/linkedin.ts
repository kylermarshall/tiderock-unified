import type { LinkedInInputs, LinkedInOutput, PostIdea, CalendarEntry } from '../types'
import { PROBLEM_DATA, PROBLEM_LABELS } from '../lib/companyProfile'
import { scoreContent } from '../lib/scoring'

const HOOKS: Record<string, string[]> = {
  'fabrication-bottlenecks': [
    "Most fabrication projects don't fail at the weld table. They fail at the handoff — weeks before any steel is cut.",
    "The bottleneck in your fabrication program is not where you think it is. It's upstream, in sequencing and readiness.",
    "One fabrication bottleneck can delay a project by four weeks. The real cost is not the delay — it's every idle crew waiting downstream.",
  ],
  'production-delays': [
    "The fabrication delivery is late. Every trade waiting on-site just became your problem.",
    "Most projects don't go over budget because of material cost. They go over budget because fabrication delays ripple through the entire timeline.",
    "A production delay in the fab shop is a $2,500/day problem on-site before a single additional hour is worked.",
  ],
  'rework-scrap-cost': [
    "Rework doesn't just cost the repair time. It costs the schedule slot that cannot be recovered.",
    "A single incorrect weld on a structural component can cost 8 hours of remediation and two weeks of timeline.",
    "5–12% of total project cost lost to rework is not a quality problem. It's a planning and process problem.",
  ],
  'labor-inefficiency': [
    "Labor is 35–50% of total fabrication cost. It's also the most poorly tracked variable in most shops.",
    "Shop floor inefficiency is invisible in the estimate. It shows up in the variance report after the job closes.",
    "A 20–35% productivity loss from poor sequencing doesn't show up on anyone's daily report — until the job runs over.",
  ],
  'poor-project-coordination': [
    "Every additional vendor in your fabrication program doubles the coordination surface area for failure.",
    "Specification errors from coordination gaps cost more than the parts they affect. They cost time — and time costs everything downstream.",
    "1 in 4 complex fabrication projects has a specification error driven by coordination failure. That's not a stat — it's a planning problem.",
  ],
  'missed-deadlines': [
    "The penalty clause in a construction contract doesn't care who missed the fab deadline. It charges the owner.",
    "Missed fabrication deadlines don't just delay installation. They push every subsequent trade and close out sequence.",
    "72% of project managers can't reliably forecast fabrication timing. That uncertainty has a dollar value — and someone absorbs it.",
  ],
  'cost-overruns': [
    "Fabrication cost overruns average 18–28% on complex structural projects. Most of them were preventable.",
    "The change order is never a surprise to the fabricator. It's almost always a surprise to the project manager.",
    "Projects that skip front-end engineering review in fabrication experience 3x more cost overruns. The review is not a cost — it's insurance.",
  ],
  'quality-inconsistency': [
    "Quality inconsistency across fabrication vendors is predictable. It's the output of using multiple shops with different standards.",
    "An 8–20% first-inspection rejection rate is not bad luck. It's the result of a vendor selection process that prioritized price over process.",
    "Inconsistent weld quality doesn't show up at order time. It shows up at inspection — after the schedule has no room to absorb it.",
  ],
  'equipment-downtime': [
    "Unplanned equipment downtime in a fab shop doesn't just stop one machine. It stops the entire production sequence.",
    "A CNC plasma table down for six hours costs $4,500 in throughput — and every job behind it shifts on the calendar.",
    "Shops without preventive maintenance programs spend 40–60% more time reacting to failures than shops that don't. That difference is passed to the customer.",
  ],
  'material-waste': [
    "Material waste in fabrication is not a line item — it's embedded in the material cost before the quote is written.",
    "12–22% plate steel waste from poor nesting shows up as 'material cost.' It's actually a programming and planning cost.",
    "Two shops quote the same job differently. The difference is often in the nesting efficiency — not the steel price.",
  ],
}

const BODIES: Record<string, string[]> = {
  'fabrication-bottlenecks': [
    `Metal fabrication projects have many handoffs — from design to cutting, forming to welding, welding to finishing, finishing to delivery.\n\nEvery one of those handoffs is a potential bottleneck.\n\n${PROBLEM_DATA['fabrication-bottlenecks'].stat1}.\n\nThe delay is not just in the bottleneck itself. It's in every downstream phase that cannot begin until the bottleneck clears.\n\n${PROBLEM_DATA['fabrication-bottlenecks'].stat2}.\n\nThe more vendors in a fabrication program, the more handoffs — and the more surfaces where timing failures occur.\n\n${PROBLEM_DATA['fabrication-bottlenecks'].stat3}.\n\nThe project manager tracking on-site progress is often the last to know. The bottleneck happened two weeks ago in the shop.`,
    `Fabrication bottlenecks are predictable when you map the process. Most project teams don't map the process.\n\n${PROBLEM_DATA['fabrication-bottlenecks'].stat3}.\n\nWhen cutting is complete but forming is backed up — every welding station that depends on formed components stops.\n\n${PROBLEM_DATA['fabrication-bottlenecks'].stat2}.\n\nDisconnected vendors don't see each other's bottlenecks. They each report their own progress — while the downstream sequence stalls.\n\n${PROBLEM_DATA['fabrication-bottlenecks'].stat1}.\n\nThe two-to-four week delay was decided before the steel was touched. It was decided in how the vendor relationships were structured.`,
    `The shop with five vendors processing different components simultaneously looks efficient.\n\nUntil one of them hits a machine issue.\n\n${PROBLEM_DATA['fabrication-bottlenecks'].stat2}.\n\nThe cascade is immediate. Components that depend on the delayed vendor can't proceed. Assembly can't begin. Delivery moves.\n\n${PROBLEM_DATA['fabrication-bottlenecks'].stat1}.\n\nTwo to four weeks is not the cost of the machine issue. It's the cost of the program structure that created the dependency.\n\n${PROBLEM_DATA['fabrication-bottlenecks'].stat3}.\n\nConsolidating fabrication under one roof doesn't just reduce vendors. It removes the coordination surface where bottlenecks form.`,
  ],
  'production-delays': [
    `When fabrication falls behind, on-site crews don't wait productively.\n\nThey idle. Or they work out of sequence — creating rework, safety risk, and cost.\n\n${PROBLEM_DATA['production-delays'].stat2}.\n\nA three-week fabrication delay on a project with four active trades means $67,000–$210,000 in downstream idle cost — before a single change order is written.\n\n${PROBLEM_DATA['production-delays'].stat1}.\n\nThe 15–25% timeline extension is the visible number. The labor idle cost is the one that compounds daily and often isn't tracked to the source.\n\n${PROBLEM_DATA['production-delays'].stat3}.\n\n68% of construction project overruns trace to fabrication and material delays. Not on-site execution. The schedule was lost before site work began.`,
    `Most project timelines are built around optimistic fabrication assumptions.\n\n${PROBLEM_DATA['production-delays'].stat3}.\n\nFabrication timing is the hardest variable to forecast — and the one that gets the least scrutiny during planning.\n\n${PROBLEM_DATA['production-delays'].stat1}.\n\nA 15–25% timeline extension on a six-month project is 3–6 weeks. In construction, those weeks cost real money at every level.\n\n${PROBLEM_DATA['production-delays'].stat2}.\n\n$800–$2,500 per day per idle trade. On a complex project with three trades dependent on fabrication delivery, that's a five-figure daily cost for delays measured in weeks.`,
    `Fabrication delays are rarely caused by what shows up in the incident report.\n\nThey're caused by upstream planning failures — underspecified timelines, overcommitted vendors, unresolved design questions held too long.\n\n${PROBLEM_DATA['production-delays'].stat3}.\n\n68% of overruns trace back to this phase. Not to installation. Not to site conditions.\n\n${PROBLEM_DATA['production-delays'].stat2}.\n\nThe downstream cost clock starts the day delivery is missed. $800–$2,500 per day per trade — before the fabricator has finished explaining the delay.\n\n${PROBLEM_DATA['production-delays'].stat1}.\n\nThe project that was 10% over budget on paper was 25% over budget by the time the real timeline played out.`,
  ],
  'rework-scrap-cost': [
    `Rework in metal fabrication is expensive in three ways — and most project budgets only account for one.\n\nFirst: the material that was cut, formed, or welded incorrectly and must be replaced.\n\nSecond: the labor to remediate, re-inspect, and reprocess.\n\nThird — and most expensive: the schedule.\n\n${PROBLEM_DATA['rework-scrap-cost'].stat2}.\n\nFour to eight hours per structural rework event. In a program with a hard delivery date, those hours are not recoverable.\n\n${PROBLEM_DATA['rework-scrap-cost'].stat1}.\n\n5–12% of total project cost. On a $500,000 fabrication program, that's $25,000–$60,000 that was not in the estimate.\n\n${PROBLEM_DATA['rework-scrap-cost'].stat3}.\n\nScrap rates 3–4x higher than best-in-class operations. Every percentage point of scrap is a direct margin hit.`,
    `The root cause of rework in fabrication shops is almost always the same.\n\nIncomplete drawings. Unclear specifications. Inadequate first-article inspection.\n\n${PROBLEM_DATA['rework-scrap-cost'].stat1}.\n\nWhen there is no formal QC checkpoint between cutting and welding, dimensional errors compound. By the time the weldment reaches inspection, the correction is expensive.\n\n${PROBLEM_DATA['rework-scrap-cost'].stat3}.\n\nShops running 8–15% scrap rates are not using bad material. They're using poor programming and planning practices.\n\n${PROBLEM_DATA['rework-scrap-cost'].stat2}.\n\nFour to eight hours per rework event sounds manageable — until the program has ten components in parallel and three of them need remediation in the same week.`,
    `Project managers track rework as a quality metric.\n\nThey should track it as a financial metric.\n\n${PROBLEM_DATA['rework-scrap-cost'].stat1}.\n\n5–12% of total project cost. That number accounts for material and direct labor. It does not account for the downstream schedule impact — which is often larger.\n\n${PROBLEM_DATA['rework-scrap-cost'].stat2}.\n\nA single 8-hour structural rework event pushed three days before delivery is not an 8-hour problem. It's a delivery date problem.\n\n${PROBLEM_DATA['rework-scrap-cost'].stat3}.\n\nScrap rate disparity between well-run and poorly-run shops: 2–4% versus 8–15%. The difference is process discipline — not equipment or material.`,
  ],
  'labor-inefficiency': [
    `Fabrication labor inefficiency is one of the most expensive and least measured cost drivers in manufacturing.\n\n${PROBLEM_DATA['labor-inefficiency'].stat3}.\n\nLabor is 35–50% of total fabrication cost. A 20–35% productivity loss from poor sequencing or shop floor disorganization has a direct impact on margin — and on delivery timing.\n\n${PROBLEM_DATA['labor-inefficiency'].stat1}.\n\nThe difference between an optimized layout and a disorganized one is not minor. It's the difference between jobs that close on time and jobs that don't.\n\n${PROBLEM_DATA['labor-inefficiency'].stat2}.\n\nSix to ten wasted supervisor hours per week on status chasing is not a minor inefficiency. It's full work-days of leadership capacity absorbed by coordination that should be automatic.`,
    `The fabrication estimate was built on planned labor hours.\n\nThe actual came in 25% higher.\n\n${PROBLEM_DATA['labor-inefficiency'].stat1}.\n\nPoor shop floor sequencing causes 20–35% productivity loss. That gap does not appear in a planning meeting — it accumulates over weeks on the shop floor.\n\n${PROBLEM_DATA['labor-inefficiency'].stat2}.\n\nSupervisors chasing job status instead of running production adds up. Six to ten hours per supervisor per week is a full work-day of management capacity lost.\n\n${PROBLEM_DATA['labor-inefficiency'].stat3}.\n\nAt 35–50% of fabrication cost, labor is where efficiency wins and losses are largest. Most shops optimize for equipment utilization and let labor efficiency drift.`,
    `Labor productivity in fabrication is rarely measured directly.\n\nMost shops measure output — parts completed, welds finished, hours clocked. Few measure the efficiency of how those hours were spent.\n\n${PROBLEM_DATA['labor-inefficiency'].stat1}.\n\nThe 20–35% productivity loss from poor sequencing is embedded in those output numbers. The shop appears busy. The job still runs over.\n\n${PROBLEM_DATA['labor-inefficiency'].stat3}.\n\nIf labor is 40% of your fabrication cost and productivity is 25% below optimum, you're spending 10% more than you should on every job — before materials, before overhead.\n\n${PROBLEM_DATA['labor-inefficiency'].stat2}.\n\nThe supervisor hours lost to coordination are hours not spent managing quality, sequencing, and throughput. The cost is not just the time — it's what didn't get done while the time was spent.`,
  ],
  'poor-project-coordination': [
    `A fabrication program with five vendors has five communication channels, five delivery timelines, and five opportunities for specification error.\n\n${PROBLEM_DATA['poor-project-coordination'].stat1}.\n\n2.3x more coordination failures at three or more vendors is not a vendor quality problem. It's a structural problem — too many interfaces, not enough integration.\n\n${PROBLEM_DATA['poor-project-coordination'].stat2}.\n\n1 in 4 complex projects experiences a specification error from coordination gaps. That error is discovered at receiving, at inspection, or after installation — never earlier.\n\n${PROBLEM_DATA['poor-project-coordination'].stat3}.\n\n40% of late project completions trace back to coordination gaps between fabrication, finishing, and delivery. Not to any single vendor's failure — to the gaps between them.`,
    `The project coordination problem in fabrication is not that vendors can't communicate.\n\nIt's that no one is responsible for making sure they do.\n\n${PROBLEM_DATA['poor-project-coordination'].stat3}.\n\nFabrication, finishing, and delivery are three sequential but often independently managed phases. When coordination fails at any handoff, the next phase absorbs the delay.\n\n${PROBLEM_DATA['poor-project-coordination'].stat1}.\n\nAt three or more vendors, the coordination surface expands faster than the oversight capacity of most project teams.\n\n${PROBLEM_DATA['poor-project-coordination'].stat2}.\n\nOne in four complex projects has a spec error from a coordination gap. Most of those errors were identifiable before production started — if there had been a single point of coordination accountable for catching them.`,
    `Specification errors from coordination failures are the most expensive kind.\n\nNot because the fix is complicated — because the timing is always wrong.\n\n${PROBLEM_DATA['poor-project-coordination'].stat2}.\n\n1 in 4 complex projects. Discovered at delivery or installation, not at drawing review.\n\n${PROBLEM_DATA['poor-project-coordination'].stat1}.\n\nThe coordination failure multiplier at three or more vendors is 2.3x. Each additional vendor adds not just capacity — it adds communication surface and potential misalignment.\n\n${PROBLEM_DATA['poor-project-coordination'].stat3}.\n\n40% of late completions trace to coordination gaps. Not to fabrication quality. Not to delivery logistics. To the space between vendors where no one was managing alignment.`,
  ],
  'missed-deadlines': [
    `Fabrication deadlines are missed for predictable reasons.\n\nNot bad luck — but compressed timelines, overcommitted vendors, and scope that wasn't fully defined when the schedule was built.\n\n${PROBLEM_DATA['missed-deadlines'].stat1}.\n\nA 3–6 week installation delay is not a minor setback. It pushes every downstream trade sequence, every close-out milestone, every certificate of occupancy.\n\n${PROBLEM_DATA['missed-deadlines'].stat2}.\n\n$5,000–$25,000 per week in penalty exposure. That exposure sits with the project owner — not the fabrication vendor.\n\n${PROBLEM_DATA['missed-deadlines'].stat3}.\n\n72% of project managers can't reliably forecast fab timing. That uncertainty is a risk that's rarely priced into project contingency.`,
    `The fabrication vendor said four weeks.\n\nAt week three, they said six.\n\n${PROBLEM_DATA['missed-deadlines'].stat3}.\n\n72% of project managers can't accurately forecast fabrication timing. That number represents the gap between vendor commitments and actual delivery.\n\n${PROBLEM_DATA['missed-deadlines'].stat2}.\n\nAt $5,000–$25,000 per week in penalty exposure, a two-week slip on a commercial project is a five-figure problem before the remediation conversation begins.\n\n${PROBLEM_DATA['missed-deadlines'].stat1}.\n\nThe 3–6 week installation window delay doesn't show up as "fabrication delay" on the budget report. It shows up as change orders, overtime premiums, and extended general conditions.`,
    `Missed deadlines in fabrication are rarely a one-project problem.\n\nThey're a vendor selection and planning problem that repeats project after project.\n\n${PROBLEM_DATA['missed-deadlines'].stat3}.\n\n72% of project managers say fab timing is the hardest variable to forecast. The solution is not better guessing — it's a fabrication partner with transparent production tracking.\n\n${PROBLEM_DATA['missed-deadlines'].stat1}.\n\nA 3–6 week installation push on a commercial build is not recoverable without significant cost. Every trade that follows the delayed component pays the price.\n\n${PROBLEM_DATA['missed-deadlines'].stat2}.\n\n$25,000/week in penalty exposure is not a hypothetical. It's the contract language most project owners signed and most project managers underestimated.`,
  ],
  'cost-overruns': [
    `Fabrication cost overruns don't happen randomly.\n\nThey happen in predictable ways — when scope isn't fully defined, when front-end review is skipped, and when the lowest bidder is selected without understanding their process.\n\n${PROBLEM_DATA['cost-overruns'].stat3}.\n\nProjects that skip engineering review at the fabrication stage experience 3x more overruns. The review is not overhead — it's the catch that prevents $85,000 in change orders.\n\n${PROBLEM_DATA['cost-overruns'].stat2}.\n\n$12,000–$85,000 in change order exposure from fabrication scope gaps. On a $400,000 project, that's a 3–21% cost swing driven by a planning shortcut.\n\n${PROBLEM_DATA['cost-overruns'].stat1}.\n\n18–28% average overrun on complex structural projects. The projects that beat that number have better upfront process — not better luck.`,
    `The change order conversation in fabrication almost always starts the same way.\n\n"We need to discuss something we found during production."\n\n${PROBLEM_DATA['cost-overruns'].stat2}.\n\n$12,000–$85,000 in additional cost traced to a scope gap that could have been caught in a pre-production review.\n\n${PROBLEM_DATA['cost-overruns'].stat3}.\n\nProjects with front-end engineering review experience 3x fewer overruns. Most projects skip it to save time — and spend more to correct the problems it would have caught.\n\n${PROBLEM_DATA['cost-overruns'].stat1}.\n\n18–28% average overrun means the $300,000 structural fabrication program landed at $354,000–$384,000. The bid process optimized for the lowest number. The final cost tells a different story.`,
    `Cost overruns in fabrication are not billing disputes.\n\nThey're the predictable output of a procurement process that prioritizes initial price over process quality.\n\n${PROBLEM_DATA['cost-overruns'].stat1}.\n\nThe 18–28% overrun average on complex structural projects is consistent because the conditions that produce it are consistent — unclear scope, no review process, and vendors who underbid to win.\n\n${PROBLEM_DATA['cost-overruns'].stat3}.\n\nA front-end engineering review costs time. 3x fewer overruns without it proves the cost of skipping it is far greater.\n\n${PROBLEM_DATA['cost-overruns'].stat2}.\n\n$85,000 in change orders on a single project. The review that would have caught it cost a fraction of that — and usually was never scheduled.`,
  ],
  'quality-inconsistency': [
    `When a fabrication program spans multiple vendors, quality consistency is the first thing lost.\n\nNot because vendors are negligent — but because different shops have different tolerances, different inspection standards, and different definitions of "acceptable."\n\n${PROBLEM_DATA['quality-inconsistency'].stat1}.\n\n8–20% rejection rate at first inspection in multi-vendor programs. In a program with 200 components, that's 16–40 pieces requiring remediation — after delivery.\n\n${PROBLEM_DATA['quality-inconsistency'].stat3}.\n\nWith four or more fabrication sources, dimensional tolerance failures occur at 3x the rate of single-source programs. Consistency is a function of process standardization — not intent.\n\n${PROBLEM_DATA['quality-inconsistency'].stat2}.\n\n$150–$400 per weld remediation. At twenty events, that's $3,000–$8,000 in field correction cost — plus the schedule impact of out-of-spec components discovered after installation begins.`,
    `Quality inconsistency in fabrication is a structural problem — not a people problem.\n\n${PROBLEM_DATA['quality-inconsistency'].stat3}.\n\nFour or more fabrication sources produce 3x the dimensional tolerance failures of a single-source program. The inspection standard is different. The tolerance interpretation is different. The outcome is different.\n\n${PROBLEM_DATA['quality-inconsistency'].stat1}.\n\nAn 8–20% rejection rate at first inspection means the QC problem was discovered at receiving — not during production, where it costs less to fix.\n\n${PROBLEM_DATA['quality-inconsistency'].stat2}.\n\n$150–$400 per weld remediation adds up faster than it sounds. Ten events per project is common in multi-vendor programs. At $300 average, that's $3,000 in direct rework cost before any downstream impact is counted.`,
    `The procurement decision that spreads fabrication across multiple vendors to reduce price risk often creates a larger quality risk.\n\n${PROBLEM_DATA['quality-inconsistency'].stat1}.\n\n8–20% first-inspection rejection is not a defect problem. It's a consistency problem — driven by different shops interpreting the same drawings differently.\n\n${PROBLEM_DATA['quality-inconsistency'].stat3}.\n\nWith four or more sources, dimensional failures occur at 3x the rate. That rate is not random. It's the output of no unified QC standard across the program.\n\n${PROBLEM_DATA['quality-inconsistency'].stat2}.\n\nAt $150–$400 per weld remediation, the cost of inconsistency compounds quickly. The remediation cost is one part. The schedule disruption from discovering inconsistency after delivery is the larger problem.`,
  ],
  'equipment-downtime': [
    `Fabrication shops are equipment-dependent operations.\n\nWhen a plasma table goes down, cutting stops. When cutting stops, forming stops. When forming stops, welding waits. The cascade is immediate.\n\n${PROBLEM_DATA['equipment-downtime'].stat1}.\n\n$1,200–$4,500 per hour in lost throughput. In an 8-hour unplanned downtime event, that's $9,600–$36,000 in production value that didn't happen — and every job queued behind the failed machine shifts on the schedule.\n\n${PROBLEM_DATA['equipment-downtime'].stat2}.\n\nShops without preventive maintenance programs absorb 40–60% more unplanned downtime. The maintenance program is not a cost — it's the mechanism that keeps $4,500/hour risk off the table.\n\n${PROBLEM_DATA['equipment-downtime'].stat3}.\n\nAt above 80% utilization, CNC and plasma equipment averages 6–12 unplanned downtime hours per month. High utilization without maintenance planning produces failure at the worst possible time.`,
    `Equipment downtime in fabrication is almost entirely predictable — and almost entirely preventable.\n\n${PROBLEM_DATA['equipment-downtime'].stat2}.\n\nShops with preventive maintenance programs experience 40–60% less unplanned downtime. The difference is not equipment quality. It's scheduled attention before failure, not reaction after.\n\n${PROBLEM_DATA['equipment-downtime'].stat3}.\n\n6–12 unplanned hours per month on heavily utilized CNC equipment. Over a year, that's 72–144 hours of capacity lost — at $1,200–$4,500 per hour.\n\n${PROBLEM_DATA['equipment-downtime'].stat1}.\n\nThe financial exposure from unplanned downtime is not the repair cost. It's the throughput cost — the jobs that didn't move, the deliveries that slipped, and the downstream crews that waited.`,
    `The most expensive equipment failures in fabrication are the ones that were not scheduled.\n\n${PROBLEM_DATA['equipment-downtime'].stat1}.\n\n$4,500 per hour in throughput loss. An unplanned failure during peak production is not just expensive — it's timeline-altering.\n\n${PROBLEM_DATA['equipment-downtime'].stat2}.\n\n40–60% more unplanned downtime in shops without maintenance programs. That differential is the cost of not investing in a scheduled maintenance program.\n\n${PROBLEM_DATA['equipment-downtime'].stat3}.\n\nAbove 80% utilization, equipment failures don't plateau — they accelerate. Shops running at maximum capacity without maintenance discipline are building a failure event into their production calendar. The only question is when.`,
  ],
  'material-waste': [
    `Material waste in fabrication is a planning problem disguised as a materials problem.\n\n${PROBLEM_DATA['material-waste'].stat3}.\n\nManual layout and cutting generates 2–3x the waste of programmed nesting. The steel is the same. The difference is how the cuts are optimized before any torch is lit.\n\n${PROBLEM_DATA['material-waste'].stat1}.\n\n12–22% plate steel waste. On a program using $200,000 in plate, that's $24,000–$44,000 in material that was purchased, processed, and discarded.\n\n${PROBLEM_DATA['material-waste'].stat2}.\n\n$8–$30 per square foot of wasted plate. In fabrication programs with high plate volume, this figure is not a rounding error — it's a budget line that was never budgeted.`,
    `Two fabrication quotes for the same scope can differ by 10–15% with identical material pricing.\n\nThe difference is nesting efficiency.\n\n${PROBLEM_DATA['material-waste'].stat1}.\n\nA shop wasting 20% of plate steel input versus a shop wasting 4% is quoting from different cost bases — even if they buy steel from the same mill at the same price.\n\n${PROBLEM_DATA['material-waste'].stat3}.\n\nManual layout versus programmed nesting: 2–3x the waste. The technology gap is not large. The cost impact is.\n\n${PROBLEM_DATA['material-waste'].stat2}.\n\n$8–$30 per square foot of wasted plate becomes significant fast in structural programs. The customer absorbs it as "material cost" without realizing it was avoidable.`,
    `Most fabrication proposals don't show a line item for material waste.\n\nBut it's in the number — built into the material cost by the shop that knows how much they expect to waste.\n\n${PROBLEM_DATA['material-waste'].stat1}.\n\n12–22% waste in shops without nesting discipline. That waste percentage is part of the cost basis for every quote they write.\n\n${PROBLEM_DATA['material-waste'].stat3}.\n\nProgrammed nesting software reduces waste to 2–4%. The shops that use it price more accurately — and deliver better margins at the same cost to the customer.\n\n${PROBLEM_DATA['material-waste'].stat2}.\n\n$8–$30 per square foot of wasted plate. On a 10,000 sq ft cutting program, that's $80,000–$300,000 in waste that was preventable with better planning. It was paid by someone.`,
  ],
}

const BUSINESS_IMPACTS: Record<string, string> = {
  'fabrication-bottlenecks': `Operational exposure: ${PROBLEM_DATA['fabrication-bottlenecks'].cost1}. ${PROBLEM_DATA['fabrication-bottlenecks'].cost2}. A project running four active trades downstream of a delayed fabrication sequence carries $800–$2,500/day per trade in idle labor exposure. The bottleneck cost is not what happens in the shop — it's what stops outside of it while the shop catches up.`,
  'production-delays': `Financial exposure: ${PROBLEM_DATA['production-delays'].cost1}. ${PROBLEM_DATA['production-delays'].cost2}. On a commercial project with three trades dependent on fabrication delivery, a three-week delay generates $67,000–$210,000 in downstream idle labor cost alone. The fabrication delay is the trigger. Every other cost that follows is the consequence.`,
  'rework-scrap-cost': `Cost exposure: ${PROBLEM_DATA['rework-scrap-cost'].cost1}. ${PROBLEM_DATA['rework-scrap-cost'].cost2}. On a $500,000 fabrication program, 5–12% rework cost is $25,000–$60,000. That number does not include downstream schedule impact, re-inspection cost, or the field labor required to correct components discovered out-of-spec after delivery. The total exposure is consistently larger than the direct rework figure.`,
  'labor-inefficiency': `Productivity exposure: ${PROBLEM_DATA['labor-inefficiency'].cost1}. ${PROBLEM_DATA['labor-inefficiency'].cost2}. At 40% of fabrication cost, a 25% labor productivity gap means a 10% total cost overrun on every job — before materials, before overhead. That gap doesn't appear on a daily report. It appears in the variance when the job closes.`,
  'poor-project-coordination': `Coordination exposure: ${PROBLEM_DATA['poor-project-coordination'].cost1}. ${PROBLEM_DATA['poor-project-coordination'].cost2}. Specification errors from coordination failures are discovered at delivery or after installation begins — never earlier. At that point, the remediation cost includes not just the part correction but the downstream schedule impact on every trade waiting for the corrected component.`,
  'missed-deadlines': `Schedule exposure: ${PROBLEM_DATA['missed-deadlines'].cost1}. ${PROBLEM_DATA['missed-deadlines'].cost2}. At $25,000/week in penalty exposure and a two-week slip, the fabrication delay costs $50,000 in penalties before a single change order is written. Adding downstream idle labor and extended general conditions, total project cost impact from a single missed fabrication deadline routinely reaches six figures on commercial builds.`,
  'cost-overruns': `Budget exposure: ${PROBLEM_DATA['cost-overruns'].cost1}. ${PROBLEM_DATA['cost-overruns'].cost2}. A $300,000 structural fabrication program with an 18–28% overrun lands at $354,000–$384,000. The change order conversation happens after the steel is cut. At that point, the project owner has no leverage — only the choice to pay or delay.`,
  'quality-inconsistency': `Quality exposure: ${PROBLEM_DATA['quality-inconsistency'].cost1}. ${PROBLEM_DATA['quality-inconsistency'].cost2}. A 200-component program with 15% rejection at first inspection has 30 pieces requiring remediation. At $300 per weld correction and 4–8 hours per event for structural rework, the direct cost is $9,000–$12,000. The schedule impact of discovering this after delivery begins is typically several times larger.`,
  'equipment-downtime': `Throughput exposure: ${PROBLEM_DATA['equipment-downtime'].cost1}. ${PROBLEM_DATA['equipment-downtime'].cost2}. A shop averaging 9 hours of unplanned equipment downtime per month at $2,500/hour average is absorbing $22,500/month in throughput loss. Over a year, that's $270,000 in production capacity that didn't exist — and every job that ran through that year absorbed a share of it.`,
  'material-waste': `Material exposure: ${PROBLEM_DATA['material-waste'].cost1}. ${PROBLEM_DATA['material-waste'].cost2}. A fabrication program using 50,000 sq ft of plate steel at 15% waste generates 7,500 sq ft of waste. At $15/sq ft average waste cost, that's $112,500 in material purchased and discarded. That cost was in the quote. Most customers never saw it as a line item.`,
}

const CTAS: string[] = [
  "If you're managing a fabrication program and not tracking these variables, that's worth a 15-minute conversation. Link in comments.",
  "What's the actual fabrication timeline your last project delivered versus what was quoted? Most teams don't track the delta.",
  "We've mapped the real cost drivers for programs like yours. Comment 'AUDIT' and I'll share the breakdown.",
  "Tag a project manager who has absorbed a fabrication delay cost that never showed up on the original budget.",
  "Drop your project type in the comments. I'll outline where fabrication cost exposure typically concentrates in your sector.",
]

const IMPROVEMENT_SUGGESTIONS: Record<string, string[]> = {
  'fabrication-bottlenecks': [
    'Add a specific industry example (EV charger manufacturing, POP displays, structural steel) to anchor the bottleneck scenario to a recognizable context.',
    'Include a visual or description of what a "single-source" fabrication model looks like versus a multi-vendor one to make the structural point concrete.',
    'Name the specific handoff points in the fabrication sequence — design to cutting, forming to welding — so readers can map their own programs.',
  ],
  'production-delays': [
    'Add a specific project type (commercial buildout, industrial installation) to make the $800–$2,500/day idle labor figure more tangible.',
    'Include the typical fabrication lead time range so readers can assess their own schedule risk against industry norms.',
    'Reference the planning phase where delay risk is highest — the window between design finalization and fabrication kickoff.',
  ],
  'rework-scrap-cost': [
    'Add the specific QC checkpoint that catches most rework before it compounds — first-article inspection at the pre-weld stage.',
    'Include a cost comparison: shops with formal QC processes versus shops without, using the scrap rate differential.',
    'Quantify the schedule impact of a single rework event discovered post-delivery to complete the total cost picture.',
  ],
  'labor-inefficiency': [
    'Add the specific shop floor practices that drive the 20–35% efficiency gap — unclear job routing, no visual management, poor tooling placement.',
    'Include what an efficiency audit of a fabrication shop actually examines so readers understand what "optimized" looks like.',
    'Reference the supervisor time cost in dollar terms — 8 hours/week at fully-burdened supervisor cost for a mid-size shop.',
  ],
  'poor-project-coordination': [
    'Define what a "single point of coordination" looks like in a fabrication program — what role it plays and what it prevents.',
    'Add the specification error discovery timeline — when errors are found and how much cheaper they are to fix at drawing review versus after delivery.',
    'Include the coordination checklist that should exist between fabrication, finishing, and delivery handoffs.',
  ],
  'missed-deadlines': [
    'Add the pre-production questions that separate vendors who will hit their timeline from those who won\'t.',
    'Include what transparent production tracking looks like — what data customers should expect from a reliable fabrication partner.',
    'Reference the contract clause language that converts fabrication delays into penalty exposure — most project managers underread it.',
  ],
  'cost-overruns': [
    'Define what a front-end engineering review in fabrication actually includes — most project managers don\'t know what to request.',
    'Add the change order pattern — the conditions most likely to trigger scope gaps and how to identify them pre-production.',
    'Include a cost comparison between the review cost and the average overrun it prevents to close the ROI argument.',
  ],
  'quality-inconsistency': [
    'Define what a unified QC standard across a fabrication program looks like — what documents, what checkpoints, what authority.',
    'Add the discovery timeline for quality failures — at receiving, at inspection, at installation — and the cost differential by stage.',
    'Include the single-source versus multi-source quality data comparison as a shareable visual to make the 3x failure rate concrete.',
  ],
  'equipment-downtime': [
    'Add the specific preventive maintenance schedule for CNC plasma and laser equipment that produces the 40–60% downtime reduction.',
    'Include the calculation: monthly throughput loss versus annual preventive maintenance program cost for a mid-size shop.',
    'Reference the utilization rate threshold (80%) where unplanned failure risk accelerates — most shop managers know they\'re above it.',
  ],
  'material-waste': [
    'Add the nesting efficiency comparison using a specific job size — same drawing, manual layout versus programmed nesting — to make the percentage tangible.',
    'Include the material waste audit process so readers know what to request when evaluating a fabrication vendor\'s process quality.',
    'Reference the plate steel cost per square foot at current market rates to anchor the $8–$30 waste cost figure to real numbers.',
  ],
}

const POST_IDEAS: Record<string, PostIdea[]> = {
  'fabrication-bottlenecks': [
    { title: 'The Fabrication Bottleneck That Was Decided Before Production Started', angle: 'Insider Knowledge', rank: 1, painClarity: 10, financialImpact: 9, tension: 10 },
    { title: 'Why Multi-Vendor Fabrication Programs Create 30–50% More Stoppages', angle: 'Industry Benchmark', rank: 2, painClarity: 9, financialImpact: 9, tension: 9 },
    { title: 'The 4-Week Delay That Started at the Vendor Selection Meeting', angle: 'Case Study Style', rank: 3, painClarity: 9, financialImpact: 9, tension: 10 },
    { title: 'Consolidating Fabrication: What You Stop Paying For', angle: 'Financial Impact', rank: 4, painClarity: 8, financialImpact: 10, tension: 8 },
    { title: 'The Cascade Effect of a Single Fabrication Bottleneck', angle: 'Process Breakdown', rank: 5, painClarity: 9, financialImpact: 8, tension: 9 },
    { title: 'What 60–70% of Dependent Project Phases Have in Common', angle: 'Operational Risk', rank: 6, painClarity: 8, financialImpact: 8, tension: 8 },
    { title: 'Why the Bottleneck Is Always Upstream of Where You\'re Looking', angle: 'Contrarian Take', rank: 7, painClarity: 9, financialImpact: 7, tension: 9 },
    { title: 'Single-Source vs. Multi-Vendor Fabrication: The Coordination Math', angle: 'Decision Framework', rank: 8, painClarity: 8, financialImpact: 8, tension: 8 },
    { title: 'How Fabrication Handoffs Become Project Liabilities', angle: 'Hidden Cost Exposure', rank: 9, painClarity: 8, financialImpact: 9, tension: 8 },
    { title: 'The Bottleneck Your PM Won\'t Catch Until Week Three', angle: 'Assumption Challenge', rank: 10, painClarity: 9, financialImpact: 8, tension: 9 },
  ],
  'production-delays': [
    { title: 'Why 68% of Construction Overruns Start in the Fabrication Shop', angle: 'Industry Benchmark', rank: 1, painClarity: 10, financialImpact: 10, tension: 9 },
    { title: '$2,500/Day in Idle Labor: The Real Cost of Fabrication Delay', angle: 'Financial Impact', rank: 2, painClarity: 10, financialImpact: 10, tension: 9 },
    { title: 'The 15–25% Timeline Extension Nobody Budgets For', angle: 'Hidden Cost Exposure', rank: 3, painClarity: 9, financialImpact: 9, tension: 9 },
    { title: 'Why Fabrication Timing Is the Hardest Variable in Project Planning', angle: 'Operational Risk', rank: 4, painClarity: 9, financialImpact: 8, tension: 9 },
    { title: 'How a Three-Week Fab Delay Becomes a Six-Figure Problem', angle: 'Case Study Style', rank: 5, painClarity: 9, financialImpact: 10, tension: 9 },
    { title: 'The Planning Failure That Causes Most Production Delays', angle: 'Assumption Challenge', rank: 6, painClarity: 9, financialImpact: 8, tension: 9 },
    { title: 'Out-of-Sequence Work: The Hidden Cost When Fab Runs Late', angle: 'Process Breakdown', rank: 7, painClarity: 8, financialImpact: 9, tension: 8 },
    { title: 'Fabrication Lead Time: What the Quote Says vs. What Happens', angle: 'Contrarian Take', rank: 8, painClarity: 9, financialImpact: 8, tension: 9 },
    { title: 'How to Price Fabrication Delay Risk Into a Project Budget', angle: 'Decision Framework', rank: 9, painClarity: 7, financialImpact: 9, tension: 7 },
    { title: 'The Idle Crew Problem Nobody Tracks Back to Fabrication', angle: 'Insider Knowledge', rank: 10, painClarity: 9, financialImpact: 10, tension: 9 },
  ],
  'rework-scrap-cost': [
    { title: 'Rework at 12% of Project Cost: The QC Failure That\'s Priced In', angle: 'Financial Impact', rank: 1, painClarity: 10, financialImpact: 10, tension: 9 },
    { title: 'The 8-Hour Weld Correction That Pushed a Delivery Two Weeks', angle: 'Case Study Style', rank: 2, painClarity: 9, financialImpact: 9, tension: 10 },
    { title: 'Scrap Rates of 15% vs. 3%: What Separates the Two Shops', angle: 'Industry Benchmark', rank: 3, painClarity: 9, financialImpact: 9, tension: 8 },
    { title: 'Why the Cheapest Fabrication Quote Has the Highest Rework Rate', angle: 'Contrarian Take', rank: 4, painClarity: 9, financialImpact: 10, tension: 9 },
    { title: 'The Three Costs of Rework (Most Teams Only Track One)', angle: 'Hidden Cost Exposure', rank: 5, painClarity: 10, financialImpact: 9, tension: 9 },
    { title: 'How a Missing QC Checkpoint Creates $60,000 in Rework', angle: 'Process Breakdown', rank: 6, painClarity: 9, financialImpact: 10, tension: 8 },
    { title: 'What First-Article Inspection Prevents vs. What It Costs', angle: 'Decision Framework', rank: 7, painClarity: 8, financialImpact: 9, tension: 8 },
    { title: 'Rework Discovered Post-Delivery vs. During Production', angle: 'Operational Risk', rank: 8, painClarity: 9, financialImpact: 8, tension: 9 },
    { title: 'The Incomplete Drawing That Cost $40,000 in Structural Rework', angle: 'Insider Knowledge', rank: 9, painClarity: 10, financialImpact: 10, tension: 9 },
    { title: 'Measuring Rework as a Financial Metric, Not a Quality Metric', angle: 'Assumption Challenge', rank: 10, painClarity: 8, financialImpact: 9, tension: 8 },
  ],
  'labor-inefficiency': [
    { title: 'The 25% Labor Cost Overrun That Wasn\'t in the Estimate', angle: 'Hidden Cost Exposure', rank: 1, painClarity: 9, financialImpact: 10, tension: 9 },
    { title: 'Shop Floor Sequencing: The Variable Most Shops Don\'t Measure', angle: 'Insider Knowledge', rank: 2, painClarity: 9, financialImpact: 9, tension: 9 },
    { title: 'Why Fabrication Labor Is Both the Biggest Cost and Least Tracked', angle: 'Assumption Challenge', rank: 3, painClarity: 9, financialImpact: 9, tension: 9 },
    { title: 'Six Hours Per Week in Status Chasing: The Supervisor Efficiency Tax', angle: 'Financial Impact', rank: 4, painClarity: 8, financialImpact: 9, tension: 8 },
    { title: 'What a 35% Productivity Loss Looks Like on a Shop Floor', angle: 'Process Breakdown', rank: 5, painClarity: 9, financialImpact: 9, tension: 9 },
    { title: 'Labor Efficiency vs. Equipment Utilization: What Most Shops Track', angle: 'Contrarian Take', rank: 6, painClarity: 8, financialImpact: 8, tension: 9 },
    { title: 'How to Audit Labor Efficiency in a Fabrication Shop', angle: 'Decision Framework', rank: 7, painClarity: 7, financialImpact: 8, tension: 7 },
    { title: 'The Variance Report That Reveals Labor Inefficiency After the Job Closes', angle: 'Case Study Style', rank: 8, painClarity: 9, financialImpact: 9, tension: 9 },
    { title: 'Why Busy Shops Still Miss Deadlines', angle: 'Operational Risk', rank: 9, painClarity: 9, financialImpact: 8, tension: 9 },
    { title: 'Optimized Layout vs. Default Layout: The Production Rate Difference', angle: 'Industry Benchmark', rank: 10, painClarity: 8, financialImpact: 8, tension: 8 },
  ],
  'poor-project-coordination': [
    { title: '1 in 4 Complex Fab Projects Has a Specification Error. Coordination Is Why.', angle: 'Industry Benchmark', rank: 1, painClarity: 10, financialImpact: 9, tension: 10 },
    { title: '2.3x More Coordination Failures at Three or More Vendors', angle: 'Financial Impact', rank: 2, painClarity: 9, financialImpact: 9, tension: 9 },
    { title: 'The Coordination Gap Between Fabrication, Finishing and Delivery', angle: 'Process Breakdown', rank: 3, painClarity: 9, financialImpact: 9, tension: 9 },
    { title: 'Who Is Responsible When Three Vendors Miss the Same Handoff?', angle: 'Contrarian Take', rank: 4, painClarity: 10, financialImpact: 8, tension: 10 },
    { title: 'Why Specification Errors Are Always Discovered After Delivery', angle: 'Operational Risk', rank: 5, painClarity: 9, financialImpact: 9, tension: 9 },
    { title: 'Single-Source Fabrication as a Coordination Risk Reduction Strategy', angle: 'Decision Framework', rank: 6, painClarity: 8, financialImpact: 9, tension: 8 },
    { title: 'The Communication Surface Area Problem in Multi-Vendor Programs', angle: 'Insider Knowledge', rank: 7, painClarity: 9, financialImpact: 7, tension: 9 },
    { title: '40% of Late Completions Trace to Coordination, Not Fabrication Quality', angle: 'Assumption Challenge', rank: 8, painClarity: 9, financialImpact: 9, tension: 9 },
    { title: 'How a Pre-Production Coordination Review Prevents $85,000 in Changes', angle: 'Hidden Cost Exposure', rank: 9, painClarity: 8, financialImpact: 10, tension: 8 },
    { title: 'The Missing Role in Most Fabrication Programs', angle: 'Case Study Style', rank: 10, painClarity: 8, financialImpact: 8, tension: 9 },
  ],
  'missed-deadlines': [
    { title: '$25,000/Week: The Penalty Clause Most Project Managers Underestimate', angle: 'Financial Impact', rank: 1, painClarity: 10, financialImpact: 10, tension: 10 },
    { title: 'Why 72% of Project Managers Can\'t Forecast Fabrication Timing', angle: 'Industry Benchmark', rank: 2, painClarity: 9, financialImpact: 8, tension: 9 },
    { title: 'The 6-Week Installation Push That Started with a Missed Fab Date', angle: 'Case Study Style', rank: 3, painClarity: 9, financialImpact: 10, tension: 10 },
    { title: 'Questions That Separate Vendors Who Hit Dates from Those Who Don\'t', angle: 'Decision Framework', rank: 4, painClarity: 8, financialImpact: 9, tension: 8 },
    { title: 'What "Four Weeks" Means When Your Fabricator Is Overcommitted', angle: 'Contrarian Take', rank: 5, painClarity: 9, financialImpact: 9, tension: 10 },
    { title: 'The Downstream Cascade of a Single Missed Fabrication Deadline', angle: 'Process Breakdown', rank: 6, painClarity: 9, financialImpact: 9, tension: 9 },
    { title: 'Fabrication Scheduling Transparency: What Reliable Shops Provide', angle: 'Insider Knowledge', rank: 7, painClarity: 8, financialImpact: 8, tension: 8 },
    { title: 'Why Fabrication Deadline Risk Is Almost Never in Project Contingency', angle: 'Hidden Cost Exposure', rank: 8, painClarity: 9, financialImpact: 9, tension: 9 },
    { title: 'The Scope Definition Gap That Causes Most Fabrication Delays', angle: 'Assumption Challenge', rank: 9, painClarity: 9, financialImpact: 8, tension: 9 },
    { title: 'From Missed Date to Penalty Clause: The Timeline Reconstruction', angle: 'Operational Risk', rank: 10, painClarity: 9, financialImpact: 10, tension: 9 },
  ],
  'cost-overruns': [
    { title: '18–28% Overrun on Structural Fabrication: The Predictable Pattern', angle: 'Industry Benchmark', rank: 1, painClarity: 10, financialImpact: 10, tension: 9 },
    { title: 'The Change Order That Skipped Front-End Review Could Have Prevented', angle: 'Case Study Style', rank: 2, painClarity: 9, financialImpact: 10, tension: 9 },
    { title: 'Why the Lowest Fabrication Bid Has the Highest Total Cost', angle: 'Contrarian Take', rank: 3, painClarity: 9, financialImpact: 10, tension: 10 },
    { title: '$85,000 in Change Orders from One Scope Gap in the Drawing Package', angle: 'Financial Impact', rank: 4, painClarity: 9, financialImpact: 10, tension: 9 },
    { title: '3x More Overruns Without Front-End Engineering Review', angle: 'Operational Risk', rank: 5, painClarity: 9, financialImpact: 9, tension: 9 },
    { title: 'What the Original Budget Said vs. What the Final Invoice Said', angle: 'Hidden Cost Exposure', rank: 6, painClarity: 9, financialImpact: 10, tension: 9 },
    { title: 'How to Structure a Fabrication Contract That Limits Overrun Exposure', angle: 'Decision Framework', rank: 7, painClarity: 7, financialImpact: 9, tension: 7 },
    { title: 'The Scope Definition Conversation That Happens Before vs. After Production', angle: 'Process Breakdown', rank: 8, painClarity: 8, financialImpact: 9, tension: 8 },
    { title: 'Why "We Found Something" Always Costs More Than the Original Estimate', angle: 'Insider Knowledge', rank: 9, painClarity: 10, financialImpact: 9, tension: 10 },
    { title: 'Procurement That Optimizes for Price vs. Procurement That Controls Cost', angle: 'Assumption Challenge', rank: 10, painClarity: 9, financialImpact: 9, tension: 9 },
  ],
  'quality-inconsistency': [
    { title: '20% Rejection Rate at First Inspection: The Multi-Vendor Problem', angle: 'Industry Benchmark', rank: 1, painClarity: 10, financialImpact: 9, tension: 9 },
    { title: '3x Dimensional Failures Across Four Fabrication Sources', angle: 'Financial Impact', rank: 2, painClarity: 9, financialImpact: 9, tension: 9 },
    { title: 'Why Quality Inconsistency Is Always Discovered After Delivery', angle: 'Operational Risk', rank: 3, painClarity: 9, financialImpact: 9, tension: 10 },
    { title: 'Single-Source Fabrication and the Quality Consistency it Produces', angle: 'Contrarian Take', rank: 4, painClarity: 8, financialImpact: 9, tension: 9 },
    { title: 'What "Acceptable Tolerance" Means at Four Different Shops', angle: 'Insider Knowledge', rank: 5, painClarity: 9, financialImpact: 8, tension: 9 },
    { title: '$400 Per Weld Remediation: The Math on Multi-Vendor Quality', angle: 'Hidden Cost Exposure', rank: 6, painClarity: 8, financialImpact: 10, tension: 8 },
    { title: 'How to Build a QC Standard Across a Multi-Vendor Fab Program', angle: 'Decision Framework', rank: 7, painClarity: 7, financialImpact: 8, tension: 7 },
    { title: 'Field Correction vs. Shop Correction: The Cost Differential', angle: 'Process Breakdown', rank: 8, painClarity: 8, financialImpact: 9, tension: 8 },
    { title: 'The Inspection Failure That Was a Specification Communication Failure', angle: 'Case Study Style', rank: 9, painClarity: 9, financialImpact: 9, tension: 9 },
    { title: 'What a First-Article Inspection Actually Catches', angle: 'Educational', rank: 10, painClarity: 7, financialImpact: 7, tension: 7 },
  ],
  'equipment-downtime': [
    { title: '$4,500/Hour: The Cost of Unplanned Equipment Downtime in Fabrication', angle: 'Financial Impact', rank: 1, painClarity: 10, financialImpact: 10, tension: 10 },
    { title: '40–60% More Downtime in Shops Without Preventive Maintenance', angle: 'Industry Benchmark', rank: 2, painClarity: 9, financialImpact: 9, tension: 9 },
    { title: 'The Cascade: How One Machine Failure Stops the Entire Sequence', angle: 'Process Breakdown', rank: 3, painClarity: 9, financialImpact: 9, tension: 10 },
    { title: 'CNC Downtime at 80%+ Utilization: The Predictable Failure', angle: 'Operational Risk', rank: 4, painClarity: 9, financialImpact: 9, tension: 9 },
    { title: 'Why High Utilization Without Maintenance Creates the Worst Failures', angle: 'Contrarian Take', rank: 5, painClarity: 9, financialImpact: 9, tension: 9 },
    { title: 'Preventive Maintenance Cost vs. Unplanned Downtime Cost: The Math', angle: 'Decision Framework', rank: 6, painClarity: 8, financialImpact: 10, tension: 8 },
    { title: '$270,000 in Annual Throughput Loss From 9 Hours/Month of Downtime', angle: 'Hidden Cost Exposure', rank: 7, painClarity: 9, financialImpact: 10, tension: 9 },
    { title: 'How to Read Your Maintenance Work Orders as a Production Risk Signal', angle: 'Insider Knowledge', rank: 8, painClarity: 8, financialImpact: 8, tension: 8 },
    { title: 'Equipment Downtime That Was in the Calendar and Nobody Scheduled Around It', angle: 'Assumption Challenge', rank: 9, painClarity: 8, financialImpact: 9, tension: 9 },
    { title: 'The Throughput Loss That Shows Up in Delivery Dates, Not Maintenance Reports', angle: 'Case Study Style', rank: 10, painClarity: 9, financialImpact: 9, tension: 9 },
  ],
  'material-waste': [
    { title: '22% Plate Steel Waste: The Cost Built Into Every Quote You Receive', angle: 'Hidden Cost Exposure', rank: 1, painClarity: 10, financialImpact: 10, tension: 9 },
    { title: 'Manual Nesting vs. Programmed Nesting: 2–3x the Waste Difference', angle: 'Industry Benchmark', rank: 2, painClarity: 9, financialImpact: 9, tension: 8 },
    { title: 'Why Two Identical Quotes Can Have Very Different Real Costs', angle: 'Contrarian Take', rank: 3, painClarity: 9, financialImpact: 9, tension: 9 },
    { title: '$112,500 in Preventable Material Waste on One Structural Program', angle: 'Financial Impact', rank: 4, painClarity: 9, financialImpact: 10, tension: 8 },
    { title: 'How to Ask About Nesting Efficiency When Evaluating a Fab Vendor', angle: 'Decision Framework', rank: 5, painClarity: 8, financialImpact: 9, tension: 7 },
    { title: 'The Material Cost That Was Always a Planning Cost', angle: 'Assumption Challenge', rank: 6, painClarity: 9, financialImpact: 9, tension: 9 },
    { title: 'What Waste Rate Percentage Actually Means in Dollars on Your Project', angle: 'Process Breakdown', rank: 7, painClarity: 8, financialImpact: 9, tension: 8 },
    { title: 'Programming Discipline in Fabrication: The Difference in Plate Yield', angle: 'Insider Knowledge', rank: 8, painClarity: 8, financialImpact: 8, tension: 8 },
    { title: 'The Vendor Who Wastes 20% of Steel Is Quoting from a Different Cost Base', angle: 'Insider Knowledge', rank: 9, painClarity: 9, financialImpact: 9, tension: 9 },
    { title: 'Plate Yield vs. Quote Price: What Actually Determines Your Material Cost', angle: 'Financial Impact', rank: 10, painClarity: 8, financialImpact: 9, tension: 8 },
  ],
}

const CALENDAR_ENTRIES: CalendarEntry[] = [
  { day: 1, topic: 'Fabrication Bottlenecks', hook: 'The bottleneck in your fabrication program is almost never where the team is looking. It\'s upstream.', angle: 'Insider Knowledge', cta: 'Where did your last fabrication bottleneck actually originate?' },
  { day: 2, topic: 'Production Delays', hook: '68% of construction project overruns trace to fabrication delays — not on-site execution. The timeline was lost before site work began.', angle: 'Industry Benchmark', cta: 'What\'s the actual fabrication timeline variance on your last three projects?' },
  { day: 3, topic: 'Rework and Scrap Cost', hook: 'Rework at 12% of project cost is not a quality problem. It\'s a planning problem that shows up as a quality number.', angle: 'Financial Impact', cta: 'How are you tracking rework cost versus total project budget — or are you?' },
  { day: 4, topic: 'Labor Inefficiency', hook: 'Labor is 40% of fabrication cost and the least measured variable in most shops. The variance shows up after the job closes.', angle: 'Hidden Cost Exposure', cta: 'When did you last audit actual versus estimated labor hours on a closed fabrication job?' },
  { day: 5, topic: 'Poor Project Coordination', hook: '1 in 4 complex fabrication projects has a specification error caused by coordination failure. It\'s discovered at delivery — not at drawing review.', angle: 'Operational Risk', cta: 'How many vendors are in your current fabrication program? What\'s your coordination structure?' },
  { day: 6, topic: 'Missed Deadlines', hook: '$25,000/week in penalty exposure from a missed fabrication deadline. Most project managers signed the clause and didn\'t price the risk.', angle: 'Financial Impact', cta: 'Is fabrication timeline risk in your project contingency budget? Most teams\' isn\'t.' },
  { day: 7, topic: 'Cost Overruns', hook: 'Projects that skip front-end engineering review in fabrication experience 3x more cost overruns. The review is not overhead — it\'s insurance.', angle: 'Decision Framework', cta: 'What does your pre-production fabrication review process look like?' },
  { day: 8, topic: 'Quality Inconsistency', hook: '20% rejection at first inspection is not bad luck. It\'s the output of multi-vendor programs without a unified QC standard.', angle: 'Industry Benchmark', cta: 'What inspection process do your fabrication vendors run before shipping to you?' },
  { day: 9, topic: 'Equipment Downtime', hook: '$4,500/hour in throughput loss when a CNC table goes down. At 80%+ utilization, the failure is not random — it\'s scheduled by neglect.', angle: 'Operational Risk', cta: 'Does your fab vendor publish maintenance schedules? Most don\'t.' },
  { day: 10, topic: 'Material Waste', hook: '22% plate steel waste in a shop without nesting discipline. It\'s in the quote. You just can\'t see it as a line item.', angle: 'Hidden Cost Exposure', cta: 'Have you asked your fabrication vendor about their plate yield rate? Most customers haven\'t.' },
  { day: 11, topic: 'Fabrication Bottlenecks', hook: 'A four-week fabrication delay with three active downstream trades running at $1,500/day each is a $126,000 problem. That\'s the bottleneck cost.', angle: 'Financial Impact', cta: 'How are you tracking downstream idle labor cost when fabrication slips?' },
  { day: 12, topic: 'Production Delays', hook: 'The fabrication vendor said four weeks. At week three, they said six. $2,500/day per trade was already running.', angle: 'Contrarian Take', cta: 'What\'s your process for getting real production status from a fabrication vendor mid-program?' },
  { day: 13, topic: 'Rework and Scrap Cost', hook: 'The three costs of rework: the material, the labor, and the schedule. Most project budgets track one. The schedule is the expensive one.', angle: 'Process Breakdown', cta: 'Tag a project manager who has absorbed schedule cost from a fabrication rework event that wasn\'t tracked to the source.' },
  { day: 14, topic: 'Labor Inefficiency', hook: 'A shop floor supervisor spending eight hours per week on status chasing is not managing quality, sequencing, or throughput. That\'s what the job calls for.', angle: 'Assumption Challenge', cta: 'What percentage of your supervisory time in fabrication is spent on coordination versus production management?' },
  { day: 15, topic: 'Poor Project Coordination', hook: '2.3x more coordination failures at three or more vendors. Every additional vendor adds communication surface — and every surface is a potential failure point.', angle: 'Operational Risk', cta: 'What\'s your vendor count on your current largest fabrication program? Have you mapped the coordination points?' },
  { day: 16, topic: 'Missed Deadlines', hook: '72% of project managers can\'t reliably forecast fabrication timing. The solution isn\'t better guessing. It\'s a partner with transparent production tracking.', angle: 'Decision Framework', cta: 'What visibility do you have into production status between fab order and delivery?' },
  { day: 17, topic: 'Cost Overruns', hook: '$85,000 in change orders from one scope gap in the drawing package. A pre-production engineering review would have cost less than 5% of that number.', angle: 'Financial Impact', cta: 'Have you had a change order conversation that started with "we found something during production"? That\'s a planning failure.' },
  { day: 18, topic: 'Quality Inconsistency', hook: 'At four fabrication sources, dimensional tolerance failures run at 3x the rate of a single-source program. Consistency is a function of process standardization — not intent.', angle: 'Insider Knowledge', cta: 'How consistent is dimensional quality across the vendors in your fabrication program? Have you measured it?' },
  { day: 19, topic: 'Equipment Downtime', hook: 'Shops without preventive maintenance programs experience 40–60% more unplanned downtime. That extra downtime is in your delivery date — whether the vendor tells you or not.', angle: 'Process Breakdown', cta: 'Is your fab vendor running a maintenance program, or reacting to failures? Most customers don\'t ask.' },
  { day: 20, topic: 'Material Waste', hook: 'Manual nesting generates 2–3x the plate waste of programmed nesting. That waste is in the quote as material cost. The customer absorbs it without a line item.', angle: 'Industry Benchmark', cta: 'Ask your fabrication vendors for their plate yield rate on comparable projects. The number tells you a lot.' },
  { day: 21, topic: 'Fabrication Bottlenecks', hook: '60–70% of downstream project phases are affected when a single fabrication sequence hits a bottleneck. The waterfall effect is predictable. The planning rarely accounts for it.', angle: 'Operational Risk', cta: 'How is fabrication sequencing built into your project schedule at the phase level?' },
  { day: 22, topic: 'Production Delays', hook: 'Out-of-sequence work happens when fabrication runs late and on-site crews can\'t wait. It creates rework, safety risk, and cost. The fabrication delay caused all of it.', angle: 'Hidden Cost Exposure', cta: 'Have you tracked the cost of out-of-sequence field work back to the fabrication delay that caused it?' },
  { day: 23, topic: 'Rework and Scrap Cost', hook: 'Shops running 8–15% scrap rates are not using bad steel. They\'re using poor nesting and programming practices. The material is fine. The planning isn\'t.', angle: 'Contrarian Take', cta: 'What scrap rate does your primary fab vendor run? It\'s a direct indicator of shop discipline.' },
  { day: 24, topic: 'Labor Inefficiency', hook: 'The estimate was built on planned hours. The actual was 25% higher. The efficiency gap was invisible until the job closed.', angle: 'Case Study Style', cta: 'Comment with your industry. I\'ll outline where fabrication labor variance typically concentrates in your project type.' },
  { day: 25, topic: 'Poor Project Coordination', hook: '40% of late project completions trace to gaps between fabrication, finishing, and delivery. Not to vendor quality — to the spaces between vendors where no one was accountable.', angle: 'Assumption Challenge', cta: 'Who owns the coordination between your fabrication and finishing vendors on a current project?' },
  { day: 26, topic: 'Missed Deadlines', hook: 'The penalty clause in a construction contract doesn\'t care who caused the fabrication delay. It charges the owner. The fabrication vendor is on to the next project.', angle: 'Contrarian Take', cta: 'Have you reviewed the penalty exposure in your last contract versus the contingency budget allocated for fabrication delay risk?' },
  { day: 27, topic: 'Cost Overruns', hook: 'The lowest bid in fabrication is an estimate of what the vendor thinks they can do. The final invoice is what the project actually costs. The gap is where the overrun lives.', angle: 'Insider Knowledge', cta: 'What\'s the average variance between your fabrication bids and final invoices over the last four projects?' },
  { day: 28, topic: 'Quality Inconsistency', hook: 'Quality inconsistency is discovered at receiving, at inspection, or after installation. Never earlier. The later the discovery, the more expensive the fix.', angle: 'Financial Impact', cta: 'At what stage are quality failures in your fabrication programs typically discovered? The stage determines the cost.' },
  { day: 29, topic: 'Equipment Downtime', hook: 'A CNC plasma table averaging 9 unplanned hours of downtime per month at $2,500/hour is absorbing $270,000 in annual throughput loss. That loss is in your lead times.', angle: 'Financial Impact', cta: 'What\'s your fab vendor\'s average lead time variance over the last year? Equipment performance is usually part of the answer.' },
  { day: 30, topic: 'Material Waste', hook: 'The difference between a 4% and a 20% plate waste rate on a $200,000 material program is $32,000. One is good programming. One is what manual layout costs.', angle: 'Decision Framework', cta: 'I can show you how to evaluate fabrication vendor material efficiency before you commit to a program. Link in comments.' },
]

const REPURPOSING: string[] = [
  'Break the Business Impact section into a Twitter/X thread with each cost stat as a standalone post — fabrication operators engage heavily with specific numbers.',
  'Turn the 30-day calendar into a downloadable PDF lead magnet titled "30 Days of Fabrication Cost Content for OEMs and Project Managers."',
  'Pull the hook and opening into a YouTube Shorts script — add B-roll of a CNC cutting or welding sequence and post natively.',
  'Convert the Post Ideas table into an Instagram carousel ranking the top content angles for operations directors.',
  'Use the hook as a cold outreach subject line for project managers and procurement officers at commercial construction firms.',
]

export function generateLinkedIn(inputs: LinkedInInputs, seed: number = 0): LinkedInOutput {
  const v = seed % 3
  const p = inputs.problem

  const hookOptions = HOOKS[p] ?? HOOKS['fabrication-bottlenecks']
  const bodyOptions = BODIES[p] ?? BODIES['fabrication-bottlenecks']
  const postIdeas = POST_IDEAS[p] ?? POST_IDEAS['fabrication-bottlenecks']

  const hook = hookOptions[v] ?? hookOptions[0]
  const body = bodyOptions[v] ?? bodyOptions[0]
  const businessImpact = BUSINESS_IMPACTS[p] ?? BUSINESS_IMPACTS['fabrication-bottlenecks']
  const cta = CTAS[v % CTAS.length]
  const improvements = IMPROVEMENT_SUGGESTIONS[p] ?? IMPROVEMENT_SUGGESTIONS['fabrication-bottlenecks']

  const problemLabel = PROBLEM_LABELS[p] ?? p

  const fullPostText = `${hook}\n\n${body}\n\n${businessImpact}\n\n${cta}`

  const qualityScore = scoreContent(inputs, true, true, true, fullPostText.split(' ').length)

  const calendar: CalendarEntry[] = CALENDAR_ENTRIES.map(entry => ({
    ...entry,
    topic: entry.topic === problemLabel ? `${entry.topic} (Primary)` : entry.topic,
  }))

  return {
    platform: 'linkedin',
    postIdeas,
    fullPost: { hook, body, businessImpact, cta },
    calendar,
    repurposingSuggestions: REPURPOSING.slice(0, 3),
    qualityScore,
    improvementSuggestions: improvements.slice(0, 3),
  }
}
