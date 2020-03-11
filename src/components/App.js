import React, { Component } from 'react';
import {
  HashRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import { ToastContainer } from 'react-toastify';

import setDefault from '../config';
import Settings from './settings/Settings';
import MyForm from './myForm/MyformMain';
import SiteDashboard from './siteDashboard';
import SiteList from './projectSiteList/SiteList';
import SubmissionDetails from './submissionDetails';
import MyrolesMain from './myRoles/MyrolesMain';
import RegionSite from './regionalSite/RegionSite';
import SiteDocument from './siteDocument/siteDocument';
import SiteUsers from './userDocument';
import TeamUser from './teamUsers';
import ProjectUser from './projectUsers';
import ProjectList from './projectList';
import ProjectDashboard from './projectDashboard';
import ProjectLog from './projectLogs';
import Teams from './team';
import SiteLog from './siteLogs';
import ProjectAdd from './projectAdd';
import TeamAdd from './teamAdd';
import SiteAdd from './siteAdd';
import EditSite from './SiteEdit';
import MapFilter from './mapfilter/MapFilter';

import SiteSubmissionData from './viewDataComponents/siteViewData/formSubmission';
import VersionSubmissionData from './viewDataComponents/projectViewData/versionTable';
import VersionSiteSubmission from './viewDataComponents/siteViewData/versionTable';
import SubmissionData from './viewDataComponents/projectViewData/submissionTable';

import SpecificViewData from './viewDataComponents/projectViewData/siteSpecificForm';
import SubmissionForm from './viewDataComponents/projectViewData/submissionForm';
import SiteViewData from './viewDataComponents/siteViewData/siteResponses';
import SiteSubmissionForm from './viewDataComponents/siteViewData/submissionForm';

import TeamDashboard from './teamDashboard';
import TeamSetting from './settings/TeamSettings';
import ManageForms from './manageForms';
import Mapparent from './team/Mapparent';
import ResetPassword from './resetPassword';
import UpdateProfile from './updateProject';
import CreateProfile from './ProfileAdd';

// import Header from "./headers";
// import SideNav from "./sideNav";
import ChangePassword from './changePassword';

import SyncSchedule from './syncSchedule';
// import SelectElement from "../components/common/SelectElement";

import AdminDashboard from './adminDashboard';
import SuperAdminFormEdit from './superAdminEdit';
import SuperAdminForm from './superAdminForm';
import SuperAdminSetting from './adminDashboard/organizationSettings/settings';
import OragnizatonProjectList from './organizationProjectList';
import OrganizationUserList from './organizationUserList';
import OrganizationTeams from './organizationTeamList';
import TotalOrganizationSubmission from './adminDashboard/organizationSettings/totalOrganizationSubmission';
import TotalSiteSubmission from './adminDashboard/organizationSettings/totalSiteSubmission';

import OrganizationExport from './excelExport/OrganizationExport';
import ExcelExport from './excelExport';
import StandardReports from './standardReports';
import FormDataFilter from './standardReports/FormDataFilter';
import ActivityExportFile from './standardReports/ActivityExportFile';
import UserExportReport from './standardReports/UserExportReport';
import ExportDataFilter from './standardReports/ExportDataFilter';

import CustomReports from './customReports';
import AddNewReport from './customReports/addNewReport';
import DataExport from './customReports/dataExport';
import ViewReport from './viewReports';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import 'react-perfect-scrollbar/dist/css/styles.css';
import 'react-datepicker/dist/react-datepicker.css';
import 'cropperjs/dist/cropper.css';
import '../css/line-awesome.min.css';
import '../scss/style.scss';
import '../css/custom.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: 0,
      // region: false,
      // selectedLanguage: language,
      // toggleClass: false,
    };
  }

  componentWillMount() {
    setDefault();
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions = () => {
    this.state.height = window.innerHeight - 181;
  };

  render() {
    const { height } = this.state;
    return (
      <div id="fieldsight-new" className="fieldsight-new">
        {/* <Header
            toggleClass={this.state.toggleClass}
            handleToggle={this.handleToggle}
          /> */}
        {/* <div
            id="main-container"
            className={`${!toggleClass ? 'minified' : ''}`}
          >
            {/* <SideNav handleToggle={this.handleToggle} /> */}
        {/* <div className="container-fluid"> */}
        <main id="main-content" className="main-content">
          <Router>
            <Switch>
              <Route
                path="/project-settings"
                render={props => <Settings {...props} />}
              />
              <Route
                path="/team-settings/:id"
                render={props => (
                  <TeamSetting {...props} height={height} />
                )}
              />
              <Route
                path="/forms"
                render={props => <MyForm {...props} />}
              />
              <Route
                path="/project-sitelist"
                render={props => <SiteList {...props} />}
              />
              <Route
                path="/submission-details"
                render={props => <SubmissionDetails {...props} />}
              />
              <Route
                path="/site-dashboard/:id"
                render={props => <SiteDashboard {...props} />}
              />
              <Route
                path="/my-roles"
                render={props => <MyrolesMain {...props} />}
              />
              <Route
                path="/profile/:profileId"
                render={props => <MyrolesMain {...props} />}
              />
              <Route
                path="/regional-site/:id"
                render={props => <RegionSite {...props} />}
              />
              <Route
                path="/site-documents/:id"
                render={props => <SiteDocument {...props} />}
              />
              <Route
                path="/project-dashboard/:id"
                render={props => <ProjectDashboard {...props} />}
              />
              <Route
                path="/team-dashboard/:id"
                render={props => <TeamDashboard {...props} />}
              />
              <Route
                path="/site-users/:id"
                render={props => <SiteUsers {...props} />}
              />
              <Route
                path="/project-users/:id"
                render={props => <ProjectUser {...props} />}
              />
              <Route
                path="/team-users/:id"
                render={props => <TeamUser {...props} />}
              />
              <Route
                path="/team-projects/:id"
                render={props => <ProjectList {...props} />}
              />
              <Route
                path="/teams"
                render={props => (
                  <Teams {...props} orgs="organization" />
                )}
              />
              <Route
                path="/organization-teams/:id"
                render={props => <OrganizationTeams {...props} />}
              />
              <Route
                path="/map"
                render={props => <Mapparent {...props} />}
              />
              <Route
                path="/project_logs/:id"
                render={props => <ProjectLog {...props} />}
              />
              <Route
                path="/site_logs/:id"
                render={props => <SiteLog {...props} />}
              />
              <Route
                path="/project/manage-forms/1/:id"
                render={props => <ManageForms {...props} />}
              />
              <Route
                path="/site/manage-forms/0/:id"
                render={props => <ManageForms {...props} />}
              />
              <Route
                path="/project-add/:id"
                render={props => <ProjectAdd {...props} />}
              />
              <Route
                path="/create-team"
                render={({ match: { url } }) => (
                  <>
                    <Route
                      path={`${url}/`}
                      component={TeamAdd}
                      exact
                    />
                    <Route path={`${url}/:id`} component={TeamAdd} />
                  </>
                )}
              />
              <Route
                path="/create-site/:id"
                render={props => (
                  <SiteAdd {...props} page="CreateSite" />
                )}
              />
              <Route
                path="/regional-site-add/:id/:regionalId"
                render={props => (
                  <SiteAdd {...props} page="regionalSite" />
                )}
              />
              <Route
                path="/sub-site-add/:id/:siteId"
                render={props => (
                  <SiteAdd {...props} page="subSite" />
                )}
              />
              <Route
                path="/site-edit/:id"
                render={props => (
                  <EditSite {...props} page="subSite" />
                )}
              />
              <Route
                path="/submission-data/:id/:fid"
                render={props => <SubmissionData {...props} />}
              />
              <Route
                path="/site-submission-data/:id/:fid"
                render={props => <SiteSubmissionData {...props} />}
              />
              <Route
                path="/site-version-submission/:id/:fid"
                render={props => <VersionSiteSubmission {...props} />}
              />
              <Route
                path="/project-version-submission/:id/:fid"
                render={props => <VersionSubmissionData {...props} />}
              />
              <Route
                path="/change-password"
                render={props => <ChangePassword {...props} />}
              />
              <Route
                path="/sync-schedule/:projectId"
                render={props => <SyncSchedule {...props} />}
              />
              <Route
                path="/reset-password"
                render={props => <ResetPassword {...props} />}
              />
              <Route
                path="/update-profile/:id"
                render={props => <UpdateProfile {...props} />}
              />
              <Route
                path="/create-profile/:id"
                render={props => <CreateProfile {...props} />}
              />
              <Route
                path="/project-responses/:id"
                render={props => <SpecificViewData {...props} />}
              />
              <Route
                path="/project-submission-responses/:id"
                render={props => <SubmissionForm {...props} />}
              />
              <Route
                path="/site-responses/:id"
                render={props => <SiteViewData {...props} />}
              />
              <Route
                path="/site-submission-responses/:id"
                render={props => <SiteSubmissionForm {...props} />}
              />

              <Route
                path="/organization-dashboard/:id"
                render={props => <AdminDashboard {...props} />}
              />
              <Route
                path="/create-organization"
                render={props => <SuperAdminForm {...props} />}
              />
              <Route
                path="/organization-exports/:orgId/:orgLibId"
                render={props => <OrganizationExport {...props} />}
              />
              <Route
                path="/edit-admin/:id"
                render={props => <SuperAdminFormEdit {...props} />}
              />
              <Route
                path="/organization-settings/:id"
                render={props => <SuperAdminSetting {...props} />}
              />

              <Route
                path="/exports/:isProject/:formId/:id/:version"
                render={props => <ExcelExport {...props} />}
              />

              <Route
                path="/organization-projects/:id"
                render={props => (
                  <OragnizatonProjectList {...props} />
                )}
              />
              <Route
                path="/organization-users/:id"
                render={props => <OrganizationUserList {...props} />}
              />
              <Route
                path="/organization-submission/:orgId/:id/"
                render={props => (
                  <TotalOrganizationSubmission {...props} />
                )}
              />
              <Route
                path="/organization-submission-data/:id/:pid"
                render={props => <TotalSiteSubmission {...props} />}
              />
              <Route
                path="/proj-mapfilter/:id"
                render={props => <MapFilter {...props} />}
              />
              <Route
                path="/team-mapfilter/:id"
                render={props => <MapFilter {...props} />}
              />
              <Route
                path="/project/:projectId/report"
                render={props => <StandardReports {...props} />}
              />
              <Route
                path="/export-data/:id/:reportType"
                render={props => <ExportDataFilter {...props} />}
              />
              <Route
                path="/form-data/:id/:fid"
                render={props => <FormDataFilter {...props} />}
              />
              <Route
                path="/activity-export/:id/:reportType"
                render={props => <ActivityExportFile {...props} />}
              />
              <Route
                path="/user-export/:id/:reportType"
                render={props => <UserExportReport {...props} />}
              />
              <Route
                path="/report-list/:projectId/"
                render={props => <CustomReports {...props} />}
              />
              <Route
                path="/view-report/:pid/:id"
                render={props => <ViewReport {...props} />}
              />
              <Route
                path="/data-export/:id"
                render={props => <DataExport {...props} />}
              />
              <Route
                exact
                path="/project/:id/add-report"
                render={props => <AddNewReport {...props} />}
              />
              <Route
                exact
                path="/project/:id/edit-report/:reportId"
                render={props => <AddNewReport {...props} />}
              />
            </Switch>
            <ToastContainer />
          </Router>
        </main>
      </div>
    );
  }
}

export default App;
