import React, { Component } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
/* eslint-disable */

export default class CustomMultiSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }

  handleOnOpen = () => {
    this.setState({ isOpen: true });
  };

  handleonClose = event => {
    event.stopPropagation();
    this.setState({ isOpen: false });
  };

  render() {
    const { isOpen } = this.state;
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
          onClick={handleToggleClass}
          onKeyDown={handleToggleClass}
          role="button"
          tabIndex="0"
          // onBlur={this.handleonClose}
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
                        // onClick={e => {
                        //   this.handleonClose(e);
                        // }}
                        // onKeyDown={e => {
                        //   this.handleonClose(e);
                        // }}
                      >
                        <div className="custom-control custom-checkbox">
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
