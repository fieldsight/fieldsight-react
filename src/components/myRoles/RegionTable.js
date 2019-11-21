import React, { Component } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import Table from "react-bootstrap/Table";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { TableContentLoader } from "../common/Loader";
import { FormattedMessage } from "react-intl";

class RegionTable extends Component {
  render() {
    return (
      <div
        className="table-wrapper"
        role="tabpanel"
        aria-labelledby="region_tab"
        style={{ position: "relative", height: "650px" }}
      >
        {this.props.RegionLoader && <TableContentLoader row={10} column={5} />}

        {!this.props.RegionLoader && (
          <PerfectScrollbar>
            {this.props.regions.length > 0 ? (
              <Table ponsive="xl" className="table  table-bordered  dataTable ">
                <thead>
                  <tr>
                    <th>
                      <FormattedMessage
                        id="app.identifier"
                        defaultMessage="identifier"
                      />
                    </th>
                    <th>
                      <FormattedMessage id="app.name" defaultMessage="Name" />
                    </th>
                    <th>
                      <FormattedMessage
                        id="app.totalSites"
                        defaultMessage="Total Sites"
                      />
                    </th>
                    <th>
                      <FormattedMessage id="app.role" defaultMessage="Role" />
                    </th>

                    {this.props.profileId && (
                      <th>
                        <FormattedMessage
                          id="app.action"
                          defaultMessage="Action"
                        />
                      </th>
                    )}
                  </tr>
                </thead>

                <tbody>
                  {/*this.props.regions.length === 0 && (
                  <tr>
                    <td>
                      <p>No Form Data Available</p>
                    </td>
                  </tr>
                )*/}

                  {this.props.regions.map((region, i) => (
                    <tr key={i}>
                      <td>{region.identifier}</td>
                      <td>
                        <a href={region.region_url}>{region.name}</a>
                      </td>
                      <td>{region.total_sites}</td>
                      <td>{region.role}</td>
                      {this.props.profileId && (
                        <td>
                          <a className="td-delete-btn td-btn">
                            <OverlayTrigger
                              placement="top"
                              overlay={<Tooltip>Delete</Tooltip>}
                            >
                              <i className="la la-trash-o" />
                            </OverlayTrigger>
                          </a>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <p>
                <FormattedMessage
                  id="app.noRegion."
                  defaultMessage="You do not have any region."
                />
              </p>
            )}
          </PerfectScrollbar>
        )}
      </div>
    );
  }

  componentDidUpdate(prevProps) {
    const url = "fv3/api/my-regions/?project=" + this.props.initialTeamId;
    if (prevProps.initialTeamId != this.props.initialTeamId) {
      // console.log("regiodtable update")
      this.props.requestRegions(this.props.initialTeamId);
      this.props.requestSite(this.props.initialTeamId);
      this.props.requestSubmission(this.props.initialTeamId);
      this.props.requestMap(this.props.initialTeamId);
    }
  }
}

export default RegionTable;
