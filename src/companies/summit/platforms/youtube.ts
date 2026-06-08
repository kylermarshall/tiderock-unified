import type { YouTubeInputs, YouTubeOutput } from '../types'
import { PROBLEM_DATA, COMPANY } from '../lib/companyProfile'
import { scoreContent } from '../lib/scoring'

const TITLES: Record<string, string[]> = {
  'coating-inconsistency': [
    'Why Your Seed Coating Is Failing Before It Reaches the Planter',
    'The Coating Variation Problem Seed Companies Don\'t Measure Until It\'s Too Late',
    'Coating Weight Drift: What It Costs and How to Stop It',
  ],
  'germination-variability': [
    'Why Germination Inconsistency Is a Coating Problem — Not a Genetics Problem',
    'The 35% Rule: How Seed Preparation Drives Field Germination Variability',
    'Uneven Emergence: Tracing It Back to the Processing Line',
  ],
  'seed-treatment-complexity': [
    'Multi-Chemistry Seed Treatments Are Failing — Here\'s Why',
    'When Seed Treatment Stacks Don\'t Work: The Compatibility Problem No One Talks About',
    'The Hidden Cost of Complex Seed Treatment Programs',
  ],
  'planting-performance-risk': [
    'How Coating Weight Variation Breaks Planter Meter Performance',
    'Skip Rates at Planting Trace Back to the Coating Line — Not the Planter',
    'Why Seed Singulation Fails When Coating Specs Aren\'t Validated',
  ],
  'seed-handling-issues': [
    'Coating Dust and Abrasion: The Handling Problem That Starts Before Planting',
    'Why Your Seed Coating Fails in the Grain Wagon — Before It Reaches the Planter',
    'Flowability Problems in Coated Seed: What\'s Causing Them and What to Fix',
  ],
  'pelleting-precision': [
    'Pellet Quality and Singulation Failure: The Connection Specialty Crop Operations Miss',
    'Why Pelleted Seed Fails at Planting — and What the Numbers Show',
    'Roundness, Weight Uniformity, and Stand Consistency in Precision-Seeded Crops',
  ],
  'poor-seed-prep-cost': [
    'The Real Cost of a Failed Seed Lot — Beyond the Rework Bill',
    'Why Seed Companies Pay 3–5x More When Coating Records Can\'t Be Traced',
    'What a $50,000 Lot Rejection Actually Costs a Seed Business',
  ],
  'crop-establishment': [
    'Crop Establishment Failure: Where the Decision Was Actually Made',
    'How Seed Coating Decisions Drive Stand Failure — and What to Change',
    'The 85% Stand Rule and Why Coating Specs Determine Whether You Hit It',
  ],
  'scaling-operations': [
    'Why Scaling Seed Coating Operations Makes Inconsistency Worse',
    'The Process Control Problem That Grows With Your Coating Volume',
    'How Equipment Calibration Drift Kills Quality at Scale',
  ],
  'grower-trust': [
    'One Bad Season of Field Performance — What It Actually Costs a Seed Company',
    'Why Growers Blame the Seed Company When Coating Records Don\'t Exist',
    'The Complaint Cost Multiplier: Traceability, Trust, and Seed Lot Documentation',
  ],
}

const THUMBNAIL_TEXT: Record<string, string[]> = {
  'coating-inconsistency': ['COATING VARIATION = STAND LOSS', 'YOUR COATING IS DRIFTING', '3% VARIATION. REAL CONSEQUENCES.'],
  'germination-variability': ['NOT A GENETICS PROBLEM', '35% FROM SEED PREP', 'COATING CAUSES GERMINATION FAILURE'],
  'seed-treatment-complexity': ['CHEMISTRY STACKING FAILURE', 'YOUR TREATMENT ISN\'T WORKING', 'COMPATIBILITY = EFFICACY'],
  'planting-performance-risk': ['COATING BREAKS YOUR PLANTER', 'SKIP RATES TRACE TO COATING', 'SINGULATION STARTS AT THE COATER'],
  'seed-handling-issues': ['COATING FAILS IN TRANSIT', '18% LOSS BEFORE PLANTING', 'HANDLING KILLS YOUR COATING'],
  'pelleting-precision': ['PELLET QUALITY = STAND QUALITY', '5% VARIATION = SINGULATION FAILURE', 'ROUNDNESS DETERMINES YOUR STAND'],
  'poor-seed-prep-cost': ['$80K REJECTION. ONE DECISION.', 'BAD RECORDS = 5X COST', 'THE REAL COST OF POOR PREP'],
  'crop-establishment': ['STAND FAILURE STARTS AT COATING', 'COATING SPEC = ESTABLISHMENT RISK', '85% STAND OR REPLANT'],
  'scaling-operations': ['SCALE AMPLIFIES INCONSISTENCY', 'CALIBRATION DRIFT AT SCALE', 'MORE VOLUME, MORE VARIATION'],
  'grower-trust': ['ONE BAD SEASON. 55% LOSS.', 'NO RECORDS = BLAME', 'TRUST IS LOST AT COATING'],
}

const THREE_SECOND_HOOKS: Record<string, string[]> = {
  'coating-inconsistency': [
    'If your coating weight varies more than 3%, your seed lot has already failed — you just don\'t know it yet.',
    'Coating inconsistency doesn\'t show up in the germination test. It shows up in the field.',
    'The most expensive coating problem isn\'t visible at the bag.',
  ],
  'germination-variability': [
    'Up to 35% of field germination inconsistency starts at the coating line — not in the genetics.',
    'Uneven emergence isn\'t a weather problem. It\'s a seed preparation problem.',
    'When your stands are uneven, the coating decision is usually where it started.',
  ],
  'seed-treatment-complexity': [
    'Multi-chemistry treatment programs fail at 3x the rate when compatibility isn\'t validated.',
    'Stacking 8 active ingredients without compatibility testing is not a treatment program. It\'s a liability.',
    'Your seed treatment is losing 20–40% of its efficacy — and you can\'t see it at the bag.',
  ],
  'planting-performance-risk': [
    'Coating weight variation above spec drops singulation accuracy by 15–30%. That\'s not a planter problem.',
    'Skip rates at planting trace back to the coating line — not the meter.',
    'Your planter is calibrated for a seed size that your coating process can\'t consistently deliver.',
  ],
  'seed-handling-issues': [
    'Up to 18% of your coating material is gone before the seed reaches the planter.',
    'Coating dust during handling isn\'t just a regulatory issue — it means your coating is degrading.',
    'Seed flowability variation above 20% causes population inconsistency at every pass.',
  ],
  'pelleting-precision': [
    'Pellet weight variation above 5% is the primary driver of singulation failure in specialty crops.',
    'Roundness deviation of 0.08 drops vacuum seeder accuracy by up to 35%.',
    'Your pellet quality determines your stand — before a seed ever touches the soil.',
  ],
  'poor-seed-prep-cost': [
    'A single lot rejection costs $15,000 to $80,000. The coating decision that caused it cost almost nothing to prevent.',
    'Seed companies without traceable coating records pay 3–5x more when field complaints arrive.',
    'The cost of poor seed preparation is never paid at the processing line.',
  ],
  'crop-establishment': [
    'Stand failures below 85% increase yield loss probability by 20–40%. The coating decision is usually why.',
    'Replanting a specialty crop costs $800 to $4,500 per acre — plus the market window you\'ll never recover.',
    'Crop establishment failures are diagnosed at the field. The decision that caused them was made at seed prep.',
  ],
  'scaling-operations': [
    'Scaling your coating volume without process documentation increases batch variation by 25–50%.',
    'Equipment calibration drift compounds with every 100,000-unit run. Most operations don\'t re-validate.',
    'Scale doesn\'t fix coating inconsistency. It amplifies it.',
  ],
  'grower-trust': [
    'One season of field performance inconsistency reduces repeat purchase intent by 35–55%.',
    'When coating records don\'t exist, growers blame the seed company — 3x more often than any other factor.',
    'Grower trust is not lost in the field. It\'s lost at the coating line.',
  ],
}

