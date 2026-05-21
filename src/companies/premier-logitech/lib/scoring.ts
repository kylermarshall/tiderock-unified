import { ContentAngle, QualityScore } from '../types'
import { COMPANY } from './companyProfile'

interface ScoringInputs {
  audience: string
  painPoint: string
  angle: ContentAngle
}

const COST_KEYWORDS = [
  'cost', 'loss', 'margin', 'waste', 'delay', 'inefficiency', 'leak',
  'expense', 'spend', 'returns', 'freight', 'damage', 'inventory', 'repair',
  'shrinkage', 'chargeback', 'penalty', 'downtime', 'backorder',
]

const SPECIFIC_ROLES = [
  'director', 'manager', 'vp ', 'vice president', 'coo', 'cfo', 'head of',
  'lead', 'analyst', 'operations', 'supply chain', 'warehouse', 'logistics',
  'procurement', 'fulfillment', 'distribution', 'reverse logistics',
]

const HIGH_PAIN_ANGLES: ContentAngle[] = ['hidden-cost-leak', 'system-failure', 'risk-warning']
const FINANCIAL_ANGLES: ContentAngle[] = ['hidden-cost-leak', 'risk-warning', 'before-after-improvement']

export function calculateScore(inputs: ScoringInputs): QualityScore {
  const a = inputs.audience.toLowerCase()
  const p = inputs.painPoint.toLowerCase()
  const angle = inputs.angle

  const genericFound = COMPANY.bannedWords.filter(t => p.includes(t) || a.includes(t))

  // Specificity (max 20)
  let specificity = 6
  if (p.length > 8) specificity += 3
  if (p.length > 18) specificity += 3
  if (/\d/.test(p)) specificity += 4
  if (p.split(' ').length >= 3) specificity += 4
  specificity = Math.min(20, specificity)

  // Pain Intensity (max 20)
  let painIntensity = 9
  if (HIGH_PAIN_ANGLES.includes(angle)) painIntensity += 6
  if (COST_KEYWORDS.some(k => p.includes(k))) painIntensity += 5
  painIntensity = Math.min(20, painIntensity)

  // Financial Relevance (max 20)
  let financialRelevance = 7
  if (FINANCIAL_ANGLES.includes(angle)) financialRelevance += 7
  if (COST_KEYWORDS.some(k => p.includes(k))) financialRelevance += 6
  financialRelevance = Math.min(20, financialRelevance)

  // Clarity (max 20)
  let clarity = 9
  if (a.length > 5) clarity += 3
  if (SPECIFIC_ROLES.some(r => a.includes(r))) clarity += 5
  if (p.length > 10) clarity += 3
  clarity = Math.min(20, clarity)

  // Non-generic language (max 20)
  const nonGenericLanguage = Math.max(4, 20 - genericFound.length * 5)

  const overall = Math.min(
    100,
    specificity + painIntensity + financialRelevance + clarity + nonGenericLanguage
  )

  const suggestions: string[] = []

  if (specificity < 16) {
    suggestions.push(
      'Add specificity to your pain point — include a metric, a process name, or a dollar figure (e.g., "returns processing delays over 72 hours").'
    )
  }
  if (painIntensity < 15) {
    suggestions.push(
      'Increase pain intensity by selecting a higher-tension angle: Hidden Cost Leak, System Failure, or Risk Warning.'
    )
  }
  if (financialRelevance < 15) {
    suggestions.push(
      'Connect the pain point to a financial outcome — cost, margin, or budget impact — to increase relevance to decision-makers.'
    )
  }
  if (clarity < 16) {
    suggestions.push(
      'Define your target audience with a specific title (e.g., "VP of Operations" or "warehouse director") for sharper targeting.'
    )
  }
  if (genericFound.length > 0) {
    suggestions.push(
      `Remove generic terms: "${genericFound.slice(0, 2).join('", "')}". Replace with operational specifics.`
    )
  }

  const fallbacks = [
    'Add a specific dollar figure or percentage to the pain point for maximum impact with decision-makers.',
    'Try the Contrarian Take angle to generate unexpected tension and drive higher engagement.',
    'Reference a specific industry segment in the audience field for sharper targeting.',
    'Include a process name or system reference in the pain point for stronger operational specificity.',
  ]

  let fi = 0
  while (suggestions.length < 2 && fi < fallbacks.length) {
    suggestions.push(fallbacks[fi++])
  }

  return {
    overall,
    breakdown: { specificity, painIntensity, financialRelevance, clarity, nonGenericLanguage },
    suggestions: suggestions.slice(0, 3),
  }
}
