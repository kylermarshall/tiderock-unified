import type { LinkedInInputs, LinkedInOutput, PostIdea, CalendarEntry } from '../types'
import { PROBLEM_DATA, PROBLEM_LABELS } from '../lib/companyProfile'
import { scoreContent } from '../lib/scoring'

const HOOKS: Record<string, string[]> = {
  'energy-cost': [
    "Most facilities don't lose money on lighting at installation. They lose it over the next 5 years.",
    "Your lighting bill isn't high because electricity is expensive. It's high because the system was designed wrong.",
    "Cutting your lighting budget at purchase is one of the most expensive decisions a facility manager can make.",
  ],
  'downtime': [
    "Your lighting system isn't expensive because of electricity. It's expensive because it keeps failing.",
    "Lighting failures don't respect production schedules. Aging systems don't either.",
    "Every unplanned lighting repair costs 2–3x what a scheduled one would. Most facilities learn this the hard way.",
  ],
  'maintenance-costs': [
    "The fixture cost is the one line on the invoice. The labor cost doesn't show up until year two.",
    "70% of lighting maintenance cost is labor. Most procurement decisions focus only on the other 30%.",
    "High-bay fixture replacement isn't just expensive. It requires equipment, coordination, and 4–6 hours of downtime per call.",
  ],
  'fixture-lifespan': [
    "A fixture rated for 50,000 hours is a projection, not a promise.",
    "Budget LEDs don't fail slowly. They fail early — usually around hour 22,000.",
    "Thermal management determines fixture lifespan. Most spec sheets don't tell you how the fixture performs under real load.",
  ],
  'facility-safety': [
    "Underlit facilities aren't just inefficient. They're an OSHA exposure waiting to happen.",
    "Warehouse accident rates climb 20% when lighting falls below standard. That's not a theory — it's data.",
    "Facility safety incidents tied to poor lighting cost $50,000–$500,000 each. Most are preventable.",
  ],
  'warehouse-visibility': [
    "Returns, re-picks, and mis-ships often trace back to the environment — not the employee.",
    "Picking accuracy drops 15–30% in facilities with inconsistent lighting. The error rate is a lighting problem.",
    "Shadow zones aren't just uncomfortable. They're where picking errors happen.",
  ],
  'labor-inefficiency': [
    "Lighting affects human output. That cost never appears on a lighting invoice.",
    "Workers in properly lit environments are 15–20% more productive. Most facilities absorb the opposite for free.",
    "Eye fatigue after four hours under poor lighting reduces cognitive performance by 20%. That's a shift-long tax on output.",
  ],
  'total-cost-ownership': [
    "The purchase order looks good. The P&L tells a different story after year three.",
    "Most companies buy lighting based on fixture price. That's like buying trucks based only on tire cost.",
    "60% of total lighting cost comes after installation. Most procurement decisions treat it like a one-time expense.",
  ],
  'retrofitting': [
    "Retrofitting looks like a cost reduction. Without proper engineering, it becomes a recurring expense.",
    "50% of LED retrofit projects miss their energy savings projections. Driver mismatch is usually why.",
    "A cheap retrofit doesn't fix the system. It delays the real problem for 18 months.",
  ],
  'operational-disruption': [
    "The disruption is never the fixture. It's the operation that stops waiting for it to be fixed.",
    "Facilities with aging lighting systems average 6–8 hours of unplanned downtime per year. That's not random — it's predictable.",
    "Emergency lighting repairs cost 2–3x more than scheduled maintenance. Yet most facilities wait until failure.",
  ],
}

