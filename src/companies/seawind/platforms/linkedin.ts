import type { LinkedInInputs, LinkedInOutput, LinkedInPostIdea, LinkedInPost, LinkedInCalendarDay } from '../types'
import { COMPANY, pickStat } from '../lib/companyProfile'
import { scoreContent } from '../lib/scoring'

// ── Hook library ──────────────────────────────────────────────────────────────

const HOOKS: Record<string, string[][]> = {
  spoilage: [
    [
      'Your seafood margins are not shrinking at the supplier.',
      'They are disappearing in your walk-in.',
    ],
    [
      'Most operators track seafood cost at purchase.',
      'The real loss happens after the delivery truck leaves.',
    ],
    [
      'Spoilage is a silent cost center.',
      'Most operators have never audited it properly.',
    ],
  ],
  supply_inconsistency: [
    [
      '86s on seafood do not happen because of market shortages.',
      'They happen because of reactive ordering patterns.',
    ],
    [
      'Your seafood supplier said "available."',
      'That is not the same as "reliable."',
    ],
    [
      'Supplier reliability is the metric most operators never track.',
      'It should be the first one they do.',
    ],
  ],
  price_volatility: [
    [
      'Seafood pricing shifted significantly in the last two quarters.',
      'Your menu prices did not move with it.',
    ],
    [
      "You can't negotiate away market volatility.",
      'You can manage your exposure to it.',
    ],
    [
      'Spot purchasing seafood feels flexible.',
      'It compounds into one of your largest avoidable costs.',
    ],
  ],
  waste_inventory: [
    [
      'FIFO sounds simple.',
      'The execution gap is where seafood budgets go wrong.',
    ],
    [
      'Your oldest seafood is your most expensive seafood.',
      'Most operators do not treat it that way.',
    ],
    [
      'Inventory shrink in seafood is not random.',
      'It follows predictable patterns that most operators overlook.',
    ],
  ],
  cold_chain: [
    [
      'A cold chain failure does not announce itself.',
      'It shows up in spoilage figures and health inspections.',
    ],
    [
      'Temperature variance between your supplier and your walk-in is a cost no one accounts for.',
      'Every degree above target accelerates spoilage.',
    ],
    [
      'Cold chain breakdowns are rarely catastrophic.',
      'They are gradual — and expensive.',
    ],
  ],
  over_ordering: [
    [
      'Ordering extra seafood "just in case" is the most expensive insurance policy in foodservice.',
      "And it pays out to no one.",
    ],
    [
      'Par levels set six months ago are costing you today.',
      'Demand patterns change. Order sheets rarely do.',
    ],
    [
      'The instinct to over-order protects you from stockouts.',
      'It creates a different problem: predictable weekly waste.',
    ],
  ],
  margin_loss: [
    [
      'Seafood margin loss has three sources.',
      'Most operators only look at one.',
    ],
    [
      'The gap between theoretical food cost and actual food cost has a name.',
      'It is spoilage, over-portioning, and mis-ordering.',
    ],
    [
      'Your seafood is not expensive because of market price.',
      'It is expensive because of what happens to it after it arrives.',
    ],
  ],
  logistics: [
    [
      'Three-day delivery windows for seafood are not a supplier problem.',
      'They are a planning problem.',
    ],
    [
      'Logistics complexity in perishables compounds with every additional SKU.',
      'Most operators add SKUs without adjusting their receiving infrastructure.',
    ],
    [
      'Split seafood deliveries feel like a sourcing advantage.',
      'They create a coordination cost most operators never measure.',
    ],
  ],
  lead_time: [
    [
      'Lead times for specialty seafood have extended 30–45% since 2022.',
      'Most menus have not adapted.',
    ],
    [
      'If your supplier cannot commit to lead times, you cannot commit to your menu.',
      'That is not a scheduling problem. It is a sourcing problem.',
    ],
    [
      'Reactive ordering on short lead times costs 18–25% more per unit.',
      'The urgency premium is predictable. So is the alternative.',
    ],
  ],
  quality_inconsistency: [
    [
      'Spec sheets tell you what to expect.',
      'Delivery reality is a different conversation.',
    ],
    [
      'Inconsistent portioning across deliveries is a food cost problem.',
      'It presents itself as a labor problem.',
    ],
    [
      'Quality variance from a supplier compounds every time you use that protein.',
      'A $0.60 per-portion gap is a $2,100 annual problem on one menu item.',
    ],
  ],
}

