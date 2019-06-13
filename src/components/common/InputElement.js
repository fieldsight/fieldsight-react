import React from "react";

const InputElement = ({
  tag: Tag,
  name,
  formType,
  type,
  required,
  label,
  htmlFor,
  value,
  changeHandler,
  removeBtn,
  removeHandler
}) => (
  <div className="form-group">
    {formType === "editForm" && (
      <label htmlFor={htmlFor}>
        {label} {required && <sup>*</sup>}
      </label>
    )}
    <Tag
      type={type}
      className="form-control"
      required={required}
      value={value}
      onChange={changeHandler}
      name={name}
    />

    {formType === "floatingForm" && <label htmlFor={htmlFor}>{label}</label>}

    {removeBtn && (
      <button className="fieldsight-btn red" onClick={removeHandler}>
        Remove
      </button>
    )}
  </div>
);

export default InputElement;
