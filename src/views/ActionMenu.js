/**
 * Action Toolbar
 * Also requires the Modal component.
 */
import { getAllCharactersLocal, getCurrentCharacterKey, getGameOptions } from '../services/CharacterService.js';
import ConfirmButton from '../components/ConfirmButton.js';
import SyncInfo from '../components/SyncInfo.js';
import { isAuthed, signIn, signOut } from '../services/AuthService.js';
import { getCharacterMatchings } from '../services/syncService.js';

/**
 * Buttons in the toolbar.
 * Mostly in re focus management and keyboard events.
 */
class ActionButton {
    /**
     * @param {HTMLElement} el Button element.
     * @param {ActionMenu} menu
     */
    constructor (el, menu) {
        this.el = el;
        this.menu = menu;
        this.action = el.dataset.action || '';
        this.el.addEventListener('keydown', this.handleKeyBoardEvent.bind(this));
        this.el.addEventListener('click', this.menu.setTabFocusToButton.bind(this.menu, this));
    }
    /**
     * Handler: Keyboard actions.
     * @param {KeyboardEvent} ev Keydown event.
     */
    handleKeyBoardEvent (ev) {
        // Stop if any other modifer keys are pressed.
        if (ev.shiftKey || ev.ctrlKey || ev.metaKey || ev.altKey) {
            return;
        }
        if (ev.key === 'ArrowRight') {
            this.removeTabFocus();
            this.menu.setFocusToNext(this);
            return;
        }
        if (ev.key === 'ArrowLeft') {
            this.removeTabFocus();
            this.menu.setFocusToPrevious(this);
            return;
        }
        if (ev.key === 'Home') {
            this.removeTabFocus();
            this.menu.setFocusToFirst();
            return;
        }
        if (ev.key === 'End') {
            this.removeTabFocus();
            this.menu.setFocusToLast();
        }
    }

    isFocusable () {
        return this.el.getAttribute('tabindex') > -1;
    }

    isVisible () {
        return !!(this.el.offsetWidth || this.el.offsetHeight || this.el.getClientRects().length);
    }
    /**
     * Set button to not be tabbable.
     */
    removeTabFocus () {
        this.el.setAttribute('tabindex', '-1');
    }
    /**
     * Set button to be tabbable.
     */
    setTabFocus () {
        this.el.setAttribute('tabindex', '0');
    }
    /**
     * Focus on this button.
     */
    focus () {
        this.el.focus();
    }
    /**
     * Switch to this button. Set its tabindex and focus.
     * @param {Boolean} forward
     */
    switchTo (forward = true) {
        if (!this.isVisible()) {
            if (forward) {
                this.menu.setFocusToNext(this);
            } else {
                this.menu.setFocusToPrevious(this);
            }
        }
        this.setTabFocus();
        this.focus();
    }
}

/**
 * Toolbar and associated action events or dialogs.
 */
const template = document.createElement('template');
template.innerHTML = `
<link rel="stylesheet" href="./styles.css">
<style>
:host {
    position: relative;
    display: flex;
    padding-top: .5rem;
}
:host button {
    margin-right: 1rem;
}

:host .more-action-contain {
    position: relative;
}

:host .more-actions.closed {
    display: none;
}

:host .more-actions {
    display: block;
    position: absolute;
    right: 0;
    display: flex;
    flex-direction: column;
    background-color: white;
    padding: 1rem;
    border-radius: 1rem;
    z-index: 10;
}
:host .more-actions button {
    margin-right: 0;
}

/* Larger than phone screen */
@media (min-width: 50.0rem) {
    :host .btn-more {
        display: none;
    }
    :host .more-actions {
        position: relative;
        background-color: transparent;
        padding: 0;
        display: inline-block;
        z-index: 0;
    }
    :host .more-actions.closed {
        display: block;
    }
    :host .more-actions button {
        margin-right: 1rem;
    }
}

@media print {
    :host {
        display: none;
    }
}
</style>
<button type="button" class="btn-save" data-action="save" tabindex="0">Save</button>
    <button type="button" class="btn-load btn-dialog" data-action="load" tabindex="-1">Load</button>
    <button class="btn-new-character btn-dialog" data-action="new" tabindex="-1">New</button>
    <div class="more-action-contain">
        <button type="button" class="btn-more" data-action="more">More</button>
        <div class="more-actions closed">
            <button type="button" class="btn-backup btn-dialog" data-action="backup" tabindex="-1">Backup</button>
            <button type="button" class="btn-restore-backup btn-dialog" data-action="restore" tabindex="-1">Restore</button>
            <button type="button" class="btn-delete btn-dialog" data-action="delete" tabindex="-1">Delete</button>
            <button type="button" class="btn-auth btn-dialog hidden" data-action="auth" tabindex="-1">Login</button>
        </div>
    </div>

`;

