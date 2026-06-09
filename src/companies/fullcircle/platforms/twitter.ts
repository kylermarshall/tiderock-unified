import type { TwitterInputs, TwitterOutput } from '../types'
import { PROBLEM_DATA, COMPANY } from '../lib/companyProfile'
import { scoreContent } from '../lib/scoring'

// ---------------------------------------------------------------------------
// MAIN POSTS — Record<string, string[]> — 3 per problem
// Short, punchy posts using line breaks for emphasis.
// ---------------------------------------------------------------------------

const MAIN_POSTS: Record<string, string[]> = {
  'data-exposure-risk': [
    `Retired laptops are not harmless inventory.\n\nThey are data risk with a dust layer.\n\nEvery device without documented destruction is an open compliance question.`,
    `A factory reset removes the file index.\n\nIt does not remove the data.\n\n60% of factory-reset devices yield recoverable data in forensic testing.`,
    `Your data breach risk may not be in your active systems.\n\nIt may be in a storage closet full of retired devices.\n\nUndocumented. Untracked. Unwiped.`,
  ],
  'chain-of-custody-failures': [
    `Chain-of-custody documentation cannot be reconstructed after the fact.\n\nThe moment an undocumented handoff happens, that gap is permanent.\n\nAuditors treat permanent gaps as compliance failures.`,
    `Your ITAD vendor picked up the devices.\n\nDid anyone document what happened between collection and the certificate?\n\nThat middle is where compliance fails.`,
    `A destruction certificate documents the end.\n\nIt does not document every handoff before it.\n\nRegulators want the whole chain — not just the final link.`,
  ],
  'compliance-gaps': [
    `HIPAA, SOX, GLBA and FERPA each require documented evidence of data destruction.\n\nMost informal disposal programs cannot produce any of the three things auditors look for.\n\nThe audit finds the absence — not an excuse.`,
    `Having a recycling vendor is not the same as being compliant.\n\nCompliance requires documentation: destruction method, serial records, chain of custody.\n\nA recycling receipt satisfies none of the three.`,
    `The compliance failure in most IT disposal programs is not from bad intentions.\n\nIt is from the absence of documentation that was never collected.\n\nAbsence is treated the same as noncompliance.`,
  ],
  'e-waste-mismanagement': [
    `E-waste is 2% of landfill volume.\n\nIt is 70% of toxic waste in landfills.\n\nEPA penalties for improper disposal: $25,000–$70,000 per day per violation. The liability attaches to the generator — not the hauler.`,
    `Your electronics contain lead, mercury and cadmium.\n\nDisposing of them through a dumpster or uncertified vendor creates environmental liability.\n\nThe liability stays with your organization, not the vendor.`,
    `Not every recycler is a certified recycler.\n\nR2 and e-Stewards certifications exist for a reason.\n\nIf your vendor cannot show current certification, your organization carries the environmental liability.`,
  ],
  'device-wiping-assumptions': [
    `A factory reset does not remove data.\n\nIt removes the pointer to the data.\n\nForensic tools recover what the reset left behind — more than 60% of the time.`,
    `Software-only wiping leaves recoverable data on 25–40% of processed devices.\n\nNIST 800-88 specifies the standard. Internal IT wipe logs do not meet it.\n\nThe gap between those two things is where exposure concentrates.`,
    `Your IT team wiped the devices.\n\nDoes the wipe method meet NIST 800-88?\n\nIf the answer is "I think so," the answer is probably no.`,
  ],
  'asset-value-recovery': [
    `Enterprise laptops retired at 3 years retain 25–40% of purchase price.\n\nRouting them all to recycling returns zero.\n\nThe difference between those two outcomes is a single evaluation step.`,
    `Secondary market value drops 15–25% per quarter on delayed devices.\n\nDevices stored 6–12 months before disposition recover 40–60% less.\n\nStorage time is not neutral — it is a direct cost against recovery value.`,
    `A 500-laptop refresh with a 30% recovery rate generates $180,000 in offset.\n\nThe same refresh routed to recycling generates zero — and adds disposal fees.\n\nAsset recovery is a budget line, not a bonus.`,
  ],
  'storage-cost-buildup': [
    `Pending-disposition devices are not waiting in a neutral state.\n\nThey are accruing storage cost, losing secondary market value and carrying data liability.\n\nAll simultaneously. All against assets generating zero operational value.`,
    `$50–$150 per device per month.\n\n12–18% of your fleet in pending disposition at any given time.\n\nThat math is a six-figure annual cost for most mid-size organizations — invisible because it sits in the facilities budget.`,
    `Deferred IT disposal is not free.\n\nIt is a monthly bill that appears in the wrong budget column.\n\nWhen you make storage cost visible in the IT budget, the case for prompt disposition makes itself.`,
  ],
  'multi-location-disposal': [
    `65–80% of multi-location IT disposal programs cannot produce compliant chain-of-custody documentation across all sites.\n\nOne non-compliant location can trigger an enterprise-wide audit.\n\nThe weakest site sets the compliance standard for the whole organization.`,
    `Your headquarters has a formal ITAD program.\n\nDo your regional offices know it exists?\n\nCompliance does not transfer by proximity. It requires explicit implementation at every location.`,
    `Multi-location IT disposal with 3–6 different vendors produces 3–6 different documentation formats.\n\nDuring a compliance audit, no single record set covers the organization.\n\nFragmented vendors create structural compliance gaps.`,
  ],
  'reverse-logistics-complexity': [
    `70% of enterprise IT retirement events exceed in-house logistics capacity.\n\nThe overflow creates undocumented interim storage and chain-of-custody gaps.\n\nCapacity problems become compliance problems.`,
    `Getting devices to users is logistics.\n\nGetting them back safely is compliance.\n\n15–25% of IT retirement shipments without dedicated ITAD support experience device damage or documentation gaps.`,
    `General freight carriers manage delivery.\n\nThey do not manage chain-of-custody, device serialization or compliance documentation.\n\nUsing standard freight for IT retirement is how documentation gaps are created.`,
  ],
  'informal-disposal-risk': [
    `35–45% of SMBs dispose of retired IT through informal channels.\n\nNo chain of custody. No destruction certificate. No audit defense.\n\nInformal disposal creates permanent compliance gaps — not ambiguity.`,
    `The retail trade-in kiosk does not meet HIPAA, SOX or GLBA disposal requirements.\n\nNeither does the employee who dropped the laptop off at a recycling bin.\n\nConsumer programs are not enterprise compliance programs.`,
    `The audit question for informal disposal programs:\n\n"Produce chain-of-custody and data destruction documentation for all retired devices in the past three years."\n\nThe answer from an informal program is silence. Silence is a compliance failure.`,
  ],
}

// ---------------------------------------------------------------------------
// THREADS — Record<string, string[][]> — 3 threads per problem, 5-7 tweets each
// Tweet 1 = hook, tweets 2-5 = mechanism/data/cost/mistake, final = fix + CTA
// ---------------------------------------------------------------------------

