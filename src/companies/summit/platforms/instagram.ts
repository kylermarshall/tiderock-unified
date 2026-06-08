import type { InstagramInputs, InstagramOutput } from '../types'
import { PROBLEM_DATA, COMPANY } from '../lib/companyProfile'
import { scoreContent } from '../lib/scoring'

const VISUAL_HOOKS: Record<string, string[]> = {
  'coating-inconsistency': [
    'Two seed lots. Same variety. One stand. One failure. The difference was coating.',
    'The coating looked fine in the bag. The field told a different story.',
    'Coating weight variation above 3% is invisible at the facility. It shows up at planting.',
  ],
  'germination-variability': [
    'Uneven emergence does not start in the field. It starts before the seed is planted.',
    '35% of germination inconsistency traces back to the coating line — not the genetics.',
    'The late-emerging plant never catches up. The coating decision was made months earlier.',
  ],
  'seed-treatment-complexity': [
    'Stacking 8 active ingredients without compatibility testing is not a treatment program.',
    'Your seed treatment is losing efficacy before the seed reaches the soil.',
    'Multi-chemistry treatment failure is a process problem. Not a chemistry problem.',
  ],
  'planting-performance-risk': [
    'The planter was set correctly. The coating wasn\'t validated. That\'s where the skip rates came from.',
    'Coating weight variation breaks meter performance before the planter turns a wheel.',
    'Skip rates trace back to the coating line. Not the planter.',
  ],
  'seed-handling-issues': [
    'Up to 18% of your seed coating is gone before the seed reaches the planter.',
    'Coating dust in the grain wagon is not a cosmetic issue. It\'s a performance issue.',
    'Seed flowability variation above 20% means your population targets are estimates.',
  ],
  'pelleting-precision': [
    'Pellet quality is planting performance. In precision crops, they\'re the same thing.',
    'Roundness deviation above 0.08. Singulation accuracy drops 18–35%. Stand suffers.',
    'The seeder plate was calibrated for a pellet your process didn\'t consistently deliver.',
  ],
  'poor-seed-prep-cost': [
    'The cost of a coating failure is paid in the field, at the claim, and in the relationship.',
    'One lot rejection. $15,000–$80,000. One process control step could have prevented it.',
    'Without coating records, field complaints default to seed company blame — 3x more often.',
  ],
  'crop-establishment': [
    'Stand failures are diagnosed at the field. They start at seed preparation.',
    'Below 85% stand in 14 days. Yield loss probability jumps 20–40%.',
    'The coating decision that causes establishment failure is usually the last one investigated.',
  ],
  'scaling-operations': [
    'Scaling coating volume without process documentation makes inconsistency worse — faster.',
    'Calibration drift at 100,000 units is predictable. Most operations don\'t catch it.',
    'Scale doesn\'t fix coating inconsistency. It amplifies it.',
  ],
  'grower-trust': [
    'One bad season of field performance. A 35–55% drop in repeat purchase intent.',
    'When coating records don\'t exist, growers assign blame to the seed company — 3x more often.',
    'Trust is lost at the coating line. It shows up in the field.',
  ],
}

const ON_SCREEN_TEXT: Record<string, string[]> = {
  'coating-inconsistency': [
    'COATING INCONSISTENCY\nThe problem that doesn\'t fail germination tests.\nIt fails field stands.',
    'YOUR COATING IS DRIFTING\n3–5% variation = uneven emergence\nUneven emergence = grower complaints',
    '10–20% LESS EFFECTIVE GERMINATION\nFrom coating process variability alone.\nBefore genetics are even a factor.',
  ],
  'germination-variability': [
    'UNEVEN EMERGENCE\nDoesn\'t start in the field.\nIt starts at the coating line.',
    '35% OF GERMINATION VARIABILITY\nTraces to seed preparation.\nNot seed genetics.',
    '8–15% YIELD DRAG\nFrom emergence timing variation above 3–5 days.\nA seed preparation variable.',
  ],
  'seed-treatment-complexity': [
    'TREATMENT STACKING FAILURE\n8+ actives without validation\n= 3x the formulation failure rate',
    'YOUR TREATMENT IS LOSING 20–40%\nBefore the seed reaches the soil.\nA process problem.',
    'SEED TREATMENT COMPLIANCE\n60% of in-house operations\nlack formal documentation.',
  ],
  'planting-performance-risk': [
    'SKIP RATES\nTrace back to the coating line.\nNot the planter meter.',
    'SINGULATION ACCURACY DROPS 15–30%\nWhen coating weight varies outside\nthe meter\'s calibration range.',
    'COATING WEIGHT VARIATION\nIsn\'t a planting problem.\nIt\'s a processing problem.',
  ],
  'seed-handling-issues': [
    'UP TO 18% COATING LOSS\nBefore the seed reaches the planter.\nFrom bulk handling alone.',
    'COATING DUST = COATING FAILURE\nA regulatory issue.\nAnd a performance issue.',
    'FLOWABILITY VARIATION > 20%\nMeter calibration drifts.\nPopulation targets miss.',
  ],
  'pelleting-precision': [
    'PELLET WEIGHT VARIATION > 5%\nPrimary driver of singulation failure.\nIn specialty and vegetable crops.',
    'ROUNDNESS DEVIATION 0.08\n18–35% singulation accuracy drop.\nStand uniformity suffers.',
    'PELLET INTEGRITY FAILURES\n12–25% of unvalidated lots.\nFail at target planting conditions.',
  ],
  'poor-seed-prep-cost': [
    '$15,000–$80,000\nPer lot rejection event.\nOne process control step prevents it.',
    '3–5X HIGHER RECOVERY COST\nWithout traceable coating records.\nFor every field complaint.',
    'THE COST DOESN\'T LAND AT THE LINE.\nIt lands in the field.\nAt the claim. In the relationship.',
  ],
  'crop-establishment': [
    'BELOW 85% STAND\n20–40% higher yield loss probability.\nIn the first 14 days.',
    '$800–$4,500/ACRE\nDirect replanting cost.\nPlus 2–3x in lost market window.',
    'ESTABLISHMENT FAILURE\nDiagnosed at the field.\nDecided at seed preparation.',
  ],
  'scaling-operations': [
    'BATCH VARIATION +25–50%\nWhen scaling without\nprocess documentation.',
    '3–5% CALIBRATION DRIFT\nPer 100,000-unit run.\nMost operations don\'t re-validate.',
    'SCALE AMPLIFIES INCONSISTENCY.\nMore volume.\nMore of the same variation — faster.',
  ],
  'grower-trust': [
    'ONE BAD SEASON\n35–55% drop in\nrepeat purchase intent.',
    'WITHOUT RECORDS\nGrowers blame the seed company.\n3x more often than any other factor.',
    'COMPLAINT MANAGEMENT TIME +40–60%\nIn markets with inconsistent coating programs.\nVs. documented programs.',
  ],
}

