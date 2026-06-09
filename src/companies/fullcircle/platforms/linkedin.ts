import type { LinkedInInputs, LinkedInOutput } from '../types'
import { PROBLEM_DATA, COMPANY } from '../lib/companyProfile'
import { scoreContent } from '../lib/scoring'

// ─── HOOKS ───────────────────────────────────────────────────────────────────
// 3 hooks per problem, 30 total
const HOOKS: Record<string, string[]> = {
  'data-exposure-risk': [
    `Retired laptops are not harmless inventory. They are data risk with a dust layer.`,
    `Most companies don't create data exposure when devices are active. They create it at retirement.`,
    `The device left your office. The data on it may not have.`,
  ],
  'chain-of-custody-failures': [
    `Chain-of-custody documentation does not exist retroactively. Either you have it or you don't.`,
    `Every undocumented device handoff in your ITAD process is a gap your auditor will find before you do.`,
    `The weakest point in your data security program is not your firewall. It is the moment a retired device leaves your building without a signed receipt.`,
  ],
  'compliance-gaps': [
    `The compliance question "Where are all your retired devices?" has no good answer without a formal ITAD program.`,
    `Regulators don't ask whether you meant to comply. They ask whether you can prove it.`,
    `An informal device retirement process is not a compliance program. It is a compliance liability with no documentation attached.`,
  ],
  'e-waste-mismanagement': [
    `Throwing electronics in the trash is not a disposal strategy. It is an environmental liability waiting for a citation.`,
    `The organization that generated the e-waste owns the liability — not the vendor that hauled it away without certification.`,
    `Electronics contain hazardous materials. The company that retired them is responsible for where those materials end up.`,
  ],
  'device-wiping-assumptions': [
    `A factory reset removes the map to your data. It does not remove the data.`,
    `Forensic tools recover data from factory-reset devices at rates above 60%. Your IT team's confidence in that wipe does not change the math.`,
    `The assumption that a wiped device is a safe device is wrong in roughly one out of every three cases.`,
  ],
  'asset-value-recovery': [
    `Retired IT assets are not zero-value inventory. They are depreciating assets with a recovery window — and that window closes every quarter.`,
    `Every enterprise laptop sent directly to recycling without a remarketing evaluation is a missed recovery check.`,
    `Your retired devices are losing 15–25% of their remaining value every quarter they sit unmanaged. That is not a storage problem. It is a financial decision.`,
  ],
  'storage-cost-buildup': [
    `Devices in storage are not neutral. They are active cost, active data risk, and depreciating value — simultaneously.`,
    `The IT closet full of retired devices is not a solved problem. It is a deferred one — and deferred problems in ITAD accumulate cost while you wait.`,
    `$50–$150 per device per month to store equipment that no longer works. This is what deferred IT asset disposition costs in practice.`,
  ],
  'multi-location-disposal': [
    `Your compliance program is only as strong as your least-compliant location. One weak site breaks the chain for the entire organization.`,
    `65–80% of multi-location IT disposal programs cannot produce consistent chain-of-custody documentation across all sites. Auditors don't grade on a curve.`,
    `Independent device disposal at each location is not a distributed solution. It is a distributed compliance failure.`,
  ],
  'reverse-logistics-complexity': [
    `Retired electronics don't move themselves. The logistics gap between IT retirement and final disposition is where chain-of-custody failures concentrate.`,
    `General freight carriers are not certified ITAD logistics partners. The difference matters at audit time.`,
    `70% of enterprise IT retirement events exceed in-house logistics capacity. The overflow creates documentation gaps that compound over time.`,
  ],
  'informal-disposal-risk': [
    `Informal disposal feels like a solved problem until the audit arrives: "Provide chain-of-custody documentation for all retired devices from the past three years."`,
    `Consumer electronics recycling programs do not meet enterprise chain-of-custody requirements — regardless of the certifications posted at the drop-off bin.`,
    `35–45% of organizations retire IT assets through informal channels. Most of them don't realize this is a compliance exposure until it's too late to correct.`,
  ],
}

