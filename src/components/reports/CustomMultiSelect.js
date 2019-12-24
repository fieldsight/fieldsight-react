import React, { PureComponent } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
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

          {/* <div
            style={{
              position: 'relative',
              height: `300px `,
            }}
          >
            <PerfectScrollbar> */}
          <ul>
            {checkboxOption.length > 0 &&
              checkboxOption.map(option => {
                const filterList = selectedArr.filter(
                  i => i.code === option.code,
                );
                const isChecked =
                  filterList && filterList[0] ? true : false;
                return (
                  <li key={`option_${option.code}`}>
                    <div className="custom-control custom-checkbox">
                      <input
                        type="checkbox"
                        className="custom-control-input"
                        id={option.code}
                        name={option.code}
                        checked={isChecked}
                        onChange={e => {
                          handleCheck(e, option);
                        }}
                      />
                      <label
                        className="custom-control-label"
                        htmlFor={option.code}
                        style={{ paddingLeft: '2em' }}
                      >
                        {option.label}
                      </label>
                    </div>
                    {/* <CustomCheckBox
                    id={option.code}
                    name={option.code}
                    checked={selectedArr.includes(option.code)}
                    changeHandler={handleCheck}
                    label={option.label}
                  /> */}
                  </li>
                );
              })}
          </ul>
          {/* </PerfectScrollbar>
          </div> */}
        </div>
      </div>
    );
  }
}
