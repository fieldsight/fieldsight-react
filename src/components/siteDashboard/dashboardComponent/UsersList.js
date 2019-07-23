import React from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import uuid from "uuid/v4";
import { AvatarContentLoader } from "../../common/Loader";

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

const UsersList = ({ users, showContentLoader }) => (
  <>
    {showContentLoader ? (
      <AvatarContentLoader number={6} width="100%" size="40" />
    ) : (
      <PerfectScrollbar>
        <ul>
          {users.length > 0 ? (
            users.map((user, i) => <UsersListItem user={user} key={uuid()} />)
          ) : (
            <p> No Data Available </p>
          )}
        </ul>
      </PerfectScrollbar>
    )}
  </>
);
export default UsersList;