const OPENING_LINES: Record<string, string[]> = {
  'coating-inconsistency': [
    `Here\'s what most seed companies don\'t measure until a grower calls: coating weight variation across a lot. When that variation exceeds 3–5%, emergence timing shifts, stand uniformity drops, and the seed company gets the complaint — even if the genetics were fine.`,
    `Coating inconsistency is the most common seed performance problem that seed companies fail to catch before the bag leaves the facility. Today we\'re going to break down what causes it, what it costs, and what a controlled coating program actually looks like.`,
    `The coating process creates the seed\'s interface with the planting environment. When that interface is inconsistent — from worn equipment, binder variation, or application drift — every agronomic advantage built into the seed genetics becomes harder to deliver.`,
  ],
  'germination-variability': [
    `When growers report uneven emergence, the genetics get blamed first. But up to 35% of field germination inconsistency in commercial seed lots traces back to seed preparation — coating thickness, treatment application rate, seed-to-seed treatment transfer — not the variety.`,
    `Germination variability that exceeds 15% in your standard tests often signals a coating or treatment issue that wasn\'t caught at the processing stage. This video breaks down the mechanisms and what controlled seed preparation looks like.`,
    `Emergence timing variation of more than 3–5 days within a seed lot creates yield drag of 8–15% in row crops. The plants that emerge late never recover. And the decision that caused the timing variation was usually made before the seed left the facility.`,
  ],
  'seed-treatment-complexity': [
    `Multi-chemistry seed treatment programs — combining fungicides, insecticides, biostimulants, and inoculants — require sequencing validation to prevent chemical interaction, carrier incompatibility, and coating adhesion failures. Without that validation, you\'re losing 20–40% of treatment efficacy before the seed is planted.`,
    `Operations handling 8 or more active ingredient combinations without formal compatibility testing experience formulation failures at 3 times the rate of operations with validated programs. This video covers what a validated treatment program looks like and why most in-house operations skip the steps that matter.`,
    `Seed treatment complexity is not a chemistry problem. It\'s a process control problem. The chemistry works when the process is right. When it\'s not, the failure compounds through every bag of seed that leaves the facility.`,
  ],
  'planting-performance-risk': [
    `Planter meter calibration is based on seed size, shape, and coating weight. When your coating process introduces variation — weight drift, surface texture inconsistency, or film integrity failure — the meter is working against a moving target. That\'s where skip rates come from.`,
    `Seed singulation accuracy at the planter drops 15–30% when coating weight deviates from the meter\'s calibration range. That\'s not a planter problem. That\'s a coating spec problem — and it\'s fixable at the processing stage.`,
    `Growers who report skip rates above 3% at recommended planting populations are often dealing with coating weight variation that shifted effective seed size outside the meter\'s working range. The coating decision was made months before planting.`,
  ],
  'seed-handling-issues': [
    `Seed loses 8–18% of its coating material during bulk handling — gravity wagons, air seeders, pneumatic conveyors — when coatings aren\'t formulated for handling durability. That material loss doesn\'t show up in a germination test. It shows up at the planter.`,
    `Coating dust generated during handling and transport creates two problems: regulatory exposure under worker protection standards, and evidence that your coating is actively degrading before planting. Both are preventable at the formulation stage.`,
    `Flowability variation above 20% across a coated lot — from coating weight inconsistency, clumping, or tackiness — causes meter calibration drift and inconsistent population at every pass. The fix starts at the coating line, not the planter.`,
  ],
  'pelleting-precision': [
    `In precision-seeded crops, pellet quality determines planting performance. Pellet weight variation above 5% causes singulation failures at the vacuum seeder — the primary driver of skip rates and doubles in vegetable, flower, and specialty crop production.`,
    `Roundness deviation above 0.08 in pelleted seed reduces vacuum seeder singulation accuracy by 18–35%. That directly affects crop stand uniformity and harvest timing consistency — two of the most valuable outcomes in high-value specialty crop production.`,
    `Pellet integrity failures — cracking, shattering, excessive water absorption before germination — occur in 12–25% of pelleted lots that weren\'t validated against target soil moisture and temperature at planting. This video covers what validation looks like.`,
  ],
  'poor-seed-prep-cost': [
    `The cost of a failed seed preparation decision is never paid at the processing line. It\'s paid in the field, at the claim, and in the customer relationship — three months after the decision was made. And by then, the options are limited.`,
    `Seed companies that attribute field performance complaints to genetics rather than seed preparation spend 3–5 times more on warranty replacement, customer service, and reputational recovery than those with traceable coating and treatment records.`,
    `A single lot rejection from coating failure, treatment error, or pellet quality rejection averages $15,000 to $80,000 per event. The process control decision that could have prevented it typically costs a fraction of that.`,
  ],
  'crop-establishment': [
    `Crop establishment failures — stands below 85% of target population in the first 14 days — increase yield loss probability by 20–40%. The coating decision is usually where the failure started, and it\'s the last thing investigated.`,
    `In high-value vegetable and specialty crops, stand failures requiring replanting cost $800 to $4,500 per acre in direct cost — plus lost market window value that can exceed the direct cost by 2–3 times. Seed coating decisions that don\'t account for the planting environment create this risk.`,
    `Crop establishment is where seed preparation decisions get scored. Coating specifications that weren\'t validated for target soil type, moisture, and temperature create preventable establishment risk that rarely gets diagnosed correctly at the field level.`,
  ],
  'scaling-operations': [
    `Operations that scale from 50,000 to 500,000 units per season without process documentation see batch-to-batch variation increase by 25–50% as volume grows. Scale doesn\'t solve coating inconsistency — it amplifies it.`,
    `Equipment calibration drift of 3–5% per 100,000-unit production run requires formal re-validation protocols. Most scaling operations don\'t have them. By the time the drift is visible in field performance, the lot is already in the market.`,
    `Customer complaints from scaled coating operations concentrate in the first and last 20% of each production campaign — where process drift and changeover inefficiency are highest. That\'s a process control problem, not a capacity problem.`,
  ],
  'grower-trust': [
    `A single season of field performance inconsistency reduces repeat purchase intent among commercial growers by 35–55%. The replacement customer acquisition cost is 5–10 times the complaint that triggered the loss.`,
    `When coating records don\'t exist, growers attribute field performance problems to the seed company — 3 times more often than any other factor. Traceability isn\'t just a quality tool. It\'s a liability management tool.`,
    `Sales teams in markets with high grower complaint rates spend 40–60% more time on complaint management and customer recovery than teams in markets with consistent, documented coating programs. The cost shows up in headcount before it shows up in accounting.`,
  ],
}

