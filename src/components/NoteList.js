import NoteListItem from './NoteListItem.js';
import CharacterNote from '../models/CharacterNote.js';
import setCursorAtContentEnd from '../utils/setCursorAtContentEnd.js';

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
    constructor () {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback () {
        // set any default attributes?
        if (!this.hasAttribute('role')) {
            this.setAttribute('role', 'list');
        }
        // add event listeners
        this.addEventListener('keydown', this._keyDown);
        this.addEventListener('blur', this._blur);
        this._upgradeProperty('fieldName');
    }

    disconnectedCallback () {
        // remove event listeners
        this.removeEventListener('keydown', this._keyDown);
        this.removeEventListener('blur', this._blur);
    }
    /**
     * In case the property was set before connecting
     * this makes sure the value is retrieved and then reset so that the setter will get used.
     * @param {String} prop
     */
    _upgradeProperty (prop) {
        if (Object.prototype.hasOwnProperty.call(this, prop)) {
            const value = this[prop];
            delete this[prop];
            this[prop] = value;
        }
    }
    /**
     * Setter: field name for data.
     */
    set fieldName (value) {
        this.dataset.name = value;
    }
    /**
     * Getter: field name for data.
     */
    get fieldName () {
        return this.dataset.name || '';
    }
    /**
     * Getter: Content of list items.
     * @returns {CharacterNote[]}
     */
    get contentArray () {
        const items = Array.from(this.shadowRoot.querySelectorAll('note-list-item'));
        const array = [];
        items.forEach((item) => {
            const content = item.content;
            // Check if it's empty.
            if (!content.header && !content.text) {
                return;
            }
            array.push(content);
        });
        return array;
    }
    /**
     * Add a new note-list-item.
     * Set its header/text if appropriate.
     * @param {CharacterNote|null} note
     */
    addItem (note = null) {
        const item = new NoteListItem();
        if (note) {
            item.content = note;
        }
        this.shadowRoot.appendChild(item);
    }
    /**
     * Clear out the items.
     */
    clear () {
        Array.from(this.shadowRoot.querySelectorAll('note-list-item')).forEach((item) => {
            this.shadowRoot.removeChild(item);
        });
    }
    /**
     * Get focused element.
     */
    deepActiveElement () {
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
    _keyDown (ev) {
        if ((ev.key !== 'Enter' && ev.key !== 'Backspace') || ev.shiftKey) {
            return;
        }
        const el = this.deepActiveElement();
        // Move to next field on enter.
        if (ev.key === 'Enter') {
            ev.preventDefault();
            ev.stopPropagation();
            if (el.tagName === 'DT' || el.closest('dt')) {
                console.log(el);
                // If this is a child of dt we need to handle this differently.
                el.nextElementSibling.focus();
            } else if (el.tagName === 'DD' || el.closest('dd')) {
                console.log(el);
                if (el.parentNode.host === this.shadowRoot.lastElementChild) {
                    // Last NoteListItem, so add a new item and focus.
                    const newList = new NoteListItem();
                    this.shadowRoot.appendChild(newList);
                    newList.focus();
                } else {
                    const nextList = el.parentNode.host.nextElementSibling;
                    if (nextList) {
                        nextList.focus();
                    }
                }
            }
            return;
        }

        if (ev.key === 'Backspace') {
            // trim this in case of line breaks, spaces, etc.
            if (el.innerText.trim() !== '') {
                return;
            }
            ev.preventDefault();
            ev.stopPropagation();
            if (el.tagName === 'DT' || el.closest('dt')) {
                // If it's not the first NoteListItem, move to the previous one's text field.
                if (el.parentNode.host !== this.shadowRoot.querySelector('note-list-item')) {
                    const prevItem = el.parentNode.host.previousElementSibling;

                    if (prevItem) {
                        prevItem.focus(true);
                        setCursorAtContentEnd(this.deepActiveElement());

                        // If both NoteListItem fields are empty, delete it
                        if (el.parentNode.host.isEmpty()) {
                            el.parentNode.host.remove();
                        }
                    }
                }
            } else if (el.tagName === 'DD' || el.closest('dd')) {
                // NoteListItem focus always goes to the DT.
                el.parentNode.host.focus();
                setCursorAtContentEnd(this.deepActiveElement());
            }
        }
    }
    /**
     * On blur dispatch an event so the character model can be updated.
     * @param {Event} ev
     */
    _blur (ev) {
        const detail = {
            field: this.fieldName,
            value: this.contentArray
        };
        this.dispatchEvent(new CustomEvent('fieldChange', { bubbles: true, detail }));
    }
    /**
     * Focus method since HTMLElement doesn't have that by default (I think).
     */
    focus () {
        this.shadowRoot.querySelector('note-list-item').focus();
    }
}

window.customElements.define('note-list', NoteList);

export default NoteList;
