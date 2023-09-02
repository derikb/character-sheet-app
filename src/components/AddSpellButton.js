import spellData from '../5e-SRD-Spells.json';
import { getCurrentCharacter } from '../services/CharacterService';

const template = document.createElement('template');
template.innerHTML = `
<link rel="stylesheet" href="./styles.css">
<button type="button" class="btn btn-plain btn-sm" data-level="4">
    Add Spell
</button>
`;

class AddSpellButton extends HTMLElement {
    constructor () {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback () {
        this.cur_character = getCurrentCharacter();
        this.addEventListener('click', this._handleClick.bind(this));
    }

    disconnectedCallback () {
        this.removeEventListener('click', this._handleClick.bind(this));
    }

    // Opens the spell modal
    _handleClick (ev) {
        this.spellDialog = this.spellDialog || document.getElementById('dialog-spells');
        this.spellDialog.clear();

        if (this.spellDialog.isOpen) {
            this.spellDialog.close();
            return;
        };

        const modal = document.getElementById('spellModal');
        const content = document.importNode(modal.content, true);
        const list = content.querySelector('ul');
        const spellLevel = ev.target.dataset.level;

        try {
            const spells = spellData.filter((spell) => spell.level === Number(spellLevel));

            spells.forEach(spell => {
                // const spellItem = document.createElement('div');
                // const accordion = document.createElement('div');
                // const panel = document.createElement('div');

                // accordion.classList.add('accordion');
                // accordion.innerHTML = `
                //     <div class="spell-item-name">${spell.name}</div>
                //     <button class="spell-item-add">Add</button>
                // `;

                // panel.classList.add('panel');
                // panel.innerHTML = `
                //     <p>${spell.desc}</p>
                // `;
                // panel.style.display = 'none';

                // spellItem.appendChild(accordion);
                // spellItem.appendChild(panel);
                
                // accordion.addEventListener('click', this._handleAccordionClick.bind(this));

                // const button = spellItem.querySelector('button.spell-item-add');
                
                // button.dataset.subfield = spellLevel;
                // button.dataset.name = spell.name;

                // button.addEventListener('click', this._handleAddNewSpell.bind(this));
                const spellItem = document.createElement('spell-item');

                spellItem.dataset.name = spell.name;
                spellItem.dataset.subfield = spell.level;

                list.appendChild(spellItem);
            });
        } catch (error) {
            console.log(error);
            const item = document.createElement('div');
            item.innerText = 'Unable to access this resource at the moment.';
            list.appendChild(item);
        };

        this.spellDialog.setContent([...content.children]);
        this.spellDialog.open();
    }

    _handleAddNewSpell (ev) {
        const level = ev.target.dataset.subfield;
        const name = ev.target.dataset.name;
        // filter returns array
        const spell = spellData.filter((spell) => spell.name === name)[0];

        this.cur_character.setSpells(spell, level);
    };

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
}

if (!window.customElements.get('add-spell-button')) {
    window.customElements.define('add-spell-button', AddSpellButton);
}

export default AddSpellButton;
