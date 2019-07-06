import React from "react";
import SiteInformationCard from "./SiteInformationCard";
import SiteProgressCard from "./SiteProgressCard";
import isEmpty from "../../utils/isEmpty";
const IdentityForm = ({
  forms,
  terms,
  siteIdentityHandler,
  siteBasicInfo,
  projectSettings,
  siteProgressHandler
}) => (
  <div className="identity-form mrb-15">
    <div className="row">
      <div className="col-lg-4">
        <div className="site_photo_form">
          <SiteInformationCard
            forms={forms}
            title={!isEmpty(terms) ? `${terms.site} Photo` : "Site Photo"}
            infoType="photo"
            siteIdentityHandler={siteIdentityHandler}
            siteInfo={siteBasicInfo && siteBasicInfo.site_picture}
          />
        </div>
      </div>
      <div className="col-lg-4">
        <div className="site-location">
          <SiteInformationCard
            forms={forms}
            title={!isEmpty(terms) ? `${terms.site} Location` : "Site Location"}
            infoType="geopoint"
            siteIdentityHandler={siteIdentityHandler}
            siteInfo={siteBasicInfo && siteBasicInfo.site_location}
          />
        </div>
      </div>
      <div className="col-lg-4">
        <div className="site-location">
          <SiteProgressCard
            forms={forms}
            title={!isEmpty(terms) ? `${terms.site} Progress` : "Site Progress"}
            projectSettings={projectSettings}
            siteProgressHandler={siteProgressHandler}
          />
        </div>
      </div>
    </div>
  </div>
);

export default IdentityForm;
