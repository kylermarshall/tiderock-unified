import type { TwitterInputs, TwitterOutput } from '../types'
import { scoreContent } from '../lib/scoring'

const SINGLE_POSTS: Record<string, string[]> = {
  'injection-molding-defects': [
    "Most injection molding defect problems are not equipment problems.\n\nThey are process documentation problems.\n\nThe operation running 3% defects and the one running 18% often have the same press, the same mold, and the same resin.\n\nDifferent documentation discipline. Different result.",
    "Sink marks. Flash. Short shots. Warping.\n\nEach has a different mechanism.\n\nAll of them share a root cause: a process that runs on operator memory instead of documented, validated parameters.\n\nThe fix is not new equipment. It is process discipline.",
    "If your defect rate varies by operator, your process is not documented.\n\nThat is the diagnostic.\n\nAnd it means the fix is documentation — not personnel, not equipment, not a quality system overhaul.\n\nDocument. Validate. Lock. Verify.",
  ],
  'tooling-failures': [
    "The $40,000 mold quote and the $65,000 mold quote are not the same decision.\n\nOne is a build cost decision.\n\nThe other is a 5-year production cost decision.\n\nMost tooling approvals evaluate the first number. The second is where the program cost actually lives.",
    "Molds built to the lowest upfront cost fail 3–4x faster than properly engineered tooling.\n\nThe savings evaporate within the first production year.\n\nAnd the failure always happens during a peak production week — not during a planned maintenance window.",
    "Every dollar of tooling cost reduction from inadequate steel specification, undersized cooling circuits, or insufficient venting is a cost that gets paid again downstream.\n\nAt $3–$7 per dollar saved.\n\nMost tooling approval meetings do not run that math.",
  ],
  'production-bottlenecks': [
    "Your press is running.\n\nYour operators are busy.\n\nYour throughput is 22% below optimized target.\n\nNone of this shows up on a daily report — because cycle time inefficiency is distributed across every shot, not concentrated in a single downtime event.",
    "The capacity shortage that is driving a new press authorization may not be a capacity shortage.\n\nIt may be a cycle time efficiency gap.\n\nA 10-press operation running 20% below optimal cycle time has the equivalent of 2 phantom presses.\n\nAudit before you invest.",
    "Cooling time is set conservatively at qualification.\n\nPack time is extended to address a defect concern that was resolved 18 months ago.\n\nInjection speed is reduced because someone was chasing flash that turned out to be a venting issue.\n\nThat is how a press runs 25% below optimal throughput with nothing wrong.",
  ],
  'scrap-rework-cost': [
    "8–18% scrap in injection molding is not a quality metric.\n\nIt is a process stability metric.\n\nAnd it is telling you that the process is running without documented, validated parameters — not that the equipment or material is bad.",
    "Two injection molding plants. Same press. Same mold. Same resin.\n\nPlant A: 3% scrap. Plant B: 16% scrap.\n\nThe difference is not on the production floor.\n\nIt is in whether the process parameters are documented, locked, and verified at each shift start.",
    "The scrap bin in an injection molding operation is not a quality cost.\n\nIt is a process control cost.\n\nAnd it compounds on every shift — whether anyone is calculating it or not.\n\nAt $400,000 monthly resin spend and 12% scrap: $576,000 per year in resin not converted to product.",
  ],
  'mold-downtime': [
    "Mold maintenance deferred is not cost avoided.\n\nIt is downtime scheduled — at a time and duration your production team cannot control.\n\nThe ejector pin that fails at 11 PM before a Monday delivery did not fail randomly.\n\nIt wore down across thousands of cycles with no inspection.",
    "Operations without mold PM programs experience 60–80% more unplanned downtime than those with structured schedules.\n\nThe difference is not the molds.\n\nIt is the maintenance design.\n\nOr the absence of one.",
    "$350–$1,800 per hour of lost throughput during an unplanned mold stop.\n\nThe PM inspection that prevents the stop: $200–$800 per event.\n\nThe math on reactive vs. preventive mold maintenance is not subtle.\n\nMost plants are still running reactive.",
  ],
  'poor-part-consistency': [
    "Part-to-part weight variation above 0.5% is already predicting dimensional failures.\n\nMost injection molding operations are not using weight as a process stability indicator.\n\nThey are waiting for the dimensional failure to appear at inspection.\n\nThe signal was available hours earlier — at the press.",
    "The assembly line that keeps stopping is not a quality problem.\n\nIt is a supplier process stability problem.\n\nThe variation in melt temperature, pack pressure, and cooling time that is invisible at the press becomes a critical tolerance failure at the assembly station.",
    "First-pass yield failure in injection molding does not start at inspection.\n\nIt starts at the press — when melt temperature drifts 8 degrees, pack pressure varies 180 psi, and cooling time creeps 1.5 seconds.\n\nNone of those events triggers an alarm.\n\nTogether, they produce 22% yield failure.",
  ],
  'scaling-inefficiencies': [
    "The injection molding program that ran cleanly at prototype volume and fails at production volume did not suddenly become a bad process.\n\nIt became a process running at conditions it was never validated for.\n\nScale reveals assumptions. DFM review questions them before tooling is committed.",
    "60–70% of injection molding programs scaled without DFM review encounter design failures at volume.\n\nAverage engineering change cost: $25,000–$150,000.\n\nDFM review cost: $6,000–$12,000.\n\nThe math favors the review by a wide margin.",
    "Prototype tooling scaled to production volumes fails 2–3x faster than production-intent tooling.\n\nThe program that was enabled by prototype tooling is often the program that cannot scale without a mold rebuild.\n\nThe tooling decision made at program start determines whether scale is possible.",
  ],
  'material-waste': [
    "Your resin spend is not what your process requires.\n\nIt is what your process requires plus 8–25% that goes to sprues, runners, and purging.\n\nMost operations are not tracking that waste by job.\n\nSo it stays in the material cost line — invisible, unchallenged, and annual.",
    "Hot runner tooling eliminates sprue and runner waste.\n\nOn a program above 100,000 annual shots, the tooling premium pays back in 6–18 months.\n\nMost qualifying programs are still running cold runners.\n\nBecause the payback calculation was not run at tooling approval.",
    "Two injection molding programs. Same part. Same material. Same volume.\n\nProgram A: cold runners, 14% material waste.\n\nProgram B: hot runners, 3% material waste.\n\nOn $400,000 annual resin spend, that is a $44,000 annual cost difference.\n\nAnd a payback on the tooling premium in 6 months.",
  ],
  'process-cost-leakage': [
    "8–15% of annual injection molding production value lost to individually invisible inefficiencies.\n\nCycle time drift. Shot weight variation. Pack pressure inconsistency. Yield shortfall.\n\nNone of them appears on a single report.\n\nAll of them are caused by the same thing: a process running without closed-loop monitoring.",
    "Your production report shows 94% uptime.\n\nYour cost report shows resin 11% over budget.\n\nYour yield report shows 78% first-pass rate.\n\nAll three are accurate.\n\nAll three are caused by unmonitored process drift.\n\nSPC makes the connection — and closes it.",
    "If you summed your scrap, overtime, yield shortfall, and resin overage from last year and divided by revenue — that percentage is your process cost leakage.\n\nFor most injection molding operations, it is between 8% and 15%.\n\nNone of it appears on a single report.\n\nAll of it responds to process monitoring.",
  ],
  'tooling-lifecycle-cost': [
    "The cheapest injection mold in the quote comparison is not the lowest-cost mold.\n\nIt is the lowest build cost.\n\nOver five years, the total lifecycle cost — repair, refurbishment, downtime, scrap — averages 2–4x the build cost.\n\nMost tooling approvals evaluate the build cost only.",
    "Every dollar saved at tooling approval costs $3–$7 in downstream repair, downtime, and scrap.\n\nThat ratio is consistent enough to treat as a planning assumption.\n\nMost tooling approval meetings do not include a lifecycle cost model.\n\nSo the ratio pays out — on every production year of the program.",
    "The tooling decision is made once.\n\nThe production cost consequences last for the life of the program.\n\nA $30,000 tooling shortcut at approval generates $90,000–$210,000 in downstream costs over five years.\n\nThe math is available before the PO is signed.\n\nIt is almost never calculated then.",
  ],
}

