import { useState } from 'react';
import { Linkedin, Youtube, Twitter, Instagram, Facebook, type LucideIcon } from 'lucide-react';
import { LinkedInPlatform } from './platforms/LinkedInPlatform';
import { YouTubePlatform } from './platforms/YouTubePlatform';
import { TwitterPlatform } from './platforms/TwitterPlatform';
import { InstagramPlatform } from './platforms/InstagramPlatform';
import { FacebookPlatform } from './platforms/FacebookPlatform';
import type { Platform } from './types';

const PLATFORMS: { id: Platform; label: string; icon: LucideIcon }[] = [
  { id: 'linkedin', label: 'LinkedIn', icon: Linkedin },
  { id: 'youtube', label: 'YouTube', icon: Youtube },
  { id: 'twitter', label: 'Twitter/X', icon: Twitter },
  { id: 'instagram', label: 'Instagram', icon: Instagram },
  { id: 'facebook', label: 'Facebook', icon: Facebook },
];

export default function App() {
  const [activePlatform, setActivePlatform] = useState<Platform>('linkedin');

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'Inter, system-ui, sans-serif' }}>
      {/* Header */}
      <header style={{ borderBottom: '1px solid #1E2D45', padding: '16px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: 36, height: 36, background: '#1E6FD9', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 14 }}>SC</div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 18, letterSpacing: '-0.3px' }}>SpecCoat Content Engine</div>
            <div style={{ fontSize: 12, color: '#6B8CAE' }}>B2B Content for Conformal Coating &amp; Protective Solutions</div>
          </div>
        </div>
        <a href="https://speccoat.com" target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, color: '#1E6FD9', textDecoration: 'none' }}>speccoat.com</a>
      </header>

      {/* Platform Tabs */}
      <nav style={{ borderBottom: '1px solid #1E2D45', padding: '0 32px', display: 'flex', gap: 4 }}>
        {PLATFORMS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActivePlatform(id)}
            style={{
              display: 'flex', alignItems: 'center', gap: 8, padding: '14px 20px', background: 'none', border: 'none',
              borderBottom: activePlatform === id ? '2px solid #1E6FD9' : '2px solid transparent',
              color: activePlatform === id ? '#fff' : '#6B8CAE', cursor: 'pointer', fontSize: 14, fontWeight: activePlatform === id ? 600 : 400,
              transition: 'all 0.15s', marginBottom: -1,
            }}
          >
            <Icon size={16} />
            {label}
          </button>
        ))}
      </nav>

      {/* Platform Content */}
      <main style={{ padding: '32px' }}>
        {activePlatform === 'linkedin' && <LinkedInPlatform />}
        {activePlatform === 'youtube' && <YouTubePlatform />}
        {activePlatform === 'twitter' && <TwitterPlatform />}
        {activePlatform === 'instagram' && <InstagramPlatform />}
        {activePlatform === 'facebook' && <FacebookPlatform />}
      </main>
    </div>
  );
}
