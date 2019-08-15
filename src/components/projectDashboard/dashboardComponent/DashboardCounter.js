import React from "react";
import uuid from "uuid/v4";
import CountCard from "../../common/CountCard";

const submissionData = [
  { key: 1, text: "Rejected", value: "rejected" },
  { key: 2, text: "approved", value: "approved" },
  { key: 3, text: "flagged", value: "flagged" },
  { key: 4, text: "pending", value: "pending" }
];
class DashboardCounter extends React.Component {
  getIcon = submission => {
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
  render() {
    return (
      <div className="dashboard-counter mrt-30">
        <div className="row">
          {submissionData.map(submission => (
            <div className="col-xl-3 col-md-6" key={uuid()}>
              <CountCard
                countName={submission.text}
                countNumber={submission.key}
                className={submission.value}
                icon={this.getIcon(submission.value)}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
}
export default DashboardCounter;
