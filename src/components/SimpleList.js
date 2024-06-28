import setCursorAtContentEnd from '../utils/setCursorAtContentEnd.js';

/**
 * Parent container for a simple list.
 * Add data-number="true" to make it a numbered list.
 */

const template = document.createElement('template');
template.innerHTML = `
<style>
    :host {
        display: block;
        margin: 0 0 1rem 0;
        padding: 0;
    }
    :host([hidden]) {
        display: none
    }
    li {
        display: block;
        margin-bottom: 0.125rem;
        border-bottom: 1px solid rgb(207,0,15);
    }
    :host([data-number]) li {
        list-style: decimal;
        display: list-item;
    }
    :host([data-number]) li::marker {
        text-align: end;
    }
    li div {
        display: inline-block;
    }
</style>
`;

class SimpleList extends HTMLElement {
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
        this._upgradeProperty('subFieldName');
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
     * Setter: subfield name for data.
     */
    set subFieldName (value) {
        this.dataset.subfield = value;
    }
    /**
     * Getter: subfield name for data.
     */
    get subFieldName () {
        return this.dataset.subfield || '';
    }
    /**
     * Getter: Content of list items.
     */
    get contentArray () {
        const items = Array.from(this.shadowRoot.querySelectorAll('li'));
        const array = [];
        items.forEach((item) => {
            const content = item.innerHTML;
            if (content === '') {
                return;
            }
            array.push(content);
        });
        return array;
    }
    /**
     * Add a new li.
     * Set its text if appropriate.
     * @param {String} content
     * @returns {HTMLLIElement}
     */
    addItem (content = '') {
        const item = document.createElement('li');
        item.setAttribute('contenteditable', true);
        item.innerHTML = content;
        this.shadowRoot.appendChild(item);
        return item;
    }
    /**
     * Clear out the items.
     */
    clear () {
        Array.from(this.shadowRoot.querySelectorAll('li')).forEach((item) => {
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
        if (el.tagName !== 'LI' && !el.closest('li')) {
            return;
        }
        if (ev.key === 'Enter') {
            ev.preventDefault();
            // compare the focused elements parent component node (note-list-item) to the last item in the list.
            if (el === this.shadowRoot.lastElementChild) {
                // Last one so add a new item and focus.
                const newItem = this.addItem();
                newItem.focus();
            } else {
                // Move to the next item.
                const nextItem = el.nextElementSibling;
                if (nextItem) {
                    nextItem.focus();
                }
            }
            return;
        }
        if (ev.key === 'Backspace') {
            if (el !== this.shadowRoot.querySelector('li')) {
                if (el.innerText.trim() === '') {
                    ev.preventDefault();
                    const prevItem = el.previousElementSibling;
                    prevItem.focus();
                    setCursorAtContentEnd(prevItem);
                    el.remove();
                }
            }
        }
    }
    /**
     * On blur dispatch an event so the character model can be updated.
     * @param {Event} ev
     */
    _blur () {
        const detail = {
            field: this.fieldName,
            subfield: this.subFieldName,
            value: this.contentArray
        };
        this.dispatchEvent(new CustomEvent('fieldChange', { bubbles: true, detail }));
    }
    /**
     * Focus method since HTMLElement doesn't have that by default (I think).
     */
    focus () {
        this.shadowRoot.querySelector('li').focus();
    }
}

if (!window.customElements.get('simple-list')) {
    window.customElements.define('simple-list', SimpleList);
}

export default SimpleList;
