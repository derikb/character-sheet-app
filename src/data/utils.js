/**
 * Various utility definitions.
 */

/**
 * Constructor function for enums.
 * @param {String[]} values
 * @returns {Object}
 */
function createEnum (values) {
    const enumObject = {};
    for (const val of values) {
        enumObject[val] = val;
    }
    return Object.freeze(enumObject);
}

/**
 * Constructor function for enums with different values.
 * @param {Map[String, Object]} values
 * @returns {Object}
 */
function createEnumFromMapping (values) {
    const enumObject = {};
    for (const [key, value] of values.entries()) {
        enumObject[key] = value;
    }
    return Object.freeze(enumObject);
}

export { createEnum, createEnumFromMapping };