// ─── BODIES ──────────────────────────────────────────────────────────────────
// 3 bodies per problem, 30 total
const BODIES: Record<string, string[]> = {
  'data-exposure-risk': [
    `The risk mechanism is straightforward: a device that leaves active use without verified data destruction and documented chain of custody is a device whose data is still accessible to anyone who obtains it.

Studies of used hard drives and SSDs purchased on secondary markets show that 35–40% of devices contain recoverable data from prior owners — email archives, financial records, PII — despite seller claims of prior wiping.

The common mistake is treating device retirement as an IT logistics task rather than a data security event. Devices are collected, staged, and handed off without the same controls applied to active endpoints.

A formal ITAD program changes the risk profile by applying certified data destruction methods, serialized device-level documentation, and a chain-of-custody record that closes the exposure gap from the moment a device leaves service.

${PROBLEM_DATA['data-exposure-risk'].cost1}`,
    `The average cost of a data breach is $4.45 million (IBM 2023). That figure is not driven exclusively by network intrusions — retired devices without verified destruction contribute directly to this exposure.

The risk doesn't require an active attack. It requires only that a device with residual data reach someone with a forensic tool and the motivation to use it.

The common mistake is assuming that a device that has left the building has left the risk profile. It has not — not without a certificate of data destruction tied to that specific device's serial number.

A proper ITAD program produces device-level destruction certificates, serialized chain-of-custody records, and audit-ready documentation — turning a chronic data risk into a documented, defensible process.

${PROBLEM_DATA['data-exposure-risk'].cost2}`,
    `HIPAA penalties for improper data disposal range from $100 to $50,000 per violation per record. In healthcare organizations running large device retirement programs, a single undocumented batch disposal can trigger penalty exposure across thousands of patient records.

The exposure mechanism doesn't require a breach. It requires only that an auditor ask for destruction documentation on a device batch that was handled informally.

The common mistake is treating HIPAA compliance as an active-systems problem while leaving retired devices in an undocumented state. The regulation applies to the entire lifecycle of the device — including its end.

A formal ITAD program with HIPAA-aligned data destruction protocols, device-level serialization and certificates of destruction closes this gap and produces the documentation an audit requires.

${PROBLEM_DATA['data-exposure-risk'].consequence}`,
  ],
  'chain-of-custody-failures': [
    `Chain-of-custody failure in ITAD is a provability problem, not a paperwork problem. When a regulator asks for proof that a device was handled correctly from retirement to destruction, undocumented handoffs produce no answer.

Organizations with multi-location IT infrastructure average 3–7 undocumented device handoffs before final disposition. Each handoff without a signed receipt or system record is a gap in the compliance record.

The common mistake is treating the final disposition certificate as sufficient — assuming that a certificate of destruction at the end covers the chain of events leading to it. It does not. Regulators examine each handoff point.

A formal ITAD program establishes documented handoffs at every transition: IT collection, internal transport, vendor receipt, processing, and final disposition — producing a complete chain that holds up to examination.

${PROBLEM_DATA['chain-of-custody-failures'].cost1}`,
    `Regulatory frameworks including HIPAA, SOX and FERBA require demonstrable chain-of-custody evidence for data-bearing device disposal. Missing documentation — even for a single device in an otherwise compliant program — creates exposure that cannot be remediated after the fact.

The gap is typically not intentional. It is structural: informal collection processes, undocumented internal transport, and vendor receipts that list batch counts rather than individual device serial numbers.

The common mistake is believing that a certificate of recycling or destruction from the end vendor is enough. It covers the final step. It does not cover the steps before it.

A complete chain-of-custody program serializes every device at collection and maintains unbroken documentation through each transition — so the answer to an audit request is a complete record, not a partial one.

${PROBLEM_DATA['chain-of-custody-failures'].cost2}`,
    `A chain-of-custody gap creates compliance exposure that cannot be closed retroactively. This is the defining characteristic of the risk: the documentation window is open only during the process. Once the process is complete without documentation, the gap is permanent.

Legal liability from undocumented device handoffs averages 3–5x the direct compliance penalty in regulated industries — because the absence of documentation shifts the burden of proof in ways that are difficult to defend.

The common mistake is treating chain-of-custody as an administrative function rather than a compliance requirement. It is documented in HIPAA, SOX, FERBA and GLBA as a specific obligation, not a best practice.

A certified ITAD program produces serialized documentation at each step — collection receipt, transport manifest, processing confirmation, destruction certificate — creating a complete, auditable record from device retirement to final disposition.

${PROBLEM_DATA['chain-of-custody-failures'].consequence}`,
  ],
  'compliance-gaps': [
    `HIPAA, SOX, FERBA and GLBA each require documented evidence of data destruction and device disposition. Organizations without formal ITAD programs routinely fail these requirements during audit — not from deliberate noncompliance, but from the absence of documentation that was never collected.

The failure pattern is consistent: devices are retired through informal channels, disposal is managed by individual IT staff or facilities teams, and no centralized record is maintained. The audit asks for documentation. There is none.

The common mistake is assuming that device retirement falls outside the scope of compliance frameworks. Every major data regulation includes provisions for the end of the device lifecycle — and most auditors specifically examine this area.

A formal ITAD program aligns device retirement with applicable compliance frameworks — producing the destruction records, chain-of-custody documentation, and serialized device records that audits require.

${PROBLEM_DATA['compliance-gaps'].cost1}`,
    `Regulatory auditors examining IT asset disposition look for three things: documented destruction method, device-level serialization records, and chain-of-custody from collection to final disposition. Most informal disposal programs can provide none of the three.

The exposure is not theoretical. Average regulatory penalties from improper IT asset disposition run $500,000–$2 million per audit event — before legal defense costs, which typically add another 2–3x.

The common mistake is treating compliance as an active-systems problem while managing retired devices through informal channels. The compliance obligation does not end when the device is removed from the network.

Aligning device retirement with a certified ITAD program closes all three of the audit checkpoints: destruction method is certified and documented, serialization records tie each device to its destruction event, and chain-of-custody covers each handoff.

${PROBLEM_DATA['compliance-gaps'].cost2}`,
    `Compliance failures related to IT asset disposition compound across devices. A single audit finding covering 500 devices disposed without documentation generates penalty exposure for each device — at per-record penalty rates, the math compounds rapidly in organizations with large device inventories.

The trigger is typically not a breach. It is an audit request, an employee complaint, a third-party discovery, or a device showing up on a secondary market with the organization's data still on it.

The common mistake is waiting for an incident to build a formal ITAD program. By the time the trigger arrives, the documentation gap is already permanent — and the compliance exposure is already fixed.

A proactive ITAD program converts the compliance obligation from a chronic background risk to a documented, defensible practice — one that produces audit-ready records without requiring a retroactive reconstruction.

${PROBLEM_DATA['compliance-gaps'].consequence}`,
  ],
  'e-waste-mismanagement': [
    `Electronics contain lead, mercury, cadmium and beryllium. These materials are regulated under federal and state hazardous waste laws. The organization that generated the waste owns the liability — not the hauler, unless the hauler was specifically certified to accept it.

E-waste represents roughly 2% of landfill volume but accounts for approximately 70% of toxic waste in landfills. Organizations that route retired electronics through general waste streams — dumpsters, trash, or uncertified vendors — create environmental compliance exposure regardless of intent.

The common mistake is treating electronics recycling as equivalent to certified e-waste disposal. They are not the same, and the regulatory distinction matters in an enforcement action.

A certified e-waste management program ensures that retired electronics are handled by R2- or e-Stewards-certified vendors, producing the disposal documentation that satisfies RCRA and state environmental compliance requirements.

${PROBLEM_DATA['e-waste-mismanagement'].cost1}`,
    `EPA penalties for hazardous waste violations from improper electronics disposal range from $25,000 to $70,000 per day per violation. Environmental remediation costs from improper e-waste disposal run $200,000–$5 million per contamination site — costs that attach to the generating organization.

The liability mechanism is direct: under RCRA, the organization that generates hazardous waste is responsible for its proper disposal regardless of which vendor physically removes it. A vendor without proper certification does not transfer liability — it compounds it.

The common mistake is assuming that handing devices off to any recycler resolves the liability. It does not without documentation that the recycler is certified to handle the specific materials in the devices.

Working with a certified ITAD vendor that provides documented chain-of-custody through final disposition satisfies the generator obligation under applicable environmental regulations.

${PROBLEM_DATA['e-waste-mismanagement'].cost2}`,
    `Most organizations generating e-waste don't see the environmental liability as a direct business risk until it surfaces in an enforcement action. By then, the devices are already disposed of, the documentation is absent, and the regulatory exposure is fixed.

The risk is not limited to large enterprises. Any organization that retires electronics is a hazardous waste generator under federal law — with corresponding obligations for proper handling, documentation and disposal through certified channels.

The common mistake is conflating "recycling" with "compliant disposal." Consumer recycling programs, municipal e-waste events, and retail trade-in programs do not meet the documentation requirements for commercial hazardous waste generators.

A formal ITAD program with certified environmental partners produces the disposal documentation that satisfies federal and state e-waste requirements — closing the liability gap that informal recycling channels leave open.

${PROBLEM_DATA['e-waste-mismanagement'].consequence}`,
  ],
  'device-wiping-assumptions': [
    `A standard factory reset on most operating systems removes the file table that points to data. It does not remove the data. Forensic recovery of data from factory-reset devices succeeds at rates above 60% in controlled testing.

This is not a theoretical vulnerability. It is a documented, reproducible outcome that any organization with a certified forensic examiner can demonstrate on devices that passed through a standard IT wipe process.

The common mistake is treating internal IT wiping — whether manual or scripted — as equivalent to certified data sanitization under NIST 800-88 or DoD sanitization standards. These are different processes with different verification requirements.

A certified data destruction process applies NIST 800-88-aligned methods, performs verification passes, and produces device-level certificates that document the sanitization method and confirm its completion — providing the evidence that an audit or incident investigation would require.

${PROBLEM_DATA['device-wiping-assumptions'].cost1}`,
    `Software-only wiping without certified verification leaves recoverable data on 25–40% of devices processed through typical enterprise IT retirement programs. The assumption that a wipe is complete is wrong in roughly one out of three to four devices — and there is no way to identify which ones without verification testing.

NIST 800-88 and DoD sanitization standards specify wiping methods and verification requirements that most internal IT wiping processes do not meet. The gap between internal practice and compliance standard is where data exposure concentrates.

The common mistake is equating operational completion — "we ran the wipe script" — with verified completion — "the wipe was confirmed to NIST 800-88 standards on this specific device." These are not the same thing, and compliance auditors understand the distinction.

Certified data destruction through a qualified ITAD program applies verified sanitization methods, documents the specific method used for each device, and produces certificates that close the gap between internal IT practice and documented compliance standards.

${PROBLEM_DATA['device-wiping-assumptions'].cost2}`,
    `The data exposure risk from inadequate wiping is not visible to the organization whose devices were affected — until a device shows up on a secondary market with its data intact, or a forensic investigation traces a breach back to a retired device.

At that point, the internal IT team's confidence in the wipe process is irrelevant. What matters is whether there is documentation of the sanitization method, verification confirmation, and a device-level certificate tying the method to the specific device.

The common mistake is building device retirement processes around IT operational efficiency rather than data security compliance requirements. These optimization criteria produce different outcomes — and the compliance outcome is the one that matters at audit time.

A certified ITAD program with documented, verified data sanitization converts the wiping assumption into a documented fact — one with a certificate number, a device serial number, and a date that an audit can verify.

${PROBLEM_DATA['device-wiping-assumptions'].consequence}`,
  ],
  'asset-value-recovery': [
    `Enterprise laptops retired within 3 years typically retain 25–40% of their original purchase price on secondary markets. Organizations that route all retired devices to recycling without a remarketing evaluation step lose this recovery value entirely — converting a partial asset into a disposal cost.

The math compounds across device refresh cycles. An organization retiring 1,000 laptops per year at an average original purchase price of $1,200 per device, with a 30% retention rate, is leaving $360,000 in recovery value on the table annually by bypassing remarketing.

The common mistake is treating retired devices as uniform disposal candidates rather than as a mixed inventory with differentiated recovery potential. The age, condition and model of each device determines its secondary market value — and that requires an evaluation step that most informal programs skip.

A formal asset recovery program applies market valuation, prepares devices for remarketing where value supports it, and routes remaining inventory to certified recycling — maximizing recovery across the full retirement cohort.

${PROBLEM_DATA['asset-value-recovery'].cost1}`,
    `Asset value declines 15–25% per quarter from delayed disposition. Devices held in storage for 6–12 months before disposition often recover 40–60% less than the same devices retired promptly — making every month of deferred action a direct cost against the asset recovery budget.

The average enterprise organization retires 15–25% of its device inventory each year. Without a formal asset recovery program, those devices generate zero recovery value and are instead treated as a cost center — with disposal fees replacing the recovery revenue a properly structured program would generate.

The common mistake is treating device retirement as a security and compliance problem without accounting for the financial dimension. The asset recovery component of a formal ITAD program converts the retirement event from a pure cost into a partial cost offset.

Prompt, consistent device retirement through a program with a remarketing component captures the highest available recovery window — before quarterly value decline eliminates the margin.

${PROBLEM_DATA['asset-value-recovery'].cost2}`,
    `Retired devices are depreciating assets with a documented recovery window. The window for maximum value recovery on a 3-year-old enterprise laptop is measured in months, not years — and every quarter of deferred disposition reduces the recovery check by 15–25%.

The financial case for a formal asset recovery program is straightforward: recovery revenue from a remarketing-eligible device cohort reduces the net cost of the ITAD program, often substantially. The devices themselves pay for a portion of their own secure retirement.

The common mistake is routing all retired devices to the same disposition path — recycling — without a differentiated evaluation step. This treats a high-value laptop with three years of useful life remaining the same as a fully depreciated desktop with no secondary market.

A properly structured ITAD program evaluates each device cohort, applies market-appropriate remarketing where value supports it, and documents the entire process — recovering financial value while maintaining the data security and compliance controls the retirement event requires.

${PROBLEM_DATA['asset-value-recovery'].consequence}`,
  ],
  'storage-cost-buildup': [
    `Organizations with unmanaged IT asset retirement programs typically accumulate 3–8 months of undisposed devices before acting. At a carrying cost of $50–$150 per device per month in facility space, IT staff time and security overhead, large device inventories generate significant hidden cost while sitting unused.

A mid-size organization retiring 500 devices per year, with an average 5-month disposition lag, is carrying 200+ devices in pending status at any given time — generating $10,000–$30,000 per month in carrying cost that does not appear on any tracked IT line item.

The common mistake is treating storage of retired devices as cost-free because it draws on existing facility capacity. The space has an opportunity cost, the staff time has an allocation cost, and the data risk has a potential compliance cost — none of which are zero.

A consistent ITAD program with defined retirement cadence eliminates the accumulation cycle — converting a chronic background cost into a managed, predictable process.

${PROBLEM_DATA['storage-cost-buildup'].cost1}`,
    `The average enterprise organization has 12–18% of its device inventory in an "end-of-life pending disposition" state at any given time. These devices are tied-up capital, active storage cost, ongoing data security liability and depreciating assets — simultaneously.

None of these cost categories appear on a standard IT budget line until a formal accounting is done. The storage cost is absorbed into facilities overhead. The IT staff time is absorbed into general operations. The data risk is unquantified until it surfaces.

The common mistake is managing device retirement reactively — addressing the accumulated inventory when it becomes a space problem rather than maintaining a consistent retirement cadence that prevents accumulation.

Establishing a regular disposition cadence through a formal ITAD program converts pending-disposition inventory from a background cost into a managed throughput — with predictable cost, predictable timing and no accumulation cycle.

${PROBLEM_DATA['storage-cost-buildup'].cost2}`,
    `Devices in storage carry the same data exposure risk as active devices. Physical security for the storage area, inventory tracking for audit purposes, and administrative overhead for managing the pending-disposition queue are active costs — not deferred ones.

The cost compounds when disposition is finally triggered on a large accumulated inventory: logistics, processing, certification and remarketing evaluation all scale with volume. A consistent program with smaller, regular batches is more cost-efficient than periodic large-batch clearance.

The common mistake is framing deferred disposition as a neutral waiting state — when in reality it is an active accumulation of cost, risk and value loss on devices that are no longer generating operational value.

A defined retirement cadence, executed through a formal ITAD program, eliminates the accumulation dynamic and converts device retirement from a periodic, high-cost event into a routine, predictable process.

${PROBLEM_DATA['storage-cost-buildup'].consequence}`,
  ],
  'multi-location-disposal': [
    `Organizations with 10 or more locations managing IT asset disposition independently experience compliance documentation inconsistency in 65–80% of locations. Each location manages its own disposal process with its own standards — or no standards at all — producing a compliance record that cannot be consolidated for an enterprise audit.

During an audit, the documentation request is enterprise-wide. A compliant process at headquarters does not compensate for an undocumented process at a regional office. The auditor reviews the complete record — and the complete record reflects the weakest location.

The common mistake is assuming that enterprise compliance can be built from independent location-level programs. It cannot. Compliance documentation requires consistent formats, consistent vendor standards, and a centralized record that covers every location.

A centralized ITAD program with standardized vendor management, consistent documentation formats and consolidated certificate records produces the enterprise-wide audit record that distributed programs cannot.

${PROBLEM_DATA['multi-location-disposal'].cost1}`,
    `Multi-location IT asset retirement programs without centralized vendor management average 3–6 different disposal vendors per organization. Each vendor has different documentation formats, different chain-of-custody protocols and different certificate standards — producing a patchwork record that fails enterprise audit requirements.

A compliance audit failure in a multi-location organization frequently traces to a single non-compliant location. The chain of custody across an organization is only as strong as its weakest location — and one site's documentation failure can trigger enterprise-wide examination.

The common mistake is treating each location's disposal process as an independent compliance matter. When a regulator examines device disposition, the scope is enterprise-wide. No location is isolated from the compliance record of the whole.

Centralizing vendor selection and documentation standards across all locations — through a single ITAD partner or a tightly managed vendor program — produces the consistent record that enterprise compliance requires.

${PROBLEM_DATA['multi-location-disposal'].cost2}`,
    `The compliance documentation problem in multi-location programs is structural, not behavioral. Even when individual location managers are doing their best, independent processes produce inconsistent formats, inconsistent chain-of-custody terminology and inconsistent certificate standards that cannot be consolidated after the fact.

The audit exposure is not just about failed locations. It is about the absence of a consolidated enterprise record that covers every location, every device, every disposition event — across all years under review.

The common mistake is adding locations to an informal disposal program without adding the infrastructure to maintain consistent documentation standards. Growth in locations multiplies the compliance exposure of an informal program proportionally.

A formal ITAD program with enterprise account management, standardized documentation and consolidated reporting converts multi-location complexity from a compliance liability into a managed, auditable program.

${PROBLEM_DATA['multi-location-disposal'].consequence}`,
  ],
  'reverse-logistics-complexity': [
    `Enterprise IT retirement events — office relocations, equipment refreshes, facility closures — generate device volumes that exceed in-house logistics capacity in roughly 70% of cases. The overflow creates storage accumulation, undocumented interim handoffs and chain-of-custody gaps that compound the compliance exposure from the outset.

Reverse logistics for retired electronics requires coordinated management of collection, packaging, transport, chain-of-custody documentation and final disposition across multiple transition points. Each transition point without documentation is a compliance gap.

The common mistake is managing IT retirement logistics through general freight carriers or internal staff — neither of whom are equipped to maintain the chain-of-custody documentation that ITAD compliance requires across each transport leg.

A certified ITAD logistics program handles collection, serialized manifesting, secure transport, and chain-of-custody documentation from the first pickup to final disposition — closing the documentation gaps that general logistics processes leave open.

${PROBLEM_DATA['reverse-logistics-complexity'].cost1}`,
    `Device damage and documentation gaps during reverse logistics transport affect 15–25% of enterprise IT retirement shipments managed without dedicated ITAD logistics support. Inadequate packing, mixed carrier streams and undocumented interim storage are the most common causes.

The damage problem is a financial problem: damaged devices lose secondary market value and may require specialized disposal. The documentation gap problem is a compliance problem: gaps in the transport chain-of-custody record cannot be reconstructed after the fact.

The common mistake is treating device retirement as an outbound logistics problem — moving devices from point A to point B — rather than as a chain-of-custody management problem where documentation quality at each step determines the compliance outcome.

Working with an ITAD partner that manages the full reverse logistics chain — collection, serialization, transport documentation, secure processing and disposition — eliminates the handling and documentation failures that general logistics approaches generate.

${PROBLEM_DATA['reverse-logistics-complexity'].cost2}`,
    `The complexity of reverse logistics for retired electronics scales with organizational size and geographic distribution. An organization with 15 locations retiring devices across multiple refresh cycles simultaneously faces a logistics coordination problem that in-house IT staff cannot manage while maintaining compliance documentation standards.

The compliance risk is not in the final disposition step — it is in every step before it. Undocumented collection, informal transfer to a transport carrier and undocumented interim staging are all chain-of-custody gaps that appear in the record as evidence of noncompliance.

The common mistake is selecting an ITAD vendor based on destination processing capability while managing the upstream logistics informally. The compliance documentation chain is broken before the device reaches the vendor if the upstream steps are not managed with the same rigor.

A complete ITAD program manages the reverse logistics chain as a compliance function — not as a shipping function — from the first device collected to the final disposition certificate issued.

${PROBLEM_DATA['reverse-logistics-complexity'].consequence}`,
  ],
  'informal-disposal-risk': [
    `Employee-managed IT disposal — devices left at electronics drop-off sites, traded in through retail programs, or discarded through informal channels — bypasses chain-of-custody requirements entirely. There is no documentation, no verified data destruction and no audit trail.

When a compliance audit requests chain-of-custody and data destruction documentation for all retired devices in a review period, the answer from an informal program is silence. Regulators treat the absence of documentation as evidence of noncompliance, not as an ambiguity.

The common mistake is treating informal disposal as a solved problem because devices leave the building. Leaving the building without documentation is not the same as leaving the compliance record satisfied.

A formal ITAD program creates the documentation infrastructure that informal channels cannot — serialized collection records, chain-of-custody from pickup to disposition, and certified data destruction certificates for each device.

${PROBLEM_DATA['informal-disposal-risk'].cost1}`,
    `Retail trade-in programs, consumer recycling drop-offs and informal e-waste collection events do not meet enterprise data destruction or chain-of-custody requirements. The certifications posted at consumer recycling locations are consumer-grade — they do not satisfy HIPAA, SOX or GLBA chain-of-custody obligations for business device retirement.

35–45% of small and mid-size organizations retire IT assets through informal channels. Most don't recognize the compliance exposure until an audit, an incident, or a device reappearing with organizational data attached makes it visible.

The common mistake is equating physical device removal from the premises with documented compliance. Compliance is not about where the device goes. It is about whether the organization can prove, with documentation, how it got there and what happened to the data on it.

A formal ITAD program converts the informal disposal default into a documented, auditable process — replacing the compliance gap with a certificate record that survives an audit review.

${PROBLEM_DATA['informal-disposal-risk'].cost2}`,
    `The compliance exposure from informal disposal is not proportional to the number of devices. A single device on a secondary market with recoverable organizational data — tied back to an informal disposal event — can trigger a compliance investigation that spans the entire device retirement history of the organization.

The documentation gap from informal disposal is permanent. It cannot be corrected after the device leaves through an undocumented channel. The window for creating the record closes at the moment of disposal.

The common mistake is framing informal disposal as a cost-saving measure. The cost saving on disposal fees is typically $10–$30 per device. The compliance exposure from the absence of documentation is measured in a different order of magnitude.

A formal ITAD program is not a cost center. It is a compliance infrastructure investment — one that produces the documentation records that protect the organization when an audit or incident investigation arrives.

${PROBLEM_DATA['informal-disposal-risk'].consequence}`,
  ],
}

