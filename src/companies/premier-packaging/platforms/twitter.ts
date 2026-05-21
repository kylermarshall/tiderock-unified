import type {
  TwitterInputs,
  TwitterOutput,
  PackagingProblem,
  ContentVariation,
  TwitterFormat,
} from '../lib/types'
import { scoreContent } from '../lib/scoring'

interface TwitterTemplate {
  mainPost: string
  alternateHook: string
  cta: string
  engagementQuestion: string
}

type VariantMap = Partial<Record<ContentVariation, TwitterTemplate>>
type FormatMap = Partial<Record<TwitterFormat, VariantMap>>

const TEMPLATES: Record<PackagingProblem, FormatMap> = {
  'box-sizing': {
    single: {
      default: {
        mainPost: `Most companies think shipping costs are high because of their carrier.\n\nThey're not.\n\nDIM weight pricing charges by box volume.\nOversized box = you pay for empty space, every shipment.\n\nA box 15% too large adds $0.60–$1.80 per shipment.\nAt 8K shipments/month: up to $172,800/year.\n\nThe fix isn't a new carrier.\nIt's a packaging audit.`,
        alternateHook: `Your carrier isn't why shipping is expensive. Your box is.`,
        cta: `Audit your top 20 SKUs before the next carrier negotiation.`,
        engagementQuestion: `When did you last review your box specifications against current product dimensions?`,
      },
      contrarian: {
        mainPost: `Hot take: your carrier isn't overcharging you.\n\nDIM weight pricing is logical.\nCarriers charge by cubic volume because large empty boxes cost real money to move.\n\nIf your box is 20% oversized, you're the reason rates are high — not the carrier.\n\nStop renegotiating. Start auditing.`,
        alternateHook: `Blaming the carrier is the packaging industry's favorite excuse.`,
        cta: `When did you last audit your box dimensions against your product catalog?`,
        engagementQuestion: `Agree or disagree: most high shipping costs are a packaging decision, not a carrier decision?`,
      },
      executive: {
        mainPost: `CFOs review carrier contracts.\nAlmost none review packaging specifications.\n\nDIM weight pricing means oversized boxes = higher rates.\nA 15% oversized spec adds $0.60–$1.80 per shipment in preventable charges.\n\nFor 50,000 annual shipments: $30,000–$90,000 sitting in the spec sheet.\n\nThis is a capital allocation question. Not an operations detail.`,
        alternateHook: `Your packaging spec is a financial document. Is your CFO treating it that way?`,
        cta: `Add packaging specifications to your next financial review scope.`,
        engagementQuestion: `Does your finance team track DIM weight costs as a packaging decision? Or just as freight?`,
      },
      direct: {
        mainPost: `Your boxes are too big.\nYou're paying DIM weight surcharges on every shipment.\n\n$0.60–$1.80/shipment on oversized boxes.\nAudit the spec. Right-size the box. Save 12–20% on shipping.\n\nDon't negotiate first. Audit first.`,
        alternateHook: `Oversized box. DIM surcharge. Every shipment.`,
        cta: `Start the box sizing audit before the next carrier call.`,
        engagementQuestion: `Have you ever calculated how much your current box dimensions cost in DIM surcharges annually?`,
      },
    },
    thread: {
      default: {
        mainPost: `Your shipping costs keep going up.\nYour carrier says it's market rates.\nHere's what's actually happening. 🧵\n\n1/ DIM weight pricing is how every major carrier calculates freight.\nFormula: (L × W × H) ÷ 139 = dimensional weight.\nYou're billed at whichever is higher: actual weight or DIM weight.\n\n2/ If your product weighs 3 lbs but your box creates a DIM weight of 8 lbs...\nYou pay for 8 lbs. Every shipment.\n\n3/ The result: a box 15% too large for its contents adds $0.60–$1.80 per shipment.\nAt 8,000 shipments/month: $57,600–$172,800/year in preventable charges.\n\n4/ Most teams respond by negotiating with the carrier.\nThe carrier gives back 4–6%.\nThe DIM problem stays.\n\n5/ Why? Because DIM weight pricing is based on your packaging spec — not your relationship with the carrier.\nNo negotiation fixes a spec problem.\n\n6/ The right sequence:\n→ Packaging audit (2–4 hrs on top 20 SKUs)\n→ Right-size box specifications\n→ Negotiate from the lower cost baseline\n\n7/ Companies that do it in this order achieve 15–25% shipping cost reduction.\nNegotiation alone: 3–8%.\n\nFix the spec. Then negotiate.`,
        alternateHook: `The shipping cost problem nobody talks about: it's in your box, not your carrier contract.`,
        cta: `Start with your top 20 SKUs. Compare current box dimensions to product dimensions. That's the audit.`,
        engagementQuestion: `What's your biggest challenge when trying to right-size packaging? Drop it below.`,
      },
      contrarian: {
        mainPost: `Unpopular opinion: most shipping cost problems are self-inflicted.\n\nThread on why. 🧵\n\n1/ DIM weight pricing was designed for a reason.\nCarriers move cubic volume. Large empty boxes cost real money to load, stack, and transport.\n\n2/ When companies complain about DIM surcharges, they're usually complaining about a consequence of oversized packaging.\nThe carrier is doing exactly what was agreed to in the rate schedule.\n\n3/ The actual problem: packaging specifications that were never designed with DIM weight in mind.\nInherited specs. Convenience choices. Nobody audited them.\n\n4/ I've watched companies spend 40 hours renegotiating with carriers...\n...when a 3-hour packaging audit would have saved them 4× more.\n\n5/ The sequence matters:\nPackaging audit → Right-size spec → Carrier negotiation\n\n6/ Companies that get this sequence right: 15–25% shipping cost reduction.\nCompanies that just negotiate: 3–8%.\n\nThe difference isn't the carrier. It's who owns the spec sheet.`,
        alternateHook: `Carrier negotiations are a $4 solution to a $20 problem when the real issue is your packaging spec.`,
        cta: `Audit the spec before the next carrier conversation.`,
        engagementQuestion: `Has your team ever found significant savings from a packaging audit that weren't visible from the freight budget alone?`,
      },
    },
    founder: {
      default: {
        mainPost: `Three years into running ops at a growing CPG brand, I was convinced our shipping costs were a carrier problem.\n\nI was wrong.\n\nThe turning point: I finally ran the numbers on our box specifications.\n37% of our SKUs were in boxes 20%+ too large.\nEvery one of them was generating DIM weight surcharges on every shipment.\n\nWe'd been paying for empty air for three years.\n\nThe packaging audit took one afternoon.\nThe specification changes took two weeks.\nThe savings: $140,000 in the first year.\n\nFix the spec before you negotiate.`,
        alternateHook: `I spent two years fighting my carrier over shipping costs. The problem was my packaging spec the whole time.`,
        cta: `If you're in the same situation — audit first. The answer is almost always in the spec.`,
        engagementQuestion: `Have you ever found a major cost driver hiding in a place you weren't looking? What was it?`,
      },
    },
    'quote-post': {
      default: {
        mainPost: `[Quote: "We've tried everything to reduce shipping costs. Nothing works."]\n\nHave you audited your box specifications against current product dimensions?\n\nDIM weight pricing means oversized boxes add $0.60–$1.80 per shipment in surcharges.\nAt volume, that's six figures annually.\n\nThe fix isn't a new carrier. It's a 2-hour packaging audit.\n\nThe answer is almost always in the spec.`,
        alternateHook: `Before the next carrier negotiation, run a packaging audit. The problem is usually there.`,
        cta: `Try the audit before trying a new carrier.`,
        engagementQuestion: `What percentage of your shipping cost would you estimate comes from packaging decisions vs. carrier rates?`,
      },
    },
  },

  'damage-prevention': {
    single: {
      default: {
        mainPost: `60% of product damage in transit starts with the packaging spec.\nNot with the carrier.\n\nWrong cushioning.\nUnder-rated box compression.\nInsufficient void fill.\n\nAll packaging decisions. All made before the carrier touches anything.\n\nBefore the next damage claim: audit the specification.`,
        alternateHook: `You're filing carrier claims for packaging failures. The carrier probably isn't why the product arrived damaged.`,
        cta: `Pull your top damage SKUs. Review their current packaging specifications.`,
        engagementQuestion: `What's your current damage rate? And have you traced the root cause to packaging or carrier handling?`,
      },
      contrarian: {
        mainPost: `Every time a product arrives damaged, the carrier gets blamed.\nMost of the time, they didn't cause it.\n\n60% of transit damage traces to specification failures:\n— Box compression rated too low for stack load\n— Void fill below the threshold needed for protection\n— Cushioning type mismatched to product fragility\n\nYour packaging caused the damage. The carrier just delivered it that way.\n\nRoot cause before claim. Spec review before renegotiation.`,
        alternateHook: `Carrier damage claims filed on packaging failures get denied. Then the damage keeps happening.`,
        cta: `Run a spec review on your top damage SKUs before the next claim cycle.`,
        engagementQuestion: `When you investigate damage events, what percentage trace back to packaging failures vs. carrier handling?`,
      },
    },
    thread: {
      default: {
        mainPost: `Your product keeps arriving damaged.\nYou keep filing carrier claims.\nThe damage rate isn't improving.\n\nHere's why — and what to do about it. 🧵\n\n1/ Industry data: 55–65% of product damage in transit originates in the packaging specification.\nNot in how the carrier handles the box.\n\n2/ The three main specification failure modes:\n→ Box compression strength (BCT) under-rated for stack load\n→ Cushioning material mismatched to product fragility rating\n→ Void fill ratio below the 20–25% threshold for protection\n\n3/ Each one has a specific fix.\nNone of them involve changing your carrier.\n\n4/ The full cost of a 4% damage rate on $5M in shipments:\n→ Product replacement: $120,000\n→ Return freight: $40,000\n→ Customer service: $20,000\n→ Churn from damaged deliveries: $20,000–$60,000\nTotal: $200,000–$240,000 annually\n\n5/ Most of that is recoverable through specification changes.\nOperations that complete a spec audit reduce damage rates by 40–60% in year one.\n\n6/ The diagnostic framework:\n→ Rate product fragility (1–5 scale)\n→ Match cushioning to fragility rating\n→ Calculate required BCT for your stack height\n→ Verify void fill ratio across your top damage SKUs\n\n7/ Fix the spec. Stop filing claims on packaging failures.`,
        alternateHook: `Your damage rate isn't a carrier problem. Here's how to prove it — and fix it.`,
        cta: `Run the diagnostic on your top 5 damage SKUs this week.`,
        engagementQuestion: `Has your team ever traced a damage issue back to the packaging spec? What did you find?`,
      },
    },
  },

  'cost-leakage': {
    single: {
      default: {
        mainPost: `Your packaging budget is tracking the wrong number.\n\nMaterials cost = what you pay at the dock.\nTrue packaging cost = materials + freight surcharges + damage + labor.\n\nMost operations understate true packaging cost by 18–30%.\n\nFor a 50K/month shipment operation, the hidden cost is typically:\n→ $60K–$180K in DIM surcharges (in freight budget)\n→ $40K–$120K in damage and returns (in operations)\n→ $30K–$90K in labor inefficiency (in headcount)\n\nMaterials are the visible part.\nThe rest is hiding in other line items.`,
        alternateHook: `You're managing the smallest part of your packaging cost and ignoring the rest.`,
        cta: `Build the full cost model before the next packaging budget review.`,
        engagementQuestion: `How does your team currently track packaging cost? Materials only, or full downstream impact?`,
      },
      contrarian: {
        mainPost: `Cheaper packaging doesn't lower your packaging cost.\nUsually raises it.\n\nMaterials savings of $0.06/unit → damage rate climbs → DIM surcharges increase.\nNet result: $0.24/unit cost increase on a $0.06/unit savings decision.\n\nHappens constantly. Never shows up in the packaging budget.\nIt shows up in freight, damage, and operations.\n\nMaterials cost and packaging cost are not the same thing.`,
        alternateHook: `The packaging cost reduction initiative that raised your total cost. Sound familiar?`,
        cta: `Model all four cost channels before your next packaging spec change.`,
        engagementQuestion: `Has a packaging "cost reduction" ever ended up costing you more overall? What happened?`,
      },
    },
    thread: {
      default: {
        mainPost: `Your packaging team hit their cost target.\nGross margin went down anyway.\n\nHere's the structural problem — and how to fix it. 🧵\n\n1/ Packaging cost lives in four places on the P&L:\n→ Materials (the packaging budget)\n→ Freight (DIM surcharges, cube inefficiency)\n→ Operations (damage, returns, replacements)\n→ Labor (pack station time per unit)\n\n2/ Most organizations manage #1 closely.\nThe other three are unattributed — or attributed to the wrong cause.\n\n3/ Result: packaging decisions that look like savings often increase total cost.\n\nExample:\n→ Lighter box saves $0.06/unit in materials\n→ Damage rate climbs 2.7 percentage points\n→ DIM weight surcharge increases from box size adjustment\n→ Net cost: +$0.24/unit\n\n4/ This pattern repeats because the P&L doesn't connect the dots.\nThe materials savings show up in one column.\nThe damage and freight cost show up in two others.\nNobody reconciles them.\n\n5/ The fix: build a four-channel packaging cost model.\n→ Materials cost per unit\n→ Freight attribution per unit (DIM + cube)\n→ Damage attribution per unit\n→ Labor attribution per unit\nTotal = true packaging cost\n\n6/ Run this model before and after any specification change.\n\n7/ Companies that manage all four channels recover 30–50% of the unmanaged gap in year one.\n\nFor a $30M operation, the unmanaged gap is typically $580K–$1.4M.`,
        alternateHook: `There are four ways packaging costs show up on your P&L. Most teams manage one of them.`,
        cta: `Build the four-channel model before the next spec change approval.`,
        engagementQuestion: `Which of the four packaging cost channels does your team manage least well?`,
      },
    },
  },

  'shipping-cost': {
    single: {
      default: {
        mainPost: `Shipping cost reduction — right sequence:\n\n1. Packaging audit\n2. Right-size box specs\n3. Carrier negotiation\n\nWrong sequence (most companies):\n\n1. Carrier negotiation\n2. Accept 4–6% discount\n3. Wonder why costs are still high\n\nDIM weight pricing means the carrier isn't the problem.\nThe spec is.\n\nFix first. Negotiate second.`,
        alternateHook: `Carrier negotiation saves 3–8%. Packaging audit saves 12–25%. Most companies do it backward.`,
        cta: `Audit the spec before the next carrier contract renewal.`,
        engagementQuestion: `Have you ever run a packaging audit before a carrier negotiation? What did you find?`,
      },
    },
    thread: {
      default: {
        mainPost: `Everyone's trying to cut shipping costs.\nAlmost everyone is doing it in the wrong order.\n\nHere's the right sequence. 🧵\n\n1/ Most companies respond to high shipping costs by going to the carrier.\nThey push for a discount. Get 4–6% if they're lucky.\nCosts are still too high two months later.\n\n2/ Here's why it doesn't work:\nDIM weight pricing charges by cubic volume.\nIf your boxes are oversized, the rate you're negotiating against is already inflated.\nA 10% discount on an inflated rate doesn't solve the problem.\n\n3/ The math:\nOversized packaging → DIM rate: $3.20/shipment\n10% carrier discount → $2.88 (saved $0.32)\n\nRight-sized packaging first → DIM rate: $2.10/shipment\n10% discount on right-sized → $1.89 (saved $1.31 vs. original)\n\nDifference: 4× more savings from the right sequence.\n\n4/ What the packaging audit looks like:\n→ Pull top 20 SKUs by volume\n→ Compare box dimensions to product dimensions\n→ Calculate void fill %\n→ Run DIM weight before and after right-sizing\n→ 2–4 hours. Results are usually immediate.\n\n5/ Then negotiate.\nNow you're negotiating from a lower baseline.\nThe discount compounds on a cost that's already been reduced.\n\n6/ Combined outcome from the right sequence: 15–25% total shipping cost reduction.\nNegotiation alone: 3–8%.\n\nPackaging audit first.\nCarrier negotiation second.\nThat's the sequence.`,
        alternateHook: `The right way to cut shipping costs: packaging audit, then carrier negotiation. Not the other way around.`,
        cta: `Run the packaging audit before the next carrier contract comes up for renewal.`,
        engagementQuestion: `How do you currently sequence packaging review and carrier negotiation in your cost reduction process?`,
      },
    },
  },

  'warehouse-slowdowns': {
    single: {
      default: {
        mainPost: `4 extra minutes per shipment.\n200 daily orders.\n$18/hour labor.\n\n= $62,400/year in pack station waste.\n\nMost fulfillment operations have never timed their pack station workflow.\nThey add headcount when volume grows.\nThey scale the inefficiency instead of fixing it.\n\nTime the workflow.\nFind the waste.\nFix it before hiring.`,
        alternateHook: `You don't need more packers. You need a better pack station workflow.`,
        cta: `Time your pack station workflow today. The baseline will tell you whether you need more people or a better process.`,
        engagementQuestion: `What's your current pack time per shipment? Have you ever measured it formally?`,
      },
    },
    thread: {
      default: {
        mainPost: `Your fulfillment labor cost keeps rising.\nYou keep adding headcount.\nCost per unit isn't improving.\n\nHere's the problem. 🧵\n\n1/ Most fulfillment operations add packers when volume increases.\nFew ask: is the pack station workflow optimized before we scale it?\n\n2/ Time-motion data from an unoptimized pack station:\n→ Box selection and erection: 1.5–3 min\n→ Void fill: 1.5–3 min\n→ Label and stage: 1–2 min\nTotal: 4–8 min/unit\n\nOptimized:\n→ Pre-erected boxes: 0.3–0.5 min\n→ Metered void fill: 0.5–0.8 min\n→ Auto-label: 0.2–0.3 min\nTotal: 1.0–1.6 min/unit\n\n3/ At $19/hour and 1,000 daily units:\n→ Unoptimized labor cost: $1,267–$2,533/day\n→ Optimized labor cost: $317–$507/day\n→ Annual gap: $350,000–$740,000\n\n4/ Adding a packer to an unoptimized station scales the inefficiency.\nFix the process first. Then decide if you need more people.\n\n5/ The four optimization levers:\n→ Pre-erect boxes by SKU type before shift\n→ Right-size box selection (fewer options = faster selection)\n→ Metered void fill dispenser\n→ Workstation layout: minimize reach and movement\n\n6/ ROI on pack station optimization: typically 6–12 week payback on equipment costs.\n\nTime the workflow before the next hiring decision.`,
        alternateHook: `Adding headcount to an inefficient pack station is how you scale a $500,000 problem.`,
        cta: `Time your pack station before making the next staffing decision.`,
        engagementQuestion: `Do you track labor cost per unit at your pack station? What's your benchmark?`,
      },
    },
  },

  'over-packaging': {
    single: {
      default: {
        mainPost: `Adding more packaging after a damage event is almost always the wrong answer.\n\nDamage is caused by specific failures:\n→ Wrong box compression strength\n→ Cushioning mismatched to fragility\n→ Insufficient void fill\n\nNot by "not enough packaging."\n\nMore material adds cost.\nIt doesn't fix the failure mode.\n\nRoot cause. Then specification change. Not more material.`,
        alternateHook: `More packaging doesn't lower your damage rate. It raises your cost.`,
        cta: `Identify the specific failure mode before changing the spec.`,
        engagementQuestion: `When you see a damage spike, what's your team's first response — add more packaging or diagnose the root cause?`,
      },
    },
  },

  'return-damage': {
    single: {
      default: {
        mainPost: `You spec your outbound packaging carefully.\nReturn packaging is whatever the customer sends back.\n\nFor operations with return rates above 10%, this creates a measurable write-off problem.\n\nProducts that leave the customer undamaged arrive at your warehouse as non-resaleables.\nThat's a return packaging failure.\n\n~35% of non-resaleable returns trace to transit damage — not product failure.\n\nSpec the return packaging. The write-offs are mostly preventable.`,
        alternateHook: `Your outbound packaging is carefully specified. Your return packaging is uncontrolled. That's where the write-offs come from.`,
        cta: `Audit your non-resaleable return rate by SKU. Find the packaging-related share.`,
        engagementQuestion: `Does your operation specify return packaging, or leave it to the customer?`,
      },
    },
  },

  'freight-inefficiency': {
    single: {
      default: {
        mainPost: `Freight cost has two levers:\n1. Carrier rate\n2. Cube utilization\n\nMost companies manage #1.\nFew manage #2.\n\nCube utilization = % of truck space you actually fill.\nIndustry average: 62%.\nOptimized: 82–88%.\n\nMoving from 62% to 80% on a $500K freight budget:\n$500K × 18% = $90K/year recovered. No carrier negotiation needed.\n\nCube utilization is a packaging decision.\nManage it as one.`,
        alternateHook: `Your trucks are 38% empty. Your packaging dimensions are why.`,
        cta: `Measure your average cube utilization per truck. That's your starting point.`,
        engagementQuestion: `Do you currently track cube utilization as a packaging KPI? Or only as a logistics metric?`,
      },
    },
  },

  scaling: {
    single: {
      default: {
        mainPost: `Revenue doubled.\nPackaging cost per unit stayed flat.\n\nThat should bother you.\n\nScale should reduce cost per unit through volume leverage.\nIf it isn't, the packaging operation wasn't re-engineered during the growth phase.\n\nBenchmark:\n$15M–$40M (optimized): $1.20–$1.60/unit\n$15M–$40M (unoptimized): $1.75–$2.30/unit\n\nGap at $25M revenue: ~$1.2M annually.\n\nRe-engineer the packaging operation during growth.\nNot after.`,
        alternateHook: `You doubled your revenue. Did your packaging cost per unit drop? If not, something's wrong.`,
        cta: `Track your packaging cost per unit trend over the last 12 months.`,
        engagementQuestion: `At what growth milestone did you last review your packaging operation? What did you find?`,
      },
    },
  },

  'margin-loss': {
    single: {
      default: {
        mainPost: `Packaging affects gross margin through 4 channels.\n\n1. Materials cost — visible, usually managed\n2. Freight impact — DIM surcharges, cube inefficiency\n3. Damage and returns — replacements, reverse logistics\n4. Labor inefficiency — pack station time per unit\n\nMost teams manage #1.\nThe rest are categorized elsewhere and left unoptimized.\n\nFor a $30M operation:\n→ Managed packaging cost: $450K\n→ Unmanaged packaging-related cost: $580K–$1.4M\n\nThat gap is recoverable.`,
        alternateHook: `Your packaging budget is tracking 30% of your actual packaging cost. The rest is buried in freight, operations, and headcount.`,
        cta: `Build the four-channel model before the next budget review.`,
        engagementQuestion: `Does your organization track packaging cost across all four channels, or primarily materials?`,
      },
    },
  },
}

