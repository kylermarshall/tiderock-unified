import {
  ContentAngle,
  InstagramContentItem,
  InstagramFormat,
  InstagramFormInputs,
  InstagramGeneratedContent,
  InstagramObjective,
  RegenerateVariant,
  VisualStyle,
} from '../types'
import { calculateScore } from './scoring'

const pick = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)]

// ─── Visual hooks ─────────────────────────────────────────────────────────────

function getVisualHook(
  painPoint: string,
  audience: string,
  format: InstagramFormat,
  variant?: RegenerateVariant
): string {
  const p = painPoint
  const a = audience

  if (variant === 'more-contrarian')
    return pick([
      `Everyone thinks ${p} is a people problem.`,
      `The popular take on ${p} is wrong.`,
      `What if fixing ${p} faster is actually making it worse?`,
    ])
  if (variant === 'more-direct')
    return pick([`Your ${p} process is costing you.`, `${p}: this is what's actually happening.`])

  const hooks: Record<InstagramFormat, string[]> = {
    'reel-script': [
      `Your ${p} is leaking margin. And most of it isn't showing up on your P&L.`,
      `Most ${a} have no idea how much ${p} actually costs them.`,
      `The reason your ${p} problem keeps coming back isn't what you think.`,
    ],
    'carousel-outline': [
      `Your ${p} process is broken.`,
      `${p} is draining margin in 5 different places.`,
      `Signs your ${p} system isn't working.`,
    ],
    caption: [
      `This is what unmanaged ${p} actually costs.`,
      `The gap between what ${p} looks like and what it costs.`,
    ],
    'story-sequence': [
      `Quick question for ${a}:`,
      `Let's talk about ${p}.`,
      `Something most ${a} don't track about ${p}:`,
    ],
  }

  return pick(hooks[format])
}

// ─── On-screen text ───────────────────────────────────────────────────────────

function getOnScreenText(painPoint: string, _format: InstagramFormat): string {
  const p = painPoint.toUpperCase()
  return pick([
    `"${p} IS COSTING YOU MORE THAN YOU KNOW"`,
    `THE HIDDEN COST OF ${p}`,
    `YOUR ${p.split(' ')[0]} PROCESS HAS A PROBLEM`,
    `5 SIGNS YOUR ${p.split(' ')[0]} IS BROKEN`,
    `THIS IS WHERE MARGIN LEAKS`,
  ])
}

// ─── Reel script ──────────────────────────────────────────────────────────────

