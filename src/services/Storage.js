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
     * @return {Object|Null} object or null
     */
    get: function (key) {
        try {
            const txt = localStorage.getItem(`${this.prefix}${key}`);
            return (txt !== null) ? JSON.parse(txt) : null;
        } catch (e) {
            return null;
        }
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
        } catch (e) {
            // Should only happen when over quota
            console.log(e.message);
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
                key = key.replace(key_regex, '');
                keys.push(key);
            }
        }
        return keys;
    },
    /**
     * Get all objects from the store.
     * @returns Object[]
     */
    getAll: function () {
        const keys = this.getAllKeys();
        const objects = [];
        keys.forEach((key) => {
            const char_obj = Storage.get(key);
            if (!char_obj || !char_obj.key) {
                return;
            }
            objects.push(char_obj);
        });
        return objects;
    }
};

export default Storage;
