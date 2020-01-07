import React, { Component } from 'react';
import axios from 'axios';
import RightContentCard from '../../common/RightContentCard';
import Modal from '../../common/Modal';
import DeleteModal from '../../common/DeleteModal';
import FormTable from './formTable';
import SelectElement from '../../common/SelectElement';
import GeneralFormModal from './generalForm';
import ScheduleFormModal from './scheduleform';

/* eslint-disable  react/no-unused-state */
/* eslint-disable camelcase */

export default class MyForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      popUpPage: false,
      selected_forms: [],
      forms: [],
      selected: [],
      openModal: false,
      form_id: '',
      selectValue: '3',
      generalPopUp: false,
      schedulePopUp: false,
    };
  }

  componentDidMount() {
    const { id } = this.props;
    axios
      .get(`/fv3/api/manage-super-organizations-library/${id}/`)
      .then(res => {
        this.setState({
          forms: res.data.forms,
          selected_forms: res.data.selected_forms,
        });
      })
      .catch(err => {});
  }

  handleChange = () => {
    this.setState({
      popUpPage: true,
    });
  };

  handleClosePopup = () => {
    this.setState({
      popUpPage: false,
    });
  };

  changeHandler = e => {
    const { id, checked, value } = e.target;

    if (checked) {
      this.setState(prevState => ({
        selected: [...prevState.selected, JSON.parse(value)],
      }));
    }

    if (!checked) {
      this.setState(preveState => ({
        selected: preveState.selected.filter(
          region => region !== JSON.parse(value),
        ),
      }));
    }
  };

  handleSaveForm = () => {
    const { id } = this.props;
    const body = { xf_ids: this.state.selected };

    axios
      .post(
        `/fv3/api/manage-super-organizations-library/${id}/`,
        body,
      )
      .then(res => {
        if (res.status === 201) {
          this.setState({
            popUpPage: false,
            selected_forms: res.data,
          });
        }
      })
      .catch(err => {});
  };

  openDelete = form_id => {
    this.setState(prevState => ({
      openModal: !prevState.openModal,
      form_id,
    }));
  };

  handleConfirm = () => {
    const { selected_forms, form_id } = this.state;
    const { id } = this.props;
    const body = { xf_id: form_id };

    axios
      .post(
        `/fv3/api/manage-super-organizations-library/${id}/`,
        body,
      )
      .then(res => {
        if (res.status === 200) {
          const delet = selected_forms.filter(
            data => form_id !== data.id,
          );
          this.setState({
            selected_forms: delet,
            openModal: false,
          });
        }
      })
      .catch(() => {
        // console.log(err);
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
    this.setState({
      schedulePopUp: false,
      popUpPage: false,
      generalPopUp: false,
      selected_forms: res.data,
    });
  };

  render() {
    const {
      state: {
        selected_forms,
        popUpPage,
        selected,
        forms,
        openModal,
        generalPopUp,
        schedulePopUp,
      },
      props: { id },
      changeHandler,
      handleClosePopup,
      openDelete,
      handleCancle,
      handleConfirm,
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
            selected_forms={selected_forms}
            openDelete={openDelete}
          />
        </RightContentCard>
        {popUpPage && (
          <Modal
            title="Add Form"
            toggleModal={this.handleClosePopup}
            showButton
            showText="create form"
            url="#"
          >
            <form className="floating-form">
              <ul>
                {forms.length > 0 &&
                  forms.map(option => (
                    <li key={`option_${option.id}`}>
                      <div className="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id={option.id}
                          name={option.title}
                          checked={selected[option.id]}
                          onChange={changeHandler}
                          value={option.id}
                        />
                        <label
                          className="custom-control-label"
                          htmlFor={option.id}
                          style={{ paddingLeft: '2em' }}
                        >
                          {option.title}
                        </label>
                      </div>
                    </li>
                  ))}
              </ul>
              <div className="modal-footer">
                <div className="col-xl-4 col-md-6">
                  <SelectElement
                    className="form-control"
                    options={option1}
                    changeHandler={this.onchange}
                    label="type"
                    value={this.state.selectValue}
                  />
                </div>
              </div>
            </form>
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

        {this.state.selectValue === '0' && generalPopUp && (
          <Modal
            title="General Form"
            toggleModal={this.generalCloseButton}
          >
            <GeneralFormModal
              selected={this.state.selected}
              formType={this.state.selectValue}
              id={this.props.id}
              handleAllModel={this.handleAllModel}
            />
          </Modal>
        )}

        {this.state.selectValue === '1' && schedulePopUp && (
          <Modal
            title="Schedule Form"
            toggleModal={this.scheduleCloseButton}
          >
            <ScheduleFormModal
              selected={this.state.selected}
              formType={this.state.selectValue}
              handleAllModel={this.handleAllModel}
              id={this.props.id}
            />
          </Modal>
        )}
      </>
    );
  }
}
