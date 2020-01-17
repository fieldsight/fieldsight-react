import React, { Component } from 'react';
import axios from 'axios';

import {
  errorToast,
  successToast,
} from '../../../utils/toastHandler';
import RightContentCard from '../../common/RightContentCard';
import Modal from '../../common/Modal';
import DeleteModal from '../../common/DeleteModal';
import FormTable from './formTable';
import SelectElement from '../../common/SelectElement';
import GeneralFormModal from './generalForm';
import ScheduleFormModal from './scheduleform';
// import OrganizationForm from './organizationForm';

/* eslint-disable  react/no-unused-state */
/* eslint-disable camelcase */

export default class MyForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      popUpPage: false,
      scheduled_forms: [],
      selectId: '',
      forms: [{ id: '', title: 'Select Form' }],
      selected: [],
      openModal: false,
      form_id: '',
      selectValue: '3',
      generalPopUp: false,
      schedulePopUp: false,
      general_forms: [],
      form_type: '',
      checkbox: [],
      activeTab: 'myForms',
      organization_library_forms: [],
      selectOrganization: [],
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
        console.log(res, 'res');
        const newArr = forms;
        this.setState(() => {
          if (res.data.forms !== undefined) {
            res.data.forms.map(arrPush => newArr.push(arrPush));
          }
          return {
            forms: newArr,
            scheduled_forms: res.data.selected_forms.scheduled_forms,
            general_forms: res.data.selected_forms.general_forms,
            organization_library_forms:
              res.data.organization_library_forms,
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
    this.setState({
      popUpPage: false,
    });
  };

  changeHandler = e => {
    const { checked, value } = e.target;

    if (checked) {
      this.setState(prevState => ({
        selected: [...prevState.selected, value],
      }));
    }

    if (!checked) {
      this.setState(preveState => ({
        selected: preveState.selected.filter(
          region => region !== value,
        ),
      }));
    }
  };

  openDelete = (form_id, form_type) => {
    this.setState(prevState => ({
      openModal: !prevState.openModal,
      form_id,
      form_type,
    }));
  };

  handleConfirm = () => {
    const {
      general_forms,
      scheduled_forms,
      form_id,
      form_type,
    } = this.state;
    const { id } = this.props;
    const body = { xf_id: form_id };

    axios
      .post(
        `/fv3/api/manage-super-organizations-library/${id}/`,
        body,
      )
      .then(async res => {
        if (res.status === 200) {
          if (form_type === 'general') {
            successToast('General Form', 'removed');
            const delet = general_forms.filter(
              data => form_id !== data.id,
            );

            await this.setState({
              general_forms: delet,
              openModal: false,
            });
          }
          if (form_type === 'scheduled') {
            successToast('Schedule Form', 'removed');
            const delet = scheduled_forms.filter(
              data => form_id !== data.id,
            );

            await this.setState({
              scheduled_forms: delet,
              openModal: false,
            });
          }
        }
      })
      .catch(err => {
        const error = err.response.data;
        Object.entries(error).map(([key, value]) => {
          return errorToast(`${value}`);
        });
      });
  };

  handleCancle = () => {
    this.setState({
      openModal: false,
    });
  };

  onchange = e => {
    const { value } = e.target;
    this.setState(
      {
        selectValue: value,
      },
      () => {
        if (value === '0') {
          this.setState(prevstate => ({
            generalPopUp: !prevstate.generalPopUp,
          }));
        }
        if (value === '1') {
          this.setState(prevstate => ({
            schedulePopUp: !prevstate.schedulePopUp,
          }));
        }
      },
    );
  };

  selectHandler = e => {
    const { value } = e.target;
    this.setState({
      selectId: value,
    });
  };

  generalCloseButton = () => {
    this.setState({
      generalPopUp: false,
    });
  };

  scheduleCloseButton = () => {
    this.setState({
      schedulePopUp: false,
    });
  };

  handleAllModel = res => {
    this.setState(
      {
        schedulePopUp: false,
        popUpPage: false,
        generalPopUp: false,
        general_forms: res.data.general_forms,
        scheduled_forms: res.data.scheduled_forms,
        selected: [],
        checkbox: [],
        selectId: [],
        selectOrganization: [],
      },
      () => successToast('Sucessfully', 'added'),
    );
  };

  checkboxhandler = e => {
    const { id, checked } = e.target;
    this.setState(prevState => {
      if (checked) {
        return { checkbox: [...prevState.checkbox, id] };
      }
      if (!checked) {
        return {
          checkbox: prevState.checkbox.filter(
            region => region !== id,
          ),
        };
      }
      return null;
    });
  };

  toggleTab = result => {
    this.setState({
      activeTab: result,
    });
  };

  OrganizationHandler = e => {
    const { value } = e.target;

    this.setState({
      selectOrganization: value,
    });
  };

  render() {
    const {
      state: {
        selectValue,
        scheduled_forms,
        selectId,
        general_forms,
        // selected_forms,
        popUpPage,
        // selected,
        forms,
        openModal,
        generalPopUp,
        schedulePopUp,
        activeTab,
        organization_library_forms,
        selectOrganization,
      },
      props: { id },
      // changeHandler,
      // handleClosePopup,
      openDelete,
      handleCancle,
      handleConfirm,
      scheduleCloseButton,
      handleAllModel,
      toggleTab,
    } = this;

    const option1 = [
      { id: '3', name: 'Select Option' },
      { id: '0', name: 'general' },
      { id: '1', name: 'schedule' },
    ];

    return (
      <>
        <RightContentCard
          title="Form"
          addButton
          toggleModal={this.handleChange}
          buttonName="Add"
        >
          <FormTable
            selected_forms={scheduled_forms}
            openDelete={openDelete}
            general_forms={general_forms}
          />
        </RightContentCard>
        {popUpPage && (
          <Modal
            title="Add Form"
            toggleModal={this.handleClosePopup}
            showButton
            showText="create form"
            url="/forms/create/"
          >
            <ul className="nav nav-tabs ">
              <li className="nav-item">
                <a
                  className={
                    activeTab === 'myForms'
                      ? 'nav-link active'
                      : 'nav-link'
                  }
                  onClick={() => toggleTab('myForms')}
                  tabIndex="0"
                  role="button"
                  onKeyDown={() => toggleTab('myForms')}
                >
                  My Forms
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={
                    activeTab === 'organizationForm'
                      ? 'nav-link active'
                      : 'nav-link'
                  }
                  onClick={() => toggleTab('organizationForm')}
                  tabIndex="0"
                  role="button"
                  onKeyDown={() => toggleTab('organizationForm')}
                >
                  Organization Forms
                </a>
              </li>
            </ul>

            {activeTab === 'myForms' && (
              <form className="floating-form">
                <div className="row">
                  <div className="col-xl-12 col-md-12">
                    <SelectElement
                      className="form-control"
                      options={forms}
                      changeHandler={this.selectHandler}
                      label="Form List"
                      value={selectId}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-xl-12 col-md-12">
                    <SelectElement
                      className="form-control"
                      options={option1}
                      changeHandler={this.onchange}
                      label="type"
                      value={selectValue}
                    />
                  </div>
                </div>
              </form>
            )}
            {activeTab === 'organizationForm' && (
              <form className="floating-form">
                <div className="row">
                  <div className="col-xl-12 col-md-12">
                    <SelectElement
                      className="form-control"
                      options={organization_library_forms}
                      changeHandler={this.OrganizationHandler}
                      label="Form List"
                      value={selectOrganization}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-xl-12 col-md-12">
                    <SelectElement
                      className="form-control"
                      options={option1}
                      changeHandler={this.onchange}
                      label="type"
                      value={selectValue}
                    />
                  </div>
                </div>
              </form>
              // <OrganizationForm
              //   organization_library_forms={
              //     organization_library_forms
              //   }
              // />
            )}
          </Modal>
        )}

        {openModal && (
          <DeleteModal
            onCancel={handleCancle}
            onConfirm={handleConfirm}
            onToggle={handleCancle}
            title="Warning"
            message="Are u sure u want to delete"
          />
        )}

        {selectValue === '0' && generalPopUp && (
          <Modal
            title="General Form"
            toggleModal={this.generalCloseButton}
          >
            <GeneralFormModal
              selected={selectId}
              // selected={this.state.checkbox}
              formType={selectValue}
              organization={selectOrganization}
              id={id}
              handleAllModel={handleAllModel}
            />
          </Modal>
        )}

        {selectValue === '1' && schedulePopUp && (
          <Modal
            title="Schedule Form"
            toggleModal={scheduleCloseButton}
          >
            <ScheduleFormModal
              selected={selectId}
              organization={selectOrganization}
              // selected={this.state.checkbox}
              formType={selectValue}
              handleAllModel={handleAllModel}
              id={id}
            />
          </Modal>
        )}
      </>
    );
  }
}
