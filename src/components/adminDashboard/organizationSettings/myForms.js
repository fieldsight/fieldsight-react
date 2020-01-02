import React, { Component } from 'react';
import axios from 'axios';
import RightContentCard from '../../common/RightContentCard';
import Modal from '../../common/Modal';
import DeleteModal from '../../common/DeleteModal';
import FormTable from './formTable';

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
    };
  }

  componentDidMount() {
    const { id } = this.props;
    axios
      .get(`/fv3/api/manage-super-organizations-library/${id}/`)
      .then(res => {
        console.log(res, 'res');
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
    console.log(body, 'body');
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
        console.log(res);
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

  render() {
    const {
      state: {
        selected_forms,
        popUpPage,
        selected,
        forms,
        openModal,
      },
      props: { id },
      changeHandler,
      handleClosePopup,
      openDelete,
      handleCancle,
      handleConfirm,
    } = this;
    console.log(selected_forms, 'selected_teams');
    return (
      <>
        <RightContentCard
          title="Form Library"
          addButton
          toggleModal={this.handleChange}
          buttonName="Add "
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
            url={`/fieldsight/application/#/create-team/${id}`}
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
                <div className="form-group pull-right no-margin">
                  <button
                    type="button"
                    className="fieldsight-btn"
                    onClick={this.handleSaveForm}
                  >
                    Add
                  </button>
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
      </>
    );
  }
}
