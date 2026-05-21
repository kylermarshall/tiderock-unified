import type { TwitterInputs, TwitterOutput } from '../types'
import { scoreContent } from '../lib/scoring'

const SINGLE_POSTS: Record<string, string[]> = {
  'fabrication-bottlenecks': [
    "Most fabrication delays don't start at the weld table.\n\nThey start weeks earlier — in sequencing, vendor readiness, and handoffs nobody mapped.\n\nBy the time the field crew is waiting, the bottleneck is three weeks old.",
    "Adding a third fabrication vendor doesn't add capacity.\n\nIt adds a coordination surface.\n\nAnd that surface is where delays are born.\n\n30–50% more production stoppages. Predictable structure. Predictable outcome.",
    "The bottleneck your PM found in week four?\n\nIt was visible in week two — if anyone was looking at the inter-vendor sequence.\n\nVendor count is a project risk variable. Most programs don't treat it that way.",
  ],
  'production-delays': [
    "The fabrication delivery is late.\n\nThree trades are mobilized on-site.\n\n$2,500/day each.\n\nThat's not a fabrication problem. That's a project cost problem — and it started at vendor selection.",
    "68% of construction project overruns trace back to fabrication.\n\nNot weather.\n\nNot labor disputes.\n\nNot site conditions.\n\nFabrication timing is the most impactful variable in project delivery — and the least scrutinized in planning.",
    "The project timeline was built on an optimistic fabrication estimate.\n\nEveryone knew it.\n\nNobody pushed back.\n\nThree weeks of idle labor on-site later, the conversation about contingency began. After the cost was already spent.",
  ],
  'rework-scrap-cost': [
    "Rework in fabrication has three costs:\n\n1. The material\n2. The labor\n3. The schedule\n\nMost project budgets track one.\n\nThe schedule is always the most expensive — and the least tracked.",
    "A shop running 15% scrap rate isn't using bad steel.\n\nIt's using bad planning.\n\nThe scrap rate is a process discipline indicator. It tells you what the final cost will look like before a single piece is cut.",
    "5–12% of project cost lost to rework in shops without QC process.\n\nOn a $500K program, that's $25–60K.\n\nMost of it was preventable with one inspection checkpoint that nobody required.",
  ],
  'labor-inefficiency': [
    "Labor is 40% of fabrication cost.\n\nIt's also the variable almost nobody audits.\n\nThe variance report after a job closes is often the first time the number is examined.\n\nBy then, nothing can be done about it.",
    "Poor shop floor sequencing costs 20–35% in productivity.\n\nThe shop looks busy.\n\nEvery station has work.\n\nThe job still runs over.\n\nEfficiency isn't about activity — it's about sequence.",
    "The fabrication estimate said 480 hours.\n\nThe actual was 630.\n\nNobody asked about the shop floor management system before they placed the order.\n\nThe variance was predictable. It wasn't predicted.",
  ],
  'poor-project-coordination': [
    "Every additional vendor in your fabrication program adds a communication surface.\n\nEvery surface is a potential specification gap.\n\n1 in 4 complex projects has a spec error caused by coordination failure.\n\nThat's not bad luck. That's a structure problem.",
    "The coordination gap between fabrication, finishing and delivery causes 40% of late project completions.\n\nNot bad vendors.\n\nNot bad parts.\n\nThe space between vendors — where nobody is accountable — is where the schedule is lost.",
    "2.3x more coordination failures at three or more vendors.\n\nThe multiplier isn't an accident.\n\nIt's the mathematical output of program structures with more interfaces than oversight capacity.\n\nVendor count is a risk variable. Treat it like one.",
  ],
  'missed-deadlines': [
    "The fabrication vendor said four weeks.\n\nMost fabrication vendors say four weeks.\n\n72% of project managers can't accurately forecast fabrication timing.\n\nFour weeks is a starting point. It's not a commitment until production capacity is confirmed.",
    "$25,000/week in penalty exposure.\n\nThe project manager signed the clause.\n\nNobody stress-tested the fabrication lead time against actual production capacity.\n\nThe clause activated. The math was clear — but only after.",
    "A missed fabrication deadline doesn't just push installation.\n\nIt pushes every downstream trade.\n\nEvery extended general condition.\n\nEvery out-of-sequence field adjustment.\n\nThe total cost of the deadline miss is always larger than the delay duration suggests.",
  ],
  'cost-overruns': [
    "The lowest fabrication bid.\n\nAlmost always the highest total cost.\n\nNot because the vendor is dishonest.\n\nBecause they bid with optimistic scope assumptions and bill at the real scope.\n\nThe gap is predictable. Most procurement processes don't close it.",
    "The change order conversation in fabrication starts the same way every time.\n\n'We found something during production.'\n\nA front-end engineering review finds the same things — before production.\n\nOne version costs a fraction. One version costs a fraction plus the overrun.",
    "18–28% average cost overrun on complex structural programs.\n\nProjects that skip front-end review: 3x more overruns.\n\nThe review is not overhead. It's insurance with a known premium and a calculable payout.",
  ],
  'quality-inconsistency': [
    "20% rejection at first inspection.\n\nNot one bad vendor.\n\nFour vendors. Four different interpretations of the same drawing.\n\nConsistency is a structural output. You can't get it from multiple vendors without a unified standard.",
    "Quality inconsistency in fabrication is never discovered at order placement.\n\nIt's discovered at receiving. At inspection. After installation begins.\n\nBy then, the fix is maximum cost and minimum schedule flexibility.",
    "3x more dimensional failures with four fabrication sources versus one.\n\nSame steel. Same drawings.\n\nDifferent shops. Different standards. Different outcomes.\n\nThe problem isn't the vendors. It's the architecture.",
  ],
  'equipment-downtime': [
    "$4,500/hour when the CNC goes down.\n\nIn a shop running at 85% utilization without a preventive maintenance program, the question isn't whether it will go down.\n\nIt's which job will be on the table when it does.",
    "One machine failure doesn't stop one machine.\n\nIt stops the sequence.\n\nCutting stops. Forming waits. Welding idles. The cascade is immediate — and the downstream cost accumulates from minute one.",
    "Shops without preventive maintenance programs have 40–60% more unplanned downtime.\n\nThat downtime is in your lead time.\n\nWhether the vendor tells you that when they quote four weeks is a different question.",
  ],
  'material-waste': [
    "The plate steel waste in a fabrication quote is invisible.\n\nIt's in the material cost line.\n\nNo label. No percentage. Just a number that reflects how much the shop plans to waste — and charges for.\n\nAsk for the plate yield rate before you compare quotes.",
    "Two vendors. Same steel. Same drawings.\n\nQuote A: $310,000. Quote B: $275,000.\n\nBid prices reflect cost basis. Cost basis reflects efficiency.\n\nWaste rate is often the difference. And it's not in either quote.",
    "12–22% plate waste in manual-nesting shops.\n\n2–4% in shops using programmed nesting.\n\nOn a $200K plate program, that difference is $36,000.\n\nIn somebody's material cost column. Just not labeled as waste.",
  ],
}

