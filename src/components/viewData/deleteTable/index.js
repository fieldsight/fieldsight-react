import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import format from "date-fns/format";
import ProjectDeleteTable from "../../responded/DeleteTable";

class DeleteTable extends Component {
  state = {
    deleted_forms: []
  };
  static getDerivedStateFromProps(props, state) {
    return {
      deleted_forms: props.deleted_forms
    };
  }
  render() {
    return (
      <React.Fragment>
        <ProjectDeleteTable
          deleted_forms={this.state.deleted_forms}
          id={this.props.id}
        />
      </React.Fragment>
    );
  }
}
export default DeleteTable;
