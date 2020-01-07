/**
 * Handing keyboard shortcuts.
 */
class ShortCutKeys {
    /**
     * @param {EventEmitter} emitter
     */
    constructor (emitter) {
        this.emitter = emitter;
        this.shortcuts = {};
        document.addEventListener('keydown', this.checkShortCuts.bind(this));
    }
    /**
     * Add a shortcut that triggers an event.
     * @param {String} keys Key Combo use 'Ctrl+' and 'Shift+' to indicate those keys.
     * @param {String} event Event to emit.
     */
    addShortCut(keys, event) {
        this.shortcuts[keys] = event;
    }
    /**
     * Generate the key combo as a string.
     * @param {String} key Key pressed.
     * @param {Boolean} withControl Was control pressed.
     * @param {Boolean} withShift Was shift pressed.
     */
    getKeyCode(key, withControl, withShift) {
        let code = '';
        if (withControl) {
            code += 'Ctrl+';
        }
        if (withShift) {
            code += 'Shift+';
        }
        code += key;
        return code;
    }
    /**
     * Handler: Keydown event.
     * @param {KeyboardEvent} ev Keydown
     */
    checkShortCuts(ev) {
        let withControl = false;
        let withShift = false;
        if (ev.ctrlKey) {
            withControl = true;
        }
        if (ev.shiftKey) {
            withShift = true;
        }
        let key = ev.key;
        const code = this.getKeyCode(key, withControl, withShift);
        var event = this.shortcuts[code] || null;
        if (event) {
            ev.preventDefault();
            ev.stopPropagation();
            this.emitter.trigger(event);
        }
    }
}

export default ShortCutKeys;
