import { useState } from 'react'
import { Copy, Check } from 'lucide-react'
import { PostIdea } from '../../types'

interface Props {
  ideas: PostIdea[]
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

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={handleCopy}
      className="shrink-0 p-1.5 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
      title="Copy to clipboard"
    >
      {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
    </button>
  )
}

export default function PostIdeasOutput({ ideas }: Props) {
  const allText = ideas
    .map(
      (idea, i) =>
        `POST IDEA ${i + 1}\nHook: ${idea.hook}\nAngle: ${idea.angle}\nWhy It Matters: ${idea.whyItMatters}\nCTA: ${idea.cta}`
    )
    .join('\n\n---\n\n')

  const [copiedAll, setCopiedAll] = useState(false)

  const handleCopyAll = async () => {
    await navigator.clipboard.writeText(allText)
    setCopiedAll(true)
    setTimeout(() => setCopiedAll(false), 2000)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-slate-900">10 LinkedIn Post Ideas</h3>
          <p className="text-xs text-slate-500 mt-0.5">{ideas.length} ideas generated</p>
        </div>
        <button
          onClick={handleCopyAll}
          className="flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg px-3 py-2 transition-colors"
        >
          {copiedAll ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
          {copiedAll ? 'Copied' : 'Copy All'}
        </button>
      </div>

      <div className="space-y-3">
        {ideas.map(idea => {
          const ideaText = `Hook: ${idea.hook}\nAngle: ${idea.angle}\nWhy It Matters: ${idea.whyItMatters}\nCTA: ${idea.cta}`
          return (
            <div
              key={idea.id}
              className="bg-white rounded-xl border border-slate-200 p-4 hover:border-slate-300 transition-colors"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <span className="shrink-0 w-6 h-6 rounded-full bg-slate-100 text-slate-500 text-xs font-semibold flex items-center justify-center mt-0.5">
                    {idea.id}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900 leading-snug">{idea.hook}</p>
                    <div className="mt-2 flex flex-wrap gap-2 items-center">
                      <span className={`inline-flex text-xs font-medium px-2 py-0.5 rounded-full border ${ANGLE_COLORS[idea.angle] ?? 'bg-slate-50 text-slate-600 border-slate-200'}`}>
                        {idea.angle}
                      </span>
                    </div>
                    <div className="mt-3 space-y-2">
                      <div>
                        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Why It Matters</span>
                        <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">{idea.whyItMatters}</p>
                      </div>
                      <div>
                        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Suggested CTA</span>
                        <p className="text-xs text-slate-600 mt-0.5 italic">{idea.cta}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <CopyButton text={ideaText} />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
