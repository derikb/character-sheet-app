
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
<slot name="add-spell"></slot>
`;

class AddSpell extends HTMLElement {
    constructor () {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    };

    connectedCallback () {
        Array.from(this.children).forEach((buttons) => {
            buttons.addEventListener('click', this._handleClick.bind(this));
        });
    };

    disconnectedCallback () {
        Array.from(this.children).forEach((buttons) => {
            buttons.removeEventListener('click', this._handleClick.bind(this));
        });
    };

    async getSpellData () {
        // GET API
        const apiUrl = 'https://www.dnd5eapi.co/api/spells?level=1&level=2&level=3&level=4&level=5&level=6&level=7&level=8&level=9&school=illusion&school=abjuration&school=conjuration&school=divination&school=enchantment&school=evocation&school=necromancy&school=psionic&school=transmutation';
        const response = await fetch(apiUrl, { method: 'GET' });
        const { count, results } = await response.json();

        return results; // index, name, and url
        // create new element(s)
        // append to dom
    }

    async createNewElements () {

    }

    _handleClick () {

    };

    _handleInput () {

    };

    _handleAddNewSpell () {

    }
};

if (!window.customElements.get('add-spell')) {
    window.customElements.define('add-spell', AddSpell);
}

export default AddSpell;
