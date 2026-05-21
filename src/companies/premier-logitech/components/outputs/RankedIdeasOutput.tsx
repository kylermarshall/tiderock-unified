import { useState } from 'react'
import { Copy, Check, TrendingUp } from 'lucide-react'
import { RankedIdea } from '../../types'

interface Props {
  ideas: RankedIdea[]
}

const SCORE_LABELS: Record<keyof RankedIdea['scores'], string> = {
  clarityOfPain: 'Clarity of Pain',
  financialImpact: 'Financial Impact',
  tension: 'Tension',
  relevanceToDecisionMakers: 'Decision-Maker Relevance',
}

const ANGLE_COLORS: Record<string, string> = {
  'Hidden Cost Leak':            'bg-red-50 text-red-700 border-red-200',
  'Common Operational Mistake':  'bg-amber-50 text-amber-700 border-amber-200',
  'Contrarian Take':             'bg-purple-50 text-purple-700 border-purple-200',
  'System Failure':              'bg-rose-50 text-rose-700 border-rose-200',
  'Before/After Improvement':    'bg-emerald-50 text-emerald-700 border-emerald-200',
  'Risk Warning':                'bg-orange-50 text-orange-700 border-orange-200',
  'Buyer Education':             'bg-blue-50 text-blue-700 border-blue-200',
}

function rankBadge(rank: number) {
  if (rank === 1) return 'bg-amber-100 text-amber-700 border-amber-300'
  if (rank === 2) return 'bg-slate-100 text-slate-700 border-slate-300'
  if (rank === 3) return 'bg-orange-50 text-orange-700 border-orange-200'
  return 'bg-slate-50 text-slate-500 border-slate-200'
}

export default function RankedIdeasOutput({ ideas }: Props) {
  const [copiedAll, setCopiedAll] = useState(false)
  const [copiedId, setCopiedId] = useState<number | null>(null)

  const allText = ideas
    .map(
      idea =>
        `#${idea.rank} — ${idea.hook}\nAngle: ${idea.angle}\nScores: Clarity ${idea.scores.clarityOfPain}/10 | Financial Impact ${idea.scores.financialImpact}/10 | Tension ${idea.scores.tension}/10 | Decision-Maker Relevance ${idea.scores.relevanceToDecisionMakers}/10 | Total: ${idea.totalScore}/40\nCTA: ${idea.cta}`
    )
    .join('\n\n---\n\n')

  const copyOne = async (idea: RankedIdea) => {
    const text = `#${idea.rank} — ${idea.hook}\nAngle: ${idea.angle}\nTotal Score: ${idea.totalScore}/40\nCTA: ${idea.cta}`
    await navigator.clipboard.writeText(text)
    setCopiedId(idea.id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const copyAll = async () => {
    await navigator.clipboard.writeText(allText)
    setCopiedAll(true)
    setTimeout(() => setCopiedAll(false), 2000)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-slate-900">Ranked Content Ideas</h3>
          <p className="text-xs text-slate-500 mt-0.5">Scored by pain clarity, financial impact, tension, and decision-maker relevance</p>
        </div>
        <button
          onClick={copyAll}
          className="flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg px-3 py-2 transition-colors"
        >
          {copiedAll ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
          {copiedAll ? 'Copied' : 'Copy All'}
        </button>
      </div>

      <div className="space-y-3">
        {ideas.map(idea => (
          <div
            key={idea.id}
            className={`bg-white rounded-xl border p-4 transition-colors ${idea.rank <= 3 ? 'border-amber-200 bg-amber-50/30' : 'border-slate-200 hover:border-slate-300'}`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3 flex-1 min-w-0">
                {/* Rank badge */}
                <span className={`shrink-0 w-7 h-7 rounded-full border font-bold text-xs flex items-center justify-center mt-0.5 ${rankBadge(idea.rank)}`}>
                  #{idea.rank}
                </span>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-900 leading-snug">{idea.hook}</p>

                  <div className="mt-2 flex flex-wrap gap-2 items-center">
                    <span className={`inline-flex text-xs font-medium px-2 py-0.5 rounded-full border ${ANGLE_COLORS[idea.angle] ?? 'bg-slate-50 text-slate-600 border-slate-200'}`}>
                      {idea.angle}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-slate-500">
                      <TrendingUp className="w-3 h-3" />
                      <span className="font-semibold text-slate-700">{idea.totalScore}</span>
                      <span>/40</span>
                    </span>
                  </div>

                  {/* Score breakdown */}
                  <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1.5">
                    {(Object.keys(idea.scores) as Array<keyof RankedIdea['scores']>).map(key => (
                      <div key={key}>
                        <div className="flex justify-between text-xs mb-0.5">
                          <span className="text-slate-400 truncate">{SCORE_LABELS[key]}</span>
                          <span className="text-slate-600 font-medium tabular-nums ml-1">{idea.scores[key]}/10</span>
                        </div>
                        <div className="h-1 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-blue-500 rounded-full"
                            style={{ width: `${(idea.scores[key] / 10) * 100}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <p className="text-xs text-slate-500 mt-3 italic">{idea.cta}</p>
                </div>
              </div>

              <button
                onClick={() => copyOne(idea)}
                className="shrink-0 p-1.5 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
              >
                {copiedId === idea.id
                  ? <Check className="w-3.5 h-3.5 text-emerald-500" />
                  : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
