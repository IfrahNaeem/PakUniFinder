import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ChevronLeft, ChevronRight, Microscope, Cog, Monitor, BarChart2,
  BookOpen, Cpu, Zap, Stethoscope, Briefcase, FlaskConical, Scale,
  MapPin, CheckCircle2, Loader2,
} from 'lucide-react'

// ─── Inline styles: range input + animations ──────────────
const STYLE = `
  @keyframes stepIn {
    from { opacity: 0; transform: translateX(24px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes stepBack {
    from { opacity: 0; transform: translateX(-24px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes spin { to { transform: rotate(360deg); } }
  .step-in   { animation: stepIn  0.28s cubic-bezier(.4,0,.2,1) both; }
  .step-back { animation: stepBack 0.28s cubic-bezier(.4,0,.2,1) both; }

  input[type=range] {
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    height: 6px;
    border-radius: 9999px;
    background: #E2E8F0;
    outline: none;
    cursor: pointer;
  }
  input[type=range]::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 26px;
    height: 26px;
    border-radius: 50%;
    background: #1E293B;
    border: 3px solid #ffffff;
    box-shadow: 0 2px 8px rgba(30,41,59,0.35);
    cursor: pointer;
    transition: transform 0.15s;
  }
  input[type=range]::-webkit-slider-thumb:active { transform: scale(1.2); }
  input[type=range]::-moz-range-thumb {
    width: 26px; height: 26px;
    border-radius: 50%;
    background: #1E293B;
    border: 3px solid #ffffff;
    box-shadow: 0 2px 8px rgba(30,41,59,0.35);
    cursor: pointer;
  }
`

// ─── Static data ──────────────────────────────────────────

const FSC_GROUPS = [
  { id: 'Pre-Medical',    icon: Microscope,   label: 'Pre-Medical',     sub: 'Biology, Chemistry, Physics' },
  { id: 'Pre-Engineering',icon: Cog,          label: 'Pre-Engineering', sub: 'Math, Physics, Chemistry' },
  { id: 'ICS',            icon: Monitor,      label: 'ICS',             sub: 'Computer Science, Math, Physics' },
  { id: 'Commerce',       icon: BarChart2,    label: 'Commerce / ICOM', sub: 'Accounting, Economics, Business' },
  { id: 'Arts',           icon: BookOpen,     label: 'Arts / Humanities',sub: 'Urdu, English, History, Civics' },
]

const INTERESTS = [
  { id: 'CS-IT',          icon: Cpu,          label: 'Computer Science & IT',          sub: 'Software, AI, Networks' },
  { id: 'Engineering',    icon: Zap,          label: 'Engineering',                    sub: 'Electrical, Civil, Mechanical' },
  { id: 'Medical',        icon: Stethoscope,  label: 'Medical & Health Sciences',      sub: 'MBBS, BDS, Pharmacy' },
  { id: 'Business',       icon: Briefcase,    label: 'Business & Management',          sub: 'BBA, Economics, Finance' },
  { id: 'Natural Sciences',icon: FlaskConical,label: 'Natural Sciences',               sub: 'Biology, Chemistry, Physics' },
  { id: 'Social Sciences',icon: Scale,        label: 'Law & Social Sciences',          sub: 'LLB, Sociology, Political Science' },
]

const CITIES = [
  'Islamabad / Rawalpindi',
  'Lahore',
  'Karachi',
  'Faisalabad',
  'Multan',
  'Peshawar',
  'Quetta',
]

const SECTORS = [
  { id: 'Government', label: 'Government Only',  sub: 'Subsidized fees, highly competitive' },
  { id: 'Private',    label: 'Private Only',     sub: 'More seats, higher fees' },
  { id: 'Both',       label: 'Show Both',        sub: 'See all options' },
]

const TOTAL_STEPS = 5
const FEE_MIN = 15000
const FEE_MAX = 250000

// ─── Helpers ──────────────────────────────────────────────

function fmtPKR(n) {
  if (n >= 100000) return `PKR ${(n / 1000).toFixed(0)}k`
  return `PKR ${n.toLocaleString('en-PK')}`
}

function feeLabel(fee) {
  if (fee < 50000)  return { text: 'Government Range',  color: '#2563EB' }
  if (fee < 150000) return { text: 'Mid Private',       color: '#F39C12' }
  return               { text: 'Top Private',           color: '#E74C3C' }
}

function academicScore(matric, fsc) {
  return Math.round(matric * 0.3 + fsc * 0.7)
}

