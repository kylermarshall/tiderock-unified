import type {
  LinkedInInputs,
  LinkedInOutput,
  PostIdea,
  FullPost,
  CalendarEntry,
  PackagingProblem,
  ContentVariation,
} from '../lib/types'
import { scoreContent } from '../lib/scoring'

// ─── Full post templates ──────────────────────────────────────────────────────

type VariantMap = Record<ContentVariation, FullPost>

const POSTS: Record<PackagingProblem, Partial<VariantMap>> = {
  'box-sizing': {
    default: {
      hook: `Your carrier costs went up again.\nThe problem probably isn't your rates.`,
      body: `Most operations teams respond to rising shipping costs by renegotiating carrier contracts.\nThe carrier rarely moves much.\nThe costs keep climbing.\n\nDimensional weight pricing means your carrier charges based on box volume — not product weight.\nIf your box is larger than it needs to be, you're paying for empty air.\n\nA box that's 15% oversized can add $0.60–$1.80 per shipment in DIM weight charges.\nAt 8,000 shipments per month, that's $57,600–$172,800 in annual waste.\n\nThe fix isn't a new carrier contract.\nIt's a packaging audit.\n\nMost companies find 12–20% shipping cost reduction after right-sizing their boxes.`,
      businessImpact: `Oversized packaging adds DIM weight surcharges, increases void fill cost, and reduces truck utilization. Right-sizing typically cuts shipping costs by 8–20%.`,
      cta: `Tag an ops leader who's fighting carrier costs without looking at the box first.`,
    },
    executive: {
      hook: `Your carrier contract isn't where the savings are.\nYour packaging specification is.`,
      body: `CFOs review carrier contracts.\nThey rarely review packaging specifications.\n\nDimensional weight pricing penalizes any box with excess cubic volume.\nThat penalty compounds across every shipment, every route, every month.\n\nThe math:\n— 10% oversized box → 10–15% DIM weight surcharge\n— 50,000 shipments per year → $80,000–$200,000 in unnecessary freight cost\n— Two years without an audit → $160,000–$400,000 left on the table\n\nRight-sizing your packaging specification is a capital decision with a 3–6 month payback period.\nMost packaging audits cost less than one month of the waste they prevent.`,
      businessImpact: `Packaging specification decisions directly impact freight cost, damage rates, and working capital. A single spec change across high-volume SKUs can deliver six-figure annual savings.`,
      cta: `If you're running a financial review, add packaging specifications to the scope.`,
    },
    contrarian: {
      hook: `Stop blaming your carrier.\nYour packaging is the problem.`,
      body: `Unpopular take: your carrier isn't overcharging you.\nDimensional weight pricing was designed to recover the real cost of moving large, light boxes.\nIf your box is too big, that's a packaging decision — not a carrier problem.\n\nMost ops teams won't admit this:\nThey inherited packaging specifications from someone who left years ago.\nNobody has audited those specifications since.\nEvery SKU is still shipping in a box chosen for convenience, not efficiency.\n\nOne operation found that 40% of their SKUs were in boxes 25%+ too large.\nThe annual freight cost from that: $340,000.\nThe cost of the packaging audit: $8,000.\n\nThe problem isn't the carrier.\nIt's the spec sheet.`,
      businessImpact: `Packaging specification inertia — continuing to use boxes not optimized for current products — is one of the most overlooked cost drivers in logistics.`,
      cta: `When did you last audit your packaging specifications? Drop a year in the comments.`,
    },
    direct: {
      hook: `Your boxes are too big.\nYou're paying for it every shipment.`,
      body: `Dimensional weight pricing charges by volume, not by product weight.\nOversized boxes mean DIM surcharges on every order.\n\n$0.60–$1.80 per shipment.\nMultiply that by your monthly volume.\n\nThe fix is a packaging audit — not a carrier negotiation.`,
      businessImpact: `Right-sizing boxes typically reduces shipping costs by 8–20% without changing carriers.`,
      cta: `Start with a packaging audit before your next carrier negotiation.`,
    },
    shorter: {
      hook: `Your shipping costs are high because your boxes are too big — not because of your carrier.`,
      body: `DIM weight pricing charges by cubic volume.\nOversized boxes add $0.60–$1.80 per shipment.\nAt scale, that's six figures annually.\n\nAudit your box specifications before renegotiating rates.`,
      businessImpact: `Right-sizing packaging specs reduces shipping costs by 8–20%.`,
      cta: `Start the audit before the next carrier conversation.`,
    },
    specific: {
      hook: `Shipping costs are up.\nThe culprit is usually the same: a box 15% too large for the product.`,
      body: `Dimensional weight (DIM) pricing is calculated as: (length × width × height) ÷ DIM divisor.\nIf your box is larger than your product needs, you're billed for dimensions you don't use.\n\nBenchmark data:\n— 15% oversized box → $0.80–$1.80 DIM surcharge per shipment\n— 10,000 monthly shipments → $96,000–$216,000 per year in preventable charges\n— Industry average: 34% of SKUs ship in oversized boxes (Packaging Strategies, 2023)\n\nRight-sizing your packaging mix reduces DIM charges by an average of 14% in year one.\nFor a $2M annual shipping budget, that's $280,000 recovered.`,
      businessImpact: `DIM weight surcharges from oversized boxes cost the average mid-size operation $80,000–$300,000 annually. A packaging audit typically delivers full ROI within 90 days.`,
      cta: `Review your top 10 SKUs by shipping volume. That's where the money is.`,
    },
  },

  'damage-prevention': {
    default: {
      hook: `Your carrier didn't damage that product.\nYour packaging did.`,
      body: `Most damage claims point to the carrier first.\nThe investigation usually ends there.\n\nBut 60% of product damage in transit occurs due to packaging failure — not handling.\nUndersized void fill, wrong cushioning type, incorrect box compression strength.\nThese are packaging decisions made before the product leaves the building.\n\nEvery damaged shipment carries three costs:\n1. Product replacement\n2. Return freight\n3. Brand exposure when a customer receives it\n\nA 5% damage rate on $4M in annual shipments is $200,000 in direct exposure.\nMost of that is preventable with a packaging specification review.\n\nThe fix starts with understanding where the failure is occurring — in the spec, not the carrier.`,
      businessImpact: `Product damage in transit costs the average consumer goods company 1–3% of revenue annually. Packaging specification errors account for the majority of preventable damage events.`,
      cta: `If your damage rate is above 2%, start with a packaging audit — not a carrier claim.`,
    },
    executive: {
      hook: `A 3% damage rate isn't a carrier problem.\nIt's a $240,000 annual exposure hiding in your packaging spec.`,
      body: `Product damage in transit shows up on the P&L in three places:\n— Direct replacement cost\n— Return and reship freight\n— Customer retention impact from brand damage\n\nFor a $8M operation shipping physical goods, a 3% damage rate means:\n— $240,000 in annual direct losses\n— 2–4% higher customer churn among recipients of damaged goods\n— Carrier claim resolution averaging 45–90 days\n\nThe right question isn't "which carrier handles better."\nIt's "where in our packaging specification is this failure starting?"\n\nMost operations can reduce damage rates by 40–60% through specification changes alone — without changing carriers.`,
      businessImpact: `Packaging-related damage events are a strategic financial risk. Addressing them through specification improvements delivers faster ROI than carrier contract changes.`,
      cta: `Map your top damage SKUs against their packaging specifications. The pattern is usually clear.`,
    },
    contrarian: {
      hook: `You're filing carrier claims for damage your own packaging caused.`,
      body: `Carrier claims feel like the right move when product arrives damaged.\nBut most claims get denied — because the carrier isn't always at fault.\n\nStandard packaging specifications assume certain conditions:\n— A specific number of drops\n— A specific compression weight\n— A specific temperature range\n\nIf your spec was designed for LTL and you're shipping parcel, the packaging was wrong from the start.\n\nFiling claims on packaging failures costs time, strains carrier relationships, and doesn't fix the underlying spec problem.\nThe damage will keep happening.\n\nAudit the specification first. Then decide if the carrier is the issue.`,
      businessImpact: `Misattributing packaging failures to carriers leads to unresolved damage patterns and deteriorating carrier relationships. Root cause analysis almost always leads back to the spec.`,
      cta: `Pull your last 90 days of damage claims. How many were actually packaging failures?`,
    },
    direct: {
      hook: `60% of product damage in transit is caused by packaging — not carriers.`,
      body: `Wrong cushioning. Undersized void fill. Box compression strength that doesn't match the stack.\n\nThese are packaging decisions — and they're the primary cause of most damage events.\n\nA 5% damage rate on $4M in shipments is $200,000 in direct exposure.\nThe spec review costs a fraction of that.`,
      businessImpact: `Packaging specification failures account for the majority of preventable transit damage.`,
      cta: `Review your spec against your top damage SKUs this week.`,
    },
    shorter: {
      hook: `Most product damage in transit is caused by the packaging — not the carrier.`,
      body: `Wrong box strength. Insufficient cushioning. Inadequate void fill.\nThese are specification issues, not handling issues.\n\nFix the spec before filing the claim.`,
      businessImpact: `Packaging-related damage typically accounts for 60% of transit damage events.`,
      cta: `Audit your damage SKUs against current packaging specifications.`,
    },
    specific: {
      hook: `Industry data: 60% of transit damage events originate in the packaging specification — before the carrier touches the box.`,
      body: `Common specification failures:\n— Box compression strength (BCT) under-rated for stacking: 23% of damage events\n— Void fill below 80% of internal volume: 19% of damage events\n— Cushioning material mismatched to product fragility: 18% of damage events\n\nCost model for a 4% damage rate on $5M in annual shipments:\n— Product replacement: $120,000\n— Return freight: $40,000\n— Customer service and reorder handling: $20,000\n— Total annual exposure: $180,000\n\nOperations that completed a packaging audit reduced damage rates by an average of 52% in year one.`,
      businessImpact: `Transit damage is a measurable, recoverable cost. Specification-driven improvements consistently deliver 40–60% damage rate reduction.`,
      cta: `Calculate your annual damage exposure. If it exceeds $50,000, a specification audit pays for itself immediately.`,
    },
  },

  'cost-leakage': {
    default: {
      hook: `Your packaging budget looks fine on paper.\nThe actual cost is different.`,
      body: `Most companies track packaging spend by materials cost.\nThat's the visible part.\n\nThe invisible part:\n— Labor time per pack station\n— Void fill consumed per shipment\n— Returns due to packaging failure\n— DIM weight surcharges from oversized boxes\n— Damage claims and replacements\n\nNone of these show up as "packaging cost" in most P&Ls.\nThey show up as shipping, operations, and customer service line items.\n\nCompanies that audit their true packaging cost — materials plus downstream impact — typically find 18–30% more spend than expected.\n\nThat gap is recoverable.`,
      businessImpact: `True packaging cost includes materials, labor, freight surcharges, damage, and returns. The downstream costs typically exceed materials cost by 40–80%.`,
      cta: `Build a full packaging cost model before your next budget review. The materials line is just the beginning.`,
    },
    executive: {
      hook: `Your P&L is understating your packaging cost by 30–50%.\nHere's where the rest is hiding.`,
      body: `Standard accounting treats packaging as a materials cost.\nBut packaging decisions affect four other line items:\n\n1. Freight — DIM weight surcharges from oversized boxes\n2. Operations — labor inefficiency at the pack station\n3. Damage — product replacement and return freight\n4. Customer service — claims, reorders, and retention cost\n\nFor a $20M operation, a 25% understatement of packaging cost means $2–4M in misattributed spend.\nThat spend can't be managed until it's correctly attributed.\n\nA comprehensive packaging cost model is a prerequisite for accurate margin management.`,
      businessImpact: `Packaging decisions ripple through freight, operations, damage, and customer retention. Boards and CFOs that see only materials cost are making resource allocation decisions on incomplete data.`,
      cta: `Ask your finance team how packaging is currently categorized in your P&L. That conversation usually opens the audit.`,
    },
    contrarian: {
      hook: `Cheaper packaging materials don't lower your packaging cost.\nThey usually raise it.`,
      body: `This is the most common packaging mistake I see:\nA team cuts material costs by 8% by switching to a lighter box or thinner cushioning.\nDamage rates go up 12%.\nReturn freight increases.\nCarrier claims spike.\n\nNet result: materials spend is lower. Total packaging cost is higher.\n\nPackaging cost and materials cost are not the same thing.\nMaterials cost is what you pay at the dock.\nPackaging cost is what you pay across the entire order lifecycle.\n\nOptimizing one without understanding the other is how $50,000 in savings turns into $180,000 in new exposure.`,
      businessImpact: `Materials cost reductions that increase damage rates, void fill usage, or labor time often result in net cost increases. Total cost of packaging — not just materials — is the correct optimization target.`,
      cta: `Before your next materials cost reduction, model the downstream impact first.`,
    },
    direct: {
      hook: `You're tracking packaging materials cost. You're ignoring packaging's total cost.`,
      body: `The real cost includes:\n— DIM weight surcharges\n— Damage and returns\n— Labor inefficiency\n— Void fill overconsumption\n\nMost operations understate packaging cost by 18–30%.\nThat's the recoverable gap.`,
      businessImpact: `Total packaging cost exceeds materials cost by 40–80% when downstream impacts are included.`,
      cta: `Build the full cost model before approving the next packaging spec change.`,
    },
    shorter: {
      hook: `Packaging materials cost is just the visible part. The rest is bleeding through freight, damage and returns.`,
      body: `Most companies understate their packaging cost by 18–30%.\nDIM surcharges, damage claims, and void fill overconsumption don't show up as packaging line items.\n\nFind the full cost before trying to cut it.`,
      businessImpact: `True packaging cost includes freight surcharges, damage, returns, and labor — not just materials.`,
      cta: `Map your full packaging cost before the next budget review.`,
    },
    specific: {
      hook: `Companies that audit their full packaging cost find 18–30% more spend than their materials line reflects.`,
      body: `Where the hidden cost lives:\n— DIM weight surcharges: avg. $0.60–$2.40 per oversized shipment\n— Void fill overconsumption: 15–25% above spec in unmonitored pack stations\n— Damage-driven returns: 1.5–4% of shipped units for underpacked products\n— Pack station labor inefficiency: 8–12 minutes per order in unoptimized workflows\n\nFor a 50,000-unit/month operation, hidden packaging costs typically total:\n— $36,000–$144,000 in DIM surcharges\n— $18,000–$60,000 in excess void fill\n— $40,000–$120,000 in damage and returns\nTotal: $94,000–$324,000 annually — outside the materials budget.`,
      businessImpact: `Hidden packaging costs are recoverable once identified. A full audit typically delivers 3–5x ROI in year one.`,
      cta: `Start the cost model with your top 20 SKUs by shipment volume. The gap becomes obvious quickly.`,
    },
  },

  'over-packaging': {
    default: {
      hook: `You're shipping air.\nAnd paying full freight on every cubic inch of it.`,
      body: `Over-packaging is the packaging industry's most expensive habit.\nIt feels safe — more fill, bigger box, heavier material.\nBut every gram of excess material carries a freight cost, a materials cost, and a DIM weight penalty.\n\nCommon over-packaging patterns:\n— Void fill used to compensate for the wrong box size\n— Double-boxing products that don't require it\n— Cushioning rated for impacts your product will never experience\n\nOne mid-size operation reduced packaging material spend by 22% simply by matching box dimensions to product dimensions.\nFreight costs dropped 14% in the same period.\n\nLess material. Lower cost. Same protection.`,
      businessImpact: `Over-packaging adds materials cost, DIM weight charges, and freight inefficiency simultaneously. Right-sizing materials and box dimensions typically reduces combined packaging and freight cost by 12–25%.`,
      cta: `Review your void fill consumption per shipment. That number tells you a lot.`,
    },
    executive: {
      hook: `Over-packaging isn't conservative. It's a margin leak at scale.`,
      body: `Operations that over-package believe they're reducing risk.\nThe data suggests otherwise.\n\nOver-packaging doesn't reduce damage rates proportionally to its added cost.\nIt does:\n— Increase DIM weight on every shipment\n— Add materials cost per unit\n— Reduce truck utilization\n— Create unnecessary sustainability exposure\n\nFor a 100,000-unit/year operation, 20% over-packaging means:\n— $40,000–$120,000 in excess DIM weight charges\n— $20,000–$60,000 in excess materials cost\n— 15–20% reduction in freight cube efficiency\n\nRight-sizing packaging is a margin recovery exercise with measurable, fast payback.`,
      businessImpact: `Over-packaging imposes compound costs — materials, freight, and sustainability — without proportionate risk reduction. The financial case for right-sizing is typically strong.`,
      cta: `Request a packaging utilization report from your operations team. Start with your five highest-volume SKUs.`,
    },
    contrarian: {
      hook: `More packaging doesn't mean better protection.\nIt means higher cost and the same damage rate.`,
      body: `The instinct to add more packaging after a damage event is understandable.\nIt's also usually wrong.\n\nDamage in transit is caused by specific failure modes — not by insufficient bulk material.\nAdding more void fill to the wrong box doesn't fix the problem.\nIt adds cost, increases DIM weight, and delays the real solution.\n\nThe question isn't "do we have enough packaging?"\nIt's "do we have the right packaging for this product, this carrier, and this route?"\n\nMore is rarely the answer. Right is.`,
      businessImpact: `Reactive over-packaging after damage events adds cost without addressing root cause. Specification-based solutions reduce both damage rates and materials cost.`,
      cta: `Next time there's a damage event, start with root cause analysis — not more void fill.`,
    },
    direct: {
      hook: `You're spending more on packaging than your products need. Every shipment.`,
      body: `Over-packaging adds materials cost plus DIM weight charges on every order.\nIt doesn't reduce damage rates proportionally.\n\nRight-sizing saves on both sides simultaneously:\n— Lower materials cost per unit\n— Lower DIM weight per shipment`,
      businessImpact: `Right-sizing packaging typically reduces combined materials and freight cost by 12–25%.`,
      cta: `Start with your five highest-volume SKUs and measure current void fill percentage.`,
    },
    shorter: {
      hook: `Over-packaging adds cost twice — materials and DIM weight — without meaningfully reducing damage.`,
      body: `The fix is right-sizing, not adding more.\nMost operations recover 12–25% in combined packaging and freight cost after a specification review.`,
      businessImpact: `Right-sized packaging reduces both materials and shipping cost simultaneously.`,
      cta: `Measure void fill per shipment on your top SKUs. That's where to start.`,
    },
    specific: {
      hook: `The average e-commerce shipment contains 40% empty space. Every cubic inch of that costs money.`,
      body: `Over-packaging cost breakdown:\n— Excess void fill: $0.12–$0.40 per shipment in wasted material\n— DIM weight surcharge on oversized box: $0.60–$1.80 per shipment\n— Reduced truck utilization: 15–25% efficiency loss per route\n\nFor 60,000 shipments per year:\n— Void fill waste: $7,200–$24,000\n— DIM surcharges: $36,000–$108,000\n— Freight inefficiency (truck utilization impact): $15,000–$45,000\nTotal: $58,200–$177,000 in preventable annual cost\n\nOperations that right-sized packaging saw average savings of 17% across combined materials and freight spend.`,
      businessImpact: `Over-packaging is a compound cost problem. Solving it recovers margin on both the materials and the freight side.`,
      cta: `Calculate your average void fill percentage. Anything above 25% is a right-sizing opportunity.`,
    },
  },

  'shipping-cost': {
    default: {
      hook: `Shipping costs aren't a carrier problem.\nThey're a packaging decision problem.`,
      body: `The most common response to rising shipping costs: renegotiate the carrier contract.\nThe most common result: marginal improvement.\n\nWhy? Because DIM weight pricing means carriers are already charging by volume.\nIf your packaging isn't optimized for the dimensions of your products, renegotiating rates recovers a fraction of what specification changes would.\n\nThree packaging decisions that drive shipping cost:\n1. Box size relative to product dimensions\n2. Void fill volume per shipment\n3. Packaging material weight (for weight-based tiers)\n\nOperations that fix specification before renegotiating contracts consistently get better outcomes on both fronts.`,
      businessImpact: `Shipping cost optimization requires packaging specification changes, not just carrier negotiations. Specification-driven savings are permanent; negotiated discounts erode at renewal.`,
      cta: `Before the next carrier negotiation, run a packaging specification audit. The data will change your leverage.`,
    },
    executive: {
      hook: `Your logistics team is solving a packaging problem with a carrier negotiation.\nIt won't work.`,
      body: `DIM weight pricing is structural — it's based on your packaging, not your relationship with the carrier.\n\nIf your boxes are larger than your products require:\n— Every negotiation starts from an inflated baseline\n— Discounts apply to a rate that includes your packaging inefficiency\n— The root problem persists across every carrier contract you sign\n\nThe specification change comes first.\nOnce your packaging is right-sized, your negotiated rates apply to a lower baseline.\nThat's where the real leverage is.\n\nCompanies that sequence this correctly — audit, then negotiate — achieve 15–25% shipping cost reduction vs. 3–8% from negotiation alone.`,
      businessImpact: `Carrier negotiations on unoptimized packaging yield fraction of the savings available through specification changes. The sequence matters: spec first, negotiate second.`,
      cta: `Share this with your logistics director before the next carrier contract renewal.`,
    },
    contrarian: {
      hook: `Your carrier gave you a discount.\nYou're still overpaying by 18%.`,
      body: `Carrier discounts feel like a win.\nBut they're applied to a rate schedule that already accounts for your packaging inefficiency.\n\nIf your boxes are 20% oversized, a 10% carrier discount still leaves you paying 12% more than you need to.\n\nHere's the math most logistics teams skip:\n— Without packaging optimization: $2.10/shipment → 10% discount = $1.89/shipment\n— With packaging optimization first: $1.72/shipment → 10% discount = $1.55/shipment\n\n$0.34/shipment difference.\nAt 100,000 annual shipments, that's $34,000 in missed savings — after the discount.`,
      businessImpact: `Carrier discounts on unoptimized packaging still leave significant savings on the table. Packaging optimization changes the baseline the discount is applied to.`,
      cta: `Model your shipping cost with and without packaging optimization. The gap is almost always larger than expected.`,
    },
    direct: {
      hook: `Carrier negotiations save 3–8%. Packaging optimization saves 12–25%. Start with packaging.`,
      body: `DIM weight pricing is based on your box dimensions.\nIf your boxes are oversized, every rate you negotiate starts from an inflated baseline.\n\nFix the spec first. Then negotiate from a lower cost base.`,
      businessImpact: `Packaging optimization delivers 2–4x the savings of carrier negotiation alone.`,
      cta: `Audit your box specifications before your next carrier contract renewal.`,
    },
    shorter: {
      hook: `Shipping cost is a packaging problem first and a carrier problem second.`,
      body: `DIM weight pricing charges by volume.\nOversized boxes mean you pay for space your product doesn't use.\n\nFix the packaging before renegotiating rates.`,
      businessImpact: `Packaging spec changes deliver 12–25% shipping cost reduction. Carrier negotiations typically deliver 3–8%.`,
      cta: `Start the spec audit before the carrier conversation.`,
    },
    specific: {
      hook: `Carrier negotiations deliver 3–8% shipping cost savings. Packaging optimization delivers 12–25%. Most companies do them in the wrong order.`,
      body: `DIM weight formula: (L × W × H) ÷ 139 (UPS/FedEx domestic)\nA 12×12×12 box shipping a 10×10×8 product pays DIM weight of 12.5 lbs instead of actual weight.\n\nCost difference per shipment for a 2-lb product in a correctly sized vs. 20% oversized box:\n— Correctly sized: billed at actual weight (2 lbs) = $8.40\n— Oversized: billed at DIM weight (6 lbs) = $12.60\n— Difference: $4.20/shipment\n— At 30,000 shipments/year: $126,000 in recoverable annual spend\n\nThis is a packaging decision, not a carrier problem.`,
      businessImpact: `DIM weight arbitrage — the gap between actual and billed weight — is recoverable through packaging specification changes. It persists regardless of carrier discount level.`,
      cta: `Calculate your DIM weight ratio across your top 10 SKUs. That's your savings number.`,
    },
  },

  'warehouse-slowdowns': {
    default: {
      hook: `Your pack station is your most expensive real estate.\nMost operations don't treat it that way.`,
      body: `Labor cost per shipment is directly tied to pack station efficiency.\nThe two biggest drivers:\n1. How long it takes to select and build the right box\n2. How long it takes to apply the right amount of void fill\n\nIn an unoptimized pack station, those two steps alone can add 4–8 minutes per shipment.\n\nAt $18/hour labor cost and 200 daily shipments, that's:\n— 4 extra minutes per shipment = $240/day in lost labor efficiency\n— $62,400/year — before overtime, benefits, and supervision\n\nPack station design isn't a facilities issue.\nIt's a cost structure issue.`,
      businessImpact: `Pack station inefficiency is one of the highest-ROI optimization targets in a fulfillment operation. Labor time per unit compounds across every shift, every day.`,
      cta: `Time your current pack station workflow. The baseline number is usually a surprise.`,
    },
    executive: {
      hook: `Labor is your largest variable cost in fulfillment.\nPack station design is the lever most operations ignore.`,
      body: `Most fulfillment operations optimize labor at the macro level — staffing ratios, shift planning, overtime management.\nFew optimize at the micro level — seconds per pack step.\n\nPack station efficiency directly determines:\n— Labor cost per unit shipped\n— Throughput ceiling at peak volume\n— Overtime hours during demand spikes\n\nFor a 500,000-unit/year operation running at $19/hour:\n— 3 minutes saved per unit = $475,000/year in labor cost reduction\n— Better throughput ceiling = reduced peak staffing requirement\n\nPack station design is not an operations detail.\nIt's a P&L lever.`,
      businessImpact: `Pack station efficiency improvement is one of the highest-leverage cost reduction opportunities available to fulfillment operations. It compounds across every unit shipped.`,
      cta: `Ask your operations team for labor cost per unit shipped. That's the metric that reveals the opportunity.`,
    },
    contrarian: {
      hook: `Hiring more packers isn't scaling your operation.\nIt's hiding a workflow problem.`,
      body: `When volume increases, the instinct is to add headcount.\nThe result is more labor cost applied to the same inefficient process.\n\nIf your pack station takes 9 minutes per unit and you add 3 packers, you've scaled the inefficiency — not the operation.\n\nThe fix isn't more people.\nIt's understanding where the 9 minutes goes.\n\nIn most operations:\n— 2–3 minutes: box selection and setup\n— 2–3 minutes: void fill application\n— 1–2 minutes: labeling and staging\n— Remainder: movement, waiting, and rework\n\nEliminate the waste. Then decide if you need more people.`,
      businessImpact: `Adding labor to an inefficient pack workflow scales cost without scaling throughput proportionally. Process optimization before headcount addition delivers better cost-per-unit outcomes.`,
      cta: `Map your pack station workflow before the next hiring decision. The data often changes the answer.`,
    },
    direct: {
      hook: `4 extra minutes per shipment at 200 daily shipments is $62,000 in annual labor waste.`,
      body: `Pack station inefficiency compounds across every unit.\nBox selection time, void fill application, and labeling delays are measurable and fixable.\n\nTime the workflow before adding headcount.`,
      businessImpact: `Pack station optimization reduces labor cost per unit by 20–40% in most operations.`,
      cta: `Time your current pack workflow. Start there.`,
    },
    shorter: {
      hook: `Slow pack stations are a labor cost problem, not a headcount problem.`,
      body: `Adding packers to an inefficient workflow scales the inefficiency.\nThe fix is workflow optimization — then staffing decisions.\n\nTime your current process before making any hiring decisions.`,
      businessImpact: `Pack station efficiency improvements reduce labor cost per unit by 20–40%.`,
      cta: `Measure your current minutes per shipment. That's your baseline.`,
    },
    specific: {
      hook: `The average inefficient pack station costs $18–$26 more per 100 units than an optimized one. That's $90,000–$130,000 per year at 500,000 units.`,
      body: `Time-motion breakdown of a typical unoptimized pack station:\n— Box selection: 1.5–3 minutes (vs. 0.5 min optimized)\n— Box setup and fold: 1–2 minutes (vs. 0.3 min with pre-erected boxes)\n— Void fill: 1.5–3 minutes (vs. 0.8 min with metered dispenser)\n— Product placement: 0.5–1 minute (consistent)\n— Close and tape: 0.5–1 minute (consistent)\n— Label and stage: 1–2 minutes (vs. 0.5 min optimized)\nTotal: 6–12 minutes vs. 2.6–3.1 minutes optimized\n\nAt $20/hour labor and 1,000 daily units:\n— Unoptimized: $2,000–$4,000/day in labor\n— Optimized: $870–$1,033/day in labor\n— Annual gap: $353,000–$1,072,000`,
      businessImpact: `Pack station time-motion analysis is one of the most reliable ways to identify recoverable labor cost in fulfillment operations.`,
      cta: `Run a time-motion study on your top volume pack station this week.`,
    },
  },

  'return-damage': {
    default: {
      hook: `Your return packaging is an afterthought.\nThat's costing you in ways most companies don't measure.`,
      body: `Most operations design outbound packaging carefully.\nReturn packaging is whatever the customer sends back.\n\nThe problem: products that arrive in good condition can be damaged in transit during the return leg.\nThey arrive back at the warehouse as non-resaleable units.\n\nFor products in the $40–$120 retail range, damage on return means:\n— Full product write-off\n— Return freight cost with no recovery\n— Inventory hole that creates out-of-stock risk\n\nReturn packaging specifications should be as deliberate as outbound specs.\nFor operations with return rates above 10%, it's a recoverable cost line.`,
      businessImpact: `Return packaging failures convert returned products into write-offs. For operations with return rates above 8–10%, this represents a measurable and recoverable cost.`,
      cta: `Check your non-resaleable return rate. If it exceeds 15%, start with packaging specifications.`,
    },
    executive: {
      hook: `Your return rate is 18%. Your non-resaleable rate is 22% of those returns.\nThat's a packaging problem — not a product problem.`,
      body: `Most operations track return rate carefully.\nFew track the resaleability of returned units — and how packaging contributed to that outcome.\n\nNon-resaleable returns from packaging damage represent:\n— Full product cost write-off\n— Double freight cost (outbound + return)\n— Inventory planning disruption\n— Potential brand exposure (customer received poor experience)\n\nFor a $15M operation with a 15% return rate, 20% non-resaleability means:\n— $450,000 in annual product write-offs from returns\n— $90,000+ in double freight cost\n\nReturn packaging specification is a recoverable cost lever that most finance teams haven't addressed.`,
      businessImpact: `Return packaging damage is a silent P&L item. For operations with meaningful return rates, addressing it through specification changes typically recovers $200,000–$500,000+ annually.`,
      cta: `Ask your returns team for non-resaleable rate by SKU. Packaging failure is almost always one of the top causes.`,
    },
    contrarian: {
      hook: `You're paying full freight twice on products that were fine when they left your building.`,
      body: `Here's what most return analyses miss:\nThe product left your facility in perfect condition.\nThe customer returned it in good condition.\nIt arrived back at your warehouse damaged.\n\nThat's not a product problem or a customer problem.\nThat's a return packaging problem.\n\nMost companies accept non-resaleable returns as a cost of doing business.\nThe better question is: what packaging decision allowed a good product to become a write-off in transit?\n\nReturn packaging specifications are rarely audited.\nThat's where the opportunity is.`,
      businessImpact: `Many non-resaleable returns are packaging failures, not product failures. Treating them as cost of business instead of a fixable specification problem leaves significant margin on the table.`,
      cta: `Inspect your last 50 non-resaleable returns. Identify how many were damaged in transit vs. at the customer.`,
    },
    direct: {
      hook: `Products damaged on the return leg are packaging failures — not product failures.`,
      body: `Most operations spec their outbound packaging carefully.\nReturn packaging is uncontrolled.\n\nDamaged returns that can't be resold represent full write-offs plus double freight.\nFor operations above 10% return rates, this is a recoverable cost.`,
      businessImpact: `Return packaging failures convert recoverable inventory into write-offs.`,
      cta: `Audit non-resaleable return rate by SKU this week.`,
    },
    shorter: {
      hook: `Products that arrive back damaged after a return were often fine when they left the customer. The packaging failed in transit.`,
      body: `Non-resaleable returns from packaging failure = full product write-off + double freight.\nIt's a fixable specification problem.`,
      businessImpact: `Return packaging damage is recoverable through specification changes.`,
      cta: `Track your non-resaleable return rate by SKU.`,
    },
    specific: {
      hook: `Industry average: 18–22% of returned products arrive non-resaleable. Packaging failure in transit accounts for approximately 35% of those cases.`,
      body: `Return packaging cost model for $10M operation with 12% return rate:\n— Annual returns: ~$1.2M retail value\n— Non-resaleable rate (20%): $240,000 in write-offs\n— Packaging-related share (35%): $84,000 in preventable write-offs\n— Double freight on damaged returns: $18,000–$40,000\nTotal recoverable: $102,000–$124,000/year\n\nReturn packaging fixes typically cost $8,000–$30,000 in specification changes and materials.\nPayback period: 1–4 months.`,
      businessImpact: `Return packaging damage is quantifiable, recoverable, and consistently underaddressed. The payback on specification changes is typically measured in weeks.`,
      cta: `Calculate your annual non-resaleable return cost. Then separate the packaging-failure share.`,
    },
  },

  'freight-inefficiency': {
    default: {
      hook: `Your trucks aren't full.\nYour packaging decisions are the reason.`,
      body: `Freight cost is often managed as a negotiation problem.\nBut carrier rates only apply to the loads you're actually tendering.\n\nIf your packaging is driving poor cube utilization:\n— Fewer units fit per pallet\n— Fewer pallets fit per truck\n— You're paying full freight rates on partially utilized capacity\n\nA 15% improvement in cube utilization on a $500,000 annual freight budget means $75,000 in recoverable cost — without changing a single carrier rate.\n\nPackaging dimensions and pallet patterns are freight decisions, not just packaging decisions.`,
      businessImpact: `Poor cube utilization driven by packaging inefficiency increases freight cost per unit independently of carrier rates. Packaging optimization improves both.`,
      cta: `Pull your average cube utilization per truck. That number is usually below 65% in unoptimized operations.`,
    },
    executive: {
      hook: `Freight cost per unit has two levers: carrier rates and cube utilization.\nMost operations only manage one of them.`,
      body: `Every truck has a fixed cost once it's on the road.\nFreight cost per unit shipped goes down when more units fit per load.\nPackaging dimensions directly control how many units fit per pallet and per truck.\n\nFor a company shipping $1.5M annually in freight:\n— 70% cube utilization → $2.14 freight cost per unit (at 700,000 units)\n— 85% cube utilization → $1.76 freight cost per unit\n— Difference: $0.38/unit\n— Annual impact: $266,000 in recoverable freight cost\n\nCube utilization is a packaging engineering problem.\nMost logistics teams don't own it. Nobody does. That's the gap.`,
      businessImpact: `Cube utilization improvement through packaging optimization delivers permanent freight cost reduction independent of carrier negotiations. It requires no carrier relationship to execute.`,
      cta: `Assign ownership of cube utilization in your organization. It's likely nobody's metric right now.`,
    },
    contrarian: {
      hook: `You negotiated a better freight rate.\nYour cube utilization is still 58%. You're still overpaying.`,
      body: `A 10% carrier discount on a 58% utilized truck still costs more per unit than a full-rate carrier with 85% utilization.\n\nThis is freight math that most logistics teams don't run.\nThey track rate per hundredweight. They don't track cost per unit shipped at actual utilization.\n\nThe carrier discount is visible. The cube inefficiency is invisible — until you calculate it.\n\nPackaging-driven cube optimization is the highest-leverage freight cost reduction tool that most companies haven't used.`,
      businessImpact: `Cube utilization is a more powerful lever than carrier rates for most operations. A 15–20% improvement in cube utilization typically exceeds the savings from carrier renegotiation.`,
      cta: `Calculate your freight cost per unit at actual cube utilization vs. theoretical full utilization. The gap is your real number.`,
    },
    direct: {
      hook: `Poor cube utilization costs more than a bad carrier rate. Most operations don't measure it.`,
      body: `Packaging dimensions control how many units fit per pallet and per truck.\nA 15% improvement in cube utilization on a $500K freight budget = $75,000 recovered.\n\nThis is a packaging decision — not a carrier negotiation.`,
      businessImpact: `Cube utilization improvement delivers freight savings independent of carrier rates.`,
      cta: `Measure your average cube utilization per truck this week.`,
    },
    shorter: {
      hook: `Your freight cost is high partly because your packaging doesn't cube out efficiently.`,
      body: `Fewer units per pallet means more loads per period.\nMore loads means higher total freight cost — regardless of your carrier rate.\n\nFix the packaging dimensions before renegotiating freight.`,
      businessImpact: `Cube utilization improvement reduces freight cost per unit permanently.`,
      cta: `Pull your average cube utilization per shipment.`,
    },
    specific: {
      hook: `A 15% improvement in truck cube utilization reduces freight cost per unit by $0.30–$0.55. At 500,000 annual units, that's $150,000–$275,000 recovered.`,
      body: `Cube utilization benchmarks:\n— Industry average: 62% (Source: CSCMP 2023)\n— Optimized operations: 82–88%\n— Gap: 20–26 percentage points\n\nPackaging decisions that drive cube inefficiency:\n— Non-standard box dimensions that don't layer cleanly on pallets\n— Oversized boxes that leave gaps in pallet patterns\n— Inflexible packaging formats that can't be mixed-layer stacked\n\nCost model (500,000 units/year, $800,000 freight budget):\n— At 62% utilization: $1.60/unit\n— At 82% utilization: $1.21/unit\n— Annual savings: $195,000`,
      businessImpact: `Packaging-driven cube utilization improvement is a permanent, carrier-independent freight cost reduction.`,
      cta: `Benchmark your cube utilization against the industry average of 62%. Most operations have significant recoverable margin here.`,
    },
  },

  scaling: {
    default: {
      hook: `Your packaging operation was designed for your old volume.\nIt's running your new volume.\nThat gap has a cost.`,
      body: `Operations that scale quickly often inherit packaging workflows designed for a fraction of their current volume.\n\nThe symptoms:\n— Labor cost per unit rises as volume increases (instead of falling)\n— Damage rates increase at peak periods\n— Box specifications haven't been reviewed in years\n— The team is firefighting instead of optimizing\n\nScaling a flawed packaging operation compounds the inefficiency.\nThe cost per unit that should be falling as you grow is instead staying flat or rising.\n\nA packaging operation review during a growth phase typically recovers 15–25% in unit cost — and removes the ceiling on throughput.`,
      businessImpact: `Unreviewed packaging operations scale their inefficiencies alongside volume. Growth should reduce cost per unit — if it isn't, the packaging operation is the likely cause.`,
      cta: `Review your cost per unit trend over the last 12 months. If it's not improving with volume, start with packaging.`,
    },
    executive: {
      hook: `You've grown 40% in two years.\nYour packaging cost per unit hasn't dropped.\nThat's a structural problem.`,
      body: `Scale should drive packaging cost per unit down through volume leverage and process optimization.\nIf that isn't happening, your packaging operation has a structural issue.\n\nCommon causes at growth inflection points:\n— Packaging specifications never re-engineered for new volume levels\n— Pack station workflows designed for manual throughput, not machine-assisted\n— Carrier mix not updated to reflect new volume leverage\n— No ownership of packaging cost as a P&L lever during growth phase\n\nFor a company growing from $20M to $35M in two years:\n— Expected packaging cost per unit reduction: 12–18%\n— Actual result without intervention: flat or slightly up\n— Value of the gap: $300,000–$700,000 annually\n\nThe packaging operation is not growing with the business. It's slowing it.`,
      businessImpact: `Packaging operations that aren't re-engineered during growth phases become a structural drag on gross margin. The cost of inaction compounds with each percentage point of growth.`,
      cta: `Request a packaging cost-per-unit trend analysis. If the curve isn't bending, it's time for an operational review.`,
    },
    contrarian: {
      hook: `Growth fixed your revenue problem.\nIt made your packaging problem worse.`,
      body: `More volume through a flawed packaging operation means:\n— More waste at higher absolute cost\n— More damage events across more shipments\n— More labor hours on inefficient workflows\n\nScaling an unoptimized packaging operation is one of the fastest ways to destroy the margin you worked to grow into.\n\nThe companies that get this right pause during a growth phase and re-engineer the packaging operation before the next doubling.\nThe ones that don't spend the next two years wondering why gross margin keeps compressing.`,
      businessImpact: `Unoptimized packaging operations become a proportionally larger margin drag as volume grows. Re-engineering before the next growth phase is the right sequence.`,
      cta: `If you're planning to double volume in the next 18 months, start the packaging operation review now.`,
    },
    direct: {
      hook: `Growing volume through an unoptimized packaging operation scales the inefficiency, not the margin.`,
      body: `Labor cost per unit should fall as volume grows.\nIf it isn't, the packaging workflow is the likely constraint.\n\nA packaging operation review during a growth phase typically recovers 15–25% in unit cost.`,
      businessImpact: `Scale should reduce packaging cost per unit. If it isn't, that's recoverable.`,
      cta: `Track cost per unit over your last 12 months. The trend tells you everything.`,
    },
    shorter: {
      hook: `Scale should lower your packaging cost per unit. If it isn't, the operation needs a review.`,
      body: `More volume through a flawed packaging workflow means proportionally more waste.\nRe-engineer the operation before the next growth phase — not after.`,
      businessImpact: `Packaging cost per unit should fall with volume. If it's flat or rising, that's a structural issue.`,
      cta: `Review your packaging cost per unit trend over the last 12 months.`,
    },
    specific: {
      hook: `Operations that re-engineer packaging during a growth phase see 15–25% cost per unit reduction. Those that don't see it stay flat or worsen.`,
      body: `Benchmarks for packaging cost per unit at different volume levels (consumer goods, mid-market):\n— $5M–$15M revenue: $1.80–$2.40/unit packaging cost\n— $15M–$40M revenue (optimized): $1.20–$1.60/unit\n— $15M–$40M revenue (unoptimized): $1.75–$2.30/unit\n\nThe gap at $25M annual revenue:\n— Optimized: $1.40/unit × 2M units = $2.8M\n— Unoptimized: $2.00/unit × 2M units = $4.0M\n— Annual gap: $1.2M\n\nOperations that completed packaging reviews during a growth phase recovered an average of $800,000 annually.`,
      businessImpact: `Packaging cost per unit is a gross margin driver that compounds with scale. The earlier the review happens in a growth phase, the greater the cumulative impact.`,
      cta: `Model your packaging cost per unit at 1.5x and 2x current volume. Does the curve bend or flatten?`,
    },
  },

  'margin-loss': {
    default: {
      hook: `Packaging decisions don't show up in marketing budgets.\nThey show up in gross margin.`,
      body: `A packaging specification change that looks like a $0.08/unit savings in materials can easily result in:\n— $0.22/unit increase in DIM weight surcharges\n— $0.15/unit increase in damage-driven returns\n— Net cost increase of $0.29/unit\n\nMost companies make packaging decisions based on materials cost alone.\nThe gross margin impact from the downstream effects rarely gets attributed back to the packaging decision.\n\nFor a 2 million unit/year operation, a $0.29/unit net cost increase from a "savings" decision is $580,000 in margin destruction.\n\nPackaging decisions are margin decisions.`,
      businessImpact: `Packaging specification changes that optimize for materials cost without modeling downstream freight, damage, and returns impact consistently underperform on net margin.`,
      cta: `Before approving the next packaging cost-reduction initiative, model the full downstream cost impact.`,
    },
    executive: {
      hook: `Your packaging team is optimizing materials cost.\nYour CFO is measuring gross margin.\nThose aren't the same thing.`,
      body: `Materials cost optimization is visible, measurable, and easy to present.\nGross margin impact from packaging decisions is diffuse, delayed, and hard to attribute.\n\nThat attribution problem is expensive.\n\nFor consumer goods companies in the $15M–$75M range, packaging decisions affect:\n— Freight cost: 1.5–3% of revenue\n— Damage and returns: 1–4% of revenue\n— Labor and throughput: 1–2% of revenue\n\nIn aggregate, packaging decisions influence 3.5–9% of revenue in cost outcomes.\nMost executive teams manage 0.5–1% of that (materials cost) while the other 3–8% goes unmanaged.\n\nA gross-margin view of packaging typically reveals $500,000–$3M+ in recoverable annual cost for mid-market companies.`,
      businessImpact: `Packaging decisions are gross margin decisions. Managing only materials cost while leaving freight, damage, and labor cost unattributed represents one of the most common margin leakage patterns in mid-market operations.`,
      cta: `Ask your CFO what total packaging-related cost appears on the P&L across all line items. That conversation changes the scope of the problem.`,
    },
    contrarian: {
      hook: `Your packaging team just saved $120,000 on materials.\nHere is why gross margin may have gotten worse.`,
      body: `Materials cost reductions that aren't stress-tested for downstream impact are common.\n\nTypical sequence:\n1. Spec change to lighter or cheaper materials — saves $0.06/unit\n2. Damage rate increases from 2.1% to 4.8% — costs $0.18/unit\n3. DIM weight increases from box size adjustment — costs $0.12/unit\n4. Net effect: $0.24/unit cost increase on a $0.06/unit savings decision\n\nThe materials team hit their target.\nGross margin declined.\nNobody connected the dots for 6 months.\n\nThis happens more often than most operations leaders want to admit.`,
      businessImpact: `Materials cost reductions that drive downstream cost increases are net-negative decisions. Full-cost modeling before specification changes is the only way to prevent them.`,
      cta: `Audit your last three packaging cost-reduction initiatives. Model the downstream impact that wasn't tracked at the time.`,
    },
    direct: {
      hook: `Packaging materials cost is 1 of 4 cost drivers. Most companies manage only 1.`,
      body: `The other three: freight surcharges, damage and returns, labor and throughput.\n\nA materials cost reduction that increases any of these is a net-negative decision.\nModel all four before approving a spec change.`,
      businessImpact: `Full-cost packaging modeling prevents margin-destroying "savings" decisions.`,
      cta: `Model the downstream impact of your last materials cost change. The result is usually instructive.`,
    },
    shorter: {
      hook: `Packaging decisions affect gross margin through four channels. Most companies manage one of them.`,
      body: `Materials cost, freight surcharges, damage rates, and labor efficiency are all packaging decisions.\nOptimizing one without the others often increases total cost.\n\nManage all four.`,
      businessImpact: `Full-cost packaging management is gross margin management.`,
      cta: `Build a four-component packaging cost model for your top SKUs.`,
    },
    specific: {
      hook: `The average consumer goods company has $3–$8M in packaging-related cost across 4 P&L line items. Most manage $500K–$1M of it intentionally.`,
      body: `Packaging-related cost breakdown (mid-market consumer goods, $30M revenue):\n— Materials: $450,000 (managed)\n— Freight surcharges from packaging decisions: $280,000–$480,000 (often unmanaged)\n— Damage, returns, and claims: $180,000–$540,000 (partially managed)\n— Labor inefficiency at pack stations: $120,000–$360,000 (rarely managed)\nTotal: $1,030,000–$1,830,000 annually\n\nVs. materials-only management: $450,000 in scope\nUnmanaged gap: $580,000–$1,380,000\n\nCompanies that adopt a full-cost packaging model recover 30–50% of the unmanaged gap in year one.`,
      businessImpact: `The gap between materials-only packaging management and full-cost management represents $500,000–$1.5M+ annually for most mid-market operations.`,
      cta: `Build the four-component cost model. The materials line is the smallest part of the story.`,
    },
  },
}

