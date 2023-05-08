/* eslint-disable no-case-declarations */
import Tabs from './Tabs.js';

const template = document.createElement('template');
template.innerHTML = `
<link rel="stylesheet" href="./styles.css">
<header class="page-header">
    <h1 class="pc-charname" aria-label="Character Name"><field-editable data-name="charname" id="page-top" placeholder="Character Name"></field-editable></h1>
</header>
`;
class SheetView extends HTMLElement {
    /**
     * @param {EventEmitter} emitter
     * @param {Node} templateNode Cloned node from child element.
     */
    constructor ({
        emitter = null,
        templateNode = null
    }) {
        super();
        this.emitter = emitter;
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        // Append child node template to header.
        if (templateNode) {
            this.shadowRoot.appendChild(templateNode);
        }
        // Selector hook so we can always find regardless of child class.
        this.dataset.sheetview = 'true';
    }

    connectedCallback () {
        this.mainTabs = new Tabs(this.shadowRoot.querySelector('ul[role=tablist]'));
        // Listen for events emitted from the components
        this.shadowRoot.addEventListener('fieldChange', this._handleFieldChange.bind(this));
        Array.from(this.shadowRoot.querySelectorAll('input[type=number]')).forEach((el) => {
            el.addEventListener('change', this._numberInputChange.bind(this));
        });

        this.emitter.on('tab:switch', this.switchToPane, this);
    }

