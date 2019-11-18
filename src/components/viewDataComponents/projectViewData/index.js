import React, { Component } from 'react';
import {
  HashRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';

import ManageFormSetting from './manageFormSetting/ManageFormSetting';
import ManageGeneralForm from './manageGeneralForm';
import ManageSurveyForm from './manageSurveyForm';
import ManageScheduledForm from './manageScheduledForm';
import ManageStageForm from './manageStageForm';

import ApprovedTable from './ApprovedTable';
import PendingTable from './PendingSubmissionTable';
import RejectedTable from './RejectSubmissionTable';
import FlaggedTable from './FlagedTable';

class ViewData extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hide: true,
      view_btn: false,
      id: props.match.params && props.match.params.id,
      deleted_forms: [],
      generals_forms: [],
      url: props.match.url && props.match.url,
      breadCrumb: {},
    };
  }

  toggleHide = () => {
    this.setState({
      hide: !this.state.hide,
    });
  };

  showViewData = () => {
    const {
      match: { url },
    } = this.props;
    this.setState(
      state => {
        if (!!this.state.view_btn) {
          return {
            url: `${url}/general`,
            view_btn: !this.state.view_btn,
          };
        } else {
          return {
            url: `${url}/rejected`,
            view_btn: !this.state.view_btn,
          };
        }
      },
      () => {
        this.props.history.push(this.state.url);
      },
    );
  };

  componentDidMount() {
    const {
      match: {
        params: { id },
      },
      location: { pathname },
    } = this.props;
    if (
      pathname === `/project-responses/${id}/rejected` ||
      pathname === `/project-responses/${id}/pending` ||
      pathname === `/project-responses/${id}/flagged` ||
      pathname === `/project-responses/${id}/approved`
    ) {
      this.setState({
        id,
        view_btn: true,
      });
    } else if (
      pathname === `/project-responses/${id}/general` ||
      pathname === `/project-responses/${id}/stage` ||
      pathname === `/project-responses/${id}/scheduled` ||
      pathname === `/project-responses/${id}/general-survey`
    ) {
      this.setState({
        view_btn: false,
        id,
      });
    }
  }

  handleBreadCrumb = breadCrumb => {
    if (!!breadCrumb) {
      this.setState({
        breadCrumb,
      });
    }
  };

  componentDidUpdate(preState) {
    const {
      match: {
        params: { id },
      },
      location: { pathname },
    } = this.props;

    if (preState.location.pathname !== pathname) {
      if (
        pathname === `/project-responses/${id}/rejected` ||
        pathname === `/project-responses/${id}/pending` ||
        pathname === `/project-responses/${id}/flagged` ||
        pathname === `/project-responses/${id}/approved`
      ) {
        this.setState({
          id,
          view_btn: true,
        });
      } else if (
        pathname === `/project-responses/${id}/general` ||
        pathname === `/project-responses/${id}/stage` ||
        pathname === `/project-responses/${id}/scheduled` ||
        pathname === `/project-responses/${id}/general-survey`
      ) {
        this.setState({
          view_btn: false,
          id,
        });
      } else if (pathname == `/project-responses/${id}`) {
        this.props.history.push(`/project-responses/${id}/general`) ||
          this.props.history.push(
            `/project-responses/${id}/rejected`,
          );
      }
    }
  }

  render() {
    const {
      match: {
        url: siteUrl,
        // params: { id },
      },
      breadcrumbs,
      height,
    } = this.props;
    const { breadCrumb, view_btn, url, id } = this.state;
    return (
      <React.Fragment>
        <nav aria-label="breadcrumb" role="navigation">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a
                href={
                  breadcrumbs.project_url || breadCrumb.project_url
                }
              >
                {breadcrumbs.project_name || breadCrumb.project_name}
              </a>
            </li>
            <li className="breadcrumb-item">
              {breadcrumbs.current_page || breadCrumb.current_page}
            </li>
          </ol>
        </nav>

        <div className="row">
          <div className="col-xl-3 col-lg-4">
            <div className="left-sidebar new-sidebar sticky-top">
              <div
                className="card no-boxshadow"
                style={{ minHeight: height }}
              >
                <div className="card-header main-card-header">
                  <h5>View Data</h5>
                </div>
                <div className="card-body">
                  <ManageFormSetting
                    show_submission={view_btn}
                    url={url}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-9 col-lg-8">
            <div className="right-content">
              <div className="card">
                <div className="tab-content">
                  <Switch>
                    <Route
                      exact
                      path={`${siteUrl}/general`}
                      render={props => (
                        <ManageGeneralForm
                          showViewData={this.showViewData}
                          data={view_btn}
                          id={id}
                          url={url}
                          handleBreadCrumb={this.handleBreadCrumb}
                          {...props}
                        />
                      )}
                    />

                    <Route
                      path={`${siteUrl}/scheduled`}
                      render={props => (
                        <ManageScheduledForm
                          showViewData={this.showViewData}
                          data={view_btn}
                          id={id}
                          url={url}
                          handleBreadCrumb={this.handleBreadCrumb}
                          {...props}
                        />
                      )}
                    />
                    <Route
                      path={`${siteUrl}/stage`}
                      render={props => (
                        <ManageStageForm
                          showViewData={this.showViewData}
                          data={view_btn}
                          id={id}
                          url={url}
                          handleBreadCrumb={this.handleBreadCrumb}
                          {...props}
                        />
                      )}
                    />

                    <Route
                      path={`${siteUrl}/general-survey`}
                      render={props => (
                        <ManageSurveyForm
                          showViewData={this.showViewData}
                          data={view_btn}
                          id={id}
                          url={url}
                          handleBreadCrumb={this.handleBreadCrumb}
                          {...props}
                        />
                      )}
                    />

                    <Route
                      path={`${siteUrl}/approved`}
                      render={props => (
                        <ApprovedTable
                          showViewData={this.showViewData}
                          data={view_btn}
                          id={id}
                          handleBreadCrumb={this.handleBreadCrumb}
                          {...props}
                        />
                      )}
                    />

                    <Route
                      path={`${siteUrl}/flagged`}
                      render={props => (
                        <FlaggedTable
                          showViewData={this.showViewData}
                          data={view_btn}
                          id={id}
                          handleBreadCrumb={this.handleBreadCrumb}
                          {...props}
                        />
                      )}
                    />
                    <Route
                      path={`${siteUrl}/pending`}
                      render={props => (
                        <PendingTable
                          showViewData={this.showViewData}
                          data={view_btn}
                          id={id}
                          handleBreadCrumb={this.handleBreadCrumb}
                          {...props}
                        />
                      )}
                    />

                    <Route
                      path={`${siteUrl}/rejected`}
                      render={props => (
                        <RejectedTable
                          showViewData={this.showViewData}
                          data={view_btn}
                          id={id}
                          url={url}
                          handleBreadCrumb={this.handleBreadCrumb}
                          {...props}
                        />
                      )}
                    />
                  </Switch>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ projectViewData }) => {
  const { breadcrumbs } = projectViewData;

  return {
    breadcrumbs,
  };
};
export default compose(connect(mapStateToProps))(ViewData);
