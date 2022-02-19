/* eslint-disable no-unused-vars */
import EventEmitter from './services/EventEmitter.js';
import Manager from './views/Manager.js';

// All the web components we need in the app.
import ActionMenu from './views/ActionMenu.js';
import NoteListItem from './components/NoteListItem.js';
import NoteList from './components/NoteList.js';
import SimpleList from './components/SimpleList.js';
import TableEditable from './components/TableEditable.js';
import SkillListing from './components/SkillListing.js';
import AttributeListing from './components/AttributeListing.js';
import DiceRoller from './components/DiceRoller.js';
import Die from './components/Die.js';
import EditableField from './components/EditableField.js';
import FooterNav from './components/FooterNav.js';
import ConfirmButton from './components/ConfirmButton.js';
import Modal from './components/Modal.js';
/**
* Register service worker if it's supported
*/
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register(
        './service_worker.js',
        {
            type: 'module'
        }
    );
}

const emitter = new EventEmitter();

document.querySelector('action-menu').setEmitter(emitter);

Manager.initialize({
    emitter: emitter,
    prefix: 'charsheet-app-',
    appname: 'character-sheet'
});