const CAROUSEL_SLIDES: Record<string, string[][]> = {
  'coating-inconsistency': [
    [
      'SLIDE 1 — Hook: "The coating looked fine at the bag. The field said otherwise."',
      'SLIDE 2 — The problem: Coating weight variation above 3–5% creates measurable differences in emergence timing, stand uniformity, and early seedling performance. None of it shows up in the germination test.',
      'SLIDE 3 — The data: Seed companies with inconsistent coating processes see grower complaint rates 2–4x higher. Complaints cluster around uneven emergence and field stand inconsistency.',
      'SLIDE 4 — The mechanism: Coating weight determines seed size and mass. When it varies, the seed\'s physical profile changes — affecting meter performance, soil contact, moisture uptake, and emergence timing.',
      'SLIDE 5 — The cost: 10–20% reduction in effective germination from coating process variability. Before genetics are even a factor.',
      'SLIDE 6 — The fix: Validated coating programs include in-process weight sampling, binder viscosity testing per batch, calibration checks at defined intervals, and formal tolerance limits.',
      'SLIDE 7 — CTA: Follow for more seed coating and planting performance content.',
    ],
    [
      'SLIDE 1 — Hook: "Coating inconsistency is the most common seed performance problem that isn\'t caught before shipping."',
      'SLIDE 2 — What it looks like in the field: Uneven stands. Delayed emergence in patches. Skip patterns that don\'t match planter data.',
      'SLIDE 3 — What causes it: Worn equipment. Binder viscosity drift. Uncalibrated application rates. Temperature variation in the coating drum.',
      'SLIDE 4 — Why it\'s missed: Standard germination tests don\'t catch coating weight variation. A lot can pass testing and still fail in the field.',
      'SLIDE 5 — The consequence: Coating inconsistency is invisible at the bag. It shows up after planting — in uneven stands, slow emergence, and grower calls.',
      'SLIDE 6 — What controlled programs do differently: Calibration checks per run. In-process sampling. Binder testing per batch. Formal tolerance limits.',
      'SLIDE 7 — CTA: Follow Summit Seed Coatings for seed performance and ag operations content.',
    ],
    [
      'SLIDE 1 — Hook: "Two seed lots. Same variety. Same germination test result. One performs. One doesn\'t."',
      'SLIDE 2 — The difference: Coating process control. One lot was produced under a validated program with in-process sampling. One wasn\'t.',
      'SLIDE 3 — The diagnostic gap: Standard germination tests run at optimal conditions. Coating weight variation that creates field problems often doesn\'t affect germination in controlled lab settings.',
      'SLIDE 4 — Field-predictive QC: Coating weight sampling across the lot. Uniformity measurement across the seed population. Validation against target planting conditions.',
      'SLIDE 5 — The cost of the gap: 10–20% lower effective germination from coating variability. 2–4x higher grower complaint rates without formal controls.',
      'SLIDE 6 — The coating process creates the seed\'s interface with the planting environment. When it\'s inconsistent, the agronomic potential of the genetics becomes harder to deliver.',
      'SLIDE 7 — CTA: Follow for more seed coating quality and operations content.',
    ],
  ],
  'germination-variability': [
    [
      'SLIDE 1 — Hook: "Uneven emergence doesn\'t start in the field."',
      'SLIDE 2 — It starts before the seed is planted. At the coating line.',
      'SLIDE 3 — The data: Up to 35% of field germination inconsistency in commercial lots traces to seed preparation variables — not seed genetics.',
      'SLIDE 4 — The variables: Coating thickness. Treatment application rate. Seed-to-seed treatment transfer. All controllable at the processing stage.',
      'SLIDE 5 — The cost: Emergence timing variation above 3–5 days creates yield drag of 8–15% in row crops. Late-emerging plants never catch up.',
      'SLIDE 6 — The fix: Validated seed preparation programs control treatment rate uniformity, coating film thickness, and seed moisture content — before the lot ships.',
      'SLIDE 7 — CTA: Follow for more seed performance and preparation operations content.',
    ],
    [
      'SLIDE 1 — Hook: "When germination is uneven, seed genetics get blamed first. That\'s right 65% of the time."',
      'SLIDE 2 — The other 35%: Seed preparation variables. Coating. Treatment rate. Handling. Processing decisions made before the seed left the facility.',
      'SLIDE 3 — Why preparation matters: Coating thickness variation changes moisture uptake timing. Treatment inconsistency changes pathogen protection. Seed-to-seed transfer creates emergence variability.',
      'SLIDE 4 — The yield consequence: 8–15% yield drag from emergence timing variation above 3–5 days. The competitive disadvantage is set at emergence, not at the grow-out stage.',
      'SLIDE 5 — Validated preparation: Controlled coating and treatment programs narrow the emergence window — and deliver more consistent stand data across the lot.',
      'SLIDE 6 — Germination variability is a diagnostic problem. The fix belongs at seed preparation. Not at the planting window.',
      'SLIDE 7 — CTA: Follow Summit Seed Coatings for seed preparation and germination performance content.',
    ],
    [
      'SLIDE 1 — Hook: "35% of your germination problem isn\'t a genetics problem."',
      'SLIDE 2 — It\'s a preparation problem. And it\'s fixable before the seed ships.',
      'SLIDE 3 — The mechanism: Coating thickness variation changes emergence timing. Non-uniform treatment application changes protection and stimulation. These variables don\'t show up in standard testing.',
      'SLIDE 4 — The environmental dimension: Cold, wet, and high-residue environments expose coating formulation gaps that standard germination tests don\'t catch. Unvalidated coatings underperform in non-ideal conditions.',
      'SLIDE 5 — The data: Lots with germination variability above 15% from environmental sensitivity often trace to coating decisions not validated for the target planting window.',
      'SLIDE 6 — Validated seed preparation accounts for target planting conditions — not just optimal germination test conditions. That gap is closable before the lot ships.',
      'SLIDE 7 — CTA: Follow for more seed coating and germination performance content.',
    ],
  ],
  'seed-treatment-complexity': [
    [
      'SLIDE 1 — Hook: "Stacking 8 active ingredients without compatibility testing is not a treatment program."',
      'SLIDE 2 — It\'s a liability. Operations with 8+ actives and no formal testing fail at 3x the rate of validated programs.',
      'SLIDE 3 — Why stacking fails: Chemical interaction between incompatible actives. Carrier incompatibility. Coating adhesion failure from improper sequencing.',
      'SLIDE 4 — The efficacy cost: 20–40% reduction in treatment efficacy from incompatible chemistry stacking without sequencing validation. Before the seed is planted.',
      'SLIDE 5 — The compliance gap: 60% of in-house treatment operations lack formal regulatory compliance documentation. Application rates. Re-entry intervals. Worker protection records.',
      'SLIDE 6 — Compatibility validation is a one-time investment per stack. Formulation failure cost compounds through every affected lot.',
      'SLIDE 7 — CTA: Follow for more seed treatment operations and validation content.',
    ],
    [
      'SLIDE 1 — Hook: "Your seed treatment is losing efficacy before the seed reaches the soil."',
      'SLIDE 2 — The cause: Chemistry stacking without compatibility testing. Process failures that are invisible at the bag.',
      'SLIDE 3 — Three failure modes: Chemical interaction between incompatible actives. Carrier displacement. Adhesion failure from incorrect sequencing.',
      'SLIDE 4 — The data: Operations with 8+ actives and no testing fail at 3x the rate. 20–40% efficacy loss from incompatible stacking.',
      'SLIDE 5 — The process distinction: The chemistry works when the process delivers it correctly. Stacking errors change what the seed receives — not what the label says.',
      'SLIDE 6 — Validated sequencing: Compatibility testing for every combination. Documented application order. Re-validation triggers for any component change.',
      'SLIDE 7 — CTA: Follow Summit Seed Coatings for seed treatment and processing operations content.',
    ],
    [
      'SLIDE 1 — Hook: "Seed treatment complexity is not a chemistry problem. It\'s a process control problem."',
      'SLIDE 2 — The cost of getting it wrong: Compounds through every bag of seed that leaves the facility.',
      'SLIDE 3 — What complexity creates: More interaction points between actives. More chances for carrier incompatibility. More sequencing decisions that can be made incorrectly.',
      'SLIDE 4 — The compliance dimension: 60% of in-house operations don\'t have formal regulatory documentation. That\'s not a paperwork gap. It\'s a liability.',
      'SLIDE 5 — The validation standard: Formal compatibility testing per treatment stack. Documented sequencing protocol. Re-validation triggers when any component changes.',
      'SLIDE 6 — Process controls are a one-time investment per program. The formulation failure cost is per lot — and it compounds.',
      'SLIDE 7 — CTA: Follow for more seed treatment operations and compliance content.',
    ],
  ],
  'planting-performance-risk': [
    [
      'SLIDE 1 — Hook: "Skip rates don\'t start at the planter. They start at the coating drum."',
      'SLIDE 2 — The mechanism: Planter meters are calibrated to a seed size and weight profile. Coating weight variation that shifts effective seed size outside that range produces skip rates.',
      'SLIDE 3 — The data: Singulation accuracy drops 15–30% when coating weight deviates from the meter\'s calibration range.',
      'SLIDE 4 — Why meter adjustment doesn\'t fix it: The meter is working against a moving target. Coating weight variation is unpredictable at the planter level.',
      'SLIDE 5 — The consequence: Growers who experience skip rates above 3% often trace the issue to coating weight variation — not planter settings.',
      'SLIDE 6 — The fix: Coating weight tolerance limits matched to meter specifications. In-process sampling before lot release. Planter simulation testing for high-value lots.',
      'SLIDE 7 — CTA: Follow for more seed performance and coating operations content.',
    ],
    [
      'SLIDE 1 — Hook: "The planter was set correctly. The coating wasn\'t validated. That\'s where the problem started."',
      'SLIDE 2 — Coating affects three things at planting: Singulation accuracy. Soil contact quality. Emergence timing consistency.',
      'SLIDE 3 — The singulation problem: Coating weight variation shifts effective seed size outside meter calibration range. Produces skip rates and doubles.',
      'SLIDE 4 — The soil contact problem: Coatings that crack, flake, or absorb moisture unevenly change seed placement and early moisture uptake.',
      'SLIDE 5 — The cost: 15–30% drop in singulation accuracy. Skip rates above 3% linked to coating weight variation. Stand counts below seeding rate targets.',
      'SLIDE 6 — Validated coating specs connect the coating decision to the planting equipment it has to work with.',
      'SLIDE 7 — CTA: Follow Summit Seed Coatings for planting performance and seed coating content.',
    ],
    [
      'SLIDE 1 — Hook: "Coating weight variation doesn\'t fail germination tests. It fails stand counts."',
      'SLIDE 2 — The gap: A seed lot can pass germination testing and still produce skip rates, uneven stands, and population inconsistency at planting.',
      'SLIDE 3 — Why: The germination test doesn\'t evaluate coating weight uniformity, seed size consistency from coating, or singulation performance against meter specifications.',
      'SLIDE 4 — What field-predictive QC adds: Coating weight sampling across the lot. Uniformity measurement. Planter simulation testing for high-value crops.',
      'SLIDE 5 — The consequence: Planting performance risk from poor coating doesn\'t show up in the test. It shows up at the planter — in skip patterns and stand counts.',
      'SLIDE 6 — Closing the gap requires validating the coating spec against planting equipment requirements — before the lot ships.',
      'SLIDE 7 — CTA: Follow for more seed coating, planting performance, and operations content.',
    ],
  ],
  'seed-handling-issues': [
    [
      'SLIDE 1 — Hook: "Up to 18% of your seed coating doesn\'t make it to the planter."',
      'SLIDE 2 — Where it goes: Gravity wagons. Air seeders. Pneumatic conveyors. Every transfer point strips coating material from the seed surface.',
      'SLIDE 3 — What that means: Treatment that was part of the seed\'s performance package is gone before planting. The field gets less than what was applied.',
      'SLIDE 4 — The flowability consequence: Coating weight loss and surface degradation change seed flowability. Flowability variation above 20% causes meter drift and population inconsistency.',
      'SLIDE 5 — The regulatory dimension: Coating dust during handling creates worker protection compliance exposure — on top of the performance problem.',
      'SLIDE 6 — The fix: Handling-durable coating formulation. Abrasion resistance testing before lot release. Formulation matched to the handling path the seed will follow.',
      'SLIDE 7 — CTA: Follow for more seed handling and coating operations content.',
    ],
    [
      'SLIDE 1 — Hook: "Your seed left the facility with its full treatment load. It doesn\'t always arrive at the planter that way."',
      'SLIDE 2 — The handling path: Seed travels through multiple transfer points between the facility and the planter. Each one creates abrasion, dust, and coating material loss.',
      'SLIDE 3 — The data: Seed abrasion during bulk handling strips coating at 8–18% by weight when coatings aren\'t formulated for handling durability.',
      'SLIDE 4 — Coating dust as a diagnostic: Dust during handling is not cosmetic. It\'s evidence that the coating is actively degrading — and that treatment is being lost.',
      'SLIDE 5 — The flowability impact: Surface degradation from abrasion changes seed flow characteristics. Flowability variation above 20% produces population inconsistency at every planting pass.',
      'SLIDE 6 — Coating formulation for the handling path means testing against the equipment the seed will actually travel through — before the lot ships.',
      'SLIDE 7 — CTA: Follow Summit Seed Coatings for seed handling, coating, and performance content.',
    ],
    [
      'SLIDE 1 — Hook: "Seed flowability variation above 20% means your planting population targets are estimates — not outcomes."',
      'SLIDE 2 — What flowability variation produces: Meter calibration drift between passes. Population inconsistency across the field. Stand counts that don\'t match seeding rate data.',
      'SLIDE 3 — What causes it: Coating weight inconsistency that creates size variation. Binder tackiness causing clumping. Surface texture variation changing flow rate.',
      'SLIDE 4 — The coating connection: All three causes trace to coating formulation decisions made at the processing stage — not to planter settings.',
      'SLIDE 5 — The fix: Binder formulation for consistent surface texture. Flowability QC before lot release. Coating weight tolerance limits that prevent size variation affecting flow.',
      'SLIDE 6 — Flowability problems are created at the coating line and discovered at the planter. The fix belongs at the source.',
      'SLIDE 7 — CTA: Follow for more seed coating quality and planting performance content.',
    ],
  ],
  'pelleting-precision': [
    [
      'SLIDE 1 — Hook: "Pellet quality is planting performance. In precision-seeded crops, they\'re the same thing."',
      'SLIDE 2 — The singulation chain: Pellet weight variation above 5% → singulation failure at the vacuum seeder → skip rates and doubles → uneven stand → harvest timing inconsistency.',
      'SLIDE 3 — The data: Roundness deviation above 0.08 reduces vacuum seeder singulation accuracy by 18–35%.',
      'SLIDE 4 — The integrity dimension: 12–25% of pelleted lots that skip environmental validation fail at target planting conditions. Cracking. Shattering. Premature moisture absorption.',
      'SLIDE 5 — What precision pelleting controls: Weight uniformity tolerance. Sphericity index limits. Environmental performance validation for target planting conditions.',
      'SLIDE 6 — In precision-seeded crops, the stand is right at establishment or expensive to remediate. Pellet quality determines which.',
      'SLIDE 7 — CTA: Follow for more precision pelleting and specialty crop seeding content.',
    ],
    [
      'SLIDE 1 — Hook: "The seeder plate was calibrated for a pellet your process didn\'t consistently deliver."',
      'SLIDE 2 — Why it matters: Vacuum seeders hold pellets by size and weight. Pellets outside calibration range produce skip rates and doubles — regardless of seeder adjustment.',
      'SLIDE 3 — The performance chain: Pellet roundness → singulation → population → emergence → harvest timing. Each step is predictable. Most are controllable at the pelleting stage.',
      'SLIDE 4 — The high-value crop stakes: In vegetable and specialty crops, stand failures requiring replanting cost $800–$4,500/acre in direct cost — plus lost market window value.',
      'SLIDE 5 — What precision pelleting QC includes: Weight uniformity monitoring. Sphericity index measurement. Environmental validation testing before lot release.',
      'SLIDE 6 — Pellet quality is not established at the drum. It\'s confirmed against the conditions the pellet will face at planting.',
      'SLIDE 7 — CTA: Follow Summit Seed Coatings for pelleting quality and precision seeding content.',
    ],
    [
      'SLIDE 1 — Hook: "Small pellet variation. Large stand consequence."',
      'SLIDE 2 — 5% weight variation: The threshold above which singulation failure becomes measurable in precision-seeded specialty crops.',
      'SLIDE 3 — 0.08 roundness deviation: The threshold above which vacuum seeder accuracy drops 18–35%.',
      'SLIDE 4 — 12–25% of pelleted lots: The share that fail at target planting conditions when environmental validation is skipped.',
      'SLIDE 5 — $800–$4,500/acre: The direct replanting cost in specialty crops when stand failures occur. Plus 2–3x in lost market window value.',
      'SLIDE 6 — Precision pelleting connects pellet specification to field performance — before the lot ships. That connection is what stand consistency depends on.',
      'SLIDE 7 — CTA: Follow for more pelleting precision and specialty crop performance content.',
    ],
  ],
  'poor-seed-prep-cost': [
    [
      'SLIDE 1 — Hook: "The cost of poor seed preparation is never paid at the processing line."',
      'SLIDE 2 — It\'s paid in the field. At the claim. In the customer relationship — after the decision is three months old.',
      'SLIDE 3 — The warranty cost: Seed companies without traceable coating records spend 3–5x more on warranty replacement, customer service, and reputational recovery.',
      'SLIDE 4 — The lot rejection cost: $15,000–$80,000 per event. From coating failure, treatment error, or pellet quality rejection.',
      'SLIDE 5 — The hidden cost chain: Returns. Replant risk. Higher insurance claims. Lost repeat business. None of it on the processing cost sheet.',
      'SLIDE 6 — Traceable coating records change the complaint timeline and the recovery cost. Diagnosis in days, not weeks. Specific corrective action, not speculation.',
      'SLIDE 7 — CTA: Follow for more seed preparation quality and traceability content.',
    ],
    [
      'SLIDE 1 — Hook: "Without coating records, field complaints default to seed company blame — 3x more often."',
      'SLIDE 2 — Why: When growers can\'t trace a problem, they attribute it to the most visible responsible party. Without records, that\'s the seed company.',
      'SLIDE 3 — The cost of blame without data: 3–5x higher recovery cost. Longer complaint timelines. Lost customer relationships that cost 5–10x the original complaint to recover.',
      'SLIDE 4 — What records change: Rapid root cause identification. Specific corrective action per lot. Data-backed resolution that preserves the customer relationship.',
      'SLIDE 5 — The traceability investment: Lot-level coating weight records. Treatment application rate documentation. Binder batch records. QC sign-off logs.',
      'SLIDE 6 — Traceability is not a quality cost. It\'s a complaint management investment with a measurable return.',
      'SLIDE 7 — CTA: Follow Summit Seed Coatings for seed preparation quality and traceability content.',
    ],
    [
      'SLIDE 1 — Hook: "One process control step. One prevented lot rejection. $15,000–$80,000 saved."',
      'SLIDE 2 — The math: A single lot rejection event averages $15,000–$80,000 depending on lot size, crop value, and treatment cost.',
      'SLIDE 3 — What causes lot rejections: Coating weight variation outside spec. Treatment application rate error. Pellet quality below singulation specification.',
      'SLIDE 4 — What prevents them: Documented process controls with tolerance limits. In-process sampling with QC hold triggers. Binder and equipment validation per production campaign.',
      'SLIDE 5 — The prevention math: A coating process validation program costs a fraction of one rejection event. A traceability system costs less than one major complaint recovery.',
      'SLIDE 6 — Poor seed preparation cost is a choice — not a given. The alternative is a controlled process with records that can be used to manage it.',
      'SLIDE 7 — CTA: Follow for more seed preparation quality and cost management content.',
    ],
  ],
  'crop-establishment': [
    [
      'SLIDE 1 — Hook: "Stand failures are diagnosed at the field. They start at seed preparation."',
      'SLIDE 2 — The threshold: Stands below 85% of target population in the first 14 days increase yield loss probability by 20–40%.',
      'SLIDE 3 — The preparation connection: Coating specification. Treatment rate. Pelleting validation. These decisions determine whether the 85% threshold is met.',
      'SLIDE 4 — The specialty crop stakes: In vegetable and specialty crops, stand failures requiring replanting cost $800–$4,500/acre. Plus lost market window value.',
      'SLIDE 5 — The diagnostic gap: Coating and treatment variables are usually the last things investigated in an establishment failure. They should be among the first.',
      'SLIDE 6 — Environment-matched coating specs: Validated for target soil type, moisture, and temperature — not just standard germination conditions.',
      'SLIDE 7 — CTA: Follow for more crop establishment and seed preparation content.',
    ],
    [
      'SLIDE 1 — Hook: "The coating decision affects whether the stand hits 85% — or whether you\'re replanting."',
      'SLIDE 2 — The mechanism: Coating decisions that don\'t account for target planting conditions create establishment risk that\'s rarely diagnosed correctly at the field level.',
      'SLIDE 3 — What coating affects at establishment: Moisture uptake rate at imbibition. Pathogen protection in target soil. Physical seed placement quality.',
      'SLIDE 4 — The cost of getting it wrong: $800–$4,500/acre in specialty crops. 20–40% higher yield loss probability in commodity crops. Market window consequences in time-sensitive crops.',
      'SLIDE 5 — Environment-matched preparation: Coating and pelleting specs validated for the target planting window — soil type, moisture, temperature, and residue cover.',
      'SLIDE 6 — Crop establishment problems are diagnosed at the field. The decisions that cause them are made at seed preparation.',
      'SLIDE 7 — CTA: Follow Summit Seed Coatings for crop establishment and seed coating content.',
    ],
    [
      'SLIDE 1 — Hook: "Coating inconsistency that doesn\'t fail a germination test can still fail crop establishment."',
      'SLIDE 2 — The gap: Standard germination tests run at optimal conditions. Field planting environments are not optimal conditions.',
      'SLIDE 3 — What the field adds: Cold soil. Variable moisture. Residue cover. Pathogen pressure. Each variable exposes coating formulation gaps that the germination test missed.',
      'SLIDE 4 — The consequence: Stands below 85% in 14 days. Yield drag of 20–40%. In specialty crops, replanting cost and market window loss.',
      'SLIDE 5 — Environmental validation: Testing coating and pelleting performance against target planting conditions before lot release. Closing the gap between the germination test and the field.',
      'SLIDE 6 — Establishment failures are preventable — when the preparation decision accounts for the environment the seed will actually face.',
      'SLIDE 7 — CTA: Follow for more seed preparation, establishment, and coating operations content.',
    ],
  ],
  'scaling-operations': [
    [
      'SLIDE 1 — Hook: "Scaling your coating volume without scaling your process controls doesn\'t produce more consistent seed."',
      'SLIDE 2 — It produces more inconsistent seed — faster.',
      'SLIDE 3 — The data: Operations scaling from 50,000 to 500,000 units without documentation see batch variation increase 25–50% as volume grows.',
      'SLIDE 4 — Why scale amplifies inconsistency: More production runs. More chances for equipment drift. More variables accumulating without formal management.',
      'SLIDE 5 — Equipment calibration drift: 3–5% per 100,000-unit run. Requires formal re-validation. Most scaling operations don\'t have the protocol.',
      'SLIDE 6 — Process documentation for scale: Application rate specs per crop. Volume-triggered calibration schedules. In-process sampling with hold triggers.',
      'SLIDE 7 — CTA: Follow for more coating operations and scaling process control content.',
    ],
    [
      'SLIDE 1 — Hook: "Complaints from scaling operations concentrate in the first and last 20% of each campaign."',
      'SLIDE 2 — That\'s a process control signal. Not a capacity problem.',
      'SLIDE 3 — Why the first 20% fails: Equipment not validated at production conditions. Binder viscosity not stabilized. Operator calibration against the previous campaign state.',
      'SLIDE 4 — Why the last 20% fails: Accumulated equipment wear. Binder inventory from a different batch. Temperature variation in longer runs.',
      'SLIDE 5 — The campaign control protocol: Pre-campaign validation. Mid-campaign checkpoints. End-of-campaign QC sampling before final lot release.',
      'SLIDE 6 — Scale doesn\'t cause inconsistency. Uncontrolled scale does. The process controls that prevent it are well-understood. They\'re just not common.',
      'SLIDE 7 — CTA: Follow Summit Seed Coatings for coating operations and production process control content.',
    ],
    [
      'SLIDE 1 — Hook: "Calibration drift of 3–5% per 100,000 units is predictable. Most operations don\'t manage it."',
      'SLIDE 2 — The drift variables: Spray nozzle wear. Drum liner wear. Binder delivery system calibration with temperature changes.',
      'SLIDE 3 — Why it matters: Lots produced at the endpoints of an unvalidated campaign carry more coating variation than lots from the validated center of the run.',
      'SLIDE 4 — Where it shows up: In field performance. Before QC data flags it. After the lot ships.',
      'SLIDE 5 — Volume-triggered re-validation: Equipment inspection at defined production checkpoints. Binder viscosity check per event. In-process sampling after re-validation.',
      'SLIDE 6 — Calibration drift is a predictable process variable. It can be managed — if the protocol exists to manage it.',
      'SLIDE 7 — CTA: Follow for more coating equipment management and scaling operations content.',
    ],
  ],
  'grower-trust': [
    [
      'SLIDE 1 — Hook: "One bad season of field performance. A 35–55% drop in repeat purchase intent."',
      'SLIDE 2 — The recovery cost: 5–10x the original complaint. In customer service, warranty replacement, and competitive trials.',
      'SLIDE 3 — The traceability connection: Without coating records, growers attribute field performance problems to the seed company — 3x more often than any other factor.',
      'SLIDE 4 — With records: Rapid root cause identification. Specific corrective action. Data-backed resolution that preserves the relationship.',
      'SLIDE 5 — The sales team cost: Teams in markets with high complaint rates spend 40–60% more time on complaint management. That shows up in headcount.',
      'SLIDE 6 — Trust is not lost in the field. It\'s lost at the coating line — when inconsistency creates a problem that can\'t be explained, owned, or fixed.',
      'SLIDE 7 — CTA: Follow for more grower trust, traceability, and seed operations content.',
    ],
    [
      'SLIDE 1 — Hook: "When coating records don\'t exist, growers assign blame to the seed company — 3x more often than any other factor."',
      'SLIDE 2 — The attribution logic: Without specific data, growers attribute failure to the most visible responsible party. Traceable records change that default.',
      'SLIDE 3 — The complaint timeline difference: With records — diagnosis in days. Without records — investigation in weeks, often inconclusive.',
      'SLIDE 4 — The relationship consequence: A single season of inconsistency reduces repeat purchase intent 35–55%. Recovery costs 5–10x the original complaint.',
      'SLIDE 5 — What traceability delivers in a complaint: Specific lot identification. Corrective action per lot. Communication to the grower backed by data.',
      'SLIDE 6 — Traceability is not a compliance cost. It\'s the fastest complaint resolution tool a seed company has.',
      'SLIDE 7 — CTA: Follow Summit Seed Coatings for grower trust and seed operations content.',
    ],
    [
      'SLIDE 1 — Hook: "Complaint management time is the operational cost of coating program inconsistency."',
      'SLIDE 2 — The differential: Sales teams in markets with high complaint rates spend 40–60% more time on complaint management than teams in markets with documented programs.',
      'SLIDE 3 — That time cost shows up in headcount before it shows up in accounting.',
      'SLIDE 4 — What drives complaint density: Coating weight variation. Treatment application inconsistency. Lack of traceable records for rapid resolution.',
      'SLIDE 5 — What reduces it: Process controls with documented tolerance limits. Lot-level traceability. QC checkpoints before lot release.',
      'SLIDE 6 — Complaint density is a lagging indicator. Coating program quality is the leading one.',
      'SLIDE 7 — CTA: Follow for more coating quality and grower relationship content.',
    ],
  ],
}

