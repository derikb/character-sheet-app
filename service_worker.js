/**
 * Service worker for character sheet app
 * Currently disabled in favor of AppCache
 */

/**
 * Config data
 * Update cacheName when we want to make sure to get new data in the cache
 * Caching all the files we use except the service worker itself
 */
var config = {
    cacheName: 'static-v2.0.1',
    staticCacheItems: [
        '/index.html',
        '/styles.css',
        '/images/shield.svg',
        '/images/heart.svg',
        '/images/heart_broken.svg',
        '/src/ActionMenu.js',
        '/src/Character5e.js',
        '/src/CharacterService.js',
        '/src/EventEmitter.js',
        '/src/Manager.js',
        '/src/Modal.js',
        '/src/ShortCutKeys.js',
        '/src/Storage.js',
        '/src/Tabs.js',
        '/src/UI5e.js',
        '/'
    ]
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
            .then( () => self.skipWaiting() )
    );
});
/**
 * Event: activate
 * This clears out any old caches
 */
self.addEventListener('activate', function(event) {

    var cacheWhitelist = [config.cacheName];

    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
        .then( () => self.clients.claim() )
    );
});
/**
 * Event: fetch
 * Just fetches from the cache if it can, since the whole app is static
 */
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then(function(resp) {
                return resp || fetch(event.request)
                    .then(function(response) {
                        return caches.open(config.cacheName)
                            .then(function(cache) {
                                cache.put(event.request, response.clone());
                                return response;
                            });
                    });
            }).catch(function (e) {
                console.log('Service worker fetch failed.');
            })
    );
});
