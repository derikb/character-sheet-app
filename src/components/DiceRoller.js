import { getDiceResult } from 'rpg-table-randomizer/src/dice_roller.js';

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
    align-items: stretch;
    justify-content: center;
}

.dice-display {
    border: 1px solid var(--primary-color, black);
    border-radius: .5rem;
    padding: .5rem;
    margin-left: 2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex: 1 1 auto;
}

#dice-bonus {
    background-color: #efefef;
    border-radius: .5rem;
    padding: .5rem;
}

.result {
    margin: 0 1rem;
    font-size: 1.5em;
}

button {
    font-size: inherit;
    background-color: var(--primary-color, black);
    color: white;
    border: none;
    border-radius: .5rem;
    margin-bottom: 0;
    flex: 0 1 auto;
}
</style>
<button type="button" class="btn-roll" aria-label="Roll 1d20" aria-controls="dice-result">1d20</button>
<div class="dice-display">
    <span id="dice-bonus"></span>
    <span id="dice-result" class="result" aria-live="assertive" aria-label="1d20 roll result"></span>
    <button type="button" class="btn-reset" aria-label="Reset result" aria-controls="dice-result">x</button>
</div>
`;

class DiceRoller extends HTMLElement {
    constructor () {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.resultDiv = this.shadowRoot.getElementById('dice-result');
        this.bonusDiv = this.shadowRoot.getElementById('dice-bonus');
        this.rollButton = this.shadowRoot.querySelector('button.btn-roll');
        this.resetButton = this.shadowRoot.querySelector('button.btn-reset');
        // Default to d20
        this.die = '1d20';
        // Bonus to roll
        this._bonus = '';
        // Default to empty
        this._result = '';

        // Accessible role
        // What role should this have?
        // this.shadowRoot.host.setAttribute('role', 'button');
    }
    connectedCallback () {
        if (this.dataset.die) {
            this.die = this.dataset.die;
        }
        if (this.dataset.result) {
            this.result = this.dataset.result;
        }
        if (this.dataset.bonus) {
            this.bonus = this.dataset.bonus;
        }
        // click handler
        this.rollButton.addEventListener('click', this._handleRoll.bind(this));
        this.resetButton.addEventListener('click', this.reset.bind(this));
    }
    disconnectedCallback () {
        this.rollButton.removeEventListener('click', this._handleRoll.bind(this));
        this.resetButton.removeEventListener('click', this.reset.bind(this));
    }
    /**
     * Roll the result.
     * @param {Event} ev Click event on element.
     */
    _handleRoll (ev) {
        const roll = getDiceResult(`${this.die}${this.bonus}`);
        this.result = roll.value;
    }

    _updateLabels () {
        this.rollButton.setAttribute('aria-label', `Roll ${this._die}${this._bonus}`);
        this.resultDiv.setAttribute('aria-label', `${this._die}${this._bonus} roll result`);
    }

    get die () {
        return this._die;
    }
    set die (value) {
        // Should this validate?
        this._die = value;
        this.rollButton.innerText = this._die;
        this._updateLabels();
    }

    get result () {
        return this._result;
    }
    set result (value) {
        this._result = value;
        this.resultDiv.innerText = this._result;
    }

    get bonus () {
        return this._bonus;
    }
    set bonus (val) {
        const regex = /^[+-]?[0-9]*$/ig;
        if (!val.match(regex)) {
            return;
        }
        if (val === '0') {
            val = '';
        }
        this._bonus = val;
        this.bonusDiv.innerText = val;
        this._updateLabels();
    }
    /**
     * Reset the roll
     */
    reset () {
        this.result = '';
    }
}

if (!window.customElements.get('dice-roller')) {
    window.customElements.define('dice-roller', DiceRoller);
}

export default DiceRoller;
