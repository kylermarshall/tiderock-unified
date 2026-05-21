import type {
  FacebookInputs,
  FacebookOutput,
  PackagingProblem,
  ContentVariation,
  FacebookFormat,
} from '../lib/types'
import { scoreContent } from '../lib/scoring'

interface FacebookTemplate {
  primaryPost: string
  practicalTakeaway: string
  cta: string
  discussionQuestion: string
}

type FormatMap = Partial<Record<FacebookFormat, FacebookTemplate>>
type VariantMap = Partial<Record<ContentVariation, FormatMap>>

const TEMPLATES: Record<PackagingProblem, VariantMap> = {
  'box-sizing': {
    default: {
      short: {
        primaryPost: `If your shipping costs keep rising, here's where to start looking before you call your carrier.

Dimensional weight (DIM) pricing means carriers charge by cubic volume — not just by product weight. If your box is larger than your product needs, you're paying for empty space on every shipment.

A box that's 15% oversized adds $0.60–$1.80 in DIM charges per shipment.
At 8,000 shipments/month, that's up to $172,800/year.

The fix is a packaging audit, not a carrier negotiation. Most operations find 12–20% shipping cost reduction after right-sizing their box specifications.`,
        practicalTakeaway: `Pull your top 10 SKUs. Measure current box dimensions against product dimensions. Calculate your void fill percentage. Anything above 25% is a right-sizing candidate that's generating DIM surcharges.`,
        cta: `Start the audit at premierpackaging.com — the process takes 2–4 hours on your top SKUs.`,
        discussionQuestion: `When did your team last review box specifications against current product dimensions? And what did you find?`,
      },
      educational: {
        primaryPost: `Understanding Dimensional Weight Pricing — and What It Costs Your Operation

If you've wondered why shipping costs keep climbing even with stable carrier rates, dimensional weight (DIM) pricing is likely part of the answer.

Here's how it works:

Carriers don't just charge by how heavy your product is. They charge by the cubic volume of your box — specifically by calculating what's called "dimensional weight." The formula: Length × Width × Height ÷ 139 (for domestic UPS/FedEx shipments). You're billed at whichever is higher: actual product weight or dimensional weight.

This means a 3-lb product in an oversized box can be billed at 8 lbs or more. Every shipment.

The financial impact is significant:
• 15% oversized box → $0.60–$1.80 DIM surcharge per shipment
• 8,000 monthly shipments → up to $172,800/year in preventable charges
• 50,000 annual shipments → up to $90,000/year just from boxes 10% too large

Three packaging decisions that drive DIM weight cost:
1. Box size that wasn't designed for your current product assortment
2. Void fill used to compensate for the wrong box size (instead of fixing the box)
3. "Convenience" packaging — standard sizes that aren't right-sized to your products

The practical fix: a packaging specification audit focused on your top-volume SKUs. Most operations recover 12–20% of shipping costs through specification changes alone — without changing their carrier or negotiating new rates.

This isn't a theoretical exercise. For a $2M annual shipping budget, 15% savings is $300,000/year recovered from a one-time audit.`,
        practicalTakeaway: `Practical steps this week: (1) Identify your top 5 SKUs by shipment volume. (2) Measure actual product dimensions vs. current box dimensions. (3) Calculate DIM weight on the current box. (4) Calculate DIM weight on a right-sized box. (5) Project annual savings at your current shipment volume. The gap is usually larger than expected.`,
        cta: `Connect with Premier Packaging for a packaging specification review. 25+ years of operations expertise. premierpackaging.com`,
        discussionQuestion: `Has your team done a packaging specification audit recently? What was the biggest finding — and how much did it move the needle on shipping costs?`,
      },
      discussion: {
        primaryPost: `Question for operations and logistics leaders:

When your team is working on shipping cost reduction, what's the typical starting point — carrier negotiation, packaging review, or something else?

I ask because DIM weight pricing means that if packaging specifications aren't optimized, carrier negotiations start from an inflated baseline. A 10% discount on an oversized box rate still leaves more on the table than a packaging audit would recover.

Most data I've seen suggests packaging audits deliver 12–20% shipping cost reduction, while carrier negotiations typically deliver 3–8%.

But I'm curious whether that matches what teams are actually finding in practice.`,
        practicalTakeaway: `If you haven't done a packaging specification review alongside your carrier negotiations, it's worth adding to the process. The sequence — spec audit first, then negotiate — consistently outperforms negotiation alone.`,
        cta: `Share what's working in your operation. And if you want a packaging specification benchmark, reach out at premierpackaging.com.`,
        discussionQuestion: `In your experience — packaging audit first or carrier negotiation first? What sequence has delivered better results?`,
      },
      'business-owner': {
        primaryPost: `If you run a product-based business and your shipping bill keeps going up, here's something worth checking before you call your carrier:

Your boxes might be too big.

I know that sounds simple. But dimensional weight pricing — how carriers calculate freight cost — charges by cubic volume, not just product weight. If your box is larger than your product needs, you're paying for empty air on every shipment.

For a small business shipping 500 orders a month with boxes 15% too large, the annual DIM surcharge cost is typically $4,300–$13,000. Not huge, but also not nothing.

For a mid-size operation at 5,000 monthly shipments, it can be $43,000–$130,000/year.

The fix: match box dimensions to product dimensions. It's a one-time audit that most businesses can run in a few hours on their top-selling SKUs. The savings tend to compound every month going forward.

Before the next carrier negotiation, I'd look at the packaging spec first.`,
        practicalTakeaway: `Walk through your 5 best-selling products. Measure the product. Measure the current box. Is there more than 25% void fill space? That's a DIM weight problem — and probably a packaging cost problem.`,
        cta: `Premier Packaging helps businesses right-size their packaging. premierpackaging.com`,
        discussionQuestion: `Have you ever looked at whether your packaging dimensions are driving your shipping costs? What did you find?`,
      },
      retargeting: {
        primaryPost: `Still thinking about shipping costs?

You're not alone. It's one of the most consistent pain points for operations teams right now.

If you haven't looked at your packaging specifications as a starting point — that's usually where the most recoverable savings are.

DIM weight pricing means every oversized box adds a surcharge. At volume, that's real money.

A packaging audit on your top 20 SKUs typically takes 2–4 hours and reveals where the charges are coming from. From there, the specification changes are straightforward.

If you want to understand your specific DIM weight exposure, we can walk through it with you.`,
        practicalTakeaway: `The audit is the fastest path to understanding your actual shipping cost exposure from packaging. It's a 2–4 hour process for most operations.`,
        cta: `Book a packaging consultation at premierpackaging.com — no commitment, just clarity on where the cost is coming from.`,
        discussionQuestion: `What's the biggest friction point in your current packaging cost reduction effort?`,
      },
    },
    executive: {
      educational: {
        primaryPost: `A Note for CFOs and Operations Leaders: Packaging Specifications Are a Financial Document

Most P&L reviews treat packaging as a materials cost line.
That framing misses 60–70% of the financial impact packaging decisions have on the business.

Here's what the full picture looks like:

Packaging decisions affect gross margin through four channels:
1. Materials cost — what you pay at the dock. Visible, usually managed.
2. Freight cost — DIM weight surcharges and cube utilization. Often unattributed to packaging.
3. Damage and returns — replacement cost, reverse logistics, customer churn. Usually in operations or customer service.
4. Labor cost — pack station efficiency. Usually in headcount.

For a $30M consumer goods operation, the full packaging cost model typically looks like:
• Materials (managed): $450,000
• DIM weight and freight impact: $280,000–$480,000
• Damage and returns: $180,000–$540,000
• Labor inefficiency: $120,000–$360,000
Total: $1,030,000–$1,830,000

The managed portion ($450,000) represents 25–44% of total packaging-related cost.

The gap — $580,000–$1,380,000 — is unmanaged because it's not attributed to packaging decisions on the P&L.

What this means practically: every packaging specification change should be modeled across all four channels before approval. A materials cost reduction that increases damage rates and DIM weight is a net-negative decision — but it won't be caught without the full model.

Premier Packaging has helped operations build and use this model for 25+ years.`,
        practicalTakeaway: `Start with your freight line. Ask how much of it comes from DIM weight surcharges. That one question usually reveals the size of the gap and starts the right conversation.`,
        cta: `Schedule a packaging cost review at premierpackaging.com. The conversation usually reveals $200K–$1M+ in recoverable annual cost.`,
        discussionQuestion: `Does your financial review process include packaging-related freight, damage, and labor alongside materials cost? Or are they managed separately?`,
      },
    },
  },

  'damage-prevention': {
    default: {
      short: {
        primaryPost: `A quick reminder for ops teams filing damage claims right now:

60% of product damage in transit originates in the packaging specification — not in how the carrier handles the box.

Wrong cushioning type. Box compression strength under-rated for the stack load. Insufficient void fill.

All of these are packaging decisions made before the carrier touches anything.

If your damage rate is above 2%, a packaging specification review is almost always the faster and cheaper fix compared to carrier negotiation.`,
        practicalTakeaway: `Pull your top 10 damage SKUs. Look at their current packaging specifications. Check: box compression strength vs. actual stack load, cushioning material vs. product fragility, void fill ratio.`,
        cta: `Start the specification review at premierpackaging.com.`,
        discussionQuestion: `When you investigate damage events, what percentage trace back to packaging specs vs. carrier handling in your experience?`,
      },
      educational: {
        primaryPost: `Why Most Product Damage in Transit Is a Packaging Problem, Not a Carrier Problem

This comes up regularly in conversations with operations teams — a high damage rate, and the instinct is to address it through carrier negotiations, claims processes, or better handling agreements.

The data usually points in a different direction.

Industry research consistently shows that 55–65% of product damage in transit originates in the packaging specification. Here's what that looks like in practice:

Common specification failure modes:
• Box compression strength (BCT) under-rated for the actual stack load in warehouse or transit
• Cushioning material mismatched to the product's fragility rating
• Void fill ratio below 20–25%, allowing the product to shift and impact the box walls during handling
• Box dimensions not accounting for internal product movement during orientation changes

Each of these is a packaging decision — and each has a specific fix that doesn't require changing your carrier.

The financial case for addressing it through the packaging spec:

For a 4% damage rate on $5M in annual shipments:
• Product replacement cost: $120,000
• Return freight: $40,000
• Customer service handling: $20,000
• Customer churn from damaged deliveries: $30,000–$80,000
Total annual exposure: $210,000–$260,000

Operations that complete a packaging specification review reduce damage rates by 40–60% in most cases. At the numbers above, a 50% reduction is worth $105,000–$130,000 in year one.

The specification review typically costs a fraction of that.`,
        practicalTakeaway: `Diagnostic checklist for your top damage SKUs: (1) What is the product fragility rating? (2) Is cushioning matched to that rating? (3) What is box compression strength vs. stack height in your warehouse? (4) What is void fill ratio? Under 20% is usually a problem.`,
        cta: `Connect with Premier Packaging for a damage specification review. premierpackaging.com`,
        discussionQuestion: `Have you ever done a root cause analysis that traced damage back to the packaging spec rather than the carrier? What did you find?`,
      },
      discussion: {
        primaryPost: `Discussion question for the operations community:

When you have a product damage problem, what's the first place your team looks — carrier performance, packaging specification, or product vulnerability?

I ask because the attribution matters a lot for the fix. If a team is focused on carrier claims when the root cause is in the packaging spec, the damage rate won't improve. The claims just keep coming.

The specification review process isn't complicated — fragility rating, cushioning match, box compression strength, void fill ratio. But it often gets skipped in favor of the carrier conversation.

Curious what the experience has been in this group.`,
        practicalTakeaway: `Start with root cause, not with the claim. The diagnostic takes a few hours. The carrier conversation can happen after — once you know whether the spec or the handling is actually to blame.`,
        cta: `If you want a specification-based damage diagnostic framework, reach out at premierpackaging.com.`,
        discussionQuestion: `In your operation — do you have a formal process for distinguishing packaging-related damage from carrier-handling damage? How does it work?`,
      },
      'business-owner': {
        primaryPost: `If products keep arriving damaged and you're not sure why, here's a place to check before you escalate with your carrier:

The packaging specification.

Most small to mid-size business owners don't have a formal fragility rating for their products, or a specification for what cushioning type to use based on that rating. The packaging was set up once, and it's been running ever since.

That's fine when it works. When the damage rate goes up, it's usually the first thing to check.

Three things to look at:
1. Is your product's fragility rating documented? (Fragile, moderate, low — even a simple scale helps)
2. Is the cushioning type appropriate for that rating?
3. Is there enough void fill to prevent the product from shifting inside the box?

If the answer to any of those is "I'm not sure," that's where the investigation should start.`,
        practicalTakeaway: `Rate your product from 1 (low fragility) to 5 (high fragility). Then check whether your current cushioning type and void fill match that rating. If they don't, that's probably why products are arriving damaged.`,
        cta: `Premier Packaging can help you build a proper specification for your products. premierpackaging.com`,
        discussionQuestion: `Do you have a documented fragility rating and packaging specification for your products? Or is it more informal?`,
      },
    },
  },

  'cost-leakage': {
    default: {
      short: {
        primaryPost: `Here's something worth checking in your next budget review:

How much of your actual packaging cost is tracked as "packaging cost" on your P&L?

For most operations, the answer is about 30–40%. The rest — DIM weight surcharges, damage-driven returns, and labor inefficiency — shows up in freight, operations, and headcount.

This isn't a reporting problem. It's a management problem. If 60–70% of packaging cost isn't attributed to packaging decisions, it can't be optimized as packaging decisions.

The four-channel cost model — materials, freight, damage, labor — is the starting point for actually managing the full number.`,
        practicalTakeaway: `Ask your finance team to trace back packaging-related freight surcharges, damage costs, and pack station labor to a single view. The total will likely be 2–3× your materials budget.`,
        cta: `Build the four-channel model at premierpackaging.com.`,
        discussionQuestion: `Does your team currently track packaging cost beyond materials spend? What does your cost model include?`,
      },
      educational: {
        primaryPost: `The Four-Channel Packaging Cost Model: How to See What Your P&L Is Missing

One of the most consistent findings in packaging operations reviews is that companies manage a small fraction of their true packaging cost — because the rest isn't categorized as packaging.

Here's how the full cost breaks down:

Channel 1: Materials Cost
What you pay for boxes, cushioning, void fill, tape, and labels. This is almost always tracked. It represents 25–40% of total packaging-related cost for most operations.

Channel 2: Freight Cost (packaging-driven)
DIM weight surcharges from oversized boxes, cube utilization inefficiency, and carrier baseline rate impact from specification choices. This shows up in the freight line — not the packaging line. Typically represents $280,000–$480,000 for a $30M operation.

Channel 3: Damage and Returns
Product replacement cost, return freight, customer service handling, and customer retention impact from damaged deliveries. Shows up in operations and customer service. Often $180,000–$540,000 for a $30M operation.

Channel 4: Labor and Throughput
Pack station efficiency determines labor cost per unit. An unoptimized pack station costs 3–5× more labor per unit than an optimized one. Shows up in headcount and overtime — not packaging. Typically $120,000–$360,000 for a $30M operation.

Total for a $30M operation: $1,030,000–$1,830,000
Materials line managed: $450,000
Unmanaged gap: $580,000–$1,380,000

Companies that build and manage the full four-channel model recover 30–50% of the unmanaged gap in year one through specification changes, process improvements, and partner selection.

This is one of the most reliable paths to gross margin improvement available to mid-market consumer goods operations.`,
        practicalTakeaway: `Start by asking your freight team how much of your carrier charges come from DIM weight surcharges. That single number — if you can get it — usually reveals the magnitude of the unmanaged packaging cost and justifies building the full model.`,
        cta: `Connect with Premier Packaging for a full packaging cost model review. premierpackaging.com`,
        discussionQuestion: `Does your organization currently track packaging cost across all four channels? Which one is hardest to attribute back to packaging decisions?`,
      },
      discussion: {
        primaryPost: `Discussion for operations and finance leaders:

How does your organization currently attribute packaging-related costs that show up outside the packaging budget?

Specifically:
• DIM weight surcharges (shows up in freight)
• Product damage from specification failures (shows up in operations or CS)
• Pack station labor inefficiency (shows up in headcount)

In most organizations I've worked with, these aren't attributed back to packaging decisions — which makes it nearly impossible to optimize them as packaging decisions.

Has anyone built a cross-functional packaging cost model that connects these? Curious how you handled the attribution and whose budget took the hit for the improvements.`,
        practicalTakeaway: `Cross-functional attribution is the hard part. Starting with the freight team and asking about DIM surcharges is usually the easiest entry point — freight teams often track DIM separately and are willing to share the data.`,
        cta: `If you want a framework for building the cross-functional model, we can walk you through it. premierpackaging.com`,
        discussionQuestion: `Who in your organization "owns" packaging cost — and does their scope include freight, damage, and labor, or just materials?`,
      },
    },
  },

  'over-packaging': {
    default: {
      short: {
        primaryPost: `One of the most common and expensive packaging habits: over-packaging.

It shows up as void fill filling more than 30% of the box interior, boxes 15–20% larger than the product needs, and cushioning rated for impacts far beyond what the product will experience.

The instinct is usually protective — "more is safer." But damage isn't caused by insufficient packaging bulk. It's caused by specific failure modes (wrong compression strength, wrong cushioning type). Adding more material doesn't address those.

What it does add: materials cost per unit, DIM weight surcharges per shipment, and reduced cube efficiency per truck.

Right-sizing packaging reduces cost on all three fronts — without increasing damage rates when done with proper fragility analysis.`,
        practicalTakeaway: `Check your void fill ratio on your top 5 SKUs. If it's above 25%, you're likely over-packaging and paying DIM surcharges on the excess. That's the starting point for a right-sizing review.`,
        cta: `Start the right-sizing audit at premierpackaging.com.`,
        discussionQuestion: `How do you balance the instinct to add more packaging for protection vs. the cost of over-packaging in your operation?`,
      },
      educational: {
        primaryPost: `Over-Packaging: What It Costs and How to Fix It

Over-packaging is one of the most prevalent — and expensive — patterns in packaging operations. It's also one of the most overlooked because it feels like the safe choice.

Here's what "over-packaging" means specifically:
• Box dimensions 15%+ larger than product dimensions require
• Void fill consuming more than 25–30% of box interior volume
• Cushioning rated for fragility levels beyond what the product actually needs
• Double-boxing products that don't require secondary containment for protection or compliance

Why it's expensive — the compound cost:
1. Materials cost: 15–40% above an optimized specification
2. DIM weight surcharges: $0.40–$2.00 per shipment from the oversized box
3. Freight cube inefficiency: 10–25% reduction in units per pallet
4. Warehouse storage: oversized packaging takes more floor space per unit

For a 100,000-unit/year operation:
• Excess materials: $30,000–$80,000
• DIM weight surcharges: $40,000–$200,000
• Freight cube impact: $15,000–$50,000
Total: $85,000–$330,000 annually from over-packaging

Why it happens:
1. Reactive spec changes after damage events — "add more" is the immediate response
2. Inherited specifications from past requirements that weren't updated when products changed
3. Conservative default settings without product fragility data

The fix: a product fragility assessment followed by a specification review that right-sizes materials, cushioning, and box dimensions to actual protection requirements.

Most operations that complete this process maintain or improve their damage rates while recovering 12–22% in combined materials and freight cost.`,
        practicalTakeaway: `Run a void fill audit on your top 10 SKUs. Measure box interior volume, then measure the product. Calculate what percentage of interior volume is void fill. Any SKU above 25% void fill is a strong candidate for right-sizing.`,
        cta: `Connect with Premier Packaging for a right-sizing specification review. premierpackaging.com`,
        discussionQuestion: `When you've done right-sizing exercises in the past, what was the biggest challenge — getting buy-in, the testing process, or something else?`,
      },
    },
  },

  'shipping-cost': {
    default: {
      short: {
        primaryPost: `Before the next carrier negotiation — a quick thought:

Carrier negotiations typically recover 3–8% of shipping costs.
Packaging audits typically recover 12–20%.

The reason for the gap: DIM weight pricing is based on your packaging specifications. If your boxes are oversized, every carrier rate you negotiate applies to an inflated baseline.

The right sequence is: packaging audit first, carrier negotiation second. That way the discount applies to a lower base — and you capture both savings.

Companies that do it in that order consistently achieve 15–25% total shipping cost reduction.`,
        practicalTakeaway: `Run the packaging audit before the carrier contract comes up for renewal. The spec changes don't take long, and they change the baseline the negotiation happens from.`,
        cta: `Start the packaging audit at premierpackaging.com.`,
        discussionQuestion: `In your current process, which comes first — packaging review or carrier negotiation? And what has the result been?`,
      },
      educational: {
        primaryPost: `Why Carrier Negotiations Underperform (And What to Do About It)

Carrier negotiations are a standard tool for managing shipping costs. Used well, they work. Used in the wrong sequence, they leave significant savings on the table.

Here's the structural issue:

Dimensional weight pricing (DIM) means your carrier charges based on box cubic volume, not just product weight. If your packaging specifications create oversized boxes, you're billed a DIM surcharge on every shipment — and that surcharge is built into your base rate.

When you negotiate with the carrier, the discount applies to that base rate. Which means you're negotiating a percentage off a rate that already includes your packaging inefficiency.

The math:
• Oversized packaging → base rate: $3.20/shipment
• 10% carrier discount → $2.88 (saved $0.32/shipment)

• Right-sized packaging first → base rate: $2.10/shipment
• 10% discount on right-sized rate → $1.89 (saved $1.31/shipment vs. original)
• Additional savings vs. negotiation only: $0.99/shipment

At 100,000 annual shipments, that's $99,000 in additional savings from doing the packaging audit before the carrier negotiation.

Three steps to get the most from carrier negotiations:
1. Packaging audit — identify and right-size oversized specifications (2–4 hours on top 20 SKUs)
2. Specification changes — implement right-sized boxes and void fill targets
3. Carrier negotiation — now from the correct, lower baseline

Companies that follow this sequence achieve 15–25% total shipping cost reduction. Negotiation alone: 3–8%.`,
        practicalTakeaway: `Calculate your DIM weight ratio on your top 10 SKUs. If actual weight is consistently less than DIM weight, you have an oversized packaging problem that's inflating your carrier baseline. Fix that first, then negotiate.`,
        cta: `Premier Packaging runs packaging specification audits as part of cost reduction programs. premierpackaging.com`,
        discussionQuestion: `Has your team ever done a packaging specification review as part of a shipping cost reduction effort? What was the impact vs. carrier negotiation alone?`,
      },
    },
  },

  'warehouse-slowdowns': {
    default: {
      short: {
        primaryPost: `Before adding headcount at the pack station — have you timed the current workflow?

Most fulfillment operations add packers when volume increases without checking whether the workflow itself is the bottleneck. If the pack station process is inefficient, adding people scales the inefficiency rather than solving it.

A few benchmarks:
• Unoptimized pack station: 5–10 minutes per shipment
• Optimized pack station: 1.5–2.5 minutes per shipment
• Cost difference at $19/hour and 1,000 daily units: $350,000–$740,000 per year

The four biggest time-wasters: box selection, void fill application, labeling, and movement between steps. Each has a specific fix that doesn't require more people.`,
        practicalTakeaway: `Time your pack station workflow today — specifically, measure each step separately. Box selection, void fill, labeling, and staging. The step taking the most time is where the optimization starts.`,
        cta: `Premier Packaging helps operations optimize pack station workflows. premierpackaging.com`,
        discussionQuestion: `Have you timed your pack station workflow recently? What's your current minutes-per-shipment baseline?`,
      },
      educational: {
        primaryPost: `The Pack Station Efficiency Problem Most Operations Don't Measure

Labor cost per unit shipped is one of the most direct indicators of fulfillment efficiency. Yet most operations track it at a high level — total labor cost divided by total units shipped — rather than at the pack station step level, where the most recoverable inefficiency tends to live.

Here's what the data typically shows:

Time-motion breakdown of an unoptimized pack station:
• Box selection and erection: 1.5–3 minutes
• Product placement and cushioning: 0.5–1 minute
• Void fill application: 1.5–3 minutes
• Close, tape, and seal: 0.5–1 minute
• Labeling and staging: 1–2 minutes
Total: 5–10 minutes per shipment

Time-motion breakdown of an optimized pack station:
• Pre-erected boxes (sorted by SKU): 0.3–0.5 minutes
• Product placement: 0.3–0.5 minutes
• Metered void fill (auto-dispense): 0.5–0.8 minutes
• Automated tape and seal: 0.2–0.3 minutes
• Auto-print-and-apply label: 0.2–0.3 minutes
Total: 1.5–2.4 minutes per shipment

At $19/hour labor and 1,000 daily shipments:
• Unoptimized: $1,583–$3,167/day ($409,000–$819,000/year)
• Optimized: $475–$760/day ($123,000–$197,000/year)
• Annual savings opportunity: $212,000–$622,000

The four optimization levers that drive most of the improvement:
1. Box pre-erection — eliminate folding time at the station
2. Right-sized box selection — fewer SKU options = faster decision
3. Metered void fill dispenser — eliminate estimation and application time
4. Workstation layout optimization — minimize reach and movement distance

The investment in these improvements typically pays back in 6–12 weeks at the labor savings rates above.`,
        practicalTakeaway: `Run a time-motion study on your pack station this week. Record each step separately. Then benchmark against the optimized times above. The gap tells you the ROI of fixing it before you add the next packer.`,
        cta: `Connect with Premier Packaging for a pack station efficiency assessment. premierpackaging.com`,
        discussionQuestion: `Does your team track labor cost per unit at the pack station level? What's your current benchmark — and have you ever done a formal time-motion study?`,
      },
    },
  },

  'return-damage': {
    default: {
      short: {
        primaryPost: `A question for operations teams managing returns:

Do you specify return packaging for your high-value SKUs — or leave it to the customer?

Products that leave the customer undamaged can arrive back at the warehouse as non-resaleables due to inadequate packaging on the return leg. For operations with return rates above 10%, this is a measurable cost line.

Industry data suggests ~35% of non-resaleable returns involve transit damage that originated in packaging failures — not product failures.

The fix isn't complicated: specify return packaging for your top-value SKUs. Include it in the box or make it easy to access via a return portal. The write-off prevention typically pays back the investment within 30–60 days.`,
        practicalTakeaway: `Calculate your annual non-resaleable return rate by SKU. For your top 10 SKUs by return volume, estimate how many arrived damaged after the customer sent them back in good condition. That's your packaging-related return exposure.`,
        cta: `Review your return packaging specifications at premierpackaging.com.`,
        discussionQuestion: `Does your operation currently specify return packaging for high-value products? What approach are you using?`,
      },
      educational: {
        primaryPost: `Return Packaging: The Overlooked Cost That's Hiding in Your Write-Off Line

Returns management gets significant attention in e-commerce and consumer goods operations. Return rate, return processing time, and resale rate are commonly tracked. But one specific contributor to non-resaleable returns is almost universally undertracked: transit damage on the return leg caused by inadequate packaging.

Here's the problem in concrete terms:

A customer initiates a return on a $90 consumer product. The product is undamaged. They ship it back in whatever packaging is convenient — a poly bag, a reused original box that's been compressed, or no protective packaging at all. It travels through the carrier network. It arrives at your warehouse with a cracked surface or bent component. Non-resaleable. Write-off.

The question most operations don't ask: was this a product failure, a carrier failure, or a return packaging failure?

In most cases where a product leaves the customer undamaged and arrives at the warehouse damaged, it's a return packaging failure.

Industry data on the scale of this:
• 18–22% of returns arrive non-resaleable in most categories
• ~35% of those involve transit damage that could have been prevented with proper return packaging
• For a $10M operation with a 12% return rate, the preventable write-offs from this source: $84,000+ annually

Three root causes:
1. No return packaging specification — customers use whatever is available
2. Customer reuse of original packaging — already compromised by unboxing
3. Return carrier handling expectations not accounted for (parcel vs. original outbound carrier)

Three solution options:
1. Include a pre-printed return box for high-value SKUs in the original shipment ($0.15–$0.60/unit)
2. QR-code return portal that specifies packaging requirements by product
3. Return kit included with original order for SKUs above a value threshold

ROI: for $84,000 in preventable write-offs, a $0.30/unit return packaging inclusion costs ~$18,000 annually for a 60,000-unit operation. Payback: 2–3 months.`,
        practicalTakeaway: `Add a "return packaging failure" cause code to your returns processing workflow. Track it separately from product defects and customer-preference returns. After 90 days, you'll have a clear picture of the recoverable cost in this category.`,
        cta: `Connect with Premier Packaging for a return packaging specification review. premierpackaging.com`,
        discussionQuestion: `Does your returns team track transit damage on returned items separately from product defects? What percentage do you think comes from packaging vs. product issues?`,
      },
    },
  },

  'freight-inefficiency': {
    default: {
      short: {
        primaryPost: `Freight cost optimization has two levers: carrier rates and cube utilization.

Most operations focus almost exclusively on carrier rates. Few measure cube utilization — the percentage of truck space actually filled by shipments.

Industry average cube utilization: 62%.
Optimized operations: 82–88%.

Moving from 62% to 80% on a $500,000 freight budget saves $90,000/year — without changing your carrier or renegotiating a single rate.

Cube utilization is primarily a packaging dimension decision. Box dimensions that don't tile cleanly on pallets, or oversized boxes that reduce units per layer, are the primary causes of poor cube efficiency.

It's a packaging engineering problem with a significant freight cost solution.`,
        practicalTakeaway: `Pull 10 recent shipments and calculate cube utilization: (total product cubic volume) ÷ (truck cubic capacity). Average across the 10 shipments. If you're below 70%, there's significant freight cost improvement available through packaging dimension changes.`,
        cta: `Measure your cube utilization at premierpackaging.com.`,
        discussionQuestion: `Does your team track cube utilization per shipment or per truck? What's your current average?`,
      },
      educational: {
        primaryPost: `Cube Utilization: The Freight Lever Most Operations Aren't Managing

Shipping cost optimization in most operations follows the same path: benchmark carrier rates, issue an RFP or renegotiate the contract, achieve a discount, move on.

The problem: this approach manages only one of the two primary freight cost levers.

The second lever — cube utilization — is often more impactful and is entirely within the operation's control. It doesn't require carrier cooperation or contract negotiations. It requires packaging engineering.

What cube utilization measures:
Cube utilization = (total cubic volume of products shipped) ÷ (total cubic capacity of the truck or container)

Industry average: 62%
Optimized operations: 82–88%
Gap: 20–26 percentage points

Financial impact of the gap:
For a $1M annual freight budget:
• At 62% utilization: $1.60/unit (at 625,000 units)
• At 82% utilization: $1.22/unit
• Annual savings: $237,500
• No carrier relationship changes required

What drives poor cube utilization — and how packaging causes it:
1. Non-standard box dimensions that don't tile cleanly on standard pallets (48"×40")
2. Oversized boxes that reduce the number of units per pallet layer
3. Mixed-SKU palletizing that creates unavoidable gaps without packaging dimension coordination
4. Packaging shapes that can't be stacked vertically for full utilization

The packaging fix:
Design box outer dimensions to divide evenly into standard pallet dimensions. This often means:
• Revising box dimensions to fit 3, 4, or 5 across on a 40" pallet width
• Reducing box height to allow an additional pallet layer
• Coordinating mixed-SKU pallet patterns through packaging dimension standardization

For a typical mid-market operation, packaging dimension changes for cube optimization deliver permanent freight cost reduction of $100,000–$250,000+ annually, with an engineering investment of $10,000–$30,000.`,
        practicalTakeaway: `Calculate your standard pallet cube: 48" × 40" × 72" = 92,160 cubic inches. For your top-volume SKUs, calculate how many fit on a pallet at current dimensions vs. revised dimensions. The improvement in units per pallet directly translates to freight cost savings per unit shipped.`,
        cta: `Premier Packaging can help you engineer packaging dimensions for cube optimization. premierpackaging.com`,
        discussionQuestion: `Has your operation ever approached packaging design with cube utilization as a primary engineering requirement? What was the result?`,
      },
    },
  },

  scaling: {
    default: {
      short: {
        primaryPost: `A note for operations teams managing fast growth:

Packaging operations that aren't reviewed during a growth phase tend to scale their inefficiencies alongside volume. More shipments through the same unoptimized workflow means proportionally more waste — not less.

The result: cost per unit stays flat or rises when it should be falling.

Industry benchmarks for consumer goods operations at $15M–$40M revenue:
• Optimized operations: $1.20–$1.60/unit packaging cost
• Unoptimized operations: $1.75–$2.30/unit packaging cost
• Gap at $25M revenue: up to $1.2M annually

The right time to review: during the growth phase — specifically at 50% volume growth from the last review, before the next doubling.`,
        practicalTakeaway: `Track your packaging cost per unit over the last 12 months. If it isn't declining with volume growth, the packaging operation needs a review. That's the clearest indicator.`,
        cta: `Schedule a scaling packaging review at premierpackaging.com.`,
        discussionQuestion: `At what growth milestone did you last review your packaging operation comprehensively? What triggered the review?`,
      },
      educational: {
        primaryPost: `How to Scale Your Packaging Operation Without Scaling the Cost

One of the most common — and costly — patterns in growing operations: packaging costs per unit that don't decline with volume growth. When a packaging operation is reviewed and optimized during a growth phase, unit costs fall as volume increases. When it isn't, unit costs stay flat or rise — and the gap compounds.

Why packaging operations stall at scale:

1. Inherited specifications — box sizes, materials, and cushioning types chosen when the product assortment and volume were different
2. Pack station workflow designed for manual throughput at lower volumes, not for the current daily unit count
3. No one owns packaging cost per unit as a KPI — it's managed as a materials budget, not a gross margin lever

The financial case for reviewing during growth:

Consumer goods benchmarks at $15M–$40M revenue:
• Optimized packaging operation: $1.20–$1.60/unit
• Unoptimized (inherited specs, unreviewed workflows): $1.75–$2.30/unit
• Gap: $0.55–$0.70/unit

At 2 million annual units (typical for $25M+ consumer goods operations): the gap = $1.1M–$1.4M annually.

Five areas to review during a growth phase:
1. Box specifications — do current dimensions still match current SKU mix?
2. DIM weight exposure — recalculate at new volume and carrier mix
3. Pack station workflow — time-motion study at current throughput rate
4. Damage rate trend — has it changed as volume has increased?
5. Carrier mix — does current packaging support the new shipping lanes efficiently?

Companies that complete this review during the growth phase (vs. after) recover an average of $600,000–$1.0M annually for $20M–$35M operations.

The review typically takes 2–4 weeks and costs a fraction of the first-year recovery.`,
        practicalTakeaway: `Set a packaging review trigger at 50% volume growth from your last review date. If you've never done a formal review, start with your cost per unit trend. If it isn't declining with scale, that's the clearest indicator that the review is overdue.`,
        cta: `Connect with Premier Packaging for a growth-phase packaging operations review. premierpackaging.com`,
        discussionQuestion: `What triggers a packaging operations review in your organization? Is it a planned interval, a cost signal, or usually reactive to a specific problem?`,
      },
    },
  },

  'margin-loss': {
    default: {
      short: {
        primaryPost: `A reframe that might be useful for operations and finance leaders:

Packaging decisions are gross margin decisions.

They affect gross margin through four channels: materials cost, freight (DIM weight and cube), damage and returns, and labor efficiency. Most organizations manage one of these well — materials — and leave the others unattributed to packaging.

For a $30M consumer goods operation, the full packaging cost model typically reveals $1M–$1.8M in packaging-related cost across all four channels. The materials line managed as "packaging cost" is usually $400,000–$500,000.

The gap — $600,000–$1.4M — is unmanaged because it's not recognized as a packaging cost.

Managing all four channels is how packaging stops being an operations detail and starts being a gross margin lever.`,
        practicalTakeaway: `Ask your CFO what total packaging-related cost appears across all P&L line items — not just in the materials budget. That conversation usually reveals the size of the unmanaged gap.`,
        cta: `Build the four-channel model with Premier Packaging. premierpackaging.com`,
        discussionQuestion: `In your organization, who owns packaging cost — and does that ownership include freight, damage, and labor, or primarily just materials?`,
      },
      educational: {
        primaryPost: `The Full Financial Impact of Packaging Decisions on Gross Margin

Packaging is typically managed as a cost center — specifically as a materials cost line. This framing is accurate but incomplete, and the incompleteness is expensive.

Here's the full picture of how packaging decisions affect gross margin:

Channel 1: Materials Cost ($450K for $30M operation)
What goes into the materials budget — boxes, cushioning, void fill, tape, labels. Usually managed with competitive sourcing and volume pricing. This is the most visible packaging cost. It represents about 25–40% of total packaging-related cost.

Channel 2: Freight Impact ($280K–$480K for $30M operation)
DIM weight surcharges from oversized packaging, cube utilization inefficiency from poor box dimensions, and carrier baseline rates inflated by specification choices. None of this appears in the packaging budget. It's in freight.

Channel 3: Damage and Returns ($180K–$540K for $30M operation)
Product replacement from specification-driven damage, return freight on damaged units, customer service handling cost, and customer retention impact. This is in operations and customer service.

Channel 4: Labor and Throughput ($120K–$360K for $30M operation)
Pack station efficiency — minutes per unit × labor rate. An unoptimized station can cost 3–5× more per unit than an optimized one. This is in headcount and overtime.

Total packaging-related cost: $1,030,000–$1,830,000
Materials-only managed cost: $450,000
Unmanaged gap: $580,000–$1,380,000

The reason this gap persists: without cross-functional attribution, packaging decisions that increase freight or damage costs aren't connected back to the packaging choice that caused them. Materials cost goes down, gross margin goes down, and nobody connects the dots.

The solution: build the four-channel model, assign cross-functional ownership, and evaluate all packaging decisions against the full cost impact — not just the materials line.`,
        practicalTakeaway: `Start with freight: ask your logistics team what percentage of freight spend comes from DIM weight surcharges. That one number will often be enough to justify building the full cross-functional model — because the DIM cost alone usually exceeds the packaging materials budget.`,
        cta: `Connect with Premier Packaging for a full four-channel packaging cost review. premierpackaging.com`,
        discussionQuestion: `Has your organization ever built a packaging cost model that includes freight, damage, and labor alongside materials? What did you find — and who owned the initiative?`,
      },
    },
  },
}

