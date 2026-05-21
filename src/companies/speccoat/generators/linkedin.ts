import type { LinkedInInputs, LinkedInOutput, PostIdea, CalendarDay, RegenerateMode } from '../types';
import { scoreContent, getImprovements } from './scoring';

// ─── Post Ideas ──────────────────────────────────────────────────────────────

const POST_IDEAS: PostIdea[] = [
  {
    title: 'The 10x Cost Rule of Coating Failure',
    angle: 'Field rework and warranty exposure consistently exceed coating investment by a factor of ten — the calculation is never made at the right time',
    rank: 1,
    rankReason: 'Highest pain clarity, direct financial consequence, applies to every audience',
  },
  {
    title: 'Why Acrylic Fails in High-Humidity Environments',
    angle: 'Moisture vapor transmission through acrylic is a material property, not a defect — specifying it for the wrong environment is a design decision with predictable consequences',
    rank: 2,
    rankReason: 'Strong operational tension, concrete failure mechanism, targets engineers and procurement',
  },
  {
    title: 'Surface Preparation Is the Primary Variable in Coating Adhesion',
    angle: 'The coating material is secondary. Ionic contamination on the substrate determines whether the coating adheres or disbonds under field stress.',
    rank: 3,
    rankReason: 'Challenges common assumption, actionable fix, relevant across all industries',
  },
  {
    title: 'Parylene Is Not Expensive. Field Returns Are Expensive.',
    angle: 'Reframes the cost conversation from unit price to lifecycle cost — the facilities that have run the calculation tend to stay with parylene',
    rank: 4,
    rankReason: 'Strong contrarian angle, specific financial claim, high credibility with engineers',
  },
  {
    title: 'Your MIL-SPEC Material Approval Is Not Process Qualification',
    angle: 'Getting a coating material on the QPL and qualifying your coating process are separate requirements — most AS9100 coating audit failures are in the process records, not the material',
    rank: 5,
    rankReason: 'High tension for defense programs, targets compliance risk, generates discussion',
  },
  {
    title: 'Coating Thickness Specification Has Two Failure Modes',
    angle: 'Underthickness leaves conductors unprotected. Overthickness disbonds at component leads. Manual spray coating creates both conditions on the same board.',
    rank: 6,
    rankReason: 'Technical credibility, specific and measurable, strong for quality engineers',
  },
  {
    title: 'The Hidden Cost of Manual Spray Coating',
    angle: 'Operator variability in manual coating creates a defect distribution that automated selective coating eliminates — the economics are measurable',
    rank: 7,
    rankReason: 'Financial impact is concrete, targets operations managers and process engineers',
  },
  {
    title: 'IPC-A-610 Visual Inspection Doesn\'t Catch the Defects That Cause Field Failure',
    angle: 'Acceptance criteria and performance criteria are different standards — passing one does not guarantee the other',
    rank: 8,
    rankReason: 'High credibility with quality engineers, challenges standard practice, generates discussion',
  },
  {
    title: 'Automotive Under-Hood Electronics and the Acrylic Specification Problem',
    angle: 'Acrylic cracks at −40°C and softens above 85°C. Automotive under-hood temperature cycles through both. Silicone is the right answer for a reason.',
    rank: 9,
    rankReason: 'Industry-specific, concrete failure mechanism, high relevance to automotive electronics',
  },
  {
    title: 'The Conformal Coating Specification That Ships With Every PCB',
    angle: 'Most coating specs are inherited from a previous project with different environmental requirements — the specification travels, the environment changes',
    rank: 10,
    rankReason: 'Universally relatable problem, creates urgency to review existing specs',
  },
];

// ─── Problem → content index mapping ────────────────────────────────────────

const PROBLEMS = [
  'moisture', 'surface prep', 'coating material', 'field return', 'thickness',
  'compliance', 'rework', 'parylene', 'contamination', 'thermal',
];

function problemIdx(p: string): number {
  const lower = p.toLowerCase();
  const idx = PROBLEMS.findIndex(k => lower.includes(k));
  return idx >= 0 ? idx : 0;
}

// ─── Hooks ───────────────────────────────────────────────────────────────────

