import { useState } from 'react'
import { Copy, Check, Calendar } from 'lucide-react'
import { CalendarDay } from '../../types'

interface Props {
  days: CalendarDay[]
}

const ANGLE_COLORS: Record<string, string> = {
  'Hidden Cost Leak':            'bg-red-50 text-red-700',
  'Common Operational Mistake':  'bg-amber-50 text-amber-700',
  'Contrarian Take':             'bg-purple-50 text-purple-700',
  'System Failure':              'bg-rose-50 text-rose-700',
  'Before/After Improvement':    'bg-emerald-50 text-emerald-700',
  'Risk Warning':                'bg-orange-50 text-orange-700',
  'Buyer Education':             'bg-blue-50 text-blue-700',
}

const WEEK_LABELS = ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5']

export default function CalendarOutput({ days }: Props) {
  const [copiedDay, setCopiedDay] = useState<number | null>(null)
  const [copiedAll, setCopiedAll] = useState(false)

  const allText = days
    .map(
      d =>
        `Day ${d.day}: ${d.postTopic}\nAngle: ${d.angle}\nHook: ${d.hook}\nCTA: ${d.cta}`
    )
    .join('\n\n')

  const copyDay = async (day: CalendarDay) => {
    const text = `Day ${day.day}: ${day.postTopic}\nAngle: ${day.angle}\nHook: ${day.hook}\nCTA: ${day.cta}`
    await navigator.clipboard.writeText(text)
    setCopiedDay(day.day)
    setTimeout(() => setCopiedDay(null), 2000)
  }

  const copyAll = async () => {
    await navigator.clipboard.writeText(allText)
    setCopiedAll(true)
    setTimeout(() => setCopiedAll(false), 2000)
  }

  const weeks: CalendarDay[][] = []
  for (let i = 0; i < days.length; i += 6) {
    weeks.push(days.slice(i, i + 6))
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-slate-900">30-Day Content Calendar</h3>
          <p className="text-xs text-slate-500 mt-0.5">One month of LinkedIn post topics, hooks, angles, and CTAs</p>
        </div>
        <button
          onClick={copyAll}
          className="flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg px-3 py-2 transition-colors"
        >
          {copiedAll ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
          {copiedAll ? 'Copied' : 'Copy All'}
        </button>
      </div>

      <div className="space-y-4">
        {weeks.map((week, wi) => (
          <div key={wi} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 bg-slate-50 border-b border-slate-200">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                {WEEK_LABELS[wi]} — Days {week[0].day}–{week[week.length - 1].day}
              </span>
            </div>
            <div className="divide-y divide-slate-100">
              {week.map(day => (
                <div key={day.day} className="flex items-start gap-3 px-4 py-3 hover:bg-slate-50 group transition-colors">
                  {/* Day number */}
                  <div className="shrink-0 w-8 h-8 rounded-lg bg-blue-600 text-white text-xs font-bold flex items-center justify-center mt-0.5">
                    {day.day}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900 leading-snug">{day.postTopic}</p>
                    <div className="mt-1 flex flex-wrap items-center gap-2">
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${ANGLE_COLORS[day.angle] ?? 'bg-slate-100 text-slate-600'}`}>
                        {day.angle}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1.5 leading-snug">{day.hook}</p>
                    <p className="text-xs text-slate-400 mt-1 italic">{day.cta}</p>
                  </div>

                  {/* Copy button */}
                  <button
                    onClick={() => copyDay(day)}
                    className="shrink-0 p-1.5 rounded-md text-slate-300 group-hover:text-slate-400 hover:!text-slate-600 hover:bg-slate-100 transition-colors"
                  >
                    {copiedDay === day.day
                      ? <Check className="w-3.5 h-3.5 text-emerald-500" />
                      : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