// ─── BUSINESS IMPACTS ────────────────────────────────────────────────────────
// 1 per problem, 10 total
const BUSINESS_IMPACTS: Record<string, string> = {
  'data-exposure-risk': `Organizations that retire devices without certified data destruction and documented chain-of-custody carry ongoing data exposure liability on every device that has left the building — exposure that converts to financial and regulatory consequence when an incident or audit surfaces the gap.`,
  'chain-of-custody-failures': `A chain-of-custody gap in IT asset disposition is an unfillable audit hole. The financial consequence ranges from direct compliance penalties to legal defense costs averaging 3–5x the regulatory fine — all tied to documentation that should have been collected at the time of disposal.`,
  'compliance-gaps': `Compliance failure in IT asset disposition triggers penalties under HIPAA, SOX, FERBA and GLBA that compound across devices. An audit covering 500 undocumented devices at per-record penalty rates creates regulatory exposure in the hundreds of thousands to millions of dollars — for a documentation gap, not a breach.`,
  'e-waste-mismanagement': `Environmental liability from improper electronics disposal attaches to the generating organization under federal law. EPA penalties of $25,000–$70,000 per day per violation — plus potential remediation costs reaching $5 million per contamination site — are the financial consequence of treating e-waste as general trash.`,
  'device-wiping-assumptions': `Data remanence on factory-reset or software-wiped devices is a documented risk at rates of 25–60%. When a device with recoverable data reaches an unintended recipient, the compliance and financial exposure is identical to a network breach — with the added problem that the organization believed the data was destroyed.`,
  'asset-value-recovery': `Enterprise laptops retired within 3 years retain 25–40% of purchase price in secondary markets. Organizations routing all retired devices directly to recycling convert this recovery value into disposal cost — a financial outcome that compounds annually across full device refresh cycles.`,
  'storage-cost-buildup': `Unmanaged IT retirement inventory generates $50–$150 per device per month in carrying cost while simultaneously declining in secondary market value at 15–25% per quarter. Deferred disposition is not cost-neutral — it is a compounding financial loss on assets that have already been replaced.`,
  'multi-location-disposal': `A single non-compliant location in a multi-location IT disposal program can trigger enterprise-wide regulatory examination. The compliance record is evaluated as a whole — and 65–80% of independent multi-location programs cannot produce consistent documentation across all sites when an audit requires it.`,
  'reverse-logistics-complexity': `Device damage and chain-of-custody gaps affect 15–25% of enterprise IT retirement shipments managed without dedicated ITAD logistics support. These failures create simultaneous financial exposure from lost asset value and compliance exposure from broken documentation chains — both of which are avoidable with the right logistics infrastructure.`,
  'informal-disposal-risk': `Informal device disposal creates uninsurable compliance exposure: no chain-of-custody record, no data destruction certificate and no audit defense. When a regulator requests documentation for retired devices and the answer is silence, the absence is treated as noncompliance — and the penalty exposure is fixed at the volume of undocumented devices.`,
}

