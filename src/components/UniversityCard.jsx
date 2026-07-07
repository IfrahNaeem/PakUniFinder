/**
 * UniversityCard.jsx — shared university card utilities
 */

import { getSafeUrl } from '../utils/getSafeUrl.js'

export function UniversityWebsiteLink({ university, className = '', style = {} }) {
  if (!university?.website) return null

  return (
    <a
      href={getSafeUrl(university.website)}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => e.stopPropagation()}
      className={className}
      style={style}
    >
      Visit Official Website
    </a>
  )
}

/**
 * Compact website link for use inside result/saved cards.
 */
export default function UniversityCard({ university }) {
  if (!university?.website) return null

  return (
    <UniversityWebsiteLink
      university={university}
      className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-lg transition-transform hover:scale-105 active:scale-95"
      style={{ background: '#EFF6FF', color: '#1E293B' }}
    />
  )
}
