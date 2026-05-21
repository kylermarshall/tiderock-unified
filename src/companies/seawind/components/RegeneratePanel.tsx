import type { RegenerateVariant } from '../types'

interface Props {
  onRegenerate: (variant: RegenerateVariant) => void
  onConvertTo: (platform: string) => void
  currentPlatform: string
}

const VARIANTS: { id: RegenerateVariant; label: string; description: string }[] = [
  { id: 'more_direct', label: 'More Direct', description: 'Shorter, blunter, less preamble' },
  { id: 'more_executive', label: 'More Executive', description: 'P&L framing, board-level language' },
  { id: 'more_contrarian', label: 'More Contrarian', description: 'Challenge the standard assumption' },
  { id: 'shorter', label: 'Shorter', description: 'Reduce length by ~40%' },
  { id: 'more_specific', label: 'More Specific', description: 'Add data points and scenarios' },
]

const OTHER_PLATFORMS = [
  { id: 'linkedin', label: 'LinkedIn' },
  { id: 'youtube', label: 'YouTube' },
  { id: 'twitter', label: 'Twitter/X' },
  { id: 'instagram', label: 'Instagram' },
  { id: 'facebook', label: 'Facebook' },
]

export default function RegeneratePanel({ onRegenerate, onConvertTo, currentPlatform }: Props) {
  return (
    <div className="card p-5 space-y-4">
      <div>
        <p className="section-title">Regenerate</p>
        <div className="flex flex-wrap gap-2">
          {VARIANTS.map((v) => (
            <button
              key={v.id}
              onClick={() => onRegenerate(v.id)}
              title={v.description}
              className="btn-secondary text-xs py-1.5 px-3"
            >
              ↺ {v.label}
            </button>
          ))}
        </div>
      </div>

      <div className="border-t border-slate-100 pt-4">
        <p className="section-title">Turn Into Another Platform</p>
        <div className="flex flex-wrap gap-2">
          {OTHER_PLATFORMS.filter((p) => p.id !== currentPlatform).map((p) => (
            <button
              key={p.id}
              onClick={() => onConvertTo(p.id)}
              className="btn-ghost text-xs"
            >
              → {p.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
