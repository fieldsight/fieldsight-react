import React, { Component } from 'react';
import axios from 'axios';
import RightContentCard from '../../common/RightContentCard';
import ManageModal from '../../manageForms/ManageModal';
import Modal from '../../common/Modal';
import Loader from '../../common/Loader';
import {
  errorToast,
  successToast,
} from '../../../utils/toastHandler';

import LibraryTable from './libraryTable';

import DeleteModal from '../../common/DeleteModal';

/* eslint-disable  react/no-unused-state */
/* eslint-disable camelcase */
export default class Library extends Component {
  constructor(props) {
    super(props);
    this.state = {
      popUpPage: false,
      selectedArr: [],
      selectValue: '',
      forms: [{ id: '', title: 'Select Form' }],
      scheduled_forms: [],
      general_forms: [],
      openModal: false,
      form_id: '',
      form_type: '',
      selectId: [],
      organization_library_forms: [],
      toggleButton: false,
      handleToggle: false,
      selected_organization_library_forms: [],
      libraryId: '',
      openDeleteModal: false,
      loader: false,
      saveLoader: '',
    };
  }

  componentDidMount() {
    const {
      props: { id },
      state: { forms },
    } = this;
    axios
      .get(`/fv3/api/manage-super-organizations-library/${id}/`)
      .then(res => {
        this.setState(() => {
          return {
            organization_library_forms: res.data.forms,
            selected_organization_library_forms:
              res.data.selected_organization_library_forms,
            loader: true,
            masterorganization_library_forms: res.data.forms,
          };
        });
      })
      .catch();
  }

  handleChange = () => {
    this.setState(preveState => ({
      popUpPage: !preveState.popUpPage,
    }));
  };

  handleClosePopup = () => {
    this.setState(preveState => ({
      popUpPage: !preveState.popUpPage,
    }));
  };

  selectHandler = e => {
    const { value } = e.target;
    this.setState({
      selectId: value,
    });
  };

  toggleSelectClass = () => {
    this.setState(prev => ({
      toggleButton: !prev.toggleButton,
    }));
  };

  handleToggleClass = () => {
    this.setState(prev => ({
      handleToggle: !prev.handleToggle,
    }));
  };

  handleCheck = async e => {
    const { id, checked } = e.target;

    await this.setState(prevState => {
      if (checked) {
        const key = 'xf_id';
        return {
          selectedArr: [
            ...prevState.selectedArr,
            { [key]: JSON.parse(id) },
          ],
        };
      }
      if (!checked) {
        return {
          selectedArr: prevState.selectedArr.filter(
            region => region.id !== JSON.parse(id),
          ),
        };
      }
      return null;
    });
  };

  handleSubmit = e => {
    e.preventDefault(e);
    this.setState({
      saveLoader: false,
    });

    const {
      props: { id },
      state: { selectedArr },
    } = this;
    const result = selectedArr.map(function(x) {
      return x.xf_id;
    });
    const body = {
      xf_ids: result,
      is_form_library: true,
    };

    axios
      .post(
        `/fv3/api/manage-super-organizations-library/${id}/`,
        body,
      )
      .then(res => {
        if (res.status === 201) {
          successToast('Organization Library Form', 'created');
          this.setState(State => ({
            saveLoader: !State.saveLoader,
            popUpPage: false,
            selected_organization_library_forms:
              res.data.organization_library_forms,
            selectedArr: [],
          }));
        }
      })
      .catch(err => {
        const error = err.response.data;
        Object.entries(error).map(([key, value]) => {
          return errorToast(`${value}`);
        });
      });
  };

  openDelete = libraryId => {
    this.setState(prevState => ({
      libraryId,
      openDeleteModal: !prevState.openDeleteModal,
    }));
  };

  handleCancel = () => {
    this.setState({
      openDeleteModal: false,
    });
  };

  handleConfirm = () => {
    const {
      state: { selected_organization_library_forms, libraryId },
      props: { id },
    } = this;

    const body = { id: libraryId };

    axios
      .post(
        `/fv3/api/manage-super-organizations-library/${id}/`,
        body,
      )
      .then(async res => {
        if (res.status === 200) {
          successToast('Organization Library', 'removed');
          const delet = selected_organization_library_forms.filter(
            data => libraryId !== data.id,
          );

          await this.setState({
            selected_organization_library_forms: delet,
            openDeleteModal: false,
          });
        }
      })
      .catch(err => {
        const error = err.response.data;
        Object.entries(error).map(([key, value]) => {
          return errorToast(`${value}`);
        });
      });
  };

  onChangeHandler = async e => {
    const { value } = e.target;
    const {
      masterorganization_library_forms,
      organization_library_forms,
    } = this.state;
    if (value) {
      const search = await organization_library_forms.filter(
        result => {
          return result.title
            .toLowerCase()
            .includes(value.toLowerCase());
        },
      );
      this.setState({
        organization_library_forms: search,
      });
    } else {
      this.setState({
        organization_library_forms: masterorganization_library_forms,
      });
    }
  };

  render() {
    const {
      state: {
        popUpPage,
        openDeleteModal,
        organization_library_forms,
        selected_organization_library_forms,
        loader,
        saveLoader,
      },
      props: { id },
      handleCancel,
      handleConfirm,
    } = this;

    return (
      <>
        {saveLoader === false && <Loader />}

        <RightContentCard
          title="Organization Library Forms"
          addButton
          toggleModal={this.handleChange}
          // buttonName="Add"
        >
          <LibraryTable
            organization_library_forms={
              selected_organization_library_forms
            }
            openDelete={this.openDelete}
            loader={loader}
          />
        </RightContentCard>

        {popUpPage && (
          <ManageModal
            title="Add form to library"
            toggleModal={this.handleClosePopup}
            handleSubmit={this.handleSubmit}
            showButton
            showText="Create Form"
            url="/forms/create/"
          >
            <>
              <div className="form-group search-group mrt-15">
                <input
                  type="search"
                  className="form-control"
                  placeholder="Search"
                  onChange={e => this.onChangeHandler(e)}
                />
                <i className="la la-search" />
              </div>
              <div
                style={{
                  position: 'relative',
                  height: `200px`,
                }}
              >
                {organization_library_forms.length > 0 &&
                  organization_library_forms.map((option, index) => {
                    const filterList = this.state.selectedArr.filter(
                      i => i.xf_id === option.xf_id,
                    );

                    const isChecked =
                      filterList && filterList[0] ? true : false;

                    return (
                      <div key={option.id}>
                        <div className="custom-control custom-checkbox">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id={option.xf_id}
                            name={option.title}
                            checked={isChecked}
                            onChange={e => {
                              this.handleCheck(e, option);
                            }}
                          />
                          <label
                            className="custom-control-label"
                            htmlFor={option.xf_id}
                            style={{ paddingLeft: '2em' }}
                          >
                            {option.title}
                          </label>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </>
          </ManageModal>
        )}
        {openDeleteModal && (
          <DeleteModal
            onCancel={handleCancel}
            onConfirm={handleConfirm}
            onToggle={handleCancel}
            title="Warning"
            message="Are you sure you want to remove?"
          />
        )}
      </>
    );
  }
}
