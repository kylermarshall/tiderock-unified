import { Linkedin, Zap } from 'lucide-react'

export default function Header() {
  return (
    <header className="bg-slate-900 border-b border-slate-800">
      <div className="max-w-screen-2xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-blue-600">
            <Zap className="w-5 h-5 text-white" fill="currentColor" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-white font-semibold text-sm tracking-tight">Premier LogiTech</span>
              <span className="hidden sm:inline-block text-slate-500 text-xs">|</span>
              <span className="hidden sm:inline-block text-slate-400 text-xs font-medium">B2B LinkedIn Content Engine</span>
            </div>
            <p className="text-slate-500 text-xs mt-0.5 hidden sm:block">
              Technology Lifecycle &amp; Supply Chain Solutions
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden md:block text-slate-400 text-xs text-right leading-tight max-w-xs">
            Reduce cost leakage. Fix inefficiencies. Improve operational visibility.
          </span>
          <a
            href="https://www.linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium px-3 py-2 rounded-lg transition-colors"
          >
            <Linkedin className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">LinkedIn</span>
          </a>
        </div>
      </div>
    </header>
  )
}
