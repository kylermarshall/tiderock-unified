import type { TwitterInputs, TwitterOutput, TwitterFormat } from '../types'
import { COMPANY, pickStat } from '../lib/companyProfile'
import { scoreContent } from '../lib/scoring'

// ── Single posts by pain point ────────────────────────────────────────────────

const SINGLE_POSTS: Record<string, string[]> = {
  spoilage: [
    `Seafood doesn't kill your margins at purchase.\n\nIt kills them when it sits too long, gets mishandled, or never gets sold.\n\nTrack post-delivery — not just invoice price.\n\n${COMPANY.cta.audit}`,
    `Most operators think they have a seafood pricing problem.\n\nThey have a spoilage problem.\n\nTwo different diagnoses. One much more fixable.\n\n${COMPANY.cta.audit}`,
  ],
  supply_inconsistency: [
    `If you're 86ing seafood regularly, the problem is almost never your supplier.\n\nIt's your ordering window.\n\nOrder 5+ days out. Stockouts drop by half.\n\n${COMPANY.cta.consult}`,
    `"Reliable seafood supply" is not a supplier quality.\n\nIt's a procurement system.\n\nBuild the system.\n\n${COMPANY.cta.learn}`,
  ],
  price_volatility: [
    `Spot-buying seafood feels like flexibility.\n\nIt's a 12–20% premium over contracted buyers.\n\nEvery week.\n\nThat's a planning cost, not a market cost.\n\n${COMPANY.cta.learn}`,
    `You can't negotiate away seafood market volatility.\n\nYou can decide how much of it lands on your P&L.\n\nContract coverage is the answer.\n\n${COMPANY.cta.learn}`,
  ],
  over_ordering: [
    `"Just order more to be safe" is the most expensive seafood habit in foodservice.\n\nOver-ordering by 10% inflates your net cost per usable pound by up to 14%.\n\nBuffer stock is not free insurance.\n\n${COMPANY.cta.download}`,
    `Your par levels were set in a different demand environment.\n\nThey're probably still wrong.\n\nAudit them quarterly, not annually.\n\n${COMPANY.cta.download}`,
  ],
  margin_loss: [
    `Seafood margin loss has three sources.\n\nSpoilage. Over-portioning. Mis-ordering.\n\nMost operators only look at one.\n\n${COMPANY.cta.audit}`,
    `The gap between your theoretical and actual seafood food cost is not mystery.\n\nIt's the sum of specific, measurable failures.\n\nMeasure them.\n\n${COMPANY.cta.audit}`,
  ],
  cold_chain: [
    `Your receiving log says 38°F.\n\nYour back walk-in shelf says 42°F.\n\nEvery degree above target costs you a day of shelf life.\n\nCalibrate after delivery, not just at delivery.\n\n${COMPANY.cta.audit}`,
    `Cold chain failure doesn't announce itself.\n\nIt shows up in spoilage two days later.\n\nMonitor temperature continuously. Not just at receipt.\n\n${COMPANY.cta.audit}`,
  ],
  waste_inventory: [
    `FIFO only works if you can see which product is oldest.\n\nMost walk-ins make that impossible.\n\nLabel everything with receipt date at delivery. No exceptions.\n\n${COMPANY.cta.consult}`,
    `Your oldest seafood is your most expensive seafood.\n\nMost operators don't treat it that way.\n\nVelocity on older product is not optional — it's margin recovery.\n\n${COMPANY.cta.consult}`,
  ],
  logistics: [
    `Every seafood SKU you add to your menu is a logistics commitment.\n\n12 SKUs costs roughly 4x more to operate than 6 SKUs.\n\nMenu complexity in perishables is not free.\n\n${COMPANY.cta.consult}`,
    `Split seafood deliveries across multiple suppliers feel like flexibility.\n\nThey create receiving complexity that compounds with every order cycle.\n\nSimplify the supply side first.\n\n${COMPANY.cta.consult}`,
  ],
  lead_time: [
    `Operators placing 48-hour seafood orders face 2x the stockout frequency of those ordering 5–7 days out.\n\nLead time is a margin decision.\n\nOrder earlier.\n\n${COMPANY.cta.learn}`,
    `Reactive seafood ordering on short lead times costs 18–25% more per unit.\n\nThe urgency premium is real and entirely preventable.\n\n${COMPANY.cta.learn}`,
  ],
  quality_inconsistency: [
    `When fillets run off-spec by 15%, your menu price and your food cost are no longer connected.\n\nSpec variance is a portion cost problem.\n\nHold suppliers to documented specs or change suppliers.\n\n${COMPANY.cta.consult}`,
    `Inconsistent portioning across deliveries is not a chef problem.\n\nIt's a spec sheet problem.\n\nDocument tolerances. Track variance. Enforce accountability.\n\n${COMPANY.cta.consult}`,
  ],
}

