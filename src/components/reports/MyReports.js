import React, { Component } from 'react';
import { connect } from 'react-redux';
import format from 'date-fns/format';
import axios from 'axios';
import { Dropdown } from 'react-bootstrap';
import Loader from '../common/Loader';
import {
  getReportsList,
  getProjectData,
} from '../../actions/reportActions';
import { errorToast, successToast } from '../../utils/toastHandler';
import Modal from '../common/Modal';
import ShareModal from './shareModal';
/* eslint-disable */

class MyReports extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reportList: [],
      openShare: false,
      Shareid: '',
    };
  }

  componentWillMount() {
    const { id } = this.props;
    this.props.getReportsList(id, 'my_reports');
    this.props.getProjectData(id);
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.reportReducer.reportList !==
      this.props.reportReducer.reportList
    ) {
      this.setState({
        reportList: this.props.reportReducer.reportList,
      });
    }
  }

  handle = id => {
    axios
      .post(
        `/v4/api/reporting/report-action/${id}/?action_type=add_to_templates`,
      )
      .then(res => {
        successToast(res.data.detail);
      })
      .catch(err => {
        const error = err.response.data;
        Object.entries(error).map(([key, value]) => {
          return errorToast(`${value}`);
        });
      });
  };

  deleteAction = id => {
    const { reportList } = this.state;
    axios
      .delete(`/v4/api/reporting/report/${id}/`)
      .then(res => {
        if (res.status === 204) {
          const delet = reportList.filter(data => id !== data.id);
          this.setState({
            reportList: delet,
          });
        }
        // successToast(res.data.detail);
      })
      .catch(err => {
        const error = err.response.data;
        Object.entries(error).map(([key, value]) => {
          return errorToast(`${value}`);
        });
      });
  };

  ShareAction = Shareid => {
    this.setState(prevState => ({
      openShare: !prevState.openShare,
      Shareid,
    }));
  };

  shareCloseButton = () => {
    this.setState(prevState => ({
      openShare: !prevState.openShare,
    }));
  };

  render() {
    const { reportList, openShare, Shareid } = this.state;

    const {
      toggleSection,
      reportReducer: { reportLoader, projectList },
      id,
    } = this.props;
    const DataCrude = [
      {
        id: '1',
        title: 'Edit',
        link: `/fieldsight/application/#/project/${id}/edit-report/`,
      },
      {
        id: '2',
        title: 'Add a template',
        action: this.handle,
      },
      {
        id: '3',
        title: 'Share',
        actionShare: this.ShareAction,
      },
      {
        id: '4',
        title: 'Delete',
        actionDelete: this.deleteAction,
      },
    ];

    return (
      <>
        <div className="card-body">
          {reportLoader && <Loader />}
          {!reportLoader &&
            reportList.length > 0 &&
            reportList.map(report => (
              <div className="report-list" key={report.id}>
                <a
                  className="row"
                  href={`/fieldsight/application/#/project/${id}/edit-report/${report.id}`}
                >
                  <div className="col-md-8">
                    <div className="report-content">
                      <h4>{report.title}</h4>
                      <p>{report.description}</p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="report-share-time">
                      <div className="report-item created-time">
                        <h6>Date Created</h6>
                        <p>
                          {format(report.created_at, [
                            'MMMM Do YYYY',
                          ])}
                        </p>
                        <time>
                          {format(report.created_at, ['h:mm a'])}
                        </time>
                      </div>
                      {report.shared_with.length > 0 &&
                        report.shared_with.map(() => (
                          <div className="report-item share-report">
                            <h6>Shared with</h6>
                            <ul className="shared-list">
                              <li>Santosh khanal</li>
                              <li>Jasica standford</li>
                              <li>Khusbu basnet</li>
                            </ul>
                          </div>
                        ))}
                    </div>
                  </div>
                </a>
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
                      {DataCrude.map(item => (
                        <div key={item.id}>
                          {item.link && (
                            <Dropdown.Item
                              href={`${item.link}${report.id}`}
                              key={item.id}
                              // target="_blank"
                            >
                              {item.title}
                            </Dropdown.Item>
                          )}

                          {item.action && (
                            <Dropdown.Item
                              onClick={() => this.handle(report.id)}
                              // target="_blank"
                            >
                              {item.title}
                            </Dropdown.Item>
                          )}

                          {item.actionDelete && (
                            <Dropdown.Item
                              onClick={() =>
                                this.deleteAction(report.id)
                              }
                              // target="_blank"
                            >
                              {item.title}
                            </Dropdown.Item>
                          )}

                          {item.actionShare && (
                            <Dropdown.Item
                              onClick={() =>
                                this.ShareAction(report.id)
                              }
                              // target="_blank"
                            >
                              {item.title}
                            </Dropdown.Item>
                          )}
                        </div>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>
            ))}
          {!reportLoader && reportList.length === 0 && (
            <div>No Report Found Yet.</div>
          )}
        </div>
        {openShare && (
          <Modal
            title="Share Form"
            toggleModal={this.shareCloseButton}
          >
            <ShareModal
              forms={projectList}
              Shareid={Shareid}
              shareCloseButton={this.shareCloseButton}
            />
          </Modal>
        )}
      </>
    );
  }
}

const mapStateToProps = ({ reportReducer }) => ({
  reportReducer,
});
export default connect(mapStateToProps, {
  getReportsList,
  getProjectData,
})(MyReports);
