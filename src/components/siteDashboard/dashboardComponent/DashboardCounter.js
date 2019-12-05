import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import uuid from 'uuid/v4';
import CountCard from '../../common/CountCard';
/* eslint-disable camelcase */

class DashboardCounter extends Component {
  getIcon = submission => {
    let icon = '';
    if (submission === 'rejected') {
      icon = 'la-close';
    }
    if (submission === 'approved') {
      icon = 'la-thumbs-up';
    }
    if (submission === 'flagged') {
      icon = 'la-flag';
    }
    if (submission === 'pending') {
      icon = 'la-hourglass-2';
    }
    return icon;
  };

  render() {
    const {
      props: {
        submissions: { total_submissions, ...restSubmissions },
        siteid,
      },
      getIcon,
    } = this;
    const submissionData = Object.entries(restSubmissions);

    return (
      <>
        {submissionData &&
          submissionData.map(submission => (
            <Link
              to={`/site-responses/${siteid}/${submission[0]}`}
              className="col-xl-3 col-md-6"
              key={uuid()}
            >
              <CountCard
                countName={submission[0]}
                countNumber={submission[1]}
                className={submission[0]}
                icon={getIcon(submission[0])}
              />
            </Link>
          ))}
      </>
    );
  }
}

export default DashboardCounter;
