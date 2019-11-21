import React, { Component } from 'react';
import axios from 'axios';
import Table from '../common/Table';
import Modal from '../common/Modal';
import InputElement from '../common/InputElement';
import RightContentCard from '../common/RightContentCard';
import Loader from '../common/Loader';
import { successToast, errorToast } from '../../utils/toastHandler';
import { RegionContext } from '../../context';
import isEmpty from '../../utils/isEmpty';
/* eslint-disable consistent-return  */

const tableHeader = {
  siteTypes: ['ID', 'Type', 'Action'],
};

const url = 'fv3/api/project-site-types/';

const INITIAL_STATE = {
  showModal: false,
  siteType: [],
  selectedId: '',
  selectedIdentifier: '',
  selectedName: '',
  isLoading: false,
  showDeleteConfirmation: false,
};

class SiteType extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);

    this.state = INITIAL_STATE;
    this.contextType = RegionContext;
  }

  componentDidMount() {
    this._isMounted = true;
    const { projectId } = this.context;
    axios
      .get(`${url}?project=${projectId}`)
      .then(res => {
        if (this._isMounted) {
          this.setState({
            siteType: res.data,
          });
        }
      })
      .catch(err => console.log('err', err));
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  toggleModal = () => {
    return this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  requestHandler = () => {
    const {
      state: {
        selectedId,
        selectedIdentifier,
        selectedName,
        siteType,
      },
      context: { projectId, terms },
    } = this;

    if (selectedId) {
      const newSiteType = [...siteType];
      const selectedSite = newSiteType.find(
        site => site.id === +selectedId,
      );
      selectedSite.identifier = selectedIdentifier;
      selectedSite.name = selectedName;

      return axios
        .put(`${url}${selectedId}/`, {
          identifier: selectedSite.identifier,
          name: selectedSite.name,
          project: selectedSite.project,
        })
        .then(res => {
          this.setState(
            {
              ...INITIAL_STATE,
              siteType: newSiteType,
            },
            () =>
              successToast(
                !isEmpty(terms) ? `${terms.site} Type` : 'Site Type',
                'updated',
              ),
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

    const newSiteType = {
      identifier: selectedIdentifier,
      name: selectedName,
      project: projectId,
    };

    axios
      .post(`${url}?project=${projectId}`, newSiteType)
      .then(res => {
        this.setState(
          state => ({
            ...INITIAL_STATE,
            siteType: [...state.siteType, { ...res.data }],
          }),
          () =>
            successToast(
              !isEmpty(terms) ? `${terms.site} Type` : 'Site Type',
              'added',
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
    const { siteType } = this.state;
    const selectedSiteId = siteType.find(site => site.id === id);
    this.setState({
      showModal: true,
      selectedId: id,
      selectedIdentifier: selectedSiteId.identifier,
      selectedName: selectedSiteId.name,
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
      () => {
        const {
          state: { selectedId, siteType },
          context: { terms },
        } = this;

        const filteredSiteType = siteType.filter(
          site => site.id !== +selectedId,
        );
        axios
          .delete(`${url}${selectedId}/`)
          .then(res => {
            this.setState(
              {
                ...INITIAL_STATE,
                siteType: filteredSiteType,
              },
              () =>
                successToast(
                  !isEmpty(terms)
                    ? `${terms.site} Type`
                    : 'Site Type',
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
      },
    );
  };

  cancelHandler = () => {
    this.setState({
      showDeleteConfirmation: false,
      selectedId: '',
    });
  };

  onChangeHandler = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const {
      state: {
        showModal,
        isLoading,
        siteType,
        selectedIdentifier,
        selectedName,
        showDeleteConfirmation,
      },
      toggleModal,
      editHandler,
      removeHandler,
      onChangeHandler,
      onSubmitHandler,
      cancelHandler,
      confirmHandler,
      context: { terms },
    } = this;
    return (
      <>
        <RightContentCard
          title={!isEmpty(terms) ? `${terms.site} Type` : 'Site Type'}
          addButton
          toggleModal={toggleModal}
          hideButton
        >
          <Table
            page="siteType"
            tableHeader={tableHeader.siteTypes}
            tableRow={siteType}
            removeHandler={removeHandler}
            editHandler={editHandler}
          />
        </RightContentCard>
        {isLoading && <Loader />}
        {showModal && (
          <Modal
            title={
              !isEmpty(terms)
                ? `Add ${terms.site} Type`
                : 'Add Site Type'
            }
            toggleModal={toggleModal}
          >
            <form
              className="floating-form"
              onSubmit={onSubmitHandler}
            >
              <InputElement
                tag="input"
                type="text"
                required
                label="ID"
                formType="floatingForm"
                htmlFor="input"
                name="selectedIdentifier"
                value={selectedIdentifier}
                changeHandler={onChangeHandler}
              />
              <InputElement
                tag="textarea"
                type="text"
                required
                label="Type"
                formType="floatingForm"
                htmlFor="textarea"
                name="selectedName"
                value={selectedName}
                changeHandler={onChangeHandler}
              />
              <div className="form-group pull-right no-margin">
                <button type="submit" className="fieldsight-btn">
                  Save
                </button>
              </div>
            </form>
          </Modal>
        )}
        {showDeleteConfirmation && (
          <Modal title="Warning" toggleModal={cancelHandler}>
            <div className="warning">
              <i className="la la-exclamation-triangle" />

              <p>
                Are you sure you want to delete the
                {!isEmpty(terms) ? `${terms.site} Type` : 'Site Type'}
                ?
              </p>
            </div>
            <div className="warning-footer text-center">
              <a
                role="button"
                onKeyDown={this.handleKeyDown}
                tabIndex="0"
                className="fieldsight-btn rejected-btn"
                onClick={cancelHandler}
              >
                cancel
              </a>
              <a
                className="fieldsight-btn"
                role="button"
                onKeyDown={this.handleKeyDown}
                tabIndex="0"
                onClick={confirmHandler}
              >
                confirm
              </a>
            </div>
          </Modal>
        )}
      </>
    );
  }
}

export default SiteType;
