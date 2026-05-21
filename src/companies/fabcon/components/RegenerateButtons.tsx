interface Props {
  onRegenerate: (variant: string) => void
}

const VARIANTS = [
  { key: 'direct', label: 'More Direct' },
  { key: 'executive', label: 'More Executive' },
  { key: 'contrarian', label: 'More Contrarian' },
  { key: 'shorter', label: 'Shorter' },
  { key: 'specific', label: 'More Specific' },
]

export default function RegenerateButtons({ onRegenerate }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      {VARIANTS.map(({ key, label }) => (
        <button
          key={key}
          onClick={() => onRegenerate(key)}
          className="px-3 py-1.5 text-xs font-medium bg-fabcon-steel text-gray-300 rounded hover:bg-orange-500 hover:text-white transition-colors"
        >
          {label}
        </button>
      ))}
    </div>
  )
}
