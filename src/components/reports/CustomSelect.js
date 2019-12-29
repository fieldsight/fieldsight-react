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
    } = this.props;
    // console.log('in form comp', options, name, value);
    const label =
      name && name[0]
        ? name[0].name
          ? name[0].name
          : name[0].label
          ? name[0].label
          : ''
        : '';

    return (
      <div className="common-select">
        <div
          className={
            toggleSelectClass
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
                  onClick={handleSelect}
                  onKeyDown={handleSelect}
                  value={option.id}
                  // role="button"
                  // tabIndex="0"
                >
                  {option.name
                    ? option.name
                    : option.label
                    ? option.label
                    : ''}
                </li>
              ))}
          </ul>
        </div>
      </div>
    );
  }
}
