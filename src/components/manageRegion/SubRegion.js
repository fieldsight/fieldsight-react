import React, { Component, Fragment } from "react";
import axios from "axios";
import WithContext from "../../hoc/WithContext";
import Modal from "../common/Modal";
import Table from "../common/Table";
import InputElement from "../common/InputElement";
import RightContentCard from "../common/RightContentCard";
import Loader from "../common/Loader";

const url = "fv3/api/project-regions/";

const tableHeader = {
  manageRegions: ["Region ID", "Region Name", "Created Date", "Action"]
};

class SubRegion extends Component {
  _isMounted = false;

  componentDidMount() {
    this._isMounted = true;
    const {
      match: {
        params: { subRegionId }
      },
      value: { setSubRegion, projectId }
    } = this.props;
    if (subRegionId) {
      axios
        .get(`${url}?project=${projectId}&region=${subRegionId}`)
        .then(res => {
          this._isMounted && setSubRegion(res.data, subRegionId);
        })
        .catch(err => console.log("Err", err));
    }
  }

  componentDidUpdate(prevProps) {
    const {
      match: {
        params: { subRegionId }
      },
      value: { setSubRegion, projectId }
    } = this.props;
    if (prevProps.match.params.subRegionId !== subRegionId) {
      axios
        .get(`${url}?project=${projectId}&region=${subRegionId}`)
        .then(res => {
          console.log("res", res);
          this._isMounted && setSubRegion(res.data, subRegionId);
        })
        .catch(err => console.log("Err", err));
    }
  }

  render() {
    const {
      props: {
        value: {
          isLoading,
          selectedIdentifier,
          selectedName,
          showModal,
          showDeleteConfirmation,
          subRegion,
          toggleModal,
          onChangeHandler,
          editHandler,
          removeHandler,
          confirmHandler,
          cancelHandler,
          onSubmitHandler,
          selectRegionHandler
        }
      }
    } = this;

    return (
      <Fragment>
        <RightContentCard
          title="Manage Region"
          addButton
          toggleModal={toggleModal}
        >
          <Table
            page="manageRegion"
            tableHeader={tableHeader.manageRegions}
            tableRow={subRegion}
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
                label="Name"
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
        {isLoading && <Loader />}

        {showDeleteConfirmation && (
          <Modal title="Warning" toggleModal={cancelHandler}>
            <div className="warning">
              <i className="la la-exclamation-triangle" />

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

  componentWillUnmount() {
    this._isMounted = false;
    this.props.setSubRegion([], "");
  }
}

export default WithContext(SubRegion);
