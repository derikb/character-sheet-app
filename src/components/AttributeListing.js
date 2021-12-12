/**
 * Attribute score/bonus/saves.
 */

const template = document.createElement('template');
template.innerHTML = `
<style>
    :host {
        display: block;
        margin-bottom: .75rem;
        white-space: nowrap;
    }
    :host([hidden]) {
        display: none
    }
    label {
        display: inline-block;
        margin-right: 1rem;
        width: auto;
        font-weight: bold;
    }
    label:first-of-type {
        width: 2rem;
    }
    input[type=number] {
        display: inline-block;
        margin-right: 1rem;
        width: 3rem;
        border: 1px dotted #bbb;
        border-radius: .4rem;
        padding: 0;
        font-size: 1rem;
    }
    input[type=checkbox] {
        width: auto;
        margin-right: 0.5rem;
        display: inline-block;
    }
    .pc-attribute-mod, .pc-save-mode {
        display: inline-block;
        margin-right: 1rem;
        font-weight: bold;
        min-width: 1.5rem;
        text-align: right;
    }
</style>
<label for="score"><slot></slot></label>
<input type="number" id="score" class="pc-attribute" value=10 min=3 max=25 />
<span class="pc-attribute-mod">0</span>
<label>
    <input type="checkbox" name="pc-save" value=1 />
    Save
</label>
<span class="pc-save-mod small">0</span>
`;

class AttributeListing extends HTMLElement {
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

        this.scoreInput = this.shadowRoot.querySelector('input.pc-attribute');
        this.saveCheck = this.shadowRoot.querySelector('input[name="pc-save"]');

        // add event listeners
        this.saveCheck.addEventListener('change', this._checkSave);
        this.scoreInput.addEventListener('change', this._scoreUpdate);
    }

    disconnectedCallback () {
        // remove event listeners
        this.saveCheck.removeEventListener('change', this._checkSave);
        this.scoreInput.removeEventListener('change', this._scoreUpdate);
    }
    /**
     * Name of the skill based on the data-name attribute.
     * @returns {String}
     */
    get attributeName () {
        return this.dataset.name || '';
    }
    /**
     * Set attribute name.
     * @param {String} val
     */
    set attributeName (val) {
        this.dataset.name = val;
    }
    /**
     * Get current attribute score.
     * @returns {Number}
     */
    get attributeScore () {
        return parseInt(this.scoreInput.value, 10);
    }
    /**
     * Set the attribute score.
     * @param {Number} val
     */
    set attributeScore (val) {
        this.scoreInput.value = val;
    }
    /**
     * Get if the save is proficient.
     * @returns {Number}
     */
    get saveProficiency () {
        return this.saveCheck.checked ? 1 : 0;
    }
    /**
     * Check (or not) the save proficiency.
     * @param {Number} val
     */
    set saveProficiency (val) {
        this.saveCheck.checked = (val);
    }
    /**
     * Set the attribute modifier.
     * @param {String} val
     */
    set attributeMod (val) {
        this.shadowRoot.querySelector('.pc-attribute-mod').innerHTML = val;
    }
    /**
     * Set the save modifier.
     * @param {String} mod
     */
    set saveMod (mod) {
        this.shadowRoot.querySelector('.pc-save-mod').innerHTML = mod;
    }
    /**
     * Handler: Change event on saves.
     * @param {Event} ev
     */
    _checkSave (ev) {
        const host = this.getRootNode().host;

        const detail = {
            field: host.attributeName,
            value: ev.target.checked ? 1 : 0
        };
        host.dispatchEvent(new CustomEvent('saveChange', { bubbles: true, detail }));
    }
    /**
     * Handler: Change event on number input.
     * @param {Event} ev
     */
    _scoreUpdate (ev) {
        const host = this.getRootNode().host;
        const detail = {
            field: host.attributeName,
            value: ev.target.value
        };
        host.dispatchEvent(new CustomEvent('attributeChange', { bubbles: true, detail }));
    }
    /**
     * Focus method since HTMLElement doesn't have that by default (I think).
     */
    focus () {
        this.shadowRoot.querySelector('input').focus();
    }
}

window.customElements.define('attr-listing', AttributeListing);

export default AttributeListing;
