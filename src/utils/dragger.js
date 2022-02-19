/**
 * Class for handling dragging an HTMLElement around the screen.
 *
 * @prop {Number} _startX X coordinate in pixels of drag event when it starts.
 * @prop {Number} _startY Y coordinate in pixels of drag event when it starts.
 * @prop {Number} _startPosX Offset in pixels for the Element when drag starts.
 * @prop {Number} _startPosY Offset in pixels for the Element when drag starts.
 * @prop {Number} _startWidth Starting width of element for resize.
 * @prop {Number} _startHeight Starting height of element for resize.
 * @prop {Boolean} enabled Are dragging events currently enabled.
 * @prop {Function} doDragCallback Bound callback for the drag event.
 * @prop {Function} stopDragCallback Bound callback for the stop drag event.
 * @prop {Function} doResizeCallback Bound callback for the resize event.
 * @prop {Function} stopResizeCallback Bound callback for the stop resize event.
 * @prop {Function} callbackStartDrag Custom callback for when a drag starts. Passed the: dragElement, handleSelector.
 */
export default class Dragger {
    /**
     * @prop {HTMLElement} dragElement Element to drag around.
     * @prop {String} handleSelector Selector for the child element inside dragElement which activates dragging. Don't make this a button.
     */
    constructor ({
        dragElement = null,
        handleSelector = null
    }) {
        this.dragElement = dragElement;
        if (!(this.dragElement instanceof HTMLElement)) {
            throw new Error('Dragger.dragElements must be HTMLElement');
        }
        this.handleSelector = handleSelector;

        // By binding all these we make sure they can be removed properly.
        this.initDragBound = this.initDrag.bind(this);
        this.doDragCallback = this.doDrag.bind(this);
        this.stopDragCallback = this.stopDrag.bind(this);

        this._startX = null;
        this._startY = null;
        this._startPosX = null;
        this._startPosY = null;
        this._startWidth = null;
        this._startHeight = null;
        this.enabled = false;
        this.callbackStartDrag = null;
    }
    /**
     * Get the x position of the mouse/touch.
     * @param {Event} ev Drag or touch Event
     * @return {Number}
     */
    getEventX (ev) {
        return (ev.type.toLowerCase().indexOf('touch') === 0) ? ev.touches[0].clientX : ev.clientX;
    }
    /**
     * Get the y position of the mouse/touch.
     * @param {Event} ev Drag or touch Event
     * @return {Number}
     */
    getEventY (ev) {
        return (ev.type.toLowerCase().indexOf('touch') === 0) ? ev.touches[0].clientY : ev.clientY;
    }
    /**
     * Move the box as we drag
     * @param {Event} ev Drag or touch Event
     */
    doDrag (ev) {
        ev.preventDefault();
        // Adjust the node coords based on how much the event moved.
        this.dragElement.coords = [
            this._startPosX + (this.getEventX(ev) - this._startX),
            this._startPosY + (this.getEventY(ev) - this._startY)
        ];
    }
    /**
     * Stop the drag, make sure the box is visible, clean up.
     */
    stopDrag () {
        // make sure it isn't off the map.
        if (typeof this.dragElement.adjustForParentBounds === 'function') {
            this.dragElement.adjustForParentBounds();
        }
        // save it's location now that the drag is over.
        if (typeof this.dragElement.saveCoords === 'function') {
            this.dragElement.saveCoords();
        }
        document.documentElement.removeEventListener('mousemove', this.doDragCallback, false);
        document.documentElement.removeEventListener('touchmove', this.doDragCallback, false);
        document.documentElement.removeEventListener('mouseup', this.stopDragCallback, false);
        document.documentElement.removeEventListener('touchend', this.stopDragCallback, false);
    }
    /**
     * Start a drag action
     * @param {Event} ev Event for mouse down or touchstart
     */
    initDrag (ev) {
        // Stop on center/right clicks.
        if (ev.button > 1) {
            return;
        }
        ev.preventDefault();
        ev.stopPropagation();
        this._startX = this.getEventX(ev);
        this._startY = this.getEventY(ev);
        [this._startPosX, this._startPosY] = this.dragElement.coords;
        if (this.callbackStartDrag !== null) {
            this.callbackStartDrag(this.dragElement, this.handleSelector);
        }
        document.documentElement.addEventListener('mousemove', this.doDragCallback, false);
        document.documentElement.addEventListener('touchmove', this.doDragCallback, false);
        document.documentElement.addEventListener('mouseup', this.stopDragCallback, false);
        document.documentElement.addEventListener('touchend', this.stopDragCallback, false);
    }
    /**
     * Remove events stop dragging from working.
     */
    disableDrag () {
        if (!this.enabled) {
            return;
        }
        this.dragElement.removeEventListener('mousedown', this.initDragBound, false);
        this.dragElement.removeEventListener('touchstart', this.initDragBound, false);
        const dragHandle = this.handleSelector === ''
            ? this.dragElement
            : this.dragElement.querySelector(this.handleSelector);
        if (dragHandle !== null) {
            dragHandle.style.cursor = 'auto';
        }
        this.enabled = false;
    }
    /**
     * Re-add events starts dragging working again.
     */
    enableDrag () {
        if (this.enabled) {
            return;
        }
        this.dragElement.addEventListener('mousedown', this.initDragBound, false);
        this.dragElement.addEventListener('touchstart', this.initDragBound, false);
        const dragHandle = this.handleSelector === ''
            ? this.dragElement
            : this.dragElement.querySelector(this.handleSelector);
        if (dragHandle !== null) {
            dragHandle.style.cursor = 'move';
        }
        this.enabled = true;
    }
};
