/**
 * Quick script to update version number in service worker and appcache manifest
 */

// const replace = require('replace-in-file');
const package = require('../package.json');
// const version = package.version;

const readRegex = /v([0-9.]+)/;
const writeRegex = /v[0-9.]+)/;

module.exports.readVersion = function(contents) {
    const matches = contents.match(readRegex);
    return matches[1];
};

module.exports.writeVersion = function(contents, version) {

    const newVersion = `v${version}`;

    contents.replace(writeRegex, newVersion);
    return contents;
}


