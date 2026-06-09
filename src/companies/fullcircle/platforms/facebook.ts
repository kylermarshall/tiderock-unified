import type { FacebookInputs, FacebookOutput } from '../types'
import { PROBLEM_DATA, COMPANY } from '../lib/companyProfile'
import { scoreContent } from '../lib/scoring'

// ---------------------------------------------------------------------------
// PRIMARY POSTS — Record<string, string[]> — 3 per problem
// Longer conversational Facebook posts (4-6 paragraphs) that educate and
// invite discussion. Each opens with a relatable scenario or question,
// explains the risk/problem, includes 1-2 data points, provides practical
// context, and ends with a CTA and invitation to comment.
// ---------------------------------------------------------------------------

const PRIMARY_POSTS: Record<string, string[]> = {
  'data-exposure-risk': [
    `If your office has a closet full of retired laptops, that is not just clutter. It may be stored data risk, a growing compliance gap, and a depreciating asset — all at the same time.

Here is what that looks like in practice. A device gets replaced, IT pulls it from the user, and it goes into a queue. That queue becomes a pile. The pile becomes a closet. Six months later, no one remembers exactly what data was on those machines, whether anything was wiped, or who handled them along the way.

The average cost of a data breach is $4.45 million (IBM 2023). That number does not require a sophisticated network intrusion. It applies equally when a retired device with unverified data ends up somewhere it should not be — which happens more often than most organizations expect.

The risk does not start at the moment of breach. It starts when a device leaves active use without documented data destruction and a clear chain of custody. By the time anyone realizes the exposure exists, the device may have changed hands multiple times.

A proper IT asset disposition program creates a paper trail from the moment a device is decommissioned to the moment data is verifiably destroyed. That documentation is what compliance audits ask for — and what informal processes cannot produce.

What does your organization's retired device process look like right now? We would be glad to share what a documented program actually involves.`,

    `Most data breaches get reported as network events — an intrusion, a phishing attack, a ransomware incident. What gets far less attention is the data risk that builds quietly inside organizations through retired devices that never received proper disposal.

Think about the devices that have left your organization in the past two years. Laptops refreshed during a hardware upgrade. Workstations replaced after a software migration. Tablets that were swapped out for newer models. Where did each one go, and what was verified about the data it held?

Studies of secondary market hard drives consistently show that 35–40% of devices contain recoverable data from previous owners — including email archives, financial records and personally identifiable information — despite claims of prior wiping. The devices that look blank often are not.

HIPAA penalties for improper data disposal run from $100 to $50,000 per violation per record. In an organization with thousands of patient or customer records, a single undocumented batch disposal can trigger exposure across records that span years.

The fix is not complicated. It is documentation, verified data destruction, and a chain of custody that can answer audit questions. But it requires treating device retirement as a compliance event, not a facilities task.

Have you audited your retired device process recently? Drop a comment or reach out — we are happy to walk through what a compliant program looks like.`,

    `Here is a scenario that plays out in organizations more often than IT teams want to acknowledge. A device refresh happens, old machines get pulled, and someone asks: "What do we do with these?" The answer is usually "IT will handle it" — which means the devices sit in a storage room while IT handles everything else.

Three months later, the devices are still there. Six months later, same story. A year later, someone arranges for a vendor pickup that was not vetted, generates no documentation and produces no certificate of data destruction.

The average data breach costs $4.45 million. That figure includes incidents traced to retired devices with unverified data destruction — not just network intrusions. Data on an unaccounted-for device is exposure whether or not anyone actively targeted it.

The gap between "IT wiped it" and "data destruction is verified and documented" is where most organizations live. Factory resets do not reliably remove data. Software wiping without verification leaves recoverable information on a significant share of devices. And none of it is defensible in a compliance audit without documentation.

A proper ITAD program is not expensive relative to the exposure it prevents. It produces certificates of data destruction, tracks device-level serial numbers and creates the paper trail that compliance frameworks require.

If you have retired devices sitting in storage right now, what is the plan for handling them? Let us know in the comments.`,
  ],

  'chain-of-custody-failures': [
    `There is a compliance problem in IT asset disposition that is almost invisible until an auditor asks a single question: "Show us the chain of custody for devices retired in the past three years."

For organizations without a formal ITAD program, the answer to that question is usually a partial inventory, a handful of emails, and a lot of gaps. And here is the hard part — those gaps cannot be filled retroactively. A chain of custody that was not documented when the handoff happened cannot be reconstructed after the fact.

Organizations with multi-location IT infrastructure average 3–7 undocumented device handoffs before final disposition. Each handoff is a transition point — IT to facilities, facilities to a vendor, one site to another. Every undocumented transition is an untracked data exposure point and a compliance gap in the record.

Regulatory frameworks including HIPAA, SOX and FERPA require demonstrable chain-of-custody evidence for data-bearing device disposal. "We have a policy" is not a chain of custody. A policy without documentation that proves it was followed is not defensible.

The practical fix is treating each device handoff as a compliance event — logged, signed and tied to the device's serial number. That sounds like more process than it needs to be until the audit arrives and those logs are the only thing standing between an organization and a penalty.

Has your organization ever mapped out the actual handoffs a device goes through between decommission and final disposal? It is often more steps than IT realizes.`,

    `When most people think about data security risks in IT asset disposition, they focus on the final step — wiping, destroying or recycling the device. What they undercount is the risk that accumulates at every handoff point between decommission and final disposition.

A device collected from a user goes to IT. IT moves it to storage. Storage gets picked up by a vendor. The vendor transports it to a processing facility. At each of those transitions, there is either a documented handoff record — or there is not.

When there is not, the compliance record has a gap. That gap is not just a paperwork problem. It is a provability problem. If a device with sensitive data shows up on a secondary market, and a regulator traces it back to your organization, the absence of chain-of-custody documentation is treated as evidence that handling was improper — not as an ambiguity.

HIPAA, SOX and GLBA all require chain-of-custody documentation for data-bearing device disposal. The standard is not just that devices were handled correctly. The standard is that handling can be proven.

Most organizations with informal processes cannot prove handling at any transition point after IT collection. A formal ITAD program creates a continuous record from the moment a device is decommissioned to the moment data is verified as destroyed.

How many undocumented handoffs does a retired device in your organization go through before final disposition? Drop a comment — this number surprises most IT managers when they trace it.`,

    `A compliance audit for IT asset disposition does not just ask what happened to devices. It asks for proof of what happened — at each step, with documentation that ties back to specific devices by serial number.

Most organizations with informal or internally managed device retirement programs can speak to their general practices. What they cannot produce is the device-level documentation that audits require. And there is a critical distinction between the two.

The chain-of-custody record is the evidence that a device was handled correctly at each transition point. Without it, there is no audit defense — not because the organization did something wrong, but because nothing about correct handling was documented when it happened.

Chain-of-custody gaps are not retroactively fixable. That is the hard constraint. An organization can implement a rigorous ITAD program going forward, but the gaps in historical records remain gaps. Compliance audits cover historical periods. That means every undocumented device from past disposal events is a permanent exposure point.

The solution is a forward-looking process change: document every handoff, track every device by serial number and require certificates of data destruction from verified ITAD vendors. That process creates the audit defense before it is needed.

What does your current retired device documentation look like? We are glad to share what a compliant chain-of-custody record actually requires.`,
  ],

  'compliance-gaps': [
    `Most organizations have an IT asset disposal process. Most also believe that process is compliant. The gap between those two beliefs and reality is where compliance audit findings originate.

HIPAA, SOX, FERPA and GLBA each require documented evidence of data destruction and device disposition. Not a policy that says devices are destroyed. Actual documentation, at the device level, tied to serial numbers, with chain-of-custody records and certificates of data destruction.

Regulatory auditors examining IT asset disposition look for three specific things: a documented destruction method, device-level serialization records, and chain-of-custody from collection to final disposition. Most informal disposal programs cannot produce any of the three. Not one.

The penalty math compounds quickly. A single audit finding covering 500 devices disposed without proper documentation generates penalty exposure for each device. At HIPAA per-record rates of $100 to $50,000 per violation, the exposure in organizations with large device inventories is not a theoretical number.

The reason most organizations are non-compliant is not deliberate. It is that device retirement was treated as an operational task rather than a compliance event. No one collected the documentation because no one was assigned to collect it.

A formal ITAD program changes the process so that compliance documentation is produced automatically at each step — not assembled retroactively when an audit request arrives.

Has your organization tested whether you could actually answer an auditor's IT asset disposition questions right now? What would the response look like?`,

    `There is a version of IT asset disposal compliance that feels complete but is not. The organization has a written policy. IT has a general practice of wiping devices before disposal. Devices go to a recycling vendor. Everything feels handled.

What is missing is everything auditors actually ask for: device-level serial numbers for every retired asset, documented destruction methods tied to each device, and a chain-of-custody record from IT collection through final disposition.

The policy document is not the compliance record. The practice of wiping devices is not verified data destruction. The recycling vendor certificate — if one was requested at all — is not a device-level data destruction certificate.

Compliance failures related to IT asset disposition compound across the device inventory. One audit finding that covers a batch disposal event of several hundred devices generates per-device penalty exposure. At regulatory penalty rates, organizations with multiple years of informal disposal history have exposure they have not quantified.

Most of this is correctable going forward. A formal ITAD program generates the documentation automatically, at each step, tied to each device. It turns what was a compliance gap into an audit-ready record.

What would it take for your organization to be able to answer an auditor's question about retired devices from the last three years? We are happy to walk through what the documentation gap typically looks like.`,

    `When a compliance audit covers IT asset disposition, it is asking a simple question: "Can you prove that each device containing sensitive data was handled correctly from the moment it was decommissioned?"

For organizations without a formal ITAD program, the honest answer to that question is almost always no — not because of negligence, but because the documentation was never collected. There was no process that generated device-level records, destruction certificates or chain-of-custody logs.

The problem with undocumented disposal is that it creates compliance exposure that is not theoretical. An audit finding covering a single disposal event — a batch of devices retired without proper documentation — can trigger penalty exposure across every device in that event. In organizations with regular device refresh cycles, those batches add up across multiple years.

HIPAA penalties start at $100 per violation per record and scale to $50,000. SOX compliance failures related to data handling carry their own penalty structure. The specific framework depends on the industry — but almost every regulated industry has one, and almost every informal ITAD process fails to meet it.

The path forward is a process that makes compliance documentation automatic rather than retroactive. Device-level tracking, verified destruction, chain-of-custody logs and certificates of data destruction generated at the time of disposal — not assembled later when an audit arrives.

What compliance framework governs your organization's data handling requirements? We work across healthcare, financial services, education and manufacturing — and the ITAD requirements are more similar across those frameworks than most organizations expect.`,
  ],

  'e-waste-mismanagement': [
    `Electronics contain materials that make them genuinely hazardous at end of life — lead, mercury, cadmium, beryllium. Most business owners and IT managers know this in a general way. What fewer understand is how directly the liability attaches to the organization that generated the waste, not the vendor that removed it.

Under EPA regulations and state environmental law, the organization that creates hazardous waste is responsible for its proper disposal — regardless of who physically carries it away. Hiring a non-certified vendor, placing electronics in a dumpster, or using a general waste stream to dispose of equipment creates liability that the certificate of the hauler cannot resolve.

E-waste represents about 2% of landfill volume but accounts for roughly 70% of toxic waste in landfills. Organizations that route electronics through unauthorized disposal channels contribute to that contamination — and the liability follows the chain back to the source.

EPA penalties for hazardous waste violations from improper electronics disposal range from $25,000 to $70,000 per day per violation. Environmental remediation costs from improper e-waste disposal can run from $200,000 to $5 million per contaminated site. Those numbers are not maximums — they are the documented range from actual enforcement actions.

The fix is straightforward: use a certified e-waste recycler with R2 or e-Stewards certification, require documentation of compliant handling, and keep records that connect your organization's retired devices to their certified disposal. That chain of documentation is what separates a defensible disposal program from a liability.

Has your organization vetted the certifications of its current electronics disposal vendor? Most have not looked beyond whether a vendor offers "free recycling."`,

    `There is a common misconception about electronics recycling that creates real liability for businesses. The assumption is that as long as devices go to "recycling" rather than a landfill, the organization has met its environmental obligations. In most cases, that assumption is incorrect.

Not all electronics recyclers are authorized to handle hazardous materials. Not all "recycling" programs result in certified handling of the lead, mercury and cadmium inside the devices they collect. And the organization that generated the waste does not avoid liability simply by handing devices off to a vendor — the liability follows the material, and it traces back to the source.

E-waste is about 2% of total landfill volume but represents approximately 70% of toxic waste. That imbalance exists in part because organizations and individuals dispose of electronics through channels that are not equipped to handle the materials correctly.

EPA penalties for improper hazardous waste disposal from electronics start at $25,000 per day per violation and can reach $70,000. Those penalties apply to the generating organization, not just the hauler or recycler who took the material.

A compliant electronics disposal program uses vendors with R2 or e-Stewards certification, generates documentation of certified handling, and maintains records that cover the entire chain from collection to final material processing. That documentation is both a compliance record and an environmental liability defense.

What certifications does your current electronics recycling vendor hold? If you do not know, it is worth finding out before the next device retirement event.`,

    `Most organizations dispose of old electronics with the best intentions — finding a vendor that offers pickup, dropping devices at a retail collection site, or bundling them with a general IT cleanup. The intention is environmental responsibility. The outcome is often environmental liability.

The gap between "we recycled it" and "we have documented compliant disposal" is significant. Electronics contain hazardous materials. The organization that generated those materials bears responsibility for their compliant handling under federal and state environmental law. That responsibility does not transfer to a vendor unless the vendor is certified, the handling is documented and the records tie the organization's specific devices to certified final processing.

E-waste is approximately 2% of landfill volume but accounts for roughly 70% of toxic waste in landfills. EPA penalties for electronics-related hazardous waste violations run from $25,000 to $70,000 per day per violation — per violation, not per event.

The certification credentials to look for are R2 (Responsible Recycling) and e-Stewards. Both require downstream vendor accountability, meaning the certified recycler is responsible for verifying that materials are processed correctly even after they leave the initial facility. That accountability chain is what makes the documentation defensible.

Environmental liability from improper e-waste disposal is an area where the cost of prevention is straightforwardly lower than the cost of enforcement. The documentation requirements are not complicated.

How does your organization currently verify that its electronics recycling vendor handles hazardous materials in compliance with EPA requirements?`,
  ],

  'device-wiping-assumptions': [
    `Ask most IT managers whether retired devices are wiped before disposal and the answer is usually yes. Ask them whether that wipe meets NIST 800-88 or DoD sanitization standards and whether it was verified — and the answer is usually less clear.

The gap between "we wiped it" and "data destruction is verified and documented to the required standard" is where a large share of data exposure risk in retired devices actually lives.

A standard factory reset on most operating systems does not remove data. It removes the file table that points to data while leaving the underlying data intact. Forensic recovery of data from factory-reset devices succeeds at rates above 60% in controlled testing. That is the majority of tested devices.

Software-only wiping without certified verification leaves recoverable data on 25–40% of devices processed through typical enterprise IT retirement programs. These are not edge cases — they are the documented outcomes of the most common enterprise wiping practices.

NIST 800-88 and DoD sanitization standards specify both the wiping methods and the verification requirements that a compliant data destruction process must meet. Most internal IT wiping processes do not meet those standards and cannot demonstrate compliance in an audit.

A proper data destruction program uses certified methods, verifies the destruction at the device level and produces certificates tied to each device's serial number. That is the documentation that distinguishes "we wiped it" from "data destruction is verified and defensible."

Does your IT team's current device retirement process produce verified data destruction certificates? We are happy to explain what the documentation should include.`,

    `The factory reset is one of the most trusted and least reliable data removal tools in enterprise IT. Most users and many IT professionals assume it clears a device. Forensic evidence says otherwise.

Factory resets on standard operating systems remove the file allocation table — the index that tells the system where data is stored — while leaving the underlying data on the storage medium. A forensic tool bypasses the file table entirely. Recovery rates from factory-reset devices in controlled testing environments exceed 60%.

For enterprise IT retirement programs that rely on software wiping without certified verification, the outcome is recoverable data on 25–40% of processed devices. That is not a worst-case estimate. It is the documented range from programs that believed their wiping was complete.

NIST 800-88 provides the guidance standard for media sanitization that most regulatory frameworks reference. It specifies wiping methods, verification requirements and documentation standards. An internal IT process that does not meet NIST 800-88 cannot claim compliance with frameworks that reference it — regardless of what the process actually does.

The practical fix is a certified data destruction process with device-level verification and certificates of destruction tied to serial numbers. That documentation answers the audit question: not just "were devices wiped?" but "was data destruction verified to the required standard and documented?"

If your organization had a data breach traced to a retired device, could you produce evidence that data destruction was verified on that device? That is the question a formal ITAD program is designed to answer.`,

    `There is a version of device retirement that feels secure but leaves significant data exposure. Devices get wiped by IT. The wipe log confirms completion. Devices move to disposal. No one questions it further.

What the wipe log does not confirm is whether data was actually removed to a standard that survives forensic recovery. Software wiping tools vary substantially in method and effectiveness. Without verified destruction at the device level, the wipe log is a record that something happened — not a record that data cannot be recovered.

Forensic data recovery from factory-reset devices succeeds in more than 60% of tested cases. Software-only wiping without certified verification leaves recoverable data on 25–40% of devices in typical enterprise programs. Those numbers hold across the most commonly used internal IT wiping tools.

NIST 800-88 defines the sanitization standard that compliance frameworks reference. The standard covers both the wiping method and the verification requirement. An IT wipe that does not meet the verification requirement is not NIST 800-88 compliant — and a compliance audit for data handling frameworks will surface that gap.

The issue is not that organizations are being careless. It is that internal IT wiping processes were built for operational efficiency, not for regulatory compliance. Producing verified, device-level data destruction certificates requires a different process.

What standard does your organization's current IT device retirement process meet? If the answer is uncertain, that gap is worth examining before the next device retirement event or compliance audit.`,
  ],

  'asset-value-recovery': [
    `When a device gets retired, most organizations treat it as a disposal problem. The question becomes: how do we get rid of this? The better question — and the one a proper asset disposition program answers first — is: what is this device worth right now?

Enterprise laptops retired within three years of purchase typically retain 25–40% of original purchase price on secondary markets. That is not a guaranteed number, and it varies by brand, configuration and condition — but it is the documented range for devices that reach secondary market buyers promptly.

The recovery window is real and it closes quickly. Delayed disposition of retired IT assets reduces secondary market value by 15–25% per quarter. Devices that sit in storage for 6–12 months before disposition often recover 40–60% less than the same devices retired promptly. What started as a meaningful recovery becomes a near-zero number over time.

Organizations that route all retired devices to recycling without a remarketing evaluation step lose this recovery value entirely. They convert a partial asset into a disposal cost — and often pay a vendor to take equipment that had recoverable value.

A formal asset recovery program evaluates each device at retirement, routes devices with remaining market value to certified remarketing, and routes devices below the recovery threshold to compliant recycling. The documentation produced covers both streams — data destruction certificates for all devices, chain-of-custody records for the full program.

Has your organization calculated what it has left on the table through retired device disposal over the past two to three years? The number is usually higher than expected.`,

    `Most hardware refresh budgets treat retired devices as a pure cost. Disposal fees, IT labor, storage space. The line item for what those devices are worth — or were worth when they left active use — often does not exist.

Enterprise laptops retired within three years retain 25–40% of original purchase price on secondary markets. A device purchased for $1,400 may carry $350–$560 in recovery value at retirement. Across an organization retiring 200 devices per year, that is $70,000 to $112,000 in potential recovery — disappearing into a recycling bin or an informal disposal channel.

The timing of disposition determines how much of that value survives. Asset value declines 15–25% per quarter from delayed disposition. Devices that sit in a storage room for six months recover significantly less than devices retired on a prompt schedule. Storage time is not a neutral choice — it is a direct cost against the asset recovery budget.

A formal ITAD program with an asset recovery component evaluates each device at decommission, routes eligible devices to certified secondary market channels and tracks recovery value against the original asset cost. That data creates visibility that informal programs do not provide.

The compliance documentation — data destruction certificates and chain-of-custody records — is produced for all devices in both the recovery and recycling streams. The two are not in tension. A compliant program handles both.

What percentage of your organization's retired devices carry residual market value that is currently being left unrecovered? We are happy to share how that evaluation typically works.`,

    `Here is a financial reality in most IT hardware refresh cycles that does not appear on the balance sheet until someone runs the numbers. The devices being retired have value. Not scrap value — secondary market value, from buyers who want working equipment at prices below new.

Enterprise laptops retired within three years of purchase average 25–40% of original purchase price on secondary markets. A three-year-old laptop that cost $1,200 can recover $300–$480 in a properly managed remarketing program. That is real money, and it is being left behind in most informal disposal programs.

The window for that recovery is time-sensitive. Secondary market value for enterprise electronics declines 15–25% per quarter from the point of retirement. A device worth $400 at retirement may be worth $240 six months later and $150 a year later. Storage time is directly converting potential revenue into disposal cost.

Organizations with formal asset recovery programs — ones that evaluate devices at decommission, route eligible units to certified secondary market channels and process the remainder through compliant recycling — typically offset 15–35% of hardware refresh costs through recovery revenue. That is a budget line that does not exist in informal programs.

Compliance documentation is generated for the full program: data destruction certificates covering all devices, chain-of-custody records from collection through final disposition, and device-level tracking for both recovery and recycling streams.

If your organization retired 300 devices last year and routed all of them directly to recycling, the recovery value that was left on the table is probably measurable. We would be glad to help you estimate it.`,
  ],

  'storage-cost-buildup': [
    `The room or closet full of retired IT equipment is one of the most common and least-examined costs in mid-size and enterprise IT operations. It does not show up as a line item. It shows up as occupied facility space, IT staff time managing an informal inventory, and ongoing data security liability for devices that are no longer generating any operational value.

At an average carrying cost of $50–$150 per device per month — accounting for facility space, IT staff overhead and security requirements — a storage room holding 200 devices is costing between $10,000 and $30,000 per month. Most organizations have not run that math.

The average enterprise has 12–18% of its device inventory in an "end-of-life pending disposition" state at any given time. Those devices are not generating productivity. They are generating cost: storage cost, data security risk from unmanaged devices with potentially intact data, and value depreciation from delayed disposition.

Deferred disposition is not a neutral choice — it is an active cost that compounds over time. Every month a device sits in storage is a month of carrying cost, a month of security liability and a month of declining secondary market value. The three costs run simultaneously.

A formal ITAD program creates a scheduled disposition process that prevents inventory accumulation, generates recovery value from eligible devices, handles compliant recycling for the remainder and produces the documentation that compliance requires.

How many retired devices does your organization currently have in storage awaiting disposition? That inventory is worth calculating — both the cost of carrying it and the value of clearing it.`,

    `Most organizations are paying to store old IT equipment without realizing how much the carrying cost actually is. It does not appear as a discrete line item. It hides inside facility costs, IT labor allocations and the ongoing security overhead of managing devices that should have been retired months ago.

The math is more significant than it looks. Carrying cost for devices awaiting disposition runs $50–$150 per device per month when accounting for floor space, inventory management and the IT staff time required to track and secure devices that are no longer in active use. An organization holding 500 devices in storage is looking at $25,000 to $75,000 per month in carrying cost.

The average enterprise has 12–18% of its total device inventory in "pending disposition" status at any given time. That is a significant share of the hardware budget sitting in a room, not generating value, while accumulating cost and security risk.

The security risk is real and active. Devices in storage carry the same data exposure liability as active devices. If the data on them was not verified as destroyed before they went into storage — and in most informal programs, it was not — then the storage room is holding active data security risk, not just old hardware.

A disposition schedule that clears retiring devices on a regular cadence eliminates the accumulation problem, generates recovery value from eligible devices and removes the carrying cost and security risk from the inventory.

When was the last time your organization cleared its pending disposition inventory? We would be happy to share what a scheduled disposition program looks like in practice.`,

    `There is a hidden financial structure in how most organizations handle IT device retirement. Devices get flagged as end-of-life. They go into a queue. The queue grows. Months pass. Occasionally someone organizes a disposal event. Then the cycle restarts.

That cycle has costs at every stage. Facility space for device storage: $50–$150 per device per month. IT staff time managing informal inventory and tracking pending devices. Ongoing data security liability for devices with unverified data destruction. And declining secondary market value for every month of storage time that passes.

Most organizations do not add those costs up — they are distributed across different budget categories and do not aggregate into a visible number. But the total cost of deferred device disposition across 200–500 devices over 6–12 months is typically a six-figure number.

The 12–18% of enterprise device inventory sitting in "pending disposition" status at any given time represents not just operational inefficiency but active cost. These devices are not producing value. They are consuming resources and creating liability.

A scheduled ITAD program converts that cycle into a predictable process. Devices move from decommission to certified disposition on a defined timeline, recovery value is captured before it depreciates, and the compliance documentation is generated automatically rather than assembled after the fact.

What does your organization's pending disposition inventory look like today, and what is your estimate of the monthly carrying cost? The answer often shifts how organizations prioritize device retirement.`,
  ],

  'multi-location-disposal': [
    `Organizations with multiple locations almost universally believe their IT asset disposal is consistent across sites. The audit record almost universally shows otherwise.

When each location manages its own device retirement — choosing its own vendors, following its own informal practices, generating its own documentation or none at all — the compliance record is fragmented by design. No single vendor relationship covers the organization. No unified documentation format exists. No central record can answer an audit question about the whole program.

Organizations with 10 or more locations managing IT disposal independently experience compliance documentation inconsistency in 65–80% of locations. Most cannot demonstrate centralized audit readiness because the program does not exist at the organizational level — it exists in pieces at each site.

The audit exposure is not theoretical. Compliance audits for IT asset disposition in multi-location organizations frequently trace their findings to a single non-compliant site. Once that site triggers scrutiny, auditors review the full enterprise program. The chain of custody across the organization is only as strong as its weakest location.

A centralized ITAD program creates uniform standards across all locations: a single vendor relationship with consistent documentation, chain-of-custody protocols that apply regardless of site, and a unified compliance record that covers every location in the organization.

How many different vendors or processes does your organization use across its locations for IT device disposal right now? That number usually surprises multi-location IT leaders when they map it out.`,

    `Multi-location organizations manage a lot of things centrally — finance, HR, procurement. IT asset disposal is frequently the exception. Each location develops its own approach, uses whatever vendor is locally available or convenient, and generates whatever documentation that vendor provides — which often means no documentation at all.

The result is not just inconsistency. It is compliance fragmentation. Organizations with 10 or more sites managing IT disposal independently average 3–6 different disposal vendors across the organization, each with different documentation formats, different chain-of-custody protocols and different certificate standards. During a compliance audit, no single record set covers the enterprise.

65–80% of multi-location programs cannot produce compliant chain-of-custody documentation across all sites. That is not a minority problem — it is the default outcome of decentralized disposal management.

The audit risk is asymmetric and unfavorable. A compliance finding at a single non-compliant location can trigger enterprise-wide review. One weak site breaks the compliance chain for the entire organization — regardless of how well every other location managed its program.

Centralized ITAD vendor management solves this problem structurally. One vendor relationship, one documentation standard, one compliance record covering every location. The process is the same at every site, and the audit response is a single package rather than a collection of inconsistent records.

Has your organization mapped its IT disposal vendors and documentation across all locations? For most multi-site businesses, that mapping itself reveals the problem.`,

    `Here is a compliance scenario that plays out in multi-location organizations with some regularity. An auditor reviewing IT asset disposition asks for documentation covering all locations. The organization submits what it has — documentation from some sites, informal records from others, nothing from a few.

The auditor finds a site that used an uncertified vendor, produced no data destruction certificate and has no chain-of-custody record. That finding does not stay contained to the non-compliant site. It triggers review of the entire enterprise program and raises the question of whether the compliance gaps at that site also exist at others.

65–80% of multi-location organizations managing IT disposal independently cannot produce unified, compliant documentation across all sites. That is not a small group — it is the standard outcome of treating device disposal as a local decision rather than an organizational program.

The practical problem is structural. When each location chooses its own vendor and generates its own records — or no records — there is no way to answer a centralized audit question. The compliance record does not exist at the organizational level.

A centralized ITAD program resolves this by creating one standard that applies at every location: one vendor relationship, consistent chain-of-custody documentation, uniform data destruction certificates and a central compliance record that covers the entire organization.

Does your organization have a single source of truth for IT asset disposition documentation across all of its locations? For most multi-site businesses, the honest answer is no.`,
  ],

  'reverse-logistics-complexity': [
    `Most organizations plan IT hardware refreshes, office relocations and equipment upgrades thoroughly on the procurement side. The reverse logistics — getting retired devices from every location to certified processing — often gets far less attention, and the documentation gaps that result are where compliance exposure accumulates.

Enterprise IT retirement events generate device volumes that exceed in-house logistics capacity in roughly 70% of cases. When that happens, the overflow creates ad hoc solutions: devices staged in temporary storage, shipped via general freight carriers without chain-of-custody documentation, or held at locations for weeks longer than intended while logistics are arranged.

Each improvised step in that process is a documentation gap. A device that moves through an undocumented interim storage arrangement, then ships with a carrier that does not provide chain-of-custody receipts, arrives at a processing facility with a broken compliance record — regardless of what happens at the facility itself.

15–25% of enterprise IT retirement shipments managed without dedicated ITAD logistics support experience device damage or documentation gaps. Those are not rare exceptions — they are the documented outcome of using general logistics infrastructure for a specialized compliance process.

A dedicated ITAD logistics program handles collection, packaging, transport documentation and chain-of-custody tracking as integrated steps. The compliance record is built at each transition point, not assembled after the fact from whatever documentation the various carriers provided.

What does your organization's process look like for managing a large device retirement event — 200 or 300 devices across multiple sites? The logistics complexity is usually where the compliance gaps first appear.`,

    `There is a version of IT asset disposition planning that ends at "arrange for pickup." The vendor comes, loads the devices, drives away. The organization considers the job done.

What the organization usually does not account for is the compliance record that needs to exist at each step after that pickup. How were devices documented at collection? What chain-of-custody record covers the transport? How was device-level tracking maintained from the point of collection to the point of certified data destruction?

Enterprise IT retirement events exceed in-house logistics capacity in about 70% of cases. That means the majority of significant device retirement events require logistics support that the organization does not have in-house — and without dedicated ITAD logistics, the gap is filled with general freight carriers, informal staging arrangements and undocumented interim handoffs.

15–25% of enterprise IT retirement shipments without dedicated ITAD logistics support experience device damage or documentation gaps during transport. Inadequate packaging, mixed carrier streams and undocumented interim storage are the most common causes.

Reverse logistics for retired electronics is a specialized process. It requires coordinated management of collection procedures, packaging standards, transport documentation and chain-of-custody tracking across multiple transition points. General freight infrastructure was not built to meet those requirements.

Has your organization mapped the documentation gaps in its current device collection and transport process? Most IT teams find the gaps when they trace a device's journey from decommission to final disposition.`,

    `Office relocations, equipment refreshes and facility closures all generate the same challenge for IT asset management: a large volume of devices that need to move from their current location to certified processing, with a documented chain of custody at every transition point.

The logistics complexity of that process is where compliance programs most commonly break down. Not at data destruction — which happens at the processing facility — but in the movement of devices from origin to facility. Who documented the collection? Who signed for the transport? What records exist for any devices held in interim storage?

70% of enterprise IT retirement events exceed internal logistics capacity. That overflow creates improvisation — and improvisation creates documentation gaps. Devices get consolidated at a staging area without formal inventory. Shipping happens through whatever carrier is available rather than one with ITAD-specific chain-of-custody documentation. The compliance record is incomplete before the devices ever arrive at the processing facility.

Device damage during unmanaged reverse logistics transport affects 15–25% of shipments managed without dedicated ITAD support. But the documentation failures often have larger compliance impact than the physical damage — because a chain-of-custody gap cannot be corrected retroactively.

A proper ITAD program integrates the reverse logistics component as part of the compliance process: documented collection, appropriate packaging, carrier-level chain of custody and tracking that follows each device from decommission to final disposition.

What is the weakest documentation point in your current device retirement process — from the moment a device is pulled from a user to the moment data destruction is certified?`,
  ],

  'informal-disposal-risk': [
    `It happens in almost every organization at some point. A device gets retired, the IT queue is backed up, and someone handles it informally — a trade-in at a retail store, a drop-off at an electronics collection event, a donation to a local organization. The device leaves the building. The problem feels solved.

What does not exist is a chain-of-custody record. No documentation of who handled the device after it left. No certificate of data destruction. No device-level record that ties the serial number to a verified disposal method. In a compliance audit, the absence of that documentation is treated as evidence of noncompliance — not as an ambiguity.

35–45% of small and mid-size organizations rely primarily on informal disposal channels for retired IT equipment. That means a large share of business devices leave organizational control with no compliance documentation at all.

Retail trade-in programs and consumer recycling collection events do not meet enterprise data destruction or chain-of-custody requirements, regardless of the certifications those programs hold for consumer use. Consumer certifications do not transfer to business compliance obligations. The device may be handled responsibly after it leaves — but the organization cannot prove that, and proof is what compliance requires.

A proper ITAD program is not complicated relative to the alternative. It produces chain-of-custody documentation from collection through final disposition, data destruction certificates tied to device serial numbers, and a compliance record that can answer an audit question years after the disposal event.

Has your organization mapped how its retired devices actually leave the building right now? The informal channels are usually more common than IT leadership realizes.`,

    `When organizations talk about data security in IT retirement, the conversation is usually about processes — wiping procedures, vendor certifications, compliance frameworks. What gets less attention is the informal channel problem: devices that leave through routes that bypass every formal process entirely.

Employee-managed IT disposal — devices returned through retail trade-in programs, dropped at consumer recycling kiosks, donated informally or discarded through unofficial channels — creates complete chain-of-custody gaps. There is no documentation because there was no formal process. And without documentation, there is no compliance defense.

35–45% of small and mid-size businesses rely primarily on informal disposal channels. That is not a marginal problem in a few organizations — it is the predominant disposal method for a large segment of businesses that have not implemented formal ITAD programs.

The compliance exposure from informal disposal is not theoretical. When an audit asks for chain-of-custody and data destruction documentation for devices retired in the past three years, the answer from an informal program is silence. Silence is a compliance failure — not an ambiguity that an organization can explain its way around.

Formal ITAD programs are accessible at the scale of small and mid-size organizations, not just enterprises. The documentation requirements are the same regardless of volume — chain-of-custody records and data destruction certificates tied to device serial numbers.

What percentage of your organization's retired devices leave through informal channels right now? For most businesses, that number is higher than expected.`,

    `The compliance risk from informal IT disposal is concentrated in a single unavoidable fact: chain-of-custody documentation cannot be created retroactively.

When a device leaves through a retail trade-in program, a consumer recycling event or an informal channel, there is no documentation of what happened to it afterward. That is not a recordkeeping oversight that can be corrected later. The information does not exist because the formal process that would have generated it was bypassed.

In a compliance audit covering IT asset disposition, the auditor's question is specific: "Provide chain-of-custody and data destruction documentation for all devices retired in the past three years." An organization that disposed of devices informally cannot provide that documentation for those devices. The absence of documentation is treated as evidence of noncompliant handling.

35–45% of small and mid-size businesses use informal disposal as their primary channel. Retail trade-in programs and consumer recycling events do not meet enterprise data security or chain-of-custody standards — consumer certification is not a business compliance record.

The practical fix is a formal ITAD program that generates documentation at each step: collection logging, chain-of-custody handoff records, verified data destruction and certificates tied to device serial numbers. That documentation stack is what a compliance audit requires — and what informal disposal programs are structurally incapable of producing.

If an auditor asked your organization to produce disposal documentation for retired devices from the past two years, what percentage of those devices could you account for? That percentage is the informal disposal risk measurement.`,
  ],
}

