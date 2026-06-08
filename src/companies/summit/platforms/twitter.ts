import type { TwitterInputs, TwitterOutput } from '../types'
import { PROBLEM_DATA, COMPANY } from '../lib/companyProfile'
import { scoreContent } from '../lib/scoring'

const MAIN_POSTS: Record<string, string[]> = {
  'coating-inconsistency': [
    `Coating weight variation above 3–5% across a seed lot creates measurable differences in germination timing, emergence uniformity, and early stand performance.\n\nNone of that shows up in your germination test.\n\nIt shows up in the field.`,
    `Seed companies with validated coating programs see grower complaint rates 2–4x lower than those without formal process controls.\n\nThe difference isn't the product.\n\nIt's the process.`,
    `The most expensive coating problem isn't visible at the bag.\n\nCoating inconsistency — from worn equipment, binder variation, or uncalibrated application rates — shows up after planting.\n\nWhen your options are limited.`,
  ],
  'germination-variability': [
    `Up to 35% of field germination inconsistency in commercial seed lots traces back to seed preparation variables — not seed genetics.\n\nCoating thickness. Treatment application rate. Seed-to-seed treatment transfer.\n\nNot the variety.`,
    `Emergence timing variation of more than 3–5 days within a seed lot creates yield drag of 8–15% in row crops.\n\nThe late-emerging plants never recover.\n\nThe decision that caused the timing variation was made before the seed left the facility.`,
    `When germination is uneven, the seed is blamed first.\n\nThat's the right instinct — but the wrong target.\n\n35% of the time, the problem started at the coating line.`,
  ],
  'seed-treatment-complexity': [
    `Multi-chemistry seed treatment programs fail at 3x the rate when compatibility isn't validated.\n\nStacking fungicides, insecticides, biostimulants, and inoculants without sequencing validation reduces efficacy by 20–40%.\n\nBefore the seed is planted.`,
    `60% of in-house seed treatment operations don't have formal documentation for regulatory compliance.\n\nApplication rate accuracy. Re-entry intervals. Worker protection records.\n\nNot a paperwork problem. A liability.`,
    `Seed treatment complexity is not a chemistry problem.\n\nIt's a process control problem.\n\nThe cost of getting it wrong compounds through every bag of seed that leaves the facility.`,
  ],
  'planting-performance-risk': [
    `Coating weight variation that shifts effective seed size outside the meter's calibration range produces skip rates.\n\nThat's not a planter problem.\n\nIt's a coating spec problem — and it was created months before planting.`,
    `Seed singulation accuracy drops 15–30% when coating weight deviates from the meter's calibration range.\n\nMost planter operators adjust the meter.\n\nThe coating line is where the fix belongs.`,
    `Growers who report skip rates above 3% are often dealing with coating weight variation that shifted effective seed size outside spec.\n\nThe complaint arrives in season.\n\nThe decision was made at the processing line.`,
  ],
  'seed-handling-issues': [
    `Seed loses 8–18% of its coating material during bulk handling — gravity wagons, air seeders, pneumatic conveyors.\n\nThat's treatment that never reaches the planting environment.\n\nAnd it's not showing up in your germination test.`,
    `Coating dust during handling and transport isn't a cosmetic issue.\n\nIt's evidence that your coating is actively degrading before the seed reaches the planter.\n\nAnd it's a regulatory compliance issue under worker protection standards.`,
    `Seed flowability variation above 20% causes meter calibration drift and inconsistent population at the planter.\n\nIt starts at the coating line.\n\nIt shows up at every pass.`,
  ],
  'pelleting-precision': [
    `Pellet weight variation above 5% is the primary driver of singulation failure in precision-seeded specialty crops.\n\nVegetable. Flower. Forage.\n\nPellet quality is planting performance.`,
    `Roundness deviation above 0.08 in pelleted seed reduces vacuum seeder singulation accuracy by 18–35%.\n\nThat directly affects crop stand uniformity.\n\nAnd harvest timing consistency.`,
    `Pellet integrity failures — cracking, shattering, excessive water absorption — occur in 12–25% of pelleted lots that weren't validated against target planting conditions.\n\nThe planting environment isn't the problem.\n\nThe validation gap is.`,
  ],
  'poor-seed-prep-cost': [
    `The cost of a poor seed preparation decision is never paid at the processing line.\n\nIt's paid in the field.\n\nAt the claim. In the customer relationship — three months after the decision.`,
    `Seed companies without traceable coating records spend 3–5x more on warranty replacement, customer service, and reputational recovery than those with documented programs.\n\nTraceability isn't a quality cost.\n\nIt's a complaint management investment.`,
    `A single lot rejection from coating failure, treatment error, or pellet quality rejection averages $15,000–$80,000.\n\nThe process control that prevents it costs a fraction of that.\n\nBefore the lot ships.`,
  ],
  'crop-establishment': [
    `Stands below 85% of target population in the first 14 days increase yield loss probability by 20–40%.\n\nThe coating decision is usually where it started.\n\nIt's usually the last thing investigated.`,
    `In high-value vegetable and specialty crops, stand failures requiring replanting cost $800–$4,500/acre in direct cost.\n\nPlus lost market window value that can exceed the direct cost by 2–3x.\n\nSeed coating decisions that don't account for the planting environment create this risk.`,
    `Crop establishment failures are diagnosed at the field.\n\nThe decisions that cause them are made at seed preparation — in coating specifications, treatment rates, and pelleting validation that either fit the planting environment or don't.`,
  ],
  'scaling-operations': [
    `Coating operations that scale from 50,000 to 500,000 units without process documentation see batch variation increase 25–50% as volume grows.\n\nScale doesn't solve coating inconsistency.\n\nIt amplifies it.`,
    `Equipment calibration drift of 3–5% per 100,000-unit production run is predictable.\n\nMost scaling operations don't have the re-validation protocol to catch it.\n\nThat drift shows up in field performance before it shows up in QC data.`,
    `Customer complaints from scaled coating operations concentrate in the first and last 20% of each production campaign.\n\nThat's a process control signal.\n\nNot a capacity problem.`,
  ],
  'grower-trust': [
    `A single season of field performance inconsistency reduces repeat purchase intent among commercial growers by 35–55%.\n\nThe relationship recovery cost is 5–10x the complaint.\n\nThe coating traceability that prevents it costs less than one recovery event.`,
    `Growers who can't trace field performance problems to a specific seed lot record are 3x more likely to blame the seed company.\n\nRegardless of whether the coating caused the problem.\n\nTraceability changes the conversation.`,
    `Sales teams in markets with high grower complaint rates spend 40–60% more time on complaint management than teams in markets with documented coating programs.\n\nComplaint density is a lagging indicator.\n\nCoating program quality is the leading one.`,
  ],
}

