/**
 * interestMapper.js — Interest × FSc Group → Field Recommendation Engine
 *
 * Uses a weighted scoring matrix to rank field_category values for a student
 * based on their declared interest area and their FSc / Matric group.
 *
 * Scores are 1-10 integers.  The matrix encodes:
 *   • Eligibility weight  — can this FSc group actually enter this field?
 *   • Affinity weight     — how strongly does the interest map to the field?
 * Combined, they produce a single relevance score per field category.
 */

// ─── Field categories (must match PROGRAMS data) ─────────
export const FIELD_CATEGORIES = [
  'CS-IT',
  'Engineering',
  'Medical',
  'Business',
  'Natural Sciences',
  'Social Sciences',
]

// ─── Interest areas (must match QuizPage step 3) ─────────
export const INTEREST_AREAS = [
  'CS-IT',
  'Engineering',
  'Medical',
  'Business',
  'Natural Sciences',
  'Social Sciences',
]

// ─── Main scoring matrix ──────────────────────────────────
// MATRIX[fscGroup][interestArea] = { fieldCategory: score (1-10) }
const MATRIX = {
  'Pre-Medical': {
    'CS-IT': {
      'CS-IT':           6,
      'Engineering':     3,
      'Medical':         8,  // Bioinformatics, Health IT
      'Business':        3,
      'Natural Sciences':8,
      'Social Sciences': 3,
    },
    'Engineering': {
      'CS-IT':           4,
      'Engineering':     6,
      'Medical':         6,
      'Business':        3,
      'Natural Sciences':7,
      'Social Sciences': 3,
    },
    'Medical': {
      'CS-IT':           3,
      'Engineering':     2,
      'Medical':         10,
      'Business':        2,
      'Natural Sciences':9,
      'Social Sciences': 3,
    },
    'Business': {
      'CS-IT':           4,
      'Engineering':     2,
      'Medical':         7,
      'Business':        7,
      'Natural Sciences':5,
      'Social Sciences': 5,
    },
    'Natural Sciences': {
      'CS-IT':           5,
      'Engineering':     4,
      'Medical':         8,
      'Business':        2,
      'Natural Sciences':10,
      'Social Sciences': 3,
    },
    'Social Sciences': {
      'CS-IT':           3,
      'Engineering':     2,
      'Medical':         6,
      'Business':        4,
      'Natural Sciences':5,
      'Social Sciences': 8,
    },
  },

  'Pre-Engineering': {
    'CS-IT': {
      'CS-IT':           9,
      'Engineering':     8,
      'Medical':         2,
      'Business':        4,
      'Natural Sciences':5,
      'Social Sciences': 2,
    },
    'Engineering': {
      'CS-IT':           7,
      'Engineering':     10,
      'Medical':         2,
      'Business':        4,
      'Natural Sciences':5,
      'Social Sciences': 2,
    },
    'Medical': {
      'CS-IT':           4,
      'Engineering':     5,
      'Medical':         6,
      'Business':        3,
      'Natural Sciences':8,
      'Social Sciences': 3,
    },
    'Business': {
      'CS-IT':           6,
      'Engineering':     7,
      'Medical':         2,
      'Business':        8,
      'Natural Sciences':4,
      'Social Sciences': 4,
    },
    'Natural Sciences': {
      'CS-IT':           6,
      'Engineering':     8,
      'Medical':         4,
      'Business':        3,
      'Natural Sciences':9,
      'Social Sciences': 2,
    },
    'Social Sciences': {
      'CS-IT':           5,
      'Engineering':     7,
      'Medical':         2,
      'Business':        5,
      'Natural Sciences':5,
      'Social Sciences': 7,
    },
  },

  'ICS': {
    'CS-IT': {
      'CS-IT':           10,
      'Engineering':     7,
      'Medical':         2,
      'Business':        5,
      'Natural Sciences':4,
      'Social Sciences': 2,
    },
    'Engineering': {
      'CS-IT':           9,
      'Engineering':     8,
      'Medical':         2,
      'Business':        4,
      'Natural Sciences':4,
      'Social Sciences': 2,
    },
    'Medical': {
      'CS-IT':           7,
      'Engineering':     5,
      'Medical':         5,
      'Business':        3,
      'Natural Sciences':6,
      'Social Sciences': 3,
    },
    'Business': {
      'CS-IT':           7,
      'Engineering':     5,
      'Medical':         2,
      'Business':        9,
      'Natural Sciences':3,
      'Social Sciences': 4,
    },
    'Natural Sciences': {
      'CS-IT':           8,
      'Engineering':     6,
      'Medical':         3,
      'Business':        3,
      'Natural Sciences':7,
      'Social Sciences': 2,
    },
    'Social Sciences': {
      'CS-IT':           7,
      'Engineering':     4,
      'Medical':         2,
      'Business':        5,
      'Natural Sciences':3,
      'Social Sciences': 7,
    },
  },

  'Commerce': {
    'CS-IT': {
      'CS-IT':           7,
      'Engineering':     3,
      'Medical':         2,
      'Business':        8,
      'Natural Sciences':2,
      'Social Sciences': 5,
    },
    'Engineering': {
      'CS-IT':           5,
      'Engineering':     6,
      'Medical':         2,
      'Business':        7,
      'Natural Sciences':3,
      'Social Sciences': 4,
    },
    'Medical': {
      'CS-IT':           3,
      'Engineering':     2,
      'Medical':         4,
      'Business':        6,
      'Natural Sciences':4,
      'Social Sciences': 5,
    },
    'Business': {
      'CS-IT':           5,
      'Engineering':     3,
      'Medical':         2,
      'Business':        10,
      'Natural Sciences':2,
      'Social Sciences': 7,
    },
    'Natural Sciences': {
      'CS-IT':           4,
      'Engineering':     4,
      'Medical':         3,
      'Business':        7,
      'Natural Sciences':6,
      'Social Sciences': 5,
    },
    'Social Sciences': {
      'CS-IT':           4,
      'Engineering':     2,
      'Medical':         2,
      'Business':        8,
      'Natural Sciences':3,
      'Social Sciences': 10,
    },
  },

  'Arts': {
    'CS-IT': {
      'CS-IT':           6,
      'Engineering':     2,
      'Medical':         2,
      'Business':        5,
      'Natural Sciences':2,
      'Social Sciences': 8,
    },
    'Engineering': {
      'CS-IT':           4,
      'Engineering':     5,
      'Medical':         2,
      'Business':        4,
      'Natural Sciences':3,
      'Social Sciences': 7,
    },
    'Medical': {
      'CS-IT':           2,
      'Engineering':     2,
      'Medical':         4,
      'Business':        3,
      'Natural Sciences':5,
      'Social Sciences': 8,
    },
    'Business': {
      'CS-IT':           4,
      'Engineering':     2,
      'Medical':         2,
      'Business':        8,
      'Natural Sciences':2,
      'Social Sciences': 9,
    },
    'Natural Sciences': {
      'CS-IT':           3,
      'Engineering':     3,
      'Medical':         4,
      'Business':        3,
      'Natural Sciences':7,
      'Social Sciences': 8,
    },
    'Social Sciences': {
      'CS-IT':           3,
      'Engineering':     2,
      'Medical':         2,
      'Business':        6,
      'Natural Sciences':4,
      'Social Sciences': 10,
    },
  },
}