const THREADS: Record<string, string[][]> = {
  'data-exposure-risk': [
    [
      `Retired devices are the data security risk most organizations do not audit.\n\nHere is why that is a problem — and what it actually costs. (1/6)`,
      `When a device leaves active use, the data on it does not leave with it.\n\nFactory reset removes the file index. Not the data.\n\nForensic tools recover what the reset left behind in more than 60% of tested devices. (2/6)`,
      `Studies of used devices on secondary markets consistently show 35–40% contain recoverable data.\n\nEmail archives. Financial records. Patient information. Login credentials.\n\nAll of it recoverable, despite prior claims of wiping. (3/6)`,
      `The financial exposure is direct.\n\nAverage data breach cost: $4.45 million.\n\nHIPAA penalties for improper disposal: $100–$50,000 per record per violation.\n\nOne undocumented batch disposal in healthcare can create exposure across thousands of patient records. (4/6)`,
      `The most common mistake: treating device retirement as the end of the security obligation.\n\nIt is not.\n\nThe obligation ends when data is verifiably destroyed and documented — not when the device leaves the building. (5/6)`,
      `The fix: certified data destruction with device-level serialization records and chain-of-custody documentation from collection through final disposition.\n\nNot just a certificate at the end. A record at every step.\n\nFollow ${COMPANY.name} for more ITAD, data security, and electronics recycling insights. (6/6)`,
    ],
    [
      `The data breach risk for most organizations is not just in their active systems.\n\nIt is also in the storage closet.\n\nThread on retired devices and what they actually cost. (1/5)`,
      `Retired devices without verified data destruction carry full exposure risk.\n\nThe risk does not pause because the device is powered off.\n\nData breaches from retired devices create the same regulatory liability as breaches from active systems. (2/5)`,
      `HIPAA alone can levy $100 to $50,000 per record per violation for improper data disposal.\n\nIn an organization retiring hundreds of devices per year, one undocumented disposal event generates exposure across every record on every device.\n\nThe math compounds fast. (3/5)`,
      `The trigger for liability is rarely dramatic.\n\nA device on a secondary market. A forensic test by a downstream recipient. An audit that asks for documentation an informal program cannot produce.\n\nThe devices that cause exposure are usually the ones no one is tracking. (4/5)`,
      `A formal ITAD program closes the exposure gap before the trigger arrives.\n\nDevice-level destruction certificates. Serialized chain-of-custody records. Verified destruction methods that meet the compliance standard.\n\nFollow for more practical breakdowns on retiring technology assets safely. (5/5)`,
    ],
    [
      `The average organization retires 15–25% of its device inventory every year.\n\nMost cannot tell you what happened to those devices after they left IT.\n\nThat is the data exposure problem. (1/6)`,
      `"We recycled it" is not a data security answer.\n\nRecycling removes the device. It does not necessarily remove the data.\n\nWithout certified destruction, the data travels with the device wherever it goes. (2/6)`,
      `Software-only wiping without certified verification leaves recoverable data on 25–40% of devices.\n\nNIST 800-88 specifies wiping methods and verification requirements.\n\nMost internal IT wiping processes meet neither. (3/6)`,
      `The cost of getting this wrong is measured two ways.\n\nDirect: $4.45 million average data breach cost. HIPAA penalties at $100–$50,000 per record.\n\nIndirect: the regulatory investigation that covers every device retired in the same program for the past three years. (4/6)`,
      `The organizations most exposed are not the ones that made bad choices.\n\nThey are the ones that made no formal choice at all — allowed retirement to happen informally, without documentation standards or vendor accountability. (5/6)`,
      `The fix: integrate device retirement into your data governance program.\n\nSame documentation standards. Same audit trails. Same verification requirements as active data destruction.\n\nVisit ${COMPANY.website} to learn how ${COMPANY.name} handles IT asset disposition. (6/6)`,
    ],
  ],

  'chain-of-custody-failures': [
    [
      `A chain-of-custody gap is not a paperwork problem.\n\nIt is a provability problem.\n\nHere is what that means for your compliance program. (1/6)`,
      `When regulators ask for proof of secure device disposal, they want the full chain — not just the destruction certificate at the end.\n\nCollection. Transport. Intake. Processing. Final disposition.\n\nEach step requires documentation. Most informal programs document one or two. (2/6)`,
      `Organizations with multi-location IT infrastructure average 3–7 undocumented device handoffs before final disposition.\n\nEach undocumented handoff is a permanent gap in the compliance record.\n\nPermanent. It cannot be reconstructed after the fact. (3/6)`,
      `HIPAA, SOX and FERPA each require demonstrable chain-of-custody evidence for data-bearing device disposal.\n\nMissing documentation — even for a single device in an otherwise compliant program — creates compliance exposure that cannot be remediated after the fact. (4/6)`,
      `The most common mistake: treating chain of custody as a destination record rather than a continuous one.\n\nA final certificate documents the endpoint.\n\nIt does not document every handoff that preceded it. Auditors look at the whole record. (5/6)`,
      `The fix: documented handoffs at every transition, with timestamps, personnel records, and device serialization at each point.\n\nOne continuous record — not a collection of individual vendor receipts.\n\nFollow ${COMPANY.name} for more ITAD, data security, and electronics recycling insights. (6/6)`,
    ],
    [
      `Chain-of-custody failures in IT asset disposition are the most common compliance gap auditors find.\n\nHere is why they happen — and why they cannot be fixed retroactively. (1/5)`,
      `The gap usually starts at the first handoff.\n\nIT hands the devices to a vendor. The vendor picks them up. There is no signed transfer record documenting the handoff.\n\nThat undocumented moment becomes a permanent hole in the compliance record. (2/5)`,
      `Multi-location organizations using 3–6 different disposal vendors average no unified chain-of-custody record set.\n\nDuring a compliance audit, no single document covers the organization.\n\nFragmented vendors create structural documentation gaps. (3/5)`,
      `Compliance penalties from chain-of-custody failures can exceed $1 million per audit finding under HIPAA and SOX.\n\nLegal liability from undocumented device handoffs typically runs 3–5x the direct compliance penalty.\n\nThe paperwork problem becomes a very expensive legal problem. (4/5)`,
      `The fix is continuous documentation — not a certificate at the end, but a signed record at every physical transition.\n\nSerial-level. Timestamped. Signed by every party that touches the device.\n\nFollow for more insights on IT asset disposition, compliance, and risk reduction. (5/5)`,
    ],
    [
      `A factory reset does not remove data.\n\nNeither does an undocumented chain of custody prove secure handling.\n\nBoth problems compound each other. (1/7)`,
      `Chain-of-custody documentation answers one question: can you prove, at every step, that a device was handled in a way that prevented unauthorized access to its data?\n\nNot just at the endpoint. At every point. (2/7)`,
      `Most informal disposal programs produce a certificate at the end.\n\nThey do not produce documentation of collection, transport, interim storage or intake.\n\nAuditors look at the whole record. The missing steps are the compliance failure. (3/7)`,
      `The consequence is not hypothetical.\n\nA single chain-of-custody gap in a device that later appears on a secondary market triggers regulatory investigation of the entire disposal program — not just that device. (4/7)`,
      `The hardest part of chain-of-custody failures: they cannot be fixed retroactively.\n\nOnce a handoff goes undocumented, the gap is permanent.\n\nThere is no procedure to reconstruct a custody record that was never created. (5/7)`,
      `The organizations that discover this problem during an audit are in a structurally difficult position.\n\nThe documentation gaps for past disposals are permanent.\n\nThe audit finding is based on what the record shows — and a missing record shows nothing provable. (6/7)`,
      `The fix is process-level: continuous documentation at every handoff, by every party, for every device.\n\nStart before the audit. Starting after is too late.\n\nFollow for more practical breakdowns on retiring technology assets safely. (7/7)`,
    ],
  ],

  'compliance-gaps': [
    [
      `Most compliance failures in IT asset disposition are not caused by bad intentions.\n\nThey are caused by the absence of documentation that was never collected.\n\nHere is what auditors actually look for. (1/6)`,
      `Regulatory auditors examining IT asset disposition want three things:\n\n1. Documented destruction method\n2. Device-level serialization records\n3. Chain-of-custody from collection to final disposition\n\nMost informal programs can provide none of the three. (2/6)`,
      `HIPAA, SOX, FERPA and GLBA each require documented evidence — not a policy that says you do it, but proof that you did it.\n\nFor each device. In a format that satisfies the applicable regulatory standard.\n\nA recycling receipt satisfies none of these frameworks. (3/6)`,
      `Compliance failures compound across devices.\n\nA single audit finding covering 500 devices disposed without documentation generates penalty exposure for each device.\n\nAt per-record penalty rates under HIPAA, the math compounds rapidly in organizations with large device inventories. (4/6)`,
      `The risk is not theoretical.\n\nIt is an audit event waiting for a trigger — a device appearing where it should not, or an audit request that an informal process cannot answer.\n\nAverage regulatory penalty from improper IT asset disposition: $500,000–$2 million per audit event. (5/6)`,
      `The fix: a formal ITAD program with device-level destruction certificates, serialization records and a chain-of-custody file that survives a compliance audit — built before the auditor arrives, not after.\n\nFollow ${COMPANY.name} for more ITAD, data security, and electronics recycling insights. (6/6)`,
    ],
    [
      `Having a device disposal policy is not the same as being compliant.\n\nCompliance requires documented proof the policy was executed — for every device, every time.\n\nMost organizations discover this distinction during an audit. (1/5)`,
      `The distinction matters because regulators do not review intent.\n\nThey review evidence.\n\n"We have a policy" is a statement. "Here is the device-level destruction certificate for each of those 300 retired laptops" is evidence. (2/5)`,
      `The gap between those two things is where most informal IT disposal programs fail.\n\nThe policy exists. The evidence does not.\n\nAuditors treat the absence of evidence the same as noncompliance — not as an ambiguity. (3/5)`,
      `The cost: average regulatory penalty from improper IT asset disposition runs $500,000–$2 million per audit event.\n\nLegal defense costs typically run 2–3x the direct penalty.\n\nThe policy-versus-evidence gap is not a minor administrative gap. (4/5)`,
      `The fix is a process change, not a policy revision.\n\nBuild documentation collection into the disposal process from point of retirement forward. Ensure every device that leaves produces a traceable record.\n\nFollow for more insights on IT asset disposition, compliance, and risk reduction. (5/5)`,
    ],
    [
      `The audit did not find a breach.\n\nIt found an absence of records.\n\nThread on the most common compliance failure in IT asset disposition. (1/6)`,
      `Most organizations that fail IT asset disposition audits did not dispose of devices badly.\n\nThey disposed of them without building a documentation trail.\n\nThe outcome of a disposal event matters less to an auditor than whether the outcome is documented and traceable. (2/6)`,
      `HIPAA, SOX, GLBA and FERPA auditors want:\n\n— Destruction method documentation\n— Device serial number records\n— Chain-of-custody from collection to disposition\n\nInformal programs produce receipts and assumptions. Not documentation. (3/6)`,
      `The trigger is rarely a dramatic breach.\n\nMore often it is a device on a secondary market, an employee complaint, or a routine audit cycle.\n\nWhen the trigger arrives, the program is evaluated on its documentation. (4/6)`,
      `Compliance risk from IT asset disposition is an audit event waiting for a trigger.\n\nThe trigger does not announce itself in advance.\n\nBy the time it arrives, the past disposals are already permanently undocumented. (5/6)`,
      `The fix: assign compliance ownership of device disposition to whoever owns data governance.\n\nRequire the same documentation standard for retiring a device as for destroying active data.\n\nVisit ${COMPANY.website} to learn how ${COMPANY.name} handles IT asset disposition. (6/6)`,
    ],
  ],

  'e-waste-mismanagement': [
    [
      `The liability from improper e-waste disposal does not attach to the hauler.\n\nIt attaches to the organization that generated the waste.\n\nHere is what that means. (1/6)`,
      `Electronics contain lead, mercury, cadmium and beryllium.\n\nWhen these materials end up in landfills or uncertified facilities, EPA regulations hold the generating organization accountable — regardless of what the vendor claimed to do with the devices. (2/6)`,
      `E-waste is approximately 2% of landfill volume.\n\nIt accounts for roughly 70% of toxic waste in landfills.\n\nOrganizations that dispose through general waste streams create regulatory exposure regardless of whether they knew the materials were present. (3/6)`,
      `EPA penalties for hazardous waste violations from improper electronics disposal: $25,000–$70,000 per day per violation.\n\nEnvironmental remediation costs from a contamination site: $200,000–$5 million.\n\nThe numbers reflect the actual toxicity of the materials, not the intent of the disposer. (4/6)`,
      `The most common mistake: assuming the vendor's certification removes your liability.\n\nIf the vendor was not certified to handle the waste, or if their certification was lapsed, the liability stays with the organization that generated it. (5/6)`,
      `The fix: R2 or e-Stewards certified ITAD vendors with verified current certification status — not just at vendor onboarding, but verified before each disposal event.\n\nFollow ${COMPANY.name} for more ITAD, data security, and electronics recycling insights. (6/6)`,
    ],
    [
      `"We use a recycler" does not close environmental liability in electronics disposal.\n\nHere is what does — and what most organizations are missing. (1/5)`,
      `Not every recycler is certified to handle the hazardous materials in electronics.\n\nR2 and e-Stewards certifications are the relevant standards.\n\nUsing an uncertified vendor — even unknowingly — leaves liability with the organization that generated the waste. (2/5)`,
      `Certifications lapse.\n\nSubcontractors may not carry the same certification as the primary vendor.\n\nDownstream material handling may not match the certifications displayed at the vendor's front door.\n\nVendor due diligence cannot be a one-time check at onboarding. (3/5)`,
      `EPA civil penalties for knowing violations of hazardous waste disposal rules: up to $70,000 per day per violation.\n\nCriminal penalties are also possible for intentional violations.\n\nThe generating organization faces these penalties regardless of vendor chain. (4/5)`,
      `The fix: verify R2 or e-Stewards certification status before each disposal event.\n\nRequire downstream material flow documentation as part of the vendor contract — not just a recycling receipt, but auditable documentation of where every material goes.\n\nFollow for more practical breakdowns on retiring technology assets safely. (5/5)`,
    ],
    [
      `Consumer recycling and enterprise e-waste compliance are not the same thing.\n\nMost organizations using consumer channels for business device retirement do not know the difference.\n\nThread on where the liability lives. (1/6)`,
      `Consumer recycling drop-offs are designed to keep electronics out of landfills.\n\nThey are not designed to produce the downstream documentation that satisfies enterprise environmental liability requirements.\n\nMost do not track material flows beyond the initial collection point. (2/6)`,
      `E-waste represents roughly 2% of landfill volume but accounts for approximately 70% of toxic waste in landfills.\n\nWhen your devices contribute to that number, the liability is yours regardless of what the drop-off site told you at the time. (3/6)`,
      `The standard for enterprise e-waste management is not "we dropped it off somewhere that accepted it."\n\nIt is certified handling with documented downstream material accountability — proof that the materials in your devices were processed by facilities equipped to handle them. (4/6)`,
      `The materials in your old laptops and servers — lead, mercury, cadmium — are regulated for good reason.\n\nThe regulatory framework that governs them (RCRA) does not distinguish between knowing and unknowing violations when assigning liability. (5/6)`,
      `The fix: enterprise e-waste disposal through R2 or e-Stewards certified vendors, with verified current certification status and downstream documentation proving materials were processed — not just collected — by certified facilities.\n\nFollow for more insights on IT asset disposition, compliance, and risk reduction. (6/6)`,
    ],
  ],

  'device-wiping-assumptions': [
    [
      `A factory reset does not remove data.\n\nIt removes the pointer to the data.\n\nHere is what that means for enterprise device retirement. (1/6)`,
      `When you reset a device and hand it to a vendor, recycler or employee:\n\nThe data is still there.\n\nThe directory is gone. The content is not. (2/6)`,
      `Forensic recovery from factory-reset devices succeeds at rates above 60% in controlled testing.\n\nSoftware-only wiping without certified verification leaves recoverable data on 25–40% of devices processed through typical enterprise IT retirement programs. (3/6)`,
      `NIST 800-88 specifies wiping methods and verification requirements.\n\nMost internal IT wiping processes do not meet NIST 800-88 — and cannot demonstrate compliance with it during an audit.\n\nThe gap between "we wiped it" and "we wiped it to a compliance standard" is where exposure concentrates. (4/6)`,
      `The cost of getting this wrong: data exposure from inadequately wiped devices carries average regulatory exposure of $500,000–$2 million per incident.\n\nPlus the liability from whatever the recovered data contains.\n\nPlus the regulatory investigation triggered by the discovery. (5/6)`,
      `The fix: NIST 800-88-compliant data sanitization with third-party verification and device-level certificates.\n\nNot an internal IT log. An auditable, serialized destruction record that survives regulatory scrutiny.\n\nFollow ${COMPANY.name} for more ITAD, data security, and electronics recycling insights. (6/6)`,
    ],
    [
      `Most enterprise IT teams run a wipe utility on retired devices.\n\nMost do not verify the wipe meets a compliance standard.\n\nThose are not the same thing. Thread. (1/5)`,
      `Running a wipe utility removes data in most cases.\n\nIt does not verify which cases it missed.\n\nSoftware-only wiping without verification leaves recoverable data on 25–40% of processed devices. There is no way to identify the exceptions without verification. (2/5)`,
      `SSD storage adds complexity.\n\nOverwrite-based wiping methods designed for spinning disk drives do not fully sanitize solid-state storage.\n\nNIST 800-88 addresses this distinction. Most internal IT processes apply one method to all storage types. (3/5)`,
      `The risk is invisible until it is not.\n\nA device that was inadequately wiped does not announce itself.\n\nThe gap surfaces when a forensic tool, a secondary market discoverer, or a regulator finds the data. By then, the device has already left organizational control. (4/5)`,
      `The fix: media-type-specific sanitization — cryptographic erase for encrypted SSDs, secure overwrite per NIST 800-88 for HDDs, physical destruction for drives that cannot be certified clean.\n\nThird-party verified. Device-level certificates.\n\nFollow for more practical breakdowns on retiring technology assets safely. (5/5)`,
    ],
    [
      `The assumption that device wiping is a solved internal IT process is one of the more consequential assumptions in enterprise data security.\n\nHere is why it is wrong — and what to do about it. (1/6)`,
      `The assumption persists because the failure is invisible.\n\nA device that was inadequately wiped does not announce itself.\n\nIt leaves the building looking clean, and the gap only surfaces when a forensic tool or a regulator tests it. (2/6)`,
      `NIST 800-88 distinguishes between three sanitization levels: clear, purge and destroy.\n\nEach has specific method requirements.\n\nThe compliance gap is rarely between "wiped" and "not wiped." It is between "wiped to internal standard" and "wiped to a standard that survives regulatory scrutiny." (3/6)`,
      `60% of factory-reset devices tested forensically yield recoverable data.\n\n25–40% of enterprise-wiped devices contain recoverable data without verified sanitization.\n\nThose are not edge cases. They are the predictable result of wiping without a compliance-standard method. (4/6)`,
      `Data exposure from inadequately wiped devices carries average regulatory exposure of $500,000–$2 million per incident.\n\nThe cost does not distinguish between breaches from active systems and breaches from retired devices.\n\nExposure is exposure, regardless of when the device left the building. (5/6)`,
      `The fix: third-party certified data sanitization using verified methods, paired with device-level certificates that link the sanitization method to each device serial number.\n\nNot an internal log. A defensible record.\n\nVisit ${COMPANY.website} to learn how ${COMPANY.name} handles IT asset disposition. (6/6)`,
    ],
  ],

  'asset-value-recovery': [
    [
      `Most organizations route all retired devices to recycling.\n\nMost are leaving 25–40% of original purchase price on the table.\n\nThread on the recovery math. (1/5)`,
      `Enterprise laptops retired at 3 years retain 25–40% of original purchase price on secondary markets.\n\nFor a $1,200 laptop, that is $300–$480 per device.\n\nFor a fleet of 300 laptops, that is $90,000–$144,000 in potential offset — lost entirely when all devices route to recycling. (2/5)`,
      `The recovery window closes fast.\n\nSecondary market value declines 15–25% per quarter.\n\nDevices stored 6–12 months before disposition recover 40–60% less than devices retired promptly.\n\nStorage time is not neutral — it is a direct cost against the recovery budget. (3/5)`,
      `The most common mistake: routing all retired devices to recycling because no one built a recovery evaluation into the process.\n\nNot every device is worth recovering. But the ones that are lose value every month without a formal evaluation step. (4/5)`,
      `The fix: a formal asset value evaluation at the point of retirement — sort by age, condition and model before routing.\n\nBuild the recovery step into the retirement process, not as an afterthought.\n\nFollow ${COMPANY.name} for more ITAD, data security, and electronics recycling insights. (5/5)`,
    ],
    [
      `IT asset recovery is not a bonus.\n\nIt is a budget offset that most organizations are not capturing.\n\nHere is the math. (1/6)`,
      `The average enterprise organization retires 15–25% of its device inventory each year.\n\nWithout a formal asset recovery program, that annual retirement cycle generates zero recovery value.\n\nWith one, it generates a meaningful offset against the cost of replacement. (2/6)`,
      `The peak recovery window is 24–36 months from purchase.\n\nDevices retired at 48–60 months recover significantly less — sometimes nothing.\n\nWaiting until devices are fully obsolete before retiring them destroys the recovery value that justified the refresh. (3/6)`,
      `Over a three-year device lifecycle for a 2,000-device fleet, the difference between a formal recovery program and a recycle-everything approach can exceed $400,000 in unrealized recovery value.\n\nThat is a recurring annual number — not a one-time opportunity. (4/6)`,
      `The mistake: treating IT disposal as a cost center.\n\nAsset recovery turns it into a budget offset.\n\nThe difference is a single evaluation step and a vendor relationship that includes secondary market remarketing. (5/6)`,
      `The fix: align device refresh cycles with the secondary market recovery window.\n\nRetire at 3 years, not 5. The earlier retirement pays for itself from recovery value — and reduces the storage cost of holding aging hardware.\n\nFollow for more operator-level IT and reverse logistics insights. (6/6)`,
    ],
    [
      `Delayed IT retirement costs twice.\n\nFirst, it extends the operational life of devices past the cost-effective point.\n\nSecond, it destroys the secondary market recovery value. (1/5)`,
      `Every quarter a device sits in storage rather than being retired costs 15–25% of its secondary market value.\n\nDevices held 6–12 months before disposition recover 40–60% less than devices retired promptly.\n\nThe clock starts the day the device leaves active service. (2/5)`,
      `An organization storing 300 devices for six months at $100/device/month spends $180,000 in carrying cost.\n\nThose same devices are simultaneously losing secondary market value each month they wait.\n\nDeferred retirement is a compounding cost on two dimensions. (3/5)`,
      `The batching problem: large quarterly or annual retirement events feel operationally efficient.\n\nThey maximize storage cost and value loss by holding devices longer than necessary.\n\nLocal efficiency creates organizational cost. (4/5)`,
      `The fix: rolling retirement — process devices as they are retired rather than accumulating them for batch events.\n\nReduces storage cost, captures peak recovery value, keeps the compliance record current.\n\nVisit ${COMPANY.website} to learn how ${COMPANY.name} handles IT asset disposition. (5/5)`,
    ],
  ],

  'storage-cost-buildup': [
    [
      `Pending-disposition devices are not waiting in a neutral state.\n\nThey are actively generating cost on three dimensions simultaneously.\n\nThread on what deferred IT disposal actually costs. (1/6)`,
      `Dimension one: direct storage cost.\n\n$50–$150 per device per month in facility space, IT staff time and physical security overhead.\n\nA 200-device inventory in pending disposition costs $10,000–$30,000 per month — before any disposition action is taken. (2/6)`,
      `Dimension two: value depreciation.\n\nEvery month a device sits in storage is 15–25% of quarterly secondary market value eroded.\n\nDevices stored 6–12 months before disposition recover 40–60% less than devices retired promptly. (3/6)`,
      `Dimension three: data security liability.\n\nDevices in storage carry the same exposure risk as active devices.\n\nPhysical security requirements, inventory management for audit purposes, and the administrative burden of managing pending disposition devices all add cost that does not appear on any IT line item. (4/6)`,
      `The reason this cost is invisible: storage cost shows up in facilities, not IT operations.\n\nIT teams make disposal timing decisions without seeing the full cost of deferring them.\n\nThe accounting separation makes a six-figure annual cost disappear from the decision-making view. (5/6)`,
      `The fix: make storage cost visible in the IT disposal budget.\n\nWhen the carrying cost is a line item in the retirement decision, the math for prompt disposition makes itself.\n\nFollow ${COMPANY.name} for more ITAD, data security, and electronics recycling insights. (6/6)`,
    ],
    [
      `The IT disposal decision is treated as a timing decision.\n\nIt is actually a cost decision.\n\nHere is the math most IT teams are not seeing. (1/5)`,
      `The average enterprise organization has 12–18% of its device inventory in "end-of-life pending disposition" at any given time.\n\nAt a 1,000-device organization, that is 120–180 devices at $100/device/month.\n\n$12,000–$18,000 per month in direct holding cost. Zero operational value generated. (2/5)`,
      `That cost does not appear on an IT line item.\n\nIt is absorbed into facilities overhead — invisible in the IT budget while real in the facilities budget.\n\nIT teams making deferral decisions do not see it. Facilities teams paying it do not connect it to IT disposal timing. (3/5)`,
      `The cost compounds on three dimensions: storage expense, secondary market value loss and ongoing data liability.\n\nNone of these costs decrease with time.\n\nDeferred disposition is not a neutral choice. It is a decision to pay more — in every direction — later. (4/5)`,
      `The fix: set a disposition SLA for every device retirement. No device in pending disposition longer than 30 days.\n\nAssign ownership of the SLA to whoever owns the IT budget — not just IT operations.\n\nFollow for more insights on IT asset disposition, compliance, and risk reduction. (5/5)`,
    ],
    [
      `The storage closet full of retired IT is not a future problem.\n\nIt is a current one — it is just billed to the wrong budget.\n\nThread on the hidden cost of deferred disposal. (1/6)`,
      `Most IT teams do not count storage cost as part of the disposal budget.\n\nBecause storage cost shows up in facilities — not IT.\n\nThe practical effect: IT teams make disposal timing decisions without seeing the cost of deferring them. (2/6)`,
      `At $50–$150 per device per month, an organization with 200 devices in pending disposition is spending $10,000–$30,000 per month on hardware that generates no value.\n\nAnnualized: $120,000–$360,000.\n\nNone of it appears on the IT disposal line item. (3/6)`,
      `The full cost of unmanaged storage:\n\n— Direct storage fees\n— IT staff time for inventory management\n— Physical security overhead\n— Insurance and liability for undocumented devices\n\nThe vendor invoice at disposition is the smallest part of the total cost. (4/6)`,
      `And the devices are simultaneously losing secondary market value.\n\nDevices stored 6–12 months before disposition recover 40–60% less than devices retired promptly.\n\nStorage cost plus value loss means the total cost of deferral is significantly higher than the direct storage number alone. (5/6)`,
      `The fix: measure the full lifecycle cost of device retirement — from the day a device is removed from active service through the day a destruction certificate is received.\n\nThe carrying cost will change how quickly you schedule disposition.\n\nFollow for more practical breakdowns on retiring technology assets safely. (6/6)`,
    ],
  ],

  'multi-location-disposal': [
    [
      `Multi-location IT disposal managed independently distributes compliance risk across every location.\n\nAnd surfaces it during an audit — when it cannot be corrected retroactively.\n\nThread on how this happens. (1/6)`,
      `Organizations with 10 or more locations managing disposal independently experience compliance documentation inconsistency in 65–80% of those locations.\n\nMost use 3–6 different disposal vendors.\n\nEach with different documentation formats, chain-of-custody protocols and certificate standards. (2/6)`,
      `During a compliance audit, no single record set covers the organization.\n\nThe auditor does not review a representative sample.\n\nThey review the organization — and one non-compliant site can trigger enterprise-wide examination. (3/6)`,
      `Compliance audit failures in multi-location organizations most frequently trace to a single non-compliant location.\n\nThe chain of custody across an organization is only as strong as its least-documented site.\n\nLocal informal disposal creates enterprise compliance exposure. (4/6)`,
      `The mistake most organizations make: assuming that because headquarters has a formal program, satellite offices do too.\n\nCompliance programs do not replicate themselves.\n\nThey require explicit implementation at every location. (5/6)`,
      `The fix: centralized ITAD vendor with standardized protocols across all locations.\n\nSingle documentation format. Single chain-of-custody standard. Single audit record covering the entire organization.\n\nFollow ${COMPANY.name} for more ITAD, data security, and electronics recycling insights. (6/6)`,
    ],
    [
      `One non-compliant location in your multi-location organization can trigger an enterprise-wide compliance audit.\n\nHere is why — and how to prevent it. (1/5)`,
      `65–80% of independent multi-location IT disposal programs cannot produce compliant chain-of-custody documentation across all locations.\n\nThat failure rate reflects the structural problem of distributed disposal without central oversight.\n\nNot negligence — design. (2/5)`,
      `When one location's non-compliance triggers an enterprise-wide audit, the cost is not just the penalty for that location.\n\nIt is the cost of demonstrating compliance across every site — which informal multi-location programs cannot do.\n\nThe audit scope expands to cover everything. (3/5)`,
      `The compliance chain is only as strong as its weakest documented handoff.\n\nThat weakest link is usually not headquarters.\n\nIt is the regional office where someone left devices with a local hauler and no one documented it. (4/5)`,
      `The fix: audit your disposal program at the location level before a regulator does.\n\nIdentify which sites have documentation gaps and bring them into a centralized program before the next audit cycle.\n\nFollow for more insights on IT asset disposition, compliance, and risk reduction. (5/5)`,
    ],
    [
      `Every office handles device disposal differently.\n\nThat is not an operational quirk.\n\nIt is a compliance structure problem. Thread. (1/6)`,
      `Distributed IT disposal decisions — even well-intentioned ones — create inconsistent compliance records that cannot be unified retroactively.\n\nEach location that starts with an informal process creates documentation gaps that are permanent before anyone notices them. (2/6)`,
      `Organizations using 3–6 different disposal vendors across locations have no single record set covering their enterprise-wide disposition program.\n\nThis gap is structural — it cannot be papered over when an audit arrives. (3/6)`,
      `The administrative cost of managing a multi-vendor, multi-format documentation program across locations typically exceeds the cost of a centralized program.\n\nMore expensive. Worse compliance outcomes. That is the decentralized model. (4/6)`,
      `Price-optimized local disposal creates enterprise-wide compliance risk.\n\nThe vendor selected for local convenience may be the most cost-effective option at the location level.\n\nAt the organization level, it is the variable that breaks the compliance record. (5/6)`,
      `The fix: centralize vendor selection and documentation standards before the next device refresh.\n\nA single vendor contract covering all locations is both more cost-effective and more compliant than a decentralized model.\n\nVisit ${COMPANY.website} to learn how ${COMPANY.name} handles IT asset disposition. (6/6)`,
    ],
  ],

  'reverse-logistics-complexity': [
    [
      `Reverse logistics for retired electronics is not a shipping problem.\n\nIt is a compliance problem that happens to involve shipping.\n\nHere is the difference — and why it matters. (1/6)`,
      `Standard freight carriers manage delivery.\n\nThey do not manage chain-of-custody documentation, device-level serialization or compliance records.\n\nWhen enterprise IT retirement events route through general freight, the compliance record breaks at the first undocumented transfer. (2/6)`,
      `Device damage and documentation gaps during reverse logistics affect 15–25% of enterprise IT retirement shipments managed without dedicated ITAD logistics support.\n\nInadequate packing, mixed carrier streams and undocumented interim storage are the most common causes — all preventable with a purpose-built process. (3/6)`,
      `70% of enterprise IT retirement events exceed in-house logistics capacity.\n\nThe overflow creates the problem: devices handled ad hoc, stored informally, routed through non-standard carriers.\n\nCapacity exceedance is where documentation integrity breaks down. (4/6)`,
      `A single shipment with documentation gaps creates a chain-of-custody hole that cannot be retroactively filled.\n\nEvery device in that shipment carries the compliance gap forward — regardless of the final disposition outcome. (5/6)`,
      `The fix: dedicated ITAD logistics with device-level intake at collection, serialized manifests for every shipment and chain-of-custody continuity from pickup through final disposition certificate.\n\nFollow ${COMPANY.name} for more ITAD, data security, and electronics recycling insights. (6/6)`,
    ],
    [
      `The gap between IT's retirement decision and the ITAD vendor's destruction certificate is where most compliance failures in reverse logistics occur.\n\nThread on what happens in that gap. (1/5)`,
      `Between retirement decision and destruction certificate:\n\n— Physical collection from the user\n— Transfer to a staging area\n— Pickup by a carrier\n— Delivery to a processing facility\n— Facility intake\n\nEach handoff is a documentation opportunity. Most informal programs document one or two of them. (2/5)`,
      `When in-house logistics capacity is exceeded — which happens in 70% of enterprise IT retirement events — the process breaks down.\n\nDevices are handled ad hoc. Stored informally. Routed through carriers with no intake documentation.\n\nThe overflow is where the compliance record fragments. (3/5)`,
      `Device damage in transit eliminates secondary market recovery value entirely.\n\nCombined with the documentation gaps that typically accompany unmanaged reverse logistics, a poorly managed IT retirement event costs significantly more than a properly managed one — in disposal fees, lost recovery value and compliance exposure. (4/5)`,
      `The fix: purpose-built ITAD reverse logistics — padded packing, serialized manifests, chain-of-custody at every transfer point, and a partner with infrastructure to manage volume spikes from large retirement events.\n\nFollow for more operator-level IT and reverse logistics insights. (5/5)`,
    ],
    [
      `Eighty devices picked up.\n\nChain-of-custody documented on forty-three.\n\nThread on why this happens and how to prevent it. (1/6)`,
      `The reverse logistics phase of IT asset retirement is where chain-of-custody failures most frequently occur.\n\nPhysical control changes hands multiple times between collection and processing.\n\nEach transfer is an opportunity for a documentation gap. (2/6)`,
      `Enterprise IT retirement events — office relocations, equipment refreshes, facility closures — generate device volumes that exceed in-house capacity in roughly 70% of cases.\n\nThe overflow gets handled ad hoc.\n\nAd hoc handling and documentation integrity are incompatible. (3/6)`,
      `A chain-of-custody break in reverse logistics invalidates the compliance record for every device in that transit chain.\n\nOne undocumented shipment can compromise the compliance record for hundreds of devices.\n\nVolume spikes expose every weakness in an informal logistics process. (4/6)`,
      `The mistake: scaling reverse logistics processes designed for normal device volume to handle large retirement events.\n\nInformal processes that work adequately at low volume break down at scale.\n\nLarge retirement events require dedicated infrastructure, not scaled informality. (5/6)`,
      `The fix: pre-planned reverse logistics for large retirement events — staffed pickups, serialized collection manifests, dedicated transport with documented chain of custody, direct intake at a certified ITAD facility.\n\nVisit ${COMPANY.website} to learn how ${COMPANY.name} handles IT asset disposition. (6/6)`,
    ],
  ],

  'informal-disposal-risk': [
    [
      `Informal disposal programs do not create gray-area compliance situations.\n\nThey create the absence of documentation.\n\nAnd the absence of documentation is treated as a compliance failure during an audit — not as an ambiguity. (1/6)`,
      `35–45% of small and mid-size organizations rely primarily on informal disposal channels for retired IT.\n\nConsumer drop-offs. Retail trade-in programs. Employee-managed recycling. Informal haulers.\n\nNone of these produce the documentation regulatory frameworks require. (2/6)`,
      `The audit question for informal programs is simple:\n\n"Produce chain-of-custody and data destruction documentation for all retired devices in the past three years."\n\nThe answer from an informal program is silence.\n\nSilence is a compliance failure. (3/6)`,
      `Consumer recycling programs are designed for individuals.\n\nThey are not designed to produce enterprise compliance documentation.\n\nHIPAA, SOX and GLBA require device-level destruction certificates and chain-of-custody records that consumer programs are not structured to provide. (4/6)`,
      `The cost of informal disposal is not visible while the devices are leaving without incident.\n\nIt becomes visible when the audit arrives — and the penalty exposure from three years of undocumented disposals is calculated at per-record penalty rates. (5/6)`,
      `The fix: a formal ITAD program does not require complexity.\n\nA defined intake process, serialized device tracking, verified data destruction and a destruction certificate linked to each device close the compliance gap.\n\nFollow ${COMPANY.name} for more ITAD, data security, and electronics recycling insights. (6/6)`,
    ],
    [
      `The retail trade-in program does not meet HIPAA disposal requirements.\n\nNeither does the employee who dropped the laptop off at a recycling event.\n\nThread on what informal disposal actually creates. (1/5)`,
      `When an organization cannot produce chain-of-custody and data destruction documentation for retired devices during a compliance audit, the absence of documentation is treated as evidence of noncompliance.\n\nNot as a gray area.\n\nNot as an ambiguity.\n\nAs a compliance failure. (2/5)`,
      `Informal disposal creates a retroactively unfixable problem.\n\nOnce a device leaves without documentation, there is no path to creating the missing record.\n\nThe compliance gap is permanent. (3/5)`,
      `Organizations that use informal channels typically do so because no formal alternative was built into their operations.\n\nThe informal channel is the path of least resistance — until the audit arrives.\n\n35–45% of SMBs are in this position. Most have never faced a compliance audit of their IT disposal program. (4/5)`,
      `The fix: replace informal disposal with a documented ITAD program.\n\nEven a basic one: a chain-of-custody record, a destruction certificate and a serialized inventory are the minimum requirements for audit defense.\n\nFollow for more practical breakdowns on retiring technology assets safely. (5/5)`,
    ],
    [
      `Informal disposal is not a risk until it is the only answer to an auditor's question.\n\nAnd then it is the complete answer to that question.\n\nThread. (1/6)`,
      `The question: "Show us chain-of-custody and data destruction documentation for every device your organization retired in the past three years."\n\nFor informal programs, the answer is silence.\n\nSilence — from a regulatory standpoint — is not a neutral response. (2/6)`,
      `The challenging part of informal disposal risk: it is invisible until the trigger arrives.\n\nOrganizations using informal channels typically process devices without incident for years.\n\nNo breach. No complaint. No audit. The absence of consequences is not the same as the absence of risk. (3/6)`,
      `The trigger can be anything.\n\nA breach investigation. A regulatory complaint. A routine audit cycle. A device discovered on a secondary market.\n\nWhen it arrives, the program is evaluated on its documentation. Informal programs have none. (4/6)`,
      `The cost of building a formal ITAD program: a process change and a vendor selection.\n\nThe cost of not having one: regulatory penalties, legal exposure and liability from devices that left without documentation.\n\nThe comparison is not close. (5/6)`,
      `The fix: start with a formal program for future disposals and build backward documentation where possible.\n\nThe goal is a defensible position for the next audit — and a complete record for every disposal after today.\n\nVisit ${COMPANY.website} to learn how ${COMPANY.name} handles IT asset disposition. (6/6)`,
    ],
  ],
}

