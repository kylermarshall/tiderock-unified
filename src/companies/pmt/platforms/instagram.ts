import type { InstagramInputs, InstagramOutput } from '../types'
import { PROBLEM_DATA, COMPANY } from '../lib/companyProfile'
import { scoreContent } from '../lib/scoring'

const VISUAL_HOOKS: Record<string, string[]> = {
  'injection-molding-defects': [
    'Side-by-side: rejected part vs. acceptable part on inspection table',
    'Close-up of sink marks and warping on a black plastic housing',
    'Scrap bin overflowing with defective parts — dollar signs overlaid',
  ],
  'tooling-failures': [
    'Cracked mold insert pulled from press — maintenance tag attached',
    'Time-lapse of mold repair process vs. production downtime counter',
    'Before/after: worn cavity vs. refurbished tool surface',
  ],
  'production-bottlenecks': [
    'Empty conveyor line next to idle press — timestamp overlay',
    'Operator standing at stopped press checking dashboard alerts',
    'Split screen: optimized cycle time vs. bottlenecked cycle time',
  ],
  'scrap-rework-cost': [
    'Scrap parts sorted on table with cost-per-part label cards',
    'Rework station piled with parts — labor hours ticking in corner',
    'Overhead shot: reject bin vs. good parts bin — ratio visual',
  ],
  'mold-downtime': [
    'Mold pulled mid-production — maintenance crew at press',
    'Downtime dashboard showing hours lost vs. revenue impact',
    'Idle press with caution tape — shift schedule disrupted',
  ],
  'poor-part-consistency': [
    'Overlay of part measurement deviations across 100-unit sample',
    'QC inspector measuring out-of-tolerance parts at inspection station',
    'Side-by-side: first shot vs. shot 5,000 — dimensional drift visible',
  ],
  'scaling-inefficiencies': [
    'One press running vs. 5 presses running — throughput comparison',
    'RFQ pile growing on desk — capacity constraint visual',
    'Whiteboard showing: new orders vs. constrained capacity',
  ],
  'material-waste': [
    'Runner system vs. part — resin ratio overlay showing excess',
    'Raw pellet waste on floor near press after changeover',
    'Material cost chart with waste highlighted in red',
  ],
  'process-cost-leakage': [
    'P&L breakdown with highlighted hidden cost line items',
    'Per-part cost breakdown: labeled categories with leak arrows',
    'Operator tracking cycle time manually — lost efficiency visual',
  ],
  'tooling-lifecycle-cost': [
    'Mold shot count meter vs. projected end-of-life timeline',
    'Tool maintenance log with escalating cost columns',
    'Old mold vs. new mold — total cost of ownership comparison',
  ],
}

