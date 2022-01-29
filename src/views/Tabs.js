// Simple tabs.
class Tabs {
    /**
     * @param {Element} tablist UL element for the tabs.
     */
    constructor (tablist) {
        this.tablist = tablist;
        this.tabs = [];
        this.panes = [];
        if (!tablist) {
            return;
        }
        this.tabs = tablist.querySelectorAll('a[role=tab]');
        this.panes = tablist.parentNode.querySelectorAll(':scope > section[role=tabpanel]');
        Array.from(this.tabs).forEach((tab) => {
            tab.addEventListener('click', this.changeTab.bind(this));
        });
    }
    /**
     * Switch to a specific pane.
     * @param {String} paneId Html id of pane to switch to.
     */
    switchToPane (paneId) {
        let newIndex = -1;
        if (paneId) {
            newIndex = Array.prototype.findIndex.call(this.panes, (el) => {
                return el.id === paneId;
            });
        } else {
            // next one.
            const oldTab = this.tablist.querySelector('[aria-selected=true]');
            const oldIndex = Array.prototype.indexOf.call(this.tabs, oldTab);
            newIndex = oldIndex + 1;
            if (newIndex >= this.tabs.length) {
                newIndex = 0;
            }
        }
        if (newIndex !== -1) {
            this.tabs[newIndex].click();
        }
    }
    /**
     * Handler: Change tabs on tab click.
     * @param {Event} ev Click event.
     */
    changeTab (ev) {
        ev.preventDefault();
        const oldTab = this.tablist.querySelector('[aria-selected=true]');
        if (!oldTab) {
            return;
        }
        const oldIndex = Array.prototype.indexOf.call(this.tabs, oldTab);
        const newTab = ev.currentTarget;
        const newIndex = Array.prototype.indexOf.call(this.tabs, newTab);
        if (oldIndex === newIndex) {
            return;
        }
        oldTab.setAttribute('aria-selected', false);
        newTab.setAttribute('aria-selected', true);
        const oldPane = this.panes[oldIndex];
        if (oldPane) {
            oldPane.hidden = true;
        }
        const newPane = this.panes[newIndex];
        if (!newPane) {
            return;
        }
        newPane.hidden = false;
        // Focus on first field.
        newPane.querySelector('[data-name]').focus();
    }
}

export default Tabs;
