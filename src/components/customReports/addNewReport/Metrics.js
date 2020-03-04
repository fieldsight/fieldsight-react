import React, { Component } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
import CustomCheckBox from '../common/CustomCheckbox';
import UserRole from './UserRole';
import SiteInformation from './SiteInformation';
import FormInformation from './FormInformation';
/* eslint-disable */

export default class Metrics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      metrics: props.data,
      users: props.users,
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

  onMetricsChangeHandler = async e => {
    const { value } = e.target;
    const { metrics } = this.state;
    if (value) {
      const filteredMetrics = await metrics.filter(m =>
        m.label.toLowerCase().includes(value.toLowerCase()),
      );
      this.setState({ metrics: filteredMetrics });
    } else {
      this.setState({ metrics: this.props.data });
    }
  };

  onUsersChangeHandler = async e => {
    const { value } = e.target;
    const { users } = this.state;
    if (value) {
      const filteredUsers = await users.filter(user =>
        user.label.toLowerCase().includes(value.toLowerCase()),
      );
      this.setState({ users: filteredUsers });
    } else {
      this.setState({ users: this.props.users });
    }
  };

  render() {
    const { metrics, users } = this.state;
    const {
      submissions,
      submissionType,
      userList,
      siteValues,
      selectedMetrics,
      metaAttributes,
      selectedMetas,
      formTypes,
      selectedFormType,
      formTypeArr,
      toggleSelectClass,
      handleToggleClass,
      selectedForm,
      formQuestions,
      individualFormArr,
      selectedIndividualForm,
      selectedFormValue,
      formInfoArr,
      projectId,
      forms,
      handleFormInfo,
      addSubmissionCount,
      selectedReportType,
      handleSiteAddValue,
      selectedValue,
    } = this.props;

    return (
      <div className="col-lg-7 col-md-7">
        <div className="acc-item">
          <div className="acc-header active">
            <h5>metrics</h5>
          </div>
          <div className="acc-body">
            <div className="row">
              <div className="col-md-6">
                <div className="custom-group">
                  <div className="custom-group-append">
                    <span className="custom-group-text">
                      <i className="material-icons">search</i>
                    </span>
                  </div>
                  <input
                    className="custom-control"
                    type="search"
                    placeholder="Quick search metrics ..."
                    onChange={e => {
                      this.onMetricsChangeHandler(e);
                    }}
                  />
                </div>
                <div
                  style={{
                    position: 'relative',
                    height: `200px `,
                  }}
                >
                  <PerfectScrollbar>
                    <ul className="role-list">
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
                  onUsersChangeHandler={this.onUsersChangeHandler}
                />
              )}
            </div>
          </div>
        </div>
        {selectedReportType < 3 && (
          <SiteInformation
            toggleSelectClass={toggleSelectClass}
            handleToggleClass={handleToggleClass}
            siteValues={siteValues}
            selectedValue={selectedValue}
            selectedMetrics={selectedMetrics}
            metaAttributes={metaAttributes}
            selectedMetas={selectedMetas}
            handleSiteAddValue={handleSiteAddValue}
          />
        )}
        <FormInformation
          projectId={projectId}
          selectedReportType={selectedReportType}
          toggleSelectClass={toggleSelectClass}
          handleToggleClass={handleToggleClass}
          selectedMetrics={selectedMetrics}
          formTypes={formTypes}
          selectedFormType={selectedFormType}
          formTypeArr={formTypeArr}
          selectedForm={selectedForm}
          formQuestions={formQuestions}
          forms={forms}
          individualFormArr={individualFormArr}
          selectedIndividualForm={selectedIndividualForm}
          selectedQuestions={this.props.selectedQuestions}
          formValue={this.props.formValue}
          selectedFormValue={selectedFormValue}
          formInfoArr={formInfoArr}
          handleFormInfo={handleFormInfo}
          addSubmissionCount={addSubmissionCount}
          handleClickOutside={this.props.handleClickOutside}
        />
      </div>
    );
  }
}
