import type { YouTubeInputs, YouTubeOutput, YouTubeFormat } from '../types'
import { COMPANY, pickStat } from '../lib/companyProfile'
import { scoreContent } from '../lib/scoring'

// ── Titles by pain point ──────────────────────────────────────────────────────

const TITLES: Record<string, Record<YouTubeFormat, string[]>> = {
  spoilage: {
    short: ['Seafood Spoilage Is Eating Your Margins', 'Stop Losing Money in Your Walk-In', 'The Real Cost of Seafood Spoilage'],
    mid: ['Why Your Seafood Budget Is Wrong — It\'s Not the Price', 'The Spoilage Math Most Operators Never Run', 'Where Seafood Margins Actually Disappear'],
    longform: ['The Complete Seafood Spoilage Audit: What Operators Get Wrong and How to Fix It', 'Seafood Cost Control: A Walk-In to Plate Analysis for Foodservice Operators'],
  },
  supply_inconsistency: {
    short: ['Why You Keep 86ing Seafood', 'Your Supplier Is Not the Problem', 'Stop Blaming Supply — Fix Your Ordering'],
    mid: ['Why Seafood 86s Are an Ordering Problem, Not a Supply Problem', 'The Reactive Ordering Trap in Seafood Procurement'],
    longform: ['Seafood Supply Reliability: How to Eliminate 86s Through Better Procurement Systems'],
  },
  price_volatility: {
    short: ['Seafood Pricing Is Not Random', 'You\'re Paying a Volatility Tax You Don\'t Have to', 'Why Spot Purchasing Is Costing You'],
    mid: ['How to Stop Absorbing Seafood Price Volatility', 'Contracted vs. Spot Seafood Buying: The Real Cost Difference'],
    longform: ['Seafood Price Volatility Management: A Practical Guide for Foodservice Operators'],
  },
  over_ordering: {
    short: ['Over-Ordering Seafood Is Not Safe', 'Your Par Levels Are Outdated', 'Just-in-Case Ordering Has a Real Cost'],
    mid: ['Why "Just in Case" Seafood Orders Are Hurting Your Margins', 'The Over-Ordering Trap: How to Set Accurate Seafood Par Levels'],
    longform: ['Seafood Inventory Optimization: Moving from Reactive to Data-Driven Ordering'],
  },
  margin_loss: {
    short: ['Seafood Doesn\'t Cost You at Purchase', 'Your Actual Food Cost Is Not Your Theoretical One', '4–9 Points of Food Cost Are Missing — Here\'s Where They Go'],
    mid: ['The Seafood Margin Gap: Why Theoretical and Actual Food Cost Never Match', 'Three Sources of Seafood Margin Loss Most Operators Ignore'],
    longform: ['Closing the Seafood Food Cost Gap: From Theoretical to Actual and What to Do About It'],
  },
  cold_chain: {
    short: ['Your Walk-In Has a Temperature Problem', 'Cold Chain Failure Happens After Delivery', 'The 4°F Mistake Costing You Every Week'],
    mid: ['Cold Chain Compliance After Delivery: What Operators Miss', 'How Walk-In Temperature Drift Destroys Seafood Margins'],
    longform: ['Cold Chain Management for Foodservice: A Complete Audit from Delivery to Service'],
  },
  waste_inventory: {
    short: ['FIFO Only Works If You Can See It', 'Your Oldest Seafood Is Your Most Expensive', 'Inventory Shrink Is Not Accidental'],
    mid: ['Seafood Inventory Shrink: Where It Happens and How to Stop It', 'FIFO in Practice: Why Most Walk-Ins Fail at Seafood Rotation'],
    longform: ['Seafood Inventory Discipline: A Step-by-Step System for Reducing Shrink and Spoilage'],
  },
  logistics: {
    short: ['Each Seafood SKU Has a Hidden Cost', 'Menu Complexity Is a Logistics Problem', 'How SKU Count Drives Seafood Waste'],
    mid: ['The Hidden Cost of Seafood Menu Complexity', 'Managing Perishable Logistics: What Operators Overlook'],
    longform: ['Seafood Logistics for Foodservice: Reducing Complexity Without Reducing Revenue'],
  },
  lead_time: {
    short: ['48-Hour Seafood Orders Are Costing You', 'Lead Time Is a Margin Decision', 'Stop Ordering Seafood on Short Notice'],
    mid: ['Lead Time Discipline in Seafood Procurement: Why Timing Is a Cost Control Tool', 'Extended Lead Times and Seafood Availability: What the Data Shows'],
    longform: ['Seafood Procurement Timing: How Lead Time Strategy Determines Availability and Cost'],
  },
  quality_inconsistency: {
    short: ['Spec Variance Is a Food Cost Problem', 'Your Supplier\'s Quality Is Costing You Per Plate', 'Inconsistent Seafood Portions Are Not a Labor Issue'],
    mid: ['How Quality Inconsistency in Seafood Drives Hidden Food Cost', 'Spec Sheets vs. Delivery Reality: Closing the Seafood Quality Gap'],
    longform: ['Seafood Quality Control for Operators: Spec Management, Supplier Accountability and Cost Impact'],
  },
}

