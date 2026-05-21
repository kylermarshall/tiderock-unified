import type { YouTubeInputs, YouTubeOutput, ScriptSection, RegenerateMode } from '../types';
import { scoreContent, getImprovements } from './scoring';

const PROBLEMS = [
  'moisture', 'surface prep', 'coating material', 'field return', 'thickness',
  'compliance', 'rework', 'parylene', 'contamination', 'thermal',
];

function problemIdx(p: string): number {
  const lower = p.toLowerCase();
  const idx = PROBLEMS.findIndex(k => lower.includes(k));
  return idx >= 0 ? idx : 0;
}

// ─── Titles ──────────────────────────────────────────────────────────────────

const TITLES: Record<string, string[][]> = {
  default: [
    ['Why Your Conformal Coating Keeps Failing in the Field', 'The Hidden Cost of the Wrong PCB Coating', 'How Surface Contamination Destroys Coating Adhesion', 'Parylene vs Acrylic: The Cost Comparison You\'re Getting Wrong', 'Why Defense Electronics Fail MIL-SPEC Testing'],
    ['Why Acrylic Coating Fails in High-Humidity Environments', 'The Real Cost of a Conformal Coating Field Return', 'Surface Prep vs. Coating Material: Which One Actually Matters', 'How Conformal Coating Thickness Specification Causes Failures', 'What AS9100 Auditors Find in Coating Process Records'],
  ],
  direct: [
    ['Stop Using Acrylic Coating in High-Humidity Environments', 'Your Coating Spec Is Wrong — Here\'s How to Fix It', 'The Rework Line Is Telling You Something About Your Coating Process', 'Three Coating Specification Mistakes That Cause Field Failures', 'How to Select Conformal Coating Material for Your Application'],
  ],
  executive: [
    ['The Financial Case for Proper Conformal Coating Selection', 'Lifecycle Cost Analysis: Coating Investment vs. Field Return Exposure', 'Why Cutting Coating Costs Increases Total Program Cost', 'The ROI of Conformal Coating Process Qualification', 'How Coating Specification Decisions Drive Warranty Exposure'],
  ],
  contrarian: [
    ['Cheaper Conformal Coating Is the Most Expensive Decision You\'ll Make', 'Your Coating Approval Doesn\'t Mean Your Process Is Qualified', 'The Inspection That Passes Everything But Misses the Defect That Fails in the Field', 'Parylene Is Not Expensive — Your Cost Model Is Wrong', 'Why Your 85/85 Test Results Are Misleading You'],
  ],
  shorter: [
    ['Coating Fails. Here\'s Exactly Why.', 'Wrong Coating. Wrong Application. Predictable Failure.', 'Surface Prep Determines Coating Life — Not the Material', 'The Conformal Coating Decision That\'s Costing You Field Returns', 'How Coating Thickness Specification Causes Two Different Failures'],
  ],
  specific: [
    ['Acrylic Conformal Coating in 95% RH: What Actually Happens to Your PCB', 'Parylene Pinhole Defects: How They Form and How to Prevent Them', 'Selective Coating Repeatability: Why ±0.002 Inch Matters for Coverage', 'ROSE Testing Before Conformal Coating: The 14 μg/cm² Threshold Explained', 'CTE Mismatch and Conformal Coating Disbondment in Automotive Electronics'],
  ],
};

// ─── Thumbnail texts ─────────────────────────────────────────────────────────

const THUMBNAIL_TEXTS: string[][] = [
  ['YOUR COATING IS\nFAILING EARLY', 'WRONG COATING\n= FIELD RETURNS', 'THE REAL COST\nOF CHEAP COATING', 'WHY PCBs FAIL\nIN THE FIELD', 'SURFACE PREP\nOR COATING FAILURE'],
  ['COATING SPEC\nWAS WRONG', 'THE 10X RULE\nOF COATING COST', 'ACRYLIC IN\nHUMID ENVIRONMENTS', 'YOUR AUDIT\nWILL FAIL THIS', 'THERMAL CYCLING\nKILLS ACRYLIC'],
];

