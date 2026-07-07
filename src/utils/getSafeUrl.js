/** Ensure website URLs open correctly in a new tab */
export function getSafeUrl(url) {
  if (!url) return '#'
  if (url.startsWith('http://') || url.startsWith('https://')) return url
  return `https://${url}`
}
