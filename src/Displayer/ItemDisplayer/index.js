import './index.css';
import { Tips } from '../../Tips';
import { DigitInput } from '../../DigitInput';
import { DropdownSelect } from '../../DropdownSelect';
import { ITEM_CLASSNAME } from '../../Demo';
import { Editor } from '../../Editor';
import { useEffect, useState } from 'react';


export const ItemDisplayer = (props) => {
    const {
        selected,
        items,
        dispatchItems,
    } = props;
    const {
        bounds,
        className,
        handlerPositions,
        itemId,
        left: leftPos,
        onDrag,
        onDragEnd,
        onDragStart,
        onMouseDownItem,
        onMouseDownResizeHanlder,
        onResize,
        onResizeEnd,
        onResizeStart,
        style,
        syncItems,
        top: topPos,
        zIndex,
    } = items[selected];

    const [itemBounds, setItemBounds] = useState(JSON.stringify(bounds));
    const [validBounds, setValidBounds] = useState(true);
    const [itemStyle, setItemStyle] = useState(JSON.stringify(style));
    const [validStyle, setValidStyle] = useState(true);
    const [itemHandlers, setItemHandlers] = useState(JSON.stringify(handlerPositions));
    const [validHandlers, setValidHandlers] = useState(true);
    const [syncs, setSyncs] = useState(JSON.stringify(syncItems));
    const [validSyncs, setValidSyncs] = useState(true); 
    const [onDragStartFn, setOnDragStartFn] = useState(onDragStart.toString());
    const [validDragStart, setValidDragStart] = useState(true);
    const [onDragFn, setOnDragFn] = useState(onDrag.toString());
    const [validDrag, setValidDrag] = useState(true);
    const [onDragEndFn, setOnDragEndFn] = useState(onDragEnd.toString());
    const [validDragEnd, setValidDragEnd] = useState(true);
    const [onResizeStartFn, setOnResizeStartFn] = useState(onResizeStart.toString());
    const [validResizeStart, setValidResizeStart] = useState(true);
    const [onResizeFn, setOnResizeFn] = useState(onResize.toString());
    const [validResize, setValidResize] = useState(true);
    const [onResizeEndFn, setOnResizeEndFn] = useState(onResizeEnd.toString());
    const [validResizeEnd, setValidResizeEnd] = useState(true);
    const [onMouseDownItemFn, setOnMouseDownItemFn] = useState(onMouseDownItem.toString());
    const [validMouseDownItem, setValidMouseDownItem] = useState(true);
    const [onMouseDownResizeHandlerFn, setOnMouseDownResizeHandlerFn] = useState(onMouseDownResizeHanlder.toString());
    const [validMouseDownHandler, setValidMouseDownHandler] = useState(true);

    useEffect(() => {
        setItemBounds(JSON.stringify(bounds));
    }, [bounds]);
    useEffect(() => {
        setItemStyle(JSON.stringify(style));
    }, [style]);
    useEffect(() => {
        setItemHandlers(JSON.stringify(handlerPositions));
    }, [handlerPositions]);
    useEffect(() => {
        setSyncs(JSON.stringify(syncItems));
    }, [syncItems]);
    useEffect(() => {
        setOnDragStartFn(onDragStart.toString());
    }, [onDragStart]);
    useEffect(() => {
        setOnDragFn(onDrag.toString());
    }, [onDrag]);
    useEffect(() => {
        setOnDragEndFn(onDragEnd.toString());
    }, [onDragEnd]);
    useEffect(() => {
        setOnResizeStartFn(onResizeStart.toString());
    }, [onResizeStart]);
    useEffect(() => {
        setOnResizeFn(onResize.toString());
    }, [onResize]);
    useEffect(() => {
        setOnResizeEndFn(onResizeEnd.toString());
    }, [onResizeEnd]);
    useEffect(() => {
        setOnMouseDownItemFn(onMouseDownItem.toString());
    }, [onMouseDownItem]);
    useEffect(() => {
        setOnMouseDownResizeHandlerFn(onMouseDownResizeHanlder.toString());
    }, [onMouseDownResizeHanlder]);

    const onChangeLeft = (event) => {
        dispatchItems({type: 'setLeft', payload: {itemId, content: parseInt(event.target.value)}});
    }
    const onChangeTop = (event) => {
        dispatchItems({type: 'setTop', payload: {itemId, content: parseInt(event.target.value)}});
    }
    const onChangeClassName = (selected) => {
        const { value } = selected
        dispatchItems({type: 'setClassName', payload: {itemId, content: value}})
    }
    const onChangeStyle = (event) => {
        setItemStyle(event.target.value);
        if(event.target.value === "") {
            dispatchItems({type: 'setStyle', payload: {itemId, content: {}}});
            setValidStyle(true);
        }
        else {
            let newStyle = null;
            try {
                newStyle = eval('(' + event.target.value + ')');
                setValidStyle(true);
                dispatchItems({type: 'setStyle', payload: {itemId, content: newStyle}});
            } catch(e) {
                setValidStyle(false);
            }
        }
    }
    const onChangeZIndex = (event) => {
        dispatchItems({type: 'setZIndex', payload: {itemId, content: parseInt(event.target.value)}});
    }
    const onChangeBounds = (event) => {
        setItemBounds(event.target.value);
        if(event.target.value === "") {
            dispatchItems({type: 'setBounds', payload: {itemId, content: {}}});
            setValidBounds(true);
        }
        else {
            let newBounds = null;
            try {
                newBounds = eval('(' + event.target.value + ')');
                setValidBounds(true);
                dispatchItems({type: 'setBounds', payload: {itemId, content: newBounds}});
            } catch(e) {
                setValidBounds(false);
            }
        }
    }
    const onChangeHandlers = (event) => {
        setItemHandlers(event.target.value);
        if(event.target.value === "") {
            dispatchItems({type: 'setHandlerPositions', payload: {itemId, content: undefined}});
            setValidHandlers(true);
        }
        else {
            let newHandlers = null;
            try {
                newHandlers = eval('(' + event.target.value + ')');
                setValidHandlers(true);
                dispatchItems({type: 'setHandlerPositions', payload: {itemId, content: newHandlers}});
            } catch(e) {
                setValidHandlers(false);
            }
        }
    }
    const onChangeSyncs = (event) => {
        setSyncs(event.target.value);
        if(event.target.value === "") {
            dispatchItems({type: 'setSyncItems', payload: {itemId, content: undefined}});
            setValidSyncs(true);
        }
        else {
            let newSyncs = null;
            try {
                newSyncs = eval('(' + event.target.value + ')');
                setValidSyncs(true);
                dispatchItems({type: 'setSyncItems', payload: {itemId, content: newSyncs}});
            } catch(e) {
                setValidSyncs(false);
            }
        }
    }
    const onChangeDragStart = (event) => {
        setOnDragStartFn(event.target.value);
        if(event.target.value === "") {
            dispatchItems({type: 'setOnDragStart', payload: {itemId, content: () => {}}});
            setValidDragStart(true);
        }
        else {
            let newFn = null;
            try {
                newFn = eval('(' + event.target.value + ')');
                setValidDragStart(true);
                dispatchItems({type: 'setOnDragStart', payload: {itemId, content: newFn}});
            } catch(e) {
                setValidDragStart(false);
            }
        }
    }
    const onChangeDrag = (event) => {
        setOnDragFn(event.target.value);
        if(event.target.value === "") {
            dispatchItems({type: 'setOnDrag', payload: {itemId, content: () => {}}});
            setValidDrag(true);
        }
        else {
            let newFn = null;
            try {
                newFn = eval('(' + event.target.value + ')');
                setValidDrag(true);
                dispatchItems({type: 'setOnDrag', payload: {itemId, content: newFn}});
            } catch(e) {
                setValidDrag(false);
            }
        }
    }
    const onChangeDragEnd = (event) => {
        setOnDragEndFn(event.target.value);
        if(event.target.value === "") {
            dispatchItems({type: 'setOnDragEnd', payload: {itemId, content: () => {}}});
            setValidDragEnd(true);
        }
        else {
            let newFn = null;
            try {
                newFn = eval('(' + event.target.value + ')');
                setValidDragEnd(true);
                dispatchItems({type: 'setOnDragEnd', payload: {itemId, content: newFn}});
            } catch(e) {
                setValidDragEnd(false);
            }
        }
    }
    const onChangeResizeStart = (event) => {
        setOnResizeStartFn(event.target.value);
        if(event.target.value === "") {
            dispatchItems({type: 'setOnResizeStart', payload: {itemId, content: () => {}}});
            setValidResizeStart(true);
        }
        else {
            let newFn = null;
            try {
                newFn = eval('(' + event.target.value + ')');
                setValidResizeStart(true);
                dispatchItems({type: 'setOnResizeStart', payload: {itemId, content: newFn}});
            } catch(e) {
                setValidResizeStart(false);
            }
        }
    }
    const onChangeResize = (event) => {
        setOnResizeFn(event.target.value);
        if(event.target.value === "") {
            dispatchItems({type: 'setOnResize', payload: {itemId, content: () => {}}});
            setValidResize(true);
        }
        else {
            let newFn = null;
            try {
                newFn = eval('(' + event.target.value + ')');
                setValidResize(true);
                dispatchItems({type: 'setOnResize', payload: {itemId, content: newFn}});
            } catch(e) {
                setValidResize(false);
            }
        }
    }
    const onChangeResizeEnd = (event) => {
        setOnResizeEndFn(event.target.value);
        if(event.target.value === "") {
            dispatchItems({type: 'setOnResizeEnd', payload: {itemId, content: () => {}}});
            setValidResizeEnd(true);
        }
        else {
            let newFn = null;
            try {
                newFn = eval('(' + event.target.value + ')');
                setValidResizeEnd(true);
                dispatchItems({type: 'setOnResizeEnd', payload: {itemId, content: newFn}});
            } catch(e) {
                setValidResizeEnd(false);
            }
        }
    }
    const onChangeMouseDownItem = (event) => {
        setOnMouseDownItemFn(event.target.value);
        if(event.target.value === "") {
            dispatchItems({type: 'setOnMouseDownItem', payload: {itemId, content: () => {}}});
            setValidMouseDownItem(true);
        }
        else {
            let newFn = null;
            try {
                newFn = eval('(' + event.target.value + ')');
                setValidMouseDownItem(true);
                dispatchItems({type: 'setOnMouseDownItem', payload: {itemId, content: newFn}});
            } catch(e) {
                setValidMouseDownItem(false);
            }
        }
    }
    const onChangeMouseDownHandler = (event) => {
        setOnMouseDownResizeHandlerFn(event.target.value);
        if(event.target.value === "") {
            dispatchItems({type: 'setOnMouseDownResizeHanlder', payload: {itemId, content: () => {}}});
            setValidMouseDownHandler(true);
        }
        else {
            let newFn = null;
            try {
                newFn = eval('(' + event.target.value + ')');
                setValidMouseDownHandler(true);
                dispatchItems({type: 'setOnMouseDownResizeHanlder', payload: {itemId, content: newFn}});
            } catch(e) {
                setValidMouseDownHandler(false);
            }
        }
    }
    return <>
        <div className='item-detail-container item-position'>
            <div className='item-position-left'>
                <span className='item-detail-title'>left</span>
                <Tips text={'set left for <Item /> component'} tipId={'leftPos'}/>
                <DigitInput 
                    value={leftPos}
                    min={0}
                    max={1000000}
                    onChange={onChangeLeft}
                />
            </div>
            <div className='item-position-top'>
                <span className='item-detail-title'>top</span>
                <Tips text={'set top for <Item /> component'} tipId={'topPos'}/>
                <DigitInput 
                    value={topPos}
                    min={0}
                    max={1000000}
                    onChange={onChangeTop}
                />
            </div>
        </div>
        <div className='item-detail-container'>
            <span className='item-detail-title'>className</span>
            <Tips text={'set className for <Item /> component'} tipId={'className'}/>
            <div className='item-detail-select'>
                <DropdownSelect 
                    value={className}
                    options={ITEM_CLASSNAME.map((val) => {
                        return { value: val, label: val };
                    })}
                    onChange={onChangeClassName}
                />
            </div>
        </div>
        <div className='item-detail-container'>
            <span className='item-detail-title'>style</span>
            <Tips text={'set style for <Item /> component'} tipId={'style'}/>
            <Editor 
                code={itemStyle}
                placeHolder='Please enter object for style'
                onCodeChange={onChangeStyle}
                isValid={validStyle}
            />
        </div>
        <div className='item-detail-container item-position'>
            <span className='item-detail-title'>zIndex</span>
            <Tips text={'set zIndex for <Item /> component'} tipId={'zIndex'}/>
            <DigitInput 
                value={zIndex}
                min={0}
                max={1000000}
                onChange={onChangeZIndex}
            />
        </div>
        <div className='item-detail-container'>
            <span className='item-detail-title'>bounds</span>
            <Tips text={'set bounds for <Item /> component'} tipId={'bounds'}/>
            <Editor 
                code={itemBounds}
                placeHolder='Please enter object for bounds'
                onCodeChange={onChangeBounds}
                isValid={validBounds}
            />
        </div>
        <div className='item-detail-container'>
            <span className='item-detail-title'>handlerPositions</span>
            <Tips text={'set handlerPositions for <Item /> component'} tipId={'handlerPositions'}/>
            <Editor 
                code={itemHandlers}
                placeHolder='Please enter object for handlerPositions'
                onCodeChange={onChangeHandlers}
                isValid={validHandlers}
            />
        </div>
        <div className='item-detail-container'>
            <span className='item-detail-title'>syncItems</span>
            <Tips text={'set syncItems for <Item /> component'} tipId={'syncItems'}/>
            <Editor 
                code={syncs}
                placeHolder='Please enter array for syncItems'
                onCodeChange={onChangeSyncs}
                isValid={validSyncs}
            />
        </div>
        <div className='item-detail-container'>
            <span className='item-detail-title'>onDragStart</span>
            <Tips text={'set onDragStart for <Item /> component'} tipId={'onDragStart'}/>
            <Editor 
                code={onDragStartFn}
                placeHolder='Please enter function for onDragStart'
                onCodeChange={onChangeDragStart}
                isValid={validDragStart}
            />
        </div>
        <div className='item-detail-container'>
            <span className='item-detail-title'>onDrag</span>
            <Tips text={'set onDrag for <Item /> component'} tipId={'onDrag'}/>
            <Editor 
                code={onDragFn}
                placeHolder='Please enter function for onDrag'
                onCodeChange={onChangeDrag}
                isValid={validDrag}
            />
        </div>
        <div className='item-detail-container'>
            <span className='item-detail-title'>onDragEnd</span>
            <Tips text={'set onDragEnd for <Item /> component'} tipId={'onDragEnd'}/>
            <Editor 
                code={onDragEndFn}
                placeHolder='Please enter function for onDragEnd'
                onCodeChange={onChangeDragEnd}
                isValid={validDragEnd}
            />
        </div>
        <div className='item-detail-container'>
            <span className='item-detail-title'>onResizeStart</span>
            <Tips text={'set onResizeStart for <Item /> component'} tipId={'onResizeStart'}/>
            <Editor 
                code={onResizeStartFn}
                placeHolder='Please enter function for onResizeStart'
                onCodeChange={onChangeResizeStart}
                isValid={validResizeStart}
            />
        </div>
        <div className='item-detail-container'>
            <span className='item-detail-title'>onResize</span>
            <Tips text={'set onResize for <Item /> component'} tipId={'onResize'}/>
            <Editor 
                code={onResizeFn}
                placeHolder='Please enter function for onResize'
                onCodeChange={onChangeResize}
                isValid={validResize}
            />
        </div>
        <div className='item-detail-container'>
            <span className='item-detail-title'>onResizeEnd</span>
            <Tips text={'set onResizeEnd for <Item /> component'} tipId={'onResizeEnd'}/>
            <Editor 
                code={onResizeEndFn}
                placeHolder='Please enter function for onResizeEnd'
                onCodeChange={onChangeResizeEnd}
                isValid={validResizeEnd}
            />
        </div>
        <div className='item-detail-container'>
            <span className='item-detail-title'>onMouseDownItem</span>
            <Tips text={'set onMouseDownItem for <Item /> component'} tipId={'onMouseDownItem'}/>
            <Editor 
                code={onMouseDownItemFn}
                placeHolder='Please enter function for onMouseDownItem'
                onCodeChange={onChangeMouseDownItem}
                isValid={validMouseDownItem}
            />
        </div>
        <div className='item-detail-container bottom'>
            <span className='item-detail-title'>onMouseDownResizeHanlder</span>
            <Tips text={'set onMouseDownResizeHanlder for <Item /> component'} tipId={'onMouseDownResizeHanlder'}/>
            <Editor 
                code={onMouseDownResizeHandlerFn}
                placeHolder='Please enter function for onMouseDownResizeHanlder'
                onCodeChange={onChangeMouseDownHandler}
                isValid={validMouseDownHandler}
            />
        </div>
    </>
}