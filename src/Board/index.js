import { Item, SmartBoard } from '../SmartBoard';
import './index.css';

export const BOARD_CLASSNAMES = ['smart-board-1', 'smart-board-2', 'smart-board-3'];

export const Board = (props) => {
    const {
        smartBoardState,
        dispatchSmartBoard,
        items,
        dispatchItems,
        setSelect,
    } = props;
    const {
        className,
        style,
        autoAlignDistance,
        onMouseDown
    } = smartBoardState;
    return <SmartBoard
        className={className}
        style={style}
        autoAlignDistance={autoAlignDistance}
        onMouseDown={(event) => {
            setSelect("");
            onMouseDown(event);
        }}
    >
        <Item
            left={items['item1'].left}
            top={items['item1'].top}
            itemId='item1'
            zIndex={items['item1'].zIndex}
            className={items['item1'].className}
            style={items['item1'].style}
            bounds={items['item1'].bounds}
            handlerPositions={items['item1'].handlerPositions}
            syncItems={items['item1'].syncItems}
            onMouseDownItem={(event) => {
                setSelect('item1');
                items['item1'].onMouseDownItem(event);
            }}
            onMouseDownResizeHanlder={items['item1'].onMouseDownResizeHanlder}
            onDragStart={items['item1'].onDragStart}
            onDrag={(event, data) => {
                dispatchItems({type: 'setLeft', payload: {itemId: 'item1', content: data.x}});
                dispatchItems({type: 'setTop', payload: {itemId: 'item1', content: data.y}});
                items['item1'].onDrag(event, data);
            }}
            onDragEnd={items['item1'].onDragEnd}
            onResizeStart={items['item1'].onResizeStart}
            onResize={(event, data) => {
                dispatchItems({type: 'setLeft', payload: {itemId: 'item1', content: data.x}});
                dispatchItems({type: 'setTop', payload: {itemId: 'item1', content: data.y}});
                items['item1'].onResize(event, data);
            }}
            onResizeEnd={items['item1'].onResizeEnd}
        >
            <div
                className='item-1'
            >
                Item1
            </div>
        </Item>
        <Item
            left={items['item2'].left}
            top={items['item2'].top}
            itemId='item2'
            zIndex={items['item2'].zIndex}
            className={items['item2'].className}
            style={items['item2'].style}
            bounds={items['item2'].bounds}
            handlerPositions={items['item2'].handlerPositions}
            syncItems={items['item2'].syncItems}
            onMouseDownItem={(event) => {
                setSelect('item2');
                items['item2'].onMouseDownItem(event);
            }}
            onMouseDownResizeHanlder={items['item2'].onMouseDownResizeHanlder}
            onDragStart={items['item2'].onDragStart}
            onDrag={(event, data) => {
                dispatchItems({type: 'setLeft', payload: {itemId: 'item2', content: data.x}});
                dispatchItems({type: 'setTop', payload: {itemId: 'item2', content: data.y}});
                items['item2'].onDrag(event, data);
            }}
            onDragEnd={items['item2'].onDragEnd}
            onResizeStart={items['item2'].onResizeStart}
            onResize={(event, data) => {
                dispatchItems({type: 'setLeft', payload: {itemId: 'item2', content: data.x}});
                dispatchItems({type: 'setTop', payload: {itemId: 'item2', content: data.y}});
                items['item2'].onResize(event, data);
            }}
            onResizeEnd={items['item2'].onResizeEnd}
        >
            <div
                style={{
                    width: '100px',
                    height: '100px',
                    overflow: 'scroll',
                }}
            >
                <p>row1</p>
                <p>row1</p>
                <p>row1</p>
                <p>row1</p>
                <p>row1</p>
                <p>row1</p>
                <p>row1</p>
                <p>row1</p>
                <p>row1</p>
                <p>row1</p>
                <p>row1</p>
            </div>
        </Item>
        <Item
            left={items['item3'].left}
            top={items['item3'].top}
            itemId='item3'
            zIndex={items['item3'].zIndex}
            className={items['item3'].className}
            style={items['item3'].style}
            bounds={items['item3'].bounds}
            handlerPositions={items['item3'].handlerPositions}
            syncItems={items['item3'].syncItems}
            onMouseDownItem={(event) => {
                setSelect('item3');
                items['item3'].onMouseDownItem(event);
            }}
            onMouseDownResizeHanlder={items['item3'].onMouseDownResizeHanlder}
            onDragStart={items['item3'].onDragStart}
            onDrag={(event, data) => {
                dispatchItems({type: 'setLeft', payload: {itemId: 'item3', content: data.x}});
                dispatchItems({type: 'setTop', payload: {itemId: 'item3', content: data.y}});
                items['item3'].onDrag(event, data);
            }}
            onDragEnd={items['item3'].onDragEnd}
            onResizeStart={items['item3'].onResizeStart}
            onResize={(event, data) => {
                dispatchItems({type: 'setLeft', payload: {itemId: 'item3', content: data.x}});
                dispatchItems({type: 'setTop', payload: {itemId: 'item3', content: data.y}});
                items['item3'].onResize(event, data);
            }}
            onResizeEnd={items['item3'].onResizeEnd}
        >
            <div
                className='item-3'
            >
                Item3
            </div>
        </Item>
    </SmartBoard>
}