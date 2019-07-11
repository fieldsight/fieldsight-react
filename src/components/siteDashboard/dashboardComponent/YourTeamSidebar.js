import React , {Component} from 'react';
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
class YourTeamSidebar extends Component {
    render (){
        return(
            <React.Fragment>
                <Accordion defaultActiveKey="0" className="sidebar-accordion" id ="accordion">
                    <Card className="no-boxshadow">
                        <Card.Header>
                            <figure>
                                <img src="/img/pf.jpg" alt="pf" />
                            </figure>
                            <h5>
                                <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                    Housing Recovery and Reconstruction Platform Nepal 
                                </Accordion.Toggle>
                            </h5>
                            <p>Sein Villa – 25/E, Thirimingalar Ave. Street, Ward No. 7, Yankin Township | Yangon Myanmar</p>
                        </Card.Header>
                        <Accordion.Collapse eventKey="0">
                            <Card.Body>
                                <ul>
                                    <li ClassName="active"><a href={`#/`}>Rapid Market Assessment (Philippine Shelter Cluster)</a></li>
                                    <li><a href={`#/`}>Rapid Market Assessment (Philippine Shelter Cluster)</a></li>
                                    <li><a href={`#/`}>Rapid Market Assessment (Philippine Shelter Cluster)</a></li>
                                    <li><a href={`#/`}>Rapid Market Assessment (Philippine Shelter Cluster)</a></li>
                                    <li><a href={`#/`}>Rapid Market Assessment (Philippine Shelter Cluster)</a></li>
                                </ul>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                    <Card className="no-boxshadow">
                        <Card.Header>
                            <figure>
                                <img src="/img/pf.jpg" alt="pf" />
                            </figure>
                            <h5>
                                <Accordion.Toggle as={Button} variant="link" eventKey="1">
                                    Housing Recovery and Reconstruction Platform Nepal 
                                </Accordion.Toggle>
                            </h5>
                            <p>Sein Villa – 25/E, Thirimingalar Ave. Street, Ward No. 7, Yankin Township | Yangon Myanmar</p>
                        </Card.Header>
                        <Accordion.Collapse eventKey="1">
                            <Card.Body>
                                <ul>
                                    <li ClassName="active"><a href={`#/`}>Rapid Market Assessment (Philippine Shelter Cluster)</a></li>
                                    <li><a href={`#/`}>Rapid Market Assessment (Philippine Shelter Cluster)</a></li>
                                    <li><a href={`#/`}>Rapid Market Assessment (Philippine Shelter Cluster)</a></li>
                                    <li><a href={`#/`}>Rapid Market Assessment (Philippine Shelter Cluster)</a></li>
                                    <li><a href={`#/`}>Rapid Market Assessment (Philippine Shelter Cluster)</a></li>
                                </ul>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>
            </React.Fragment>
        )
    }
}
export default YourTeamSidebar;