import type { InstagramInputs, InstagramOutput } from '../types'
import { PROBLEM_DATA } from '../lib/companyProfile'
import { scoreContent } from '../lib/scoring'

const VISUAL_HOOKS: Record<string, string[]> = {
  'manufacturing-bottlenecks': [
    "Close-up of an empty SMT conveyor — boards expected, none arriving",
    "Split screen: busy assembly floor vs. idle engineering team waiting on boards",
    "Annotated PCB with red arrow pointing to design handoff gap",
  ],
  'supplier-inconsistency': [
    "Kitting tray with one component slot empty — labeled 'Non-Approved Substitute'",
    "Side-by-side of approved component vs. substitute — same package, different specs",
    "Supply chain diagram with multiple distributor paths highlighted in red",
  ],
  'qa-failures': [
    "X-ray image of a BGA showing voiding under a package",
    "Split screen: AOI catching a defect vs. same defect reaching a field return",
    "PCB under magnification at an inspection station",
  ],
  'production-delays': [
    "Empty lab bench with boards nowhere to be seen — firmware team idle",
    "Timeline graphic showing PCB delay cascading into firmware, test, and launch",
    "Clock overlaid on a PCB fabrication conveyor",
  ],
  'component-shortages': [
    "BOM with one line item highlighted in red — 'Allocation: 26-week lead time'",
    "Component reel with 'EOL' sticker — product still in development",
    "Split screen: approved alternate path vs. respin path — with week counts",
  ],
  'rework-scrap-cost': [
    "Technician performing BGA rework under microscope — focused, precise",
    "Scrap bin next to a production line — boards that didn't make it",
    "Split screen: scrap rate 2% vs. scrap rate 12% — same production line",
  ],
  'compliance-risk': [
    "Compliance certificate with a red 'EXPIRED' stamp",
    "Audit checklist with multiple unchecked items",
    "Traceability binder next to an empty documentation shelf",
  ],
  'scaling-complexity': [
    "Prototype board (hand-built, clean) next to first production run board (defects visible)",
    "Yield curve graph: high defects in runs 1–3, stabilizing by run 6",
    "DFM review session: designer and EMS engineer reviewing layout on screen",
  ],
  'cost-leakage': [
    "Program budget meter creeping past the red line — one small decision at a time",
    "Stack of approved exception forms — each small, collectively significant",
    "Cost waterfall chart: estimate vs. actual, gap filled with substitutions and rework",
  ],
  'poor-manufacturing-decisions': [
    "PCB design on screen with a highlighted via-in-pad annotation — 'Needs fill: $12/board extra'",
    "Three EMS quotes: lowest price selected, quality event cost overlaid",
    "Designer choosing via type in CAD — with dollar value annotation per unit",
  ],
}

const ON_SCREEN_TEXTS: Record<string, string[]> = {
  'manufacturing-bottlenecks': [
    "Your PCB program is behind. The bottleneck isn't where you're looking.",
    "Every hour of SMT stoppage = $2,000–$4,000 in idle downstream cost",
    "More vendors = more handoff surfaces = more bottleneck risk",
  ],
  'supplier-inconsistency': [
    "The component arrived. It wasn't the approved part.",
    "4 distributors = 3x more production holds",
    "Pre-qualified alternates prevent 35% of production holds",
  ],
  'qa-failures': [
    "Defect caught in AOI: 20 minutes. Same defect in the field: recall.",
    "No X-ray = unknown BGA quality = field return risk",
    "1 in 3 first-article rejections: incomplete IPC criteria",
  ],
  'production-delays': [
    "71% of hardware overruns start with PCB delays",
    "$4,000/day: the cost of an idle engineering team",
    "Incomplete Gerbers = fabrication hold = schedule loss",
  ],
  'component-shortages': [
    "38% of programs need a respin. Most were preventable.",
    "Spot market = 400% cost premium",
    "No approved alternate = spot market or respin",
  ],
  'rework-scrap-cost': [
    "4–11% of production cost going to rework is a margin problem",
    "BGA rework: 6 hours of risk, not just 6 hours of labor",
    "Scrap rate 12% vs. 2% = process discipline gap",
  ],
  'compliance-risk': [
    "ITAR violation: $250K minimum. No warning.",
    "Compliance hold = 4–8 weeks your program doesn't have",
    "3x higher audit failure rate without traceability",
  ],
  'scaling-complexity': [
    "Prototype worked. Production run: 22% failure rate. Same design.",
    "8–16 weeks to stabilize yield without NPI",
    "DFM review = 22–40% lower production cost",
  ],
  'cost-leakage': [
    "8–18% above budget. Not one event — twelve small decisions.",
    "$80K in untracked substitution cost on one program",
    "20–35% of field failures: shipping escapes",
  ],
  'poor-manufacturing-decisions': [
    "Cheapest EMS quote = 2.5x more quality events",
    "Wrong via type: $18/board × 5,000 boards = $90K avoidable cost",
    "DFM bypass: 22–40% higher production cost. Every time.",
  ],
}

