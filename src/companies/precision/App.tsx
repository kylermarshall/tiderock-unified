import { useState } from 'react'
import {
  Platform,
  ProblemType,
  LinkedInInputs,
  YouTubeInputs,
  TwitterInputs,
  InstagramInputs,
  FacebookInputs,
  PlatformInputs,
  GeneratedOutput,
} from './types'
import { generateLinkedIn } from './platforms/linkedin'
import { generateYouTube } from './platforms/youtube'
import { generateTwitter } from './platforms/twitter'
import { generateInstagram } from './platforms/instagram'
import { generateFacebook } from './platforms/facebook'
import { transformToPlatform, applyRegenerateVariant } from './lib/contentTransformer'
import PlatformSelector from './components/PlatformSelector'
import InputPanel from './components/InputPanel'
import OutputPanel from './components/OutputPanel'

const DEFAULT_PROBLEM: ProblemType = 'machining-bottlenecks'
const DEFAULT_AUDIENCE = 'Operations Directors'
const DEFAULT_TONE = 'professional'
const DEFAULT_ANGLE = 'Financial Impact'
const DEFAULT_OBJECTIVE = 'Build Authority'

function makeDefaultInputs(platform: Platform): PlatformInputs {
  const base = {
    problem: DEFAULT_PROBLEM,
    targetAudience: DEFAULT_AUDIENCE,
    tone: DEFAULT_TONE as 'professional',
    angle: DEFAULT_ANGLE,
    objective: DEFAULT_OBJECTIVE,
  }
  switch (platform) {
    case 'linkedin': return { ...base, contentFormat: 'post' } as LinkedInInputs
    case 'youtube': return { ...base, videoFormat: 'long-form' } as YouTubeInputs
    case 'twitter': return { ...base, postFormat: 'single' } as TwitterInputs
    case 'instagram': return { ...base, contentFormat: 'reel', visualStyle: 'Industrial' } as InstagramInputs
    case 'facebook': return { ...base, contentFormat: 'short' } as FacebookInputs
  }
}

function generate(platform: Platform, inputs: PlatformInputs, seed: number): GeneratedOutput {
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
  const [inputs, setInputs] = useState<PlatformInputs>(makeDefaultInputs('linkedin'))
  const [output, setOutput] = useState<GeneratedOutput | null>(null)
  const [seed, setSeed] = useState(0)

  const handlePlatformChange = (p: Platform) => {
    const prev = inputs as unknown as Record<string, unknown>
    const newInputs = makeDefaultInputs(p)
    setPlatform(p)
    setInputs({
      ...newInputs,
      problem: prev.problem as ProblemType,
      targetAudience: prev.targetAudience as string,
      tone: prev.tone as 'professional',
    } as PlatformInputs)
    setOutput(null)
  }

  const handleGenerate = () => {
    const newSeed = seed + 1
    setSeed(newSeed)
    setOutput(generate(platform, inputs, newSeed))
  }

  const handleRegenerate = (variant: string) => {
    if (!output) return
    setOutput(applyRegenerateVariant(output, variant as 'direct' | 'executive' | 'contrarian' | 'shorter' | 'specific', inputs))
  }

  const handleTransformTo = (target: Platform) => {
    if (!output) return
    const transformed = transformToPlatform(platform, target, output, inputs)
    const prev = inputs as unknown as Record<string, unknown>
    setPlatform(target)
    setInputs({
      ...makeDefaultInputs(target),
      problem: prev.problem as ProblemType,
      targetAudience: prev.targetAudience as string,
      tone: prev.tone as 'professional',
    } as PlatformInputs)
    setOutput(transformed)
  }

  return (
    <div className="min-h-screen bg-pam-dark text-white">
      {/* Header */}
      <header className="border-b border-pam-border bg-pam-charcoal px-6 py-4">
        <div className="max-w-screen-xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-pam-accent rounded flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <h1 className="text-sm font-bold text-white tracking-widest uppercase">Precision Advanced Manufacturing</h1>
              <p className="text-xs text-gray-400">Content Engine</p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-xs text-gray-500">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block"></span>
            <span>Precision Machining · h2ojet.com</span>
          </div>
        </div>
      </header>

      {/* Platform Tabs */}
      <div className="border-b border-pam-border bg-pam-charcoal px-6 py-3">
        <div className="max-w-screen-xl mx-auto">
          <PlatformSelector selected={platform} onChange={handlePlatformChange} />
        </div>
      </div>

      {/* Main Layout */}
      <main className="max-w-screen-xl mx-auto px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-6 items-start">

          {/* Left — Inputs */}
          <div className="sticky top-6">
            <div className="bg-pam-charcoal border border-pam-border rounded-lg p-5">
              <h2 className="text-sm font-semibold text-white mb-1">Content Settings</h2>
              <p className="text-xs text-gray-500 mb-4">Configure your target audience, problem, and format — then generate.</p>
              <InputPanel
                platform={platform}
                inputs={inputs}
                onChange={setInputs}
                onGenerate={handleGenerate}
              />
            </div>

            {/* Positioning reminder */}
            <div className="mt-4 bg-pam-charcoal border border-pam-border rounded-lg p-4">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Company Positioning</p>
              <p className="text-xs text-gray-400 leading-relaxed">
                Precision Advanced Manufacturing helps manufacturers reduce production inefficiencies, improve machining accuracy, and prevent costly downstream failures.
              </p>
            </div>
          </div>

          {/* Right — Output */}
          <div>
            <OutputPanel
              platform={platform}
              output={output}
              onRegenerate={handleRegenerate}
              onTransformTo={handleTransformTo}
            />
          </div>

        </div>
      </main>
    </div>
  )
}
