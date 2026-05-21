import type { RegenerateMode } from '../types';

interface RegenerateButtonsProps {
  current: RegenerateMode;
  onChange: (mode: RegenerateMode) => void;
}

const MODES: { id: RegenerateMode; label: string }[] = [
  { id: 'direct', label: 'More Direct' },
  { id: 'executive', label: 'More Executive' },
  { id: 'contrarian', label: 'More Contrarian' },
  { id: 'shorter', label: 'Shorter' },
  { id: 'specific', label: 'More Specific' },
];

export function RegenerateButtons({ current, onChange }: RegenerateButtonsProps) {
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ fontSize: 12, color: '#6B8CAE', marginBottom: 8, fontWeight: 500 }}>REGENERATE</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {MODES.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => onChange(id)}
            style={{
              padding: '6px 14px', background: current === id ? '#1E6FD9' : '#1E2D45',
              border: `1px solid ${current === id ? '#1E6FD9' : '#2A3F5A'}`,
              borderRadius: 20, color: current === id ? '#fff' : '#94A3B8',
              cursor: 'pointer', fontSize: 12, fontWeight: current === id ? 600 : 400,
              transition: 'all 0.15s',
            }}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
