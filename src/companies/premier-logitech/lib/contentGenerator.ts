import {
  ContentAngle,
  FormInputs,
  GeneratedContent,
  PostIdea,
  RankedIdea,
  FullPost,
  CalendarDay,
  QualityScore,
  Tone,
} from '../types'

const shuffle = <T,>(arr: T[]): T[] => {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

const pick = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)]

export const ANGLE_LABELS: Record<ContentAngle, string> = {
  'hidden-cost-leak': 'Hidden Cost Leak',
  'common-operational-mistake': 'Common Operational Mistake',
  'contrarian-take': 'Contrarian Take',
  'system-failure': 'System Failure',
  'before-after-improvement': 'Before/After Improvement',
  'risk-warning': 'Risk Warning',
  'buyer-education': 'Buyer Education',
}

const ALL_ANGLES: ContentAngle[] = [
  'hidden-cost-leak',
  'common-operational-mistake',
  'contrarian-take',
  'system-failure',
  'before-after-improvement',
  'risk-warning',
  'buyer-education',
]

function getHooks(angle: ContentAngle, audience: string, painPoint: string): string[] {
  const a = audience
  const p = painPoint

  const hooks: Record<ContentAngle, string[]> = {
    'hidden-cost-leak': [
      `Most ${a} don't see the full cost of ${p} until it's already embedded in operations.`,
      `${p} is leaking margin in ways that don't show up on a single report.`,
      `The real cost of ${p} is distributed across multiple line items. Most teams only find some of them.`,
      `Nobody budgets for what ${p} actually costs at scale. Here's what the real number looks like.`,
      `${p} is a cost problem disguised as a process problem. Most ${a} treat the wrong one.`,
      `If your team has normalized ${p}, you've also normalized the cost. That's the problem.`,
      `Three hidden cost centers inside your ${p} process — and how to find them.`,
      `The cost of ${p} isn't the event itself. It's the downstream chain it triggers.`,
      `Your ${p} cost isn't a fixed number. It compounds with every unaddressed process gap.`,
      `The line item for ${p} in your budget is smaller than the actual cost. Here's the gap.`,
      `${a} who audit their ${p} process find costs they didn't know they were carrying.`,
      `Every unresolved ${p} issue creates downstream cost events. Most go unmeasured.`,
    ],
    'common-operational-mistake': [
      `The most common mistake ${a} make with ${p}.`,
      `Why ${p} keeps happening despite multiple rounds of process improvement.`,
      `Most ${a} handle ${p} the same wrong way. Here's the pattern.`,
      `${p} is not the problem. The way it's being managed is.`,
      `The operational mistake hidden inside your ${p} workflow.`,
      `${a} who treat ${p} as an exception rather than a pattern pay a premium for it.`,
      `The ${p} fix that feels right but makes the problem worse.`,
      `Why ${p} problems are really accountability problems in disguise.`,
      `The process gap that turns a small ${p} issue into a recurring cost.`,
      `${a} who inherit a ${p} problem usually inherit the wrong fix with it.`,
      `Fixing ${p} without fixing the root cause just moves the failure point downstream.`,
      `The sequence that turns ${p} from a one-time issue into a systemic cost.`,
    ],
    'contrarian-take': [
      `Unpopular opinion: ${p} is not the real problem. The visibility gap is.`,
      `Everyone focuses on speed. The ${a} winning on ${p} focus on accuracy.`,
      `The conventional wisdom on ${p} is backward — and it's costing you.`,
      `Faster isn't better for ${p}. More auditable is.`,
      `${a} who outsource ${p} don't automatically reduce cost. Most increase it.`,
      `The best ${p} fix is not more technology. It's better process documentation.`,
      `Stop benchmarking your ${p} against industry averages. They're the wrong standard.`,
      `Most ${p} advice is written for companies twice your size. It doesn't apply here.`,
      `${p} is not a vendor problem. It's an internal handoff problem that vendors get blamed for.`,
      `The "efficiency gain" in your ${p} process may be masking a larger structural issue.`,
      `Every ${a} I talk to is solving ${p} wrong. Here's what actually works.`,
      `The reason ${p} never fully gets fixed: everyone optimizes for their team, not the outcome.`,
    ],
    'system-failure': [
      `When ${p} fails, it rarely fails alone. Three adjacent systems break with it.`,
      `Your ${p} process has a single point of failure. Most ${a} find it the hard way.`,
      `${p} failures accumulate quietly until they become visible as a larger problem.`,
      `When ${p} breaks, here's the downstream sequence that follows.`,
      `Most ${a} don't realize their ${p} system is already broken — they've adapted to it.`,
      `${p} failures rarely happen once. They repeat in cycles until the root cause is addressed.`,
      `A broken ${p} process doesn't stay contained. It spreads into adjacent operations.`,
      `The warning signs that your ${p} system is about to fail — and what to watch.`,
      `Why ${p} system failures cost far more than the initial estimate to fix.`,
      `The ${p} cascade: how a small failure creates a large operational disruption.`,
      `${a} who experience a ${p} failure once usually experience it again. Here's why.`,
      `How many ${p} near-misses happened before the actual failure? Most teams don't know.`,
    ],
    'before-after-improvement': [
      `Before: ${p} was unpredictable. After: it runs on a documented, measurable process.`,
      `What fixing ${p} actually looks like — not in theory, but in practice.`,
      `The difference between a broken ${p} process and one that scales.`,
      `Before: three teams, three processes, three outcomes for ${p}. After: one standard.`,
      `Same volume. Fixed ${p} process. The cost difference was material.`,
      `The ${p} improvement that changed the quarterly numbers.`,
      `Before: ${a} managed ${p} reactively. After: they manage it by exception.`,
      `What it looks like when ${a} solve ${p} instead of managing around it.`,
      `The before and after of a ${p} process redesign — measured in time, cost, and errors.`,
      `Before: ${p} required four manual touchpoints. After: one, with automated tracking.`,
      `The operation didn't change. The ${p} process did. Here's the impact.`,
      `Six months after fixing ${p}: lower costs, fewer errors, faster cycle times.`,
    ],
    'risk-warning': [
      `If you haven't audited your ${p} process in 12 months, you have unquantified exposure.`,
      `The ${p} risk that compounds quietly until it surfaces as a financial problem.`,
      `Ignoring ${p} is not a neutral choice. It's an accumulating liability.`,
      `${p} doesn't stay contained. Here's how it spreads to adjacent operations.`,
      `Three signs your ${p} problem is about to become a compliance problem.`,
      `The ${a} most exposed to ${p} risk are those with the least cross-functional visibility.`,
      `${p} risk shows up in audits, vendor disputes, and chargeback rates.`,
      `The quarter-end reconciliation problem that ${p} creates — and why it keeps returning.`,
      `${a} who treat ${p} as low-priority often discover it's high-cost at the wrong moment.`,
      `The liability inside your ${p} process that no one has formally assessed.`,
      `Why ${p} problems surface during high-volume periods — when they're hardest to fix.`,
      `The hidden compliance exposure created by an unaudited ${p} workflow.`,
    ],
    'buyer-education': [
      `What every ${a} should understand about ${p} before it becomes critical.`,
      `The ${p} metrics that matter — and the ones that mislead.`,
      `${p}: what it is, what it costs, and where most teams go wrong.`,
      `A practical framework for ${a} inheriting a ${p} problem.`,
      `The basics of ${p} that get skipped in most operations reviews.`,
      `How to measure ${p} accurately — and what to do with the data.`,
      `Three questions every ${a} should ask about their ${p} process.`,
      `${p} explained for ${a} who didn't build the process they're now managing.`,
      `What you need to know about ${p} to make a sound decision on it.`,
      `What high-performing ${p} management actually looks like for ${a}.`,
      `How to brief your leadership team on ${p} without losing the room.`,
      `The vocabulary of ${p} — and why getting it right matters in vendor conversations.`,
    ],
  }

  return hooks[angle]
}