// ─── Post ideas library ────────────────────────────────────────────────────────

const ALL_POST_IDEAS: PostIdea[] = [
  {
    title: 'The Real Reason Your Shipping Costs Keep Rising',
    angle: 'DIM weight pricing — box size, not carrier rates, is driving the increase',
    painClarity: 9,
    financialImpact: 9,
    tension: 8,
    totalScore: 26,
  },
  {
    title: "Your Packaging Specification Hasn't Changed in Three Years. Your Costs Have.",
    angle: 'Specification inertia creates compound cost growth year over year',
    painClarity: 8,
    financialImpact: 9,
    tension: 9,
    totalScore: 26,
  },
  {
    title: 'What a 15% Damage Rate Is Actually Costing You',
    angle: 'Full cost model — replacement, freight, brand, and customer retention',
    painClarity: 9,
    financialImpact: 9,
    tension: 7,
    totalScore: 25,
  },
  {
    title: 'How Packaging Decisions End Up on the P&L',
    angle: 'Four cost channels: materials, freight, damage, labor',
    painClarity: 8,
    financialImpact: 9,
    tension: 8,
    totalScore: 25,
  },
  {
    title: 'Why 60% of Product Damage Happens Before the Carrier Touches the Box',
    angle: 'Packaging specification failure — not carrier handling — drives most damage',
    painClarity: 9,
    financialImpact: 8,
    tension: 8,
    totalScore: 25,
  },
  {
    title: 'The Hidden Cost of a Rushed Packaging Decision',
    angle: 'Speed-to-market pressure creates specification shortcuts with long-term cost consequences',
    painClarity: 9,
    financialImpact: 8,
    tension: 8,
    totalScore: 25,
  },
  {
    title: 'The Void Fill Problem Nobody Talks About',
    angle: 'Void fill overconsumption adds materials cost and DIM weight simultaneously',
    painClarity: 7,
    financialImpact: 8,
    tension: 8,
    totalScore: 23,
  },
  {
    title: 'What Happens to Your Packing Line When Volume Doubles',
    angle: 'Scaling without re-engineering compounds inefficiency proportionally',
    painClarity: 8,
    financialImpact: 7,
    tension: 9,
    totalScore: 24,
  },
  {
    title: 'The Carrier Audit Your Team Should Have Done First',
    angle: 'Packaging optimization changes the baseline before the negotiation starts',
    painClarity: 7,
    financialImpact: 8,
    tension: 9,
    totalScore: 24,
  },
  {
    title: 'Why Returns Are Telling You Something About Your Packaging',
    angle: 'Non-resaleable returns are often packaging failures, not product failures',
    painClarity: 8,
    financialImpact: 7,
    tension: 7,
    totalScore: 22,
  },
  {
    title: "The Packaging Decision That Looked Like Savings and Wasn't",
    angle: 'Materials cost reduction that drove downstream cost increase — net negative outcome',
    painClarity: 9,
    financialImpact: 9,
    tension: 9,
    totalScore: 27,
  },
  {
    title: 'Your Pack Station Is Your Most Expensive Real Estate. Are You Treating It That Way?',
    angle: 'Labor cost per unit is directly tied to pack station workflow design',
    painClarity: 8,
    financialImpact: 8,
    tension: 8,
    totalScore: 24,
  },
  {
    title: 'Cube Utilization Is a Packaging Problem, Not a Logistics Problem',
    angle: "Box dimensions control how many units fit per truck — most operations don't manage this",
    painClarity: 8,
    financialImpact: 8,
    tension: 7,
    totalScore: 23,
  },
  {
    title: "Growing Fast Doesn't Fix a Packaging Cost Problem. It Scales It.",
    angle: 'Unoptimized operations compound inefficiency with volume',
    painClarity: 8,
    financialImpact: 8,
    tension: 9,
    totalScore: 25,
  },
  {
    title: "The Part of Your Packaging Budget You're Not Tracking",
    angle: 'Full cost vs. materials cost — the gap is where the money is',
    painClarity: 7,
    financialImpact: 9,
    tension: 8,
    totalScore: 24,
  },
]

