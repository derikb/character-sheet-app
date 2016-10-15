const rules = require('./Character5e.js');
const Manager = require('./Manager.js');

/**
 * Register service worker if it's supported
 */
if ('serviceWorker' in navigator) {
	navigator.serviceWorker.register('service_worker.js', {
		scope: '/'
	});
}

Manager.initialize(rules);
