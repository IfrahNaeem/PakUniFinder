import { useState, useRef, useEffect, useCallback, useMemo } from 'react'
import MeritTrendChart from '../components/MeritTrendChart.jsx'
import { useParams, useLocation, useNavigate, Link } from 'react-router-dom'
import {
  ArrowLeft, Globe, MapPin, Building2, CheckCircle2, Heart,
  ExternalLink, GraduationCap, CalendarDays, ClipboardList,
  DollarSign, BookOpen, Home, Bell, AlertCircle, ChevronRight,
  Info, Clock,
} from 'lucide-react'
import {
  UNIVERSITIES, CAMPUSES, PROGRAMS,
  ADMISSION_CYCLES, MERIT_FORMULA, HOSTEL_INFO,
} from '../data/universities.js'

// ─── Inline styles ────────────────────────────────────────
const STYLE = `
  @keyframes tabSlide {
    from { opacity:0; transform:translateX(16px); }
    to   { opacity:1; transform:translateX(0); }
  }
  .tab-content { animation: tabSlide 0.22s ease both; }
  .no-scrollbar::-webkit-scrollbar { display:none; }
  .no-scrollbar { -ms-overflow-style:none; scrollbar-width:none; }
`

// ─── Config ───────────────────────────────────────────────
const TABS = [
  { id: 'programs',  label: 'Programs',    icon: BookOpen },
  { id: 'admission', label: 'Admission',   icon: CalendarDays },
  { id: 'fees',      label: 'Fees & Merit',icon: DollarSign },
  { id: 'hostel',    label: 'Hostel & Life',icon: Home },
]

const FIELD_COLORS = {
  'CS-IT':           { bg:'#EFF6FF', color:'#1D4ED8' },
  'Engineering':     { bg:'#EFF6FF', color:'#1E293B' },
  'Medical':         { bg:'#FDEDEC', color:'#C0392B' },
  'Business':        { bg:'#FEF9E7', color:'#B7770D' },
  'Natural Sciences':{ bg:'#F4ECF7', color:'#7D3C98' },
  'Social Sciences': { bg:'#FDF2E9', color:'#A04000' },
}

// ─── Helpers ──────────────────────────────────────────────
function fmtFee(n) {
  if (!n) return '—'
  return `Rs ${Number(n).toLocaleString('en-PK')}`
}

function initials(s = '') {
  return s.split(' ').slice(0, 2).map((w) => w[0] ?? '').join('').toUpperCase()
}

function daysUntil(dateStr) {
  const target = new Date(dateStr)
  if (isNaN(target)) return null
  const diff = Math.round((target - Date.now()) / 86400000)
  return diff
}

// ─── localStorage helpers ─────────────────────────────────
function getSaved() {
  try { return JSON.parse(localStorage.getItem('savedUnis') ?? '[]') } catch { return [] }
}
function setSaved(arr) { localStorage.setItem('savedUnis', JSON.stringify(arr)) }

function getReminders() {
  try { return JSON.parse(localStorage.getItem('uniReminders') ?? '{}') } catch { return {} }
}
function setReminder(programId, data) {
  const r = getReminders()
  r[programId] = data
  localStorage.setItem('uniReminders', JSON.stringify(r))
}

