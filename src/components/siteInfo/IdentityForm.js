import React from 'react'
import SelectElement from '../common/SelectElement'
import SiteInformationCard from './SiteInformationCard'

const IdentityForm = () => (
    <div className="identity-form">
        <div className="row">
            <div className="col-lg-6">
                <div className="site_photo_form">
                    <SiteInformationCard title="Site Information">
                        <form>
                            <SelectElement className="wide photo-choose-form" options={["Upload", "choose from form", "choose from gallery"]} />
                            <div className="hide-form">
                                <SelectElement className="wide" options={["Daily activity diary", "Baseline survey"]} />
                                <SelectElement className="wide" options={["Question", "Home owner's photo", "House photo"]} />
                                <div className="form-group pull-right mr-0">
                                    <button type="submit" className="fieldsight-btn">Save</button>
                                </div>
                            </div>
                        </form>
                    </SiteInformationCard>
                </div>
            </div>
            <div className="col-lg-6">
                <div className="site-location">
                    <SiteInformationCard title="Site Location">
                        <form>
                            <SelectElement className="wide location-choose-form" options={["Enter a location / choose on map", "choose from form"]} />
                            <div className="hide-form">
                                <SelectElement className="wide" options={["Daily activity diary", "Baseline survey"]} />

                                <SelectElement className="wide" options={["Please take GPS of this house", "House location"]} />

                                <div className="form-group pull-right mr-0">
                                    <button type="submit" className="fieldsight-btn">Save</button>
                                </div>
                            </div>
                        </form>
                    </SiteInformationCard>
                </div>
            </div>
        </div>
    </div>
)

export default IdentityForm