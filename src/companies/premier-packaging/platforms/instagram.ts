import type {
  InstagramInputs,
  InstagramOutput,
  InstagramSlide,
  PackagingProblem,
  ContentVariation,
  InstagramFormat,
} from '../lib/types'
import { scoreContent } from '../lib/scoring'

interface InstagramTemplate {
  visualHook: string
  onScreenText: string
  reelScriptOrSlides: string | InstagramSlide[]
  caption: string
  cta: string
  suggestedVisuals: string[]
}

type FormatMap = Partial<Record<InstagramFormat, InstagramTemplate>>
type VariantMap = Partial<Record<ContentVariation, FormatMap>>

const TEMPLATES: Record<PackagingProblem, VariantMap> = {
  'box-sizing': {
    default: {
      reel: {
        visualHook: 'Close-up of an oversized box being opened — product is tiny compared to box size',
        onScreenText: 'Why is your box this big?',
        reelScriptOrSlides: `[0:00–0:03] — HOOK\n[Visual: huge box opened, tiny product inside]\nText on screen: "Why is your box this big?"\n\n[0:03–0:08] — THE PROBLEM\n[Visual: shipping label with freight charges highlighted]\nVoiceover: "Your carrier charges by cubic volume. Not by what's inside."\nText: "DIM weight pricing = you pay for empty space"\n\n[0:08–0:15] — THE COST\n[Visual: calculator, numbers stacking up]\nText: "$0.60–$1.80 extra / shipment"\nText: "× 8,000 shipments = up to $172,800/year"\n\n[0:15–0:22] — THE MISTAKE\n[Visual: person on phone, negotiating]\nText: "Most teams call the carrier first"\nText: "The carrier isn't the problem"\n\n[0:22–0:28] — THE FIX\n[Visual: tape measure on box, product dimensions on screen]\nText: "Right-size the box"\nText: "Save 12–20% on shipping"\n\n[0:28–0:30] — CTA\nText: "Audit starts with your top 20 SKUs"\nText: "@premierpackaging"`,
        caption: `Your carrier isn't why shipping costs are high.\n\nYour box is.\n\nDimensional weight pricing charges by cubic volume — not by what's actually in the box.\n\nAn oversized box adds $0.60–$1.80 per shipment.\nAt 8,000 shipments/month: up to $172,800 annually in preventable charges.\n\nThe fix isn't renegotiating with the carrier.\nIt's a packaging audit.\n\nAudit your top 20 SKUs. Compare box dimensions to product dimensions.\nThat's where the savings start.\n\n#PackagingOperations #SupplyChain #ShippingCost #ContractPackaging #OperationsManagement`,
        cta: 'Audit your box specifications at premierpackaging.com.',
        suggestedVisuals: [
          'Oversized box opened with small product inside — contrast is the point',
          'Side-by-side of same product in oversized vs. right-sized box',
          'Shipping label close-up with DIM weight highlighted',
          'Calculator or spreadsheet showing annual DIM cost projection',
          'Tape measure across box with product dimensions visible',
        ],
      },
      carousel: {
        visualHook: 'Slide 1 image: Oversized box. Bold text overlay: "Your packaging is costing you $172K/year."',
        onScreenText: 'Your packaging is costing you $172K/year.',
        reelScriptOrSlides: [
          { slideNumber: 1, onScreenText: 'Your packaging is costing you $172K/year.', visualDescription: 'Oversized box graphic, white background, large bold text overlay', role: 'Hook — stop the scroll with a specific financial number' },
          { slideNumber: 2, onScreenText: 'Not because of materials.\nBecause of empty space.', visualDescription: 'Split-screen: box size vs. product size with clear size disparity', role: 'Reframe — it\'s not what they think' },
          { slideNumber: 3, onScreenText: 'DIM weight pricing = your carrier charges by box volume.\nNot by product weight.', visualDescription: 'Simple diagram: box with dimensions labeled, DIM formula overlaid', role: 'Educate — explain the mechanism briefly' },
          { slideNumber: 4, onScreenText: 'Oversized box by 15% →\n$0.60–$1.80 extra / shipment.\nAt 8,000 / month = up to $172,800 / year.', visualDescription: 'Data-forward slide: clean white background, numbers in large bold type, Premier Packaging brand color accent', role: 'Quantify — make the cost real and specific' },
          { slideNumber: 5, onScreenText: 'Most teams call the carrier.\nThe carrier isn\'t the problem.\nThe spec is.', visualDescription: 'Crossed-out phone call icon, checkmark on "spec review" icon', role: 'Redirect — challenge the default solution' },
          { slideNumber: 6, onScreenText: 'The fix:\nAudit your box dimensions.\nRight-size your top 20 SKUs.\nSave 12–20% on shipping.', visualDescription: 'Three-step numbered list, clean design, brand colors', role: 'Solution — specific, actionable, fast' },
          { slideNumber: 7, onScreenText: 'Premier Packaging Solutions\n25+ years of packaging operations.\npremierpackaging.com', visualDescription: 'Brand close-out slide with logo, website, and contact CTA', role: 'CTA — close with clear next step' },
        ] as InstagramSlide[],
        caption: `Your shipping costs are high.\nYour carrier probably isn't why.\n\nSwipe through to see where the money is actually going — and how to get it back.\n\n#Packaging #ShippingCost #SupplyChain #Operations #ContractPackaging`,
        cta: 'Swipe to see the full breakdown. Then visit premierpackaging.com to start the audit.',
        suggestedVisuals: [
          'Slide 1: Clean bold typography on white — financial hook number is the visual',
          'Slide 3: Simple DIM formula diagram — keep it readable at Instagram size',
          'Slide 4: Large numbers in brand colors on white background',
          'Slide 6: Numbered list with clear visual hierarchy',
          'Slide 7: Brand identity slide — logo, website, clean design',
        ],
      },
      caption: {
        visualHook: 'Photo: oversized box next to right-sized box, same product, side by side',
        onScreenText: 'Same product. One box costs $172K more per year.',
        reelScriptOrSlides: '',
        caption: `Same product. Two boxes. One costs $172,800 more per year.\n\nDimensional weight pricing is how carriers calculate freight cost.\nLarger box = larger DIM weight = higher charge per shipment.\n\nA 15% oversized box adds $0.60–$1.80 per shipment.\nAt 8,000 monthly shipments, that's up to $172,800 annually in preventable cost.\n\nMost operations respond to high shipping costs by renegotiating with the carrier.\nThe carrier gives 4–6%.\nThe box size stays the same.\nThe DIM charges keep accumulating.\n\nFix the box before the next carrier negotiation.\n\n#PackagingOperations #ShippingCosts #DIMWeight #SupplyChainManagement #Fulfillment`,
        cta: 'Review your box specifications at premierpackaging.com.',
        suggestedVisuals: [
          'Side-by-side comparison: oversized box vs. right-sized box, same product',
          'Top-down shot showing empty space in oversized box',
          'Warehouse setting — boxes on conveyor or packing station',
        ],
      },
      story: {
        visualHook: 'Frame 1: Text only — "Quick question for ops people:"',
        onScreenText: 'When did you last check if your boxes are the right size?',
        reelScriptOrSlides: `Frame 1:\n[Text] "Quick question for ops leaders:"\n[Text] "When did you last check if your boxes are the right size?"\n[Poll sticker: "Recently" | "Years ago"]\n\nFrame 2:\n[Text] "If it's been a while..."\n[Text] "DIM weight pricing charges by box volume."\n[Text] "Oversized box = you pay for empty air."\n\nFrame 3:\n[Text] "$0.60–$1.80 extra per oversized shipment."\n[Text] "At 8,000/month → up to $172K/year."\n[Counter or animation stacking the number up]\n\nFrame 4:\n[Text] "The fix is a packaging audit."\n[Text] "2–4 hours on your top 20 SKUs."\n[Text] "Link in bio for the audit checklist."`,
        caption: '',
        cta: 'See the audit checklist — link in bio.',
        suggestedVisuals: [
          'Frame 1: Clean text on brand color background',
          'Frame 2: Simple diagram of box with dimensions',
          'Frame 3: Bold numbers animation — cost counter',
          'Frame 4: Clean CTA with link in bio callout',
        ],
      },
    },
    contrarian: {
      carousel: {
        visualHook: 'Slide 1: Bold text — "Your carrier didn\'t make shipping expensive. You did."',
        onScreenText: 'Your carrier didn\'t make shipping expensive. You did.',
        reelScriptOrSlides: [
          { slideNumber: 1, onScreenText: 'Your carrier didn\'t make shipping expensive.\nYou did.', visualDescription: 'Bold white text on dark background — high contrast, stop-scroll design', role: 'Hook — contrarian, attention-grabbing' },
          { slideNumber: 2, onScreenText: 'DIM weight pricing isn\'t a scam.\nIt\'s how carriers recover the cost of moving large empty boxes.\nIf your box is too big, you\'re the reason the rate is what it is.', visualDescription: 'Simple explainer diagram: large box = high DIM weight', role: 'Reframe — transfer ownership of the problem to the viewer' },
          { slideNumber: 3, onScreenText: 'Most ops teams: "Our carrier is expensive."\nActual problem: spec sheet from 4 years ago.\nNobody audited it.', visualDescription: 'Two-column layout: common belief vs. actual root cause', role: 'Challenge — expose the belief that needs to change' },
          { slideNumber: 4, onScreenText: '40% of SKUs in boxes 25%+ too large.\nAnnual freight cost from that: $340,000.\nPackaging audit cost: $8,000.', visualDescription: 'Data slide: three stats in sequence, clean layout', role: 'Prove — specific case makes it credible' },
          { slideNumber: 5, onScreenText: 'The spec is the problem.\nThe spec is the fix.', visualDescription: 'Single bold statement, centered, brand colors', role: 'Resolution — clean, memorable takeaway' },
          { slideNumber: 6, onScreenText: 'Audit your packaging spec.\nThen negotiate.\nNot the other way around.', visualDescription: 'Step 1 → Step 2 visual flow', role: 'Action — correct the sequence' },
          { slideNumber: 7, onScreenText: 'Premier Packaging Solutions\npremierpackaging.com', visualDescription: 'Brand close-out slide', role: 'CTA' },
        ] as InstagramSlide[],
        caption: `Hot take: your carrier isn't overcharging you.\n\nDIM weight pricing exists because large, empty boxes cost real money to move.\nIf your box is too big, that's a packaging decision — not a carrier problem.\n\nMost teams renegotiate the carrier contract instead of auditing the spec.\n\nSwipe to see the real problem — and the fix.\n\n#PackagingOps #SupplyChain #ShippingCosts #Operations`,
        cta: 'Audit your spec at premierpackaging.com.',
        suggestedVisuals: [
          'Slide 1: High-contrast dark background with bold white text',
          'Slide 4: Clean data visualization, three stats in sequence',
          'Slide 5: Single bold statement — minimal design, maximum impact',
        ],
      },
      reel: {
        visualHook: 'POV shot: someone on the phone with a carrier, arguing about rates',
        onScreenText: 'You\'re negotiating with the wrong party.',
        reelScriptOrSlides: `[0:00–0:03]\n[Visual: phone call, frustrated ops manager]\nText: "You're negotiating with the wrong party."\n\n[0:03–0:10]\nText: "DIM weight pricing = charges by box volume"\nText: "Oversized box = inflated rate BEFORE the negotiation starts"\n\n[0:10–0:18]\nText: "Carrier discount of 10%: saves $0.32/shipment"\nText: "Packaging audit + right-sizing: saves $1.31/shipment"\n\n[0:18–0:25]\nText: "4× more savings. No carrier conversation needed."\n\n[0:25–0:30]\nText: "Audit the spec first. Then negotiate."`,
        caption: `The phone call with the carrier isn't where the savings are.\n\nThe packaging spec is.\n\nSwipe up for the full breakdown.\n\n#PackagingOps #ShippingCost #FreightCost #OperationsManagement`,
        cta: 'See the full analysis at premierpackaging.com.',
        suggestedVisuals: [
          'POV: phone call / carrier negotiation scene (relatable frustration)',
          'Side-by-side: carrier savings vs. spec change savings',
          'Clean text overlay with dollar comparison',
        ],
      },
    },
  },

  'damage-prevention': {
    default: {
      carousel: {
        visualHook: 'Slide 1: Photo of damaged product in box. Text: "This isn\'t the carrier\'s fault."',
        onScreenText: 'This isn\'t the carrier\'s fault.',
        reelScriptOrSlides: [
          { slideNumber: 1, onScreenText: 'This isn\'t the carrier\'s fault.', visualDescription: 'Damaged product in open box — authentic, not staged', role: 'Hook — immediately challenges the default assumption' },
          { slideNumber: 2, onScreenText: '60% of product damage in transit\nstarts with the packaging spec.\nNot carrier handling.', visualDescription: 'Bold stat on clean white background with source note', role: 'Establish the core claim with data' },
          { slideNumber: 3, onScreenText: 'The 3 specification failures\nthat cause most damage:\n\n1. Box compression rated too low\n2. Cushioning mismatched to fragility\n3. Void fill below 20–25%', visualDescription: 'Numbered list, clean layout, each item has a small icon', role: 'Educate — specific failure modes make it credible' },
          { slideNumber: 4, onScreenText: '5% damage rate on $4M in shipments:\n\nReplacement: $120,000\nReturn freight: $40,000\nCustomer churn: $30,000–$80,000\n\nTotal: up to $240,000/year', visualDescription: 'Cost breakdown table, bold numbers, brand color accents', role: 'Quantify — full cost model shocks the viewer' },
          { slideNumber: 5, onScreenText: 'The fix isn\'t a better carrier.\nIt\'s a better spec.', visualDescription: 'Bold statement centered on brand color background', role: 'Resolution — simple, clear' },
          { slideNumber: 6, onScreenText: 'Rate your product fragility.\nMatch cushioning to it.\nVerify void fill ratio.\n\nDamage rates drop 40–60%.', visualDescription: 'Three-step process with icons, clean layout', role: 'Action — specific steps the viewer can take' },
          { slideNumber: 7, onScreenText: 'Premier Packaging Solutions\n25+ years. Zero-defect standard.\npremierpackaging.com', visualDescription: 'Brand close-out slide', role: 'CTA — credibility and clear next step' },
        ] as InstagramSlide[],
        caption: `That damaged product?\nProbably not the carrier's fault.\n\n60% of transit damage originates in the packaging specification — before the carrier touches anything.\n\nSwipe to see the three most common failures and the full cost of getting it wrong.\n\n#PackagingDamage #TransitDamage #SupplyChain #PackagingOperations #ContractPackaging`,
        cta: 'Review your damage specifications at premierpackaging.com.',
        suggestedVisuals: [
          'Slide 1: Real damaged product — authentic photo, not staged',
          'Slide 3: Clean numbered list — readable at mobile size',
          'Slide 4: Cost breakdown table with brand color highlights on numbers',
          'Slide 6: Three-step process with simple icons',
        ],
      },
      reel: {
        visualHook: 'Open box reveal — product clearly damaged, voiceover begins immediately',
        onScreenText: 'Before you blame the carrier — watch this.',
        reelScriptOrSlides: `[0:00–0:03]\n[Visual: damaged product in open box]\nText: "Before you blame the carrier — watch this."\n\n[0:03–0:10]\nText: "60% of transit damage starts with the packaging spec."\nText: "Not with the carrier."\n\n[0:10–0:20]\n[Visual: comparison — correct cushioning vs. insufficient cushioning]\nText: "Wrong cushioning type."\nText: "Under-rated box compression."\nText: "Insufficient void fill."\nText: "These are packaging decisions."\n\n[0:20–0:27]\nText: "5% damage rate on $4M in shipments = $240,000/year in exposure."\n\n[0:27–0:30]\nText: "Fix the spec first. Then file the claim."\nText: "@premierpackaging"`,
        caption: `The most common reason products arrive damaged?\n\nThe packaging specification — not the carrier.\n\n60% of transit damage originates in spec decisions made before the carrier touches the box.\n\nAudit the spec before the next damage claim.\n\n#TransitDamage #PackagingSpec #SupplyChain #Fulfillment`,
        cta: 'Audit your damage specifications at premierpackaging.com.',
        suggestedVisuals: [
          'Open box reveal with damaged product — immediate visual hook',
          'Side-by-side cushioning comparison — correct vs. insufficient',
          'Text overlay with cost numbers in bold',
        ],
      },
    },
  },

  'cost-leakage': {
    default: {
      carousel: {
        visualHook: 'Slide 1: Text — "Your packaging budget is tracking 30% of your actual packaging cost."',
        onScreenText: 'Your packaging budget is tracking 30% of your actual packaging cost.',
        reelScriptOrSlides: [
          { slideNumber: 1, onScreenText: 'Your packaging budget is tracking\n30% of your actual packaging cost.', visualDescription: 'Bold text on white background, underline or highlight on "30%"', role: 'Hook — immediate credibility challenge' },
          { slideNumber: 2, onScreenText: 'Materials cost = the visible part.\n\nThe rest is hiding in:\nFreight\nOperations\nCustomer service', visualDescription: 'Iceberg diagram: materials above water, freight/ops/CS below', role: 'Visualize the concept with the iceberg metaphor' },
          { slideNumber: 3, onScreenText: 'For a 50K shipment/month operation:\n\nDIM surcharges: $60K–$180K/yr (in freight)\nDamage/returns: $40K–$120K/yr (in ops)\nLabor inefficiency: $30K–$90K/yr (headcount)', visualDescription: 'Three-row data breakdown, each with budget line attribution', role: 'Quantify each hidden channel' },
          { slideNumber: 4, onScreenText: 'Materials budget: $450,000\nActual packaging cost: up to $840,000\n\nGap: $390,000 — unmanaged.', visualDescription: 'Before/after comparison with gap highlighted in brand accent color', role: 'Show the gap in absolute terms' },
          { slideNumber: 5, onScreenText: 'A materials cost "saving" that raises damage\nand DIM costs isn\'t a saving.\nIt\'s a margin transfer.', visualDescription: 'Bold statement on colored background — quotable format', role: 'Challenge the standard optimization approach' },
          { slideNumber: 6, onScreenText: 'The fix:\nBuild the four-channel cost model.\nManage all four.\nNot just materials.', visualDescription: 'Four labeled icons: Materials, Freight, Damage, Labor — with a checkmark', role: 'Resolution — simple and actionable' },
          { slideNumber: 7, onScreenText: 'Premier Packaging Solutions\npremierpackaging.com', visualDescription: 'Brand close-out slide', role: 'CTA' },
        ] as InstagramSlide[],
        caption: `Your packaging budget is tracking the smallest part of your packaging cost.\n\nMaterials is the line you manage.\nFreight surcharges, damage, and labor inefficiency are the lines you're missing.\n\nFor most operations, the unmanaged gap is larger than the managed budget.\n\nSwipe to see the breakdown.\n\n#PackagingCost #SupplyChain #Operations #GrossMargin #ContractPackaging`,
        cta: 'Build the full cost model at premierpackaging.com.',
        suggestedVisuals: [
          'Slide 2: Iceberg diagram — simple, instantly recognizable concept visualization',
          'Slide 3: Clean table with three rows and budget attribution',
          'Slide 4: Before/after comparison with gap highlighted',
        ],
      },
      reel: {
        visualHook: 'Split-screen: small budget line vs. large total cost reveal',
        onScreenText: 'Your packaging budget is missing 70% of your packaging cost.',
        reelScriptOrSlides: `[0:00–0:03]\nText: "Your packaging budget is missing 70% of your packaging cost."\n\n[0:03–0:12]\n[Visual: iceberg animation — materials above water, rest below]\nText: "Materials = the visible part"\nText: "Freight, damage, labor = the hidden part"\n\n[0:12–0:22]\nText: "For a 50K shipments/month operation:"\nText: "$60K–$180K in DIM surcharges (in freight)"\nText: "$40K–$120K in damage (in operations)"\nText: "$30K–$90K in labor waste (in headcount)"\n\n[0:22–0:28]\nText: "The gap between managed and actual: up to $390,000/year."\n\n[0:28–0:30]\nText: "Build the full model. Manage all four."\nText: "@premierpackaging"`,
        caption: `Your packaging cost doesn't live in your packaging budget.\n\nIt's split across freight, operations, and headcount — where it stays invisible and unmanaged.\n\nFor most operations, the unmanaged gap is $200K–$1.4M annually.\n\nBuild the four-channel model. See the full picture.\n\n#PackagingCost #Operations #SupplyChainManagement`,
        cta: 'Get the four-channel model at premierpackaging.com.',
        suggestedVisuals: [
          'Iceberg graphic or animation — universal and immediately understood',
          'Split-screen: packaging budget line vs. full cost waterfall',
          'Text-on-screen cost breakdown with numbers appearing progressively',
        ],
      },
    },
  },

  'over-packaging': { default: { carousel: { visualHook: 'Slide 1: Close-up of excessive void fill spilling out of box. Text: "You\'re paying to ship air."', onScreenText: 'You\'re paying to ship air.', reelScriptOrSlides: [{ slideNumber: 1, onScreenText: 'You\'re paying to ship air.', visualDescription: 'Excess void fill spilling from open box, bright and clear visual', role: 'Hook — visual makes the waste immediately obvious' }, { slideNumber: 2, onScreenText: 'Over-packaging: using more material or\nbigger boxes than your product needs.', visualDescription: 'Simple definition with side-by-side image of over-packed vs. right-packed box', role: 'Define — not everyone knows the term' }, { slideNumber: 3, onScreenText: 'What it costs:\n\n+ Materials: $0.15–$0.60 per unit extra\n+ DIM surcharge: $0.40–$1.20 per shipment\n+ Freight cube inefficiency: 10–25% loss', visualDescription: 'Three-row cost breakdown with icons', role: 'Quantify — show the compound cost' }, { slideNumber: 4, onScreenText: '"But more packaging = less damage."\n\nActually — damage is caused by\nspecific failures. Not insufficient bulk.', visualDescription: 'Myth-busting format: common belief struck through, truth below', role: 'Bust the objection — address the "but what about protection" concern' }, { slideNumber: 5, onScreenText: 'Right-size → saves 12–25% on combined\npackaging and freight cost.\nProtection maintained.', visualDescription: 'Bold result statement with checkmark icon', role: 'Resolution — the payoff is clear' }, { slideNumber: 6, onScreenText: 'Premier Packaging Solutions\npremierpackaging.com', visualDescription: 'Brand close-out', role: 'CTA' }] as InstagramSlide[], caption: `Shipping air is expensive.\n\nEvery cubic inch of empty space in your box costs money twice:\n1. Materials to fill it\n2. DIM weight charges from the carrier\n\nRight-sizing packaging reduces both simultaneously — without increasing damage rates.\n\n#PackagingWaste #OverPackaging #ShippingCost #Operations`, cta: 'Right-size your packaging at premierpackaging.com.', suggestedVisuals: ['Slide 1: Excess void fill — visually striking and relatable', 'Slide 2: Side-by-side over-packed vs. right-packed', 'Slide 4: Myth-busting format — struck-through text with truth below'] } } },
  'shipping-cost': { default: { carousel: { visualHook: 'Slide 1: Two paths — "Carrier negotiation" vs. "Packaging audit." One path is longer.', onScreenText: 'You\'re cutting shipping costs in the wrong order.', reelScriptOrSlides: [{ slideNumber: 1, onScreenText: 'You\'re cutting shipping costs\nin the wrong order.', visualDescription: 'Bold text, clean white background, high-contrast', role: 'Hook — immediate provocation for ops managers' }, { slideNumber: 2, onScreenText: 'Wrong order:\n1. Call the carrier\n2. Get 4–6% discount\n3. Costs still too high\n\nRight order:\n1. Packaging audit\n2. Right-size specs\n3. Carrier negotiation', visualDescription: 'Two-column layout: wrong vs. right with icons', role: 'Establish the contrast immediately' }, { slideNumber: 3, onScreenText: 'Why order matters:\n\nDIM pricing charges by box volume.\nOversized box = inflated rate.\nDiscount on inflated rate = partial fix.', visualDescription: 'Simple diagram showing DIM rate calculation', role: 'Explain the mechanism' }, { slideNumber: 4, onScreenText: 'Spec audit first → right-sized box → then 10% discount:\nTotal cost: $1.89/shipment\n\nDiscount first on oversized box:\nTotal cost: $2.88/shipment\n\nDifference: $0.99/shipment', visualDescription: 'Side-by-side math comparison, clean data layout', role: 'Quantify the difference — make the case clear' }, { slideNumber: 5, onScreenText: 'Combined outcome from right sequence:\n15–25% total shipping cost reduction\n\nNegotiation only:\n3–8%', visualDescription: 'Bar chart comparison: right sequence vs. negotiation only', role: 'Summarize the financial difference' }, { slideNumber: 6, onScreenText: 'Audit first.\nNegotiate second.\nSave more.', visualDescription: 'Bold three-line statement, centered, brand colors', role: 'Resolution — simple and memorable' }, { slideNumber: 7, onScreenText: 'Premier Packaging Solutions\npremierpackaging.com', visualDescription: 'Brand close-out', role: 'CTA' }] as InstagramSlide[], caption: `Shipping cost reduction works best in the right order.\n\nMost companies negotiate with the carrier first.\nThey get 3–8% back.\nThe real savings — 12–20% from packaging optimization — stay on the table.\n\nSwipe to see why the sequence matters.\n\n#ShippingCost #PackagingOps #FreightCost #SupplyChain`, cta: 'Start your packaging audit at premierpackaging.com.', suggestedVisuals: ['Slide 2: Wrong vs. right sequence — clear two-column visual', 'Slide 4: Side-by-side math — data visualization style', 'Slide 5: Bar chart comparison of savings levels'] } } },
  'warehouse-slowdowns': { default: { carousel: { visualHook: 'Slide 1: Pack station with messy workflow visible. Text: "Your most expensive real estate."', onScreenText: 'Your most expensive real estate.', reelScriptOrSlides: [{ slideNumber: 1, onScreenText: 'Your pack station is your\nmost expensive real estate.\nMost teams don\'t treat it that way.', visualDescription: 'Wide shot of fulfillment center pack station area', role: 'Hook — reframes a familiar space as a financial decision' }, { slideNumber: 2, onScreenText: '4 extra minutes/shipment.\n200 daily orders.\n$18/hour labor.\n= $62,400/year in waste.', visualDescription: 'Math equation style layout, clean and clear', role: 'Quantify — specific math makes abstract waste tangible' }, { slideNumber: 3, onScreenText: 'Where the time goes:\n\nBox selection: 1.5–3 min\nVoid fill: 1.5–3 min\nLabel and stage: 1–2 min\n= 4–8 min/unit (unoptimized)', visualDescription: 'Time breakdown bar chart, each step labeled', role: 'Diagnose — show where the waste is' }, { slideNumber: 4, onScreenText: 'Optimized:\n\nPre-erected boxes: 0.3 min\nMetered void fill: 0.8 min\nAuto-label: 0.3 min\n= 1.4 min/unit', visualDescription: 'Same bar chart format, dramatically shorter bars', role: 'Contrast — show what optimized looks like' }, { slideNumber: 5, onScreenText: 'At 1,000 daily units:\n\nUnoptimized: $2,667/day\nOptimized: $467/day\nAnnual gap: $803,000', visualDescription: 'Bold comparison numbers, brand accent color on gap figure', role: 'Scale the financial impact' }, { slideNumber: 6, onScreenText: 'Time your workflow.\nBefore the next hire.', visualDescription: 'Bold CTA, simple and direct', role: 'Action — specific next step' }, { slideNumber: 7, onScreenText: 'Premier Packaging Solutions\npremierpackaging.com', visualDescription: 'Brand close-out', role: 'CTA' }] as InstagramSlide[], caption: `Your pack station is where labor cost is made or wasted.\n\nAn unoptimized workflow runs 4–8 minutes per shipment.\nAn optimized one runs 1.4–2 minutes.\n\nAt scale, that gap is six figures annually.\n\nTime your workflow before making the next hiring decision.\n\n#Fulfillment #PackStation #LaborCost #Operations #WarehouseOps`, cta: 'Benchmark your pack station at premierpackaging.com.', suggestedVisuals: ['Slide 1: Real pack station footage or clean warehouse image', 'Slide 3–4: Bar chart comparison — time per step, optimized vs. not', 'Slide 5: Bold financial comparison numbers'] } } },
  'return-damage': { default: { carousel: { visualHook: 'Slide 1: Returned product in damaged state. Text: "This left the customer fine."', onScreenText: 'This left the customer fine.', reelScriptOrSlides: [{ slideNumber: 1, onScreenText: 'This left the customer fine.\nIt arrived back damaged.\nThat\'s a packaging failure.', visualDescription: 'Damaged returned product — real and relatable', role: 'Hook — immediate reframe of return damage attribution' }, { slideNumber: 2, onScreenText: '18–22% of returned products\narrive non-resaleable.\n\n~35% of those were damaged\nin return transit.', visualDescription: 'Data slide with industry statistics, clean format', role: 'Establish scale of the problem' }, { slideNumber: 3, onScreenText: 'For $10M operation, 12% return rate:\n\nReturns: $1.2M value\nNon-resaleable (20%): $240,000\nPackaging-related: $84,000\n+ Double freight: $18,000–$40,000\n\nTotal preventable: ~$124,000/yr', visualDescription: 'Waterfall cost breakdown — each component adds to the total', role: 'Quantify the full recoverable cost' }, { slideNumber: 4, onScreenText: 'Why it happens:\n\nReturn packaging isn\'t specified.\nCustomers reuse original boxes.\nReturn carrier handles differently.', visualDescription: 'Three-item list with icons', role: 'Root cause — three specific reasons' }, { slideNumber: 5, onScreenText: 'Fix: specify return packaging\nfor your high-value SKUs.\n\nCost: $0.15–$0.60/unit.\nPayback: 30–60 days.', visualDescription: 'Solution with ROI — specific and actionable', role: 'Resolution with fast payback' }, { slideNumber: 6, onScreenText: 'Premier Packaging Solutions\npremierpackaging.com', visualDescription: 'Brand close-out', role: 'CTA' }] as InstagramSlide[], caption: `That returned product didn't arrive damaged because of the carrier.\n\nIt arrived damaged because the return packaging wasn't specified.\n\nFor operations with 10%+ return rates, this represents $100K+ in preventable write-offs annually.\n\nSwipe to see the full breakdown.\n\n#ReturnPackaging #Ecommerce #Operations #ReturnsManagement #PackagingCost`, cta: 'Review your return packaging specs at premierpackaging.com.', suggestedVisuals: ['Slide 1: Damaged return product — authentic', 'Slide 3: Waterfall cost breakdown visual', 'Slide 5: Simple fix with ROI callout'] } } },
  'freight-inefficiency': { default: { carousel: { visualHook: 'Slide 1: Partially full truck. Text: "You\'re paying for this empty space."', onScreenText: 'You\'re paying for this empty space.', reelScriptOrSlides: [{ slideNumber: 1, onScreenText: 'You\'re paying for this empty space.', visualDescription: 'Partially loaded truck or pallet — visible empty space', role: 'Hook — immediate visual of the waste' }, { slideNumber: 2, onScreenText: 'Cube utilization: how much of your\ntruck capacity you\'re actually filling.\n\nIndustry average: 62%\nOptimized: 82–88%', visualDescription: 'Bar chart: industry average vs. optimized, gap highlighted', role: 'Establish the benchmark gap' }, { slideNumber: 3, onScreenText: 'What drives the gap:\n\n→ Boxes that don\'t tile cleanly on pallets\n→ Oversized boxes → fewer units per layer\n→ No packaging engineering for cube fit', visualDescription: 'Three causes with icons — clean layout', role: 'Root cause — specific and actionable' }, { slideNumber: 4, onScreenText: '$500K freight budget\nFrom 62% → 80% utilization:\n\n= $90,000 recovered/year\nNo carrier negotiation needed.', visualDescription: 'Bold ROI statement with calculation visible', role: 'Quantify — carrier-independent savings' }, { slideNumber: 5, onScreenText: 'This is a packaging decision.\nManage it as one.', visualDescription: 'Bold statement, brand colors', role: 'Resolution — reframe ownership' }, { slideNumber: 6, onScreenText: 'Premier Packaging Solutions\npremierpackaging.com', visualDescription: 'Brand close-out', role: 'CTA' }] as InstagramSlide[], caption: `Your freight cost has a packaging problem embedded in it.\n\nCube utilization — how efficiently your packaging fills each truck — is a packaging engineering decision.\n\nMoving from 62% to 80% utilization on a $500K freight budget = $90,000 recovered. No carrier changes needed.\n\n#FreightCost #CubeUtilization #PackagingEngineering #SupplyChain`, cta: 'Measure your cube utilization at premierpackaging.com.', suggestedVisuals: ['Slide 1: Partially loaded truck — visceral visual of the waste', 'Slide 2: Bar chart comparing utilization levels', 'Slide 4: Bold ROI statement with simple calculation'] } } },
  scaling: { default: { carousel: { visualHook: 'Slide 1: Revenue growth chart + flat cost-per-unit line. Text: "Something is wrong here."', onScreenText: 'Revenue doubled. Cost per unit didn\'t drop. Something is wrong.', reelScriptOrSlides: [{ slideNumber: 1, onScreenText: 'Revenue doubled.\nCost per unit didn\'t drop.\nSomething is wrong.', visualDescription: 'Two-line chart: revenue going up steeply, cost per unit staying flat', role: 'Hook — challenge the expectation that growth = efficiency' }, { slideNumber: 2, onScreenText: 'Scale should lower packaging cost per unit.\nIf it isn\'t:\nThe operation wasn\'t re-engineered\nduring the growth phase.', visualDescription: 'Simple two-path diagram: re-engineered vs. not re-engineered', role: 'Explain the mechanism' }, { slideNumber: 3, onScreenText: 'Benchmarks — consumer goods:\n\n$15M–$40M (optimized): $1.20–$1.60/unit\n$15M–$40M (unoptimized): $1.75–$2.30/unit\n\nGap at $25M: up to $1.2M/year', visualDescription: 'Two-row comparison table with gap highlighted', role: 'Quantify with industry benchmarks' }, { slideNumber: 4, onScreenText: 'The right time to review:\n\nDuring the growth phase.\nNot after.', visualDescription: 'Timeline showing growth phase with review window highlighted', role: 'Timing — critical strategic point' }, { slideNumber: 5, onScreenText: 'What to audit:\n\n→ Box specs vs. current SKUs\n→ DIM weight exposure at new volume\n→ Pack station time per unit\n→ Damage rate trend during growth', visualDescription: 'Four-item checklist with icons', role: 'Action — four specific areas to review' }, { slideNumber: 6, onScreenText: 'Premier Packaging Solutions\npremierpackaging.com', visualDescription: 'Brand close-out', role: 'CTA' }] as InstagramSlide[], caption: `Revenue growth without packaging optimization just means you're losing more money, faster.\n\nScale should reduce cost per unit.\nIf yours isn't moving, the packaging operation needs a review — now, not later.\n\nSwipe for the benchmarks and the review checklist.\n\n#ScaleOps #PackagingOperations #GrowthStrategy #SupplyChain #Operations`, cta: 'Start your scaling packaging review at premierpackaging.com.', suggestedVisuals: ['Slide 1: Revenue vs. cost-per-unit chart — clear visual of the gap', 'Slide 3: Two-row benchmark comparison', 'Slide 4: Timeline with growth phase highlighted'] } } },
  'margin-loss': { default: { carousel: { visualHook: 'Slide 1: Text — "Your packaging team hit their cost target. Gross margin still dropped."', onScreenText: 'Your packaging team hit their cost target.\nGross margin still dropped.', reelScriptOrSlides: [{ slideNumber: 1, onScreenText: 'Your packaging team hit their cost target.\nGross margin still dropped.', visualDescription: 'Bold text on white, two-line statement', role: 'Hook — painful recognition moment for ops leaders' }, { slideNumber: 2, onScreenText: 'Packaging affects gross margin\nthrough 4 channels:\n\n1. Materials\n2. Freight (DIM, cube)\n3. Damage & returns\n4. Labor (pack station)', visualDescription: 'Four numbered items with icons, clean layout', role: 'Framework — the four channels' }, { slideNumber: 3, onScreenText: 'Most teams manage #1.\nThe rest goes unattributed.', visualDescription: 'Same four-item list with only #1 checked, others with question marks', role: 'Expose the gap — visual makes it immediate' }, { slideNumber: 4, onScreenText: '$30M operation:\n\nManaged: $450K (materials)\nUnmanaged: $580K–$1.4M\n\nThe gap you\'re not seeing.', visualDescription: 'Two bars: managed vs. total, gap highlighted in accent color', role: 'Quantify — make the invisible cost visible' }, { slideNumber: 5, onScreenText: 'Manage all four channels.\nNot just the one you can see.', visualDescription: 'Four checkmarks — all channels now checked', role: 'Resolution — simple call to full-cost management' }, { slideNumber: 6, onScreenText: 'Premier Packaging Solutions\npremierpackaging.com', visualDescription: 'Brand close-out', role: 'CTA' }] as InstagramSlide[], caption: `There are four ways packaging decisions affect your gross margin.\n\nMost operations manage one of them.\n\nFor a $30M operation, the unmanaged gap is $580K–$1.4M annually.\n\nSwipe to see all four channels — and what full-cost management looks like.\n\n#GrossMargin #PackagingCost #Operations #CFO #SupplyChainFinance`, cta: 'Build the four-channel cost model at premierpackaging.com.', suggestedVisuals: ['Slide 3: Four items — only #1 checked, creates immediate visual tension', 'Slide 4: Two bar comparison with gap highlighted', 'Slide 5: All four checkmarks — resolution visual'] } } },
}