const CAPTIONS: Record<string, string[]> = {
  'coating-inconsistency': [
    `The most expensive coating problem isn't visible at the bag.\n\nCoating weight variation above 3–5% creates measurable differences in germination timing, emergence uniformity, and early stand performance. None of it shows up in the germination test.\n\nIt shows up in the field — in uneven stands, grower complaints, and performance inconsistency that's hard to trace back to the source.\n\nSeed companies with validated coating programs see grower complaint rates 2–4x lower than those without formal process controls.\n\nThe difference isn't the product. It's the process.\n\nFollow for more seed coating and planting performance content.`,
    `Two seed lots. Same variety. Same germination test result. One performs. One doesn't.\n\nThe difference is usually coating process control.\n\nCoating weight variation — from worn equipment, binder viscosity drift, or uncalibrated application rates — creates performance differences that don't appear in standard QC. They appear after planting.\n\nControlled programs include in-process weight sampling, binder testing per batch, and formal tolerance limits with stop/re-validate protocols.\n\nThe investment is at the processing line. The return is in the field — and in the customer relationship.\n\nFollow Summit Seed Coatings for seed performance and ag operations content.`,
    `Coating inconsistency is the seed performance problem most often misattributed to genetics, weather, or grower error.\n\nThe mechanism is straightforward: coating weight determines seed size and mass. When it varies above 3–5%, the seed's physical profile changes — affecting meter performance, soil contact, moisture uptake, and emergence timing.\n\nThe germination test doesn't catch it. The field does.\n\nField-predictive QC includes coating weight sampling across the lot, uniformity measurement, and validation against target planting conditions — not just lab conditions.\n\nFollow for more seed coating quality and operations content.`,
  ],
  'germination-variability': [
    `Up to 35% of field germination inconsistency traces back to seed preparation — not seed genetics.\n\nCoating thickness. Treatment application rate. Seed-to-seed treatment transfer. These variables are controllable at the processing stage. And they directly affect emergence timing and stand uniformity.\n\nEmergence timing variation above 3–5 days within a lot creates yield drag of 8–15% in row crops. The late-emerging plants never recover their competitive position.\n\nValidated seed preparation programs narrow the emergence window. Tighter emergence windows protect yield.\n\nFollow for more seed performance and preparation operations content.`,
    `When germination is uneven, genetics get blamed first.\n\nThat's the right instinct — but the wrong target 35% of the time.\n\nCoating thickness variation, non-uniform treatment application, and seed-to-seed treatment transfer all affect emergence timing. These aren't genetic variables. They're preparation variables.\n\nAnd they're fixable before the seed ships.\n\nFollow Summit Seed Coatings for seed preparation and germination performance content.`,
    `Cold and wet germination failures often trace to coating decisions that weren't validated for those conditions.\n\nStandard germination tests run at optimal conditions. The field doesn't. Coatings that perform well in a germination test can underperform significantly in cold, wet, or high-residue environments.\n\nEnvironmental validation for coating includes testing against the target planting window — soil temperature, moisture conditions, and residue cover — before the lot ships.\n\nThe right coating for a germination test is not necessarily the right coating for your target planting window.\n\nFollow for more seed coating and environmental performance content.`,
  ],
  'seed-treatment-complexity': [
    `Multi-chemistry seed treatment programs fail at 3x the rate when compatibility isn't formally validated.\n\nStacking fungicides, insecticides, biostimulants, and inoculants without sequencing validation reduces efficacy by 20–40% — before the seed is planted.\n\nThe cause: chemical interaction between incompatible actives, carrier incompatibility, and adhesion failure from improper sequencing. None of these failures are visible at the bag.\n\nCompatibility validation is a one-time investment per treatment stack. Formulation failure costs compound through every affected lot.\n\nFollow for more seed treatment operations and validation content.`,
    `60% of in-house seed treatment operations lack formal documentation for regulatory compliance.\n\nApplication rate accuracy per lot. Re-entry interval documentation. Worker protection records.\n\nThese aren't optional. They're required — and 60% of operations don't have them formally documented.\n\nThat's not a paperwork gap. It's a liability.\n\nThe documentation investment is a fraction of one compliance event cost.\n\nFollow Summit Seed Coatings for seed treatment operations and compliance content.`,
    `Seed treatment complexity is not a chemistry problem.\n\nIt's a process control problem.\n\nThe chemistry performs as labeled — when the process delivers it correctly. Application sequencing errors, carrier incompatibility, and adhesion failure change what the seed receives.\n\nNot what the label says.\n\nValidated sequencing. Documented programs. Re-validation triggers for component changes.\n\nProcess controls are a one-time investment per program. Formulation failure costs compound per lot.\n\nFollow for more seed treatment and processing operations content.`,
  ],
  'planting-performance-risk': [
    `Skip rates at planting trace back to the coating line — not the planter meter.\n\nPlanter meters are calibrated to a seed size and weight profile. Coating weight variation that shifts effective seed size outside that range produces skip rates and doubles — regardless of meter adjustment.\n\nSeed singulation accuracy drops 15–30% when coating weight deviates from the meter's calibration range.\n\nThe fix isn't at the planter. It's at the coating line — where the specification is set and where the tolerance is controlled.\n\nFollow for more seed performance and coating operations content.`,
    `The coating decision affects every physical interaction the seed has from the bag to the soil.\n\nCoating smoothness affects soil contact quality. Film integrity affects moisture uptake at imbibition. Coating weight determines whether the meter singulates the seed correctly.\n\nCoatings that crack, flake, or absorb moisture unevenly at planting change depth consistency, soil contact, and emergence timing — before germination begins.\n\nThese aren't cosmetic coating properties. They're planting performance variables.\n\nFollow Summit Seed Coatings for seed performance and coating quality content.`,
    `Growers who experience skip rates above 3% often trace the issue to coating weight variation — not planter settings.\n\nThe diagnostic chain is predictable: skip rate complaint → meter inspection → no meter fault → seed lot audit → coating weight variation outside tolerance.\n\nPreventable. With coating weight validation before the lot ships.\n\nTolerance limits matched to planter meter specifications. In-process sampling to catch drift. Planter simulation testing for high-value lots.\n\nFollow for more seed coating, treatment, and planting performance content.`,
  ],
  'seed-handling-issues': [
    `Up to 18% of your seed coating doesn't make it to the planter.\n\nGravity wagons, air seeders, and pneumatic conveyors subject coated seed to repeated impact and friction. Coatings not formulated for handling durability shed material at rates of 8–18% by weight.\n\nThat's treatment that never reaches the planting environment. And it's not showing up in your germination test.\n\nHandling-durable coating formulation — binder selection for abrasion resistance, film thickness calibrated for the handling path — is the formulation decision that changes this.\n\nFollow for more seed handling and coating operations content.`,
    `Coating dust during handling is not a cosmetic issue.\n\nIt's evidence that your coating is actively degrading before the seed reaches the planter. And it's a regulatory compliance issue under worker protection standards.\n\nCoating dust signals adhesion failure, active degradation, and treatment loss — all of which reduce field performance.\n\nHandling-durable binder systems that maintain adhesion through pneumatic handling reduce dust generation and treatment loss. Two problems. One formulation decision.\n\nFollow Summit Seed Coatings for seed handling, coating, and compliance content.`,
    `Seed flowability variation above 20% means your planting population targets are estimates — not outcomes.\n\nCoating weight inconsistency creates size variation. Binder tackiness causes clumping. Surface texture variation changes flow rate.\n\nAll three cause meter calibration drift — and all three trace to coating formulation decisions made at the processing stage.\n\nFlowability QC before lot release. Binder formulation for consistent surface texture. Coating weight tolerance limits that prevent size variation affecting flow.\n\nThe fix starts at the coating line. Not at the planter.\n\nFollow for more seed coating quality and planting performance content.`,
  ],
  'pelleting-precision': [
    `Pellet quality is planting performance. In precision-seeded crops, they're the same thing.\n\nPellet weight variation above 5% is the primary driver of singulation failure in vacuum seeders. Roundness deviation above 0.08 reduces singulation accuracy by 18–35%.\n\nIn vegetable, flower, and specialty crop production, these numbers determine stand uniformity and harvest timing consistency — two of the most valuable outcomes in high-value production.\n\nPrecision pelleting QC: weight uniformity monitoring, sphericity measurement, environmental validation before lot release.\n\nFollow for more precision pelleting and specialty crop seeding content.`,
    `The seeder plate was calibrated for a pellet specification your process may not consistently deliver.\n\nPellet integrity failures — cracking, shattering, excessive moisture absorption — occur in 12–25% of pelleted lots that weren't validated against target planting conditions.\n\nThe planting environment isn't the problem. The validation gap is.\n\nEnvironmental validation for pelleted lots: temperature and moisture stress testing, vacuum seeder singulation simulation, drop and impact integrity testing for bulk handling conditions.\n\nFollow Summit Seed Coatings for pelleting quality and precision seeding operations content.`,
    `Small pellet variation. Large stand consequence.\n\nWeight variation above 5%. Roundness deviation above 0.08. Integrity failure under target planting conditions.\n\nIn precision-seeded specialty crops, each of these pellet quality variables produces measurable stand inconsistency — and harvest timing consequences that compound the direct production cost.\n\nPellet quality is not established at the drum. It's confirmed against the conditions the pellet will face at planting.\n\nFollow for more pelleting precision and specialty crop performance content.`,
  ],
  'poor-seed-prep-cost': [
    `The cost of poor seed preparation is never paid at the processing line.\n\nIt's paid in the field, at the claim, and in the customer relationship — after the decision is three months old.\n\nSeed companies without traceable coating records spend 3–5x more on warranty replacement, customer service, and reputational recovery. A single lot rejection from coating failure, treatment error, or pellet quality rejection averages $15,000–$80,000.\n\nTraceable coating records reduce the complaint resolution timeline, lower recovery cost, and preserve the customer relationship.\n\nFollow for more seed preparation quality and traceability content.`,
    `Without traceable coating records, field complaints default to seed company blame — 3x more often.\n\nWhen growers can't identify a cause, the most visible responsible party gets assigned the blame. Without records, that's the seed company.\n\nWith lot-level coating weight documentation, treatment records, and QC sign-off logs, the complaint can be resolved in days — with data, not speculation.\n\nTraceability is not a quality cost. It's a complaint management investment with a measurable return.\n\nFollow Summit Seed Coatings for seed preparation quality and traceability content.`,
    `One process control step. One prevented lot rejection. $15,000–$80,000 saved.\n\nCoating weight variation outside spec. Treatment application rate error. Pellet quality below singulation specification. These are the causes of the most common lot rejection events — and all are preventable with documented process controls.\n\nThe prevention investment costs a fraction of one rejection event. The traceability investment costs less than one major complaint recovery.\n\nPoor seed preparation cost is a choice — not a given.\n\nFollow for more seed preparation quality and cost management content.`,
  ],
  'crop-establishment': [
    `Crop establishment failures are diagnosed at the field. The decisions that cause them are made at seed preparation.\n\nStands below 85% of target population in the first 14 days increase yield loss probability by 20–40%. The coating and pelleting decision — coating weight, treatment rate, environmental validation — contributes to whether that threshold is met.\n\nCoating specifications validated for the target planting environment reduce preventable establishment risk that is rarely diagnosed correctly at the field level.\n\nFollow for more crop establishment and seed preparation content.`,
    `In high-value vegetable and specialty crops, stand failures requiring replanting cost $800–$4,500/acre in direct cost — plus lost market window value that can exceed the direct cost by 2–3x.\n\nThe preparation decisions that drive this risk: coating spec not validated for target soil conditions, pelleting not validated for target planting environment, lot documentation that doesn't allow rapid diagnosis.\n\nEstablishment failure is expensive to remediate. It's inexpensive to prevent — if the seed preparation decision accounts for the planting environment.\n\nFollow Summit Seed Coatings for specialty crop seeding and seed preparation content.`,
    `The coating decision that causes establishment failure is usually the last thing investigated.\n\nStand failure investigation typically goes: soil temperature → equipment → variety → (eventually) seed preparation.\n\nCoating is usually last. It should often be first.\n\nCoating and treatment variables affect moisture uptake at imbibition, pathogen protection in target soil, and physical seed placement quality. All affect whether the 85% stand threshold is met.\n\nEnvironmental validation for coating closes the gap between the germination test and the field.\n\nFollow for more seed preparation, establishment, and coating operations content.`,
  ],
  'scaling-operations': [
    `Scaling coating volume without process documentation doesn't produce more consistent seed. It produces more inconsistent seed — faster.\n\nOperations scaling from 50,000 to 500,000 units without formal process documentation see batch variation increase 25–50% as volume grows. Equipment calibration drift of 3–5% per 100,000-unit run requires re-validation protocols that most scaling operations don't have.\n\nProcess documentation for scale: application rate specs per crop, volume-triggered calibration schedules, in-process sampling with hold triggers.\n\nScale doesn't solve coating inconsistency. Process controls do.\n\nFollow for more coating operations and scaling process control content.`,
    `Complaints from scaling coating operations concentrate in the first and last 20% of each production campaign.\n\nThat's a process control signal. Not a capacity problem.\n\nThe first 20% fails from unvalidated equipment at production conditions. The last 20% fails from accumulated wear, binder batch changes, and temperature variation in long runs.\n\nCampaign control protocols: pre-campaign validation, mid-campaign checkpoints, end-of-campaign QC sampling before final release.\n\nScale doesn't cause inconsistency. Uncontrolled scale does.\n\nFollow Summit Seed Coatings for coating operations and production process control content.`,
    `Calibration drift of 3–5% per 100,000 units is predictable. Most scaling operations don't manage it.\n\nSpray nozzle wear changes coverage pattern. Drum liner wear affects uniformity. Binder delivery system calibration drifts with temperature. Each variable drifts predictably — and compounds over a production campaign without re-validation.\n\nVolume-triggered re-validation: equipment inspection at defined checkpoints, binder viscosity check per event, in-process sampling after re-validation before resuming production.\n\nCalibration drift is manageable — if the protocol exists.\n\nFollow for more coating equipment management and scaling operations content.`,
  ],
  'grower-trust': [
    `A single season of field performance inconsistency reduces repeat purchase intent among commercial growers by 35–55%.\n\nThe relationship recovery cost is 5–10x the original complaint. The coating traceability that prevents it costs less than one recovery event.\n\nWith traceable records: rapid root cause identification, specific corrective action per lot, data-backed resolution that preserves the relationship.\n\nTrust is not lost in the field. It's lost at the coating line — when inconsistency creates a problem that can't be explained, owned, or fixed.\n\nFollow for more grower trust, traceability, and seed operations content.`,
    `When coating records don't exist, growers attribute field performance problems to the seed company — 3x more often than any other factor.\n\nWithout records, the investigation takes weeks, conclusions are speculative, and the default attribution is blame.\n\nWith lot-level coating weight documentation, treatment records, and QC logs: the complaint is resolved in days. The attribution is specific. The customer relationship survives.\n\nTraceability is the fastest complaint resolution tool a seed company has.\n\nFollow Summit Seed Coatings for grower trust and seed operations content.`,
    `Complaint management time is the operational cost of coating program inconsistency.\n\nSales teams in markets with high grower complaint rates spend 40–60% more time on complaint management than teams in markets with documented coating programs. That shows up in headcount before it shows up in accounting.\n\nWhat reduces complaint density: process controls with formal tolerance limits, lot-level traceability, and QC checkpoints before lot release.\n\nComplaint density is a lagging indicator. Coating program quality is the leading one.\n\nFollow for more coating quality and grower relationship content.`,
  ],
}

