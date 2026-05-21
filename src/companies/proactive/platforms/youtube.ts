import type { YouTubeInputs, YouTubeOutput } from '../types'
import { PROBLEM_DATA } from '../lib/companyProfile'
import { scoreContent } from '../lib/scoring'

const TITLES: Record<string, string[][]> = {
  'manufacturing-bottlenecks': [
    ["Why Your PCB Program Is Always Behind Schedule (It\'s Not the Assembly Line)", "The 5-Day Delay That Started Before Any Board Was Built", "EMS Bottlenecks: Where Electronics Programs Really Fall Apart"],
    ["How One SMT Stoppage Delays an Entire Hardware Program", "The Multi-Vendor EMS Problem Nobody Tracks Until It\'s Too Late", "Why 70% of Production Phases Fail Because of One Upstream Hold"],
    ["Single-Source EMS vs. Multi-Vendor: The Real Stoppage Rate Difference", "The Handoff Failure That\'s Costing Your Program Weeks", "What Electronics Manufacturing Bottlenecks Actually Cost Per Day Downstream"],
  ],
  'supplier-inconsistency': [
    ["The Non-Approved Substitute That Held Up 5,000 Boards", "Why 35% of Production Holds Start with Supplier Inconsistency", "The Component That Arrived — Just Not the One You Approved"],
    ["3x More Substitution Events: The Multi-Distributor Problem", "How Supplier Inconsistency Causes First-Article Failures", "The Allocation Event That Was on the Watch List for Six Months"],
    ["Pre-Qualified Alternates vs. Spot Market Sourcing: The Risk Math", "Why Your Supply Chain Strategy Is Your QA Strategy", "The Distributor Count That\'s Creating Your Production Holds"],
  ],
  'qa-failures': [
    ["QA Failure Cost: 6–10x Higher in the Field Than on the Line", "Why 15% Higher Field Returns Start with Missing AOI", "The IPC Criteria Gap That Caused the First-Article Rejection"],
    ["BGA and QFN Defects: Why You Need X-Ray Inspection", "How In-Process Inspection Prevents 25% Field Return Rates", "The QA Architecture That Determines Your Field Failure Rate"],
    ["Tracking Defect Rate as a Financial Metric", "Why Electronics Programs Underinvest in QA Until a Recall", "SPI + AOI + X-Ray: What Each Stage Catches"],
  ],
  'production-delays': [
    ["71% of Hardware Launch Overruns Start with PCB Delays", "$4,000/Day: The Real Cost of a PCB Delivery Delay", "Why the Board Is the Critical Path in Every Hardware Program"],
    ["How a 3-Week PCB Delay Becomes a $168K Problem for Your Team", "The Manufacturing Readiness Gap That Causes Most Launch Delays", "Why \'On Track\' From a PCB Shop Means Less Than You Think"],
    ["PCB Lead Times: What Shops Quote vs. What Happens", "The Firmware Team That Went Dark Waiting on Boards", "How to Build PCB Delay Risk Into a Hardware Program Schedule"],
  ],
  'component-shortages': [
    ["38% of Electronics Programs Require a Respin Due to Shortages", "180–400% Cost Premium: The Spot Market Reality During Allocation", "The EOL Notice That Was Ignored for Six Months"],
    ["How Component Shortages Force Design Respins and Add 14 Weeks", "Pre-Qualified Alternates: The Strategy That Prevents Production Holds", "Why Your BOM Has a Shortage Waiting to Happen"],
    ["MLCC and MCU Shortages: Why Your Program Is Exposed", "The Approved Alternate Strategy That Keeps Programs Running", "Spot Market vs. Alternate Component: The Real Cost Comparison"],
  ],
  'rework-scrap-cost': [
    ["4–11% of Production Cost Goes to Rework (Here\'s Why)", "BGA Rework: 3–6 Hours of Labor and Unknown Board Risk", "The Three Costs of Electronics Rework Nobody Tracks Completely"],
    ["Scrap Rate: What 1% vs. 12% Means for Your Program Margin", "How a Missing SPI Step Creates $40,000 in Rework Downstream", "Why the Cheapest EMS Quote Has the Highest Rework Rate"],
    ["In-Process Inspection as Rework Prevention", "What Scrap Rate Tells You About an EMS Partner\'s Process Discipline", "How to Track Rework as a Margin Metric, Not a Quality Metric"],
  ],
  'compliance-risk': [
    ["ITAR Violations in EMS Programs: $250K Minimum, No Warning", "4–8 Week Compliance Hold: The Program Cost Nobody Plans For", "Why Compliance Is the Gate Between Production and Shipment"],
    ["How an IPC Documentation Gap Caused an 8-Week Program Hold", "Traceability in Electronics Manufacturing: What Auditors Look For", "3x Higher Audit Failure Rate Without Traceability Documentation"],
    ["ITAR, ISO 9001, ISO 13485: What Each Requires and When", "The EMS Partner\'s Compliance Status Is Your Compliance Status", "Pre-Production Compliance Review: What to Check Before Release"],
  ],
  'scaling-complexity': [
    ["Why the Prototype Worked and the First Production Run Didn\'t", "45–65% More Defects Per Board in Early Production Runs", "The DFM Review That Would Have Prevented $67K in ECO Cost"],
    ["How Skipping NPI Adds 16 Weeks to Your Production Schedule", "Prototype-to-Production: The Highest-Risk Transition in Electronics", "Why 50-Unit Builds Don\'t Predict 5,000-Unit Yield"],
    ["ECOs During Scaling: Why They Cost 28% More Per Unit", "What a Formal NPI Process Actually Includes", "DFM Review ROI: What a 30-Minute Call Prevents"],
  ],
  'cost-leakage': [
    ["8–18% Above Budget: The Hidden Cost in Every Electronics Program", "$80K in Untracked BOM Substitution Cost on One Program", "Why Electronics Program Cost Reports Always Surprise Finance"],
    ["20–35% of Field Failures Are Shipping Escapes That Passed Inspection", "BOM Cost Control: The Missing Process in Most EMS Programs", "How Rework, Substitutions, and Escapes Combine to Kill Margin"],
    ["What a Program Close-Out Cost Reconciliation Reveals", "Test Coverage as Cost Control: The ROI Calculation", "Cost Leakage vs. Cost Overrun: Why the Difference Matters"],
  ],
  'poor-manufacturing-decisions': [
    ["Why the Cheapest EMS Quote Is the Most Expensive Program Decision", "DFM Review: 22–40% Production Cost Reduction in One Step", "The PCB Design Decision That Determined Your Production Cost"],
    ["2.5x More Quality Events When EMS Is Selected on Price Alone", "$90K in Avoidable Fabrication Cost from the Wrong Via Type", "How Manufacturing Decisions Made in CAD Drive Production Cost"],
    ["The DFM Call That Would Have Prevented a Product Recall", "EMS Process Capability: What to Evaluate Before Selecting", "Functional Validation vs. Manufacturing Validation: The Prototype Trap"],
  ],
}

const THUMBNAIL_TEXTS: Record<string, string> = {
  'manufacturing-bottlenecks': '5-DAY DELAY|STARTED IN DESIGN FILES|REAL BOTTLENECK COST',
  'supplier-inconsistency': '3X MORE HOLDS|WRONG PART AT KITTING|SUPPLIER STRATEGY RISK',
  'qa-failures': '6–10X COST IN FIELD|MISSING AOI = MORE RETURNS|QA TIMING PROBLEM',
  'production-delays': '$4K/DAY IDLE COST|71% OVERRUNS START HERE|PCB IS THE CRITICAL PATH',
  'component-shortages': '38% NEED RESPIN|400% SPOT MARKET PREMIUM|SHORTAGE BEFORE IT STARTS',
  'rework-scrap-cost': '11% LOST TO REWORK|3 COSTS NOBODY TRACKS|SCRAP RATE = MARGIN RATE',
  'compliance-risk': '$250K ITAR PENALTY|8-WEEK HOLD RISK|COMPLIANCE IS THE GATE',
  'scaling-complexity': '65% MORE DEFECTS|PROTOTYPE ≠ PRODUCTION|NPI PROCESS MATTERS',
  'cost-leakage': '18% HIDDEN OVERRUN|$80K UNTRACKED COST|LEAKAGE IS CONTROLLABLE',
  'poor-manufacturing-decisions': '40% COST PREMIUM|CHEAPEST QUOTE MYTH|DFM REVIEW = COST CONTROL',
}

