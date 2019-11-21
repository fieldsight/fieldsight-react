import React from "react";
import CountCard from "../../common/CountCard";
import { Link } from "react-router-dom";

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
    <Link to={props.link}>
      <CountCard
        countName={props.name}
        countNumber={props.count}
        className={props.name}
        icon={getIcon(props.name)}
        id={props.id}
      />
    </Link>
  </div>
);
class DashboardCounter extends React.Component {
  render() {
    const { projectActivity, id } = this.props;

    return (
      <div className="dashboard-counter mrt-30">
        <div className="row">
          <ShowCount
            name="pending"
            count={projectActivity.pending_submissions}
            link={`/project-responses/${id}/pending`}
            id="app.pending"
          />
          <ShowCount
            name="approved"
            count={projectActivity.approved_submissions}
            link={`/project-responses/${id}/approved`}
            id="app.approved"
          />
          <ShowCount
            name="flagged"
            count={projectActivity.flagged_submissions}
            link={`/project-responses/${id}/flagged`}
            id="app.flagged"
          />
          <ShowCount
            name="rejected"
            count={projectActivity.rejected_submissions}
            link={`/project-responses/${id}/rejected`}
            id="app.pending"
          />
        </div>
      </div>
    );
  }
}
export default DashboardCounter;
