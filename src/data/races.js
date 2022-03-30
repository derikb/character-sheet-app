/**
 * Data definition for races.
 */

/**
 * Full definition of a race (with optional base race).
 */
class Race {
    /**
     * @param {String} name_ Name of the race.
     * @param {Book} source Source book in which race is defined.
     * @param {String} base_name Name of the base race.
     * @param {Book} base_source Source of the base race.
     */
    constructor ({ name_, source, base_name = null, base_source = null }) {
        this.name_ = name_;
        this.source = source;
        this.base_name = base_name;
        this.base_source = base_source;
    }
};

export { Race };
