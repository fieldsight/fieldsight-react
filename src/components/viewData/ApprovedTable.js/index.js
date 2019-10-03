import React, { Component } from "react";
import StatusTable from "../../responded/StatusTable";
import axios from "axios";
import WithPagination from "../../../hoc/WithPagination";

class ApprovedTable extends Component {
  state = {
    approved_submissions: []
  };
  componentDidMount() {
    if (this.props.id != "") {
      axios
        .get(
          `fv3/api/view-by-status/?project=${this.props.id}&submission_status=approved 
            `
        )
        .then(res => {
          console.log(res, "approved");

          this.setState({
            approved_submissions: res.data.results
          });
        })
        .catch(err => {
          console.log(err, "err");
        });
    }
  }

  render() {
    const {
      props: { data, showViewData }
    } = this;
    return (
      <React.Fragment>
        <div className="card-header main-card-header sub-card-header">
          <h5>Approved Submissions</h5>
          <div className="dash-btn">
            <button onClick={showViewData} className="fieldsight-btn">
              {data ? "View By Status" : "View by Form"}
            </button>
          </div>
        </div>
        <div className="card-body">
          <StatusTable submission={this.state.approved_submissions} />
        </div>
      </React.Fragment>
    );
  }
}

export default WithPagination(ApprovedTable);
