import React, { PureComponent } from 'react';

export default class CustomSelect extends PureComponent {
  render() {
    const { label } = this.props;
    return (
      <div className="common-select">
        <div className="select-wrapper">
          <span className="select-item">{label}</span>
          <ul>
            <li>Form-1</li>
            <li className="active">form-2</li>
          </ul>
        </div>
      </div>
    );
  }
}
