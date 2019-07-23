import React from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import uuid from "uuid/v4";

const UsersListItem = ({ user }) => {
  return (
    <li>
      <figure>
        <img src={user.profile_picture} alt="user avatar" />
      </figure>
      <div className="content">
        <h6>{user.username}</h6>
        <span>{user.email}</span>
      </div>
    </li>
  );
};

const UsersList = ({ users }) => (
  <PerfectScrollbar>
    <ul>
      {users.map((user, i) => (
        <UsersListItem user={user} key={uuid()} />
      ))}
    </ul>
  </PerfectScrollbar>
);
export default UsersList;
