// Shared types used across all company content engines

export type Platform = 'linkedin' | 'youtube' | 'twitter' | 'instagram' | 'facebook'

export type RegenerateVariant = 'direct' | 'executive' | 'contrarian' | 'shorter' | 'specific'

export interface BasePlatformInputs {
  targetAudience: string
  problem: string
  angle: string
  tone: string
  objective: string
}

export interface LinkedInInputs extends BasePlatformInputs {
  contentFormat: 'post' | 'calendar'
}
export interface YouTubeInputs extends BasePlatformInputs {
  videoFormat: 'shorts' | '60-90s' | 'long-form'
}
export interface TwitterInputs extends BasePlatformInputs {
  postFormat: 'single' | 'thread' | 'contrarian' | 'founder' | 'quote-response'
}
export interface InstagramInputs extends BasePlatformInputs {
  contentFormat: 'reel' | 'carousel' | 'caption' | 'story'
  visualStyle: string
}
export interface FacebookInputs extends BasePlatformInputs {
  contentFormat: 'short' | 'educational' | 'discussion' | 'business-owner' | 'retargeting'
}

export type PlatformInputs =
  | LinkedInInputs
  | YouTubeInputs
  | TwitterInputs
  | InstagramInputs
  | FacebookInputs

export interface QualityScore {
  overall: number
  painClarity: number
  financialImpact: number
  operationalTension: number
  ctaStrength: number
  brandAlignment: number
}

export interface PostIdea {
  title: string
  angle: string
  rank: number
  painClarity: number
  financialImpact: number
  tension: number
}

export interface CalendarEntry {
  day: number
  topic: string
  hook: string
  angle: string
  cta: string
}

export interface LinkedInOutput {
  platform: 'linkedin'
  postIdeas: PostIdea[]
  fullPost: { hook: string; body: string; businessImpact: string; cta: string }
  calendar: CalendarEntry[]
  repurposingSuggestions: string[]
  qualityScore: QualityScore
  improvementSuggestions: string[]
}
export interface YouTubeOutput {
  platform: 'youtube'
  title: string
  thumbnailText: string
  threeSecondHook: string
  openingLine: string
  scriptOrOutline: string
  retentionBeats: string[]
  businessInsight: string
  cta: string
  repurposingSuggestions: string[]
  qualityScore: QualityScore
  improvementSuggestions: string[]
}
export interface TwitterOutput {
  platform: 'twitter'
  mainPost: string
  thread?: string[]
  alternateHook: string
  cta: string
  engagementQuestion: string
  repurposingSuggestions: string[]
  qualityScore: QualityScore
  improvementSuggestions: string[]
}
export interface InstagramOutput {
  platform: 'instagram'
  visualHook: string
  onScreenText: string
  scriptOrSlides: string[]
  caption: string
  cta: string
  suggestedVisuals: string[]
  repurposingSuggestions: string[]
  qualityScore: QualityScore
  improvementSuggestions: string[]
}
export interface FacebookOutput {
  platform: 'facebook'
  primaryPost: string
  practicalTakeaway: string
  cta: string
  discussionQuestion: string
  repurposingSuggestions: string[]
  qualityScore: QualityScore
  improvementSuggestions: string[]
}

export type GeneratedOutput =
  | LinkedInOutput
  | YouTubeOutput
  | TwitterOutput
  | InstagramOutput
  | FacebookOutput
