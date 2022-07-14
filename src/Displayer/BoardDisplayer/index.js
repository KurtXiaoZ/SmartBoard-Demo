import { BOARD_CLASSNAMES } from '../../Board';
import { Editor } from '../../Editor';
import { DropdownSelect } from '../../DropdownSelect';
import { Tips } from '../../Tips';
import './index.css';
import { useEffect, useState } from 'react';
import { DigitInput } from '../../DigitInput';

export const BoardDisplayer = (props) => {
    const {
        selected,
        smartBoardState,
        dispatchSmartBoard,
    } = props;
    const {
        className,
        style,
        autoAlignDistance,
        onMouseDown,
    } = smartBoardState;

    const [boardStyle, setBoardStyle] = useState(JSON.stringify(style));
    const [validStyle, setValidStyle] = useState(true);
    const [mouseDown, setMouseDown] = useState(onMouseDown.toString());
    const [validMouseDown, setValidMouseDown] = useState(true);


    const onChangeClassName = (selected) => {
        const { value } = selected;
        dispatchSmartBoard({type: 'setClassName', payload: value});
    }
    const onChangeStyle = (event) => {
        setBoardStyle(event.target.value);
        if(event.target.value === "") {
            dispatchSmartBoard({type: 'setStyle', payload: {}});
            setValidStyle(true);
        }
        else {
            let newStyle = null;
            try {
                newStyle = eval('(' + event.target.value + ')');
                setValidStyle(true);
                dispatchSmartBoard({type: 'setStyle', payload: newStyle});
            } catch(e) {
                setValidStyle(false);
            }
        }
    }
    const onAlignDisChange = (event) => {
        dispatchSmartBoard({type: 'setAutoAlignDistance', payload: parseInt(event.target.value)});
    }
    const onChangeMouseDown = (event) => {
        setMouseDown(event.target.value);
        if(event.target.value === "") {
            dispatchSmartBoard({type: 'setOnMouseDown', payload: () => {}});
            setValidMouseDown(true);
        }
        else {
            let newMouseDown = null;
            try {
                newMouseDown = eval('(' + event.target.value + ')');
                setValidMouseDown(true);
                dispatchSmartBoard({type: 'setOnMouseDown', payload: newMouseDown});
            } catch(e) {
                setValidMouseDown(false);
            }
        }
    }
    return <>
        <div className='smart-board-className'>
            <span className='smart-board-className-title'>className</span>
            <Tips text={'set className for <SmartBoard /> component'} tipId='className'/>
            <div className='smart-board-className-select'>
                <DropdownSelect 
                    value={className}
                    options={BOARD_CLASSNAMES.map((val) => {
                        return { value: val, label: val };
                    })}
                    onChange={onChangeClassName}
                />
            </div>
        </div>
        <div className='smart-board-style'>
            <span className='smart-board-style-title'>style</span>
            <Tips text={'set style for <SmartBoard /> component'} tipId='style'/>
            <Editor 
                code={boardStyle}
                placeHolder='Please enter js object for style'
                onCodeChange={onChangeStyle}
                isValid={validStyle}
            />
        </div>
        <div className='smart-board-alignDis'>
            <span className='smart-board-alignDis-title'>autoAlignDistance</span>
            <Tips text={'set autoAlignDistance for <SmartBoard /> component'} tipId='autoAlignDistance'/>
            <DigitInput 
                value={autoAlignDistance}
                min={0}
                max={15}
                onChange={onAlignDisChange}
            />
        </div>
        <div className='smart-board-mouseDown'>
            <span className='smart-board-mouseDown-title'>onMouseDown</span>
            <Tips text={'set onMouseDown for <SmartBoard /> component'} tipId='onMouseDown'/>
            <Editor 
                code={mouseDown}
                placeHolder='Please enter (event) => void for onMouseDown'
                onCodeChange={onChangeMouseDown}
                isValid={validMouseDown}
            />
        </div>
    </>
}