const THREE_SECOND_HOOKS: Record<string, string[]> = {
  'manufacturing-bottlenecks': [
    "Your PCB program is behind schedule. The bottleneck you're tracking isn't the one that caused it.",
    "Every engineering team waiting on delayed boards costs $2,000–$4,000 per day. That clock started before assembly began.",
    "One SMT stoppage delays three to five days of downstream program work. Here's where it actually starts.",
  ],
  'supplier-inconsistency': [
    "The component arrived at kitting. It wasn't the approved part. Production holds. Here's what that costs.",
    "35–55% of production holds in EMS programs trace to supplier inconsistency. Most programs have no contingency for it.",
    "Using four distributors for the same component family triples your substitution event probability. Here's why.",
  ],
  'qa-failures': [
    "A solder defect caught in AOI costs 20 minutes. Caught in the field, it costs a recall investigation. Same defect, 6–10x the cost.",
    "15–25% higher field return rates without formal AOI and X-ray. The inspection program determines the field return rate.",
    "1 in 3 first-article rejections comes from incomplete IPC acceptance criteria. Here's what that looks like — and how to prevent it.",
  ],
  'production-delays': [
    "71% of hardware launch overruns trace to PCB manufacturing delays. Not software. Not mechanical. The board is the critical path.",
    "Your PCB delivery is two weeks late. Three engineering teams are idle. The daily cost is $7,500–$12,000.",
    "An 18–30% timeline extension from PCB delays is the documented average. Most programs never price that risk into the schedule.",
  ],
  'component-shortages': [
    "38% of electronics programs require a design respin because of component shortages. Most of those respins were preventable.",
    "The spot market alternative to a design respin costs 180–400% above contract pricing. Here's the math on why alternates are worth qualifying.",
    "The component that will hold your next production run is already on an allocation watch list. Here's how to find it before it finds you.",
  ],
  'rework-scrap-cost': [
    "4–11% of your production cost is going to rework. Most of it is traceable to one missing in-process inspection step.",
    "A BGA rework event doesn't just cost the technician time. It puts the entire board at risk. Here's what that looks like.",
    "Scrap rates of 1–3% versus 6–14% — the gap between disciplined and undisciplined EMS programs. Here's what creates it.",
  ],
  'compliance-risk': [
    "$250,000 minimum ITAR penalty per incident. No warning. No corrective action period. Here's what compliance actually requires.",
    "A 4–8 week compliance hold on a medical device program with a regulatory submission pending doesn't delay shipping — it delays market entry.",
    "3x higher audit failure rate without traceability documentation. The traceability is not for the auditor — it's the evidence of a controlled process.",
  ],
  'scaling-complexity': [
    "The prototype worked. The first production run had 20% first-pass yield failures. The design was identical. Here's why.",
    "45–65% more defect events per board in the first three production runs. This is not an assembly quality problem — it's a DFM problem.",
    "8–16 weeks to stabilize yield without a formal NPI process. In competitive hardware markets, that window determines market timing.",
  ],
  'cost-leakage': [
    "8–18% above budgeted production cost as the average hidden overrun. It's not a single cost event — it's accumulated leakage from decisions that each seemed minor.",
    "$80,000 in untracked BOM substitution cost on one program. The substitution was approved. The cost burden that followed wasn't tracked.",
    "20–35% of field failures are shipping escapes that passed inspection. The test coverage decision made during program setup determines that rate.",
  ],
  'poor-manufacturing-decisions': [
    "A PCB design that bypasses DFM review doesn't cost less. It costs 22–40% more to produce. Here's exactly how.",
    "2.5x more mid-program quality events when EMS selection is based on price. Here's what the first quality event reveals.",
    "The wrong via type adds $18 per board in avoidable fabrication cost. On 5,000 units, that's $90,000 determined in a CAD tool.",
  ],
}

const OPENING_LINES: Record<string, string[]> = {
  'manufacturing-bottlenecks': [
    "When a PCB program runs behind schedule, the engineering manager starts looking for the bottleneck. By the time it's found, the downstream cost is already running.",
    "Electronics manufacturing bottlenecks are almost never random. They're the predictable output of program structures that create unmanaged handoff risk.",
    "The bottleneck in your electronics program was determined when you structured the vendor relationships — not when production started.",
  ],
  'supplier-inconsistency': [
    "Component supplier inconsistency is the most common unplanned production event in electronics manufacturing — and the least planned for.",
    "The substitution event doesn't happen at order placement. It happens at kitting — when the approved component isn't there and production is already scheduled.",
    "Supplier inconsistency in electronics is a structural problem. It's created by the sourcing strategy — not by individual supplier failures.",
  ],
  'qa-failures': [
    "QA failures in electronics have two cost curves — the in-process cost and the field cost. Most programs only measure one.",
    "The most expensive QA failure is always the one discovered after delivery — not because the fix is more complex, but because everything downstream is already committed.",
    "Inspection architecture determines field return rate. Not inspection frequency — architecture. Where inspection happens relative to the process determines what it catches.",
  ],
  'production-delays': [
    "PCB production delays don't stay in the fabrication shop. They travel downstream and multiply through every team waiting on boards.",
    "When PCB delivery slips, the engineering manager's problem has a daily price tag — and it isn't the EMS partner paying it.",
    "An 18–30% timeline extension from PCB delays is an average. In hardware program terms, it's the benchmark your schedule should be built around.",
  ],
  'component-shortages': [
    "Component shortages are predictable for parts on long lead time or in high demand. The programs that avoid them built their resilience at the design stage.",
    "The most expensive shortage event is not the spot market premium. It's the design respin — six to fourteen weeks, new validation, a market window that may be gone.",
    "Component risk strategy is a design-phase decision. By the time production is scheduled, the decisions that determine shortage exposure are already made.",
  ],
  'compliance-risk': [
    "Compliance in regulated electronics manufacturing is not a checklist. It's the mechanism that determines whether a product can legally ship — and whether the company that built it faces liability.",
    "The compliance gap in an EMS program is almost never discovered during an audit. It's discovered during a program failure — a hold, a violation, or a customer dispute.",
    "Traceability documentation is the foundation of compliance in electronics manufacturing. Without it, no audit — regulatory or customer-initiated — can be successfully completed.",
  ],
  'scaling-complexity': [
    "Prototype-to-production is the highest-risk transition in electronics manufacturing. Most programs treat it as a procurement event — find an EMS partner, send the BOM, start production.",
    "The defects in the first production run were in the design. They were invisible at the prototype stage because prototype quantities don't stress-test manufacturing variation.",
    "DFM validation converts prototype success into production success. Without it, the first production run performs the DFM test — at full production cost per failure.",
  ],
  'cost-leakage': [
    "Cost leakage in electronics manufacturing is not a single budget line. It accumulates through component substitutions, rework cycles, untested escapes, and schedule extensions.",
    "The program cost that surprises finance at close-out was visible in real time — in substitution approvals, rework reports, and test coverage decisions that were each made independently.",
    "Hidden cost overruns in electronics programs are predictable once you know what to track. Most programs don't build the tracking structure until after the first program closes over budget.",
  ],
  'poor-manufacturing-decisions': [
    "The most consequential manufacturing decision in an electronics program is made before manufacturing starts — in the design phase, in the DFM review, or in the absence of one.",
    "EMS partner selection is a manufacturing decision. Treating it as a procurement decision — optimizing for bid price — produces the wrong outcome for the wrong reasons.",
    "A PCB design reviewed against DFM criteria before layout completion is a different product from one that isn't. The production cost reflects which process was followed.",
  ],
}

