import type { QualityScore } from '../types'

interface QualityScoreProps {
  score: QualityScore
}

const ScoreBar = ({ label, value }: { label: string; value: number }) => {
  const color = value >= 80 ? 'bg-emerald-500' : value >= 65 ? 'bg-amber-400' : 'bg-red-400'
  return (
    <div className="space-y-1">
      <div className="flex justify-between items-center">
        <span className="text-xs text-slate-500">{label}</span>
        <span className="text-xs font-semibold text-slate-700">{value}</span>
      </div>
      <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${color}`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  )
}

export function QualityScorePanel({ score }: QualityScoreProps) {
  const overallColor = score.overall >= 80 ? 'text-emerald-600' : score.overall >= 65 ? 'text-amber-500' : 'text-red-500'
  const ringColor = score.overall >= 80 ? 'border-emerald-400' : score.overall >= 65 ? 'border-amber-400' : 'border-red-400'

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5">
      <div className="flex items-center gap-4 mb-4">
        <div className={`w-16 h-16 rounded-full border-4 ${ringColor} flex items-center justify-center flex-shrink-0`}>
          <span className={`text-xl font-bold ${overallColor}`}>{score.overall}</span>
        </div>
        <div>
          <p className="font-semibold text-slate-800">Content Quality Score</p>
          <p className="text-sm text-slate-500">Based on pain clarity, impact, tension, and CTA strength</p>
        </div>
      </div>
      <div className="space-y-2.5">
        <ScoreBar label="Pain Clarity" value={score.painClarity} />
        <ScoreBar label="Financial Impact" value={score.financialImpact} />
        <ScoreBar label="Operational Tension" value={score.operationalTension} />
        <ScoreBar label="CTA Strength" value={score.ctaStrength} />
        <ScoreBar label="Brand Alignment" value={score.brandAlignment} />
      </div>
    </div>
  )
}
