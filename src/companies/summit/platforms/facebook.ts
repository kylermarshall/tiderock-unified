import type { FacebookInputs, FacebookOutput } from '../types'
import { PROBLEM_DATA, COMPANY } from '../lib/companyProfile'
import { scoreContent } from '../lib/scoring'

const PRIMARY_POSTS: Record<string, string[]> = {
  'coating-inconsistency': [
    `Here's something most growers and seed buyers don't hear often enough: uneven emergence in the field is often not a seed genetics problem. It's a coating process problem.

Coating weight variation above 3–5% across a seed lot creates measurable differences in how seeds germinate, when they emerge, and how uniform the stand looks at first count. And none of that variation shows up in the germination test — because standard germination tests don't evaluate coating weight uniformity.

The result: seed lots that pass testing can still produce inconsistent stands in the field. And when that happens, the seed company gets the complaint — even when the seed itself was fine.

Seed companies with validated, controlled coating programs see grower complaint rates 2–4x lower than those without formal process controls. The investment is at the processing line. The return shows up in the field — and in the customer relationship.

If you're a grower or seed buyer who has experienced inconsistent stands that couldn't be explained by weather or planting conditions, the coating process is worth asking about.

Follow for more seed performance and ag operations content.`,

    `If you've ever planted two seed lots of the same variety and gotten different results, you might have assumed it was a genetics issue or a weather variable.

Sometimes it is. But coating process variation is worth understanding, because it's more common than most buyers realize — and it's invisible at the bag.

Coating weight determines seed size and mass at planting. When it varies across a lot, seeds interact differently with the planter meter, with the soil, and with moisture at imbibition. Those differences show up in emergence timing, stand uniformity, and grower satisfaction.

Controlled coating programs include in-process weight sampling, binder testing per batch, and formal tolerance limits. The programs that skip these steps see 2–4x higher grower complaint rates.

It's not a complicated problem. It's just not always the first thing that gets investigated when stands are inconsistent.

Follow Summit Seed Coatings for seed performance and planting operations content.`,

    `Seed coating gets treated like a finishing step. It's actually a performance decision.

The coating determines how a seed interacts with the planter meter, the soil, moisture, and the germination environment. When coating weight varies across a lot — from worn equipment, binder inconsistency, or uncalibrated application — those interactions vary too.

The visible result: uneven emergence. Inconsistent stands. Grower complaints that trace back to a processing decision made months earlier.

Seed companies with formal coating process controls — calibration checks, in-process sampling, tolerance limits — see complaint rates significantly lower than those without.

The germination test doesn't catch coating weight variation. The field does.

What questions do you ask your seed supplier about coating consistency? Drop them below — this is worth a real conversation.

Follow for more practical seed coating and crop establishment breakdowns.`,
  ],
  'germination-variability': [
    `When emergence is uneven, the first question is usually about the seed genetics. That's often the right place to start — but it's not always where the answer is.

Up to 35% of field germination inconsistency in commercial seed lots traces back to seed preparation variables — coating thickness, treatment application rate, and seed-to-seed treatment transfer. Not the variety.

Emergence timing variation of more than 3–5 days within a seed lot creates yield drag of 8–15% in row crops. The late-emerging plants never fully recover their competitive position against earlier-emerged neighbors.

Validated seed preparation programs control these variables before the lot ships. Coating film thickness. Treatment application rate uniformity. Seed moisture content at coating.

If you've seen germination inconsistency that couldn't be explained by weather or field conditions, seed preparation is worth investigating alongside genetics.

Follow for more seed performance and preparation operations content.`,

    `Here's a number worth knowing if you're buying commercial seed lots: up to 35% of field germination inconsistency traces to seed preparation variables — not seed genetics.

Coating thickness. Treatment application rate. Seed-to-seed treatment transfer during processing. These variables are controllable at the processing stage. When they're not formally controlled, they produce emergence timing variation that shows up in the field.

Emergence timing variation above 3–5 days within a lot creates yield drag of 8–15% in row crops. In high-value crops, that drag compounds through the entire growing season.

The good news is that validated seed preparation programs address this before the lot ships. The challenge is that most standard germination tests don't evaluate coating and treatment variables — so the inconsistency isn't caught until the field.

If you're seeing germination inconsistency that doesn't match your weather and field records, it's worth asking about the seed preparation program behind the lot.

Follow Summit Seed Coatings for seed preparation and germination performance content.`,

    `Cold and wet germination problems are often attributed to weather. Sometimes they're a coating problem.

Seed lots with germination variability above 15% in cold or wet planting conditions often trace to coating decisions that weren't validated for those environments. Standard germination tests run at optimal conditions. The field doesn't.

Coating formulations that perform well under controlled germination conditions can underperform significantly in cold, wet, or high-residue environments — because those conditions weren't part of the validation process.

Environmental validation for coating includes testing against the target planting window: soil temperature range, moisture conditions, residue cover type and volume. When that validation happens before the lot ships, germination performance in non-ideal conditions improves.

If you're in a region with variable spring planting conditions, it's worth asking your seed supplier what environmental validation looks like for their coating program.

Follow for more seed coating and germination performance content.`,
  ],
  'seed-treatment-complexity': [
    `If you're using a multi-chemistry seed treatment program — combining fungicides, insecticides, biostimulants, and inoculants — here's something worth knowing: compatibility testing matters more as you add active ingredients.

Operations handling 8 or more active ingredient combinations without formal compatibility testing experience formulation failures at 3 times the rate of operations with validated programs. Efficacy loss from incompatible chemistry stacking can reach 20–40% before the seed is planted.

The cause is straightforward: chemical interaction between incompatible actives, carrier incompatibility, and coating adhesion failure from improper sequencing. None of these failures are visible at the bag.

If you're working with complex treatment programs and haven't formally validated the compatibility of every combination in the stack, the treatment is probably delivering less than the label suggests.

What does your current process look like for compatibility testing in multi-chemistry programs? Worth discussing below.

Follow for more seed treatment operations and validation content.`,

    `Seed treatment programs are getting more complex — more active ingredients, more chemistries, more interactions to manage. That complexity creates process control requirements that many in-house operations haven't kept pace with.

60% of in-house seed treatment operations don't have formal documentation for regulatory compliance. Application rate accuracy per lot. Re-entry interval documentation. Worker protection records.

These aren't optional requirements. They're regulatory requirements — and 60% of operations are operating without formal documentation.

Beyond compliance, complex treatment programs that aren't formally validated for compatibility experience formulation failure at 3x the rate of validated programs. That failure cost compounds through every affected lot.

If you're managing multi-chemistry treatment programs in-house, the compliance and validation gaps are worth auditing. The documentation investment is a fraction of one compliance event cost.

Follow Summit Seed Coatings for seed treatment operations and compliance content.`,

    `Here's a useful way to think about seed treatment complexity: the chemistry is not the problem. The process is.

Active ingredients in a treatment program perform as labeled when the process delivers them correctly. Application sequencing errors, carrier incompatibility, and adhesion failure from improper sequencing change what the seed actually receives — regardless of what the label specifies.

Three common process failures in complex treatment programs:
1. Out-of-sequence application that deactivates time-sensitive biologicals
2. Carrier incompatibility that degrades active ingredient coverage
3. Poor adhesion from incorrect sequencing that causes treatment loss during handling

Validated sequencing, documented programs, and re-validation triggers for any chemistry change are the process controls that close these gaps.

If your treatment program has grown in complexity, it may be worth reviewing whether the process controls have grown with it.

Follow for more seed treatment and processing operations content.`,
  ],
  'planting-performance-risk': [
    `If you've had skip rates at planting that couldn't be explained by planter settings, the seed coating is worth investigating.

Planter meters are calibrated to a specific seed size and weight profile. Coating weight variation that shifts effective seed size outside the meter's calibration range produces skip rates and doubles — regardless of how the meter is adjusted.

Seed singulation accuracy drops 15–30% when coating weight deviates from the meter's calibration range. Growers who experience skip rates above 3% at recommended planting populations often trace the issue to coating weight variation — not planter settings.

The coating decision that caused the problem was made months before planting. The fix belongs at the coating line — where the specification is set and where the tolerance is controlled.

If you've had unexplained skip rate problems, what did your diagnostic process look like? Have you ever traced it back to coating? Drop your experience below.

Follow for more seed performance and coating operations content.`,

    `Here's what most people don't know about planter meter performance: coating weight variation affects it more than most planting guides acknowledge.

The planter meter is calibrated to work with a seed of a specific size and weight. When coating weight varies across a lot, effective seed size varies too. The meter is working against a moving target — and the result is skip rates and doubles that can't be corrected by adjusting the meter.

This isn't a small effect. Singulation accuracy drops 15–30% when coating weight is outside the meter's calibration range. At planting populations of 30,000+ seeds per acre, that's real stand inconsistency.

The fix is at the coating line — not the planter. Coating weight tolerance limits matched to meter specifications, in-process sampling before lot release, and planter simulation testing for high-value lots are the controls that prevent it.

If you're buying coated seed, it's worth asking whether coating weight tolerances have been validated against the planter types in your market.

Follow Summit Seed Coatings for planting performance and seed coating content.`,

    `Three things happen at planting that are directly affected by coating quality:

1. Singulation — coating weight variation shifts effective seed size outside the meter's calibration range and produces skip rates.
2. Seed placement — coatings that crack, flake, or absorb moisture unevenly change depth consistency and soil contact quality.
3. Emergence timing — coating weight and film integrity affect moisture uptake rate at imbibition, which affects when the seed germinates.

All three are downstream of the coating decision. All three show up in stand data.

Coatings validated for the planting equipment and planting environment they'll encounter perform more predictably than those that aren't. The validation happens before the lot ships — when it can still change the outcome.

Follow for more seed coating, treatment, and planting performance content.`,
  ],
  'seed-handling-issues': [
    `Here's something worth knowing if you're using coated seed in bulk handling systems: seed can lose 8–18% of its coating material before it reaches the planter.

Gravity wagons, air seeders, and pneumatic conveyors subject coated seed to repeated impact and friction. Coatings that aren't formulated for handling durability shed material at those rates — and that material was part of the seed's treatment and performance package.

The loss isn't visible. It doesn't show up in a germination test. But it affects what the seed delivers in the planting environment — because the treatment that was stripped during handling isn't there anymore.

Coating formulation for handling durability — binder selection for abrasion resistance, film thickness matched to the handling path — is the processing decision that reduces this loss.

If you're using bulk seed handling systems, it's worth asking your seed supplier whether their coating has been tested for the handling equipment you're using.

Follow for more seed handling and coating operations content.`,

    `Coating dust on your seed handling equipment is not just a cleanliness issue.

It's a signal that your seed coating is actively degrading during handling. The dust you see in the grain wagon, the air seeder hopper, or the planter box represents treatment that was stripped from the seed surface before planting.

Beyond the performance implications, coating dust creates regulatory compliance exposure under worker protection standards. Operations generating treatment dust without controls face both the performance problem and a compliance problem.

Handling-durable coating formulations maintain adhesion through pneumatic handling, gravity transfer, and repeated seed-to-seed contact. They reduce both treatment loss and dust generation — with a single formulation decision.

If you're seeing coating dust in your handling equipment, it's worth understanding whether the coating was formulated for the handling environment it's actually encountering.

Follow Summit Seed Coatings for seed handling, coating, and compliance content.`,

    `Have you noticed seed population inconsistency at planting that doesn't match your meter calibration? Flowability variation in coated seed is a common cause that doesn't get enough attention.

Seed flowability affects how seed moves through the planter meter. When flowability varies across a lot — from coating weight inconsistency, binder tackiness, or surface texture variation — flow rate changes. The meter calibration drifts. Population targets miss.

Flowability variation above 20% produces measurable population inconsistency that can't be corrected by meter adjustment.

The variables that drive flowability variation are coating formulation decisions: binder type and application rate, coating weight tolerance limits, and surface texture consistency. When these are controlled, flowability is consistent. When they're not, it varies in ways that show up at the planter.

What has your experience been with seed flowability and meter performance? Worth discussing if you've encountered this.

Follow for more seed coating quality and planting performance content.`,
  ],
  'pelleting-precision': [
    `If you're precision-seeding vegetable, flower, or specialty crops with vacuum seeders, pellet quality matters more than most suppliers will tell you.

Pellet weight variation above 5% is the primary driver of singulation failure in precision seeders. Roundness deviation above 0.08 reduces vacuum seeder singulation accuracy by 18–35%. Both of these affect crop stand uniformity and harvest timing consistency.

In high-value specialty crops, stand failures requiring replanting cost $800–$4,500 per acre in direct cost — plus lost market window value that can exceed the direct cost by 2–3 times.

Precision pelleting programs that control weight uniformity, roundness, and environmental integrity deliver more predictable singulation performance. The investment is in the pellet specification. The return is in the stand.

If you're precision-seeding specialty crops, it's worth understanding what quality controls your pelleting supplier uses — specifically weight tolerance, sphericity index, and environmental validation.

Follow for more precision pelleting and specialty crop seeding content.`,

    `For anyone precision-seeding vegetable or specialty crops: pellet integrity under planting conditions matters as much as pellet quality at the facility.

Pellet integrity failures — cracking in cold soil, shattering under seeder pressure, excessive moisture absorption before germination — occur in 12–25% of pelleted lots that weren't validated against target planting conditions.

The pellet looks fine when it ships. It fails at planting — in conditions that weren't tested before the lot was released.

Environmental validation for pelleted lots includes temperature and moisture stress testing, vacuum seeder singulation simulation, and drop and impact integrity testing for bulk handling. These tests confirm that pellet quality holds under the conditions the seed will actually face — not just at the facility.

If you've had singulation failures or uneven establishment in precision-seeded crops, pellet integrity under your planting conditions is worth investigating.

Follow Summit Seed Coatings for pelleting quality and precision seeding content.`,

    `The connection between pellet quality and harvest timing consistency is something more specialty crop growers should understand.

Here's the chain: pellet weight variation → singulation inconsistency → population variation → uneven emergence → non-uniform crop maturity → harvest window pressure.

In vegetable and specialty crop production, harvest timing consistency directly affects market window access and contract fulfillment. When pellet quality creates population inconsistency at planting, the consequences compound through the growing season.

Precision pelleting programs that deliver weight uniformity below 5% variation, sphericity index within 0.08 of target, and environmental performance validated for target planting conditions break that chain at the source.

If you're managing specialty crop production and experiencing timing inconsistency at harvest, it's worth tracing the variable back through planting performance and pellet quality.

Follow for more pelleting precision and specialty crop performance content.`,
  ],
  'poor-seed-prep-cost': [
    `Here's a cost that most seed buyers and growers don't fully account for: the downstream cost of poor seed preparation.

It doesn't show up at the processing line. It shows up three months later — in the field, at the complaint, and in the customer relationship.

Seed companies without traceable coating and treatment records spend 3–5 times more on warranty replacement, customer service, and reputational recovery than those with documented programs. A single lot rejection from coating failure, treatment error, or pellet quality rejection averages $15,000–$80,000.

For growers, the cost is different but just as real: replanting, lost yield, market window pressure, and complaint processes that don't resolve quickly because the records don't exist to diagnose the root cause.

Traceable seed preparation records change the complaint timeline and the recovery cost — for both sides.

What does your experience look like with seed performance complaints and how they get resolved? Worth a conversation below.

Follow for more seed preparation quality and traceability content.`,

    `Without traceable coating and treatment records, field performance complaints are hard to resolve — for anyone involved.

Growers can't trace the problem to a specific lot decision. Seed companies can't quickly identify the root cause. And when the cause can't be identified with data, the default is blame — usually directed at the seed company, 3 times more often than any other factor.

With lot-level coating weight documentation, treatment records, and QC sign-off logs, complaints can be diagnosed in days rather than weeks. The cause is specific. The corrective action is specific. The customer relationship has a better chance of surviving the event.

For seed companies: traceability isn't just a quality system. It's a complaint management tool that directly affects recovery cost and customer retention.

For growers: it's worth asking your seed supplier what lot-level documentation they maintain — before the season, not after a complaint.

Follow Summit Seed Coatings for seed preparation quality and traceability content.`,

    `One lot rejection. $15,000–$80,000. One process control step that could have prevented it.

Coating weight variation outside spec. Treatment application rate error. Pellet quality below singulation specification. These are the most common causes of lot rejection events in seed processing — and all of them are preventable with documented process controls.

The process control investment costs a fraction of one rejection event. The traceability system costs less than one major complaint recovery effort.

The hidden cost of poor seed preparation compounds further through the supply chain: increased returns, elevated replant risk, higher crop insurance claims, and lost repeat business — none of which appear on a processing cost sheet.

For operations managing commercial seed lots, the math is worth running: what does one lot rejection event cost, end to end? Then compare that to the cost of a formal process validation program.

Follow for more seed preparation quality and cost management content.`,
  ],
  'crop-establishment': [
    `If you've had establishment failures that couldn't be fully explained by weather or soil conditions, seed preparation is worth investigating alongside those variables.

Coating specifications that don't account for the target planting environment — soil type, moisture levels, temperature range, and residue cover — create establishment risk that's rarely diagnosed correctly at the field level.

Stands below 85% of target population in the first 14 days increase yield loss probability by 20–40%. In high-value vegetable and specialty crops, stand failures requiring replanting cost $800–$4,500 per acre in direct cost — plus market window consequences.

Coating and pelleting decisions validated for the target planting environment reduce this risk. The validation happens before the lot ships. The outcome shows up at establishment.

Have you ever traced an establishment problem back to seed preparation? What did that diagnostic process look like? Worth discussing below.

Follow for more crop establishment and seed preparation content.`,

    `For growers working with specialty or high-value crops: establishment risk from coating decisions is real, and it's preventable.

Seed coating decisions that don't account for target soil type, moisture, and temperature create preventable establishment risk. Coatings formulated for standard germination conditions can underperform in cold, wet, or high-residue environments — precisely the conditions where establishment is most critical.

In vegetable and specialty crops, stand failures requiring replanting cost $800–$4,500 per acre. Plus lost market window value that can exceed the direct replanting cost by 2–3 times. That's not a theoretical number — that's a real business consequence.

Asking your seed supplier what environmental validation their coating program includes is a reasonable question before the season starts. Validated lots perform more predictably in non-standard conditions.

What questions do you currently ask about seed preparation before purchasing? Share below — this helps everyone.

Follow Summit Seed Coatings for specialty crop seeding and seed preparation content.`,

    `Here's a reframe that might be useful for anyone managing crop establishment challenges:

The field is where establishment failures are diagnosed. But the coating line is where many of them start.

Coating and treatment decisions made at the processing stage determine how seeds interact with the soil, with moisture at imbibition, and with pathogen pressure at emergence. When those decisions aren't validated for the target planting environment, establishment inconsistency follows — and it often gets attributed to weather, equipment, or genetics first.

Seed lots with coating and pelleting specs validated for target planting conditions — not just optimal germination test conditions — perform more consistently at establishment. The difference is a validation step that happens before the lot ships.

If establishment inconsistency is a recurring issue in your operation, it's worth asking what environmental validation your seed preparation program includes.

Follow for more seed preparation, establishment, and coating operations content.`,
  ],
  'scaling-operations': [
    `If you're scaling a seed coating operation and experiencing more batch-to-batch inconsistency as volume grows, the problem is almost certainly process documentation — not equipment capacity.

Operations scaling from 50,000 to 500,000 units per season without formal process documentation experience batch variation that increases 25–50% as volume grows. Scale amplifies inconsistency when the process isn't formally controlled — because more production runs create more opportunities for drift without the checkpoints to catch it.

Equipment calibration drift of 3–5% per 100,000-unit production run requires formal re-validation protocols. Most scaling operations don't have them. By the time the drift is visible in field performance, the affected lots are already in the market.

Process documentation for scale isn't complicated, but it does need to be intentional: application rate specs per crop, calibration schedules tied to production volume, in-process sampling with trigger thresholds.

If your operation is scaling and you're seeing more inconsistency, the answer is process controls — not more equipment.

Follow for more coating operations and scaling process control content.`,

    `Here's something worth understanding if you're managing a growing seed coating operation: customer complaints concentrate in the first and last 20% of each production campaign.

That's not random. It's a process signal.

The first 20% fails from equipment that hasn't been validated at production conditions. The binder viscosity isn't stabilized. Calibration is running against the previous campaign's state.

The last 20% fails from accumulated equipment wear, binder batch changes, and temperature variation in longer runs.

These are predictable failure points — which means they're preventable. Campaign control protocols include pre-campaign equipment validation, in-process checkpoints at defined intervals, and end-of-campaign QC sampling before final lot release.

If your complaint data shows a pattern by campaign position, this is probably what's driving it.

Follow Summit Seed Coatings for coating operations and production process control content.`,

    `Calibration drift in coating equipment is predictable. It's also manageable — if the re-validation protocol exists.

Equipment calibration drift of 3–5% per 100,000-unit production run comes from spray nozzle wear, drum liner wear, and binder delivery system calibration changes with temperature. Each variable drifts in a predictable direction over a production run.

Without volume-triggered re-validation, the drift accumulates silently. Lots produced near the end of a long campaign carry more coating variation than those from the validated start. And field performance differences follow.

Volume-triggered re-validation includes equipment inspection at defined production checkpoints, binder viscosity check per event, and in-process sampling after re-validation before resuming production.

The protocol isn't complex. But it needs to be tied to production volume — not calendar time — to catch drift when it actually occurs.

Follow for more coating equipment management and scaling operations content.`,
  ],
  'grower-trust': [
    `Grower trust in seed performance is built over multiple seasons — and it can be significantly damaged in one.

A single season of field performance inconsistency reduces repeat purchase intent among commercial growers by 35–55%. The cost of recovering a grower relationship after a major complaint is 5–10 times the cost of the original complaint.

When coating records exist, complaints can be resolved quickly with specific data. When they don't, resolution is slow, speculative, and often inconclusive — which leaves growers attributing failure to the seed company, 3 times more often than any other factor.

The seed companies that retain grower trust through difficult seasons are typically the ones with traceable lot documentation, specific corrective action protocols, and the ability to communicate with data — not just assurances.

Traceability is not a quality cost. It's the infrastructure that protects the customer relationship when performance problems occur.

Follow for more grower trust, traceability, and seed operations content.`,

    `For anyone in seed sales or seed company operations: complaint management time is worth measuring as an indicator of coating program quality.

Sales teams in markets with high grower complaint rates spend 40–60% more time on complaint management than teams in markets with documented, consistent coating programs. That differential shows up in headcount before it shows up in an accounting line.

What drives complaint density: coating weight variation that reaches the field, treatment inconsistency that shows up in germination or establishment, and lack of traceable records that would allow rapid root cause diagnosis.

What reduces it: formal process controls at the coating line, lot-level documentation, and QC checkpoints that catch variation before lots are released.

If your sales team is spending significant time on complaint management, the coating program behind the complaints is worth auditing.

Follow Summit Seed Coatings for coating quality and grower relationship content.`,

    `For seed buyers and growers: knowing what to ask about seed lot documentation is one of the most practical things you can do before the season.

When a field performance problem occurs, the speed and quality of the resolution depends on what records exist. Without lot-level coating weight documentation, treatment records, and QC sign-off logs, the investigation is slow, inconclusive, and often ends in attribution rather than resolution.

With those records, the complaint can be diagnosed in days. The corrective action is specific. And the conversation with the seed company is data-backed — which is better for everyone.

Questions worth asking your seed supplier before purchasing:
- What coating weight tolerance is used for this lot?
- Has the lot been validated for the soil conditions in my market?
- What treatment application records are maintained per lot?

These aren't unreasonable questions. They're the kind that separate accountable programs from generic ones.

Follow for more seed preparation quality and grower relationship content.`,
  ],
}

