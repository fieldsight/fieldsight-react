import React, { Component } from 'react';

import SiteDashHeader from './dashboardComponent/SiteDashHeader';
import DatatablePage from './dashboardComponent/DatatablePage';
import CustomMap from './dashboardComponent/CustomMap';
import PhotoGallery from './dashboardComponent/PhotoGallery';
import SiteDashDetails from './dashboardComponent/SiteDashInfo';
import DashboardCounter from './dashboardComponent/Dashboard_counter';
import SubmissionChart from './dashboardComponent/SubmissionChart';
import ProgressChart from './dashboardComponent/ProgressChart';
import SiteDocument from './dashboardComponent/SiteDocument';
import ProjectManager from './dashboardComponent/ProjectManager';
import Logs from './dashboardComponent/Logs';



class SiteDashboard extends Component {
    
    render() {
        return (
            <React.Fragment>
                <main id="main-content">
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="right-content no-bg new-dashboard">
                                <SiteDashHeader />
                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="card map">
                                            <div className="card-header main-card-header sub-card-header">
                                                <h5>Project map</h5>
                                                <div className="dash-btn">
                                                    <a href={`#/`} className="fieldsight-btn left-icon"><i className="la la-map"></i> full map</a>
                                                </div>
                                            </div>
                                            <div className="card-body">
                                                <CustomMap />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="card region-table">
                                            <div className="card-header main-card-header sub-card-header">
                                                <h5>Recent photo</h5>
                                            </div>
                                            <div className="card-body"  style={{position:'relative', height:'440px'}}>
                                                <PhotoGallery />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="siteinfo-section mrt-30">
                                    <div className="row">
                                        <div className="col-xl-6 col-md-12">
                                            <div className="card site_dashboard_info">
                                                <div className="card-header main-card-header sub-card-header">
                                                    <h5>Site information</h5>
                                                </div>
                                                <div className="card-body site-info board-site-info" style={{position:'relative', height:'434px'}}>
                                                    <SiteDashDetails />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-xl-6 col-md-12">
                                            <div className="card region-table">
                                                <div className="card-header main-card-header sub-card-header">
                                                    <h5>Submission table</h5>
                                                    <div class="add-btn">
                                                        <a href={`#/`} data-tab="scheduled-popup">Add new <span><i className="la la-plus"></i></span></a>
                                                    </div>
                                                </div>
                                                <div className="card-body" style={{position:'relative', height:'434px'}}>
                                                    <DatatablePage />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="dashboard-counter mrt-30">
                                    <div className="row">
                                        <DashboardCounter />
                                    </div>
                                </div>
                                <div className="chart mrb-30">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="card">
                                                <div className="card-header main-card-header sub-card-header">
                                                    <h5>Form submissions</h5>
                                                </div>
                                                <div className="card-body">
                                                    <SubmissionChart />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="card">
                                                <div className="card-header main-card-header sub-card-header">
                                                    <h5>Site progress</h5>
                                                </div>
                                                <div className="card-body">
                                                    <ProgressChart />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div> 
                                <div className="about-section ">
                                    <div className="row">
                                        <div className="col-xl-4 col-md-6">
                                            <div className="card ">
                                                <div className="about" >
                                                    <div className="card-header main-card-header sub-card-header">
                                                        <h5>Site Documents</h5>
                                                    </div>
                                                    <div className="card-body about-body" style={{position:'relative', height:'358px'}}>
                                                        <SiteDocument />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-xl-4 col-md-6">
                                            <div className="card mangager-list">
                                                <div className="card-header main-card-header sub-card-header">
                                                    <h5>Users</h5>
                                                    <div className="dash-btn">
                                                        <form className="floating-form">
                                                            <div className="form-group mr-0">
                                                                <input type="search" className="form-control" required/>
                                                                <label for="input">Search</label>
                                                                <i className="la la-search"></i>
                                                            </div>
                                                        </form>
                                                        <a href={`#/`} className="fieldsight-btn"><i className="la la-plus"></i></a>
                                                    </div>
                                                </div>
                                                <div className="card-body">
                                                    <div className="thumb-list mr-0 " style={{position:'relative', height:'312px'}}>
                                                    <ProjectManager />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-xl-4 col-md-12">
                                            <div className="card logs">
                                                <div className="card-header main-card-header sub-card-header">
                                                    <h5>Logs</h5>
                                                    <a href={`#/`} className="fieldsight-btn">view all</a>
                                                </div>
                                                <div className="card-body">
                                                    <div className="logs-list" style={{position:'relative', height:'314px'}}>
                                                    <Logs />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </React.Fragment>
        );
    }
}

export default SiteDashboard;
