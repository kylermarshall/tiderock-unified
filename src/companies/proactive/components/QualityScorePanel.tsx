import type { QualityScore } from '../types'

interface Props {
  score: QualityScore
}

function ScoreBar({ label, value }: { label: string; value: number }) {
  const color = value >= 85 ? 'bg-green-500' : value >= 70 ? 'bg-proactive-blue' : 'bg-amber-500'
  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs text-proactive-muted">{label}</span>
        <span className="text-xs font-mono text-proactive-text">{value}</span>
      </div>
      <div className="h-1.5 bg-proactive-steel rounded-full overflow-hidden">
        <div className={`h-full rounded-full transition-all ${color}`} style={{ width: `${value}%` }} />
      </div>
    </div>
  )
}

export default function QualityScorePanel({ score }: Props) {
  const ringColor = score.overall >= 85 ? '#22c55e' : score.overall >= 70 ? '#1D6AE5' : '#f59e0b'

  return (
    <div className="bg-proactive-charcoal border border-proactive-border rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs font-semibold text-proactive-muted uppercase tracking-wider">Content Quality Score</p>
        <div className="flex items-center gap-2">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white"
            style={{ background: `conic-gradient(${ringColor} ${score.overall * 3.6}deg, #21262D 0deg)` }}
          >
            <div className="w-7 h-7 rounded-full bg-proactive-charcoal flex items-center justify-center">
              <span className="text-xs font-bold" style={{ color: ringColor }}>{score.overall}</span>
            </div>
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
