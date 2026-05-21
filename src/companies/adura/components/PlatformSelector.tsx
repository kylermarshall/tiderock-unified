import type { Platform } from '../types'

const platforms: Array<{ id: Platform; label: string; icon: string; color: string }> = [
  { id: 'linkedin', label: 'LinkedIn', icon: 'in', color: 'bg-[#0A66C2]' },
  { id: 'youtube', label: 'YouTube', icon: '▶', color: 'bg-[#FF0000]' },
  { id: 'twitter', label: 'Twitter / X', icon: '✕', color: 'bg-[#000000]' },
  { id: 'instagram', label: 'Instagram', icon: '◈', color: 'bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045]' },
  { id: 'facebook', label: 'Facebook', icon: 'f', color: 'bg-[#1877F2]' },
]

interface PlatformSelectorProps {
  selected: Platform
  onChange: (p: Platform) => void
}

export function PlatformSelector({ selected, onChange }: PlatformSelectorProps) {
  return (
    <div className="flex gap-1 bg-slate-100 rounded-xl p-1 overflow-x-auto">
      {platforms.map(p => (
        <button
          key={p.id}
          onClick={() => onChange(p.id)}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
            selected === p.id
              ? 'bg-white text-slate-900 shadow-sm'
              : 'text-slate-500 hover:text-slate-700 hover:bg-white/50'
          }`}
        >
          <span className={`w-5 h-5 rounded text-white text-xs flex items-center justify-center font-bold flex-shrink-0 ${p.color}`}>
            {p.icon}
          </span>
          {p.label}
        </button>
      ))}
    </div>
  )
}
