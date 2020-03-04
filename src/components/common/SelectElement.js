import React from 'react';

/* eslint-disable   react/prop-types */
/* eslint-disable   react/no-array-index-key */
/* eslint-disable   no-unneeded-ternary */

const SelectElement = ({
  formType,
  className,
  label,
  options,
  changeHandler,
  value,
  classname,
}) => {
  return (
    <div className={`form-group ${classname}`}>
      {label && (
        <label>
          {label}
          {formType === 'editForm' && <sup>*</sup>}
        </label>
      )}
      <div className="select-option">
        <select
          className={className}
          onChange={changeHandler}
          value={value ? value : undefined}
        >
          {options.map((option, i) => (
            <option
              value={
                option.xf_id
                  ? option.xf_id
                  : option.id
                  ? option.id
                  : option.name
                  ? option.name
                  : option.key
                  ? option.key
                  : ''
              }
              key={`${
                option.name
                  ? option.name
                  : option.value
                  ? option.value
                  : option.identifier
                  ? option.identifier
                  : option.title
                  ? option.title
                  : option.label
                  ? option.label
                  : option.title
                  ? option.title
                  : ''
              }${i}`}
            >
              {option.name
                ? option.name
                : option.value
                ? option.value
                : option.identifier
                ? option.identifier
                : option.title
                ? option.title
                : option.label
                ? option.label
                : ''}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SelectElement;
