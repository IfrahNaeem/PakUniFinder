import { useState, useEffect, useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Bookmark, BookmarkX, Trash2, SlidersHorizontal, Download,
  Share2, CheckSquare, Square, X, ChevronRight, MapPin,
  Building2, DollarSign, ClipboardList, Home, TrendingUp,
  Clock, CheckCircle2, Target, AlertCircle, Copy, Check,
} from 'lucide-react'
import { loadSaved, removeProgram, matchKey } from '../utils/savedPrograms.js'

// ─── Inline styles ────────────────────────────────────────
const STYLE = `
  @keyframes slideUp {
    from { transform:translateY(100%); opacity:0; }
    to   { transform:translateY(0);    opacity:1; }
  }
  @keyframes fadeIn {
    from { opacity:0; }
    to   { opacity:1; }
  }
  .slide-up  { animation: slideUp 0.28s cubic-bezier(.4,0,.2,1) both; }
  .fade-in   { animation: fadeIn 0.2s ease both; }
  .no-scrollbar::-webkit-scrollbar { display:none; }
  .no-scrollbar { -ms-overflow-style:none; scrollbar-width:none; }
`

// ─── Config ───────────────────────────────────────────────
const CLS = {
  Safe:    { bg:'#EFF6FF', color:'#1D4ED8', border:'#2563EB', icon: CheckCircle2 },
  Target:  { bg:'#FEF9E7', color:'#B7770D', border:'#F39C12', icon: Target },
  Reach:   { bg:'#FDEDEC', color:'#C0392B', border:'#E74C3C', icon: TrendingUp },
  Unknown: { bg:'#F1F5F9', color:'#718096', border:'#CBD5E0', icon: AlertCircle },
}

const COMPARE_ROWS = [
  { key: 'fee',     label: 'Semester Fee',      render: (m) => m.program.semester_fee_pkr_approx ? `Rs ${Number(m.program.semester_fee_pkr_approx).toLocaleString('en-PK')}` : '—' },
  { key: 'total',   label: 'Total Program Fee',  render: (m) => m.program.total_program_fee_pkr_approx ? `Rs ${Number(m.program.total_program_fee_pkr_approx).toLocaleString('en-PK')}` : '—' },
  { key: 'city',    label: 'City',               render: (m) => m.campus.city },
  { key: 'sector',  label: 'Sector',             render: (m) => m.university.sector },
  { key: 'test',    label: 'Entry Test',         render: (m) => m.admissionCycle?.entry_test_required ? m.admissionCycle.entry_test_name : 'Not required' },
  { key: 'window',  label: 'Test Window',        render: (m) => m.admissionCycle?.entry_test_window ?? '—' },
  { key: 'hostel',  label: 'Hostel',             render: (m) => m.hostelInfo ? `Available ~Rs ${Number(m.hostelInfo.monthly_cost_pkr_approx).toLocaleString('en-PK')}/mo` : 'Not available' },
  { key: 'merit',   label: 'Last Cutoff',        render: (m) => m.meritFormula?.approx_recent_closing_merit_pct ? `${m.meritFormula.approx_recent_closing_merit_pct}%` : '—' },
  { key: 'est',     label: 'Your Est. Merit',    render: (m) => m.estimatedMerit != null ? `${m.estimatedMerit.toFixed(1)}%` : '—' },
  { key: 'gap',     label: 'Gap to Cutoff',      render: (m) => m.gap != null ? (m.gap >= 0 ? `+${m.gap.toFixed(1)}%` : `${m.gap.toFixed(1)}%`) : '—' },
  { key: 'dur',     label: 'Duration',           render: (m) => `${m.program.duration_years} years` },
  { key: 'status',  label: 'Your Status',        render: (m) => m.classification },
]

// ─── Helpers ──────────────────────────────────────────────
function initials(s = '') {
  return s.split(' ').slice(0, 2).map((w) => w[0] ?? '').join('').toUpperCase()
}

function clsOf(id) { return CLS[id] ?? CLS.Unknown }