// ── Threads by pain point ─────────────────────────────────────────────────────

const THREADS: Record<string, string[]> = {
  spoilage: [
    `A thread on where seafood margins actually go:\n\n(It's not where most operators look)`,
    `1/ Most operators track seafood cost at the invoice.\n\nThat's not where the money goes.`,
    `2/ Seafood loses value at three points after delivery:\n\n— Receipt (temperature, spec, short weight)\n— Storage (FIFO failure, walk-in drift)\n— Prep (over-portioning, trim loss)`,
    `3/ Each one is measurable.\n\nMost operators measure none of them systematically.`,
    `4/ The result: actual food cost runs 4–9 points above theoretical.\n\nOn $10K/month in seafood, that's $400–$900 in monthly variance.`,
    `5/ The fix starts with one audit:\n\n— Walk-in temperature calibration\n— FIFO compliance by SKU\n— Intake temp log at delivery`,
    `6/ None of those require a new supplier.\n\nThey require a system.\n\n${COMPANY.cta.audit}`,
  ],
  price_volatility: [
    `Why seafood price volatility isn't your problem — but how you buy is:\n\n(A thread for foodservice operators)`,
    `1/ Seafood is one of the most volatile proteins you can put on a menu.\n\nWild-caught species swing with harvest cycles and fuel costs.\n\nFarmed species respond to disease, feed prices and currency shifts.`,
    `2/ None of that is in your control.\n\nBut your purchasing structure is.`,
    `3/ Spot buyers consistently pay 12–20% more than contracted buyers for the same product.\n\nNot because the market is cruel.\n\nBecause predictability gets discounted.`,
    `4/ Contract at least 60% of your top-spend seafood SKUs.\n\nRetain 20–30% spot flexibility for menu testing.\n\nTrack contracted vs. spot cost monthly.`,
    `5/ The result: stable cost on your volume base, flexibility on the margin.\n\n${COMPANY.cta.learn}`,
  ],
  margin_loss: [
    `Seafood margin loss has three sources. Most operators only find one.\n\nA thread:`,
    `1/ Source one: Spoilage.\n\n4–10% of seafood ordered never reaches a plate.\n\nThis is a post-delivery management problem, not a sourcing problem.`,
    `2/ Source two: Over-portioning.\n\nPortions running 10% over spec across 200 covers per week add up.\n\n$0.40/plate × 200 covers = $80/week = $4,160/year on one menu item.`,
    `3/ Source three: Mis-ordering.\n\nOrdering the wrong quantities drives both spoilage (over) and 86s (under).\n\nBoth cost money. Only one is visible.`,
    `4/ The gap between theoretical and actual food cost is not random.\n\nIt's the sum of those three.\n\nMeasure each one separately.`,
    `5/ Operators who audit all three annually recover $18,000–$45,000 in margin.\n\nThat doesn't require better suppliers.\n\nIt requires better tracking.\n\n${COMPANY.cta.audit}`,
  ],
}

// ── Contrarian takes ──────────────────────────────────────────────────────────

