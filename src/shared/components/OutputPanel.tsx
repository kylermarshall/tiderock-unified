import type { GeneratedOutput, Platform, LinkedInOutput, YouTubeOutput, TwitterOutput, InstagramOutput, FacebookOutput } from '../types'
import { QualityScorePanel } from './QualityScore'
import { RegenerateButtons } from './RegenerateButtons'
import { ContentCard } from './ContentCard'
import { CopyButton } from './CopyButton'

interface OutputPanelProps {
  output: GeneratedOutput | null
  platform: Platform
  onRegenerate: (variant: 'direct' | 'executive' | 'contrarian' | 'shorter' | 'specific') => void
  onTransform: (targetPlatform: Platform) => void
  isGenerating: boolean
}

const platformLabels: Record<Platform, string> = {
  linkedin: 'LinkedIn',
  youtube: 'YouTube',
  twitter: 'Twitter / X',
  instagram: 'Instagram',
  facebook: 'Facebook',
}

const platformColors: Record<Platform, string> = {
  linkedin: 'bg-[#0A66C2]',
  youtube: 'bg-[#FF0000]',
  twitter: 'bg-black',
  instagram: 'bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045]',
  facebook: 'bg-[#1877F2]',
}

const platformIcons: Record<Platform, string> = {
  linkedin: 'in',
  youtube: '▶',
  twitter: '✕',
  instagram: '◈',
  facebook: 'f',
}

function SectionHeader({ title, copyText }: { title: string; copyText?: string }) {
  return (
    <div className="flex items-center justify-between mb-3">
      <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wide">{title}</h3>
      {copyText && <CopyButton text={copyText} label="Copy All" />}
    </div>
  )
}

