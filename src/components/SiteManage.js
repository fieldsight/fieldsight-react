import React, { Component } from 'react';
import Table from './common/Table';
import Modal from './common/Modal';
import InputElement from './common/InputElement';
import RightContentCard from './common/RightContentCard';
/* eslint-disable no-undef */

class SiteManage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
    };
  }

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const {
      state: { showModal },
      toggleModal,
    } = this;
    return (
      <>
        <RightContentCard
          title="Site Manage"
          addButton
          toggleModal={toggleModal}
        >
          <Table page="siteManage" />
        </RightContentCard>
        {showModal && (
          <Modal title="Add site" toggleModal={toggleModal}>
            <form
              className="floating-form"
              onSubmit={onSubmitHandler}
            >
              <InputElement
                tag="input"
                type="text"
                required
                label="id"
                formType="floatingForm"
                htmlFor="input"
              />
              <InputElement
                tag="input"
                type="text"
                required
                label="sites"
                formType="floatingForm"
                htmlFor="input"
              />
              <InputElement
                tag="input"
                type="text"
                required
                label="address"
                formType="floatingForm"
                htmlFor="input"
              />
              <InputElement
                tag="input"
                type="text"
                required
                label="regions"
                formType="floatingForm"
                htmlFor="input"
              />
              <InputElement
                tag="input"
                type="text"
                required
                label="status"
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
      </>
    );
  }
}

export default SiteManage;