const CAROUSEL_SLIDES: Record<string, string[][]> = {
  'manufacturing-bottlenecks': [
    [
      "Slide 1: Your PCB program is behind schedule. The bottleneck isn't on the assembly floor.",
      "Slide 2: It's upstream. In design files. In component kitting. In inter-vendor handoffs.",
      `Slide 3: ${PROBLEM_DATA['manufacturing-bottlenecks'].stat1}.`,
      `Slide 4: ${PROBLEM_DATA['manufacturing-bottlenecks'].stat2}. Each additional vendor adds a failure surface.`,
      "Slide 5: The fix is structural. Single-source EMS eliminates the handoff gaps where bottlenecks form.",
      "Slide 6: Map every handoff before production starts. Every handoff without a single owner is a bottleneck waiting to happen.",
    ],
  ],
  'supplier-inconsistency': [
    [
      "Slide 1: The component arrived at kitting. It wasn't the approved part. Production holds.",
      `Slide 2: ${PROBLEM_DATA['supplier-inconsistency'].stat1}.`,
      `Slide 3: ${PROBLEM_DATA['supplier-inconsistency'].stat2}. More distributors = more substitution risk.`,
      "Slide 4: The approved alternate strategy: pre-qualify alternates before production is scheduled.",
      `Slide 5: ${PROBLEM_DATA['supplier-inconsistency'].stat3}. First-article rejections from the supply chain, not the design.`,
      "Slide 6: Supply chain consolidation is a QA strategy. Not just a procurement preference.",
    ],
  ],
  'qa-failures': [
    [
      "Slide 1: QA failure caught in inspection: rework cycle. Same failure in the field: recall.",
      `Slide 2: ${PROBLEM_DATA['qa-failures'].stat1}. Discovery stage determines the cost.`,
      "Slide 3: BGA and QFN solder joints are invisible without X-ray. Programs without X-ray are delivering at unknown quality.",
      `Slide 4: ${PROBLEM_DATA['qa-failures'].stat2}. The inspection architecture determines the field return rate.`,
      `Slide 5: ${PROBLEM_DATA['qa-failures'].stat3}. The assembly was correct — the criteria was incomplete.`,
      "Slide 6: SPI → AOI → X-ray → Functional test. Each stage catches what the next stage can't undo cheaply.",
    ],
  ],
  'production-delays': [
    [
      "Slide 1: 71% of hardware launch overruns start with PCB manufacturing delays.",
      `Slide 2: ${PROBLEM_DATA['production-delays'].stat2}. Two idle teams for two weeks = $60K–$112K.`,
      "Slide 3: The delay rarely starts at the fabrication machine. It starts in incomplete design release packages.",
      `Slide 4: ${PROBLEM_DATA['production-delays'].stat1}. 18–30% average timeline extension.`,
      "Slide 5: Manufacturing readiness review before release: BOM completeness, Gerber verification, lead time confirmation.",
      "Slide 6: The readiness review takes 2 hours. The delay it prevents takes 2 weeks.",
    ],
  ],
  'component-shortages': [
    [
      "Slide 1: 38% of electronics programs require a design respin due to component shortages.",
      "Slide 2: Most of those respins were preventable. Here's what prevents them.",
      `Slide 3: ${PROBLEM_DATA['component-shortages'].stat3}. Spot market = 180–400% cost premium.`,
      `Slide 4: ${PROBLEM_DATA['component-shortages'].stat2}. No approved alternate = production hold or respin.`,
      "Slide 5: Approved alternate strategy: identify single-source components at schematic, qualify alternates before layout.",
      "Slide 6: Shortage resilience is a design decision. By production, it's already determined.",
    ],
  ],
  'rework-scrap-cost': [
    [
      "Slide 1: Rework in electronics assembly has 3 costs. Most programs only track 1.",
      `Slide 2: Cost 1 — The material: ${PROBLEM_DATA['rework-scrap-cost'].stat3}.`,
      `Slide 3: Cost 2 — The time and risk: ${PROBLEM_DATA['rework-scrap-cost'].stat2}. Pad lift. Adjacent component stress.`,
      `Slide 4: Cost 3 — The test repeat: ${PROBLEM_DATA['rework-scrap-cost'].stat1}. 4–11% of production cost.`,
      "Slide 5: The prevention architecture: SPI before reflow, AOI after placement, X-ray after reflow.",
      "Slide 6: In-process inspection is not a cost. It's the mechanism that keeps rework rare.",
    ],
  ],
  'compliance-risk': [
    [
      "Slide 1: Compliance gaps in electronics manufacturing are discovered during program failures. Not audits.",
      `Slide 2: ITAR violation: ${PROBLEM_DATA['compliance-risk'].stat3}. No warning. No corrective action period.`,
      `Slide 3: Compliance hold: ${PROBLEM_DATA['compliance-risk'].stat1}. On a medical or defense program, that's a market entry delay.`,
      `Slide 4: Traceability gap: ${PROBLEM_DATA['compliance-risk'].stat2}. 3x higher audit failure rate.`,
      "Slide 5: Pre-production compliance review: verify ITAR registration, ISO scope, IPC class, and traceability documentation before production.",
      "Slide 6: The compliance verification takes 30 minutes. The hold it prevents takes 4–8 weeks.",
    ],
  ],
  'scaling-complexity': [
    [
      "Slide 1: The prototype worked. The first production run had a 22% first-pass yield failure rate.",
      `Slide 2: ${PROBLEM_DATA['scaling-complexity'].stat1}. 45–65% more defects in the first three production runs.`,
      `Slide 3: ${PROBLEM_DATA['scaling-complexity'].stat2}. 8–16 weeks to stabilize yield without NPI.`,
      `Slide 4: ${PROBLEM_DATA['scaling-complexity'].stat3}. ECOs during scaling cost 12–28% more per unit.`,
      "Slide 5: DFM review before layout completion. First-article inspection with defined pass criteria. Yield gate before full production.",
      "Slide 6: NPI converts prototype success into production success. Skipping it converts prototype success into production problems.",
    ],
  ],
  'cost-leakage': [
    [
      "Slide 1: 8–18% above budgeted production cost. Not from one event — from twelve small decisions.",
      `Slide 2: ${PROBLEM_DATA['cost-leakage'].stat2}. Substitution approved at the component level. Total burden not tracked.`,
      `Slide 3: ${PROBLEM_DATA['cost-leakage'].stat3}. 20–35% of field failures are defects that passed inspection.`,
      `Slide 4: ${PROBLEM_DATA['cost-leakage'].stat1}. Average hidden overrun of 8–18% across programs.`,
      "Slide 5: Rolling program cost model: every decision tracked against the program budget in real time — not at close-out.",
      "Slide 6: Cost leakage is controllable. But only if it's tracked where it's created, not where it's discovered.",
    ],
  ],
  'poor-manufacturing-decisions': [
    [
      "Slide 1: The most expensive manufacturing decisions happen before manufacturing starts.",
      `Slide 2: ${PROBLEM_DATA['poor-manufacturing-decisions'].stat1}. DFM bypass = 22–40% higher production cost.`,
      `Slide 3: ${PROBLEM_DATA['poor-manufacturing-decisions'].stat2}. Price-based EMS selection = 2.5x more quality events.`,
      `Slide 4: ${PROBLEM_DATA['poor-manufacturing-decisions'].stat3}. $4–$18/board in avoidable fabrication cost from the wrong via type.`,
      "Slide 5: DFM review before layout completion. EMS partner selection based on process capability, not bid price.",
      "Slide 6: The manufacturing decision made at the design stage determines the production outcome.",
    ],
  ],
}