// ---------------------------------------------------------------------------
// PRACTICAL TAKEAWAYS — Record<string, string[]> — 3 per problem
// 2-3 sentence practical advice for business owners and IT managers.
// ---------------------------------------------------------------------------

const PRACTICAL_TAKEAWAYS: Record<string, string[]> = {
  'data-exposure-risk': [
    `Treat device retirement as a compliance event, not a facilities task. Every device that held business or customer data needs a documented chain of custody and a verified data destruction certificate before it leaves organizational control. The documentation is what separates defensible disposal from exposure.`,
    `The risk from retired devices does not require an active breach to materialize — it accumulates with every undocumented device that leaves the building. Require device-level data destruction certificates and chain-of-custody records for all retired equipment, regardless of whether IT wiped the devices before collection.`,
    `Start with an inventory of what is currently in storage. Devices awaiting disposal carry active data security risk until destruction is verified and documented. A same-day informal wipe is not a substitute for certified destruction with a documented record tied to the device's serial number.`,
  ],
  'chain-of-custody-failures': [
    `Document every handoff a device goes through from decommission to final disposition — IT collection, interim storage, vendor pickup, transport and final processing. Each undocumented transition is both a data exposure point and a compliance gap that cannot be reconstructed after the fact.`,
    `A chain of custody is a continuous record, not a collection of partial logs. Require that each handoff in your device retirement process generates a signed receipt tied to the device's serial number. Gaps in that chain are permanent — there is no retroactive fix once the handoff has occurred without documentation.`,
    `Audit your current device retirement process for documentation gaps before an external auditor does. Map each transition a device makes from the user's desk to certified destruction, and identify where documentation is currently missing. That gap analysis is the starting point for building a defensible compliance record.`,
  ],
  'compliance-gaps': [
    `Compliance for IT asset disposition is a documentation requirement, not just a practice requirement. Having a policy and following good practices is not sufficient if the process does not generate device-level records of the destruction method, the serial number and the chain of custody from collection to final disposition.`,
    `Review the specific compliance frameworks that apply to your industry — HIPAA, SOX, GLBA, FERPA — and map their IT asset disposition documentation requirements against your current process. The gap between regulatory requirement and current practice is almost always larger than expected in organizations without formal ITAD programs.`,
    `Build the compliance record forward, not backward. Implement a process that generates device-level documentation at each step of disposal — before an audit requires you to produce it. Retroactive documentation assembly is not possible for chain-of-custody records, and missing documentation is a compliance finding regardless of what the actual practice was.`,
  ],
  'e-waste-mismanagement': [
    `Verify the certification credentials of every vendor handling your organization's electronics disposal — R2 or e-Stewards certification is the standard. Certification means the vendor is accountable for compliant downstream handling, not just compliant collection. Without it, environmental liability stays with your organization.`,
    `Using a general waste hauler or an uncertified recycler for electronics disposal does not transfer your environmental liability — it creates it. The organization that generated the hazardous waste bears responsibility for its compliant handling under EPA regulations, regardless of who physically carried it away.`,
    `Keep records connecting your organization's retired devices to their certified disposal documentation. A certificate from a certified recycler that covers a specific pickup date and device inventory is the documentation that separates a defensible disposal program from an enforcement exposure.`,
  ],
  'device-wiping-assumptions': [
    `Factory resets and standard software wipes do not meet the data destruction standard that compliance frameworks require. Require certified data destruction using NIST 800-88 or DoD-standard methods, with device-level verification and destruction certificates tied to each device's serial number.`,
    `The assumption that IT-managed wiping is complete and compliant is the most common source of data exposure risk in enterprise device retirement programs. Verify the wiping standard your IT team uses against NIST 800-88 requirements, and assess whether your current process produces the verification records a compliance audit would require.`,
    `Data destruction verification is not the same as data destruction confirmation. Require that your ITAD vendor produces a device-level certificate of destruction for each device processed — not a batch confirmation that covers a group of devices without individual verification.`,
  ],
  'asset-value-recovery': [
    `Evaluate every retiring device for secondary market value before routing it to recycling. Enterprise laptops retired within three years retain meaningful recovery value that disappears when devices go directly to a recycling stream. A formal evaluation step at the point of decommission captures recovery value before it depreciates.`,
    `Secondary market value for enterprise electronics declines 15–25% per quarter from the point of retirement. Build a disposition schedule that moves devices from decommission to evaluation to recovery or recycling on a defined timeline — storage time is directly converting potential recovery revenue into carrying cost.`,
    `Recovery and compliance are not in tension in a properly structured ITAD program. Data destruction certificates and chain-of-custody records are produced for devices routed to secondary markets just as they are for devices routed to recycling — the compliance record covers both streams.`,
  ],
  'storage-cost-buildup': [
    `Calculate the actual carrying cost of your current pending disposition inventory — facility space, IT staff time and security overhead — at $50–$150 per device per month. That number usually motivates a different conversation about disposition scheduling than "we will get to it eventually."`,
    `Retired devices in storage are not neutral inventory — they are an active data security liability, a depreciating asset and an accumulating carrying cost. Establish a maximum time limit between device decommission and disposition to prevent inventory buildup and control the cost and risk it generates.`,
    `A scheduled ITAD program prevents the accumulation cycle. Regular disposition events — quarterly at minimum — keep the pending inventory manageable, capture recovery value from eligible devices before it depreciates and generate the compliance documentation automatically rather than in a reactive cleanup.`,
  ],
  'multi-location-disposal': [
    `Centralize IT asset disposition vendor management across all locations. A single vendor relationship with consistent documentation standards, chain-of-custody protocols and certificate formats creates a unified compliance record that can answer an audit question about the entire organization — rather than a collection of inconsistent site-level records.`,
    `The compliance chain across a multi-location organization is only as strong as its weakest site. Audit your least-formal location's device disposal process first — if that site cannot produce compliant documentation, it represents enterprise-wide audit exposure regardless of how well other locations perform.`,
    `Build a standardized device retirement process that applies at every location and generate a central compliance record that aggregates documentation from all sites. The goal is a single audit response that covers all locations — not a site-by-site assembly of whatever each location happened to collect.`,
  ],
  'reverse-logistics-complexity': [
    `Manage reverse logistics for retired electronics as a compliance process, not a freight problem. Use ITAD-specialized carriers with chain-of-custody documentation, require collection receipts tied to device serial numbers, and track each device from the point of collection through final disposition.`,
    `Plan device collection and transport capacity as part of every IT retirement event — not as an afterthought after the devices have been decommissioned. 70% of enterprise IT retirement events exceed internal logistics capacity; having a dedicated ITAD logistics program in place prevents the improvisation that creates documentation gaps.`,
    `The compliance record for reverse logistics needs to be built at each transition point — collection, staging, transport and processing. Documentation gaps that occur during transport cannot be corrected after the fact, and a chain-of-custody gap between collection and processing is a compliance finding regardless of what is documented at the processing facility.`,
  ],
  'informal-disposal-risk': [
    `Establish a formal device retirement process and close the informal channels — trade-in programs, consumer recycling drop-offs and employee-managed disposal do not generate the chain-of-custody and data destruction documentation that compliance requires. Formal ITAD programs are accessible at the scale of small organizations, not just enterprises.`,
    `Map every path a retired device currently takes out of your organization. Informal channels are usually more prevalent than IT leadership realizes, and each one represents a chain-of-custody gap that cannot be retroactively documented. The mapping exercise is the starting point for closing the compliance exposure.`,
    `The standard for compliance is provability, not just proper practice. Even if devices handled through informal channels were managed responsibly, the absence of documentation means the organization cannot prove it — and in a compliance audit, absence of proof is treated as a finding. Documentation is the product, not an administrative byproduct.`,
  ],
}

