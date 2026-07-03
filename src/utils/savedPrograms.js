/**
 * savedPrograms.js
 * Helpers for persisting full match objects to localStorage["savedPrograms"].
 * Each saved item is a full match object (program + campus + university +
 * admissionCycle + meritFormula + hostelInfo + estimatedMerit + classification)
 * with an added `savedAt` timestamp.
 *
 * Composite key: program_id + campus_id (a program can exist on multiple campuses).
 */

const KEY = 'savedPrograms'

export function loadSaved() {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? '[]')
  } catch {
    return []
  }
}

export function persistSaved(arr) {
  localStorage.setItem(KEY, JSON.stringify(arr))
  // Notify any listening components (Navbar badge, etc.)
  window.dispatchEvent(new Event('savedProgramsChanged'))
}

/** Returns a stable string key for a match object */
export function matchKey(match) {
  return `${match.program.program_id}__${match.campus.campus_id}`
}

export function isSaved(match) {
  const key = matchKey(match)
  return loadSaved().some((m) => matchKey(m) === key)
}

export function saveProgram(match) {
  const arr = loadSaved()
  const key = matchKey(match)
  if (arr.some((m) => matchKey(m) === key)) return // already saved
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
