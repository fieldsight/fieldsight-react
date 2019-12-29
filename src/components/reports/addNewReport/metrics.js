import React, { Component } from 'react';
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
      users: props.users,
      toggleSelectClass: false,
      toggleFormClass: false,
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.data !== this.props.data) {
      this.setState({
        metrics: this.props.data,
      });
    }
    if (prevProps.users !== this.props.users) {
      this.setState({
        users: this.props.users,
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

  handleFormToggle = () => {
    this.setState(({ toggleFormClass }) => ({
      toggleFormClass: !toggleFormClass,
    }));
  };

  onChangeHandler = () => {
    // console.log('search');
  };

  render() {
    const {
      metrics,
      users,
      toggleSelectClass,
      toggleFormClass,
    } = this.state;
    const {
      submissions,
      submissionType,
      userList,
      siteValues,
      selectedMetrics,
      metaAttributes,
      selectedMetas,
      handleSelectMeta,
      formTypes,
      selectedFormType,
      handleFormTypeCheck,
    } = this.props;
    // console.log('metrics', formTypes, '-----', selectedFormType);

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
                      {metrics.map(item => {
                        const filterList = submissions.filter(
                          i => i.code === item.code,
                        );
                        const isChecked =
                          filterList && filterList[0] ? true : false;

                        return (
                          <li
                            key={item.code}
                            className={
                              submissionType.code === item.code
                                ? 'active'
                                : ''
                            }
                            onKeyDown={() => {
                              this.props.handleSubmissionType(item);
                            }}
                            onClick={() => {
                              this.props.handleSubmissionType(item);
                            }}
                          >
                            <CustomCheckBox
                              id={item.code}
                              label={item.label}
                              name={item.code}
                              checked={isChecked}
                              changeHandler={
                                this.props.handleCheckSubmissionType
                              }
                            />
                          </li>
                        );
                      })}
                    </ul>
                  </PerfectScrollbar>
                </div>
              </div>
              {users && users.length > 0 && (
                <UserRole
                  users={users}
                  handleCheckUser={this.props.handleCheckUser}
                  userList={userList}
                  // parentData={submissions}
                />
              )}
            </div>
          </div>
        </div>
        <SiteInformation
          toggleSelectClass={toggleSelectClass}
          handleToggleClass={this.handleToggleClass}
          siteValues={siteValues}
          selectedMetrics={selectedMetrics}
          metaAttributes={metaAttributes}
          selectedMetas={selectedMetas}
          handleSelectMeta={handleSelectMeta}
        />
        {/* <FormInformation
          toggleSelectClass={toggleFormClass}
          handleToggleClass={this.handleFormToggle}
          formTypes={formTypes}
          selectedFormType={selectedFormType}
          handleFormTypeCheck={handleFormTypeCheck}
          // selectedArr={[]}
        /> */}
      </div>
    );
  }
}
