/**
 * Manager:
 * Interface for save/backup/restore of data...
 */
import { generateCharacterKey, getCharacter, removeCharacterLocal, importCharacter, setLocalStoragePrefix, setCurrentCharacter, saveCurrentCharacter, getCurrentCharacterKey, getSheetView, getAllCharactersLocal } from '../services/CharacterService.js';
import ShortCutKeys from './ShortCutKeys.js';
import { monitorAuth } from '../services/AuthService.js';

const Manager = {
    /** @prop {EventEmitter} */
    emitter: null,
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
     * Start a new character and change the hash.
     */
    triggerNewCharacter: function (char_type = '') {
        const key = generateCharacterKey();
        this.loadCharacter(key, char_type)
            .then(() => {
                window.location.hash = `#${key}`;
            })
            .catch((err) => {
                console.log(err);
            });
    },
    /**
     * Change the character based on a hash change
     * or maybe I should process the event in the handler and pass it here if necessary...
     */
    changeCharacter: function () {
        const urlhash = window.location.hash.substring(1);
        // No need if the character is already loaded.
        const cur_character_key = getCurrentCharacterKey();
        if (cur_character_key && urlhash === cur_character_key) {
            return;
        }
        this.loadCharacter(urlhash);
    },
    /**
     * Load character data based on a key
     * @param {String} key Character identifier
     * @param {String} char_type Character class type.
     */
    loadCharacter: async function (key, char_type = '') {
        this.hideUnsavedDialog();
        // Set character or creates one.
        const cur_character = setCurrentCharacter(key, char_type, true);
        cur_character.emitter = this.emitter;
        // Load up correct view
        const sheetView = getSheetView(cur_character, this.emitter);
        document.querySelector('main').innerHTML = '';
        document.querySelector('main').appendChild(
            sheetView
        );
        sheetView.character = cur_character;
        this.emitter.trigger('loaddialog:close');
        this.emitter.trigger('newdialog:close');
    },
    /**
     * Save character data
     */
    saveCharacter: function () {
        // For fields saved on blur we need to trigger it on the active field.
        // Fields that save on change will already have saved.
        if (document.activeElement) {
            const event = new Event('blur');
            document.activeElement.dispatchEvent(event);
        }
        try {
            saveCurrentCharacter();
        } catch (e) {
            this.emitter.trigger('error:display', e.message);
            return;
        }
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
                reader.onload = (() => {
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
            let reloadCurrentChar = false;
            const currentCharKey = getCurrentCharacterKey();
            backups.forEach((char_obj) => {
                const newCharacter = importCharacter(char_obj);
                // if its the current character we should reload them
                if (newCharacter.key === currentCharKey) {
                    reloadCurrentChar = true;
                }
                const li = document.createElement('li');
                li.textContent = `${newCharacter.charname} has been added. `;
                const a = document.createElement('a');
                a.setAttribute('href', `#${newCharacter.key}`);
                a.textContent = 'View character now.';
                a.addEventListener('click', () => {
                    this.alert.closeClear();
                });
                li.appendChild(a);
                imported_chars.push(li);
            });

            const ul = document.createElement('ul');
            imported_chars.forEach((li) => {
                ul.appendChild(li);
            });
            this.alert.header = 'Restored Characters';
            this.alert.setContent([ul]);
            this.alert.open();

            if (reloadCurrentChar) {
                this.loadCharacter(currentCharKey).catch((error) => {
                    console.log(error);
                });
            }
        } catch (e) {
            alert(`Error processing backup data: ${e.message}`);
        }
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
        if (getCurrentCharacterKey() === key) {
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
        removeCharacterLocal(key);
        this.dialog_undo.querySelector('button').dataset.key = '';
        this.dialog_undo.hidden = true;
        // This will reset the transition bar.
        const timeoutIndicator = this.dialog_undo.querySelector('.delete-timeout');
        timeoutIndicator.classList.remove('transition', 'timeout');
    },
    /**
     * Remove the timeout and stop the delete from happening.
     * @param {Event} ev Undo button click.
     */
    undoDelete: function (ev) {
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
        const template = document.getElementById('introAlert');
        this.alert.setContent([...document.importNode(template.content, true).children]);
        this.alert.open();
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
    hideUnsavedDialog: function () {
        this.dialog_unsaved.hidden = true;
    },
    /**
     * Show an error message.
     * @param {String} error
     */
    showErrorMessage: function (error) {
        // Blah, for now just keep it simple and obvious.
        alert(error);
    },
    /**
     * Start up the app with some events and such
     * @param {Object} settings things we need to set external to this script
     * @param {EventEmitter} settings.emitter
     * @param {String} settings.prefix prefix for localStorage keys
     * @param {String} settings.appname used to identify the app property in a character model
     */
    initialize: function ({
        emitter = null,
        prefix = '',
        appname = ''
    }) {
        if (!emitter || !prefix || !appname) {
            document.body.innerHTML = '<p>App is missing required settings.</p>';
            return;
        }
        this.emitter = emitter;
        // Set this up first.
        this.emitter.on('error:display', this.showErrorMessage, this);

        this.appname = appname;
        // set up storage
        setLocalStoragePrefix(prefix);
        // set up default alert
        this.alert = document.getElementById('alert-main');

        monitorAuth(this.emitter);

        const shortCuts = new ShortCutKeys(this.emitter);
        shortCuts.addShortCut('Ctrl+Shift+ArrowDown', 'character:save');
        shortCuts.addShortCut('Ctrl+Shift+ArrowRight', 'tab:switch');
        shortCuts.addShortCut('Ctrl+Shift+ArrowLeft', 'tab:switch');
        shortCuts.addShortCut('Ctrl+Shift+ArrowUp', 'loaddialog:toggle');

        document.querySelector('.btn-help').addEventListener('click', (ev) => {
            ev.preventDefault();
            const template = document.getElementById('helpDialog');
            const div = document.importNode(template.content, true);
            this.alert.setContent([...div.children]);
            this.alert.open();
        });

        // Event: Listen for hashchange and change the current character
        window.addEventListener('hashchange', () => { this.changeCharacter(); }, false);

        this.dialog_unsaved.querySelector('.btn-save').addEventListener('click', () => {
            this.emitter.trigger('character:save');
        });
        this.dialog_undo.querySelector('.btn-delete-undo').addEventListener('click', (ev) => {
            this.undoDelete(ev);
        });

        // Listen for events, mostly from the menus.
        this.emitter.on('character:new', this.triggerNewCharacter, this);
        this.emitter.on('character:save', this.saveCharacter, this);
        this.emitter.on('character:delete', this.deleteCharacterTemp, this);
        this.emitter.on('backup:download', this.downloadBackup, this);
        this.emitter.on('backup:restore', this.restoreFormSubmit, this);
        this.emitter.on('dialog:save:show', this.showUnsavedDialog, this);
        this.emitter.on('dialog:save:hide', this.hideUnsavedDialog, this);

        // Check the hash to see if we need to load a specific character
        const urlhash = window.location.hash.substring(1);
        if (urlhash !== '') {
            this.loadCharacter(urlhash).catch((error) => {
                console.log(error);
            });
        } else {
            // Show intro if they have no characters, since they might be new to this...
            if (getAllCharactersLocal().length === 0) {
                this.showIntroDialog();
            }
            this.triggerNewCharacter();
        }
    }
};

export default Manager;
