import React, { Component } from 'react';
import ProjectDeleteTable from '../../responded/DeleteTable';
import { DotLoader } from '../../../myForm/Loader';

class DeleteTable extends Component {
  state = {
    deleted_forms: [],
    loader: '',
  };
  static getDerivedStateFromProps(props, state) {
    return {
      deleted_forms: props.deleted_forms,
      loader: props.loader,
    };
  }
  render() {
    const { loader, deleted_forms } = this.state;
    return (
      <>
        {loader == true ? (
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
export default DeleteTable;
