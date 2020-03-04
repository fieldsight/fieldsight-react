import React, { Component } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
/* eslint-disable */

export default class CustomSelect extends Component {
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
      name,
      options,
      value,
      handleSelect,
      toggleType,
      height,
      disable,
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
          className={`${
            disable ? 'is-disable' : ''
          } select-wrapper select-toggle`}
          onClick={this.handleOnOpen}
          onKeyDown={this.handleOnOpen}
          role="button"
          tabIndex="0"
          onBlur={this.handleonClose}
        >
          <span className="select-item">{label}</span>
          {isOpen && (
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
                          option.id
                            ? option.id
                            : option.code
                            ? option.code
                            : option.name
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
                            : option.name
                            ? option.name === value
                              ? 'active'
                              : ''
                            : ''
                        }
                        onClick={e => {
                          handleSelect(e, option),
                            this.handleonClose(e);
                        }}
                        onKeyDown={e => {
                          handleSelect(e, option),
                            this.handleonClose(e);
                        }}
                        value={
                          option.id
                            ? option.id
                            : option.code
                            ? option.code
                            : option.name
                            ? option.name
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
          )}
        </div>
      </div>
    );
  }
}
