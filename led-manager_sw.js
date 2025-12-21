const CACHE_NAME = 'led-manager-v3';
const urlsToCache = [
  './app.html',
  './manifest.json'
];

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', event => {
  const url = event.request.url;
  
  // Dla requestów do ESP32 - zawsze sieć (nie cachuj)
  if (url.includes('/power') || 
      url.includes('/color') || 
      url.includes('/brightness') ||
      url.includes('/animation') ||
      url.includes('/status')) {
    event.respondWith(fetch(event.request));
    return;
  }
  
  // Dla reszty - cache first, then network
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});