const CAPTIONS: Record<string, string[]> = {
  'manufacturing-bottlenecks': [
    `Your PCB program is behind schedule. The bottleneck isn't where your team is looking.\n\n${PROBLEM_DATA['manufacturing-bottlenecks'].stat1}. Every downstream engineering team carries $2,000–$4,000/day in idle cost while the floor catches up.\n\n${PROBLEM_DATA['manufacturing-bottlenecks'].stat2}. The structural fix is vendor consolidation — one EMS partner, one timeline, one accountability point.\n\nMap your handoff surfaces before the next production run. The bottleneck is always upstream of where it's discovered.\n\n#ElectronicsManufacturing #PCBAssembly #EMS #HardwareDevelopment #SupplyChain`,
    `The SMT stoppage didn't start on the line. It started in the design files — or the kitting report.\n\n${PROBLEM_DATA['manufacturing-bottlenecks'].stat3}. When one stage holds, every dependent stage holds with it.\n\nSingle-source EMS eliminates the inter-vendor gaps where these bottlenecks form.\n\n#PCBProduction #SMTAssembly #ElectronicsManufacturing #HardwareEngineering`,
    `Electronics program bottleneck math:\n\n3-day delay × 2 idle teams × $3,000/day = $18,000 from a design file issue.\n\n${PROBLEM_DATA['manufacturing-bottlenecks'].stat2}.\n\nStructure prevents bottlenecks. Crisis response doesn't.\n\n#EMS #PCBDesign #HardwarePrograms #ManufacturingOps`,
  ],
  'supplier-inconsistency': [
    `The component arrived. It wasn't the approved part.\n\nProduction holds. Sourcing scrambles. Schedule slips.\n\n${PROBLEM_DATA['supplier-inconsistency'].stat3}. And it shows up at kitting — not at order placement.\n\nPre-qualified approved alternates are the only structural fix. Everything else is reactive.\n\n#ComponentSourcing #SupplyChain #ElectronicsManufacturing #PCBAssembly #BOM`,
    `${PROBLEM_DATA['supplier-inconsistency'].stat2}.\n\nFour distributors doesn't mean four options. It means four times the substitution risk.\n\nApproved manufacturer list compliance + one authorized distributor per component family = predictable production.\n\n#ElectronicsSupplyChain #ComponentShortage #EMS #QualityAssurance`,
    `Supply chain consolidation is a QA strategy.\n\n${PROBLEM_DATA['supplier-inconsistency'].stat1}. Most programs have no contingency when that 35% hits their schedule.\n\nThe approved alternate strategy costs hours to build. It saves weeks of production holds.\n\n#PCBProduction #ElectronicsManufacturing #SupplyChainRisk #HardwareDevelopment`,
  ],
  'qa-failures': [
    `QA failure in production: rework cycle, $40, 20 minutes.\nSame failure in the field: RMA, root cause, yield hold on all prior shipments.\n\n${PROBLEM_DATA['qa-failures'].stat1}.\n\nThe inspection architecture determines which cost you pay. Most programs underinvest in it until the first field return event.\n\n#ElectronicsQuality #PCBInspection #AOI #SMTAssembly #IPC`,
    `No X-ray = no visibility into BGA solder joint quality.\n\n${PROBLEM_DATA['qa-failures'].stat2}.\n\nFunctional test doesn't catch voiding. It catches electrical failure after the thermal cycling the field will provide.\n\nX-ray inspection is not optional for BGA and QFN packages.\n\n#BGAInspection #XRay #ElectronicsManufacturing #QualityControl #PCB`,
    `1 in 3 first-article rejections in electronics assembly traces to incomplete IPC acceptance criteria.\n\n${PROBLEM_DATA['qa-failures'].stat3}.\n\nThe assembly was correct — against an incomplete standard.\n\nDefine the criteria before the first board goes down the line. It's a documentation task, not an engineering task.\n\n#IPC #FirstArticle #ElectronicsQA #PCBAssembly #EMS`,
  ],
  'production-delays': [
    `71% of hardware launch overruns trace to PCB manufacturing delays.\n\nNot firmware. Not mechanical. The board.\n\n${PROBLEM_DATA['production-delays'].stat2}. Two teams idle for two weeks = $60K–$112K before a single schedule revision is communicated.\n\nThe manufacturing readiness review before release prevents the preventable majority.\n\n#PCBProduction #HardwareDevelopment #ElectronicsManufacturing #ProductLaunch`,
    `The PCB delay starts before the fabrication order is released.\n\nIncomplete Gerbers. Unresolved BOM issues. Missing fabrication notes.\n\n${PROBLEM_DATA['production-delays'].stat3}.\n\nA manufacturing readiness review takes 2 hours. The delay it prevents takes 2 weeks.\n\n#PCBDesign #Gerber #ElectronicsManufacturing #HardwareEngineering #PCBFabrication`,
    `${PROBLEM_DATA['production-delays'].stat1}.\n\nAn 18–30% average timeline extension on a 10-week PCB lead time is 2–3 additional weeks.\n\nIn a regulated market, those weeks can determine whether you make the current submission cycle.\n\nPricing delay risk into your schedule is not pessimism — it's engineering practice.\n\n#HardwarePrograms #PCBManufacturing #ElectronicsEngineering #RegulatoryCompliance`,
  ],
  'component-shortages': [
    `38% of electronics programs require a design respin due to component shortages.\n\nThe respin adds 6–14 weeks. The market window doesn't wait.\n\n${PROBLEM_DATA['component-shortages'].stat2}.\n\nApproved alternates are qualified at the design stage — or not at all. By production, the exposure is already set.\n\n#ComponentShortage #BOM #ElectronicsSupplyChain #HardwareDevelopment #PCBDesign`,
    `Spot market component sourcing during allocation:\n\n${PROBLEM_DATA['component-shortages'].stat3}.\n\n180–400% above contract pricing. Per component. Per run.\n\nThe approved alternate qualification is a one-time investment. The spot market premium is recurring.\n\n#SupplyChain #ComponentAllocation #ElectronicsManufacturing #BOMManagement`,
    `The EOL notice sat in the inbox for eight months.\n\nNo alternate was pre-qualified.\nProduction scheduled in six weeks.\n\n${PROBLEM_DATA['component-shortages'].stat1}.\n\nEOL monitoring without an action trigger is not a supply chain strategy. It's awareness without response.\n\n#ComponentEOL #ElectronicsSupplyChain #HardwareEngineering #PCBDesign`,
  ],
  'rework-scrap-cost': [
    `BGA rework has three costs:\n1. The component and board\n2. The 3–6 hours of technician time and board risk\n3. The full test cycle that repeats after\n\n${PROBLEM_DATA['rework-scrap-cost'].stat1}.\n\nIn-process inspection prevents the rework that makes all three necessary.\n\n#BGARework #PCBAssembly #ElectronicsManufacturing #QualityControl #SMT`,
    `Scrap rate 1–3% vs. 6–14%.\n\nSame equipment. Same components. Different inspection architecture.\n\n${PROBLEM_DATA['rework-scrap-cost'].stat3}.\n\nSPI before reflow. AOI after placement. X-ray after reflow. Each stage catches what the next can't fix cheaply.\n\n#ScrapRate #ElectronicsQuality #PCBProduction #SMTAssembly #AOI`,
    `4–11% of production cost going to rework is a margin problem.\n\n${PROBLEM_DATA['rework-scrap-cost'].stat2}.\n\nOn a $400K production run at 8% rework: $32,000 not in the estimate — before test cycles and schedule extension.\n\nFirst-pass yield is a financial metric wearing a quality label.\n\n#Rework #ElectronicsManufacturing #PCBProduction #FirstPassYield #EMS`,
  ],
  'compliance-risk': [
    `ITAR violation: $250,000 minimum penalty. Program suspension. No warning.\n\n${PROBLEM_DATA['compliance-risk'].stat3}.\n\nEMS partner compliance verification is a 30-minute task. It's a screening criterion — not an assumption.\n\nThe OEM who directed non-compliant manufacturing carries equal liability.\n\n#ITAR #ElectronicsCompliance #DefenseElectronics #EMS #ComplianceRisk`,
    `A compliance hold on a medical device program:\n\n${PROBLEM_DATA['compliance-risk'].stat1}.\n\n4–8 weeks. With an FDA submission pending. That's a market entry delay — not just a schedule event.\n\nPre-production compliance review before every regulated program. Not after the first hold.\n\n#MedicalDevice #FDACompliance #ElectronicsManufacturing #ISO13485 #ComplianceReview`,
    `${PROBLEM_DATA['compliance-risk'].stat2}.\n\n3x higher audit failure rate without traceability documentation.\n\nTraceability is not paperwork. It's the evidence that a controlled process produced a controlled product.\n\nSpecify it in the EMS contract before production — not during an audit.\n\n#Traceability #ElectronicsQuality #IPC #ISO9001 #RegulatoryCompliance`,
  ],
  'scaling-complexity': [
    `Prototype: 20 units, bench-built, 100% functional.\nFirst production run: 500 units, 22% failure rate. Same design.\n\n${PROBLEM_DATA['scaling-complexity'].stat1}.\n\nDFM review before layout completion prevents the production failures that prototype builds never surface.\n\n#DFM #PCBDesign #ElectronicsManufacturing #HardwareScaling #NPI`,
    `Scaling without NPI:\n- 45–65% more defects in first three runs\n- 8–16 weeks to stabilize yield\n- 12–28% higher per-unit cost from ECOs\n\n${PROBLEM_DATA['scaling-complexity'].stat2}.\n\nNPI is not timeline overhead. It's the process that converts prototype success into production success.\n\n#NPI #ElectronicsManufacturing #PCBProduction #HardwareDevelopment #DFM`,
    `ECOs during production scaling cost 12–28% more per unit than designs frozen at production entry.\n\n${PROBLEM_DATA['scaling-complexity'].stat3}.\n\nThose ECOs were predictable. The DFM review is what makes them predictable before production — where they're inexpensive.\n\n#ECO #PCBDesign #ElectronicsManufacturing #DFM #ProductionScaling`,
  ],
  'cost-leakage': [
    `8–18% above budgeted production cost. Not one event. Twelve small decisions.\n\n${PROBLEM_DATA['cost-leakage'].stat1}.\n\nEach substitution approval. Each rework cycle. Each test coverage gap.\n\nCost leakage is controllable — but only if it's tracked at the decision point, not discovered at close-out.\n\n#ProductionCost #ElectronicsManufacturing #BOMManagement #CostControl #EMS`,
    `The substitution saved $0.15/unit.\nThe qualification test cost $8,000.\nThe re-verification took two weeks.\n\n${PROBLEM_DATA['cost-leakage'].stat2}.\n\nTrack the total burden of every substitution — not just the component delta.\n\n#BOM #ComponentSubstitution #ElectronicsManufacturing #CostManagement #ProgramManagement`,
    `20–35% of field failures are shipping escapes — defects that passed internal inspection.\n\n${PROBLEM_DATA['cost-leakage'].stat3}.\n\nThe test coverage decision made during program setup determines that rate.\n\nIt's a cost decision. The field return data reveals which way it went.\n\n#ShippingEscape #FieldReturns #ElectronicsQuality #TestCoverage #PCBProduction`,
  ],
  'poor-manufacturing-decisions': [
    `The cheapest EMS quote removed the inspection infrastructure from scope.\n\n${PROBLEM_DATA['poor-manufacturing-decisions'].stat2}.\n\n2.5x more quality events. The savings disappeared at week 8 of production.\n\nEMS selection is a manufacturing decision. Evaluate it with production criteria, not just quote price.\n\n#EMSSelection #ElectronicsManufacturing #QualityControl #PCBAssembly #HardwareDevelopment`,
    `Wrong via type: $12/board × 5,000 boards = $60,000 in avoidable fabrication cost.\n\n${PROBLEM_DATA['poor-manufacturing-decisions'].stat3}.\n\nDetermined in a CAD tool. Before the first board was ordered.\n\nA 30-minute DFM call with the EMS partner would have caught it at layout stage.\n\n#DFM #PCBDesign #ElectronicsManufacturing #PCBFabrication #HardwareEngineering`,
    `DFM bypass: 22–40% higher production cost.\n\n${PROBLEM_DATA['poor-manufacturing-decisions'].stat1}.\n\nOn a 5,000-unit program at $45/board, 30% premium = $67,500 determined before the first Gerber was submitted.\n\nDFM review is cost control at the design stage. It's the highest-ROI intervention in the program.\n\n#DFMReview #PCBDesign #ElectronicsManufacturing #ProductionCost #HardwareDevelopment`,
  ],
}

