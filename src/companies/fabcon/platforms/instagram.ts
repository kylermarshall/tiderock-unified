import type { InstagramInputs, InstagramOutput } from '../types'
import { PROBLEM_DATA } from '../lib/companyProfile'
import { scoreContent } from '../lib/scoring'

const VISUAL_HOOKS: Record<string, string[]> = {
  'fabrication-bottlenecks': [
    'Close-up of a weld table with a stack of unprocessed parts — no welder in sight. Caption overlay: "This is what a bottleneck looks like from upstream."',
    'Split-screen: fabrication shop in motion (left) versus idle field crew on a commercial site (right). Overlay: "These two locations are connected."',
    'Overhead shot of a multi-station fab floor with one station empty and a queue backed up behind it. Text: "One handoff. Four weeks of delay."',
  ],
  'production-delays': [
    'Time-lapse of an empty commercial job site — no workers, equipment staged but idle. Overlay: "Three trades. Waiting. $2,500/day each."',
    'Close-up of a project schedule with multiple bars highlighted red. Single annotation: "This is what a fabrication delay looks like at the project level."',
    'Split shot: fabrication shop with "in production" sign and a mobilized field crew waiting. Overlay: "The cost isn\'t where the delay is."',
  ],
  'rework-scrap-cost': [
    'Close-up of a structural weld being inspected, red marker indicating a rejection. Overlay: "This is what 8 hours of remediation looks like."',
    'Scrap pile of cut steel next to a finished structural component. Overlay: "One of these was in the quote. One was waste."',
    'Before/after split of a structural component — incorrect cut versus corrected. Overlay: "Two weeks of timeline in this image."',
  ],
  'labor-inefficiency': [
    'Wide shot of a busy fab shop — every station occupied. Text overlay: "Full capacity. Still running over." Subtext: "This is what poor sequencing looks like."',
    'Close-up of a job routing sheet with multiple status changes and wait times marked. Overlay: "The variance report starts here."',
    'Two identical shop floors: one with clear job routing signage, one without. Overlay: "One delivers on time. Same equipment. Different process."',
  ],
  'poor-project-coordination': [
    'Three separate vendor locations highlighted on a map — connected by dotted lines. Overlay: "Every dotted line is a coordination surface. Every surface is a risk."',
    'Whiteboard with vendor communication matrix — showing gaps and unresolved specification questions. Overlay: "This is the conversation that should happen before production."',
    'Two sets of drawings side by side — same part, different weld symbol interpretations circled. Overlay: "Same drawing. Different shop. Different part."',
  ],
  'missed-deadlines': [
    'Calendar with a delivery date circled and two penalty amounts shown for week-one and week-two slips. Overlay: "This is what a penalty clause looks like in real dollars."',
    'Close-up of a fabrication shop\'s production board showing a job behind schedule. Overlay: "They knew. You didn\'t. That gap has a price."',
    'Three trades mobilized on a job site, workers sitting idle with equipment around them. Overlay: "The delivery date passed. Three clocks are running."',
  ],
  'cost-overruns': [
    'Side-by-side: original fabrication bid document versus final invoice with higher total. Overlay: "18–28% over. Predictable pattern."',
    'Close-up of a change order document — specific line items highlighted. Overlay: "All of this was in the drawing package. Undiscovered."',
    'Pre-production review meeting screenshot — checklist visible. Overlay: "One meeting. 3x fewer overruns."',
  ],
  'quality-inconsistency': [
    'Four identical structural components from four different vendors — one clearly out of spec. Overlay: "Same drawing. Four shops. Four different tolerances."',
    'Inspection report showing rejection column — 20% highlighted. Overlay: "This isn\'t a bad vendor. This is a multi-vendor standard problem."',
    'Split comparison: single-source weld quality versus multi-vendor weld quality on same component. Overlay: "Consistency is a structure decision, not a vendor decision."',
  ],
  'equipment-downtime': [
    'CNC plasma table — powered down, maintenance crew working on it. Production queue visible on whiteboard behind. Overlay: "$4,500/hour. Counting."',
    'Side-by-side: equipment maintenance log (detailed) versus no maintenance log. Overlay: "One produces 60% less downtime. Which one does your vendor use?"',
    'Empty cutting station with a queue of steel waiting. Overlay: "The machine is down. The jobs aren\'t moving. The deadlines are."',
  ],
  'material-waste': [
    'Overhead shot of a cut steel sheet — programmed nesting (tight, efficient) versus manual layout (large gaps, waste visible). Overlay: "Same part. 18% difference."',
    'Scrap bin full of steel offcuts next to a finished part. Text: "You paid for everything in this image."',
    'Two quotes side-by-side — same scope, different totals. Annotation: "The difference is nesting efficiency. Not steel price."',
  ],
}

