import { useState } from 'react'
import type { Platform, GeneratedOutput, PlatformInputs, RegenerateVariant } from './types'
import { InputPanel } from './components/InputPanel'
import { OutputPanel } from './components/OutputPanel'
import { PlatformSelector } from './components/PlatformSelector'
import { generateLinkedIn } from './platforms/linkedin'
import { generateYouTube } from './platforms/youtube'
import { generateTwitter } from './platforms/twitter'
import { generateInstagram } from './platforms/instagram'
import { generateFacebook } from './platforms/facebook'
import { transformToPlatform, applyRegenerateVariant } from './lib/contentTransformer'

const DEFAULT_INPUTS: PlatformInputs = {
  targetAudience: 'Operations Directors',
  problem: 'injection-molding-defects',
  angle: 'Process parameter drift is the root cause most plants ignore',
  tone: 'direct',
  objective: 'Drive awareness of PMT process engineering support',
  contentFormat: 'post',
} as PlatformInputs

function getDefaultInputs(platform: Platform, base: PlatformInputs): PlatformInputs {
  const shared = {
    targetAudience: base.targetAudience,
    problem: base.problem,
    angle: base.angle,
    tone: base.tone,
    objective: base.objective,
  }
  switch (platform) {
    case 'linkedin': return { ...shared, contentFormat: 'post' } as PlatformInputs
    case 'youtube': return { ...shared, videoFormat: '60-90s' } as PlatformInputs
    case 'twitter': return { ...shared, postFormat: 'thread' } as PlatformInputs
    case 'instagram': return { ...shared, contentFormat: 'reel', visualStyle: 'Industrial' } as PlatformInputs
    case 'facebook': return { ...shared, contentFormat: 'educational' } as PlatformInputs
  }
}

function generateForPlatform(platform: Platform, inputs: PlatformInputs, seed: number): GeneratedOutput {
  switch (platform) {
    case 'linkedin': return generateLinkedIn(inputs as Parameters<typeof generateLinkedIn>[0], seed)
    case 'youtube': return generateYouTube(inputs as Parameters<typeof generateYouTube>[0], seed)
    case 'twitter': return generateTwitter(inputs as Parameters<typeof generateTwitter>[0], seed)
    case 'instagram': return generateInstagram(inputs as Parameters<typeof generateInstagram>[0], seed)
    case 'facebook': return generateFacebook(inputs as Parameters<typeof generateFacebook>[0], seed)
  }
}

export default function App() {
  const [platform, setPlatform] = useState<Platform>('linkedin')
  const [inputs, setInputs] = useState<PlatformInputs>(DEFAULT_INPUTS)
  const [output, setOutput] = useState<GeneratedOutput | null>(null)
  const [seed, setSeed] = useState(0)

  function handleGenerate() {
    const result = generateForPlatform(platform, inputs, seed)
    setOutput(result)
  }

  function handlePlatformChange(newPlatform: Platform) {
    setPlatform(newPlatform)
    const newInputs = getDefaultInputs(newPlatform, inputs)
    setInputs(newInputs)
    setOutput(null)
  }

  function handleRegenerate(variant: RegenerateVariant) {
    if (!output) return
    const newSeed = seed + 1
    setSeed(newSeed)
    const result = applyRegenerateVariant(output, variant, inputs)
    setOutput(result)
  }

  function handleConvert(targetPlatform: Platform) {
    if (!output) return
    const result = transformToPlatform(platform, targetPlatform, output, inputs)
    const newInputs = getDefaultInputs(targetPlatform, inputs)
    setPlatform(targetPlatform)
    setInputs(newInputs)
    setOutput(result)
  }

  return (
    <div className="flex flex-col h-screen bg-pmt-dark text-white overflow-hidden">
      {/* Header */}
      <header className="flex-shrink-0 border-b border-pmt-steel/30 bg-pmt-charcoal/80 backdrop-blur-sm">
        <div className="flex items-center justify-between px-6 py-3.5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-pmt-blue flex items-center justify-center">
              <span className="text-xs font-bold text-white tracking-tight">PMT</span>
            </div>
            <div>
              <div className="text-sm font-bold text-white tracking-wide">PMT Content Engine</div>
              <div className="text-[10px] text-slate-500 leading-none">Plastic Molding Technology — plasticmolding.com</div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            <span>Template-based · No API</span>
          </div>
        </div>
      </header>

      {/* Platform Selector */}
      <div className="flex-shrink-0 px-6 py-3 border-b border-pmt-steel/20">
        <PlatformSelector active={platform} onChange={handlePlatformChange} onConvert={handleConvert} />
      </div>

      {/* Main layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Input Panel */}
        <div className="w-80 flex-shrink-0 border-r border-pmt-steel/30 flex flex-col bg-pmt-charcoal/30 overflow-hidden">
          <InputPanel
            platform={platform}
            inputs={inputs}
            onChange={setInputs}
            onGenerate={handleGenerate}
          />
        </div>

        {/* Output Panel */}
        <div className="flex-1 overflow-hidden flex flex-col">
          <OutputPanel
            output={output}
            inputs={inputs}
            onRegenerate={handleRegenerate}
            onConvert={handleConvert}
          />
        </div>
      </div>
    </div>
  )
}
