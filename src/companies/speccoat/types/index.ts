export type Platform = 'linkedin' | 'youtube' | 'twitter' | 'instagram' | 'facebook';

export type RegenerateMode = 'default' | 'direct' | 'executive' | 'contrarian' | 'shorter' | 'specific';

export interface LinkedInInputs {
  targetAudience: string;
  mainProblem: string;
  contentAngle: string;
  tone: string;
  objective: string;
}

export interface YouTubeInputs {
  videoFormat: string;
  targetViewer: string;
  mainProblem: string;
  contentAngle: string;
  videoObjective: string;
  tone: string;
}

export interface TwitterInputs {
  postFormat: string;
  targetAudience: string;
  mainProblem: string;
  contentAngle: string;
  tone: string;
  objective: string;
}

export interface InstagramInputs {
  contentFormat: string;
  targetViewer: string;
  mainProblem: string;
  contentAngle: string;
  visualStyle: string;
  objective: string;
}

export interface FacebookInputs {
  contentFormat: string;
  targetReader: string;
  mainProblem: string;
  contentAngle: string;
  tone: string;
  objective: string;
}

export interface PostIdea {
  title: string;
  angle: string;
  rank: number;
  rankReason: string;
}

export interface LinkedInOutput {
  postIdeas: PostIdea[];
  fullPost: {
    hook: string;
    body: string;
    businessImpact: string;
    cta: string;
  };
  contentCalendar: CalendarDay[];
  repurposing: string[];
  qualityScore: QualityScore;
  improvements: string[];
}

export interface YouTubeOutput {
  title: string;
  thumbnailText: string;
  threeSecondHook: string;
  openingLine: string;
  scriptOutline: ScriptSection[];
  retentionBeats: string[];
  businessInsight: string;
  cta: string;
  repurposing: string[];
  qualityScore: QualityScore;
  improvements: string[];
}

export interface TwitterOutput {
  mainPost: string;
  thread?: string[];
  alternateHook: string;
  cta: string;
  engagementQuestion: string;
  repurposing: string[];
  qualityScore: QualityScore;
  improvements: string[];
}

export interface InstagramOutput {
  visualHook: string;
  onScreenText: string[];
  captionOrScript: string;
  caption: string;
  cta: string;
  suggestedVisuals: string[];
  repurposing: string[];
  qualityScore: QualityScore;
  improvements: string[];
}

export interface FacebookOutput {
  primaryPost: string;
  practicalTakeaway: string;
  cta: string;
  discussionQuestion: string;
  repurposing: string[];
  qualityScore: QualityScore;
  improvements: string[];
}

export interface CalendarDay {
  day: number;
  topic: string;
  hook: string;
  angle: string;
  cta: string;
}

export interface ScriptSection {
  label: string;
  content: string;
}

export interface QualityScore {
  overall: number;
  painClarity: number;
  financialImpact: number;
  operationalTension: number;
  ctaStrength: number;
  label: string;
}
