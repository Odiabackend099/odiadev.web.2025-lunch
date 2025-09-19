// ODIADEV PWA Service Worker - Optimized for Nigerian Mobile Networks
const CACHE_NAME = 'odiadev-v1.0.0';
const OFFLINE_URL = '/';

// Critical assets for Nigerian mobile users (minimize data usage)
const CORE_ASSETS = [
  '/',
  '/index.html',
  '/styles.css',
  '/script.js',
  '/manifest.json'
];

// Install event - cache core assets
self.addEventListener('install', event => {
  console.log('[SW] Installing service worker');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[SW] Caching core assets');
        return cache.addAll(CORE_ASSETS);
      })
      .then(() => {
        console.log('[SW] Installation complete');
        return self.skipWaiting();
      })
      .catch(error => {
        console.error('[SW] Installation failed:', error);
      })
  );
});

// Activate event - cleanup old caches
self.addEventListener('activate', event => {
  console.log('[SW] Activating service worker');
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== CACHE_NAME) {
              console.log('[SW] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('[SW] Activation complete');
        return self.clients.claim();
      })
  );
});

// Fetch event - Network-first strategy with fallback for Nigerian networks
self.addEventListener('fetch', event => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') {
    return;
  }

  // Skip external requests (CDNs, APIs)
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }

  event.respondWith(
    // Try network first (good for fresh content)
    fetch(event.request, {
      // Optimize for slow Nigerian networks
      signal: AbortSignal.timeout(8000) // 8 second timeout
    })
      .then(response => {
        // If network succeeds, cache the response
        if (response && response.status === 200) {
          const responseClone = response.clone();
          caches.open(CACHE_NAME)
            .then(cache => {
              cache.put(event.request, responseClone);
            });
        }
        return response;
      })
      .catch(() => {
        // Network failed - try cache
        console.log('[SW] Network failed, trying cache for:', event.request.url);
        return caches.match(event.request)
          .then(cachedResponse => {
            if (cachedResponse) {
              console.log('[SW] Serving from cache:', event.request.url);
              return cachedResponse;
            }
            
            // If requesting HTML and not in cache, serve offline page
            if (event.request.headers.get('accept').includes('text/html')) {
              return caches.match(OFFLINE_URL);
            }
            
            // For other resources, return a basic response
            return new Response('Offline - Please check your connection', {
              status: 503,
              statusText: 'Service Unavailable'
            });
          });
      })
  );
});

// Background sync for when connection returns (future enhancement)
self.addEventListener('sync', event => {
  console.log('[SW] Background sync triggered:', event.tag);
  // Future: sync form submissions, analytics, etc.
});

// Push notifications (future enhancement for Nigerian users)
self.addEventListener('push', event => {
  console.log('[SW] Push notification received');
  // Future: emergency alerts, service updates, etc.
});