// ── Body library ──────────────────────────────────────────────────────────────

const BODY_BLOCKS: Record<string, string[][]> = {
  spoilage: [
    [
      'Most restaurant operators focus on invoice price when analyzing seafood costs.',
      'The invoice is not where the margin goes.',
      'Walk-in turnover rates, handling procedures and delivery timing determine how much of what you bought you actually sell.',
      'A case of salmon purchased at a favorable rate still costs you money if 15% of it spoils before service.',
      'The operators who control seafood costs best are not the ones negotiating hardest on price.',
      'They are the ones running tight intake-to-plate tracking.',
    ],
    [
      'There are three moments where seafood loses value before it reaches a plate.',
      'The first is delivery — temperature variance, spec mismatch, short weight.',
      'The second is storage — FIFO violations, walk-in temperature drift, over-stocking.',
      'The third is prep — over-portioning, trim loss, prep-to-demand misalignment.',
      'Each one is measurable. Most operators measure none of them systematically.',
      'That gap between theoretical and actual food cost is where margins disappear.',
    ],
  ],
  supply_inconsistency: [
    [
      'An 86 on a seafood menu item is not just a service problem.',
      'It is a revenue event — lost covers, table dissatisfaction, and server disruption.',
      "Most 86s are predictable 48–72 hours in advance if you're tracking supply signals.",
      'The operators who avoid them have systems, not luck.',
      'They know their supplier lead times. They know their demand patterns.',
      'They order ahead of the window, not inside it.',
    ],
    [
      'Single-source seafood supply is a convenience that becomes a liability.',
      'When that source misses — and every supplier misses — you have no fallback.',
      'Consistent seafood supply requires a combination of contracted volume, backup sourcing and lead-time discipline.',
      'Most operators have one of those three. The ones with consistent availability have all three.',
    ],
  ],
  price_volatility: [
    [
      'Seafood is one of the most price-volatile proteins in foodservice.',
      'Wild-caught species swing with harvest cycles, fuel costs and weather.',
      'Farmed species respond to feed prices, disease events and currency shifts.',
      'The operators who manage this best are not the ones who guess the market correctly.',
      'They are the ones who reduce spot purchasing exposure through contracted volume.',
      'You cannot eliminate volatility. You can decide how much of it you absorb.',
    ],
    [
      'Spot purchasing feels like flexibility. The math tells a different story.',
      'Operators buying on the spot market consistently pay 12–20% more than contracted buyers for the same product.',
      'That premium is not a market cost. It is a planning cost.',
      'Contracts give suppliers predictability. Suppliers give discounts for predictability.',
      "If you're not contracting volume, you're paying the uncertainty tax every week.",
    ],
  ],
  waste_inventory: [
    [
      'Seafood inventory follows a simple decay curve.',
      'Value drops steeply after day 2 of receipt. By day 4, options narrow.',
      "Most operators don't have visibility into where product is in that curve.",
      "They find out when they're trimming the order, not before.",
      'Real inventory discipline means knowing sell-by windows on every seafood SKU in your walk-in at all times.',
      'That is not complicated. It requires a system and the discipline to follow it.',
    ],
  ],
  cold_chain: [
    [
      'Cold chain compliance is assumed at delivery and forgotten afterward.',
      'Most operators check temperature on arrival. Few track it during storage.',
      'A walk-in that reads 38°F at the door sensor can run 42°F in the back corner.',
      "That 4-degree gap doesn't show on your receiving log.",
      'It shows in spoilage figures two days later.',
      'Temperature monitoring after receipt is not optional for operators running tight seafood margins.',
    ],
  ],
  over_ordering: [
    [
      'Over-ordering feels like risk management. It is actually risk transfer.',
      'You transfer the risk from stockout to spoilage.',
      'Stockout has a cost. Spoilage has a cost. Neither is zero.',
      'The question is not which one to avoid — it is which one you can actually control.',
      'Spoilage from over-ordering is a planning problem. Stockout from under-ordering is a forecast problem.',
      'Both are solvable with better data on your actual demand patterns.',
    ],
  ],
  margin_loss: [
    [
      'Most operators run a theoretical food cost on seafood. Few run an actual one.',
      'The gap between those two numbers — typically 4–9 points for seafood — is not mystery.',
      'It is the sum of spoilage, over-portioning, spec variance and ordering inefficiency.',
      'Each of those is a specific problem with a specific fix.',
      'The operators who close the gap start by measuring it precisely, not estimating it broadly.',
    ],
  ],
  logistics: [
    [
      'Each seafood SKU you add to your menu is a logistics commitment, not just a menu decision.',
      'More SKUs mean more delivery schedules, more receiving windows, more spec sheets and more spoilage risk.',
      'The operations overhead of a 12-seafood-SKU menu is not 2x a 6-SKU menu. It is closer to 4x.',
      'Menu complexity in perishables is a cost decision most operators make without the full math.',
    ],
  ],
  lead_time: [
    [
      'Lead time discipline is the unglamorous foundation of seafood availability.',
      'Operators who place 48-hour orders face 2x the stockout frequency of those ordering 5–7 days out.',
      'The difference is not supplier performance. It is order timing.',
      'Extended lead times reduce your supplier\'s scramble — and their scramble cost lands on your invoice.',
      'Ordering ahead is not a luxury in perishables. It is a margin decision.',
    ],
  ],
  quality_inconsistency: [
    [
      'Quality inconsistency across seafood suppliers is not a sourcing problem alone.',
      'It is a portion cost problem, a labor problem and a guest experience problem.',
      "When fillets run 20% over spec one week and 15% under the next, your food cost doesn't match your menu price.",
      'The variance compounds across every cover where that protein appears.',
      'Tight specs and supplier accountability are not procurement details. They are margin controls.',
    ],
  ],
}

