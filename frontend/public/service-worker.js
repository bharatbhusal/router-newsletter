const CACHE_NAME = "app-cache";

const urlsToCache = [
	"/",
	"/index.html",
	"favicon.svg",
	"/static/js/main.d2f5a194.js",
	"/static/css/main.ba0cd37c.css",
	"/manifest.json",
];

self.addEventListener("install", (event) => {
	event.waitUntil(
		caches.open(CACHE_NAME).then((cache) => {
			return cache.addAll(urlsToCache);
		})
	);
});

self.addEventListener("fetch", (event) => {
	event.respondWith(
		caches.match(event.request).then((response) => {
			return response || fetch(event.request);
		})
	);
});