const REEL_SCRIPTS: Record<string, string[][]> = {
  'injection-molding-defects': [
    [
      'HOOK (0–3s): Hold up a defective part to camera. Say: "This part cost $4.20 to make. It cost $0 to fix. Here\'s why that\'s backwards."',
      'PROBLEM (3–12s): Walk through the three most common defects — sink marks, flash, short shots. Each one has a root cause, and none of them are random.',
      'INSIGHT (12–22s): Most defect-related scrap happens because process parameters drift between shifts. No one catches it until the reject bin is full.',
      'FIX (22–35s): At PMT, we log process data every cycle. If parameters drift more than 2%, we flag it before it becomes a scrap event.',
      'CTA (35–45s): "If your defect rate is above 3%, we should talk. Link in bio."',
    ],
    [
      'HOOK (0–3s): Flash a stat on screen: "The average injection molder loses $380K/year to defect-related scrap." Then ask: "Is yours higher?"',
      'PROBLEM (3–12s): Defects aren\'t random. Sink marks happen when wall thickness is inconsistent. Flash happens when clamp pressure drifts. Short shots happen when melt temp is off.',
      'INSIGHT (12–22s): Most plants treat defects as inspection problems. They\'re not. They\'re process problems. Inspection just tells you after the damage is done.',
      'FIX (22–35s): Real-time process monitoring catches drift before it becomes a defect. We\'ve reduced defect rates by 60% using this approach.',
      'CTA (35–45s): "Comment DEFECTS and we\'ll send you the checklist we use."',
    ],
    [
      'HOOK (0–3s): Hold two parts — one clean, one defective. "Both came out of the same press. One shift apart. Here\'s what changed."',
      'PROBLEM (3–12s): Process parameter drift is the #1 cause of defect spikes. Temperature, pressure, cycle time — any one of these drifting triggers quality issues.',
      'INSIGHT (12–22s): Operators often compensate manually without logging changes. By the time QC catches it, 3,000 bad parts are in the bin.',
      'FIX (22–35s): Documented process control + automatic parameter alerts = defects caught at cycle 1, not cycle 3,000.',
      'CTA (35–45s): "What\'s your current defect rate? Drop it in the comments."',
    ],
  ],
  'tooling-failures': [
    [
      'HOOK (0–3s): "Your mold just cracked mid-run. You have 6 hours of orders queued. What do you do?"',
      'PROBLEM (3–12s): Tooling failures are the most expensive unplanned event in injection molding. Average repair: $15,000. Average downtime: 4–6 days.',
      'INSIGHT (12–22s): Most failures are preventable. Worn parting lines, inadequate venting, missing preventive maintenance — these are process failures, not random events.',
      'FIX (22–35s): Preventive maintenance schedules tied to shot counts — not calendar dates — cut unplanned tooling failures by 40–60%.',
      'CTA (35–45s): "Link in bio: tooling lifecycle guide from PMT."',
    ],
    [
      'HOOK (0–3s): Show a cracked mold insert. "This cost $22,000 to fix. Here\'s what caused it."',
      'PROBLEM (3–12s): Tooling failures don\'t announce themselves. They build over thousands of cycles through micro-stress, wear, and ignored warning signs.',
      'INSIGHT (12–22s): The warning signs are always there: flash appearing on parting lines, surface roughness increasing, cycle time creeping up. Most teams ignore them until failure.',
      'FIX (22–35s): PMT tracks 8 leading indicators of tooling stress. We intervene at 70% of threshold — before the failure event happens.',
      'CTA (35–45s): "What\'s your preventive maintenance interval? Comment below."',
    ],
    [
      'HOOK (0–3s): "How many of your mold failures were actually surprises?" Pause. "Be honest."',
      'PROBLEM (3–12s): Tooling failures feel sudden but are almost never random. Parting line wear, cooling line deposits, ejector pin wear — all trackable, all preventable.',
      'INSIGHT (12–22s): Teams that treat maintenance reactively spend 3× more on tooling than those with preventive programs.',
      'FIX (22–35s): Shot-count-based maintenance intervals + visual inspection logs = 60% fewer unplanned failures.',
      'CTA (35–45s): "DM us TOOLING for our maintenance interval guide."',
    ],
  ],
  'production-bottlenecks': [
    [
      'HOOK (0–3s): "Every minute your press sits idle, you\'re losing $8.50. Here\'s where the time goes."',
      'PROBLEM (3–12s): Bottlenecks in injection molding happen in three places: changeover, material prep, and downstream handling. Most plants don\'t track which one is costing them most.',
      'INSIGHT (12–22s): Changeover time averages 4–6 hours in plants without documented setup procedures. Best-in-class: under 90 minutes.',
      'FIX (22–35s): Standardized changeover checklists + staging protocols cut changeover time by 50–70% without capital investment.',
      'CTA (35–45s): "How long does your average changeover take? Comment below."',
    ],
    [
      'HOOK (0–3s): Flash: "The average injection molding plant loses 23% of production capacity to bottlenecks. Most don\'t know where."',
      'PROBLEM (3–12s): Three bottleneck types: constraint bottlenecks (one slow step chokes everything), variation bottlenecks (inconsistent cycle time), and scheduling bottlenecks (wrong jobs on wrong presses).',
      'INSIGHT (12–22s): Most plants focus on the press. The bottleneck is usually upstream or downstream — material handling, QC staging, or secondary ops.',
      'FIX (22–35s): Value stream mapping across the full production cell — not just the press — identifies where capacity is actually lost.',
      'CTA (35–45s): "Link in bio: bottleneck audit guide for injection molding."',
    ],
    [
      'HOOK (0–3s): "You could run 10% more parts per shift without adding a single press. Here\'s how."',
      'PROBLEM (3–12s): Hidden capacity exists in every plant. It\'s locked in changeover waste, idle press time, and scheduling inefficiency.',
      'INSIGHT (12–22s): A 30-minute reduction in daily changeover time frees 10–15 additional press-hours per week. At $85/hour machine rate, that\'s $44K/year per press.',
      'FIX (22–35s): Changeover analysis + job sequencing optimization unlocks existing capacity — no capital required.',
      'CTA (35–45s): "Drop your current changeover time in the comments."',
    ],
  ],
  'scrap-rework-cost': [
    [
      'HOOK (0–3s): Hold up a reworked part. "This part cost $2.10 to make and $1.80 to rework. We should have made it right the first time."',
      'PROBLEM (3–12s): Rework is a tax on poor process control. Every part that goes back through secondary ops is proof that something upstream failed.',
      'INSIGHT (12–22s): At $380K/year in average scrap costs, rework is one of the highest-ROI targets for process improvement in injection molding.',
      'FIX (22–35s): First-pass yield tracking by press, by operator, and by tool reveals exactly where scrap is being generated — and why.',
      'CTA (35–45s): "What\'s your current first-pass yield? Comment below."',
    ],
    [
      'HOOK (0–3s): "Your scrap bin is a profit statement. What\'s it saying about your process?"',
      'PROBLEM (3–12s): Scrap cost in injection molding is usually 3–8% of revenue. For a $5M plant, that\'s $150K–$400K walking out the door in rejected material.',
      'INSIGHT (12–22s): Most scrap is attributed to material or machine issues. The actual root cause is almost always process parameter drift or tooling wear.',
      'FIX (22–35s): First-cause scrap analysis — not just defect codes — reveals whether you have a process problem, a material problem, or a tooling problem.',
      'CTA (35–45s): "Link in bio: scrap reduction audit framework."',
    ],
    [
      'HOOK (0–3s): "Three parts. All defective. Three different root causes. Most plants log all three the same way."',
      'PROBLEM (3–12s): Scrap coding that only records the defect type — not the cause — makes it impossible to drive down reject rates over time.',
      'INSIGHT (12–22s): Cause-based scrap tracking shows which presses, tools, and materials drive the most waste — and where to intervene first.',
      'FIX (22–35s): Root cause scrap categorization + pareto analysis = 20–40% scrap reduction in 90 days.',
      'CTA (35–45s): "DM us SCRAP for our root cause tracking template."',
    ],
  ],
  'mold-downtime': [
    [
      'HOOK (0–3s): "Your mold just went down at shift start. You have 8 hours of orders. What\'s your plan?"',
      'PROBLEM (3–12s): Unplanned mold downtime averages 2–4 events per month in reactive maintenance environments. Each event costs $8,000–$25,000 in lost production.',
      'INSIGHT (12–22s): Most downtime events are preceded by 3–5 warning signs that were visible and ignored.',
      'FIX (22–35s): Leading indicator tracking — flash on parting lines, rising cycle times, ejector pin drag — lets you intervene before the failure event.',
      'CTA (35–45s): "What\'s your average monthly mold downtime? Comment below."',
    ],
    [
      'HOOK (0–3s): Flash: "Unplanned mold downtime costs injection molders an average of $175K per year." Then: "Where does yours come from?"',
      'PROBLEM (3–12s): Mold downtime has three sources: mechanical failure, cooling system problems, and ejection system wear. Each has different prevention strategies.',
      'INSIGHT (12–22s): Cooling system fouling is the most underrated source of mold downtime. It doesn\'t cause sudden failure — it causes gradual cycle time increase until the run becomes unprofitable.',
      'FIX (22–35s): Annual cooling channel inspection + scale removal protocols = consistent cycle times and fewer mid-run failures.',
      'CTA (35–45s): "Link in bio: mold maintenance guide from PMT."',
    ],
    [
      'HOOK (0–3s): "The difference between planned downtime and unplanned downtime is about $15,000 per event."',
      'PROBLEM (3–12s): Planned maintenance costs time and prep. Unplanned failures cost time, parts, emergency labor, and customer delays.',
      'INSIGHT (12–22s): Plants with preventive maintenance programs tied to shot counts experience 60% fewer unplanned events than reactive environments.',
      'FIX (22–35s): Shot-count triggers + documented maintenance checklists = predictable downtime you can schedule around production.',
      'CTA (35–45s): "DM us MAINTENANCE and we\'ll send our PM schedule template."',
    ],
  ],
  'poor-part-consistency': [
    [
      'HOOK (0–3s): "Shot 1 passed inspection. Shot 4,000 didn\'t. Same tool. Same machine. What changed?"',
      'PROBLEM (3–12s): Part consistency degrades over a production run when process parameters drift and no one is watching.',
      'INSIGHT (12–22s): Thermal variation in mold temperature is the #1 driver of dimensional drift in long production runs. A 5°F swing can shift critical dimensions by 0.002".',
      'FIX (22–35s): Mold temperature controllers + in-process dimensional checks at set intervals catch drift before it reaches customer-critical dimensions.',
      'CTA (35–45s): "What\'s your current Cpk on your tightest tolerance feature? Comment below."',
    ],
    [
      'HOOK (0–3s): "Your customer runs your parts through incoming inspection. They flag a 2% deviation rate. You thought you shipped zero defects."',
      'PROBLEM (3–12s): Part-to-part variation that passes your internal inspection can still fail customer requirements if your gauging and theirs don\'t align.',
      'INSIGHT (12–22s): MSA — measurement system analysis — is the step most small and mid-size molders skip. Without it, you don\'t know if your inspection is accurate.',
      'FIX (22–35s): Gauge R&R studies + customer tolerance alignment eliminate inspection disagreements before they become returns.',
      'CTA (35–45s): "Link in bio: part consistency guide from PMT."',
    ],
    [
      'HOOK (0–3s): "Inconsistent parts aren\'t a quality problem. They\'re a process control problem."',
      'PROBLEM (3–12s): When dimensional consistency is poor, teams add inspection steps, slow down the line, or add rework. All three are symptoms — not solutions.',
      'INSIGHT (12–22s): Root cause is almost always process variation: melt temperature range, pack pressure consistency, or cooling time variance.',
      'FIX (22–35s): Process capability studies (Cpk) identify which parameters to tighten. Control charts keep them there over long runs.',
      'CTA (35–45s): "What tolerance band are you holding? Drop it in the comments."',
    ],
  ],
  'scaling-inefficiencies': [
    [
      'HOOK (0–3s): "You just won a contract 3× bigger than your largest current job. Can you actually run it?"',
      'PROBLEM (3–12s): Most injection molders hit scaling limits in one of three places: press capacity, tooling investment, or quality system bandwidth.',
      'INSIGHT (12–22s): The highest-ROI path to scaling is eliminating waste in existing production before adding capacity. A 15% efficiency gain equals a free press.',
      'FIX (22–35s): OEE tracking (availability × performance × quality) shows exactly where capacity is leaking before you invest in new equipment.',
      'CTA (35–45s): "What\'s your current OEE? Comment below."',
    ],
    [
      'HOOK (0–3s): "Adding a press doesn\'t scale your operation. Fixing your process does."',
      'PROBLEM (3–12s): Capital investment in new equipment without addressing process efficiency just scales your existing problems.',
      'INSIGHT (12–22s): Plants that optimize changeover, reduce scrap, and improve OEE before adding presses see 30–40% higher returns on capital investment.',
      'FIX (22–35s): Process efficiency audit → targeted improvement → then expansion. In that order.',
      'CTA (35–45s): "Link in bio: scaling readiness assessment from PMT."',
    ],
    [
      'HOOK (0–3s): "The plant that can quote lower isn\'t necessarily running a better process. They might just have more capacity they\'re not using."',
      'PROBLEM (3–12s): Pricing pressure in injection molding often comes from competitors with underutilized capacity absorbing overhead. You can\'t out-price that. You can out-perform it.',
      'INSIGHT (12–22s): Process consistency, on-time delivery, and documented quality systems are the real competitive moat for molders at scale.',
      'FIX (22–35s): Building quality and process systems before you need them means you scale without the chaos.',
      'CTA (35–45s): "How many presses do you run? What\'s your capacity utilization? Comment below."',
    ],
  ],
  'material-waste': [
    [
      'HOOK (0–3s): "How much resin did you throw away last month? Do you actually know?"',
      'PROBLEM (3–12s): Material waste in injection molding comes from three sources: runners and sprues, purge waste during changeovers, and defect-related scrap.',
      'INSIGHT (12–22s): Runner waste alone can represent 15–30% of shot weight in cold runner systems. That\'s 15–30% of your material cost going nowhere.',
      'FIX (22–35s): Hot runner systems eliminate runner waste. Regrind programs recover value from purge and sprues. Combined, material costs drop 12–20%.',
      'CTA (35–45s): "What\'s your current regrind percentage? Comment below."',
    ],
    [
      'HOOK (0–3s): "Resin is your biggest variable cost. Most plants track it by the bag. Not by the part."',
      'PROBLEM (3–12s): Part-level material tracking reveals where waste occurs: over-packed parts, excessive runner weight, high purge volumes during changeovers.',
      'INSIGHT (12–22s): Plants that track material yield per part vs. theoretical yield see 15–25% improvement in material efficiency within 90 days.',
      'FIX (22–35s): Shot weight monitoring + material yield KPIs + runner weight tracking = full visibility into where resin is going.',
      'CTA (35–45s): "Link in bio: material yield audit from PMT."',
    ],
    [
      'HOOK (0–3s): "Your changeover procedure is destroying resin. Here\'s what to track."',
      'PROBLEM (3–12s): Purge waste during material changeovers is often the most overlooked material cost in injection molding. A poor purge procedure wastes 50–200 lbs of resin per changeover.',
      'INSIGHT (12–22s): Structured purge procedures — proper sequence, temperature management, mechanical purging compounds — cut purge waste by 40–70%.',
      'FIX (22–35s): Document your purge procedures per material pair. Test and refine them. Track purge weight per changeover.',
      'CTA (35–45s): "DM us PURGE for our changeover procedure template."',
    ],
  ],
  'process-cost-leakage': [
    [
      'HOOK (0–3s): "You quoted $1.85/part. You\'re running at $2.30/part. Where did $0.45 go?"',
      'PROBLEM (3–12s): Process cost leakage in injection molding is rarely one big problem. It\'s 8–12 small ones: cycle time drift, scrap rate creep, overtime due to quality holds, rework labor, material over-usage.',
      'INSIGHT (12–22s): The average injection molding plant has 8–12% of revenue leaking through process inefficiency. It doesn\'t show up in a single line item.',
      'FIX (22–35s): Per-part cost tracking — not just job-level — reveals which presses, tools, and operators are driving cost overruns.',
      'CTA (35–45s): "What\'s your biggest hidden cost right now? Comment below."',
    ],
    [
      'HOOK (0–3s): "Process cost leakage isn\'t one problem. It\'s twelve small ones that nobody owns."',
      'PROBLEM (3–12s): In most injection molding plants, cost overruns are attributed to material cost or labor. The actual drivers are process: cycle time drift, quality holds, excessive rework, changeover overruns.',
      'INSIGHT (12–22s): Systematic process cost tracking at the press level — not just the job level — identifies which operations are running above standard.',
      'FIX (22–35s): Standard cost models per part + variance tracking per press = visibility into where margin is actually going.',
      'CTA (35–45s): "Link in bio: process cost audit framework from PMT."',
    ],
    [
      'HOOK (0–3s): "The most expensive thing in your plant might be the jobs you\'re quoting wrong."',
      'PROBLEM (3–12s): Quoting based on estimated cycle time and assumed scrap rates without historical data means every job is a guess.',
      'INSIGHT (12–22s): Plants that track actual vs. quoted cycle times, scrap rates, and changeover durations quote 15–20% more accurately — and win better-margin jobs.',
      'FIX (22–35s): Historical job performance data + updated standard costs = quotes that reflect reality, not optimism.',
      'CTA (35–45s): "What\'s your quote accuracy rate? Comment below."',
    ],
  ],
  'tooling-lifecycle-cost': [
    [
      'HOOK (0–3s): "You spent $80,000 on a mold. How much will you spend before it\'s retired? Do you know?"',
      'PROBLEM (3–12s): Total tooling lifecycle cost includes: initial build, preventive maintenance, repairs, modifications, and eventual replacement. Most plants track the first number and guess the rest.',
      'INSIGHT (12–22s): Total lifecycle cost for a production mold typically runs 2–4× the original build cost over its life. Most of that is avoidable.',
      'FIX (22–35s): Tooling lifecycle models — tracking shot counts, maintenance history, repair costs — show exactly when maintenance ROI turns negative and rebuild becomes the better option.',
      'CTA (35–45s): "How do you track total cost of ownership for your tools? Comment below."',
    ],
    [
      'HOOK (0–3s): "Reactive tooling management costs 3× more than preventive. Here\'s the math."',
      'PROBLEM (3–12s): Emergency mold repairs cost 2–3× more than planned maintenance. Plus: production disruption, expediting costs, and customer impact.',
      'INSIGHT (12–22s): Plants that run structured preventive maintenance programs spend an average of 35% less on tooling per year than reactive environments.',
      'FIX (22–35s): Maintenance cost tracking per tool — not just per job — reveals which molds are approaching the point where replacement beats repair.',
      'CTA (35–45s): "Link in bio: tooling cost of ownership calculator from PMT."',
    ],
    [
      'HOOK (0–3s): "Your cheapest mold build might be your most expensive mold."',
      'PROBLEM (3–12s): Low-cost tooling cuts corners on steel quality, cooling design, and surface finish. These decisions compound over the mold\'s life into higher maintenance costs and shorter tool life.',
      'INSIGHT (12–22s): A $40,000 mold with poor cooling design will cost more per part over 500,000 shots than a $65,000 mold with optimized cooling and P20 steel.',
      'FIX (22–35s): Total cost of ownership modeling at the quoting stage — not just build cost — reveals which tooling investment actually costs less.',
      'CTA (35–45s): "What steel do your production tools run? Comment below."',
    ],
  ],
}

