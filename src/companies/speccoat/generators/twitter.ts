import type { TwitterInputs, TwitterOutput, RegenerateMode } from '../types';
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

// ─── Single posts ─────────────────────────────────────────────────────────────

const SINGLE_POSTS: Record<string, string[]> = {
  default: [
    'Most companies choose conformal coating based on unit price.\n\nThen they spend the next 5 years paying for that decision through field returns, rework, and warranty claims.\n\nThe coating is a line item.\nThe failure is a program cost.\n\nThey\'re measured in different places. They\'re connected.',

    'Your conformal coating passed IPC-A-610 visual inspection.\n\nThat inspection doesn\'t catch:\n→ Underthickness at component leads\n→ Ionic contamination under the coating\n→ Adhesion failure from contaminated substrate\n→ Moisture vapor transmission rate mismatches with the deployment environment\n\nThe defect ships. The field return follows.',

    'Surface prep determines coating adhesion.\n\nNot the material.\nNot the cure schedule.\nNot the application method.\n\nThe surface.\n\nIonic contamination from flux residue, handling oils, and mold release agents creates a barrier between the coating and the substrate.\n\nThe coating adheres to the contamination. The contamination doesn\'t adhere to anything.\n\nField disbondment is the result.',

    'The engineer who specified your conformal coating may have never seen the environment the assembly operates in.\n\nThey saw the environment on the last program. They copied the spec.\n\nThe last program was a controlled environment. This one is a coastal industrial plant.\n\nThe coating spec is wrong. The environment didn\'t change the drawing.',

    'Conformal coating field returns follow a pattern:\n\n→ Coating specified from cost comparison, not environment analysis\n→ Assembly passes line inspection\n→ Ships to high-humidity or harsh chemical environment\n→ Coating absorbs moisture or loses adhesion\n→ Failure appears 12–24 months in\n\nThe production run is complete before the first return arrives.',
  ],

  contrarian: [
    'Unpopular take:\n\nParylene is not expensive.\n\nAcrylic is expensive when you add:\n→ 2–6% spray defect rework rate\n→ Field returns from moisture penetration in humid environments\n→ Engineering hours on failure analysis that wouldn\'t have happened\n→ Warranty reserve for 3-year deployments\n\nThe unit cost comparison is missing 80% of the relevant data.',

    'The companies with the lowest coating costs per unit usually have the highest rework rates.\n\nThey\'re optimizing the wrong metric.\n\nCoating cost is a line item.\nRework and warranty are program costs.\n\nThey don\'t appear in the same column on the same spreadsheet.\nThat\'s the problem.',

    'IPC-CC-830 material approval doesn\'t mean your coating process is qualified.\n\nIt means the material passed a standardized test.\n\nYour process — cleaning, prep, application, cure, inspection — is still the variable.\n\nAnd it\'s the variable that AS9100 auditors care about.',

    'The 85/85 humidity test is not a field simulation.\n\n85°C and 85% RH for 1,000 hours accelerates moisture exposure.\n\nIt doesn\'t replicate:\n→ Thermal cycling\n→ Vibration stress\n→ Chemical exposure\n→ 10-year deployment in a marine environment\n\nPassing it gives you confidence. Not a warranty.',

    'Most conformal coating decisions are made by people who have never seen a field failure analysis report.\n\nThe specification gets written. The material gets approved. The assemblies ship.\n\nThe failure analysis comes later. It\'s thorough. It\'s expensive.\n\nAnd it almost always identifies something that was in the specification.',
  ],

  direct: [
    'If your assemblies are failing in the field with moisture damage, check the coating spec.\n\nNot the components.\nNot the soldering.\nNot the assembly process.\n\nThe coating spec.\n\nThe material, the surface prep process, and the thickness target are all defined there. Any one of them can be the root cause.',

    'Three coating specification failures that cause field returns:\n\n1. Wrong material for the deployment environment\n2. Inadequate surface prep — ionic contamination before coating\n3. Thickness outside spec — underthick at leads, overthick in open field\n\nPick one. It\'s probably the root cause of your current field return.',

    'You can fix a bad coating specification.\n\nYou cannot fix a field return before it ships.\n\nThe decision window is before the first production run. After that, you\'re managing consequences.',

    'Your rework rate from conformal coating defects is feedback.\n\nWhat it\'s telling you:\n→ Surface contamination before coating (voids, fisheye, delamination)\n→ Thickness outside spec (underthick leads, overthick field areas)\n→ Application parameter drift (spray angle, distance, speed)\n\nThe rework line is a process signal. Not a cost of doing business.',
  ],

  executive: [
    'The financial exposure from coating-related field returns typically exceeds coating investment by a factor of 10 to 20.\n\nThis calculation is rarely made at the specification stage.\n\nIt should be the first step.',

    'Coating selection made on unit cost creates downstream warranty exposure that consistently exceeds the initial savings.\n\nLifecycle cost models — including rework rate, field return rate, and warranty reserve — change the decision for most high-reliability applications.',

    'Organizations that invest in conformal coating process qualification reduce field return rates and warranty exposure more reliably than those that invest in end-of-line inspection.\n\nInspection finds defects after they\'re created.\nProcess qualification prevents them.',

    'The ROI on conformal coating process qualification is straightforward:\n\nCost of qualification: one-time engineering and documentation investment.\nCost of the field return cycle it prevents: recurring, program-level, compounding.\n\nThe math is not close.',
  ],

  shorter: [
    'Wrong coating. Right price. Wrong outcome.',
    'Surface prep fails. Coating disbonds. Field failure.\n\nThis sequence is preventable. It starts with the specification.',
    'Coating material approval is not process qualification.\n\nTwo different things. Most programs treat them as the same thing.',
    'The rework line is feedback.\n\nMost facilities aren\'t listening to it as a data source.',
    'Field return = specification failure.\n\nNot assembly failure. Not component failure.\n\nSpecification failure.',
    'Cheap coating. Expensive warranty.\n\nThe math always works out the same way.',
  ],

  specific: [
    'Acrylic conformal coating absorbs moisture in high-humidity environments.\n\nAt 85% RH over a 12-month deployment, the moisture vapor transmission creates conditions for electrochemical migration between conductors at the nearest conductor spacing.\n\nThis is not a defect. It\'s a material property. Specify accordingly.',

    'Parylene deposition at substrate temperatures above the recommended range creates film stress in the deposited coating.\n\nThe result: pinholes that pass UV fluorescent inspection.\nThat fail 85/85 humidity testing at 500 hours.\nThat produce field failures in high-humidity deployments.\n\nDeposition parameters matter as much as material selection.',

    'Selective coating machines with ±0.002" repeatability hold coating thickness specification across fine-pitch component topography.\n\nManual spray coating on the same assembly produces ±0.008" variation.\n\nThat range includes underthickness below the IPC minimum of 0.5 mil.\nAnd overthickness above the practical disbondment threshold of 5 mils.\n\nSometimes in the same spray pass.',

    'ROSE testing at 14.0 μg NaCl equivalent per cm² is the IPC cleanliness threshold before conformal coating application.\n\nSolder paste flux residue from no-clean processes typically leaves 5–20 μg/cm².\n\nWithout a cleaning step, most no-clean assemblies exceed the coating adhesion threshold.\n\nThe coating is applied over contamination. It looks correct. It disbonds.',

    'CTE mismatch between PCB laminate (FR4: 14–17 ppm/°C), component bodies (alumina: 6–7 ppm/°C), and acrylic coating (65–80 ppm/°C) creates differential thermal stress in cycling applications.\n\nAt −40°C, the acrylic wants to contract far more than the substrate.\nThe adhesion can\'t accommodate the differential.\n\nThis is why automotive under-hood electronics don\'t use acrylic.',
  ],
};

