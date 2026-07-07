/**
 * matching.js — Pakistan University Finder
 * Relaxed matching: soft fee filter, flexible group rules,
 * strict city filter, mega-university fallback when detailed data is sparse.
 */

import {
  ALL_UNIVERSITIES,
  ALL_CAMPUSES,
  ALL_PROGRAMS,
  ALL_CYCLES,
  ALL_MERIT,
  ALL_HOSTELS,
} from '../data/universities.js'
import { MEGA_UNIVERSITIES } from '../data/universitiesMega.js'

const MERIT_ORDER = { Safe: 0, Target: 1, Reach: 2, Unknown: 3, 'Check Website': 3 }

// ─── Strict city filter ─────────────────────────────────────
export function isAnyCitySelected(preferredCities = []) {
  if (!preferredCities || preferredCities.length === 0) return true
  return preferredCities.some(
    (c) =>
      c === 'Any City' ||
      c === 'Any City in Pakistan' ||
      c.toLowerCase().includes('any city'),
  )
}

function strictCityMatch(entityCity, preferredCities = []) {
  if (!entityCity) return false
  return preferredCities.some(
    (selectedCity) =>
      entityCity.toLowerCase().trim() === selectedCity.toLowerCase().trim(),
  )
}

// ─── Flexible FSc group matching ────────────────────────────
function groupMatches(programGroup, studentGroup) {
  if (!programGroup || programGroup === 'Any') return true
  const pg = programGroup.toLowerCase()
  const sg = (studentGroup ?? '').toLowerCase()
  if (!sg) return true
  if (pg.includes('any')) return true
  if (pg.includes(sg)) return true
  if (sg === 'ics' && pg.includes('ics')) return true
  if (sg === 'pre-engineering' && pg.includes('engineering')) return true
  if (sg === 'pre-medical' && pg.includes('medical')) return true
  if (sg === 'commerce' && (pg.includes('commerce') || pg.includes('business'))) return true
  if (sg === 'arts' && (pg.includes('arts') || pg.includes('humanities'))) return true
  return false
}

function sectorMatches(uniSector, preferredSector) {
  if (!preferredSector || preferredSector === 'Both') return true
  return uniSector.toLowerCase().includes(preferredSector.toLowerCase())
}

// ─── Soft fee filter ─────────────────────────────────────
function feeAllowed(fee, maxSemesterFee) {
  if (!maxSemesterFee || maxSemesterFee <= 0) return true
  if (!fee) return true
  return fee <= maxSemesterFee * 2
}

function feeFlags(fee, maxSemesterFee) {
  if (!maxSemesterFee || !fee) {
    return { aboveBudget: false, slightlyAboveBudget: false }
  }
  if (fee <= maxSemesterFee) {
    return { aboveBudget: false, slightlyAboveBudget: false }
  }
  return {
    aboveBudget: true,
    slightlyAboveBudget: fee <= maxSemesterFee * 1.3,
  }
}

// ─── Merit calculation & classification ─────────────────────
function calculateMerit(matric, fsc, formula) {
  const estimatedTestScore = 70
  return (
    (matric * (formula.matric_weight_pct || 10)) / 100 +
    (fsc * (formula.fsc_weight_pct || 40)) / 100 +
    (estimatedTestScore * (formula.entry_test_weight_pct || 50)) / 100
  )
}

function classifyMerit(estimatedMerit, cutoff) {
  if (cutoff == null || estimatedMerit == null) return 'Check Website'
  const diff = estimatedMerit - cutoff
  if (diff >= 5) return 'Safe'
  if (diff >= 0) return 'Target'
  if (diff >= -10) return 'Reach'
  return 'Reach'
}

function toClassification(meritStatus) {
  return meritStatus === 'Check Website' ? 'Unknown' : meritStatus
}

function getInterests(profile) {
  if (profile.interests?.length) return profile.interests
  if (profile.interestArea) return [profile.interestArea]
  return []
}

function interestMatchesMega(interests, fieldCategories = []) {
  if (!interests.length) return true
  return fieldCategories.some((f) =>
    interests.some(
      (i) =>
        f.toLowerCase().includes(i.toLowerCase()) ||
        i.toLowerCase().includes(f.toLowerCase()),
    ),
  )
}

// ─── Mega-university fallback ───────────────────────────────
function matchFromMegaList(studentProfile) {
  const { preferredCities = [], sector = 'Both' } = studentProfile
  const interests = getInterests(studentProfile)
  const anyCity = isAnyCitySelected(preferredCities)

  return MEGA_UNIVERSITIES.filter((uni) => {
    if (!anyCity) {
      const cityMatch = strictCityMatch(uni.city, preferredCities)
      if (!cityMatch) return false
    }

    const sectorOk =
      sector === 'Both' ||
      uni.sector.toLowerCase().includes(sector.toLowerCase())

    const fieldOk = interestMatchesMega(interests, uni.field_categories)

    return sectorOk && fieldOk
  }).map((uni) => ({
    source: 'mega',
    matchType: 'university',
    university: {
      university_id: uni.university_id,
      name: uni.name,
      short_name: uni.short_name,
      sector: uni.sector,
      city: uni.city,
      province: uni.province,
      website: uni.website,
      has_hostel: uni.has_hostel,
      hec_recognized: true,
    },
    campus: {
      campus_id: `${uni.university_id}-main`,
      university_id: uni.university_id,
      city: uni.city,
      province: uni.province,
    },
    program: {
      program_id: `${uni.university_id}-overview`,
      program_name: 'Multiple programs available',
      field_category: uni.field_categories?.[0] ?? 'General',
      field_categories: uni.field_categories ?? [],
      semester_fee_pkr_approx: null,
      degree_level: 'Various',
      duration_years: null,
    },
    admissionCycle: null,
    meritFormula: null,
    hostelInfo: uni.has_hostel
      ? { available_for: 'Both', monthly_cost_pkr_approx: null, mess_included: null }
      : null,
    estimatedMerit: null,
    meritStatus: 'Check Website',
    classification: 'Unknown',
    aboveBudget: false,
    slightlyAboveBudget: false,
    gap: null,
  }))
}

