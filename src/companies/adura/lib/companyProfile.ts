export const COMPANY = {
  name: 'Adura LED Solutions',
  website: 'adurasolutions.com',
  tagline: 'Reduce lighting-related operating costs. Improve facility reliability. Prevent downtime.',
  positioning: 'Adura LED Solutions helps businesses reduce lighting-related operating costs, improve facility reliability, and prevent downtime caused by inefficient or poorly designed lighting systems.',
}

export const PROBLEM_LABELS: Record<string, string> = {
  'energy-cost': 'Energy Cost Leakage',
  'downtime': 'Lighting System Downtime',
  'maintenance-costs': 'Hidden Maintenance Costs',
  'fixture-lifespan': 'Poor Fixture Lifespan',
  'facility-safety': 'Facility Safety Issues',
  'warehouse-visibility': 'Warehouse Visibility Problems',
  'labor-inefficiency': 'Labor Inefficiency',
  'total-cost-ownership': 'Total Cost of Ownership',
  'retrofitting': 'Retrofitting Inefficiencies',
  'operational-disruption': 'Operational Disruption',
}

export const TARGET_AUDIENCES = [
  'Facility Managers',
  'Operations Directors',
  'VPs of Operations',
  'Plant Managers',
  'Maintenance Supervisors',
  'Warehouse Managers',
  'Commercial Real Estate Developers',
  'Industrial Manufacturers',
  'Distribution Center Operators',
  'Procurement Officers',
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
  'energy-cost': {
    stat1: 'Industrial facilities lose 15–40% of lighting energy to poorly specified fixtures',
    stat2: 'A 100,000 sq ft warehouse running mismatched LED fixtures wastes $18,000–$45,000 per year',
    stat3: 'Lighting energy costs in poorly designed facilities average $1.50–$3.00 per sq ft annually',
    cost1: '$18,000–$45,000/year in wasted energy per facility',
    cost2: '15–40% energy loss from fixture mismatch alone',
    consequence: 'Most facilities discover this only after a utility audit — when the money is already gone.',
  },
  'downtime': {
    stat1: 'A single LED failure in an active production area can halt $50,000/hour operations',
    stat2: 'Unplanned lighting maintenance averages 4–6 hours per incident when fixtures are inaccessible',
    stat3: 'Facilities with aging lighting systems experience 3x more unplanned maintenance calls per year',
    cost1: '$50,000+/hour potential downtime cost in production environments',
    cost2: 'Average of 6–8 unplanned lighting downtime hours per facility annually',
    consequence: 'Lighting failures rarely announce themselves. When they happen, they happen during operation.',
  },
  'maintenance-costs': {
    stat1: 'Labor accounts for 70% of total lighting maintenance costs, not parts',
    stat2: 'Replacing fixtures in high-bay industrial areas costs $150–$400 per fixture in labor alone',
    stat3: 'Facilities typically underestimate ongoing lighting maintenance costs by 40–60%',
    cost1: '$150–$400 per fixture in labor for high-bay replacements',
    cost2: '70% of maintenance cost is labor — not the fixture',
    consequence: "The fixture cost is the one line on the invoice. The labor cost doesn't show up until year two.",
  },
  'fixture-lifespan': {
    stat1: 'Budget LED fixtures rated at 50,000 hours regularly fail at 20,000–25,000 hours under load',
    stat2: 'Thermal management failures account for over 60% of premature LED fixture deaths',
    stat3: 'Poor driver quality reduces LED system lifespan by 30–50% in high-temperature environments',
    cost1: '50% shorter lifespan means 2x more replacement cycles over 10 years',
    cost2: '30–50% lifespan reduction from driver mismatch alone',
    consequence: 'A fixture rated for 50,000 hours is a projection, not a promise. Heat management determines what actually happens.',
  },
  'facility-safety': {
    stat1: 'OSHA requires minimum 30 foot-candles in assembly areas — many aging systems fall short',
    stat2: 'Warehouse accident rates increase 20% in facilities with inadequate lighting coverage',
    stat3: 'Lighting-related safety incidents cost facilities $50,000–$500,000 per event in liability and lost productivity',
    cost1: '$50,000–$500,000 per lighting-related safety incident',
    cost2: '20% higher accident rate in facilities with poor lighting coverage',
    consequence: 'Underlit facilities are not just inefficient. They create OSHA exposure and workers\' comp liability.',
  },
  'warehouse-visibility': {
    stat1: 'Picking accuracy decreases 15–30% in facilities with inconsistent lighting levels across zones',
    stat2: 'Shadow zones from poor fixture placement increase picking errors by up to 25%',
    stat3: 'Color rendering below CRI 70 makes label and barcode identification 25% slower on average',
    cost1: '15–30% drop in picking accuracy from lighting inconsistency',
    cost2: '25% slower label identification below CRI 70',
    consequence: 'Returns, re-picks, and mis-ships trace back to the environment — not always the employee.',
  },
  'labor-inefficiency': {
    stat1: 'Workers in properly lit environments are 15–20% more productive on sustained tasks',
    stat2: 'Eye fatigue from poor lighting reduces cognitive performance by 20% after four hours of exposure',
    stat3: 'Facilities with calibrated lighting report 30% fewer eye strain and headache complaints per quarter',
    cost1: '15–20% productivity drop in poorly lit work environments',
    cost2: '20% cognitive performance reduction after 4 hours under poor lighting',
    consequence: 'Lighting affects human output. That cost never appears on a lighting invoice.',
  },
  'total-cost-ownership': {
    stat1: 'A $30 budget fixture often totals $180 in cost over five years vs $120 for a properly specified unit',
    stat2: 'First cost of a fixture is typically 40% of total system cost over a 10-year operating period',
    stat3: 'Maintenance and energy costs represent 60% of total lighting cost of ownership in industrial settings',
    cost1: '60% of total lighting cost comes after installation',
    cost2: 'Budget fixtures can cost 50% more in TCO than properly specified alternatives',
    consequence: 'The purchase order looks good. The P&L tells a different story after year three.',
  },
  'retrofitting': {
    stat1: 'Cheap LED retrofits fail at 3x the rate of properly engineered LED systems within 18 months',
    stat2: '50% of LED retrofit projects fail to achieve projected energy savings due to driver mismatch',
    stat3: 'Mismatched driver-LED combinations reduce system efficiency by 15–25% from day one',
    cost1: '3x failure rate for cheap retrofit installations vs engineered systems',
    cost2: '50% of retrofits miss their energy savings projections',
    consequence: 'Retrofitting looks like a cost reduction. Without proper engineering, it becomes a recurring expense.',
  },
  'operational-disruption': {
    stat1: 'Facilities with aging lighting systems average 6–8 hours of unplanned operational disruption annually',
    stat2: 'Emergency lighting repairs cost 2–3x more than scheduled maintenance windows',
    stat3: 'Cascade failures in aging systems affect 30% more fixtures in the second year than the first',
    cost1: '2–3x cost premium for emergency vs scheduled lighting repairs',
    cost2: '6–8 unplanned disruption hours per year from aging systems',
    consequence: 'The disruption is never the fixture. It\'s the operation that stops waiting for it to be fixed.',
  },
}
