 import React,{Component} from 'react';
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


class index extends Component {
    state = {
        project: {
          teamName: "",
          contactnumber: "",
          email: "",
          address: "",
          website: "", 
          publicDescription:"",
          logo:""
         
        },
        loaded: 0,
        teamTypes: [],
        country: [],
       
        position: {
          latitude: "",
          longitude: ""
        },
        cropResult: "",
        zoom: 13,
        src: "",
        showCropper: false,
        cropResult: "",
        isLoading: false,
        selectedCountry:"",
        selectedteam:""

       
      };
     
      onChangeHandler = (e, position) => {
          console.log(position);
          
        const { name, value } = e.target;
        if (position) {
          return this.setState({
            position: {
              ...this.state.position,
              [name]: value
            }
          },()=>console.log(this.state.position));
        }
        this.setState({
            project: {
              ...this.state.project,
              [name]: value
            }
          },()=>console.log(this.state.project)
          );
    }
    onSubmitHandler=(e)=>{
        e.preventDefault()
        console.log("fghj")
        axios.post()
        .then(res=>{

        })
        .catch(errr=>{

        })

    }
    mapClickHandler = e => {
        this.setState({
          position: {
            ...this.state.position,
            latitude: e.latlng.lat,
            longitude: e.latlng.lng
          }
        });
      };
    onSelectChangeHandler(){

    }
    closeModal = () => {
        this.setState({
          showCropper: false
        });
      };
    readFile = file => {
        const reader = new FileReader();
        reader.onload = () => {
          this.setState({ 
              src: reader.result, 
              showCropper: true 
            });
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
    render(){
        const {
            onChangeHandler,
            onSubmitHandler, 
            mapClickHandler,
            readFile,
            closeModal,
            state: {
            project: {
              teamName,
              contactnumber,
              email,
              address,
              website, 
              publicDescription,
              logo
            },
            position: {
                latitude,
                longitude
              },
              cropResult,
              zoom,
              src,
              showCropper,
              isLoading,
              teamTypes,
              country,
              selectedteam,
              selectedCountry,
               }}=this;
               console.log(latitude,"latitude");
               console.log(longitude,"longitude");

               

        return (
            <RightContentCard title="New Team">
            <form className="edit-form" onSubmit={onSubmitHandler}>
              <div className="row">
                <div className="col-xl-4 col-md-6">
                  <InputElement
                    formType="editForm"
                    tag="input"
                    type="text"
                    required={true}
                    label=" Team Name"
                    name="teamName"
                    value={teamName}
                    changeHandler={onChangeHandler}
                  />
                </div>
                <div className="col-xl-4 col-md-6">
               {/* <SelectElement
                className="form-control"
                label="Type of Team"
                options={teamTypes.length>0?teamTypes.map(teamTypes => teamTypes):""}
                changeHandler={e => onSelectChangeHandler(e, "teamTypes")}
                value={selectedteam}
               />*/}
                </div>
                <div className="col-xl-4 col-md-6">
                  <InputElement
                    formType="editForm"
                    tag="input"
                    type="text"
                    required={true}
                    label="Contact Number: "
                    name="contactnumber"
                    value={contactnumber}
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
               {/* <SelectElement
                className="form-control"
                label="Country"
                options={country.length>0?subSectors.map(country => country): ""}
                changeHandler={e => onSelectChangeHandler(e, "subSect")}
                value={selectedCountry }
               />*/}
                </div>
               
               
               
                
                <div className="col-xl-4 col-md-6">
                  <div className="form-group">
                  <label className="col-form-label">Public Description</label>
                  <textarea 
                  className=" form-control" 
                  cols="40" 
                  id="id_publicDescription" 
                  name="publicDescription" 
                  value = {publicDescription}
                  onChange={onChangeHandler}
                  rows="3"
                  />
                  </div>
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
                        <Marker position={[latitude, longitude] }>
                          <Popup>
                            <b>Name: </b>
                            {teamName}
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
    
    )}
}

export default index