// ─── 3-second hooks ──────────────────────────────────────────────────────────

const THREE_SEC_HOOKS: string[] = [
  'Your conformal coating passed inspection. It\'s still going to fail. Here\'s why.',
  'The rework line isn\'t a quality problem. It\'s a coating process problem.',
  'You paid for conformal coating. You didn\'t pay for protection. Here\'s the difference.',
  'Most PCB failures in the field start before the coating is applied.',
  'The cheapest coating option just cost you a field return. Let me show you the math.',
  'Your coating spec was copied from a previous project. The environment was different.',
  'Surface prep determines coating adhesion. Not the material. The surface. I\'ll explain.',
  'Parylene costs more per unit. It also eliminates the rework line. Here\'s the calculation.',
  'The 85/85 humidity test passed. The field deployment failed. Here\'s why that happens.',
  'AS9100 audit failed on the coating process records. Not the material. Here\'s what they found.',
];

// ─── Opening lines ────────────────────────────────────────────────────────────

const OPENING_LINES: string[] = [
  'If you\'re seeing field returns with moisture damage or corrosion under the coating, the specification is the first place to look — not the assembly line.',
  'Conformal coating failure analysis almost always traces back to one of three root causes: wrong material for the environment, inadequate surface preparation, or coating thickness outside specification.',
  'The difference between a coating that protects for ten years and one that fails in 18 months is usually not the material. It\'s the process.',
  'Most manufacturers treat conformal coating as a commodity step. The field return data tells a different story.',
  'This video is for engineers and program managers who are seeing coating-related field failures and want to understand exactly what\'s causing them and how to prevent it.',
  'The financial case for proper conformal coating is straightforward. Most organizations only run the numbers after the first field return cycle — this video runs them before.',
  'Parylene is the most misunderstood coating material in electronics manufacturing. Most of the arguments against it are based on an incomplete cost model.',
  'Conformal coating thickness specification looks simple. It\'s a range: a minimum for protection, a maximum before stress-related failures. Manual spray coating violates both ends of that range on the same board.',
];

// ─── Script templates ─────────────────────────────────────────────────────────