const THREADS: Record<string, string[][]> = {
  'fabrication-bottlenecks': [
    [
      "1/7 Most fabrication programs are designed to create bottlenecks.\n\nNot on purpose.\n\nBy default — through vendor structure, unclear handoffs, and no single point of sequencing accountability.\n\nHere's how it happens and what it costs. 🧵",
      "2/7 The standard approach: cut at vendor A, form at vendor B, weld at vendor C.\n\nThree separate timelines. Three separate communication channels. Three points where a delay in one vendor delays every vendor downstream.\n\nThat's the structure most programs run on.",
      "3/7 Facilities running 3+ fabrication vendors experience 30–50% more production stoppages per project.\n\nNot because any vendor is bad.\n\nBecause the coordination surface between them is where timing failures occur — and nobody owns that surface.",
      "4/7 When a bottleneck forms at vendor B, vendor A has already done their work and vendor C is waiting. The delay compounds.\n\nA single fabrication bottleneck delays downstream project timelines by 2–4 weeks on average.\n\nThe field crew is mobilized. The clock is running.",
      "5/7 The cascade effect: 60–70% of dependent project phases delay when a single fabrication sequence bottlenecks.\n\nNot all of them. But most of them.\n\nAnd every one of them has a daily cost in idle labor and extended general conditions.",
      "6/7 The structural fix is not finding better vendors.\n\nIt's reducing the coordination surface.\n\nSingle-source fabrication — one shop managing cutting, forming, welding, and finishing — eliminates the inter-vendor handoff as a failure point.\n\nOne timeline. One accountability point.",
      "7/7 The next time you're structuring a fabrication program, ask:\n\nHow many inter-vendor handoffs does this create?\n\nWho owns each handoff?\n\nWhat's the contingency when one of them fails?\n\nIf the answers are unclear, the bottleneck already exists. It just hasn't appeared yet.",
    ],
    [
      "1/6 A project manager asked me why their fabrication programs always run behind.\n\nThey assumed it was vendor quality.\n\nIt wasn't.\n\nHere's the actual cause — and how to see it before the program starts. 🧵",
      "2/6 Their programs consistently ran three vendors: one for cutting, one for forming, one for welding.\n\nEach vendor was individually reliable.\n\nThe program was structurally unreliable — because inter-vendor handoffs were nobody's job.",
      "3/6 The coordination failure pattern: vendor A finishes cutting on time. Vendor B is mid-job on another program. Vendor A's output sits at B's dock for five days.\n\nNobody called it a delay. Nobody flagged it. The project manager found out in week four.",
      "4/6 By the time the PM knew, the field crew mobilization date was ten days out.\n\n$2,500/day per trade was already a committed cost.\n\nThe bottleneck had been visible in vendor B's schedule since week two.",
      "5/6 The fix was structural. Not vendor replacement.\n\nMove to single-source fabrication for this project type — one shop managing the full sequence, including delivery coordination.\n\nOne timeline. One escalation path. One point of accountability for every handoff.",
      "6/6 If your fabrication programs consistently run behind:\n\nMap the vendor handoffs. Count the coordination surfaces.\n\nIf the answer is 'multiple vendors, unclear handoff ownership,' you've found the bottleneck.\n\nAnd it was in your program design before any steel was touched.",
    ],
  ],
  'production-delays': [
    [
      "1/7 68% of construction project overruns trace to fabrication delays.\n\nNot bad subcontractors.\n\nNot weather.\n\nNot scope creep.\n\nFabrication timing is the variable that determines project outcomes more than any other.\n\nHere's why — and what to do about it. 🧵",
      "2/7 When fabrication falls behind, the cost doesn't stay in the fab shop.\n\nIt travels downstream.\n\n→ Trades mobilize and wait\n→ Out-of-sequence work begins\n→ General conditions extend\n→ Penalty clauses approach\n\nEach delay day carries a dollar cost that compounds across the trade count.",
      "3/7 The downstream idle labor cost: $800–$2,500/day per trade.\n\nOn a commercial project with four active trades, a three-week fabrication delay is $67,000–$210,000 in idle labor cost.\n\nBefore a single change order is written.",
      "4/7 The production delay itself: a 15–25% average timeline extension.\n\nOn a six-month project, that's 3–6 weeks.\n\nMost project contingencies don't cover 25% of timeline.\n\nThe financial exposure from a fabrication slip is a known risk that rarely makes it into the contingency budget.",
      "5/7 The planning failure: fabrication timing is treated as an assumed variable, not a managed one.\n\n72% of project managers can't accurately forecast fab timing.\n\nThat forecast gap represents the difference between a project that finishes on budget and one that doesn't.",
      "6/7 The operational fix has two parts:\n\n1. Production visibility — milestone check-ins between order placement and delivery. Not just 'are you on track?' but 'what are your current production milestones and when were they last updated?'\n\n2. Vendor selection criteria that include production track record and capacity confirmation, not just bid price.",
      "7/7 The fabrication vendor who hits dates does it systematically.\n\nThey have production tracking. They flag early. They don't over-commit.\n\nThose vendors are identifiable before you sign the contract — if you ask the right questions.\n\nWhat's your vendor qualification process look like?",
    ],
  ],
  'cost-overruns': [
    [
      "1/6 The most predictable event in fabrication is the change order that arrives after production starts.\n\n'We found something during production.'\n\nHere's what it costs and why it's preventable. 🧵",
      "2/6 The financial range: $12,000–$85,000 in change orders from scope gaps on mid-size commercial programs.\n\nThe average overrun on complex structural programs: 18–28%.\n\nNeither is random. Both are predictable outputs of a procurement process optimized for bid price.",
      "3/6 Projects that skip front-end engineering review experience 3x more cost overruns.\n\nThe review catches: drawing completeness gaps, specification ambiguities, tolerance conflicts, and surface treatment misalignments.\n\nOne four-hour session. Documented. Before production.",
      "4/6 The alternative: discover the same gaps during production.\n\nAt that point:\n→ Steel has been purchased and cut\n→ Some components are partially fabricated\n→ The fix requires either acceptance of incorrect parts or full remediation\n→ The schedule has already committed to a delivery date\n\nLeverage is zero.",
      "5/6 The vendors who bid low and bill high are identifiable before the contract.\n\nAsk: What is your change order frequency on comparable programs? What does your pre-production review process include? What's your estimated final cost on jobs that match this scope?\n\nThe pattern shows up in the answers.",
      "6/6 Fabrication cost overruns aren't vendor dishonesty.\n\nThey're the output of procurement that optimizes for initial price and skips the process that controls final cost.\n\nThe discipline to run the review before production is what separates 8% variance from 28% variance.",
    ],
  ],
  'missed-deadlines': [
    [
      "1/7 The fabrication vendor quoted four weeks.\n\nAt week four: 'We need two more.'\n\nAt week six: delivery.\n\n$40,000 in penalties. Three trades on standby. Project manager on a call that should never have happened.\n\nHere's how to prevent this conversation. 🧵",
      "2/7 The core problem: 72% of project managers can't accurately forecast fabrication timing.\n\nNot because they're bad at their jobs.\n\nBecause most fabrication vendors quote lead times without confirming production capacity — and most project managers don't ask them to.",
      "3/7 The penalty exposure: $5,000–$25,000/week on most commercial contracts.\n\nA two-week slip at $20,000/week: $40,000 in penalties.\n\nPlus: downstream trade mobilization costs, extended general conditions, schedule compression costs downstream.\n\nTotal: often six figures from a two-week fabrication slip.",
      "4/7 The missed deadline pattern:\n\nVendor accepts order → confirms lead time based on estimated capacity → takes on additional work → production starts late → customer is last to know.\n\nThis is not negligence. It's an incentive structure problem. The vendor had no mechanism to flag overcommitment early.",
      "5/7 The fix before order placement:\n\n→ Ask for current backlog\n→ Ask for material readiness confirmation date\n→ Ask which equipment is running this job and its current utilization\n→ Ask for production milestone schedule — not just delivery date\n\nThese questions surface overcommitment before it becomes your problem.",
      "6/7 The fix after order placement:\n\n→ Production milestone check-ins — not just 'are you on track?'\n→ Agreed escalation protocol if a milestone is missed\n→ Early flag process — the vendor commits to telling you when they're behind, not when delivery has already slipped\n\nThis is standard for reliable vendors. Unreliable ones won't commit to it.",
      "7/7 The two-week fabrication slip is always visible from inside the shop before it's visible to the customer.\n\nThe question is whether the vendor has a mechanism to surface it — and whether you've required one.\n\nMost projects don't require it. The penalty clause activates instead.",
    ],
  ],
}

