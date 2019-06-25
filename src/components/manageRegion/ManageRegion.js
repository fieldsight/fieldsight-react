import React, { Component, Fragment } from "react";
import Table from "../common/Table";
import FormModal from "../common/FormModal";
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
          <FormModal
            title="Add site type"
            toggleModal={toggleModal}
            submitHandler={onSubmitHandler}
          >
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
          </FormModal>
        )}
      </Fragment>
    );
  }
}

export default ManageRegion;