const STORY_SEQUENCES: Record<string, string> = {
  'manufacturing-bottlenecks': "Frame 1: 'Your PCB program is behind schedule.' → Frame 2: 'The bottleneck isn't on the assembly floor.' → Frame 3: 'It's in the design handoff. In component kitting. In inter-vendor coordination.' → Frame 4: [Cost stat] → Frame 5: 'The fix: one EMS partner. One timeline. One point of accountability.' → Frame 6: CTA: 'Swipe up to map your bottleneck surfaces.'",
  'supplier-inconsistency': "Frame 1: 'The component arrived at kitting.' → Frame 2: 'It wasn't the approved part.' → Frame 3: 'Production holds. Sourcing scrambles.' → Frame 4: [Stat: 3x more holds with 4+ distributors] → Frame 5: 'Pre-qualified alternates prevent this. Every time.' → Frame 6: CTA: 'Swipe up for the approved alternate qualification process.'",
  'qa-failures': "Frame 1: 'QA failure caught in inspection: rework cycle.' → Frame 2: 'Same failure in the field: recall.' → Frame 3: '6–10x higher correction cost post-assembly.' → Frame 4: 'BGA and QFN: invisible without X-ray.' → Frame 5: 'SPI + AOI + X-ray: the inspection architecture that prevents field returns.' → Frame 6: CTA: 'Swipe up for the inspection stage checklist.'",
  'production-delays': "Frame 1: 'PCB delivery: 2 weeks late.' → Frame 2: 'Firmware team: idle.' → Frame 3: '$3,000/day × 2 teams × 14 days = $84,000.' → Frame 4: '71% of hardware launch overruns start here.' → Frame 5: 'Manufacturing readiness review: the 2-hour process that prevents this.' → Frame 6: CTA: 'Swipe up for the readiness checklist.'",
  'component-shortages': "Frame 1: 'The component went on allocation.' → Frame 2: 'No approved alternate. Production in 8 weeks.' → Frame 3: 'Options: spot market at 300% premium or design respin at +14 weeks.' → Frame 4: 'Both were preventable.' → Frame 5: 'Approved alternate strategy: qualify before production is scheduled.' → Frame 6: CTA: 'Swipe up for the component risk framework.'",
  'rework-scrap-cost': "Frame 1: 'BGA rework: 6 hours.' → Frame 2: 'Risk of pad lift. Risk of adjacent component stress.' → Frame 3: 'Full test repeat required.' → Frame 4: '4–11% of production cost to rework is a margin problem.' → Frame 5: 'SPI + AOI + X-ray: catch the defect before it becomes a rework event.' → Frame 6: CTA: 'Swipe up to model your rework cost reduction.'",
  'compliance-risk': "Frame 1: 'ITAR violation.' → Frame 2: '$250,000 minimum penalty. No warning.' → Frame 3: 'Program suspension. Export compliance review.' → Frame 4: 'The EMS partner wasn't ITAR-registered. You assumed they were.' → Frame 5: 'Pre-production compliance verification: 30 minutes.' → Frame 6: CTA: 'Swipe up for the compliance verification checklist.'",
  'scaling-complexity': "Frame 1: 'Prototype: 100% functional.' → Frame 2: 'First production run: 22% failure rate.' → Frame 3: 'Same design. Different manufacturing reality.' → Frame 4: 'DFM review catches what prototype builds never surface.' → Frame 5: 'NPI process: DFM review + first-article inspection + yield gate = production success.' → Frame 6: CTA: 'Swipe up for the NPI process checklist.'",
  'cost-leakage': "Frame 1: 'Program budget: $600K.' → Frame 2: 'Final cost: $689K.' → Frame 3: 'No single event. Twelve small decisions.' → Frame 4: 'Substitutions. Rework cycles. Test gaps. Each approved. None aggregated.' → Frame 5: 'Rolling cost model: track at the decision point, not at close-out.' → Frame 6: CTA: 'Swipe up for the program cost tracking framework.'",
  'poor-manufacturing-decisions': "Frame 1: 'Cheapest EMS quote selected.' → Frame 2: 'Week 8: first quality event.' → Frame 3: '2.5x more quality events with price-based selection.' → Frame 4: 'The inspection capability wasn't in the quote. It showed up in production.' → Frame 5: 'EMS selection criteria: process capability, not bid price.' → Frame 6: CTA: 'Swipe up for the EMS evaluation criteria framework.'",
}

