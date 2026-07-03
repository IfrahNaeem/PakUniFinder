/**
 * matching.js — Pakistan University Finder
 * Core matching engine that joins all data tables and ranks
 * programs for a given student profile.
 */

import {
  ALL_UNIVERSITIES,
  ALL_CAMPUSES,
  ALL_PROGRAMS,
  ALL_CYCLES,
  ALL_MERIT,
  ALL_HOSTELS,
} from '../data/universities.js';

// ─────────────────────────────────────────────────────────
// Internal helpers
// ─────────────────────────────────────────────────────────

/**
 * University sector order used when sorting inside same classification bucket.
 * Lower index = higher preference (Government first, then semi-gov, then private).
 */
const SECTOR_ORDER = ['Government', 'Government-Autonomous', 'Semi-Government', 'Private'];

/**
 * Does the student's FSc group satisfy the program's requirement?
 *
 * Program values seen in data:
 *   "Pre-Engineering / ICS"
 *   "Pre-Medical"
 *   "Any"
 *   "Any / Pre-Engineering preferred"
 *
 * Student fscGroup values expected:
 *   "Pre-Engineering" | "ICS" | "Pre-Medical" | "Arts" | "Commerce" | "Other"
 */
function fscGroupMatches(requiredGroup, studentGroup) {
  if (!requiredGroup || requiredGroup.trim() === '') return true;

  const req = requiredGroup.toLowerCase();

  // "Any" prefixed requirements → open to all
  if (req.startsWith('any')) return true;

  const student = studentGroup.toLowerCase().trim();

  // Split on "/" and check if student group appears in any token
  return req.split('/').some((token) => token.trim().includes(student));
}

/**
 * Does the campus city satisfy the student's city preference list?
 * Returns true when preferredCities is empty, contains "Any City", or contains the campus city.
 */
function cityMatches(campusCity, preferredCities = []) {
  if (!preferredCities.length) return true;
  if (preferredCities.some((c) => c.toLowerCase() === 'any city' || c === 'Any')) return true;
  return preferredCities.some(
    (c) => c.toLowerCase().trim() === campusCity.toLowerCase().trim(),
  );
}

/**
 * Does the university sector match the student's sector preference?
 * "Both" → accept everything.
 * "Government" → accept Government + Semi-Government + Government-Autonomous.
 * "Private" → accept Private only.
 */
function sectorMatches(uniSector, preferredSector) {
  if (!preferredSector || preferredSector === 'Both') return true;
  if (preferredSector === 'Government') {
    return ['Government', 'Semi-Government', 'Government-Autonomous'].includes(uniSector);
  }
  return uniSector === preferredSector;
}

/**
 * Estimate the student's merit percentage using the program's weighted formula.
 *
 * Since we don't have an actual entry-test score at quiz time, we proxy the
 * entry-test performance as the average of matric and FSc (a reasonable
 * heuristic — academic achievers tend to score proportionally on entry tests).
 * This estimate will be replaced by the real score once the student sits the test.
 *
 * Returns null when the formula has null weights (e.g. PU — formula unknown).
 */
function estimateMerit(formula, { matricPercent, fscPercent }) {
  const { matric_weight_pct, fsc_weight_pct, entry_test_weight_pct } = formula;

  if (matric_weight_pct == null || fsc_weight_pct == null || entry_test_weight_pct == null) {
    return null;
  }

  // Proxy entry-test score: weighted average of academic scores, capped at 100
  const entryTestEstimate = Math.min(100, (matricPercent * 0.4 + fscPercent * 0.6));

  const merit =
    (matricPercent * matric_weight_pct) / 100 +
    (fscPercent * fsc_weight_pct) / 100 +
    (entryTestEstimate * entry_test_weight_pct) / 100;

  return Math.round(merit * 100) / 100; // 2 dp
}