const ON_SCREEN_TEXTS: Record<string, string[]> = {
  'fabrication-bottlenecks': [
    "Your fab program has 3 vendors\nand no coordination owner.\n\nThe bottleneck is already built in.",
    "One vendor runs late.\nForming stops.\nWelding waits.\nInstallation pushes.\n\n4 weeks. 1 handoff failure.",
    "The bottleneck started upstream.\nYou found it downstream.\n\nThat gap costs $2,500/day.",
  ],
  'production-delays': [
    "Fab delivery: late.\n3 trades on-site.\n$2,500/day each.\n\nThat's $7,500/day.\nAnd counting.",
    "68% of project overruns\nstart in fabrication.\n\nNot on-site.\nNot in weather.\nIn the fab shop.",
    "15–25% timeline extension.\nEvery project.\nAlmost no project\nhas 25% contingency.",
  ],
  'rework-scrap-cost': [
    "One incorrect weld.\n8 hours of remediation.\n2 weeks of delay.\n\nThat's the math on\nskipping first-article inspection.",
    "Rework: 3 costs.\n\n1. Material\n2. Labor\n3. Schedule\n\nMost teams only track one.",
    "5–12% of project cost\ngoes to rework in\nshops without QC process.\n\nOn $500K: that's $60K.",
  ],
  'labor-inefficiency': [
    "Labor = 40% of fab cost.\nLabor efficiency: unmeasured.\n\nThe variance report\nexplains why.",
    "20–35% productivity loss\nfrom poor sequencing.\n\nThe shop looks busy.\nThe job runs over anyway.",
    "480 hours estimated.\n630 hours actual.\n\nNobody asked about\nthe shop floor system\nbefore ordering.",
  ],
  'poor-project-coordination': [
    "3 vendors.\nNo coordination owner.\n\n1 in 4 complex projects\nhas a spec error.\n\nThis is how.",
    "Fabrication. Finishing.\nDelivery.\n\n3 handoffs.\n3 risk surfaces.\n\n40% of late projects\nfail here.",
    "2.3x more failures\nwith 3+ vendors.\n\nNot bad vendors.\nBad structure.",
  ],
  'missed-deadlines': [
    "$25,000/week\nin penalty exposure.\n\nMost project managers\nnever ran this number.",
    "The vendor said 4 weeks.\nWeek 3: 'We need 2 more.'\n\n72% of PMs can't\nforecast fab timing.",
    "3–6 week installation push\nfrom one missed fab date.\n\nEvery downstream trade\npays the price.",
  ],
  'cost-overruns': [
    "Lowest bid.\nHighest final cost.\n\nPredictable pattern.\n18–28% over on\ncomplex structural programs.",
    "The change order\nstarts the same way:\n\n'We found something\nduring production.'\n\nIt was in the drawing.\nUndiscovered.",
    "Front-end review:\n3x fewer overruns.\n\nMost programs skip it\nto save time.\n\nAnd pay more.",
  ],
  'quality-inconsistency': [
    "4 vendors.\n3x more dimensional failures\nthan 1 vendor.\n\nSame drawings.\nDifferent standards.",
    "20% rejection\nat first inspection.\n\nNot one bad shop.\nNo unified QC standard.\n\nStructural problem.",
    "Quality inconsistency\nis discovered after delivery.\n\nNever earlier.\n\nBy then: maximum\ncost to fix.",
  ],
  'equipment-downtime': [
    "$4,500/hour\nwhen the CNC goes down.\n\n6–12 unplanned hours/month\nat 80%+ utilization.\n\nThe math is clear.",
    "One machine fails.\nCutting stops.\nForming waits.\nWelding idles.\n\nThe cascade is immediate.",
    "Preventive maintenance:\n40–60% less downtime.\n\nMost shops run reactive.\n\nYour delivery date\npays the difference.",
  ],
  'material-waste': [
    "12–22% plate waste\nfrom manual nesting.\n\nOn $200K material:\n$40K purchased and scrapped.\n\nIn your quote. No label.",
    "Manual vs. programmed nesting:\n2–3x waste difference.\n\nSame steel.\nSame drawings.\nDifferent cost basis.",
    "$8–$30/sq ft\nof wasted plate.\n\nBuilt into the quote\nas 'material cost.'\n\nNot labeled as waste.",
  ],
}

