import { Loader2, Sparkles } from 'lucide-react'
import { ContentAngle, InstagramFormat, InstagramFormInputs, InstagramObjective, VisualStyle } from '../../types'

interface Props {
  inputs: InstagramFormInputs
  onChange: (inputs: InstagramFormInputs) => void
  onGenerate: () => void
  isGenerating: boolean
}

const FORMAT_OPTIONS: { value: InstagramFormat; label: string; description: string }[] = [
  { value: 'reel-script',      label: 'Reel Script',       description: 'Shot-by-shot with text + voiceover' },
  { value: 'carousel-outline', label: 'Carousel Outline',  description: '7–8 slides, one insight per slide' },
  { value: 'caption',          label: 'Post Caption',      description: 'Hook + body + hashtags' },
  { value: 'story-sequence',   label: 'Story Sequence',    description: '6 frames with poll and CTA' },
]

const VISUAL_OPTIONS: { value: VisualStyle; label: string }[] = [
  { value: 'talking-head',  label: 'Talking Head' },
  { value: 'text-overlay',  label: 'Text Overlay' },
  { value: 'data-visual',   label: 'Data Visual' },
  { value: 'behind-scenes', label: 'Behind the Scenes' },
  { value: 'documentary',   label: 'Documentary' },
]

const OBJECTIVE_OPTIONS: { value: InstagramObjective; label: string }[] = [
  { value: 'awareness',    label: 'Build awareness' },
  { value: 'engagement',   label: 'Drive engagement' },
  { value: 'save-worthy',  label: 'Save-worthy content' },
  { value: 'share-worthy', label: 'Share-worthy content' },
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

const VIEWER_EXAMPLES = ['Operations directors', 'Supply chain managers', 'Warehouse directors', 'eCommerce brands', 'Logistics leaders']
const PAIN_EXAMPLES   = ['Returns processing delays', 'Lack of visibility', 'Inefficient reverse logistics', 'Freight mistakes', 'Inventory shrinkage']

export default function InstagramInputPanel({ inputs, onChange, onGenerate, isGenerating }: Props) {
  const set = <K extends keyof InstagramFormInputs>(key: K) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      onChange({ ...inputs, [key]: e.target.value })

  return (
    <aside className="w-full lg:w-[360px] xl:w-[400px] shrink-0">
      <div className="sticky top-6 space-y-4">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <h2 className="text-sm font-semibold text-slate-900 mb-0.5">Instagram Content Generator</h2>
          <p className="text-xs text-slate-500">Reel scripts, carousels, captions, and story sequences.</p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-5">
          {/* Format */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">Content Format</label>
            <div className="space-y-1.5">
              {FORMAT_OPTIONS.map(o => (
                <label key={o.value} className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${inputs.contentFormat === o.value ? 'border-pink-400 bg-pink-50' : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'}`}>
                  <input type="radio" name="igFormat" value={o.value} checked={inputs.contentFormat === o.value} onChange={set('contentFormat')} className="mt-0.5 accent-pink-600" />
                  <div>
                    <div className={`text-sm font-medium ${inputs.contentFormat === o.value ? 'text-pink-700' : 'text-slate-700'}`}>{o.label}</div>
                    <div className="text-xs text-slate-500">{o.description}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Target Viewer */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">Target Viewer</label>
            <input type="text" value={inputs.targetViewer} onChange={set('targetViewer')} placeholder="e.g., supply chain managers" className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition" />
            <div className="mt-2 flex flex-wrap gap-1">
              {VIEWER_EXAMPLES.map(ex => (<button key={ex} onClick={() => onChange({ ...inputs, targetViewer: ex })} className="text-xs text-slate-500 bg-slate-100 hover:bg-pink-50 hover:text-pink-700 rounded-md px-2 py-0.5 transition-colors">{ex}</button>))}
            </div>
          </div>

          {/* Pain Point */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">Main Pain Point</label>
            <textarea value={inputs.mainPainPoint} onChange={set('mainPainPoint')} placeholder="e.g., returns processing delays" rows={3} className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition resize-none" />
            <div className="mt-2 flex flex-wrap gap-1">
              {PAIN_EXAMPLES.map(ex => (<button key={ex} onClick={() => onChange({ ...inputs, mainPainPoint: ex })} className="text-xs text-slate-500 bg-slate-100 hover:bg-pink-50 hover:text-pink-700 rounded-md px-2 py-0.5 transition-colors">{ex}</button>))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">Content Angle</label>
            <select value={inputs.contentAngle} onChange={set('contentAngle')} className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition bg-white appearance-none cursor-pointer">
              {ANGLE_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">Visual Style</label>
            <select value={inputs.visualStyle} onChange={set('visualStyle')} className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition bg-white appearance-none cursor-pointer">
              {VISUAL_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">Objective</label>
            <select value={inputs.objective} onChange={set('objective')} className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition bg-white appearance-none cursor-pointer">
              {OBJECTIVE_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
        </div>

        <button onClick={onGenerate} disabled={isGenerating} className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 hover:from-purple-700 hover:via-pink-700 hover:to-orange-600 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold text-sm rounded-xl px-4 py-3.5 transition-all shadow-sm">
          {isGenerating ? <><Loader2 className="w-4 h-4 animate-spin" />Generating...</> : <><Sparkles className="w-4 h-4" />Generate Instagram Content</>}
        </button>
      </div>
    </aside>
  )
}