function meritBand(score) {
  if (score >= 80) return { label: 'Excellent — Competitive for top universities', color: '#1D4ED8', bg: '#EFF6FF', bar: '#2563EB' }
  if (score >= 70) return { label: 'Good — Eligible for most programs', color: '#1E293B', bg: '#EFF6FF', bar: '#475569' }
  if (score >= 60) return { label: 'Average — Government universities accessible', color: '#B7770D', bg: '#FEF9E7', bar: '#F39C12' }
  return                  { label: 'Below 60% — Limited options', color: '#C0392B', bg: '#FDEDEC', bar: '#E74C3C' }
}

function isStepValid(step, profile) {
  if (step === 1) return !!profile.fscGroup
  if (step === 2) return true
  if (step === 3) return profile.interests.length > 0
  if (step === 4) return profile.preferredCities.length > 0
  if (step === 5) return !!profile.sector
  return false
}

// ─── Sub-components ───────────────────────────────────────

function SelectCard({ selected, onClick, icon: Icon, label, sub, multi = false }) {
  const active = multi
    ? Array.isArray(selected) && selected.includes(label)
    : selected === label

  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full flex items-center gap-4 text-left rounded-2xl border-2 px-4 py-4 transition-all duration-150 active:scale-[0.98]"
      style={{
        borderColor:     active ? '#1E293B' : '#E2E8F0',
        background:      active ? '#EFF6FF' : '#ffffff',
        boxShadow:       active ? '0 2px 12px rgba(30,41,59,0.15)' : '0 1px 4px rgba(0,0,0,0.05)',
      }}
    >
      <span
        className="flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center"
        style={{ background: active ? '#1E293B' : '#F1F5F9' }}
      >
        <Icon size={20} color={active ? '#ffffff' : '#4A5568'} strokeWidth={1.8} />
      </span>
      <span className="flex-1 min-w-0">
        <span className="block font-semibold text-sm" style={{ color: active ? '#1E293B' : '#1A202C' }}>
          {label}
        </span>
        <span className="block text-xs mt-0.5 truncate" style={{ color: '#4A5568' }}>{sub}</span>
      </span>
      {active && (
        <CheckCircle2 size={20} color="#2563EB" className="flex-shrink-0" />
      )}
    </button>
  )
}

function CityChip({ city, selected, onToggle }) {
  const active = selected.includes(city)
  return (
    <button
      type="button"
      onClick={() => onToggle(city)}
      className="flex items-center gap-1.5 px-4 py-2.5 rounded-full border-2 text-sm font-semibold transition-all duration-150 active:scale-95"
      style={{
        borderColor: active ? '#1E293B' : '#CBD5E0',
        background:  active ? '#1E293B' : '#ffffff',
        color:       active ? '#ffffff' : '#4A5568',
      }}
    >
      <MapPin size={13} />
      {city}
    </button>
  )
}

// ─── Step panels ──────────────────────────────────────────

function Step1({ profile, update }) {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-xs text-center mb-1" style={{ color: '#4A5568' }}>
        This determines which programs you are eligible for.
      </p>
      {FSC_GROUPS.map((g) => (
        <SelectCard
          key={g.id}
          selected={profile.fscGroup}
          onClick={() => update('fscGroup', g.id)}
          icon={g.icon}
          label={g.id}
          sub={g.sub}
        />
      ))}
    </div>
  )
}

