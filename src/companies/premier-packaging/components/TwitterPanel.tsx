import { useState } from 'react'
import type { TwitterInputs, ContentVariation, Platform } from '../lib/types'
import { generateTwitterContent } from '../platforms/twitter'
import { CONTENT_THEMES, TARGET_AUDIENCES, CONTENT_ANGLES, TONES, OBJECTIVES } from '../lib/companyProfile'
import { QualityScore } from './QualityScore'
import { RegenerateBar } from './RegenerateBar'
import { ConvertButton } from './ConvertButton'
import { OutputSection } from './OutputSection'
import { CopyButton } from './CopyButton'

interface Props { onConvert: (to: Platform) => void }

const FORMAT_OPTIONS = [
  { value: 'single', label: 'Single Post' },
  { value: 'thread', label: '5–8 Post Thread' },
  { value: 'contrarian', label: 'Contrarian Take' },
  { value: 'founder', label: 'Founder-Style Post' },
  { value: 'quote-post', label: 'Quote-Post Response' },
] as const

const DEFAULT_INPUTS: TwitterInputs = {
  postFormat: 'single',
  targetAudience: TARGET_AUDIENCES[0],
  mainProblem: 'box-sizing',
  contentAngle: CONTENT_ANGLES[0],
  tone: TONES[1],
  objective: OBJECTIVES[3],
}

export function TwitterPanel({ onConvert }: Props) {
  const [inputs, setInputs] = useState<TwitterInputs>(DEFAULT_INPUTS)
  const [variation, setVariation] = useState<ContentVariation>('default')
  const [generated, setGenerated] = useState(false)
  const [output, setOutput] = useState(() => generateTwitterContent(DEFAULT_INPUTS, 'default'))

  function handleGenerate() {
    setOutput(generateTwitterContent(inputs, variation))
    setGenerated(true)
  }

  function handleVariation(v: ContentVariation) {
    setVariation(v)
    setOutput(generateTwitterContent(inputs, v))
    setGenerated(true)
  }

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-full">
      {/* Left: inputs */}
      <div className="w-full lg:w-80 shrink-0 space-y-4">
        <div className="card">
          <h3 className="font-semibold text-slate-800 mb-4 text-sm">X / Twitter Settings</h3>
          <div className="space-y-3">
            <div>
              <label className="label">Post Format</label>
              <select className="input-field" value={inputs.postFormat} onChange={e => setInputs(i => ({ ...i, postFormat: e.target.value as TwitterInputs['postFormat'] }))}>
                {FORMAT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
            <div>
              <label className="label">Target Audience</label>
              <select className="input-field" value={inputs.targetAudience} onChange={e => setInputs(i => ({ ...i, targetAudience: e.target.value }))}>
                {TARGET_AUDIENCES.map(a => <option key={a}>{a}</option>)}
              </select>
            </div>
            <div>
              <label className="label">Main Packaging Problem</label>
              <select className="input-field" value={inputs.mainProblem} onChange={e => setInputs(i => ({ ...i, mainProblem: e.target.value as TwitterInputs['mainProblem'] }))}>
                {CONTENT_THEMES.map(t => <option key={t.id} value={t.id}>{t.label}</option>)}
              </select>
            </div>
            <div>
              <label className="label">Content Angle</label>
              <select className="input-field" value={inputs.contentAngle} onChange={e => setInputs(i => ({ ...i, contentAngle: e.target.value }))}>
                {CONTENT_ANGLES.map(a => <option key={a}>{a}</option>)}
              </select>
            </div>
            <div>
              <label className="label">Tone</label>
              <select className="input-field" value={inputs.tone} onChange={e => setInputs(i => ({ ...i, tone: e.target.value }))}>
                {TONES.map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="label">Objective</label>
              <select className="input-field" value={inputs.objective} onChange={e => setInputs(i => ({ ...i, objective: e.target.value }))}>
                {OBJECTIVES.map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
          </div>
          <button onClick={handleGenerate} className="btn-primary w-full mt-4">
            Generate X / Twitter Content
          </button>
        </div>

        {generated && (
          <>
            <div className="card"><RegenerateBar current={variation} onSelect={handleVariation} /></div>
            <div className="card"><ConvertButton currentPlatform="twitter" onConvert={onConvert} /></div>
          </>
        )}
      </div>

      {/* Right: output */}
      {generated ? (
        <div className="flex-1 min-w-0 space-y-4">
          {/* Main post */}
          <div className="rounded-xl border border-slate-200 overflow-hidden">
            <div className="flex items-center justify-between px-3 py-2 bg-slate-50 border-b border-slate-200">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                {inputs.postFormat === 'thread' ? 'Thread' : inputs.postFormat === 'contrarian' ? 'Contrarian Take' : inputs.postFormat === 'founder' ? 'Founder Post' : inputs.postFormat === 'quote-post' ? 'Quote-Post Response' : 'Single Post'}
              </span>
              <CopyButton text={output.mainPost} label="Copy Post" />
            </div>
            <div className="bg-white p-4">
              <pre className="output-text font-sans whitespace-pre-wrap">{output.mainPost}</pre>
            </div>
          </div>

          <OutputSection label="Alternate Hook" content={output.alternateHook} />
          <OutputSection label="CTA" content={output.cta} />
          <OutputSection label="Engagement Question" content={output.engagementQuestion} />

          <QualityScore score={output.qualityScore} />

          <div className="card">
            <p className="section-heading">Repurposing Suggestions</p>
            <ul className="space-y-1.5">
              {output.repurposingSuggestions.map((s, i) => (
                <li key={i} className="text-sm text-slate-600 flex gap-2"><span className="text-brand-700 font-bold shrink-0">→</span>{s}</li>
              ))}
            </ul>
          </div>

          <div className="card">
            <p className="section-heading">Improvement Suggestions</p>
            <ul className="space-y-1.5">
              {output.improvementSuggestions.map((s, i) => (
                <li key={i} className="text-sm text-slate-600 flex gap-2"><span className="text-brand-700 font-bold shrink-0">→</span>{s}</li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center mx-auto mb-3 text-lg font-bold">𝕏</div>
            <p className="text-slate-500 text-sm">Configure your inputs and generate X / Twitter content.</p>
          </div>
        </div>
      )}
    </div>
  )
}
