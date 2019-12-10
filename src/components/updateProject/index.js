import React, { Component } from "react";
import axios from "axios";
import Dropzone from "react-dropzone";
import Cropper from "react-cropper";
import InputElement from "../common/InputElement";
import RightContentCard from "../common/RightContentCard";
import SelectElement from "../common/SelectElement";
import RadioElement from "../common/RadioElement";
import Modal from "../common/Modal";

class UpdateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: "",
      last_name: "",
      address: "",
      phone: "",
      skype: "",
      primary_number: "",
      secondary_number: "",
      office_number: "",
      viber: "",
      whatsapp: "",
      wechat: "",
      line: "",
      tango: "",
      hike: "",
      qq: "",
      google_talk: "",
      twitter: "",
      profile_picture: "",
      timezone: [{ id: "", name: "----" }],
      selectTimeZone: "",
      selectedGender: "Male",
      showCropper: false,
      cropResult: "",
      src: "",
      show: false
    };
  }

  componentDidMount() {
    const {
      match: {
        params: { id }
      }
    } = this.props;
    const urls = [`/fv3/api/get-profile/${id}/`, `/fv3/api/timezones/`];

    axios
      .all(
        urls.map((url, i) => {
          return axios.get(url);
        })
      )
      .then(
        axios.spread((get_profile, timezone) => {
          const timezoneArr = this.state.timezone;

          timezone.data &&
            timezone.data.map(zoneArr => timezoneArr.push(zoneArr));
          this.setState({
            timezone: timezoneArr,
            first_name: get_profile.data.first_name,
            last_name: get_profile.data.last_name,
            address: get_profile.data.address,
            phone: get_profile.data.phone,
            skype: get_profile.data.skype,
            primary_number: get_profile.data.primary_number,
            secondary_number: get_profile.data.secondary_number,
            office_number: get_profile.data.office_number,
            viber: get_profile.data.viber,
            whatsapp: get_profile.data.whatsapp,
            wechat: get_profile.data.wechat,
            line: get_profile.data.line,
            tango: get_profile.data.tango,
            hike: get_profile.data.hike,
            qq: get_profile.data.qq,
            google_talk: get_profile.data.google_talk,
            twitter: get_profile.data.twitter,
            selectTimeZone: get_profile.data.timezone,
            selectedGender: get_profile.data.gender,
            cropResult:
              get_profile.data.profile_picture &&
              get_profile.data.profile_picture
          });
        })
      );
  }

  onChangeHandler = e => {
    const { value, name } = e.target;
    this.setState({
      ...this.state,
      [name]: value
    });
  };
  onSubmitHandler = e => {
    e.preventDefault();
    const {
      match: {
        params: { id }
      }
    } = this.props;

    const updateProfile = {};
    updateProfile.first_name = this.state.first_name;
    updateProfile.last_name = this.state.last_name;
    updateProfile.address = this.state.address;
    updateProfile.phone = this.state.phone;
    updateProfile.skype = this.state.skype;
    updateProfile.primary_number = this.state.primary_number;
    updateProfile.secondary_number = this.state.secondary_number;
    updateProfile.office_number = this.state.office_number;
    updateProfile.viber = this.state.viber;
    updateProfile.whatsapp = this.state.whatsapp;
    updateProfile.wechat = this.state.wechat;
    updateProfile.line = this.state.line;
    updateProfile.tango = this.state.tango;
    updateProfile.hike = this.state.hike;
    updateProfile.qq = this.state.qq;
    updateProfile.google_talk = this.state.google_talk;
    updateProfile.twitter = this.state.twitter;
    updateProfile.selectTimeZone = this.state.selectTimeZone;
    updateProfile.gender = this.state.selectedGender;
    updateProfile.profile_picture = this.state.cropResult;

    axios
      .post(`/fv3/api/update-profile/${id}/`, updateProfile)
      .then(req => {
        if (req.status === 201) {
          this.setState({
            first_name: "",
            last_name: "",
            address: "",
            phone: "",
            skype: "",
            primary_number: "",
            secondary_number: "",
            office_number: "",
            viber: "",
            whatsapp: "",
            wechat: "",
            line: "",
            tango: "",
            hike: "",
            qq: "",
            google_talk: "",
            twitter: "",
            profile_picture: "",
            timezone: [{ id: "", name: "----" }],
            selectTimeZone: "",
            selectedGender: "0",
            showCropper: false,
            cropResult: "",
            src: "",
            show: false
          });
          // this.props.history.push(``);
        }
      })
      .catch();
  };

  onSelectChangeHandler = e => {
    const { value } = e.target;

    this.setState({
      selectTimeZone: value
    });
  };
  handleGender = e => {
    const { value } = e.target;

    if (value === "Male") {
      this.setState({
        selectedGender: value
      });
    }
    if (value === "Female") {
      this.setState({
        selectedGender: value
      });
    }
  };

  readFile = file => {
    const reader = new FileReader();
    reader.onload = () => {
      this.setState({
        src: reader.result,
        showCropper: true,
        show: true
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

  closeModal = () => {
    this.setState({
      showCropper: false
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
        showCropper
      },
      onChangeHandler,
      onSubmitHandler,
      handleGender
    } = this;
    return (
      <>
        <RightContentCard title="Update Profile">
          <form className="edit-form" onSubmit={e => onSubmitHandler(e)}>
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
                    checked={selectedGender === "Male"}
                    changeHandler={handleGender}
                    label="Male"
                    value="Male"
                  />
                  <RadioElement
                    name="Gender"
                    checked={selectedGender === "Female"}
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
                    <label> {cropResult ? "Preview" : "Attach File"}</label>

                    {cropResult ? (
                      <Dropzone
                        onDrop={acceptedFile => this.readFile(acceptedFile)}
                      >
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
                      <Dropzone
                        onDrop={acceptedFile => this.readFile(acceptedFile)}
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
              </div>
              {showCropper && (
                <Modal title="Preview" toggleModal={this.closeModal}>
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

              <button type="submit" className="fieldsight-btn pull-right">
                save
              </button>
            </div>
          </form>
        </RightContentCard>
      </>
    );
  }
}

export default UpdateProfile;