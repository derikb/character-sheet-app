/**
 * Authentication for data storage.
 */
import { init } from './firebaseService.js';
import { getAuth, getRedirectResult, GoogleAuthProvider, signInWithRedirect, onAuthStateChanged, signOut as fbSignOut } from 'firebase/auth';

let currentUser = null;
let emitter = null;

const getUser = function () {
    return currentUser;
};

const isAuthed = function () {
    return getUser() !== null;
};


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
            console.log(user.toJSON());
            currentUser = user;
            emitter.trigger('auth:signin');
            // probably need to deal with... Storage vs. Db.
        } else {
            console.log('Auth state changed to no user.');
            currentUser = null;
            emitter.trigger('auth:signout');
        }
    });
};

// I think I only need this is I need to get the token...
// which maybe I need for other service access?
// Or mayb
// const checkAuthLogin = function() {
//     const auth = getAuth();
//     getRedirectResult(auth)
//         .then((result) => {
//             if (!result) {
//                 return;
//             }
//             // This gives you a Google Access Token. You can use it to access Google APIs.
//             // const credential = GoogleAuthProvider.credentialFromResult(result);
//             // const token = credential.accessToken;

//             // The signed-in user info.
//             currentUser = result.user;
//         }).catch((error) => {
//             // Handle Errors here.
//             const errorCode = error.code;
//             const errorMessage = error.message;
//             // The email of the user's account used.
//             const email = error.email;
//             // The AuthCredential type that was used.
//             const credential = GoogleAuthProvider.credentialFromError(error);
                // if (errorCode === 'auth/account-exists-with-different-credential') {
                //     alert('You have already signed up with a different auth provider for that email.');
                //     // If you are using multiple auth providers on your app you should handle linking
                //     // the user's accounts here.
                // } else {
                //     console.error(error);
                // }
//             console.log(`Redirect auth error ${errorCode}: ${errorMessage}`);
//         });
// };

const signOut = function () {
    const auth = getAuth();
    fbSignOut(auth).then(() => {
        console.log('sign out promise completed');
        // don't really need to do anything here
        // the observer catches the change the triggers any events.
    }).catch((error) => {
        // An error happened.
        const errorCode = error.code || '';
        const errorMessage = error.message || '';
        console.log(`Signout auth error ${errorCode}: ${errorMessage}`);
    });
};

export {
    getUser,
    signIn,
    monitorAuth,
    signOut,
    isAuthed
};
