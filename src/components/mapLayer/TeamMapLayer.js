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
import Modal from "../common/Modal";
import InputElement from "../common/InputElement";
import SelectElement from "../common/SelectElement";
import CheckBox from "../common/CheckBox";

const animatedComponents = makeAnimated();

const urls = ["fv3/api/geolayer/", "fv3/api/organization-geolayer/"];

const ShowForm = props => {
  const {
    title,
    level,
    code,
    cropResult,
    tolerance,
    onSubmitHandler,
    handleCancel
  } = props;
  return (
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
              // changeHandler={onChangeHandler}
            />
          </div>
          <div className="col-xl-4 col-md-6">
            <InputElement
              formType="editForm"
              tag="input"
              type="text"
              // required={true}
              label="Level"
              name="level"
              value={level}
              // changeHandler={onChangeHandler}
            />
          </div>
          <div className="col-xl-4 col-md-6">
            <InputElement
              formType="editForm"
              tag="input"
              type="text"
              // required={true}
              label="Title Prop"
              name="title"
              value={title}
              // changeHandler={onChangeHandler}
            />
          </div>
          <div className="col-xl-4 col-md-6">
            <InputElement
              formType="editForm"
              tag="input"
              type="text"
              // required={true}
              label="Code prop"
              name="code"
              value={code}
              // changeHandler={onChangeHandler}
            />
          </div>

          <div className="col-xl-8 col-md-6">
            <div className="form-group">
              <label> {cropResult ? "Geo shape file" : "Attach File"}</label>
              {cropResult ? (
                <Dropzone onDrop={acceptedFile => readFile(acceptedFile)}>
                  {({ getRootProps, getInputProps }) => {
                    return (
                      <section>
                        <div className="upload-form">
                          <img
                            src={this.state.cropResult}
                            alt="Cropped Image"
                          />
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

          <div className="col-xl-4 col-md-6">
            <InputElement
              formType="editForm"
              tag="input"
              type="text"
              // required={true}
              label="Tolerance"
              name="tolerance"
              value={tolerance}
              // changeHandler={onChangeHandler}
            />
          </div>

          <div className="col-sm-12">
            <button type="submit" className="fieldsight-btn pull-left col-sm-6">
              Save
            </button>
            <button
              type="button"
              className="fieldsight-btn pull-left col-sm-6"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </RightContentCard>
  );
};
export default class TeamMapLayer extends Component {
  _isMounted = false;
  state = {
    geoLayer: [],
    initialData: [],
    dropdownData: [],
    multiValue: [],
    isLoading: false,
    dotLoader: true,
    teamId: this.props.match.params ? this.props.match.params.id : "",
    addMap: true
  };

  componentDidMount() {
    this._isMounted = true;
    const { teamId } = this.state;
    axios
      .all(urls.map(url => axios.get(`${url}?project=${teamId}`)))
      .then(
        axios.spread((initialData, dropdownData) => {
          if (this._isMounted) {
            const modifiedInitialData = initialData.data.map(item => ({
              ...item,
              value: item.id,
              label: item.title
            }));

            const modifiedDropdownData = dropdownData.data.map(item => ({
              ...item,
              value: item.id,
              label: item.title
            }));
            this.setState({
              initialData: modifiedInitialData,
              dropdownData: modifiedDropdownData,
              dotLoader: false
            });
          }
        })
      )
      .catch(err => {
        this._isMounted &&
          this.setState({
            dotLoader: false
          });
      });
  }

  handleMultiChange = option => {
    this.setState(state => {
      return {
        multiValue: option
      };
    });
  };

  requestHandler = () => {
    const { teamId } = this.state;
    const idArray = this.state.multiValue.map(item => item.id);
    axios
      .post(`${urls[0]}?project=${teamId}`, {
        project: teamId,
        geo_layers: idArray
      })
      .then(res => {
        this.setState(
          {
            isLoading: false
          },
          () => successToast("Map Layer", "added")
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
      addMap: !this.state.addMap
    });
  };

  render() {
    const {
      state: { initialData, dropdownData, isLoading, dotLoader, addMap },
      onSubmitHandler,
      handleMultiChange,
      toggleNewForm,
      showForm
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
            <form onSubmit={onSubmitHandler}>
              <Select
                closeMenuOnSelect={false}
                components={animatedComponents}
                onChange={handleMultiChange}
                defaultValue={initialData}
                isMulti
                options={dropdownData}
              />

              <div className="col-sm-12">
                <button
                  type="submit"
                  className="fieldsight-btn pull-right"
                  style={{ marginTop: "15px" }}
                >
                  Save
                </button>
              </div>
            </form>
          )}
          {!dotLoader && !addMap && (
            <ShowForm
              title={""}
              level={""}
              code={""}
              cropResult={""}
              tolerance={""}
              onSubmitHandler={onSubmitHandler}
              handleCancel={toggleNewForm}
            />
          )}
        </RightContentCard>
        {isLoading && <Loader />}
      </Fragment>
    );
  }

  componentWillUnmount() {
    this._isMounted = false;
  }
}
