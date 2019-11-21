import React, { Component } from "react";
import ResponseTable from "../../responded/SurveyFormResponseTable";
import DeleteTable from "../deleteTable";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import { getProjectViewData } from "../../../../actions/viewDataActions";
import { FormattedMessage } from "react-intl";

class ManageSurveyForm extends Component {
  state = {
    hide: true
  };
  componentDidMount() {
    if (this.props.id != "") {
      this.props.getProjectViewData(this.props.id, "survey");
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
        survey_forms,
        deleted_forms,
        survey_forms_loader
      }
    } = this;
    return (
      <React.Fragment>
        <div className="card-header main-card-header sub-card-header">
          <h5>
            {!data ? (
              <FormattedMessage
                id="app.generate-form"
                defaultMessage="General Forms"
              />
            ) : (
              <FormattedMessage
                id="app.rejected-submissions"
                defaultMessage="Rejected Submission"
              />
            )}
          </h5>
          <Link to={this.props.url}>
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
              survey_forms={survey_forms}
              id={this.props.id}
              loader={survey_forms_loader}
            />
          )}
          {/*data && <Rejected id={this.props.id} />*/}
        </div>
        {deleted_forms.length > 0
          ? !data && (
              <div className="card no-boxshadow">
                <div className="card-header main-card-header sub-card-header">
                  {/*<h5>Deleted Forms</h5>*/}
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
                      id={this.props.id}
                      deleted_forms={deleted_forms}
                      loader={survey_forms_loader}
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
//export default ManageSurveyForm;
const mapStateToProps = ({ projectViewData }) => {
  const { survey_forms, deleted_forms, survey_forms_loader } = projectViewData;

  return {
    survey_forms,
    deleted_forms,
    survey_forms_loader
  };
};
export default compose(
  connect(mapStateToProps, {
    getProjectViewData
  })
)(ManageSurveyForm);
