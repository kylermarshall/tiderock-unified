import type { FacebookInputs, FacebookOutput, RegenerateMode } from '../types';
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

// ─── Problem-specific short posts ────────────────────────────────────────────

const PROBLEM_SHORT_POSTS: string[] = [
  // 0 – moisture
  `If your electronics are failing in humid or coastal environments, the first question isn't about the components or the assembly process.

It's about the coating specification.

Acrylic conformal coating has a measurable moisture vapor transmission rate. In a high-humidity deployment, moisture diffuses through the coating over time and accumulates at the substrate. At narrow conductor spacing, the conditions for electrochemical migration — and eventually dendritic growth — are created.

This is a material property, not a defect. The question is whether your specification accounts for the environment the assembly actually ships into.

What operating environments are you specifying coating for?`,

  // 1 – surface prep
  `Most conformal coating field returns trace back to a step that happens before the coating is applied: surface preparation.

Flux residue, finger oils, and mold release agents from plastic connectors all create adhesion barriers on the substrate. The coating deposits over the contamination. It looks correct under inspection. It disbonds under thermal cycling or field humidity stress.

Ionic contamination testing before coating application measures cleanliness against the IPC threshold (14.0 μg NaCl equivalent per cm²). It takes 15 minutes and prevents the adhesion failure mode that produces the most invisible field defects.

Plasma treatment for low-surface-energy substrates — PTFE connectors, certain housing materials — improves adhesion where contamination control alone isn't sufficient.

Are you using ionic contamination testing in your pre-coating process?`,

  // 2 – material selection
  `Conformal coating material selection gets made for the wrong reason: cost.

The correct approach starts with the operating environment — temperature range, humidity levels, chemical exposure, deployment duration — and works backward to the materials that meet those requirements.

A brief guide:

Acrylic: general purpose, controlled environments, moderate humidity. Easy to rework. Lower cost. Not suitable for high-humidity deployments or demanding chemical exposure.

Silicone: wide temperature range, automotive and high-temperature applications. Flexible across −65°C to 200°C. Harder to rework.

Polyurethane: industrial chemical exposure environments. Good abrasion and chemical resistance.

Parylene: vapor deposited, uniform coverage on complex geometries, near-zero rework rate. For high-reliability, long-deployment, or fine-pitch applications where spray-applied coatings leave coverage gaps.

How does your organization make the coating material selection decision?`,

  // 3 – field returns
  `The cost structure of a conformal coating field return is consistent across industries:

Coating cost per assembly: $0.15 to $2.50 depending on material and process.

Field return cost per assembly: $150 to $500 when you include return logistics, rework labor, replacement components, engineering root cause analysis, and warranty reserve adjustments.

The ratio is 10 to 20 times. It's recoverable — but only at the specification stage, before the first production run.

The most common root causes are in the coating specification, not the assembly process: wrong material for the deployment environment, inadequate surface preparation, or coating thickness outside the specified range.

Each one has a controlled fix. The fix doesn't happen on the rework line. It happens when the specification is written.`,

  // 4 – thickness
  `Conformal coating thickness specification is a range with two failure modes, one at each end.

Underthickness (below IPC minimum of 0.5 mil for acrylic): insufficient dielectric protection, moisture penetration at component leads, field corrosion.

Overthickness (above the stress threshold, approximately 5 mils for most acrylics): CTE-driven stress during thermal cycling creates disbondment at component leads.

Manual spray coating on a complex populated PCB creates both conditions on the same board. Open field areas receive 4 to 6 mils. Component leads and underside surfaces receive 0.2 to 0.5 mils. The same spray pass produces both failure modes.

Automated selective coating equipment holds ±0.001 to ±0.002 inch repeatability. Both failure modes are eliminated.

Is your current coating process capable of holding your thickness specification across all features of the assembly?`,

  // 5 – compliance
  `If you manufacture electronics for aerospace, defense, or medical applications, conformal coating compliance is a process qualification requirement, not just a material selection requirement.

What AS9100 and ITAR auditors look for in conformal coating process records:

1. Documented cleaning procedure with ionic contamination test acceptance criteria
2. Batch records showing ionic contamination test results before coating
3. Coating thickness measurement records with actual values vs. drawing requirements
4. Cure verification documentation per the material and process specification
5. Material lot traceability — which lot was applied to which serial-numbered assemblies

The AS9100 auditor's job is to verify that your process is controlled, documented, and consistently executable. Coating material approval is necessary but not sufficient.

What does your conformal coating process documentation look like?`,

  // 6 – rework
  `Your conformal coating rework rate tells you something specific about your process. Most facilities treat it as a cost of doing business. It's actually a data point.

The most common coating rework root causes:
→ Coating voids and fisheye from surface contamination before application
→ Thickness non-conformance from manual spray variability on complex topography
→ Bubbling from solvent entrapment during cure
→ Delamination from inadequate surface energy on difficult substrates

Each one has a measurable root cause. Each one is preventable with a process change.

At a 3% rework rate on a 10,000-unit run: 300 rework events at $8 to $45 each. That's $2,400 to $13,500 per production run from an addressable root cause.

What's your current conformal coating rework rate, and do you know the primary root cause?`,

  // 7 – parylene
  `The parylene vs. acrylic decision is usually made on unit cost. Parylene loses.

Here's what the unit cost comparison misses:

Rework defect rate: Spray-applied acrylic on complex geometries produces 2 to 6% defect rate. Parylene vapor deposition produces near zero.

Field return rate in high-humidity environments: Acrylic's moisture vapor transmission rate creates failure conditions over 12 to 24 months in humid deployments. Parylene's MVTR is 40 to 100 times lower.

Warranty exposure: Long-deployment applications with acrylic carry measurable warranty reserve requirements for moisture-related failures. Parylene doesn't.

For the right applications — complex geometry, long deployment, high humidity, fine pitch — the lifecycle cost model favors parylene at relatively low production volumes.

The unit cost comparison is not the right analysis. Is your organization running the right one?`,

  // 8 – contamination
  `Most conformal coating adhesion failures trace back to ionic contamination on the substrate before coating.

The contamination sources are consistent: flux residue from soldering (especially no-clean processes), finger oils from handling, mold release agents from plastic connectors, and processing residue from earlier manufacturing steps.

Each contaminant creates a boundary layer between the coating and the substrate. The coating adheres to the contamination — not the board. Under field stress, the contamination layer fails. The coating lifts.

IPC specifies 14.0 μg NaCl equivalent per cm² as the cleanliness threshold before coating. Most no-clean soldering processes leave 5 to 20 μg/cm² without a cleaning step. Most facilities don't test.

Ionic contamination testing before coating is a 15-minute process step that eliminates the leading preventable cause of conformal coating field failures.

Are you testing for ionic contamination before coating application?`,

  // 9 – thermal
  `Automotive under-hood electronics need a different conformal coating material than cabin electronics.

The temperature profile is specific: −40°C cold start to 125°C sustained under-hood operating temperature. Thermal cycling between these extremes happens multiple times per day over the vehicle's service life.

Acrylic conformal coating is not designed for this environment. It becomes rigid below −20°C and develops CTE-driven stress cracks under the differential expansion of the PCB laminate, component bodies, and the coating itself. Above 85°C, it softens and loses adhesion.

Silicone conformal coating maintains flexibility across the full automotive temperature range: −65°C to 200°C depending on formulation. It's designed for this environment.

The common mistake is carrying over the coating specification from the previous program — a cabin electronics application — into an under-hood program. The environment changed. The specification didn't.

What temperature range is your current conformal coating specification designed for?`,
];

