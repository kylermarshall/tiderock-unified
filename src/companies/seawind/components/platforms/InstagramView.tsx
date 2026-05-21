import type { InstagramOutput } from '../../types'
import CopyButton from '../CopyButton'
import ScoreDisplay from '../ScoreDisplay'
import RegeneratePanel from '../RegeneratePanel'
import type { RegenerateVariant } from '../../types'

interface Props {
  output: InstagramOutput
  onRegenerate: (v: RegenerateVariant) => void
  onConvertTo: (p: string) => void
}

export default function InstagramView({ output, onRegenerate, onConvertTo }: Props) {
  const { visualHook, onScreenText, script, slides, caption, cta, suggestedVisuals, repurposingSuggestions, score } = output

  return (
    <div className="space-y-6">
      {/* Visual Hook & On-Screen Text */}
      <div className="card p-5 space-y-4">
        <h3 className="font-semibold text-slate-800 text-sm">Visual Hook</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="section-title">Visual Hook</p>
            <div className="output-block">
              <p className="text-slate-600 italic text-sm">{visualHook}</p>
            </div>
          </div>
          <div>
            <p className="section-title">On-Screen Text</p>
            <div className="output-block bg-slate-900 border-slate-700">
              <p className="font-bold text-white text-base leading-snug">{onScreenText}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Carousel Slides or Script */}
      {slides ? (
        <div className="card overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-semibold text-slate-800 text-sm">Carousel — {slides.length} Slides</h3>
            <CopyButton
              text={slides.map((s) => `SLIDE ${s.slideNumber}: ${s.onScreenText}\nCaption: ${s.caption}\nVisual: ${s.visual}`).join('\n\n')}
              label="Copy All Slides"
              variant="secondary"
            />
          </div>
          <div className="divide-y divide-slate-100">
            {slides.map((slide) => (
              <div key={slide.slideNumber} className="p-5 flex gap-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
                  {slide.slideNumber}
                </div>
                <div className="flex-1 space-y-1">
                  <p className="font-semibold text-slate-900 text-sm">{slide.onScreenText}</p>
                  <p className="text-slate-600 text-sm">{slide.caption}</p>
                  <p className="text-slate-400 text-xs italic">{slide.visual}</p>
                </div>
                <CopyButton text={`${slide.onScreenText}\n${slide.caption}`} label="Copy" className="shrink-0" />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="card overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-semibold text-slate-800 text-sm">Script / Sequence</h3>
            <CopyButton text={script.join('\n')} label="Copy Script" variant="secondary" />
          </div>
          <div className="p-5">
            <div className="output-block space-y-2">
              {script.map((line, i) => (
                <p key={i} className={
                  line.startsWith('[') ? 'text-slate-400 italic text-xs' :
                  line.startsWith('HOOK') ? 'font-bold text-slate-900' :
                  line.startsWith('CTA') ? 'font-medium text-navy-800' :
                  'text-slate-800 text-sm'
                }>
                  {line}
                </p>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Caption */}
      <div className="card p-5">
        <div className="flex items-center justify-between mb-3">
          <p className="section-title mb-0">Caption</p>
          <CopyButton text={caption} label="Copy Caption" variant="secondary" />
        </div>
        <div className="output-block whitespace-pre-line text-sm leading-relaxed">
          {caption}
        </div>
      </div>

      {/* Suggested Visuals */}
      <div className="card p-5">
        <p className="section-title">Suggested Visuals / B-Roll</p>
        <ul className="space-y-1.5">
          {suggestedVisuals.map((v, i) => (
            <li key={i} className="flex gap-2 text-sm text-slate-700">
              <span className="text-pink-400 shrink-0">◎</span>
              {v}
            </li>
          ))}
        </ul>
      </div>

      {/* CTA */}
      <div className="card p-5">
        <div className="flex items-center justify-between mb-3">
          <p className="section-title mb-0">CTA</p>
          <CopyButton text={cta} label="Copy CTA" />
        </div>
        <div className="output-block border-l-4 border-pink-400">
          <p className="font-medium">{cta}</p>
        </div>
      </div>

      {/* Repurposing */}
      <div className="card p-5">
        <p className="section-title">Repurposing Suggestions</p>
        <ul className="space-y-1.5">
          {repurposingSuggestions.map((s, i) => (
            <li key={i} className="flex gap-2 text-sm text-slate-700">
              <span className="text-blue-400 shrink-0">→</span>
              {s}
            </li>
          ))}
        </ul>
      </div>

      <ScoreDisplay score={score} />
      <RegeneratePanel onRegenerate={onRegenerate} onConvertTo={onConvertTo} currentPlatform="instagram" />
    </div>
  )
}
