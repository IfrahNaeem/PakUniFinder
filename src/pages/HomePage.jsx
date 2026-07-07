import { useNavigate } from 'react-router-dom'
import { CheckCircle2, Banknote, Home, ArrowRight, GraduationCap, Shield } from 'lucide-react'
import { ALL_UNIVERSITIES, ALL_CAMPUSES, ALL_PROGRAMS } from '../data/universities.js'
import { useLanguage } from '../context/LanguageContext.jsx'

// ─── Inline keyframes so no external CSS file is needed ───
const ANIM_STYLE = `
  @keyframes gradientShift {
    0%   { background-position: 0% 50%; }
    50%  { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes pulse-soft {
    0%, 100% { box-shadow: 0 0 0 0 rgba(37, 99, 235, 0.4); }
    50%       { box-shadow: 0 0 0 12px rgba(37, 99, 235, 0); }
  }
  .hero-bg {
    background: linear-gradient(135deg, #0F172A, #1E293B, #1E40AF, #2563EB);
    background-size: 300% 300%;
    animation: gradientShift 8s ease infinite;
  }
  .fade-up { animation: fadeUp 0.6s ease both; }
  .fade-up-1 { animation: fadeUp 0.6s 0.1s ease both; }
  .fade-up-2 { animation: fadeUp 0.6s 0.2s ease both; }
  .fade-up-3 { animation: fadeUp 0.6s 0.35s ease both; }
  .fade-up-4 { animation: fadeUp 0.6s 0.5s ease both; }
  .cta-pulse  { animation: pulse-soft 2.2s infinite; }
`

// ─── Feature cards data ────────────────────────────────────
const FEATURES = [
  {
    icon: CheckCircle2,
    color: '#2563EB',
    bg: 'rgba(37,99,235,0.12)',
    title: 'Match by Marks',
    desc: 'Enter your Matric & FSc percentage — we calculate your estimated merit and show only universities you can get into.',
    delay: 'fade-up-2',
  },
  {
    icon: Banknote,
    color: '#F39C12',
    bg: 'rgba(243,156,18,0.12)',
    title: 'See Real Fees',
    desc: 'Actual semester fees from HEC data — filter by your budget so no surprise after admission.',
    delay: 'fade-up-3',
  },
  {
    icon: Home,
    color: '#1E293B',
    bg: 'rgba(30,41,59,0.10)',
    title: 'Hostel Info',
    desc: 'Know if hostel is available, approximate monthly cost, and whether mess is included — before you apply.',
    delay: 'fade-up-4',
  },
]

const BADGES = [
  { label: 'Safe', bg: '#EFF6FF', color: '#1D4ED8' },
  { label: 'Target', bg: '#FEF9E7', color: '#B7770D' },
  { label: 'Reach', bg: '#FDEDEC', color: '#C0392B' },
]