const SCRIPT_OUTLINES: Record<string, string[]> = {
  'manufacturing-bottlenecks': [
    `PROBLEM (0:00–0:20): Show the scenario — a hardware program behind schedule, engineering manager tracking status, firmware team idle waiting on boards. Introduce the question: where did the bottleneck actually start?\n\nCOST (0:20–0:40): ${PROBLEM_DATA['manufacturing-bottlenecks'].stat1}. Downstream team idle cost running at $2,000–$4,000/day per team. On a program with two dependent teams, the daily cost of the stoppage is a four-to-five figure number before any recovery action is taken.\n\nMISTAKE (0:40–1:00): ${PROBLEM_DATA['manufacturing-bottlenecks'].stat2}. The structural problem is vendor count and handoff management. Every additional assembly partner adds a communication surface. When any one of them hits a component hold, the others can't receive boards.\n\nFIX (1:00–1:20): ${PROBLEM_DATA['manufacturing-bottlenecks'].stat3}. Single-source EMS eliminates inter-vendor handoff failures. One assembly partner, one schedule, one point of accountability for component readiness and production timing.\n\nTAKEAWAY (1:20–1:30): The bottleneck is not a manufacturing quality problem. It's a program structure problem. Structure the program to prevent it — don't manage it after it starts.`,
    `PROBLEM (0:00–0:20): Two programs. Same design complexity. One delivers boards on time. One is five days late every run. The only difference: vendor structure. Here's what happened in the delayed program.\n\nCOST (0:20–0:45): ${PROBLEM_DATA['manufacturing-bottlenecks'].stat2}. At three assembly partners, every inter-vendor handoff is a risk surface. When a component kitting issue delays one partner, boards can't flow to the next stage.\n\nMISTAKE (0:45–1:05): ${PROBLEM_DATA['manufacturing-bottlenecks'].stat3}. The cascade is the structural outcome of disconnected assembly timelines. Nobody missed their individual deliverable badly. The inter-dependencies created the delay.\n\nFIX (1:05–1:20): ${PROBLEM_DATA['manufacturing-bottlenecks'].stat1}. Reducing vendor count is the structural fix. One EMS partner managing all stages means one timeline, one accountability point, one bottleneck surface instead of three.\n\nTAKEAWAY (1:20–1:30): Program structure determines bottleneck risk before a single board is built. Design the structure with that in mind.`,
    `PROBLEM (0:00–0:15): The engineering manager got the call. SMT line hold — component kitting issue. Boards needed in three days for system integration. Firmware team already mobilized.\n\nCOST (0:15–0:35): $2,000–$4,000/day per idle engineering team. Two teams waiting. That's $4,000–$8,000/day in idle cost beginning the day of the call. ${PROBLEM_DATA['manufacturing-bottlenecks'].stat1}.\n\nMISTAKE (0:35–0:55): The kitting issue was visible two days before production was scheduled — the component count didn't reconcile with the BOM. With three vendors, nobody owned the verification step.\n\nFIX (0:55–1:15): ${PROBLEM_DATA['manufacturing-bottlenecks'].stat2}. Single-source EMS means one shop owns the kitting verification — and one point of contact is responsible for surfacing the issue before it becomes a downstream cost.\n\nTAKEAWAY (1:15–1:30): The downstream cost of an EMS bottleneck always exceeds the production floor cost. The way to control it is upstream — in vendor structure and pre-production verification, not in crisis response.`,
  ],
  'supplier-inconsistency': [
    `PROBLEM (0:00–0:20): The component arrived at kitting. It passed visual inspection. It went into production. First-article inspection failed — the part was a non-approved substitute from a tier-2 distributor.\n\nCOST (0:20–0:40): ${PROBLEM_DATA['supplier-inconsistency'].stat3}. 28–42% of first-article failures trace here. A production hold while an approved replacement is located. Expedite fees. Schedule recovery cost. And the boards built with the substitute part are now in question.\n\nMISTAKE (0:40–1:00): ${PROBLEM_DATA['supplier-inconsistency'].stat2}. At four distributors, the substitution event probability is 3x higher. Each one is a component that may arrive with a different date code, a different manufacturer lot, or a different specification than the approved part.\n\nFIX (1:00–1:20): ${PROBLEM_DATA['supplier-inconsistency'].stat1}. Consolidating to a single authorized distributor with documented approval status verification at receiving. Pre-qualified alternates ready to activate when the primary goes on allocation.\n\nTAKEAWAY (1:20–1:30): Supplier inconsistency is a sourcing strategy problem. The fix is built into the supply chain before production starts — not managed after the kitting failure.`,
    `PROBLEM (0:00–0:25): Allocation event. Primary supplier of a key microcontroller goes to 26-week lead time. No approved alternate. Production scheduled in eight weeks.\n\nCOST (0:25–0:50): ${PROBLEM_DATA['component-shortages'].stat3}. Spot market sourcing at 200–400% cost premium — or a design respin to an alternate MCU with a full requalification cycle. ${PROBLEM_DATA['supplier-inconsistency'].stat1}. The production hold is the immediate cost. The respin schedule impact is the larger one.\n\nMISTAKE (0:50–1:10): ${PROBLEM_DATA['supplier-inconsistency'].stat2}. The program had four distributors for other components — but this one was single-sourced with no alternate strategy. The allocation event was visible on lead time trackers six weeks before the production schedule was committed.\n\nFIX (1:10–1:25): Pre-qualify alternates for every long-lead or single-source component before production is scheduled. Define the approved alternate in the BOM — not as a contingency, as a standard part of the design package.\n\nTAKEAWAY (1:25–1:30): The supply chain strategy is a design decision. By production, the exposure is already determined.`,
    `PROBLEM (0:00–0:20): Three distributors for the same passive component family. One ships a different manufacturer lot with a different ESR profile. The boards fail burn-in. Root cause takes four days to identify.\n\nCOST (0:20–0:40): ${PROBLEM_DATA['supplier-inconsistency'].stat3}. 28–42% of first-article failures from supplier inconsistency. The burn-in failure wasn't a design failure or an assembly failure — it was a supply chain failure that looked like both until the lot trace was complete.\n\nMISTAKE (0:40–1:00): ${PROBLEM_DATA['supplier-inconsistency'].stat2}. Using multiple distributors for the same component creates incoming inspection complexity that most programs don't have the process to manage. Approved manufacturer list compliance requires verification at every receiving event.\n\nFIX (1:00–1:20): Authorized distributor with full lot traceability. Incoming inspection tied to the approved manufacturer list, not just the part number. Every component received against a purchase order that specifies the approved manufacturer and lot requirements.\n\nTAKEAWAY (1:20–1:30): Supplier inconsistency is invisible until it fails. The traceability system is what makes it visible — and what prevents it from failing silently into production.`,
  ],
  'qa-failures': [
    `PROBLEM (0:00–0:20): The board passed visual inspection. Passed end-of-line test. Shipped. Returned six weeks later with a BGA solder joint failure. Root cause: voiding under a BGA package — invisible without X-ray, undetectable in functional test until thermal stress was applied.\n\nCOST (0:20–0:40): ${PROBLEM_DATA['qa-failures'].stat1}. 6–10x higher cost post-assembly. The return processing, root cause investigation, and yield hold on all units shipped before the failure was identified — not just the repair cost. ${PROBLEM_DATA['qa-failures'].stat2}.\n\nMISTAKE (0:40–1:00): No X-ray inspection on BGA packages. The defect was in every board built to that reflow profile. The inspection program was sized for visual defects — not for the package types in production.\n\nFIX (1:00–1:20): ${PROBLEM_DATA['qa-failures'].stat3}. IPC acceptance criteria defined for every package type before production. X-ray inspection on all BGA and QFN packages. AOI after placement and after reflow. SPI before reflow. The inspection architecture catches each defect mode at the stage where it's cheapest to correct.\n\nTAKEAWAY (1:20–1:30): The inspection program is not a quality expense. It's a cost control mechanism. The ROI is the ratio of in-process correction cost to field return cost — which is 6–10x in electronics manufacturing.`,
    `PROBLEM (0:00–0:25): First-article inspection. Three boards rejected. Root cause: solder paste volume insufficient on fine-pitch components — a defect introduced at the paste printing stage, compounded through placement and reflow, and not detectable until final visual inspection.\n\nCOST (0:25–0:50): ${PROBLEM_DATA['qa-failures'].stat1}. Every defect that compounds through multiple process stages is more expensive to correct than one caught at origin. The fine-pitch solder defect caught at SPI costs a paste adjustment and a reprint. Caught at final inspection, it costs a BGA rework or scrap.\n\nMISTAKE (0:50–1:10): No SPI (solder paste inspection) after printing. The printing step introduced the defect. Every subsequent process stage added value to a board that was already going to fail — and increased the cost of the correction.\n\nFIX (1:10–1:25): ${PROBLEM_DATA['qa-failures'].stat3}. IPC criteria for solder paste volume defined before production. SPI after every print cycle. AOI after placement. X-ray after reflow for all BGAs. The inspection catches each defect mode at the stage where correction is still inexpensive.\n\nTAKEAWAY (1:25–1:30): In-process inspection architecture is not about catching more defects. It's about catching them earlier — where the correction cost is lowest and the board value is smallest.`,
    `PROBLEM (0:00–0:20): A high-volume electronics program. Field return rate: 3.2% over 18 months. Industry average for similar products: 1.1%. Root cause investigation reveals 28% of returns are tombstoning defects on 0402 passives — visible in AOI but not in the end-of-line functional test.\n\nCOST (0:20–0:40): ${PROBLEM_DATA['qa-failures'].stat2}. 15–25% higher field returns without formal AOI. At 3.2% versus 1.1%, that's a 2.9x higher field return rate. On 50,000 units shipped, the gap is 1,050 additional field returns — each requiring RMA processing, root cause logging, and replacement unit shipping.\n\nMISTAKE (0:40–1:00): AOI was not in the inspection plan. The EMS partner ran visual spot checks and functional end-of-line test. The tombstoning defect mode — which causes delayed failure under vibration — passed both.\n\nFIX (1:00–1:20): AOI after placement and reflow for every production run. AOI catches tombstoning, bridging, missing components, and polarity reversals — all of which pass functional test because the failure mode is environmental or stress-driven, not immediately electrical.\n\nTAKEAWAY (1:20–1:30): Functional test does not replace AOI. It tests one dimension of quality — electrical function. AOI tests a different dimension — assembly integrity. Both are required.`,
  ],
  'production-delays': [
    `PROBLEM (0:00–0:20): PCB delivery was scheduled for week four. Firmware integration team mobilized. System test lab reserved. Week four: boards not shipped — BOM issue identified during kitting, unresolved design question on a net assignment.\n\nCOST (0:20–0:40): ${PROBLEM_DATA['production-delays'].stat2}. Two teams idle at $2,500/day each. Five days of delay: $25,000 in downstream idle cost — from a manufacturing readiness gap that was visible before the job was released. ${PROBLEM_DATA['production-delays'].stat1}.\n\nMISTAKE (0:40–1:00): ${PROBLEM_DATA['production-delays'].stat3}. 71% of hardware overruns trace to PCB manufacturing delays. The BOM issue was in the design package when it was released. A manufacturing readiness review before release would have identified it.\n\nFIX (1:00–1:20): Manufacturing readiness review before release: BOM completeness, Gerber file verification, net list reconciliation, component lead time confirmation. One structured review before release prevents the class of delays that originate in incomplete documentation.\n\nTAKEAWAY (1:20–1:30): PCB delivery delays are usually documentation delays. The manufacturing readiness review is the process that catches them before they become schedule events.`,
    `PROBLEM (0:00–0:25): A hardware startup. Prototype validated. Production order placed. Lead time quoted: six weeks. Week eight: boards not delivered — fabrication hold for controlled impedance question on a high-speed signal layer.\n\nCOST (0:25–0:45): ${PROBLEM_DATA['production-delays'].stat2}. Engineering team carrying overhead costs with nothing to integrate. ${PROBLEM_DATA['production-delays'].stat1}. An 18–30% timeline extension on a six-week lead time is 11–18 additional days — in a market where the competition is shipping.\n\nMISTAKE (0:45–1:05): ${PROBLEM_DATA['production-delays'].stat3}. The controlled impedance requirement was in the design but not explicitly called out in the fabrication notes. The fabricator flagged it at production — not at DFM review, because no DFM review was completed before release.\n\nFIX (1:05–1:20): Explicit fabrication notes covering controlled impedance, surface finish, soldermask, and stackup requirements. A DFM review with the fabricator before release that surfaces specification ambiguities before production starts.\n\nTAKEAWAY (1:20–1:30): The delay didn't start at fabrication. It started at the point where a specification was incomplete. The DFM review is the process that catches it.`,
    `PROBLEM (0:00–0:20): 71% of hardware launch overruns trace to PCB manufacturing delays. Not software bugs. Not mechanical fit issues. The board is the critical path — and most program schedules don't price that risk accurately.\n\nCOST (0:20–0:40): ${PROBLEM_DATA['production-delays'].stat2}. $1,500–$4,000 per day per idle downstream team. On a complex program with three dependent teams, a two-week delay is $63,000–$168,000 in downstream cost — before a single schedule revision reaches the customer.\n\nMISTAKE (0:40–1:00): Program timelines are built around optimistic PCB assumptions. ${PROBLEM_DATA['production-delays'].stat1}. A 24% average timeline extension on a 12-week program is 3 additional weeks. In regulated markets, those weeks can determine whether a submission catches the current regulatory cycle.\n\nFIX (1:00–1:20): Build PCB delay risk into the program schedule as a documented assumption. Run a manufacturing readiness review before release. Establish production visibility milestones between order and delivery.\n\nTAKEAWAY (1:20–1:30): You can't control a delay you haven't planned for. The program schedule that accounts for PCB delay risk is the schedule that survives contact with manufacturing reality.`,
  ],
  'component-shortages': [
    `PROBLEM (0:00–0:20): Production scheduled. BOM finalized. Key microcontroller placed on allocation — 26-week lead time from the primary supplier. No approved alternate. Production is in eight weeks.\n\nCOST (0:20–0:40): ${PROBLEM_DATA['component-shortages'].stat3}. Spot market sourcing at 200–400% premium — or a design respin. ${PROBLEM_DATA['component-shortages'].stat1}. 38% of programs requiring design respins due to shortages. The respin adds 6–14 weeks to schedule and requires a full requalification cycle.\n\nMISTAKE (0:40–1:00): ${PROBLEM_DATA['component-shortages'].stat2}. No approved alternate strategy. The allocation event was on the distributor's forecast for three months before the program was scheduled. The program team didn't build a shortage response into the design.\n\nFIX (1:00–1:20): Identify all long-lead and single-source components during schematic capture. Pre-qualify alternates before layout begins. Specify alternates in the BOM. Monitor lead times against production schedule and trigger the alternate before the production date is at risk.\n\nTAKEAWAY (1:20–1:30): Component shortage resilience is a design-phase decision. By the time production is scheduled, the exposure is already determined.`,
    `PROBLEM (0:00–0:25): Two identical programs. Program A has approved alternates pre-qualified for all single-source components. Program B does not. An MLCC shortage hits the market — affecting both programs' primary supplier.\n\nCOST (0:25–0:50): Program A switches to the approved alternate. Production continues. Program B goes on hold while sourcing locates an equivalent part and engineering qualifies it. ${PROBLEM_DATA['component-shortages'].stat2}. 2.8x more production holds for Program B's approach. ${PROBLEM_DATA['component-shortages'].stat3}. If spot market sourcing is needed: 180–400% cost premium per affected component.\n\nMISTAKE (0:50–1:10): ${PROBLEM_DATA['component-shortages'].stat1}. 38% of programs requiring respins due to shortages is the documented outcome of not building alternate strategies into the design phase. The difference between the two programs was made at the schematic stage.\n\nFIX (1:10–1:25): Approved alternate component strategy as a standard BOM column — not a contingency document. Every component with more than a 10-week lead time or a single-source supply relationship should have a qualified alternate before production is scheduled.\n\nTAKEAWAY (1:25–1:30): The program that planned for shortages doesn't experience production holds. The program that didn't pays 300% more for the same component — or respins the design.`,
    `PROBLEM (0:00–0:20): The component was on the EOL notice from the manufacturer for eight months. The program team received the notice. No action was taken. Design respin required six weeks before scheduled production.\n\nCOST (0:20–0:40): ${PROBLEM_DATA['component-shortages'].stat1}. A 10-week respin for an alternate component. New PCB layout. New schematic review. New regulatory test cycle for a medical device. The market window the program was scheduled to hit: gone. ${PROBLEM_DATA['component-shortages'].stat3}.\n\nMISTAKE (0:40–1:00): EOL monitoring without an action trigger. Receiving the notice without pre-qualifying an alternate is not a shortage strategy — it's awareness without response. The eight months between the notice and the respin were months where an alternate could have been designed in without affecting the schedule.\n\nFIX (1:00–1:20): EOL monitoring tied to an action trigger: when an EOL notice is received, a 30-day window opens to evaluate and pre-qualify the alternate. If the primary is still available for the scheduled production run but an alternate is not yet qualified, the alternate qualification starts immediately.\n\nTAKEAWAY (1:20–1:30): EOL monitoring is only valuable if it connects to an action process. The notice is the input. The pre-qualification is the response. Without the response, the notice is just early warning of a respin.`,
  ],
  'rework-scrap-cost': [
    `PROBLEM (0:00–0:20): Final inspection. Eight boards rejected — BGA solder joint quality insufficient. BGA rework required. Delivery in four days.\n\nCOST (0:20–0:40): ${PROBLEM_DATA['rework-scrap-cost'].stat2}. 3–6 hours per board, eight boards: 24–48 hours of technician time. Each rework event risks pad lift and via damage. Two of the eight boards are scrapped after rework — the pads lifted. ${PROBLEM_DATA['rework-scrap-cost'].stat1}. 4–11% of production cost for the program.\n\nMISTAKE (0:40–1:00): No X-ray inspection after reflow. The BGA solder joint quality was unknown until final visual inspection. By then, all value had been added to boards that were going to fail inspection — and the cost of correction was maximum.\n\nFIX (1:00–1:20): ${PROBLEM_DATA['rework-scrap-cost'].stat3}. Scrap rates of 1–3% in disciplined programs come from staged inspection: SPI before reflow, AOI after placement, X-ray after reflow. Each stage catches the defect while the correction cost is lowest.\n\nTAKEAWAY (1:20–1:30): BGA rework is not a production tool. It's a recovery action. The inspection program is what prevents it from being necessary.`,
    `PROBLEM (0:00–0:25): Two EMS programs for the same product. Program A: staged inspection — SPI, AOI, X-ray. Program B: end-of-line functional test only. Same design. Same assembly complexity.\n\nCOST (0:25–0:50): ${PROBLEM_DATA['rework-scrap-cost'].stat3}. Program B runs 11% scrap. Program A runs 2%. On a $400,000 production run, 9% scrap differential is $36,000 in direct cost. Plus the downstream schedule impact of rework cycles and delivery holds.\n\nMISTAKE (0:50–1:10): Program B's EMS partner quoted less because the inspection infrastructure wasn't in the scope. The cost of the inspection was real — it was just deferred to rework, scrap, and field returns.\n\nFIX (1:10–1:25): ${PROBLEM_DATA['rework-scrap-cost'].stat1}. The 4–11% rework cost in programs without robust inspection is the deferred cost of the inspection that wasn't purchased. It's not cheaper — it's later and larger.\n\nTAKEAWAY (1:25–1:30): In-process inspection is not an upgrade to an EMS program. It's the cost structure that determines whether rework or scrap absorbs the defect — and which one is cheaper.`,
    `PROBLEM (0:00–0:20): A production program at 94% first-pass yield. Sounds acceptable. The 6% failure rate means 300 boards per 5,000-unit run going to rework or scrap. Each rework event: 2–6 hours. Each scrap event: full board cost.\n\nCOST (0:20–0:40): ${PROBLEM_DATA['rework-scrap-cost'].stat2}. 300 boards. At 4 hours average per rework event: 1,200 technician hours per production run. At fully-burdened technician cost: $48,000–$84,000 in rework labor per run. Plus the boards that can't be recovered: scrapped at full build cost. ${PROBLEM_DATA['rework-scrap-cost'].stat1}.\n\nMISTAKE (0:40–1:00): 94% first-pass yield is tracked as a quality metric. It should be tracked as a production cost metric. The rework labor cost and scrap material cost are embedded in the program — they just aren't visible on the production floor report.\n\nFIX (1:00–1:20): Track first-pass yield as a financial metric with direct cost translation. Set yield targets that correspond to production cost targets. Invest in the in-process inspection that moves the yield number — because each percentage point improvement has a calculable dollar value.\n\nTAKEAWAY (1:20–1:30): First-pass yield is a cost metric wearing a quality label. When you treat it as a cost metric, the investment in inspection infrastructure makes financial sense.`,
  ],
  'compliance-risk': [
    `PROBLEM (0:00–0:20): Defense electronics program. EMS partner selected on price and delivery. ITAR registration not verified. Board contains controlled technology. Shipment flagged at export.\n\nCOST (0:20–0:40): ${PROBLEM_DATA['compliance-risk'].stat3}. $250,000 minimum ITAR penalty. Program suspension while violation is investigated. ${PROBLEM_DATA['compliance-risk'].stat1}. 4–8 week hold to resolve. On a program with a government delivery milestone, the hold is a contract performance failure — not just a compliance issue.\n\nMISTAKE (0:40–1:00): ${PROBLEM_DATA['compliance-risk'].stat2}. The EMS partner was not ITAR-registered. The OEM assumed registration based on the partner's defense customer references — without verification. Assumption is not compliance.\n\nFIX (1:00–1:20): ITAR registration verification as a mandatory criterion in EMS partner selection for any program with defense, dual-use, or export-controlled technology. ISO 9001 and AS9100 certification verification for aerospace programs. ISO 13485 for medical. Compliance is a screening criterion — not an assumption.\n\nTAKEAWAY (1:20–1:30): The EMS partner's compliance status is your compliance exposure. Verify it before production — not after shipment.`,
    `PROBLEM (0:00–0:25): Medical device program. FDA inspection. Auditor requests traceability documentation for a specific production lot — component lot numbers, process traveler, inspection records, operator signatures.\n\nCOST (0:25–0:45): ${PROBLEM_DATA['compliance-risk'].stat2}. 3x higher audit failure rate without traceability documentation. The documentation wasn't missing because of negligence — the EMS partner's documentation system wasn't designed for the traceability requirements of a Class II medical device. ${PROBLEM_DATA['compliance-risk'].stat1}.\n\nMISTAKE (0:45–1:05): Traceability requirements were not specified in the EMS partner contract. The partner built to the design. The design was correct. The manufacturing documentation was not structured to support a regulatory inspection.\n\nFIX (1:05–1:20): Traceability requirements specified in the EMS partner contract: component lot traceability, process traveler with operator and inspection sign-offs, AOI and X-ray records retained per device history record requirements, and a defined retention period aligned with FDA requirements.\n\nTAKEAWAY (1:25–1:30): Traceability documentation is the foundation of medical device compliance in manufacturing. It's specified before production — not requested during an audit.`,
    `PROBLEM (0:00–0:20): The compliance gap was discovered during a customer audit — not a regulatory inspection. The customer found that IPC class 3 requirements were specified in the contract but IPC class 2 acceptance criteria were being used in production.\n\nCOST (0:20–0:40): ${PROBLEM_DATA['compliance-risk'].stat1}. 4–8 week hold while the production process was verified and a corrective action plan submitted. All units shipped under the incorrect criteria placed on potential field hold. ${PROBLEM_DATA['compliance-risk'].stat3}. For a defense program, the hold is a deliverable miss — which triggers contract review.\n\nMISTAKE (0:40–1:00): IPC class requirements were stated in the contract but not verified in the EMS partner's in-process inspection documentation. The gap between the contract requirement and the production practice was invisible until the customer audit.\n\nFIX (1:00–1:20): Pre-production compliance review: verify that the EMS partner's documented inspection criteria match the contracted IPC class. Review the inspection records from comparable previous programs. Require written sign-off from the EMS quality team that the correct criteria are loaded into each inspection station.\n\nTAKEAWAY (1:20–1:30): The pre-production compliance review costs hours. The compliance hold it prevents costs weeks. The math makes the review straightforward.`,
  ],
  'scaling-complexity': [
    `PROBLEM (0:00–0:20): Prototype: 20 units, bench-built, 100% functional. First production run: 500 units, SMT line, 22% first-pass yield failure. Same design. Same components. Different process.\n\nCOST (0:20–0:40): ${PROBLEM_DATA['scaling-complexity'].stat1}. 45–65% more defect events per board in the first three production runs. On a $50 per-board build cost and 500 units with 22% failure: 110 boards requiring rework or scrap. At $45 average rework cost: $4,950 direct. Plus the 8-week schedule extension to stabilize yield. ${PROBLEM_DATA['scaling-complexity'].stat2}.\n\nMISTAKE (0:40–1:00): The design was validated for function — not for manufacturing. Component clearances that worked at bench were too tight for SMT placement tolerances. A via-in-pad feature that worked hand-soldered cracked under thermal cycling in reflow.\n\nFIX (1:00–1:20): ${PROBLEM_DATA['scaling-complexity'].stat3}. DFM review before layout completion. The DFM review maps the design against the EMS partner's specific process capabilities: minimum clearances, supported footprints, reflow profile constraints, and via requirements. ECOs from the DFM review cost a layout revision. ECOs from the first production run cost a production hold.\n\nTAKEAWAY (1:20–1:30): The DFM review converts functional validation into manufacturing validation. Without it, the first production run performs the manufacturing validation — at production cost per failure.`,
    `PROBLEM (0:00–0:25): A hardware company scaling from 50 to 3,000 units per quarter. First high-volume run: 8% higher per-unit cost than projected. Root cause: three ECOs during production startup — via fill requirements, footprint corrections, and a controlled impedance stack-up adjustment.\n\nCOST (0:25–0:50): ${PROBLEM_DATA['scaling-complexity'].stat3}. 12–28% per-unit cost increase from ECOs during scaling. On 3,000 units at $35 per board, a 20% cost increase is $21,000 above the production estimate — from design changes that a pre-production DFM review would have identified before the first board was ordered.\n\nMISTAKE (0:50–1:10): No formal NPI process. The design went from prototype to production without a structured DFM review, a first-article inspection plan, or a yield target before full production release. Each ECO was a design element that the EMS partner's process required but that wasn't in the design files.\n\nFIX (1:10–1:25): ${PROBLEM_DATA['scaling-complexity'].stat2}. 8–16 weeks to stabilize yield without NPI — avoidable with a structured NPI process that includes: DFM review, first-article inspection with defined pass criteria, process capability confirmation, and a yield target gate before full production release.\n\nTAKEAWAY (1:25–1:30): NPI is not overhead. It's the process that converts prototype success into production success — and eliminates the ECO cost that accumulates when production discovers what DFM would have caught.`,
    `PROBLEM (0:00–0:20): Two hardware programs scaling to 5,000 units. Program A used a formal NPI process including DFM review and first-article inspection. Program B went directly to production from prototype.\n\nCOST (0:20–0:40): ${PROBLEM_DATA['scaling-complexity'].stat1}. Program B: 58% more defect events per board in the first three runs. Yield stabilization: 11 weeks. ${PROBLEM_DATA['scaling-complexity'].stat2}. Program A: yield target met in the first production run. No ECOs. Production cost matched estimate.\n\nMISTAKE (0:40–1:00): ${PROBLEM_DATA['scaling-complexity'].stat3}. Program B's ECO rate added 17% per-unit cost above estimate. The ECOs were predictable — they were the design elements the DFM review would have surfaced. Without the review, they surfaced in production.\n\nFIX (1:00–1:20): The NPI process is not a timeline cost — it's a cost recovery mechanism. A 4-week DFM and first-article cycle saves 11 weeks of yield instability and 17% per-unit cost. The math is straightforward when you account for both sides.\n\nTAKEAWAY (1:20–1:30): The programs that skip NPI don't save the NPI time. They trade it for more time, more cost, and worse outcomes in production.`,
  ],
  'cost-leakage': [
    `PROBLEM (0:00–0:20): Program budget: $600,000. Final production cost: $689,000. No single catastrophic event. A series of small, approved decisions — each reasonable individually — that accumulated into $89,000 of unbudgeted cost.\n\nCOST (0:20–0:40): ${PROBLEM_DATA['cost-leakage'].stat1}. 8–18% above budget as the documented average. On a $600,000 program, 15% leakage is $90,000. ${PROBLEM_DATA['cost-leakage'].stat2}. BOM substitution qualification testing: $12,000. Additional rework cycles: $18,000. Extended program management: $14,000. Expedite fees: $8,000. Each approved. None budgeted.\n\nMISTAKE (0:40–1:00): ${PROBLEM_DATA['cost-leakage'].stat3}. 20–35% of field failures being shipping escapes means the test program was undersized for the defect modes in production. The test coverage decision was a cost decision — and it transferred cost from the test line to the field.\n\nFIX (1:00–1:20): Cost tracking at the decision level — not the invoice level. Every BOM substitution approval generates a cost tracking event that includes the full burden: qualification, documentation, re-verification. Every test coverage decision is evaluated against the field failure cost of an untested escape.\n\nTAKEAWAY (1:20–1:30): Cost leakage is controllable — but only if it's tracked at the point where it's created, not discovered at program close-out.`,
    `PROBLEM (0:00–0:25): A component substitution was approved to maintain schedule. The substitute part was electrically equivalent. The qualification testing cost $8,000. The updated acceptance criteria documentation cost $3,000. The process re-verification took two weeks of EMS engineer time.\n\nCOST (0:25–0:50): ${PROBLEM_DATA['cost-leakage'].stat2}. $15,000–$80,000 in untracked BOM substitution cost per program. The substitution was approved at the component cost level — a $0.15 savings per unit. The full program cost of the substitution: $11,000+ before the schedule impact of the two-week verification delay.\n\nMISTAKE (0:50–1:10): Substitution approval tracked at the component price delta. Total program cost burden not tracked. The $0.15 savings looked correct at the PO level. The $11,000 cost burden was distributed across program management, quality, and EMS partner charges — invisible in the component cost view.\n\nFIX (1:10–1:25): BOM substitution approval process that requires total cost burden estimate before approval — not just component cost delta. If the total cost burden exceeds the savings over the production run, the substitution should be declined or the schedule impact absorbed to find the original component.\n\nTAKEAWAY (1:25–1:30): The component cost savings and the program cost burden of a substitution are two different numbers. Managing only one of them produces the wrong decision almost every time.`,
    `PROBLEM (0:00–0:20): Post-program cost reconciliation: $78,000 above budget on a $600,000 program. The finance team is looking for a single cause. There isn't one — there are twelve approved decisions that each added $3,000–$12,000 to program cost and were never aggregated against the program budget.\n\nCOST (0:20–0:40): ${PROBLEM_DATA['cost-leakage'].stat1}. 13% average leakage. The leakage is not fraud. It's the gap between how programs are managed (by decision) and how cost is tracked (by invoice). ${PROBLEM_DATA['cost-leakage'].stat3}. 28% of field failures in the program were shipping escapes — and each RMA cost $400 in processing, a replacement unit, and root cause documentation.\n\nMISTAKE (0:40–1:00): No program cost model that connects decisions to cost burden in real time. The budget was set at program start. Every decision after that was evaluated against individual merit — not against the total program cost remaining.\n\nFIX (1:00–1:20): A rolling program cost model updated at every significant decision point — substitution approvals, scope changes, inspection upgrades, schedule recovery actions. Each decision is evaluated against the remaining program budget, not just its individual cost.\n\nTAKEAWAY (1:20–1:30): The program cost overrun is assembled one decision at a time. The program cost model is the tool that makes each decision visible against the total — while there's still time to choose differently.`,
  ],
  'poor-manufacturing-decisions': [
    `PROBLEM (0:00–0:20): PCB design completed. Released to fabrication. First boards arrive. Three ECOs in the first week — via fill requirement not met, controlled impedance layer not specified, minimum annular ring violated on a via-in-pad.\n\nCOST (0:20–0:40): ${PROBLEM_DATA['poor-manufacturing-decisions'].stat3}. $4–$18 per board in avoidable fabrication cost from wrong via type, stack-up, or trace width. On 5,000 boards at $12 average avoidable cost: $60,000 determined by design decisions made without fabrication input. ${PROBLEM_DATA['poor-manufacturing-decisions'].stat1}.\n\nMISTAKE (0:40–1:00): No DFM review with the fabrication partner before layout completion. The via-in-pad feature was designed for electrical performance. The fabrication constraint — via fill required to maintain solderable surface — was not known to the designer. A 30-minute call would have resolved it.\n\nFIX (1:00–1:20): DFM review before layout completion — not after Gerber generation. At layout completion, the design is difficult to change. At schematic or early layout stage, a via type change is a 10-minute correction. The DFM review is most valuable when held earliest.\n\nTAKEAWAY (1:20–1:30): DFM review cost is fixed and small. The production cost of the designs it prevents is variable and large. The ROI is straightforward.`,
    `PROBLEM (0:00–0:25): EMS partner selection. Three quotes. The lowest quote wins — $8 per board less than the next lowest. The partner has no formal AOI program, no documented SPI, and no X-ray capability.\n\nCOST (0:25–0:50): ${PROBLEM_DATA['poor-manufacturing-decisions'].stat2}. 2.5x more quality events with price-based selection. The $8/board savings on 5,000 units is $40,000. The first mid-program quality event — a rework cycle on 200 boards with BGA inspection failures — costs $32,000. The second event costs more.\n\nMISTAKE (0:50–1:10): ${PROBLEM_DATA['poor-manufacturing-decisions'].stat1}. The DFM review that would have identified the inspection capability gap was not completed before selection. The capability gap was in the quote — priced out of the scope. It showed up in the production results.\n\nFIX (1:10–1:25): EMS partner evaluation criteria beyond price: inspection infrastructure (SPI, AOI, X-ray), IPC certification level, documented process capability data, first-pass yield on comparable programs. These criteria filter for the capability that produces the target quality outcome — not just the target unit price.\n\nTAKEAWAY (1:25–1:30): The EMS quote that removes inspection from scope is cheaper at the quote stage and more expensive at the production stage. The evaluation process determines which cost you pay.`,
    `PROBLEM (0:00–0:20): A product that passed all functional validation at prototype. First production run shipped. Six weeks later: 4.1% field return rate. Root cause: solder joint fatigue on a BGA under thermal cycling — a failure mode that doesn't appear in functional test and that a DFM-informed stack-up would have reduced.\n\nCOST (0:20–0:40): ${PROBLEM_DATA['poor-manufacturing-decisions'].stat1}. 22–40% higher production cost from designs that bypass DFM review — and in this case, a field return rate that represents warranty cost, RMA processing, replacement unit cost, and customer confidence. ${PROBLEM_DATA['poor-manufacturing-decisions'].stat2}. The 2.5x quality event rate with price-based EMS selection includes this failure mode.\n\nMISTAKE (0:40–1:00): ${PROBLEM_DATA['poor-manufacturing-decisions'].stat3}. The PCB stack-up was optimized for electrical performance and cost. The solder joint reliability implication of the BGA pad design and PCB flatness requirements were not reviewed against the thermal cycling profile the product would see in the field.\n\nFIX (1:00–1:20): DFM review that includes thermal and mechanical reliability validation: BGA pad geometry against the device's ball pitch and soldermask opening, PCB flatness requirements for the assembly process, and via design for components with high thermal excursion.\n\nTAKEAWAY (1:20–1:30): Functional validation confirms that the design works. DFM review confirms that the design can be manufactured reliably — and that it will keep working after it ships. Both are required.`,
  ],
}