const THREADS: Record<string, string[][]> = {
  'injection-molding-defects': [
    [
      "1/7 Most injection molding operations treat defects as a quality problem to catch at inspection.\n\nThey are a process control problem to prevent at the press.\n\nHere is why that distinction matters — and what it costs when it is missed. 🧵",
      "2/7 Every injection molding defect has a mechanism.\n\nSink marks: insufficient pack pressure or cooling time.\nFlash: inadequate clamp force or parting line wear.\nShort shots: fill speed, melt temperature, or gate sizing.\nWarping: differential cooling or insufficient gate balance.\n\nNone of these are random.",
      "3/7 Operations without documented process parameters experience defect rates 3–5x higher than those with validated, locked-in conditions.\n\nSame equipment. Same resin. Same mold.\n\nDifferent documentation discipline. Different defect rate.",
      "4/7 5–15% of total part output going to defects is not an acceptable operating range.\n\nIt is the predictable output of running a process without documentation.\n\nAt 300,000 monthly parts and 10% defect rate: 30,000 parts produced with no saleable output. Every month.",
      "5/7 The most expensive defect is not the one caught at inspection.\n\nIt is the one that escapes — to assembly, to the customer, to the field.\n\nA field recall triggered by an escaped defect can cost 10–100x the production value of the entire run.\n\nThe inspection system does not prevent this. The process does.",
      "6/7 The fix does not require new equipment.\n\nIt requires: a process specification documented at first article qualification, a validation protocol run at production launch, a scheduled verification at each shift start, and a response procedure for when parameters drift.\n\nThis is process discipline — not capital investment.",
      "7/7 The question to ask about your highest-volume program:\n\nDo you have a documented process specification with validated parameters?\n\nIs it verified at every shift start?\n\nIs there a response procedure for parameter drift?\n\nIf any answer is no — you have found where your defect rate comes from.",
    ],
  ],
  'tooling-lifecycle-cost': [
    [
      "1/7 The tooling approval meeting should be a 5-year cost conversation.\n\nIt is almost always a build cost conversation.\n\nThat gap costs injection molding programs an average of $3–$7 for every $1 saved at approval.\n\nHere is how it happens — and how to prevent it. 🧵",
      "2/7 The tooling comparison looks like this:\n\nVendor A: $68,000\nVendor B: $44,000\n\nSame part geometry. Similar lead time.\n\nProcurement selects Vendor B.\n\nThe $24,000 savings is real.\n\nWhat is not in the comparison: the 5-year lifecycle cost of each option.",
      "3/7 Vendor B used P20 pre-hardened steel for a program requiring H13 hardened tool steel at the expected production volume and material.\n\nMolds built with inadequate hardness fail 40–60% earlier than properly specified tooling.\n\nThe first refurbishment arrives 16 months into a 5-year program.",
      "4/7 Refurbishment: $42,000. 4-week lead time.\n\nProduction gap on a $180,000/month program: $720,000 in output impact.\n\nEmergency sourcing and expediting: $28,000.\n\nTotal cost of refurbishment event: $790,000.\n\nFrom a decision that saved $24,000.",
      "5/7 The Vendor A mold — $68,000, properly specified — was designed to run without refurbishment for 36 months on the same program.\n\n5-year total lifecycle cost: $68,000 build + $35,000 in planned maintenance = $103,000.\n\nVendor B 5-year cost: $44,000 + $790,000 year-one event + additional events in years 3–5.",
      "6/7 The lifecycle cost model takes 2 hours to build.\n\nInputs: build cost, steel specification, expected shot count at production volume, projected repair frequency by failure mode, repair cost estimate, and downtime cost per event.\n\nThe model turns a build cost comparison into a program cost comparison.\n\nThe decision changes.",
      "7/7 At the next tooling approval meeting, ask:\n\n→ What steel specification is being proposed, and why is it adequate for this production volume?\n→ What is the projected refurbishment interval at target shot count?\n→ What does refurbishment cost for this mold type?\n→ What is the per-hour cost of production downtime on this program?\n\nThe answers build the lifecycle model. The model makes the tooling decision a real cost decision.",
    ],
  ],
  'process-cost-leakage': [
    [
      "1/6 Most injection molding operations are losing 8–15% of annual production value to process cost leakage.\n\nNone of it appears on a single report.\n\nAll of it is traceable to the same root cause: a process running without closed-loop monitoring.\n\nHere is what that looks like — and what it costs. 🧵",
      "2/6 Process cost leakage is not one large inefficiency.\n\nIt is the accumulation of small ones:\n\n→ Cycle time drifting 0.8 seconds per hour over a 10-hour shift\n→ Shot weight varying 0.6% between cavities\n→ Pack pressure inconsistency creating marginal parts that pass inspection and fail in assembly\n→ Cooling time creeping 1.5 seconds above target by end of shift\n\nNone of these triggers an alarm. All of them have a cost.",
      "3/6 200–400 hours of productive press time lost per machine annually to unmonitored process drift.\n\nIn a 10-press operation: 2,000–4,000 hours of capacity consumed by drift — not by planned downtime, not by changeover.\n\nAt $700/hour average press cost: $1.4M–$2.8M in annual capacity absorbed by instability that no report identifies.",
      "4/6 The cost shows up dispersed:\n\n→ Resin spend 11% above projection → attributed to 'material cost'\n→ OEE at 76% → attributed to 'normal operating conditions'\n→ First-pass yield at 82% → 'within acceptable range'\n→ Overtime at 18% above plan → 'customer demand variability'\n\nEach explanation is individually plausible. Together, they are process cost leakage — reported as four separate variances with four different root causes.",
      "5/6 Operations implementing SPC on injection molding processes report 20–40% reductions in total quality-related cost within 12 months.\n\nThe monitoring does not improve the process directly.\n\nIt makes the drift visible — and visible drift has a root cause, and root causes are addressable.\n\nSPC converts process cost leakage from an invisible annual loss into a measurable, manageable cost driver.",
      "6/6 The starting point for any process leakage reduction program:\n\n→ Calculate the actual leakage: sum scrap, overtime, yield shortfall, and resin overage for the last 12 months ÷ revenue\n→ Pick the three highest-volume presses for initial SPC implementation\n→ Monitor melt temperature, pack pressure, cooling time, and shot weight\n→ Set alert thresholds at 80% of the alarm limit — catching drift before it accumulates\n\nThe leakage number is the baseline. SPC is the mechanism that reduces it.",
    ],
  ],
  'scrap-rework-cost': [
    [
      "1/6 An injection molding operation running 14% scrap is not running bad parts.\n\nIt is running an uncontrolled process.\n\nHere is what that costs, what causes it, and what closes the gap. 🧵",
      "2/6 The scrap rate differential between controlled and uncontrolled injection molding operations is 8–18% vs. 1–4%.\n\nThat 10–14 point gap does not come from equipment differences.\n\nIt comes from whether process parameters are documented, validated, and verified — or managed by operator experience.",
      "3/6 The financial impact at $400,000 monthly resin spend:\n\n14% scrap: $56,000/month in resin not converted to product.\n4% scrap: $16,000/month.\n\n$40,000/month difference. $480,000/year.\n\nFrom a process documentation system that costs less than one month's scrap differential to implement.",
      "4/6 Rework compounds the cost.\n\nParts that come out dimensionally marginal — acceptable at inspection, marginal in assembly — go to secondary operations.\n\nAt $0.15–$2.50 per part in rework labor, a 500,000-part monthly program with 8% rework volume adds $60,000–$1M in annual rework labor.\n\nOn top of the scrap.",
      "5/6 The implementation sequence that closes the gap:\n\n1. Document process parameters at first article qualification — melt temperature, injection speed, pack pressure, cooling time, shot weight\n2. Validate parameters during production qualification run\n3. Lock parameters in the process specification — change control required for any modification\n4. Verify parameters at each shift start\n5. Build a response procedure for out-of-spec parameters\n\nThis framework moves a 14% scrap operation to 3–5% within 6–12 months.",
      "6/6 The question most operations have not answered:\n\nHow much is your current scrap rate costing annually in direct resin cost alone?\n\nThe calculation: monthly resin spend × scrap rate % × 12.\n\nMost operations that run this number for the first time have never seen the annual total.\n\nThat number is the case for process documentation investment. It makes itself.",
    ],
  ],
}