function getTemplate(problem: PackagingProblem, format: FacebookFormat, variation: ContentVariation): FacebookTemplate {
  const problemTemplates = TEMPLATES[problem] ?? TEMPLATES['cost-leakage']
  const variantTemplates = problemTemplates[variation] ?? problemTemplates['default']!
  const formatTemplate = variantTemplates[format] ?? variantTemplates['educational']!
  return formatTemplate
}

const REPURPOSING_BY_FORMAT: Record<FacebookFormat, string[]> = {
  short: [
    'Condense into a Twitter/X single post — remove conversational tone, keep the data.',
    'Use the opening as a LinkedIn post hook.',
    'Convert practical takeaway into an Instagram story "quick tip" frame.',
  ],
  educational: [
    'Break each section into a separate LinkedIn post for a multi-week series.',
    'Convert the numbered list into a YouTube video section outline.',
    'Use the practical takeaway as a standalone Instagram carousel CTA slide.',
    'Adapt the intro and conclusion as a Twitter/X thread opener and closer.',
  ],
  discussion: [
    'Post the discussion question as a Twitter/X poll.',
    'Expand the discussion framing into a full LinkedIn post.',
    'Use the question as an Instagram story poll or question sticker.',
  ],
  'business-owner': [
    'Convert into a LinkedIn post targeted at founders and owner-operators.',
    'Use the main story as a YouTube Shorts voiceover script.',
    'Adapt the practical steps into an Instagram carousel.',
  ],
  retargeting: [
    'Use as a LinkedIn retargeting ad copy draft.',
    'Convert CTA into a Twitter/X sponsored post.',
    'Adapt as an email subject line and opening paragraph for warm leads.',
  ],
}

export function generateFacebookContent(inputs: FacebookInputs, variation: ContentVariation = 'default'): FacebookOutput {
  const template = getTemplate(inputs.mainProblem, inputs.contentFormat, variation)

  const qualityScore = scoreContent({
    hook: template.primaryPost.split('\n')[0] ?? '',
    body: template.primaryPost,
    cta: template.cta,
    variation,
  })

  const improvementSuggestions: string[] = [
    `For a ${inputs.contentFormat} format targeting ${inputs.targetReader}, consider adding a first-person observation ("In our 25+ years...") to build credibility early.`,
    'Add a specific dollar figure in the first paragraph to anchor the financial impact before the explanation.',
    'Facebook educational posts perform best with numbered lists or bullet points — consider reformatting the key points if they\'re in prose.',
    'End the post with the discussion question before the CTA to maximize comment engagement.',
  ]

  return {
    primaryPost: template.primaryPost,
    practicalTakeaway: template.practicalTakeaway,
    cta: template.cta,
    discussionQuestion: template.discussionQuestion,
    repurposingSuggestions: REPURPOSING_BY_FORMAT[inputs.contentFormat],
    qualityScore,
    improvementSuggestions,
  }
}
