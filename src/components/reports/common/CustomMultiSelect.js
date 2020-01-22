import React, { PureComponent } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
/* eslint-disable */

export default class CustomMultiSelect extends PureComponent {
  render() {
    const {
      toggleSelectClass,
      handleToggleClass,
      toggleType,
      checkboxOption,
      handleCheck,
      selectedArr,
      placeholderTxt,
      site,
    } = this.props;
    // debugger;
    const className = toggleType
      ? toggleSelectClass[toggleType]
      : toggleSelectClass;
    return (
      <div className="common-select">
        <div
          className={
            className
              ? 'select-wrapper select-toggle'
              : 'select-wrapper'
          }
          onFocus={handleToggleClass}
          // onKeyDown={handleToggleClass}
          // onClick={handleToggleClass}
          role="button"
          tabIndex="0"
          onBlur={handleToggleClass}
        >
          <span className="select-item">{placeholderTxt}</span>

          <ul>
            <div
              style={{
                position: 'relative',
                height: `200px`,
              }}
            >
              <PerfectScrollbar>
                {checkboxOption.length > 0 &&
                  checkboxOption.map((option, index) => {
                    const filterList = selectedArr.filter(i =>
                      i.code
                        ? i.code === option.code
                        : i.name
                        ? i.name === option.name
                        : i.id
                        ? i.id === option.id
                        : '',
                    );

                    const isChecked =
                      filterList && filterList[0] ? true : false;
                    const id = option.code
                      ? option.code
                      : option.identifier
                      ? option.identifier
                      : option.id
                      ? option.id
                      : option.name
                      ? option.name
                      : '';
                    const name = option.code
                      ? option.code
                      : option.name
                      ? option.name
                      : '';
                    return (
                      <li
                        key={`option_${
                          option.code
                            ? option.code
                            : option.identifier
                            ? option.identifier
                            : option.id
                            ? option.id
                            : option.name
                            ? option.name
                            : ''
                        }_${index}`}
                      >
                        <div
                          className="custom-control custom-checkbox"
                          id="checkbox"
                        >
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id={id}
                            name={name}
                            checked={isChecked}
                            onChange={e => {
                              handleCheck(e, option);
                            }}
                          />
                          <label
                            className="custom-control-label"
                            htmlFor={id}
                            style={{ paddingLeft: '2em' }}
                          >
                            {option.type && option.name
                              ? option.name
                              : option.label
                              ? option.label
                              : option.title
                              ? option.title
                              : option.name}
                          </label>
                        </div>
                      </li>
                    );
                  })}
              </PerfectScrollbar>
            </div>
          </ul>
        </div>
      </div>
    );
  }
}
