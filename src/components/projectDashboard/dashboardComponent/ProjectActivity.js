import React from "react";
import CountCard from "../../common/CountCard";

const getIcon = submission => {
  if (submission === "approved") {
    return "la-thumbs-up";
  } else if (submission === "flagged") {
    return "la-flag";
  } else if (submission === "marker") {
    return "la-map-marker";
  }
};
const ShowAcitivity = props => (
  <div className="col-xl-4 col-md-6">
    <CountCard
      countName={props.name}
      icon={getIcon(props.name)}
      className={props.name}
      countNumber={props.value}
    />
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
        </div>
        <div className="card-body">
          <div className="row">
            <ShowAcitivity
              name="approved"
              value={projectActivity.submissions_in_last_7_days}
            />
            <ShowAcitivity
              name="flagged"
              value={projectActivity.active_supervisors_in_last_7_days}
            />
            <ShowAcitivity
              name="marker"
              value={projectActivity.site_visits_in_last_7_days}
            />
          </div>
        </div>
      </div>
    );
  }
}
export default ProjectActivity;
