/**
 * Container for Definition list pairs used as note header/text.
 */
import CharacterNote from '../models/CharacterNote.js';

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
    constructor () {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback () {
        // set any default attributes
        if (!this.hasAttribute('role')) {
            this.setAttribute('role', 'list-item');
        }
    }

    /**
     * Get the content (header and text) of the pair.
     * @returns {CharacterNote}
     */
    get content () {
        return new CharacterNote({
            header: this.shadowRoot.querySelector('dt').innerHTML,
            text: this.shadowRoot.querySelector('dd').innerHTML
        });
    }
    /**
     * Set the header and text of the pair.
     * @param {CharacterNote}
     */
    set content (note) {
        // set the content.
        this.shadowRoot.querySelector('dt').innerHTML = note.header;
        this.shadowRoot.querySelector('dd').innerHTML = note.text;
    }
    /**
     * Clear the text.
     */
    clear () {
        this.content = [];
    }
    /**
     * Get the in focus element.
     * @returns {Element}
     */
    deepActiveElement () {
        let a = document.activeElement;
        while (a && a.shadowRoot && a.shadowRoot.activeElement) {
            a = a.shadowRoot.activeElement;
        }
        return a;
    }
    /**
     * Focus method since HTMLElement doesn't have that by default (I think).
     */
    focus () {
        this.shadowRoot.querySelector('dt').focus();
    }
    /**
     * Determine whether NoteListItem is empty, ignoring lead and trailing whitespace
     * @returns true if empty, false otherwise
     */
    isEmpty () {
        let empty = false;
        if (this.shadowRoot.querySelector('dt').innerText.trim() === '' &&
                this.shadowRoot.querySelector('dd').innerText.trim() === '') {
            empty = true;
        }
        return empty;
    }
}

window.customElements.define('note-list-item', NoteListItem);

export default NoteListItem;
