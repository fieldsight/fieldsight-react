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
              selectedMetric.children.map((child, i) => {
                const isChecked =
                  parentData.length > 0 &&
                  parentData.map(each => {
                    // console.log('dfdf', each.children);
                    if (each.children.length > 0) {
                      return each.children.filter(
                        item => item.code === child.code,
                      );
                    }
                  });
                console.log(
                  //   selectedMetric,
                  //   child,
                  //   'in userrole',
                  isChecked,
                  '---',
                  //   parentData,
                );

                return (
                  <Fragment key={child.code}>
                    <CustomCheckBox
                      id={child.code}
                      label={child.label}
                      name={child.code}
                      checked={
                        isChecked[0] &&
                        isChecked[0][0] &&
                        isChecked[0][0].code === child.code
                      }
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