/**
* @prop {Array} Matching action button classes to methods to calls.
*/
const buttonActions = {
    save: '_saveCharacter',
    load: '_openLoadModal',
    new: '_newCharacterModal',
    backup: '_openDownloadForm',
    restore: '_openRestoreForm',
    delete: '_openDeleteModal',
    auth: '_openAuthDialog',
    more: '_showMore'
};
class ActionMenu extends HTMLElement {
    constructor () {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.setAttribute('role', 'toolbar');
        this.setAttribute('aria-label', 'Character Actions');
        this.setAttribute('tabindex', 0);
        /**
         * @prop {ActionButton[]}
         */
        this.buttons = [];
        /**
         * @prop {HTMLELement} Menu toogle button when menu is collapsed on narrow screens.
         */
        this.opener = null;
        /**
         * @prop {Modal} Modal for new menu.
         */
        this.newDialog = null;
        /**
         * @prop {Modal} Modal for load menu.
         */
        this.loadDialog = null;
        /**
         * @prop {Modal} Modal for Backup save.
         */
        this.downloadDialog = null;
        /**
         * @prop {Modal} Modal for Backup restore.
         */
        this.restoreDialog = null;
        /**
         * @prop {Modal} authDialog
         */
        this.authDialog = null;
        /**
         * @prop {Modal} syncDialog
         */
        this.syncDialog = null;
    }

    connectedCallback () {
        this.addEventListener('focus', this.focus.bind(this));

        const buttons = this.shadowRoot.querySelectorAll('button');
        Array.prototype.forEach.call(buttons, (btn) => {
            this.buttons.push(new ActionButton(btn, this));
        });
        // event handlers for all the menu buttons
        this.shadowRoot.addEventListener('click', this._handleClicks.bind(this));
    }

    disconnectedCallback () {
        this.shadowRoot.removeEventListener('click', this._handleClicks.bind(this));
        if (this.emitter) {
            this.emitter.off('newdialog:close', this._closeNewModal, this);
            this.emitter.off('loaddialog:close', this._closeLoadModal, this);
            this.emitter.off('loaddialog:toggle', this._openLoadModal, this);
            this.emitter.off('backup:email', this._emailDownload, this);
            this.emitter.off('backup:textpaste', this._altDownload, this);
            this.emitter.off('auth:enabled', this._showAuth, this);
            this.emitter.off('auth:signin', this._signedIn, this);
            this.emitter.off('auth:signout', this._signedOut, this);
        }
    }

    setEmitter (emitter) {
        this.emitter = emitter;
        this.emitter.on('newdialog:close', this._closeNewModal, this);
        this.emitter.on('loaddialog:close', this._closeLoadModal, this);
        this.emitter.on('loaddialog:toggle', this._openLoadModal, this);
        this.emitter.on('backup:email', this._emailDownload, this);
        this.emitter.on('backup:textpaste', this._altDownload, this);
        this.emitter.on('auth:enabled', this._showAuth, this);
        this.emitter.on('auth:signin', this._signedIn, this);
        this.emitter.on('auth:signout', this._signedOut, this);
    }

    _handleClicks (ev) {
        const target = ev.target.closest('button');
        const button = this.buttons.find((btn) => { return btn.el === target; });
        if (!button) {
            return;
        }
        const action = buttonActions[button.action] || null;
        if (!action) {
            return;
        }
        this[action](button);
    }

