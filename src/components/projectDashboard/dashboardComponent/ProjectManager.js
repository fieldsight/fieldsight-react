import React from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import { AvatarContentLoader } from "../../common/Loader";

const ManagersListItem = ({ manager }) => {
  return (
    <li>
      <figure>
        <img src={manager.profile_picture} alt="user avatar" />
      </figure>
      <div className="content">
        <h6>{manager.full_name}</h6>
        <span>{manager.email}</span>
      </div>
    </li>
  );
};

class ProjectManager extends React.Component {
  render() {
    const { projectManagers, showContentLoader } = this.props;
    return (
      <>
        {showContentLoader ? (
          <AvatarContentLoader number={6} width="100%" size="40" />
        ) : (
          <PerfectScrollbar>
            <ul>
              {projectManagers.length > 0 ? (
                projectManagers.map((manager, i) => (
                  <ManagersListItem manager={manager} key={`manager_${i}`} />
                ))
              ) : (
                <p> No Data Available </p>
              )}
            </ul>
          </PerfectScrollbar>
        )}
      </>
    );
  }
}
export default ProjectManager;
