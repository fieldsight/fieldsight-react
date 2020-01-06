import React, { Component } from 'react';
import { connect } from 'react-redux';
import format from 'date-fns/format';
import { Dropdown } from 'react-bootstrap';

import { getReportsList } from '../../actions/reportActions';
/* eslint-disable */

class MyReports extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCrude: false,
      reportList: [],
    };
  }

  componentWillMount() {
    const { id } = this.props;
    this.props.getReportsList(id, 'my_reports');
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
  buttonhandler = () => {
    this.setState(({ showCrude }) => ({
      showCrude: !showCrude,
    }));
  };

  render() {
    const { reportList, showCrude } = this.state;
    const { toggleSection } = this.props;
    const DataCrude = [
      {
        id: '1',
        title: 'Edit',
        toShow: 'addReport',
      },
      {
        id: '2',
        title: 'Add a template',
        toShow: '',
      },
      {
        id: '3',
        title: 'Share',
        toShow: '',
      },
      {
        id: '4',
        title: 'Delete',
        toShow: '',
      },
    ];

    // console.log('button', showCrude);
    return (
      <div className="card-body">
        {reportList.length > 0 &&
          reportList.map(report => (
            <div className="report-list" key={report.id}>
              <div className="row">
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
                        {format(report.created_at, ['MMMM Do YYYY'])}
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
              </div>
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
                      <Dropdown.Item
                        onClick={() => {
                          toggleSection(item.toShow, report);
                        }}
                        key={item.id}
                        // target="_blank"
                      >
                        {item.title}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
          ))}
      </div>
    );
  }
}
const mapStateToProps = ({ reportReducer }) => ({
  reportReducer,
});
export default connect(mapStateToProps, {
  getReportsList,
})(MyReports);