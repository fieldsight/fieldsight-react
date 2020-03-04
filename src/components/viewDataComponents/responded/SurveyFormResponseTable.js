import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import format from 'date-fns/format';

import { DotLoader } from '../../myForm/Loader';
/* eslint-disable camelcase */
export default class SurveyFormResponseTable extends Component {
  static getDerivedStateFromProps(props) {
    return {
      survey_forms: props.survey_forms,
      loader: props.loader,
    };
  }

  render() {
    const { loader, survey_forms, id } = this.props;
    return (
      <>
        {loader === true ? (
          <Table
            responsive="xl"
            className="table  table-bordered  dataTable "
          >
            <thead>
              <tr>
                <th>Name</th>
                <th>Title</th>
                <th>Last Response On</th>
                <th>Created Date</th>
                <th>New Submission</th>
                <th>Submissions</th>
                <th style={{ width: '13%' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {survey_forms &&
                survey_forms.length > 0 &&
                survey_forms.map(survey => {
                  return (
                    <tr key={survey.id}>
                      <td>{survey.name}</td>
                      <td>{survey.title}</td>
                      <td>
                        {survey.last_response &&
                        survey.last_response.length > 0
                          ? format(survey.last_response, [
                              'MMMM Do YYYY, h:mm:ss a',
                            ])
                          : ''}
                      </td>
                      <td>{survey.created_date}</td>
                      <td>
                        <a target="_blank" href="/forms/new/0/297449">
                          <i
                            className="la la-plus"
                            aria-hidden="true"
                          />
                        </a>
                      </td>
                      <td>
                        <Link
                          to={`/submission-data/${id}/${survey.id}`}
                        >
                          {survey.response_count}
                        </Link>
                      </td>
                      <td>
                        <Link
                          className="view-tag tag"
                          to={`/submission-data/${id}/${survey.id}`}
                        >
                          <i className="la la-eye" />
                        </Link>

                        <a
                          href={`/fieldsight/application/#/exports/1/${survey.id}/${id}/0`}
                          className="edit-tag tag"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <i className="la la-download " />
                        </a>

                        <Link
                          className="pending-tag tag"
                          to={`/project-version-submission/${id}/${survey.id}`}
                        >
                          <i className="la la-clone " />
                        </Link>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        ) : (
          <DotLoader />
        )}
      </>
    );
  }
}
