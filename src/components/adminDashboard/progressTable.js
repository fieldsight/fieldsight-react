import React, { Fragment } from 'react';
import Table from 'react-bootstrap/Table';
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
import { BlockContentLoader } from '../common/Loader';

/* eslint-disable */

const ShowRow = ({ name }) => (
  <Fragment key={name}>
    <tr>
      <td />
      <td>{!!name && <strong>{name}</strong>}</td>
      <td colSpan={7} />
    </tr>
  </Fragment>
);

const ShowContentRow = ({
  sn,
  orgId,
  id,
  pending,
  approved,
  flagged,
  rejected,
  title,
}) => {
  const totalSubmissions = pending + approved + flagged + rejected;
  const key = id ? `row_${title}_${sn}_${id}` : `row_${title}_${sn}`;
  return (
    <tr className={id ? 'sub-row' : 'heading-row'} key={key}>
      <td>{sn}</td>
      <td>{title}</td>
      <td>
        <a
          className="pending table-profile"
          href={`/fieldsight/application/#/organization-submission/${orgId}/${id}`}
        >
          <i className="la la-eye" />

          {totalSubmissions === 0
            ? 'No Submission'
            : totalSubmissions > 1
            ? `${totalSubmissions} Submissions`
            : `${totalSubmissions} Submission`}
        </a>
      </td>
      <td>
        <a className="pending">{pending}</a>
      </td>
      <td>
        <a className="approved">{approved}</a>
      </td>
      <td>
        <a className="flagged">{flagged}</a>
      </td>
      <td>
        <a className="rejected">{rejected}</a>
      </td>
      <td>
        <a
          href={`/fieldsight/application/#/organization-exports/${orgId}/${id}`}
          className="edit-tag tag"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="la la-download " />
        </a>
      </td>
    </tr>
  );
};

class ProgressTable extends React.PureComponent {
  render() {
    const { progressTable, loader, orgId } = this.props;
    const sn = 1;

    return (
      <>
        {loader ? (
          <BlockContentLoader number={10} height="25px" />
        ) : (
          <div className="card-body">
            <div style={{ position: 'relative', height: '400px' }}>
              <PerfectScrollbar>
                <Table
                  responsive="xl"
                  className="table  table-bordered  dataTable "
                >
                  <thead>
                    <tr>
                      <th>SN</th>
                      <th>Name</th>
                      <th>View Submissions</th>
                      <th>Pending</th>
                      <th>Approved</th>
                      <th>Flagged</th>
                      <th>Rejected</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.keys(
                      !!progressTable && progressTable.length > 0,
                    ) && <ShowRow name="General Forms" />}
                    {!!progressTable &&
                      progressTable.map((schedule, id) => (
                        <Fragment key={schedule.id}>
                          {schedule.form_type === 'General' && (
                            <ShowContentRow
                              sn={sn + id}
                              pending={schedule.submissions.pending}
                              approved={schedule.submissions.approved}
                              flagged={schedule.submissions.flagged}
                              rejected={schedule.submissions.rejected}
                              title={schedule.title}
                              id={schedule.id}
                              orgId={orgId}
                            />
                          )}
                        </Fragment>
                      ))}

                    {Object.keys(
                      !!progressTable && progressTable.length > 0,
                    ) && <ShowRow name="Scheduled Forms" />}

                    {!!progressTable &&
                      progressTable.map((schedule, id) => (
                        <Fragment key={schedule.id}>
                          {schedule.form_type === 'Scheduled' && (
                            <ShowContentRow
                              sn={sn + id}
                              pending={schedule.submissions.pending}
                              approved={schedule.submissions.approved}
                              flagged={schedule.submissions.flagged}
                              rejected={schedule.submissions.rejected}
                              title={schedule.title}
                              id={schedule.id}
                              orgId={orgId}
                            />
                          )}
                        </Fragment>
                      ))}
                  </tbody>
                </Table>
              </PerfectScrollbar>
            </div>
          </div>
        )}
      </>
    );
  }
}
export default ProgressTable;