const THREADS: Record<string, string[][]> = {
  'coating-inconsistency': [
    [
      `Thread: what coating weight variation actually costs a seed company — and what controls it. (1/6)`,
      `Coating weight variation above 3–5% creates measurable differences in germination timing, emergence uniformity, and early stand performance.\n\nNone of it shows up in the germination test. (2/6)`,
      `The data: seed companies that rely on inconsistent coating processes see grower complaint rates 2–4x higher than those with validated, controlled coating programs.\n\nComplaints cluster around uneven emergence and stand inconsistency. (3/6)`,
      `What drives coating weight variation:\n— Worn application equipment\n— Binder viscosity drift between batches\n— Temperature changes in the coating drum\n— Uncalibrated application rates\n\nAll of them are measurable. All of them are controllable. (4/6)`,
      `What a controlled coating program includes:\n— Calibration checks at defined production intervals\n— In-process weight sampling\n— Binder viscosity testing per batch\n— Formal tolerance limits with stop/re-validate protocols (5/6)`,
      `${PROBLEM_DATA['coating-inconsistency'].consequence}\n\nFollow ${COMPANY.name} for more seed performance and coating operations content. (6/6)`,
    ],
    [
      `Thread: the germination test gap — why standard QC doesn't catch coating variation, and what does. (1/5)`,
      `Standard germination tests are run under controlled conditions. Coating weight variation that creates field performance problems often doesn't affect germination under those conditions.\n\nA lot can pass testing and still fail in the field. (2/5)`,
      `What field-predictive QC includes that standard testing misses:\n— Coating weight sampling across the lot\n— Uniformity measurement across the seed population\n— Validation against target planting conditions, not lab conditions (3/5)`,
      `The cost: coating inconsistency caused by process variables reduces effective germination by 10–20% compared to a properly coated control lot.\n\nThat gap is visible in the field. Not in the test. (4/5)`,
      `The coating process creates the seed's interface with the planting environment.\n\nWhen that interface is inconsistent, the agronomic potential built into the genetics becomes harder to deliver.\n\nFollow ${COMPANY.name} for seed coating and performance content. (5/5)`,
    ],
    [
      `Thread: the 3 process variables that drive coating weight drift — and the one metric that predicts it. (1/6)`,
      `Coating weight drift happens when process variables are not formally controlled between production runs.\n\nHere are the three that matter most. (2/6)`,
      `1. Equipment wear.\n\nCoating application equipment wear changes spray pattern, delivery rate, and coverage uniformity — often in ways that aren't visible without calibration testing. (3/6)`,
      `2. Binder viscosity.\n\nBinder viscosity changes with temperature and batch-to-batch variation. Without viscosity testing per batch, the application rate delivers inconsistent coating weight across the lot. (4/6)`,
      `3. Drum temperature.\n\nCoating drum temperature affects drying rate, film formation, and adhesion. Temperature variation during a production run creates coating weight inconsistency across the lot. (5/6)`,
      `The one metric that predicts coating quality: in-process weight sampling at defined intervals.\n\nIt catches drift before the lot is complete — when correction is still possible.\n\nFollow ${COMPANY.name} for more seed coating operations content. (6/6)`,
    ],
  ],
  'germination-variability': [
    [
      `Thread: why 35% of field germination inconsistency starts at the coating line — and how to trace it. (1/5)`,
      `When growers report uneven emergence, genetics get blamed first.\n\nThat's the wrong target 35% of the time. (2/5)`,
      `The seed preparation variables that drive germination timing:\n— Coating thickness variation\n— Treatment application rate inconsistency\n— Seed-to-seed treatment transfer variation\n\nAll controllable. All measurable at the processing stage. (3/5)`,
      `The data: emergence timing variation of more than 3–5 days within a lot creates yield drag of 8–15% in row crops.\n\nThe late-emerging plants never fully recover their competitive position. (4/5)`,
      `Germination variability is a diagnostic problem.\n\nThe fix belongs at seed preparation — not at the planting window.\n\nFollow ${COMPANY.name} for seed performance and preparation operations content. (5/5)`,
    ],
    [
      `Thread: coating and treatment variables that cause germination inconsistency — what to measure and when. (1/6)`,
      `Up to 35% of field germination inconsistency in commercial lots traces to preparation variables.\n\nHere's what to measure. (2/6)`,
      `Treatment application rate uniformity.\n\nNon-uniform treatment application creates seed-to-seed variation in active ingredient coverage — which creates variation in pathogen protection, germination stimulation, and early seedling response. (3/6)`,
      `Coating film thickness.\n\nThick coatings slow germination initiation. Thin coatings reduce protection and physical performance. Variation across the lot produces variation in emergence timing. (4/6)`,
      `Seed moisture content at coating.\n\nSeed moisture at the time of coating affects film adhesion, treatment uptake, and storage stability. Lots with moisture outside spec before coating carry that variation into the field. (5/6)`,
      `What validated preparation produces: emergence timing within the 3–5 day window that avoids yield drag.\n\nMeasurable before the seed leaves the facility.\n\nFollow ${COMPANY.name} for seed preparation and germination performance content. (6/6)`,
    ],
    [
      `Thread: cold and wet germination failures — and the coating validation gap that causes them. (1/5)`,
      `Seed lots with germination variability above 15% in cold or wet planting conditions often trace to coating decisions that weren't validated for those environments.\n\nThe germination test passed. The field didn't. (2/5)`,
      `Standard germination tests run at optimal conditions. Cold, wet, and high-residue planting environments are not optimal conditions.\n\nThe gap between test and field performance is a coating formulation gap. (3/5)`,
      `Environmental validation for coating includes:\n— Target planting window soil temperature range\n— Expected moisture conditions at planting\n— Residue cover type and volume\n— Coating material performance tested against each variable (4/5)`,
      `The right coating for a standard germination test is not necessarily the right coating for your target planting window.\n\nValidation connects the two.\n\nFollow ${COMPANY.name} for seed coating and environmental performance content. (5/5)`,
    ],
  ],
  'seed-treatment-complexity': [
    [
      `Thread: why multi-chemistry seed treatment programs fail — and what compatibility validation actually requires. (1/6)`,
      `Operations handling 8 or more active ingredient combinations without compatibility testing experience formulation failures at 3x the rate of operations with validated programs.\n\nHere's what causes those failures. (2/6)`,
      `Chemical interaction between incompatible actives.\n\nWhen incompatible chemistries contact each other in the treatment stack, they reduce each other's efficacy — sometimes by 20–40% — before the seed is planted. (3/6)`,
      `Carrier incompatibility.\n\nThe liquid carrier for one active can degrade or displace the film formed by another. Sequencing that ignores carrier compatibility produces treatment coverage failures that aren't visible at the bag. (4/6)`,
      `Coating adhesion failure from improper sequencing.\n\nSome actives require a specific application order to maintain adhesion integrity. Out-of-sequence application causes treatment loss during handling — before planting. (5/6)`,
      `Compatibility validation is a one-time investment per treatment stack.\n\nFormulation failure cost compounds through every affected lot.\n\nFollow ${COMPANY.name} for seed treatment operations and validation content. (6/6)`,
    ],
    [
      `Thread: regulatory compliance in seed treatment — what's required and what 60% of operations are missing. (1/5)`,
      `60% of in-house seed treatment operations don't have formal documentation for regulatory compliance.\n\nHere's what that gap includes. (2/5)`,
      `Application rate accuracy per lot.\n\nLabel compliance requires that each lot be treated at the specified rate — and that rate be documented at the lot level, not averaged across a production run. (3/5)`,
      `Re-entry interval documentation.\n\nWorker protection standards for seed treatment require that re-entry intervals be documented and enforced for each treatment applied.\n\nMost in-house operations don't track this at the lot level. (4/5)`,
      `What documentation protects against:\n— Regulatory exposure from undocumented application rates\n— Worker protection compliance failures\n— Customer liability from untraceable treatment records\n\nThe documentation cost is a fraction of one compliance event. (5/5)`,
    ],
    [
      `Thread: seed treatment complexity — why the chemistry isn't the problem, and what is. (1/5)`,
      `When a multi-chemistry treatment program underperforms, the chemistry gets blamed.\n\nMost of the time, the process is the issue. (2/5)`,
      `The chemistry performs as labeled — when the process delivers it correctly.\n\nApplication sequencing errors, carrier incompatibility, and adhesion failure change what the seed receives.\n\nNot what the label says. (3/5)`,
      `Three process failures that reduce treatment efficacy:\n1. Out-of-sequence application deactivating time-sensitive biologicals\n2. Carrier incompatibility degrading active ingredient coverage\n3. Poor adhesion causing treatment loss during handling (4/5)`,
      `The fix is process validation — not chemistry selection.\n\nValidate the sequence. Document the program. Establish re-validation triggers for any component change.\n\nFollow ${COMPANY.name} for seed treatment and processing operations content. (5/5)`,
    ],
  ],
  'planting-performance-risk': [
    [
      `Thread: how coating weight variation breaks planter meter performance — and why adjusting the meter doesn't fix it. (1/5)`,
      `Planter meters are calibrated to a seed size and weight profile.\n\nWhen coating weight variation shifts effective seed size outside that range, the meter produces skip rates and doubles.\n\nAdjusting the meter doesn't correct the underlying variation. (2/5)`,
      `The data: seed singulation accuracy drops 15–30% when coating weight deviates from the meter's calibration range.\n\nThat's a coating spec problem — created at the processing line, months before planting. (3/5)`,
      `What coating weight validation for planter compatibility includes:\n— Tolerance limits matched to meter specifications\n— In-process sampling to detect drift before lot release\n— Planter simulation testing for high-value lots (4/5)`,
      `The coating decision affects every physical interaction the seed has from the bag to the soil.\n\nValidation connects the coating spec to the planting equipment it has to work with.\n\nFollow ${COMPANY.name} for seed performance and coating operations content. (5/5)`,
    ],
    [
      `Thread: skip rates, stand counts, and the coating decision that caused them. (1/5)`,
      `Growers who experience skip rates above 3% at recommended planting populations often trace the issue to seed lot coating inconsistency.\n\nSpecifically: coating weight variation that shifted effective seed size outside the meter's working range. (2/5)`,
      `The diagnostic chain: skip rate complaint → meter inspection → no meter fault → seed lot audit → coating weight variation outside tolerance.\n\nPredictable. Repeatable. Preventable. (3/5)`,
      `What changes when coating specs are validated against planter meter requirements:\n— Skip rates return to baseline population targets\n— Stand counts match seeding rate projections\n— Grower complaints about population inconsistency drop (4/5)`,
      `Planting performance risk from coating variation is preventable — but only if coating specs are validated before the lot leaves the facility.\n\nFollow ${COMPANY.name} for seed coating, treatment, and planting performance content. (5/5)`,
    ],
    [
      `Thread: how coating affects the physical seed-to-soil interface — and what that means for stand establishment. (1/5)`,
      `The seed coating is the seed's physical interface with the opener, the furrow, and the soil.\n\nCoatings that crack, flake, or absorb moisture unevenly at planting change that interface in ways that affect stand establishment. (2/5)`,
      `Three physical effects of coating quality on seed placement:\n1. Depth consistency — coating density affects how the opener places the seed\n2. Soil contact quality — film integrity affects moisture uptake at imbibition\n3. Skip patterns — coating weight variation outside meter range affects singulation (3/5)`,
      `The physical interface between seed and soil is set by the coating formulation long before planting.\n\nCoatings that aren't validated for the opener type, soil condition, and moisture environment create placement inconsistency that shows up in stand data. (4/5)`,
      `Film integrity. Density. Smoothness.\n\nThese aren't cosmetic coating properties.\n\nThey're planting performance variables.\n\nFollow ${COMPANY.name} for seed performance and coating quality content. (5/5)`,
    ],
  ],
  'seed-handling-issues': [
    [
      `Thread: the 8–18% coating material loss problem — what causes it and what formulation prevents it. (1/5)`,
      `Seed loses 8–18% of its coating material during bulk handling.\n\nGravity wagons. Air seeders. Pneumatic conveyors.\n\nThat's treatment that never reaches the planting environment. (2/5)`,
      `What causes abrasion-driven coating loss:\n— Impact in gravity wagons\n— Friction in pneumatic conveyors\n— Repeated seed-to-seed contact during transfer\n\nCoatings not formulated for handling durability shed material at predictable rates in each environment. (3/5)`,
      `What handling-durable coating formulation addresses:\n— Binder selection for abrasion resistance\n— Film thickness calibrated for the handling path\n— Abrasion testing against representative equipment before lot release (4/5)`,
      `The handling path the seed follows before planting is part of the coating specification.\n\nFormulations that don't account for it deliver inconsistent treatment to the planting environment.\n\nFollow ${COMPANY.name} for seed handling and coating operations content. (5/5)`,
    ],
    [
      `Thread: coating dust during handling — what it signals, what it costs, and what prevents it. (1/5)`,
      `Coating dust during handling and transport is not a cosmetic issue.\n\nIt signals coating adhesion failure, active degradation, and treatment loss that reduces field performance. (2/5)`,
      `The regulatory dimension: worker protection standards apply to treatment dust exposure during seed handling.\n\nOperations generating dust without controls face compliance exposure — on top of the coating performance problem. (3/5)`,
      `What causes dust generation:\n— Binder adhesion insufficient for the handling environment\n— Film thickness below the abrasion threshold for pneumatic delivery\n— Coating formulation not tested against the handling equipment (4/5)`,
      `Handling-durable binder systems that maintain adhesion through pneumatic handling reduce both dust generation and treatment loss.\n\nTwo problems. One formulation decision.\n\nFollow ${COMPANY.name} for seed handling, coating, and compliance content. (5/5)`,
    ],
    [
      `Thread: seed flowability, meter calibration drift, and the coating variable that connects them. (1/5)`,
      `Seed flowability variation above 20% causes meter calibration drift and inconsistent planting population.\n\nIt starts at the coating line.\n\nIt shows up at every pass. (2/5)`,
      `What drives flowability variation in coated seed:\n— Coating weight inconsistency that creates size variation\n— Binder tackiness that causes clumping\n— Coating surface texture variation that changes flow rate (3/5)`,
      `The effect at the planter:\n— Flow rate changes between passes\n— Population targets are hit inconsistently\n— Stand counts don't match seeding rate data\n\nNone of it correctable by meter adjustment alone. (4/5)`,
      `Flowability QC before lot release catches variation before it reaches the planter.\n\nBinder formulation for consistent surface texture is where the fix starts.\n\nFollow ${COMPANY.name} for seed coating quality and planting performance content. (5/5)`,
    ],
  ],
  'pelleting-precision': [
    [
      `Thread: pellet weight variation, singulation failure, and what precision pelleting controls. (1/5)`,
      `Pellet weight variation above 5% is the primary driver of singulation failure in vacuum seeders.\n\nIn specialty crop, vegetable, and flower production, singulation failure determines stand quality before a seed touches the soil. (2/5)`,
      `The mechanism: vacuum seeders hold pellets by size and weight. Pellets outside the calibration range — from weight variation, size inconsistency, or shape deviation — produce skip rates and doubles.\n\nAdjusting the seeder doesn't correct pellet variation. (3/5)`,
      `What precision pelleting weight control requires:\n— Batch-level weight uniformity monitoring\n— Pellet weight sampling protocol with tolerance thresholds\n— QC hold triggers before lot release (4/5)`,
      `Pellet quality is planting performance.\n\nIn precision-seeded crops, it determines whether the stand is right at establishment or expensive to remediate.\n\nFollow ${COMPANY.name} for precision pelleting and specialty crop seeding content. (5/5)`,
    ],
    [
      `Thread: roundness deviation, vacuum seeder performance, and why sphericity is a planting performance variable. (1/5)`,
      `Roundness deviation above 0.08 in pelleted seed reduces vacuum seeder singulation accuracy by 18–35%.\n\nThat directly affects crop stand uniformity.\n\nAnd harvest timing consistency. (2/5)`,
      `Why roundness matters: vacuum seeders hold pellets by surface contact. Pellets with roundness deviation outside spec contact the seeder plate inconsistently — producing variation in hold, release, and placement. (3/5)`,
      `The production chain from pellet to harvest:\nPellet roundness → singulation accuracy → population consistency → emergence uniformity → harvest timing consistency\n\nEach step is predictable. Most are controllable at the pelleting stage. (4/5)`,
      `Sphericity index measurement is not a cosmetic QC step in precision pelleting.\n\nIt's a planting performance input.\n\nFollow ${COMPANY.name} for precision pelleting and specialty crop seeding operations content. (5/5)`,
    ],
    [
      `Thread: pellet integrity failure — what causes it, what it costs in specialty crops, and how to prevent it. (1/5)`,
      `Pellet integrity failures — cracking, shattering, excessive moisture absorption — occur in 12–25% of pelleted lots that weren't validated against target planting conditions.\n\nThe planting environment isn't the problem. The validation gap is. (2/5)`,
      `Three pellet integrity failure modes:\n1. Cracking in cold soil — from pellet material not formulated for low-temperature planting\n2. Shattering under vacuum seeder pressure — from density below handling specification\n3. Premature moisture absorption — from pellet material not matched to target soil moisture (3/5)`,
      `What environmental validation for pelleted lots includes:\n— Temperature and moisture stress testing before release\n— Vacuum seeder singulation simulation testing\n— Drop and impact integrity testing for bulk handling (4/5)`,
      `Pellet quality is not established at the pellet drum.\n\nIt's confirmed against the conditions the pellet will face at planting.\n\nFollow ${COMPANY.name} for pelleting quality and precision seeding operations content. (5/5)`,
    ],
  ],
  'poor-seed-prep-cost': [
    [
      `Thread: the real cost of poor seed preparation — and where it's actually paid. (1/5)`,
      `The cost of a poor seed preparation decision is never paid at the processing line.\n\nIt's paid in the field, at the claim, and in the customer relationship — after the decision is three months old. (2/5)`,
      `The cost chain:\nCoating failure → field complaint → warranty replacement → competitor trial → lost repeat business\n\nEach step costs more than the previous one.\n\nNone of them appear on the processing cost sheet. (3/5)`,
      `The data: seed companies that attribute field complaints to genetics rather than seed preparation spend 3–5x more on warranty replacement, customer service, and reputational recovery than those with traceable records. (4/5)`,
      `Traceability is not a quality cost.\n\nIt's a complaint management investment with a measurable return.\n\nFollow ${COMPANY.name} for seed preparation quality and traceability content. (5/5)`,
    ],
    [
      `Thread: lot rejection costs — what they include, what causes them, and what process controls prevent them. (1/5)`,
      `A single lot rejection from coating failure, treatment error, or pellet quality rejection averages $15,000–$80,000 per event.\n\nDepending on lot size, crop value, and treatment cost. (2/5)`,
      `What a lot rejection actually costs beyond the rework bill:\n— Replacement seed cost or lost revenue\n— Customer service time for complaint management\n— Competitive trials triggered by the performance failure\n— Lost repeat business from the affected customer (3/5)`,
      `What causes the most common lot rejections:\n— Coating weight variation outside spec\n— Treatment application rate error\n— Pellet quality below singulation specification\n\nAll preventable with documented process controls. (4/5)`,
      `The process control investment that prevents one lot rejection event typically costs less than the event itself.\n\nBefore the lot ships.\n\nFollow ${COMPANY.name} for seed preparation quality and cost management content. (5/5)`,
    ],
    [
      `Thread: traceability — what it allows in a complaint, and why operations without it pay 3–5x more. (1/5)`,
      `Seed companies without traceable coating and treatment records spend 3–5x more on field complaint recovery.\n\nHere's what traceability allows that untraceable programs can't deliver. (2/5)`,
      `With traceable records, a field complaint can be resolved in days:\n— Lot-level coating weight records identify the production run\n— Treatment records identify the application rate and sequence\n— QC records identify whether the lot passed in-process validation (3/5)`,
      `Without traceable records, the same complaint takes weeks to investigate — and often can't be resolved with data.\n\nThe default attribution is the seed company.\n\n3x more often than any other factor. (4/5)`,
      `Traceability system elements that matter most:\n— Lot-level coating weight documentation\n— Treatment application rate record per lot\n— Binder lot and batch records\n— QC checkpoint logs with sign-off dates\n\nFollow ${COMPANY.name} for seed preparation quality and traceability content. (5/5)`,
    ],
  ],
  'crop-establishment': [
    [
      `Thread: crop establishment failures — where they're diagnosed vs. where they start. (1/5)`,
      `Crop establishment failures are diagnosed at the field.\n\nThe decisions that cause them are made at seed preparation — in coating specifications, treatment rates, and pelleting validation that either fit the planting environment or don't. (2/5)`,
      `The establishment threshold: stands below 85% of target population in the first 14 days increase yield loss probability by 20–40%.\n\nThe coating decision contributes to whether that threshold is met. (3/5)`,
      `What coating decisions affect at establishment:\n— Moisture uptake rate at imbibition\n— Pathogen protection in target soil conditions\n— Physical seed placement quality\n— Emergence timing consistency (4/5)`,
      `Coating specifications validated for the target planting environment reduce preventable establishment risk.\n\nValidation happens at the processing stage.\n\nThe outcome is visible at establishment.\n\nFollow ${COMPANY.name} for crop establishment and seed preparation content. (5/5)`,
    ],
    [
      `Thread: specialty crop replanting cost — what it includes, and what seed preparation decisions determine it. (1/5)`,
      `In high-value vegetable and specialty crops, stand failures requiring replanting cost $800–$4,500/acre in direct cost.\n\nPlus lost market window value that can exceed the direct cost by 2–3x. (2/5)`,
      `What determines replanting risk in specialty crops:\n— Pellet quality validated for target soil conditions\n— Coating specification matched to planting environment\n— Lot documentation that allows rapid diagnosis if stand failure occurs (3/5)`,
      `The market window consequence: a stand failure in week two of a specialty crop production window can cost more in lost market access than in seed and labor.\n\nThe planting decision is time-sensitive.\n\nThe preparation decision isn't — if it's made before the lot ships. (4/5)`,
      `Crop establishment failure is expensive to remediate.\n\nIt's inexpensive to prevent — if the seed preparation decision accounts for the planting environment.\n\nFollow ${COMPANY.name} for specialty crop seeding and seed preparation content. (5/5)`,
    ],
    [
      `Thread: the establishment diagnostic gap — why coating is investigated last when it should be investigated first. (1/5)`,
      `The typical establishment failure investigation:\nStand failure → soil temperature → equipment → variety performance → (eventually) seed preparation\n\nCoating is usually the last thing investigated.\n\nIt's frequently the first place the problem started. (2/5)`,
      `Why the diagnostic gap exists: coating and treatment decisions are made at the processing stage, documented inconsistently, and separated from the field complaint by months.\n\nThe connection is hard to make without records. (3/5)`,
      `What records make the connection possible:\n— Lot-level coating weight documentation\n— Environmental validation data for target planting conditions\n— Treatment application rate and sequence records\n— QC checkpoint sign-off per lot (4/5)`,
      `The right coating for standard germination conditions is not necessarily the right coating for your target field.\n\nClosing that gap is the job of seed preparation validation.\n\nFollow ${COMPANY.name} for crop establishment and seed coating operations content. (5/5)`,
    ],
  ],
  'scaling-operations': [
    [
      `Thread: why scaling seed coating operations makes inconsistency worse — and what process documentation prevents. (1/6)`,
      `Coating operations that scale from 50,000 to 500,000 units without process documentation see batch variation increase 25–50% as volume grows.\n\nScale doesn't solve coating inconsistency.\n\nIt amplifies it. (2/6)`,
      `Why scale amplifies inconsistency without documentation:\n— More production runs means more opportunities for process drift\n— Larger campaigns mean longer intervals between calibration checks\n— Higher volume means more lots released before QC data flags the drift (3/6)`,
      `Process documentation for scale includes:\n— Application rate specifications per crop\n— Equipment calibration schedules tied to production volume\n— In-process sampling protocols with trigger thresholds\n— Re-validation procedures for every process change (4/6)`,
      `What happens when scale and process controls grow together:\n— Batch variation stays within tolerance as volume increases\n— Calibration drift is caught before lots are released\n— Customer complaint density stays constant or drops as volume grows (5/6)`,
      `Scale does not fix coating inconsistency.\n\nProcess controls do — and they need to scale with the volume.\n\nFollow ${COMPANY.name} for coating operations and scaling process control content. (6/6)`,
    ],
    [
      `Thread: campaign endpoint complaints — why they concentrate there, and what process controls prevent them. (1/5)`,
      `Customer complaints from scaled coating operations concentrate in the first and last 20% of each production campaign.\n\nThat's a process control signal.\n\nNot a capacity problem. (2/5)`,
      `Why the first 20% of a campaign produces inconsistency:\n— Equipment not validated at production conditions before the campaign starts\n— Binder viscosity not stabilized at production temperature\n— Operator calibration checks running against the previous campaign's state (3/5)`,
      `Why the last 20% of a campaign produces inconsistency:\n— Equipment wear accumulated over the full campaign\n— Binder inventory from a different batch\n— Temperature variation in longer production runs (4/5)`,
      `Campaign control protocols that address both:\n— Pre-campaign equipment validation at production conditions\n— In-process validation checkpoints at defined intervals\n— End-of-campaign QC sampling before final lot release\n\nFollow ${COMPANY.name} for coating operations and production process control content. (5/5)`,
    ],
    [
      `Thread: equipment calibration drift — how fast it happens, what it costs, and how to manage it. (1/5)`,
      `Equipment calibration drift of 3–5% per 100,000-unit production run is predictable.\n\nMost scaling operations don't have the re-validation protocol to catch it.\n\nThat drift shows up in field performance before QC data flags it. (2/5)`,
      `The variables that drift fastest at scale:\n— Spray nozzle wear changes coverage pattern and application rate\n— Drum liner wear affects seed contact and coating uniformity\n— Binder delivery system calibration drifts with temperature change (3/5)`,
      `What volume-triggered re-validation includes:\n— Equipment inspection at defined production volume checkpoints\n— Binder viscosity check at each re-validation event\n— In-process weight sampling after re-validation before resuming production (4/5)`,
      `Calibration drift is not a mystery.\n\nIt's a predictable process variable.\n\nManaged with a protocol that's triggered by volume, not calendar time.\n\nFollow ${COMPANY.name} for coating equipment management and scaling content. (5/5)`,
    ],
  ],
  'grower-trust': [
    [
      `Thread: grower trust, repeat purchase intent, and the coating traceability that protects both. (1/5)`,
      `A single season of field performance inconsistency reduces repeat purchase intent among commercial growers by 35–55%.\n\nThe relationship recovery cost is 5–10x the original complaint.\n\nThe traceability that prevents it costs less than one recovery event. (2/5)`,
      `Why traceability protects the relationship:\n— Rapid root cause identification changes the complaint timeline\n— Specific corrective action per lot changes the customer conversation\n— Data-backed resolution changes the grower's perception of accountability (3/5)`,
      `What happens without records:\n— Root cause investigation takes weeks\n— Default attribution goes to the seed company\n— Customer relationship is damaged before the investigation concludes (4/5)`,
      `Trust is not lost in the field.\n\nIt's lost at the coating line — when inconsistency, error, or poor documentation creates a problem that can't be explained, owned, or fixed.\n\nFollow ${COMPANY.name} for grower trust and seed operations content. (5/5)`,
    ],
    [
      `Thread: the 3x attribution rule — why growers blame the seed company when records don't exist. (1/5)`,
      `Growers who can't trace field performance problems to a specific seed lot record are 3x more likely to attribute the failure to the seed company.\n\nRegardless of whether the coating decision caused the problem. (2/5)`,
      `The attribution logic: when a grower can't identify a cause, the most visible responsible party gets assigned the blame.\n\nFor seed performance complaints, that's usually the seed company.\n\nTraceable records change both the investigation and the attribution. (3/5)`,
      `What changes when records exist:\n— The complaint can be traced to a specific lot, date, and process state\n— The corrective action is specific — not speculative\n— The customer conversation is data-backed — not defensive (4/5)`,
      `The operational cost of the 3x attribution effect:\n— 3–5x higher recovery cost per complaint\n— 40–60% more sales team time on complaint management\n— 35–55% reduction in repeat purchase intent\n\nAll addressable with traceable coating records.\n\nFollow ${COMPANY.name} for seed traceability and grower relationship content. (5/5)`,
    ],
    [
      `Thread: complaint management time — the metric that tells you most about your coating program quality. (1/5)`,
      `Sales teams in markets with high grower complaint rates spend 40–60% more time on complaint management than teams in markets with documented, consistent coating programs.\n\nComplaint density is a lagging indicator.\n\nCoating program quality is the leading one. (2/5)`,
      `What drives complaint density:\n— Coating weight variation outside spec\n— Treatment application inconsistency\n— Lack of traceable records for rapid complaint resolution\n\nAll measurable at the processing stage. (3/5)`,
      `What changes when coating program quality improves:\n— Complaint density drops\n— Complaint resolution time drops\n— Sales team time shifts from recovery to relationship management (4/5)`,
      `The investment that changes complaint density most: process controls and traceability at the coating stage.\n\nThe return: sales teams that spend their time building relationships instead of managing complaints.\n\nFollow ${COMPANY.name} for coating quality and grower relationship content. (5/5)`,
    ],
  ],
}

