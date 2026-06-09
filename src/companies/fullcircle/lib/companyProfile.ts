export const COMPANY = {
  name: 'Full Circle Electronics',
  website: 'fullcircleelectronics.com',
  tagline: 'Reduce risk, protect data, maintain compliance, and recover value when retiring IT assets and electronic equipment.',
  positioning: 'Full Circle Electronics helps organizations reduce risk, protect data, maintain compliance, and recover value when retiring IT assets and electronic equipment.',
}

export const PROBLEM_LABELS: Record<string, string> = {
  'data-exposure-risk':          'Data Exposure Risk from Retired Devices',
  'chain-of-custody-failures':   'Chain-of-Custody Failures',
  'compliance-gaps':             'Compliance Gaps and Audit Readiness',
  'e-waste-mismanagement':       'E-Waste Mismanagement and Environmental Liability',
  'device-wiping-assumptions':   'Device Wiping Assumptions and Data Remanence',
  'asset-value-recovery':        'Lost Asset Value Recovery',
  'storage-cost-buildup':        'Storage Cost Buildup from Unmanaged Inventory',
  'multi-location-disposal':     'Inconsistent Multi-Location Disposal',
  'reverse-logistics-complexity':'Reverse Logistics Complexity',
  'informal-disposal-risk':      'Informal and Undocumented Disposal Processes',
}

export const TARGET_AUDIENCES = [
  'IT Leaders',
  'CIOs',
  'CISOs',
  'Compliance Officers',
  'Operations Leaders',
  'Procurement Teams',
  'Facilities Managers',
  'Sustainability Leaders',
  'Risk Managers',
  'Finance Leaders',
  'Multi-Location Businesses',
  'Healthcare Organizations',
  'Financial Services Companies',
  'Enterprise IT Departments',
  'School Districts and Universities',
]

export const CONTENT_ANGLES = [
  'Hidden Risk',
  'Common Operational Mistake',
  'Contrarian Take',
  'Compliance Failure',
  'Data Security Warning',
  'Before/After Improvement',
  'Buyer Education',
  'Chain-of-Custody Breakdown',
  'Reverse Logistics Bottleneck',
  'Asset Recovery Opportunity',
  'Audit Readiness Breakdown',
]

export const OBJECTIVES = [
  'Generate Leads',
  'Build Authority',
  'Drive Website Traffic',
  'Start Conversations',
  'Educate Audience',
  'Challenge Assumptions',
]

