import { useState } from 'react'
import type { InstagramInputs, ContentVariation, Platform, InstagramSlide } from '../lib/types'
import { generateInstagramContent } from '../platforms/instagram'
import { CONTENT_THEMES, TARGET_AUDIENCES, CONTENT_ANGLES, VISUAL_STYLES } from '../lib/companyProfile'
import { QualityScore } from './QualityScore'
import { RegenerateBar } from './RegenerateBar'
import { ConvertButton } from './ConvertButton'
import { OutputSection } from './OutputSection'
import { CopyButton } from './CopyButton'
import clsx from 'clsx'

interface Props { onConvert: (to: Platform) => void }

const FORMAT_OPTIONS = [
  { value: 'reel', label: 'Reel Script' },
  { value: 'carousel', label: 'Carousel Outline' },
  { value: 'caption', label: 'Caption' },
  { value: 'story', label: 'Story Sequence' },
] as const

const DEFAULT_INPUTS: InstagramInputs = {
  contentFormat: 'carousel',
  targetViewer: TARGET_AUDIENCES[0],
  mainProblem: 'box-sizing',
  contentAngle: CONTENT_ANGLES[0],
  visualStyle: VISUAL_STYLES[0],
  objective: 'Brand awareness — establish expertise',
}

export function InstagramPanel({ onConvert }: Props) {
  const [inputs, setInputs] = useState<InstagramInputs>(DEFAULT_INPUTS)
  const [variation, setVariation] = useState<ContentVariation>('default')
  const [generated, setGenerated] = useState(false)
  const [output, setOutput] = useState(() => generateInstagramContent(DEFAULT_INPUTS, 'default'))

  function handleGenerate() {
    setOutput(generateInstagramContent(inputs, variation))
    setGenerated(true)
  }

  function handleVariation(v: ContentVariation) {
    setVariation(v)
    setOutput(generateInstagramContent(inputs, v))
    setGenerated(true)
  }

  const isSlides = Array.isArray(output.reelScriptOrSlides)
  const slides = isSlides ? (output.reelScriptOrSlides as InstagramSlide[]) : []
  const scriptText = isSlides ? '' : (output.reelScriptOrSlides as string)

  const fullText = [
    `VISUAL HOOK: ${output.visualHook}`,
    `ON-SCREEN TEXT: ${output.onScreenText}`,
    '',
    isSlides ? slides.map(s => `SLIDE ${s.slideNumber}: ${s.onScreenText}`).join('\n') : `SCRIPT:\n${scriptText}`,
    '',
    `CAPTION:\n${output.caption}`,
    `CTA: ${output.cta}`,
  ].join('\n')

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-full">
      {/* Left: inputs */}
      <div className="w-full lg:w-80 shrink-0 space-y-4">
        <div className="card">
          <h3 className="font-semibold text-slate-800 mb-4 text-sm">Instagram Settings</h3>
          <div className="space-y-3">
            <div>
              <label className="label">Content Format</label>
              <select className="input-field" value={inputs.contentFormat} onChange={e => setInputs(i => ({ ...i, contentFormat: e.target.value as InstagramInputs['contentFormat'] }))}>
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
              <select className="input-field" value={inputs.mainProblem} onChange={e => setInputs(i => ({ ...i, mainProblem: e.target.value as InstagramInputs['mainProblem'] }))}>
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
              <label className="label">Visual Style</label>
              <select className="input-field" value={inputs.visualStyle} onChange={e => setInputs(i => ({ ...i, visualStyle: e.target.value }))}>
                {VISUAL_STYLES.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
          </div>
          <button onClick={handleGenerate} className="btn-primary w-full mt-4">
            Generate Instagram Content
          </button>
        </div>

        {generated && (
          <>
            <div className="card"><RegenerateBar current={variation} onSelect={handleVariation} /></div>
            <div className="card"><ConvertButton currentPlatform="instagram" onConvert={onConvert} /></div>
          </>
        )}
      </div>

      {/* Right: output */}
      {generated ? (
        <div className="flex-1 min-w-0 space-y-4">
          {/* Visual hook */}
          <div className="rounded-lg border border-pink-200 bg-gradient-to-r from-purple-50 to-pink-50 p-4">
            <p className="text-xs font-semibold text-purple-600 uppercase tracking-wide mb-1">Visual Hook</p>
            <p className="text-sm text-slate-800">{output.visualHook}</p>
          </div>

          <OutputSection label="On-Screen Text" content={output.onScreenText} />

          {/* Carousel slides */}
          {isSlides && slides.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="section-heading">Carousel Slides</span>
                <CopyButton text={slides.map(s => `Slide ${s.slideNumber}: ${s.onScreenText}`).join('\n\n')} label="Copy All Slides" />
              </div>
              {slides.map(slide => (
                <div key={slide.slideNumber} className="rounded-lg border border-slate-200 overflow-hidden">
                  <div className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-purple-600 to-pink-500">
                    <span className="text-white text-xs font-bold">Slide {slide.slideNumber}</span>
                    <span className="text-pink-200 text-xs">— {slide.role}</span>
                  </div>
                  <div className="p-3 bg-white space-y-2">
                    <div>
                      <p className="text-xs text-slate-400 uppercase tracking-wide font-semibold mb-0.5">On-Screen Text</p>
                      <p className="text-sm font-semibold text-slate-800 whitespace-pre-line">{slide.onScreenText}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 uppercase tracking-wide font-semibold mb-0.5">Visual</p>
                      <p className="text-xs text-slate-500">{slide.visualDescription}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Reel/Story script */}
          {!isSlides && scriptText && (
            <div className="rounded-lg border border-slate-200 overflow-hidden">
              <div className="flex items-center justify-between px-3 py-2 bg-slate-50 border-b border-slate-200">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                  {inputs.contentFormat === 'reel' ? 'Reel Script' : 'Story Sequence'}
                </span>
                <CopyButton text={scriptText} />
              </div>
              <div className="bg-white p-4">
                <pre className="output-text font-sans text-xs whitespace-pre-wrap">{scriptText}</pre>
              </div>
            </div>
          )}

          {/* Caption */}
          {output.caption && (
            <div className="rounded-lg border border-slate-200 overflow-hidden">
              <div className="flex items-center justify-between px-3 py-2 bg-slate-50 border-b border-slate-200">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Caption</span>
                <CopyButton text={output.caption} />
              </div>
              <div className="bg-white p-4">
                <p className="output-text whitespace-pre-line">{output.caption}</p>
              </div>
            </div>
          )}

          <OutputSection label="CTA" content={output.cta} />

          {/* Suggested visuals */}
          <div className="card">
            <p className="section-heading">Suggested Visuals / B-Roll</p>
            <ul className="space-y-1.5">
              {output.suggestedVisuals.map((v, i) => (
                <li key={i} className="text-sm text-slate-600 flex gap-2">
                  <span className="text-pink-500 font-bold shrink-0">📷</span>{v}
                </li>
              ))}
            </ul>
          </div>

          <CopyButton text={fullText} label="Copy Full Output" className="w-full justify-center" />

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
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-pink-500 text-white flex items-center justify-center mx-auto mb-3 text-lg">📷</div>
            <p className="text-slate-500 text-sm">Configure your inputs and generate Instagram content.</p>
          </div>
        </div>
      )}
    </div>
  )
}

void clsx
