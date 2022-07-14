import { BoardDisplayer } from './BoardDisplayer';
import { ItemDisplayer } from './ItemDisplayer';
import './index.css';

export const Displayer = (props) => {
    const {
        selected,
    } = props;
    return <div className='displayer'>
        <div className='displayer-header'>
            <span className='displayer-header-title'>{selected === "" ? 'SmartBoard' : selected}</span>
            <div className='displayer-header-separator'></div>
        </div>
        {selected === "" 
        ? <BoardDisplayer 
            {...props}
        /> 
        : <ItemDisplayer 
            {...props}
        />}
    </div>;
}