function getReelScript(
  audience: string,
  painPoint: string,
  angle: ContentAngle,
  visualStyle: VisualStyle,
  _variant?: RegenerateVariant
): InstagramContentItem[] {
  const a = audience
  const p = painPoint

  const styleNote: Record<VisualStyle, string> = {
    'talking-head': 'Face-to-camera, direct eye contact, simple background',
    'text-overlay': 'Text appears over relevant B-roll footage',
    'data-visual': 'Animated data/chart with voiceover',
    'behind-scenes': 'Warehouse/ops environment footage with overlay text',
    documentary: 'Documentary-style B-roll with narration',
  }

  const baseScripts: Record<ContentAngle, InstagramContentItem[]> = {
    'hidden-cost-leak': [
      {
        label: 'Shot 1 (0:00–0:03)',
        heading: 'Hook',
        body: `"Your ${p} process is leaking margin — and most of it doesn't show up on one report."`,
        visualNote: `${styleNote[visualStyle]}. On-screen text: "THE REAL COST OF ${p.toUpperCase()}"`,
        duration: '3s',
      },
      {
        label: 'Shot 2 (0:03–0:08)',
        heading: 'Problem Setup',
        body: `"Most ${a} track ${p} as a single line item. But the real cost is distributed across five different places."`,
        visualNote: 'Cut to: text overlay with "5 PLACES" appearing one by one',
        duration: '5s',
      },
      {
        label: 'Shot 3 (0:08–0:15)',
        heading: 'The Cost Breakdown',
        body: `"Labor time. Carrier fees. Downstream delays. Inventory holds. Customer friction. Each one is measurable. Most aren't being measured."`,
        visualNote: "Animated list: each cost appears as it's named",
        duration: '7s',
      },
      {
        label: 'Shot 4 (0:15–0:22)',
        heading: 'The Insight',
        body: `"The teams that fix ${p} permanently don't just reduce frequency. They redesign the process to make every cost visible."`,
        visualNote: `${styleNote[visualStyle]}. Confident, direct delivery`,
        duration: '7s',
      },
      {
        label: 'Shot 5 (0:22–0:28)',
        heading: 'What To Do',
        body: `"Track cost-per-unit. Map every handoff. Hold vendors to documented SLAs. The data changes the conversation."`,
        visualNote: '3 text lines appearing: "TRACK. MAP. HOLD ACCOUNTABLE."',
        duration: '6s',
      },
      {
        label: 'Shot 6 (0:28–0:30)',
        heading: 'CTA',
        body: `"Follow for more on operations cost and margin recovery."`,
        visualNote: 'On-screen: "FOLLOW" with Premier LogiTech handle',
        duration: '2s',
      },
    ],
    'common-operational-mistake': [
      {
        label: 'Shot 1 (0:00–0:03)',
        heading: 'Hook',
        body: `"The most expensive ${p} mistake isn't a one-time error. It's a structural pattern."`,
        visualNote: `${styleNote[visualStyle]}. On-screen: "THE ${p.toUpperCase().split(' ')[0]} MISTAKE"`,
        duration: '3s',
      },
      {
        label: 'Shot 2 (0:03–0:10)',
        heading: 'The Mistake',
        body: `"Most ${a} treat ${p} as an exception. Something that happens and gets handled case by case."`,
        visualNote: 'Text overlay: "EXCEPTION THINKING = EXPENSIVE THINKING"',
        duration: '7s',
      },
      {
        label: 'Shot 3 (0:10–0:17)',
        heading: 'Why It Compounds',
        body: `"Exceptions get handled reactively. That works at low volume. At scale, it breaks — and the cost multiplies."`,
        visualNote: 'Simple graph showing cost curve rising with volume',
        duration: '7s',
      },
      {
        label: 'Shot 4 (0:17–0:24)',
        heading: 'The Fix',
        body: `"The smarter move: treat ${p} as a repeatable process with a documented fix. Map the touchpoints. Assign ownership. Standardize the response."`,
        visualNote: `${styleNote[visualStyle]}. Steps appearing as text`,
        duration: '7s',
      },
      {
        label: 'Shot 5 (0:24–0:28)',
        heading: 'Outcome',
        body: `"Teams that do this once rarely face the same failure at the same cost."`,
        visualNote: 'On-screen: "ONE GOOD PROCESS > 100 REACTIVE RESPONSES"',
        duration: '4s',
      },
      {
        label: 'Shot 6 (0:28–0:30)',
        heading: 'CTA',
        body: `"Save this. Share with your operations lead."`,
        visualNote: 'Bookmark icon animation + follow prompt',
        duration: '2s',
      },
    ],
    'contrarian-take': [
      {
        label: 'Shot 1 (0:00–0:03)',
        heading: 'Hook',
        body: `"Everyone tells ${a} to process ${p} faster. That's the wrong goal."`,
        visualNote: `${styleNote[visualStyle]}. Bold text: "FASTER IS WRONG"`,
        duration: '3s',
      },
      {
        label: 'Shot 2 (0:03–0:10)',
        heading: 'The Conventional Take',
        body: `"The standard advice: reduce cycle time, add staff, implement technology. Move faster."`,
        visualNote: 'Text: "STANDARD ADVICE" with checkmark → strikethrough',
        duration: '7s',
      },
      {
        label: 'Shot 3 (0:10–0:17)',
        heading: 'The Problem With That',
        body: `"Speed without accuracy creates faster failures. You're compressing the time between errors, not eliminating them."`,
        visualNote: 'Animation: fast clock with error icons multiplying',
        duration: '7s',
      },
      {
        label: 'Shot 4 (0:17–0:24)',
        heading: 'The Actual Fix',
        body: `"Slow down enough to make the process auditable. Add checkpoints. Require documentation. Then speed it up."`,
        visualNote: `${styleNote[visualStyle]}. Calm, deliberate delivery`,
        duration: '7s',
      },
      {
        label: 'Shot 5 (0:24–0:28)',
        heading: 'The Result',
        body: `"Speed built on a visible process scales. Speed built on hope doesn't."`,
        visualNote: 'On-screen: "SPEED FOLLOWS PROCESS"',
        duration: '4s',
      },
      {
        label: 'Shot 6 (0:28–0:30)',
        heading: 'CTA',
        body: `"Follow if this changes how you're thinking about ${p}."`,
        visualNote: 'Follow prompt with engagement hook',
        duration: '2s',
      },
    ],
    'system-failure': [
      {
        label: 'Shot 1 (0:00–0:03)',
        heading: 'Hook',
        body: `"When ${p} fails, it doesn't fail alone. Three systems break with it."`,
        visualNote: `${styleNote[visualStyle]}. Text: "THE CASCADE"`,
        duration: '3s',
      },
      {
        label: 'Shot 2 (0:03–0:10)',
        heading: 'Stage 1',
        body: `"One failure at one touchpoint. Looks small. Gets handled manually."`,
        visualNote: 'Flow diagram: one red node appearing',
        duration: '7s',
      },
      {
        label: 'Shot 3 (0:10–0:17)',
        heading: 'Stage 2',
        body: `"The manual fix bypasses the standard process. Downstream items are now delayed. Inventory is in limbo."`,
        visualNote: 'Flow diagram: red spreading to adjacent nodes',
        duration: '7s',
      },
      {
        label: 'Shot 4 (0:17–0:22)',
        heading: 'Stage 3',
        body: `"The workaround becomes a habit. The formal process becomes theoretical. Costs are now invisible."`,
        visualNote: 'Text: "WORKAROUND → HABIT → INVISIBLE COST"',
        duration: '5s',
      },
      {
        label: 'Shot 5 (0:22–0:28)',
        heading: 'The Fix',
        body: `"Real-time visibility at key handoffs. Process redesign with documented escalation paths. Stage 2 becomes an alert, not a workaround."`,
        visualNote: `${styleNote[visualStyle]}. Alert icon → green check`,
        duration: '6s',
      },
      {
        label: 'Shot 6 (0:28–0:30)',
        heading: 'CTA',
        body: `"Follow for more on building operations that don't break at scale."`,
        visualNote: 'Follow prompt',
        duration: '2s',
      },
    ],
    'before-after-improvement': [
      {
        label: 'Shot 1 (0:00–0:03)',
        heading: 'Hook',
        body: `"Before and after: what fixing ${p} actually looks like."`,
        visualNote: `${styleNote[visualStyle]}. Split screen graphic: BEFORE / AFTER`,
        duration: '3s',
      },
      {
        label: 'Shot 2 (0:03–0:10)',
        heading: 'Before',
        body: `"${p} handled inconsistently. Multiple teams, multiple methods, unpredictable outcomes. Cost-per-unit: unknown."`,
        visualNote: 'Red side of split screen with problem text appearing',
        duration: '7s',
      },
      {
        label: 'Shot 3 (0:10–0:17)',
        heading: 'The Intervention',
        body: `"One standardized process. Clear ownership at every handoff. Exception handling documented by type."`,
        visualNote: 'Transition graphic: chaos → clean flow',
        duration: '7s',
      },
      {
        label: 'Shot 4 (0:17–0:24)',
        heading: 'After',
        body: `"Processing time down. Errors traceable. Costs stabilized. Margin recovery visible within two quarters."`,
        visualNote: 'Green side of split screen. Numbers going down/up in right direction',
        duration: '7s',
      },
      {
        label: 'Shot 5 (0:24–0:30)',
        heading: 'CTA',
        body: `"Save this to show your team. Follow for more."`,
        visualNote: 'Bookmark animation + follow',
        duration: '6s',
      },
    ],
    'risk-warning': [
      {
        label: 'Shot 1 (0:00–0:03)',
        heading: 'Hook',
        body: `"Your ${p} process has risks you probably haven't formally assessed."`,
        visualNote: `${styleNote[visualStyle]}. On-screen: "UNQUANTIFIED RISK"`,
        duration: '3s',
      },
      {
        label: 'Shot 2 (0:03–0:12)',
        heading: 'Risk Breakdown',
        body: `"Carrier chargebacks. Vendor disputes. Compliance gaps. Inventory write-offs. Customer chargebacks. All linked to ${p}. All often managed by different teams."`,
        visualNote: 'Risk items appearing as a list, each with an orange warning icon',
        duration: '9s',
      },
      {
        label: 'Shot 3 (0:12–0:20)',
        heading: 'Why It Compounds',
        body: `"None of these require a catastrophic event. They compound through normal volume."`,
        visualNote: 'Simple compound growth curve — small start, steep end',
        duration: '8s',
      },
      {
        label: 'Shot 4 (0:20–0:28)',
        heading: 'What To Do',
        body: `"Audit your ${p} process across all five risk categories. Build shared visibility across the teams that touch it."`,
        visualNote: `${styleNote[visualStyle]}. Audit checklist animation`,
        duration: '8s',
      },
      {
        label: 'Shot 5 (0:28–0:30)',
        heading: 'CTA',
        body: `"Follow for more on managing operations risk."`,
        visualNote: 'Follow prompt',
        duration: '2s',
      },
    ],
    'buyer-education': [
      {
        label: 'Shot 1 (0:00–0:03)',
        heading: 'Hook',
        body: `"If you manage ${p}, here are the 5 numbers you should be tracking."`,
        visualNote: `${styleNote[visualStyle]}. On-screen: "5 METRICS"`,
        duration: '3s',
      },
      {
        label: 'Shot 2 (0:03–0:10)',
        heading: 'Metric 1–2',
        body: `"#1: Cost-per-unit processed. #2: Cycle time by exception type. Not averages — broken down by exception category."`,
        visualNote: 'Numbers 1 and 2 appearing with brief descriptions',
        duration: '7s',
      },
      {
        label: 'Shot 3 (0:10–0:17)',
        heading: 'Metric 3–4',
        body: `"#3: First-contact resolution rate. #4: Vendor/carrier attribution rate — what percentage is their fault?"`,
        visualNote: 'Numbers 3 and 4 appearing',
        duration: '7s',
      },
      {
        label: 'Shot 4 (0:17–0:24)',
        heading: 'Metric 5',
        body: `"#5: Downstream impact rate — how often does a ${p} event create a delay in the next step? This is the cost multiplier."`,
        visualNote: 'Number 5 with "MULTIPLIER" label',
        duration: '7s',
      },
      {
        label: 'Shot 5 (0:24–0:30)',
        heading: 'CTA',
        body: `"Save this. Share with your analyst. Start tracking #1 and #3 first."`,
        visualNote: 'Bookmark icon. "START HERE: #1 + #3"',
        duration: '6s',
      },
    ],
  }

  return baseScripts[angle] ?? baseScripts['hidden-cost-leak']
}

