import { useState } from 'react'
import { Copy, Check, Twitter, MessageCircle, Share2 } from 'lucide-react'
import { TwitterGeneratedContent } from '../../types'
import QualityScoreCard from '../QualityScoreCard'

interface Props {
  content: TwitterGeneratedContent
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
  'single-post':     'Single Post',
  thread:            '5–8 Post Thread',
  'contrarian-take': 'Contrarian Take',
  'founder-style':   'Founder-Style Post',
  'quote-post':      'Quote-Post Response',
}

function charCount(text: string) {
  return text.length > 280
    ? <span className="text-red-500 font-medium">{text.length}/280</span>
    : <span className="text-slate-400">{text.length}/280</span>
}

export default function TwitterOutput({ content }: Props) {
  const isThread = content.posts.length > 1
  const fullText = isThread
    ? content.posts.map((p, i) => `${i + 1}/${content.posts.length}\n${p}`).join('\n\n')
    : content.posts[0] ?? ''

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between bg-white rounded-xl border border-slate-200 shadow-sm px-4 py-3">
        <div className="flex items-center gap-2">
          <Twitter className="w-4 h-4 text-slate-800" />
          <span className="text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200 rounded-full px-2.5 py-0.5">{FORMAT_LABELS[content.format]}</span>
        </div>
        <CopyBtn text={fullText} label="Copy All" />
      </div>

      {/* Posts */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-slate-900">
            {isThread ? `Thread (${content.posts.length} posts)` : 'Post'}
          </h3>
          {isThread && <CopyBtn text={fullText} label="Copy Thread" />}
        </div>

        <div className="space-y-3">
          {content.posts.map((post, i) => (
            <div key={i} className="rounded-xl border border-slate-200 overflow-hidden">
              {isThread && (
                <div className="flex items-center justify-between px-4 py-2 bg-slate-50 border-b border-slate-100">
                  <span className="text-xs font-semibold text-slate-400">{i + 1}/{content.posts.length}</span>
                  <div className="flex items-center gap-2">
                    {!isThread && charCount(post)}
                    <CopyBtn text={post} label="Copy" />
                  </div>
                </div>
              )}
              <div className="px-4 py-3">
                {post.startsWith('[') ? (
                  <div>
                    <p className="text-xs text-slate-400 italic mb-2">{post.split('\n')[0]}</p>
                    {post.split('\n').slice(1).map((line, li) => (
                      <p key={li} className={`text-sm leading-relaxed ${line === '' ? 'h-2' : 'text-slate-800'}`}>{line}</p>
                    ))}
                  </div>
                ) : (
                  post.split('\n').map((line, li) => (
                    <p key={li} className={`text-sm leading-relaxed ${line === '' ? 'h-2' : 'text-slate-800'}`}>{line}</p>
                  ))
                )}
              </div>
              {!isThread && (
                <div className="flex items-center justify-between px-4 py-2 bg-slate-50 border-t border-slate-100">
                  {charCount(post)}
                  <CopyBtn text={post} label="Copy" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Alternate hook */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Alternate Hook</span>
          <CopyBtn text={content.alternateHook} label="Copy Hook" />
        </div>
        <p className="text-sm text-slate-700 italic">{content.alternateHook}</p>
      </div>

      {/* CTA + Engagement question */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">CTA</span>
            <CopyBtn text={content.cta} label="Copy" />
          </div>
          <p className="text-sm text-slate-700 italic">{content.cta}</p>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
          <div className="flex items-center gap-1.5 mb-2">
            <MessageCircle className="w-3.5 h-3.5 text-amber-600" />
            <span className="text-xs font-semibold text-amber-700 uppercase tracking-wide">Engagement Question</span>
          </div>
          <p className="text-sm text-amber-900">{content.engagementQuestion}</p>
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