const RETENTION_BEATS: Record<string, string[]> = {
  'manufacturing-bottlenecks': ['Name the bottleneck type at 0:15 to give viewers a concrete scenario to track', 'Introduce the downstream cost number at 0:35 before explaining the cause', 'Reveal the structural fix at 1:05 to give viewers a clear action orientation before the CTA'],
  'supplier-inconsistency': ['Open with the kitting failure scenario — a situation most electronics program managers have experienced', 'Name the 3x substitution event multiplier early to quantify a risk most viewers feel but haven\'t measured', 'Close with the approved alternate strategy as the fix — a specific, actionable supply chain change'],
  'qa-failures': ['Lead with the field return cost multiplier — 6–10x creates immediate attention', 'Use the specific package types (BGA, QFN) to show viewers what\'s invisible without X-ray', 'Close with the inspection architecture as the structural fix — not more inspection, better-timed inspection'],
  'production-delays': ['Open with the delayed delivery scenario — most hardware program managers have lived it', 'Name the 71% stat early — validates the board as the critical path before positioning the solution', 'Close with the manufacturing readiness review as the prevention — a specific, actionable process change'],
  'component-shortages': ['Lead with the allocation event scenario — immediately recognizable for electronics engineers', 'Use the 38% respin stat to quantify the frequency — most viewers don\'t know it\'s that common', 'Close with the pre-qualified alternate strategy — a design-phase decision viewers can act on immediately'],
  'rework-scrap-cost': ['Open with the BGA rework scenario — specific enough to be credible, costly enough to be urgent', 'Use the scrap rate differential (1–3% vs. 6–14%) to make the process discipline gap concrete', 'Close with staged inspection as the fix — specific checkpoints at specific process stages'],
  'compliance-risk': ['Lead with the ITAR penalty — maximum tension, specific number', 'Use the traceability audit scenario to make abstract compliance requirements tangible', 'Close with the pre-production compliance review — a specific action viewers can take before the next program'],
  'scaling-complexity': ['Open with the prototype-to-production yield failure — most hardware teams have experienced it or fear it', 'Name the DFM review as the structural fix early — connect the problem to an accessible solution', 'Close with the NPI process as the overall fix — specific enough to be actionable'],
  'cost-leakage': ['Lead with the program cost overrun reveal — a number that most viewers have encountered without explanation', 'Name the accumulation mechanism: substitutions, rework, test gaps — not a single event', 'Close with the rolling program cost model as the fix — specific enough that viewers can implement it'],
  'poor-manufacturing-decisions': ['Open with the DFM bypass scenario — an engineering decision made without manufacturing input', 'Name the cost premium (22–40%) early — makes the DFM review ROI obvious', 'Close with the EMS evaluation criteria — a specific, actionable change to the partner selection process'],
}

