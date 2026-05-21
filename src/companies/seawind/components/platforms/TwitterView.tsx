import type { TwitterOutput } from '../../types'
import CopyButton from '../CopyButton'
import ScoreDisplay from '../ScoreDisplay'
import RegeneratePanel from '../RegeneratePanel'
import type { RegenerateVariant } from '../../types'

interface Props {
  output: TwitterOutput
  onRegenerate: (v: RegenerateVariant) => void
  onConvertTo: (p: string) => void
}

export default function TwitterView({ output, onRegenerate, onConvertTo }: Props) {
  const { posts, alternateHook, cta, engagementQuestion, repurposingSuggestions, score } = output
  const isThread = posts.length > 1

  return (
    <div className="space-y-6">
      {/* Main Post or Thread */}
      <div className="card overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-semibold text-slate-800 text-sm">
            {isThread ? `Thread (${posts.length} posts)` : 'Post'}
          </h3>
          <div className="flex gap-2">
            {isThread && <CopyButton text={posts[0]} label="Copy Hook" />}
            <CopyButton text={posts.join('\n\n')} label="Copy All" variant="secondary" />
          </div>
        </div>
        <div className="p-5 space-y-3">
          {posts.map((post, i) => (
            <div key={i} className="flex gap-3">
              {isThread && (
                <div className="flex flex-col items-center shrink-0">
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-semibold text-slate-600">
                    {i + 1}
                  </div>
                  {i < posts.length - 1 && <div className="w-px flex-1 bg-slate-200 mt-1" />}
                </div>
              )}
              <div className={`flex-1 ${isThread ? 'pb-2' : ''}`}>
                <div className="output-block whitespace-pre-line text-sm leading-relaxed">
                  {post.startsWith('>') ? (
                    <blockquote className="border-l-4 border-slate-300 pl-3 text-slate-500 italic mb-2">
                      {post.replace('> ', '')}
                    </blockquote>
                  ) : (
                    post
                  )}
                </div>
                {i === 0 && (
                  <div className="flex gap-2 mt-2">
                    <CopyButton text={post} label="Copy this post" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Alternate Hook */}
      <div className="card p-5">
        <div className="flex items-center justify-between mb-3">
          <p className="section-title mb-0">Alternate Hook</p>
          <CopyButton text={alternateHook} label="Copy" />
        </div>
        <div className="output-block border-l-4 border-slate-900">
          <p className="font-medium text-slate-900">{alternateHook}</p>
        </div>
      </div>

      {/* Engagement Question */}
      <div className="card p-5">
        <div className="flex items-center justify-between mb-3">
          <p className="section-title mb-0">Engagement Question</p>
          <CopyButton text={engagementQuestion} label="Copy" />
        </div>
        <div className="output-block border-l-4 border-blue-400">
          <p className="italic text-slate-700">{engagementQuestion}</p>
        </div>
      </div>

      {/* CTA */}
      <div className="card p-5">
        <div className="flex items-center justify-between mb-3">
          <p className="section-title mb-0">CTA</p>
          <CopyButton text={cta} label="Copy CTA" />
        </div>
        <div className="output-block border-l-4 border-navy-800">
          <p className="font-medium">{cta}</p>
        </div>
      </div>

      {/* Repurposing */}
      <div className="card p-5">
        <p className="section-title">Repurposing Suggestions</p>
        <ul className="space-y-1.5">
          {repurposingSuggestions.map((s, i) => (
            <li key={i} className="flex gap-2 text-sm text-slate-700">
              <span className="text-blue-400 shrink-0">→</span>
              {s}
            </li>
          ))}
        </ul>
      </div>

      <ScoreDisplay score={score} />
      <RegeneratePanel onRegenerate={onRegenerate} onConvertTo={onConvertTo} currentPlatform="twitter" />
    </div>
  )
}
