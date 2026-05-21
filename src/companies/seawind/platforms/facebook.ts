import type { FacebookInputs, FacebookOutput, FacebookFormat } from '../types'
import { COMPANY, pickStat } from '../lib/companyProfile'
import { scoreContent } from '../lib/scoring'

// ── Short posts ──────────────────────────────────────────────────────────────

const SHORT_POSTS: Record<string, string[]> = {
  spoilage: [
    `Quick check for operators: when did you last audit your walk-in for spoilage?\n\nNot your invoice price. Your actual product loss after delivery.\n\nFor most operations, that number is higher than you think — and most of it is preventable.\n\n${COMPANY.cta.audit}`,
    `Seafood spoilage doesn't show up on invoices. It shows up in food cost variance at the end of the month.\n\nIf your theoretical and actual food cost aren't matching, the walk-in is usually the reason.\n\n${COMPANY.cta.audit}`,
  ],
  supply_inconsistency: [
    `If you're regularly running out of seafood mid-service, the ordering window is usually the issue — not your supplier.\n\nOrdering 5–7 days out cuts stockout frequency dramatically.\n\nHas your ordering schedule kept up with current lead times?\n\n${COMPANY.cta.consult}`,
  ],
  price_volatility: [
    `Seafood pricing has been volatile this year. If you're buying mostly on the spot market, you've absorbed more of that swing than you needed to.\n\nContract coverage locks in predictable cost on your core volume.\n\n${COMPANY.cta.learn}`,
  ],
  over_ordering: [
    `"Just order extra to be safe" — this habit costs most operators hundreds of dollars per week in seafood spoilage.\n\nBuffer stock is not risk management. It's just paying for waste in advance.\n\nWhen did you last review your seafood par levels?\n\n${COMPANY.cta.download}`,
  ],
  margin_loss: [
    `Here's a number worth calculating: the difference between your theoretical seafood food cost and your actual one.\n\nFor most operators, that gap is 4–9 food cost points.\n\nIt's not random — it's spoilage, over-portioning, and mis-ordering. All fixable.\n\n${COMPANY.cta.audit}`,
  ],
  cold_chain: [
    `Your receiving check is not your cold chain. It's the start of it.\n\nTemperature management in storage determines shelf life more than delivery temperature does.\n\nWhen did you last calibrate your walk-in sensors?\n\n${COMPANY.cta.audit}`,
  ],
  waste_inventory: [
    `Seafood inventory shrink of 3–5% per delivery cycle is common. It's also largely preventable.\n\nLabeling at receipt, consistent FIFO practice and daily oldest-product review eliminate most of it.\n\nNone of that requires new equipment — just a system.\n\n${COMPANY.cta.consult}`,
  ],
  logistics: [
    `How many seafood SKUs are on your current menu?\n\nEvery SKU adds ordering complexity, receiving overhead and spoilage risk.\n\nMenu restraint in perishables is a margin strategy. Sometimes fewer items means better margins.\n\n${COMPANY.cta.consult}`,
  ],
  lead_time: [
    `Lead times for specialty seafood are significantly longer than they were a few years ago.\n\nIf your ordering schedule hasn't adapted, you're probably paying a rush premium — or running short more often.\n\n${COMPANY.cta.learn}`,
  ],
  quality_inconsistency: [
    `If your seafood comes in off-spec regularly, that variance is showing up in your food cost whether you're tracking it or not.\n\nSpec tolerances should be documented and verified at every delivery.\n\n${COMPANY.cta.consult}`,
  ],
}

// ── Educational posts ─────────────────────────────────────────────────────────

