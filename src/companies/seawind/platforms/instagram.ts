import type { InstagramInputs, InstagramOutput, InstagramCarouselSlide, InstagramFormat } from '../types'
import { COMPANY, pickStat } from '../lib/companyProfile'
import { scoreContent } from '../lib/scoring'

// ── Carousel slides by pain point ─────────────────────────────────────────────

const CAROUSELS: Record<string, InstagramCarouselSlide[][]> = {
  spoilage: [
    [
      { slideNumber: 1, onScreenText: 'Your seafood inventory is killing your margins.', caption: 'Not the market. Not your supplier.', visual: 'Walk-in refrigerator, muted tones, clinical lighting' },
      { slideNumber: 2, onScreenText: 'Not because of price.', caption: 'The invoice is not where the problem lives.', visual: 'Close-up of a seafood invoice, blurred background' },
      { slideNumber: 3, onScreenText: 'Because of spoilage and poor timing.', caption: '4–10% of seafood ordered never reaches a plate.', visual: 'Walk-in with labeled date tags on packages' },
      { slideNumber: 4, onScreenText: 'Three control points determine your actual cost:', caption: 'Receipt temperature. Walk-in calibration. FIFO compliance.', visual: 'Graphic: three numbered checkboxes' },
      { slideNumber: 5, onScreenText: 'All three are measurable.', caption: 'Most operators track none of them consistently.', visual: 'Operator with clipboard reviewing walk-in' },
      { slideNumber: 6, onScreenText: 'Audit your walk-in before your next supplier negotiation.', caption: COMPANY.cta.audit, visual: 'Clean end card with Sea Wind Foods wordmark' },
    ],
  ],
  supply_inconsistency: [
    [
      { slideNumber: 1, onScreenText: "Every 86 on seafood has a cause.", caption: "And it's almost never your supplier.", visual: "Server talking to kitchen, tension visible" },
      { slideNumber: 2, onScreenText: "It's your ordering window.", caption: "Orders placed inside 48 hours face 2x the stockout rate.", visual: "Calendar with short-window order marked in red" },
      { slideNumber: 3, onScreenText: '5–7 day lead times cut stockouts by half.', caption: 'This is a timing decision, not a supplier quality issue.', visual: 'Calendar showing 5-day advance order in green' },
      { slideNumber: 4, onScreenText: 'Build a supply system, not just a supplier list.', caption: 'Backup sourcing. Contracted volume. Demand tracking.', visual: 'Supply chain diagram, clean and minimal' },
      { slideNumber: 5, onScreenText: 'Consistent availability is a process outcome.', caption: COMPANY.cta.consult, visual: 'Sea Wind Foods end card' },
    ],
  ],
  price_volatility: [
    [
      { slideNumber: 1, onScreenText: 'Seafood prices shifted this year.', caption: 'Your spot purchasing moved with them.', visual: 'Market price chart, upward trend' },
      { slideNumber: 2, onScreenText: 'Spot buyers pay 12–20% more than contracted buyers.', caption: 'Every week. For the same product.', visual: 'Split graphic: spot vs. contract cost bars' },
      { slideNumber: 3, onScreenText: "That's not a market cost.", caption: "It's a planning cost.", visual: "Operator reviewing purchase orders" },
      { slideNumber: 4, onScreenText: "Contract 60% of your volume.", caption: "Keep 20–30% spot for flexibility.", visual: "Pie chart: 60/20/20 split — contract, spot, buffer" },
      { slideNumber: 5, onScreenText: "Stop absorbing volatility you don't have to.", caption: COMPANY.cta.learn, visual: "Sea Wind Foods end card" },
    ],
  ],
  over_ordering: [
    [
      { slideNumber: 1, onScreenText: '"Just order more to be safe."', caption: 'This advice costs operators hundreds per week.', visual: 'Stack of seafood cases, some tagged with older dates' },
      { slideNumber: 2, onScreenText: 'Over-ordering by 10% inflates your cost per usable pound by up to 14%.', caption: 'Buffer stock is not free.', visual: 'Cost-per-pound graphic showing inflated line' },
      { slideNumber: 3, onScreenText: "You're trading stockout risk for spoilage cost.", caption: "One is visible. One is hidden.", visual: "Balance scale: stockout vs. spoilage" },
      { slideNumber: 4, onScreenText: 'Accurate par levels beat buffer stock every time.', caption: 'Review yours every 90 days.', visual: 'Par level spreadsheet, clean layout' },
      { slideNumber: 5, onScreenText: 'Calculate your real cost before you order extra again.', caption: COMPANY.cta.download, visual: 'Sea Wind Foods end card' },
    ],
  ],
  margin_loss: [
    [
      { slideNumber: 1, onScreenText: 'Seafood margin loss has 3 sources.', caption: 'Most operators only look at one.', visual: 'P&L spreadsheet with seafood line item highlighted' },
      { slideNumber: 2, onScreenText: '#1: Spoilage', caption: '4–10% of what you buy never sells.', visual: 'Walk-in with dated labels' },
      { slideNumber: 3, onScreenText: '#2: Over-portioning', caption: '$0.40/plate over spec × 200 covers = $4,160/year.', visual: 'Portion scale, labeled weight' },
      { slideNumber: 4, onScreenText: '#3: Mis-ordering', caption: 'Ordering the wrong quantities drives both waste and 86s.', visual: 'Order form with red/green quantity marks' },
      { slideNumber: 5, onScreenText: 'All three are measurable. All three are fixable.', caption: COMPANY.cta.audit, visual: 'Sea Wind Foods end card' },
    ],
  ],
  cold_chain: [
    [
      { slideNumber: 1, onScreenText: 'Your receiving log says 38°F.', caption: 'Your back walk-in shelf may say 42°F.', visual: 'Temperature gauge, close-up' },
      { slideNumber: 2, onScreenText: 'Each degree above target = 1 less day of shelf life.', caption: 'That variance is invisible on your receiving log.', visual: 'Shelf life decay graph' },
      { slideNumber: 3, onScreenText: 'Cold chain failure happens after delivery.', caption: 'Not during it.', visual: 'Operator loading product into walk-in' },
      { slideNumber: 4, onScreenText: 'Monitor temperature continuously, not just at receipt.', caption: 'One sensor at the door is not enough.', visual: 'Walk-in sensor placement diagram' },
      { slideNumber: 5, onScreenText: 'Calibrate your cold chain before your next delivery.', caption: COMPANY.cta.audit, visual: 'Sea Wind Foods end card' },
    ],
  ],
  waste_inventory: [
    [
      { slideNumber: 1, onScreenText: "FIFO only works if you can see what's oldest.", caption: "Most walk-ins make that impossible.", visual: "Crowded walk-in, no visible labels" },
      { slideNumber: 2, onScreenText: 'Inventory shrink in seafood averages 3–5% per cycle.', caption: 'None of it is inevitable.', visual: 'Shrink percentage graphic' },
      { slideNumber: 3, onScreenText: 'Label everything at delivery. No exceptions.', caption: 'Receipt date visible on every package.', visual: 'Operator labeling packages at delivery' },
      { slideNumber: 4, onScreenText: 'Review oldest product first. Every day.', caption: 'Velocity on aged product is margin recovery.', visual: 'FIFO label system, organized walk-in' },
      { slideNumber: 5, onScreenText: 'Shrink is a system problem. Fix the system.', caption: COMPANY.cta.consult, visual: 'Sea Wind Foods end card' },
    ],
  ],
  logistics: [
    [
      { slideNumber: 1, onScreenText: "Every seafood SKU on your menu is a logistics commitment.", caption: "Most operators don't count the real cost.", visual: "Menu board, multiple seafood items listed" },
      { slideNumber: 2, onScreenText: '12 SKUs costs ~4x more to operate than 6 SKUs.', caption: 'Not 2x. Four times.', visual: 'Bar chart: 6 SKU vs. 12 SKU operational cost' },
      { slideNumber: 3, onScreenText: 'More SKUs = more deliveries, more specs, more spoilage risk.', caption: 'Each one compounds the others.', visual: 'Complexity diagram: SKUs → variables' },
      { slideNumber: 4, onScreenText: 'Menu restraint in perishables is a margin strategy.', caption: 'Not a limitation.', visual: 'Clean 6-item seafood menu' },
      { slideNumber: 5, onScreenText: 'Audit your SKU count before your next menu revision.', caption: COMPANY.cta.consult, visual: 'Sea Wind Foods end card' },
    ],
  ],
  lead_time: [
    [
      { slideNumber: 1, onScreenText: "48-hour seafood orders cost you every week.", caption: "You're paying a lead time premium you don't have to.", visual: "Calendar with rushed order marked" },
      { slideNumber: 2, onScreenText: "Lead times for specialty seafood are up 30–45% since 2022.", caption: "Most menus haven't adapted.", visual: "Timeline graphic showing lead time extension" },
      { slideNumber: 3, onScreenText: 'Short-window orders = 2x stockout frequency.', caption: 'And 18–25% higher cost per unit.', visual: 'Stockout frequency comparison graphic' },
      { slideNumber: 4, onScreenText: 'Order 5–7 days out. Plan your demand window.', caption: 'This is not complicated. It requires discipline.', visual: 'Weekly ordering calendar, marked in advance' },
      { slideNumber: 5, onScreenText: 'Lead time is a margin decision. Make it deliberately.', caption: COMPANY.cta.learn, visual: 'Sea Wind Foods end card' },
    ],
  ],
  quality_inconsistency: [
    [
      { slideNumber: 1, onScreenText: 'Spec sheets tell you what to expect.', caption: 'Delivery reality is a different story.', visual: 'Spec sheet next to actual product' },
      { slideNumber: 2, onScreenText: '1 in 3 deliveries shows spec variance beyond acceptable range.', caption: 'That variance lands on your food cost.', visual: 'Variance chart: spec vs. actual' },
      { slideNumber: 3, onScreenText: '$0.40/plate over-spec × 200 covers = $4,160/year.', caption: 'On one menu item.', visual: 'Per-portion cost math graphic' },
      { slideNumber: 4, onScreenText: 'Document spec tolerances. Track variance. Enforce accountability.', caption: 'Quality consistency is a supplier discipline issue.', visual: 'Spec document with tolerance ranges marked' },
      { slideNumber: 5, onScreenText: 'Hold your suppliers to written specs or change them.', caption: COMPANY.cta.consult, visual: 'Sea Wind Foods end card' },
    ],
  ],
}

