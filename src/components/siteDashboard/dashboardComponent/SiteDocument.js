import React, { Component } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import { GridContentLoader } from "../../common/Loader";

const SiteDocument = ({ siteDocuments, showContentLoader }) => (
  <>
    {showContentLoader ? (
      <GridContentLoader number={6} />
    ) : (
      <PerfectScrollbar>
        <div className="doc-body">
          <div className="row">
            {siteDocuments.map((doc, i) => (
              <div className="col-lg-4 col-md-6 col-sm-4" key={i}>
                <div className="doc-item">
                  <div className="doc-wrapper">
                    <figure>
                      <img src={`/static/images/${doc.type}.png`} alt="" />
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
        </div>
      </PerfectScrollbar>
    )}
  </>
);

export default SiteDocument;