const EDUCATIONAL_POSTS: Record<string, string> = {
  spoilage: `Most operators know seafood is a high-cost, high-risk protein. Fewer know exactly where the cost goes after delivery.

Here's a breakdown of the three main post-delivery cost events in seafood:

**1. Receipt failures**
Product arrives above target temperature, outside spec, or short in weight. This is the most visible failure but often gets absorbed without documentation.

**2. Storage failures**
Walk-in temperature drift, improper FIFO rotation, and overcrowding all reduce usable shelf life. These failures are invisible on any invoice.

**3. Prep failures**
Over-portioning, excessive trim loss, and prep-to-demand misalignment all add cost that never appears as "spoilage" but operates the same way.

The result: actual seafood food cost typically runs 4–9 points higher than theoretical for operations without systematic controls on all three.

The fix doesn't require new suppliers. It requires consistent measurement of each stage and a system for catching variance early.

${COMPANY.cta.audit}`,

  supply_inconsistency: `Why do restaurants consistently run short on seafood despite working with "reliable" suppliers?

Usually it comes down to three gaps:

**1. Ordering timing**
Most 86s happen because orders were placed too close to the service window. A 48-hour order on fresh seafood leaves almost no recovery time if the supplier has an issue.

**2. No backup sourcing**
Single-source purchasing creates fragility. When the primary source misses, there's no fallback — and scrambling on short notice costs 18–25% more per unit.

**3. Demand forecasting**
Par levels set months ago rarely match current demand patterns. Seasonal variation, menu changes and day-of-week patterns all shift the right quantity — but order sheets rarely keep up.

Building consistent seafood availability means addressing all three.

${COMPANY.cta.consult}`,

  price_volatility: `Seafood is one of the most price-volatile proteins you can source. Understanding what drives that volatility helps you manage your exposure.

**Wild-caught volatility drivers:**
— Harvest cycle unpredictability
— Fuel cost impact on fleet operations
— Weather and seasonal access restrictions
— International competition for the same catch

**Farmed seafood volatility drivers:**
— Feed price fluctuations (corn, soy)
— Disease events affecting specific regions or species
— Currency movements in major producing countries

**What operators control:**
None of the above. But operators do control their purchasing structure — specifically, how much volume they buy on contract vs. spot.

Spot purchasing means absorbing 100% of market movements. Contract purchasing locks in cost stability on a portion of your volume in exchange for predictability.

The operators who manage seafood cost best are not those who predict the market well. They are those who reduce how much of the market they're exposed to.

${COMPANY.cta.learn}`,

  margin_loss: `The gap between theoretical and actual seafood food cost is one of the most consistent — and underexamined — problems in foodservice.

Here is what drives it:

**Spoilage (typically 4–10% of ordered volume)**
Product ordered but never sold. Visible in walk-in, invisible on daily reports.

**Over-portioning (typically 0.5–1.5 oz per plate)**
At $0.40–$1.20 per portion over-spec, 200 covers per week = $4,000–$12,000 per year on one protein.

**Mis-ordering (bi-directional)**
Over-ordering drives spoilage. Under-ordering drives 86s and emergency sourcing costs. Both compound over time.

Each of these has a specific measurement approach and a specific fix. None of them require changing suppliers.

Operators who audit all three systematically recover $18,000–$45,000 per year in margin.

${COMPANY.cta.audit}`,
}

// ── Discussion prompts ────────────────────────────────────────────────────────

const DISCUSSION_PROMPTS: Record<string, string> = {
  spoilage: `Question for restaurant operators and kitchen managers:

How do you currently track actual vs. theoretical seafood food cost?

We're curious whether operators are:
a) Tracking it weekly
b) Tracking it monthly
c) Using theoretical only
d) Not tracking the gap at all

This one metric determines how much of your seafood spend is actually recoverable. Would love to hear how people are handling it in practice.

(Comments are open — no sales pitch, just genuinely curious what the field looks like on this.)`,

  supply_inconsistency: `Question for those sourcing seafood for restaurants or hospitality operations:

What's your current lead time for placing seafood orders?

a) 24–48 hours
b) 3–4 days
c) 5–7 days
d) Varies by species/supplier

We're looking at the relationship between ordering windows and stockout frequency. Anecdotally, 5–7 day ordering windows seem to dramatically reduce 86s — but curious what's realistic for different operation types.`,

  price_volatility: `For foodservice operators: how are you managing seafood cost volatility right now?

a) Mostly spot purchasing — adjusting as the market moves
b) Mix of contract and spot
c) Primarily contracted volume
d) Haven't really formalized it

There's no right answer here — every operation has different constraints. But curious about the split and what's driven your current approach.`,

  over_ordering: `Honest question: when did you last update your seafood par levels?

a) In the last 30 days
b) In the last quarter
c) 6+ months ago
d) I don't think we have formal par levels

Par levels that haven't been reviewed in 6+ months are usually either over (driving weekly spoilage) or under (driving weekly 86s).\n\nCurious how often operators actually revisit these.`,
}

