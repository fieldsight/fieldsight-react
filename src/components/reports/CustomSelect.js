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
    const label = name[0] && name[0].name;

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
                  key={`option_${option.id}`}
                  className={option.id === value ? 'active' : ''}
                  onClick={handleSelect}
                  onKeyDown={handleSelect}
                  value={option.id}
                  // role="button"
                  // tabIndex="0"
                >
                  {option.name}
                </li>
              ))}
          </ul>
        </div>
      </div>
    );
  }
}
