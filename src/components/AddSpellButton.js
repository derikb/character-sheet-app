import spellData from '../5e-SRD-Spells.json';

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
        this.addEventListener('click', function () {});
    }

    disconnectedCallback () {
        this.removeEventListener('click', function () {});
    }

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
                const spellItem = document.customElements.define('spell-item');

                spellItem.dataset.subfield = spellLevel;
                spellItem.dataset.name = spell.name;

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
}

if (!window.customElements.get('add-spell-button')) {
    window.customElements.define('add-spell-button', AddSpellButton);
}

export default AddSpellButton;
