import React, { Component } from "react";
import "react-perfect-scrollbar/dist/css/styles.css";
import axios from "axios";
import YourTeamSideBar from "./YourTeamSidebar";
import ProfileTab from "./ProfileTab";
import RegionTable from "./RegionTable";
import Submissions from "./Submissions";
import InviteTab from "./InviteTab";
import SiteTable from "./SiteTable";
import MapPage from "./MapPage";
import { successToast, errorToast } from "../../utils/toastHandler";
import withPagination from "../../hoc/WithPagination";
import Modal from "../common/Modal";

class MyrolesMain extends Component {
  state = {
    invite: null,
    rightTab: "region",
    profile: [],
    invitation: [],
    roles: [],
    teams: [],
    initialTeamId: null,
    site: [],
    submission: [],
    regions: [],
    mapData: [],
    dLoader: true,
    siteLoader: true,
    RegionLoader: true,
    teamId: null,
    siteId: null ,
    myGuide:false
  };

  componentDidMount() {
    const { profileId } = this.props.match.params;
    let url = profileId
      ? `fv3/api/myroles/?profile=${profileId}`
      : `fv3/api/myroles/`  
    this._isMounted = true;
    axios
      .get(`${url}`)

      .then(res => {
        console.log(res,"res");
        
        if (this._isMounted) {
          if (res.status === 200) {
            const modifiedTeam = res.data.teams.map((team, i) => {
              return i === 0
                ? { ...team, accord: true }
                : { ...team, accord: false };
            });

            if (res.data.teams.length > 0) {
              this.setState({
                initialTeamId: res.data.teams[0].projects[0].id
              });
            }

            this.setState({
              profile: res.data.profile,
              invitation: res.data.invitations,
              roles: res.data.roles,
              teams: modifiedTeam,
              dLoader: false,
              RegionLoader: false,
              myGuide:res.data.profile.guide_popup
            },()=>{console.log(this.state.myGuide)})
          }
        }
      })
      .catch(err => {});
  }

  invitationOpen = (e, data) => {
    if (this.state.invite == "hide") {
      this.setState({
        invite: null
      });
    } else {
      this.setState({
        invite: "hide"
      });
    }
  };

  rightTabOpen = (e, data) => {
    this.setState({
      rightTab: data
    });
  };

  rejectHandler = id => {
    const reject_url = "fv3/api/decline-invite/" + id + "/";

    axios
      .post(`${reject_url}`)

      .then(res => {
        if (res.status === 200) {
          const newInvitation = [...this.state.invitation];
          const deletedForm = newInvitation.filter(user => user.id != id);

          this.setState({
            invitation: deletedForm
          });
          successToast("Invite", "Rejected");
        }
      })
      .catch(err => {});
  };

  acceptHandler = (id, user) => {
    const accept_url = "fv3/api/accept-invite/" + id + "/" + user + "/";

    axios
      .post(`${accept_url}`)

      .then(res => {
        if (res.status === 200) {
          const newInvitation = [...this.state.invitation];
          const deletedForm = newInvitation.filter(user => user.id != id);

          this.setState({
            invitation: deletedForm
          });

          successToast("Invite", "Accepted");
        }
      })
      .catch(err => {});
  };

  acceptAll = () => {
    const accept_all_url =
      "fv3/api/accept-all-invites/" + this.state.profile.username + "/";

    axios
      .post(`${accept_all_url}`)

      .then(res => {
        if (res.status === 200) {
          // const newInvitation = [...this.state.invitation];
          // const deletedForm = newInvitation.filter(user => user.id != id);

          this.setState({
            invitation: []
          });

          successToast("All Invites", "Accepted");
        }
      })
      .catch(err => {});
  };

  requestRegions = id => {
    const url = "fv3/api/my-regions/?project=" + id;
    this.setState({
      teamId: id,
      RegionLoader: true
    });
    axios
      .get(`${url}`)
      .then(res => { 
        if (res.status === 200) {
          this.setState({
            regions: res.data.regions,
            RegionLoader: false
          },()=>{this.state,"dfghjh"});
        }
      })
      .catch(err => {});
  };

  requestSite = id => {
    const site_url = "fv3/api/my-sites/?project=" + id;
    this.setState({
      siteLoader: true,
      siteId: id
    });
    // axios
    //   .get(`${site_url}`)
    //   .then(res => {
    //     if (res.status === 200) {
    //       this.setState({
    //         site: res.data.results.data,
    //         siteLoader: false
    //       });
    //     }
    //   })
    //   .catch(err => {});

    this.props.paginationHandler(1, null, {
      type: "mySiteList",
      projectId: id
    });
  };

  requestSubmission = id => {
    const submission_url = `fv3/api/submissions-map/?project=${id}&type=submissions`;
    this.setState({
      submissionLoader: true
    });
    axios
      .get(`${submission_url}`)
      .then(res => {
        if (res.status === 200) {
          this.setState({
            submission: res.data,
            submissionLoader: false
          });
        }
      })
      .catch(err => {});
  };

