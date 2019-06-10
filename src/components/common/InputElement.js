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
    {removeBtn && (
      <button
        style={{ display: "inline-block", background: "red" }}
        onClick={removeHandler}
      >
        Remove
      </button>
    )}
    {formType === "floatingForm" && <label htmlFor={htmlFor}>{label}</label>}
  </div>
);

export default InputElement;
