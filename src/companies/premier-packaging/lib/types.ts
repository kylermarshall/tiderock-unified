export type Platform = 'linkedin' | 'youtube' | 'twitter' | 'instagram' | 'facebook'

export type ContentVariation = 'default' | 'direct' | 'executive' | 'contrarian' | 'shorter' | 'specific'

export type PackagingProblem =
  | 'box-sizing'
  | 'damage-prevention'
  | 'cost-leakage'
  | 'over-packaging'
  | 'shipping-cost'
  | 'warehouse-slowdowns'
  | 'return-damage'
  | 'freight-inefficiency'
  | 'scaling'
  | 'margin-loss'

// ─── LinkedIn ───────────────────────────────────────────────────────────────

export interface LinkedInInputs {
  targetAudience: string
  mainProblem: PackagingProblem
  contentAngle: string
  tone: string
  objective: string
}

export interface PostIdea {
  title: string
  angle: string
  painClarity: number
  financialImpact: number
  tension: number
  totalScore: number
}

export interface FullPost {
  hook: string
  body: string
  businessImpact: string
  cta: string
}

export interface CalendarEntry {
  day: number
  topic: string
  hook: string
  angle: string
  cta: string
}

export interface LinkedInOutput {
  postIdeas: PostIdea[]
  rankedIdeas: PostIdea[]
  fullPost: FullPost
  contentCalendar: CalendarEntry[]
  repurposingSuggestions: string[]
  qualityScore: ContentQualityScore
  improvementSuggestions: string[]
}

// ─── YouTube ────────────────────────────────────────────────────────────────

export type VideoFormat = 'shorts' | '60-90s' | 'long-form'

export interface YouTubeInputs {
  videoFormat: VideoFormat
  targetViewer: string
  mainProblem: PackagingProblem
  contentAngle: string
  videoObjective: string
  tone: string
}

export interface YouTubeOutput {
  videoTitle: string
  thumbnailText: string
  firstThreeSecondHook: string
  openingLine: string
  mainScript: string
  retentionBeats: string[]
  businessInsight: string
  cta: string
  repurposingSuggestions: string[]
  qualityScore: ContentQualityScore
  improvementSuggestions: string[]
}

// ─── Twitter/X ──────────────────────────────────────────────────────────────

export type TwitterFormat = 'single' | 'thread' | 'contrarian' | 'founder' | 'quote-post'

export interface TwitterInputs {
  postFormat: TwitterFormat
  targetAudience: string
  mainProblem: PackagingProblem
  contentAngle: string
  tone: string
  objective: string
}

export interface TwitterOutput {
  mainPost: string
  alternateHook: string
  cta: string
  engagementQuestion: string
  repurposingSuggestions: string[]
  qualityScore: ContentQualityScore
  improvementSuggestions: string[]
}

// ─── Instagram ──────────────────────────────────────────────────────────────

export type InstagramFormat = 'reel' | 'carousel' | 'caption' | 'story'

export interface InstagramInputs {
  contentFormat: InstagramFormat
  targetViewer: string
  mainProblem: PackagingProblem
  contentAngle: string
  visualStyle: string
  objective: string
}

export interface InstagramSlide {
  slideNumber: number
  onScreenText: string
  visualDescription: string
  role: string
}

export interface InstagramOutput {
  visualHook: string
  onScreenText: string
  reelScriptOrSlides: string | InstagramSlide[]
  caption: string
  cta: string
  suggestedVisuals: string[]
  repurposingSuggestions: string[]
  qualityScore: ContentQualityScore
  improvementSuggestions: string[]
}

// ─── Facebook ───────────────────────────────────────────────────────────────

export type FacebookFormat = 'short' | 'educational' | 'discussion' | 'business-owner' | 'retargeting'

export interface FacebookInputs {
  contentFormat: FacebookFormat
  targetReader: string
  mainProblem: PackagingProblem
  contentAngle: string
  tone: string
  objective: string
}

export interface FacebookOutput {
  primaryPost: string
  practicalTakeaway: string
  cta: string
  discussionQuestion: string
  repurposingSuggestions: string[]
  qualityScore: ContentQualityScore
  improvementSuggestions: string[]
}

// ─── Shared ──────────────────────────────────────────────────────────────────

export interface ContentQualityScore {
  total: number
  painClarity: number
  financialConsequence: number
  operationalTension: number
  ctaClarity: number
  writingCompliance: number
  breakdown: string
}
