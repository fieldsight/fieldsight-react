import React, { Component, Fragment } from 'react';
import CustomCheckBox from '../CustomCheckbox';
import UserRole from './userRole';
import SiteInformation from './siteInformation';
import FormInformation from './FormInformation';
/* eslint-disable */

// const checkboxOption = [
//   { id: 1, name: 'region-1' },
//   { id: 2, name: 'region-2' },
//   { id: 3, name: 'region-3' },
// ];

const Submissions = [
  { id: 1, name: 'approved' },
  { id: 2, name: 'rejected' },
  { id: 3, name: 'flag' },
  { id: 4, name: 'pending' },
];

export default class Metrics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: false,
      submissions: [],
      submissionType: '',
    };
  }

  toggleActive = () => {
    this.setState(({ isActive }) => ({ isActive: !isActive }));
  };

  onChangeHandler = () => {
    // console.log('search');
  };

  handleSubmissionType = type => {
    this.setState({ submissionType: type });
  };

  handleCheckReportType = e => {
    const {
      target: { name, checked },
    } = e;

    this.setState(
      state => {
        if (checked) {
          return {
            submissions: [...state.submissions, name],
          };
        }
        if (!checked) {
          return {
            submissions: state.submissions.filter(
              type => type !== name,
            ),
          };
        }
        return null;
      },
      () => {
        // console.log('in checkbox', this.state.data);
      },
    );
  };

  render() {
    const { submissions, submissionType } = this.state;
    const {
      toggleSelectClass,
      handleToggleClass,
      checkboxOption,
      handleCheck,
      selectedArr,
    } = this.props;
    // console.log('render', submissionType);

    return (
      <div className="col-lg-7 col-md-7">
        <div className="acc-item">
          <div className="acc-header active">
            <h5>metrics</h5>
          </div>
          <div className="acc-body">
            <div className="fs-row no-gutters">
              <div className="fs-5 fs-col">
                <div className="custom-group">
                  <div className="custom-group-append">
                    <span className="custom-group-text">
                      <i className="material-icons">search</i>
                    </span>
                  </div>
                  <input
                    className="custom-control"
                    type="search"
                    placeholder="Quick search ..."
                    onChange={() => {
                      this.onChangeHandler();
                    }}
                  />
                </div>
                <ul className="metric-list">
                  {Submissions.map(submission => (
                    <li
                      key={`submission_${submission.id}`}
                      className={
                        submissionType === submission.name
                          ? 'active'
                          : ''
                      }
                      onKeyDown={() => {
                        this.handleSubmissionType(submission.name);
                      }}
                      onClick={() => {
                        this.handleSubmissionType(submission.name);
                      }}
                    >
                      {`No. of ${submission.name} Submissions`}
                      {checkboxOption.map(option => (
                        <Fragment key={`option_${option.id}`}>
                          <CustomCheckBox
                            className="custom-control custom-checkbox"
                            customInputClass="custom-control-input"
                            customLabelClass="custom-control-label"
                            label={option.name}
                            name={option.name}
                            checked={submissions.includes(
                              option.name,
                            )}
                            changeHandler={this.handleCheckReportType}
                          />
                        </Fragment>
                      ))}
                    </li>
                  ))}
                </ul>
              </div>
              <UserRole
                handleCheckReportType={this.handleCheckReportType}
              />
            </div>
          </div>
        </div>
        <SiteInformation
          toggleSelectClass={toggleSelectClass}
          handleToggleClass={handleToggleClass}
          checkboxOption={checkboxOption}
          handleCheck={handleCheck}
          selectedArr={selectedArr}
        />
        <FormInformation
          toggleSelectClass={toggleSelectClass}
          handleToggleClass={handleToggleClass}
          checkboxOption={checkboxOption}
          handleCheck={handleCheck}
          selectedArr={selectedArr}
        />
      </div>
    );
  }
}