const SUGGESTED_VISUALS: Record<string, string[]> = {
  'manufacturing-bottlenecks': ['B-roll of an active SMT assembly line with component placement close-up', 'Animated diagram of a multi-vendor handoff chain with a hold point highlighted', 'Time-lapse of an engineering team at idle workstations — contrasted with active board delivery'],
  'supplier-inconsistency': ['Close-up of incoming component inspection with AML documentation', 'Split-screen: approved component datasheet vs. non-approved substitute datasheet', 'Component kitting tray with one empty position labeled with the hold reason'],
  'qa-failures': ['X-ray image of BGA package showing solder joint voiding', 'AOI machine in operation — annotated with defect type caught vs. missed without it', 'Split-screen: in-process defect detection vs. field return process flowchart'],
  'production-delays': ['Annotated PCB release checklist with incomplete items highlighted', 'Timeline graphic showing delay cascade from PCB hold through firmware integration and launch', 'Engineering team workstation at idle — boards expected, none arrived'],
  'component-shortages': ['BOM excerpt with long-lead component row highlighted — "No approved alternate"', 'Allocation curve graphic showing price spike on spot market', 'Side-by-side of approved primary component vs. pre-qualified alternate — same footprint'],
  'rework-scrap-cost': ['BGA rework station under microscope — detailed, technical, high contrast', 'Scrap bin beside an SMT line with boards that didn\'t pass inspection', 'Process flow graphic: defect at paste print → compounds through placement → expensive at final inspection'],
  'compliance-risk': ['ITAR registration certificate document — focused on the scope and registration status', 'Device history record binder — traceability documentation for a medical device program', 'Compliance checklist graphic: items checked vs. unchecked before production release'],
  'scaling-complexity': ['Prototype board (hand-assembled) side by side with first SMT production board', 'Yield curve graph: defect rate across production runs 1–8 with and without NPI process', 'DFM review session: PCB layout on screen with EMS engineer annotations'],
  'cost-leakage': ['Cost waterfall chart: original estimate vs. final cost with each leakage category labeled', 'Approved exception form stack — each one small, collectively significant', 'Program cost model dashboard showing real-time tracking against budget'],
  'poor-manufacturing-decisions': ['PCB CAD layout with a via annotation highlighting fill requirement and cost impact', 'Three EMS quote cards: lowest price selected, quality event cost overlaid in red', 'DFM review annotation on PCB layout: "Change via type here — saves $12/board"'],
}

