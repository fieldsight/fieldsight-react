import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ProjectDeleteTable from '../../responded/DeleteTable';
import { DotLoader } from '../../../myForm/Loader';
/* eslint-disable camelcase */

class DeleteTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      deleted_forms: [],
      loader: '',
    };
  }

  static getDerivedStateFromProps(props) {
    return {
      deleted_forms: props.deleted_forms,
      loader: props.loader,
    };
  }

  render() {
    const { loader, deleted_forms } = this.state;
    return (
      <>
        {loader === true ? (
          <ProjectDeleteTable
            deleted_forms={deleted_forms}
            id={this.props.id}
          />
        ) : (
          <DotLoader />
        )}
      </>
    );
  }
}
DeleteTable.propTypes = {
  deleted_forms: PropTypes.arrayOf.isRequired,
  id: PropTypes.string.isRequired,
  loader: PropTypes.bool.isRequired,
};
export default DeleteTable;