function getTemplate(problem: PackagingProblem, format: InstagramFormat, variation: ContentVariation): InstagramTemplate {
  const problemTemplates = TEMPLATES[problem] ?? TEMPLATES['cost-leakage']
  const variantTemplates = problemTemplates[variation] ?? problemTemplates['default']!
  const formatTemplate = variantTemplates[format] ?? variantTemplates['carousel']!
  return formatTemplate
}

const REPURPOSING_BY_FORMAT: Record<InstagramFormat, string[]> = {
  reel: [
    'Convert the reel script into a YouTube Shorts script — same structure, slight format adjustment.',
    'Use the on-screen text lines as a Twitter/X thread — each line becomes a tweet.',
    'Extract the hook line as a LinkedIn post opening.',
    'Use the caption as a Facebook short post.',
  ],
  carousel: [
    'Each slide becomes one day in a LinkedIn content series.',
    'Use slide 3 (cost quantification) as a standalone LinkedIn post with expanded data.',
    'Convert slide structure into a YouTube video outline — one slide = one section.',
    'Use the caption as a Twitter/X single post.',
  ],
  caption: [
    'Expand the caption into a full LinkedIn post with supporting data.',
    'Use the caption hook as a Twitter/X single post.',
    'Convert into a YouTube Shorts voiceover script.',
  ],
  story: [
    'Convert the story frames into a LinkedIn post series.',
    'Use the poll questions as Twitter/X engagement questions.',
    'Turn the story sequence into a YouTube Shorts script.',
  ],
}

