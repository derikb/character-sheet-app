/**
 * Service for retrieving, saving, deleting characters.
 * For now LocalStorage only, but potentially adaptable to different stores.
 */
import Character from '../models/Character.js';
import Character5e from '../models/Character5e.js';
import CharacterVagabonds from '../models/CharacterVagabonds.js';
import Storage from './Storage.js';
import Database from './Database.js';
import { isAuthed } from './AuthService.js';
import Character5eSheet from '../views/Character5eSheet.js';
import CharacterVagabondsSheet from '../views/CharacterVagabondsSheet.js';
import SheetView from '../views/SheetView.js';

/**
 * Currently loaded character data is here
 * @prop {Character|null}
 */
let cur_character = null;
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
 * Options for games characters can be created for.
 * @todo probably should have a constant file for these.
 * @returns {String[]}
 */
const getGameOptions = function () {
    return [
        'Character5e',
        'CharacterVagabonds'
    ];
};

/**
 * Get a Character of appropriate class.
 * @param {String} type className for model.
 * @param {Object} obj Character data.
 * @returns {Character}
 */
const characterFactory = function (type, obj) {
    switch (type) {
        // Backwards compatible
        // and default
        case undefined:
        case '':
        case 'Character5e':
            return new Character5e(obj);
        case 'CharacterVagabonds':
            return new CharacterVagabonds(obj);
        default:
            return new Character(obj);
    }
};

/**
 * Return a new character for a key.
 * @param {String} key
 * @param {String} type Model className
 * @returns {Character}
 */
const newCharacter = function (key, type = 'Character5e') {
    return characterFactory(type, { key });
};
/**
 * Get a single character model.
 * @param {String} key Character's key.
 * @returns {Character|null}
 */
const getCharacter = function (key) {
    if (!key) {
        return null;
    }
    const char_obj = Storage.get(key);
    if (!char_obj || !char_obj.key) {
        return null;
    }
    return characterFactory(char_obj.className, char_obj);
};
/**
 * Get a single character model.
 * @param {String} key Character's key.
 * @returns {Character|null}
 * @throws Error
 */
const getCharacterRemote = async function (key) {
    if (!key) {
        return null;
    }
    const char_obj = await Database.get(key);
    if (!char_obj || !char_obj.key) {
        return null;
    }
    return characterFactory(char_obj.className, char_obj);
};
/**
 * Save a single character.
 * @param {Character} character
 * @returns {Boolean}
 */
const saveCharacter = function (character) {
    // Update saved timestamp
    character.updated = currentTimestamp();
    return Storage.set(character.key, character);
};
/**
 * Save a single character to the remote.
 * @param {Character} character
 * @returns {Boolean}
 * @throws Error
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
 * @throws Error
 */
const removeCharacterRemote = async function (key) {
    return Database.remove(key);
};
/**
 * Get all characters saved locally.
 * @returns {Character[]}
 */
const getAllCharactersLocal = function () {
    const characters = [];
    Storage.getAll().forEach((char_obj) => {
        characters.push(
            characterFactory(char_obj.className, char_obj)
        );
    });
    return characters;
};
/**
 * Get all characters saved to the remote database.
 * @returns {Map} entries are Character keyed to the key property.
 * @throws Error
 */
const getAllCharactersRemote = async function () {
    const characters = new Map();
    if (!isAuthed()) {
        return [];
    }
    const char_objects = await Database.getAll();
    char_objects.forEach((char_obj) => {
        const char = characterFactory(char_obj.className, char_obj);
        characters.set(char.key, char);
    });
    return characters;
};
/**
 * Import/save a character from an obj and return the model.
 * @param {Object} char_obj Character data from backup (we hope).
 * @returns {Character}
 * @throws {Error}
 */
const importCharacter = function (char_obj) {
    if (typeof char_obj !== 'object' || !char_obj.key) {
        throw new Error(`Data appears to be invalid. Try removing any text that isn't part of the backup (i.e. email introduction).`);
    }
    const newCharacter = characterFactory(char_obj.className, char_obj);
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

/**
 * Set current character based on key.
 * Returns null if key is not locally set.
 * @param {String} key
 * @param {String} type Type of character to create.
 * @param {Boolean} createOnEmpty Create new character if the key isn't found.
 * @returns {Character|null}
 */
const setCurrentCharacter = function (key, type, createOnEmpty = false) {
    let char = getCharacter(key);
    if (!char) {
        if (!createOnEmpty) {
            return null;
        }
        char = newCharacter(key, type);
    }
    cur_character = char;
    return cur_character;
};

/**
 * Get character currently displayed.
 * @returns {Character|null}
 */
const getCurrentCharacter = function () {
    return cur_character;
};
/**
 * Just the key for the current character.
 * @returns {String}
 */
const getCurrentCharacterKey = function () {
    return !cur_character ? '' : cur_character.key;
};
/**
 * Save the current character locally.
 */
const saveCurrentCharacter = function () {
    if (!cur_character) {
        throw new Error('No character is set.');
    }
    if (cur_character.charname === '') {
        throw new Error('Your character must have name to save!');
    }
    saveCharacter(cur_character);
};
/**
 * Get the right view for a character
 * @param {Character} character
 * @param {EventEmitter} emitter
 * @returns {SheetView}
 */
const getSheetView = function (character, emitter) {
    let view = null;
    switch (character.className) {
        // Backwards compatible
        case undefined:
        case 'Character5e':
            view = new Character5eSheet({ emitter });
            break;
        case 'CharacterVagabonds':
            view = new CharacterVagabondsSheet({ emitter });
            break;
        default:
            view = new SheetView({ emitter });
            break;
    }
    return view;
};

export {
    getGameOptions,
    generateCharacterKey,
    getCharacter,
    getCharacterRemote,
    saveCharacter,
    saveCharacterRemote,
    removeCharacterLocal,
    removeCharacterRemote,
    getAllCharactersLocal,
    getAllCharactersRemote,
    importCharacter,
    setLocalStoragePrefix,
    getCurrentCharacter,
    setCurrentCharacter,
    getCurrentCharacterKey,
    saveCurrentCharacter,
    getSheetView
};
