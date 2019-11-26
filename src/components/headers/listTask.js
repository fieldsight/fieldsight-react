import React, { Component } from "react";
import MyTask from "./myTask";
import OtherTask from "./otherTask";
import NotificationHandler from "./NotificationHandler";

const user_id = window.user_id ? window.user_id : 1;

export class ListTask extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: "myTask"
    };
  }

  handleTabChange = tab => {
    this.setState({ activeTab: tab });
  };

  render() {
    const {
      state: { activeTab },
      props: { myTasks, otherTasks }
    } = this;
    return (
      <>
        <ul className="nav nav-tabs " id="myTab" role="tablist">
          <li className="nav-item">
            <a
              className={`nav-link ${activeTab === "myTask" ? "active" : ""}`}
              id="role_tab"
              data-toggle="tab"
              role="tab"
              aria-controls="role"
              aria-selected="false"
              onClick={() => {
                this.handleTabChange("myTask");
              }}
            >
              Your Task
            </a>
          </li>
          <li className="nav-item">
            <a
              className={`nav-link ${
                activeTab === "otherTask" ? "active" : ""
              }`}
              id="activities_tab"
              data-toggle="tab"
              role="tab"
              aria-controls="activities"
              aria-selected="true"
              onClick={() => {
                this.handleTabChange("otherTask");
              }}
            >
              Other Task
            </a>
          </li>
        </ul>
        <div className="tab-content mrt-15">
          {activeTab === "myTask" && (
            <NotificationHandler
              logs={myTasks}
              showContentLoader={false}
              //  siteId={id}
              type="project"
              user_id={user_id}
            />
          )}
          {/* // <MyTask data={myTasks} />} */}
          {activeTab === "otherTask" && <OtherTask data={otherTasks} />}
        </div>
      </>
    );
  }
}

export default ListTask;
