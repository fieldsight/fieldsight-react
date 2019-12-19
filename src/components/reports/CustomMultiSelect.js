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
          className={
            toggleSelectClass
              ? 'select-wrapper select-toggle'
              : 'select-wrapper'
          }
          onClick={handleToggleClass}
        >
          <span className="select-item">{placeholderTxt}</span>
          <ul>
            {checkboxOption.length > 0 &&
              checkboxOption.map(option => (
                <li key={`option_${option.id}`}>
                  <CustomCheckBox
                    id={option.id}
                    name={option.name}
                    checked={selectedArr.includes(option.name)}
                    changeHandler={handleCheck}
                    label={option.name}
                  />
                </li>
              ))}
          </ul>
        </div>
      </div>
    );
  }
}
