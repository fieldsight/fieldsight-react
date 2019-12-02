import React, { Component } from "react";
import { Accordion, Card, Button } from "react-bootstrap";
import uuid from "uuid/v4";
import format from "date-fns/format";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import { DotLoader } from "../common/Loader";

function measure(lat1, lon1, lat2, lon2) {
  // generally used geo measurement function
  var R = 6378.137; // Radius of earth in KM
  var dLat = (lat2 * Math.PI) / 180 - (lat1 * Math.PI) / 180;
  var dLon = (lon2 * Math.PI) / 180 - (lon1 * Math.PI) / 180;
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  //return d; // kilometers
  return (d * 1000).toFixed(2); // meters
}
class Submission extends Component {
  state = {
    showGallery: false,
    selectedImg: ""
  };

  openModal = img => {
    this.setState({
      showGallery: true,
      selectedImg: img
    });
  };

  closeModal = () => {
    this.setState({
      showGallery: false,
      selectedImg: ""
    });
  };

  splitSubmissionObj = submissionObj => {
    const question = Object.values(submissionObj);
    return question.length > 0
      ? `${question[0]}/${question[1]}`.replace(/\/undefined/, "")
      : "";
  };

  handleRepeatedSubmission = submission => {
    return (
      <Accordion key={uuid()} defaultActiveKey={submission.name}>
        <Card>
          <Card.Header>
            <h5>
              <Accordion.Toggle
                as={Button}
                variant="link"
                eventKey={submission.name}
              >
                {submission.label
                  ? typeof submission.label === "object"
                    ? this.splitSubmissionObj(submission.label)
                    : submission.label
                  : submission.name}
              </Accordion.Toggle>
            </h5>
          </Card.Header>
          <Accordion.Collapse eventKey={submission.name}>
            <Card.Body>
              {submission.elements &&
                submission.elements.map(sub => {
                  return sub.type === "group" || sub.type === "repeated"
                    ? this.handleRepeatedSubmission(sub)
                    : this.handleUnrepeatedSubmission(sub);
                })}
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    );
  };

  handleUnrepeatedSubmission = submission => {
    const { site } = this.props;
    if (submission.type === "photo") {
      return (
        <div className="submission-list thumb-list" key={uuid()}>
          <ul>
            <li>
              <div className="content">
                <h6>
                  {typeof submission.question === "object"
                    ? this.splitSubmissionObj(submission.question)
                    : submission.question}
                </h6>
              </div>
              <figure>
                {submission.answer && (
                  <img
                    src={submission.answer}
                    style={{
                      backgroundImage: `url(${submission.answer})`,
                      cursor: "pointer"
                    }}
                    onClick={() => this.openModal(submission.answer)}
                  />
                )}
              </figure>
            </li>
          </ul>
        </div>
      );
    } else if (submission.type === "geopoint") {
      let splitedGeoLocation = [];
      let latitude = "";
      let longitude = "";
      let altitude = "";
      let accuracy = "";

      if (submission.answer) {
        splitedGeoLocation = submission.answer.split(" ");
        latitude = splitedGeoLocation[0];
        longitude = splitedGeoLocation[1];
        altitude = splitedGeoLocation[2];
        accuracy = splitedGeoLocation[3];
      }

      return (
        <div className="submission-list normal-list" key={uuid()}>
          <ul>
            <li>
              <h6>
                {typeof submission.question === "object"
                  ? this.splitSubmissionObj(submission.question)
                  : submission.question}
              </h6>
              <div className="submission-map">
                {submission.answer && (
                  <div className="row">
                    <div className="col-lg-5 col-md-5">
                      <div className="map-form">
                        <Map
                          style={{ height: "205px", marginTop: "1rem" }}
                          center={[latitude, longitude]}
                          zoom={15}
                        >
                          <TileLayer
                            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                          />
                          <Marker position={[latitude, longitude]}>
                            <Popup>
                              <b>Question: </b>
                              {submission.question}
                            </Popup>
                          </Marker>
                          <Marker position={[site.latitude, site.longitude]}>
                            <Popup>
                              <b>Project Name: </b>
                              {site.project_name}
                            </Popup>
                          </Marker>
                        </Map>
                      </div>
                    </div>
                    <div className="col-lg-7 col-md-7">
                      <div className="map-legend">
                        <p>
                          <span>Latitude:</span>
                          <label>{latitude}</label>
                        </p>
                        <p>
                          <span>Longitude:</span>
                          <label>{longitude}</label>
                        </p>
                        <p>
                          <span>Altitude:</span>
                          <label>{altitude} meters</label>
                        </p>
                        <p>
                          <span>Accuracy:</span>
                          <label>{(+accuracy).toFixed(2)} meters</label>
                        </p>
                        <p>
                          <span>Distance From Site:</span>
                          <label>
                            {measure(
                              site.latitude,
                              site.longitude,
                              latitude,
                              longitude
                            )}{" "}
                            meters
                          </label>
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </li>
          </ul>
        </div>
      );
    } else {
      return (
        <div className="submission-list normal-list" key={uuid()}>
          <ul>
            <li>
              <h6>
                {typeof submission.question === "object"
                  ? this.splitSubmissionObj(submission.question)
                  : submission.question}
              </h6>
              {submission.type === "start" ||
              submission.type === "end" ||
              submission.type === "datetime" ? (
                <time>
                  <i className="la la-clock-o" />
                  {format(submission.answer, ["MMMM Do YYYY,  h:mm:ss a"])}
                </time>
              ) : (
                <p>{submission.answer}</p>
              )}
            </li>
          </ul>
        </div>
      );
    }
  };

  renderSubmission = submissionData => {
    return submissionData.map((submission, i) => {
      if (submission.type === "group" || submission.type === "repeat") {
        return this.handleRepeatedSubmission(submission);
      } else {
        return this.handleUnrepeatedSubmission(submission);
      }
    });
  };

  render() {
    const {
      props: { dateCreated, submittedBy, submissionData, formName },
      state: { showGallery, selectedImg }
    } = this;

    return (
      <>
        <div className="group-submission mrt-30">
          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-header main-card-header sticky-top">
                  <div className="head-right">
                    <h5>{formName}</h5>

                    {submittedBy && (
                      <div className="submitted-header">
                        <div className="submit-by">
                          <label>by :</label> {submittedBy}
                        </div>
                        <time>
                          <label>on:</label> {format(dateCreated, "MM-DD-YYYY")}
                        </time>
                      </div>
                    )}
                  </div>
                </div>

                <div className="card-body submission-card">
                  {submissionData && this.renderSubmission(submissionData)}
                  {showGallery && (
                    <div
                      className="gallery-zoom fieldsight-popup open"
                      style={{ zIndex: 99999 }}
                      onClick={this.closeModal}
                    >
                      <div className="gallery-body">
                        <img
                          src={selectedImg}
                          alt="logo"
                          style={{ minHeight: "400px", maxHeight: "400px" }}
                        />
                      </div>
                      <span className="popup-close" onClick={this.closeModal}>
                        <i className="la la-close" />
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Submission;