const ALTERNATE_HOOKS: Record<string, string[]> = {
  'coating-inconsistency': [
    'The seed that looks right at the bag can still fail in the field. Here\'s what the germination test doesn\'t tell you about coating quality.',
    'Coating weight variation doesn\'t fail germination tests. It fails stand counts. That\'s the gap worth closing.',
    'Two seed lots. Same variety. Same germination test result. One performs. One doesn\'t. The coating process is usually why.',
  ],
  'germination-variability': [
    'The late-emerging plant in a row crop never recovers. And the decision that made it late was usually at the coating line.',
    'Blaming genetics for germination inconsistency is correct 65% of the time. What\'s causing the other 35%?',
    'A controlled seed preparation program narrows the emergence window. A tighter emergence window protects yield.',
  ],
  'seed-treatment-complexity': [
    'More chemistries. More interactions. More failure modes. Here\'s what multi-chemistry treatment validation actually requires.',
    'Your seed treatment label compliance is not the same as your seed treatment process compliance. Here\'s the difference.',
    'The treatment is right. The process is wrong. That\'s where 20–40% efficacy loss starts.',
  ],
  'planting-performance-risk': [
    'The planter was calibrated correctly. The coating wasn\'t. That\'s the skip rate problem.',
    'Planting performance risk doesn\'t start at the planter. It starts at the coating drum.',
    'Skip rates above 3% are a diagnostic signal. Coating weight variation is usually what they\'re pointing at.',
  ],
  'seed-handling-issues': [
    'The seed left the facility with its full treatment load. It didn\'t arrive at the planter that way.',
    'Coating dust in the grain wagon is a diagnostic signal. Here\'s what it\'s telling you.',
    'Flowability variation above 20% means your population targets are theoretical — not actual.',
  ],
  'pelleting-precision': [
    'Pellet quality is not cosmetic in precision-seeded crops. It\'s planting performance.',
    'The seeder plate was calibrated for a pellet specification your process didn\'t deliver.',
    'Stand uniformity in specialty crops starts at the pellet drum. Not the seeder.',
  ],
  'poor-seed-prep-cost': [
    'The lot passed testing. The field didn\'t. Here\'s what the gap cost — and what closes it.',
    'Without traceable records, field complaints default to seed company blame. 3x more often than any other factor.',
    'The cost of poor seed preparation shows up three months after the decision. And the options narrow every day.',
  ],
  'crop-establishment': [
    'Stand failure investigations start at the field. They should start at the coating specification.',
    'The 85% stand threshold is an agronomic standard. The coating decision determines whether you hit it.',
    'Establishment risk that\'s diagnosed at the field was created at the processing stage.',
  ],
  'scaling-operations': [
    'Scaling coating volume without scaling process controls doesn\'t produce more consistent seed. It produces more inconsistent seed, faster.',
    'Calibration drift at 100,000 units is a process variable. Most operations don\'t have the protocol to manage it.',
    'Campaign endpoint complaints are a signal. They\'re pointing at process drift — not production volume.',
  ],
  'grower-trust': [
    'One season of inconsistency. A 35–55% drop in repeat purchase intent. The relationship cost is 5–10x the complaint.',
    'When records don\'t exist, growers assign blame by default. Usually to the seed company.',
    'Complaint management time is the operational cost of coating program inconsistency. It shows up in headcount before accounting.',
  ],
}