// ─── Fallback when combination is unknown ─────────────────
const FALLBACK_SCORES = {
  'CS-IT':           5,
  'Engineering':     5,
  'Medical':         5,
  'Business':        5,
  'Natural Sciences':5,
  'Social Sciences': 5,
}

// ─── Public API ───────────────────────────────────────────

/**
 * recommendFields(interestArea, fscGroup)
 *
 * Returns field categories ranked by relevance for this student.
 *
 * @param {string} interestArea   — one of INTEREST_AREAS
 * @param {string} fscGroup       — one of the FSc groups (Pre-Medical, ICS, …)
 * @returns {Array<{ field: string, score: number, tier: string }>}
 *   Sorted descending by score. `tier` is "Strong" (≥8) / "Good" (5-7) / "Possible" (<5).
 */
export function recommendFields(interestArea, fscGroup) {
  const groupScores  = MATRIX[fscGroup]
  const fieldScores  = groupScores?.[interestArea] ?? FALLBACK_SCORES

  return Object.entries(fieldScores)
    .map(([field, score]) => ({
      field,
      score,
      tier: score >= 8 ? 'Strong' : score >= 5 ? 'Good' : 'Possible',
    }))
    .sort((a, b) => b.score - a.score)
}

/**
 * topFields(interestArea, fscGroup, n = 3)
 * Convenience — returns just the top N field_category strings.
 */
export function topFields(interestArea, fscGroup, n = 3) {
  return recommendFields(interestArea, fscGroup)
    .slice(0, n)
    .map((r) => r.field)
}

/**
 * explainRecommendation(interestArea, fscGroup)
 * Returns a plain-English sentence explaining the top recommendation.
 */
export function explainRecommendation(interestArea, fscGroup) {
  const top = recommendFields(interestArea, fscGroup)
  if (!top.length) return ''
  const best = top[0]
  const second = top[1]

  const groupLabel = {
    'Pre-Medical':    'Pre-Medical background',
    'Pre-Engineering':'Pre-Engineering background',
    'ICS':            'ICS background',
    'Commerce':       'Commerce background',
    'Arts':           'Arts / Humanities background',
  }[fscGroup] ?? fscGroup

  return `With your ${groupLabel} and interest in ${interestArea}, `
       + `${best.field} is your strongest match (score ${best.score}/10)`
       + (second ? `, followed by ${second.field} (${second.score}/10).` : '.')
}
