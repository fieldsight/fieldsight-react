import React, { Component } from 'react';

import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button' 

const url ="fv3/api/myroles"

class YourTeamSideBar extends Component {

  
    render() {
        
        return (
            <div className="col-xl-4 col-lg-4">
           
            <div className="left-sidebar new-sidebar sticky-top">
              <div className="card">
                <div className="card-header main-card-header">
                  <h5>Your Teams</h5>
                </div>
                {this.props.teams.map((team, i) => (
                 
                <Accordion defaultActiveKey="0" className="sidebar-accordion" id ="accordion" key={i}>

                <Card className="no-boxshadow">

                <Card.Header>
                      <figure>
                        <img src={team.logo} alt="pf" />
                      </figure>
                      <h5>
                      <Accordion.Toggle as={Button} variant="link" eventKey={i==0?"0":"1"}>
                         {team.name}
                          <i className="la la-arrow-right" />
                          </Accordion.Toggle>
                      </h5>
                      <p>
                       {team.address}
                       
                      </p>

                      </Card.Header>

                      <Accordion.Collapse eventKey={i==0?"0":"1"}>

                       <Card.Body>
                        <ul>
                        {team.projects.map((project, i) => (
                          <li className={project.id==this.props.teamId?"active":null} key={i}>
                            <a onClick={(event) => { this.props.requestRegions(project.id); this.props.requestSite(project.id); this.props.requestSubmission(project.id);this.props.requestMap(project.id) }}>
                             {project.name}
                            </a>
                          </li>
                        ))}
                        </ul>
                        </Card.Body>

                      </Accordion.Collapse>

                    </Card>

                 

                </Accordion>

              ))}

              </div>
            </div>
          </div>
        );

    }


}

export default YourTeamSideBar;