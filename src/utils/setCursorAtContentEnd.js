/**
 * Set the cursor to the end of the content.
 * Call after setting focus on el
 * @param {HTMLElement} el Element that is contenteditable=true
 */
const setCursorAtContentEnd = function (el) {
    const theNodes = el.childNodes;
    if (theNodes.length === 0) {
        return;
    }
    const contentRange = document.createRange();
    const windowSelection = window.getSelection();
    // Remove any previously created ranges
    windowSelection.removeAllRanges();
    contentRange.setStartBefore(theNodes[0]);
    contentRange.setEndAfter(theNodes[theNodes.length - 1]);
    contentRange.collapse(false);
    // add the range to a window selection object.
    windowSelection.addRange(contentRange);
    windowSelection.collapseToEnd();
};

export default setCursorAtContentEnd;
