import React, { Component } from "react";
import CountCard from "../../common/CountCard";

const getIcon = submission => {
  if (submission === "rejected") {
    return "la-close";
  } else if (submission === "approved") {
    return "la-thumbs-up";
  } else if (submission === "flagged") {
    return "la-flag";
  } else if (submission === "pending") {
    return "la-copy";
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

class DashboardCounter extends Component {
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
