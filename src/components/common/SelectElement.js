import React from 'react';

const SelectElement = ({ className, label, options }) => (
    <div className="form-group">
        {label && <label>{label}</label>}
        <select className={className}>
            {options.map((option, i) => (
                <option key={`${option}${i}`}>{option}</option>
            ))}
        </select>
    </div>
)

export default SelectElement