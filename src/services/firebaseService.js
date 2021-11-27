import { initializeApp } from 'firebase/app';
import config from '../config/firebase.js';

const init = function () {
    initializeApp(config);
};

export {
    init
};
