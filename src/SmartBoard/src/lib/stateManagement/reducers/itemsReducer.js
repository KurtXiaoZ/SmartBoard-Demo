export const items = {
    /*
    itemId: {
        left, top, width, height, zIndex
    }
    */
}

export const itemsReducer = (state, action) => {
    let newState;
    switch(action.type) {
        case 'initializeItem':
            newState = {...state};
            var { itemId, left, top, width = null, height = null, zIndex = null } = action.payload;
            if(newState[itemId] !== undefined) return newState;
            newState[itemId] = { left, top, width, height, zIndex };
            return newState;
        case 'setItemState':
            return { ...state, [action.payload.itemId]: action.payload.itemState};
        case 'setItemLeft':
            newState = {...state};
            newState[action.payload.itemId].left = action.payload.left;
            return newState;
        case 'setItemTop':
            newState = {...state};
            newState[action.payload.itemId].top = action.payload.top;
            return newState;
        case 'setItemWidth':
            newState = {...state};
            newState[action.payload.itemId].width = action.payload.width;
            return newState;
        case 'setItemHeight':
            newState = {...state};
            newState[action.payload.itemId].height = action.payload.height;
            return newState;
        case 'setItemZIndex':
            newState = {...state};
            var { itemId, zIndex } = action.payload;
            newState[itemId].zIndex = zIndex;
            return newState;
        case 'setCurY':
            return { ...state, y: action.payload };
        default:
            return state;
    }
}