export function generateInstagramContent(inputs: InstagramInputs, variation: ContentVariation = 'default'): InstagramOutput {
  const template = getTemplate(inputs.mainProblem, inputs.contentFormat, variation)

  const captionText = typeof template.reelScriptOrSlides === 'string' ? template.reelScriptOrSlides : ''
  const qualityScore = scoreContent({
    hook: template.onScreenText,
    body: template.caption + ' ' + captionText,
    cta: template.cta,
    variation,
  })

  const improvementSuggestions: string[] = [
    `For ${inputs.contentFormat} format, ensure the first frame works as a static image if shared to feed.`,
    `Target viewer is "${inputs.targetViewer}" — consider using role-specific language in the hook (e.g., "For ops directors..." or "If you run fulfillment...").`,
    'Add a location or product category tag to improve discovery for B2B audiences.',
    'Schedule during Tuesday–Thursday, 8–10 AM for peak B2B Instagram engagement windows.',
  ]

  return {
    visualHook: template.visualHook,
    onScreenText: template.onScreenText,
    reelScriptOrSlides: template.reelScriptOrSlides,
    caption: template.caption,
    cta: template.cta,
    suggestedVisuals: template.suggestedVisuals,
    repurposingSuggestions: REPURPOSING_BY_FORMAT[inputs.contentFormat],
    qualityScore,
    improvementSuggestions,
  }
}
