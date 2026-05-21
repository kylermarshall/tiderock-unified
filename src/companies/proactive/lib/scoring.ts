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

  const painClarity = inputs.problem ? 82 + Math.floor(Math.random() * 12) : 60
  const financialImpact = hasDataPoints ? 78 + Math.floor(Math.random() * 16) : 52
  const operationalTension = hasConsequence ? 80 + Math.floor(Math.random() * 15) : 55
  const ctaStrength = hasCTA ? 75 + Math.floor(Math.random() * 18) : 45
  const brandAlignment = 85 + Math.floor(Math.random() * 10)

  const toneAdd = toneBonus[inputs.tone] || 5
  const overall = Math.min(99, Math.round(
    (painClarity + financialImpact + operationalTension + ctaStrength + brandAlignment) / 5 + toneAdd
  ))

  return { overall, painClarity, financialImpact, operationalTension, ctaStrength, brandAlignment }
}
