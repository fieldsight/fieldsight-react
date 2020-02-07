import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
// import { Redirect } from 'react-router';
import Loader from '../../common/Loader';
import FormTemplate from './formTemplate';
import CustomTemplate from './customTemplate';
import {
  getReportList,
  getFormType,
} from '../../../actions/templateAction';

const StandardReportComponent = ({ path, title, description }) => (
  <Link
    to={{
      pathname: path,
      state: {
        fromDashboard: title,
      },
    }}
  >
    <h4>{title}</h4>
    <p>{description}</p>
  </Link>
);

class Templates extends Component {
  constructor(props) {
    super(props);
    this.state = {
      general: false,
      scheduled: false,
      survey: false,
      staged: false,
      id: '',
      showSub: {},
    };
  }

  componentDidMount() {
    const { id } = this.props;

    this.setState({
      id,
    });

    this.props.getReportList(id);
  }

  generalhandle = result => {
    const {
      templateReducer: { generalData },
    } = this.props;

    const { general, id } = this.state;
    if (
      result === 'general' &&
      !general &&
      generalData.length === 0
    ) {
      this.props.getFormType(id, result);
    }
    this.setState(prevState => ({
      general: !prevState.general,
      scheduled: false,
      survey: false,
      staged: false,
    }));
  };

  scheduledhandle = result => {
    const {
      templateReducer: { scheduledData },
    } = this.props;

    const { scheduled, id } = this.state;
    if (
      result === 'scheduled' &&
      !scheduled &&
      scheduledData.length === 0
    ) {
      this.props.getFormType(id, result);
    }
    this.setState(prevState => ({
      general: false,
      scheduled: !prevState.scheduled,
      survey: false,
      staged: false,
    }));
  };

  surveyhandle = result => {
    const {
      templateReducer: { surveyData },
    } = this.props;

    const { survey, id } = this.state;
    if (result === 'survey' && !survey && surveyData.length === 0) {
      this.props.getFormType(id, result);
    }
    this.setState(prevState => ({
      general: false,
      scheduled: false,
      survey: !prevState.survey,
      staged: false,
    }));
  };

  stagedhandle = result => {
    const {
      templateReducer: { stagedData },
    } = this.props;

    const { staged, id } = this.state;
    if (result === 'stage' && !staged && stagedData.length === 0) {
      this.props.getFormType(id, result);
    }
    this.setState(prevState => ({
      general: false,
      scheduled: false,
      survey: false,
      staged: !prevState.staged,
    }));
  };

  customReporthandler = reportid => {
    const { id } = this.props;
    return this.props.history.push(
      `/project/${id}/edit-report/${reportid}`,
    );
  };

  generalLinkhandle = (fromDashboard, projectCreatedOn) => {
    const { id } = this.state;

    return this.props.history.push({
      pathname: `/form-data/${id}/${fromDashboard}`,
      state: {
        fromDashboard,
        projectCreatedOn,
      },
    });
  };

  showSubStage = sub => {
    const { showSub } = this.state;
    this.setState(() => {
      if (showSub !== sub) {
        return {
          showSub: sub,
        };
      }
      return {
        showSub: {},
      };
    });
  };

