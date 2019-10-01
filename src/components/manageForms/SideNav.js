import React, { Component } from "react";
import { Switch, Route, Link, withRouter } from "react-router-dom";
// import "react-perfect-scrollbar/dist/css/styles.css";
import axios from "axios";
import GeneralForms from "./GeneralForms";
// import ScheduleForms from "./ScheduleForms";
// import StagedForms from "./StagedFoms";
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
    regionOptions: [],
    typeOptions: [],
    myForms: [],
    projectForms: [],
    sharedForms: []
  };

  componentDidMount() {
    this._isMounted = true;
    const {
      match: {
        url,
        params: { id }
      }
    } = this.props;

    const splitArr = url.split("/");
    const isProjectForm = splitArr.includes("project");

    if (isProjectForm) {
      axios
        .all(
          urls.map((url, i) => {
            return i === 0 ? axios.get(`${url}${id}/`) : axios.get(url);
          })
        )
        .then(
          axios.spread((list, myForms, projectForms, sharedForms) => {
            if (this._isMounted) {
              if (list && myForms && projectForms && sharedForms) {
                this.setState({
                  regionOptions: list.data.regions,
                  typeOptions: list.data.site_types,
                  myForms: myForms.data,
                  projectForms: projectForms.data,
                  sharedForms: sharedForms.data
                });
              }
            }
          })
        )
        .catch(err => console.log("err", err));
    }
  }
  render() {
    const {
      props: {
        match: { path, url }
      },
      state: { regionOptions, typeOptions, myForms, projectForms, sharedForms }
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
                  <h5>Site Specific Forms</h5>
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
                <div className="manage_group mrt-15">
                  <h5>Project wide Forms</h5>
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
              />
            )}
          />

          {/* <Route
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
              />
            )}
          /> */}

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
