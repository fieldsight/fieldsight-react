import React, { Component } from 'react';
import axios from 'axios';
import DeleteModel from '../common/DeleteModal';
import WithContext from '../../hoc/WithContext';
import Modal from '../common/Modal';
import Table from '../common/Table';
import InputElement from '../common/InputElement';
import RightContentCard from '../common/RightContentCard';
import Loader from '../common/Loader';
import isEmpty from '../../utils/isEmpty';
/* eslint-disable react/destructuring-assignment */

const url = 'fv3/api/project-regions/';

class SubRegion extends Component {
  _isMounted = false;

  componentDidMount() {
    this._isMounted = true;
    const {
      match: {
        params: { subRegionId },
      },
      value: { setSubRegion, projectId },
    } = this.props;
    if (subRegionId) {
      axios
        .get(`${url}?project=${projectId}&region=${subRegionId}`)
        .then(res => {
          if (this._isMounted) {
            setSubRegion(res.data, subRegionId);
          }
        })
        .catch(() => {});
    }
  }

  componentDidUpdate(prevProps) {
    const {
      match: {
        params: { subRegionId },
      },
      value: { setSubRegion, projectId },
    } = this.props;
    if (prevProps.match.params.subRegionId !== subRegionId) {
      axios
        .get(`${url}?project=${projectId}&region=${subRegionId}`)
        .then(res => {
          if (this._isMounted) {
            setSubRegion(res.data, subRegionId);
          }
        })
        .catch(() => {});
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
    if (this.props.setSubRegion) {
      this.props.setSubRegion([], '');
    }
  }

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
          subRegion,
          toggleModal,
          onChangeHandler,
          editHandler,
          removeHandler,
          confirmHandler,
          cancelHandler,
          onSubmitHandler,
        },
      },
    } = this;

    const tableHeader = {
      manageRegions: !isEmpty(terms)
        ? [
            `${terms.region} ID`,
            `${terms.region} Name`,

            'Created Date',
            'Action',
          ]
        : ['Region ID', 'Region Name', 'Created Date', 'Action'],
    };
    const message = !isEmpty(terms) ? `${terms.region}` : 'Regions';
    return (
      <>
        <RightContentCard
          title={!isEmpty(terms) ? `${terms.region}` : 'Regions'}
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
          <Modal
            title={!isEmpty(terms) ? `${terms.region}` : 'Regions'}
            toggleModal={toggleModal}
          >
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
                name="selectedIdentifier"
                value={selectedIdentifier}
                changeHandler={onChangeHandler}
              />
              <InputElement
                tag="textarea"
                type="text"
                required
                label="name"
                formType="floatingForm"
                htmlFor="textarea"
                name="selectedName"
                value={selectedName}
                changeHandler={onChangeHandler}
              />
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
          <DeleteModel
            onCancel={cancelHandler}
            onConfirm={confirmHandler}
            onToggle={cancelHandler}
            message={`Are you sure you want to delete ${message}?`}
            title="Warning"
          />
        )}
      </>
    );
  }
}

export default WithContext(SubRegion);