// ── Business owner posts ─────────────────────────────────────────────────────

const BUSINESS_OWNER_POSTS: Record<string, string> = {
  spoilage: `To other restaurant and foodservice owners:

The one habit that has the most leverage on seafood food cost is not price negotiation.

It's a weekly walk-in audit.

Walk-in temperature calibration. FIFO compliance by SKU. Intake temperature log at delivery.

Three numbers. Tracked weekly. They determine whether your actual food cost matches your theoretical one.

If you're not running these three checks, you likely have a 4–9 point food cost gap on seafood that has nothing to do with market pricing.

${COMPANY.cta.audit}`,

  margin_loss: `Something I want every independent restaurant owner to calculate once:

Theoretical seafood food cost vs. actual seafood food cost. This month. With real numbers.

Most operations find a 4–9 point gap. That gap has three sources: spoilage, over-portioning and mis-ordering.

All three are measurable. All three are fixable. None of them require a new supplier or a lower price.

The operators who close this gap recover tens of thousands of dollars per year in margin.

Run the calculation once. It changes how you look at your seafood spend.

${COMPANY.cta.audit}`,
}

// ── Retargeting posts ─────────────────────────────────────────────────────────

const RETARGETING_POSTS: Record<string, string> = {
  spoilage: `If you've been thinking about your seafood food cost lately — specifically the gap between what you're ordering and what's actually reaching plates —

Sea Wind Foods works with foodservice operators on exactly that.

Not just supply. Sourcing structure, spec accountability and post-delivery cost controls.

${COMPANY.cta.audit}`,

  supply_inconsistency: `Still running short on seafood?

Most operators who contact us have the same pattern: single-source purchasing, short ordering windows and no formal backup.

We help operators build a sourcing system that removes the inconsistency.

${COMPANY.cta.consult}`,

  price_volatility: `If seafood cost unpredictability is affecting your margins, the issue is almost always purchasing structure — not market conditions.

Sea Wind Foods helps operators reduce spot market exposure through contracted volume and reliable sourcing.

${COMPANY.cta.learn}`,
}

// ── Practical takeaways ───────────────────────────────────────────────────────

const PRACTICAL_TAKEAWAYS: Record<string, string> = {
  spoilage: 'Audit three things weekly: intake temperature at receipt, walk-in calibration and FIFO compliance by SKU. These three controls determine your real cost per usable pound.',
  supply_inconsistency: 'Extend your ordering window to 5–7 days for core seafood SKUs. Add at least one backup source for your highest-volume items.',
  price_volatility: 'Contract at least 60% of your top-spend seafood volume. Track contracted vs. spot cost monthly to measure the premium you\'re avoiding.',
  over_ordering: 'Review par levels quarterly. Cross-reference order history with actual usage — not theoretical — for each SKU.',
  margin_loss: 'Calculate theoretical vs. actual seafood food cost this month. Identify which of the three drivers (spoilage, portioning, ordering) is largest.',
  cold_chain: 'Place temperature sensors throughout your walk-in, not just at the door. Log readings twice daily for the first week after delivery.',
  waste_inventory: 'Label every seafood package with receipt date at delivery. Review and prioritize oldest product at the start of every prep shift.',
  logistics: 'Count your current seafood SKUs and calculate ordering, receiving and storage overhead per SKU. Let that math guide your next menu review.',
  lead_time: 'Set ordering schedules 5–7 days in advance for specialty seafood. Use calendar blocking — not reactive ordering — as your default.',
  quality_inconsistency: 'Document spec tolerances with acceptable variance ranges for every seafood SKU. Verify against spec at every delivery, not just on complaint.',
}

