import React, { Component, Fragment } from "react";
import Table from "../common/Table";
import Modal from "../common/Modal";
import InputElement from "../common/InputElement";
import RightContentCard from "../common/RightContentCard";
import axios from "axios";

const tableHeader = {
  siteTypes: ["Region ID", "Region Name", "Created Date", "Action"]
};

const urls = [
  "https://fieldsight.naxa.com.np/fv3/api/project-regions/?project=137"
];

const INITIAL_STATE = {
  showModal: false,
  siteType: [],
  selectedId: "",
  selectedIdentifier: "",
  selectedName: ""
};
class ManageRegion extends Component {
  state = INITIAL_STATE;

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal
    }));
  };

  componentDidMount() {
    axios
      .get(urls[0])
      .then(res => {
        this.setState({
          siteType: res.data
        });
      })
      .catch(err => console.log("err", err));
  }

  onSubmitHandler = e => {};

  editHandler = id => {};

  removeHandler = id => {};

  onChangeHandler = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  render() {
    const {
      state: { showModal, siteType, selectedIdentifier, selectedName },
      toggleModal,
      editHandler,
      removeHandler,
      onChangeHandler,
      onSubmitHandler
    } = this;
    return (
      <Fragment>
        <RightContentCard title="Site Type" addButton toggleModal={toggleModal}>
          <Table
            page="manageRegion"
            tableHeader={tableHeader.siteTypes}
            tableRow={siteType}
            removeHandler={removeHandler}
            editHandler={editHandler}
          />
        </RightContentCard>
        {showModal && (
          <Modal title="Add site type" toggleModal={toggleModal}>
            <form className="floating-form" onSubmit={onSubmitHandler}>
              <InputElement
                tag="input"
                type="text"
                required={true}
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
                required={true}
                label="Type"
                formType="floatingForm"
                htmlFor="textarea"
                name="selectedName"
                value={selectedName}
                changeHandler={onChangeHandler}
              />{" "}
              <div className="form-group pull-right no-margin">
                <button type="submit" className="fieldsight-btn">
                  Save
                </button>
              </div>
            </form>
          </Modal>
        )}
      </Fragment>
    );
  }
}

export default ManageRegion;
