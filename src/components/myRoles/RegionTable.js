import React, { PureComponent } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Table from 'react-bootstrap/Table';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { TableContentLoader } from '../common/Loader';
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-array-index-key  */

class RegionTable extends PureComponent {
  render() {
    const { regions, RegionLoader, profileId } = this.props;
    return (
      <div
        className="table-wrapper"
        role="tabpanel"
        aria-labelledby="region_tab"
        style={{ position: 'relative', height: '650px' }}
      >
        {RegionLoader && <TableContentLoader row={10} column={5} />}

        {!RegionLoader && (
          <PerfectScrollbar>
            {regions.length > 0 ? (
              <Table
                ponsive="xl"
                className="table  table-bordered  dataTable "
              >
                <thead>
                  <tr>
                    <th>identifier</th>
                    <th>Name</th>
                    <th>Total Sites</th>
                    <th>Role</th>

                    {this.props.profileId && <th>Action</th>}
                  </tr>
                </thead>

                <tbody>
                  {regions.map((region, i) => (
                    <tr key={i}>
                      <td>{region.identifier}</td>
                      <td>
                        <a href={region.region_url}>{region.name}</a>
                      </td>
                      <td>{region.total_sites}</td>
                      <td>{region.role}</td>
                      {profileId && (
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
              <p>You do not have any region.</p>
            )}
          </PerfectScrollbar>
        )}
      </div>
    );
  }

  // componentDidUpdate(prevProps) {
  //   const url = "fv3/api/my-regions/?project=" + this.props.initialTeamId;
  //   if (prevProps.initialTeamId != this.props.initialTeamId) {
  //     // console.log("regiodtable update")
  //     this.props.requestRegions(this.props.initialTeamId);
  //     this.props.requestSite(this.props.initialTeamId);
  //     this.props.requestSubmission(this.props.initialTeamId);
  //     this.props.requestMap(this.props.initialTeamId);
  //   }
  // }
}

export default RegionTable;
