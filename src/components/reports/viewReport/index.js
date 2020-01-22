import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import { Dropdown } from 'react-bootstrap';
import { getReportData } from '../../../actions/reportActions';
import RightContentCard from '../../common/RightContentCard';
import Modal from '../../common/Modal';
import ExportTable from './exportTable';
import MetricsTable from './metricTable';
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
    } = this;
    axios.get(`/v4/api/reporting/export/logs/?id=${id}`).then(req => {
      this.setState({
        exportData: req.data.results,
      });
    });
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
        // location: {
        //   state: {
        //     title,
        //     attributes,
        //     description,
        //     projectid,
        //     reportId,
        //   },
        // },
      },
      state: { exportData, viewBtn, loader },
    } = this;

    return (
      <>
        <RightContentCard
          title={title}
          addButton
          toggleModal={() => this.handleEdit(pid, id)}
          buttonName=" Edit "
          editflag
        >
          <form className="floating-form">
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

            <CollapseFilterTable id={id} />

            <div className="form-group pull-right no-margin">
              <button
                type="button"
                className="fieldsight-btn"
                onClick={() => this.handleView()}
              >
                Previous Exports
              </button>
            </div>
          </form>
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
