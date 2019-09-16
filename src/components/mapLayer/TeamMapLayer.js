import React, { Component, Fragment } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import axios from "axios";
import Dropzone from "react-dropzone";
import Cropper from "react-cropper";
import { DotLoader } from "../common/Loader";
import RightContentCard from "../common/RightContentCard";
import Loader from "../common/Loader";
import { errorToast, successToast } from "../../utils/toastHandler";
import InputElement from "../common/InputElement";

const animatedComponents = makeAnimated();

const url = "fv3/api/team-geolayer/";

export default class TeamMapLayer extends Component {
  _isMounted = false;
  state = {
    geoLayer: {
      code_prop: "",
      title: "",
      title_prop: "",
      level: "",
      organization: this.props.match.params ? this.props.match.params.id : "",
      tolerance: "",
      geo_shape_file: {}
    },
    initialData: [],
    dropdownData: [],
    isLoading: false,
    dotLoader: true,
    teamId: this.props.match.params ? this.props.match.params.id : "",
    addMap: true,
    selectedMapId: "",
    src: "",
    showCropper: false,
    cropResult: "",
    hasProp: false,
    propDropdown: [],
    fileName: "",
    loaded: "",
    showMsg: ""
  };

  componentDidMount() {
    this._isMounted = true;
    this.requestLayerData();
  }

