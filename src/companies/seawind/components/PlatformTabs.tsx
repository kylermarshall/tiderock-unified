import type { Platform } from '../types'
import { clsx } from 'clsx'

interface Props {
  active: Platform
  onChange: (p: Platform) => void
}

const PLATFORMS: { id: Platform; label: string; color: string; activeColor: string; icon: string }[] = [
  { id: 'linkedin', label: 'LinkedIn', color: 'text-slate-500', activeColor: 'text-[#0077B5] border-[#0077B5]', icon: 'in' },
  { id: 'youtube', label: 'YouTube', color: 'text-slate-500', activeColor: 'text-[#FF0000] border-[#FF0000]', icon: '▶' },
  { id: 'twitter', label: 'Twitter / X', color: 'text-slate-500', activeColor: 'text-slate-900 border-slate-900', icon: 'X' },
  { id: 'instagram', label: 'Instagram', color: 'text-slate-500', activeColor: 'text-[#E1306C] border-[#E1306C]', icon: '◎' },
  { id: 'facebook', label: 'Facebook', color: 'text-slate-500', activeColor: 'text-[#1877F2] border-[#1877F2]', icon: 'f' },
]

export default function PlatformTabs({ active, onChange }: Props) {
  return (
    <div className="bg-white border-b border-slate-200">
      <div className="max-w-screen-xl mx-auto px-6">
        <nav className="flex gap-0">
          {PLATFORMS.map((p) => (
            <button
              key={p.id}
              onClick={() => onChange(p.id)}
              className={clsx(
                'flex items-center gap-2 px-5 py-3.5 text-sm font-medium border-b-2 transition-colors whitespace-nowrap',
                active === p.id
                  ? p.activeColor
                  : 'text-slate-500 border-transparent hover:text-slate-700 hover:border-slate-300'
              )}
            >
              <span className={clsx(
                'w-5 h-5 rounded flex items-center justify-center text-xs font-bold',
                active === p.id ? 'bg-current/10' : 'bg-slate-100'
              )}>
                {p.icon}
              </span>
              {p.label}
            </button>
          ))}
        </nav>
      </div>
    </div>
  )
}
