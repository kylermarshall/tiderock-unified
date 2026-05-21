import {
  ContentAngle,
  RegenerateVariant,
  Tone,
  VideoObjective,
  YouTubeFormat,
  YouTubeFormInputs,
  YouTubeGeneratedContent,
} from '../types'
import { calculateScore } from './scoring'

const shuffle = <T,>(arr: T[]): T[] => {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}
const pick = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)]

// ─── Titles ───────────────────────────────────────────────────────────────────

function getTitles(
  format: YouTubeFormat,
  audience: string,
  painPoint: string,
  angle: ContentAngle,
  variant?: RegenerateVariant
): string[] {
  const p = painPoint
  const a = audience

  const variantTitles: Partial<Record<RegenerateVariant, string[]>> = {
    'more-direct': [
      `Fix Your ${p} Problem Now`,
      `${p}: The Real Fix`,
      `Stop Losing Money to ${p}`,
    ],
    'more-executive': [
      `The CFO Case for Fixing ${p}`,
      `What ${p} Costs at the Executive Level`,
      `${p} Is a Board-Level Problem — Here's Why`,
    ],
    'more-contrarian': [
      `Why Fixing ${p} Faster Makes It Worse`,
      `The ${p} Advice Everyone Gets Wrong`,
      `Why ${a} Are Solving ${p} Backward`,
    ],
    shorter: [`${p}: The Real Cost`, `The ${p} Problem`, `Fix ${p}`],
    'more-specific': [
      `The 7 Hidden Costs Inside Your ${p} Process`,
      `How ${a} Lose 5% of Revenue to ${p}`,
      `The 3 Root Causes of ${p} No One Talks About`,
    ],
  }

  if (variant && variantTitles[variant]) return variantTitles[variant]!

  const byAngle: Record<ContentAngle, string[]> = {
    'hidden-cost-leak': [
      `The Hidden Cost Inside Every ${p} Workflow`,
      `Why ${p} Costs 3× More Than Your Budget Shows`,
      `${p} Is Leaking Margin — Here's Where`,
      `The Real Price Tag on ${p} (It's Not What You Think)`,
    ],
    'common-operational-mistake': [
      `The Biggest Mistake ${a} Make with ${p}`,
      `Why ${p} Keeps Breaking (And How to Stop It)`,
      `The ${p} Fix That Makes Everything Worse`,
      `What ${a} Get Wrong About ${p}`,
    ],
    'contrarian-take': [
      `The ${p} Advice That's Costing You Money`,
      `Why Faster ${p} Processing Is the Wrong Goal`,
      `Everyone Is Solving ${p} Wrong`,
      `The Counterintuitive Fix for ${p}`,
    ],
    'system-failure': [
      `When ${p} Fails — The Full Cascade`,
      `Your ${p} System Is Already Broken`,
      `The Single Point of Failure in Your ${p} Process`,
      `${p} Failure: What Happens Next`,
    ],
    'before-after-improvement': [
      `Before and After: Fixing ${p}`,
      `What a Fixed ${p} Process Actually Looks Like`,
      `How ${a} Cut Costs by Fixing ${p}`,
      `The ${p} Transformation — Real Results`,
    ],
    'risk-warning': [
      `The ${p} Risk ${a} Keep Ignoring`,
      `3 Signs Your ${p} Is About to Become a Crisis`,
      `${p} Is a Growing Liability — Here's the Evidence`,
      `The Compliance Risk Hidden in Your ${p} Process`,
    ],
    'buyer-education': [
      `${p} Explained for ${a}`,
      `What Every ${a} Needs to Know About ${p}`,
      `${p}: The Complete Breakdown`,
      `The ${a}'s Guide to Understanding ${p}`,
    ],
  }

  const formatBonusTitles: Record<YouTubeFormat, string[]> = {
    shorts: [
      `${p} Is Costing You More Than You Know`,
      `The ${p} Problem in 60 Seconds`,
    ],
    '60-90-seconds': [
      `Everything Wrong with Your ${p} Process`,
      `The Root Cause of ${p} (Explained Fast)`,
    ],
    'long-form-outline': [
      `The Complete Guide to Fixing ${p} for ${a}`,
      `${p} Deep Dive: Costs, Causes, and Fixes`,
    ],
    'title-thumbnail-package': [
      `${p}: Title and Thumbnail Options`,
      `Packaging Your ${p} Story for Maximum Click-Through`,
    ],
  }

  return [...(byAngle[angle] ?? []), ...(formatBonusTitles[format] ?? [])]
}