// ─── TAB 1 — Programs ─────────────────────────────────────
function ProgramsTab({ programs, campuses }) {
  return (
    <div className="flex flex-col gap-3">
      {programs.map((prog) => {
        const campus = campuses.find((c) => c.campus_id === prog.campus_id)
        const ft = FIELD_COLORS[prog.field_category] ?? { bg:'#F1F5F9', color:'#4A5568' }
        const formula = MERIT_FORMULA.find((f) => f.program_id === prog.program_id)

        return (
          <div
            key={prog.program_id}
            className="bg-white rounded-2xl border overflow-hidden"
            style={{ borderColor:'#E2E8F0', boxShadow:'0 1px 4px rgba(0,0,0,0.05)' }}
          >
            <div className="px-4 pt-4 pb-3">
              <div className="flex items-start justify-between gap-2 mb-2">
                <p className="font-bold text-sm leading-snug" style={{ color:'#1A202C' }}>
                  {prog.program_name}
                </p>
                <span
                  className="text-[11px] font-bold px-2 py-0.5 rounded-full flex-shrink-0"
                  style={{ background: ft.bg, color: ft.color }}
                >
                  {prog.field_category}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs" style={{ color:'#4A5568' }}>
                <div>
                  <span className="uppercase tracking-wide font-semibold text-[10px]">Degree</span>
                  <p className="font-medium mt-0.5" style={{ color:'#1A202C' }}>{prog.degree_level}</p>
                </div>
                <div>
                  <span className="uppercase tracking-wide font-semibold text-[10px]">Duration</span>
                  <p className="font-medium mt-0.5" style={{ color:'#1A202C' }}>{prog.duration_years} years</p>
                </div>
                <div>
                  <span className="uppercase tracking-wide font-semibold text-[10px]">Semester Fee</span>
                  <p className="font-bold mt-0.5" style={{ color:'#1E293B' }}>{fmtFee(prog.semester_fee_pkr_approx)}</p>
                </div>
                <div>
                  <span className="uppercase tracking-wide font-semibold text-[10px]">Total (est.)</span>
                  <p className="font-medium mt-0.5" style={{ color:'#1A202C' }}>{fmtFee(prog.total_program_fee_pkr_approx)}</p>
                </div>
                <div className="col-span-2">
                  <span className="uppercase tracking-wide font-semibold text-[10px]">FSc Group Required</span>
                  <p className="font-medium mt-0.5" style={{ color:'#1A202C' }}>{prog.required_fsc_group}</p>
                </div>
              </div>
            </div>

            {/* Campus + entry test footer */}
            <div className="px-4 py-2.5 border-t flex items-center justify-between" style={{ borderColor:'#F1F5F9', background:'#F1F5F9' }}>
              {campus && (
                <span className="text-[11px] flex items-center gap-1" style={{ color:'#4A5568' }}>
                  <MapPin size={11} /> {campus.city}
                </span>
              )}
              {formula?.min_fsc_percentage_required && (
                <span
                  className="text-[11px] font-semibold px-2 py-0.5 rounded-full"
                  style={{ background:'#FEF9E7', color:'#B7770D' }}
                >
                  Min FSc: {formula.min_fsc_percentage_required}%
                </span>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

// ─── TAB 2 — Admission ────────────────────────────────────
function AdmissionTab({ programs }) {
  const reminders = getReminders()

  return (
    <div className="flex flex-col gap-4">
      {/* Disclaimer */}
      <div
        className="flex items-start gap-2 p-3 rounded-xl text-xs"
        style={{ background:'#FEF9E7', color:'#B7770D' }}
      >
        <Info size={14} className="flex-shrink-0 mt-0.5" />
        <span>
          Dates shown are for the <strong>2026-27 cycle</strong>. Always verify on the
          university's official website before applying.
        </span>
      </div>

      {programs.map((prog) => {
        const cycle = ADMISSION_CYCLES.find((c) => c.program_id === prog.program_id)
        const reminded = !!reminders[prog.program_id]

        function handleReminder() {
          if (reminded) return
          setReminder(prog.program_id, {
            programName: prog.program_name,
            window: cycle?.application_window ?? 'TBA',
            savedAt: new Date().toISOString(),
          })
          // force re-render by calling a tiny state trick
          window.dispatchEvent(new Event('storage'))
        }

        return (
          <div
            key={prog.program_id}
            className="bg-white rounded-2xl border overflow-hidden"
            style={{ borderColor:'#E2E8F0', boxShadow:'0 1px 4px rgba(0,0,0,0.05)' }}
          >
            {/* Program title bar */}
            <div className="px-4 py-3 border-b flex items-center justify-between" style={{ borderColor:'#F1F5F9', background:'#EFF6FF' }}>
              <p className="font-bold text-sm" style={{ color:'#1E293B' }}>{prog.program_name}</p>
              <button
                onClick={handleReminder}
                className="flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-lg transition-transform hover:scale-105 active:scale-95"
                style={{
                  background: reminded ? '#EFF6FF' : '#1E293B',
                  color: reminded ? '#1D4ED8' : '#ffffff',
                }}
              >
                <Bell size={11} />
                {reminded ? 'Saved!' : 'Remind me'}
              </button>
            </div>

            {cycle ? (
              <div className="px-4 py-4 flex flex-col gap-3">
                <AdmRow
                  icon={CalendarDays}
                  label="Application Window"
                  value={cycle.application_window}
                  highlight
                />
                <AdmRow
                  icon={ClipboardList}
                  label={cycle.entry_test_required ? `Entry Test — ${cycle.entry_test_name}` : 'Entry Test'}
                  value={cycle.entry_test_required
                    ? cycle.entry_test_window
                    : 'No entry test required'}
                />
                <AdmRow
                  icon={CheckCircle2}
                  label="Merit List Period"
                  value={cycle.merit_list_period}
                />
                <AdmRow
                  icon={GraduationCap}
                  label="Classes Start"
                  value={cycle.classes_start}
                />
                <AdmRow
                  icon={BookOpen}
                  label="Academic Year"
                  value={cycle.academic_year}
                />
              </div>
            ) : (
              <div className="px-4 py-4 text-sm text-center" style={{ color:'#A0AEC0' }}>
                Admission cycle data not yet available. Check the university website.
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

function AdmRow({ icon: Icon, label, value, highlight }) {
  return (
    <div className="flex items-start gap-3">
      <Icon size={15} className="flex-shrink-0 mt-0.5" style={{ color: highlight ? '#1E293B' : '#A0AEC0' }} />
      <div className="flex-1 min-w-0">
        <p className="text-[11px] uppercase tracking-wide font-semibold" style={{ color:'#718096' }}>{label}</p>
        <p
          className="text-sm mt-0.5 leading-snug"
          style={{ color: highlight ? '#1A202C' : '#4A5568', fontWeight: highlight ? 600 : 400 }}
        >
          {value}
        </p>
      </div>
    </div>
  )
}

// ─── TAB 3 — Fees & Merit ─────────────────────────────────
function FeesAndMeritTab({ programs, studentProfile }) {
  return (
    <div className="flex flex-col gap-4">
      {programs.map((prog) => {
        const formula = MERIT_FORMULA.find((f) => f.program_id === prog.program_id)
        const semFee  = prog.semester_fee_pkr_approx ?? 0
        const sems    = prog.duration_years === '4-5' ? 10 : (Number(prog.duration_years) || 4) * 2

        // Student estimated merit
        let studentMerit = null
        if (formula && studentProfile?.matricPercent && studentProfile?.fscPercent) {
          const { matric_weight_pct: mw, fsc_weight_pct: fw, entry_test_weight_pct: ew } = formula
          if (mw != null && fw != null && ew != null) {
            const etEst = Math.min(100, studentProfile.matricPercent * 0.4 + studentProfile.fscPercent * 0.6)
            studentMerit = Math.round(
              (studentProfile.matricPercent * mw / 100 +
               studentProfile.fscPercent * fw / 100 +
               etEst * ew / 100) * 100,
            ) / 100
          }
        }

        const cutoff  = formula?.approx_recent_closing_merit_pct ?? null
        const gap     = studentMerit != null && cutoff != null ? studentMerit - cutoff : null

        return (
          <div
            key={prog.program_id}
            className="bg-white rounded-2xl border overflow-hidden"
            style={{ borderColor:'#E2E8F0', boxShadow:'0 1px 4px rgba(0,0,0,0.05)' }}
          >
            <div className="px-4 py-3 border-b" style={{ borderColor:'#F1F5F9', background:'#EFF6FF' }}>
              <p className="font-bold text-sm" style={{ color:'#1E293B' }}>{prog.program_name}</p>
            </div>

            <div className="px-4 py-4 flex flex-col gap-5">

              {/* Merit formula visual */}
              {formula && formula.matric_weight_pct != null ? (
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide mb-3" style={{ color:'#718096' }}>
                    Merit Formula
                  </p>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <FormulaBlock
                      label="Matric"
                      pct={formula.matric_weight_pct}
                      color="#1E293B"
                      bg="#EFF6FF"
                    />
                    <span className="text-base font-bold" style={{ color:'#CBD5E0' }}>+</span>
                    <FormulaBlock
                      label="FSc"
                      pct={formula.fsc_weight_pct}
                      color="#475569"
                      bg="#D6EAF8"
                    />
                    <span className="text-base font-bold" style={{ color:'#CBD5E0' }}>+</span>
                    <FormulaBlock
                      label="Entry Test"
                      pct={formula.entry_test_weight_pct}
                      color="#1A5276"
                      bg="#AED6F1"
                    />
                    <span className="text-base font-bold" style={{ color:'#CBD5E0' }}>=</span>
                    <span className="text-sm font-extrabold" style={{ color:'#1E293B' }}>Merit %</span>
                  </div>

                  {/* ML Trend Chart — replaces the old static bar chart */}
                  {formula.historical_cutoffs?.length >= 2 && (
                    <div className="mt-5 pt-4 border-t" style={{ borderColor:'#F1F5F9' }}>
                      <MeritTrendChart
                        historicalCutoffs={formula.historical_cutoffs}
                        studentMeritScore={studentMerit}
                        programName={prog.program_name}
                      />
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-3 rounded-xl text-xs" style={{ background:'#F1F5F9', color:'#718096' }}>
                  Merit formula varies by department. Check the university's admission page for the exact formula.
                </div>
              )}

              {/* Student vs cutoff */}
              {(studentMerit != null || cutoff != null) && (
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide mb-3" style={{ color:'#718096' }}>
                    Your Score vs Cutoff
                  </p>
                  <div className="flex flex-col gap-2">
                    {cutoff != null && (
                      <div className="flex items-center justify-between text-sm">
                        <span style={{ color:'#4A5568' }}>Last closing merit (2025)</span>
                        <strong style={{ color:'#1A202C' }}>{cutoff}%</strong>
                      </div>
                    )}
                    {studentMerit != null && (
                      <div className="flex items-center justify-between text-sm">
                        <span style={{ color:'#4A5568' }}>Your estimated merit</span>
                        <strong style={{ color:'#1E293B' }}>{studentMerit.toFixed(2)}%</strong>
                      </div>
                    )}
                    {gap != null && (
                      <div
                        className="flex items-center justify-between text-sm px-3 py-2 rounded-xl mt-1"
                        style={{
                          background: gap >= 5 ? '#EFF6FF' : gap >= 0 ? '#FEF9E7' : '#FDEDEC',
                          color: gap >= 5 ? '#1D4ED8' : gap >= 0 ? '#B7770D' : '#C0392B',
                        }}
                      >
                        <span className="font-semibold">
                          {gap >= 5 ? '✓ Safe margin' : gap >= 0 ? '~ Close to cutoff' : '⚠ Below cutoff'}
                        </span>
                        <strong>{gap >= 0 ? `+${gap.toFixed(2)}%` : `${gap.toFixed(2)}%`}</strong>
                      </div>
                    )}
                    {studentMerit == null && (
                      <p className="text-xs" style={{ color:'#A0AEC0' }}>
                        Complete the quiz to see your estimated merit here.
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Fee breakdown */}
              <div>
                <p className="text-xs font-bold uppercase tracking-wide mb-3" style={{ color:'#718096' }}>
                  Fee Breakdown
                </p>
                <div className="flex flex-col gap-2">
                  <FeeRow label="Semester fee (approx.)" value={fmtFee(semFee)} bold />
                  <FeeRow label={`× ${sems} semesters (${prog.duration_years} years)`} value="" />
                  <div className="border-t pt-2 mt-1" style={{ borderColor:'#E2E8F0' }}>
                    <FeeRow
                      label="Total estimated cost"
                      value={fmtFee(semFee * sems)}
                      highlight
                    />
                  </div>
                  {prog.fee_source_note && (
                    <p className="text-[11px] mt-1" style={{ color:'#A0AEC0' }}>
                      ℹ️ {prog.fee_source_note}
                    </p>
                  )}
                </div>
              </div>

            </div>
          </div>
        )
      })}
    </div>
  )
}

function FormulaBlock({ label, pct, color, bg }) {
  return (
    <div
      className="flex flex-col items-center px-3 py-2 rounded-xl"
      style={{ background: bg, minWidth: 64 }}
    >
      <span className="text-lg font-extrabold leading-none" style={{ color }}>{pct}%</span>
      <span className="text-[10px] font-semibold mt-0.5" style={{ color }}>{label}</span>
    </div>
  )
}

function FeeRow({ label, value, bold, highlight }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span style={{ color:'#4A5568' }}>{label}</span>
      {value && (
        <span
          style={{
            color: highlight ? '#1E293B' : '#1A202C',
            fontWeight: bold || highlight ? 700 : 400,
            fontSize: highlight ? '1rem' : undefined,
          }}
        >
          {value}
        </span>
      )}
    </div>
  )
}

// ─── TAB 4 — Hostel & Life ────────────────────────────────
function HostelTab({ campuses, uniName }) {
  const hostels = HOSTEL_INFO.filter((h) => campuses.some((c) => c.campus_id === h.campus_id))

  return (
    <div className="flex flex-col gap-4">
      {hostels.length === 0 ? (
        <div className="bg-white rounded-2xl border p-6 flex flex-col items-center gap-3 text-center" style={{ borderColor:'#E2E8F0' }}>
          <Home size={36} style={{ color:'#CBD5E0' }} />
          <p className="font-semibold" style={{ color:'#1A202C' }}>No hostel data on file</p>
          <p className="text-sm" style={{ color:'#4A5568' }}>
            Check directly with {uniName} for current hostel availability.
          </p>
        </div>
      ) : (
        hostels.map((h) => {
          const campus = campuses.find((c) => c.campus_id === h.campus_id)
          return (
            <div
              key={h.hostel_id}
              className="bg-white rounded-2xl border overflow-hidden"
              style={{ borderColor:'#E2E8F0', boxShadow:'0 1px 4px rgba(0,0,0,0.05)' }}
            >
              {/* Header */}
              <div
                className="px-4 py-3 border-b flex items-center justify-between"
                style={{ borderColor:'#F1F5F9', background:'#EFF6FF' }}
              >
                <div className="flex items-center gap-2">
                  <Home size={16} style={{ color:'#1D4ED8' }} />
                  <p className="font-bold text-sm" style={{ color:'#1D4ED8' }}>
                    Hostel Available
                  </p>
                </div>
                {campus && (
                  <span className="text-[11px] font-medium" style={{ color:'#4A5568' }}>
                    {campus.city} campus
                  </span>
                )}
              </div>

              {/* Details */}
              <div className="px-4 py-4 flex flex-col gap-3">
                <HostelRow label="Available for"    value={h.available_for} />
                <HostelRow
                  label="Monthly cost (approx.)"
                  value={`~${fmtFee(h.monthly_cost_pkr_approx)} / month`}
                  highlight
                />
                <HostelRow
                  label="Mess / food included"
                  value={h.mess_included ? '✓ Yes — mess included' : '✗ No — arrange separately'}
                  positive={h.mess_included}
                />

                {/* Availability note */}
                <div
                  className="flex items-start gap-2 p-3 rounded-xl text-xs mt-1"
                  style={{ background:'#FEF9E7', color:'#B7770D' }}
                >
                  <Info size={13} className="flex-shrink-0 mt-0.5" />
                  <span>{h.seat_availability_note}</span>
                </div>
              </div>
            </div>
          )
        })
      )}

      {/* Map placeholder */}
      <div className="bg-white rounded-2xl border overflow-hidden" style={{ borderColor:'#E2E8F0' }}>
        <div className="px-4 py-3 border-b" style={{ borderColor:'#F1F5F9' }}>
          <p className="font-bold text-sm flex items-center gap-2" style={{ color:'#1A202C' }}>
            <MapPin size={15} style={{ color:'#1E293B' }} /> Campus Location
          </p>
        </div>
        <div
          className="flex flex-col items-center justify-center gap-2 py-10"
          style={{ background:'#F1F5F9' }}
        >
          <MapPin size={32} style={{ color:'#CBD5E0' }} />
          <p className="text-sm font-medium" style={{ color:'#A0AEC0' }}>Map coming soon</p>
          <p className="text-xs" style={{ color:'#CBD5E0' }}>
            Open the university website for directions
          </p>
          {campuses[0]?.address && (
            <p className="text-xs font-medium mt-1 px-4 text-center" style={{ color:'#4A5568' }}>
              📍 {campuses[0].address}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

function HostelRow({ label, value, highlight, positive }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <span className="text-[11px] uppercase tracking-wide font-semibold mt-0.5" style={{ color:'#718096' }}>
        {label}
      </span>
      <span
        className="text-sm font-semibold text-right"
        style={{
          color: highlight ? '#1E293B'
               : positive === true ? '#1D4ED8'
               : positive === false ? '#C0392B'
               : '#1A202C',
        }}
      >
        {value}
      </span>
    </div>
  )
}

// ─── Main Page ────────────────────────────────────────────

export default function UniversityDetailPage() {
  const { id }    = useParams()
  const { state } = useLocation()
  const navigate  = useNavigate()

  const [activeTab, setActiveTab]   = useState('programs')
  const [prevTab, setPrevTab]       = useState('programs')
  const [saved, setSavedState]      = useState(() => getSaved().includes(id))
  const [reminderMap, setReminderMap] = useState(getReminders)
  const tabBarRef = useRef(null)

  // Re-sync reminder state when storage event fires
  useEffect(() => {
    function sync() { setReminderMap(getReminders()) }
    window.addEventListener('storage', sync)
    return () => window.removeEventListener('storage', sync)
  }, [])

  const uni = UNIVERSITIES.find((u) => u.university_id === id)
  if (!uni) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-6 text-center"
           style={{ background:'#F1F5F9' }}>
        <AlertCircle size={40} style={{ color:'#CBD5E0' }} />
        <p className="font-semibold" style={{ color:'#1A202C' }}>University not found.</p>
        <button onClick={() => navigate(-1)} className="text-sm font-medium" style={{ color:'#1E293B' }}>
          ← Go back
        </button>
      </div>
    )
  }

  const campuses = CAMPUSES.filter((c) => c.university_id === id)
  const programs = PROGRAMS.filter((p) => campuses.some((c) => c.campus_id === p.campus_id))

  // Student profile for merit estimate (from navigation state or localStorage)
  const studentProfile = useMemo(() => {
    if (state?.match) {
      return JSON.parse(localStorage.getItem('uniFinderProfile') ?? '{}')
    }
    try { return JSON.parse(localStorage.getItem('uniFinderProfile') ?? '{}') } catch { return {} }
  }, [state])

  function toggleSaved() {
    const arr = getSaved()
    const next = arr.includes(id) ? arr.filter((x) => x !== id) : [...arr, id]
    setSaved(next)
    setSavedState(!saved)
  }

  function switchTab(tabId) {
    setPrevTab(activeTab)
    setActiveTab(tabId)
    // Scroll tab bar button into view
    setTimeout(() => {
      const el = tabBarRef.current?.querySelector(`[data-tab="${tabId}"]`)
      el?.scrollIntoView({ behavior:'smooth', block:'nearest', inline:'center' })
    }, 50)
  }

  // Touch swipe for tab switching
  const touchStartX = useRef(null)
  function handleTouchStart(e) { touchStartX.current = e.touches[0].clientX }
  function handleTouchEnd(e) {
    if (touchStartX.current == null) return
    const dx = e.changedTouches[0].clientX - touchStartX.current
    if (Math.abs(dx) < 50) return
    const tabIds = TABS.map((t) => t.id)
    const cur    = tabIds.indexOf(activeTab)
    if (dx < 0 && cur < tabIds.length - 1) switchTab(tabIds[cur + 1])
    if (dx > 0 && cur > 0)                  switchTab(tabIds[cur - 1])
    touchStartX.current = null
  }

  return (
    <>
      <style>{STYLE}</style>
      <div className="flex flex-col min-h-screen" style={{ background:'#F1F5F9' }}>

        {/* ── HEADER ────────────────────────────────── */}
        <div
          className="px-4 pt-4 pb-5"
          style={{ background:'linear-gradient(135deg,#1E293B,#475569)' }}
        >
          {/* Back + save row */}
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-1.5 text-sm font-medium"
              style={{ color:'rgba(255,255,255,0.8)' }}
            >
              <ArrowLeft size={18} /> Back
            </button>
            <button
              onClick={toggleSaved}
              className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg transition-transform hover:scale-105"
              style={{
                background: saved ? '#E74C3C' : 'rgba(255,255,255,0.15)',
                color: '#ffffff',
              }}
            >
              <Heart size={13} fill={saved ? '#ffffff' : 'none'} />
              {saved ? 'Saved' : 'Save'}
            </button>
          </div>

          {/* University info */}
          <div className="flex items-start gap-3">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center font-extrabold text-lg text-white flex-shrink-0"
              style={{ background:'rgba(255,255,255,0.15)', backdropFilter:'blur(8px)' }}
            >
              {initials(uni.short_name || uni.name)}
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="font-extrabold text-white leading-snug text-base">
                {uni.name}
              </h1>
              <div className="flex flex-wrap gap-1.5 mt-1.5">
                {uni.short_name && (
                  <span
                    className="text-[11px] font-bold px-2 py-0.5 rounded-full"
                    style={{ background:'rgba(255,255,255,0.2)', color:'#ffffff' }}
                  >
                    {uni.short_name}
                  </span>
                )}
                {uni.hec_recognized && (
                  <span
                    className="text-[11px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1"
                    style={{ background:'#2563EB', color:'#FFFFFF' }}
                  >
                    <CheckCircle2 size={10} /> HEC Recognized
                  </span>
                )}
                <span
                  className="text-[11px] font-semibold px-2 py-0.5 rounded-full"
                  style={{ background:'rgba(255,255,255,0.15)', color:'rgba(255,255,255,0.9)' }}
                >
                  {uni.sector}
                </span>
              </div>

              <div className="flex flex-wrap gap-3 mt-2 text-xs" style={{ color:'rgba(255,255,255,0.75)' }}>
                <span className="flex items-center gap-1"><MapPin size={11} />{uni.city}</span>
                <span className="flex items-center gap-1"><Building2 size={11} />{uni.province}</span>
              </div>
            </div>
          </div>

          {/* Website button */}
          {uni.website && (
            <a
              href={uni.website}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-bold transition-transform hover:scale-[1.02]"
              style={{ background:'rgba(255,255,255,0.15)', color:'#ffffff', backdropFilter:'blur(8px)' }}
            >
              <Globe size={15} /> {uni.website.replace(/https?:\/\//, '')}
              <ExternalLink size={13} />
            </a>
          )}
        </div>

        {/* ── STICKY TAB BAR ────────────────────────── */}
        <div
          className="sticky top-0 z-20 border-b"
          style={{ background:'#ffffff', borderColor:'#E2E8F0' }}
        >
          <div
            ref={tabBarRef}
            className="flex overflow-x-auto no-scrollbar"
          >
            {TABS.map((tab) => {
              const Icon    = tab.icon
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  data-tab={tab.id}
                  onClick={() => switchTab(tab.id)}
                  className="flex-shrink-0 flex flex-col items-center gap-0.5 px-4 py-3 text-xs font-semibold border-b-2 transition-colors"
                  style={{
                    borderBottomColor: isActive ? '#1E293B' : 'transparent',
                    color: isActive ? '#1E293B' : '#718096',
                    minWidth: 80,
                  }}
                >
                  <Icon size={16} />
                  <span>{tab.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* ── TAB CONTENT ───────────────────────────── */}
        <div
          className="flex-1 px-4 py-5 max-w-2xl w-full mx-auto"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div key={activeTab} className="tab-content">
            {activeTab === 'programs'  && <ProgramsTab programs={programs} campuses={campuses} />}
            {activeTab === 'admission' && <AdmissionTab programs={programs} reminderMap={reminderMap} />}
            {activeTab === 'fees'      && <FeesAndMeritTab programs={programs} studentProfile={studentProfile} />}
            {activeTab === 'hostel'    && <HostelTab campuses={campuses} uniName={uni.short_name || uni.name} />}
          </div>

          {/* Swipe hint */}
          <p className="text-[11px] text-center mt-6 mb-2" style={{ color:'#CBD5E0' }}>
            ← swipe to change tab →
          </p>
        </div>

        {/* ── STICKY BOTTOM BAR ─────────────────────── */}
        <div
          className="sticky bottom-0 z-20 border-t px-4 py-3 flex items-center gap-3"
          style={{ background:'#ffffff', borderColor:'#E2E8F0', boxShadow:'0 -2px 12px rgba(0,0,0,0.06)' }}
        >
          {/* Save / heart */}
          <button
            onClick={toggleSaved}
            className="w-12 h-12 rounded-xl border-2 flex items-center justify-center flex-shrink-0 transition-transform hover:scale-105 active:scale-95"
            style={{
              borderColor: saved ? '#E74C3C' : '#E2E8F0',
              background:  saved ? '#FDEDEC' : '#ffffff',
            }}
          >
            <Heart
              size={20}
              strokeWidth={2}
              style={{ color: saved ? '#E74C3C' : '#CBD5E0' }}
              fill={saved ? '#E74C3C' : 'none'}
            />
          </button>

          {/* Apply Now */}
          {uni.website ? (
            <a
              href={uni.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 h-12 rounded-xl font-bold text-sm text-white transition-transform hover:scale-[1.02] active:scale-[0.98]"
              style={{ background:'#1E293B' }}
            >
              Apply Now <ExternalLink size={15} />
            </a>
          ) : (
            <div
              className="flex-1 flex items-center justify-center gap-2 h-12 rounded-xl font-bold text-sm"
              style={{ background:'#F1F5F9', color:'#A0AEC0' }}
            >
              Website not available
            </div>
          )}
        </div>

      </div>
    </>
  )
}