// ── Post ideas (10, one per pain point) ──────────────────────────────────────

function buildPostIdeas(): LinkedInPostIdea[] {
  const ideas: LinkedInPostIdea[] = [
    { title: 'The Three Places Seafood Margin Disappears', angle: 'Walk-in, storage, prep — not the invoice', painClarity: 23, financialImpact: 22, tension: 21, rank: 0 },
    { title: 'Why 86s on Seafood Are a Planning Problem, Not a Supply Problem', angle: 'Reactive ordering creates predictable stockouts', painClarity: 22, financialImpact: 20, tension: 23, rank: 0 },
    { title: 'Spot Purchasing Seafood Is a Tax You Choose to Pay', angle: 'The cost of flexibility in a volatile protein category', painClarity: 20, financialImpact: 24, tension: 22, rank: 0 },
    { title: 'Your Cold Chain Has a Temperature Problem You Cannot See', angle: 'Sensor location vs. actual storage conditions', painClarity: 19, financialImpact: 20, tension: 22, rank: 0 },
    { title: 'Over-Ordering Seafood Is Not Risk Management', angle: 'It transfers spoilage risk without eliminating it', painClarity: 21, financialImpact: 21, tension: 20, rank: 0 },
    { title: 'The Gap Between Theoretical and Actual Seafood Cost Has a Name', angle: 'Spoilage, over-portioning, mis-ordering — not market conditions', painClarity: 22, financialImpact: 23, tension: 21, rank: 0 },
    { title: 'Each Seafood SKU Is a Logistics Commitment', angle: 'Menu complexity in perishables is not free', painClarity: 17, financialImpact: 18, tension: 19, rank: 0 },
    { title: 'Lead Time Discipline Is a Margin Decision', angle: '48-hour ordering vs. 5-day ordering: the real cost difference', painClarity: 18, financialImpact: 20, tension: 19, rank: 0 },
    { title: 'Spec Variance from Suppliers Is a Portion Cost Problem', angle: 'Quality inconsistency shows up in food cost before it shows in reviews', painClarity: 19, financialImpact: 21, tension: 20, rank: 0 },
    { title: 'FIFO in Seafood Is Not a Policy Problem — It Is a Visibility Problem', angle: 'You cannot rotate what you cannot track', painClarity: 20, financialImpact: 19, tension: 18, rank: 0 },
  ]

  // Rank by composite score
  const ranked = [...ideas].sort(
    (a, b) => b.painClarity + b.financialImpact + b.tension - (a.painClarity + a.financialImpact + a.tension)
  )
  return ranked.map((idea, i) => ({ ...idea, rank: i + 1 }))
}