const SCRIPTS: Record<string, string[]> = {
  'coating-inconsistency': [
    `INTRO: Coating weight variation above 3–5% is not an acceptable tolerance — it's a performance problem. Here's why it matters and what to do about it.\n\nSECTION 1 — THE MECHANISM: Coating weight determines seed size and mass at planting. When it varies, the seed's physical profile changes — and so does everything downstream: meter performance, soil contact, moisture uptake rate, and emergence timing.\n\nSECTION 2 — THE DATA: ${PROBLEM_DATA['coating-inconsistency'].stat1}. ${PROBLEM_DATA['coating-inconsistency'].stat2}.\n\nSECTION 3 — THE CAUSES: Worn application equipment, binder viscosity drift between batches, temperature changes in the coating drum, and unvalidated application rates all contribute to coating weight variation that compounds over a production campaign.\n\nSECTION 4 — THE FIX: Controlled coating programs include: calibration checks at defined production intervals, binder viscosity testing per batch, in-process weight sampling, and formal tolerance limits with stop/re-validate protocols.\n\nCONCLUSION: ${PROBLEM_DATA['coating-inconsistency'].consequence}\n\nCTA: Follow Summit Seed Coatings for more seed performance and ag operations content.`,

    `INTRO: Seed companies see coating inconsistency most clearly in grower complaint data. Here's what the numbers show and what changes when the process is controlled.\n\nSECTION 1 — WHAT INCONSISTENCY LOOKS LIKE IN THE FIELD: Uneven stands. Delayed emergence in patches. Skip patterns that don't match planter data. These complaints trace back to coating process variation — but by the time they arrive, the lot is months old.\n\nSECTION 2 — THE COST DIFFERENTIAL: ${PROBLEM_DATA['coating-inconsistency'].cost1}. ${PROBLEM_DATA['coating-inconsistency'].cost2}. Seed companies with validated coating programs see complaint rates 2–4x lower than those operating without formal controls.\n\nSECTION 3 — PROCESS CONTROL ELEMENTS: What a controlled coating program includes: application rate validation per crop and seed lot, in-process sampling protocol, equipment wear inspection schedule, binder performance baseline documentation.\n\nCONCLUSION: Coating consistency is a process decision. The process is controllable — but only if it's formally managed.\n\nCTA: Follow Summit Seed Coatings for seed coating and treatment operations content.`,

    `INTRO: Coating inconsistency is the seed performance problem most often misattributed to genetics, weather, or grower error. This video explains the mechanism and what corrects it.\n\nSECTION 1 — THE DIAGNOSTIC GAP: Standard germination tests don't catch coating weight variation. A seed lot can pass germination testing and still fail field performance — because the coating variation that creates the problem doesn't affect germination under controlled lab conditions.\n\nSECTION 2 — WHAT THE DATA SAYS: ${PROBLEM_DATA['coating-inconsistency'].stat3}. Lots that look clean in the germination test but carry coating variation show the difference after planting.\n\nSECTION 3 — PROCESS CONTROLS THAT CLOSE THE GAP: Field-predictive QC includes coating weight sampling across the lot, uniformity measurement across the seed population, and validation against the target planting environment — not just germination test conditions.\n\nCONCLUSION: The gap between germination test performance and field performance is often a coating gap. It's measurable before the seed leaves the facility.\n\nCTA: Subscribe to Summit Seed Coatings for ongoing seed performance and coating operations content.`,
  ],
  'germination-variability': [
    `INTRO: When germination is uneven, the seed is blamed first. Here's why that diagnostic is wrong 35% of the time — and where the inconsistency actually starts.\n\nSECTION 1 — THE MECHANISM: Coating thickness, treatment application rate, and seed-to-seed treatment transfer all affect germination timing. When these variables aren't controlled, emergence variability follows — regardless of seed genetics.\n\nSECTION 2 — THE DATA: ${PROBLEM_DATA['germination-variability'].stat1}. ${PROBLEM_DATA['germination-variability'].stat2}. Up to 35% of field germination inconsistency traces to seed preparation, not genetics.\n\nSECTION 3 — THE CORRECTION: Validated seed preparation programs control: treatment application rate uniformity, coating film thickness across the lot, seed moisture content at coating, and holding conditions before treatment application.\n\nCONCLUSION: ${PROBLEM_DATA['germination-variability'].consequence}\n\nCTA: Follow Summit Seed Coatings for seed performance and seed preparation operations content.`,

    `INTRO: Emergence timing variation of more than 3–5 days within a seed lot creates yield drag of 8–15% in row crops. Here's what drives that timing variation and how to control it.\n\nSECTION 1 — WHY TIMING MATTERS: Late-emerging plants in a row crop never recover their competitive position against early-emerged neighbors. Yield drag accumulates from day one of emergence — not from any later agronomic intervention.\n\nSECTION 2 — THE SEED PREPARATION VARIABLES: Coating weight, treatment film thickness, and seed moisture content at planting all affect germination initiation timing. Lots with high variation in these variables produce high variation in emergence timing.\n\nSECTION 3 — VALIDATED PREPARATION: Seed lots validated for the target planting environment — soil temperature, moisture, and residue conditions — show tighter emergence windows than unvalidated lots in the same field.\n\nCONCLUSION: Germination variability is a diagnostic problem. The fix is at seed preparation — not at the planting window.\n\nCTA: Subscribe to Summit Seed Coatings for seed performance and coating operations content.`,

    `INTRO: Seed lots with germination variability above 15% in cold or wet conditions often trace to coating decisions that weren't validated for those planting environments. Here's what that validation process looks like.\n\nSECTION 1 — ENVIRONMENT-SPECIFIC FAILURE: Coating formulations designed for standard germination conditions can underperform significantly in wet, cold, or high-residue environments. That performance gap doesn't appear in standard germination tests.\n\nSECTION 2 — THE VALIDATION GAP: ${PROBLEM_DATA['germination-variability'].stat3}. Coating decisions made without environmental validation create performance gaps that show up after planting — when it's too late to intervene.\n\nSECTION 3 — WHAT ENVIRONMENTAL VALIDATION INCLUDES: Target planting window soil temperature range, expected moisture conditions, residue cover type and volume, and coating material performance tested against each variable.\n\nCONCLUSION: The right coating for a standard germination test is not necessarily the right coating for your target planting window. Validation connects the two.\n\nCTA: Follow Summit Seed Coatings for coating and seed performance operations content.`,
  ],
  'seed-treatment-complexity': [
    `INTRO: Seed treatment programs with 8 or more active ingredients fail at 3 times the rate of validated programs. Here's what makes multi-chemistry stacking fail — and what compatibility testing actually requires.\n\nSECTION 1 — THE MECHANISM OF FAILURE: Chemical interaction between active ingredients, carrier incompatibility, and coating adhesion failure from improper sequencing all reduce treatment efficacy — often by 20–40% — before the seed reaches the planting environment.\n\nSECTION 2 — THE DATA: ${PROBLEM_DATA['seed-treatment-complexity'].stat1}. ${PROBLEM_DATA['seed-treatment-complexity'].stat2}. The failure rate compounds as the number of active ingredients increases.\n\nSECTION 3 — WHAT VALIDATED SEQUENCING LOOKS LIKE: Application order based on chemistry compatibility, carrier selection matched to each active ingredient, adhesion testing per treatment stack, and re-validation when any component changes.\n\nCONCLUSION: ${PROBLEM_DATA['seed-treatment-complexity'].consequence}\n\nCTA: Follow Summit Seed Coatings for seed treatment and coating operations content.`,

    `INTRO: Regulatory compliance in seed treatment isn't just about label rates — it includes application rate documentation, re-entry intervals, and worker protection records. Here's what most in-house operations are missing.\n\nSECTION 1 — THE COMPLIANCE GAP: ${PROBLEM_DATA['seed-treatment-complexity'].stat3}. Sixty percent of in-house treatment operations lack formal documentation for regulatory compliance. That's not a paperwork problem — it's a liability.\n\nSECTION 2 — WHAT DOCUMENTATION SHOULD COVER: Application rate per lot with lot-level records, re-entry interval documentation by treatment, worker protection standard compliance records, and chemistry change logs by production date.\n\nSECTION 3 — THE COST OF GAPS: Treatment compliance failures create regulatory exposure, customer liability, and lot rejection risk. The documentation cost is a fraction of the remediation cost.\n\nCONCLUSION: Seed treatment complexity is a process control problem. The controls are manageable — but only if they're formally in place.\n\nCTA: Subscribe to Summit Seed Coatings for seed treatment operations and compliance content.`,

    `INTRO: When a multi-chemistry treatment program underperforms in the field, the chemistry usually gets blamed. Here's why the process is usually the issue — and what a validated treatment program actually requires.\n\nSECTION 1 — THE CHEMISTRY VS. PROCESS DISTINCTION: The active ingredients in a treatment program perform as labeled — when the process delivers them correctly. Application sequencing errors, carrier incompatibility, and adhesion failure change what the seed receives, not what the label says.\n\nSECTION 2 — EFFICACY LOSS MECHANISMS: Chemical interaction between incompatible actives reduces individual efficacy. Poor adhesion causes treatment loss during handling. Incorrect sequencing can deactivate time-sensitive biologicals before they reach the seed surface.\n\nSECTION 3 — BUILDING A VALIDATED PROGRAM: Start with compatibility testing for every combination in the stack. Document the validated sequence. Establish re-validation triggers for any chemistry change.\n\nCONCLUSION: The cost of treatment efficacy loss compounds through every bag. The cost of validation is a one-time investment per program.\n\nCTA: Follow Summit Seed Coatings for seed treatment and processing operations content.`,
  ],
  'planting-performance-risk': [
    `INTRO: When seed singulation fails at the planter, the meter gets adjusted first. Here's why coating weight variation is usually the actual cause — and why adjusting the meter doesn't fix it.\n\nSECTION 1 — THE SINGULATION MECHANISM: Planter meters are calibrated to a seed size and weight profile. Coating weight variation that shifts effective seed size outside the meter's calibration range produces skip rates and doubles — regardless of meter adjustment.\n\nSECTION 2 — THE DATA: ${PROBLEM_DATA['planting-performance-risk'].stat1}. ${PROBLEM_DATA['planting-performance-risk'].stat3}. The coating variation that causes the problem was created months before planting.\n\nSECTION 3 — THE PREVENTIVE APPROACH: Coating weight validation includes tolerance limits matched to planter meter specifications, in-process sampling to detect drift before the lot is released, and planter simulation testing for high-value lots.\n\nCONCLUSION: ${PROBLEM_DATA['planting-performance-risk'].consequence}\n\nCTA: Follow Summit Seed Coatings for seed performance and coating operations content.`,

    `INTRO: Planting depth and seed-to-soil contact are both affected by coating smoothness, density, and film integrity. Here's how coating decisions change what happens at the opener — and what growers see in stand data.\n\nSECTION 1 — THE PHYSICAL INTERFACE: The seed coating is the seed's physical interface with the soil and the opener. Coatings that crack, flake, or absorb moisture unevenly alter seed placement, depth consistency, and early moisture uptake — all before germination begins.\n\nSECTION 2 — WHAT GROWERS OBSERVE: Uneven depth placement in tilled ground. Skip patterns inconsistent with planting population targets. Early stand counts below expected rates despite normal germination test results.\n\nSECTION 3 — COATING SPECS FOR PLANTING ENVIRONMENTS: Film integrity testing under planting-environment conditions. Density and smoothness validation for opener-type compatibility. Abrasion resistance testing for pneumatic delivery systems.\n\nCONCLUSION: The coating decision affects every physical interaction the seed has from the bag to the soil. It's worth validating.\n\nCTA: Subscribe to Summit Seed Coatings for seed performance and ag operations content.`,

    `INTRO: Skip rates above 3% consistently trace to coating weight variation in treated seed lots. Here's the diagnostic path — and what changes when coating specs are validated against meter requirements.\n\nSECTION 1 — THE DIAGNOSTIC CHAIN: Skip rate complaint → planter meter inspection → no meter fault found → seed lot audit → coating weight variation outside meter calibration range. This diagnostic chain is predictable, repeatable, and preventable.\n\nSECTION 2 — THE DATA: ${PROBLEM_DATA['planting-performance-risk'].stat2}. ${PROBLEM_DATA['planting-performance-risk'].stat3}. Coating variation that exceeds meter tolerance produces skip rates that can't be corrected at the planter.\n\nSECTION 3 — THE PREVENTION PROTOCOL: Establish coating weight tolerances per crop and planter type. Validate each lot against those tolerances before release. Document the validation record with the lot.\n\nCONCLUSION: Planting performance risk from coating variation is preventable — but only if coating specs are validated before the lot leaves the facility.\n\nCTA: Follow Summit Seed Coatings for seed coating, treatment, and planting performance content.`,
  ],
  'seed-handling-issues': [
    `INTRO: Up to 18% of coating material is lost during bulk handling before seed reaches the planter. Here's what that loss means for field performance — and what coating formulation prevents it.\n\nSECTION 1 — THE ABRASION MECHANISM: Gravity wagons, air seeders, and pneumatic conveyors subject coated seed to repeated impact and friction. Coatings not formulated for handling durability shed material at rates of 8–18% by weight — material that was part of the treatment and performance package.\n\nSECTION 2 — THE DATA: ${PROBLEM_DATA['seed-handling-issues'].stat1}. ${PROBLEM_DATA['seed-handling-issues'].stat2}. Coating dust during handling indicates active degradation.\n\nSECTION 3 — HANDLING-DURABLE COATING DESIGN: Binder selection for abrasion resistance. Film thickness calibrated for the handling path the seed will follow. Abrasion testing against representative handling equipment before lot release.\n\nCONCLUSION: ${PROBLEM_DATA['seed-handling-issues'].consequence}\n\nCTA: Follow Summit Seed Coatings for seed handling and coating operations content.`,

    `INTRO: Seed flowability variation above 20% causes population inconsistency at the planter. Here's what drives flowability variation in coated seed — and how it's controlled.\n\nSECTION 1 — FLOWABILITY AND METER PERFORMANCE: Planter meters rely on consistent seed flow to maintain calibrated populations. Coated seed with clumping, tackiness, or weight variation changes flow rate — producing meter drift that compounds over each pass.\n\nSECTION 2 — THE DATA: ${PROBLEM_DATA['seed-handling-issues'].stat3}. Flowability variation above 20% creates measurable population inconsistency that can't be corrected at the planter.\n\nSECTION 3 — FLOWABILITY CONTROL IN COATING: Binder formulation for consistent surface texture. Coating weight tolerance limits that prevent size variation affecting flow. Flowability testing before lot release as part of QC protocol.\n\nCONCLUSION: Coating-driven flowability problems are created at the processing line and discovered at the planter. The fix belongs at the source.\n\nCTA: Subscribe to Summit Seed Coatings for seed coating quality and operations content.`,

    `INTRO: Coating dust during bulk handling is a regulatory compliance issue — and a signal that your treatment is degrading before planting. Here's how to read that signal and what it means for field performance.\n\nSECTION 1 — WHAT DUST INDICATES: Coating dust during handling is not a cosmetic issue. It's evidence of coating adhesion failure, abrasion beyond formulation tolerance, and treatment loss that reduces what the seed delivers to the planting environment.\n\nSECTION 2 — REGULATORY CONTEXT: Worker protection standards apply to seed treatment dust exposure during handling. Operations generating dust without controls face compliance exposure — and the underlying coating problem that creates the dust remains unaddressed.\n\nSECTION 3 — THE FORMULATION RESPONSE: Handling-durable binder systems that maintain adhesion through pneumatic handling. Film thickness validated for the full handling path. Dust generation testing as a QC checkpoint.\n\nCONCLUSION: Coating dust is a diagnostic signal. It tells you something about the coating formulation that field performance will confirm later.\n\nCTA: Follow Summit Seed Coatings for seed handling, coating, and compliance operations content.`,
  ],
  'pelleting-precision': [
    `INTRO: Pellet weight variation above 5% is the primary driver of singulation failure in precision-seeded crops. Here's why uniformity matters — and what precision pelleting programs control to deliver it.\n\nSECTION 1 — THE SINGULATION MECHANISM: Vacuum seeders operate on pellet size and weight consistency. Pellets outside the calibration range — from weight variation, size inconsistency, or shape deviation — produce skip rates and doubles that compound through the entire seeded area.\n\nSECTION 2 — THE DATA: ${PROBLEM_DATA['pelleting-precision'].stat1}. ${PROBLEM_DATA['pelleting-precision'].stat3}. Roundness deviation above 0.08 reduces singulation accuracy by 18–35%.\n\nSECTION 3 — WHAT PRECISION PELLETING CONTROLS: Weight uniformity tolerance per lot. Sphericity index measurement and tolerance limits. Environmental performance validation for target soil conditions.\n\nCONCLUSION: ${PROBLEM_DATA['pelleting-precision'].consequence}\n\nCTA: Follow Summit Seed Coatings for precision pelleting and specialty crop seeding content.`,

    `INTRO: Pellet integrity failures — cracking, shattering, excessive moisture absorption before germination — occur in 12–25% of pelleted lots that aren't validated against target planting conditions. Here's what validation requires.\n\nSECTION 1 — INTEGRITY FAILURE MECHANISMS: Pellets cracking in cold soil. Pellets absorbing moisture prematurely in high-humidity storage. Pellets shattering under vacuum seeder pressure. Each failure mode traces to a pellet formulation or validation gap.\n\nSECTION 2 — THE DATA: ${PROBLEM_DATA['pelleting-precision'].stat2}. Twelve to 25% of pelleted lots that skip environmental validation fail under target planting conditions.\n\nSECTION 3 — THE VALIDATION PROCESS: Temperature and moisture stress testing before lot release. Vacuum seeder singulation simulation testing. Drop and impact integrity testing for bulk handling conditions.\n\nCONCLUSION: Pellet quality is not established at the pellet drum. It's confirmed against the conditions the pellet will face at planting.\n\nCTA: Subscribe to Summit Seed Coatings for pelleting quality and precision seeding operations content.`,

    `INTRO: In precision-seeded crops, stand uniformity and harvest timing consistency both trace back to pellet quality. Here's the connection — and what it means for high-value specialty crop production.\n\nSECTION 1 — THE PERFORMANCE CHAIN: Pellet weight variation → singulation inconsistency → population variation → uneven emergence → non-uniform crop maturity → harvest window pressure and quality inconsistency. Each step is predictable. Most are preventable.\n\nSECTION 2 — THE VALUE AT STAKE: In vegetable and specialty crop production, harvest timing consistency directly affects market window and contract fulfillment. Stand failures requiring replanting cost $800 to $4,500 per acre — plus market window value that can exceed the direct cost by 2–3 times.\n\nSECTION 3 — WHAT HIGH-PRECISION PELLETING DELIVERS: Pellet weight tolerance under 5%. Sphericity index within 0.08 of target. Environmental performance validation for target planting conditions.\n\nCONCLUSION: Pelleting precision is not a cosmetic concern. In precision-seeded crops, it determines whether the stand is right at establishment or expensive to remediate.\n\nCTA: Follow Summit Seed Coatings for specialty crop pelleting and planting performance content.`,
  ],
  'poor-seed-prep-cost': [
    `INTRO: The cost of poor seed preparation is never paid at the processing line. Here's where it's actually paid — and what traceable coating programs change about that cost structure.\n\nSECTION 1 — WHERE THE COST LANDS: Warranty seed replacement. Customer service investment. Reputational recovery in markets with high complaint density. These costs are 3–5 times higher for seed companies that can't trace field complaints to coating and treatment records.\n\nSECTION 2 — THE LOT REJECTION COST: ${PROBLEM_DATA['poor-seed-prep-cost'].stat2}. A single lot rejection averages $15,000 to $80,000. The process control investment that prevents it is typically a fraction of that.\n\nSECTION 3 — WHAT TRACEABILITY CHANGES: When a field complaint arrives, traceable records allow diagnosis within days rather than weeks. The complaint is resolved with data, not speculation. Customer trust is maintained through transparency.\n\nCONCLUSION: ${PROBLEM_DATA['poor-seed-prep-cost'].consequence}\n\nCTA: Follow Summit Seed Coatings for seed preparation, traceability, and operations content.`,

    `INTRO: Seed companies that attribute field complaints to genetics rather than seed preparation spend 3–5 times more on recovery than those with traceable records. Here's the cost structure — and what changes when traceability is in place.\n\nSECTION 1 — THE ATTRIBUTION PROBLEM: Without coating and treatment records, field complaints can't be traced. Without traceability, the default attribution is the seed company — regardless of whether the coating decision caused the problem.\n\nSECTION 2 — THE COST DIFFERENTIAL: ${PROBLEM_DATA['poor-seed-prep-cost'].stat1}. ${PROBLEM_DATA['poor-seed-prep-cost'].stat3}. The hidden cost compounds through the supply chain in ways that don't appear on a processing cost sheet.\n\nSECTION 3 — TRACEABILITY SYSTEM ELEMENTS: Lot-level coating weight records. Treatment application rate documentation per lot. Binder lot and batch records. QC checkpoint logs with sign-off.\n\nCONCLUSION: Traceability is not a compliance cost. It's a complaint management investment with a measurable return.\n\nCTA: Subscribe to Summit Seed Coatings for seed preparation quality, traceability, and operations content.`,

    `INTRO: The hidden cost of poor seed preparation compounds through the supply chain in ways that never appear on a processing cost sheet. Here's how to see that cost clearly — and what prevents it.\n\nSECTION 1 — THE COST CHAIN: Coating failure → field complaint → warranty replacement → competitor trial → lost repeat business. Each step in the chain costs more than the previous one. None of them appear on the processing line cost sheet.\n\nSECTION 2 — THE SCALE OF EXPOSURE: ${PROBLEM_DATA['poor-seed-prep-cost'].cost1}. ${PROBLEM_DATA['poor-seed-prep-cost'].cost2}. The variance in recovery cost depends on whether records exist to diagnose the root cause.\n\nSECTION 3 — THE PREVENTION MATH: A coating process validation program costs a fraction of one lot rejection event. A traceability system costs less than one major field complaint recovery effort. The ROI is measurable.\n\nCONCLUSION: Poor seed preparation cost is a choice — not a given. The alternative is a controlled process with records that can be used to manage it.\n\nCTA: Follow Summit Seed Coatings for seed preparation quality and cost management content.`,
  ],
  'crop-establishment': [
    `INTRO: Crop establishment failures are diagnosed at the field. The decisions that cause them are made at seed preparation. Here's the connection — and what changes when coating specs are validated for the target environment.\n\nSECTION 1 — THE ESTABLISHMENT THRESHOLD: Stands below 85% of target population in the first 14 days increase yield loss probability by 20–40%, depending on crop type, planting date, and competitive weed pressure. The coating decision contributes to whether that threshold is met.\n\nSECTION 2 — THE DATA: ${PROBLEM_DATA['crop-establishment'].stat1}. ${PROBLEM_DATA['crop-establishment'].stat3}. Coating decisions that don't account for the target planting environment create preventable establishment risk.\n\nSECTION 3 — ENVIRONMENT-MATCHED COATING: Soil type-specific coating formulation. Moisture and temperature tolerance validation. Residue cover performance testing for no-till and conservation tillage environments.\n\nCONCLUSION: ${PROBLEM_DATA['crop-establishment'].consequence}\n\nCTA: Follow Summit Seed Coatings for crop establishment and seed preparation operations content.`,

    `INTRO: In high-value vegetable and specialty crops, stand failures requiring replanting cost $800 to $4,500 per acre — plus lost market window value that can exceed the direct cost by 2–3 times. Here's what seed preparation decisions determine about that risk.\n\nSECTION 1 — THE SPECIALTY CROP STAKES: Unlike commodity crops, specialty crop replanting carries market timing consequences that compound the direct replanting cost. A stand failure in week two of a production window can cost more in lost market access than in seed and labor.\n\nSECTION 2 — THE DATA: ${PROBLEM_DATA['crop-establishment'].stat2}. The coating and pelleting decision determines much of whether the stand is right at establishment.\n\nSECTION 3 — RISK REDUCTION THROUGH PREPARATION: Pellet and coating validation for target soil conditions. Environmental performance testing before lot release. Lot-level records that allow rapid diagnosis if establishment problems occur.\n\nCONCLUSION: Crop establishment failure is expensive to remediate. It's inexpensive to prevent — if the seed preparation decision accounts for the planting environment.\n\nCTA: Subscribe to Summit Seed Coatings for specialty crop seeding and seed preparation content.`,

    `INTRO: Seed coating decisions that don't account for planting environment conditions create establishment risk that rarely gets diagnosed correctly at the field level. Here's how to close that diagnostic gap.\n\nSECTION 1 — THE MISDIAGNOSIS PATTERN: Stand failure → soil temperature investigation → equipment check → variety performance question. Coating and treatment variables are typically the last thing investigated — and in many cases, the first thing that should be.\n\nSECTION 2 — WHAT COATINGS AFFECT AT ESTABLISHMENT: Moisture uptake rate at imbibition. Pathogen pressure protection in target soil. Physical seed placement and soil contact quality. Each variable is affected by coating formulation.\n\nSECTION 3 — THE VALIDATION STANDARD: Coating specifications validated against the target planting window — not just standard germination conditions. Environmental test data included in lot documentation. Agronomic performance validation for target environments.\n\nCONCLUSION: The right coating for standard germination conditions is not necessarily the right coating for your target field. Closing that gap is the job of seed preparation validation.\n\nCTA: Follow Summit Seed Coatings for seed preparation, establishment, and coating operations content.`,
  ],
  'scaling-operations': [
    `INTRO: Coating operations that scale from 50,000 to 500,000 units without process documentation see batch variation increase by 25–50%. Scale doesn\'t solve coating inconsistency — it amplifies it. Here\'s what changes when process controls scale with the volume.\n\nSECTION 1 — THE SCALING FAILURE MODE: Without documented processes, each production run depends on operator judgment and equipment state at that moment. As volume grows, the number of variables that can drift — equipment wear, binder viscosity, temperature, application rate — compounds faster than manual oversight can track.\n\nSECTION 2 — THE DATA: ${PROBLEM_DATA['scaling-operations'].stat1}. ${PROBLEM_DATA['scaling-operations'].stat2}. Equipment calibration drift of 3–5% per 100,000-unit run requires formal re-validation protocols — which most scaling operations don\'t have.\n\nSECTION 3 — PROCESS DOCUMENTATION FOR SCALE: Application rate specifications per crop. Equipment calibration schedules tied to production volume, not calendar time. In-process sampling protocols with trigger thresholds. Re-validation procedures for every process change.\n\nCONCLUSION: ${PROBLEM_DATA['scaling-operations'].consequence}\n\nCTA: Follow Summit Seed Coatings for coating operations, scaling, and process control content.`,

    `INTRO: Customer complaints from scaled coating operations concentrate in the first and last 20% of each production campaign. That\'s a process control signal — not a capacity problem. Here\'s what it means and how to correct it.\n\nSECTION 1 — WHY CAMPAIGN ENDPOINTS FAIL: Process drift accumulates at the start of a campaign from equipment that hasn\'t been validated at production conditions. It accumulates at the end from wear, binder depletion, and temperature variation. Both ends produce inconsistency that reaches the field.\n\nSECTION 2 — THE DATA: ${PROBLEM_DATA['scaling-operations'].stat3}. Complaints concentrated at campaign endpoints indicate the process isn\'t validated for the full production run.\n\nSECTION 3 — CAMPAIGN CONTROL PROTOCOLS: Equipment pre-validation before each campaign start. In-process validation checkpoints at defined intervals. End-of-campaign QC sampling to catch drift before lot release.\n\nCONCLUSION: Scale doesn\'t cause inconsistency — uncontrolled scale does. The process controls that prevent it are well-understood. They\'re just not common.\n\nCTA: Subscribe to Summit Seed Coatings for coating operations and scaling process control content.`,

    `INTRO: Equipment calibration drift of 3–5% per 100,000-unit production run is predictable. Most scaling operations don\'t have the re-validation protocol to catch it — and that drift shows up in field performance before it shows up in QC data. Here\'s how to close that gap.\n\nSECTION 1 — THE DRIFT MECHANISM: Coating drum wear. Binder viscosity shift with temperature. Application nozzle wear affecting spray pattern and rate. Each variable drifts predictably over a production run — and each one contributes to coating weight variation that the standard QC process doesn\'t catch.\n\nSECTION 2 — THE CONSEQUENCE: Lots produced at the beginning and end of a production campaign that wasn\'t re-validated carry higher coating variation than lots produced at the validated center of the run. Those lots perform differently in the field.\n\nSECTION 3 — THE RE-VALIDATION STANDARD: Define re-validation triggers by production volume — not calendar time. Include equipment inspection, binder performance check, and in-process sampling in every re-validation event. Document the record with the production lot.\n\nCONCLUSION: Calibration drift is not a mystery. It\'s a predictable process variable that can be managed — if the protocol exists to manage it.\n\nCTA: Follow Summit Seed Coatings for coating equipment management and scaling operations content.`,
  ],
  'grower-trust': [
    `INTRO: A single season of field performance inconsistency reduces repeat purchase intent among commercial growers by 35–55%. The cost of recovering that relationship is 5–10 times the original complaint cost. Here\'s what coating traceability changes about that math.\n\nSECTION 1 — THE TRUST LOSS MECHANISM: When field performance is inconsistent, growers look for an explanation. Without traceable coating and treatment records, the explanation defaults to the seed company. With records, the explanation — and the resolution — can be specific.\n\nSECTION 2 — THE DATA: ${PROBLEM_DATA['grower-trust'].stat1}. ${PROBLEM_DATA['grower-trust'].stat2}. Traceability is not just a quality tool — it\'s a relationship management tool.\n\nSECTION 3 — WHAT TRACEABILITY DELIVERS IN A COMPLAINT: Rapid root cause identification. Specific corrective action per lot. Data-backed communication to the grower. Complaint resolution that preserves the relationship.\n\nCONCLUSION: ${PROBLEM_DATA['grower-trust'].consequence}\n\nCTA: Follow Summit Seed Coatings for grower trust, coating traceability, and seed performance content.`,

    `INTRO: Growers who can\'t trace field performance problems to a specific seed lot record are 3 times more likely to attribute the failure to the seed company — regardless of whether the coating decision caused the problem. Here\'s what that attribution pattern costs.\n\nSECTION 1 — THE ATTRIBUTION DEFAULT: When a grower can\'t identify a cause, the most visible responsible party gets assigned the blame. For seed performance complaints, that\'s usually the seed company. Traceable lot records change the attribution — and the conversation.\n\nSECTION 2 — THE COST OF BLAME WITHOUT RECORDS: ${PROBLEM_DATA['grower-trust'].stat1}. ${PROBLEM_DATA['grower-trust'].stat3}. Sales teams without traceable lot records spend 40–60% more time on complaint management than those with documentation.\n\nSECTION 3 — TRACEABILITY AS COMPETITIVE ADVANTAGE: Seed companies with traceable coating and treatment programs can resolve complaints faster, with more specificity, and with lower total recovery cost. That speed and specificity builds the kind of trust that survives a bad season.\n\nCONCLUSION: Trust is not built in the field. It\'s built at the processing line — through documentation that survives long enough to be used when it matters.\n\nCTA: Subscribe to Summit Seed Coatings for grower trust, traceability, and seed operations content.`,

    `INTRO: Sales teams in markets with high grower complaint rates spend 40–60% more time on complaint management than teams in markets with documented, consistent coating programs. Here\'s what that time cost signals — and what changes it.\n\nSECTION 1 — THE COMPLAINT MANAGEMENT BURDEN: Complaint management time is the clearest signal of coating program quality. High complaint density means the seed preparation program is producing inconsistency that reaches the field — and reaching the customer.\n\nSECTION 2 — THE DATA: ${PROBLEM_DATA['grower-trust'].stat3}. ${PROBLEM_DATA['grower-trust'].cost2}. Both signals point to the same root cause: seed preparation programs without the process controls that prevent field-level inconsistency.\n\nSECTION 3 — THE COMPLAINT REDUCTION PATHWAY: Controlled coating programs with documented tolerance limits. Lot-level traceability records. QC checkpoints that catch variation before lots are released. Environmental validation for target planting conditions.\n\nCONCLUSION: Sales team complaint burden is a lagging indicator. The leading indicator is coating program quality — measurable at the processing line before the seed reaches the field.\n\nCTA: Follow Summit Seed Coatings for seed operations, coating quality, and grower relationship content.`,
  ],
}