// ── Thumbnails ────────────────────────────────────────────────────────────────

const THUMBNAIL_TEXT: Record<string, string[]> = {
  spoilage: ['You\'re throwing money away', 'Spoilage is your #1 cost leak', 'Walk-in = cost center'],
  supply_inconsistency: ['Stop blaming your supplier', '86s are a planning problem', 'Ordering reactive = always short'],
  price_volatility: ['You\'re paying the spot tax', 'Volatility ≠ your problem — unless you buy spot', 'Contract beats spot by 20%'],
  over_ordering: ['Buffer stock costs more than stockouts', '"Just in case" = margin loss', 'Your par levels are wrong'],
  margin_loss: ['4–9 points missing from food cost', 'Theoretical vs. actual: the gap is real', 'Where does seafood margin go?'],
  cold_chain: ['38°F at the door ≠ 38°F inside', 'Cold chain breaks after delivery', 'Temperature drift = spoilage'],
  waste_inventory: ['FIFO works only if you can see it', 'Oldest seafood = most expensive', 'Shrink is not random'],
  logistics: ['Every SKU adds overhead', 'Menu complexity ≠ revenue complexity', '12 SKUs costs 4x more than 6'],
  lead_time: ['48h ordering = 2x stockouts', 'Lead time = margin decision', 'Order earlier, pay less'],
  quality_inconsistency: ['Spec sheet ≠ what arrives', '$0.60/portion × all covers', 'Variance is a cost, not a complaint'],
}

// ── Script templates ──────────────────────────────────────────────────────────

