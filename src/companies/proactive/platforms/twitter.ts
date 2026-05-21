import type { TwitterInputs, TwitterOutput } from '../types'
import { PROBLEM_DATA } from '../lib/companyProfile'
import { scoreContent } from '../lib/scoring'

const SINGLE_POSTS: Record<string, string[]> = {
  'manufacturing-bottlenecks': [
    `Most electronics programs don't fall behind at the assembly line.\n\nThey fall behind at the design-to-production handoff.\n\n${PROBLEM_DATA['manufacturing-bottlenecks'].stat1}.\n\nThe firmware team waiting on boards doesn't know the bottleneck started in an incomplete Gerber package two weeks earlier.`,
    `The SMT stoppage in your program didn't start on the floor.\n\nIt started at kitting, when the component count didn't match the BOM.\n\n${PROBLEM_DATA['manufacturing-bottlenecks'].stat2}.\n\nMore vendors = more surfaces where that gap occurs.`,
    `Electronics manufacturing bottleneck math:\n\n3-day SMT stoppage × 2 idle engineering teams × $3,000/day = $18,000 downstream cost\n\nFrom a production hold that started in a design file two weeks before assembly began.\n\n${PROBLEM_DATA['manufacturing-bottlenecks'].stat3}.`,
  ],
  'supplier-inconsistency': [
    `The component arrived.\n\nIt wasn't the approved part.\n\nNow production is on hold while sourcing finds an approved replacement.\n\n${PROBLEM_DATA['supplier-inconsistency'].stat1}.\n\nThis is not a supplier quality problem. It's a sourcing strategy problem.`,
    `Using 4 distributors for the same component family:\n\n- 3x more substitution events\n- 3x more first-article risk\n- 3x more production holds\n\n${PROBLEM_DATA['supplier-inconsistency'].stat2}.\n\nConsolidation is a QA strategy, not just a procurement preference.`,
    `The pre-qualified alternate component costs $0.10 more per unit.\n\nThe production hold from not having it when the primary goes on allocation costs $15,000–$40,000 per week.\n\n${PROBLEM_DATA['supplier-inconsistency'].stat3}.\n\nThe math on approved alternates is not close.`,
  ],
  'qa-failures': [
    `QA failure caught during in-process inspection: rework cycle, 20 minutes, $40.\n\nQA failure caught in the field: RMA, root cause investigation, yield hold on all prior shipments.\n\n${PROBLEM_DATA['qa-failures'].stat1}.\n\nThe inspection program is a cost control mechanism, not a quality checkbox.`,
    `BGA and QFN solder joints are invisible without X-ray.\n\nPrograms shipping those packages without X-ray inspection are delivering at unknown solder joint quality.\n\n${PROBLEM_DATA['qa-failures'].stat2}.\n\nThe field return rate is already determined by the inspection architecture.`,
    `1 in 3 first-article rejections comes from incomplete IPC acceptance criteria.\n\nNot from assembly errors. Not from component issues.\n\nThe standard wasn't defined before the first board went down the line.\n\n${PROBLEM_DATA['qa-failures'].stat3}.`,
  ],
  'production-delays': [
    `71% of hardware launch overruns trace to PCB manufacturing delays.\n\nNot software.\nNot mechanical.\n\nThe board is the critical path — and most program schedules don't account for the documented 18–30% average delay risk.\n\n${PROBLEM_DATA['production-delays'].stat1}.`,
    `PCB delivery is two weeks late.\nTwo engineering teams are idle.\n\n${PROBLEM_DATA['production-delays'].stat2}.\n\nAt $3,000/day each, two weeks = $84,000 in downstream cost from a manufacturing readiness gap that was visible before the job was released.`,
    `The firmware integration team went dark for three weeks waiting on boards.\n\nThe delay traced to an incomplete Gerber package — a manufacturing readiness failure, not a fabrication failure.\n\n${PROBLEM_DATA['production-delays'].stat3}.\n\nThe readiness review is cheaper than the delay.`,
  ],
  'component-shortages': [
    `38% of electronics programs require a design respin due to component shortages.\n\nNot because the shortage was unforeseeable.\n\nBecause no approved alternate was pre-qualified before production.\n\n${PROBLEM_DATA['component-shortages'].stat1}.\n\nThe respin is a planning failure, not a supply failure.`,
    `Spot market component cost during allocation:\n\n180–400% above contract pricing.\n\nOn a 10,000-unit program with a $3 component: $54,000–$120,000 in unplanned cost.\n\n${PROBLEM_DATA['component-shortages'].stat2}.\n\nApproved alternates cost hours to qualify. They save this.`,
    `The component was on the EOL notice for eight months.\n\nNo alternate was pre-qualified.\n\nProduction scheduled in six weeks.\n\n${PROBLEM_DATA['component-shortages'].stat3}.\n\nComponent risk strategy is a design decision, not a production decision.`,
  ],
  'rework-scrap-cost': [
    `BGA rework in electronics assembly:\n\n- 3–6 hours of technician time\n- Risk of pad lift\n- Risk of adjacent component stress\n- Full retest required\n\n${PROBLEM_DATA['rework-scrap-cost'].stat2}.\n\nIt's not just the labor. It's what the rework risks doing to the board.`,
    `Scrap rate in disciplined EMS operations: 1–3%.\nScrap rate in undisciplined ones: 6–14%.\n\n${PROBLEM_DATA['rework-scrap-cost'].stat3}.\n\nThe gap is not equipment. It's in-process inspection at the right stages. That's the only variable that explains a 5x difference.`,
    `4–11% of production cost going to rework is not a quality trend.\n\nIt's a margin trend.\n\n${PROBLEM_DATA['rework-scrap-cost'].stat1}.\n\nOn a $500,000 production run, that's $20,000–$55,000 in cost that wasn't in the estimate — because the inspection program that prevents it wasn't in the scope.`,
  ],
  'compliance-risk': [
    `ITAR violation in an EMS program:\n\n- $250,000 minimum penalty\n- Program suspension\n- Export compliance review\n- Potential debarment\n\n${PROBLEM_DATA['compliance-risk'].stat3}.\n\nThere is no warning. There is no corrective action period. There is a penalty.`,
    `The EMS partner's compliance certification status is your compliance exposure.\n\nNot your partner's.\n\n${PROBLEM_DATA['compliance-risk'].stat2}.\n\nIf your product has defense, dual-use, or export-controlled applications, ITAR registration is a screening criterion — not an assumption.`,
    `A 4–8 week compliance hold on a medical device program with a pending FDA submission:\n\n- Delays the submission\n- Delays market entry\n- Delays revenue\n\n${PROBLEM_DATA['compliance-risk'].stat1}.\n\nThe pre-production compliance review costs hours. The hold it prevents costs months.`,
  ],
  'scaling-complexity': [
    `The prototype worked.\n\nThe first production run had a 22% first-pass yield failure rate.\n\nSame design. Same components.\n\n${PROBLEM_DATA['scaling-complexity'].stat1}.\n\nPrototype quantities don't stress-test SMT placement tolerances, reflow variation, or component tolerance stacking. Production quantities do.`,
    `Scaling from 50 to 5,000 units without a formal NPI process:\n\n- 45–65% more defects per board in the first three runs\n- 8–16 weeks to stabilize yield\n- 12–28% higher per-unit cost from ECOs\n\n${PROBLEM_DATA['scaling-complexity'].stat2}.\n\nNPI is not overhead. It's the process that makes scaling not painful.`,
    `ECOs during production scaling add 12–28% per-unit cost above programs with frozen designs at production entry.\n\n${PROBLEM_DATA['scaling-complexity'].stat3}.\n\nThe ECOs were predictable. The DFM review is what makes them predictable before production — not after.`,
  ],
  'cost-leakage': [
    `8–18% above budgeted production cost is the documented average hidden overrun in electronics programs.\n\nNot from a single event.\n\nFrom substitution approvals, rework cycles, and test coverage gaps — each individually small, collectively significant.\n\n${PROBLEM_DATA['cost-leakage'].stat1}.`,
    `The BOM substitution saved $0.15 per unit.\n\nThe qualification testing cost $8,000.\nThe process re-verification took two weeks.\nThe documentation update cost $3,000.\n\n${PROBLEM_DATA['cost-leakage'].stat2}.\n\nTrack the total burden, not just the component delta.`,
    `20–35% of field failures are shipping escapes — defects that passed internal inspection.\n\n${PROBLEM_DATA['cost-leakage'].stat3}.\n\nThe test coverage decision made during program setup determines that rate.\n\nIt's a cost decision. It's just not tracked as one until the field returns arrive.`,
  ],
  'poor-manufacturing-decisions': [
    `The cheapest EMS quote:\n\n- No formal AOI\n- No X-ray capability\n- No documented SPI\n- No IPC certification\n\n${PROBLEM_DATA['poor-manufacturing-decisions'].stat2}.\n\n2.5x more quality events at lower quote price.\n\nThe savings are real in the quote. They disappear in production.`,
    `Wrong via type adds $4–$18 per board in avoidable fabrication cost.\n\nOn 5,000 units: $20,000–$90,000.\n\nDetermined in a CAD tool.\nBefore the first board was ordered.\n\n${PROBLEM_DATA['poor-manufacturing-decisions'].stat3}.\n\nA 30-minute DFM call would have caught it.`,
    `DFM review bypassed to save schedule:\n\n→ 22–40% higher production cost\n→ ECOs in the first production run\n→ Yield stabilization adds 8–12 weeks\n\n${PROBLEM_DATA['poor-manufacturing-decisions'].stat1}.\n\nThe DFM review saves more time than it costs.`,
  ],
}

