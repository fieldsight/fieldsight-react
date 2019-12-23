import React, { Component, Fragment } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
import CustomCheckBox from '../CustomCheckbox';
import UserRole from './userRole';
import SiteInformation from './siteInformation';
import FormInformation from './formInformation';
/* eslint-disable */

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
    this.setState(
      state => {
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
      },
      () => {
        this.props.handleSelectChange(this.state.submissions);
      },
    );
  };

  handleCheckChildren = (e, data, child) => {
    const { checked } = e.target;
    const { submissions } = this.state;

    this.setState(
      () => {
        if (checked) {
          const newSubmissions = submissions.map(sub => {
            if (sub.code === data.code) {
              const children = [...sub.children, child];
              return { ...sub, children };
            }
            return { sub };
          });
          return {
            submissions: newSubmissions,
          };
        }
        if (!checked) {
          const filteredData = submissions.map(sub => {
            if (sub.code === data.code) {
              const ch = sub.children.filter(
                i => i.code !== child.code,
              );
              return { ...sub, children: ch };
            }
            return sub;
          });
          return {
            submissions: filteredData,
          };
        }
      },
      () => {
        this.props.handleSelectChange(this.state.submissions);
      },
    );
  };

  render() {
    const {
      metrics,
      submissions,
      submissionType,
      toggleSelectClass,
    } = this.state;

    console.log('metrics', submissions);

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
