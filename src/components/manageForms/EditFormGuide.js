import React, { Component } from "react";
import Dropzone from "react-dropzone";
import Cropper from "react-cropper";

import InputElement from "../common/InputElement";

class EditFormGuide extends Component {
  state = {
    data: {
      images: this.props.data.em_images ? this.props.data.em_images : [],
      file: !!this.props.data.is_pdf ? this.props.data.pdf : {},
      title: this.props.data.title ? this.props.data.title : "",
      text: this.props.data.text ? this.props.data.text : ""
    },
    fileName: "",
    src: ""
  };

  readFile = file => {
    this.setState({
      data: {
        ...this.state.data,
        file: file[0]
      },
      fileName: file[0].name
    });
  };

  readImageFile = file => {
    const reader = new FileReader();
    reader.onload = () => {
      this.setState({
        src: reader.result
      });
    };
    reader.readAsDataURL(file);
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      data: {
        ...this.state.data,
        [name]: value
      }
    });
  };
  render() {
    const {
      state: {
        src,
        fileName,
        data: { images, file, title, text }
      },
      props: { is_pdf, handleCancel, handleUpdateGuide },
      readFile,
      readImageFile,
      handleChange
    } = this;
    console.log("data-", this.props.data, this.state);

    return (
      <form className="edit-form" onSubmit={() => handleUpdateGuide(data)}>
        <div className="row">
          <div className="col-md-6 col-md-8">
            <InputElement
              formType="editForm"
              tag="input"
              type="text"
              //   required={true}
              label="Title"
              name="title"
              value={title}
              changeHandler={handleChange}
            />
          </div>
          <div className="col-md-6 col-md-8">
            <InputElement
              formType="editForm"
              tag="input"
              type="text"
              //   required={true}
              label="Description"
              name="text"
              value={text}
              changeHandler={handleChange}
            />
          </div>
          <div className="col-md-6 col-md-8">
            <div className="form-group">
              <label> Attached Images</label>
              {images.length > 0 ? (
                <Dropzone onDrop={acceptedFile => readImageFile(acceptedFile)}>
                  {({ getRootProps, getInputProps }) => {
                    return images.map((each, index) => {
                      return (
                        <section key={`image_${index}`}>
                          <div className="upload-form">
                            <img src={each.image} alt="Cropped Image" />
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
                <Dropzone onDrop={acceptedFile => readImageFile(acceptedFile)}>
                  {({ getRootProps, getInputProps }) => {
                    return (
                      <section>
                        <div className="upload-form">
                          <div className="upload-wrap">
                            <div className="content">
                              <div {...getRootProps()}>
                                <input {...getInputProps()} multiple={true} />
                                <div className="upload-icon" />
                                <h3>Drag & Drop an image</h3>
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
            </div>
          </div>
          <div className="col-md-6 col-md-8">
            <div className="form-group">
              <label>{" Attach File"}</label>
              {is_pdf ? (
                <Dropzone onDrop={acceptedFile => readFile(acceptedFile)}>
                  {({ getRootProps, getInputProps }) => {
                    return (
                      <section>
                        <div className="upload-form">
                          <i className="la la-file-o"></i>
                          <span>{fileName}</span>
                        </div>
                        <div {...getRootProps()}>
                          <input
                            {...getInputProps()}
                            multiple={false}
                            // accept="application/json"
                          />
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
                <Dropzone onDrop={acceptedFile => readFile(acceptedFile)}>
                  {({ getRootProps, getInputProps }) => {
                    return (
                      <section>
                        <div className="upload-form">
                          <div className="upload-wrap">
                            <div className="content">
                              <div {...getRootProps()}>
                                <input {...getInputProps()} multiple={false} />
                                <div className="upload-icon" />
                                <h3>Drag & Drop a file</h3>
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
            </div>
          </div>
          <div className="col-sm-6">
            <button
              type="submit"
              className="fieldsight-btn pull-right col-sm-6"
            >
              Save Changes
            </button>
            <button
              type="button"
              className="fieldsight-btn pull-right col-sm-6"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    );
  }
}
export default EditFormGuide;
