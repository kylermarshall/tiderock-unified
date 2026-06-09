import type { QualityScore, PlatformInputs, ToneType } from '../types'

export function scoreContent(
  inputs: PlatformInputs,
  hasDataPoints: boolean,
  hasCTA: boolean,
  hasConsequence: boolean,
  _wordCount: number,
): QualityScore {
  const toneBonus: Record<ToneType, number> = {
    'professional': 5,
    'direct': 8,
    'educational': 4,
    'contrarian': 9,
    'data-driven': 10,
  }

  // Full Circle-specific scoring: data security and compliance specificity bonuses
  const highRiskProblems = [
    'data-exposure-risk',
    'chain-of-custody-failures',
    'compliance-gaps',
    'device-wiping-assumptions',
    'informal-disposal-risk',
  ]
  const specificityBonus = highRiskProblems.includes(inputs.problem) ? 5 : 0

  const painClarity = inputs.problem ? 80 + specificityBonus + Math.floor(Math.random() * 12) : 60
  const financialImpact = hasDataPoints ? 76 + Math.floor(Math.random() * 18) : 50
  const operationalTension = hasConsequence ? 78 + Math.floor(Math.random() * 16) : 54
  const ctaStrength = hasCTA ? 73 + Math.floor(Math.random() * 20) : 43
  const brandAlignment = 84 + Math.floor(Math.random() * 12)

  const toneAdd = toneBonus[inputs.tone as ToneType] || 5
  const overall = Math.min(99, Math.round(
    (painClarity + financialImpact + operationalTension + ctaStrength + brandAlignment) / 5 + toneAdd
  ))

  return { overall, painClarity, financialImpact, operationalTension, ctaStrength, brandAlignment }
}