function buildDetailedMatch(program, profile) {
  const campus = ALL_CAMPUSES.find((c) => c.campus_id === program.campus_id)
  const university = ALL_UNIVERSITIES.find(
    (u) => u.university_id === campus?.university_id,
  )
  const formula = ALL_MERIT.find((m) => m.program_id === program.program_id)
  const cycle = ALL_CYCLES.find((c) => c.program_id === program.program_id)
  const hostel = ALL_HOSTELS.find((h) => h.campus_id === campus?.campus_id)

  const estimatedMerit = formula
    ? Math.round(calculateMerit(profile.matricPercent, profile.fscPercent, formula) * 100) / 100
    : null

  const meritStatus = formula
    ? classifyMerit(estimatedMerit, formula.approx_recent_closing_merit_pct)
    : 'Check Website'

  const cutoff = formula?.approx_recent_closing_merit_pct
  const gap =
    estimatedMerit != null && cutoff != null
      ? Math.round((estimatedMerit - cutoff) * 100) / 100
      : null

  const { aboveBudget, slightlyAboveBudget } = feeFlags(
    program.semester_fee_pkr_approx,
    profile.maxSemesterFee,
  )

  return {
    source: 'detailed',
    program,
    campus,
    university,
    admissionCycle: cycle ?? null,
    meritFormula: formula ?? null,
    hostelInfo: hostel ?? null,
    estimatedMerit,
    meritStatus,
    classification: toClassification(meritStatus),
    aboveBudget,
    slightlyAboveBudget,
    gap,
  }
}

// ─── Public API ───────────────────────────────────────────
export function matchUniversities(studentProfile) {
  const {
    matricPercent = 0,
    fscPercent = 0,
    fscGroup = '',
    preferredCities = [],
    sector = 'Both',
    maxSemesterFee = 0,
  } = studentProfile

  const anyCity = isAnyCitySelected(preferredCities)

  // Step 1: match from detailed PROGRAMS database
  const programMatches = ALL_PROGRAMS.filter((program) => {
    const campus = ALL_CAMPUSES.find((c) => c.campus_id === program.campus_id)
    const university = ALL_UNIVERSITIES.find(
      (u) => u.university_id === campus?.university_id,
    )
    if (!campus || !university) return false
    if (campus.is_test_center_only) return false

    if (!groupMatches(program.required_fsc_group, fscGroup)) return false

    if (!anyCity) {
      const cityMatch = strictCityMatch(campus.city, preferredCities)
      if (!cityMatch) return false
    }

    if (!sectorMatches(university.sector, sector)) return false

    if (!feeAllowed(program.semester_fee_pkr_approx, maxSemesterFee)) return false

    const formula = ALL_MERIT.find((m) => m.program_id === program.program_id)
    if (
      formula?.min_fsc_percentage_required &&
      fscPercent < formula.min_fsc_percentage_required
    ) {
      return false
    }

    return true
  }).map((program) => buildDetailedMatch(program, studentProfile))

  // Step 2: fill from MEGA when detailed matches are sparse
  let megaMatches = []
  if (programMatches.length < 5) {
    const seenIds = new Set(programMatches.map((p) => p.university.university_id))
    megaMatches = matchFromMegaList(studentProfile).filter(
      (m) => !seenIds.has(m.university.university_id),
    )
  }

  // Step 3: combine and sort
  const allMatches = [...programMatches, ...megaMatches]

  allMatches.sort((a, b) => {
    const orderDiff =
      (MERIT_ORDER[a.meritStatus] ?? 3) - (MERIT_ORDER[b.meritStatus] ?? 3)
    if (orderDiff !== 0) return orderDiff
    if (a.source === 'detailed' && b.source === 'mega') return -1
    if (a.source === 'mega' && b.source === 'detailed') return 1
    return (b.gap ?? -999) - (a.gap ?? -999)
  })

  return allMatches
}

export function getTopMatches(studentProfile, limit = 10) {
  return matchUniversities(studentProfile).slice(0, limit)
}

export function getSummaryStats(matches) {
  return matches.reduce(
    (acc, m) => {
      acc.total++
      const key = (m.classification ?? 'Unknown').toLowerCase()
      if (key in acc) acc[key]++
      return acc
    },
    { total: 0, safe: 0, target: 0, reach: 0, unknown: 0 },
  )
}

export function countUniqueUniversities(matches) {
  return new Set(matches.map((m) => m.university?.university_id).filter(Boolean)).size
}
