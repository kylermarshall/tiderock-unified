import { useState } from 'react'
import { clsx } from 'clsx'

interface Props {
  text: string
  label?: string
  variant?: 'ghost' | 'secondary'
  className?: string
}

export default function CopyButton({ text, label = 'Copy', variant = 'ghost', className }: Props) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      // fallback
      const el = document.createElement('textarea')
      el.value = text
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    }
  }

  return (
    <button
      onClick={handleCopy}
      className={clsx(
        variant === 'secondary' ? 'btn-secondary' : 'btn-ghost',
        copied && 'opacity-70',
        className
      )}
    >
      {copied ? (
        <>
          <span className="text-emerald-600">✓</span>
          <span className="text-emerald-600">Copied</span>
        </>
      ) : (
        <>
          <span>⎘</span>
          {label}
        </>
      )}
    </button>
  )
}