const BODIES: Record<string, string[]> = {
  'energy-cost': [
    `Industrial facilities are running LED fixtures — but many are still running them wrong.\n\n${PROBLEM_DATA['energy-cost'].stat1}.\n\nThe fixture isn't the variable. The specification is.\n\nWhen you mismatch fixture output to application, you pay for lumens you don't use. You pay for driver losses your system isn't designed to absorb. You pay for zones that were never modeled.\n\n${PROBLEM_DATA['energy-cost'].stat2}.\n\nMost energy audits reveal this in year two or three — after the money is already out the door.\n\nThe assumption most facilities make: "We switched to LED, so we're good." That assumption costs $18K–$45K per year per facility.`,
    `Switching to LED doesn't guarantee savings. Switching to the right LED system does.\n\n${PROBLEM_DATA['energy-cost'].stat1}.\n\nThe difference between a well-designed system and a poorly specified one is often $20,000–$40,000 per year — per facility.\n\n${PROBLEM_DATA['energy-cost'].stat3}.\n\nFacility managers often discover this the hard way — during a utility rebate review when the numbers don't add up.\n\nThe fix isn't more efficient fixtures. It's fixtures spec'd to the actual photometric requirements of each zone.\n\nThat's engineering, not purchasing.`,
    `The lighting line on the P&L looks fine. Until someone actually audits it.\n\n${PROBLEM_DATA['energy-cost'].stat2}.\n\nThat's not a utility problem. That's a specification problem.\n\n${PROBLEM_DATA['energy-cost'].stat1}.\n\nMost purchasing decisions are made on per-fixture price. Most energy losses happen from system-level mismatches that no one modeled.\n\nThe wasted lumens, the oversized drivers, the fixtures running at 80% load in a zone that needs 40% — none of it shows up until the bill arrives.\n\nAnd by then, the decision is three years old.`,
  ],
  'downtime': [
    `Lighting failures in production environments don't cost what the fixture costs.\n\nThey cost what the operation costs while it's stopped.\n\n${PROBLEM_DATA['downtime'].stat1}.\n\nThat's the number most maintenance managers never think about until it happens.\n\n${PROBLEM_DATA['downtime'].stat2}.\n\n4–6 hours per incident. In a high-bay environment. With a lift. With a crew.\n\n${PROBLEM_DATA['downtime'].stat3}.\n\nAging systems don't fail randomly. They fail in clusters. And the second failure usually happens within 90 days of the first.\n\nThe cost of "waiting to see if it gets worse" is almost always worse than the cost of acting early.`,
    `Most lighting downtime isn't caused by a bad product. It's caused by a product that was never right for the environment.\n\n${PROBLEM_DATA['downtime'].stat3}.\n\nThat 3x figure isn't random. Thermal cycles, vibration, humidity — over time, an underspecified fixture doesn't degrade gradually. It fails in bursts.\n\n${PROBLEM_DATA['downtime'].stat1}.\n\nThe operation stops. The maintenance call goes out. The lift gets scheduled. And the lost production hours accumulate.\n\n${PROBLEM_DATA['downtime'].stat2}.\n\nFour to six hours, per incident, in a live operation. Multiply that by six incidents per year. That's 24–36 hours of operational exposure from lighting alone.`,
    `Lighting system downtime is almost always predictable. It's almost never predicted.\n\n${PROBLEM_DATA['downtime'].stat3}.\n\nWhen maintenance calls cluster — three in one month, then five the next — that's not bad luck. That's end-of-life behavior.\n\nThe problem is that most facilities track work orders by event, not by pattern.\n\n${PROBLEM_DATA['downtime'].stat2}.\n\nSix hours per call. In a zone that feeds a line. With a crew that can't run partial.\n\n${PROBLEM_DATA['downtime'].stat1}.\n\nThe fixture that fails is never the expensive part. The stopped operation is.`,
  ],
  'maintenance-costs': [
    `Facilities consistently underestimate lighting maintenance cost — because they're measuring the wrong thing.\n\n${PROBLEM_DATA['maintenance-costs'].stat1}.\n\nThe fixture is the line on the invoice. The labor is the real cost.\n\n${PROBLEM_DATA['maintenance-costs'].stat2}.\n\n$150–$400 per fixture. Before you account for the lift rental, the crew coordination, and the operational window required.\n\n${PROBLEM_DATA['maintenance-costs'].stat3}.\n\nWhen we audit a facility's actual lighting maintenance spend vs. their budgeted number, the gap is usually 40–60%.\n\nThat gap isn't accounting error. It's the cost of fixtures that weren't specified for the environment they're running in.`,
    `The procurement team sees one number. The operations team lives with a different one.\n\n${PROBLEM_DATA['maintenance-costs'].stat2}.\n\nThat's just the labor. That's not the lift. Not the scheduling disruption. Not the partial-shift labor overhead during the maintenance window.\n\n${PROBLEM_DATA['maintenance-costs'].stat1}.\n\n70% labor. Yet most lighting procurement decisions are made based on fixture price — the other 30%.\n\n${PROBLEM_DATA['maintenance-costs'].stat3}.\n\nFacilities that underestimate by 40–60% aren't being careless. They're using the wrong measurement. Per-fixture cost instead of total system cost over time.`,
    `High-bay maintenance is expensive because it's operationally complex — not because fixtures are pricey.\n\n${PROBLEM_DATA['maintenance-costs'].stat2}.\n\nThat's the labor floor. Before the lift rental. Before the production window. Before the overtime premium when maintenance runs long.\n\n${PROBLEM_DATA['maintenance-costs'].stat1}.\n\nThe fixture you bought for $80 costs $230–$480 to replace in the field.\n\n${PROBLEM_DATA['maintenance-costs'].stat3}.\n\nThis isn't a maintenance problem. It's a specification problem that shows up three years after the purchasing decision.`,
  ],
  'fixture-lifespan': [
    `The 50,000-hour rating on a budget LED fixture is a lab number. Not a field number.\n\n${PROBLEM_DATA['fixture-lifespan'].stat1}.\n\nThe lab test assumes controlled temperature. Consistent voltage. No vibration. No thermal cycling.\n\nYour facility has none of those things.\n\n${PROBLEM_DATA['fixture-lifespan'].stat2}.\n\nWhen the thermal management fails — and in undersized drivers under real load, it will — the lumen output drops first. Then the driver goes. Then you're scheduling a replacement at 22,000 hours instead of 50,000.\n\n${PROBLEM_DATA['fixture-lifespan'].stat3}.\n\nThat's a 50% lifespan reduction. Two replacement cycles where one was budgeted.`,
    `Budget LED fixtures fail early. Not because they're poorly built — because they're built for the wrong environment.\n\n${PROBLEM_DATA['fixture-lifespan'].stat2}.\n\nOver 60% of premature failures come from thermal management — not the LED chip itself.\n\nThe chip is fine. The driver is undersized. The housing doesn't dissipate heat fast enough under sustained load.\n\n${PROBLEM_DATA['fixture-lifespan'].stat1}.\n\nA fixture rated at 50,000 hours running in a 90°F bay at 80% load average will not hit 50,000 hours. The data says 20,000–25,000.\n\n${PROBLEM_DATA['fixture-lifespan'].stat3}.\n\nThat's not a product defect claim. That's physics.`,
    `Most lighting specs compare lumen output and price. Almost none compare thermal performance.\n\n${PROBLEM_DATA['fixture-lifespan'].stat3}.\n\nDriver mismatch doesn't announce itself at installation. It shows up at hour 18,000 when the lumen output starts dropping — and at hour 22,000 when the first driver fails.\n\n${PROBLEM_DATA['fixture-lifespan'].stat2}.\n\nThermal management failure accounts for the majority of early LED deaths. And it's almost always traceable to a purchasing decision, not a manufacturing defect.\n\n${PROBLEM_DATA['fixture-lifespan'].stat1}.\n\nIf you're planning one replacement cycle over 10 years and you're getting two, you've doubled your maintenance cost from a decision made at procurement.`,
  ],
  'facility-safety': [
    `Lighting compliance isn't a checkbox exercise. It's a cost exposure calculation.\n\n${PROBLEM_DATA['facility-safety'].stat1}.\n\nMany aging systems in active facilities are operating below that standard — not because of neglect, but because lumen output degrades over time and nobody's re-measured.\n\n${PROBLEM_DATA['facility-safety'].stat2}.\n\nA 20% increase in accident rate is not an acceptable margin. It's a workers' comp exposure waiting to materialize.\n\n${PROBLEM_DATA['facility-safety'].stat3}.\n\nThe $50,000 floor assumes a minor incident. A serious injury in a documented underlit facility is a different conversation — and one that happens in front of a compliance officer, not a lighting vendor.`,
    `OSHA lighting standards exist because the data is clear: poor lighting causes accidents.\n\n${PROBLEM_DATA['facility-safety'].stat2}.\n\nA 20% higher accident rate in facilities with inadequate lighting isn't a correlation. It's a documented risk factor.\n\n${PROBLEM_DATA['facility-safety'].stat1}.\n\nAging systems degrade. Footcandle levels that met code at installation often fall short by year five.\n\nMost facilities don't measure. They assume.\n\n${PROBLEM_DATA['facility-safety'].stat3}.\n\nThe $50,000–$500,000 range per incident covers liability, OSHA fines, lost productivity, and workers' comp claims. The cost of a photometric audit is a rounding error by comparison.`,
    `The liability exposure from poor lighting doesn't require a catastrophic failure. It just requires a pattern.\n\n${PROBLEM_DATA['facility-safety'].stat3}.\n\nOne incident. Properly documented. In a facility where lighting levels were never measured after installation.\n\n${PROBLEM_DATA['facility-safety'].stat1}.\n\nIf your assembly areas are below 30 foot-candles and you haven't measured, you don't know. And "we haven't had any incidents" is not a measurement.\n\n${PROBLEM_DATA['facility-safety'].stat2}.\n\nThe 20% accident rate increase in facilities with poor lighting is a published figure. Plaintiff attorneys know it. OSHA inspectors know it. Most facility managers don't.`,
  ],
  'warehouse-visibility': [
    `Picking errors, returns, and mis-ships are usually blamed on process or personnel. Often, they're a lighting problem.\n\n${PROBLEM_DATA['warehouse-visibility'].stat1}.\n\nInconsistent lighting across zones creates inconsistent performance. Workers aren't slower in one zone because they're less capable — they're slower because they can see less clearly.\n\n${PROBLEM_DATA['warehouse-visibility'].stat2}.\n\nShadow zones from poor fixture placement generate up to 25% more picking errors.\n\nThat's not a training issue. That's a photometric design issue.\n\n${PROBLEM_DATA['warehouse-visibility'].stat3}.\n\nBelow CRI 70, barcode and label identification is measurably slower. Multiply 25% slower scanning by 10,000 picks per day and the throughput impact is significant.`,
    `The picking error rate is a facility performance metric. It's also a lighting metric.\n\n${PROBLEM_DATA['warehouse-visibility'].stat1}.\n\nWhen lighting is inconsistent across zones, accuracy drops — predictably. The workers in the poorly-lit zone aren't the problem.\n\n${PROBLEM_DATA['warehouse-visibility'].stat3}.\n\nColor rendering below CRI 70 slows label identification by 25% on average. That's every scan, every pick, every shift.\n\n${PROBLEM_DATA['warehouse-visibility'].stat2}.\n\nShadow zones from poor fixture placement concentrate errors in specific areas of the floor. If you're tracking your error rate by zone, you'll see it. Most facilities track only totals.`,
    `When you trace warehouse mis-ships back to origin zone, a pattern emerges.\n\n${PROBLEM_DATA['warehouse-visibility'].stat2}.\n\nUp to 25% more picking errors in shadow zones. It's not the picker — it's the environment.\n\n${PROBLEM_DATA['warehouse-visibility'].stat1}.\n\nA 15–30% drop in picking accuracy from lighting inconsistency is measurable. It's also fixable without changing headcount or adding training.\n\n${PROBLEM_DATA['warehouse-visibility'].stat3}.\n\nCRI matters in distribution environments. Below CRI 70, your team is reading labels slower — every label, every shift. The throughput tax is real and it compounds across the operation.`,
  ],
  'labor-inefficiency': [
    `The cost of poor lighting shows up on the labor line — not the lighting invoice.\n\n${PROBLEM_DATA['labor-inefficiency'].stat1}.\n\nA 15–20% productivity difference between properly lit and poorly lit environments isn't marginal. On a 50-person operation, that's 7–10 full-time equivalent hours of output per shift.\n\n${PROBLEM_DATA['labor-inefficiency'].stat2}.\n\nCognitive performance drops 20% after four hours under poor lighting. That's not a comfort issue. That's a throughput issue.\n\n${PROBLEM_DATA['labor-inefficiency'].stat3}.\n\nFacilities with calibrated lighting report fewer eye strain complaints, lower absenteeism, and measurably better sustained task performance. The investment in the system pays through the labor line.`,
    `Most operations measure labor productivity. Almost none measure how lighting affects it.\n\n${PROBLEM_DATA['labor-inefficiency'].stat2}.\n\nAfter four hours under poor lighting, cognitive performance drops 20%. For a facility running two full shifts, that's a degraded second half of every shift — every day.\n\n${PROBLEM_DATA['labor-inefficiency'].stat1}.\n\nA 15–20% productivity gap between properly and poorly lit environments is consistent across published research. Most facilities absorb this tax invisibly.\n\n${PROBLEM_DATA['labor-inefficiency'].stat3}.\n\nReducing eye strain complaints is a symptom metric. The real output is sustained performance — picks per hour, error rates, throughput. Lighting is a lever on all of it.`,
    `Lighting is an environmental input. It affects human output. Most facility P&Ls never connect the two.\n\n${PROBLEM_DATA['labor-inefficiency'].stat3}.\n\nFewer complaints is one measure. The deeper measure is productivity — and it's measurable with a before-after comparison.\n\n${PROBLEM_DATA['labor-inefficiency'].stat2}.\n\nA 20% cognitive performance drop after four hours under poor lighting is not a small number. On a 10-hour shift, your team is running at reduced capacity for six hours.\n\n${PROBLEM_DATA['labor-inefficiency'].stat1}.\n\nThe lighting invoice is fixed. The labor cost it affects is a daily variable. Closing a 15–20% productivity gap with a one-time system upgrade has a measurable payback.`,
  ],
  'total-cost-ownership': [
    `Lighting procurement decisions are almost always made on first cost. The P&L shows up in years two through five.\n\n${PROBLEM_DATA['total-cost-ownership'].stat2}.\n\nThe fixture price is 40% of what the system will actually cost over its operating life.\n\n${PROBLEM_DATA['total-cost-ownership'].stat3}.\n\nMaintenance and energy represent the other 60%. Neither shows up on the purchase order.\n\n${PROBLEM_DATA['total-cost-ownership'].stat1}.\n\nA $30 fixture that totals $180 in cost over five years isn't a bargain at $30. It's an expensive decision disguised as a cheap one.\n\nThis is the conversation that happens after year three — when the maintenance calls start and the energy audit reveals the gaps.`,
    `The lowest bid on a lighting project is rarely the lowest cost.\n\n${PROBLEM_DATA['total-cost-ownership'].stat1}.\n\n$30 upfront. $180 total. That's the real math on budget fixtures in industrial applications.\n\n${PROBLEM_DATA['total-cost-ownership'].stat2}.\n\nIf first cost is 40% of total system cost, then procurement decisions based entirely on first cost are optimizing for the wrong variable.\n\n${PROBLEM_DATA['total-cost-ownership'].stat3}.\n\n60% of total lighting cost comes after installation. That 60% is what budget fixtures were never designed to minimize.`,
    `Most lighting RFPs are structured around price per fixture. Almost none include total cost of ownership.\n\n${PROBLEM_DATA['total-cost-ownership'].stat3}.\n\nMaintenance and energy — 60% of total cost — are treated as operating line items, not as outputs of a procurement decision.\n\n${PROBLEM_DATA['total-cost-ownership'].stat2}.\n\nIf you're evaluating lighting on first cost, you're evaluating 40% of the actual number.\n\n${PROBLEM_DATA['total-cost-ownership'].stat1}.\n\nThe $30 fixture vs. $80 fixture conversation looks obvious at purchase. Over five years, the $30 fixture often loses — badly. The math has been done. Most purchasing teams just haven't seen it.`,
  ],
  'retrofitting': [
    `Retrofit projects fail more often than they succeed — and almost always for the same reason.\n\n${PROBLEM_DATA['retrofitting'].stat2}.\n\n50% don't hit their energy savings targets. Not because LEDs don't work. Because the driver wasn't matched to the fixture and the fixture wasn't matched to the zone.\n\n${PROBLEM_DATA['retrofitting'].stat3}.\n\nA mismatched driver-LED combination runs at 15–25% lower efficiency from day one. The energy savings you projected never materialize.\n\n${PROBLEM_DATA['retrofitting'].stat1}.\n\n3x failure rate vs. properly engineered systems within 18 months. That's not a product quality issue. That's an engineering shortcut taken at installation.`,
    `LED retrofits are sold as a cost reduction. Many become a maintenance expense.\n\n${PROBLEM_DATA['retrofitting'].stat1}.\n\nCheap retrofit kits fail at 3x the rate of properly designed systems in the first 18 months. The warranty period ends. The failures don't.\n\n${PROBLEM_DATA['retrofitting'].stat2}.\n\nHalf of all retrofit projects never achieve their projected savings. The energy math was real. The implementation wasn't.\n\n${PROBLEM_DATA['retrofitting'].stat3}.\n\nDay-one efficiency loss from driver mismatch: 15–25%. That's before thermal degradation accelerates it further.\n\nThe project that was supposed to save $30,000 annually is saving $15,000 — and adding maintenance calls.`,
    `The retrofit decision looks straightforward. Buy LED, replace fluorescent, save money.\n\n${PROBLEM_DATA['retrofitting'].stat2}.\n\nExcept half of those projects fail to hit their savings target.\n\n${PROBLEM_DATA['retrofitting'].stat3}.\n\nMismatched driver-LED combinations lose 15–25% efficiency from the first day of operation. That gap doesn't close. It widens as the system ages.\n\n${PROBLEM_DATA['retrofitting'].stat1}.\n\n3x the failure rate inside 18 months. In facilities where maintenance windows are expensive and lift time is limited.\n\nThe fixture swap is easy. The engineering behind it is where retrofit projects fail.`,
  ],
  'operational-disruption': [
    `Facilities track maintenance events. Very few track the operational cost of each one.\n\n${PROBLEM_DATA['operational-disruption'].stat1}.\n\n6–8 hours of unplanned disruption per year from lighting failures alone.\n\n${PROBLEM_DATA['operational-disruption'].stat2}.\n\nEmergency repairs cost 2–3x more than scheduled maintenance. Every unplanned call burns the premium.\n\n${PROBLEM_DATA['operational-disruption'].stat3}.\n\nAging systems don't stabilize — they accelerate. 30% more fixtures in year two than year one. The failure rate compounds until you address the system.\n\nThe facilities that schedule proactive replacement avoid the emergency premium and control when the maintenance window happens.`,
    `Unplanned lighting maintenance has a predictable pattern. Most facilities don't predict it.\n\n${PROBLEM_DATA['operational-disruption'].stat3}.\n\nCascade failures in aging systems affect 30% more fixtures in the second year than the first. The deterioration isn't linear — it accelerates.\n\n${PROBLEM_DATA['operational-disruption'].stat1}.\n\n6–8 hours of unplanned disruption per year is the average. Facilities in the late stages of system aging can see that figure double.\n\n${PROBLEM_DATA['operational-disruption'].stat2}.\n\nEmergency vs. scheduled: 2–3x cost premium. Multiply that by 6–8 calls per year and the financial argument for proactive replacement becomes clear.`,
    `The cost of a lighting failure isn't what the repair costs. It's what stops while you're fixing it.\n\n${PROBLEM_DATA['operational-disruption'].stat2}.\n\nEmergency repairs at 2–3x cost. In a lift-required environment. During operating hours.\n\n${PROBLEM_DATA['operational-disruption'].stat1}.\n\n6–8 unplanned disruption hours per year is an average. In high-utilization facilities, that number is consistently higher.\n\n${PROBLEM_DATA['operational-disruption'].stat3}.\n\nThe second year of aging system failure is always worse than the first. 30% more fixtures, more calls, more premium-rate emergency repair spend.\n\nThe disruption compounds until the decision to replace is made. The only question is whether that decision happens on your timeline or the system's.`,
  ],
}