const CONTRARIAN_TAKES: Record<string, string[]> = {
  'injection-molding-defects': [
    "Unpopular take: your quality inspection system is not protecting you from defect cost.\n\nIt is recovering some of it — after the defect has already been produced.\n\nThe press time, the resin, the energy: already spent.\n\nThe only protection is a controlled process that does not produce the defect.",
    "If your defect rate varies by shift, you do not have a quality problem.\n\nYou have a documentation problem.\n\nDifferent shifts produce different defect rates because they are running different settings.\n\nDifferent settings because there are no documented, validated, locked parameters.",
  ],
  'tooling-failures': [
    "The tooling quote that saves $20,000 at approval is not a savings.\n\nIt is a deferred cost — with interest.\n\n$20,000 saved becomes $60,000–$140,000 in downstream repair and downtime over the program life.\n\nMost procurement teams make this trade without knowing they made it.",
    "High tooling quote does not equal high lifecycle cost.\n\nLow tooling quote almost always equals high lifecycle cost.\n\nThe relationship is inverse — and consistent enough across programs to treat as a rule.\n\nMost tooling approval processes do the opposite of what this rule implies.",
  ],
  'production-bottlenecks': [
    "The capital request for additional press capacity should include a cycle time audit first.\n\nNot as a formality.\n\nBecause the capacity shortfall may not be a capacity shortfall.\n\nIt may be 20% cycle time inefficiency across the existing press base — recoverable without capital.",
    "A press running at 100% utilization with cycle times 18% above optimal is not running at full capacity.\n\nIt is running at 82% capacity — plus 100% of the utilization metric.\n\nOEE tells the truth. Utilization flatters the report.",
  ],
  'scrap-rework-cost': [
    "Scrap is not a quality metric.\n\nIt is a process control metric.\n\nEvery percentage point of scrap above baseline is telling you that the process is not stable — not that the parts are bad.\n\nThe difference in diagnosis leads to a very different (and much cheaper) fix.",
    "A quality hold at end of production run is the most expensive possible time to discover a process problem.\n\nAll the value has been added. All the material has been consumed. All the press time has been spent.\n\nIn-process monitoring catches the same problem at the beginning of the event — at a fraction of the cost.",
  ],
  'mold-downtime': [
    "Reactive mold maintenance is not cheaper than preventive maintenance.\n\nIt is more expensive — and less predictable.\n\nThe reactive event always happens during production. The preventive event is scheduled during changeover.\n\nOne costs throughput. The other costs labor.",
    "The mold PM program is not a maintenance cost.\n\nIt is a production reliability investment.\n\nThe cost of one unplanned mold failure exceeds the annual cost of a structured PM program for that mold.\n\nThe math is not close. Most operations are still running reactive.",
  ],
  'poor-part-consistency': [
    "Increasing inspection frequency at the end of a production run does not fix part inconsistency.\n\nIt finds more of it — after the maximum cost has been added.\n\nThe fix for inconsistency is upstream: at the press, in the process parameters, in the monitoring system that catches drift before it compounds.",
    "Parts that pass inspection can still fail assembly.\n\nConsistency is not the same as conformance.\n\nA part that measures within tolerance individually can still produce assembly failure when the variation between parts is unpredictable.\n\nProcess stability produces consistency. Inspection produces conformance data.",
  ],
  'scaling-inefficiencies': [
    "A successful prototype run is not process validation.\n\nIt is a successful prototype run.\n\nValidation requires characterization at the conditions, volumes, and cycle rates that production will actually impose.\n\nMost programs launch production without having done that.",
    "The DFM review that is skipped to save time produces the engineering change that costs 10x the review.\n\nThis is not a coincidence.\n\nIt is the predictable output of moving a process from characterization to production without stress-testing the assumptions at scale.",
  ],
  'material-waste': [
    "The resin spend variance that runs 12% above projection every month is not a purchasing problem.\n\nIt is a process design problem — decided at the tooling approval meeting months or years before the first variance report was filed.\n\nThe waste was built into the process at design. The invoice is just where it shows up.",
    "Hot runner tooling is not an optional upgrade for high-volume injection molding programs.\n\nFor programs above 100,000 annual shots, it is the lower-cost tooling option when the material cost is included in the comparison.\n\nMost tooling comparisons stop at build cost. The material cost analysis changes the conclusion.",
  ],
  'process-cost-leakage': [
    "If your operations team can explain every production variance individually, that does not mean the variances are explained.\n\nIt means each is attributed separately — while the common cause goes unidentified.\n\nProcess drift produces multiple symptoms simultaneously. Each symptom gets its own explanation. The root cause gets none.",
    "96% uptime and 76% OEE can both be accurate.\n\nThe 20-point gap between them is where the process cost leakage lives.\n\nMost operations report uptime.\n\nThe operations that manage cost report OEE — and then investigate the causes of the gap.",
  ],
  'tooling-lifecycle-cost': [
    "The tooling approval process that evaluates build cost is not evaluating cost.\n\nIt is evaluating one component of cost — before the production program has started and before 80% of the total cost has been incurred.\n\nA build cost comparison is not a tooling cost comparison.",
    "The $24,000 saved at tooling approval on a five-year program is not a $24,000 decision.\n\nIt is a five-year production cost decision with a median downstream cost of $90,000–$160,000.\n\nMost procurement decisions are made on the $24,000 — because the lifecycle model was never built.",
  ],
}