const THREADS: Record<string, string[][]> = {
  'manufacturing-bottlenecks': [
    [
      "Most electronics programs run behind schedule.\n\nAnd most teams are looking for the bottleneck in the wrong place.\n\nHere's where it actually starts — and what it costs downstream. 🧵",
      `1/ The bottleneck is almost never on the assembly floor.\n\nIt's upstream — in design file readiness, component kitting accuracy, or inter-vendor handoff timing.\n\n${PROBLEM_DATA['manufacturing-bottlenecks'].stat1}.`,
      `2/ The downstream cost starts the moment production stops.\n\n$2,000–$4,000/day per idle engineering team.\n\nOn a program with two dependent teams and a 5-day delay: $20,000–$40,000 before the floor team has identified root cause.\n\n${PROBLEM_DATA['manufacturing-bottlenecks'].stat2}.`,
      `3/ Multi-vendor EMS structures create multiple bottleneck surfaces.\n\nEvery inter-vendor handoff is a potential hold point.\n\nWhen one partner hits a component issue, the next partner can't receive boards — but their timeline is still running.\n\n${PROBLEM_DATA['manufacturing-bottlenecks'].stat3}.`,
      "4/ The structural fix is vendor consolidation.\n\nOne EMS partner manages all assembly stages → one timeline → one point of accountability.\n\nNo inter-vendor handoff gaps. No cascade from one partner's delay into another's schedule.",
      "5/ Before your next program starts:\n\n→ Map every handoff between design, fabrication, assembly, and test\n→ Identify which handoffs have no single owner\n→ Those are your bottleneck surfaces\n\nFix the structure before production. Not during.",
    ],
  ],
  'supplier-inconsistency': [
    [
      "35–55% of unplanned production holds in electronics programs trace to supplier inconsistency.\n\nMost programs have no contingency for it.\n\nHere's what that looks like — and how to prevent it. 🧵",
      `1/ The hold doesn't happen at order placement.\n\nIt happens at kitting — when the component that arrived is not the approved part.\n\n${PROBLEM_DATA['supplier-inconsistency'].stat3}.\n\n28–42% of first-article failures. Same design. Wrong component.`,
      `2/ More distributors = more substitution risk.\n\n${PROBLEM_DATA['supplier-inconsistency'].stat2}.\n\nAt 4+ distributors, the incoming verification burden exceeds what most programs have the process to manage.\n\nEvery lot is a potential non-approved substitute.`,
      `3/ The approved alternate strategy is the structural fix.\n\nPre-qualify alternates for every long-lead or single-source component before production is scheduled.\n\n${PROBLEM_DATA['supplier-inconsistency'].stat1}.\n\nWhen the primary goes on allocation, the alternate is ready.`,
      "4/ What a supply chain resilience strategy actually requires:\n\n→ Approved manufacturer list (AML) for every component\n→ Pre-qualified alternates for single-source parts\n→ Incoming inspection tied to the AML, not just the part number\n→ One authorized distributor per component family",
      "5/ The question to ask your EMS partner:\n\n'What's your process when a component arrives that doesn't match the approved manufacturer?'\n\nThe answer tells you whether they have a supply chain quality process — or a receive-and-kit process with no verification step.",
    ],
  ],
  'qa-failures': [
    [
      "Most electronics QA problems are not inspection problems.\n\nThey're inspection timing problems.\n\nHere's what that distinction costs — and how to fix it. 🧵",
      `1/ The cost of a defect scales with how late it's discovered.\n\n${PROBLEM_DATA['qa-failures'].stat1}.\n\nA solder bridge caught at AOI: 10-minute correction.\nThe same bridge caught at final test: rework cycle.\nCaught in the field: recall investigation.`,
      `2/ BGA and QFN packages are invisible without X-ray.\n\n${PROBLEM_DATA['qa-failures'].stat2}.\n\nPrograms shipping those packages without X-ray inspection don't know their solder joint quality. They find out six weeks later — in field returns.`,
      `3/ Incomplete IPC acceptance criteria causes 1 in 3 first-article rejections.\n\n${PROBLEM_DATA['qa-failures'].stat3}.\n\nThe assembly was correct — against what the operator was told to build to.\n\nThe criteria was wrong. Or missing. Or never communicated.`,
      "4/ The inspection architecture that prevents these failures:\n\n→ SPI after solder paste printing (catches volume and alignment defects before reflow)\n→ AOI after placement (catches missing, wrong, or misaligned components)\n→ X-ray after reflow for BGA/QFN (catches voiding and opens)\n→ Functional test as final validation",
      "5/ The question to ask your EMS partner before the first board goes down the line:\n\n'Show me the documented inspection criteria for IPC class [2 or 3] applied at each of these stations.'\n\nIf they can't show documentation, the criteria isn't consistently applied.",
    ],
  ],
  'production-delays': [
    [
      "71% of hardware launch overruns trace to PCB manufacturing delays.\n\nNot software. Not mechanical.\n\nHere's what drives that number — and what to do about it. 🧵",
      `1/ The PCB is the critical path in every hardware program.\n\nFirmware can't integrate. System test can't run. Regulatory submission can't happen.\n\nUntil boards arrive.\n\n${PROBLEM_DATA['production-delays'].stat1}.`,
      `2/ The delay is almost never at the fabrication machine.\n\nIt's in the release package.\n\nIncomplete Gerbers. Unresolved BOM issues. Missing fabrication notes. Net assignment questions.\n\n${PROBLEM_DATA['production-delays'].stat3}.\n\nA manufacturing readiness review before release catches all of these.`,
      `3/ The downstream cost clock starts on day one of the delay.\n\n${PROBLEM_DATA['production-delays'].stat2}.\n\nTwo teams idle for two weeks: $60,000–$112,000 in downstream cost.\n\nBefore the fabricator has sent a status update.`,
      "4/ What a manufacturing readiness review covers before release:\n\n→ BOM completeness and component availability confirmation\n→ Gerber file verification against the schematic\n→ Net list reconciliation\n→ Fabrication notes: controlled impedance, finish, stackup, soldermask\n→ Lead time confirmation for long-lead components",
      "5/ The program that completes a readiness review before release doesn't eliminate PCB delays.\n\nIt eliminates the preventable ones — which are the majority.\n\nThe residual risk is fabrication process risk. The preventable risk is documentation risk.\n\nOne takes 2 hours. The other takes 2 weeks.",
    ],
  ],
  'component-shortages': [
    [
      "38% of electronics programs require a design respin due to component shortages.\n\nMost of those respins were preventable.\n\nHere's the framework that prevents them. 🧵",
      `1/ The shortage event is not the problem.\n\nThe absence of an approved alternate is the problem.\n\n${PROBLEM_DATA['component-shortages'].stat2}.\n\nPrograms with pre-qualified alternates switch and continue. Programs without alternates either respin or pay spot market prices.`,
      `2/ Spot market cost during allocation:\n\n${PROBLEM_DATA['component-shortages'].stat3}.\n\n180–400% above contract pricing.\n\nOn 10,000 units with a $3 component: $54,000–$120,000 in unplanned cost.\n\nThe alternate qualification is a one-time investment. The spot market premium is per run.`,
      `3/ The respin alternative:\n\n${PROBLEM_DATA['component-shortages'].stat1}.\n\n6–14 weeks added to the program.\n\nNew layout. New schematic review. New regulatory test cycle if a medical or defense product.\n\nThe market window the program was built for may not wait 14 weeks.`,
      "4/ What an approved alternate strategy requires:\n\n→ Identify all long-lead and single-source components at schematic capture\n→ Find functionally equivalent alternates from different manufacturers\n→ Qualify the alternates: electrical verification, thermal performance, form-fit-function check\n→ Add alternates to the BOM before production is scheduled",
      "5/ The question to answer before every BOM is finalized:\n\n'If the primary supplier for this component goes on 26-week allocation in the next 12 months, what is our production response?'\n\nIf the answer is 'spot market' or 'respin,' the alternate qualification hasn't been done.",
    ],
  ],
  'rework-scrap-cost': [
    [
      "Rework in electronics assembly has three costs.\n\nMost programs only track one.\n\nHere's what the other two cost — and how to prevent all three. 🧵",
      `1/ Cost 1: The material.\n\nThe component replaced. The board scrapped. The solder joint reflowed.\n\n${PROBLEM_DATA['rework-scrap-cost'].stat3}.\n\nScrap rates of 6–14% vs. 1–3%. Same equipment. Same components. Different inspection architecture.`,
      `2/ Cost 2: The technician time — and the board risk.\n\n${PROBLEM_DATA['rework-scrap-cost'].stat2}.\n\n3–6 hours per BGA rework event. Thermal stress on adjacent components. Risk of pad lift.\n\nThe board that goes to rework may not come back as a fully functional board.`,
      `3/ Cost 3: The test cycle repeat.\n\nEvery rework event requires a full test repeat. On a complex board with a 4-hour functional test: each rework event adds 4 hours.\n\n${PROBLEM_DATA['rework-scrap-cost'].stat1}.\n\nOn $500K in production, 7% rework rate = $35,000+ — and that's before test cycles are counted.`,
      "4/ The inspection architecture that prevents all three:\n\n→ SPI before reflow (catches paste defects at the lowest correction cost)\n→ AOI after placement (catches component issues before solder is set)\n→ X-ray after reflow for BGAs (catches what visual inspection can't see)\n\nEach stage catches the defect where it's cheapest to fix.",
      "5/ The question to ask your EMS partner:\n\n'What is your first-pass yield rate on programs with similar complexity to mine — and what does your in-process inspection architecture look like?'\n\nThe two numbers are directly correlated. If one is missing, so is the other.",
    ],
  ],
  'compliance-risk': [
    [
      "Compliance failures in regulated electronics manufacturing are not discovered during audits.\n\nThey're discovered during program failures.\n\nHere's what that looks like — and how to prevent it. 🧵",
      `1/ ITAR violations don't produce warnings.\n\n${PROBLEM_DATA['compliance-risk'].stat3}.\n\n$250,000 minimum penalty per incident. Program suspension. Export compliance review. Debarment risk.\n\nThe EMS partner's ITAR registration status is a screening criterion — not an assumption.`,
      `2/ Compliance holds average 4–8 weeks to resolve.\n\n${PROBLEM_DATA['compliance-risk'].stat1}.\n\nOn a medical device program with an FDA submission pending, that hold is a market entry delay.\n\nOn a defense program with a delivery milestone, it's a contract performance failure.`,
      `3/ Traceability documentation failures cause 3x higher audit failure rates.\n\n${PROBLEM_DATA['compliance-risk'].stat2}.\n\nThe traceability isn't for the auditor.\n\nIt's the evidence that a controlled process produced a controlled product — and it's the only way to support a field action or recall investigation.`,
      "4/ The pre-production compliance review for EMS programs:\n\n→ Verify ITAR registration for defense/dual-use programs\n→ Confirm ISO certification scope (9001, 13485, AS9100) matches the product type\n→ Review traceability documentation requirements in the EMS contract\n→ Specify IPC class requirements explicitly — and verify they're loaded in inspection stations",
      "5/ The question to ask before selecting an EMS partner for a regulated program:\n\n'Show me your compliance certification documentation, your traceability system documentation, and the first-article inspection records from a comparable regulated program.'\n\nVerification takes 30 minutes. A compliance hold takes 4–8 weeks.",
    ],
  ],
  'scaling-complexity': [
    [
      "Most hardware teams underestimate prototype-to-production transition risk.\n\nHere's what the data says — and what a formal NPI process actually prevents. 🧵",
      `1/ Prototype success does not predict production yield.\n\n${PROBLEM_DATA['scaling-complexity'].stat1}.\n\n45–65% more defect events per board in the first three production runs.\n\nNot because the design changed. Because the design was validated for bench performance — not for SMT line variation at volume.`,
      `2/ Without a formal NPI process, yield stabilization takes time the program doesn't have.\n\n${PROBLEM_DATA['scaling-complexity'].stat2}.\n\n8–16 additional weeks.\n\nIn competitive hardware markets, those weeks can determine whether you launch in the current market cycle or wait for the next one.`,
      `3/ ECOs during scaling are expensive — even when they're small.\n\n${PROBLEM_DATA['scaling-complexity'].stat3}.\n\n12–28% higher per-unit cost from ECOs at production scaling.\n\nEach ECO requires a revised Gerber, updated stencil, process requalification, and in some cases regulatory re-submission.`,
      "4/ What a formal NPI process includes:\n\n→ DFM review with the EMS partner before layout completion\n→ First-article inspection with documented pass criteria\n→ Process capability study: Cpk for critical dimensions\n→ Yield target gate before full production release\n→ Design freeze at production entry — no ECOs after release",
      "5/ The DFM review is the highest-ROI step in the NPI process.\n\nA 2-hour review before layout completion catches:\n→ Via type and fill requirements\n→ Component clearance violations\n→ Controlled impedance specification gaps\n→ Footprint issues for new components\n\nEach finding is a 10-minute correction at layout stage. At production stage, each one is an ECO.",
    ],
  ],
  'cost-leakage': [
    [
      "8–18% above budgeted production cost is the documented average hidden overrun in electronics programs.\n\nIt doesn't come from a single event.\n\nHere's how it accumulates — and how to stop it. 🧵",
      `1/ Cost leakage starts at the first approved exception.\n\nA BOM substitution. A rework cycle that wasn't in scope. An expedite fee to recover schedule.\n\n${PROBLEM_DATA['cost-leakage'].stat2}.\n\nEach one seems minor. Together they add $15,000–$80,000 to program cost.`,
      `2/ The substitution approval process is the most common leakage point.\n\nThe $0.15 component savings was tracked at the PO level.\n\nThe $11,000 in qualification testing, documentation, and process re-verification was not.\n\n${PROBLEM_DATA['cost-leakage'].stat1}.\n\nTrack the total burden, not the component delta.`,
      `3/ Shipping escapes are the highest-cost leakage.\n\n${PROBLEM_DATA['cost-leakage'].stat3}.\n\n20–35% of field failures are defects that passed internal inspection.\n\nThe test coverage decision made during program setup determines that rate.\n\nIt's a cost decision that doesn't look like one until the field returns start.`,
      "4/ The cost tracking structure that prevents leakage:\n\n→ Rolling program cost model updated at every significant decision\n→ BOM substitution approvals include total cost burden estimate\n→ Test coverage decisions evaluated against field failure cost of an untested escape\n→ Rework rate tracked as a dollar metric, not a percentage",
      "5/ The question to ask at every program review:\n\n'What decisions have been made this week that affect production cost — and have all of them been added to the program cost model?'\n\nLeakage is controllable if you track it at the point where it's created.\n\nMost programs track it at close-out. That's 90 days too late.",
    ],
  ],
  'poor-manufacturing-decisions': [
    [
      "The most expensive manufacturing decisions in electronics programs are made before manufacturing starts.\n\nHere's where they happen — and how much they cost. 🧵",
      `1/ The DFM bypass happens quietly.\n\n'We'll do a DFM review after layout is complete.'\n\nBy then, every change is an ECO.\n\n${PROBLEM_DATA['poor-manufacturing-decisions'].stat1}.\n\n22–40% higher production cost from designs that bypass DFM review. That cost is determined before the first Gerber is generated.`,
      `2/ EMS partner selection on price alone:\n\n${PROBLEM_DATA['poor-manufacturing-decisions'].stat2}.\n\n2.5x more mid-program quality events.\n\nThe savings are real at the quote stage. The first quality event is when they disappear — usually around week 8 of production.`,
      `3/ Via type and stack-up decisions are fabrication cost decisions.\n\n${PROBLEM_DATA['poor-manufacturing-decisions'].stat3}.\n\n$4–$18 per board in avoidable fabrication cost from the wrong via type.\n\nOn 5,000 units: $20,000–$90,000. Determined in CAD. Before any board was ordered.`,
      "4/ The DFM review process that prevents this:\n\n→ Hold before layout is complete — not after Gerber generation\n→ Review with the specific EMS partner who will build the board\n→ Cover: via types, fill requirements, clearances, footprints, impedance callouts\n→ Freeze the design before release\n\n30-minute call. Prevents weeks of ECOs.",
      "5/ The EMS selection criteria beyond price:\n\n→ AOI + X-ray + SPI inspection infrastructure documented\n→ IPC class 2 or 3 certification confirmed\n→ First-pass yield data on comparable programs available\n→ DFM review included in onboarding process\n\nThese criteria filter for the process capability that produces the target quality outcome.",
    ],
  ],
}