const HOOKS: Record<string, string[]> = {
  default: [
    'Most facilities don\'t lose money when they buy the coating. They lose money 2 years later when it fails early.',
    'The engineer who specified your conformal coating may have never seen the environment it operates in.',
    'Your PCB rework line is not a quality problem. It\'s a coating process problem.',
    'Field failures from conformal coating disbondment don\'t show up in your coating line defect rate.',
    'The most expensive decision in PCB protection is the one made with the least information.',
    'Every conformal coating field return has a paper trail. It starts with the specification, not the assembly line.',
    'The 85/85 humidity test passed. The field deployment failed. The coating specification is the reason.',
    'Your coating process hasn\'t been validated for the environment your customers are shipping into.',
    'The ionic contamination level that causes coating disbondment is invisible and undetectable by IPC-A-610 visual inspection.',
    'Conformal coating decisions get made once. Field returns remind you of that decision for years.',
  ],
  direct: [
    'Coating failure is not a material problem. It\'s a process problem. Here\'s the difference.',
    'If your electronics keep failing in the field, check the coating spec before you check the component.',
    'Your conformal coating is failing early. The surface prep is why.',
    'The rework rate you\'re accepting is not a quality benchmark. It\'s a process problem you can fix.',
    'You have a coating specification. You may not have a coating process. There\'s a difference.',
    'The defect that causes the field return is on the line right now. It\'s just not visible yet.',
    'Moisture under the coating. Corrosion on the traces. The assembly passed every inspection. Here\'s what that means.',
  ],
  executive: [
    'The financial exposure from field-failed electronics typically exceeds coating investment by a factor of ten.',
    'Organizations that make coating selection decisions based on unit price consistently face disproportionate rework costs.',
    'Capital investment in proper coating process qualification eliminates the systemic field return cycle.',
    'The ROI on conformal coating process qualification is among the highest in electronics manufacturing. Most companies discover this after the first field return cycle.',
    'Every field return from a coating-related failure represents a recoverable cost. Recovery starts with the specification.',
    'High-reliability electronics programs budget for field returns as a given. Programs with proper coating specifications don\'t.',
  ],
  contrarian: [
    'The cheapest conformal coating option is rarely the most cost-effective. It just looks that way on the purchase order.',
    'More companies fail MIL-SPEC coating audits because of their process, not their material selection.',
    'Parylene costs more per unit than acrylic. It also eliminates the rework line entirely for the right applications.',
    'Most conformal coating rework doesn\'t happen because the coating was bad. It happens because the process let bad coating through.',
    'Your coating passed IPC-A-610. That inspection was never designed to catch the defects that cause field failure.',
    'The companies that spend the most on conformal coating per unit often spend the least on coating-related rework and warranty.',
    'The 85/85 test is not a field simulation. Companies that treat it like one are measuring confidence, not performance.',
  ],
  shorter: [
    'Wrong coating. Right price. Wrong outcome.',
    'Surface prep fails. Coating disbonds. Field failure. Preventable.',
    'Coating material approval is not process qualification.',
    'The rework line is feedback. Most facilities aren\'t listening.',
    'Field return = specification failure. Not assembly failure.',
    'Cheap coating. Expensive warranty.',
    'The coating spec was inherited. The environment wasn\'t.',
  ],
  specific: [
    'Acrylic conformal coating in a 95% RH environment will absorb moisture. The coating spec you inherited may not account for that.',
    'Parylene deposition at the wrong substrate temperature creates pinholes that pass visual inspection and fail 85/85 humidity testing.',
    'Selective coating machines with ±0.002" repeatability eliminate the operator variability that creates underthickness defects at component leads.',
    'IPC-CC-830 qualification requires 500-hour salt spray testing. MIL-I-46058 requires 240 hours. If your program is defense, verify which standard governs your process before the audit.',
    'ROSE testing at 14.0 μg NaCl equivalent per cm² is the IPC cleanliness threshold before conformal coating. Most manual cleaning processes don\'t consistently meet it.',
    'Silicone conformal coating maintains flexibility from −65°C to 200°C. Acrylic begins to crack below −40°C. Under-hood automotive temperature profiles cycle through both.',
    'The minimum acrylic coating thickness under IPC-CC-830B is 0.001 inch (1.0 mil). The maximum before stress-related disbondment becomes a risk is approximately 5.0 mils. Manual spray coating on populated PCBs routinely produces both in the same batch.',
  ],
};

