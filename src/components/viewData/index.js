import React, { Component } from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";
import ManageFormSetting from "./manageFormSetting/ManageFormSetting";
import ManageGeneralForm from "./manageGeneralForm";
import ManageSurveyForm from "./manageSurveyForm";
import ManageScheduledForm from "./manageScheduledForm";
import ManageStageForm from "./manageStageForm";
import DeleteTable from "./deleteTable";
import ApprovedTable from "./ApprovedTable.js";
import PendingTable from "./PendingSubmissionTable.js";
import RejectedTable from "./RejectSubmissionTable.js";
import FlaggedTable from "./FlagedTable.js";

export default class ViewData extends Component {
  state = {
    hide: true,
    view_btn: false,
    id: "",
    deleted_forms: [],
    generals_forms: []
  };
  toggleHide = () => {
    this.setState({
      hide: !this.state.hide
    });
  };
  showViewData = () => {
    console.log("gfhjh");
    this.setState({
      view_btn: !this.state.view_btn
    });
  };
  componentDidMount() {
    const {
      match: {
        params: { id }
      }
    } = this.props;

    this.setState({
      id
    });
  }

  render() {
    const {
      match: {
        params: { id }
      }
    } = this.props;

    return (
      <React.Fragment>
        <nav aria-label="breadcrumb" role="navigation">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="">project</a>
            </li>
            <li className="breadcrumb-item">General</li>
          </ol>
        </nav>
        <main id="main-content">
          <div className="row">
            <div className="col-xl-3 col-lg-4">
              <div className="left-sidebar new-sidebar sticky-top">
                <div className="card">
                  <div className="card-header main-card-header"></div>
                  <div className="card-body">
                    <ManageFormSetting show_submission={this.state.view_btn} />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-9 col-lg-8">
              <div className="right-content">
                <div className="card">
                  <div className="tab-content">
                    <Switch>
                      <Route
                        exact
                        path={this.props.match.url}
                        component={() => (
                          <ManageGeneralForm
                            showViewData={this.showViewData}
                            data={this.state.view_btn}
                            id={this.state.id}
                          />
                        )}
                      />

                      <Route
                        path={`${this.props.match.url}/scheduled`}
                        component={() => (
                          <ManageScheduledForm
                            showViewData={this.showViewData}
                            data={this.state.view_btn}
                            id={this.state.id}
                          />
                        )}
                      />
                      <Route
                        path={`${this.props.match.url}/stage`}
                        component={() => (
                          <ManageStageForm
                            showViewData={this.showViewData}
                            data={this.state.view_btn}
                            id={this.state.id}
                          />
                        )}
                      />

                      <Route
                        path={`${this.props.match.url}/survey`}
                        component={() => (
                          <ManageSurveyForm
                            showViewData={this.showViewData}
                            data={this.state.view_btn}
                            id={this.state.id}
                          />
                        )}
                      />

                      <Route
                        path={`${this.props.match.url}/approved`}
                        component={() => (
                          <ApprovedTable
                            showViewData={this.showViewData}
                            data={this.state.view_btn}
                            id={this.state.id}
                          />
                        )}
                      />

                      <Route
                        path={`${this.props.match.url}/flagged`}
                        component={() => (
                          <FlaggedTable
                            showViewData={this.showViewData}
                            data={this.state.view_btn}
                            id={this.state.id}
                          />
                        )}
                      />
                      <Route
                        path={`${this.props.match.url}/pending`}
                        component={() => (
                          <PendingTable
                            showViewData={this.showViewData}
                            data={this.state.view_btn}
                            id={this.state.id}
                          />
                        )}
                      />

                      <Route
                        path={`${this.props.match.url}/`}
                        component={() => (
                          <RejectedTable
                            showViewData={this.showViewData}
                            data={this.state.view_btn}
                            id={this.state.id}
                          />
                        )}
                      />
                    </Switch>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </React.Fragment>
    );
  }
}
