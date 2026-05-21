import { useState } from 'react'
import { Copy, Check, Youtube, Film, RefreshCw, Share2 } from 'lucide-react'
import { YouTubeGeneratedContent } from '../../types'
import QualityScoreCard from '../QualityScoreCard'

interface Props {
  content: YouTubeGeneratedContent
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
  shorts: 'YouTube Short',
  '60-90-seconds': '60–90 Second Video',
  'long-form-outline': 'Long-Form Outline',
  'title-thumbnail-package': 'Title + Thumbnail Package',
}

export default function YouTubeOutput({ content }: Props) {
  const fullText = [
    `TITLE: ${content.videoTitle}`,
    `THUMBNAIL TEXT: ${content.thumbnailText}`,
    '',
    `3-SECOND HOOK: ${content.threeSecondHook}`,
    `OPENING LINE: ${content.openingLine}`,
    '',
    `SCRIPT / OUTLINE:`,
    ...content.scriptOrOutline,
    '',
    `RETENTION BEATS:`,
    ...content.retentionBeats.map((b, i) => `${i + 1}. ${b}`),
    '',
    `BUSINESS INSIGHT:`,
    content.businessInsight,
    '',
    `CTA: ${content.cta}`,
    '',
    `REPURPOSING:`,
    ...content.repurposingSuggestions.map((s, i) => `${i + 1}. ${s}`),
  ].join('\n')

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between bg-white rounded-xl border border-slate-200 shadow-sm px-4 py-3">
        <div className="flex items-center gap-2">
          <Youtube className="w-4 h-4 text-red-600" />
          <span className="text-xs font-semibold bg-red-50 text-red-700 border border-red-200 rounded-full px-2.5 py-0.5">{FORMAT_LABELS[content.format]}</span>
        </div>
        <CopyBtn text={fullText} label="Copy All" />
      </div>

      {/* Title + Thumbnail */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
        <div className="flex items-center gap-2 mb-4">
          <Film className="w-4 h-4 text-red-500" />
          <h3 className="text-sm font-semibold text-slate-900">Title &amp; Thumbnail</h3>
        </div>
        <div className="space-y-3">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Video Title</span>
              <CopyBtn text={content.videoTitle} label="Copy" />
            </div>
            <p className="text-sm font-semibold text-slate-900 leading-snug">{content.videoTitle}</p>
          </div>
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Thumbnail Text</span>
              <CopyBtn text={content.thumbnailText} label="Copy" />
            </div>
            <div className="bg-slate-900 rounded-lg px-4 py-3 text-center">
              <p className="text-white font-black text-base tracking-tight leading-tight">{content.thumbnailText}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Hook + Opening */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
        <h3 className="text-sm font-semibold text-slate-900 mb-4">Hook &amp; Opening</h3>
        <div className="space-y-3">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">3-Second Hook</span>
              <CopyBtn text={content.threeSecondHook} label="Copy Hook" />
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
              <p className="text-sm font-medium text-amber-900">{content.threeSecondHook}</p>
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Opening Line</span>
              <CopyBtn text={content.openingLine} label="Copy" />
            </div>
            <p className="text-sm text-slate-700 leading-relaxed">{content.openingLine}</p>
          </div>
        </div>
      </div>

      {/* Script / Outline */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-slate-900">Script / Outline</h3>
          <CopyBtn text={content.scriptOrOutline.join('\n')} label="Copy Script" />
        </div>
        <div className="bg-slate-50 rounded-lg p-4 font-mono text-xs text-slate-700 leading-relaxed space-y-1 max-h-80 overflow-y-auto scrollbar-thin">
          {content.scriptOrOutline.map((line, i) => (
            <p key={i} className={line === '' ? 'h-2' : line.startsWith('[') || line.startsWith('SECTION') || line.startsWith('TITLE') ? 'font-semibold text-slate-900' : ''}>{line}</p>
          ))}
        </div>
      </div>

      {/* Retention beats */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
        <div className="flex items-center gap-2 mb-3">
          <RefreshCw className="w-4 h-4 text-slate-400" />
          <h3 className="text-sm font-semibold text-slate-900">Retention Beats</h3>
        </div>
        <p className="text-xs text-slate-500 mb-3">Use these lines to re-hook viewers mid-video</p>
        <div className="space-y-2">
          {content.retentionBeats.map((beat, i) => (
            <div key={i} className="flex items-start gap-2">
              <span className="shrink-0 w-5 h-5 rounded-full bg-red-100 text-red-700 text-xs font-bold flex items-center justify-center mt-0.5">{i + 1}</span>
              <p className="text-sm text-slate-700 italic">{beat}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Business insight */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide">Business Insight</span>
          <CopyBtn text={content.businessInsight} label="Copy" />
        </div>
        <p className="text-sm text-blue-900 leading-relaxed">{content.businessInsight}</p>
      </div>

      {/* CTA */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Call to Action</span>
          <CopyBtn text={content.cta} label="Copy CTA" />
        </div>
        <p className="text-sm text-slate-700 italic">{content.cta}</p>
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