const CONTRARIAN_TAKES: Record<string, string[]> = {
  'fabrication-bottlenecks': [
    "Unpopular take: spreading fabrication across multiple vendors doesn't reduce risk.\n\nIt multiplies it.\n\nEvery vendor you add is another coordination surface. Another handoff. Another point where timing failure can cascade.\n\nConsolidation is risk reduction. Diversification is coordination overhead.",
    "The vendor with the longest list of past projects is not automatically the most reliable.\n\nCapacity is not competence.\n\nA shop that is overcommitted on good clients will miss your deadline just as reliably as a shop that can't do the work.\n\nCapacity confirmation is the question most buyers never ask.",
  ],
  'production-delays': [
    "If fabrication causes 68% of construction overruns, then the project management discipline that matters most isn't on-site.\n\nIt's upstream — in vendor selection, production visibility, and timeline risk pricing.\n\nMost PM training doesn't cover that. Most projects pay for that gap.",
    "The project contingency budget is built around on-site risk.\n\nWeather. Soil conditions. Material escalation.\n\nAlmost never around fabrication timeline risk — which causes 68% of overruns.\n\nThe contingency is covering the wrong tail.",
  ],
  'rework-scrap-cost': [
    "A vendor who quotes the lowest price has either better efficiency than the competition or worse QC processes.\n\nThose are very different situations.\n\nThe only way to tell them apart: ask for scrap rate and rework frequency on comparable programs.\n\nMost buyers don't ask. The low quote wins. The rework follows.",
    "First-article inspection is treated as a cost.\n\nIt's actually the inverse of a cost — it's the mechanism that prevents the 4–8 hour structural rework event that happens two days before delivery.\n\nThe shops that don't do it aren't saving time. They're deferring it.",
  ],
  'labor-inefficiency': [
    "Fabrication shops measure equipment utilization obsessively.\n\nLabor efficiency: almost never.\n\nEquipment is 15–20% of fabrication cost. Labor is 40%.\n\nThe variable with three times the cost impact is the one nobody tracks.",
    "The supervisor who can tell you every machine's utilization rate but not the labor hours per unit on their last five closed jobs is optimizing for the wrong metric.\n\nMachine utilization is input efficiency. Labor efficiency is output efficiency.\n\nOne determines capacity. The other determines cost.",
  ],
  'poor-project-coordination': [
    "The specification error that shows up at delivery is never about the vendor who made the part.\n\nIt's about the process that issued the drawing, managed the revisions, and confirmed the specs before production.\n\nVendors make what they're told. The coordination failure is in what they were told.",
    "Multi-vendor fabrication programs aren't bad because vendors are unreliable.\n\nThey're bad because coordination accountability is never assigned.\n\nAdd a coordination role to every multi-vendor program and the failure rate drops. Most programs never add the role.",
  ],
  'missed-deadlines': [
    "The project manager who accepts a vendor's quoted lead time without confirming production capacity hasn't done their job.\n\nThey've made an assumption and called it a plan.\n\nCapacity confirmation before order placement is due diligence. Most project timelines skip it.",
    "The penalty clause protects the project owner.\n\nIt doesn't protect the project timeline.\n\nA $25,000/week penalty payment doesn't put the installation back on schedule. It compensates for the damage after the fact.\n\nThe only thing that protects the timeline is a vendor who can hit it — confirmed before the contract is signed.",
  ],
  'cost-overruns': [
    "The lowest fabrication bid is not a cost estimate.\n\nIt's an estimate of what the vendor thinks they can do with the information provided.\n\nIf the information is incomplete — and it usually is — the final cost is not the bid price.\n\nThe gap is where the overrun lives. And the gap is predictable.",
    "Change orders are not vendor problems.\n\nThey're procurement problems.\n\nA vendor who issues a change order mid-production has found a scope gap.\n\nA procurement process that allows scope gaps to reach production is the actual failure.",
  ],
  'quality-inconsistency': [
    "Quality inconsistency in fabrication programs is never the vendors' fault.\n\nIt's the program architect's fault.\n\nWhen you use multiple vendors without a unified QC standard, inconsistency is the designed outcome.\n\nYou can't solve a structural problem by asking vendors to try harder.",
    "The vendor who passed first inspection last project and failed 20% this project didn't get worse.\n\nThe program structure changed.\n\nNew vendor mix. New interpretation of the same drawing. Same result.\n\nConsistency is a system property, not a vendor property.",
  ],
  'equipment-downtime': [
    "High equipment utilization is not a sign of operational efficiency.\n\nAt above 80%, it's a sign that maintenance windows don't exist — and unplanned failures are being scheduled into your production calendar by default.\n\nHigh utilization without maintenance planning is a risk accumulation strategy.",
    "The fabrication shop that never has downtime isn't running more reliable equipment.\n\nThey're running a preventive maintenance program.\n\nThe difference in outcome is 40–60% less unplanned downtime.\n\nThe difference in input is scheduled attention instead of reactive repair.",
  ],
  'material-waste': [
    "The fabrication vendor with the lowest quote may have the highest material waste rate.\n\nThey're quoting from a cost basis that includes 20% material waste.\n\nThe vendor quoting $35,000 more may waste 4%.\n\nYou're not comparing prices. You're comparing cost structures — and the lower quote isn't necessarily the lower cost.",
    "Material waste is called 'material cost' on every fabrication invoice.\n\nIt's not.\n\nMaterial cost is the steel in the final product.\n\nMaterial waste is the planning cost that gets billed as material.\n\nThe two look identical on the invoice. They're not.",
  ],
}

