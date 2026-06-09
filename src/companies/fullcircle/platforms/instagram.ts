import type { InstagramInputs, InstagramOutput } from '../types'
import { PROBLEM_DATA, COMPANY } from '../lib/companyProfile'
import { scoreContent } from '../lib/scoring'

// ---------------------------------------------------------------------------
// VISUAL HOOKS — short first-frame lines keyed by problem, 3 per problem
// ---------------------------------------------------------------------------

const VISUAL_HOOKS: Record<string, string[]> = {
  'data-exposure-risk': [
    'This is not old tech. It is data risk.',
    'The laptop left the building. The data did not.',
    'Retired does not mean erased.',
  ],
  'chain-of-custody-failures': [
    'The audit trail ended here.',
    'No one signed for it. Now no one can prove it.',
    'The handoff happened. The record did not.',
  ],
  'compliance-gaps': [
    'The regulator asked for documentation. The answer was silence.',
    'Compliance is not a policy. It is a paper trail.',
    'The audit did not find a breach. It found an absence of records.',
  ],
  'e-waste-mismanagement': [
    'The dumpster is not a disposal program.',
    '2% of landfill volume. 70% of toxic waste. That math is your liability.',
    'It looked like recycling. It was environmental violation.',
  ],
  'device-wiping-assumptions': [
    'Factory reset did not remove the data.',
    'The file was deleted. The data was not.',
    'Your IT team wiped it. A forensic tool recovered it anyway.',
  ],
  'asset-value-recovery': [
    'That retired laptop is worth money. Today. Less tomorrow.',
    'You paid $1,400 for it. You recycled $0 of it.',
    'Every quarter in storage is a percentage point lost.',
  ],
  'storage-cost-buildup': [
    'The closet full of old IT is costing $150 per device per month.',
    'Deferred disposal is not free. It is billed every month.',
    'That pile of old hardware is an active line item.',
  ],
  'multi-location-disposal': [
    'Eight locations. Eight vendors. Zero unified compliance record.',
    'Your weakest location is your audit exposure.',
    'Every office handles it differently. That is the problem.',
  ],
  'reverse-logistics-complexity': [
    'The devices shipped. The documentation did not.',
    'Getting it there is logistics. Getting it back is where compliance breaks.',
    'Eighty devices picked up. Chain of custody on forty-three.',
  ],
  'informal-disposal-risk': [
    'The trade-in kiosk is not a compliance program.',
    'Someone dropped it in a recycling bin. No certificate. No audit trail.',
    '35% of businesses dispose of IT informally. Most do not know the risk.',
  ],
}

// ---------------------------------------------------------------------------
// ON-SCREEN TEXT — multi-line overlay blocks, 3 per problem
// ---------------------------------------------------------------------------

const ON_SCREEN_TEXT: Record<string, string[]> = {
  'data-exposure-risk': [
    'RETIRED DEVICES\nAre not clutter.\nThey are data exposure.',
    'AVERAGE BREACH COST: $4.45M\nRetired devices without\nverified destruction\ncontribute directly.',
    'THE RISK\nDoes not start at breach.\nIt starts when the device\nleaves without documentation.',
  ],
  'chain-of-custody-failures': [
    'CHAIN OF CUSTODY\nCannot be reconstructed\nafter the fact.\nDocument now or not at all.',
    'EVERY UNDOCUMENTED HANDOFF\nIs a compliance gap.\nNot a paperwork gap.',
    'THE AUDIT QUESTION:\n"Show us the chain of custody."\nThe informal answer:\nSilence.',
  ],
  'compliance-gaps': [
    'HIPAA. SOX. GLBA. FERPA.\nAll require device-level\ndisposition documentation.\nMost programs have none.',
    'WHAT AUDITORS LOOK FOR:\nDestruction method.\nSerial number records.\nChain of custody.\nInformal programs fail all three.',
    'COMPLIANCE FAILURE\nIs not always a breach.\nSometimes it is just\nan absent record.',
  ],
  'e-waste-mismanagement': [
    'E-WASTE\n2% of landfill volume.\n70% of toxic waste.\nYour disposal method is your liability.',
    'EPA PENALTIES\n$25,000–$70,000 per day\nper violation.\nFor devices in a dumpster.',
    'LEAD. MERCURY. CADMIUM.\nThey are in your old hardware.\nAnd your liability\nif disposed incorrectly.',
  ],
  'device-wiping-assumptions': [
    'FACTORY RESET\nDeletes the file index.\nNot the data.\nForensics proves it.',
    'SOFTWARE WIPE\nLeaves recoverable data\non 25–40% of devices.\nVerification is not optional.',
    'NIST 800-88\nSpecifies exactly\nhow to wipe a drive.\nYour IT team\'s method\nprobably is not it.',
  ],
  'asset-value-recovery': [
    '3-YEAR ENTERPRISE LAPTOPS\nRetain 25–40% of\noriginal purchase price.\nRecycled: retain zero.',
    'EVERY QUARTER IN STORAGE\nReduces secondary market\nvalue 15–25%.\nThe window closes fast.',
    'RETIRED ASSETS\nAre not zero-value.\nThey are depreciating assets\nwith a recovery window.',
  ],
  'storage-cost-buildup': [
    'STORAGE COST\n$50–$150 per device\nper month.\nMultiplied across a closet full.',
    '12–18% OF YOUR DEVICE FLEET\nIs in "pending disposition."\nNone of it is generating value.\nAll of it is generating cost.',
    'DEFERRED DISPOSAL\nIs not a neutral choice.\nIt is a decision\nto pay more later.',
  ],
  'multi-location-disposal': [
    'MULTI-LOCATION IT DISPOSAL\n65–80% of programs\ncannot produce compliant\nchain-of-custody\nacross all sites.',
    'ONE NON-COMPLIANT LOCATION\nCan trigger enterprise-wide\naudit review.\nThe weakest site sets the standard.',
    'EIGHT LOCATIONS.\nEight disposal vendors.\nEight documentation formats.\nZero unified compliance record.',
  ],
  'reverse-logistics-complexity': [
    'REVERSE LOGISTICS\n15–25% of shipments\nexperience damage or\ndocumentation gaps\nwithout dedicated ITAD support.',
    '70% OF IT RETIREMENT EVENTS\nExceed in-house logistics capacity.\nThe overflow creates\nthe compliance gaps.',
    'COLLECTION. TRANSPORT.\nCHAIN OF CUSTODY.\nFINAL DISPOSITION.\nEach step is a failure point\nwithout the right infrastructure.',
  ],
  'informal-disposal-risk': [
    'INFORMAL DISPOSAL\nNo chain of custody.\nNo destruction certificate.\nNo audit defense.',
    '35–45% OF BUSINESSES\nUse informal disposal\nfor retired IT.\nMost have never seen an audit.',
    'THE TRADE-IN KIOSK\nDoes not meet\nHIPAA, SOX, or GLBA\ndisposal requirements.\nFull stop.',
  ],
}

// ---------------------------------------------------------------------------
// CAROUSEL SLIDES — 3 sets of 7 slides per problem
// ---------------------------------------------------------------------------

