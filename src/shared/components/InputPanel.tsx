import type { Platform, PlatformInputs, LinkedInInputs, YouTubeInputs, TwitterInputs, InstagramInputs, FacebookInputs } from '../types'

interface InputPanelProps {
  platform: Platform
  inputs: PlatformInputs
  onChange: (inputs: PlatformInputs) => void
  onGenerate: () => void
  isGenerating: boolean
  // Company-specific data passed as props
  problemLabels: Record<string, string>
  targetAudiences: string[]
  contentAngles: string[]
  objectives: string[]
}

const selectClass = 'block w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-colors'
const labelClass  = 'block text-sm font-medium text-slate-600 mb-1.5'

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className={labelClass}>{label}</label>
      {children}
    </div>
  )
}

const tones = [
  { value: 'professional', label: 'Professional' },
  { value: 'direct',       label: 'Direct' },
  { value: 'educational',  label: 'Educational' },
  { value: 'contrarian',   label: 'Contrarian' },
  { value: 'data-driven',  label: 'Data-Driven' },
]

export function InputPanel({
  platform, inputs, onChange, onGenerate, isGenerating,
  problemLabels, targetAudiences, contentAngles, objectives,
}: InputPanelProps) {
  const update = (key: string, value: string) =>
    onChange({ ...inputs, [key]: value } as PlatformInputs)

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-5 sticky top-6">
      <div>
        <h2 className="text-base font-semibold text-slate-800">Content Parameters</h2>
        <p className="text-xs text-slate-400 mt-0.5">Configure inputs to generate platform-specific content</p>
      </div>

      <Field label="Target Audience">
        <select className={selectClass} value={inputs.targetAudience} onChange={e => update('targetAudience', e.target.value)}>
          {targetAudiences.map(a => <option key={a} value={a}>{a}</option>)}
        </select>
      </Field>

      <Field label="Operational Problem">
        <select className={selectClass} value={inputs.problem} onChange={e => update('problem', e.target.value)}>
          {Object.entries(problemLabels).map(([key, label]) => (
            <option key={key} value={key}>{label}</option>
          ))}
        </select>
      </Field>

      <Field label="Content Angle">
        <select className={selectClass} value={inputs.angle} onChange={e => update('angle', e.target.value)}>
          {contentAngles.map(a => <option key={a} value={a}>{a}</option>)}
        </select>
      </Field>

      <Field label="Tone">
        <select className={selectClass} value={inputs.tone} onChange={e => update('tone', e.target.value)}>
          {tones.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
        </select>
      </Field>

      <Field label="Objective">
        <select className={selectClass} value={inputs.objective} onChange={e => update('objective', e.target.value)}>
          {objectives.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
      </Field>

      {/* Platform-specific format selectors */}
      {platform === 'linkedin' && (
        <Field label="Content Focus">
          <select className={selectClass} value={(inputs as LinkedInInputs).contentFormat} onChange={e => update('contentFormat', e.target.value)}>
            <option value="post">Post + Ideas</option>
            <option value="calendar">Full Calendar</option>
          </select>
        </Field>
      )}
      {platform === 'youtube' && (
        <Field label="Video Format">
          <select className={selectClass} value={(inputs as YouTubeInputs).videoFormat} onChange={e => update('videoFormat', e.target.value)}>
            <option value="shorts">Shorts (Under 60s)</option>
            <option value="60-90s">60–90 Second Video</option>
            <option value="long-form">Long-Form (8–12 min)</option>
          </select>
        </Field>
      )}
      {platform === 'twitter' && (
        <Field label="Post Format">
          <select className={selectClass} value={(inputs as TwitterInputs).postFormat} onChange={e => update('postFormat', e.target.value)}>
            <option value="single">Single Post</option>
            <option value="thread">Thread (6–8 posts)</option>
            <option value="contrarian">Contrarian Take</option>
            <option value="founder">Founder Style</option>
            <option value="quote-response">Quote Response</option>
          </select>
        </Field>
      )}
      {platform === 'instagram' && (
        <>
          <Field label="Content Format">
            <select className={selectClass} value={(inputs as InstagramInputs).contentFormat} onChange={e => update('contentFormat', e.target.value)}>
              <option value="reel">Reel (30–45s)</option>
              <option value="carousel">Carousel (7–8 slides)</option>
              <option value="caption">Caption Only</option>
              <option value="story">Story Sequence</option>
            </select>
          </Field>
          <Field label="Visual Style">
            <select className={selectClass} value={(inputs as InstagramInputs).visualStyle} onChange={e => update('visualStyle', e.target.value)}>
              <option value="Clean Corporate">Clean Corporate</option>
              <option value="Industrial">Industrial</option>
              <option value="Documentary">Documentary</option>
              <option value="Data-Forward">Data-Forward</option>
            </select>
          </Field>
        </>
      )}
      {platform === 'facebook' && (
        <Field label="Content Format">
          <select className={selectClass} value={(inputs as FacebookInputs).contentFormat} onChange={e => update('contentFormat', e.target.value)}>
            <option value="short">Short Post (Under 200 words)</option>
            <option value="educational">Educational (400–600 words)</option>
            <option value="discussion">Discussion Prompt</option>
            <option value="business-owner">Business Owner</option>
            <option value="retargeting">Retargeting</option>
          </select>
        </Field>
      )}

      <button
        onClick={onGenerate}
        disabled={isGenerating}
        className="w-full flex items-center justify-center gap-2 bg-[#1B2A4A] hover:bg-[#243659] disabled:bg-slate-300 text-white font-semibold py-3 px-6 rounded-xl transition-all text-sm mt-2"
      >
        {isGenerating ? (
          <>
            <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Generating...
          </>
        ) : (
          <>
            Generate Content
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </>
        )}
      </button>
    </div>
  )
}
