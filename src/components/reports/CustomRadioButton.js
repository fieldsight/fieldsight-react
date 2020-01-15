import React from 'react';

const CustomRadioButton = ({
  id,
  name,
  value,
  changeHandler,
  label,
  checked,
}) => {
  return (
    <div className="custom-control custom-radio" id="radio">
      <input
        type="radio"
        className="custom-control-input"
        id={id}
        name={name}
        value={value}
        onChange={changeHandler}
        checked={checked}
      />
      <label className="custom-control-label" htmlFor={id}>
        {label}
      </label>
    </div>
  );
};
export default CustomRadioButton;
