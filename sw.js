// Service Worker for ODIADEV AI LTD - Version 2.0.0
// This service worker handles offline functionality and asset caching

const CACHE_NAME = 'odiadev-ai-v2';
const OFFLINE_URL = '/offline.html';
const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/robots.txt',
  '/sitemap.xml',
  '/assets/css/styles.css',
  '/assets/js/main.js',
  '/assets/img/logo.png',
  '/assets/img/og-image.jpg',
  '/assets/img/icons/icon-192x192.png',
  '/assets/img/icons/icon-512x512.png',
  '/assets/img/hero-3d.webp',
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
  OFFLINE_URL
];

// Install event - cache all static assets
self.addEventListener('install', event => {
  console.log('[Service Worker] Installing Service Worker...');
  
  // Skip waiting to activate the new service worker immediately
  self.skipWaiting();
  
  // Cache all critical assets
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[Service Worker] Caching app shell');
        return cache.addAll(PRECACHE_URLS);
      })
      .catch(error => {
        console.error('Error during service worker installation:', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  console.log('[Service Worker] Activating Service Worker...');
  
  // Claim control of all clients (tabs) immediately
  event.waitUntil(clients.claim());
  
  // Remove old caches
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            console.log('[Service Worker] Removing old cache:', cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Fetch event - network first, then cache fallback
self.addEventListener('fetch', event => {
  // Skip cross-origin requests, like those for Google Analytics
  if (!event.request.url.startsWith(self.location.origin) && !event.request.url.startsWith('https://fonts.googleapis.com') && !event.request.url.startsWith('https://fonts.gstatic.com')) {
    return;
  }

  // Handle navigation requests with HTML fallback
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          // If we got a valid response, cache it
          const responseToCache = response.clone();
          caches.open(CACHE_NAME)
            .then(cache => cache.put(event.request, responseToCache));
          return response;
        })
        .catch(error => {
          console.log('[Service Worker] Network request failed, serving from cache', error);
          return caches.match(event.request)
            .then(response => response || caches.match(OFFLINE_URL));
        })
    );
  } else {
    // For all other requests, try cache first, then network
    event.respondWith(
      caches.match(event.request)
        .then(response => {
          // Return cached response if found
          if (response) {
            return response;
          }
          
          // Clone the request
          const fetchRequest = event.request.clone();
          
          // Make network request
          return fetch(fetchRequest)
            .then(response => {
              // Check if we received a valid response
              if (!response || response.status !== 200 || response.type !== 'basic') {
                return response;
              }
              
              // Clone the response
              const responseToCache = response.clone();
              
              // Cache the response
              caches.open(CACHE_NAME)
                .then(cache => {
                  cache.put(event.request, responseToCache);
                });
              
              return response;
            })
            .catch(error => {
              console.error('[Service Worker] Fetch failed; returning offline page', error);
              // If the request is for an image and we're offline, return a placeholder
              if (event.request.headers.get('accept').includes('image')) {
                return new Response(
                  '<svg width="400" height="300" role="img" aria-labelledby="offline-title" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg"><title id="offline-title">Offline</title><g fill="none" fill-rule="evenodd"><path fill="#D8D8D8" d="M0 0h400v300H0z"/><text fill="#9B9B9B" font-family="Helvetica Neue,Arial,Helvetica,sans-serif" font-size="72" font-weight="bold"><tspan x="93" y="172">offline</tspan></text></g></svg>',
                  { headers: { 'Content-Type': 'image/svg+xml' }}
                );
              }
            });
        })
    );
  }
});

// Background sync for failed requests when connection is restored
self.addEventListener('sync', event => {
  if (event.tag === 'sync-failed-requests') {
    console.log('[Service Worker] Background sync for failed requests');
    // You can implement retry logic for failed requests here
  }
});

// Push notification event handler
self.addEventListener('push', event => {
  console.log('[Service Worker] Push received');
  
  const title = 'ODIADEV AI';
  const options = {
    body: event.data ? event.data.text() : 'New update available!',
    icon: '/assets/img/icons/icon-192x192.png',
    badge: '/assets/img/icons/badge.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      { action: 'explore', title: 'Open App', icon: '/assets/img/icons/checkmark.png' },
      { action: 'close', title: 'Close', icon: '/assets/img/icons/xmark.png' }
    ]
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

// Notification click handler
self.addEventListener('notificationclick', event => {
  console.log('[Service Worker] Notification click received');
  
  event.notification.close();
  
  // Handle the notification click
  if (event.action === 'explore') {
    // Open the app
    event.waitUntil(
      clients.openWindow('/')
    );
  } else if (event.action === 'close') {
    // Notification was closed
    console.log('Notification was closed');
  } else {
    // Default action - open the app
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});