function Step2({ profile, update }) {
  const score = academicScore(profile.matricPercent, profile.fscPercent)
  const band  = meritBand(score)

  return (
    <div className="flex flex-col gap-8">
      {/* Matric slider */}
      <div>
        <div className="flex justify-between items-baseline mb-3">
          <label className="font-semibold text-sm" style={{ color: '#1A202C' }}>
            Matric Percentage
          </label>
          <span className="text-2xl font-extrabold" style={{ color: '#1E293B' }}>
            {profile.matricPercent}%
          </span>
        </div>
        <input
          type="range" min={30} max={100} step={1}
          value={profile.matricPercent}
          onChange={(e) => update('matricPercent', Number(e.target.value))}
          style={{
            background: `linear-gradient(to right, #1E293B ${((profile.matricPercent - 30) / 70) * 100}%, #E2E8F0 0%)`,
          }}
        />
        <div className="flex justify-between text-xs mt-1" style={{ color: '#718096' }}>
          <span>30%</span><span>65%</span><span>80%</span><span>100%</span>
        </div>
      </div>

      {/* FSc slider */}
      <div>
        <div className="flex justify-between items-baseline mb-3">
          <label className="font-semibold text-sm" style={{ color: '#1A202C' }}>
            FSc / Intermediate Percentage
          </label>
          <span className="text-2xl font-extrabold" style={{ color: '#1E293B' }}>
            {profile.fscPercent}%
          </span>
        </div>
        <input
          type="range" min={30} max={100} step={1}
          value={profile.fscPercent}
          onChange={(e) => update('fscPercent', Number(e.target.value))}
          style={{
            background: `linear-gradient(to right, #1E293B ${((profile.fscPercent - 30) / 70) * 100}%, #E2E8F0 0%)`,
          }}
        />
        <div className="flex justify-between text-xs mt-1" style={{ color: '#718096' }}>
          <span>30%</span><span>55%</span><span>75%</span><span>100%</span>
        </div>
      </div>

      {/* Live merit gauge */}
      <div className="rounded-2xl p-4" style={{ background: band.bg }}>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: band.color }}>
            Estimated Academic Score
          </span>
          <span className="text-2xl font-extrabold" style={{ color: band.color }}>{score}%</span>
        </div>
        <div className="w-full h-2.5 rounded-full" style={{ background: 'rgba(0,0,0,0.08)' }}>
          <div
            className="h-2.5 rounded-full transition-all duration-500"
            style={{ width: `${score}%`, background: band.bar }}
          />
        </div>
        <p className="text-xs mt-2" style={{ color: band.color }}>{band.label}</p>
        <p className="text-[11px] mt-1" style={{ color: '#718096' }}>
          Formula: Matric 30% + FSc 70% (entry test added later)
        </p>
      </div>
    </div>
  )
}

function Step3({ profile, update }) {
  function toggleInterest(id) {
    const cur = profile.interests
    update('interests', cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id])
  }

  return (
    <div className="flex flex-col gap-3">
      <p className="text-xs text-center mb-1" style={{ color: '#4A5568' }}>
        Pick one or more — we'll show programs in all areas you choose.
      </p>
      {INTERESTS.map((i) => (
        <SelectCard
          key={i.id}
          selected={profile.interests}
          onClick={() => toggleInterest(i.id)}
          icon={i.icon}
          label={i.id}
          sub={i.sub}
          multi
        />
      ))}
    </div>
  )
}

function Step4({ profile, update }) {
  const ANY = 'Any City in Pakistan'
  const allCitiesSelected = profile.preferredCities.includes(ANY)

  function toggleCity(city) {
    if (city === ANY) {
      update('preferredCities', allCitiesSelected ? [] : [ANY])
      return
    }
    const cur = profile.preferredCities.filter((c) => c !== ANY)
    update('preferredCities', cur.includes(city) ? cur.filter((c) => c !== city) : [...cur, city])
  }

  return (
    <div className="flex flex-col gap-5">
      <p className="text-xs text-center" style={{ color: '#4A5568' }}>
        Tap cities to toggle. Select multiple if you're open to relocating.
      </p>

      {/* Any City button */}
      <button
        type="button"
        onClick={() => toggleCity(ANY)}
        className="w-full py-4 rounded-2xl border-2 font-bold text-sm transition-all duration-150 active:scale-[0.98]"
        style={{
          borderColor: allCitiesSelected ? '#2563EB' : '#CBD5E0',
          background:  allCitiesSelected ? '#EFF6FF' : '#ffffff',
          color:       allCitiesSelected ? '#1D4ED8' : '#4A5568',
        }}
      >
        {allCitiesSelected ? '✓ ' : ''}Any City in Pakistan
      </button>

      <div className="flex flex-wrap gap-2 justify-center">
        {CITIES.map((city) => (
          <CityChip
            key={city}
            city={city}
            selected={allCitiesSelected ? CITIES : profile.preferredCities}
            onToggle={toggleCity}
          />
        ))}
      </div>

      {profile.preferredCities.length > 0 && (
        <p className="text-xs text-center" style={{ color: '#1E293B' }}>
          {allCitiesSelected
            ? 'Showing universities in all cities'
            : `${profile.preferredCities.length} city/cities selected`}
        </p>
      )}
    </div>
  )
}