const REPURPOSING: Record<string, string[]> = {
  'manufacturing-bottlenecks': ['Turn the carousel into a LinkedIn post using slides 1–3 as the post body', 'Use the visual hook as a YouTube Shorts opening with SMT B-roll', 'Convert the caption into a Facebook educational post for operations managers'],
  'supplier-inconsistency': ['Turn the carousel into a Twitter thread — one slide per tweet', 'Use the on-screen text as a LinkedIn single-image post hook', 'Convert the story sequence into a Facebook retargeting post'],
  'qa-failures': ['Expand the caption into a LinkedIn post on inspection architecture as cost control', 'Use the X-ray visual hook as a YouTube Shorts opening', 'Convert the carousel into a Facebook educational post with the inspection checklist'],
  'production-delays': ['Turn the carousel into a LinkedIn post focused on the 71% statistic', 'Use the timeline graphic as a YouTube Shorts visual', 'Convert the story sequence into a Facebook discussion prompt for hardware program managers'],
  'component-shortages': ['Expand the caption into a LinkedIn post on the approved alternate strategy', 'Use the allocation curve graphic as a YouTube Shorts visual', 'Convert the carousel into a Twitter thread on component risk management'],
  'rework-scrap-cost': ['Turn the three-cost carousel into a LinkedIn post', 'Use the BGA rework visual as a YouTube Shorts hook', 'Convert the caption into a Facebook educational post with the inspection stage checklist'],
  'compliance-risk': ['Expand the ITAR caption into a LinkedIn post for engineering managers in defense programs', 'Use the compliance checklist visual as a YouTube Shorts opening', 'Convert the story sequence into a Facebook retargeting post for regulated market programs'],
  'scaling-complexity': ['Turn the DFM review carousel into a LinkedIn post for hardware engineers approaching production scaling', 'Use the yield curve graphic as a YouTube Shorts visual', 'Convert the caption into a Facebook educational post on NPI process benefits'],
  'cost-leakage': ['Expand the cost waterfall caption into a LinkedIn post', 'Use the cost model dashboard visual as a YouTube Shorts hook', 'Convert the story sequence into a Facebook discussion prompt for engineering program managers'],
  'poor-manufacturing-decisions': ['Turn the DFM bypass cost carousel into a LinkedIn post', 'Use the via cost annotation visual as a YouTube Shorts opening', 'Convert the caption into a Facebook educational post on EMS selection criteria'],
}

