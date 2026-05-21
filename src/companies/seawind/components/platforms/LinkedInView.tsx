import type { LinkedInOutput } from '../../types'
import CopyButton from '../CopyButton'
import ScoreDisplay from '../ScoreDisplay'
import RegeneratePanel from '../RegeneratePanel'
import type { RegenerateVariant } from '../../types'
import { clsx } from 'clsx'

interface Props {
  output: LinkedInOutput
  onRegenerate: (v: RegenerateVariant) => void
  onConvertTo: (p: string) => void
}

function fullPostText(output: LinkedInOutput): string {
  const { hook, body, businessImpact, cta } = output.fullPost
  return [...hook, '', ...body, '', businessImpact, '', cta].join('\n')
}

export default function LinkedInView({ output, onRegenerate, onConvertTo }: Props) {
  const { postIdeas, fullPost, calendar, repurposingSuggestions, score } = output

  return (
    <div className="space-y-6">
      {/* Full Post */}
      <div className="card overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-semibold text-slate-800 text-sm">Full LinkedIn Post</h3>
          <div className="flex items-center gap-2">
            <CopyButton text={fullPost.hook.join('\n')} label="Copy Hook" />
            <CopyButton text={fullPost.cta} label="Copy CTA" />
            <CopyButton text={fullPostText(output)} label="Copy All" variant="secondary" />
          </div>
        </div>
        <div className="p-5 space-y-4">
          {/* Hook */}
          <div>
            <p className="section-title">Hook</p>
            <div className="output-block space-y-1">
              {fullPost.hook.map((line, i) => (
                <p key={i} className={clsx(i === 0 && 'font-semibold text-slate-900')}>{line}</p>
              ))}
            </div>
          </div>
          {/* Body */}
          <div>
            <p className="section-title">Body</p>
            <div className="output-block space-y-2">
              {fullPost.body.map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          </div>
          {/* Business Impact */}
          <div>
            <p className="section-title">Business Impact</p>
            <div className="output-block border-l-4 border-blue-400">
              <p>{fullPost.businessImpact}</p>
            </div>
          </div>
          {/* CTA */}
          <div>
            <p className="section-title">CTA</p>
            <div className="output-block border-l-4 border-navy-800">
              <p className="font-medium">{fullPost.cta}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Post Ideas */}
      <div className="card overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100">
          <h3 className="font-semibold text-slate-800 text-sm">10 Post Ideas — Ranked by Impact</h3>
        </div>
        <div className="divide-y divide-slate-100">
          {postIdeas.map((idea) => (
            <div key={idea.rank} className="px-5 py-3 flex items-start gap-4">
              <span className={clsx(
                'w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5',
                idea.rank <= 3 ? 'bg-navy-800 text-white' : 'bg-slate-100 text-slate-600'
              )}>
                {idea.rank}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-900">{idea.title}</p>
                <p className="text-xs text-slate-500 mt-0.5">{idea.angle}</p>
              </div>
              <div className="flex gap-1 shrink-0">
                <span className="text-xs bg-slate-50 border border-slate-200 rounded px-1.5 py-0.5 text-slate-500">
                  Pain {idea.painClarity}
                </span>
                <span className="text-xs bg-slate-50 border border-slate-200 rounded px-1.5 py-0.5 text-slate-500">
                  $ {idea.financialImpact}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 30-Day Calendar */}
      <div className="card overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100">
          <h3 className="font-semibold text-slate-800 text-sm">30-Day Content Calendar</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                <th className="text-left px-5 py-2.5 text-xs font-semibold text-slate-500 uppercase tracking-wide w-12">Day</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Topic</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Hook</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Angle</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {calendar.map((day) => (
                <tr key={day.day} className="hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-3 font-semibold text-slate-900">{day.day}</td>
                  <td className="px-4 py-3 text-slate-800 font-medium">{day.topic}</td>
                  <td className="px-4 py-3 text-slate-600 text-xs leading-relaxed max-w-xs">{day.hook}</td>
                  <td className="px-4 py-3 text-slate-500 text-xs max-w-xs">{day.angle}</td>
                </tr>
              ))}
            </tbody>
          </table>
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
      <RegeneratePanel onRegenerate={onRegenerate} onConvertTo={onConvertTo} currentPlatform="linkedin" />
    </div>
  )
}
