import type { ContentQualityScore, ContentVariation } from './types'
import { BANNED_WORDS } from './companyProfile'

interface ScoreInput {
  hook: string
  body: string
  cta: string
  variation: ContentVariation
}

export function scoreContent(input: ScoreInput): ContentQualityScore {
  const fullText = `${input.hook} ${input.body} ${input.cta}`.toLowerCase()

  // Pain clarity: does it name a specific operational problem?
  const painIndicators = [
    'cost', 'damage', 'loss', 'waste', 'delay', 'fail', 'inefficien',
    'oversize', 'surcharge', 'penalty', 'slow', 'return', 'defect',
    'break', 'leak', 'crush', 'transit', 'margin', 'carrier', 'freight',
  ]
  const painMatches = painIndicators.filter(p => fullText.includes(p)).length
  const painClarity = Math.min(20, Math.round((painMatches / 6) * 20))

  // Financial consequence: numbers, dollar signs, percentages
  const hasNumbers = /\$[\d,]+|[\d]+%|[\d,]+ per|[\d]+ shipment|\$[\d]+k/i.test(fullText)
  const hasFinancialWords = ['cost', 'spend', 'budget', 'margin', 'saving', 'revenue', 'expense', 'rate'].some(w => fullText.includes(w))
  const financialConsequence = hasNumbers ? 20 : hasFinancialWords ? 14 : 8

  // Operational tension: does it create contrast or a problem/solution arc?
  const tensionPhrases = [
    'most companies', 'the real problem', 'what actually', 'the issue isn',
    'stop', 'not because', 'the mistake', 'wrong assumption', 'hidden',
    'nobody talks about', 'what happens when', 'before it', 'instead',
    'here is what', 'the fix', 'that is why',
  ]
  const tensionMatches = tensionPhrases.filter(p => fullText.includes(p)).length
  const operationalTension = Math.min(20, 10 + tensionMatches * 3)

  // CTA clarity
  const ctaText = input.cta.toLowerCase()
  const hasCta = ctaText.length > 10
  const hasActionVerb = ['comment', 'share', 'tag', 'reply', 'click', 'learn', 'download', 'connect', 'reach', 'schedule', 'audit', 'check', 'start', 'review'].some(v => ctaText.includes(v))
  const ctaClarity = hasCta && hasActionVerb ? 20 : hasCta ? 14 : 6

  // Writing compliance: no banned words, concise sentences
  const bannedFound = BANNED_WORDS.filter(w => fullText.includes(w.toLowerCase()))
  const writingCompliance = Math.max(0, 20 - bannedFound.length * 5)

  const total = painClarity + financialConsequence + operationalTension + ctaClarity + writingCompliance

  const breakdown = [
    bannedFound.length > 0 ? `Banned words found: ${bannedFound.join(', ')}` : 'No banned words detected.',
    !hasNumbers ? 'Add specific numbers (costs, percentages, volumes) to increase financial impact.' : 'Financial metrics present.',
    tensionMatches < 2 ? 'Strengthen operational tension with a clear problem/assumption contrast.' : 'Operational tension is clear.',
  ].join(' ')

  return { total, painClarity, financialConsequence, operationalTension, ctaClarity, writingCompliance, breakdown }
}

export function getScoreColor(score: number): string {
  if (score >= 85) return 'text-emerald-600'
  if (score >= 70) return 'text-amber-600'
  return 'text-red-500'
}

export function getScoreLabel(score: number): string {
  if (score >= 90) return 'Excellent'
  if (score >= 80) return 'Strong'
  if (score >= 70) return 'Good'
  if (score >= 60) return 'Needs Work'
  return 'Weak'
}

export function getScoreBg(score: number): string {
  if (score >= 85) return 'bg-emerald-50 border-emerald-200'
  if (score >= 70) return 'bg-amber-50 border-amber-200'
  return 'bg-red-50 border-red-200'
}