    disconnectedCallback () {
        // Listen for events emitted from the components
        this.shadowRoot.removeEventListener('fieldChange', this._handleFieldChange.bind(this));
        Array.from(this.shadowRoot.querySelectorAll('input[type=number]')).forEach((el) => {
            el.removeEventListener('change', this._numberInputChange.bind(this));
        });

        this.emitter.off('tab:switch', this.switchToPane, this);

        // Remove footer links.
        const nav = document.querySelector('footer-nav');
        nav.removeLinks();
    }
    /**
     * Override in child to check correct class is set.
     * @param {Character} character
     */
    _validateCharacter (character) {
        throw new Error('Invalid character type for this view.');
    }
    /**
     * @param {Character}
     */
    set character (character) {
        this._validateCharacter(character);
        this.cur_character = character;
        this.emitter.trigger('character:set');
        // render character.
        this.renderCharacter();
    }
    /**
     * @returns {Character}
     */
    get character () {
        return this.cur_character;
    }
    /**
     * Change the main tab pane.
     * @param {String} targetPane
     */
    switchToPane (targetPane) {
        if (!this.mainTabs) {
            return;
        }
        this.mainTabs.switchToPane(targetPane);
    }
    /**
     * Handle setting custom fields.
     * @param {HTMLElement} el Editable element of some type
     * @param {String} fieldName Character field
     * @param {String} subFieldName Character Subfield
     * @param {Any} charValue Character's value for field/subfield.
     * @returns {Boolean}
     */
    _renderCustomFields (el, fieldName, subFieldName, charValue) {
        return false;
    }
    /**
     * Any actions to perform after rendering all the fields.
     */
    _renderCustomPost () {
    }
    /**
     * Take character data and fill it into the page
     */
    renderCharacter () {
        if (this.cur_character === null) {
            return;
        }

        this.shadowRoot.querySelector('[data-name="charname"]').content = this.cur_character.charname;

        const fields = Array.from(this.shadowRoot.querySelectorAll('*[data-name]'));
        fields.forEach((el) => {
            const f = el.getAttribute('data-name');
            if (typeof this.cur_character[f] === 'undefined') {
                return;
            }
            const subf = el.getAttribute('data-subfield');
            const charValue = (subf) ? this.cur_character[f][subf] : this.cur_character[f];
            switch (el.tagName) {
                case 'INPUT':
                case 'TEXTAREA':
                case 'SELECT':
                    // Make sure numbers default to 0.
                    // this is especially relevant for spell slots.
                    if (el.getAttribute('type') === 'number') {
                        el.value = charValue || 0;
                    } else {
                        el.value = charValue || '';
                    }
                    // For spell slot input we need to trigger the display or not of spells
                    const event = new Event('change');
                    el.dispatchEvent(event);
                    break;
                case 'SIMPLE-LIST':
                    el.clear();
                    const listItems = charValue || [];
                    if (listItems.length > 0) {
                        listItems.forEach((item) => {
                            if (item.length === 0) {
                                return;
                            }
                            el.addItem(item);
                        });
                    }
                    el.addItem();
                    break;
                case 'NOTE-LIST':
                    el.clear();
                    const noteItems = charValue || [];
                    if (noteItems.length > 0) {
                        noteItems.forEach((item) => {
                            if (item.length === 0) {
                                return;
                            }
                            el.addItem(item);
                        });
                    }
                    el.addItem();
                    break;
                case 'TABLE-EDITABLE':
                    el.clear();
                    const rowItems = charValue || [];
                    if (rowItems.length > 0) {
                        rowItems.forEach((item) => {
                            if (item.length === 0) {
                                return;
                            }
                            el.addRow(item);
                        });
                    }
                    el.addRow();
                    break;
                case 'FIELD-EDITABLE':
                    el.content = charValue || '';
                    break;

                default:
                    // Custom fields by character type
                    if (!this._renderCustomFields(
                        el,
                        f,
                        subf,
                        charValue
                    )) {
                        // Try for basic content editable.
                        if (el.getAttribute('content-editable') === 'true') {
                            el.innerHTML = charValue || '';
                        }
                    }
            }
        });

        this._renderCustomPost();

        this.emitter.trigger('dialog:save:hide');
    }
    /**
     * Trigger the event to show there are unsaved changes.
     */
    _showUnsavedDialog () {
        this.emitter.trigger('dialog:save:show');
    }
    /**
     * Compare two properties to see if they are different
     * For objects/arrays we need to account for them being different objects
     * that have the same properties and values.
     * @param {String|Number|Array|Object|Boolean} valold Existing property value
     * @param {String|Number|Array|Object|Boolean} valnew New property value
     * @return {Boolean}
     */
    _sameValues (valold, valnew) {
        // for efficiency we could do typeof checks
        // and only use JSON for objects...
        return JSON.stringify(valold) === JSON.stringify(valnew);
    }
    /**
     * Handle field change for those that need special handling.
     * in child
     * @param {CustomEvent} ev
     * @param {String} field Field name
     * @param {String} subfield Subfield name
     * @returns {Boolean} On true return from the parent handler.
     */
    _customFieldChange (ev, field, subfield) {
        return false;
    }
    /**
     * When a field is changed in the UI.
     * Update the character and trigger save dialog
     * Only if the value is actually different.
     * @param {CustomEvent} ev
     */
    _handleFieldChange (ev) {
        const field = ev.detail.field || '';
        const subfield = ev.detail.subfield || '';
        if (!field) {
            return;
        }
        const cur_character = this.cur_character;
        if (typeof cur_character[field] === 'undefined') {
            return;
        }

        if (this._customFieldChange(ev, field, subfield)) {
            return;
        }

        const newValue = ev.detail.value;
        if (subfield) {
            if (typeof cur_character[field] !== 'object' || Array.isArray(cur_character[field])) {
                return;
            }
            const currentVal = cur_character[field][subfield];
            if (!this._sameValues(currentVal, newValue)) {
                cur_character[field][subfield] = ev.detail.value;
                this._showUnsavedDialog();
            }
            return;
        }
        const currentVal = cur_character[field];
        if (!this._sameValues(currentVal, newValue)) {
            cur_character[field] = newValue;
            this._showUnsavedDialog();
        }
    }

    _customNumberInputChange () {
    }
    /**
     * Handle input[name=number] changes.
     * @param {Event} ev
     */
    _numberInputChange (ev) {
        const field = ev.target.dataset.name;
        const subfield = ev.target.dataset.subfield;
        if (typeof this.cur_character[field][subfield] === 'undefined') {
            return;
        }
        const newValue = parseInt(ev.target.value, 10);
        this.cur_character[field][subfield] = newValue;
        this.emitter.trigger('dialog:save:show');

        this._customNumberInputChange(ev);
    }

    navigateTo (id) {
        const el = this.shadowRoot.querySelector(id);
        if (el) {
            el.scrollIntoView();
            // Focus only works sometimes depending on the element...
            // @todo fix that.
            el.focus();
        }
    }
}

if (!window.customElements.get('sheet-view')) {
    window.customElements.define('sheet-view', SheetView);
}

export default SheetView;