// ─── Carousel slides ──────────────────────────────────────────────────────────

function getCarouselSlides(
  audience: string,
  painPoint: string,
  angle: ContentAngle,
  _variant?: RegenerateVariant
): InstagramContentItem[] {
  const a = audience
  const p = painPoint

  const byAngle: Record<ContentAngle, InstagramContentItem[]> = {
    'hidden-cost-leak': [
      { label: 'Slide 1', heading: 'Hook', body: `Your ${p} process is leaking margin.`, visualNote: 'Bold text on dark background. Single sentence, large font.' },
      { label: 'Slide 2', heading: 'Not from refunds.', body: `From slow handoffs, unclear ownership, and inventory delays.`, visualNote: 'Clean typography, contrasting color from slide 1.' },
      { label: 'Slide 3', heading: 'The 5 cost components', body: `Labor time. Carrier fees. Downstream delays. Inventory holds. Customer friction.`, visualNote: 'List format, each item on its own line with a simple icon.' },
      { label: 'Slide 4', heading: 'What most teams track:', body: `2 of those 5. The other 3 run on autopilot.`, visualNote: 'Pie chart or simple visual: "2 tracked / 3 invisible"' },
      { label: 'Slide 5', heading: "What happens when you track all 5:", body: `You find the real cost. It's usually 2–3× what the budget shows.`, visualNote: 'Number "2-3×" in large, high-contrast text.' },
      { label: 'Slide 6', heading: 'The fix:', body: `Map the full cost system — not just the event. Track every component. Hold every vendor accountable.`, visualNote: '3-step graphic: MAP → TRACK → HOLD' },
      { label: 'Slide 7', heading: 'Save this slide for your next ops review.', body: `Follow for more on logistics cost and margin recovery.`, visualNote: 'CTA slide with bookmark icon + follow prompt.' },
    ],
    'common-operational-mistake': [
      { label: 'Slide 1', heading: 'The most expensive mistake in your operations:', body: `Treating ${p} as an exception.`, visualNote: 'Bold statement on clean background.' },
      { label: 'Slide 2', heading: "Here's what that looks like:", body: `${p} event happens. Someone handles it. It's forgotten. Next time: same response.`, visualNote: 'Circular diagram showing the loop.' },
      { label: 'Slide 3', heading: "Why this is expensive:", body: `Exceptions get managed by individuals. Individuals leave. Knowledge disappears. Cost repeats.`, visualNote: 'Person → exit door icon → cost icon.' },
      { label: 'Slide 4', heading: "At scale:", body: `Exception handling costs compound with volume. Low-volume ops survive it. High-volume ops don't.`, visualNote: 'Graph: cost curve rising sharply with volume.' },
      { label: 'Slide 5', heading: 'The smarter approach:', body: `Document ${p} as a repeatable process with standardized exception types and documented responses.`, visualNote: 'Flowchart: event → type → documented response.' },
      { label: 'Slide 6', heading: 'The outcome:', body: `One good process design eliminates the need for constant firefighting.`, visualNote: '"FIREFIGHTING → ENGINEERING" transition graphic.' },
      { label: 'Slide 7', heading: 'Share this with your ops lead.', body: `Follow for more on building operations that scale without breaking.`, visualNote: 'CTA slide with share + follow prompt.' },
    ],
    'contrarian-take': [
      { label: 'Slide 1', heading: 'Hot take:', body: `The way most ${a} handle ${p} guarantees it stays expensive.`, visualNote: 'Bold, high-contrast text. "HOT TAKE" label in corner.' },
      { label: 'Slide 2', heading: 'The standard approach:', body: `Faster processing. More staff. Better software. Move it through the system quickly.`, visualNote: 'List with checkmarks — setting up the contrast.' },
      { label: 'Slide 3', heading: "What that actually produces:", body: `Faster failures. You're compressing the time between errors, not eliminating them.`, visualNote: 'Checkmarks become X marks.' },
      { label: 'Slide 4', heading: 'The real constraint:', body: `Not speed. Auditability. If you can't trace what happened at each handoff, you can't find where errors enter.`, visualNote: '"SPEED" crossed out → "AUDITABILITY" highlighted.' },
      { label: 'Slide 5', heading: 'The counterintuitive fix:', body: `Slow down enough to make the process fully visible. Add checkpoints. Then speed it up.`, visualNote: 'Turtle → Documented Process → Fast Arrow' },
      { label: 'Slide 6', heading: 'The result:', body: `Speed built on a visible process scales. Speed built on hope doesn't.`, visualNote: '"SPEED FOLLOWS PROCESS" in large type.' },
      { label: 'Slide 7', heading: 'Disagree? Drop a comment.', body: `Follow for more operator-grade content on supply chain and logistics.`, visualNote: 'Engagement CTA slide.' },
    ],
    'system-failure': [
      { label: 'Slide 1', heading: 'When your ${p} breaks:', body: `It doesn't break alone.`, visualNote: 'Domino effect image or graphic.' },
      { label: 'Slide 2', heading: 'Stage 1:', body: `One failure at one touchpoint. Gets handled manually. Looks contained.`, visualNote: 'Single red dot on a clean process flow.' },
      { label: 'Slide 3', heading: 'Stage 2:', body: `Downstream items delayed. Inventory in limbo. A workaround is created.`, visualNote: 'Red spreading through the flow.' },
      { label: 'Slide 4', heading: 'Stage 3:', body: `The workaround becomes a habit. The documented process becomes theoretical.`, visualNote: '"WORKAROUND → HABIT" with cost icon.' },
      { label: 'Slide 5', heading: 'Stage 4:', body: `Costs accumulate invisibly — labeled as something else in the P&L.`, visualNote: '"INVISIBLE COST" with hidden iceberg visual.' },
      { label: 'Slide 6', heading: 'Stage 5:', body: `Discovery — usually at quarter-end. Root cause now weeks old.`, visualNote: '"QUARTER-END SURPRISE" in red text.' },
      { label: 'Slide 7', heading: 'The fix:', body: `Real-time visibility at key handoffs. Stage 2 becomes an alert. Not a workaround.`, visualNote: 'Green checkmark replacing the cascade.' },
      { label: 'Slide 8', heading: 'Save this if your ops team needs it.', body: `Follow for more on building supply chain resilience.`, visualNote: 'CTA slide.' },
    ],
    'before-after-improvement': [
      { label: 'Slide 1', heading: 'Before:', body: `Your ${p} process is running on informal rules.`, visualNote: '"BEFORE" in muted colors.' },
      { label: 'Slide 2', heading: 'What that looks like:', body: `Multiple teams, multiple methods, unpredictable outcomes. Cost-per-unit unknown.`, visualNote: 'Scattered icons: inconsistency visual.' },
      { label: 'Slide 3', heading: 'The cost:', body: `Margin leakage. Escalating labor time. Vendor disputes. No baseline for improvement.`, visualNote: 'Cost items stacking up.' },
      { label: 'Slide 4', heading: 'The intervention:', body: `One standardized process. Clear ownership at every handoff. Exceptions documented by type.`, visualNote: '"AFTER" in bold, clean colors.' },
      { label: 'Slide 5', heading: 'What changed:', body: `Processing time down. Errors traceable. Cost-per-unit stable.`, visualNote: 'Before/after metrics comparison.' },
      { label: 'Slide 6', heading: 'Timeline:', body: `Measurable margin recovery within two to three quarters of process redesign.`, visualNote: 'Simple timeline graphic: Q1 → Q2 → Q3.' },
      { label: 'Slide 7', heading: 'The operation didn\'t change.', body: `The ${p} process did. That's the only lever that moved the numbers.`, visualNote: '"THE PROCESS" highlighted in the org chart.' },
      { label: 'Slide 8', heading: 'Save and share with your team.', body: `Follow for more.`, visualNote: 'CTA.' },
    ],
    'risk-warning': [
      { label: 'Slide 1', heading: '3 signs your ${p} is becoming a financial problem:', body: `Not an ops problem. A money problem.`, visualNote: '"WARNING" header in orange.' },
      { label: 'Slide 2', heading: 'Sign 1:', body: `You haven't audited the process in over 12 months. Exposure is accumulating with no visibility.`, visualNote: 'Calendar with warning icon.' },
      { label: 'Slide 3', heading: 'Sign 2:', body: `Different teams manage different parts of ${p} with no shared reporting. You can't see the full cost.`, visualNote: 'Siloed teams diagram.' },
      { label: 'Slide 4', heading: 'Sign 3:', body: `Chargebacks, disputes, and write-offs are trending up — but no one connects them back to ${p}.`, visualNote: 'Disconnected cost items.' },
      { label: 'Slide 5', heading: 'Why this matters:', body: `These aren't catastrophic events. They compound through normal volume until they become visible at the wrong moment.`, visualNote: 'Compound curve.' },
      { label: 'Slide 6', heading: 'What to do:', body: `Audit the full ${p} system. Build cross-functional visibility. Establish cost-per-unit tracking.`, visualNote: '3-step action list.' },
      { label: 'Slide 7', heading: 'Save this for your next operations review.', body: `Follow for more on managing logistics risk and cost.`, visualNote: 'CTA.' },
    ],
    'buyer-education': [
      { label: 'Slide 1', heading: `Most ${a} don't know the 5 components of ${p} cost.`, body: `Here they are.`, visualNote: '"5 THINGS" hook slide.' },
      { label: 'Slide 2', heading: '1. Labor time', body: `Every manual exception handled outside a documented process is untracked labor cost.`, visualNote: 'Person + clock icon.' },
      { label: 'Slide 3', heading: '2. Carrier and vendor fees', body: `Delays, mis-routes, and SLA breaches generate fees that often land in separate cost centers.`, visualNote: 'Truck + dollar icon.' },
      { label: 'Slide 4', heading: '3. Downstream delays', body: `One ${p} event can delay the next 2–3 steps. Most teams don't track this chain.`, visualNote: 'Domino chain visual.' },
      { label: 'Slide 5', heading: '4. Inventory holds', body: `Items in limbo create carrying costs and capital lockup that rarely appear as ${p} costs.`, visualNote: 'Box in a hold state.' },
      { label: 'Slide 6', heading: '5. Customer and relationship impact', body: `Chargeback risk, return delays, and vendor friction all trace back to ${p}.`, visualNote: 'Relationship erosion visual.' },
      { label: 'Slide 7', heading: 'Start tracking all 5.', body: `Most ${a} are measuring 2. That gap is your unmanaged cost exposure.`, visualNote: '"2/5 TRACKED" meter.' },
      { label: 'Slide 8', heading: 'Save this and share it.', body: `Follow for more on logistics cost and operations management.`, visualNote: 'CTA.' },
    ],
  }

  return byAngle[angle] ?? byAngle['hidden-cost-leak']
}