const SCRIPTS: Record<string, Record<YouTubeFormat, string[][]>> = {
  spoilage: {
    short: [
      [
        'You are not losing money on seafood at purchase. You are losing it in storage and prep.',
        'Spoilage accounts for 15–25% of actual seafood cost variance. Most operators never audit it.',
        'Three minutes after delivery, your responsibility for that product begins.',
        'Intake temp, FIFO compliance and walk-in calibration determine your real cost per usable pound.',
        'Track those three things. The invoice price matters less than you think.',
        `Sea Wind Foods helps operators close that gap. ${COMPANY.cta.audit}.`,
      ],
    ],
    mid: [
      [
        'HOOK: Your seafood is not expensive because of the price. It is expensive because of what happens to it after it arrives.',
        '',
        'THE PROBLEM:',
        'Walk-in spoilage is the single largest controllable seafood cost for most operators.',
        'It does not show on invoices. It shows in variance between theoretical and actual food cost.',
        'Typical gap: 4–9 food cost points on seafood.',
        '',
        'THE COST:',
        '4–10% of seafood ordered never reaches a plate in the average foodservice operation.',
        'On $8,000/month in seafood spend, that is $320–$800 in pure waste — per month.',
        '',
        'THE MISTAKE:',
        'Operators focus on negotiating invoice price while ignoring post-delivery handling.',
        'A $0.30/lb reduction on salmon means nothing if 12% spoils before service.',
        '',
        'THE FIX:',
        'Audit three things weekly: intake temperature at receipt, walk-in temperature calibration, FIFO compliance by SKU.',
        'Those three controls eliminate most preventable spoilage without changing your supplier.',
        '',
        'TAKEAWAY:',
        'Spoilage is the most expensive seafood cost you are already paying. It is also the most avoidable.',
        `${COMPANY.cta.audit}.`,
      ],
    ],
    longform: [
      [
        'INTRO (0–30 sec): Frame the problem — most operators focus on invoice price, not post-delivery cost.',
        'SECTION 1 (30–90 sec): The three stages of seafood value loss — delivery, storage, prep.',
        'SECTION 2 (90–180 sec): The math — typical spoilage rates, cost-per-usable-pound calculations.',
        'SECTION 3 (180–270 sec): The most common mistakes — no intake temperature log, FIFO not enforced, par levels set by habit.',
        'SECTION 4 (270–360 sec): The audit framework — what to measure, how often, what normal looks like.',
        'SECTION 5 (360–420 sec): How Sea Wind Foods structures supply to reduce spoilage risk at the source.',
        `OUTRO (420–480 sec): CTA — ${COMPANY.cta.audit}.`,
      ],
    ],
  },
  price_volatility: {
    short: [
      [
        'Seafood pricing shifted significantly over the last 18 months. Your spot purchasing exposure moved with it.',
        'Operators buying on contract paid 12–20% less than spot buyers for the same product.',
        'That is not a market advantage. That is a planning decision.',
        'Contracted volume gives suppliers certainty. Certainty gets discounted.',
        `Stop absorbing volatility you don't have to. ${COMPANY.cta.learn}.`,
      ],
    ],
    mid: [
      [
        'HOOK: Seafood price volatility is not your problem. How you purchase seafood is.',
        '',
        'THE PROBLEM:',
        'Most operators react to price changes rather than structuring purchasing to reduce exposure.',
        'Spot buying feels flexible. It compounds into a significant premium over contracted purchasing.',
        '',
        'THE COST:',
        'Spot market buyers pay 12–20% more than contracted buyers for the same product consistently.',
        'On $10,000/month in seafood spend, that is $1,200–$2,000 in avoidable cost every month.',
        '',
        'THE MISTAKE:',
        'Treating all price fluctuation as uncontrollable market conditions.',
        'Controllable: your purchasing structure, contract coverage, volume commitments.',
        'Uncontrollable: harvest cycles, weather, global demand shifts.',
        '',
        'THE FIX:',
        'Identify your top 3 seafood SKUs by spend. Contract at least 60% of that volume.',
        'Retain 20–30% spot flexibility for menu testing and demand variance.',
        'Track contracted vs. spot cost monthly to quantify the savings.',
        '',
        `${COMPANY.cta.learn}.`,
      ],
    ],
    longform: [
      [
        'INTRO (0–45 sec): Frame seafood as one of the most volatile proteins in foodservice and why most operators absorb that cost unnecessarily.',
        'SECTION 1 (45–120 sec): How seafood price volatility works — wild-caught drivers vs. farmed drivers.',
        'SECTION 2 (120–210 sec): The spot vs. contract premium — data and operator examples.',
        'SECTION 3 (210–300 sec): How to structure a contract coverage strategy without losing flexibility.',
        'SECTION 4 (300–390 sec): What good supplier relationships look like and how to negotiate volume predictability.',
        `OUTRO (390–450 sec): ${COMPANY.cta.learn}.`,
      ],
    ],
  },
}

function getScript(painPoint: string, format: YouTubeFormat, seed: number): string[] {
  const scripts = SCRIPTS[painPoint]?.[format] || SCRIPTS.spoilage[format]
  return scripts[seed % scripts.length]
}

// ── Retention beats ──────────────────────────────────────────────────────────