const CONTRARIAN_TAKES: Record<string, string> = {
  spoilage: `Hot take: most restaurants don't have a seafood cost problem.\n\nThey have a seafood waste problem.\n\nFix the walk-in, not the invoice.`,
  supply_inconsistency: `Counterpoint: your seafood supplier is not the reason you keep running out.\n\nYou are.\n\nOrdering inside 48 hours on a perishable protein is not a sourcing strategy.`,
  price_volatility: `Unpopular opinion: seafood price volatility is not a market problem for most operators.\n\nIt's a purchasing structure problem.\n\nContracts exist. Use them.`,
  over_ordering: `Everyone says "order more to avoid running out."\n\nThat advice costs operators hundreds of dollars per week in spoilage.\n\nAccurate par levels beat buffer stock every time.`,
  margin_loss: `The most expensive thing on your seafood P&L is not the price per pound.\n\nIt's the 4–9 points of food cost variance you've normalized as "how it is."\n\nThat's a choice, not a condition.`,
  cold_chain: `Your receiving process is not your cold chain problem.\n\nYour storage process is.\n\nMost cold chain failures happen after the delivery check, not during it.`,
  waste_inventory: `FIFO policies don't fail because staff don't care.\n\nThey fail because walk-in organization makes compliance physically difficult.\n\nFix the layout before writing another policy.`,
  logistics: `More seafood SKUs is not a competitive advantage.\n\nIt's a spoilage multiplier.\n\nMenu restraint in perishables is a margin strategy.`,
  lead_time: `Ordering seafood on 48-hour windows is not operational agility.\n\nIt's a premium you pay every single week for not planning ahead.`,
  quality_inconsistency: `If your seafood spec sheet has not been updated in the last 12 months, it's not a spec sheet.\n\nIt's a document that does not reflect your actual product.\n\nUpdate it or stop calling it a control.`,
}

// ── Founder-style posts ──────────────────────────────────────────────────────

const FOUNDER_POSTS: Record<string, string> = {
  spoilage: `Something I see in almost every foodservice operation we work with:\n\nThe operator is focused on invoice price.\n\nThe margin is disappearing in the walk-in.\n\nThose are two different problems with two different fixes.\n\nPrice negotiation helps with one.\n\nPost-delivery systems fix both.`,
  supply_inconsistency: `The operators we work with who never 86 seafood have one thing in common.\n\nThey don't order on 48-hour windows.\n\nThey plan 5–7 days out, maintain supplier relationships, and treat lead time as a system — not a request.\n\nSimple discipline. Consistent results.`,
  price_volatility: `We built Sea Wind Foods around a simple observation:\n\nOperators who contract volume sleep better than operators who buy spot.\n\nNot because markets are fair.\n\nBecause predictability reduces cost on both sides of the transaction.`,
  margin_loss: `After working with dozens of foodservice operators on seafood cost:\n\nThe gap between theoretical and actual food cost is never random.\n\nIt's always spoilage, over-portioning, or mis-ordering — usually some combination.\n\nEvery dollar of that gap is recoverable with the right tracking system.`,
}

// ── Quote-response style ─────────────────────────────────────────────────────

const QUOTE_RESPONSES: Record<string, { quote: string; response: string }> = {
  spoilage: {
    quote: "\"We're cutting costs by finding a cheaper seafood supplier.\"",
    response: `Good first move.\n\nBut if spoilage is running at 8%, you'll give that discount back in the first two weeks.\n\nPrice reduction helps once.\n\nSpoilage reduction helps every week.`,
  },
  price_volatility: {
    quote: '"Seafood pricing is just unpredictable — nothing we can do."',
    response: `The market is unpredictable.\n\nYour exposure to it is not.\n\nOperators with contracted volume absorb 20–30% less of market volatility than spot buyers.\n\nThat's a decision, not luck.`,
  },
  over_ordering: {
    quote: '"We always order a little extra just to be safe."',
    response: `Safe from what exactly?\n\nOver-ordering by 10% inflates your usable-pound cost by up to 14%.\n\nYou're trading stockout risk for spoilage cost.\n\nNeither is free. One is measurable.`,
  },
}

// ── Alternate hooks ──────────────────────────────────────────────────────────

