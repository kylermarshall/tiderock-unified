import type { InstagramInputs, InstagramOutput, RegenerateMode } from '../types';
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

// ─── Visual hooks ─────────────────────────────────────────────────────────────

const VISUAL_HOOKS: Record<string, string[]> = {
  default: [
    'Your conformal coating is quietly driving up your maintenance costs',
    'That PCB passed inspection. It\'s still going to fail in the field.',
    'The rework line isn\'t a quality problem. It\'s a coating specification problem.',
    'The coating looked right. It shipped. 18 months later, the field return arrived.',
    'You spent $0.15 on coating. The field return cost $300.',
  ],
  contrarian: [
    'The cheapest conformal coating is the most expensive decision you\'ll make',
    'Your coating material approval doesn\'t mean your process is qualified',
    'Parylene costs more per unit. It also eliminates the rework line.',
    'The 85/85 test passed. That doesn\'t mean your coating will survive the field.',
    'Your coating spec is right for the last program. Not this one.',
  ],
  direct: [
    'Wrong coating. Right price. Predictable failure.',
    'Surface prep determines coating life. Not the material.',
    'Coating thickness: two failure modes, one spray pass.',
    'Moisture under the coating means the spec was wrong for the environment.',
    'The field return started at the specification stage.',
  ],
  executive: [
    'The 10–20x cost ratio of coating failure vs. coating investment',
    'Lifecycle cost analysis changes the coating selection decision',
    'Field returns are not a quality event. They\'re a specification event.',
    'The ROI on coating process qualification is among the highest in electronics manufacturing.',
    'Organizations that specify coating from environment analysis don\'t fund warranty reserves for it.',
  ],
  shorter: [
    'Wrong coating. Wrong outcome.',
    'Surface prep. Then coating.',
    'Coating spec = field performance.',
    'The rework line is talking. Are you listening?',
    'Field return. Coating failure. Specification problem.',
  ],
  specific: [
    'Acrylic in 95% RH: what\'s actually happening to your PCB',
    'Parylene pinholes: how they form, why they fail',
    '±0.001 inch: the tolerance that determines coating performance',
    'Ionic contamination at 14 μg/cm²: the threshold before coating failure',
    'Acrylic at −40°C: why automotive under-hood electronics crack',
  ],
};

// ─── Problem-specific carousel decks ─────────────────────────────────────────