const BUSINESS_INSIGHTS: Record<string, string> = {
  'manufacturing-bottlenecks': `The downstream financial exposure from an EMS bottleneck multiplies by dependent team count. ${PROBLEM_DATA['manufacturing-bottlenecks'].cost1}. ${PROBLEM_DATA['manufacturing-bottlenecks'].cost2}. A program with three dependent engineering teams downstream of a delayed SMT line carries $6,000–$12,000/day in idle cost — from a bottleneck that started in design files or component kitting, not on the assembly floor.`,
  'supplier-inconsistency': `Supply chain inconsistency is a compounding production risk. ${PROBLEM_DATA['supplier-inconsistency'].cost1}. ${PROBLEM_DATA['supplier-inconsistency'].cost2}. A production hold from a non-approved substitute at kitting runs $15,000–$40,000/week in hold cost before expedite fees. At 3x the substitution event rate with 4+ distributors, the annual exposure for a mid-volume EMS program is a six-figure supply chain risk.`,
  'qa-failures': `QA failure cost is determined by discovery stage, not by defect severity. ${PROBLEM_DATA['qa-failures'].cost1}. ${PROBLEM_DATA['qa-failures'].cost2}. A field return event on a Class II medical device triggers RMA processing, root cause investigation, and potential FDA notification — at $500–$2,000 per unit in direct cost plus 10–20x in indirect cost. The in-process inspection investment is the cost control mechanism.`,
  'production-delays': `PCB production delay cost compounds through every dependent downstream phase. ${PROBLEM_DATA['production-delays'].cost1}. ${PROBLEM_DATA['production-delays'].cost2}. On a hardware program with three dependent engineering teams and a two-week PCB delay, total downstream cost reaches $63,000–$168,000 — before a single schedule revision reaches the customer or a single regulatory test window is rescheduled.`,
  'component-shortages': `Component shortage cost is the most variable and least forecasted risk in electronics programs. ${PROBLEM_DATA['component-shortages'].cost1}. ${PROBLEM_DATA['component-shortages'].cost2}. On a 10,000-unit program with three long-lead components at $4 average, a spot market event adds $72,000–$160,000 in unplanned component cost. The design respin alternative adds 6–14 weeks — and may miss the market window the program was built for.`,
  'rework-scrap-cost': `Rework and scrap cost in electronics manufacturing has a calculable program impact. ${PROBLEM_DATA['rework-scrap-cost'].cost1}. ${PROBLEM_DATA['rework-scrap-cost'].cost2}. On a $500,000 production program running 8% rework, $40,000 is absorbed before test cycle cost and schedule extension are included. The staged inspection investment to reduce that rework rate from 8% to 2% typically costs less than one quarter of the rework it eliminates.`,
  'compliance-risk': `Compliance failures in regulated electronics manufacturing are catastrophic in scale. ${PROBLEM_DATA['compliance-risk'].cost1}. ${PROBLEM_DATA['compliance-risk'].cost2}. An ITAR violation triggers a program suspension, an export compliance review, and potential debarment from future government contracts. The $250,000 minimum is the starting point. For programs with active government delivery commitments, the contract consequence is typically much larger.`,
  'scaling-complexity': `NPI gaps create compounding production cost in the first three runs. ${PROBLEM_DATA['scaling-complexity'].cost1}. ${PROBLEM_DATA['scaling-complexity'].cost2}. On a hardware program scaling to 5,000 units at $50 per board, 12 weeks of yield instability represents $300,000 in delayed revenue at a weekly run rate — plus the ECO-driven per-unit cost increases that often run 15–25% above the production estimate.`,
  'cost-leakage': `Cost leakage in electronics programs is accumulated through individually approved decisions. ${PROBLEM_DATA['cost-leakage'].cost1}. ${PROBLEM_DATA['cost-leakage'].cost2}. On a $600,000 production program, 13% average leakage is $78,000 distributed across substitution qualification costs, rework cycles, expedite fees, and shipping-escape field failures — each one approved, none aggregated against the program budget in real time.`,
  'poor-manufacturing-decisions': `Design-stage manufacturing decisions determine production cost before a board is ordered. ${PROBLEM_DATA['poor-manufacturing-decisions'].cost1}. ${PROBLEM_DATA['poor-manufacturing-decisions'].cost2}. On a 5,000-unit program at $45 per-board build cost, a 30% DFM-driven production cost premium is $67,500 — determined before the first Gerber was submitted, in a CAD tool, by design decisions that a structured DFM review with the EMS partner would have changed.`,
}

