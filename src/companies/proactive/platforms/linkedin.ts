import type { LinkedInInputs, LinkedInOutput, PostIdea, CalendarEntry } from '../types'
import { PROBLEM_DATA, PROBLEM_LABELS } from '../lib/companyProfile'
import { scoreContent } from '../lib/scoring'

const HOOKS: Record<string, string[]> = {
  'manufacturing-bottlenecks': [
    "Most electronics programs don't fail at the assembly line. They fail at the design-to-production handoff — weeks before a board is built.",
    "The bottleneck in your PCB program is not where your team is looking. It's upstream, in component staging or design file readiness.",
    "One SMT stoppage can delay a program by five days. The real cost isn't the delay — it's every downstream team waiting on boards that haven't shipped.",
  ],
  'supplier-inconsistency': [
    "The component arrived. It just wasn't the component you approved. That substitution decision will cost you three weeks.",
    "Supplier inconsistency doesn't show up at order placement. It shows up at kitting — when production is already scheduled.",
    "Programs using four or more distributors for the same component family don't have a sourcing strategy. They have a risk surface.",
  ],
  'qa-failures': [
    "A QA failure caught during in-process inspection costs a rework cycle. The same failure caught in the field costs a recall.",
    "Most electronics programs don't have a QA problem. They have a QA timing problem — the inspection happens after the damage is done.",
    "15–25% higher field return rates without formal AOI and X-ray is not a quality metric. It's a cost structure.",
  ],
  'production-delays': [
    "The PCB delivery is late. Every firmware team waiting downstream just became your schedule problem.",
    "71% of hardware launch overruns trace to PCB manufacturing delays — not software, not mechanical. The board is the critical path.",
    "A two-week PCB delay at $2,500/day per dependent team is a $35,000 problem before a single change order is written.",
  ],
  'component-shortages': [
    "The component went end-of-life six months before your production run. The respin will take fourteen weeks.",
    "Sourcing on the spot market during an allocation event doesn't solve a supply problem. It converts it into a 300% cost premium.",
    "38% of electronics programs require a design respin because of component shortages. Most of those respins were preventable.",
  ],
  'rework-scrap-cost': [
    "BGA rework on a complex PCB doesn't just cost the technician time. It risks the via structure, the pad, and the board.",
    "4–11% of production cost lost to rework is not a quality number. It's a process discipline number.",
    "The scrap rate difference between a disciplined EMS operation and an undisciplined one: 1–3% versus 6–14%. That gap is margin.",
  ],
  'compliance-risk': [
    "An ITAR violation in your EMS program doesn't produce a warning. It produces a penalty starting at $250,000 per incident.",
    "Compliance in electronics manufacturing is not a documentation task. It is the gate between production and shipment.",
    "A 4–8 week program hold from a compliance gap costs more than the audit that would have prevented it.",
  ],
  'scaling-complexity': [
    "The prototype worked. The first production run won't match it — unless your design was validated for manufacturing, not just function.",
    "45–65% more defect events per board in the first three volume production runs is not a defect problem. It's a DFM problem.",
    "Scaling from 50 units to 5,000 without a formal NPI process doesn't scale production. It scales problems.",
  ],
  'cost-leakage': [
    "8–18% above budgeted production cost is not cost overrun. It's cost leakage — invisible, accumulating, and preventable.",
    "The BOM substitution that saved $0.40 per unit added $22,000 in untracked qualification and test cost to the program.",
    "Hidden cost leakage in electronics manufacturing doesn't appear on a PO. It appears in the final program cost report — after it's too late.",
  ],
  'poor-manufacturing-decisions': [
    "The cheapest EMS quote has a 2.5x higher probability of a mid-program quality event. The savings rarely survive first production.",
    "A PCB design that bypasses DFM review doesn't cost less. It costs 22–40% more to produce.",
    "The manufacturing decision made at the design stage determines the production outcome. Most teams treat it as a procurement decision.",
  ],
}