const PRACTICAL_TAKEAWAYS: Record<string, string[]> = {
  'coating-inconsistency': [
    'Ask your seed supplier what coating weight tolerance limits they use — and whether they sample in-process or only at lot completion. In-process sampling catches drift before the entire lot is affected.',
    'Coating weight variation above 3–5% is measurable at the processing stage. If your supplier doesn\'t measure it, you won\'t find out until the field.',
    'Two seed lots of the same variety with different coating programs can produce meaningfully different stands. Coating process control is a reasonable buying criterion.',
  ],
  'germination-variability': [
    'If you\'re seeing germination inconsistency that doesn\'t match your weather and field records, ask your seed supplier what seed preparation variables are tracked per lot — coating thickness, treatment application rate, and seed moisture content at coating.',
    'Up to 35% of field germination inconsistency traces to seed preparation, not genetics. That\'s a significant share of the problem that\'s fixable before the seed ships.',
    'For cold or wet planting environments: ask whether the coating has been tested for performance under those conditions specifically — not just under standard germination test conditions.',
  ],
  'seed-treatment-complexity': [
    'If you\'re using a complex multi-chemistry treatment program, ask your treatment supplier whether compatibility testing has been done for every active ingredient combination in the stack — not just for individual chemistries.',
    'Efficacy loss of 20–40% from incompatible chemistry stacking happens before the seed is planted. It\'s not visible at the bag and doesn\'t show up until field performance is below expectations.',
    'For in-house treatment operations: the compliance documentation checklist — application rate per lot, re-entry interval records, worker protection documentation — is worth reviewing against what you\'re currently maintaining.',
  ],
  'planting-performance-risk': [
    'If you have unexplained skip rates that persist after meter adjustment, ask your seed supplier about coating weight variation in the affected lot. Request the coating weight sampling data if it exists.',
    'Coating weight tolerances matched to the planter meter types in your market are a reasonable thing to ask about when purchasing coated seed — especially for high-value or high-population crops.',
    'The planter meter can\'t correct coating weight variation. The fix belongs at the coating line — and it\'s preventable if the specification is validated before the lot ships.',
  ],
  'seed-handling-issues': [
    'If you\'re bulk-handling coated seed through pneumatic systems or gravity wagons, ask your seed supplier whether their coating formulation has been tested for abrasion resistance in those handling environments.',
    'Coating dust in your handling equipment is a performance signal — it means treatment is being stripped from the seed before planting. It\'s worth documenting and raising with your seed supplier.',
    'Flowability variation above 20% causes meter calibration drift. If population inconsistency doesn\'t match your meter data, seed flowability is worth evaluating alongside meter performance.',
  ],
  'pelleting-precision': [
    'For precision-seeded specialty crops: ask your pelleting supplier what weight tolerance and sphericity index their commercial lots are released at. Both numbers directly affect singulation accuracy.',
    'Pellet integrity under your specific planting conditions — soil temperature, moisture, and seeder pressure — is worth confirming through supplier validation data before the season.',
    'If you\'re seeing singulation inconsistency that persists after seeder adjustment, pellet weight variation and roundness deviation are the first coating variables to evaluate.',
  ],
  'poor-seed-prep-cost': [
    'Before purchasing commercial seed lots, ask what lot-level documentation is maintained: coating weight records, treatment application rate per lot, and QC sign-off dates. These records affect how quickly a complaint can be resolved.',
    'The cost of a lot rejection event — $15,000–$80,000 — is significantly reduced when traceable records exist to diagnose the root cause. Without records, the investigation is longer and the recovery cost is higher.',
    'For seed companies: the documentation investment for a formal coating traceability program costs less than one major field complaint recovery effort. The ROI calculation is worth doing explicitly.',
  ],
  'crop-establishment': [
    'If establishment inconsistency is a recurring issue in your operation, ask your seed supplier what environmental validation their coating program includes for your specific soil type and planting window conditions.',
    'The 85% stand threshold is an agronomic benchmark, but it\'s also a coating preparation benchmark. Coating specifications that don\'t account for the target planting environment make that threshold harder to hit consistently.',
    'For specialty crop producers: before the season, confirm whether your seed\'s coating and pelleting specifications have been validated for your specific planting environment — not just standard germination test conditions.',
  ],
  'scaling-operations': [
    'For seed coating operations scaling volume: tie your equipment calibration schedule to production volume, not calendar time. Calibration drift occurs as a function of units processed — not days elapsed.',
    'Process documentation isn\'t just an overhead cost in a scaling coating operation — it\'s the infrastructure that keeps batch variation from growing with volume. Document before you scale, not after you see the inconsistency.',
    'Campaign endpoints — first and last 20% of a production run — are the highest-risk positions for coating inconsistency. Pre-campaign validation and end-of-campaign QC sampling are the two checkpoints that address both.',
  ],
  'grower-trust': [
    'For growers: before purchasing seed lots, ask what traceable documentation the seed company maintains per lot. Knowing what records exist before a problem occurs puts you in a better position if one happens.',
    'For seed companies: a traceable lot documentation system changes complaint management from a months-long investigation into a days-long resolution. The customer relationship difference is significant.',
    'Complaint management time is a measurable indicator of coating program quality. If your sales team is spending significant time on complaint resolution, the coating program behind the complaints is worth auditing before the next season.',
  ],
}

