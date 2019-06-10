import React from "react";

const SelectElement = ({
  formType,
  className,
  label,
  options,
  changeHandler
}) => (
  <div className="form-group">
    {label && (
      <label>
        {label} {formType === "editForm" && <sup>*</sup>}
      </label>
    )}
    <select className={className} onChange={changeHandler}>
      {options.length > 0 ? (
        options.map((option, i) => (
          <option
            value={option.name ? option.name : option}
            key={`${option.name ? option.name : option}${i}`}
          >
            {option.name ? option.name : option}
          </option>
        ))
      ) : (
        <option>--Select--</option>
      )}
    </select>
  </div>
);

export default SelectElement;
