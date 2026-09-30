// Increase this version after editing site files so installed copies refresh.
const CACHE_NAME = 'toy-haven-final-15';
const FILES = [
    "./",
    "./assets/icons/icon-192.png",
    "./assets/icons/icon-512.png",
    "./assets/icons/icon.svg",
    "./assets/images/astronaut.webp",
    "./assets/images/boardgame.webp",
    "./assets/images/chess.webp",
    "./assets/images/knight.webp",
    "./assets/images/racer.webp",
    "./assets/images/roadster.webp",
    "./assets/images/robot.webp",
    "./assets/images/teddy.webp",
    "./cart.html",
    "./checkout.html",
    "./css/style.css",
    "./index.html",
    "./js/app.js",
    "./js/cart.js",
    "./js/checkout.js",
    "./js/data.js",
    "./js/index.js",
    "./js/products.js",
    "./js/support.js",
    "./js/wishlist.js",
    "./manifest.webmanifest",
    "./products.html",
    "./support.html",
    "./wishlist.html",
    "./assets/images/dragon.webp",
    "./assets/images/pilot.webp",
    "./assets/images/blocks.webp",
    "./assets/images/train.webp",
    "./assets/images/domino.webp",
    "./assets/images/checkers.webp",
    "./assets/images/van.webp",
    "./assets/images/rally.webp"
];
// Installation caches the entire small demonstration site for offline use.
self.addEventListener('install', function (event) {
    event.waitUntil(
        caches
            .open(CACHE_NAME)
            .then(function (cache) {
                return cache.addAll(FILES);
            })
            .then(function () {
                return self.skipWaiting();
            }),
    );
});
self.addEventListener('activate', function (event) {
    event.waitUntil(
        caches
            .keys()
            .then(function (keys) {
                return Promise.all(
                    keys
                        .filter(function (key) {
                            return key.startsWith('toy-haven-final-') && key !== CACHE_NAME;
                        })
                        .map(function (key) {
                            return caches.delete(key);
                        }),
                );
            })
            .then(function () {
                return self.clients.claim();
            }),
    );
});
self.addEventListener('fetch', function (event) {
    if (
        event.request.method !== 'GET' ||
        new URL(event.request.url).origin !== self.location.origin
    ) {
        return;
    }
    event.respondWith(
        caches.open(CACHE_NAME).then(function (cache) {
            return cache.match(event.request, { ignoreSearch: true }).then(function (cached) {
                return cached || fetch(event.request);
            });
        }),
    );
});