// ── Full post builder ─────────────────────────────────────────────────────────

function buildFullPost(inputs: LinkedInInputs): LinkedInPost {
  const { painPoint, angle, tone, variantSeed = 0 } = inputs
  const hooks = HOOKS[painPoint] || HOOKS.spoilage
  const bodies = BODY_BLOCKS[painPoint] || BODY_BLOCKS.spoilage
  const hook = hooks[variantSeed % hooks.length]
  const body = bodies[variantSeed % bodies.length]
  const stat = pickStat(painPoint, variantSeed)

  const toneModifiers: Record<string, string> = {
    contrarian: `The conventional guidance says to keep buffer stock. The math says the buffer is the problem.`,
    financial_impact: `The financial consequence: ${stat.stat} — ${stat.impact}.`,
    data_driven: `The data supports this: ${stat.stat}, which translates to ${stat.impact}.`,
    operator_story: `Consider the operator running a 200-cover restaurant. ${stat.stat} — that is ${stat.impact} per year.`,
    process_breakdown: `The process failure is specific: ${stat.stat}. The result is ${stat.impact}.`,
    challenge_assumption: `The assumption most operators hold is wrong here. ${stat.stat}.`,
  }

  const businessImpact = toneModifiers[tone] || toneModifiers[angle] || `Data point: ${stat.stat}.`

  const ctaOptions = [
    COMPANY.cta.audit,
    COMPANY.cta.consult,
    COMPANY.cta.download,
    COMPANY.cta.learn,
  ]
  const cta = ctaOptions[variantSeed % ctaOptions.length]

  return { hook, body, businessImpact, cta }
}

// ── 30-day calendar ──────────────────────────────────────────────────────────