const RETENTION_BEATS: Record<string, string[][]> = {
  'coating-inconsistency': [
    ['Show: coating weight variation data from a real production run (3 data points)', 'Reveal: what that variation looks like in field emergence uniformity', 'Explain: the 3 process variables that drive coating weight drift', 'Demonstrate: what a controlled coating program QC checkpoint looks like', 'Close: the one metric that predicts coating quality before the seed leaves the facility'],
    ['Open with a field complaint data pattern that traces to coating variation', 'Break down the mechanism: why weight variation affects emergence timing', 'Show the cost differential between controlled and uncontrolled programs', 'Walk through a coating process control checklist', 'Close with what seed companies with low complaint rates do differently'],
    ['Lead with the germination test gap — why it doesn\'t catch coating variation', 'Explain what field-predictive QC includes', 'Show three equipment-level variables that cause coating weight drift', 'Describe what re-validation looks like at scale', 'Close with the one change that has the highest impact on coating consistency'],
  ],
  'germination-variability': [
    ['Open: what 35% of germination inconsistency looks like in field stand data', 'Break down: the three seed preparation variables that drive timing variation', 'Show: the yield drag curve from emergence timing variability', 'Explain: what environmental validation for coating includes', 'Close: the seed preparation checklist for tight emergence windows'],
    ['Lead with the diagnostic misattribution pattern — genetics blamed first', 'Reveal the seed preparation variables that drive the variability', 'Show what validated coating specs look like for target planting windows', 'Walk through the QC checkpoints that catch preparation variability', 'Close with what changes when germination variability is traced correctly'],
    ['Open with cold/wet condition germination failure data', 'Explain the coating formulation gap for non-standard environments', 'Show the difference in emergence timing between validated and unvalidated lots', 'Describe the environmental validation process for target planting windows', 'Close with what predictable emergence performance requires'],
  ],
  'seed-treatment-complexity': [
    ['Open: the 20–40% efficacy loss from incompatible chemistry stacking', 'Break down: what causes interaction failure between active ingredients', 'Show: the failure rate difference between validated and unvalidated programs', 'Walk through: what compatibility testing for a 6-active stack looks like', 'Close: the re-validation trigger events that most operations skip'],
    ['Lead with the compliance documentation gap — 60% of operations', 'Explain what regulatory documentation in seed treatment actually requires', 'Show the cost exposure from compliance gaps vs. documentation investment', 'Walk through a compliant treatment program documentation structure', 'Close with what a fully documented treatment program looks like in practice'],
    ['Open with chemistry-versus-process distinction', 'Show three efficacy loss mechanisms from process failures', 'Explain the sequencing validation process for multi-chemistry stacks', 'Describe what re-validation triggers look like for chemistry changes', 'Close with the one-time investment vs. recurring failure cost comparison'],
  ],
  'planting-performance-risk': [
    ['Open with the singulation failure diagnostic chain', 'Show the 15–30% accuracy drop from coating weight deviation', 'Explain why meter adjustment doesn\'t fix coating variation', 'Walk through coating weight tolerance limits for planter meter compatibility', 'Close with what in-process sampling catches before lot release'],
    ['Lead with the coating-to-soil-contact mechanism', 'Show three physical ways coating affects seed placement', 'Explain what planting environment coating validation includes', 'Describe the planter simulation testing process for high-value lots', 'Close with what stand data looks like when coating specs are validated'],
    ['Open with skip rate complaint data and the diagnostic chain', 'Show the correlation between coating weight variation and skip rates', 'Explain the planter meter calibration range and how coating affects it', 'Walk through a lot-level coating validation protocol', 'Close with what prevention costs vs. remediation costs'],
  ],
  'seed-handling-issues': [
    ['Open with coating weight loss data from handling — the 8–18% range', 'Show which handling equipment creates the highest abrasion risk', 'Explain what handling-durable binder formulation includes', 'Walk through abrasion testing for representative equipment types', 'Close with what a handling-validated coating program documents'],
    ['Lead with flowability variation data and its effect on meter performance', 'Show the population inconsistency that flowability variation produces', 'Explain the coating variables that drive flowability variation', 'Walk through a flowability QC checkpoint before lot release', 'Close with what seed flow consistency requires from coating'],
    ['Open with the regulatory context for handling dust', 'Show what dust generation indicates about coating adhesion', 'Explain the binder formulation choice for dust reduction', 'Describe the dust testing protocol as a QC checkpoint', 'Close with the dual benefit of handling-durable coatings: compliance and performance'],
  ],
  'pelleting-precision': [
    ['Open with singulation failure data from pellet weight variation', 'Show the 5% weight variation threshold and what exceeds it looks like', 'Explain the pellet-to-singulation-to-stand performance chain', 'Walk through what weight uniformity tolerance control requires', 'Close with what precision pelleting documentation includes'],
    ['Lead with pellet integrity failure rate — the 12–25% range', 'Show which failure modes occur under which environmental conditions', 'Explain the environmental validation process for pelleted lots', 'Walk through drop, impact, and moisture testing protocols', 'Close with what validated pellet performance looks like in field data'],
    ['Open with the performance chain: pellet → singulation → stand → harvest timing', 'Show the value at risk from singulation inconsistency in specialty crops', 'Explain the roundness deviation threshold and its effect on vacuum seeder performance', 'Describe what high-precision pelleting quality control includes', 'Close with what harvest timing consistency requires from pellet quality'],
  ],
  'poor-seed-prep-cost': [
    ['Open with the cost chain: preparation decision → field complaint → recovery cost', 'Show the 3–5x cost multiplier for operations without traceable records', 'Explain what traceable records allow in complaint management', 'Walk through the traceability system elements for coating and treatment', 'Close with the ROI comparison: traceability investment vs. complaint recovery cost'],
    ['Lead with lot rejection cost range — $15,000 to $80,000 per event', 'Show the process control investment cost vs. rejection event cost', 'Explain which process controls prevent the most common rejection causes', 'Describe what a lot-level coating record includes', 'Close with what traceability changes about the complaint resolution timeline'],
    ['Open with the hidden cost chain through the supply chain', 'Show where the cost lands: warranty, customer service, lost relationships', 'Explain how the cost compounds when records don\'t exist', 'Walk through the prevention math: process validation vs. rejection event cost', 'Close with what changes when preparation cost is made visible before the field'],
  ],
  'crop-establishment': [
    ['Open with the 85% stand threshold and the yield consequence below it', 'Show the coating variables that affect establishment in target environments', 'Explain what environment-matched coating formulation requires', 'Walk through environmental validation testing for coating specifications', 'Close with what lot-level documentation supports when establishment problems occur'],
    ['Lead with the specialty crop replanting cost — $800–$4,500/acre plus market window', 'Show the preparation decisions that drive replanting risk', 'Explain the pellet and coating validation process for specialty crop environments', 'Describe what rapid diagnosis looks like when records exist', 'Close with the cost comparison: prevention vs. replanting'],
    ['Open with the misdiagnosis pattern: field → equipment → variety → never coating', 'Show the coating variables that affect establishment performance', 'Explain what changes when coating specs are validated for target fields', 'Walk through the validation process for non-standard planting environments', 'Close with what the right coating spec for a target field looks like'],
  ],
  'scaling-operations': [
    ['Open with the 25–50% variation increase from scaling without documentation', 'Show how each production variable drifts as volume grows', 'Explain what process documentation for scale looks like', 'Walk through a re-validation protocol triggered by production volume', 'Close with what consistent quality at scale requires'],
    ['Lead with campaign endpoint complaint concentration data', 'Show why process drift concentrates at production endpoints', 'Explain what pre-campaign validation and mid-campaign checkpoints include', 'Walk through end-of-campaign QC sampling protocol', 'Close with what a process-controlled production campaign looks like from start to finish'],
    ['Open with calibration drift data — the 3–5% per 100,000-unit figure', 'Show which equipment variables drift fastest at scale', 'Explain what volume-triggered re-validation requires', 'Describe the equipment inspection elements at each re-validation event', 'Close with what predictable coating quality at scale requires'],
  ],
  'grower-trust': [
    ['Open with repeat purchase intent data — the 35–55% reduction figure', 'Show the relationship recovery cost multiplier: 5–10x', 'Explain what traceability allows in a field complaint response', 'Walk through what a data-backed complaint resolution looks like', 'Close with what traceable operations retain that untraceable operations lose'],
    ['Lead with the attribution default — 3x blame rate without records', 'Show the cost of complaint management time without traceable programs', 'Explain what records allow in complaint attribution', 'Describe the complaint resolution timeline with vs. without records', 'Close with what trust-preserving complaint response requires'],
    ['Open with complaint management time data — the 40–60% differential', 'Show what complaint density signals about coating program quality', 'Explain the coating program quality variables that drive complaint rates', 'Walk through the process controls that reduce complaint density', 'Close with what a low-complaint-rate market looks like operationally'],
  ],
}