// ─── Thumbnail text ───────────────────────────────────────────────────────────

function getThumbnailOptions(painPoint: string, variant?: RegenerateVariant): string[] {
  const p = painPoint.toUpperCase()

  if (variant === 'shorter') return [`${p} EXPLAINED`, 'THE REAL COST']
  if (variant === 'more-contrarian') return [`EVERYONE IS WRONG ABOUT ${p}`, 'STOP DOING THIS']
  if (variant === 'more-executive') return [`THE BOARD DOESN'T KNOW THIS`, `${p} = MARGIN LOSS`]

  return [
    `THE HIDDEN COST OF ${p}`,
    `YOU'RE LOSING MONEY HERE`,
    `${p}: THE REAL NUMBER`,
    `MOST ${p.split(' ')[0]} TEAMS GET THIS WRONG`,
    `THE COST LEAK IN YOUR OPERATIONS`,
    `WHAT YOUR P&L ISN'T SHOWING`,
  ]
}

// ─── 3-second hooks ───────────────────────────────────────────────────────────

function getThreeSecondHooks(
  audience: string,
  painPoint: string,
  angle: ContentAngle,
  variant?: RegenerateVariant
): string[] {
  const a = audience
  const p = painPoint

  if (variant === 'more-direct')
    return [
      `${p} is costing your operation money right now.`,
      `You have a ${p} problem. Here's how to fix it.`,
      `Most ${a} handle ${p} the wrong way. Here's the right way.`,
    ]
  if (variant === 'more-executive')
    return [
      `${p} is a P&L problem disguised as an ops problem.`,
      `The CFO case for fixing ${p} is stronger than you think.`,
    ]
  if (variant === 'more-contrarian')
    return [
      `Everything you've been told about ${p} is wrong.`,
      `The reason your ${p} fix isn't working: you're solving the wrong problem.`,
    ]

  const hooks: Record<ContentAngle, string[]> = {
    'hidden-cost-leak': [
      `Most ${a} have no idea how much ${p} is actually costing them.`,
      `${p} isn't one cost. It's five — and you're probably only tracking two.`,
      `The real bill for ${p} never shows up on one line item.`,
    ],
    'common-operational-mistake': [
      `The most expensive ${p} mistake happens before anyone notices it.`,
      `There's a mistake inside your ${p} process that's costing you every single cycle.`,
      `Most ${a} handle ${p} the same wrong way. Here's what's happening.`,
    ],
    'contrarian-take': [
      `Everyone is focused on the wrong part of ${p}.`,
      `Fixing ${p} faster is not the answer — and here's the proof.`,
      `The standard advice on ${p} is costing operations teams real money.`,
    ],
    'system-failure': [
      `When ${p} breaks, it doesn't break alone — three systems fail with it.`,
      `Your ${p} system has a single point of failure. I'll show you where.`,
      `Most ${a} don't know their ${p} process is already broken.`,
    ],
    'before-after-improvement': [
      `Before: ${p} was unpredictable and expensive. After: it runs clean.`,
      `This is what a fixed ${p} process actually looks like.`,
      `The before and after on ${p} — in numbers.`,
    ],
    'risk-warning': [
      `${p} doesn't look dangerous until it's already a financial problem.`,
      `There's a liability inside your ${p} workflow that no one has assessed.`,
      `${p} risk compounds quietly. Most ${a} find out too late.`,
    ],
    'buyer-education': [
      `If you manage ${p}, there are three numbers you should be tracking — and probably aren't.`,
      `${p} is one of the most misunderstood costs in operations. Let me explain it.`,
      `Most ${a} who inherit a ${p} problem also inherit the wrong mental model for it.`,
    ],
  }

  return hooks[angle] ?? hooks['hidden-cost-leak']
}