function buildCalendar(): LinkedInCalendarDay[] {
  const days: LinkedInCalendarDay[] = [
    { day: 1, topic: 'Seafood spoilage as a cost center', hook: 'Your walk-in is not a storage unit. It is a cost management tool.', angle: 'Reframe the walk-in as a financial asset, not just storage', cta: COMPANY.cta.audit },
    { day: 3, topic: 'The true cost of over-ordering', hook: 'Over-ordering seafood by 10% inflates your net cost per usable pound by up to 14%.', angle: 'Put a number to the "just in case" habit', cta: COMPANY.cta.download },
    { day: 5, topic: 'Supply inconsistency vs. supplier unreliability', hook: 'Not every 86 is your supplier\'s fault. Most are an ordering timing problem.', angle: 'Shift operator mindset from blame to process', cta: COMPANY.cta.consult },
    { day: 7, topic: 'Cold chain reality check', hook: 'Your receiving log says 38°F. Your back walk-in shelf may say 43°F.', angle: 'Create tension between what operators assume and what is actually happening', cta: COMPANY.cta.audit },
    { day: 10, topic: 'Price volatility vs. price exposure', hook: 'You cannot control market price. You can control how much of it you absorb.', angle: 'Distinguish between uncontrollable market forces and controllable sourcing structure', cta: COMPANY.cta.learn },
    { day: 12, topic: 'Spec variance as a portion cost driver', hook: 'When fillets run off-spec by 15%, your theoretical food cost becomes fiction.', angle: 'Connect quality inconsistency to actual P&L impact', cta: COMPANY.cta.consult },
    { day: 14, topic: 'Lead time discipline', hook: 'Operators who order 5+ days out face half the stockout frequency of 48-hour buyers.', angle: 'Data-driven case for planning over reactivity', cta: COMPANY.cta.learn },
    { day: 17, topic: 'The real source of seafood margin loss', hook: 'Seafood cost is not an invoice problem. It is a post-delivery management problem.', angle: 'Reframe the origin of margin loss', cta: COMPANY.cta.download },
    { day: 19, topic: 'Menu SKU complexity in perishables', hook: 'A 12-seafood-SKU menu costs 4x more to operate than a 6-SKU menu. Most operators do not know that.', angle: 'Quantify the hidden operational cost of menu complexity', cta: COMPANY.cta.consult },
    { day: 21, topic: 'FIFO failure is a visibility problem', hook: 'You cannot rotate what you cannot see. Most seafood walk-ins lack the labeling to enforce FIFO reliably.', angle: 'Process breakdown rather than operator error framing', cta: COMPANY.cta.audit },
    { day: 24, topic: 'Spot purchasing math', hook: 'Spot market buyers pay 12–20% more than contracted buyers for the same seafood. That is not a market problem.', angle: 'Contrarian take on "flexibility" in sourcing', cta: COMPANY.cta.learn },
    { day: 26, topic: 'Inventory shrink is not accidental', hook: 'Seafood inventory shrink of 3–5% per delivery cycle is normal. None of it is inevitable.', angle: 'Normalize the problem, then challenge the acceptance of it', cta: COMPANY.cta.download },
    { day: 28, topic: 'Single-source risk in seafood', hook: 'One supplier feels efficient. When it misses, there is no backup. That efficiency becomes fragility.', angle: 'Reframe single-source convenience as a structural risk', cta: COMPANY.cta.consult },
    { day: 30, topic: 'Closing the theoretical vs. actual food cost gap', hook: 'The gap between your theoretical and actual seafood food cost is not a mystery. It is a sum of specific, fixable failures.', angle: 'Actionable framing to end the month with a clear call to audit', cta: COMPANY.cta.audit },
  ]
  return days
}

// ── Main generator ────────────────────────────────────────────────────────────

export function generateLinkedIn(inputs: LinkedInInputs): LinkedInOutput {
  const post = buildFullPost(inputs)
  const allText = [...post.hook, ...post.body, post.businessImpact, post.cta].join(' ')
  const wordCount = allText.split(/\s+/).length

  const score = scoreContent({
    painPoint: inputs.painPoint,
    angle: inputs.angle,
    tone: inputs.tone,
    hasSpecificData: post.businessImpact.match(/\d+/) !== null,
    hasCTA: post.cta.length > 0,
    hasFinancialConsequence: true,
    hasOperationalDetail: post.body.length > 2,
    wordCount,
    platform: 'linkedin',
  })

  return {
    postIdeas: buildPostIdeas(),
    fullPost: post,
    calendar: buildCalendar(),
    repurposingSuggestions: [
      'Convert the hook into a Twitter/X contrarian take',
      'Expand the body into a YouTube short script (problem → cost → fix)',
      'Turn the business impact stat into an Instagram carousel slide',
      'Use the CTA as the basis for a Facebook retargeting post',
      'Archive as a content asset for the next quarterly newsletter',
    ],
    score,
  }
}

export function regenerateLinkedIn(inputs: LinkedInInputs, variant: string): LinkedInOutput {
  const seedMap: Record<string, number> = {
    more_direct: 1,
    more_executive: 2,
    more_contrarian: 0,
    shorter: 1,
    more_specific: 2,
  }
  return generateLinkedIn({ ...inputs, variantSeed: seedMap[variant] ?? 1, tone: variant === 'more_contrarian' ? 'contrarian' : inputs.tone })
}