// ─── Problem-specific single posts ───────────────────────────────────────────

const PROBLEM_POSTS: string[] = [
  // 0 moisture
  'Acrylic conformal coating in a 95% RH environment absorbs moisture.\n\nThis is a material property, not a defect.\n\nThe question is whether your coating specification accounts for it — or whether it was inherited from a previous program that shipped into a controlled environment.',

  // 1 surface prep
  'Most conformal coating adhesion failures trace back to one root cause:\n\nIonic contamination on the substrate before coating.\n\nFlux residue. Finger oils. Mold release from connectors.\n\nThe coating looks correct. It disbonds under field stress.\n\nIonic testing before coating catches it. Takes 15 minutes. Prevents the field return.',

  // 2 material selection
  'Conformal coating material selection gets made for the wrong reason:\n\nCost.\n\nThe correct sequence:\n\n1. Define operating environment (temperature, humidity, chemical exposure, deployment duration)\n2. Identify which materials meet those requirements\n3. Select from the compliant options\n\nNot the other way around.',

  // 3 field returns
  'The cost structure of a conformal coating field return:\n\n→ Logistics and return shipping: $15–40\n→ Rework labor (15–45 min): $20–60\n→ Replacement components: varies\n→ Engineering root cause analysis: 2–8 hours\n→ Warranty reserve adjustment: program-level\n\nCoating cost: $0.15–2.50 per assembly.\n\nThe ratio is why this matters.',

  // 4 thickness
  'Conformal coating thickness specification has two failure modes:\n\nUnderthickness: conductors unprotected. Moisture penetrates. Failure at 12–24 months.\n\nOverthickness: stress concentration at leads under thermal cycling. Disbondment.\n\nManual spray coating creates both. On the same board. In the same spray pass.',

  // 5 compliance
  'AS9100 conformal coating audit non-conformances are almost never about the material.\n\nThey\'re about the records:\n→ No ionic contamination test data\n→ No thickness measurement log\n→ No cure verification\n→ No material lot traceability\n\nThe auditor doesn\'t care what material you used. They care how you can prove you used it correctly.',

  // 6 rework
  'Your conformal coating rework rate is telling you something.\n\n3% rework rate on 10,000 units = 300 rework events.\n\nAt $8–45 per event: $2,400 to $13,500 per production run.\n\nRoot cause is almost always: surface contamination, thickness outside spec, or application parameter drift.\n\nAll three are fixable. None of them require capital investment to address.',

  // 7 parylene
  'The parylene vs. acrylic unit cost comparison:\n\nAcrylic: $0.15/assembly\nParylene: $2.50/assembly\n\nParylene loses.\n\nThe lifecycle cost comparison (including rework at 3–6%, field returns in humid environments, warranty reserve):\n\nParylene wins for the right applications.\n\nRun the right comparison.',

  // 8 contamination
  'Flux residue from no-clean solder paste leaves 5–20 μg/cm² ionic contamination.\n\nIPC specifies 14.0 μg/cm² as the threshold before conformal coating.\n\nMost no-clean assemblies exceed it without a cleaning step.\n\nThe coating goes on over the contamination.\nIt looks correct.\nIt disbonds in the field.',

  // 9 thermal
  'Under-hood automotive electronics see −40°C on cold start and 125°C under load.\n\nAcrylic conformal coating:\n→ Cracks below −20°C under CTE differential stress\n→ Softens and loses adhesion above 85°C\n\nSilicone conformal coating:\n→ Flexible at −65°C\n→ Stable to 200°C\n\nThe temperature spec should drive the material selection.',
];

