import { useState } from 'react'
import type { YouTubeInputs, ContentVariation, Platform } from '../lib/types'
import { generateYouTubeContent } from '../platforms/youtube'
import { CONTENT_THEMES, TARGET_AUDIENCES, CONTENT_ANGLES, TONES } from '../lib/companyProfile'
import { QualityScore } from './QualityScore'
import { RegenerateBar } from './RegenerateBar'
import { ConvertButton } from './ConvertButton'
import { OutputSection } from './OutputSection'
import { CopyButton } from './CopyButton'
import clsx from 'clsx'

interface Props { onConvert: (to: Platform) => void }

const DEFAULT_INPUTS: YouTubeInputs = {
  videoFormat: 'shorts',
  targetViewer: TARGET_AUDIENCES[0],
  mainProblem: 'box-sizing',
  contentAngle: CONTENT_ANGLES[0],
  videoObjective: 'Educate and drive awareness',
  tone: TONES[0],
}

const FORMAT_OPTIONS = [
  { value: 'shorts', label: 'YouTube Shorts (≤60s)' },
  { value: '60-90s', label: '60–90 Second Video' },
  { value: 'long-form', label: 'Long-Form (15–20 min)' },
] as const

export function YouTubePanel({ onConvert }: Props) {
  const [inputs, setInputs] = useState<YouTubeInputs>(DEFAULT_INPUTS)
  const [variation, setVariation] = useState<ContentVariation>('default')
  const [generated, setGenerated] = useState(false)
  const [output, setOutput] = useState(() => generateYouTubeContent(DEFAULT_INPUTS, 'default'))

  function handleGenerate() {
    setOutput(generateYouTubeContent(inputs, variation))
    setGenerated(true)
  }

  function handleVariation(v: ContentVariation) {
    setVariation(v)
    setOutput(generateYouTubeContent(inputs, v))
    setGenerated(true)
  }

  const fullScriptText = [
    `TITLE: ${output.videoTitle}`,
    `THUMBNAIL: ${output.thumbnailText}`,
    `HOOK (0:00–0:03): ${output.firstThreeSecondHook}`,
    `OPENING LINE: ${output.openingLine}`,
    '',
    'SCRIPT:',
    output.mainScript,
    '',
    `BUSINESS INSIGHT: ${output.businessInsight}`,
    `CTA: ${output.cta}`,
  ].join('\n')

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-full">
      {/* Left: inputs */}
      <div className="w-full lg:w-80 shrink-0 space-y-4">
        <div className="card">
          <h3 className="font-semibold text-slate-800 mb-4 text-sm">YouTube Settings</h3>
          <div className="space-y-3">
            <div>
              <label className="label">Video Format</label>
              <select className="input-field" value={inputs.videoFormat} onChange={e => setInputs(i => ({ ...i, videoFormat: e.target.value as YouTubeInputs['videoFormat'] }))}>
                {FORMAT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
            <div>
              <label className="label">Target Viewer</label>
              <select className="input-field" value={inputs.targetViewer} onChange={e => setInputs(i => ({ ...i, targetViewer: e.target.value }))}>
                {TARGET_AUDIENCES.map(a => <option key={a}>{a}</option>)}
              </select>
            </div>
            <div>
              <label className="label">Main Packaging Problem</label>
              <select className="input-field" value={inputs.mainProblem} onChange={e => setInputs(i => ({ ...i, mainProblem: e.target.value as YouTubeInputs['mainProblem'] }))}>
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
              <label className="label">Video Objective</label>
              <input className="input-field" value={inputs.videoObjective} onChange={e => setInputs(i => ({ ...i, videoObjective: e.target.value }))} placeholder="e.g. Educate and drive awareness" />
            </div>
            <div>
              <label className="label">Tone</label>
              <select className="input-field" value={inputs.tone} onChange={e => setInputs(i => ({ ...i, tone: e.target.value }))}>
                {TONES.map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
          </div>
          <button onClick={handleGenerate} className="btn-primary w-full mt-4">
            Generate YouTube Content
          </button>
        </div>

        {generated && (
          <>
            <div className="card"><RegenerateBar current={variation} onSelect={handleVariation} /></div>
            <div className="card"><ConvertButton currentPlatform="youtube" onConvert={onConvert} /></div>
          </>
        )}
      </div>

      {/* Right: output */}
      {generated ? (
        <div className="flex-1 min-w-0 space-y-4">
          {/* Title + Thumbnail */}
          <div className="grid grid-cols-2 gap-3">
            <div className="card">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Video Title</p>
              <div className="flex items-start justify-between gap-2">
                <p className="text-sm font-semibold text-slate-800 leading-snug">{output.videoTitle}</p>
                <CopyButton text={output.videoTitle} variant="icon" />
              </div>
            </div>
            <div className="card bg-slate-900">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Thumbnail Text</p>
              <div className="flex items-start justify-between gap-2">
                <p className="text-sm font-bold text-white leading-snug">{output.thumbnailText}</p>
                <CopyButton text={output.thumbnailText} variant="icon" className="text-slate-400 hover:text-white hover:bg-slate-700" />
              </div>
            </div>
          </div>

          {/* Hook + Opening */}
          <OutputSection label="First 3-Second Hook" content={output.firstThreeSecondHook} />
          <OutputSection label="Opening Line" content={output.openingLine} />

          {/* Script */}
          <div className="rounded-lg border border-slate-200 overflow-hidden">
            <div className="flex items-center justify-between px-3 py-2 bg-slate-50 border-b border-slate-200">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                {inputs.videoFormat === 'long-form' ? 'Video Outline' : 'Script'}
              </span>
              <CopyButton text={fullScriptText} label="Copy All" />
            </div>
            <div className="bg-white p-4">
              <pre className="output-text font-sans text-xs leading-relaxed whitespace-pre-wrap">{output.mainScript}</pre>
            </div>
          </div>

          {/* Retention Beats */}
          <div className="card">
            <p className="section-heading">Retention Beats</p>
            <div className="space-y-1.5">
              {output.retentionBeats.map((beat, i) => (
                <div key={i} className="flex gap-2 text-sm">
                  <span className="text-brand-700 font-bold shrink-0">▸</span>
                  <span className="text-slate-700">{beat}</span>
                </div>
              ))}
            </div>
          </div>

          <OutputSection label="Business Insight" content={output.businessInsight} />
          <OutputSection label="CTA" content={output.cta} />
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
            <div className="w-12 h-12 rounded-xl bg-[#FF0000] text-white flex items-center justify-center mx-auto mb-3">
              <span className="text-lg font-bold">▶</span>
            </div>
            <p className="text-slate-500 text-sm">Configure your inputs and generate YouTube content.</p>
          </div>
        </div>
      )}
    </div>
  )
}

// keep clsx import happy
void clsx
