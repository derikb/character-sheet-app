/**
 * Simple Editable field.
 */

const template = document.createElement('template');
template.innerHTML = `
<style>
    :host {
        display: block;
        width: 100%;
        display: flex;
    }
    :host([hidden]) {
        display: none
    }
    [contenteditable=true] {
        display: inline-block;
        width: 100%;
        min-height: 100%;
    }
    [contenteditable=true]:empty:before {
        content: attr(placeholder);
        color: #aaa;
    }
    [contenteditable=true]:empty {
        border: 1px dotted #bbb;
        border-radius: 4px;
    }
</style>
<span contenteditable="true"></span>
`;

class EditableField extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        if (this.hasAttribute('placeholder')) {
            this.placeholderText = this.getAttribute('placeholder');
        }

        // add event listeners
        this.addEventListener('blur', this._blur);
        this._upgradeProperty('fieldName');
    }

    disconnectedCallback() {
        // remove event listeners
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
     * Set placeholder text in the field.
     */
    set placeholderText(val) {
        this.shadowRoot.querySelector('span').setAttribute('placeholder', val);
    }
    /**
     * Getter: Content of field.
     * @returns {String}
     */
    get content() {
        return this.shadowRoot.querySelector('span').innerHTML;
    }
    /**
     * Setter: Content of field.
     * @param {String} value
     */
    set content(value) {
        this.shadowRoot.querySelector('span').innerHTML = value;
    }
    /**
     * On blur dispatch an event so the character model can be updated.
     * @param {Event} ev
     */
    _blur(ev) {
        let currentVal = this.content;
        // Trim empty end spaces/line breaks
        currentVal = currentVal.trim().replace(/(\s|&nbsp;|<br\/?>)+$/, '');
        this.content = currentVal;
        const detail = {
            field: this.fieldName,
            value: currentVal
        };
        this.dispatchEvent(new CustomEvent('fieldChange', { bubbles: true, detail }));
    }
    /**
     * Focus
     */
    focus() {
        this.shadowRoot.querySelector('[contenteditable=true]').focus();
    }
}

window.customElements.define('field-editable', EditableField);

export default EditableField;
