export const COMPANY = {
  name: 'Pro-Active Engineering',
  website: 'proactivepcb.com',
  tagline: 'Reduce production failures. Improve supply chain reliability. Prevent costly quality and operational issues.',
  positioning: 'Pro-Active Engineering helps manufacturers reduce production failures, improve supply chain reliability, and prevent costly quality and operational issues in complex electronics manufacturing.',
}

export const PROBLEM_LABELS: Record<string, string> = {
  'manufacturing-bottlenecks': 'Electronics Manufacturing Bottlenecks',
  'supplier-inconsistency': 'Supplier Inconsistency',
  'qa-failures': 'QA Failures',
  'production-delays': 'Production Delays',
  'component-shortages': 'Component Shortages',
  'rework-scrap-cost': 'Rework and Scrap Cost',
  'compliance-risk': 'Compliance and Reliability Risk',
  'scaling-complexity': 'Scaling Manufacturing Complexity',
  'cost-leakage': 'Cost Leakage from Production Inefficiencies',
  'poor-manufacturing-decisions': 'Hidden Impact of Poor Manufacturing Decisions',
}

export const TARGET_AUDIENCES = [
  'Electronics Engineers',
  'Engineering Managers',
  'Operations Directors',
  'Supply Chain Managers',
  'Product Development Managers',
  'Quality Assurance Directors',
  'Procurement Officers',
  'VPs of Engineering',
  'Founders / CTOs',
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
  'manufacturing-bottlenecks': {
    stat1: 'A single SMT line stoppage delays downstream assembly by 3–5 days on average in mid-volume EMS programs',
    stat2: 'EMS facilities running three or more contract assembly partners experience 40–60% more production stoppages per program',
    stat3: 'Bottlenecks in PCB design handoff, component staging, or AOI sequencing affect 65–75% of dependent production phases',
    cost1: '3–5 day downstream assembly delays per SMT stoppage event',
    cost2: '40–60% more stoppages when using multiple disconnected assembly partners',
    consequence: 'The bottleneck is rarely where the floor team is looking. It is upstream — in design files, component kitting, or handoff timing between engineering and production.',
  },
  'supplier-inconsistency': {
    stat1: 'Component suppliers with inconsistent lead times cause 35–55% of unplanned PCB production holds in complex programs',
    stat2: 'Programs sourcing from 4 or more tier-2 distributors experience 3x more last-minute substitution events than single-source programs',
    stat3: 'Supplier inconsistency causes 28–42% of first-article failures in electronics assembly programs',
    cost1: '35–55% of unplanned production holds trace to supplier lead time inconsistency',
    cost2: '3x more last-minute substitution events with 4+ distributor relationships',
    consequence: 'The supplier problem does not show up at order placement. It shows up at kitting — when the component is either missing, out of spec, or a non-approved substitute.',
  },
  'qa-failures': {
    stat1: 'QA failures discovered post-assembly cost 6–10x more to correct than failures caught during in-process inspection',
    stat2: 'Electronics programs without formal AOI and X-ray inspection experience 15–25% higher field return rates',
    stat3: 'Missing or incomplete IPC acceptance criteria causes 1 in 3 first-article rejections in contract assembly programs',
    cost1: '6–10x higher correction cost when QA failures are found post-assembly',
    cost2: '15–25% higher field return rates without formal AOI and X-ray inspection',
    consequence: 'A QA failure caught during production costs a rework cycle. The same failure caught in the field costs a recall, warranty claim, and customer confidence.',
  },
  'production-delays': {
    stat1: 'PCB production delays extend product launch timelines by an average of 18–30% in hardware development programs',
    stat2: 'Late PCB delivery causes downstream firmware integration and test teams to idle at $1,500–$4,000/day per team',
    stat3: '71% of hardware product launch overruns trace to PCB manufacturing or assembly delays, not software or mechanical issues',
    cost1: '18–30% average timeline extension from PCB production delays',
    cost2: '$1,500–$4,000/day in idle downstream team costs per delayed PCB delivery',
    consequence: 'The PCB delay is not the final cost. Every idle firmware team, missed regulatory test window, and pushed launch date compounds the number.',
  },
  'component-shortages': {
    stat1: 'Component shortages force last-minute design respins in 38% of electronics programs, adding 6–14 weeks to schedules',
    stat2: 'Programs without approved alternate component strategies face 2.8x more production holds during allocation events',
    stat3: 'Spot market sourcing during shortages increases component cost by 180–400% above contracted pricing on average',
    cost1: '38% of programs require design respins due to component shortages, adding 6–14 weeks',
    cost2: '180–400% component cost premium when sourcing on the spot market during allocation events',
    consequence: 'The shortage is predictable for components on long lead time. The cost is not in the part — it is in the respin, the retest, and the schedule that no longer matches the market window.',
  },
  'rework-scrap-cost': {
    stat1: 'Rework in electronics assembly accounts for 4–11% of total production cost in programs without robust in-process inspection',
    stat2: 'A single BGA rework event on a complex PCB requires 3–6 hours of technician time and risks additional pad or via damage',
    stat3: 'Scrap rates in poorly managed EMS programs run 6–14% of board input — compared to 1–3% in disciplined operations',
    cost1: '4–11% of total production cost lost to rework without strong in-process inspection',
    cost2: '3–6 technician hours per BGA rework event with risk of compounding board damage',
    consequence: 'Rework does not just cost the repair time. It costs the board, the component, the test cycle, and the schedule slot — all of which are non-recoverable at volume.',
  },
  'compliance-risk': {
    stat1: 'Non-compliance with IPC, ISO 9001, or ITAR requirements causes program holds averaging 4–8 weeks to resolve',
    stat2: 'Electronics products without traceability documentation have a 3x higher regulatory audit failure rate',
    stat3: 'ITAR violations in EMS programs carry penalties ranging from $250,000 to $1,000,000 per incident plus debarment risk',
    cost1: '4–8 week program holds from IPC, ISO, or ITAR compliance gaps',
    cost2: 'ITAR violation penalties of $250,000–$1,000,000 per incident plus potential debarment',
    consequence: 'Compliance is not a documentation exercise. In regulated manufacturing — medical, defense, aerospace — it is the gate between production and shipment, and between business and liability.',
  },
  'scaling-complexity': {
    stat1: 'Electronics programs transitioning from prototype to volume production experience 45–65% more defect events per board in the first three production runs',
    stat2: 'Programs scaling from 50 to 5,000 units without a formal NPI process average 8–16 weeks of additional schedule to stabilize yield',
    stat3: 'Engineering change orders during production scaling increase per-unit cost by 12–28% versus programs with frozen designs at production entry',
    cost1: '45–65% more defect events per board in the first three volume production runs',
    cost2: '8–16 additional weeks to stabilize yield without a formal NPI process',
    consequence: 'The prototype worked. The first production run will not match it unless the design was validated for manufacturing — not just for function.',
  },
  'cost-leakage': {
    stat1: 'Hidden cost leakage in electronics manufacturing averages 8–18% above budgeted production cost across mid-complexity programs',
    stat2: 'Programs without clear BOM cost controls experience component substitution costs of $15,000–$80,000 per program from untracked changes',
    stat3: 'Inefficient test coverage in EMS programs causes 20–35% of field failures to be shipping-escape defects that passed internal inspection',
    cost1: '8–18% average hidden cost overrun above budgeted production cost',
    cost2: '$15,000–$80,000 in untracked BOM substitution cost per program',
    consequence: 'Cost leakage in electronics manufacturing is not a line item. It accumulates through substitutions, rework cycles, untested escapes, and schedule extensions — none of which appear in the original estimate.',
  },
  'poor-manufacturing-decisions': {
    stat1: 'Early-stage PCB design decisions that ignore DFM guidelines increase production cost by 22–40% versus DFM-reviewed designs',
    stat2: 'Programs that select EMS partners on price alone experience 2.5x more mid-program quality events than those that evaluate process capability',
    stat3: 'Choosing the wrong layer stack-up, trace width, or via type in PCB design adds an average of $4–$18 per board in avoidable fabrication cost',
    cost1: '22–40% higher production cost from PCB designs that bypass DFM review',
    cost2: '2.5x more mid-program quality events when EMS selection is based on price alone',
    consequence: 'The manufacturing decision made at the design stage determines the production outcome. A low-cost board that fails in the field is not cheap — it is the most expensive decision in the program.',
  },
}