/**
 * Classify a match as "Safe", "Target", or "Reach" based on the gap
 * between estimated merit and the program's closing merit cutoff.
 *
 * Safe   → estimated merit is ≥ cutoff + 5 pp
 * Target → estimated merit is ≥ cutoff and < cutoff + 5 pp
 * Reach  → estimated merit is ≥ cutoff − 10 pp and < cutoff
 * None   → too far below cutoff (excluded from results)
 *
 * Returns { classification, gap } where gap = estimatedMerit − cutoff (can be negative).
 * Returns null when classification is not possible (no cutoff or no estimated merit).
 */
function classifyMatch(estimatedMerit, formula) {
  const cutoff = formula.approx_recent_closing_merit_pct;

  if (estimatedMerit == null || cutoff == null) {
    // Cannot classify — still include but mark as "Unknown"
    return { classification: 'Unknown', gap: null };
  }

  const gap = Math.round((estimatedMerit - cutoff) * 100) / 100;

  if (gap >= 5) return { classification: 'Safe', gap };
  if (gap >= 0) return { classification: 'Target', gap };
  if (gap >= -10) return { classification: 'Reach', gap };

  return null; // Too far below — exclude entirely
}

/**
 * Numeric sort weight per classification bucket (lower = earlier in results).
 */
const CLASSIFICATION_RANK = { Safe: 0, Target: 1, Reach: 2, Unknown: 3 };

// ─────────────────────────────────────────────────────────
// Public API
// ─────────────────────────────────────────────────────────

/**
 * matchUniversities(studentProfile)
 *
 * @param {Object} studentProfile
 * @param {number} studentProfile.matricPercent       — Matric percentage (0–100)
 * @param {number} studentProfile.fscPercent          — FSc / Intermediate percentage (0–100)
 * @param {string} studentProfile.fscGroup            — e.g. "Pre-Engineering" | "ICS" | "Pre-Medical" | "Arts" | "Commerce"
 * @param {string} studentProfile.interestArea        — e.g. "CS-IT" | "Engineering" | "Medical" | "Business" | "Social Sciences"
 * @param {string[]} studentProfile.preferredCities   — e.g. ["Lahore", "Islamabad"] or ["Any City"]
 * @param {string} studentProfile.sector              — "Government" | "Private" | "Both"
 * @param {number} studentProfile.maxSemesterFee      — Maximum affordable semester fee in PKR (0 = no limit)
 *
 * @returns {Array<Object>} Sorted array of enriched match objects, each containing:
 *   {
 *     program, campus, university,
 *     admissionCycle,   // may be null if no cycle found
 *     meritFormula,     // may be null if no formula found
 *     hostelInfo,       // may be null if no hostel data for this campus
 *     estimatedMerit,   // number | null
 *     classification,   // "Safe" | "Target" | "Reach" | "Unknown"
 *     gap,              // number | null  (estimatedMerit − cutoff)
 *   }
 */