const FOUNDER_POSTS: Record<string, string[]> = {
  'injection-molding-defects': [
    "I spent three years managing quality in an injection molding operation before I understood the actual source of our defect rate.\n\nWe had great equipment. Experienced operators. Rigorous inspection.\n\nAnd 11% scrap.\n\nThe problem was not any of those things.\n\nIt was that we had never formally documented process parameters. Every shift started with someone's best recollection of what had worked last time.\n\nWe documented, validated, and locked parameters on our five highest-volume programs. Scrap dropped to 3.4% across those programs within eight months.\n\nThe equipment did not change. The documentation did.",
    "The most expensive lesson I learned in injection molding management: a passed inspection report does not mean a stable process.\n\nWe had parts passing first-article inspection, passing incoming inspection at the customer, and failing in the field.\n\nAudit found: melt temperature drifting 12 degrees over a shift. No alarm. No flag. Just drift — and marginal parts that passed every inspection checkpoint but carried residual stress that produced field failure.\n\nWe added weight monitoring with a 0.5% trigger at the press.\n\nThe field failures stopped. The process had not changed. The monitoring had.",
  ],
  'tooling-failures': [
    "I have approved five tooling bids in the last four years.\n\nThree times, I selected the lower-cost option.\n\nTwo of those three molds have required unplanned refurbishment.\n\nThe third is showing early parting line wear at month 14 of a planned 48-month run.\n\nThe fourth and fifth bids: I built a lifecycle cost model first. Selected the higher-cost option both times. Both molds are running on schedule, on spec, at month 22 and month 18 respectively.\n\nThe lifecycle model takes two hours to build.\n\nI should have built it for the first three.",
    "We had a tooling failure in month 11 of a critical program. Core damage. Four-week repair lead time. $62,000 repair cost. Roughly $720,000 in production impact on a customer-critical program.\n\nThe post-mortem: P20 steel where H13 was required for the resin and cycle rate we were running.\n\nThe toolmaker who sold us the mold knew our production parameters.\n\nWe never asked about steel specification during the approval process.\n\nWe ask now — every time, for every mold, with a minimum hardness requirement tied to shot count and material.",
  ],
  'process-cost-leakage': [
    "Two years ago I could not tell you what process cost leakage was costing our operation.\n\nNot because the cost did not exist — but because it was spread across four budget lines with four different owners and four separate explanations.\n\nResin overage: 'market pricing.' Overtime: 'customer demand.' Scrap: 'within normal range.' Yield shortfall: 'tooling wear.'\n\nAll four were actually process drift — unmonitored melt temperature variation, pack pressure inconsistency, and cooling time creep.\n\nWe implemented SPC on our six primary presses. Total quality-related cost dropped 31% in 11 months.\n\nThe cost was always there. The monitoring made it visible. Visibility made it fixable.",
  ],
  'tooling-lifecycle-cost': [
    "I ran a tooling portfolio analysis last year across our 24 active molds.\n\nTotal build cost: $1.24M.\n\nActual 5-year lifecycle cost projection based on repair history: $3.8M.\n\nMultiplier: 3.1x.\n\nOf the 24 molds, 7 had already required unplanned refurbishment before their designed midpoint.\n\nAll 7 were built to cost — steel specification inadequate for the production volume and material they were running.\n\nWe now require a lifecycle cost model for every tooling approval above $15,000.\n\nIt has changed which quotes we select — and which suppliers we use.",
  ],
}