// ─── Bodies ──────────────────────────────────────────────────────────────────

const BODIES: string[] = [
  // 0 – moisture / humidity
  `Most PCB failures in high-humidity environments aren't caused by component defects.

They're caused by a conformal coating that was specified for cost, not for the environment the assembly operates in.

The coating looked correct on the line. Passed IPC-A-610 visual inspection. Cured properly. Shipped.

Then 18 months later, the field return hits.

Moisture under the coating. Corrosion on the copper traces. Dendritic growth between adjacent conductors at the nearest conductor spacing. The assembly that passed every inspection on the line has now failed in the field.

The root cause traces back to a single decision: acrylic was specified because the previous project used acrylic. The previous project shipped to a climate-controlled facility. This one ships to a coastal industrial plant at 85% ambient humidity.

This is not a manufacturing failure. It's a specification decision that was made once, without environmental analysis, and replicated across every assembly that followed.

The cost of the field return — logistics, rework labor, replacement components, warranty exposure, engineering hours on root cause analysis — is typically 10 to 20 times the cost of the coating itself.

The fix is not expensive. It's a specification change before the next production run.`,

  // 1 – surface prep / adhesion
  `Surface contamination is the leading controllable cause of conformal coating adhesion failure.

Not the coating material. Not the cure schedule. Not the thickness specification.

The surface.

Flux residue from soldering, finger oils from handling, mold release agents from plastic connectors, and processing contamination all prevent proper wetting and adhesion. The coating deposits over the contamination. It looks clean. It cures. It passes visual inspection.

Then three months of thermal cycling in field deployment — or six months in a humid environment — reveals the disbondment. The coating lifts at the component leads exactly where the contamination was highest. Moisture gets underneath. The corrosion starts.

Ionic contamination testing (ROSE, Omegameter, or ion chromatography) identifies contamination levels before they become adhesion failures. IPC specifies 14.0 μg NaCl equivalent per cm² as the cleanliness threshold before coating. Most manual cleaning processes don't consistently hit it.

Plasma treatment before coating application increases surface energy on PTFE connectors, certain housing materials, and any substrate where the coating is expected to adhere over a long deployment cycle.

Most facilities treat both of these steps as optional. The ones with consistently low field return rates from adhesion failures don't.`,

  // 2 – material selection
  `Conformal coating material selection gets made at the wrong stage of the design process — and for the wrong reason.

The decision typically happens during component selection or early BOM review, driven primarily by material unit cost. The operating environment analysis, if it happens at all, comes later.

By the time the first production run ships, the coating material is locked in. If the environment analysis reveals a mismatch, the remediation path is expensive: qualification testing with a new material, process documentation updates, potential customer re-approval.

The correct sequence runs in the opposite direction.

Define the operating environment first: temperature range, humidity levels, chemical exposure, deployment duration, and any regulatory requirements. Each variable constrains the viable material options:

High humidity, long deployment: silicone or parylene.
Chemical exposure, industrial environment: polyurethane or parylene.
High-temperature cycling, automotive: silicone with the correct formulation.
Complex geometry, fine-pitch, or medical implantable: parylene.
Controlled environment, general purpose, cost-sensitive: acrylic.

The material selection that follows from this analysis is defensible, documented, and optimized for the application — not for the RFQ.`,

  // 3 – field returns / disbondment
  `Field returns from conformal coating disbondment follow a predictable pattern.

The assembly passes final inspection. It ships. It performs for months, sometimes years, before the failure mode becomes visible. By then, the production run is complete, the assemblies are in service, and the field return process starts.

The cost breakdown typically looks like this: the coating itself costs $0.15 to $2.50 per assembly depending on material and process. The field return costs $150 to $500 per assembly by the time you account for logistics, return shipping, rework labor, replacement components, engineering analysis time, and warranty reserve adjustments.

The ratio is not an estimate. It's consistent across industries and applications, and it's recoverable — but only at the specification stage, not after the first return arrives.

The most common disbondment root causes, in order: surface contamination before coating, coating material mismatch for the deployment environment, thickness outside the specified range at component leads, and inadequate cure verification.

Each one has a controlled fix. None of them require significant capital investment. All of them require treating the coating process as a controlled process rather than a commodity step.

The programs that make this investment before the first production run eliminate a cost center that otherwise compounds over the product lifecycle.`,

  // 4 – thermal cycling / automotive
  `Automotive under-hood electronics operate in a thermal environment that conformal coating specifications routinely underestimate.

The temperature swing from −40°C on a cold start to 125°C under load creates coefficient of thermal expansion stress between the PCB substrate, component bodies, solder joints, and the coating itself.

Acrylic conformal coating is rigid at low temperatures and softens at elevated temperatures. In a cycling environment, it cracks at the low end and loses adhesion at the high end. The failure mode is not catastrophic — it's a gradual disbondment and cracking pattern that becomes visible under microscopy after cycling testing and becomes a field reliability problem after years of service.

Silicone conformal coating maintains flexibility across the full temperature range. It stays compliant at −65°C and stable at 200°C. For automotive under-hood applications, it's the correct material selection.

The problem is that acrylic is specified first — because it's familiar, it's less expensive, and it was used on the previous program. The environment analysis comes later, usually after the first thermal cycling failure in qualification testing.

The cost of switching materials after the first build includes qualification time, documentation updates, tooling rework if selective coating parameters change, and engineering hours. The material cost differential between acrylic and silicone is a fraction of that.

Integrate the thermal environment analysis before the coating specification is written.`,

  // 5 – compliance / MIL-SPEC
  `Conformal coating on defense electronics programs is a process qualification problem, not a material selection problem.

The approved material list is long. IPC-CC-830 and MIL-I-46058 qualification requirements are established. Getting a material on the QPL is a straightforward process.

What fails AS9100 coating audits is not the material. It's the process records.

No documented cleaning procedure before coating. No ionic contamination test data for the batch. No coating thickness measurement records with acceptance criteria. No cure verification log. No first article inspection documentation for the coating process. No traceability between the applied coating material lot and the serial-numbered assemblies it was applied to.

The AS9100 auditor's job is not to assess whether your coating material is correct. It's to verify that your coating process is controlled, documented, and consistently executable — that what happened on this batch is verifiable, and that the next batch will be done the same way.

Programs that treat conformal coating as a commodity step fail audits on documentation non-conformances, not on material quality.

Programs that treat it as a controlled process, with documented procedures, batch records, and first article data, pass audits and ship on schedule.

The documentation investment is not significant. The consequence of missing it is.`,

  // 6 – thickness specification
  `Conformal coating thickness specification is a range, and both ends of that range are failure modes.

The IPC minimum for acrylic conformal coating is 0.5 mil (0.0127 mm). Below that threshold, dielectric strength is insufficient and conductor traces are not adequately protected from moisture ingress. Underthickness at component leads — where spray-applied coating naturally thins out over component topography — is the most common location for moisture penetration in acrylic-coated assemblies.

The practical maximum before stress-related failures become a risk is approximately 5 mils (0.127 mm). Above that, CTE-driven stress at component leads during thermal cycling creates disbondment. The coating that was supposed to protect the solder joint becomes the mechanism that creates stress at it.

Manual spray coating on a populated PCB routinely creates both conditions on the same board. The flat field areas are overthick. The lead and component underside areas are underthick. The process capability of manual spray coating cannot hold ±0.001 inch on complex topography.

Automated selective coating equipment holds a repeatability of ±0.001 to ±0.002 inch. The thickness defect rate drops to near zero. The rework related to thickness non-conformance is eliminated.

The capital cost of automated selective coating is justified by the rework reduction in most medium-to-high volume applications. The calculation is not complicated. It requires being honest about what the manual process actually produces.`,

  // 7 – rework costs
  `The rework line for conformal coating defects is telling you something about the coating process. Most facilities are not listening to it as a data source.

The typical rework event for a conformal coating defect involves: stripping the existing coating (solvent wash for acrylic, mechanical or laser ablation for silicone or polyurethane), inspecting the substrate for contamination or damage, reapplying the coating to the affected area, re-curing, and re-inspecting. On a complex populated assembly, this takes 15 to 45 minutes per board depending on defect type and coating material.

The cost per rework event, including labor, materials, and opportunity cost, typically runs $8 to $45 per assembly depending on the facility. At a 3% rework rate on a 10,000-unit production run, that's 300 rework events.

The root causes of conformal coating rework defects are preventable: coating voids from surface contamination, thickness non-conformance from manual spray variability, bubbling or fisheye from solvent entrapment, and delamination from inadequate surface energy. Each one is addressable at the process level.

The rework rate is not a quality metric you negotiate down with operators. It's feedback from the coating process that something upstream is not controlled.`,

  // 8 – parylene lifecycle cost
  `Parylene deposition is vapor phase. That's why it works where spray and dip coating don't.

Uniform coverage on complex geometries. No meniscus effects at component leads. No bridging across high-density pin fields. No solvent entrapment. No surface tension effects that leave gaps at underside component features.

The argument against parylene is always the unit cost comparison: acrylic at $0.15 per assembly, parylene at $2.50 per assembly. Parylene loses on unit cost. The decision goes to acrylic.

The comparison rarely includes the rework line defect rate for spray-applied acrylic on complex assemblies (2–6%), the field return rate from moisture penetration through acrylic in high-humidity or long-deployment applications, the engineering hours spent troubleshooting failures that parylene would have prevented, or the warranty reserve required for assemblies with a documented coating-related failure mode.

When those costs are included in the comparison, the crossover point depends on the application, but for long-deployment or high-humidity applications at meaningful volume, parylene frequently wins on total lifecycle cost.

The facilities that have made this calculation honestly tend to stay with parylene for the applications where it's the right material. They stop re-litigating the unit cost comparison every program cycle.`,
];