    _openAuthDialog () {
        this.authDialog = this.authDialog || document.getElementById('dialog-auth');
        this.authDialog.clear();
        if (this.authDialog.isOpen) {
            this.authDialog.close();
            return;
        }
        let template = null;

        if (isAuthed()) {
            template = document.getElementById('authSignOutModal');
        } else {
            template = document.getElementById('authSignInModal');
        }
        this.authDialog.setContent([...document.importNode(template.content, true).children]);
        if (isAuthed()) {
            this.authDialog.querySelector('#signOut').addEventListener('click', () => {
                signOut();
            });
            this.authDialog.querySelector('#syncData').addEventListener('click', () => {
                this._openSyncModal();
                this.authDialog.close();
            });
        } else {
            this.authDialog.querySelector('#googleSignIn').addEventListener('click', () => {
                signIn();
            });
        }
        this.authDialog.open();
    }
    /**
     * Open the character sync modal.
     */
    _openSyncModal () {
        this.syncDialog = this.syncDialog || document.getElementById('dialog-sync');
        this.syncDialog.clear();
        if (this.syncDialog.isOpen) {
            this.syncDialog.close();
            return;
        }
        const template = document.getElementById('syncModal');
        this.syncDialog.setContent([...document.importNode(template.content, true).children]);

        const currentCharKey = getCurrentCharacterKey();

        getCharacterMatchings().then((matches) => {
            const frag = document.createDocumentFragment();
            matches.forEach((match) => {
                const info = new SyncInfo();
                info.setData(match);
                // Not all actions are allowed for the current character.
                if (info.key === currentCharKey) {
                    info.isCurrentCharacter = true;
                }
                frag.appendChild(info);
            });
            this.syncDialog.querySelector('#characterSyncList').appendChild(frag);
            this.syncDialog.open();
        })
            .catch((error) => {
                console.log(error);
            });
    }
    /**
     * Show the dialog for backing up characters.
     * Else close it if its open.
     */
    _openDownloadForm () {
        this.downloadDialog = this.downloadDialog || document.getElementById('dialog-backup');
        this.downloadDialog.clear();
        if (this.downloadDialog.isOpen) {
            this.downloadDialog.close();
            return;
        }
        const template = document.getElementById('backupModal');
        const form = document.importNode(template.content, true);

        const checkboxes = [];
        getAllCharactersLocal().forEach((char) => {
            const li = `<li><label><input type="checkbox" name="${char.key}" value="${char.key}" /> ${char.summaryHeader}</label></li>`;
            checkboxes.push(li);
        });
        form.querySelector('.character_downloads').innerHTML = checkboxes.join('');
        this.downloadDialog.setContent([...form.children], false);
        this.downloadDialog.querySelector('form').addEventListener('submit', (ev) => {
            ev.preventDefault();
            this.emitter.trigger('backup:download', ev.target);
        });
        this.downloadDialog.open();
    }
    /**
     * Show the back up restore form.
     * Else close it if its open.
     */
    _openRestoreForm () {
        this.restoreDialog = this.restoreDialog || document.getElementById('dialog-restore');
        this.restoreDialog.clear();
        if (this.restoreDialog.isOpen) {
            this.restoreDialog.close();
            return;
        }
        const template = document.getElementById('restoreModal');
        const form = document.importNode(template.content, true);
        this.restoreDialog.setContent([...form.children], false);
        this.restoreDialog.querySelector('form').addEventListener('submit', (ev) => {
            ev.preventDefault();
            this.emitter.trigger('backup:restore', ev.target);
            this.restoreDialog.closeClear();
        });
        this.restoreDialog.open();
    }
    /**
     * If file download is unavailable show the data to copy/paste
     * @param {String} data the backup data
     */
    _altDownload (data) {
        const p = document.createElement('p');
        p.innerHTML = `Your current browser/os does not support direct file downloads, so here is the data for you to copy/paste.`;
        const text = document.createElement('textarea');
        text.classList.add('large');
        text.value = data;
        this.downloadDialog.clear();
        this.downloadDialog.header = 'Alernate Download Option';
        this.downloadDialog.setContent([p, text, this.downloadDialog.getCloseButton()], false);
        this.downloadDialog.open();
    }
    /**
     * Show email download link.
     * @param {String} url The email url
     */
    _emailDownload (url) {
        const a = document.createElement('a');
        a.href = url;
        a.setAttribute('target', '_blank');
        a.innerHTML = 'Open new message in default email client';
        a.addEventListener('click', () => {
            this.downloadDialog.closeClear();
        });
        const p = document.createElement('p');
        p.appendChild(a);
        this.downloadDialog.clear();
        this.downloadDialog.setContent([p, this.downloadDialog.getCloseButton()], false);
        this.downloadDialog.open();
    }
    /**
     * Trigger a save character event.
     */
    _saveCharacter () {
        this.emitter.trigger('character:save');
    }
    /**
     * Open the new character modal.
     */
    _newCharacterModal () {
        this.newDialog = this.newDialog || document.getElementById('dialog-new');
        this.newDialog.clear();
        if (this.newDialog.isOpen) {
            this.newDialog.close();
            return;
        }

        // Are there unsaved changes
        // This could be done better in the future if we had some kind of central state management.
        let currentlyUnsaved = false;
        // is the unsaved dialog showing...
        const unsavedDialog = document.querySelector('.alert-unsaved');
        if (unsavedDialog && !unsavedDialog.hidden) {
            currentlyUnsaved = true;
        }

        const template = document.getElementById('createModal');
        const content = document.importNode(template.content, true);

        if (currentlyUnsaved) {
            const alert = document.createElement('p');
            alert.classList.add('alert');
            alert.innerHTML = '<strong>Warning:</strong> You have unsaved changes.';
            content.querySelector('form').prepend(alert);
        }

        const select = content.querySelector('select');
        getGameOptions().forEach((char_type) => {
            const option = document.createElement('option');
            option.value = char_type;
            option.innerText = char_type;
            select.appendChild(option);
        });
        this.newDialog.setContent([...content.children]);
        this.newDialog.querySelector('form').addEventListener('submit', (ev) => {
            ev.preventDefault();
            const formData = new FormData(ev.target);
            this.emitter.trigger('character:new', formData.get('char_type'));
        });
        this.newDialog.open();
    }
    /**
     * Close the mew modal.
     */
    _closeNewModal () {
        if (this.newDialog !== null) {
            this.newDialog.closeClear();
        }
    }
    /**
     * Load up a character by triggering a hash change.
     * @param {Event} ev Click event
     * @returns
     */
    _loadCharClick (ev) {
        const button = ev.currentTarget;
        const charKey = button.dataset.key || '';
        if (charKey === '') {
            return;
        }
        window.location.hash = `#${charKey}`;
    }
    /**
     * Open the dialog to load a character.
     */
    _openLoadModal () {
        this.loadDialog = this.loadDialog || document.getElementById('dialog-load');
        this.loadDialog.clear();
        if (this.loadDialog.isOpen) {
            this.loadDialog.close();
            return;
        }

        // Are there unsaved changes
        // This could be done better in the future if we had some kind of central state management.
        let currentlyUnsaved = false;
        // is the unsaved dialog showing...
        const unsavedDialog = document.querySelector('.alert-unsaved');
        if (unsavedDialog && !unsavedDialog.hidden) {
            currentlyUnsaved = true;
        }

        const template = document.getElementById('loadModal');
        const content = document.importNode(template.content, true);
        const list = content.querySelector('ul');
        getAllCharactersLocal().forEach((char) => {
            const li = document.createElement('li');
            const cButton = new ConfirmButton();
            cButton.dataset.key = char.key;
            cButton.classList.add('btn', 'btn-plain');
            cButton.innerHTML = `<span slot="default">${char.summaryHeader}</span>
            <span slot="confirm" hidden>Are you sure you want to load: ${(char.charname) ? char.charname : '[Unnamed]'}, you have unsaved changes.</span>`;
            if (!currentlyUnsaved) {
                cButton.confirm = false;
            }
            // set this so it's added _after_ the internal confirm event.
            cButton.confirmCallback = this._loadCharClick.bind(this);
            li.appendChild(cButton);
            list.appendChild(li);
        });
        this.loadDialog.setContent([...content.children]);
        this.loadDialog.open();
    }
    /**
     * Close the load modal.
     */
    _closeLoadModal () {
        if (this.loadDialog !== null) {
            this.loadDialog.closeClear();
        }
    }
    /**
     * Modal for deleting characters.
     */
    _openDeleteModal () {
        const modal = document.getElementById('dialog-delete');
        if (modal.isOpen) {
            modal.close();
            return;
        }
        const template = document.getElementById('deleteModal');
        const content = document.importNode(template.content, true);

        const items = [];
        getAllCharactersLocal().forEach((char) => {
            const li = `<li><confirm-button data-key="${char.key}" class="btn btn-plain btn-delete-char">
                <span slot="default">${char.summaryHeader}</span>
                <span slot="confirm" hidden>Are you sure you want to delete: ${(char.charname) ? char.charname : '[Unnamed]'}</span>
            </confirm-button></li>`;
            items.push(li);
        });
        content.querySelector('ul').innerHTML = items.join('');

        modal.setContent([...content.children]);
        modal.querySelector('ul').addEventListener('click', (ev) => {
            const button = ev.target.tagName === 'CONFIRM-BUTTON' ? ev.target : ev.target.closest('confirm-button');
            if (button && button.classList.contains('btn-delete-char')) {
                ev.preventDefault();
                this.emitter.trigger('character:delete', button.getAttribute('data-key'));
                modal.closeClear();
            }
        });
        modal.open();
    }

