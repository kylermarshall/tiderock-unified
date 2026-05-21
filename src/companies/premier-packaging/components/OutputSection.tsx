import type { ReactNode } from 'react'
import { CopyButton } from './CopyButton'
import clsx from 'clsx'

interface Props {
  label: string
  content: string
  children?: ReactNode
  className?: string
  compact?: boolean
}

export function OutputSection({ label, content, children, className, compact }: Props) {
  return (
    <div className={clsx('rounded-lg border border-slate-200 overflow-hidden', className)}>
      <div className="flex items-center justify-between px-3 py-2 bg-slate-50 border-b border-slate-200">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{label}</span>
        <CopyButton text={content} variant="icon" />
      </div>
      <div className={clsx('bg-white', compact ? 'p-3' : 'p-4')}>
        {children ?? <p className="output-text">{content}</p>}
      </div>
    </div>
  )
}