// ─── Caption ──────────────────────────────────────────────────────────────────

function getCaption(
  audience: string,
  painPoint: string,
  angle: ContentAngle,
  _variant?: RegenerateVariant
): string {
  const a = audience
  const p = painPoint

  const captions: Partial<Record<ContentAngle, string>> = {
    'hidden-cost-leak': `${p} is leaking margin from five different places — and most ${a} are only tracking two of them.\n\nThe components most teams miss:\n— Labor time for manual exception handling\n— Carrier fees for delays and mis-routes\n— Downstream delays that push into the next cycle\n— Inventory holds and carrying costs\n— Customer friction and chargeback risk\n\nEach one is measurable. Most aren't being measured.\n\nThe fix isn't more staff or faster processing. It's redesigning the system to make every cost visible.\n\nSave this for your next operations review. Follow for more on supply chain cost and margin recovery.\n\n#SupplyChain #Logistics #ReverseLogistics #OperationsManagement #B2BOperations`,
    'common-operational-mistake': `The most expensive ${p} mistake: treating it as an exception.\n\nHere's what that costs at scale:\n\nExceptions get handled reactively — by whoever is available, using whatever method works in the moment. That approach works at low volume. At scale, it creates inconsistency, rising labor costs, and invisible margin leakage.\n\nThe smarter move: document ${p} as a repeatable process. Map every touchpoint. Assign ownership to roles, not individuals. Standardize the exception response.\n\nTeams that do this once rarely face the same recurring cost.\n\nShare this with your operations lead. Follow for more.\n\n#Operations #SupplyChain #ProcessImprovement #Logistics`,
    'contrarian-take': `Hot take: most ${a} are solving ${p} backward.\n\nThe standard advice: faster processing, more capacity, better tools. Move it through the system quicker.\n\nThe problem: speed without accuracy just creates faster failures. You're compressing the time between errors, not eliminating them.\n\nThe counterintuitive fix: slow down enough to make the process fully auditable. Add checkpoints at key handoffs. Require documentation. Then speed it up.\n\nSpeed follows process. Not the other way around.\n\nAgree or disagree? Drop your take in the comments.\n\n#Operations #SupplyChain #ProcessDesign #LogisticsLeadership`,
  }

  return (
    captions[angle] ??
    `${p} costs more than most ${a} realize — and the gap between the budget line and the actual cost is where margin goes.\n\nThe real cost components:\n— Direct: labor, carrier fees, processing time\n— Indirect: downstream delays, customer friction, vendor disputes\n\nThe indirect costs are often larger than the direct ones. And they're almost never tracked as ${p} costs.\n\nThe fix starts with data: cost-per-unit, cycle time, and error rate. Once you have those numbers, the path forward becomes clear.\n\nFollow for more on operations efficiency and cost recovery.\n\n#SupplyChain #Logistics #Operations #CostReduction #B2B`
  )
}

