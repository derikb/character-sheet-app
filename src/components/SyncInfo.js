/**
 * Character local/remote sync info/actions.
 */
import { downloadCharacter, uploadCharacter, deleteRemote, deleteLocal, syncToLocal, syncToRemote } from '../services/syncService.js';

const template = document.createElement('template');
template.innerHTML = `
<style>
    :host {
        display: block;
        margin: 1rem 0;
        border: 1px dotted black;
        padding: 1rem;
        border-radius: 0.25rem;
    }
    span {
        display: inline-block;
    }
    #char-name {
        font-weight: bold;
        margin-bottom: .5rem;
    }
    .charname {
        margin-right: .5rem;
    }
    div + div {
        margin-top: .5rem;
    }
    div.error {
        font-weight: bold;
        color: red;
    }
    button {
        background-color: rgb(207,0,15);
        border: none;
        border-radius: 0.4rem;
        color: #fff;
        cursor: pointer;
        display: inline-block;
        line-height: 1rem;
        font-weight: 400;
        text-align: center;
        text-decoration: none;
        letter-spacing: 0.1rem;
        white-space: nowrap;
        font-size: 0.8rem;
        padding: .25rem .75rem;
        margin: 0;
    }
    button:hover, button:focus {
        background-color: #606c76;
        color: #fff;
    }
</style>
<div id="char-name"><span class="charname"></span>(<span class="key"></span>)</div>
<div class="local">
    <span class="summary">No local copy.</span>
    <span class="updated"></span>
    <span class="action"></span>
</div>
<div class="remote">
    <span class="summary">No remote copy.</span>
    <span class="updated"></span>
    <span class="action"></span>
</div>
<div class="syncaction"></div>
<div class="error"></div>
`;

class SyncInfo extends HTMLElement {
    constructor () {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.setAttribute('role', 'list-item');
        this.setAttribute('aria-labelledby', 'char-name');
        this._key = '';
        this.localDiv = this.shadowRoot.querySelector('.local');
        this.remoteDiv = this.shadowRoot.querySelector('.remote');
        this.syncDiv = this.shadowRoot.querySelector('.syncaction');
        this.isCurrentCharacter = false;
    }

    connectedCallback () {
        this.shadowRoot.addEventListener('click', this.handleButtonClick.bind(this));
    }

    disconnectedCallback () {
        this.shadowRoot.removeEventListener('click', this.handleButtonClick.bind(this));
    }

    get key () {
        return this._key;
    }

