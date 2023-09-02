import spellData from '../5e-SRD-Spells.json';
import { getCurrentCharacter } from '../services/CharacterService';

const template = document.createElement('template');
template.innerHTML = `
<div class="accordion">
    <div class="spell-item-name"></div>
    <button class="spell-item-add">Add</button>
</div>
<div class="panel"></div>
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
    
        this.accordion.addEventListener('click', this._handleOpenAccordion);

        this.spell = spellData.filter((spell) => spell.name === this.dataset.name)[0];
        this.cur_character = getCurrentCharacter();
        
        this.populateSpellItem();
    }

    disconnectedCallback () {
        this.accordion.removeEventListener('click');
    }

    populateSpellItem () {
        const nameElem = this.accordion.querySelector('.spell-item-name');

        nameElem.innerHTML = this.spell.name;
    }

    _handleAddNewSpell (ev) {
        const level = ev.target.dataset.subfield;
        // const name = ev.target.dataset.name;

        this.cur_character.setSpells(this.spell, level);
    }

    _handleAccordionClick (ev) {
        const target = ev.target.nextElementSibling;

        if (!target.classList.contains('panel')) {
            return;
        }
        
        if (target.style.display === 'block') {
            target.style.display = 'none';
        } else {
            target.style.display = 'block';
        }
    }

    // _renderSpellItems () {
    //     const name = this.dataset.name;

    //     const spell = spellData.filter((spell) => spell.name === name)[0];
    //     console.log(spell);

    //     const spellName = this.shadowRoot.querySelector('span.spell-item-name');
    //     const content = document.createElement('p');
    //     content.innerText = name;

    //     spellName.appendChild(content);
    //     // this.shadowRoot.querySelector('spell-item-name').innerText = spell;
    // }

    _handleOpenAccordion () {
        if (this.panel.style.display === 'block') {
            this.panel.style = 'none';
        } else {
            this.panel.style = 'block';
        }
    }

    // _handleAddNewSpell (ev) {
    //     const field = ev.target.dataset.field; // spells
    //     const subfield = ev.target.dataset.subfield; // spell level
    //     const spellName = ev.target.dataset.name;

    //     if (typeof this.cur_character[field][subfield] === 'undefined') {
    //         return;
    //     };

    //     const spell = spellData.filter((spell) => spell.name === spellName)[0]; // filter returns array

    //     const value = this.cur_character[field][subfield];
    //     const newValue = [...value, spell];
    //     const newLength = this.cur_character.spell_slots[subfield] + 1;

    //     this.cur_character.spell_slots[subfield] = newLength;
    //     this.cur_character[field][subfield] = newValue;

    //     this.emitter.trigger('character:update:spells');
    // };
}

if (!window.customElements.get('spell-item')) {
    window.customElements.define('spell-item', SpellItem);
}

export default SpellItem;
