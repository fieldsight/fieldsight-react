import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";

export default class SurveyFormResponseTable extends Component {
  state = {
    survey_forms: []
  };

  static getDerivedStateFromProps(props, state) {
    console.log(props, "props");

    return {
      survey_forms: props.survey_forms
    };
  }

  render() {
    return (
      <React.Fragment>
        <Table responsive="xl" className="table  table-bordered  dataTable ">
          <thead>
            <tr>
              <th>Name</th>
              <th>Title</th>
              <th>Last Response On</th>
              <th>Created Date</th>
              <th>New Submission</th>
              <th>Submission</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.state.survey_forms.map((survey, key) => {
              return (
                <tr key={key}>
                  <td>
                    <a href={`#/`}>{survey.name}</a>
                  </td>
                  <td>{survey.title}</td>
                  <td>{survey.last_response}</td>
                  <td>{survey.created_date}</td>
                  <td>
                    <a target="_blank" href="/forms/new/0/297449">
                      <i className="la la-plus" aria-hidden="true"></i>
                    </a>
                  </td>
                  <td>
                    <Link to={`/submission-data/${this.props.id}/${survey.id}`}>
                      {survey.response_count}
                    </Link>
                  </td>
                  <td>
                    {survey.view_submission_url === null ? (
                      <>
                        <i className="la la-eye"></i>submission
                      </>
                    ) : (
                      <a
                        href={survey.view_submission_url}
                        className="view-tag tag"
                      >
                        <i className="la la-eye"></i>
                      </a>
                    )}
                    {survey.download_url === null ? (
                      <>
                        <i className="la la-download"></i>
                      </>
                    ) : (
                      <a href={survey.download_url} className="edit-tag tag">
                        <i className="la la-download"></i>
                      </a>
                    )}
                    {survey.versions_url === null ? (
                      <>
                        <i className="la la-clone"></i>
                      </>
                    ) : (
                      <a href={survey.versions_url} className="pending-tag tag">
                        <i className="la la-clone"></i>
                      </a>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </React.Fragment>
    );
  }
}