function buildShareText(savedList) {
  const date = new Date().toLocaleDateString('en-PK', { year:'numeric', month:'long', day:'numeric' })
  const lines = [
    '🎓 Pakistan Uni Finder — My Saved Programs',
    `📅 Generated: ${date}`,
    '─────────────────────────',
    '',
  ]
  savedList.forEach((m, i) => {
    lines.push(`${i + 1}. ${m.university.short_name ?? m.university.name} — ${m.program.program_name}`)
    lines.push(`   📍 ${m.campus.city}  |  🏛 ${m.university.sector}`)
    lines.push(`   💰 Semester fee: Rs ${Number(m.program.semester_fee_pkr_approx ?? 0).toLocaleString('en-PK')}`)
    if (m.admissionCycle?.entry_test_required) {
      lines.push(`   📝 Test: ${m.admissionCycle.entry_test_name}`)
      lines.push(`   🗓 Window: ${m.admissionCycle.entry_test_window}`)
    }
    if (m.meritFormula?.approx_recent_closing_merit_pct) {
      lines.push(`   🎯 Last cutoff: ${m.meritFormula.approx_recent_closing_merit_pct}%${m.estimatedMerit != null ? ` | Your est: ${m.estimatedMerit.toFixed(1)}%` : ''}`)
    }
    lines.push(`   ✅ Status: ${m.classification.toUpperCase()}`)
    if (m.university.website) lines.push(`   🌐 ${m.university.website}`)
    lines.push('')
  })
  lines.push('─────────────────────────')
  lines.push('Verify all details directly with the university before applying.')
  lines.push('HEC Pakistan: https://hec.gov.pk')
  return lines.join('\n')
}

// ─── Small sub-components ─────────────────────────────────

function ClassBadge({ cls }) {
  const c = clsOf(cls)
  const Icon = c.icon
  return (
    <span
      className="inline-flex items-center gap-1 text-[11px] font-extrabold px-2 py-0.5 rounded-full flex-shrink-0"
      style={{ background: c.bg, color: c.color }}
    >
      <Icon size={10} strokeWidth={2.5} />
      {cls.toUpperCase()}
    </span>
  )
}

// ─── Saved Program Card ───────────────────────────────────
function SavedCard({ m, checked, onToggle, onRemove, idx }) {
  const c = clsOf(m.classification)

  return (
    <div
      className="bg-white rounded-2xl border overflow-hidden transition-shadow hover:shadow-md"
      style={{
        borderColor: '#E2E8F0',
        borderLeft: `4px solid ${checked ? '#1E293B' : c.border}`,
        boxShadow: checked ? '0 0 0 2px #1E293B' : '0 1px 4px rgba(0,0,0,0.05)',
      }}
    >
      {/* Checkbox row */}
      <div
        className="flex items-center gap-3 px-3 py-2.5 border-b cursor-pointer"
        style={{ borderColor:'#F1F5F9', background: checked ? '#EFF6FF' : '#F1F5F9' }}
        onClick={onToggle}
      >
        {checked
          ? <CheckSquare size={18} style={{ color:'#1E293B', flexShrink:0 }} />
          : <Square      size={18} style={{ color:'#CBD5E0', flexShrink:0 }} />
        }
        <span className="text-xs font-medium flex-1" style={{ color: checked ? '#1E293B' : '#718096' }}>
          {checked ? 'Selected for comparison' : 'Select to compare'}
        </span>
        <button
          onClick={(e) => { e.stopPropagation(); onRemove() }}
          className="p-1 rounded-lg transition-colors hover:bg-red-50"
        >
          <Trash2 size={14} style={{ color:'#CBD5E0' }} />
        </button>
      </div>

      {/* Header */}
      <div className="flex items-start gap-3 px-4 pt-3.5 pb-2">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center font-extrabold text-sm text-white flex-shrink-0"
          style={{ background:'#1E293B' }}
        >
          {initials(m.university.short_name || m.university.name)}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 flex-wrap">
            <p className="font-bold text-sm truncate" style={{ color:'#1A202C' }}>
              {m.university.name}
            </p>
            <ClassBadge cls={m.classification} />
          </div>
          <p className="text-xs mt-0.5" style={{ color:'#4A5568' }}>{m.program.program_name}</p>
        </div>
      </div>

      {/* Info grid */}
      <div className="px-4 pb-3 grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs" style={{ color:'#4A5568' }}>
        <span className="flex items-center gap-1"><MapPin size={11} style={{ color:'#1E293B' }} />{m.campus.city}</span>
        <span className="flex items-center gap-1"><Building2 size={11} style={{ color:'#1E293B' }} />{m.university.sector}</span>
        <span className="flex items-center gap-1 col-span-2">
          <DollarSign size={11} style={{ color:'#1E293B' }} />
          <strong style={{ color:'#1A202C' }}>Rs {Number(m.program.semester_fee_pkr_approx ?? 0).toLocaleString('en-PK')}</strong>
          <span style={{ color:'#718096' }}>/semester</span>
        </span>
        {m.admissionCycle?.entry_test_required && (
          <span className="flex items-center gap-1 col-span-2">
            <ClipboardList size={11} style={{ color:'#1E293B' }} />{m.admissionCycle.entry_test_name}
          </span>
        )}
        {m.hostelInfo && (
          <span className="flex items-center gap-1 col-span-2" style={{ color:'#1D4ED8' }}>
            <Home size={11} />Hostel available · ~Rs {Number(m.hostelInfo.monthly_cost_pkr_approx).toLocaleString('en-PK')}/mo
          </span>
        )}
      </div>

      {/* Merit gap */}
      {m.gap != null && (
        <div
          className="mx-4 mb-3 px-3 py-2 rounded-lg text-xs flex items-center justify-between"
          style={{ background: c.bg }}
        >
          <span style={{ color: c.color }}>
            {m.gap >= 0 ? `+${m.gap.toFixed(1)}% above cutoff` : `${m.gap.toFixed(1)}% below cutoff`}
          </span>
          {m.estimatedMerit != null && (
            <span style={{ color:'#718096' }}>Est: {m.estimatedMerit.toFixed(1)}%</span>
          )}
        </div>
      )}

      {/* Footer */}
      <div className="px-4 pb-3 flex items-center justify-between border-t pt-2.5" style={{ borderColor:'#F1F5F9' }}>
        <span className="text-[11px]" style={{ color:'#A0AEC0' }}>
          Saved {new Date(m.savedAt).toLocaleDateString('en-PK', { day:'numeric', month:'short' })}
        </span>
        <Link
          to={`/university/${m.university.university_id}`}
          state={{ match: m }}
          className="flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-lg"
          style={{ background:'#1E293B', color:'#ffffff' }}
        >
          Details <ChevronRight size={13} />
        </Link>
      </div>
    </div>
  )
}