const VIDEO_CTAS: Record<string, string[]> = {
  'manufacturing-bottlenecks': [
    'If your current EMS program uses two or more assembly partners, the handoff risk audit is worth doing before your next production run. Link in description.',
    'Comment with your current assembly vendor count and product complexity. I\'ll tell you the bottleneck risk profile for your specific structure.',
    'Subscribe for weekly content on electronics manufacturing cost control for engineering managers and operations directors.',
  ],
  'supplier-inconsistency': [
    'If you\'ve experienced a production hold from a supplier inconsistency event in the last two programs, comment — I\'ll share the supply chain resilience framework we use.',
    'Subscribe for weekly electronics manufacturing management content that goes beyond the component price sheet.',
    'The approved alternate qualification process mentioned in this video — link in description. Takes one design review meeting to implement before your next BOM is finalized.',
  ],
  'qa-failures': [
    'Comment \'INSPECTION\' and I\'ll share the in-process inspection architecture checklist for electronics assembly programs.',
    'If you\'re evaluating an EMS partner, ask for their first-pass yield data on comparable programs and their inspection infrastructure documentation.',
    'Subscribe for more electronics manufacturing quality content — new video every week.',
  ],
  'production-delays': [
    'The manufacturing readiness review checklist is in the description — a structured process to complete before releasing any PCB job to fabrication.',
    'Comment with your current average PCB delay rate versus quoted lead time. Most program managers have never calculated it across a program set.',
    'Subscribe for weekly content on hardware program management and electronics manufacturing.',
  ],
  'component-shortages': [
    'Before your next BOM is finalized, download the component risk evaluation framework in the description.',
    'Comment with the component category that creates the most production risk in your programs. I\'ll share the approved alternate qualification process for that category.',
    'Subscribe for weekly electronics manufacturing content — practical, no filler.',
  ],
  'rework-scrap-cost': [
    'The in-process inspection ROI calculator is in the description — model the rework cost reduction against the inspection infrastructure investment for your program.',
    'Comment with your current first-pass yield rate on your most complex PCB. I\'ll tell you what inspection stages are most likely to improve it.',
    'Subscribe for more electronics manufacturing cost control content.',
  ],
  'compliance-risk': [
    'Ask your EMS partner for their ITAR registration documentation and ISO certification scope before your next program starts. Verification takes 15 minutes.',
    'Comment with your product\'s market segment. I\'ll outline the compliance requirements that apply and what to verify in your EMS partner before production.',
    'Subscribe for weekly electronics manufacturing compliance and quality content.',
  ],
  'scaling-complexity': [
    'The DFM review checklist for electronics programs is in the description — a structured list of what to verify with your EMS partner before layout completion.',
    'Comment with your current prototype-to-production yield performance. I\'ll identify the DFM gaps most likely driving the delta.',
    'Subscribe for weekly content on hardware scaling and electronics manufacturing.',
  ],
  'cost-leakage': [
    'The program cost tracking model is in the description — a framework for capturing cost burden at the decision point, not at program close-out.',
    'Comment with your average production cost variance on closed programs. Most teams have never calculated it — the number usually changes how the next program is managed.',
    'Subscribe for weekly electronics manufacturing cost control content.',
  ],
  'poor-manufacturing-decisions': [
    'Ask your EMS partner to run a DFM review on your next PCB design before layout is complete. If they don\'t offer this, find a partner who does.',
    'Comment with your PCB complexity level — layer count, minimum trace width, package types. I\'ll outline the DFM criteria most relevant to your design.',
    'Subscribe for more electronics manufacturing decision-making content.',
  ],
}

