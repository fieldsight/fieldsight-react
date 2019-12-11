import React, { Component } from 'react';
import { compose } from 'redux';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import ResponseTable from '../../responded/ResponseTable';
import DeleteTable from '../deleteTable';
import { getsiteViewData } from '../../../../actions/siteViewDataAction';
import { DotLoader } from '../../../myForm/Loader';

/* eslint-disable camelcase */
/* eslint-disable react/destructuring-assignment */

class ManageScheduledForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hide: true,
    };
  }

  componentDidMount() {
    const { id } = this.props;
    if (id !== '') {
      this.props.getsiteViewData(id, 'scheduled');
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
        scheduled_forms,
        deleted_forms,
        scheduled_loading,
        id,
      },
      state: { hide },
    } = this;

    return (
      <>
        <div className="card-header main-card-header sub-card-header">
          <h5>
            <FormattedMessage
              id="app.scheduled-form"
              defaultMessage="Scheduled Forms"
            />
          </h5>
          <Link to={`/site-submission-responses/${id}/rejected`}>
            <button type="button" className="fieldsight-btn">
              <FormattedMessage
                id="app.view-by-status"
                defaultMessage="View By Status"
              />
            </button>
          </Link>
        </div>
        <div className="card-body">
          {scheduled_loading ? (
            <ResponseTable
              generals_forms={scheduled_forms}
              table="site"
              id={id}
              survey="true"
            />
          ) : (
            <DotLoader />
          )}
        </div>
        {deleted_forms && deleted_forms.length > 0 && (
          <div className="card no-boxshadow">
            <div className="card-header main-card-header sub-card-header">
              <h5>
                <FormattedMessage
                  id="app.deleted-forms"
                  defaultMessage="Deleted Forms"
                />
              </h5>
              <div className="dash-btn">
                {hide ? (
                  <button
                    type="button"
                    className="btn-toggle"
                    onClick={this.toggleHide}
                  >
                    <FormattedMessage
                      id="app.show"
                      defaultMessage="Show"
                    />
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
                    <FormattedMessage
                      id="app.hide"
                      defaultMessage="Hide"
                    />
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
                  loader={scheduled_loading}
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
    scheduled_forms,
    deleted_forms,
    scheduled_loading,
  } = siteViewData;

  return {
    scheduled_forms,
    deleted_forms,
    scheduled_loading,
  };
};
export default compose(
  connect(mapStateToProps, {
    getsiteViewData,
  }),
)(ManageScheduledForm);
