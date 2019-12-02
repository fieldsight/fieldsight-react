import React, { Component } from "react";
import L from "leaflet";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import axios from "axios";
import Dropzone from "react-dropzone";
import Cropper from "react-cropper";
import Modal from "../common/Modal";
import InputElement from "../common/InputElement";
import SelectElement from "../common/SelectElement";
import RightContentCard from "../common/RightContentCard";
import CheckBox from "../common/CheckBox";
import Loader from "../common/Loader";
import { errorToast, successToast } from "../../utils/toastHandler";
import { RegionContext } from "../../context";
import "leaflet/dist/leaflet.css";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png")
});

const urls = ["fv3/api/update-project/", "fv3/api/sectors-subsectors/"];

class EditProject extends Component {
  _isMounted = false;

  static contextType = RegionContext;

  state = {
    project: {
      name: "",
      phone: "",
      email: "",
      address: "",
      website: "",
      donor: "",
      public_desc: "",
      cluster_sites: false
    },
    loaded: 0,
    sector: [],
    subSectors: [],
    selectedSector: "",
    selectedSubSector: "",
    position: {
      latitude: "",
      longitude: ""
    },
    zoom: 13,
    src: "",
    showCropper: false,
    cropResult: "",
    isLoading: false
  };

  requestHandler = () => {
    const {
      state: {
        project: {
          name,
          phone,
          email,
          address,
          website,
          public_desc,
          cluster_sites,
          donor,
          logo,
          organization
        },
        position: { latitude, longitude },
        selectedSector,
        selectedSubSector,
        cropResult
      },
      context: { projectId }
    } = this;

    const project = {
      name,
      phone,
      email,
      address,
      website,
      donor,
      public_desc,
      cluster_sites,
      ...(cropResult && { logo: cropResult }),
      latitude,
      longitude,
      sector: selectedSector,
      sub_sector: selectedSubSector,
      organization
    };

    axios
      .put(`${urls[0]}${projectId}/`, project, {
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
            loaded: 0
          },
          () => successToast("Project", "updated")
        );
      })
      .catch(err => {
        this.setState(
          {
            isLoading: false
          },
          errorToast
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
 

  onSelectChangeHandler = (e, subSect) => {
    const { value } = e.target;
    if (subSect) {
      const selectedSubSectorId = this.state.subSectors.find(
        subSect => subSect.id === +value
      ).id;
      return this.setState({
        selectedSubSector: selectedSubSectorId
      });
    }
    const selectedSector = this.state.sector.find(sect => sect.id === +value);
    this.setState({
      subSectors: selectedSector.subSectors,
      selectedSector: selectedSector.id
    });
  };

  handleCheckboxChange = e =>
    this.setState({
      project: {
        ...this.state.project,
        cluster_sites: e.target.checked
      }
    });

  onChangeHandler = (e, position) => {
  
    const { name, value } = e.target;
    if (position) {
      return this.setState({
        position: {
          ...this.state.position,
          [name]: value
        }
      });
    }

    this.setState({
      project: {
        ...this.state.project,
        [name]: value
      }
    });
  };

  componentDidMount() {
    this._isMounted = true;
    const { projectId } = this.context;
    axios
      .all(
        urls.map((url, i) => {
          return i === 0 ? axios.get(`${url}${projectId}/`) : axios.get(url);
        })
      )
      .then(
        axios.spread((project, sector) => { 
          if (this._isMounted) {
            if (project && sector) {
              const position =
                project.data.location && project.data.location.split(" ");
              const longitude = position && position[1].split("(")[1];
              const latitude = position && position[2].split(")")[0];
              const newSubSectors = project.data.sub_sector
                ? sector.data.find(sect => sect.id === +project.data.sector)
                    .subSectors
                : [];

              const newSelectedSector = project.data.sector
                ? project.data.sector
                : "";

              const newSelectedSubSector = project.data.sub_sector
                ? project.data.sub_sector
                : "";

              const newPosition =
                position && position.length > 0
                  ? { latitude, longitude }
                  : { latitude: "", longitude: "" };

              const newCropResult = project.data.logo ? project.data.logo : "";

              this.setState({
                project: project.data,
                sector: sector.data,
                subSectors: newSubSectors,
                selectedSector: newSelectedSector,
                selectedSubSector: newSelectedSubSector,
                cropResult: newCropResult,
                position: newPosition
              });
            }
          }
        })
      )
      .catch(err => console.log("err", err));
  }

  readFile = file => {
    const reader = new FileReader();
    reader.onload = () => {
      this.setState({ src: reader.result, showCropper: true });
    };
    reader.readAsDataURL(file[0]);
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

  mapClickHandler = e => {
    this.setState({
      position: {
        ...this.state.position,
        latitude: e.latlng.lat,
        longitude: e.latlng.lng
      }
    });
  };

  render() {
  
    const {
      state: {
        loaded,
        project: {
          name,
          phone,
          email,
          address,
          website,
          donor,
          public_desc,
          cluster_sites
        },
        sector,
        subSectors,
        position: { latitude, longitude },
        showCropper,
        cropResult,
        isLoading,
        selectedSector,
        selectedSubSector
      },
      onChangeHandler,
      onSelectChangeHandler,
      onSubmitHandler,
      handleCheckboxChange,
      readFile,
      closeModal,
      mapClickHandler
    } = this;

    return (
      <RightContentCard title="Edit Project">
        <form className="edit-form" onSubmit={onSubmitHandler}>
          <div className="row">
            <div className="col-xl-4 col-md-6">
              <InputElement
                formType="editForm"
                tag="input"
                type="text"
                required={true}
                label="Name"
                name="name"
                value={name}
                changeHandler={onChangeHandler}
              />
            </div>
            <div className="col-xl-4 col-md-6">
              <SelectElement
                className="form-control"
                label="Sector"
                options={sector.map(sect => sect)}
                changeHandler={onSelectChangeHandler}
                value={selectedSector && selectedSector}
              />
            </div>
            <div className="col-xl-4 col-md-6">
              <SelectElement
                className="form-control"
                label="Sub Sector"
                options={subSectors.map(subSect => subSect)}
                changeHandler={e => onSelectChangeHandler(e, "subSect")}
                value={selectedSubSector && selectedSubSector}
              />
            </div>
            <div className="col-xl-4 col-md-6">
              <InputElement
                formType="editForm"
                tag="input"
                type="text"
                required={true}
                label="Phone"
                name="phone"
                value={phone}
                changeHandler={onChangeHandler}
              />
            </div>
            <div className="col-xl-4 col-md-6">
              <InputElement
                formType="editForm"
                tag="input"
                type="email"
                required={true}
                label="Email"
                name="email"
                value={email}
                changeHandler={onChangeHandler}
              />
            </div>
            <div className="col-xl-4 col-md-6">
              <InputElement
                formType="editForm"
                tag="input"
                type="text"
                required={true}
                label="Address"
                name="address"
                value={address}
                changeHandler={onChangeHandler}
              />
            </div>
            <div className="col-xl-4 col-md-6">
              <div className="form-group">
                <InputElement
                  formType="editForm"
                  tag="input"
                  type="url"
                  label="website"
                  name="website"
                  value={website}
                  changeHandler={onChangeHandler}
                />
              </div>
            </div>
            <div className="col-xl-4 col-md-6">
              <div className="form-group">
                <InputElement
                  formType="editForm"
                  tag="input"
                  type="text"
                  label="Donor"
                  name="donor"
                  value={donor}
                  changeHandler={onChangeHandler}
                />
              </div>
            </div>
            <div className="col-xl-4 col-md-6">
              <div className="form-group">
                <CheckBox
                  checked={cluster_sites || ""}
                  label="Enable/Disable Clustering into Regions"
                  onChange={this.handleCheckboxChange}
                />
              </div>
            </div>
            <div className="col-xl-4 col-md-6">
              <InputElement
                formType="editForm"
                tag="input"
                type="text"
                required={true}
                label="Description"
                name="public_desc"
                value={public_desc}
                changeHandler={onChangeHandler}
              />
            </div>
            <div className="col-xl-4 col-md-6">
              <div className="form-group">
                <label>
                  Map <sup>*</sup>
                </label>

                <div className="map-form">
                  <Map
                    style={{ height: "205px", marginTop: "1rem" }}
                    center={[latitude, longitude]}
                    zoom={this.state.zoom}
                    onClick={mapClickHandler}
                  >
                    <TileLayer
                      attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={[latitude, longitude]}>
                      <Popup>
                        <b>Name: </b>
                        {name}
                      </Popup>
                    </Marker>
                  </Map>
                  <div className="latitude-form">
                    <div className="lat-group">
                      <InputElement
                        formType="editForm"
                        tag="input"
                        type="number"
                        required={true}
                        label="Latitude"
                        name="latitude"
                        value={latitude}
                        changeHandler={e => onChangeHandler(e, "latitude")}
                      />
                    </div>

                    <div className="lat-group">
                      <InputElement
                        formType="editForm"
                        tag="input"
                        type="number"
                        required={true}
                        label="Longitude"
                        name="longitude"
                        value={longitude}
                        changeHandler={e => onChangeHandler(e, "longitude")}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-4 col-md-6">
              <div className="form-group">
                <label> {cropResult ? "Preview" : "Attach File"}</label>
               
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
                                  <input
                                    {...getInputProps()}
                                    multiple={false}
                                  />
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

            <div className="col-sm-12">
              <button type="submit" className="fieldsight-btn pull-right">
                Save
              </button>
            </div>
          </div>
        </form>
        {showCropper && (
          <Modal title="Preview" toggleModal={closeModal}>
            <div className="row">
              <div className="col-md-6">
                <div className="card-body" style={{ padding: 0 }}>
                  <figure>
                    <Cropper
                      style={{ height: 400, width: 300 }}
                      aspectRatio={1 / 1}
                      preview=".img-preview"
                      guides={false}
                      src={this.state.src}
                      ref={cropper => {
                        this.cropper = cropper;
                      }}
                    />
                    <button
                      className="fieldsight-btn"
                      style={{ marginTop: "15px" }}
                      onClick={this.cropImage}
                    >
                      Save Image
                    </button>
                  </figure>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card-body" style={{ padding: 0 }}>
                  <figure>
                    <div
                      className="img-preview"
                      style={{
                        width: "100%",
                        height: 400,
                        overflow: "hidden"
                      }}
                    />
                  </figure>
                </div>
              </div>
            </div>
          </Modal>
        )}
        {isLoading && <Loader loaded={loaded} />}
      </RightContentCard>
    );
  }

  componentWillUnmount() {
    this._isMounted = false;
  }
}

export default EditProject;
