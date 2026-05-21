import type { RegenerateVariant } from '../types'

interface RegenerateButtonsProps {
  onRegenerate: (variant: RegenerateVariant) => void
  isLoading?: boolean
}

const VARIANTS: { key: RegenerateVariant; label: string; description: string }[] = [
  { key: 'direct', label: 'More Direct', description: 'Sharper, less hedged' },
  { key: 'executive', label: 'More Executive', description: 'Senior audience framing' },
  { key: 'contrarian', label: 'More Contrarian', description: 'Challenges the norm' },
  { key: 'shorter', label: 'Shorter', description: 'Tighter, fewer words' },
  { key: 'specific', label: 'More Specific', description: 'More data and detail' },
]

export function RegenerateButtons({ onRegenerate, isLoading = false }: RegenerateButtonsProps) {
  return (
    <div className="bg-pmt-charcoal border border-pmt-steel/40 rounded-lg p-4">
      <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Regenerate Variant</div>
      <div className="flex flex-wrap gap-2">
        {VARIANTS.map(({ key, label, description }) => (
          <button
            key={key}
            onClick={() => onRegenerate(key)}
            disabled={isLoading}
            title={description}
            className="px-3 py-1.5 rounded text-xs font-medium bg-pmt-steel/30 text-slate-300 border border-pmt-steel/50 hover:bg-pmt-blue/20 hover:border-pmt-blue/40 hover:text-white transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  )
}