const QUOTE_RESPONSE_POSTS: Record<string, string> = {
  'injection-molding-defects': '"We\'ve always run around 10% scrap — it\'s just how injection molding works at our volume." — This is not a manufacturing constraint. It is a documentation constraint. Operations at the same volume, running the same materials, with documented and locked process parameters consistently achieve 2–4% scrap. The 10% is the cost of running without process controls, not the cost of injection molding.',
  'tooling-failures': '"We went with the lower-cost mold to protect budget." — Build cost and program cost are different numbers. Every dollar saved on tooling upfront costs $3–$7 downstream in repair, downtime, and scrap. The budget was protected at approval. The program cost was not.',
  'production-bottlenecks': '"We are at capacity and need another press." — Before authorizing capital, run a cycle time audit. A 10-press operation running 20% below optimal cycle time has the equivalent of two phantom presses — capacity that exists and is not being accessed. The audit takes two weeks. The capital authorization takes months and costs seven figures.',
  'scrap-rework-cost': '"Our scrap rate varies — some weeks are better than others." — If the scrap rate varies, the process is not stable. Stable processes produce predictable scrap rates. Variable scrap rates are the signal that process parameters are drifting — and drifting parameters are documentable, lockable, and controllable.',
  'mold-downtime': '"We fix molds when they fail." — Reactive maintenance is not a cost strategy. It is a cost transfer — from planned maintenance events to unplanned production stoppages at $350–$1,800 per hour. The repair cost is similar either way. The downtime cost is not.',
  'poor-part-consistency': '"Our parts pass inspection before shipping." — Conformance and consistency are different standards. Parts that pass inspection individually can still fail assembly when part-to-part variation is unpredictable. The assembly line stoppage rate is the test of consistency. Inspection is the test of conformance.',
  'scaling-inefficiencies': '"The prototype ran clean — we\'re ready for production launch." — A successful prototype run proves the design concept. It does not validate the process at production conditions. Those are different things. The scale-up failures that cost $25,000–$150,000 in engineering changes happen to programs that confused one for the other.',
  'material-waste': '"Resin is a commodity cost — we manage it at the purchasing level." — Material waste in injection molding is a process design cost, not a purchasing cost. It was decided at the tooling approval meeting, in the runner design, in the hot vs. cold runner decision. Purchasing buys the waste along with the material — but it was engineered in long before the first PO.',
  'process-cost-leakage': '"Our OEE is at 76% — that\'s within normal for our operation." — Normal is not efficient. 76% OEE means 24% of available capacity is not producing revenue. Some of that is planned and unrecoverable. But 8–15 points of it is typically process drift — invisible to the uptime report, visible to SPC, and recoverable with closed-loop monitoring.',
  'tooling-lifecycle-cost': '"We always go with the most competitive tooling quote." — Competitive on what basis? Build cost is the metric most tooling approvals use. Lifecycle cost is the metric that determines what the program actually costs to run. These metrics point to different selections in a majority of tooling comparisons.',
}