const BODIES: Record<string, string[]> = {
  'manufacturing-bottlenecks': [
    `Electronics manufacturing has multiple critical handoffs — from design to fabrication, fabrication to assembly, assembly to test, test to delivery.\n\nEvery handoff is a potential stoppage.\n\n${PROBLEM_DATA['manufacturing-bottlenecks'].stat1}.\n\nThe delay is not just in the stoppage. It is in every downstream phase — firmware integration, system test, regulatory validation — that cannot begin until boards arrive.\n\n${PROBLEM_DATA['manufacturing-bottlenecks'].stat2}.\n\nThe more assembly partners in a program, the more handoffs — and the more surfaces where timing failures occur.\n\n${PROBLEM_DATA['manufacturing-bottlenecks'].stat3}.\n\nThe engineering team tracking board status is often the last to know. The bottleneck started two weeks ago in the design files.`,
    `Manufacturing bottlenecks in electronics programs are predictable when you map the process. Most program teams don't map the process.\n\n${PROBLEM_DATA['manufacturing-bottlenecks'].stat3}.\n\nWhen component kitting is incomplete but assembly is scheduled, the SMT line stops. Every stage that depends on those boards waits.\n\n${PROBLEM_DATA['manufacturing-bottlenecks'].stat2}.\n\nDisconnected assembly partners don't see each other's constraints. They each report progress against their own scope — while the upstream bottleneck compounds.\n\n${PROBLEM_DATA['manufacturing-bottlenecks'].stat1}.\n\nThe 3–5 day delay was decided before the boards were ordered. It was decided when the program structure was set.`,
    `A program using three assembly vendors simultaneously looks like parallel execution.\n\nUntil one of them hits a component hold.\n\n${PROBLEM_DATA['manufacturing-bottlenecks'].stat2}.\n\nThe cascade is immediate. Boards that depend on the delayed vendor can't proceed. Test can't begin. Delivery moves.\n\n${PROBLEM_DATA['manufacturing-bottlenecks'].stat1}.\n\nThree to five days is not the cost of the component hold. It's the cost of the program structure that created the dependency without a contingency.\n\n${PROBLEM_DATA['manufacturing-bottlenecks'].stat3}.\n\nConsolidating assembly under a single EMS partner doesn't just reduce vendor count. It removes the handoff surfaces where bottlenecks form.`,
  ],
  'supplier-inconsistency': [
    `Component supplier inconsistency is the most common unplanned production event in electronics manufacturing — and the least planned for.\n\n${PROBLEM_DATA['supplier-inconsistency'].stat1}.\n\nA component on allocation from a primary supplier forces a substitution decision. The substitute may be functionally equivalent. It may not be electrically equivalent. Finding out takes time the schedule doesn't have.\n\n${PROBLEM_DATA['supplier-inconsistency'].stat2}.\n\nAt four or more distributors, the probability of receiving a non-approved part increases with every PO. Each one is a potential production hold.\n\n${PROBLEM_DATA['supplier-inconsistency'].stat3}.\n\nFirst-article failures trace to supplier inconsistency more than any other single cause. The design was right. The part wasn't the approved part.`,
    `Supplier inconsistency in electronics manufacturing is a structural problem — not a supplier quality problem.\n\n${PROBLEM_DATA['supplier-inconsistency'].stat3}.\n\n28–42% of first-article failures come from a substituted or non-approved component. The EMS partner received what was shipped. The problem started at the distributor level.\n\n${PROBLEM_DATA['supplier-inconsistency'].stat1}.\n\nA production hold caused by a supplier issue doesn't pause one operation. It pauses the entire program — while the sourcing team locates an approved replacement.\n\n${PROBLEM_DATA['supplier-inconsistency'].stat2}.\n\nWith four or more distributors, that hold event occurs 3x more often than in a consolidat ed supply chain. Every additional distributor adds a verification burden.`,
    `The component shortage didn't cause the production hold. The supplier strategy that left the program exposed to a shortage caused it.\n\n${PROBLEM_DATA['supplier-inconsistency'].stat2}.\n\nPrograms with a single-source distributor strategy and approved alternates pre-qualified before production don't experience the same exposure. When the primary goes on allocation, the alternate is ready.\n\n${PROBLEM_DATA['supplier-inconsistency'].stat1}.\n\n35–55% of unplanned production holds trace to supplier lead time inconsistency. Most of those holds were visible in the supplier's lead time trends before the program started.\n\n${PROBLEM_DATA['supplier-inconsistency'].stat3}.\n\nFirst-article failures from supplier inconsistency are the most frustrating — because the design was correct. The supply chain wasn't managed to the same standard.`,
  ],
  'qa-failures': [
    `QA failures in electronics manufacturing are expensive in two ways — and most programs only account for one.\n\nFirst: the rework or replacement cost when a failure is caught in production.\n\nSecond — and far more expensive: the cost when it reaches the field.\n\n${PROBLEM_DATA['qa-failures'].stat1}.\n\nA solder defect caught during AOI costs 20 minutes of rework. The same defect caught as a field return costs an RMA process, a root cause investigation, and a yield hold on everything shipped before the failure was found.\n\n${PROBLEM_DATA['qa-failures'].stat2}.\n\n15–25% higher field return rates without formal AOI and X-ray is not a quality gap — it's a business continuity exposure.\n\n${PROBLEM_DATA['qa-failures'].stat3}.\n\n1 in 3 first-article rejections traces to incomplete IPC acceptance criteria. The part was built to what was specified. The specification was incomplete.`,
    `The root cause of most QA failures in electronics programs is not the assembly process.\n\nIt's the inspection architecture.\n\n${PROBLEM_DATA['qa-failures'].stat1}.\n\nWhen inspection happens at end-of-line only, defects introduced at solder paste printing compound through reflow, component placement, and soldering before anyone sees them. By the time a failure is found, the correction is expensive.\n\n${PROBLEM_DATA['qa-failures'].stat2}.\n\nPrograms without formal X-ray inspection on BGA and QFN components are shipping at unknown risk. Those packages can't be visually inspected. The defect is invisible until the board fails in the field.\n\n${PROBLEM_DATA['qa-failures'].stat3}.\n\nIncomplete IPC criteria is the most preventable first-article failure cause. Before production starts, the acceptance standard should be documented, signed, and communicated to every inspection station on the line.`,
    `QA directors track defect rate as a quality metric.\n\nThey should track it as a financial metric.\n\n${PROBLEM_DATA['qa-failures'].stat1}.\n\nA 6–10x cost multiplier from post-assembly to field discovery is not a quality trend. It's the ROI calculation for your in-process inspection program.\n\n${PROBLEM_DATA['qa-failures'].stat2}.\n\nField return rates 15–25% above programs with formal AOI and X-ray represent warranty cost, field service cost, and customer relationship cost — none of which appear in the production budget.\n\n${PROBLEM_DATA['qa-failures'].stat3}.\n\nIPC acceptance criteria gaps are a documentation failure, not an engineering failure. The standard exists. The question is whether it was applied before the first board went down the line.`,
  ],
  'production-delays': [
    `When PCB delivery slips, firmware teams don't wait productively.\n\nThey context-switch to other work. When the boards finally arrive, reintegration takes time the schedule doesn't have.\n\n${PROBLEM_DATA['production-delays'].stat2}.\n\nA three-week PCB delay on a program with two dependent teams means $63,000–$168,000 in downstream idle and reintegration cost — before a single schedule revision is written.\n\n${PROBLEM_DATA['production-delays'].stat1}.\n\nThe 18–30% timeline extension is the visible number. The team productivity loss, missed regulatory windows, and repositioned launch dates are the costs that compound daily.\n\n${PROBLEM_DATA['production-delays'].stat3}.\n\n71% of hardware launch overruns trace to PCB delays. Not software. Not mechanical. The board is the critical path — and the manufacturing process that produces it determines the outcome.`,
    `Most hardware program timelines are built around optimistic PCB assumptions.\n\n${PROBLEM_DATA['production-delays'].stat3}.\n\nPCB manufacturing timing is the hardest variable to forecast — and the one that receives the least engineering scrutiny during schedule planning.\n\n${PROBLEM_DATA['production-delays'].stat1}.\n\nAn 18–30% timeline extension on a six-month hardware program is 5–9 weeks. In a regulated market, those weeks determine whether a product launches in the current cycle or the next one.\n\n${PROBLEM_DATA['production-delays'].stat2}.\n\n$1,500–$4,000 per day per idle downstream team. On a complex program with three dependent teams, a two-week delay creates $63,000–$168,000 in downstream cost before the delay is communicated externally.`,
    `PCB production delays are rarely caused by what shows up in the schedule recovery report.\n\nThey are caused by upstream planning failures — incomplete Gerber files, unresolved BOM issues, or approved alternates that weren't pre-qualified before production started.\n\n${PROBLEM_DATA['production-delays'].stat3}.\n\n71% of hardware overruns trace here. Not to on-board debugging. Not to component shortages discovered at test. To manufacturing readiness gaps that were visible before the job was released.\n\n${PROBLEM_DATA['production-delays'].stat2}.\n\nThe downstream cost clock starts the day delivery is missed. $4,000 per day per dependent team — before the EMS partner has explained the hold.\n\n${PROBLEM_DATA['production-delays'].stat1}.\n\nThe program that was 10% over schedule on paper was 28% over schedule by the time the real timeline played out.`,
  ],
  'component-shortages': [
    `Component shortages are predictable for parts on long lead time.\n\nThe cost is not in the shortage — it's in the respin.\n\n${PROBLEM_DATA['component-shortages'].stat1}.\n\n38% of electronics programs require a design respin because of shortage-driven EOL or allocation events. Six to fourteen additional weeks. New validation cycles. New regulatory test runs. A market window that may no longer exist when the respin is complete.\n\n${PROBLEM_DATA['component-shortages'].stat2}.\n\nPrograms without approved alternates pre-qualified before production have no options when the primary goes on allocation. The only option is the spot market.\n\n${PROBLEM_DATA['component-shortages'].stat3}.\n\nA 180–400% cost premium on spot market components is not a procurement exception. It's the cost of not having a component risk strategy before the program launched.`,
    `The component shortage was on the allocation watch list for six months.\n\nNo alternate was pre-approved. Production starts in three weeks.\n\n${PROBLEM_DATA['component-shortages'].stat2}.\n\n2.8x more production holds in programs without approved alternate strategies. The hold is not the worst outcome. The worst outcome is a design respin that pushes launch by fourteen weeks.\n\n${PROBLEM_DATA['component-shortages'].stat1}.\n\n38% of programs experience this. In most cases, the component's EOL or allocation status was visible long enough before production that a qualified alternate could have been designed in.\n\n${PROBLEM_DATA['component-shortages'].stat3}.\n\nThe spot market alternative to a respin costs 180–400% above contract pricing. On a 10,000-unit program with a $2 component, that's $36,000–$80,000 in unplanned cost — for a single line item on the BOM.`,
    `Most component shortage events in electronics manufacturing are not supply chain failures.\n\nThey are planning failures dressed as supply chain failures.\n\n${PROBLEM_DATA['component-shortages'].stat2}.\n\nPrograms with pre-qualified approved alternates for all long-lead and single-source components don't get held when the primary goes on allocation. They switch and continue.\n\n${PROBLEM_DATA['component-shortages'].stat1}.\n\nThe 38% of programs that require respins due to shortages are the programs that never built an alternate strategy into the design phase. The shortage was a supply event. The respin was a planning outcome.\n\n${PROBLEM_DATA['component-shortages'].stat3}.\n\nSpot market premiums of 180–400% are the tax on not building supply resilience into the program before production started.`,
  ],
  'rework-scrap-cost': [
    `Rework in electronics assembly is expensive in three ways — and most program budgets account for only one.\n\nFirst: the component replaced or the solder joint reflowed.\n\nSecond: the technician time and the risk of additional damage to adjacent components or board features.\n\nThird — and most expensive: the test cycle that must be repeated after every rework event.\n\n${PROBLEM_DATA['rework-scrap-cost'].stat2}.\n\nThree to six hours for a BGA rework event — with risk of pad lift, via damage, or adjacent component shifting. On a program with a hard delivery date, those hours are not recoverable.\n\n${PROBLEM_DATA['rework-scrap-cost'].stat1}.\n\n4–11% of total production cost. On a $400,000 production run, that is $16,000–$44,000 not in the original estimate.\n\n${PROBLEM_DATA['rework-scrap-cost'].stat3}.\n\nScrap rates of 6–14% versus 1–3% in disciplined operations. Every percentage point of scrap is a direct margin reduction.`,
    `The root cause of rework in electronics assembly is almost always the same.\n\nInspection at the wrong stage.\n\n${PROBLEM_DATA['rework-scrap-cost'].stat1}.\n\nWhen there is no solder paste inspection (SPI) before reflow and no AOI after placement, defects introduced at each stage compound into the next. By the time a failure appears at final inspection, the correction requires full BGA rework or board scrap.\n\n${PROBLEM_DATA['rework-scrap-cost'].stat3}.\n\nPrograms running 6–14% scrap are not using bad components. They are skipping the in-process inspection steps that catch defects while they are still cheap to fix.\n\n${PROBLEM_DATA['rework-scrap-cost'].stat2}.\n\nThree to six hours per BGA rework event sounds manageable until the program has 200 boards in production and 8% are failing final inspection in the same week.`,
    `Program managers track rework as a quality metric.\n\nThey should track it as a margin metric.\n\n${PROBLEM_DATA['rework-scrap-cost'].stat1}.\n\n4–11% of total production cost. That number includes the component and the direct labor. It does not include the test cycle, the schedule extension, or the downstream impact on system integration teams waiting for functional boards.\n\n${PROBLEM_DATA['rework-scrap-cost'].stat2}.\n\nA single BGA rework event three days before customer delivery is not a 6-hour problem. It's a delivery date problem and a confidence problem.\n\n${PROBLEM_DATA['rework-scrap-cost'].stat3}.\n\nThe scrap rate gap between well-run and poorly-run EMS programs — 1–3% versus 6–14% — is a process discipline gap. Not an equipment gap. Not a component quality gap. Process.`,
  ],
  'compliance-risk': [
    `Compliance in electronics manufacturing is not a checkbox.\n\nFor medical devices, defense electronics, and aerospace programs, it is the mechanism that determines whether a product can ship — and whether the company that built it remains in business.\n\n${PROBLEM_DATA['compliance-risk'].stat1}.\n\nA 4–8 week program hold from an IPC or ITAR compliance gap is not a documentation problem. It's a revenue problem, a customer commitment problem, and a contract performance problem.\n\n${PROBLEM_DATA['compliance-risk'].stat2}.\n\nProducts without traceability documentation have a 3x higher audit failure rate. The traceability is not for the auditor. It is the evidence that a controlled process produced a controlled product.\n\n${PROBLEM_DATA['compliance-risk'].stat3}.\n\nAn ITAR violation does not produce a corrective action request. It produces a penalty and a debarment review. The exposure is not theoretical.`,
    `The EMS partner you selected for cost is not ITAR-registered.\n\nYour defense program requires ITAR-compliant manufacturing.\n\n${PROBLEM_DATA['compliance-risk'].stat3}.\n\n$250,000 minimum penalty per ITAR incident. Plus debarment risk for the contracting company. Plus the program hold while the violation is investigated and remediated.\n\n${PROBLEM_DATA['compliance-risk'].stat1}.\n\nA 4–8 week compliance hold on a defense or medical program is not recoverable within a fiscal year in most cases. The downstream impacts — missed delivery milestones, deferred revenue, and customer penalties — compound the original compliance gap.\n\n${PROBLEM_DATA['compliance-risk'].stat2}.\n\nTraceability documentation is the compliance foundation. Without it, no audit — whether regulatory or customer-initiated — can be successfully completed.`,
    `Compliance gaps in electronics manufacturing are not discovered during audits.\n\nThey are discovered during program failures — product recalls, regulatory holds, and contract disputes.\n\n${PROBLEM_DATA['compliance-risk'].stat1}.\n\n4–8 weeks to resolve a compliance hold is the average. In a medical device program with a CE or FDA submission pending, that hold is a submission delay — which is a market entry delay.\n\n${PROBLEM_DATA['compliance-risk'].stat2}.\n\n3x higher audit failure rate without traceability documentation. The audit failure is not the cost. The program suspension that follows the audit failure is the cost.\n\n${PROBLEM_DATA['compliance-risk'].stat3}.\n\nITAR exposure is not limited to the EMS partner. The OEM who directed non-compliant manufacturing carries equal or greater liability. Compliance is a shared responsibility — and it requires verification, not assumption.`,
  ],
  'scaling-complexity': [
    `Prototypes are built to prove function. Production is built to prove manufacturability.\n\nThose are not the same standard — and most programs treat them as if they are.\n\n${PROBLEM_DATA['scaling-complexity'].stat1}.\n\n45–65% more defect events per board in the first three volume production runs. Not because the design changed. Because the design was never validated against the manufacturing process at volume.\n\n${PROBLEM_DATA['scaling-complexity'].stat2}.\n\n8–16 additional weeks to stabilize yield without a formal NPI process. During those weeks, engineering is burning cycles on production problems that a design for manufacturability review would have surfaced before the first panel was built.\n\n${PROBLEM_DATA['scaling-complexity'].stat3}.\n\nEngineering change orders during scaling add 12–28% per-unit cost above programs that freeze designs at production entry. The changes were predictable. The DFM review is what makes them predictable before production, not after.`,
    `The prototype ran successfully for 500 hours.\n\nThe first production run had an 18% first-pass yield failure rate.\n\n${PROBLEM_DATA['scaling-complexity'].stat1}.\n\n45–65% more defect events in the first three production runs is not a manufacturing quality problem. It's the output of a design that was validated for bench performance — not for SMT line assembly, reflow profile variation, and component tolerance stacking.\n\n${PROBLEM_DATA['scaling-complexity'].stat2}.\n\n8–16 weeks to stabilize yield. In a competitive hardware market, that's the window between launch and missing the market cycle.\n\n${PROBLEM_DATA['scaling-complexity'].stat3}.\n\nECOs during production scaling are the most expensive kind — because the tooling, the stencil, the reflow profile, and in some cases the board stackup all change. Each change requires revalidation. Each revalidation takes time that wasn't in the plan.`,
    `Scaling from prototype to production is the highest-risk transition in electronics manufacturing.\n\nMost teams treat it as a procurement event — find an EMS partner, send the BOM, start production.\n\n${PROBLEM_DATA['scaling-complexity'].stat3}.\n\n12–28% higher per-unit cost from ECOs during scaling. On a 10,000-unit program, a 15% cost increase on a $40 per-unit build is $60,000 in unplanned production cost — from design changes that a structured NPI process would have identified before production started.\n\n${PROBLEM_DATA['scaling-complexity'].stat1}.\n\n45–65% more defect events in early production runs. The defects are real, but they are design-origin defects — not assembly errors.\n\n${PROBLEM_DATA['scaling-complexity'].stat2}.\n\nThe 8–16 weeks to stabilize yield is the cost of skipping the NPI process. That process is not overhead. It is the mechanism that converts prototype success into production success.`,
  ],
  'cost-leakage': [
    `Cost leakage in electronics manufacturing is not a single line item.\n\nIt accumulates through component substitutions, rework cycles, untested escapes, and schedule extensions — none of which appear in the original production estimate.\n\n${PROBLEM_DATA['cost-leakage'].stat1}.\n\n8–18% above budgeted production cost as the average hidden overrun. On a $600,000 production program, that is $48,000–$108,000 that appeared nowhere in the plan.\n\n${PROBLEM_DATA['cost-leakage'].stat2}.\n\n$15,000–$80,000 in untracked BOM substitution cost per program. The substitution was approved. The qualification testing, the updated acceptance criteria, and the process re-verification were not tracked as program costs.\n\n${PROBLEM_DATA['cost-leakage'].stat3}.\n\n20–35% of field failures are shipping-escape defects. The cost of each field failure — warranty, RMA processing, root cause investigation — is orders of magnitude higher than the in-process inspection that would have caught it.`,
    `The production program was budgeted at $500,000.\n\nThe actual cost was $574,000.\n\n${PROBLEM_DATA['cost-leakage'].stat1}.\n\n8–18% average cost leakage above budget. Not from any single event — from a series of small, untracked cost decisions that each seemed reasonable in isolation.\n\n${PROBLEM_DATA['cost-leakage'].stat2}.\n\nA BOM substitution approved to maintain schedule. A component qualification test paid outside the original scope. An additional rework cycle on a late-arriving panel. Each one was necessary. None of them were in the program budget.\n\n${PROBLEM_DATA['cost-leakage'].stat3}.\n\n20–35% of field failures being shipping escapes means the inspection program was underfunded relative to the true cost of field failures. The leakage was in the test coverage decision — not in the test execution.`,
    `Cost leakage is the most controllable cost in electronics manufacturing — and the least measured.\n\n${PROBLEM_DATA['cost-leakage'].stat2}.\n\n$15,000–$80,000 per program in untracked BOM substitution cost. Most program managers know the substitution happened. Few track the full cost burden that follows: testing, documentation, process re-verification, and in some cases customer notification.\n\n${PROBLEM_DATA['cost-leakage'].stat1}.\n\nThe 8–18% average overrun is not visible until the program closes. By then, the decisions that created it are six months old and the budget is already spent.\n\n${PROBLEM_DATA['cost-leakage'].stat3}.\n\nShipping-escape defect rates of 20–35% of field failures represent a test coverage failure. The unit passed inspection. The inspection was not designed to catch the defect that failed in the field. That is a cost decision made during program setup — not a production error.`,
  ],
  'poor-manufacturing-decisions': [
    `The most expensive manufacturing decisions happen before manufacturing starts.\n\nThey happen at the PCB design stage — in layer stack-up selection, trace width tolerances, component footprint choices, and DFM compliance.\n\n${PROBLEM_DATA['poor-manufacturing-decisions'].stat1}.\n\nA design that bypasses DFM review doesn't cost less. It costs 22–40% more to produce — in tighter yield windows, higher rework rates, and the ECOs that follow the first production run.\n\n${PROBLEM_DATA['poor-manufacturing-decisions'].stat2}.\n\nEMS partner selection on price alone produces 2.5x more mid-program quality events. The savings are real in the quote stage. They are fictional in the production stage.\n\n${PROBLEM_DATA['poor-manufacturing-decisions'].stat3}.\n\nWrong layer stack-up or via type adds $4–$18 per board in avoidable fabrication cost. On a 5,000-unit program, that's $20,000–$90,000 in cost that was determined before the first board was ordered.`,
    `Most program teams treat EMS partner selection as a procurement decision.\n\nThe most consequential part of that decision is the process capability review — which most teams skip.\n\n${PROBLEM_DATA['poor-manufacturing-decisions'].stat2}.\n\n2.5x more mid-program quality events when selection is based on price. Not because low-cost EMS partners are incompetent — because price-based selection doesn't filter for the process controls that prevent quality events at volume.\n\n${PROBLEM_DATA['poor-manufacturing-decisions'].stat1}.\n\nDFM review is not a design constraint. It is cost control applied at the design stage. A 22–40% production cost premium from bypassing it is the opposite of the cost savings it was meant to protect.\n\n${PROBLEM_DATA['poor-manufacturing-decisions'].stat3}.\n\n$4–$18 per board in avoidable fabrication cost from wrong stack-up or via choices. Those decisions were made in a CAD tool by an engineer who was optimizing for electrical performance — not for fabrication cost. Both are achievable with the right DFM process.`,
    `A low-cost PCB that fails in the field is not cheap.\n\nIt is the most expensive decision in the program — expressed as warranty cost, field service cost, recall cost, and customer confidence.\n\n${PROBLEM_DATA['poor-manufacturing-decisions'].stat2}.\n\n2.5x more mid-program quality events with price-based EMS selection. The first quality event reveals the gap between quote-stage capability claims and production-stage reality.\n\n${PROBLEM_DATA['poor-manufacturing-decisions'].stat1}.\n\nDFM review adds a step to the design process. A 22–40% reduction in production cost is the return on that step. The question is whether the program budget accounts for DFM as an investment or treats it as overhead to skip.\n\n${PROBLEM_DATA['poor-manufacturing-decisions'].stat3}.\n\n$4–$18 per board in avoidable fabrication cost. The stack-up decision was made without fabrication input. A 30-minute DFM call with the EMS partner before layout completion would have caught it.`,
  ],
}