const CAROUSEL_SLIDES: Record<string, string[][]> = {
  'fabrication-bottlenecks': [
    [
      "SLIDE 1\n────────\nYour fabrication\nbottleneck was created\nbefore production started.",
      "SLIDE 2\n────────\nMost programs use\n3+ vendors.\n\nCutting. Forming. Welding.\nAll separate.",
      "SLIDE 3\n────────\nEvery vendor handoff\nis a coordination surface.\n\nEvery surface\nis a delay risk.",
      `SLIDE 4\n────────\n${PROBLEM_DATA['fabrication-bottlenecks'].stat2}.\n\n30–50% more stoppages.\nPredictable structure.\nPredictable outcome.`,
      `SLIDE 5\n────────\nWhen forming falls behind:\n\n→ Welding can't start\n→ Assembly waits\n→ Delivery slips\n→ Field crews idle\n\n${PROBLEM_DATA['fabrication-bottlenecks'].cost1}.`,
      "SLIDE 6\n────────\nThe bottleneck was visible\nin week 2.\n\nThe PM found it\nin week 4.\n\nThat gap\nhas a dollar value.",
      "SLIDE 7\n────────\nThe fix:\nSingle-source fabrication.\n\nOne shop. One timeline.\nOne accountability point.\n\nNo inter-vendor\nhandoff failures.",
      "SLIDE 8\n────────\nBefore your next\nfabrication program:\n\nCount the vendor handoffs.\nAssign coordination ownership.\nOr consolidate to one source.\n\n→ fabcon.com",
    ],
    [
      "SLIDE 1\n────────\n4 signs your fabrication\nprogram is built\nfor a bottleneck:",
      "SLIDE 2\n────────\nSign 1:\n3+ vendors with\nno coordination owner.\n\nHandoffs happen.\nNobody owns them.",
      "SLIDE 3\n────────\nSign 2:\nVendors report\nindividual progress.\n\nNobody tracks\ninter-vendor sequence.",
      "SLIDE 4\n────────\nSign 3:\nDelivery date is set.\nProduction milestones\naren't.",
      `SLIDE 5\n────────\nSign 4:\nNo escalation protocol\nif a vendor runs late.\n\n${PROBLEM_DATA['fabrication-bottlenecks'].stat3}.\nThe cascade is predictable.`,
      "SLIDE 6\n────────\nAll 4 signs are\nstructural.\n\nNot vendor quality.\nNot bad luck.",
      "SLIDE 7\n────────\nThe cost:\n2–4 weeks of downstream\nproject delay.\n\nIdle crews.\nExtended GC.\nPenalty exposure.",
      "SLIDE 8\n────────\nFix the structure\nbefore production starts.\n\nNot after the\nbottleneck appears.\n\n→ fabcon.com",
    ],
  ],
  'production-delays': [
    [
      "SLIDE 1\n────────\nFabrication delays\ndon't stay\nin the fab shop.",
      "SLIDE 2\n────────\nThey travel downstream.\n\nAnd every downstream\ntrade has a daily cost.",
      `SLIDE 3\n────────\n${PROBLEM_DATA['production-delays'].stat2}.\n\n$800–$2,500/day\nper trade.\n\nPer trade.`,
      "SLIDE 4\n────────\n3 trades on-site.\n3-week delay.\n\n$168K–$525K\nin idle labor.\n\nBefore any change orders.",
      `SLIDE 5\n────────\n${PROBLEM_DATA['production-delays'].stat3}.\n\n68% of overruns.\n\nNot weather.\nNot labor disputes.\nFabrication.`,
      "SLIDE 6\n────────\nThe planning failure:\n\nFab timing is assumed.\nNot confirmed.\nNot stress-tested.\n\n72% of PMs can't\nforecast it reliably.",
      "SLIDE 7\n────────\nThe fix:\n\n→ Production visibility between\n   order and delivery\n→ Vendor capacity confirmation\n   before order placement\n→ Escalation protocol\n   when milestones slip",
      "SLIDE 8\n────────\nFabrication timing is\nthe most impactful\nvariable in project delivery.\n\nManage it like one.\n\n→ fabcon.com",
    ],
  ],
  'rework-scrap-cost': [
    [
      "SLIDE 1\n────────\nRework in fabrication\nhas 3 costs.\n\nMost teams\ntrack 1.",
      "SLIDE 2\n────────\nCost 1:\nMaterial.\n\nThe steel that was\nwrong and must\nbe replaced.",
      "SLIDE 3\n────────\nCost 2:\nLabor.\n\n4–8 hours per structural\nrework event.\n\nBefore parts, lift,\nor production disruption.",
      "SLIDE 4\n────────\nCost 3 (the real cost):\nSchedule.\n\nThe delivery date\nthat moves.\nThe installation\nthat shifts.\nThe crews that wait.",
      `SLIDE 5\n────────\n${PROBLEM_DATA['rework-scrap-cost'].stat1}.\n\nOn $500K: $25K–$60K.\n\nDirect cost only.\nSchedule cost is\nalways larger.`,
      `SLIDE 6\n────────\nThe prevention:\n\nFirst-article inspection\nbefore full production run.\n\n${PROBLEM_DATA['rework-scrap-cost'].stat3}.\nWell-run shops: 2–4% scrap.`,
      "SLIDE 7\n────────\nAsk your vendor:\n\n→ What is your scrap rate\n   on comparable programs?\n→ What is your QC checkpoint\n   process?\n→ Do you run first-article\n   inspection?",
      "SLIDE 8\n────────\nThe inspection is\nnot a cost.\n\nIt's the mechanism\nthat keeps discovery\nearly — and cost low.\n\n→ fabcon.com",
    ],
  ],
  'cost-overruns': [
    [
      "SLIDE 1\n────────\nThe lowest fabrication bid\nrarely produces\nthe lowest final cost.",
      "SLIDE 2\n────────\nHere's the pattern:\n\nBid optimistically.\nDiscover scope gaps\nduring production.\nIssue change orders.",
      `SLIDE 3\n────────\n${PROBLEM_DATA['cost-overruns'].stat1}.\n\nComplex structural programs.\nConsistently.\n\nNot random. Predictable.`,
      `SLIDE 4\n────────\n${PROBLEM_DATA['cost-overruns'].stat2}.\n\n$12K–$85K per program.\n\nFrom gaps that existed\nin the drawings\nbefore order placement.`,
      `SLIDE 5\n────────\n${PROBLEM_DATA['cost-overruns'].stat3}.\n\n3x more overruns.\n\nOne meeting before production\nvs. change orders during it.`,
      "SLIDE 6\n────────\nThe front-end review covers:\n\n→ Drawing completeness\n→ Specification clarity\n→ Tolerance confirmation\n→ Surface treatment alignment\n→ Weld standard confirmation",
      "SLIDE 7\n────────\nThe review cost:\nFixed. Known. Small.\n\nThe overrun cost:\nVariable. Large.\nNon-negotiable after\nproduction starts.",
      "SLIDE 8\n────────\nRun the review.\n\nThe ROI is explicit.\nThe pattern is consistent.\nThe choice is yours.\n\n→ fabcon.com",
    ],
  ],
  'missed-deadlines': [
    [
      "SLIDE 1\n────────\nThe fabrication vendor\nsaid 4 weeks.\n\nAt week 4:\n'We need 2 more.'",
      "SLIDE 2\n────────\nWhere the project is now:\n\n→ Penalty clause: active\n→ Trades: on standby\n→ General conditions: extending\n→ Schedule: restructuring",
      `SLIDE 3\n────────\n${PROBLEM_DATA['missed-deadlines'].stat2}.\n\n$5K–$25K/week.\n\nThe clause was signed.\nNobody priced the risk.`,
      `SLIDE 4\n────────\n${PROBLEM_DATA['missed-deadlines'].stat3}.\n\n72% of PMs can't\nforecast fab timing.\n\nThe four-week commitment\nwasn't confirmed\nagainst production capacity.`,
      "SLIDE 5\n────────\nAsk before you order:\n\n→ Current production backlog?\n→ Material procurement status?\n→ Equipment utilization for this job?\n→ Production milestones — not just delivery date?",
      "SLIDE 6\n────────\nAsk during production:\n\n→ Weekly milestone updates\n→ Escalation protocol if\n   a milestone is missed\n→ Flag early — not the\n   day before delivery",
      "SLIDE 7\n────────\nA missed deadline\nis never a surprise\nto the vendor.\n\nIt's almost always\na surprise to\nthe customer.",
      "SLIDE 8\n────────\nClose that information gap\nbefore it becomes\na penalty gap.\n\n→ fabcon.com",
    ],
  ],
  'quality-inconsistency': [
    [
      "SLIDE 1\n────────\nQuality inconsistency\nin fabrication is always\na structure problem.\n\nNot a vendor problem.",
      "SLIDE 2\n────────\nHere's the structure:\n\n4 vendors.\n4 sets of process standards.\n4 interpretations of\nthe same drawing.",
      `SLIDE 3\n────────\n${PROBLEM_DATA['quality-inconsistency'].stat3}.\n\n3x more dimensional failures.\n\nSame drawings.\nDifferent standards.\nPredictable outcome.`,
      `SLIDE 4\n────────\n${PROBLEM_DATA['quality-inconsistency'].stat1}.\n\n8–20% rejection\nat first inspection.\n\nDiscovered at delivery.\nNot during production.`,
      `SLIDE 5\n────────\n${PROBLEM_DATA['quality-inconsistency'].stat2}.\n\n$150–$400 per event.\n\nAt 30 rejection events:\n$4,500–$12,000 direct cost.\nPlus: 3–4 weeks of delay.`,
      "SLIDE 6\n────────\nThe fix:\n\nProject-specific QC documentation\nissued to every vendor\nbefore production starts.\n\nFirst-article inspection results\nrequired before full run.",
      "SLIDE 7\n────────\nOr: single-source fabrication.\n\nOne shop. One standard.\nConsistently applied.\n\n3x fewer failures.\nPredictable delivery.",
      "SLIDE 8\n────────\nConsistency is designed.\nNot hoped for.\n\nDesign it into\nyour program structure.\n\n→ fabcon.com",
    ],
  ],
  'labor-inefficiency': [
    [
      "SLIDE 1\n────────\nLabor is 40% of\nfabrication cost.\n\nIt's also the variable\nmost shops don't measure.",
      "SLIDE 2\n────────\nWhat most shops measure:\n\n→ Equipment utilization\n→ Parts completed\n→ Hours clocked",
      "SLIDE 3\n────────\nWhat most shops\ndon't measure:\n\n→ Labor hours per unit\n→ Productivity per station\n→ Efficiency by job type",
      `SLIDE 4\n────────\n${PROBLEM_DATA['labor-inefficiency'].stat1}.\n\n20–35% productivity loss\nfrom poor sequencing.\n\nThe shop is busy.\nThe job runs over.`,
      `SLIDE 5\n────────\n${PROBLEM_DATA['labor-inefficiency'].stat2}.\n\n6–10 hours/week per supervisor\non status chasing.\n\nNot managing production.\nManaging information gaps.`,
      `SLIDE 6\n────────\n${PROBLEM_DATA['labor-inefficiency'].stat3}.\n\nAt 40% of fab cost,\na 25% productivity gap\n= 10% total cost overrun.\n\nOn every job.`,
      "SLIDE 7\n────────\nThe fix:\n\n→ Sequenced job routing\n→ Visual management systems\n→ Clear handoff protocols\n→ Supervisor time on production — not coordination",
      "SLIDE 8\n────────\nLabor efficiency is\ndesigned before production.\n\nMeasure it.\nManage it.\n\n→ fabcon.com",
    ],
  ],
  'equipment-downtime': [
    [
      "SLIDE 1\n────────\nOne machine fails.\n\nCutting stops.\nForming waits.\nWelding idles.\n\nYour delivery date moves.",
      `SLIDE 2\n────────\n${PROBLEM_DATA['equipment-downtime'].stat1}.\n\n$1,200–$4,500/hour.\n8 unplanned hours:\n$9,600–$36,000\nin throughput loss.`,
      `SLIDE 3\n────────\n${PROBLEM_DATA['equipment-downtime'].stat2}.\n\n40–60% more downtime\nwithout preventive maintenance.\n\nThe premium is in\nyour delivery dates.`,
      `SLIDE 4\n────────\n${PROBLEM_DATA['equipment-downtime'].stat3}.\n\n6–12 unplanned hours/month\nat 80%+ utilization.\n\nHigh utilization + no maintenance\n= scheduled failure.`,
      "SLIDE 5\n────────\nThe maintenance program question:\n\nAsk your vendor:\n→ What's your PM schedule\n   for critical equipment?\n→ What's your downtime frequency\n   per machine per month?\n→ How do you handle a failure\n   mid-program?",
      "SLIDE 6\n────────\nThe answer tells you:\n\n→ Whether the lead time\n   they quoted is achievable\n→ Whether your delivery\n   is exposed to unplanned risk\n→ Whether this vendor plans\n   or reacts",
      "SLIDE 7\n────────\nThe financial case:\n\nPreventive maintenance cost:\nFixed. Scheduled. Known.\n\nUnplanned downtime cost:\n$1,200–$4,500/hour.\nUnscheduled. Unavoidable\nwithout the program.",
      "SLIDE 8\n────────\nAsk the maintenance question\nbefore you order.\n\nNot after the delivery\ndate moves.\n\n→ fabcon.com",
    ],
  ],
  'material-waste': [
    [
      "SLIDE 1\n────────\nThe material waste\nin your fabrication quote\nis invisible.\n\nBut it's in there.",
      `SLIDE 2\n────────\n${PROBLEM_DATA['material-waste'].stat1}.\n\n12–22% plate waste\nfrom manual nesting.\n\nOn $200K material:\n$40K purchased and scrapped.`,
      `SLIDE 3\n────────\n${PROBLEM_DATA['material-waste'].stat3}.\n\n2–3x more waste\nwith manual layout.\n\nSame steel.\nSame drawings.\nDifferent cost basis.`,
      `SLIDE 4\n────────\n${PROBLEM_DATA['material-waste'].stat2}.\n\n$8–$30/sq ft of waste.\n\nLabeled as 'material cost.'\nNot labeled as 'waste.'`,
      "SLIDE 5\n────────\nThe difference between\n3% waste and 20% waste\non a $200K program:\n\n$34,000.\n\nIn someone's\nmaterial cost column.",
      "SLIDE 6\n────────\nThe fix:\nProgrammed nesting.\n\nCNC cut optimization.\n2–4% waste.\nNot 12–22%.\n\nSame part.\nDifferent yield.",
      "SLIDE 7\n────────\nBefore you compare quotes:\n\nAsk every vendor:\n'What is your plate yield rate\non comparable programs?'\n\nThe answer changes\nhow you read the numbers.",
      "SLIDE 8\n────────\nThe vendor who wastes\n20% is quoting from\na different cost base.\n\nKnow the base\nbefore you compare.\n\n→ fabcon.com",
    ],
  ],
  'poor-project-coordination': [
    [
      "SLIDE 1\n────────\n40% of late project\ncompletions trace to\ncoordination failures.\n\nNot vendor quality.\nNot part defects.",
      "SLIDE 2\n────────\nThe coordination gap:\n\nFabrication done.\nFinishing not aligned.\nDelivery uncoordinated.\n\nEach phase: on time.\nSequence: failed.",
      `SLIDE 3\n────────\n${PROBLEM_DATA['poor-project-coordination'].stat1}.\n\n2.3x more failures\nwith 3+ vendors.\n\nEvery added vendor\nadds a failure surface.`,
      `SLIDE 4\n────────\n${PROBLEM_DATA['poor-project-coordination'].stat2}.\n\n1 in 4 complex projects.\n\nSpecification error\nfrom a coordination gap.\nDiscovered at delivery.`,
      "SLIDE 5\n────────\nWho owns:\n\n→ Specification alignment\n   across vendors?\n→ Drawing revision distribution?\n→ Handoff protocol between\n   fabrication and finishing?\n→ Delivery coordination?\n\nIf unclear: the failure\nis already designed in.",
      "SLIDE 6\n────────\nThe fix:\n\nAssign coordination ownership\nbefore production.\nRun a pre-production\nspecification alignment meeting.\nOr consolidate to\na single-source vendor.",
      "SLIDE 7\n────────\nThe pre-production meeting:\n\n→ All vendors\n→ Specification review\n→ Tolerance confirmation\n→ Surface treatment alignment\n→ Documented sign-off\n\n2 hours. 3x fewer errors.",
      "SLIDE 8\n────────\nCoordination failures are\nalways preventable.\n\nThey're never prevented\nby accident.\n\n→ fabcon.com",
    ],
  ],
}

