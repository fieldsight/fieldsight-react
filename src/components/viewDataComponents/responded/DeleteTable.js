import React, { PureComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import format from 'date-fns/format';

/* eslint-disable camelcase */

class DeleteTable extends PureComponent {
  render() {
    const { deleted_forms, table, id } = this.props;
    return (
      <>
        <Table
          responsive="xl"
          className="table  table-bordered  dataTable "
        >
          <thead>
            <tr>
              <th>
                <FormattedMessage
                  id="app.name"
                  defaultMessage="Name"
                />
              </th>
              <th>
                <FormattedMessage
                  id="app.title"
                  defaultMessage="Title"
                />
              </th>
              <th>
                <FormattedMessage
                  id="app.last-response-on"
                  defaultMessage="Last Response On"
                />
              </th>
              <th>
                <FormattedMessage
                  id="app.created-date"
                  defaultMessage="Created Date"
                />
              </th>
              <th>
                <FormattedMessage
                  id="app.submissions"
                  defaultMessage="Submissions"
                />
              </th>
              <th>
                <FormattedMessage
                  id="app.action"
                  defaultMessage="Action"
                />
              </th>
            </tr>
          </thead>
          <tbody>
            {deleted_forms &&
              deleted_forms.length > 0 &&
              deleted_forms.map(deleted => {
                return (
                  <tr key={deleted.id}>
                    <td>
                      {deleted.name !== 'None'
                        ? deleted.from_organization
                          ? `*${deleted.name}`
                          : deleted.name
                        : deleted.from_organization
                        ? `*${deleted.form_name}`
                        : deleted.form_name}
                    </td>
                    <td>{deleted.title}</td>
                    <td>
                      {deleted.last_response.length > 0
                        ? format(deleted.last_response, [
                            'MMMM Do YYYY, h:mm:ss a',
                          ])
                        : ''}
                    </td>
                    <td>{deleted.created_date}</td>
                    <td>
                      {table === 'site' ? (
                        deleted.fsxf_id ? (
                          <Link
                            className="view-tag tag"
                            to={`/site-submission-data/${id}/${deleted.fsxf_id}`}
                          >
                            {deleted.response_count}
                          </Link>
                        ) : (
                          <Link
                            className="view-tag tag"
                            to={`/site-submission-data/${id}/${deleted.id}`}
                          >
                            {deleted.response_count}
                          </Link>
                        )
                      ) : deleted.fsxf_id ? (
                        <Link
                          className="view-tag tag"
                          to={`/submission-data/${id}/${deleted.fsxf_id}`}
                        >
                          {deleted.response_count}
                        </Link>
                      ) : (
                        <Link
                          className="view-tag tag"
                          to={`/submission-data/${id}/${deleted.id}`}
                        >
                          {deleted.response_count}
                        </Link>
                      )}
                    </td>
                    <td>
                      {table === 'site' ? (
                        deleted.fsxf_id ? (
                          <Link
                            className="view-tag tag"
                            to={`/site-submission-data/${id}/${deleted.fsxf_id}`}
                          >
                            <i className="la la-eye view-tag tag" />
                          </Link>
                        ) : (
                          <Link
                            className="view-tag tag"
                            to={`/site-submission-data/${id}/${deleted.id}`}
                          >
                            <i className="la la-eye view-tag tag" />
                          </Link>
                        )
                      ) : deleted.fsxf_id ? (
                        <Link
                          className="view-tag tag"
                          to={`/submission-data/${id}/${deleted.fsxf_id}`}
                        >
                          <i className="la la-eye view-tag tag" />
                        </Link>
                      ) : (
                        <Link
                          className="view-tag tag"
                          to={`/submission-data/${id}/${deleted.id}`}
                        >
                          <i className="la la-eye view-tag tag" />
                        </Link>
                      )}
                      {table === 'site' ? (
                        <a
                          href={`/fieldsight/application/#/exports/0/${deleted.id}/${id}/0`}
                          className="edit-tag tag"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <i className="la la-download " />
                        </a>
                      ) : (
                        <a
                          href={`/fieldsight/application/#/exports/1/${deleted.id}/${id}/0`}
                          className="edit-tag tag"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <i className="la la-download " />
                        </a>
                      )}
                      {table === 'site' ? (
                        deleted.fsxf_id ? (
                          <Link
                            className="pending-tag tag"
                            to={`/site-version-submission/${id}/${deleted.fsxf_id}`}
                          >
                            <i className="la la-clone edit-tag tag" />
                          </Link>
                        ) : (
                          <Link
                            className="pending-tag tag"
                            to={`/site-version-submission/${id}/${deleted.id}`}
                          >
                            <i className="la la-clone edit-tag tag" />
                          </Link>
                        )
                      ) : deleted.fsxf_id ? (
                        <Link
                          className="pending-tag tag"
                          to={`/project-version-submission/${id}/${deleted.fsxf_id}`}
                        >
                          <i className="la la-clone edit-tag tag" />
                        </Link>
                      ) : (
                        <Link
                          className="pending-tag tag"
                          to={`/project-version-submission/${id}/${deleted.id}`}
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
      </>
    );
  }
}

export default DeleteTable;