const SCRIPT_TEMPLATES: ScriptSection[][] = [
  // 0 – moisture / field failure (general)
  [
    {
      label: 'Problem',
      content: 'Your electronics are failing in the field. Moisture under the coating. Corrosion on the copper traces. Dendritic growth bridging across conductor spacing. The assembly passed every inspection on the line — coating applied, cure verified, visual inspection passed, shipped. But 18 months into field deployment, the return arrives.',
    },
    {
      label: 'Cost',
      content: 'The field return costs you: logistics and return shipping, rework labor — typically 15 to 45 minutes per assembly — replacement components, engineering time on root cause analysis, warranty reserve adjustments, and any customer relationship damage from a reliability event. That cost is typically 10 to 20 times the original coating investment per assembly. It\'s not an estimate. It\'s consistent across industries.',
    },
    {
      label: 'Root Cause',
      content: 'The root cause traces back to a coating specification decision. Acrylic was specified because the previous program used acrylic. The previous program shipped into a climate-controlled facility. This one ships into a coastal industrial plant at 85% ambient humidity. Acrylic has a measurable moisture vapor transmission rate. In a high-humidity environment, moisture penetrates over time. It\'s a material property, not a defect.',
    },
    {
      label: 'Fix',
      content: 'The fix is a specification change, not a manufacturing change. Define the operating environment first: temperature range, humidity levels, chemical exposure, deployment duration. Those variables constrain the viable coating materials. For high-humidity or long-deployment applications, silicone or parylene. For general-purpose controlled environments, acrylic. The material selection that follows from this analysis is defensible and optimized for the application.',
    },
    {
      label: 'Takeaway',
      content: 'If your field return data shows moisture or corrosion damage, you can fix the root cause — but only if you make the specification change before the next production run. SpecCoat reviews coating specifications against operating environment requirements. If your process needs assessment, start at SpecCoat.com.',
    },
  ],

  // 1 – surface prep / adhesion
  [
    {
      label: 'Problem',
      content: 'The coating looks right. The cure looks right. The visual inspection passes. Then six months into field deployment, the coating starts lifting at the component leads. Moisture gets underneath. Corrosion begins. The failure mode looks like a coating material failure, but it\'s not. It\'s a surface preparation failure that was invisible at every inspection step.',
    },
    {
      label: 'Cost',
      content: 'Surface-prep-related adhesion failures are expensive for two reasons. First, they\'re not detectable at end-of-line inspection — they pass every check and ship. Second, by the time the failure appears in the field, the production run is complete and every assembly shipped with the same root cause. The exposure is the entire production volume, not a single defective unit.',
    },
    {
      label: 'Root Cause',
      content: 'Ionic contamination on the substrate prevents proper wetting and adhesion. Flux residue from soldering. Finger oils from handling. Mold release agents from plastic connectors. Each one creates a microscopic barrier between the coating and the substrate. The coating deposits on top of the contamination. It looks clean. It adheres temporarily. Under field stress — thermal cycling, humidity, vibration — it disbonds exactly where the contamination was.',
    },
    {
      label: 'Fix',
      content: 'Ionic contamination testing before coating provides a measurable, pass/fail cleanliness check. IPC specifies 14.0 μg NaCl equivalent per cm² as the threshold. Omegameter testing, ROSE testing, and ion chromatography all measure it. Plasma treatment for low-surface-energy substrates — PTFE connectors, certain housing materials — increases surface energy and improves adhesion on surfaces where contamination control alone isn\'t sufficient.',
    },
    {
      label: 'Takeaway',
      content: 'Surface preparation is not an optional step. It\'s the step that determines whether everything that follows it actually works. SpecCoat can assess your cleaning and surface prep process against your coating adhesion requirements. Start at SpecCoat.com.',
    },
  ],

  // 2 – parylene lifecycle cost
  [
    {
      label: 'Problem',
      content: 'You\'re evaluating parylene against acrylic on unit cost. Parylene costs $1.50 to $3.00 per assembly depending on geometry and volume. Acrylic costs $0.10 to $0.25 per assembly. The RFQ comes back. Parylene loses the unit cost comparison by a factor of 10 to 15x. The decision goes to acrylic.',
    },
    {
      label: 'Cost',
      content: 'What the unit cost comparison doesn\'t include: the rework defect rate for spray-applied acrylic on complex geometries — typically 2 to 6% — at $8 to $45 per rework event. The field return rate from moisture penetration through acrylic in high-humidity deployments. The engineering hours troubleshooting failures that parylene would have prevented. The warranty reserve for assemblies with a documented coating-related failure mode.',
    },
    {
      label: 'Root Cause',
      content: 'The comparison is made at the wrong level of analysis. Parylene\'s vapor deposition process produces uniform coverage with no meniscus effects at component leads, no bridging across high-density pin fields, and no surface tension effects that leave gaps under component bodies. The rework defect rate for properly specified parylene is near zero. The field return rate for high-humidity applications is a fraction of spray-applied acrylic.',
    },
    {
      label: 'Fix',
      content: 'Run the lifecycle cost comparison at the program level, not the unit level. Include rework rate, field return rate, warranty exposure, and engineering time in the model. For applications with long deployment cycles (3 years or more), high humidity, complex geometries, or fine-pitch components, the crossover point where parylene wins on total cost is usually somewhere between 500 and 5,000 units depending on the application.',
    },
    {
      label: 'Takeaway',
      content: 'Parylene is not expensive. Incomplete cost models are expensive. SpecCoat can run the lifecycle cost comparison for your specific application. Start at SpecCoat.com.',
    },
  ],

  // 3 – compliance / defense
  [
    {
      label: 'Problem',
      content: 'Your defense electronics program is coming up for AS9100 or ITAR audit. The conformal coating material is QPL-approved. The application process looks right. The assemblies pass visual inspection. But the AS9100 auditor is not there to inspect your assemblies. They\'re there to inspect your process records.',
    },
    {
      label: 'Cost',
      content: 'An AS9100 coating process audit non-conformance creates: a mandatory corrective action with a defined response timeline, potential hold on shipments while the CAR is open, re-qualification costs if the non-conformance is process-systemic, schedule delays against the program delivery commitment, and potential contract-level exposure if the program requires certified quality records for each shipped assembly.',
    },
    {
      label: 'Root Cause',
      content: 'The non-conformances are almost never in the material. They\'re in the process records. No documented cleaning procedure before coating. No ionic contamination test data for the production batch. No coating thickness measurement records with acceptance criteria and actual measurements. No cure verification log. No traceability between the coating material lot number and the serial-numbered assemblies it was applied to.',
    },
    {
      label: 'Fix',
      content: 'Treat conformal coating as a controlled process, not a commodity step. Documented cleaning procedure with ionic contamination test acceptance criteria. Batch records for coating application including material lot, parameters, operator, and date. Coating thickness measurements with actual values against drawing requirements. Cure verification per the material and process specification. First article inspection report for the coating process.',
    },
    {
      label: 'Takeaway',
      content: 'The documentation investment is not significant. The consequence of missing it in an audit is. SpecCoat works with defense and aerospace manufacturers to build conformal coating process documentation that meets AS9100 requirements. SpecCoat.com.',
    },
  ],

  // 4 – thickness specification
  [
    {
      label: 'Problem',
      content: 'Conformal coating thickness specification looks like one number on the drawing. It\'s actually a range with two separate failure modes — one at the low end, one at the high end. Manual spray coating on a complex populated PCB creates both failure modes simultaneously, on the same board.',
    },
    {
      label: 'Cost',
      content: 'Underthickness at component leads leaves conductor traces with insufficient dielectric protection. Moisture penetrates. Corrosion starts at the leads first. Overthickness in the flat field areas creates stress concentration during thermal cycling. The coating disbonds at the location where it was thickest. Both failure modes produce field returns. Both are invisible at visual inspection.',
    },
    {
      label: 'Root Cause',
      content: 'Manual spray coating cannot hold ±0.001 inch on complex topography. Spray-applied coating follows the surface geometry: it builds up in flat areas and thins out at component leads and underside surfaces. On a high-density populated PCB, the same spray pass that deposits 4 mils in the open field deposits 0.4 mils at the underside of a low-standoff component. IPC minimum is 0.5 mil. The component is already out of spec.',
    },
    {
      label: 'Fix',
      content: 'Automated selective coating equipment holds ±0.001 to ±0.002 inch repeatability. Programmed nozzle paths deposit the correct thickness at each location on the board, including critical component features. The defect rate from thickness non-conformance drops to near zero. The rework associated with spray thickness variability is eliminated. The qualification of the process, including cross-section analysis to verify coverage, provides documented evidence that the specification is being met.',
    },
    {
      label: 'Takeaway',
      content: 'The capital cost of automated selective coating is justified by the rework elimination in most medium-to-high volume applications. SpecCoat works with manufacturers to assess coating process capability against thickness specification requirements. SpecCoat.com.',
    },
  ],

  // 5 – automotive thermal cycling
  [
    {
      label: 'Problem',
      content: 'Your automotive electronics program is going into under-hood deployment. The temperature profile is −40°C on a cold morning start to 125°C under sustained load. The conformal coating specification carries over from the previous program, which was a cabin electronics application. Acrylic is specified.',
    },
    {
      label: 'Cost',
      content: 'The first thermal cycling qualification run will tell you what\'s happening. Acrylic is rigid below −20°C and begins to crack under the CTE stress imposed by the temperature cycling. After 100 to 200 cycles, the cracking pattern becomes visible under microscopy. After 500 cycles, the cracks have propagated to the point where moisture ingress pathways exist. The qualification test fails. The coating specification needs to change.',
    },
    {
      label: 'Root Cause',
      content: 'Acrylic conformal coating is not designed for wide-range thermal cycling. Its elastic modulus at low temperatures is too high to accommodate the CTE differential between the PCB laminate, component bodies, and the coating itself. Silicone conformal coating maintains flexibility across the full automotive temperature range — from −65°C to 200°C depending on formulation. The stress that cracks acrylic flexes through silicone.',
    },
    {
      label: 'Fix',
      content: 'Material selection for automotive under-hood applications starts with the temperature specification, not the cost comparison. Silicone with the appropriate formulation for the temperature range is the correct baseline. The application process, cure schedule, and surface preparation requirements are all defined by the material selection. Rework of silicone after curing requires different methods than acrylic — mechanical or laser ablation rather than solvent — so the rework process specification changes as well.',
    },
    {
      label: 'Takeaway',
      content: 'The material cost differential between acrylic and silicone is a fraction of the qualification retest cost when the wrong material fails cycling. SpecCoat works with automotive electronics manufacturers on coating material selection and process qualification for thermal cycling environments. SpecCoat.com.',
    },
  ],
];

