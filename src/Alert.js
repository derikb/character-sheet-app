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
    },
    /**
     * Clear the alert (which makes it disappear)
     */
    clear: function () {
        this.el.hidden = true;
        while (this.el.firstChild) {
            this.el.removeChild(this.el.firstChild);
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
