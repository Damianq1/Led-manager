const CACHE_NAME = 'led-manager-v12';
const urlsToCache = [
  './app.html',
  './manifest.json'
];

self.addEventListener('install', event => {
  console.log('SW: Installing v12...');
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('activate', event => {
  console.log('SW: Activating v12...');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('SW: Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      return self.clients.claim();
    })
  );
});

self.addEventListener('fetch', event => {
  const url = event.request.url;
  
  // Requesty do ESP32 - zawsze sieć
  if (url.includes('/power') || 
      url.includes('/color') || 
      url.includes('/brightness') ||
      url.includes('/animation') ||
      url.includes('/preview') ||
      url.includes('/status') ||
      url.includes('/discover') ||
      url.includes('/scan') ||
      url.includes('/wifi')) {
    event.respondWith(fetch(event.request));
    return;
  }
  
  // Dla app.html - sieć najpierw, potem cache
  if (url.includes('app.html')) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          // Zapisz nową wersję do cache
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseClone);
          });
          return response;
        })
        .catch(() => {
          // Offline - użyj cache
          return caches.match(event.request);
        })
    );
    return;
  }
  
  // Reszta - cache first
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