const ALTERNATE_HOOKS: Record<string, string[]> = {
  'injection-molding-defects': ["The defect rate is not what the machine produced. It is what the process allowed. And the process is documented — or it is not.", "Operations running 3% defect rates and operations running 15% defect rates often have the same equipment. The documentation discipline is what differs."],
  'tooling-failures': ["The tooling approval meeting that skips the lifecycle cost model is authorizing a production cost, not a tooling cost.", "The cheapest mold is the one that runs for five years without refurbishment. That is almost never the lowest build cost."],
  'production-bottlenecks': ["The capacity shortage that triggers a capital request may already be solved — in the cycle time gap on running production.", "Cycle time is the most accessible throughput variable in injection molding and the least frequently audited after qualification."],
  'scrap-rework-cost': ["The scrap bin in an injection molding operation is not a quality metric. It is a process documentation scorecard.", "The operation that cannot explain why its scrap rate varies shift to shift does not have a quality problem. It has a documentation problem."],
  'mold-downtime': ["Every mold failure has a shot count. The PM schedule that catches it before that count is the only variable that determines whether the failure is planned or unplanned.", "The most expensive mold maintenance is reactive. The second most expensive is preventive. Neither has to be the default if the schedule is built from process data."],
  'poor-part-consistency': ["The assembly line stoppage rate is a direct measure of your injection molding supplier's process stability. Most OEMs are not reading it that way.", "Part weight at the press is a process stability signal. It is available before any dimensional measurement can be taken — and most operations are not using it."],
  'scaling-inefficiencies': ["The defect rate that increases as volume scales is not a production problem. It is a validation gap — the process was never characterized at production conditions.", "DFM review for injection molding scale-up is not a design review. It is a production cost risk review. And it pays back at 10–20x its cost when scale-up failures are prevented."],
  'material-waste': ["The resin variance that runs 12% above projection monthly is not a purchasing problem. It was decided at tooling design — in the runner system, the gate design, and the purge sequence.", "Material waste in injection molding is annual. The tooling decisions that determine it are made once. The economics of that math favor hot runner investment on most qualifying programs."],
  'process-cost-leakage': ["Process cost leakage is not one problem. It is the sum of small ones — each within acceptable tolerance individually, collectively consuming 8–15% of annual production value.", "The production report that shows acceptable metrics across every category can still be hiding seven figures in annual process cost leakage. SPC is how you find it."],
  'tooling-lifecycle-cost': ["A tooling build cost comparison is not a tooling cost comparison. It is a comparison of the first 30–40% of the total program tooling cost.", "The lifecycle cost of an injection mold is 2–4x the build cost over five years. The programs that beat that ratio modeled it at approval. The programs that do not are paying the difference."],
}

