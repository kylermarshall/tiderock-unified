import { Zap, Briefcase, FlipHorizontal, Minimize2, Target } from 'lucide-react'
import { RegenerateVariant } from '../types'

interface Props {
  onRegenerate: (variant: RegenerateVariant) => void
  disabled?: boolean
}

const VARIANTS: { value: RegenerateVariant; label: string; icon: React.ReactNode }[] = [
  { value: 'more-direct',     label: 'More Direct',     icon: <Zap className="w-3.5 h-3.5" /> },
  { value: 'more-executive',  label: 'More Executive',  icon: <Briefcase className="w-3.5 h-3.5" /> },
  { value: 'more-contrarian', label: 'More Contrarian', icon: <FlipHorizontal className="w-3.5 h-3.5" /> },
  { value: 'shorter',         label: 'Shorter',         icon: <Minimize2 className="w-3.5 h-3.5" /> },
  { value: 'more-specific',   label: 'More Specific',   icon: <Target className="w-3.5 h-3.5" /> },
]

export default function RegenerateVariants({ onRegenerate, disabled }: Props) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3">
        Regenerate as
      </p>
      <div className="flex flex-wrap gap-2">
        {VARIANTS.map(v => (
          <button
            key={v.value}
            onClick={() => onRegenerate(v.value)}
            disabled={disabled}
            className="flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed border border-slate-200 rounded-lg px-3 py-2 transition-colors"
          >
            {v.icon}
            {v.label}
          </button>
        ))}
      </div>
    </div>
  )
}
