import {
  ContentAngle,
  FacebookFormat,
  FacebookFormInputs,
  FacebookGeneratedContent,
  FacebookObjective,
  RegenerateVariant,
  Tone,
} from '../types'
import { calculateScore } from './scoring'

const pick = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)]
const shuffle = <T,>(arr: T[]): T[] => {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// ─── Short post ───────────────────────────────────────────────────────────────

function getShortPost(
  audience: string,
  painPoint: string,
  angle: ContentAngle,
  _tone: Tone,
  variant?: RegenerateVariant
): string[] {
  const a = audience
  const p = painPoint

  if (variant === 'more-contrarian')
    return [
      `Unpopular opinion: ${p} keeps recurring because of how it's being managed — not because of volume.`,
      `Most ${a} add more staff or faster tools when ${p} becomes a problem.`,
      `But if the process is broken, more capacity just scales the cost.`,
      `The fix isn't more. It's better process design and clearer ownership.`,
      `Has this been your experience? Drop a comment below.`,
    ]

  if (variant === 'more-executive')
    return [
      `For ${a} managing at scale: ${p} is a financial problem before it becomes visible as an ops problem.`,
      `By the time it surfaces as a cost spike, it's been accumulating for months — usually across multiple cost centers.`,
      `The earlier you build visibility into the ${p} system, the lower the cost of correction.`,
      `What does your current ${p} cost picture look like?`,
    ]

  const posts: Record<ContentAngle, string[]> = {
    'hidden-cost-leak': [
      `If returns keep getting delayed, the problem usually isn't the warehouse team. It's the system around them.`,
      `Most ${a} who deal with ${p} regularly are managing the event — not the system that keeps producing it.`,
      `The real cost is rarely on one report. It's distributed across labor, carrier fees, delays, and inventory holds.`,
      `When you map the full picture, it's usually 2–3× what the budget shows.`,
      `What does your ${p} process cost per unit? Drop a number in the comments if you track it.`,
    ],
    'common-operational-mistake': [
      `The most common ${p} mistake I see: treating it as an exception rather than a pattern.`,
      `Exceptions get handled by whoever is available, using whatever works in the moment.`,
      `That approach works fine at low volume. It gets expensive fast when you scale.`,
      `The fix: document ${p} as a repeatable process with standardized responses for each exception type.`,
      `One good process design eliminates the need for constant problem-solving.`,
      `Has your team made this shift? What changed when you did?`,
    ],
    'contrarian-take': [
      `Hot take: ${p} isn't a capacity problem. It's a visibility problem.`,
      `Most ${a} who struggle with ${p} can tell me what happened. They can't tell me why it keeps happening.`,
      `The difference: one is an event response. The other is process ownership.`,
      `Visibility into the full ${p} system — every touchpoint, every handoff — is what makes the difference.`,
      `Agree or disagree? Tell me in the comments.`,
    ],
    'system-failure': [
      `When ${p} breaks, it doesn't break in isolation.`,
      `Downstream delays, inventory mismatches, manual workarounds — and by the time the full damage is visible, it's weeks old.`,
      `Most ${a} discover the real cost at quarter-end. By then, the root cause is buried under layers of compensating behavior.`,
      `The fix isn't faster firefighting. It's real-time visibility so you catch Stage 2 before it becomes Stage 5.`,
      `Has your team dealt with this cascade before?`,
    ],
    'before-after-improvement': [
      `Before fixing ${p}: four manual touchpoints, inconsistent outcomes, rising costs, no baseline.`,
      `After: one standardized process, clear ownership at every handoff, traceable errors.`,
      `The operation didn't change. The process did.`,
      `Processing time dropped. Costs stabilized. Margin recovery showed up within two quarters.`,
      `What's the one change that most improved your ${p} process? I'd like to hear real answers.`,
    ],
    'risk-warning': [
      `Quick check: when did you last formally audit your ${p} process?`,
      `If it's been more than 12 months, you likely have exposure you haven't quantified.`,
      `Carrier chargebacks, compliance gaps, inventory write-offs, vendor disputes — all linked to ${p}, all often managed by different teams.`,
      `The teams most at risk are those with the least shared visibility across those teams.`,
      `Worth a conversation with your operations lead this week.`,
    ],
    'buyer-education': [
      `If you manage ${p} and you're not tracking these three numbers, you're operating without a baseline:`,
      `1. Cost-per-unit processed`,
      `2. Cycle time by exception type (not just average)`,
      `3. First-contact resolution rate`,
      `Start with those. They'll surface the root cause faster than any other analysis.`,
      `What metric do you track that isn't on this list? Share below.`,
    ],
  }

  return posts[angle] ?? posts['hidden-cost-leak']
}

// ─── Educational post ─────────────────────────────────────────────────────────

function getEducationalPost(
  audience: string,
  painPoint: string,
  _angle: ContentAngle,
  _variant?: RegenerateVariant
): string[] {
  const a = audience
  const p = painPoint

  return [
    `If you're a ${a} dealing with ${p}, here's a practical breakdown of why it keeps costing more than it should — and what to do about it.`,
    ``,
    `THE REAL COST PICTURE`,
    `Most ${a} track ${p} as a single line item. The real cost is distributed:`,
    `— Labor: manual exception handling adds up fast, especially across shifts`,
    `— Carrier fees: delays and mis-routes generate fees that land in different budget owners' reports`,
    `— Downstream delays: one ${p} event can delay the next 2–3 steps in the workflow`,
    `— Inventory holds: items in limbo create carrying costs that don't appear as ${p} costs`,
    `— Customer and vendor impact: chargebacks, disputes, and relationship friction`,
    ``,
    `WHY IT KEEPS RECURRING`,
    `The most common root cause: ${p} is being managed as an event instead of a system.`,
    `Events get handled reactively. Systems get engineered.`,
    `When you treat ${p} as a recurring exception, you manage the outcome. When you treat it as a process, you manage the cause.`,
    ``,
    `WHAT THE FIX LOOKS LIKE`,
    `1. Map every touchpoint in the ${p} workflow — don't skip the informal handoffs`,
    `2. Assign ownership to roles, not individuals (so turnover doesn't create knowledge gaps)`,
    `3. Document exception types and standardize the response for each`,
    `4. Track cost-per-unit so you have a baseline for improvement`,
    `5. Build visibility across all teams that touch ${p}`,
    ``,
    `THE OUTCOME`,
    `Operations teams that redesign ${p} as a system — not a response — typically see measurable cost reduction within two to three quarters.`,
    ``,
    `Drop a comment with your biggest ${p} challenge. Happy to share what works.`,
  ]
}

// ─── Discussion prompt ────────────────────────────────────────────────────────

function getDiscussionPrompt(
  audience: string,
  painPoint: string,
  _angle: ContentAngle
): string[] {
  const a = audience
  const p = painPoint

  return pick([
    [
      `Question for ${a}:`,
      ``,
      `When your ${p} process breaks down — what's usually the root cause?`,
      ``,
      `From what I see across operations teams:`,
      `— 40% of the time: unclear ownership at a handoff point`,
      `— 30% of the time: an undocumented exception type that gets handled ad hoc`,
      `— 20% of the time: a vendor or carrier failure with no SLA accountability`,
      `— 10% of the time: a genuine capacity or volume problem`,
      ``,
      `Most ${a} I talk to assume it's the last one. It's usually one of the first three.`,
      ``,
      `What does it look like in your operation? Reply below — I'm curious whether this matches what others see.`,
    ],
    [
      `Honest question for ${a} who deal with ${p} regularly:`,
      ``,
      `Do you know your cost-per-unit for ${p} processing?`,
      ``,
      `In my experience, fewer than half of the operations teams I talk to have this number tracked.`,
      `Which means they're managing cost without a baseline.`,
      ``,
      `If you have the number: what changed when you started tracking it?`,
      `If you don't: what's the biggest barrier to establishing it?`,
      ``,
      `Real answers preferred. I'll share what I hear in a follow-up post.`,
    ],
    [
      `Something I've been thinking about:`,
      ``,
      `The ${a} who manage ${p} best tend to share one trait that has nothing to do with technology or headcount.`,
      ``,
      `They've stopped treating ${p} as an exception. They've built it as a process.`,
      ``,
      `Exceptions get handled. Processes get improved.`,
      ``,
      `When did your team make that shift — or are you still making it? Drop your honest answer below.`,
    ],
  ])
}

// ─── Business owner post ──────────────────────────────────────────────────────

function getBusinessOwnerPost(
  _audience: string,
  painPoint: string,
  _angle: ContentAngle,
  _tone: Tone,
  variant?: RegenerateVariant
): string[] {
  const p = painPoint

  if (variant === 'more-specific')
    return [
      `If your ${p} process involves more than three manual touchpoints per cycle, here's what that's likely costing you:`,
      ``,
      `Rough math: if each touchpoint takes 8–12 minutes of labor, and you process 500 units per week, that's 200–300 labor hours a week allocated to exception handling alone.`,
      `At $25/hr loaded cost: $5,000–$7,500/week. $260,000–$390,000/year.`,
      `Most of that cost doesn't appear as a ${p} line item. It's spread across payroll, overhead, and carrier charges.`,
      ``,
      `The fix isn't fewer people. It's fewer touchpoints — through better process design and clearer handoff ownership.`,
      ``,
      `If this math is relevant to your operation, I'd be glad to walk through it with you.`,
    ]

  return [
    `If you run a business that handles ${p}, this is probably a familiar situation:`,
    ``,
    `Your team is working hard. The ${p} process has been "fixed" more than once.`,
    `But it keeps costing more than it should — and you can't quite put your finger on why.`,
    ``,
    `Here's what I typically find when I look at operations in this situation:`,
    `The fix addressed the symptom, not the root cause.`,
    ``,
    `${p} recurring means one of three things:`,
    `1. Ownership breaks down at a specific handoff — everyone assumes someone else has it`,
    `2. The exception response isn't documented — different team members handle it differently`,
    `3. The cost isn't being tracked per unit — so there's no baseline to measure improvement against`,
    ``,
    `None of these require new technology to fix. They require process clarity.`,
    ``,
    `If this describes your operation, reach out. Happy to talk through it.`,
  ]
}

// ─── Retargeting post ─────────────────────────────────────────────────────────

function getRetargetingPost(
  audience: string,
  painPoint: string,
  _angle: ContentAngle
): string[] {
  const a = audience
  const p = painPoint

  return [
    `If ${p} has been on your mind — here's something worth considering before the quarter ends.`,
    ``,
    `The cost of ${p} isn't static. It compounds with volume.`,
    `A process that's "good enough" at 200 units per week becomes a material cost problem at 500.`,
    ``,
    `The operations teams that address this early have a measurable advantage:`,
    `— They build the cost baseline before volume increases`,
    `— They standardize the process before it breaks at scale`,
    `— They recover margin in Q2 instead of discovering exposure in Q4`,
    ``,
    `The ${a} who wait until ${p} becomes a crisis pay a premium for the same fix.`,
    ``,
    `If you've been thinking about this, it's worth a conversation now rather than later.`,
    `Reach out or visit premierss.com to start the conversation.`,
  ]
}

// ─── Practical takeaway ───────────────────────────────────────────────────────

function getPracticalTakeaway(painPoint: string): string {
  const p = painPoint
  return pick([
    `Track ${p} cost-per-unit. Without that baseline, you can't measure improvement — and you're managing cost without data.`,
    `Map every touchpoint in your ${p} workflow before trying to optimize it. You can't improve what you haven't fully documented.`,
    `Assign ${p} ownership to a role, not a person. When ownership is tied to an individual, turnover creates recurring process gaps.`,
    `Separate ${p} exceptions by type and build a documented response for each. The improvised response is what makes costs unpredictable.`,
    `Build cross-functional visibility into your ${p} process. The teams most exposed to ${p} risk are those with the least shared reporting.`,
  ])
}

// ─── Discussion question ──────────────────────────────────────────────────────

function getDiscussionQuestion(audience: string, painPoint: string): string {
  const a = audience
  const p = painPoint
  return pick([
    `What's the root cause of ${p} issues in your operation — process ownership, lack of documentation, or something else?`,
    `Do you track ${p} cost-per-unit? If so, what changed when you started measuring it?`,
    `Has your team made the shift from managing ${p} reactively to managing it as a documented process? What triggered that change?`,
    `What's the one thing you wish you'd known about ${p} management before your current scale?`,
    `${a}: what does your ${p} process look like today — and what would you change first if you could?`,
  ])
}

// ─── CTA ──────────────────────────────────────────────────────────────────────

function getFacebookCTA(
  _format: FacebookFormat,
  _tone: Tone,
  objective: FacebookObjective
): string {
  const ctas: Record<FacebookObjective, string[]> = {
    reach: [
      'Share this with a business owner or operations leader who deals with this.',
      'Tag someone managing this problem right now.',
    ],
    engagement: [
      'Drop your experience in the comments.',
      'Reply with your answer — I read every comment.',
    ],
    leads: [
      'If this describes your operation, reach out or visit premierss.com.',
      'Message us if you want to walk through how this applies to your specific situation.',
    ],
    retarget: [
      'Visit premierss.com to see how Premier LogiTech helps operations teams solve this.',
      'If the timing is right, reach out — we can start with a conversation.',
    ],
  }
  return pick(ctas[objective])
}

// ─── Repurposing ──────────────────────────────────────────────────────────────

function getRepurposingSuggestions(format: FacebookFormat): string[] {
  const base = [
    `LinkedIn: adapt the opening paragraph as a LinkedIn hook — tighten the language and remove the conversational framing`,
    `Twitter: extract the core insight as a single post or the numbered points as a thread`,
  ]
  const byFormat: Record<FacebookFormat, string[]> = {
    'short-post': [
      `Instagram caption: use the opening line as the caption hook — it works in both formats`,
      `Email: expand the post into a short email with the same structure`,
    ],
    'educational-post': [
      `Blog post: the educational structure maps directly — each section becomes a heading`,
      `YouTube outline: the cost breakdown and fix sections are a strong long-form video structure`,
    ],
    'discussion-prompt': [
      `LinkedIn poll: turn the question into a LinkedIn poll with 4 answer options`,
      `Email survey: use the question as a one-question email survey to your list`,
    ],
    'business-owner-post': [
      `YouTube short: the relatable scenario and fix map well to a 60-second video format`,
      `Instagram reel: the "if this is you" framing works as a hook for a talking-head reel`,
    ],
    'retargeting-post': [
      `Email retargeting: use the same structure for a follow-up email to leads who haven't responded`,
      `LinkedIn retargeting: adapt for a LinkedIn post targeting decision-makers who've seen prior content`,
    ],
  }
  return [...base, ...byFormat[format]]
}

// ─── Main generator ───────────────────────────────────────────────────────────

export function generateFacebookContent(
  inputs: FacebookFormInputs,
  variant?: RegenerateVariant
): FacebookGeneratedContent {
  const audience = inputs.targetReader.trim() || 'operations leaders'
  const painPoint = inputs.mainPainPoint.trim() || 'reverse logistics inefficiency'
  const { contentFormat: format, contentAngle: angle, tone, objective } = inputs

  let primaryPost: string[]

  if (format === 'short-post') {
    primaryPost = shuffle(getShortPost(audience, painPoint, angle, tone, variant).map(p => p)).slice(0)
  } else if (format === 'educational-post') {
    primaryPost = getEducationalPost(audience, painPoint, angle, variant)
  } else if (format === 'discussion-prompt') {
    primaryPost = getDiscussionPrompt(audience, painPoint, angle)
  } else if (format === 'business-owner-post') {
    primaryPost = getBusinessOwnerPost(audience, painPoint, angle, tone, variant)
  } else {
    primaryPost = getRetargetingPost(audience, painPoint, angle)
  }

  const qualityScore = calculateScore({ audience, painPoint, angle })

  return {
    format,
    primaryPost,
    practicalTakeaway: getPracticalTakeaway(painPoint),
    cta: getFacebookCTA(format, tone, objective),
    discussionQuestion: getDiscussionQuestion(audience, painPoint),
    repurposingSuggestions: getRepurposingSuggestions(format),
    qualityScore,
  }
}
