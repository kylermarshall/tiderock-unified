import { useState } from 'react'
import Header from './components/Header'
import PlatformSelector from './components/PlatformSelector'
import InputPanel from './components/InputPanel'
import OutputPanel from './components/OutputPanel'
import YouTubeInputPanel from './components/youtube/YouTubeInputPanel'
import TwitterInputPanel from './components/twitter/TwitterInputPanel'
import InstagramInputPanel from './components/instagram/InstagramInputPanel'
import FacebookInputPanel from './components/facebook/FacebookInputPanel'

import {
  Platform,
  RegenerateVariant,
  FormInputs,
  GeneratedContent,
  YouTubeFormInputs,
  YouTubeGeneratedContent,
  TwitterFormInputs,
  TwitterGeneratedContent,
  InstagramFormInputs,
  InstagramGeneratedContent,
  FacebookFormInputs,
  FacebookGeneratedContent,
} from './types'

import { generateContent }          from './lib/contentGenerator'
import { generateYouTubeContent }   from './lib/youtube'
import { generateTwitterContent }   from './lib/twitter'
import { generateInstagramContent } from './lib/instagram'
import { generateFacebookContent }  from './lib/facebook'

// ─── Default inputs ───────────────────────────────────────────────────────────

const DEFAULT_LINKEDIN: FormInputs = {
  targetAudience: '',
  mainPainPoint: '',
  contentAngle: 'hidden-cost-leak',
  postType: '10-post-ideas',
  tone: 'direct',
}

const DEFAULT_YOUTUBE: YouTubeFormInputs = {
  videoFormat: 'shorts',
  targetViewer: '',
  mainPainPoint: '',
  contentAngle: 'hidden-cost-leak',
  videoObjective: 'educate',
  tone: 'direct',
}

const DEFAULT_TWITTER: TwitterFormInputs = {
  postFormat: 'single-post',
  targetAudience: '',
  mainPainPoint: '',
  contentAngle: 'hidden-cost-leak',
  tone: 'direct',
  objective: 'awareness',
}

const DEFAULT_INSTAGRAM: InstagramFormInputs = {
  contentFormat: 'reel-script',
  targetViewer: '',
  mainPainPoint: '',
  contentAngle: 'hidden-cost-leak',
  visualStyle: 'talking-head',
  objective: 'awareness',
}