export const PROBLEM_DATA: Record<string, {
  stat1: string; stat2: string; stat3: string;
  cost1: string; cost2: string;
  consequence: string;
}> = {
  'data-exposure-risk': {
    stat1: 'The average cost of a data breach is $4.45 million (IBM 2023). Retired devices without documented data destruction and chain-of-custody contribute directly to this exposure — the risk doesn\'t require an active network intrusion when the data is still on the device.',
    stat2: 'Studies of used hard drives and SSDs on secondary markets consistently show that 35–40% of devices contain recoverable data from previous owners — including email archives, financial records, and personal identifiable information — despite seller claims of prior wiping.',
    stat3: 'HIPAA penalties for improper data disposal range from $100 to $50,000 per violation per record. In healthcare organizations with large device retirement programs, a single undocumented batch disposal can trigger penalty exposure across thousands of patient records.',
    cost1: '$4.45 million average cost of a data breach — retired devices without verified destruction contribute directly to this exposure',
    cost2: 'HIPAA penalties of $100–$50,000 per record per violation from improper data disposal — a single undocumented batch can trigger exposure across thousands of records',
    consequence: 'Data risk from retired devices doesn\'t start when a breach occurs. It starts when a device leaves active use without a documented chain of custody and verified data destruction — often months before anyone realizes the exposure exists.',
  },
  'chain-of-custody-failures': {
    stat1: 'Chain-of-custody failures in IT asset disposition create audit gaps that compliance teams cannot close after the fact. Without documented handoffs at each transition — from IT collection to transport to processing to final disposition — there is no way to demonstrate that a device was handled correctly.',
    stat2: 'Organizations with multi-location IT infrastructure average 3–7 undocumented device handoffs before final disposition. Each undocumented handoff is an untracked data exposure point — and a gap in the compliance record that cannot be reconstructed retroactively.',
    stat3: 'Regulatory frameworks including HIPAA, SOX and FERBA require demonstrable chain-of-custody evidence for data-bearing device disposal. Missing documentation — even for a single device in an otherwise compliant program — creates compliance exposure that cannot be remediated after the fact.',
    cost1: 'Compliance penalties from chain-of-custody failures can exceed $1 million per audit finding under HIPAA and SOX',
    cost2: 'Legal liability from undocumented device handoffs averages 3–5x the direct compliance penalty in regulated industries',
    consequence: 'A chain-of-custody gap is not a paperwork problem. It is a provability problem — and when regulators ask for proof of secure disposal, undocumented handoffs have no retroactive fix.',
  },
  'compliance-gaps': {
    stat1: 'HIPAA, SOX, FERBA, and GLBA each require documented evidence of data destruction and device disposition. Organizations without formal ITAD programs routinely fail these requirements during audit — not from deliberate noncompliance, but from the absence of documentation that was never collected.',
    stat2: 'Regulatory auditors examining IT asset disposition look for three things: documented destruction method, device-level serialization records, and chain-of-custody from collection to final disposition. Most informal disposal programs can provide none of the three.',
    stat3: 'Compliance failures related to IT asset disposition compound across devices. A single audit finding covering 500 devices disposed without documentation generates penalty exposure for each device — at per-record penalty rates, the math compounds rapidly in organizations with large device inventories.',
    cost1: 'Average regulatory penalty from improper IT asset disposition: $500,000–$2 million per audit event',
    cost2: 'Legal defense costs for compliance failures related to device disposal average 2–3x the direct regulatory penalty',
    consequence: 'Compliance risk from IT asset disposition is not theoretical. It is an audit event waiting for a trigger — and the trigger is usually a device showing up where it shouldn\'t be, or an audit request that an informal process can\'t answer.',
  },
  'e-waste-mismanagement': {
    stat1: 'Electronics contain hazardous materials including lead, mercury, cadmium and beryllium. Improper disposal of electronic devices can create environmental liability under EPA regulations and state environmental laws — liability that attaches to the organization that generated the waste, not the hauler.',
    stat2: 'E-waste represents approximately 2% of landfill volume but accounts for roughly 70% of toxic waste in landfills. Organizations that dispose of electronics through general waste streams — dumpsters, trash, or unauthorized vendors — create environmental compliance exposure regardless of whether they knew the materials were present.',
    stat3: 'Environmental liability from improper e-waste disposal under RCRA can include remediation costs, regulatory penalties, and third-party liability claims. EPA penalties for hazardous waste violations from improper electronics disposal range from $25,000 to $70,000 per day per violation.',
    cost1: 'EPA penalties for hazardous waste violations from improper electronics disposal: $25,000–$70,000 per day per violation',
    cost2: 'Environmental remediation costs from improper e-waste disposal: $200,000–$5 million per contamination site',
    consequence: 'E-waste is not a disposal problem. It is a liability problem — and the liability attaches to the organization that generated the waste, not the vendor that removed it, if that vendor was not certified to handle it.',
  },
  'device-wiping-assumptions': {
    stat1: 'A standard factory reset on most operating systems does not remove data — it removes the file table that points to data while leaving the underlying data intact. Forensic recovery of data from factory-reset devices succeeds at rates above 60% in controlled testing environments.',
    stat2: 'Software-only wiping without certified verification leaves recoverable data on 25–40% of devices processed through typical enterprise IT retirement programs. The assumption that wiping is complete is wrong in a significant share of cases — and there is no way to know which devices fall into that share without verification.',
    stat3: 'NIST 800-88 and DoD sanitization standards specify wiping methods and verification requirements that most internal IT wiping processes do not meet and cannot demonstrate in a compliance audit. The gap between internal IT wiping practice and documented compliance standard is where data exposure risk concentrates.',
    cost1: 'Data exposure from inadequately wiped devices — average recovery cost and regulatory exposure: $500,000–$2 million per incident',
    cost2: '60%+ forensic data recovery success rate from factory-reset devices — the assumption that wiping is complete is incorrect in the majority of tested cases',
    consequence: 'Device wiping is not a solved problem. It is an assumption that holds until a forensic tool proves otherwise — and by then, the device has already left organizational control.',
  },
  'asset-value-recovery': {
    stat1: 'Enterprise laptops retired within 3 years typically retain 25–40% of original purchase price on secondary markets. Organizations that route all retired devices to recycling without a remarketing evaluation step lose this recovery value entirely — turning a partial asset into a disposal cost.',
    stat2: 'The average enterprise organization retires 15–25% of its device inventory each year. Without a formal asset recovery program, those devices generate zero recovery value and are instead treated as a cost center — with disposal fees replacing the recovery revenue a properly structured program would generate.',
    stat3: 'Delayed disposition of retired IT assets reduces their secondary market value by 15–25% per quarter. Devices held in storage for 6–12 months before disposition often recover 40–60% less than the same devices retired promptly — making storage time a direct cost against the asset recovery budget.',
    cost1: '25–40% of original purchase price recoverable from enterprise laptops retired within 3 years — lost entirely when all retired devices go directly to recycling',
    cost2: '15–25% asset value loss per quarter from delayed disposition — devices stored 6–12 months before disposal recover 40–60% less',
    consequence: 'Retired IT assets are not zero-value inventory. They are depreciating assets with a recovery window — and every month of unmanaged storage narrows that window toward zero.',
  },
  'storage-cost-buildup': {
    stat1: 'Organizations with unmanaged IT asset retirement programs typically accumulate 3–8 months of undisposed devices before acting. At an average carrying cost of $50–$150 per device per month in facility space, IT staff time, and security overhead, large device inventories generate significant hidden cost while sitting unused.',
    stat2: 'The average enterprise organization has 12–18% of its device inventory in an "end-of-life pending disposition" state at any given time — representing tied-up capital, active storage cost, and ongoing data security liability for devices that are no longer generating operational value.',
    stat3: 'Devices in storage carry the same data exposure risk as active devices. Physical security of storage areas, inventory management for audit purposes, and the ongoing administrative burden of managing pending disposition devices add cost that does not appear on any IT line item until disposition is finally triggered.',
    cost1: '$50–$150 per device per month in carrying cost for devices awaiting disposition — multiplied across large inventories, this is a six-figure annual cost in most mid-size organizations',
    cost2: '12–18% of enterprise device inventory in "pending disposition" state — 2–4x the cost of actively managed assets on a per-device basis',
    consequence: 'Retired devices in storage are not a future problem. They are an active cost, an active data risk, and a depreciating asset — all simultaneously. Deferred disposition is not a neutral choice.',
  },
  'multi-location-disposal': {
    stat1: 'Organizations with 10 or more locations managing IT asset disposition independently experience compliance documentation inconsistency in 65–80% of locations. Most cannot demonstrate centralized audit readiness because each location manages its own disposal process with its own standards — or no standards at all.',
    stat2: 'Multi-location IT asset retirement programs without centralized vendor management average 3–6 different disposal vendors per organization, each with different documentation formats, chain-of-custody protocols, and certificate standards. During a compliance audit, no single record set covers the organization.',
    stat3: 'Compliance audit failures in multi-location organizations most frequently trace to a single non-compliant location. The chain of custody across an organization is only as strong as its weakest location — and an auditor reviewing a single problematic site can trigger enterprise-wide examination.',
    cost1: '65–80% of independent multi-location disposal programs cannot produce compliant chain-of-custody documentation across all locations',
    cost2: 'Single non-compliant location can trigger enterprise-wide audit review — one weak site breaks the compliance chain for the entire organization',
    consequence: 'Multi-location IT asset disposition managed independently is not just operationally inefficient. It distributes compliance risk across every location and typically surfaces during an audit — when the inconsistency cannot be corrected retroactively.',
  },
  'reverse-logistics-complexity': {
    stat1: 'Enterprise IT retirement events — office relocations, equipment refreshes, facility closures — generate device volumes that exceed in-house logistics capacity in roughly 70% of cases. The overflow creates storage accumulation, undocumented interim handoffs, and chain-of-custody gaps that compound the compliance exposure.',
    stat2: 'Reverse logistics for retired electronics requires coordinated management of collection, packaging, transport, chain-of-custody documentation, and final disposition across multiple transition points. Most organizations lack the vendor infrastructure to manage these steps consistently — especially across multiple locations simultaneously.',
    stat3: 'Device damage and documentation gaps during reverse logistics transport affect 15–25% of enterprise IT retirement shipments managed without dedicated ITAD logistics support. Inadequate packing, mixed carrier streams, and undocumented interim storage are the most common causes.',
    cost1: '15–25% of enterprise IT retirement shipments experience device damage or documentation gaps without dedicated ITAD logistics support',
    cost2: '70% of enterprise IT retirement events exceed in-house logistics capacity — creating the storage and documentation gaps that compound compliance exposure over time',
    consequence: 'Reverse logistics for retired electronics is not a solved problem when handled by general freight carriers or internal IT teams. It is a process gap that creates documentation failures, device damage, and compliance exposure at every transition point.',
  },
  'informal-disposal-risk': {
    stat1: 'Employee-managed IT disposal — devices left at electronics drop-off sites, exchanged through retail trade-in programs, or discarded through informal channels — bypasses chain-of-custody requirements entirely. There is no documentation, no verified data destruction, and no audit trail when a device leaves through an informal channel.',
    stat2: 'Retail trade-in programs, consumer recycling drop-offs, and informal e-waste collection events do not meet enterprise data destruction or chain-of-custody requirements — regardless of the certifications those programs may hold for consumer use. Using them for business device retirement creates compliance exposure the informal channel cannot cure.',
    stat3: 'When an organization cannot produce chain-of-custody and data destruction documentation for retired devices during a compliance audit, the absence of documentation is treated as evidence of noncompliance — not as an ambiguity. Informal disposal programs create absence of documentation by design.',
    cost1: 'Informal device disposal creates uninsurable compliance exposure — no chain-of-custody record, no data destruction certificate, no audit defense',
    cost2: '35–45% of small and mid-size organizations rely primarily on informal disposal channels — meaning a large share of retired devices leave without any documented handling',
    consequence: 'Informal disposal feels like a solved problem until the audit arrives: "Provide chain-of-custody and data destruction documentation for all retired devices in the past three years." The answer from an informal program is silence — and silence is a compliance failure.',
  },
}
