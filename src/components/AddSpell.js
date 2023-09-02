import spellData from '../5e-SRD-Spells.json';
import { getCurrentCharacter } from '../services/CharacterService';

const template = document.createElement('template');
template.innerHTML = `
<style>
    div {
        overflow: hidden;
        display: none;
    }
</style>
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
        this.accordion = this.shadowRoot.querySelector('div.accordion');
        this.panel = this.shadowRoot.querySelector('div.panel');
        this.add_button = this.shadowRoot.querySelector('button.spell-item-add');
    
        this.accordion.addEventListener('click', this._handleOpenAccordion);

        this.cur_character = getCurrentCharacter();
        
        this._renderSpellItems();
    }

    disconnectedCallback () {
        this.accordion.removeEventListener('click');
    }

    _renderSpellItems () {
        const name = this.dataset.name;

        const spell = spellData.filter((spell) => spell.name === name)[0];
        console.log(spell);

        const spellName = this.shadowRoot.querySelector('span.spell-item-name');
        const content = document.createElement('p');
        content.innerText = name;

        spellName.appendChild(content);
        // this.shadowRoot.querySelector('spell-item-name').innerText = spell;
    }

    _handleOpenAccordion () {
        if (this.panel.style.display === 'block') {
            this.panel.style = 'none';
        } else {
            this.panel.style = 'block';
        }
    }

    _handleAddNewSpell (ev) {
        const field = ev.target.dataset.field; // spells
        const subfield = ev.target.dataset.subfield; // spell level
        const spellName = ev.target.dataset.name;

        if (typeof this.cur_character[field][subfield] === 'undefined') {
            return;
        };

        const spell = spellData.filter((spell) => spell.name === spellName)[0]; // filter returns array

        const value = this.cur_character[field][subfield];
        const newValue = [...value, spell];
        const newLength = this.cur_character.spell_slots[subfield] + 1;

        this.cur_character.spell_slots[subfield] = newLength;
        this.cur_character[field][subfield] = newValue;

        this.emitter.trigger('character:update:spells');
    };
}

if (!window.customElements.get('spell-item')) {
    window.customElements.define('spell-item', SpellItem);
}

export { SpellItem };

class AddSpell {
    constructor (el, cur_character, emitter) {
        this.el = el;
        this.cur_character = cur_character;
        this.emitter = emitter;
        this.el.addEventListener('click', this._openSpellModal.bind(this));
    };

    /**
     * @param {string} spellLevel
     * @returns array containing the index, name, and url
     */
    // async getSpellData (spellLevel) {
    //    const apiUrl = `https://www.dnd5eapi.co/api/spells?level=${spellLevel}&school=illusion&school=abjuration&school=conjuration&school=divination&school=enchantment&school=evocation&school=necromancy&school=psionic&school=transmutation`;
    //    const response = await fetch(apiUrl, { method: 'GET' });
    //    const { results } = await response.json();

    //    if (!response.ok) {
    //        throw new Error('Error fetching API resource.');
    //    };

    //    return results; // index, name, and url
    // };

    /**
    * @param {event} ev
    */
    // async _openSpellModal (ev) {
    //     this.spellDialog = this.spellDialog || document.getElementById('dialog-spells');
    //     this.spellDialog.clear();

    //     if (this.spellDialog.isOpen) {
    //         this.spellDialog.close();
    //         return;
    //     };

    //     const template = document.getElementById('spellModal');
    //     const content = document.importNode(template.content, true);
    //     const list = content.querySelector('ul');
    //     const spellLevel = ev.target.dataset.level;

    //     try {
    //         const spells = spellData.filter((spell) => spell.level === Number(spellLevel));

    //         spells.forEach(spell => {
    //             const item = document.createElement('div');
    //             const button = document.createElement('button');
    //             const spellName = spell.name;

    //             button.innerText = spell.name;
    //             button.dataset.field = 'spells';
    //             button.dataset.subfield = spellLevel;
    //             button.dataset.name = spellName;
    //             button.classList.add('btn', 'btn-plain');
    
    //             button.addEventListener('click', this._handleAddNewSpell.bind(this));

    //             item.appendChild(button);
    //             list.appendChild(item);
    //         });
    //     } catch (error) {
    //         console.log(error);
    //         const item = document.createElement('div');
    //         item.innerText = 'Unable to access this resource at the moment.';
    //         list.appendChild(item);
    //     };

    //     this.spellDialog.setContent([...content.children]);
    //     this.spellDialog.open();
    // };

    /**
    * @param {event} ev
    */
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
};

if (!window.customElements.get('add-spell')) {
    window.customElements.define('add-spell', AddSpell);
}

export default AddSpell;