// ─── Business impacts ─────────────────────────────────────────────────────────

const BUSINESS_IMPACTS: string[] = [
  'Premature coating failure increases field return rates, rework labor costs, and warranty reserve exposure. For medium-to-high volume manufacturers, a 1% field return rate from coating-related failures represents a recoverable cost center that process improvement eliminates.',
  'Coating disbondment from inadequate surface preparation creates undetectable defects that pass line inspection and are discovered in the field — where correction costs an order of magnitude more than it would have on the line.',
  'Incorrect coating material selection for the operating environment is the most common root cause in conformal coating failure analysis. The fix is engineering discipline at specification stage, not additional inspection at end of line.',
  'Defense electronics programs that fail conformal coating process audits under AS9100 or ITAR face re-qualification costs, schedule delays, and potential program suspension. Coating process documentation failures are among the top non-conformances in electronic assembly audits.',
  'Automotive electronics programs that use acrylic conformal coating in thermal cycling environments (−40°C to 125°C) routinely encounter coating cracking and disbondment in qualification testing. Material reselection after the first build costs qualification time and engineering resources that far exceed the material cost differential.',
  'Medical device electronic assemblies that use underthickness conformal coating in long-deployment applications face moisture-related degradation over their operational lifecycle. For Class II and III devices, coating-related field performance issues create FDA audit exposure and potential recall risk.',
  'The rework cost for conformal coating defects — stripping, reapplication, re-cure, re-inspection — runs $8 to $45 per assembly. At a 3% rework rate on 10,000 units, that\'s a recoverable cost center that process improvement addresses directly.',
];