const CAROUSEL_OUTLINES: Record<string, string> = {
  'injection-molding-defects': `SLIDE 1 (COVER): "Why Your Defect Rate Won't Drop Below 3%" — Bold stat, PMT logo\nSLIDE 2: The 3 most common defects in injection molding (sink marks, flash, short shots) — one per callout\nSLIDE 3: Root cause #1 — Process parameter drift between shifts\nSLIDE 4: Root cause #2 — Tool wear that hasn't been tracked\nSLIDE 5: Root cause #3 — Material handling errors upstream\nSLIDE 6: What real-time process monitoring catches (with data)\nSLIDE 7 (CTA): "Your defect rate tells the story of your process. Let's read it together." — PMT contact`,
  'tooling-failures': `SLIDE 1 (COVER): "5 Warning Signs Your Mold Will Fail This Month" — Bold, PMT logo\nSLIDE 2: Warning sign #1 — Flash appearing on parting lines\nSLIDE 3: Warning sign #2 — Cycle time creeping up without process changes\nSLIDE 4: Warning sign #3 — Ejector pin drag or marks on parts\nSLIDE 5: Warning sign #4 — Surface roughness increasing in cavity\nSLIDE 6: Warning sign #5 — Cooling imbalance causing part warpage\nSLIDE 7 (CTA): "Don't wait for the failure. Catch it here." — PMT contact`,
  'production-bottlenecks': `SLIDE 1 (COVER): "Where Is Your Plant Losing 23% of Capacity?" — Stat-forward, PMT logo\nSLIDE 2: Bottleneck type 1 — Changeover time (avg. 4–6 hours vs. 90-min benchmark)\nSLIDE 3: Bottleneck type 2 — Material prep and staging delays\nSLIDE 4: Bottleneck type 3 — Downstream QC and secondary ops backup\nSLIDE 5: What value stream mapping reveals in a single production cell\nSLIDE 6: The 3 fastest wins for reclaiming lost capacity\nSLIDE 7 (CTA): "Know where your capacity is going. Start here." — PMT contact`,
  'scrap-rework-cost': `SLIDE 1 (COVER): "$380K/Year in Scrap. Where Is It Coming From?" — PMT logo\nSLIDE 2: Scrap source #1 — Process parameter drift (most common, least tracked)\nSLIDE 3: Scrap source #2 — Tool wear (visible in part quality before failure)\nSLIDE 4: Scrap source #3 — Material inconsistency and handling errors\nSLIDE 5: Why defect coding that tracks type (not cause) doesn't drive improvement\nSLIDE 6: Root cause scrap analysis — what to track and how\nSLIDE 7 (CTA): "Your scrap bin has a story. Let's figure out what it's saying." — PMT contact`,
  'mold-downtime': `SLIDE 1 (COVER): "Unplanned Mold Downtime: $175K/Year You Don't Have to Spend" — PMT logo\nSLIDE 2: Downtime cause #1 — Mechanical failure (parting line, ejection system)\nSLIDE 3: Downtime cause #2 — Cooling system fouling and flow restriction\nSLIDE 4: Downtime cause #3 — Maintenance intervals based on calendar not shot counts\nSLIDE 5: What leading indicators to track before failure\nSLIDE 6: The economics: planned vs. unplanned maintenance cost comparison\nSLIDE 7 (CTA): "Build your maintenance program before you need it." — PMT contact`,
  'poor-part-consistency': `SLIDE 1 (COVER): "Why Shot 4,000 Doesn't Look Like Shot 1" — PMT logo\nSLIDE 2: Consistency killer #1 — Mold temperature variation across a long run\nSLIDE 3: Consistency killer #2 — Pack pressure drift over cavity fill\nSLIDE 4: Consistency killer #3 — No in-process dimensional checks mid-run\nSLIDE 5: What Cpk actually tells you about your process\nSLIDE 6: The 3 process controls that hold tight tolerances over long runs\nSLIDE 7 (CTA): "Tight tolerances don't happen by accident." — PMT contact`,
  'scaling-inefficiencies': `SLIDE 1 (COVER): "You Don't Need More Presses. You Need Better OEE." — PMT logo\nSLIDE 2: OEE component 1 — Availability (changeover + downtime losses)\nSLIDE 3: OEE component 2 — Performance (cycle time vs. standard)\nSLIDE 4: OEE component 3 — Quality (first-pass yield rate)\nSLIDE 5: What 10% OEE improvement equals in production volume\nSLIDE 6: The 3-step process before you add a press\nSLIDE 7 (CTA): "Scale your process before you scale your footprint." — PMT contact`,
  'material-waste': `SLIDE 1 (COVER): "Your Resin Budget Has a Leak. Here's Where to Look." — PMT logo\nSLIDE 2: Waste source #1 — Runner weight vs. part weight ratio (cold runner systems)\nSLIDE 3: Waste source #2 — Purge waste during material changeovers\nSLIDE 4: Waste source #3 — Defect-driven scrap using virgin resin\nSLIDE 5: Material yield tracking — what to measure and how\nSLIDE 6: Hot runner ROI: when the investment pays back\nSLIDE 7 (CTA): "Know your material yield per part. Start there." — PMT contact`,
  'process-cost-leakage': `SLIDE 1 (COVER): "8 Places Your Process Is Leaking Margin" — PMT logo\nSLIDE 2: Leak #1 — Cycle time running above standard (untracked)\nSLIDE 3: Leak #2 — Scrap rate above quote assumption\nSLIDE 4: Leak #3 — Overtime from quality holds and rework\nSLIDE 5: Leak #4 — Changeover time over standard\nSLIDE 6: Leak #5–8 — Material over-usage, secondary ops, expediting, non-conformance\nSLIDE 7 (CTA): "Every one of these is fixable. Most aren't tracked." — PMT contact`,
  'tooling-lifecycle-cost': `SLIDE 1 (COVER): "Your Mold Cost 3× More Than You Think" — PMT logo\nSLIDE 2: Cost component 1 — Initial build cost (what you track)\nSLIDE 3: Cost component 2 — Preventive maintenance over tool life\nSLIDE 4: Cost component 3 — Unplanned repairs (2–3× more expensive than planned)\nSLIDE 5: Cost component 4 — Modifications and engineering changes\nSLIDE 6: Cost component 5 — Lost production during downtime events\nSLIDE 7 (CTA): "Total cost of ownership starts at the design stage." — PMT contact`,
}

