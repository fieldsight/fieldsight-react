import React, { PureComponent } from 'react';

import SiteDeleteTable from '../../responded/DeleteTable';

/* eslint-disable camelcase */
class DeleteTable extends PureComponent {
  render() {
    const { id, deleted_forms } = this.props;

    return (
      <>
        <SiteDeleteTable
          deleted_forms={deleted_forms}
          id={id}
          table="site"
        />
      </>
    );
  }
}

export default DeleteTable;
