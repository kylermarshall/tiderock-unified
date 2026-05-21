import type { QualityScore } from '../types';

export function scoreContent(content: {
  hasPain: boolean;
  hasFinancialConsequence: boolean;
  hasOperationalTension: boolean;
  hasClearCTA: boolean;
  hasSpecifics: boolean;
  hasContraryAngle: boolean;
  wordCount: number;
}): QualityScore {
  // Pain Clarity: does the content name a specific operational failure mode?
  const painClarity = content.hasPain
    ? content.hasSpecifics ? 92 : 76
    : 48;

  // Financial Impact: does the content tie to measurable cost, rework, or warranty exposure?
  const financialImpact = content.hasFinancialConsequence
    ? content.hasSpecifics ? 89 : 71
    : content.hasOperationalTension ? 62 : 44;

  // Operational Tension: does the content challenge an assumption or create urgency?
  const operationalTension = content.hasOperationalTension
    ? content.hasContraryAngle
      ? 94
      : content.hasSpecifics ? 84 : 73
    : 51;

  // CTA Strength: is the next step clear, specific, and low-friction?
  const ctaStrength = content.hasClearCTA
    ? content.hasSpecifics ? 88 : 81
    : 52;

  // Word count: substance bonus for well-developed content
  const wordBonus =
    content.wordCount > 200 && content.wordCount < 600 ? 3
    : content.wordCount >= 80 && content.wordCount <= 200 ? 1
    : 0;

  const overall = Math.min(99, Math.round((painClarity + financialImpact + operationalTension + ctaStrength) / 4 + wordBonus));

  let label = 'Needs Work';
  if (overall >= 88) label = 'High Performer';
  else if (overall >= 78) label = 'Strong';
  else if (overall >= 68) label = 'Good';
  else if (overall >= 58) label = 'Average';

  return { overall, painClarity, financialImpact, operationalTension, ctaStrength, label };
}

export function getImprovements(score: QualityScore): string[] {
  const improvements: string[] = [];

  if (score.painClarity < 78) {
    improvements.push('Sharpen the pain: name the specific failure mode — disbondment, dendritic growth, cracks at component leads. Specific failure mechanics score higher than general pain.');
  }
  if (score.financialImpact < 74) {
    improvements.push('Add a financial anchor: field return cost ($150–500/assembly), rework rate (2–6%), or the 10–20x cost ratio between coating investment and field return cost.');
  }
  if (score.operationalTension < 76) {
    improvements.push('Increase tension with a contrarian angle: challenge the assumption that visual inspection catches coating defects, or that the cheapest coating material is the most cost-effective choice.');
  }
  if (score.ctaStrength < 76) {
    improvements.push('Make the CTA more specific: name the next step (specification review, process assessment, lifecycle cost comparison) and link directly to SpecCoat.com.');
  }

  if (improvements.length === 0) {
    improvements.push('Content is performing at a high level. Consider testing a more specific failure scenario — named industry, named environment, or specific failure mode — for higher engagement with targeted audiences.');
  }

  return improvements;
}