// ─── CTAS ─────────────────────────────────────────────────────────────────────
const CTAS: string[] = [
  `Follow for more ITAD, data security, and electronics recycling insights.`,
  `Follow for more practical breakdowns on retiring technology assets safely.`,
  `Follow for more insights on IT asset disposition, compliance, and risk reduction.`,
  `Follow for more operator-level IT and reverse logistics insights.`,
  `Visit ${COMPANY.website} to learn how ${COMPANY.name} handles IT asset disposition and data security.`,
]

// ─── POST IDEAS ───────────────────────────────────────────────────────────────
// 10 ideas per problem, 100 total
const POST_IDEAS: Record<string, Array<{ title: string; angle: string; rank: number; painClarity: number; financialImpact: number; tension: number }>> = {
  'data-exposure-risk': [
    { title: 'The Data Breach You Create at Device Retirement', angle: 'Hidden Risk', rank: 9, painClarity: 91, financialImpact: 94, tension: 92 },
    { title: 'Why Factory Reset Is Not Data Destruction', angle: 'Common Operational Mistake', rank: 8, painClarity: 88, financialImpact: 87, tension: 90 },
    { title: 'Your Retired Laptops Are Your Biggest Data Risk', angle: 'Contrarian Take', rank: 9, painClarity: 93, financialImpact: 91, tension: 95 },
    { title: 'HIPAA Penalties Don\'t Require a Network Breach', angle: 'Compliance Failure', rank: 10, painClarity: 96, financialImpact: 97, tension: 93 },
    { title: '35–40% of Used Hard Drives Have Recoverable Data', angle: 'Data Security Warning', rank: 9, painClarity: 94, financialImpact: 90, tension: 92 },
    { title: 'Before: Device Collected and Stored. After: Certified Destruction Record Issued.', angle: 'Before/After Improvement', rank: 7, painClarity: 82, financialImpact: 80, tension: 78 },
    { title: 'What "Certified Data Destruction" Actually Means', angle: 'Buyer Education', rank: 7, painClarity: 79, financialImpact: 77, tension: 75 },
    { title: 'The Moment Data Exposure Begins: Device Retirement, Not Device Breach', angle: 'Chain-of-Custody Breakdown', rank: 8, painClarity: 87, financialImpact: 85, tension: 88 },
    { title: 'The $4.45M Question: Where Are Your Retired Devices?', angle: 'Audit Readiness Breakdown', rank: 9, painClarity: 92, financialImpact: 95, tension: 91 },
    { title: 'Retired Devices as Depreciating Liabilities', angle: 'Asset Recovery Opportunity', rank: 6, painClarity: 75, financialImpact: 73, tension: 70 },
  ],
  'chain-of-custody-failures': [
    { title: 'You Cannot Reconstruct Chain of Custody After the Fact', angle: 'Compliance Failure', rank: 10, painClarity: 95, financialImpact: 92, tension: 97 },
    { title: 'Three to Seven Undocumented Handoffs Per Device', angle: 'Hidden Risk', rank: 9, painClarity: 90, financialImpact: 88, tension: 93 },
    { title: 'The Compliance Myth: "The Vendor Has a Certificate"', angle: 'Contrarian Take', rank: 9, painClarity: 91, financialImpact: 89, tension: 94 },
    { title: 'What Regulators Actually Examine in an ITAD Audit', angle: 'Audit Readiness Breakdown', rank: 8, painClarity: 86, financialImpact: 84, tension: 87 },
    { title: 'Chain of Custody Is Only as Strong as Its Weakest Handoff', angle: 'Chain-of-Custody Breakdown', rank: 10, painClarity: 97, financialImpact: 91, tension: 96 },
    { title: 'Before: Informal Device Handoffs. After: Serialized Chain-of-Custody Records.', angle: 'Before/After Improvement', rank: 7, painClarity: 81, financialImpact: 79, tension: 77 },
    { title: 'HIPAA, SOX, FERBA: What They Each Require for Device Disposition', angle: 'Buyer Education', rank: 7, painClarity: 80, financialImpact: 78, tension: 76 },
    { title: 'The Legal Liability Gap in Undocumented Device Handoffs', angle: 'Data Security Warning', rank: 8, painClarity: 85, financialImpact: 87, tension: 86 },
    { title: 'Why Batch Certificates Don\'t Satisfy Chain-of-Custody Requirements', angle: 'Common Operational Mistake', rank: 8, painClarity: 84, financialImpact: 83, tension: 85 },
    { title: 'Multi-Location Chain-of-Custody: The Gaps Nobody Maps', angle: 'Reverse Logistics Bottleneck', rank: 7, painClarity: 78, financialImpact: 76, tension: 80 },
  ],
  'compliance-gaps': [
    { title: 'The Audit Request Your Informal ITAD Program Cannot Answer', angle: 'Audit Readiness Breakdown', rank: 10, painClarity: 96, financialImpact: 94, tension: 97 },
    { title: 'Device Retirement Is a Compliance Event — Treat It Like One', angle: 'Contrarian Take', rank: 9, painClarity: 91, financialImpact: 90, tension: 93 },
    { title: 'Three Things Auditors Look For in IT Asset Disposition', angle: 'Buyer Education', rank: 8, painClarity: 85, financialImpact: 83, tension: 82 },
    { title: 'How Compliance Penalties Compound Across Device Volume', angle: 'Compliance Failure', rank: 10, painClarity: 95, financialImpact: 97, tension: 95 },
    { title: 'The HIPAA Violation That Starts in the IT Closet', angle: 'Hidden Risk', rank: 9, painClarity: 92, financialImpact: 93, tension: 91 },
    { title: 'Before: Undocumented Disposal. After: Audit-Ready Destruction Records.', angle: 'Before/After Improvement', rank: 7, painClarity: 80, financialImpact: 81, tension: 78 },
    { title: 'Why "We Recycled It" Is Not a Compliance Answer', angle: 'Common Operational Mistake', rank: 8, painClarity: 87, financialImpact: 86, tension: 88 },
    { title: 'SOX and Device Disposition: The Connection Most IT Teams Miss', angle: 'Data Security Warning', rank: 8, painClarity: 84, financialImpact: 85, tension: 83 },
    { title: 'The $500,000 Documentation Gap in Enterprise IT Retirement', angle: 'Chain-of-Custody Breakdown', rank: 9, painClarity: 89, financialImpact: 92, tension: 90 },
    { title: 'What a Proactive ITAD Program Looks Like at Audit Time', angle: 'Asset Recovery Opportunity', rank: 6, painClarity: 74, financialImpact: 72, tension: 69 },
  ],
  'e-waste-mismanagement': [
    { title: 'The Environmental Liability That Follows the Device, Not the Vendor', angle: 'Hidden Risk', rank: 9, painClarity: 89, financialImpact: 91, tension: 92 },
    { title: 'What "Recycled" Means vs. What "Compliantly Disposed" Means', angle: 'Buyer Education', rank: 8, painClarity: 83, financialImpact: 82, tension: 80 },
    { title: '$70,000 Per Day: The EPA Penalty Math for Improper E-Waste', angle: 'Compliance Failure', rank: 10, painClarity: 95, financialImpact: 97, tension: 94 },
    { title: 'Handing Devices to an Uncertified Vendor Doesn\'t Transfer Liability', angle: 'Contrarian Take', rank: 9, painClarity: 90, financialImpact: 88, tension: 93 },
    { title: 'The Hazardous Materials in Your IT Closet', angle: 'Data Security Warning', rank: 8, painClarity: 85, financialImpact: 84, tension: 86 },
    { title: 'Before: Dumpster Disposal. After: R2-Certified Processing with Environmental Certificates.', angle: 'Before/After Improvement', rank: 7, painClarity: 79, financialImpact: 80, tension: 76 },
    { title: 'RCRA and Electronics: What the Generating Organization Owes', angle: 'Audit Readiness Breakdown', rank: 8, painClarity: 84, financialImpact: 86, tension: 85 },
    { title: 'Why Consumer Recycling Drop-Offs Don\'t Satisfy Commercial E-Waste Requirements', angle: 'Common Operational Mistake', rank: 8, painClarity: 86, financialImpact: 85, tension: 87 },
    { title: 'E-Waste in the General Trash Stream: What the 70% Figure Means', angle: 'Chain-of-Custody Breakdown', rank: 7, painClarity: 81, financialImpact: 79, tension: 77 },
    { title: 'The Remediation Cost Range for Improper Electronics Disposal: $200K–$5M', angle: 'Reverse Logistics Bottleneck', rank: 9, painClarity: 91, financialImpact: 93, tension: 89 },
  ],
  'device-wiping-assumptions': [
    { title: 'Factory Reset Does Not Mean Data Destroyed', angle: 'Contrarian Take', rank: 10, painClarity: 97, financialImpact: 93, tension: 96 },
    { title: '60% Forensic Recovery Rate: The Number Behind the Wipe Assumption', angle: 'Data Security Warning', rank: 10, painClarity: 95, financialImpact: 92, tension: 97 },
    { title: 'NIST 800-88 vs. Your IT Team\'s Wipe Script: They Are Not the Same Standard', angle: 'Compliance Failure', rank: 9, painClarity: 91, financialImpact: 90, tension: 93 },
    { title: 'One in Three Wiped Devices Has Recoverable Data', angle: 'Hidden Risk', rank: 9, painClarity: 93, financialImpact: 91, tension: 94 },
    { title: 'The Verification Step Your Wipe Process Is Missing', angle: 'Common Operational Mistake', rank: 8, painClarity: 86, financialImpact: 85, tension: 88 },
    { title: 'Before: Internal IT Wipe. After: NIST 800-88 Certified Sanitization with Device-Level Certificate.', angle: 'Before/After Improvement', rank: 7, painClarity: 80, financialImpact: 82, tension: 79 },
    { title: 'What Certified Data Destruction Produces That IT Wiping Does Not', angle: 'Buyer Education', rank: 7, painClarity: 78, financialImpact: 77, tension: 75 },
    { title: 'The Audit Gap Between "We Wiped It" and "We Can Prove It Was Wiped"', angle: 'Audit Readiness Breakdown', rank: 9, painClarity: 90, financialImpact: 89, tension: 92 },
    { title: 'How Data Remanence Becomes a Breach Without a Network Intrusion', angle: 'Chain-of-Custody Breakdown', rank: 8, painClarity: 87, financialImpact: 88, tension: 86 },
    { title: 'SSD vs. HDD: The Wipe Method That Works for Each', angle: 'Buyer Education', rank: 6, painClarity: 73, financialImpact: 71, tension: 68 },
  ],
  'asset-value-recovery': [
    { title: 'The Recovery Check You\'re Leaving in the Recycling Bin', angle: 'Asset Recovery Opportunity', rank: 9, painClarity: 88, financialImpact: 95, tension: 89 },
    { title: '25–40% Recovery Rate: What Happens When You Skip the Remarketing Step', angle: 'Common Operational Mistake', rank: 8, painClarity: 85, financialImpact: 93, tension: 86 },
    { title: 'Value Declines 15–25% Per Quarter. What Is Your Disposition Timeline?', angle: 'Hidden Risk', rank: 9, painClarity: 87, financialImpact: 94, tension: 90 },
    { title: 'Retired Devices Are Not All Recycling. Some Are Revenue.', angle: 'Contrarian Take', rank: 8, painClarity: 84, financialImpact: 91, tension: 87 },
    { title: 'Before: All Devices to Recycling. After: Tiered Recovery Program with Remarketing Evaluation.', angle: 'Before/After Improvement', rank: 7, painClarity: 80, financialImpact: 88, tension: 77 },
    { title: 'What the Secondary Market Pays for a 3-Year-Old Enterprise Laptop', angle: 'Buyer Education', rank: 7, painClarity: 76, financialImpact: 86, tension: 72 },
    { title: 'The Financial Argument for Prompt IT Asset Retirement', angle: 'Reverse Logistics Bottleneck', rank: 8, painClarity: 83, financialImpact: 92, tension: 82 },
    { title: 'How Storage Time Erases Recovery Value Quarter by Quarter', angle: 'Storage Cost Buildup', rank: 8, painClarity: 82, financialImpact: 90, tension: 83 },
    { title: 'Why Finance and IT Need to Align on Device Retirement Timing', angle: 'Chain-of-Custody Breakdown', rank: 7, painClarity: 78, financialImpact: 85, tension: 74 },
    { title: 'Turning IT Retirement from a Cost Line into a Partial Cost Offset', angle: 'Asset Recovery Opportunity', rank: 9, painClarity: 86, financialImpact: 93, tension: 85 },
  ],
  'storage-cost-buildup': [
    { title: '$50–$150 Per Device Per Month: The Cost of the IT Closet', angle: 'Hidden Risk', rank: 9, painClarity: 90, financialImpact: 93, tension: 91 },
    { title: '12–18% of Your Device Inventory Is Generating Cost Without Output', angle: 'Common Operational Mistake', rank: 8, painClarity: 85, financialImpact: 89, tension: 86 },
    { title: 'Deferred Disposition Is Not a Neutral Choice', angle: 'Contrarian Take', rank: 9, painClarity: 89, financialImpact: 91, tension: 92 },
    { title: 'Retired Devices in Storage: Three Costs Accumulating Simultaneously', angle: 'Audit Readiness Breakdown', rank: 8, painClarity: 84, financialImpact: 88, tension: 85 },
    { title: 'Before: Accumulated Device Backlog. After: Regular Retirement Cadence.', angle: 'Before/After Improvement', rank: 7, painClarity: 79, financialImpact: 83, tension: 76 },
    { title: 'The IT Budget Line That Doesn\'t Appear Until You Add It Up', angle: 'Buyer Education', rank: 6, painClarity: 74, financialImpact: 78, tension: 70 },
    { title: 'Storage Cost vs. Remarketing Value: The Calculation That Changes the Conversation', angle: 'Asset Recovery Opportunity', rank: 8, painClarity: 82, financialImpact: 87, tension: 80 },
    { title: 'Why Accumulating Retired Devices Is a Data Security Event, Not a Storage Problem', angle: 'Data Security Warning', rank: 9, painClarity: 87, financialImpact: 86, tension: 90 },
    { title: 'The Compounding Cost of Waiting on IT Asset Disposition', angle: 'Chain-of-Custody Breakdown', rank: 8, painClarity: 83, financialImpact: 88, tension: 84 },
    { title: 'How a Defined Retirement Cadence Eliminates the Accumulation Cycle', angle: 'Reverse Logistics Bottleneck', rank: 7, painClarity: 77, financialImpact: 81, tension: 73 },
  ],
  'multi-location-disposal': [
    { title: 'One Non-Compliant Location Breaks the Compliance Chain for All of Them', angle: 'Compliance Failure', rank: 10, painClarity: 95, financialImpact: 93, tension: 96 },
    { title: '65–80% of Multi-Location Programs Can\'t Produce Consistent Documentation', angle: 'Audit Readiness Breakdown', rank: 9, painClarity: 91, financialImpact: 90, tension: 94 },
    { title: 'Three to Six Vendors Per Organization: What Independent Location Management Produces', angle: 'Chain-of-Custody Breakdown', rank: 8, painClarity: 85, financialImpact: 84, tension: 87 },
    { title: 'Before: Independent Location Disposal. After: Centralized ITAD Program.', angle: 'Before/After Improvement', rank: 7, painClarity: 80, financialImpact: 79, tension: 76 },
    { title: 'Why Your Headquarters Can\'t Cover for Your Regional Office at Audit Time', angle: 'Contrarian Take', rank: 9, painClarity: 89, financialImpact: 88, tension: 92 },
    { title: 'What a Multi-Location Compliance Record Needs to Contain', angle: 'Buyer Education', rank: 7, painClarity: 78, financialImpact: 77, tension: 74 },
    { title: 'The Hidden Risk in Each Location Managing Its Own Disposal Vendor', angle: 'Hidden Risk', rank: 9, painClarity: 90, financialImpact: 87, tension: 93 },
    { title: 'How to Standardize IT Asset Retirement Across 10, 50 or 200 Locations', angle: 'Reverse Logistics Bottleneck', rank: 8, painClarity: 83, financialImpact: 82, tension: 81 },
    { title: 'Multi-Location Data Security: The Weakest Link Defines the Standard', angle: 'Data Security Warning', rank: 9, painClarity: 88, financialImpact: 86, tension: 91 },
    { title: 'The Compliance Audit That Examines Every Location, Not Just Headquarters', angle: 'Common Operational Mistake', rank: 8, painClarity: 84, financialImpact: 83, tension: 85 },
  ],
  'reverse-logistics-complexity': [
    { title: '70% of Enterprise IT Retirement Events Exceed In-House Logistics Capacity', angle: 'Hidden Risk', rank: 9, painClarity: 88, financialImpact: 87, tension: 91 },
    { title: 'General Freight Carriers Are Not Chain-of-Custody Partners', angle: 'Common Operational Mistake', rank: 8, painClarity: 84, financialImpact: 83, tension: 87 },
    { title: '15–25% Device Damage Rate Without Dedicated ITAD Logistics', angle: 'Reverse Logistics Bottleneck', rank: 9, painClarity: 89, financialImpact: 88, tension: 92 },
    { title: 'The Documentation Gap That Opens Between Pickup and Processing', angle: 'Chain-of-Custody Breakdown', rank: 9, painClarity: 90, financialImpact: 87, tension: 93 },
    { title: 'Before: Mixed Carrier Transport. After: Dedicated ITAD Logistics with Serialized Manifests.', angle: 'Before/After Improvement', rank: 7, painClarity: 79, financialImpact: 78, tension: 75 },
    { title: 'What Reverse Logistics for IT Retirement Actually Requires', angle: 'Buyer Education', rank: 7, painClarity: 76, financialImpact: 75, tension: 72 },
    { title: 'Office Relocation as an ITAD Event: Why Most Companies Handle It Wrong', angle: 'Contrarian Take', rank: 8, painClarity: 85, financialImpact: 84, tension: 88 },
    { title: 'The Five Transition Points Where Chain of Custody Breaks', angle: 'Audit Readiness Breakdown', rank: 8, painClarity: 83, financialImpact: 82, tension: 85 },
    { title: 'Facility Closures and Device Retirement: The Compliance Risk Nobody Plans For', angle: 'Compliance Failure', rank: 9, painClarity: 87, financialImpact: 86, tension: 90 },
    { title: 'Why In-House IT Staff Can\'t Manage the Reverse Logistics Compliance Chain', angle: 'Data Security Warning', rank: 8, painClarity: 82, financialImpact: 81, tension: 83 },
  ],
  'informal-disposal-risk': [
    { title: '"Provide Chain-of-Custody Documentation for All Retired Devices." Can You?', angle: 'Audit Readiness Breakdown', rank: 10, painClarity: 97, financialImpact: 95, tension: 98 },
    { title: '35–45% of Organizations Retire Devices Through Informal Channels', angle: 'Data Security Warning', rank: 9, painClarity: 92, financialImpact: 91, tension: 94 },
    { title: 'The Consumer Recycling Drop-Off Does Not Meet Enterprise Compliance Requirements', angle: 'Common Operational Mistake', rank: 9, painClarity: 90, financialImpact: 89, tension: 92 },
    { title: 'Informal Disposal Creates Permanent Documentation Gaps', angle: 'Compliance Failure', rank: 10, painClarity: 96, financialImpact: 94, tension: 97 },
    { title: 'Before: Devices Retired Through Employee-Managed Channels. After: Documented ITAD Program.', angle: 'Before/After Improvement', rank: 7, painClarity: 80, financialImpact: 79, tension: 77 },
    { title: 'The $30 Disposal Fee Trade-Off vs. the Compliance Exposure It Creates', angle: 'Contrarian Take', rank: 9, painClarity: 89, financialImpact: 93, tension: 91 },
    { title: 'What the Absence of Documentation Means in a Compliance Audit', angle: 'Chain-of-Custody Breakdown', rank: 9, painClarity: 91, financialImpact: 90, tension: 93 },
    { title: 'Retail Trade-In Programs and the HIPAA Gap They Can\'t Fill', angle: 'Hidden Risk', rank: 8, painClarity: 86, financialImpact: 85, tension: 88 },
    { title: 'Why Employee-Managed Disposal Is an Unmanaged Compliance Risk', angle: 'Buyer Education', rank: 7, painClarity: 78, financialImpact: 77, tension: 75 },
    { title: 'Uninsurable Compliance Exposure: What Informal Disposal Actually Costs', angle: 'Asset Recovery Opportunity', rank: 8, painClarity: 83, financialImpact: 88, tension: 84 },
  ],
}

