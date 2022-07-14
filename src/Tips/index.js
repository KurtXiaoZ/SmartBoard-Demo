import './index.css';
import React, { useState } from 'react';
import { ReactComponent as Icon } from './icon.svg';
import ReactTooltip from 'react-tooltip';

export const Tips = (props) => {
    const {
        text,
        tipId,
    } = props;
    return <div className='tips'>
        <Icon data-tip data-for={tipId}/>
        <ReactTooltip id={tipId} effect='solid'>
            <span>{text}</span>
        </ReactTooltip>
    </div>
}