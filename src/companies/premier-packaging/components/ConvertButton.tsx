import type { Platform } from '../lib/types'
import { ArrowRight } from 'lucide-react'

interface Props {
  currentPlatform: Platform
  onConvert: (to: Platform) => void
}

const PLATFORMS: { value: Platform; label: string; color: string }[] = [
  { value: 'linkedin', label: 'LinkedIn', color: 'bg-[#0A66C2] text-white hover:bg-[#085db5]' },
  { value: 'youtube', label: 'YouTube', color: 'bg-[#FF0000] text-white hover:bg-[#e50000]' },
  { value: 'twitter', label: 'X / Twitter', color: 'bg-slate-900 text-white hover:bg-slate-800' },
  { value: 'instagram', label: 'Instagram', color: 'bg-gradient-to-r from-purple-600 to-pink-500 text-white' },
  { value: 'facebook', label: 'Facebook', color: 'bg-[#1877F2] text-white hover:bg-[#1464d0]' },
]

export function ConvertButton({ currentPlatform, onConvert }: Props) {
  const others = PLATFORMS.filter(p => p.value !== currentPlatform)

  return (
    <div className="space-y-2">
      <div className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
        <ArrowRight size={11} />
        Turn Into Another Platform
      </div>
      <div className="flex flex-wrap gap-1.5">
        {others.map(p => (
          <button
            key={p.value}
            onClick={() => onConvert(p.value)}
            className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-opacity duration-150 ${p.color}`}
          >
            {p.label}
          </button>
        ))}
      </div>
    </div>
  )
}
