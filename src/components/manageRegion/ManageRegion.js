import React, { Component, Fragment } from "react";
import Table from "../common/Table";
import Modal from "../common/Modal";
import InputElement from "../common/InputElement";
import RightContentCard from "../common/RightContentCard";
import Loader from "../common/Loader";
import WithContext from "../../hoc/WithContext";
import isEmpty from "../../utils/isEmpty";

class ManageRegion extends Component {
  render() {
    const {
      props: {
        value: {
          terms,
          isLoading,
          selectedIdentifier,
          selectedName,
          showModal,
          showDeleteConfirmation,
          region,
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

    const tableHeader = {
      manageRegions: !isEmpty(terms)
        ? [
            `${terms.region} ID`,
            `${terms.region} Name`,
            ,
            "Created Date",
            "Action"
          ]
        : ["Region ID", "Region Name", "Created Date", "Action"]
    };

    return (
      <Fragment>
        <RightContentCard
          title={!isEmpty(terms) ? `${terms.region}` : "Regions"}
          addButton
          toggleModal={toggleModal}
        >
          <Table
            page="manageRegion"
            tableHeader={tableHeader.manageRegions}
            tableRow={region}
            removeHandler={removeHandler}
            editHandler={editHandler}
            selectRegionHandler={selectRegionHandler}
          />
        </RightContentCard>

        {showModal && (
          <Modal
            title={!isEmpty(terms) ? `${terms.region}` : "Regions"}
            toggleModal={toggleModal}
          >
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
                Are you sure you want to delete{" "}
                {!isEmpty(terms) ? `${terms.region}` : "Regions"} ?
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

export default WithContext(ManageRegion);
