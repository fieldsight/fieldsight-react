import React from 'react';
import { FormattedMessage } from 'react-intl';
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
  translation,
  ...rest
}) => (
  <div className={`form-group ${classname}`}>
    {formType === 'editForm' &&
      (translation ? (
        <label htmlFor={htmlFor}>
          <FormattedMessage id={label} defaultMessage={label} />
          {required && <sup>*</sup>}
        </label>
      ) : (
        <label htmlFor={htmlFor}>
          {label}
          {required && <sup>*</sup>}
        </label>
      ))}

    <Tag
      type={type}
      className="form-control"
      required={required}
      value={value ? value : ''}
      onChange={changeHandler}
      name={name}
      {...rest}
    />

    {formType === 'floatingForm' &&
      (translation === true ? (
        <label htmlFor={htmlFor}>
          <FormattedMessage id={label} defaultMessage={label} />
        </label>
      ) : (
        <label htmlFor={htmlFor}>{label}</label>
      ))}

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
