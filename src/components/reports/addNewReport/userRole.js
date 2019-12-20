import React, { PureComponent, Fragment } from 'react';
import CustomCheckBox from '../CustomCheckbox';

/* eslint-disable */

export default class UserRole extends PureComponent {
  render() {
    const {
      selectedMetric,
      handleCheckChildren,
      parentData,
    } = this.props;

    return (
      <div className="fs-7 fs-col">
        <ul className="role-list">
          <h6>User role</h6>
          <li>
            {/* <div className="custom-control custom-checkbox"> */}
            {selectedMetric.children &&
              selectedMetric.children.map(child => {
                const isChecked =
                  parentData.length > 0 &&
                  parentData.map(each => {
                    if (each.children.length > 0) {
                      return each.children.map(item => {
                        item.code === child.code;
                      });
                    }
                  });

                return (
                  <Fragment key={child.code}>
                    <CustomCheckBox
                      id={child.code}
                      label={child.label}
                      name={child.code}
                      checked={isChecked}
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
