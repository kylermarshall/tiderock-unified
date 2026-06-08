export const COMPANY = {
  name: 'Summit Seed Coatings',
  website: 'summitseedcoatings.com',
  tagline: 'Improve seed performance, coating consistency, and planting outcomes through advanced seed coating, treatment, and pelleting services.',
  positioning: 'Summit Seed Coatings helps seed companies and growers improve seed performance, coating consistency, and planting outcomes through advanced seed coating, treatment, and pelleting services.',
}

export const PROBLEM_LABELS: Record<string, string> = {
  'coating-inconsistency':    'Coating Inconsistency',
  'germination-variability':  'Germination and Emergence Variability',
  'seed-treatment-complexity':'Seed Treatment Complexity',
  'planting-performance-risk':'Planting Performance Risk',
  'seed-handling-issues':     'Seed Handling Issues',
  'pelleting-precision':      'Pelleting and Coating Precision',
  'poor-seed-prep-cost':      'Cost of Poor Seed Preparation',
  'crop-establishment':       'Crop Establishment Challenges',
  'scaling-operations':       'Scaling Seed Coating Operations',
  'grower-trust':             'Grower Trust and Product Reliability',
}

export const TARGET_AUDIENCES = [
  'Seed Company Executives',
  'Seed Production Managers',
  'Agricultural Operations Leaders',
  'Growers',
  'Crop Advisors',
  'Seed Distributors',
  'Turf Seed Companies',
  'Forage and Cover Crop Seed Businesses',
  'Vegetable Seed Companies',
  'Agricultural Input Companies',
]

export const CONTENT_ANGLES = [
  'Hidden Cost Leak',
  'Common Operational Mistake',
  'Contrarian Take',
  'System Failure',
  'Before/After Improvement',
  'Buyer Education',
  'Risk Warning',
  'Agronomic Performance Breakdown',
  'Processing Bottleneck',
  'Supplier Decision Mistake',
]

export const OBJECTIVES = [
  'Generate Leads',
  'Build Authority',
  'Drive Website Traffic',
  'Start Conversations',
  'Educate Audience',
  'Challenge Assumptions',
]