const BUSINESS_IMPACTS: Record<string, string> = {
  'manufacturing-bottlenecks': `Operational exposure: ${PROBLEM_DATA['manufacturing-bottlenecks'].cost1}. ${PROBLEM_DATA['manufacturing-bottlenecks'].cost2}. A program running two dependent engineering teams downstream of a delayed SMT line carries $3,000–$8,000/day in team idle and reintegration exposure. The bottleneck cost is not what happens on the assembly floor — it's what stops upstream while the floor catches up.`,
  'supplier-inconsistency': `Supply chain exposure: ${PROBLEM_DATA['supplier-inconsistency'].cost1}. ${PROBLEM_DATA['supplier-inconsistency'].cost2}. A production hold from a non-approved component substitution on a 5,000-unit program runs $15,000–$40,000 in hold cost per week — before expedite fees, resourcing costs, and schedule recovery are calculated. The substitution event is the trigger. Every cost that follows is the consequence.`,
  'qa-failures': `Quality exposure: ${PROBLEM_DATA['qa-failures'].cost1}. ${PROBLEM_DATA['qa-failures'].cost2}. A field return event on a medical or defense product triggers RMA processing, root cause investigation, and a yield hold on all shipped units. The direct cost is $500–$2,000 per returned unit. The indirect cost — regulatory notification, customer hold, and program audit — is typically 10–20x the direct number.`,
  'production-delays': `Schedule exposure: ${PROBLEM_DATA['production-delays'].cost1}. ${PROBLEM_DATA['production-delays'].cost2}. On a hardware program with three dependent teams and a two-week PCB delay, downstream idle cost reaches $63,000–$168,000 before a single schedule revision is communicated to the customer. The PCB delay is the trigger. The missed regulatory test window, the repositioned launch date, and the customer contract conversation are the consequences.`,
  'component-shortages': `Sourcing exposure: ${PROBLEM_DATA['component-shortages'].cost1}. ${PROBLEM_DATA['component-shortages'].cost2}. On a 10,000-unit program with five long-lead components at $3 average unit cost, a spot market sourcing event during allocation adds $27,000–$120,000 in unplanned component cost alone — before the respin and revalidation costs are calculated if an approved alternate is not available.`,
  'rework-scrap-cost': `Production cost exposure: ${PROBLEM_DATA['rework-scrap-cost'].cost1}. ${PROBLEM_DATA['rework-scrap-cost'].cost2}. On a $500,000 production program, a 7% rework rate is $35,000 in direct cost. That figure excludes the test cycles that must repeat after each rework event, the schedule extension from rework-driven delivery holds, and the downstream cost to system integration teams waiting for functional boards.`,
  'compliance-risk': `Regulatory exposure: ${PROBLEM_DATA['compliance-risk'].cost1}. ${PROBLEM_DATA['compliance-risk'].cost2}. An ITAR violation on a defense electronics program is not resolved by paying a penalty. It triggers a program suspension, an export compliance review, and potential debarment from future government contracts. The $250,000 minimum penalty is the starting number. The program and contract consequences are typically much larger.`,
  'scaling-complexity': `NPI exposure: ${PROBLEM_DATA['scaling-complexity'].cost1}. ${PROBLEM_DATA['scaling-complexity'].cost2}. On a hardware program scaling to 5,000 units at $50 per board, an 8-week yield stabilization delay represents $280,000 in delayed revenue at a weekly run rate — plus the $60,000+ in ECO-driven per-unit cost increases from design changes made during the scaling process.`,
  'cost-leakage': `Budget exposure: ${PROBLEM_DATA['cost-leakage'].cost1}. ${PROBLEM_DATA['cost-leakage'].cost2}. On a $600,000 production program, 13% average cost leakage is $78,000 in unbudgeted cost. That figure is assembled from component substitution qualification costs, additional rework cycles, extended program management time, and shipping-escape field failures — none of which appeared in the original cost model.`,
  'poor-manufacturing-decisions': `Design-stage exposure: ${PROBLEM_DATA['poor-manufacturing-decisions'].cost1}. ${PROBLEM_DATA['poor-manufacturing-decisions'].cost2}. On a 5,000-unit program with a $45 per-board build cost, a 30% DFM-driven production cost premium is $67,500 in avoidable cost — determined before the first board was ordered, in the CAD tool, by design decisions that were never reviewed against fabrication and assembly constraints.`,
}

