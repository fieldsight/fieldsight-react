import React from "react";
import { DotLoader } from "../common/Loader";

const SubmissionSiteDetail = ({
  site: { name, region, identifier, logo },
  dotLoader
}) => {
  return (
    <div className="col-lg-6">
      <div className="card">
        <div className="card-header main-card-header">
          <h5>site details</h5>
        </div>
        {!dotLoader && (
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
        )}
        {dotLoader && <DotLoader />}
      </div>
    </div>
  );
};

export default SubmissionSiteDetail;
