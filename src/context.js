import React, { Component } from 'react';
import axios from 'axios';
import { successToast, errorToast } from './utils/toastHandler';
import isEmpty from './utils/isEmpty';

export const RegionContext = React.createContext();

/* eslint-disable consistent-return */

const url = 'fv3/api/project-regions/';
const urls = [
  'fv3/api/project-regions/',
  'fv3/api/project-terms-labels/',
];

const INITIAL_STATE = {
  terms: {},
  region: [],
  subRegion: [],
  subRegionId: '',
  showModal: false,
  selectedIdentifier: '',
  selectedName: '',
  selectedId: '',
  isLoading: false,
  showDeleteConfirmation: false,
  projectId: window.project_id
    ? window.project_id
    : process.env.PROJECT_ID,

  organizationId: window.organization_id
    ? window.organization_id
    : process.env.ORG_ID,
};

class RegionProvider extends Component {
  constructor(props) {
    super(props);

    this.state = INITIAL_STATE;
  }

  componentDidMount() {
    const { projectId } = this.state;

    axios
      .all(
        urls.map(each => axios.get(`${each}?project=${projectId}`)),
      )
      .then(
        axios.spread((region, terms) => {
          this.setState({
            region: region.data,
            terms: terms.data.length > 0 ? terms.data[0] : {},
          });
        }),
      )
      .catch(err => {});
  }

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
      selectedIdentifier: '',
      selectedName: '',
      selectedId: '',
    }));
  };

  regionPostHandler = () => {
    const {
      selectedId,
      selectedIdentifier,
      selectedName,
      region,
      projectId,
      terms,
    } = this.state;

    if (selectedId) {
      const newRegion = [...region];
      const selectedRegion = newRegion.find(
        each => each.id === +selectedId,
      );
      selectedRegion.identifier = selectedIdentifier;
      selectedRegion.name = selectedName;

      return axios
        .put(`${url}${selectedId}/`, {
          identifier: selectedRegion.identifier,
          name: selectedRegion.name,
          project: selectedRegion.project,
        })
        .then(res => {
          this.setState(
            prevState => ({
              ...INITIAL_STATE,
              region: newRegion,
              subRegion: [...prevState.subRegion],
              terms: { ...prevState.terms },
            }),
            () => {
              successToast(
                !isEmpty(terms) ? `${terms.region}` : 'Region',
                'updated',
              );
            },
          );
        })
        .catch(err => {
          this.setState(
            {
              isLoading: false,
              selectedId: '',
            },
            errorToast,
          );
        });
    }

    const newRegion = {
      identifier: selectedIdentifier,
      name: selectedName,
      project: projectId,
    };

    axios
      .post(`${url}?project=${projectId}`, newRegion)
      .then(res => {
        this.setState(
          prevState => ({
            ...INITIAL_STATE,
            region: [...prevState.region, { ...res.data }],
            subRegion: [...prevState.subRegion],
            terms: { ...prevState.terms },
          }),
          () => {
            successToast(
              !isEmpty(terms) ? `${terms.region}` : 'Region',
              'added',
            );
          },
        );
      })
      .catch(err => {
        this.setState(
          {
            isLoading: false,
          },
          errorToast,
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
      projectId,
      terms,
    } = this.state;

    if (selectedId) {
      const newSubRegion = [...subRegion];
      const selectedSubRegion = newSubRegion.find(
        each => each.id === +selectedId,
      );
      selectedSubRegion.identifier = selectedIdentifier;
      selectedSubRegion.name = selectedName;

      return axios
        .put(`${url}${selectedId}/`, {
          identifier: selectedSubRegion.identifier,
          name: selectedSubRegion.name,
          project: selectedSubRegion.project,
          parent: subRegionId,
        })
        .then(res => {
          this.setState(
            prevState => ({
              ...INITIAL_STATE,
              region: [...prevState.region],
              terms: { ...prevState.terms },
              subRegion: newSubRegion,
              subRegionId,
            }),
            () => {
              successToast(
                !isEmpty(terms)
                  ? `Sub ${terms.region}`
                  : 'Sub Region',
                'updated',
              );
            },
          );
        })
        .catch(err => {
          this.setState(
            {
              isLoading: false,
              selectedId: '',
            },
            errorToast,
          );
        });
    }

    const newSubRegion = {
      identifier: selectedIdentifier,
      name: selectedName,
      project: projectId,
      parent: subRegionId,
    };

    axios
      .post(`${url}?project=${projectId}`, newSubRegion)
      .then(res => {
        this.setState(
          prevState => ({
            ...INITIAL_STATE,
            region: [...prevState.region],
            terms: { ...prevState.terms },
            subRegion: [...prevState.subRegion, { ...res.data }],
            subRegionId,
          }),
          () => {
            successToast(
              !isEmpty(terms) ? `Sub ${terms.region}` : 'Sub Region',
              'added',
            );
          },
        );
      })
      .catch(err => {
        this.setState(
          {
            isLoading: false,
          },
          errorToast,
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
        showModal: false,
      },
      this.requestHandler,
    );
  };

  editHandler = id => {
    this.setState(prevState => {
      if (prevState.subRegionId) {
        const selectedSubRegion = prevState.subRegion.find(
          subReg => subReg.id === +id,
        );

        return this.setState({
          showModal: true,
          selectedId: id,
          selectedIdentifier: selectedSubRegion.identifier,
          selectedName: selectedSubRegion.name,
        });
      }

      const selectedRegion = prevState.region.find(
        reg => reg.id === +id,
      );
      this.setState({
        showModal: true,
        selectedId: id,
        selectedIdentifier: selectedRegion.identifier,
        selectedName: selectedRegion.name,
      });
    });
  };

  removeHandler = id => {
    this.setState({
      showDeleteConfirmation: true,
      selectedId: id,
    });
  };

  confirmHandler = () => {
    this.setState(
      {
        showDeleteConfirmation: false,
        isLoading: true,
      },
      this.confirmedRemoveHandler,
    );
  };

  cancelHandler = () => {
    this.setState({
      showDeleteConfirmation: false,
      selectedId: '',
    });
  };

  confirmedRemoveHandler = () => {
    const { subRegionId, terms } = this.state;
    this.setState(prevState => {
      if (prevState.subRegionId) {
        const { selectedId, subRegion } = prevState;
        const filteredSubRegion = subRegion.filter(
          region => region.id !== +selectedId,
        );

        return axios
          .delete(`${url}${selectedId}/`)
          .then(res => {
            this.setState(
              {
                ...INITIAL_STATE,
                region: [...prevState.region],
                terms: { ...prevState.terms },
                subRegion: filteredSubRegion,
                subRegionId,
              },
              () =>
                successToast(
                  !isEmpty(terms)
                    ? `Sub ${terms.region}`
                    : 'Sub Region',
                  'deleted',
                ),
            );
          })
          .catch(err => {
            this.setState(
              {
                isLoading: false,
              },
              errorToast,
            );
          });
      }

      const { selectedId, region } = prevState;
      const filteredRegion = region.filter(
        each => each.id !== +selectedId,
      );

      axios
        .delete(`${url}${selectedId}/`)
        .then(res => {
          this.setState(
            {
              ...INITIAL_STATE,
              terms: { ...prevState.terms },
              subRegion: [...prevState.subRegion],
              region: filteredRegion,
            },
            () => {
              successToast(
                !isEmpty(terms) ? `${terms.region}` : 'Region',
                'deleted',
              );
            },
          );
        })
        .catch(err => {
          this.setState(
            {
              isLoading: false,
            },
            errorToast,
          );
        });
    });
  };

  onChangeHandler = e => {
    const { name, value } = e.target;

    this.setState({
      [name]: value,
    });
  };

  setSubRegion = (subRegion, subRegionId) => {
    this.setState({
      subRegion,
      subRegionId,
    });
  };

  updateTerms = terms => {
    this.setState({
      terms,
    });
  };

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
      updateTerms,
      state,
      props,
    } = this;

    return (
      <>
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
            setSubRegion,
            updateTerms,
          }}
        >
          {props.children}
        </RegionContext.Provider>
      </>
    );
  }
}

const RegionConsumer = RegionContext.Consumer;

export { RegionProvider, RegionConsumer };