// ─── Long educational posts ───────────────────────────────────────────────────

const LONG_POSTS: string[] = [
  `Understanding conformal coating field failures: what causes them, what they cost, and how to prevent them.

**Why electronics fail in the field despite passing inspection**

Conformal coating field failures share a common pattern: the assembly passes every inspection on the production line, ships to the customer, and fails months or years into deployment. The failure mode — moisture under the coating, corrosion on the traces, disbondment at component leads — points back to the coating specification, not the assembly process.

**The three root causes that account for most failures**

1. Wrong material for the operating environment. Acrylic is the most commonly specified conformal coating. It's low cost, easy to apply, and easy to rework. It's also not suitable for high-humidity deployments. Acrylic has a measurable moisture vapor transmission rate. In sustained high-humidity environments, moisture diffuses through the coating and accumulates at the substrate. For applications that ship into marine environments, industrial facilities, or outdoor enclosures, acrylic is often the wrong material.

2. Inadequate surface preparation. Ionic contamination from flux residue, handling oils, and mold release agents creates an adhesion barrier on the substrate. The coating deposits over the contamination. It passes visual inspection. It disbonds under field stress — thermal cycling, humidity exposure, or vibration. Ionic contamination testing before coating identifies contamination levels against the IPC threshold of 14.0 μg NaCl equivalent per cm².

3. Coating thickness outside specification. Underthickness at component leads leaves conductor traces with insufficient dielectric protection. Overthickness in flat field areas creates stress concentration at component leads under thermal cycling. Manual spray coating creates both conditions simultaneously on complex, populated PCBs.

**The financial case for getting it right**

Coating cost per assembly: $0.15 to $2.50 depending on material and process. Field return cost per assembly: $150 to $500 when you include logistics, rework, replacement components, engineering time, and warranty exposure. The ratio is 10 to 20 times. For medium-to-high volume programs, a 1% field return rate from coating-related failures represents a significant and recoverable cost center.

**What the fix looks like**

Specify coating material from operating environment requirements, not cost comparison. Validate surface preparation with ionic contamination testing before coating. Qualify coating thickness targets with cross-section analysis. Document the process. Hold it every batch.

SpecCoat works with manufacturers across aerospace, defense, medical, automotive, and industrial applications to close the gap between coating specification and field performance. SpecCoat.com.`,

  `A practical guide to conformal coating material selection for electronics manufacturers.

Conformal coating protects printed circuit boards from moisture, chemicals, temperature extremes, and mechanical stress. When the coating material is matched to the operating environment, assemblies perform reliably over their full service life. When it isn't, the failure mode is predictable — and so is the cost.

**Acrylic (AR)**

Application: general-purpose electronic assemblies in controlled or mildly humid environments. Advantages: lowest cost, easiest to rework (solvent dissolution), good electrical insulation in moderate conditions. Limitations: measurable moisture vapor transmission rate — not suitable for sustained high-humidity deployments (>75% RH over extended periods), limited chemical resistance.

**Silicone (SR)**

Application: high-temperature and wide temperature-range applications — automotive under-hood, industrial, military. Advantages: flexible from −65°C to 200°C, excellent thermal stability, good dielectric properties. Limitations: lower dielectric strength than acrylic, more difficult to rework (requires mechanical or solvent-based removal with specific chemistries), higher cost than acrylic.

**Polyurethane (UR)**

Application: industrial environments with chemical exposure. Advantages: strong chemical and solvent resistance, good abrasion resistance, harder coating surface. Limitations: more difficult to rework than acrylic, requires specific cleaning chemistry, less flexible than silicone at low temperatures.

**Parylene (XY)**

Application: high-reliability, complex geometry, long-deployment, or fine-pitch applications. Types C, N, D, and HT have different properties — parylene C is most commonly used for moisture and chemical resistance, HT for high-temperature applications. Advantages: vapor-deposited, uniform coverage on all exposed surfaces including underside of components, no meniscus effects, no surface tension gaps, near-zero rework defect rate, moisture vapor transmission rate 40–100× lower than spray-applied alternatives. Limitations: higher unit cost, requires specialized deposition equipment, rework is more involved (typically laser ablation).

**How to make the selection**

Define the operating environment first: temperature range (minimum and maximum), humidity level (average and peak), chemical exposure (specific chemicals and concentrations), deployment duration, and any regulatory or program-specific standards (IPC-CC-830, MIL-I-46058, AS9100, FDA).

Match the requirements to the material properties. Where the requirements exceed acrylic's capability, evaluate silicone, polyurethane, or parylene.

Include lifecycle cost in the comparison, not just unit cost. For high-reliability or long-deployment applications, the lower rework rate and field return rate of higher-cost materials often produces a lower total program cost.

SpecCoat.com — coating material selection and specification review.`,

  `Three conformal coating process improvements that reduce field return rates.

If your organization is seeing conformal coating field returns, the root cause is almost always in the specification or process — not in the assembly. Here are three specific improvements that consistently reduce field return rates.

**1. Ionic contamination testing before coating**

What it addresses: adhesion failure from surface contamination — the leading controllable root cause of conformal coating disbondment.

How it works: ionic contamination testing (ROSE test, Omegameter, or ion chromatography) measures the ionic residue on the substrate surface before coating application. IPC specifies 14.0 μg NaCl equivalent per cm² as the cleanliness threshold. Substrates that exceed the threshold are cleaned before coating. Those that pass are coated with a documented cleanliness baseline.

Investment: equipment cost $3,000–8,000 one-time. Process time: 10–15 minutes per batch.

Typical impact: significant reduction in adhesion-related coating defects, elimination of the primary invisible field failure mode.

**2. Coating thickness qualification and process capability study**

What it addresses: thickness non-conformance — underthickness at component leads, overthickness in open field areas.

How it works: destructive cross-section analysis of test coupons coated under production parameters verifies actual thickness distribution across the assembly topography. Process capability study (Cpk) establishes whether the coating process is capable of holding the specification range. If Cpk is below 1.33, the process needs adjustment before it can reliably meet the specification.

Investment: test coupon fabrication and cross-section analysis. One-time for initial qualification, periodic for process monitoring.

Typical impact: eliminates the trial-and-error approach to coating parameter development, identifies thickness non-conformances before they become field failures.

**3. Operating environment analysis before material selection**

What it addresses: material mismatch with the deployment environment — the root cause of moisture-related and thermal cycling field failures.

How it works: define the temperature range, humidity profile, chemical exposure, and deployment duration for the specific application. Map those requirements against the material capability data for each coating type. Select the material that meets all requirements, not the material that's been used before or the material with the lowest unit cost.

Investment: engineering time for the analysis. Typically 4–8 hours for a new program.

Typical impact: eliminates the specification inheritance problem — using a material that was right for the last program in an application with different requirements.

SpecCoat.com — coating specification review, process assessment, and qualification support.`,
];

