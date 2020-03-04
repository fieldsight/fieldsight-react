import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { getsiteViewData } from '../../../../actions/siteViewDataAction';
import DeleteTable from '../deleteTable';
import ResponseTable from '../../responded/StagedFormResponseTable';
/* eslint-disable camelcase */
/* eslint-disable react/destructuring-assignment */

class ResponseStageForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hide: true,
    };
  }

  componentDidMount() {
    const { id } = this.props;
    if (id !== '') {
      this.props.getsiteViewData(id, 'stage');
    }
  }

  toggleHide = () => {
    this.setState(prevState => ({
      hide: !prevState.hide,
    }));
  };

  render() {
    const {
      props: { stage_forms, deleted_forms, stage_forms_loading, id },
      state: { hide },
    } = this;

    return (
      <>
        <div className="card-header main-card-header sub-card-header">
          <h5>Stage Forms</h5>
          <Link to={`/site-submission-responses/${id}/rejected`}>
            <button type="button" className="fieldsight-btn">
              View By Form
            </button>
          </Link>
        </div>
        <div className="card-body">
          <ResponseTable
            stage_forms={stage_forms}
            table="site"
            id={id}
            loader={stage_forms_loading}
          />
        </div>

        {deleted_forms && deleted_forms.length > 0 && (
          <div className="card no-boxshadow">
            <div className="card-header main-card-header sub-card-header">
              <h5>Deleted Forms</h5>
              <div className="dash-btn">
                {hide ? (
                  <button
                    type="button"
                    className="btn-toggle"
                    onClick={this.toggleHide}
                  >
                    Show
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
                    Hide
                    <div
                      className="handle"
                      style={{ left: 'auto', right: '0.1875rem' }}
                    />
                  </button>
                )}
              </div>
            </div>

            <div className="card-body">
              {!hide && (
                <DeleteTable
                  deleted_forms={deleted_forms}
                  id={id}
                  loader={stage_forms_loading}
                />
              )}
            </div>
          </div>
        )}
      </>
    );
  }
}

const mapStateToProps = ({ siteViewData }) => {
  const {
    stage_forms_loading,
    deleted_forms,
    stage_forms,
  } = siteViewData;

  return {
    stage_forms_loading,
    deleted_forms,
    stage_forms,
  };
};

export default compose(
  connect(mapStateToProps, {
    getsiteViewData,
  }),
)(ResponseStageForm);
