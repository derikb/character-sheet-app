/**
 * Editable table.
 */

const template = document.createElement('template');
template.innerHTML = `
<style>
    :host {
        display: table;
        border-collapse: collapse;
        text-align: left;
        border: none;
        width: 100%;
        margin-bottom: 1.5rem;
    }
    :host([hidden]) {
        display: none
    }
    th {
        font-weight: bold;
    }
    tbody tr {
        border-bottom: 1px solid rgb(207,0,15);
        margin-bottom: .25rem;
    }
    th, td {
        padding: .25rem;
    }
    td[contenteditable=true] {
        display: table-cell;
        padding: .25rem;
        margin-bottom: .25rem;
    }
</style>
<thead>
    <tr></tr>
</thead>
<tbody>
</tbody>
<slot></slot>
`;

class TableEditable extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.columns = 0;
    }

    connectedCallback() {
        // set any default attributes?
        if (!this.hasAttribute('role')) {
            this.setAttribute('role', 'table');
        }
        // add event listeners
        this.addEventListener('keypress', this._keyPress);
        this.addEventListener('blur', this._blur);
        this._upgradeProperty('fieldName');
        this.columnNames = this.getAttribute('columns').split('||');
        this.columns = this.columnNames.length;

        const headRow = this.shadowRoot.querySelector('thead tr');
        this.columnNames.forEach((name) => {
            const th = document.createElement('th');
            th.innerHTML = name;
            headRow.appendChild(th);
        });
    }

    disconnectedCallback() {
        // remove event listeners
        this.removeEventListener('keypress', this._keyPress);
        this.removeEventListener('blur', this._blur);
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
     * Setter: field name for data.
     */
    set fieldName (value) {
        this.dataset.name = value;
    }
    /**
     * Getter: field name for data.
     */
    get fieldName() {
        return this.dataset.name || '';
    }
    /**
     * Getter: Content of list items.
     */
    get contentArray() {
        const entries = [];
        const rows = Array.from(this.shadowRoot.querySelectorAll('tbody > tr'));

        rows.forEach((row) => {
            const cells = Array.from(row.querySelectorAll('td'));
            if (cells.length === 0) {
                return;
            }
            const rowData = [];
            cells.forEach((cell) => {
                const text = cell.innerHTML;
                rowData.push(text);
            });
            const filledCells = rowData.filter((el) => { return el !== ''; });
            if (filledCells.length === 0) {
                return;
            }
            entries.push(rowData);
        });
        return entries;
    }
    /**
     * Add a new row to the table.
     * Set its header/text if appropriate.
     * @param {String[]} array
     * @returns {HTMLTableRowElement}
     */
    addRow(content = []) {
        const row = document.createElement('tr');
        const cell = document.createElement('td');
        cell.setAttribute('contenteditable', true);

        for (let i = 0; i < this.columns; i++) {
            const newCell = cell.cloneNode(false);
            newCell.innerHTML = content[i] || '';
            row.appendChild(newCell);
        }
        this.shadowRoot.querySelector('tbody').appendChild(row);
        return row;
    }
    /**
     * Clear out the body rows.
     */
    clear() {
        Array.from(this.shadowRoot.querySelectorAll('tbody > tr')).forEach((row) => {
            row.parentNode.removeChild(row);
        });
    }
    /**
     * Get focused element.
     */
    deepActiveElement() {
        let a = document.activeElement;
        while (a && a.shadowRoot && a.shadowRoot.activeElement) {
          a = a.shadowRoot.activeElement;
        }
        return a;
    }
    /**
     * Handler: Enter to move through the items or add new ones.
     * @param {KeyboardEvent} ev Keypress event
     */
    _keyPress(ev) {
        if (ev.key !== 'Enter' || ev.shiftKey) {
            return;
        }
        // Get the focused element.
        const el = this.deepActiveElement();
        if (el.tagName !== 'TD' && !el.closest(`td`)) {
            return;
        }
        ev.preventDefault();
        const td = el.tagName === 'TD' ? el : el.closest(`td`);
        const row = td.parentElement;
        // if it's not the last cell, move to the next cell.
        if (td !== row.lastElementChild) {
            const nextCell = td.nextElementSibling;
            if (nextCell) {
                nextCell.focus();
            }
            return;
        }
        // it is the last cell.
        // if there is a next row focus its first cell.
        const nextRow = row.nextElementSibling;
        if (nextRow) {
            nextRow.querySelector('td').focus();
            return;
        }
        const newRow = this.addRow();
        newRow.querySelector('td').focus();
    }
    /**
     * On blur dispatch an event so the character model can be updated.
     * @param {Event} ev
     */
    _blur(ev) {
        const detail = {
            field: this.fieldName,
            value: this.contentArray
        };
        this.dispatchEvent(new CustomEvent('fieldChange', { bubbles: true, detail }));
    }
    /**
     * Focus method since HTMLElement doesn't have that by default (I think).
     */
    focus() {
        this.shadowRoot.querySelector('[contenteditable=true]').focus();
    }
}

window.customElements.define('table-editable', TableEditable);

export default TableEditable;
