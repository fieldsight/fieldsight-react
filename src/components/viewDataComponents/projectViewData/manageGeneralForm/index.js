import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ResponseTable from '../../responded/ResponseTable';
import { connect } from 'react-redux';
import { compose } from 'redux';
import DeleteTable from '../deleteTable';
import { DotLoader } from '../../../myForm/Loader';
import { getProjectViewData } from '../../../../actions/viewDataActions';
import { FormattedMessage } from 'react-intl';

class ManageGeneralForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hide: true,
    };
  }

  componentDidMount() {
    if (this.props.id !== '') {
      this.props.getProjectViewData(this.props.id, 'general');
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
        data,
        showViewData,
        generals_forms,
        deleted_forms,
        generals_loader,
        url,
        id,
      },
    } = this;

    return (
      <>
        <div className="card-header main-card-header sub-card-header">
          {/*<h5>General Forms</h5>*/}
          <h5>
            <FormattedMessage
              id="app.generate-form"
              defaultMessage="General Forms"
            />
          </h5>
          <div className="dash-btn">
            <Link to={this.props.url}>
              <button
                onClick={showViewData}
                className="fieldsight-btn"
              >
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
        </div>
        <div className="card-body">
          {!data &&
            (generals_loader ? (
              <ResponseTable
                generals_forms={generals_forms}
                id={id}
              />
            ) : (
              <DotLoader />
            ))}
        </div>
        {deleted_forms.length > 0
          ? !data && (
              <div className="card no-boxshadow">
                <div className="card-header main-card-header sub-card-header">
                  {/*<h5>Deleted Forms</h5>*/}
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
                {/* <div className="card-body">
                  {!this.state.hide && (
                    <DeleteTable
                      deleted_forms={deleted_forms}
                      id={this.props.id}
                      loader={generals_loader}
                    />
                  </button>
                )}
              </div>
            </div> */}
                <div className="card-body">
                  {!this.state.hide && (
                    <DeleteTable
                      deleted_forms={deleted_forms}
                      id={id}
                      loader={generals_loader}
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

const mapStateToProps = ({ projectViewData }) => {
  const {
    generals_forms,
    deleted_forms,
    generals_loader,
  } = projectViewData;

  return {
    generals_forms,
    deleted_forms,
    generals_loader,
  };
};
ManageGeneralForm.propTypes = {
  deleted_forms: PropTypes.arrayOf.isRequired,
  showViewData: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  getProjectViewData: PropTypes.func.isRequired,
  data: PropTypes.string.isRequired,
  generals_forms: PropTypes.arrayOf.isRequired,
  url: PropTypes.string.isRequired,
  generals_loader: PropTypes.bool.isRequired,
};
export default compose(
  connect(mapStateToProps, {
    getProjectViewData,
  }),
)(ManageGeneralForm);
