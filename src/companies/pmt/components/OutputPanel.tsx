import type {
  GeneratedOutput, LinkedInOutput, YouTubeOutput, TwitterOutput, InstagramOutput, FacebookOutput,
  RegenerateVariant, Platform, PlatformInputs
} from '../types'
import { CopyButton } from './CopyButton'
import { QualityScorePanel } from './QualityScorePanel'
import { RegenerateButtons } from './RegenerateButtons'
import { ConvertPlatformButtons } from './PlatformSelector'

interface OutputPanelProps {
  output: GeneratedOutput | null
  inputs: PlatformInputs
  onRegenerate: (variant: RegenerateVariant) => void
  onConvert: (platform: Platform) => void
}

function Section({ title, children, copyText }: { title: string; children: React.ReactNode; copyText?: string }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{title}</h3>
        {copyText && <CopyButton text={copyText} />}
      </div>
      {children}
    </div>
  )
}

function ContentBox({ text, mono = false }: { text: string; mono?: boolean }) {
  return (
    <div className={`bg-pmt-dark border border-pmt-steel/30 rounded-lg px-4 py-3 text-sm text-slate-200 whitespace-pre-wrap leading-relaxed ${mono ? 'font-mono text-xs' : ''}`}>
      {text}
    </div>
  )
}

