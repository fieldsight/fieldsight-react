import React, { Component } from "react";
import ProjectSiteTable from "./ProjectSiteTable";
import Zoom from "react-reveal/Zoom";
import PerfectScrollbar from "react-perfect-scrollbar";
import Select from "react-select";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" }
];

const SelectOption = () => <Select options={options} />;

const popUpState = {
  addModal: false,
  uploadModal: false
};
class ProjectSiteList extends Component {
  state = {
    addModal: false,
    uploadModal: false
  };
  showPopup = (e, type) => {
    this.setState(prevState => ({
      ...popUpState,
      [`${type}Modal`]: true
    }));
  };

  closePopup = () => {
    this.setState({
      addModal: false,
      uploadModal: false
    });
  };

  render() {
    return (
      <React.Fragment>
      
          <nav aria-label="breadcrumb" role="navigation">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="index.html">Home</a>
                  </li>
                  <li className="breadcrumb-item">
                    <a href="/fieldsight/organization-dashboard/13/">Teams</a>
                  </li>

                  <li className="breadcrumb-item active" aria-current="page">
                    Invitation
                  </li>
                </ol>
              </nav>
            <div className="card">
              
              
                <ProjectSiteTable 
                 showPopup={this.showPopup}
                />
               
              
              {this.state.uploadModal && (
                <Zoom duration={500}>
                  <div className="fieldsight-popup open">
                    <div className="popup-body lg-body">
                      <div className="card">
                        <div className="card-header main-card-header">
                          <h5>Bulk Upload</h5>
                          <span
                            className="popup-close"
                            onClick={this.closePopup}
                          >
                            <i className="la la-close" />
                          </span>
                        </div>
                        <div className="card-body">
                          <form
                            className="edit-form"
                            style={{ position: "relative", height: "250px" }}
                          >
                            <PerfectScrollbar>
                              <div className="form-group">
                                <label>Upload file</label>
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
                                        upload <i className="la la-cloud-upload" />
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
                            </PerfectScrollbar>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </Zoom>
              )}
              {this.state.addModal && (
                <Zoom duration={500}>
                  <div className="fieldsight-popup open">
                    <div className="popup-body lg-body">
                      <div className="card">
                        <div className="card-header main-card-header">
                          <h5>Add site</h5>
                          <span
                            className="popup-close"
                            onClick={this.closePopup}
                          >
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
              )}
            </div>
          
      </React.Fragment>
    );
  }
}
export default ProjectSiteList;
