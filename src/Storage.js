/**
 * LocalStorage interface
 */
const Storage = {
    /**
     * A prefix to attack to the random keys to differentiate them from any other storage for the current location/domain
     */
    prefix: '',
    /**
     * Set the prefix
     * @param {String} prefix string to prefix the randomly generated key
     */
    setPrefix: function (prefix) {
        this.prefix = prefix;
    },
    /**
     * Returns blank or the value for the key
     * @param {String} key
     * @return {Object|String} object or the empty string
     */
    get: function (key) {
        let txt = localStorage.getItem(`${this.prefix}${key}`);
        // backward compatibile cleanup later @todo
        if (txt === null) {
            txt = localStorage.getItem(key);
            if (txt !== null) {
                this.set(key, txt);
            }
        }
        return (txt !== null) ? JSON.parse(txt) : '';
    },
    /**
     * Store a value for the key
     * Warning: browsers vary for the amount of data you can store (usually ~5mb)
     * @param {String} key
     * @param {Object} object
     * @return {Boolean} returns false on error
     */
    set: function (key, object) {
        try {
            localStorage.setItem(`${this.prefix}${key}`, JSON.stringify(object));
            // backwards compatible cleanup for non prefixed saved characters @todo remove
            if (localStorage.getItem(key) !== null) {
                localStorage.removeItem(key);
            }
        } catch (e) {
            // Should only happen when over quota
            return false;
        }
        return true;
    },
    /**
     * Remove a key
     * @param {String} key
     * @return void
     */
    remove: function (key) {
        localStorage.removeItem(`${this.prefix}${key}`);
    },
    /**
     * Get an array of all keys with the key prefix
     * @return {Array}
     */
    getAllKeys: function () {
        const keys = [];
        if (localStorage.length > 0) {
            const key_regex = new RegExp(`^(${this.prefix})+`, 'i');
            for (let i = 0; i < localStorage.length; i++) {
                let key = localStorage.key(i);
                // check for prefix
                if (key.indexOf(this.prefix) !== 0) {
                    // backwards compatibility for a little while @todo remove
                    if (!key.match(/^[a-z0-9]{7}$/)) {
                        continue;
                    }
                }
                key = key.replace(key_regex, '');
                keys.push(key);
            }
        }
        return keys;
    }
};

export default Storage;
