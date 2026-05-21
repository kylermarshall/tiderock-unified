import { useState } from 'react'
import type { Platform } from './lib/types'
import { LinkedInPanel } from './components/LinkedInPanel'
import { YouTubePanel } from './components/YouTubePanel'
import { TwitterPanel } from './components/TwitterPanel'
import { InstagramPanel } from './components/InstagramPanel'
import { FacebookPanel } from './components/FacebookPanel'
import clsx from 'clsx'

interface PlatformConfig {
  id: Platform
  label: string
  icon: string
  color: string
  activeClass: string
  iconBg: string
}

const PLATFORMS: PlatformConfig[] = [
  {
    id: 'linkedin',
    label: 'LinkedIn',
    icon: 'in',
    color: '#0A66C2',
    activeClass: 'bg-[#0A66C2] text-white border-[#0A66C2]',
    iconBg: 'bg-[#0A66C2]',
  },
  {
    id: 'youtube',
    label: 'YouTube',
    icon: '▶',
    color: '#FF0000',
    activeClass: 'bg-[#FF0000] text-white border-[#FF0000]',
    iconBg: 'bg-[#FF0000]',
  },
  {
    id: 'twitter',
    label: 'X / Twitter',
    icon: '𝕏',
    color: '#000000',
    activeClass: 'bg-slate-900 text-white border-slate-900',
    iconBg: 'bg-slate-900',
  },
  {
    id: 'instagram',
    label: 'Instagram',
    icon: '📷',
    color: '#E1306C',
    activeClass: 'bg-gradient-to-r from-purple-600 to-pink-500 text-white border-pink-500',
    iconBg: 'bg-gradient-to-br from-purple-600 to-pink-500',
  },
  {
    id: 'facebook',
    label: 'Facebook',
    icon: 'f',
    color: '#1877F2',
    activeClass: 'bg-[#1877F2] text-white border-[#1877F2]',
    iconBg: 'bg-[#1877F2]',
  },
]

export default function App() {
  const [platform, setPlatform] = useState<Platform>('linkedin')

  function handleConvert(to: Platform) {
    setPlatform(to)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const activePlatform = PLATFORMS.find(p => p.id === platform)!

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-brand-700 flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <rect x="1" y="1" width="5" height="5" rx="1" fill="white" />
              <rect x="8" y="1" width="5" height="5" rx="1" fill="white" fillOpacity="0.6" />
              <rect x="1" y="8" width="5" height="5" rx="1" fill="white" fillOpacity="0.6" />
              <rect x="8" y="8" width="5" height="5" rx="1" fill="white" />
            </svg>
          </div>
          <div>
            <h1 className="text-sm font-bold text-slate-900 leading-none">Premier Packaging</h1>
            <p className="text-xs text-slate-400 leading-none mt-0.5">Content Engine</p>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500">
          <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block"></span>
          All platforms active
        </div>
      </header>

      {/* Platform tabs */}
      <div className="bg-white border-b border-slate-200 px-4 sm:px-6">
        <div className="flex gap-1 overflow-x-auto py-2">
          {PLATFORMS.map(p => (
            <button
              key={p.id}
              onClick={() => setPlatform(p.id)}
              className={clsx(
                'flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold whitespace-nowrap transition-all duration-150 shrink-0',
                platform === p.id
                  ? p.activeClass
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300',
              )}
            >
              <span className={clsx(
                'w-5 h-5 rounded flex items-center justify-center text-xs font-bold',
                platform === p.id ? 'bg-white bg-opacity-20 text-white' : p.iconBg + ' text-white',
              )}>
                {p.icon}
              </span>
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Platform label bar */}
      <div
        className="px-6 py-2 flex items-center gap-2 border-b border-slate-100"
        style={{ background: activePlatform.color + '0a' }}
      >
        <div
          className="w-2 h-2 rounded-full"
          style={{ background: activePlatform.color }}
        />
        <span className="text-xs font-semibold" style={{ color: activePlatform.color }}>
          {activePlatform.label} Content Generator
        </span>
        <span className="text-xs text-slate-400">— Premier Packaging Solutions</span>
      </div>

      {/* Main content */}
      <main className="flex-1 p-4 sm:p-6 overflow-auto">
        {platform === 'linkedin' && <LinkedInPanel onConvert={handleConvert} />}
        {platform === 'youtube' && <YouTubePanel onConvert={handleConvert} />}
        {platform === 'twitter' && <TwitterPanel onConvert={handleConvert} />}
        {platform === 'instagram' && <InstagramPanel onConvert={handleConvert} />}
        {platform === 'facebook' && <FacebookPanel onConvert={handleConvert} />}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white px-6 py-3 text-xs text-slate-400 flex items-center justify-between shrink-0">
        <span>Premier Packaging Solutions — Content Engine</span>
        <a href="https://premierpackaging.com" className="hover:text-slate-600 transition-colors">premierpackaging.com</a>
      </footer>
    </div>
  )
}
