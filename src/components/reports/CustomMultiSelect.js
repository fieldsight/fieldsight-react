import React, { PureComponent } from 'react';
import CustomCheckBox from './CustomCheckbox';
/* eslint-disable */

export default class CustomMultiSelect extends PureComponent {
  render() {
    const {
      toggleSelectClass,
      handleToggleClass,
      checkboxOption,
      handleCheck,
      selectedArr,
      placeholderTxt,
    } = this.props;
    return (
      <div className="common-select">
        <div
          className={`select-wrapper ${
            toggleSelectClass ? 'select-toggle' : ''
          }`}
          onClick={() => {
            handleToggleClass();
          }}
        >
          <span className="select-item">{placeholderTxt}</span>
          <ul>
            {checkboxOption.map(option => (
              <li key={`option_${option.id}`}>
                <CustomCheckBox
                  className="custom-control custom-checkbox"
                  customInputClass="custom-control-input"
                  customLabelClass="custom-control-label"
                  label={option.name}
                  name={option.name}
                  checked={selectedArr.includes(option.name)}
                  changeHandler={handleCheck}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
