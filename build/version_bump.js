/**
 * Quick script to update version number in service worker and appcache manifest
 */
 
const replace = require('replace-in-file');
const package = require('../package.json');
const version = package.version;
console.log(version);

const options = {
	files: [
		'service_worker.js',
		'site.manifest'
	],
	replace: /v[0-9.]+/,
	with: 'v'+version
};

try {
	let changedFiles = replace.sync(options);
	console.log('Modified files:', changedFiles.join(', '));
} catch (error) {
	console.error('Error occurred:', error);
}