const REPURPOSING_SUGGESTIONS: Record<string, string[]> = {
  'manufacturing-bottlenecks': ['Break the script into a 6-tweet thread on the cascade effect of multi-vendor EMS programs', 'Turn the fix section into a LinkedIn carousel: "5 questions to ask before structuring an EMS program"', 'Use the 3-second hook as an Instagram Reel opening with B-roll of an active SMT line or AOI station'],
  'supplier-inconsistency': ['Convert to a LinkedIn post using just the substitution event cost stat and the 3x multiplier', 'Turn into an Instagram carousel: "The 4 questions to ask about your component supply chain before production"', 'Break the retention beats into a Twitter thread framing each as a question engineering managers should ask'],
  'qa-failures': ['Pull the 6–10x cost multiplier into a standalone LinkedIn post — most readers haven\'t quantified this', 'Turn into a Facebook educational post with a practical inspection architecture checklist', 'Use the field return rate stat as a standalone Twitter/X post for electronics program managers'],
  'production-delays': ['Convert the manufacturing readiness gap scenario into a LinkedIn post hook', 'Turn into an Instagram carousel: "What a manufacturing readiness review actually covers"', 'Break into a Twitter thread framing PCB delivery reliability as a vendor selection criterion'],
  'component-shortages': ['Turn the 38% respin stat into a standalone LinkedIn post for hardware program managers', 'Use the spot market cost premium as a Facebook educational post with a practical alternate qualification takeaway', 'Convert the approved alternate strategy into a Twitter thread for procurement and engineering leads'],
  'rework-scrap-cost': ['Pull the scrap rate differential into a standalone LinkedIn post for operations directors', 'Turn the inspection stage comparison into a Facebook educational post', 'Use the BGA rework risk scenario as an Instagram Reel hook'],
  'compliance-risk': ['Turn the ITAR penalty stat into a LinkedIn post for engineering managers in defense and dual-use programs', 'Convert the traceability audit scenario into a Facebook discussion prompt', 'Use the compliance verification criteria as an Instagram carousel'],
  'scaling-complexity': ['Pull the 45–65% defect rate increase into a LinkedIn post for hardware teams approaching production scaling', 'Turn the NPI process description into a Facebook educational post with a practical checklist takeaway', 'Use the prototype-to-production gap scenario as an Instagram Reel hook'],
  'cost-leakage': ['Convert the cost leakage accumulation scenario into a LinkedIn post for engineering program managers', 'Turn the program cost tracking model into a Twitter thread on what to measure during a production program', 'Use the substitution cost burden calculation as an Instagram carousel for procurement and engineering leads'],
  'poor-manufacturing-decisions': ['Pull the DFM review cost premium stat into a LinkedIn post for PCB design engineers', 'Turn the EMS selection criteria into a Facebook educational post with a practical evaluation checklist', 'Use the via type cost impact scenario as an Instagram carousel for hardware engineers'],
}

