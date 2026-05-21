import type { QualityScore as QS } from '../types';

interface QualityScoreProps {
  score: QS;
}

function ScoreBar({ label, value }: { label: string; value: number }) {
  const color = value >= 85 ? '#4ADE80' : value >= 70 ? '#FACC15' : '#F87171';
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, fontSize: 12 }}>
        <span style={{ color: '#94A3B8' }}>{label}</span>
        <span style={{ color, fontWeight: 600 }}>{value}</span>
      </div>
      <div style={{ height: 4, background: '#1E2D45', borderRadius: 2 }}>
        <div style={{ height: 4, background: color, borderRadius: 2, width: `${value}%`, transition: 'width 0.4s ease' }} />
      </div>
    </div>
  );
}

export function QualityScore({ score }: QualityScoreProps) {
  const overallColor = score.overall >= 85 ? '#4ADE80' : score.overall >= 70 ? '#FACC15' : '#F87171';
  const bgColor = score.overall >= 85 ? '#0D4F29' : score.overall >= 70 ? '#2D2000' : '#2D0000';
  const borderColor = score.overall >= 85 ? '#1A7A3F' : score.overall >= 70 ? '#7A5C00' : '#7A0000';

  return (
    <div style={{ background: '#0F1E33', border: '1px solid #1E2D45', borderRadius: 10, padding: 20, marginBottom: 20 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <span style={{ fontWeight: 600, fontSize: 14 }}>Content Quality Score</span>
        <div style={{ background: bgColor, border: `1px solid ${borderColor}`, borderRadius: 20, padding: '4px 12px', display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ color: overallColor, fontWeight: 700, fontSize: 18 }}>{score.overall}</span>
          <span style={{ color: overallColor, fontSize: 12 }}>{score.label}</span>
        </div>
      </div>
      <ScoreBar label="Pain Clarity" value={score.painClarity} />
      <ScoreBar label="Financial Impact" value={score.financialImpact} />
      <ScoreBar label="Operational Tension" value={score.operationalTension} />
      <ScoreBar label="CTA Strength" value={score.ctaStrength} />
    </div>
  );
}