// ─── Story sequence ───────────────────────────────────────────────────────────

function getStoryFrames(
  audience: string,
  painPoint: string,
  _angle: ContentAngle
): InstagramContentItem[] {
  const a = audience
  const p = painPoint

  return [
    {
      label: 'Frame 1',
      heading: 'Attention',
      body: `Quick question for ${a} 👇`,
      visualNote: 'Text on gradient background. Large text, informal tone.',
    },
    {
      label: 'Frame 2',
      heading: 'Setup',
      body: `How much does your ${p} process cost per unit?`,
      visualNote: 'Text poll overlay or text question on clean background.',
    },
    {
      label: 'Frame 3',
      heading: 'Poll',
      body: `Most ${a} I talk to don't know.\n\n[Poll: "I know exactly" vs "Honestly, no idea"]`,
      visualNote: 'Instagram poll sticker: two options.',
    },
    {
      label: 'Frame 4',
      heading: 'Insight',
      body: `The real cost of ${p} is distributed across 5 line items — most teams only track 2.`,
      visualNote: '"5 LINE ITEMS / 2 TRACKED" visual split.',
    },
    {
      label: 'Frame 5',
      heading: 'Value',
      body: `The ones who fix ${p} permanently are the ones who mapped the full system, not just the event.`,
      visualNote: '"MAP THE SYSTEM" text on clean background.',
    },
    {
      label: 'Frame 6',
      heading: 'CTA',
      body: `Swipe up (or tap our link) to see how Premier LogiTech helps operations teams find and fix the cost leaks.`,
      visualNote: 'CTA frame with Premier LogiTech branding and arrow/link.',
    },
  ]
}

