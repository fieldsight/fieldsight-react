import React, { Component } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
class SiteDocument extends Component {
  render() {
    const { siteDocuments } = this.props;
    return (
      <React.Fragment>
        <PerfectScrollbar>
          <div className="doc-body">
            <div className="row">
              {siteDocuments.map(doc => (
                <div className="col-lg-4 col-md-6 col-sm-4">
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
      </React.Fragment>
    );
  }
}
export default SiteDocument;
