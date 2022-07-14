import './index.css';
import Select from 'react-select';

const styles = {
    option: (provided, state) => ({
        color: '#4D4D4D',
        backgroundColor: state.isFocused ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.85)',
        height: '30px',
        lineHeight: '30px',
        paddingLeft: '15px',
        fontSize: '50%',
    }),
    control: (provided, state) => ({
        ...provided,
        border: state.isFocused ? 0 : 0,
        boxShadow: state.isFocused ? 0 : 0,
        height: '25px',
        lineHeight: '25px',
        minHeight: '0px',
        fontSize: '50%',
        display: 'flex',
        alignItems: 'start',
        color: '#4D4D4D',
        backgroundColor: 'rgba(255, 255, 255, 0.85)',
    }),
    indicatorSeparator: () => ({}),
    dropdownIndicator: (provided, state) => ({
        ...provided,
        marginTop: '-5px'
    })
    
}
export const DropdownSelect = (props) => {
    const {
        options,
        value,
        onChange,
    } = props
    return <Select 
        value={{value: value, label: value}}
        isSearchable={false}
        options={options}
        styles={styles}
        onChange={onChange}
    />
}