import CharacterNote from './CharacterNote.js';

/**
 * Generic Character Modal.
 * Extend for different rules/games/properties.
 * This is only props/methods that apply to all.
 * Another not set here, should only be used in the appropriate SheetView.
 *
 * @prop {String} key Unique (in one instance of the app) id for the character. 7 Random letters/numbers.
 * @prop {String} charname Name.
 * @prop {String} updated UTC date string.
 * @prop {String} key_prev If character was imported into app with identical key. This is that key and the character is given a new one on import.
 * @prop {String} version Version number (semver format) of app.
 */
export default class Character {
    constructor ({
        key = '',
        charname = '',
        updated = '',
        key_prev = '',
        version = ''
    }) {
        this.key = key;
        this.charname = charname;
        this.updated = updated;
        this.key_prev = key_prev;
        this.version = version;
    }
    /**
     * Localized last updated string.
     */
    get updatedTime () {
        const date = new Date(this.updated);
        return date.toLocaleString();
    }
    /**
     * Class name (for JSON (de)serialization). Override in children.
     */
    get className () {
        return 'Character';
    }
    /**
     * Ruleset name. Override in children.
     */
    get ruleset () {
        return 'Generic';
    }
    /**
     * A quick summary header for use in lists.
     */
    get summaryHeader () {
        return `${this.charname} (${this.ruleset})`;
    }
    /**
     * Convert notes arrays from Array[] or Object[] to CharacterNotes[]
     * @param {Array} noteArray
     * @returns
     */
    _convertNotes (noteArray) {
        const value = [];
        noteArray.forEach((item) => {
            // Remove null and non-objects
            if (item && typeof item !== 'object') {
                return;
            }
            if (item instanceof CharacterNote) {
                value.push(item);
                return;
            }
            // @version < 3.0.0 backwards compat
            if (Array.isArray(item)) {
                // convert
                value.push(new CharacterNote({
                    header: item[0] || '',
                    text: item[1] || ''
                }));
                return;
            }
            value.push(new CharacterNote(item));
        });
        return value;
    }
    /**
     * Converting _ props for saving.
     * @returns {Object}
     */
    toJSON () {
        const obj = {
            className: this.className
        };
        const props = Object.getOwnPropertyNames(this);
        props.forEach((prop) => {
            if (prop === 'emitter') {
                return;
            }
            let value = this[prop];
            if (Array.isArray(value)) {
                value = value.map((el) => {
                    if (typeof el.toJSON === 'function') {
                        return el.toJSON();
                    }
                    return el;
                });
            }
            if (prop.substring(0, 1) === '_') {
                obj[prop.substring(1)] = value;
            } else {
                obj[prop] = value;
            }
        });
        return obj;
    }
}