const CAROUSEL_DECKS: string[][][] = [
  // 0 – moisture / humidity failure
  [
    ['Your electronics are failing in the field', 'Moisture under the coating. Corrosion on the traces.'],
    ['The assembly passed every inspection', 'Visual. Electrical. Functional. All passed.'],
    ['The coating was wrong for the environment', 'Acrylic in a 95% RH deployment. It absorbs moisture.'],
    ['Acrylic has a measurable moisture vapor transmission rate', 'It\'s not a defect. It\'s a material property. Specify accordingly.'],
    ['The spec was copied from the previous program', 'That program shipped to a controlled environment. This one didn\'t.'],
    ['The field return cost 10–20x the coating investment', 'Logistics, rework, engineering time, warranty exposure.'],
    ['The fix is a specification change, not a manufacturing change', 'Right material for the operating environment.'],
    ['Review your coating specification', 'SpecCoat.com'],
  ],

  // 1 – surface prep / adhesion
  [
    ['The coating looks correct. It\'s going to fail.', 'Surface contamination is invisible to visual inspection.'],
    ['What\'s on the surface before coating determines adhesion', 'Flux residue. Finger oils. Mold release agents.'],
    ['Each contaminant prevents proper wetting', 'The coating deposits on the contamination, not the substrate.'],
    ['The adhesion failure happens under field stress', 'Thermal cycling. Humidity. Vibration. The coating lifts.'],
    ['Ionic contamination testing catches it before coating', 'IPC threshold: 14.0 μg NaCl equivalent per cm².'],
    ['Plasma treatment improves adhesion on difficult substrates', 'PTFE connectors, certain housing materials. 90 seconds per panel.'],
    ['Most facilities treat surface prep as optional', 'The ones with low field return rates don\'t.'],
    ['Assess your surface prep process', 'SpecCoat.com'],
  ],

  // 2 – material selection
  [
    ['Four conformal coating materials. Four different applications.', 'Selecting the wrong one has predictable consequences.'],
    ['Acrylic (AR)', 'Low cost. Easy rework. Moderate moisture protection. Not for high-humidity deployments.'],
    ['Silicone (SR)', 'Flexible across wide temperature range. Excellent for automotive and high-temp applications. Harder to rework.'],
    ['Polyurethane (UR)', 'Good chemical and abrasion resistance. Suitable for industrial chemical exposure environments.'],
    ['Parylene (XY)', 'Vapor deposited. Uniform coverage. Near-zero rework rate. For complex geometries, fine pitch, long deployment.'],
    ['Selection starts with the operating environment', 'Temperature. Humidity. Chemical exposure. Deployment duration.'],
    ['The material that\'s cheapest per unit often costs the most per program', 'Run the lifecycle cost comparison, not the unit cost comparison.'],
    ['SpecCoat.com — coating material selection and specification review', ''],
  ],

  // 3 – field returns
  [
    ['A conformal coating field return has a predictable cost structure', ''],
    ['The coating itself: $0.15 to $2.50 per assembly', 'Depending on material and process.'],
    ['The field return: $150 to $500 per assembly', 'Logistics. Rework. Parts. Engineering. Warranty.'],
    ['The ratio is 10–20x. It\'s consistent across industries.', ''],
    ['The root cause is almost always in the specification', 'Wrong material. Inadequate prep. Thickness outside spec.'],
    ['The production run is complete before the first return arrives', 'By then, every assembly has the same root cause.'],
    ['The fix happens at specification stage, not on the rework line', ''],
    ['SpecCoat.com — coating specification review before the next production run', ''],
  ],

  // 4 – thickness specification
  [
    ['Conformal coating thickness specification has two failure modes', ''],
    ['Underthickness: below IPC minimum (0.5 mil for acrylic)', 'Conductors unprotected. Moisture penetrates at leads.'],
    ['Overthickness: above the stress tolerance (5 mils for most acrylics)', 'CTE stress during thermal cycling causes disbondment at component leads.'],
    ['Manual spray coating creates both. On the same board.', 'Open field areas: overthick. Component leads and undersides: underthick.'],
    ['Manual spray cannot hold ±0.001" on complex topography', 'Variability is inherent to the process.'],
    ['Automated selective coating holds ±0.001 to ±0.002"', 'Both failure modes are eliminated.'],
    ['The rework rate from thickness non-conformance drops to near zero', ''],
    ['Assess your coating process capability', 'SpecCoat.com'],
  ],

  // 5 – compliance
  [
    ['AS9100 conformal coating audits fail on documentation, not material', ''],
    ['Your coating material can be QPL-approved and your audit can still fail', ''],
    ['What auditors actually check:', 'Process records, not assembly appearance.'],
    ['No ionic contamination test data for the batch', 'Non-conformance.'],
    ['No thickness measurement records with acceptance criteria', 'Non-conformance.'],
    ['No material lot traceability to serial-numbered assemblies', 'Non-conformance.'],
    ['The fix: treat coating as a controlled process, not a commodity step', 'Document every step. Hold the process every batch.'],
    ['Review your coating process documentation', 'SpecCoat.com'],
  ],

  // 6 – rework costs
  [
    ['Your conformal coating rework rate is costing more than you\'re tracking', ''],
    ['3% rework rate on 10,000 units = 300 rework events', ''],
    ['Each rework event: strip, inspect, recoat, re-cure, re-inspect', '15 to 45 minutes per board.'],
    ['Cost per rework event: $8 to $45', 'Labor, materials, and opportunity cost.'],
    ['300 events × $25 average = $7,500 per production run', 'From a preventable root cause.'],
    ['Root causes: contamination, thickness variability, application drift', 'All controllable. All addressable at the process level.'],
    ['The rework line is feedback. The process is the variable.', ''],
    ['SpecCoat.com — coating process assessment and rework reduction', ''],
  ],

  // 7 – parylene
  [
    ['Parylene vs. acrylic: the unit cost comparison vs. the lifecycle cost comparison', ''],
    ['Unit cost: Acrylic wins', 'Acrylic: $0.15–0.25/assembly. Parylene: $1.50–3.00/assembly.'],
    ['Rework defect rate: Parylene wins', 'Acrylic spray on complex geometries: 2–6%. Parylene vapor deposition: near zero.'],
    ['Field return rate in high-humidity environments: Parylene wins', 'Acrylic absorbs moisture. Parylene\'s MVTR is 40–100x lower.'],
    ['Warranty exposure over 3+ year deployments: Parylene wins', 'Fewer field returns = lower warranty reserve requirements.'],
    ['The crossover point depends on application and volume', 'For the right applications, parylene wins on total cost at 500–5,000 units.'],
    ['Run the right comparison', 'Lifecycle cost, not unit cost.'],
    ['SpecCoat.com — lifecycle cost comparison for your application', ''],
  ],

  // 8 – contamination
  [
    ['Surface contamination is the leading cause of conformal coating adhesion failure', ''],
    ['What\'s contaminating your substrate:', 'Flux residue. Finger oils. Mold release. Processing residue.'],
    ['Each contaminant is invisible to visual inspection', ''],
    ['Each one prevents proper coating-to-substrate adhesion', 'The coating looks correct. It disbonds under field stress.'],
    ['ROSE testing measures ionic contamination', 'IPC threshold: 14.0 μg NaCl equivalent per cm².'],
    ['Most no-clean assemblies exceed the threshold without a cleaning step', 'The spec says "no-clean." The contamination level says otherwise.'],
    ['Ionic testing before coating: 15 minutes. Prevents the field return.', ''],
    ['SpecCoat.com — surface preparation and contamination control', ''],
  ],

  // 9 – thermal cycling
  [
    ['Automotive under-hood electronics and conformal coating', 'The temperature profile that breaks acrylic.'],
    ['Cold start: −40°C. Under load: 125°C.', 'That\'s a 165°C swing. Multiple cycles per day.'],
    ['Acrylic conformal coating at −40°C:', 'Rigid. CTE differential stress exceeds adhesion strength. Cracks.'],
    ['Acrylic conformal coating at 125°C:', 'Softens. Loses adhesion. Disbonds from component leads.'],
    ['Silicone conformal coating:', 'Flexible at −65°C. Stable at 200°C. Designed for this environment.'],
    ['The specification carries over from the previous program', 'That program was a cabin electronics application. Different environment.'],
    ['Change the material specification before qualification testing', 'Not after the first thermal cycling failure.'],
    ['SpecCoat.com — conformal coating material selection for automotive applications', ''],
  ],
];

