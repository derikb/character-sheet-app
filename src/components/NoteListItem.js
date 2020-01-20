/**
 * Container for Definition list pairs used as note header/text.
 */

const template = document.createElement('template');
template.innerHTML = `
<style>
    :host {
        display: block;
        margin-bottom: .5rem;
        padding-bottom: .5rem;
        border-bottom: 1px solid rgb(207,0,15);
    }
    :host([hidden]) {
        display: none
    }
    dt, dd {
        display: block;
        margin: 0;
        padding: 0;
        border: 1px dotted transparent;
    }
    dt {
        font-weight: bold;
    }
    [contenteditable=true]:empty {
        border: 1px dotted #bbb;
        border-radius: 4px;
    }
</style>
<dt contenteditable="true"></dt>
<dd contenteditable="true"></dd>
`;

class NoteListItem extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        // set any default attributes
        if (!this.hasAttribute('role')) {
            this.setAttribute('role', 'list-item');
        }
        // add event listeners
        this.addEventListener('keypress', this._keyPress);
    }

    disconnectedCallback() {
        // remove event listeners
        this.removeEventListener('keypress', this._keyPress);
    }
    /**
     * Get the content (header and text) of the pair.
     */
    get content() {
        return [
            this.shadowRoot.querySelector('dt').innerHTML,
            this.shadowRoot.querySelector('dd').innerHTML
        ];
    }
    /**
     * Set the header and text of the pair.
     * @param {String[]}
     */
    set content([header = '', text = '']) {
        // set the content.
        this.shadowRoot.querySelector('dt').innerHTML = header;
        this.shadowRoot.querySelector('dd').innerHTML = text;
    }
    /**
     * Clear the text.
     */
    clear() {
        this.content = [];
    }
    /**
     * Get the in focus element.
     * @returns {Element}
     */
    deepActiveElement() {
        let a = document.activeElement;
        while (a && a.shadowRoot && a.shadowRoot.activeElement) {
          a = a.shadowRoot.activeElement;
        }
        return a;
    }
    /**
     * Handler: Enter to move through the items.
     * @param {KeyboardEvent} ev Keypress event
     */
    _keyPress(ev) {
        if (ev.key !== 'Enter' || ev.shiftKey) {
            return;
        }
        const el = this.deepActiveElement();
        if (el.tagName == 'DT' || el.closest('dt')) {
            ev.preventDefault();
            ev.stopPropagation();
            // focus on the sibling DD
            this.shadowRoot.querySelector('dd').focus();
        }
    }
    /**
     * Focus method since HTMLElement doesn't have that by default (I think).
     */
    focus() {
        this.shadowRoot.querySelector('dt').focus();
    }
}

window.customElements.define('note-list-item', NoteListItem);

export default NoteListItem;
