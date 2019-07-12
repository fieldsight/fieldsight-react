import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import SubmissionSiteDetail from "./SubmissionSiteDetail";
import SubmissionSiteInfo from "./SubmissionSiteInfo";
import RightSidebar from "./RightSidebar";
import Submission from "./Submission";
import Loader from "../common/Loader";

import {
  getSubmissionDetail,
  postSubmissionDetail
} from "../../actions/submissionDetailActions";

class SubmissionDetail extends Component {
  componentDidMount() {
    const {
      props: {
        match: {
          params: { submissionId }
        }
      }
    } = this;
    // remove two lines for production
    // const id = submissionId ? submissionId : 42124;
    // this.props.getSubmissionDetail(id);
    // uncomment for production
    this.props.getSubmissionDetail(submissionId);
  }
  render() {
    const {
      submissionDetail: {
        site,
        date_created,
        submitted_by,
        submission_data,
        submission_history,
        status_data,
        fieldsight_instance,
        edit_url,
        download_url,
        loading,
        dotLoader
      },
      postSubmissionDetail
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
                <SubmissionSiteDetail site={site} dotLoader={dotLoader} />

                <SubmissionSiteInfo
                  siteInformation={site.site_information}
                  dotLoader={dotLoader}
                />
              </div>

              <Submission
                dateCreated={date_created}
                submittedBy={submitted_by}
                submissionData={submission_data}
                dotLoader={dotLoader}
                site={site}
              />
            </div>
          </div>

          <div className="col-xl-4 col-lg-4">
            <RightSidebar
              statusData={status_data}
              submissionHistory={submission_history}
              fieldSightInstance={fieldsight_instance}
              postSubmissionDetail={postSubmissionDetail}
              editUrl={edit_url}
              downloadUrl={download_url}
            />
          </div>
        </div>
        {loading && <Loader />}
      </Fragment>
    );
  }
}

const mapStateToProps = ({ submissionDetail }) => ({
  submissionDetail
});

export default connect(
  mapStateToProps,
  { getSubmissionDetail, postSubmissionDetail }
)(SubmissionDetail);
