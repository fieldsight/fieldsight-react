import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import InputElement from '../../common/InputElement';

/* eslint-disable   react/destructuring-assignment */
/* eslint-disable camelcase */
/* eslint-disable react/no-array-index-key */

const getFilename = name => {
  const fileName = name.split('/');
  return fileName[fileName.length - 1];
};
const getImages = images => {
  const arr = [];
  images.map(item => {
    return arr.push(item.image);
  });
  return arr;
};

class EditFormGuide extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.data.id ? props.data.id : '',
      data: {
        title: props.data.title ? props.data.title : '',
        text: props.data.text ? props.data.text : '',
        fsxf: props.data.fsxf ? props.data.fsxf : '',
        is_pdf: props.data.is_pdf ? props.data.is_pdf : false,
      },
      fileName: props.data.pdf
        ? getFilename(this.props.data.pdf)
        : '',
      // isPdf: this.props.data.is_pdf ? this.props.data.is_pdf : false,
      srcs: props.data.em_images
        ? getImages(this.props.data.em_images)
        : [],
      // file: {},
    };
  }

  readFile = file => {
    const newFile = file[0];
    this.setState(state => ({
      data: {
        ...state.data,
        pdf: newFile,
        is_pdf: true,
      },
      fileName: newFile.name,
      // isPdf: true
    }));
  };

  readImageFile = file => {
    this.setState(
      state => ({
        data: {
          ...state.data,
          images: file,
        },
      }),
      () => {
        this.previewImg(file);
      },
    );
  };

  previewImg = files => {
    files.map(img => {
      const reader = new FileReader();
      reader.onload = () => {
        this.setState(state => ({
          srcs: [...state.srcs, reader.result],
        }));
      };
      return reader.readAsDataURL(img);
    });
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState(state => ({
      data: {
        ...state.data,
        [name]: value,
      },
    }));
  };

  handleSubmit = e => {
    e.preventDefault();
    const {
      state: { id, data },
      props: { handleUpdateGuide },
    } = this;
    let body = {};
    if (id) {
      body = { ...data, id };
    } else {
      body = { ...data };
    }
    handleUpdateGuide(body);
  };

  render() {
    const {
      state: {
        srcs,
        fileName,
        data: { title, text, is_pdf },
      },
      props: { handleCancel },
      readFile,
      readImageFile,
      handleChange,
      handleSubmit,
    } = this;

    return (
      <form className="edit-form" onSubmit={e => handleSubmit(e)}>
        <div className="row">
          <div className="col-md-6 col-md-8">
            <InputElement
              formType="editForm"
              tag="input"
              type="text"
              //   required={true}
              label="title"
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
              label="description"
              name="text"
              value={text}
              changeHandler={handleChange}
            />
          </div>
          <div className="col-md-12">
            <div className="form-group">
              <label>Attached Images</label>
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
                            <img src={each} alt="" />
                          </div>
                          <div {...getRootProps()}>
                            <input {...getInputProps()} multiple />
                            <div className="upload-icon" />

                            <button
                              className="fieldsight-btn"
                              type="button"
                            >
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
                                <input
                                  {...getInputProps()}
                                  multiple
                                />
                                <div className="upload-icon" />
                                <h3>Drag & Drop an image</h3>
                                <button
                                  className="fieldsight-btn"
                                  type="button"
                                >
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
              <label>Attach File</label>
              {is_pdf ? (
                <Dropzone
                  accept=".pdf"
                  onDrop={acceptedFile => readFile(acceptedFile)}
                >
                  {({ getRootProps, getInputProps }) => {
                    return (
                      <section>
                        <div className="upload-form">
                          <i className="la la-file-o" />
                          <span>{fileName}</span>
                        </div>
                        <div {...getRootProps()}>
                          <input
                            {...getInputProps()}
                            multiple={false}
                            // accept="application/json"
                          />
                          <div className="upload-icon" />

                          <button
                            className="fieldsight-btn"
                            type="button"
                          >
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
                                <input
                                  {...getInputProps()}
                                  multiple={false}
                                />
                                <div className="upload-icon" />
                                <h3>Drag & Drop a file</h3>
                                <button
                                  className="fieldsight-btn"
                                  type="button"
                                >
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
            <button
              type="submit"
              className="fieldsight-btn pull-right "
            >
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
