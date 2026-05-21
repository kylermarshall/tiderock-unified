// ─── Shared ───────────────────────────────────────────────────────────────────

export type Platform = 'linkedin' | 'youtube' | 'twitter' | 'instagram' | 'facebook'

export type RegenerateVariant =
  | 'more-direct'
  | 'more-executive'
  | 'more-contrarian'
  | 'shorter'
  | 'more-specific'

export interface QualityScore {
  overall: number
  breakdown: {
    specificity: number
    painIntensity: number
    financialRelevance: number
    clarity: number
    nonGenericLanguage: number
  }
  suggestions: string[]
}

// ─── LinkedIn (unchanged) ─────────────────────────────────────────────────────

export type ContentAngle =
  | 'hidden-cost-leak'
  | 'common-operational-mistake'
  | 'contrarian-take'
  | 'system-failure'
  | 'before-after-improvement'
  | 'risk-warning'
  | 'buyer-education'

export type PostType =
  | '10-post-ideas'
  | 'ranked-ideas'
  | 'full-post'
  | '30-day-calendar'

export type Tone =
  | 'direct'
  | 'insider-operator'
  | 'contrarian'
  | 'educational'
  | 'executive'

export interface FormInputs {
  targetAudience: string
  mainPainPoint: string
  contentAngle: ContentAngle
  postType: PostType
  tone: Tone
}

export interface PostIdea {
  id: number
  hook: string
  angle: string
  whyItMatters: string
  cta: string
}

export interface RankedIdea {
  id: number
  rank: number
  hook: string
  angle: string
  whyItMatters: string
  cta: string
  scores: {
    clarityOfPain: number
    financialImpact: number
    tension: number
    relevanceToDecisionMakers: number
  }
  totalScore: number
}

export interface FullPost {
  hook: string
  body: string[]
  businessImpact: string
  cta: string
}

export interface CalendarDay {
  day: number
  postTopic: string
  hook: string
  angle: string
  cta: string
}

export interface GeneratedContent {
  type: PostType
  postIdeas?: PostIdea[]
  rankedIdeas?: RankedIdea[]
  fullPost?: FullPost
  calendar?: CalendarDay[]
  qualityScore: QualityScore
}

// ─── YouTube ──────────────────────────────────────────────────────────────────

export type YouTubeFormat =
  | 'shorts'
  | '60-90-seconds'
  | 'long-form-outline'
  | 'title-thumbnail-package'

export type VideoObjective =
  | 'educate'
  | 'generate-leads'
  | 'build-awareness'
  | 'convert'

export interface YouTubeFormInputs {
  videoFormat: YouTubeFormat
  targetViewer: string
  mainPainPoint: string
  contentAngle: ContentAngle
  videoObjective: VideoObjective
  tone: Tone
}

export interface YouTubeGeneratedContent {
  format: YouTubeFormat
  videoTitle: string
  thumbnailText: string
  threeSecondHook: string
  openingLine: string
  scriptOrOutline: string[]
  retentionBeats: string[]
  businessInsight: string
  cta: string
  repurposingSuggestions: string[]
  qualityScore: QualityScore
}

// ─── Twitter / X ──────────────────────────────────────────────────────────────

export type TwitterFormat =
  | 'single-post'
  | 'thread'
  | 'contrarian-take'
  | 'founder-style'
  | 'quote-post'

export type TwitterObjective =
  | 'awareness'
  | 'engagement'
  | 'leads'
  | 'authority'

export interface TwitterFormInputs {
  postFormat: TwitterFormat
  targetAudience: string
  mainPainPoint: string
  contentAngle: ContentAngle
  tone: Tone
  objective: TwitterObjective
}

export interface TwitterGeneratedContent {
  format: TwitterFormat
  posts: string[]
  alternateHook: string
  cta: string
  engagementQuestion: string
  repurposingSuggestions: string[]
  qualityScore: QualityScore
}

// ─── Instagram ────────────────────────────────────────────────────────────────

export type InstagramFormat =
  | 'reel-script'
  | 'carousel-outline'
  | 'caption'
  | 'story-sequence'

export type VisualStyle =
  | 'talking-head'
  | 'text-overlay'
  | 'data-visual'
  | 'behind-scenes'
  | 'documentary'

export type InstagramObjective =
  | 'awareness'
  | 'engagement'
  | 'save-worthy'
  | 'share-worthy'

export interface InstagramFormInputs {
  contentFormat: InstagramFormat
  targetViewer: string
  mainPainPoint: string
  contentAngle: ContentAngle
  visualStyle: VisualStyle
  objective: InstagramObjective
}

export interface InstagramContentItem {
  label: string
  heading: string
  body: string
  visualNote: string
  duration?: string
}

export interface InstagramGeneratedContent {
  format: InstagramFormat
  visualHook: string
  onScreenText: string
  contentItems: InstagramContentItem[]
  caption: string
  cta: string
  suggestedVisuals: string[]
  repurposingSuggestions: string[]
  qualityScore: QualityScore
}

// ─── Facebook ─────────────────────────────────────────────────────────────────

export type FacebookFormat =
  | 'short-post'
  | 'educational-post'
  | 'discussion-prompt'
  | 'business-owner-post'
  | 'retargeting-post'

export type FacebookObjective =
  | 'reach'
  | 'engagement'
  | 'leads'
  | 'retarget'

export interface FacebookFormInputs {
  contentFormat: FacebookFormat
  targetReader: string
  mainPainPoint: string
  contentAngle: ContentAngle
  tone: Tone
  objective: FacebookObjective
}

export interface FacebookGeneratedContent {
  format: FacebookFormat
  primaryPost: string[]
  practicalTakeaway: string
  cta: string
  discussionQuestion: string
  repurposingSuggestions: string[]
  qualityScore: QualityScore
}