// ─── Compare Sheet ────────────────────────────────────────
function CompareSheet({ selected, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col fade-in" style={{ background:'rgba(0,0,0,0.55)' }}>
      <div
        className="mt-auto bg-white rounded-t-3xl flex flex-col slide-up"
        style={{ maxHeight:'90vh' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b flex-shrink-0" style={{ borderColor:'#E2E8F0' }}>
          <div>
            <p className="font-extrabold text-base" style={{ color:'#1A202C' }}>Side-by-Side Comparison</p>
            <p className="text-xs mt-0.5" style={{ color:'#4A5568' }}>
              {selected.length} programs compared
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full flex items-center justify-center"
            style={{ background:'#F1F5F9' }}
          >
            <X size={18} style={{ color:'#4A5568' }} />
          </button>
        </div>

        {/* Table */}
        <div className="overflow-y-auto overflow-x-auto no-scrollbar flex-1">
          <table className="w-full min-w-max border-collapse">
            <thead>
              <tr style={{ background:'#F1F5F9' }}>
                <th
                  className="text-left text-[11px] font-bold uppercase tracking-wide px-4 py-3 sticky left-0"
                  style={{ color:'#718096', background:'#F1F5F9', minWidth:120, borderBottom:'2px solid #E2E8F0' }}
                >
                  Feature
                </th>
                {selected.map((m) => (
                  <th
                    key={matchKey(m)}
                    className="text-left px-4 py-3"
                    style={{ borderBottom:'2px solid #E2E8F0', minWidth:150 }}
                  >
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center font-extrabold text-xs text-white mb-1"
                      style={{ background:'#1E293B' }}
                    >
                      {initials(m.university.short_name || m.university.name)}
                    </div>
                    <p className="font-bold text-xs leading-tight" style={{ color:'#1A202C' }}>
                      {m.university.short_name ?? m.university.name}
                    </p>
                    <p className="text-[11px] mt-0.5 leading-tight" style={{ color:'#4A5568' }}>
                      {m.program.program_name}
                    </p>
                    <ClassBadge cls={m.classification} />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COMPARE_ROWS.map((row, ri) => (
                <tr
                  key={row.key}
                  style={{ background: ri % 2 === 0 ? '#ffffff' : '#F1F5F9' }}
                >
                  <td
                    className="text-[11px] font-semibold uppercase tracking-wide px-4 py-3 sticky left-0"
                    style={{
                      color:'#718096',
                      background: ri % 2 === 0 ? '#ffffff' : '#F1F5F9',
                      borderRight:'1px solid #E2E8F0',
                    }}
                  >
                    {row.label}
                  </td>
                  {selected.map((m) => {
                    const val = row.render(m)
                    const isStatus = row.key === 'status'
                    const isGap    = row.key === 'gap'
                    let style = { color:'#1A202C', fontWeight: 500 }
                    if (isStatus) {
                      const c = clsOf(val)
                      style = { color: c.color, fontWeight: 700 }
                    }
                    if (isGap && val !== '—') {
                      const num = parseFloat(val)
                      style = { color: num >= 5 ? '#1D4ED8' : num >= 0 ? '#B7770D' : '#C0392B', fontWeight: 700 }
                    }
                    return (
                      <td
                        key={matchKey(m)}
                        className="text-sm px-4 py-3"
                        style={{ ...style, borderRight:'1px solid #F1F5F9' }}
                      >
                        {val}
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

// ─── Download / Share Modal ───────────────────────────────
function ShareModal({ text, onClose }) {
  const [copied, setCopied] = useState(false)

  async function handleShare() {
    if (navigator.share) {
      try {
        await navigator.share({ title:'My University Shortlist', text })
        return
      } catch { /* fallthrough to copy */ }
    }
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-end fade-in" style={{ background:'rgba(0,0,0,0.55)' }}>
      <div className="w-full bg-white rounded-t-3xl slide-up flex flex-col" style={{ maxHeight:'80vh' }}>
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b flex-shrink-0" style={{ borderColor:'#E2E8F0' }}>
          <p className="font-extrabold text-base" style={{ color:'#1A202C' }}>My University List</p>
          <button onClick={onClose} className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background:'#F1F5F9' }}>
            <X size={18} style={{ color:'#4A5568' }} />
          </button>
        </div>

        {/* Text preview */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          <pre
            className="text-xs leading-relaxed whitespace-pre-wrap font-mono p-4 rounded-xl"
            style={{ background:'#F1F5F9', color:'#1A202C', border:'1px solid #E2E8F0' }}
          >
            {text}
          </pre>
        </div>

        {/* Actions */}
        <div className="px-5 py-4 border-t flex flex-col gap-2.5 flex-shrink-0" style={{ borderColor:'#E2E8F0' }}>
          <button
            onClick={handleShare}
            className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-bold text-sm text-white transition-transform hover:scale-[1.02] active:scale-[0.98]"
            style={{ background: copied ? '#2563EB' : '#1E293B' }}
          >
            {copied
              ? <><Check size={16} /> Copied to clipboard!</>
              : navigator.share
                ? <><Share2 size={16} /> Share via WhatsApp / SMS</>
                : <><Copy size={16} /> Copy to clipboard</>
            }
          </button>
          <p className="text-[11px] text-center" style={{ color:'#A0AEC0' }}>
            Screenshot this text or paste it into WhatsApp to share your shortlist.
          </p>
        </div>
      </div>
    </div>
  )
}

// ─── Empty State ──────────────────────────────────────────
function EmptyState() {
  const navigate = useNavigate()
  return (
    <div className="flex flex-col items-center gap-4 py-20 text-center px-6">
      <div
        className="w-20 h-20 rounded-3xl flex items-center justify-center"
        style={{ background:'#EFF6FF' }}
      >
        <Bookmark size={36} style={{ color:'#1E293B' }} />
      </div>
      <div>
        <p className="font-extrabold text-lg" style={{ color:'#1A202C' }}>No saved programs yet</p>
        <p className="text-sm mt-1 max-w-xs mx-auto" style={{ color:'#4A5568' }}>
          Tap the bookmark icon on any program card in your results to save it here.
        </p>
      </div>
      <button
        onClick={() => navigate('/quiz')}
        className="mt-2 px-6 py-3 rounded-xl font-bold text-sm text-white"
        style={{ background:'#1E293B' }}
      >
        Find Programs to Save
      </button>
    </div>
  )
}

// ─── Main Page ────────────────────────────────────────────
export default function SavedPage() {
  const [saved, setSaved]           = useState(loadSaved)
  const [checked, setChecked]       = useState({})   // key → true
  const [showCompare, setShowCompare] = useState(false)
  const [showShare, setShowShare]   = useState(false)
  const [shareText, setShareText]   = useState('')

  // Sync when other tabs/components change storage
  useEffect(() => {
    function sync() { setSaved(loadSaved()) }
    window.addEventListener('savedProgramsChanged', sync)
    return () => window.removeEventListener('savedProgramsChanged', sync)
  }, [])

  function handleRemove(m) {
    removeProgram(m)
    setSaved(loadSaved())
    const k = matchKey(m)
    setChecked((prev) => { const next = { ...prev }; delete next[k]; return next })
  }

  function handleToggleCheck(m) {
    const k = matchKey(m)
    setChecked((prev) => {
      const next = { ...prev }
      if (next[k]) {
        delete next[k]
      } else if (Object.keys(next).length < 3) {
        next[k] = true
      }
      return next
    })
  }

  function handleClearAll() {
    if (!window.confirm('Remove all saved programs?')) return
    localStorage.removeItem('savedPrograms')
    setSaved([])
    setChecked({})
    window.dispatchEvent(new Event('savedProgramsChanged'))
  }

  function openShare() {
    setShareText(buildShareText(saved))
    setShowShare(true)
  }

  const checkedKeys    = Object.keys(checked)
  const checkedMatches = saved.filter((m) => checked[matchKey(m)])
  const canCompare     = checkedKeys.length >= 2

  return (
    <>
      <style>{STYLE}</style>

      {/* Overlays */}
      {showCompare && <CompareSheet selected={checkedMatches} onClose={() => setShowCompare(false)} />}
      {showShare   && <ShareModal   text={shareText}          onClose={() => setShowShare(false)} />}

      <div className="min-h-screen flex flex-col" style={{ background:'#F1F5F9' }}>

        {/* ── HEADER ──────────────────────────────── */}
        <div
          className="px-5 pt-5 pb-4 border-b"
          style={{ background:'#ffffff', borderColor:'#E2E8F0' }}
        >
          <div className="max-w-2xl mx-auto flex items-start justify-between gap-3">
            <div>
              <h1 className="font-extrabold text-xl flex items-center gap-2" style={{ color:'#1A202C' }}>
                <Bookmark size={20} style={{ color:'#1E293B' }} />
                Saved Programs
              </h1>
              <p className="text-sm mt-0.5" style={{ color:'#4A5568' }}>
                {saved.length === 0
                  ? 'Nothing saved yet'
                  : `${saved.length} program${saved.length !== 1 ? 's' : ''} in your list`}
              </p>
            </div>

            {saved.length > 0 && (
              <div className="flex items-center gap-2">
                <button
                  onClick={openShare}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border-2 transition-transform hover:scale-105"
                  style={{ borderColor:'#1E293B', color:'#1E293B', background:'#ffffff' }}
                >
                  <Download size={13} /> Download
                </button>
                <button
                  onClick={handleClearAll}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border-2 transition-transform hover:scale-105"
                  style={{ borderColor:'#E74C3C', color:'#E74C3C', background:'#ffffff' }}
                >
                  <Trash2 size={13} /> Clear all
                </button>
              </div>
            )}
          </div>
        </div>

        {/* ── COMPARE HINT ────────────────────────── */}
        {saved.length >= 2 && (
          <div
            className="px-5 py-3 border-b text-xs"
            style={{ background:'#EFF6FF', borderColor:'#AED6F1', color:'#1E293B' }}
          >
            <div className="max-w-2xl mx-auto flex items-center gap-2">
              <SlidersHorizontal size={13} />
              <span className="font-medium">
                Tap the checkbox on any card to select it for comparison (max 3).
                {checkedKeys.length > 0 && (
                  <strong> {checkedKeys.length} selected.</strong>
                )}
              </span>
            </div>
          </div>
        )}

        {/* ── CARDS ───────────────────────────────── */}
        <div className="px-4 py-5 flex flex-col gap-3 max-w-2xl w-full mx-auto pb-32">
          {saved.length === 0 ? (
            <EmptyState />
          ) : (
            saved.map((m, idx) => (
              <SavedCard
                key={matchKey(m)}
                m={m}
                idx={idx}
                checked={!!checked[matchKey(m)]}
                onToggle={() => handleToggleCheck(m)}
                onRemove={() => handleRemove(m)}
              />
            ))
          )}
        </div>
      </div>

      {/* ── STICKY COMPARE BAR ──────────────────── */}
      {canCompare && (
        <div
          className="fixed bottom-0 left-0 right-0 z-30 px-4 py-4 border-t slide-up"
          style={{ background:'#1E293B', borderColor:'#0F172A', boxShadow:'0 -4px 20px rgba(0,0,0,0.2)' }}
        >
          <div className="max-w-2xl mx-auto flex items-center gap-3">
            <div className="flex-1 min-w-0">
              <p className="text-white font-bold text-sm">
                {checkedKeys.length} programs selected
              </p>
              <p className="text-blue-200 text-xs mt-0.5 truncate">
                {checkedMatches.map((m) => m.university.short_name ?? m.university.name).join(' vs ')}
              </p>
            </div>
            <button
              onClick={() => setChecked({})}
              className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center"
              style={{ background:'rgba(255,255,255,0.15)' }}
            >
              <X size={16} color="#ffffff" />
            </button>
            <button
              onClick={() => setShowCompare(true)}
              className="flex-shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-transform hover:scale-105 active:scale-95"
              style={{ background:'#2563EB', color:'#FFFFFF' }}
            >
              <SlidersHorizontal size={15} /> Compare
            </button>
          </div>
        </div>
      )}
    </>
  )
}
