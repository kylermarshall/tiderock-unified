import type { Platform } from '../types'

interface PlatformSelectorProps {
  active: Platform
  onChange: (platform: Platform) => void
  onConvert?: (platform: Platform) => void
}

const PLATFORMS: { key: Platform; label: string; icon: string }[] = [
  { key: 'linkedin', label: 'LinkedIn', icon: 'in' },
  { key: 'youtube', label: 'YouTube', icon: 'YT' },
  { key: 'twitter', label: 'X / Twitter', icon: 'X' },
  { key: 'instagram', label: 'Instagram', icon: 'IG' },
  { key: 'facebook', label: 'Facebook', icon: 'fb' },
]

export function PlatformSelector({ active, onChange }: PlatformSelectorProps) {
  return (
    <div className="bg-pmt-charcoal border border-pmt-steel/40 rounded-lg p-1 flex gap-1">
      {PLATFORMS.map(({ key, label, icon }) => (
        <button
          key={key}
          onClick={() => onChange(key)}
          className={`flex-1 flex flex-col items-center gap-1 py-2.5 px-1 rounded transition-all duration-150 ${
            active === key
              ? 'bg-pmt-blue text-white shadow-lg shadow-pmt-blue/20'
              : 'text-slate-400 hover:text-white hover:bg-pmt-steel/40'
          }`}
        >
          <span className="text-[10px] font-bold tracking-wide">{icon}</span>
          <span className="text-[10px] leading-none hidden sm:block">{label}</span>
        </button>
      ))}
    </div>
  )
}

export function ConvertPlatformButtons({ current, onConvert }: { current: Platform; onConvert: (p: Platform) => void }) {
  const others = PLATFORMS.filter((p) => p.key !== current)
  return (
    <div className="bg-pmt-charcoal border border-pmt-steel/40 rounded-lg p-4">
      <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Turn Into Another Platform</div>
      <div className="flex flex-wrap gap-2">
        {others.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => onConvert(key)}
            className="px-3 py-1.5 rounded text-xs font-medium bg-pmt-steel/20 text-slate-300 border border-pmt-steel/40 hover:bg-pmt-blue/20 hover:border-pmt-blue/40 hover:text-white transition-all duration-150"
          >
            → {label}
          </button>
        ))}
      </div>
    </div>
  )
}