// ─── Mode-specific short posts ────────────────────────────────────────────────

const MODE_SHORT_POSTS: Record<string, string[]> = {
  contrarian: [
    'The cheapest coating option is rarely the most cost-effective.\n\nUnit cost doesn\'t include rework rate, field return rate, or warranty reserve exposure.\n\nRun the full lifecycle cost comparison before the next specification decision.',

    'Most companies analyze the operating environment for conformal coating selection after the field return.\n\nThe analysis costs the same either way.\nThe timing determines whether it prevents the problem or explains it.',

    'Your coating passed the 85/85 test.\n\nThat test runs at 85°C and 85% RH for up to 1,000 hours. It\'s an accelerated screen, not a field simulation.\n\nIt doesn\'t replicate marine environments, industrial chemical exposure, 10-year deployment cycles, or thermal cycling with mechanical stress.\n\nPassing it gives you data. Not a warranty.',
  ],
  direct: [
    'Three questions to ask about your conformal coating specification:\n\n1. Was the material selected from operating environment requirements, or from a previous project?\n2. Do you test for ionic contamination before coating application?\n3. Has your coating thickness target been validated with cross-section analysis?\n\nIf any answer is uncertain, the specification needs review. SpecCoat.com',

    'If you\'re seeing field returns with moisture or corrosion damage, the coating specification is the first thing to look at.\n\nNot the components. Not the soldering. Not the assembly process.\n\nThe coating spec.\n\nSpecCoat.com — specification review against your operating environment.',
  ],
  executive: [
    'Field returns from conformal coating-related failures cost organizations 10 to 20 times their original coating investment.\n\nThe calculation is rarely made at the specification stage. It should be the first step.\n\nSpecCoat.com — coating process assessment for high-reliability electronics manufacturers.',

    'The organizations with the lowest field return rates from conformal coating failures share one characteristic: they specified their coating material from environmental requirements, not from cost comparison.\n\nThe investment in proper specification pays for itself on the first prevented field return.',
  ],
};