const BUSINESS_INSIGHTS: Record<string, string> = {
  'coating-inconsistency': `Seed companies with validated, controlled coating programs see grower complaint rates 2–4x lower than those without formal process controls. The investment in coating consistency isn't a quality expense — it's a customer retention investment with a measurable return.`,
  'germination-variability': `Up to 35% of field germination inconsistency traces to seed preparation, not genetics. Operations that diagnose and correct preparation variability before the seed leaves the facility reduce field complaint rates — and the recovery costs that follow them.`,
  'seed-treatment-complexity': `Multi-chemistry treatment programs with formal compatibility validation experience formulation failures at one-third the rate of unvalidated programs. The validation investment is a one-time cost per treatment stack. The formulation failure cost compounds through every affected lot.`,
  'planting-performance-risk': `Coating weight variation that exceeds planter meter calibration tolerance produces skip rates and population inconsistency that can't be corrected at the planter. The fix is at the coating line — where the specification is set and where the tolerance is controlled.`,
  'seed-handling-issues': `Coating material lost during bulk handling represents treatment that never reaches the planting environment. Operations that validate coating formulations for the handling path the seed will follow lose 8–18% less material — and deliver more of the treatment value the seed was designed to carry.`,
  'pelleting-precision': `In precision-seeded crops, pellet quality is planting performance. Weight uniformity below 5% variation and sphericity index within 0.08 of target delivers the singulation consistency that stand uniformity depends on — and that harvest timing consistency follows from.`,
  'poor-seed-prep-cost': `Seed companies with traceable coating and treatment records spend 3–5 times less on field complaint recovery than those without documentation. Traceability is not a quality overhead cost — it's a complaint management asset that pays for itself in the first major complaint it resolves.`,
  'crop-establishment': `Coating specifications validated for the target planting environment — soil type, moisture conditions, temperature range — reduce preventable establishment risk that is rarely diagnosed correctly at the field level. The validation happens at the processing stage. The outcome is visible at establishment.`,
  'scaling-operations': `Batch-to-batch coating variation increases 25–50% when coating operations scale without process documentation. The process controls that deliver consistent quality at 50,000 units must be formalized and re-validated at 500,000 units — or the scale advantage disappears into inconsistency.`,
  'grower-trust': `Seed companies with traceable coating and treatment programs resolve field complaints faster, with more specificity, and at lower recovery cost than those without records. Traceability is the operational foundation of grower trust — and the most cost-effective complaint management investment a seed company can make.`,
}

