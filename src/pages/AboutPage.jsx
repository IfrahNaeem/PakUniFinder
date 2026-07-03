import { useNavigate } from 'react-router-dom'
import { GraduationCap, Code2, Database, BarChart2, Shield, ArrowRight } from 'lucide-react'

const STACK = [
  { icon: Code2,     name: 'React 19 + Vite',          desc: 'Fast, modern frontend' },
  { icon: Database,  name: 'HEC-sourced Data Layer',    desc: '15 universities, 20 campuses, 10 programs' },
  { icon: BarChart2, name: 'ML Scoring Engine',         desc: 'Weighted merit + classification (Safe / Target / Reach)' },
]

export default function AboutPage() {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen px-5 py-10" style={{ background: '#F1F5F9' }}>
      <div className="max-w-lg mx-auto flex flex-col gap-6">

        <div className="flex items-center gap-3">
          <GraduationCap size={32} style={{ color: '#1E293B' }} />
          <h1 className="text-2xl font-extrabold" style={{ color: '#1A202C' }}>About</h1>
        </div>

        <p className="text-sm leading-relaxed" style={{ color: '#4A5568' }}>
          <strong>Pakistan Uni Finder</strong> helps students discover universities that genuinely
          match their Matric/FSc grades, preferred city, budget, and field of interest. Rather than
          listing every university in the country, it narrows results using a merit-estimation model
          and classifies each match as <em>Safe</em>, <em>Target</em>, or <em>Reach</em>.
        </p>

        <div className="flex flex-col gap-3">
          <h2 className="font-bold text-base" style={{ color: '#1A202C' }}>Tech Stack</h2>
          {STACK.map((s) => {
            const Icon = s.icon
            return (
              <div key={s.name} className="bg-white rounded-xl p-4 flex items-center gap-3 border" style={{ borderColor: '#E2E8F0' }}>
                <Icon size={20} style={{ color: '#1E293B' }} />
                <div>
                  <p className="font-semibold text-sm" style={{ color: '#1A202C' }}>{s.name}</p>
                  <p className="text-xs" style={{ color: '#4A5568' }}>{s.desc}</p>
                </div>
              </div>
            )
          })}
        </div>

        <div className="rounded-xl p-4 flex items-start gap-3" style={{ background: '#EFF6FF' }}>
          <Shield size={18} style={{ color: '#1D4ED8', flexShrink: 0, marginTop: 2 }} />
          <p className="text-xs leading-relaxed" style={{ color: '#1D4ED8' }}>
            All data is sourced from publicly available HEC and university websites (2026).
            Merit cutoffs are historical estimates. This tool does not guarantee admission —
            always verify details directly with the university.
          </p>
        </div>

        <button
          onClick={() => navigate('/quiz')}
          className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-bold text-sm text-white"
          style={{ background: '#1E293B' }}
        >
          Find My University <ArrowRight size={16} />
        </button>
      </div>
    </div>
  )
}