// ─── 30-day content calendar ───────────────────────────────────────────────────

const CALENDAR: CalendarEntry[] = [
  { day: 1, topic: 'Box Sizing & DIM Weight', hook: 'Your shipping costs are high. Your boxes are probably why.', angle: 'Cost exposure — quantify the DIM weight penalty', cta: 'Tag an ops leader who needs to see this.' },
  { day: 2, topic: 'Packaging Cost Model', hook: 'Materials cost is the visible part. Here is where the rest hides.', angle: 'Full cost breakdown across 4 P&L line items', cta: 'Build the full cost model before your next budget review.' },
  { day: 3, topic: 'Transit Damage Root Cause', hook: '60% of product damage happens before the carrier touches the box.', angle: 'Specification failure vs. handling failure', cta: 'Review your damage SKUs against current packaging specs.' },
  { day: 4, topic: 'Carrier Negotiation Sequence', hook: 'Negotiate after the packaging audit. Not before.', angle: 'Packaging optimization changes the negotiation baseline', cta: 'Start with the audit. Then negotiate from a lower cost base.' },
  { day: 5, topic: 'Pack Station Efficiency', hook: '4 extra minutes per shipment at scale is a six-figure labor cost.', angle: 'Time-motion analysis of the pack station workflow', cta: 'Time your current workflow. The baseline is usually a surprise.' },
  { day: 6, topic: 'Over-Packaging Costs', hook: 'More packaging doesn\'t mean better protection. It means higher cost.', angle: 'Right-sizing reduces materials and freight simultaneously', cta: 'Measure void fill percentage on your top SKUs.' },
  { day: 7, topic: 'Specification Inertia', hook: 'Your packaging specification hasn\'t changed. Your costs have.', angle: 'The cost of unreviewed specs compounding year over year', cta: 'When did you last audit your packaging specifications?' },
  { day: 8, topic: 'Freight Cube Utilization', hook: 'Your trucks aren\'t full. Your packaging decisions are why.', angle: 'Cube utilization as a packaging engineering problem', cta: 'Pull your average cube utilization per truck.' },
  { day: 9, topic: 'Return Packaging', hook: 'Products damaged on the return leg are packaging failures — not product failures.', angle: 'Non-resaleable return rate and packaging specification connection', cta: 'Check your non-resaleable return rate by SKU.' },
  { day: 10, topic: 'Margin Attribution', hook: 'Packaging decisions affect gross margin. Most companies manage only the visible part.', angle: 'Attribution gap between materials cost and total packaging cost', cta: 'Ask your CFO how packaging cost appears across your P&L.' },
  { day: 11, topic: 'Scaling Operations', hook: 'Growing volume through a flawed packaging operation compounds the inefficiency.', angle: 'Re-engineering before scaling vs. scaling then fixing', cta: 'Review cost per unit trend over the last 12 months.' },
  { day: 12, topic: 'Void Fill Economics', hook: 'Void fill isn\'t just a materials cost. It\'s a DIM weight charge on every shipment.', angle: 'Void fill overconsumption doubles the cost — materials plus freight', cta: 'Measure your void fill per shipment on top-volume SKUs.' },
  { day: 13, topic: 'Contrarian: Carrier Rates', hook: 'Your carrier gave you a discount. You\'re still overpaying.', angle: 'DIM weight baseline is set by packaging — discount applies to the wrong number', cta: 'Model shipping cost at actual utilization vs. theoretical full utilization.' },
  { day: 14, topic: '25 Years of Process Insight', hook: 'Packaging decisions look simple. Their cost consequences aren\'t.', angle: 'Experience-based insight on the real drivers of packaging cost', cta: 'Connect with Premier Packaging for a packaging cost review.' },
  { day: 15, topic: 'Damage Claim Attribution', hook: 'You\'re filing carrier claims for damage your own packaging caused.', angle: 'Root cause analysis — specification failure vs. carrier handling failure', cta: 'Pull your last 90 days of damage claims. Identify the specification failures.' },
  { day: 16, topic: 'Box Sizing Economics', hook: 'A box 20% too large costs money in three places simultaneously.', angle: 'Materials cost + DIM weight + freight cube inefficiency', cta: 'Audit box dimensions against product dimensions for top 10 SKUs.' },
  { day: 17, topic: 'Materials Cost Reduction Fallacy', hook: 'Cheaper materials don\'t lower packaging cost. They often raise it.', angle: 'Materials cost reduction that drives downstream cost increase = net negative', cta: 'Model downstream impact before approving the next materials change.' },
  { day: 18, topic: 'Peak Volume Planning', hook: 'Packaging operations designed for average volume fail at peak.', angle: 'Scalability — building for the high-water mark, not the baseline', cta: 'Review your peak-period damage and labor cost patterns.' },
  { day: 19, topic: 'Brand Protection', hook: 'A damaged product in a premium package is a brand problem, not just an operations problem.', angle: 'Packaging and brand equity — the connection most ops teams don\'t track', cta: 'Review customer feedback on packaging quality from your last 90 days.' },
  { day: 20, topic: 'Specification Review Process', hook: 'The packaging specification that wasn\'t reviewed last year is costing money this year.', angle: 'Regular specification audits as a cost management practice', cta: 'Schedule your next packaging specification review.' },
  { day: 21, topic: 'Data-Driven: Damage Rates', hook: 'Industry average damage rate: 2.5–4%. Above that is a specification problem.', angle: 'Benchmark-based assessment — where does your rate sit?', cta: 'Compare your damage rate to the industry benchmark.' },
  { day: 22, topic: 'Supply Chain Resilience', hook: 'Packaging failures during demand spikes don\'t just cost money. They delay revenue.', angle: 'Packaging operational risk during high-volume periods', cta: 'Review your packaging operation\'s capacity at 1.5x current volume.' },
  { day: 23, topic: 'Regulatory Packaging', hook: 'Regulated packaging isn\'t just a compliance question. It\'s a cost structure question.', angle: 'Compliance requirements and their cost implications in packaging specification', cta: 'Review your regulated SKUs against current compliance cost.' },
  { day: 24, topic: 'Custom vs. Standard Packaging', hook: 'Standard packaging that doesn\'t fit your product costs more than custom packaging that does.', angle: 'The false economy of standard packaging for non-standard products', cta: 'Identify your top SKUs where standard packaging is the wrong fit.' },
  { day: 25, topic: 'Co-Packer Selection', hook: 'The cheapest co-packer quote is rarely the lowest total cost.', angle: 'Hidden costs in low-quote selections: quality, timing, and rework', cta: 'Model total cost — not just quoted price — in your next co-packer evaluation.' },
  { day: 26, topic: 'Inventory and Packaging', hook: 'Oversized packaging affects your warehouse utilization as much as your shipping cost.', angle: 'The warehouse footprint impact of packaging decisions', cta: 'Calculate your warehouse space cost per SKU against packaging dimensions.' },
  { day: 27, topic: 'Urgency Situations', hook: 'Wrong product in the right package. Right product in the wrong package. Both are packaging failures.', angle: 'Urgent packaging corrections and the cost of delayed response', cta: 'Do you have a packaging emergency response protocol?' },
  { day: 28, topic: 'Quality Control in Packaging', hook: 'A packaging defect that reaches the end customer costs 4–7x what it costs to catch in production.', angle: 'Multi-level QC as a cost reduction tool, not just a compliance requirement', cta: 'Review your current QC checkpoint coverage in the packaging workflow.' },
  { day: 29, topic: 'Long-Term Partnerships', hook: 'A packaging partner who knows your products catches problems before they become shipments.', angle: 'The cost value of continuity and institutional knowledge in packaging partnerships', cta: 'Evaluate your current packaging partner relationships against this standard.' },
  { day: 30, topic: 'Monthly Review', hook: 'One packaging audit changed the cost structure. Here is what happened.', angle: 'Before-and-after: the value of a packaging operations review', cta: 'Start your packaging audit with Premier Packaging. premierpackaging.com' },
]

