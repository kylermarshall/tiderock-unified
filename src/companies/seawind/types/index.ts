export type Platform = 'linkedin' | 'youtube' | 'twitter' | 'instagram' | 'facebook'

export type PainPoint =
  | 'spoilage'
  | 'supply_inconsistency'
  | 'price_volatility'
  | 'waste_inventory'
  | 'cold_chain'
  | 'over_ordering'
  | 'margin_loss'
  | 'logistics'
  | 'lead_time'
  | 'quality_inconsistency'

export type ContentAngle =
  | 'challenge_assumption'
  | 'data_driven'
  | 'operator_story'
  | 'financial_impact'
  | 'process_breakdown'

export type Tone = 'authoritative' | 'direct' | 'contrarian' | 'educational' | 'founder'

export type RegenerateVariant =
  | 'more_direct'
  | 'more_executive'
  | 'more_contrarian'
  | 'shorter'
  | 'more_specific'

export interface BaseInputs {
  targetAudience: string
  painPoint: PainPoint
  angle: ContentAngle
  tone: Tone
  objective: string
  variantSeed?: number
}

// ── LinkedIn ──────────────────────────────────────────────────────────────────

export interface LinkedInInputs extends BaseInputs {
  format: 'post_ideas' | 'full_post' | 'calendar'
}

export interface LinkedInPostIdea {
  title: string
  angle: string
  painClarity: number
  financialImpact: number
  tension: number
  rank: number
}

export interface LinkedInPost {
  hook: string
  body: string[]
  businessImpact: string
  cta: string
}

export interface LinkedInCalendarDay {
  day: number
  topic: string
  hook: string
  angle: string
  cta: string
}

export interface LinkedInOutput {
  postIdeas: LinkedInPostIdea[]
  fullPost: LinkedInPost
  calendar: LinkedInCalendarDay[]
  repurposingSuggestions: string[]
  score: ContentScore
}

// ── YouTube ──────────────────────────────────────────────────────────────────

export type YouTubeFormat = 'short' | 'mid' | 'longform'

export interface YouTubeInputs extends BaseInputs {
  format: YouTubeFormat
}

export interface YouTubeOutput {
  title: string
  thumbnailText: string
  hook3Sec: string
  openingLine: string
  script: string[]
  retentionBeats: string[]
  businessInsight: string
  cta: string
  repurposingSuggestions: string[]
  score: ContentScore
}

// ── Twitter/X ─────────────────────────────────────────────────────────────────

export type TwitterFormat = 'single' | 'thread' | 'contrarian' | 'founder' | 'quote_response'

export interface TwitterInputs extends BaseInputs {
  format: TwitterFormat
}

export interface TwitterOutput {
  posts: string[]
  alternateHook: string
  cta: string
  engagementQuestion: string
  repurposingSuggestions: string[]
  score: ContentScore
}

// ── Instagram ─────────────────────────────────────────────────────────────────

export type InstagramFormat = 'reel' | 'carousel' | 'caption' | 'story'

export interface InstagramInputs extends BaseInputs {
  format: InstagramFormat
}

export interface InstagramCarouselSlide {
  slideNumber: number
  onScreenText: string
  caption: string
  visual: string
}

export interface InstagramOutput {
  visualHook: string
  onScreenText: string
  script: string[]
  slides?: InstagramCarouselSlide[]
  caption: string
  cta: string
  suggestedVisuals: string[]
  repurposingSuggestions: string[]
  score: ContentScore
}

// ── Facebook ──────────────────────────────────────────────────────────────────

export type FacebookFormat = 'short' | 'educational' | 'discussion' | 'business_owner' | 'retargeting'

export interface FacebookInputs extends BaseInputs {
  format: FacebookFormat
}

export interface FacebookOutput {
  primaryPost: string
  practicalTakeaway: string
  cta: string
  discussionQuestion: string
  repurposingSuggestions: string[]
  score: ContentScore
}

// ── Scoring ───────────────────────────────────────────────────────────────────

export interface ContentScore {
  total: number
  painClarity: number
  financialImpact: number
  operationalTension: number
  ctaStrength: number
  label: 'Weak' | 'Fair' | 'Strong' | 'Excellent'
  improvements: string[]
}

// ── Cross-platform ────────────────────────────────────────────────────────────

export type AnyOutput =
  | LinkedInOutput
  | YouTubeOutput
  | TwitterOutput
  | InstagramOutput
  | FacebookOutput

export type AnyInputs =
  | LinkedInInputs
  | YouTubeInputs
  | TwitterInputs
  | InstagramInputs
  | FacebookInputs