// ── Reel scripts ──────────────────────────────────────────────────────────────

const REEL_SCRIPTS: Record<string, string[]> = {
  spoilage: [
    '[VISUAL: Walk-in refrigerator door opening]',
    "HOOK (0–2s): \"Your seafood margins aren't dying at the supplier. They're dying here.\"",
    '[VISUAL: Close-up of unlabeled seafood packages]',
    'LINE 1: "4–10% of seafood ordered never reaches a plate in most kitchens."',
    '[VISUAL: Walk-in temperature sensor reading]',
    'LINE 2: "Three things control your actual cost: receipt temperature, walk-in calibration, and FIFO compliance."',
    '[VISUAL: Operator checking labels]',
    'LINE 3: "Most operators track invoice price. These three determine your real cost per usable pound."',
    '[VISUAL: Clean walk-in with labeled product]',
    `CTA: "Audit your walk-in before your next supplier call. ${COMPANY.cta.audit}"`,
  ],
  supply_inconsistency: [
    '[VISUAL: Kitchen during service, server at pass]',
    "HOOK (0–2s): \"Why do you keep 86ing seafood? It's probably not your supplier.\"",
    '[VISUAL: Calendar showing short ordering window]',
    'LINE 1: "Operators ordering inside 48 hours face twice the stockout frequency of those planning 5–7 days out."',
    '[VISUAL: Order form with advance dates]',
    'LINE 2: "Lead time discipline is not a supplier quality — it\'s a planning discipline."',
    '[VISUAL: Consistent weekly supply schedule]',
    `CTA: "Build a supply system, not just a supplier list. ${COMPANY.cta.consult}"`,
  ],
  margin_loss: [
    '[VISUAL: P&L spreadsheet, seafood line highlighted]',
    'HOOK (0–2s): "Your theoretical food cost and your actual food cost are not the same number."',
    '[VISUAL: Walk-in, then portioning station, then order form]',
    'LINE 1: "The gap is always one of three things: spoilage, over-portioning, or mis-ordering."',
    '[VISUAL: Each cost source visualized]',
    'LINE 2: "Most operators run a theoretical cost. Few measure actual. That gap averages 4–9 food cost points on seafood."',
    '[VISUAL: Audit checklist]',
    `CTA: "Measure the gap before you negotiate the price. ${COMPANY.cta.audit}"`,
  ],
}

