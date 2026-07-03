import { useLocation, useNavigate, Link } from 'react-router-dom'
import { useState, useMemo, useEffect } from 'react'
import {
  RotateCcw, MapPin, Building2, DollarSign, BookOpen, ChevronRight,
  AlertCircle, Home, CalendarDays, ClipboardList, SlidersHorizontal,
  CheckCircle2, Target, TrendingUp, ArrowUpDown, Filter, XCircle, Bookmark,
  RefreshCw,
} from 'lucide-react'
import { matchUniversities, getSummaryStats } from '../utils/matching.js'
import { isSaved, toggleSaved, matchKey } from '../utils/savedPrograms.js'
import { SkeletonPage } from '../components/Skeleton.jsx'

// ─── Inline styles ────────────────────────────────────────
const STYLE = `
  @keyframes fadeUp {
    from { opacity:0; transform:translateY(16px); }
    to   { opacity:1; transform:translateY(0); }
  }
  .card-in { animation: fadeUp 0.35s cubic-bezier(.4,0,.2,1) both; }
`

// ─── Config maps ──────────────────────────────────────────

const CLS = {
  Safe:    { bg:'#EFF6FF', color:'#1D4ED8', border:'#2563EB', icon: CheckCircle2, label:'SAFE' },
  Target:  { bg:'#FEF9E7', color:'#B7770D', border:'#F39C12', icon: Target,       label:'TARGET' },
  Reach:   { bg:'#FDEDEC', color:'#C0392B', border:'#E74C3C', icon: TrendingUp,   label:'REACH' },
  Unknown: { bg:'#F1F5F9', color:'#718096', border:'#CBD5E0', icon: AlertCircle,  label:'INFO NEEDED' },
}

const FIELD_TAG = {
  'CS-IT':           { bg:'#EFF6FF', color:'#1D4ED8', label:'CS & IT' },
  'Engineering':     { bg:'#EFF6FF', color:'#1E293B', label:'Engineering' },
  'Medical':         { bg:'#FDEDEC', color:'#C0392B', label:'Medical' },
  'Business':        { bg:'#FEF9E7', color:'#B7770D', label:'Business' },
  'Natural Sciences':{ bg:'#F4ECF7', color:'#7D3C98', label:'Sciences' },
  'Social Sciences': { bg:'#FDF2E9', color:'#A04000', label:'Social Sci' },
}

const FILTERS = [
  { id:'all',        label:'All' },
  { id:'safe',       label:'Safe' },
  { id:'target',     label:'Target' },
  { id:'reach',      label:'Reach' },
  { id:'government', label:'Government' },
  { id:'private',    label:'Private' },
]

const SORTS = [
  { id:'best', label:'Best Match' },
  { id:'fee',  label:'Lowest Fee' },
  { id:'city', label:'City A–Z' },
]

// ─── Small helpers ────────────────────────────────────────

function initials(name = '') {
  return name.split(' ').slice(0, 2).map((w) => w[0] ?? '').join('').toUpperCase()
}

function fmtFee(n) {
  if (!n) return '—'
  return `Rs ${n.toLocaleString('en-PK')}`
}

function clsOf(id) { return CLS[id] ?? CLS.Unknown }

// ─── Sub-components ───────────────────────────────────────

function ClassBadge({ cls }) {
  const c = clsOf(cls)
  const Icon = c.icon
  return (
    <span
      className="inline-flex items-center gap-1 text-[11px] font-extrabold px-2 py-0.5 rounded-full"
      style={{ background: c.bg, color: c.color }}
    >
      <Icon size={10} strokeWidth={2.5} /> {c.label}
    </span>
  )
}

function FieldTag({ category }) {
  const t = FIELD_TAG[category] ?? { bg:'#F1F5F9', color:'#4A5568', label: category }
  return (
    <span
      className="text-[11px] font-semibold px-2 py-0.5 rounded-full"
      style={{ background: t.bg, color: t.color }}
    >
      {t.label}
    </span>
  )
}

