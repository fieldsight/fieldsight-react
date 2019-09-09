import React, { Component, Fragment } from "react";
import { Route, Switch } from "react-router-dom";
import TeamLeftSidebar from "../leftSidebar/TeamLeftSieBar";
import EditTeam from "../editTeam/EditTeam";
import TeamMapLayer from "../mapLayer/TeamMapLayer";
export default class TeamSettings extends Component {
  render() {
    const {
      match: {
        params: { id: teamId },
        path
      }
    } = this.props;

    return (
      <>
        <nav aria-label="breadcrumb" role="navigation">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href={`/fieldsight/application/#/team-dashboard/${teamId}/`}>
                {window.project_name ? window.project_name : "Team Name"}
              </a>
            </li>

            <li className="breadcrumb-item active" aria-current="page">
              Team Settings
            </li>
          </ol>
        </nav>
        <div className="row">
          <div className="col-xl-3 col-lg-4">
            <div className="left-sidebar new-sidebar sticky-top">
              <div className="card">
                <div className="card-header main-card-header">
                  <h5>Meta Attributes</h5>
                </div>
                <div className="card-body">
                  <TeamLeftSidebar />
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-9 col-lg-8">
            <div className="right-content">
              <div className="tab-content">
                <Switch>
                  <Route exact path={`${path}`} component={EditTeam} />
                  <Route path={`${path}/map-layer`} component={TeamMapLayer} />
                </Switch>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
