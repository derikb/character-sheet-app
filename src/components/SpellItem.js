import spellData from '../5e-SRD-Spells.json';
import { getCurrentCharacter } from '../services/CharacterService';

const template = document.createElement('template');
template.innerHTML = `
<style>
    .panel {
        display: none;
    }
</style>
<div class="accordion">
    <div class="spell-item-name"></div>
    <button class="spell-item-add">Add</button>
</div>
<div class="panel">
    <p class="spell-item-desc"></p>
    <p class="spell-item-hl"></p>
    <span class="spell-item-range"></span>
</div>
`;

class SpellItem extends HTMLElement {
    constructor () {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback () {
        this.accordion = this.shadowRoot.querySelector('.accordion');
        this.panel = this.shadowRoot.querySelector('.panel');
        this.add_button = this.shadowRoot.querySelector('.spell-item-add');
    
        this.accordion.addEventListener('click', this._handleAccordionClick);
        this.add_button.addEventListener('click', this._handleAddNewSpell.bind(this));

        this.spell = spellData.filter((spell) => spell.name === this.dataset.name)[0]; // filter returns an array
        this.cur_character = getCurrentCharacter();
        
        this.populateSpellItem();
    }

    disconnectedCallback () {
        this.accordion.removeEventListener('click', this._handleAccordionClick);
        this.add_button.removeEventListener('click', this._handleAddNewSpell);
    }
    /**
     * Getter: Content of spell name
     * @returns {String}
     */
    get spellName () {
        return this.accordion.querySelector('.spell-item-name').innerHTML;
    }
    /**
     * Setter: Content of spell name
     */
    set spellName (value) {
        this.accordion.querySelector('.spell-item-name').innerHTML = value;
    }
    /**
     * Getter: Content of spell's higher-level-casting
     * @returns {String}
     */
    get spellHl () {
        return this.panel.querySelector('.spell-item-hl').innerHTML;
    }
    /**
     * Setter: Content of spell's higher-level-casting
     */
    set spellHl (value) {
        this.panel.querySelector('.spell-item-hl').innerHTML = value;
    }
    /**
     * Getter: Content of spell range
     * @returns {String}
     */
    get spellRange () {
        return this.panel.querySelector('.spell-item-range').innerHTML;
    }
    /**
     * Setter: Content of spell range
     */
    set spellRange (value) {
        this.panel.querySelector('.spell-item-range').innerHTML = value;
    }
    /**
     * Getter: Content of spell description
     * @returns {String}
     */
    get spellDesc () {
        return this.panel.querySelector('.spell-item-desc').innerHTML;
    }
    /**
     * Setter: Content of spell description
     */
    set spellDesc (value) {
        this.panel.querySelector('.spell-item-desc').innerHTML = value;
    }

    _handleAddNewSpell (ev) {
        const level = this.dataset.subfield;

        this.cur_character.setSpells(this.spell, level);
    }

    _handleAccordionClick (ev) {
        const target = ev.target.nextElementSibling;

        if (target === null || !target.classList.contains('panel')) {
            return;
        }
        
        if (target.style.display === 'block') {
            target.style.display = 'none';
        } else {
            target.style.display = 'block';
        }
    }
    /**
     * Populate the content of the spell item
     */
    populateSpellItem () {
        this.spellName = this.spell.name;
        this.spellRange = this.spell.range;
        this.spellDesc = this.spell.desc;

        if (this.spell.higher_level !== undefined) {
            this.spellHl = this.spell.higher_level;
        }
    }
}

if (!window.customElements.get('spell-item')) {
    window.customElements.define('spell-item', SpellItem);
}

export default SpellItem;