const CAROUSEL_SLIDES: Record<string, string[][]> = {
  'data-exposure-risk': [
    [
      'SLIDE 1 — Hook: This is not old tech. It is data risk.',
      'SLIDE 2 — The problem: Retired devices without documented data destruction hold the same data they held in active use. The data does not expire when the device does.',
      'SLIDE 3 — The data: 35–40% of used devices on secondary markets contain recoverable data despite prior wiping claims. Email archives, financial records, and PII are all recoverable.',
      'SLIDE 4 — The cost: Average data breach cost: $4.45 million. HIPAA violations: $100–$50,000 per record per violation. Retired devices without verified destruction contribute directly to both.',
      'SLIDE 5 — The mistake: Assuming that retirement equals data removal. It does not. Without documented destruction, the data travels with the device wherever it goes.',
      'SLIDE 6 — The fix: Certified data destruction with device-level serialization records and chain-of-custody documentation from collection through final disposition — not just a certificate at the end.',
      `SLIDE 7 — CTA: Follow ${COMPANY.name} for more ITAD, data security, and electronics recycling insights.`,
    ],
    [
      'SLIDE 1 — Hook: The laptop left the building. The data did not leave with it.',
      'SLIDE 2 — The problem: When an organization retires a device without verified data destruction, that device carries active data into whatever chain follows — resale, recycling, donation, or landfill.',
      'SLIDE 3 — The data: Forensic recovery from factory-reset devices succeeds at rates above 60% in controlled testing. Factory reset removes the file index — not the underlying data.',
      'SLIDE 4 — The cost: A single discovered device with recoverable PII can trigger a regulatory investigation covering every device retired in the same program for the past three years.',
      'SLIDE 5 — The mistake: Trusting IT wipe logs without independent verification. A log that says "wiped" is not the same as a certified, device-level destruction record.',
      'SLIDE 6 — The fix: Third-party certified data destruction — physical destruction or NIST-compliant overwrite with verification — paired with serialized certificates traceable to each device.',
      `SLIDE 7 — CTA: Visit ${COMPANY.website} to learn how Full Circle Electronics handles IT asset disposition.`,
    ],
    [
      'SLIDE 1 — Hook: Retired does not mean erased. It means unmonitored.',
      'SLIDE 2 — The problem: Devices in storage, in transit, or awaiting disposition carry full data exposure risk. The risk does not pause because the device is no longer in active use.',
      'SLIDE 3 — The data: HIPAA penalties for improper disposal range from $100 to $50,000 per record per violation. In a healthcare organization retiring hundreds of devices per year, one undocumented batch creates exposure across thousands of patient records.',
      'SLIDE 4 — The cost: The average cost of a data breach is $4.45 million. That number does not distinguish between breaches from active systems and breaches from retired devices — exposure is exposure.',
      'SLIDE 5 — The mistake: Treating device retirement as an IT problem rather than a data governance problem. The security team needs to be in the disposition chain.',
      'SLIDE 6 — The fix: Integrate device retirement into your data governance program — with the same documentation standards, audit trails, and verification requirements as active data destruction.',
      `SLIDE 7 — CTA: Follow ${COMPANY.name} for more ITAD, data security, and electronics recycling insights.`,
    ],
  ],

  'chain-of-custody-failures': [
    [
      'SLIDE 1 — Hook: The audit trail ended here.',
      'SLIDE 2 — The problem: Chain-of-custody failures in IT asset disposition create audit gaps that cannot be closed after the fact. Every undocumented handoff is a permanent hole in the compliance record.',
      'SLIDE 3 — The data: Organizations with multi-location IT infrastructure average 3–7 undocumented device handoffs before final disposition. Each one is an untracked exposure point.',
      'SLIDE 4 — The cost: HIPAA and SOX compliance failures from chain-of-custody gaps can exceed $1 million per audit finding — and legal liability typically runs 3–5x the direct penalty.',
      'SLIDE 5 — The mistake: Treating chain of custody as a destination record rather than a continuous one. The certificate at the end does not document what happened at every step before it.',
      'SLIDE 6 — The fix: Documented handoffs at every transition — collection, transport, intake, processing, and final disposition — with timestamps, personnel, and device serialization at each point.',
      `SLIDE 7 — CTA: Follow ${COMPANY.name} for more ITAD, data security, and electronics recycling insights.`,
    ],
    [
      'SLIDE 1 — Hook: No one signed for it. Now no one can prove it was handled correctly.',
      'SLIDE 2 — The problem: A chain-of-custody gap is not a paperwork problem. It is a provability problem. When regulators ask for proof of secure disposal, undocumented handoffs have no retroactive fix.',
      'SLIDE 3 — The data: Regulatory frameworks including HIPAA, SOX, and FERPA require demonstrable chain-of-custody evidence for data-bearing device disposal. Missing documentation for a single device creates exposure.',
      'SLIDE 4 — The cost: Chain-of-custody gaps cannot be reconstructed after an audit begins. The absence of documentation is treated as evidence of noncompliance — not as an ambiguity.',
      'SLIDE 5 — The mistake: Using separate vendors at different transition points with no unified documentation protocol. Each vendor documents in their own format — none of it connects into an auditable record.',
      'SLIDE 6 — The fix: A single ITAD partner with continuous chain-of-custody documentation — one record, one format, covering every handoff from collection to final disposition certificate.',
      `SLIDE 7 — CTA: Follow for more practical breakdowns on retiring technology assets safely.`,
    ],
    [
      'SLIDE 1 — Hook: The handoff happened. The documentation did not.',
      'SLIDE 2 — The problem: IT retirement programs that rely on internal teams for logistics frequently lose chain-of-custody integrity at the point of handoff — the moment devices leave IT\'s physical control.',
      'SLIDE 3 — The data: Multi-location organizations using 3–6 different disposal vendors average no unified chain-of-custody record set. During a compliance audit, no single document covers the organization.',
      'SLIDE 4 — The cost: An auditor reviewing one non-compliant site can trigger enterprise-wide examination. The compliance chain is only as strong as its weakest documented handoff.',
      'SLIDE 5 — The mistake: Assuming the receiving vendor\'s paperwork satisfies chain-of-custody requirements. Vendor receipt documents confirm arrival — not secure handling at every prior step.',
      'SLIDE 6 — The fix: Custody documentation that follows the device, not just the shipment. Serial-level records at every physical transition, signed by every party that touches the device.',
      `SLIDE 7 — CTA: Follow for more insights on IT asset disposition, compliance, and risk reduction.`,
    ],
  ],

  'compliance-gaps': [
    [
      'SLIDE 1 — Hook: The regulator asked for documentation. The answer was silence.',
      'SLIDE 2 — The problem: HIPAA, SOX, FERPA, and GLBA each require documented evidence of data destruction and device disposition. Most informal IT disposal programs cannot produce any of the three things auditors require.',
      'SLIDE 3 — The data: Regulatory auditors examining IT asset disposition look for: documented destruction method, device-level serialization records, and chain-of-custody from collection to final disposition. Informal programs fail all three.',
      'SLIDE 4 — The cost: Average regulatory penalty from improper IT asset disposition: $500,000–$2 million per audit event. Legal defense costs average 2–3x the direct penalty.',
      'SLIDE 5 — The mistake: Conflating "we recycled it" with "we complied." Recycling without documentation is not compliance. It is disposal without an audit defense.',
      'SLIDE 6 — The fix: A formal ITAD program with device-level destruction certificates, serialization records, and a chain-of-custody file that survives a compliance audit — before the auditor arrives.',
      `SLIDE 7 — CTA: Follow ${COMPANY.name} for more ITAD, data security, and electronics recycling insights.`,
    ],
    [
      'SLIDE 1 — Hook: Compliance is not a policy. It is a paper trail.',
      'SLIDE 2 — The problem: Having a written device disposal policy is not the same as being compliant. Compliance requires documented evidence that the policy was followed — for every device, every time.',
      'SLIDE 3 — The data: Compliance failures related to IT asset disposition compound across devices. A single audit finding covering 500 devices disposed without documentation generates penalty exposure per device — at per-record rates, the math compounds fast.',
      'SLIDE 4 — The cost: HIPAA alone can levy $100–$50,000 per record per violation. A single undocumented disposal event involving devices with patient data generates exposure across every patient record on every device.',
      'SLIDE 5 — The mistake: Assuming that a recycling vendor\'s certificate covers compliance. Recycler certificates document environmental disposal — not HIPAA, SOX, or GLBA data destruction requirements.',
      'SLIDE 6 — The fix: Destruction certificates that document the specific method used, meet the applicable regulatory standard, and link to the device serial number in a chain-of-custody record.',
      `SLIDE 7 — CTA: Follow for more insights on IT asset disposition, compliance, and risk reduction.`,
    ],
    [
      'SLIDE 1 — Hook: The audit did not find a breach. It found an absence of records.',
      'SLIDE 2 — The problem: Most compliance failures in IT asset disposition are not caused by deliberate noncompliance. They are caused by the absence of documentation that was never collected in the first place.',
      'SLIDE 3 — The data: Organizations without formal ITAD programs routinely fail HIPAA, SOX, and FERPA audits on device disposition — not from what they did, but from what they cannot prove they did.',
      'SLIDE 4 — The cost: Compliance risk from IT asset disposition is an audit event waiting for a trigger — and the trigger is usually a device appearing where it should not be, or an audit request an informal process cannot answer.',
      'SLIDE 5 — The mistake: Treating device retirement as a facilities or IT operations task rather than a compliance-driven data governance task. The compliance obligation does not end when the device is unplugged.',
      'SLIDE 6 — The fix: Assign compliance ownership of device disposition to the same team that manages data governance — and require the same documentation standard for retiring a device as for destroying active data.',
      `SLIDE 7 — CTA: Visit ${COMPANY.website} to learn how Full Circle Electronics handles IT asset disposition.`,
    ],
  ],

  'e-waste-mismanagement': [
    [
      'SLIDE 1 — Hook: The dumpster is not a disposal program.',
      'SLIDE 2 — The problem: Electronics contain lead, mercury, cadmium, and beryllium. Improper disposal creates environmental liability under EPA regulations — and that liability attaches to the organization that generated the waste, not the hauler.',
      'SLIDE 3 — The data: E-waste is approximately 2% of landfill volume but accounts for roughly 70% of toxic waste. Organizations disposing of electronics through general waste streams create regulatory exposure regardless of whether they knew the materials were present.',
      'SLIDE 4 — The cost: EPA penalties for hazardous waste violations from improper electronics disposal range from $25,000 to $70,000 per day per violation. Environmental remediation costs can run $200,000–$5 million per contamination site.',
      'SLIDE 5 — The mistake: Assuming that a non-certified vendor removes liability. If the vendor was not certified to handle the waste, the liability stays with the organization that generated it.',
      'SLIDE 6 — The fix: Certified R2 or e-Stewards ITAD vendors with documented downstream accountability — not just a recycling receipt, but auditable documentation of where every material goes.',
      `SLIDE 7 — CTA: Follow ${COMPANY.name} for more ITAD, data security, and electronics recycling insights.`,
    ],
    [
      'SLIDE 1 — Hook: 2% of landfill volume. 70% of toxic waste. That math is your liability.',
      'SLIDE 2 — The problem: Organizations that route electronics through general waste streams — trash, unauthorized vendors, employee donation — expose themselves to environmental liability under RCRA regardless of intent.',
      'SLIDE 3 — The data: Environmental liability from improper e-waste disposal under RCRA can include remediation costs, regulatory penalties, and third-party liability claims. The generating organization remains responsible even after the waste leaves its premises.',
      'SLIDE 4 — The cost: EPA civil penalties for knowing violations of hazardous waste disposal rules: up to $70,000 per day per violation. Criminal penalties are also possible for intentional violations.',
      'SLIDE 5 — The mistake: Confusing consumer recycling programs with enterprise e-waste compliance. Consumer drop-off programs do not produce the documentation that satisfies enterprise environmental liability requirements.',
      'SLIDE 6 — The fix: Certified enterprise e-waste disposal through R2 or e-Stewards certified vendors — with downstream documentation proving materials were processed by certified facilities, not just collected by a certified vendor.',
      `SLIDE 7 — CTA: Follow for more practical breakdowns on retiring technology assets safely.`,
    ],
    [
      'SLIDE 1 — Hook: It looked like recycling. Legally, it was an environmental violation.',
      'SLIDE 2 — The problem: The term "recycling" covers everything from certified R2 processing to informal disassembly in unregulated conditions. Without vendor certification verification, you cannot know which one handled your devices.',
      'SLIDE 3 — The data: Organizations that use uncertified e-waste vendors — even unknowingly — remain liable for improper handling under EPA regulations. Certification verification is not optional due diligence.',
      'SLIDE 4 — The cost: Third-party liability claims from improper e-waste handling can exceed direct regulatory penalties. Plaintiffs affected by contamination from a disposal site can pursue the generating organization regardless of the vendor chain.',
      'SLIDE 5 — The mistake: Accepting a recycler\'s self-described certification without verifying current certification status. Certifications lapse. Vendor due diligence must be current, not one-time.',
      'SLIDE 6 — The fix: Verify R2 or e-Stewards certification status before each disposal event — not just at vendor onboarding. Require downstream material flow documentation as part of the vendor contract.',
      `SLIDE 7 — CTA: Follow for more insights on IT asset disposition, compliance, and risk reduction.`,
    ],
  ],

  'device-wiping-assumptions': [
    [
      'SLIDE 1 — Hook: Factory reset did not remove the data.',
      'SLIDE 2 — The problem: A standard factory reset removes the file system index — the pointer to where data is stored. The data itself remains on the drive and is recoverable with forensic tools available to anyone.',
      'SLIDE 3 — The data: Forensic recovery from factory-reset devices succeeds at rates above 60% in controlled testing. Software-only wiping without certified verification leaves recoverable data on 25–40% of devices processed through typical enterprise IT retirement programs.',
      'SLIDE 4 — The cost: Data exposure from inadequately wiped devices carries average recovery cost and regulatory exposure of $500,000–$2 million per incident — plus the downstream liability from whatever the recovered data contains.',
      'SLIDE 5 — The mistake: Trusting the wipe log over the verification standard. NIST 800-88 specifies wiping methods and verification requirements that most internal IT wiping processes do not meet and cannot demonstrate in a compliance audit.',
      'SLIDE 6 — The fix: NIST 800-88-compliant data sanitization with third-party verification and device-level certificates — not an internal IT log, but an auditable, serialized destruction record.',
      `SLIDE 7 — CTA: Follow ${COMPANY.name} for more ITAD, data security, and electronics recycling insights.`,
    ],
    [
      'SLIDE 1 — Hook: The file was deleted. The data was not.',
      'SLIDE 2 — The problem: The difference between deleting a file and destroying data is technical and consequential. Deletion removes the pointer. Destruction removes the data. Most enterprise IT processes do deletion and call it destruction.',
      'SLIDE 3 — The data: NIST 800-88 and DoD sanitization standards specify wiping methods and verification requirements. The gap between internal IT wiping practice and documented compliance standard is where data exposure risk concentrates.',
      'SLIDE 4 — The cost: A single device with recoverable PII discovered on a secondary market can trigger regulatory investigation of the entire device retirement program — covering every device retired over the prior three years.',
      'SLIDE 5 — The mistake: Assuming that because your IT team ran a wipe utility, the device is clean. Running a wipe utility and meeting the wipe standard are different things, with different verification requirements.',
      'SLIDE 6 — The fix: Third-party data sanitization using certified methods — NIST-compliant overwrite with pass verification, or physical destruction — paired with device-level certificates that survive a compliance audit.',
      `SLIDE 7 — CTA: Follow for more practical breakdowns on retiring technology assets safely.`,
    ],
    [
      'SLIDE 1 — Hook: Your IT team wiped it. A forensic tool recovered it anyway.',
      'SLIDE 2 — The problem: Device wiping is not a solved problem when done internally without verification. It is an assumption that holds until proven wrong — and the proof typically comes from an external forensic test or a secondary market discovery.',
      'SLIDE 3 — The data: SSD storage introduces additional complexity — overwrite-based wiping methods designed for spinning disk drives do not fully sanitize solid-state storage. NIST 800-88 addresses this. Most internal IT processes do not.',
      'SLIDE 4 — The cost: The cost of inadequate wiping is not the wipe itself — it is the exposure created downstream. Recovered data from a retired device creates the same regulatory liability as a network breach.',
      'SLIDE 5 — The mistake: Applying the same wiping method to SSDs and HDDs. Different storage technologies require different sanitization approaches. One method does not cover both.',
      'SLIDE 6 — The fix: Media-type-specific sanitization — cryptographic erase for encrypted SSDs, secure overwrite per NIST 800-88 for HDDs, physical destruction for drives that cannot be certified clean. Third-party verified.',
      `SLIDE 7 — CTA: Visit ${COMPANY.website} to learn how Full Circle Electronics handles IT asset disposition.`,
    ],
  ],

  'asset-value-recovery': [
    [
      'SLIDE 1 — Hook: That retired laptop is worth money. Today. Less tomorrow.',
      'SLIDE 2 — The problem: Enterprise laptops retired within 3 years typically retain 25–40% of original purchase price on secondary markets. Organizations that route all retired devices to recycling without a recovery evaluation lose this value entirely.',
      'SLIDE 3 — The data: Delayed disposition reduces secondary market value by 15–25% per quarter. Devices stored 6–12 months before disposition often recover 40–60% less than the same devices retired promptly.',
      'SLIDE 4 — The cost: On a fleet of 500 laptops originally purchased at $1,200 each, a 30% recovery rate generates $180,000 in offset. Routing the same fleet to recycling generates zero — and adds disposal fees.',
      'SLIDE 5 — The mistake: Categorizing all retired devices as disposal cost rather than evaluating them for recovery value before routing. Not every device is recyclable at the same value — and some are worth significantly more than recycling.',
      'SLIDE 6 — The fix: Formal asset value evaluation at the point of retirement — sort by age, condition, and model — before routing to recycling. Build the recovery step into the retirement process, not as an afterthought.',
      `SLIDE 7 — CTA: Follow ${COMPANY.name} for more ITAD, data security, and electronics recycling insights.`,
    ],
    [
      'SLIDE 1 — Hook: You paid $1,400 for it. You recycled $0 of it.',
      'SLIDE 2 — The problem: IT asset recovery is not a bonus — it is a budget offset. Organizations without formal recovery programs routinely turn recoverable assets into disposal costs by routing devices to recycling without evaluating secondary market value.',
      'SLIDE 3 — The data: The average enterprise organization retires 15–25% of its device inventory each year. Without a formal asset recovery program, that annual retirement cycle generates zero recovery value and adds disposal fees on top.',
      'SLIDE 4 — The cost: Over a three-year device lifecycle for a 2,000-device fleet, the difference between a formal recovery program and a recycle-everything approach can exceed $400,000 in unrealized recovery value.',
      'SLIDE 5 — The mistake: Waiting until devices are fully obsolete before retiring them. The peak recovery window is 24–36 months from purchase. Devices retired at 48–60 months recover significantly less — sometimes nothing.',
      'SLIDE 6 — The fix: Align device refresh cycles with the secondary market recovery window. Retire at 3 years, not 5. The earlier retirement pays for itself from recovery value — and reduces the storage cost of holding aging hardware.',
      `SLIDE 7 — CTA: Follow for more operator-level IT and reverse logistics insights.`,
    ],
    [
      'SLIDE 1 — Hook: Every quarter in storage is a percentage point lost.',
      'SLIDE 2 — The problem: Retired devices lose secondary market value from the moment they leave active use. Storage is not neutral — it is a compounding cost in both storage expense and value depreciation.',
      'SLIDE 3 — The data: Devices held in storage for 6–12 months before disposition recover 40–60% less than the same devices retired promptly. Market timing matters as much as device condition.',
      'SLIDE 4 — The cost: An organization storing 300 devices for six months at $100/device/month in carrying cost spends $180,000 in storage — on assets that are simultaneously losing secondary market value each month they wait.',
      'SLIDE 5 — The mistake: Batching retirement events to reduce administrative burden. Large quarterly or annual batches feel efficient but maximize storage cost and value loss by holding devices longer than necessary.',
      'SLIDE 6 — The fix: Rolling retirement — process devices as they are retired rather than accumulating them for batch events. Reduces storage cost, captures peak recovery value, and keeps the compliance record current.',
      `SLIDE 7 — CTA: Visit ${COMPANY.website} to learn how Full Circle Electronics handles IT asset disposition.`,
    ],
  ],

  'storage-cost-buildup': [
    [
      'SLIDE 1 — Hook: The closet full of old IT is costing $150 per device per month.',
      'SLIDE 2 — The problem: Organizations with unmanaged IT asset retirement programs accumulate 3–8 months of undisposed devices before acting. At $50–$150 per device per month in carrying cost, large inventories generate significant hidden cost.',
      'SLIDE 3 — The data: The average enterprise organization has 12–18% of its device inventory in an "end-of-life pending disposition" state at any given time — representing tied-up capital, active storage cost, and ongoing data security liability.',
      'SLIDE 4 — The cost: A 500-device organization with 15% of its fleet in pending disposition has 75 devices averaging $100/month in storage cost — $90,000 annually in direct storage cost, before accounting for value depreciation.',
      'SLIDE 5 — The mistake: Not counting storage cost as part of the IT disposal budget. Storage cost is invisible when it is absorbed by facilities — but it is real, and it compounds the longer disposition is deferred.',
      'SLIDE 6 — The fix: Include carrying cost in the total cost of deferred disposition. When storage cost is visible in the retirement budget, the math for prompt disposition becomes straightforward.',
      `SLIDE 7 — CTA: Follow ${COMPANY.name} for more ITAD, data security, and electronics recycling insights.`,
    ],
    [
      'SLIDE 1 — Hook: Deferred disposal is not free. It is billed every month.',
      'SLIDE 2 — The problem: Devices in storage carry the same data exposure risk as active devices. Physical security of storage areas, inventory management for audit purposes, and ongoing administrative burden add cost that does not appear on any IT line item until disposition is triggered.',
      'SLIDE 3 — The data: Storage cost for pending-disposition devices is typically absorbed into facility overhead rather than assigned to IT operations — making it invisible in the IT budget while real in the facilities budget.',
      'SLIDE 4 — The cost: Deferred disposition compounds on three dimensions simultaneously: direct storage cost, secondary market value loss, and ongoing data security liability. None of these costs decrease with time.',
      'SLIDE 5 — The mistake: Treating pending-disposition devices as inactive and therefore low-risk. A device in storage that is lost, stolen, or improperly accessed while awaiting disposition creates the same liability as an active device breach.',
      'SLIDE 6 — The fix: Set a disposition SLA for every device retirement — no device in pending disposition longer than 30 days. Assign ownership of the SLA to whoever owns the IT budget, not just the IT operations team.',
      `SLIDE 7 — CTA: Follow for more operator-level IT and reverse logistics insights.`,
    ],
    [
      'SLIDE 1 — Hook: That pile of old hardware is an active line item.',
      'SLIDE 2 — The problem: Unmanaged device retirement creates a hidden operating cost that most organizations do not see because it is spread across facilities, IT staff time, and security overhead — not captured as a single line item.',
      'SLIDE 3 — The data: At an average carrying cost of $50–$150 per device per month, an organization with 200 devices in pending disposition is spending $10,000–$30,000 per month on hardware that generates no operational value.',
      'SLIDE 4 — The cost: The full cost of unmanaged storage includes direct storage, IT staff time for inventory management, physical security overhead, and the insurance/liability cost of devices not yet covered by destruction certificates.',
      'SLIDE 5 — The mistake: Measuring IT disposal cost only by the vendor invoice. The cost starts accumulating in storage — before the vendor is ever called.',
      'SLIDE 6 — The fix: Measure the full lifecycle cost of device retirement — from the day a device is taken out of active service through the day a destruction certificate is received. The carrying cost will change how quickly you schedule disposition.',
      `SLIDE 7 — CTA: Follow for more practical breakdowns on retiring technology assets safely.`,
    ],
  ],

  'multi-location-disposal': [
    [
      'SLIDE 1 — Hook: Eight locations. Eight vendors. Zero unified compliance record.',
      'SLIDE 2 — The problem: Organizations with 10 or more locations managing IT asset disposition independently experience compliance documentation inconsistency in 65–80% of locations. Most cannot demonstrate centralized audit readiness.',
      'SLIDE 3 — The data: Multi-location IT asset retirement programs without centralized vendor management average 3–6 different disposal vendors per organization, each with different documentation formats and chain-of-custody protocols.',
      'SLIDE 4 — The cost: A compliance audit does not review a single location. It reviews the entire organization. One non-compliant site can trigger enterprise-wide examination — and the weakest location sets the standard for the whole program.',
      'SLIDE 5 — The mistake: Allowing each location to manage its own disposal process independently. Local efficiency creates organizational compliance risk — and that risk surfaces during an audit, not before.',
      'SLIDE 6 — The fix: Centralized ITAD vendor with standardized protocols across all locations — single documentation format, single chain-of-custody standard, single audit record that covers the entire organization.',
      `SLIDE 7 — CTA: Follow ${COMPANY.name} for more ITAD, data security, and electronics recycling insights.`,
    ],
    [
      'SLIDE 1 — Hook: Your weakest location is your audit exposure.',
      'SLIDE 2 — The problem: Compliance audit failures in multi-location organizations most frequently trace to a single non-compliant location. The chain of custody across an organization is only as strong as its least-documented site.',
      'SLIDE 3 — The data: 65–80% of independent multi-location programs cannot produce compliant chain-of-custody documentation across all locations — a failure rate that reflects the structural problem of distributed disposal without central oversight.',
      'SLIDE 4 — The cost: When one location\'s non-compliance triggers an enterprise-wide audit, the cost is not just the penalty for that location — it is the cost of demonstrating compliance across every site, which informal multi-location programs cannot do.',
      'SLIDE 5 — The mistake: Assuming that because headquarters has a formal program, the satellite offices do too. Compliance programs do not replicate themselves — they require explicit implementation at every location.',
      'SLIDE 6 — The fix: Audit your disposal program at the location level before a regulator does. Identify which sites have documentation gaps and bring them into the centralized program before the next audit cycle.',
      `SLIDE 7 — CTA: Follow for more insights on IT asset disposition, compliance, and risk reduction.`,
    ],
    [
      'SLIDE 1 — Hook: Every office handles it differently. That is the compliance problem.',
      'SLIDE 2 — The problem: Distributed IT disposal decisions — even well-intentioned ones — create inconsistent compliance records that cannot be unified retroactively. Each location needs to use the same standard from the beginning.',
      'SLIDE 3 — The data: Organizations using 3–6 different disposal vendors across locations have no single record set that covers their enterprise-wide disposition program. During a compliance audit, this gap is structural — it cannot be papered over.',
      'SLIDE 4 — The cost: The administrative cost of managing a multi-vendor, multi-format documentation program across locations typically exceeds the cost of a centralized program — while producing worse compliance outcomes.',
      'SLIDE 5 — The mistake: Choosing disposal vendors at the local level based on price or convenience rather than documentation standards. Price-optimized local disposal creates enterprise-wide compliance risk.',
      'SLIDE 6 — The fix: Centralize vendor selection and documentation standards before the next device refresh. A single vendor contract covering all locations is both more cost-effective and more compliant than a decentralized model.',
      `SLIDE 7 — CTA: Visit ${COMPANY.website} to learn how Full Circle Electronics handles IT asset disposition.`,
    ],
  ],

  'reverse-logistics-complexity': [
    [
      'SLIDE 1 — Hook: The devices shipped. The documentation did not.',
      'SLIDE 2 — The problem: Reverse logistics for retired electronics requires coordinated management of collection, packaging, transport, chain-of-custody documentation, and final disposition across multiple transition points — most organizations lack the infrastructure to manage all of them consistently.',
      'SLIDE 3 — The data: Device damage and documentation gaps during reverse logistics transport affect 15–25% of enterprise IT retirement shipments managed without dedicated ITAD logistics support.',
      'SLIDE 4 — The cost: A single shipment with documentation gaps creates a chain-of-custody hole that cannot be retroactively filled — creating compliance exposure for every device in that shipment regardless of the final disposition outcome.',
      'SLIDE 5 — The mistake: Using general freight carriers for electronics reverse logistics. Standard freight manages delivery, not chain-of-custody, device-level serialization, or compliance documentation.',
      'SLIDE 6 — The fix: Dedicated ITAD logistics with device-level intake at collection, serialized manifest documentation for every shipment, and chain-of-custody continuity from pickup through final disposition certificate.',
      `SLIDE 7 — CTA: Follow ${COMPANY.name} for more ITAD, data security, and electronics recycling insights.`,
    ],
    [
      'SLIDE 1 — Hook: Getting equipment to users is logistics. Getting it back safely is compliance.',
      'SLIDE 2 — The problem: Enterprise IT retirement events — office relocations, equipment refreshes, facility closures — generate device volumes that exceed in-house logistics capacity in roughly 70% of cases, creating the storage accumulation and documentation gaps that compound compliance exposure.',
      'SLIDE 3 — The data: Inadequate packing, mixed carrier streams, and undocumented interim storage are the most common causes of device damage and documentation gaps in reverse logistics — all preventable with the right process.',
      'SLIDE 4 — The cost: Device damage in transit eliminates secondary market recovery value entirely. Combined with the documentation gaps that typically accompany unmanaged reverse logistics, the cost of a poorly managed IT retirement event significantly exceeds the cost of a properly managed one.',
      'SLIDE 5 — The mistake: Treating IT reverse logistics as a shipping problem. Shipping moves packages. ITAD reverse logistics manages data security, physical asset integrity, and compliance documentation simultaneously.',
      'SLIDE 6 — The fix: Purpose-built ITAD reverse logistics — padded packing, serialized manifests, chain-of-custody at every transfer point, and a partner with the infrastructure to manage volume spikes from large retirement events.',
      `SLIDE 7 — CTA: Follow for more operator-level IT and reverse logistics insights.`,
    ],
    [
      'SLIDE 1 — Hook: Eighty devices picked up. Chain of custody documented on forty-three.',
      'SLIDE 2 — The problem: The reverse logistics phase of IT asset retirement is where chain-of-custody failures most frequently occur — physical control changes hands multiple times between collection and processing, and each transfer is an opportunity for a documentation gap.',
      'SLIDE 3 — The data: 70% of enterprise IT retirement events exceed in-house logistics capacity. The overflow — devices handled ad hoc, stored informally, or routed through non-standard carriers — is where documentation integrity breaks down.',
      'SLIDE 4 — The cost: A chain-of-custody break in reverse logistics invalidates the compliance record for every device in that transit chain. One undocumented shipment can compromise the compliance record for hundreds of devices.',
      'SLIDE 5 — The mistake: Scaling reverse logistics processes designed for normal device volume to handle large retirement events. Volume spikes expose every weakness in an informal logistics process.',
      'SLIDE 6 — The fix: Pre-planned reverse logistics for large retirement events — staffed pickups, serialized collection manifests, dedicated transport with documented chain of custody, and direct intake at a certified ITAD facility.',
      `SLIDE 7 — CTA: Visit ${COMPANY.website} to learn how Full Circle Electronics handles IT asset disposition.`,
    ],
  ],

  'informal-disposal-risk': [
    [
      'SLIDE 1 — Hook: The trade-in kiosk is not a compliance program.',
      'SLIDE 2 — The problem: Employee-managed IT disposal — devices left at electronics drop-off sites, exchanged through retail trade-in programs, or discarded through informal channels — bypasses chain-of-custody requirements entirely. No documentation. No verified destruction. No audit trail.',
      'SLIDE 3 — The data: 35–45% of small and mid-size organizations rely primarily on informal disposal channels for retired IT — meaning a large share of retired devices leave without any documented handling.',
      'SLIDE 4 — The cost: Informal disposal creates uninsurable compliance exposure. No chain-of-custody record means no audit defense — and no audit defense means a compliance finding is the baseline outcome, not a possibility.',
      'SLIDE 5 — The mistake: Using consumer recycling programs for enterprise device retirement. Consumer programs are designed for individuals, not for organizations with regulatory documentation requirements.',
      'SLIDE 6 — The fix: Replace informal disposal with a documented ITAD program — even a basic one. A chain-of-custody record, a destruction certificate, and a serialized inventory are the minimum requirements for audit defense.',
      `SLIDE 7 — CTA: Follow ${COMPANY.name} for more ITAD, data security, and electronics recycling insights.`,
    ],
    [
      'SLIDE 1 — Hook: Someone dropped it in a recycling bin. No certificate. No audit trail.',
      'SLIDE 2 — The problem: Retail trade-in programs, consumer recycling drop-offs, and informal e-waste collection events do not meet enterprise data destruction or chain-of-custody requirements — regardless of the certifications those programs hold for consumer use.',
      'SLIDE 3 — The data: When an organization cannot produce chain-of-custody and data destruction documentation for retired devices during a compliance audit, the absence of documentation is treated as evidence of noncompliance — not as an ambiguity.',
      'SLIDE 4 — The cost: Informal disposal creates a retroactively unfixable problem. Once a device leaves without documentation, there is no path to creating the missing record — the compliance gap is permanent.',
      'SLIDE 5 — The mistake: Assuming that a recycler\'s consumer certification covers enterprise compliance requirements. It does not. HIPAA, SOX, and GLBA require enterprise-level documentation that consumer programs are not structured to provide.',
      'SLIDE 6 — The fix: A formal ITAD program does not need to be complex to close the compliance gap. The minimum requirements are: a defined intake process, serialized device tracking, verified data destruction, and a destruction certificate linked to each device.',
      `SLIDE 7 — CTA: Follow for more practical breakdowns on retiring technology assets safely.`,
    ],
    [
      'SLIDE 1 — Hook: 35% of businesses dispose of IT informally. Most have never faced an audit.',
      'SLIDE 2 — The problem: Informal disposal programs exist not because organizations chose noncompliance, but because no one built a formal program. The absence of a program is treated the same as a failed program during a compliance audit.',
      'SLIDE 3 — The data: The audit question for informal disposal programs is simple: "Provide chain-of-custody and data destruction documentation for all retired devices in the past three years." The informal answer is silence. Silence is a compliance failure.',
      'SLIDE 4 — The cost: The cost of building a formal ITAD program is measured in process change and vendor selection. The cost of not having one is measured in regulatory penalties, legal exposure, and the cost of a breach traced to an undocumented retired device.',
      'SLIDE 5 — The mistake: Waiting for an audit trigger before formalizing the disposal program. By the time the audit arrives, the documentation gaps for past disposals are permanent.',
      'SLIDE 6 — The fix: Start with a formal program for future disposals and build backward documentation where possible. The goal is a defensible position for the next audit — and a complete record for every disposal after today.',
      `SLIDE 7 — CTA: Visit ${COMPANY.website} to learn how Full Circle Electronics handles IT asset disposition.`,
    ],
  ],
}