function getReelScript(painPoint: string): string[] {
  return REEL_SCRIPTS[painPoint] || REEL_SCRIPTS.spoilage
}

// ── Captions ──────────────────────────────────────────────────────────────────

const CAPTIONS: Record<string, string[]> = {
  spoilage: [
    `Seafood spoilage is the most expensive cost most operators aren't tracking.\n\n4–10% of product ordered never reaches a plate.\n\nThat's not a market problem. It's a walk-in management problem.\n\nAudit receipt temperature, walk-in calibration and FIFO compliance weekly.\n\nClose the gap before you renegotiate price.\n\n${COMPANY.cta.audit}\n\n#FoodCost #SeafoodOps #RestaurantOperations #FoodService`,
    `You don't have a seafood pricing problem.\n\nYou have a spoilage problem.\n\nTrack post-delivery, not just the invoice.\n\n${COMPANY.cta.audit}\n\n#FoodCost #SeafoodOperations #KitchenManagement`,
  ],
  supply_inconsistency: [
    `Consistent seafood availability is not a supplier gift. It's a system you build.\n\nOrdering window, backup sourcing, demand tracking — these are the controls.\n\n${COMPANY.cta.consult}\n\n#SeafoodSupply #FoodService #RestaurantOps #ProcurementStrategy`,
  ],
  price_volatility: [
    `Spot market seafood buyers pay 12–20% more than contracted buyers.\n\nEvery week.\n\nThat premium is not a market condition. It's a planning gap.\n\n${COMPANY.cta.learn}\n\n#FoodCost #SeafoodProcurement #RestaurantBusiness`,
  ],
  over_ordering: [
    `"Just order more to be safe" costs operators hundreds per week in spoilage.\n\nBuffer stock is not free risk management.\n\nAudit your par levels every 90 days.\n\n${COMPANY.cta.download}\n\n#InventoryManagement #FoodCost #RestaurantOperations`,
  ],
  margin_loss: [
    `The gap between theoretical and actual seafood food cost is not random.\n\nIt's spoilage, over-portioning and mis-ordering — every time.\n\nMeasure each one separately.\n\n${COMPANY.cta.audit}\n\n#FoodCost #SeafoodOps #RestaurantMargins`,
  ],
  cold_chain: [
    `Cold chain compliance doesn't end at the receiving dock.\n\nIt ends when every piece of product reaches the right temperature in storage — and stays there.\n\n${COMPANY.cta.audit}\n\n#ColdChain #FoodSafety #SeafoodStorage`,
  ],
  waste_inventory: [
    `Inventory shrink in seafood is 3–5% per delivery cycle for most operators.\n\nNone of it is inevitable.\n\nAll of it requires a system.\n\n${COMPANY.cta.consult}\n\n#FoodWaste #InventoryControl #FoodService`,
  ],
  logistics: [
    `Every seafood SKU on your menu is a logistics commitment you're paying for every week.\n\nMenu restraint in perishables is a margin strategy.\n\n${COMPANY.cta.consult}\n\n#SeafoodMenu #FoodCost #RestaurantOperations`,
  ],
  lead_time: [
    `Lead time discipline is one of the highest-leverage margin decisions in seafood sourcing.\n\nOrder earlier. Stockouts drop. Costs drop.\n\n${COMPANY.cta.learn}\n\n#SeafoodProcurement #FoodService #LeadTime`,
  ],
  quality_inconsistency: [
    `Spec variance from your supplier is a food cost problem that presents as a portion control problem.\n\nDocument tolerances. Track variance. Hold suppliers accountable.\n\n${COMPANY.cta.consult}\n\n#FoodQuality #SeafoodSpec #RestaurantOps`,
  ],
}

