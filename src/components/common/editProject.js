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



class  EditProject extends Component {
  state={
    data:""
  }
  
  imageCroper=()=>{
    if (typeof this.cropper.getCroppedCanvas() === "undefined") {
      return;
    }
    this.setState({
      data: this.cropper.getCroppedCanvas().toDataURL(),
       }, () =>{

         this.props.cropImage(this.state.data)
       });

  }
  
  render(){
    const {
      onChangeHandler,
      onSubmitHandler,
      sector,
      selectedSector,
      name,
      phone,
      email,
      address,
      website,
      donor,
      public_desc,
      cluster_sites ,
      onSelectChangeHandler,
      selectedSubSector,
      handleCheckbox,
      latitude,
      longitude,
      zoom,
      mapClickHandler,
      cropResult,
      showCropper ,
      closeModal ,
      src,
      cropImage,
      isLoading,
      subSectors,readFile} =this.props;
     console.log(donor);
     
      
      
  
  
    return (
        <RightContentCard title={this.props.title}>

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
                options={sector.length>0?sector.map(sect => sect): sector}
                changeHandler={onSelectChangeHandler}
                value={selectedSector && selectedSector}
              />
            </div>
            <div className="col-xl-4 col-md-6">
              <SelectElement
                className="form-control"
                label="Sub Sector"
                options={subSectors.length>0?subSectors.map(subSect => subSect): subSectors}
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
                  onChange={handleCheckbox}
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
                    zoom={zoom}
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
                              src={cropResult}
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
                      src={src}
                      ref={cropper => 
                        this.cropper = cropper
                      }
                    />
                    <button
                      className="fieldsight-btn"
                      style={{ marginTop: "15px" }}
                      onClick={this.imageCroper}
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
 
    )}
}


  
  
  
   

    
export default EditProject;
