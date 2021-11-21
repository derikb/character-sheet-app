/**
 * Parent container for a simple list.
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
</style>
`;

class SimpleList extends HTMLElement {

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
        this._upgradeProperty('subFieldName');
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
    get fieldName() {
        return this.dataset.name || '';
    }
    /**
     * Setter: subfield name for data.
     */
    set subFieldName(value) {
        this.dataset.subfield = value;
      }
    /**
     * Getter: subfield name for data.
     */
    get subFieldName() {
        return this.dataset.subfield || '';
    }
    /**
     * Getter: Content of list items.
     */
    get contentArray() {
        const items = Array.from(this.shadowRoot.querySelectorAll('li'));
        let array = [];
        items.forEach((item) => {
            const content = item.innerHTML;
            if (content === '') {
                return;
            }
            array.push(content);
        })
        return array;
    }
    /**
     * Add a new li.
     * Set its text if appropriate.
     * @param {String} content
     * @returns {HTMLLIElement}
     */
    addItem(content = '') {
        const item = document.createElement('li');
        item.setAttribute('contenteditable', true);
        item.innerHTML = content;
        this.shadowRoot.appendChild(item);
        return item;
    }
    /**
     * Clear out the items.
     */
    clear() {
        Array.from(this.shadowRoot.querySelectorAll('li')).forEach((item) => {
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
        const el = document.activeElement.shadowRoot.activeElement;
        if (el.tagName == 'LI' || el.closest('li')) {
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
        }
    }
    /**
     * On blur dispatch an event so the character model can be updated.
     * @param {Event} ev
     */
    _blur(ev) {
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
    focus() {
        this.shadowRoot.querySelector('li').focus();
    }
}

window.customElements.define('simple-list', SimpleList);

export default SimpleList;