// ── Story sequences ───────────────────────────────────────────────────────────

const STORY_SEQUENCES: Record<string, string[]> = {
  spoilage: [
    'SLIDE 1 (text over dark bg): "Quick audit for seafood operators 👇"',
    'SLIDE 2: "When did you last check your walk-in temperature calibration?" [Poll: This week / Over a month ago]',
    'SLIDE 3: "When did you last audit FIFO compliance by SKU?" [Poll: This week / Over a month ago]',
    'SLIDE 4: "When did you last calculate theoretical vs. actual seafood food cost?" [Poll: This week / Over a month ago]',
    'SLIDE 5: "If you answered \'over a month ago\' to any of these — you have a spoilage cost you haven\'t measured."',
    `SLIDE 6 (CTA): "Get a walk-in audit framework. ${COMPANY.cta.audit}"`,
  ],
  price_volatility: [
    'SLIDE 1: "Are you buying seafood on spot or contract?" [Poll: Mostly spot / Mostly contract / Mix]',
    'SLIDE 2: "Spot buyers pay 12–20% more than contracted buyers for the same product."',
    'SLIDE 3: "If you\'re buying mostly spot, that premium is embedded in every order."',
    'SLIDE 4: "Contract 60% of your volume. Retain flexibility on the rest."',
    `SLIDE 5 (CTA): "Learn how to structure contract coverage. ${COMPANY.cta.learn}"`,
  ],
}

