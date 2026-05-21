import { Lightbulb } from 'lucide-react'
import { QualityScore } from '../types'

interface Props {
  score: QualityScore
}

const BREAKDOWN_LABELS: Record<keyof QualityScore['breakdown'], string> = {
  specificity: 'Specificity',
  painIntensity: 'Pain Intensity',
  financialRelevance: 'Financial Relevance',
  clarity: 'Clarity',
  nonGenericLanguage: 'Non-Generic Language',
}

function scoreColor(score: number): string {
  if (score >= 80) return 'text-emerald-600'
  if (score >= 60) return 'text-amber-600'
  return 'text-red-500'
}

function scoreBorderColor(score: number): string {
  if (score >= 80) return 'border-emerald-500'
  if (score >= 60) return 'border-amber-500'
  return 'border-red-400'
}

function scoreBarColor(pct: number): string {
  if (pct >= 0.8) return 'bg-emerald-500'
  if (pct >= 0.6) return 'bg-amber-500'
  return 'bg-red-400'
}

function scoreLabel(score: number): string {
  if (score >= 85) return 'Excellent'
  if (score >= 70) return 'Good'
  if (score >= 55) return 'Fair'
  return 'Needs Work'
}

export default function QualityScoreCard({ score }: Props) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
      <div className="flex items-start gap-5">
        {/* Score circle */}
        <div className={`shrink-0 flex flex-col items-center justify-center w-20 h-20 rounded-full border-4 ${scoreBorderColor(score.overall)}`}>
          <span className={`text-2xl font-bold leading-none ${scoreColor(score.overall)}`}>
            {score.overall}
          </span>
          <span className="text-xs text-slate-400 mt-0.5">/100</span>
        </div>

        {/* Right side */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-3">
            <h3 className="text-sm font-semibold text-slate-900">Content Quality Score</h3>
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
              score.overall >= 80 ? 'bg-emerald-50 text-emerald-700' :
              score.overall >= 60 ? 'bg-amber-50 text-amber-700' :
              'bg-red-50 text-red-600'
            }`}>
              {scoreLabel(score.overall)}
            </span>
          </div>

          {/* Breakdown bars */}
          <div className="space-y-2">
            {(Object.keys(score.breakdown) as Array<keyof QualityScore['breakdown']>).map(key => {
              const val = score.breakdown[key]
              const pct = val / 20
              return (
                <div key={key}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-500">{BREAKDOWN_LABELS[key]}</span>
                    <span className="text-slate-700 font-medium tabular-nums">{val}/20</span>
                  </div>
                  <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${scoreBarColor(pct)}`}
                      style={{ width: `${pct * 100}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Suggestions */}
      {score.suggestions.length > 0 && (
        <div className="mt-4 pt-4 border-t border-slate-100">
          <div className="flex items-center gap-1.5 mb-2">
            <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
            <span className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
              Improvement Suggestions
            </span>
          </div>
          <ul className="space-y-1.5">
            {score.suggestions.map((s, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-slate-600">
                <span className="shrink-0 w-4 h-4 rounded-full bg-amber-100 text-amber-700 font-semibold flex items-center justify-center text-[10px] mt-0.5">
                  {i + 1}
                </span>
                {s}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
