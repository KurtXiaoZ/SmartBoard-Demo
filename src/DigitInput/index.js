import './index.css';

export const DigitInput = (props) => {
    const {
        value,
        min,
        max,
        onChange,
    } = props;

    return <input 
        className='digit-input'
        type='text'
        value={value || 0}
        min={min}
        max={max}
        onChange={onChange}
        onKeyPress={(event) => {
            if (!/[0-9]/.test(event.key)) {
              event.preventDefault();
            }
        }}
    />
}