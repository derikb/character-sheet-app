/**
 * Action Toolbar
 */
import { default as Modal } from './Modal.js';
import { getAllCharacters } from './CharacterService.js';

/**
 * Buttons in the toolbar.
 * Mostly in re focus management and keyboard events.
 */
class ActionButton {
    /**
     * @param {HTMLElement} el Button element.
     * @param {ActionMenu} menu
     */
    constructor(el, menu) {
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
    handleKeyBoardEvent(ev) {
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
            return;
        }
    }
    /**
     * Set button to not be tabbable.
     */
    removeTabFocus() {
        this.el.setAttribute('tabindex', '-1');
    }
    /**
     * Set button to be tabbable.
     */
    setTabFocus() {
        this.el.setAttribute('tabindex', '0');
    }
    /**
     * Focus on this button.
     */
    focus() {
        this.el.focus();
    }
    /**
     * Switch to this button. Set its tabindex and focus.
     */
    switchTo() {
        this.setTabFocus();
        this.focus();
    }
}

/**
 * Toolbar and associated action events or dialogs.
 */
const ActionMenu = {
    /**
     * @prop {Array} Matching action button classes to methods to calls.
     */
    actions: {
        'save': 'saveCharacter',
        'load': 'openLoadModal',
        'new': 'newCharacter',
        'backup': 'openDownloadForm',
        'restore': 'openRestoreForm',
        'delete': 'openDeleteModal'
    },
    /**
     * @prop {HTMLELement} Menu element
     */
    el: null,
    /**
     * @prop {HTMLELement} Menu toogle button when menu is collapsed on narrow screens.
     */
    opener: null,
    /**
     * @prop {Modal} Modal for load menu.
     */
    loadDialog: null,
    /**
     * @prop {Modal} Modal for Backup save.
     */
    downloadDialog: null,
    /**
     * @prop {Modal} Modal for Backup restore.
     */
    restoreDialog: null,
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
        getAllCharacters().forEach((char) => {
            const li = `<li><label><input type="checkbox" name="${char.key}" value="${char.key}" /> ${char.summaryHeader}</label></li>`;
            checkboxes.push(li);
        });
        form.querySelector('.character_downloads').innerHTML = checkboxes.join('');
        this.downloadDialog.setContent([form], false);
        this.downloadDialog.el.querySelector('form').addEventListener('submit', (ev) => {
            ev.preventDefault();
            this.emitter.trigger('backup:download', ev.target);
        });
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
        const h2 = document.createElement('h2');
        h2.id = 'dialog-label';
        h2.textContent = 'Alernate Download Option';
        const p = document.createElement('p');
        p.innerHTML = `Your current browser/os does not support direct file downloads, so here is the data for you to copy/paste.`;
        const text = document.createElement('textarea');
        text.classList.add('large');
        text.value = data;
        this.downloadDialog.clear();
        this.downloadDialog.setContent([h2, p, text, this.downloadDialog.getCloseButton()], false);
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
            this.downloadDialog.closeClear();
        });
        const p = document.createElement('p');
        p.appendChild(a);
        this.downloadDialog.clear();
        this.downloadDialog.setContent([p, this.downloadDialog.getCloseButton()], false);
        this.downloadDialog.focusFirst();
    },
    /**
     * Trigger a save character event.
     */
    saveCharacter: function() {
        this.emitter.trigger('character:save');
    },
    /**
     * Trigger a new character event.
     */
    newCharacter: function() {
        this.emitter.trigger('character:new');
    },
    /**
     * Open the dialog to load a character.
     */
    openLoadModal: function() {
        this.loadDialog = this.loadDialog || new Modal(document.getElementById('dialog-load'));
        this.loadDialog.clear();
        if (this.loadDialog.isOpen) {
            this.loadDialog.close();
            return;
        }
        const template = document.getElementById('loadModal');
        const content = document.importNode(template.content, true);
        const list = content.querySelector('ul');
        getAllCharacters().forEach((char) => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.textContent = char.summaryHeader;
            a.setAttribute('href', `#${char.key}`);
            li.appendChild(a);
            list.appendChild(li);
        });
        this.loadDialog.setContent([content]);
    },
    /**
     * Close the load modal.
     */
    closeLoadModal: function() {
        if (this.loadDialog !== null) {
            this.loadDialog.closeClear();
        }
    },
    /**
     * Modal for deleting characters.
     */
    openDeleteModal: function() {
        const modal = new Modal(document.getElementById('dialog-delete'));
        if (modal.isOpen) {
            modal.close();
            return;
        }
        const template = document.getElementById('deleteModal');
        const content = document.importNode(template.content, true);

        const items = [];
        getAllCharacters().forEach((char) => {
            const li = `<li><button type="button" data-key="${char.key}" class="btn-plain btn-delete-char"> ${char.summaryHeader}</button></li>`;
            items.push(li);
        });
        content.querySelector('ul').innerHTML = items.join('');

        modal.setContent([content]);
        modal.el.querySelector('ul').addEventListener('click', (ev) => {
            if (ev.target.classList.contains('btn-delete-char')) {
                ev.preventDefault();
                this.emitter.trigger('character:delete:confirm', ev.target.getAttribute('data-key'));
                modal.closeClear();
            }
        });
    },
    /**
     * Set focus to next button (or wrap around).
     * @param {ActionButton} currentBtn
     */
    setFocusToNext: function(currentBtn) {
        const index = this.buttons.indexOf(currentBtn);
        const newIndex = index + 1;
        if (newIndex > this.buttons.length - 1) {
            this.setFocusToFirst();
            return;
        }
        this.buttons[newIndex].switchTo();

    },
    /**
     * Set focus to previous button (or wrap around).
     * @param {ActionButton} currentBtn
     */
    setFocusToPrevious: function(currentBtn) {
        const index = this.buttons.indexOf(currentBtn);
        const newIndex = index - 1;
        if (newIndex < 0) {
            this.setFocusToLast();
            return;
        }
        this.buttons[newIndex].switchTo();
    },
    /**
     * Set focus to first button.
     */
    setFocusToFirst: function() {
        this.buttons[0].switchTo();
    },
    /**
     * Set focus to last button.
     */
    setFocusToLast: function() {
        this.buttons[this.buttons.length - 1].switchTo();
    },

    setTabFocusToButton: function(button) {
        this.buttons.forEach((btn) => {
            if (btn === button) {
                btn.switchTo();
            } else {
                btn.removeTabFocus();
            }
        });
    },
    /**
     * Add event handlers, etc.
     * @param {EventEmitter} emitter
     */
    initialize: function (emitter) {
        this.emitter = emitter;
        this.el = document.querySelector('.app-actions');
        this.buttons = [];
        var buttons = this.el.querySelectorAll('button');
        Array.prototype.forEach.call(buttons, (btn) => {
            this.buttons.push(new ActionButton(btn, this));
        });

        this.opener = document.querySelector('.btn-open-actions');
        // opener click handler
        this.opener.addEventListener('click', (e) => {
            this.el.classList.toggle('open');
        });

        // event handlers for all the menu buttons
        this.el.addEventListener('click', (ev) => {
            if (ev.target.tagName !== 'BUTTON') {
                return;
            }
            const button = this.buttons.find((btn) => { return btn.el === ev.target; });
            if (!button) {
                return;
            }
            const action = this.actions[button.action] || null;
            if (!action) {
                return;
            }
            this[action]();
        });

        this.emitter.on('loaddialog:close', this.closeLoadModal, this);
        this.emitter.on('loaddialog:toggle', this.openLoadModal, this);
        this.emitter.on('backup:email',  this.emailDownload, this);
        this.emitter.on('backup:textpaste',  this.altDownload, this);
;    }
};

export default ActionMenu;