// ---------------------------------------------------------------------------
// DISCUSSION QUESTIONS — Record<string, string[]> — 3 per problem
// Invite business owners, IT managers, compliance officers to share experience.
// ---------------------------------------------------------------------------

const DISCUSSION_QUESTIONS: Record<string, string[]> = {
  'data-exposure-risk': [
    `For IT managers and business owners: when a device gets retired, how does your organization document the chain of custody from decommission to data destruction? We are curious how other teams handle this — share your process in the comments.`,
    `Has your organization ever audited what data was recoverable from retired devices before they left the building? What did the review find? We hear a range of answers on this and would be glad to discuss.`,
    `What is the biggest gap in your organization's current retired device process — documentation, verification, vendor accountability or something else? Drop a comment and let us know what you are dealing with.`,
  ],
  'chain-of-custody-failures': [
    `For compliance officers and IT leaders: how many undocumented handoffs does a device in your organization go through between decommission and final disposition? Most teams find the answer surprising when they map it out.`,
    `Has your organization ever been asked to produce chain-of-custody documentation for retired devices during an audit or vendor review? What did that process look like — and what gaps did it surface?`,
    `What is the hardest part of maintaining chain-of-custody documentation across an IT device retirement program in your organization? We would be interested to hear where the process tends to break down.`,
  ],
  'compliance-gaps': [
    `For compliance officers and IT managers: have you tested whether your current device retirement process would satisfy an audit request for IT asset disposition documentation? What did the evaluation find?`,
    `Which compliance frameworks govern your organization's data handling requirements — HIPAA, SOX, GLBA, FERPA, something else? We are curious how different industries approach the device disposal documentation requirement.`,
    `What would it take for your organization to be able to produce device-level disposal documentation for every retired asset from the past three years? We hear a range of answers on this — drop a comment with your situation.`,
  ],
  'e-waste-mismanagement': [
    `For operations managers and sustainability leads: how does your organization currently verify the certification status of its electronics recycling vendors? We are curious whether R2 or e-Stewards credentials are part of the vendor selection process.`,
    `Has your organization ever reviewed the downstream handling documentation from its electronics recycling vendor — where the materials actually go after initial collection? What did that review find?`,
    `What is the biggest challenge in building a compliant electronics disposal program in your organization — vendor access, internal process, documentation requirements or something else? Drop a comment.`,
  ],
  'device-wiping-assumptions': [
    `For IT managers: what wiping standard does your organization's current device retirement process use — and does your current process produce verified, device-level destruction certificates? We are curious how widely NIST 800-88 is actually implemented in practice.`,
    `Has your organization ever tested whether data was recoverable from devices your IT team had previously wiped? The results tend to be different from what most IT teams expect.`,
    `What is the gap between your organization's current wiping process and what a compliance audit would require you to demonstrate? We hear a range of answers on this and would be glad to discuss.`,
  ],
  'asset-value-recovery': [
    `For IT leaders and finance managers: does your organization currently evaluate retired devices for secondary market value before routing them to recycling — or do all retired devices go directly to a disposal stream? We are curious how common the evaluation step is in practice.`,
    `Has your organization calculated the recovery value left on the table through informal or direct-to-recycle disposal over the past two to three years? The number is usually higher than expected.`,
    `What is the biggest barrier to implementing a formal asset recovery program in your organization — internal process, vendor access, compliance concerns or something else? Drop a comment with your situation.`,
  ],
  'storage-cost-buildup': [
    `For IT managers and operations leaders: how long does a device typically sit in storage between decommission and final disposition in your organization? We are curious how much of the pending disposition inventory most organizations are carrying at any given time.`,
    `Has your organization calculated the actual carrying cost of its current pending disposition inventory — including facility space, IT staff time and security overhead? Most teams find the number larger than expected.`,
    `What drives device retirement backlogs in your organization — budget cycles, vendor scheduling, internal process or something else? We would be interested to hear what is behind the inventory accumulation.`,
  ],
  'multi-location-disposal': [
    `For IT leaders managing multi-location organizations: how many different vendors or processes does your organization currently use for device disposal across its locations? We hear a wide range on this — some organizations have a dozen different arrangements.`,
    `Has your organization tested whether it could produce a unified compliance record covering IT device disposal across all of its locations? What did that review find?`,
    `What is the hardest part of standardizing IT asset disposition across multiple locations in your organization — vendor relationships, internal coordination, documentation or something else? Drop a comment.`,
  ],
  'reverse-logistics-complexity': [
    `For IT managers and operations leaders managing large device retirement events: what is the most common point where chain-of-custody documentation breaks down in your organization's device collection and transport process? We hear a range of answers.`,
    `Has your organization ever managed a large IT retirement event — office relocation, equipment refresh, facility closure — and found that the logistics complexity created documentation gaps? What did that look like?`,
    `What is the biggest challenge in managing reverse logistics for retired electronics in your organization — volume, carrier documentation, multi-location coordination or something else? Drop a comment and let us know.`,
  ],
  'informal-disposal-risk': [
    `For business owners and IT managers: how many retired devices leave your organization each year through informal channels — trade-in programs, employee-managed disposal, consumer recycling drop-offs? We are curious how widespread informal disposal is in practice.`,
    `Has your organization ever mapped all the paths a retired device can take out of the building — including informal ones? What did the mapping find, and how did it change your approach to device retirement?`,
    `What is the biggest barrier to moving from informal to formal IT asset disposition in your organization — cost, internal process, vendor access or awareness of the compliance requirement? We would be glad to discuss.`,
  ],
}

