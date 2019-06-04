import React, { Component } from 'react'
import { Route, Switch } from "react-router-dom";
import "../css/bootstrap.min.css"
import "../css/main.css"
import LeftSidebar from './LeftSidebar';
import EditProject from './EditProject';
import SiteType from './siteType/SiteType';
import SiteInformation from './siteInfo/SiteInformation';
import SiteManage from './SiteManage';
import MapLayer from './MapLayer';

export default class Settings extends Component {
    render() {
        return (
            <div id="fieldsight-new" className="fieldsight-new">
                <div id="main-container" className="minified">
                    <div className="container-fluid">
                        <nav aria-label="breadcrumb" role="navigation">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><a href="/fieldsight/organization/">Teams</a></li>
                                <li className="breadcrumb-item"><a href="/fieldsight/organization-dashboard/13/">Build Change</a></li>

                                <li className="breadcrumb-item active" aria-current="page">DFID 31 District Retrofitting</li>
                            </ol>
                        </nav>
                        <main id="main-content">
                            <div className="row">
                                <div className="col-xl-3 col-lg-4">
                                    <div className="left-sidebar new-sidebar sticky-top">
                                        <div className="card">
                                            <div className="card-header main-card-header">
                                                <h5>Meta Attributes</h5>
                                            </div>
                                            <div className="card-body">
                                                <LeftSidebar />

                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <div className="col-xl-9 col-lg-8">
                                    <div className="right-content">
                                        <div className="tab-content">
                                            <Switch>
                                                <Route exact path="/" component={EditProject} />
                                                <Route path="/site-type" component={SiteType} />
                                                <Route path="/site-information" component={SiteInformation} />
                                                <SiteManage />
                                                <Route path="/manage-site" component={SiteInformation} />
                                                <Route path="/map-layer" component={MapLayer} />
                                            </Switch>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        )
    }
}