export function generateInstagram(inputs: InstagramInputs, seed: number = 0): InstagramOutput {
  const v = seed % 3
  const p = inputs.problem
  const fmt = inputs.contentFormat

  const visualHook = (VISUAL_HOOKS[p] ?? VISUAL_HOOKS['manufacturing-bottlenecks'])[v] ?? ''
  const onScreenText = (ON_SCREEN_TEXTS[p] ?? ON_SCREEN_TEXTS['manufacturing-bottlenecks'])[v] ?? ''
  const caption = (CAPTIONS[p] ?? CAPTIONS['manufacturing-bottlenecks'])[v] ?? ''

  const isCarousel = fmt === 'carousel'
  const isStory = fmt === 'story'
  const isReel = fmt === 'reel'

  let scriptOrSlides: string[]
  if (isCarousel) {
    const carouselArr = CAROUSEL_SLIDES[p] ?? CAROUSEL_SLIDES['manufacturing-bottlenecks']
    scriptOrSlides = carouselArr[0] ?? []
  } else if (isStory) {
    scriptOrSlides = [STORY_SEQUENCES[p] ?? STORY_SEQUENCES['manufacturing-bottlenecks']]
  } else {
    const reelScript = `OPENING (0:00–0:03): ${onScreenText}\n\nHOOK LINE: ${visualHook}\n\nBODY (0:03–0:20):\n${PROBLEM_DATA[p]?.stat1 ?? ''}\n\n${PROBLEM_DATA[p]?.stat2 ?? ''}\n\nCLOSING (0:20–0:30): ${PROBLEM_DATA[p]?.consequence ?? ''}\n\nCTA: Follow for weekly electronics manufacturing content.`
    scriptOrSlides = [reelScript]
  }

  const cta = isReel
    ? 'Follow for weekly electronics manufacturing and PCB production content.'
    : isStory
    ? 'Swipe up to learn more about electronics manufacturing cost control.'
    : 'Save this post. Share it with your engineering or operations team.'

  const suggestedVisuals = SUGGESTED_VISUALS[p] ?? SUGGESTED_VISUALS['manufacturing-bottlenecks']
  const repArr = REPURPOSING[p] ?? REPURPOSING['manufacturing-bottlenecks']

  const qualityScore = scoreContent(inputs, true, true, true, caption.split(' ').length)

  const improvementSuggestions = [
    'Add a specific product category (medical device, IoT hardware, defense electronics) to make the visual scenario recognizable to your target audience.',
    'Use a real X-ray image or AOI screenshot with permission — specific technical visuals outperform generic manufacturing stock photography in electronics engineering audiences.',
    'Add a quantified result to the final carousel slide or story frame — the specific cost saved or prevented — to close the content with a concrete outcome.',
  ]

  return {
    platform: 'instagram',
    visualHook,
    onScreenText,
    scriptOrSlides,
    caption,
    cta,
    suggestedVisuals,
    repurposingSuggestions: repArr.slice(0, 3),
    qualityScore,
    improvementSuggestions,
  }
}
