import React, { PureComponent } from 'react';
// import CustomCheckBox from './CustomCheckbox';
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
    console.log('here props', this.props);

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
                <div className="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    name={name}
                    checked={selectedArr.includes(option.name)}
                    onChange={e => {
                      handleCheck(e);
                    }}
                    className="custom-control-input"
                  />
                  <label
                    className="custom-control-label"
                    style={{ paddingLeft: '2em' }}
                  >
                    {option.name}
                  </label>
                </div>
                {/* <CustomCheckBox
                  className="custom-control custom-checkbox"
                  customInputClass="custom-control-input"
                  customLabelClass="custom-control-label"
                  label={option.name}
                  name={option.name}
                  checked={selectedArr.includes(option.name)}
                  changeHandler={handleCheck}
                /> */}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
