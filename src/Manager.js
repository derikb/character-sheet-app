/**
 * Manager:
 * Interface for save/backup/restore of data...
 */
import { default as Storage } from './Storage.js';
import { default as Alert } from './Alert.js';

const Manager = {
    /** @prop {EventEmitter} */
    emitter: null,
    /**
     * App/rules/game specific character model and UI handling
     * @prop {Character5e}
     */
    Character: null,
    /**
     * App/rules/game specific UI handling
     */
    rules_ui: null,
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
     * Return UTC datetime string for right now
     * @return {String}
     */
    currentTimestamp: function () {
        const d = new Date();
        return d.toUTCString();
    },
    /**
     * Generate a random key for character storage
     * make sure key is not already existing
     * @return {String}
     */
    generateKey: function () {
        let key = (`${Math.random().toString(36)}00000000000000000`).slice(2, 9);
        while (Storage.get(key) !== '') {
            key = (`${Math.random().toString(36)}00000000000000000`).slice(2, 9);
        }
        return key;
    },
    /**
     * Start a new character by changing the hash.
     */
    newCharacter: function () {
        window.location.hash = `#${this.generateKey()}`;
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
     * @param {String} key character identifier...????
     */
    loadCharacter: function (key) {
        this.dialog_unsaved.hidden = true;
        const data = Storage.get(key);
        if (data === '') {
            this.cur_character = new this.Character({key});
            this.renderCharacter();
            return;
        }
        this.cur_character = new this.Character(data);
        this.renderCharacter();
        this.emitter.trigger('character:load');
    },
    /**
     * Take character data and fill it into the page
     */
    renderCharacter: function () {
        if (this.cur_character === null) { return; }
        const fields = Array.from(document.querySelectorAll('*[data-name]'));
        fields.forEach((el) => {
            const f = el.getAttribute('data-name');
            if (typeof this.cur_character[f] === 'undefined') {
                return;
            }
            const subf = el.getAttribute('data-subfield');
            if (subf !== null) {
                if (typeof this.cur_character[f][subf] === 'undefined') {
                    return;
                }
            }
            if (typeof this.cur_character[f] !== 'undefined') {
                switch (el.tagName) {
                    case 'INPUT':
                    case 'SELECT':
                    case 'TEXTAREA':
                        if (el.getAttribute('type') === 'checkbox') {
                            const checked = (subf) ? this.cur_character[f][subf] : this.cur_character[f];
                            if (checked === 1) {
                                el.checked = true;
                            } else {
                                el.checked = false;
                            }
                            break;
                        }
                        el.value = (subf) ? this.cur_character[f][subf] : this.cur_character[f];
                        const event = new Event('change');
                        el.dispatchEvent(event);
                        break;
                    case 'UL':
                        // clear list
                        while (el.firstChild) {
                            el.removeChild(el.firstChild);
                        }
                        let items = (subf) ? this.cur_character[f][subf] : this.cur_character[f];
                        if (!Array.isArray(items)) { items = items.split(/;|<br\/?>/); }
                        const li_blank = el.querySelector('li:empty');
                        if (items.length > 0) {
                            items.forEach((i) => {
                                if (i === '') { return; }
                                const li = document.createElement('li');
                                li.setAttribute('contenteditable', 'true');
                                li.innerHTML = i;
                                el.insertBefore(li, li_blank);
                            });
                        }
                        // add a blank one at the end
                        const li = document.createElement('li');
                        li.setAttribute('contenteditable', 'true');
                        el.appendChild(li);
                        break;
                    default:
                        el.innerHTML = (subf) ? this.cur_character[f][subf] : this.cur_character[f];
                        const event2 = new Event('blur');
                        el.dispatchEvent(event2);
                        break;
                }
            }
        });
        // Update proficiency/attr/save/skill modifiers
        this.rules_ui.postRender();
    },
    /**
     * Save character data to localStorage
     */
    saveCharacter: function () {
        if (this.cur_character === null) {
            this.cur_character = new this.Character({});
        }
        const fields = Array.from(document.querySelectorAll('*[data-name]'));
        fields.forEach((el) => {
            const f = el.getAttribute('data-name');
            if (typeof this.cur_character[f] === 'undefined') {
                return;
            }
            const subf = el.getAttribute('data-subfield');
            if (subf !== null) {
                if (typeof this.cur_character[f][subf] === 'undefined') {
                    return;
                }
            }
            switch (el.tagName) {
                case 'INPUT':
                case 'SELECT':
                case 'TEXTAREA':
                    if (el.getAttribute('type') === 'checkbox') {
                        const checked = el.checked ? 1 : 0;
                        if (subf) {
                            this.cur_character[f][subf] = checked;
                        } else {
                            this.cur_character[f] = checked;
                        }
                        break;
                    }
                    if (subf) {
                        this.cur_character[f][subf] = el.value;
                    } else {
                        this.cur_character[f] = el.value;
                    }
                    break;
                case 'UL':
                    const items = [];
                    const lis = Array.from(el.querySelectorAll('li'));
                    if (lis.length > 0) {
                        lis.forEach((li) => {
                            const val = li.innerHTML;
                            if (val === '') { return; }
                            items.push(val);
                        });
                    }
                    if (subf) {
                        this.cur_character[f][subf] = items;
                    } else {
                        this.cur_character[f] = items;
                    }
                    break;
                default:
                    if (subf) {
                        this.cur_character[f][subf] = el.innerHTML;
                    } else {
                        this.cur_character[f] = el.innerHTML;
                    }
                    break;
            }
        });
        if (this.cur_character.charname === '') {
            const p = document.createElement('p');
            p.innerHTML = 'Your character must have name to save!';
            Alert.setContent(p);
            return;
        }
        // update saved timestamp
        this.cur_character.updated = this.currentTimestamp();
        // make sure app name is set
        this.cur_character.app = this.appname;
        Storage.set(this.cur_character.key, this.cur_character);
        this.dialog_unsaved.hidden = true;
        this.emitter.trigger('loadmenu:add', this.cur_character);
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
            const char_obj = Storage.get(ch.value);
            data.push(char_obj);
            names.push(char_obj.charname);
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
            const a = document.createElement('a');
            a.href = url;
            a.innerHTML = 'Open new message in default email client';
            a.addEventListener('click', (e) => {
                this.emitter.trigger('backup:close');
            });
            this.emitter.trigger('backup:email', a);
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
        this.emitter.trigger('backup:close');
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
                // is it a char object for this app
                if (typeof char_obj !== 'object' || !char_obj.key || char_obj.app !== this.appname) {
                    throw new Error(`Data appears to be invalid. Try removing any text that isn't part of the backup (i.e. email introduction).`);
                }
                // do we have this char key already
                const ex_char = Storage.get(char_obj.key);
                if (ex_char !== '' && ex_char.charname !== '' && ex_char.charname !== char_obj.charname) {
                    // existing key but different name
                    if (!char_obj.key_prev) {
                        char_obj.key_prev = char_obj.key;
                        char_obj.key = this.generateKey();
                    } else {
                        const temp_key = char_obj.key_prev;
                        char_obj.key_prev = char_obj.key;
                        char_obj.key = temp_key;
                    }
                }
                Storage.set(char_obj.key, char_obj);
                this.emitter.trigger('loadmenu:add', char_obj);
                // if its the current character we should reload them
                if (char_obj.key === this.cur_character.key) {
                    this.loadCharacter(char_obj.key);
                }
                const li = document.createElement('li');
                li.textContent = `${char_obj.charname} has been added. `;
                const a = document.createElement('a');
                a.setAttribute('href', `#${char_obj.key}`);
                a.textContent = 'View character now.';
                a.addEventListener('click', (e) => {
                    Alert.clear();
                });
                li.appendChild(a);
                imported_chars.push(li);
            });

            const ul = document.createElement('ul');
            imported_chars.forEach((li) => {
                ul.appendChild(li);
            });
            Alert.setContent(ul);
        } catch (e) {
            const p = document.createElement('p');
            p.innerHTML = `Error processing backup data: ${e.message}`;
            Alert.setContent(p);
        }
    },
    /**
     * Prompt to confirm deletion of character
     * @param {String} key character key
     */
    deletePrompt: function (key) {
        const data = Storage.get(key);
        if (data === '') {
            return;
        }
        if (!confirm(`Are you sure you want to delete the character: ${(data.charname) ? data.charname : '[Unnamed]'}`)) {
            return;
        }
        this.deleteCharacter(key);
    },
    /**
     * Delete a character from local storage
     * @param {String} key character key
     */
    deleteCharacter: function (key) {
        if (key === '' || key === 'settings') { return; }
        Storage.remove(key);
        if (Storage.get(key) !== '') {
            // error
            const p = document.createElement('p');
            p.innerHTML = `Error deleting the character...`;
            Alert.setContent(p);
        } else {
            // success
            // remove from load list
            this.emitter.trigger('loadmenu:remove', key);

            // if its the current character we should trigger "new character" action
            if (this.cur_character !== null && this.cur_character.key === key) {
                window.location.hash = `#${Manager.generateKey()}`;
            }
        }
    },
    /**
     * If no characters are saved we show an app intro dialog
     */
    showIntroDialog: function () {
        var template = document.getElementById('introAlert');
        Alert.setContent(document.importNode(template.content, true));
    },
    /**
     * Start up the app with some events and such
     * @param {Object} settings things we need to set external to this script
     * @param {EventEmitter} settings.emitter
     * @param {Object} settings.model 5e character model.
     * @param {Object} settings.ui UI events.
     * @param {String} settings.prefix prefix for localStorage keys
     * @param {String} settings.appname used to identify the app property in a character model
     */
    initialize: function (settings) {
        if (!settings.emitter || !settings.model || !settings.ui || !settings.prefix || !settings.appname) {
            document.body.innerHTML = '<p>App is missing required settings.</p>';
            return;
        }
        this.emitter = settings.emitter;
        this.Character = settings.model;
        this.rules_ui = settings.ui;
        this.appname = settings.appname;
        // set up storage
        Storage.setPrefix(settings.prefix);
        // set up default Alert
        Alert.initialize();

        let charCount = 0;
        Storage.getAllKeys().forEach((key) => {
            const char_obj = Storage.get(key);
            this.emitter.trigger('loadmenu:add', char_obj);
            charCount++;
        });

        if (charCount === 0) {
            this.showIntroDialog();
        }
        // set up all the rule specific ui events (attribute modifiers and the like)
        this.rules_ui.initialize();

        document.querySelector('nav').addEventListener('click', (e) => {
            if (e.target.tagName === 'A') {
                e.preventDefault();
                const target_id = e.target.getAttribute('href').substring(1);
                document.getElementById(target_id).scrollIntoView();
            }
        });

        // Event: Listen for hashchange and change the current character
        window.addEventListener('hashchange', (e) => { this.changeCharacter(); }, false);

        // Check the hash to see if we need to load a specific character
        const urlhash = window.location.hash.substr(1);
        if (urlhash !== '') {
            this.loadCharacter(urlhash);
        } else {
            this.newCharacter();
        }

        // Listen for events, mostly from the menus.
        this.emitter.on('character:new', this.newCharacter, this);
        this.emitter.on('character:save', this.saveCharacter, this);
        this.emitter.on('character:delete:confirm', this.deletePrompt, this);
        this.emitter.on('backup:download', this.downloadBackup, this);
        this.emitter.on('backup:restore', this.restoreFormSubmit, this);
    }
};

export default Manager;
