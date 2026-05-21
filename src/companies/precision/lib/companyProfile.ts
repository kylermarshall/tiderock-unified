export const COMPANY = {
  name: 'Precision Advanced Manufacturing',
  website: 'h2ojet.com',
  tagline: 'Reduce production inefficiencies. Improve machining accuracy. Prevent costly downstream failures.',
  positioning: 'Precision Advanced Manufacturing helps manufacturers reduce production inefficiencies, improve machining accuracy, and prevent costly downstream failures caused by poor tolerances, inconsistent processes, and manufacturing bottlenecks.',
}

export const PROBLEM_LABELS: Record<string, string> = {
  'machining-bottlenecks': 'Machining Bottlenecks',
  'tight-tolerance-failures': 'Tight Tolerance Failures',
  'production-delays': 'Production Delays',
  'scrap-rework-cost': 'Scrap and Rework Cost',
  'material-waste': 'Material Waste',
  'process-downtime': 'Process Downtime',
  'cost-leakage': 'Cost Leakage',
  'precision-inconsistency': 'Precision Inconsistency',
  'scaling-operations': 'Scaling Operations',
  'tool-wear-inefficiency': 'Tool Wear and Maintenance Inefficiency',
}

export const TARGET_AUDIENCES = [
  'Operations Directors',
  'Manufacturing Engineers',
  'Plant Managers',
  'VP of Manufacturing',
  'Quality Engineers',
  'Procurement Officers',
  'CNC Programming Managers',
  'Production Supervisors',
  'Supply Chain Directors',
  'Engineering Managers',
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
  'machining-bottlenecks': {
    stat1: 'A single machining bottleneck delays downstream assembly timelines by 2–5 weeks on average in high-mix, low-volume CNC environments',
    stat2: 'Facilities running three or more machining operations in sequence report 35–55% more throughput interruptions than single-setup programs',
    stat3: 'Bottlenecks in turning, milling, or grinding sequences cascade into 60–75% of dependent downstream operations',
    cost1: '2–5 week downstream delays per unresolved machining bottleneck',
    cost2: '35–55% more throughput interruptions in multi-operation sequencing',
    consequence: 'The bottleneck is rarely at the machine. It is upstream — in fixturing, programming, or setup sequencing that was never fully optimized.',
  },
  'tight-tolerance-failures': {
    stat1: 'Parts rejected for tolerance non-conformance account for 8–18% of total CNC output in shops without structured first-article inspection',
    stat2: 'Tight-tolerance failures discovered at final inspection cost 4–12x more to remediate than defects caught during in-process measurement',
    stat3: 'Dimensional non-conformance in precision machining causes downstream assembly failures in 1 out of every 5 complex multi-component programs',
    cost1: '8–18% rejection rate for tolerance non-conformance without structured in-process inspection',
    cost2: '4–12x higher remediation cost for failures discovered at final inspection versus in-process',
    consequence: 'Tolerance failures do not announce themselves until they surface downstream — in assembly, in field installation, or during customer inspection.',
  },
  'production-delays': {
    stat1: 'CNC production delays extend project timelines by 15–30% on average when setup time, programming errors, or material availability are not managed upstream',
    stat2: 'Every day of machining delay costs downstream assembly and integration operations $1,500–$6,000 in idle capacity and labor overhead',
    stat3: '72% of precision manufacturing schedule overruns originate in the machining phase — not in finishing, assembly, or shipping',
    cost1: '15–30% average timeline extension from unmanaged CNC production delays',
    cost2: '$1,500–$6,000/day in downstream idle capacity costs per machining delay',
    consequence: 'The machining delay is never the final cost. Every idle downstream operation compounds daily until the backlog clears.',
  },
  'scrap-rework-cost': {
    stat1: 'Scrap and rework in precision machining accounts for 6–14% of total production cost in shops without a formal dimensional verification process',
    stat2: 'A single rework event on a tight-tolerance aerospace or medical component averages 6–14 hours of additional machining, inspection, and re-certification time',
    stat3: 'Shops running without real-time in-process gauging generate 3–5x the scrap rate of operations with integrated measurement protocols',
    cost1: '6–14% of total production cost consumed by scrap and rework without dimensional verification',
    cost2: '6–14 additional hours per rework event on tight-tolerance components',
    consequence: 'Rework in precision machining carries three separate costs: the remachining time, the material, and the schedule impact on every part waiting behind it.',
  },
  'material-waste': {
    stat1: 'Poor material utilization in CNC machining wastes 10–25% of raw stock input in programs without optimized CAM toolpath planning',
    stat2: 'Material waste in precision machining adds $15–$60 per pound of wasted aerospace-grade alloy, titanium, or stainless stock to program cost',
    stat3: 'Shops using manual or unoptimized nesting and stock allocation generate 2–4x the material waste of operations running optimized CAM strategies',
    cost1: '10–25% raw stock waste from unoptimized CAM toolpath and nesting planning',
    cost2: '$15–$60 per pound of wasted aerospace alloy, titanium, or stainless stock',
    consequence: 'Material waste in precision machining is invisible in the quote. It is priced in as stock cost — and the customer absorbs it without a line item.',
  },
  'process-downtime': {
    stat1: 'Unplanned CNC machine downtime costs $800–$3,500 per hour in lost throughput, idle labor, and delayed delivery exposure',
    stat2: 'Precision machining facilities without structured preventive maintenance programs experience 45–65% more unplanned downtime than those with scheduled programs',
    stat3: 'CNC machining centers running above 75% utilization average 8–15 unplanned downtime hours per month without a formal maintenance protocol',
    cost1: '$800–$3,500/hour in lost throughput during unplanned CNC downtime',
    cost2: '45–65% more unplanned downtime in facilities without preventive maintenance programs',
    consequence: 'Machine downtime in a precision shop does not stop one operation. It stops the sequence — and every part waiting in queue shifts on the delivery schedule.',
  },
  'cost-leakage': {
    stat1: 'Hidden cost leakage in CNC precision machining programs averages 12–22% of total program cost when setup, tooling, rework, and overhead are not tracked at the job level',
    stat2: 'Untracked setup time in high-mix machining environments accounts for 18–35% of total labor cost on short-run programs',
    stat3: 'Programs without job-level cost tracking experience 2.5–4x more budget overruns than operations with real-time cost visibility',
    cost1: '12–22% of total program cost lost to untracked setup, tooling, and overhead',
    cost2: '18–35% of total labor cost consumed by untracked setup time in high-mix environments',
    consequence: 'Cost leakage in precision machining does not show up on a daily report. It shows up in the margin when the job closes — after the damage is done.',
  },
  'precision-inconsistency': {
    stat1: 'Part-to-part dimensional variation across multi-operator CNC programs increases rejection rates by 25–45% compared to single-operator benchmark programs',
    stat2: 'Precision inconsistency in machined components causes downstream assembly fit failures in 15–30% of multi-part assemblies in high-tolerance applications',
    stat3: 'Shops without standardized work instructions and operator certification protocols produce 3–6x more dimensional variance than operations with documented process control',
    cost1: '25–45% increase in rejection rates from multi-operator dimensional variation',
    cost2: '15–30% downstream assembly fit failure rate from precision inconsistency in high-tolerance programs',
    consequence: 'Precision inconsistency is not a machine problem. It is a process standardization problem — and it compounds with every operator shift and every new setup.',
  },
  'scaling-operations': {
    stat1: 'CNC machining operations attempting to scale from prototype to production volumes without process documentation experience 40–70% more quality escapes than those with structured scale-up protocols',
    stat2: 'Shops scaling production volume without addressing fixturing, tooling, and programming repeatability see cycle time variance increase by 20–45% per unit',
    stat3: 'Throughput bottlenecks emerge in 65–80% of machining scale-ups within the first 90 days when upstream constraints are not identified before production ramp',
    cost1: '40–70% more quality escapes during scale-up without structured process documentation',
    cost2: '20–45% increase in cycle time variance per unit when fixturing and tooling repeatability are not addressed before volume ramp',
    consequence: 'Scaling a machining operation without fixing the upstream process constraints does not multiply output. It multiplies the defects, the delays, and the cost per part.',
  },
  'tool-wear-inefficiency': {
    stat1: 'Unmanaged tool wear in precision CNC machining causes dimensional drift of 0.002–0.008 inches per tool interval, pushing parts outside tolerance before operators detect the shift',
    stat2: 'Shops without structured tool life management programs experience 20–40% more tool breakage events than those with defined change intervals and in-process monitoring',
    stat3: 'Premature tool failure during an active cutting cycle causes surface finish defects, dimensional non-conformance, and spindle load events that require unplanned machine stops averaging 2–4 hours to diagnose and resolve',
    cost1: '0.002–0.008 inch dimensional drift per tool interval without managed change protocols',
    cost2: '20–40% more tool breakage events without structured tool life management',
    consequence: 'Tool wear does not announce itself. The part looks correct until the cumulative drift exceeds the tolerance band — and by then, a full batch may already be non-conforming.',
  },
}
