import { useReducer, useState } from 'react';
import { Board, BOARD_CLASSNAMES } from '../Board';
import { Displayer } from '../Displayer';
import './index.css';

export const ITEM_CLASSNAME = ['item-class1', 'item-class2', 'item-class3'];

const smartBoardInit = {
    className: BOARD_CLASSNAMES[0],
    style: {},
    autoAlignDistance: 10,
    onMouseDown: () => {}
}

const smartBoardReducer = (state, action) => {
    switch(action.type) {
        case 'setClassName':
            return { ...state, className: action.payload };
        case 'setStyle':
            return { ...state, style: action.payload };
        case 'setAutoAlignDistance':
            return { ...state, autoAlignDistance: action.payload };
        case 'setOnMouseDown':
            return { ...state, onMouseDown: action.payload };
        default:
            return state;
    }
}

const itemsInit = {
    'item1': {
        left: 100,
        top: 100,
        itemId: 'item1',
        zIndex: 0,
        className: ITEM_CLASSNAME[0],
        style: {},
        bounds: {},
        handlerPositions: undefined,
        syncItems: [],
        onMouseDownItem: () => {},
        onMouseDownResizeHanlder: () => {},
        onDragStart: () => {},
        onDrag: () => {},
        onDragEnd: () => {},
        onResizeStart: () => {},
        onResize: () => {},
        onResizeEnd: () => {},
    },
    'item2': {
        left: 200,
        top: 200,
        itemId: 'item2',
        zIndex: 0,
        className: ITEM_CLASSNAME[0],
        style: {},
        bounds: {},
        handlerPositions: undefined,
        syncItems: [],
        onMouseDownItem: () => {},
        onMouseDownResizeHanlder: () => {},
        onDragStart: () => {},
        onDrag: () => {},
        onDragEnd: () => {},
        onResizeStart: () => {},
        onResize: () => {},
        onResizeEnd: () => {},
    },
    'item3': {
        left: 400,
        top: 400,
        itemId: 'item3',
        zIndex: 0,
        className: ITEM_CLASSNAME[0],
        style: {},
        bounds: {},
        handlerPositions: undefined,
        syncItems: [],
        onMouseDownItem: () => {},
        onMouseDownResizeHanlder: () => {},
        onDragStart: () => {},
        onDrag: () => {},
        onDragEnd: () => {},
        onResizeStart: () => {},
        onResize: () => {},
        onResizeEnd: () => {},
    },
}

const itemsReducer = (state, action) => {
    const newState = {...state};
    const { itemId, content } = action.payload;
    switch(action.type) {
        case 'setLeft':
            newState[itemId].left = content;
            return newState;
        case 'setTop':
            newState[itemId].top = content;
            return newState;
        case 'setItemId':
            newState[itemId].itemId = content;
            return newState;
        case 'setZIndex':
            newState[itemId].zIndex = content;
            return newState;
        case 'setClassName':
            newState[itemId].className = content;
            return newState;
        case 'setStyle':
            newState[itemId].style = content;
            return newState;
        case 'setBounds':
            newState[itemId].bounds = content;
            return newState;
        case 'setHandlerPositions':
            newState[itemId].handlerPositions = content;
            return newState;
        case 'setSyncItems':
            newState[itemId].syncItems = content;
            return newState;
        case 'setOnMouseDownItem':
            newState[itemId].onMouseDownItem = content;
            return newState;
        case 'setOnMouseDownResizeHanlder':
            newState[itemId].onMouseDownResizeHanlder = content;
            return newState;
        case 'setOnDragStart':
            newState[itemId].onDragStart = content;
            return newState;
        case 'setOnDrag':
            newState[itemId].onDrag = content;
            return newState;
        case 'setOnDragEnd':
            newState[itemId].onDragEnd = content;
            return newState;
        case 'setOnResizeStart':
            newState[itemId].onResizeStart = content;
            return newState;
        case 'setOnResize':
            newState[itemId].onResize = content;
            return newState;
        case 'setOnResizeEnd':
            newState[itemId].onResizeEnd = content;
            return newState;
        default:
            return state;
    }
}

export const Demo = () => {
    const [selected, setSelect] = useState("");
    const [smartBoardState, dispatchSmartBoard] = useReducer(smartBoardReducer, smartBoardInit);
    const [items, dispatchItems] = useReducer(itemsReducer, itemsInit);


    const boardProps = {
        smartBoardState,
        dispatchSmartBoard,
        setSelect,
        items,
        dispatchItems,
    }
    const displayerProps = {
        selected,
        smartBoardState,
        dispatchSmartBoard,
        items,
        dispatchItems,
    }
    return <div className='demo'>
        <div className='demo-board'>
            <Board {...boardProps} />
        </div>
        <div className='demo-displayer'>
            <Displayer {...displayerProps}/>
        </div>
    </div>
}