import * as React from "react";
import { useContext } from "react";
import { useItemsDispatcher, useItemState } from "../../lib/hooks";
import { contexts } from "../../lib/stateManagement/contexts";
import { ItemCore } from "../ItemCore";
import PropTypes from 'prop-types';
import { filterSyncItems, getBounds } from "../../lib/util";

export const Item = (props) => {
    const {
        left,
        top,
        itemId,
        zIndex = 0,
        bounds,
        handlerPositions,
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
        syncItems = [],
        children,
        ...rest
    } = props;
    const { itemStates } = useContext(contexts['ItemsContext']);
    const { selected, setSelected } = useContext(contexts['SelectionContext']);
    const { setMoving } = useContext(contexts['MovementContext']);
    const { syncMovStates, dispatchSyncMov } = useContext(contexts['SyncMovContext']);
    const dispatchItems = useItemsDispatcher();
    const itemState = useItemState(itemId);
    const smartboard = document.getElementById('smart-board');
    const boardWidth = smartboard?.clientWidth || 0, boardHeight = smartboard?.clientHeight || 0;
    const { leftBound, rightBound, topBound, bottomBound } = getBounds(bounds, boardWidth, boardHeight);

    if(itemState === null) {
        dispatchItems({type: 'setItemState', payload: {
            itemId,
            itemState: {
                left: left || leftBound,
                top: top || topBound,
                zIndex
            }
        }});
    }

    return <>
        <ItemCore 
            customLeft={left}
            customTop={top}
            itemId={itemId}
            itemState={itemState}
            itemStates={itemStates}
            dispatchItems={dispatchItems}
            selected={selected}
            setSelected={setSelected}
            setMoving={setMoving}
            bounds={{ leftBound, rightBound, topBound, bottomBound }}
            handlerPositions={handlerPositions}
            onDragStart={onDragStart}
            onDrag={onDrag}
            onDragEnd={onDragEnd}
            onResizeStart={onResizeStart}
            onResize={onResize}
            onResizeEnd={onResizeEnd}
            style={style}
            className={className}
            syncItems={filterSyncItems(syncItems, itemId)}
            syncMovStates={syncMovStates}
            dispatchSyncMov={dispatchSyncMov}
            onMouseDownItem={onMouseDownItem}
            onMouseDownResizeHanlder={onMouseDownResizeHanlder}
            children={children}
            {...rest}
        />
    </>
};

Item.propTypes = {
    left: PropTypes.number, // 'left' value of the position of the item
    top: PropTypes.number, // 'top' value of the position of the item
    itemId: PropTypes.string.isRequired, // unique itemId for the item
    zIndex: PropTypes.number, // zIndex of the item
    className: PropTypes.string, // className of the item container
    style: PropTypes.object, // style of the item container
    bounds: PropTypes.exact({ // bounds of the item when it's being dragged or resized; if not specified, bounds equal the SmartBoard
        left: PropTypes.number,
        right: PropTypes.number,
        top: PropTypes.number,
        bottom: PropTypes.number,
    }),
    handlerPositions: PropTypes.exact({ // set the visiblity of four resize handlers
        topLeft: PropTypes.bool,
        topRight: PropTypes.bool,
        bottomLeft: PropTypes.bool,
        bottomRight: PropTypes.bool,
    }),
    syncItems: PropTypes.arrayOf(PropTypes.string), // other items that will be moving synchronously with this item
    // called whenever the user mouses down on Item
    // (event: Event) => void
    onMouseDownItem: PropTypes.func,
    // called whenever the user mouses down on resize handler 
    // (event: Event, data: {handler: string}) => void
    // handler can be topLeft || topRight || bottomLeft || bottomRight
    onMouseDownResizeHanlder: PropTypes.func,
    // called when dragging starts
    // (event: Event, data: {x: number, y: number}) => void
    onDragStart: PropTypes.func,
    // called when dragging
    // (event: Event, data: {x: number, y: number}) => void
    onDrag: PropTypes.func,
    // called when dragging ends
    // (event: Event, data: {x: number, y: number}) => void
    onDragEnd: PropTypes.func,
    // called when resizing starts
    // (event: Event, data: {x: number, y: number, width: number, height: number, handler: string}) => void
    onResizeStart: PropTypes.func,
    // called when resizing
    // (event: Event, data: {x: number, y: number, width: number, height: number, handler: string}) => void
    onResize: PropTypes.func,
    // called when resizing ends
    // (event: Event, data: {x: number, y: number, width: number, height: number, handler: string}) => void
    onResizeEnd: PropTypes.func,
    children: PropTypes.element.isRequired, // Item must have a single child component
}