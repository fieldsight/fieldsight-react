import React, { Component } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import Table from "react-bootstrap/Table";
import { TableContentLoader } from "../common/Loader";

class RegionTable extends Component {
  render() {
    return (
      <div
        className="table-wrapper"
        style={{ position: "relative", height: "650px" }}
      >
        {this.props.RegionLoader && <TableContentLoader 
        row={15}
        column={5}
        />}
        {!this.props.RegionLoader &&
        <PerfectScrollbar>
          <Table ponsive="xl" className="table  table-bordered  dataTable ">
            <thead>
              <tr>
                <th>identifier</th>
                <th>name</th>
                <th>total_sites</th>
                <th>Role</th>
              </tr>
            </thead>

            <tbody>
              {this.props.regions.length === 0 && (
                <tr>
                  <td>
                    <p>No Form Data Available</p>
                  </td>
                </tr>
              )}

              {this.props.regions.map((region, i) => (
                <tr key={i}>
                  <td>{region.identifier}</td>
                  <td><a href={region.region_url}>{region.name}</a></td>
                  <td>{region.total_sites}</td>
                  <td>{region.role}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </PerfectScrollbar> 
        }
      </div>
    );
  }

  componentDidUpdate(prevProps) {
    const url = "fv3/api/my-regions/?project=" + this.props.team_proj_id;

    if (prevProps.team_proj_id != this.props.team_proj_id) {
      this.props.requestRegions(this.props.team_proj_id);
      this.props.requestSite(this.props.team_proj_id);
      this.props.requestSubmission(this.props.team_proj_id);
      this.props.requestMap(this.props.team_proj_id);
    }
  }
}

export default RegionTable;
