import type { ContentQualityScore } from '../lib/types'
import { getScoreColor, getScoreLabel, getScoreBg } from '../lib/scoring'
import clsx from 'clsx'

interface Props {
  score: ContentQualityScore
}

const DIMENSION_LABELS: Record<keyof Omit<ContentQualityScore, 'total' | 'breakdown'>, string> = {
  painClarity: 'Pain Clarity',
  financialConsequence: 'Financial Impact',
  operationalTension: 'Operational Tension',
  ctaClarity: 'CTA Clarity',
  writingCompliance: 'Writing Rules',
}

export function QualityScore({ score }: Props) {
  return (
    <div className={clsx('rounded-xl border p-4', getScoreBg(score.total))}>
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Content Quality Score</span>
        <div className="flex items-baseline gap-1">
          <span className={clsx('text-2xl font-bold', getScoreColor(score.total))}>{score.total}</span>
          <span className="text-sm text-slate-400">/100</span>
          <span className={clsx('ml-1 text-xs font-semibold px-1.5 py-0.5 rounded', getScoreColor(score.total))}>
            {getScoreLabel(score.total)}
          </span>
        </div>
      </div>

      <div className="space-y-1.5 mb-3">
        {(Object.entries(DIMENSION_LABELS) as [keyof typeof DIMENSION_LABELS, string][]).map(([key, label]) => {
          const value = score[key]
          const pct = (value / 20) * 100
          return (
            <div key={key} className="flex items-center gap-2">
              <span className="text-xs text-slate-500 w-36 shrink-0">{label}</span>
              <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className={clsx(
                    'h-full rounded-full transition-all',
                    pct >= 85 ? 'bg-emerald-500' : pct >= 65 ? 'bg-amber-400' : 'bg-red-400',
                  )}
                  style={{ width: `${pct}%` }}
                />
              </div>
              <span className="text-xs font-medium text-slate-600 w-8 text-right">{value}/20</span>
            </div>
          )
        })}
      </div>

      {score.breakdown && (
        <p className="text-xs text-slate-500 leading-relaxed border-t border-slate-200 pt-2 mt-2">
          {score.breakdown}
        </p>
      )}
    </div>
  )
}
