import React, { Component } from 'react';
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'


class SubAcc extends Component {
    
    render() {
        return (
            <React.Fragment>
                <Accordion defaultActiveKey="0" className="accordion" id ="accordion">
                    <Card>
                        <Card.Header>
                            <h5>
                                <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                Group 1
                                </Accordion.Toggle>
                            </h5>
                        </Card.Header>
                        <Accordion.Collapse eventKey="0">
                        <Card.Body>
                        <div className="submission-list normal-list">
                            <ul>
                                <li>
                                    <h6>Surveyed time / सर्वे गरिएको मिति</h6>
                                    <time><i className="la la-clock-o"> May 19 -2019</i></time>
                                </li>
                                <li>
                                        <h6>Surveyed time / सर्वे गरिएको मिति</h6>
                                    <time><i className="la la-clock-o"> May 19 -2019</i></time>
                                </li>
                            </ul>
                        </div>
                        <div className="card no-boxshadow subgroup">
                            <div className="card-header">
                                <h5>
                                    Subgroup 1
                                </h5>
                            </div>
                            <div className="card-body">
                                <div className="submission-list normal-list">
                                    <ul>
                                        <li>
                                            <h6>Surveyed time / सर्वे गरिएको मिति</h6>
                                            <time><i className="la la-clock-o"> May 19 -2019</i></time>
                                        </li>
                                        <li>
                                            <h6>Surveyed time / सर्वे गरिएको मिति</h6>
                                            <time><i className="la la-clock-o"> May 19 -2019</i></time>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="card no-boxshadow subgroup">
                            <div className="card-header">
                                <h5>
                                    Subgroup 1
                                </h5>
                            </div>
                            <div className="card-body">
                                <div className="submission-list normal-list">
                                    <ul>
                                        <li>
                                            <h6>Surveyed time / सर्वे गरिएको मिति</h6>
                                            <time><i className="la la-clock-o"> May 19 -2019</i></time>
                                        </li>
                                        <li>
                                            <h6>Surveyed time / सर्वे गरिएको मिति</h6>
                                            <time><i className="la la-clock-o"> May 19 -2019</i></time>
                                        </li>
                                    </ul>
                                </div>
                                <div className="card no-boxshadow subgroup-2">
                                    <div className="card-header">
                                        <h5>
                                            Subgroup 2
                                        </h5>
                                    </div>
                                    <div className="card-body">
                                        <div className="submission-list normal-list">
                                            <ul>
                                                <li>
                                                    <h6>Surveyed time / सर्वे गरिएको मिति</h6>
                                                    <time><i className="la la-clock-o"> May 19 -2019</i></time>
                                                </li>
                                                <li>
                                                    <h6>Surveyed time / सर्वे गरिएको मिति</h6>
                                                    <time><i className="la la-clock-o"> May 19 -2019</i></time>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                    <Card>
                        <Card.Header>
                            <h5>
                                <Accordion.Toggle as={Button} variant="link" eventKey="1">
                                    Group 2
                                </Accordion.Toggle>
                            </h5>
                        </Card.Header>
                        <Accordion.Collapse eventKey="1">
                        <Card.Body>
                            <div className="submission-list normal-list">
                                <ul>
                                    <li>
                                        <h6>Surveyed time / सर्वे गरिएको मिति</h6>
                                        <time><i className="la la-clock-o"> May 19 -2019</i></time>
                                    </li>
                                    <li>
                                        <h6>Surveyed time / सर्वे गरिएको मिति</h6>
                                        <time><i className="la la-clock-o"> May 19 -2019</i></time>
                                    </li>
                                </ul>
                            </div>
                        </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                    </Accordion>
            </React.Fragment>
        );
    }
}

export default SubAcc;
