import React, { Component } from 'react';
import axios from 'axios';
import Edit from '../common/EditProject';
import { errorToast, successToast } from '../../utils/toastHandler';
/* eslint-disable react/destructuring-assignment */
/* eslint-disable camelcase */

export default class ProjectAdd extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      project: {
        identifier: '',
        name: '',
        phone: '',
        email: '',
        address: '',
        website: '',
        donor: '',
        public_desc: '',
        cluster_sites: false,
        errorFlag: false,
      },
      // loaded: 0,
      sector: [],
      subSectors: [],
      selectedSector: '',
      selectedSubSector: '',
      position: {
        latitude: '28.3949',
        longitude: '-0.09',
      },
      zoom: 13,
      src: '',
      showCropper: false,
      cropResult: '',
      isLoading: false,
      // redirect: false,
      breadcrumbs: {},
      id: this.props.match.params ? this.props.match.params.id : '',
    };
  }

  componentDidMount() {
    this._isMounted = true;
    const {
      match: {
        params: { id },
      },
    } = this.props;

    axios
      .get(`/fv3/api/sectors-subsectors/`)
      .then(res => {
        axios
          .get(`/fv3/api/add-project/${id}/`)
          .then(location => {
            if (this._isMounted) {
              const position =
                location.data.location &&
                location.data.location.split(' ');
              const longitude = position && position[1].split('(')[1];
              const latitude = position && position[2].split(')')[0];
              const { breadcrumbs } = location.data;
              this.setState({
                sector: res.data,
                id,
                position: {
                  longitude,
                  latitude,
                },
                breadcrumbs,
              });
            }
          })
          .catch(() => {
            // console.log(err);
          });
      })
      .catch(() => {
        // console.log(err, 'err');
      });
  }

  onSubmitHandler = e => {
    e.preventDefault();
    const {
      identifier,
      id,
      project,
      selectedSector,
      selectedSubSector,
      position,
      cropResult,
    } = this.state;

    const data = {
      identifier: project.identifier,
      organization: id,
      name: project.name,
      phone: project.phone,
      email: project.email,
      address: project.address,
      website: project.website,
      donor: project.donor,
      public_desc: project.public_desc,
      cluster_sites: project.cluster_sites,
      selectedSector,
      selectedSubSector,
      latitude: position.latitude,
      longitude: position.longitude,
      cropResult,
    };

    if (this.state.project.identifier.trim().length < 5) {
      this.setState({
        errorFlag: true,
      });
    } else {
      axios
        .post(`fv3/api/add-project/${id}/`, data)
        .then(res => {
          if (res.status === 201) {
            successToast('Project', 'Created');
            this.setState({
              project: {
                name: '',
                phone: '',
                email: '',
                address: '',
                website: '',
                donor: '',
                public_desc: '',
                cluster_sites: false,
              },
              // loaded: 0,
              sector: [],
              subSectors: [],
              selectedSector: '',
              selectedSubSector: '',
              position: {
                latitude: '28.3949',
                longitude: '-0.09',
              },
              cropResult: '',
              // redirect: true,
            });
            this.props.history.push(
              `/project-dashboard/${res.data.id}`,
            );
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

  onSelectChangeHandler = (e, subSect) => {
    const { value } = e.target;
    const { subSectors, sector } = this.state;
    if (subSect) {
      const selectedSubSectorId = subSectors.find(
        each => each.id === +value,
      ).id;
      return this.setState({
        selectedSubSector: selectedSubSectorId,
      });
    }
    const selectedSector = sector.find(sect => sect.id === +value);
    return this.setState({
      subSectors: selectedSector.subSectors,
      selectedSector: selectedSector.id,
    });
  };

  handleCheckboxChange = e =>
    this.setState(state => ({
      project: {
        ...state.project,
        cluster_sites: e.target.checked,
      },
    }));

  onChangeHandler = (e, position) => {
    const { name, value } = e.target;

    if (position) {
      return this.setState(state => ({
        position: {
          ...state.position,
          [name]: value,
        },
      }));
    }

    return this.setState(
      state => ({
        project: {
          ...state.project,
          [name]: value,
        },
      }),
      () => {
        if (name === 'identifier') {
          if (value.trim().length < 5) {
            this.setState({
              errorFlag: true,
            });
          }
          if (value.trim().length > 5) {
            this.setState({
              errorFlag: false,
            });
          }
        }
      },
    );
  };

  readFile = file => {
    const reader = new FileReader();
    reader.onload = () => {
      this.setState({
        src: reader.result,
        showCropper: true,
      });
    };
    reader.readAsDataURL(file[0]);
  };

  cropImage = image => {
    this.setState({
      cropResult: image,
      showCropper: false,
      src: '',
    });
  };

  closeModal = () => {
    this.setState({
      showCropper: false,
    });
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

  render() {
    const {
      project: {
        identifier,
        name,
        phone,
        email,
        address,
        website,
        public_desc,
        cluster_sites,
        donor,
        id,
        // errorFlag,
      },
      sector,
      position: { latitude, longitude },
      breadcrumbs,
    } = this.state;

    return (
      <>
        <nav aria-label="breadcrumb" role="navigation">
          {Object.keys(breadcrumbs).length > 0 && (
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href={breadcrumbs.name_url}>{breadcrumbs.name}</a>
              </li>
              <li className="breadcrumb-item">
                {breadcrumbs.current_page}
              </li>
            </ol>
          )}
        </nav>
        <Edit
          errorFlag={this.state.errorFlag}
          context={id}
          _isMounted={false}
          onSubmitHandler={this.onSubmitHandler}
          onChangeHandler={this.onChangeHandler}
          sector={sector}
          onSelectChangeHandler={this.onSelectChangeHandler}
          identifier={identifier}
          name={name}
          phone={phone}
          email={email}
          address={address}
          website={website}
          donor={donor}
          public_desc={public_desc}
          cluster_sites={cluster_sites}
          selectedSector={this.state.selectedSector}
          selectedSubSector={this.state.selectedSubSector}
          // selectedSubSector={this.state.selectedSubSector}
          handleCheckbox={this.handleCheckboxChange}
          latitude={latitude}
          longitude={longitude}
          zoom={this.state.zoom}
          mapClickHandler={this.mapClickHandler}
          cropResult={this.state.cropResult}
          showCropper={this.state.showCropper}
          closeModal={this.closeModal}
          src={this.state.src}
          cropImage={this.cropImage}
          isLoading={this.state.isLoading}
          subSectors={this.state.subSectors}
          readFile={this.readFile}
          title="New Project"
        />
      </>
    );
  }
}