const CTAS = [
  `Follow ${COMPANY.name} for more seed performance and ag operations insights.`,
  `Subscribe for weekly content on seed coating, treatment, and planting performance.`,
  `Visit ${COMPANY.website} to learn how Summit supports seed companies with advanced coating and treatment services.`,
  `Follow for more on seed preparation, coating quality, and grower performance outcomes.`,
  `Subscribe to ${COMPANY.name} for operational insights on seed coating, pelleting, and treatment programs.`,
]

const REPURPOSING = [
  'Pull the three-second hook as a LinkedIn opening line with the full data point as supporting context',
  'Extract the retention beats as a Twitter/X thread — one beat per tweet with a connecting thread structure',
  'Use the business insight as a standalone LinkedIn post with the data point and a single CTA',
  'Convert the script outline into a carousel slide sequence for Instagram or LinkedIn',
  'Adapt the opening line and key data point as a Facebook educational post with a discussion question',
]

const IMPROVEMENT_SUGGESTIONS: Record<string, string[][]> = {
  'coating-inconsistency': [
    ['Add a specific coating weight tolerance range for a named crop type to make the claim concrete', 'Include the in-process sampling interval that corresponds to your production run length', 'Reference the equipment type where calibration drift is most common in your process'],
    ['Name the specific binder viscosity variable and its acceptable range for your coating system', 'Add before/after complaint rate data from a customer who moved to a controlled program', 'Include the re-validation protocol trigger point in production volume terms'],
    ['Specify which germination test result doesn\'t predict coating variation — and what test does', 'Add a specific field-predictive QC metric that your coating program produces', 'Reference a specific planting condition where coating weight variation has the highest field impact'],
  ],
  'germination-variability': [
    ['Add the specific seed preparation variable with the highest variance in your current process', 'Include an emergence timing data comparison between validated and unvalidated lots', 'Name the target planting window conditions your coating is validated for'],
    ['Specify the crop type where 8–15% yield drag from timing variation is most commonly observed', 'Add the in-process treatment application rate tolerance you use for commercial lots', 'Reference the germination test condition versus field condition gap for a specific crop'],
    ['Name the environmental condition (cold, wet, high-residue) where your coating shows the strongest validated performance', 'Add specific germination test data vs. field emergence data for a problematic lot type', 'Include the coating formulation change that closed the environmental performance gap'],
  ],
  'seed-treatment-complexity': [
    ['Name a specific chemistry combination that requires sequencing validation in your treatment stack', 'Add the efficacy testing protocol you use to validate a new active ingredient combination', 'Reference the documentation format you use for treatment application rate per lot'],
    ['Specify which regulatory documentation element is most commonly missing in in-house operations', 'Add the re-entry interval documentation standard your operation follows', 'Include the cost comparison between your compliance documentation investment and one compliance event cost'],
    ['Name the biological active ingredient most sensitive to sequencing errors in multi-chemistry stacks', 'Add the carrier compatibility testing protocol for a specific chemistry combination', 'Reference the process change that reduced your formulation failure rate most significantly'],
  ],
  'planting-performance-risk': [
    ['Specify the coating weight tolerance range for a named crop and planter meter type', 'Add in-process sampling protocol details — frequency, sample size, tolerance limits', 'Name the planter meter type where coating weight deviation has the highest singulation impact'],
    ['Reference a specific coating smoothness specification and how it\'s tested in your process', 'Add the planting environment coating validation process for a specific soil type', 'Include the stand count comparison for validated vs. unvalidated coating lots in a specific crop'],
    ['Specify the skip rate threshold that triggers lot-level coating audit in your system', 'Add the coating weight sampling frequency per production run length', 'Reference the planter simulation test protocol you use for high-value lots'],
  ],
  'seed-handling-issues': [
    ['Name the specific handling equipment type with the highest abrasion impact in your system', 'Add the abrasion resistance test result range for your current handling-durable coating formulation', 'Reference the coating weight loss data from your handling path validation testing'],
    ['Specify the flowability test method you use and the acceptable variation range for commercial lots', 'Add the binder formulation variable most correlated with flowability consistency', 'Include a specific meter performance comparison for high-flowability vs. low-flowability lots'],
    ['Name the treatment type most at risk from handling dust generation', 'Add the dust generation test protocol and acceptable threshold for commercial lots', 'Reference the binder selection change that most reduced dust generation in your current program'],
  ],
  'pelleting-precision': [
    ['Specify the pellet weight tolerance range for a specific vegetable crop and seeder type', 'Add the sphericity measurement protocol you use and the acceptable deviation range', 'Reference a stand uniformity comparison between high-precision and standard precision lots'],
    ['Name the pellet integrity failure mode most common in your target planting environments', 'Add the environmental validation test conditions for your target planting window', 'Include the moisture absorption threshold that predicts germination performance in wet soil conditions'],
    ['Specify the harvest timing consistency comparison between singulation-accurate and inaccurate stands', 'Add the pellet weight sampling protocol per lot and the QC trigger threshold', 'Reference the roundness specification for your highest-value specialty crop lots'],
  ],
  'poor-seed-prep-cost': [
    ['Name the specific record type that resolved your last significant field complaint most quickly', 'Add the traceability record retention policy and the complaint resolution timeline it enables', 'Reference the cost comparison for a specific lot rejection event with vs. without records'],
    ['Specify the coating record elements included in your lot-level documentation', 'Add the complaint resolution timeline comparison for traceable vs. untraceable lots', 'Include the customer conversation difference when records are available for review'],
    ['Name the hidden cost category with the highest impact on your total poor-prep cost', 'Add the process validation investment cost relative to one lot rejection event cost', 'Reference the supply chain cost element that doesn\'t appear on the processing cost sheet'],
  ],
  'crop-establishment': [
    ['Specify the soil type and moisture condition your coating is validated for performance', 'Add the stand count comparison between validated and unvalidated coating lots in target conditions', 'Reference the coating formulation change that most improved establishment in a challenging environment'],
    ['Name the specialty crop with the highest replanting cost in your production area', 'Add the coating and pellet validation steps specific to that crop and planting environment', 'Include the lot documentation elements that allow rapid diagnosis when establishment problems occur'],
    ['Specify the environmental condition where standard coating specifications most commonly underperform', 'Add the environmental validation test you run for non-standard planting conditions', 'Reference the coating spec change that closed the gap between lab performance and field performance'],
  ],
  'scaling-operations': [
    ['Specify the production volume trigger for re-validation in your current protocol', 'Add the equipment variables included in your calibration check at each re-validation event', 'Reference the batch variation data before and after implementing formal process documentation'],
    ['Name the campaign endpoint most prone to coating variation in your production process', 'Add the in-process QC checkpoint frequency for a production campaign at your current volume', 'Include the specific process drift variable that concentrates complaints in the first 20% of campaigns'],
    ['Specify the calibration drift variable with the highest production impact in your coating system', 'Add the re-validation protocol steps at volume-based triggers', 'Reference the production volume where calibration drift became visible in lot quality data'],
  ],
  'grower-trust': [
    ['Specify the traceability record that resolved a grower complaint most effectively', 'Add the complaint resolution timeline comparison with vs. without traceable lot records', 'Reference the grower relationship outcome when complaint resolution included data-backed documentation'],
    ['Name the specific attribution default that is most costly to correct without traceable records', 'Add the complaint management time comparison for your markets with and without documented programs', 'Include the customer conversation difference when coating records are available'],
    ['Specify the complaint density metric that best predicts coating program quality in your markets', 'Add the process control changes that most reduced complaint density in a specific market', 'Reference the sales team time reallocation that happened when complaint rates dropped'],
  ],
}

