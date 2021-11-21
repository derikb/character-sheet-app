/**
 * Container for skill check boxes and data.
 */

const template = document.createElement('template');
template.innerHTML = `
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
</style>
<label>
    <input type="checkbox" value=1 data-name="skills" />
    <input type="checkbox" value=1 data-name="expert" aria-label="Skill Expertise" disabled />
    <span class="pc-skill-name"><slot>Unknown Skill</slot></span>
</label>
<span class="pc-skill-mod">0</span>
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
        this.profCheck.addEventListener('change', this._checkSkills);
        this.expertCheck.addEventListener('change', this._checkExpert);
    }

    disconnectedCallback () {
        // remove event listeners
        this.profCheck.removeEventListener('change', this._checkSkills);
        this.expertCheck.removeEventListener('change', this._checkExpert);
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
        console.log(ev.target);
        console.log(ev.currentTarget);
        const host = this.getRootNode().host;
        // change event for checkboxes
        // check data-name of check.
        const expert = host.expertCheck;
        if (!ev.target.checked) {
            expert.checked = false;
            expert.disabled = true;
        } else {
            expert.disabled = false;
        }

        const detail = {
            field: 'skills',
            subfield: host.skillName,
            value: ev.target.checked ? 1 : 0
        };
        host.dispatchEvent(new CustomEvent('fieldChange', { bubbles: true, detail }));
    }
    /**
     * Handler when expert is (un)checked.
     * @param {Event} ev
     */
    _checkExpert (ev) {
        console.log(ev.target);
        console.log(ev.currentTarget);
        // change event for checkboxes
        // check data-name of check.
        const host = this.getRootNode().host;

        const detail = {
            field: 'skills',
            subfield: host.skillName,
            value: ev.target.checked ? 2 : 1
        };
        host.dispatchEvent(new CustomEvent('fieldChange', { bubbles: true, detail }));
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
