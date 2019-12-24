import React, { PureComponent, Fragment } from 'react';
import CustomCheckBox from '../CustomCheckbox';

export default class UserRole extends PureComponent {
  render() {
    const { users, handleCheckUser, userList } = this.props;

    return (
      <div className="fs-7 fs-col">
        <ul className="role-list">
          <h6>User role</h6>
          <li>
            {users &&
              users.map(user => {
                const filterList = userList.filter(
                  i => i.code === user.code,
                );
                const isChecked =
                  filterList && filterList[0] ? true : false;
                return (
                  <Fragment key={user.code}>
                    <CustomCheckBox
                      id={user.code}
                      label={user.label}
                      name={user.code}
                      checked={isChecked}
                      changeHandler={e => {
                        handleCheckUser(e, user);
                      }}
                    />
                  </Fragment>
                );
              })}
          </li>
        </ul>
      </div>
    );
  }
}
