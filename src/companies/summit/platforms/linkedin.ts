import type { LinkedInInputs, LinkedInOutput, PostIdea, CalendarEntry } from '../types'
import { PROBLEM_DATA, PROBLEM_LABELS } from '../lib/companyProfile'
import { scoreContent } from '../lib/scoring'

const HOOKS: Record<string, string[]> = {
  'coating-inconsistency': [
    "Most seed companies don't lose grower trust because of genetics. They lose it when coating inconsistency becomes uneven emergence and unexplained field complaints.",
    "Coating weight variation above 3% is not a cosmetic issue. It is a germination performance variable that shows up after planting — not before.",
    "The assumption that 'coated is coated' is one of the most expensive beliefs in seed production.",
  ],
  'germination-variability': [
    "When germination is inconsistent in the field, the seed is blamed first. Often the coating decision was where the variability started.",
    "Up to 35% of field germination inconsistency traces back to seed preparation — not genetics. Most investigations never reach that conclusion.",
    "Emergence timing variation of more than 3–5 days within a lot creates yield drag that no agronomy decision can fully recover.",
  ],
  'seed-treatment-complexity': [
    "Multi-chemistry seed treatment programs require sequencing validation most in-house operations skip. The cost of that shortcut shows up in efficacy, compliance, and field performance.",
    "Stacking 8 or more actives on a seed without formal compatibility testing triples your formulation failure rate. The math does not care about the marketing claims on the label.",
    "Regulatory compliance in seed treatment is not documentation work. It is process control work — and most operations treat it as the former until an inspection changes the conversation.",
  ],
  'planting-performance-risk': [
    "Seed singulation accuracy drops 15–30% when coating weight deviates from the range the planter meter was calibrated for. That is not a planter problem.",
    "Skip rates above 3% at recommended populations trace back to coating variation more often than to planter settings. Most growers adjust the planter.",
    "The seed's physical interface with the soil — coating density, film integrity, surface smoothness — is determined at the processing facility, not in the field.",
  ],
  'seed-handling-issues': [
    "Coating abrasion during bulk handling strips 8–18% of applied treatment by weight. That loss happens before the seed reaches the planter.",
    "Coating dust during handling is not just a mess. It is a regulatory exposure, a worker protection issue, and a signal that coating adhesion was not designed for the handling path.",
    "Seed flowability variation above 20% across a lot creates meter calibration drift at the planter. The population inconsistency is not the planter's fault.",
  ],
  'pelleting-precision': [
    "Pellet weight variation above 5% creates singulation failures in precision seeding. In high-value crops, that failure costs more than the seed.",
    "Pellet roundness deviation above 0.08 on the sphericity index reduces vacuum seeder accuracy by 18–35%. Most pellet specs never measure it.",
    "Pellet integrity failures — cracking, shattering, excessive water absorption — are not field problems. They are coating validation problems that were not caught before the seed left the facility.",
  ],
  'poor-seed-prep-cost': [
    "Seed companies that can't trace field complaints to specific lot preparation records spend 3–5x more recovering from those complaints than companies that can.",
    "The cost of a seed preparation failure is never paid at the processing line. It is paid at the claim, at the replant, and in the customer relationship.",
    "Reworking or discarding an off-spec seed lot costs $15,000–$80,000 per event. Preventing the failure costs a fraction of that — and is achievable at the process control level.",
  ],
  'crop-establishment': [
    "Crop establishment failures are diagnosed in the field. The decisions that cause them were made at seed preparation — months earlier.",
    "Stands below 85% of target population in the first 14 days increase yield loss probability by 20–40%. The coating decision either supported that window or it didn't.",
    "In high-value specialty crops, a stand failure requiring replanting costs $800–$4,500 per acre before you count the lost market window. That number starts with the seed preparation decision.",
  ],
  'scaling-operations': [
    "Scale does not solve coating inconsistency. It amplifies it. Batch-to-batch variation increases 25–50% when operations grow volume without growing process controls.",
    "Coating equipment calibration drift of 3–5% per 100,000-unit run is predictable. Most scaling operations find out about it through customer complaints, not process audits.",
    "Grower complaints from scaled coating operations cluster in the first and last 20% of each production run — where process drift is highest. That is not a volume problem. It is a process validation problem.",
  ],
  'grower-trust': [
    "One season of field performance inconsistency reduces grower repeat purchase intent by 35–55%. The seed company rarely sees it coming until the relationship is already gone.",
    "When growers can't trace a field problem to a specific cause, they blame the brand. Having lot-level coating and treatment records does not prevent every problem — but it determines who owns the narrative.",
    "Sales teams in markets with high complaint rates spend 40–60% more time on recovery than teams with traceable, consistent coating programs. That time does not show up on a processing cost sheet.",
  ],
}

