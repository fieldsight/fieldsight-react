import React from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import { DotLoader } from "../common/Loader";

const SubmissionSiteInfo = ({ siteInformation }) => (
  <div className="col-lg-6">
    <div className="card">
      <div className="card-header main-card-header">
        <h5>site information</h5>
      </div>

      <div
        className="card-body site-info submission-site-info"
        style={{ position: "relative", height: "290px" }}
      >
        {siteInformation && Object.keys(siteInformation).length > 0 ? (
          <PerfectScrollbar>
            <ul>
              {Object.entries(siteInformation).map((info, i) => (
                <li key={`${info[0]}${i}`}>
                  <label>{info[0]} :</label>
                  {info[1]}
                </li>
              ))}
            </ul>
          </PerfectScrollbar>
        ) : (
          <p>Site Information not available</p>
        )}
      </div>
    </div>
  </div>
);

export default SubmissionSiteInfo;
