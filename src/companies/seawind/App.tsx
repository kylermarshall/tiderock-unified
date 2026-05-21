import { useState, useCallback } from 'react'
import type { Platform, PainPoint, ContentAngle, Tone, RegenerateVariant, LinkedInOutput, YouTubeOutput, TwitterOutput, InstagramOutput, FacebookOutput, AnyOutput } from './types'
import Header from './components/Header'
import PlatformTabs from './components/PlatformTabs'
import InputPanel from './components/InputPanel'
import LinkedInView from './components/platforms/LinkedInView'
import YouTubeView from './components/platforms/YouTubeView'
import TwitterView from './components/platforms/TwitterView'
import InstagramView from './components/platforms/InstagramView'
import FacebookView from './components/platforms/FacebookView'
import { generateLinkedIn, regenerateLinkedIn } from './platforms/linkedin'
import { generateYouTube, regenerateYouTube } from './platforms/youtube'
import { generateTwitter, regenerateTwitter } from './platforms/twitter'
import { generateInstagram, regenerateInstagram } from './platforms/instagram'
import { generateFacebook, regenerateFacebook } from './platforms/facebook'

interface FormState {
  platform: Platform
  format: string
  targetAudience: string
  painPoint: PainPoint
  angle: ContentAngle
  tone: Tone
  objective: string
}

const DEFAULT_FORM: FormState = {
  platform: 'linkedin',
  format: 'full_post',
  targetAudience: 'Restaurant operators (independent)',
  painPoint: 'spoilage',
  angle: 'challenge_assumption',
  tone: 'authoritative',
  objective: 'Build awareness of spoilage cost',
}

const PLATFORM_FORMAT_DEFAULTS: Record<Platform, string> = {
  linkedin: 'full_post',
  youtube: 'mid',
  twitter: 'single',
  instagram: 'carousel',
  facebook: 'educational',
}

function generateForPlatform(platform: Platform, form: FormState, seed = 0): AnyOutput {
  const base = { ...form, variantSeed: seed }
  switch (platform) {
    case 'linkedin':
      return generateLinkedIn({ ...base, format: form.format as 'post_ideas' | 'full_post' | 'calendar' })
    case 'youtube':
      return generateYouTube({ ...base, format: form.format as 'short' | 'mid' | 'longform' })
    case 'twitter':
      return generateTwitter({ ...base, format: form.format as 'single' | 'thread' | 'contrarian' | 'founder' | 'quote_response' })
    case 'instagram':
      return generateInstagram({ ...base, format: form.format as 'reel' | 'carousel' | 'caption' | 'story' })
    case 'facebook':
      return generateFacebook({ ...base, format: form.format as 'short' | 'educational' | 'discussion' | 'business_owner' | 'retargeting' })
  }
}

