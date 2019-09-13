import React, { Component } from "react";
import uuid from "uuid/v4";
import CountCard from "../../common/CountCard";

class DashboardCounter extends Component {
  getIcon = submission => {
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

  render() {
    const {
      props: {
        submissions: { total_submissions, ...restSubmissions }
      },
      getIcon
    } = this;
    const submissionData = Object.entries(restSubmissions);

    return (
      <React.Fragment>
        {submissionData &&
          submissionData.map(submission => (
            <div className="col-xl-3 col-md-6" key={uuid()}>
              <CountCard
                countName={submission[0]}
                countNumber={submission[1]}
                className={submission[0]}
                icon={getIcon(submission[0])}
              />
            </div>
          ))}
      </React.Fragment>
    );
  }
}

export default DashboardCounter;
