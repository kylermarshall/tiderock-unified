import type { QualityScore, PlatformInputs, ToneType } from '../types'

const PROBLEMS = [
  'machining-bottlenecks','tight-tolerance-failures','production-delays','scrap-rework-cost',
  'material-waste','process-downtime','cost-leakage','precision-inconsistency',
  'scaling-operations','tool-wear-inefficiency',
]
const TONES: ToneType[] = ['professional','direct','educational','contrarian','data-driven']

function seededFloat(a: number, b: number): number {
  const x = Math.sin(a * 127.1 + b * 311.7) * 43758.5453
  return x - Math.floor(x)
}

function rand(min: number, max: number, salt1: number, salt2: number): number {
  return parseFloat((min + seededFloat(salt1, salt2) * (max - min)).toFixed(1))
}

export function scoreContent(
  inputs: PlatformInputs,
  hasDataPoints: boolean,
  hasCTA: boolean,
  hasConsequence: boolean,
  _wordCount: number,
): QualityScore {
  const toneBonus: Record<ToneType, number> = {
    'professional': 0.3,
    'direct': 0.5,
    'educational': 0.2,
    'contrarian': 0.6,
    'data-driven': 0.7,
  }

  const pIdx = (PROBLEMS.indexOf(inputs.problem) + 1) || 5
  const tIdx = (TONES.indexOf(inputs.tone) + 1) || 1

  const painClarity = rand(inputs.problem ? 8.1 : 5.5, inputs.problem ? 9.6 : 6.5, pIdx, tIdx + 10)
  const financialImpact = rand(hasDataPoints ? 7.8 : 4.8, hasDataPoints ? 9.5 : 6.0, pIdx + tIdx, tIdx + 20)
  const operationalTension = rand(hasConsequence ? 8.0 : 5.2, hasConsequence ? 9.4 : 6.4, pIdx * 3, pIdx + 30)
  const ctaStrength = rand(hasCTA ? 7.5 : 4.2, hasCTA ? 9.2 : 5.5, tIdx * 7, pIdx + 40)
  const brandAlignment = rand(8.3, 9.7, pIdx + tIdx * 2, tIdx + 50)

  const toneAdd = toneBonus[inputs.tone] || 0.3
  const overall = parseFloat(
    Math.min(9.9, (painClarity + financialImpact + operationalTension + ctaStrength + brandAlignment) / 5 + toneAdd).toFixed(1)
  )

  return { overall, painClarity, financialImpact, operationalTension, ctaStrength, brandAlignment }
}