// ---------------------------------------------------------------------------
// CAPTIONS — 3 per problem
// ---------------------------------------------------------------------------

const CAPTIONS: Record<string, string[]> = {
  'data-exposure-risk': [
    `Most IT teams treat device retirement as the end of a security obligation. It is not.

When a device leaves active use without documented data destruction and a chain-of-custody record, it carries the same data it carried in active use — email archives, financial records, login credentials, patient records — into whatever chain follows: resale, donation, recycling, or landfill.

Studies of used devices on secondary markets consistently show that 35–40% contain recoverable data despite prior claims of wiping. The average cost of a data breach is $4.45 million. Retired devices without verified destruction contribute directly to that exposure.

The risk does not start at the breach. It starts the day the device leaves without documentation.

${COMPANY.name} provides certified data destruction with device-level chain-of-custody from collection through final disposition. Follow ${COMPANY.name} for more ITAD, data security, and electronics recycling insights.`,

    `There is a common assumption in enterprise IT: if a device is no longer on the network, it is no longer a security risk.

That assumption is wrong.

A retired device without verified data destruction holds exactly the data it held in active use. Factory reset removes the file index — not the data. Forensic recovery from factory-reset devices succeeds at rates above 60%. Software wiping without verification leaves recoverable data on 25–40% of processed devices.

The device that left your building last quarter might still have your customers' data, your financial records, or your employees' personal information on it. You would not know — because the data doesn't announce itself.

HIPAA alone can levy $100 to $50,000 per record per violation for improper data disposal. In healthcare organizations retiring large device volumes, one undocumented disposal event can generate penalty exposure across thousands of patient records.

Verified data destruction is not optional. It is the point where device retirement actually ends.

Follow ${COMPANY.name} for more ITAD, data security, and electronics recycling insights.`,

    `The gap between "we recycled it" and "we destroyed the data" is where most organizations are exposed.

Recycling removes the device. It does not necessarily remove the data. Without a certified destruction method, a device-level certificate, and a chain-of-custody record tying each device to its verified destruction, the data on that device remains a liability.

The average data breach costs $4.45 million. HIPAA violations from improper data disposal can reach $50,000 per record per violation. These numbers do not distinguish between breaches from active systems and breaches from retired devices — exposure is exposure, regardless of when the device left the building.

The organizations most exposed to this risk are not the ones that made deliberate bad choices. They are the ones that made no formal choice at all — that allowed retirement to happen informally, without documentation standards, without vendor accountability, without a destruction record.

A formal ITAD program closes this gap. The question is whether you close it before or after an audit event.

Follow for more practical breakdowns on retiring technology assets safely.`,
  ],

  'chain-of-custody-failures': [
    `A chain-of-custody record is not a compliance formality. It is the only evidence that a device was handled correctly at every step between your hands and its verified destruction.

Without continuous documentation — from collection through transport through processing through final disposition — there is no way to demonstrate what happened to a device. And when regulators ask for that demonstration, "we used a reputable vendor" is not an answer.

Organizations with multi-location IT infrastructure average 3–7 undocumented device handoffs before final disposition. Each one is an untracked data exposure point and a permanent gap in the compliance record.

Chain-of-custody failures cannot be reconstructed after the fact. The moment a handoff goes undocumented, that gap is permanent.

Follow ${COMPANY.name} for more ITAD, data security, and electronics recycling insights.`,

    `The compliance question is never just "did you destroy the data?" It is "can you prove, at every step, that the device was handled in a way that prevented unauthorized access to that data?"

That is what chain of custody answers. Not just the end point — every point.

HIPAA, SOX, and FERPA each require demonstrable chain-of-custody evidence for data-bearing device disposal. A final destruction certificate satisfies the endpoint. It does not satisfy the record of every handoff that preceded it.

Most informal disposal programs produce a certificate at the end. They do not produce documentation of collection, transport, interim storage, or intake. Auditors look at the whole record — not just the final page.

When the record has gaps, the audit has findings. Chain-of-custody documentation is not the most exciting part of IT operations. It is, however, the part that stands between you and a compliance failure.

Follow for more insights on IT asset disposition, compliance, and risk reduction.`,

    `Here is the chain-of-custody failure pattern: the IT team hands devices to a vendor. The vendor picks them up. At some point, a destruction certificate arrives. No documentation of what happened between.

That is not a chain of custody. It is a before and an after with nothing connecting them.

Regulatory auditors who examine IT asset disposition want three things: documented destruction method, device-level serialization records, and chain-of-custody from collection to final disposition. Most informal programs can satisfy one of the three at best.

The organizations that discover this problem during an audit are in a difficult position. The documentation gaps for past disposals are permanent — there is no retroactive fix. The audit finding is based on what the record shows, and a missing record shows nothing provable.

The solution is not complicated. It is continuous: documentation at every handoff, by every party, for every device. Start before the audit — because starting after is too late.

Follow for more practical breakdowns on retiring technology assets safely.`,
  ],

  'compliance-gaps': [
    `Most compliance failures in IT asset disposition are not caused by bad intentions. They are caused by the absence of documentation that was never collected.

HIPAA, SOX, FERPA, and GLBA each require evidence of data destruction and device disposition — not a policy that says you do it, but documented proof that you did it, for each device. Compliance auditors examining IT asset disposition want a destruction method, a device-level serialization record, and a chain-of-custody record from collection through final disposition.

Most informal disposal programs produce none of the three.

The risk is not theoretical. It is an audit event waiting for a trigger — and the trigger is usually a device appearing where it should not, or an audit request that an informal process cannot answer.

Average regulatory penalty from improper IT asset disposition: $500,000–$2 million per audit event. Legal defense costs typically run 2–3x the direct penalty.

Follow ${COMPANY.name} for more ITAD, data security, and electronics recycling insights.`,

    `A written policy that says "we properly dispose of retired devices" is not compliance documentation. It is a statement of intent. Compliance documentation is proof that the intent was executed — for each device, in a format that satisfies the applicable regulatory standard.

That distinction is where most organizations discover their compliance gap: at the audit, when the request comes for device-level documentation and the informal process has nothing to provide.

Compliance failures related to IT asset disposition compound across devices. One audit finding covering 500 devices disposed without documentation generates penalty exposure for each device. At per-record penalty rates under HIPAA, the math compounds rapidly in organizations with large device inventories.

The fix is not a policy revision. It is a process change: build documentation collection into the disposal process from the point of device retirement forward, and ensure every device that leaves produces a traceable record.

Follow for more insights on IT asset disposition, compliance, and risk reduction.`,

    `The audit did not find a breach. It found an absence of records.

This is the most common outcome when compliance auditors examine IT asset disposition in organizations without formal ITAD programs. The organization did not intend to create liability. It simply never built the documentation standard into its disposal process.

HIPAA, SOX, GLBA, and FERPA each require organizations to demonstrate what happened to data-bearing devices — not just that devices were recycled, but that data was destroyed by a documented method, traceable to each device serial number, with chain-of-custody evidence at every handoff.

Meeting this standard requires process change, not just vendor change. The vendor produces the certificate. The organization has to ensure the intake process, serialization, and chain-of-custody documentation exist at every step that precedes it.

Visit ${COMPANY.website} to learn how Full Circle Electronics handles IT asset disposition.`,
  ],

  'e-waste-mismanagement': [
    `The liability from improper e-waste disposal does not attach to the hauler. It attaches to the organization that generated the waste.

Electronics contain lead, mercury, cadmium, and beryllium. When these materials end up in landfills, groundwater, or uncertified processing facilities, the EPA looks to the originating organization for accountability — regardless of what the organization was told by the vendor it hired.

E-waste is approximately 2% of landfill volume but accounts for roughly 70% of toxic waste. EPA penalties for hazardous waste violations from improper electronics disposal range from $25,000 to $70,000 per day per violation. Environmental remediation costs can run $200,000–$5 million per contamination site.

Certification verification is not a vendor preference. It is the difference between liability transfer and liability retention.

Follow ${COMPANY.name} for more ITAD, data security, and electronics recycling insights.`,

    `"We use a recycler" is not a sufficient answer when an EPA auditor asks how your organization handles end-of-life electronics.

The relevant question is whether that recycler is certified to handle hazardous materials in electronics — R2 or e-Stewards certification — and whether your vendor due diligence verifies current certification status, not just past certification at onboarding.

Certifications lapse. Subcontractors may not carry the same certification as the primary vendor. Downstream material handling may not match the certifications displayed at the vendor's front door.

Organizations that assume they are protected by their vendor's certification without verifying the specifics of that certification are operating on an assumption that a regulator will not share.

EPA penalties for hazardous waste violations: $25,000–$70,000 per day per violation. The environmental remediation liability from a contamination event can significantly exceed that.

Follow for more practical breakdowns on retiring technology assets safely.`,

    `The consumer recycling drop-off and the certified enterprise e-waste processor look similar from the outside. They are not.

Consumer programs are designed to keep electronics out of landfills. They are not designed to produce the downstream documentation that satisfies enterprise environmental liability requirements. Most do not track material flows beyond the initial collection point.

E-waste represents a small percentage of landfill volume — roughly 2% — but accounts for around 70% of toxic waste in landfills. When your devices contribute to that number, the liability is yours regardless of what the drop-off site told you.

The standard for enterprise e-waste management is not "we dropped it off somewhere that accepted it." It is certified handling with documented downstream material accountability — proof that the materials in your devices were processed by facilities equipped to handle them.

Follow for more insights on IT asset disposition, compliance, and risk reduction.`,
  ],

  'device-wiping-assumptions': [
    `Factory reset is not data destruction. This distinction matters more than most IT teams realize.

A factory reset removes the file system index — the record of where data is stored. The underlying data remains on the drive, intact, recoverable with widely available forensic tools. Studies of factory-reset devices in forensic testing environments show recovery success rates above 60%.

Software wiping without certified verification leaves recoverable data on 25–40% of devices processed through typical enterprise IT retirement programs. NIST 800-88 and DoD sanitization standards specify both the wiping method and the verification requirements. Most internal IT wiping processes meet neither.

The gap between running a wipe utility and meeting a compliance standard is where data exposure concentrates — and by the time it is discovered, the device has already left organizational control.

Follow ${COMPANY.name} for more ITAD, data security, and electronics recycling insights.`,

    `There is a gap between what most organizations believe about device wiping and what forensic evidence shows.

The belief: if IT ran a wipe utility on it, the data is gone.
The evidence: 25–40% of devices wiped by enterprise IT processes contain recoverable data. Forensic recovery from factory-reset devices succeeds at rates above 60%.

This is not a vendor quality problem. It is a method and verification problem. NIST 800-88 specifies media-type-specific sanitization approaches and verification requirements. HDDs and SSDs require different methods. Most enterprise IT wipe processes apply one method to all media types, without the verification step that would reveal the gaps.

The cost of getting this wrong is not the wipe itself. It is the exposure from whatever the recovered data contains — plus the regulatory liability from a compliance standard you did not know you were failing to meet.

Follow for more practical breakdowns on retiring technology assets safely.`,

    `The assumption that device wiping is a solved internal IT process is one of the more consequential assumptions in enterprise data security.

It persists because the failure is invisible. A device that was inadequately wiped does not announce itself. It leaves the building looking like a compliant device, and the gap between its actual data state and its assumed data state only surfaces when a forensic tool, a secondary market discoverer, or a regulator finds the data.

NIST 800-88 is the federal standard for media sanitization. It distinguishes between clear, purge, and destroy — with specific method requirements for each. The compliance gap is rarely between "wiped" and "not wiped." It is between "wiped to internal IT standard" and "wiped to a standard that survives regulatory scrutiny."

Data exposure from inadequately wiped devices carries average regulatory exposure of $500,000–$2 million per incident. Third-party verified, NIST-compliant data sanitization with device-level certificates closes that gap before it becomes an incident.

Visit ${COMPANY.website} to learn how Full Circle Electronics handles IT asset disposition.`,
  ],

  'asset-value-recovery': [
    `Enterprise laptops retired within three years typically retain 25–40% of their original purchase price on secondary markets. For a $1,200 laptop, that is $300–$480 per device.

For an organization retiring 300 laptops per year, the difference between a formal asset recovery program and a recycle-everything approach is $90,000–$144,000 annually — recurring, and compounding as device refresh cycles continue.

That value does not last. Secondary market value declines 15–25% per quarter. Devices stored 6–12 months before disposition recover 40–60% less than devices retired promptly. The recovery window is not indefinite.

Most organizations leave this value on the table not from deliberate choice, but from the absence of a recovery evaluation step in the retirement process. Build the step. Capture the value.

Follow ${COMPANY.name} for more ITAD, data security, and electronics recycling insights.`,

    `There is a decision in every IT refresh cycle that most organizations make by default: do these devices get recovered or recycled?

When the decision is made by default — when all devices route to recycling because no one built a recovery evaluation into the process — the organization absorbs the disposal cost and loses the recovery value. Both are real numbers.

Enterprise devices retired at 2–3 years retain 25–40% of original purchase price. At 4–5 years, that retention drops to 5–15%. At 6+ years, recovery value is often below the cost of processing. The decision of when to retire and what to do with retired devices is a financial one, not just a logistics one.

A formal asset value evaluation at the point of retirement — sort by age, condition, and model before routing — captures value that otherwise disappears into the recycling chain. It is a step, not a program overhaul.

Follow for more operator-level IT and reverse logistics insights.`,

    `Delayed IT retirement costs twice.

First, it extends the operational life of devices past the point where support, maintenance, and performance costs outweigh the cost of replacement. Second, it reduces the secondary market recovery value of those devices by 15–25% per quarter they remain in storage rather than retired.

An organization that defers retirement for 6–12 months to simplify the logistics process recovers 40–60% less per device than one that processes devices promptly. On a fleet of 200 devices at a $1,200 original purchase price, that deferred value can exceed $50,000 per refresh cycle.

The math for prompt retirement is straightforward when secondary market value is included in the total cost calculation. The challenge is organizational — getting the recovery consideration into the IT refresh planning process, not just the disposal logistics process.

Visit ${COMPANY.website} to learn how Full Circle Electronics handles IT asset disposition.`,
  ],

  'storage-cost-buildup': [
    `Pending-disposition devices are not neutral. They are actively generating cost on three dimensions simultaneously.

First: direct storage cost. At $50–$150 per device per month in facility space, IT staff time, and physical security overhead, a 200-device inventory in pending disposition costs $10,000–$30,000 per month — before any disposition action is taken.

Second: value depreciation. Every month a device sits in storage is a month of secondary market value eroded. Devices stored 6–12 months before disposition recover 40–60% less than devices retired promptly.

Third: data security liability. Devices in storage carry the same exposure risk as active devices. Physical security requirements do not decrease because a device is awaiting disposition.

The cost of deferred disposition is not zero. It is compounding.

Follow ${COMPANY.name} for more ITAD, data security, and electronics recycling insights.`,

    `Most organizations do not count storage cost as part of their IT disposal budget — because storage cost shows up in facilities, not IT operations.

That accounting separation makes the cost invisible in the IT budget while real in the facilities budget. The practical effect is that IT teams make disposal timing decisions without seeing the full cost of deferring them.

At $50–$150 per device per month, an organization with 12–18% of its 1,000-device fleet in pending disposition is spending $60,000–$270,000 annually on hardware that generates no operational value. This cost does not appear on any IT line item. It is absorbed as overhead.

Make it visible. When storage cost is tracked as part of the total disposal budget, the financial case for prompt disposition becomes clear without any advocacy required. The numbers make the argument.

Follow for more insights on IT asset disposition, compliance, and risk reduction.`,

    `The decision to defer IT asset disposition is presented as a matter of timing. It is actually a matter of cost.

Pending-disposition devices are not waiting in a neutral state. They are incurring facility cost, depreciating in value, and maintaining data exposure liability — all simultaneously, and all against assets that are generating zero operational value.

The average enterprise organization has 12–18% of its device inventory in "end-of-life pending disposition" at any given time. At a 1,000-device organization, that is 120–180 devices sitting in a storage room at $100/device/month — $12,000–$18,000 per month in direct holding cost, before secondary market value loss is counted.

Deferred disposition is not free. It is a monthly charge that appears in the wrong budget column, which is the only reason it seems invisible.

Follow for more practical breakdowns on retiring technology assets safely.`,
  ],

  'multi-location-disposal': [
    `Multi-location IT asset disposition managed independently does not just create operational inefficiency. It distributes compliance risk across every location — and surfaces that risk during an audit, when the inconsistency cannot be corrected retroactively.

Organizations with 10 or more locations managing disposal independently experience compliance documentation inconsistency in 65–80% of their locations. Most use 3–6 different disposal vendors, each with different documentation formats and chain-of-custody protocols. During a compliance audit, no single record set covers the organization.

Compliance audit failures in multi-location organizations most frequently trace to a single non-compliant location. The chain of custody across an organization is only as strong as its weakest documented site.

That one site — the one with the informal process, the personal relationship with a local hauler, the stack of devices in a back room — is the site that triggers enterprise-wide audit review.

Follow ${COMPANY.name} for more ITAD, data security, and electronics recycling insights.`,

    `Here is the multi-location compliance problem in its most direct form: your headquarters has a formal ITAD program. Your regional offices do not know it exists.

This is the normal state of multi-location IT asset disposition programs that were not explicitly designed to cover all sites. Headquarters compliance does not transfer to satellite offices by proximity. It requires explicit implementation, standardized protocols, and a vendor relationship that covers every location under a single documentation standard.

65–80% of independent multi-location programs cannot produce compliant chain-of-custody documentation across all locations. That number reflects not negligence but design — informal programs were never built to scale.

An auditor reviewing a single problematic site can trigger enterprise-wide examination. The cost of a non-compliant location is not limited to that location.

Follow for more practical breakdowns on retiring technology assets safely.`,

    `The compliance math for multi-location disposal is straightforward: one non-compliant site in twenty creates liability that extends to all twenty.

Compliance audits do not review a representative sample of locations. When a non-compliant site is found, the audit scope typically expands to cover the entire organization. The organization must then demonstrate compliance for every location — and the ones that have been managing disposal independently, informally, and without centralized documentation are unable to do so.

The fix is not complicated. It is a standardization project: one ITAD vendor, one documentation standard, one chain-of-custody protocol, covering every location under a single contract. The administrative cost of centralizing the program is typically lower than the cost of managing 3–6 different vendors independently — and the compliance outcome is categorically better.

Visit ${COMPANY.website} to learn how Full Circle Electronics handles IT asset disposition.`,
  ],

  'reverse-logistics-complexity': [
    `Reverse logistics for retired electronics is not a shipping problem. It is a compliance problem that happens to involve shipping.

Standard freight carriers manage delivery. They do not manage chain-of-custody, device-level serialization, or compliance documentation. When enterprise IT retirement events route through general freight, the compliance record breaks at the first undocumented transfer — and the break is permanent.

Device damage and documentation gaps during reverse logistics transport affect 15–25% of enterprise IT retirement shipments managed without dedicated ITAD logistics support. Inadequate packing, mixed carrier streams, and undocumented interim storage are the most common causes — all preventable with a process designed for the requirement.

70% of enterprise IT retirement events exceed in-house logistics capacity. The overflow is where the compliance gaps accumulate.

Follow ${COMPANY.name} for more ITAD, data security, and electronics recycling insights.`,

    `The reverse logistics phase of IT asset retirement is where the compliance record most frequently breaks — because it is the phase where physical control changes hands the most, and documentation requirements are the least understood.

Each handoff in a reverse logistics chain is an opportunity for a documentation gap. Collection by internal IT. Transfer to a staging area. Pickup by a freight carrier. Delivery to a processing facility. Intake at the facility. Each one needs documentation. Most informal reverse logistics processes document one or two of them.

Enterprise IT retirement events — office relocations, equipment refreshes, facility closures — generate device volumes that exceed in-house capacity in roughly 70% of cases. When capacity is exceeded, the normal process breaks down, devices get handled ad hoc, and the documentation that was already informal becomes nonexistent.

Purpose-built ITAD logistics — designed specifically for electronics compliance, not general freight — closes this gap before it becomes a compliance finding.

Follow for more operator-level IT and reverse logistics insights.`,

    `The gap between the IT department's retirement decision and the ITAD vendor's destruction certificate is where most reverse logistics compliance failures occur.

Between those two endpoints — retirement decision and destruction certificate — are multiple physical handoffs, a transport event, and a facility intake process. Each one is a potential chain-of-custody break. Each break is permanent.

Studies of enterprise IT retirement shipments managed without dedicated ITAD logistics support show 15–25% experiencing device damage or documentation gaps. Device damage eliminates recovery value. Documentation gaps create compliance exposure for every device in that shipment.

The devices that arrive damaged or undocumented are not outliers — they are the predictable result of applying a general logistics process to a compliance-specific requirement.

Visit ${COMPANY.website} to learn how Full Circle Electronics handles IT asset disposition.`,
  ],

  'informal-disposal-risk': [
    `Informal disposal programs do not create ambiguous compliance situations. They create the absence of documentation — and the absence of documentation is treated as a compliance failure during an audit, not as a gray area.

35–45% of small and mid-size organizations rely primarily on informal disposal channels for retired IT. Consumer drop-offs, retail trade-in programs, employee-managed recycling, informal haulers — none of these produce the chain-of-custody and data destruction documentation that regulatory frameworks require.

The audit question for these organizations is simple: "Provide chain-of-custody and data destruction documentation for all retired devices in the past three years." The answer from an informal program is silence. Silence is a compliance failure.

The cost of building a formal ITAD program is a process change and a vendor selection. The cost of not having one is measured in regulatory penalties, legal exposure, and liability from devices that left without documentation.

Follow ${COMPANY.name} for more ITAD, data security, and electronics recycling insights.`,

    `Consumer electronics recycling programs exist to address a legitimate environmental problem. They are not designed to satisfy enterprise data destruction and chain-of-custody requirements — and using them for business device retirement creates compliance exposure the program cannot cure.

HIPAA, SOX, and GLBA require documentation that consumer programs are not structured to produce: device-level destruction certificates, serialized chain-of-custody records, and verified data destruction to a specific compliance standard. Consumer programs handle collection and processing. They do not produce enterprise compliance documentation.

Organizations that use consumer channels for business device retirement typically do so because no formal alternative was built into their operations. The informal channel is the path of least resistance — until the audit arrives.

35–45% of SMBs are in this position. Most have never faced a compliance audit of their IT disposal program. The ones that have are not in this position twice.

Follow for more insights on IT asset disposition, compliance, and risk reduction.`,

    `Informal disposal is not a risk until it is the only answer to an auditor's question.

That question — "show us your chain-of-custody and data destruction documentation for the past three years" — exposes informal programs completely. There is no partial credit. There is no retroactive documentation. There is a compliance finding covering every device that left without a documented process.

The challenging part of informal disposal risk is that it is invisible until it is not. Organizations using informal channels typically process devices without incident for years. No breach. No complaint. No audit. The absence of consequences is not the same as the absence of risk.

The trigger can be anything: a breach investigation, a regulatory complaint, a routine audit cycle, a device found on a secondary market. When the trigger arrives, the program is evaluated on its documentation — and informal programs have none.

Visit ${COMPANY.website} to learn how Full Circle Electronics handles IT asset disposition.`,
  ],
}