// ---------------------------------------------------------------------------
// ALTERNATE HOOKS — Record<string, string[]> — 3 per problem
// ---------------------------------------------------------------------------

const ALTERNATE_HOOKS: Record<string, string[]> = {
  'data-exposure-risk': [
    `The audit trail for your retired devices either exists or it does not.`,
    `Your last device refresh created data exposure. The question is whether it is documented.`,
    `Retirement does not end the security obligation. Verified destruction does.`,
  ],
  'chain-of-custody-failures': [
    `Chain of custody is not a destination record. It is a continuous one.`,
    `Every undocumented handoff is a permanent gap. It cannot be reconstructed retroactively.`,
    `The certificate at the end does not document what happened before it.`,
  ],
  'compliance-gaps': [
    `HIPAA does not ask if you intended to comply. It asks for documentation.`,
    `A recycling receipt is not compliance documentation. Not even close.`,
    `Most IT disposal programs fail audits not from negligence — from the absence of records that were never collected.`,
  ],
  'e-waste-mismanagement': [
    `The hauler takes the devices. The liability stays with you — unless the hauler is certified.`,
    `R2 certification is not a vendor preference. It is the difference between liability transfer and liability retention.`,
    `Consumer recycling programs handle collection. They do not handle enterprise environmental liability.`,
  ],
  'device-wiping-assumptions': [
    `The wipe log says complete. The forensic tool says otherwise.`,
    `NIST 800-88 is the standard. Internal IT wipe logs are not the same thing.`,
    `60% forensic recovery from factory-reset devices. The assumption that wiping is solved is the problem.`,
  ],
  'asset-value-recovery': [
    `Retiring devices at 5 years instead of 3 costs money on both ends: storage and recovery value.`,
    `Every device that goes straight to recycling without a value evaluation is a missed budget offset.`,
    `Asset recovery is not a vendor feature. It is a step in the retirement process most organizations skip.`,
  ],
  'storage-cost-buildup': [
    `The storage closet full of old IT is billing you $100 per device per month. You just cannot see the invoice.`,
    `Pending-disposition devices are not in a neutral state. They are in an active cost state.`,
    `Deferred IT disposal shows up in the facilities budget. That is the only reason IT teams think it is free.`,
  ],
  'multi-location-disposal': [
    `One non-compliant location in twenty breaks the compliance chain for the whole organization.`,
    `Your satellite offices are using a different disposal vendor than headquarters. That is the compliance audit problem.`,
    `Headquarters compliance does not transfer to regional offices by proximity. It requires explicit implementation.`,
  ],
  'reverse-logistics-complexity': [
    `General freight moves packages. ITAD reverse logistics moves compliance records.`,
    `The compliance record breaks when volume exceeds in-house logistics capacity. That happens in 70% of enterprise IT retirement events.`,
    `The devices made it to the facility. The chain-of-custody documentation did not.`,
  ],
  'informal-disposal-risk': [
    `Informal disposal programs exist not because organizations chose noncompliance — but because no one built a formal program.`,
    `The consumer trade-in kiosk receipt is not an enterprise data destruction certificate.`,
    `The question is not whether informal disposal creates compliance exposure. It does. The question is when that exposure becomes an audit finding.`,
  ],
}

