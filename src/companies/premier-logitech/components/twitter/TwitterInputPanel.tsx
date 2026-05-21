import { Loader2, Sparkles } from 'lucide-react'
import { ContentAngle, Tone, TwitterFormat, TwitterFormInputs, TwitterObjective } from '../../types'

interface Props {
  inputs: TwitterFormInputs
  onChange: (inputs: TwitterFormInputs) => void
  onGenerate: () => void
  isGenerating: boolean
}

const FORMAT_OPTIONS: { value: TwitterFormat; label: string; description: string }[] = [
  { value: 'single-post',    label: 'Single Post',        description: '≤280 characters, punchy insight' },
  { value: 'thread',         label: '5–8 Post Thread',    description: 'Builds tension logically' },
  { value: 'contrarian-take',label: 'Contrarian Take',    description: 'Challenge common assumptions' },
  { value: 'founder-style',  label: 'Founder-Style Post', description: 'Personal observation + pattern' },
  { value: 'quote-post',     label: 'Quote-Post Response', description: 'Reframe a common belief' },
]

const ANGLE_OPTIONS: { value: ContentAngle; label: string }[] = [
  { value: 'hidden-cost-leak',           label: 'Hidden Cost Leak' },
  { value: 'common-operational-mistake', label: 'Common Operational Mistake' },
  { value: 'contrarian-take',            label: 'Contrarian Take' },
  { value: 'system-failure',             label: 'System Failure' },
  { value: 'before-after-improvement',   label: 'Before/After Improvement' },
  { value: 'risk-warning',               label: 'Risk Warning' },
  { value: 'buyer-education',            label: 'Buyer Education' },
]

const OBJECTIVE_OPTIONS: { value: TwitterObjective; label: string }[] = [
  { value: 'awareness',  label: 'Build awareness' },
  { value: 'engagement', label: 'Drive engagement' },
  { value: 'leads',      label: 'Generate leads' },
  { value: 'authority',  label: 'Build authority' },
]

const TONE_OPTIONS: { value: Tone; label: string }[] = [
  { value: 'direct',           label: 'Direct' },
  { value: 'insider-operator', label: 'Insider / Operator' },
  { value: 'contrarian',       label: 'Contrarian' },
  { value: 'educational',      label: 'Educational' },
  { value: 'executive',        label: 'Executive' },
]

const AUDIENCE_EXAMPLES = ['Operations directors', 'Supply chain managers', 'Warehouse directors', 'eCommerce brands', 'VP of Logistics']
const PAIN_EXAMPLES     = ['Returns processing delays', 'Lack of visibility', 'Inefficient reverse logistics', 'Freight mistakes', 'Inventory confusion']

export default function TwitterInputPanel({ inputs, onChange, onGenerate, isGenerating }: Props) {
  const set = <K extends keyof TwitterFormInputs>(key: K) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      onChange({ ...inputs, [key]: e.target.value })

  return (
    <aside className="w-full lg:w-[360px] xl:w-[400px] shrink-0">
      <div className="sticky top-6 space-y-4">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <h2 className="text-sm font-semibold text-slate-900 mb-0.5">Twitter / X Content Generator</h2>
          <p className="text-xs text-slate-500">Single posts, threads, contrarian takes, and founder-style content.</p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-5">
          {/* Format */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">Post Format</label>
            <div className="space-y-1.5">
              {FORMAT_OPTIONS.map(o => (
                <label key={o.value} className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${inputs.postFormat === o.value ? 'border-slate-700 bg-slate-50' : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'}`}>
                  <input type="radio" name="postFormat" value={o.value} checked={inputs.postFormat === o.value} onChange={set('postFormat')} className="mt-0.5 accent-slate-900" />
                  <div>
                    <div className={`text-sm font-medium ${inputs.postFormat === o.value ? 'text-slate-900' : 'text-slate-700'}`}>{o.label}</div>
                    <div className="text-xs text-slate-500">{o.description}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Target Audience */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">Target Audience</label>
            <input type="text" value={inputs.targetAudience} onChange={set('targetAudience')} placeholder="e.g., supply chain managers" className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent transition" />
            <div className="mt-2 flex flex-wrap gap-1">
              {AUDIENCE_EXAMPLES.map(ex => (
                <button key={ex} onClick={() => onChange({ ...inputs, targetAudience: ex })} className="text-xs text-slate-500 bg-slate-100 hover:bg-slate-200 rounded-md px-2 py-0.5 transition-colors">{ex}</button>
              ))}
            </div>
          </div>

          {/* Pain Point */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">Main Pain Point</label>
            <textarea value={inputs.mainPainPoint} onChange={set('mainPainPoint')} placeholder="e.g., returns processing delays and hidden costs" rows={3} className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent transition resize-none" />
            <div className="mt-2 flex flex-wrap gap-1">
              {PAIN_EXAMPLES.map(ex => (
                <button key={ex} onClick={() => onChange({ ...inputs, mainPainPoint: ex })} className="text-xs text-slate-500 bg-slate-100 hover:bg-slate-200 rounded-md px-2 py-0.5 transition-colors">{ex}</button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">Content Angle</label>
            <select value={inputs.contentAngle} onChange={set('contentAngle')} className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent transition bg-white appearance-none cursor-pointer">
              {ANGLE_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">Objective</label>
            <select value={inputs.objective} onChange={set('objective')} className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent transition bg-white appearance-none cursor-pointer">
              {OBJECTIVE_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">Tone</label>
            <select value={inputs.tone} onChange={set('tone')} className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent transition bg-white appearance-none cursor-pointer">
              {TONE_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
        </div>

        <button onClick={onGenerate} disabled={isGenerating} className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-500 disabled:cursor-not-allowed text-white font-semibold text-sm rounded-xl px-4 py-3.5 transition-colors shadow-sm">
          {isGenerating ? <><Loader2 className="w-4 h-4 animate-spin" />Generating...</> : <><Sparkles className="w-4 h-4" />Generate Twitter / X Content</>}
        </button>
      </div>
    </aside>
  )
}