const FOUNDER_POSTS: Record<string, string[]> = {
  'fabrication-bottlenecks': [
    "When we looked at why our programs ran behind in 2019, we expected to find vendor quality problems.\n\nWe found coordination structure problems.\n\nThree vendors doing good individual work. No one responsible for the handoffs between them.\n\nWe restructured to single-source fabrication. On-time delivery improved from 64% to 91% in 18 months.\n\nThe bottleneck was in our program design. Not in the shops.",
    "Five years ago I would have told you that multi-vendor fabrication was risk diversification.\n\nIt's the opposite.\n\nMore vendors means more coordination surfaces. More coordination surfaces means more places where timing fails.\n\nEvery program we've consolidated to a single source has run with less delay. Not marginal less. Substantially less.\n\nThe data changed my view.",
  ],
  'production-delays': [
    "I've tracked delay causes across 200+ fabrication projects.\n\nFabrication and material delays: 68% of overruns.\n\nSite conditions: 8%.\n\nLabor: 11%.\n\nEverything else: 13%.\n\nThe variable that gets the least attention in project planning causes the most damage to project outcomes.\n\nThat's a planning gap, not a fabrication gap.",
    "The conversation I have with project managers after a delay event is always the same.\n\nThey knew the fab vendor was behind in week two. Nobody said anything until week four.\n\nThe two-week information delay cost more than the two-week production delay.\n\nProduction visibility is a contract term, not an assumption.",
  ],
  'rework-scrap-cost': [
    "We started tracking scrap rate as a vendor qualification criterion three years ago.\n\nIt changed who we work with.\n\nA vendor running 14% scrap wasn't a bad vendor. They were a vendor without a nesting optimization process.\n\nWe moved that work to a vendor running 3%. Our project material costs dropped 11% on average.\n\nScrap rate tells you more about a shop's process discipline than any other single metric.",
    "The most expensive fabrication program I've managed: $600K project. Final cost: $690K.\n\nRoot cause: rework at 15% of project value. Three structural components that needed remediation post-delivery.\n\nThe root cause of the rework: no first-article inspection before full production run.\n\nA four-hour inspection event would have caught all three. It wasn't in the vendor's standard process.\n\nIt's in ours now.",
  ],
  'labor-inefficiency': [
    "I asked a fabrication shop manager what their labor hours per unit looked like on their last ten jobs.\n\nThey couldn't tell me.\n\nThey knew equipment utilization. Machine run time. Material throughput.\n\nLabor efficiency — the variable that drives 40% of their cost — was unmeasured.\n\nThe jobs that run over on labor aren't surprising. The surprise is that nobody tracked it.",
    "The most impactful change I've seen in a fabrication shop's performance: adding job routing cards with expected hours per station.\n\nNot a technology change. Not a headcount change.\n\nA visibility change.\n\nWhen supervisors can see where jobs are in the sequence and what's running over versus under, they manage it. When they can't see it, they don't.\n\nLabor efficiency is a measurement problem before it's a management problem.",
  ],
  'poor-project-coordination': [
    "The $85,000 change order on our largest commercial project in 2021 was not a vendor problem.\n\nIt was our problem.\n\nWe didn't run a pre-production specification alignment meeting. We assumed the drawing was sufficient.\n\nThe drawing was complete. The specification — surface treatment, tolerance requirements, weld symbol interpretation — was not aligned across three vendors.\n\nOne meeting would have caught it.\n\nWe run that meeting on every program now.",
    "We surveyed project managers on their biggest fabrication program failures.\n\n42% cited specification errors.\n\n31% cited delivery delays.\n\n19% cited quality issues.\n\nIn 80% of specification error cases, the root cause was the same: no structured handoff review between the project team and the fabrication vendors before production started.\n\nThe review is a two-hour meeting. The specification error it prevents costs weeks.",
  ],
  'missed-deadlines': [
    "A fabrication vendor missed a delivery by three weeks.\n\nPenalty clause: $20,000/week. Total penalty: $60,000.\n\nWhen I asked the vendor when they knew they'd be late: 'Week two.'\n\nWhen they told us: 'Day before the deadline.'\n\nThat five-week information gap cost $60,000 plus downstream field costs.\n\nProduction milestone check-ins are now in every contract we sign.",
    "I've been on both sides of a missed fabrication deadline.\n\nAs the customer: surprise, frustration, cost.\n\nAs the manager of the fabrication program: a warning flag that appeared in week two and no process to surface it to the customer.\n\nThe solution to missed deadlines isn't better vendors.\n\nIt's an agreed escalation process before production starts — so the week-two flag reaches the customer in week two.",
  ],
  'cost-overruns': [
    "The change order conversation I try hardest to prevent:\n\n'We found something during production.'\n\nThe setup is always the same: incomplete scope, no pre-production review, vendor found the gap after the steel was cut.\n\nAt that point, leverage is zero and cost is maximum.\n\nThe front-end engineering review was a two-year habit before it became a requirement.\n\nNow it's a requirement. Average change order exposure dropped 70%.",
    "I've tracked bid-to-final-cost variance across 150+ fabrication programs.\n\nThe average: 22% over bid.\n\nThe programs with a pre-production scope review: 7% over bid.\n\nThe programs without: 31% over bid.\n\nThe review isn't magic. It's a structured process for finding the gaps that will become change orders — before they become change orders.\n\nThe ROI is not subtle.",
  ],
  'quality-inconsistency': [
    "Three vendors. Same drawing. Twenty percent rejection at first inspection.\n\nWe audited all three shops. Found the cause: three different interpretations of the same weld symbol. All of them defensible. None of them matching the design intent.\n\nThe drawing was correct. The shared understanding of the drawing was not.\n\nA pre-production drawing review — one meeting with all three vendors simultaneously — would have aligned interpretation before production.\n\nWe now require it on every multi-vendor program.",
    "Quality consistency across vendors is not a matter of vendor quality.\n\nIt's a matter of standard clarity.\n\nThe same vendor produces different quality outcomes on different programs depending on how clearly the standard is defined.\n\nWhen we started issuing project-specific QC documentation to every vendor — not just drawings — rejection rates at first inspection dropped from 14% to 3%.\n\nSame vendors. Different standard communication.",
  ],
  'equipment-downtime': [
    "A fabrication partner we worked with for six years had a laser cutter failure in the middle of our largest program.\n\nThree days of unplanned downtime. $13,500 in throughput loss. Our delivery moved two weeks.\n\nWhen I asked about their maintenance schedule: they didn't have one.\n\nWe added 'preventive maintenance documentation' to our vendor qualification checklist the following month.\n\nThe equipment performance of our partners is part of our delivery reliability. We should have been tracking it years earlier.",
    "The fabrication partners with the most consistent on-time delivery records aren't running better equipment.\n\nThey're running better maintenance programs.\n\nI've visited 80+ fabrication shops. The correlation between documented maintenance schedules and delivery reliability is the clearest pattern I've seen.\n\nIt's also the question I ask in every vendor qualification conversation now.\n\nThe shops that can't answer it clearly: not on the approved list.",
  ],
  'material-waste': [
    "We ran a material efficiency analysis across our six primary fabrication vendors last year.\n\nWaste rate range: 3% to 22%.\n\nAll six vendors were buying steel at similar prices.\n\nVendor cost variation attributable entirely to material waste: $31,000–$44,000 per $200K program.\n\nWe had been comparing bid prices without asking about yield rate for four years.\n\nWe now include plate yield rate in every vendor qualification process.",
    "A customer asked me why two nearly identical programs had a 14% cost difference.\n\nSame scope. Same steel supplier. Different fabrication vendors.\n\nThe answer: the lower-cost program used a vendor with programmed nesting and 4% plate waste. The higher-cost program used a vendor with manual nesting and 19% plate waste.\n\nThe material cost line on the invoices looked similar in percentage terms.\n\nThe absolute dollar waste was $28,000 different.\n\nNesting efficiency is the invisible cost variable in most procurement comparisons.",
  ],
}