const ENGAGEMENT_QUESTIONS: Record<string, string[]> = {
  'coating-inconsistency': [
    'What\'s the biggest coating process variable your operation tracks — and what\'s the one you\'re not measuring yet?',
    'How often does your operation re-validate coating equipment during a production campaign?',
    'Have you seen germination test results that didn\'t predict field performance? What did the coating audit show?',
  ],
  'germination-variability': [
    'What percentage of your field germination complaints have you been able to trace back to a seed preparation variable?',
    'How does your operation validate coating specs for the target planting environment — not just standard germination conditions?',
    'What\'s the emergence timing variation you\'re targeting in your commercial seed lots, and how is it measured?',
  ],
  'seed-treatment-complexity': [
    'How many active ingredients are in your most complex treatment stack — and has it been formally validated for compatibility?',
    'What\'s your current protocol for re-validating a treatment program when one component changes?',
    'What part of seed treatment regulatory compliance is hardest to document at the lot level in your operation?',
  ],
  'planting-performance-risk': [
    'Has your operation ever traced a planter skip rate problem back to coating weight variation? What was the diagnostic process?',
    'What coating weight tolerance are you currently using for your highest-volume crop, and how is it validated?',
    'Which planter type in your market is most sensitive to coating weight variation — and how does your coating spec account for it?',
  ],
  'seed-handling-issues': [
    'What\'s the longest handling path your coated seed travels before reaching the planter — and has the coating been validated for it?',
    'How does your operation test for coating dust generation before releasing a lot for bulk handling?',
    'Have you seen flowability variation cause planting population inconsistency in your market? What was the root cause?',
  ],
  'pelleting-precision': [
    'What pellet weight variation range does your operation use as the release threshold for commercial lots?',
    'Which pellet integrity failure mode — cracking, shattering, or moisture absorption — is most common in your target planting environments?',
    'Has your operation seen singulation accuracy change after moving to a higher-precision pelleting program?',
  ],
  'poor-seed-prep-cost': [
    'What record type has been most valuable to your operation when resolving a field performance complaint?',
    'What does lot-level traceability look like in your current seed preparation documentation — and what\'s missing?',
    'Have you been able to trace a field complaint to a specific coating or treatment process decision? What did that diagnostic process look like?',
  ],
  'crop-establishment': [
    'What\'s the most challenging planting environment your coating specifications need to perform in?',
    'How does your operation validate coating and pelleting specs for specific soil types and moisture conditions in target markets?',
    'Have you seen establishment performance differ between lots treated with environment-validated specs vs. standard specs?',
  ],
  'scaling-operations': [
    'At what production volume does your operation trigger a formal coating equipment re-validation?',
    'What\'s the biggest process control gap you\'ve identified as your coating volume has grown?',
    'How does your operation manage binder viscosity consistency across a multi-day production campaign?',
  ],
  'grower-trust': [
    'What traceability record has been most useful in your last significant field complaint resolution?',
    'How does your operation communicate coating and treatment lot documentation to the grower when a field problem occurs?',
    'What\'s the complaint management process your operation uses when a field performance issue can\'t be quickly traced to a lot record?',
  ],
}

