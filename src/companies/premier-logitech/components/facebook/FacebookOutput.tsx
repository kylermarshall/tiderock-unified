import { useState } from 'react'
import { Copy, Check, Facebook, MessageSquare, Lightbulb, Share2 } from 'lucide-react'
import { FacebookGeneratedContent } from '../../types'
import QualityScoreCard from '../QualityScoreCard'

interface Props {
  content: FacebookGeneratedContent
}

function CopyBtn({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false)
  const handleCopy = async () => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <button onClick={handleCopy} className="flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg px-2.5 py-1.5 transition-colors">
      {copied ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
      {copied ? 'Copied' : label}
    </button>
  )
}

const FORMAT_LABELS: Record<string, string> = {
  'short-post':          'Short Post',
  'educational-post':    'Educational Post',
  'discussion-prompt':   'Discussion Prompt',
  'business-owner-post': 'Business Owner Post',
  'retargeting-post':    'Retargeting Post',
}

export default function FacebookOutput({ content }: Props) {
  const fullText = [
    ...content.primaryPost,
    '',
    `PRACTICAL TAKEAWAY: ${content.practicalTakeaway}`,
    '',
    `CTA: ${content.cta}`,
    '',
    `DISCUSSION QUESTION: ${content.discussionQuestion}`,
    '',
    `REPURPOSING:`,
    ...content.repurposingSuggestions.map((s, i) => `${i + 1}. ${s}`),
  ].join('\n')

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between bg-white rounded-xl border border-slate-200 shadow-sm px-4 py-3">
        <div className="flex items-center gap-2">
          <Facebook className="w-4 h-4 text-blue-600" />
          <span className="text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200 rounded-full px-2.5 py-0.5">{FORMAT_LABELS[content.format]}</span>
        </div>
        <CopyBtn text={fullText} label="Copy All" />
      </div>

      {/* Primary post */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-slate-900">Post</h3>
          <CopyBtn text={content.primaryPost.join('\n')} label="Copy Post" />
        </div>
        <div className="space-y-2">
          {content.primaryPost.map((para, i) => (
            para === ''
              ? <div key={i} className="h-2" />
              : <p key={i} className="text-sm text-slate-800 leading-relaxed">{para}</p>
          ))}
        </div>
      </div>

      {/* Practical takeaway */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Lightbulb className="w-3.5 h-3.5 text-blue-600" />
            <span className="text-xs font-semibold text-blue-700 uppercase tracking-wide">Practical Takeaway</span>
          </div>
          <CopyBtn text={content.practicalTakeaway} label="Copy" />
        </div>
        <p className="text-sm text-blue-900 leading-relaxed">{content.practicalTakeaway}</p>
      </div>

      {/* CTA + Discussion question */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Call to Action</span>
            <CopyBtn text={content.cta} label="Copy" />
          </div>
          <p className="text-sm text-slate-700 italic">{content.cta}</p>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
          <div className="flex items-center gap-1.5 mb-2">
            <MessageSquare className="w-3.5 h-3.5 text-amber-600" />
            <span className="text-xs font-semibold text-amber-700 uppercase tracking-wide">Discussion Question</span>
          </div>
          <p className="text-sm text-amber-900">{content.discussionQuestion}</p>
        </div>
      </div>

      {/* Repurposing */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
        <div className="flex items-center gap-2 mb-3">
          <Share2 className="w-4 h-4 text-slate-400" />
          <h3 className="text-sm font-semibold text-slate-900">Repurposing Suggestions</h3>
        </div>
        <div className="space-y-2">
          {content.repurposingSuggestions.map((s, i) => (
            <div key={i} className="flex items-start gap-2 text-xs text-slate-600">
              <span className="shrink-0 w-4 h-4 rounded bg-slate-100 text-slate-500 font-semibold flex items-center justify-center mt-0.5">{i + 1}</span>
              {s}
            </div>
          ))}
        </div>
      </div>

      <QualityScoreCard score={content.qualityScore} />
    </div>
  )
}