const REEL_SCRIPTS: Record<string, string[]> = {
  'fabrication-bottlenecks': [
    `[0:00–0:03] TEXT ON SCREEN: "Your fab program has 3 vendors and no bottleneck plan."\n[0:03–0:08] VOICEOVER: "This is what most fabrication programs look like — and here's what it costs."\n[0:08–0:15] Show cutting station, forming station, weld table — each with different crews. VOICEOVER: "Three vendors. Three timelines. Three handoff points."\n[0:15–0:22] One station goes idle — nothing coming in. VOICEOVER: "When one vendor falls behind, the cascade starts immediately."\n[0:22–0:30] On-site crew idle, tools staged. TEXT: "$2,500/day per trade. Waiting." VOICEOVER: "${PROBLEM_DATA['fabrication-bottlenecks'].stat1}. And that cost is downstream."\n[0:30–0:40] TEXT: "The fix: single-source fabrication." Show one shop managing the full sequence. VOICEOVER: "One shop. One timeline. No inter-vendor handoffs."\n[0:40–0:45] CTA on screen: "Link in bio — how to structure a fabrication program that delivers."`,
    `[0:00–0:03] TEXT: "One bottleneck. 4 weeks of project delay. Here's how it happens."\n[0:03–0:10] Overhead fab floor shot — show a process backup developing at one station. VOICEOVER: "This is visible in week 2. Most project managers don't find it until week 4."\n[0:10–0:18] TEXT overlay on station backup: "${PROBLEM_DATA['fabrication-bottlenecks'].stat3}." VOICEOVER: "When 60–70% of downstream phases depend on one sequence, a single delay touches everything."\n[0:18–0:28] Field crew idle shot. TEXT: "This is what a fabrication bottleneck looks like from the client's perspective." VOICEOVER: "${PROBLEM_DATA['fabrication-bottlenecks'].cost2}."\n[0:28–0:38] TEXT: "Structure the program before production starts." Show vendor count comparison: 3 vendors vs. 1 shop. VOICEOVER: "Vendor count is a project risk variable. Treat it like one."\n[0:38–0:45] CTA: "Follow for weekly fabrication management content."`,
  ],
  'production-delays': [
    `[0:00–0:03] TEXT: "68% of project overruns start here." Show fabrication shop. "Not on-site."\n[0:03–0:10] VOICEOVER: "When fabrication falls behind, the cost doesn't stay in the shop. It travels." Show idle field crew.\n[0:10–0:20] TEXT on screen: "$800–$2,500/day per trade." Show three trades on-site, waiting. VOICEOVER: "Three trades. $7,500/day minimum. Before a single change order."\n[0:20–0:30] TEXT: "${PROBLEM_DATA['production-delays'].stat1}." VOICEOVER: "A 20% timeline extension on a 6-month project is 5 weeks. Nobody budgets 5 weeks of contingency."\n[0:30–0:40] TEXT: "The fix: production visibility." Show milestone check-in process. VOICEOVER: "Know where your vendor is before you find out they're behind."\n[0:40–0:45] CTA: "Comment 'DELAY' — I'll share the production tracking framework."`,
  ],
  'cost-overruns': [
    `[0:00–0:03] TEXT: "The lowest bid just became the most expensive project."\n[0:03–0:10] Show change order document. VOICEOVER: "This is how it starts: 'We found something during production.'"\n[0:10–0:20] TEXT: "${PROBLEM_DATA['cost-overruns'].stat2}." VOICEOVER: "$12,000 to $85,000. In change orders from scope gaps that existed in the drawings before order placement."\n[0:20–0:30] Show front-end review checklist. TEXT: "3x fewer overruns. One meeting." VOICEOVER: "Projects that run a pre-production engineering review have three times fewer cost overruns. The review takes four hours."\n[0:30–0:40] TEXT: "The pattern is predictable." Show bid document vs. final invoice comparison. VOICEOVER: "18–28% over on complex structural programs. Consistently. Because the same planning shortcut produces the same result."\n[0:40–0:45] CTA: "Link in bio — the pre-production review checklist."`,
  ],
  'quality-inconsistency': [
    `[0:00–0:03] TEXT: "4 vendors. 20% rejection rate. This is why."\n[0:03–0:10] Show four components from four vendors. One is clearly off-spec. VOICEOVER: "Same drawing. Four shops. Four interpretations."\n[0:10–0:20] TEXT: "${PROBLEM_DATA['quality-inconsistency'].stat3}." VOICEOVER: "This isn't a quality problem. It's a structure problem — and it's predictable."\n[0:20–0:30] Show inspection report with rejections highlighted. TEXT: "$300 per remediation. 30 events. 3 weeks of delay." VOICEOVER: "Discovered at delivery. Never earlier."\n[0:30–0:40] Show single-source alternative. TEXT: "1 shop. 1 standard. 3x fewer failures." VOICEOVER: "Consistency is a design decision. Design it before production."\n[0:40–0:45] CTA: "Comment 'QC' — I'll share the pre-production quality alignment process."`,
  ],
}