const CAPTIONS: Record<string, string[]> = {
  'injection-molding-defects': [
    `Most injection molding defects aren't random. They're the output of a process that's drifting and nobody's watching.\n\nSink marks. Flash. Short shots. Each one has a root cause, and each root cause is detectable before it becomes a reject.\n\nThe plants that hold defect rates under 2% aren't using better materials. They're using better process control.\n\nSwipe to see the 3 root causes most teams miss — and what to track instead.\n\n#InjectionMolding #ProcessControl #QualityManufacturing #PlasticsMolding #ManufacturingOps`,
    `Your defect rate is a process report card.\n\nIf it's above 3%, something upstream is drifting — and you're catching it at inspection instead of at the source.\n\nParameter drift between shifts is the most common cause. Most plants don't log what changed. They just flag the defects.\n\nSwipe to see what real-time process monitoring catches before the reject bin fills.\n\n#InjectionMolding #DefectReduction #ManufacturingExcellence #QualityControl #PMT`,
    `The most expensive defect is the one you didn't catch until it was already in 3,000 parts.\n\nProcess parameter drift is invisible until it isn't. Temperature shifts 5°. Pressure drifts 200 psi. Nobody logs it. The reject bin tells the story three shifts later.\n\nPMT runs process monitoring on every cycle. Drift triggers an alert before it becomes a defect event.\n\nLink in bio to see how we do it.\n\n#PlasticMolding #DefectPrevention #ManufacturingOps #QualityManagement #InjectionMolding`,
  ],
  'tooling-failures': [
    `Tooling failures feel sudden. They almost never are.\n\nThe warning signs are there — flash on parting lines, cycle time creeping up, surface quality degrading. Most teams don't track them until they're pulling a broken mold off the press.\n\nPreventive maintenance tied to shot counts, not calendar dates, cuts unplanned failures by 40–60%.\n\nSwipe to see the 5 warning signs to watch.\n\n#InjectionMolding #MoldMaintenance #ToolingManagement #ManufacturingOps #PMT`,
    `An emergency mold repair costs 2–3× more than planned maintenance. Plus: production disruption, customer delays, expediting costs.\n\nThe math on preventive maintenance is not complicated. The discipline is the hard part.\n\nShot-count-based PM intervals are the most reliable system for high-volume production tools.\n\nSwipe to see the 5 indicators that tell you when maintenance is overdue.\n\n#MoldMaintenance #ToolingFailure #InjectionMolding #ManufacturingCosts #PMT`,
    `Your cheapest mold build might be your most expensive mold.\n\nLow-cost tooling compromises on steel selection, cooling design, and surface treatment. Those compromises compound over 500,000 shots into higher maintenance frequency, shorter life, and worse part quality.\n\nTotal cost of ownership — not build cost — is the right metric for tooling decisions.\n\nLink in bio: PMT's tooling lifecycle guide.\n\n#InjectionMolding #MoldDesign #ToolingCost #ManufacturingROI #PMT`,
  ],
  'production-bottlenecks': [
    `Every minute of press idle time has a dollar value. Most plants don't track it.\n\nChangeover. Material staging. Downstream QC backup. These are where capacity disappears — not in the molding cycle itself.\n\nA 30-minute reduction in daily changeover time across 5 presses = $220K/year in reclaimed capacity. No capital required.\n\nSwipe to see where production capacity actually leaks.\n\n#InjectionMolding #ProductionEfficiency #OEE #ManufacturingOps #PMT`,
    `23% of injection molding capacity is lost to bottlenecks most plants can't identify.\n\nThe bottleneck is rarely the press. It's usually changeover, material handling, or downstream staging.\n\nValue stream mapping across the full production cell — not just the press — shows where time is actually going.\n\nSwipe to see the 3 most common capacity leaks.\n\n#LeanManufacturing #InjectionMolding #CapacityOptimization #ProductionOps #PMT`,
    `You could run 10% more parts without adding a press. Here's what's standing in the way.\n\nChangeover inefficiency. Job sequencing waste. Idle time between runs. These don't show up in machine utilization reports unless you're tracking them at the press level.\n\nOEE tracking makes hidden capacity visible. It's the first step before any capital investment decision.\n\nLink in bio: PMT's capacity audit framework.\n\n#OEE #InjectionMolding #ManufacturingEfficiency #CapacityPlanning #PMT`,
  ],
  'scrap-rework-cost': [
    `Your scrap bin is a profit statement. What's it saying?\n\nAt $380K/year in average scrap costs for a mid-size injection molder, this isn't a quality metric — it's a financial one.\n\nMost plants track defect type. The plants that drive scrap down track defect cause. That one shift changes everything.\n\nSwipe to see root cause scrap analysis in practice.\n\n#InjectionMolding #ScrapReduction #QualityCost #ManufacturingOps #PMT`,
    `Rework is a tax on poor process control.\n\nEvery part that goes back through secondary ops represents a failure upstream that wasn't caught at the source.\n\nFirst-pass yield by press, by operator, by tool tells you exactly where the tax is being collected.\n\nSwipe to see how to build a first-pass yield tracking system.\n\n#FirstPassYield #ReworkReduction #InjectionMolding #QualityManagement #PMT`,
    `Three parts. All defective. Three different causes. Most plants log all three the same way.\n\nDefect coding that only captures the defect type — not the process root cause — can't drive improvement. You end up with data that tells you what failed, not why.\n\nCause-based scrap tracking + pareto analysis = 20–40% scrap reduction in 90 days.\n\nLink in bio: PMT's scrap tracking template.\n\n#ScrapAnalysis #InjectionMolding #QualityImprovement #ManufacturingData #PMT`,
  ],
  'mold-downtime': [
    `Unplanned mold downtime doesn't announce itself. But it always leaves clues.\n\nFlash appearing on a parting line. Cycle time climbing without process changes. Ejector pins dragging. These are not random events — they're measurable precursors.\n\nPlants that track leading indicators experience 60% fewer unplanned downtime events.\n\nSwipe to see the 5 indicators to track.\n\n#MoldMaintenance #InjectionMolding #PreventiveMaintenance #ManufacturingOps #PMT`,
    `$175K/year. That's the average cost of unplanned mold downtime in a reactive maintenance environment.\n\nThe alternative isn't zero downtime. It's planned downtime — scheduled around production, at a cost of 35–50% less.\n\nShot-count-based maintenance intervals make downtime predictable and manageable.\n\nSwipe to see the economics of planned vs. unplanned maintenance.\n\n#ToolingMaintenance #InjectionMolding #MaintenanceCost #ManufacturingROI #PMT`,
    `The difference between planned downtime and unplanned downtime is about $15,000 per event.\n\nEmergency repairs cost more in parts, labor, and expediting. They also cost you production hours you can't schedule around.\n\nBuilding a PM program before you need it is the highest-ROI maintenance decision you can make.\n\nLink in bio: PMT's mold maintenance guide.\n\n#InjectionMolding #MoldDowntime #PreventiveMaintenance #ManufacturingOps #PMT`,
  ],
  'poor-part-consistency': [
    `Shot 1 passed inspection. Shot 4,000 didn't. Same tool. Same machine. What changed?\n\nMold temperature variation is the most common driver of dimensional drift in long production runs. A 5°F swing can shift critical dimensions by 0.002".\n\nProcess control that holds parameters across a full run — not just at startup — is what separates consistent from inconsistent production.\n\nSwipe to see the 3 controls that matter most.\n\n#InjectionMolding #PartConsistency #ProcessControl #QualityManufacturing #PMT`,
    `Inconsistent parts aren't a quality problem. They're a process control problem.\n\nWhen Cpk is below 1.33, the process can't reliably hold the specified tolerance. No amount of inspection changes that.\n\nProcess capability studies reveal which parameters to tighten. Control charts keep them there.\n\nSwipe to see what drives part-to-part variation in injection molding.\n\n#ProcessCapability #Cpk #InjectionMolding #QualityControl #PMT`,
    `Your customer's incoming inspection failed 2% of your last shipment. You thought you shipped zero defects.\n\nMeasurement system disagreements happen when your inspection process and your customer's don't align. MSA — gauge R&R studies — close that gap before it becomes a return.\n\nLink in bio: PMT's part consistency guide.\n\n#GaugeRR #MSA #InjectionMolding #QualityAssurance #PMT`,
  ],
  'scaling-inefficiencies': [
    `Adding a press doesn't scale your operation. Fixing your process does.\n\nCapital investment without process improvement scales your existing inefficiency. A 15% OEE gain is equivalent to adding a press — without the capital outlay.\n\nOEE (availability × performance × quality) makes hidden capacity visible before you write a check for new equipment.\n\nSwipe to see what OEE improvement looks like in practice.\n\n#OEE #InjectionMolding #CapacityOptimization #ManufacturingROI #PMT`,
    `You just won a contract 3× your current largest job. Can you actually run it?\n\nScaling limits in injection molding show up in three places: press capacity, tooling investment, and quality system bandwidth.\n\nThe plants that scale without chaos built systems before they needed them.\n\nSwipe to see the 3-step process before you add capacity.\n\n#ManufacturingScale #InjectionMolding #CapacityPlanning #OperationalExcellence #PMT`,
    `The fastest path to more capacity is fewer losses in existing capacity.\n\nChangeover efficiency, scrap reduction, and cycle time optimization together can free 15–20% of existing press capacity without a dollar of capital investment.\n\nSwipe to see where capacity typically leaks — and how to get it back.\n\n#LeanManufacturing #InjectionMolding #ProductionCapacity #ManufacturingOps #PMT`,
  ],
  'material-waste': [
    `How much resin did you throw away last month? Do you actually know?\n\nRunner waste. Purge waste. Defect-driven scrap. Three separate material cost leaks — most plants track none of them at the part level.\n\nMaterial yield per part vs. theoretical yield is the metric that surfaces waste before it compounds.\n\nSwipe to see where resin waste actually occurs.\n\n#InjectionMolding #MaterialWaste #ResinCost #ManufacturingCosts #PMT`,
    `Runner waste is silent. It doesn't look like scrap. It looks like normal production.\n\nIn cold runner systems, runner weight can represent 15–30% of total shot weight. That's 15–30% of your material cost running in a circle.\n\nHot runner systems eliminate this. The ROI is typically 12–24 months on moderate-volume production.\n\nSwipe to see the material waste breakdown by source.\n\n#HotRunner #InjectionMolding #MaterialCost #ManufacturingROI #PMT`,
    `Your changeover procedure is destroying resin. Here's what to track.\n\nPoor purge procedures during material changeovers waste 50–200 lbs of resin per event. Multiply that by 100 changeovers/year and you have a six-figure material cost that's entirely avoidable.\n\nStructured purge procedures + purge weight tracking per changeover = 40–70% reduction in purge waste.\n\nLink in bio: PMT's changeover purge guide.\n\n#MaterialWaste #InjectionMolding #PurgeReduction #ManufacturingOps #PMT`,
  ],
  'process-cost-leakage': [
    `You quoted $1.85/part. You're running at $2.30/part. Where did $0.45 go?\n\nProcess cost leakage is rarely one big problem. It's 8–12 small ones: cycle time drift, scrap creep, overtime from quality holds, rework labor, material over-usage.\n\nPer-part cost tracking — not job-level tracking — reveals exactly which operations are running above standard.\n\nSwipe to see the 8 most common process cost leaks.\n\n#InjectionMolding #ProcessCost #MarginLeakage #ManufacturingOps #PMT`,
    `The most expensive thing in your plant might be the jobs you're quoting wrong.\n\nQuoting based on assumed cycle time and estimated scrap rate without historical data is guessing. The gap between quoted cost and actual cost accumulates silently across hundreds of jobs.\n\nHistorical job performance data + updated standard costs = quotes that reflect reality.\n\nSwipe to see how to build a process cost tracking system.\n\n#Quoting #InjectionMolding #CostAccuracy #ManufacturingData #PMT`,
    `Process cost leakage isn't one problem. It's twelve small ones that nobody owns.\n\nCycle time drift. Quality holds. Changeover overruns. Rework labor. Each one is below the threshold that triggers a formal corrective action — but together they're erasing margin on every run.\n\nOwnership + tracking = improvement. That's the full system.\n\nLink in bio: PMT's process cost audit.\n\n#ProcessImprovement #InjectionMolding #CostReduction #ManufacturingOps #PMT`,
  ],
  'tooling-lifecycle-cost': [
    `You spent $80,000 on a mold. How much will you spend before it's retired?\n\nTotal tooling lifecycle cost includes build, preventive maintenance, repairs, modifications, and eventual replacement. For most production molds, total lifecycle cost runs 2–4× the original build cost.\n\nTracking it from day one — not during the third emergency repair — is the difference.\n\nSwipe to see the full lifecycle cost breakdown.\n\n#InjectionMolding #ToolingCost #TotalCostOfOwnership #ManufacturingROI #PMT`,
    `Reactive tooling management costs 3× more than preventive. Here's the math.\n\nEmergency repair: 2–3× part cost vs. planned. Production disruption: 4–6 days vs. scheduled hours. Customer impact: unpredictable vs. managed.\n\nPlants with PM programs spend 35% less on tooling per year than reactive environments.\n\nSwipe to see the lifecycle cost comparison.\n\n#MoldMaintenance #InjectionMolding #ToolingROI #ManufacturingCost #PMT`,
    `Your cheapest mold might be your most expensive one.\n\nA $40,000 tool with poor steel selection and inadequate cooling will cost more per part over 500,000 shots than a $65,000 tool built right.\n\nTotal cost of ownership modeling at the quote stage — not after the first repair — is the right frame for tooling investment decisions.\n\nLink in bio: PMT's tooling TCO calculator.\n\n#MoldBuilding #InjectionMolding #ToolingInvestment #ManufacturingROI #PMT`,
  ],
}

