import React from "react";

const SubmissionSiteDetail = ({ site: { name, region, identifier, logo } }) => {
  return (
    <div className="col-lg-6">
      <div className="card">
        <div className="card-header main-card-header">
          <h5>site details</h5>
        </div>
        <div className="card-body site-details">
          <figure>
            <img src={logo} alt="profile" />
          </figure>
          <div className="content">
            <h4>{name}</h4>
            <p>{region}</p>
            <time>{identifier}</time>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmissionSiteDetail;
