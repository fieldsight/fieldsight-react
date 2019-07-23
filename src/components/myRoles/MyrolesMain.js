import React, { Component } from "react";
import "react-perfect-scrollbar/dist/css/styles.css";
import axios from "axios";
import YourTeamSideBar from "./YourTeamSidebar";
import ProfileTab from "./ProfileTab";
import RegionTable from "./RegionTable";
import Submissions from "./Submissions";
import InviteTab from "./InviteTab";
import SiteTable from "./SiteTable";

const url = "fv3/api/myroles/";

class MyrolesMain extends Component {
  state = {
    invite: "hide",
    rightTab: "region",
    profile: [],
    invitation: [],
    roles: [],
    teams: [],
    team_project_id:null,
    site:[],
    regions:[]
  };

  componentDidMount() {
    this._isMounted = true;
    axios
      .get(`${url}`)

      .then(res => {
        if (this._isMounted) {
          if (res.status === 200) {
            console.log(res.data.teams.length);
            console.log(res.data.teams[0].projects[0].id);
            // if(res.data.teams.length>0){
              this.setState({
                team_project_id:res.data.teams[0].projects[0].id
              });
            // }
            this.setState({
              profile: res.data.profile,
              invitation: res.data.invitations,
              roles: res.data.roles,
              teams: res.data.teams,
              dLoader: false
            });
          }
        }
      })
      .catch(err => {
        // this.setState({
        //   dLoader: false
        // });
      });
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
        }
      })
      .catch(err => {});
  };

  request = id => {
    const url = "fv3/api/my-regions/?project="+id;
    const site_url="fv3/api/my-sites/?project="+id;
    axios
      .get(`${url}`)
      .then(res => {
        if (res.status === 200) {
          console.log(res.data);
          this.setState({
            regions: res.data.regions
          });
        }
      })
      .catch(err => {
        // this.setState({
        //   dLoader: false
        // });
      });


      axios
      .get(`${site_url}`)
      .then(res => {
        if (res.status === 200) {
          console.log("site",res.data);
          this.setState({
            site: res.data.results
          });
        }
      })
      .catch(err => {
        // this.setState({
        //   dLoader: false
        // });
      });



  };

  render() {
    return (
      <React.Fragment>
        <div className="card mrb-30">
          <ProfileTab profile={this.state.profile} />
        </div>

        <div className="row">
          <YourTeamSideBar teams={this.state.teams} />

          <div className="col-xl-8 col-lg-8">
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
                          href={void(0)}
                        >
                          Regions
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          href="javascript:void(0);"
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
                          href="javascript:void(0);"
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
                         href={void(0)}
                          className="nav-link"
                          id="map_type_tab"
                          data-toggle="tab"
                          href="#map_type"
                          role="tab"
                          aria-controls="map_type"
                          aria-selected="true"
                        >
                          map
                        </a>
                      </li>
                    </ul>
                  </div>

                  <div className="tab-content mrt-30" id="myTabContent">
                    {this.state.rightTab == "submission" && <Submissions />}
                    {this.state.rightTab == "region" && <RegionTable 
                    
                    team_proj_id={this.state.team_project_id}
                    request={this.request}
                    regions={this.state.regions}
                    
                    />}

                    {this.state.rightTab == "site" && <SiteTable 
                    site={this.state.site}
                    />}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={"invite-popup invite " + this.state.invite}>
          <InviteTab
            invitationOpen={this.invitationOpen}
            invitation={this.state.invitation}
            acceptHandler={this.acceptHandler}
            rejectHandler={this.rejectHandler}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default MyrolesMain;
