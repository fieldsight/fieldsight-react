import React, { Component } from "react";
import MyTask from "./myTask";
import OtherTask from "./otherTask";

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
    const { activeTab } = this.state;
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
          {activeTab === "myTask" && <MyTask />}
          {activeTab === "otherTask" && <OtherTask />}
        </div>
      </>
    );
  }
}

export default ListTask;
