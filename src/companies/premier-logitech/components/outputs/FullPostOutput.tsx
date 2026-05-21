import { useState } from 'react'
import { Copy, Check, Linkedin } from 'lucide-react'
import { FullPost } from '../../types'

interface Props {
  post: FullPost
}

export default function FullPostOutput({ post }: Props) {
  const [copied, setCopied] = useState(false)

  const formattedText = [
    post.hook,
    '',
    ...post.body,
    '',
    post.businessImpact,
    '',
    post.cta,
  ].join('\n')

  const handleCopy = async () => {
    await navigator.clipboard.writeText(formattedText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-slate-900">Full LinkedIn Post</h3>
          <p className="text-xs text-slate-500 mt-0.5">Ready to publish — copy and paste directly to LinkedIn</p>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg px-3 py-2 transition-colors"
        >
          {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
          {copied ? 'Copied' : 'Copy Post'}
        </button>
      </div>

      {/* Post preview */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        {/* LinkedIn-style header */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-100">
          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
            <Linkedin className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900">Premier LogiTech</p>
            <p className="text-xs text-slate-500">Technology Lifecycle &amp; Supply Chain Solutions</p>
          </div>
        </div>

        {/* Post body */}
        <div className="px-5 py-4 space-y-3">
          {/* Hook */}
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
            <div className="flex items-center gap-1.5 mb-2">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Hook</span>
            </div>
            <p className="text-sm font-semibold text-slate-900 leading-snug">{post.hook}</p>
          </div>

          {/* Body */}
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
            <div className="flex items-center gap-1.5 mb-2">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Body</span>
            </div>
            <div className="space-y-1.5">
              {post.body.map((line, i) => (
                <p key={i} className="text-sm text-slate-700 leading-relaxed">
                  {line}
                </p>
              ))}
            </div>
          </div>

          {/* Business impact */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center gap-1.5 mb-2">
              <span className="text-xs font-semibold text-blue-500 uppercase tracking-wide">Business Impact</span>
            </div>
            <p className="text-sm text-blue-900 leading-relaxed">{post.businessImpact}</p>
          </div>

          {/* CTA */}
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
            <div className="flex items-center gap-1.5 mb-2">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Call to Action</span>
            </div>
            <p className="text-sm text-slate-600 italic">{post.cta}</p>
          </div>
        </div>

        {/* Copy raw text area */}
        <div className="px-5 pb-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Raw Text (LinkedIn-ready)</span>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-700 transition-colors"
            >
              {copied ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
          <pre className="text-xs text-slate-600 bg-slate-50 border border-slate-200 rounded-lg p-3 whitespace-pre-wrap font-mono leading-relaxed overflow-auto max-h-64 scrollbar-thin">
            {formattedText}
          </pre>
        </div>
      </div>
    </div>
  )
}
