import React, { Component } from "react";
import StatusTable from "../../responded/StatusTable";
import axios from "axios";
import WithPagination from "../../../hoc/WithPagination";

class RejectedTable extends Component {
  state = {
    rejected_submissions: []
  };
  componentDidMount() {
    if (this.props.id != "") {
      axios
        .get(
          `fv3/api/view-by-status/?project=${this.props.id}&submission_status=rejected
            `
        )
        .then(res => {
          console.log(res, "delete");

          this.setState({
            rejected_submissions: res.data.results,
            count: res.data.count,
            next: res.data.next,
            previous: res.data.previous
          });
        })
        .catch(err => {
          console.log(err, "err");
        });
    }
    //this.props.paginationHandler();
  }

  render() {
    const {
      props: { data, showViewData }
    } = this;
    return (
      <React.Fragment>
        <div className="card-header main-card-header sub-card-header">
          <h5>Rejected Submission</h5>
          <div className="dash-btn">
            <button onClick={showViewData} className="fieldsight-btn">
              {data ? "View By Status" : "View by Form"}
            </button>
          </div>
        </div>
        <div className="card-body">
          <StatusTable submission={this.state.rejected_submissions} />
        </div>
      </React.Fragment>
    );
  }
}
export default WithPagination(RejectedTable);
