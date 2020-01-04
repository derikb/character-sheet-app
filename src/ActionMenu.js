/** Menus */
import { default as Modal } from './Modal.js';
import { default as Storage } from './Storage.js';

/**
 * Load Menu
 */
const LoadMenu = {
    /**
     * @prop {HTMLELement}
     */
    el: document.querySelector('#character_list'),
    /**
     * Toggle menu
     */
    toggle: function () {
        this.el.classList.toggle('open');
        if (this.el.classList.contains('open')) {
            this.el.focus();
        } else {
            this.el.parentNode.querySelector('*[tabindex="-1"], a, button').focus();
        }
    },
    /**
     * Close menu
     */
    close: function () {
        this.el.classList.remove('open');
    },
    /**
     * Add character to list
     * @param {Object} char_obj Character object or JSON string
     */
    addCharacter: function (char_obj) {
        if (typeof char_obj === 'undefined' || char_obj === '') {
            return;
        }
        try {
            if (char_obj.key && char_obj.key !== '') {
                // check if it's already there
                const existing = this.el.querySelector(`a[href="#${char_obj.key}"]`);
                if (existing !== null) {
                    // update the text as appropriate
                    existing.textContent = `${char_obj.charname} (${char_obj.charclass} ${char_obj.level})`;
                    return;
                }
                const li = document.createElement('li');
                const a = document.createElement('a');
                a.textContent = `${char_obj.charname} (${char_obj.charclass} ${char_obj.level})`;
                a.setAttribute('href', `#${char_obj.key}`);
                li.appendChild(a);
                const del = document.createElement('a');
                del.classList.add('delete');
                del.innerHTML = '❌';
                del.setAttribute('href', '#');
                del.setAttribute('data-key', char_obj.key);
                li.appendChild(del);
                this.el.querySelector('#saved_characters').appendChild(li);
            }
        } catch (e) {
            console.log(e.message);
        }
    },
    /**
     * Remove character from list
     * @param {String} key
     */
    removeCharacter: function (key) {
        const loadlink = this.el.querySelector(`a[href="#${key}"]`);
        const li = loadlink.parentNode;
        li.parentNode.removeChild(li);
    },
    /**
     * Do we have any saved characters here?
     * @return {Boolean}
     */
    isEmpty: function () {
        return this.el.querySelector('li') === null;
    }
};


/**
 * Menu and associated action events
 */
