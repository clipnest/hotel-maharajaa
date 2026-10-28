export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || ''

/**
 * Returns the path prefixed with basePath (e.g. /hotel-maharajaa)
 * when deployed to GitHub Pages or subpath hosting.
 */
export function asset(path: string): string {
  if (!path) return ''
  if (path.startsWith('http://') || path.startsWith('https://')) return path
  if (BASE_PATH && path.startsWith(BASE_PATH)) return path
  const clean = path.startsWith('/') ? path : `/${path}`
  return `${BASE_PATH}${clean}`
}
