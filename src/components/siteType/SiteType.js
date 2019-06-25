import React, { Component, Fragment } from "react";
import axios from "axios";
import Table from "../common/Table";
import FormModal from "../common/FormModal";
import InputElement from "../common/InputElement";
import RightContentCard from "../common/RightContentCard";
import Loader from "../common/Loader";

const tableHeader = {
  siteTypes: ["ID", "Type", "Action"]
};

const urls = [
  "https://fieldsight.naxa.com.np/fv3/api/project-site-types/?project=137",
  "https://fieldsight.naxa.com.np/fv3/api/project-site-types"
];

const INITIAL_STATE = {
  showModal: false,
  siteType: [],
  selectedId: "",
  selectedIdentifier: "",
  selectedName: "",
  isLoading: false
};
class SiteType extends Component {
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

  // addHandler = e => {
  //   const { selectedIdentifier, selectedName } = this.state;
  //   const siteType = {
  //     identifier: selectedIdentifier,
  //     name: selectedName,
  //     project: 137
  //   };

  // };
  requestHandler = () => {
    const {
      selectedId,
      selectedIdentifier,
      selectedName,
      siteType
    } = this.state;

    if (selectedId) {
      const newSiteType = [...siteType];
      const selectedSite = newSiteType.find(site => site.id === +selectedId);
      selectedSite.identifier = selectedIdentifier;
      selectedSite.name = selectedName;

      return axios
        .put(`${urls[1]}/${selectedId}/`, {
          identifier: selectedSite.identifier,
          name: selectedSite.name,
          project: selectedSite.project
        })
        .then(res => {
          console.log("response", res);
          this.setState({
            ...INITIAL_STATE,
            siteType: newSiteType
          });
        })
        .catch(err => console.log("err", err));
    }

    const newSiteType = {
      identifier: selectedIdentifier,
      name: selectedName,
      project: 137
    };

    axios
      .post(urls[0], newSiteType)
      .then(res => {
        this.setState({
          ...INITIAL_STATE,
          siteType: [...this.state.siteType, { ...res.data }]
        });
      })
      .catch(err => console.log("err", err));
  };

  onSubmitHandler = (e, edit) => {
    e.preventDefault();
    this.setState(
      {
        isLoading: true,
        showModal: false
      },
      this.requestHandler
    );
  };

  editHandler = id => {
    const selectedSiteId = this.state.siteType.find(site => site.id === id);
    this.setState({
      showModal: true,
      selectedId: id,
      selectedIdentifier: selectedSiteId.identifier,
      selectedName: selectedSiteId.name
    });
  };

  removeHandler = id => {
    const filteredSiteType = this.state.siteType.filter(site => site.id !== id);
    axios
      .delete(`${urls[1]}/${id}/`)
      .then(res => {
        res.status === 200
          ? this.setState({
              ...INITIAL_STATE,
              siteType: filteredSiteType
            })
          : null;
      })
      .catch(err => console.log("err", err));
  };

  onChangeHandler = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  render() {
    const {
      state: {
        showModal,
        isLoading,
        siteType,
        selectedIdentifier,
        selectedName
      },
      toggleModal,
      editHandler,
      removeHandler,
      onChangeHandler,
      onSubmitHandler
    } = this;
    return (
      <Fragment>
        <RightContentCard
          title="Site Type"
          addButton
          toggleModal={toggleModal}
          hideButton={true}
          // submitHandler={addHandler}
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

export default SiteType;