const STORY_SEQUENCES: Record<string, string[]> = {
  'fabrication-bottlenecks': [
    "STORY 1: Text card — 'The fabrication program has 3 vendors. No coordination owner.' [Poll: Is this your current structure? Yes/No]\nSTORY 2: Image of a production backup — one station idle, queue building. Text: 'This is what a bottleneck looks like before anyone tells the PM.'\nSTORY 3: Text card — '2–4 weeks of project delay from one coordination failure. Is that in your contingency?' [Swipe up: How to structure a fabrication program that delivers]",
  ],
  'production-delays': [
    "STORY 1: Text card — '68% of project overruns start in fabrication. Is that in your project plan?' [Poll: Have you experienced this? Yes/No]\nSTORY 2: Text card with stat — '$2,500/day per idle trade. 3 trades, 3 weeks late = $157,500 downstream cost.'\nSTORY 3: Text card — 'Production visibility before and during your next fab program. [Swipe up: Production milestone framework]",
  ],
  'cost-overruns': [
    "STORY 1: Text card — 'Lowest fab bid. Highest final cost. How often does this happen?' [Poll: Has this happened to you? Yes / Every project]\nSTORY 2: Text — '18–28% average overrun on complex structural programs. Is that in your contingency?'\nSTORY 3: Text — 'Front-end engineering review: 3x fewer overruns. Do you run one?' [Swipe up: Pre-production review checklist]",
  ],
  'quality-inconsistency': [
    "STORY 1: Text card — 'Multi-vendor fabrication program. What rejection rate do you expect at first inspection?' [Poll: Under 5% / 5–15% / Over 15%]\nSTORY 2: Image of inspection report with rejections highlighted. Text: 'For most multi-vendor programs: 8–20%. Not bad vendors. No unified standard.'\nSTORY 3: Text — 'Unified QC standard before production: 3x fewer dimensional failures. Running one?' [Swipe up: Pre-production QC alignment process]",
  ],
  'missed-deadlines': [
    "STORY 1: Text card — 'Your fab vendor quoted 4 weeks. Have you confirmed production capacity?' [Poll: Always / Sometimes / Never]\nSTORY 2: Text card — '$25,000/week in penalty exposure. Did you price that risk in your contingency?'\nSTORY 3: Text — 'The questions to ask before order placement — not after the delivery slip.' [Swipe up: Vendor capacity confirmation checklist]",
  ],
}