// ─── Opening lines ────────────────────────────────────────────────────────────

function getOpeningLines(
  audience: string,
  painPoint: string,
  _angle: ContentAngle,
  tone: Tone,
  variant?: RegenerateVariant
): string[] {
  const a = audience
  const p = painPoint

  const toneOpener: Record<Tone, string> = {
    direct: `Here's what nobody tells you about ${p}:`,
    'insider-operator': `I've seen this pattern across dozens of ${a} operations:`,
    contrarian: `The conventional wisdom on ${p} is almost entirely backward. Here's why:`,
    educational: `To understand why ${p} costs so much, you need to understand how it actually works:`,
    executive: `For ${a} managing at scale, ${p} is both an operational and a financial problem:`,
  }

  if (variant === 'more-direct')
    return [`${p} costs more than your team tracks. Here's what's actually on the bill:`, toneOpener.direct]
  if (variant === 'more-executive')
    return [
      `The business case for fixing ${p} is straightforward when you understand the full cost picture:`,
      toneOpener.executive,
    ]
  if (variant === 'more-contrarian')
    return [
      `Before we get into ${p}, I want to challenge one assumption most ${a} carry into this conversation:`,
      toneOpener.contrarian,
    ]

  return [
    toneOpener[tone],
    `If you've been dealing with ${p} for more than one quarter, you already know the surface-level problem.`,
    `The ${a} I work with who handle ${p} well have one thing in common — they stopped treating it as an exception.`,
    `${p} is one of those operational problems that looks like it's being managed until it isn't.`,
  ]
}

// ─── Scripts / Outlines ───────────────────────────────────────────────────────

