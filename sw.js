self.addEventListener("install", event => {
  event.waitUntil(
    caches.open("errorcodes-cache").then(cache => {
      return cache.addAll([
        "index.html",
        "manifest.json",
        "icon.png",
        "https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js"
      ]);
    })
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request).then(fetchResponse => {
        return caches.open("errorcodes-cache").then(cache => {
          cache.put(event.request, fetchResponse.clone());
          return fetchResponse;
        });
      });
    })
  );
});