// ─── Retention beats ─────────────────────────────────────────────────────────

const RETENTION_BEATS: string[][] = [
  [
    '0:00 — Hook: Most assemblies carry the coating defect that causes their field failure',
    '0:15 — Establish the cost: the 10–20x field return vs. coating investment ratio',
    '0:40 — Root cause: the specification decision made without environment analysis',
    '1:10 — The fix: environment-first material selection and process validation',
    '1:40 — CTA: Review your coating specification with SpecCoat',
  ],
  [
    '0:00 — Hook: Surface prep determines adhesion — not the coating material',
    '0:20 — What contamination does to coating adhesion (the mechanism)',
    '0:45 — Why it passes visual and fails in the field',
    '1:15 — Ionic testing and plasma treatment: the fixes',
    '1:45 — CTA: Assess your surface prep process',
  ],
  [
    '0:00 — Hook: Parylene costs more per unit. The math still works out.',
    '0:15 — The unit cost comparison that gets made every program cycle',
    '0:35 — What the comparison is missing: rework, field returns, warranty',
    '1:05 — The lifecycle cost model with real numbers',
    '1:35 — CTA: Run the comparison for your application',
  ],
  [
    '0:00 — Hook: AS9100 auditors don\'t look at your coating. They look at your records.',
    '0:20 — What the audit actually checks (documentation, not material)',
    '0:50 — The four most common coating process non-conformances',
    '1:20 — What a compliant coating process documentation set looks like',
    '1:50 — CTA: Review your documentation before the auditor does',
  ],
  [
    '0:00 — Hook: Thickness specification has two failure modes. Manual spray coating hits both.',
    '0:20 — Underthickness at component leads: the mechanism',
    '0:45 — Overthickness in flat areas: the mechanism',
    '1:10 — How automated selective coating eliminates both',
    '1:40 — CTA: Assess your coating process capability',
  ],
  [
    '0:00 — Hook: The acrylic coating passed the room-temperature inspection. Then it saw −40°C.',
    '0:15 — CTE differential and why acrylic cracks in thermal cycling',
    '0:40 — Silicone vs. acrylic across the automotive temperature range',
    '1:05 — How to specify the right material from the thermal profile',
    '1:35 — CTA: Review your material selection for your temperature specification',
  ],
];