const STORY_SEQUENCES: Record<string, string> = {
  'injection-molding-defects': `STORY 1 (Poll): "What's your current defect rate?" Options: Under 1% / 1–3% / 3–5% / Over 5%\nSTORY 2 (Stat): "The average injection molder runs a 3–5% defect rate. The top quartile runs under 1%."\nSTORY 3 (Question): "The difference? Real-time process monitoring vs. end-of-run inspection."\nSTORY 4 (CTA Slide): "Swipe up to see how PMT tracks process parameters every cycle." — Link to plasticmolding.com`,
  'tooling-failures': `STORY 1 (Poll): "How do you schedule mold maintenance?" Options: Calendar intervals / Shot count triggers / When something breaks / No formal schedule\nSTORY 2 (Stat): "Plants using shot-count PM intervals experience 60% fewer unplanned tooling failures."\nSTORY 3 (Question): "Are you tracking flash, cycle time drift, or ejector pin condition? These are your early warning system."\nSTORY 4 (CTA Slide): "Link in bio: PMT's tooling maintenance guide." — Link to plasticmolding.com`,
  'production-bottlenecks': `STORY 1 (Poll): "How long is your average changeover?" Options: Under 60 min / 1–2 hours / 2–4 hours / Over 4 hours\nSTORY 2 (Stat): "Best-in-class changeover: under 90 minutes. Industry average: 4–6 hours."\nSTORY 3 (Tip): "The bottleneck is rarely the press. Check material staging, downstream QC, and job sequencing first."\nSTORY 4 (CTA Slide): "Swipe up for PMT's bottleneck audit guide." — Link to plasticmolding.com`,
  'scrap-rework-cost': `STORY 1 (Poll): "How do you log scrap?" Options: By defect type / By root cause / By press and operator / We don't formally track\nSTORY 2 (Stat): "Average injection molder: $380K/year in scrap costs. Top quartile: under $80K."\nSTORY 3 (Insight): "Tracking root cause (not just defect type) is the single change that drives scrap down fastest."\nSTORY 4 (CTA Slide): "DM us SCRAP for our root cause tracking template." — Link to plasticmolding.com`,
  'mold-downtime': `STORY 1 (Poll): "How often does unplanned mold downtime hit your plant?" Options: Never / Monthly / Weekly / Multiple times/week\nSTORY 2 (Stat): "Reactive maintenance environments average 2–4 unplanned downtime events per month."\nSTORY 3 (Tip): "Track cycle time trends, flash appearance, and ejector resistance. These predict failure — usually 2–3 weeks out."\nSTORY 4 (CTA Slide): "Link in bio: PMT's mold maintenance guide." — Link to plasticmolding.com`,
  'poor-part-consistency': `STORY 1 (Poll): "What's your tightest tolerance in current production?" Options: ±0.001" / ±0.002–0.005" / ±0.005–0.010" / Over ±0.010"\nSTORY 2 (Stat): "Dimensional drift in long runs is most often caused by mold temperature variation — not tool wear."\nSTORY 3 (Tip): "In-process dimensional checks at 500-piece intervals catch drift before it reaches critical dimensions."\nSTORY 4 (CTA Slide): "DM us CONSISTENCY for our process control checklist." — Link to plasticmolding.com`,
  'scaling-inefficiencies': `STORY 1 (Poll): "What's your current OEE?" Options: Over 85% / 70–85% / 55–70% / Under 55% / Don't track\nSTORY 2 (Stat): "Average injection molding OEE: 65%. A 10% improvement equals the output of a full additional press."\nSTORY 3 (Tip): "Optimize OEE before adding capacity. Capital investment into a 65% OEE environment returns less than fixing the 65%."\nSTORY 4 (CTA Slide): "Link in bio: PMT's capacity audit guide." — Link to plasticmolding.com`,
  'material-waste': `STORY 1 (Poll): "Do you track material yield per part?" Options: Yes, by part / Yes, by job / No, by resin lot / Not formally\nSTORY 2 (Stat): "Cold runner systems waste 15–30% of shot weight in runners and sprues. That's 15–30% of material cost with zero added value."\nSTORY 3 (Tip): "Hot runner ROI calculation: (runner weight × shots/year × resin cost/lb) ÷ hot runner system cost = payback period."\nSTORY 4 (CTA Slide): "DM us MATERIAL for our waste audit template." — Link to plasticmolding.com`,
  'process-cost-leakage': `STORY 1 (Poll): "Do you track actual vs. quoted cycle time by job?" Options: Yes, every job / Some jobs / No / We're working on it\nSTORY 2 (Stat): "The average injection molder has 8–12% of revenue leaking through process inefficiency. Most of it isn't in one line item."\nSTORY 3 (Tip): "Per-part cost variance tracking — not job-level — reveals which presses and tools are running above standard."\nSTORY 4 (CTA Slide): "Link in bio: PMT's process cost audit framework." — Link to plasticmolding.com`,
  'tooling-lifecycle-cost': `STORY 1 (Poll): "Do you track total tooling lifecycle cost?" Options: Yes, per mold / Partially / Only initial build cost / No formal tracking\nSTORY 2 (Stat): "Total lifecycle cost for a production mold typically runs 2–4× the original build cost over its life."\nSTORY 3 (Tip): "Track maintenance cost per mold from day one. The curve tells you exactly when rebuild becomes cheaper than repair."\nSTORY 4 (CTA Slide): "DM us TOOLING for our lifecycle cost tracker." — Link to plasticmolding.com`,
}