const CTAS: string[] = [
  "If you're managing an electronics program and not tracking these variables, that's worth a 15-minute conversation. Link in comments.",
  "What's the actual production cost variance on your last program versus what was quoted? Most teams don't track the delta.",
  "We've mapped the real cost drivers for EMS programs like yours. Comment 'AUDIT' and I'll share the breakdown.",
  "Tag an engineering manager who has absorbed a PCB delay cost that never showed up on the original program budget.",
  "Drop your product category in the comments. I'll outline where production cost exposure typically concentrates in your segment.",
]

const IMPROVEMENT_SUGGESTIONS: Record<string, string[]> = {
  'manufacturing-bottlenecks': [
    'Add a specific market segment (medical devices, defense electronics, industrial controls) to anchor the bottleneck scenario to a recognizable context.',
    'Include a description of what a single-source EMS model looks like versus a multi-vendor one to make the structural argument concrete.',
    'Name the specific handoff points in the electronics manufacturing sequence — design to fab, fab to assembly, assembly to test — so readers can map their own programs.',
  ],
  'supplier-inconsistency': [
    'Add a specific component category (microcontrollers, passives, connectors) to make the substitution event more tangible for readers sourcing those parts.',
    'Include what a pre-qualified approved alternate strategy looks like in practice — what documentation, what testing, what timeline before production.',
    'Reference the lead time monitoring process that flags allocation risk before production is scheduled.',
  ],
  'qa-failures': [
    'Add the specific AOI and X-ray inspection checkpoints that catch the most common defect types — which stages, which defect modes.',
    'Include a cost comparison: programs with SPI + AOI + X-ray versus end-of-line inspection only, using the field return rate differential.',
    'Quantify the RMA processing cost for a single field return event on a regulated product to complete the total cost picture.',
  ],
  'production-delays': [
    'Add a specific product category (IoT device, medical sensor, defense subsystem) to make the $1,500–$4,000/day idle cost figure more tangible.',
    'Include the typical PCB manufacturing lead time range for the reader\'s complexity level so they can assess their own schedule risk.',
    'Reference the manufacturing readiness review that catches the gaps driving most delays before the job is released.',
  ],
  'component-shortages': [
    'Add the specific component categories most frequently affected by allocation events — power management ICs, microcontrollers, MLCCs.',
    'Include what a component risk strategy looks like in practice: approved alternates, strategic buffer stock, and long-term supplier agreements.',
    'Reference the EOL monitoring process that surfaces component risk before the program schedule is committed.',
  ],
  'rework-scrap-cost': [
    'Add the specific inspection stages that catch the most rework-preventable defects — SPI after paste, AOI after placement, X-ray after reflow.',
    'Include a cost comparison between programs with staged inspection and those with end-of-line only inspection using the rework rate differential.',
    'Quantify the schedule impact of a single BGA rework event on a board that is already at final test.',
  ],
  'compliance-risk': [
    'Specify which compliance frameworks apply to which market segments — ISO 9001 for commercial, ITAR for defense, ISO 13485 for medical.',
    'Include what a traceability documentation system looks like in an EMS program — what records, what retention period, what audit readiness.',
    'Reference the pre-production compliance review that identifies gaps before they become program holds.',
  ],
  'scaling-complexity': [
    'Define what a formal NPI process includes — DFM review, first-article inspection, process capability study, yield targets before full production release.',
    'Add the specific design elements that most commonly fail DFM review: via-in-pad without fill, insufficient clearances, unsupported component footprints.',
    'Include the yield stabilization cost model — what the 8–16 week delay costs in delayed revenue and unplanned engineering time.',
  ],
  'cost-leakage': [
    'Define the BOM cost control process that tracks substitution costs as program cost — not just component cost.',
    'Add the test coverage decision framework: what defect modes to design test coverage for, and what the field cost of an untested escape looks like.',
    'Include the program close-out cost reconciliation that reveals leakage — most programs never complete one.',
  ],
  'poor-manufacturing-decisions': [
    'Define what a DFM review includes and how long it takes — most engineers assume it requires weeks when a structured session can be completed in hours.',
    'Add the EMS process capability evaluation criteria: what certifications, what equipment, what in-process controls to verify before selection.',
    'Include the stack-up and via selection criteria that most commonly drive avoidable fabrication cost — so engineers know what to check.',
  ],
}

