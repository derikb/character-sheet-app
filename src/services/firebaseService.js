import { initializeApp } from 'firebase/app';
import config from '../config/firebase.js';

const init = function () {
    if (!config.apiKey) {
        throw Error('Firebase config is not setup.');
    }
    initializeApp(config);
};

export {
    init
};
