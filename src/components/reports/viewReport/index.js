import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { getReportData } from '../../../actions/reportActions';
import RightContentCard from '../../common/RightContentCard';
import Modal from '../../common/Modal';
import ExportTable from './exportTable';
import { DotLoader } from '../../myForm/Loader';
import CollapseFilterTable from '../CollapseFilterTable';

class ReportDashboard extends Component {
  intervalID;

  constructor(props) {
    super(props);
    this.state = {
      exportData: [],
      viewBtn: false,
      loader: false,
    };
  }

  componentWillMount() {
    const {
      props: {
        match: {
          params: { id },
        },
      },
    } = this;
    this.props.getReportData(id);
  }

  componentDidMount() {
    const {
      props: {
        match: {
          params: { id },
        },
      },
    } = this;
    axios.get(`/v4/api/reporting/export/logs/?id=${id}`).then(req => {
      this.setState({
        exportData: req.data.results,
        loader: true,
      });
    });
    this.intervalID = setInterval(this.getData.bind(this), 10000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  getData = () => {
    const {
      props: {
        match: {
          params: { id },
        },
      },
      state: { viewBtn },
    } = this;
    if (viewBtn) {
      axios
        .get(`/v4/api/reporting/export/logs/?id=${id}`)
        .then(req => {
          this.setState({
            exportData: req.data.results,
          });
        });
    }
  };

  handleView = () => {
    this.setState(state => ({
      viewBtn: !state.viewBtn,
    }));
  };

  handleCloseModal = () => {
    this.setState(state => ({
      viewBtn: !state.viewBtn,
    }));
  };

  handleEdit = (id, reportId) => {
    this.props.history.push({
      pathname: `/project/${id}/edit-report/${reportId}`,
      state: { fromRow: true },
    });
  };

  render() {
    const {
      props: {
        match: {
          params: { id, pid },
        },
        reportReducer: {
          reportData: { attributes, title, description },
        },
      },
      state: { exportData, viewBtn, loader },
    } = this;

    return (
      <>
        <nav aria-label="breadcrumb" role="navigation">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a
                href={`/fieldsight/application/#/project-dashboard/${pid}/report`}
              >
                Report
              </a>
            </li>
            <li className="breadcrumb-item">View Report</li>
          </ol>
        </nav>
        <RightContentCard
          title={title}
          addButton
          toggleModal={() => this.handleEdit(pid, id)}
          buttonName=" Edit "
          editflag
        >
          <div className="floating-form">
            <div className="form-group">
              <span style={{ color: 'grey' }}>{description}</span>
            </div>
            <div className="form-group">
              <span style={{ color: 'grey' }}>Number of Columns</span>
              :
              <span style={{ color: 'grey' }}>
                {attributes && attributes.length}
              </span>
            </div>
            <div className="view-report">
              <p><b>No of datapoints</b><span>140</span></p>
              <p><b>created date</b><time>2076-01-10</time></p>
              <p><b>sync scheduled type</b><span>140</span></p>
              <p><b>sync date</b><time>2076-08-15</time></p>
              <p><b>sheet link</b><span><i className="material-icons">sim_card</i></span></p>
            </div>
            <div className="description">
              <p >name, description, no. of datapoints, report created date,
sync schedule type, sheet link, last sync date time</p>
            </div>

            <CollapseFilterTable id={id} projectId={pid} />

            <div className="form-group pull-right no-margin">
              <button
                type="button"
                className="fieldsight-btn"
                onClick={() => this.handleView()}
              >
                Previous Exports
              </button>
            </div>
          </div>
        </RightContentCard>
        {viewBtn && (
          <Modal
            title="Export Table"
            toggleModal={this.handleCloseModal}
          >
            {loader ? (
              <ExportTable exportData={exportData} />
            ) : (
                <DotLoader />
              )}
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
  getReportData,
})(ReportDashboard);