const REPURPOSING: string[] = [
  'Convert the hook into a Twitter/X single post for immediate reach.',
  'Use the business impact section as the basis for a YouTube Short script.',
  'Expand the body into a Facebook educational post for a broader audience.',
  'Turn the content calendar week into a themed Instagram carousel series.',
  'Use the financial figures as the centerpiece of a one-page sales leave-behind.',
  'Repurpose the contrarian version as an email subject line A/B test.',
  'Adapt the executive version into a cold outreach email opening paragraph.',
  'Use the post ideas as a list for a YouTube "10 Packaging Mistakes" video outline.',
]

const IMPROVEMENT_SUGGESTIONS: Record<PackagingProblem, string[]> = {
  'box-sizing': [
    'Add a specific DIM weight calculation example to make the math tangible.',
    'Include a named industry benchmark to support the percentage claims.',
    'Consider adding a visual description (e.g., photo of oversized box with product) for higher engagement.',
  ],
  'damage-prevention': [
    'Name the specific cushioning failure mode to increase specificity.',
    'Add a before/after damage rate comparison to strengthen the impact statement.',
    'Consider a CTA that links to a damage audit checklist.',
  ],
  'cost-leakage': [
    'Break down the full cost model with specific line items for each cost driver.',
    'Add a percentage range for total packaging cost understatement.',
    'Consider ending with a question that prompts readers to share their own experience.',
  ],
  'over-packaging': [
    'Include a specific void fill percentage benchmark.',
    'Add a calculation example showing the DIM weight impact of a specific box size difference.',
    'Consider mentioning sustainability impact alongside financial impact.',
  ],
  'shipping-cost': [
    'Include a specific DIM weight formula to make it actionable.',
    'Add a comparison of typical carrier negotiation savings vs. spec change savings.',
    'Consider a poll or question to drive engagement.',
  ],
  'warehouse-slowdowns': [
    'Add a time-motion breakdown with specific step-by-step durations.',
    'Include a labor cost calculation with specific hourly rate assumptions.',
    'Consider a CTA that offers a pack station assessment.',
  ],
  'return-damage': [
    'Add a specific non-resaleable return rate benchmark.',
    'Include the double freight cost calculation in the business impact.',
    'Consider linking to a return packaging specification checklist.',
  ],
  'freight-inefficiency': [
    'Add a specific cube utilization benchmark for your industry.',
    'Include a calculation showing the freight cost per unit impact.',
    'Consider a visual showing the pallet pattern difference.',
  ],
  scaling: [
    'Add a cost-per-unit benchmark at different volume levels.',
    'Include a timeline for when packaging reviews should happen during growth phases.',
    'Consider a poll: "At what growth stage did you last review your packaging operation?"',
  ],
  'margin-loss': [
    'Add specific percentage ranges for each cost driver as a share of revenue.',
    'Include a full four-component cost model calculation.',
    'Consider a CFO-focused version that uses P&L language throughout.',
  ],
}

