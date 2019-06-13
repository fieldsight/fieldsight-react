import React from "react";
import { OverlayTrigger, Tooltip, Row } from "react-bootstrap";

const tableRowMethod = {
  siteInfo: (row, i, editHandler, removeHandler) => (
    <tr key={i}>
      <td>{row.label}</td>

      <td>{row.type}</td>
      <td>{row.selectedForm && row.selectedForm.name}</td>
      <td>{row.selectedQuestion && row.selectedQuestion.name}</td>
      <td>{row.selectedProject && row.selectedProject.name}</td>
      <td>
        <a onClick={() => editHandler(row.id)} className="td-edit-btn">
          <OverlayTrigger placement="top" overlay={<Tooltip>Edit</Tooltip>}>
            <i className="la la-edit" />
          </OverlayTrigger>
        </a>
        <a onClick={() => removeHandler(row.id)} className="td-delete-btn">
          <OverlayTrigger placement="top" overlay={<Tooltip>Delete</Tooltip>}>
            <i className="la la-trash-o" />
          </OverlayTrigger>
        </a>
      </td>
    </tr>
  )
};

const TableRow = ({ tableRow, page, editHandler, removeHandler }) => {
  return (
    <tbody>
      {tableRow.map((row, i) =>
        tableRowMethod[page](row, i, editHandler, removeHandler)
      )}
    </tbody>
  );
};

export default TableRow;
