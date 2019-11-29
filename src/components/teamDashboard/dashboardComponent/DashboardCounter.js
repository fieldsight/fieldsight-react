import React, { PureComponent } from 'react';
import CountCard from '../../common/CountCard';
/* eslint-disable react/destructuring-assignment */

const getIcon = submission => {
  switch (submission) {
    case 'rejected': {
      return 'la-close';
    }
    case 'approved': {
      return 'la-thumbs-up';
    }
    case 'flagged': {
      return 'la-flag';
    }
    case 'pending': {
      return 'la-copy';
    }
    default: {
      return null;
    }
  }
  // if (submission === 'rejected') {
  // }
  // if (submission === 'approved') {
  // }
  // if (submission === 'flagged') {
  // }
  // if (submission === 'pending') {
  // }
};

const ShowCount = props => (
  <div className="col-xl-3 col-md-6">
    <CountCard
      countName={props.name}
      countNumber={props.count}
      className={props.name}
      icon={getIcon(props.name)}
    />
  </div>
);

class DashboardCounter extends PureComponent {
  render() {
    const { submissions } = this.props;
    return (
      <div className="dashboard-counter mrt-30">
        <div className="row">
          <ShowCount name="pending" count={submissions.pending} />
          <ShowCount name="approved" count={submissions.approved} />
          <ShowCount name="flagged" count={submissions.flagged} />
          <ShowCount name="rejected" count={submissions.rejected} />
        </div>
      </div>
    );
  }
}
export default DashboardCounter;
