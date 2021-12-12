// import { init } from './firebaseService.js';
import { getFirestore, collection, doc, getDoc, getDocs, setDoc, deleteDoc } from 'firebase/firestore';
import { getUser } from './AuthService.js';

/**
 * Get Firebase userid if user is authed.
 * @returns {String|null}
 * @throws Error
 */
const getUserId = function () {
    const user = getUser();
    if (!user || !user.uid) {
        throw new Error('User not authed.');
    }
    return user.uid;
};
/**
 * Get document reference for a single character
 * @param {String} userId Firebase user id
 * @param {String} key Character key
 * @returns {DocumentReference}
 */
const getRefForKey = function (userId, key) {
    const db = getFirestore();
    return doc(db, `/users/${userId}/characters`, key);
};
/**
 * Get collection reference for user's characters.
 * @param {String} userId Firebase user id
 * @returns {CollectionReference}
 */
const getRefForCollection = function (userId) {
    const db = getFirestore();
    return collection(db, `/users/${userId}/characters`);
};
/**
 * Get single character.
 * @param {String} key Character key.
 * @returns {Object|null}
 * @throws Error
 */
const get = async function (key) {
    const userId = getUserId();
    if (!userId) {
        return null;
    }
    const docRef = getRefForKey(userId, key);
    try {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return docSnap.data();
        } else {
            return null;
        }
    } catch (err) {
        console.log(`Database.get error: ${err}`);
        throw new Error(`Database.get error: ${err}`);
    }
};
/**
 * Save single character.
 * @param {String} key Character key.
 * @param {Object} char_obj Character data.
 * @returns {Boolean}
 * @throws Error
 */
const set = async function (key, char_obj) {
    const userId = getUserId();
    if (!userId) {
        return false;
    }
    const docRef = getRefForKey(userId, key);
    try {
        await setDoc(docRef, char_obj);
    } catch (err) {
        console.log(`Database.set error: ${err}`);
        throw new Error(`Database.set error: ${err}`);
    }
    return true;
};
/**
 * Get all characters for current user.
 * @returns {Object[]}
 * @throws Error
 */
const getAll = async function () {
    const userId = getUserId();
    if (!userId) {
        return [];
    }
    const char_obj = [];
    try {
        const querySnapshot = await getDocs(getRefForCollection(userId));
        querySnapshot.forEach((doc) => {
            char_obj.push(doc.data());
        });
    } catch (err) {
        console.log(`Database.getAll error: ${err}`);
        throw new Error(`Database.getAll error: ${err}`);
    }
    return char_obj;
};
/**
 * Remove a character from the remote.
 * @param {String} key
 * @returns {Boolean}
 * @throws Error
 */
const remove = async function (key) {
    const userId = getUserId();
    if (!userId) {
        return false;
    }
    const docRef = getRefForKey(userId, key);
    try {
        await deleteDoc(docRef);
    } catch (err) {
        console.log(`Database.remove error: ${err}`);
        throw new Error(`Database.remove error: ${err}`);
    }
    return true;
};

export default {
    get,
    set,
    getAll,
    remove
};