export function generateYouTube(inputs: YouTubeInputs, seed: number = 0): YouTubeOutput {
  const v = seed % 3
  const p = inputs.problem
  const fmt = inputs.videoFormat

  const titleSet = TITLES[p] ?? TITLES['manufacturing-bottlenecks']
  const titleIdx = fmt === 'shorts' ? 0 : fmt === '60-90s' ? 1 : 2
  const titles = titleSet[titleIdx] ?? titleSet[0]
  const title = titles[v % titles.length] ?? titles[0]

  const thumbnailRaw = THUMBNAIL_TEXTS[p] ?? THUMBNAIL_TEXTS['manufacturing-bottlenecks']
  const thumbnailParts = thumbnailRaw.split('|')
  const thumbnailText = thumbnailParts[v % thumbnailParts.length] ?? thumbnailParts[0]

  const hooksArr = THREE_SECOND_HOOKS[p] ?? THREE_SECOND_HOOKS['manufacturing-bottlenecks']
  const threeSecondHook = hooksArr[v] ?? hooksArr[0]

  const openingArr = OPENING_LINES[p] ?? OPENING_LINES['manufacturing-bottlenecks']
  const openingLine = openingArr[v] ?? openingArr[0]

  const scriptArr = SCRIPT_OUTLINES[p] ?? SCRIPT_OUTLINES['manufacturing-bottlenecks']
  const scriptOrOutline = scriptArr[v] ?? scriptArr[0]

  const beatsArr = RETENTION_BEATS[p] ?? RETENTION_BEATS['manufacturing-bottlenecks']
  const retentionBeats = beatsArr

  const businessInsight = BUSINESS_INSIGHTS[p] ?? BUSINESS_INSIGHTS['manufacturing-bottlenecks']

  const ctasArr = VIDEO_CTAS[p] ?? VIDEO_CTAS['manufacturing-bottlenecks']
  const cta = ctasArr[v % ctasArr.length] ?? ctasArr[0]

  const repArr = REPURPOSING_SUGGESTIONS[p] ?? REPURPOSING_SUGGESTIONS['manufacturing-bottlenecks']

  const qualityScore = scoreContent(inputs, true, true, true, scriptOrOutline.split(' ').length)

  const improvementSuggestions = [
    'Add a specific market segment (medical devices, defense electronics, IoT) to anchor the scenario to a recognizable product type.',
    'Include a specific dollar-per-board calculation for your primary product complexity level to make the cost stat more tangible.',
    'Reference a real EMS process sequence (solder paste → placement → reflow → AOI → test) to give viewers a concrete mental model of where each failure mode originates.',
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