const REPURPOSING_BY_FORMAT: Record<TwitterFormat, string[]> = {
  single: [
    'Expand the main post into a LinkedIn post with the financial model as the centerpiece.',
    'Use the alternate hook as an Instagram caption opening line.',
    'Convert the engagement question into a Facebook discussion prompt.',
    'Turn the CTA into a YouTube Shorts closing call to action.',
  ],
  thread: [
    'Convert each thread point into a separate LinkedIn post for a week-long content series.',
    'Use the thread structure as a YouTube video outline (each point = a section).',
    'Break the financial model point into a standalone Facebook educational post.',
    'Turn points 1–3 into an Instagram carousel outline.',
  ],
  contrarian: [
    'Use the contrarian take as the hook for a LinkedIn post with supporting data.',
    'Convert into a YouTube Shorts hook with the counterargument as the opening line.',
    'Use the engagement question as a Facebook discussion prompt.',
  ],
  founder: [
    'Expand the founder story into a LinkedIn long-form post with 3× more detail.',
    'Convert the story structure into a YouTube "case study" video narrative.',
    'Use the key insight as an Instagram quote card caption.',
  ],
  'quote-post': [
    'Convert into a LinkedIn response post under a relevant industry discussion.',
    'Use the response as a YouTube comment reply on a related video.',
    'Turn the CTA into a Facebook retargeting post.',
  ],
}

