import React, { Component, Fragment } from "react";
import Table from "../common/Table";
import Modal from "../common/Modal";
import InputElement from "../common/InputElement";
import RightContentCard from "../common/RightContentCard";
import Loader from "../common/Loader";
import WithContext from "../../hoc/WithContext";

const tableHeader = {
  manageRegions: ["Region ID", "Region Name", "Created Date", "Action"]
};

class ManageRegion extends Component {
  render() {
    const {
      props: {
        value: {
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
            tableRow={region}
            removeHandler={removeHandler}
            editHandler={editHandler}
            selectRegionHandler={selectRegionHandler}
          />
        </RightContentCard>

        {showModal && (
          <Modal title="Manage Region" toggleModal={toggleModal}>
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

export default WithContext(ManageRegion);
