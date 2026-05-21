import { useState, lazy, Suspense } from 'react'

const AduraApp         = lazy(() => import('./companies/adura/App'))
const PmtApp           = lazy(() => import('./companies/pmt/App'))
const FabconApp        = lazy(() => import('./companies/fabcon/App'))
const PrecisionApp     = lazy(() => import('./companies/precision/App'))
const ProactiveApp     = lazy(() => import('./companies/proactive/App'))
const SeawindApp       = lazy(() => import('./companies/seawind/App'))
const SpeccoatApp      = lazy(() => import('./companies/speccoat/App'))
const PremierPkgApp    = lazy(() => import('./companies/premier-packaging/App'))
const PremierLogiApp   = lazy(() => import('./companies/premier-logitech/App'))

const COMPANIES = [
  {
    id: 'adura',
    label: 'Adura LED',
    subtitle: 'Lighting Solutions',
    color: '#0EA5E9',
    abbr: 'AL',
    App: AduraApp,
  },
  {
    id: 'pmt',
    label: 'PMT',
    subtitle: 'Plastic Molding',
    color: '#8B5CF6',
    abbr: 'PM',
    App: PmtApp,
  },
  {
    id: 'fabcon',
    label: 'Fabcon',
    subtitle: 'Metal Fabrication',
    color: '#10B981',
    abbr: 'FB',
    App: FabconApp,
  },
  {
    id: 'precision',
    label: 'Precision',
    subtitle: 'CNC Machining',
    color: '#F59E0B',
    abbr: 'PR',
    App: PrecisionApp,
  },
  {
    id: 'proactive',
    label: 'Pro-Active',
    subtitle: 'PCB / EMS',
    color: '#EF4444',
    abbr: 'PA',
    App: ProactiveApp,
  },
  {
    id: 'seawind',
    label: 'Sea Wind',
    subtitle: 'Food Supply Chain',
    color: '#14B8A6',
    abbr: 'SW',
    App: SeawindApp,
  },
  {
    id: 'speccoat',
    label: 'SpecCoat',
    subtitle: 'Conformal Coating',
    color: '#1E6FD9',
    abbr: 'SC',
    App: SpeccoatApp,
  },
  {
    id: 'premier-pkg',
    label: 'Premier Pkg',
    subtitle: 'Packaging Solutions',
    color: '#1D4ED8',
    abbr: 'PP',
    App: PremierPkgApp,
  },
  {
    id: 'premier-logi',
    label: 'Premier LogiTech',
    subtitle: 'Supply Chain',
    color: '#7C3AED',
    abbr: 'PL',
    App: PremierLogiApp,
  },
] as const

type CompanyId = typeof COMPANIES[number]['id']

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center space-y-3">
        <div className="w-10 h-10 border-2 border-slate-300 border-t-slate-600 rounded-full animate-spin mx-auto" />
        <p className="text-slate-500 text-sm">Loading content engine…</p>
      </div>
    </div>
  )
}

export default function App() {
  const [activeId, setActiveId] = useState<CompanyId>('adura')

  const active = COMPANIES.find(c => c.id === activeId)!
  const ActiveApp = active.App

  return (
    <div className="min-h-screen bg-slate-50">
      {/* ── Tiderock company selector bar ── */}
      <div
        className="sticky top-0 z-50 border-b"
        style={{ background: '#0D1B2A', borderColor: '#1E2D45' }}
      >
        <div className="px-3 py-2 flex items-center gap-1.5 overflow-x-auto">
          {/* Brand mark */}
          <div className="flex items-center gap-2 pr-3 mr-1 border-r shrink-0" style={{ borderColor: '#1E2D45' }}>
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs text-white"
              style={{ background: '#1E6FD9' }}
            >
              TR
            </div>
            <span className="text-white font-semibold text-sm tracking-tight whitespace-nowrap">
              Tiderock
            </span>
          </div>

          {/* Company tabs */}
          {COMPANIES.map(c => (
            <button
              key={c.id}
              onClick={() => setActiveId(c.id)}
              title={c.subtitle}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all shrink-0 ${
                activeId === c.id
                  ? 'text-white shadow'
                  : 'text-slate-400 hover:text-white hover:bg-white/10'
              }`}
              style={activeId === c.id ? { background: c.color } : {}}
            >
              <span
                className="w-5 h-5 rounded flex items-center justify-center text-white font-bold text-[10px] shrink-0"
                style={{ background: activeId === c.id ? 'rgba(255,255,255,0.25)' : c.color }}
              >
                {c.abbr}
              </span>
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Active company content engine ── */}
      <Suspense fallback={<LoadingSpinner />}>
        <ActiveApp />
      </Suspense>
    </div>
  )
}
