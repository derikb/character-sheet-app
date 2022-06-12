/**
 * Container for skill check boxes and data.
 */

const template = document.createElement('template');
template.innerHTML = `
<link rel="stylesheet" href="./styles.css">
<style>
    :host {
        display: block;
        margin-bottom: .25rem;
        white-space: nowrap;
    }
    :host([hidden]) {
        display: none
    }
    label {
        display: inline-block;
        margin-right: 1rem;
    }
    input[type=checkbox] {
        width: auto;
        margin-right: 0.5rem;
        display: inline-block;
    }
    button {
        background-color: var(--primary-color, black);
        color: white;
        border: none;
        padding: 0.25rem 0.5rem;
        margin: 0 0 -1rem 1rem;
        clip-path: polygon(50% 0%, 95% 25%, 95% 75%, 50% 95%, 5% 75%, 5% 25%);
        height: 1.25rem;
        width: 1.25rem;
    }
</style>
<label>
    <input type="checkbox" value=1 data-name="skills" />
    <input type="checkbox" value=1 data-name="expert" aria-label="Skill Expertise" disabled />
    <span class="pc-skill-name"><slot>Unknown Skill</slot></span>
</label>
<span class="pc-skill-mod">0</span>
<button type="button" data-die="1d20" aria-label="Skill check"></button>
`;

class SkillListing extends HTMLElement {
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

        this.profCheck = this.shadowRoot.querySelector('input[data-name="skills"]');
        this.expertCheck = this.shadowRoot.querySelector('input[data-name="expert"]');
        // add event listeners
        this.profCheck.addEventListener('change', this._checkSkills.bind(this));
        this.expertCheck.addEventListener('change', this._checkExpert.bind(this));
        this.shadowRoot.querySelector('button').addEventListener('click', this._skillCheck.bind(this));
    }

    disconnectedCallback () {
        // remove event listeners
        this.profCheck.removeEventListener('change', this._checkSkills.bind(this));
        this.expertCheck.removeEventListener('change', this._checkExpert.bind(this));
        this.shadowRoot.querySelector('button').removeEventListener('click', this._skillCheck.bind(this));
    }
    /**
     * Name of the skill based on the data-subfield attribute.
     * @returns {String}
     */
    get skillName () {
        return this.dataset.subfield || '';
    }
    /**
     * Set skill name.
     * @param {String} val
     */
    set skillName (val) {
        this.dataset.subfield = val;
    }
    get skillLabel () {
        return this.shadowRoot.querySelector('.pc-skill-name').innerHTML;
    }
    /**
     * Set human readable label
     * @param {String} val
     */
    set skillLabel (val) {
        this.shadowRoot.querySelector('.pc-skill-name').innerHTML = val;
    }

    get skillValue () {
        if (!this.profCheck.checked) {
            return 0;
        }
        return this.expertCheck.checked ? 2 : 1;
    }
    /**
     * Set skill proficiency/expert status.
     * @param {Number} val
     */
    set skillValue (val) {
        this.profCheck.checked = false;
        this.expertCheck.checked = false;
        if (val > 0) {
            this.profCheck.checked = true;
            this.expertCheck.disabled = false;
        }
        if (val > 1) {
            this.expertCheck.checked = true;
        }
    }
    get skillMod () {
        return this.shadowRoot.querySelector('.pc-skill-mod').innerHTML;
    }
    /**
     * Set the skill modifiter.
     * @param {String} mod
     */
    set skillMod (mod) {
        this.shadowRoot.querySelector('.pc-skill-mod').innerHTML = mod;
    }
    /**
     * Handler when proficiency is (un)checked.
     * @param {Event} ev
     */
    _checkSkills (ev) {
        // change event for checkboxes
        // check data-name of check.
        const expert = this.expertCheck;
        if (!ev.target.checked) {
            expert.checked = false;
            expert.disabled = true;
        } else {
            expert.disabled = false;
        }

        const detail = {
            field: 'skills',
            subfield: this.skillName,
            value: ev.target.checked ? 1 : 0
        };
        this.dispatchEvent(new CustomEvent('fieldChange', { bubbles: true, detail }));
    }
    /**
     * Handler when expert is (un)checked.
     * @param {Event} ev
     */
    _checkExpert (ev) {
        // change event for checkboxes
        // check data-name of check.
        const detail = {
            field: 'skills',
            subfield: this.skillName,
            value: ev.target.checked ? 2 : 1
        };
        this.dispatchEvent(new CustomEvent('fieldChange', { bubbles: true, detail }));
    }
    /**
     * Roll a skill check.
     * @param {ClickEvent} ev
     */
    _skillCheck (ev) {
        const roller = document.querySelector('sheet-view-5e').shadowRoot.querySelector('dice-roller');
        if (!roller) {
            return;
        }
        const mod = this.skillMod;
        const die = `1d20${mod !== '0' ? mod : ''}`;
        roller.roll(die);
    }
    /**
     * Focus method since HTMLElement doesn't have that by default (I think).
     */
    focus () {
        this.shadowRoot.querySelector('input').focus();
    }
}

window.customElements.define('skill-listing', SkillListing);

export default SkillListing;
