import React from 'react';

function Select({option,onChange,...props}) {
    return (
        <select {...props} onChange={(e) => onChange(e.target.value)}>
            {option.map((item,index) =>(
                <option key={index}>{item}</option>
            ))}
        </select>
    );
}

export default Select;