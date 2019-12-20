import React, { Component, Fragment } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
import CustomCheckBox from '../CustomCheckbox';
import UserRole from './userRole';
import SiteInformation from './siteInformation';
import FormInformation from './formInformation';
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
      metrics: props.data,
      toggleSelectClass: false,
      submissionType: {},
      submissions: [],
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.data !== this.props.data) {
      this.setState({
        metrics: this.props.data,
      });
    }
  }

  toggleActive = () => {
    this.setState(({ isActive }) => ({ isActive: !isActive }));
  };

  handleToggleClass = () => {
    this.setState(({ toggleSelectClass }) => ({
      toggleSelectClass: !toggleSelectClass,
    }));
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
    const { submissionType } = this.state;
    this.setState(state => {
      if (checked) {
        return {
          submissions: [...state.submissions, submissionType],
        };
      }
      if (!checked) {
        return {
          submissions: state.submissions.filter(
            type => type.code !== name,
          ),
        };
      }
      return null;
    });
  };

  handleCheckChildren = (e, data, child) => {
    const { checked, name } = e.target;
    console.log(data, 'data', checked, child);

    // this.setState(state => {
    //   if(checked)
    // })
  };

  render() {
    const {
      metrics,
      submissions,
      submissionType,
      toggleSelectClass,
    } = this.state;

    // console.log('metrics', submissions);

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
                <div
                  style={{
                    position: 'relative',
                    height: `300px `,
                  }}
                >
                  <PerfectScrollbar>
                    <ul className="metric-list">
                      {metrics.map(item => (
                        <li
                          key={item.code}
                          className={
                            submissionType.code === item.code
                              ? 'active'
                              : ''
                          }
                          onKeyDown={() => {
                            this.handleSubmissionType(item);
                          }}
                          onClick={() => {
                            this.handleSubmissionType(item);
                          }}
                        >
                          <CustomCheckBox
                            id={item.code}
                            label={item.label}
                            name={item.code}
                            // checked={
                            //   submissions.length > 0
                            //     ? submissions.map(each => {
                            //         console.log(
                            //           'inside ckbx',
                            //           each.code,
                            //           item.code,
                            //         );
                            //       })
                            //     : false
                            // }
                            changeHandler={this.handleCheckReportType}
                          />
                        </li>
                      ))}
                    </ul>
                  </PerfectScrollbar>
                </div>
              </div>
              {submissionType &&
                submissionType.children &&
                submissionType.children.length > 0 && (
                  <UserRole
                    selectedMetric={submissionType}
                    handleCheckChildren={this.handleCheckChildren}
                    parentData={submissions}
                  />
                )}
            </div>
          </div>
        </div>
        {/* <SiteInformation
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
        /> */}
      </div>
    );
  }
}
