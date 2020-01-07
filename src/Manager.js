/**
 * Manager:
 * Interface for save/backup/restore of data...
 */
import { generateCharacterKey, newCharacter, getCharacter, saveCharacter, removeCharacter, getCharacterCount, importCharacter, setLocalStoragePrefix } from './CharacterService.js';
import { default as Modal } from './Modal.js';
import { default as ShortCutKeys } from './ShortCutKeys.js';
import { default as Tabs} from './Tabs.js';

const Manager = {
    /** @prop {EventEmitter} */
    emitter: null,
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
        this.dialog_unsaved.hidden = true;
        this.cur_character = getCharacter(key);
        if (!this.cur_character) {
            this.cur_character = newCharacter(key);
        }
        this.renderCharacter();
        this.emitter.trigger('loaddialog:close');
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
                    case 'DL':
                        // clear list
                        while (el.firstChild) {
                            el.removeChild(el.firstChild);
                        }
                        let defItems = this.cur_character[f];
                        const template = document.getElementById('defListItem');
                        // Add in the saved items.
                        if (defItems.length > 0) {
                            defItems.forEach((i) => {
                                if (i.length === 0) {
                                    return;
                                }
                                const header = Array.isArray(i) ? i[0] : i;
                                const text = Array.isArray(i) ? i[1] : '';
                                const div = document.importNode(template.content, true);
                                if (header) {
                                    div.querySelector('dt').innerHTML = header;
                                }
                                if (text) {
                                    div.querySelector('dd').innerHTML = text;
                                }
                                el.insertBefore(div, null);
                            });
                        }
                        // add a blank one at the end
                        const div = document.importNode(template.content, true);
                        el.appendChild(div);
                        break;
                    case 'TABLE':
                        const columnCount = el.querySelectorAll('th').length;
                        const tbody = el.querySelector('tbody');
                        const row = document.createElement('tr');
                        const td = document.createElement('td');
                        td.setAttribute('contenteditable', 'true');

                        // clear table body
                        while (tbody.firstChild) {
                            tbody.removeChild(tbody.firstChild);
                        }
                        const rowItems = this.cur_character[f];
                        if (rowItems.length > 0) {
                            rowItems.forEach((item) => {
                                if (!Array.isArray(item)) {
                                    return;
                                }
                                const curRow = row.cloneNode(false);
                                item.forEach((cell) => {
                                    const curCell = td.cloneNode(false);
                                    curCell.innerHTML = cell;
                                    curRow.appendChild(curCell);
                                });
                                let emptyCells = columnCount - item.length;
                                while (emptyCells > 0) {
                                    const curCell = td.cloneNode(false);
                                    curRow.appendChild(curCell);
                                    emptyCells--;
                                }
                                tbody.appendChild(curRow);
                            });
                        }

                        for (let i = 1; i <= columnCount; i++) {
                            row.appendChild(td.cloneNode(false));
                        }
                        tbody.appendChild(row);
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
     * Save character data
     */
    saveCharacter: function () {
        if (this.cur_character === null) {
            alert('No character to save.');
            return;
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
                case 'DL':
                    const objects = [];
                    const pairs = Array.from(el.querySelectorAll('.defListPair'));
                    if (pairs.length === 0) {
                        break;
                    }
                    pairs.forEach((el) => {
                        const dt = el.querySelector('dt');
                        const dd = el.querySelector('dd');
                        if (!dt && !dd) {
                            return;
                        }
                        const header = dt ? dt.innerHTML : '';
                        const text = dd ? dd.innerHTML : '';
                        if (header === '' && text === '') {
                            return;
                        }
                        objects.push([header, text]);
                    });
                    this.cur_character[f] = objects;
                    break;
                case 'TABLE':
                    const entries = [];
                    const rows = Array.from(el.querySelectorAll('tbody tr'));
                    if (rows.length === 0) {
                        break;
                    }
                    rows.forEach((el) => {
                        const cells = Array.from(el.querySelectorAll('td'));
                        if (cells.length === 0) {
                            return;
                        }
                        const rowData = [];
                        cells.forEach((cell) => {
                            const text = cell.innerHTML;
                            rowData.push(text);
                        });
                        const filledCells = rowData.filter((el) => { return el !== ''; });
                        if (filledCells.length === 0) {
                            return;
                        }
                        entries.push(rowData);
                    });
                    this.cur_character[f] = entries;
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
            alert('Your character must have name to save!');
            return;
        }
        saveCharacter(this.cur_character, this.appname);
        this.dialog_unsaved.hidden = true;
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
     * Start up the app with some events and such
     * @param {Object} settings things we need to set external to this script
     * @param {EventEmitter} settings.emitter
     * @param {Object} settings.ui UI events.
     * @param {String} settings.prefix prefix for localStorage keys
     * @param {String} settings.appname used to identify the app property in a character model
     */
    initialize: function (settings) {
        if (!settings.emitter || !settings.ui || !settings.prefix || !settings.appname) {
            document.body.innerHTML = '<p>App is missing required settings.</p>';
            return;
        }
        this.emitter = settings.emitter;
        this.rules_ui = settings.ui;
        this.appname = settings.appname;
        // set up storage
        setLocalStoragePrefix(settings.prefix);
        // set up default alert
        this.alert = new Modal(document.getElementById('alert-main'));

        if (getCharacterCount() === 0) {
            this.showIntroDialog();
        }
        // set up all the rule specific ui events (attribute modifiers and the like)
        this.rules_ui.initialize();

        const mainTabs = new Tabs(document.querySelector('main > ul[role=tablist]'));
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
                    mainTabs.switchToPane(targetPane);
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

        this.dialog_unsaved.querySelector('.btn-save').addEventListener('click', (ev) => { this.emitter.trigger('character:save'); });
        this.dialog_undo.querySelector('.btn-delete-undo').addEventListener('click', (ev) => {
            this.undoDelete(ev);
        });

        // Listen for events, mostly from the menus.
        this.emitter.on('character:new', this.triggerNewCharacter, this);
        this.emitter.on('character:save', this.saveCharacter, this);
        this.emitter.on('character:delete:confirm', this.deletePrompt, this);
        this.emitter.on('backup:download', this.downloadBackup, this);
        this.emitter.on('backup:restore', this.restoreFormSubmit, this);
        this.emitter.on('tab:switch', mainTabs.switchToPane, mainTabs);
    }
};

export default Manager;