// ---------------------------------------------------------------------------
// CTAS — 5 call-to-action strings
// ---------------------------------------------------------------------------

const CTAS = [
  `Follow ${COMPANY.name} for more ITAD, data security, and electronics recycling insights.`,
  `Follow for more practical breakdowns on retiring technology assets safely.`,
  `Follow for more insights on IT asset disposition, compliance, and risk reduction.`,
  `Follow for more operator-level IT and reverse logistics insights.`,
  `Visit ${COMPANY.website} to learn how ${COMPANY.name} handles IT asset disposition and data security.`,
]

// ---------------------------------------------------------------------------
// REPURPOSING — 5 suggestions
// ---------------------------------------------------------------------------

const REPURPOSING: string[] = [
  'Condense the opening scenario into a LinkedIn hook post with a link back to this discussion.',
  'Extract the key data points as a carousel slide or branded stat graphic for Instagram.',
  'Use the discussion question as a standalone poll on LinkedIn or a story question sticker on Instagram.',
  'Adapt the practical takeaway section into a short YouTube Short or Reel script.',
  'Use the post content as the foundation for an email newsletter section targeting IT managers and compliance officers.',
]

// ---------------------------------------------------------------------------
// IMPROVEMENT SUGGESTIONS — Record<string, string[][]> — 3 sets per problem
// ---------------------------------------------------------------------------