// ─── CALENDAR ENTRIES ─────────────────────────────────────────────────────────
// 30 entries cycling through all 10 problems, 3 days per problem
const CALENDAR_ENTRIES = [
  // data-exposure-risk: days 1–3
  {
    day: 1,
    topic: 'Data Exposure Risk',
    hook: HOOKS['data-exposure-risk'][0],
    angle: 'Hidden Risk',
    cta: CTAS[0],
  },
  {
    day: 2,
    topic: 'Data Exposure Risk',
    hook: HOOKS['data-exposure-risk'][1],
    angle: 'Data Security Warning',
    cta: CTAS[1],
  },
  {
    day: 3,
    topic: 'Data Exposure Risk',
    hook: HOOKS['data-exposure-risk'][2],
    angle: 'Compliance Failure',
    cta: CTAS[2],
  },
  // chain-of-custody-failures: days 4–6
  {
    day: 4,
    topic: 'Chain-of-Custody Failures',
    hook: HOOKS['chain-of-custody-failures'][0],
    angle: 'Chain-of-Custody Breakdown',
    cta: CTAS[3],
  },
  {
    day: 5,
    topic: 'Chain-of-Custody Failures',
    hook: HOOKS['chain-of-custody-failures'][1],
    angle: 'Audit Readiness Breakdown',
    cta: CTAS[4],
  },
  {
    day: 6,
    topic: 'Chain-of-Custody Failures',
    hook: HOOKS['chain-of-custody-failures'][2],
    angle: 'Hidden Risk',
    cta: CTAS[0],
  },
  // compliance-gaps: days 7–9
  {
    day: 7,
    topic: 'Compliance Gaps',
    hook: HOOKS['compliance-gaps'][0],
    angle: 'Audit Readiness Breakdown',
    cta: CTAS[1],
  },
  {
    day: 8,
    topic: 'Compliance Gaps',
    hook: HOOKS['compliance-gaps'][1],
    angle: 'Contrarian Take',
    cta: CTAS[2],
  },
  {
    day: 9,
    topic: 'Compliance Gaps',
    hook: HOOKS['compliance-gaps'][2],
    angle: 'Compliance Failure',
    cta: CTAS[3],
  },
  // e-waste-mismanagement: days 10–12
  {
    day: 10,
    topic: 'E-Waste Mismanagement',
    hook: HOOKS['e-waste-mismanagement'][0],
    angle: 'Compliance Failure',
    cta: CTAS[4],
  },
  {
    day: 11,
    topic: 'E-Waste Mismanagement',
    hook: HOOKS['e-waste-mismanagement'][1],
    angle: 'Hidden Risk',
    cta: CTAS[0],
  },
  {
    day: 12,
    topic: 'E-Waste Mismanagement',
    hook: HOOKS['e-waste-mismanagement'][2],
    angle: 'Buyer Education',
    cta: CTAS[1],
  },
  // device-wiping-assumptions: days 13–15
  {
    day: 13,
    topic: 'Device Wiping Assumptions',
    hook: HOOKS['device-wiping-assumptions'][0],
    angle: 'Contrarian Take',
    cta: CTAS[2],
  },
  {
    day: 14,
    topic: 'Device Wiping Assumptions',
    hook: HOOKS['device-wiping-assumptions'][1],
    angle: 'Data Security Warning',
    cta: CTAS[3],
  },
  {
    day: 15,
    topic: 'Device Wiping Assumptions',
    hook: HOOKS['device-wiping-assumptions'][2],
    angle: 'Common Operational Mistake',
    cta: CTAS[4],
  },
  // asset-value-recovery: days 16–18
  {
    day: 16,
    topic: 'Asset Value Recovery',
    hook: HOOKS['asset-value-recovery'][0],
    angle: 'Asset Recovery Opportunity',
    cta: CTAS[0],
  },
  {
    day: 17,
    topic: 'Asset Value Recovery',
    hook: HOOKS['asset-value-recovery'][1],
    angle: 'Common Operational Mistake',
    cta: CTAS[1],
  },
  {
    day: 18,
    topic: 'Asset Value Recovery',
    hook: HOOKS['asset-value-recovery'][2],
    angle: 'Hidden Risk',
    cta: CTAS[2],
  },
  // storage-cost-buildup: days 19–21
  {
    day: 19,
    topic: 'Storage Cost Buildup',
    hook: HOOKS['storage-cost-buildup'][0],
    angle: 'Hidden Risk',
    cta: CTAS[3],
  },
  {
    day: 20,
    topic: 'Storage Cost Buildup',
    hook: HOOKS['storage-cost-buildup'][1],
    angle: 'Contrarian Take',
    cta: CTAS[4],
  },
  {
    day: 21,
    topic: 'Storage Cost Buildup',
    hook: HOOKS['storage-cost-buildup'][2],
    angle: 'Common Operational Mistake',
    cta: CTAS[0],
  },
  // multi-location-disposal: days 22–24
  {
    day: 22,
    topic: 'Multi-Location Disposal',
    hook: HOOKS['multi-location-disposal'][0],
    angle: 'Compliance Failure',
    cta: CTAS[1],
  },
  {
    day: 23,
    topic: 'Multi-Location Disposal',
    hook: HOOKS['multi-location-disposal'][1],
    angle: 'Audit Readiness Breakdown',
    cta: CTAS[2],
  },
  {
    day: 24,
    topic: 'Multi-Location Disposal',
    hook: HOOKS['multi-location-disposal'][2],
    angle: 'Chain-of-Custody Breakdown',
    cta: CTAS[3],
  },
  // reverse-logistics-complexity: days 25–27
  {
    day: 25,
    topic: 'Reverse Logistics Complexity',
    hook: HOOKS['reverse-logistics-complexity'][0],
    angle: 'Reverse Logistics Bottleneck',
    cta: CTAS[4],
  },
  {
    day: 26,
    topic: 'Reverse Logistics Complexity',
    hook: HOOKS['reverse-logistics-complexity'][1],
    angle: 'Common Operational Mistake',
    cta: CTAS[0],
  },
  {
    day: 27,
    topic: 'Reverse Logistics Complexity',
    hook: HOOKS['reverse-logistics-complexity'][2],
    angle: 'Hidden Risk',
    cta: CTAS[1],
  },
  // informal-disposal-risk: days 28–30
  {
    day: 28,
    topic: 'Informal Disposal Risk',
    hook: HOOKS['informal-disposal-risk'][0],
    angle: 'Audit Readiness Breakdown',
    cta: CTAS[2],
  },
  {
    day: 29,
    topic: 'Informal Disposal Risk',
    hook: HOOKS['informal-disposal-risk'][1],
    angle: 'Compliance Failure',
    cta: CTAS[3],
  },
  {
    day: 30,
    topic: 'Informal Disposal Risk',
    hook: HOOKS['informal-disposal-risk'][2],
    angle: 'Data Security Warning',
    cta: CTAS[4],
  },
]

