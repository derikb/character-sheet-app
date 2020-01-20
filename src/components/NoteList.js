import { default as NoteListItem } from './NoteListItem.js';

/**
 * Parent container for Definition list pairs used as note header/text.
 */

const template = document.createElement('template');
template.innerHTML = `
<style>
    :host {
        display: block;
        margin: 0;
        padding: 0;
    }
    :host([hidden]) {
        display: none
    }
</style>
`;

class NoteList extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        // set any default attributes?
        if (!this.hasAttribute('role')) {
            this.setAttribute('role', 'list');
        }
        // add event listeners
        this.addEventListener('keypress', this._keyPress);
        this.addEventListener('blur', this._blur);
        this._upgradeProperty('fieldName');
    }

    disconnectedCallback() {
        // remove event listeners
        this.removeEventListener('keypress', this._keyPress);
        this.removeEventListener('blur', this._blur);
    }
    /**
     * In case the property was set before connecting
     * this makes sure the value is retrieved and then reset so that the setter will get used.
     * @param {String} prop
     */
    _upgradeProperty(prop) {
        if (this.hasOwnProperty(prop)) {
          let value = this[prop];
          delete this[prop];
          this[prop] = value;
        }
      }
    /**
     * Setter: field name for data.
     */
    set fieldName(value) {
        this.dataset.name = value;
      }
    /**
     * Getter: field name for data.
     */
    get fieldName() {
        return this.dataset.name || '';
    }
    /**
     * Getter: Content of list items.
     */
    get contentArray() {
        const items = Array.from(this.shadowRoot.querySelectorAll('note-list-item'));
        let array = [];
        items.forEach((item) => {
            const content = item.content || null;
            if (!Array.isArray(content)) {
                return;
            }
            if (!content[0] && !content[1]) {
                return;
            }
            array.push(content);
        })
        return array;
    }
    /**
     * Add a new note-list-item.
     * Set its header/text if appropriate.
     * @param {String[]} array
     */
    addItem([header = '', text = '']) {
        const item = new NoteListItem();
        item.content = [header, text];
        this.shadowRoot.appendChild(item);
    }
    /**
     * Clear out the items.
     */
    clear() {
        Array.from(this.shadowRoot.querySelectorAll('note-list-item')).forEach((item) => {
            this.shadowRoot.removeChild(item);
        });
    }
    /**
     * Get focused element.
     */
    deepActiveElement() {
        let a = document.activeElement;
        while (a && a.shadowRoot && a.shadowRoot.activeElement) {
          a = a.shadowRoot.activeElement;
        }
        return a;
    }
    /**
     * Handler: Enter to move through the items or add new ones.
     * @param {KeyboardEvent} ev Keypress event
     */
    _keyPress(ev) {
        if (ev.key !== 'Enter' || ev.shiftKey) {
            return;
        }
        // Get the focused element.
        const el = this.deepActiveElement();
        if (el.tagName == 'DD' || el.closest('dd')) {
            ev.preventDefault();
            // compare the focused elements parent component node (note-list-item) to the last item in the list.
            if (el.parentNode.host === this.shadowRoot.lastElementChild) {
                // Last one so add a new item and focus.
                const newItem = new NoteListItem();
                this.shadowRoot.appendChild(newItem);
                newItem.focus();
            } else {
                // Move to the next item.
                const nextItem = el.parentNode.host.nextElementSibling;
                if (nextItem) {
                    nextItem.focus();
                }
            }
        }
    }
    /**
     * On blur dispatch an event so the character model can be updated.
     * @param {Event} ev
     */
    _blur(ev) {
        const detail = {
            field: this.fieldName,
            value: this.contentArray
        };
        this.dispatchEvent(new CustomEvent('fieldChange', { bubbles: true, detail }));
    }
    /**
     * Focus method since HTMLElement doesn't have that by default (I think).
     */
    focus() {
        this.shadowRoot.querySelector('note-list-item').focus();
    }
}

window.customElements.define('note-list', NoteList);

export default NoteList;
