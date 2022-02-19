import Dragger from '../utils/dragger.js';
import { randomInteger } from 'rpg-table-randomizer/src/randomizer.js';

const template = document.createElement('template');
template.innerHTML = `
<link rel="stylesheet" href="./styles.css">
<style>
:host {
    padding: .25rem;
    font-size: 1.5rem;
    background-color: hsla(351, 100%, 95%, 1);
    position: fixed;
    border: .25rem solid var(--primary-color, black);
    border-radius: .5rem;
    height: 5rem;
    width: 5rem;
    text-align: center;
    font-weight: bold;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    box-shadow: 7px 7px 5px 0px rgba(50, 50, 50, 0.5);
    z-index: 10;
}

div {
    flex: 5 1 auto;
    /** Make sure number is centered vertically */
    display: flex;
    align-items: center;
}

small {
    font-size: 0.9rem;
    font-weight: normal;
    flex: 1 2 auto;
    line-height: .5;
}

button {
    font-size: 1rem;
    background-color: var(--primary-color, black);
    color: white;
    border: none;
    border-radius: 2rem;
    margin-bottom: 0;
    padding: 0 0 0.125rem 0.125rem;
    flex: 0 1 auto;
    line-height: 1;
    margin-left: .5rem;
    width: 2rem;
    height: 2rem;
    position: absolute;
    top: -1rem;
    right: -1rem;
}
</style>
<div></div>
<small></small>
<button type="button" class="btn-remove" aria-label="Remove die">&times;</button>
`;

class Die extends HTMLElement {
    constructor () {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.resultDiv = this.shadowRoot.querySelector('div');
        // Default to d6
        this._die = '1d6';
        // Default to empty
        this._result = '';
        this._coords = [0, 0];
    }
    connectedCallback () {
        this.removeButton = this.shadowRoot.querySelector('button.btn-remove');
        this.dragger = new Dragger({
            dragElement: this
        });

        this._upgradeProperty('die');
        this._upgradeProperty('result');
        this._upgradeProperty('coords');
        this._updateLabels();
        this.removeButton.addEventListener('click', this.remove.bind(this));
        const [x1, y1] = this.coords;
        if (x1 === 0 && y1 === 0) {
            // Offset from the parent roller.
            // @todo code to avoid collisions, particular with the "roller"
            // offset from the dice-roller parent.
            let { x, y } = this.getRootNode().host.getBoundingClientRect();
            x = x + randomInteger(-200, 200);
            y = y + randomInteger(-200, 200);
            this.coords = [x, y];
        }
        this.dragger.enableDrag();
    }
    disconnectedCallback () {
        this.removeButton.removeEventListener('click', this.remove.bind(this));
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
     * Update accessible label on component
     */
    _updateLabels () {
        this.setAttribute('aria-label', `${this.die} roll result: ${this.result}`);
        this.shadowRoot.querySelector('small').innerText = `${this.die}`;
    }

    get die () {
        return this._die;
    }
    set die (value) {
        // Should this validate?
        this._die = value;
        this._updateLabels();
    }

    get result () {
        return this._result;
    }
    set result (value) {
        this._result = value;
        this.resultDiv.innerText = this._result;
        this._updateLabels();
    }

    get coords () {
        return this._coords;
    }

    set coords ([x, y]) {
        // @todo this could be cleaned up a lot.
        if (x < 0) {
            x = 0;
        }
        if (x > window.innerWidth) {
            x = window.innerWidth - this.offsetWidth;
        }
        if (y < 0) {
            y = 0;
        }
        if (y > window.innerHeight) {
            y = window.innerHeight - this.offsetHeight;
        }
        this._coords = [x, y];
        this.style.left = `${x}px`;
        this.style.top = `${y}px`;
        this.style.bottom = 'auto';
        this.style.right = 'auto';
    }
    /**
     * Remove the die.
     */
    remove () {
        this.dispatchEvent(
            new CustomEvent(
                'dice:remove',
                {
                    bubbles: true,
                    detail: {
                        die: this
                    }
                }
            )
        );
    }
}

if (!window.customElements.get('dice-single')) {
    window.customElements.define('dice-single', Die);
}

export default Die;