const IMPROVEMENT_SUGGESTIONS: Record<string, string[]> = {
  'injection-molding-defects': [
    'Add defect rate benchmark (top quartile vs. average) to anchor the urgency',
    'Include a specific process parameter (melt temperature range) to add technical credibility',
    'Close with a direct question to manufacturing operators — not a generic CTA',
  ],
  'tooling-failures': [
    'Cite a specific repair cost example ($15,000–$22,000 range) to make the financial impact concrete',
    'Name the 5 warning signs explicitly — don\'t tease them, list them',
    'Include shot-count trigger numbers (e.g., "PM at every 50,000 shots") for immediate applicability',
  ],
  'production-bottlenecks': [
    'Quantify the changeover time gap (industry average vs. benchmark) in the hook',
    'Use a dollar-per-hour machine rate ($85/hour) to convert time savings to revenue',
    'Ask a specific question about current changeover time to drive comments',
  ],
  'scrap-rework-cost': [
    'Use the $380K/year industry average as the opening anchor — it reframes the problem financially',
    'Distinguish between defect type tracking and root cause tracking — this is the key insight',
    'Include a first-pass yield benchmark (top quartile: 98.5%+) for comparison',
  ],
  'mold-downtime': [
    'Open with the cost comparison between planned and unplanned downtime ($15K delta per event)',
    'List the leading indicators explicitly — they are the actionable takeaway',
    'Close with a poll asking how often unplanned downtime occurs to drive engagement',
  ],
  'poor-part-consistency': [
    'Use a specific dimensional drift example (5°F = 0.002" shift) to make the technical point concrete',
    'Reference Cpk as the metric — most manufacturing engineers know it and it triggers credibility',
    'Suggest an in-process check interval (every 500 parts) to make the advice immediately actionable',
  ],
  'scaling-inefficiencies': [
    'Open with the OEE benchmark (average 65%, world-class 85%) to create urgency around the gap',
    'Convert the OEE improvement to press equivalents — "10% OEE gain = 1 additional press worth of output"',
    'Ask for current OEE in the CTA — it\'s a question most operations leaders know the answer to',
  ],
  'material-waste': [
    'Open with runner-to-part weight ratio as a percentage — it makes the waste visible immediately',
    'Include a hot runner payback calculation framework — it gives engineers something to act on',
    'Distinguish between runner waste, purge waste, and defect scrap — these have different solutions',
  ],
  'process-cost-leakage': [
    'Use the quoted vs. actual cost example ($1.85 vs. $2.30) — it makes the problem personal',
    'List all 8–12 cost leak categories explicitly — this is the credibility-building section',
    'Close by asking what their biggest hidden cost is — it\'s a question operators answer honestly',
  ],
  'tooling-lifecycle-cost': [
    'Open with the total lifecycle cost multiplier (2–4× build cost) — it reframes the investment immediately',
    'Compare reactive vs. preventive maintenance cost explicitly — the 3× number lands',
    'Include a low-cost vs. well-built mold TCO comparison to reframe the build cost decision',
  ],
}