function MeritBar({ estimated, cutoff }) {
  if (estimated == null || cutoff == null) return null
  const pct    = Math.min(100, Math.max(0, estimated))
  const cutPct = Math.min(100, Math.max(0, cutoff))
  const gap    = estimated - cutoff

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between text-[11px]" style={{ color:'#4A5568' }}>
        <span>Est. merit: <strong style={{ color:'#1A202C' }}>{estimated.toFixed(1)}%</strong></span>
        <span>Cutoff: <strong style={{ color:'#1A202C' }}>{cutoff}%</strong></span>
        <span
          className="font-bold"
          style={{ color: gap >= 5 ? '#1D4ED8' : gap >= 0 ? '#B7770D' : '#C0392B' }}
        >
          {gap >= 0 ? `+${gap.toFixed(1)}%` : `${gap.toFixed(1)}%`}
        </span>
      </div>
      <div className="relative h-2 rounded-full" style={{ background:'#E2E8F0' }}>
        {/* Student bar */}
        <div
          className="absolute left-0 top-0 h-2 rounded-full transition-all"
          style={{
            width: `${pct}%`,
            background: gap >= 5 ? '#2563EB' : gap >= 0 ? '#F39C12' : '#E74C3C',
          }}
        />
        {/* Cutoff marker */}
        <div
          className="absolute top-[-3px] w-0.5 h-[14px] rounded-full"
          style={{ left: `${cutPct}%`, background:'#1E293B' }}
        />
      </div>
      <div className="flex justify-end">
        <span className="text-[10px]" style={{ color:'#718096' }}>▲ cutoff line</span>
      </div>
    </div>
  )
}

// ─── University Card ──────────────────────────────────────