// ─── Main generator ────────────────────────────────────────────────────────────

export function generateLinkedInContent(
  inputs: LinkedInInputs,
  variation: ContentVariation = 'default',
): LinkedInOutput {
  const themeTemplates = POSTS[inputs.mainProblem] ?? POSTS['cost-leakage']
  const post = themeTemplates[variation] ?? themeTemplates['default'] ?? Object.values(themeTemplates)[0]!

  // Select 10 post ideas, boosting those relevant to the chosen theme
  const themeKeywords: Record<PackagingProblem, string[]> = {
    'box-sizing': ['shipping', 'box', 'dim', 'carrier', 'cube'],
    'damage-prevention': ['damage', 'carrier', 'claim', 'protection'],
    'cost-leakage': ['cost', 'budget', 'p&l', 'hidden', 'tracking'],
    'over-packaging': ['void fill', 'over-pack', 'materials', 'cube'],
    'shipping-cost': ['shipping', 'carrier', 'freight', 'rate', 'dim'],
    'warehouse-slowdowns': ['pack station', 'labor', 'throughput', 'workflow'],
    'return-damage': ['return', 'non-resaleable', 'reverse'],
    'freight-inefficiency': ['freight', 'cube', 'truck', 'utilization'],
    scaling: ['scale', 'volume', 'growth', 'throughput'],
    'margin-loss': ['margin', 'p&l', 'cost', 'gross'],
  }

  const keywords = themeKeywords[inputs.mainProblem] ?? []

  const scored = ALL_POST_IDEAS.map(idea => ({
    ...idea,
    totalScore: idea.totalScore + (keywords.some(kw => idea.title.toLowerCase().includes(kw) || idea.angle.toLowerCase().includes(kw)) ? 2 : 0),
  }))

  const rankedIdeas = [...scored].sort((a, b) => b.totalScore - a.totalScore)
  const postIdeas = [...rankedIdeas].sort(() => 0).slice(0, 10)

  const qualityScore = scoreContent({
    hook: post.hook,
    body: post.body,
    cta: post.cta,
    variation,
  })

  return {
    postIdeas,
    rankedIdeas: rankedIdeas.slice(0, 10),
    fullPost: post,
    contentCalendar: CALENDAR,
    repurposingSuggestions: REPURPOSING,
    qualityScore,
    improvementSuggestions: IMPROVEMENT_SUGGESTIONS[inputs.mainProblem] ?? [],
  }
}