// ── Main generator ────────────────────────────────────────────────────────────

export function generateInstagram(inputs: InstagramInputs): InstagramOutput {
  const { painPoint, format, tone, angle, variantSeed = 0 } = inputs
  const stat = pickStat(painPoint, variantSeed)

  const carouselOptions = CAROUSELS[painPoint] || CAROUSELS.spoilage
  const slides = carouselOptions[variantSeed % carouselOptions.length]
  const reelScript = getReelScript(painPoint)
  const captionOptions = CAPTIONS[painPoint] || CAPTIONS.spoilage
  const caption = captionOptions[variantSeed % captionOptions.length]
  const storySequence = STORY_SEQUENCES[painPoint] || STORY_SEQUENCES.spoilage

  const visualHook =
    format === 'reel'
      ? reelScript[0]
      : format === 'carousel'
      ? slides[0].visual
      : `Operator-perspective shot with text overlay: "${slides[0].onScreenText}"`

  const onScreenText = slides[0].onScreenText

  const script = format === 'reel' ? reelScript : format === 'story' ? storySequence : slides.map((s) => `Slide ${s.slideNumber}: ${s.onScreenText}`)

  const suggestedVisuals = [
    'Commercial kitchen walk-in, clinical lighting, no people',
    'Operator reviewing order sheets at a prep table',
    'Close-up of seafood packaging with date labels',
    'Walk-in temperature sensor or probe reading',
    'Clean end card: Sea Wind Foods wordmark on navy background',
    format === 'carousel' ? 'Minimal data graphic slides with high-contrast text' : 'B-roll: cold storage, receiving dock, portioning station',
  ]

  const score = scoreContent({
    painPoint: inputs.painPoint,
    angle,
    tone,
    hasSpecificData: (caption + slides.map((s) => s.caption).join(' ')).match(/\d+/) !== null,
    hasCTA: caption.includes('seawindfoods'),
    hasFinancialConsequence: true,
    hasOperationalDetail: format === 'carousel' || format === 'reel',
    wordCount: caption.split(/\s+/).length,
    platform: 'instagram',
  })

  return {
    visualHook,
    onScreenText,
    script,
    slides: format === 'carousel' ? slides : undefined,
    caption,
    cta: COMPANY.cta.audit,
    suggestedVisuals,
    repurposingSuggestions: [
      'Use carousel slide 1 as a Twitter/X contrarian opening line',
      'Expand caption into a LinkedIn post with added body paragraphs',
      'Convert reel script into a YouTube short (same structure works natively)',
      'Use the story poll sequence as a Facebook discussion prompt',
      'Extract the data stat from slide 2–3 as a standalone Twitter/X single post',
    ],
    score,
  }
}

export function regenerateInstagram(inputs: InstagramInputs, variant: string): InstagramOutput {
  const seedMap: Record<string, number> = { more_direct: 1, more_executive: 2, more_contrarian: 0, shorter: 0, more_specific: 2 }
  const newFormat: InstagramFormat = variant === 'shorter' ? 'caption' : inputs.format
  return generateInstagram({ ...inputs, format: newFormat, variantSeed: seedMap[variant] ?? 1 })
}
