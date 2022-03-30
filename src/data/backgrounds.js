/**
 * Data definition for backgrounds.
 */

/**
 * Definition of a background.
 */
class Background {
    /**
     * @param {String} name_ Background name.
     * @param {Book} source Source book that defines the background.
     */
    constructor ({ name_, source }) {
        this.name_ = name_;
        this.source = source;
    }
};

export { Background };
