import React, { PureComponent } from 'react';
/* eslint-disable */

export default class CustomSelect extends PureComponent {
  render() {
    const {
      toggleSelectClass,
      handleToggleClass,
      name,
      options,
      value,
      handleSelect,
      toggleType,
    } = this.props;
    const label =
      name && name[0]
        ? name[0].name
          ? name[0].name
          : name[0].label
          ? name[0].label
          : name[0].title
          ? name[0].title
          : ''
        : '';

    return (
      <div className="common-select">
        <div
          className={
            toggleSelectClass[toggleType]
              ? 'select-wrapper select-toggle'
              : 'select-wrapper'
          }
          onClick={handleToggleClass}
          onKeyDown={handleToggleClass}
          role="button"
          tabIndex="0"
        >
          <span className="select-item">{label}</span>
          <ul>
            {options &&
              options.length > 0 &&
              options.map(option => (
                <li
                  key={`option_${
                    option.id ? option.id : option.code
                  }`}
                  className={
                    option.id
                      ? option.id === value
                        ? 'active'
                        : ''
                      : option.code
                      ? option.code === value
                        ? 'active'
                        : ''
                      : ''
                  }
                  onClick={e => {
                    handleSelect(e, option);
                  }}
                  onKeyDown={e => {
                    handleSelect(e, option);
                  }}
                  value={
                    option.id
                      ? option.id
                      : option.code
                      ? option.code
                      : ''
                  }
                  // role="button"
                  // tabIndex="0"
                >
                  {option.name
                    ? option.name
                    : option.label
                    ? option.label
                    : option.title
                    ? option.title
                    : ''}
                </li>
              ))}
          </ul>
        </div>
      </div>
    );
  }
}
