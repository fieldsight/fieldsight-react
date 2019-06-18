import React from "react";

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
    <select
      className={className}
      onChange={changeHandler}
      value={value ? value : undefined}
    >
      {options.length > 0 ? (
        options.map((option, i) => (
          <option
            value={option.id ? option.id : option.name ? option.name : option}
            key={`${option.name ? option.name : option}${i}`}
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
);

export default SelectElement;