const CAPTIONS: Record<string, string[]> = {
  'fabrication-bottlenecks': [
    "Most fabrication programs are designed to create bottlenecks — not on purpose, but by default.\n\nThree vendors. Three timelines. Three handoffs where nobody is accountable for the transition.\n\nWhen one vendor falls behind, every downstream process stops. The cascade is immediate. The project manager finds out two weeks later.\n\n→ 2–4 weeks of project delay from a structure problem, not a vendor problem.\n→ 30–50% more stoppages with 3+ disconnected vendors.\n→ 60–70% of downstream project phases affected by one bottleneck.\n\nThe fix isn't finding better vendors. It's reducing the coordination surface.\n\nOne shop. One timeline. One point of accountability.\n\nFor OEMs and project managers managing complex fabrication programs — what does your vendor structure look like?\n\n#ContractManufacturing #MetalFabrication #ProjectManagement #OperationsManagement #ManufacturingOps",
  ],
  'production-delays': [
    "68% of construction project overruns trace back to fabrication delays.\n\nNot site conditions. Not labor. Not weather.\n\nFabrication is the most impactful variable in project delivery — and the least scrutinized in planning.\n\nWhen fab falls behind:\n→ Downstream trades idle at $800–$2,500/day each\n→ Out-of-sequence work begins, creating rework risk\n→ General conditions extend\n→ Penalty clauses approach\n\nThree trades on standby for three weeks: $168K–$525K in idle labor cost. Before a change order is written.\n\nThe disciplines that prevent this are upstream — in vendor selection, capacity confirmation, and production visibility.\n\nMost project management training doesn't cover fabrication timing risk. Most project budgets don't price it.\n\nFor project managers and OEMs: how are you managing fabrication timeline risk in your current programs?\n\n#ProjectManagement #ContractManufacturing #ConstructionManagement #OEM #FabricationManagement",
  ],
  'cost-overruns': [
    "The lowest fabrication bid almost always becomes the highest final cost.\n\nHere's the pattern:\n→ Bid optimistically\n→ Discover scope gaps during production\n→ Issue change orders\n→ Project manager absorbs the difference\n\nAverage overrun on complex structural programs: 18–28%.\n\nProjects with a pre-production engineering review: 3x fewer overruns.\nProjects without: pay for the scope gaps after leverage is gone.\n\nThe review is a four-hour meeting. The change orders it prevents average $12K–$85K.\n\nThe ROI is explicit. The choice to skip it is almost always about saving time in planning — and spending significantly more during production.\n\nFor project managers and procurement officers: what does your pre-production fabrication review look like?\n\n#ContractManufacturing #ProjectManagement #Procurement #CostControl #MetalFabrication",
  ],
  'quality-inconsistency': [
    "Quality inconsistency in fabrication is never the vendors' fault.\n\nIt's a structure problem — created by using multiple shops without a unified QC standard.\n\n→ 4 vendors = 3x more dimensional failures than single-source\n→ 8–20% rejection rate at first inspection in multi-vendor programs\n→ Discovered at delivery — never during production, where it costs less\n\nSame drawings. Same steel. Different interpretations of weld symbols, tolerances, and surface treatment requirements.\n\nThe fix is structural:\n→ Project-specific QC documentation issued to all vendors before production\n→ First-article inspection required before full production run\n→ Or: single-source fabrication with one standard applied consistently\n\nConsistency is a design decision. Most multi-vendor programs don't make it explicitly.\n\nFor operations directors and project managers: what's your rejection rate at first inspection across your fabrication vendors?\n\n#QualityControl #MetalFabrication #ManufacturingOps #ContractManufacturing #OEM",
  ],
  'missed-deadlines': [
    "The fabrication vendor quoted four weeks.\n\nMost do.\n\n72% of project managers can't accurately forecast fabrication timing — because most vendor commitments aren't confirmed against actual production capacity.\n\nWhen the delay comes:\n→ Penalty clause activates at $5K–$25K/week\n→ Installation window shifts 3–6 weeks\n→ Every downstream trade absorbs the push\n→ Extended general conditions add to the total\n\nThe missed deadline is almost never a surprise to the vendor.\n\nIt's almost always a surprise to the project team.\n\nClose that information gap:\n→ Ask for production milestones — not just delivery date\n→ Confirm current backlog before order placement\n→ Agree on an escalation protocol when milestones slip\n\nFor project managers and OEMs: what's your process for confirming vendor capacity before committing to a project timeline?\n\n#ProjectManagement #ContractManufacturing #ConstructionManagement #SupplyChain #OEM",
  ],
  'rework-scrap-cost': [
    "Rework in fabrication has three costs.\n\nMost teams only track one.\n\n→ Material: the steel that was wrong and must be replaced\n→ Labor: 4–8 hours per structural rework event\n→ Schedule: the delivery date that moves, and every downstream trade that follows it\n\nThe schedule cost is always the largest. It's also the one that never appears on a rework invoice.\n\n5–12% of total project cost in shops without a QC process. On a $500K program: $25K–$60K. Direct cost only. Schedule impact is typically a multiple of that.\n\nThe prevention mechanism: first-article inspection before full production run.\n\nA four-hour inspection event catches most structural errors before compounding begins.\n\nAsk your vendors:\n→ What is your scrap rate on comparable programs?\n→ Do you run first-article inspection?\n→ What are your QC checkpoints between process stages?\n\n#QualityControl #MetalFabrication #ManufacturingOps #ContractManufacturing #ProjectManagement",
  ],
  'labor-inefficiency': [
    "Labor is 40% of fabrication cost.\n\nIt's also the variable almost nobody tracks until the job closes.\n\nThe variance report tells you what happened. At that point, nothing can be done about it.\n\n→ 20–35% productivity loss from poor shop floor sequencing\n→ 6–10 wasted supervisor hours per week on status chasing\n→ A 25% labor gap = 10% total cost overrun on every job\n\nThe shops that deliver on time and on budget measure labor efficiency as a daily variable — not a post-job surprise.\n\nBefore your next vendor selection:\n\n→ Ask for their actual vs. estimated labor hours on the last five comparable programs\n→ Ask what their shop floor management system looks like\n→ Ask how supervisors track job status in real time\n\nThe answers separate the shops that deliver from the shops that explain.\n\n#MetalFabrication #ManufacturingOps #ContractManufacturing #OperationalExcellence #OEM",
  ],
  'equipment-downtime': [
    "$4,500 per hour when the CNC goes down.\n\nIn a shop running above 80% utilization without a preventive maintenance program, the question isn't whether a failure will happen.\n\nIt's which job will be on the table when it does.\n\n→ 40–60% more unplanned downtime without preventive maintenance\n→ 6–12 unplanned hours per month at high utilization\n→ The throughput loss flows directly into your delivery dates\n\nThe delivery date your vendor quoted was built on the assumption that their equipment runs.\n\nVerify that assumption:\n\n→ What is their preventive maintenance schedule for critical equipment?\n→ What is their average unplanned downtime per month?\n→ What happens to jobs in queue when a machine goes down?\n\nThe vendors with consistent on-time delivery records aren't running better equipment.\n\nThey're running better maintenance programs.\n\n#MetalFabrication #ManufacturingOps #ContractManufacturing #OEM #OperationalExcellence",
  ],
  'material-waste': [
    "The material waste in your fabrication quote is invisible.\n\nIt's labeled as 'material cost.'\n\nBut 12–22% of that cost is plate steel that was purchased, processed, and scrapped — in shops without programmed nesting optimization.\n\n→ Manual nesting: 12–22% waste rate\n→ Programmed nesting: 2–4% waste rate\n→ On a $200K plate program: $36,000 difference\n\nTwo vendors quoting the same scope can have very different cost bases — driven entirely by how much steel they plan to waste.\n\nBefore comparing quotes:\n\n→ Ask for the plate yield rate on comparable programs\n→ Ask whether they use programmed nesting software\n→ Ask what their scrap weight per unit looks like\n\nThe vendor who wastes 20% is quoting from a different cost base.\n\nKnow the base before you compare the number.\n\n#MetalFabrication #ManufacturingOps #ContractManufacturing #Procurement #MaterialEfficiency",
  ],
  'poor-project-coordination': [
    "40% of late project completions trace to coordination gaps between fabrication, finishing, and delivery.\n\nNot to vendor quality.\n\nTo the space between vendors — where nobody was accountable.\n\n→ 2.3x more coordination failures with 3+ vendors\n→ 1 in 4 complex programs has a spec error from coordination failure\n→ Discovered at delivery — not at drawing review\n\nThe structural fix:\n\n→ Assign coordination ownership before production starts\n→ Run a pre-production specification alignment meeting with all vendors\n→ Define handoff protocols between fabrication, finishing, and delivery\n→ Or consolidate to single-source fabrication — one accountability point across all phases\n\nCoordination failures are always preventable.\n\nThey're never prevented by accident.\n\nFor OEMs and project managers: who owns inter-vendor coordination in your current programs?\n\n#ProjectManagement #ContractManufacturing #MetalFabrication #OperationsManagement #OEM",
  ],
}