const BODIES: Record<string, string[]> = {
  'coating-inconsistency': [
    `Seed coating is treated as a finishing step in many operations. It is not. It is a performance variable.\n\n${PROBLEM_DATA['coating-inconsistency'].stat1}.\n\nThe coating sets the seed's behavior at germination — how it interacts with soil moisture, how it manages the fungicide or inoculant carried on its surface, and how consistently it delivers that chemistry across an entire lot.\n\n${PROBLEM_DATA['coating-inconsistency'].stat2}.\n\nGrower complaints about uneven emergence are rarely investigated back to coating. They are investigated at the variety level, at the agronomy level, or not at all.\n\n${PROBLEM_DATA['coating-inconsistency'].stat3}.\n\nThe 10–20% germination difference between a controlled coating program and an uncontrolled one is not the cost of the coating. It is the cost of not controlling it.`,
    `The word "coated" on a seed bag tells you nothing about coating quality.\n\n${PROBLEM_DATA['coating-inconsistency'].stat3}.\n\nCoating weight variation happens from worn application equipment, binder batch inconsistency, temperature changes in the coating environment, and insufficient process monitoring. None of those variables announce themselves.\n\n${PROBLEM_DATA['coating-inconsistency'].stat1}.\n\nThe grower receives seed that looks identical to the previous season's lot. The coating performance may be materially different.\n\n${PROBLEM_DATA['coating-inconsistency'].stat2}.\n\nSeed companies with formal coating process controls — validated application rates, in-process weight checks, binder viscosity monitoring — have documented 2–4x fewer grower complaints per acre sold. That is not a marketing number. It is an operations number.`,
    `Most quality control in seed processing focuses on germination testing. Coating consistency is rarely on the same checklist.\n\n${PROBLEM_DATA['coating-inconsistency'].stat2}.\n\nA germination test in a controlled laboratory environment does not replicate the field conditions where coating inconsistency creates problems — moisture variability, soil temperature fluctuation, and the biological pressure the coating chemistry is supposed to address.\n\n${PROBLEM_DATA['coating-inconsistency'].stat1}.\n\nThe gap between lab germination and field emergence is partially a coating gap. The seed that tested at 92% germination in the lab may emerge at 78% in the field — and a portion of that gap is coating performance, not genetics.\n\n${PROBLEM_DATA['coating-inconsistency'].stat3}.\n\nControlling coating variation is an operations decision. The grower complaint that follows from not controlling it is an inevitable outcome.`,
  ],
  'germination-variability': [
    `Germination variability in the field triggers a standard investigation process: check the variety, check the planting date, check the weather.\n\n${PROBLEM_DATA['germination-variability'].stat2}.\n\nThat 35% figure means more than a third of field germination inconsistency is addressable before the seed leaves the facility. Most investigations never reach that conclusion.\n\n${PROBLEM_DATA['germination-variability'].stat1}.\n\nThe late-emerging plant in a row is not just a germination lag. It is a yield drag that persists for the full season — the early-emerging neighbors establish canopy advantage, root depth, and competitive position before the delayed seedling begins to catch up.\n\n${PROBLEM_DATA['germination-variability'].stat3}.\n\nCoating decisions that were not validated for cold, wet, or heavy-residue planting conditions are a known source of this variability. Most of them are made without that validation.`,
    `The conversation about germination variability almost always starts at agronomy. It should often start at the seed coating specification.\n\n${PROBLEM_DATA['germination-variability'].stat3}.\n\nWhen a coating is applied without validation for the target soil temperature or moisture window, the chemistry it carries may not perform as designed under field conditions. The germination test was done at 68°F. The planting window was 48°F with saturated soils.\n\n${PROBLEM_DATA['germination-variability'].stat2}.\n\nUp to 35% of field-level inconsistency is traceable to preparation variables. Treatment application rate variation, coating thickness, seed-to-seed transfer — these are all process control decisions made at the facility.\n\n${PROBLEM_DATA['germination-variability'].stat1}.\n\n3–5 days of emergence variation within a lot. That is the difference between a strong early stand and a patchy one — driven by seed preparation decisions, not soil or weather alone.`,
    `When emergence is uneven, the instinct is to look at weather or variety. Sometimes the answer is upstream.\n\n${PROBLEM_DATA['germination-variability'].stat1}.\n\nYield drag from 3–5 day emergence variation within a lot is 8–15%. That number does not recover. The late-emerging plant finishes the season at a competitive disadvantage.\n\n${PROBLEM_DATA['germination-variability'].stat2}.\n\nA third of that variability is fixable at the processing facility — before the seed is packaged, sold, or planted. But only if coating consistency, treatment accuracy, and environmental validation are part of the process.\n\n${PROBLEM_DATA['germination-variability'].stat3}.\n\nThe cold-wet planting scenario exposes coating limitations that warm-dry conditions mask. If your coating program was not validated for both scenarios, you are carrying field risk you have not measured.`,
  ],
  'seed-treatment-complexity': [
    `Seed treatment programs have become materially more complex. Application sequences that worked with two actives do not automatically work with eight.\n\n${PROBLEM_DATA['seed-treatment-complexity'].stat1}.\n\nChemistry interaction, carrier incompatibility, and coating adhesion failure from improperly sequenced applications reduce efficacy in ways that are not visible until the seed is in the field. By then the cost has been paid.\n\n${PROBLEM_DATA['seed-treatment-complexity'].stat2}.\n\nOperations managing 8 or more active combinations without formal compatibility testing fail at 3x the rate. That is not a commentary on the chemistry. It is a commentary on the process that applies it.\n\n${PROBLEM_DATA['seed-treatment-complexity'].stat3}.\n\nRegulatory compliance is not a separate problem from treatment efficacy. They are the same problem. An improperly applied treatment that is also incorrectly documented creates two exposures simultaneously.`,
    `Multi-chemistry treatment programs succeed in the lab. They fail in production when sequencing, compatibility, and application control are not validated for the operational environment.\n\n${PROBLEM_DATA['seed-treatment-complexity'].stat2}.\n\nThree times the failure rate with 8 or more actives and no compatibility testing. The increase is not from the chemistry itself — it is from the assumption that validated chemistry stacks translate to validated production processes.\n\n${PROBLEM_DATA['seed-treatment-complexity'].stat1}.\n\n20–40% efficacy reduction from incompatible stacking is a predictable outcome of an unvalidated process. It is also entirely preventable with a compatibility testing protocol and sequencing documentation.\n\n${PROBLEM_DATA['seed-treatment-complexity'].stat3}.\n\nRegulatory documentation in seed treatment is not optional. Application rate accuracy, re-entry intervals, and worker protection compliance are legal requirements — and most in-house operations are not formally managing them at the lot level.`,
    `The complexity of a seed treatment program is not a reason to skip validation. It is a reason to invest in it.\n\n${PROBLEM_DATA['seed-treatment-complexity'].stat3}.\n\n60% of in-house treatment operations are not formally documenting the compliance requirements their programs are legally required to meet. That gap is not cost savings — it is deferred liability.\n\n${PROBLEM_DATA['seed-treatment-complexity'].stat1}.\n\nChemistry interactions that reduce efficacy by 20–40% are preventable. The sequencing, carrier compatibility, and adhesion testing required to prevent them exist. Most operations that skip them do not find out until a field performance complaint arrives.\n\n${PROBLEM_DATA['seed-treatment-complexity'].stat2}.\n\nThe failure rate increase from unvalidated complex programs is not random. It is concentrated in the programs with the most actives, the least documentation, and the highest stakes — exactly where the cost of failure is highest.`,
  ],
  'planting-performance-risk': [
    `Seed meters are calibrated for a specific seed size range. Coating weight variation shifts a percentage of every treated lot outside that range.\n\n${PROBLEM_DATA['planting-performance-risk'].stat1}.\n\nThe planter is doing what it was designed to do. The seed it is handling has changed from what the meter was set for. The skip rate is a seed preparation outcome, not a planter maintenance problem.\n\n${PROBLEM_DATA['planting-performance-risk'].stat2}.\n\nCoating smoothness, density, and film integrity affect how the seed moves through the planting system. A coating that cracks under transport stress, absorbs moisture unevenly, or varies in density across the lot introduces inconsistency that the planter cannot compensate for.\n\n${PROBLEM_DATA['planting-performance-risk'].stat3}.\n\nSkip rates above 3% at recommended populations. Traced to coating weight variation, not planter settings. The field complaint is filed against the seed. The coating decision is not on the investigation report.`,
    `When skip rates are high at recommended populations, the troubleshooting starts at the planter. The correct starting point is often the seed preparation decision.\n\n${PROBLEM_DATA['planting-performance-risk'].stat3}.\n\nA 3% skip rate at recommended planting population translates to 3 missed plants per 100 seeds planted. In high-value crops with narrow row spacing and precise yield models, that miss rate compounds across every acre.\n\n${PROBLEM_DATA['planting-performance-risk'].stat1}.\n\n15–30% singulation accuracy loss from coating weight variation is not a minor adjustment. In a precision planting environment, it is the difference between a stand that matches the model and one that requires re-evaluation.\n\n${PROBLEM_DATA['planting-performance-risk'].stat2}.\n\nThe seed's coating determines its physical characteristics at the planter. Those characteristics are set at processing. The grower adjusts the planter. The real adjustment belongs upstream.`,
    `Planting performance is the final test of a seed preparation program. It measures everything that was done — or not done — at the coating facility.\n\n${PROBLEM_DATA['planting-performance-risk'].stat2}.\n\nCoating density and surface smoothness affect how seeds meter through vacuum and finger-pickup planters. These are controllable variables in a well-specified coating program. They are sources of field variation in a poorly specified one.\n\n${PROBLEM_DATA['planting-performance-risk'].stat1}.\n\nA 15–30% drop in singulation accuracy from coating variation is not visible in the germination test. It is visible in the stand count — after planting, after emergence, and after the yield potential of the affected acres has already been reduced.\n\n${PROBLEM_DATA['planting-performance-risk'].stat3}.\n\nSkip rates above 3% are a field complaint. The decision that caused them was a processing decision. The only way to address them is upstream.`,
  ],
  'seed-handling-issues': [
    `Seed coating programs are often validated at the facility. They are rarely validated for the handling and transport path the seed follows after it leaves.\n\n${PROBLEM_DATA['seed-handling-issues'].stat1}.\n\nGravity wagons, pneumatic conveyors, and air seeders subject coated seed to impact, friction, and air shear that strip coating material at rates that exceed what most coating formulations are designed to withstand.\n\n${PROBLEM_DATA['seed-handling-issues'].stat2}.\n\nCoating dust during handling is a regulatory exposure under worker protection standards. It is also a performance signal — dust generation indicates active coating degradation that means less chemistry on the seed than the application rate specified.\n\n${PROBLEM_DATA['seed-handling-issues'].stat3}.\n\nFlowability variation above 20% from coating inconsistency creates meter calibration drift at the planter. The grower adjusts the planter setting. The issue is the coating.`,
    `The path from the coating drum to the planter is where a significant percentage of applied seed treatment is lost.\n\n${PROBLEM_DATA['seed-handling-issues'].stat1}.\n\n8–18% coating loss by weight during bulk handling is not unusual in operations where coating formulation was not selected for handling durability. The seed that arrives at the planter has materially less chemistry than the seed that left the coating facility.\n\n${PROBLEM_DATA['seed-handling-issues'].stat3}.\n\nFlowability is a planting performance variable. When coating weight inconsistency creates seed-to-seed sticking or surface variation, the effect is measurable at the meter — in doubles, skips, and population inconsistency that compound across every field planted.\n\n${PROBLEM_DATA['seed-handling-issues'].stat2}.\n\nCoating dust is the visible output of a handling durability failure. It is also an OSHA Worker Protection Standard exposure. Many operations manage the symptom — dust containment — without addressing the cause: a coating not formulated for the handling environment.`,
    `Handling durability is a coating specification variable. Most operations do not specify it.\n\n${PROBLEM_DATA['seed-handling-issues'].stat2}.\n\nThe dust visible in the bag, the hopper, and the air seeder line is treated coating material that is no longer on the seed. That material was applied at cost, validated for a purpose, and is now coating the inside of equipment instead of the seed surface.\n\n${PROBLEM_DATA['seed-handling-issues'].stat1}.\n\n8–18% coating loss from abrasion in bulk handling systems is measurable — but only if someone measures it. Most operations do not test coating retention through the full handling chain before a product reaches the grower.\n\n${PROBLEM_DATA['seed-handling-issues'].stat3}.\n\nFlowability variation from coating quality drives planting population inconsistency. It is an invisible variable until population counts come in and no one can explain why the stand doesn't match the rate.`,
  ],
  'pelleting-precision': [
    `Precision seeding in vegetable, flower, and specialty crops depends entirely on pellet quality. The pellet is the seed's interface with the planter — and with the soil.\n\n${PROBLEM_DATA['pelleting-precision'].stat1}.\n\nWhen pellet weight variation exceeds 5%, the singulation system — vacuum plate, finger pickup, or belt — encounters seeds that behave differently from each other. Some are skipped. Some are doubled. The stand reflects the pellet variation, not the planter calibration.\n\n${PROBLEM_DATA['pelleting-precision'].stat2}.\n\nPellet integrity failures — cracking, shattering, water absorption before germination — happen when pellet formulation was not validated for the target planting environment. A pellet designed for optimal conditions in a controlled environment is not the same pellet in cold, wet, or sandy soil.\n\n${PROBLEM_DATA['pelleting-precision'].stat3}.\n\nRoundness deviation above 0.08 on the sphericity index. An 18–35% reduction in singulation accuracy from that deviation. In high-value crops where stand uniformity drives harvest timing and market window, that deviation has a direct revenue consequence.`,
    `Pellet quality in precision seeding is not a packaging decision. It is a yield management decision.\n\n${PROBLEM_DATA['pelleting-precision'].stat3}.\n\nVacuum seeders are calibrated for a specific pellet geometry. Deviation from that geometry creates singulation failures that cannot be tuned out of the planter. The fix is upstream — in the pelleting process.\n\n${PROBLEM_DATA['pelleting-precision'].stat1}.\n\nPellet weight variation above 5% is detectable in the pelleting process. It is also detectable in stand counts — after the replanting window has closed and the yield loss is already locked in.\n\n${PROBLEM_DATA['pelleting-precision'].stat2}.\n\nEnvironmental validation of pellet formulation is not optional in high-value crop production. The conditions at planting vary by region, season, and field — and the pellet's behavior at germination varies with those conditions. A pellet program that was not validated for that range is carrying field risk that the grower cannot manage.`,
    `The investment in precision seeding equipment is only as good as the precision of the seed being planted.\n\n${PROBLEM_DATA['pelleting-precision'].stat2}.\n\nPellet integrity failures at planting are diagnosed as germination failures. The actual failure happened at the pelleting facility — in formulation, moisture content, or curing conditions that were not appropriate for the target planting environment.\n\n${PROBLEM_DATA['pelleting-precision'].stat1}.\n\nWeight variation above 5% creates a distribution of pellets across every lot that the singulation system cannot distinguish. Heavy pellets and light pellets behave differently in the same metering system. The stand reflects the distribution.\n\n${PROBLEM_DATA['pelleting-precision'].stat3}.\n\nSingulation accuracy determines stand uniformity. Stand uniformity determines harvest timing. In specialty crops with narrow market windows, harvest timing is the variable that separates profitable seasons from break-even ones. It starts with the pellet.`,
  ],
  'poor-seed-prep-cost': [
    `Seed companies that manage field complaints without traceable lot preparation records face a cost structure that is 3–5x higher than those that can trace and own the problem.\n\n${PROBLEM_DATA['poor-seed-prep-cost'].stat1}.\n\nNot because they have worse products. Because they cannot explain, diagnose, or defend what they produced — so the default resolution is replacement, discount, or lost relationship.\n\n${PROBLEM_DATA['poor-seed-prep-cost'].stat2}.\n\n$15,000–$80,000 per lot rework or discard event. A recoverable cost if the process controls that would prevent the next event are put in place after the first one. An unsustainable cost if the process remains unchanged.\n\n${PROBLEM_DATA['poor-seed-prep-cost'].stat3}.\n\nThe hidden cost of poor seed preparation — returns, replanting claims, insurance exposure, lost accounts — does not appear on a processing cost sheet. It appears in the P&L after the season, in the accounts that did not reorder, and in the sales territory that requires recovery work instead of growth work.`,
    `The processing line cost of a coating or treatment error is one number. The downstream cost is a different, much larger number.\n\n${PROBLEM_DATA['poor-seed-prep-cost'].stat2}.\n\n$15,000–$80,000 per lot event — and that is only the direct cost. The grower relationship, the repeat business, and the market perception of the brand carry costs that are harder to quantify and longer to recover.\n\n${PROBLEM_DATA['poor-seed-prep-cost'].stat1}.\n\nSeed companies with traceable lot records do not prevent every complaint. But they determine the conversation when a complaint arrives. They can show what was applied, at what rate, on what date, with what result in the germination test. That traceability is worth 3–5x in reduced recovery cost alone.\n\n${PROBLEM_DATA['poor-seed-prep-cost'].stat3}.\n\nThe hidden cost compounds through the supply chain — returns, replant claims, crop insurance involvement, and account attrition — across a two-to-three-year window after a bad seed preparation season. None of it appears on the processing line's cost statement.`,
    `The cost of poor seed preparation is never paid at the processing stage. It is paid at every subsequent stage in the supply chain.\n\n${PROBLEM_DATA['poor-seed-prep-cost'].stat3}.\n\nReturns, replant costs, insurance claims, and lost accounts are the operational output of a seed preparation decision that was made months earlier. By the time the cost appears, the decision is not recoverable.\n\n${PROBLEM_DATA['poor-seed-prep-cost'].stat1}.\n\nThe difference between seed companies with formal coating process controls and those without is not yield data. It is complaint frequency, complaint cost, and the ability to trace, own, and resolve the problem before the relationship is at risk.\n\n${PROBLEM_DATA['poor-seed-prep-cost'].stat2}.\n\nA $15,000–$80,000 lot rework event is a process control failure that has a defined prevention cost. That prevention cost — in validation, monitoring, and documentation — is a fraction of the event cost it prevents.`,
  ],
  'crop-establishment': [
    `Crop establishment problems are agronomic outcomes. But the inputs that drive those outcomes were determined at the seed preparation stage.\n\n${PROBLEM_DATA['crop-establishment'].stat1}.\n\nStands below 85% of target population in the first 14 days do not recover to full yield potential. The window for competitive establishment closes early — and the crop that was seeded at the right rate is now growing at an effective lower population.\n\n${PROBLEM_DATA['crop-establishment'].stat2}.\n\nIn high-value vegetable and specialty crops, a replanting event is not just a cost. It is a market window decision. The second planting may not reach harvest before the market window closes, before a competing supplier fills the contract, or before the price drops to a level where the crop no longer pencils.\n\n${PROBLEM_DATA['crop-establishment'].stat3}.\n\nCoating decisions that do not account for the target planting environment — soil type, moisture, temperature, residue cover — are made without the information needed to validate them for field conditions. Those decisions create preventable establishment risk.`,
    `The seed that fails to establish properly was not planted wrong. It was prepared wrong.\n\n${PROBLEM_DATA['crop-establishment'].stat3}.\n\nA coating or treatment program that was not validated for cold, wet, or heavy-residue conditions will perform differently in those conditions than it performed in controlled tests. That difference shows up in the first 14 days — in the emergence pattern, the stand count, and the decision about whether to replant.\n\n${PROBLEM_DATA['crop-establishment'].stat1}.\n\n20–40% higher yield loss probability when stand falls below 85% of target. That probability was influenced by the coating program before the seed was planted.\n\n${PROBLEM_DATA['crop-establishment'].stat2}.\n\nThe replanting cost in specialty crops — $800–$4,500 per acre direct, plus lost market window value at 2–3x — is the final accounting of a seed preparation decision that was made without adequate validation. The field cost is paid by the grower. The relationship cost is paid by the seed company.`,
    `Stand establishment is the first measurable outcome of every seeding decision — including the coating decision that preceded it.\n\n${PROBLEM_DATA['crop-establishment'].stat2}.\n\n$800–$4,500 per acre in direct replanting cost in specialty crops. Plus the lost market window, which can exceed the direct cost by 2–3x. A replanting decision triggered by poor seed establishment is not a grower management failure. It is a seed preparation outcome.\n\n${PROBLEM_DATA['crop-establishment'].stat1}.\n\nThe 14-day window for stand establishment is the most consequential period in the crop's season. The coating program either supports that window for the target planting environment — or it doesn't. Validation determines which.\n\n${PROBLEM_DATA['crop-establishment'].stat3}.\n\nCoating specifications that assume a warm, dry planting environment are not validated for the range of conditions where seed will actually be planted. That assumption is the source of establishment risk that growers experience but seed companies rarely trace back to preparation.`,
  ],
  'scaling-operations': [
    `Scaling a coating operation does not scale quality. It scales the existing process — including its variability.\n\n${PROBLEM_DATA['scaling-operations'].stat1}.\n\nBatch-to-batch variation that was 8% at 50,000 units becomes 20–25% at 500,000. Not because the equipment changed — because the process controls that were informal at low volume are insufficient at high volume.\n\n${PROBLEM_DATA['scaling-operations'].stat2}.\n\nEquipment calibration drift of 3–5% per 100,000-unit run is predictable. It is also preventable with defined re-validation intervals. Most scaling operations find out about it through field complaints, not process audits.\n\n${PROBLEM_DATA['scaling-operations'].stat3}.\n\nGrower complaints cluster in the first and last 20% of each production campaign. That pattern is not random. It is the signature of process drift — startup variability before the process stabilizes, and end-of-run variability as equipment wear and binder depletion accumulate.`,
    `The difference between a 50,000-unit coating operation and a 500,000-unit one is not just volume. It is the gap between informal process management and formal process control.\n\n${PROBLEM_DATA['scaling-operations'].stat2}.\n\nCalibration drift in coating equipment is a known, measurable variable. The operations that manage it formally set re-validation intervals before production runs. The operations that discover it reactively set them after complaints arrive.\n\n${PROBLEM_DATA['scaling-operations'].stat1}.\n\n25–50% increase in coating variation when scaling without formal process documentation. That variation does not stay inside the facility. It goes out in every bag and appears in field performance data months later.\n\n${PROBLEM_DATA['scaling-operations'].stat3}.\n\nComplaint clustering in the first and last 20% of production campaigns is a diagnostic. It tells you where the process is weakest — at startup and at the end of run. Most operations treat these complaints as outliers. They are process signals.`,
    `Coating capacity is not the constraint when scaling seed operations. Process control is.\n\n${PROBLEM_DATA['scaling-operations'].stat3}.\n\nThe complaint pattern in scaled coating operations — clustered in startup and end-of-run periods — is the process telling you where the controls are insufficient. It is correctable. But only if it is diagnosed as a process problem, not a volume problem.\n\n${PROBLEM_DATA['scaling-operations'].stat1}.\n\nBatch-to-batch variation increasing 25–50% during scale-up is a predictable outcome of an undocumented process under increased volume stress. The equipment can handle the volume. The process validation cannot.\n\n${PROBLEM_DATA['scaling-operations'].stat2}.\n\n3–5% calibration drift per 100,000-unit run with no re-validation protocol means that the 100,000th unit in each campaign may have materially different coating weight than the first. Growers in different parts of the territory receive the same product with different performance characteristics.`,
  ],
  'grower-trust': [
    `Grower trust is not built in the sales conversation. It is built in field performance — and it is lost in the same place.\n\n${PROBLEM_DATA['grower-trust'].stat1}.\n\nA single season of inconsistent emergence or unexplained field variability reduces repeat purchase intent by 35–55%. The seed company often does not see the signal until the following year's order does not come in.\n\n${PROBLEM_DATA['grower-trust'].stat2}.\n\nWhen growers cannot trace a performance problem to a specific cause, they attribute it to the brand. Lot-level coating and treatment records do not prevent every problem. But they determine who owns the narrative when a problem occurs.\n\n${PROBLEM_DATA['grower-trust'].stat3}.\n\nSales teams spending 40–60% more time on complaint management are not underperforming. They are managing the downstream cost of a seed preparation program that lacked the process controls to prevent the complaints in the first place.`,
    `The most expensive grower relationship problem is the one that was preventable at the processing facility.\n\n${PROBLEM_DATA['grower-trust'].stat2}.\n\nWhen coating and treatment records cannot be traced to the lot planted on the field where the complaint originated, the seed company has no defense and no diagnostic. The relationship cost is absorbed in full.\n\n${PROBLEM_DATA['grower-trust'].stat1}.\n\n35–55% reduction in repeat purchase intent from one inconsistent season. In markets where grower switching costs are low — because multiple brands are available and competitive trials are easy to run — that signal converts to lost accounts at a rate most companies underestimate.\n\n${PROBLEM_DATA['grower-trust'].stat3}.\n\nThe time cost of complaint management in markets with high inconsistency is not invisible — it appears in sales productivity metrics, territory margin data, and the account attrition that follows. Addressing the seed preparation cause of complaints is the only sustainable way to reduce the downstream cost.`,
    `Field performance consistency is the only brand claim that growers verify every season. Everything else is marketing.\n\n${PROBLEM_DATA['grower-trust'].stat1}.\n\nGrowers have long memories for inconsistent performance and short memories for marketing claims. A brand that delivers consistent emergence, clean stands, and predictable field performance earns repeat business. A brand with one unpredictable season earns competitive trials.\n\n${PROBLEM_DATA['grower-trust'].stat3}.\n\nSeed company sales teams that spend 40–60% of their time on complaint management are operating in a territory that has a seed preparation problem. The complaints are the output. The process is the input.\n\n${PROBLEM_DATA['grower-trust'].stat2}.\n\nTraceable lot records change the complaint conversation from "your seed failed" to "let's look at what this lot experienced and what the field data shows." That conversation is a different conversation — and it has a different outcome for the relationship.`,
  ],
}

