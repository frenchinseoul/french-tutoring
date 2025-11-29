const CACHE_NAME = 'fis-static-v1';
const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/online-french-tutoring.html',
  '/in-person-french-tutoring.html',
  '/conversation-french-lessons.html',
  '/french-lessons-guide-korea.html',
  '/links.html',
  '/pas-de-soucis/pas-de-soucis-expression.html',
  '/style.css',
  '/style.css?v=2025-09-27',
  '/image/study-cafe.avif',
  '/image/discord-site.avif',
  '/image/portrait.avif',
  '/favicons/favicon-96x96.png',
  '/favicons/android-chrome-192x192.png',
  '/favicons/apple-touch-icon.png',
  '/favicons/favicon-16x16.png',
  '/site.webmanifest'
];

// Static assets we want to serve with a long-lived, immutable cache header
const IMMUTABLE_PATHS = new Set([
  '/style.css',
  '/sw-register.js',
  '/sw.js',
  '/image/study-cafe.avif',
  '/image/discord-site.avif',
  '/image/portrait.avif',
  '/image/french-lessons-guide-korea-hero-fr-flag-speech-bubble.avif',
  '/favicons/favicon-32x32.png',
  '/favicons/favicon-96x96.png'
]);

const cacheWithImmutableHeader = (request, response) => {
  if (!response || !IMMUTABLE_PATHS.has(new URL(request.url).pathname)) return response;
  const headers = new Headers(response.headers);
  headers.set('Cache-Control', 'public, max-age=31536000, immutable');
  return new Response(response.clone().body, {
    status: response.status,
    statusText: response.statusText,
    headers
  });
};

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_URLS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.map((key) => {
        if (key !== CACHE_NAME) {
          return caches.delete(key);
        }
        return null;
      }))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cacheWithImmutableHeader(request, cached);

      return fetch(request).then((response) => {
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }
        const responseToCache = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(request, responseToCache));
        return cacheWithImmutableHeader(request, response);
      }).catch(() => cached);
    })
  );
});
