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
    file: {},
    fileName: "",
    hasFile: false
  };

  onChangeHandler = e => {
    e.preventDefault();
    const { file } = this.state;
    const id = this.props.assetUid;
    const editUrl = this.props.modalDatas;
    const destinationUrl = kpiUrl + "assets/" + id + "/";
    const formData = new FormData();

    formData.append("assetUid", id);
    formData.append("name", file.name);
    formData.append("file", file);
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
          this.props.toggleModal();
        }
      })
      .catch(err => console.log("err", err));
  };

  readFile = file => {
    const newFile = file[0];
    this.setState({
      file: newFile,
      fileName: newFile.name,
      hasFile: true
    });
  };

  render() {
    const { fileName, hasFile } = this.state;
    return (
      <React.Fragment>
        <form
          onSubmit={e => {
            this.onChangeHandler(e);
          }}
        >
          <div className="form-group">
            <label>attach file</label>
            {hasFile ? (
              <Dropzone
                accept=".xls"
                onDrop={acceptedFile => this.readFile(acceptedFile)}
              >
                {({ getRootProps, getInputProps }) => {
                  return (
                    <section>
                      <div className="upload-form">
                        <i className="la la-file-o"></i>
                        <span>{fileName}</span>
                      </div>
                      <div {...getRootProps()}>
                        <input {...getInputProps()} multiple={false} />
                        <div className="upload-icon" />

                        <button className="fieldsight-btn">
                          Upload
                          <i className="la la-cloud-upload" />
                        </button>
                      </div>
                    </section>
                  );
                }}
              </Dropzone>
            ) : (
              <Dropzone
                accept=".xls"
                onDrop={acceptedFile => this.readFile(acceptedFile)}
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
                              <h3>Upload XLS file</h3>
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
          <div className="form-group">
            <button type="submit" className="fieldsight-btn pull-right ">
              Upload
            </button>
          </div>
        </form>
      </React.Fragment>
    );
  }
}

export default ReplaceModal;