const POST_IDEAS: Record<string, PostIdea[]> = {
  'manufacturing-bottlenecks': [
    { title: 'The SMT Stoppage That Started in the Design Files, Not on the Line', angle: 'Insider Knowledge', rank: 1, painClarity: 10, financialImpact: 9, tension: 10 },
    { title: 'Why Multi-Vendor EMS Programs Create 40–60% More Production Stoppages', angle: 'Industry Benchmark', rank: 2, painClarity: 9, financialImpact: 9, tension: 9 },
    { title: '3–5 Day Assembly Delay: The Real Downstream Cost Per Day', angle: 'Financial Impact', rank: 3, painClarity: 9, financialImpact: 10, tension: 9 },
    { title: 'The Bottleneck Your Engineering Team Won\'t Find Until It\'s a Field Cost', angle: 'Assumption Challenge', rank: 4, painClarity: 9, financialImpact: 8, tension: 10 },
    { title: 'Why the PCB Handoff Is Where Most Electronics Programs Lose Schedule', angle: 'Process Breakdown', rank: 5, painClarity: 9, financialImpact: 8, tension: 9 },
    { title: 'Single-Source EMS vs. Multi-Vendor: The Stoppage Rate Math', angle: 'Decision Framework', rank: 6, painClarity: 8, financialImpact: 9, tension: 8 },
    { title: 'Component Kitting Failures: The Hidden Bottleneck in PCB Assembly', angle: 'Hidden Cost Exposure', rank: 7, painClarity: 9, financialImpact: 8, tension: 9 },
    { title: 'Why 65–75% of Production Phases Are Affected by One Upstream Hold', angle: 'Operational Risk', rank: 8, painClarity: 8, financialImpact: 8, tension: 8 },
    { title: 'The Cascade Effect of a Single SMT Line Stoppage', angle: 'Case Study Style', rank: 9, painClarity: 9, financialImpact: 9, tension: 9 },
    { title: 'What Bottleneck-Free Electronics Manufacturing Actually Requires', angle: 'Contrarian Take', rank: 10, painClarity: 7, financialImpact: 7, tension: 8 },
  ],
  'supplier-inconsistency': [
    { title: 'The Non-Approved Substitute That Caused a First-Article Failure', angle: 'Case Study Style', rank: 1, painClarity: 10, financialImpact: 9, tension: 10 },
    { title: '3x More Substitution Events with 4+ Distributors: The Sourcing Math', angle: 'Industry Benchmark', rank: 2, painClarity: 9, financialImpact: 9, tension: 9 },
    { title: '28–42% of First-Article Failures Trace to Supplier Inconsistency', angle: 'Financial Impact', rank: 3, painClarity: 10, financialImpact: 9, tension: 9 },
    { title: 'Why Supplier Inconsistency Shows Up at Kitting, Not at Order Placement', angle: 'Insider Knowledge', rank: 4, painClarity: 9, financialImpact: 8, tension: 9 },
    { title: 'Pre-Qualified Alternates vs. Spot Market Sourcing: The Risk Calculation', angle: 'Decision Framework', rank: 5, painClarity: 8, financialImpact: 9, tension: 8 },
    { title: 'How Many Distributors Are Too Many in an Electronics Program?', angle: 'Assumption Challenge', rank: 6, painClarity: 8, financialImpact: 8, tension: 9 },
    { title: 'Supplier Lead Time Inconsistency: The Production Hold Nobody Budgets For', angle: 'Hidden Cost Exposure', rank: 7, painClarity: 9, financialImpact: 9, tension: 8 },
    { title: 'The Allocation Event That Was on the Watch List for Six Months', angle: 'Contrarian Take', rank: 8, painClarity: 9, financialImpact: 9, tension: 9 },
    { title: 'Component Qualification vs. Component Sourcing: The Process Gap', angle: 'Process Breakdown', rank: 9, painClarity: 8, financialImpact: 8, tension: 8 },
    { title: 'Supply Chain Consolidation as a QA Strategy in Electronics Manufacturing', angle: 'Operational Risk', rank: 10, painClarity: 7, financialImpact: 8, tension: 7 },
  ],
  'qa-failures': [
    { title: 'QA Failure Cost: 6–10x Higher Post-Assembly Than In-Process', angle: 'Financial Impact', rank: 1, painClarity: 10, financialImpact: 10, tension: 10 },
    { title: '15–25% Higher Field Return Rates Without AOI and X-Ray: The Data', angle: 'Industry Benchmark', rank: 2, painClarity: 9, financialImpact: 10, tension: 9 },
    { title: '1 in 3 First-Article Rejections From Incomplete IPC Criteria', angle: 'Operational Risk', rank: 3, painClarity: 9, financialImpact: 9, tension: 9 },
    { title: 'Why BGA and QFN Defects Are Invisible Without X-Ray Inspection', angle: 'Insider Knowledge', rank: 4, painClarity: 9, financialImpact: 9, tension: 9 },
    { title: 'The IPC Acceptance Criteria Gap That Caused the First-Article Rejection', angle: 'Case Study Style', rank: 5, painClarity: 10, financialImpact: 8, tension: 10 },
    { title: 'In-Process Inspection vs. End-of-Line Inspection: The Defect Cost Difference', angle: 'Decision Framework', rank: 6, painClarity: 9, financialImpact: 9, tension: 8 },
    { title: 'Why Electronics Programs Underinvest in QA Until a Field Return Event', angle: 'Assumption Challenge', rank: 7, painClarity: 9, financialImpact: 9, tension: 9 },
    { title: 'SPI + AOI + X-Ray: What Each Catches and What Slips Through Without It', angle: 'Process Breakdown', rank: 8, painClarity: 9, financialImpact: 8, tension: 8 },
    { title: 'Tracking Defect Rate as a Financial Metric, Not a Quality Metric', angle: 'Contrarian Take', rank: 9, painClarity: 8, financialImpact: 9, tension: 8 },
    { title: 'The Shipping-Escape Defect Rate Nobody Tracks Until a Recall', angle: 'Hidden Cost Exposure', rank: 10, painClarity: 9, financialImpact: 10, tension: 9 },
  ],
  'production-delays': [
    { title: '71% of Hardware Launch Overruns Start with PCB Delays', angle: 'Industry Benchmark', rank: 1, painClarity: 10, financialImpact: 10, tension: 10 },
    { title: '$4,000/Day in Idle Team Cost: The Real Price of a PCB Delay', angle: 'Financial Impact', rank: 2, painClarity: 10, financialImpact: 10, tension: 9 },
    { title: 'The Firmware Team That Went Dark for Three Weeks Waiting on Boards', angle: 'Case Study Style', rank: 3, painClarity: 9, financialImpact: 10, tension: 10 },
    { title: 'Why PCB Manufacturing Readiness Failures Cause Most Launch Delays', angle: 'Assumption Challenge', rank: 4, painClarity: 9, financialImpact: 8, tension: 9 },
    { title: 'The 18–30% Timeline Extension Nobody Prices Into a Hardware Program', angle: 'Hidden Cost Exposure', rank: 5, painClarity: 9, financialImpact: 9, tension: 9 },
    { title: 'Missed Regulatory Test Windows: The Invisible Cost of PCB Delivery Delays', angle: 'Operational Risk', rank: 6, painClarity: 9, financialImpact: 9, tension: 9 },
    { title: 'Manufacturing Readiness Review: What It Catches Before a Delay Happens', angle: 'Decision Framework', rank: 7, painClarity: 8, financialImpact: 9, tension: 8 },
    { title: 'Incomplete Gerber Files vs. Complete Manufacturing Package: The Delay Math', angle: 'Process Breakdown', rank: 8, painClarity: 8, financialImpact: 8, tension: 8 },
    { title: 'Why "On Track" from a PCB Shop Means Something Different Than You Think', angle: 'Contrarian Take', rank: 9, painClarity: 9, financialImpact: 8, tension: 9 },
    { title: 'How to Build PCB Delay Risk Into a Hardware Program Schedule', angle: 'Industry Benchmark', rank: 10, painClarity: 7, financialImpact: 8, tension: 7 },
  ],
  'component-shortages': [
    { title: '38% of Electronics Programs Require a Respin Due to Component Shortages', angle: 'Industry Benchmark', rank: 1, painClarity: 10, financialImpact: 10, tension: 10 },
    { title: '180–400% Component Cost Premium on the Spot Market During Allocation', angle: 'Financial Impact', rank: 2, painClarity: 10, financialImpact: 10, tension: 9 },
    { title: 'The EOL Notice That Was on the Watch List for Six Months', angle: 'Insider Knowledge', rank: 3, painClarity: 9, financialImpact: 9, tension: 10 },
    { title: 'Approved Alternate Strategy vs. Spot Market: The Risk Calculation', angle: 'Decision Framework', rank: 4, painClarity: 8, financialImpact: 9, tension: 8 },
    { title: 'The Design Respin That Added 14 Weeks to a Hardware Launch', angle: 'Case Study Style', rank: 5, painClarity: 9, financialImpact: 9, tension: 10 },
    { title: '2.8x More Production Holds Without Approved Alternate Components', angle: 'Operational Risk', rank: 6, painClarity: 9, financialImpact: 9, tension: 9 },
    { title: 'Why Component Shortage Events Are Planning Failures, Not Supply Failures', angle: 'Contrarian Take', rank: 7, painClarity: 9, financialImpact: 9, tension: 9 },
    { title: 'Long Lead Time Components: How to Build a Shortage-Proof BOM', angle: 'Process Breakdown', rank: 8, painClarity: 8, financialImpact: 8, tension: 8 },
    { title: 'The Allocation Event That Was Visible Months Before It Halted Production', angle: 'Assumption Challenge', rank: 9, painClarity: 9, financialImpact: 9, tension: 9 },
    { title: 'How MLCC and MCU Shortages Expose Programs Without Alternate Strategies', angle: 'Hidden Cost Exposure', rank: 10, painClarity: 9, financialImpact: 9, tension: 9 },
  ],
  'rework-scrap-cost': [
    { title: 'BGA Rework: 3–6 Hours of Risk, Not Just 3–6 Hours of Labor', angle: 'Insider Knowledge', rank: 1, painClarity: 10, financialImpact: 9, tension: 10 },
    { title: '4–11% of Production Cost Lost to Rework Without In-Process Inspection', angle: 'Financial Impact', rank: 2, painClarity: 10, financialImpact: 10, tension: 9 },
    { title: 'Scrap Rates of 1–3% vs. 6–14%: What Separates the Two EMS Programs', angle: 'Industry Benchmark', rank: 3, painClarity: 9, financialImpact: 9, tension: 9 },
    { title: 'The Three Costs of Electronics Rework Most Teams Only Track One Of', angle: 'Hidden Cost Exposure', rank: 4, painClarity: 10, financialImpact: 9, tension: 9 },
    { title: 'Why the Cheapest EMS Quote Tends to Have the Highest Rework Rate', angle: 'Contrarian Take', rank: 5, painClarity: 9, financialImpact: 10, tension: 9 },
    { title: 'In-Process Inspection as a Rework Prevention System, Not a QC Check', angle: 'Process Breakdown', rank: 6, painClarity: 8, financialImpact: 9, tension: 8 },
    { title: 'How a Missing SPI Step Creates $40,000 in Downstream Rework', angle: 'Case Study Style', rank: 7, painClarity: 9, financialImpact: 10, tension: 9 },
    { title: 'Tracking Scrap Rate as a Margin Metric, Not a Quality Metric', angle: 'Assumption Challenge', rank: 8, painClarity: 8, financialImpact: 9, tension: 8 },
    { title: 'Rework Discovered at Final Test vs. During In-Process Inspection: The Cost Gap', angle: 'Decision Framework', rank: 9, painClarity: 9, financialImpact: 9, tension: 9 },
    { title: 'What the BGA Rework Rate Tells You About an EMS Partner\'s Process Discipline', angle: 'Operational Risk', rank: 10, painClarity: 8, financialImpact: 8, tension: 9 },
  ],
  'compliance-risk': [
    { title: 'ITAR Violations in EMS Programs: $250K Minimum, No Warning', angle: 'Operational Risk', rank: 1, painClarity: 10, financialImpact: 10, tension: 10 },
    { title: '4–8 Week Compliance Hold: The Program Cost Nobody Budgets For', angle: 'Financial Impact', rank: 2, painClarity: 9, financialImpact: 10, tension: 9 },
    { title: '3x Higher Audit Failure Rate Without Traceability Documentation', angle: 'Industry Benchmark', rank: 3, painClarity: 9, financialImpact: 9, tension: 9 },
    { title: 'Why EMS Partner Selection for Defense Programs Starts with Compliance, Not Price', angle: 'Decision Framework', rank: 4, painClarity: 9, financialImpact: 9, tension: 9 },
    { title: 'IPC, ISO 9001, ITAR: What Each Requires and When Each Applies', angle: 'Educational', rank: 5, painClarity: 8, financialImpact: 8, tension: 7 },
    { title: 'The Compliance Gap That Caused an 8-Week Program Hold on a Medical Device', angle: 'Case Study Style', rank: 6, painClarity: 10, financialImpact: 9, tension: 10 },
    { title: 'Traceability in Electronics Manufacturing: What It Covers and What Auditors Look For', angle: 'Insider Knowledge', rank: 7, painClarity: 8, financialImpact: 8, tension: 8 },
    { title: 'Pre-Production Compliance Review: What It Catches Before a Hold', angle: 'Process Breakdown', rank: 8, painClarity: 8, financialImpact: 9, tension: 8 },
    { title: 'Why Compliance Gaps Are Discovered During Program Failures, Not Audits', angle: 'Contrarian Take', rank: 9, painClarity: 9, financialImpact: 9, tension: 9 },
    { title: 'The OEM\'s ITAR Liability When the EMS Partner Isn\'t Registered', angle: 'Hidden Cost Exposure', rank: 10, painClarity: 10, financialImpact: 10, tension: 10 },
  ],
  'scaling-complexity': [
    { title: '45–65% More Defects Per Board in the First Three Production Runs', angle: 'Industry Benchmark', rank: 1, painClarity: 10, financialImpact: 9, tension: 10 },
    { title: 'Why the Prototype Worked and the First Production Run Didn\'t', angle: 'Case Study Style', rank: 2, painClarity: 10, financialImpact: 9, tension: 10 },
    { title: '8–16 Weeks to Stabilize Yield Without a Formal NPI Process', angle: 'Financial Impact', rank: 3, painClarity: 9, financialImpact: 9, tension: 9 },
    { title: 'DFM Review: What It Catches and What Skipping It Costs', angle: 'Decision Framework', rank: 4, painClarity: 9, financialImpact: 10, tension: 9 },
    { title: 'ECOs During Production Scaling: Why They Cost 12–28% More Per Unit', angle: 'Hidden Cost Exposure', rank: 5, painClarity: 9, financialImpact: 9, tension: 9 },
    { title: 'Prototype-to-Production Transition: The Highest-Risk Phase in Electronics', angle: 'Operational Risk', rank: 6, painClarity: 9, financialImpact: 8, tension: 9 },
    { title: 'Why 50-Unit Prototypes Don\'t Predict 5,000-Unit Yield', angle: 'Assumption Challenge', rank: 7, painClarity: 9, financialImpact: 9, tension: 9 },
    { title: 'NPI Process vs. No NPI Process: The Production Defect Rate Comparison', angle: 'Industry Benchmark', rank: 8, painClarity: 9, financialImpact: 9, tension: 9 },
    { title: 'What a Formal NPI Process Includes (And Why Most Programs Skip It)', angle: 'Insider Knowledge', rank: 9, painClarity: 8, financialImpact: 8, tension: 8 },
    { title: 'Design Frozen at Production Entry vs. Design Frozen at Prototype: The Cost Difference', angle: 'Process Breakdown', rank: 10, painClarity: 8, financialImpact: 9, tension: 8 },
  ],
  'cost-leakage': [
    { title: '8–18% Above Budget: The Hidden Cost Leakage in Electronics Programs', angle: 'Financial Impact', rank: 1, painClarity: 10, financialImpact: 10, tension: 9 },
    { title: '$80,000 in Untracked BOM Substitution Cost on a Single Program', angle: 'Hidden Cost Exposure', rank: 2, painClarity: 9, financialImpact: 10, tension: 9 },
    { title: '20–35% of Field Failures Are Shipping Escapes That Passed Inspection', angle: 'Operational Risk', rank: 3, painClarity: 10, financialImpact: 9, tension: 10 },
    { title: 'Why Electronics Program Cost Reports Always Surprise the Finance Team', angle: 'Contrarian Take', rank: 4, painClarity: 9, financialImpact: 9, tension: 9 },
    { title: 'BOM Cost Control in EMS Programs: The Missing Process', angle: 'Process Breakdown', rank: 5, painClarity: 8, financialImpact: 9, tension: 8 },
    { title: 'Test Coverage Decisions as Cost Control: The ROI Calculation', angle: 'Decision Framework', rank: 6, painClarity: 8, financialImpact: 9, tension: 8 },
    { title: 'The Component Substitution That Was Approved but Never Costed Out', angle: 'Case Study Style', rank: 7, painClarity: 9, financialImpact: 9, tension: 9 },
    { title: 'Cost Leakage vs. Cost Overrun: Why the Distinction Matters', angle: 'Assumption Challenge', rank: 8, painClarity: 8, financialImpact: 8, tension: 8 },
    { title: 'What a Program Close-Out Cost Reconciliation Reveals', angle: 'Insider Knowledge', rank: 9, painClarity: 9, financialImpact: 9, tension: 9 },
    { title: 'How Rework, Substitutions, and Escapes Combine to Destroy a Program Margin', angle: 'Industry Benchmark', rank: 10, painClarity: 9, financialImpact: 10, tension: 9 },
  ],
  'poor-manufacturing-decisions': [
    { title: 'DFM Review: 22–40% Production Cost Reduction vs. Skipping It', angle: 'Financial Impact', rank: 1, painClarity: 10, financialImpact: 10, tension: 9 },
    { title: '2.5x More Quality Events When EMS Partner Is Selected on Price Alone', angle: 'Industry Benchmark', rank: 2, painClarity: 10, financialImpact: 9, tension: 9 },
    { title: '$18/Board in Avoidable Fabrication Cost from the Wrong Via Type', angle: 'Hidden Cost Exposure', rank: 3, painClarity: 9, financialImpact: 9, tension: 9 },
    { title: 'Why the Cheapest EMS Quote Is the Most Expensive Program Decision', angle: 'Contrarian Take', rank: 4, painClarity: 9, financialImpact: 10, tension: 10 },
    { title: 'The Manufacturing Decision Made in CAD That Determined Production Cost', angle: 'Insider Knowledge', rank: 5, painClarity: 9, financialImpact: 9, tension: 9 },
    { title: 'PCB Stack-Up Selection: How a Design Choice Becomes a Cost Driver', angle: 'Process Breakdown', rank: 6, painClarity: 8, financialImpact: 9, tension: 8 },
    { title: 'EMS Partner Process Capability Review: What to Ask Before Selecting', angle: 'Decision Framework', rank: 7, painClarity: 8, financialImpact: 8, tension: 8 },
    { title: 'Why Low-Cost Boards Fail in the Field and Expensive Boards Get Recalled', angle: 'Assumption Challenge', rank: 8, painClarity: 9, financialImpact: 9, tension: 9 },
    { title: 'The DFM Call That Would Have Prevented $67,000 in Production Cost', angle: 'Case Study Style', rank: 9, painClarity: 9, financialImpact: 10, tension: 9 },
    { title: 'Functional Validation vs. Manufacturing Validation: The Prototype Trap', angle: 'Operational Risk', rank: 10, painClarity: 9, financialImpact: 9, tension: 9 },
  ],
}