    _showError (message) {
        this.shadowRoot.querySelector('.error').innerHTML = message;
    }
    /**
     * Handler clicks in the element.
     * @param {Event} ev Click event
     */
    handleButtonClick (ev) {
        console.log(ev);
        const button = ev.target.closest('button');
        if (!button) {
            return;
        }
        const action = button.dataset.action;
        if (!action) {
            return;
        }
        console.log(`Action: ${action}`);

        switch (action) {
            case 'upload':
                uploadCharacter(this._key)
                    .then(() => {
                        this.remoteDiv.querySelector('.summary').innerHTML = this.localDiv.querySelector('.summary').innerHTML;
                        this.remoteDiv.querySelector('.updated').innerHTML = this.localDiv.querySelector('.updated').innerHTML;
                        this.remoteDiv.querySelector('.action').innerHTML = '';
                        this.remoteDiv.querySelector('.action').appendChild(
                            this._getButton('removeremote', 'Delete from Remote')
                        );
                    })
                    .catch((err) => {
                        this._showError(err);
                    });
                break;
            case 'removeremote':
                deleteRemote(this._key)
                    .then(() => {
                        this.remoteDiv.querySelector('.summary').innerHTML = 'No remote copy.';
                        this.remoteDiv.querySelector('.updated').innerHTML = '';
                        this.remoteDiv.querySelector('.action').innerHTML = '';
                        this.remoteDiv.querySelector('.action').appendChild(
                            this._getButton('upload', 'Upload')
                        );
                    })
                    .catch((err) => {
                        this._showError(err);
                    });
                break;
            case 'download':
                downloadCharacter(this._key)
                    .then(() => {
                        this.localDiv.querySelector('.summary').innerHTML = this.remoteDiv.querySelector('.summary').innerHTML;
                        this.localDiv.querySelector('.updated').innerHTML = this.remoteDiv.querySelector('.updated').innerHTML;
                        this.localDiv.querySelector('.action').innerHTML = '';
                        this.localDiv.querySelector('.action').appendChild(
                            this._getButton('removelocal', 'Delete from Local')
                        );
                    })
                    .catch((err) => {
                        this._showError(err);
                    });
                break;
            case 'removelocal':
                if (this.isCurrentCharacter) {
                    this._showError('You cannot remove the currently displayed character.');
                    return;
                }
                deleteLocal(this._key)
                    .then(() => {
                        this.localDiv.querySelector('.summary').innerHTML = 'No local copy.';
                        this.localDiv.querySelector('.updated').innerHTML = '';
                        this.localDiv.querySelector('.action').innerHTML = '';
                        this.localDiv.querySelector('.action').appendChild(
                            this._getButton('download', 'Download')
                        );
                    })
                    .catch((err) => {
                        this._showError(err);
                    });
                break;
            case 'syncup':
                syncToRemote(this._key)
                    .then(() => {
                        this.remoteDiv.querySelector('.summary').innerHTML = this.localDiv.querySelector('.summary').innerHTML;
                        this.remoteDiv.querySelector('.updated').innerHTML = this.localDiv.querySelector('.updated').innerHTML;
                        this.remoteDiv.querySelector('.action').innerHTML = '';
                        this.remoteDiv.querySelector('.action').appendChild(
                            this._getButton('removeremote', 'Delete from Remote')
                        );
                        this.syncDiv.innerHTML = '';
                    })
                    .catch((err) => {
                        this._showError(err);
                    });
                break;
            case 'syncdown':
                if (this.isCurrentCharacter) {
                    this._showError('You cannot sync to local the currently displayed character.');
                    return;
                }
                syncToLocal(this._key)
                    .then(() => {
                        this.localDiv.querySelector('.summary').innerHTML = this.remoteDiv.querySelector('.summary').innerHTML;
                        this.localDiv.querySelector('.updated').innerHTML = this.remoteDiv.querySelector('.updated').innerHTML;
                        this.localDiv.querySelector('.action').innerHTML = '';
                        this.localDiv.querySelector('.action').appendChild(
                            this._getButton('removelocal', 'Delete from Local')
                        );
                        this.syncDiv.innerHTML = '';
                    })
                    .catch((err) => {
                        this._showError(err);
                    });
                break;
        }
    }

    _getButton (action, label) {
        const button = document.createElement('BUTTON');
        button.classList.add('btn-sm');
        button.dataset.action = action;
        button.innerText = label;
        return button;
    }
    /**
     * Set the character data.
     * @param {Object} data
     * @param {String} key Character key.
     * @param {Character} local Local copy
     * @param {Character} remote Remote copy
     * @param {String} latest Which is more recent.
     * @returns
     */
    setData ({
        key = '',
        local = {},
        remote = {},
        latest = ''
    }) {
        if (!key) {
            return;
        }
        this._key = key;
        const charName = local.key
            ? local.charname
            : (remote.key ? remote.charname : '[Unknown]');
        this.shadowRoot.querySelector('.charname').innerHTML = charName;
        this.shadowRoot.querySelector('.key').innerHTML = key;
        if (local.key) {
            this.localDiv.querySelector('.summary').innerHTML = local.summaryHeader;
            this.localDiv.querySelector('.updated').innerHTML = local.updatedTime;
            this.localDiv.querySelector('.action').appendChild(
                this._getButton('removelocal', 'Delete from Local')
            );
        } else {
            this.localDiv.querySelector('.action').appendChild(
                this._getButton('download', 'Download')
            );
        }

        if (remote.key) {
            this.remoteDiv.querySelector('.summary').innerHTML = remote.summaryHeader;
            this.remoteDiv.querySelector('.updated').innerHTML = remote.updatedTime;
            this.remoteDiv.querySelector('.action').appendChild(
                this._getButton('removeremote', 'Delete from Remote')
            );
        } else {
            this.remoteDiv.querySelector('.action').appendChild(
                this._getButton('upload', 'Upload')
            );
        }

        if (latest === 'local') {
            this.syncDiv.appendChild(
                this._getButton('syncup', 'Update on Remote')
            );
        } else if (latest === 'remote') {
            this.syncDiv.appendChild(
                this._getButton('syncdown', 'Update on Local')
            );
        }
    }
}

if (!window.customElements.get('sync-info')) {
    window.customElements.define('sync-info', SyncInfo);
}

export default SyncInfo;
