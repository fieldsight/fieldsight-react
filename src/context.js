import React, { Component, Fragment } from "react";
import axios from "axios";
import { successToast, errorToast } from "./utils/toastHandler";
export const RegionContext = React.createContext();

const url = "fv3/api/project-regions/";

const INITIAL_STATE = {
  region: [],
  subRegion: [],
  subRegionId: "",
  showModal: false,
  selectedIdentifier: "",
  selectedName: "",
  selectedId: "",
  isLoading: false,
  showDeleteConfirmation: false,
  projectId: window.project_id ? window.project_id : 182,
  organizationId: window.organization_id ? window.organization_id : 62
};

class RegionProvider extends Component {
  state = INITIAL_STATE;

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
      selectedIdentifier: "",
      selectedName: "",
      selectedId: ""
    }));
  };

  regionPostHandler = () => {
    const {
      selectedId,
      selectedIdentifier,
      selectedName,
      region,
      projectId
    } = this.state;

    if (selectedId) {
      const newRegion = [...region];
      const selectedRegion = newRegion.find(
        region => region.id === +selectedId
      );
      selectedRegion.identifier = selectedIdentifier;
      selectedRegion.name = selectedName;

      return axios
        .put(`${url}${selectedId}/`, {
          identifier: selectedRegion.identifier,
          name: selectedRegion.name,
          project: selectedRegion.project
        })
        .then(res => {
          this.setState(
            {
              ...INITIAL_STATE,
              region: newRegion
            },
            () => successToast("Region", "updated")
          );
        })
        .catch(err => {
          this.setState(
            {
              isLoading: false,
              selectedId: ""
            },
            errorToast
          );
        });
    }

    const newRegion = {
      identifier: selectedIdentifier,
      name: selectedName,
      project: projectId
    };

    axios
      .post(url, newRegion)
      .then(res => {
        this.setState(
          {
            ...INITIAL_STATE,
            region: [...this.state.region, { ...res.data }]
          },
          () => successToast("Region", "added")
        );
      })
      .catch(err => {
        this.setState(
          {
            isLoading: false
          },
          errorToast
        );
      });
  };

  subRegionPostHandler = () => {
    const {
      selectedId,
      selectedIdentifier,
      selectedName,
      subRegion,
      subRegionId,
      projectId
    } = this.state;

    if (selectedId) {
      const newSubRegion = [...subRegion];
      const selectedSubRegion = newSubRegion.find(
        subRegion => subRegion.id === +selectedId
      );
      selectedSubRegion.identifier = selectedIdentifier;
      selectedSubRegion.name = selectedName;

      return axios
        .put(`${url}${selectedId}/`, {
          identifier: selectedSubRegion.identifier,
          name: selectedSubRegion.name,
          project: selectedSubRegion.project,
          parent: subRegionId
        })
        .then(res => {
          this.setState(
            {
              ...INITIAL_STATE,
              subRegion: newSubRegion,
              subRegionId
            },
            () => successToast("Subregion", "updated")
          );
        })
        .catch(err => {
          this.setState(
            {
              isLoading: false,
              selectedId: ""
            },
            errorToast
          );
        });
    }

    const newSubRegion = {
      identifier: selectedIdentifier,
      name: selectedName,
      project: projectId,
      parent: subRegionId
    };

    axios
      .post(url, newSubRegion)
      .then(res => {
        this.setState(
          {
            ...INITIAL_STATE,
            subRegion: [...this.state.subRegion, { ...res.data }],
            subRegionId
          },
          () => successToast("Subregion", "added")
        );
      })
      .catch(err => {
        this.setState(
          {
            isLoading: false
          },
          errorToast
        );
      });
  };

  requestHandler = () => {
    const { subRegionId } = this.state;

    if (subRegionId) {
      return this.subRegionPostHandler();
    }
    this.regionPostHandler();
  };

  onSubmitHandler = (e, edit) => {
    e.preventDefault();

    this.setState(
      {
        isLoading: true,
        showModal: false
      },
      this.requestHandler
    );
  };

  editHandler = id => {
    const { subRegionId } = this.state;
    if (subRegionId) {
      const selectedSubRegion = this.state.subRegion.find(
        subReg => subReg.id === +id
      );

      return this.setState({
        showModal: true,
        selectedId: id,
        selectedIdentifier: selectedSubRegion.identifier,
        selectedName: selectedSubRegion.name
      });
    }
    const selectedRegion = this.state.region.find(reg => reg.id === +id);
    this.setState({
      showModal: true,
      selectedId: id,
      selectedIdentifier: selectedRegion.identifier,
      selectedName: selectedRegion.name
    });
  };

  removeHandler = id => {
    this.setState({
      showDeleteConfirmation: true,
      selectedId: id
    });
  };

  confirmHandler = () => {
    this.setState(
      {
        showDeleteConfirmation: false,
        isLoading: true
      },
      this.confirmedRemoveHandler
    );
  };

  cancelHandler = () => {
    this.setState({
      showDeleteConfirmation: false,
      selectedId: ""
    });
  };

  confirmedRemoveHandler = () => {
    const { subRegionId } = this.state;
    if (subRegionId) {
      const { selectedId, subRegion } = this.state;
      const filteredSubRegion = subRegion.filter(
        region => region.id !== +selectedId
      );

      return axios
        .delete(`${url}${selectedId}/`)
        .then(res => {
          this.setState(
            {
              ...INITIAL_STATE,
              subRegion: filteredSubRegion,
              subRegionId
            },
            () => successToast("Subregion", "deleted")
          );
        })
        .catch(err => {
          this.setState(
            {
              isLoading: false
            },
            errorToast
          );
        });
    }

    const { selectedId, region } = this.state;
    const filteredRegion = region.filter(region => region.id !== +selectedId);

    axios
      .delete(`${urls[1]}${selectedId}/`)
      .then(res => {
        this.setState(
          {
            ...INITIAL_STATE,
            region: filteredRegion
          },
          () => successToast("Region", "deleted")
        );
      })
      .catch(err => {
        this.setState(
          {
            isLoading: false
          },
          errorToast
        );
      });
  };

  onChangeHandler = e => {
    const { name, value } = e.target;

    this.setState({
      [name]: value
    });
  };

  setSubRegion = (subRegion, subRegionId) => {
    this.setState({
      subRegion,
      subRegionId
    });
  };

  componentDidMount() {
    const { projectId } = this.state;
    axios
      .get(`${url}?project=${projectId}`)
      .then(res => {
        this.setState({
          region: res.data
        });
      })
      .catch(err => console.log("err", err));
  }

  render() {
    const {
      toggleModal,
      onChangeHandler,
      editHandler,
      removeHandler,
      cancelHandler,
      confirmHandler,
      onSubmitHandler,
      setSubRegion,
      state
    } = this;

    return (
      <Fragment>
        <RegionContext.Provider
          value={{
            ...state,
            toggleModal,
            onChangeHandler,
            editHandler,
            removeHandler,
            cancelHandler,
            confirmHandler,
            onSubmitHandler,
            setSubRegion
          }}
        >
          {this.props.children}
        </RegionContext.Provider>
      </Fragment>
    );
  }
}

const RegionConsumer = RegionContext.Consumer;

export { RegionProvider, RegionConsumer };
