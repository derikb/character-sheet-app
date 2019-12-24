import { default as Storage } from './Storage.js';

const BackupDialog = {
    /**
     * @prop {HTMLElement} el Dialog element
     */
    el: null,
    /**
     * Open Dialog
     */
    open: function () {
        this.el.hidden = false;
        this.el.querySelector('legend').focus();
    },
    /**
     * Close Dialog (and clear form)
     */
    close: function () {
        this.el.hidden = true;
        while (this.el.firstChild) {
            this.el.removeChild(this.el.firstChild);
        }
    },
    /**
     * Return a close button to use
     * @return {HTMLElement} button.close
     */
    getCloseButton: function () {
        const button = document.createElement('button');
        button.setAttribute('type', 'button');
        button.classList.add('close');
        button.textContent = 'Close';
        return button;
    },
    /**
     * Add the restore form
     */
    openRestoreForm: function () {
        const form = document.createElement('form');
        form.id = 'form_backup_restore';
        const fields = `<label for="files">Restore from file</label>
            <input type="file" id="files" name="files" />
            <p>or</p>
            <label for="backup_data">Paste the character backup data</label>
            <textarea id="backup_data" name="backup_data"></textarea>
            <button type="submit">Restore</button>
            <button type="button">Cancel</button>`;
        form.innerHTML = fields;
        form.addEventListener('submit', (ev) => {
            ev.preventDefault();
            this.emitter.trigger('backup:restore', ev.target);
        });
        this.el.appendChild(form);
        this.open();
    },
    /**
     * Add the download options
     */
    openDownloadForm: function () {
        const form = document.createElement('form');
        form.id = 'form_backup_download';

        const checkboxes = [];
        Storage.getAllKeys().forEach((key) => {
            const char_obj = Storage.get(key);
            if (!char_obj.key) { return; }
            const li = `<li><label><input type="checkbox" name="${char_obj.key}" value="${char_obj.key}" /> ${char_obj.charname} (${char_obj.charclass} ${char_obj.level})</label></li>`;
            checkboxes.push(li);
        });

        const fields = `<fieldset>
            <legend tabindex="-1">Pick characters to download.</legend>
            <ul>
                ${checkboxes.join('')}
            </ul>
        </fieldset>
        <fieldset>
            <legend>Pick a format</legend>
            <ul>
            <li><label><input type="radio" name="format" value="file" checked> File download</label></li>
            <li><label><input type="radio" name="format" value="email"> Email data</label></li>
        </fieldset>
        <button type="submit">Download</button>
        <button type="button">Cancel</button>`;
        form.innerHTML = fields;
        form.addEventListener('submit', (ev) => {
            ev.preventDefault();
            this.emitter.trigger('backup:download', ev.target);
        });
        this.el.appendChild(form);
        this.open();
    },
    /**
     * If file download is unavailable offer the data to copy/paste
     * @param {String} data the backup data
     */
    altDownload: function (data) {
        const p = document.createElement('p');
        p.innerHTML = `Your current browser/os does not support direct file downloads, so here is the data for you to copy/paste.`;
        const text = document.createElement('textarea');
        text.classList.add('large');
        text.value = data;
        while (this.el.firstChild) {
            this.el.removeChild(this.el.firstChild);
        }
        this.el.appendChild(p);
        this.el.appendChild(text);
        this.el.appendChild(this.getCloseButton());
        text.focus();
        text.select();
    },
    /**
     * Email download link
     * @param {HTMLElement} link the email link
     */
    emailDownload: function (link) {
        const p = document.createElement('p');
        p.appendChild(link);
        while (this.el.firstChild) {
            this.el.removeChild(this.el.firstChild);
        }
        this.el.appendChild(p);
        this.el.appendChild(this.getCloseButton());
    },
    /**
     * Add events
     * @prop {EventEmitter}
     */
    initialize: function (emitter) {
        this.el = document.getElementById('dialog-backup');
        this.emitter = emitter;
        // Event: click closer
        this.el.addEventListener('click', (ev) => {
            if (ev.target.tagName === 'BUTTON' && ev.target.getAttribute('type') === 'button') {
                this.close();
            }
        });

        this.emitter.on('backup:open:download', this.openDownloadForm, this);
        this.emitter.on('backup:open:restore', this.openRestoreForm, this);
        this.emitter.on('backup:close', this.close, this);
        this.emitter.on('backup:email', this.emailDownload, this);
        this.emitter.on('backup:textpaste', this.altDownload, this);
    }
};

export default BackupDialog;