// ---------------------------------------------------------------------------
// ENGAGEMENT QUESTIONS — Record<string, string[]> — 3 per problem
// ---------------------------------------------------------------------------

const ENGAGEMENT_QUESTIONS: Record<string, string[]> = {
  'data-exposure-risk': [
    `How does your organization currently document data destruction for retired devices — and how would that documentation hold up in a compliance audit?`,
    `Has your IT team ever tested a factory-reset or software-wiped device with a forensic tool to verify the wipe? What did it find?`,
    `At what point in your device retirement process does data destruction verification happen — and who owns it?`,
  ],
  'chain-of-custody-failures': [
    `How many undocumented handoffs happen between your IT team and your ITAD vendor's destruction certificate? Have you mapped that chain?`,
    `If a regulator asked for chain-of-custody documentation for every device your organization retired in the past three years, could you produce it — for every device?`,
    `Who in your organization owns chain-of-custody documentation for retired devices — IT, compliance, legal or someone else?`,
  ],
  'compliance-gaps': [
    `Has your organization ever been audited on IT asset disposition documentation? What did the auditor ask for — and what could you provide?`,
    `Which compliance frameworks govern your organization's IT asset disposition program — and do you have device-level documentation that satisfies each one?`,
    `Is device retirement managed as a compliance obligation in your organization or as an IT operations task? How is the difference visible in your documentation?`,
  ],
  'e-waste-mismanagement': [
    `When did your organization last verify the current certification status of your electronics disposal vendor? Not onboarding — last verification.`,
    `Does your e-waste disposal vendor provide downstream material flow documentation — proof of where specific materials went — or just a collection receipt?`,
    `Has your organization ever evaluated whether your current electronics disposal process satisfies RCRA requirements? What did that evaluation find?`,
  ],
  'device-wiping-assumptions': [
    `What sanitization standard does your organization use for retired device wiping — and how would you demonstrate compliance with that standard in an audit?`,
    `Does your IT team apply the same wiping method to HDDs and SSDs? If so, that may be the gap that NIST 800-88 addresses.`,
    `If a forensic recovery firm tested a sample of devices your IT team wiped in the past year, what do you think they would find?`,
  ],
  'asset-value-recovery': [
    `Does your organization have a formal step in the device retirement process to evaluate secondary market value before routing devices to recycling?`,
    `At what age does your organization typically retire enterprise laptops — and do you know how that retirement timing affects secondary market recovery value?`,
    `Has your IT team ever calculated the total unrealized recovery value from a single device refresh cycle? What did that number look like?`,
  ],
  'storage-cost-buildup': [
    `How long does the average device sit in pending-disposition status in your organization before it is actually disposed of? Weeks? Months?`,
    `Does your organization track the direct storage cost of pending-disposition devices as part of the IT disposal budget — or does it disappear into facilities overhead?`,
    `What would change about your organization's disposal timing decisions if storage cost were a visible line item in the IT budget rather than a facilities absorption?`,
  ],
  'multi-location-disposal': [
    `How many different disposal vendors does your organization use across all locations — and can you produce a unified chain-of-custody record that covers all of them?`,
    `Has your organization ever audited the IT disposal documentation at your smallest or most remote locations? What did it look like compared to headquarters?`,
    `If a compliance auditor reviewed the device disposal documentation from your least-formal location, what would they find?`,
  ],
  'reverse-logistics-complexity': [
    `When your organization manages a large IT retirement event — an office relocation or equipment refresh — what happens to devices that exceed your in-house logistics capacity?`,
    `Does your organization use the same carrier and intake process for IT retirement shipments that you use for standard freight? If so, that is likely where the documentation gap starts.`,
    `Has your organization ever experienced a reverse logistics event where chain-of-custody documentation was incomplete? What triggered the gap?`,
  ],
  'informal-disposal-risk': [
    `If a compliance auditor asked for chain-of-custody and data destruction documentation for every device your organization retired in the past three years, what percentage of those devices could you document?`,
    `Does your organization have a written policy on device disposal — and does following that policy produce the documentation that a compliance audit requires?`,
    `At your organization, who decides where retired devices go — IT leadership, individual employees or facilities? How does that decision affect your compliance record?`,
  ],
}

