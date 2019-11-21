import React, { Component } from "react";
import ResponseTable from "../../responded/StagedFormResponseTable";
import axios from "axios";
import DeleteTable from "../deleteTable";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import { getsiteViewData } from "../../../../actions/siteViewDataAction";
import { FormattedMessage } from "react-intl";

class ResponseStageForm extends Component {
  state = {
    hide: true
  };
  componentDidMount() {
    if (this.props.id != "") {
      this.props.getsiteViewData(this.props.id, "stage");
    }
  }
  toggleHide = () => {
    this.setState({
      hide: !this.state.hide
    });
  };

  render() {
    const {
      props: {
        showViewData,
        data,
        stage_forms,
        deleted_forms,
        stage_forms_loading
      }
    } = this;

    return (
      <React.Fragment>
        <div className="card-header main-card-header sub-card-header">
          <h5>
            {!data ? (
              <FormattedMessage
                id="app.staged-form"
                defaultMessage="Stage Forms"
              />
            ) : (
              <FormattedMessage
                id="app.rejected-submissions"
                defaultMessage="Rejected Submission"
              />
            )}
          </h5>
          <Link to={`/site-responses/${this.props.id}/rejected`}>
            <button onClick={showViewData} className="fieldsight-btn">
              {data ? (
                <FormattedMessage
                  id="app.view-by-form"
                  defaultMessage="View By Form"
                />
              ) : (
                <FormattedMessage
                  id="app.view-by-status"
                  defaultMessage="View By Status"
                />
              )}
            </button>
          </Link>
        </div>
        <div className="card-body">
          {!data && (
            <ResponseTable
              stage_forms={stage_forms}
              table="site"
              id={this.props.id}
              loader={stage_forms_loading}
            />
          )}
        </div>

        {deleted_forms && deleted_forms.length > 0
          ? !data && (
              <div className="card no-boxshadow">
                <div className="card-header main-card-header sub-card-header">
                  <h5>
                    <FormattedMessage
                      id="app.deleted-forms"
                      defaultMessage="Deleted Forms"
                    />
                  </h5>
                  <div className="dash-btn">
                    {this.state.hide ? (
                      <button
                        type="button"
                        className="btn-toggle"
                        onClick={this.toggleHide}
                        style={{ width: "96px" }}
                      >
                        <FormattedMessage id="app.show" defaultMessage="Show" />
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
                          textAlign: "left",
                          width: "96px"
                        }}
                      >
                        <FormattedMessage id="app.hide" defaultMessage="Hide" />
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
                    <DeleteTable
                      deleted_forms={deleted_forms}
                      id={this.props.id}
                      loader={stage_forms_loading}
                    />
                  )}
                </div>
              </div>
            )
          : ""}
      </React.Fragment>
    );
  }
}
//export default ResponseStageForm;
const mapStateToProps = ({ siteViewData }) => {
  const { stage_forms_loading, deleted_forms, stage_forms } = siteViewData;

  return {
    stage_forms_loading,
    deleted_forms,
    stage_forms
  };
};
export default compose(
  connect(mapStateToProps, {
    getsiteViewData
  })
)(ResponseStageForm);
