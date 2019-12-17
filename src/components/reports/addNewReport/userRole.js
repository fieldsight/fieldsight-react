import React, { PureComponent } from 'react';
import CustomCheckBox from '../CustomCheckbox';

/* eslint-disable */

export default class UserRole extends PureComponent {
  render() {
    const { handleCheckReportType } = this.props;
    return (
      <div className="fs-7 fs-col">
        <ul className="role-list">
          <h6>User role</h6>
          <li>
            {/* <div className="custom-control custom-checkbox"> */}
            <CustomCheckBox
              className="custom-control custom-checkbox"
              customInputClass="custom-control-input"
              customLabelClass="custom-control-label"
              label={'selected-1'}
              name={'selected-1'}
              // checked={submissions.includes(
              //   "selected-1",
              // )}
              changeHandler={handleCheckReportType}
            />
            {/* </div> */}
          </li>
        </ul>
      </div>
    );
  }
}
