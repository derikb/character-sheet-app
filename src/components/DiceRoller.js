import { getDiceResult, DiceResult } from 'rpg-table-randomizer/src/dice_roller.js';
import Die from './Die.js';

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
<slot name="rollbuttons"></slot>
<div id="dice-result" class="result" aria-live="assertive"></div>
<button type="button" class="btn-reset" aria-controls="dice-result">Clear</button>
`;

class DiceRoller extends HTMLElement {
    constructor () {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this._dice = [];
    }
    connectedCallback () {
        this.resultDiv = this.shadowRoot.getElementById('dice-result');
        this.resetButton = this.shadowRoot.querySelector('button.btn-reset');

        this._upgradeProperty('dice');

        // Remove event from child Die elements.
        this.shadowRoot.addEventListener('dice:remove', this._removeDie.bind(this));
        // Click handler for slotted buttons
        Array.from(this.children).forEach((buttons) => {
            buttons.addEventListener('click', this._handleRoll.bind(this));
        });
        // Clear all dice
        this.resetButton.addEventListener('click', this.reset.bind(this));
    }
    disconnectedCallback () {
        this.shadowRoot.removeEventListener('dice:remove', this._removeDie.bind(this));
        Array.from(this.children).forEach((buttons) => {
            buttons.removeEventListener('click', this._handleRoll.bind(this));
        });
        this.resetButton.removeEventListener('click', this.reset.bind(this));
    }
    /**
     * In case the property was set before connecting
     * this makes sure the value is retrieved and then reset so that the setter will get used.
     * @param {String} prop
     */
    _upgradeProperty (prop) {
        if (Object.prototype.hasOwnProperty.call(this, prop)) {
            const value = this[prop];
            delete this[prop];
            this[prop] = value;
        }
    }
    /**
     * Roll a result from an internal event
     * @param {Event} ev Click event on element.
     */
    _handleRoll (ev) {
        const button = ev.target;
        const die = button.dataset.die || '';
        const roll = getDiceResult(`${die}`);
        this._addDie(roll);
    }
    /**
     * Handle roll from external to the component.
     * @param {String} die
     */
    roll (die = '1d6') {
        const roll = getDiceResult(die);
        this._addDie(roll);
    }
    /**
     * @returns {Die[]}
     */
    get dice () {
        return this._dice;
    }
    /**
     * Resets dice to passed ones.
     * @param {Die[]} value
     */
    set dice (value) {
        if (!Array.isArray(value)) {
            throw Error('Dice must be array');
        }
        this._dice = value;
        this.resultDiv.innerHTML = '';
        this._dice.forEach((die) => {
            if (!(die instanceof Die)) {
                return;
            }
            this.resultDiv.appendChild(die);
        });
    }
    /**
     * @param {DiceResult} diceResult
     */
    _addDie (diceResult) {
        const die = new Die();
        die.die = diceResult.die;
        die.result = diceResult.value;
        this._dice.push(die);
        this.resultDiv.appendChild(die);
    }
    /**
     * @param {CustomEvent} ev
     */
    _removeDie (ev) {
        ev.stopImmediatePropagation();
        const die = ev.detail.die || null;
        if (!die) {
            return;
        }
        const index = this._dice.findIndex((d) => d === die);
        if (index < 0) {
            return;
        }
        const dieEl = this._dice[index];
        this.resultDiv.removeChild(dieEl);
        this._dice.splice(index, 1);
        // this.dice = this.dice.filter((d) => d !== die);
    }
    /**
     * Reset the rolls
     */
    reset () {
        this.dice = [];
    }
}

if (!window.customElements.get('dice-roller')) {
    window.customElements.define('dice-roller', DiceRoller);
}

export default DiceRoller;
