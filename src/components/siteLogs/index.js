import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Logs from '../common/Logs';
import { getSiteLogs } from '../../actions/siteDashboardActions';

/* eslint-disable camelcase */
/* eslint-disable react/destructuring-assignment */

const user_id = window.user_id ? window.user_id : 1;

class SiteLogs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      siteId: '',
      // siteLogs: {},
      // siteLogsLoader: true,
      // type: 'Project',
    };
  }

  componentDidMount() {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    this.props.getSiteLogs(id);
    this.setState({
      siteId: id,
    });
  }

  render() {
    const { siteLogs, siteLogsLoader } = this.props;

    return (
      <>
        <nav aria-label="breadcrumb" role="navigation">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a
                href={`/fieldsight/application/#/site-dashboard/${this.state.siteId}`}
              >
                <FormattedMessage
                  id="app.site"
                  defaultMessage="Site"
                />
              </a>
            </li>
            <li className="breadcrumb-item">
              <FormattedMessage id="app.logs" defaultMessage="Logs" />
            </li>
          </ol>
        </nav>

        <div className="new-dashboard">
          <Logs
            siteId={this.state.siteId}
            type="site"
            user_id={user_id}
            siteLogs={siteLogs}
            showContentLoader={siteLogsLoader}
            fullPage
          />
        </div>
      </>
    );
  }
}

const mapStateToProps = ({ siteDashboard }) => {
  const { siteLogs } = siteDashboard;

  return {
    siteLogs,
  };
};

export default connect(mapStateToProps, {
  getSiteLogs,
})(SiteLogs);
