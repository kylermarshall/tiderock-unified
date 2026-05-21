import type { Platform, ProblemType, ToneType, LinkedInInputs, YouTubeInputs, TwitterInputs, InstagramInputs, FacebookInputs, PlatformInputs } from '../types'
import { PROBLEM_LABELS, TARGET_AUDIENCES } from '../lib/companyProfile'

interface InputPanelProps {
  platform: Platform
  inputs: PlatformInputs
  onChange: (inputs: PlatformInputs) => void
  onGenerate: () => void
}

const TONES: { key: ToneType; label: string }[] = [
  { key: 'professional', label: 'Professional' },
  { key: 'direct', label: 'Direct' },
  { key: 'educational', label: 'Educational' },
  { key: 'contrarian', label: 'Contrarian' },
  { key: 'data-driven', label: 'Data-Driven' },
]

const LINKEDIN_FORMATS = ['post', 'calendar']
const YOUTUBE_FORMATS = ['shorts', '60-90s', 'long-form']
const TWITTER_FORMATS = ['single', 'thread', 'contrarian', 'founder', 'quote-response']
const INSTAGRAM_FORMATS = ['reel', 'carousel', 'caption', 'story']
const INSTAGRAM_STYLES = ['Industrial', 'Clean Minimal', 'Bold Typographic', 'Documentary', 'Behind-the-scenes']
const FACEBOOK_FORMATS = ['short', 'educational', 'discussion', 'business-owner', 'retargeting']

function SelectField({
  label,
  value,
  options,
  onChange,
}: {
  label: string
  value: string
  options: string[] | { value: string; label: string }[]
  onChange: (v: string) => void
}) {
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-pmt-dark border border-pmt-steel/50 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-pmt-blue/60 focus:ring-1 focus:ring-pmt-blue/30 transition-colors appearance-none"
      >
        {options.map((opt) =>
          typeof opt === 'string' ? (
            <option key={opt} value={opt}>
              {opt.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
            </option>
          ) : (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          )
        )}
      </select>
    </div>
  )
}

function TextareaField({
  label,
  value,
  placeholder,
  onChange,
  rows = 2,
}: {
  label: string
  value: string
  placeholder: string
  onChange: (v: string) => void
  rows?: number
}) {
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider">{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="w-full bg-pmt-dark border border-pmt-steel/50 rounded-lg px-3 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-pmt-blue/60 focus:ring-1 focus:ring-pmt-blue/30 transition-colors resize-none"
      />
    </div>
  )
}

export function InputPanel({ platform, inputs, onChange, onGenerate }: InputPanelProps) {
  const problemOptions = Object.entries(PROBLEM_LABELS).map(([value, label]) => ({ value, label }))

  function update(partial: Partial<PlatformInputs>) {
    onChange({ ...inputs, ...partial } as PlatformInputs)
  }

  return (
    <div className="flex flex-col h-full">
      <div className="px-6 py-5 border-b border-pmt-steel/30">
        <h2 className="text-sm font-semibold text-white uppercase tracking-wider">Content Inputs</h2>
        <p className="text-xs text-slate-500 mt-0.5">Configure parameters for {platform} content</p>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5 custom-scrollbar">
        <SelectField
          label="Target Audience"
          value={inputs.targetAudience}
          options={TARGET_AUDIENCES}
          onChange={(v) => update({ targetAudience: v })}
        />

        <SelectField
          label="Problem / Pain Point"
          value={inputs.problem}
          options={problemOptions}
          onChange={(v) => update({ problem: v as ProblemType })}
        />

        <SelectField
          label="Tone"
          value={inputs.tone}
          options={TONES.map((t) => ({ value: t.key, label: t.label }))}
          onChange={(v) => update({ tone: v as ToneType })}
        />

        <TextareaField
          label="Angle / Unique POV"
          value={inputs.angle}
          placeholder="e.g., Process parameter drift is the root cause most plants ignore"
          onChange={(v) => update({ angle: v })}
        />

        <TextareaField
          label="Objective"
          value={inputs.objective}
          placeholder="e.g., Drive awareness of PMT's process engineering support"
          onChange={(v) => update({ objective: v })}
        />

        {platform === 'linkedin' && (
          <SelectField
            label="Content Format"
            value={(inputs as LinkedInInputs).contentFormat}
            options={LINKEDIN_FORMATS}
            onChange={(v) => update({ contentFormat: v } as Partial<LinkedInInputs>)}
          />
        )}

        {platform === 'youtube' && (
          <SelectField
            label="Video Format"
            value={(inputs as YouTubeInputs).videoFormat}
            options={YOUTUBE_FORMATS}
            onChange={(v) => update({ videoFormat: v } as Partial<YouTubeInputs>)}
          />
        )}

        {platform === 'twitter' && (
          <SelectField
            label="Post Format"
            value={(inputs as TwitterInputs).postFormat}
            options={TWITTER_FORMATS}
            onChange={(v) => update({ postFormat: v } as Partial<TwitterInputs>)}
          />
        )}

        {platform === 'instagram' && (
          <>
            <SelectField
              label="Content Format"
              value={(inputs as InstagramInputs).contentFormat}
              options={INSTAGRAM_FORMATS}
              onChange={(v) => update({ contentFormat: v } as Partial<InstagramInputs>)}
            />
            <SelectField
              label="Visual Style"
              value={(inputs as InstagramInputs).visualStyle || 'Industrial'}
              options={INSTAGRAM_STYLES}
              onChange={(v) => update({ visualStyle: v } as Partial<InstagramInputs>)}
            />
          </>
        )}

        {platform === 'facebook' && (
          <SelectField
            label="Post Format"
            value={(inputs as FacebookInputs).contentFormat}
            options={FACEBOOK_FORMATS}
            onChange={(v) => update({ contentFormat: v } as Partial<FacebookInputs>)}
          />
        )}
      </div>

      <div className="px-6 py-4 border-t border-pmt-steel/30">
        <button
          onClick={onGenerate}
          className="w-full py-3 rounded-lg bg-pmt-blue hover:bg-pmt-sky text-white font-semibold text-sm transition-colors duration-150 shadow-lg shadow-pmt-blue/20"
        >
          Generate Content
        </button>
      </div>
    </div>
  )
}
