import { Loader2, Sparkles } from 'lucide-react'
import { ContentAngle, Tone, VideoObjective, YouTubeFormat, YouTubeFormInputs } from '../../types'

interface Props {
  inputs: YouTubeFormInputs
  onChange: (inputs: YouTubeFormInputs) => void
  onGenerate: () => void
  isGenerating: boolean
}

const FORMAT_OPTIONS: { value: YouTubeFormat; label: string; description: string }[] = [
  { value: 'shorts',                 label: 'YouTube Short',          description: '~30–60 second script' },
  { value: '60-90-seconds',          label: '60–90 Second Video',     description: 'Hook, body, insight, CTA' },
  { value: 'long-form-outline',      label: 'Long-Form Outline',      description: 'Full structure, 5 sections' },
  { value: 'title-thumbnail-package',label: 'Title + Thumbnail Pack', description: '3 title + thumbnail options' },
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

const OBJECTIVE_OPTIONS: { value: VideoObjective; label: string }[] = [
  { value: 'educate',         label: 'Educate audience' },
  { value: 'generate-leads',  label: 'Generate leads' },
  { value: 'build-awareness', label: 'Build awareness' },
  { value: 'convert',         label: 'Convert viewers' },
]

const TONE_OPTIONS: { value: Tone; label: string }[] = [
  { value: 'direct',           label: 'Direct' },
  { value: 'insider-operator', label: 'Insider / Operator' },
  { value: 'contrarian',       label: 'Contrarian' },
  { value: 'educational',      label: 'Educational' },
  { value: 'executive',        label: 'Executive' },
]

const VIEWER_EXAMPLES = ['Operations directors', 'Supply chain managers', 'Warehouse directors', 'eCommerce brands', 'VP of Logistics']
const PAIN_EXAMPLES  = ['Returns processing delays', 'Lack of visibility', 'Inefficient reverse logistics', 'Freight mistakes', 'Inventory confusion']

export default function YouTubeInputPanel({ inputs, onChange, onGenerate, isGenerating }: Props) {
  const set = <K extends keyof YouTubeFormInputs>(key: K) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      onChange({ ...inputs, [key]: e.target.value })

  return (
    <aside className="w-full lg:w-[360px] xl:w-[400px] shrink-0">
      <div className="sticky top-6 space-y-4">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <h2 className="text-sm font-semibold text-slate-900 mb-0.5">YouTube Content Generator</h2>
          <p className="text-xs text-slate-500">Titles, thumbnails, scripts, outlines, and retention beats.</p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-5">
          {/* Video Format */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">Video Format</label>
            <div className="space-y-1.5">
              {FORMAT_OPTIONS.map(o => (
                <label key={o.value} className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${inputs.videoFormat === o.value ? 'border-red-400 bg-red-50' : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'}`}>
                  <input type="radio" name="videoFormat" value={o.value} checked={inputs.videoFormat === o.value} onChange={set('videoFormat')} className="mt-0.5 accent-red-600" />
                  <div>
                    <div className={`text-sm font-medium ${inputs.videoFormat === o.value ? 'text-red-700' : 'text-slate-700'}`}>{o.label}</div>
                    <div className="text-xs text-slate-500">{o.description}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Target Viewer */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">Target Viewer</label>
            <input type="text" value={inputs.targetViewer} onChange={set('targetViewer')} placeholder="e.g., supply chain managers" className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent transition" />
            <div className="mt-2 flex flex-wrap gap-1">
              {VIEWER_EXAMPLES.map(ex => (
                <button key={ex} onClick={() => onChange({ ...inputs, targetViewer: ex })} className="text-xs text-slate-500 bg-slate-100 hover:bg-red-50 hover:text-red-700 rounded-md px-2 py-0.5 transition-colors">{ex}</button>
              ))}
            </div>
          </div>

          {/* Main Pain Point */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">Main Pain Point</label>
            <textarea value={inputs.mainPainPoint} onChange={set('mainPainPoint')} placeholder="e.g., returns processing delays and hidden reverse logistics costs" rows={3} className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent transition resize-none" />
            <div className="mt-2 flex flex-wrap gap-1">
              {PAIN_EXAMPLES.map(ex => (
                <button key={ex} onClick={() => onChange({ ...inputs, mainPainPoint: ex })} className="text-xs text-slate-500 bg-slate-100 hover:bg-red-50 hover:text-red-700 rounded-md px-2 py-0.5 transition-colors">{ex}</button>
              ))}
            </div>
          </div>

          {/* Content Angle */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">Content Angle</label>
            <select value={inputs.contentAngle} onChange={set('contentAngle')} className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent transition bg-white appearance-none cursor-pointer">
              {ANGLE_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>

          {/* Video Objective */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">Video Objective</label>
            <select value={inputs.videoObjective} onChange={set('videoObjective')} className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent transition bg-white appearance-none cursor-pointer">
              {OBJECTIVE_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>

          {/* Tone */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">Tone</label>
            <select value={inputs.tone} onChange={set('tone')} className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent transition bg-white appearance-none cursor-pointer">
              {TONE_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
        </div>

        <button onClick={onGenerate} disabled={isGenerating} className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 disabled:bg-red-400 disabled:cursor-not-allowed text-white font-semibold text-sm rounded-xl px-4 py-3.5 transition-colors shadow-sm">
          {isGenerating ? <><Loader2 className="w-4 h-4 animate-spin" />Generating...</> : <><Sparkles className="w-4 h-4" />Generate YouTube Content</>}
        </button>
      </div>
    </aside>
  )
}
