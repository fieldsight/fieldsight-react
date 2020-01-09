import React, { PureComponent, Fragment } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
import CustomCheckBox from '../CustomCheckbox';

export default class UserRole extends PureComponent {
  onChangeHandler = () => {
    console.log('search user');
  };

  render() {
    const { users, handleCheckUser, userList } = this.props;

    return (
      <div className="fs-7 fs-col">
        <div className="custom-group">
          <div className="custom-group-append">
            <span className="custom-group-text">
              <i className="material-icons">search</i>
            </span>
          </div>
          <input
            className="custom-control"
            type="search"
            placeholder="Quick search user roles..."
            onChange={() => {
              this.onChangeHandler();
            }}
          />
        </div>
        {/* <h6>User role</h6> */}
        <div
          style={{
            position: 'relative',
            height: `300px `,
          }}
        >
          <PerfectScrollbar>
            <ul className="role-list">
              {users &&
                users.map(user => {
                  const filterList = userList.filter(
                    i => i.code === user.code,
                  );
                  const isChecked =
                    filterList && filterList[0] ? true : false;

                  return (
                    <li key={user.code}>
                      <CustomCheckBox
                        id={user.code}
                        label={user.label}
                        name={user.code}
                        checked={isChecked}
                        changeHandler={e => {
                          handleCheckUser(e, user);
                        }}
                      />
                    </li>
                  );
                })}
            </ul>
          </PerfectScrollbar>
        </div>
      </div>
    );
  }
}
