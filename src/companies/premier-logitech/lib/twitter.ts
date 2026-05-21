import {
  ContentAngle,
  RegenerateVariant,
  Tone,
  TwitterFormat,
  TwitterFormInputs,
  TwitterGeneratedContent,
  TwitterObjective,
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

// ─── Single post (≤280 chars) ─────────────────────────────────────────────────

function getSinglePost(
  audience: string,
  painPoint: string,
  angle: ContentAngle,
  _tone: Tone,
  variant?: RegenerateVariant
): string[] {
  const a = audience
  const p = painPoint

  if (variant === 'more-direct')
    return [
      `Your ${p} is leaking margin. Fix the process, not the symptom.`,
      `${p} isn't an ops problem. It's a cost problem in disguise.`,
      `Every ${p} exception handled manually is money your P&L doesn't track.`,
    ]
  if (variant === 'more-contrarian')
    return [
      `Unpopular take: fixing ${p} faster usually makes the real problem worse.`,
      `The ${p} advice everyone gives is wrong. Accuracy before speed.`,
      `Hot take: ${a} who outsource ${p} don't automatically reduce cost. Most increase it.`,
    ]
  if (variant === 'more-executive')
    return [
      `${p} is a board-level problem that's being managed at the ops level. That gap is expensive.`,
      `CFO note: the ${p} line item in your P&L is smaller than the actual cost. The gap is in indirect costs.`,
    ]
  if (variant === 'shorter')
    return [
      `${p} costs more than your budget shows.`,
      `Most ${a} solve ${p} wrong. Fix the handoff, not the event.`,
    ]
  if (variant === 'more-specific')
    return [
      `Most companies don't lose money on ${p} at the event. They lose it in the 5+ invisible handoffs before it's resolved.`,
      `The real cost of ${p}: labor time, carrier fees, inventory holds, downstream delays. Most teams only track two of those.`,
    ]

  const posts: Record<ContentAngle, string[]> = {
    'hidden-cost-leak': [
      `Most companies don't lose money on ${p} at the event. They lose it in the invisible handoffs before the item is processed.`,
      `${p} isn't one cost. It's five. And most ${a} are only tracking two of them.`,
      `The ${p} line in your budget is smaller than what it actually costs. The gap lives in labor, delays, and downstream errors.`,
    ],
    'common-operational-mistake': [
      `The most common ${p} mistake: treating it as an exception instead of a pattern. Exceptions get handled. Patterns get fixed.`,
      `${a} who manage ${p} reactively will always be behind. The fix is a documented process, not a faster response.`,
    ],
    'contrarian-take': [
      `Unpopular opinion: ${p} isn't an ops problem. It's a visibility problem. If you can't see it, you can't fix it.`,
      `Everyone tells ${a} to speed up ${p} processing. The ones actually reducing cost are slowing it down enough to make it auditable.`,
    ],
    'system-failure': [
      `When ${p} breaks, it doesn't break alone. Downstream delays, inventory mismatch, manual workarounds — and most ${a} find the damage weeks later.`,
      `Your ${p} system has a single point of failure. Most operations find it after it's already cost them.`,
    ],
    'before-after-improvement': [
      `${p}: Before: 4 manual touchpoints, inconsistent outcomes, mounting costs. After: 1 documented process, traceable errors, stable cost-per-unit.`,
    ],
    'risk-warning': [
      `If you haven't audited your ${p} process in 12 months, you have exposure you can't quantify. That's the problem.`,
      `${p} risk shows up in chargebacks, vendor disputes, and compliance gaps — often managed by different teams with no shared visibility.`,
    ],
    'buyer-education': [
      `${p} has 5 measurable cost components. Most ${a} are tracking 2. That gap is your unmanaged margin leakage.`,
    ],
  }

  return posts[angle] ?? posts['hidden-cost-leak']
}

// ─── Thread (5–8 posts) ───────────────────────────────────────────────────────

function getThread(
  audience: string,
  painPoint: string,
  angle: ContentAngle,
  _tone: Tone,
  variant?: RegenerateVariant
): string[] {
  const a = audience
  const p = painPoint

  const baseThreads: Record<ContentAngle, string[]> = {
    'hidden-cost-leak': [
      `Most ${a} think ${p} is a single line item. It isn't. It's a system — and it's leaking from 5 different places.\n\nThread 🧵`,
      `Cost #1: Labor time for manual exception handling.\nEvery ${p} event that isn't covered by a documented process gets handled ad hoc. That labor adds up.`,
      `Cost #2: Carrier and vendor fees from delays and mis-routes.\nThese show up as separate line items — often in different budget owners' reports.`,
      `Cost #3: Downstream delays that push into the next processing cycle.\nA single ${p} event can delay 3+ subsequent steps. Most teams don't track this chain.`,
      `Cost #4: Inventory holds and carrying costs.\n${p} creates inventory that sits in limbo. That's capital locked up with no movement.`,
      `Cost #5: Customer impact and relationship cost.\nDelayed resolution creates chargeback risk, return-to-sender costs, and retention exposure.`,
      `Most ${a} are actively managing 2 of those 5 costs. The other 3 are running on autopilot.\n\nThe fix: map the full system, not just the event.`,
      `If this describes your ${p} process, reach out. Premier LogiTech helps ${a} find and fix the cost leaks that don't show up on one report.`,
    ],
    'common-operational-mistake': [
      `The most expensive ${p} mistake isn't a one-time error. It's a structural pattern that repeats every cycle.\n\nHere's what it looks like 🧵`,
      `Mistake 1: Treating ${p} as an exception instead of a workflow.\nExceptions get handled reactively. Workflows get engineered. Reactive handling scales poorly.`,
      `Mistake 2: Assigning ownership to individuals, not processes.\nWhen a person owns ${p}, turnover creates institutional knowledge loss. When a process owns it, the system survives.`,
      `Mistake 3: Measuring volume instead of cost-per-unit.\nHigh ${p} volume with low visibility is not "under control." It's unmanaged at scale.`,
      `Mistake 4: Fixing symptoms instead of root causes.\nPatching the end state of ${p} doesn't prevent the trigger. Root cause analysis adds one step but eliminates recurrence.`,
      `Mistake 5: No escalation path for exceptions to the exceptions.\nEvery process has edge cases. Without a documented path, edge cases create new informal processes.`,
      `Most ${a} fix mistake #1 and call it done. Mistakes 2–5 keep compounding.\n\nThe full fix requires redesigning ${p} as a system, not just a response.`,
      `Forward this to your ops team lead. Then let's talk.`,
    ],
    'contrarian-take': [
      `Hot take: ${a} who focus on processing ${p} faster are solving the wrong problem.\n\nHere's the case for doing the opposite 🧵`,
      `The conventional wisdom: reduce ${p} cycle time. Faster = better. Get it through the system quickly.`,
      `The problem with that: speed without accuracy creates faster failures.\nYou're compressing the time between errors, not eliminating them.`,
      `What actually matters: auditability at every handoff.\nIf you can't trace what happened to a ${p} item at each stage, you can't identify where errors enter.`,
      `The counterintuitive move: slow the process down enough to make it fully visible.\nAdd checkpoints. Require documentation. Measure exception rates, not just throughput.`,
      `Once you have visibility, you can optimize for speed without losing accuracy.\nSpeed built on a visible process scales. Speed built on hope doesn't.`,
      `The ${a} I've seen recover the most margin from ${p} are the ones who spent 60 days making it auditable before they made it faster.`,
      `Disagree? Tell me where I'm wrong.`,
    ],
    'system-failure': [
      `${p} failures don't happen in isolation. They cascade — and by the time you see the damage, it's already three systems deep.\n\nHow the cascade works 🧵`,
      `Stage 1: The triggering event.\n${p} fails at one touchpoint. Could be a vendor delay, a handling error, a system gap. Looks small.`,
      `Stage 2: Downstream delay.\nThe item or process is now out of the normal flow. Other items queued behind it are now delayed.`,
      `Stage 3: Manual workaround.\nSomeone improvises a fix. The fix works — but it bypasses the standard process and creates a new informal path.`,
      `Stage 4: The workaround becomes a habit.\nTeam members learn the informal path. The formal process becomes theoretical. No one updates the documentation.`,
      `Stage 5: Invisible cost accumulation.\nThe workaround costs more per unit than the standard process. But it never shows up as a ${p} cost because it's labeled something else.`,
      `Stage 6: Discovery — usually at quarter-end.\nThe cost spike surfaces. By now, the root cause is weeks old and buried under compensating behavior.`,
      `The fix is not faster firefighting. It's process redesign with real-time visibility so Stage 2 triggers an alert instead of a workaround.`,
    ],
    'before-after-improvement': [
      `Before and after: what fixing ${p} actually looks like for ${a}. Not in theory — in practice.\n\nThread 🧵`,
      `BEFORE:\n— ${p} handled by whoever was available\n— No documented process for exceptions\n— 4+ manual touchpoints per cycle\n— Cost-per-unit unknown`,
      `BEFORE (continued):\n— Errors traceable only after the fact\n— Vendor disputes resolved case by case\n— Processing time: unpredictable\n— Team capacity: consumed by ad hoc responses`,
      `The intervention:\n— Process mapping: every touchpoint documented\n— Ownership assigned to roles, not individuals\n— Exception handling standardized by type\n— Tracking implemented at 3 key handoffs`,
      `AFTER (quarter 1):\n— Processing time reduced by ~30%\n— Error rate traceable for first time\n— Vendor accountability measurable\n— Cost-per-unit baseline established`,
      `AFTER (quarter 2–3):\n— Cost-per-unit trending down\n— Exceptions handled by documented path, not improvisation\n— Team capacity freed for higher-value work\n— Margin recovery visible in P&L`,
      `The operation didn't change. The ${p} process did.\n\nThat's the only lever that moved the numbers.`,
      `If your ${p} process looks like the "before" — the path to the "after" is more documented than complicated.`,
    ],
    'risk-warning': [
      `The ${p} risk your operation is carrying right now: probably larger than you know, and compounding quietly.\n\nBreakdown 🧵`,
      `Risk category 1: Carrier and vendor chargebacks.\n${p} errors create chargeback exposure. If you're not tracking resolution rates by vendor, you can't manage this.`,
      `Risk category 2: Compliance gaps.\nAudit trails for ${p} are often incomplete. Missing documentation creates regulatory exposure that surfaces during reviews.`,
      `Risk category 3: Inventory shrinkage and write-offs.\n${p} items that aren't resolved within SLA windows often end up written off. Most teams don't know the rate.`,
      `Risk category 4: Customer chargeback rate.\n${p} delays directly increase customer chargebacks. These are often managed by a different team than the one handling ${p}.`,
      `Risk category 5: Vendor relationship deterioration.\nRepeated ${p} failures without resolution documentation erodes vendor trust and renegotiation leverage.`,
      `None of these risks require a catastrophic event to cost you money. They compound through normal volume.`,
      `The ${a} most exposed are those with the least cross-functional visibility. If you don't have a unified view of ${p} cost and risk, you're carrying more exposure than you know.`,
    ],
    'buyer-education': [
      `If you manage ${p} and you're not tracking these 5 metrics, you're flying blind.\n\nA practical thread for ${a} 🧵`,
      `Metric 1: Cost-per-unit processed.\nThe baseline metric. Without it, you can't measure improvement or benchmark against peers.`,
      `Metric 2: Cycle time by exception type.\nNot average cycle time — broken down by exception. Different exceptions have different root causes.`,
      `Metric 3: First-contact resolution rate.\nWhat percentage of ${p} events are resolved without escalation? Low rates indicate process gaps.`,
      `Metric 4: Vendor/carrier attribution rate.\nWhat percentage of ${p} failures are attributable to external partners? This drives SLA and contract conversations.`,
      `Metric 5: Downstream impact rate.\nHow often does a ${p} event create a delay or error in the next step? This is the multiplier on your base cost.`,
      `Most ${a} who inherit a ${p} problem don't have any of these metrics established. Start with #1 and #3 — they'll surface the others.`,
      `Save this thread. Share it with your team lead or analyst. The data collection is the first step.`,
    ],
  }

  if (variant === 'shorter') {
    // Return a condensed 5-post version
    const full = baseThreads[angle] ?? baseThreads['hidden-cost-leak']
    return [full[0], full[1], full[2], full[full.length - 2], full[full.length - 1]]
  }

  return baseThreads[angle] ?? baseThreads['hidden-cost-leak']
}

// ─── Founder-style ────────────────────────────────────────────────────────────

function getFounderStyle(
  audience: string,
  painPoint: string,
  _angle: ContentAngle,
  variant?: RegenerateVariant
): string[] {
  const a = audience
  const p = painPoint

  if (variant === 'more-executive')
    return [
      `I was on a call with a COO last week.`,
      `They'd been managing ${p} for three years.`,
      `They had a team, a process, and a vendor.`,
      `But they had no idea what it was actually costing them per unit.`,
      `The ops team was busy. The CFO was frustrated. No one had the full picture.`,
      `When we mapped the real cost across all five components, the number was almost double what they'd budgeted.`,
      `The problem wasn't execution. It was visibility.`,
      `What does your ${p} cost you — really?`,
    ]

  return [
    `I was talking to a ${a} last week about ${p}.`,
    `They'd been dealing with it for over a year.`,
    `Multiple process fixes. Multiple team conversations.`,
    `Still recurring every quarter.`,
    `The pattern I see across most ${a} operations with recurring ${p} problems:`,
    `The issue isn't effort. It's that the root cause is one level deeper than where the fix is being applied.`,
    `You can optimize the event response indefinitely. The problem will come back.`,
    `Fix the handoff. Fix the ownership. Fix the tracking.`,
    `The event stops being a recurring cost when you stop managing it as an event.`,
    `What does your ${p} root cause actually look like?`,
  ]
}

// ─── Contrarian take ──────────────────────────────────────────────────────────

function getContrarianTake(
  audience: string,
  painPoint: string,
  variant?: RegenerateVariant
): string[] {
  const a = audience
  const p = painPoint

  return [
    variant === 'more-direct'
      ? `${p} is not where most ${a} think it is. Here's the actual problem.`
      : `Hot take: the way most ${a} approach ${p} guarantees it stays expensive.`,
    `The standard playbook: faster processing, more staff, better technology.`,
    `Here's what that misses:`,
    `${p} is almost never a capacity problem. It's a process ownership problem.`,
    `When you add capacity to a broken process, you scale the cost, not the fix.`,
    `The ${a} I see recovering real margin from ${p} aren't the ones with the most resources.`,
    `They're the ones who spent 30 days mapping exactly where accountability breaks down.`,
    `That's it. That's the edge.`,
    `Disagree?`,
  ]
}

// ─── Quote-post style ─────────────────────────────────────────────────────────

function getQuotePost(
  audience: string,
  painPoint: string,
  _angle: ContentAngle
): string[] {
  const a = audience
  const p = painPoint

  return pick([
    [
      `[Responding to the common take: "${p} is an inevitable cost of doing business"]`,
      ``,
      `It's not inevitable. It's unmanaged.`,
      `There's a difference.`,
      `"Inevitable" is what you say when you don't have a process.`,
      `"Managed" is what you get when you own the root cause, not just the response.`,
      `${a} who've fixed ${p} permanently didn't accept it as inevitable.`,
      `They treated it as an engineering problem with a measurable solution.`,
    ],
    [
      `[Responding to: "We've tried to fix ${p} before — it always comes back"]`,
      ``,
      `It came back because the fix addressed the symptom, not the system.`,
      `${p} recurs when:`,
      `— Ownership is assigned to a person, not a process`,
      `— Exception handling isn't documented`,
      `— Cost-per-unit isn't tracked`,
      `Fix the system. The event stops recurring.`,
    ],
  ])
}

// ─── Alternate hook ───────────────────────────────────────────────────────────

function getAlternateHook(
  audience: string,
  painPoint: string,
  _angle: ContentAngle,
  variant?: RegenerateVariant
): string {
  const a = audience
  const p = painPoint

  const hooks = shuffle([
    `${p} isn't one problem. It's five — and most ${a} are managing the cheapest one.`,
    `The ${p} problem and the ${p} cost problem are not the same thing.`,
    `What if the reason ${p} keeps recurring has nothing to do with execution?`,
    `${a} who've permanently fixed ${p} share one trait: they stopped treating it as an event.`,
    `The most expensive part of ${p} never shows up on the invoice.`,
    variant === 'more-contrarian'
      ? `The ${p} fix everyone recommends is the reason it keeps coming back.`
      : `${p}: the gap between what it looks like it costs and what it actually costs is where margin goes.`,
  ])

  return hooks[0]
}

// ─── CTA ──────────────────────────────────────────────────────────────────────

function getTwitterCTA(
  _format: TwitterFormat,
  _tone: Tone,
  objective: TwitterObjective
): string {
  const ctas: Record<TwitterObjective, string[]> = {
    awareness: [
      'Follow for more supply chain and operations content.',
      'Repost if this matches what you see in your operation.',
    ],
    engagement: [
      'What does your current process look like? Reply below.',
      "Drop a comment — I'd like to know how your operation handles this.",
    ],
    leads: [
      'DM me if this is your current situation.',
      'Reach out if you want to walk through how this applies to your operation.',
    ],
    authority: [
      'Follow for more operator-level content on supply chain and reverse logistics.',
      'Save this thread for your next operations review.',
    ],
  }
  return pick(ctas[objective])
}

// ─── Engagement question ──────────────────────────────────────────────────────

function getEngagementQuestion(audience: string, painPoint: string): string {
  const a = audience
  const p = painPoint
  return pick([
    `What does your current ${p} process actually cost per unit? Most teams don't know.`,
    `Where in your ${p} workflow does accountability break down? Reply with the stage.`,
    `${a}: how many manual touchpoints does your ${p} process have? I'll tell you what the benchmark is.`,
    `What's the one change that most improved your ${p} process? Looking for real answers, not theory.`,
    `If you fixed one thing about your ${p} system tomorrow, what would it be?`,
  ])
}

// ─── Repurposing ──────────────────────────────────────────────────────────────

function getRepurposingSuggestions(format: TwitterFormat): string[] {
  const base = [
    'LinkedIn post: expand the opening post into a full LinkedIn post with more context and a structured CTA',
    'YouTube Short: use the core hook and insight as a 30-second talking-head script',
    'Instagram carousel: each thread post becomes one slide — hook on slide 1, insight on each subsequent slide',
  ]
  const byFormat: Record<TwitterFormat, string[]> = {
    'single-post': [
      'LinkedIn: expand into a 5-paragraph LinkedIn post with the single post as the hook',
      'Instagram caption: use as the first line of an Instagram caption followed by more context',
    ],
    thread: [
      'Blog post: each thread post becomes a section — add 2–3 sentences per section',
      'Email: the thread structure maps cleanly to an educational email with subheadings',
    ],
    'contrarian-take': [
      'YouTube: script a 60-second video using the same tension and reframe structure',
      'Facebook: adapt into a discussion post with the contrarian take as the opener',
    ],
    'founder-style': [
      'LinkedIn story post: use the same personal framing with slightly longer paragraphs',
      'Facebook business owner post: the personal narrative translates directly to Facebook format',
    ],
    'quote-post': [
      'LinkedIn response post: find a common belief on LinkedIn and respond with the same reframe',
      'Facebook discussion prompt: use the reframe as a discussion opener',
    ],
  }
  return [...base.slice(0, 2), ...byFormat[format]]
}

// ─── Main generator ───────────────────────────────────────────────────────────

export function generateTwitterContent(
  inputs: TwitterFormInputs,
  variant?: RegenerateVariant
): TwitterGeneratedContent {
  const audience = inputs.targetAudience.trim() || 'operations leaders'
  const painPoint = inputs.mainPainPoint.trim() || 'reverse logistics inefficiency'
  const { postFormat: format, contentAngle: angle, tone, objective } = inputs

  let posts: string[]

  if (format === 'single-post') {
    posts = shuffle(getSinglePost(audience, painPoint, angle, tone, variant)).slice(0, 1)
  } else if (format === 'thread') {
    posts = getThread(audience, painPoint, angle, tone, variant)
  } else if (format === 'contrarian-take') {
    posts = getContrarianTake(audience, painPoint, variant)
  } else if (format === 'founder-style') {
    posts = getFounderStyle(audience, painPoint, angle, variant)
  } else {
    posts = getQuotePost(audience, painPoint, angle)
  }

  const qualityScore = calculateScore({ audience, painPoint, angle })

  return {
    format,
    posts,
    alternateHook: getAlternateHook(audience, painPoint, angle, variant),
    cta: getTwitterCTA(format, tone, objective),
    engagementQuestion: getEngagementQuestion(audience, painPoint),
    repurposingSuggestions: getRepurposingSuggestions(format),
    qualityScore,
  }
}
