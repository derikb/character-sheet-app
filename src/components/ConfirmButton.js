// Confirmation button (i.e. "Are you sure" after first click.)
const template = document.createElement('template');
template.innerHTML = `
<style>
    :host {
        display: inline-block;
        transition: background-color 500ms;
    }
    :host([data-triggered="false"]) slot[name="default"] {
        display: inline;
    }
    :host([data-triggered="true"]) slot[name="default"] {
        display: none;
    }
    :host([data-triggered="false"]) slot[name="confirm"] {
        display: none;
    }
    :host([data-triggered="true"]) slot[name="confirm"] {
        display: inline;
    }
</style>
<slot name="default"><span>Submit</span></slot>
<slot name="confirm"><span>Are you sure?</span></slot>
`;

class ConfirmButton extends HTMLElement {
    constructor () {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this._wait = 3000;
        // Default to not triggered
        this._triggered = false;
        // Default to asking for confirmation.
        this._confirm = true;
        // No default callback after confirmation.
        this._confirmCallback = null;
        this.shadowRoot.host.dataset.triggered = 'false';
        // Accessible role
        this.shadowRoot.host.setAttribute('role', 'button');
    }
    connectedCallback () {
        // Add focus-ability if it has not already been set in the html.
        if (this.shadowRoot.host.getAttribute('tabindex') === null) {
            this.shadowRoot.host.setAttribute('tabindex', 0);
        }
        // click handler
        this.addEventListener('click', this._handleClick);
        // space/enter handler to simulate normal button
        this.addEventListener('keydown', this._handleKeyDown);
        this._wait = parseInt(this.shadowRoot.host.dataset.wait || 3000, 10);
        // Allow for setting the confirm click feature to be disabled.
        // Only set this here if the data attribute is explicitly set
        // else it will overwrite the property set on the class directly.
        if (this.shadowRoot.host.dataset.confirm !== undefined) {
            this._confirm = !(this.shadowRoot.host.dataset.confirm === 'false');
        }
        // Unhide slotted content now that the button is loaded.
        // CSS will handle this now based on data-triggered.
        Array.from(this.children).forEach((slotted) => {
            slotted.hidden = false;
        });
        if (this._confirmCallback) {
            this.addEventListener('click', this._confirmCallback);
        }
    }
    disconnectedCallback () {
        this.removeEventListener('click', this._handleClick);
        this.removeEventListener('keydown', this._handleKeyDown);
        if (this._confirmCallback) {
            this.removeEventListener('click', this._confirmCallback);
        }
    }
    /**
     * Update display when triggered value changes.
     * @param {Boolean|String} value
     */
    set triggered (value) {
        const newValue = !!value;
        if (this._triggered === newValue) {
            return;
        }
        this._triggered = newValue;
        // Update data-triggered so the css changes what text is displayed.
        if (this._triggered) {
            this.shadowRoot.host.dataset.triggered = 'true';
        } else {
            this.shadowRoot.host.dataset.triggered = 'false';
        }
    }
    get triggered () {
        return this._triggered;
    }
    get confirm () {
        return this._confirm;
    }
    /**
     * Set if the confirm button/click should be used.
     */
    set confirm (value) {
        this._confirm = !!value;
    }

    get confirmCallback () {
        return this._confirmCallback;
    }
    /**
     * Set confirm callback here if you need to set it _before_ putting the button in the DOM.
     * This assures it is triggered after the default event handler.
     */
    set confirmCallback (func) {
        if (typeof func === 'function') {
            this._confirmCallback = func;
        }
    }
    /**
     * Clicking.
     * @param {Event} ev Click event on element.
     */
    _handleClick (ev) {
        if (!this.triggered && this._confirm) {
            // stop any other events from happening
            ev.preventDefault();
            ev.stopImmediatePropagation();
            this.triggered = true;
            // wait a bit then reset.
            setTimeout(() => {
                this.triggered = false;
            }, this._wait);
        }
        // let any other events happen if triggered was true
        // whatever other listeners have been added to the click.
    }
    /**
     * Handle button or space to trigger.
     * @param {KeyboardEvent} ev
     */
    _handleKeyDown (ev) {
        if ((ev.key !== 'Enter' && ev.key !== ' ') || ev.shiftKey) {
            return;
        }
        // Prevent things like space bar trigger scrolling while focused on the button.
        ev.preventDefault();
        this.shadowRoot.host.click();
    }
    /**
     * Use to reset the button from external code.
     */
    reset () {
        this.triggered = false;
    }
}

window.customElements.define('confirm-button', ConfirmButton);

export default ConfirmButton;
