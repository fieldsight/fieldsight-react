import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import SubmissionSiteDetail from "./SubmissionSiteDetail";
import SubmissionSiteInfo from "./SubmissionSiteInfo";
import RightSidebar from "./RightSidebar";
import Submission from "./Submission";

import { getSubmissionDetail } from "../../actions/submissionDetailActions";

class SubmissionDetail extends Component {
  componentDidMount() {
    const submissionId = window.submission_id ? window.submission_id : 56588;
    this.props.getSubmissionDetail(submissionId);
  }
  render() {
    console.log("submission Details props", this.props);

    const {
      submissionDetail: {
        site,
        date_created,
        submitted_by,
        submission_data,
        submission_history,
        status_data
      }
    } = this.props;
    return (
      <Fragment>
        <nav aria-label="breadcrumb" role="navigation">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="index.html">Home</a>
            </li>
            <li className="breadcrumb-item">
              <a href="#">Site's name</a>
            </li>
            <li className="breadcrumb-item">
              <a href="#">form type</a>
            </li>
            <li className="breadcrumb-item">
              <a href="#">form name</a>
            </li>

            <li className="breadcrumb-item active" aria-current="page">
              Submission Details
            </li>
          </ol>
        </nav>
        <div className="row">
          <div className="col-xl-8 col-lg-8">
            <div className="right-content no-bg">
              <div className="row">
                <SubmissionSiteDetail site={site} />

                <SubmissionSiteInfo siteInformation={site.site_information} />
              </div>

              <Submission
                dateCreated={date_created}
                submittedBy={submitted_by}
                submissionData={submission_data}
              />
            </div>
          </div>

          <div className="col-xl-4 col-lg-4">
            <RightSidebar
              statusData={status_data}
              submissionHistory={submission_history}
            />
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ submissionDetail }) => ({
  submissionDetail
});

export default connect(
  mapStateToProps,
  { getSubmissionDetail }
)(SubmissionDetail);
