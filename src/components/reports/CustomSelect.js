import React, { PureComponent } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
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
      height,
    } = this.props;
    const label =
      name && name[0]
        ? name[0].name
          ? name[0].form_name
            ? `${name[0].name}-(${name[0].form_name})`
            : name[0].name
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
            <div
              style={{
                position: 'relative',
                height: `${height ? height : 'auto'}`,
              }}
            >
              <PerfectScrollbar>
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
                        ? option.form_name
                          ? `${option.name}(${option.form_name})`
                          : option.name
                        : option.label
                        ? option.label
                        : option.title
                        ? option.title
                        : ''}
                    </li>
                  ))}
              </PerfectScrollbar>
            </div>
          </ul>
        </div>
      </div>
    );
  }
}