function Step5({ profile, update }) {
  const fl = feeLabel(profile.maxSemesterFee)
  const pct = ((profile.maxSemesterFee - FEE_MIN) / (FEE_MAX - FEE_MIN)) * 100

  return (
    <div className="flex flex-col gap-7">
      {/* Sector */}
      <div>
        <p className="font-semibold text-sm mb-3" style={{ color: '#1A202C' }}>
          University Type
        </p>
        <div className="flex flex-col gap-2">
          {SECTORS.map((s) => {
            const active = profile.sector === s.id
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => update('sector', s.id)}
                className="flex items-center justify-between px-4 py-3.5 rounded-xl border-2 transition-all duration-150 active:scale-[0.98]"
                style={{
                  borderColor: active ? '#1E293B' : '#E2E8F0',
                  background:  active ? '#EFF6FF' : '#ffffff',
                }}
              >
                <div className="text-left">
                  <p className="font-semibold text-sm" style={{ color: active ? '#1E293B' : '#1A202C' }}>
                    {s.label}
                  </p>
                  <p className="text-xs" style={{ color: '#4A5568' }}>{s.sub}</p>
                </div>
                {active && <CheckCircle2 size={18} color="#2563EB" />}
              </button>
            )
          })}
        </div>
      </div>

      {/* Budget slider */}
      <div>
        <div className="flex justify-between items-baseline mb-3">
          <p className="font-semibold text-sm" style={{ color: '#1A202C' }}>
            Max Semester Fee
          </p>
          <div className="text-right">
            <span className="text-xl font-extrabold" style={{ color: '#1E293B' }}>
              {fmtPKR(profile.maxSemesterFee)}
            </span>
          </div>
        </div>

        <input
          type="range"
          min={FEE_MIN}
          max={FEE_MAX}
          step={5000}
          value={profile.maxSemesterFee}
          onChange={(e) => update('maxSemesterFee', Number(e.target.value))}
          style={{
            background: `linear-gradient(to right, #1E293B ${pct}%, #E2E8F0 0%)`,
          }}
        />

        <div className="flex justify-between text-xs mt-1" style={{ color: '#718096' }}>
          <span>PKR 15k</span><span>50k</span><span>150k</span><span>250k</span>
        </div>

        {/* Range label */}
        <div
          className="mt-3 flex items-center gap-2 px-3 py-2 rounded-lg"
          style={{ background: '#F1F5F9' }}
        >
          <span
            className="w-2.5 h-2.5 rounded-full flex-shrink-0"
            style={{ background: fl.color }}
          />
          <span className="text-xs font-semibold" style={{ color: fl.color }}>{fl.text}</span>
          <span className="text-xs ml-auto" style={{ color: '#718096' }}>
            {profile.maxSemesterFee < 50000
              ? 'Government universities are within this range'
              : profile.maxSemesterFee < 150000
              ? 'Mid-tier private universities are accessible'
              : 'All universities including top private are shown'}
          </span>
        </div>
      </div>
    </div>
  )
}

// ─── Loading overlay ──────────────────────────────────────

function LoadingScreen() {
  const tips = [
    'Calculating your estimated merit score…',
    'Matching programs to your FSc group…',
    'Checking entry test requirements…',
    'Filtering by your city & budget…',
  ]
  const [tip, setTip] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setTip((t) => (t + 1) % tips.length), 380)
    return () => clearInterval(id)
  }, [])

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-6 px-8 text-center"
      style={{ background: 'rgba(30,41,59,0.97)', backdropFilter: 'blur(4px)' }}
    >
      <Loader2
        size={52}
        color="#2563EB"
        style={{ animation: 'spin 0.9s linear infinite' }}
      />
      <div>
        <p className="text-xl font-bold text-white">Finding your best matches…</p>
        <p className="text-sm mt-2 text-blue-200 min-h-[20px] transition-all">{tips[tip]}</p>
      </div>
      <div className="flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <span key={i} className="w-2 h-2 rounded-full" style={{ background: 'rgba(255,255,255,0.3)' }} />
        ))}
      </div>
    </div>
  )
}

// ─── STEP META ────────────────────────────────────────────

const STEP_META = [
  { title: 'What is your FSc / Matric group?',     hint: 'Step 1 of 5 — Education Group' },
  { title: 'Your marks (approximate is fine)',      hint: 'Step 2 of 5 — Academic Scores' },
  { title: 'Which field excites you?',              hint: 'Step 3 of 5 — Field of Interest' },
  { title: 'Which cities can you study in?',        hint: 'Step 4 of 5 — Location' },
  { title: 'University type & budget',              hint: 'Step 5 of 5 — Preferences' },
]

// ─── Main page ────────────────────────────────────────────

const DEFAULT_PROFILE = {
  fscGroup:         '',
  matricPercent:    70,
  fscPercent:       65,
  interests:        [],
  preferredCities:  [],
  sector:           'Both',
  maxSemesterFee:   100000,
}

