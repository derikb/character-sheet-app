/**
 * Manager:
 * Interface for save/backup/restore of data...
 */
import { generateCharacterKey, newCharacter, getCharacter, saveCharacter, removeCharacter, getCharacterCount, importCharacter, setLocalStoragePrefix } from './CharacterService.js';
import { default as Modal } from './Modal.js';
import { default as ShortCutKeys } from './ShortCutKeys.js';
import { default as SheetView } from './views/SheetView.js';

const Manager = {
    /** @prop {EventEmitter} */
    emitter: null,
    /**
     * Currently loaded character data is here
     * @prop {Character5e}
     */
    cur_character: null,
    /**
     * App name used in character model app property
     */
    appname: '',
    /**
     * Unsaved dialog
     */
    dialog_unsaved: document.querySelector('.alert-unsaved'),
    /**
     * Undo delete dialog
     */
    dialog_undo: document.querySelector('.alert-delete'),
    /**
     * Start a new character by changing the hash.
     */
    triggerNewCharacter: function () {
        window.location.hash = `#${generateCharacterKey()}`;
    },
    /**
     * Change the character based on a hash change
     * or maybe I should process the event in the handler and pass it here if necessary...
     * @param {Object} e event object from hash change
     */
    changeCharacter: function () {
        const urlhash = window.location.hash.substr(1);
        this.loadCharacter(urlhash);
    },
    /**
     * Load character data based on a key
     * @param {String} key Character identifier
     */
    loadCharacter: function (key) {
        this.hideUnsavedDialog();
        this.cur_character = getCharacter(key);
        if (!this.cur_character) {
            this.cur_character = newCharacter(key);
        }
        this.cur_character.emitter = this.emitter;
        this.sheetView.character = this.cur_character;
        this.emitter.trigger('loaddialog:close');
    },
    /**
     * Save character data
     */
    saveCharacter: function () {
        if (this.cur_character === null) {
            alert('No character to save.');
            return;
        }
        if (this.cur_character.charname === '') {
            alert('Your character must have name to save!');
            return;
        }
        // For fields saved on blur we need to trigger it on the active field.
        // Fields that save on change will already have saved.
        if (document.activeElement) {
            const event = new Event('blur');
            document.activeElement.dispatchEvent(event);
        }

        saveCharacter(this.cur_character, this.appname);
        this.hideUnsavedDialog();
    },
    /**
     * Save a file of the current character
     * Falls back to showing the data for copy/pasting
     */
    downloadBackup: function (form) {
        const data = [];
        const names = [];
        const checks = Array.from(form.querySelectorAll('input[type=checkbox]:checked'));
        checks.forEach((ch) => {
            const character = getCharacter(ch.value);
            data.push(character);
            names.push(character.charname);
        });

        const format = form.querySelector('input[name=format]:checked').value;
        const date = new Date();

        if (format === 'email') {
            const body = `Below is the backup data for your character(s) ${names.join(', ')}.

To use this data, go to: ${window.location.href} and click the "Restore Backup" button. Then paste the text below into the box.

---

${JSON.stringify(data)}`;

            const url = `mailto:?subject=${encodeURIComponent(`Character backup: ${names.join(', ')} (${date.toLocaleString()})`)}&body=${encodeURIComponent(body)}`;

            // Sadly this simple solution doesn't work in iOS
            // document.location.href = url;
            this.emitter.trigger('backup:email', url);
        } else {
            if (typeof window.Blob !== 'function') {
                // fallback to displaying the data for copy/pasting
                this.emitter.trigger('backup:textpaste', JSON.stringify(data));
                return;
            }
            // for env that support it, create a file for download
            const a = document.createElement('a');
            const file = new Blob([JSON.stringify(data)], { type: 'application/json' });
            const url = URL.createObjectURL(file);
            a.href = url;
            a.download = `${this.appname}_${date.getFullYear()}_${date.getMonth() + 1}_${date.getDate()}`;
            document.body.appendChild(a);
            a.click();
            setTimeout(function () {
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
            }, 0);
        }
    },
    /**
     * Restore Backup form handler
     * @param {HTMLElement} form
     */
    restoreFormSubmit: function (form) {
        const input_file = form.querySelector('input[type=file]');
        const input = form.querySelector('textarea');
        if (input_file.files && input_file.files.length > 0) {
            Array.from(input_file.files).forEach((f) => {
                const reader = new FileReader();
                // Closure to capture the file information.
                reader.onload = ((theFile) => {
                    return (e) => {
                        this.restoreCharacters(e.target.result);
                    };
                })(f);
                reader.readAsText(f);
            });
        } else if (input.value !== '') {
            this.restoreCharacters(input.value);
        }
    },
    /**
     * Take json backup data and load the character(s)
     * @param {String} data JSON string we hope
     */
    restoreCharacters: function (data) {
        try {
            // look for the start of the JSON string Array of Objects
            let start = data.indexOf('[{');
            let end = data.lastIndexOf('}]');
            // make sure it's not :[{, an array of objects inside one of the objects
            const check = data.indexOf(':[{');
            if (check !== -1 && check < start) {
                // if so start over
                start = -1;
            }
            if (start === -1) {
                start = data.indexOf('{');
                end = data.lastIndexOf('}');
                data = data.substring(start);
                data = data.substring(0, end + 1);
            } else {
                data = data.substring(start);
                data = data.substring(0, end + 2);
            }
            data = data.trim(); // just in case

            // convert linebreaks to html br else JSON.parse breaks
            // first make sure it's not a break between objects...
            data = data.replace(/\},[\r\n]+\{/g, '},{');
            data = data.replace(/(?:\r\n|\r|\n)/g, '<br/>');
            let backups = JSON.parse(data);
            // make it an array
            if (!Array.isArray(backups)) {
                backups = [backups];
            }
            const imported_chars = [];
            backups.forEach((char_obj) => {
                const newCharacter = importCharacter(char_obj, this.appname);
                // if its the current character we should reload them
                if (newCharacter.key === this.cur_character.key) {
                    this.loadCharacter(newCharacter.key);
                }
                const li = document.createElement('li');
                li.textContent = `${newCharacter.charname} has been added. `;
                const a = document.createElement('a');
                a.setAttribute('href', `#${newCharacter.key}`);
                a.textContent = 'View character now.';
                a.addEventListener('click', (e) => {
                    this.alert.closeClear();
                });
                li.appendChild(a);
                imported_chars.push(li);
            });

            const ul = document.createElement('ul');
            imported_chars.forEach((li) => {
                ul.appendChild(li);
            });
            const header = document.createElement('h2');
            header.id = 'dialog-label';
            header.setAttribute('tabindex', '-1');
            header.textContent = 'Restored Characters';
            this.alert.setContent([header, ul]);
        } catch (e) {
            alert(`Error processing backup data: ${e.message}`);
        }
    },
    /**
     * Prompt to confirm deletion of character
     * @param {String} key character key
     */
    deletePrompt: function (key) {
        const character = getCharacter(key);
        if (!character) {
            return;
        }
        if (!confirm(`Are you sure you want to delete the character: ${(character.charname) ? character.charname : '[Unnamed]'}`)) {
            return;
        }
        this.deleteCharacterTemp(key);
    },
    /**
     * Set a timeout to remove the character in a few seconds.
     * @param {String} key character key
     */
    deleteCharacterTemp: function (key) {
        if (key === '' || key === 'settings') {
            return;
        }
        // if its the current character we should trigger "new character" action
        if (this.cur_character !== null && this.cur_character.key === key) {
            this.triggerNewCharacter();
        }
        this.dialog_undo.querySelector('button').dataset.key = key;
        this.dialog_undo.hidden = false;
        // This will trigger a transition bar.
        const timeoutIndicator = this.dialog_undo.querySelector('.delete-timeout');
        // The transition animation doesn't happen if you don't have this timeout,
        // since we are also just now revealing the element.
        setTimeout(() => {
            timeoutIndicator.classList.add('transition', 'timeout');
        }, 10);
        // Note: if we change the timeout of the delete undo, we also need to change the transition timing in the css.
        this[`deleteTimeout${key}`] = setTimeout(this.deleteCharacter.bind(this), 8000, key);
    },
    /**
     * Delete a character from local storage
     * @param {String} key character key
     */
    deleteCharacter: function (key) {
        if (key === '' || key === 'settings') {
            return;
        }
        removeCharacter(key);
        this.dialog_undo.querySelector('button').dataset.key = '';
        this.dialog_undo.hidden = true;
        // This will reset the transition bar.
        const timeoutIndicator = this.dialog_undo.querySelector('.delete-timeout');
        timeoutIndicator.classList.remove('transition', 'timeout');
        if (getCharacter(key)) {
            // Character is still around, so error, I guess.
            alert(`Error deleting the character with key: ${key}`);
        }
    },
    /**
     * Remove the timeout and stop the delete from happening.
     * @param {Event} ev Undo button click.
     */
    undoDelete: function(ev) {
        const key = ev.target.dataset.key || null;
        if (!key) {
            return;
        }
        this.dialog_undo.querySelector('button').dataset.key = '';
        this.dialog_undo.hidden = true;
        // Reset transition bar.
        const timeoutIndicator = this.dialog_undo.querySelector('.delete-timeout');
        timeoutIndicator.classList.remove('transition', 'timeout');
        if (this[`deleteTimeout${key}`]) {
            clearTimeout(this[`deleteTimeout${key}`]);
        }
    },
    /**
     * If no characters are saved we show an app intro dialog
     */
    showIntroDialog: function () {
        var template = document.getElementById('introAlert');
        this.alert.setContent(document.importNode(template.content, true));
    },
    /**
     * Show the unsaved data dialog.
     */
    showUnsavedDialog: function () {
        this.dialog_unsaved.hidden = false;
    },
    /**
     * Hide the unsaved data dialog.
     */
    hideUnsavedDialog: function() {
        this.dialog_unsaved.hidden = true;
    },
    /**
     * When a field is changed in the UI.
     * @param {CustomEvent} ev
     */
    handleFieldChange: function (ev) {
        const field = ev.detail.field || '';
        const subfield = ev.detail.subfield || '';
        if (!field) {
            return;
        }
        if (typeof this.cur_character[field] === 'undefined') {
            return;
        }
        if (field === 'skills') {
            this.cur_character.setSkill(subfield, ev.detail.value);
            this.dialog_unsaved.hidden = false;
            return;
        }
        if (subfield) {
            if (typeof this.cur_character[field] !== 'object' || Array.isArray(this.cur_character[field])) {
                return;
            }
            this.cur_character[field][subfield] = ev.detail.value;
            this.dialog_unsaved.hidden = false;
            return;
        }
        this.cur_character[field] = ev.detail.value;
        this.dialog_unsaved.hidden = false;
    },
    /**
     * When an attribute is changed in the UI.
     * @param {CustomEvent} ev
     */
    handleAttributeChange: function (ev) {
        const field = ev.detail.field || '';
        if (!field) {
            return;
        }
        this.cur_character.setAttribute(field, ev.detail.value);
        this.dialog_unsaved.hidden = false;
    },
    /**
     * When a save is (un)checked in the UI.
     * @param {CustomEvent} ev
     */
    handleSaveChange: function(ev) {
        const field = ev.detail.field || '';
        if (!field) {
            return;
        }
        this.cur_character.setSaveProficiency(field, ev.detail.value);
        this.dialog_unsaved.hidden = false;
    },
    /**
     * Start up the app with some events and such
     * @param {Object} settings things we need to set external to this script
     * @param {EventEmitter} settings.emitter
     * @param {String} settings.prefix prefix for localStorage keys
     * @param {String} settings.appname used to identify the app property in a character model
     */
    initialize: function (settings) {
        if (!settings.emitter || !settings.prefix || !settings.appname) {
            document.body.innerHTML = '<p>App is missing required settings.</p>';
            return;
        }
        this.emitter = settings.emitter;
        this.appname = settings.appname;
        // set up storage
        setLocalStoragePrefix(settings.prefix);
        // set up default alert
        this.alert = new Modal(document.getElementById('alert-main'));

        this.sheetView = new SheetView(this.emitter);
        this.sheetView.initialize();

        if (getCharacterCount() === 0) {
            this.showIntroDialog();
        }

        const shortCuts = new ShortCutKeys(this.emitter);
        shortCuts.addShortCut('Ctrl+Shift+ArrowDown', 'character:save');
        shortCuts.addShortCut('Ctrl+Shift+ArrowRight', 'tab:switch');
        shortCuts.addShortCut('Ctrl+Shift+ArrowLeft', 'tab:switch');
        shortCuts.addShortCut('Ctrl+Shift+ArrowUp', 'loaddialog:toggle');

        document.querySelector('nav').addEventListener('click', (e) => {
            if (e.target.tagName === 'A') {
                e.preventDefault();
                const link = e.target;
                const targetPane = link.dataset.tab;
                if (targetPane) {
                    this.sheetView.switchToPane(targetPane);
                }
                const target_id = link.getAttribute('href').substring(1);
                document.getElementById(target_id).scrollIntoView();
            }
        });

        document.querySelector('.btn-help').addEventListener('click', (ev) => {
            ev.preventDefault();
            const template = document.getElementById('helpDialog');
            const div = document.importNode(template.content, true);
            this.alert.setContent(div);
        });

        // Event: Listen for hashchange and change the current character
        window.addEventListener('hashchange', (e) => { this.changeCharacter(); }, false);

        // Check the hash to see if we need to load a specific character
        const urlhash = window.location.hash.substr(1);
        if (urlhash !== '') {
            this.loadCharacter(urlhash);
        } else {
            this.triggerNewCharacter();
        }

        this.dialog_unsaved.querySelector('.btn-save').addEventListener('click', (ev) => {
            this.emitter.trigger('character:save');
        });
        this.dialog_undo.querySelector('.btn-delete-undo').addEventListener('click', (ev) => {
            this.undoDelete(ev);
        });

        // Listen for events, mostly from the menus.
        this.emitter.on('character:new', this.triggerNewCharacter, this);
        this.emitter.on('character:save', this.saveCharacter, this);
        this.emitter.on('character:delete:confirm', this.deletePrompt, this);
        this.emitter.on('backup:download', this.downloadBackup, this);
        this.emitter.on('backup:restore', this.restoreFormSubmit, this);
        this.emitter.on('tab:switch', this.sheetView.switchToPane, this.sheetView);
        this.emitter.on('dialog:save:show', this.showUnsavedDialog, this);
        this.emitter.on('dialog:save:hide', this.hideUnsavedDialog, this);

        document.addEventListener('fieldChange', this.handleFieldChange.bind(this));
        document.addEventListener('attributeChange', this.handleAttributeChange.bind(this));
        document.addEventListener('saveChange', this.handleSaveChange.bind(this));
    }
};

export default Manager;
