import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import ManageFormSetting from './manageFormSetting/ManageFormSetting';
import ManageGeneralForm from './manageGeneralForm';
import ManageScheduledForm from './manageScheduledForm';
import ManageStageForm from './manageStageForm';
import ApprovedTable from './ApprovedTable.js';
import PendingTable from './PendingSubmissionTable.js';
import RejectedTable from './RejectSubmissionTable.js';
import FlaggedTable from './FlagedTable.js';

class SiteViewData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hide: true,
      view_btn: false,
      id: props.match.params && props.match.params.id,
      url: props.match.url && props.match.url,
      breadCrumb: {},
    };
  }

  toggleHide = () => {
    this.setState({
      hide: !this.state.hide,
    });
  };

  componentDidMount() {
    const {
      match: {
        params: { id },
      },
      location: { pathname },
    } = this.props;
    if (
      pathname === `/site-responses/${id}/rejected` ||
      pathname === `/site-responses/${id}/pending` ||
      pathname === `/site-responses/${id}/flagged` ||
      pathname === `/site-responses/${id}/approved`
    ) {
      this.setState({
        id,
        view_btn: true,
      });
    } else if (
      pathname === `/site-responses/${id}/general` ||
      pathname === `/site-responses/${id}/stage` ||
      pathname === `/site-responses/${id}/scheduled`
    ) {
      this.setState({
        view_btn: false,
        id,
      });
    }
  }

  showViewData = () => {
    const {
      state: { view_btn },
      props: {
        match: { url },
      },
    } = this;
    this.setState(
      state => {
        if (!!view_btn) {
          return {
            url: `${url}/general`,
            view_btn: !view_btn,
          };
        } else {
          return {
            url: `${url}/rejected`,
            view_btn: !view_btn,
          };
        }
      },
      () => {
        this.props.history.push(url);
      },
    );
  };

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

    if (preState.location.pathname !== this.props.location.pathname) {
      if (
        pathname === `/site-responses/${id}/rejected` ||
        pathname === `/site-responses/${id}/pending` ||
        pathname === `/site-responses/${id}/flagged` ||
        pathname === `/site-responses/${id}/approved`
      ) {
        this.setState({
          id,
          view_btn: true,
        });
      } else if (
        pathname === `/site-responses/${id}/general` ||
        pathname === `/site-responses/${id}/stage` ||
        pathname === `/site-responses/${id}/scheduled`
      ) {
        this.setState({
          view_btn: false,
          id,
        });
      } else if (pathname == `/site-responses/${id}`) {
        this.props.history.push(`/site-responses/${id}/general`) ||
          this.props.history.push(`/site-responses/${id}/rejected`);
      }
    }
  }

  render() {
    const {
      props: { match, breadcrumbs },
      state: { breadCrumb, view_btn, url, id },
    } = this;

    return (
      <React.Fragment>
        <nav aria-label="breadcrumb" role="navigation">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href={breadcrumbs.site_url || breadCrumb.site_url}>
                {breadcrumbs.site_name || breadCrumb.site_name}
              </a>
            </li>
            <li className="breadcrumb-item">
              {breadcrumbs.current_page || breadCrumb.site_name}
            </li>
          </ol>
        </nav>
        <main id="main-content">
          <div className="row">
            <div className="col-xl-3 col-lg-4">
              <div className="left-sidebar new-sidebar sticky-top">
                <div className="card">
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
                        path={`${match.url}/general`}
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
                        path={`${match.url}/scheduled`}
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
                        path={`${match.url}/stage`}
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
                        path={`${match.url}/approved`}
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
                        path={`${match.url}/flagged`}
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
                        path={`${match.url}/pending`}
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
                        path={`${match.url}/rejected`}
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
        </main>
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ siteViewData }) => {
  const { breadcrumbs } = siteViewData;

  return {
    breadcrumbs,
  };
};
export default compose(connect(mapStateToProps))(SiteViewData);
