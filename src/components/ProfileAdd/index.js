import React, { Component } from 'react';
import axios from 'axios';
import Dropzone from 'react-dropzone';
import Cropper from 'react-cropper';
import InputElement from '../common/InputElement';
import RightContentCard from '../common/RightContentCard';
import SelectElement from '../common/SelectElement';
import RadioElement from '../common/RadioElement';
import Modal from '../common/Modal';

/* eslint-disable camelcase */

class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: '',
      last_name: '',
      address: '',
      phone: '',
      skype: '',
      primary_number: '',
      secondary_number: '',
      office_number: '',
      viber: '',
      whatsapp: '',
      wechat: '',
      line: '',
      tango: '',
      hike: '',
      qq: '',
      google_talk: '',
      twitter: '',
      profile_picture: '',
      timezone: [{ id: '', name: '----' }],
      selectTimeZone: '',
      selectedGender: 'Male',
      showCropper: false,
      cropResult: '',
      src: '',
      show: false,
    };
  }

  componentDidMount() {
    axios.get(`/fv3/api/timezones/`).then(res => {
      if (res.data) {
        this.setState(state => {
          const timezoneArr = state.timezone;
          res.data.map(zoneArr => timezoneArr.push(zoneArr));
          return { timezone: timezoneArr };
        });
      }
    });
  }

  onChangeHandler = e => {
    const { value, name } = e.target;
    this.setState(state => ({
      ...state,
      [name]: value,
    }));
  };

  onSubmitHandler = e => {
    e.preventDefault();
    const {
      match: {
        params: { id },
      },
    } = this.props;
    const {
      first_name,
      last_name,
      address,
      phone,
      skype,
      primary_number,
      secondary_number,
      office_number,
      viber,
      whatsapp,
      wechat,
      line,
      tango,
      hike,
      qq,
      google_talk,
      twitter,
      selectTimeZone,
      selectedGender,
      cropResult,
    } = this.state;

    const createProfile = {};
    createProfile.first_name = first_name;
    createProfile.last_name = last_name;
    createProfile.address = address;
    createProfile.phone = phone;
    createProfile.skype = skype;
    createProfile.primary_number = primary_number;
    createProfile.secondary_number = secondary_number;
    createProfile.office_number = office_number;
    createProfile.viber = viber;
    createProfile.whatsapp = whatsapp;
    createProfile.wechat = wechat;
    createProfile.line = line;
    createProfile.tango = tango;
    createProfile.hike = hike;
    createProfile.qq = qq;
    createProfile.google_talk = google_talk;
    createProfile.twitter = twitter;
    createProfile.selectTimeZone = selectTimeZone;
    createProfile.gender = selectedGender;
    createProfile.profile_picture = cropResult;

    axios
      .post(`/fv3/api/create-profile/${id}/`, createProfile)
      .then(req => {
        if (req.status === 201) {
          this.setState({
            first_name: '',
            last_name: '',
            address: '',
            phone: '',
            skype: '',
            primary_number: '',
            secondary_number: '',
            office_number: '',
            viber: '',
            whatsapp: '',
            wechat: '',
            line: '',
            tango: '',
            hike: '',
            qq: '',
            google_talk: '',
            twitter: '',
            profile_picture: '',
            timezone: [{ id: '', name: '----' }],
            selectTimeZone: '',
            selectedGender: 'Male',
            showCropper: false,
            cropResult: '',
            src: '',
            show: false,
          });
          // this.props.history.push(``);
        }
      })
      .catch();
  };

  onSelectChangeHandler = e => {
    const { value } = e.target;

    this.setState({
      selectTimeZone: value,
    });
  };

  handleGender = e => {
    const { value } = e.target;

    if (value === 'Male') {
      this.setState({
        selectedGender: value,
      });
    }
    if (value === 'Female') {
      this.setState({
        selectedGender: value,
      });
    }
  };

  readFile = file => {
    const reader = new FileReader();
    reader.onload = () => {
      this.setState({
        src: reader.result,
        showCropper: true,
        show: true,
      });
    };
    reader.readAsDataURL(file[0]);
  };

  cropImage = () => {
    if (typeof this.cropper.getCroppedCanvas() === 'undefined') {
      return;
    }
    this.setState({
      cropResult: this.cropper.getCroppedCanvas().toDataURL(),
      showCropper: false,
      src: '',
    });
  };

  closeModal = () => {
    this.setState({
      showCropper: false,
    });
  };

  render() {
    const {
      state: {
        first_name,
        last_name,
        address,
        phone,
        skype,
        primary_number,
        secondary_number,
        office_number,
        viber,
        whatsapp,
        wechat,
        line,
        tango,
        hike,
        qq,
        google_talk,
        twitter,
        timezone,
        selectTimeZone,
        selectedGender,
        cropResult,
        showCropper,
        src,
      },
      onChangeHandler,
      onSubmitHandler,
      handleGender,
    } = this;
    return (
      <>
        <RightContentCard title="Create Profile">
          <form
            className="edit-form"
            onSubmit={e => onSubmitHandler(e)}
          >
            <div className="col-sm-12">
              <div className="row">
                <div className="col-xl-4 col-md-6">
                  <InputElement
                    formType="editForm"
                    tag="input"
                    type="text"
                    required
                    label="first Name"
                    name="first_name"
                    value={first_name}
                    changeHandler={onChangeHandler}
                  />
                </div>
                <div className="col-xl-4 col-md-6">
                  <InputElement
                    formType="editForm"
                    tag="input"
                    type="text"
                    required
                    label="Last Name"
                    name="last_name"
                    value={last_name}
                    changeHandler={onChangeHandler}
                  />
                </div>
                <div className="col-xl-4 col-md-6">
                  <RadioElement
                    name="Gender"
                    checked={selectedGender === 'Male'}
                    changeHandler={handleGender}
                    label="Male"
                    value="Male"
                  />
                  <RadioElement
                    name="Gender"
                    checked={selectedGender === 'Female'}
                    changeHandler={handleGender}
                    label="Female"
                    value="Female"
                  />
                </div>
                <div className="col-xl-4 col-md-6">
                  <InputElement
                    formType="editForm"
                    tag="input"
                    type="text"
                    label="address"
                    name="address"
                    value={address}
                    changeHandler={onChangeHandler}
                  />
                </div>
                <div className="col-xl-4 col-md-6">
                  <InputElement
                    formType="editForm"
                    tag="input"
                    type="text"
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
                    type="text"
                    label="skype"
                    name="skype"
                    value={skype}
                    changeHandler={onChangeHandler}
                  />
                </div>
                <div className="col-xl-4 col-md-6">
                  <InputElement
                    formType="editForm"
                    tag="input"
                    type="text"
                    label="primary number"
                    name="primary_number"
                    value={primary_number}
                    changeHandler={onChangeHandler}
                  />
                </div>
                <div className="col-xl-4 col-md-6">
                  <InputElement
                    formType="editForm"
                    tag="input"
                    type="text"
                    label="secondary number"
                    name="secondary_number"
                    value={secondary_number}
                    changeHandler={onChangeHandler}
                  />
                </div>
                <div className="col-xl-4 col-md-6">
                  <InputElement
                    formType="editForm"
                    tag="input"
                    type="text"
                    label="office number"
                    name="office_number"
                    value={office_number}
                    changeHandler={onChangeHandler}
                  />
                </div>
                <div className="col-xl-4 col-md-6">
                  <InputElement
                    formType="editForm"
                    tag="input"
                    type="text"
                    label="google talk"
                    name="google_talk"
                    value={google_talk}
                    changeHandler={onChangeHandler}
                  />
                </div>
                <div className="col-xl-4 col-md-6">
                  <InputElement
                    formType="editForm"
                    tag="input"
                    type="text"
                    label="viber"
                    name="viber"
                    value={viber}
                    changeHandler={onChangeHandler}
                  />
                </div>
                <div className="col-xl-4 col-md-6">
                  <InputElement
                    formType="editForm"
                    tag="input"
                    type="text"
                    label="whatsapp"
                    name="whatsapp"
                    value={whatsapp}
                    changeHandler={onChangeHandler}
                  />
                </div>
                <div className="col-xl-4 col-md-6">
                  <InputElement
                    formType="editForm"
                    tag="input"
                    type="text"
                    label="wechat"
                    name="wechat"
                    value={wechat}
                    changeHandler={onChangeHandler}
                  />
                </div>
                <div className="col-xl-4 col-md-6">
                  <InputElement
                    formType="editForm"
                    tag="input"
                    type="text"
                    label="qq"
                    name="qq"
                    value={qq}
                    changeHandler={onChangeHandler}
                  />
                </div>
                <div className="col-xl-4 col-md-6">
                  <InputElement
                    formType="editForm"
                    tag="input"
                    type="text"
                    label="line"
                    name="line"
                    value={line}
                    changeHandler={onChangeHandler}
                  />
                </div>
                <div className="col-xl-4 col-md-6">
                  <InputElement
                    formType="editForm"
                    tag="input"
                    type="text"
                    label="hike"
                    name="hike"
                    value={hike}
                    changeHandler={onChangeHandler}
                  />
                </div>
                <div className="col-xl-4 col-md-6">
                  <InputElement
                    formType="editForm"
                    tag="input"
                    type="text"
                    label="tango"
                    name="tango"
                    value={tango}
                    changeHandler={onChangeHandler}
                  />
                </div>
                <div className="col-xl-4 col-md-6">
                  <InputElement
                    formType="editForm"
                    tag="input"
                    type="text"
                    label="twitter"
                    name="twitter"
                    value={twitter}
                    changeHandler={onChangeHandler}
                  />
                </div>
                <div className="col-xl-4 col-md-6">
                  <SelectElement
                    className="form-control"
                    label="timezone"
                    options={timezone}
                    changeHandler={e => this.onSelectChangeHandler(e)}
                    value={selectTimeZone}
                  />
                </div>
                <div className="col-xl-4 col-md-6">
                  <div className="form-group">
                    <label>
                      {cropResult ? 'Preview' : 'Attach File'}
                    </label>

                    {cropResult ? (
                      <Dropzone
                        onDrop={acceptedFile => {
                          this.readFile(acceptedFile);
                        }}
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
                        onDrop={acceptedFile => {
                          this.readFile(acceptedFile);
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
              </div>
              {showCropper && (
                <Modal title="Preview" toggleModal={this.closeModal}>
                  <div className="row">
                    <div className="col-md-6">
                      <div
                        className="card-body"
                        style={{ padding: 0 }}
                      >
                        <figure>
                          <Cropper
                            style={{ height: 400, width: 300 }}
                            aspectRatio={1 / 1}
                            preview=".img-preview"
                            guides={false}
                            src={src}
                            ref={cropper => {
                              this.cropper = cropper;
                            }}
                          />
                          <button
                            className="fieldsight-btn"
                            style={{ marginTop: '15px' }}
                            onClick={this.cropImage}
                            type="button"
                          >
                            Save Image
                          </button>
                        </figure>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div
                        className="card-body"
                        style={{ padding: 0 }}
                      >
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

              <button
                type="submit"
                className="fieldsight-btn pull-right"
              >
                save
              </button>
            </div>
          </form>
        </RightContentCard>
      </>
    );
  }
}

export default CreateProfile;
