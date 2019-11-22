import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import ResponseTable from '../../responded/StagedFormResponseTable';
import DeleteTable from '../deleteTable';
import PropTypes from 'prop-types';

import { getsiteViewData } from '../../../../actions/siteViewDataAction';

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
      props: {
        showViewData,
        data,
        stageForms,
        deleted_forms,
        stageFormsLoading,
        id,
      },
    } = this;

    return (
      <>
        <div className="card-header main-card-header sub-card-header">
          <h5>
            {!data ? (
              <FormattedMessage
                id="app.staged-form"
                defaultMessage="Stage Forms"
              />
            ) : (
              <FormattedMessage
                id="app.rejected-submissions"
                defaultMessage="Rejected Submission"
              />
            )}
          </h5>
          <Link to={`/site-responses/${this.props.id}/rejected`}>
            <button onClick={showViewData} className="fieldsight-btn">
              {data ? (
                <FormattedMessage
                  id="app.view-by-form"
                  defaultMessage="View By Form"
                />
              ) : (
                <FormattedMessage
                  id="app.view-by-status"
                  defaultMessage="View By Status"
                />
              )}
            </button>
          </Link>
        </div>
        <div className="card-body">
          {!data && (
            <ResponseTable
              stageForms={stageForms}
              table="site"
              id={id}
              loader={stageFormsLoading}
            />
          )}
        </div>

        {deleted_forms && deleted_forms.length > 0
          ? !data && (
              <div className="card no-boxshadow">
                <div className="card-header main-card-header sub-card-header">
                  <h5>
                    <FormattedMessage
                      id="app.deleted-forms"
                      defaultMessage="Deleted Forms"
                    />
                  </h5>
                  <div className="dash-btn">
                    {this.state.hide ? (
                      <button
                        type="button"
                        className="btn-toggle"
                        onClick={this.toggleHide}
                        style={{ width: '96px' }}
                      >
                        <FormattedMessage
                          id="app.show"
                          defaultMessage="Show"
                        />
                        <div className="handle"></div>
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
                          width: '96px',
                        }}
                      >
                        <FormattedMessage
                          id="app.hide"
                          defaultMessage="Hide"
                        />
                        <div
                          className="handle"
                          style={{ left: 'auto', right: '0.1875rem' }}
                        ></div>
                      </button>
                    )}
                  </div>
                </div>
                {/* { <div className="card-body">
                  {!this.state.hide && (
                    <DeleteTable
                      deleted_forms={deleted_forms}
                      id={this.props.id}
                      loader={stage_forms_loading}
                    />
                  </button>
                )}
              </div>} 
            </div>*/}
                <div className="card-body">
                  {!this.state.hide && (
                    <DeleteTable
                      deletedForms={deletedForms}
                      id={id}
                      loader={stageFormsLoading}
                    />
                  )}
                </div>
              </div>
            )
          : ''}
      </>
    );
  }
}

ResponseStageForm.propTypes = {
  id: PropTypes.string.isRequired,
  getsiteViewData: PropTypes.func.isRequired,
  showViewData: PropTypes.bool.isRequired,
  data: PropTypes.objectOf.isRequired,
  stageForms: PropTypes.arrayOf.isRequired,
  deletedForms: PropTypes.arrayOf.isRequired,
  stageFormsLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ siteViewData }) => {
  const {
    stageFormsLoading,
    deletedForms,
    stageForms,
  } = siteViewData;

  return {
    stageFormsLoading,
    deletedForms,
    stageForms,
  };
};

export default compose(
  connect(mapStateToProps, {
    getsiteViewData,
  }),
)(ResponseStageForm);