// ─── Reel scripts ─────────────────────────────────────────────────────────────

const REEL_SCRIPTS: string[] = [
  `[0:00] Hook on screen: "Your coating passed inspection. It's going to fail anyway."

[0:03] Voiceover: Most PCB failures in the field aren't from bad components or poor soldering.

[0:07] They're from a conformal coating that was specified for cost — not for the environment the assembly actually operates in.

[0:13] The sequence looks like this: coating applied, visual inspection passed, assembly shipped.

[0:18] Then the assembly goes into a high-humidity environment. Moisture penetrates through the acrylic over 12 to 18 months. Corrosion starts under the coating. Dendritic growth bridges the conductor spacing.

[0:29] The field return hits. Root cause analysis traces it back to a coating specification that was copied from the previous program — which shipped into a controlled environment.

[0:38] The fix isn't on the assembly line. It's in the specification. Right material for the environment. Surface prep validated with ionic testing. Thickness qualified with cross-section analysis.

[0:48] If you're seeing field returns with moisture or corrosion damage, the specification is where to start.

[0:53] SpecCoat.com — coating specification review and process assessment.`,

  `[0:00] Hook on screen: "Surface prep determines coating life. Not the material."

[0:03] Voiceover: When a conformal coating disbonds in the field, the first assumption is that the material was wrong.

[0:08] It's usually not. The material is often fine. The surface it was applied to is the problem.

[0:13] Flux residue from soldering. Finger oils from handling. Mold release agents from plastic connectors. Each one creates a microscopic barrier between the coating and the substrate.

[0:23] The coating deposits on top of the contamination. It looks correct under visual inspection. It cures properly.

[0:29] Then thermal cycling or field humidity stress reveals the disbondment. The coating lifts exactly where the contamination was highest. Moisture gets underneath. Corrosion begins.

[0:39] Ionic contamination testing before coating takes 15 minutes. It catches contamination levels before they become adhesion failures. IPC specifies 14.0 micrograms per square centimeter as the threshold.

[0:50] Plasma treatment adds 90 seconds per panel for difficult substrates. It eliminates the adhesion failure mode on PTFE and similar low-surface-energy materials.

[0:58] SpecCoat.com — surface preparation and coating adhesion process assessment.`,

  `[0:00] Hook on screen: "The cheapest coating just cost you a field return. Here's the math."

[0:03] Voiceover: Every conformal coating decision involves a cost comparison. Acrylic at 15 cents per assembly. Parylene at two dollars and fifty cents.

[0:10] Acrylic wins the unit cost comparison every time.

[0:13] Here's what the comparison doesn't include. Acrylic rework rate on complex geometries: two to six percent. At twenty dollars per rework event on ten thousand units, that's four thousand to twelve thousand dollars just in rework.

[0:24] Field returns from moisture penetration in high-humidity deployments. Acrylic has a moisture vapor transmission rate that creates failure conditions over 12 to 24 months in humid environments. Parylene's MVTR is forty to a hundred times lower.

[0:37] Warranty exposure over a three-year deployment cycle. Warranty reserve requirements for assemblies with a documented coating-related failure mode.

[0:45] When you include rework, field returns, and warranty in the model, the crossover point where parylene wins on total cost is somewhere between five hundred and five thousand units for the right applications.

[0:55] SpecCoat.com — run the lifecycle cost comparison for your application.`,

  `[0:00] Hook on screen: "Coating thickness specification has two failure modes."

[0:03] Voiceover: The IPC minimum for acrylic conformal coating is 0.5 mil — that's half a thousandth of an inch. Below that, there's not enough material to provide adequate dielectric protection, and moisture can penetrate to the conductor traces.

[0:15] The practical maximum before stress-related failures become a risk is about five mils. Above that, CTE-driven stress during thermal cycling creates disbondment at component leads.

[0:25] Manual spray coating on a complex populated PCB creates both conditions on the same board. Flat field areas receive four to six mils. Component leads and underside surfaces receive point two to point five mils.

[0:36] Underthick at the leads. Overthick in the field. Both failure modes. One spray pass.

[0:42] Automated selective coating equipment holds plus-or-minus one to two thousandths of an inch. The defect rate from thickness non-conformance drops to near zero.

[0:51] If you're seeing thickness-related defects, the process capability is the variable — not the operator.

[0:57] SpecCoat.com — coating process capability assessment.`,
];

