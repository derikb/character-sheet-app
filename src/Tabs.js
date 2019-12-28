// Simple tabs.
class Tabs {
    /**
     * @param {Element} tablist UL element for the tabs.
     */
    constructor (tablist) {
        this.tablist = tablist;
        this.tabs = tablist.querySelectorAll('a[role=tab]');
        this.panes = tablist.parentNode.querySelectorAll(':scope > section[role=tabpanel]');
        Array.from(this.tabs).forEach((tab) => {
            tab.addEventListener('click', this.changeTab.bind(this));
        });
    }

    changeTab(ev) {
        ev.preventDefault();
        var oldTab = this.tablist.querySelector('[aria-selected=true]');
        var oldIndex = Array.prototype.indexOf.call(this.tabs, oldTab);
        var newTab = ev.currentTarget;
        var newIndex = Array.prototype.indexOf.call(this.tabs, newTab);
        if (oldIndex === newIndex) {
            return;
        }
        oldTab.setAttribute('aria-selected', false);
        newTab.setAttribute('aria-selected', true);
        var oldPane = this.panes[oldIndex];
        if (oldPane) {
            oldPane.hidden = true;
        }
        var newPane = this.panes[newIndex];
        if (!newPane) {
            return;
        }
        newPane.hidden = false;
        // Focus on first field.
        newPane.querySelector('[contenteditable=true]').focus();
    }
}


export default Tabs;
