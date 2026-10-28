const CACHE_NAME = 'aanant-pwa-v1';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.svg',
  '/images/aanant-logo.png',
  '/images/aanant-logo-original.jpeg',
  '/images/cnc-parts.jpg',
  '/images/custom-nameplate.jpg',
  '/images/decorative-panel.jpg',
  '/images/fabrication-parts.jpg',
  '/images/hero-cnc.jpg',
  '/images/laser-action.jpg',
  '/images/laser-marking-action.jpg',
  '/images/laser-parts.jpg',
  '/images/personalized-gifts.jpg',
  '/images/precision-parts.jpg',
  '/images/quality-inspection.jpg'
];

// Install: Cache critical shell assets
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS).catch((err) => {
        console.warn('[SW] Pre-caching warning:', err);
      });
    })
  );
});

// Activate: Clean old caches and claim clients immediately
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch: Offline & Online caching strategies
self.addEventListener('fetch', (event) => {
  const request = event.request;

  // Skip non-GET requests and browser-extension / non-http requests
  if (request.method !== 'GET' || !request.url.startsWith('http')) {
    return;
  }

  // Handle API requests: try network, do not cache API errors
  if (request.url.includes('/api/')) {
    event.respondWith(
      fetch(request).catch(() => {
        return new Response(
          JSON.stringify({
            offline: true,
            error: 'You are currently offline. Submission stored locally and will sync once connected.'
          }),
          { headers: { 'Content-Type': 'application/json' } }
        );
      })
    );
    return;
  }

  // Handle SPA navigation requests: Network-First with Cache fallback to index.html
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const clone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          }
          return networkResponse;
        })
        .catch(async () => {
          // Offline fallback for navigation: return cached index.html
          const cachedResponse = await caches.match(request);
          if (cachedResponse) return cachedResponse;
          const fallbackIndex = await caches.match('/index.html');
          if (fallbackIndex) return fallbackIndex;
          const rootFallback = await caches.match('/');
          if (rootFallback) return rootFallback;
          return new Response('Aanant Enterprises is currently offline. Please reconnect.', {
            headers: { 'Content-Type': 'text/plain' }
          });
        })
    );
    return;
  }

  // Handle static assets (JS, CSS, Images, Fonts): Cache-First / Stale-While-Revalidate
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      const fetchPromise = fetch(request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const clone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          }
          return networkResponse;
        })
        .catch(() => cachedResponse);

      return cachedResponse || fetchPromise;
    })
  );
});