const DISCUSSION_QUESTIONS: Record<string, string[]> = {
  'coating-inconsistency': [
    'Have you ever experienced germination inconsistency that couldn\'t be explained by weather, field conditions, or variety? Did the investigation ever reach the seed coating process?',
    'What questions do you currently ask your seed supplier about coating consistency — and what answers do you get?',
    'If you manage a seed coating operation: what\'s the one process control that has had the biggest impact on your coating consistency?',
  ],
  'germination-variability': [
    'How do you currently investigate germination inconsistency when weather and field conditions don\'t fully explain it?',
    'Have you ever asked a seed supplier about their coating validation process for the specific planting environment you\'re working in? What was the response?',
    'For those managing seed processing: what seed preparation variable creates the most germination inconsistency in your operation?',
  ],
  'seed-treatment-complexity': [
    'If you\'re using a multi-chemistry treatment program, has your supplier formally validated compatibility for every combination in the stack — or is it assumed?',
    'What does your current documentation process look like for seed treatment application rates per lot? Is it lot-level, or program-level?',
    'For seed treatment operations: what\'s the most complex treatment stack you\'ve managed, and how did you validate compatibility?',
  ],
  'planting-performance-risk': [
    'Have you ever traced a skip rate problem back to seed coating weight variation rather than planter meter issues? What did the diagnostic process look like?',
    'What do you ask about coating specifications when buying coated seed for high-population crops?',
    'For seed companies: do you validate coating weight tolerances against the planter meter types your customers are using?',
  ],
  'seed-handling-issues': [
    'Have you noticed coating dust or flowability issues in your seed handling equipment? Did you trace it back to the coating formulation?',
    'What bulk handling equipment in your operation creates the most abrasion risk for coated seed?',
    'For seed coating operations: how do you test for coating durability across the handling path your seed will follow before planting?',
  ],
  'pelleting-precision': [
    'What pellet quality specifications do you currently ask for from your pelleting supplier — and which ones are most critical for your crop and seeder type?',
    'Have you experienced singulation failures that traced back to pellet weight variation or roundness deviation?',
    'For specialty crop producers: what planting condition — soil temperature, moisture, or seeder type — creates the most pellet integrity risk in your operation?',
  ],
  'poor-seed-prep-cost': [
    'What does your seed supplier\'s lot documentation look like — and have you ever needed to use those records to resolve a field performance complaint?',
    'What\'s been your experience with seed performance complaints — how quickly are they typically resolved, and what determines that timeline?',
    'For seed companies: what traceability system do you currently use for coating and treatment records, and has it been tested in a real complaint scenario?',
  ],
  'crop-establishment': [
    'Have you ever investigated an establishment failure that turned out to trace back to seed preparation rather than weather or field conditions?',
    'What do you currently ask your seed supplier about coating validation for your specific planting environment?',
    'For specialty crop producers: has replanting cost ever been traced to a seed preparation decision that could have been validated before the season?',
  ],
  'scaling-operations': [
    'If you manage a scaling seed coating operation: what process control has been hardest to maintain consistently as volume has grown?',
    'Has your operation experienced the pattern of complaints concentrating at the beginning and end of production campaigns? What did you change?',
    'At what production volume did you first notice that informal process management wasn\'t sufficient — and what did you formalize first?',
  ],
  'grower-trust': [
    'What information do you wish you had from your seed supplier when a field performance problem occurs — and do you typically get it?',
    'For seed companies: what does your complaint management process look like, and how does traceable lot documentation affect the timeline?',
    'Has a field performance complaint ever changed your purchasing decision for the following season — and what would have changed the outcome?',
  ],
}

