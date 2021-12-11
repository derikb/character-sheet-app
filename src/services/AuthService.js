/**
 * Authentication for data storage.
 */
import { init } from './firebaseService.js';
import { getAuth, GoogleAuthProvider, signInWithRedirect, onAuthStateChanged, signOut as fbSignOut } from 'firebase/auth';

let currentUser = null;
let emitter = null;

/**
 * Get current user.
 * @returns {User|null}
 */
const getUser = function () {
    return currentUser;
};
/**
 * Is current user logged in.
 * @returns {Boolean}
 */
const isAuthed = function () {
    return getUser() !== null;
};

/**
 * Trigger a signin (Google only).
 */
const signIn = function () {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider);
};
/**
 *
 * @param {EventEmitter} em
 */
const monitorAuth = function (em) {
    // local reference to EventEmitter
    emitter = em;
    init();
    const auth = getAuth();

    onAuthStateChanged(auth, user => {
        if (user != null) {
            console.log('Auth state changed to have a user.');
            currentUser = user;
            emitter.trigger('auth:signin');
        } else {
            console.log('Auth state changed to no user.');
            currentUser = null;
            emitter.trigger('auth:signout');
        }
    });
};
/**
 * Sign out.
 */
const signOut = function () {
    const auth = getAuth();
    fbSignOut(auth).then(() => {
        // Don't really need to do anything here
        // The observer catches the change the triggers any events.
    }).catch((error) => {
        const errorCode = error.code || '';
        const errorMessage = error.message || '';
        console.log(`Signout auth error ${errorCode}: ${errorMessage}`);
        emitter.trigger('error:display', `Signout auth error ${errorCode}: ${errorMessage}`);
    });
};

export {
    getUser,
    signIn,
    monitorAuth,
    signOut,
    isAuthed
};
