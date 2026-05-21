import { useState } from 'react'
import type { FacebookInputs, ContentVariation, Platform } from '../lib/types'
import { generateFacebookContent } from '../platforms/facebook'
import { CONTENT_THEMES, TARGET_AUDIENCES, CONTENT_ANGLES, TONES, OBJECTIVES } from '../lib/companyProfile'
import { QualityScore } from './QualityScore'
import { RegenerateBar } from './RegenerateBar'
import { ConvertButton } from './ConvertButton'
import { OutputSection } from './OutputSection'
import { CopyButton } from './CopyButton'

interface Props { onConvert: (to: Platform) => void }

const FORMAT_OPTIONS = [
  { value: 'short', label: 'Short Post' },
  { value: 'educational', label: 'Longer Educational Post' },
  { value: 'discussion', label: 'Discussion Prompt' },
  { value: 'business-owner', label: 'Business Owner Post' },
  { value: 'retargeting', label: 'Retargeting Post' },
] as const

const DEFAULT_INPUTS: FacebookInputs = {
  contentFormat: 'educational',
  targetReader: TARGET_AUDIENCES[0],
  mainProblem: 'cost-leakage',
  contentAngle: CONTENT_ANGLES[0],
  tone: TONES[0],
  objective: OBJECTIVES[1],
}

export function FacebookPanel({ onConvert }: Props) {
  const [inputs, setInputs] = useState<FacebookInputs>(DEFAULT_INPUTS)
  const [variation, setVariation] = useState<ContentVariation>('default')
  const [generated, setGenerated] = useState(false)
  const [output, setOutput] = useState(() => generateFacebookContent(DEFAULT_INPUTS, 'default'))

  function handleGenerate() {
    setOutput(generateFacebookContent(inputs, variation))
    setGenerated(true)
  }

  function handleVariation(v: ContentVariation) {
    setVariation(v)
    setOutput(generateFacebookContent(inputs, v))
    setGenerated(true)
  }

  const fullText = [output.primaryPost, '', `Practical Takeaway:\n${output.practicalTakeaway}`, '', output.cta, '', output.discussionQuestion].join('\n')

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-full">
      {/* Left: inputs */}
      <div className="w-full lg:w-80 shrink-0 space-y-4">
        <div className="card">
          <h3 className="font-semibold text-slate-800 mb-4 text-sm">Facebook Settings</h3>
          <div className="space-y-3">
            <div>
              <label className="label">Content Format</label>
              <select className="input-field" value={inputs.contentFormat} onChange={e => setInputs(i => ({ ...i, contentFormat: e.target.value as FacebookInputs['contentFormat'] }))}>
                {FORMAT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
            <div>
              <label className="label">Target Reader</label>
              <select className="input-field" value={inputs.targetReader} onChange={e => setInputs(i => ({ ...i, targetReader: e.target.value }))}>
                {TARGET_AUDIENCES.map(a => <option key={a}>{a}</option>)}
              </select>
            </div>
            <div>
              <label className="label">Main Packaging Problem</label>
              <select className="input-field" value={inputs.mainProblem} onChange={e => setInputs(i => ({ ...i, mainProblem: e.target.value as FacebookInputs['mainProblem'] }))}>
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
            Generate Facebook Content
          </button>
        </div>

        {generated && (
          <>
            <div className="card"><RegenerateBar current={variation} onSelect={handleVariation} /></div>
            <div className="card"><ConvertButton currentPlatform="facebook" onConvert={onConvert} /></div>
          </>
        )}
      </div>

      {/* Right: output */}
      {generated ? (
        <div className="flex-1 min-w-0 space-y-4">
          <div className="flex items-center justify-between">
            <span className="section-heading">
              {inputs.contentFormat === 'educational' ? 'Educational Post' :
               inputs.contentFormat === 'discussion' ? 'Discussion Post' :
               inputs.contentFormat === 'business-owner' ? 'Business Owner Post' :
               inputs.contentFormat === 'retargeting' ? 'Retargeting Post' : 'Short Post'}
            </span>
            <CopyButton text={fullText} label="Copy Full Post" />
          </div>

          <div className="rounded-xl border border-slate-200 overflow-hidden">
            <div className="flex items-center justify-between px-3 py-2 bg-[#1877F2] bg-opacity-5 border-b border-slate-200">
              <span className="text-xs font-semibold text-[#1877F2] uppercase tracking-wide">Primary Post</span>
              <CopyButton text={output.primaryPost} variant="icon" />
            </div>
            <div className="bg-white p-4">
              <p className="output-text whitespace-pre-line">{output.primaryPost}</p>
            </div>
          </div>

          <OutputSection label="Practical Takeaway" content={output.practicalTakeaway} />
          <OutputSection label="CTA" content={output.cta} />
          <OutputSection label="Discussion Question" content={output.discussionQuestion} />

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
            <div className="w-12 h-12 rounded-xl bg-[#1877F2] text-white flex items-center justify-center mx-auto mb-3 text-lg font-bold">f</div>
            <p className="text-slate-500 text-sm">Configure your inputs and generate Facebook content.</p>
          </div>
        </div>
      )}
    </div>
  )
}