const CALENDAR_ENTRIES: CalendarEntry[] = [
  { day: 1, topic: 'Manufacturing Bottlenecks', hook: 'The SMT stoppage in your electronics program didn\'t start on the assembly line. It started in the design file review two weeks earlier.', angle: 'Insider Knowledge', cta: 'Where did your last production bottleneck actually originate — design, sourcing, or assembly?' },
  { day: 2, topic: 'Supplier Inconsistency', hook: '35–55% of unplanned production holds in EMS programs trace to supplier lead time inconsistency. Most programs have no contingency for it.', angle: 'Industry Benchmark', cta: 'How many distributors are in your current component supply chain? Have you mapped the substitution risk?' },
  { day: 3, topic: 'QA Failures', hook: 'A QA failure caught during in-process inspection costs a rework cycle. Caught in the field, it costs a recall and a customer conversation.', angle: 'Financial Impact', cta: 'What is your current in-process inspection architecture — SPI, AOI, X-ray? Are all three in place?' },
  { day: 4, topic: 'Production Delays', hook: '71% of hardware launch overruns trace to PCB manufacturing delays. The board is the critical path. The manufacturing process determines the outcome.', angle: 'Operational Risk', cta: 'When did you last complete a manufacturing readiness review before releasing a PCB job?' },
  { day: 5, topic: 'Component Shortages', hook: 'The component that will delay your next production run is already on an allocation watch list. Most programs don\'t check until it\'s too late.', angle: 'Hidden Cost Exposure', cta: 'How many components in your BOM have no pre-qualified approved alternate? That number is your shortage exposure.' },
  { day: 6, topic: 'Rework and Scrap Cost', hook: '4–11% of production cost lost to rework is not a quality metric. It\'s a margin metric — and it\'s controllable with the right in-process inspection program.', angle: 'Financial Impact', cta: 'What is your current rework rate as a percentage of total production cost? Most programs have never calculated it.' },
  { day: 7, topic: 'Compliance Risk', hook: 'An ITAR violation doesn\'t produce a warning. It produces a $250,000 minimum penalty and a program suspension. Most EMS partner selections don\'t verify ITAR registration.', angle: 'Operational Risk', cta: 'Is your EMS partner ITAR-registered? If your product has defense or dual-use applications, the answer needs to be verified, not assumed.' },
  { day: 8, topic: 'Scaling Complexity', hook: 'The prototype ran successfully. The first production run had a 20% first-pass yield failure rate. They were built to the same design — but the design was never validated for manufacturing.', angle: 'Case Study Style', cta: 'Has your current design gone through a DFM review before production entry? If not, the first run will tell you what the review would have.' },
  { day: 9, topic: 'Cost Leakage', hook: '8–18% above budgeted production cost is not a cost overrun. It\'s cost leakage — accumulated through substitutions, rework, and untested escapes that each seemed minor individually.', angle: 'Industry Benchmark', cta: 'Have you completed a program cost reconciliation on a closed electronics program? The number usually surprises the team.' },
  { day: 10, topic: 'Poor Manufacturing Decisions', hook: 'The most expensive manufacturing decision in your electronics program was made in CAD — before the first board was ordered. DFM review is the only intervention that changes the outcome.', angle: 'Decision Framework', cta: 'Was a DFM review completed before your last PCB design went to fabrication? The production cost reflects whether it was.' },
  { day: 11, topic: 'Manufacturing Bottlenecks', hook: 'A program running two dependent engineering teams with a 3-day SMT stoppage absorbs $9,000–$24,000 in downstream idle cost before the floor team has identified the root cause.', angle: 'Financial Impact', cta: 'How are you tracking downstream team idle cost when production holds occur?' },
  { day: 12, topic: 'Supplier Inconsistency', hook: 'At four or more distributors for the same component family, your substitution event probability is 3x higher than a consolidated supply chain. That\'s not a sourcing preference — it\'s a risk structure.', angle: 'Contrarian Take', cta: 'What\'s your process for verifying component authenticity and approval status at receiving?' },
  { day: 13, topic: 'QA Failures', hook: 'The three costs of an electronics QA failure: the rework, the test repeat, and the field return if it escapes. Most programs track the first one. The third is 6–10x the cost of the first.', angle: 'Process Breakdown', cta: 'What is your current shipping-escape defect rate? If you haven\'t calculated it from field return data, the answer is unknown — not zero.' },
  { day: 14, topic: 'Production Delays', hook: 'An incomplete Gerber package sent to fabrication adds 3–5 days to lead time for clarification cycles. Most programs treat it as a fabrication delay — it\'s a pre-production readiness failure.', angle: 'Assumption Challenge', cta: 'What does your PCB release checklist include? Does it verify manufacturing package completeness before release?' },
  { day: 15, topic: 'Component Shortages', hook: '180–400% spot market cost premium during allocation events is not exceptional — it\'s the documented average. Programs with pre-qualified alternates never see that number.', angle: 'Financial Impact', cta: 'How many components in your top five BOMs are single-sourced with no approved alternate? That is your spot market exposure.' },
  { day: 16, topic: 'Rework and Scrap Cost', hook: 'Scrap rate disparity: 1–3% in disciplined EMS operations versus 6–14% in undisciplined ones. The difference is not equipment — it\'s in-process inspection at the right stages.', angle: 'Industry Benchmark', cta: 'What scrap rate does your EMS partner report on your current program? If you don\'t know, ask.' },
  { day: 17, topic: 'Compliance Risk', hook: 'A 4–8 week compliance hold on a medical device program with a regulatory submission pending doesn\'t delay shipping. It delays market entry — which is a revenue consequence, not a schedule one.', angle: 'Operational Risk', cta: 'When did you last conduct a pre-production compliance review for an EMS program? What did it cover?' },
  { day: 18, topic: 'Scaling Complexity', hook: '8–16 weeks to stabilize yield without a formal NPI process. That window is often the difference between a product that captures market share and one that launches into a crowded market cycle.', angle: 'Financial Impact', cta: 'What is your current prototype-to-production transition process? Does it include a formal yield target before full production release?' },
  { day: 19, topic: 'Cost Leakage', hook: '$15,000–$80,000 in untracked BOM substitution cost per program. The substitution was approved. The qualification testing, updated documentation, and process re-verification were not tracked as program costs.', angle: 'Hidden Cost Exposure', cta: 'How does your program track the full cost burden of a BOM substitution — not just the component delta?' },
  { day: 20, topic: 'Poor Manufacturing Decisions', hook: '2.5x more mid-program quality events when EMS selection is price-based. The first quality event reveals the gap between the quote-stage capability claim and the production-stage reality.', angle: 'Contrarian Take', cta: 'What process capability criteria did your last EMS selection evaluate beyond price and lead time?' },
  { day: 21, topic: 'Manufacturing Bottlenecks', hook: '65–75% of dependent production phases are affected when a single PCB assembly stage hits a bottleneck. The cascade is predictable. The planning rarely accounts for it.', angle: 'Operational Risk', cta: 'How is production bottleneck risk built into your program schedule at the phase level?' },
  { day: 22, topic: 'Supplier Inconsistency', hook: '28–42% of first-article failures in electronics programs trace to a substituted or non-approved component. The design was correct. The supply chain wasn\'t managed to the same standard.', angle: 'Industry Benchmark', cta: 'What is your first-article rejection rate from supplier inconsistency over the last four programs? The number tells you more than any supplier audit.' },
  { day: 23, topic: 'QA Failures', hook: 'BGA and QFN packages can\'t be visually inspected. Programs shipping those components without X-ray inspection are delivering at unknown solder joint quality. That risk shows up in field returns.', angle: 'Insider Knowledge', cta: 'Does your EMS partner run X-ray inspection on BGA and QFN components? This question filters the programs that will have field return problems from those that won\'t.' },
  { day: 24, topic: 'Production Delays', hook: 'The firmware team went dark for three weeks waiting on boards that were delayed by a BOM issue that wasn\'t identified until kitting. That delay was visible two weeks before the boards were released.', angle: 'Case Study Style', cta: 'Comment with your product type. I\'ll outline where production delay risk typically concentrates in your segment.' },
  { day: 25, topic: 'Component Shortages', hook: 'The design respin added fourteen weeks. The component had been on EOL notice for eight months. The program team saw the notice and took no action. That\'s a planning failure, not a supply failure.', angle: 'Assumption Challenge', cta: 'Who is responsible for EOL and allocation monitoring in your current electronics programs? If the answer isn\'t clear, the exposure is real.' },
  { day: 26, topic: 'Rework and Scrap Cost', hook: 'A BGA rework event doesn\'t just cost the technician time. It puts thermal stress on every component within 3mm of the rework site and risks pad lift on a board that may have no remaining margin for repair.', angle: 'Insider Knowledge', cta: 'How does your EMS partner report BGA rework events — and does the report include risk assessment for adjacent components?' },
  { day: 27, topic: 'Compliance Risk', hook: 'The OEM who directed non-compliant manufacturing carries equal or greater ITAR liability than the EMS partner who executed it. Compliance is a shared responsibility — and it requires verification, not assumption.', angle: 'Contrarian Take', cta: 'What compliance verification does your EMS partner selection process include for regulated programs?' },
  { day: 28, topic: 'Scaling Complexity', hook: 'ECOs during production scaling add 12–28% per-unit cost above programs with frozen designs at production entry. The ECOs were predictable. The DFM review is what makes them predictable before production.', angle: 'Financial Impact', cta: 'What is the ECO rate per board on your most recent production scaling program? Compare it against programs that had a formal DFM review.' },
  { day: 29, topic: 'Cost Leakage', hook: '20–35% of field failures are shipping-escape defects that passed internal inspection. The inspection program was underfunded relative to the cost of field failures. That\'s a cost decision made during program setup.', angle: 'Operational Risk', cta: 'What percentage of your field failures trace to shipping escapes? This metric tells you whether your inspection program is sized correctly.' },
  { day: 30, topic: 'Poor Manufacturing Decisions', hook: 'The wrong via type adds $18 per board in avoidable fabrication cost. On a 5,000-unit program, that\'s $90,000 determined in a CAD tool, before any board was ordered. A 30-minute DFM call would have caught it.', angle: 'Decision Framework', cta: 'I can walk through your current PCB design against DFM criteria for your EMS partner\'s process. Let me know your stack-up and assembly complexity.' },
]

