import { useState } from 'react'
import { CopyButton } from './CopyButton'

interface ContentCardProps {
  label: string
  content: string | string[]
  variant?: 'default' | 'highlight' | 'calendar'
  defaultExpanded?: boolean
}

export function ContentCard({ label, content, variant = 'default', defaultExpanded = true }: ContentCardProps) {
  const [expanded, setExpanded] = useState(defaultExpanded)
  const textContent = Array.isArray(content) ? content.join('\n\n') : content

  const bgClass = variant === 'highlight'
    ? 'bg-blue-50 border-blue-200'
    : variant === 'calendar'
    ? 'bg-slate-50 border-slate-200'
    : 'bg-white border-slate-200'

  return (
    <div className={`rounded-xl border ${bgClass} overflow-hidden`}>
      <div
        className="flex items-center justify-between px-4 py-3 cursor-pointer select-none"
        onClick={() => setExpanded(!expanded)}
      >
        <span className="text-sm font-semibold text-slate-700">{label}</span>
        <div className="flex items-center gap-2" onClick={e => e.stopPropagation()}>
          <CopyButton text={textContent} label="Copy" />
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-slate-400 hover:text-slate-600 p-1"
          >
            <svg
              className={`w-4 h-4 transition-transform ${expanded ? 'rotate-180' : ''}`}
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>

      {expanded && (
        <div className="px-4 pb-4">
          {Array.isArray(content) ? (
            <div className="space-y-2">
              {content.map((item, i) => (
                <div key={i} className="text-sm text-slate-700 leading-relaxed p-2 bg-white/70 rounded-lg border border-slate-100">
                  {item}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">{content}</p>
          )}
        </div>
      )}
    </div>
  )
}
