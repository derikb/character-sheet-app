/**
 * @prop {Object} events Store the events here.
 * @prop {Boolean} debug So you can more easily in dev see when events are triggered.
 */
export default class EventEmitter {
    constructor () {
        this.events = {};
        this.debug = false;
    }
    /**
     * Get index of listener in the event array.
     * -1 means it isn't there
     * @param {String} event Event to check.
     * @param {Function} listener Listener to check.
     * @return {Number}
     */
    listenerIndex (event, listener) {
        return this.events[event].findIndex((item) => {
            return item.listener === listener;
        });
    }
    /**
     * Listen to an event
     * @param {String} event Name of the event to listen for.
     * @param {Function|Array} listener Callback to trigger for event OR an array of [classname, methodName]
     * @param {Object} boundObj Object to bind the callback to.
     * @return {undefined}
     */
    on (event, listener, boundObj = null) {
        if (typeof listener !== 'function') {
            return;
        }
        this.events[event] = this.events[event] || [];
        if (this.events[event].length > 0) {
            const index = this.listenerIndex(event, listener);
            // Replace the listener if it already exists.
            if (index > -1) {
                this.events[event].splice(index, 1);
            }
        }
        this.events[event].push({ listener: listener, boundObj: boundObj });
    }
    /**
     * Stop listening to an event.
     * Remove event if it was the last listener.
     * @param {String} event Name of the event.
     * @param {Function} listener Callback to remove.
     * @return {undefined}
     */
    off (event, listener) {
        if (Array.isArray(this.events[event])) {
            const index = this.listenerIndex(event, listener);
            if (index === -1) {
                return;
            }
            this.events[event].splice(index, 1);
            if (this.events[event].length === 0) {
                delete this.events[event];
            }
        }
    }
    /**
     * Listen for an event but only trigger it once, then it is removed.
     * @param {String} event Name of the event to listen for.
     * @param {Function} listener Callback to trigger for event.
     * @param {Object} boundObj Object to bind the callback to.
     */
    once (event, listener, boundObj) {
        this.on(event, function wrap () {
            this.off(event, wrap);
            const binder = typeof boundObj === 'undefined' ? this : boundObj;
            listener.apply(binder, arguments);
        });
    }
    /**
     * Trigger an event. This will cause any listeners for that event to be called.
     * Any arguments after the event will be passed on to the callback(s).
     * @param {String} event Event to trigger.
     */
    trigger (event) {
        if (this.debug && console) {
            console.log(`EventEmitter triggered: ${event}`);
        }
        const args = [].slice.call(arguments, 1);

        if (Array.isArray(this.events[event])) {
            this.events[event].forEach((listenObj) => {
                const binder = listenObj.boundObj === null ? this : listenObj.boundObj;
                listenObj.listener.apply(binder, args);
            });
        }
    };
};
