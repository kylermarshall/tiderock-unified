import { RefreshCw, Trash2, FileText, Linkedin, Youtube, Twitter, Instagram, Facebook, Loader2 } from 'lucide-react'
import {
  Platform,
  RegenerateVariant,
  GeneratedContent,
  YouTubeGeneratedContent,
  TwitterGeneratedContent,
  InstagramGeneratedContent,
  FacebookGeneratedContent,
} from '../types'
import PostIdeasOutput from './outputs/PostIdeasOutput'
import RankedIdeasOutput from './outputs/RankedIdeasOutput'
import FullPostOutput from './outputs/FullPostOutput'
import CalendarOutput from './outputs/CalendarOutput'
import QualityScoreCard from './QualityScoreCard'
import YouTubeOutput from './youtube/YouTubeOutput'
import TwitterOutput from './twitter/TwitterOutput'
import InstagramOutput from './instagram/InstagramOutput'
import FacebookOutput from './facebook/FacebookOutput'
import RegenerateVariants from './RegenerateVariants'
import ConvertPlatform from './ConvertPlatform'

type AnyContent =
  | GeneratedContent
  | YouTubeGeneratedContent
  | TwitterGeneratedContent
  | InstagramGeneratedContent
  | FacebookGeneratedContent

interface Props {
  platform: Platform
  content: AnyContent | null
  onRegenerate: () => void
  onRegenerateVariant: (variant: RegenerateVariant) => void
  onConvert: (target: Platform) => void
  onClear: () => void
  isGenerating: boolean
}

const PLATFORM_ICONS: Record<Platform, React.ReactNode> = {
  linkedin:  <Linkedin  className="w-7 h-7 text-slate-400" />,
  youtube:   <Youtube   className="w-7 h-7 text-slate-400" />,
  twitter:   <Twitter   className="w-7 h-7 text-slate-400" />,
  instagram: <Instagram className="w-7 h-7 text-slate-400" />,
  facebook:  <Facebook  className="w-7 h-7 text-slate-400" />,
}

const PLATFORM_LABELS: Record<Platform, string> = {
  linkedin:  'LinkedIn',
  youtube:   'YouTube',
  twitter:   'Twitter / X',
  instagram: 'Instagram',
  facebook:  'Facebook',
}

const SPINNER_COLORS: Record<Platform, string> = {
  linkedin:  'bg-blue-600',
  youtube:   'bg-red-600',
  twitter:   'bg-slate-900',
  instagram: 'bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400',
  facebook:  'bg-blue-500',
}

const BADGE_COLORS: Record<Platform, string> = {
  linkedin:  'bg-blue-50 text-blue-700 border-blue-200',
  youtube:   'bg-red-50 text-red-700 border-red-200',
  twitter:   'bg-slate-100 text-slate-700 border-slate-200',
  instagram: 'bg-pink-50 text-pink-700 border-pink-200',
  facebook:  'bg-blue-50 text-blue-600 border-blue-200',
}

function getContentLabel(platform: Platform, content: AnyContent): string {
  if (platform === 'linkedin') {
    const c = content as GeneratedContent
    const map: Record<string, string> = {
      '10-post-ideas': '10 Post Ideas',
      'ranked-ideas': 'Ranked Ideas',
      'full-post': 'Full Post',
      '30-day-calendar': '30-Day Calendar',
    }
    return map[c.type] ?? c.type
  }
  if (platform === 'youtube') return (content as YouTubeGeneratedContent).format
  if (platform === 'twitter') return (content as TwitterGeneratedContent).format
  if (platform === 'instagram') return (content as InstagramGeneratedContent).format
  if (platform === 'facebook') return (content as FacebookGeneratedContent).format
  return ''
}

export default function OutputPanel({ platform, content, onRegenerate, onRegenerateVariant, onConvert, onClear, isGenerating }: Props) {
  if (isGenerating) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className={`flex items-center justify-center w-14 h-14 rounded-2xl mx-auto mb-4 ${SPINNER_COLORS[platform]}`}>
            <Loader2 className="w-7 h-7 text-white animate-spin" />
          </div>
          <p className="text-sm font-semibold text-slate-900">Generating content...</p>
          <p className="text-xs text-slate-500 mt-1">Building {PLATFORM_LABELS[platform]} content for Premier LogiTech</p>
        </div>
      </div>
    )
  }

  if (!content) {
    return (
      <div className="flex-1">
        <div className="flex flex-col items-center justify-center min-h-[480px] bg-white rounded-xl border border-dashed border-slate-300 p-10 text-center">
          <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-slate-100 mb-5">
            {PLATFORM_ICONS[platform]}
          </div>
          <h3 className="text-base font-semibold text-slate-900 mb-2">
            Your {PLATFORM_LABELS[platform]} content will appear here
          </h3>
          <p className="text-sm text-slate-500 max-w-sm leading-relaxed">
            Fill in the inputs on the left, then click{' '}
            <span className="font-medium text-slate-700">Generate Content</span> to create
            {' '}{PLATFORM_LABELS[platform]} content for Premier LogiTech.
          </p>
          <div className="mt-6 flex items-center gap-2 text-xs text-slate-400">
            <FileText className="w-3.5 h-3.5" />
            <span>No API required — all content generated locally</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 min-w-0 space-y-4">
      {/* Toolbar */}
      <div className="flex items-center justify-between bg-white rounded-xl border border-slate-200 shadow-sm px-4 py-3">
        <div className="flex items-center gap-2">
          <span className={`inline-flex items-center text-xs font-semibold border rounded-full px-2.5 py-0.5 ${BADGE_COLORS[platform]}`}>
            {getContentLabel(platform, content)}
          </span>
          <span className="text-xs text-slate-500">Premier LogiTech</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onRegenerate}
            className="flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg px-3 py-2 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Regenerate
          </button>
          <button
            onClick={onClear}
            className="flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg px-3 py-2 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Clear
          </button>
        </div>
      </div>

      {/* Variant buttons */}
      <RegenerateVariants onRegenerate={onRegenerateVariant} disabled={isGenerating} />

      {/* Convert platform */}
      <ConvertPlatform currentPlatform={platform} onConvert={onConvert} disabled={isGenerating} />

      {/* Content output */}
      {platform === 'linkedin' && (() => {
        const c = content as GeneratedContent
        return (
          <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 lg:p-5">
            {c.type === '10-post-ideas' && c.postIdeas    && <PostIdeasOutput   ideas={c.postIdeas}    />}
            {c.type === 'ranked-ideas'  && c.rankedIdeas  && <RankedIdeasOutput ideas={c.rankedIdeas}  />}
            {c.type === 'full-post'     && c.fullPost     && <FullPostOutput    post={c.fullPost}      />}
            {c.type === '30-day-calendar' && c.calendar   && <CalendarOutput    days={c.calendar}      />}
            <div className="mt-4">
              <QualityScoreCard score={c.qualityScore} />
            </div>
          </div>
        )
      })()}

      {platform === 'youtube'    && <YouTubeOutput    content={content as YouTubeGeneratedContent}    />}
      {platform === 'twitter'    && <TwitterOutput    content={content as TwitterGeneratedContent}    />}
      {platform === 'instagram'  && <InstagramOutput  content={content as InstagramGeneratedContent}  />}
      {platform === 'facebook'   && <FacebookOutput   content={content as FacebookGeneratedContent}   />}
    </div>
  )
}
