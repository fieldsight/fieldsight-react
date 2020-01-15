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
      handleSelectMeta,
      formTypes,
      selectedFormType,
      handleFormTypeCheck,
      formTypeArr,
      toggleSelectClass,
      handleToggleClass,
      selectedForm,
      formQuestions,
      individualFormArr,
      selectedIndividualForm,
      handleIndividualFormSelected,
      selectedFormValue,
      formInfoArr,
      projectId,
      forms,
      handleFormInfo,
      addSubmissionCount,
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
                    placeholder="Quick search metrics ..."
                    onChange={e => {
                      this.onMetricsChangeHandler(e);
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
        <SiteInformation
          toggleSelectClass={toggleSelectClass}
          handleToggleClass={handleToggleClass}
          siteValues={siteValues}
          selectedMetrics={selectedMetrics}
          metaAttributes={metaAttributes}
          selectedMetas={selectedMetas}
          handleSelectMeta={handleSelectMeta}
        />
        <FormInformation
          projectId={projectId}
          toggleSelectClass={toggleSelectClass}
          handleToggleClass={handleToggleClass}
          selectedMetrics={selectedMetrics}
          formTypes={formTypes}
          selectedFormType={selectedFormType}
          handleFormTypeCheck={handleFormTypeCheck}
          formTypeArr={formTypeArr}
          selectedForm={selectedForm}
          handleFormSelected={this.props.handleFormSelected}
          formQuestions={formQuestions}
          forms={forms}
          individualFormArr={individualFormArr}
          selectedIndividualForm={selectedIndividualForm}
          handleIndividualFormSelected={handleIndividualFormSelected}
          handleChangeFormQuest={this.props.handleChangeFormQuest}
          selectedQuestions={this.props.selectedQuestions}
          formValue={this.props.formValue}
          selectedFormValue={selectedFormValue}
          formInfoArr={formInfoArr}
          handleFormInfo={handleFormInfo}
          addSubmissionCount={addSubmissionCount}
        />
      </div>
    );
  }
}
