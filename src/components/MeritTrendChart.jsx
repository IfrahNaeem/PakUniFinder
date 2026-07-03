/**
 * MeritTrendChart.jsx
 * Renders a Recharts line chart showing historical merit cutoffs,
 * an OLS trend line, a predicted 2026 point, and the student's
 * estimated merit as a coloured reference line.
 *
 * Props:
 *   historicalCutoffs  [{year, cutoff}]   — at least 2 points required
 *   studentMeritScore  number | null      — estimated merit from quiz
 *   programName        string             — display label
 */

import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend, ReferenceLine, ReferenceArea,
} from 'recharts'
import { predictCutoff, buildChartData, getZone } from '../utils/mlPrediction.js'

// ─── Custom tooltip ───────────────────────────────────────
function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null

  return (
    <div
      className="rounded-xl border px-3 py-2.5 shadow-lg text-xs"
      style={{ background: '#fff', borderColor: '#E2E8F0', minWidth: 130 }}
    >
      <p className="font-bold mb-1.5" style={{ color: '#1A202C' }}>{label}</p>
      {payload.map((p) => {
        if (p.value == null) return null
        const labels = {
          actual:     { label: 'Actual Cutoff', color: '#1E293B' },
          predicted:  { label: 'Predicted',     color: '#9B59B6' },
          regression: { label: 'Trend Line',    color: '#AED6F1' },
        }
        const cfg = labels[p.dataKey] ?? { label: p.dataKey, color: p.color }
        return (
          <div key={p.dataKey} className="flex items-center justify-between gap-3">
            <span className="flex items-center gap-1" style={{ color: cfg.color }}>
              <span className="w-2 h-2 rounded-full inline-block" style={{ background: cfg.color }} />
              {cfg.label}
            </span>
            <strong style={{ color: '#1A202C' }}>{Number(p.value).toFixed(1)}%</strong>
          </div>
        )
      })}
    </div>
  )
}

// ─── Trend pill ───────────────────────────────────────────
function TrendPill({ trend }) {
  const cfg = {
    Rising:  { bg: '#EFF6FF', color: '#1D4ED8', icon: '↗' },
    Stable:  { bg: '#EFF6FF', color: '#1E293B', icon: '→' },
    Falling: { bg: '#FDEDEC', color: '#C0392B', icon: '↘' },
  }[trend] ?? { bg: '#F1F5F9', color: '#4A5568', icon: '?' }

  return (
    <span
      className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full"
      style={{ background: cfg.bg, color: cfg.color }}
    >
      {cfg.icon} {trend}
    </span>
  )
}

