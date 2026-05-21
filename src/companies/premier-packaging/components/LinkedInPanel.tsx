import { useState } from 'react'
import type { LinkedInInputs, ContentVariation } from '../lib/types'
import { generateLinkedInContent } from '../platforms/linkedin'
import { CONTENT_THEMES, TARGET_AUDIENCES, CONTENT_ANGLES, TONES, OBJECTIVES } from '../lib/companyProfile'
import { QualityScore } from './QualityScore'
import { RegenerateBar } from './RegenerateBar'
import { ConvertButton } from './ConvertButton'
import { OutputSection } from './OutputSection'
import { CopyButton } from './CopyButton'
import type { Platform } from '../lib/types'
import clsx from 'clsx'

interface Props {
  onConvert: (to: Platform) => void
}

const DEFAULT_INPUTS: LinkedInInputs = {
  targetAudience: TARGET_AUDIENCES[0],
  mainProblem: 'box-sizing',
  contentAngle: CONTENT_ANGLES[0],
  tone: TONES[0],
  objective: OBJECTIVES[1],
}

export function LinkedInPanel({ onConvert }: Props) {
  const [inputs, setInputs] = useState<LinkedInInputs>(DEFAULT_INPUTS)
  const [variation, setVariation] = useState<ContentVariation>('default')
  const [generated, setGenerated] = useState(false)
  const [output, setOutput] = useState(() => generateLinkedInContent(DEFAULT_INPUTS, 'default'))
  const [activeTab, setActiveTab] = useState<'post' | 'ideas' | 'calendar' | 'repurpose'>('post')

  function handleGenerate() {
    setOutput(generateLinkedInContent(inputs, variation))
    setGenerated(true)
  }

  function handleVariation(v: ContentVariation) {
    setVariation(v)
    setOutput(generateLinkedInContent(inputs, v))
    setGenerated(true)
  }

  const fullPostText = `${output.fullPost.hook}\n\n${output.fullPost.body}\n\n${output.fullPost.businessImpact}\n\n${output.fullPost.cta}`

  const calendarText = output.contentCalendar
    .map(e => `Day ${e.day}: ${e.topic}\nHook: ${e.hook}\nAngle: ${e.angle}\nCTA: ${e.cta}`)
    .join('\n\n')

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-full">
      {/* Left: inputs */}
      <div className="w-full lg:w-80 shrink-0 space-y-4">
        <div className="card">
          <h3 className="font-semibold text-slate-800 mb-4 text-sm">LinkedIn Settings</h3>
          <div className="space-y-3">
            <div>
              <label className="label">Target Audience</label>
              <select className="input-field" value={inputs.targetAudience} onChange={e => setInputs(i => ({ ...i, targetAudience: e.target.value }))}>
                {TARGET_AUDIENCES.map(a => <option key={a}>{a}</option>)}
              </select>
            </div>
            <div>
              <label className="label">Main Packaging Problem</label>
              <select className="input-field" value={inputs.mainProblem} onChange={e => setInputs(i => ({ ...i, mainProblem: e.target.value as LinkedInInputs['mainProblem'] }))}>
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
            Generate LinkedIn Content
          </button>
        </div>

        {generated && (
          <>
            <div className="card">
              <RegenerateBar current={variation} onSelect={handleVariation} />
            </div>
            <div className="card">
              <ConvertButton currentPlatform="linkedin" onConvert={onConvert} />
            </div>
          </>
        )}
      </div>

      {/* Right: output */}
      {generated && (
        <div className="flex-1 min-w-0 space-y-4">
          {/* Tabs */}
          <div className="flex gap-1 bg-slate-100 p-1 rounded-lg">
            {(['post', 'ideas', 'calendar', 'repurpose'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={clsx(
                  'flex-1 text-xs font-semibold py-1.5 rounded-md capitalize transition-colors',
                  activeTab === tab ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700',
                )}
              >
                {tab === 'repurpose' ? 'Repurpose' : tab === 'ideas' ? 'Post Ideas' : tab === 'calendar' ? 'Calendar' : 'Full Post'}
              </button>
            ))}
          </div>

          {activeTab === 'post' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="section-heading">Full LinkedIn Post</span>
                <CopyButton text={fullPostText} label="Copy Full Post" />
              </div>
              <OutputSection label="Hook" content={output.fullPost.hook} />
              <OutputSection label="Body" content={output.fullPost.body} />
              <OutputSection label="Business Impact" content={output.fullPost.businessImpact} />
              <OutputSection label="CTA" content={output.fullPost.cta} />
              <QualityScore score={output.qualityScore} />
              <div className="card">
                <span className="section-heading">Improvement Suggestions</span>
                <ul className="space-y-1.5">
                  {output.improvementSuggestions.map((s, i) => (
                    <li key={i} className="text-sm text-slate-600 flex gap-2">
                      <span className="text-brand-700 font-bold shrink-0">→</span>
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'ideas' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="section-heading">10 Post Ideas — Ranked</span>
              </div>
              <div className="space-y-2">
                {output.rankedIdeas.slice(0, 10).map((idea, i) => (
                  <div key={i} className="card py-3">
                    <div className="flex items-start gap-3">
                      <span className="text-xl font-bold text-brand-700 leading-none mt-0.5 shrink-0 w-6">
                        {i + 1}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-slate-800 leading-snug">{idea.title}</p>
                        <p className="text-xs text-slate-500 mt-1">{idea.angle}</p>
                        <div className="flex gap-3 mt-2">
                          <ScorePill label="Pain" value={idea.painClarity} max={10} />
                          <ScorePill label="Impact" value={idea.financialImpact} max={10} />
                          <ScorePill label="Tension" value={idea.tension} max={10} />
                          <ScorePill label="Total" value={idea.totalScore} max={30} highlight />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'calendar' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="section-heading">30-Day Content Calendar</span>
                <CopyButton text={calendarText} label="Copy Calendar" />
              </div>
              <div className="space-y-2">
                {output.contentCalendar.map(entry => (
                  <div key={entry.day} className="card py-3">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-brand-700 text-white flex items-center justify-center text-xs font-bold shrink-0">
                        {entry.day}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-brand-700 uppercase tracking-wide">{entry.topic}</p>
                        <p className="text-sm text-slate-800 mt-0.5 leading-snug">"{entry.hook}"</p>
                        <p className="text-xs text-slate-500 mt-1">Angle: {entry.angle}</p>
                        <p className="text-xs text-slate-500">CTA: {entry.cta}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'repurpose' && (
            <div className="space-y-3">
              <span className="section-heading">Repurposing Suggestions</span>
              <div className="space-y-2">
                {output.repurposingSuggestions.map((s, i) => (
                  <div key={i} className="card py-3">
                    <p className="text-sm text-slate-700">{s}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {!generated && (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 rounded-xl bg-[#0A66C2] text-white flex items-center justify-center mx-auto mb-3 text-lg font-bold">in</div>
            <p className="text-slate-500 text-sm">Configure your inputs and generate LinkedIn content.</p>
          </div>
        </div>
      )}
    </div>
  )
}

function ScorePill({ label, value, max, highlight }: { label: string; value: number; max: number; highlight?: boolean }) {
  return (
    <span className={clsx('text-xs px-1.5 py-0.5 rounded font-medium', highlight ? 'bg-brand-100 text-brand-800' : 'bg-slate-100 text-slate-600')}>
      {label}: {value}/{max}
    </span>
  )
}
