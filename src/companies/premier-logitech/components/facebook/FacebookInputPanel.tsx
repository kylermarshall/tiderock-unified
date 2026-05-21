import { Loader2, Sparkles } from 'lucide-react'
import { ContentAngle, FacebookFormat, FacebookFormInputs, FacebookObjective, Tone } from '../../types'

interface Props {
  inputs: FacebookFormInputs
  onChange: (inputs: FacebookFormInputs) => void
  onGenerate: () => void
  isGenerating: boolean
}

const FORMAT_OPTIONS: { value: FacebookFormat; label: string; description: string }[] = [
  { value: 'short-post',          label: 'Short Post',           description: '4–5 punchy paragraphs, high shareability' },
  { value: 'educational-post',    label: 'Educational Post',     description: 'Step-by-step breakdown, save-worthy' },
  { value: 'discussion-prompt',   label: 'Discussion Prompt',    description: 'Opinion question to drive comments' },
  { value: 'business-owner-post', label: 'Business Owner Post',  description: 'First-person narrative, trust-builder' },
  { value: 'retargeting-post',    label: 'Retargeting Post',     description: 'Pain-aware CTA for warm audiences' },
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

const OBJECTIVE_OPTIONS: { value: FacebookObjective; label: string }[] = [
  { value: 'reach',      label: 'Build reach' },
  { value: 'engagement', label: 'Drive engagement' },
  { value: 'leads',      label: 'Generate leads' },
  { value: 'retarget',   label: 'Retarget warm audience' },
]

const TONE_OPTIONS: { value: Tone; label: string }[] = [
  { value: 'direct',           label: 'Direct' },
  { value: 'insider-operator', label: 'Insider / Operator' },
  { value: 'contrarian',       label: 'Contrarian' },
  { value: 'educational',      label: 'Educational' },
  { value: 'executive',        label: 'Executive' },
]

const READER_EXAMPLES  = ['Operations directors', 'Supply chain managers', 'Warehouse directors', 'eCommerce brands', 'Business owners']
const PAIN_EXAMPLES    = ['Returns processing delays', 'Lack of visibility', 'Inefficient reverse logistics', 'Freight mistakes', 'Inventory shrinkage']

export default function FacebookInputPanel({ inputs, onChange, onGenerate, isGenerating }: Props) {
  const set = <K extends keyof FacebookFormInputs>(key: K) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      onChange({ ...inputs, [key]: e.target.value })

  return (
    <aside className="w-full lg:w-[360px] xl:w-[400px] shrink-0">
      <div className="sticky top-6 space-y-4">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <h2 className="text-sm font-semibold text-slate-900 mb-0.5">Facebook Content Generator</h2>
          <p className="text-xs text-slate-500">Short posts, educational breakdowns, discussion prompts, and retargeting content.</p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-5">
          {/* Format */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">Content Format</label>
            <div className="space-y-1.5">
              {FORMAT_OPTIONS.map(o => (
                <label key={o.value} className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${inputs.contentFormat === o.value ? 'border-blue-400 bg-blue-50' : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'}`}>
                  <input type="radio" name="fbFormat" value={o.value} checked={inputs.contentFormat === o.value} onChange={set('contentFormat')} className="mt-0.5 accent-blue-600" />
                  <div>
                    <div className={`text-sm font-medium ${inputs.contentFormat === o.value ? 'text-blue-700' : 'text-slate-700'}`}>{o.label}</div>
                    <div className="text-xs text-slate-500">{o.description}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Target Reader */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">Target Reader</label>
            <input type="text" value={inputs.targetReader} onChange={set('targetReader')} placeholder="e.g., supply chain managers" className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition" />
            <div className="mt-2 flex flex-wrap gap-1">
              {READER_EXAMPLES.map(ex => (<button key={ex} onClick={() => onChange({ ...inputs, targetReader: ex })} className="text-xs text-slate-500 bg-slate-100 hover:bg-blue-50 hover:text-blue-700 rounded-md px-2 py-0.5 transition-colors">{ex}</button>))}
            </div>
          </div>

          {/* Pain Point */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">Main Pain Point</label>
            <textarea value={inputs.mainPainPoint} onChange={set('mainPainPoint')} placeholder="e.g., returns processing delays" rows={3} className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition resize-none" />
            <div className="mt-2 flex flex-wrap gap-1">
              {PAIN_EXAMPLES.map(ex => (<button key={ex} onClick={() => onChange({ ...inputs, mainPainPoint: ex })} className="text-xs text-slate-500 bg-slate-100 hover:bg-blue-50 hover:text-blue-700 rounded-md px-2 py-0.5 transition-colors">{ex}</button>))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">Content Angle</label>
            <select value={inputs.contentAngle} onChange={set('contentAngle')} className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition bg-white appearance-none cursor-pointer">
              {ANGLE_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">Tone</label>
            <select value={inputs.tone} onChange={set('tone')} className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition bg-white appearance-none cursor-pointer">
              {TONE_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">Objective</label>
            <select value={inputs.objective} onChange={set('objective')} className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition bg-white appearance-none cursor-pointer">
              {OBJECTIVE_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
        </div>

        <button onClick={onGenerate} disabled={isGenerating} className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white font-semibold text-sm rounded-xl px-4 py-3.5 transition-colors shadow-sm">
          {isGenerating ? <><Loader2 className="w-4 h-4 animate-spin" />Generating...</> : <><Sparkles className="w-4 h-4" />Generate Facebook Content</>}
        </button>
      </div>
    </aside>
  )
}
