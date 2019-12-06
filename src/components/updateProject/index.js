import React, { Component } from "react";
import axios from "axios";
import InputElement from "../common/InputElement";
import RightContentCard from "../common/RightContentCard";
import SelectElement from "../common/SelectElement";
import RadioElement from "../common/RadioElement";

class UpdateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: "",
      last_name: "",
      gender: "",
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
      selectedGender: ""
    };
  }

  componentDidMount() {
    axios
      .get(`/fv3/api/timezones/`)
      .then(res => {
        let timeZoneArr = this.state.timezone;
        this.setState({
          timezone: res.data
        });
        console.log(res, "res");
      })
      .catch({});
  }

  onChangeHandler = e => {
    const { value, name } = e.target;
    this.setState({
      ...this.state,
      [name]: value
    });
  };
  onSubmitHandler = () => {};
  onSelectChangeHandler = (e, data) => {
    const { value } = e.target;
    this.setState({
      selectTimeZone: value
    });
  };
  handleGender = e => {
    const { value, name } = e.target;
    if (value === "0") {
      console.log("male");

      this.setState({
        selectedGender: name
      });
    }
    if (value === "1") {
      console.log("female");
      this.setState({
        selectedGender: name
      });
    }
  };
  render() {
    const {
      state: {
        first_name,
        last_name,
        gender,
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
        profile_picture,
        timezone,
        selectTimeZone,
        selectedGender,
        male,
        female
      },
      onChangeHandler,
      onSubmitHandler,
      handleGender
    } = this;
    return (
      <>
        <RightContentCard title="Update Profile">
          <form className="edit-form" onSubmit={onSubmitHandler}>
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
                    checked={selectedGender === 0}
                    changeHandler={handleGender}
                    label="Male"
                    value={0}
                  />
                  <RadioElement
                    name="Gender"
                    checked={selectedGender === 1}
                    changeHandler={handleGender}
                    label="Female"
                    value={1}
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
                    changeHandler={e => {
                      onSelectChangeHandler(e, "timezone");
                    }}
                    value={selectTimeZone}
                  />
                </div>
              </div>
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