const SUGGESTED_VISUALS: Record<string, string[]> = {
  'fabrication-bottlenecks': ['B-roll: active fab shop floor with multiple work stations and visible sequencing flow', 'Time-lapse: commercial job site with idle crew waiting — juxtaposed with active shop', 'Overhead: production board showing job queue and sequence map', 'Close-up: vendor handoff documentation or communication log'],
  'production-delays': ['B-roll: mobilized field crew standing idle — equipment staged, no active work', 'Project schedule with delay bars highlighted in red', 'Fabrication shop — production "in progress" sign while field site shows no activity', 'Split-screen: shop vs. site, showing the disconnect in real time'],
  'rework-scrap-cost': ['Close-up: weld inspection with rejection marking on a structural component', 'Before/after comparison: correct vs. incorrect weld on same component type', 'Scrap pile adjacent to finished product — showing the waste volume', 'First-article inspection process: inspector, calipers, drawing, component'],
  'labor-inefficiency': ['Wide shop floor shot showing busy activity — but with bottlenecks at key stations', 'Close-up of job routing sheet with multiple status changes and wait times', 'Two shop floors compared: organized routing vs. disorganized queue', 'Supervisor walking the floor vs. supervisor at a computer doing coordination'],
  'poor-project-coordination': ['Map showing three vendor locations with connection lines — visualizing the coordination surface', 'Whiteboard with vendor communication matrix and unresolved specification questions', 'Two sets of drawings side-by-side with different weld symbol interpretations circled', 'Pre-production meeting: team reviewing drawings with multiple vendors present'],
  'missed-deadlines': ['Calendar with delivery date circled and penalty amounts annotated at week 1 and week 2', 'Fabrication shop production board — job running behind visible in status column', 'Three idle trades on-site — tools staged, no active work', 'Contract document with penalty clause section highlighted'],
  'cost-overruns': ['Side-by-side: original bid document versus final invoice — amounts highlighted', 'Change order document with line items listed', 'Pre-production review checklist — team reviewing drawings', 'Budget tracking graph showing bid vs. actual over time'],
  'quality-inconsistency': ['Four identical structural components from four vendors — one visibly out of spec', 'Inspection report with rejection column — percentage highlighted', 'Side-by-side weld quality comparison: single-source vs. multi-vendor program', 'First-article inspection process in progress'],
  'equipment-downtime': ['CNC plasma or laser table — powered down, maintenance crew working on it', 'Production queue on whiteboard behind a disabled machine', 'Maintenance log: documented vs. undocumented schedules compared', 'Shop floor — one station down, everything downstream stopped'],
  'material-waste': ['Overhead: cut steel sheet showing programmed nesting (tight, minimal waste) vs. manual layout (large gaps)', 'Scrap bin full of steel offcuts next to finished structural component', 'Two quotes side-by-side with yield rate annotation added', 'Nesting software interface showing cut optimization layout'],
}