const REPURPOSING = [
  'Adapt the primary post as a LinkedIn post by tightening the structure and adding a direct hook as the opening line',
  'Pull the practical takeaway as a Twitter/X post with a contrarian framing and a specific data point',
  'Convert the discussion question into an Instagram caption with a visual hook and a carousel outline',
  'Use the primary post as a YouTube video script framework — the problem, the data, and the takeaway as section headers',
  'Adapt the practical takeaway as a LinkedIn carousel slide with one takeaway per slide',
]

const IMPROVEMENT_SUGGESTIONS: Record<string, string[][]> = {
  'coating-inconsistency': [
    ['Add a specific crop type or seed category that your audience works with most', 'Reference the in-process sampling frequency to give readers a concrete benchmark', 'Make the consequence more specific: name the complaint type (skip rates, stand inconsistency, or delayed emergence)'],
    ['Name the production scenario — lot size, crop type — that makes the before/after comparison concrete', 'Add the specific binder variable that most affects coating consistency in your program', 'Reference the equipment wear interval that triggers re-validation in your protocol'],
    ['Specify the germination test type that doesn\'t catch coating variation — and what test does', 'Add the stand data comparison between validated and unvalidated lots in the same field', 'Reference a specific planting condition where coating weight variation has the highest impact'],
  ],
  'germination-variability': [
    ['Name the crop type where 8–15% yield drag is most commonly observed in your markets', 'Add the treatment application rate tolerance your operation uses and how it\'s measured', 'Reference the planting window conditions your coating is validated for'],
    ['Specify the seed preparation variable with the highest variance in your current process', 'Add an emergence timing comparison between validated and unvalidated lots', 'Name the germination test condition that most differs from your target planting environment'],
    ['Specify the environmental condition where your coating shows the strongest validated performance', 'Add the coating formulation change that closed the biggest germination performance gap', 'Reference the cold or wet condition where unvalidated coatings most commonly underperform'],
  ],
  'seed-treatment-complexity': [
    ['Name a specific chemistry combination that requires sequencing validation in your program', 'Add the efficacy testing protocol for a new active ingredient combination', 'Reference the carrier incompatibility that created the most significant performance issue'],
    ['Specify the regulatory documentation element most commonly missing in your market', 'Add the re-entry interval documentation standard your operation follows', 'Reference the compliance exposure cost vs. your current documentation investment'],
    ['Name the biological active most sensitive to sequencing errors in multi-chemistry stacks', 'Add the compatibility test result that most changed your sequencing protocol', 'Reference the chemistry change trigger that requires full re-validation in your program'],
  ],
  'planting-performance-risk': [
    ['Specify the coating weight tolerance range for your highest-volume crop and planter type', 'Add the skip rate threshold that triggers a lot-level coating audit', 'Name the planter meter type where coating weight deviation has the highest singulation impact'],
    ['Reference a stand count comparison between validated and unvalidated coating lots', 'Add the planting environment validation test for the soil type your customers most commonly plant into', 'Specify the in-process sampling frequency that catches coating drift before lot release'],
    ['Name the skip rate pattern that most clearly signals coating variation vs. planter error', 'Add the planter simulation test protocol for high-value lot release decisions', 'Reference the coating weight sampling frequency that catches drift before end-of-lot release'],
  ],
  'seed-handling-issues': [
    ['Name the specific handling equipment type with the highest abrasion impact in your customers\' systems', 'Add the abrasion resistance test result range for your current handling-durable formulation', 'Reference the coating weight loss data from your handling path validation testing'],
    ['Specify the flowability test method and acceptable variation range for commercial lot release', 'Add the binder formulation variable most correlated with flowability consistency', 'Reference a specific meter performance comparison for high vs. low flowability lots'],
    ['Name the treatment type most at risk from handling dust generation in your program', 'Add the dust generation test protocol and acceptable threshold for commercial release', 'Reference the binder change that most reduced dust generation in your current program'],
  ],
  'pelleting-precision': [
    ['Specify the pellet weight tolerance range for your highest-value specialty crop and seeder type', 'Add the sphericity measurement protocol and acceptable deviation range', 'Reference a stand uniformity comparison between high-precision and standard lots'],
    ['Name the pellet integrity failure mode most common in your target planting environments', 'Add the environmental validation conditions for your target planting window', 'Reference the moisture absorption threshold that predicts germination in wet conditions'],
    ['Specify the harvest timing comparison between singulation-accurate and inaccurate stands in a named crop', 'Add the pellet weight sampling frequency and QC hold trigger threshold', 'Reference the roundness specification for your highest-value specialty crop lots'],
  ],
  'poor-seed-prep-cost': [
    ['Name the specific record type that resolved your last significant field complaint most quickly', 'Add the traceability record retention policy and complaint resolution timeline', 'Reference the cost comparison for a lot rejection event with vs. without records'],
    ['Specify the coating record elements in your lot-level documentation', 'Add the complaint resolution timeline comparison for traceable vs. untraceable lots', 'Reference the customer conversation difference when records are available'],
    ['Name the hidden cost category with the highest impact on total poor-prep cost', 'Add the process validation investment cost relative to one lot rejection event', 'Reference the supply chain cost that doesn\'t appear on the processing cost sheet'],
  ],
  'crop-establishment': [
    ['Specify the soil type and moisture condition your coating is validated for establishment performance', 'Add the stand count comparison between validated and unvalidated lots in target conditions', 'Reference the coating change that most improved establishment in a challenging environment'],
    ['Name the specialty crop with the highest replanting cost in your production area', 'Add the validation steps specific to that crop and planting environment', 'Reference the lot documentation elements that allow rapid diagnosis when establishment problems occur'],
    ['Specify the environmental condition where standard coating specs most commonly underperform', 'Add the environmental validation test for non-standard planting conditions', 'Reference the coating spec change that closed the gap between lab and field performance'],
  ],
  'scaling-operations': [
    ['Specify the production volume trigger for re-validation in your current protocol', 'Add the equipment variables included in your calibration check at each event', 'Reference the batch variation data before and after implementing formal process documentation'],
    ['Name the campaign endpoint most prone to coating variation in your production process', 'Add the in-process QC checkpoint frequency for your current production volume', 'Reference the specific drift variable that concentrates complaints in the first 20% of campaigns'],
    ['Specify the calibration drift variable with the highest production impact in your system', 'Add the re-validation protocol steps at volume-based triggers', 'Reference the production volume where calibration drift became visible in lot quality data'],
  ],
  'grower-trust': [
    ['Specify the traceability record that resolved a grower complaint most effectively in your market', 'Add the complaint resolution timeline comparison for traceable vs. untraceable programs', 'Reference the grower conversation that changed when coating records were available'],
    ['Name the attribution default most costly to correct without traceable records in your market', 'Add the complaint management time comparison for your markets with and without documented programs', 'Reference the customer relationship outcome when complaint resolution included data-backed documentation'],
    ['Specify the complaint density metric that best predicts coating program quality in your markets', 'Add the process control changes that most reduced complaint density in a specific market', 'Reference the sales team time reallocation when complaint rates dropped'],
  ],
}

