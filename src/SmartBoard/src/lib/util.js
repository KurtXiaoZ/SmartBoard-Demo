import { DataCenter } from "./DataCenter";
const dataCenter = new DataCenter();

export const alignState = {
    left: null,
    top: null,
    x: null,
    y: null,
}

/**
 * Pick some properties from an object
 * @param {Object} obj              Original object
 * @param {Array.<String>} props    properties to be picked
 * @returns the picked properties
 */
export function pickFromObj(obj, props) {
    if(!obj || !props || props.length === 0) return {};
    let res = {};
    props.forEach((prop) => {
        if(obj[prop]) res[prop] = obj[prop];
    });
    return res;
}

/**
 * Get the position of an element
 * @param {Number} left      'x' of the element          
 * @param {Number} top       'y' of the element
 * @param {Number} width     width of the element
 * @param {Number} height    height of the element
 * @returns the position in left, right, top, bottom
 */
export function getPos(left, top, width, height) {
    return {
        left: left,
        right: left + width,
        top: top,
        bottom: top + height
    }
}

/**
 * Get offsetHeight of an element
 * @param {Object} ref      ref of the element
 * @returns offset height of the element
 */
export function getHeight(ref) {
    return ref?.current?.clientHeight || 0;
}

/**
 * Get offsetWidth of an element
 * @param {Object} ref      ref of the element
 * @returns offset width of the element
 */
 export function getWidth(ref) {
    return ref?.current?.clientWidth || 0;
}

/**
 * Initialize an action
 * @param {Event} event             the mousedown event
 * @param {Function} onMouseMove    mousemove handler
 * @param {Function} onMouseUp      mouseup handler
 * @param {Object} ref              ref of item
 * @param {Number} left             left of item
 * @param {Number} top              top of item
 * @param {String} itemId           id of item
 */
export function initAction(event, onMouseMove, onMouseUp, ref, left, top, itemId) {
    dataCenter.initXY = { x: event.clientX, y: event.clientY };
    dataCenter.initPos = { left, right: left + getWidth(ref), top, bottom: top + getHeight(ref) };
    dataCenter.curPos = {left, right: left + getWidth(ref), top, bottom: top + getHeight(ref), itemId};
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
}

/**
 * Clean up an action
 * @param {Function} onMouseMove    mousemove handler
 * @param {Function} onMouseUp      mouseup handler
 */
export function cleanUpAction(onMouseMove, onMouseUp) {
    dataCenter.initXY.x = 0;
    dataCenter.initXY.y = 0;
    dataCenter.initPos = { left: 0, right: 0, top: 0, bottom: 0 };
    dataCenter.curPos = {left: null, right: null, top: null, bottom: null, itemId: null};
    dataCenter.alignState = {left: null, right: null, top: null, bottom: null, leftX: null, rightX: null, topY: null, bottomY: null}
    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('mouseup', onMouseUp);
}

/**
 * Get bounds of item
 * @param {Object} bounds           user input
 * @param {Number} boardWidth       width of smartboard
 * @param {Number} boardHeight      height of smartboard
 * @returns bounds of item
 */
export function getBounds(bounds, boardWidth, boardHeight) {
    const { left = 0, right = boardWidth, top = 0, bottom = boardHeight } = bounds || {};
    return {
        leftBound: (left < 0) ? 0 : left,
        rightBound: (right > boardWidth) ? boardWidth : right,
        topBound: (top < 0) ? 0 : top,
        bottomBound: (bottom > boardHeight) ? boardHeight : bottom,
    };
}

/**
 * Set an item up front among overlapping items
 * @param {Object} itemStates       states of all items 
 * @param {String} itemId           the id of the selected item 
 * @param {Function} dispatchItems  dispatcher for item states
 */
 export function spotlightItem(itemStates, itemId, dispatchItems) {
    const { left, top, width, height, zIndex } = itemStates[itemId];
    const topLeftWithin = (curLeft, curTop, boxLeft, boxTop, boxWidth, boxHeight) => {
        return curLeft > boxLeft && curLeft < boxLeft + boxWidth && curTop > boxTop && curTop < boxTop + boxHeight;
    }
    const topRightWithin = (curLeft, curTop, curWidth, boxLeft, boxTop, boxWidth, boxHeight) => {
        return curLeft + curWidth > boxLeft && curLeft + curWidth < boxLeft + boxWidth && curTop > boxTop && curTop < boxTop + boxHeight;
    }
    const bottomLeftWithin = (curLeft, curTop, curHeight, boxLeft, boxTop, boxWidth, boxHeight) => {
        return curLeft > boxLeft && curLeft < boxLeft + boxWidth && curTop + curHeight > boxTop && curTop + curHeight < boxTop + boxHeight;
    }
    const bottomRightWithin = (curLeft, curTop, curWidth, curHeight, boxLeft, boxTop, boxWidth, boxHeight) => {
        return curLeft + curWidth > boxLeft && curLeft + curWidth < boxLeft + curWidth && curTop + curHeight > boxTop && curTop + curHeight < boxTop + boxHeight;
    }
    let maxZIndex = 0;
    for(const itemIdCur in itemStates) {
        if(itemIdCur === itemId) continue;
        const itemState = itemStates[itemIdCur];
        if(topLeftWithin(itemState.left, itemState.top, left, top, width, height) 
        || topRightWithin(itemState.left, itemState.top, itemState.width, left, top, width, height)
        || bottomLeftWithin(itemState.left, itemState.top, itemState.height, left, top, width, height)
        || bottomRightWithin(itemState.left, itemState.top, itemState.width, itemState.height, left, top, width, height)
        || topLeftWithin(left, top, itemState.left, itemState.top, itemState.width, itemState.height)
        || topRightWithin(left, top, width, itemState.left, itemState.top, itemState.width, itemState.height)
        || bottomLeftWithin(left, top, height, itemState.left, itemState.top, itemState.width, itemState.height)
        || bottomRightWithin(left, top, width, height, itemState.left, itemState.top, itemState.width, itemState.height)) {
            maxZIndex = Math.max(maxZIndex, itemState.zIndex || 0);
        }
    }
    if(maxZIndex >= 2147483647) {
        maxZIndex = 0;
        for(const itemIdCur in itemStates) {
            dispatchItems({type: 'setItemZIndex', payload: {itemId: itemIdCur, zIndex: 0}});
        }
    }
    dispatchItems({type: 'setItemZIndex', payload: {itemId, zIndex: maxZIndex + 1}});
}


export function filterSyncItems(syncItems, itemId) {
    if(syncItems.indexOf(itemId) === -1) return syncItems;
    const arr = [...syncItems];
    arr.splice(syncItems.indexOf(itemId), 1);
    return arr;
}