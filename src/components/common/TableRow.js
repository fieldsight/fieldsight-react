import React, { Component } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import format from "date-fns/format";
import { withRouter } from "react-router-dom";
import Td from "./TableData";

class TableRow extends Component {
  renderName = (dataType, id) => {
    const selectedData = this.props[dataType].find(dtype => dtype.id === +id);
    if (selectedData && selectedData.name) {
      return selectedData.name;
    }
    return "";
  };

  tableRowMethod = () => {
    const {
      match: { url }
    } = this.props;

    return {
      siteInfo: (row, i, editHandler, removeHandler) => (
        <tr key={i}>
          <td>{row.question_text}</td>
          <td>{row.question_type}</td>
          <td>{row.form_id && this.renderName("forms", row.form_id)}</td>
          <td>{row.question && row.question.name}</td>
          <td>
            {row.selectedProject && this.renderName("projects", row.form_id)}
          </td>
          <td>
            <a
              onClick={() => editHandler(row.id || row.question_text)}
              className="td-edit-btn td-btn"
            >
              <OverlayTrigger placement="top" overlay={<Tooltip>Edit</Tooltip>}>
                <i className="la la-edit" />
              </OverlayTrigger>
            </a>
            <a
              onClick={() => removeHandler(row.id || row.question_text)}
              className="td-delete-btn td-btn"
            >
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip>Delete</Tooltip>}
              >
                <i className="la la-trash-o" />
              </OverlayTrigger>
            </a>
          </td>
        </tr>
      ),

      siteType: (row, i, editHandler, removeHandler) => (
        <tr key={row.id}>
          <td>{row.identifier}</td>
          <td>{row.name}</td>
          <td>
            <a
              onClick={() => editHandler(row.id)}
              className="td-edit-btn td-btn"
            >
              <OverlayTrigger placement="top" overlay={<Tooltip>Edit</Tooltip>}>
                <i className="la la-edit" />
              </OverlayTrigger>
            </a>
            <a
              onClick={() => removeHandler(row.id)}
              className="td-delete-btn td-btn"
            >
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip>Delete</Tooltip>}
              >
                <i className="la la-trash-o" />
              </OverlayTrigger>
            </a>
          </td>
        </tr>
      ),

      manageRegion: (row, i, editHandler, removeHandler) => (
        <tr key={row.id}>
          <Td to={`/project-settings/manage-region/${row.id}/sub-region`}>
            {row.identifier}
          </Td>
          <Td to={`/project-settings/manage-region/${row.id}/sub-region`}>
            {row.name}
          </Td>
          <Td to={`/project-settings/manage-region/${row.id}/sub-region`}>
            {format(row.date_created, ["MMMM Do YYYY, h:mm:ss a"])}
          </Td>
          <td>
            <a
              onClick={() => editHandler(row.id)}
              className="td-edit-btn td-btn"
            >
              <OverlayTrigger placement="top" overlay={<Tooltip>Edit</Tooltip>}>
                <i className="la la-edit" />
              </OverlayTrigger>
            </a>
            <a
              onClick={() => removeHandler(row.id)}
              className="td-delete-btn td-btn"
            >
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip>Delete</Tooltip>}
              >
                <i className="la la-trash-o" />
              </OverlayTrigger>
            </a>
          </td>
        </tr>
      ),

      termsAndLabels: row => (
        <tr key={row[0]}>
          <td style={{ textTransform: "capitalize" }}>
            {row[0].replace("_", " ")}
          </td>
          <td style={row[1] ? {} : { textTransform: "capitalize" }}>
            {row[1] || row[0].replace("_", " ")}{" "}
          </td>
        </tr>
      ),

      projectManageRegion: (row, i) => (
        <tr key={row.id}>
          <td>{row.identifier}</td>
          <td>
            <a
              href={`/fieldsight/application/#/regional-site/${row.id}`}
              className="pending table-profile"
            >
              <h5>{row.name}</h5>
            </a>
          </td>
          <td>{format(row.date_created, ["MMMM Do YYYY, h:mm:ss a"])}</td>
          <td>{row.number_of_sites}</td>
        </tr>
      )
    };
  };

  render() {
    const {
      props: { tableRow, page, editHandler, removeHandler },
      tableRowMethod
    } = this;
    return (
      <tbody>
        {tableRow.map((row, i) =>
          tableRowMethod()[page](row, i, editHandler, removeHandler)
        )}
      </tbody>
    );
  }
}

export default withRouter(TableRow);