function getScript(
  format: YouTubeFormat,
  audience: string,
  painPoint: string,
  angle: ContentAngle,
  tone: Tone,
  _variant?: RegenerateVariant
): string[] {
  const a = audience
  const p = painPoint

  const toneTag: Record<Tone, string> = {
    direct: 'Let me be direct:',
    'insider-operator': 'From what I see in the field:',
    contrarian: "Here's what most people miss:",
    educational: "Here's how this typically works:",
    executive: 'Here is the business context:',
  }

  if (format === 'shorts') {
    const shortsTemplates: Record<ContentAngle, string[]> = {
      'hidden-cost-leak': [
        `${toneTag[tone]}`,
        `${a} see ${p} as a line item. It isn't.`,
        `It's distributed across labor time, carrier errors, handling mistakes, and downstream delays.`,
        `Each piece looks small. Together, they're a 3–7% margin drain.`,
        `The fix: stop managing the event. Start auditing the system.`,
        `Track cost-per-unit. Map every handoff. Hold vendors to SLAs.`,
        `The teams that do this once don't have to do it again.`,
      ],
      'common-operational-mistake': [
        `${toneTag[tone]}`,
        `Most ${a} treat ${p} as an exception. That's the mistake.`,
        `Exceptions get handled reactively — case by case, team by team.`,
        `Works fine at low volume. Falls apart when you scale.`,
        `The smarter approach: document ${p} as a repeatable process.`,
        `Map every touchpoint. Find where errors enter. Standardize the response.`,
        `One good process design eliminates the need for constant firefighting.`,
      ],
      'contrarian-take': [
        `${toneTag[tone]}`,
        `The standard advice on ${p}? Move faster.`,
        `That's wrong.`,
        `Speed without accuracy just creates faster failures.`,
        `The real constraint is auditability, not throughput.`,
        `Slow down enough to document. Then speed back up.`,
        `Speed follows process. Not the other way around.`,
      ],
      'system-failure': [
        `${toneTag[tone]}`,
        `${p} failures don't stay contained.`,
        `One break → downstream delays → inventory mismatch → manual workarounds.`,
        `Those workarounds become habits. Habits become permanent costs.`,
        `Most ${a} find the damage weeks after the initial failure.`,
        `Root cause: missing process ownership and real-time visibility.`,
        `Fix the system. Not just the symptom.`,
      ],
      'before-after-improvement': [
        `Before: ${p} was inconsistent. Multiple teams, multiple methods, unpredictable results.`,
        `Errors accumulated. Processing time stretched. Costs climbed.`,
        `After: one standardized process. Clear ownership. Documented exceptions.`,
        `Processing time dropped. Errors became traceable.`,
        `Cost per unit stabilized within two quarters.`,
        `The operation didn't change. The process did.`,
        `That's the only lever that matters.`,
      ],
      'risk-warning': [
        `${toneTag[tone]}`,
        `${p} carries more risk than most ${a} formally track.`,
        `It surfaces in chargebacks, vendor disputes, and compliance audits.`,
        `Each is a separate cost center. Most have no shared visibility.`,
        `That's what makes ${p} dangerous — it doesn't look critical until it is.`,
        `The most exposed operations are those with the least cross-functional tracking.`,
        `If you can't see the full picture, you can't manage the exposure.`,
      ],
      'buyer-education': [
        `${toneTag[tone]}`,
        `${p} is one of the most misunderstood cost drivers in logistics.`,
        `Most ${a} know it's a problem. Few know what it actually costs.`,
        `The components: labor, carrier fees, handling errors, processing time, downstream delays.`,
        `All measurable. Most unmeasured.`,
        `Start with data: cost-per-unit, cycle time, error rate.`,
        `Once you have the data, the path forward becomes obvious.`,
      ],
    }
    return shortsTemplates[angle] ?? shortsTemplates['hidden-cost-leak']
  }

  if (format === '60-90-seconds') {
    return [
      `[HOOK] ${pick(getThreeSecondHooks(a, p, angle))}`,
      ``,
      `[SETUP] Here's the pattern I see across ${a} operations:`,
      `${p} gets treated as an isolated event — something that happens, gets handled, and gets forgotten.`,
      `But it's not an event. It's a system. And the system is leaking.`,
      ``,
      `[COST] The components most teams miss:`,
      `— Labor time for manual rework and exception handling`,
      `— Carrier fees for delays and mis-routes`,
      `— Downstream delays that push into the next cycle`,
      `— Inventory holds that create invisible carrying costs`,
      ``,
      `[INSIGHT] The operations that fix ${p} permanently don't just reduce frequency.`,
      `They redesign the process around documented handoffs and real-time tracking.`,
      ``,
      `[IMPACT] The result: 3–5 percentage points of margin recovered within two to three quarters.`,
      ``,
      `[CTA] Follow for more on operations efficiency and cost reduction.`,
    ]
  }

  if (format === 'long-form-outline') {
    return [
      `TITLE: ${pick(getTitles(format, a, p, angle))}`,
      ``,
      `SECTION 0 — INTRO (0:00–0:45)`,
      `• Hook: ${pick(getThreeSecondHooks(a, p, angle))}`,
      `• What this video covers: the real cost of ${p}, why it keeps happening, and how to fix it`,
      `• Credibility: who this is for and why it matters for ${a}`,
      ``,
      `SECTION 1 — THE PROBLEM (0:45–3:30)`,
      `• What ${p} looks like on the surface vs. what's actually happening`,
      `• The three most common ways ${a} misdiagnose the root cause`,
      `• Why the standard fix doesn't work long-term`,
      ``,
      `SECTION 2 — THE COST (3:30–7:00)`,
      `• Direct costs: labor, carrier fees, processing time`,
      `• Indirect costs: delayed revenue, customer impact, vendor friction`,
      `• How the costs compound at scale (3–7% of operational spend)`,
      `• The line items that don't show up in a single report`,
      ``,
      `SECTION 3 — THE ROOT CAUSE (7:00–10:30)`,
      `• The real driver behind ${p} — usually process ownership, not execution`,
      `• The handoff failure model: where accountability breaks down`,
      `• Why volume makes the underlying problem worse`,
      ``,
      `SECTION 4 — THE FIX (10:30–13:30)`,
      `• Step 1: Map every touchpoint in the ${p} workflow`,
      `• Step 2: Identify where errors enter and accountability ends`,
      `• Step 3: Standardize the response for each exception type`,
      `• Step 4: Implement tracking at key handoffs`,
      ``,
      `SECTION 5 — BUSINESS IMPACT (13:30–15:00)`,
      `• What the numbers look like after a process redesign`,
      `• Timeline: two to three quarters for measurable margin recovery`,
      `• What ${a} who have done this say about the ROI`,
      ``,
      `OUTRO (15:00–16:00)`,
      `• Recap: cost, cause, fix`,
      `• CTA: follow for more, or reach out if this applies to your operation`,
    ]
  }

  // title-thumbnail-package
  const titles = shuffle(getTitles(format, a, p, angle)).slice(0, 3)
  const thumbs = shuffle(getThumbnailOptions(p)).slice(0, 3)
  return [
    `TITLE OPTIONS:`,
    `1. ${titles[0]}`,
    `2. ${titles[1]}`,
    `3. ${titles[2] ?? titles[0]}`,
    ``,
    `THUMBNAIL TEXT OPTIONS:`,
    `A. "${thumbs[0]}"`,
    `B. "${thumbs[1]}"`,
    `C. "${thumbs[2] ?? thumbs[0]}"`,
    ``,
    `THUMBNAIL VISUAL NOTES:`,
    `• Option A: Split graphic — "Before" (cluttered process) vs "After" (clean flow) with bold numbers`,
    `• Option B: Operator/warehouse visual with large text overlay showing cost or stat`,
    `• Option C: Graph showing cost trend line with annotation arrow pointing to intervention point`,
    ``,
    `A/B TEST RECOMMENDATION:`,
    `Test title #1 with thumbnail B first — the cost-focused framing typically drives higher CTR for ${a} audiences.`,
  ]
}

