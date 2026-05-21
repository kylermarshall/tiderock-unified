import {
  Platform,
  GeneratedOutput,
  LinkedInOutput,
  YouTubeOutput,
  TwitterOutput,
  InstagramOutput,
  FacebookOutput,
  PostIdea,
  CalendarEntry,
} from '../types'
import CopyButton from './CopyButton'
import QualityScorePanel from './QualityScorePanel'
import RegenerateButtons from './RegenerateButtons'

interface Props {
  platform: Platform
  output: GeneratedOutput | null
  onRegenerate: (variant: string) => void
  onTransformTo: (target: Platform) => void
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-fabcon-charcoal border border-fabcon-steel rounded-lg p-4">
      <h3 className="text-xs font-semibold text-orange-400 mb-3 uppercase tracking-wider">{title}</h3>
      {children}
    </div>
  )
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-1.5">
      {items.map((item, i) => (
        <li key={i} className="text-sm text-gray-300 flex gap-2">
          <span className="text-orange-400 mt-0.5 flex-shrink-0 text-xs">▸</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

function LinkedInView({ output }: { output: LinkedInOutput }) {
  const { fullPost, postIdeas, calendar, repurposingSuggestions, improvementSuggestions } = output
  const fullText = `${fullPost.hook}\n\n${fullPost.body}\n\n${fullPost.businessImpact}\n\n${fullPost.cta}`

  return (
    <div className="space-y-4">
      <Section title="Full Post">
        <div className="space-y-3">
          <div>
            <p className="text-xs text-gray-500 mb-1">Hook</p>
            <p className="text-sm text-gray-300 leading-relaxed">{fullPost.hook}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Body</p>
            <p className="text-sm text-gray-300 whitespace-pre-wrap leading-relaxed">{fullPost.body}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Business Impact</p>
            <p className="text-sm text-gray-300 leading-relaxed">{fullPost.businessImpact}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">CTA</p>
            <p className="text-sm text-gray-300">{fullPost.cta}</p>
          </div>
          <div className="flex flex-wrap gap-2 pt-2 border-t border-fabcon-steel">
            <CopyButton text={fullText} label="Copy Full Post" />
            <CopyButton text={fullPost.hook} label="Hook Only" />
            <CopyButton text={fullPost.cta} label="CTA Only" />
          </div>
        </div>
      </Section>

      <Section title="Post Ideas (Ranked)">
        <ol className="space-y-2">
          {(postIdeas as PostIdea[]).map((idea, i) => (
            <li key={i} className="flex gap-2">
              <span className="text-orange-400 font-mono text-xs mt-0.5 w-5 flex-shrink-0">{i + 1}.</span>
              <div>
                <p className="text-sm text-gray-300">{idea.title}</p>
                <p className="text-xs text-gray-500 mt-0.5">{idea.angle}</p>
              </div>
            </li>
          ))}
        </ol>
        <div className="mt-3">
          <CopyButton
            text={(postIdeas as PostIdea[]).map((idea, i) => `${i + 1}. ${idea.title} — ${idea.angle}`).join('\n')}
            label="Copy All Ideas"
          />
        </div>
      </Section>

      <Section title="30-Day Content Calendar">
        <div className="space-y-1.5 max-h-64 overflow-y-auto">
          {(calendar as CalendarEntry[]).map((entry) => (
            <div key={entry.day} className="flex gap-3 text-sm">
              <span className="text-orange-400 font-mono text-xs w-12 flex-shrink-0 pt-0.5">Day {entry.day}</span>
              <div>
                <p className="text-gray-300 text-xs leading-relaxed">{entry.topic}</p>
                <p className="text-gray-500 text-xs">{entry.hook}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Repurposing Suggestions">
        <BulletList items={repurposingSuggestions} />
      </Section>

      <Section title="Improvement Suggestions">
        <BulletList items={improvementSuggestions} />
      </Section>
    </div>
  )
}

function YouTubeView({ output }: { output: YouTubeOutput }) {
  const { title, thumbnailText, threeSecondHook, openingLine, scriptOrOutline, retentionBeats, businessInsight, cta, repurposingSuggestions, improvementSuggestions } = output
  const fullScript = `TITLE: ${title}\n\n3-SECOND HOOK: ${threeSecondHook}\n\nOPENING: ${openingLine}\n\nSCRIPT:\n${scriptOrOutline}\n\nCTA: ${cta}`

  return (
    <div className="space-y-4">
      <Section title="Title">
        <div className="flex items-start justify-between gap-2">
          <p className="text-sm text-white font-medium">{title}</p>
          <CopyButton text={title} />
        </div>
      </Section>

      <Section title="Thumbnail Text">
        <div className="p-3 bg-fabcon-dark rounded border border-fabcon-steel mb-2">
          <p className="text-base font-bold text-white">{thumbnailText}</p>
        </div>
        <CopyButton text={thumbnailText} label="Copy Thumbnail Text" />
      </Section>

      <Section title="3-Second Hook">
        <p className="text-sm text-gray-300 mb-2">{threeSecondHook}</p>
        <CopyButton text={threeSecondHook} label="Copy Hook" />
      </Section>

      <Section title="Full Script">
        <div className="space-y-3">
          <div>
            <p className="text-xs text-gray-500 mb-1">Opening Line</p>
            <p className="text-sm text-gray-300">{openingLine}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Script / Outline</p>
            <p className="text-sm text-gray-300 whitespace-pre-wrap leading-relaxed">{scriptOrOutline}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Business Insight</p>
            <p className="text-sm text-gray-300">{businessInsight}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">CTA</p>
            <p className="text-sm text-gray-300">{cta}</p>
          </div>
          <div className="flex flex-wrap gap-2 pt-2 border-t border-fabcon-steel">
            <CopyButton text={fullScript} label="Copy Full Script" />
            <CopyButton text={threeSecondHook} label="Hook Only" />
            <CopyButton text={cta} label="CTA Only" />
          </div>
        </div>
      </Section>

      <Section title="Retention Beats">
        <BulletList items={retentionBeats} />
      </Section>

      <Section title="Repurposing Suggestions">
        <BulletList items={repurposingSuggestions} />
      </Section>

      <Section title="Improvement Suggestions">
        <BulletList items={improvementSuggestions} />
      </Section>
    </div>
  )
}

function TwitterView({ output }: { output: TwitterOutput }) {
  const { mainPost, thread, alternateHook, cta, engagementQuestion, repurposingSuggestions, improvementSuggestions } = output
  const threadText = thread ? thread.map((t, i) => `${i + 1}/ ${t}`).join('\n\n') : ''

  return (
    <div className="space-y-4">
      <Section title={thread ? 'Thread' : 'Post'}>
        {thread ? (
          <div className="space-y-3">
            {thread.map((tweet, i) => (
              <div key={i} className="p-3 bg-fabcon-dark rounded border border-fabcon-steel">
                <p className="text-xs text-gray-500 mb-1">{i + 1}/{thread.length}</p>
                <p className="text-sm text-gray-300">{tweet}</p>
                <div className="mt-2">
                  <CopyButton text={tweet} />
                </div>
              </div>
            ))}
            <CopyButton text={threadText} label="Copy Full Thread" />
          </div>
        ) : (
          <div className="space-y-2">
            <p className="text-sm text-gray-300 leading-relaxed">{mainPost}</p>
            <CopyButton text={mainPost} label="Copy Post" />
          </div>
        )}
      </Section>

      <Section title="Alternate Hook">
        <p className="text-sm text-gray-300 mb-2">{alternateHook}</p>
        <CopyButton text={alternateHook} label="Copy Hook" />
      </Section>

      <Section title="CTA">
        <p className="text-sm text-gray-300 mb-2">{cta}</p>
        <CopyButton text={cta} label="Copy CTA" />
      </Section>

      <Section title="Engagement Question">
        <p className="text-sm text-gray-300 mb-2">{engagementQuestion}</p>
        <CopyButton text={engagementQuestion} />
      </Section>

      <Section title="Repurposing Suggestions">
        <BulletList items={repurposingSuggestions} />
      </Section>

      <Section title="Improvement Suggestions">
        <BulletList items={improvementSuggestions} />
      </Section>
    </div>
  )
}

function InstagramView({ output }: { output: InstagramOutput }) {
  const { visualHook, onScreenText, scriptOrSlides, caption, cta, suggestedVisuals, repurposingSuggestions, improvementSuggestions } = output
  const isCarousel = scriptOrSlides.length > 1

  return (
    <div className="space-y-4">
      <Section title="Visual Hook">
        <p className="text-sm text-gray-300 mb-2">{visualHook}</p>
        <CopyButton text={visualHook} label="Copy Hook" />
      </Section>

      <Section title="On-Screen Text">
        <p className="text-sm font-semibold text-white mb-2">{onScreenText}</p>
        <CopyButton text={onScreenText} />
      </Section>

      <Section title={isCarousel ? 'Carousel Slides' : 'Script'}>
        {isCarousel ? (
          <div className="space-y-2">
            {scriptOrSlides.map((slide, i) => (
              <div key={i} className="p-3 bg-fabcon-dark rounded border border-fabcon-steel">
                <p className="text-xs text-orange-400 mb-1">Slide {i + 1}</p>
                <p className="text-sm text-gray-300">{slide}</p>
              </div>
            ))}
            <CopyButton text={scriptOrSlides.map((s, i) => `Slide ${i + 1}: ${s}`).join('\n\n')} label="Copy All Slides" />
          </div>
        ) : (
          <div className="space-y-2">
            <p className="text-sm text-gray-300 whitespace-pre-wrap leading-relaxed">{scriptOrSlides[0]}</p>
            <CopyButton text={scriptOrSlides[0]} label="Copy Script" />
          </div>
        )}
      </Section>

      <Section title="Caption">
        <p className="text-sm text-gray-300 leading-relaxed mb-2">{caption}</p>
        <div className="flex gap-2">
          <CopyButton text={caption} label="Copy Caption" />
          <CopyButton text={cta} label="Copy CTA" />
        </div>
      </Section>

      <Section title="Suggested Visuals">
        <BulletList items={suggestedVisuals} />
      </Section>

      <Section title="Repurposing Suggestions">
        <BulletList items={repurposingSuggestions} />
      </Section>

      <Section title="Improvement Suggestions">
        <BulletList items={improvementSuggestions} />
      </Section>
    </div>
  )
}

function FacebookView({ output }: { output: FacebookOutput }) {
  const { primaryPost, practicalTakeaway, cta, discussionQuestion, repurposingSuggestions, improvementSuggestions } = output

  return (
    <div className="space-y-4">
      <Section title="Post">
        <p className="text-sm text-gray-300 whitespace-pre-wrap leading-relaxed mb-3">{primaryPost}</p>
        <div className="flex flex-wrap gap-2 pt-2 border-t border-fabcon-steel">
          <CopyButton text={primaryPost} label="Copy Post" />
          <CopyButton text={cta} label="CTA Only" />
        </div>
      </Section>

      <Section title="Practical Takeaway">
        <p className="text-sm text-gray-300 mb-2">{practicalTakeaway}</p>
        <CopyButton text={practicalTakeaway} />
      </Section>

      <Section title="Discussion Question">
        <p className="text-sm text-gray-300 mb-2">{discussionQuestion}</p>
        <CopyButton text={discussionQuestion} />
      </Section>

      <Section title="CTA">
        <p className="text-sm text-gray-300 mb-2">{cta}</p>
        <CopyButton text={cta} label="Copy CTA" />
      </Section>

      <Section title="Repurposing Suggestions">
        <BulletList items={repurposingSuggestions} />
      </Section>

      <Section title="Improvement Suggestions">
        <BulletList items={improvementSuggestions} />
      </Section>
    </div>
  )
}

const ALL_PLATFORMS: Platform[] = ['linkedin', 'youtube', 'twitter', 'instagram', 'facebook']

export default function OutputPanel({ platform, output, onRegenerate, onTransformTo }: Props) {
  if (!output) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center bg-fabcon-charcoal border border-fabcon-steel rounded-lg">
        <div className="w-12 h-12 rounded-full bg-fabcon-dark border border-fabcon-steel flex items-center justify-center mb-4">
          <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <p className="text-sm text-gray-500">Select your settings and click Generate Content</p>
      </div>
    )
  }

  const others = ALL_PLATFORMS.filter(p => p !== platform)

  return (
    <div className="space-y-5">
      {platform === 'linkedin' && <LinkedInView output={output as LinkedInOutput} />}
      {platform === 'youtube' && <YouTubeView output={output as YouTubeOutput} />}
      {platform === 'twitter' && <TwitterView output={output as TwitterOutput} />}
      {platform === 'instagram' && <InstagramView output={output as InstagramOutput} />}
      {platform === 'facebook' && <FacebookView output={output as FacebookOutput} />}

      <QualityScorePanel score={output.qualityScore} />

      <div className="bg-fabcon-charcoal border border-fabcon-steel rounded-lg p-4 space-y-3">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Regenerate Variation</p>
        <RegenerateButtons onRegenerate={onRegenerate} />
      </div>

      <div className="bg-fabcon-charcoal border border-fabcon-steel rounded-lg p-4 space-y-3">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Turn Into Another Platform</p>
        <div className="flex flex-wrap gap-2">
          {others.map(p => (
            <button
              key={p}
              onClick={() => onTransformTo(p)}
              className="px-3 py-1.5 text-xs font-medium bg-fabcon-steel text-gray-300 rounded hover:bg-orange-500 hover:text-white transition-colors capitalize"
            >
              → {p}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
