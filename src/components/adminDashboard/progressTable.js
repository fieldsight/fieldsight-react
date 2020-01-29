import React, { Fragment } from 'react';
import Table from 'react-bootstrap/Table';
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
import { FormattedMessage } from 'react-intl';
import { BlockContentLoader } from '../common/Loader';

/* eslint-disable */

const ShowRow = ({ name }) => (
  <>
    <tr>
      <td />
      <td>{!!name && <strong>{name}</strong>}</td>
      <td />
      <td />
      <td />
      <td />
      <td />
      <td />
    </tr>
  </>
);

const ShowContentRow = ({
  sn,
  id,
  pending,
  approved,
  flagged,
  rejected,
  title,
}) => {
  const totalSubmissions = pending + approved + flagged + rejected;
  return (
    <tr
      className={id ? 'sub-row' : 'heading-row'}
      key={id ? `row_${title}_${sn}_${id}` : `row_${title}_${sn}`}
    >
      <td>{sn}</td>
      <td>{title}</td>
      <a
        className="pending table-profile"
        href={`/fieldsight/application/#/organization-submission/${id}`}
      >
        <i className="la la-eye" />

        {totalSubmissions === 0
          ? 'No Submission'
          : totalSubmissions > 1
          ? `${totalSubmissions} Submissions`
          : `${totalSubmissions} Submission`}
      </a>
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
    </tr>
  );
};

class ProgressTable extends React.PureComponent {
  render() {
    const data = [
      {
        id: '169',
        title: 'form7',
        form_type: 'General',
        submissions: {
          rejected: 0,
          approved: 0,
          pending: 0,
          flagged: 0,
        },
      },
      {
        id: '169',
        title: 'form7',
        form_type: 'Scheduled',
        submissions: {
          rejected: 0,
          approved: 0,
          pending: 0,
          flagged: 0,
        },
      },
      {
        id: '169',
        title: 'form7',
        form_type: 'Scheduled',
        submissions: {
          rejected: 0,
          approved: 0,
          pending: 0,
          flagged: 0,
        },
      },
      {
        id: '1608',
        title: 'form7',
        form_type: 'General',
        submissions: {
          rejected: 0,
          approved: 0,
          pending: 0,
          flagged: 0,
        },
      },
      {
        id: '1600',
        title: 'form7',
        form_type: 'Scheduled',
        submissions: {
          rejected: 0,
          approved: 0,
          pending: 0,
          flagged: 0,
        },
      },
      {
        id: '168',
        title: 'form7',
        form_type: 'Scheduled',
        submissions: {
          rejected: 0,
          approved: 0,
          pending: 0,
          flagged: 0,
        },
      },
    ];
    const { progressTable, loader } = this.props;
    const sn = 1;

    return (
      <>
        {/* {loader ? (
          <BlockContentLoader number={10} height="25px" />
        ) : ( */}
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
                  </tr>
                </thead>
                <tbody>
                  {/* {data &&
                      data.map(progress => (
                        <ShowRow name={progress.form_type} />
                      ))} */}
                  {Object.keys(
                    !!progressTable && progressTable.length > 0,
                  ) && <ShowRow name="General Forms" />}
                  {!!progressTable &&
                    progressTable.map((schedule, id) => (
                      <>
                        {schedule.form_type === 'General' && (
                          <ShowContentRow
                            sn={sn + id}
                            pending={schedule.submissions.pending}
                            approved={schedule.submissions.approved}
                            flagged={schedule.submissions.flagged}
                            rejected={schedule.submissions.rejected}
                            title={schedule.title}
                            id={schedule.id}
                          />
                        )}
                      </>
                    ))}

                  {Object.keys(
                    !!progressTable && progressTable.length > 0,
                  ) && <ShowRow name="Schedule Forms" />}
                  {!!progressTable &&
                    progressTable.map((schedule, id) => (
                      <>
                        {schedule.form_type === 'Scheduled' && (
                          <ShowContentRow
                            sn={sn + id}
                            pending={schedule.submissions.pending}
                            approved={schedule.submissions.approved}
                            flagged={schedule.submissions.flagged}
                            rejected={schedule.submissions.rejected}
                            title={schedule.title}
                            id={schedule.id}
                          />
                        )}
                      </>
                    ))}
                </tbody>
              </Table>
            </PerfectScrollbar>
          </div>
        </div>
        {/* )} */}
      </>
    );
  }
}
export default ProgressTable;