// ─── Retention beats ──────────────────────────────────────────────────────────

function getRetentionBeats(painPoint: string): string[] {
  const p = painPoint
  return shuffle([
    `"Here's the part that surprises most operations teams..."`,
    `"But there's a second cost most people never find."`,
    `"This is where it gets specific — stay with me."`,
    `"The number here is higher than you'd expect."`,
    `"Most people stop the analysis here. The real insight is one level deeper."`,
    `"This is the part that changes how you think about ${p} permanently."`,
    `"I've seen this exact pattern in operations across multiple industries — here's why it keeps repeating."`,
    `"Before I tell you the fix, I need to explain why the common fix doesn't work."`,
  ])
}

// ─── Business insight ─────────────────────────────────────────────────────────

function getBusinessInsight(audience: string, painPoint: string): string {
  const a = audience
  const p = painPoint
  return pick([
    `For ${a} at scale, unmanaged ${p} typically represents 3–7% of operational costs — costs that compound with volume. Teams that address this systematically report measurable margin recovery within two to three quarters.`,
    `The financial exposure from ${p} includes both direct costs (labor, handling, carrier fees) and indirect costs (delayed revenue, manual intervention, vendor friction). The indirect costs are often larger and harder to track.`,
    `${a} who treat ${p} as a strategic priority consistently outperform peers on cost efficiency and fulfillment accuracy. The operational advantage translates directly to margin.`,
    `When ${p} goes unaddressed, it creates compounding costs: higher error rates, increased labor requirements, slower cycle times, and elevated vendor friction. The ROI on fixing it typically pays back within one fiscal quarter.`,
  ])
}