const BUSINESS_IMPACTS: Record<string, string> = {
  'coating-inconsistency': `Field performance exposure: ${PROBLEM_DATA['coating-inconsistency'].cost1}. ${PROBLEM_DATA['coating-inconsistency'].cost2}. The coating decision affects every seed in every bag of every lot produced under that process. A 10–20% germination difference across a lot is not a spot problem — it is a program-level outcome that follows the seed into every field it is planted in.`,
  'germination-variability': `Agronomic exposure: ${PROBLEM_DATA['germination-variability'].cost1}. ${PROBLEM_DATA['germination-variability'].cost2}. When emergence timing variation creates yield drag of 8–15% before any agronomic input can address it, the yield loss is locked in at stand establishment. The coating program either supported the target emergence window or it created the variability that compressed it.`,
  'seed-treatment-complexity': `Compliance and efficacy exposure: ${PROBLEM_DATA['seed-treatment-complexity'].cost1}. ${PROBLEM_DATA['seed-treatment-complexity'].cost2}. A treatment program that fails regulatory documentation requirements while also delivering reduced efficacy from incompatible stacking creates two simultaneous exposures — one agronomic, one legal — from the same process control gap.`,
  'planting-performance-risk': `Planting precision exposure: ${PROBLEM_DATA['planting-performance-risk'].cost1}. ${PROBLEM_DATA['planting-performance-risk'].cost2}. In precision planting systems where population accuracy is managed to 2–3% of target, a 15–30% singulation accuracy reduction from coating variation eliminates the precision that the planting system was purchased to deliver. The grower paid for precision. The coating removed it.`,
  'seed-handling-issues': `Handling loss exposure: ${PROBLEM_DATA['seed-handling-issues'].cost1}. ${PROBLEM_DATA['seed-handling-issues'].cost2}. Treatment that was applied at cost and validated for field performance arrives at the planter at 8–18% less than the applied rate. The agronomic justification for the treatment program was built on the applied rate — not the rate that survives the handling chain.`,
  'pelleting-precision': `Singulation and stand exposure: ${PROBLEM_DATA['pelleting-precision'].cost1}. ${PROBLEM_DATA['pelleting-precision'].cost2}. In high-value vegetable and specialty crops where stand uniformity drives harvest timing and market window capture, singulation accuracy loss from pellet quality variation has a direct revenue consequence — measured per acre, per harvest timing miss, and per contract that was not filled at the target price.`,
  'poor-seed-prep-cost': `Recovery cost exposure: ${PROBLEM_DATA['poor-seed-prep-cost'].cost1}. ${PROBLEM_DATA['poor-seed-prep-cost'].cost2}. The $15,000–$80,000 direct lot rework cost is the visible portion of a poor seed preparation event. The hidden portion — account attrition, warranty seed replacement, competitive trials triggered by performance inconsistency — accumulates over the following 2–3 seasons and is rarely fully accounted for on a per-lot basis.`,
  'crop-establishment': `Establishment and replanting exposure: ${PROBLEM_DATA['crop-establishment'].cost1}. ${PROBLEM_DATA['crop-establishment'].cost2}. The $800–$4,500 per acre direct replanting cost in specialty crops does not include the market window loss — the value of the harvest that was not delivered at the target price because the replanted crop reached maturity after the market peak. That second number is often 2–3x the direct cost.`,
  'scaling-operations': `Process drift exposure: ${PROBLEM_DATA['scaling-operations'].cost1}. ${PROBLEM_DATA['scaling-operations'].cost2}. Calibration drift of 3–5% per 100,000-unit run is a known, predictable variable in coating operations. In a 500,000-unit season with no re-validation protocol, that drift compounds across the full production campaign — and every lot produced under drift conditions carries field performance risk that was preventable.`,
  'grower-trust': `Relationship and revenue exposure: ${PROBLEM_DATA['grower-trust'].cost1}. ${PROBLEM_DATA['grower-trust'].cost2}. The 35–55% repeat purchase intent reduction from one inconsistent season represents a revenue exposure that is 5–10x the value of the original complaint. The account that does not reorder does not announce itself — it simply places the order with a competitor and runs a trial to validate the decision.`,
}

