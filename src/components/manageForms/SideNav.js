import React, { Component } from "react";
import { Switch, Route, Link, withRouter } from "react-router-dom";
// import "react-perfect-scrollbar/dist/css/styles.css";
import axios from "axios";
import GeneralForms from "./GeneralForms";
import ScheduleForms from "./ScheduleForms";
import StagedForms from "./StagedFoms";
import ProjectWideForms from "./ProjectWideForms";

const urls = [
  "fv3/api/project-regions-types/",
  "fv3/api/myforms/",
  "fv3/api/myprojectforms/",
  "fv3/api/sharedforms/"
];

class SideNav extends Component {
  _isMounted = false;
  state = {
    regionOptions: [{ id: 0, identifier: "unassigned", name: "unassigned" }],
    typeOptions: [{ id: 0, identifier: "unassigned", name: "unassigned" }],
    myForms: [],
    projectForms: [],
    sharedForms: [],
    loader: false,
    isProjectForm: false
  };

  requestForms(id) {
    axios
      .all(
        urls.map((url, i) => {
          if (this.state.isProjectForm) {
            return i === 0 ? axios.get(`${url}${id}/`) : axios.get(url);
          } else {
            return i > 0 ? axios.get(url) : "";
          }
        })
      )
      .then(
        axios.spread((list, myForms, projectForms, sharedForms) => {
          if (this._isMounted) {
            this.setState(state => {
              if (!!this.state.isProjectForm) {
                const regions = this.state.regionOptions;
                const types = this.state.typeOptions;
                return {
                  regionOptions: [...regions, ...list.data.regions],
                  typeOptions: [...types, ...list.data.site_types],
                  myForms: myForms.data,
                  projectForms: projectForms.data,
                  sharedForms: sharedForms.data,
                  loader: false
                };
              } else {
                return {
                  myForms: myForms.data,
                  projectForms: projectForms.data,
                  sharedForms: sharedForms.data,
                  loader: false
                };
              }
            });
          }
        })
      )
      .catch(err => console.log("err", err));
  }
  componentDidMount() {
    this._isMounted = true;
    const {
      props: {
        match: {
          url,
          params: { id }
        }
      }
    } = this;

    const splitArr = url.split("/");
    const isProjectForm = splitArr.includes("project");
    const isSiteForm = splitArr.includes("site");
    this.setState(
      state => {
        if (isProjectForm) {
          return {
            loader: true,
            isProjectForm
          };
        } else if (isSiteForm) {
          return { loader: true, isProjectForm: false };
        }
      },
      () => {
        this.requestForms(id);
      }
    );
  }
  render() {
    const {
      props: {
        match: { path, url }
      },
      state: {
        regionOptions,
        typeOptions,
        myForms,
        projectForms,
        sharedForms,
        loader,
        isProjectForm
      }
    } = this;

    return (
      <React.Fragment>
        <div className="col-xl-3 col-lg-4">
          <div className="left-sidebar new-sidebar sticky-top">
            <div
              className="card no-boxshadow"
              style={{ minHeight: this.props.height }}
            >
              <div className="card-header main-card-header">
                <h5>Manage Forms</h5>
              </div>
              <div className="card-body">
                <div className="manage_group">
                  {!!isProjectForm && <h5>Site-Specific Forms</h5>}
                  <ul className="nav nav-tabs flex-column border-tabs">
                    <li className="nav-item">
                      <Link
                        to={`${url}/generalform`}
                        className={
                          this.props.location.pathname == `${url}/generalform`
                            ? "nav-link active"
                            : "nav-link"
                        }
                      >
                        General forms
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to={`${url}/scheduleform`}
                        className={
                          this.props.location.pathname == `${url}/scheduleform`
                            ? "nav-link active"
                            : "nav-link"
                        }
                      >
                        Scheduled forms
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to={`${url}/stageform`}
                        className={
                          this.props.location.pathname == `${url}/stageform`
                            ? "nav-link active"
                            : "nav-link"
                        }
                      >
                        Staged forms
                      </Link>
                    </li>
                  </ul>
                </div>
                {isProjectForm && (
                  <div className="manage_group mrt-15">
                    <h5>Project-Wide Forms</h5>
                    <ul
                      className="nav nav-tabs flex-column border-tabs"
                      id="myTab"
                      role="tablist"
                    >
                      <li className="nav-item">
                        <Link
                          to={`${url}/wide/generalform`}
                          className={
                            this.props.location.pathname ==
                            `${url}/wide/generalform`
                              ? "nav-link active"
                              : "nav-link"
                          }
                        >
                          General forms
                        </Link>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <Switch>
          <Route
            exact
            path={`${path}/generalform`}
            render={props => (
              <GeneralForms
                {...props}
                title="GeneralForms"
                OpenTabHandler={this.props.OpenTabHandler}
                commonPopupHandler={this.props.commonPopupHandler}
                closePopup={this.props.closePopup}
                popupModal={this.props.popupModal}
                typeOptions={typeOptions}
                regionOptions={regionOptions}
                myForms={myForms}
                projectForms={projectForms}
                sharedForms={sharedForms}
                formLoader={loader}
              />
            )}
          />

          <Route
            exact
            path={`${path}/scheduleform`}
            render={props => (
              <ScheduleForms
                {...props}
                title="ScheduleForms"
                OpenTabHandler={this.props.OpenTabHandler}
                commonPopupHandler={this.props.commonPopupHandler}
                closePopup={this.props.closePopup}
                popupModal={this.props.popupModal}
                typeOptions={typeOptions}
                regionOptions={regionOptions}
                myForms={myForms}
                projectForms={projectForms}
                sharedForms={sharedForms}
                formLoader={loader}
              />
            )}
          />

          <Route
            exact
            path={`${path}/stageform`}
            render={props => (
              <StagedForms
                {...props}
                title="StagedForms"
                OpenTabHandler={this.props.OpenTabHandler}
                commonPopupHandler={this.props.commonPopupHandler}
                closePopup={this.props.closePopup}
                popupModal={this.props.popupModal}
                typeOptions={typeOptions}
                regionOptions={regionOptions}
                myForms={myForms}
                projectForms={projectForms}
                sharedForms={sharedForms}
                formLoader={loader}
              />
            )}
          />

          <Route
            exact
            path={`${path}/wide/generalform`}
            render={props => (
              <ProjectWideForms
                {...props}
                title="ProjectWideForms"
                OpenTabHandler={this.props.OpenTabHandler}
                commonPopupHandler={this.props.commonPopupHandler}
                closePopup={this.props.closePopup}
                popupModal={this.props.popupModal}
                myForms={myForms}
                projectForms={projectForms}
                sharedForms={sharedForms}
                formLoader={loader}
              />
            )}
          />
        </Switch>
      </React.Fragment>
    );
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
}

export default withRouter(SideNav);
