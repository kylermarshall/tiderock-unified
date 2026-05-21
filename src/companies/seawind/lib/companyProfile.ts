import type { PainPoint, ContentAngle, Tone } from '../types'

export const COMPANY = {
  name: 'Sea Wind Foods',
  tagline: 'Reliable seafood supply for foodservice operations',
  positioning:
    'Sea Wind Foods helps foodservice businesses maintain reliable seafood supply, reduce spoilage, and manage cost volatility in a highly perishable category.',
  website: 'seawindfoods.com',
  cta: {
    audit: 'Request a supply audit at seawindfoods.com',
    consult: 'Schedule a sourcing consultation at seawindfoods.com',
    download: 'Download the spoilage cost calculator at seawindfoods.com',
    contact: 'Contact our supply team at seawindfoods.com',
    learn: 'Learn how Sea Wind Foods structures supply contracts at seawindfoods.com',
  },
}

export const BANNED_WORDS = [
  'fresh',
  'premium',
  'high quality',
  'delicious',
  'best-in-class',
  'world-class',
  'solutions',
]

export const PAIN_POINT_LABELS: Record<PainPoint, string> = {
  spoilage: 'Seafood Spoilage & Perishability',
  supply_inconsistency: 'Supply Inconsistency & Availability Gaps',
  price_volatility: 'Price Volatility',
  waste_inventory: 'Inventory Waste',
  cold_chain: 'Cold Chain Breakdowns',
  over_ordering: 'Over-Ordering & Under-Ordering',
  margin_loss: 'Margin Loss from Poor Sourcing',
  logistics: 'Logistics Complexity',
  lead_time: 'Lead Time Unpredictability',
  quality_inconsistency: 'Quality Inconsistency Across Suppliers',
}

export const ANGLE_LABELS: Record<ContentAngle, string> = {
  challenge_assumption: 'Challenge a Common Assumption',
  data_driven: 'Data-Driven Insight',
  operator_story: 'Operator Scenario',
  financial_impact: 'Financial Impact Focus',
  process_breakdown: 'Process Breakdown',
}

export const TONE_LABELS: Record<Tone, string> = {
  authoritative: 'Authoritative',
  direct: 'Direct',
  contrarian: 'Contrarian',
  educational: 'Educational',
  founder: 'Founder Voice',
}

// Core data: pain points × angles × tones → content building blocks
export const PAIN_STATS: Record<PainPoint, { stat: string; impact: string }[]> = {
  spoilage: [
    { stat: '4–10% of seafood ordered never reaches a plate', impact: 'direct food cost loss' },
    { stat: 'Average walk-in temperature variance is 3–6°F above spec', impact: 'accelerates spoilage by 30–50%' },
    { stat: 'Spoilage accounts for 15–25% of total seafood cost variance', impact: 'margin compression' },
  ],
  supply_inconsistency: [
    { stat: '86s on seafood can cost a restaurant $800–$2,400 per incident in lost covers', impact: 'revenue loss' },
    { stat: 'Operators using single-source seafood suppliers face 2–3x more stockouts', impact: 'menu reliability risk' },
    { stat: '1 in 4 seafood deliveries arrives outside spec or short on quantity', impact: 'kitchen disruption' },
  ],
  price_volatility: [
    { stat: 'Salmon prices fluctuated 28% in a recent 12-month period', impact: 'food cost unpredictability' },
    { stat: 'Spot market purchasing adds 12–20% cost vs. contracted supply', impact: 'margin erosion' },
    { stat: 'Operators without contracts overpay by $1.20–$2.80/lb during peak demand', impact: 'direct cost increase' },
  ],
  waste_inventory: [
    { stat: 'FIFO violations in seafood result in 6–12% additional waste', impact: 'food cost loss' },
    { stat: 'Over-purchased seafood loses 40–70% of value after day 2 in storage', impact: 'sunk cost' },
    { stat: 'Inventory shrink from mishandling averages 3–5% per delivery cycle', impact: 'lost revenue' },
  ],
  cold_chain: [
    { stat: 'Each 1°F increase above target temp reduces shelf life by 1 day', impact: 'accelerated spoilage' },
    { stat: 'Cold chain failures account for 22% of seafood rejections at delivery', impact: 'waste and supply gaps' },
    { stat: 'A single cold chain event can result in $600–$3,000 in unusable product', impact: 'direct loss' },
  ],
  over_ordering: [
    { stat: 'Over-ordering seafood by 10% increases net cost per usable pound by 8–14%', impact: 'cost inflation' },
    { stat: '60% of operators rely on par levels that are 6+ months old', impact: 'structural over-ordering' },
    { stat: 'Just-in-case ordering adds $400–$1,200/month in unrecoverable seafood cost', impact: 'waste spend' },
  ],
  margin_loss: [
    { stat: 'Actual seafood food cost runs 4–9 points above theoretical for most operators', impact: 'margin gap' },
    { stat: 'Sourcing from 3+ uncoordinated suppliers increases cost per usable pound by 15%', impact: 'hidden overhead' },
    { stat: 'Operators who audit seafood sourcing annually recover $18,000–$45,000/year', impact: 'recaptured margin' },
  ],
  logistics: [
    { stat: 'Each additional seafood SKU adds 12–18 minutes of weekly receiving labor', impact: 'labor cost creep' },
    { stat: 'Split deliveries across multiple suppliers increase receiving errors by 40%', impact: 'quality control risk' },
    { stat: 'Rescheduled seafood deliveries cost $200–$500 per incident in handling', impact: 'operational cost' },
  ],
  lead_time: [
    { stat: 'Average lead times for specialty seafood have extended 30–45% since 2022', impact: 'menu planning disruption' },
    { stat: 'Operators placing 48-hour seafood orders face 2x higher stockout frequency', impact: 'availability gaps' },
    { stat: 'Reactive ordering for missed lead times costs 18–25% more per unit', impact: 'cost spike' },
  ],
  quality_inconsistency: [
    { stat: '1 in 3 seafood deliveries shows spec variance beyond acceptable range', impact: 'portion cost instability' },
    { stat: 'Inconsistent portioning from poor specs adds $0.40–$1.20 per plate in real food cost', impact: 'margin loss' },
    { stat: 'Quality rejections requiring re-orders add 2–3 days of supply gap', impact: 'kitchen disruption' },
  ],
}

export function pickStat(painPoint: PainPoint, seed: number): { stat: string; impact: string } {
  const stats = PAIN_STATS[painPoint]
  return stats[seed % stats.length]
}