const SUGGESTED_VISUALS: Record<string, string[]> = {
  'coating-inconsistency': [
    'Side-by-side: coated seed in a bag vs. uneven field emergence row',
    'Close-up: seed coating surface under magnification showing weight variation',
    'Data overlay: coating weight sampling chart with tolerance limits shown',
    'Facility: in-process weight sampling station on a coating line',
    'Field: aerial shot of uneven emergence pattern with timestamps',
  ],
  'germination-variability': [
    'Time-lapse comparison: uniform vs. uneven emergence across two seed lots',
    'Close-up: seedling emergence timing comparison side by side',
    'Data graphic: yield drag curve from emergence timing variation',
    'Facility: treatment application rate documentation at a processing line',
    'Field: stand count photo with emergence timing annotations',
  ],
  'seed-treatment-complexity': [
    'Laboratory: compatibility testing setup for multi-chemistry stacks',
    'Close-up: seed surface showing treatment adhesion vs. coverage failure',
    'Data graphic: formulation failure rate — validated vs. unvalidated programs',
    'Facility: sequencing documentation board for multi-active treatment program',
    'Regulatory document: treatment compliance record format',
  ],
  'planting-performance-risk': [
    'Close-up: planter meter operating with coated seed — normal vs. variation',
    'Field: skip pattern aerial photo with skip rate annotation',
    'Data graphic: singulation accuracy drop from coating weight deviation',
    'Facility: coating weight sampling against planter meter tolerance limits',
    'Planter: meter calibration check with coated seed sample',
  ],
  'seed-handling-issues': [
    'Close-up: abrasion dust from coated seed in a gravity wagon transfer',
    'Time-lapse: seed moving through pneumatic conveyor showing coating loss',
    'Data graphic: coating material loss percentage by handling equipment type',
    'Facility: flowability test station for coated seed before lot release',
    'Field: population inconsistency pattern traced to flowability variation',
  ],
  'pelleting-precision': [
    'Close-up: high-precision pelleted seed under magnification — roundness comparison',
    'Laboratory: sphericity index measurement with caliper or optical equipment',
    'Field: precision singulation comparison — accurate vs. skip/double pattern',
    'Data graphic: singulation accuracy vs. pellet roundness deviation chart',
    'Facility: pellet weight uniformity sampling station',
  ],
  'poor-seed-prep-cost': [
    'Split graphic: processing line cost vs. field complaint recovery cost',
    'Data visual: $15,000–$80,000 lot rejection cost breakdown',
    'Document: lot-level coating record with complaint resolution timeline',
    'Facility: traceability record system for coating weight and treatment documentation',
    'Side-by-side: complaint resolution with records vs. without records — timeline comparison',
  ],
  'crop-establishment': [
    'Field: stand count comparison — 85%+ vs. below-threshold population',
    'Time-lapse: establishment comparison between validated and unvalidated coating lots',
    'Data graphic: yield loss probability at different stand thresholds',
    'Field: specialty crop replanting scenario with cost annotation',
    'Facility: environmental validation testing setup for coating specifications',
  ],
  'scaling-operations': [
    'Data graphic: batch variation increase vs. production volume without documentation',
    'Facility: calibration drift chart across a 100,000-unit production run',
    'Campaign timeline: complaint distribution by campaign position (first/last 20%)',
    'Equipment: spray nozzle wear comparison — start vs. end of production run',
    'Facility: volume-triggered re-validation checkpoint documentation',
  ],
  'grower-trust': [
    'Data graphic: repeat purchase intent — field inconsistency vs. no inconsistency',
    'Split screen: complaint resolution with records vs. without — timeline and outcome',
    'Field: grower-facing traceability documentation from seed company',
    'Data visual: complaint management time — high complaint market vs. documented program',
    'Facility: lot-level coating record with QC sign-off and field complaint linkage',
  ],
}

