import React, { Component } from 'react';
import L from 'leaflet';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import Dropzone from 'react-dropzone';
import Cropper from 'react-cropper';
import 'leaflet/dist/leaflet.css';

import Modal from './Modal';
import InputElement from './InputElement';
import SelectElement from './SelectElement';
import RightContentCard from './RightContentCard';
import CheckBox from './CheckBox';

const iconRetinaUrl = require('leaflet/dist/images/marker-icon-2x.png');
const iconUrl = require('leaflet/dist/images/marker-icon.png');
const shadowUrl = require('leaflet/dist/images/marker-shadow.png');

/* eslint-disable react/destructuring-assignment */
/* eslint-disable   camelcase */
/* eslint-disable   react/no-array-index-key */
/* eslint-disable   no-shadow */
/* eslint-disable  no-return-assign */

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
});

class EditProject extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: '',
    };
  }

  imageCroper = () => {
    const { cropImage } = this.props;
    if (typeof this.cropper.getCroppedCanvas() === 'undefined') {
      return;
    }
    this.setState(
      {
        data: this.cropper.getCroppedCanvas().toDataURL(),
      },
      () => {
        cropImage(this.state.data);
      },
    );
  };

  render() {
    const {
      onChangeHandler,
      onSubmitHandler,
      sector,
      selectedSector,
      identifier,
      name,
      phone,
      email,
      address,
      website,
      donor,
      public_desc,
      cluster_sites,
      onSelectChangeHandler,
      selectedSubSector,
      handleCheckbox,
      latitude,
      longitude,
      zoom,
      mapClickHandler,
      cropResult,
      showCropper,
      closeModal,
      src,
      errorFlag,
      // isLoading,
      subSectors,
      readFile,
      title,
    } = this.props;

    return (
      <RightContentCard title={title}>
        <form className="edit-form" onSubmit={onSubmitHandler}>
          <div className="row">
            <div className="col-xl-4 col-md-6">
              <InputElement
                formType="editForm"
                tag="input"
                type="text"
                // required
                label="identifier"
                name="identifier"
                value={identifier}
                changeHandler={onChangeHandler}
              />
              {errorFlag && (
                <span style={{ color: 'red' }}>
                  Identifier cannot be less than 5 characters.
                </span>
              )}
            </div>

            <div className="col-xl-4 col-md-6">
              <InputElement
                formType="editForm"
                tag="input"
                type="text"
                required
                label="name"
                name="name"
                value={name}
                changeHandler={onChangeHandler}
              />
            </div>
            <div className="col-xl-4 col-md-6">
              <SelectElement
                className="form-control"
                label="sector"
                options={
                  sector.length > 0
                    ? sector.map(sect => sect)
                    : sector
                }
                changeHandler={onSelectChangeHandler}
                value={selectedSector && selectedSector}
              />
            </div>
            <div className="col-xl-4 col-md-6">
              <SelectElement
                className="form-control"
                label="subSector"
                options={
                  subSectors.length > 0
                    ? subSectors.map(subSect => subSect)
                    : subSectors
                }
                changeHandler={e => {
                  onSelectChangeHandler(e, 'subSect');
                }}
                value={selectedSubSector && selectedSubSector}
              />
            </div>
            <div className="col-xl-4 col-md-6">
              <InputElement
                formType="editForm"
                tag="input"
                type="text"
                required={false}
                label="phone"
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
                required={false}
                label="email"
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
                required={false}
                label="address"
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
                  label="donor"
                  name="donor"
                  value={donor}
                  changeHandler={onChangeHandler}
                />
              </div>
            </div>
            <div className="col-xl-4 col-md-6">
              <div className="form-group">
                <CheckBox
                  checked={cluster_sites || ''}
                  label="enable/disable"
                  changeHandler={handleCheckbox}
                />
              </div>
            </div>
            <div className="col-xl-4 col-md-6">
              <InputElement
                formType="editForm"
                tag="input"
                type="text"
                required
                label="description"
                name="public_desc"
                value={public_desc}
                changeHandler={onChangeHandler}
              />
            </div>
            <div className="col-xl-4 col-md-6">
              <div className="form-group">
                <label>
                  Map
                  <sup>*</sup>
                </label>

                <div className="map-form">
                  <Map
                    style={{ height: '205px', marginTop: '1rem' }}
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
                        required
                        label="latitude"
                        name="latitude"
                        value={latitude}
                        changeHandler={e => {
                          onChangeHandler(e, 'latitude');
                        }}
                      />
                    </div>

                    <div className="lat-group">
                      <InputElement
                        formType="editForm"
                        tag="input"
                        type="number"
                        required
                        label="longitude"
                        name="longitude"
                        value={longitude}
                        changeHandler={e => {
                          onChangeHandler(e, 'longitude');
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-4 col-md-6">
              <div className="form-group">
                <label>
                  {' '}
                  {cropResult ? 'Preview' : 'Attach File'}
                </label>
                {cropResult ? (
                  <Dropzone
                    onDrop={acceptedFile => readFile(acceptedFile)}
                  >
                    {({ getRootProps, getInputProps }) => {
                      return (
                        <section>
                          <div className="upload-form">
                            <img src={cropResult} alt="" />
                          </div>
                          <div {...getRootProps()}>
                            <input
                              {...getInputProps()}
                              multiple={false}
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

            <div className="col-sm-12">
              <button
                type="submit"
                className="fieldsight-btn pull-right"
              >
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
                      ref={cropper => (this.cropper = cropper)}
                    />
                    <button
                      className="fieldsight-btn"
                      style={{ marginTop: '15px' }}
                      onClick={this.imageCroper}
                      type="button"
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
                        width: '100%',
                        height: 400,
                        overflow: 'hidden',
                      }}
                    />
                  </figure>
                </div>
              </div>
            </div>
          </Modal>
        )}
        {/* {isLoading && <Loader loaded={loaded} />} */}
      </RightContentCard>
    );
  }
}

export default EditProject;
