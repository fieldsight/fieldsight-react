import React, { Component } from 'react';
import axios from 'axios';
import RightContentCard from '../../common/RightContentCard';
import FormTable from './formTable';
import Modal from '../../common/Modal';
import GeneralFormModal from './generalForm';
import ScheduleFormModal from './scheduleform';
import SelectElement from '../../common/SelectElement';

export default class Library extends Component {
  constructor(props) {
    super(props);
    this.state = {
      popUpPage: false,
      schedulePopUp: false,
      generalPopUp: false,
      selectValue: '',
    };
  }

  // componentDidMount(){
  //   axios.get(``)
  //   .then(res=>{

  //   }).catch()
  // }

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

  render() {
    const {
      state: { popUpPage, selectValue, generalPopUp, schedulePopUp },
      scheduleCloseButton,
      generalCloseButton,
    } = this;
    const option1 = [
      { id: '3', name: 'Select Option' },
      { id: '0', name: 'general' },
      { id: '1', name: 'schedule' },
    ];
    return (
      <>
        <RightContentCard
          title="Library"
          addButton
          toggleModal={this.handleChange}
          buttonName="Add"
        >
          <FormTable />
        </RightContentCard>
        {popUpPage && (
          <Modal
            title="Add Form"
            toggleModal={this.handleClosePopup}
            showButton
            // showText="create form"
            // url="/forms/create/"
          >
            <form className="floating-form">
              <div className="row">
                <div className="col-xl-12 col-md-12">
                  {/* <SelectElement
                    className="form-control"
                    options={forms}
                    changeHandler={this.selectHandler}
                    label="Form List"
                    value={selectId}
                  /> */}
                  <label>fghj</label>
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
          </Modal>
        )}

        {selectValue === '0' && generalPopUp && (
          <Modal
            title="General Form"
            toggleModal={this.generalCloseButton}
          >
            <GeneralFormModal />
            {/* // selected={selectId}
            // // selected={this.state.checkbox}
            // formType={selectValue}
            // id={id}
            // handleAllModel={handleAllModel}
            /> */}
          </Modal>
        )}

        {selectValue === '1' && schedulePopUp && (
          <Modal
            title="Schedule Form"
            toggleModal={scheduleCloseButton}
          >
            <ScheduleFormModal />
            {/* { // selected={selectId}
            // // selected={this.state.checkbox}
            // formType={selectValue}
            // handleAllModel={handleAllModel}
            // id={id}
            // />} */}
          </Modal>
        )}
      </>
    );
  }
}