const REPURPOSING: string[] = [
  'Break the Business Impact section into a Twitter/X thread — EMS engineers and engineering managers engage heavily with specific cost figures.',
  'Turn the 30-day calendar into a downloadable PDF titled "30 Days of Electronics Manufacturing Cost Content for Engineering and Operations Leaders."',
  'Pull the hook and opening into a YouTube Shorts script — add B-roll of SMT assembly, AOI inspection, or PCB testing and post natively.',
  'Convert the Post Ideas table into an Instagram carousel ranking the top content angles for operations directors and procurement officers.',
  'Use the hook as a cold outreach subject line for engineering managers at hardware companies preparing for production scaling.',
]

export function generateLinkedIn(inputs: LinkedInInputs, seed: number = 0): LinkedInOutput {
  const v = seed % 3
  const p = inputs.problem

  const hookOptions = HOOKS[p] ?? HOOKS['manufacturing-bottlenecks']
  const bodyOptions = BODIES[p] ?? BODIES['manufacturing-bottlenecks']
  const postIdeas = POST_IDEAS[p] ?? POST_IDEAS['manufacturing-bottlenecks']

  const hook = hookOptions[v] ?? hookOptions[0]
  const body = bodyOptions[v] ?? bodyOptions[0]
  const businessImpact = BUSINESS_IMPACTS[p] ?? BUSINESS_IMPACTS['manufacturing-bottlenecks']
  const cta = CTAS[v % CTAS.length]
  const improvements = IMPROVEMENT_SUGGESTIONS[p] ?? IMPROVEMENT_SUGGESTIONS['manufacturing-bottlenecks']

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
