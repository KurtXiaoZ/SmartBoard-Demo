export class Logger {
    constructor() {
    }
    logDragStart(itemId, left, top) {
        if(process.env.REACT_APP_LOGGER === '1') console.log(`Start dragging ${itemId} at {left: ${left}, top: ${top}}`);
    }
    logDragging(itemId, left, top) {
        if(process.env.REACT_APP_LOGGER === '1') console.log(`Dragging ${itemId} to {left: ${left}, top: ${top}}`);
    }
    logDragEnd(itemId, left, top) {
        if(process.env.REACT_APP_LOGGER === '1') console.log(`Stop dragging ${itemId} at {left: ${left}, top: ${top}}`);
    }
    logResizeStart(itemId, left, top, width, height, pos) {
        if(process.env.REACT_APP_LOGGER === '1') console.log(`Start resizing ${pos} of ${itemId} at {left: ${left}, top: ${top}} with {width: ${width}, height: ${height}}`);
    }
    logResize(itemId, left, top, width, height, pos) {
        if(process.env.REACT_APP_LOGGER === '1') console.log(`Resize ${itemId} on ${pos}
        new position: {left: ${left}, top: ${top}}
        new size: {width: ${width}, height: ${height}}`);
    }
    logResizeEnd(itemId, left, top, width, height, pos) {
        if(process.env.REACT_APP_LOGGER === '1') console.log(`Stop resizing ${itemId} on ${pos}
        final position: {left: ${left}, top: ${top}}
        final size: {width: ${width}, height: ${height}}`);
    }
}