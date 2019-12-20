import React, { PureComponent } from 'react';
import uuid from 'uuid/v4';
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
      site,
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
                    id={uuid()}
                    name={option.name}
                    checked={selectedArr.includes(option.id)}
                    changeHandler={handleCheck}
                    label={option.name}
                    site={site}
                    value={option.id}
                  />
                </li>
              ))}
          </ul>
        </div>
      </div>
    );
  }
}