const QUOTE_RESPONSE_POSTS: Record<string, string> = {
  'fabrication-bottlenecks': '"We always use multiple vendors to reduce dependency risk." — This is backwards. Multiple vendors don\'t reduce dependency. They multiply coordination surfaces. Every inter-vendor handoff is a dependency. Every dependency is a potential bottleneck. Single-source consolidation reduces dependencies. Vendor diversification creates them.',
  'production-delays': '"Our team has done everything right on-site. The delay is a fabrication problem." — Yes. And it\'s your problem to solve, not just to name. 68% of project overruns trace to fabrication. The team that builds a vendor selection and visibility process to control that 68% is the team with the best project outcomes. It\'s a solvable problem.',
  'rework-scrap-cost': '"We\'ve had high rework rates, but our vendor always makes it right." — Making it right is not the same as not causing it. The vendor fixing the rework absorbs the material cost. You absorb the schedule cost. That\'s not a partnership — it\'s a cost transfer.',
  'labor-inefficiency': '"Our shop is at full capacity. We don\'t have a labor problem." — Full capacity and efficient labor are different things. A shop running at 100% utilization with 30% productivity loss is not efficient. It\'s busy. The job will still run over.',
  'poor-project-coordination': '"We send the same drawings to all vendors." — Same drawings, different interpretations. Coordination isn\'t sending the same document. It\'s confirming shared understanding of the document. Those are not the same thing.',
  'missed-deadlines': '"Four-week lead time from our fabricator." — Is that confirmed against current production capacity and backlog? Or is it a quote? These are very different numbers. One is a commitment. The other is an estimate made without looking at the calendar.',
  'cost-overruns': '"The change orders were unexpected." — Were they? Or were they undiscovered scope gaps that production surfaced? Because those scope gaps were present in the drawings before order placement. A front-end review finds them. Skipping the review defers them until they cost more to fix.',
  'quality-inconsistency': '"We\'ll just increase our inspection at receiving." — End-of-process inspection finds quality failures at maximum cost. You\'ve already paid for material, labor, finishing, and shipping. The fix for quality inconsistency is process discipline during production — not more inspection afterward.',
  'equipment-downtime': '"Our vendor has been reliable for three years." — Past reliability does not predict future reliability in a maintenance-dependent operation. Ask about their current maintenance program. Three years of reliability on aging equipment without a maintenance program is three years of accumulated risk.',
  'material-waste': '"Our vendor gives us competitive pricing." — Competitive on what basis? If their cost basis includes 18% material waste and your benchmark vendor runs 4%, "competitive" means you\'re paying a $28,000 premium on a $200K program. Ask for the yield rate before accepting the price.',
}