const BUSINESS_IMPACTS: Record<string, string> = {
  'energy-cost': `Financial exposure: ${PROBLEM_DATA['energy-cost'].cost1}. ${PROBLEM_DATA['energy-cost'].cost2}. For a 100,000 sq ft facility, that's $18,000–$45,000 annually in energy that should not exist — driven by specification decisions made at procurement, not by electricity rates. The utility bill is the symptom. The system design is the cause.`,
  'downtime': `Operational exposure: ${PROBLEM_DATA['downtime'].cost1}. ${PROBLEM_DATA['downtime'].cost2}. Each unplanned failure in an active production zone triggers a maintenance chain — crew availability, lift scheduling, parts sourcing, operational hold — that averages 4–6 hours per incident. Six incidents per year equals 24–36 hours of production exposure from lighting alone.`,
  'maintenance-costs': `Cost exposure: ${PROBLEM_DATA['maintenance-costs'].cost1}. ${PROBLEM_DATA['maintenance-costs'].cost2}. A facility running 500 high-bay fixtures on a 5-year replacement cycle is looking at $75,000–$200,000 in labor costs alone — before parts, lift rental, or production disruption. The fixtures are almost never the expensive part.`,
  'fixture-lifespan': `Lifecycle exposure: ${PROBLEM_DATA['fixture-lifespan'].cost1}. ${PROBLEM_DATA['fixture-lifespan'].cost2}. A system designed for one replacement cycle over 10 years — but actually delivering two — doubles maintenance cost and doubles operational disruption over the same period. That delta is almost entirely traceable to thermal management and driver specification at purchase.`,
  'facility-safety': `Liability exposure: ${PROBLEM_DATA['facility-safety'].cost1}. ${PROBLEM_DATA['facility-safety'].cost2}. An OSHA inspection in a facility running below minimum footcandle requirements generates citations, mandated corrections, and ongoing compliance documentation. A recorded incident in an underlit facility generates something far more expensive. The photometric audit costs less than a single OSHA fine.`,
  'warehouse-visibility': `Throughput exposure: ${PROBLEM_DATA['warehouse-visibility'].cost1}. ${PROBLEM_DATA['warehouse-visibility'].cost2}. A distribution operation running 10,000 picks per day at 15% lower accuracy due to lighting inconsistency is processing 1,500 error-prone picks daily. The return rate, re-pick labor, and mis-ship cost that follows is a lighting system problem with a lighting system fix.`,
  'labor-inefficiency': `Productivity exposure: ${PROBLEM_DATA['labor-inefficiency'].cost1}. ${PROBLEM_DATA['labor-inefficiency'].cost2}. A 50-person operation with a 15–20% productivity gap from poor lighting is running at the output equivalent of 40–42 people. The labor line is full. The output isn't. The gap doesn't appear on the lighting invoice — but it's there every shift.`,
  'total-cost-ownership': `Financial exposure: ${PROBLEM_DATA['total-cost-ownership'].cost1}. ${PROBLEM_DATA['total-cost-ownership'].cost2}. Budget fixtures that appear to save $50 per unit at procurement cost $60+ more in maintenance and energy over five years. On a 1,000-fixture installation, that's $60,000 in cost that wasn't on the purchase order — and won't appear on a lighting invoice until year three.`,
  'retrofitting': `Project exposure: ${PROBLEM_DATA['retrofitting'].cost1}. ${PROBLEM_DATA['retrofitting'].cost2}. A retrofit project projected to save $40,000 annually that delivers 50% of projected savings due to driver mismatch is actually saving $20,000 — with 3x the maintenance call rate of a properly engineered system. The savings never materialize. The maintenance costs do.`,
  'operational-disruption': `Disruption exposure: ${PROBLEM_DATA['operational-disruption'].cost1}. ${PROBLEM_DATA['operational-disruption'].cost2}. Emergency repair at 2–3x scheduled maintenance cost, 6–8 times per year, in a facility where each call requires operational coordination. That's not a maintenance budget problem — it's a system lifecycle problem with a defined solution.`,
}