const REPURPOSING = [
  'Pull the visual hook as a LinkedIn opening line with supporting data in the body',
  'Adapt the carousel slides as a Twitter/X thread — one slide per tweet',
  'Use the on-screen text as a YouTube thumbnail and three-second hook combination',
  'Convert the caption into a Facebook educational post with the visual hook as the opening line',
  'Expand the carousel into a full LinkedIn post using each slide as a paragraph',
]

const IMPROVEMENT_SUGGESTIONS: Record<string, string[][]> = {
  'coating-inconsistency': [
    ['Name the specific equipment type where coating weight drift is most common in your process', 'Add the coating weight tolerance range for your highest-volume crop', 'Reference the in-process sampling interval that corresponds to your production run length'],
    ['Add a specific before/after comparison — complaint rate or field performance data', 'Name the binder viscosity variable and its acceptable range for your coating system', 'Reference the production volume where re-validation is triggered in your protocol'],
    ['Specify which germination test result doesn\'t predict coating variation — and what does', 'Add a specific field-predictive QC metric that your program produces', 'Reference a planting condition where coating weight variation has the highest field impact'],
  ],
  'germination-variability': [
    ['Specify the crop type where 8–15% yield drag is most commonly observed in your markets', 'Add the treatment application rate tolerance and how it\'s measured in your operation', 'Reference the planting window conditions your coating is validated for'],
    ['Name the seed preparation variable with the highest variance in your current process', 'Add an emergence timing comparison between validated and unvalidated lots', 'Specify the germination test condition that most differs from your target planting environment'],
    ['Name the environmental condition where your coating shows strongest validated performance', 'Add the coating formulation change that closed the biggest germination performance gap', 'Reference the cold or wet planting condition where unvalidated coatings most commonly underperform'],
  ],
  'seed-treatment-complexity': [
    ['Name a specific chemistry combination that requires sequencing validation in your program', 'Add the efficacy testing protocol for a new active ingredient combination', 'Reference the carrier incompatibility that created the most significant performance issue'],
    ['Specify the regulatory documentation element most commonly missing in your market', 'Add the re-entry interval documentation standard your operation follows', 'Reference the compliance exposure cost vs. your current documentation investment'],
    ['Name the biological active most sensitive to sequencing errors in your program', 'Add the compatibility test result that most changed your sequencing protocol', 'Reference the chemistry change trigger that requires full re-validation'],
  ],
  'planting-performance-risk': [
    ['Specify the coating weight tolerance range for your highest-volume crop and planter type', 'Add the in-process sampling frequency and sample size for a commercial production run', 'Name the planter meter type most sensitive to coating weight deviation in your markets'],
    ['Reference a stand count comparison between validated and unvalidated lots in the same field', 'Add the planting environment validation test for the soil type your customers most commonly plant into', 'Specify the skip rate threshold that triggers a lot-level coating audit'],
    ['Name the skip rate pattern that most clearly signals coating weight variation vs. planter error', 'Add the planter simulation test protocol for high-value lot release decisions', 'Reference the coating weight sampling frequency that catches drift before end-of-lot release'],
  ],
  'seed-handling-issues': [
    ['Name the specific handling equipment type with the highest abrasion impact in your customers\' paths', 'Add the abrasion resistance test result range for your current handling-durable formulation', 'Reference the coating weight loss data from your handling path validation testing'],
    ['Specify the flowability test method and acceptable variation range for commercial lot release', 'Add the binder formulation variable most correlated with flowability consistency', 'Reference a specific meter performance comparison for high vs. low flowability lots'],
    ['Name the treatment type most at risk from handling dust generation in your program', 'Add the dust generation test protocol and acceptable threshold for commercial release', 'Reference the binder change that most reduced dust generation in your current program'],
  ],
  'pelleting-precision': [
    ['Specify the pellet weight tolerance range for your highest-value specialty crop and seeder type', 'Add the sphericity measurement protocol and acceptable deviation range', 'Reference a stand uniformity comparison between high-precision and standard lots'],
    ['Name the pellet integrity failure mode most common in your target planting environments', 'Add the environmental validation conditions for your target planting window', 'Reference the moisture absorption threshold that predicts germination in wet conditions'],
    ['Specify the harvest timing consistency comparison between singulation-accurate and inaccurate stands', 'Add the pellet weight sampling protocol and QC hold trigger threshold', 'Reference the roundness specification for your highest-value specialty crop lots'],
  ],
  'poor-seed-prep-cost': [
    ['Name the specific record type that resolved your last significant field complaint most quickly', 'Add the traceability record retention policy and complaint resolution timeline', 'Reference the cost comparison for a lot rejection event with vs. without records'],
    ['Specify the coating record elements in your lot-level documentation', 'Add the complaint resolution timeline comparison for traceable vs. untraceable lots', 'Reference the customer conversation difference when records are available'],
    ['Name the hidden cost category with the highest impact on total poor-prep cost', 'Add the process validation investment cost relative to one lot rejection event', 'Reference the supply chain cost that doesn\'t appear on the processing cost sheet'],
  ],
  'crop-establishment': [
    ['Specify the soil type and moisture condition your coating is validated for establishment performance', 'Add the stand count comparison between validated and unvalidated lots in target conditions', 'Reference the coating change that most improved establishment in a challenging environment'],
    ['Name the specialty crop with the highest replanting cost in your production area', 'Add the validation steps specific to that crop and planting environment', 'Reference the lot documentation elements that allow rapid diagnosis when establishment problems occur'],
    ['Specify the environmental condition where standard coating specs most commonly underperform', 'Add the environmental validation test for non-standard planting conditions', 'Reference the coating spec change that closed the gap between lab and field performance'],
  ],
  'scaling-operations': [
    ['Specify the production volume trigger for re-validation in your current protocol', 'Add the equipment variables included in your calibration check at each event', 'Reference the batch variation data before and after implementing formal process documentation'],
    ['Name the campaign endpoint most prone to coating variation in your process', 'Add the in-process QC checkpoint frequency for your current production volume', 'Reference the specific drift variable that concentrates complaints in the first 20% of campaigns'],
    ['Specify the calibration drift variable with the highest production impact in your system', 'Add the re-validation protocol steps at volume-based triggers', 'Reference the production volume where calibration drift became visible in lot quality data'],
  ],
  'grower-trust': [
    ['Specify the traceability record that resolved a grower complaint most effectively in your market', 'Add the complaint resolution timeline comparison for traceable vs. untraceable programs', 'Reference the grower conversation that changed when coating records were available'],
    ['Name the attribution default most costly to correct without traceable records in your market', 'Add the complaint management time comparison for your markets with and without documented programs', 'Reference the customer relationship outcome when complaint resolution included data-backed documentation'],
    ['Specify the complaint density metric that best predicts coating program quality in your markets', 'Add the process control changes that most reduced complaint density in a specific market', 'Reference the sales team time reallocation when complaint rates dropped'],
  ],
}

