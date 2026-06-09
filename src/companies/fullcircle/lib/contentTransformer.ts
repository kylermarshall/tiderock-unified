import type { Platform, GeneratedOutput, PlatformInputs } from '../types'
import { generateLinkedIn } from '../platforms/linkedin'
import { generateYouTube } from '../platforms/youtube'
import { generateTwitter } from '../platforms/twitter'
import { generateInstagram } from '../platforms/instagram'
import { generateFacebook } from '../platforms/facebook'

export function transformToPlatform(
  _sourcePlatform: Platform,
  targetPlatform: Platform,
  currentOutput: GeneratedOutput,
  currentInputs: PlatformInputs,
): GeneratedOutput {
  const baseInputs = {
    targetAudience: currentInputs.targetAudience,
    problem: currentInputs.problem,
    angle: currentInputs.angle,
    tone: currentInputs.tone,
    objective: currentInputs.objective,
  }

  switch (targetPlatform) {
    case 'linkedin':
      return generateLinkedIn({ ...baseInputs, contentFormat: 'post' } as Parameters<typeof generateLinkedIn>[0], 1)
    case 'youtube':
      return generateYouTube({ ...baseInputs, videoFormat: '60-90s' } as Parameters<typeof generateYouTube>[0], 1)
    case 'twitter':
      return generateTwitter({ ...baseInputs, postFormat: 'thread' } as Parameters<typeof generateTwitter>[0], 1)
    case 'instagram':
      return generateInstagram({ ...baseInputs, contentFormat: 'carousel', visualStyle: 'Clean Corporate' } as Parameters<typeof generateInstagram>[0], 1)
    case 'facebook':
      return generateFacebook({ ...baseInputs, contentFormat: 'educational' } as Parameters<typeof generateFacebook>[0], 1)
    default:
      return currentOutput
  }
}

export function applyRegenerateVariant(
  output: GeneratedOutput,
  variant: 'direct' | 'executive' | 'contrarian' | 'shorter' | 'specific',
  inputs: PlatformInputs,
): GeneratedOutput {
  const seedMap: Record<typeof variant, number> = { direct: 1, executive: 2, contrarian: 3, shorter: 4, specific: 5 }
  const seed = seedMap[variant]

  switch (output.platform) {
    case 'linkedin':
      return generateLinkedIn(inputs as Parameters<typeof generateLinkedIn>[0], seed)
    case 'youtube':
      return generateYouTube(inputs as Parameters<typeof generateYouTube>[0], seed)
    case 'twitter':
      return generateTwitter(inputs as Parameters<typeof generateTwitter>[0], seed)
    case 'instagram':
      return generateInstagram(inputs as Parameters<typeof generateInstagram>[0], seed)
    case 'facebook':
      return generateFacebook(inputs as Parameters<typeof generateFacebook>[0], seed)
    default:
      return output
  }
}
