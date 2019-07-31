import React, { Component,Fragment } from "react";
import Zoom from "react-reveal/Zoom";
import PerfectScrollbar from "react-perfect-scrollbar";
import Select from "react-select";
import L from "leaflet";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import InputElement from "../common/InputElement";


const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" }
  ];
  
  const SelectOption = () => <Select options={options} />;
  

class AddSite extends Component {

    state = {
       zoom:1
      };


  render() {
    return (
      <Fragment>
      
          <Zoom duration={500}>
            <div className="fieldsight-popup open">
              <div className="popup-body lg-body">
                <div className="card">
                  <div className="card-header main-card-header">
                    <h5>Add site</h5>
                    <span className="popup-close" onClick={this.props.closePopup}>
                      <i className="la la-close" />
                    </span>
                  </div>
                  <div className="card-body">
                    <form
                      className="floating-form"
                      style={{ position: "relative", height: "300px" }}
                    >
                      <PerfectScrollbar>
                        <div className="row">
                          <div className="col-xl-6 col-md-12">
                            <div className="form-group">
                              <input
                                type="text"
                                className="form-control"
                                required
                              />
                              <label htmlFor="input">id</label>
                            </div>
                          </div>
                          <div className="col-xl-6 col-md-12">
                            <div className="form-group">
                              <input
                                type="text"
                                className="form-control"
                                required
                              />
                              <label htmlFor="input">Name</label>
                            </div>
                          </div>
                          <div className="col-xl-6 col-md-12">
                            <div className="form-group">
                              <SelectOption />
                            </div>
                          </div>
                          <div className="col-xl-6 col-md-12">
                            <div className="form-group">
                              <input
                                type="number"
                                className="form-control"
                                required
                              />
                              <label htmlFor="input">Phone</label>
                            </div>
                          </div>

                          <div className="col-xl-6 col-md-12">
                            <div className="form-group">
                              <input
                                type="text"
                                className="form-control"
                                required
                              />
                              <label htmlFor="input">Address</label>
                            </div>
                          </div>
                          <div className="col-xl-6 col-md-12">
                            <div className="form-group">
                              <input
                                type="text"
                                className="form-control"
                                required
                              />
                              <label htmlFor="input">Region</label>
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="form-group">
                              <label>Site Photo</label>
                              <div className="upload-form">
                                <div className="upload-wrap">
                                  <div className="content">
                                    <h3>Drag & Drop an image</h3>
                                    <span>or</span>
                                  </div>
                                  <input
                                    type="file"
                                    className="userprofile_picture"
                                    id="filePhoto"
                                  />
                                  <div className="fieldsight-btn">
                                    <label htmlFor="upload-btn">
                                      upload{" "}
                                      <i className="la la-cloud-upload" />
                                    </label>
                                    <input
                                      type="file"
                                      id="upload-btn"
                                      multiple
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* sdad */}
                          <div className="col-xl-4 col-md-6">
                            <div className="form-group">
                              <label>
                                Map <sup>*</sup>
                              </label>

                              <div className="map-form">
                                <Map
                                  style={{ height: "205px", marginTop: "1rem" }}
                                  center={[27.2234, 87.23232]}
                                  zoom={this.state.zoom}
                                  onClick={this.mapClickHandler}
                                >
                                  <TileLayer
                                    attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                  />
                                  <Marker position={[27.2234, 87.23232]}>
                                    <Popup>
                                      <b>Name: </b>
                                      {name}
                                    </Popup>
                                  </Marker>
                                </Map>
                                <div className="latitude-form">
                                  <div className="lat-group">
                                    <InputElement
                                      formType="editForm"
                                      tag="input"
                                      type="number"
                                      required={true}
                                      label="Latitude"
                                      name="latitude"
                                      value={27.2234}
                                      changeHandler={e =>
                                        onChangeHandler(e, "latitude")
                                      }
                                    />
                                  </div>

                                  <div className="lat-group">
                                    <InputElement
                                      formType="editForm"
                                      tag="input"
                                      type="number"
                                      required={true}
                                      label="Longitude"
                                      name="longitude"
                                      value={87.23232}
                                      changeHandler={e =>
                                        onChangeHandler(e, "longitude")
                                      }
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* sdad */}
                        </div>
                        <div className="form-group">
                          <div className="form-group pull-right no-margin">
                            <button type="submit" className="fieldsight-btn">
                              Save
                            </button>
                          </div>
                        </div>
                      </PerfectScrollbar>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </Zoom>
      
      </Fragment>
    );
  }
}
export default AddSite;