const CTAS: string[] = [
  'Follow for more seed performance and ag operations insights.',
  'Follow for more practical seed coating and crop establishment breakdowns.',
  'Follow for more insights on seed treatment, coating consistency, and agricultural operations.',
  'Follow for more operator-level ag supply chain insights.',
  'What does your operation do to validate coating consistency before seed leaves the facility? Share below.',
]

const IMPROVEMENT_SUGGESTIONS: Record<string, string[]> = {
  'coating-inconsistency': [
    'Make the coating failure mechanism more specific — name whether the variability is from application weight, binder batch inconsistency, or equipment calibration drift.',
    'Tie the post to a clearer consequence: grower complaints, field stand inconsistency, or lot rework cost.',
    'Add a specific process control checkpoint — in-process weight checks or binder viscosity monitoring — to give readers a concrete reference point.',
  ],
  'germination-variability': [
    'Specify the planting environment where coating validation was missing — cold-wet, heavy residue, or early season — to make the risk more tangible.',
    'Add the yield drag number (8–15%) earlier in the post to anchor the agronomic consequence before explaining the mechanism.',
    'Name the investigation process that is typically skipped — tracing field germination issues back to coating thickness or treatment application rate — to make the insight more operational.',
  ],
  'seed-treatment-complexity': [
    'Identify the specific chemistry interaction that creates efficacy loss — carrier incompatibility or sequencing order — rather than referencing incompatibility generically.',
    'Add a regulatory reference — Worker Protection Standard or EPA label compliance — to make the compliance exposure concrete.',
    'Tie the 3x failure rate to a specific operation type (in-house vs. third-party treatment) to sharpen the relevance for the target audience.',
  ],
  'planting-performance-risk': [
    'Name the planter mechanism that fails — vacuum plate, finger pickup, or belt singulator — to make the failure mode visible to growers and equipment managers.',
    'Add a specific coating weight range (e.g., ±5% of target) as the threshold that triggers meter calibration problems.',
    'Include a field diagnostic — comparing skip rate pattern to planting population and seeding rate — to give readers a self-assessment tool.',
  ],
  'seed-handling-issues': [
    'Name the specific handling equipment where coating loss is highest — pneumatic conveyor, gravity wagon, or air seeder hopper — to make the loss point identifiable.',
    'Add the regulatory standard that applies to coating dust exposure (OSHA Worker Protection Standard) to complete the compliance picture.',
    'Include a handling chain audit framework — measure coating weight at facility departure and at planter loading — so readers understand how to quantify the loss.',
  ],
  'pelleting-precision': [
    'Specify the crop category where pellet weight variation has the highest yield consequence — vegetable, flower, or specialty crops — to sharpen relevance.',
    'Add the sphericity index threshold (0.08) as a testable specification that readers can request from their pelleting supplier.',
    'Tie pellet integrity failure to a specific soil condition — cold, wet, or sandy — to make the environmental validation requirement concrete.',
  ],
  'poor-seed-prep-cost': [
    'Add a specific traceability system requirement — lot-level coating weight records, treatment application logs — so readers understand what "traceable preparation" means operationally.',
    'Quantify the recovery cost of a complaint that cannot be traced versus one that can — 3–5x is the ratio, but a dollar example makes it actionable.',
    'Name the supply chain stages where the hidden cost compounds — returns, replant claims, crop insurance involvement — to make the total cost picture visible.',
  ],
  'crop-establishment': [
    'Specify the crop type where the replanting cost is highest — specialty vegetables or flowers — to make the $800–$4,500 per acre figure more credible.',
    'Add the environmental variable that was not validated — soil temperature, moisture at planting, residue cover — to make the coating decision gap explicit.',
    'Include the 14-day establishment window as the primary diagnostic — if emergence is below 85% of target by day 14, the yield loss is already locked in.',
  ],
  'scaling-operations': [
    'Identify the specific process control that fails at scale — binder viscosity monitoring, application weight tracking, or re-validation intervals — to make the solution concrete.',
    'Add the complaint clustering pattern (first and last 20% of production campaign) as a diagnostic that scaling operations can use to identify where their process is weakest.',
    'Quantify the calibration drift rate (3–5% per 100,000 units) and set a re-validation interval recommendation so readers have a starting point for their own programs.',
  ],
  'grower-trust': [
    'Make the purchase intent reduction (35–55%) specific to a crop category or market segment to increase relevance.',
    'Add the sales team productivity cost — 40–60% more time on complaint management — as a secondary business consequence beyond the direct relationship loss.',
    'Name what "traceable lot records" means in practice — coating weight by lot, treatment application rate log, germination test result — so readers understand what the documentation standard looks like.',
  ],
}

