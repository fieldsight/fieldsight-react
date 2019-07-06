import React from "react";

const SubmissionSiteInfo = ({ siteInformation }) => (
  <div className="col-lg-6">
    <div className="card">
      <div className="card-header main-card-header">
        <h5>site information</h5>
      </div>

      <div className="card-body site-info submission-site-info">
        {siteInformation && Object.keys(siteInformation).length > 0 ? (
          <ul>
            {Object.entries(siteInformation).map((info, i) => (
              <li key={`${info[0]}${i}`}>
                <label>{info[0]} :</label>
                {info[1]}
              </li>
            ))}
          </ul>
        ) : (
          <p>Site Information not available</p>
        )}
      </div>
    </div>
  </div>
);

export default SubmissionSiteInfo;