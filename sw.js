self.addEventListener('install', (event) => {
  self.skipWaiting(); // Force new service worker to activate immediately
});
const CACHE_NAME = 'donation-app-cache-v2'; // increment the versionconst urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png'
];

// Install service worker and cache files
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
});

// Activate service worker
self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

// Intercept fetch requests
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => response || fetch(event.request))
  );
});
