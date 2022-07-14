import * as React from "react";
import { useEffect, useState, useContext } from "react";
import './index.css';
import { DataCenter } from '../../lib/DataCenter';
import { contexts } from "../../lib/stateManagement/contexts";


const dataCenter = new DataCenter();

export const LineVer = (props) => {
    const {
        left,
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
            if(itemId !== dataCenter.curPos.itemId && dataCenter.curPos.itemId !== null && syncMovStates.syncIds.indexOf(itemId) === -1 && Math.abs(left - dataCenter.curPos.left || 0) < dataCenter.alignDistance) {
                dataCenter.alignState.left = left;
                setDisplay(true);
            }
            else if(itemId !== dataCenter.curPos.itemId && dataCenter.curPos.itemId !== null && syncMovStates.syncIds.indexOf(itemId) === -1 && Math.abs(left - dataCenter.curPos.right || 0) < dataCenter.alignDistance) {
                dataCenter.alignState.right = left;
                setDisplay(true);
            }
            else setDisplay(false);
        }
    }, [dataCenter.curPos.left, dataCenter.curPos.right]);
    useEffect(() => {
        if(!moving) setDisplay(false);
    }, [moving]);

    return <div className='canvas-component-line-ver' style={{left: left + 'px', display: display ? "block" : "none"}}></div>;
};