const ALTERNATE_HOOKS: Record<string, string> = {
  'manufacturing-bottlenecks': "The bottleneck in your PCB program is upstream of where your team is looking. It's always upstream.",
  'supplier-inconsistency': "Your supply chain isn't your supplier list. It's your approved manufacturer list — and how many distributors you let ship against it.",
  'qa-failures': "The field return rate is a lagging indicator. The inspection architecture is the leading one. Fix the architecture.",
  'production-delays': "PCB delivery timing is the most consequential variable in a hardware program — and the one that gets the least attention during schedule planning.",
  'component-shortages': "Component shortage resilience is built at the design stage or not at all. By production, it's already determined.",
  'rework-scrap-cost': "The scrap rate tells you more about an EMS partner's process discipline than any sales presentation will.",
  'compliance-risk': "Compliance verification is 30 minutes. A compliance hold is 4–8 weeks. The math makes the verification straightforward.",
  'scaling-complexity': "Prototype success is not production validation. Those are two different tests — and most programs only run one.",
  'cost-leakage': "Electronics production cost leakage isn't discovered at close-out. It's created one approved exception at a time.",
  'poor-manufacturing-decisions': "The cheapest EMS quote is a manufacturing decision, not a procurement decision. It's made with production cost data, not bid price data.",
}

