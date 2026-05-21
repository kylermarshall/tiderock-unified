import type { ContentScore, PainPoint, ContentAngle, Tone } from '../types'

interface ScoreInputs {
  painPoint: PainPoint
  angle: ContentAngle
  tone: Tone
  hasSpecificData: boolean
  hasCTA: boolean
  hasFinancialConsequence: boolean
  hasOperationalDetail: boolean
  wordCount: number
  platform: string
}

const PAIN_CLARITY_SCORES: Record<PainPoint, number> = {
  spoilage: 23,
  margin_loss: 22,
  price_volatility: 20,
  over_ordering: 21,
  cold_chain: 19,
  supply_inconsistency: 22,
  waste_inventory: 20,
  lead_time: 18,
  logistics: 17,
  quality_inconsistency: 19,
}

const ANGLE_FINANCIAL_SCORES: Record<ContentAngle, number> = {
  financial_impact: 24,
  data_driven: 22,
  challenge_assumption: 20,
  process_breakdown: 18,
  operator_story: 17,
}

const TONE_TENSION_SCORES: Record<Tone, number> = {
  contrarian: 23,
  direct: 22,
  founder: 21,
  authoritative: 19,
  educational: 17,
}

export function scoreContent(inputs: ScoreInputs): ContentScore {
  const painClarity = Math.min(25, PAIN_CLARITY_SCORES[inputs.painPoint])
  const financialImpact = Math.min(
    25,
    ANGLE_FINANCIAL_SCORES[inputs.angle] + (inputs.hasFinancialConsequence ? 2 : 0) + (inputs.hasSpecificData ? 1 : 0)
  )
  const operationalTension = Math.min(
    25,
    TONE_TENSION_SCORES[inputs.tone] + (inputs.hasOperationalDetail ? 2 : 0)
  )
  const ctaStrength = Math.min(25, inputs.hasCTA ? 22 : 10)

  const total = painClarity + financialImpact + operationalTension + ctaStrength

  const label: ContentScore['label'] =
    total >= 88 ? 'Excellent' : total >= 74 ? 'Strong' : total >= 58 ? 'Fair' : 'Weak'

  const improvements: string[] = []

  if (painClarity < 20) {
    improvements.push('Name the specific operational failure more precisely in the opening.')
  }
  if (financialImpact < 20) {
    improvements.push('Add a dollar figure or percentage to quantify the cost of inaction.')
  }
  if (operationalTension < 20) {
    improvements.push('Increase tension by naming the wrong assumption operators currently hold.')
  }
  if (ctaStrength < 20) {
    improvements.push('Make the CTA action-specific — tie it to a calculable outcome, not a generic contact.')
  }
  if (inputs.wordCount > 300 && inputs.platform !== 'youtube' && inputs.platform !== 'facebook') {
    improvements.push('Reduce word count. Operators stop reading after 200 words on most platforms.')
  }
  if (!inputs.hasSpecificData) {
    improvements.push('Add one concrete data point — a percentage, dollar figure, or timeframe.')
  }
  if (improvements.length === 0) {
    improvements.push('Content meets all quality criteria. Test with A/B hook variation.')
  }

  return { total, painClarity, financialImpact, operationalTension, ctaStrength, label, improvements }
}

export function getScoreColor(label: ContentScore['label']): string {
  switch (label) {
    case 'Excellent': return 'text-emerald-700 bg-emerald-50 border-emerald-200'
    case 'Strong': return 'text-blue-700 bg-blue-50 border-blue-200'
    case 'Fair': return 'text-amber-700 bg-amber-50 border-amber-200'
    case 'Weak': return 'text-red-700 bg-red-50 border-red-200'
  }
}

export function getScoreBarColor(label: ContentScore['label']): string {
  switch (label) {
    case 'Excellent': return 'bg-emerald-500'
    case 'Strong': return 'bg-blue-500'
    case 'Fair': return 'bg-amber-500'
    case 'Weak': return 'bg-red-500'
  }
}
