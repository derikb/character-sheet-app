import { getAllCharactersLocal, getAllCharactersRemote, getCharacter, getCharacterRemote, saveCharacter, saveCharacterRemote, removeCharacterRemote, removeCharacterLocal } from './CharacterService.js';

const compareLocalToRemote = function (local, remote) {
    // updated stamp on both is in UTC string which can be parse from new Date(utc string)
    const lUpdated = new Date(local);
    const rUpdated = new Date(remote);
    if (lUpdated > rUpdated) {
        return 'local';
    }
    if (rUpdated > lUpdated) {
        return 'remote';
    }
    return 'equal';
};
/**
 * Get all characters local and remote
 * With comparisons by key for which is most recent.
 * @returns {Object[]}
 */
const getCharacterMatchings = async function () {
    const localCharacters = getAllCharactersLocal();
    const remoteCharacters = await getAllCharactersRemote();
    const matches = [];
    localCharacters.forEach((local) => {
        const match = {
            key: local.key,
            local: local
        };
        const remote = remoteCharacters.get(local.key);
        if (remote) {
            match.remote = remote;
            remoteCharacters.delete(local.key);
            // Set something to say which is newer.
            match.latest = compareLocalToRemote(local.updated, remote.updated);
        }
        matches.push(match);
    });
    // Any that are on remote but not on local.
    remoteCharacters.forEach((remote) => {
        const match = {
            key: remote.key,
            remote: remote
        };
        matches.push(match);
    });
    return matches;
};
/**
 * Upload a character to the remote.
 * @param {String} key
 * @returns {Boolean}
 */
const uploadCharacter = async function (key) {
    const char = getCharacter(key);
    if (!char) {
        throw new Error('Character not found');
    }
    const remote = await getCharacterRemote(key);
    if (remote) {
        throw new Error('Character already on the remote');
    }
    return await saveCharacterRemote(char);
};
/**
 * Download a character to the local.
 * @param {String} key
 * @returns {Boolean}
 */
const downloadCharacter = async function (key) {
    const char = getCharacter(key);
    if (char) {
        return 'Character already on local';
    }
    const remote = await getCharacterRemote(key);
    if (!remote) {
        return 'Character not found on the remote';
    }
    return await saveCharacter(remote);
};
/**
 * Delete remote character data.
 * @param {String} key
 * @returns {Boolean}
 */
const deleteRemote = async function (key) {
    return removeCharacterRemote(key);
};
/**
 * Delete local character data.
 * @param {String} key
 * @returns {Boolean}
 */
const deleteLocal = async function (key) {
    return removeCharacterLocal(key);
};
/**
 * Update remote character from local data.
 * @param {String} key
 * @returns {Boolean}
 */
const syncToRemote = async function (key) {
    const local = getCharacter(key);
    if (!local) {
        throw new Error('Character not found on local');
    }
    return await saveCharacterRemote(local);
};
/**
 * Update local character from remote data.
 * @param {String} key
 * @returns {Boolean}
 */
const syncToLocal = async function (key) {
    const remote = await getCharacterRemote(key);
    if (!remote) {
        throw new Error('Character not found on the remote');
    }
    const result = await saveCharacter(remote);
    return result;
};

export {
    getCharacterMatchings,
    uploadCharacter,
    downloadCharacter,
    deleteRemote,
    deleteLocal,
    syncToRemote,
    syncToLocal
};