const ENGAGEMENT_QUESTIONS: Record<string, string> = {
  'manufacturing-bottlenecks': "Where has your last PCB production bottleneck actually started — design files, kitting, vendor handoff, or somewhere else?",
  'supplier-inconsistency': "How many distributors are in your current electronics supply chain? Have you mapped the substitution event risk at each one?",
  'qa-failures': "What is your current in-process inspection architecture? SPI, AOI, and X-ray — or a subset? What does the field return data say about what's missing?",
  'production-delays': "What percentage of your PCB delivery dates match quoted lead times? Most engineering managers have never calculated this number across a program set.",
  'component-shortages': "How many components in your current BOM have no pre-qualified approved alternate? That number is your shortage production risk.",
  'rework-scrap-cost': "What is your current first-pass yield rate — and what does your EMS partner report as the primary failure mode? Those two pieces of data tell you exactly where to invest in inspection.",
  'compliance-risk': "When did you last verify your EMS partner's compliance certification scope — not just confirm they have a certificate? Scope matters as much as the certification.",
  'scaling-complexity': "What was the first-pass yield on your last prototype-to-production transition? And what was it after yield stabilization? The gap is your NPI process gap.",
  'cost-leakage': "Have you completed a post-program cost reconciliation on a closed electronics program? The variance between estimate and actual tells you exactly where to improve the cost tracking process.",
  'poor-manufacturing-decisions': "Has your current PCB design gone through a DFM review with the specific EMS partner who will build it? The 'with the specific partner' part is what makes the review actionable.",
}