export default function QuizPage() {
  const navigate  = useNavigate()
  const [step, setStep]       = useState(1)
  const [dir, setDir]         = useState('forward')   // 'forward' | 'back'
  const [profile, setProfile] = useState(() => {
    try {
      const saved = localStorage.getItem('uniFinderProfile')
      return saved ? { ...DEFAULT_PROFILE, ...JSON.parse(saved) } : DEFAULT_PROFILE
    } catch { return DEFAULT_PROFILE }
  })
  const [loading, setLoading] = useState(false)

  function update(key, value) {
    setProfile((prev) => ({ ...prev, [key]: value }))
  }

  function goNext() {
    if (!isStepValid(step, profile)) return
    if (step < TOTAL_STEPS) {
      setDir('forward')
      setStep((s) => s + 1)
    } else {
      handleSubmit()
    }
  }

  function goBack() {
    if (step > 1) {
      setDir('back')
      setStep((s) => s - 1)
    }
  }

  function handleSubmit() {
    setLoading(true)
    localStorage.setItem('uniFinderProfile', JSON.stringify(profile))
    setTimeout(() => {
      setLoading(false)
      navigate('/results', { state: { profile } })
    }, 1500)
  }

  const valid    = isStepValid(step, profile)
  const meta     = STEP_META[step - 1]
  const progress = (step / TOTAL_STEPS) * 100

  return (
    <>
      <style>{STYLE}</style>
      {loading && <LoadingScreen />}

      <div className="flex flex-col min-h-screen" style={{ background: '#F1F5F9' }}>

        {/* ── TOP: progress + title ────────────────────── */}
        <div
          className="sticky top-0 z-10 px-5 pt-5 pb-4 border-b"
          style={{ background: '#ffffff', borderColor: '#E2E8F0' }}
        >
          {/* Step hint */}
          <p className="text-[11px] font-bold uppercase tracking-widest mb-2" style={{ color: '#4A5568' }}>
            {meta.hint}
          </p>

          {/* Progress bar */}
          <div className="w-full h-2 rounded-full mb-3" style={{ background: '#E2E8F0' }}>
            <div
              className="h-2 rounded-full transition-all duration-500"
              style={{ width: `${progress}%`, background: '#1E293B' }}
            />
          </div>

          {/* Step dots */}
          <div className="flex items-center gap-1.5">
            {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
              <div
                key={i}
                className="rounded-full transition-all duration-300"
                style={{
                  width:   i + 1 === step ? 20 : 8,
                  height:  8,
                  background: i + 1 <= step ? '#1E293B' : '#CBD5E0',
                }}
              />
            ))}
          </div>
        </div>

        {/* ── STEP CONTENT ─────────────────────────────── */}
        <div className="flex-1 overflow-y-auto px-5 py-6">
          {/* Question title */}
          <h1
            key={`title-${step}`}
            className={`text-xl font-extrabold mb-6 leading-snug ${dir === 'forward' ? 'step-in' : 'step-back'}`}
            style={{ color: '#1A202C' }}
          >
            {meta.title}
          </h1>

          {/* Step panel */}
          <div
            key={`panel-${step}`}
            className={dir === 'forward' ? 'step-in' : 'step-back'}
          >
            {step === 1 && <Step1 profile={profile} update={update} />}
            {step === 2 && <Step2 profile={profile} update={update} />}
            {step === 3 && <Step3 profile={profile} update={update} />}
            {step === 4 && <Step4 profile={profile} update={update} />}
            {step === 5 && <Step5 profile={profile} update={update} />}
          </div>
        </div>

        {/* ── STICKY BOTTOM NAV ────────────────────────── */}
        <div
          className="sticky bottom-0 z-10 border-t px-5 py-4 flex items-center gap-3"
          style={{ background: '#ffffff', borderColor: '#E2E8F0' }}
        >
          {/* Back button */}
          <button
            type="button"
            onClick={goBack}
            disabled={step === 1}
            className="flex items-center justify-center w-12 h-12 rounded-xl border-2 transition-all disabled:opacity-25 active:scale-95"
            style={{ borderColor: '#E2E8F0', background: '#ffffff' }}
          >
            <ChevronLeft size={22} color="#1E293B" />
          </button>

          {/* Next / Submit button */}
          <button
            type="button"
            onClick={goNext}
            disabled={!valid}
            className="flex-1 flex items-center justify-center gap-2 h-12 rounded-xl font-bold text-sm transition-all duration-200 disabled:opacity-35 active:scale-[0.98]"
            style={{
              background: valid
                ? step === TOTAL_STEPS ? '#2563EB' : '#1E293B'
                : '#CBD5E0',
              color: '#ffffff',
            }}
          >
            {step === TOTAL_STEPS ? (
              <>Find My Universities <ChevronRight size={18} /></>
            ) : (
              <>Next <ChevronRight size={18} /></>
            )}
          </button>
        </div>

      </div>
    </>
  )
}