const RETENTION_BEATS: Record<YouTubeFormat, string[]> = {
  short: [
    '0:00 — Tension statement (names the cost, not the product)',
    '0:05 — The counter-intuitive truth',
    '0:12 — One data point',
    '0:20 — The specific fix',
    '0:28 — CTA',
  ],
  mid: [
    '0:00 — Hook creates immediate financial tension',
    '0:10 — Problem framed in operator terms (not supplier terms)',
    '0:25 — Cost quantified with a specific number',
    '0:45 — The common mistake named',
    '1:05 — The fix stated concisely',
    '1:20 — CTA with a specific action',
  ],
  longform: [
    '0:00 — Open with a specific cost scenario operators recognize',
    '0:45 — Preview the 4–5 things the video will cover',
    '2:00 — First insight that challenges a current assumption',
    '5:00 — Data-heavy section with screen visuals or callouts',
    '9:00 — Framework or checklist viewers can use today',
    '13:00 — Case example with specific numbers',
    '17:00 — CTA tied to the specific problem covered',
  ],
}

// ── Main generator ────────────────────────────────────────────────────────────

export function generateYouTube(inputs: YouTubeInputs): YouTubeOutput {
  const { painPoint, format, tone, angle, variantSeed = 0 } = inputs
  const titlesForPain = TITLES[painPoint] || TITLES.spoilage
  const titlesForFormat = titlesForPain[format]
  const title = titlesForFormat[variantSeed % titlesForFormat.length]

  const thumbnails = THUMBNAIL_TEXT[painPoint] || THUMBNAIL_TEXT.spoilage
  const thumbnailText = thumbnails[variantSeed % thumbnails.length]

  const stat = pickStat(painPoint, variantSeed)

  const hook3Sec =
    format === 'short'
      ? `${stat.stat} — and most operators have no idea.`
      : format === 'mid'
      ? `You are not losing money on seafood at the invoice price. You are losing it after delivery.`
      : `This video is about a specific cost problem that affects every foodservice operator who sources seafood — and it is almost entirely preventable.`

  const openingLine =
    tone === 'contrarian'
      ? `Every operator thinks the seafood problem is price. It is not.`
      : tone === 'direct'
      ? `Here is what is actually happening to your seafood margins.`
      : `Most operators misdiagnose where seafood cost goes. This is what the numbers actually show.`

  const script = getScript(painPoint, format, variantSeed)

  const businessInsight = `${stat.stat} — which represents ${stat.impact}. This is not a market condition. It is an operational variable.`

  const cta =
    format === 'short'
      ? COMPANY.cta.audit
      : format === 'mid'
      ? COMPANY.cta.consult
      : COMPANY.cta.learn

  const score = scoreContent({
    painPoint: inputs.painPoint,
    angle,
    tone,
    hasSpecificData: true,
    hasCTA: true,
    hasFinancialConsequence: true,
    hasOperationalDetail: format !== 'short',
    wordCount: script.join(' ').split(/\s+/).length,
    platform: 'youtube',
  })

  return {
    title,
    thumbnailText,
    hook3Sec,
    openingLine,
    script,
    retentionBeats: RETENTION_BEATS[format],
    businessInsight,
    cta,
    repurposingSuggestions: [
      'Pull the hook as a Twitter/X contrarian take',
      'Convert the data point into a LinkedIn post opener',
      'Use the "mistake" section as an Instagram carousel',
      'Extract the CTA for a Facebook retargeting post',
      format === 'longform' ? 'Break each section into a separate short-form video' : 'Expand into a long-form explainer',
    ],
    score,
  }
}

export function regenerateYouTube(inputs: YouTubeInputs, variant: string): YouTubeOutput {
  const seedMap: Record<string, number> = {
    more_direct: 1,
    more_executive: 2,
    more_contrarian: 0,
    shorter: 0,
    more_specific: 2,
  }
  const newFormat: YouTubeFormat =
    variant === 'shorter' ? 'short' : variant === 'more_specific' ? 'mid' : inputs.format
  return generateYouTube({
    ...inputs,
    format: newFormat,
    variantSeed: seedMap[variant] ?? 1,
    tone: variant === 'more_contrarian' ? 'contrarian' : inputs.tone,
  })
}