// ─── REPURPOSING ──────────────────────────────────────────────────────────────
const REPURPOSING: string[] = [
  `Convert the hook and business impact into a Twitter/X single post or thread opener — the tension translates directly to short-form without the supporting data context.`,
  `Use the body paragraphs as the script framework for a 60–90 second YouTube short — each paragraph maps to a distinct on-screen segment with a single stat as the visual anchor.`,
  `Pull the specific statistics from the body and format them as an Instagram carousel — one stat per slide, with a compliance consequence statement as the final slide.`,
  `Rewrite the full post as a Facebook educational post targeting business owners — trim the regulatory specificity, lead with the operational cost, and close with a question that prompts comments.`,
  `Extract the post idea titles and angles as a content calendar for a 10-week authority-building series across platforms — each idea becomes a platform-specific piece with the same core argument.`,
]

// ─── IMPROVEMENT SUGGESTIONS ─────────────────────────────────────────────────
// 3 sets per problem, indexed by seed % 3
const IMPROVEMENT_SUGGESTIONS: Record<string, string[][]> = {
  'data-exposure-risk': [
    [
      `Name the specific compliance framework your target audience operates under — HIPAA for healthcare, GLBA for financial services, FERBA for education — to make the penalty range concrete and audience-specific`,
      `Add the specific device type and volume to the post — "500 decommissioned laptops" or "a batch of 200 clinical workstations" — to make the exposure risk tangible rather than abstract`,
      `Reference the specific data destruction standard your ITAD program applies — NIST 800-88, DoD 5220.22-M, or physical shredding — to give the audience a compliance reference point`,
    ],
    [
      `Specify the industry vertical in the hook — healthcare, financial services, education — to sharpen the regulatory consequence and make the audience feel the post is written for them`,
      `Add the per-record penalty range specific to the regulation most relevant to your audience — $100–$50,000 per record under HIPAA, or $10,000 per violation under GLBA — to make the financial exposure concrete`,
      `Reference the chain-of-custody documentation standard your ITAD program produces — serialized destruction certificates, device-level manifests — to differentiate your process from an informal one`,
    ],
    [
      `Include the forensic recovery success rate for the specific device type in the post — SSDs have different remanence characteristics than HDDs — to make the technical risk specific`,
      `Name the secondary market channel where recovered data surfaces — eBay, wholesale device liquidators — to make the exposure mechanism concrete for an audience that may not visualize how data leaves the building`,
      `Add the average time-to-discovery for data breaches involving retired devices — typically 6–18 months after disposal — to underscore why the risk doesn't feel immediate but is already accumulating`,
    ],
  ],
  'chain-of-custody-failures': [
    [
      `Name the specific regulatory framework that requires chain-of-custody documentation for your audience — HIPAA Security Rule 164.310(d)(2)(i), SOX Section 302, or FERBA — to move from general compliance language to specific obligation`,
      `Specify the handoff point where chain of custody most commonly breaks in your experience — internal IT collection, transport to a vendor loading dock, interim storage — to give the audience a concrete failure point to recognize`,
      `Reference the documentation format your ITAD program uses for each handoff — serialized collection manifests, signed transport receipts, vendor processing confirmations — to show what a complete chain looks like`,
    ],
    [
      `Add the specific number of undocumented handoff points that a typical multi-location enterprise IT retirement event creates — 3 to 7 — to make the structural risk visible and countable`,
      `Name the audit scenario where chain-of-custody failures surface most often — a HIPAA breach investigation, a SOX audit, or a device appearing on a secondary market — to make the consequence mechanism concrete`,
      `Include the average penalty range for a chain-of-custody failure finding in the regulatory framework your audience faces — to give the financial exposure a specific number rather than a range of vague severity`,
    ],
    [
      `Reference the specific certification standard your ITAD chain-of-custody process aligns with — R2, e-Stewards, NAID AAA — to give the audience a verifiable compliance anchor`,
      `Add the device volume threshold at which chain-of-custody documentation becomes operationally unmanageable without a dedicated ITAD program — to give mid-size organizations a concrete reference for when informal processes break down`,
      `Specify the documentation artifact produced at each chain-of-custody step — collection receipt with device serial number, transport manifest, processing confirmation, destruction certificate — to illustrate what completeness looks like versus what most informal programs produce`,
    ],
  ],
  'compliance-gaps': [
    [
      `Name the three specific compliance frameworks most relevant to your target audience — HIPAA, SOX and GLBA for a financial services audience — and note what each specifically requires for device disposition documentation`,
      `Add the per-device penalty exposure calculation for your audience's regulation — 500 undocumented devices at $100–$50,000 per record under HIPAA — to make the compounding math concrete`,
      `Reference the specific audit trigger most common in your industry — a breach investigation, a third-party audit, a device reappearing on a secondary market — to make the compliance failure scenario recognizable`,
    ],
    [
      `Specify the three documentation artifacts an auditor expects to see for each retired device — destruction certificate, chain-of-custody manifest, device-level serialization record — to give the audience a concrete audit checklist`,
      `Add the average time between an informal disposal event and a compliance audit finding — to underscore the delayed visibility of the risk and why organizations don't see it coming`,
      `Name the internal role most often left holding the compliance gap when an audit arrives — IT director, CISO or compliance officer — to make the organizational consequence personally relevant`,
    ],
    [
      `Include the specific section of the applicable regulation that addresses device disposition — HIPAA 45 CFR 164.310(d)(2)(i) for PHI on electronic media — so compliance officers can tie the post to their actual obligation`,
      `Add the average legal defense cost ratio for compliance failures in IT asset disposition — 2–3x the direct penalty — to expand the financial consequence beyond the regulatory fine alone`,
      `Reference the difference between a self-reported compliance gap and an auditor-discovered one — penalty multipliers, public disclosure requirements — to make the proactive argument financially concrete`,
    ],
  ],
  'e-waste-mismanagement': [
    [
      `Name the specific hazardous materials present in the device types your audience retires most — lead in CRT monitors, mercury in fluorescent backlights, cadmium in older batteries — to make the environmental liability concrete and specific`,
      `Add the specific EPA regulation that applies — RCRA, state-level e-waste laws, or both — and the penalty range for each to give compliance officers a specific legal reference`,
      `Reference the specific certification your ITAD program holds for e-waste handling — R2v3 or e-Stewards — to differentiate certified disposal from informal recycling`,
    ],
    [
      `Specify the documentation produced by certified e-waste disposal — downstream vendor records, material processing certificates, recycler certifications — to show what compliant disposal looks like versus informal recycling`,
      `Add the state-specific e-waste law most relevant to your audience — California SB 20, New York Electronic Equipment Recycling and Reuse Act — to make the regulatory landscape concrete for a specific geography`,
      `Include the generator liability mechanism under RCRA — cradle-to-grave responsibility for hazardous waste — and note that this applies regardless of which vendor physically handles the disposal`,
    ],
    [
      `Name the specific informal disposal channel most commonly used by your audience — general trash, retail take-back programs, unauthorized local recyclers — and explain why each fails to satisfy generator compliance obligations`,
      `Add the environmental remediation cost range for a contamination event tied to improper e-waste disposal — $200,000–$5 million per site — to give the financial exposure a concrete floor and ceiling`,
      `Reference the certification difference between consumer-grade recycling programs and commercial-grade ITAD e-waste processing — to give procurement teams the evaluation criteria for selecting a compliant vendor`,
    ],
  ],
  'device-wiping-assumptions': [
    [
      `Name the specific wiping standard your ITAD program applies — NIST 800-88 Clear, Purge or Destroy — and explain which device types qualify for each method, to give the audience a compliance reference point`,
      `Add the forensic recovery success rate for the specific storage media types your audience retires most — SSDs, NVMe drives, HDDs — since the rates differ and the audience may not know their own exposure`,
      `Reference the verification step that distinguishes certified sanitization from an internal IT wipe — the post-wipe verification pass and the resulting device-level certificate — to make the compliance gap concrete`,
    ],
    [
      `Specify the data types most commonly recovered from inadequately wiped enterprise devices — email archives, financial spreadsheets, customer records, HR files — to make the exposure risk vivid for a compliance audience`,
      `Add the regulatory implication of a wiping failure — HIPAA requires documented proof of sanitization, not just operational completion — to show why the standard matters beyond the technical outcome`,
      `Include the average cost of a data exposure incident tied to inadequate wiping versus a network breach — to contextualize the risk for an audience that may view wiping as a secondary concern`,
    ],
    [
      `Name the specific wipe validation tool or process your ITAD program uses — overwrite verification, degausser testing, shred specification — to give the audience a concrete artifact to ask vendors for`,
      `Add the device age range where software wiping is most unreliable — older HDDs with bad sectors, encrypted SSDs where key deletion may be the appropriate method — to make the technical specificity actionable`,
      `Reference the chain-of-custody implication of a wiping failure — a device with residual data that later surfaces represents both a data security failure and a chain-of-custody failure — to connect the two risk categories`,
    ],
  ],
  'asset-value-recovery': [
    [
      `Name the specific device types in your audience's retirement cycle that retain the most secondary market value — current-generation enterprise laptops, recent-model tablets, high-spec workstations — to make the recovery opportunity concrete`,
      `Add the specific secondary market channel that produces the best recovery rates for enterprise devices — wholesale resellers, certified refurbishers, direct B2B remarketing — to give procurement teams a basis for vendor evaluation`,
      `Include the remarketing-eligible percentage of a typical enterprise device retirement cohort — typically 30–50% of devices in a 3-year refresh cycle — to give finance teams a concrete recovery projection framework`,
    ],
    [
      `Specify the quarterly value depreciation curve for the device types your audience retires most — enterprise laptops lose 15–25% per quarter, desktop workstations depreciate faster — to make the timing argument financially specific`,
      `Add the net recovery calculation for a 1,000-device retirement batch with a 30% remarketing rate — original purchase price, retention percentage, recovery revenue — to give finance teams a concrete model`,
      `Reference the data security controls required for a device to be remarketing-eligible — certified wipe with documentation, cosmetic condition threshold, functional testing — to show that recovery and compliance are not in conflict`,
    ],
    [
      `Name the specific cost categories that a recovery program offsets — ITAD vendor fees, logistics costs, disposal fees — and show the net calculation against recovery revenue, to frame ITAD as a cost offset rather than a pure cost`,
      `Add the recovery value comparison between prompt disposition and 6-month deferred disposition — same device model, different timing — to make the quarterly depreciation argument concrete with a specific dollar figure`,
      `Include the internal stakeholder who typically controls the disposition timing decision — IT director, CFO, procurement — and note that aligning these roles on timing is the operational change with the highest financial impact`,
    ],
  ],
  'storage-cost-buildup': [
    [
      `Name the specific cost categories contributing to the per-device monthly carrying cost — square footage at your facility's cost-per-square-foot, IT staff hours for inventory management, security overhead — to give operations leaders a calculation they can run on their own inventory`,
      `Add the inventory percentage that is typically in "pending disposition" at organizations without a formal ITAD program — 12–18% — and multiply by a specific device count to make the accumulated cost concrete for the audience`,
      `Reference the data security overhead specific to storage — periodic physical inventory for audit purposes, access controls for the storage area, incident response planning for stored devices — to expand the cost framing beyond floor space`,
    ],
    [
      `Specify the cost comparison between periodic large-batch clearance and a consistent retirement cadence — showing that regular small batches reduce per-device logistics and processing costs — to make the operational efficiency argument financially specific`,
      `Add the asset value loss that accumulates during a typical 5-month storage period — 15–25% per quarter means roughly 25–40% value loss over 5 months — to connect the storage cost argument to the asset recovery argument`,
      `Include the compliance implication of accumulated storage — devices in long-term pending disposition create inventory management gaps that affect chain-of-custody documentation if a device is lost or misplaced — to add a regulatory dimension to the cost framing`,
    ],
    [
      `Name the internal event that typically triggers a large-batch device clearance — an office move, a lease renewal, a facilities audit — and explain why event-driven clearance always costs more than cadence-driven clearance`,
      `Add the IT staff time estimate for managing a large accumulated device backlog — inventory, coordination, vendor scheduling, documentation — versus managing a consistent monthly retirement volume, to make the labor cost concrete`,
      `Reference the facility space opportunity cost for the storage area — what that square footage costs in rent or could generate in alternative use — to give operations and finance leaders a concrete number for the carrying cost calculation`,
    ],
  ],
  'multi-location-disposal': [
    [
      `Name the specific compliance framework that requires enterprise-wide documentation consistency — HIPAA covers all locations of a covered entity, SOX covers the entire public company — to make the single-location failure consequence concrete`,
      `Add the specific documentation inconsistency types that cause multi-location audit failures — different certificate formats, different chain-of-custody terminology, vendor records that don't tie to asset inventory — to give compliance officers a concrete failure list to check against`,
      `Reference the centralized documentation standard your ITAD program uses across all locations — single certificate format, serialized device records, consolidated reporting — to show what enterprise-wide compliance looks like in practice`,
    ],
    [
      `Specify the number of vendor relationships a 20-location organization typically has when each location manages its own disposal — 3–6 vendors with different documentation standards — and explain why this prevents consolidated audit records`,
      `Add the audit scope implication of a single-location compliance failure — a finding at one location can expand the audit scope to all locations — to make the enterprise-wide risk concrete for organizations that think of compliance location by location`,
      `Include the operational complexity comparison between managing 3–6 independent vendor relationships versus a single centralized ITAD account — to make the efficiency argument alongside the compliance argument`,
    ],
    [
      `Name the specific location types in multi-location organizations where compliance failures most often originate — smaller regional offices, distribution centers, retail locations — to help the audience identify their highest-risk sites`,
      `Add the documentation consolidation requirement for an enterprise compliance record — every location, every device, every disposition event, all in a consistent format — and note that this is operationally impossible with independent location management`,
      `Reference the enterprise account management structure your ITAD program uses — single point of contact, consistent vendor standards across all locations, consolidated reporting — to give procurement teams a concrete vendor requirement to evaluate against`,
    ],
  ],
  'reverse-logistics-complexity': [
    [
      `Name the specific reverse logistics scenarios where chain-of-custody failures are most common — office relocations with tight timelines, large facility closures, multi-location simultaneous refresh events — to make the risk concrete for operations leaders`,
      `Add the specific packaging and handling requirements for enterprise electronics in transit — device-level serialization before transport, appropriate packaging to prevent data-bearing media damage — to give the audience a concrete logistics standard to evaluate against`,
      `Reference the transport documentation your ITAD program produces — serialized pickup manifests, transport carrier chain-of-custody records, processing confirmation at the destination — to show what a complete reverse logistics record looks like`,
    ],
    [
      `Specify the device damage types that most affect secondary market value in transit — HDD damage from improper packing, screen damage from improper stacking, liquid damage from exposure — to make the financial risk concrete for asset recovery stakeholders`,
      `Add the carrier certification requirement for ITAD-compliant transport — not all freight carriers meet the chain-of-custody documentation standards required for data-bearing device shipments — to give procurement teams a specific vendor evaluation criterion`,
      `Include the interim storage risk that arises when reverse logistics exceed in-house capacity — devices staged in non-secure areas, undocumented interim handoffs — to connect the logistics bottleneck to the data security and compliance risks`,
    ],
    [
      `Name the internal role most often responsible for managing reverse logistics in enterprise IT retirement — IT operations, facilities management, procurement — and note that none of these roles are equipped to maintain ITAD chain-of-custody standards without specialized support`,
      `Add the volume threshold at which in-house IT retirement logistics become unmanageable without a dedicated ITAD partner — typically 200+ devices per event or 10+ simultaneous locations — to give the audience a concrete scale reference`,
      `Reference the event-specific logistics planning your ITAD program provides — pre-event inventory collection, device serialization at collection, transport scheduling, chain-of-custody handoff documentation — to show that the reverse logistics solution is a service, not just a pickup`,
    ],
  ],
  'informal-disposal-risk': [
    [
      `Name the specific informal disposal channels most commonly used by your target audience — retail trade-in programs, municipal e-waste events, employee-managed drop-offs — and explain why each fails to satisfy enterprise chain-of-custody requirements`,
      `Add the specific compliance question the audience cannot answer after informal disposal — "Provide the data destruction certificate and chain-of-custody record for each retired device from the past three years" — to make the audit failure concrete`,
      `Reference the specific certification that distinguishes a compliant ITAD vendor from an informal disposal channel — NAID AAA for data destruction, R2 or e-Stewards for e-waste processing — to give procurement teams a verifiable evaluation criterion`,
    ],
    [
      `Specify the regulatory treatment of the absence of documentation in a compliance audit — it is evidence of noncompliance, not an ambiguity — to make the documentation gap consequence concrete for compliance officers`,
      `Add the per-device cost comparison between informal disposal — $0–$10 disposal fee — and a formal ITAD program — $15–$50 per device including data destruction and documentation — to show that the cost difference is small relative to the compliance exposure it eliminates`,
      `Include the data recovery risk specific to informal disposal channels — consumer recycling programs do not perform enterprise-grade data destruction, and devices processed through these channels may retain recoverable data — to connect the disposal method to the data security risk`,
    ],
    [
      `Name the specific employee behavior that creates informal disposal exposure — taking a retired device home, leaving it at a recycling drop-off, trading it in at a retail store — and note that each of these behaviors is common and each creates a permanent chain-of-custody gap`,
      `Add the time window after informal disposal when the compliance exposure is permanently fixed — the documentation window closes at the moment of disposal — to underscore why informal disposal decisions cannot be corrected retroactively`,
      `Reference the policy control that prevents informal disposal — a formal device retirement policy with defined ITAD vendor routing — and note that the policy is only effective when paired with a vendor program that employees can actually use without friction`,
    ],
  ],
}

