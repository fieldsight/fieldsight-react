import React, { Component } from "react";
import axios from "axios";
import PerfectScrollbar from "react-perfect-scrollbar";
import Table from "react-bootstrap/Table";

class RegionTable extends Component {
  render() {
    return (
      <div
        className="table-wrapper"
        style={{ position: "relative", height: "650px" }}
      >
        <PerfectScrollbar>
          <Table ponsive="xl" className="table  table-bordered  dataTable ">
            <thead>
              <tr>
                <th>dentifier</th>
                <th>name</th>
                <th>total_sites</th>
                <th>Role</th>
              </tr>
            </thead>

            <tbody>
              {this.props.regions.length === 0 && (
                <tr>
                  <td>
                    <h5>No Form Data Available</h5>
                  </td>
                </tr>
              )}

              {this.props.regions.map((region, i) => (
                <tr>
                  <td>{region.identifier}</td>
                  <td>{region.name}</td>
                  <td>{region.total_sites}</td>
                  <td>{region.role}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </PerfectScrollbar>
      </div>
    );
  }

  componentDidUpdate(prevProps) {
    const url = "fv3/api/my-regions/?project=" + this.props.team_proj_id;

    if (prevProps.team_proj_id != this.props.team_proj_id) {
      this.props.requestRegions(this.props.team_proj_id);
      this.props.requestSite(this.props.team_proj_id);
      this.props.requestSubmission(this.props.team_proj_id);
    }
  }
}

export default RegionTable;
