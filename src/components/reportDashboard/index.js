import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import RightContentCard from '../common/RightContentCard';
import Modal from '../common/Modal';
import ExportTable from './exportTable';
import MetricsTable from './metricTable';
import { DotLoader } from '../myForm/Loader';

/* elslint-disable */
export default class ReportDashboard extends Component {
  intervalID;

  constructor(props) {
    super(props);
    this.state = {
      exportData: [],
      viewBtn: false,
      loader: false,
    };
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
          params: { id },
        },
        location: {
          state: {
            title,
            attributes,
            description,
            projectid,
            reportId,
          },
        },
      },
      state: { exportData, viewBtn, loader },
    } = this;

    return (
      <>
        <RightContentCard title="Report View">
          <form className="floating-form">
            <div className="form-group">
              <input
                type="text"
                className="form-control report-name"
                defaultValue={title}
                required
              />
              <label htmlFor="input">Report Name</label>
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                defaultValue={description}
                required
              />
              <label htmlFor="input">description</label>
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                defaultValue={attributes.length}
                required
              />
              <label htmlFor="input">Metric Count</label>
            </div>

            <div className="form-group pull-right no-margin">
              <button
                type="button"
                className="fieldsight-btn"
                onClick={() => this.handleEdit(projectid, reportId)}
              >
                Edit Report
              </button>
              <button
                type="button"
                className="fieldsight-btn"
                onClick={this.handleView}
              >
                View Export table
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