const IMPROVEMENT_SUGGESTIONS: Record<string, string[][]> = {
  'data-exposure-risk': [
    [
      'Name the specific compliance framework that applies to your primary audience — HIPAA for healthcare, GLBA for financial services — to make the regulatory exposure concrete.',
      'Add specific device types and volumes to ground the scenario in the audience\'s actual operations.',
      'Reference the certificate of data destruction by name so readers understand what the documentation product actually looks like.',
    ],
    [
      'Include the NIST 800-88 standard by name to give IT managers a specific verification reference point.',
      'Add a scenario showing the timeline from device decommission to compliance gap to make the risk sequence visible.',
      'Mention the difference between software wiping and physical destruction to address the most common assumption.',
    ],
    [
      'Specify what a chain-of-custody record actually contains — serial numbers, handoff signatures, destruction method — so readers know what the documentation standard requires.',
      'Add the forensic recovery rate statistic to make the wiping assumption gap concrete.',
      'Include a prompt for readers to estimate how many devices their organization currently has in unmanaged storage.',
    ],
  ],
  'chain-of-custody-failures': [
    [
      'Name the specific regulatory frameworks that require chain-of-custody documentation — HIPAA, SOX, FERPA — so readers can assess their own compliance obligation.',
      'Add a specific example of what an undocumented handoff looks like in practice to make the abstract risk concrete.',
      'Emphasize the retroactive impossibility of chain-of-custody reconstruction — this is the key constraint most readers do not fully understand.',
    ],
    [
      'Include the number of undocumented handoffs a typical device goes through in an informal program to make the gap visible.',
      'Reference the specific documentation elements a chain-of-custody record must contain to pass an audit.',
      'Add a scenario where a chain-of-custody gap surfaces during an actual audit to ground the compliance risk in a realistic outcome.',
    ],
    [
      'Specify what "compliant chain-of-custody documentation" actually means — device serial number, handoff date, signing party and method of destruction.',
      'Include a prompt for readers to map their own device retirement handoff sequence and identify where documentation is missing.',
      'Reference the penalty range that applies when chain-of-custody failures surface in a compliance audit for the audience\'s specific industry.',
    ],
  ],
  'compliance-gaps': [
    [
      'Name the three documentation elements auditors look for — destruction method, serial number records, chain-of-custody — so readers can self-assess their current program.',
      'Add specific penalty ranges for the compliance framework most relevant to your audience to make the financial exposure concrete.',
      'Include the distinction between having a disposal policy and having documentation that proves the policy was followed.',
    ],
    [
      'Specify that per-record penalties compound across all devices in a non-compliant disposal batch to make the penalty math visible.',
      'Reference the specific audit trigger that most often surfaces IT asset disposition compliance failures — a device appearing on a secondary market.',
      'Add a prompt for readers to identify which compliance framework governs their industry\'s data handling requirements.',
    ],
    [
      'Include the difference between a batch disposal certificate and a device-level certificate of destruction — auditors require the latter.',
      'Name the certifications a compliant ITAD vendor should hold — R2, e-Stewards, NAID AAA — so readers know what to look for.',
      'Add a timeline showing how compliance exposure accumulates across multiple years of informal disposal to make the historical risk visible.',
    ],
  ],
  'e-waste-mismanagement': [
    [
      'Name the specific certification credentials to look for in an electronics recycling vendor — R2 and e-Stewards — so readers have a concrete verification step.',
      'Include the downstream accountability requirement of certified recyclers so readers understand what the certification actually covers.',
      'Add the documentation elements that a compliant disposal record should include — pickup date, device inventory, certification number.',
    ],
    [
      'Specify that EPA liability attaches to the generating organization, not the hauler, to address the most common misconception about e-waste responsibility.',
      'Reference a specific EPA enforcement action or penalty range to ground the regulatory risk in documented outcomes.',
      'Add a prompt for readers to verify the certification status of their current electronics recycling vendor.',
    ],
    [
      'Include the hazardous materials present in electronics — lead, mercury, cadmium, beryllium — to make the environmental liability concrete.',
      'Specify the RCRA (Resource Conservation and Recovery Act) framework by name for readers who need to research their compliance obligation.',
      'Add the distinction between consumer recycling certification and enterprise disposal compliance to address the "we use a certified recycler" assumption.',
    ],
  ],
  'device-wiping-assumptions': [
    [
      'Name the NIST 800-88 standard explicitly and describe what the verification requirement means in practice.',
      'Include the forensic recovery rate from factory-reset devices — above 60% — to make the assumption gap concrete.',
      'Add the difference between a wipe confirmation log and a verified certificate of destruction so readers understand what the documentation standard requires.',
    ],
    [
      'Specify the data remanence rate from software-only wiping — 25–40% of devices — to ground the risk in a concrete number.',
      'Reference the DoD 5220.22-M standard alongside NIST 800-88 for readers whose organizations work with government contracts.',
      'Add a prompt for readers to assess whether their current wiping process produces device-level destruction certificates.',
    ],
    [
      'Include the distinction between physical destruction and software wiping and when each is appropriate based on device age and data sensitivity.',
      'Name the specific compliance frameworks that reference NIST 800-88 — HIPAA, SOX — so readers understand why the standard matters for their industry.',
      'Add a scenario where an IT-wiped device is forensically recovered to make the abstract wiping assumption concrete.',
    ],
  ],
  'asset-value-recovery': [
    [
      'Include the specific value retention range — 25–40% of purchase price within three years — to make the recovery opportunity concrete.',
      'Add the quarterly depreciation rate — 15–25% per quarter — to make the cost of storage time visible.',
      'Reference the compliance documentation that is produced for remarketed devices to address the concern that recovery and compliance are in tension.',
    ],
    [
      'Specify the average enterprise hardware refresh cycle and how it maps to the secondary market value window.',
      'Include a simple calculation example — a $1,200 laptop at 30% recovery value — to make the per-device opportunity tangible.',
      'Add a prompt for readers to estimate their organization\'s annual device retirement volume and apply the recovery rate.',
    ],
    [
      'Name the certified secondary market channels that a formal asset recovery program uses, as distinct from consumer trade-in programs.',
      'Include the cost offset potential — 15–35% of hardware refresh cost in a well-managed program — to frame recovery as a budget impact.',
      'Add the depreciation timeline alongside the recovery value range to show readers the cost of inaction.',
    ],
  ],
  'storage-cost-buildup': [
    [
      'Include the per-device carrying cost range — $50–$150 per month — and prompt readers to apply it to their current pending disposition inventory.',
      'Add the data security liability component of storage to make clear that deferred disposition is not just a financial cost.',
      'Reference the secondary market value depreciation that runs simultaneously with carrying cost to show the compounding cost of storage.',
    ],
    [
      'Specify the 12–18% of device inventory in pending disposition status to help readers benchmark their own situation.',
      'Include a prompt for readers to calculate the current monthly carrying cost of their pending disposition inventory.',
      'Add a recommended disposition cadence — quarterly at minimum — to give readers a concrete process improvement to consider.',
    ],
    [
      'Reference the three simultaneous costs of deferred disposition — carrying cost, security liability and value depreciation — to make the full cost visible.',
      'Include a scenario showing how carrying cost accumulates across a 6-month storage period for a mid-size device inventory.',
      'Add the compliance documentation gap that accumulates alongside the storage cost to tie the financial and regulatory risks together.',
    ],
  ],
  'multi-location-disposal': [
    [
      'Specify the 65–80% non-compliant documentation rate for independent multi-location programs to give readers a benchmark for their own situation.',
      'Include the number of different vendors a typical multi-location organization uses — 3–6 — to make the fragmentation concrete.',
      'Add the audit trigger scenario — a single non-compliant site triggering enterprise-wide review — to make the risk asymmetry visible.',
    ],
    [
      'Name the specific documentation elements that a centralized ITAD program produces across all locations — single vendor, consistent certificate format, central compliance record.',
      'Include a prompt for readers to count the number of different disposal vendors or processes their organization currently uses across all sites.',
      'Add the retroactive impossibility of fixing chain-of-custody gaps at already-disposed sites to emphasize the forward-looking urgency.',
    ],
    [
      'Reference the specific compliance audit scenario where multi-location fragmentation surfaces most commonly — a request for enterprise-wide device disposal documentation.',
      'Include the distinction between per-site compliance and enterprise-level compliance to make the organizational risk visible.',
      'Add a recommended starting point — auditing the least-formal site first — to give multi-location readers a concrete first action.',
    ],
  ],
  'reverse-logistics-complexity': [
    [
      'Specify the 70% capacity exceedance rate for enterprise IT retirement events to ground the logistics risk in a documented outcome.',
      'Include the device damage and documentation gap rate — 15–25% of shipments — to make the risk of unmanaged transport concrete.',
      'Add the specific transition points where chain-of-custody documentation most commonly breaks down — collection, interim storage, transport.',
    ],
    [
      'Name the documentation elements a chain-of-custody record for reverse logistics should include — collection receipt, carrier documentation, processing confirmation.',
      'Include a specific IT retirement event type — office relocation, equipment refresh — to make the logistics scenario relatable.',
      'Add the retroactive impossibility of fixing transport-stage documentation gaps to emphasize the real-time documentation requirement.',
    ],
    [
      'Reference the difference between general freight carrier documentation and ITAD-specialized chain-of-custody documentation.',
      'Include a prompt for readers to identify the weakest documentation point in their current device collection and transport process.',
      'Add the compliance framework reference — HIPAA, SOX — to tie the logistics documentation requirement to the regulatory obligation.',
    ],
  ],
  'informal-disposal-risk': [
    [
      'Specify the 35–45% informal disposal rate for small and mid-size organizations to help readers benchmark their own situation.',
      'Include the specific informal channels — trade-in programs, consumer recycling kiosks, employee-managed disposal — to make the risk concrete.',
      'Add the retroactive impossibility of creating chain-of-custody records for already-disposed informal devices to emphasize the forward-looking urgency.',
    ],
    [
      'Name the compliance frameworks that require chain-of-custody and data destruction documentation — HIPAA, SOX, GLBA — so readers can assess their own obligation.',
      'Include the distinction between consumer recycling certification and enterprise disposal compliance to address the "we use a certified recycler" assumption.',
      'Add a prompt for readers to map the informal disposal channels currently in use in their organization.',
    ],
    [
      'Reference the specific audit question that informal disposal programs cannot answer — "Provide chain-of-custody documentation for all devices retired in the past three years."',
      'Include the documentation elements a formal ITAD program produces — collection log, chain-of-custody record, data destruction certificate — as the concrete alternative to informal disposal.',
      'Add the note that formal ITAD programs are accessible at the scale of small and mid-size organizations to address the assumption that formal programs are only for enterprises.',
    ],
  ],
}