export const PROBLEM_DATA: Record<string, {
  stat1: string; stat2: string; stat3: string;
  cost1: string; cost2: string;
  consequence: string;
}> = {
  'coating-inconsistency': {
    stat1: 'Coating weight variation above 3–5% across a seed lot creates measurable differences in germination timing, emergence uniformity, and early seedling performance — differences that show up in the field before any agronomic intervention is possible',
    stat2: 'Seed companies that rely on inconsistent coating processes see grower complaint rates 2–4x higher than those with validated, controlled coating programs — with complaints concentrated around uneven emergence and field stand inconsistency',
    stat3: 'Coating inconsistency caused by worn equipment, batch-to-batch binder variation, or poorly calibrated application rates can reduce effective germination by 10–20% compared to a properly coated control lot',
    cost1: '10–20% reduction in effective germination from coating process variability',
    cost2: '2–4x higher grower complaint rates when coating consistency is not formally controlled',
    consequence: 'Coating inconsistency is not visible at the bag. It shows up after planting — in uneven stands, slow emergence, and grower calls that trace back to a process decision made before the seed ever left the facility.',
  },
  'germination-variability': {
    stat1: 'Emergence timing variation of more than 3–5 days within a seed lot creates yield drag of 8–15% in row crops — the late-emerging plants never fully recover their competitive position against earlier-emerged neighbors',
    stat2: 'Up to 35% of field-level germination inconsistency in commercial seed lots is attributable to seed preparation variables — coating thickness, treatment application rate, and seed-to-seed treatment transfer — not seed genetics',
    stat3: 'Seed lots with germination variability above 15% from environmental sensitivity (wet/cold conditions) often trace to coating decisions that were not validated for the target planting window or soil condition',
    cost1: '8–15% yield drag from emergence timing variation exceeding 3–5 days within a lot',
    cost2: 'Up to 35% of field germination inconsistency attributable to seed preparation variables, not genetics',
    consequence: 'When germination is uneven, the seed is blamed first. Often the coating, the treatment, or the handling decision is where the inconsistency started — and where fixing it begins.',
  },
  'seed-treatment-complexity': {
    stat1: 'Multi-chemistry seed treatment programs — combining fungicides, insecticides, biostimulants, and inoculants — require application sequencing validation to prevent chemical interaction, carrier incompatibility, and coating adhesion failures that reduce efficacy by 20–40%',
    stat2: 'Seed treatment operations handling 8 or more active ingredient combinations without formal compatibility testing experience formulation failures at 3x the rate of operations with validated programs',
    stat3: 'Regulatory label compliance in seed treatment — including application rate accuracy, re-entry interval documentation, and worker protection requirements — requires process controls that 60% of in-house treatment operations do not have formally documented',
    cost1: '20–40% reduction in treatment efficacy from incompatible chemistry stacking without sequencing validation',
    cost2: '3x higher formulation failure rate in operations with 8+ actives and no formal compatibility testing',
    consequence: 'Seed treatment complexity is not a chemistry problem. It is a process control problem — and the cost of getting it wrong compounds through every bag of seed that leaves the facility.',
  },
  'planting-performance-risk': {
    stat1: 'Seed singulation accuracy at the planter drops 15–30% when seed size, shape, or coating weight deviates from the specifications the meter was calibrated to — a direct result of coating process variation, not planter settings',
    stat2: 'Planting depth and seed-to-soil contact are both affected by coating smoothness, density, and film integrity — coatings that crack, flake, or absorb moisture unevenly at planting alter the seed\'s physical interface with the soil',
    stat3: 'Growers who experience skip rates above 3% at recommended planting populations often trace the issue to seed lot coating inconsistency — specifically coating weight variation that shifts effective seed size outside the meter\'s working range',
    cost1: '15–30% drop in seed singulation accuracy from coating weight variation outside meter calibration range',
    cost2: 'Skip rates above 3% consistently correlated with coating weight variation in treated seed lots',
    consequence: 'Planting performance risk from poor coating does not show up in the germination test. It shows up at the planter — in skip patterns, doubles, and stand counts that never match the seeding rate.',
  },
  'seed-handling-issues': {
    stat1: 'Seed lot abrasion during bulk handling — in gravity wagons, air seeders, and pneumatic conveyors — strips coating material at rates of 8–18% by weight when coatings are not formulated for handling durability and seed flow characteristics',
    stat2: 'Coating dust generated during handling and transport increases treatment exposure risk for equipment operators, creates regulatory compliance issues under worker protection standards, and indicates active coating degradation that reduces field performance',
    stat3: 'Seed flowability variation of more than 20% across a coated lot — from coating weight inconsistency, clumping, or tackiness — causes measurable meter calibration drift, skip patterns, and inconsistent population at planting',
    cost1: '8–18% coating material loss from abrasion during bulk handling when coatings lack handling durability',
    cost2: 'Flowability variation above 20% causes measurable population inconsistency and meter calibration drift at planting',
    consequence: 'Seed handling issues do not start at planting. They start when the coating leaves the facility without being validated for the handling and transport path the seed will follow before it reaches the planter.',
  },
  'pelleting-precision': {
    stat1: 'Pellet-to-pellet weight variation above 5% in precision-pelleted seed lots creates singulation failures at the planter — the primary cause of skip rates and doubles in high-value vegetable, flower, and specialty crop production',
    stat2: 'Pellet integrity failures — cracking, shattering, or excessive water absorption before germination — occur in 12–25% of pelleted lots that were not validated against target soil moisture and temperature conditions at planting',
    stat3: 'Roundness deviation above 0.08 in pelleted seed (measured by sphericity index) reduces vacuum seeder singulation accuracy by 18–35%, directly affecting crop stand uniformity and harvest timing consistency',
    cost1: 'Pellet weight variation above 5% is the primary driver of singulation failure in precision vegetable and specialty crop seeding',
    cost2: '18–35% reduction in singulation accuracy from roundness deviation — directly affecting stand uniformity and harvest timing',
    consequence: 'Pelleting precision is not a cosmetic concern. In precision-seeded crops, pellet quality determines planting performance — and planting performance determines whether the stand is right at establishment or expensive to remediate.',
  },
  'poor-seed-prep-cost': {
    stat1: 'Seed companies that attribute field performance complaints to genetics rather than seed preparation spend 3–5x more on warranty seed replacement, customer service, and reputational recovery than those with traceable coating and treatment records',
    stat2: 'The cost of reworking or discarding off-spec seed lots — from coating failure, treatment error, or pellet quality rejection — averages $15,000–$80,000 per event depending on lot size, crop value, and treatment cost',
    stat3: 'Hidden cost of poor seed preparation compounds through the supply chain: increased returns, elevated replant risk, higher crop insurance claims, and lost repeat business — none of which appear on a seed processing line cost sheet',
    cost1: '3–5x higher warranty and recovery cost when field complaints are not linked to traceable seed preparation records',
    cost2: '$15,000–$80,000 per lot rework or discard event from coating failure, treatment error, or pellet quality rejection',
    consequence: 'The cost of a poor seed preparation decision is never paid at the processing line. It is paid in the field, at the claim, and in the customer relationship — after the decision is three months old.',
  },
  'crop-establishment': {
    stat1: 'Crop establishment failures — stands below 85% of target population in the first 14 days — increase the probability of yield loss by 20–40% depending on crop type, planting date, and competitive weed pressure',
    stat2: 'In high-value vegetable and specialty crops, stand failures requiring replanting cost $800–$4,500 per acre in direct replanting cost, plus lost market window value that can exceed the direct cost by 2–3x',
    stat3: 'Seed coating decisions that do not account for target planting environment — soil type, moisture levels, temperature range, and residue cover — create preventable establishment risk that is rarely diagnosed correctly at the field level',
    cost1: '20–40% increase in yield loss probability when stand falls below 85% of target population in first 14 days',
    cost2: '$800–$4,500/acre direct replanting cost in specialty crops, plus 2–3x in lost market window value',
    consequence: 'Crop establishment problems are diagnosed at the field. The decisions that cause them are made at seed preparation — in coating specifications, treatment rates, and pelleting validation that either fit the planting environment or do not.',
  },
  'scaling-operations': {
    stat1: 'Seed coating operations attempting to scale from 50,000 to 500,000 units per season without process documentation experience batch-to-batch variation that increases by 25–50% as volume grows — the opposite of the efficiency expected from scale',
    stat2: 'Coating equipment calibration drift of 3–5% per 100,000-unit production run — from wear, temperature change, and binder viscosity variation — requires formal re-validation protocols that 70% of scaling operations do not have in place',
    stat3: 'Customer complaints from scaled coating operations are concentrated in the first and last 20% of each production campaign — where process drift and changeover inefficiency are highest — indicating a scaling process control problem, not a capacity problem',
    cost1: '25–50% increase in batch-to-batch coating variation when scaling without formal process documentation',
    cost2: '3–5% equipment calibration drift per 100,000 units requiring re-validation that most scaling operations skip',
    consequence: 'Scale does not solve coating inconsistency. Scale amplifies it. Operations that scale without addressing coating process controls produce more volume of the same inconsistency — just faster.',
  },
  'grower-trust': {
    stat1: 'A single season of field performance inconsistency — traced or not traced to coating quality — reduces repeat purchase intent among commercial growers by 35–55% and triggers competitive trials that cost the seed company a customer relationship worth 5–10x the original complaint cost',
    stat2: 'Growers who cannot trace field performance problems to a specific seed lot coating or treatment record are 3x more likely to attribute the failure to the seed company than to any external factor — regardless of whether the coating decision caused the problem',
    stat3: 'Seed company sales teams in markets with high grower complaint rates spend 40–60% more time on complaint management and customer recovery than teams in markets with traceable, consistent coating programs',
    cost1: '35–55% reduction in repeat purchase intent after a single season of field performance inconsistency',
    cost2: '3x higher company blame attribution when seed lot coating and treatment records cannot be traced back to the field complaint',
    consequence: 'Grower trust is not lost in the field. It is lost at the seed preparation stage — when coating inconsistency, treatment error, or poor lot documentation creates a problem that can\'t be explained, owned, or fixed.',
  },
}
