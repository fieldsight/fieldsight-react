import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import ResponseTable from '../../responded/StagedFormResponseTable';
import DeleteTable from '../deleteTable';
import { getProjectViewData } from '../../../../actions/viewDataActions';
/* eslint-disable camelcase */

class ResponseStageForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hide: true,
    };
  }

  componentDidMount() {
    if (this.props.id !== '') {
      this.props.getProjectViewData(this.props.id, 'stage');
    }
  }

  toggleHide = () => {
    this.setState(state => ({
      hide: !state.hide,
    }));
  };

  render() {
    const {
      props: {
        showViewData,
        data,
        stage_forms,
        deleted_forms,
        stage_forms_loader,
        url,
        id,
      },
    } = this;

    return (
      <>
        <div className="card-header main-card-header sub-card-header">
          <h5>{!data ? 'Stage Forms' : 'Rejected Submission'}</h5>
          <Link to={url}>
            <button
              type="button"
              onClick={showViewData}
              className="fieldsight-btn"
            >
              {data ? 'View By Form' : 'View by Status'}
            </button>
          </Link>
        </div>
        <div className="card-body">
          {!data && (
            <ResponseTable
              stage_forms={stage_forms}
              id={id}
              loader={stage_forms_loader}
            />
          )}
        </div>
        {!!deleted_forms && deleted_forms.length > 0 && !data && (
          <div className="card no-boxshadow">
            <div className="card-header main-card-header sub-card-header">
              <h5>Deleted Forms</h5>
              <div className="dash-btn">
                {this.state.hide ? (
                  <button
                    type="button"
                    className="btn-toggle"
                    onClick={this.toggleHide}
                  >
                    show
                    <div className="handle" />
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn-toggle"
                    onClick={this.toggleHide}
                    style={{
                      backgroundColor: '#28a745',
                      color: 'white',
                      textAlign: 'left',
                    }}
                  >
                    hide
                    <div
                      className="handle"
                      style={{ left: 'auto', right: '0.1875rem' }}
                    />
                  </button>
                )}
              </div>
            </div>
            <div className="card-body">
              {!this.state.hide && (
                <DeleteTable
                  id={id}
                  deleted_forms={deleted_forms}
                  loader={stage_forms_loader}
                />
              )}
            </div>
          </div>
        )}
      </>
    );
  }
}
const mapStateToProps = ({ projectViewData }) => {
  const {
    stage_forms,
    deleted_forms,
    stage_forms_loader,
  } = projectViewData;

  return {
    stage_forms,
    deleted_forms,
    stage_forms_loader,
  };
};
ResponseStageForm.propTypes = {
  deleted_forms: PropTypes.arrayOf.isRequired,
  showViewData: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  getProjectViewData: PropTypes.func.isRequired,
  data: PropTypes.string.isRequired,
  stage_forms: PropTypes.arrayOf.isRequired,
  url: PropTypes.string.isRequired,
  stage_forms_loader: PropTypes.bool.isRequired,
};
export default compose(
  connect(mapStateToProps, {
    getProjectViewData,
  }),
)(ResponseStageForm);
