export default function Header() {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
      <div className="max-w-screen-xl mx-auto px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-navy-800 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">SW</span>
          </div>
          <div>
            <span className="font-semibold text-slate-900 text-sm">Sea Wind Foods</span>
            <span className="text-slate-400 text-xs ml-2">Content Engine</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs text-slate-400">B2B · Seafood Supply · Foodservice</span>
          <a
            href="https://seawindfoods.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-blue-600 hover:text-blue-700 font-medium"
          >
            seawindfoods.com ↗
          </a>
        </div>
      </div>
    </header>
  )
}
