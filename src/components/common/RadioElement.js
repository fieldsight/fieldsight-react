import React from "react";

const RadioElement = ({
  name,
  checked,
  className,
  changeHandler,
  label,
  value
}) => (
  <div className={`radiobox ${className}`}>
    <label>
      {" "}
      <input
        type="radio"
        name={name}
        checked={checked}
        onChange={changeHandler}
        value={value}
      />
      <i className="helper" />
      {label}
    </label>
  </div>
);

export default RadioElement;