// ─── Main component ───────────────────────────────────────
export default function MeritTrendChart({ historicalCutoffs, studentMeritScore, programName }) {
  if (!historicalCutoffs || historicalCutoffs.length < 2) {
    return (
      <div
        className="flex items-center justify-center py-8 rounded-xl text-xs text-center"
        style={{ background: '#F1F5F9', color: '#A0AEC0' }}
      >
        Not enough historical data to generate a prediction
        <br />(minimum 2 years required)
      </div>
    )
  }

  const prediction = predictCutoff(historicalCutoffs)
  const chartData  = buildChartData(historicalCutoffs, prediction)
  const zone       = getZone(studentMeritScore, prediction?.predictedCutoff)

  // Y-axis domain: give 3 pp breathing room on each side
  const allValues = chartData.flatMap((d) =>
    [d.actual, d.predicted, d.regression, studentMeritScore].filter((v) => v != null)
  )
  const yMin = Math.floor(Math.min(...allValues) - 3)
  const yMax = Math.ceil(Math.max(...allValues) + 3)

  const lastYear       = historicalCutoffs.reduce((m, d) => Math.max(m, d.year), 0)
  const predictedYear  = prediction?.predictedYear ?? lastYear + 1

  return (
    <div className="flex flex-col gap-3">

      {/* ── AI label + metadata ─────────────────── */}
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2">
          <span
            className="text-[11px] font-bold px-2 py-1 rounded-lg flex items-center gap-1"
            style={{ background: '#F4ECF7', color: '#7D3C98' }}
          >
            🤖 AI Prediction <span style={{ opacity: 0.7 }}>(Experimental)</span>
          </span>
          {prediction && <TrendPill trend={prediction.trend} />}
        </div>
        {prediction && (
          <span className="text-[11px]" style={{ color: '#718096' }}>
            {prediction.confidence} · Confidence: <strong>{prediction.confidenceLevel}</strong>
          </span>
        )}
      </div>

      {/* ── Chart ───────────────────────────────── */}
      <div style={{ height: 210 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 8, right: 16, left: -18, bottom: 4 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />

            <XAxis
              dataKey="year"
              tick={{ fontSize: 11, fill: '#718096' }}
              tickLine={false}
              axisLine={{ stroke: '#E2E8F0' }}
            />
            <YAxis
              domain={[yMin, yMax]}
              tick={{ fontSize: 11, fill: '#718096' }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) => `${v}%`}
            />

            <Tooltip content={<CustomTooltip />} />

            {/* ── Background zone for predicted year ── */}
            <ReferenceArea
              x1={lastYear}
              x2={predictedYear}
              fill="#F4ECF7"
              fillOpacity={0.35}
            />

            {/* ── Student merit reference line ─────── */}
            {studentMeritScore != null && (
              <ReferenceLine
                y={studentMeritScore}
                stroke={zone.color}
                strokeWidth={2}
                strokeDasharray="5 4"
                label={{
                  value: `You: ${studentMeritScore.toFixed(1)}%`,
                  position: 'insideTopRight',
                  fontSize: 10,
                  fill: zone.color,
                  fontWeight: 700,
                }}
              />
            )}

            {/* ── Predicted cutoff reference line ──── */}
            {prediction && (
              <ReferenceLine
                y={prediction.predictedCutoff}
                stroke="#9B59B6"
                strokeWidth={1.5}
                strokeDasharray="3 3"
                label={{
                  value: `Pred: ${prediction.predictedCutoff}%`,
                  position: 'insideBottomRight',
                  fontSize: 10,
                  fill: '#9B59B6',
                  fontWeight: 600,
                }}
              />
            )}

            {/* ── OLS regression trend line ─────────── */}
            <Line
              dataKey="regression"
              stroke="#AED6F1"
              strokeWidth={1.5}
              strokeDasharray="4 3"
              dot={false}
              connectNulls
              legendType="none"
            />

            {/* ── Historical cutoff line ───────────── */}
            <Line
              dataKey="actual"
              stroke="#1E293B"
              strokeWidth={2.5}
              dot={{ r: 4, fill: '#1E293B', strokeWidth: 2, stroke: '#fff' }}
              activeDot={{ r: 6, fill: '#1E293B' }}
              connectNulls={false}
              name="Actual Cutoff"
            />

            {/* ── Predicted extension (dashed purple) ─ */}
            <Line
              dataKey="predicted"
              stroke="#9B59B6"
              strokeWidth={2}
              strokeDasharray="6 4"
              dot={(props) => {
                const { cx, cy, payload } = props
                if (payload.year !== predictedYear) return null
                return (
                  <g key={`dot-pred-${payload.year}`}>
                    <circle cx={cx} cy={cy} r={5} fill="#9B59B6" stroke="#fff" strokeWidth={2} />
                    <circle cx={cx} cy={cy} r={9} fill="none" stroke="#9B59B6" strokeWidth={1} strokeOpacity={0.4} />
                  </g>
                )
              }}
              connectNulls={false}
              name={`${predictedYear} Prediction`}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* ── Legend ──────────────────────────────── */}
      <div className="flex flex-wrap gap-3 text-[11px]" style={{ color: '#4A5568' }}>
        <LegendItem color="#1E293B" solid label="Historical cutoff" />
        <LegendItem color="#9B59B6" dashed label={`${predictedYear} prediction`} />
        <LegendItem color="#AED6F1" dashed label="Trend line" />
        {studentMeritScore != null && (
          <LegendItem color={zone.color} dashed label="Your merit" />
        )}
      </div>

      {/* ── Student zone summary ─────────────────── */}
      {studentMeritScore != null && prediction && (
        <div
          className="flex items-start gap-2.5 px-3 py-2.5 rounded-xl text-xs"
          style={{ background: zone.bg }}
        >
          <span className="text-base flex-shrink-0">
            {zone.zone === 'safe'    ? '✅'
           : zone.zone === 'target' ? '🎯'
           : zone.zone === 'reach'  ? '⚠️'
           :                         '❌'}
          </span>
          <div>
            <p className="font-bold" style={{ color: zone.color }}>{zone.label}</p>
            <p className="mt-0.5" style={{ color: '#4A5568' }}>
              Predicted {predictedYear} cutoff: <strong>{prediction.predictedCutoff.toFixed(1)}%</strong>
              {' '}· Trend: <strong>{prediction.trendPerYear}</strong>
            </p>
          </div>
        </div>
      )}

      {/* ── Disclaimer ───────────────────────────── */}
      <p className="text-[10px] leading-relaxed" style={{ color: '#A0AEC0' }}>
        🤖 This prediction uses linear regression on {historicalCutoffs.length} years of closing
        merit data (R² = {prediction?.r2?.toFixed(2)}). It is for guidance only — actual cutoffs
        depend on seat availability, applicant pool, and board adjustments. Always verify on
        the official university website.
      </p>
    </div>
  )
}

function LegendItem({ color, dashed, label }) {
  return (
    <span className="flex items-center gap-1.5">
      <svg width="20" height="8" viewBox="0 0 20 8">
        <line
          x1="0" y1="4" x2="20" y2="4"
          stroke={color}
          strokeWidth="2.5"
          strokeDasharray={dashed ? '5 3' : 'none'}
        />
      </svg>
      {label}
    </span>
  )
}
