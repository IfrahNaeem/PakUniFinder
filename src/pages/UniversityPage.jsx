import { useParams, useLocation, useNavigate } from 'react-router-dom'
import {
  ArrowLeft, MapPin, Globe, BookOpen, DollarSign,
  Home, Phone, Calendar, CheckCircle2, AlertCircle,
} from 'lucide-react'
import {
  ALL_UNIVERSITIES, ALL_CAMPUSES, ALL_PROGRAMS,
  ALL_CYCLES, ALL_MERIT, ALL_HOSTELS,
} from '../data/universities.js'
import { getSafeUrl } from '../utils/getSafeUrl.js'

export default function UniversityPage() {
  const { id }    = useParams()
  const { state } = useLocation()
  const navigate  = useNavigate()

  const uni =
    ALL_UNIVERSITIES.find((u) => u.university_id === id) ||
    state?.university ||
    state?.match?.university

  if (!uni) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-6 text-center" style={{ background: '#F1F5F9' }}>
        <AlertCircle size={40} style={{ color: '#CBD5E0' }} />
        <p className="font-semibold" style={{ color: '#1A202C' }}>University not found.</p>
        <button onClick={() => navigate(-1)} className="text-sm font-medium" style={{ color: '#1E293B' }}>
          ← Go back
        </button>
      </div>
    )
  }

  const campuses = ALL_CAMPUSES.filter((c) => c.university_id === id)
  const programs = ALL_PROGRAMS.filter((p) => campuses.some((c) => c.campus_id === p.campus_id))
  const hostels  = ALL_HOSTELS.filter((h) => campuses.some((c) => c.campus_id === h.campus_id))
  const isMegaOnly = id?.startsWith('M') && programs.length === 0

  // If we arrived from results, we may have a specific match to highlight
  const match = state?.match ?? null

  function InfoRow({ icon: Icon, label, value }) {
    if (!value) return null
    return (
      <div className="flex items-start gap-3">
        <Icon size={16} className="flex-shrink-0 mt-0.5" style={{ color: '#1E293B' }} />
        <div>
          <p className="text-[11px] uppercase tracking-wide font-semibold" style={{ color: '#718096' }}>{label}</p>
          <p className="text-sm font-medium mt-0.5" style={{ color: '#1A202C' }}>{value}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#F1F5F9' }}>

      {/* Header */}
      <div
        className="flex items-center gap-3 px-5 py-4 border-b sticky top-0 z-10"
        style={{ background: '#ffffff', borderColor: '#E2E8F0' }}
      >
        <button onClick={() => navigate(-1)} style={{ color: '#1E293B' }}>
          <ArrowLeft size={22} />
        </button>
        <div className="flex-1 min-w-0">
          <p className="font-bold text-sm truncate" style={{ color: '#1A202C' }}>{uni.short_name}</p>
          <p className="text-[11px] truncate" style={{ color: '#4A5568' }}>{uni.name}</p>
        </div>
        {uni.website && (
          <a
            href={getSafeUrl(uni.website)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex-shrink-0 flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-lg"
            style={{ background: '#EFF6FF', color: '#1E293B' }}
          >
            <Globe size={13} /> Website
          </a>
        )}
      </div>

      <div className="px-5 py-5 flex flex-col gap-4 max-w-2xl w-full mx-auto">

        {/* Match highlight (if coming from results) */}
        {match && (
          <div
            className="rounded-2xl p-4 border"
            style={{
              background: match.classification === 'Safe' ? '#EFF6FF'
                        : match.classification === 'Target' ? '#FEF9E7'
                        : '#FDEDEC',
              borderColor: match.classification === 'Safe' ? '#A9DFBF'
                         : match.classification === 'Target' ? '#FAD7A0'
                         : '#F1948A',
            }}
          >
            <p className="text-xs font-bold uppercase tracking-wide mb-1"
               style={{ color: match.classification === 'Safe' ? '#1D4ED8' : match.classification === 'Target' ? '#B7770D' : '#C0392B' }}>
              Your matched program
            </p>
            <p className="font-bold text-sm" style={{ color: '#1A202C' }}>{match.program.program_name}</p>
            {match.estimatedMerit != null && (
              <p className="text-xs mt-1" style={{ color: '#4A5568' }}>
                Estimated merit: <strong>{match.estimatedMerit.toFixed(1)}%</strong>
                {match.gap != null && (
                  <> · {match.gap >= 0 ? `+${match.gap.toFixed(1)}%` : `${match.gap.toFixed(1)}%`} vs cutoff</>
                )}
              </p>
            )}
          </div>
        )}

        {isMegaOnly ? (
          <div
            className="bg-white rounded-2xl p-5 border flex flex-col gap-4"
            style={{ borderColor: '#E2E8F0' }}
          >
            <div className="flex flex-wrap gap-2">
              {(uni.field_categories ?? []).map((f) => (
                <span
                  key={f}
                  className="text-[11px] font-bold px-2 py-0.5 rounded-full"
                  style={{ background: '#EFF6FF', color: '#1E293B' }}
                >
                  {f}
                </span>
              ))}
            </div>
            <p className="text-xs font-bold px-3 py-1.5 rounded-full w-fit" style={{ background: uni.has_hostel ? '#EFF6FF' : '#F1F5F9', color: uni.has_hostel ? '#1D4ED8' : '#718096' }}>
              Hostel: {uni.has_hostel ? 'Yes' : 'No'}
            </p>
            <div className="rounded-xl p-4 text-sm leading-relaxed" style={{ background: '#FFFBEB', color: '#92400E' }}>
              Detailed admission data for this university is not yet in our database.
              Please visit the official website for programs, fees, entry test and merit information.
            </div>
            {uni.website && (
              <a
                href={getSafeUrl(uni.website)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm text-white"
                style={{ background: '#1E293B' }}
              >
                Visit Official Website →
              </a>
            )}
          </div>
        ) : (
        <>
        <div className="bg-white rounded-2xl p-5 border flex flex-col gap-4" style={{ borderColor: '#E2E8F0' }}>
          <div className="flex items-start gap-3">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center font-extrabold text-lg flex-shrink-0 text-white"
              style={{ background: '#1E293B' }}
            >
              {uni.short_name?.slice(0, 2)}
            </div>
            <div>
              <h1 className="font-bold text-base leading-snug" style={{ color: '#1A202C' }}>{uni.name}</h1>
              <div className="flex flex-wrap gap-2 mt-1">
                <span className="text-[11px] px-2 py-0.5 rounded-full font-medium" style={{ background: '#EFF6FF', color: '#1E293B' }}>
                  {uni.sector}
                </span>
                {uni.hec_recognized && (
                  <span className="text-[11px] px-2 py-0.5 rounded-full font-medium flex items-center gap-1" style={{ background: '#EFF6FF', color: '#1D4ED8' }}>
                    <CheckCircle2 size={10} /> HEC Recognized
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3">
            <InfoRow icon={MapPin}    label="Main City"  value={uni.city} />
            <InfoRow icon={BookOpen}  label="Province"   value={uni.province} />
            <InfoRow icon={Globe}     label="Website"    value={uni.website} />
          </div>

          {uni.notes && (
            <p className="text-xs leading-relaxed p-3 rounded-xl" style={{ background: '#F1F5F9', color: '#4A5568' }}>
              ℹ️ {uni.notes}
            </p>
          )}
        </div>

        {/* Programs */}
        {programs.length > 0 && (
          <div className="bg-white rounded-2xl p-5 border flex flex-col gap-3" style={{ borderColor: '#E2E8F0' }}>
            <h2 className="font-bold text-base" style={{ color: '#1A202C' }}>Programs Offered</h2>
            {programs.map((prog) => {
              const formula = ALL_MERIT.find((f) => f.program_id === prog.program_id)
              const cycle   = ALL_CYCLES.find((c) => c.program_id === prog.program_id)
              const campus  = ALL_CAMPUSES.find((c) => c.campus_id === prog.campus_id)

              return (
                <div key={prog.program_id} className="rounded-xl border p-4 flex flex-col gap-2" style={{ borderColor: '#E2E8F0' }}>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-semibold text-sm" style={{ color: '#1A202C' }}>{prog.program_name}</p>
                      <p className="text-xs mt-0.5" style={{ color: '#4A5568' }}>
                        {prog.degree_level} · {prog.duration_years} years · {prog.field_category}
                      </p>
                    </div>
                    <span className="text-xs font-bold px-2 py-1 rounded-lg flex-shrink-0" style={{ background: '#EFF6FF', color: '#1E293B' }}>
                      PKR {prog.semester_fee_pkr_approx?.toLocaleString()}/sem
                    </span>
                  </div>

                  {campus && (
                    <p className="text-[11px] flex items-center gap-1" style={{ color: '#718096' }}>
                      <MapPin size={10} /> {campus.city} — {campus.address}
                    </p>
                  )}

                  {formula && formula.approx_recent_closing_merit_pct && (
                    <p className="text-[11px]" style={{ color: '#4A5568' }}>
                      Closing merit (~2025): <strong>{formula.approx_recent_closing_merit_pct}%</strong>
                      {' '}· Min FSc: <strong>{formula.min_fsc_percentage_required}%</strong>
                    </p>
                  )}

                  {cycle && (
                    <div className="mt-1 p-2.5 rounded-lg text-[11px] flex flex-col gap-1" style={{ background: '#F1F5F9', color: '#4A5568' }}>
                      <p className="flex items-center gap-1"><Calendar size={10} /> <strong>Entry Test:</strong> {cycle.entry_test_name}</p>
                      <p><strong>Test window:</strong> {cycle.entry_test_window}</p>
                      <p><strong>Classes start:</strong> {cycle.classes_start}</p>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}

        {/* Hostels */}
        {hostels.length > 0 && (
          <div className="bg-white rounded-2xl p-5 border flex flex-col gap-3" style={{ borderColor: '#E2E8F0' }}>
            <h2 className="font-bold text-base flex items-center gap-2" style={{ color: '#1A202C' }}>
              <Home size={16} /> Hostel Information
            </h2>
            {hostels.map((h) => (
              <div key={h.hostel_id} className="rounded-xl p-3 flex flex-col gap-1.5" style={{ background: '#F1F5F9' }}>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold" style={{ color: '#1A202C' }}>
                    Available for: {h.available_for}
                  </span>
                  <span className="text-xs font-bold" style={{ color: '#1E293B' }}>
                    ~PKR {h.monthly_cost_pkr_approx?.toLocaleString()}/month
                  </span>
                </div>
                <p className="text-xs" style={{ color: '#4A5568' }}>
                  Mess: {h.mess_included ? '✓ Included' : '✗ Not included'} &nbsp;·&nbsp; {h.seat_availability_note}
                </p>
              </div>
            ))}
          </div>
        )}

        <p className="text-[11px] text-center pb-6" style={{ color: '#A0AEC0' }}>
          Data sourced from HEC and university websites. Always verify directly before applying.
        </p>
        </>
        )}
      </div>
    </div>
  )
}
