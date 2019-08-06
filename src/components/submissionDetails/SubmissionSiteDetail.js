import React from "react";
import { Link } from "react-router-dom";

const SubmissionSiteDetail = ({
  site: { id, name, region, identifier, logo }
}) => {
  return (
    <div className="col-lg-6">
      <div className="card">
        <div className="card-header main-card-header">
          <h5>site details</h5>
        </div>
        <div className="card-body site-details">
          <figure style={{ backgroundImage: `url(${logo})` }}>
            {/* <img src={logo} alt="profile" /> */}
          </figure>
          <div className="content">
            <h4>
              <Link to={`/site-dashboard/${id}`}>{name}</Link>
            </h4>
            <p>{region}</p>
            <time>{identifier}</time>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmissionSiteDetail;
