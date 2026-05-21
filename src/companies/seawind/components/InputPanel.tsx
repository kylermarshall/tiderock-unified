import type { Platform, PainPoint, ContentAngle, Tone, LinkedInInputs, YouTubeInputs, TwitterInputs, InstagramInputs, FacebookInputs } from '../types'
import { PAIN_POINT_LABELS, ANGLE_LABELS, TONE_LABELS } from '../lib/companyProfile'
import { clsx } from 'clsx'

type AnyFormatMap = Record<Platform, { id: string; label: string }[]>

const FORMAT_OPTIONS: AnyFormatMap = {
  linkedin: [
    { id: 'post_ideas', label: 'Post Ideas + Ranked List' },
    { id: 'full_post', label: 'Full Post' },
    { id: 'calendar', label: '30-Day Calendar' },
  ],
  youtube: [
    { id: 'short', label: 'YouTube Short (≤60s)' },
    { id: 'mid', label: '60–90 Second Video' },
    { id: 'longform', label: 'Long-Form Outline' },
  ],
  twitter: [
    { id: 'single', label: 'Single Post' },
    { id: 'thread', label: '5–8 Post Thread' },
    { id: 'contrarian', label: 'Contrarian Take' },
    { id: 'founder', label: 'Founder-Style Post' },
    { id: 'quote_response', label: 'Quote-Response' },
  ],
  instagram: [
    { id: 'reel', label: 'Reel Script' },
    { id: 'carousel', label: 'Carousel Outline' },
    { id: 'caption', label: 'Caption' },
    { id: 'story', label: 'Story Sequence' },
  ],
  facebook: [
    { id: 'short', label: 'Short Post' },
    { id: 'educational', label: 'Educational Post' },
    { id: 'discussion', label: 'Discussion Prompt' },
    { id: 'business_owner', label: 'Business Owner Post' },
    { id: 'retargeting', label: 'Retargeting Post' },
  ],
}

const TARGET_AUDIENCES = [
  'Restaurant operators (independent)',
  'Multi-unit restaurant operators',
  'Hotel F&B directors',
  'Contract foodservice managers',
  'Ghost kitchen operators',
  'Catering directors',
  'Food & beverage procurement teams',
]

const OBJECTIVES = [
  'Build awareness of spoilage cost',
  'Generate sourcing consultation leads',
  'Drive supply audit requests',
  'Educate on procurement best practices',
  'Challenge current sourcing assumptions',
  'Re-engage lapsed prospects',
]

interface FormState {
  platform: Platform
  format: string
  targetAudience: string
  painPoint: PainPoint
  angle: ContentAngle
  tone: Tone
  objective: string
}

interface Props {
  formState: FormState
  onChange: (updates: Partial<FormState>) => void
  onGenerate: () => void
  isGenerating: boolean
}

function Select({ label, value, onChange, options }: {
  label: string
  value: string
  onChange: (v: string) => void
  options: { value: string; label: string }[]
}) {
  return (
    <div>
      <label className="label">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="input-field"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </div>
  )
}

export default function InputPanel({ formState, onChange, onGenerate, isGenerating }: Props) {
  const formats = FORMAT_OPTIONS[formState.platform]

  return (
    <div className="space-y-5">
      <div className="card p-5 space-y-4">
        <h2 className="font-semibold text-slate-900 text-sm border-b border-slate-100 pb-3">
          Content Inputs
        </h2>

        {/* Format */}
        <div>
          <label className="label">Format</label>
          <div className="grid grid-cols-1 gap-1.5">
            {formats.map((f) => (
              <button
                key={f.id}
                onClick={() => onChange({ format: f.id })}
                className={clsx(
                  'text-left px-3 py-2 rounded-lg text-sm border transition-colors',
                  formState.format === f.id
                    ? 'bg-navy-800 text-white border-navy-800'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                )}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Target Audience */}
        <div>
          <label className="label">Target Audience</label>
          <select
            value={formState.targetAudience}
            onChange={(e) => onChange({ targetAudience: e.target.value })}
            className="input-field"
          >
            {TARGET_AUDIENCES.map((a) => (
              <option key={a} value={a}>{a}</option>
            ))}
          </select>
        </div>

        {/* Pain Point */}
        <Select
          label="Main Operational Problem"
          value={formState.painPoint}
          onChange={(v) => onChange({ painPoint: v as PainPoint })}
          options={Object.entries(PAIN_POINT_LABELS).map(([k, v]) => ({ value: k, label: v }))}
        />

        {/* Angle */}
        <Select
          label="Content Angle"
          value={formState.angle}
          onChange={(v) => onChange({ angle: v as ContentAngle })}
          options={Object.entries(ANGLE_LABELS).map(([k, v]) => ({ value: k, label: v }))}
        />

        {/* Tone */}
        <Select
          label="Tone"
          value={formState.tone}
          onChange={(v) => onChange({ tone: v as Tone })}
          options={Object.entries(TONE_LABELS).map(([k, v]) => ({ value: k, label: v }))}
        />

        {/* Objective */}
        <div>
          <label className="label">Objective</label>
          <select
            value={formState.objective}
            onChange={(e) => onChange({ objective: e.target.value })}
            className="input-field"
          >
            {OBJECTIVES.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
        </div>
      </div>

      <button
        onClick={onGenerate}
        disabled={isGenerating}
        className="btn-primary w-full justify-center py-3 text-base"
      >
        {isGenerating ? (
          <>
            <span className="animate-spin">⟳</span>
            Generating...
          </>
        ) : (
          <>
            <span>⚡</span>
            Generate Content
          </>
        )}
      </button>

      {/* Platform context reminder */}
      <div className="card p-4 bg-slate-50 border-slate-100">
        <p className="text-xs text-slate-500 font-semibold uppercase tracking-wide mb-2">Writing Rules Applied</p>
        <ul className="space-y-1">
          {[
            'Active voice, no exclamation points',
            'Concise, 8th-grade reading level',
            'No banned words (fresh, premium, solutions…)',
            'Financial consequence in every piece',
            'CTA tied to a specific action',
          ].map((r, i) => (
            <li key={i} className="text-xs text-slate-500 flex gap-1.5">
              <span className="text-emerald-500">✓</span>
              {r}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