function LinkedInOutputView({ output, onRegenerate, onTransform, platform, isGenerating }: {
  output: LinkedInOutput
  onRegenerate: OutputPanelProps['onRegenerate']
  onTransform: OutputPanelProps['onTransform']
  platform: Platform
  isGenerating: boolean
}) {
  const fullPostText = `${output.fullPost.hook}\n\n${output.fullPost.body}\n\n${output.fullPost.businessImpact}\n\n${output.fullPost.cta}`

  return (
    <div className="space-y-6">
      {/* Post Ideas */}
      <div>
        <SectionHeader title="Post Ideas (Ranked)" />
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="text-left px-3 py-2.5 font-semibold text-slate-600 w-8">#</th>
                  <th className="text-left px-3 py-2.5 font-semibold text-slate-600">Title</th>
                  <th className="text-left px-3 py-2.5 font-semibold text-slate-600 hidden md:table-cell">Angle</th>
                  <th className="text-center px-3 py-2.5 font-semibold text-slate-600">Pain</th>
                  <th className="text-center px-3 py-2.5 font-semibold text-slate-600">Impact</th>
                  <th className="text-center px-3 py-2.5 font-semibold text-slate-600">Tension</th>
                </tr>
              </thead>
              <tbody>
                {output.postIdeas.map((idea, i) => (
                  <tr key={i} className={`border-b border-slate-100 ${i === 0 ? 'bg-blue-50/50' : 'hover:bg-slate-50'}`}>
                    <td className="px-3 py-2.5 font-bold text-slate-400">{idea.rank}</td>
                    <td className="px-3 py-2.5 text-slate-700 font-medium">{idea.title}</td>
                    <td className="px-3 py-2.5 text-slate-500 hidden md:table-cell">{idea.angle}</td>
                    <td className="px-3 py-2.5 text-center">
                      <span className={`font-semibold ${idea.painClarity >= 9 ? 'text-emerald-600' : idea.painClarity >= 7 ? 'text-amber-500' : 'text-slate-500'}`}>
                        {idea.painClarity}/10
                      </span>
                    </td>
                    <td className="px-3 py-2.5 text-center">
                      <span className={`font-semibold ${idea.financialImpact >= 9 ? 'text-emerald-600' : idea.financialImpact >= 7 ? 'text-amber-500' : 'text-slate-500'}`}>
                        {idea.financialImpact}/10
                      </span>
                    </td>
                    <td className="px-3 py-2.5 text-center">
                      <span className={`font-semibold ${idea.tension >= 9 ? 'text-emerald-600' : idea.tension >= 7 ? 'text-amber-500' : 'text-slate-500'}`}>
                        {idea.tension}/10
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Full Post */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wide">Full LinkedIn Post</h3>
          <CopyButton text={fullPostText} label="Copy Full Post" />
        </div>
        <div className="space-y-3">
          <ContentCard label="Hook" content={output.fullPost.hook} variant="highlight" />
          <ContentCard label="Body" content={output.fullPost.body} />
          <ContentCard label="Business Impact" content={output.fullPost.businessImpact} />
          <ContentCard label="CTA" content={output.fullPost.cta} />
        </div>
      </div>

      {/* 30-Day Calendar */}
      <div>
        <SectionHeader title="30-Day Content Calendar" copyText={output.calendar.map(e => `Day ${e.day}: ${e.topic}\nHook: ${e.hook}\nAngle: ${e.angle}\nCTA: ${e.cta}`).join('\n\n')} />
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto max-h-96 scrollbar-thin">
            <table className="w-full text-xs">
              <thead className="sticky top-0 bg-slate-50 z-10">
                <tr className="border-b border-slate-200">
                  <th className="text-left px-3 py-2.5 font-semibold text-slate-600 w-12">Day</th>
                  <th className="text-left px-3 py-2.5 font-semibold text-slate-600">Topic</th>
                  <th className="text-left px-3 py-2.5 font-semibold text-slate-600">Hook</th>
                  <th className="text-left px-3 py-2.5 font-semibold text-slate-600 hidden lg:table-cell">Angle</th>
                  <th className="text-left px-3 py-2.5 font-semibold text-slate-600 hidden lg:table-cell">CTA</th>
                </tr>
              </thead>
              <tbody>
                {output.calendar.map(entry => (
                  <tr key={entry.day} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="px-3 py-2.5 font-bold text-slate-400 w-12">{entry.day}</td>
                    <td className="px-3 py-2.5 text-slate-600 font-medium whitespace-nowrap">{entry.topic}</td>
                    <td className="px-3 py-2.5 text-slate-600 max-w-xs">{entry.hook}</td>
                    <td className="px-3 py-2.5 text-slate-500 hidden lg:table-cell whitespace-nowrap">{entry.angle}</td>
                    <td className="px-3 py-2.5 text-slate-500 hidden lg:table-cell max-w-xs">{entry.cta}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Repurposing */}
      <div>
        <SectionHeader title="Repurposing Suggestions" />
        <div className="space-y-2">
          {output.repurposingSuggestions.map((s, i) => (
            <div key={i} className="flex gap-2 p-3 bg-slate-50 rounded-lg border border-slate-200">
              <span className="text-blue-500 font-bold text-xs mt-0.5">→</span>
              <p className="text-xs text-slate-600">{s}</p>
            </div>
          ))}
        </div>
      </div>

      <QualityScorePanel score={output.qualityScore} />

      {/* Improvements */}
      <div>
        <SectionHeader title="Improvement Suggestions" />
        <div className="space-y-2">
          {output.improvementSuggestions.map((s, i) => (
            <div key={i} className="flex gap-2 p-3 bg-amber-50 rounded-lg border border-amber-200">
              <span className="text-amber-500 font-bold text-xs mt-0.5">{i + 1}.</span>
              <p className="text-xs text-slate-700">{s}</p>
            </div>
          ))}
        </div>
      </div>

      <RegenerateButtons onRegenerate={onRegenerate} disabled={isGenerating} />
      <TransformSection currentPlatform={platform} onTransform={onTransform} />
    </div>
  )
}

function YouTubeOutputView({ output, onRegenerate, onTransform, platform, isGenerating }: {
  output: YouTubeOutput
  onRegenerate: OutputPanelProps['onRegenerate']
  onTransform: OutputPanelProps['onTransform']
  platform: Platform
  isGenerating: boolean
}) {
  return (
    <div className="space-y-6">
      <div>
        <SectionHeader title="Title & Thumbnail Package" />
        <div className="space-y-3">
          <ContentCard label="Video Title" content={output.title} variant="highlight" />
          <ContentCard label="Thumbnail Text" content={output.thumbnailText} variant="highlight" />
        </div>
      </div>

      <div>
        <SectionHeader title="Script / Outline" copyText={`${output.threeSecondHook}\n\n${output.openingLine}\n\n${output.scriptOrOutline}`} />
        <div className="space-y-3">
          <ContentCard label="3-Second Hook" content={output.threeSecondHook} variant="highlight" />
          <ContentCard label="Opening Line" content={output.openingLine} />
          <ContentCard label="Full Script / Outline" content={output.scriptOrOutline} />
          <ContentCard label="Retention Beats" content={output.retentionBeats} />
        </div>
      </div>

      <div className="space-y-3">
        <ContentCard label="Business Insight" content={output.businessInsight} />
        <ContentCard label="CTA" content={output.cta} />
      </div>

      <div>
        <SectionHeader title="Repurposing Suggestions" />
        <div className="space-y-2">
          {output.repurposingSuggestions.map((s, i) => (
            <div key={i} className="flex gap-2 p-3 bg-slate-50 rounded-lg border border-slate-200">
              <span className="text-red-500 font-bold text-xs mt-0.5">→</span>
              <p className="text-xs text-slate-600">{s}</p>
            </div>
          ))}
        </div>
      </div>

      <QualityScorePanel score={output.qualityScore} />

      <div>
        <SectionHeader title="Improvement Suggestions" />
        <div className="space-y-2">
          {output.improvementSuggestions.map((s, i) => (
            <div key={i} className="flex gap-2 p-3 bg-amber-50 rounded-lg border border-amber-200">
              <span className="text-amber-500 font-bold text-xs mt-0.5">{i + 1}.</span>
              <p className="text-xs text-slate-700">{s}</p>
            </div>
          ))}
        </div>
      </div>

      <RegenerateButtons onRegenerate={onRegenerate} disabled={isGenerating} />
      <TransformSection currentPlatform={platform} onTransform={onTransform} />
    </div>
  )
}

function TwitterOutputView({ output, onRegenerate, onTransform, platform, isGenerating }: {
  output: TwitterOutput
  onRegenerate: OutputPanelProps['onRegenerate']
  onTransform: OutputPanelProps['onTransform']
  platform: Platform
  isGenerating: boolean
}) {
  const charCount = output.mainPost.length
  const charColor = charCount > 280 ? 'text-red-500' : charCount > 240 ? 'text-amber-500' : 'text-slate-400'

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wide">Main Post</h3>
          <div className="flex items-center gap-2">
            <span className={`text-xs font-mono ${charColor}`}>{charCount}/280</span>
            <CopyButton text={output.mainPost} />
          </div>
        </div>
        <div className="bg-black rounded-xl p-4 border border-slate-800">
          <p className="text-white text-sm leading-relaxed whitespace-pre-wrap font-light">{output.mainPost}</p>
        </div>
      </div>

      {output.thread && output.thread.length > 0 && (
        <div>
          <SectionHeader title={output.thread.length === 1 ? 'Alternate Format' : `Thread (${output.thread.length} posts)`} copyText={output.thread.join('\n\n---\n\n')} />
          <div className="space-y-2">
            {output.thread.map((tweet, i) => (
              <div key={i} className="bg-slate-900 rounded-xl p-4 border border-slate-800 relative">
                <p className="text-white text-xs leading-relaxed whitespace-pre-wrap">{tweet}</p>
                <div className="absolute top-2 right-2">
                  <CopyButton text={tweet} label="Copy" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-3">
        <ContentCard label="Alternate Hook" content={output.alternateHook} />
        <ContentCard label="CTA" content={output.cta} />
        <ContentCard label="Engagement Question" content={output.engagementQuestion} variant="highlight" />
      </div>

      <div>
        <SectionHeader title="Repurposing Suggestions" />
        <div className="space-y-2">
          {output.repurposingSuggestions.map((s, i) => (
            <div key={i} className="flex gap-2 p-3 bg-slate-50 rounded-lg border border-slate-200">
              <span className="text-slate-700 font-bold text-xs mt-0.5">→</span>
              <p className="text-xs text-slate-600">{s}</p>
            </div>
          ))}
        </div>
      </div>

      <QualityScorePanel score={output.qualityScore} />

      <div>
        <SectionHeader title="Improvement Suggestions" />
        <div className="space-y-2">
          {output.improvementSuggestions.map((s, i) => (
            <div key={i} className="flex gap-2 p-3 bg-amber-50 rounded-lg border border-amber-200">
              <span className="text-amber-500 font-bold text-xs mt-0.5">{i + 1}.</span>
              <p className="text-xs text-slate-700">{s}</p>
            </div>
          ))}
        </div>
      </div>

      <RegenerateButtons onRegenerate={onRegenerate} disabled={isGenerating} />
      <TransformSection currentPlatform={platform} onTransform={onTransform} />
    </div>
  )
}

function InstagramOutputView({ output, onRegenerate, onTransform, platform, isGenerating }: {
  output: InstagramOutput
  onRegenerate: OutputPanelProps['onRegenerate']
  onTransform: OutputPanelProps['onTransform']
  platform: Platform
  isGenerating: boolean
}) {
  const captionLen = output.caption.length

  return (
    <div className="space-y-6">
      <div>
        <SectionHeader title="Visual Package" />
        <div className="space-y-3">
          <ContentCard label="Visual Hook Description" content={output.visualHook} variant="highlight" />
          <ContentCard label="On-Screen Text" content={output.onScreenText} variant="highlight" />
        </div>
      </div>

      <div>
        <SectionHeader title="Script / Slides" copyText={output.scriptOrSlides.join('\n\n---\n\n')} />
        <div className="space-y-2">
          {output.scriptOrSlides.map((slide, i) => (
            <div key={i} className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-100 relative">
              <p className="text-slate-700 text-xs leading-relaxed whitespace-pre-wrap pr-16">{slide}</p>
              <div className="absolute top-2 right-2">
                <CopyButton text={slide} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wide">Caption</h3>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-slate-400">{captionLen} chars</span>
            <CopyButton text={output.caption} />
          </div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">{output.caption}</p>
        </div>
      </div>

      <div className="space-y-3">
        <ContentCard label="CTA" content={output.cta} />
        <ContentCard label="Suggested Visuals" content={output.suggestedVisuals} />
      </div>

      <div>
        <SectionHeader title="Repurposing Suggestions" />
        <div className="space-y-2">
          {output.repurposingSuggestions.map((s, i) => (
            <div key={i} className="flex gap-2 p-3 bg-slate-50 rounded-lg border border-slate-200">
              <span className="text-purple-500 font-bold text-xs mt-0.5">→</span>
              <p className="text-xs text-slate-600">{s}</p>
            </div>
          ))}
        </div>
      </div>

      <QualityScorePanel score={output.qualityScore} />

      <div>
        <SectionHeader title="Improvement Suggestions" />
        <div className="space-y-2">
          {output.improvementSuggestions.map((s, i) => (
            <div key={i} className="flex gap-2 p-3 bg-amber-50 rounded-lg border border-amber-200">
              <span className="text-amber-500 font-bold text-xs mt-0.5">{i + 1}.</span>
              <p className="text-xs text-slate-700">{s}</p>
            </div>
          ))}
        </div>
      </div>

      <RegenerateButtons onRegenerate={onRegenerate} disabled={isGenerating} />
      <TransformSection currentPlatform={platform} onTransform={onTransform} />
    </div>
  )
}

function FacebookOutputView({ output, onRegenerate, onTransform, platform, isGenerating }: {
  output: FacebookOutput
  onRegenerate: OutputPanelProps['onRegenerate']
  onTransform: OutputPanelProps['onTransform']
  platform: Platform
  isGenerating: boolean
}) {
  return (
    <div className="space-y-6">
      <div>
        <SectionHeader title="Primary Post" copyText={output.primaryPost} />
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">{output.primaryPost}</p>
        </div>
      </div>

      <div className="space-y-3">
        <ContentCard label="Practical Takeaway" content={output.practicalTakeaway} variant="highlight" />
        <ContentCard label="CTA" content={output.cta} />
        <ContentCard label="Discussion Question" content={output.discussionQuestion} />
      </div>

      <div>
        <SectionHeader title="Repurposing Suggestions" />
        <div className="space-y-2">
          {output.repurposingSuggestions.map((s, i) => (
            <div key={i} className="flex gap-2 p-3 bg-slate-50 rounded-lg border border-slate-200">
              <span className="text-blue-600 font-bold text-xs mt-0.5">→</span>
              <p className="text-xs text-slate-600">{s}</p>
            </div>
          ))}
        </div>
      </div>

      <QualityScorePanel score={output.qualityScore} />

      <div>
        <SectionHeader title="Improvement Suggestions" />
        <div className="space-y-2">
          {output.improvementSuggestions.map((s, i) => (
            <div key={i} className="flex gap-2 p-3 bg-amber-50 rounded-lg border border-amber-200">
              <span className="text-amber-500 font-bold text-xs mt-0.5">{i + 1}.</span>
              <p className="text-xs text-slate-700">{s}</p>
            </div>
          ))}
        </div>
      </div>

      <RegenerateButtons onRegenerate={onRegenerate} disabled={isGenerating} />
      <TransformSection currentPlatform={platform} onTransform={onTransform} />
    </div>
  )
}

function TransformSection({ currentPlatform, onTransform }: {
  currentPlatform: Platform
  onTransform: (p: Platform) => void
}) {
  const others: Platform[] = (['linkedin', 'youtube', 'twitter', 'instagram', 'facebook'] as Platform[]).filter(p => p !== currentPlatform)

  return (
    <div className="border-t border-slate-200 pt-5">
      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">Turn Into Another Platform</p>
      <div className="flex flex-wrap gap-2">
        {others.map(p => (
          <button
            key={p}
            onClick={() => onTransform(p)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-white border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 hover:border-slate-300 transition-all"
          >
            <span className={`w-4 h-4 rounded text-white text-xs flex items-center justify-center font-bold flex-shrink-0 ${platformColors[p]}`}>
              {platformIcons[p]}
            </span>
            {platformLabels[p]}
          </button>
        ))}
      </div>
    </div>
  )
}

export function OutputPanel({ output, platform, onRegenerate, onTransform, isGenerating }: OutputPanelProps) {
  if (!output) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 flex flex-col items-center justify-center min-h-96 p-12 text-center">
        <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mb-4">
          <svg className="w-8 h-8 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
          </svg>
        </div>
        <p className="text-slate-800 font-semibold text-base mb-1">Ready to generate</p>
        <p className="text-slate-400 text-sm">Fill in the fields and click Generate to create your content.</p>
      </div>
    )
  }

  if (isGenerating) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 flex flex-col items-center justify-center min-h-96 p-12">
        <div className="flex flex-col items-center gap-4">
          <div className="flex gap-1.5">
            {[0, 1, 2].map(i => (
              <div
                key={i}
                className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-bounce"
                style={{ animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </div>
          <p className="text-slate-600 text-sm font-medium">Generating content...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 overflow-y-auto">
      {output.platform === 'linkedin' && (
        <LinkedInOutputView output={output as LinkedInOutput} onRegenerate={onRegenerate} onTransform={onTransform} platform={platform} isGenerating={isGenerating} />
      )}
      {output.platform === 'youtube' && (
        <YouTubeOutputView output={output as YouTubeOutput} onRegenerate={onRegenerate} onTransform={onTransform} platform={platform} isGenerating={isGenerating} />
      )}
      {output.platform === 'twitter' && (
        <TwitterOutputView output={output as TwitterOutput} onRegenerate={onRegenerate} onTransform={onTransform} platform={platform} isGenerating={isGenerating} />
      )}
      {output.platform === 'instagram' && (
        <InstagramOutputView output={output as InstagramOutput} onRegenerate={onRegenerate} onTransform={onTransform} platform={platform} isGenerating={isGenerating} />
      )}
      {output.platform === 'facebook' && (
        <FacebookOutputView output={output as FacebookOutput} onRegenerate={onRegenerate} onTransform={onTransform} platform={platform} isGenerating={isGenerating} />
      )}
    </div>
  )
}