const CTAS: Record<string, string> = {
  'manufacturing-bottlenecks': "If you're running an EMS program and want to map your bottleneck surfaces before the next production run, I can walk through the structure with you.",
  'supplier-inconsistency': "If you want to evaluate your current component supply chain against a shortage and substitution risk framework, let's start with your BOM.",
  'qa-failures': "If you'd like to evaluate your current inspection architecture against the defect modes in your program, comment with your package types and I'll outline the gaps.",
  'production-delays': "If you want to review your manufacturing readiness process before your next PCB release, the checklist is in the replies.",
  'component-shortages': "If you want to run a component risk audit on your current BOM — identifying single-source parts and long-lead dependencies — comment 'RISK' and I'll share the framework.",
  'rework-scrap-cost': "If you want to model the ROI of in-process inspection upgrades against your current rework rate, the calculator is in the replies.",
  'compliance-risk': "If you're starting a program in a regulated market and want a compliance verification checklist for EMS partner evaluation, comment 'COMPLIANCE' and I'll share it.",
  'scaling-complexity': "If you're preparing for your first high-volume production run and want a DFM review checklist tailored to your EMS partner's process, let's start with your stack-up.",
  'cost-leakage': "If you want to build a rolling program cost model that tracks leakage in real time instead of at close-out, the framework is in the replies.",
  'poor-manufacturing-decisions': "If you want to run a DFM pre-check on your current PCB design before layout is complete, I can outline what to verify with your EMS partner in a 30-minute call.",
}

