import React from "react";
import Table from "react-bootstrap/Table";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import { DotLoader } from "../../myForm/Loader";
import isEmpty from "../../../utils/isEmpty";

import withPagination from "../../../hoc/WithPagination";
import TableHeader from "../../common/TableHeader";
import TableRow from "../../common/TableRow";

class RegionsTable extends React.Component {
  state = {
    project_id: JSON.parse(this.props.id)
  };
  componentDidMount() {
    this.props.paginationHandler(1, null, {
      type: "projectRegionList",
      projectId: this.state.project_id
    });
  }
  render() {
    const { data, loader, terms } = this.props;

    const tableHeader = {
      projectRegions: !isEmpty(terms)
        ? [
            `${terms.region} ID`,
            `${terms.region} Name`,
            ,
            "Created Date",
            "Total Sites"
          ]
        : ["Region ID", "Region Name", "Created Date", "Total Sites"]
    };
    return (
      <div className="card-body">
        <div style={{ position: "relative", height: "396px" }}>
          <PerfectScrollbar>
            {loader && <DotLoader />}
            {!loader && (
              <Table
                responsive="xl"
                className="table  table-bordered  dataTable "
              >
                <TableHeader tableHeader={tableHeader.projectRegions} />
                <TableRow tableRow={data} page="projectManageRegion" />
              </Table>
            )}
          </PerfectScrollbar>
        </div>
      </div>
    );
  }
}
export default withPagination(RegionsTable);