// ─── CTAs ─────────────────────────────────────────────────────────────────────

const CTAS: string[] = [
  'If you\'re seeing field returns with moisture or corrosion damage, the coating specification is the first place to look. SpecCoat reviews coating specifications and processes against operating environment requirements. speccoat.com',
  'Review your coating specification against your operating environment before the next production run. SpecCoat can assess your current process and identify where the exposure is. speccoat.com',
  'If your rework rate from coating defects is above 2%, the process has an addressable root cause. SpecCoat works with manufacturers to identify and close the gap. speccoat.com',
  'Defense or aerospace program coming up for AS9100 or ITAR audit? SpecCoat can review your conformal coating process documentation before the auditor does. speccoat.com',
  'New program specifying conformal coating for an environment you haven\'t deployed into before? SpecCoat can run the environment analysis and material selection before the first build. speccoat.com',
  'If your coating specification hasn\'t been reviewed against the actual operating environment, it should be. Most inherited specs are wrong for at least one variable. speccoat.com',
  'Evaluating parylene against spray-applied alternatives? SpecCoat can run the lifecycle cost comparison for your specific application and volume. speccoat.com',
];

// ─── Content Calendar ────────────────────────────────────────────────────────

const CALENDAR_TOPICS = [
  { topic: 'Coating material selection vs. operating environment', angle: 'Most coating specs are inherited, not engineered from environmental requirements', cta: 'Review your specification' },
  { topic: 'Surface preparation as the primary adhesion variable', angle: 'Coating adhesion failure starts before the coating is applied — at the surface', cta: 'Assess your prep process' },
  { topic: 'The real cost of a conformal coating field return', angle: '10–20x cost ratio: coating investment vs. field rework and warranty exposure', cta: 'Calculate your exposure' },
  { topic: 'Parylene vs. acrylic: the lifecycle cost comparison', angle: 'Unit cost is the wrong comparison for high-humidity or long-deployment applications', cta: 'Request a cost comparison' },
  { topic: 'IPC-CC-830 vs. MIL-I-46058 — which governs your program', angle: 'Standards compliance ≠ coating process qualification — know the difference', cta: 'Understand the gap' },
  { topic: 'Selective coating repeatability and thickness control', angle: 'Manual variability creates thickness defects invisible on the line, visible in the field', cta: 'Review your defect data' },
  { topic: 'Silicone coating for automotive thermal cycling', angle: 'Acrylic cracks at −40°C. Under-hood electronics cycle through that range twice a day.', cta: 'Check your material spec' },
  { topic: 'Plasma treatment for low-surface-energy substrates', angle: 'Optional on the schedule. Mandatory if you need reliable adhesion on PTFE and similar materials.', cta: 'Review your prep protocol' },
  { topic: 'Potting vs. conformal coating — the decision made too late', angle: 'Protection strategy should be determined at schematic stage, not PCB layout', cta: 'Engage early on your program' },
  { topic: 'IPC-A-610 acceptance criteria vs. field performance', angle: 'Visual acceptance is not the same as functional protection — the defects that cause field failures pass visual', cta: 'Review your inspection criteria' },
  { topic: 'Acrylic moisture vapor transmission in high-humidity environments', angle: 'Acrylic absorbs moisture. In a 95% RH environment, this is a material property, not a defect.', cta: 'Review your deployment environment' },
  { topic: 'Conformal coating masking and coverage on populated PCBs', angle: 'Component masking determines coating quality more than material selection on dense assemblies', cta: 'Review your masking specification' },
  { topic: 'AS9100 conformal coating process documentation requirements', angle: 'The audit failure is almost always in the process records — ionic test data, thickness logs, cure verification', cta: 'Assess your documentation' },
  { topic: 'Dielectric strength and coating thickness: the direct relationship', angle: 'Underthickness fails electrical isolation. Overthickness creates disbondment. Both happen in manual spray.', cta: 'Verify your thickness target' },
  { topic: 'Encapsulation and potting for shock and vibration environments', angle: 'Conformal coating is not the right answer for every protection requirement — know when to switch', cta: 'Consult on your application' },
  { topic: 'ITAR and conformal coating compliance for defense electronics', angle: 'Process compliance requirements for coating operations on ITAR-controlled assemblies', cta: 'Review your program requirements' },
  { topic: 'Polyurethane coating for chemical exposure environments', angle: 'Industrial environments with solvent or chemical exposure require a different material selection', cta: 'Review your environment specification' },
  { topic: 'Conformal coating rework — the right and wrong way', angle: 'Solvent rework on cured silicone damages more than the original defect. Method selection matters.', cta: 'Learn proper rework methods' },
  { topic: 'Automated selective coating for fine-pitch, high-density assemblies', angle: 'Manual spray cannot hold the coverage specification that fine-pitch components require', cta: 'Assess your coverage specification' },
  { topic: 'Field failure analysis and coating root cause identification', angle: 'The failure mode in the field tells you exactly what the coating specification missed', cta: 'Submit a failure for analysis' },
  { topic: '85/85 humidity testing vs. field performance correlation', angle: 'The 85/85 test is an accelerated screen, not a field simulation — some failure modes only appear in the field', cta: 'Review your qualification test plan' },
  { topic: 'UV-fluorescent coating and automated optical inspection', angle: 'Fluorescent coatings enable automated coverage inspection — not all materials support this equally', cta: 'Review your inspection capability' },
  { topic: 'Batch traceability for conformal coating processes', angle: 'Material lot traceability is a requirement for aerospace and medical programs — the documentation standard is specific', cta: 'Review your traceability system' },
  { topic: 'First-pass yield and coating process position in the production sequence', angle: 'A coating defect discovered at final inspection costs more to fix than one caught at the coating station', cta: 'Review your inspection sequence' },
  { topic: 'Ionic contamination testing before coating — ROSE and ion chromatography', angle: 'Cleaning validation determines whether the surface is ready to coat — the threshold is measurable', cta: 'Implement ionic contamination testing' },
  { topic: 'Parylene type selection: C, N, D, and HT', angle: 'Parylene type selection is application-specific — the differences in moisture permeability, temperature rating, and chemical resistance are significant', cta: 'Consult on your parylene requirements' },
  { topic: 'Silicone conformal coating in cryogenic and wide-range temperature applications', angle: 'Low-temperature flexibility and high-temperature stability require different silicone formulations', cta: 'Review your temperature specification' },
  { topic: 'Conformal coating process FMEA and risk reduction', angle: 'Most coating process risks are first identified in failure analysis — they should be identified in the FMEA', cta: 'Build your coating process FMEA' },
  { topic: 'Medical device conformal coating and FDA process validation', angle: 'Biocompatibility, process validation, and long-term performance requirements for coating on implantable and life-sustaining electronics', cta: 'Consult on your regulatory requirements' },
  { topic: 'EV battery management electronics and conformal coating thermal conflict', angle: 'Thermal management and moisture protection requirements for BMS assemblies pull in opposite directions — coating selection is part of the thermal design', cta: 'Discuss your BMS coating requirements' },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function pick<T>(arr: T[], seed: number): T {
  return arr[Math.abs(seed) % arr.length];
}

function hashInputs(inputs: LinkedInInputs): number {
  const str = JSON.stringify(inputs);
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

// ─── Generator ───────────────────────────────────────────────────────────────

export function generateLinkedIn(inputs: LinkedInInputs, mode: RegenerateMode = 'default'): LinkedInOutput {
  const seed = hashInputs(inputs);
  const pIdx = problemIdx(inputs.mainProblem);

  const hookPool = HOOKS[mode] || HOOKS.default;
  // Weight hook selection toward the problem — offset by pIdx so different problems produce different hooks
  const hook = pick(hookPool, seed + pIdx);
  // Select body directly by problem index for maximum relevance
  const body = BODIES[pIdx % BODIES.length];
  const businessImpact = pick(BUSINESS_IMPACTS, pIdx + Math.floor(seed / 1000) % 3);
  const cta = pick(CTAS, pIdx + Math.floor(seed / 10000) % 2);

  const calendarDays: CalendarDay[] = CALENDAR_TOPICS.map((t, i) => ({
    day: i + 1,
    topic: t.topic,
    hook: pick(hookPool, seed + i),
    angle: t.angle,
    cta: t.cta,
  }));

  const repurposing = [
    'Convert the hook into a Twitter/X contrarian take or thread opener',
    'Use the business impact section as a YouTube Shorts script (under 60 seconds)',
    'Break the body into a 5–8 slide Instagram carousel with one point per slide',
    'Turn the CTA into a Facebook discussion prompt with a question for operators',
    'Use the top 5 ranked post ideas as a YouTube long-form video outline',
    'Reframe the hook as a Facebook Business Owner post with a decision-framing angle',
  ];

  const qualityScore = scoreContent({
    hasPain: true,
    hasFinancialConsequence: pIdx === 0 || pIdx === 3 || pIdx === 7,
    hasOperationalTension: true,
    hasClearCTA: true,
    hasSpecifics: mode === 'specific' || pIdx === 4 || pIdx === 5,
    hasContraryAngle: mode === 'contrarian',
    wordCount: body.split(' ').length,
  });

  return {
    postIdeas: POST_IDEAS,
    fullPost: { hook, body, businessImpact, cta },
    contentCalendar: calendarDays,
    repurposing,
    qualityScore,
    improvements: getImprovements(qualityScore),
  };
}
