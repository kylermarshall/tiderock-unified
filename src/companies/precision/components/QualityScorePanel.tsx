import { QualityScore } from '../types'

interface Props {
  score: QualityScore
}

const DIMENSIONS = [
  { key: 'painClarity', label: 'Pain Clarity' },
  { key: 'financialImpact', label: 'Financial Impact' },
  { key: 'operationalTension', label: 'Operational Tension' },
  { key: 'ctaStrength', label: 'CTA Strength' },
  { key: 'brandAlignment', label: 'Brand Alignment' },
] as const

function ScoreBar({ value }: { value: number }) {
  const pct = (value / 10) * 100
  const color = value >= 8 ? 'bg-green-500' : value >= 6 ? 'bg-pam-accent' : 'bg-red-500'
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-pam-steel rounded-full overflow-hidden">
        <div className={`h-full rounded-full transition-all duration-500 ${color}`} style={{ width: `${pct}%` }} />
      </div>
      <span className="text-xs font-mono text-gray-300 w-8 text-right">{value.toFixed(1)}</span>
    </div>
  )
}

export default function QualityScorePanel({ score }: Props) {
  const overall = score.overall
  const color = overall >= 8 ? 'text-green-400' : overall >= 6 ? 'text-pam-muted' : 'text-red-400'

  return (
    <div className="bg-pam-charcoal border border-pam-border rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-white">Content Quality Score</h3>
        <span className={`text-2xl font-bold font-mono ${color}`}>
          {overall.toFixed(1)}<span className="text-sm text-gray-500">/10</span>
        </span>
      </div>
      <div className="space-y-2.5">
        {DIMENSIONS.map(({ key, label }) => (
          <div key={key}>
            <div className="flex justify-between mb-1">
              <span className="text-xs text-gray-400">{label}</span>
            </div>
            <ScoreBar value={score[key]} />
          </div>
        ))}
      </div>
    </div>
  )
}
