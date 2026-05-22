import { useState, useCallback } from 'react'
import type { Platform, PlatformInputs, GeneratedOutput, LinkedInInputs, YouTubeInputs, TwitterInputs, InstagramInputs, FacebookInputs } from '../../shared/types'
import { PlatformSelector } from '../../shared/components/PlatformSelector'
import { InputPanel } from '../../shared/components/InputPanel'
import { OutputPanel } from '../../shared/components/OutputPanel'
import { generateLinkedIn } from './platforms/linkedin'
import { generateYouTube } from './platforms/youtube'
import { generateTwitter } from './platforms/twitter'
import { generateInstagram } from './platforms/instagram'
import { generateFacebook } from './platforms/facebook'
import { applyRegenerateVariant, transformToPlatform } from './lib/contentTransformer'
import { COMPANY, PROBLEM_LABELS, TARGET_AUDIENCES, CONTENT_ANGLES, OBJECTIVES } from './lib/companyProfile'

const BRAND_COLOR = '#10B981'

const DEFAULT_INPUTS: Record<Platform, PlatformInputs> = {
  linkedin: {
    targetAudience: 'OEM Project Managers',
    problem: 'fabrication-bottlenecks',
    angle: 'Financial Impact',
    tone: 'professional',
    objective: 'Build Authority',
    contentFormat: 'post',
  } as LinkedInInputs,
  youtube: {
    targetAudience: 'Operations Directors',
    problem: 'production-delays',
    angle: 'Operational Risk',
    tone: 'direct',
    objective: 'Drive Website Traffic',
    videoFormat: '60-90s',
  } as YouTubeInputs,
  twitter: {
    targetAudience: 'OEM Project Managers',
    problem: 'rework-scrap-cost',
    angle: 'Contrarian Take',
    tone: 'contrarian',
    objective: 'Start Conversations',
    postFormat: 'thread',
  } as TwitterInputs,
  instagram: {
    targetAudience: 'Plant Managers',
    problem: 'missed-deadlines',
    angle: 'Hidden Cost Exposure',
    tone: 'direct',
    objective: 'Build Authority',
    contentFormat: 'carousel',
    visualStyle: 'Industrial',
  } as InstagramInputs,
  facebook: {
    targetAudience: 'VPs of Manufacturing',
    problem: 'cost-overruns',
    angle: 'Industry Benchmark',
    tone: 'educational',
    objective: 'Educate Audience',
    contentFormat: 'educational',
  } as FacebookInputs,
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function generate(platform: Platform, inputs: PlatformInputs, seed = 0): GeneratedOutput {
  switch (platform) {
    case 'linkedin': return generateLinkedIn(inputs as any, seed) as unknown as GeneratedOutput
    case 'youtube': return generateYouTube(inputs as any, seed) as unknown as GeneratedOutput
    case 'twitter': return generateTwitter(inputs as any, seed) as unknown as GeneratedOutput
    case 'instagram': return generateInstagram(inputs as any, seed) as unknown as GeneratedOutput
    case 'facebook': return generateFacebook(inputs as any, seed) as unknown as GeneratedOutput
  }
}

export default function App() {
  const [platform, setPlatform] = useState<Platform>('linkedin')
  const [inputs, setInputs] = useState<Record<Platform, PlatformInputs>>(DEFAULT_INPUTS)
  const [output, setOutput] = useState<GeneratedOutput | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)

  const handlePlatformChange = useCallback((p: Platform) => {
    setPlatform(p)
    setOutput(null)
  }, [])

  const handleGenerate = useCallback(() => {
    setIsGenerating(true)
    setTimeout(() => {
      const result = generate(platform, inputs[platform])
      setOutput(result)
      setIsGenerating(false)
    }, 800)
  }, [platform, inputs])

  const handleInputChange = useCallback((newInputs: PlatformInputs) => {
    setInputs(prev => ({ ...prev, [platform]: newInputs }))
  }, [platform])

  const handleRegenerate = useCallback((variant: 'direct' | 'executive' | 'contrarian' | 'shorter' | 'specific') => {
    if (!output) return
    setIsGenerating(true)
    setTimeout(() => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const result = applyRegenerateVariant(output as any, variant, inputs[platform] as any) as unknown as GeneratedOutput
      setOutput(result)
      setIsGenerating(false)
    }, 600)
  }, [output, inputs, platform])

  const handleTransform = useCallback((targetPlatform: Platform) => {
    if (!output) return
    setIsGenerating(true)
    setTimeout(() => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const result = transformToPlatform(platform, targetPlatform, output as any, inputs[platform] as any) as unknown as GeneratedOutput
      setPlatform(targetPlatform)
      setOutput(result)
      setIsGenerating(false)
    }, 800)
  }, [output, platform, inputs])

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-[#1B2A4A] border-b border-[#243659]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-white text-xs" style={{ backgroundColor: BRAND_COLOR }}>
                FB
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-white font-extrabold text-lg tracking-tight">{COMPANY.name}</span>
                  <span className="font-semibold text-lg" style={{ color: BRAND_COLOR }}>Metal Fabrication</span>
                </div>
                <p className="text-slate-400 text-xs leading-none hidden sm:block">{COMPANY.tagline}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="rounded-lg px-3 py-1.5" style={{ backgroundColor: `${BRAND_COLOR}18`, border: `1px solid ${BRAND_COLOR}4D` }}>
              <span className="text-xs font-semibold tracking-wide uppercase" style={{ color: BRAND_COLOR }}>Content Engine</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-5">
        <PlatformSelector selected={platform} onChange={handlePlatformChange} />
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 items-start">
          <div className="lg:col-span-2">
            <InputPanel
              platform={platform}
              inputs={inputs[platform]}
              onChange={handleInputChange}
              onGenerate={handleGenerate}
              isGenerating={isGenerating}
              problemLabels={PROBLEM_LABELS}
              targetAudiences={TARGET_AUDIENCES}
              contentAngles={CONTENT_ANGLES}
              objectives={OBJECTIVES}
            />
          </div>
          <div className="lg:col-span-3">
            <OutputPanel
              output={output}
              platform={platform}
              onRegenerate={handleRegenerate}
              onTransform={handleTransform}
              isGenerating={isGenerating}
            />
          </div>
        </div>
      </main>

      <footer className="border-t border-slate-200 mt-8 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs text-slate-400 text-center">
            {COMPANY.name} — Content Engine — {COMPANY.website} — All content generated from structured templates. No API required.
          </p>
        </div>
      </footer>
    </div>
  )
}
