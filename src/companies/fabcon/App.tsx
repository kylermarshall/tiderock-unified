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

const DEFAULT_PROBLEM: ProblemType = 'fabrication-bottlenecks'
const DEFAULT_AUDIENCE = 'Operations Directors'
const DEFAULT_TONE = 'professional'
const DEFAULT_ANGLE = 'cost-impact'
const DEFAULT_OBJECTIVE = 'awareness'

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
    <div className="min-h-screen bg-fabcon-dark text-white">
      <header className="border-b border-fabcon-steel bg-fabcon-charcoal px-6 py-4">
        <div className="max-w-screen-xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-orange-500 rounded flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" />
              </svg>
            </div>
            <div>
              <h1 className="text-sm font-bold text-white tracking-widest uppercase">Fabcon</h1>
              <p className="text-xs text-gray-400">Content Engine</p>
            </div>
          </div>
          <span className="text-xs text-gray-500">Metal Fabrication &amp; Contract Manufacturing</span>
        </div>
      </header>

      <div className="border-b border-fabcon-steel bg-fabcon-charcoal px-6 py-3">
        <div className="max-w-screen-xl mx-auto">
          <PlatformSelector selected={platform} onChange={handlePlatformChange} />
        </div>
      </div>

      <main className="max-w-screen-xl mx-auto px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-6 items-start">
          <div className="sticky top-6">
            <div className="bg-fabcon-charcoal border border-fabcon-steel rounded-lg p-5">
              <h2 className="text-sm font-semibold text-white mb-4">Content Settings</h2>
              <InputPanel
                platform={platform}
                inputs={inputs}
                onChange={setInputs}
                onGenerate={handleGenerate}
              />
            </div>
          </div>

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
