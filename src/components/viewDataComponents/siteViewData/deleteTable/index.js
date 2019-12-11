import React, { Component } from 'react';

import SiteDeleteTable from '../../responded/DeleteTable';

class DeleteTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deletedForms: [],
    };
  }

  static getDerivedStateFromProps(props) {
    return {
      deletedForms: props.deletedForms,
    };
  }

  render() {
    const {
      state: { deletedForms },
      props: { id },
    } = this;
    return (
      <>
        <SiteDeleteTable
          deleted_forms={deletedForms}
          id={id}
          table="site"
        />
      </>
    );
  }
}

export default DeleteTable;