// ─── Discussion prompts ───────────────────────────────────────────────────────

const DISCUSSION_PROMPTS: string[] = [
  'What\'s your biggest challenge with conformal coating consistency across production batches? Is it material, process, or documentation?',
  'Have you seen field failures that traced back to coating specification rather than component or assembly defects? What was the root cause?',
  'How does your organization make conformal coating material selection decisions — by environment analysis, cost comparison, or spec inheritance from previous programs?',
  'What\'s your current process for validating surface preparation before conformal coating? Are you using ionic contamination testing?',
  'Has your organization made the switch from manual spray coating to automated selective coating? What drove the decision, and what was the measurable impact?',
  'For those of you in aerospace or defense manufacturing — what\'s been the most common conformal coating non-conformance in your AS9100 audits?',
  'What\'s the longest deployment cycle you\'re specifying conformal coating for, and how did that affect your material selection?',
];

// ─── Business owner posts ─────────────────────────────────────────────────────

const BUSINESS_OWNER_POSTS: string[] = [
  `If you manufacture electronics for demanding applications — aerospace, defense, medical, or industrial — the protection strategy matters as much as the design.

Field failures from inadequate conformal coating cost 10 to 20 times more than the coating investment. The rework, the warranty claims, the engineering hours, the customer relationship — those costs dwarf the material savings from a lower-cost coating specification.

Most of those failures trace back to a specification that was inherited from a previous program, didn't account for the actual deployment environment, or was never validated against the process that applies it.

SpecCoat works with manufacturers to close that gap before the first production run, not after the first field return.

Review your coating specification at SpecCoat.com.`,

  `Every electronics program that ships into a harsh environment carries conformal coating risk.

The risk is not the environment itself. The risk is the specification — whether the coating material matches the environment it will operate in, whether the surface was properly prepared before coating, and whether the process is documented well enough to be repeated consistently.

Most coating-related field returns trace back to one of these three gaps. Each one is preventable. Each one is addressable before the first assembly ships.

SpecCoat works with manufacturers across aerospace, defense, medical, automotive, and industrial applications to identify and close those gaps.

SpecCoat.com`,

  `The conformal coating step in your PCB assembly process is either protecting your assemblies or creating a field return cycle. There's not much middle ground.

The difference between the two is usually not the coating material. It's the specification, the surface prep process, and the documentation that supports repeatable execution.

Manufacturers that get this right ship assemblies that perform reliably for years. Manufacturers that treat coating as a commodity step fund a recurring rework and warranty cost that compounds over the product lifecycle.

SpecCoat.com — coating specification review and process assessment.`,
];

