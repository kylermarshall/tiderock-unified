export const COMPANY = {
  name: 'Fabcon',
  website: 'fabcon.com',
  tagline: 'Reduce fabrication delays. Improve production consistency. Prevent costly downstream failures.',
  positioning: 'Fabcon helps industrial and commercial businesses reduce fabrication delays, improve production consistency, and prevent costly downstream project failures through reliable contract manufacturing.',
}

export const PROBLEM_LABELS: Record<string, string> = {
  'fabrication-bottlenecks': 'Fabrication Bottlenecks',
  'production-delays': 'Production Delays',
  'rework-scrap-cost': 'Rework and Scrap Cost',
  'labor-inefficiency': 'Labor Inefficiency',
  'poor-project-coordination': 'Poor Project Coordination',
  'missed-deadlines': 'Missed Deadlines',
  'cost-overruns': 'Cost Overruns from Bad Planning',
  'quality-inconsistency': 'Quality Inconsistency',
  'equipment-downtime': 'Equipment Downtime',
  'material-waste': 'Material Waste',
}

export const TARGET_AUDIENCES = [
  'OEM Project Managers',
  'Operations Directors',
  'VPs of Manufacturing',
  'Plant Managers',
  'Procurement Officers',
  'General Contractors',
  'Commercial Developers',
  'Engineering Managers',
  'Supply Chain Directors',
  'Construction Project Managers',
]