const ENGAGEMENT_QUESTIONS: Record<string, string> = {
  'injection-molding-defects': "What is your current defect or scrap rate on your highest-volume program — and do you have documented, validated process parameters for that part?",
  'tooling-failures': "What was your last unplanned tooling failure event? What was the total cost including downtime, expediting, and production gap?",
  'production-bottlenecks': "When did you last run a cycle time audit on your active molds? What did the gap between actual and optimal cycle time look like?",
  'scrap-rework-cost': "If you calculated your annual scrap cost in direct resin dollars, what would the number be? Most operations have never run this calculation.",
  'mold-downtime': "What is the shot count on your highest-volume mold, and when was the last formal inspection? The gap between those two numbers is your current PM status.",
  'poor-part-consistency': "Are you tracking part weight as a real-time process stability indicator at the press? If not, what is your earliest signal of dimensional drift?",
  'scaling-inefficiencies': "What volume did you qualify your last injection molding program at versus what volume you launched production at? Did you run a process characterization study at the production conditions?",
  'material-waste': "What percentage of your annual resin spend is going to sprues, runners, purging, and startup scrap? If you do not know the number, that is the starting point.",
  'process-cost-leakage': "If you summed your scrap, overtime, yield shortfall, and resin overage from last year and divided by revenue, what percentage would that be? That is your process cost leakage number.",
  'tooling-lifecycle-cost': "Does your tooling approval process include a lifecycle cost model, or does the decision stop at build cost comparison? How has that approach worked across your active tooling portfolio?",
}

