import React, { Component, Fragment } from "react";
import axios from "axios";
import Table from "../common/Table";
import Modal from "../common/Modal";
import InputElement from "../common/InputElement";
import RightContentCard from "../common/RightContentCard";
import Loader from "../common/Loader";
import { successToast, errorToast } from "../../utils/toastHandler";

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
  isLoading: false,
  showDeleteConfirmation: false
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
          this.setState(
            {
              ...INITIAL_STATE,
              siteType: newSiteType
            },
            () => successToast("Site", "updated")
          );
        })
        .catch(err => {
          this.setState(
            {
              isLoading: false,
              selectedId: ""
            },
            errorToast
          );
        });
    }

    const newSiteType = {
      identifier: selectedIdentifier,
      name: selectedName,
      project: 137
    };

    axios
      .post(urls[0], newSiteType)
      .then(res => {
        this.setState(
          {
            ...INITIAL_STATE,
            siteType: [...this.state.siteType, { ...res.data }]
          },
          () => successToast("Site", "added")
        );
      })
      .catch(err => {
        this.setState(
          {
            isLoading: false
          },
          errorToast
        );
      });
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
    this.setState({
      showDeleteConfirmation: true,
      selectedId: id
    });
  };

  confirmHandler = () => {
    this.setState(
      {
        showDeleteConfirmation: false,
        isLoading: true
      },
      () => {
        const { selectedId, siteType } = this.state;
        const filteredSiteType = siteType.filter(
          site => site.id !== +selectedId
        );
        axios
          .delete(`${urls[1]}/${selectedId}/`)
          .then(res => {
            res.status === 200
              ? this.setState(
                  {
                    ...INITIAL_STATE,
                    siteType: filteredSiteType
                  },
                  () => successToast("Site", "deleted")
                )
              : null;
          })
          .catch(err => {
            this.setState(
              {
                isLoading: false
              },
              errorToast
            );
          });
      }
    );
  };

  cancelHandler = () => {
    this.setState({
      showDeleteConfirmation: false,
      selectedId: ""
    });
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
        selectedName,
        showDeleteConfirmation
      },
      toggleModal,
      editHandler,
      removeHandler,
      onChangeHandler,
      onSubmitHandler,
      cancelHandler,
      confirmHandler
    } = this;
    return (
      <Fragment>
        <RightContentCard
          title="Site Type"
          addButton
          toggleModal={toggleModal}
          hideButton={true}
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
        {showDeleteConfirmation && (
          <Modal
            title="Warning"
            toggleModal={() => this.setState({ showDeleteConfirmation: false })}
          >
            <div className="warning">
              <i className="la la-exclamation-triangle" />
              {/* <h4>Warning</h4> */}
              <p>
                "All the form submissions and user roles within this site will
                be completely removed. Do you still want to continue?"
              </p>
            </div>
            <div className="warning-footer text-center">
              <a
                className="fieldsight-btn rejected-btn"
                onClick={cancelHandler}
              >
                cancel
              </a>
              <a className="fieldsight-btn" onClick={confirmHandler}>
                confirm
              </a>
            </div>
          </Modal>
        )}
      </Fragment>
    );
  }
}

export default SiteType;
