/**
 * Skeleton.jsx — Animated placeholder components for loading states.
 * Uses a CSS shimmer animation — no external dependencies.
 */

const SHIMMER = `
  @keyframes shimmer {
    0%   { background-position: -400px 0; }
    100% { background-position:  400px 0; }
  }
  .shimmer {
    background: linear-gradient(90deg, #F1F5F9 25%, #E2E8F0 50%, #F1F5F9 75%);
    background-size: 800px 100%;
    animation: shimmer 1.4s infinite linear;
    border-radius: 6px;
  }
`

// ─── Primitives ───────────────────────────────────────────

/** A single shimmering bar */
function Bar({ w = '100%', h = 14, round = 6, style = {} }) {
  return (
    <div
      className="shimmer"
      style={{ width: w, height: h, borderRadius: round, flexShrink: 0, ...style }}
    />
  )
}

// ─── Result card skeleton ─────────────────────────────────
export function SkeletonCard({ style = {} }) {
  return (
    <>
      <style>{SHIMMER}</style>
      <div
        className="bg-white rounded-2xl border overflow-hidden"
        style={{ borderColor: '#E2E8F0', borderLeft: '4px solid #E2E8F0', ...style }}
        aria-hidden="true"
        role="presentation"
      >
        {/* Header row */}
        <div className="flex items-start gap-3 px-4 pt-4 pb-3">
          <Bar w={44} h={44} round={12} />
          <div className="flex-1 flex flex-col gap-2 pt-1">
            <Bar w="70%" h={14} />
            <div className="flex gap-2">
              <Bar w={56} h={20} round={999} />
              <Bar w={72} h={20} round={999} />
            </div>
          </div>
          <Bar w={56} h={20} round={999} />
        </div>

        {/* Program name */}
        <div className="px-4 pb-3 border-b flex flex-col gap-2" style={{ borderColor: '#F1F5F9' }}>
          <Bar w="55%" h={14} />
          <Bar w="30%" h={11} />
        </div>

        {/* Info grid */}
        <div className="px-4 py-3 grid grid-cols-2 gap-3">
          <Bar w="80%" h={11} />
          <Bar w="65%" h={11} />
          <Bar w="90%" h={11} style={{ gridColumn: 'span 2' }} />
        </div>

        {/* Merit bar */}
        <div className="px-4 pb-3 flex flex-col gap-2">
          <div className="flex justify-between">
            <Bar w="35%" h={11} />
            <Bar w="20%" h={11} />
            <Bar w="15%" h={11} />
          </div>
          <Bar w="100%" h={8} round={999} />
        </div>

        {/* Strip */}
        <div className="px-4 py-3 border-t flex flex-col gap-2" style={{ borderColor: '#F1F5F9', background: '#F1F5F9' }}>
          <Bar w="80%" h={11} />
          <Bar w="70%" h={11} />
          <Bar w="45%" h={11} />
        </div>

        {/* Footer */}
        <div className="px-4 py-3 border-t flex items-center justify-between" style={{ borderColor: '#F1F5F9' }}>
          <Bar w={80} h={11} />
          <Bar w={100} h={32} round={8} />
        </div>
      </div>
    </>
  )
}

/** Stack of N skeleton cards with staggered opacity */
export function SkeletonList({ count = 4 }) {
  return (
    <div className="flex flex-col gap-4" role="status" aria-label="Loading results…">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} style={{ opacity: 1 - i * 0.18 }} />
      ))}
    </div>
  )
}

/** Inline text shimmer — replaces a word or phrase */
export function SkeletonText({ w = 80, h = 14 }) {
  return (
    <>
      <style>{SHIMMER}</style>
      <span className="shimmer inline-block" style={{ width: w, height: h, borderRadius: 4 }} aria-hidden="true" />
    </>
  )
}

/** Full-page loading overlay */
export function SkeletonPage() {
  return (
    <div className="px-4 py-5 flex flex-col gap-4 max-w-2xl mx-auto" role="status" aria-label="Loading…">
      {/* Profile summary placeholder */}
      <div className="rounded-2xl p-4" style={{ background: '#EFF6FF' }}>
        <Bar w="30%" h={11} style={{ marginBottom: 8 }} />
        <Bar w="80%" h={14} style={{ marginBottom: 8 }} />
        <div className="flex gap-2 flex-wrap">
          {[90, 110, 80, 120, 100].map((w, i) => <Bar key={i} w={w} h={24} round={999} />)}
        </div>
      </div>
      {/* Stats row */}
      <div className="grid grid-cols-3 gap-3">
        {[0,1,2].map((i) => (
          <div key={i} className="rounded-xl p-3 flex flex-col gap-2 items-center" style={{ background: '#F1F5F9' }}>
            <Bar w={32} h={28} />
            <Bar w={48} h={11} />
          </div>
        ))}
      </div>
      <SkeletonList count={3} />
    </div>
  )
}
