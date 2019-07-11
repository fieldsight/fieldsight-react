import React, { Component } from "react";
import axios from "axios";
import "react-perfect-scrollbar/dist/css/styles.css";

let tokenVal = window.token
  ? window.token
  : "91a844e62e86b6e336b8fb440340cbeaabf601fe";

let kpiUrl = window.kpi_base_url
  ? window.kpi_base_url
  : "https://kpi.naxa.com.np/";

class ReplaceModal extends Component {
  state = {};

  onChangeHandler = event => {
    const id = this.props.shareUrls;
    const editUrl = this.props.modalDatas;
    const destinationUrl = kpiUrl + "assets/" + id + "/";
    const formData = new FormData();

    formData.append("assetUid", id);
    formData.append("name", event.target.files[0].name);
    formData.append("file", event.target.files[0]);
    formData.append("destination", destinationUrl);

    axios
      .post(kpiUrl + "imports/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Token " + tokenVal
        }
      })
      .then(res => {
        if (res.status === 201) {
          window.open(editUrl, "_self");
        }
      })
      .catch(err => console.log("err", err));
  };

  render() {
    return (
      <React.Fragment>
        <form>
          <div className="form-group">
            <label>attach file</label>
            <div className="upload-form">
              <div className="upload-wrap">
                <div className="content">
                  <h3>Drag & Drop an File</h3>
                  <span>or</span>
                </div>
                <input
                  type="file"
                  onChange={this.onChangeHandler}
                  className="userprofile_picture"
                  id="filePhoto"
                />
                <div className="fieldsight-btn">
                  <label htmlFor="upload-btn">
                    upload <i className="la la-cloud-upload" />
                  </label>
                  {/* <input type="file" id="upload-btn"  /> */}
                </div>
              </div>
            </div>
          </div>
        </form>
      </React.Fragment>
    );
  }
}

export default ReplaceModal;