function getWhyItMatters(painPoint: string, audience: string): string[] {
  return [
    `For ${audience}, ${painPoint} directly impacts operating margins, fulfillment speed, and retention. Left unaddressed, it compounds over time.`,
    `${painPoint} is not a one-time issue. It recurs at scale and erodes profitability on every cycle. The cumulative impact is significant.`,
    `The cost of ignoring ${painPoint} is distributed across handling time, labor hours, carrier errors, and downstream delays — rarely visible on one report.`,
    `${audience} who solve ${painPoint} early avoid costly reactive fixes. The gap between proactive and reactive is measured in margin.`,
    `${painPoint} touches procurement, finance, customer service, and the bottom line — not just the team that manages it day-to-day.`,
    `At scale, ${painPoint} represents a growing cost that compounds with volume. The earlier it's addressed, the lower the correction cost.`,
    `For decision-makers, ${painPoint} is a margin issue as much as an operational one. The two cannot be separated.`,
  ]
}

function getCTA(tone: Tone, _audience: string): string {
  const ctas: Record<Tone, string[]> = {
    direct: [
      `If this is your current situation, reach out.`,
      `Operations leaders dealing with this: let's talk.`,
      `If your team is managing this manually, it's time to fix it.`,
      `DM me if you want to walk through how to solve this.`,
    ],
    'insider-operator': [
      `Operators who've dealt with this — share your experience below.`,
      `If you've seen this in the field, you know exactly what I mean.`,
      `Tag a logistics leader who needs to read this.`,
      `Drop a comment if this matches what you're seeing.`,
    ],
    contrarian: [
      `Disagree? Tell me where I'm wrong in the comments.`,
      `Most people won't say this publicly. I'm saying it anyway.`,
      `If this makes you uncomfortable, it's probably relevant to your operation.`,
      `Push back if you've seen it play out differently.`,
    ],
    educational: [
      `Follow for weekly insights on supply chain operations and logistics efficiency.`,
      `Save this post for your next operations review.`,
      `Share with an operations leader dealing with this right now.`,
      `Follow for more content on supply chain and operations management.`,
    ],
    executive: [
      `CFOs and COOs: this warrants 15 minutes of your team's time.`,
      `Forward this to your operations team. It's a conversation worth having.`,
      `If you lead operations at scale, this deserves a closer look.`,
      `DM me if you want to understand how this applies to your organization.`,
    ],
  }
  return pick(ctas[tone])
}

