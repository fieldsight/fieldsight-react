import React from "react";
import CountCard from "../../common/CountCard";

const getIcon = submission => {
  if (submission === "approved") { 
    return "la-copy";
  } else if (submission === "flagged") {
    return "la-users";
  } else if (submission === "marker") {
    return "la-map-marker";
  }
};
const ShowAcitivity = props => (
  <div className="col-xl-4 col-md-6">
    <div className="count-card">
      <div className={`count-icon ${props.type}`}>
        <i className={`la ${getIcon(props.type)}`}> </i>
      </div>
      <div className="count-content">
        <h4>{props.value}</h4>
        <h6>{props.name}</h6>
      </div>
    </div>
    {/* <CountCard
      countName={props.name}
      icon={getIcon(props.type)}
      className={props.type}
      countNumber={props.value}
      noSubmissionText=""
    /> */}
  </div>
);
class ProjectActivity extends React.Component {
  render() {
    const { projectActivity } = this.props;
    return (
      <div className="dashboard-counter mrt-30 bg-counter">
        <div className="card">
          <div className="card-header main-card-header sub-card-header">
            <h5>Project activity</h5>
          </div>
          <div className="card-body">
            <div className="row">
              <ShowAcitivity
                type="approved"
                name="Submissions In Last 7 Days"
                value={projectActivity.submissions_in_last_7_days}
              />
              <ShowAcitivity
                type="flagged"
                name="Active Supervisors In Last 7 Days"
                value={projectActivity.active_supervisors_in_last_7_days}
              />
              <ShowAcitivity
                type="marker"
                name="Site Visits In Last 7 Days"
                value={projectActivity.site_visits_in_last_7_days}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default ProjectActivity;
