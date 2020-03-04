import React from 'react';
/* eslint-disable  react/prop-types */

const CustomCheckBox = ({
  id,
  name,
  checked,
  changeHandler,
  label,
  ...rest
}) => (
  <div className="custom-control custom-checkbox">
    <input
      type="checkbox"
      className="custom-control-input"
      id={id}
      name={name}
      checked={checked}
      onChange={changeHandler}
      value={id}
      {...rest}
    />
    <label
      className="custom-control-label"
      htmlFor={id}
      style={{ paddingLeft: '2em' }}
    >
      {label}
    </label>
  </div>
);

export default CustomCheckBox;
