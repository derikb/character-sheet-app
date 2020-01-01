/**
 * Quick script to update version number in service worker and appcache manifest
 * used by standard-version as a "bumpFile"
 */
const readRegex = new RegExp('v([0-9.]+)');
const writeRegex = new RegExp('v[0-9.]+');

/**
 * Reads current version from file.
 */
module.exports.readVersion = function(contents) {
    const matches = contents.match(readRegex);
    return matches[1];
};

/**
 * Writes new version to file.
 */
module.exports.writeVersion = function(contents, version) {
    const newVersion = `v${version}`;
    contents.replace(writeRegex, newVersion);
    return contents;
}