export default function HomePage() {
  const navigate = useNavigate()
  const { t } = useLanguage()

  const stats = [
    { value: ALL_UNIVERSITIES.length, label: t('home.stat.unis') },
    { value: ALL_CAMPUSES.length,     label: t('home.stat.campus') },
    { value: ALL_PROGRAMS.length,     label: t('home.stat.progs') },
    { value: '2026',                  label: t('home.stat.updated') },
  ]

  return (
    <>
      <style>{ANIM_STYLE}</style>

      <div className="flex flex-col min-h-screen" style={{ background: '#F1F5F9', color: '#1A202C' }}>

        {/* ── HERO ──────────────────────────────────────────── */}
        <section className="hero-bg relative flex flex-col items-center justify-center text-center px-5 pt-16 pb-20 overflow-hidden">

          {/* Decorative blobs */}
          <div
            className="absolute top-[-60px] right-[-60px] w-64 h-64 rounded-full opacity-20 blur-3xl"
            style={{ background: '#2563EB' }}
          />
          <div
            className="absolute bottom-[-40px] left-[-40px] w-48 h-48 rounded-full opacity-15 blur-3xl"
            style={{ background: '#1E293B' }}
          />

          {/* Logo lockup */}
          <div className="fade-up flex items-center gap-2 mb-5">
            <span
              className="flex items-center justify-center w-11 h-11 rounded-xl"
              style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)' }}
            >
              <GraduationCap size={24} color="#ffffff" strokeWidth={1.8} />
            </span>
            <span className="text-sm font-semibold tracking-widest uppercase text-white opacity-80">
              Pakistan Uni Finder
            </span>
          </div>

          {/* Headline */}
          <h1 className="fade-up-1 text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight max-w-2xl">
            Find Your{' '}
            <span
              className="relative inline-block"
              style={{
                background: 'linear-gradient(90deg,#2563EB,#60A5FA)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Perfect University
            </span>
          </h1>

          {/* Sub-headline */}
          <p className="fade-up-2 mt-4 text-base sm:text-lg text-blue-100 max-w-lg leading-relaxed">
            Answer <strong className="text-white">5 quick questions</strong> — see universities,
            fees, tests, and hostel details matched{' '}
            <strong className="text-white">to YOU</strong>.
          </p>

          {/* Classification preview pills */}
          <div className="fade-up-3 flex items-center gap-2 mt-6">
            {BADGES.map((b) => (
              <span
                key={b.label}
                className="text-xs font-bold px-3 py-1 rounded-full"
                style={{ background: b.bg, color: b.color }}
              >
                {b.label}
              </span>
            ))}
            <span className="text-xs text-blue-200 ml-1">← your result categories</span>
          </div>

          {/* CTA button */}
          <button
            onClick={() => navigate('/quiz')}
            className="cta-pulse fade-up-4 mt-8 flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-white text-lg transition-transform duration-200 hover:scale-105 active:scale-95"
            style={{ background: '#2563EB', color: '#FFFFFF' }}
          >
            Start — Find My University
            <ArrowRight size={22} strokeWidth={2.5} />
          </button>

          <p className="fade-up-4 mt-4 text-xs text-blue-200 opacity-70">
            Free · No sign-up · Takes under 2 minutes
          </p>
        </section>

        {/* ── STATS BAR ─────────────────────────────────────── */}
        <section
          className="border-b"
          style={{ background: '#ffffff', borderColor: '#E2E8F0', borderTop: '3px solid #2563EB' }}
          aria-label="Database statistics"
        >
          <div className="flex flex-wrap items-stretch justify-center max-w-3xl mx-auto">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className="flex flex-1 flex-col items-center justify-center px-4 py-5 min-w-[88px]"
                style={{
                  borderRight: i < stats.length - 1 ? '1px solid #E2E8F0' : 'none',
                }}
              >
                <span className="text-2xl font-extrabold tabular-nums" style={{ color: '#1E293B' }}>
                  {s.value}
                </span>
                <span
                  className="text-[11px] font-semibold uppercase tracking-wider mt-1 text-center"
                  style={{ color: '#64748B' }}
                >
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ── HOW IT WORKS ──────────────────────────────────── */}
        <section className="px-5 py-12 flex flex-col items-center gap-8">
          <div className="text-center">
            <span
              className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full"
              style={{ background: '#EFF6FF', color: '#1E293B' }}
            >
              How it works
            </span>
            <h2 className="mt-3 text-2xl font-bold" style={{ color: '#1A202C' }}>
              Three things we get right for you
            </h2>
            <p className="mt-2 text-sm max-w-xs mx-auto" style={{ color: '#4A5568' }}>
              Built for Pakistani students — not imported from a foreign university platform.
            </p>
          </div>

          {/* Feature cards — vertical stack on mobile, row on md+ */}
          <div className="w-full max-w-2xl flex flex-col md:flex-row gap-4">
            {FEATURES.map((f) => {
              const Icon = f.icon
              return (
                <div
                  key={f.title}
                  className={`${f.delay} flex-1 bg-white rounded-2xl p-5 flex flex-col gap-3 border`}
                  style={{
                    borderColor: '#E2E8F0',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                  }}
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: f.bg }}
                  >
                    <Icon size={22} color={f.color} strokeWidth={2} />
                  </div>
                  <h3 className="font-bold text-base" style={{ color: '#1A202C' }}>
                    {f.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#4A5568' }}>
                    {f.desc}
                  </p>
                </div>
              )
            })}
          </div>
        </section>

        {/* ── SECONDARY CTA STRIP ───────────────────────────── */}
        <section
          className="mx-4 mb-10 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-6"
          style={{ background: '#1E293B' }}
        >
          <div>
            <p className="font-bold text-white text-lg leading-snug">Ready to find your match?</p>
            <p className="text-sm text-blue-200 mt-0.5">Takes less than 2 minutes. Completely free.</p>
          </div>
          <button
            onClick={() => navigate('/quiz')}
            className="flex-shrink-0 flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-transform hover:scale-105 active:scale-95"
            style={{ background: '#2563EB', color: '#FFFFFF' }}
          >
            Start Quiz <ArrowRight size={16} />
          </button>
        </section>

        {/* ── FOOTER ────────────────────────────────────────── */}
        <footer
          className="mt-auto border-t px-5 py-6 flex flex-col items-center gap-3 text-center"
          style={{ borderColor: '#E2E8F0', background: '#ffffff' }}
        >
          <div className="flex items-center gap-2">
            <Shield size={14} style={{ color: '#4A5568' }} />
            <span className="text-xs font-semibold" style={{ color: '#4A5568' }}>
              Powered by HEC Data · Pakistan 2026
            </span>
          </div>
          <p className="text-[11px] max-w-sm leading-relaxed" style={{ color: '#718096' }}>
            Fee and merit data is approximate and sourced from publicly available HEC and university
            websites. Always verify admission details directly with the university before applying.
            This tool does not guarantee admission.
          </p>
          <div className="flex items-center gap-4 mt-1">
            <a
              href="https://hec.gov.pk"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] underline underline-offset-2"
              style={{ color: '#1E293B' }}
            >
              HEC Pakistan
            </a>
            <span style={{ color: '#CBD5E0' }}>·</span>
            <a
              href="https://pmc.gov.pk"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] underline underline-offset-2"
              style={{ color: '#1E293B' }}
            >
              PMC (Medical)
            </a>
            <span style={{ color: '#CBD5E0' }}>·</span>
            <a
              href="https://nts.org.pk"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] underline underline-offset-2"
              style={{ color: '#1E293B' }}
            >
              NTS
            </a>
          </div>
        </footer>

      </div>
    </>
  )
}
