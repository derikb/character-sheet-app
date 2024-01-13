import spellData from '../5e-SRD-Spells.json';
import { getCurrentCharacter } from '../services/CharacterService';

const template = document.createElement('template');
template.innerHTML = `
<link rel="stylesheet" href="./styles.css">
<style>
    .panel {
        display: none;
        flex-direction: column;
    }
    .accordion {
        display: flex;
        align-items: center;
        padding: 4px;
        gap: 4px;
    }
    .accordion-content {
        display: flex;
        justify-content: flex-end;
        gap: 4px;
        align-items: center;
        flex-grow: 1;
        border-radius: 4px;
    }
    .accordion:hover {
        cursor: pointer;
        background-color: #f7f7f7;
    }
    .spell-item-name {
        font-weight: bold;
    }
    .spell-item-add {
        margin-bottom: 0;
    }
    .spell-item-desc {
        padding: 4px;
    }
    .spell-item-hl {
        padding: 4px;
    }
    .spell-item-stats {
        list-style-type: none;
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 4px;
        padding: 4px;
    }
    p {
        max-width: 72ch;
    }
    </style>
<div class="accordion">
    <div class="spell-item-name"></div>
    <div class="accordion-content">
        <button class="spell-item-add">Learn</button>
        <div class="accordion-icon"></div>
    </div>
</div>
<div class="panel">
    <ul class="spell-item-stats">
        <li class="spell-item-range"></li>
        <li class="spell-item-comps"></li>
        <li class="spell-item-dur"></li>
        <li class="spell-item-casting"></li>
        <li class="spell-item-conc"></li>
    </ul>
    <div class="spell-item-desc"></div>
    <div class="spell-item-hl"></div>
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
        this.accordion_content = this.shadowRoot.querySelector('.accordion-content');
        this.accordion_icon = this.shadowRoot.querySelector('.accordion-icon');

        this.panel = this.shadowRoot.querySelector('.panel');
        this.add_button = this.shadowRoot.querySelector('.spell-item-add');
        this.stats = this.shadowRoot.querySelector('.spell-item-stats');
    
        this.accordion.addEventListener('click', this._handleAccordionClick.bind(this));
        this.add_button.addEventListener('click', this._handleAddNewSpell.bind(this));

        this.spell = spellData.filter((spell) => spell.name === this.dataset.name)[0]; // filter returns an array
        this.cur_character = getCurrentCharacter();
        
        this.populateSpellItem();

        this.accordion_icon.innerHTML = '&#8964;';
    }

    disconnectedCallback () {
        this.accordion.removeEventListener('click', this._handleAccordionClick);
        this.add_button.removeEventListener('click', this._handleAddNewSpell);
    }

    _handleAddNewSpell (ev) {
        const level = this.dataset.subfield;

        this.cur_character.setSpells(this.spell, level);
    }

    _handleAccordionClick (ev) {
        if (ev.target === this.add_button) {
            return;
        }

        if (this.panel.style.display === 'flex') {
            this.panel.style.display = 'none';
            this.accordion_icon.innerHTML = '&#8964;';
        } else {
            this.panel.style.display = 'flex';
            this.accordion_icon.innerHTML = '&#8963;';
        }
    }
    /**
     * Populate the content of the spell item
     */
    populateSpellItem () {
        this.spellName = this.spell.name;
        this.spellDesc = this.spell.desc;

        this.spellComps = this.spell.components;
        this.spellDur = this.spell.duration;
        this.spellCasting = this.spell.casting_time;
        this.spellRange = this.spell.range;
        this.spellConcentration = this.spell.concentration;

        if (this.spell.higher_level !== undefined) {
            this.spellHl = this.spell.higher_level;
        }
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
        this.panel.querySelector('.spell-item-hl').innerHTML = `<strong>At Higher Levels:</strong> `;

        value.forEach((val) => {
            const p = document.createElement('p');
            p.innerHTML = val;

            this.panel.querySelector('.spell-item-hl').appendChild(p);
        });
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
        value.forEach((val) => {
            const p = document.createElement('p');
            p.innerHTML = val;

            this.panel.querySelector('.spell-item-desc').appendChild(p);
        });
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
        value = `<strong>Range:</strong> ${value}`;

        this.panel.querySelector('.spell-item-range').innerHTML = value;
    }
    /**
     * Getter: Content of the spell's components
     * @returns {String}
     */
    get spellComps () {
        return this.stats.querySelector('.spell-item-comps').innerHTML;
    }
    /**
     * Setter: Content of the spell's components
     */
    set spellComps (value) {
        this.stats.querySelector('.spell-item-comps').innerHTML = `<strong>Components:</strong> `;

        value.forEach((val) => {
            const span = document.createElement('span');
            span.innerHTML = val;

            this.stats.querySelector('.spell-item-comps').appendChild(span);
        });
    }
    /**
     * Getter: Content of the spell duration
     * @returns {String}
     */
    get spellDur () {
        return this.stats.querySelector('.spell-item-dur').innerHTML;
    }
    /**
     * Setter: Content of the spell duration
     */
    set spellDur (value) {
        value = `<strong>Duration:</strong> ${value}`;

        this.stats.querySelector('.spell-item-dur').innerHTML = value;
    }
    /**
     * Getter: Content of the spell casting time
     * @returns {String}
     */
    get spellCasting () {
        return this.stats.querySelector('.spell-item-casting').innerHTML;
    }
    /**
     * Setter: Content of the spell casting time
     */
    set spellCasting (value) {
        value = `<strong>Casting time:</strong> ${value}`;

        this.stats.querySelector('.spell-item-casting').innerHTML = value;
    }
    /**
     * Getter: Content of the spell concentration
     */
    get spellConcentration () {
        return this.stats.querySelector('.spell-item-conc').innerHTML;
    }
    /**
     * Setter: Content of the spell concentration
     */
    set spellConcentration (value) {
        value = `<strong>Concentration:</strong> ${value}`;

        this.stats.querySelector('.spell-item-conc').innerHTML = value;
    }
}

if (!window.customElements.get('spell-item')) {
    window.customElements.define('spell-item', SpellItem);
}

export default SpellItem;
