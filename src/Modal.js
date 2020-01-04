/**
 * Modal
 */
class Modal {
    /**
     * @prop {HTMLElement} el DOMElement for the modal.
     * @prop {HTMLElement} opener The element that was active when the Modal opened.
     * @prop {Function} boundOutsideClickClose Handler closes modal when user clicks outside it.
     * @prop {Function} boundKeyboardEvents Handler for keyboard events.
     */
    constructor(el) {
        this.el = el;
        if (!this.el.classList.contains('dialog')) {
            this.el.classList.add('dialog');
        }
        if (this.el.getAttribute('role') !== 'dialog') {
            this.el.setAttribute('role', 'dialog');
        }
        this.el.addEventListener('click', (ev) => {
            if (ev.target.classList.contains('close')) {
                // Close button click
                ev.preventDefault();
                this.close();
                this.clear();
            }
        });
    }
    /**
     * Is the modal open or not
     */
    get isOpen() {
        return !this.el.hidden;
    }
    /**
     * Return a close button to use
     * @returns {HTMLElement} button.close
     */
    getCloseButton() {
        const button = document.createElement('button');
        button.setAttribute('type', 'button');
        button.classList.add('close');
        button.textContent = 'Close';
        return button;
    }
    /**
     * Get the first focusable element in the modal.
     * @returns {HTMLElement|null}
     */
    findFirstFocusable() {
        const focusable = this.el.querySelector('a, button, input, textarea, *[tabindex="-1"], *[contenteditable=true]');
        return focusable;
    }
    /**
     * Get the first tabbing focusable element in the modal.
     * @returns {HTMLElement|null}
     */
    findFirstTabFocusable() {
        const focusable = this.el.querySelector('a, button, input, textarea, *[contenteditable=true]');
        return focusable;
    }
    /**
     * Return last focusable element in the modal.
     * @returns {HTMLElement|null}
     */
    findLastTabFocusable() {
        const focusables = this.el.querySelectorAll('a, button, input, textarea, *[contenteditable=true]');
        return focusables[focusables.length - 1];
    }
    /**
     * Find first focusable element in modal and focus on it.
     */
    focusFirst() {
        const focusable = this.el.querySelector('a, button, input, textarea, *[tabindex="-1"], *[contenteditable=true]');
        if (focusable) {
            focusable.focus();
        }
    }
    /**
     * Open/show Modal
     */
    open() {
        if (this.isOpen) {
            return;
        }
        this.opener = document.activeElement;
        this.el.hidden = false;
        this.focusFirst();
        // We need to do this to be able to remove the listener later.
        this.boundOutsideClickClose = this.outsideClickClose.bind(this);
        document.addEventListener('click', this.boundOutsideClickClose, true);
        this.boundKeyboardEvents = this.keyboardEvents.bind(this);
        this.el.addEventListener('keydown', this.boundKeyboardEvents, true)
    }
    /**
     * Close/hide modal
     */
    close() {
        this.el.hidden = true;
        // Remove click handler to close modal.
        document.removeEventListener('click', this.boundOutsideClickClose, true);
        document.removeEventListener('keydown', this.boundKeyboardEvents, true);
        if (this.opener) {
            this.opener.focus();
        }
    }
    /**
     * Add content to modal, open it, focus on it.
     * @param {Array|HTMLElement} content single element or Array of elements
     * @param {Boolean} includeCloseButton Include a close button at the bottom.
     */
    setContent(content, includeCloseButton = true) {
        if (!Array.isArray(content)) {
            content = [content];
        }
        this.clear(); // make sure we start empty
        const f = document.createDocumentFragment();
        content.forEach((el) => {
            f.appendChild(el);
        });
        if (includeCloseButton) {
            f.appendChild(this.getCloseButton());
        }
        this.el.appendChild(f);
        this.open();
    }
    /**
     * Clear the modal (and close it)
     */
    clear() {
        while (this.el.firstChild) {
            this.el.removeChild(this.el.firstChild);
        }
    }
    /**
     * Close and clear contents.
     */
    closeClear() {
        this.close();
        this.clear();
    }
    /**
     * Handler: Clicks outside modal close the modal.
     * @param {MouseEvent} ev Click event.
     */
    outsideClickClose(ev) {
        const close = ev.target.closest('.dialog');
        if (close === null) {
            if (ev.target.classList.contains('btn-dialog')) {
                return;
            }
            // Hide the help.
            this.close();
            this.clear();
        }
    }
    /**
     * Handler: Keyboard events to:
     * - Close on Esc
     * - Trap tab focus into modal.
     * @param {KeyboardEvent} ev Keydown event
     */
    keyboardEvents(ev) {
        if (ev.key === 'Escape') {
            this.close();
        }
        if (ev.key !== 'Tab') {
            return;
        }
        if (ev.shiftKey) {
            // Shift tab, only concerned with first element.
            if (ev.target === this.findFirstFocusable() || ev.target === this.findFirstTabFocusable()) {
                const focusable = this.findLastTabFocusable();
                if (focusable) {
                    ev.preventDefault();
                    focusable.focus();
                }
            }
        } else {
            // Tab, only concerned with last element.
            if (ev.target === this.findLastTabFocusable()) {
                const focusable = this.findFirstFocusable();
                if (focusable) {
                    ev.preventDefault();
                    focusable.focus();
                }
            }
        }
    }
};

export default Modal;
