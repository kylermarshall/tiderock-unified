import { useState } from 'react';
import type { Platform } from '../types';

interface ConvertPlatformProps {
  currentPlatform: Platform;
  onConvert: (target: Platform) => void;
}

const PLATFORM_LABELS: Record<Platform, string> = {
  linkedin: 'LinkedIn', youtube: 'YouTube', twitter: 'Twitter/X',
  instagram: 'Instagram', facebook: 'Facebook',
};

export function ConvertPlatform({ currentPlatform, onConvert }: ConvertPlatformProps) {
  const [open, setOpen] = useState(false);
  const others = (['linkedin', 'youtube', 'twitter', 'instagram', 'facebook'] as Platform[]).filter(p => p !== currentPlatform);

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          padding: '8px 16px', background: '#1E2D45', border: '1px solid #2A3F5A',
          borderRadius: 6, color: '#94A3B8', cursor: 'pointer', fontSize: 12, fontWeight: 500,
        }}
      >
        Turn into another platform ▾
      </button>
      {open && (
        <div style={{
          position: 'absolute', top: '100%', left: 0, marginTop: 4,
          background: '#0F1E33', border: '1px solid #1E2D45', borderRadius: 8,
          padding: 8, zIndex: 100, minWidth: 160,
        }}>
          {others.map(p => (
            <button
              key={p}
              onClick={() => { onConvert(p); setOpen(false); }}
              style={{
                display: 'block', width: '100%', padding: '8px 12px', background: 'none',
                border: 'none', color: '#94A3B8', cursor: 'pointer', fontSize: 13,
                textAlign: 'left', borderRadius: 4,
              }}
              onMouseEnter={e => (e.currentTarget.style.background = '#1E2D45')}
              onMouseLeave={e => (e.currentTarget.style.background = 'none')}
            >
              {PLATFORM_LABELS[p]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