// ─── Captions ────────────────────────────────────────────────────────────────

const CAPTIONS: string[] = [
  'Most conformal coating failures are specification failures. The material was selected for cost, not environment. Surface prep was treated as optional. Thickness targets were not validated against process capability. Each one is a preventable decision. Review your specification before the field return reviews it for you. SpecCoat.com',
  'Surface preparation determines coating adhesion. Not the material, not the cure schedule — the surface. Ionic contamination testing and plasma treatment for difficult substrates are the steps that prevent the adhesion failure you can\'t see until the field return arrives. SpecCoat.com',
  'The cost of a conformal coating field return is typically 10 to 20 times the cost of the coating investment. This ratio is consistent across industries. The calculation is rarely made at the specification stage — which is the only stage where it can change the outcome. SpecCoat.com',
  'Parylene costs more per unit than spray-applied alternatives. For high-humidity, long-deployment, or complex geometry applications, it\'s frequently the lower-cost option when you include rework, field returns, and warranty exposure in the comparison. SpecCoat.com — lifecycle cost analysis for coating selection.',
  'AS9100 conformal coating audits fail on process records, not coating appearance. Ionic contamination test data, thickness measurement logs, cure verification, and material lot traceability are what auditors look for. If your process records don\'t support your coating quality claims, the audit will find it. SpecCoat.com',
  'Acrylic conformal coating is not the right material for automotive under-hood electronics. The temperature profile from −40°C cold start to 125°C operating temperature creates CTE differential stress that acrylic cannot accommodate. Silicone is designed for this environment. SpecCoat.com',
  'Conformal coating rework is not a cost of doing business. It\'s feedback from the process. Contamination, thickness variability, and application parameter drift all have controllable root causes. The rework rate is the measurement — the process is the variable. SpecCoat.com',
];