  render() {
    const {
      state: { general, scheduled, survey, staged, showSub, id },
      props: {
        templateReducer: {
          generalData,
          scheduledData,
          surveyData,
          stagedData,
          customReports,
          standardReports,
          loader,
          formLoader,
          stagedLoader,
          scheduledLoader,
          surveyLoader,
          projectCreatedOn,
        },
      },
    } = this;

    const projectSummery = [
      {
        id: '1',
        title: 'Preview Pdf',
        link: `/fieldsight/project/report/summary/${id}/`,
      },
    ];

    const siteInformation = [
      {
        id: '1',
        title: 'Generate  Excel',
        link: this.handleCustomLink,
      },
    ];
    return (
      <>
        <div className="card-body">
          <div className="standard-tempalte">
            <h2 className="my-3">Standard</h2>
            {loader &&
            standardReports !== undefined &&
            standardReports.length > 0 ? (
              standardReports.map(standardReport => (
                <div
                  className="report-list"
                  key={standardReport.title}
                >
                  <div className="row">
                    <div className="col-md-12">
                      <div className="report-content">
                        {standardReport.title ===
                          'Project Summary' && (
                          <a
                            href={`/fieldsight/project/report/summary/${id}/`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <h4>{standardReport.title}</h4>
                            <p>{standardReport.description}</p>
                            {/* <div className="summary-content">
                              <p>
                                <b>Report Type</b>
                                <span>my Reports</span>
                              </p>
                              <p>
                                <b>no. of datapoints</b>
                                <span>100</span>
                              </p>
                            </div> */}
                          </a>
                        )}

                        {standardReport.title ===
                          'Site Information' && (
                          <StandardReportComponent
                            path={`/export-data/${id}`}
                            title={standardReport.title}
                            description={standardReport.description}
                          />
                        )}
                        {standardReport.title ===
                          'Progress Report' && (
                          <StandardReportComponent
                            path={`/export-data/${id}`}
                            title={standardReport.title}
                            description={standardReport.description}
                          />
                        )}

                        {standardReport.title ===
                          'Activity Report' && (
                          <StandardReportComponent
                            path={`/user-export/${id}`}
                            title={standardReport.title}
                            description={standardReport.description}
                          />
                        )}
                        {standardReport.title === 'Project Logs' && (
                          <StandardReportComponent
                            path={`/user-export/${id}`}
                            title={standardReport.title}
                            description={standardReport.description}
                          />
                        )}

                        {standardReport.title ===
                          'User Activity Report' && (
                          <StandardReportComponent
                            path={`/activity-export/${id}`}
                            title={standardReport.title}
                            description={standardReport.description}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                  {standardReport.title === 'Project Summary' ? (
                    <div className="dropdown report-option">
                      <Dropdown drop="left">
                        <Dropdown.Toggle
                          variant=""
                          id="dropdown-Data"
                          className="dropdown-toggle common-button no-border is-icon"
                        >
                          <i className="material-icons">more_vert</i>
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="dropdown-menu dropdown-menu-right">
                          {projectSummery.map(item => (
                            <Dropdown.Item
                              href={item.link}
                              key={item.id}
                              target="_blank"
                            >
                              {item.title}
                            </Dropdown.Item>
                          ))}
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  ) : (
                    <div className="dropdown report-option">
                      <Dropdown drop="left">
                        <Dropdown.Toggle
                          variant=""
                          id="dropdown-Data"
                          className="dropdown-toggle common-button no-border is-icon"
                        >
                          <i className="material-icons">more_vert</i>
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="dropdown-menu dropdown-menu-right">
                          {siteInformation.map(item => (
                            <Dropdown.Item
                              href={item.link}
                              key={item.id}
                              target="_blank"
                            >
                              {item.title}
                            </Dropdown.Item>
                          ))}
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <Loader />
            )}

            <FormTemplate
              general={general}
              generalhandle={this.generalhandle}
              formLoader={formLoader}
              generalData={generalData}
              generalLinkhandle={this.generalLinkhandle}
              projectCreatedOn={projectCreatedOn}
              scheduledhandle={this.scheduledhandle}
              scheduled={scheduled}
              scheduledLoader={scheduledLoader}
              scheduledData={scheduledData}
              surveyhandle={this.surveyhandle}
              survey={survey}
              surveyLoader={surveyLoader}
              surveyData={surveyData}
              stagedhandle={this.stagedhandle}
              staged={staged}
              stagedLoader={stagedLoader}
              stagedData={stagedData}
              showSubStage={this.showSubStage}
              showSub={showSub}
            />
          </div>

          <CustomTemplate
            customReports={customReports}
            customReporthandler={this.customReporthandler}
            id={id}
          />
        </div>
      </>
    );
  }
}

const mapStateToProps = ({ templateReducer }) => ({
  templateReducer,
});

export default connect(mapStateToProps, {
  getReportList,
  getFormType,
})(Templates);
