/**
 * Help dialog.
 */
const HelpDialog = {
    /**
     * Dialog element
     */
    el: document.getElementById('dialog_help'),
    /**
     * Help button
     */
    opener: document.querySelector('.btn-help'),
    /**
     * Close button
     */
    closer: document.querySelector('#dialog_help .close'),
    /**
     * Add events
     */
    initialize: function () {
        // Event: click opener
        this.opener.addEventListener('click', (e) => {
            this.el.hidden = false;
            this.el.querySelector('h1').focus();
        });
        // Event: click closer
        this.closer.addEventListener('click', (e) => {
            this.el.hidden = true;
        });
        // Event: click outside help dialog to close it
        document.body.addEventListener('click', (e) => {
            const close = e.target.closest('#dialog_help');
            if (close === null) {
                if (e.target.classList.contains('btn-help')) { return; }
                // Hide the help.
                this.el.hidden = true;
            }
        });
    }
};

export default HelpDialog;