function getBodyLines(
  painPoint: string,
  audience: string,
  angle: ContentAngle,
  tone: Tone
): string[] {
  const opener: Record<Tone, string> = {
    direct: `Here is what is happening:`,
    'insider-operator': `Here is what I see in the field:`,
    contrarian: `Here is what most teams miss:`,
    educational: `Here is how this typically works:`,
    executive: `Here is the business context:`,
  }

  const bodies: Record<ContentAngle, string[]> = {
    'hidden-cost-leak': [
      opener[tone],
      `${audience} typically see ${painPoint} as a line item — not a system.`,
      `But the real cost is distributed across handling time, labor hours, carrier errors, and downstream delays.`,
      `Each of those costs is manageable in isolation.`,
      `Together, they represent significant margin leakage.`,
      `The teams that get ahead of this don't just reduce ${painPoint} frequency. They redesign the process.`,
      `They track cost-per-unit. They audit handling touchpoints. They hold vendors accountable.`,
      `The ones who don't are paying the same invisible tax, quarter after quarter.`,
    ],
    'common-operational-mistake': [
      opener[tone],
      `Most ${audience} treat ${painPoint} as an exception rather than a pattern.`,
      `So it gets handled reactively — case by case, team by team.`,
      `That approach works until volume increases. Then it breaks.`,
      `The smarter move: treat ${painPoint} as a repeatable process problem with a documented fix.`,
      `Map the touchpoints. Identify where delays or errors enter. Standardize the response.`,
      `The teams that do this once rarely face the same failure at the same scale again.`,
    ],
    'contrarian-take': [
      opener[tone],
      `The standard advice on ${painPoint} focuses on speed. Move faster. Process more.`,
      `But speed is not the constraint. Accuracy and visibility are.`,
      `${audience} who optimize for throughput without addressing root-cause errors just fail faster.`,
      `The contrarian answer: slow down the process enough to make it auditable. Then speed it up.`,
      `Build in checkpoints. Require documentation at key handoffs. Measure exception rates, not just volume.`,
      `Speed follows accuracy. Not the other way around.`,
    ],
    'system-failure': [
      opener[tone],
      `${painPoint} failures don't happen in isolation. They cascade.`,
      `A breakdown at one point triggers downstream delays, inventory mismatches, and manual workarounds.`,
      `Those workarounds become habits. Habits become invisible costs.`,
      `Most ${audience} only discover the full damage during a quarterly review — weeks after the initial failure.`,
      `By then, the root cause is buried under layers of compensating behavior.`,
      `The fix is rarely technical. It's process redesign combined with real-time visibility.`,
    ],
    'before-after-improvement': [
      `Before:`,
      `${painPoint} was handled inconsistently. Different teams, different methods, different results.`,
      `Errors accumulated. Processing time stretched. Costs climbed.`,
      `After:`,
      `One standardized process. Clear ownership at each handoff. Documented exception handling.`,
      `Processing time dropped. Errors became traceable. Costs stabilized.`,
      `The operation didn't change. The ${painPoint} process did.`,
    ],
    'risk-warning': [
      opener[tone],
      `${painPoint} carries more risk than most ${audience} formally track.`,
      `It shows up in carrier chargebacks, vendor disputes, compliance gaps, and audit findings.`,
      `Each of those is a separate cost center — often managed by a different team with no shared visibility.`,
      `That's what makes ${painPoint} dangerous. It doesn't look critical until it is.`,
      `The operations teams most at risk are those with the least cross-functional visibility.`,
      `If you can't see the full cost picture, you can't manage the exposure.`,
    ],
    'buyer-education': [
      opener[tone],
      `${painPoint} is one of the most misunderstood cost drivers in logistics operations.`,
      `Most ${audience} know it exists. Few have a clear picture of what it actually costs.`,
      `The core components: labor, carrier fees, handling errors, processing time, and downstream delays.`,
      `Each one is measurable. Most aren't being measured.`,
      `Getting ahead of ${painPoint} starts with data — cost-per-unit, cycle time, error rate.`,
      `Once the data is in place, the improvement path becomes clear.`,
    ],
  }

  return bodies[angle]
}

