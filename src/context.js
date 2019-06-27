import React, { Component, Fragment } from "react";
import axios from "axios";
import { successToast, errorToast } from "./utils/toastHandler";
const RegionContext = React.createContext();

const urls = [
  "https://fieldsight.naxa.com.np/fv3/api/project-regions/?project=137",
  "https://fieldsight.naxa.com.np/fv3/api/project-regions"
];

const INITIAL_STATE = {
  region: [],
  subRegion: [],
  subRegionId: "",
  showModal: false,
  selectedIdentifier: "",
  selectedName: "",
  selectedId: "",
  isLoading: false,
  showDeleteConfirmation: false
};

class RegionProvider extends Component {
  state = INITIAL_STATE;

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal
    }));
  };

  regionPostHandler = () => {
    const { selectedId, selectedIdentifier, selectedName, region } = this.state;

    if (selectedId) {
      const newRegion = [...region];
      const selectedRegion = newRegion.find(
        region => region.id === +selectedId
      );
      selectedRegion.identifier = selectedIdentifier;
      selectedRegion.name = selectedName;

      return axios
        .put(`${urls[1]}/${selectedId}/`, {
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
      project: 137
    };

    axios
      .post(urls[0], newRegion)
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
      subRegionId
    } = this.state;

    if (selectedId) {
      const newSubRegion = [...subRegion];
      const selectedSubRegion = newSubRegion.find(
        subRegion => subRegion.id === +selectedId
      );
      selectedSubRegion.identifier = selectedIdentifier;
      selectedSubRegion.name = selectedName;

      return axios
        .put(`${urls[1]}/${selectedId}/`, {
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
      project: 137,
      parent: subRegionId
    };

    axios
      .post(urls[0], newSubRegion)
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

      console.log("filteredSubREgion", filteredSubRegion);

      return axios
        .delete(`${urls[1]}/${selectedId}/`)
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
      .delete(`${urls[1]}/${selectedId}/`)
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
    axios
      .get(urls[0])
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

    console.log("this.props.context", this.props);
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
