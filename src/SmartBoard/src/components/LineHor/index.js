import { contexts } from "../../lib/stateManagement/contexts";
import * as React from "react";
import { useContext, useEffect, useState } from "react";
import { DataCenter } from '../../lib/DataCenter';
import './index.css';


const dataCenter = new DataCenter();

export const LineHor = (props) => {
    const {
        top,
        itemId,
    } = props;
    const [display, setDisplay] = useState(false);
    const { moving } = useContext(contexts['MovementContext']);
    const { syncMovStates } = useContext(contexts['SyncMovContext']);
    useEffect(() => {
        if(dataCenter.alignDistance === 0) {
            setDisplay(false);
            dataCenter.alignState = {left: null, right: null, top: null, bottom: null, leftX: null, rightX: null, topY: null, bottomY: null};
        }
        else {
            if(itemId !== dataCenter.curPos.itemId && dataCenter.curPos.itemId !== null && syncMovStates.syncIds.indexOf(itemId) === -1 && Math.abs(top - dataCenter.curPos.top) < dataCenter.alignDistance) {
                dataCenter.alignState.top = top;
                setDisplay(true);
            }
            else if(itemId !== dataCenter.curPos.itemId && dataCenter.curPos.itemId !== null && syncMovStates.syncIds.indexOf(itemId) === -1 && Math.abs(top - dataCenter.curPos.bottom) < dataCenter.alignDistance) {
                dataCenter.alignState.bottom = top;
                setDisplay(true);
            }
            else {
                setDisplay(false);
            }
        }
    }, [dataCenter.curPos.top, dataCenter.curPos.bottom]);
    useEffect(() => {
        if(!moving) setDisplay(false);
    }, [moving]);

    return <div 
        className='line-hor' 
        style={{
            top: top + 'px', 
            display: display ? "block" : "none",
        }}></div>;
};