export function generateYouTube(inputs: YouTubeInputs, seed = 0): YouTubeOutput {
  const prob = inputs.problem
  const data = PROBLEM_DATA[prob]
  const idx = seed % 3
  const ctaIdx = seed % CTAS.length

  const hasDataPoints = true
  const hasCTA = true
  const hasConsequence = true
  const wordCount = 350

  const qualityScore = scoreContent(inputs, hasDataPoints, hasCTA, hasConsequence, wordCount)

  const repurposingSuggestions = REPURPOSING.slice(0, 4)
  const improvementSuggestions = IMPROVEMENT_SUGGESTIONS[prob]?.[idx] ?? [
    'Add a specific data point tied to your operation\'s coating volume or lot size',
    'Reference a named crop type and planting environment to increase specificity',
    'Include a process control step that your audience can evaluate against their current program',
  ]

  return {
    platform: 'youtube',
    title: TITLES[prob]?.[idx] ?? `Seed Coating Performance: ${inputs.angle}`,
    thumbnailText: THUMBNAIL_TEXT[prob]?.[idx] ?? 'SEED COATING MATTERS',
    threeSecondHook: THREE_SECOND_HOOKS[prob]?.[idx] ?? `Seed coating decisions made at the facility determine field performance outcomes. Here's what that means for your operation.`,
    openingLine: OPENING_LINES[prob]?.[idx] ?? `${data?.stat1 ?? 'Seed coating performance starts at the processing line.'} Today we\'re breaking down what drives this and what to do about it.`,
    scriptOrOutline: SCRIPTS[prob]?.[idx] ?? `INTRO: ${data?.stat1}\n\nSECTION 1 — THE PROBLEM: ${data?.stat2}\n\nSECTION 2 — THE COST: ${data?.cost1}. ${data?.cost2}.\n\nSECTION 3 — THE FIX: Validated seed preparation programs address this at the processing stage before the seed reaches the field.\n\nCONCLUSION: ${data?.consequence}\n\nCTA: ${CTAS[ctaIdx]}`,
    retentionBeats: RETENTION_BEATS[prob]?.[idx] ?? [
      'Open with the specific operational problem and its field consequence',
      'Break down the mechanism — what causes the problem at the processing stage',
      'Show the cost data — specific ranges, not generalities',
      'Walk through the process control that prevents it',
      'Close with what changes when the control is in place',
    ],
    businessInsight: BUSINESS_INSIGHTS[prob] ?? `${COMPANY.name} helps seed companies improve coating consistency, treatment performance, and planting outcomes through advanced coating, treatment, and pelleting services.`,
    cta: CTAS[ctaIdx],
    repurposingSuggestions,
    qualityScore,
    improvementSuggestions,
  }
}