const ActionMenu = {
    /**
     * @prop {HTMLELement} Menu element
     */
    el: null,
    /**
     * @prop {HTMLELement} Menu open button
     */
    opener: null,
    /**
     * @prop {Modal} Modal for Backup save.
     */
    downloadDialog: null,
    /**
     * @prop {Modal} Modal for Backup restore.
     */
    restoreDialog: null,
    /**
     * Add character to load menu.
     * @param {Character5e} character
     */
    addCharacter: function (character) {
        LoadMenu.addCharacter(character);
    },
    /**
     * Remove character from load menu.
     * @param {String} key
     */
    removeCharacter: function (key) {
        LoadMenu.removeCharacter(key);
    },
    /**
     * Are there any existing characters saved.
     */
    hasCharacters: function () {
        return !LoadMenu.isEmpty();
    },
    /**
     * Close any associated menus/alerts/etc.
     */
    close: function () {
        LoadMenu.close();
    },
    /**
     * Show the dialog for backing up characters.
     * Else close it if its open.
     */
    openDownloadForm: function() {
        this.downloadDialog = this.downloadDialog || new Modal(document.getElementById('dialog-backup'));
        this.downloadDialog.clear();
        if (this.downloadDialog.isOpen) {
            this.downloadDialog.close();
            return;
        }
        const template = document.getElementById('backupModal');
        const form = document.importNode(template.content, true);

        const checkboxes = [];
        Storage.getAllKeys().forEach((key) => {
            const char_obj = Storage.get(key);
            if (!char_obj.key) { return; }
            const li = `<li><label><input type="checkbox" name="${char_obj.key}" value="${char_obj.key}" /> ${char_obj.charname} (${char_obj.charclass} ${char_obj.level})</label></li>`;
            checkboxes.push(li);
        });
        form.querySelector('.character_downloads').innerHTML = checkboxes.join('');
        this.downloadDialog.el.appendChild(form);
        this.downloadDialog.el.querySelector('form').addEventListener('submit', (ev) => {
            ev.preventDefault();
            this.emitter.trigger('backup:download', ev.target);
        });
        this.downloadDialog.open();
    },
    /**
     * Show the back up restore form.
     * Else close it if its open.
     */
    openRestoreForm: function() {
        this.restoreDialog = this.restoreDialog || new Modal(document.getElementById('dialog-restore'));
        this.restoreDialog.clear();
        if (this.restoreDialog.isOpen) {
            this.restoreDialog.close();
            return;
        }
        const template = document.getElementById('restoreModal');
        const form = document.importNode(template.content, true);
        this.restoreDialog.setContent([form], false);
        this.restoreDialog.el.querySelector('form').addEventListener('submit', (ev) => {
            ev.preventDefault();
            this.emitter.trigger('backup:restore', ev.target);
            this.restoreDialog.closeClear();
        });
    },
    /**
     * If file download is unavailable show the data to copy/paste
     * @param {String} data the backup data
     */
    altDownload: function (data) {
        const p = document.createElement('p');
        p.innerHTML = `Your current browser/os does not support direct file downloads, so here is the data for you to copy/paste.`;
        const text = document.createElement('textarea');
        text.classList.add('large');
        text.value = data;
        this.downloadDialog.clear();
        this.downloadDialog.setContent([p, text, this.downloadDialog.getCloseButton()], false);
        text.focus();
        text.select();
    },
    /**
     * Show email download link.
     * @param {String} url The email url
     */
    emailDownload: function (url) {
        const a = document.createElement('a');
        a.href = url;
        a.setAttribute('target', '_blank');
        a.innerHTML = 'Open new message in default email client';
        a.addEventListener('click', () => {
            this.closeClear();
        });
        const p = document.createElement('p');
        p.appendChild(a);
        this.downloadDialog.clear();
        this.downloadDialog.setContent([p, this.downloadDialog.getCloseButton()], false);
        this.downloadDialog.focusFirst();
    },
    /**
     * Add event handlers, etc.
     * @param {EventEmitter} emitter
     */
    initialize: function (emitter) {
        this.emitter = emitter;
        this.el = document.querySelector('.app-actions');
        this.opener = document.querySelector('.btn-open-actions');
        // opener click handler
        this.opener.addEventListener('click', (e) => {
            if (this.el.classList.contains('open')) {
                // set menu to hide overflow BEFORE it closes
                this.el.style.overflow = 'hidden';
            }
            this.el.classList.toggle('open');
        });
        // When the menu transitions to open we want to set overflow to visible so the Load dropdown can be visible
        this.el.addEventListener('transitionend', (e) => {
            const style = window.getComputedStyle(this.el);
            if (style.getPropertyValue('max-height') !== '0px') {
                this.el.style.overflow = 'visible';
            }
        });

        // event handlers for all the menu buttons
        const action_btn_backup = this.el.querySelector('.btn-backup');
        action_btn_backup.addEventListener('click', (e) => {
            this.openDownloadForm();
        });
        const action_btn_save = this.el.querySelector('.btn-save');
        action_btn_save.addEventListener('click', (e) => {
            this.emitter.trigger('character:save');
        });
        const action_btn_new = this.el.querySelector('.btn-new-character');
        action_btn_new.addEventListener('click', (e) => {
            this.emitter.trigger('character:new');
        });
        const action_btn_restore = this.el.querySelector('.btn-restore-backup');
        action_btn_restore.addEventListener('click', (e) => {
            this.openRestoreForm();
        });
        const action_btn_load = this.el.querySelector('.btn-load');
        action_btn_load.addEventListener('click', (e) => {
            LoadMenu.toggle();
        });

        this.el.addEventListener('click', (ev) => {
            const link = ev.target.closest('a');
            if (link === null) {
                return;
            }
            if (link.classList.contains('delete')) {
                ev.preventDefault();
                this.emitter.trigger('character:delete:confirm', ev.target.getAttribute('data-key'));
                this.close();
            }
        });

        this.emitter.on('loadmenu:add', this.addCharacter, this);
        this.emitter.on('loadmenu:remove', this.removeCharacter, this);
        this.emitter.on('character:load', this.close, this);
        this.emitter.on('loadmenu:toggle', LoadMenu.toggle, LoadMenu);
        this.emitter.on('backup:email',  this.emailDownload, this);
        this.emitter.on('backup:textpaste',  this.altDownload, this);
;    }
};

export default ActionMenu;