const CTAS: string[] = [
  'If you\'re managing a facility over 50,000 sq ft, this is worth a 15-minute review. Link in comments.',
  'What does your facility spend on lighting maintenance annually? Most operators don\'t know the real number.',
  'We\'ve mapped the actual cost breakdown for facilities like yours. Comment \'AUDIT\' and I\'ll share it.',
  'Drop your sq footage below. I\'ll show you where the cost leakage typically lives.',
  'Tag a facility manager who\'s dealt with this. Let\'s talk about what the fix actually looks like.',
]

const IMPROVEMENT_SUGGESTIONS: Record<string, string[]> = {
  'energy-cost': [
    'Add a specific utility cost per kWh to anchor the financial claim to local market rates.',
    'Include a before/after photometric comparison example to make the specification gap tangible.',
    'Name the audit process explicitly — a "lighting efficiency audit" gives readers a concrete next step.',
  ],
  'downtime': [
    'Add a specific production environment example (automotive, food processing, cold storage) to sharpen relevance.',
    'Include the average cost of lift rental per call to make the labor argument more concrete.',
    'Mention the cascade failure pattern explicitly — facilities recognize it once named.',
  ],
  'maintenance-costs': [
    'Include a simple cost comparison table: fixture cost vs. 5-year total maintenance cost.',
    'Add the OSHA-required maintenance window planning angle to strengthen urgency.',
    'Quantify the 40–60% underestimation gap with a dollar example for a mid-size facility.',
  ],
  'fixture-lifespan': [
    'Add the specific temperature threshold where thermal failure accelerates — 85°C is the common breakpoint.',
    'Include what a proper thermal spec review looks like so readers know what to ask for.',
    'Mention the IES LM-80 testing standard — it\'s the benchmark most procurement teams don\'t know to request.',
  ],
  'facility-safety': [
    'Reference a specific OSHA standard number (29 CFR 1926.56) to add regulatory precision.',
    'Add the footcandle measurement process — how and when to conduct a compliance audit.',
    'Include the workers\' comp premium impact of elevated incident rates to complete the financial picture.',
  ],
  'warehouse-visibility': [
    'Add the specific CRI threshold (CRI 80+) that eliminates barcode scanning degradation.',
    'Include a zone-by-zone audit approach — readers can self-assess error concentration by area.',
    'Quantify the re-pick labor cost for a mid-size distribution operation to make the throughput impact concrete.',
  ],
  'labor-inefficiency': [
    'Add the color temperature specification (4000K–5000K) that maximizes alertness in sustained-task environments.',
    'Include the absenteeism data correlation with eye strain to broaden the labor impact argument.',
    'Reference a comparable productivity study from a published research source to anchor the 15–20% figure.',
  ],
  'total-cost-ownership': [
    'Build out the full 10-year cost model comparison as a shareable image or linked resource.',
    'Add the amortized cost-per-hour-of-operation metric — it reframes the fixture cost conversation.',
    'Include what a proper TCO spec sheet should contain so procurement teams know what to request.',
  ],
  'retrofitting': [
    'Define "driver mismatch" in accessible terms — many readers won\'t know what it means technically.',
    'Add the specific warranty period gap between cheap retrofits and engineered systems.',
    'Include the post-retrofit audit checklist so readers know what to verify after any retrofit project.',
  ],
  'operational-disruption': [
    'Add the scheduling framework for proactive replacement — readers want to know what "doing it right" looks like.',
    'Include the average cascade failure timeline so facilities can assess where they are in the aging curve.',
    'Quantify the break-even point between emergency repair costs and proactive replacement investment.',
  ],
}

