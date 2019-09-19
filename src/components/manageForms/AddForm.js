import React, { Component } from "react";
import RadioElement from "../common/RadioElement";

class AddForm extends Component {
  state = {
    // activeTab: "myForms",
    // searchQry: ""
  };
  render() {
    const {
      props: {
        activeTab,
        onChangeHandler,
        toggleTab,
        formList,
        handleRadioChange,
        projectList,
        handleSaveForm
      }
    } = this;

    return (
      <>
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
          {/* <li className="nav-item">
              <a
                className={
                  activeTab === "sharedForms" ? "nav-link active" : "nav-link"
                }
                onClick={() => toggleTab("sharedForms")}
              >
                Shared Forms
              </a>
            </li> */}
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
          {/* <li className="nav-item">
              <a
                className={
                  activeTab === "libraryForms" ? "nav-link active" : "nav-link"
                }
                onClick={() => toggleTab("libraryForms")}
              >
                Library Forms
              </a>
            </li> */}
        </ul>
        {/* <div className="dash-btn"> */}
        {activeTab === "myForms" && (
          <div
            className="thumb-list mr-0 "
            style={{ position: "relative", height: "327px" }}
          >
            {formList.length == 0 ? (
              <div>No Form Available</div>
            ) : (
              <form
                className="floating-form"
                onSubmit={e => {
                  e.preventDefault();
                }}
              >
                <div className="form-group">
                  <input
                    type="search"
                    className="form-control"
                    placeholder="Search"
                    onChange={onChangeHandler}
                  />
                  <i className="la la-search" />
                </div>
                {formList.map((each, i) => {
                  return (
                    <div className="form-group" key={`form_${i}`}>
                      <RadioElement
                        label={each.title}
                        className="radiobox"
                        name="myform"
                        value={each.id}
                        changeHandler={e => {
                          handleRadioChange(e, each.title);
                        }}
                      />
                      <div className="select-form-info">
                        <span className="form-owner">{each.owner}</span>
                        <time>
                          <i className="la la-clock-o"></i>
                          {each.date_created}
                        </time>
                      </div>
                    </div>
                  );
                })}
                <div className="form-group pull-right no-margin">
                  <button
                    type="button"
                    className="fieldsight-btn"
                    onClick={handleSaveForm}
                  >
                    Save
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {activeTab === "projectForms" && (
          <div
            className="thumb-list mr-0 "
            style={{ position: "relative", height: "327px" }}
          >
            {projectList.length == 0 ? (
              <div>No Form Available</div>
            ) : (
              <form
                className="floating-form"
                onSubmit={e => {
                  e.preventDefault();
                }}
              >
                <div className="form-group">
                  <input
                    type="search"
                    className="form-control"
                    placeholder="Search"
                    onChange={onChangeHandler}
                  />
                  <i className="la la-search" />
                </div>
                {projectList.map((each, i) => {
                  return (
                    <div className="form-group" key={`form_${i}`}>
                      <RadioElement
                        label={each.title}
                        className="radiobox"
                        name="myform"
                        value={each.id}
                        changeHandler={e => {
                          handleRadioChange(e, each.title);
                        }}
                      />
                      <div className="select-form-info">
                        <span className="form-owner">{each.owner}</span>
                        <time>
                          <i className="la la-clock-o"></i>
                          {each.date_created}
                        </time>
                      </div>
                    </div>
                  );
                })}
                <div className="form-group pull-right no-margin">
                  <button
                    type="button"
                    className="fieldsight-btn"
                    onClick={handleSaveForm}
                  >
                    Save
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </>
    );
  }
}
export default AddForm;
