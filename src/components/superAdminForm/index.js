import React, { Component } from 'react';
import L from 'leaflet';
import axios from 'axios';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import RightContentCard from '../common/RightContentCard';
import InputElement from '../common/InputElement';
import SelectElement from '../common/SelectElement';
import { errorToast, successToast } from '../../utils/toastHandler';
import 'leaflet/dist/leaflet.css';

const iconRetinaUrl = require('leaflet/dist/images/marker-icon-2x.png');
const iconUrl = require('leaflet/dist/images/marker-icon.png');
const shadowUrl = require('leaflet/dist/images/marker-shadow.png');

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
});

/* eslint-disable  camelcase */

export default class SuperAdminForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      identifier: '',
      name: '',
      phone: '',
      fax: '',
      email: '',
      website: '',
      address: '',
      public_desc: '',
      position: {
        latitude: '27.7172',
        longitude: '85.3240',
      },
      zoom: 13,
      Selectedtypes: '',
      country: [{ value: 'Select Option ', key: '' }],
      errorFlag: false,
      isEmptyCountry: false,
    };
  }

  componentDidMount() {
    axios
      .get(`/fv3/api/team-types-countries`)
      .then(res => {
        const newArr = this.state.country;
        this.setState(() => {
          if (res.data.countries !== undefined) {
            res.data.countries.map(country => newArr.push(country));
          }

          return {
            country: newArr,
            // Selectedtypes: res.data.countries[0].key,
          };
        });
      })
      .catch(() => {});
  }

  onChangeHandler = (e, position) => {
    const { name, value } = e.target;
    if (position) {
      this.setState(prevState => ({
        position: {
          ...prevState.position,
          [name]: value,
        },
      }));
    }
    return this.setState(
      prevState => ({
        ...prevState.project,
        [name]: value,
      }),
      () => {
        if (name === 'identifier') {
          if (value.trim().length < 5) {
            this.setState({
              errorFlag: true,
            });
          }
          if (value.trim().length > 4) {
            this.setState({
              errorFlag: false,
            });
          }
        }
      },
    );
  };

  onSubmitHandler = e => {
    e.preventDefault();
    this.handleValidation();

    const {
      state: {
        identifier,
        name,
        phone,
        fax,
        email,
        website,
        address,
        public_desc,
        position: { latitude, longitude },
        Selectedtypes,
        errorFlag,
      },
    } = this;

    const data = {
      identifier,
      name,
      phone,
      fax,
      email,
      website,
      country: Selectedtypes,
      address,
      public_desc,
      latitude,
      longitude,
    };
    if (!errorFlag && Selectedtypes) {
      axios
        .post(`/fv3/api/super-organization-form/`, data)
        .then(req => {
          if (req.status === 201) {
            successToast('Organization', 'created');
            this.props.history.push(
              `/organization-dashboard/${req.data.id}`,
            );
            this.setState({
              identifier: '',
              name: '',
              phone: '',
              fax: '',
              email: '',
              website: '',
              country: '',
              address: '',
              public_desc: '',
              position: {
                latitude: '51.505',
                longitude: '-0.09',
              },
              zoom: 13,
              Selectedtypes: '',
            });
          }
        })
        .catch(err => {
          const error = err.response.data;
          Object.entries(error).map(([key, value]) => {
            return errorToast(`${value}`);
          });
        });
    } else {
      this.setState({ isEmptyCountry: true });
    }
  };

  handleValidation = () => {
    const { identifier, Selectedtypes } = this.state;
    if (identifier.trim().length < 5) {
      this.setState({
        errorFlag: true,
      });
    }
    if (!Selectedtypes) {
      this.setState({ isEmptyCountry: true });
    }
  };

  mapClickHandler = e => {
    this.setState(state => ({
      position: {
        ...state.position,
        latitude: e.latlng.lat,
        longitude: e.latlng.lng,
      },
    }));
  };

  onSelectChangeHandler = e => {
    const { value } = e.target;
    this.setState(() => {
      if (value) {
        return { Selectedtypes: value, isEmptyCountry: false };
      }
      return { Selectedtypes: value, isEmptyCountry: true };
    });
  };

  render() {
    const {
      onChangeHandler,
      onSubmitHandler,
      mapClickHandler,
      onSelectChangeHandler,
      state: {
        identifier,
        name,
        phone,
        fax,
        email,
        website,
        country,
        address,
        public_desc,
        position: { latitude, longitude },
        Selectedtypes,
        errorFlag,
        isEmptyCountry,
        zoom,
      },
    } = this;

    return (
      <>
        <nav aria-label="breadcrumb" role="navigation">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              {/* <Link to={`/organization-dashboard/${id}`}>
                Organization Dashboard
              </Link> */}
              Organization Dashboard
            </li>
            <li className="breadcrumb-item">
              Create Super Organization
            </li>
          </ol>
        </nav>
        <RightContentCard title="New organization">
          <form className="edit-form" onSubmit={onSubmitHandler}>
            <div className="row">
              <div className="col-xl-4 col-md-6">
                <InputElement
                  formType="editForm"
                  tag="input"
                  type="text"
                  required
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
                  label="name"
                  required
                  name="name"
                  value={name}
                  changeHandler={onChangeHandler}
                  translation
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
                  translation
                />
              </div>
              <div className="col-xl-4 col-md-6">
                <InputElement
                  formType="editForm"
                  tag="input"
                  type="text"
                  label="website"
                  name="website"
                  value={website}
                  changeHandler={onChangeHandler}
                  translation
                />
              </div>
              <div className="col-xl-4 col-md-6">
                {country && (
                  <SelectElement
                    className="form-control"
                    label="Country"
                    translation
                    formType="editForm"
                    options={country}
                    changeHandler={e => onSelectChangeHandler(e)}
                    value={Selectedtypes}
                  />
                )}
                {isEmptyCountry && (
                  <span style={{ color: 'red' }}>
                    Select a country.
                  </span>
                )}
              </div>
              <div className="col-xl-4 col-md-6">
                <InputElement
                  formType="editForm"
                  tag="input"
                  type="text"
                  label="email"
                  name="email"
                  value={email}
                  changeHandler={onChangeHandler}
                  translation
                />
              </div>

              <div className="col-xl-4 col-md-6">
                <InputElement
                  formType="editForm"
                  tag="input"
                  type="text"
                  label="fax"
                  name="fax"
                  value={fax}
                  changeHandler={onChangeHandler}
                  translation
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
                  translation
                />
              </div>
              <div className="col-xl-4 col-md-6">
                <InputElement
                  formType="editForm"
                  tag="input"
                  type="text"
                  label="description"
                  name="public_desc"
                  value={public_desc}
                  changeHandler={onChangeHandler}
                  translation
                />
              </div>
            </div>
            <div className="row">
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
                          <b>Name :</b>
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
                          label="Latitude"
                          name="latitude"
                          value={latitude}
                          changeHandler={e => {
                            onChangeHandler(e, 'latitude');
                          }}
                          translation
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
                          translation
                        />
                      </div>
                    </div>
                  </div>
                </div>
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
          </form>
        </RightContentCard>
      </>
    );
  }
}
