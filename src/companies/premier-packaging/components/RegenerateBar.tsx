import type { ContentVariation } from '../lib/types'
import { RefreshCw } from 'lucide-react'
import clsx from 'clsx'

interface Props {
  current: ContentVariation
  onSelect: (v: ContentVariation) => void
}

const VARIATIONS: { value: ContentVariation; label: string }[] = [
  { value: 'default', label: 'Default' },
  { value: 'direct', label: 'More Direct' },
  { value: 'executive', label: 'More Executive' },
  { value: 'contrarian', label: 'More Contrarian' },
  { value: 'shorter', label: 'Shorter' },
  { value: 'specific', label: 'More Specific' },
]

export function RegenerateBar({ current, onSelect }: Props) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 uppercase tracking-widest">
        <RefreshCw size={11} />
        Regenerate
      </div>
      <div className="flex flex-wrap gap-1.5">
        {VARIATIONS.map(v => (
          <button
            key={v.value}
            onClick={() => onSelect(v.value)}
            className={clsx(
              'text-xs font-medium px-2.5 py-1.5 rounded-lg border transition-colors duration-150',
              current === v.value
                ? 'bg-brand-700 border-brand-700 text-white'
                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300',
            )}
          >
            {v.label}
          </button>
        ))}
      </div>
    </div>
  )
}
