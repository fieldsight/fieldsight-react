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
  //   "https://fieldsight.naxa.com.np/fv3/api/project-site-types"
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
      .get(urls[0], {
        headers: {
          Authorization: "91a844e62e86b6e336b8fb440340cbeaabf601fe"
        }
      })
      .then(res => {
        this.setState({
          siteType: res.data
        });
      })
      .catch(err => console.log("err", err));
  }

  onSubmitHandler = e => {
    // e.preventDefault();
    // const {
    //   selectedId,
    //   selectedIdentifier,
    //   selectedName,
    //   siteType
    // } = this.state;
    // const newSiteType = [...siteType];
    // const selectedSite = newSiteType.find(site => site.id === +selectedId);
    // selectedSite.identifier = selectedIdentifier;
    // selectedSite.name = selectedName;
    // this.setState(
    //   {
    //     ...INITIAL_STATE,
    //     siteType: newSiteType
    //   },
    //   () =>
    //     axios
    //       .put(
    //         `${urls[1]}/${selectedId}/`,
    //         {
    //           identifier: selectedSite.identifier,
    //           name: selectedSite.name,
    //           project: selectedSite.project
    //         },
    //         {
    //           headers: {
    //             Authorization: "91a844e62e86b6e336b8fb440340cbeaabf601fe"
    //           }
    //         }
    //       )
    //       .then(res => {
    //         console.log("response", res);
    //       })
    //       .catch(err => console.log("err", err))
    // );
  };

  editHandler = id => {
    // const selectedSiteId = this.state.siteType.find(site => site.id === id);
    // this.setState({
    //   showModal: true,
    //   selectedId: id,
    //   selectedIdentifier: selectedSiteId.identifier,
    //   selectedName: selectedSiteId.name
    // });
  };

  removeHandler = id => {
    // const filteredSiteType = this.state.siteType.filter(site => site.id !== id);
    // this.setState(
    //   {
    //     ...INITIAL_STATE,
    //     siteType: filteredSiteType
    //   },
    //   () =>
    //     axios
    //       .delete(`${urls[1]}/${id}/`, {
    //         headers: {
    //           Authorization: "91a844e62e86b6e336b8fb440340cbeaabf601fe"
    //         }
    //       })
    //       .then(res => {
    //         console.log("response", res);
    //       })
    //       .catch(err => console.log("err", err))
    // );
  };

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
