import { Platform } from '../types'

const PLATFORMS: { id: Platform; label: string; icon: string }[] = [
  { id: 'linkedin', label: 'LinkedIn', icon: 'in' },
  { id: 'youtube', label: 'YouTube', icon: '▶' },
  { id: 'twitter', label: 'Twitter / X', icon: '✕' },
  { id: 'instagram', label: 'Instagram', icon: '◎' },
  { id: 'facebook', label: 'Facebook', icon: 'f' },
]

interface Props {
  selected: Platform
  onChange: (p: Platform) => void
}

export default function PlatformSelector({ selected, onChange }: Props) {
  return (
    <div className="flex gap-2 flex-wrap">
      {PLATFORMS.map(({ id, label, icon }) => (
        <button
          key={id}
          onClick={() => onChange(id)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            selected === id
              ? 'bg-orange-500 text-white'
              : 'bg-fabcon-charcoal border border-fabcon-steel text-gray-400 hover:text-white hover:border-gray-500'
          }`}
        >
          <span className="font-bold text-xs">{icon}</span>
          {label}
        </button>
      ))}
    </div>
  )
}