export default function App() {
  const [form, setForm] = useState<FormState>(DEFAULT_FORM)
  const [output, setOutput] = useState<AnyOutput | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [variantSeed, setVariantSeed] = useState(0)

  const updateForm = useCallback((updates: Partial<FormState>) => {
    setForm((prev) => ({ ...prev, ...updates }))
  }, [])

  const handlePlatformChange = useCallback((platform: Platform) => {
    setForm((prev) => ({
      ...prev,
      platform,
      format: PLATFORM_FORMAT_DEFAULTS[platform],
    }))
    setOutput(null)
  }, [])

  const handleGenerate = useCallback(() => {
    setIsGenerating(true)
    setTimeout(() => {
      const result = generateForPlatform(form.platform, form, variantSeed)
      setOutput(result)
      setIsGenerating(false)
    }, 350)
  }, [form, variantSeed])

  const handleRegenerate = useCallback((variant: RegenerateVariant) => {
    setIsGenerating(true)
    const nextSeed = variantSeed + 1
    setVariantSeed(nextSeed)
    setTimeout(() => {
      const base = { ...form, variantSeed: nextSeed }
      let result: AnyOutput
      switch (form.platform) {
        case 'linkedin':
          result = regenerateLinkedIn({ ...base, format: form.format as 'post_ideas' | 'full_post' | 'calendar' }, variant)
          break
        case 'youtube':
          result = regenerateYouTube({ ...base, format: form.format as 'short' | 'mid' | 'longform' }, variant)
          break
        case 'twitter':
          result = regenerateTwitter({ ...base, format: form.format as 'single' | 'thread' | 'contrarian' | 'founder' | 'quote_response' }, variant)
          break
        case 'instagram':
          result = regenerateInstagram({ ...base, format: form.format as 'reel' | 'carousel' | 'caption' | 'story' }, variant)
          break
        case 'facebook':
          result = regenerateFacebook({ ...base, format: form.format as 'short' | 'educational' | 'discussion' | 'business_owner' | 'retargeting' }, variant)
          break
        default:
          result = generateForPlatform(form.platform, form, nextSeed)
      }
      setOutput(result)
      setIsGenerating(false)
    }, 300)
  }, [form, variantSeed])

  const handleConvertTo = useCallback((targetPlatform: string) => {
    const platform = targetPlatform as Platform
    const newForm = {
      ...form,
      platform,
      format: PLATFORM_FORMAT_DEFAULTS[platform],
    }
    setForm(newForm)
    setIsGenerating(true)
    setTimeout(() => {
      const result = generateForPlatform(platform, newForm, variantSeed)
      setOutput(result)
      setIsGenerating(false)
    }, 300)
  }, [form, variantSeed])

  const renderOutput = () => {
    if (!output) {
      return (
        <div className="flex flex-col items-center justify-center h-full min-h-[60vh] text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center text-2xl">
            ⚡
          </div>
          <div>
            <h3 className="font-semibold text-slate-800 text-base mb-1">Ready to Generate</h3>
            <p className="text-slate-500 text-sm max-w-xs">
              Configure your inputs on the left, then click Generate Content to produce platform-native B2B content.
            </p>
          </div>
          <button onClick={handleGenerate} className="btn-primary">
            <span>⚡</span>
            Generate Content
          </button>
        </div>
      )
    }

    if (isGenerating) {
      return (
        <div className="flex items-center justify-center h-full min-h-[60vh]">
          <div className="text-center space-y-3">
            <div className="w-10 h-10 border-2 border-navy-800 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-slate-500 text-sm">Generating content...</p>
          </div>
        </div>
      )
    }

    switch (form.platform) {
      case 'linkedin':
        return <LinkedInView output={output as LinkedInOutput} onRegenerate={handleRegenerate} onConvertTo={handleConvertTo} />
      case 'youtube':
        return <YouTubeView output={output as YouTubeOutput} onRegenerate={handleRegenerate} onConvertTo={handleConvertTo} />
      case 'twitter':
        return <TwitterView output={output as TwitterOutput} onRegenerate={handleRegenerate} onConvertTo={handleConvertTo} />
      case 'instagram':
        return <InstagramView output={output as InstagramOutput} onRegenerate={handleRegenerate} onConvertTo={handleConvertTo} />
      case 'facebook':
        return <FacebookView output={output as FacebookOutput} onRegenerate={handleRegenerate} onConvertTo={handleConvertTo} />
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <PlatformTabs active={form.platform} onChange={handlePlatformChange} />

      <div className="flex-1 max-w-screen-xl mx-auto w-full px-6 py-6">
        <div className="flex gap-6 items-start">
          {/* Left: Input Panel */}
          <div className="w-72 shrink-0 sticky top-[calc(3.5rem+2.5rem)]">
            <InputPanel
              formState={form}
              onChange={updateForm}
              onGenerate={handleGenerate}
              isGenerating={isGenerating}
            />
          </div>

          {/* Right: Output Panel */}
          <div className="flex-1 min-w-0">
            {isGenerating && !output ? (
              <div className="flex items-center justify-center min-h-[60vh]">
                <div className="text-center space-y-3">
                  <div className="w-10 h-10 border-2 border-navy-800 border-t-transparent rounded-full animate-spin mx-auto" />
                  <p className="text-slate-500 text-sm">Generating content...</p>
                </div>
              </div>
            ) : (
              renderOutput()
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
