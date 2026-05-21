import type { ContentScore } from '../types'
import { getScoreColor, getScoreBarColor } from '../lib/scoring'
import { clsx } from 'clsx'

interface Props {
  score: ContentScore
}

const DIMENSIONS = [
  { key: 'painClarity', label: 'Pain Clarity' },
  { key: 'financialImpact', label: 'Financial Impact' },
  { key: 'operationalTension', label: 'Op. Tension' },
  { key: 'ctaStrength', label: 'CTA Strength' },
] as const

export default function ScoreDisplay({ score }: Props) {
  const barColor = getScoreBarColor(score.label)
  const badgeColor = getScoreColor(score.label)

  return (
    <div className="card p-5 space-y-4">
      <div className="flex items-center justify-between">
        <span className="section-title mb-0">Content Quality Score</span>
        <span className={clsx('score-badge border', badgeColor)}>
          {score.total}/100 · {score.label}
        </span>
      </div>

      {/* Score bar */}
      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
        <div
          className={clsx('h-full rounded-full transition-all duration-500', barColor)}
          style={{ width: `${score.total}%` }}
        />
      </div>

      {/* Dimension breakdown */}
      <div className="grid grid-cols-2 gap-2">
        {DIMENSIONS.map((d) => {
          const val = score[d.key]
          const pct = (val / 25) * 100
          return (
            <div key={d.key} className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-slate-500">{d.label}</span>
                <span className="font-medium text-slate-700">{val}/25</span>
              </div>
              <div className="h-1.5 bg-slate-100 rounded-full">
                <div
                  className={clsx('h-full rounded-full', barColor, 'opacity-70')}
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          )
        })}
      </div>

      {/* Improvement suggestions */}
      {score.improvements.length > 0 && (
        <div className="space-y-1.5 pt-1 border-t border-slate-100">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Improvement Notes</p>
          <ul className="space-y-1">
            {score.improvements.map((imp, i) => (
              <li key={i} className="flex gap-2 text-xs text-slate-600">
                <span className="text-amber-500 mt-0.5 shrink-0">→</span>
                <span>{imp}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