function getBusinessImpact(painPoint: string, audience: string): string {
  const impacts = [
    `For operations at scale, unmanaged ${painPoint} typically represents 3–7% of operational costs. ${audience} who address this systematically report measurable margin recovery within two to three quarters.`,
    `The financial exposure from ${painPoint} includes direct costs (labor, handling, carrier fees) and indirect costs (delayed revenue, manual intervention). The indirect costs are often larger and harder to track.`,
    `${audience} who treat ${painPoint} as a strategic priority consistently outperform peers on cost efficiency and fulfillment accuracy. The operational advantage translates directly to margin.`,
    `When ${painPoint} goes unaddressed, it creates compounding costs: higher error rates, increased labor requirements, slower cycle times, and elevated vendor friction. The ROI on fixing it is typically significant and measurable within a single fiscal quarter.`,
  ]
  return pick(impacts)
}

function getCalendarTopics(painPoint: string, audience: string): string[] {
  return [
    `The real cost of ${painPoint} at scale`,
    `3 signs your ${painPoint} process is broken`,
    `What ${audience} get wrong about ${painPoint}`,
    `The hidden cost leak inside ${painPoint}`,
    `Before and after: fixing ${painPoint}`,
    `Why ${painPoint} is a margin problem`,
    `The ${painPoint} risk no one formally tracks`,
    `How to measure ${painPoint} accurately`,
    `The operational mistake in your ${painPoint} process`,
    `What fixing ${painPoint} actually looks like`,
    `${painPoint} and its downstream effects`,
    `The ${painPoint} metrics that matter`,
    `Why ${painPoint} gets worse at volume`,
    `The carrier cost hiding in your ${painPoint} process`,
    `How ${audience} are losing margin to ${painPoint}`,
    `The ${painPoint} problem your vendors won't flag`,
    `A better way to handle ${painPoint}`,
    `What the best ${audience} do differently with ${painPoint}`,
    `The compliance risk in your ${painPoint} workflow`,
    `${painPoint}: what it costs vs. what gets tracked`,
    `3 operational changes that reduce ${painPoint} immediately`,
    `The ${painPoint} audit most teams never run`,
    `When ${painPoint} becomes a customer retention problem`,
    `The labor cost buried inside ${painPoint}`,
    `How to build a ${painPoint} process that scales`,
    `The inventory impact of ${painPoint}`,
    `What your ${painPoint} data is actually telling you`,
    `${painPoint} and the quarter-end reconciliation problem`,
    `The operations leader's guide to ${painPoint}`,
    `How to fix ${painPoint} without disrupting current operations`,
  ]
}