const POST_IDEAS: Record<string, PostIdea[]> = {
  'energy-cost': [
    { title: 'The Fixture Specification Gap: Where Energy Savings Disappear', angle: 'Financial Impact', rank: 1, painClarity: 9, financialImpact: 10, tension: 8 },
    { title: 'Why LED Doesn\'t Mean Efficient: The Mismatch Problem', angle: 'Assumption Challenge', rank: 2, painClarity: 9, financialImpact: 9, tension: 9 },
    { title: '$40,000 in Annual Energy Waste — From One Specification Decision', angle: 'Hidden Cost Exposure', rank: 3, painClarity: 8, financialImpact: 10, tension: 7 },
    { title: 'The Utility Audit That Changes Everything', angle: 'Case Study Style', rank: 4, painClarity: 7, financialImpact: 8, tension: 8 },
    { title: 'Lumens You\'re Paying For But Not Using', angle: 'Process Breakdown', rank: 5, painClarity: 8, financialImpact: 9, tension: 7 },
    { title: 'What LED Marketing Doesn\'t Tell Facility Managers', angle: 'Contrarian Take', rank: 6, painClarity: 9, financialImpact: 7, tension: 9 },
    { title: 'Energy Cost Per Square Foot: The Number Most Facilities Get Wrong', angle: 'Industry Benchmark', rank: 7, painClarity: 7, financialImpact: 9, tension: 7 },
    { title: 'How to Read a Photometric Report (And Why It Matters)', angle: 'Educational', rank: 8, painClarity: 6, financialImpact: 7, tension: 6 },
    { title: 'The Driver Mismatch Problem No One Talks About', angle: 'Insider Knowledge', rank: 9, painClarity: 8, financialImpact: 8, tension: 8 },
    { title: 'Why Cheap LED Fixtures Cost More Per Year Than Quality Ones', angle: 'Decision Framework', rank: 10, painClarity: 9, financialImpact: 10, tension: 8 },
  ],
  'downtime': [
    { title: 'The $50,000/Hour Lighting Failure No One Plans For', angle: 'Financial Impact', rank: 1, painClarity: 10, financialImpact: 10, tension: 9 },
    { title: 'Why Aging Lighting Systems Fail in Clusters', angle: 'Operational Risk', rank: 2, painClarity: 9, financialImpact: 8, tension: 10 },
    { title: 'Unplanned vs. Scheduled Maintenance: A 3x Cost Difference', angle: 'Industry Benchmark', rank: 3, painClarity: 8, financialImpact: 10, tension: 8 },
    { title: 'The Maintenance Pattern That Predicts System Failure', angle: 'Insider Knowledge', rank: 4, painClarity: 9, financialImpact: 8, tension: 9 },
    { title: 'When Lighting Downtime Stops a Production Line', angle: 'Case Study Style', rank: 5, painClarity: 10, financialImpact: 9, tension: 9 },
    { title: 'How to Read Your Work Order History as a Failure Warning', angle: 'Process Breakdown', rank: 6, painClarity: 8, financialImpact: 7, tension: 8 },
    { title: 'The Lift Rental Cost Nobody Budgets For', angle: 'Hidden Cost Exposure', rank: 7, painClarity: 7, financialImpact: 9, tension: 7 },
    { title: 'What 3x More Maintenance Calls Actually Costs Per Year', angle: 'Financial Impact', rank: 8, painClarity: 9, financialImpact: 10, tension: 8 },
    { title: 'Thermal Cycling and Vibration: The Hidden Failure Drivers', angle: 'Educational', rank: 9, painClarity: 7, financialImpact: 7, tension: 7 },
    { title: 'The Case for Proactive Replacement Before Year Five', angle: 'Decision Framework', rank: 10, painClarity: 8, financialImpact: 9, tension: 8 },
  ],
  'maintenance-costs': [
    { title: 'Why 70% of Lighting Maintenance Cost Is Labor, Not Parts', angle: 'Industry Benchmark', rank: 1, painClarity: 9, financialImpact: 10, tension: 8 },
    { title: 'The Real Cost of a High-Bay Fixture Replacement', angle: 'Hidden Cost Exposure', rank: 2, painClarity: 9, financialImpact: 9, tension: 8 },
    { title: 'How Facilities Underestimate Maintenance Costs by 40–60%', angle: 'Assumption Challenge', rank: 3, painClarity: 8, financialImpact: 9, tension: 9 },
    { title: 'What the Maintenance Invoice Doesn\'t Show', angle: 'Financial Impact', rank: 4, painClarity: 9, financialImpact: 8, tension: 9 },
    { title: 'Procurement vs. Operations: Who Pays for Cheap Fixtures', angle: 'Contrarian Take', rank: 5, painClarity: 8, financialImpact: 9, tension: 10 },
    { title: 'The Full Cost of One Lift Call in a High-Bay Facility', angle: 'Process Breakdown', rank: 6, painClarity: 8, financialImpact: 9, tension: 7 },
    { title: 'Fixtures That Cost $80 But Replace for $400', angle: 'Decision Framework', rank: 7, painClarity: 9, financialImpact: 10, tension: 8 },
    { title: 'How to Build an Honest Lighting Maintenance Budget', angle: 'Educational', rank: 8, painClarity: 7, financialImpact: 8, tension: 6 },
    { title: 'The Maintenance Cost Gap Between Year 1 and Year 3', angle: 'Operational Risk', rank: 9, painClarity: 8, financialImpact: 9, tension: 8 },
    { title: 'Why Maintenance Cost Tracks Installation Quality, Not Fixture Price', angle: 'Insider Knowledge', rank: 10, painClarity: 8, financialImpact: 8, tension: 8 },
  ],
  'fixture-lifespan': [
    { title: 'The 50,000-Hour Rating That Means Nothing in the Field', angle: 'Assumption Challenge', rank: 1, painClarity: 10, financialImpact: 9, tension: 10 },
    { title: 'Why Budget LEDs Fail at Hour 22,000, Not 50,000', angle: 'Contrarian Take', rank: 2, painClarity: 9, financialImpact: 9, tension: 9 },
    { title: 'Thermal Management: The Spec That Determines Real Lifespan', angle: 'Insider Knowledge', rank: 3, painClarity: 8, financialImpact: 8, tension: 8 },
    { title: 'Double Replacement Cycles: The Hidden Cost of Cheap Fixtures', angle: 'Financial Impact', rank: 4, painClarity: 9, financialImpact: 10, tension: 8 },
    { title: 'How Driver Mismatch Cuts LED Lifespan in Half', angle: 'Process Breakdown', rank: 5, painClarity: 9, financialImpact: 9, tension: 8 },
    { title: 'What the IES LM-80 Rating Actually Measures', angle: 'Educational', rank: 6, painClarity: 7, financialImpact: 7, tension: 6 },
    { title: 'Why High-Bay Environments Kill Budget LED Fixtures Early', angle: 'Operational Risk', rank: 7, painClarity: 9, financialImpact: 8, tension: 9 },
    { title: 'The Fixture That Lasts vs. The One That Promises To', angle: 'Decision Framework', rank: 8, painClarity: 8, financialImpact: 9, tension: 8 },
    { title: '60% of Premature LED Failures Share One Cause', angle: 'Industry Benchmark', rank: 9, painClarity: 9, financialImpact: 8, tension: 8 },
    { title: 'Reading a Thermal Spec Sheet: What to Look For', angle: 'Process Breakdown', rank: 10, painClarity: 7, financialImpact: 7, tension: 7 },
  ],
  'facility-safety': [
    { title: 'The OSHA Exposure Most Facilities Don\'t Know They Have', angle: 'Operational Risk', rank: 1, painClarity: 10, financialImpact: 9, tension: 10 },
    { title: 'Why Accident Rates Climb 20% in Underlit Facilities', angle: 'Industry Benchmark', rank: 2, painClarity: 9, financialImpact: 8, tension: 9 },
    { title: 'The $500,000 Safety Incident That Starts with Poor Lighting', angle: 'Financial Impact', rank: 3, painClarity: 9, financialImpact: 10, tension: 9 },
    { title: 'Footcandle Compliance: What Most Facilities Never Measure', angle: 'Assumption Challenge', rank: 4, painClarity: 9, financialImpact: 8, tension: 9 },
    { title: 'When "No Incidents" Isn\'t the Same as Compliant', angle: 'Contrarian Take', rank: 5, painClarity: 9, financialImpact: 8, tension: 10 },
    { title: 'OSHA 29 CFR 1926.56: The Lighting Standard That Gets Overlooked', angle: 'Educational', rank: 6, painClarity: 8, financialImpact: 7, tension: 7 },
    { title: 'How Lumen Degradation Creates Compliance Risk Over Time', angle: 'Process Breakdown', rank: 7, painClarity: 8, financialImpact: 8, tension: 8 },
    { title: 'Workers\' Comp, OSHA Fines, and Poor Lighting: The Connection', angle: 'Hidden Cost Exposure', rank: 8, painClarity: 9, financialImpact: 9, tension: 9 },
    { title: 'The Right Way to Audit Your Facility\'s Lighting Compliance', angle: 'Process Breakdown', rank: 9, painClarity: 7, financialImpact: 7, tension: 7 },
    { title: 'Plaintiff Attorneys Know the 20% Accident Rate Stat. Do You?', angle: 'Contrarian Take', rank: 10, painClarity: 10, financialImpact: 9, tension: 10 },
  ],
  'warehouse-visibility': [
    { title: 'The Lighting Reason Your Picking Error Rate Isn\'t Improving', angle: 'Assumption Challenge', rank: 1, painClarity: 9, financialImpact: 9, tension: 9 },
    { title: 'Shadow Zones and Mis-Ships: A Measurable Connection', angle: 'Industry Benchmark', rank: 2, painClarity: 9, financialImpact: 8, tension: 9 },
    { title: 'CRI 70 vs CRI 80: What It Means for Barcode Scanning Speed', angle: 'Process Breakdown', rank: 3, painClarity: 8, financialImpact: 8, tension: 7 },
    { title: 'How to Find the Error-Prone Zones on Your Warehouse Floor', angle: 'Process Breakdown', rank: 4, painClarity: 8, financialImpact: 7, tension: 8 },
    { title: 'Picking Accuracy Is a Lighting Problem Before It\'s a Training Problem', angle: 'Contrarian Take', rank: 5, painClarity: 9, financialImpact: 9, tension: 10 },
    { title: 'The Throughput Tax of Poor Color Rendering in Distribution', angle: 'Financial Impact', rank: 6, painClarity: 8, financialImpact: 9, tension: 7 },
    { title: 'Why Lighting Consistency Matters More Than Brightness Alone', angle: 'Educational', rank: 7, painClarity: 7, financialImpact: 7, tension: 7 },
    { title: '10,000 Picks Per Day at 15% Lower Accuracy: The Real Cost', angle: 'Financial Impact', rank: 8, painClarity: 9, financialImpact: 10, tension: 8 },
    { title: 'How Returns and Re-Picks Trace Back to the Environment', angle: 'Hidden Cost Exposure', rank: 9, painClarity: 8, financialImpact: 9, tension: 8 },
    { title: 'The Photometric Audit That Fixes the Ops Problem', angle: 'Decision Framework', rank: 10, painClarity: 7, financialImpact: 8, tension: 7 },
  ],
  'labor-inefficiency': [
    { title: 'The 20% Productivity Loss That Doesn\'t Show Up on a Lighting Invoice', angle: 'Hidden Cost Exposure', rank: 1, painClarity: 9, financialImpact: 10, tension: 9 },
    { title: 'Why Your Second Shift Underperforms Your First', angle: 'Assumption Challenge', rank: 2, painClarity: 9, financialImpact: 9, tension: 10 },
    { title: 'Eye Fatigue After Hour Four: The Shift-Long Productivity Tax', angle: 'Operational Risk', rank: 3, painClarity: 9, financialImpact: 9, tension: 9 },
    { title: '50 Workers. 15–20% Productivity Gap. One Lighting System.', angle: 'Financial Impact', rank: 4, painClarity: 9, financialImpact: 10, tension: 8 },
    { title: 'What Calibrated Lighting Does to Absenteeism and Error Rates', angle: 'Case Study Style', rank: 5, painClarity: 8, financialImpact: 8, tension: 8 },
    { title: 'Color Temperature and Sustained Task Performance', angle: 'Educational', rank: 6, painClarity: 7, financialImpact: 7, tension: 6 },
    { title: 'The Environmental Productivity Variable Nobody Measures', angle: 'Contrarian Take', rank: 7, painClarity: 9, financialImpact: 9, tension: 9 },
    { title: 'How to Measure Lighting\'s Impact on Throughput', angle: 'Process Breakdown', rank: 8, painClarity: 7, financialImpact: 8, tension: 7 },
    { title: '30% Fewer Complaints. Measurably Better Output. Same Headcount.', angle: 'Industry Benchmark', rank: 9, painClarity: 8, financialImpact: 9, tension: 8 },
    { title: 'Closing the Labor Gap Without Adding Headcount', angle: 'Decision Framework', rank: 10, painClarity: 8, financialImpact: 9, tension: 8 },
  ],
  'total-cost-ownership': [
    { title: 'The $30 Fixture That Costs $180: A 5-Year Cost Model', angle: 'Financial Impact', rank: 1, painClarity: 9, financialImpact: 10, tension: 9 },
    { title: 'Why First-Cost Purchasing Is an Expensive Strategy', angle: 'Contrarian Take', rank: 2, painClarity: 9, financialImpact: 9, tension: 10 },
    { title: '60% of Lighting Cost Comes After Installation', angle: 'Hidden Cost Exposure', rank: 3, painClarity: 9, financialImpact: 10, tension: 8 },
    { title: 'How to Build a TCO Model for a Lighting Decision', angle: 'Decision Framework', rank: 4, painClarity: 7, financialImpact: 9, tension: 7 },
    { title: 'What Procurement Gets Wrong About Lighting Bids', angle: 'Assumption Challenge', rank: 5, painClarity: 9, financialImpact: 8, tension: 9 },
    { title: 'The 40/60 Rule: First Cost vs. Lifetime Cost in Lighting', angle: 'Industry Benchmark', rank: 6, painClarity: 8, financialImpact: 10, tension: 8 },
    { title: 'Evaluating Lighting on First Cost Is Evaluating 40% of the Number', angle: 'Contrarian Take', rank: 7, painClarity: 9, financialImpact: 9, tension: 9 },
    { title: '1,000 Fixtures at $30 Each: The Real Math at Year Three', angle: 'Case Study Style', rank: 8, painClarity: 9, financialImpact: 10, tension: 9 },
    { title: 'What a Proper TCO Spec Sheet Should Contain', angle: 'Process Breakdown', rank: 9, painClarity: 7, financialImpact: 8, tension: 7 },
    { title: 'Trucks Bought on Tire Cost: The Lighting Procurement Analogy', angle: 'Assumption Challenge', rank: 10, painClarity: 8, financialImpact: 8, tension: 9 },
  ],
  'retrofitting': [
    { title: '50% of LED Retrofit Projects Miss Their Savings Target', angle: 'Industry Benchmark', rank: 1, painClarity: 10, financialImpact: 10, tension: 9 },
    { title: 'Driver Mismatch: The Retrofit Problem Nobody Fixes', angle: 'Operational Risk', rank: 2, painClarity: 9, financialImpact: 9, tension: 9 },
    { title: '3x Failure Rate: Why Cheap Retrofits Cost More by Year Two', angle: 'Financial Impact', rank: 3, painClarity: 9, financialImpact: 10, tension: 8 },
    { title: 'The LED Retrofit That Doesn\'t Pay Back: How to Spot It', angle: 'Decision Framework', rank: 4, painClarity: 8, financialImpact: 9, tension: 9 },
    { title: 'What a Proper Retrofit Engineering Review Includes', angle: 'Process Breakdown', rank: 5, painClarity: 7, financialImpact: 8, tension: 7 },
    { title: 'Why Your Retrofit Saved Less Energy Than Projected', angle: 'Assumption Challenge', rank: 6, painClarity: 9, financialImpact: 9, tension: 9 },
    { title: 'Day-One Efficiency Loss from Driver Mismatch: The Hidden Gap', angle: 'Hidden Cost Exposure', rank: 7, painClarity: 8, financialImpact: 9, tension: 8 },
    { title: 'The Post-Retrofit Audit Most Facilities Skip', angle: 'Insider Knowledge', rank: 8, painClarity: 8, financialImpact: 8, tension: 8 },
    { title: 'How Retrofit Projects Become Recurring Maintenance Expenses', angle: 'Case Study Style', rank: 9, painClarity: 9, financialImpact: 9, tension: 9 },
    { title: 'Buying Retrofit Kits Without Engineering Review: The Actual Risk', angle: 'Contrarian Take', rank: 10, painClarity: 9, financialImpact: 8, tension: 9 },
  ],
  'operational-disruption': [
    { title: '6–8 Hours of Unplanned Downtime Per Year: The Lighting Average', angle: 'Industry Benchmark', rank: 1, painClarity: 9, financialImpact: 9, tension: 9 },
    { title: 'Emergency Repair at 3x Cost: Why Aging Systems Win', angle: 'Financial Impact', rank: 2, painClarity: 9, financialImpact: 10, tension: 9 },
    { title: 'Cascade Failures: How Aging Systems Get Worse in Year Two', angle: 'Operational Risk', rank: 3, painClarity: 9, financialImpact: 9, tension: 10 },
    { title: 'Proactive Replacement vs. Emergency Response: The Cost Math', angle: 'Decision Framework', rank: 4, painClarity: 8, financialImpact: 10, tension: 8 },
    { title: 'The Work Order Pattern That Predicts a System Breakdown', angle: 'Insider Knowledge', rank: 5, painClarity: 9, financialImpact: 8, tension: 9 },
    { title: 'Why Aging Lighting Systems Cost More Every Year', angle: 'Process Breakdown', rank: 6, painClarity: 8, financialImpact: 9, tension: 8 },
    { title: 'What "Operating Until Failure" Actually Costs', angle: 'Contrarian Take', rank: 7, painClarity: 9, financialImpact: 10, tension: 9 },
    { title: 'How to Build a Proactive Lighting Replacement Schedule', angle: 'Process Breakdown', rank: 8, painClarity: 7, financialImpact: 8, tension: 7 },
    { title: 'The Cascade Failure Timeline: When to Act Before It Accelerates', angle: 'Operational Risk', rank: 9, painClarity: 9, financialImpact: 9, tension: 9 },
    { title: 'Disruption Budget vs. Replacement Cost: Which Number Wins', angle: 'Financial Impact', rank: 10, painClarity: 8, financialImpact: 9, tension: 8 },
  ],
}

