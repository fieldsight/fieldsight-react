import React from "react";
import SiteInformationCard from "./SiteInformationCard";

const IdentityForm = ({ forms, siteIdentityHandler }) => (
  <div className="identity-form">
    <div className="row">
      <div className="col-lg-6">
        <div className="site_photo_form">
          <SiteInformationCard
            forms={forms}
            title="Site Photo"
            infoType="photo"
            siteIdentityHandler={siteIdentityHandler}
          />
        </div>
      </div>
      <div className="col-lg-6">
        <div className="site-location">
          <SiteInformationCard
            forms={forms}
            title="Site Location"
            infoType="geopoint"
            siteIdentityHandler={siteIdentityHandler}
          />
        </div>
      </div>
    </div>
  </div>
);

export default IdentityForm;