  requestLayerData = () => {
    const { teamId } = this.state;
    axios
      .get(`${url}?team=${teamId}`)
      .then(dropdownData => {
        if (this._isMounted) {
          const modifiedDropdownData = dropdownData.data.map(item => ({
            ...item,
            value: item.id,
            label: item.title
          }));
          this.setState({
            // initialData: modifiedInitialData,
            dropdownData: modifiedDropdownData,
            dotLoader: false
          });
        }
      })
      .catch(err => {
        this._isMounted &&
          this.setState({
            dotLoader: false
          });
      });
  };
  handleSelectCodeProp = option => {
    this.setState(state => {
      return {
        geoLayer: {
          ...this.state.geoLayer,
          code_prop: option.value
        }
      };
    });
  };
  handleSelectTitleProp = option => {
    this.setState(state => {
      return {
        geoLayer: {
          ...this.state.geoLayer,
          title_prop: option.value
        }
      };
    });
  };
  handleSelectMap = option => {
    const fileName = option.geo_shape_file.split("/");
    const propArr = [];
    this.setState(
      state => {
        if (option.properties.length > 0) {
          option.properties.map(each => {
            if (each !== "id") {
              if (each !== "Centroid_X") {
                if (each !== "Centroid_Y") {
                  const name = each.replace("_", " ").toUpperCase();
                  propArr.push({ value: each, label: name });
                }
              }
            }
          });
        }
        return {
          selectedMapId: option.id,
          geoLayer: {
            ...this.state.geoLayer,
            code_prop: option.code_prop,
            title: option.title,
            title_prop: option.title_prop,
            level: option.level,
            organization: option.organization,
            tolerance: option.tolerance
            // geo_shape_file: option.geo_shape_file
          },
          cropResult: option.geo_shape_file,
          addMap: !this.state.addMap,
          propDropdown: propArr,
          hasProp: option.properties.length > 0 ? true : false,
          fileName: fileName.length > 0 ? fileName[fileName.length - 1] : ""
        };
      },
      () => {
        // this.readJsonFile(option.geo_shape_file);
      }
    );
  };
  requestHandler = () => {
    const {
      teamId,
      geoLayer: {
        code_prop,
        title,
        title_prop,
        level,
        organization,
        tolerance,
        geo_shape_file
      },
      cropResult,
      selectedMapId
    } = this.state;

    const formData = new FormData();
    formData.append("organization", organization);
    formData.append("level", level);
    formData.append("title", title);
    formData.append("title_prop", title_prop);
    formData.append("code_prop", code_prop);
    formData.append("tolerance", tolerance);
    if (Object.keys(geo_shape_file).length > 0)
      formData.append("geo_shape_file", cropResult);

    if (!!selectedMapId) {
      axios
        .put(`${url}${selectedMapId}/`, formData, {
          onUploadProgress: progressEvent => {
            this.setState({
              loaded: Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              )
            });
          }
        })
        .then(res => {
          this.setState(
            {
              isLoading: false,
              addMap: !this.state.addMap
            },
            () => {
              successToast("Map Layer", "updated");
              this.requestLayerData();
            }
          );
        })
        .catch(err => {
          this.setState(
            {
              isLoading: false
            },
            errorToast()
          );
        });
    } else {
      axios
        .post(`${url}`, formData, {
          onUploadProgress: progressEvent => {
            this.setState({
              loaded: Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              )
            });
          }
        })
        .then(res => {
          this.setState(
            {
              isLoading: false,
              addMap: !this.state.addMap
            },
            () => {
              successToast("Map Layer", "added");
              this.requestLayerData();
            }
          );
        })
        .catch(err => {
          this.setState(
            {
              isLoading: false
            },
            errorToast()
          );
        });
    }
  };

  onSubmitHandler = e => {
    e.preventDefault();
    this.setState(
      {
        isLoading: true
      },
      this.requestHandler
    );
  };

  toggleNewForm = () => {
    this.setState({
      addMap: !this.state.addMap,
      geoLayer: {
        code_prop: "",
        title: "",
        title_prop: "",
        level: "",
        organization: this.props.match.params ? this.props.match.params.id : "",
        tolerance: ""
        // geo_shape_file: {}
      },
      selectedMapId: "",
      src: "",
      showCropper: false,
      cropResult: "",
      hasProp: false
    });
  };

  onChangeHandler = e => {
    const { name, value } = e.target;

    this.setState({
      geoLayer: {
        ...this.state.geoLayer,
        [name]: value
      }
    });
  };

  readJsonFile = file => {
    const reader = new FileReader();
    reader.onload = () => {
      const res = JSON.parse(reader.result);
      const features = res.features;
      const properties = features[0].properties;
      const objKeys = Object.keys(properties);
      const newArr = [];
      objKeys.map(each => {
        if (each !== "id") {
          if (each !== "Centroid_X") {
            if (each !== "Centroid_Y") {
              const name = each.replace("_", " ").toUpperCase();
              newArr.push({ value: each, label: name });
            }
          }
        }
      });
      // debugger;
      this.setState({
        cropResult: file,
        // fileName: file[0].name,
        hasProp: true,
        propDropdown: newArr
      });
    };
    reader.readAsText(file);
  };

  readFile = file => {
    const fileType = [
      "application/json",
      // "application/javascript",
      "application/geo+json"
    ];
    const types = file[0].type;
    if (fileType.includes(types)) {
      const reader = new FileReader();
      reader.onload = () => {
        const res = JSON.parse(reader.result);
        const features = res.features;
        const properties = features[0].properties;
        const objKeys = Object.keys(properties);
        const newArr = [];
        objKeys.map(each => {
          if (each !== "id") {
            if (each !== "Centroid_X") {
              if (each !== "Centroid_Y") {
                const name = each.replace("_", " ").toUpperCase();
                newArr.push({ value: each, label: name });
              }
            }
          }
        });
        this.setState({
          cropResult: file[0],
          fileName: file[0].name,
          hasProp: true,
          propDropdown: newArr,
          showMsg: "",
          geoLayer: {
            ...this.state.geoLayer,
            geo_shape_file: file[0]
          }
        });
      };
      reader.readAsText(file[0]);
    } else {
      this.setState({ showMsg: "Select a JSON file" });
    }
  };

  cropImage = () => {
    if (typeof this.cropper.getCroppedCanvas() === "undefined") {
      return;
    }
    this.setState({
      cropResult: this.cropper.getCroppedCanvas().toDataURL(),
      showCropper: false,
      src: ""
    });
  };

  closeModal = () => {
    this.setState({
      showCropper: false
    });
  };

  render() {
    const {
      state: {
        initialData,
        dropdownData,
        isLoading,
        dotLoader,
        addMap,
        teamId,
        cropResult,
        geoLayer: { code_prop, title, title_prop, level, tolerance },
        hasProp,
        propDropdown,
        fileName,
        loaded,
        showMsg
      },
      onSubmitHandler,
      toggleNewForm,
      handleSelectMap,
      onChangeHandler,
      handleSelectCodeProp,
      handleSelectTitleProp,
      readFile,
      closeModal
    } = this;

    return (
      <Fragment>
        <RightContentCard
          title="Map Layer"
          addButton={addMap}
          toggleModal={toggleNewForm}
        >
          {dotLoader && <DotLoader />}
          {!dotLoader && !!addMap && (
            <Select
              closeMenuOnSelect={true}
              components={animatedComponents}
              onChange={handleSelectMap}
              defaultValue={initialData}
              options={dropdownData}
            />
          )}
          {!dotLoader && !addMap && (
            <RightContentCard>
              <form className="edit-form" onSubmit={onSubmitHandler}>
                <div className="row">
                  <div className="col-xl-12 col-md-6">
                    <InputElement
                      formType="editForm"
                      tag="input"
                      type="text"
                      required={true}
                      label="Title"
                      name="title"
                      value={title}
                      changeHandler={onChangeHandler}
                    />
                  </div>
                  <div className="col-xl-4 col-md-6">
                    <InputElement
                      formType="editForm"
                      tag="input"
                      type="number"
                      // required={true}
                      label="Level"
                      name="level"
                      value={level}
                      changeHandler={onChangeHandler}
                    />
                  </div>
                  <div className="col-xl-4 col-md-6">
                    <InputElement
                      formType="editForm"
                      tag="input"
                      type="number"
                      // required={true}
                      label="Tolerance"
                      name="tolerance"
                      value={tolerance}
                      changeHandler={onChangeHandler}
                    />
                  </div>

                  <div className="col-xl-8 col-md-6">
                    <div className="form-group">
                      <label>
                        {" "}
                        {cropResult ? "Geo shape file" : "Attach File"}
                      </label>
                      {cropResult ? (
                        <Dropzone
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
                    {!!showMsg && <span>{showMsg}</span>}
                  </div>

                  {hasProp && (
                    <div className="col-xl-6 col-md-6">
                      <Select
                        closeMenuOnSelect={true}
                        components={animatedComponents}
                        onChange={handleSelectTitleProp}
                        defaultInputValue={title_prop}
                        options={propDropdown}
                        placeholder="Title Prop"
                      />
                    </div>
                  )}
                  {hasProp && (
                    <div className="col-xl-6 col-md-6">
                      <Select
                        closeMenuOnSelect={true}
                        components={animatedComponents}
                        onChange={handleSelectCodeProp}
                        defaultInputValue={code_prop}
                        placeholder="Code Prop"
                        options={propDropdown}
                      />
                    </div>
                  )}

                  <div className="col-sm-12">
                    <button
                      type="submit"
                      className="fieldsight-btn pull-left col-sm-6"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      className="fieldsight-btn pull-left col-sm-6"
                      onClick={toggleNewForm}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </form>
              {isLoading && <Loader loaded={loaded} />}
            </RightContentCard>

            // <ShowForm
            //   title={""}
            //   level={""}
            //   code={""}
            //   cropResult={""}
            //   tolerance={""}
            //   onSubmitHandler={onSubmitHandler}
            //   handleCancel={toggleNewForm}
            // />
          )}
        </RightContentCard>
      </Fragment>
    );
  }

  componentWillUnmount() {
    this._isMounted = false;
  }
}
