import React, { Component } from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';
import Axios from 'axios';
import { errorToast, successToast } from '../../utils/toastHandler';
import Loader from '../common/Loader';

/* eslint-disable  react/prop-types */

class AccountInfo extends Component {
  constructor(props) {
    super(props);
    this.submitCardInfo = this.submitCardInfo.bind(this);
    const { data } = this.props;
    this.state = {
      isEdit: false,
      errors: '',
      loaded: 0,
      isLoading: false,
      card: data.account_information
        ? data.account_information.card
        : '',
    };
  }

  handleEdit = () => {
    this.setState(state => ({ isEdit: !state.isEdit }));
  };

  handleChange = () => {
    this.setState({ errors: '' });
  };

  async submitCardInfo() {
    const { stripe, teamId } = this.props;
    const { token, error } = await stripe.createToken({
      name: 'stripeToken',
    });
    this.setState(
      {
        isLoading: true,
      },
      () => {
        if (token) {
          Axios.post(
            `fv3/api/team-owner-account/${teamId}/`,
            { stripeToken: token.id },
            {
              onUploadProgress: progressEvent => {
                this.setState({
                  loaded: Math.round(
                    (progressEvent.loaded * 100) /
                      progressEvent.total,
                  ),
                });
              },
            },
          )
            .then(res => {
              this.setState(
                prev => ({
                  isLoading: false,
                  loaded: 0,
                  card: res.data.data,
                  isEdit: !prev.isEdit,
                }),
                () => successToast('Card Info', 'updated'),
              );
            })
            .catch(() => {
              this.setState(
                {
                  isLoading: false,
                },
                errorToast,
              );
            });
        }
        if (error) this.setState({ errors: error }, () => {});
      },
    );
  }

  render() {
    const {
      state: { isEdit, errors, isLoading, loaded, card },
      props: { data },
    } = this;

    return (
      <div className="row">
        <div className="col-md-4">
          <h6 className="mt-4">
            <strong>Subscribed Package:</strong>
          </h6>
          <br />
          <h5>Starter Monthly Plan</h5>
          <h6>
            <strong>
              $
              {data.subscribed_package &&
                data.subscribed_package.total_charge}
              /
              {data.subscribed_package &&
              data.subscribed_package.period === 'Month'
                ? 'Mo'
                : 'Yr'}
            </strong>
          </h6>
          <ul className="list-icon mt-4 mb-4">
            <li>
              <i className="la la-chevron-circle-right" />
              <strong>
                {data.subscribed_package &&
                  data.subscribed_package.total_submissions}
              </strong>
              Submissions
            </li>
            <li>
              <i className="la la-chevron-circle-right" />
              <strong>Unlimited</strong>
              Users, Projects, Sites
            </li>
            <li>
              <i className="la la-chevron-circle-right" />
              <strong>Unlimited</strong>
              Forms, Stages & Schedules
            </li>
            <li>
              <i className="la la-chevron-circle-right" />
              <strong>Unlimited</strong>
              Reports, Dashboards & Maps
            </li>
          </ul>
        </div>
        <div className="col-md-4">
          <h6 className="mt-4">
            <strong>Account Information:</strong>
          </h6>
          <ul className="list-icon mt-4 mb-4">
            <li>
              <i className="la la-envelope" />
              <div>Email Address</div>
              <p>
                <strong>
                  {data.account_information &&
                    data.account_information.email}
                </strong>
              </p>
            </li>
            <li>
              <i className="la la-credit-card" />
              <div>Card Info</div>
              <p>
                <strong>{`Card: **** **** **** ${card}`}</strong>
              </p>
            </li>
          </ul>
          <div className="col-sm-12">
            <a
              tabIndex="0"
              role="button"
              onKeyDown={() => {
                this.handleEdit('edit');
              }}
              title=""
              className="btn btn-primary"
              onClick={() => {
                this.handleEdit('edit');
              }}
            >
              Edit Credit Info
              <i className="la la-edit" />
            </a>
          </div>
        </div>
        {isEdit && (
          <div className="col-md-8">
            <h6 className="mt-4">
              <strong>Edit Card Info:</strong>
            </h6>
            <div className="card-input-wrap mt-4 mb-4">
              <div className="checkout">
                <p> Credit or debit card</p>
                <CardElement onChange={this.handleChange} />
                {Object.keys(errors).length > 0 && (
                  <span className="card-error">{errors.message}</span>
                )}
              </div>
            </div>
            <div className="col-sm-12">
              <button
                type="submit"
                className="fieldsight-btn pull-left"
                onClick={this.submitCardInfo}
              >
                Save Info
                <i className="la la-save" />
              </button>
            </div>
          </div>
        )}
        {isLoading && <Loader loaded={loaded} />}
      </div>
    );
  }
}
export default injectStripe(AccountInfo);