export function matchUniversities(studentProfile) {
  const {
    matricPercent = 0,
    fscPercent = 0,
    fscGroup = '',
    interestArea = '',
    preferredCities = [],
    sector = 'Both',
    maxSemesterFee = 0,
  } = studentProfile;

  // ── Step 1: Filter programs by FSc group ────────────────
  const eligiblePrograms = ALL_PROGRAMS.filter((prog) =>
    fscGroupMatches(prog.required_fsc_group, fscGroup),
  );

  // ── Step 2: Join campus and filter by city ───────────────
  const withCampus = eligiblePrograms.flatMap((prog) => {
    const campus = ALL_CAMPUSES.find((c) => c.campus_id === prog.campus_id);
    if (!campus) return [];
    if (campus.is_test_center_only) return [];
    if (!cityMatches(campus.city, preferredCities)) return [];
    return [{ prog, campus }];
  });

  // ── Step 3: Join university and filter by sector ─────────
  const withUniversity = withCampus.flatMap(({ prog, campus }) => {
    const university = ALL_UNIVERSITIES.find((u) => u.university_id === campus.university_id);
    if (!university) return [];
    if (!sectorMatches(university.sector, sector)) return [];
    return [{ prog, campus, university }];
  });

  // ── Step 4: Filter by semester fee budget ───────────────
  const withinBudget = withUniversity.filter(({ prog }) => {
    if (!maxSemesterFee || maxSemesterFee <= 0) return true;
    return prog.semester_fee_pkr_approx <= maxSemesterFee;
  });

  // ── Step 5: Filter by minimum FSc requirement ───────────
  const meetsMinGrade = withinBudget.filter(({ prog }) => {
    const formula = ALL_MERIT.find((f) => f.program_id === prog.program_id);
    if (!formula) return true; // no formula on record — don't exclude
    if (!formula.min_fsc_percentage_required) return true;
    return fscPercent >= formula.min_fsc_percentage_required;
  });

  // ── Step 6 & 7: Calculate merit + classify ─────────────
  const classified = meetsMinGrade.flatMap(({ prog, campus, university }) => {
    const meritFormula = ALL_MERIT.find((f) => f.program_id === prog.program_id) ?? null;
    const admissionCycle =
      ALL_CYCLES.find((c) => c.program_id === prog.program_id) ?? null;
    const hostelInfo =
      ALL_HOSTELS.find((h) => h.campus_id === campus.campus_id) ?? null;

    const estimatedMerit = meritFormula
      ? estimateMerit(meritFormula, { matricPercent, fscPercent })
      : null;

    const classResult = meritFormula
      ? classifyMatch(estimatedMerit, meritFormula)
      : { classification: 'Unknown', gap: null };

    // Exclude matches that fall more than 10 pp below the cutoff
    if (classResult === null) return [];

    // Optional: boost programs matching interestArea
    const interestBoost =
      interestArea &&
      prog.field_category.toLowerCase().includes(interestArea.toLowerCase())
        ? 1
        : 0;

    return [
      {
        program: prog,
        campus,
        university,
        admissionCycle,
        meritFormula,
        hostelInfo,
        estimatedMerit,
        classification: classResult.classification,
        gap: classResult.gap,
        _interestBoost: interestBoost,
      },
    ];
  });

  // ── Step 8: Sort ─────────────────────────────────────────
  // Primary:   classification rank (Safe → Target → Reach → Unknown)
  // Secondary: interest area match (boosted programs first)
  // Tertiary:  gap descending (larger positive gap = safer / better match)
  // Quaternary: sector order (Government before Private)
  classified.sort((a, b) => {
    const classRankDiff =
      CLASSIFICATION_RANK[a.classification] - CLASSIFICATION_RANK[b.classification];
    if (classRankDiff !== 0) return classRankDiff;

    if (b._interestBoost !== a._interestBoost) return b._interestBoost - a._interestBoost;

    const aGap = a.gap ?? -999;
    const bGap = b.gap ?? -999;
    if (bGap !== aGap) return bGap - aGap;

    return (
      SECTOR_ORDER.indexOf(a.university.sector) -
      SECTOR_ORDER.indexOf(b.university.sector)
    );
  });

  // Strip internal sort keys before returning
  return classified.map(({ _interestBoost, ...rest }) => rest);
}

/**
 * getTopMatches(studentProfile, limit = 10)
 * Convenience wrapper that returns only the top N results.
 */
export function getTopMatches(studentProfile, limit = 10) {
  return matchUniversities(studentProfile).slice(0, limit);
}

/**
 * getSummaryStats(matches)
 * Returns a quick breakdown useful for displaying result page stats.
 *
 * @param {Array} matches — result array from matchUniversities()
 * @returns {{ total, safe, target, reach, unknown }}
 */
export function getSummaryStats(matches) {
  return matches.reduce(
    (acc, m) => {
      acc.total++;
      const key = m.classification.toLowerCase();
      if (key in acc) acc[key]++;
      return acc;
    },
    { total: 0, safe: 0, target: 0, reach: 0, unknown: 0 },
  );
}
