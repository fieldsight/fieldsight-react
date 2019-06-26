import React, { Component, Fragment } from "react";
import Table from "./common/Table";
import Modal from "./common/Modal";
import InputElement from "./common/InputElement";
import RightContentCard from "./common/RightContentCard";

class SiteManage extends Component {
  state = {
    showModal: false
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal
    }));
  };

  render() {
    const {
      state: { showModal },
      toggleModal
    } = this;
    return (
      <Fragment>
        <RightContentCard
          title="Site Manage"
          addButton
          toggleModal={toggleModal}
        >
          <Table page="siteManage" />
        </RightContentCard>
        {showModal && (
          <Modal title="Add site" toggleModal={toggleModal}>
            <form className="floating-form" onSubmit={onSubmitHandler}>
              <InputElement
                tag="input"
                type="text"
                required={true}
                label="ID"
                formType="floatingForm"
                htmlFor="input"
              />
              <InputElement
                tag="input"
                type="text"
                required={true}
                label="Sites"
                formType="floatingForm"
                htmlFor="input"
              />
              <InputElement
                tag="input"
                type="text"
                required={true}
                label="Address"
                formType="floatingForm"
                htmlFor="input"
              />
              <InputElement
                tag="input"
                type="text"
                required={true}
                label="Regions"
                formType="floatingForm"
                htmlFor="input"
              />
              <InputElement
                tag="input"
                type="text"
                required={true}
                label="Status"
                formType="floatingForm"
                htmlFor="input"
              />
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

export default SiteManage;
