import React from 'react';
/* eslint-disable  react/prop-types */

const CustomCheckBox = ({
  name,
  checked,
  className,
  changeHandler,
  label,
  translation,
  customInputClass,
  customLabelClass,
  ...rest
}) => (
  <div className={className}>
    <input
      type="checkbox"
      {...rest}
      name={name}
      checked={checked}
      onChange={e => changeHandler(e)}
      className={customInputClass}
    />
    <label
      className={customLabelClass}
      style={{ paddingLeft: '2em' }}
    >
      {label}
    </label>
  </div>
);

export default CustomCheckBox;
