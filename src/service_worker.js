/**
 * Service worker for character sheet app
 */
import { manifest, version } from '@parcel/service-worker';
/**
 * Config data
 * Update cacheName when we want to make sure to get new data in the cache
 * Caching all the files we use except the service worker itself
 */
const config = {
    cacheName: version,
    staticCacheItems: manifest
};

/**
 * Event: install
 * precaches all the files we use in the app
 */
self.addEventListener('install', (e) => {
    function onInstall () {
        return caches.open(config.cacheName)
            .then(cache => cache.addAll(config.staticCacheItems));
    }
    e.waitUntil(
        onInstall(e)
            .then(() => self.skipWaiting())
    );
});
/**
 * Event: activate
 * This clears out any old caches
 */
self.addEventListener('activate', function (event) {
    const cacheWhitelist = [config.cacheName];

    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.map(function (cacheName) {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                    return undefined;
                })
            );
        })
            .then(() => self.clients.claim())
    );
});
/**
 * Event: fetch
 * Just fetches from the cache if it can, since the whole app is static
 * @param {FetchEvent} event
 */
self.addEventListener('fetch', (event) => {
    // Ignore POSTs (mostly to external DBs, etc.)
    if (event.request.method === 'POST') {
        fetch(event.request);
        return;
    }
    event.respondWith(
        caches.match(event.request)
            .then(function (resp) {
                return resp || fetch(event.request)
                    .then(function (response) {
                        return caches.open(config.cacheName)
                            .then(function (cache) {
                                cache.put(event.request, response.clone());
                                return response;
                            });
                    });
            }).catch(function (e) {
                console.log('Service worker fetch failed.');
            })
    );
});