// ─── Retargeting posts ────────────────────────────────────────────────────────

const RETARGETING_POSTS: string[] = [
  'If you visited SpecCoat.com recently and are evaluating conformal coating options for an upcoming program, we can help you run the environment analysis and select the right material before the first build.\n\nSpecCoat.com — coating specification review.',
  'If you\'re researching conformal coating for a new application or reviewing your current specification, SpecCoat can provide a process assessment that identifies gaps between your current process and your operating environment requirements.\n\nSpecCoat.com',
  'Still evaluating conformal coating options? The material selection decision is the highest-leverage step in the process. SpecCoat can review your operating environment requirements and help you make the right selection before the first production run.\n\nSpecCoat.com',
];

// ─── Practical takeaways ──────────────────────────────────────────────────────

const PRACTICAL_TAKEAWAYS: string[] = [
  'Define your operating environment before selecting a coating material. Temperature, humidity, chemical exposure, and deployment duration all constrain the correct material choice.',
  'Test for ionic contamination before coating. IPC specifies 14.0 μg NaCl equivalent per cm² as the cleanliness threshold. It\'s a 15-minute test that eliminates the leading controllable cause of adhesion failure.',
  'Run a lifecycle cost comparison for coating selection — include rework rate, field return rate, and warranty reserve exposure, not just unit material cost.',
  'Validate your coating thickness target with destructive cross-section analysis before production. Wet film gauge measurements alone don\'t verify coverage on complex component topography.',
  'Plasma treatment for low-surface-energy substrates (PTFE, certain plastics) is not optional if reliable adhesion over the assembly lifecycle is required.',
  'For automotive under-hood applications, the temperature range specification (−40°C to 125°C) rules out acrylic. Silicone is the correct baseline material.',
  'AS9100 coating process records — ionic contamination test data, thickness logs, cure verification, material lot traceability — require the same rigor as any other controlled process in your quality management system.',
];

