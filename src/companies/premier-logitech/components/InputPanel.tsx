import { Loader2, Sparkles } from 'lucide-react'
import { ContentAngle, FormInputs, PostType, Tone } from '../types'

interface Props {
  inputs: FormInputs
  onChange: (inputs: FormInputs) => void
  onGenerate: () => void
  isGenerating: boolean
}

const ANGLE_OPTIONS: { value: ContentAngle; label: string }[] = [
  { value: 'hidden-cost-leak',           label: 'Hidden Cost Leak' },
  { value: 'common-operational-mistake', label: 'Common Operational Mistake' },
  { value: 'contrarian-take',            label: 'Contrarian Take' },
  { value: 'system-failure',             label: 'System Failure' },
  { value: 'before-after-improvement',   label: 'Before/After Improvement' },
  { value: 'risk-warning',               label: 'Risk Warning' },
  { value: 'buyer-education',            label: 'Buyer Education' },
]

const POST_TYPE_OPTIONS: { value: PostType; label: string; description: string }[] = [
  { value: '10-post-ideas',    label: '10 LinkedIn Post Ideas',  description: 'Hook, angle, why it matters, CTA' },
  { value: 'ranked-ideas',     label: 'Ranked Content Ideas',    description: 'Scored by impact and tension' },
  { value: 'full-post',        label: 'Full LinkedIn Post',      description: 'Ready-to-publish post' },
  { value: '30-day-calendar',  label: '30-Day Content Calendar', description: 'Full month of post topics' },
]

const TONE_OPTIONS: { value: Tone; label: string }[] = [
  { value: 'direct',           label: 'Direct' },
  { value: 'insider-operator', label: 'Insider / Operator' },
  { value: 'contrarian',       label: 'Contrarian' },
  { value: 'educational',      label: 'Educational' },
  { value: 'executive',        label: 'Executive' },
]

const AUDIENCE_EXAMPLES = [
  'Operations directors',
  'Supply chain managers',
  'Warehouse directors',
  'eCommerce brands',
  'VP of Logistics',
]

const PAIN_EXAMPLES = [
  'Returns cost and processing delays',
  'Lack of visibility into warehouse operations',
  'Inefficient reverse logistics handling',
  'Freight mistakes and carrier overcharges',
  'Damaged goods and inventory shrinkage',
]

export default function InputPanel({ inputs, onChange, onGenerate, isGenerating }: Props) {
  const set = (key: keyof FormInputs) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => onChange({ ...inputs, [key]: e.target.value })

  const isDisabled = isGenerating

  return (
    <aside className="w-full lg:w-[360px] xl:w-[400px] shrink-0">
      <div className="sticky top-6 space-y-4">
        {/* Panel header */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <h2 className="text-sm font-semibold text-slate-900 mb-0.5">Content Generator</h2>
          <p className="text-xs text-slate-500">
            Fill in the fields below to generate LinkedIn content tailored to your audience.
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-5">

          {/* Target Audience */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
              Target Audience
            </label>
            <input
              type="text"
              value={inputs.targetAudience}
              onChange={set('targetAudience')}
              placeholder="e.g., supply chain managers"
              className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
            <div className="mt-2 flex flex-wrap gap-1">
              {AUDIENCE_EXAMPLES.map(ex => (
                <button
                  key={ex}
                  onClick={() => onChange({ ...inputs, targetAudience: ex })}
                  className="text-xs text-slate-500 bg-slate-100 hover:bg-blue-50 hover:text-blue-700 rounded-md px-2 py-0.5 transition-colors"
                >
                  {ex}
                </button>
              ))}
            </div>
          </div>

          {/* Main Pain Point */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
              Main Pain Point
            </label>
            <textarea
              value={inputs.mainPainPoint}
              onChange={set('mainPainPoint')}
              placeholder="e.g., returns processing delays and hidden reverse logistics costs"
              rows={3}
              className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
            />
            <div className="mt-2 flex flex-wrap gap-1">
              {PAIN_EXAMPLES.map(ex => (
                <button
                  key={ex}
                  onClick={() => onChange({ ...inputs, mainPainPoint: ex })}
                  className="text-xs text-slate-500 bg-slate-100 hover:bg-blue-50 hover:text-blue-700 rounded-md px-2 py-0.5 transition-colors"
                >
                  {ex}
                </button>
              ))}
            </div>
          </div>

          {/* Content Angle */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
              Content Angle
            </label>
            <select
              value={inputs.contentAngle}
              onChange={set('contentAngle')}
              className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white appearance-none cursor-pointer"
            >
              {ANGLE_OPTIONS.map(o => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>

          {/* Post Type */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
              Post Type
            </label>
            <div className="space-y-2">
              {POST_TYPE_OPTIONS.map(o => (
                <label
                  key={o.value}
                  className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                    inputs.postType === o.value
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <input
                    type="radio"
                    name="postType"
                    value={o.value}
                    checked={inputs.postType === o.value}
                    onChange={set('postType')}
                    className="mt-0.5 accent-blue-600"
                  />
                  <div>
                    <div className={`text-sm font-medium ${inputs.postType === o.value ? 'text-blue-700' : 'text-slate-700'}`}>
                      {o.label}
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">{o.description}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Tone */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
              Tone
            </label>
            <select
              value={inputs.tone}
              onChange={set('tone')}
              className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white appearance-none cursor-pointer"
            >
              {TONE_OPTIONS.map(o => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Generate button */}
        <button
          onClick={onGenerate}
          disabled={isDisabled}
          className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white font-semibold text-sm rounded-xl px-4 py-3.5 transition-colors shadow-sm"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              Generate Content
            </>
          )}
        </button>
      </div>
    </aside>
  )
}
