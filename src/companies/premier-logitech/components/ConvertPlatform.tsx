import { ArrowRightLeft, Linkedin, Youtube, Twitter, Instagram, Facebook } from 'lucide-react'
import { Platform } from '../types'

interface Props {
  currentPlatform: Platform
  onConvert: (target: Platform) => void
  disabled?: boolean
}

const PLATFORM_CONFIG: Record<Platform, { label: string; icon: React.ReactNode; color: string }> = {
  linkedin:  { label: 'LinkedIn',    icon: <Linkedin  className="w-3.5 h-3.5" />, color: 'hover:bg-blue-50  hover:text-blue-700  hover:border-blue-200'  },
  youtube:   { label: 'YouTube',     icon: <Youtube   className="w-3.5 h-3.5" />, color: 'hover:bg-red-50   hover:text-red-600   hover:border-red-200'   },
  twitter:   { label: 'Twitter / X', icon: <Twitter   className="w-3.5 h-3.5" />, color: 'hover:bg-slate-100 hover:text-slate-900 hover:border-slate-300' },
  instagram: { label: 'Instagram',   icon: <Instagram className="w-3.5 h-3.5" />, color: 'hover:bg-pink-50  hover:text-pink-600  hover:border-pink-200'  },
  facebook:  { label: 'Facebook',    icon: <Facebook  className="w-3.5 h-3.5" />, color: 'hover:bg-blue-50  hover:text-blue-600  hover:border-blue-200'  },
}

const PLATFORMS: Platform[] = ['linkedin', 'youtube', 'twitter', 'instagram', 'facebook']

export default function ConvertPlatform({ currentPlatform, onConvert, disabled }: Props) {
  const targets = PLATFORMS.filter(p => p !== currentPlatform)

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
      <div className="flex items-center gap-2 mb-3">
        <ArrowRightLeft className="w-3.5 h-3.5 text-slate-400" />
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
          Convert to another platform
        </p>
      </div>
      <div className="flex flex-wrap gap-2">
        {targets.map(target => {
          const cfg = PLATFORM_CONFIG[target]
          return (
            <button
              key={target}
              onClick={() => onConvert(target)}
              disabled={disabled}
              className={`flex items-center gap-1.5 text-xs font-medium text-slate-600 bg-slate-50 border border-slate-200 disabled:opacity-40 disabled:cursor-not-allowed rounded-lg px-3 py-2 transition-colors ${cfg.color}`}
            >
              {cfg.icon}
              {cfg.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