function getTemplate(problem: PackagingProblem, format: TwitterFormat, variation: ContentVariation): TwitterTemplate {
  const problemTemplates = TEMPLATES[problem] ?? TEMPLATES['cost-leakage']
  const formatTemplates = problemTemplates[format] ?? problemTemplates['single']!
  const variantTemplate = formatTemplates[variation] ?? formatTemplates['default']!
  return variantTemplate
}

export function generateTwitterContent(inputs: TwitterInputs, variation: ContentVariation = 'default'): TwitterOutput {
  const template = getTemplate(inputs.mainProblem, inputs.postFormat, variation)

  const qualityScore = scoreContent({
    hook: template.mainPost.split('\n')[0] ?? '',
    body: template.mainPost,
    cta: template.cta,
    variation,
  })

  const improvementSuggestions: string[] = [
    `For a ${inputs.postFormat} format targeting ${inputs.targetAudience}, consider leading with a role-specific scenario rather than a data point.`,
    'Add a specific dollar figure to the first or second line to anchor financial impact early.',
    'Test the alternate hook as the primary — it may perform better depending on audience.',
    `Engagement question is well-positioned at the end. For ${inputs.postFormat} format, it drives replies which improve reach algorithmically.`,
  ]

  return {
    mainPost: template.mainPost,
    alternateHook: template.alternateHook,
    cta: template.cta,
    engagementQuestion: template.engagementQuestion,
    repurposingSuggestions: REPURPOSING_BY_FORMAT[inputs.postFormat],
    qualityScore,
    improvementSuggestions,
  }
}