// ---------------------------------------------------------------------------
// APPROVED CTAs
// ---------------------------------------------------------------------------

const CTAS = [
  `Follow ${COMPANY.name} for more ITAD, data security, and electronics recycling insights.`,
  `Follow for more practical breakdowns on retiring technology assets safely.`,
  `Follow for more insights on IT asset disposition, compliance, and risk reduction.`,
  `Follow for more operator-level IT and reverse logistics insights.`,
  `Visit ${COMPANY.website} to learn how ${COMPANY.name} handles IT asset disposition.`,
]

// ---------------------------------------------------------------------------
// REPURPOSING SUGGESTIONS
// ---------------------------------------------------------------------------

const REPURPOSING: string[] = [
  'Expand the main post into a LinkedIn carousel: each line break becomes a slide, with the stat added as a dedicated data slide',
  'Use the thread as a YouTube Shorts script — each tweet is one screen, narrated over a plain background with the text on screen',
  'Pull the engagement question into a LinkedIn post as the hook, then answer it with three bullet points drawn from the thread',
  'Use the alternate hook as the opening line of a Facebook educational post — pair it with the problem stat and a single CTA',
  'Convert the thread into a blog post outline: each tweet becomes a section heading with two to three sentences of expansion',
]

// ---------------------------------------------------------------------------
// IMPROVEMENT SUGGESTIONS — Record<string, string[][]> — 3 sets per problem, 3 each
// ---------------------------------------------------------------------------

