/**
 * mlPrediction.js — Merit Cutoff Trend Prediction
 *
 * Uses Ordinary Least Squares (OLS) linear regression on historical cutoff data
 * to predict the next cycle's closing merit percentage.
 *
 * Model: cutoff = slope × year + intercept
 * Years are zero-indexed from the earliest year to prevent numerical issues
 * with large year values (e.g. 2022 → 0, 2023 → 1 …).
 */

// ─── Core OLS regression ──────────────────────────────────

/**
 * Fit a simple linear regression y = mx + b to (x, y) pairs.
 * @param {number[]} xs
 * @param {number[]} ys
 * @returns {{ slope: number, intercept: number, r2: number }}
 */
function fitLinear(xs, ys) {
  const n = xs.length
  if (n < 2) return { slope: 0, intercept: ys[0] ?? 0, r2: 0 }

  const sumX  = xs.reduce((a, v) => a + v, 0)
  const sumY  = ys.reduce((a, v) => a + v, 0)
  const sumXX = xs.reduce((a, v) => a + v * v, 0)
  const sumXY = xs.reduce((a, v, i) => a + v * ys[i], 0)

  const denom    = n * sumXX - sumX * sumX
  const slope    = denom === 0 ? 0 : (n * sumXY - sumX * sumY) / denom
  const intercept = (sumY - slope * sumX) / n

  // R² — coefficient of determination
  const yMean = sumY / n
  const ssTot = ys.reduce((a, y) => a + (y - yMean) ** 2, 0)
  const ssRes = ys.reduce((a, y, i) => a + (y - (slope * xs[i] + intercept)) ** 2, 0)
  const r2    = ssTot === 0 ? 1 : Math.max(0, Math.min(1, 1 - ssRes / ssTot))

  return {
    slope:     Math.round(slope * 10000) / 10000,
    intercept: Math.round(intercept * 100) / 100,
    r2:        Math.round(r2 * 1000) / 1000,
  }
}

// ─── Public API ───────────────────────────────────────────

/**
 * predictCutoff(historicalData)
 *
 * @param {Array<{year: number, cutoff: number}>} historicalData
 *   Sorted ascending by year.
 *
 * @returns {{
 *   predictedCutoff:  number,       // Predicted closing merit for next year
 *   predictedYear:    number,       // Year being predicted
 *   slope:            number,       // Points per year (can be negative)
 *   r2:               number,       // Model fit quality (0–1)
 *   trend:            string,       // "Rising" | "Stable" | "Falling"
 *   trendPerYear:     string,       // e.g. "+0.42 pp/year"
 *   confidence:       string,       // Human-readable description
 *   confidenceLevel:  string,       // "High" | "Moderate" | "Low"
 *   fittedValues:     Array<{year,fitted}>,   // Points on the regression line
 * } | null}  null if < 2 data points
 */
export function predictCutoff(historicalData) {
  if (!historicalData || historicalData.length < 2) return null

  // Sort by year ascending
  const sorted = [...historicalData].sort((a, b) => a.year - b.year)

  const minYear = sorted[0].year
  const maxYear = sorted[sorted.length - 1].year

  const xs = sorted.map((d) => d.year - minYear)
  const ys = sorted.map((d) => d.cutoff)

  const { slope, intercept, r2 } = fitLinear(xs, ys)

  const predictedYear   = maxYear + 1
  const predX           = predictedYear - minYear
  const rawPrediction   = slope * predX + intercept
  const predictedCutoff = Math.round(rawPrediction * 100) / 100

  // Trend thresholds: < ±0.2 pp/year → Stable
  const trend =
    slope > 0.2  ? 'Rising'
  : slope < -0.2 ? 'Falling'
  :                'Stable'

  const trendSign   = slope >= 0 ? '+' : ''
  const trendPerYear = `${trendSign}${slope.toFixed(2)} pp/year`

  // Confidence from R² × sample size
  const n = sorted.length
  const confidenceLevel =
    (r2 >= 0.92 && n >= 3) ? 'High'
  : (r2 >= 0.72 && n >= 2) ? 'Moderate'
  :                           'Low'

  const confidence = `Based on ${n} year${n !== 1 ? 's' : ''} of data · R² = ${r2.toFixed(2)}`

  // Pre-compute fitted values for chart overlay
  const fittedValues = sorted.map((d) => ({
    year:   d.year,
    fitted: Math.round((slope * (d.year - minYear) + intercept) * 100) / 100,
  }))

  return {
    predictedCutoff,
    predictedYear,
    slope,
    intercept,
    r2,
    trend,
    trendPerYear,
    confidence,
    confidenceLevel,
    fittedValues,
  }
}

/**
 * buildChartData(historicalData, prediction)
 * Merges historical + prediction into a single Recharts-friendly array.
 *
 * Each point: { year, actual, predicted, regression }
 * - `actual`     : real historical cutoff (null for forecast year)
 * - `predicted`  : forecast point (only at predictedYear); also carries the
 *                  last historical value to draw a connecting dashed segment
 * - `regression` : fitted OLS value for each historical year
 */
export function buildChartData(historicalData, prediction) {
  if (!historicalData) return []

  const sorted = [...historicalData].sort((a, b) => a.year - b.year)
  const fittedMap = Object.fromEntries(
    (prediction?.fittedValues ?? []).map(({ year, fitted }) => [year, fitted])
  )
  const lastActual = sorted[sorted.length - 1]

  const rows = sorted.map((d) => ({
    year:       d.year,
    actual:     d.cutoff,
    regression: fittedMap[d.year] ?? null,
    predicted:  d.year === lastActual.year && prediction
                  ? d.cutoff                     // anchor for dashed line
                  : null,
  }))

  if (prediction) {
    rows.push({
      year:       prediction.predictedYear,
      actual:     null,
      regression: null,
      predicted:  prediction.predictedCutoff,
    })
  }

  return rows
}

/**
 * getZone(studentMerit, predictedCutoff)
 * Returns the student's position relative to the predicted cutoff.
 */
export function getZone(studentMerit, predictedCutoff) {
  if (studentMerit == null || predictedCutoff == null)
    return { zone: 'unknown', color: '#718096', bg: '#F1F5F9', label: 'Unknown' }

  const gap = studentMerit - predictedCutoff

  if (gap >=  3) return { zone: 'safe',    color: '#1D4ED8', bg: '#EFF6FF', label: `+${gap.toFixed(1)}% above predicted cutoff` }
  if (gap >=  0) return { zone: 'target',  color: '#B7770D', bg: '#FEF9E7', label: `+${gap.toFixed(1)}% — within margin zone` }
  if (gap >= -5) return { zone: 'reach',   color: '#C0392B', bg: '#FDEDEC', label: `${gap.toFixed(1)}% below predicted cutoff` }
  return              { zone: 'unlikely', color: '#922B21', bg: '#FADBD8', label: `${gap.toFixed(1)}% — significantly below` }
}
