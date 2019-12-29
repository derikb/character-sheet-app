/**
 * Alert:
 * Main method for showing warnings and other interactions that need prominent placement/attention
 */
const Alert = {
    /**
     * The DOMElement for the alert
     * @prop {HTMLElement}
     */
    el: null,
    /**
     * Find first focusable element in alert and focus on it.
     */
    focusFirst: function() {
        const focusable = this.el.querySelector('a, button, input, textarea, *[tabindex="-1"], *[contenteditable=true]');
        if (focusable) {
            focusable.focus();
        }
    },
    /**
     * Add content to alert
     * @param {Array|HTMLElement} content single element or Array of elements
     */
    setContent: function (content) {
        if (!Array.isArray(content)) {
            content = [content];
        }
        this.clear(); // make sure we start with an empty alert
        const f = document.createDocumentFragment();
        content.forEach((el) => {
            f.appendChild(el);
        });
        const btn = document.createElement('button');
        btn.setAttribute('type', 'button');
        btn.classList.add('close');
        btn.textContent = 'Close';
        f.appendChild(btn);
        this.el.appendChild(f);
        this.el.hidden = false;
        this.focusFirst();

        // We need to do this to be able to remove the listener later.
        this.boundOutsideClickClose = this.outsideClickClose.bind(this);
        document.addEventListener('click', this.boundOutsideClickClose, true);
    },
    /**
     * Clear the alert (which makes it disappear)
     */
    clear: function () {
        this.el.hidden = true;
        while (this.el.firstChild) {
            this.el.removeChild(this.el.firstChild);
        }
        document.removeEventListener('click', this.boundOutsideClickClose, true);
    },
    /**
     * Handler: Clicks outside modal close the modal.
     * @param {Event} ev Click event.
     */
    outsideClickClose: function(ev) {
        console.log('outsideClickClose');
        const close = ev.target.closest('.dialog');
        console.log(close);
        if (close === null) {
            if (ev.target.classList.contains('btn-dialog')) { return; }
            // Hide the help.
            this.clear();
        }
    },
    /**
     * Setup some events, etc.
     */
    initialize: function () {
        this.el = document.querySelector('.alert-main');
        this.el.addEventListener('click', (e) => {
            if (e.target.classList.contains('close')) {
                // close button click
                e.preventDefault();
                this.clear();
            }
        });
    }
};

export default Alert;
