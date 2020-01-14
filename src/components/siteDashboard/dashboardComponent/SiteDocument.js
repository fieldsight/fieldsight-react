import React from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import { GridContentLoader } from "../../common/Loader";

const SiteDocument = ({
  siteDocuments,
  showContentLoader,
  siteId,
  termsAndLabels
}) => (
  <div className="col-xl-4 col-md-6">
    <div className="card ">
      <div className="about">
        <div className="card-header main-card-header sub-card-header">
          <h5>{termsAndLabels && termsAndLabels.site} Documents</h5>
          {siteDocuments.length > 0 ? (
            <a
              href={`/fieldsight/application/#/site-documents/${siteId}/`}
              className="fieldsight-btn"
              target="_blank"
            >
              view all
            </a>
          ) : null}
        </div>
        <div
          className="card-body about-body"
          style={{ position: "relative", height: "358px" }}
        >
          {showContentLoader ? (
            <GridContentLoader
              number={window.innerWidth < 992 ? 2 : 6}
              height="140px"
            />
          ) : (
            <PerfectScrollbar>
              <div className="doc-body">
                {siteDocuments.length > 0 ? (
                  <div className="row">
                    {siteDocuments.map((doc, i) => (
                      <div className="col-lg-4 col-md-6 col-sm-4" key={i}>
                        <div className="doc-item">
                          <div className="doc-wrapper">
                            <figure>
                              <img
                                src={`/static/images/${doc.type}.png`}
                                alt=""
                              />
                            </figure>
                            <div className="doc-content">
                              <h6>
                                <a href={doc.file} target="_blank">
                                  {" "}
                                  {doc.name}
                                </a>
                              </h6>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p> No Documents Available </p>
                )}
              </div>
            </PerfectScrollbar>
          )}
        </div>
      </div>
    </div>
  </div>
);

export default SiteDocument;
