import React, { PureComponent } from 'react';
import CustomCheckBox from '../CustomCheckbox';

export default class SelectedColumn extends PureComponent {
  render() {
    return (
      <div className="col-lg-5 col-md-5">
        <ul className="selected-list">
          <h6>
            Slected columns
            <span>(3)</span>
          </h6>
          <li>
            <span className="drag-icon">
              <i className="material-icons">drag_indicator</i>
            </span>
            <CustomCheckBox
              id="Active users"
              label="Active users"
              name="Active users"
              // checked={submissions.includes(
              //   "selected-1",
              // )}
              // changeHandler={handleCheckReportType}
            />
          </li>
        </ul>
      </div>
    );
  }
}