const REPURPOSING = [
  'Expand the main post into a LinkedIn post with the full data point and a three-paragraph body',
  'Use the thread as a blog post structure — each tweet becomes a subheading with one paragraph of supporting detail',
  'Pull the engagement question as a standalone LinkedIn question post to generate comments and discussion',
  'Adapt the alternate hook as a YouTube three-second hook with the thread data points as the script structure',
  'Convert the thread into a Facebook educational post with the engagement question as the discussion prompt',
]

const IMPROVEMENT_SUGGESTIONS: Record<string, string[][]> = {
  'coating-inconsistency': [
    ['Add a specific crop type and the coating weight tolerance range used for it', 'Reference the in-process sampling interval you use per production run length', 'Name the equipment variable that most commonly drives coating weight drift in your system'],
    ['Add a before/after complaint rate comparison for a customer who moved to a controlled program', 'Specify the binder viscosity test method and acceptable range in your coating system', 'Reference the production volume where re-validation is triggered in your protocol'],
    ['Name the specific germination test result that doesn\'t predict coating variation — and the field-predictive metric that does', 'Add a stand data comparison between validated and unvalidated lots in the same field', 'Reference the calibration check interval for the highest-wear equipment in your coating process'],
  ],
  'germination-variability': [
    ['Specify the crop type where 8–15% yield drag from timing variation is most commonly observed in your markets', 'Add the treatment application rate tolerance you use for commercial lots and how it\'s measured', 'Reference the planting window soil conditions your coating is validated for'],
    ['Name the seed preparation variable with the highest variance in your current process', 'Add an emergence timing data comparison between validated and unvalidated lots', 'Specify the germination test condition that most differs from your target planting environment'],
    ['Name the environmental condition where your coating shows the strongest validated performance', 'Add the coating formulation change that closed the biggest germination performance gap in your program', 'Reference the cold or wet planting condition where unvalidated coatings most commonly underperform'],
  ],
  'seed-treatment-complexity': [
    ['Name a specific chemistry combination that requires sequencing validation in your highest-volume treatment stack', 'Add the efficacy testing protocol you use for a new active ingredient combination', 'Reference the carrier incompatibility that created the most significant performance issue in your program'],
    ['Specify the regulatory documentation element most commonly missing in the in-house operations your customers compete with', 'Add the re-entry interval documentation standard your operation follows by treatment type', 'Reference the compliance exposure cost comparison for one event vs. your current documentation investment'],
    ['Name the biological active ingredient most sensitive to sequencing errors in your treatment program', 'Add the compatibility test result that most changed your sequencing protocol', 'Reference the chemistry change trigger that requires full re-validation in your program'],
  ],
  'planting-performance-risk': [
    ['Specify the coating weight tolerance range for your highest-volume crop and the planter type it\'s validated for', 'Add the in-process sampling frequency and sample size for a standard commercial production run', 'Name the planter meter type where coating weight deviation has the highest singulation impact in your markets'],
    ['Reference a specific stand count comparison between validated and unvalidated coating lots in the same field', 'Add the planting environment coating validation test for the soil type your customers most commonly plant into', 'Specify the skip rate threshold that triggers a lot-level coating audit in your system'],
    ['Name the skip rate complaint pattern that most clearly signals coating weight variation vs. planter error', 'Add the planter simulation test protocol you use for high-value lot release decisions', 'Reference the coating weight sampling frequency that catches drift before end-of-lot release'],
  ],
  'seed-handling-issues': [
    ['Name the specific handling equipment type with the highest abrasion impact in your customers\' handling paths', 'Add the abrasion resistance test result range for your current handling-durable coating formulation', 'Reference the coating weight loss data from your handling path validation testing'],
    ['Specify the flowability test method and acceptable variation range for commercial lot release', 'Add the binder formulation variable most correlated with flowability consistency in your program', 'Reference a specific meter performance comparison for high-flowability vs. low-flowability lots'],
    ['Name the treatment type most at risk from handling dust generation in your coating program', 'Add the dust generation test protocol and acceptable threshold for your commercial lot release standard', 'Reference the binder selection change that most reduced dust generation in your current program'],
  ],
  'pelleting-precision': [
    ['Specify the pellet weight tolerance range for your highest-value specialty crop and seeder type', 'Add the sphericity measurement protocol and acceptable deviation range for commercial lot release', 'Reference a stand uniformity comparison between high-precision and standard precision lots'],
    ['Name the pellet integrity failure mode most common in your target planting environments', 'Add the environmental validation test conditions for your target planting window', 'Reference the moisture absorption threshold that predicts germination performance in wet conditions'],
    ['Specify the harvest timing consistency comparison between singulation-accurate and inaccurate stands in a named crop type', 'Add the pellet weight sampling frequency per lot and the QC hold trigger threshold', 'Reference the roundness specification for your highest-value specialty crop lots'],
  ],
  'poor-seed-prep-cost': [
    ['Name the specific record type that resolved your last significant field complaint most quickly', 'Add the traceability record retention policy and the complaint resolution timeline it enables', 'Reference the cost comparison for a specific lot rejection event with vs. without records'],
    ['Specify the coating record elements included in your lot-level documentation', 'Add the complaint resolution timeline comparison for traceable vs. untraceable lots in your market', 'Reference the customer conversation difference when coating records are available for review'],
    ['Name the hidden cost category with the highest impact on total poor-prep cost in your operation', 'Add the process validation investment cost relative to one lot rejection event cost in your program', 'Reference the supply chain cost element that doesn\'t appear on your processing cost sheet'],
  ],
  'crop-establishment': [
    ['Specify the soil type and moisture condition your coating is validated for establishment performance', 'Add the stand count comparison between validated and unvalidated coating lots in target conditions', 'Reference the coating formulation change that most improved establishment in a challenging planting environment'],
    ['Name the specialty crop with the highest replanting cost in your production area', 'Add the coating and pellet validation steps specific to that crop and planting environment', 'Reference the lot documentation elements that allow rapid diagnosis when establishment problems occur'],
    ['Specify the environmental condition where standard coating specifications most commonly underperform in your markets', 'Add the environmental validation test you run for non-standard planting conditions', 'Reference the coating spec change that closed the gap between lab performance and field performance for a specific crop'],
  ],
  'scaling-operations': [
    ['Specify the production volume trigger for re-validation in your current protocol', 'Add the equipment variables included in your calibration check at each re-validation event', 'Reference the batch variation data before and after implementing formal process documentation in your operation'],
    ['Name the campaign endpoint most prone to coating variation in your production process', 'Add the in-process QC checkpoint frequency for a production campaign at your current volume', 'Reference the specific process drift variable that concentrates complaints in the first 20% of your campaigns'],
    ['Specify the calibration drift variable with the highest production impact in your coating system', 'Add the re-validation protocol steps at volume-based triggers in your operation', 'Reference the production volume where calibration drift first became visible in your lot quality data'],
  ],
  'grower-trust': [
    ['Specify the traceability record that resolved a grower complaint most effectively in your market', 'Add the complaint resolution timeline comparison for traceable vs. untraceable programs in your customer base', 'Reference the grower conversation that changed when coating records were available'],
    ['Name the specific attribution default most costly to correct without traceable records in your market', 'Add the complaint management time comparison for your markets with and without documented programs', 'Reference the customer relationship outcome when complaint resolution included data-backed lot documentation'],
    ['Specify the complaint density metric that best predicts coating program quality in your markets', 'Add the process control changes that most reduced complaint density in a specific market', 'Reference the sales team time reallocation that happened when complaint rates dropped in a documented program'],
  ],
}

