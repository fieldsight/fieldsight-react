import React, { Component } from "react";
import TaskHandler from "./TaskHandler";

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
      props: { myTasks, otherTasks, showContentLoader }
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
              Your Tasks
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
              Other Tasks
            </a>
          </li>
        </ul>
        <div className="tab-content mrt-15">

          {activeTab === "myTask" && (
            <TaskHandler
              tasks={myTasks}
              showContentLoader={showContentLoader}
              handleDownloadFile={this.props.handleDownloadFile}
            />
          )}
          {activeTab === "otherTask" &&
            <TaskHandler tasks={otherTasks} showContentLoader={showContentLoader}
              handleDownloadFile={this.props.handleDownloadFile} />
          }
          <div className="dropdown-footer">
            <a className="text-center" >
              <span>View All</span>
              <span>Mark all as seen</span> </a>
          </div>
        </div>
        {/* </div> */}
      </>
    );
  }
}

export default ListTask;
