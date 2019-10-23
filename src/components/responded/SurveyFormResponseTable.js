import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import format from "date-fns/format";

export default class SurveyFormResponseTable extends Component {
  state = {
    survey_forms: []
  };

  static getDerivedStateFromProps(props, state) {
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
              <th style={{ width: "13%" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.state.survey_forms.map((survey, key) => {
              return (
                <tr key={key}>
                  <td>{survey.name}</td>
                  <td>{survey.title}</td>
                  <td>
                    {survey.last_response.length > 0
                      ? format(survey.last_response, [
                          "MMMM Do YYYY, h:mm:ss a"
                        ])
                      : ""}
                  </td>
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
                    {
                      <Link
                        className="view-tag tag"
                        to={`/submission-data/${this.props.id}/${survey.id}`}
                      >
                        <i className="la la-eye"></i>
                      </Link>
                    }
                    {survey.download_url === null ? (
                      <a className="edit-tag tag disable pointer">
                        <i className="la la-download"></i>
                      </a>
                    ) : (
                      <a href={survey.download_url} className="edit-tag tag">
                        <i className="la la-download"></i>
                      </a>
                    )}
                    {
                      <Link
                        className="pending-tag tag"
                        to={`/project-version-submission/${this.props.id}/${survey.id}`}
                      >
                        <i className="la la-clone "></i>
                      </Link>
                    }
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
