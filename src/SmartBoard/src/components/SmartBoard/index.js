import { StateManager } from "../../lib/stateManagement/StateManager";
import { SmartBoardCore } from "../SmartBoardCore";
import PropTypes from 'prop-types';

/**
 * SmartBoard component
 */
export const SmartBoard = (props) => {    
    return <StateManager>
        <SmartBoardCore {...props}/>
    </StateManager>
}

SmartBoard.propTypes = {
    className: PropTypes.string, // class name of the SmartBoard component
    style: PropTypes.object, // style of the SmartBoard component
    autoAlignDistance: PropTypes.number, // custom distance for auto-alignment of items within SmartBoard
}