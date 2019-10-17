import React, { Component } from "react";
import { Link } from "react-router-dom";
import ResponseTable from "../../responded/ResponseTable";
import Rejected from "../RejectSubmissionTable.js";
import DeleteTable from "../deleteTable";
import axios from "axios";

class ManageGeneralForm extends Component {
  state = {
    generals_forms: [],
    deleted_forms: [],
    hide: true,
    id: ""
  };
  static getDerivedStateFromProps(props, state) {
    return {
      id: props.id
    };
  }

  componentDidMount() {
    if (this.props.id != "") {
      axios
        .get(`/fv3/api/view-by-forms/?site=${this.props.id}&form_type=general`)
        .then(res => {
          console.log(res, "ress");

          this.setState({
            deleted_forms: res.data.deleted_forms,
            generals_forms: res.data.generals_forms
          });
        })
        .catch(err => {
          console.log(err, "err");
        });
    }
  }
  toggleHide = () => {
    this.setState({
      hide: !this.state.hide
    });
  };

  render() {
    const {
      props: { data, showViewData }
    } = this;
    return (
      <React.Fragment>
        <div className="card-header main-card-header sub-card-header">
          <h5>General Forms</h5>
          <div className="dash-btn">
            <Link to={`/site-responses/${this.props.id}/rejected`}>
              <button onClick={showViewData} className="fieldsight-btn">
                {data ? "View By Form" : "View by Status"}
              </button>
            </Link>
          </div>
        </div>
        <div className="card-body">
          {!data && (
            <ResponseTable
              generals_forms={this.state.generals_forms}
              deleted_forms={this.state.deleted_forms}
            />
          )}
        </div>
        {!data && (
          <div className="card no-boxshadow">
            <div className="card-header main-card-header sub-card-header">
              <h5>Deleted Forms</h5>
              <div className="dash-btn">
                {this.state.hide ? (
                  <button
                    type="button"
                    className="btn-toggle"
                    onClick={this.toggleHide}
                  >
                    show
                    <div className="handle"></div>
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn-toggle"
                    onClick={this.toggleHide}
                    style={{
                      backgroundColor: "#28a745",
                      color: "white",
                      textAlign: "left"
                    }}
                  >
                    hide
                    <div
                      className="handle"
                      style={{ left: "auto", right: "0.1875rem" }}
                    ></div>
                  </button>
                )}
              </div>
            </div>
            <div className="card-body">
              {!this.state.hide && (
                <DeleteTable deleted_forms={this.state.deleted_forms} />
              )}
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}
export default ManageGeneralForm;
