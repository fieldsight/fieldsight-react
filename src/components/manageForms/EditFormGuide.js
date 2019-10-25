import React, { Component } from "react";
import Dropzone from "react-dropzone";
import InputElement from "../common/InputElement";

const getFilename = name => {
  const fileName = name.split("/");
  return fileName[fileName.length - 1];
};
const getImages = images => {
  const arr = [];
  images.map(item => {
    arr.push(item.image);
  });
  return arr;
};

class EditFormGuide extends Component {
  state = {
    id: this.props.data.id ? this.props.data.id : "",
    data: {
      title: this.props.data.title ? this.props.data.title : "",
      text: this.props.data.text ? this.props.data.text : "",
      fsxf: this.props.data.fsxf ? this.props.data.fsxf : "",
      is_pdf: this.props.data.is_pdf ? this.props.data.is_pdf : false
    },
    fileName: this.props.data.pdf ? getFilename(this.props.data.pdf) : "",
    // isPdf: this.props.data.is_pdf ? this.props.data.is_pdf : false,
    srcs: this.props.data.em_images ? getImages(this.props.data.em_images) : [],
    file: {}
  };

  readFile = file => {
    const newFile = file[0];
    this.setState({
      data: {
        ...this.state.data,
        pdf: newFile,
        is_pdf: true
      },
      fileName: newFile.name
      // isPdf: true
    });
  };

  readImageFile = file => {
    this.setState(
      {
        data: {
          ...this.state.data,
          images: file
        }
      },
      () => {
        this.previewImg(file);
      }
    );
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
  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      data: {
        ...this.state.data,
        [name]: value
      }
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    const { id, data } = this.state;
    let body = {};
    if (!!id) {
      body = { ...data, id };
    } else {
      body = { ...data };
    }

    this.props.handleUpdateGuide(body);
  };
  render() {
    const {
      state: {
        srcs,
        fileName,
        data: { title, text, is_pdf }
      },
      props: { handleCancel },
      readFile,
      readImageFile,
      handleChange,
      handleSubmit
    } = this;
    console.log("form ma", this.props.data);

    return (
      <form className="edit-form" onSubmit={e => handleSubmit(e)}>
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
          <div className="col-md-12">
            <div className="form-group">
              <label> Attached Images</label>
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
                  onDrop={acceptedFile => readImageFile(acceptedFile)}
                >
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
          <div className="col-md-12">
            <div className="form-group">
              <label>{" Attach File"}</label>
              {is_pdf ? (
                <Dropzone
                  accept=".pdf"
                  onDrop={acceptedFile => readFile(acceptedFile)}
                >
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
                <Dropzone
                  onDrop={acceptedFile => readFile(acceptedFile)}
                  accept=".pdf"
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
          <div className="col-md-12">
            <button type="submit" className="fieldsight-btn pull-right ">
              Save Changes
            </button>
            <button
              type="button"
              className="fieldsight-btn pull-right"
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
