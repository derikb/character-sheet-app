import spellData from '../5e-SRD-Spells.json';
import { getCurrentCharacter } from '../services/CharacterService';

const template = document.createElement('template');
template.innerHTML = `
<link rel="stylesheet" href="./styles.css">
<style>
    .panel {
        display: none;
        flex-direction: column;
        max-width: 644px;
        padding: 8px;
    }
    .accordion {
        display: flex;
        align-items: center;
        padding: 4px;
        gap: 4px;
        max-width: 660px;
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
    </style>
<div class="accordion">
    <div class="spell-item-name"></div>
    <div class="accordion-content">
        <span class="spell-item-added"></span>
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
        this.#setupElements();
    }

    connectedCallback () {
        this.#loadData();
        this.#populateSpellItem();

        this.#setupEventListeners();
    }

    disconnectedCallback () {
        this.#removeEventListeners();
    }

    // Group together html elements for readability
    #setupElements () {
        this.elements = {
            accordion: this.shadowRoot.querySelector('.accordion'),
            accordion_icon: this.shadowRoot.querySelector('.accordion-icon'),
            panel: this.shadowRoot.querySelector('.panel'),
            add_button: this.shadowRoot.querySelector('.spell-item-add'),
            stats: this.shadowRoot.querySelector('.spell-item-stats'),
            spell_range: this.shadowRoot.querySelector('.spell-item-range'),
            spell_components: this.shadowRoot.querySelector('.spell-item-comps'),
            spell_duration: this.shadowRoot.querySelector('.spell-item-dur'),
            spell_casting: this.shadowRoot.querySelector('.spell-item-casting'),
            spell_concentration: this.shadowRoot.querySelector('.spell-item-conc'),
            spell_name: this.shadowRoot.querySelector('.spell-item-name'),
            spell_description: this.shadowRoot.querySelector('.spell-item-desc'),
            spell_higher_level: this.shadowRoot.querySelector('.spell-item-hl'),
            added_indicator: this.shadowRoot.querySelector('.spell-item-added')
        };
    }

    #setupEventListeners () {
        this.elements.accordion.addEventListener('click', this._handleAccordionClick.bind(this));
        this.elements.add_button.addEventListener('click', this._handleAddNewSpell.bind(this));
    }

    #removeEventListeners () {
        this.elements.accordion.removeEventListener('click', this._handleAccordionClick);
        this.elements.add_button.removeEventListener('click', this._handleAddNewSpell);
    }
    
    #loadData () {
        this.cur_character = getCurrentCharacter();
        this.spell = spellData.filter((spell) => spell.name === this.dataset.name)[0]; // filter returns an array
        this.elements.accordion_icon.innerHTML = '&#8964;'; // down-chevron
    }

    // Declutters #populateSpellItem
    #setElementContent (selector, content) {
        this.elements[selector].innerHTML = content;
    }
    
    /**
     * Populate the content of the spell item
     */
    #populateSpellItem () {
        const spell = this.spell;

        this.#setElementContent('spell_name', `<b>${spell.name}</b>`);
        this.#setElementContent('spell_range', `<b>Range:</b> ${spell.range}`);
        this.#setElementContent('spell_components', `<b>Components:</b> ${spell.components}`);
        this.#setElementContent('spell_duration', `<b>Duration:</b> ${spell.duration}`);
        this.#setElementContent('spell_casting', `<b>Casting Time:</b> ${spell.casting_time}`);
        // Break up each section of the spell description
        this.#setElementContent('spell_description', `<b>Description:</b><br> ${spell.desc.join('<br><br>')}`);
        
        if (spell.concentration) {
            this.#setElementContent('spell_concentration', `<b><i>Requires Concentration</i></b>`);
        }

        if (spell.higher_level !== undefined) {
            this.#setElementContent('spell_higher_level', `<b>At Higher Levels:</b><br> ${spell.higher_level}`);
        }
    }

    #updateAddedIndicator () {
        const characterSpells = this.cur_character.getSpells(this.dataset.subfield);
        const spellWasAdded = characterSpells.includes(this.spell.name);

        if (spellWasAdded) {
            this.#setElementContent('added_indicator', `<i>Added &#10003;</i>`);
        };
    }

    _handleAddNewSpell (ev) {
        const level = this.dataset.subfield;

        this.cur_character.setSpells(this.spell, level);
        this.#updateAddedIndicator();
    }

    _handleAccordionClick (ev) {
        // Prevent the dropdown from opening on add
        if (ev.target === this.elements.add_button) {
            return;
        }

        const panelStyle = this.elements.panel.style;

        panelStyle.display = panelStyle.display === 'flex' ? 'none' : 'flex';
        this.elements.accordion_icon.innerHTML = panelStyle.display === 'flex' ? '&#8963;' : '&#8964;'; // up chevron and down chevron
    }
}

if (!window.customElements.get('spell-item')) {
    window.customElements.define('spell-item', SpellItem);
}

export default SpellItem;