// ─── EXPORT ───────────────────────────────────────────────────────────────────
export function generateLinkedIn(inputs: LinkedInInputs, seed = 0): LinkedInOutput {
  const prob = inputs.problem
  const idx = seed % 3
  const ctaIdx = seed % CTAS.length

  const hasDataPoints = true
  const hasCTA = true
  const hasConsequence = true
  const wordCount = 300

  const qualityScore = scoreContent(inputs, hasDataPoints, hasCTA, hasConsequence, wordCount)

  return {
    platform: 'linkedin',
    postIdeas: POST_IDEAS[prob] ?? [],
    fullPost: {
      hook: HOOKS[prob]?.[idx] ?? `Retired devices without documented disposal are an open compliance question.`,
      body: BODIES[prob]?.[idx] ?? `...`,
      businessImpact: BUSINESS_IMPACTS[prob] ?? `...`,
      cta: CTAS[ctaIdx],
    },
    calendar: CALENDAR_ENTRIES,
    repurposingSuggestions: REPURPOSING,
    qualityScore,
    improvementSuggestions: IMPROVEMENT_SUGGESTIONS[prob]?.[idx] ?? [
      'Name the specific compliance framework that applies to your target audience',
      'Add the specific device type and volume to make the risk concrete',
      'Reference the chain-of-custody documentation your ITAD program produces',
    ],
  }
}
