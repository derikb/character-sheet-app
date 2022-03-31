import NoteListItem from './NoteListItem.js';
import CharacterNote from '../models/CharacterNote.js';

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
        if (ev.key === 'Enter') {
            ev.preventDefault();
            if (el.tagName === 'DT' || el.closest('dt')) {
                el.nextElementSibling.focus();

            // If we're in the text section
            } else if (el.tagName === 'DD' || el.closest('dd')) {
                if (el.parentNode.host === this.shadowRoot.lastElementChild) {
                    // Last NoteList, so add a new item and focus.
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
        } else if (ev.key === 'Backspace') {
            if (el.innerText !== '') {
                return;
            }
            if (el.tagName === 'DT' || el.closest('dt')) {
                // If it's not the first NoteList, move to the previous one's text field.
                if (el.parentNode.host !== this.shadowRoot.querySelector('note-list-item')) {
                    const prevItem = el.parentNode.host.previousElementSibling;

                    if (prevItem) {
                        prevItem.focus();
                        this.deepActiveElement().nextElementSibling.focus();

                        // If both NoteList fields are empty, delete it
                        if (el.innerText === '' && el.nextElementSibling.innerText === '') {
                            el.parentNode.host.remove();
                        }
                    }
                }
            } else if (el.tagName === 'DD' || el.closest('dd')) {
                el.previousElementSibling.focus();
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