  requestMap = id => {
    //const id =309
    const submission_url = `fv3/api/submissions-map/?project=${id}&type=map`;

    axios
      .get(`${submission_url}`)
      .then(res => {
        if (res.status === 200) {
          this.setState({
            mapData: res.data
          });
        }
      })
      .catch(err => {});
  };

  cancelHandler=()=>{
    this.setState({
      myGuide:false
    })
  }
  render() {
    const { profileId } = this.props.match.params;
    const {myGuide} =this.state;
   
    
    return (
      <>
        <div className="card mrb-30">
          <ProfileTab
            dLoader={this.state.dLoader}
            profile={this.state.profile}
            profileId={profileId}
          />
        </div>

        <div className="row">
          <YourTeamSideBar
            dLoader={this.state.dLoader}
            teams={this.state.teams}
            teamId={this.state.teamId}
            requestRegions={this.requestRegions}
            requestSite={this.requestSite}
            requestSubmission={this.requestSubmission}
            requestMap={this.requestMap}
            regions={this.state.regions}
            addPermission={this.state.profile.can_create_team}
          />

          <div className="col-xl-8 col-lg-7">
            <div className="right-content">
              <div className="card no-boxshadow">
                <div className="card-body">
                  <div className="nav-wrapper">
                    {/* <!-- tab nav start --> */}
                    <ul className="nav nav-tabs " id="myTab" role="tablist">
                      <li className="nav-item">
                        <a
                          className={
                            this.state.rightTab == "region"
                              ? "nav-link active"
                              : "nav-link"
                          }
                          onClick={e => this.rightTabOpen(e, "region")}
                        >
                          Regions
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className={
                            this.state.rightTab == "site"
                              ? "nav-link active"
                              : "nav-link"
                          }
                          onClick={e => this.rightTabOpen(e, "site")}
                        >
                          Sites
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className={
                            this.state.rightTab == "submission"
                              ? "nav-link active"
                              : "nav-link"
                          }
                          onClick={e => this.rightTabOpen(e, "submission")}
                        >
                          Submissions
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className={
                            this.state.rightTab == "map"
                              ? "nav-link active"
                              : "nav-link"
                          }
                          onClick={e => this.rightTabOpen(e, "map")}
                        >
                          map
                        </a>
                      </li>
                    </ul>
                  </div>

                  <div className="tab-content mrt-30" id="myTabContent">
                    {this.state.rightTab == "submission" && (
                      <Submissions
                        submission={this.state.submission}
                        submissionLoader={this.state.submissionLoader}
                      />
                    )}

                    {this.state.rightTab == "region" && (
                      <RegionTable
                        initialTeamId={this.state.initialTeamId}
                        requestRegions={this.requestRegions}
                        requestSite={this.requestSite}
                        requestSubmission={this.requestSubmission}
                        requestMap={this.requestMap}
                        regions={this.state.regions}
                        RegionLoader={this.state.RegionLoader}
                        profileId={profileId}
                      />
                    )}

                    {this.state.rightTab == "site" && (
                      <SiteTable
                        site={this.props.siteList}
                        siteLoader={this.state.dLoader}
                        renderPageNumbers={this.props.renderPageNumbers}
                        paginationHandler={this.props.paginationHandler}
                        siteId={this.state.siteId}
                        pageNum={this.props.pageNum}
                        fromData={this.props.fromData}
                        toData={this.props.toData}
                        totalCount={this.props.totalCount}
                        profileId={profileId}
                      />
                    )}

                    {this.state.rightTab == "map" && (
                      <MapPage mapData={this.state.mapData} />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {this.state.invitation.length != 0 && (
          <div
            className={"invite-popup invite " + this.state.invite}
            style={{ zIndex: "1011" }}
          >
            <InviteTab
              invitationOpen={this.invitationOpen}
              invitation={this.state.invitation}
              acceptHandler={this.acceptHandler}
              rejectHandler={this.rejectHandler}
              acceptAll={this.acceptAll}
            />
          </div>
        )}
          {(myGuide) &&
                      (<Modal  title="My Role Guide" toggleModal={this.cancelHandler}>
                          <div className="guide">
                            <p>
                            Hi, seems like you have no role yet.You can get started by creating a team in 
                            FieldSight or contact your FieldSight manager to invite you to join the project. 
                            </p>
                          </div>
                          <div className="warning-footer text-center">
                                                <a href={"/fieldsight/organization/add/"}
                                                    className="fieldsight-btn"
                                                    style={{marginRight: "10px",display: "inline-block"}}
                                                  >
                                                    Create Team
                                                </a>
                                                <a className="fieldsight-btn rejected-btn"  onClick={this.cancelHandler}>
                                                    Cancel
                                                </a>
                                                </div>
                        </Modal>
                       )
                    }
      </>
    );
  }
}

export default withPagination(MyrolesMain);
