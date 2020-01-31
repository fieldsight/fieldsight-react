import React, { Component } from 'react';
import { connect } from 'react-redux';
import format from 'date-fns/format';
import { Dropdown } from 'react-bootstrap';
import { getReportsList } from '../../actions/reportActions';
/* eslint-disable */

class SharedWithMe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sharedList: [],
    };
  }
  componentWillMount() {
    const { id } = this.props;
    this.props.getReportsList(id, 'shared_with_me');
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.reportReducer.reportList !==
      this.props.reportReducer.reportList
    ) {
      this.setState({
        sharedList: this.props.reportReducer.reportList,
      });
    }
  }

  render() {
    const { sharedList } = this.state;
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

    return (
      <div className="card-body">
        {sharedList.length > 0 &&
          sharedList.map(shared => (
            <div className="report-list" key={shared.id}>
              <div className="row">
                <div className="col-md-8">
                  <div className="report-content">
                    <h4>{shared.title}</h4>
                    <p>{shared.description}</p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="report-share-time">
                    <div className="report-item created-time">
                      <h6>Date Created</h6>
                      <p>
                        {format(shared.created_at, ['MMMM Do YYYY'])}
                      </p>
                      <time>
                        {format(shared.created_at, ['h:mm a'])}
                      </time>
                    </div>
                    <div className="report-item share-report">
                      <h6>Owner</h6>
                      <ul className="shared-list">
                        <li>Santosh khanal</li>
                      </ul>
                    </div>
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
        {sharedList.length === 0 && <div>No Report Shared Yet.</div>}
      </div>
    );
  }
}

const mapStateToProps = ({ reportReducer }) => ({
  reportReducer,
});
export default connect(mapStateToProps, {
  getReportsList,
})(SharedWithMe);
