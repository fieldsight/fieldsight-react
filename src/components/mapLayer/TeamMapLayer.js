import React, { Component, Fragment } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import axios from 'axios';
import Dropzone from 'react-dropzone';
import Loader, { DotLoader } from '../common/Loader';
import RightContentCard from '../common/RightContentCard';
import { errorToast, successToast } from '../../utils/toastHandler';
import InputElement from '../common/InputElement';

/* eslint-disable react/prop-types */
/* eslint-disable camelcase */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-unneeded-ternary */

const animatedComponents = makeAnimated();

const url = 'fv3/api/team-geolayer/';

export default class TeamMapLayer extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      geoLayer: {
        code_prop: '',
        title: '',
        title_prop: '',
        level: '',
        organization: props.match.params ? props.match.params.id : '',
        tolerance: '',
        geo_shape_file: {},
      },
      initialData: [],
      dropdownData: [],
      isLoading: false,
      dotLoader: true,
      teamId: props.match.params ? props.match.params.id : '',
      addMap: true,
      selectedMapId: '',
      cropResult: '',
      hasProp: false,
      propDropdown: [],
      fileName: '',
      loaded: '',
      showMsg: '',
    };
  }

  componentDidMount() {
    this._isMounted = true;
    this.requestLayerData();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  requestLayerData = () => {
    const { teamId } = this.state;
    axios
      .get(`${url}?team=${teamId}`)
      .then(dropdownData => {
        if (this._isMounted) {
          const modifiedDropdownData = dropdownData.data.map(
            item => ({
              ...item,
              value: item.id,
              label: item.title,
            }),
          );
          this.setState({
            dropdownData: modifiedDropdownData,
            dotLoader: false,
          });
        }
      })
      .catch(err => {
        if (this._isMounted) {
          this.setState({
            dotLoader: false,
          });
        }

        console.log(err);
      });
  };

  handleSelectCodeProp = option => {
    this.setState(prevState => {
      return {
        geoLayer: {
          ...prevState.geoLayer,
          code_prop: option.value,
        },
      };
    });
  };

  handleSelectTitleProp = option => {
    this.setState(prevState => {
      return {
        geoLayer: {
          ...prevState.geoLayer,
          title_prop: option.value,
        },
      };
    });
  };

  handleSelectMap = option => {
    const fileName = option.geo_shape_file.split('/');
    const propArr = [];
    this.setState(
      prevState => {
        if (option.properties.length > 0) {
          option.properties.map(each => {
            if (each !== 'id') {
              if (each !== 'Centroid_X') {
                if (each !== 'Centroid_Y') {
                  const name = each.replace('_', ' ').toUpperCase();
                  propArr.push({ value: each, label: name });
                }
              }
            }
          });
        }
        return {
          selectedMapId: option.id,
          geoLayer: {
            ...prevState.geoLayer,
            code_prop: option.code_prop,
            title: option.title,
            title_prop: option.title_prop,
            level: option.level,
            organization: option.organization,
            tolerance: option.tolerance,
            // geo_shape_file: option.geo_shape_file
          },
          cropResult: option.geo_shape_file,
          addMap: !prevState.addMap,
          propDropdown: propArr,
          hasProp: option.properties.length > 0 ? true : false,
          fileName:
            fileName.length > 0 && fileName[fileName.length - 1],
        };
      },
      () => {
        // this.readJsonFile(option.geo_shape_file);
      },
    );
  };

  requestHandler = () => {
    const {
      geoLayer: {
        code_prop,
        title,
        title_prop,
        level,
        organization,
        tolerance,
        geo_shape_file,
      },
      cropResult,
      selectedMapId,
    } = this.state;

    const formData = new FormData();
    formData.append('organization', organization);
    formData.append('level', level);
    formData.append('title', title);
    formData.append('title_prop', title_prop);
    formData.append('code_prop', code_prop);
    formData.append('tolerance', tolerance);
    if (Object.keys(geo_shape_file).length > 0)
      formData.append('geo_shape_file', cropResult);

    if (selectedMapId) {
      axios
        .put(`${url}${selectedMapId}/`, formData, {
          onUploadProgress: progressEvent => {
            this.setState({
              loaded: Math.round(
                (progressEvent.loaded * 100) / progressEvent.total,
              ),
            });
          },
        })
        .then(res => {
          this.setState(
            prevState => ({
              isLoading: false,
              addMap: !prevState.addMap,
            }),
            () => {
              successToast('Map Layer', 'updated');
              this.requestLayerData();
            },
          );
        })
        .catch(err => {
          this.setState(
            {
              isLoading: false,
            },
            errorToast(),
          );
        });
    } else {
      axios
        .post(`${url}`, formData, {
          onUploadProgress: progressEvent => {
            this.setState({
              loaded: Math.round(
                (progressEvent.loaded * 100) / progressEvent.total,
              ),
            });
          },
        })
        .then(res => {
          this.setState(
            prevState => ({
              isLoading: false,
              addMap: !prevState.addMap,
            }),
            () => {
              successToast('Map Layer', 'added');
              this.requestLayerData();
            },
          );
        })
        .catch(err => {
          this.setState(
            {
              isLoading: false,
            },
            errorToast(),
          );
        });
    }
  };

  onSubmitHandler = e => {
    e.preventDefault();
    this.setState(
      {
        isLoading: true,
      },
      this.requestHandler,
    );
  };

  toggleNewForm = () => {
    const { state, props } = this;
    this.setState(prevState => ({
      addMap: !prevState.addMap,
      geoLayer: {
        code_prop: '',
        title: '',
        title_prop: '',
        level: '',
        organization: props.match.params ? props.match.params.id : '',
        tolerance: '',
      },
      selectedMapId: '',
      cropResult: '',
      hasProp: false,
    }));
  };

  onChangeHandler = e => {
    const { name, value } = e.target;

    this.setState(prevState => ({
      geoLayer: {
        ...prevState.geoLayer,
        [name]: value,
      },
    }));
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
        if (each !== 'id') {
          if (each !== 'Centroid_X') {
            if (each !== 'Centroid_Y') {
              const name = each.replace('_', ' ').toUpperCase();
              newArr.push({ value: each, label: name });
            }
          }
        }
      });
      this.setState({
        cropResult: file,
        hasProp: true,
        propDropdown: newArr,
      });
    };
    reader.readAsText(file);
  };

  readFile = file => {
    const fileType = [
      'application/json',
      // "application/javascript",
      'application/geo+json',
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
          if (each !== 'id') {
            if (each !== 'Centroid_X') {
              if (each !== 'Centroid_Y') {
                const name = each.replace('_', ' ').toUpperCase();
                newArr.push({ value: each, label: name });
              }
            }
          }
        });
        this.setState(prevState => ({
          cropResult: file[0],
          fileName: file[0].name,
          hasProp: true,
          propDropdown: newArr,
          showMsg: '',
          geoLayer: {
            ...prevState.geoLayer,
            geo_shape_file: file[0],
          },
        }));
      };
      reader.readAsText(file[0]);
    } else {
      this.setState({ showMsg: 'Select a JSON file' });
    }
  };

  cropImage = () => {
    if (typeof this.cropper.getCroppedCanvas() === 'undefined') {
      return;
    }
    this.setState({
      cropResult: this.cropper.getCroppedCanvas().toDataURL(),
    });
  };

  // closeModal = () => {
  //   this.setState({
  //     showCropper: false,
  //   });
  // };

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
        showMsg,
      },
      onSubmitHandler,
      toggleNewForm,
      handleSelectMap,
      onChangeHandler,
      handleSelectCodeProp,
      handleSelectTitleProp,
      readFile,
      // closeModal,
    } = this;

    return (
      <>
        <RightContentCard
          title="Map Layer"
          addButton={addMap}
          toggleModal={toggleNewForm}
        >
          {dotLoader && <DotLoader />}
          {!dotLoader && !!addMap && (
            <Select
              closeMenuOnSelect
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
                      required
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
                        {cropResult
                          ? 'Geo shape file'
                          : 'Attach File'}
                      </label>
                      {cropResult ? (
                        <Dropzone
                          onDrop={acceptedFile => {
                            readFile(acceptedFile);
                          }}
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
                          onDrop={acceptedFile => {
                            readFile(acceptedFile);
                          }}
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
                    {!!showMsg && <span>{showMsg}</span>}
                  </div>

                  {hasProp && (
                    <div className="col-xl-6 col-md-6">
                      <Select
                        closeMenuOnSelect
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
                        closeMenuOnSelect
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
      </>
    );
  }
}
