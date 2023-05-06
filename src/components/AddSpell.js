
const template = document.createElement('template');
template.innerHTML = `
<link rel="stylesheet" href="./styles.css">
<style>
:host {
    display: block;
    padding: .5rem;
    font-size: 1.125rem;
    background-color: white;
    display: flex;
    align-items: baseline;
    position: relative;
    flex-wrap: wrap;
}

button {
    font-size: inherit;
    background-color: var(--primary-color, black);
    color: white;
    border: none;
    border-radius: .5rem;
    margin-left: 1rem;
    flex: 0 1 auto;
}
</style>
`;

class AddSpell {
    constructor (el, cur_character) {
        this.el = el;
        this.cur_character = cur_character;
        this.el.addEventListener('click', this._openSpellModal.bind(this));
    };

    async getSpellData (spellLevel) {
        const apiUrl = `https://www.dnd5eapi.co/api/spells?level=${spellLevel}&school=illusion&school=abjuration&school=conjuration&school=divination&school=enchantment&school=evocation&school=necromancy&school=psionic&school=transmutation`;
        const response = await fetch(apiUrl, { method: 'GET' });
        const { results } = await response.json();

        return results; // index, name, and url
    };

    async _openSpellModal (ev) {
        console.log(this);
        this.spellDialog = this.spellDialog || document.getElementById('dialog-spells');
        this.spellDialog.clear();

        if (this.spellDialog.isOpen) {
            this.spellDialog.close();
            return;
        };

        const template = document.getElementById('spellModal');
        const content = document.importNode(template.content, true);
        const list = content.querySelector('ul');
        const spellLevel = ev.target.dataset.level;
        const spells = await this.getSpellData(spellLevel);

        spells.forEach(spell => {
            const item = document.createElement('div');
            item.innerHTML = `
            <div>
                <p>${spell.name}</p>
                <button class="btn btn-plain" data-subfield=${spellLevel} data-name=${spell.name}>Add</button>
            </div>
            `;
            list.appendChild(item);
        });

        this.spellDialog.setContent([...content.children]);
        this.spellDialog.querySelector('button').addEventListener('click', this._handleAddNewSpell(ev));
        this.spellDialog.open();
    };

    _handleAddNewSpell (ev) {
        const field = 'spells';
        const subfield = ev.target.dataset.subfield;
        const spellName = ev.target.dataset.name;

        if (typeof this.cur_character[field][subfield] === 'undefined') {
            return;
        };

        const value = this.cur_character[field][subfield];
        const newValue = [...value, spellName];
        this.cur_character[field][subfield] = newValue;
    }
};

if (!window.customElements.get('add-spell')) {
    window.customElements.define('add-spell', AddSpell);
}

export default AddSpell;
