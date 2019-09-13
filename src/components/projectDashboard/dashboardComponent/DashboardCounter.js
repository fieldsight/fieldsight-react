import React from "react";
import CountCard from "../../common/CountCard";

const getIcon = submission => {
  if (submission === "rejected") {
    return "la-close";
  } else if (submission === "approved") {
    return "la-thumbs-up";
  } else if (submission === "flagged") {
    return "la-flag";
  } else if (submission === "pending") {
    return "la-hourglass-2";
  }
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
class DashboardCounter extends React.Component {
  render() {
    const { projectActivity } = this.props;

    return (
      <div className="dashboard-counter mrt-30">
        <div className="row">
          <ShowCount
            name="pending"
            count={projectActivity.pending_submissions}
          />
          <ShowCount
            name="approved"
            count={projectActivity.approved_submissions}
          />
          <ShowCount
            name="flagged"
            count={projectActivity.flagged_submissions}
          />
          <ShowCount
            name="rejected"
            count={projectActivity.rejected_submissions}
          />
        </div>
      </div>
    );
  }
}
export default DashboardCounter;
