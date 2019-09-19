import React, { Component, Fragment } from "react";
import { Route, Switch } from "react-router-dom";
import { Elements, StripeProvider } from "react-stripe-elements";
import Axios from "axios";

import TeamLeftSidebar from "../leftSidebar/TeamLeftSieBar";
import EditTeam from "../editTeam/EditTeam";
import TeamMapLayer from "../mapLayer/TeamMapLayer";
import AccountInfoLayout from "../accountInfo/AccountInfoLayout";

export default class TeamSettings extends Component {
  state = {
    teamData: {}
  };

  componentWillMount() {
    const {
      match: {
        params: { id: teamId }
      }
    } = this.props;
    Axios.get(`fv3/api/team-owner-account/${teamId}/`).then(res => {
      this.setState({ teamData: res.data });
    }).catch = err => {
      // console.log('error', err);
    };
  }

  render() {
    const {
      match: {
        params: { id: teamId },
        path
      }
    } = this.props;
    const { teamData } = this.state;

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
                  <h5>Settings</h5>
                </div>
                <div className="card-body">
                  <TeamLeftSidebar teamOwner={teamData.team_owner} />
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

                  <Route
                    path={`${path}/subscription/team-settings`}
                    render={() => (
                      <AccountInfoLayout data={teamData} teamId={teamId} />
                    )}
                  />
                </Switch>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