// ─── Suggested visuals ────────────────────────────────────────────────────────

function getSuggestedVisuals(
  _format: InstagramFormat,
  _painPoint: string,
  visualStyle: VisualStyle
): string[] {
  const base = [
    `B-roll: warehouse operations, conveyor belts, sorting processes (authentic, not stock-photo staged)`,
    `B-roll: operations team reviewing data on screens or printed reports`,
    `Graphic: simple process flow diagram showing touchpoints and handoffs`,
    `Graphic: cost breakdown visual — pie chart or stacked bar showing the 5 cost components`,
  ]

  const byStyle: Partial<Record<VisualStyle, string[]>> = {
    'talking-head': [
      `Filming setup: simple, clean background (wall, minimal shelving) — avoid branded backdrops`,
      `Lighting: natural or ring light, consistent color temperature`,
    ],
    'text-overlay': [
      `B-roll suggestions: shipping labels, freight manifests, tablet screens in warehouse settings`,
      `Text treatment: bold sans-serif, high contrast, no more than 7 words per frame`,
    ],
    'data-visual': [
      `Animation: cost curve over time with annotation at the intervention point`,
      `Animation: before/after comparison bars for cycle time and cost-per-unit`,
    ],
    'behind-scenes': [
      `Authentic warehouse footage — if possible, real operations vs. polished sets`,
      `Operations team at work — problem-solving moments, not posed shots`,
    ],
  }

  return [...base.slice(0, 2), ...(byStyle[visualStyle] ?? [])]
}