// Angle scoring characteristics for ranked ideas
const ANGLE_SCORES: Record<
  ContentAngle,
  { clarity: number; financial: number; tension: number; relevance: number }
> = {
  'hidden-cost-leak':           { clarity: 9, financial: 10, tension: 8,  relevance: 9  },
  'common-operational-mistake': { clarity: 8, financial: 7,  tension: 7,  relevance: 8  },
  'contrarian-take':            { clarity: 7, financial: 6,  tension: 10, relevance: 7  },
  'system-failure':             { clarity: 8, financial: 8,  tension: 9,  relevance: 8  },
  'before-after-improvement':   { clarity: 9, financial: 8,  tension: 7,  relevance: 9  },
  'risk-warning':               { clarity: 7, financial: 9,  tension: 9,  relevance: 8  },
  'buyer-education':            { clarity: 10, financial: 6, tension: 5,  relevance: 7  },
}

export function generateContent(inputs: FormInputs): GeneratedContent {
  const audience = inputs.targetAudience.trim() || 'operations leaders'
  const painPoint = inputs.mainPainPoint.trim() || 'reverse logistics inefficiency'
  const { contentAngle, postType, tone } = inputs

  const qualityScore = calculateQualityScore({
    ...inputs,
    targetAudience: audience,
    mainPainPoint: painPoint,
  })

  if (postType === '10-post-ideas') {
    const hooks = shuffle(getHooks(contentAngle, audience, painPoint))
    const whys = getWhyItMatters(painPoint, audience)

    const postIdeas: PostIdea[] = hooks.slice(0, 10).map((hook, i) => ({
      id: i + 1,
      hook,
      angle: ANGLE_LABELS[contentAngle],
      whyItMatters: whys[i % whys.length],
      cta: getCTA(tone, audience),
    }))

    return { type: postType, postIdeas, qualityScore }
  }

  if (postType === 'ranked-ideas') {
    const whys = getWhyItMatters(painPoint, audience)
    const allIdeas: Omit<RankedIdea, 'id' | 'rank'>[] = []

    ALL_ANGLES.forEach((angle, ai) => {
      const hooks = shuffle(getHooks(angle, audience, painPoint))
      const base = ANGLE_SCORES[angle]

      hooks.slice(0, 2).forEach((hook, hi) => {
        const scores = {
          clarityOfPain: Math.min(10, base.clarity - hi),
          financialImpact: Math.min(10, base.financial - hi),
          tension: Math.min(10, base.tension - hi),
          relevanceToDecisionMakers: Math.min(10, base.relevance - hi),
        }
        allIdeas.push({
          hook,
          angle: ANGLE_LABELS[angle],
          whyItMatters: whys[(ai + hi) % whys.length],
          cta: getCTA(tone, audience),
          scores,
          totalScore:
            scores.clarityOfPain +
            scores.financialImpact +
            scores.tension +
            scores.relevanceToDecisionMakers,
        })
      })
    })

    const rankedIdeas: RankedIdea[] = allIdeas
      .sort((a, b) => b.totalScore - a.totalScore)
      .slice(0, 10)
      .map((idea, i) => ({ ...idea, id: i + 1, rank: i + 1 }))

    return { type: postType, rankedIdeas, qualityScore }
  }

  if (postType === 'full-post') {
    const hook = pick(getHooks(contentAngle, audience, painPoint))
    const body = getBodyLines(painPoint, audience, contentAngle, tone)
    const businessImpact = getBusinessImpact(painPoint, audience)

    const fullPost: FullPost = {
      hook,
      body,
      businessImpact,
      cta: 'Follow for more supply chain and operations insights.',
    }

    return { type: postType, fullPost, qualityScore }
  }

  // 30-day calendar
  const topics = getCalendarTopics(painPoint, audience)
  const calendar: CalendarDay[] = topics.map((topic, i) => {
    const angle = ALL_ANGLES[i % ALL_ANGLES.length]
    return {
      day: i + 1,
      postTopic: topic,
      hook: pick(getHooks(angle, audience, painPoint)),
      angle: ANGLE_LABELS[angle],
      cta: getCTA(tone, audience),
    }
  })

  return { type: postType, calendar, qualityScore }
}