const ALTERNATE_HOOKS: Record<string, string[]> = {
  'fabrication-bottlenecks': ["The fabrication program with three vendors and no coordination owner already has a bottleneck. It just hasn't appeared yet.", "Every week a fabrication bottleneck goes unresolved, downstream idle labor compounds. The shop cost and the project cost are not the same number."],
  'production-delays': ["The idle labor clock starts the moment fab delivery is missed. The fabrication vendor doesn't pay that clock. The project does.", "Fabrication timing is the single most impactful and least scrutinized variable in commercial project planning."],
  'rework-scrap-cost': ["The scrap rate tells you the QC process before you ever see a part. Ask for it at vendor qualification, not after a rejection.", "Rework discovered at delivery is five times more expensive than rework caught at first-article inspection. The timing determines the cost."],
  'labor-inefficiency': ["A shop floor running at full capacity with poor sequencing is busy — but not efficient. The variance report is where you tell the difference.", "Labor is 40% of fabrication cost and the least measured variable in the estimate. That gap explains most variance reports."],
  'poor-project-coordination': ["Specification errors in multi-vendor programs are always discovered after production. The only question is how much it costs when they are.", "Coordination ownership is the variable most multi-vendor fab programs are missing. Assign it before production, not after a failure."],
  'missed-deadlines': ["The deadline conversation is cheapest before the contract is signed. Confirm production capacity before you accept a lead time.", "A missed fabrication deadline carries downstream costs that multiply by trade count. The slip duration and trade count determine the total."],
  'cost-overruns': ["Every change order in fabrication represents a scope gap that existed before production started. The review that catches them is optional. The change order is not.", "Bid price is the vendor's estimate of what they can do with the scope provided. Final cost is what the project actually required. The gap is predictable."],
  'quality-inconsistency': ["Quality consistency across vendors requires a unified standard explicitly communicated before production. It cannot be assumed from the drawing.", "The rejection rate at first inspection is a lagging indicator. It tells you what the QC process produced — after the maximum cost has been added."],
  'equipment-downtime': ["Unplanned equipment failures don't occur at random. They occur at the intersection of high utilization and deferred maintenance.", "Equipment downtime in a fabrication shop doesn't stop one process. It stops the sequence — and the cost accumulates from every station that waits."],
  'material-waste': ["The plate yield rate tells you more about a fabrication vendor's cost basis than the bid price does. Ask for it before comparing quotes.", "Material waste is the cost that's invisible in a fabrication quote and visible only in the final invoice. Make it visible before you sign."],
}

