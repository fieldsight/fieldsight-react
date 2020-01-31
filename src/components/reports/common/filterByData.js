import React, { PureComponent } from 'react';
import CustomMultiSelect from './CustomMultiSelect';

export default class FilterByData extends PureComponent {
  render() {
    const {
      className,
      data,
      label,
      toggleSelectClass,
      handleToggleClass,
      toggleType,
      changeHandler,
      selectedArr,
      placeholderTxt,
    } = this.props;
    // debugger;
    return (
      <div className={className}>
        <label className="mb-2">{label}</label>
        <CustomMultiSelect
          toggleSelectClass={toggleSelectClass}
          handleToggleClass={handleToggleClass}
          toggleType={toggleType}
          checkboxOption={data}
          handleCheck={changeHandler}
          selectedArr={selectedArr}
          placeholderTxt={placeholderTxt}
        />
      </div>
    );
  }
}