function calculateQualityScore(inputs: FormInputs): QualityScore {
  const a = inputs.targetAudience.toLowerCase()
  const p = inputs.mainPainPoint.toLowerCase()
  const { contentAngle: angle } = inputs

  const genericTerms = [
    'solution', 'innovative', 'quality', 'seamless', 'world-class',
    'cutting-edge', 'synergy', 'leverage', 'robust', 'scalable', 'best-in-class',
  ]
  const costKeywords = [
    'cost', 'loss', 'margin', 'waste', 'delay', 'inefficiency', 'leak',
    'expense', 'spend', 'returns', 'freight', 'damage', 'inventory', 'repair',
  ]
  const specificRoles = [
    'director', 'manager', 'vp ', 'vice president', 'coo', 'cfo', 'head of',
    'lead', 'analyst', 'operations', 'supply chain', 'warehouse', 'logistics',
    'procurement', 'fulfillment',
  ]

  const highPainAngles: ContentAngle[] = ['hidden-cost-leak', 'system-failure', 'risk-warning']
  const financialAngles: ContentAngle[] = ['hidden-cost-leak', 'risk-warning', 'before-after-improvement']

  // Specificity (max 20)
  let specificity = 6
  if (p.length > 8) specificity += 3
  if (p.length > 18) specificity += 3
  if (/\d/.test(p)) specificity += 4
  if (p.split(' ').length >= 3) specificity += 4
  specificity = Math.min(20, specificity)

  // Pain Intensity (max 20)
  let painIntensity = 9
  if (highPainAngles.includes(angle)) painIntensity += 6
  if (costKeywords.some(k => p.includes(k))) painIntensity += 5
  painIntensity = Math.min(20, painIntensity)

  // Financial Relevance (max 20)
  let financialRelevance = 7
  if (financialAngles.includes(angle)) financialRelevance += 7
  if (costKeywords.some(k => p.includes(k))) financialRelevance += 6
  financialRelevance = Math.min(20, financialRelevance)

  // Clarity (max 20)
  let clarity = 9
  if (a.length > 5) clarity += 3
  if (specificRoles.some(r => a.includes(r))) clarity += 5
  if (p.length > 10) clarity += 3
  clarity = Math.min(20, clarity)

  // Non-generic language (max 20)
  const genericFound = genericTerms.filter(t => p.includes(t) || a.includes(t))
  const nonGenericLanguage = Math.max(4, 20 - genericFound.length * 5)

  const overall = Math.min(
    100,
    specificity + painIntensity + financialRelevance + clarity + nonGenericLanguage
  )

  const suggestions: string[] = []

  if (specificity < 16) {
    suggestions.push(
      'Add specificity to your pain point — include a metric, a process name, or a dollar figure (e.g., "returns processing delays over 72 hours").'
    )
  }
  if (painIntensity < 15) {
    suggestions.push(
      'Increase pain intensity by selecting a higher-tension angle: Hidden Cost Leak, System Failure, or Risk Warning.'
    )
  }
  if (financialRelevance < 15) {
    suggestions.push(
      'Connect the pain point to a financial outcome — cost, margin, or budget impact — to increase relevance to decision-makers.'
    )
  }
  if (clarity < 16) {
    suggestions.push(
      'Define your target audience with a specific title (e.g., "VP of Operations" or "warehouse director") for sharper targeting.'
    )
  }
  if (genericFound.length > 0) {
    suggestions.push(
      `Remove generic terms from your inputs: "${genericFound.slice(0, 2).join('", "')}". Replace with operational specifics.`
    )
  }

  const fallbacks = [
    'Add a specific dollar figure or percentage to the pain point for maximum impact with decision-makers.',
    'Try the Contrarian Take angle to create unexpected tension and drive higher engagement.',
    'Reference a specific industry segment in the target audience field for sharper targeting.',
    'Include a process name or system reference in the pain point for stronger operational specificity.',
  ]

  let fi = 0
  while (suggestions.length < 2 && fi < fallbacks.length) {
    suggestions.push(fallbacks[fi++])
  }

  return {
    overall,
    breakdown: { specificity, painIntensity, financialRelevance, clarity, nonGenericLanguage },
    suggestions: suggestions.slice(0, 3),
  }
}