function ImprovementList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-1.5">
      {items.map((item, i) => (
        <li key={i} className="flex gap-2 text-xs text-slate-400">
          <span className="text-pmt-blue mt-0.5 flex-shrink-0">→</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

function LinkedInView({ output }: { output: LinkedInOutput }) {
  const fullPost = `${output.fullPost.hook}\n\n${output.fullPost.body}\n\n${output.fullPost.businessImpact}\n\n${output.fullPost.cta}`
  return (
    <div className="space-y-6">
      <Section title="Full Post" copyText={fullPost}>
        <ContentBox text={fullPost} />
        <div className="flex gap-2 flex-wrap mt-2">
          <CopyButton text={output.fullPost.hook} label="Copy Hook" />
          <CopyButton text={output.fullPost.cta} label="Copy CTA" />
          <CopyButton text={output.fullPost.body} label="Copy Body" />
        </div>
      </Section>

      <Section title="30-Day Content Calendar">
        <div className="space-y-2 max-h-72 overflow-y-auto custom-scrollbar pr-1">
          {output.calendar.map((entry) => (
            <div key={entry.day} className="bg-pmt-dark border border-pmt-steel/30 rounded-lg px-3 py-2.5">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-semibold text-pmt-sky">Day {entry.day}</span>
                <span className="text-xs text-slate-500 italic">{entry.angle}</span>
              </div>
              <div className="text-xs text-slate-300 font-medium">{entry.topic}</div>
              <div className="text-xs text-slate-400 mt-1">{entry.hook}</div>
              <div className="text-xs text-pmt-blue mt-1">{entry.cta}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Post Ideas">
        <div className="space-y-2">
          {output.postIdeas.slice(0, 5).map((idea, i) => (
            <div key={i} className="bg-pmt-dark border border-pmt-steel/30 rounded-lg px-3 py-2.5">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="text-xs font-medium text-white">{idea.title}</div>
                  <div className="text-xs text-slate-500 mt-0.5 italic">{idea.angle}</div>
                </div>
                <div className="text-xs font-bold text-pmt-sky flex-shrink-0">#{idea.rank}</div>
              </div>
              <div className="flex gap-3 mt-2 text-[10px] text-slate-500">
                <span>Pain: {idea.painClarity}</span>
                <span>Impact: {idea.financialImpact}</span>
                <span>Tension: {idea.tension}</span>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Improvement Suggestions">
        <ImprovementList items={output.improvementSuggestions} />
      </Section>

      <Section title="Repurposing">
        <ImprovementList items={output.repurposingSuggestions} />
      </Section>
    </div>
  )
}

function YouTubeView({ output }: { output: YouTubeOutput }) {
  const fullScript = `TITLE: ${output.title}\n\nTHUMBNAIL: ${output.thumbnailText}\n\n3-SECOND HOOK: ${output.threeSecondHook}\n\nOPENING LINE: ${output.openingLine}\n\nSCRIPT/OUTLINE:\n${output.scriptOrOutline}\n\nBUSINESS INSIGHT: ${output.businessInsight}\n\nCTA: ${output.cta}`
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-3">
        <Section title="Title" copyText={output.title}>
          <ContentBox text={output.title} />
        </Section>
        <Section title="Thumbnail Text" copyText={output.thumbnailText}>
          <ContentBox text={output.thumbnailText} />
        </Section>
      </div>

      <Section title="3-Second Hook" copyText={output.threeSecondHook}>
        <ContentBox text={output.threeSecondHook} />
      </Section>

      <Section title="Opening Line" copyText={output.openingLine}>
        <ContentBox text={output.openingLine} />
      </Section>

      <Section title="Script / Outline" copyText={output.scriptOrOutline}>
        <ContentBox text={output.scriptOrOutline} />
        <div className="flex gap-2 mt-2">
          <CopyButton text={fullScript} label="Copy Full Script" />
        </div>
      </Section>

      <Section title="Retention Beats">
        <div className="space-y-2">
          {output.retentionBeats.map((beat, i) => (
            <div key={i} className="bg-pmt-dark border border-pmt-steel/30 rounded-lg px-3 py-2 text-xs text-slate-300">
              <span className="text-pmt-sky font-semibold">Beat {i + 1}:</span> {beat}
            </div>
          ))}
        </div>
      </Section>

      <Section title="Business Insight" copyText={output.businessInsight}>
        <ContentBox text={output.businessInsight} />
      </Section>

      <Section title="CTA" copyText={output.cta}>
        <ContentBox text={output.cta} />
      </Section>

      <Section title="Improvement Suggestions">
        <ImprovementList items={output.improvementSuggestions} />
      </Section>

      <Section title="Repurposing">
        <ImprovementList items={output.repurposingSuggestions} />
      </Section>
    </div>
  )
}

function TwitterView({ output }: { output: TwitterOutput }) {
  const threadFull = output.thread ? output.thread.join('\n\n---\n\n') : output.mainPost
  return (
    <div className="space-y-6">
      <Section title="Main Post" copyText={output.mainPost}>
        <ContentBox text={output.mainPost} />
        <div className="flex gap-2 mt-2">
          <CopyButton text={output.alternateHook} label="Copy Alt Hook" />
          <CopyButton text={output.cta} label="Copy CTA" />
        </div>
      </Section>

      {output.thread && output.thread.length > 0 && (
        <Section title="Thread" copyText={threadFull}>
          <div className="space-y-2">
            {output.thread.map((tweet, i) => (
              <div key={i} className="bg-pmt-dark border border-pmt-steel/30 rounded-lg px-3 py-2.5">
                <div className="text-[10px] text-slate-500 mb-1">Tweet {i + 1}/{output.thread!.length}</div>
                <div className="text-xs text-slate-200 whitespace-pre-wrap">{tweet}</div>
                <div className="mt-1.5 flex justify-end">
                  <CopyButton text={tweet} />
                </div>
              </div>
            ))}
          </div>
        </Section>
      )}

      <Section title="Alternate Hook" copyText={output.alternateHook}>
        <ContentBox text={output.alternateHook} />
      </Section>

      <Section title="Engagement Question" copyText={output.engagementQuestion}>
        <ContentBox text={output.engagementQuestion} />
      </Section>

      <Section title="Improvement Suggestions">
        <ImprovementList items={output.improvementSuggestions} />
      </Section>

      <Section title="Repurposing">
        <ImprovementList items={output.repurposingSuggestions} />
      </Section>
    </div>
  )
}

function InstagramView({ output }: { output: InstagramOutput }) {
  return (
    <div className="space-y-6">
      <Section title="Visual Hook Concept">
        <ContentBox text={output.visualHook} />
      </Section>

      <Section title="Reel Script" copyText={output.reelScript}>
        <ContentBox text={output.reelScript} />
      </Section>

      <Section title="Carousel Outline" copyText={output.carouselOutline}>
        <ContentBox text={output.carouselOutline} />
      </Section>

      <Section title="Caption" copyText={output.caption}>
        <ContentBox text={output.caption} />
      </Section>

      <Section title="Story Sequence">
        <ContentBox text={output.storySequence} />
      </Section>

      <Section title="Suggested Visuals">
        <div className="space-y-2">
          {output.suggestedVisuals.map((visual, i) => (
            <div key={i} className="bg-pmt-dark border border-pmt-steel/30 rounded-lg px-3 py-2 text-xs text-slate-300">
              <span className="text-pmt-sky font-semibold">Option {i + 1}:</span> {visual}
            </div>
          ))}
        </div>
      </Section>

      <Section title="Improvement Suggestions">
        <ImprovementList items={output.improvementSuggestions} />
      </Section>

      <Section title="Repurposing">
        <ImprovementList items={output.repurposingSuggestions} />
      </Section>
    </div>
  )
}

function FacebookView({ output }: { output: FacebookOutput }) {
  return (
    <div className="space-y-6">
      <Section title="Short Post" copyText={output.shortPost}>
        <ContentBox text={output.shortPost} />
      </Section>

      <Section title="Educational Post" copyText={output.educationalPost}>
        <ContentBox text={output.educationalPost} />
      </Section>

      <Section title="Discussion Prompt" copyText={output.discussionPrompt}>
        <ContentBox text={output.discussionPrompt} />
      </Section>

      <Section title="Business Owner Post" copyText={output.businessOwnerPost}>
        <ContentBox text={output.businessOwnerPost} />
      </Section>

      <Section title="Retargeting Post" copyText={output.retargetingPost}>
        <ContentBox text={output.retargetingPost} />
      </Section>

      <Section title="Repurposing">
        <ImprovementList items={output.repurposingSuggestions} />
      </Section>
    </div>
  )
}

export function OutputPanel({ output, inputs, onRegenerate, onConvert }: OutputPanelProps) {
  if (!output) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center px-8 py-16">
        <div className="w-16 h-16 rounded-full bg-pmt-steel/20 border border-pmt-steel/40 flex items-center justify-center mb-4">
          <svg className="w-7 h-7 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.347.347a3.5 3.5 0 01-4.95 0l-.347-.347z" />
          </svg>
        </div>
        <div className="text-sm font-medium text-slate-500">No content generated yet</div>
        <div className="text-xs text-slate-600 mt-1">Configure inputs and click Generate Content</div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full">
      <div className="px-6 py-5 border-b border-pmt-steel/30">
        <h2 className="text-sm font-semibold text-white uppercase tracking-wider">Generated Output</h2>
        <p className="text-xs text-slate-500 mt-0.5 capitalize">{output.platform} — {inputs.problem.replace(/-/g, ' ')}</p>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6 custom-scrollbar">
        {output.platform === 'linkedin' && <LinkedInView output={output as LinkedInOutput} />}
        {output.platform === 'youtube' && <YouTubeView output={output as YouTubeOutput} />}
        {output.platform === 'twitter' && <TwitterView output={output as TwitterOutput} />}
        {output.platform === 'instagram' && <InstagramView output={output as InstagramOutput} />}
        {output.platform === 'facebook' && <FacebookView output={output as FacebookOutput} />}

        <QualityScorePanel score={output.qualityScore} />
        <RegenerateButtons onRegenerate={onRegenerate} />
        <ConvertPlatformButtons current={output.platform} onConvert={onConvert} />
      </div>
    </div>
  )
}