// ─── Repurposing ──────────────────────────────────────────────────────────────

function getRepurposingSuggestions(format: InstagramFormat): string[] {
  const base = [
    `LinkedIn: each carousel slide becomes a bullet point in a LinkedIn post — use slide 1 as the hook`,
    `Twitter thread: use the slide headings as thread post #1–7`,
  ]
  const byFormat: Record<InstagramFormat, string[]> = {
    'reel-script': [
      `YouTube Short: the shot structure maps directly — expand each shot to 5–8 seconds`,
      `Facebook short post: use the hook and insight from shots 1 and 4`,
    ],
    'carousel-outline': [
      `Blog post: each slide becomes a section heading — add 1–2 paragraphs per section`,
      `Email: the carousel flow makes a strong educational email structure`,
    ],
    caption: [
      `Facebook educational post: the caption structure (hook → insight → fix → CTA) translates directly`,
      `LinkedIn post: shorten the caption and remove hashtags for LinkedIn format`,
    ],
    'story-sequence': [
      `Email poll: use the poll question as an email subject line — report the results in the next send`,
      `Twitter: use the insight frame as a single post`,
    ],
  }
  return [...base, ...byFormat[format]]
}

// ─── CTA ──────────────────────────────────────────────────────────────────────

function getInstagramCTA(
  format: InstagramFormat,
  _objective: InstagramObjective
): string {
  const ctas: Record<InstagramFormat, string[]> = {
    'reel-script': [
      'Follow for more on operations cost and supply chain efficiency.',
      'Share this with your operations team if it describes your current situation.',
    ],
    'carousel-outline': [
      'Save this carousel for your next operations review.',
      'Share with a logistics or operations leader who needs this.',
    ],
    caption: [
      'Follow for weekly content on supply chain operations and cost reduction.',
      'Tag an operations leader in the comments.',
    ],
    'story-sequence': [
      'Tap the link in bio to learn more about how Premier LogiTech solves this.',
      'DM us if this matches your current situation.',
    ],
  }
  return pick(ctas[format])
}