const REPURPOSING: Record<string, string[]> = {
  default: [
    'Pull the hook as a Twitter/X single post with the stat as the visual anchor',
    'Use the carousel slides as LinkedIn post bullet points with a data-forward hook',
    'Turn the story sequence poll into a LinkedIn engagement question',
    'Extract the root cause section as a YouTube Shorts script (problem + fix format)',
    'Use the caption as a Facebook educational post with the PMT link appended',
  ],
}

export function generateInstagram(inputs: InstagramInputs, seed: number = 0): InstagramOutput {
  const problem = inputs.problem
  const data = PROBLEM_DATA[problem]
  const idx = seed % 3

  const visualHooks = VISUAL_HOOKS[problem] || VISUAL_HOOKS['injection-molding-defects']
  const reelScript = REEL_SCRIPTS[problem]?.[idx] || REEL_SCRIPTS['injection-molding-defects'][0]
  const carouselOutline = CAROUSEL_OUTLINES[problem] || CAROUSEL_OUTLINES['injection-molding-defects']
  const captions = CAPTIONS[problem] || CAPTIONS['injection-molding-defects']
  const storySequence = STORY_SEQUENCES[problem] || STORY_SEQUENCES['injection-molding-defects']
  const improvements = IMPROVEMENT_SUGGESTIONS[problem] || IMPROVEMENT_SUGGESTIONS['injection-molding-defects']
  const repurposing = REPURPOSING['default']

  const caption = captions[idx]
  const visualHook = visualHooks[idx]

  const hasDataPoints = !!(data.stat1 || data.stat2)
  const hasCTA = true
  const hasConsequence = !!data.consequence
  const wordCount = caption.split(' ').length

  const qualityScore = scoreContent(inputs, hasDataPoints, hasCTA, hasConsequence, wordCount)

  return {
    platform: 'instagram',
    contentFormat: inputs.contentFormat,
    visualHook,
    reelScript: reelScript.join('\n'),
    carouselOutline,
    caption,
    storySequence,
    suggestedVisuals: visualHooks,
    repurposingSuggestions: repurposing,
    qualityScore,
    improvementSuggestions: improvements,
    companyName: COMPANY.name,
  }
}
