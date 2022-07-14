export const syncMov = {
    syncIds: [],
    deltaX: 0,
    deltaY: 0,
    /*
    itemId: {
        left, top, width, height, zIndex
    }
    */
}

export const syncMovReducer = (state, action) => {
    switch(action.type) {
        case 'setSyncIds':
            return { ...state, syncIds: action.payload };
        case 'setDeltaX':
            return { ...state, deltaX: action.payload };
        case 'setDeltaY':
            return { ...state, deltaY: action.payload };
        case 'reset':
            return { syncIds: [], deltaX: 0, deltaY: 0 };
        default:
            return state;
    }
}