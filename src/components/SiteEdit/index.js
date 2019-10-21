import React, { Component } from "react";
import SiteEditForm from "../common/siteEdit";
import axios from "axios";
export default class SiteEdit extends Component {
  _isMounted = false;
  state = {
    project: {
      name: "",
      site_id: "",
      phone: "",
      address: "",
      public_desc: "",
      logo: "",
      weight: "",
      cluster_sites: false
    },
    loaded: 0,
    jsondata: [],
    position: {
      latitude: "51.505",
      longitude: "-0.09"
    },
    zoom: 13,
    src: "",
    showCropper: false,
    cropResult: "",
    isLoading: false,
    selectedSiteTypes: "",
    id: "",
    selectform: [],
    selectdata: false,
    region: [{ name: "----", id: null }],
    data: [],
    regionselected: "",
    dataSelected: "",
    id: "",
    siteId: "",
    regionalId: "",
    site_types: [{ name: "----", id: null }],
    Selectedtypes: "",
    project_info: [],
    project_id: "",
    show: false,
    deleteConfirm: false,
    select: [],
    delete_perm: ""
  };

  componentDidMount() {
    this._isMounted = true;
    const {
      match: {
        params: { id, siteId, regionalId }
      }
    } = this.props;
    axios
      .get(`/fv3/api/site-form/${id}/`)
      .then(response => {
        axios
          .get(`/fv3/api/site-form/?project=${response.data.project}`)
          .then(res => {
            let regionArr = this.state.region;
            let typeArr = this.state.site_types;

            if (this._isMounted) {
              const position =
                res.data.location && res.data.location.split(" ");
              const longitude = position && position[1].split("(")[1];
              const latitude = position && position[2].split(")")[0];
              this.setState(state => {
                res.data.regions.map(each => regionArr.push(each));
                res.data.site_types.map(each => typeArr.push(each));
                return {
                  delete_perm: response.data.delete_perm,
                  project_id: response.data.project,
                  jsondata: res.data.json_questions,
                  id,
                  region: regionArr,
                  siteId,
                  regionalId,
                  site_types: typeArr,
                  data: response.data,
                  project: {
                    name: response.data.name,
                    site_id: response.data.identifier,
                    phone: response.data.phone,
                    address: response.data.address,
                    public_desc: response.data.public_desc,
                    logo: response.data.logo,
                    weight: response.data.weight,
                    cluster_sites: response.data.enable_subsites
                  },
                  regionselected: response.data.region,
                  Selectedtypes: response.data.type,
                  data: response.data.site_meta_attributes_answers,
                  cropResult: response.data.logo,
                  position: {
                    longitude,
                    latitude
                  }
                };
              });
            }
          })
          .catch(err => {
            console.log(err, "err");
          });
      })
      .catch(err => {
        console.log(err, "err");
      });
  }
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
  onSubmitHandler = e => {
    e.preventDefault();
    const {
      match: {
        params: { id }
      }
    } = this.props;
    let data = {
      project: this.state.project_id,
      name: this.state.project.name,
      identifier: this.state.project.site_id,
      phone: this.state.project.phone,
      address: this.state.project.address,
      public_desc: this.state.project.public_desc,
      latitude: this.state.position.latitude,
      longitude: this.state.position.longitude,
      ...(!!this.state.project.weight && { weight: this.state.project.weight }),
      region: this.state.regionselected,
      type: this.state.Selectedtypes,
      enable_subsites: this.state.project.cluster_sites,
      ...(this.state.show && { logo: this.state.cropResult }),
      site_meta_attributes_ans: JSON.stringify(this.state.data)
    };

    axios({
      method: "PUT",
      url: `/fv3/api/site-form/${id}/`,
      data,
      headers: { "content-type": "application/json" }
    })
      .then(res => {
        if (res.status === 200) {
          this.props.history.push(`/site-dashboard/${res.data.id}`);
        }
      })
      .catch(err => {
        console.log(err);
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
  onSelectChangeHandler = (e, data) => {
    const { value } = e.target;
    if (data === "regions") {
      this.setState({
        regionselected: value
      });
    } else if (data === "site_types") {
      this.setState({
        Selectedtypes: value
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

  handleCheckboxChange = e => {
    this.setState({
      project: {
        ...this.state.project,
        cluster_sites: e.target.checked
      }
    });
  };
  closeModal = () => {
    this.setState({
      showCropper: false
    });
  };
  cropImage = image => {
    this.setState({
      cropResult: image,
      showCropper: false,
      src: ""
    });
  };
  ondynamiChangeHandler = e => {
    const {
      target: { name, value }
    } = e;
    this.setState({
      data: {
        ...this.state.data,
        [name]: value
      }
    });
  };
  handleDelete = () => {
    this.setState({
      deleteConfirm: true
    });
  };
  deleteClose = () => {
    this.setState({
      deleteConfirm: false
    });
  };
  deleteFile = () => {
    axios
      .delete(`/fv3/api/site-form/${this.state.id}/`)
      .then(res => {
        if (res.status == 200) {
          this.setState({
            deleteConfirm: false
          });
          window.location.href = `/fieldsight/application/?project=${this.state.project_id}#/project-sitelist`;
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  selectedValue = (value, name1) => {
    const dataArr = Object.keys(this.state.data).filter(Boolean);
    const obj = {};
    dataArr.forEach(objKey => (obj[objKey] = this.state.data[objKey]));
    //name = value;
    this.setState({
      data: {
        ...obj,
        [name1]: value
      }
    });
  };
  render() {
    return (
      <SiteEditForm
        project={this.state}
        onChangeHandler={this.onChangeHandler}
        onSubmitHandler={this.onSubmitHandler}
        mapClickHandler={this.mapClickHandler}
        onSelectChangeHandler={this.onSelectChangeHandler}
        readFile={this.readFile}
        closeModal={this.closeModal}
        handleCheckboxChange={this.handleCheckboxChange}
        zoom={13}
        src={this.state.src}
        project_info={this.state.data}
        jsondata={this.state.jsondata}
        cropImage={this.cropImage}
        cropResult={this.state.cropResult}
        ondynamiChangeHandler={this.ondynamiChangeHandler}
        handleDelete={this.handleDelete}
        deleteClose={this.deleteClose}
        deleteFile={this.deleteFile}
        selectedValue={this.selectedValue}
        delete_perm={this.state.delete_perm}
      />
    );
  }
}