const CALENDAR_ENTRIES: CalendarEntry[] = [
  { day: 1, topic: 'Energy Cost Leakage', hook: 'Most facilities switched to LED and assumed the work was done. The energy waste continued.', angle: 'Financial Impact', cta: 'How much is your facility actually spending per sq ft on lighting energy?' },
  { day: 2, topic: 'Lighting System Downtime', hook: 'A lighting failure in an active production zone doesn\'t cost what the fixture costs. It costs what stops.', angle: 'Operational Risk', cta: 'When was the last unplanned lighting maintenance call at your facility?' },
  { day: 3, topic: 'Hidden Maintenance Costs', hook: '70% of lighting maintenance cost is labor. Most procurement decisions are made on the other 30%.', angle: 'Hidden Cost Exposure', cta: 'What does a high-bay fixture replacement actually cost your operation, total?' },
  { day: 4, topic: 'Poor Fixture Lifespan', hook: 'The 50,000-hour rating on your fixtures is a lab test. Your facility is not a lab.', angle: 'Assumption Challenge', cta: 'Are your fixtures hitting their rated lifespan? Most aren\'t.' },
  { day: 5, topic: 'Facility Safety Issues', hook: 'An underlit facility isn\'t just an efficiency problem. It\'s an OSHA exposure with a price tag.', angle: 'Operational Risk', cta: 'When did you last measure footcandle levels in your assembly areas?' },
  { day: 6, topic: 'Warehouse Visibility Problems', hook: 'The picking error rate in Zone 3 is a lighting problem before it\'s a training problem.', angle: 'Contrarian Take', cta: 'Which zones in your facility have the highest error concentration?' },
  { day: 7, topic: 'Labor Inefficiency', hook: 'Workers don\'t slow down in bad lighting because they\'re less motivated. They slow down because they can see less.', angle: 'Educational', cta: 'Have you measured productivity by shift in different lighting zones?' },
  { day: 8, topic: 'Total Cost of Ownership', hook: 'The $30 fixture looks like a bargain. At year three, it\'s cost $180. The $80 fixture cost $120.', angle: 'Financial Impact', cta: 'Has your team ever built a 5-year TCO model for a lighting decision?' },
  { day: 9, topic: 'Retrofitting Inefficiencies', hook: '50% of LED retrofit projects miss their energy savings target. Driver mismatch is almost always why.', angle: 'Industry Benchmark', cta: 'Did your last retrofit deliver its projected savings?' },
  { day: 10, topic: 'Operational Disruption', hook: 'Emergency lighting repairs cost 2–3x scheduled maintenance. Yet most facilities repair on failure, not on schedule.', angle: 'Decision Framework', cta: 'What\'s your current approach to lighting replacement — reactive or scheduled?' },
  { day: 11, topic: 'Energy Cost Leakage', hook: 'Fixture mismatch causes 15–40% energy loss before you account for any other variable. That\'s the floor.', angle: 'Industry Benchmark', cta: 'Comment \'AUDIT\' — I\'ll share the cost breakdown for your facility size.' },
  { day: 12, topic: 'Lighting System Downtime', hook: 'Facilities with aging lighting systems average 3x more unplanned maintenance calls. That\'s not wear — that\'s system design.', angle: 'Process Breakdown', cta: 'What\'s your annual maintenance call volume for lighting? Do you track it?' },
  { day: 13, topic: 'Hidden Maintenance Costs', hook: 'Replacing a high-bay fixture isn\'t a 20-minute job. It\'s $150–$400 in labor before parts.', angle: 'Process Breakdown', cta: 'Tag a maintenance supervisor who knows what a lift call actually costs.' },
  { day: 14, topic: 'Poor Fixture Lifespan', hook: 'Thermal management failure causes over 60% of premature LED deaths. Heat management is the spec that matters most.', angle: 'Insider Knowledge', cta: 'Are you specifying fixtures by thermal rating or just by lumen output?' },
  { day: 15, topic: 'Facility Safety Issues', hook: 'Lumen output degrades over time. The system that met code at installation may not meet it today.', angle: 'Operational Risk', cta: 'Drop your facility size — I\'ll tell you how often photometric audits should run.' },
  { day: 16, topic: 'Warehouse Visibility Problems', hook: 'CRI below 70 slows barcode scanning by 25%. On 10,000 picks per day, that\'s a significant throughput gap.', angle: 'Financial Impact', cta: 'What CRI specification are you running in your picking zones?' },
  { day: 17, topic: 'Labor Inefficiency', hook: 'Cognitive performance drops 20% after four hours under poor lighting. That\'s the second half of every shift.', angle: 'Operational Risk', cta: 'Have you tracked error rates by shift half? The second half often looks different.' },
  { day: 18, topic: 'Total Cost of Ownership', hook: '60% of total lighting cost comes after installation. Procurement decisions that ignore this are optimizing for the wrong number.', angle: 'Contrarian Take', cta: 'What percentage of your lighting budget covers post-installation costs?' },
  { day: 19, topic: 'Retrofitting Inefficiencies', hook: 'A cheap retrofit fails at 3x the rate of an engineered system within 18 months. The warranty period ends before the failures do.', angle: 'Hidden Cost Exposure', cta: 'When did you last audit the performance of a completed retrofit project?' },
  { day: 20, topic: 'Operational Disruption', hook: 'Cascade failures in aging systems affect 30% more fixtures in year two than year one. The failure rate accelerates.', angle: 'Operational Risk', cta: 'Is your maintenance call volume for lighting increasing year over year?' },
  { day: 21, topic: 'Energy Cost Leakage', hook: 'Lighting energy costs in poorly designed facilities average $1.50–$3.00 per sq ft annually. Most operators don\'t know their number.', angle: 'Industry Benchmark', cta: 'Drop your sq footage — I\'ll show you the energy cost range for your facility class.' },
  { day: 22, topic: 'Lighting System Downtime', hook: 'When a lighting failure halts a production line, the fixture cost is irrelevant. The stopped operation is the number.', angle: 'Financial Impact', cta: 'What\'s your estimated cost per hour of production downtime? That\'s the real risk number.' },
  { day: 23, topic: 'Hidden Maintenance Costs', hook: 'Facilities typically underestimate ongoing lighting maintenance by 40–60%. Not carelessness — wrong measurement.', angle: 'Assumption Challenge', cta: 'Have you audited your actual vs. budgeted lighting maintenance spend recently?' },
  { day: 24, topic: 'Poor Fixture Lifespan', hook: 'Poor driver quality reduces LED system lifespan by 30–50% in high-temperature environments. The chip is fine. The driver isn\'t.', angle: 'Process Breakdown', cta: 'What driver specification are you requiring in your fixture RFPs?' },
  { day: 25, topic: 'Facility Safety Issues', hook: 'A recorded safety incident in an underlit facility is expensive. A documented pattern of underlit conditions is significantly worse.', angle: 'Hidden Cost Exposure', cta: 'Is your lighting compliance documentation current? Most facilities\' isn\'t.' },
  { day: 26, topic: 'Warehouse Visibility Problems', hook: 'Shadow zones from poor fixture placement increase picking errors by up to 25%. If you know your high-error zones, you know your shadow zones.', angle: 'Case Study Style', cta: 'Have you mapped your error zones against a photometric plan? Correlation is almost always there.' },
  { day: 27, topic: 'Labor Inefficiency', hook: 'Facilities with calibrated lighting report 30% fewer eye strain complaints. That\'s a sustained-performance metric, not a comfort metric.', angle: 'Industry Benchmark', cta: 'What environmental factors does your team measure in productivity analysis?' },
  { day: 28, topic: 'Total Cost of Ownership', hook: 'First cost is 40% of total system cost over 10 years. Most lighting decisions are made on first cost alone.', angle: 'Decision Framework', cta: 'I\'ve built TCO models for dozens of facility types. Comment your operation type and I\'ll share the range.' },
  { day: 29, topic: 'Retrofitting Inefficiencies', hook: 'Mismatched driver-LED combinations reduce system efficiency by 15–25% from day one. The projected savings never existed.', angle: 'Contrarian Take', cta: 'If your retrofit project hasn\'t hit its savings target, driver mismatch is the first thing to check.' },
  { day: 30, topic: 'Operational Disruption', hook: 'The disruption is never the fixture. It\'s the operation that stops while you wait for it to be fixed.', angle: 'Financial Impact', cta: 'What would a proactive replacement schedule look like for your facility? Link in comments for a framework.' },
]