// ---------------------------------------------------------------------------
// MAIN EXPORT
// ---------------------------------------------------------------------------

// Suppress unused variable warnings — PROBLEM_DATA is imported for consistency
// with other platform files; individual stat references are embedded in posts
void PROBLEM_DATA

export function generateFacebook(inputs: FacebookInputs, seed = 0): FacebookOutput {
  const prob = inputs.problem
  const idx = seed % 3
  const ctaIdx = seed % CTAS.length
  const qualityScore = scoreContent(inputs, true, true, true, 250)
  return {
    platform: 'facebook',
    primaryPost: PRIMARY_POSTS[prob]?.[idx] ?? `Share how your organization currently handles IT asset disposition and data destruction for retired devices. The details matter more than most organizations realize.`,
    practicalTakeaway: PRACTICAL_TAKEAWAYS[prob]?.[idx] ?? `Treat device retirement as a compliance event. Document each handoff, require verified data destruction certificates and maintain a chain-of-custody record from decommission to final disposition.`,
    cta: CTAS[ctaIdx],
    discussionQuestion: DISCUSSION_QUESTIONS[prob]?.[idx] ?? `What does your organization's current retired device process look like — and where are the documentation gaps? Drop a comment and let us know.`,
    repurposingSuggestions: REPURPOSING.slice(0, 4),
    qualityScore,
    improvementSuggestions: IMPROVEMENT_SUGGESTIONS[prob]?.[idx] ?? [
      'Name the specific compliance framework that applies to your audience',
      'Add specific device types and volumes to make the risk concrete',
      'Reference the documentation a proper ITAD program produces',
    ],
  }
}
