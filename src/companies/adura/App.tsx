import { useState, useCallback } from 'react'
import type {
  Platform, PlatformInputs, GeneratedOutput,
  LinkedInInputs, YouTubeInputs, TwitterInputs, InstagramInputs, FacebookInputs
} from './types'
import { PlatformSelector } from './components/PlatformSelector'
import { InputPanel } from './components/InputPanel'
import { OutputPanel } from './components/OutputPanel'
import { generateLinkedIn } from './platforms/linkedin'
import { generateYouTube } from './platforms/youtube'
import { generateTwitter } from './platforms/twitter'
import { generateInstagram } from './platforms/instagram'
import { generateFacebook } from './platforms/facebook'
import { applyRegenerateVariant, transformToPlatform } from './lib/contentTransformer'

const DEFAULT_INPUTS: Record<Platform, PlatformInputs> = {
  linkedin: {
    targetAudience: 'Facility Managers',
    problem: 'energy-cost',
    angle: 'Financial Impact',
    tone: 'professional',
    objective: 'Build Authority',
    contentFormat: 'post',
  } as LinkedInInputs,
  youtube: {
    targetAudience: 'Operations Directors',
    problem: 'downtime',
    angle: 'Operational Risk',
    tone: 'direct',
    objective: 'Drive Website Traffic',
    videoFormat: '60-90s',
  } as YouTubeInputs,
  twitter: {
    targetAudience: 'Facility Managers',
    problem: 'total-cost-ownership',
    angle: 'Contrarian Take',
    tone: 'contrarian',
    objective: 'Start Conversations',
    postFormat: 'thread',
  } as TwitterInputs,
  instagram: {
    targetAudience: 'Warehouse Managers',
    problem: 'warehouse-visibility',
    angle: 'Hidden Cost Exposure',
    tone: 'direct',
    objective: 'Build Authority',
    contentFormat: 'carousel',
    visualStyle: 'Clean Corporate',
  } as InstagramInputs,
  facebook: {
    targetAudience: 'Plant Managers',
    problem: 'maintenance-costs',
    angle: 'Industry Benchmark',
    tone: 'educational',
    objective: 'Educate Audience',
    contentFormat: 'educational',
  } as FacebookInputs,
}

function generate(platform: Platform, inputs: PlatformInputs, seed = 0): GeneratedOutput {
  switch (platform) {
    case 'linkedin': return generateLinkedIn(inputs as LinkedInInputs, seed)
    case 'youtube': return generateYouTube(inputs as YouTubeInputs, seed)
    case 'twitter': return generateTwitter(inputs as TwitterInputs, seed)
    case 'instagram': return generateInstagram(inputs as InstagramInputs, seed)
    case 'facebook': return generateFacebook(inputs as FacebookInputs, seed)
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
      const result = applyRegenerateVariant(output, variant, inputs[platform])
      setOutput(result)
      setIsGenerating(false)
    }, 600)
  }, [output, inputs, platform])

  const handleTransform = useCallback((targetPlatform: Platform) => {
    if (!output) return
    setIsGenerating(true)
    setTimeout(() => {
      const result = transformToPlatform(platform, targetPlatform, output, inputs[platform])
      setPlatform(targetPlatform)
      setOutput(result)
      setIsGenerating(false)
    }, 800)
  }, [output, platform, inputs])

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-[#1B2A4A] border-b border-[#243659]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#0EA5E9] rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                </svg>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-white font-extrabold text-lg tracking-tight">ADURA</span>
                  <span className="text-[#0EA5E9] font-semibold text-lg">LED Solutions</span>
                </div>
                <p className="text-slate-400 text-xs leading-none hidden sm:block">
                  Reduce lighting-related operating costs. Improve facility reliability.
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-[#0EA5E9]/10 border border-[#0EA5E9]/30 rounded-lg px-3 py-1.5">
              <span className="text-[#0EA5E9] text-xs font-semibold tracking-wide uppercase">Content Engine</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-5">
        {/* Platform Selector */}
        <PlatformSelector selected={platform} onChange={handlePlatformChange} />

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 items-start">
          {/* Input Panel — 2/5 */}
          <div className="lg:col-span-2">
            <InputPanel
              platform={platform}
              inputs={inputs[platform]}
              onChange={handleInputChange}
              onGenerate={handleGenerate}
              isGenerating={isGenerating}
            />
          </div>

          {/* Output Panel — 3/5 */}
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

      {/* Footer */}
      <footer className="border-t border-slate-200 mt-8 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs text-slate-400 text-center">
            Adura LED Solutions — Content Engine — All content generated from structured templates. No API required.
          </p>
        </div>
      </footer>
    </div>
  )
}