export function generateTwitter(inputs: TwitterInputs, seed = 0): TwitterOutput {
  const prob = inputs.problem
  const idx = seed % 3
  const ctaIdx = seed % CTAS.length

  const hasDataPoints = true
  const hasCTA = true
  const hasConsequence = true
  const wordCount = 150

  const qualityScore = scoreContent(inputs, hasDataPoints, hasCTA, hasConsequence, wordCount)

  const thread = THREADS[prob]?.[idx] ?? [
    `Thread: ${inputs.angle} — what seed companies need to know. (1/4)`,
    `The problem: ${PROBLEM_DATA[prob]?.stat1 ?? 'Seed preparation decisions determine field performance outcomes.'} (2/4)`,
    `The cost: ${PROBLEM_DATA[prob]?.cost1 ?? 'Field performance inconsistency traced to seed preparation.'} (3/4)`,
    `The fix: validated seed preparation programs address this at the processing stage.\n\nFollow ${COMPANY.name} for seed performance content. (4/4)`,
  ]

  const improvementSuggestions = IMPROVEMENT_SUGGESTIONS[prob]?.[idx] ?? [
    'Add a specific data point tied to your operation\'s coating volume or lot size',
    'Reference a named crop type and planting environment to increase specificity',
    'Include a process control step that your audience can evaluate against their current program',
  ]

  return {
    platform: 'twitter',
    mainPost: MAIN_POSTS[prob]?.[idx] ?? `Seed preparation decisions determine field performance outcomes.\n\n${PROBLEM_DATA[prob]?.stat1 ?? ''}\n\n${PROBLEM_DATA[prob]?.consequence ?? ''}`,
    thread,
    alternateHook: ALTERNATE_HOOKS[prob]?.[idx] ?? `Here\'s what the seed preparation decision means for field performance — and what changes when it\'s made correctly.`,
    cta: CTAS[ctaIdx],
    engagementQuestion: ENGAGEMENT_QUESTIONS[prob]?.[idx] ?? `What\'s the biggest seed preparation variable your operation is tracking right now?`,
    repurposingSuggestions: REPURPOSING.slice(0, 4),
    qualityScore,
    improvementSuggestions,
  }
}

const CTAS = [
  `Follow ${COMPANY.name} for more seed performance and ag operations insights.`,
  `Subscribe for weekly content on seed coating, treatment, and planting performance.`,
  `Visit ${COMPANY.website} to learn how Summit supports seed companies with advanced coating and treatment services.`,
  `Follow for more on seed preparation, coating quality, and grower performance outcomes.`,
  `Follow ${COMPANY.name} for operational insights on seed coating, pelleting, and treatment programs.`,
]
