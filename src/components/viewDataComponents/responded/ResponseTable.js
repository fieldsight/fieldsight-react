import React, { PureComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import format from 'date-fns/format';

/* eslint-disable camelcase */

class ResponseTable extends PureComponent {
  render() {
    const { generals_forms, table, survey, id } = this.props;
    const hasOrgForm = generals_forms.some(e => e.from_organization);

    return (
      <>
        <Table
          responsive="xl"
          className="table  table-bordered  dataTable "
        >
          <thead>
            <tr>
              <th style={{ width: '15%' }}>
                {survey === 'true' ? (
                  <FormattedMessage
                    id="app.form-name"
                    defaultMessage="Form Name"
                  />
                ) : (
                  <FormattedMessage
                    id="app.name"
                    defaultMessage="Name"
                  />
                )}
              </th>

              <th>
                <FormattedMessage
                  id="app.submissions"
                  defaultMessage="Submissions"
                />
              </th>
              <th>
                <FormattedMessage
                  id="app.last-response-on"
                  defaultMessage="Last Response On"
                />
              </th>
              <th>
                {' '}
                <FormattedMessage
                  id="app.created-date"
                  defaultMessage="Created Date"
                />
              </th>
              <th style={{ width: '13%' }}>
                <FormattedMessage
                  id="app.action"
                  defaultMessage="Action"
                />
              </th>
            </tr>
          </thead>

          <tbody>
            {generals_forms &&
              generals_forms.map(generals => {
                return (
                  <tr key={generals.id}>
                    {survey === 'true' ? (
                      <td>
                        {generals.from_organization
                          ? `*${generals.form_name}`
                          : generals.form_name}
                      </td>
                    ) : (
                      <td style={{ width: '45px' }}>
                        {generals.from_organization
                          ? `*${generals.name}`
                          : generals.name}
                      </td>
                    )}
                    <td>
                      {table === 'site' ? (
                        generals.fsxf_id ? (
                          <Link
                            to={`/site-submission-data/${id}/${generals.fsxf_id}`}
                          >
                            {generals.response_count}
                          </Link>
                        ) : (
                          <Link
                            to={`/site-submission-data/${id}/${generals.id}`}
                          >
                            {generals.response_count}
                          </Link>
                        )
                      ) : generals.fsxf_id ? (
                        <Link
                          to={`/submission-data/${id}/${generals.fsxf_id}`}
                        >
                          {generals.response_count}
                        </Link>
                      ) : (
                        <Link
                          to={`/submission-data/${id}/${generals.id}`}
                        >
                          {generals.response_count}
                        </Link>
                      )}
                    </td>
                    <td>
                      {generals.last_response &&
                      generals.last_response.length > 0
                        ? format(generals.last_response, [
                            'MMMM Do YYYY, h:mm:ss a',
                          ])
                        : ''}
                    </td>
                    <td>{generals.created_date}</td>

                    <td>
                      {table === 'site' ? (
                        generals.fsxf_id ? (
                          <Link
                            className="view-tag tag"
                            to={`/site-submission-data/${id}/${generals.fsxf_id}`}
                          >
                            <i className="la la-eye view-tag tag" />
                          </Link>
                        ) : (
                          <Link
                            className="view-tag tag"
                            to={`/site-submission-data/${id}/${generals.id}`}
                          >
                            <i className="la la-eye view-tag tag" />
                          </Link>
                        )
                      ) : generals.fsxf_id ? (
                        <Link
                          className="view-tag tag"
                          to={`/submission-data/${id}/${generals.fsxf_id}`}
                        >
                          <i className="la la-eye view-tag tag" />
                        </Link>
                      ) : (
                        <Link
                          className="view-tag tag"
                          to={`/submission-data/${id}/${generals.id}`}
                        >
                          <i className="la la-eye view-tag tag" />
                        </Link>
                      )}

                      {table === 'site' ? (
                        <a
                          href={`/fieldsight/application/#/exports/0/${generals.id}/${id}/0`}
                          className="edit-tag tag"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <i className="la la-download " />
                        </a>
                      ) : (
                        <a
                          href={`/fieldsight/application/#/exports/1/${generals.id}/${id}/0`}
                          className="edit-tag tag"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <i className="la la-download " />
                        </a>
                      )}

                      {table === 'site' ? (
                        generals.fsxf_id ? (
                          <Link
                            className="pending-tag tag"
                            to={`/site-version-submission/${id}/${generals.fsxf_id}`}
                          >
                            <i className="la la-clone edit-tag tag" />
                          </Link>
                        ) : (
                          <Link
                            className="pending-tag tag"
                            to={`/site-version-submission/${id}/${generals.id}`}
                          >
                            <i className="la la-clone edit-tag tag" />
                          </Link>
                        )
                      ) : generals.fsxf_id ? (
                        <Link
                          className="pending-tag tag"
                          to={`/project-version-submission/${id}/${generals.fsxf_id}`}
                        >
                          <i className="la la-clone edit-tag tag" />
                        </Link>
                      ) : (
                        <Link
                          className="pending-tag tag"
                          to={`/project-version-submission/${id}/${generals.id}`}
                        >
                          <i className="la la-clone edit-tag tag" />
                        </Link>
                      )}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
        {hasOrgForm && (
          <div className="form-group pull-right no-margin">
            * denotes organization form
          </div>
        )}
      </>
    );
  }
}

export default ResponseTable;
