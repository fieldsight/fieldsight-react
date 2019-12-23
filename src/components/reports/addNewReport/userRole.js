import React, { PureComponent, Fragment } from 'react';
import CustomCheckBox from '../CustomCheckbox';

/* eslint-disable */

export default class UserRole extends PureComponent {
  requestIfChecked = row => {
    const { parentData } = this.props;
    const arr = [];
    parentData.length > 0 &&
      parentData.map(each => {
        if (each.children.length > 0) {
          each.children.map(item => {
            if (item.code === row.code) return arr.push(item);
          });
        }
      });
    return arr;
  };

  render() {
    const { selectedMetric, handleCheckChildren } = this.props;

    return (
      <div className="fs-7 fs-col">
        <ul className="role-list">
          <h6>User role</h6>
          <li>
            {/* <div className="custom-control custom-checkbox"> */}
            {selectedMetric.children &&
              selectedMetric.children.map(child => {
                const requestChecked = this.requestIfChecked(child);
                const isChecked =
                  requestChecked &&
                  requestChecked[0] &&
                  requestChecked[0].code === child.code;

                return (
                  <Fragment key={child.code}>
                    <CustomCheckBox
                      id={child.code}
                      label={child.label}
                      name={child.code}
                      checked={isChecked ? true : false}
                      changeHandler={e => {
                        handleCheckChildren(e, selectedMetric, child);
                      }}
                    />
                  </Fragment>
                );
              })}
            {/* </div> */}
          </li>
        </ul>
      </div>
    );
  }
}