const IMPROVEMENT_SUGGESTIONS: Record<string, string[][]> = {
  'data-exposure-risk': [
    [
      'Name the specific compliance framework that applies to your audience — HIPAA for healthcare, GLBA for financial services — to increase recognition among regulated-industry readers',
      'Add the specific device type to make the risk concrete: "retired MacBook Pro" or "end-of-life Dell Latitude" is more visceral than "retired device"',
      'Reference the chain-of-custody documentation your ITAD program produces to connect the problem to a specific, credible solution',
    ],
    [
      'Test a version that leads with the forensic recovery statistic rather than the factory reset mechanism — the 60% number is more surprising and will stop more scrolls',
      'Add the per-record HIPAA penalty range to the cost post rather than only the aggregate breach cost — the per-record number is smaller and therefore more relatable for IT leaders managing device programs',
      'Close with a direct question to the audience rather than a CTA statement — questions on Twitter generate more reply engagement than CTA statements',
    ],
    [
      'Consider a contrarian angle: "Your IT team is confident the data is gone. Here is what the forensic recovery rate says about that confidence." — challenges an assumption rather than stating a risk',
      'Use the storage closet image more specifically: "There are 47 devices in your storage room right now without a destruction certificate. Each one is an open compliance question." — specific numbers anchor abstract risk',
      'Reference NIST 800-88 by name in the thread — it signals technical credibility to CISOs and IT security leaders who recognize the standard',
    ],
  ],
  'chain-of-custody-failures': [
    [
      'Add the specific number of undocumented handoffs (3–7) to the main post to give the abstract "gap" a concrete scale',
      'Reference which compliance framework is most relevant to your target audience — HIPAA, SOX or FERPA — to create immediate recognition',
      'Consider a version of the thread that walks through a specific handoff scenario: "Device leaves IT desk. IT logs it as retired. Vendor picks it up. Nothing is signed. Here is what happens next."',
    ],
    [
      'Test a main post that uses the audit question as the hook: "Regulators asked for chain-of-custody documentation for 200 retired devices. The answer was one vendor receipt from 18 months ago." — narrative creates tension',
      'Add a specific penalty range to the thread to anchor the cost: "$1 million per audit finding under HIPAA" is more visceral than "compliance penalties can be significant"',
      'End the thread with a specific self-audit question: "How many undocumented handoffs exist between your IT team and your current ITAD vendor\'s certificate?" — drives engagement',
    ],
    [
      'Consider a version of tweet 2 in the thread that names the three things auditors look for explicitly — the specificity creates recognition for compliance officers who have seen the audit checklist',
      'The "retroactive fix" point is the strongest in the thread — consider leading with it rather than building to it: "Chain-of-custody gaps cannot be fixed after the fact. Here is what that means." as the hook',
      'Add an "ask yourself" framing to one tweet in the thread: "Can you produce a signed record of every person who touched a retired device between IT collection and final destruction?" — makes the self-audit immediate',
    ],
  ],
  'compliance-gaps': [
    [
      'Name the three specific things auditors look for in tweet 2 or 3 of the thread — the explicit checklist creates immediate recognition for compliance officers',
      'Add a per-device math example to the cost section: "500 devices × HIPAA per-record penalty × records per device = penalty exposure that compounds fast" — the math makes the risk tangible',
      'Test a version of the main post that leads with the audit question itself: "Produce documentation of data destruction and chain of custody for every device retired in the past three years." — using the actual audit language as the hook',
    ],
    [
      'The "policy vs. evidence" distinction is the most important concept in this problem area — consider building a dedicated thread around it rather than using it as a supporting point',
      'Add the specific regulatory frameworks to the thread with their specific requirements — HIPAA requires this, SOX requires that — rather than referring to "regulatory frameworks" generically',
      'Consider a contrarian angle: "Most IT teams think they are compliant with device disposal requirements. Here is what the audit actually asks for." — leads with the false assumption',
    ],
    [
      'The "absence of documentation is treated as evidence of noncompliance" point is the single strongest statement in this problem area — consider making it the first line of the main post rather than a thread point',
      'Add a cost-of-doing-nothing comparison: cost of a formal ITAD program vs. cost of an audit event — the comparison makes the business case without requiring the reader to calculate it themselves',
      'End the thread with a self-audit question that targets IT and compliance leaders specifically: "If you received an audit request today for device disposition documentation, what percentage of retired devices from the past three years could you document?" — creates urgency',
    ],
  ],
  'e-waste-mismanagement': [
    [
      'Add "who is liable when the vendor was uncertified" as a specific thread point — it answers the most common objection ("but we used a recycler") directly',
      'Name R2 and e-Stewards certifications in the main post rather than referring to "certified vendors" generically — the specific certification names signal expertise to procurement and sustainability audiences',
      'Consider a version of the thread that walks through a specific scenario: "Your device left your building. It went to an uncertified vendor. The vendor did X with it. Here is who the EPA holds responsible." — narrative makes abstract liability concrete',
    ],
    [
      'Test a main post that leads with the liability attachment point: "The EPA does not pursue the hauler. It pursues the organization that generated the waste." — this is the most surprising fact for most audiences',
      'Add the specific materials (lead, mercury, cadmium) to the main post rather than the thread — naming the materials makes the environmental hazard visceral rather than regulatory-abstract',
      'The certification lapse point deserves its own tweet in the thread — it is the most actionable and least-known nuance in vendor management for e-waste',
    ],
    [
      'Consider a contrarian angle: "Your organization has been recycling electronics responsibly for years. Here is whether that is the same as being compliant." — challenges a comfortable assumption',
      'Add a specific verification checklist to the thread — R2 certification database, e-Stewards certified facility list — to give audiences a concrete next step beyond "verify certification"',
      'End the thread with a question that targets procurement or sustainability leaders: "When did you last verify the current certification status of your electronics disposal vendor — not at onboarding, but recently?" — the qualifier "not at onboarding" creates recognition',
    ],
  ],
  'device-wiping-assumptions': [
    [
      'Lead the main post with the 60% forensic recovery rate rather than the mechanism explanation — the number is more surprising and will generate more stops',
      'Add NIST 800-88 by name to the main post — compliance officers and CISOs recognize the standard, and naming it signals that this is about meeting a specific requirement, not just best practice',
      'Consider a version of tweet 4 in the thread that names the specific SSD vs. HDD sanitization distinction — it is a genuinely surprising technical nuance that IT audiences will find credible and shareable',
    ],
    [
      'Test a version of the thread that opens with a scenario: "Your IT team ran a wipe utility. A forensic lab ran a recovery tool on the same device. Here is what they found." — experiential framing is more engaging than a mechanism explanation',
      'Add a "wipe log vs. compliance standard" comparison tweet to the thread — showing what an internal IT wipe log documents vs. what a NIST-compliant destruction certificate documents makes the gap concrete',
      'The "25–40% of enterprise-wiped devices" statistic is the most actionable — IT teams can immediately ask "what percentage of our devices fall in that range?" — consider leading with it rather than building to it',
    ],
    [
      'Consider a contrarian angle for the main post: "Your IT team is confident they wiped the drives. Here is what a 60% forensic recovery rate says about that confidence." — challenges an assumption rather than stating a risk',
      'Add a self-audit question to the thread: "What standard does your current IT wiping process meet — and how would you prove it in an audit?" — targets the self-aware IT audience most likely to engage',
      'The SSD-specific nuance (cryptographic erase vs. secure overwrite) deserves its own standalone post — it is the most technically specific point and will perform well with IT security audiences who follow NIST guidance',
    ],
  ],
  'asset-value-recovery': [
    [
      'Add a specific per-device dollar example using a real device model: "$1,200 Dell Latitude, 3 years old, secondary market value today: $360–$480" — makes the abstract percentage immediately calculable',
      'Test a main post that leads with the quarterly value loss: "Every quarter a device sits in storage rather than being retired, it loses 15–25% of its secondary market value." — time-pressure framing creates urgency',
      'Add a comparison tweet in the thread: "Here is the math for a 300-device refresh routed to recovery vs. the same refresh routed to recycling" — the side-by-side makes the opportunity cost concrete',
    ],
    [
      'Consider a version of the thread that targets IT leaders making refresh timing decisions: "You are planning a device refresh. Here is how the timing of that refresh affects the recovery value — and why most organizations get this calculation wrong."',
      'The "batching vs. rolling retirement" distinction is genuinely useful operational content — consider building a dedicated thread around it rather than using it as a thread endpoint',
      'Add a "cost of waiting" calculation: "Every quarter you defer disposition on 100 devices costs X in secondary market value at 20% quarterly depreciation" — specific math creates action',
    ],
    [
      'Test a contrarian angle: "Most IT teams think asset recovery adds process overhead. Here is what that assumption costs per refresh cycle." — leads with the opposing assumption',
      'Add the "when is the peak recovery window" as explicit guidance in the thread — "24–36 months from purchase, not 48–60" is specific, actionable information that IT procurement leaders can use immediately',
      'End with a question targeting finance or procurement leaders specifically: "Is secondary market recovery value included in your IT refresh cycle budget calculation — or does it get left out because no one built in the evaluation step?" — creates recognition',
    ],
  ],
  'storage-cost-buildup': [
    [
      'Add the accounting-separation insight to the main post: "Storage cost shows up in facilities. IT makes the disposal timing decision. That is why the cost is invisible." — the systemic explanation is more interesting than the number alone',
      'Test a version with a specific organization-size example: "At 1,000 devices with 15% in pending disposition, your organization is spending $12,000–$18,000 per month on hardware that generates zero value." — makes the abstract percentage immediately calculable',
      'Add a "three-dimensional cost" framing to the thread: storage cost, value depreciation and data liability — all simultaneously, all compounding — to show that deferral is not just expensive, it is expensive in three directions at once',
    ],
    [
      'Consider a version of the thread that starts with a budget exercise: "Add up the storage cost, the value loss and the data liability for every device currently in pending-disposition status in your organization. That number is what deferred disposal costs." — exercise framing drives engagement',
      'The "pending-disposition SLA" recommendation (30 days) is the most actionable specific recommendation in this problem area — give it its own standalone post rather than embedding it in a thread',
      'Test a hook that uses the employee perspective: "IT calls it deferred. Facilities is billing $8,000/month for the storage. Those are the same thing." — internal friction framing is relatable and shareable',
    ],
    [
      'Add a "what would change if storage cost were visible" hypothetical to the thread: "If IT saw the $120,000 annual storage cost as a line item in their disposal budget, how quickly would the pending-disposition queue clear?" — counterfactual framing creates engagement',
      'Consider a version of the main post that names all three compounding costs explicitly in three lines: storage cost / value loss / data liability — the parallel structure makes the compounding nature of the problem more scannable',
      'End with a self-audit question: "What is the total carrying cost of every device currently in pending-disposition status in your organization?" — drives calculation behavior rather than passive reading',
    ],
  ],
  'multi-location-disposal': [
    [
      'Add the "one location triggers all" consequence to the main post — it is the most surprising fact for IT leaders who assume that a non-compliant satellite office is a contained problem',
      'Test a version of the thread that starts with an audit scenario: "A compliance auditor found improper disposal at your Boston office. Here is how that review expanded to cover all 19 of your other locations." — narrative makes the cascade risk concrete',
      'Name the specific documentation gaps that most locations cannot fill — destruction method, serialization records, chain of custody — to give compliance officers a checklist against which to evaluate their own locations',
    ],
    [
      'Consider a version of the main post that uses a specific organizational structure: "Headquarters has a formal ITAD program. The regional offices have a vendor they call when the storage room fills up. That is the compliance gap." — specific scenario creates recognition',
      'Add the cost comparison between centralized and decentralized programs to the thread: "Managing 6 vendors across 10 locations costs more than a centralized program — and produces worse compliance outcomes." — the business case and the compliance case together',
      'The 65–80% failure rate statistic deserves a standalone post: "65–80% of multi-location IT disposal programs cannot produce compliant documentation across all sites. The question is which category your program is in." — creates self-identification',
    ],
    [
      'Test a contrarian angle: "Your multi-location IT disposal process is efficient at the local level. Here is what it costs at the organizational level." — separates local optimization from organizational risk',
      'Add a location audit checklist to the thread: "Here is what a compliance auditor would look for at each of your locations — and how most satellite offices would perform against that checklist."',
      'End with a self-audit question for IT operations leaders: "When did you last review the disposal documentation process at your least-formal location — not the procedure, but the actual documentation produced?" — the distinction between process and output creates recognition',
    ],
  ],
  'reverse-logistics-complexity': [
    [
      'Add the "standard freight vs. ITAD logistics" distinction to the main post — naming what general freight does and does not manage makes the gap immediately clear to IT operations leaders',
      'Test a version of the thread that opens with a specific large retirement event scenario: "Your office lease ends in 60 days. 200 devices need to be retired and documented. Here is where most organizations lose the compliance record." — specific scenario drives engagement',
      'Add a "what ITAD logistics documentation includes" checklist to the thread — serialized manifests, signed transfer records, facility intake confirmation — to give audiences a standard to evaluate their current process against',
    ],
    [
      'Consider a version of the main post that uses the capacity exceedance number as the hook: "70% of enterprise IT retirement events exceed in-house logistics capacity. That overflow is where the compliance record breaks." — the statistic creates recognition',
      'The device damage statistic (15–25%) deserves more prominence — it is a concrete, surprising number that quantifies a risk most organizations assume is covered by their carrier insurance',
      'Add a "volume spike plan" recommendation to the thread: "Before your next large retirement event, answer three questions: who collects, who documents, and who provides chain-of-custody at each transfer point." — specific, implementable',
    ],
    [
      'Test a contrarian angle: "Your IT team has a good device retirement process for normal volume. Here is what happens when a large retirement event pushes it past capacity." — acknowledges existing competence before naming the gap',
      'Add a specific documentation gap scenario to the thread: "Devices collected by IT. Staged in a conference room for a week. Picked up by a general freight carrier. Chain of custody: collection only." — the specific scenario makes the abstract gap concrete',
      'End with a question that targets IT operations leaders specifically: "Does your organization have a documented process for handling IT retirement events that exceed your in-house logistics capacity — or does volume spikes get handled ad hoc?" — creates self-identification',
    ],
  ],
  'informal-disposal-risk': [
    [
      'Add the specific audit question to the main post: "Produce chain-of-custody and data destruction documentation for all retired devices in the past three years." — using the actual regulatory language creates immediate recognition for compliance-aware audiences',
      'Name the specific compliance frameworks that informal disposal fails — HIPAA, SOX, GLBA — rather than referring to "regulatory requirements" generically, to create recognition among audiences in regulated industries',
      'Consider a version of the thread that acknowledges the appeal of informal disposal before addressing the risk: "Informal disposal is low friction and low cost. Here is the one thing it cannot produce — and why that matters when an audit arrives." — credible acknowledgment increases trust',
    ],
    [
      'Test a main post that uses the 35–45% statistic as the hook: "35–45% of SMBs dispose of retired IT informally. Most have never faced a compliance audit. Here is what happens when that changes." — creates category recognition and implied threat',
      'Add a "consumer vs. enterprise documentation" comparison to the thread — specifically what a consumer recycling receipt documents vs. what an enterprise destruction certificate documents — to make the gap visual',
      'The "retroactively unfixable" point is the most important in this problem area — consider leading the thread with it rather than building to it: "Once a device leaves without documentation, there is no path to creating the missing record. The gap is permanent." as the hook',
    ],
    [
      'Consider a version of the thread that opens with a hypothetical audit letter: "Your organization has been selected for a routine compliance review. Please provide chain-of-custody and data destruction documentation for all devices retired in the past 36 months." — experiential framing creates urgency',
      'The "absence of documentation is a compliance failure, not a gray area" point is the strongest and most surprising statement — test a version that leads with it as the main post hook rather than a thread point',
      'End with a self-assessment question: "Can your organization produce device-level disposition documentation for every device retired in the past 24 months — and if not, does that gap have a plan?" — drives high-quality comment engagement from organizations that recognize their own situation',
    ],
  ],
}

