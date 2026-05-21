import type { QualityScore } from '../types'

interface QualityScorePanelProps {
  score: QualityScore
}

function ScoreBar({ label, value }: { label: string; value: number }) {
  const color =
    value >= 85 ? 'bg-green-500' : value >= 70 ? 'bg-pmt-blue' : value >= 55 ? 'bg-yellow-500' : 'bg-red-500'

  return (
    <div className="space-y-1">
      <div className="flex justify-between items-center">
        <span className="text-xs text-slate-400">{label}</span>
        <span className="text-xs font-semibold text-white">{value}</span>
      </div>
      <div className="h-1.5 bg-pmt-steel/40 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${color}`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  )
}

export function QualityScorePanel({ score }: QualityScorePanelProps) {
  const overallColor =
    score.overall >= 85 ? 'text-green-400' : score.overall >= 70 ? 'text-pmt-sky' : score.overall >= 55 ? 'text-yellow-400' : 'text-red-400'
  const ringColor =
    score.overall >= 85 ? 'border-green-500/50' : score.overall >= 70 ? 'border-pmt-blue/50' : score.overall >= 55 ? 'border-yellow-500/50' : 'border-red-500/50'

  return (
    <div className="bg-pmt-charcoal border border-pmt-steel/40 rounded-lg p-4 space-y-4">
      <div className="flex items-center gap-4">
        <div className={`w-16 h-16 rounded-full border-2 ${ringColor} flex items-center justify-center flex-shrink-0`}>
          <span className={`text-xl font-bold ${overallColor}`}>{score.overall}</span>
        </div>
        <div>
          <div className="text-sm font-semibold text-white">Content Quality Score</div>
          <div className="text-xs text-slate-400 mt-0.5">
            {score.overall >= 85
              ? 'High signal — publish-ready'
              : score.overall >= 70
              ? 'Strong — minor refinement suggested'
              : score.overall >= 55
              ? 'Moderate — review before publishing'
              : 'Low — significant improvement needed'}
          </div>
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
