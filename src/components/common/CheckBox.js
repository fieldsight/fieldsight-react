import React from 'react';

const CheckBox = ({
  name,
  checked,
  className,
  changeHandler,
  label,
  ...rest
}) => (
  <div className={`checkbox ${className}`}>
    <label>
      <input
        type="checkbox"
        {...rest}
        name={name}
        checked={checked}
        onChange={changeHandler}
      />
      <i className="helper" /> {label}
    </label>
  </div>
);

export default CheckBox;