// ─── CTA ──────────────────────────────────────────────────────────────────────

function getYouTubeCTA(
  _format: YouTubeFormat,
  _tone: Tone,
  objective: VideoObjective
): string {
  const ctas: Record<VideoObjective, string[]> = {
    educate: [
      'Subscribe for weekly content on supply chain operations and cost reduction.',
      'Follow for more on logistics efficiency and margin recovery.',
    ],
    'generate-leads': [
      'If this describes your operation, reach out — link in description.',
      'DM me or visit premierss.com if you want to walk through how this applies to you.',
    ],
    'build-awareness': [
      'Share this with an operations leader who needs to hear it.',
      'Subscribe and forward to someone managing this problem right now.',
    ],
    convert: [
      'Visit premierss.com to see how Premier LogiTech solves this for operations teams.',
      "If you're ready to fix this, the link in the description is where to start.",
    ],
  }
  return pick(ctas[objective])
}

// ─── Repurposing ──────────────────────────────────────────────────────────────

function getRepurposingSuggestions(format: YouTubeFormat, _painPoint: string): string[] {
  const base = [
    `LinkedIn post: use the 3-second hook as your opening line and the business insight as the closing paragraph`,
    `Twitter thread: extract the 5 main points from the script as individual posts`,
    `Instagram carousel: turn the script sections into 6–8 slides (one insight per slide)`,
    `Facebook educational post: expand the "cost" section into a standalone post with a discussion question`,
  ]

  const byFormat: Record<YouTubeFormat, string[]> = {
    shorts: [
      `LinkedIn short post: the script maps almost directly — adapt each line into a punchy LinkedIn sentence`,
      `Twitter single post: compress the hook and insight into one under-280-character post`,
    ],
    '60-90-seconds': [
      `Email newsletter section: the setup → cost → insight → fix structure works as a standalone segment`,
      `Sales deck slide: the cost breakdown section makes a strong "problem" slide`,
    ],
    'long-form-outline': [
      `Blog post: each section of the outline becomes a heading — fill in the bullets`,
      `Webinar outline: the structure maps directly to a 45-minute educational presentation`,
    ],
    'title-thumbnail-package': [
      `Social media A/B test: run title options as LinkedIn post variations to test click-through`,
      `Email subject line test: use thumbnail text options as subject line variants`,
    ],
  }

  return [...base.slice(0, 2), ...byFormat[format]]
}

// ─── Main generator ───────────────────────────────────────────────────────────

export function generateYouTubeContent(
  inputs: YouTubeFormInputs,
  variant?: RegenerateVariant
): YouTubeGeneratedContent {
  const audience = inputs.targetViewer.trim() || 'operations leaders'
  const painPoint = inputs.mainPainPoint.trim() || 'reverse logistics inefficiency'
  const { videoFormat: format, contentAngle: angle, tone, videoObjective: objective } = inputs

  const titles = shuffle(getTitles(format, audience, painPoint, angle, variant))
  const thumbs = shuffle(getThumbnailOptions(painPoint, variant))
  const hooks = shuffle(getThreeSecondHooks(audience, painPoint, angle, variant))
  const openers = shuffle(getOpeningLines(audience, painPoint, angle, tone, variant))

  const qualityScore = calculateScore({ audience, painPoint, angle })

  return {
    format,
    videoTitle: titles[0],
    thumbnailText: thumbs[0],
    threeSecondHook: hooks[0],
    openingLine: openers[0],
    scriptOrOutline: getScript(format, audience, painPoint, angle, tone, variant),
    retentionBeats: getRetentionBeats(painPoint).slice(0, 4),
    businessInsight: getBusinessInsight(audience, painPoint),
    cta: getYouTubeCTA(format, tone, objective),
    repurposingSuggestions: getRepurposingSuggestions(format, painPoint),
    qualityScore,
  }
}