// ---------------------------------------------------------------------------
// SUGGESTED VISUALS — 5 per problem
// ---------------------------------------------------------------------------

const SUGGESTED_VISUALS: Record<string, string[]> = {
  'data-exposure-risk': [
    'Stack of retired laptops in a storage room with a handwritten "OLD IT" label',
    'Close-up of a hard drive label showing serial number and a question mark overlay',
    'Screen showing a spreadsheet of device serial numbers with "DESTRUCTION CERT: NONE" column highlighted',
    'Time-lapse of devices accumulating in a server room corner over months',
    'Split screen: active employee laptop vs. identical retired laptop with "SAME DATA" label',
  ],
  'chain-of-custody-failures': [
    'A chain with one clearly missing link, superimposed over a stack of retired devices',
    'Empty signature line on a chain-of-custody document with a device serial number above it',
    'Time-stamped photo series of a device handoff — collection, transport, intake — with the transport photo missing',
    'Whiteboard diagram of a device\'s travel from IT desk to recycling facility with one leg unlabeled',
    'Close-up of a compliance form with "DATE RECEIVED" filled and "DATE COLLECTED BY" blank',
  ],
  'compliance-gaps': [
    'Compliance checklist with three items — destruction method, serial records, chain of custody — all unchecked',
    'Auditor\'s hand pointing to a blank field in a device disposition log',
    'Filing cabinet labeled "IT DISPOSAL RECORDS" with the drawer open and empty',
    'Side-by-side comparison of a compliant device record vs. an informal disposal receipt',
    'Calendar on the wall with "AUDIT DATE" circled in red next to a desk with unsorted retired devices',
  ],
  'e-waste-mismanagement': [
    'Close-up of a laptop motherboard with chemical element labels for lead, mercury, and cadmium overlaid',
    'Dumpster with old monitors and keyboards inside, EPA violation penalty graphic overlaid',
    'R2 certification seal next to an uncertified vendor\'s logo — no certification listed',
    'Landfill site aerial with "2% of volume / 70% of toxic waste" text graphic',
    'Worker in proper PPE processing electronics at a certified facility vs. informal disassembly setting',
  ],
  'device-wiping-assumptions': [
    'Terminal window showing "FACTORY RESET COMPLETE" with "DATA STILL RECOVERABLE" appearing below',
    'Forensic software screen showing file recovery progress bar on a "wiped" drive',
    'NIST 800-88 standard document page with a checkmark next to enterprise method requirements and X next to factory reset',
    'IT technician running a wipe utility alongside text: "60%+ forensic recovery rate from factory-reset devices"',
    'HDD and SSD side by side with different sanitization requirement labels — showing they need different methods',
  ],
  'asset-value-recovery': [
    '3-year-old enterprise laptop with "$420 SECONDARY MARKET VALUE" label next to recycling bin with "$0" label',
    'Bar chart showing secondary market value decline by quarter from purchase date',
    'Storage room of retired devices with a running cost counter overlaid',
    'Device refresh cycle timeline showing the value recovery window closing month by month',
    'Side-by-side: fleet of devices routed to recovery program generating revenue vs. same fleet routed to recycling',
  ],
  'storage-cost-buildup': [
    'Storage room shelf of labeled retired devices with "$100/device/month" price tag visible on each',
    'Running cost counter on screen as more retired devices are added to a storage pile',
    'Facilities budget line item showing "IT storage overhead" rising month over month',
    'Calendar marked with device retirement date and disposition date — gap highlighted as cost period',
    'Scale with "PENDING DISPOSITION DEVICES" on one side and "$120,000/year" on the other',
  ],
  'multi-location-disposal': [
    'Map of office locations with different colored pins representing different disposal vendors',
    'Compliance documentation grid — rows for each location, columns for each requirement — with multiple red cells',
    'Stacked file folders for eight locations with only two labeled "COMPLIANT DOCUMENTATION"',
    'Audit scope diagram expanding from one flagged location to cover an entire organization',
    'Side-by-side: centralized vendor documentation set covering all locations vs. fragmented multi-vendor records',
  ],
  'reverse-logistics-complexity': [
    'Damaged device in transit packaging with "DOCUMENTATION GAP" and "VALUE LOST" labels',
    'Flowchart showing device handoff stages with two stages missing documentation markers',
    'Freight carrier pickup of unlabeled boxes of devices — no intake documentation visible',
    'Split screen: ITAD logistics with serialized manifests vs. general freight with standard packing slip',
    'Office relocation scene with devices stacked informally, awaiting pickup with no tracking visible',
  ],
  'informal-disposal-risk': [
    'Consumer electronics drop-off bin with a business laptop going into it — "NOT HIPAA COMPLIANT" label',
    'Retail trade-in kiosk with a business laptop being traded and "NO DESTRUCTION CERT ISSUED" visible',
    'Employee carrying a box of old devices toward a door, no documentation in hand',
    'Compliance audit checklist — "chain of custody," "destruction certificate," "serialization record" — all unchecked',
    'Side-by-side: consumer recycling receipt vs. enterprise ITAD destruction certificate showing what each documents',
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
  `Visit ${COMPANY.website} to learn how Full Circle Electronics handles IT asset disposition.`,
]

// ---------------------------------------------------------------------------
// REPURPOSING SUGGESTIONS
// ---------------------------------------------------------------------------

const REPURPOSING: string[] = [
  'Convert carousel slides into a LinkedIn post with the same hook line and a link to the full content',
  'Use the caption as the foundation for a short YouTube video script covering the same problem',
  'Pull the stat from slide 3 into a standalone Twitter post with a direct question to the audience',
  'Adapt the visual hook and on-screen text into a Facebook educational post with a discussion question',
  'Use the suggested visuals list as a shot list for a 30-second facility walkthrough reel',
]

// ---------------------------------------------------------------------------
// IMPROVEMENT SUGGESTIONS — 3 sets of 3 per problem
// ---------------------------------------------------------------------------

const IMPROVEMENT_SUGGESTIONS: Record<string, string[][]> = {
  'data-exposure-risk': [
    [
      'Add a specific industry example — healthcare or financial services — to make the HIPAA penalty stat more concrete for regulated-industry audiences',
      'Include a before/after comparison showing what a compliant destruction program looks like vs. a typical informal one',
      'Shorten the caption opening paragraph to one or two sentences — the hook carries more weight when it is not immediately followed by dense context',
    ],
    [
      'Test a version of the visual hook that names the device type specifically — "That MacBook Pro is not retired hardware. It is unverified data." — for higher specificity',
      'Add a slide showing the forensic recovery tool interface to make the abstract risk concrete and visual',
      'Reference a specific compliance framework in the caption to signal relevance to regulated industries without requiring readers to self-identify',
    ],
    [
      'Consider a contrarian angle for the carousel hook: "Your IT team says the data is gone. Forensics says otherwise." — stronger tension than a statement of risk',
      'Add a cost slide that shows the per-device math rather than the aggregate breach cost — the per-device number is smaller and therefore more actionable for readers managing device programs',
      'End the caption with a specific question rather than a generic CTA — "How does your current retirement program document data destruction?" — to drive comment engagement',
    ],
  ],
  'chain-of-custody-failures': [
    [
      'Visualize the gap: a diagram showing a device\'s travel from IT desk to final disposition with one leg of the journey unlabeled makes the "missing link" more tangible than text alone',
      'Add a specific regulatory framework to the caption — HIPAA, SOX, or FERPA — to anchor the compliance language to a familiar standard',
      'Shorten slide 2 — the problem statement is running long for a visual medium; cut to one or two sentences maximum',
    ],
    [
      'Test a version of the visual hook that uses a number: "3–7 undocumented handoffs before final disposition. Each one is a compliance gap." — specific numbers anchor abstract risk',
      'Add an "ask yourself" slide to the carousel: "Can you produce signed chain-of-custody documentation for every device your organization retired in the past three years?" — invites self-audit',
      'The caption third paragraph could be split into two shorter paragraphs for readability on mobile',
    ],
    [
      'Consider a version of slide 5 (the mistake) that uses a direct quote format: "We use a reputable vendor." — What that does not prove. — creates stronger contrast between assumption and compliance reality',
      'Add the average number of undocumented handoffs in the visual hook or on-screen text — it is a more surprising number than most audiences expect',
      'Test the caption with a stronger opening line — the current version is accurate but starts with context rather than tension; try leading with the consequence',
    ],
  ],
  'compliance-gaps': [
    [
      'Add an "auditor\'s checklist" visual — three items, all unchecked — as the hook image; the visual communicates the gap faster than a text hook',
      'Name the specific frameworks in slide 2 rather than listing them generically — audiences self-select when they recognize their own regulatory environment',
      'The caption fourth paragraph is strong but buried; consider moving it closer to the opening to lead with consequence',
    ],
    [
      'Test a carousel variant that opens with a mock audit request: "Produce chain-of-custody and data destruction documentation for all retired devices in the past three years." — using the actual audit language as the hook creates immediate recognition',
      'Add a per-device penalty calculation to the cost slide using a realistic device retirement volume — the per-device math is more actionable than the aggregate penalty',
      'Shorten the on-screen text blocks — they are currently running long for a carousel overlay; cut each to four lines maximum',
    ],
    [
      'The "absence of documentation is treated as evidence of noncompliance" point is the strongest in the series — consider leading with it rather than using it in the middle of the carousel',
      'Add a compliance framework checklist slide after the cost slide — HIPAA, SOX, FERPA, GLBA — letting audiences identify which ones apply to their organization without being told',
      'Consider a version of the caption that opens with a hypothetical: "Imagine receiving an audit request today for device disposition documentation from the past three years." — experiential framing increases engagement',
    ],
  ],
  'e-waste-mismanagement': [
    [
      'Use a visual showing the chemical composition of a laptop motherboard — real material labels increase the perceived credibility of the liability claim',
      'Add the R2 and e-Stewards certification logos to the fix slide — visual proof of what "certified" looks like is more actionable than a text description',
      'The caption second paragraph makes the strongest point about liability attachment — consider elevating it to paragraph one',
    ],
    [
      'Test a version of the hook that uses the ratio directly: "2% of landfill. 70% of toxic waste. Which side are your devices on?" — the question format drives engagement',
      'Add a downstream material flow example to the fix slide — "your device goes here, these materials go to these certified facilities" — makes the certification benefit concrete',
      'Shorten the on-screen text blocks to match the visual medium — the current versions are accurate but too long for single-screen text overlays',
    ],
    [
      'Consider adding the EPA penalty range to the visual hook frame as a secondary text element — the number ($70,000/day) is visceral enough to stop a scroll',
      'A slide showing the difference between consumer recycling documentation and enterprise compliance documentation would make the "they are not the same" point visually rather than textually',
      'The caption closing CTA would benefit from a specific question: "When did you last verify your e-waste vendor\'s current certification status?" — drives comment engagement',
    ],
  ],
  'device-wiping-assumptions': [
    [
      'A visual of a forensic recovery tool showing file recovery progress on a "wiped" drive is the single strongest visual for this problem — prioritize acquiring or creating it',
      'Add NIST 800-88 to the on-screen text blocks — naming the specific standard signals technical credibility to IT security audiences',
      'The SSD vs. HDD sanitization difference is a genuinely surprising nuance for most audiences — consider making it the focus of a variant carousel rather than a supporting point',
    ],
    [
      'Test a carousel hook that leads with the recovery rate: "60% of factory-reset devices tested forensically: data recovered." — the number is more arresting than a statement about factory reset behavior',
      'Add a slide showing what a NIST 800-88-compliant destruction certificate contains vs. a standard IT wipe log — the comparison makes the compliance gap tangible',
      'The caption opening is strong but technical — test a version that opens with a scenario: "The device left your building last quarter. A forensic tool ran on it last week. Here is what it found."',
    ],
    [
      'Consider a version of the on-screen text that uses the 25–40% number as the hook frame: "25–40% of enterprise-wiped devices contain recoverable data. Which ones are yours?" — makes the statistic personal',
      'Add a media-type-specific sanitization guide as a slide 6 variant — concrete method differences between HDD and SSD are actionable for IT audiences and increase share rate',
      'End the caption with a direct question: "What standard does your current IT wiping process meet — and how would you prove it in an audit?" — targets the self-aware IT audience most likely to engage',
    ],
  ],
  'asset-value-recovery': [
    [
      'Add a per-device dollar example to slide 3 using a real laptop model — "$1,200 Dell Latitude, 3 years old, secondary market value: $360–$480" — makes the abstract percentage concrete',
      'Test a hook that leads with the math: "25–40% of original purchase price. 300 laptops. $90,000–$144,000 walking out the door." — financial specificity stops a scroll',
      'The caption fourth paragraph is the strongest financial case — move it to paragraph two to lead with the upside rather than burying it',
    ],
    [
      'A comparison image — device going into recycling bin vs. device going into a secondary market refurbishment process — communicates the value split visually without requiring text',
      'Add quarterly value decline data to a visual chart slide — a simple bar graph showing value at retirement by age (1yr, 2yr, 3yr, 4yr) makes the timing argument visual',
      'The caption could be tightened by removing the hedging qualifiers — "typically," "often" — the data is strong enough to state directly',
    ],
    [
      'Consider a contrarian angle for this problem: "Most IT teams think asset recovery is not worth the effort. Here is what that assumption costs." — leads with the opposing assumption rather than the solution',
      'A running cost counter graphic — showing value loss per day a device stays in storage — is a high-engagement visual format for this problem on Instagram Reels',
      'Add a question to the caption closing that targets operations or finance leaders specifically: "Is secondary market recovery value in your IT refresh budget calculation?" — self-selection drives qualified engagement',
    ],
  ],
  'storage-cost-buildup': [
    [
      'A visual of a storage shelf with individual $100/month price tags on each device is more arresting than a cost statistic in text — prioritize this image',
      'Add a comparison slide showing the monthly storage cost against the monthly depreciation of the same devices — seeing both costs simultaneously makes the urgency clear',
      'The caption second paragraph buries the insight about accounting separation — elevate it to paragraph one, as it is the most counterintuitive point',
    ],
    [
      'Test a hook that uses an employee\'s perspective: "IT says the storage closet is \'a future problem.\' Facilities is billing $8,000/month to store it." — the internal friction angle is relatable and shareable',
      'Add a "pending disposition SLA" recommendation to the fix slide with a specific number (30 days) — specific, implementable recommendations outperform general "do better" advice',
      'The caption could use a stronger closing question: "What is the pending disposition cost in your organization\'s last fiscal year?" — drives self-audit behavior in the comments',
    ],
    [
      'A three-dimension cost breakdown visual — storage cost, value depreciation, and data liability — displayed simultaneously makes the "compounding cost" argument more concrete than text paragraphs',
      'Consider a version of slide 5 (the mistake) that frames it as a budgeting issue: "Storage cost is invisible when IT makes the decision and Facilities absorbs the cost." — the system problem is more interesting than the individual mistake',
      'Add actual cost math to the caption using a mid-size organization example — 1,000-device fleet, 15% pending disposition, $100/device/month — the calculated annual cost makes readers do the math for their own organization',
    ],
  ],
  'multi-location-disposal': [
    [
      'A map visualization with different colored pins for different disposal vendors — and no single color that covers all locations — communicates the fragmentation problem faster than any text',
      'Add a "what one non-compliant location costs the whole organization" example — a specific scenario makes the cascading audit risk tangible',
      'The caption third paragraph about headquarters vs. satellite office compliance is the strongest point — move it earlier in the caption sequence',
    ],
    [
      'Test a hook using the failure rate: "65–80% of multi-location IT disposal programs cannot produce compliant documentation across all sites. Is yours in the 20%?" — the direct question creates self-identification',
      'Add a compliance documentation comparison slide: centralized single-vendor record covering 10 locations vs. fragmented 6-vendor records covering the same locations — visual comparison makes the case for centralization',
      'Shorten slide 3 — it is covering two different data points; choose the stronger one for the slide and move the other to the caption',
    ],
    [
      'Consider a "location audit" angle for the carousel: walk through what a compliance auditor would look at, location by location — it puts the audience in the auditor\'s seat, which increases engagement',
      'Add the administrative cost comparison — managing 6 vendors vs. 1 centralized vendor — to the fix slide to make the business case for centralization, not just the compliance case',
      'The caption could close with a self-audit question: "How many disposal vendors does your organization use across all locations — and can you produce a unified chain-of-custody record that covers all of them?" — drives high-quality engagement',
    ],
  ],
  'reverse-logistics-complexity': [
    [
      'A side-by-side image — purpose-built ITAD packaging with serialized labels vs. a generic cardboard box with a standard packing slip — communicates the documentation gap visually',
      'Add a "common large retirement event" example to slide 2 — office relocation, facility closure — to anchor the abstract logistics problem in a recognizable scenario',
      'The caption could open stronger — the current version is accurate but starts with a definition rather than a problem; lead with the consequence of getting it wrong',
    ],
    [
      'Test a hook that uses a specific failure scenario: "80 devices picked up. Chain-of-custody documentation on 43." — the gap between the two numbers is more arresting than a percentage',
      'Add a checklist slide showing what proper ITAD reverse logistics documentation includes — manifests, serialization, signed transfer records, facility intake confirmation — giving audiences a standard to compare against',
      'The caption second paragraph is strong — consider using it as the caption opener to lead with the structural problem rather than the definition',
    ],
    [
      'A flowchart showing the reverse logistics chain with specific handoff points labeled — and the points where documentation typically breaks down highlighted — would be the most useful visual for this problem',
      'Consider a caption variant that opens with the facility closure scenario: "Your lease ends in 60 days. 200 devices need to be retired. Here is where most organizations lose the compliance record." — specific scenario drives engagement',
      'Add a capacity overflow example to the cost slide — specific numbers about what happens to documentation quality when volume exceeds in-house logistics capacity — to make the 70% capacity exceedance data point more concrete',
    ],
  ],
  'informal-disposal-risk': [
    [
      'The consumer drop-off bin image with a business laptop going into it is the single strongest visual for this problem — it makes an abstract compliance risk immediately recognizable and slightly uncomfortable',
      'Add a direct comparison of what a consumer recycling receipt documents vs. what an enterprise destruction certificate documents — the gap between the two is the point',
      'The caption fourth paragraph contains the strongest sentence in the series — "the absence of documentation is treated as a compliance failure, not a gray area" — consider moving it to paragraph one',
    ],
    [
      'Test a hook that uses the audit question directly: "Produce chain-of-custody and data destruction documentation for all retired devices in the past three years." — the mock audit demand creates immediate recognition',
      'Add a "what informal disposal produces" vs. "what compliance requires" comparison slide — specific documentation comparison makes the gap visual rather than described',
      'Shorten the caption — the current version is thorough but longer than necessary for Instagram; the key points can be made in three tight paragraphs',
    ],
    [
      'A contrarian angle that acknowledges the practicality of informal disposal before addressing the risk would resonate with SMB audiences: "Informal disposal works great. Until it does not. Here is when it stops working." — credible acknowledgment of current practice increases trust',
      'Add the 35–45% SMB statistic to the on-screen text rather than the caption — it is the number that creates category recognition, and on-screen text gets more attention than caption text',
      'The caption could close with a self-assessment question: "Can your organization produce device-level disposition documentation for every device retired in the past 24 months?" — drives comment engagement from organizations that already know the answer is no',
    ],
  ],
}

// ---------------------------------------------------------------------------
// generateInstagram
// ---------------------------------------------------------------------------

export function generateInstagram(inputs: InstagramInputs, seed = 0): InstagramOutput {
  const prob = inputs.problem
  const idx = seed % 3
  const ctaIdx = seed % CTAS.length
  const qualityScore = scoreContent(inputs, true, true, true, 120)

  // Reference PROBLEM_DATA to satisfy the import — data is available for future
  // content enrichment or dynamic stat injection
  void PROBLEM_DATA

  return {
    platform: 'instagram',
    visualHook: VISUAL_HOOKS[prob]?.[idx] ?? 'Retired devices are not just old hardware. They are unresolved data risk.',
    onScreenText: ON_SCREEN_TEXT[prob]?.[idx] ?? 'RETIRED DEVICES\nAre not clutter.\nThey are data exposure.',
    scriptOrSlides: CAROUSEL_SLIDES[prob]?.[idx] ?? [
      'SLIDE 1 — Hook: Retired IT is not a storage problem. It is a compliance problem.',
      'SLIDE 2 — The problem: Devices without documented disposition create permanent compliance gaps.',
      'SLIDE 3 — The data: Most informal programs cannot satisfy a compliance audit request.',
      'SLIDE 4 — The cost: Regulatory penalties and legal liability from improper disposition average $500,000–$2 million per event.',
      'SLIDE 5 — The mistake: Treating device retirement as an IT logistics task rather than a compliance obligation.',
      'SLIDE 6 — The fix: A formal ITAD program with device-level documentation from collection through destruction.',
      `SLIDE 7 — CTA: Follow ${COMPANY.name} for more ITAD, data security, and electronics recycling insights.`,
    ],
    caption: CAPTIONS[prob]?.[idx] ?? `Most organizations treat IT device retirement as a logistics task. It is a data governance task.\n\nWithout documented chain-of-custody and verified data destruction, retired devices carry the same exposure as active systems — and create the same regulatory liability.\n\nFormal ITAD programs close this gap before it becomes a compliance event.\n\nFollow ${COMPANY.name} for more ITAD, data security, and electronics recycling insights.`,
    cta: CTAS[ctaIdx],
    suggestedVisuals: SUGGESTED_VISUALS[prob] ?? [
      'Stack of retired devices in a storage room with no documentation visible',
      'Compliance checklist with key fields blank',
      'Split screen: certified ITAD process vs. informal disposal',
      'Auditor reviewing device disposition records',
      'Before/after: unmanaged device retirement vs. formal ITAD program output',
    ],
    repurposingSuggestions: REPURPOSING.slice(0, 4),
    qualityScore,
    improvementSuggestions: IMPROVEMENT_SUGGESTIONS[prob]?.[idx] ?? [
      'Add a specific industry example to anchor the compliance risk to a recognizable regulatory framework',
      'Shorten on-screen text blocks to four lines maximum for mobile readability',
      'Close the caption with a direct self-audit question to drive comment engagement',
    ],
  }
}