const REPURPOSING: Record<string, string[]> = {
  'injection-molding-defects': ['Turn the documentation discipline framework into a LinkedIn post for plant managers and operations directors', 'Convert the "defect rate by operator" diagnostic into an Instagram carousel for quality engineers', 'Use the escaped defect cost multiplier as a YouTube Shorts hook'],
  'tooling-failures': ['Pull the lifecycle cost model framework into a LinkedIn post', 'Convert the two-quote comparison into a Facebook educational post for procurement and engineering teams', 'Use the steel specification question as an Instagram carousel: "Ask your toolmaker this before signing the PO"'],
  'production-bottlenecks': ['Turn the phantom press concept into a LinkedIn contrarian post for VPs of Manufacturing', 'Convert the cycle time audit process into a Facebook educational post for operations managers', 'Use the capital vs. optimization frame as a YouTube Shorts hook'],
  'scrap-rework-cost': ['Pull the scrap rate differential into a LinkedIn post for plant managers', 'Convert the process documentation implementation sequence into a Facebook educational post', 'Use the two-plant comparison as an Instagram carousel: "Same equipment. 11% scrap rate difference."'],
  'mold-downtime': ['Turn the reactive vs. preventive cost comparison into a LinkedIn post', 'Convert the shot-count PM interval calculation into a Facebook educational post for mold engineers', 'Use the 2 AM failure scenario as a YouTube Shorts hook'],
  'poor-part-consistency': ['Pull the assembly stoppage stat into a LinkedIn post for supply chain and OEM procurement audiences', 'Convert the weight monitoring protocol into a Facebook educational post for quality engineers', 'Use the "parts pass inspection, fail assembly" frame as a Twitter/X contrarian take'],
  'scaling-inefficiencies': ['Turn the DFM review ROI into a LinkedIn post for product development engineers', 'Convert the three failed programs scenario into a Facebook case study post', 'Use the "prototype ≠ validation" distinction as a Twitter/X contrarian take'],
  'material-waste': ['Pull the hot runner payback calculation into a LinkedIn post for plant managers and engineers', 'Convert the material waste tracking method into a Facebook educational post for operations teams', 'Use the two-program material efficiency comparison as a YouTube Shorts hook'],
  'process-cost-leakage': ['Turn the OEE vs. uptime gap into a LinkedIn contrarian post', 'Convert the SPC implementation sequence into a Facebook educational post for operations managers', 'Use the "four separate explanations, one root cause" frame as a Twitter/X thread'],
  'tooling-lifecycle-cost': ['Pull the $3–$7 downstream cost ratio into a LinkedIn post for procurement and engineering teams', 'Convert the tooling portfolio analysis into a Facebook educational post', 'Use the refurbishment math as a YouTube Shorts hook: "The $24,000 tooling savings that cost $790,000"'],
}

export function generateTwitter(inputs: TwitterInputs, seed: number = 0): TwitterOutput {
  const v = seed % 3
  const p = inputs.problem
  const fmt = inputs.postFormat

  const singlePostsArr = SINGLE_POSTS[p] ?? SINGLE_POSTS['injection-molding-defects']
  const mainPost = singlePostsArr[v] ?? singlePostsArr[0]

  let thread: string[] | undefined
  if (fmt === 'thread') {
    const threadOptions = THREADS[p] ?? THREADS['injection-molding-defects']
    thread = threadOptions[v % threadOptions.length] ?? threadOptions[0]
  } else if (fmt === 'contrarian') {
    const contrarianArr = CONTRARIAN_TAKES[p] ?? CONTRARIAN_TAKES['injection-molding-defects']
    thread = [contrarianArr[v % contrarianArr.length] ?? contrarianArr[0]]
  } else if (fmt === 'founder') {
    const founderArr = FOUNDER_POSTS[p] ?? FOUNDER_POSTS['injection-molding-defects']
    thread = [founderArr[v % founderArr.length] ?? founderArr[0]]
  } else if (fmt === 'quote-response') {
    const qr = QUOTE_RESPONSE_POSTS[p] ?? QUOTE_RESPONSE_POSTS['injection-molding-defects']
    thread = [qr]
  }

  const altHooksArr = ALTERNATE_HOOKS[p] ?? ALTERNATE_HOOKS['injection-molding-defects']
  const alternateHook = altHooksArr[v % altHooksArr.length] ?? altHooksArr[0]

  const cta = v === 0
    ? 'What does this look like in your molding operation? Share in the comments.'
    : v === 1
    ? 'Tag an engineering manager who has absorbed this cost without tracking it back to process control.'
    : 'Follow for weekly content on injection molding cost control for engineers and operations leaders.'

  const engagementQuestion = ENGAGEMENT_QUESTIONS[p] ?? ENGAGEMENT_QUESTIONS['injection-molding-defects']
  const repArr = REPURPOSING[p] ?? REPURPOSING['injection-molding-defects']

  const qualityScore = scoreContent(inputs, true, true, true, mainPost.split(' ').length)

  const improvementSuggestions = [
    'Add a specific production volume or part type to anchor the scenario to a recognizable context for injection molding engineers and plant managers.',
    'Include a specific dollar figure or percentage in the first line — manufacturing professionals respond to concrete numbers over abstract framing.',
    'Test a question-as-hook format for the first line — it forces the reader to apply the scenario to their own operation.',
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
