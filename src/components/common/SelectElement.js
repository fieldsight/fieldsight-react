import React from "react";
import uuid from "uuid/v4";

const SelectElement = ({
  formType,
  className,
  label,
  options,
  changeHandler,
  value
}) => (
  <div className="form-group">
    {label && (
      <label>
        {label} {formType === "editForm" && <sup>*</sup>}
      </label>
    )}
    <div className="select-option">
      <select
        className={className}
        onChange={changeHandler}
        onFocus={options.length > 0 ? changeHandler : () => {}}
        value={value ? value : undefined}
      >
        {options.length > 0 ? (
          options.map((option, i) => (
            <option
              value={option.id ? option.id : option.name ? option.name : option}
              key={uuid()}
            >
              {option.name ? option.name : option}
            </option>
          ))
        ) : value ? (
          <option>{value}</option>
        ) : (
          <option>--Select--</option>
        )}
      </select>
    </div>
  </div>
);

export default SelectElement;
