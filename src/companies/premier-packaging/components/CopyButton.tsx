import { useState } from 'react'
import { Copy, Check } from 'lucide-react'
import clsx from 'clsx'

interface Props {
  text: string
  label?: string
  variant?: 'icon' | 'pill'
  className?: string
}

export function CopyButton({ text, label = 'Copy', variant = 'pill', className }: Props) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // fallback
      const el = document.createElement('textarea')
      el.value = text
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  if (variant === 'icon') {
    return (
      <button
        onClick={handleCopy}
        title={copied ? 'Copied!' : label}
        className={clsx(
          'inline-flex items-center justify-center w-7 h-7 rounded-md transition-colors duration-150',
          copied
            ? 'bg-emerald-100 text-emerald-600'
            : 'hover:bg-slate-100 text-slate-400 hover:text-slate-600',
          className,
        )}
      >
        {copied ? <Check size={14} strokeWidth={2.5} /> : <Copy size={14} />}
      </button>
    )
  }

  return (
    <button
      onClick={handleCopy}
      className={clsx(
        'inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-md border transition-colors duration-150',
        copied
          ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-800',
        className,
      )}
    >
      {copied ? <Check size={12} strokeWidth={2.5} /> : <Copy size={12} />}
      {copied ? 'Copied' : label}
    </button>
  )
}
