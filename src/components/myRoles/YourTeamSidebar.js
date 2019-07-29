import React, { Component } from "react";

import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { BlockContentLoader } from "../common/Loader";

const url = "fv3/api/myroles";
let base_url = window.base_url
  ? window.base_url
  : "https://fieldsight.naxa.com.np/";

class YourTeamSideBar extends Component {

  OpenTabHandler = (url) => {
    window.open(url, "_blank");
  };
  render() {
    return (
     
      <div className="col-xl-4 col-lg-4">
        <div className="left-sidebar new-sidebar sticky-top">
          <div className="card">
            <div className="card-header main-card-header">
              <h5>Your Teams</h5>
            </div>

              {this.props.dLoader && <BlockContentLoader 
              number={5}
              height="140px"
              /> } 

              {!this.props.dLoader &&  
              <div>  
            {this.props.teams.map((team, i) => (
              <Accordion
                defaultActiveKey="0"
                className="sidebar-accordion"
                id="accordion"
                key={i}
              >
                <Card className="no-boxshadow">
                  <Card.Header>
                    <figure>
                      <img src={team.logo} alt="pf" />
                    </figure>
                    <h5>
                      <Accordion.Toggle
                        as={Button}
                        variant="link"
                        eventKey={i == 0 ? "0" : "1"}
                      >
                        {team.name}
                        {team.has_organization_access && (
                      <span onClick={e=>this.OpenTabHandler(team.team_url)}><i className="la la-arrow-right"/></span> 
                        )}
                      </Accordion.Toggle>
                    </h5>
                    <p>{team.address}</p>
                  </Card.Header>

                  <Accordion.Collapse eventKey={i == 0 ? "0" : "1"}>
                    <Card.Body>
                      <ul>
                        {team.projects.map((project, i) => (
                          <li
                            className={
                              project.id == this.props.teamId ? "active" : null
                            }
                            key={i}
                          >
                            <a
                              onClick={event => {
                                this.props.requestRegions(project.id);
                                this.props.requestSite(project.id);
                                this.props.requestSubmission(project.id);
                                this.props.requestMap(project.id);
                              }}
                            >
                              {project.name}
                            </a>
                            {project.has_project_access && 
                            <a href={`${base_url}fieldsight/project-dashboard/${project.id}/`}></a> }
                          </li>
                         
                        ))}
                      </ul>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              </Accordion>
            ))}
            </div>
            } 
          </div>
        </div>
      </div>
    );
  }
}

export default YourTeamSideBar;