function UniCard({ m, idx }) {
  const c = clsOf(m.classification)
  const [bookmarked, setBookmarked] = useState(() => isSaved(m))

  function handleBookmark(e) {
    e.preventDefault()
    toggleSaved(m)
    setBookmarked(isSaved(m))
  }

  return (
    <div
      className="card-in bg-white rounded-2xl overflow-hidden border"
      style={{
        borderColor: '#E2E8F0',
        borderLeft: `4px solid ${c.border}`,
        animationDelay: `${Math.min(idx * 40, 400)}ms`,
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
      }}
    >
      {/* ── HEADER ROW ─────────────────────────────── */}
      <div className="flex items-start gap-3 px-4 pt-4 pb-3">
        {/* Avatar */}
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center font-extrabold text-sm text-white flex-shrink-0"
          style={{ background: '#1E293B' }}
        >
          {initials(m.university.short_name || m.university.name)}
        </div>

        {/* Title block */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 flex-wrap">
            <div className="min-w-0">
              <p className="font-bold text-sm leading-tight truncate" style={{ color:'#1A202C' }}>
                {m.university.name}
              </p>
              <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
                {m.university.short_name && (
                  <span
                    className="text-[11px] font-bold px-1.5 py-0.5 rounded"
                    style={{ background:'#EFF6FF', color:'#1E293B' }}
                  >
                    {m.university.short_name}
                  </span>
                )}
                <FieldTag category={m.program.field_category} />
              </div>
            </div>
            <ClassBadge cls={m.classification} />
          </div>
        </div>
      </div>

      {/* ── PROGRAM NAME ───────────────────────────── */}
      <div className="px-4 pb-3 border-b" style={{ borderColor:'#F1F5F9' }}>
        <p className="font-semibold text-sm" style={{ color:'#1A202C' }}>
          {m.program.program_name}
        </p>
        <p className="text-xs mt-0.5" style={{ color:'#718096' }}>
          {m.program.degree_level} · {m.program.duration_years} years
        </p>
      </div>

      {/* ── QUICK INFO GRID ────────────────────────── */}
      <div className="px-4 py-3 grid grid-cols-2 gap-x-4 gap-y-2.5">
        <div className="flex items-center gap-1.5 text-xs" style={{ color:'#4A5568' }}>
          <MapPin size={13} style={{ color:'#1E293B', flexShrink:0 }} />
          <span className="truncate">{m.campus.city}</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs" style={{ color:'#4A5568' }}>
          <Building2 size={13} style={{ color:'#1E293B', flexShrink:0 }} />
          <span className="truncate">{m.university.sector}</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs col-span-2" style={{ color:'#4A5568' }}>
          <DollarSign size={13} style={{ color:'#1E293B', flexShrink:0 }} />
          <span>
            Semester fee:{' '}
            <strong style={{ color:'#1A202C' }}>{fmtFee(m.program.semester_fee_pkr_approx)}</strong>
            {m.program.total_program_fee_pkr_approx && (
              <span style={{ color:'#718096' }}>
                {' '}· Total: {fmtFee(m.program.total_program_fee_pkr_approx)}
              </span>
            )}
          </span>
        </div>
      </div>

      {/* ── MERIT BAR ──────────────────────────────── */}
      {(m.estimatedMerit != null || m.meritFormula?.approx_recent_closing_merit_pct != null) && (
        <div className="px-4 pb-3">
          <MeritBar
            estimated={m.estimatedMerit}
            cutoff={m.meritFormula?.approx_recent_closing_merit_pct}
          />
          {m.meritFormula && (
            <p className="text-[11px] mt-1.5" style={{ color:'#718096' }}>
              Formula: Matric {m.meritFormula.matric_weight_pct ?? '?'}% + FSc{' '}
              {m.meritFormula.fsc_weight_pct ?? '?'}% + Test{' '}
              {m.meritFormula.entry_test_weight_pct ?? '?'}%
              {m.meritFormula.min_fsc_percentage_required
                ? ` · Min FSc: ${m.meritFormula.min_fsc_percentage_required}%`
                : ''}
            </p>
          )}
        </div>
      )}

      {/* ── ADMISSION + HOSTEL STRIP ───────────────── */}
      <div
        className="px-4 py-3 flex flex-col gap-2 border-t"
        style={{ background:'#F1F5F9', borderColor:'#F1F5F9' }}
      >
        {m.admissionCycle && (
          <>
            <div className="flex items-start gap-1.5 text-xs" style={{ color:'#4A5568' }}>
              <CalendarDays size={13} style={{ color:'#1E293B', flexShrink:0, marginTop:1 }} />
              <span>
                <strong style={{ color:'#1A202C' }}>Next admission: </strong>
                {m.admissionCycle.application_window}
              </span>
            </div>
            <div className="flex items-start gap-1.5 text-xs" style={{ color:'#4A5568' }}>
              <ClipboardList size={13} style={{ color:'#1E293B', flexShrink:0, marginTop:1 }} />
              <span>
                <strong style={{ color:'#1A202C' }}>
                  {m.admissionCycle.entry_test_required ? m.admissionCycle.entry_test_name : 'No entry test'}
                  {m.admissionCycle.entry_test_required ? ': ' : ''}
                </strong>
                {m.admissionCycle.entry_test_required ? m.admissionCycle.entry_test_window : ''}
              </span>
            </div>
          </>
        )}

        <div className="flex items-center gap-1.5 text-xs" style={{ color:'#4A5568' }}>
          <Home size={13} style={{ flexShrink:0, color: m.hostelInfo ? '#1D4ED8' : '#CBD5E0' }} />
          {m.hostelInfo ? (
            <span>
              <strong style={{ color:'#1D4ED8' }}>Hostel available</strong>
              {' '}· ~{fmtFee(m.hostelInfo.monthly_cost_pkr_approx)}/mo
              {m.hostelInfo.mess_included ? ' (mess incl.)' : ''}
            </span>
          ) : (
            <span style={{ color:'#A0AEC0' }}>Hostel data not available</span>
          )}
        </div>
      </div>

      {/* ── REACH WARNING ──────────────────────────── */}
      {m.classification === 'Reach' && (
        <div className="px-4 py-2.5 border-t text-xs" style={{ borderColor:'#FDEDEC', background:'#FFF5F5', color:'#C0392B' }}>
          ⚠️ Your current scores are below last year's cutoff — but cutoffs change every year.
        </div>
      )}

      {/* ── FOOTER ─────────────────────────────────── */}
      <div className="px-4 py-3 border-t flex items-center justify-between gap-2" style={{ borderColor:'#F1F5F9' }}>
        <span className="text-[11px]" style={{ color:'#A0AEC0' }}>
          {m.university.hec_recognized ? '✓ HEC Recognized' : ''}
        </span>
        <div className="flex items-center gap-2">
          {/* Bookmark button */}
          <button
            onClick={handleBookmark}
            className="w-8 h-8 rounded-lg flex items-center justify-center border-2 transition-all hover:scale-105 active:scale-95"
            style={{
              borderColor: bookmarked ? '#1E293B' : '#E2E8F0',
              background:  bookmarked ? '#EFF6FF' : '#ffffff',
            }}
            title={bookmarked ? 'Remove from saved' : 'Save program'}
          >
            <Bookmark
              size={14}
              strokeWidth={2}
              style={{ color: bookmarked ? '#1E293B' : '#CBD5E0' }}
              fill={bookmarked ? '#1E293B' : 'none'}
            />
          </button>
          <Link
            to={`/university/${m.university.university_id}`}
            state={{ match: m }}
            className="flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-lg transition-transform hover:scale-105 active:scale-95"
            style={{ background:'#1E293B', color:'#ffffff' }}
          >
            View Details <ChevronRight size={13} />
          </Link>
        </div>
      </div>
    </div>
  )
}

// ─── Empty state ──────────────────────────────────────────

const BROADEN_TIPS = [
  '🌆 Add more cities or choose "Any City in Pakistan"',
  '💰 Increase your maximum semester fee',
  '🏛️ Switch to "Show Both" to include government & private',
  '🎓 Make sure your FSc group matches the program requirements',
]

function EmptyState({ activeFilter, onReset, totalMatches = 0 }) {
  const isFiltered = activeFilter !== 'all'

  return (
    <div className="flex flex-col items-center gap-5 py-12 text-center px-4">
      {/* Illustration */}
      <div
        className="w-20 h-20 rounded-3xl flex items-center justify-center"
        style={{ background: 'linear-gradient(135deg,#EFF6FF,#D6EAF8)' }}
        aria-hidden="true"
      >
        <XCircle size={38} style={{ color:'#1E293B' }} />
      </div>

      <div>
        <p className="font-extrabold text-lg" style={{ color:'#1A202C' }}>
          {isFiltered ? `No "${activeFilter}" matches` : 'No exact matches found'}
        </p>
        <p className="text-sm mt-1.5 max-w-xs mx-auto leading-relaxed" style={{ color:'#4A5568' }}>
          {isFiltered
            ? `You have ${totalMatches} total match${totalMatches !== 1 ? 'es' : ''} — switch to "All" to see them.`
            : "We couldn't find programs matching all your criteria. Try broadening your search:"}
        </p>
      </div>

      {/* Broaden tips (only for real empty, not filtered) */}
      {!isFiltered && (
        <ul className="text-left w-full max-w-xs rounded-2xl overflow-hidden border" style={{ borderColor:'#E2E8F0' }}>
          {BROADEN_TIPS.map((tip) => (
            <li
              key={tip}
              className="px-4 py-2.5 text-xs border-b last:border-b-0 flex items-start gap-2"
              style={{ borderColor:'#F1F5F9', color:'#4A5568', background:'#FAFBFC' }}
            >
              {tip}
            </li>
          ))}
        </ul>
      )}

      <div className="flex flex-wrap gap-3 justify-center">
        {isFiltered && (
          <button
            onClick={onReset}
            className="px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-transform hover:scale-105 active:scale-95"
            style={{ background:'#1E293B' }}
            aria-label="Show all matched programs"
          >
            Show All {totalMatches} Matches
          </button>
        )}
        <Link
          to="/quiz"
          className="px-5 py-2.5 rounded-xl text-sm font-bold border-2 transition-transform hover:scale-105 active:scale-95"
          style={{ borderColor:'#1E293B', color:'#1E293B' }}
          aria-label="Go back to quiz to adjust preferences"
        >
          ✏️ Adjust Preferences
        </Link>
      </div>
    </div>
  )
}

// ─── Error state ──────────────────────────────────────────

function ErrorState({ onRetry }) {
  return (
    <div className="flex flex-col items-center gap-5 py-16 text-center px-6">
      <div
        className="w-20 h-20 rounded-3xl flex items-center justify-center"
        style={{ background:'#FDEDEC' }}
        aria-hidden="true"
      >
        <AlertCircle size={38} style={{ color:'#C0392B' }} />
      </div>
      <div>
        <p className="font-extrabold text-lg" style={{ color:'#1A202C' }}>Something went wrong</p>
        <p className="text-sm mt-1.5 max-w-xs mx-auto" style={{ color:'#4A5568' }}>
          Could not load university data. This app works offline — try refreshing.
        </p>
      </div>
      <div className="flex gap-3">
        <button
          onClick={onRetry}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-transform hover:scale-105 active:scale-95"
          style={{ background:'#C0392B' }}
          aria-label="Retry loading results"
        >
          <RefreshCw size={14} aria-hidden="true" /> Retry
        </button>
        <Link
          to="/quiz"
          className="px-5 py-2.5 rounded-xl text-sm font-bold border-2"
          style={{ borderColor:'#1E293B', color:'#1E293B' }}
        >
          Back to Quiz
        </Link>
      </div>
    </div>
  )
}

// ─── Main page ────────────────────────────────────────────

export default function ResultsPage() {
  const { state } = useLocation()
  const navigate  = useNavigate()

  const [activeFilter, setActiveFilter] = useState('all')
  const [sortBy, setSortBy]             = useState('best')
  const [showSort, setShowSort]         = useState(false)

  // Skeleton loading: show shimmer for 900ms for smoother UX
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState(null)
  const [retryKey, setRetryKey] = useState(0)

  useEffect(() => {
    setLoading(true)
    setError(null)
    const t = setTimeout(() => setLoading(false), 900)
    return () => clearTimeout(t)
  }, [retryKey])

  const profile = useMemo(() => {
    if (state?.profile) return state.profile
    try { return JSON.parse(localStorage.getItem('uniFinderProfile') ?? '{}') }
    catch { return {} }
  }, [state])

  const allMatches = useMemo(() => {
    try { return matchUniversities(profile) }
    catch (e) { setError(e?.message ?? 'Unknown error'); return [] }
  }, [profile, retryKey])

  const stats = useMemo(() => getSummaryStats(allMatches), [allMatches])

  const displayed = useMemo(() => {
    let list = [...allMatches]

    // Filter
    if (activeFilter === 'safe')       list = list.filter((m) => m.classification === 'Safe')
    else if (activeFilter === 'target') list = list.filter((m) => m.classification === 'Target')
    else if (activeFilter === 'reach')  list = list.filter((m) => m.classification === 'Reach')
    else if (activeFilter === 'government')
      list = list.filter((m) => ['Government','Semi-Government','Government-Autonomous'].includes(m.university.sector))
    else if (activeFilter === 'private')
      list = list.filter((m) => m.university.sector === 'Private')

    // Sort
    if (sortBy === 'fee') {
      list.sort((a, b) => (a.program.semester_fee_pkr_approx ?? 0) - (b.program.semester_fee_pkr_approx ?? 0))
    } else if (sortBy === 'city') {
      list.sort((a, b) => a.campus.city.localeCompare(b.campus.city))
    }
    // 'best' keeps the order from matchUniversities (already sorted)

    return list
  }, [allMatches, activeFilter, sortBy])

  if (!profile.fscGroup) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-5 px-6 text-center" style={{ background:'#F1F5F9' }}>
        <div
          className="w-20 h-20 rounded-3xl flex items-center justify-center"
          style={{ background:'#EFF6FF' }}
          aria-hidden="true"
        >
          <AlertCircle size={38} style={{ color:'#1E293B' }} />
        </div>
        <div>
          <p className="font-extrabold text-lg" style={{ color:'#1A202C' }}>No profile found</p>
          <p className="text-sm mt-1.5" style={{ color:'#4A5568' }}>
            Please complete the quiz first so we can find your matches.
          </p>
        </div>
        <button
          onClick={() => navigate('/quiz')}
          className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white text-sm transition-transform hover:scale-105 active:scale-95"
          style={{ background:'#1E293B' }}
          aria-label="Go to quiz to set up your profile"
        >
          🎓 Take the Quiz
        </button>
      </div>
    )
  }

  // Loading skeleton
  if (loading) {
    return (
      <div className="min-h-screen" style={{ background:'#F1F5F9' }}>
        <SkeletonPage />
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center" style={{ background:'#F1F5F9' }}>
        <ErrorState onRetry={() => setRetryKey((k) => k + 1)} />
      </div>
    )
  }

  const activeSortLabel = SORTS.find((s) => s.id === sortBy)?.label ?? 'Sort'

  return (
    <>
      <style>{STYLE}</style>
      <div className="min-h-screen flex flex-col" style={{ background:'#F1F5F9' }}>

        {/* ── STUDENT SUMMARY CARD ─────────────────── */}
        <div
          className="px-4 pt-5 pb-4"
          style={{ background:'linear-gradient(135deg,#1E293B,#475569)' }}
        >
          <div className="max-w-2xl mx-auto">
            <div className="flex items-start justify-between gap-3 mb-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-blue-200">Your Profile</p>
                <p className="text-lg font-extrabold text-white mt-0.5">
                  {allMatches.length} Matched Program{allMatches.length !== 1 ? 's' : ''}
                </p>
              </div>
              <button
                onClick={() => navigate('/quiz')}
                className="flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-lg flex-shrink-0 transition-transform hover:scale-105"
                style={{ background:'rgba(255,255,255,0.15)', color:'#ffffff' }}
              >
                <RotateCcw size={12} /> Edit Profile
              </button>
            </div>

            {/* Profile chips */}
            <div className="flex flex-wrap gap-2">
              {[
                { icon: BookOpen,   text: profile.fscGroup },
                { icon: null,       text: `Matric ${profile.matricPercent}% · FSc ${profile.fscPercent}%` },
                { icon: MapPin,     text: profile.preferredCities?.join(', ') || 'Any City' },
                { icon: Building2,  text: profile.sector === 'Both' ? 'All Sectors' : profile.sector },
                { icon: DollarSign, text: `Max Rs ${(profile.maxSemesterFee ?? 0).toLocaleString()}/sem` },
              ].map(({ icon: Icon, text }) => (
                <span
                  key={text}
                  className="flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded-full"
                  style={{ background:'rgba(255,255,255,0.15)', color:'#ffffff' }}
                >
                  {Icon && <Icon size={11} />} {text}
                </span>
              ))}
            </div>

            {/* Stats pills */}
            <div className="flex gap-2 mt-3">
              {[
                { label:'Safe',   val: stats.safe,   color:'#2563EB' },
                { label:'Target', val: stats.target, color:'#F39C12' },
                { label:'Reach',  val: stats.reach,  color:'#E74C3C' },
              ].map(({ label, val, color }) => (
                <button
                  key={label}
                  onClick={() => setActiveFilter(label.toLowerCase())}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-transform hover:scale-105"
                  style={{
                    background: activeFilter === label.toLowerCase() ? color : 'rgba(255,255,255,0.12)',
                    color:'#ffffff',
                    border: `1.5px solid ${activeFilter === label.toLowerCase() ? color : 'rgba(255,255,255,0.2)'}`,
                  }}
                >
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ background: activeFilter === label.toLowerCase() ? '#ffffff' : color }}
                  />
                  {val} {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── STICKY FILTER + SORT BAR ─────────────── */}
        <div
          className="sticky top-0 z-20 border-b"
          style={{ background:'#ffffff', borderColor:'#E2E8F0' }}
        >
          <div className="max-w-2xl mx-auto px-4 py-2 flex items-center gap-2">
            {/* Filter chips scroll */}
            <div className="flex gap-1.5 overflow-x-auto flex-1 no-scrollbar pb-0.5">
              {FILTERS.map((f) => (
                <button
                  key={f.id}
                  onClick={() => setActiveFilter(f.id)}
                  className="flex-shrink-0 text-xs font-semibold px-3 py-1.5 rounded-full transition-colors"
                  style={{
                    background: activeFilter === f.id ? '#1E293B' : '#F1F5F9',
                    color:      activeFilter === f.id ? '#ffffff'  : '#4A5568',
                  }}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Sort button */}
            <div className="relative flex-shrink-0">
              <button
                onClick={() => setShowSort((v) => !v)}
                className="flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-full border"
                style={{ borderColor:'#E2E8F0', color:'#4A5568', background:'#ffffff' }}
              >
                <ArrowUpDown size={12} /> {activeSortLabel}
              </button>
              {showSort && (
                <div
                  className="absolute right-0 top-9 z-30 rounded-xl border shadow-lg overflow-hidden"
                  style={{ background:'#ffffff', borderColor:'#E2E8F0', minWidth:'140px' }}
                >
                  {SORTS.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => { setSortBy(s.id); setShowSort(false) }}
                      className="w-full text-left px-4 py-2.5 text-xs font-semibold flex items-center gap-2 transition-colors hover:bg-gray-50"
                      style={{ color: sortBy === s.id ? '#1E293B' : '#4A5568' }}
                    >
                      {sortBy === s.id && <CheckCircle2 size={12} color="#1E293B" />}
                      {s.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Active filter indicator */}
          {activeFilter !== 'all' && (
            <div
              className="px-4 pb-2 flex items-center gap-2 max-w-2xl mx-auto"
            >
              <Filter size={11} style={{ color:'#1E293B' }} />
              <span className="text-[11px] font-medium" style={{ color:'#1E293B' }}>
                Showing {displayed.length} {activeFilter} result{displayed.length !== 1 ? 's' : ''}
              </span>
              <button
                onClick={() => setActiveFilter('all')}
                className="text-[11px] underline ml-auto"
                style={{ color:'#4A5568' }}
              >
                Clear filter
              </button>
            </div>
          )}
        </div>

        {/* ── RESULTS ──────────────────────────────── */}
        <div className="px-4 py-5 flex flex-col gap-4 max-w-2xl w-full mx-auto">
          {displayed.length === 0 ? (
            <EmptyState
              activeFilter={activeFilter}
              onReset={() => setActiveFilter('all')}
              totalMatches={allMatches.length}
            />
          ) : (
            displayed.map((m, idx) => (
              <UniCard
                key={`${m.program.program_id}-${m.campus.campus_id}-${idx}`}
                m={m}
                idx={idx}
              />
            ))
          )}

          {displayed.length > 0 && (
            <p className="text-[11px] text-center pb-4 pt-2" style={{ color:'#A0AEC0' }}>
              Merit estimates use historical data. Always verify directly with the university before applying.
            </p>
          )}
        </div>
      </div>
    </>
  )
}
