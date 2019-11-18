import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import ResponseTable from '../../responded/ResponseTable';
import DeleteTable from '../deleteTable';
import { getsiteViewData } from '../../../../actions/siteViewDataAction';
import { DotLoader } from '../../../myForm/Loader';

class ManageGeneralForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hide: true,
    };
  }

  static getDerivedStateFromProps(props) {
    return {
      id: props.id,
    };
  }

  componentDidMount() {
    const { id, getsiteViewData } = this.props;
    if (id != '') {
      getsiteViewData(id, 'general');
    }
  }

  toggleHide = () => {
    this.setState({
      hide: !this.state.hide,
    });
  };

  render() {
    const {
      props: {
        data,
        showViewData,
        generals_forms,
        deleted_forms,
        generals_loading,
        id,
      },
      state: { hide },
    } = this;

    return (
      <>
        <div className="card-header main-card-header sub-card-header">
          <h5>General Forms</h5>
          <div className="dash-btn">
            <Link to={`/site-responses/${id}/rejected`}>
              <button
                onClick={showViewData}
                className="fieldsight-btn"
              >
                {data ? 'View By Form' : 'View by Status'}
              </button>
            </Link>
          </div>
        </div>
        <div className="card-body">
          {!data &&
            (generals_loading ? (
              <ResponseTable
                generals_forms={generals_forms}
                table="site"
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
                  <h5>Deleted Forms</h5>
                  <div className="dash-btn">
                    {hide ? (
                      <button
                        type="button"
                        className="btn-toggle"
                        onClick={this.toggleHide}
                      >
                        show
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
                        }}
                      >
                        hide
                        <div
                          className="handle"
                          style={{ left: 'auto', right: '0.1875rem' }}
                        ></div>
                      </button>
                    )}
                  </div>
                </div>
                <div className="card-body">
                  {!hide && (
                    <DeleteTable
                      deleted_forms={deleted_forms}
                      id={id}
                      loader={generals_loading}
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
//export default ManageGeneralForm;
const mapStateToProps = ({ siteViewData }) => {
  const {
    generals_forms,
    deleted_forms,
    generals_loading,
  } = siteViewData;

  return {
    generals_forms,
    deleted_forms,
    generals_loading,
  };
};
export default compose(
  connect(mapStateToProps, {
    getsiteViewData,
  }),
)(ManageGeneralForm);