const ENGAGEMENT_QUESTIONS: Record<string, string> = {
  'fabrication-bottlenecks': "What's the biggest fabrication bottleneck you've dealt with — and where did it actually originate?",
  'production-delays': "What's the longest fabrication delay you've absorbed on a commercial project, and what was the downstream cost?",
  'rework-scrap-cost': "How do you currently track rework cost in your fabrication programs — and are you including the schedule impact?",
  'labor-inefficiency': "When did you last look at actual versus estimated labor hours on a closed fabrication job? What did the variance look like?",
  'poor-project-coordination': "Who owns inter-vendor coordination in your current fabrication programs? Is it assigned or assumed?",
  'missed-deadlines': "What's your current process for confirming fabrication vendor capacity before committing to a project timeline?",
  'cost-overruns': "What's the average bid-to-final-cost variance in your fabrication programs over the last year?",
  'quality-inconsistency': "What's your current rejection rate at first inspection for multi-vendor fabrication? Have you tracked it?",
  'equipment-downtime': "Have you ever asked a fabrication vendor for their preventive maintenance schedule? Most people haven't.",
  'material-waste': "Have you ever asked a fabrication vendor for their plate yield rate? What did they say?",
}

const REPURPOSING: Record<string, string[]> = {
  'fabrication-bottlenecks': ['Turn into a LinkedIn post focused on the vendor structure risk multiplier', 'Convert the thread into an Instagram carousel: "5 ways multi-vendor fab programs create bottlenecks"', 'Use the contrarian take as a Facebook discussion prompt for project managers'],
  'production-delays': ['Pull the 68% stat into a standalone LinkedIn post', 'Convert to an Instagram Reel hook: "This is why your project ran over budget"', 'Turn the thread into a Facebook educational post about downstream delay costs'],
  'rework-scrap-cost': ['Use the three-cost framework as a LinkedIn carousel post', 'Turn the contrarian take into a Facebook discussion: "Is the lowest fab quote always the highest cost?"', 'Convert to a YouTube Shorts script framing rework as a planning failure'],
  'labor-inefficiency': ['Turn into a LinkedIn post about the variance report surprise', 'Convert the founder story into a Facebook educational post', 'Use the contrarian take as an Instagram carousel: "What fabrication efficiency actually measures"'],
  'poor-project-coordination': ['Pull the 1-in-4 stat into a LinkedIn post hook', 'Convert the coordination gap framing into an Instagram carousel', 'Use as a Facebook discussion prompt: "Who owns inter-vendor coordination in your programs?"'],
  'missed-deadlines': ['Turn the penalty clause scenario into a LinkedIn post', 'Convert the thread into a YouTube script: "How to confirm vendor capacity before signing a deadline"', 'Use as Instagram Reel hook: "Four weeks means nothing without this conversation"'],
  'cost-overruns': ['Turn the contrarian take into a LinkedIn post on procurement strategy', 'Convert the founder data story into a Facebook educational post', 'Use as Instagram carousel: "Why the lowest bid becomes the highest cost"'],
  'quality-inconsistency': ['Turn the structural cause framing into a LinkedIn post', 'Convert founder story into a Facebook educational post on QC documentation', 'Use as Instagram carousel: "Why quality inconsistency is always a structure problem"'],
  'equipment-downtime': ['Turn the maintenance correlation finding into a LinkedIn post', 'Convert into an Instagram Reel: "Ask your fab vendor this question before you order"', 'Use the contrarian take as a Facebook discussion prompt'],
  'material-waste': ['Turn the yield rate comparison into a LinkedIn post', 'Convert the cost differential scenario into an Instagram carousel', 'Use as a Facebook educational post: "The hidden cost in every fabrication quote"'],
}