// ─── Business insights ────────────────────────────────────────────────────────

const BUSINESS_INSIGHTS: string[] = [
  'Conformal coating field failures generate rework costs, warranty exposure, and engineering time that consistently exceed initial coating investment by 10 to 20x. For high-reliability applications, the coating specification is the single highest-leverage quality decision in the assembly process.',
  'Surface contamination before coating is the leading controllable cause of adhesion failure. Ionic contamination testing costs minutes and eliminates the failure mode that produces the most undetectable field defects.',
  'Parylene\'s unit cost premium disappears in lifecycle cost analysis when rework defect rates for spray-applied alternatives are included. For complex geometries or long-deployment applications, vapor deposition is frequently the lower-cost option over the program lifecycle.',
  'Defense and aerospace programs that fail AS9100 conformal coating process audits almost always fail on documentation, not material quality. The investment in process records is small relative to the cost of a corrective action during a program delivery cycle.',
  'Automotive under-hood electronics programs that carry acrylic coating specifications into thermal cycling qualification routinely encounter disbondment failures. The material reselection cost at qualification is a multiple of the original material cost differential.',
  'Conformal coating thickness non-conformance — underthickness at leads, overthickness in field areas — is a predictable outcome of manual spray coating on complex topography. Automated selective coating equipment eliminates it.',
  'Medical device electronic assemblies that rely on conformal coating for long-term moisture protection require coating process validation, not just material qualification. FDA expectations for process validation of coating applied to implantable or life-sustaining devices are specific.',
];

