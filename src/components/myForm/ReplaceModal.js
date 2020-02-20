import React, { Component } from "react";
import axios from "axios";
import Dropzone from "react-dropzone";

import "react-perfect-scrollbar/dist/css/styles.css";

let tokenVal = window.token
  ? window.token
  : "91a844e62e86b6e336b8fb440340cbeaabf601fe";

let kpiUrl = window.kpi_base_url
  ? window.kpi_base_url
  : "https://kpi.naxa.com.np/";

class ReplaceModal extends Component {
  state = {
    images: {},
    srcs: []
  };

  onChangeHandler = file => {
    const id = this.props.shareUrls;
    const editUrl = this.props.modalDatas;
    const destinationUrl = kpiUrl + "assets/" + id + "/";
    const formData = new FormData();

    formData.append("assetUid", id);
    formData.append("name", file[0].name);
    formData.append("file", file[0]);
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

  readImageFile = file => {
    this.previewImg(file);
    this.onChangeHandler(file);
  };

  previewImg = files => {
    files.map(img => {
      const reader = new FileReader();
      reader.onload = () => {
        this.setState({
          srcs: [...this.state.srcs, reader.result]
        });
      };
      reader.readAsDataURL(img);
    });
  };

  render() {
    const { srcs } = this.state;
    return (
      <React.Fragment>
        <form>
          <div className="form-group">
            <label>attach file</label>
            {srcs.length > 0 ? (
              <Dropzone
                accept="image/*"
                onDrop={acceptedFile => readImageFile(acceptedFile)}
              >
                {({ getRootProps, getInputProps }) => {
                  return srcs.map((each, index) => {
                    return (
                      <section key={`image_${index}`}>
                        <div className="upload-form">
                          <img src={each} alt="Preview Image" />
                        </div>
                        <div {...getRootProps()}>
                          <input {...getInputProps()} multiple={true} />
                          <div className="upload-icon" />

                          <button className="fieldsight-btn">
                            Upload
                            <i className="la la-cloud-upload" />
                          </button>
                        </div>
                      </section>
                    );
                  });
                }}
              </Dropzone>
            ) : (
              <Dropzone
                accept="image/*"
                onDrop={acceptedFile => this.readImageFile(acceptedFile)}
              >
                {({ getRootProps, getInputProps }) => {
                  return (
                    <section>
                      <div className="upload-form">
                        <div className="upload-wrap">
                          <div className="content">
                            <div {...getRootProps()}>
                              <input {...getInputProps()} multiple={false} />
                              <div className="upload-icon" />
                              <h3>Upload an image</h3>
                              <button className="fieldsight-btn">
                                Upload
                                <i className="la la-cloud-upload" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>
                  );
                }}
              </Dropzone>
            )}
            {/* <div className="upload-form">
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
                </div>
              </div> */}
            {/* </div> */}
          </div>
        </form>
      </React.Fragment>
    );
  }
}

export default ReplaceModal;
