const cacheName = "jpps-school-v1.0.3"
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll([
        '/',
        '/index.html',
        'css/main.css',
        'js/main.js',
        '/contact.html',
        '/img/jpps_logo.webp',
        '/resources.html',
        '/gallery.html',
        '/facility.html',
        '/admission.html',
        '/apply.html',
        '/about.html',
        '/curriculum.html'        
      ]);
    })
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});