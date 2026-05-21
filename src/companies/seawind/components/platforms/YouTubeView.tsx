import type { YouTubeOutput } from '../../types'
import CopyButton from '../CopyButton'
import ScoreDisplay from '../ScoreDisplay'
import RegeneratePanel from '../RegeneratePanel'
import type { RegenerateVariant } from '../../types'

interface Props {
  output: YouTubeOutput
  onRegenerate: (v: RegenerateVariant) => void
  onConvertTo: (p: string) => void
}

function fullScriptText(o: YouTubeOutput): string {
  return [
    `TITLE: ${o.title}`,
    `THUMBNAIL: ${o.thumbnailText}`,
    '',
    `HOOK (3s): ${o.hook3Sec}`,
    `OPENING LINE: ${o.openingLine}`,
    '',
    'SCRIPT:',
    ...o.script,
    '',
    `BUSINESS INSIGHT: ${o.businessInsight}`,
    '',
    `CTA: ${o.cta}`,
  ].join('\n')
}

export default function YouTubeView({ output, onRegenerate, onConvertTo }: Props) {
  const { title, thumbnailText, hook3Sec, openingLine, script, retentionBeats, businessInsight, cta, repurposingSuggestions, score } = output

  return (
    <div className="space-y-6">
      {/* Title & Thumbnail Package */}
      <div className="card p-5 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-slate-800 text-sm">Title + Thumbnail Package</h3>
          <CopyButton text={`${title}\nThumbnail: ${thumbnailText}`} label="Copy Package" variant="secondary" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="section-title">Video Title</p>
            <div className="output-block">
              <p className="font-semibold text-slate-900 leading-snug">{title}</p>
            </div>
          </div>
          <div>
            <p className="section-title">Thumbnail Text</p>
            <div className="output-block bg-slate-900 border-slate-700">
              <p className="font-bold text-white leading-snug text-base">{thumbnailText}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Hook & Opening */}
      <div className="card p-5 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-slate-800 text-sm">Hook & Opening</h3>
          <CopyButton text={`${hook3Sec}\n${openingLine}`} label="Copy Hook" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="section-title">First 3 Seconds</p>
            <div className="output-block border-l-4 border-red-400">
              <p className="font-medium text-slate-900">{hook3Sec}</p>
            </div>
          </div>
          <div>
            <p className="section-title">Opening Line</p>
            <div className="output-block border-l-4 border-orange-400">
              <p>{openingLine}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Script / Outline */}
      <div className="card overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-semibold text-slate-800 text-sm">Script / Outline</h3>
          <CopyButton text={script.join('\n')} label="Copy Script" variant="secondary" />
        </div>
        <div className="p-5">
          <div className="output-block space-y-2">
            {script.map((line, i) => (
              <p key={i} className={line === '' ? 'h-2' : line.startsWith('[') ? 'text-slate-400 italic text-xs' : 'text-slate-800'}>
                {line}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* Retention Beats */}
      <div className="card p-5">
        <p className="section-title">Retention Beats</p>
        <ul className="space-y-2">
          {retentionBeats.map((beat, i) => (
            <li key={i} className="flex gap-3 text-sm">
              <span className="w-2 h-2 rounded-full bg-red-400 mt-1.5 shrink-0" />
              <span className="text-slate-700">{beat}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Business Insight */}
      <div className="card p-5">
        <div className="flex items-center justify-between mb-3">
          <p className="section-title mb-0">Business Insight</p>
          <CopyButton text={businessInsight} label="Copy" />
        </div>
        <div className="output-block border-l-4 border-blue-400">
          <p>{businessInsight}</p>
        </div>
      </div>

      {/* CTA */}
      <div className="card p-5">
        <div className="flex items-center justify-between mb-3">
          <p className="section-title mb-0">CTA</p>
          <CopyButton text={cta} label="Copy CTA" />
        </div>
        <div className="output-block border-l-4 border-navy-800">
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
      <RegeneratePanel onRegenerate={onRegenerate} onConvertTo={onConvertTo} currentPlatform="youtube" />
    </div>
  )
}