const REPURPOSING: Record<string, string[]> = {
  'manufacturing-bottlenecks': ['Expand this into a LinkedIn post focusing on the downstream cost calculation', 'Convert the thread into a YouTube Shorts script — 60 seconds, no intro, problem-cost-fix', 'Use the alternate hook as a standalone Instagram caption with B-roll of an SMT line'],
  'supplier-inconsistency': ['Turn the thread into a LinkedIn carousel: "5 signs your supply chain is creating production holds"', 'Convert the single post into a YouTube Shorts hook', 'Use the engagement question as a Facebook discussion prompt for procurement officers'],
  'qa-failures': ['Expand the thread into a LinkedIn post on inspection architecture as a cost control mechanism', 'Convert the 3-second hook into a YouTube Shorts opening', 'Turn the IPC criteria stat into a standalone Instagram carousel'],
  'production-delays': ['Expand into a LinkedIn post focused on the 71% statistic and the manufacturing readiness review', 'Convert the thread into a YouTube video outline on PCB manufacturing readiness', 'Use the engagement question as a Facebook discussion prompt for hardware program managers'],
  'component-shortages': ['Expand the thread into a LinkedIn post on approved alternate strategy as a design decision', 'Convert the spot market cost stat into a YouTube Shorts hook', 'Turn the alternate qualification process into an Instagram carousel'],
  'rework-scrap-cost': ['Expand the three-cost framework into a LinkedIn post', 'Use the BGA rework risk scenario as a YouTube Shorts hook', 'Convert the scrap rate differential into a Facebook educational post'],
  'compliance-risk': ['Expand the thread into a LinkedIn post on pre-production compliance verification', 'Use the ITAR penalty stat as a YouTube Shorts hook', 'Turn the compliance review checklist into an Instagram carousel'],
  'scaling-complexity': ['Expand the NPI process section into a LinkedIn post for hardware teams approaching production scaling', 'Use the prototype yield gap scenario as a YouTube Shorts hook', 'Convert the DFM review process into an Instagram carousel'],
  'cost-leakage': ['Expand the substitution cost burden section into a LinkedIn post', 'Use the program cost overrun reveal as a YouTube Shorts hook', 'Turn the rolling cost model into a Facebook educational post'],
  'poor-manufacturing-decisions': ['Expand the DFM bypass cost calculation into a LinkedIn post', 'Use the via type cost impact scenario as a YouTube Shorts hook', 'Turn the EMS selection criteria into an Instagram carousel'],
}