// ── Discussion questions ─────────────────────────────────────────────────────

const DISCUSSION_QUESTIONS: Record<string, string> = {
  spoilage: 'How do you currently track the gap between theoretical and actual seafood food cost?',
  supply_inconsistency: 'What\'s your current lead time for placing seafood orders, and has it changed in the last two years?',
  price_volatility: 'Are you using contracted volume or spot purchasing for your core seafood items right now?',
  over_ordering: 'When did you last formally review your seafood par levels?',
  margin_loss: 'Have you ever calculated your actual vs. theoretical seafood food cost? What did you find?',
  cold_chain: 'How often do you verify walk-in temperature calibration beyond the door sensor?',
  waste_inventory: 'What\'s your current system for enforcing FIFO on seafood in the walk-in?',
  logistics: 'How many seafood SKUs does your current menu require, and has that number increased recently?',
  lead_time: 'Are your current seafood ordering windows aligned with your suppliers\' actual lead times?',
  quality_inconsistency: 'Do you have documented spec tolerance ranges for every seafood SKU you carry?',
}

// ── Main generator ────────────────────────────────────────────────────────────

export function generateFacebook(inputs: FacebookInputs): FacebookOutput {
  const { painPoint, format, tone, angle, variantSeed = 0 } = inputs

  let primaryPost = ''
  if (format === 'short') {
    const options = SHORT_POSTS[painPoint] || SHORT_POSTS.spoilage
    primaryPost = options[variantSeed % options.length]
  } else if (format === 'educational') {
    primaryPost = EDUCATIONAL_POSTS[painPoint] || EDUCATIONAL_POSTS.spoilage
  } else if (format === 'discussion') {
    primaryPost = DISCUSSION_PROMPTS[painPoint] || DISCUSSION_PROMPTS.spoilage
  } else if (format === 'business_owner') {
    primaryPost = BUSINESS_OWNER_POSTS[painPoint] || BUSINESS_OWNER_POSTS.spoilage
  } else if (format === 'retargeting') {
    primaryPost = RETARGETING_POSTS[painPoint] || RETARGETING_POSTS.spoilage
  }

  const score = scoreContent({
    painPoint: inputs.painPoint,
    angle,
    tone,
    hasSpecificData: primaryPost.match(/\d+/) !== null,
    hasCTA: primaryPost.includes('seawindfoods'),
    hasFinancialConsequence: format !== 'discussion',
    hasOperationalDetail: format === 'educational' || format === 'business_owner',
    wordCount: primaryPost.split(/\s+/).length,
    platform: 'facebook',
  })

  return {
    primaryPost,
    practicalTakeaway: PRACTICAL_TAKEAWAYS[painPoint] || PRACTICAL_TAKEAWAYS.spoilage,
    cta: format === 'retargeting' ? COMPANY.cta.consult : COMPANY.cta.audit,
    discussionQuestion: DISCUSSION_QUESTIONS[painPoint] || DISCUSSION_QUESTIONS.spoilage,
    repurposingSuggestions: [
      'Adapt the educational post into a LinkedIn long-form article',
      'Pull the discussion prompt as a Twitter/X engagement question',
      'Convert the practical takeaway into an Instagram carousel final slide',
      'Use the short post as a YouTube video description',
      'Adapt the business owner post as a founder-style Twitter/X post',
    ],
    score,
  }
}

export function regenerateFacebook(inputs: FacebookInputs, variant: string): FacebookOutput {
  const seedMap: Record<string, number> = { more_direct: 1, more_executive: 2, more_contrarian: 0, shorter: 0, more_specific: 2 }
  const newFormat: FacebookFormat = variant === 'shorter' ? 'short' : variant === 'more_specific' ? 'educational' : inputs.format
  return generateFacebook({ ...inputs, format: newFormat, variantSeed: seedMap[variant] ?? 1 })
}
