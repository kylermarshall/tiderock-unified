import { Linkedin, Youtube, Twitter, Instagram, Facebook } from 'lucide-react'
import { Platform } from '../types'

interface Props {
  platform: Platform
  onChange: (p: Platform) => void
}

const PLATFORMS: { value: Platform; label: string; icon: React.ReactNode; color: string; activeColor: string }[] = [
  {
    value: 'linkedin',
    label: 'LinkedIn',
    icon: <Linkedin className="w-4 h-4" />,
    color: 'text-slate-500 hover:text-blue-700 hover:bg-blue-50',
    activeColor: 'bg-blue-600 text-white shadow-sm',
  },
  {
    value: 'youtube',
    label: 'YouTube',
    icon: <Youtube className="w-4 h-4" />,
    color: 'text-slate-500 hover:text-red-600 hover:bg-red-50',
    activeColor: 'bg-red-600 text-white shadow-sm',
  },
  {
    value: 'twitter',
    label: 'Twitter / X',
    icon: <Twitter className="w-4 h-4" />,
    color: 'text-slate-500 hover:text-slate-900 hover:bg-slate-100',
    activeColor: 'bg-slate-900 text-white shadow-sm',
  },
  {
    value: 'instagram',
    label: 'Instagram',
    icon: <Instagram className="w-4 h-4" />,
    color: 'text-slate-500 hover:text-pink-600 hover:bg-pink-50',
    activeColor: 'bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 text-white shadow-sm',
  },
  {
    value: 'facebook',
    label: 'Facebook',
    icon: <Facebook className="w-4 h-4" />,
    color: 'text-slate-500 hover:text-blue-600 hover:bg-blue-50',
    activeColor: 'bg-blue-500 text-white shadow-sm',
  },
]

export default function PlatformSelector({ platform, onChange }: Props) {
  return (
    <div className="bg-white border-b border-slate-200">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-1 overflow-x-auto py-2 scrollbar-thin">
          <span className="shrink-0 text-xs font-semibold text-slate-400 uppercase tracking-wide mr-2">
            Platform
          </span>
          {PLATFORMS.map(p => (
            <button
              key={p.value}
              onClick={() => onChange(p.value)}
              className={`shrink-0 flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                platform === p.value ? p.activeColor : p.color
              }`}
            >
              {p.icon}
              <span className="hidden sm:inline">{p.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
