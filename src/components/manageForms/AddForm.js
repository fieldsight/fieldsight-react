import React, { Component } from "react";

class AddForm extends Component {
  state = {
    // activeTab: "myForms",
    // searchQry: ""
  };
  render() {
    const {
      props: { activeTab, onChangeHandler, toggleTab }
    } = this;
    return (
      <>
        <div className="card-header main-card-header sub-card-header">
          <ul className="nav nav-tabs ">
            <li className="nav-item">
              <a
                className={
                  activeTab === "myForms" ? "nav-link active" : "nav-link"
                }
                onClick={() => toggleTab("myForms")}
              >
                My Forms
              </a>
            </li>
            <li className="nav-item">
              <a
                className={
                  activeTab === "sharedForms" ? "nav-link active" : "nav-link"
                }
                onClick={() => toggleTab("sharedForms")}
              >
                Shared Forms
              </a>
            </li>
            <li className="nav-item">
              <a
                className={
                  activeTab === "projectForms" ? "nav-link active" : "nav-link"
                }
                onClick={() => toggleTab("projectForms")}
              >
                Project Forms
              </a>
            </li>
            <li className="nav-item">
              <a
                className={
                  activeTab === "libraryForms" ? "nav-link active" : "nav-link"
                }
                onClick={() => toggleTab("libraryForms")}
              >
                Library Forms
              </a>
            </li>
          </ul>
          <div className="dash-btn">
            <form
              className="floating-form"
              onSubmit={e => {
                e.preventDefault();
              }}
            >
              <div className="form-group mr-0">
                <input
                  type="search"
                  className="form-control"
                  placeholder="Search"
                  onChange={onChangeHandler}
                />
                <i className="la la-search" />
              </div>
            </form>
          </div>
        </div>
      </>
    );
  }
}
export default AddForm;
