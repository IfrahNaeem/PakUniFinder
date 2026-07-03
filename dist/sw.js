/**
 * sw.js — Pakistan University Finder Service Worker
 *
 * Strategy: Network-first with cache fallback.
 * • Online  → fetch fresh, update cache silently.
 * • Offline → serve from cache so the app still loads.
 *
 * The university database is entirely static JS, so the app
 * works fully offline once cached.
 */

const CACHE_NAME = 'puf-cache-v1'

// ── Install: pre-cache the app shell ─────────────────────
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      cache.addAll([
        '/',
        '/index.html',
        '/manifest.json',
      ])
    )
  )
  self.skipWaiting()
})

// ── Activate: delete stale caches ────────────────────────
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  )
  self.clients.claim()
})

// ── Fetch: network-first, fall back to cache ─────────────
self.addEventListener('fetch', (event) => {
  // Only handle GET requests for same-origin or CDN assets
  if (event.request.method !== 'GET') return

  // Skip non-http(s) requests (e.g. chrome-extension://)
  if (!event.request.url.startsWith('http')) return

  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        // Clone before consuming — store a copy in cache
        const clone = networkResponse.clone()
        caches.open(CACHE_NAME).then((cache) => {
          // Only cache successful responses for same-origin assets
          if (networkResponse.ok && event.request.url.startsWith(self.location.origin)) {
            cache.put(event.request, clone)
          }
        })
        return networkResponse
      })
      .catch(() =>
        caches.match(event.request).then(
          (cached) =>
            cached ??
            // Ultimate fallback: serve index.html for navigation requests
            (event.request.mode === 'navigate'
              ? caches.match('/index.html')
              : new Response('Offline', { status: 503, statusText: 'Service Unavailable' }))
        )
      )
  )
})
