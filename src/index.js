import ActionMenu from './ActionMenu.js';
import EventEmitter from './EventEmitter.js';
import Manager from './Manager.js';

import NoteListItem from './components/NoteListItem.js';
import NoteList from './components/NoteList.js';
import SimpleList from './components/SimpleList.js';
import TableEditable from './components/TableEditable.js';
import SkillListing from './components/SkillListing.js';
import AttributeListing from './components/AttributeListing.js';
import EditableField from './components/EditableField.js';
import ConfirmButton from './components/ConfirmButton.js';
import Modal from './components/Modal.js';
/**
* Register service worker if it's supported
*/
if ('serviceWorker' in navigator) {
    // navigator.serviceWorker.register('service_worker.js', {
    //     scope: '/'
    // });
    navigator.serviceWorker.register(
        new URL('service_worker.js', import.meta.url),
        {
            type: 'module'
        }
    );
}

const emitter = new EventEmitter();
ActionMenu.initialize(emitter);

Manager.initialize({
    emitter: emitter,
    prefix: 'charsheet-5e-',
    appname: 'character-sheet-5e'
});