const POST_IDEAS: Record<string, PostIdea[]> = {
  'coating-inconsistency': [
    { title: 'Coating Weight Variation Above 3%: What It Does to Germination', angle: 'Agronomic Performance Breakdown', rank: 1, painClarity: 10, financialImpact: 9, tension: 9 },
    { title: 'Why Growers Blame the Seed When the Coating Was the Variable', angle: 'Contrarian Take', rank: 2, painClarity: 9, financialImpact: 9, tension: 10 },
    { title: 'What "Coated" Tells You — and What It Doesn\'t', angle: 'Buyer Education', rank: 3, painClarity: 9, financialImpact: 8, tension: 9 },
    { title: 'The Process Control Checks That Prevent Coating Inconsistency', angle: 'Processing Bottleneck', rank: 4, painClarity: 8, financialImpact: 8, tension: 7 },
    { title: '2–4x More Grower Complaints: The Coating Consistency Difference', angle: 'Hidden Cost Leak', rank: 5, painClarity: 9, financialImpact: 10, tension: 8 },
    { title: 'Binder Batch Variation: The Coating Problem Nobody Tracks', angle: 'Common Operational Mistake', rank: 6, painClarity: 8, financialImpact: 8, tension: 8 },
    { title: 'Why Lab Germination and Field Emergence Tell Different Stories', angle: 'System Failure', rank: 7, painClarity: 9, financialImpact: 9, tension: 9 },
    { title: 'The In-Process Weight Check That Prevents Field Complaints', angle: 'Before/After Improvement', rank: 8, painClarity: 7, financialImpact: 8, tension: 7 },
    { title: 'How Worn Coating Equipment Degrades Seed Performance Over Time', angle: 'Risk Warning', rank: 9, painClarity: 8, financialImpact: 8, tension: 8 },
    { title: 'Coating Consistency as a Competitive Advantage in Seed Sales', angle: 'Supplier Decision Mistake', rank: 10, painClarity: 8, financialImpact: 9, tension: 8 },
  ],
  'germination-variability': [
    { title: '35% of Field Germination Inconsistency Starts at Seed Preparation', angle: 'Hidden Cost Leak', rank: 1, painClarity: 10, financialImpact: 10, tension: 9 },
    { title: 'Emergence Timing Variation of 3–5 Days: The Yield Drag Nobody Calculates', angle: 'Agronomic Performance Breakdown', rank: 2, painClarity: 9, financialImpact: 10, tension: 9 },
    { title: 'Why the Standard Investigation Misses the Coating Variable', angle: 'Contrarian Take', rank: 3, painClarity: 9, financialImpact: 9, tension: 10 },
    { title: 'Cold-Wet Planting Conditions and Coating Validation: The Gap', angle: 'Risk Warning', rank: 4, painClarity: 9, financialImpact: 9, tension: 9 },
    { title: 'What Genetics Can\'t Fix That Coating Preparation Can', angle: 'Buyer Education', rank: 5, painClarity: 9, financialImpact: 8, tension: 9 },
    { title: 'How to Validate a Coating Program for Early-Season Planting', angle: 'Processing Bottleneck', rank: 6, painClarity: 7, financialImpact: 8, tension: 7 },
    { title: 'Treatment Application Rate and Germination: The Connection Most Miss', angle: 'System Failure', rank: 7, painClarity: 8, financialImpact: 8, tension: 8 },
    { title: 'Why 92% Lab Germination Becomes 78% Field Emergence', angle: 'Common Operational Mistake', rank: 8, painClarity: 9, financialImpact: 9, tension: 9 },
    { title: 'Seed-to-Seed Treatment Transfer: A Hidden Germination Variable', angle: 'Hidden Cost Leak', rank: 9, painClarity: 8, financialImpact: 8, tension: 8 },
    { title: 'Building Coating Specifications for the Planting Environment, Not the Lab', angle: 'Before/After Improvement', rank: 10, painClarity: 8, financialImpact: 8, tension: 8 },
  ],
  'seed-treatment-complexity': [
    { title: '8 Actives, No Compatibility Testing: The Formulation Failure Pattern', angle: 'Common Operational Mistake', rank: 1, painClarity: 10, financialImpact: 10, tension: 9 },
    { title: 'Chemistry Sequencing Errors That Reduce Treatment Efficacy by 40%', angle: 'System Failure', rank: 2, painClarity: 9, financialImpact: 10, tension: 9 },
    { title: 'Why Multi-Chemistry Programs Fail in Production but Not in the Lab', angle: 'Contrarian Take', rank: 3, painClarity: 9, financialImpact: 9, tension: 10 },
    { title: 'Regulatory Compliance in Seed Treatment: The Documentation Gap', angle: 'Risk Warning', rank: 4, painClarity: 9, financialImpact: 8, tension: 9 },
    { title: 'Carrier Incompatibility: The Treatment Variable Nobody Validates', angle: 'Hidden Cost Leak', rank: 5, painClarity: 8, financialImpact: 9, tension: 8 },
    { title: 'How to Build a Seed Treatment Compatibility Testing Protocol', angle: 'Buyer Education', rank: 6, painClarity: 7, financialImpact: 8, tension: 7 },
    { title: 'Worker Protection Standard Compliance in Seed Treatment Operations', angle: 'Risk Warning', rank: 7, painClarity: 8, financialImpact: 8, tension: 8 },
    { title: 'In-House Treatment vs. Third-Party: The Process Control Difference', angle: 'Supplier Decision Mistake', rank: 8, painClarity: 8, financialImpact: 9, tension: 8 },
    { title: 'What Happens When Inoculants and Fungicides Are Applied in the Wrong Order', angle: 'Agronomic Performance Breakdown', rank: 9, painClarity: 9, financialImpact: 9, tension: 9 },
    { title: 'The Post-Application Validation That Most Treatment Operations Skip', angle: 'Processing Bottleneck', rank: 10, painClarity: 8, financialImpact: 8, tension: 8 },
  ],
  'planting-performance-risk': [
    { title: 'Coating Weight Variation and Meter Calibration: The Planting Connection', angle: 'System Failure', rank: 1, painClarity: 10, financialImpact: 9, tension: 9 },
    { title: 'Skip Rates Above 3%: When the Problem Is Upstream of the Planter', angle: 'Contrarian Take', rank: 2, painClarity: 9, financialImpact: 10, tension: 10 },
    { title: 'Why Adjusting the Planter Doesn\'t Fix a Coating Problem', angle: 'Common Operational Mistake', rank: 3, painClarity: 9, financialImpact: 9, tension: 9 },
    { title: 'Film Integrity Failures at Planting and Their Stand Consequences', angle: 'Agronomic Performance Breakdown', rank: 4, painClarity: 8, financialImpact: 9, tension: 8 },
    { title: 'Coating Density and Vacuum Planter Performance: What Changes', angle: 'Processing Bottleneck', rank: 5, painClarity: 8, financialImpact: 8, tension: 8 },
    { title: 'How to Validate Coating Specifications for Precision Planting Systems', angle: 'Before/After Improvement', rank: 6, painClarity: 7, financialImpact: 8, tension: 7 },
    { title: 'The Seed-to-Soil Interface and Why Coating Matters There', angle: 'Buyer Education', rank: 7, painClarity: 8, financialImpact: 8, tension: 7 },
    { title: 'Population Inconsistency That Traces Back to the Bag, Not the Meter', angle: 'Hidden Cost Leak', rank: 8, painClarity: 9, financialImpact: 9, tension: 9 },
    { title: 'Coating Cracking Under Transport: A Planting Performance Risk', angle: 'Risk Warning', rank: 9, painClarity: 8, financialImpact: 8, tension: 8 },
    { title: 'What Growers Don\'t Know About Their Skip Rate and Coating Quality', angle: 'Supplier Decision Mistake', rank: 10, painClarity: 9, financialImpact: 9, tension: 9 },
  ],
  'seed-handling-issues': [
    { title: '18% Treatment Loss Before the Seed Reaches the Planter', angle: 'Hidden Cost Leak', rank: 1, painClarity: 10, financialImpact: 10, tension: 9 },
    { title: 'Coating Dust During Handling: The Regulatory and Performance Problem', angle: 'Risk Warning', rank: 2, painClarity: 9, financialImpact: 9, tension: 9 },
    { title: 'Why Flowability Variation Creates Population Inconsistency', angle: 'System Failure', rank: 3, painClarity: 9, financialImpact: 9, tension: 8 },
    { title: 'Designing Coating Programs for the Handling Path, Not the Lab', angle: 'Before/After Improvement', rank: 4, painClarity: 8, financialImpact: 9, tension: 8 },
    { title: 'Air Seeder Chemistry Loss: What Happens to Treatment in the Fan Line', angle: 'Agronomic Performance Breakdown', rank: 5, painClarity: 9, financialImpact: 9, tension: 9 },
    { title: 'Handling Durability Testing: The Coating Specification Nobody Requests', angle: 'Common Operational Mistake', rank: 6, painClarity: 8, financialImpact: 8, tension: 8 },
    { title: 'Gravity Wagon Abrasion and Its Coating Loss Rate', angle: 'Processing Bottleneck', rank: 7, painClarity: 8, financialImpact: 8, tension: 7 },
    { title: 'The Worker Protection Exposure from Coating Dust Generation', angle: 'Risk Warning', rank: 8, painClarity: 8, financialImpact: 8, tension: 8 },
    { title: 'How to Audit Coating Retention from Facility to Planter', angle: 'Buyer Education', rank: 9, painClarity: 7, financialImpact: 8, tension: 7 },
    { title: 'Seed Clumping and Meter Calibration Drift: The Flowability Connection', angle: 'Supplier Decision Mistake', rank: 10, painClarity: 8, financialImpact: 8, tension: 8 },
  ],
  'pelleting-precision': [
    { title: 'Pellet Weight Variation Above 5%: The Singulation Failure Threshold', angle: 'System Failure', rank: 1, painClarity: 10, financialImpact: 10, tension: 9 },
    { title: 'Roundness Deviation and Vacuum Seeder Accuracy: The 35% Gap', angle: 'Agronomic Performance Breakdown', rank: 2, painClarity: 9, financialImpact: 10, tension: 9 },
    { title: 'Pellet Integrity in Cold, Wet Conditions: What Validation Misses', angle: 'Risk Warning', rank: 3, painClarity: 9, financialImpact: 9, tension: 9 },
    { title: 'Stand Uniformity in Specialty Crops Starts at the Pelleting Drum', angle: 'Contrarian Take', rank: 4, painClarity: 9, financialImpact: 9, tension: 10 },
    { title: 'How to Read a Pellet Quality Specification Before You Buy', angle: 'Buyer Education', rank: 5, painClarity: 7, financialImpact: 8, tension: 7 },
    { title: 'The Sphericity Index and Why It Matters for Precision Seeding', angle: 'Processing Bottleneck', rank: 6, painClarity: 8, financialImpact: 8, tension: 7 },
    { title: 'Harvest Timing and the Pellet Quality Decision Made at Processing', angle: 'Hidden Cost Leak', rank: 7, painClarity: 8, financialImpact: 9, tension: 8 },
    { title: 'What Happens When Pellet Curing Conditions Are Not Validated', angle: 'Common Operational Mistake', rank: 8, painClarity: 8, financialImpact: 8, tension: 8 },
    { title: 'Market Window Loss and Poor Pellet Quality: The Connection in Specialty Crops', angle: 'Before/After Improvement', rank: 9, painClarity: 8, financialImpact: 9, tension: 8 },
    { title: 'Why Precision Seeding Equipment Can\'t Compensate for Pellet Inconsistency', angle: 'Supplier Decision Mistake', rank: 10, painClarity: 9, financialImpact: 9, tension: 9 },
  ],
  'poor-seed-prep-cost': [
    { title: 'The $80,000 Lot Rework Event That Process Controls Prevent', angle: 'Hidden Cost Leak', rank: 1, painClarity: 10, financialImpact: 10, tension: 9 },
    { title: '3–5x Higher Recovery Cost When You Can\'t Trace the Problem', angle: 'System Failure', rank: 2, painClarity: 9, financialImpact: 10, tension: 9 },
    { title: 'Why Seed Prep Failures Cost More Than the Lot', angle: 'Contrarian Take', rank: 3, painClarity: 9, financialImpact: 10, tension: 10 },
    { title: 'What Traceable Lot Records Do for Field Complaint Management', angle: 'Before/After Improvement', rank: 4, painClarity: 8, financialImpact: 9, tension: 8 },
    { title: 'The Hidden Supply Chain Cost of One Bad Coating Season', angle: 'Risk Warning', rank: 5, painClarity: 9, financialImpact: 9, tension: 9 },
    { title: 'Replant Claims, Returns, and Insurance: Where Seed Prep Cost Compounds', angle: 'Agronomic Performance Breakdown', rank: 6, painClarity: 8, financialImpact: 9, tension: 8 },
    { title: 'Why Seed Companies Undercount the Cost of Processing Failures', angle: 'Common Operational Mistake', rank: 7, painClarity: 8, financialImpact: 9, tension: 8 },
    { title: 'The Prevention Cost vs. Event Cost Calculation in Seed Preparation', angle: 'Buyer Education', rank: 8, painClarity: 7, financialImpact: 9, tension: 7 },
    { title: 'What a Lot-Level Coating Record Should Contain', angle: 'Processing Bottleneck', rank: 9, painClarity: 7, financialImpact: 8, tension: 7 },
    { title: 'Account Attrition After a Bad Seed Season: The 3-Year Cost', angle: 'Supplier Decision Mistake', rank: 10, painClarity: 9, financialImpact: 10, tension: 9 },
  ],
  'crop-establishment': [
    { title: 'Stands Below 85% of Target: The Yield Loss That\'s Already Locked In', angle: 'Risk Warning', rank: 1, painClarity: 10, financialImpact: 10, tension: 9 },
    { title: 'The Specialty Crop Replanting Decision and Its Real Cost', angle: 'Agronomic Performance Breakdown', rank: 2, painClarity: 9, financialImpact: 10, tension: 9 },
    { title: 'Why Crop Establishment Failures Are Often Preparation Failures', angle: 'Contrarian Take', rank: 3, painClarity: 9, financialImpact: 9, tension: 10 },
    { title: 'Coating Validation for Your Target Planting Environment', angle: 'Before/After Improvement', rank: 4, painClarity: 8, financialImpact: 9, tension: 8 },
    { title: '$4,500 Per Acre in Replanting Cost: What Preceded the Decision', angle: 'Hidden Cost Leak', rank: 5, painClarity: 9, financialImpact: 10, tension: 9 },
    { title: 'The 14-Day Establishment Window and What Coating Does in That Period', angle: 'Buyer Education', rank: 6, painClarity: 8, financialImpact: 8, tension: 8 },
    { title: 'Cold, Wet, Heavy-Residue: The Planting Conditions That Expose Coating Gaps', angle: 'System Failure', rank: 7, painClarity: 9, financialImpact: 9, tension: 9 },
    { title: 'Market Window Loss from Late Replanting in High-Value Crops', angle: 'Hidden Cost Leak', rank: 8, painClarity: 8, financialImpact: 9, tension: 8 },
    { title: 'Why Some Coating Programs Fail in the Field but Pass the Lab Test', angle: 'Common Operational Mistake', rank: 9, painClarity: 9, financialImpact: 9, tension: 9 },
    { title: 'Building a Coating Specification Around the Planting Environment', angle: 'Processing Bottleneck', rank: 10, painClarity: 8, financialImpact: 8, tension: 7 },
  ],
  'scaling-operations': [
    { title: '25–50% More Coating Variation When You Scale Without Process Controls', angle: 'System Failure', rank: 1, painClarity: 10, financialImpact: 9, tension: 9 },
    { title: 'Equipment Calibration Drift and Why Most Operations Find Out Too Late', angle: 'Common Operational Mistake', rank: 2, painClarity: 9, financialImpact: 9, tension: 9 },
    { title: 'Complaint Clustering in the First and Last 20% of Production Runs', angle: 'Agronomic Performance Breakdown', rank: 3, painClarity: 9, financialImpact: 9, tension: 9 },
    { title: 'Why Coating Capacity Is Not the Constraint When Scaling', angle: 'Contrarian Take', rank: 4, painClarity: 8, financialImpact: 9, tension: 10 },
    { title: '3–5% Calibration Drift Per 100,000 Units: The Scaling Math', angle: 'Hidden Cost Leak', rank: 5, painClarity: 9, financialImpact: 9, tension: 8 },
    { title: 'Building Re-Validation Protocols Before You Scale, Not After', angle: 'Before/After Improvement', rank: 6, painClarity: 7, financialImpact: 8, tension: 7 },
    { title: 'What Process Documentation Needs to Exist Before You Add Volume', angle: 'Processing Bottleneck', rank: 7, painClarity: 7, financialImpact: 8, tension: 7 },
    { title: 'The Startup and End-of-Run Variability Pattern in Scaled Operations', angle: 'Risk Warning', rank: 8, painClarity: 8, financialImpact: 8, tension: 8 },
    { title: 'How Binder Viscosity Changes During Long Production Runs', angle: 'Buyer Education', rank: 9, painClarity: 7, financialImpact: 7, tension: 7 },
    { title: 'The Third-Party Coating Partner Decision at Scale: What to Evaluate', angle: 'Supplier Decision Mistake', rank: 10, painClarity: 8, financialImpact: 8, tension: 8 },
  ],
  'grower-trust': [
    { title: '35–55% Drop in Repeat Intent After One Inconsistent Season', angle: 'Risk Warning', rank: 1, painClarity: 10, financialImpact: 10, tension: 9 },
    { title: 'When Growers Can\'t Trace the Problem, They Blame the Brand', angle: 'System Failure', rank: 2, painClarity: 9, financialImpact: 10, tension: 10 },
    { title: 'The 5–10x Relationship Cost of One Coating Failure', angle: 'Hidden Cost Leak', rank: 3, painClarity: 9, financialImpact: 10, tension: 9 },
    { title: 'Why Field Performance Is the Only Brand Claim Growers Verify', angle: 'Contrarian Take', rank: 4, painClarity: 9, financialImpact: 9, tension: 10 },
    { title: 'Traceable Lot Records and the Complaint Conversation They Change', angle: 'Before/After Improvement', rank: 5, painClarity: 8, financialImpact: 9, tension: 8 },
    { title: 'The Sales Team Time Cost of Markets With High Complaint Rates', angle: 'Agronomic Performance Breakdown', rank: 6, painClarity: 8, financialImpact: 9, tension: 8 },
    { title: 'Building Grower Trust Through Coating Consistency, Not Marketing Claims', angle: 'Buyer Education', rank: 7, painClarity: 8, financialImpact: 8, tension: 8 },
    { title: 'The Account That Didn\'t Reorder: Where the Relationship Was Actually Lost', angle: 'Common Operational Mistake', rank: 8, painClarity: 9, financialImpact: 9, tension: 9 },
    { title: 'Competitive Trials Triggered by One Bad Field Season', angle: 'Supplier Decision Mistake', rank: 9, painClarity: 9, financialImpact: 9, tension: 9 },
    { title: 'What Lot-Level Traceability Does for Grower Relationship Management', angle: 'Processing Bottleneck', rank: 10, painClarity: 7, financialImpact: 8, tension: 7 },
  ],
}