export function generateTwitter(inputs: TwitterInputs, seed: number = 0): TwitterOutput {
  const v = seed % 3
  const p = inputs.problem
  const fmt = inputs.postFormat

  const singlePostsArr = SINGLE_POSTS[p] ?? SINGLE_POSTS['fabrication-bottlenecks']
  const mainPost = singlePostsArr[v] ?? singlePostsArr[0]

  let thread: string[] | undefined
  if (fmt === 'thread') {
    const threadOptions = THREADS[p] ?? THREADS['production-delays']
    thread = threadOptions[v % threadOptions.length] ?? threadOptions[0]
  } else if (fmt === 'contrarian') {
    const contrarianArr = CONTRARIAN_TAKES[p] ?? CONTRARIAN_TAKES['fabrication-bottlenecks']
    thread = [contrarianArr[v % contrarianArr.length] ?? contrarianArr[0]]
  } else if (fmt === 'founder') {
    const founderArr = FOUNDER_POSTS[p] ?? FOUNDER_POSTS['fabrication-bottlenecks']
    thread = [founderArr[v % founderArr.length] ?? founderArr[0]]
  } else if (fmt === 'quote-response') {
    const qr = QUOTE_RESPONSE_POSTS[p] ?? QUOTE_RESPONSE_POSTS['fabrication-bottlenecks']
    thread = [qr]
  }

  const altHooksArr = ALTERNATE_HOOKS[p] ?? ALTERNATE_HOOKS['fabrication-bottlenecks']
  const alternateHook = altHooksArr[v % altHooksArr.length] ?? altHooksArr[0]

  const cta = v === 0
    ? 'What does this look like in your fabrication program? Share in the comments.'
    : v === 1
    ? 'Tag a project manager who has absorbed this cost without tracking it back to fabrication.'
    : 'Follow for weekly content on fabrication cost control for OEMs and project managers.'

  const engagementQuestion = ENGAGEMENT_QUESTIONS[p] ?? ENGAGEMENT_QUESTIONS['fabrication-bottlenecks']
  const repArr = REPURPOSING[p] ?? REPURPOSING['fabrication-bottlenecks']

  const qualityScore = scoreContent(inputs, true, true, true, mainPost.split(' ').length)

  const improvementSuggestions = [
    'Add a specific industry or project type to anchor the scenario to a recognizable context for your target audience.',
    'Include a specific dollar figure or percentage in the first line — fabrication operators respond to concrete numbers over abstract framing.',
    'Test a question-as-hook format for the first line — it forces the reader to apply the scenario to their own program.',
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