    _showMore () {
        this.shadowRoot.querySelector('.more-actions').classList.toggle('closed');
    }
    /**
     * Show auth button if auth is setup.
     */
    _showAuth () {
        const authbutton = this.buttons.find((btn) => { return btn.el.classList.contains('btn-auth'); });
        if (authbutton) {
            authbutton.el.classList.remove('hidden');
        }
    }
    /**
     * When user switches to being logged in.
     */
    _signedIn () {
        const button = this.buttons.find((b) => {
            return b.action === 'auth';
        });
        if (button) {
            button.el.innerHTML = 'Sync/Logout';
        }
        // Trigger the dialog so user can sync data.
        this._openAuthDialog();
    }
    /**
     * When user switches to being logged ou.
     */
    _signedOut () {
        const button = this.buttons.find((b) => {
            return b.action === 'auth';
        });
        if (button) {
            button.el.innerHTML = 'Login';
        }
        if (this.authDialog && this.authDialog.isOpen) {
            this.authDialog.close();
        }
    }
    /**
     * Set focus to next button (or wrap around).
     * @param {ActionButton} currentBtn
     */
    setFocusToNext (currentBtn) {
        const index = this.buttons.indexOf(currentBtn);
        const newIndex = index + 1;
        if (newIndex > this.buttons.length - 1) {
            this.setFocusToFirst();
            return;
        }
        this.buttons[newIndex].switchTo();
    }
    /**
     * Set focus to previous button (or wrap around).
     * @param {ActionButton} currentBtn
     */
    setFocusToPrevious (currentBtn) {
        const index = this.buttons.indexOf(currentBtn);
        const newIndex = index - 1;
        if (newIndex < 0) {
            this.setFocusToLast();
            return;
        }
        this.buttons[newIndex].switchTo(false);
    }
    /**
     * Set focus to first button.
     */
    setFocusToFirst () {
        this.buttons[0].switchTo();
    }
    /**
     * Set focus to last button.
     */
    setFocusToLast () {
        this.buttons[this.buttons.length - 1].switchTo(false);
    }
    /**
     * Set focus to specific button.
     * @param {ActionButton} button
     */
    setTabFocusToButton (button) {
        this.buttons.forEach((btn) => {
            if (btn === button) {
                btn.switchTo();
            } else {
                btn.removeTabFocus();
            }
        });
    }
    /**
     * Set focus to whatever button was last focused or else the first one.
     */
    focus () {
        let button = this.buttons.find((btn) => {
            return btn.isFocusable();
        });
        if (!button) {
            button = this.buttons[0];
        }
        this.setTabFocusToButton(button);
    }
}

if (!window.customElements.get('action-menu')) {
    window.customElements.define('action-menu', ActionMenu);
}

export default ActionMenu;