export const CONTENT_ANGLES = [
  'Financial Impact',
  'Operational Risk',
  'Hidden Cost Exposure',
  'Assumption Challenge',
  'Industry Benchmark',
  'Decision Framework',
  'Case Study Style',
  'Contrarian Take',
  'Insider Knowledge',
  'Process Breakdown',
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
  'fabrication-bottlenecks': {
    stat1: 'A single fabrication bottleneck delays downstream project timelines by 2–4 weeks on average',
    stat2: 'Facilities running disconnected fabrication vendors experience 30–50% more production stoppages per project',
    stat3: 'Bottlenecks in cutting, forming or welding sequences cause cascade delays across 60–70% of dependent project phases',
    cost1: '2–4 week downstream project delays per fabrication bottleneck',
    cost2: '30–50% more production stoppages when using multiple disconnected vendors',
    consequence: 'The bottleneck is rarely where teams expect it. It is usually upstream — in sequencing, material readiness, or handoff timing.',
  },
  'production-delays': {
    stat1: 'Production delays in metal fabrication extend project timelines by an average of 15–25%',
    stat2: 'Late fabrication delivery causes downstream labor crews to stand idle at $800–$2,500/day per trade',
    stat3: '68% of construction project overruns trace back to fabrication or material delays, not on-site execution',
    cost1: '15–25% average timeline extension from production delays',
    cost2: '$800–$2,500/day in idle downstream labor costs per delayed trade',
    consequence: 'The fabrication delay is not the final cost. Every idle crew, missed installation window, and pushed deadline adds to the number.',
  },
  'rework-scrap-cost': {
    stat1: 'Rework in metal fabrication accounts for 5–12% of total project cost in shops without robust QC processes',
    stat2: 'A single incorrect weld or cut on a structural component can require 4–8 hours of labor to remediate',
    stat3: 'Scrap rates in poorly managed fabrication shops run 8–15% of material input — compared to 2–4% in well-run operations',
    cost1: '5–12% of total project cost lost to rework without strong QC',
    cost2: '4–8 labor hours per rework event on structural components',
    consequence: 'Rework does not just cost the repair time. It costs the material, the schedule slot, and the downstream crew time that cannot proceed until the correction is done.',
  },
  'labor-inefficiency': {
    stat1: 'Inefficient shop floor sequencing reduces fabrication labor productivity by 20–35% compared to optimized layouts',
    stat2: 'Shops relying on manual job tracking lose 6–10 hours per week per supervisor to status chasing and scheduling conflicts',
    stat3: 'Labor represents 35–50% of total fabrication cost — making inefficiency here the single largest controllable variable',
    cost1: '20–35% productivity loss from poor sequencing on the shop floor',
    cost2: '6–10 wasted supervisor hours per week on status chasing',
    consequence: 'Labor inefficiency is invisible in the estimate. It shows up in the actual — after the job is complete and the variance report lands.',
  },
  'poor-project-coordination': {
    stat1: 'Projects using 3 or more fabrication vendors average 2.3x more coordination failures than single-source contracts',
    stat2: 'Miscommunication between fab shops and engineering teams causes specification errors in 1 out of every 4 complex projects',
    stat3: 'Coordination gaps between fabrication, finishing and delivery account for 40% of late project completions',
    cost1: '2.3x more coordination failures with 3+ fabrication vendors',
    cost2: '1 in 4 complex projects has a specification error from coordination gaps',
    consequence: 'Poor coordination does not announce itself until something is wrong. By then, the schedule has already slipped and someone is absorbing the cost.',
  },
  'missed-deadlines': {
    stat1: 'Missed fabrication deadlines push installation windows by an average of 3–6 weeks on commercial projects',
    stat2: 'Penalty clauses triggered by fabrication delays cost project owners $5,000–$25,000 per week depending on contract terms',
    stat3: '72% of project managers report that fabrication timing is the hardest variable to reliably forecast',
    cost1: '3–6 week installation window delays from missed fab deadlines',
    cost2: '$5,000–$25,000/week in penalty exposure from deadline misses',
    consequence: 'The fabrication deadline looks like a vendor problem until the penalty clause activates. Then it becomes a financial problem — on the owner\'s ledger.',
  },
  'cost-overruns': {
    stat1: 'Fabrication-driven cost overruns average 18–28% above original project budget on complex structural projects',
    stat2: 'Change orders originating from fabrication errors or scope gaps add an average of $12,000–$85,000 to mid-size commercial projects',
    stat3: 'Projects that skip front-end engineering review in fabrication experience 3x more cost overruns than those that include it',
    cost1: '18–28% average budget overrun on complex structural projects',
    cost2: '$12,000–$85,000 in change order exposure from fabrication scope gaps',
    consequence: 'Cost overruns in fabrication are not random. They are the predictable output of compressed timelines, skipped reviews, and vendors who bid low and bill high.',
  },
  'quality-inconsistency': {
    stat1: 'Quality inconsistency across multi-vendor fabrication programs causes rejection rates of 8–20% on first inspection',
    stat2: 'Inconsistent weld quality on structural components requires re-inspection and remediation at $150–$400 per occurrence',
    stat3: 'Programs with 4 or more fabrication sources experience 3x more dimensional tolerance failures than single-source programs',
    cost1: '8–20% first-inspection rejection rate in multi-vendor fabrication',
    cost2: '$150–$400 per weld remediation event',
    consequence: 'Quality inconsistency is not visible at order placement. It shows up at delivery, at inspection, or worse — after installation.',
  },
  'equipment-downtime': {
    stat1: 'Unplanned equipment downtime in fabrication shops costs $1,200–$4,500 per hour in lost throughput and labor overhead',
    stat2: 'Shops without preventive maintenance programs experience 40–60% more unplanned downtime than those with scheduled programs',
    stat3: 'CNC and plasma cutting equipment averages 6–12 unplanned downtime hours per month in shops running above 80% utilization',
    cost1: '$1,200–$4,500/hour in lost throughput during equipment downtime',
    cost2: '40–60% more unplanned downtime without preventive maintenance programs',
    consequence: 'Equipment downtime in a fabrication shop does not just stop one machine. It stops the sequence — and every downstream process waits until capacity is restored.',
  },
  'material-waste': {
    stat1: 'Poor nesting and cutting optimization wastes 12–22% of plate steel input in shops without CNC programming discipline',
    stat2: 'Material waste in fabrication adds $8–$30 per square foot of wasted plate to final project cost',
    stat3: 'Shops using manual layout and cutting methods generate 2–3x the material waste of those using programmed nesting software',
    cost1: '12–22% plate steel waste from poor nesting and cutting optimization',
    cost2: '$8–$30/sq ft cost added per unit of wasted plate material',
    consequence: 'Material waste shows up on the invoice as material cost. The waste is already baked in before the project begins — at the planning and programming stage.',
  },
}
