import { Platform, ProblemType, PlatformInputs } from '../types'
import { PROBLEM_LABELS, TARGET_AUDIENCES } from '../lib/companyProfile'

interface Props {
  platform: Platform
  inputs: PlatformInputs
  onChange: (inputs: PlatformInputs) => void
  onGenerate: () => void
}

const PROBLEMS = Object.entries(PROBLEM_LABELS) as [ProblemType, string][]

const TONES = [
  { value: 'professional', label: 'Professional' },
  { value: 'direct', label: 'Direct' },
  { value: 'educational', label: 'Educational' },
  { value: 'contrarian', label: 'Contrarian' },
  { value: 'data-driven', label: 'Data-Driven' },
]

const LINKEDIN_FORMATS = [
  { value: 'post', label: 'Post' },
  { value: 'calendar', label: 'Calendar' },
]

const YOUTUBE_FORMATS = [
  { value: 'shorts', label: 'YouTube Shorts (< 60s)' },
  { value: '60-90s', label: 'Short Form (60–90s)' },
  { value: 'long-form', label: 'Long Form (8–12 min)' },
]

const TWITTER_FORMATS = [
  { value: 'single', label: 'Single Post' },
  { value: 'thread', label: 'Thread' },
  { value: 'contrarian', label: 'Contrarian Take' },
  { value: 'founder', label: 'Founder Post' },
  { value: 'quote-response', label: 'Quote Response' },
]

const INSTAGRAM_FORMATS = [
  { value: 'reel', label: 'Reel' },
  { value: 'carousel', label: 'Carousel' },
  { value: 'caption', label: 'Static Caption' },
  { value: 'story', label: 'Story Sequence' },
]

const FACEBOOK_FORMATS = [
  { value: 'short', label: 'Short Post' },
  { value: 'educational', label: 'Educational Post' },
  { value: 'discussion', label: 'Discussion Prompt' },
  { value: 'business-owner', label: 'Business Owner Post' },
  { value: 'retargeting', label: 'Retargeting Post' },
]

function Select({ label, value, onChange, options }: {
  label: string
  value: string
  onChange: (v: string) => void
  options: { value: string; label: string }[]
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-proactive-muted mb-1.5">{label}</label>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full bg-proactive-steel border border-proactive-border text-proactive-text text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-proactive-blue"
      >
        {options.map(o => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </div>
  )
}

export default function InputPanel({ platform, inputs, onChange, onGenerate }: Props) {
  const raw = inputs as unknown as Record<string, unknown>

  const set = (key: string, value: unknown) => {
    onChange({ ...inputs, [key]: value } as PlatformInputs)
  }

  const problemOptions = PROBLEMS.map(([v, l]) => ({ value: v, label: l }))
  const audienceOptions = TARGET_AUDIENCES.map(a => ({ value: a, label: a }))

  return (
    <div className="space-y-5">
      <Select
        label="Problem / Pain Point"
        value={raw.problem as string}
        onChange={v => set('problem', v)}
        options={problemOptions}
      />

      <Select
        label="Target Audience"
        value={raw.targetAudience as string}
        onChange={v => set('targetAudience', v)}
        options={audienceOptions}
      />

      <Select
        label="Tone"
        value={raw.tone as string}
        onChange={v => set('tone', v)}
        options={TONES}
      />

      {platform === 'linkedin' && (
        <Select
          label="Content Format"
          value={raw.contentFormat as string ?? 'post'}
          onChange={v => set('contentFormat', v)}
          options={LINKEDIN_FORMATS}
        />
      )}

      {platform === 'youtube' && (
        <Select
          label="Video Format"
          value={raw.videoFormat as string ?? 'long-form'}
          onChange={v => set('videoFormat', v)}
          options={YOUTUBE_FORMATS}
        />
      )}

      {platform === 'twitter' && (
        <Select
          label="Post Format"
          value={raw.postFormat as string ?? 'single'}
          onChange={v => set('postFormat', v)}
          options={TWITTER_FORMATS}
        />
      )}

      {platform === 'instagram' && (
        <Select
          label="Content Format"
          value={raw.contentFormat as string ?? 'reel'}
          onChange={v => set('contentFormat', v)}
          options={INSTAGRAM_FORMATS}
        />
      )}

      {platform === 'facebook' && (
        <Select
          label="Content Format"
          value={raw.contentFormat as string ?? 'short'}
          onChange={v => set('contentFormat', v)}
          options={FACEBOOK_FORMATS}
        />
      )}

      <button
        onClick={onGenerate}
        className="w-full py-3 bg-proactive-blue hover:bg-proactive-bluelight text-white font-semibold rounded-lg transition-colors text-sm"
      >
        Generate Content
      </button>
    </div>
  )
}