const DEFAULT_FACEBOOK: FacebookFormInputs = {
  contentFormat: 'short-post',
  targetReader: '',
  mainPainPoint: '',
  contentAngle: 'hidden-cost-leak',
  tone: 'direct',
  objective: 'reach',
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function extractAudience(platform: Platform, inputs: AllInputs): string {
  switch (platform) {
    case 'linkedin': return inputs.linkedin.targetAudience
    case 'youtube':  return inputs.youtube.targetViewer
    case 'twitter':  return inputs.twitter.targetAudience
    case 'instagram':return inputs.instagram.targetViewer
    case 'facebook': return inputs.facebook.targetReader
  }
}

function extractPainPoint(platform: Platform, inputs: AllInputs): string {
  switch (platform) {
    case 'linkedin': return inputs.linkedin.mainPainPoint
    case 'youtube':  return inputs.youtube.mainPainPoint
    case 'twitter':  return inputs.twitter.mainPainPoint
    case 'instagram':return inputs.instagram.mainPainPoint
    case 'facebook': return inputs.facebook.mainPainPoint
  }
}

interface AllInputs {
  linkedin:  FormInputs
  youtube:   YouTubeFormInputs
  twitter:   TwitterFormInputs
  instagram: InstagramFormInputs
  facebook:  FacebookFormInputs
}

type AnyContent =
  | GeneratedContent
  | YouTubeGeneratedContent
  | TwitterGeneratedContent
  | InstagramGeneratedContent
  | FacebookGeneratedContent

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [platform, setPlatform] = useState<Platform>('linkedin')

  const [inputs, setInputs] = useState<AllInputs>({
    linkedin:  DEFAULT_LINKEDIN,
    youtube:   DEFAULT_YOUTUBE,
    twitter:   DEFAULT_TWITTER,
    instagram: DEFAULT_INSTAGRAM,
    facebook:  DEFAULT_FACEBOOK,
  })

  const [content, setContent] = useState<Partial<Record<Platform, AnyContent>>>({})
  const [isGenerating, setIsGenerating] = useState(false)

  const run = (p: Platform, variant?: RegenerateVariant) => {
    setIsGenerating(true)
    setTimeout(() => {
      let result: AnyContent
      switch (p) {
        case 'linkedin':
          result = generateContent(inputs.linkedin)
          break
        case 'youtube':
          result = generateYouTubeContent(inputs.youtube, variant)
          break
        case 'twitter':
          result = generateTwitterContent(inputs.twitter, variant)
          break
        case 'instagram':
          result = generateInstagramContent(inputs.instagram, variant)
          break
        case 'facebook':
          result = generateFacebookContent(inputs.facebook, variant)
          break
      }
      setContent(prev => ({ ...prev, [p]: result }))
      setIsGenerating(false)
    }, 400)
  }

  const handleGenerate = () => run(platform)
  const handleRegenerate = () => run(platform)
  const handleRegenerateVariant = (variant: RegenerateVariant) => run(platform, variant)

  const handleConvert = (target: Platform) => {
    const audience  = extractAudience(platform, inputs)
    const painPoint = extractPainPoint(platform, inputs)

    setInputs(prev => {
      const next = { ...prev }
      switch (target) {
        case 'linkedin':
          next.linkedin  = { ...DEFAULT_LINKEDIN,  targetAudience: audience, mainPainPoint: painPoint }
          break
        case 'youtube':
          next.youtube   = { ...DEFAULT_YOUTUBE,   targetViewer: audience,   mainPainPoint: painPoint }
          break
        case 'twitter':
          next.twitter   = { ...DEFAULT_TWITTER,   targetAudience: audience, mainPainPoint: painPoint }
          break
        case 'instagram':
          next.instagram = { ...DEFAULT_INSTAGRAM, targetViewer: audience,   mainPainPoint: painPoint }
          break
        case 'facebook':
          next.facebook  = { ...DEFAULT_FACEBOOK,  targetReader: audience,   mainPainPoint: painPoint }
          break
      }
      return next
    })

    setPlatform(target)
  }

  const handleClear = () => {
    setContent(prev => ({ ...prev, [platform]: undefined }))
  }

  const handlePlatformChange = (p: Platform) => {
    setPlatform(p)
  }

  const currentContent = content[platform] ?? null

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <PlatformSelector platform={platform} onChange={handlePlatformChange} />
      <main className="max-w-screen-2xl mx-auto px-4 sm:px-6 py-6">
        <div className="flex flex-col lg:flex-row gap-6 items-start">

          {platform === 'linkedin' && (
            <InputPanel
              inputs={inputs.linkedin}
              onChange={v => setInputs(p => ({ ...p, linkedin: v }))}
              onGenerate={handleGenerate}
              isGenerating={isGenerating}
            />
          )}
          {platform === 'youtube' && (
            <YouTubeInputPanel
              inputs={inputs.youtube}
              onChange={v => setInputs(p => ({ ...p, youtube: v }))}
              onGenerate={handleGenerate}
              isGenerating={isGenerating}
            />
          )}
          {platform === 'twitter' && (
            <TwitterInputPanel
              inputs={inputs.twitter}
              onChange={v => setInputs(p => ({ ...p, twitter: v }))}
              onGenerate={handleGenerate}
              isGenerating={isGenerating}
            />
          )}
          {platform === 'instagram' && (
            <InstagramInputPanel
              inputs={inputs.instagram}
              onChange={v => setInputs(p => ({ ...p, instagram: v }))}
              onGenerate={handleGenerate}
              isGenerating={isGenerating}
            />
          )}
          {platform === 'facebook' && (
            <FacebookInputPanel
              inputs={inputs.facebook}
              onChange={v => setInputs(p => ({ ...p, facebook: v }))}
              onGenerate={handleGenerate}
              isGenerating={isGenerating}
            />
          )}

          <OutputPanel
            platform={platform}
            content={currentContent}
            onRegenerate={handleRegenerate}
            onRegenerateVariant={handleRegenerateVariant}
            onConvert={handleConvert}
            onClear={handleClear}
            isGenerating={isGenerating}
          />
        </div>
      </main>
    </div>
  )
}
