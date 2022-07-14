import * as React from "react";
import { useEffect, memo, cloneElement, useState, useRef } from "react";
import { createPortal } from "react-dom";
import { getHeight, getWidth, initAction, cleanUpAction, spotlightItem } from "../../lib/util";
import { Logger } from "../../lib/logger";
import { LineHor } from "../LineHor";
import { LineVer } from "../LineVer";
import { DataCenter } from "../../lib/DataCenter";
import './index.css';

const RESIZE_MARGIN = 10;
const logger = new Logger();
const dataCenter = new DataCenter();

const areEqual = (prevProps, nextProps) => {
    // another item is moving
    if(dataCenter.curPos.itemId !== null && dataCenter.curPos.itemId !== prevProps.itemId) {
        if(prevProps.selected !== nextProps.selected) return false;
        if(nextProps.syncMovStates.syncIds.indexOf(nextProps.itemId) !== -1) return false;
        return true;
    }
}

export const ItemCore = memo(props => {
    const {
        customLeft,
        customTop,
        children,
        itemId,
        itemState,
        itemStates,
        dispatchItems,
        selected,
        setSelected,
        setMoving,
        handlerPositions,
        syncItems = [],
        syncMovStates,
        dispatchSyncMov,
        onMouseDownItem,
        onMouseDownResizeHanlder,
        onDragStart,
        onDrag,
        onDragEnd,
        onResizeStart,
        onResize,
        onResizeEnd,
        style,
        className,
        bounds,
    } = props;
    const { left = 0, top = 0, zIndex = 0 } = itemState || {};
    const ref = useRef(null);
    const [resizing, setResizing] = useState(false);
    const [hovered, setHovered] = useState(false);
    const shouldDisplay = (hovered && selected === "") || selected === itemId;
    const smartboard = document.getElementById('smart-board');
    const { leftBound, rightBound, topBound, bottomBound } = bounds;

    useEffect(() => {
        dispatchItems({type: 'setItemWidth', payload: { itemId, width: getWidth(ref)}});
    }, [getWidth(ref)]);
    useEffect(() => {
        dispatchItems({type: 'setItemHeight', payload: { itemId, height: getHeight(ref)}});
    }, [getHeight(ref)]);
    useEffect(() => {
        if(rightBound !== 0) {
            let tmpLeft = customLeft;
            if(tmpLeft < leftBound) tmpLeft = leftBound;
            else if(tmpLeft + getWidth(ref) > rightBound) tmpLeft = rightBound - getWidth(ref);
            dispatchItems({type: 'setItemLeft', payload: {itemId, left: tmpLeft}});
        }
    }, [customLeft, leftBound, rightBound]);
    useEffect(() => {
        if(bottomBound !== 0) {
            let tmpTop = customTop;
            if(tmpTop < topBound) tmpTop = topBound;
            else if(tmpTop + getHeight(ref) > bottomBound) tmpTop = bottomBound - getHeight(ref);
            dispatchItems({type: 'setItemTop', payload: {itemId, top: tmpTop}});
        }
    }, [customTop, topBound, bottomBound]);

    useEffect(() => {
        if(dataCenter.curPos.itemId !== null && dataCenter.curPos.itemId !== itemId && syncMovStates.syncIds.indexOf(itemId) !== -1) {
            let newL = left + syncMovStates.deltaX, newT = top + syncMovStates.deltaY;
            if(newL < leftBound) newL = leftBound;
            else if(newL + getWidth(ref) > rightBound) newL = rightBound - getWidth(ref);
            if(newT < topBound) newT = topBound;
            else if(newT + getHeight(ref) > bottomBound) newT = bottomBound - getHeight(ref);
            if(syncMovStates.syncIds.indexOf(itemId) !== -1) {
                dispatchItems({type: 'setItemLeft', payload: {itemId, left: newL}});
                dispatchItems({type: 'setItemTop', payload: {itemId, top: newT}});
            }
        }
    }, [syncMovStates]);


    // drag
    const dragStart = (event) => {
        event.stopPropagation();
        // initialize drag
        logger.logDragStart(itemId, left, top);
        // init dragging sync up
        if(syncItems.length !== 0) dispatchSyncMov({type: 'setSyncIds', payload: syncItems});
        // spotlight item
        spotlightItem(itemStates, itemId, dispatchItems);
        // set moving flag
        setMoving(true);
        setSelected(itemId);
        // invoke handlers
        initAction(event, drag, dragEnd, ref, left, top, itemId);
        typeof onDragStart === 'function' && onDragStart(event, {x: left, y: top});
        typeof onMouseDownItem === 'function' && onMouseDownItem(event);
    }
    const drag = (event) => {
        let newLeft = left, alignLeft = null, alignRight = null, newTop = top, alignTop = null, alignBottom = null;
        if(dataCenter.alignState.left !== null) {
            if(alignLeft === null) alignLeft = dataCenter.alignState.left;
            if(dataCenter.alignState.leftX === null) {
                dataCenter.alignState.leftX = event.clientX;
                newLeft = alignLeft;
            }
            else {
                if(Math.abs(event.clientX - dataCenter.alignState.leftX) > dataCenter.alignDistance) {
                    newLeft = alignLeft + event.clientX - dataCenter.alignState.leftX;
                    dataCenter.alignState.left = null;
                    dataCenter.alignState.leftX = null;
                    alignLeft = null;
                }
                else {
                    newLeft = alignLeft;
                }
            }
        }
        else {
            newLeft = dataCenter.initPos.left + event.clientX - dataCenter.initXY.x;
        }
        if(dataCenter.alignState.left === null) {
            if(dataCenter.alignState.right !== null) {
                if(alignRight === null) alignRight = dataCenter.alignState.right;
                if(dataCenter.alignState.rightX === null) {
                    dataCenter.alignState.rightX = event.clientX;
                    newLeft = alignRight - getWidth(ref);
                }
                else {
                    if(Math.abs(event.clientX - dataCenter.alignState.rightX) > dataCenter.alignDistance) {
                        newLeft = alignRight - getWidth(ref) + event.clientX - dataCenter.alignState.rightX;
                        dataCenter.alignState.right = null;
                        dataCenter.alignState.rightX = null;
                        alignRight = null;
                    }
                    else {
                        newLeft = alignRight - getWidth(ref);
                    }
                }
            }
            else {
                newLeft = dataCenter.initPos.left + event.clientX - dataCenter.initXY.x;
            }
        }
        if(dataCenter.alignState.top !== null) {
            if(alignTop === null) alignTop = dataCenter.alignState.top;
            if(dataCenter.alignState.topY === null) {
                dataCenter.alignState.topY = event.clientY;
                newTop = alignTop;
            }
            else {
                if(Math.abs(event.clientY - dataCenter.alignState.topY) > dataCenter.alignDistance) {
                    newTop = alignTop + event.clientY - dataCenter.alignState.topY;
                    dataCenter.alignState.top = null;
                    dataCenter.alignState.topY = null;
                    alignTop = null;
                }
                else {
                    newTop = alignTop;
                }
            }
        }
        else {
            newTop = dataCenter.initPos.top + event.clientY - dataCenter.initXY.y;
        }
        if(dataCenter.alignState.top === null) {
            if(dataCenter.alignState.bottom !== null) {
                if(alignBottom === null) alignBottom = dataCenter.alignState.bottom;
                if(dataCenter.alignState.bottomY === null) {
                    dataCenter.alignState.bottomY = event.clientY;
                    newTop = alignBottom - getHeight(ref);
                }
                else {
                    if(Math.abs(event.clientY - dataCenter.alignState.bottomY) > dataCenter.alignDistance) {
                        newTop = alignBottom - getHeight(ref) + event.clientY - dataCenter.alignState.bottomY;
                        dataCenter.alignState.bottom = null;
                        dataCenter.alignState.bottomY = null;
                        alignBottom = null;
                    }
                    else {
                        newTop = alignBottom - getHeight(ref);
                    }
                }
            }
            else {
                newTop = dataCenter.initPos.top + event.clientY - dataCenter.initXY.y;
            }
        }
        if(newLeft < leftBound) newLeft = leftBound;
        else if(newLeft + getWidth(ref) > rightBound) newLeft = rightBound - getWidth(ref);
        if(newTop < topBound) newTop = topBound;
        else if(newTop + getHeight(ref) > bottomBound) newTop = bottomBound - getHeight(ref);
        logger.logDragging(itemId, newLeft, newTop);
        dispatchItems({type: 'setItemLeft', payload: {itemId, left: newLeft}});
        dispatchItems({type: 'setItemTop', payload: {itemId, top: newTop}});
        dataCenter.curPos = {left: newLeft, right: newLeft + getWidth(ref), top: newTop, bottom: newTop + getHeight(ref), itemId: itemId};
        typeof onDrag === 'function' && onDrag(event, {x: newLeft, y: newTop});
        if(syncItems.length !== 0) {
            dispatchSyncMov({type: 'setDeltaX', payload: newLeft - itemStates[itemId].left});
            dispatchSyncMov({type: 'setDeltaY', payload: newTop - itemStates[itemId].top});
        }
    }
    const dragEnd = (event) => {
        logger.logDragEnd(itemId, left, top);
        cleanUpAction(drag, dragEnd);
        dispatchSyncMov({type: 'reset'});
        setMoving(false);
        setResizing(false);
        typeof onDragEnd === 'function' && onDragEnd(event, {x: left, y: top});
    }
    // resize top left
    const onResizeStartTopLeft = (event) => {
        logger.logResizeStart(itemId, left, top, getWidth(ref), getHeight(ref), 'topLeft');
        event.stopPropagation();
        initAction(event, onResizeTopLeft, onResizeEndTopLeft, ref, left, top, itemId);
        setMoving(true);
        setSelected(itemId);
        setResizing(true);
        typeof onResizeStart === 'function' && onResizeStart(event, {x: left, y: top, width: getWidth(ref), height: getHeight(ref), handler: 'topLeft'});
        typeof onMouseDownResizeHanlder === 'function' && onMouseDownResizeHanlder(event, {handler: 'topLeft'});
    }
    const onResizeTopLeft = (event) => {
        let newLeft = left, alignLeft = null, newTop = top, alignTop = null;
        if(dataCenter.alignState.left !== null) {
            alignLeft = dataCenter.alignState.left;
            if(dataCenter.alignState.leftX === null) {
                dataCenter.alignState.leftX = event.clientX;
                newLeft = alignLeft;
            }
            else {
                if(Math.abs(event.clientX - dataCenter.alignState.leftX) > dataCenter.alignDistance) {
                    newLeft = alignLeft + event.clientX - dataCenter.alignState.leftX;
                    dataCenter.alignState.left = null;
                    dataCenter.alignState.leftX = null;
                    alignLeft = null;
                }
                else {
                    newLeft = alignLeft;
                }
            }
        }
        else {
            newLeft = dataCenter.initPos.left + event.clientX - dataCenter.initXY.x;
        }
        if(dataCenter.alignState.top !== null) {
            alignTop = dataCenter.alignState.top;
            if(dataCenter.alignState.topY === null) {
                dataCenter.alignState.topY = event.clientY;
                newTop = alignTop;
            }
            else {
                if(Math.abs(event.clientY - dataCenter.alignState.topY) > dataCenter.alignDistance) {
                    newTop = alignTop + event.clientY - dataCenter.alignState.topY;
                    dataCenter.alignState.top = null;
                    dataCenter.alignState.topY = null;
                    alignTop = null;
                }
                else {
                    newTop = alignTop;
                }
            }
        }
        else {
            newTop = dataCenter.initPos.top + event.clientY - dataCenter.initXY.y;
        }
        if(newLeft < leftBound) newLeft = leftBound;
        else if(newLeft + dataCenter.alignDistance > dataCenter.initPos.right) newLeft = dataCenter.initPos.right - dataCenter.alignDistance;
        if(newTop < topBound) newTop = topBound;
        else if(newTop + dataCenter.alignDistance > dataCenter.initPos.bottom) newTop = dataCenter.initPos.bottom - dataCenter.alignDistance;
        ref.current.style.width = dataCenter.initPos.right - newLeft + 'px';
        ref.current.style.height = dataCenter.initPos.bottom - newTop + 'px';
        logger.logResize(itemId, newLeft, newTop, getWidth(ref), getHeight(ref), 'topLeft');
        dispatchItems({type: 'setItemLeft', payload: {itemId, left: newLeft}});
        dispatchItems({type: 'setItemTop', payload: {itemId, top: newTop}});
        dataCenter.curPos = {left: newLeft, right: newLeft + getWidth(ref), top: newTop, bottom: newTop + getHeight(ref), itemId};
        typeof onResize === 'function' && onResize(event, {x: newLeft, y: newTop, width: getWidth(ref), height: getHeight(ref), handler: 'topLeft'});
    }
    const onResizeEndTopLeft = (event) => {
        logger.logResizeEnd(itemId, left, top, getWidth(ref), getHeight(ref), 'topLeft');
        cleanUpAction(onResizeTopLeft, onResizeEndTopLeft);
        setMoving(false);
        setResizing(false);
        typeof onResizeEnd === 'function' && onResizeEnd(event, {x: left, y: top, width: getWidth(ref), height: getHeight(ref), handler: 'topLeft'});
    }
    // resize top right
    const onResizeStartTopRight = (event) => {
        logger.logResizeStart(itemId, left, top, getWidth(ref), getHeight(ref), 'topRight');
        event.stopPropagation();
        initAction(event, onResizeTopRight, onResizeEndTopRight, ref, left, top, itemId);
        setMoving(true);
        setSelected(itemId);
        setResizing(true);
        typeof onResizeStart === 'function' && onResizeStart(event, {x: left, y: top, width: getWidth(ref), height: getHeight(ref), handler: 'topRight'});
        typeof onMouseDownResizeHanlder === 'function' && onMouseDownResizeHanlder(event, {handler: 'topRight'});
    }
    const onResizeTopRight = (event) => {
        let handlerLeft = left + getWidth(ref), alignHandlerLeft = null, newTop = top, alignTop = null;
        if(dataCenter.alignState.right !== null) {
            alignHandlerLeft = dataCenter.alignState.right;
            if(dataCenter.alignState.rightX === null) {
                dataCenter.alignState.rightX = event.clientX;
                handlerLeft = alignHandlerLeft;
            }
            else {
                if(Math.abs(event.clientX - dataCenter.alignState.rightX) > dataCenter.alignDistance) {
                    handlerLeft = alignHandlerLeft + event.clientX - dataCenter.alignState.rightX;
                    dataCenter.alignState.right = null;
                    dataCenter.alignState.rightX = null;
                    alignHandlerLeft = null;
                }
                else {
                    handlerLeft = alignHandlerLeft;
                }
            }
        }
        else {
            handlerLeft = dataCenter.initPos.right + event.clientX - dataCenter.initXY.x;
        }
        if(dataCenter.alignState.top !== null) {
            alignTop = dataCenter.alignState.top;
            if(dataCenter.alignState.topY === null) {
                dataCenter.alignState.topY = event.clientY;
                newTop = alignTop;
            }
            else {
                if(Math.abs(event.clientY - dataCenter.alignState.topY) > dataCenter.alignDistance) {
                    newTop = alignTop + event.clientY - dataCenter.alignState.topY;
                    dataCenter.alignState.top = null;
                    dataCenter.alignState.topY = null;
                    alignTop = null;
                }
                else {
                    newTop = alignTop;
                }
            }
        }
        else {
            newTop = dataCenter.initPos.top + event.clientY - dataCenter.initXY.y;
        }
        if(handlerLeft - RESIZE_MARGIN < dataCenter.initPos.left) handlerLeft = dataCenter.initPos.left + RESIZE_MARGIN;
        else if(handlerLeft > rightBound) handlerLeft = rightBound;
        if(newTop < topBound) newTop = topBound;
        else if(newTop + dataCenter.alignDistance > dataCenter.initPos.bottom) newTop = dataCenter.initPos.bottom - dataCenter.alignDistance;
        ref.current.style.width = handlerLeft - dataCenter.initPos.left + 'px';
        ref.current.style.height = dataCenter.initPos.bottom - newTop + 'px';
        logger.logResize(itemId, left, newTop, getWidth(ref), getHeight(ref), 'topRight');
        dispatchItems({type: 'setItemTop', payload: {itemId, top: newTop}});
        dataCenter.curPos = {left: left, right: left + getWidth(ref), top: newTop, bottom: newTop + getHeight(ref), itemId};
        typeof onResize === 'function' && onResize(event, {x: left, y: newTop, width: getWidth(ref), height: getHeight(ref), handler: 'topRight'});
    }
    const onResizeEndTopRight = (event) => {
        logger.logResizeEnd(itemId, left, top, getWidth(ref), getHeight(ref), 'topRight');
        cleanUpAction(onResizeTopRight, onResizeEndTopRight);
        setMoving(false);
        setResizing(false);
        typeof onResizeEnd === 'function' && onResizeEnd(event, {x: left, y: top, width: getWidth(ref), height: getHeight(ref), handler: 'topRight'});
    }
    // resize bottom left
    const onResizeStartBottomLeft = (event) => {
        logger.logResizeStart(itemId, left, top, getWidth(ref), getHeight(ref), 'bottomLeft');
        event.stopPropagation();
        initAction(event, onResizeBottomLeft, onResizeEndBottomLeft, ref, left, top, itemId);
        setMoving(true);
        setSelected(itemId);
        setResizing(true);
        typeof onResizeStart === 'function' && onResizeStart(event, {x: left, y: top, width: getWidth(ref), height: getHeight(ref), handler: 'bottomLeft'});
        typeof onMouseDownResizeHanlder === 'function' && onMouseDownResizeHanlder(event, {handler: 'bottomLeft'});
    }
    const onResizeBottomLeft = (event) => {
        let newLeft = left, alignLeft = null, handlerTop = top, alignHandlerTop = null;
        if(dataCenter.alignState.left !== null) {
            if(alignLeft === null) alignLeft = (Math.abs(dataCenter.curPos.left - dataCenter.alignState.left) < Math.abs(dataCenter.curPos.right - dataCenter.alignState.left)) ? dataCenter.alignState.left : dataCenter.alignState.left - getWidth(ref);
            if(dataCenter.alignState.leftX === null) {
                dataCenter.alignState.leftX = event.clientX;
                newLeft = alignLeft;
            }
            else {
                if(Math.abs(event.clientX - dataCenter.alignState.leftX) > dataCenter.alignDistance) {
                    newLeft = alignLeft + event.clientX - dataCenter.alignState.leftX;
                    dataCenter.alignState.left = null;
                    dataCenter.alignState.leftX = null;
                    alignLeft = null;
                }
                else {
                    newLeft = alignLeft;
                }
            }
        }
        else {
            newLeft = dataCenter.initPos.left + event.clientX - dataCenter.initXY.x;
        }
        if(dataCenter.alignState.bottom !== null) {
            alignHandlerTop = dataCenter.alignState.bottom;
            if(dataCenter.alignState.bottomY === null) {
                dataCenter.alignState.bottomY = event.clientY;
                handlerTop = alignHandlerTop;
            }
            else {
                if(Math.abs(event.clientY - dataCenter.alignState.bottomY) > dataCenter.alignDistance) {
                    handlerTop = alignHandlerTop + event.clientY - dataCenter.alignState.bottomY;
                    dataCenter.alignState.bottom = null;
                    dataCenter.alignState.bottomY = null;
                    alignHandlerTop = null;
                }
                else {
                    handlerTop = alignHandlerTop;
                }
            }
        }
        else {
            handlerTop = dataCenter.initPos.bottom + event.clientY - dataCenter.initXY.y;
        }
        if(newLeft < leftBound) newLeft = leftBound;
        else if(newLeft + dataCenter.alignDistance > dataCenter.initPos.right) newLeft = dataCenter.initPos.right - dataCenter.alignDistance;
        if(handlerTop - RESIZE_MARGIN < dataCenter.initPos.top) handlerTop = dataCenter.initPos.top + RESIZE_MARGIN;
        else if(handlerTop > bottomBound) handlerTop = bottomBound;
        ref.current.style.width = dataCenter.initPos.right - newLeft + 'px';
        ref.current.style.height = handlerTop - dataCenter.initPos.top + 'px';
        logger.logResize(itemId, newLeft, top, getWidth(ref), getHeight(ref), 'bottomLeft');
        dispatchItems({type: 'setItemLeft', payload: {itemId, left: newLeft}});
        dataCenter.curPos = {left: newLeft, right: newLeft + getWidth(ref), top: top, bottom: top + getHeight(ref), itemId};
        typeof onResize === 'function' && onResize(event, {x: newLeft, y: top, width: getWidth(ref), height: getHeight(ref), handler: 'bottomLeft'});
    }
    const onResizeEndBottomLeft = (event) => {
        logger.logResizeEnd(itemId, left, top, getWidth(ref), getHeight(ref), 'bottom');
        cleanUpAction(onResizeBottomLeft, onResizeEndBottomLeft);
        setMoving(false);
        setResizing(false);
        typeof onResizeEnd === 'function' && onResizeEnd(event, {x: left, y: top, width: getWidth(ref), height: getHeight(ref), handler: 'bottomLeft'});
    }
    // resize bottom right
    const onResizeStartBottomRight = (event) => {
        logger.logResizeStart(itemId, left, top, getWidth(ref), getHeight(ref), 'bottomRight');
        event.stopPropagation();
        initAction(event, onResizeBottomRight, onResizeEndBottomRight, ref, left, top, itemId);
        setMoving(true);
        setSelected(itemId);
        setResizing(true);
        typeof onResizeStart === 'function' && onResizeStart(event, {x: left, y: top, width: getWidth(ref), height: getHeight(ref), handler: 'bottomRight'});
        typeof onMouseDownResizeHanlder === 'function' && onMouseDownResizeHanlder(event, {handler: 'bottomRight'});
    }
    const onResizeBottomRight = (event) => {
        let handlerLeft = left + getWidth(ref), alignHandlerLeft = null, handlerTop = top, alignHandlerTop = null;
        if(dataCenter.alignState.right !== null) {
            alignHandlerLeft = dataCenter.alignState.right;
            if(dataCenter.alignState.rightX === null) {
                dataCenter.alignState.rightX = event.clientX;
                handlerLeft = alignHandlerLeft;
            }
            else {
                if(Math.abs(event.clientX - dataCenter.alignState.rightX) > dataCenter.alignDistance) {
                    handlerLeft = alignHandlerLeft + event.clientX - dataCenter.alignState.rightX;
                    dataCenter.alignState.right = null;
                    dataCenter.alignState.rightX = null;
                    alignHandlerLeft = null;
                }
                else {
                    handlerLeft = alignHandlerLeft;
                }
            }
        }
        else {
            handlerLeft = dataCenter.initPos.right + event.clientX - dataCenter.initXY.x;
        }
        if(dataCenter.alignState.bottom !== null) {
            alignHandlerTop = dataCenter.alignState.bottom;
            if(dataCenter.alignState.bottomY === null) {
                dataCenter.alignState.bottomY = event.clientY;
                handlerTop = alignHandlerTop;
            }
            else {
                if(Math.abs(event.clientY - dataCenter.alignState.bottomY) > dataCenter.alignDistance) {
                    handlerTop = alignHandlerTop + event.clientY - dataCenter.alignState.bottomY;
                    dataCenter.alignState.bottom = null;
                    dataCenter.alignState.bottomY = null;
                    alignHandlerTop = null;
                }
                else {
                    handlerTop = alignHandlerTop;
                }
            }
        }
        else {
            handlerTop = dataCenter.initPos.bottom + event.clientY - dataCenter.initXY.y;
        }
        if(handlerLeft - RESIZE_MARGIN < dataCenter.initPos.left) handlerLeft = dataCenter.initPos.left + RESIZE_MARGIN;
        else if(handlerLeft > rightBound) handlerLeft = rightBound;
        if(handlerTop - RESIZE_MARGIN < dataCenter.initPos.top) handlerTop = dataCenter.initPos.top + RESIZE_MARGIN;
        else if(handlerTop > bottomBound) handlerTop = bottomBound;
        ref.current.style.width = handlerLeft - dataCenter.initPos.left + 'px';
        ref.current.style.height = handlerTop - dataCenter.initPos.top + 'px';
        logger.logResize(itemId, left, top, getWidth(ref), getHeight(ref), 'bottomRight');
        dispatchItems({type: 'setItemLeft', payload: {itemId, left: left}});
        dataCenter.curPos = {left: left, right: left + getWidth(ref), top: top, bottom: top + getHeight(ref), itemId};
        typeof onResize === 'function' && onResize(event, {x: left, y: top, width: getWidth(ref), height: getHeight(ref), handler: 'bottomRight'});
    }
    const onResizeEndBottomRight = (event) => {
        logger.logResizeEnd(itemId, left, top, getWidth(ref), getHeight(ref), 'bottomRight');
        cleanUpAction(onResizeBottomRight, onResizeEndBottomRight);
        setMoving(false);
        setResizing(false);
        typeof onResizeEnd === 'function' && onResize(event, {x: left, y: top, width: getWidth(ref), height: getHeight(ref), handler: 'bottomRight'});
    }
    return <div
        className={className}
        style={{
            ...style,
            left: `${left}px`,
            top: `${top}px`,
            width: `${getWidth(ref)}px`,
            height: `${getHeight(ref)}px`,
            border: shouldDisplay ? '1px solid #2680eb' : '',
            position: 'absolute',
            userSelect: 'none',
            zIndex,
        }}
        onMouseDown={dragStart}
        onMouseOver={() => setHovered(true)}
        onMouseOut={() => setHovered(false)}
    >
        {cloneElement(React.Children.only(children), {
            ref: ref,
        })}
        {(!handlerPositions || handlerPositions?.topLeft) && <div 
            className="resize-handler-component top-left"
            onMouseDown={onResizeStartTopLeft}
            style={{
                display: shouldDisplay ? 'block' : 'none',
                backgroundColor: resizing && '#2680eb'
            }}
        ></div>}
        {(!handlerPositions || handlerPositions?.topRight) && <div 
            className="resize-handler-component top-right"
            onMouseDown={onResizeStartTopRight}
            style={{
                display: shouldDisplay ? 'block' : 'none',
                backgroundColor: resizing && '#2680eb'
            }}
        ></div>}
        {(!handlerPositions || handlerPositions?.bottomLeft) && <div 
            className="resize-handler-component bottom-left"
            onMouseDown={onResizeStartBottomLeft}
            style={{
                display: shouldDisplay ? 'block' : 'none',
                backgroundColor: resizing && '#2680eb'
            }}
        ></div>}
        {(!handlerPositions || handlerPositions?.bottomRight) && <div 
            className="resize-handler-component bottom-right"
            onMouseDown={onResizeStartBottomRight}
            style={{
                display: shouldDisplay ? 'block' : 'none',
                backgroundColor: resizing && '#2680eb'
            }}
        ></div>}
        {smartboard && createPortal(<LineHor top={top} itemId={itemId}/>, smartboard)}
        {smartboard && createPortal(<LineHor top={top + getHeight(ref)} itemId={itemId}/>, smartboard)}
        {smartboard && createPortal(<LineVer left={left} itemId={itemId}/>, smartboard)}
        {smartboard && createPortal(<LineVer left={left + getWidth(ref)} itemId={itemId}/>, smartboard)}
    </div>
}, areEqual);