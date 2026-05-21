export const COMPANY = {
  name: 'PMT',
  fullName: 'Plastic Molding Technology',
  website: 'plasticmolding.com',
  tagline: 'Reduce defect rates. Improve production consistency. Prevent costly tooling and molding inefficiencies.',
  positioning: 'PMT helps manufacturers reduce defect rates, improve production consistency, and prevent costly tooling and molding inefficiencies at scale.',
}

export const PROBLEM_LABELS: Record<string, string> = {
  'injection-molding-defects': 'Injection Molding Defects',
  'tooling-failures': 'Tooling Failures',
  'production-bottlenecks': 'Production Bottlenecks',
  'scrap-rework-cost': 'Scrap and Rework Cost',
  'mold-downtime': 'Downtime from Mold Issues',
  'poor-part-consistency': 'Poor Part Consistency',
  'scaling-inefficiencies': 'Scaling Inefficiencies',
  'material-waste': 'Material Waste',
  'process-cost-leakage': 'Process Cost Leakage',
  'tooling-lifecycle-cost': 'Tooling Lifecycle Cost',
}

export const TARGET_AUDIENCES = [
  'Engineering Managers',
  'Operations Directors',
  'VPs of Manufacturing',
  'Plant Managers',
  'Procurement Managers',
  'Product Development Engineers',
  'Quality Control Managers',
  'Supply Chain Directors',
  'Tier 1 Automotive Suppliers',
  'Contract Manufacturers',
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
  'injection-molding-defects': {
    stat1: 'Injection molding defects — sink marks, flash, short shots, and warping — account for 5–15% of total part output in operations without formal process controls',
    stat2: 'A single undetected defect escaping to assembly can trigger a field recall costing 10–100x the original production cost of the affected run',
    stat3: 'Operations running without documented process parameters experience defect rates 3–5x higher than those with validated, locked-in molding conditions',
    cost1: '5–15% of total part output lost to defects without formal process controls',
    cost2: '3–5x higher defect rates in operations without documented process parameters',
    consequence: 'The defect is not the final cost. Every defective part that reaches assembly — or the customer — multiplies the exposure by an order of magnitude.',
  },
  'tooling-failures': {
    stat1: 'Premature mold failure — cracking, gate erosion, and core damage — forces unplanned production stoppages averaging 2–6 weeks of lost throughput',
    stat2: 'Molds built to the lowest upfront cost fail at 3–4x the rate of properly engineered tooling, erasing initial savings within the first production year',
    stat3: 'Unplanned tooling failures cost $15,000–$120,000 per event in combined repair, expediting, and downstream assembly disruption',
    cost1: '2–6 weeks of lost throughput per unplanned mold failure event',
    cost2: '$15,000–$120,000 in combined costs per unplanned tooling failure',
    consequence: 'The mold that cost less to build almost always costs more to operate. The math is predictable. Most procurement decisions ignore it.',
  },
  'production-bottlenecks': {
    stat1: 'Cycle time inefficiencies — from unoptimized cooling, improper gate placement, and manual process adjustments — reduce effective machine utilization by 20–40% in poorly controlled operations',
    stat2: 'A single press running 15% over target cycle time loses the equivalent of 1–2 shifts of productive output per week across a full production schedule',
    stat3: 'Operations managing 10+ active molds without a formal cycle time audit average $80,000–$250,000 in annual throughput loss from avoidable inefficiencies',
    cost1: '20–40% effective utilization loss from cycle time inefficiencies',
    cost2: '$80,000–$250,000 in annual throughput loss across multi-mold operations without cycle audits',
    consequence: 'The press is running. The parts are coming out. The throughput loss is invisible — until the capacity shortfall appears on the production report.',
  },
  'scrap-rework-cost': {
    stat1: 'Plastic injection molding operations without statistical process control average 8–18% scrap rates — compared to 1–4% in well-controlled operations',
    stat2: 'Rework on injection-molded parts averages $0.15–$2.50 per part in direct labor, and that cost compounds across high-volume production runs',
    stat3: 'Operations running above 10% scrap consume an estimated 12–22% more resin annually than their process actually requires — a direct material cost penalty embedded in every production run',
    cost1: '8–18% scrap rate without process control versus 1–4% in controlled operations',
    cost2: '12–22% excess resin consumption in operations above 10% scrap rate',
    consequence: 'Scrap in injection molding is not a quality problem. It is a process control problem — and it has a dollar value that accumulates on every shift, whether tracked or not.',
  },
  'mold-downtime': {
    stat1: 'Unplanned mold maintenance events — flash buildup, vent clogging, ejector pin failures — average 4–12 unplanned hours per mold per month in operations without preventive maintenance programs',
    stat2: 'Each hour of unplanned press downtime from a mold issue costs $350–$1,800 in lost throughput, depending on press tonnage and part value',
    stat3: 'Operations without formal mold maintenance schedules experience 60–80% more unplanned downtime events than operations running structured PM programs',
    cost1: '4–12 unplanned hours of mold-related downtime per mold per month without PM programs',
    cost2: '$350–$1,800 per hour in lost throughput during unplanned mold-related press stops',
    consequence: 'Mold maintenance deferred is not cost saved. It is downtime scheduled — at a time and duration the production team cannot control.',
  },
  'poor-part-consistency': {
    stat1: 'Dimensional variation in injection-molded parts — driven by uncontrolled melt temperature, inconsistent pack pressure, and cooling variation — causes first-pass yield failures of 10–25% in operations without closed-loop process control',
    stat2: 'Part-to-part weight variation above 0.5% is a reliable indicator of process instability that will produce dimensional failures within 24–48 production hours',
    stat3: 'Assembly lines dependent on inconsistent injection-molded components experience 30–50% higher line stoppage rates than those supplied by process-controlled operations',
    cost1: '10–25% first-pass yield failure from dimensional variation without process control',
    cost2: '30–50% higher assembly line stoppage rates when supplied by inconsistent molding operations',
    consequence: 'Part inconsistency is not a dimensional problem. It is a process stability problem — and it propagates downstream into every assembly, inspection, and customer delivery that follows.',
  },
  'scaling-inefficiencies': {
    stat1: 'When injection molding programs scale from prototype to full production without formal DFM review, 60–70% encounter tooling or process problems that require design changes, averaging $25,000–$150,000 in unplanned engineering cost',
    stat2: 'Scaling a molding program on tooling not designed for production volumes fails at 2–3x the rate of programs with production-intent tooling from the start',
    stat3: 'Operations that scale without locking process parameters first experience a 35–55% increase in defect rate at higher volumes — the opposite of the expected efficiency curve',
    cost1: '60–70% of programs scaled without DFM review encounter design changes costing $25,000–$150,000',
    cost2: '35–55% increase in defect rate when scaling without locked process parameters',
    consequence: 'Scale amplifies what is already broken. The process instability invisible at 5,000 parts per month becomes impossible to ignore at 50,000.',
  },
  'material-waste': {
    stat1: 'Sprue, runner, and purging losses in injection molding consume 8–25% of total resin input in operations without material recovery or optimized gate design',
    stat2: 'Resin purging costs average $0.50–$3.00 per kilogram of purged material — making color changes and material transitions a hidden operational cost most plants do not track by job',
    stat3: 'Hot runner systems reduce material waste by 15–30% compared to cold runner tooling — but the tooling premium is recovered within 6–18 months on most production volumes above 100,000 shots annually',
    cost1: '8–25% of total resin input lost to sprue, runner, and purging in unoptimized operations',
    cost2: '$0.50–$3.00 per kilogram in purging costs not tracked by job in most operations',
    consequence: 'Material waste in injection molding is embedded in every quote and every production run — whether it is tracked or not. The shops that track it spend less.',
  },
  'process-cost-leakage': {
    stat1: 'Operations without closed-loop process monitoring lose an estimated 8–15% of production value annually to inefficiencies that are individually invisible — cycle time drift, inconsistent pack pressure, untracked scrap, and yield variation',
    stat2: 'Unmonitored process drift — melt temperature variation, cooling time creep, and shot weight inconsistency — costs the equivalent of 200–400 hours of productive press time annually per machine in a typical multi-press shop',
    stat3: 'Manufacturers who implement SPC on injection molding processes report 20–40% reductions in total quality-related cost within 12 months',
    cost1: '8–15% of annual production value lost to individually invisible process inefficiencies',
    cost2: '200–400 hours of annual productive press time lost per machine to unmonitored process drift',
    consequence: 'Process cost leakage does not appear on a single line of the income statement. It is spread across scrap, yield, overtime, and rework — invisible in aggregate, expensive in total.',
  },
  'tooling-lifecycle-cost': {
    stat1: 'The total lifecycle cost of an injection mold — including repair, maintenance, refurbishment, and lost production from failures — averages 2–4x the original tooling build cost over a 5-year production program',
    stat2: 'Molds built with inadequate steel hardness or poor venting fail 40–60% earlier than properly specified tooling, requiring full refurbishment or replacement at $30,000–$200,000 per event',
    stat3: 'Every dollar saved on tooling upfront costs an average of $3–$7 in downstream repair, downtime, and scrap costs over the life of the production program',
    cost1: 'Total lifecycle cost of a mold averages 2–4x the original build cost over 5 years',
    cost2: 'Every $1 saved on tooling upfront costs $3–$7 in downstream repair, downtime, and scrap',
    consequence: 'The decision to cut tooling cost is made once. The consequences are paid on every production run for the life of the program.',
  },
}
