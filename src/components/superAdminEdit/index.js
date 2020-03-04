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

export default class SuperAdminFormEdit extends Component {
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
        latitude: '51.505',
        longitude: '-0.09',
      },
      zoom: 13,
      Selectedtypes: '',
      country: '',
      errorFlag: false,
    };
  }

  componentDidMount() {
    const { id } = this.props;

    const editUrl = axios.get(
      `/fv3/api/super-organization-lists/${id}/`,
    );
    const contryListUrl = axios.get(`/fv3/api/team-types-countries`);

    axios
      .all([editUrl, contryListUrl])
      .then(
        axios.spread((...responses) => {
          const position =
            responses[0].data.location &&
            responses[0].data.location.split(' ');

          const longitude = position && position[1].split('(')[1];
          const latitude = position && position[2].split(')')[0];

          this.setState({
            identifier: responses[0].data.identifier,
            name: responses[0].data.name,
            phone: responses[0].data.phone,
            fax: responses[0].data.fax,
            email: responses[0].data.email,
            website: responses[0].data.website,
            address: responses[0].data.address,
            public_desc: responses[0].data.public_desc,
            position: {
              latitude,
              longitude,
            },
            zoom: 13,
            Selectedtypes: responses[0].data.country,
            country: responses[1].data.countries,
          });
        }),
      )
      .catch();
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
    const {
      props: { id },
      state: {
        identifier,
        name,
        phone,
        fax,
        email,
        website,
        Selectedtypes,
        address,
        public_desc,
        position: { latitude, longitude },
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

    if (identifier.trim().length < 5) {
      this.setState({
        errorFlag: true,
      });
    } else {
      axios
        .put(`/fv3/api/super-organization-lists/${id}/`, data)
        .then(req => {
          if (req.status === 200) {
            successToast('Organization', 'updated');
          }
        })
        .catch(err => {
          const error = err.response.data;
          Object.entries(error).map(([key, value]) => {
            return errorToast(`${value}`);
          });
        });
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
    this.setState({
      Selectedtypes: value,
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
        zoom,
      },
      // props: { id },
    } = this;

    return (
      <>
        <RightContentCard title="Edit Organization">
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
                  name="name"
                  required
                  value={name}
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
                  label="website"
                  name="website"
                  value={website}
                  changeHandler={onChangeHandler}
                />
              </div>
              <div className="col-xl-4 col-md-6">
                {country && (
                  <SelectElement
                    className="form-control"
                    label="Country"
                    formType="editForm"
                    options={country}
                    changeHandler={e => onSelectChangeHandler(e)}
                    value={Selectedtypes && Selectedtypes}
                  />
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
                  label="Description"
                  name="public_desc"
                  value={public_desc}
                  changeHandler={onChangeHandler}
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