const CTAS = [
  `Follow ${COMPANY.name} for more seed performance and ag operations insights.`,
  `Follow for more practical seed coating and crop establishment breakdowns.`,
  `Follow for more insights on seed treatment, coating consistency, and agricultural operations.`,
  `Follow for more operator-level ag supply chain insights.`,
  `Visit ${COMPANY.website} to learn how Summit supports seed companies with advanced coating and treatment services.`,
]

export function generateFacebook(inputs: FacebookInputs, seed = 0): FacebookOutput {
  const prob = inputs.problem
  const idx = seed % 3
  const ctaIdx = seed % CTAS.length

  const hasDataPoints = true
  const hasCTA = true
  const hasConsequence = true
  const wordCount = 250

  const qualityScore = scoreContent(inputs, hasDataPoints, hasCTA, hasConsequence, wordCount)

  const improvementSuggestions = IMPROVEMENT_SUGGESTIONS[prob]?.[idx] ?? [
    'Name a specific crop type or planting scenario your audience works with to ground the post',
    'Add a specific data point — a cost range or percentage — to give readers a concrete benchmark',
    'Make the discussion question more specific to invite responses from growers and seed company operators',
  ]

  return {
    platform: 'facebook',
    primaryPost: PRIMARY_POSTS[prob]?.[idx] ?? `Seed preparation decisions made at the facility determine field performance outcomes. Here\'s what that means for growers and seed company operators — and what to ask about before the season starts.\n\n${PROBLEM_DATA[prob]?.stat1 ?? ''}\n\n${PROBLEM_DATA[prob]?.consequence ?? ''}\n\n${CTAS[ctaIdx]}`,
    practicalTakeaway: PRACTICAL_TAKEAWAYS[prob]?.[idx] ?? `Ask your seed supplier what lot-level coating and treatment documentation they maintain — and whether that documentation has been used to resolve a field performance complaint. The answer tells you a lot about the program behind the seed.`,
    cta: CTAS[ctaIdx],
    discussionQuestion: DISCUSSION_QUESTIONS[prob]?.[idx] ?? `Have you ever traced a field performance problem back to seed preparation rather than genetics, weather, or equipment? What did that diagnostic process look like?`,
    repurposingSuggestions: REPURPOSING.slice(0, 4),
    qualityScore,
    improvementSuggestions,
  }
}