const CTAS = [
  `Follow ${COMPANY.name} for more seed performance and ag operations insights.`,
  `Follow for more practical seed coating and crop establishment breakdowns.`,
  `Follow for more insights on seed treatment, coating consistency, and agricultural operations.`,
  `Follow for more operator-level ag supply chain insights.`,
  `Visit ${COMPANY.website} to learn how Summit supports seed companies with advanced coating and treatment services.`,
]

export function generateInstagram(inputs: InstagramInputs, seed = 0): InstagramOutput {
  const prob = inputs.problem
  const idx = seed % 3
  const ctaIdx = seed % CTAS.length

  const hasDataPoints = true
  const hasCTA = true
  const hasConsequence = true
  const wordCount = 120

  const qualityScore = scoreContent(inputs, hasDataPoints, hasCTA, hasConsequence, wordCount)

  const improvementSuggestions = IMPROVEMENT_SUGGESTIONS[prob]?.[idx] ?? [
    'Name a specific crop type or seed category to make the visual more concrete',
    'Add a specific data point that can anchor the on-screen text',
    'Reference a planting environment or handling scenario that your audience recognizes',
  ]

  return {
    platform: 'instagram',
    visualHook: VISUAL_HOOKS[prob]?.[idx] ?? `Seed preparation decisions determine field performance. Here\'s what that looks like.`,
    onScreenText: ON_SCREEN_TEXT[prob]?.[idx] ?? `SEED COATING MATTERS\nMore than most buyers think.\nHere\'s why.`,
    scriptOrSlides: CAROUSEL_SLIDES[prob]?.[idx] ?? [
      'SLIDE 1 — Hook: "The seed coating decision is made before planting. The consequence shows up after."',
      `SLIDE 2 — The problem: ${PROBLEM_DATA[prob]?.stat1 ?? 'Seed preparation variables affect field performance in ways standard testing doesn\'t catch.'}`,
      `SLIDE 3 — The cost: ${PROBLEM_DATA[prob]?.cost1 ?? 'Field performance inconsistency traced to seed preparation.'}`,
      `SLIDE 4 — The consequence: ${PROBLEM_DATA[prob]?.consequence ?? 'Preparation decisions made at the facility determine outcomes in the field.'}`,
      'SLIDE 5 — The fix: Validated seed preparation programs address this before the lot ships.',
      `SLIDE 6 — Follow ${COMPANY.name} for more seed performance and coating operations content.`,
    ],
    caption: CAPTIONS[prob]?.[idx] ?? `${PROBLEM_DATA[prob]?.stat1 ?? 'Seed preparation decisions determine field performance.'}\n\n${PROBLEM_DATA[prob]?.consequence ?? 'The fix starts at the processing stage.'}\n\n${CTAS[ctaIdx]}`,
    cta: CTAS[ctaIdx],
    suggestedVisuals: SUGGESTED_VISUALS[prob] ?? [
      'Close-up of coated seed under magnification showing surface texture',
      'Side-by-side field emergence comparison between two seed lots',
      'Facility shot of in-process QC sampling on a coating line',
      'Data graphic showing the cost range or performance difference',
      'Field stand photo with performance annotation overlay',
    ],
    repurposingSuggestions: REPURPOSING.slice(0, 4),
    qualityScore,
    improvementSuggestions,
  }
}
