/**
 * savedPrograms.js
 * Helpers for persisting full match objects to localStorage["savedPrograms"].
 * Each saved item is a full match object (program + campus + university +
 * admissionCycle + meritFormula + hostelInfo + estimatedMerit + classification)
 * with an added `savedAt` timestamp.
 *
 * Composite key: program_id + campus_id (a program can exist on multiple campuses).
 * Mega universities use: mega__{university_id}
 */

import { ALL_UNIVERSITIES } from '../data/universities.js'

const KEY = 'savedPrograms'

function isValidSavedItem(item) {
  const uniId = item?.university?.university_id
  if (!uniId) return false
  return ALL_UNIVERSITIES.some((u) => u.university_id === uniId)
}

/** Load saved items, dropping stale entries whose university no longer exists */
export function loadSaved() {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) ?? '[]')
    if (!Array.isArray(raw)) return []

    const valid = raw.filter(isValidSavedItem)
    if (valid.length !== raw.length) {
      localStorage.setItem(KEY, JSON.stringify(valid))
    }
    return valid
  } catch {
    return []
  }
}

export function persistSaved(arr) {
  localStorage.setItem(KEY, JSON.stringify(arr))
  window.dispatchEvent(new Event('savedProgramsChanged'))
}

/** Returns a stable string key for a match object */
export function matchKey(match) {
  if (match.source === 'mega') {
    return `mega__${match.university.university_id}`
  }
  return `${match.program.program_id}__${match.campus.campus_id}`
}

export function isSaved(match) {
  const key = matchKey(match)
  return loadSaved().some((m) => matchKey(m) === key)
}

export function saveProgram(match) {
  if (!match?.university?.university_id) return
  const arr = loadSaved()
  const key = matchKey(match)
  if (arr.some((m) => matchKey(m) === key)) return
  persistSaved([...arr, { ...match, savedAt: new Date().toISOString() }])
}

export function removeProgram(match) {
  const key = matchKey(match)
  persistSaved(loadSaved().filter((m) => matchKey(m) !== key))
}

export function toggleSaved(match) {
  isSaved(match) ? removeProgram(match) : saveProgram(match)
}

export function savedCount() {
  return loadSaved().length
}