// ─── Threads ─────────────────────────────────────────────────────────────────

const THREADS: Record<string, string[][]> = {
  default: [
    [
      'Conformal coating fails early for three reasons. Every time. 🧵',
      '1/ Wrong material for the environment.\n\nAcrylic in high humidity. Polyurethane in thermal cycling without adequate flexibility. Silicone where chemical resistance to specific solvents is required.\n\nThe spec was copied from a previous project. The environment was different.',
      '2/ Inadequate surface preparation.\n\nIonic contamination from flux residue, handling oils, and mold release agents prevents proper wetting and adhesion.\n\nIPC specifies 14.0 μg NaCl equivalent/cm² as the cleanliness threshold before coating.\n\nMost manual cleaning processes don\'t consistently meet it without ionic testing to verify.',
      '3/ Thickness outside specification.\n\nUnderthickness at component leads: dielectric protection below IPC minimum. Moisture penetrates.\nOverthickness in flat field areas: CTE-driven stress during thermal cycling. Disbondment.\n\nManual spray coating on complex topography creates both conditions on the same board.',
      '4/ The field return is the expensive part.\n\nCoating: $0.15–2.50/assembly.\nField return (logistics + rework + engineering + warranty): $150–500/assembly.\n\nThe ratio is consistent. It\'s recoverable. But only at the specification stage.',
      '5/ The fix is not complex.\n\n→ Specify material from environmental requirements, not cost comparison\n→ Validate surface prep with ionic contamination testing\n→ Qualify coating thickness target with cross-section analysis\n→ Document the process. Hold it. Every batch.',
      'If your field returns have coating-related root causes, the specification is where to start.\n\nSpecCoat.com — coating specification review and process assessment.',
    ],
  ],

  contrarian: [
    [
      'The cheapest conformal coating is also the most expensive. Here\'s exactly why. 🧵',
      '1/ What the unit cost comparison includes:\n→ Material cost per liter\n→ Application time\n→ Cure schedule\n\nWhat it doesn\'t include:\n→ Rework defect rate\n→ Field return rate\n→ Warranty exposure\n→ Engineering hours on failure analysis',
      '2/ Acrylic: $0.15/assembly. Spray rework rate on complex geometries: 2–6%.\n\nParylene: $2.50/assembly. Rework rate: near zero.\n\nAt 10,000 units and $20 per rework event:\n→ Acrylic: 200–600 rework events = $4,000–12,000\n→ Parylene: 5–20 rework events = $100–400\n\nAnd that\'s before field returns.',
      '3/ Field returns tell the rest of the story.\n\nAcrylic in a 85% RH environment absorbs moisture over 12–24 months. Field return rate from this failure mode is consistently higher than the coating cost savings.\n\nParylene — vapor deposited, pinhole-free, uniform coverage — doesn\'t have this failure mode.',
      '4/ The procurement decision is made on unit price.\nThe warranty reserve is funded from field return data.\n\nThey\'re never compared in the same spreadsheet.\nThat\'s the structural problem with how coating decisions get made.',
      '5/ This is not an argument to always use parylene.\n\nIt\'s an argument to make the coating decision with complete data:\n→ Operating environment\n→ Deployment duration\n→ Rework defect rate for each option\n→ Field return rate for each option in your environment\n→ Total lifecycle cost',
      'SpecCoat.com — lifecycle cost comparison for conformal coating selection. Run the numbers before the next specification is written.',
    ],
  ],

  direct: [
    [
      'Three coating specification mistakes that cause field failures. No framing. Just the problems and fixes. 🧵',
      '1/ Wrong material.\n\nThe specification doesn\'t match the operating environment.\n\nFix: define temperature range, humidity, chemical exposure, and deployment duration first. Material selection follows from those constraints. Not from the previous project.',
      '2/ Skipped surface prep.\n\nNo ionic contamination testing. No plasma treatment on difficult substrates. Coating goes on over contamination.\n\nFix: ionic testing before every batch — Omegameter, ROSE, or ion chromatography. IPC threshold: 14.0 μg/cm². Plasma treatment for PTFE and similar substrates.',
      '3/ Thickness outside target.\n\nManual spray coating can\'t hold ±0.001" on complex populated PCB topography.\n\nFix: process capability study of your current spray coating process. If it can\'t hold the spec, automated selective coating equipment will.',
      '4/ Each of these is a process decision, not a quality event.\n\nThe defect is built into the process before the first assembly is coated.\n\nThe fix happens at the specification and process level.',
      '5/ The field return is not a surprise.\n\nIt\'s the predictable outcome of a specification that wasn\'t verified against operating requirements.',
      'SpecCoat.com — coating process assessment and specification review.',
    ],
  ],

  executive: [
    [
      'The financial case for investing in conformal coating process qualification. The numbers are consistent. 🧵',
      '1/ Typical coating investment per assembly:\n→ Acrylic: $0.10–0.25\n→ Silicone: $0.30–0.75\n→ Parylene: $1.50–3.00\n\nTypical field return cost per assembly:\n→ Logistics + rework + parts + engineering + warranty: $150–500',
      '2/ At a 1% field return rate on 10,000 units:\n\n→ 100 field return events\n→ At $200 average cost per event: $20,000 in recoverable costs\n\nCoating process qualification investment: typically $5,000–15,000 one-time.\n\nThe ROI is clear. The calculation is almost never made at the right time.',
      '3/ The programs with the lowest field return rates from coating failures share one characteristic:\n\nThey specified the coating material from environmental requirements, not cost comparison.',
      '4/ Process qualification is not a cost center.\n\nIt\'s insurance against the field return cycle — which, once started, creates engineering drain, warranty reserve pressure, and customer relationship risk that compounds over the product lifecycle.',
      '5/ The question is not whether process qualification pays for itself.\n\nThe data is consistent: it does.\n\nThe question is whether you make that investment before the first field return or after.',
      'SpecCoat.com — coating process qualification and specification review for high-reliability electronics manufacturing.',
    ],
  ],

  specific: [
    [
      'What actually happens when acrylic conformal coating operates in 85% RH for 12 months. Technical breakdown. 🧵',
      '1/ Acrylic conformal coating has a measurable moisture vapor transmission rate (MVTR).\n\nTypical MVTR for acrylic: 100–400 g/m²/day at standard conditions.\n\nIn a 85% RH environment, moisture diffuses through the coating continuously. The rate depends on coating thickness and formulation.',
      '2/ Moisture accumulates at the coating-substrate interface over time.\n\nAt low conductor spacing (<0.010"), electrochemical migration can initiate between adjacent traces.\n\nDendritic growth bridges the conductor spacing.\n\nThe failure mode is electrical short or leakage — not a visible coating defect.',
      '3/ IPC-CC-830 humidity resistance testing runs at 40°C, 93% RH for 240 hours.\n\nMIL-I-46058 runs at 35°C, 95% RH for 240 hours.\n\nNeither test runs for 12 months. Neither test simulates the sustained moisture exposure of a real deployment environment.',
      '4/ Silicone conformal coating has a lower MVTR than acrylic: typically 50–200 g/m²/day.\n\nParylene C has an MVTR of approximately 0.08 g/m²/day — one to three orders of magnitude lower than spray-applied coatings.\n\nFor high-humidity, long-deployment applications, the material selection is not a matter of preference.',
      '5/ The specification that uses acrylic for a 10-year deployment in a coastal environment is wrong.\n\nNot based on opinion.\nBased on the moisture vapor transmission rate of the material and the conductor spacing on the PCB.',
      'SpecCoat.com — conformal coating material selection and specification review based on your actual operating environment and deployment requirements.',
    ],
  ],
};