// ─── Main generator ───────────────────────────────────────────────────────────

export function generateInstagramContent(
  inputs: InstagramFormInputs,
  variant?: RegenerateVariant
): InstagramGeneratedContent {
  const audience = inputs.targetViewer.trim() || 'operations leaders'
  const painPoint = inputs.mainPainPoint.trim() || 'reverse logistics inefficiency'
  const { contentFormat: format, contentAngle: angle, visualStyle, objective } = inputs

  let contentItems: InstagramContentItem[]
  if (format === 'reel-script') {
    contentItems = getReelScript(audience, painPoint, angle, visualStyle, variant)
  } else if (format === 'carousel-outline') {
    contentItems = getCarouselSlides(audience, painPoint, angle, variant)
  } else if (format === 'story-sequence') {
    contentItems = getStoryFrames(audience, painPoint, angle)
  } else {
    contentItems = []
  }

  const qualityScore = calculateScore({ audience, painPoint, angle })

  return {
    format,
    visualHook: getVisualHook(painPoint, audience, format, variant),
    onScreenText: getOnScreenText(painPoint, format),
    contentItems,
    caption: getCaption(audience, painPoint, angle, variant),
    cta: getInstagramCTA(format, objective),
    suggestedVisuals: getSuggestedVisuals(format, painPoint, visualStyle),
    repurposingSuggestions: getRepurposingSuggestions(format),
    qualityScore,
  }
}