const CALENDAR_ENTRIES: CalendarEntry[] = [
  { day: 1, topic: 'Coating Inconsistency', hook: 'Coating weight variation above 3% is not a cosmetic issue. It is a germination performance variable that shows up after planting.', angle: 'Agronomic Performance Breakdown', cta: 'How does your operation validate coating consistency before seed leaves the facility?' },
  { day: 2, topic: 'Germination Variability', hook: 'Up to 35% of field germination inconsistency traces back to seed preparation, not genetics. Most investigations never reach that conclusion.', angle: 'Hidden Cost Leak', cta: 'Has your operation traced an emergence problem back to a coating or treatment decision?' },
  { day: 3, topic: 'Seed Treatment Complexity', hook: 'Stacking 8 actives without compatibility testing triples your formulation failure rate. The chemistry is not the problem — the process is.', angle: 'Common Operational Mistake', cta: 'How does your treatment program manage application sequencing for complex chemistry stacks?' },
  { day: 4, topic: 'Planting Performance Risk', hook: 'Skip rates above 3% at recommended populations often trace back to coating weight variation, not planter settings.', angle: 'Contrarian Take', cta: 'How is coating weight variation affecting singulation accuracy in your fields or operation?' },
  { day: 5, topic: 'Seed Handling Issues', hook: 'Coating abrasion during bulk handling strips 8–18% of applied treatment by weight before the seed reaches the planter.', angle: 'Risk Warning', cta: 'What is your operation doing to measure coating retention from facility to field?' },
  { day: 6, topic: 'Pelleting Precision', hook: 'Pellet weight variation above 5% creates singulation failures. In high-value crops, that failure costs more than the seed.', angle: 'System Failure', cta: 'What specifications does your pelleting program validate before lots are released?' },
  { day: 7, topic: 'Cost of Poor Seed Preparation', hook: 'The cost of a seed preparation failure is never paid at the processing line. It is paid at the claim, at the replant, and in the customer relationship.', angle: 'Hidden Cost Leak', cta: 'What does lot-level traceability look like in your operation today?' },
  { day: 8, topic: 'Crop Establishment Challenges', hook: 'Crop establishment failures are diagnosed in the field. The decisions that caused them were made at seed preparation — months earlier.', angle: 'Contrarian Take', cta: 'How is your coating program validated for the range of planting environments your customers use?' },
  { day: 9, topic: 'Scaling Operations', hook: 'Scale does not solve coating inconsistency. It amplifies it. Batch-to-batch variation increases 25–50% when process controls don\'t scale with volume.', angle: 'System Failure', cta: 'What process controls does your operation have in place that are ready to scale with volume?' },
  { day: 10, topic: 'Grower Trust', hook: 'One season of field performance inconsistency reduces repeat purchase intent by 35–55%. Seed companies rarely see the signal until the relationship is already gone.', angle: 'Risk Warning', cta: 'What does your operation\'s field complaint traceability process look like?' },
  { day: 11, topic: 'Coating Inconsistency', hook: 'The word "coated" on a seed bag tells you nothing about coating quality. The process that produced it does.', angle: 'Buyer Education', cta: 'What coating process controls should seed buyers be asking their supplier about?' },
  { day: 12, topic: 'Germination Variability', hook: 'Emergence timing variation of more than 3–5 days creates yield drag that no agronomic decision can recover from.', angle: 'Agronomic Performance Breakdown', cta: 'What emergence timing range does your coating program support under cold-wet planting conditions?' },
  { day: 13, topic: 'Seed Treatment Complexity', hook: 'Regulatory compliance in seed treatment is process control work, not documentation work. Most operations manage it backward.', angle: 'Risk Warning', cta: 'How does your operation ensure application rate accuracy at the lot level for regulated chemistries?' },
  { day: 14, topic: 'Planting Performance Risk', hook: 'The seed\'s physical interface with soil is determined at the processing facility, not in the field.', angle: 'Buyer Education', cta: 'What coating specifications does your program validate for precision planting systems?' },
  { day: 15, topic: 'Seed Handling Issues', hook: 'Coating dust in the hopper is not just a cleanup issue. It is a regulatory exposure and a signal that coating adhesion failed the handling test.', angle: 'Risk Warning', cta: 'Has your operation tested coating retention through the full handling and transport path?' },
  { day: 16, topic: 'Pelleting Precision', hook: 'Roundness deviation above 0.08 reduces vacuum seeder accuracy by 18–35%. Most pellet specifications don\'t measure it.', angle: 'Processing Bottleneck', cta: 'What sphericity or roundness specification does your pelleting supplier provide on each lot?' },
  { day: 17, topic: 'Cost of Poor Seed Preparation', hook: 'Seed companies with traceable lot records spend 3–5x less on complaint recovery than those that cannot trace the problem.', angle: 'Before/After Improvement', cta: 'What is your operation\'s process for documenting coating and treatment decisions at the lot level?' },
  { day: 18, topic: 'Crop Establishment Challenges', hook: 'Stands below 85% of target in the first 14 days do not recover to full yield potential. The coating decision either supported that window or it didn\'t.', angle: 'Agronomic Performance Breakdown', cta: 'How does your operation validate coating performance for early-season or cold-soil planting?' },
  { day: 19, topic: 'Scaling Operations', hook: 'Equipment calibration drift of 3–5% per 100,000-unit run is predictable. Most scaling operations find out about it through complaints, not audits.', angle: 'Common Operational Mistake', cta: 'What re-validation intervals does your coating operation run during high-volume production campaigns?' },
  { day: 20, topic: 'Grower Trust', hook: 'When growers can\'t trace a field problem to a cause, they blame the brand. Lot-level records don\'t prevent every problem — but they determine who owns the narrative.', angle: 'System Failure', cta: 'What does your seed company\'s lot traceability documentation include for coating and treatment data?' },
  { day: 21, topic: 'Coating Inconsistency', hook: 'Binder viscosity variation across batches is one of the least-monitored sources of coating inconsistency. It is also one of the most impactful.', angle: 'Processing Bottleneck', cta: 'How does your operation monitor binder viscosity across production runs?' },
  { day: 22, topic: 'Germination Variability', hook: 'A coating program validated at 68°F is not the same program under 48°F field conditions. The chemistry behaves differently. The seed responds differently.', angle: 'Risk Warning', cta: 'Has your coating program been validated across the planting temperature range your customers operate in?' },
  { day: 23, topic: 'Seed Treatment Complexity', hook: 'Carrier incompatibility between active ingredients can reduce treatment efficacy by 20–40% without any visible change to the seed at application.', angle: 'Hidden Cost Leak', cta: 'How does your treatment program test carrier compatibility before scaling a new chemistry combination?' },
  { day: 24, topic: 'Planting Performance Risk', hook: 'A coating that cracks under transport stress exposes the seed surface unevenly at planting. The seed-to-soil contact that follows is not what was designed.', angle: 'System Failure', cta: 'Does your coating program include transport and handling durability testing before commercial release?' },
  { day: 25, topic: 'Seed Handling Issues', hook: 'Seed flowability variation above 20% from coating inconsistency creates population inconsistency at the planter that the operator cannot calibrate out.', angle: 'Agronomic Performance Breakdown', cta: 'How does your coating program manage flowability consistency across lot production?' },
  { day: 26, topic: 'Pelleting Precision', hook: 'Pellet integrity failures in cold, wet soil happen when pellet formulation was not validated for that planting environment. They look like germination failures.', angle: 'Common Operational Mistake', cta: 'What environmental conditions does your pelleting program validate for before commercial release?' },
  { day: 27, topic: 'Cost of Poor Seed Preparation', hook: 'Reworking or discarding an off-spec seed lot costs $15,000–$80,000 per event. The process controls that prevent it cost a fraction of that.', angle: 'Before/After Improvement', cta: 'What is your operation\'s cost of a rework event compared to its process control investment?' },
  { day: 28, topic: 'Crop Establishment Challenges', hook: 'In specialty crops, a replanting event is not just a cost. It is a market window decision — and the second planting may not make the window.', angle: 'Agronomic Performance Breakdown', cta: 'What is the market window risk for your highest-value crops if establishment requires replanting?' },
  { day: 29, topic: 'Scaling Operations', hook: 'Grower complaints in scaled coating operations cluster at startup and end of run. That pattern is not bad luck. It is a process drift signature.', angle: 'Contrarian Take', cta: 'Does your operation track complaint frequency by position in the production campaign?' },
  { day: 30, topic: 'Grower Trust', hook: 'Field performance consistency is the only brand claim that growers verify every season. Marketing claims are verified once.', angle: 'Contrarian Take', cta: 'What does your seed company do to ensure consistent field performance becomes a repeatable outcome, not a goal?' },
]