// ─── Alternate hooks ──────────────────────────────────────────────────────────

const ALTERNATE_HOOKS: string[] = [
  'The field return didn\'t start on the assembly line. It started in the coating specification.',
  'Conformal coating failure is a decision problem, not a quality problem.',
  'You\'re measuring coating cost in the wrong place. The real cost shows up in warranty.',
  'The most dangerous conformal coating spec is the one that was right for the last program.',
  'Your coating process hasn\'t changed. The environment it ships into has.',
  'The inspection passes. The coating fails. The inspection wasn\'t measuring what causes failure.',
];

// ─── Engagement questions ─────────────────────────────────────────────────────

const ENGAGEMENT_QUESTIONS: string[] = [
  'What\'s the most common root cause you see in conformal coating field failures?',
  'Do you evaluate conformal coating on unit cost or lifecycle cost? What does your process look like?',
  'What\'s your biggest challenge with conformal coating process consistency across production batches?',
  'Have you made the switch from manual spray to automated selective coating? What drove the decision?',
  'How do you validate surface preparation before coating? Are you using ionic contamination testing?',
  'What\'s the most common coating specification mistake you see on programs coming into your facility?',
];

const REPURPOSING = [
  'Expand thread tweets 2–4 into a single LinkedIn post with the first tweet as the hook',
  'Use each thread point as a separate Instagram story slide',
  'Convert the contrarian take into a YouTube Shorts hook with a cost calculation visual',
  'Turn the thread into a Facebook educational post with headers and a discussion question at the end',
  'Use the engagement question as a LinkedIn poll',
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function pick<T>(arr: T[], seed: number): T {
  return arr[Math.abs(seed) % arr.length];
}

function hashInputs(inputs: TwitterInputs): number {
  const str = JSON.stringify(inputs);
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

// ─── Generator ───────────────────────────────────────────────────────────────

export function generateTwitter(inputs: TwitterInputs, mode: RegenerateMode = 'default'): TwitterOutput {
  const seed = hashInputs(inputs);
  const pIdx = problemIdx(inputs.mainProblem);
  const isThread = inputs.postFormat === 'Thread (5–8 posts)';

  const postPool = SINGLE_POSTS[mode] || SINGLE_POSTS.default;
  const threadPool = THREADS[mode] || THREADS.default;

  // Blend mode pool with problem-specific post for variety
  const mainPost = pIdx < PROBLEM_POSTS.length && seed % 3 !== 0
    ? PROBLEM_POSTS[pIdx]
    : pick(postPool, seed + pIdx);

  const qualityScore = scoreContent({
    hasPain: true,
    hasFinancialConsequence: pIdx === 0 || pIdx === 3 || pIdx === 6 || pIdx === 7,
    hasOperationalTension: true,
    hasClearCTA: true,
    hasSpecifics: mode === 'specific' || pIdx >= 4,
    hasContraryAngle: mode === 'contrarian',
    wordCount: mainPost.split(' ').length,
  });

  return {
    mainPost,
    thread: isThread ? pick(threadPool, seed) : undefined,
    alternateHook: pick(ALTERNATE_HOOKS, seed + pIdx),
    cta: 'Review your coating specification against your operating environment requirements. SpecCoat.com',
    engagementQuestion: pick(ENGAGEMENT_QUESTIONS, seed + 2),
    repurposing: REPURPOSING,
    qualityScore,
    improvements: getImprovements(qualityScore),
  };
}