// ─── CTAs ─────────────────────────────────────────────────────────────────────

const CTAS: string[] = [
  'Review your coating specification against your operating environment requirements. SpecCoat.com.',
  'Contact SpecCoat.com for a coating process assessment.',
  'Visit SpecCoat.com to discuss your application requirements and get your specification reviewed.',
  'If your field return rate from coating-related failures is above 1%, the root cause is addressable. SpecCoat.com.',
  'Upcoming AS9100 or ITAR audit? SpecCoat.com can review your conformal coating process documentation before the auditor does.',
];

const REPURPOSING = [
  'Convert the long educational post into a LinkedIn article series — one section per post',
  'Break the three-mistake format into a Twitter/X thread with one mistake per tweet',
  'Use the practical takeaway as an Instagram carousel last slide with the CTA',
  'Turn the discussion question into a LinkedIn poll with the top four answer options',
  'Use the business owner post as a YouTube Shorts closing CTA',
  'Convert the material selection guide into an Instagram carousel with one material per slide',
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function pick<T>(arr: T[], seed: number): T {
  return arr[Math.abs(seed) % arr.length];
}

function hashInputs(inputs: FacebookInputs): number {
  const str = JSON.stringify(inputs);
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

// ─── Generator ───────────────────────────────────────────────────────────────

export function generateFacebook(inputs: FacebookInputs, mode: RegenerateMode = 'default'): FacebookOutput {
  const seed = hashInputs(inputs);
  const pIdx = problemIdx(inputs.mainProblem);

  const isLong = inputs.contentFormat === 'Longer Educational Post';
  const isDiscussion = inputs.contentFormat === 'Discussion Prompt';
  const isOwner = inputs.contentFormat === 'Business Owner Post';
  const isRetargeting = inputs.contentFormat === 'Retargeting Post';

  const modePool = MODE_SHORT_POSTS[mode] || [];

  let primaryPost: string;
  if (isLong) {
    primaryPost = LONG_POSTS[pIdx % LONG_POSTS.length];
  } else if (isDiscussion) {
    primaryPost = DISCUSSION_PROMPTS[pIdx % DISCUSSION_PROMPTS.length];
  } else if (isOwner) {
    primaryPost = pick(BUSINESS_OWNER_POSTS, seed);
  } else if (isRetargeting) {
    primaryPost = pick(RETARGETING_POSTS, seed);
  } else if (modePool.length > 0 && seed % 3 === 0) {
    primaryPost = pick(modePool, seed);
  } else {
    primaryPost = PROBLEM_SHORT_POSTS[pIdx % PROBLEM_SHORT_POSTS.length];
  }

  const qualityScore = scoreContent({
    hasPain: true,
    hasFinancialConsequence: pIdx === 0 || pIdx === 3 || pIdx === 6 || pIdx === 7 || isLong,
    hasOperationalTension: true,
    hasClearCTA: !isDiscussion,
    hasSpecifics: mode === 'specific' || pIdx >= 4 || isLong,
    hasContraryAngle: mode === 'contrarian',
    wordCount: primaryPost.split(' ').length,
  });

  return {
    primaryPost,
    practicalTakeaway: PRACTICAL_TAKEAWAYS[pIdx % PRACTICAL_TAKEAWAYS.length],
    cta: pick(CTAS, seed + pIdx),
    discussionQuestion: DISCUSSION_PROMPTS[pIdx % DISCUSSION_PROMPTS.length],
    repurposing: REPURPOSING,
    qualityScore,
    improvements: getImprovements(qualityScore),
  };
}