// ─── CTAs ─────────────────────────────────────────────────────────────────────

const CTAS: string[] = [
  'If your assemblies are seeing field failures with coating-related root causes, the specification is the place to start. SpecCoat.com offers process assessments for manufacturers who want to reduce field return rates.',
  'Request a conformal coating specification review at SpecCoat.com. Your material selection, surface prep process, and thickness targets will be assessed against your actual operating environment.',
  'Visit SpecCoat.com to run the lifecycle cost comparison for your application. The calculation often changes the coating selection decision.',
  'If your program is coming up for AS9100 or ITAR audit, SpecCoat can review your conformal coating process documentation before the auditor does. SpecCoat.com.',
  'New program going into a harsh environment? SpecCoat.com — coating specification review and material selection before the first build.',
];

const REPURPOSING = [
  'Cut the hook and first 15 seconds into a standalone YouTube Short',
  'Use the cost section as a LinkedIn post with the 10–20x ratio as the hook',
  'Convert the five-section structure into a numbered Instagram carousel',
  'Turn the takeaway into a Twitter/X thread opener',
  'Use the retention beats as a Facebook educational post outline with section headers',
  'Reframe the opening line as a Facebook Business Owner post hook',
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function pick<T>(arr: T[], seed: number): T {
  return arr[Math.abs(seed) % arr.length];
}

function hashInputs(inputs: YouTubeInputs): number {
  const str = JSON.stringify(inputs);
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

// ─── Generator ───────────────────────────────────────────────────────────────

export function generateYouTube(inputs: YouTubeInputs, mode: RegenerateMode = 'default'): YouTubeOutput {
  const seed = hashInputs(inputs);
  const pIdx = problemIdx(inputs.mainProblem);

  const titleGroup = TITLES[mode] || TITLES.default;
  const titleArr = pick(titleGroup, seed);
  const thumbnailArr = pick(THUMBNAIL_TEXTS, seed);

  // Route script by problem for maximum relevance
  const scriptOutline = SCRIPT_TEMPLATES[pIdx % SCRIPT_TEMPLATES.length];
  const retentionBeats = RETENTION_BEATS[pIdx % RETENTION_BEATS.length];

  const qualityScore = scoreContent({
    hasPain: true,
    hasFinancialConsequence: pIdx === 0 || pIdx === 2 || pIdx === 3 || pIdx === 7,
    hasOperationalTension: true,
    hasClearCTA: true,
    hasSpecifics: mode === 'specific' || pIdx === 4 || pIdx === 5,
    hasContraryAngle: mode === 'contrarian' || pIdx === 7,
    wordCount: scriptOutline.reduce((a, s) => a + s.content.split(' ').length, 0),
  });

  return {
    title: pick(titleArr, seed + pIdx),
    thumbnailText: pick(thumbnailArr, seed + 1),
    threeSecondHook: pick(THREE_SEC_HOOKS, seed + pIdx),
    openingLine: pick(OPENING_LINES, seed + pIdx + 1),
    scriptOutline,
    retentionBeats,
    businessInsight: BUSINESS_INSIGHTS[pIdx % BUSINESS_INSIGHTS.length],
    cta: pick(CTAS, seed + 3),
    repurposing: REPURPOSING,
    qualityScore,
    improvements: getImprovements(qualityScore),
  };
}