const SUGGESTED_VISUALS: string[][] = [
  [
    'Close-up of corroded PCB traces with moisture damage visible under disbonded coating',
    'Cross-section microscopy showing coating delamination at component lead solder fillet',
    'SEM image of dendritic growth between adjacent conductors under failed coating',
    'Conformal coating application in selective coating machine — nozzle tracking component topography',
    'Side-by-side comparison: field-returned PCB with corrosion vs. properly coated assembly',
  ],
  [
    'UV fluorescent inspection of conformal coating coverage on fully populated PCB',
    'Plasma treatment process on PCB surface — atmospheric plasma system in operation',
    'Ionic contamination testing (Omegameter or ROSE test) on PCB substrate before coating',
    'Conformal coating wet film thickness measurement with calibrated gauge',
    'Cross-section SEM image of parylene coating at component lead — uniform coverage on complex geometry',
  ],
  [
    'Time-lapse of moisture condensation forming under acrylic coating in humidity chamber',
    'Before/after plasma treatment: water contact angle test showing surface energy improvement',
    'Selective coating machine spray nozzle applying coating to populated PCB under inspection camera',
    'Thermal cycling chamber with automotive electronics under test',
    'AS9100 audit documentation — coating batch records, ionic test data, thickness logs',
  ],
];

const REPURPOSING = [
  'Convert carousel slides 1–5 into a LinkedIn post body with hook as the opening line',
  'Use the reel script as a YouTube Shorts script — matches format exactly',
  'Extract the caption as a Facebook short post with discussion question appended',
  'Turn the visual hook into a Twitter/X single post opener',
  'Use slides 4–6 as the basis for a LinkedIn detailed technical post',
  'Convert the reel cost breakdown segment into a Twitter/X contrarian take with numbers',
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function pick<T>(arr: T[], seed: number): T {
  return arr[Math.abs(seed) % arr.length];
}

function hashInputs(inputs: InstagramInputs): number {
  const str = JSON.stringify(inputs);
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

// ─── Generator ───────────────────────────────────────────────────────────────

export function generateInstagram(inputs: InstagramInputs, mode: RegenerateMode = 'default'): InstagramOutput {
  const seed = hashInputs(inputs);
  const pIdx = problemIdx(inputs.mainProblem);

  const hookPool = VISUAL_HOOKS[mode] || VISUAL_HOOKS.default;
  const isReel = inputs.contentFormat === 'Reel Script';
  // Route carousel deck by problem
  const slides = CAROUSEL_DECKS[pIdx % CAROUSEL_DECKS.length];

  const qualityScore = scoreContent({
    hasPain: true,
    hasFinancialConsequence: pIdx === 0 || pIdx === 3 || pIdx === 6 || pIdx === 7,
    hasOperationalTension: true,
    hasClearCTA: true,
    hasSpecifics: mode === 'specific' || pIdx >= 4,
    hasContraryAngle: mode === 'contrarian' || pIdx === 7,
    wordCount: isReel ? 150 : 120,
  });

  return {
    visualHook: pick(hookPool, seed + pIdx),
    onScreenText: slides.map(s => s[0]),
    captionOrScript: isReel
      ? REEL_SCRIPTS[pIdx % REEL_SCRIPTS.length]
      : slides.map((s, i) => `Slide ${i + 1}: ${s[0]}${s[1] ? '\n   → ' + s[1] : ''}`).join('\n\n'),
    caption: CAPTIONS[pIdx % CAPTIONS.length],
    cta: 'Visit SpecCoat.com to review your conformal coating specification and process.',
    suggestedVisuals: pick(SUGGESTED_VISUALS, seed + 1),
    repurposing: REPURPOSING,
    qualityScore,
    improvements: getImprovements(qualityScore),
  };
}