const REPURPOSING: string[] = [
  'Break the Business Impact section into a Twitter/X thread with each stat as a standalone post.',
  'Turn the 30-day calendar into a downloadable PDF lead magnet titled "30 Days of B2B Lighting Content."',
  'Pull the hook and body into a YouTube Shorts script — add B-roll of an industrial facility and post natively.',
  'Convert the Post Ideas table into a carousel post showing ranked content angles for facility managers.',
  'Use the hook as a cold email subject line for outreach to operations directors.',
]

export function generateLinkedIn(inputs: LinkedInInputs, seed: number = 0): LinkedInOutput {
  const v = seed % 3
  const p = inputs.problem

  const hookOptions = HOOKS[p] ?? HOOKS['energy-cost']
  const bodyOptions = BODIES[p] ?? BODIES['energy-cost']
  const postIdeas = POST_IDEAS[p] ?? POST_IDEAS['energy-cost']

  const hook = hookOptions[v] ?? hookOptions[0]
  const body = bodyOptions[v] ?? bodyOptions[0]
  const businessImpact = BUSINESS_IMPACTS[p] ?? BUSINESS_IMPACTS['energy-cost']
  const cta = CTAS[v % CTAS.length]
  const improvements = IMPROVEMENT_SUGGESTIONS[p] ?? IMPROVEMENT_SUGGESTIONS['energy-cost']

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
