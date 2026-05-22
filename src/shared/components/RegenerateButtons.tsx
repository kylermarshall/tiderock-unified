import type { RegenerateVariant } from '../types'

interface RegenerateButtonsProps {
  onRegenerate: (variant: RegenerateVariant) => void
  disabled?: boolean
}

const variants: Array<{ key: RegenerateVariant; label: string; icon: string }> = [
  { key: 'direct',    label: 'More Direct',     icon: '⚡' },
  { key: 'executive', label: 'More Executive',   icon: '📊' },
  { key: 'contrarian',label: 'More Contrarian',  icon: '↩' },
  { key: 'shorter',   label: 'Shorter',          icon: '✂' },
  { key: 'specific',  label: 'More Specific',    icon: '🎯' },
]

export function RegenerateButtons({ onRegenerate, disabled }: RegenerateButtonsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {variants.map(v => (
        <button
          key={v.key}
          onClick={() => onRegenerate(v.key)}
          disabled={disabled}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-white border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 hover:border-slate-300 hover:text-slate-800 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <span>{v.icon}</span>
          {v.label}
        </button>
      ))}
    </div>
  )
}