const REPURPOSING: string[] = [
  'Pull the hook and business impact into a Twitter/X thread with each stat as a standalone post for seed industry professionals.',
  'Convert the post ideas table into an Instagram carousel ranking content angles for seed company decision-makers.',
  'Turn the 30-day calendar into a downloadable content planning guide for ag operations LinkedIn pages.',
  'Use the hook as a cold outreach subject line to seed production managers and ag operations leaders.',
  'Build the business impact section into a YouTube short explaining the field consequence of the coating decision.',
]

export function generateLinkedIn(inputs: LinkedInInputs, seed = 0): LinkedInOutput {
  const v = seed % 3
  const p = inputs.problem as string

  const hookOptions = HOOKS[p] ?? HOOKS['coating-inconsistency']
  const bodyOptions = BODIES[p] ?? BODIES['coating-inconsistency']
  const postIdeas: PostIdea[] = POST_IDEAS[p] ?? POST_IDEAS['coating-inconsistency']

  const hook = hookOptions[v] ?? hookOptions[0]
  const body = bodyOptions[v] ?? bodyOptions[0]
  const businessImpact = BUSINESS_IMPACTS[p] ?? BUSINESS_IMPACTS['coating-inconsistency']
  const cta = CTAS[v % CTAS.length]
  const improvements = IMPROVEMENT_SUGGESTIONS[p] ?? IMPROVEMENT_SUGGESTIONS['coating-inconsistency']
  const problemLabel = PROBLEM_LABELS[p] ?? p

  const fullPostText = `${hook}\n\n${body}\n\n${businessImpact}\n\n${cta}`
  const qualityScore = scoreContent(inputs, true, true, true, fullPostText.split(' ').length)

  const calendar: CalendarEntry[] = CALENDAR_ENTRIES.map(entry => ({
    ...entry,
    topic: entry.topic === problemLabel ? `${entry.topic} (Primary)` : entry.topic,
  }))

  return {
    platform: 'linkedin',
    postIdeas,
    fullPost: { hook, body, businessImpact, cta },
    calendar,
    repurposingSuggestions: REPURPOSING.slice(0, 3),
    qualityScore,
    improvementSuggestions: improvements.slice(0, 3),
  }
}
