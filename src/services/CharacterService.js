/**
 * Service for retrieving, saving, deleting characters.
 * For now LocalStorage only, but potentially adaptable to different stores.
 */
import Character5e from '../models/Character5e.js';
import Storage from './Storage.js';
import Database from './Database.js';
import { isAuthed } from './AuthService.js';

/**
 * Return UTC datetime string for right now
 * @return {String}
 */
const currentTimestamp = function () {
    const d = new Date();
    return d.toUTCString();
};
/**
 * Get a unique 7 character key to use for a new character.
 * @returns {String}
 */
const generateCharacterKey = function () {
    let key = (`${Math.random().toString(36)}00000000000000000`).slice(2, 9);
    while (getCharacter(key) !== null) {
        key = (`${Math.random().toString(36)}00000000000000000`).slice(2, 9);
    }
    return key;
};
/**
 * Return a new character for a key.
 * @param {String} key
 */
const newCharacter = function (key) {
    return new Character5e({ key: key });
};
/**
 * Get a single character model.
 * @param {String} key Character's key.
 * @returns {Character5e|null}
 */
const getCharacter = function (key) {
    if (!key) {
        return null;
    }
    const char_obj = Storage.get(key);
    if (!char_obj || !char_obj.key) {
        return null;
    }
    return new Character5e(char_obj);
};
/**
 * Get a single character model.
 * @param {String} key Character's key.
 * @returns {Character5e|null}
 */
const getCharacterRemote = async function (key) {
    if (!key) {
        return null;
    }
    const char_obj = await Database.get(key);
    if (!char_obj || !char_obj.key) {
        return null;
    }
    return new Character5e(char_obj);
};
/**
 * Save a single character.
 * @param {Character5e} character
 * @param {String} appname
 * @returns {Boolean}
 */
const saveCharacter = function (character, appname = '') {
    // Update saved timestamp
    character.updated = currentTimestamp();
    // Make sure app name is set
    if (appname !== '') {
        character.app = appname;
    }
    return Storage.set(character.key, character);
};
/**
 * Save a single character to the remote.
 * @param {Character5e} character
 * @returns {Boolean}
 */
const saveCharacterRemote = async function (character) {
    // Update saved timestamp
    // character.updated = currentTimestamp();
    return await Database.set(character.key, character.toJSON());
};
/**
 * Remove a character from the store.
 * @param {String} key
 */
const removeCharacterLocal = function (key) {
    Storage.remove(key);
};
/**
 * Remove a character from the remote.
 * @param {String} key
 */
const removeCharacterRemote = async function (key) {
    return Database.remove(key);
};
/**
 * Get all characters saved locally.
 * @returns {Character5e[]}
 */
const getAllCharactersLocal = function () {
    const characters = [];
    Storage.getAll().forEach((char_obj) => {
        characters.push(new Character5e(char_obj));
    });
    return characters;
};
/**
 * Get all characters saved to the remote database.
 * @returns {Map} entries are Character5e keyed to the key property.
 */
const getAllCharactersRemote = async function () {
    const characters = new Map();
    if (!isAuthed()) {
        return [];
    }
    const char_objects = await Database.getAll();
    char_objects.forEach((char_obj) => {
        const char = new Character5e(char_obj);
        characters.set(char.key, char);
    });
    return characters;
};
/**
 * Import/save a character from an obj and return the model.
 * @param {Object} char_obj Character data from backup (we hope).
 * @param {String} appname App identifier.
 * @returns {Character5e}
 * @throws {Error}
 */
const importCharacter = function (char_obj, appname) {
    if (typeof char_obj !== 'object' || !char_obj.key || char_obj.app !== appname) {
        throw new Error(`Data appears to be invalid. Try removing any text that isn't part of the backup (i.e. email introduction).`);
    }
    const newCharacter = new Character5e(char_obj);
    // do we have this char key already
    const existingCharacter = getCharacter(char_obj.key);
    if (existingCharacter && existingCharacter.charname !== '' && existingCharacter.charname !== newCharacter.charname) {
        // existing key but different name
        if (!newCharacter.key_prev) {
            newCharacter.key_prev = newCharacter.key;
            newCharacter.key = generateCharacterKey();
        } else {
            const temp_key = newCharacter.key_prev;
            newCharacter.key_prev = newCharacter.key;
            newCharacter.key = temp_key;
        }
    }
    saveCharacter(newCharacter);
    return newCharacter;
};
/**
 * Set prefix for LocalStorage keys.
 * @param {String} prefix
 */
const setLocalStoragePrefix = function (prefix) {
    if (!prefix) {
        throw Error('LocalStorage prefix is empty.');
    }
    Storage.setPrefix(prefix);
};

export {
    generateCharacterKey,
    newCharacter,
    getCharacter,
    getCharacterRemote,
    saveCharacter,
    saveCharacterRemote,
    removeCharacterLocal,
    removeCharacterRemote,
    getAllCharactersLocal,
    getAllCharactersRemote,
    importCharacter,
    setLocalStoragePrefix
};
