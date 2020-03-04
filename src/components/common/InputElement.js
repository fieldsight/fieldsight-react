import React from 'react';
/* eslint-disable  react/prop-types */

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
  removeHandler,
  classname,
  ...rest
}) => (
  <div className={`form-group ${classname}`}>
    {formType === 'editForm' && (
      <label htmlFor={htmlFor}>
        {label}
        {required && <sup>*</sup>}
      </label>
    )}

    <Tag
      type={type}
      className="form-control"
      required={required}
      value={value ? value : ''}
      onChange={changeHandler}
      name={name}
      {...rest}
    />

    {formType === 'floatingForm' && (
      <label htmlFor={htmlFor}>{label}</label>
    )}

    {removeBtn && (
      <span
        className="cross-icon"
        tabIndex="0"
        role="button"
        onKeyDown={removeHandler}
        onClick={removeHandler}
      >
        <i className="la la-close" />
      </span>
    )}
  </div>
);

export default InputElement;