// ---------------------------------------------------------------------------
// generateTwitter
// ---------------------------------------------------------------------------

export function generateTwitter(inputs: TwitterInputs, seed = 0): TwitterOutput {
  const prob = inputs.problem
  const idx = seed % 3
  const ctaIdx = seed % CTAS.length
  const qualityScore = scoreContent(inputs, true, true, true, 150)

  // Reference PROBLEM_DATA to satisfy the import — available for future
  // dynamic stat injection or content enrichment
  void PROBLEM_DATA

  const thread = THREADS[prob]?.[idx] ?? [
    `Retired devices without documented disposal are a compliance gap. (1/3)`,
    `Chain-of-custody documentation cannot be reconstructed after the fact. (2/3)`,
    `A formal ITAD program closes that gap before it becomes an audit finding.\n\nFollow for more IT asset disposition content. (3/3)`,
  ]

  return {
    platform: 'twitter',
    mainPost: MAIN_POSTS[prob]?.[idx] ?? `Retired devices without documented disposal are an open compliance question.`,
    thread,
    alternateHook: ALTERNATE_HOOKS[prob]?.[idx] ?? `The audit trail for your retired devices either exists or it doesn't.`,
    cta: CTAS[ctaIdx],
    engagementQuestion: ENGAGEMENT_QUESTIONS[prob]?.[idx] ?? `How does your organization currently document retired device disposal?`,
    repurposingSuggestions: REPURPOSING.slice(0, 4),
    qualityScore,
    improvementSuggestions: IMPROVEMENT_SUGGESTIONS[prob]?.[idx] ?? [
      'Name the specific compliance framework that applies to your audience',
      'Add the specific device type to make the risk concrete',
      'Reference the chain-of-custody documentation your ITAD program produces',
    ],
  }
}