export function generateInstagram(inputs: InstagramInputs, seed: number = 0): InstagramOutput {
  const v = seed % 3
  const p = inputs.problem
  const fmt = inputs.contentFormat

  const visualHookArr = VISUAL_HOOKS[p] ?? VISUAL_HOOKS['fabrication-bottlenecks']
  const visualHook = visualHookArr[v] ?? visualHookArr[0]

  const onScreenTextArr = ON_SCREEN_TEXTS[p] ?? ON_SCREEN_TEXTS['fabrication-bottlenecks']
  const onScreenText = onScreenTextArr[v] ?? onScreenTextArr[0]

  let scriptOrSlides: string[]
  if (fmt === 'reel') {
    const reelArr = REEL_SCRIPTS[p] ?? REEL_SCRIPTS['production-delays']
    scriptOrSlides = [(reelArr[v % reelArr.length]) ?? reelArr[0]]
  } else if (fmt === 'story') {
    const storyArr = STORY_SEQUENCES[p] ?? STORY_SEQUENCES['production-delays']
    scriptOrSlides = [(storyArr[v % storyArr.length]) ?? storyArr[0]]
  } else {
    const carouselKey = p in CAROUSEL_SLIDES ? p : 'fabrication-bottlenecks'
    const carouselArr = CAROUSEL_SLIDES[carouselKey]
    scriptOrSlides = carouselArr[v % carouselArr.length] ?? carouselArr[0]
  }

  const captionArr = CAPTIONS[p] ?? CAPTIONS['fabrication-bottlenecks']
  const caption = captionArr[v % captionArr.length] ?? captionArr[0]

  const cta = v === 0
    ? 'Link in bio — see how Fabcon structures programs that deliver on time.'
    : v === 1
    ? 'Comment with your project type. I\'ll share the relevant cost data for your sector.'
    : 'Follow for weekly fabrication cost control content.'

  const visualsArr = SUGGESTED_VISUALS[p] ?? SUGGESTED_VISUALS['fabrication-bottlenecks']

  const repurposing = [
    'Convert top carousel slides into a LinkedIn post series — one slide per post, one week apart.',
    'Pull the caption intro into a Twitter/X standalone post with the key stat.',
    'Use the reel script as a YouTube Shorts framework — add B-roll of the fab floor and post natively.',
  ]

  const qualityScore = scoreContent(inputs, true, true, true, caption.split(' ').length)

  const improvementSuggestions = [
    'Add a fabrication process visual (CNC cutting, welding, forming) to anchor the content to the industry rather than using generic manufacturing imagery.',
    'Include a specific project type in the caption (commercial buildout, EV charger manufacturing, structural steel) to make the scenario recognizable.',
    'Test a question-as-caption opening instead of a statement — fabrication operators engage more with prompts than declarations.',
  ]

  return {
    platform: 'instagram',
    visualHook,
    onScreenText,
    scriptOrSlides,
    caption,
    cta,
    suggestedVisuals: visualsArr,
    repurposingSuggestions: repurposing,
    qualityScore,
    improvementSuggestions,
  }
}
