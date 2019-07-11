import React, { Component } from "react";
import axios from "axios";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import SharedFormShare from "./SharedFormShare";
import { DotLoader } from "./Loader";

const url = "fv3/api/sharedforms/";

class SharedTable extends Component {
  _isMounted = false;
  state = {
    project_list: [],
    list: [],
    shareOption: false,
    dLoader: true,
    tblDiv: false
  };

  componentDidMount() {
    this._isMounted = true;
    axios
      .get(`${url}`)

      .then(res => {
        if (this._isMounted) {
          if (res.status === 200) {
            this.setState({
              list: res.data,
              dLoader: false
            });
          }
        }
      })
      .catch(err => {
        this.setState({
          dLoader: false
        });
      });
  }

  cloneHandler = (e, clone_url, id, form_id) => {
    axios
      .post(`${clone_url}`, { id_string: id, project: form_id })
      .then(res => {
        // successToast("Form", "cloned");
      })
      .catch(err => console.log("err", err));
  };

  render() {
    return (
      <React.Fragment>
        <div className="myform-table">
          <div
            className="table-wrapper"
            style={{ position: "relative", height: "500px" }}
          >
            <PerfectScrollbar>
              <table
                id="myform_table"
                className="table-bordered table myform_table dataTable"
              >
                <thead>
                  <tr>
                    <th>Form Name</th>
                    <th>Form Owner</th>
                    <th>Create Date</th>
                    <th>Updated date</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {this.state.list.map((item, i) => (
                    <SharedFormShare
                      key={i + 1}
                      item={item}
                      OpenTabHandler={this.props.OpenTabHandler}
                      commonPopupHandler={this.props.commonPopupHandler}
                      cloneHandler={this.cloneHandler}
                    />
                  ))}
                </tbody>
              </table>
              {this.state.list.length === 0 && !this.state.dLoader && (
                <div className="card-header main-card-header sub-card-header bg-header">
                  <h5>No Form Data Available</h5>
                </div>
              )}

              {this.state.dLoader && <DotLoader />}
            </PerfectScrollbar>
          </div>
        </div>
      </React.Fragment>
    );
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
}

export default SharedTable;
