import { useState } from 'react'
import { Copy, Check, Instagram, Image, Share2, Eye } from 'lucide-react'
import { InstagramGeneratedContent } from '../../types'
import QualityScoreCard from '../QualityScoreCard'

interface Props {
  content: InstagramGeneratedContent
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
  'reel-script':      'Reel Script',
  'carousel-outline': 'Carousel Outline',
  caption:            'Post Caption',
  'story-sequence':   'Story Sequence',
}

const FORMAT_ITEM_LABEL: Record<string, string> = {
  'reel-script':      'Shot',
  'carousel-outline': 'Slide',
  'story-sequence':   'Frame',
  caption:            'Caption',
}

export default function InstagramOutput({ content }: Props) {
  const fullText = [
    `HOOK: ${content.visualHook}`,
    `ON-SCREEN TEXT: ${content.onScreenText}`,
    '',
    ...content.contentItems.map((item, i) =>
      `${FORMAT_ITEM_LABEL[content.format] ?? 'Item'} ${i + 1} — ${item.label}\n${item.heading}\n${item.body}\n[Visual: ${item.visualNote}]${item.duration ? `\n[${item.duration}]` : ''}`
    ),
    '',
    `CAPTION:\n${content.caption}`,
    '',
    `CTA: ${content.cta}`,
    '',
    `SUGGESTED VISUALS:\n${content.suggestedVisuals.map((v, i) => `${i + 1}. ${v}`).join('\n')}`,
    '',
    `REPURPOSING:\n${content.repurposingSuggestions.map((s, i) => `${i + 1}. ${s}`).join('\n')}`,
  ].join('\n')

  const itemLabel = FORMAT_ITEM_LABEL[content.format] ?? 'Item'

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between bg-white rounded-xl border border-slate-200 shadow-sm px-4 py-3">
        <div className="flex items-center gap-2">
          <Instagram className="w-4 h-4 text-pink-500" />
          <span className="text-xs font-semibold bg-pink-50 text-pink-700 border border-pink-200 rounded-full px-2.5 py-0.5">{FORMAT_LABELS[content.format]}</span>
        </div>
        <CopyBtn text={fullText} label="Copy All" />
      </div>

      {/* Hook + On-screen text */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
        <h3 className="text-sm font-semibold text-slate-900 mb-4">Opening Hook</h3>
        <div className="space-y-3">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Visual Hook</span>
              <CopyBtn text={content.visualHook} label="Copy Hook" />
            </div>
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-pink-200 rounded-lg p-3">
              <p className="text-sm font-medium text-pink-900">{content.visualHook}</p>
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">On-Screen Text</span>
              <CopyBtn text={content.onScreenText} label="Copy" />
            </div>
            <div className="bg-slate-900 rounded-lg px-4 py-3 text-center">
              <p className="text-white font-black text-base tracking-tight leading-tight">{content.onScreenText}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content items (shots / slides / frames) */}
      {content.format !== 'caption' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-slate-900">
              {content.format === 'reel-script'      && `Reel Script (${content.contentItems.length} shots)`}
              {content.format === 'carousel-outline' && `Carousel (${content.contentItems.length} slides)`}
              {content.format === 'story-sequence'   && `Story Sequence (${content.contentItems.length} frames)`}
            </h3>
            <CopyBtn
              text={content.contentItems.map((item, i) =>
                `${itemLabel} ${i + 1} — ${item.label}\n${item.heading}\n${item.body}`
              ).join('\n\n')}
              label={`Copy ${itemLabel}s`}
            />
          </div>
          <div className="space-y-3">
            {content.contentItems.map((item, i) => (
              <div key={i} className="rounded-xl border border-slate-200 overflow-hidden">
                <div className="flex items-center justify-between px-4 py-2 bg-gradient-to-r from-purple-50 to-pink-50 border-b border-pink-100">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-pink-600 text-white text-xs font-bold flex items-center justify-center shrink-0">{i + 1}</span>
                    <span className="text-xs font-semibold text-pink-700">{item.label}</span>
                    {item.duration && (
                      <span className="text-xs text-slate-400 bg-white border border-slate-200 rounded px-1.5 py-0.5">{item.duration}</span>
                    )}
                  </div>
                  <CopyBtn text={`${item.heading}\n${item.body}`} label="Copy" />
                </div>
                <div className="px-4 py-3 space-y-2">
                  <p className="text-sm font-semibold text-slate-900">{item.heading}</p>
                  <p className="text-sm text-slate-700 leading-relaxed">{item.body}</p>
                  {item.visualNote && (
                    <div className="flex items-start gap-1.5 mt-2">
                      <Eye className="w-3 h-3 text-slate-400 mt-0.5 shrink-0" />
                      <p className="text-xs text-slate-400 italic">{item.visualNote}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Caption */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-slate-900">Caption</h3>
          <CopyBtn text={content.caption} label="Copy Caption" />
        </div>
        <div className="bg-slate-50 rounded-lg p-4 space-y-1">
          {content.caption.split('\n').map((line, i) => (
            <p key={i} className={`text-sm leading-relaxed ${line === '' ? 'h-2' : line.startsWith('#') ? 'text-blue-600 font-medium' : 'text-slate-800'}`}>{line}</p>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Call to Action</span>
          <CopyBtn text={content.cta} label="Copy CTA" />
        </div>
        <p className="text-sm text-slate-700 italic">{content.cta}</p>
      </div>

      {/* Suggested visuals */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
        <div className="flex items-center gap-2 mb-3">
          <Image className="w-4 h-4 text-slate-400" />
          <h3 className="text-sm font-semibold text-slate-900">Suggested Visuals</h3>
        </div>
        <div className="space-y-2">
          {content.suggestedVisuals.map((v, i) => (
            <div key={i} className="flex items-start gap-2 text-xs text-slate-600">
              <span className="shrink-0 w-4 h-4 rounded bg-pink-100 text-pink-600 font-semibold flex items-center justify-center mt-0.5">{i + 1}</span>
              {v}
            </div>
          ))}
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