const ALT_HOOKS: Record<string, string> = {
  spoilage: "Most restaurants don't have a seafood pricing problem. They have a spoilage problem.",
  supply_inconsistency: "The 86 on your seafood menu was predictable 72 hours in advance. Did you look?",
  price_volatility: "Seafood price volatility is not a market problem. It's a purchasing structure problem.",
  over_ordering: "Buffer stock in seafood is not safety. It's a weekly spoilage cost with no payoff.",
  margin_loss: "Your theoretical seafood food cost is a fiction. Here is what's actually happening.",
  cold_chain: "Cold chain compliance is not a delivery event. It's a continuous storage discipline.",
  waste_inventory: "You cannot rotate what you cannot see. Most walk-ins make FIFO structurally impossible.",
  logistics: "Each seafood SKU you add is a logistics commitment. Count the real cost.",
  lead_time: "Ordering seafood on 48-hour windows is a weekly premium you pay for not planning.",
  quality_inconsistency: "When spec variance is normal, your menu price and your food cost are no longer connected.",
}

// ── Main generator ────────────────────────────────────────────────────────────

export function generateTwitter(inputs: TwitterInputs): TwitterOutput {
  const { painPoint, format, tone, angle, variantSeed = 0 } = inputs
  const stat = pickStat(painPoint, variantSeed)

  let posts: string[] = []

  if (format === 'single') {
    const options = SINGLE_POSTS[painPoint] || SINGLE_POSTS.spoilage
    posts = [options[variantSeed % options.length]]
  } else if (format === 'thread') {
    posts = THREADS[painPoint] || THREADS.spoilage
  } else if (format === 'contrarian') {
    const take = CONTRARIAN_TAKES[painPoint] || CONTRARIAN_TAKES.spoilage
    posts = [take, `\n${COMPANY.cta.consult}`]
  } else if (format === 'founder') {
    const fp = FOUNDER_POSTS[painPoint] || FOUNDER_POSTS.spoilage
    posts = [fp, `\n${COMPANY.cta.learn}`]
  } else if (format === 'quote_response') {
    const qr = QUOTE_RESPONSES[painPoint] || QUOTE_RESPONSES.spoilage
    posts = [`> ${qr.quote}`, `\n${qr.response}`, `\n${COMPANY.cta.consult}`]
  }

  const engagementQuestion =
    format === 'thread' || format === 'single'
      ? `What's your current approach to tracking actual vs. theoretical seafood food cost?`
      : `Have you audited your seafood ordering patterns in the last 90 days?`

  const score = scoreContent({
    painPoint: inputs.painPoint,
    angle,
    tone,
    hasSpecificData: posts.join('').match(/\d+/) !== null,
    hasCTA: posts.join('').includes('seawindfoods'),
    hasFinancialConsequence: true,
    hasOperationalDetail: format === 'thread',
    wordCount: posts.join(' ').split(/\s+/).length,
    platform: 'twitter',
  })

  return {
    posts,
    alternateHook: ALT_HOOKS[painPoint] || ALT_HOOKS.spoilage,
    cta: COMPANY.cta.consult,
    engagementQuestion,
    repurposingSuggestions: [
      format === 'thread' ? 'Expand into a LinkedIn post using the thread structure' : 'Convert into a LinkedIn post with more body copy',
      'Use the contrarian take as a YouTube short hook',
      'Turn the core data point into an Instagram carousel opening slide',
      'Use the engagement question as a Facebook discussion prompt',
    ],
    score,
  }
}

export function regenerateTwitter(inputs: TwitterInputs, variant: string): TwitterOutput {
  const seedMap: Record<string, number> = { more_direct: 1, more_executive: 2, more_contrarian: 0, shorter: 0, more_specific: 2 }
  const newFormat: TwitterFormat = variant === 'more_contrarian' ? 'contrarian' : variant === 'shorter' ? 'single' : inputs.format
  return generateTwitter({
    ...inputs,
    format: newFormat,
    variantSeed: seedMap[variant] ?? 1,
    tone: variant === 'more_contrarian' ? 'contrarian' : inputs.tone,
  })
}
