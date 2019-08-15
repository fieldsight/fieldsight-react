import React from "react";
import CountCard from "../../common/CountCard";
import uuid from "uuid/v4";

const submissionData = [
  { key: 1, text: "Submissions In Last 7 Days", value: "approved" },
  { key: 2, text: "Active Supervisors In Last 7 Days", value: "flagged" },
  { key: 3, text: "Site Visits In Last 7 Days", value: "marker" }
];
class ProjectActivity extends React.Component {
  getIcon = submission => {
    if (submission === "approved") {
      return "la-thumbs-up";
    } else if (submission === "flagged") {
      return "la-flag";
    } else if (submission === "marker") {
      return "la-map-marker";
    }
  };
  render() {
    return (
      <div className="dashboard-counter mrt-30 bg-counter">
        <div className="card">
          <div className="card-header main-card-header sub-card-header">
            <h5>Project activity</h5>
          </div>
        </div>
        <div className="card-body">
          <div className="row">
            {submissionData.map(submission => (
              <div className="col-xl-4 col-md-6" key={uuid()}>
                <CountCard
                  countName={submission.text}
                  icon={this.getIcon(submission.value)}
                  className={submission.value}
                  countNumber={12}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
export default ProjectActivity;
