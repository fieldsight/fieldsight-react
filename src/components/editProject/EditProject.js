import React, { Component } from "react";
import InputElement from "../common/InputElement";
import SelectElement from "../common/SelectElement";
import RightContentCard from "../common/RightContentCard";

class EditProject extends Component {
  render() {
    return (
      <RightContentCard title="Edit Project">
        <form className="edit-form">
          <div className="row">
            <div className="col-xl-4 col-md-6">
              <InputElement
                formType="editForm"
                tag="input"
                type="text"
                required={true}
                label="Name"
                value="Nuwakot Retrofitting"
              />
            </div>
            <div className="col-xl-4 col-md-6">
              <SelectElement
                className="wide"
                label="Sector"
                options={["Agriculture, fishing and forestry", "Date"]}
              />
            </div>
            <div className="col-xl-4 col-md-6">
              <SelectElement
                className="wide"
                label="Sub Sector"
                options={["Irrigation and drainage", "Date"]}
              />
            </div>
            <div className="col-xl-4 col-md-6">
              <InputElement
                formType="editForm"
                tag="input"
                type="text"
                required={true}
                label="Phone"
                value="98560...."
              />
            </div>
            <div className="col-xl-4 col-md-6">
              <InputElement
                formType="editForm"
                tag="input"
                type="text"
                required={true}
                label="Email"
                value="info@naxa.com.np"
              />
            </div>
            <div className="col-xl-4 col-md-6">
              <InputElement
                formType="editForm"
                tag="input"
                type="text"
                required={true}
                label="Address"
                value="Kathmandu , nepal"
              />
            </div>
            <div className="col-xl-4 col-md-6">
              <div className="form-group">
                <InputElement
                  formType="editForm"
                  tag="input"
                  type="text"
                  required={true}
                  label="website"
                  value="buildchange.org"
                />
              </div>
            </div>
            <div className="col-xl-4 col-md-6">
              <div className="form-group">
                <InputElement
                  formType="editForm"
                  tag="input"
                  type="text"
                  required={true}
                  label="Donor"
                  value="Fieldsight"
                />
              </div>
            </div>
            <div className="col-xl-4 col-md-6" />
            <div className="col-xl-4 col-md-6">
              <InputElement
                formType="editForm"
                tag="input"
                type="text"
                required={true}
                label="Description"
                value="text"
              />
            </div>
            <div className="col-xl-4 col-md-6">
              <div className="form-group">
                <label>
                  Map <sup>*</sup>
                </label>
                <div className="map-form">
                  <div id="map" />
                  <div className="latitude-form">
                    <div className="lat-group">
                      <label>Latitude</label>
                      <input
                        type="text"
                        className="form-control"
                        value="27,0127"
                      />
                    </div>
                    <div className="lat-group">
                      <label>longitude</label>
                      <input
                        type="text"
                        className="form-control"
                        value="27,0127"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-md-6">
              <div className="form-group">
                <label>attach file</label>
                <div className="upload-form">
                  <div className="upload-wrap">
                    <div className="content">
                      <div className="upload-icon" />
                      <h3>Drag & Drop an image</h3>
                      <span>or</span>
                    </div>
                    <img src="" className="upload-img" />
                    <input
                      type="file"
                      name="userprofile_picture"
                      id="filePhoto"
                    />
                    <div className="fieldsight-btn">
                      <label htmlFor="upload-btn">
                        upload <i className="la la-cloud-upload" />
                      </label>
                      <input type="file" id="upload-btn" multiple />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-12">
              <button type="submit" className="fieldsight-btn pull-right">
                Save
              </button>
            </div>
          </div>
        </form>
      </RightContentCard>
    );
  }
}

export default EditProject;
