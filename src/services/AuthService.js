/**
 * Authentication for data storage.
 */
import { init } from './firebaseService.js';
import { getAuth, GoogleAuthProvider, signInWithRedirect, onAuthStateChanged, signOut as fbSignOut } from 'firebase/auth';

let isAuthConfigured = false;
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
 * @param {Error} error Error usually from firebase
 * @param {String} method Method it happened it.
 */
const handleError = function (error, method) {
    const errorCode = error.code || '';
    const errorMessage = error.message || '';
    const message = `${method} auth error ${errorCode}: ${errorMessage}`;
    console.log(message);
    if (emitter) {
        emitter.trigger('error:display', message);
    }
};

/**
 * Trigger a signin (Google only).
 */
const signIn = async function () {
    if (!isAuthConfigured) {
        return;
    }
    try {
        const auth = getAuth();
        const provider = new GoogleAuthProvider();
        await signInWithRedirect(auth, provider);
    } catch (error) {
        handleError(error, 'signIn');
    }
};
/**
 *
 * @param {EventEmitter} em
 */
const monitorAuth = function (em) {
    // local reference to EventEmitter
    emitter = em;
    try {
        init();
        const auth = getAuth();
        isAuthConfigured = true;

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

        emitter.trigger('auth:enabled');
    } catch (error) {
        handleError(error, 'monitorAuth');
    }
};
/**
 * Sign out.
 */
const signOut = function () {
    if (!isAuthConfigured) {
        return;
    }
    const auth = getAuth();
    fbSignOut(auth).then(() => {
        // Don't really need to do anything here
        // The observer catches the change the triggers any events.
    }).catch((error) => {
        handleError(error, 'signOut');
    });
};

export {
    getUser,
    signIn,
    monitorAuth,
    signOut,
    isAuthed
};