export function generateTwitter(inputs: TwitterInputs, seed: number = 0): TwitterOutput {
  const v = seed % 3
  const p = inputs.problem
  const fmt = inputs.postFormat

  const singleArr = SINGLE_POSTS[p] ?? SINGLE_POSTS['manufacturing-bottlenecks']
  const mainPost = singleArr[v] ?? singleArr[0]

  const threadArr = THREADS[p] ?? THREADS['manufacturing-bottlenecks']
  const thread = (fmt === 'thread' || fmt === 'founder' || fmt === 'contrarian')
    ? (threadArr[0] ?? undefined)
    : undefined

  const alternateHook = ALTERNATE_HOOKS[p] ?? ALTERNATE_HOOKS['manufacturing-bottlenecks']
  const cta = CTAS[p] ?? CTAS['manufacturing-bottlenecks']
  const engagementQuestion = ENGAGEMENT_QUESTIONS[p] ?? ENGAGEMENT_QUESTIONS['manufacturing-bottlenecks']
  const repArr = REPURPOSING[p] ?? REPURPOSING['manufacturing-bottlenecks']

  const qualityScore = scoreContent(inputs, true, true, true, mainPost.split(' ').length)

  const improvementSuggestions = [
    'Add a specific product category (medical device, defense subsystem, IoT hardware) to anchor the scenario to a recognizable program type.',
    'Include a specific board complexity indicator — layer count, BGA count, minimum trace width — to make the cost stat more tangible for electronics engineers.',
    'Reference a specific EMS process stage (solder paste printing, AOI, X-ray) to give readers a concrete point of intervention rather than a general observation.',
  ]

  return {
    platform: 'twitter',
    mainPost,
    thread,
    alternateHook,
    cta,
    engagementQuestion,
    repurposingSuggestions: repArr.slice(0, 3),
    qualityScore,
    improvementSuggestions,
  }
}
