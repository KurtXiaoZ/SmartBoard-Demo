import { useContext, useEffect } from "react";
import { contexts } from "../../lib/stateManagement/contexts";
import { DataCenter } from "../../lib/DataCenter";
import PropTypes from 'prop-types';

const dataCenter = new DataCenter();

/**
 * SmartBoard component
 * @param { Object } children       children of SmartBoard
 * @param { String } className      custom class name for SmartBoard
 * @param { Object } style          custom style for SmartBoard
 * @returns { Object }  the SmartBoard component
 */
export const SmartBoardCore = (props) => {
    const { 
        children, 
        className, 
        autoAlignDistance, 
        style,
        onMouseDown,
        ...rest 
    } = props;
	const { setSelected } = useContext(contexts['SelectionContext']);

    useEffect(() => {
        if(typeof autoAlignDistance === 'number') {
            if(autoAlignDistance < 0) dataCenter.alignDistance = 0;
            else if(autoAlignDistance > 15) dataCenter.alignDistance = 15;
            else dataCenter.alignDistance = autoAlignDistance;
        }
    }, [autoAlignDistance]);
    
    return <div
        className={className}
        style={{
            ...style,
            position: 'relative',
            overflowY: 'hidden',
        }}
        onMouseDown={(event) => {
			setSelected('');
            onMouseDown(event);
		}}
        id='smart-board'
        {...rest}
    >
        {children}
    </div>
}

SmartBoardCore.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    autoAlignDistance: PropTypes.number,
    onMouseDown: PropTypes.func,
}