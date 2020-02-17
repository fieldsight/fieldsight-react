import React, { Component } from 'react';
import axios from 'axios';
import { DotLoader } from '../myForm/Loader';
import Modal from '../common/Modal';
import RightContentCard from '../common/RightContentCard';
import GlobalModalForm from './GlobalModalForm';
import { errorToast, successToast } from '../../utils/toastHandler';
import ScheduleFormTable from './ScheduleFormTable';
import EditFormGuide from './EditFormGuide';
import AddForm from './AddForm';
import ManageModal from './ManageModal';
import Loader from '../common/Loader';
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-did-update-set-state */

const formatDate = date => {
  const dateIdx = date.getDate();
  const monthIndex = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${year}-${monthIndex}-${dateIdx}`;
};

class ScheduleForms extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      id: props.match.params ? props.match.params.id : '',
      data: [],
      // deployStatus: false,
      editGuide: false,
      guideData: {},
      editFormId: '',
      showFormModal: false,
      activeTab: 'myForms',
      formData: {},
      xf: '',
      loader: false,
      // loaded: 0,
      formId: '',
      formTitle: '',
      isProjectForm: '',
      myFormList: props.myForms,
      projectFormList: props.projectForms,
      sharedFormList: props.sharedForms,
      orgForms: props.orgLibraryForms,
      isEditForm: false,
      fsxf: '',
      loadReq: false,
    };
  }

  componentDidMount() {
    this._isMounted = true;
    const {
      match: {
        url,
        params: { id },
      },
    } = this.props;
    const splitArr = url.split('/');
    const isProjectForm = splitArr.includes('project');
    const isSiteForm = splitArr.includes('site');
    if (isProjectForm) {
      this.setState(
        {
          loader: true,
          isProjectForm,
        },
        this.requestScheduleForm(id, true),
      );
    } else if (isSiteForm) {
      this.setState(
        {
          loader: true,
          isProjectForm: false,
        },
        this.requestScheduleForm(id, false),
      );
    }
  }

  componentDidUpdate(nextProps) {
    const { props } = this;
    if (nextProps.myForms !== props.myForms) {
      this.setState({
        myFormList: props.myForms,
      });
    } else if (nextProps.projectForms !== props.projectForms) {
      this.setState({
        projectFormList: props.projectForms,
      });
    } else if (nextProps.sharedForms !== props.sharedForms) {
      this.setState({
        sharedFormList: props.sharedForms,
      });
    } else if (nextProps.orgLibraryForms !== props.orgLibraryForms) {
      this.setState({
        orgForms: props.orgLibraryForms,
      });
    }
  }

  onChangeHandler = async e => {
    const {
      state: { activeTab },
      props: { myForms, projectForms, sharedForms, orgLibraryForms },
    } = this;
    const searchValue = e.target.value;

    if (searchValue) {
      if (activeTab === 'myForms') {
        const filteredData = await myForms.filter(form => {
          return (
            form.title
              .toLowerCase()
              .includes(searchValue.toLowerCase()) ||
            form.owner
              .toLowerCase()
              .includes(searchValue.toLowerCase())
          );
        });

        this.setState({
          myFormList: filteredData,
        });
      } else if (activeTab === 'projectForms') {
        const awaitedData = await projectForms.map(project => {
          const filteredData = project.forms.filter(form => {
            return (
              form.title
                .toLowerCase()
                .includes(searchValue.toLowerCase()) ||
              form.owner
                .toLowerCase()
                .includes(searchValue.toLowerCase())
            );
          });
          return { ...project, forms: filteredData };
        });
        this.setState({
          projectFormList: awaitedData,
        });
      } else if (activeTab === 'sharedForms') {
        const filteredData = await sharedForms.filter(form => {
          return (
            form.title
              .toLowerCase()
              .includes(searchValue.toLowerCase()) ||
            form.owner
              .toLowerCase()
              .includes(searchValue.toLowerCase())
          );
        });

        this.setState({
          sharedFormList: filteredData,
        });
      } else if (activeTab === 'orgLibraryForms') {
        const filteredData = await orgLibraryForms.filter(form => {
          return form.title
            .toLowerCase()
            .includes(searchValue.toLowerCase());
        });

        this.setState({
          orgForms: filteredData,
        });
      }
    } else {
      this.setState({
        myFormList: myForms,
        sharedFormList: sharedForms,
        projectFormList: projectForms,
        orgForms: orgLibraryForms,
      });
    }
  };

  changeDeployStatus = (formId, isDeploy) => {
    const { id, isProjectForm } = this.state;
    this.setState({ loadReq: true }, () => {
      const deployUrl = isProjectForm
        ? `fv3/api/manage-forms/deploy/?project_id=${id}&type=schedule&id=${formId}`
        : `fv3/api/manage-forms/deploy/?site_id=${id}&type=schedule&id=${formId}`;
      axios
        .post(deployUrl, { is_deployed: !isDeploy })
        .then(() => {
          this.setState(
            state => {
              const newData = [];
              state.data.map(each => {
                const arrItem = { ...each };
                if (arrItem.id === formId) {
                  arrItem.is_deployed = !isDeploy;
                  return newData.push(arrItem);
                }
                return newData.push(arrItem);
              });
              return { data: newData, loadReq: false };
            },
            () => {
              successToast('Deploy Status', 'updated');
            },
          );
        })
        .catch(err => {
          this.setState({ loadReq: false }, () => {
            const errors = err.response;
            errorToast(errors.data.error);
          });
        });
    });
  };

  deleteItem = (formId, isDeploy) => {
    const { id, isProjectForm } = this.state;
    this.setState({ loadReq: true }, () => {
      const deleteUrl = isProjectForm
        ? `fv3/api/manage-forms/delete/?project_id=${id}&type=schedule&id=${formId}`
        : `fv3/api/manage-forms/delete/?site_id=${id}&type=schedule&id=${formId}`;
      axios
        .post(deleteUrl, { is_deployed: isDeploy })
        .then(() => {
          this.setState(
            state => ({
              data: state.data.filter(each => each.id !== formId),
              loadReq: false,
            }),
            () => {
              successToast('Form', 'deleted');
            },
          );
        })
        .catch(err => {
          this.setState({ loadReq: false }, () => {
            const errors = err.response;
            errorToast(errors.data.error);
          });
        });
    });
  };

  handleEditGuide = (data, formId, fsxf) => {
    this.setState(state => ({
      editGuide: !state.editGuide,
      guideData: data ? data : {},
      editFormId: formId,
      fsxf,
    }));
  };

  handleUpdateGuide = data => {
    const { fsxf, editFormId } = this.state;
    this.setState({ loadReq: true }, () => {
      const formData = new FormData();

      if (data.title) formData.append('title', data.title);
      if (data.text) formData.append('text', data.text);
      if (data.pdf) formData.append('pdf', data.pdf);
      if (data.is_pdf) formData.append('is_pdf', data.is_pdf);
      if (fsxf) formData.append('fsxf', fsxf);
      if (data.images && data.images.length > 0) {
        data.images.map((each, i) => {
          if (!each.image) {
            return formData.append(`new_images_${i + 1}`, each);
          }
          return formData;
        });
      }
      if (data.id) {
        formData.append('id', data.id);
      }

      axios
        .post(`forms/api/save_educational_material/`, formData)
        .then(res => {
          if (res.data)
            this.setState(
              state => {
                const item = [];
                state.data.map(each => {
                  const newEach = { ...each };
                  if (newEach.id === editFormId) {
                    newEach.em = res.data;
                    return item.push(newEach);
                  }
                  return item.push(newEach);
                });

                return {
                  editGuide: false,
                  data: item,
                  loadReq: false,
                };
              },
              () => {
                successToast('form', 'updated');
              },
            );
        })
        .catch(err => {
          this.setState({ loadReq: false }, () => {
            const errors = err.response;
            errorToast(errors.data.error);
          });
        });
    });
  };

  handleMyFormChange = (e, title) => {
    this.setState({
      formId: e.target.value,
      formTitle: title,
    });
  };

  handleSaveForm = () => {
    this.setState(state => ({
      xf: state.formId,
      showFormModal: !state.showFormModal,
    }));
  };

  toggleFormModal = () => {
    this.setState(({ showFormModal }) => ({
      showFormModal: !showFormModal,
    }));
  };

  toggleTab = tab => {
    const {
      myForms,
      sharedForms,
      projectForms,
      orgLibraryForms,
    } = this.props;
    this.setState({
      activeTab: tab,
      myFormList: myForms,
      sharedFormList: sharedForms,
      projectFormList: projectForms,
      orgForms: orgLibraryForms,
    });
  };

  handleClosePopup = () => {
    const {
      myForms,
      projectForms,
      sharedForms,
      closePopup,
      orgLibraryForms,
    } = this.props;
    this.setState({
      formTitle: '',
      formId: '',
      showFormModal: false,
      activeTab: 'myForms',
      myFormList: myForms,
      projectFormList: projectForms,
      sharedFormList: sharedForms,
      xf: '',
      isEditForm: false,
      orgForms: orgLibraryForms,
    });
    closePopup();
  };

  handleScheduleForm = data => {
    const { id, xf, isEditForm, isProjectForm } = this.state;
    const { regionOptions, typeOptions } = this.props;
    const monthDay =
      data.scheduleType === 2 && data.selectedMonthlyDays
        ? data.selectedMonthlyDays === '31'
          ? 0
          : data.selectedMonthlyDays
        : 0;
    const selectedDay =
      data.scheduleType !== 2 ? data.selectedDays : [];
    const frequency = data.scheduleType !== 0 ? data.frequency : 0;
    const selectedAllRegionArr =
      data.regionSelected.length > 0 &&
      data.regionSelected.map(each => {
        if (typeof each.id === 'string') {
          return true;
        }
        return false;
      });
    const isSelectedAllRegion =
      selectedAllRegionArr.length > 0
        ? selectedAllRegionArr.indexOf(true) > -1
          ? true
          : false
        : '';
    const selectedRegionArr = isSelectedAllRegion
      ? regionOptions
          .filter(region => region.id !== 'all')
          .map(item => item.id)
      : data.regionSelected.length > 0 &&
        data.regionSelected.map(each => each.id);

    const selectedAllTypeArr =
      data.typeSelected.length > 0 &&
      data.typeSelected.map(each => {
        if (typeof each.id === 'string') {
          return true;
        }
        return false;
      });
    const isSelectedAllType =
      selectedAllTypeArr.length > 0
        ? selectedAllTypeArr.indexOf(true) > -1
          ? true
          : false
        : '';
    const selectedTypeArr = isSelectedAllType
      ? typeOptions
          .filter(type => type.id !== 'all')
          .map(item => item.id)
      : data.typeSelected.length > 0 &&
        data.typeSelected.map(each => each.id);

    this.setState({ loadReq: true }, () => {
      if (!isEditForm) {
        const postUrl = isProjectForm
          ? `fv3/api/manage-forms/schedule/?project_id=${id}`
          : `fv3/api/manage-forms/schedule/?site_id=${id}`;
        const payload = {
          xf,
          default_submission_status: data.status,
          schedule_level_id: data.scheduleType,
          frequency,
          selected_days: selectedDay,
          month_day: monthDay,

          date_range_start: formatDate(data.startDate),
          ...(data.endDate && {
            date_range_end: formatDate(data.endDate),
          }),
          setting: {
            notify_incomplete_schedule: data.notifyIncomplete,
            can_edit: data.isEdit,
            donor_visibility: data.isDonor,
            regions:
              selectedRegionArr.length > 0 ? selectedRegionArr : [],
            types: selectedTypeArr.length > 0 ? selectedTypeArr : [],
            can_delete: data.isDelete,
          },
        };

        axios
          .post(postUrl, payload)
          .then(res => {
            this.setState(
              state => ({
                data: [...state.data, res.data],
                loadReq: false,
              }),
              () => {
                this.handleClosePopup();
                successToast('form ', 'added');
              },
            );
          })
          .catch(err => {
            this.setState({ loadReq: false }, () => {
              const errors = err.response;
              errorToast(errors.data.error);
            });
          });
      } else {
        const updateUrl = isProjectForm
          ? `fv3/api/manage-forms/schedule/${data.id}/?project_id=${id}`
          : `fv3/api/manage-forms/schedule/${data.id}/?site_id=${id}`;
        const payload = {
          id: data.id,
          default_submission_status: data.status,
          schedule_level_id: data.scheduleType,
          frequency,
          selected_days: selectedDay,
          month_day: monthDay,
          date_range_start: formatDate(data.startDate),
          ...(data.endDate && {
            date_range_end: formatDate(data.endDate),
          }),
          setting: {
            id: data.settingId,
            regions:
              selectedRegionArr.length > 0 ? selectedRegionArr : [],
            types: selectedTypeArr.length > 0 ? selectedTypeArr : [],
            notify_incomplete_schedule: data.notifyIncomplete,
            can_edit: data.isEdit,
            donor_visibility: data.isDonor,
            can_delete: data.isDelete,
            form: xf,
          },
        };

        axios
          .put(updateUrl, payload)
          .then(res => {
            this.setState(
              state => {
                const arr = state.data;
                const newArr = arr.map(item => {
                  if (item.id === res.data.id) {
                    const result = res.data;
                    return result;
                  }
                  //  else {
                  return item;
                  // }
                });
                return {
                  data: newArr,
                  loadReq: false,
                };
              },
              () => {
                this.handleClosePopup();
                successToast('form', 'updated');
              },
            );
          })
          .catch(err => {
            this.setState({ loadReq: false }, () => {
              const errors = err.response;
              errorToast(errors.data.error);
            });
          });
      }
    });
  };

  handleEditScheduleForm = data => {
    this.setState(
      {
        formData: data,
        isEditForm: true,
        formTitle: data.xf.title,
      },
      () => {
        this.props.commonPopupHandler();
      },
    );
  };

  requestScheduleForm(id, checkUrl) {
    const apiUrl = checkUrl
      ? `fv3/api/manage-forms/schedule/?project_id=${id}`
      : `fv3/api/manage-forms/schedule/?site_id=${id}`;

    axios
      .get(apiUrl)
      .then(res => {
        if (this._isMounted && res.data) {
          this.setState({ data: res.data, loader: false });
        }
      })
      .catch(err => {
        const errors = err.response;
        errorToast(errors.data.error);
      });
  }

  render() {
    const {
      state: {
        loader,
        data,
        editGuide,
        guideData,
        showFormModal,
        activeTab,
        formData,
        formTitle,
        myFormList,
        projectFormList,
        sharedFormList,
        isEditForm,
        isProjectForm,
        orgForms,
      },
      props: {
        typeOptions,
        regionOptions,
        formLoader,
        commonPopupHandler,
        popupModal,
      },
      handleClosePopup,
    } = this;

    return (
      <div className="col-xl-9 col-lg-8">
        <RightContentCard
          title="app.scheduled-form"
          addButton
          toggleModal={commonPopupHandler}
          showText
        >
          {loader && <DotLoader />}
          {!loader && isProjectForm && (
            <ScheduleFormTable
              data={data}
              loader={loader}
              changeDeployStatus={this.changeDeployStatus}
              deleteItem={this.deleteItem}
              handleEditGuide={this.handleEditGuide}
              handleEditForm={this.handleEditScheduleForm}
              formTable="project"
            />
          )}
          {!loader && !isProjectForm && (
            <ScheduleFormTable
              data={data}
              loader={loader}
              changeDeployStatus={this.changeDeployStatus}
              deleteItem={this.deleteItem}
              handleEditGuide={this.handleEditGuide}
              handleEditForm={this.handleEditScheduleForm}
              formTable="site"
            />
          )}
          {popupModal && (
            <Modal
              title="Add Scheduled Form"
              toggleModal={handleClosePopup}
              classname="manage-body md-body"
              // handleSubmit={this.handleScheduleForm}
            >
              <GlobalModalForm
                formType="schedule"
                regionOptions={regionOptions}
                typeOptions={typeOptions}
                toggleFormModal={this.toggleFormModal}
                handleToggleForm={handleClosePopup}
                formTitle={formTitle}
                handleCreateForm={this.handleScheduleForm}
                formData={isEditForm && formData}
                isEditForm={isEditForm}
                isProjectWide={false}
              />
            </Modal>
          )}
          {editGuide && (
            <Modal
              title="Form Guide"
              toggleModal={this.handleEditGuide}
            >
              <EditFormGuide
                data={guideData}
                handleCancel={this.handleEditGuide}
                handleUpdateGuide={this.handleUpdateGuide}
                handleCreateGuide={this.handleCreateGuide}
              />
            </Modal>
          )}
          {showFormModal && (
            <ManageModal
              title="Add Form"
              toggleModal={this.toggleFormModal}
              showButton
              showText="Create Form"
              url="/forms/create/"
              classname="manage-body md-body"
              handleSubmit={this.handleSaveForm}
            >
              <AddForm
                activeTab={activeTab}
                toggleTab={this.toggleTab}
                onChangeHandler={this.onChangeHandler}
                formList={myFormList}
                projectList={projectFormList}
                sharedList={sharedFormList}
                handleRadioChange={this.handleMyFormChange}
                orgForms={orgForms}
                loader={formLoader}
              />
            </ManageModal>
          )}
          {this.state.loadReq && <Loader />}
        </RightContentCard>
      </div>
    );
  }
}
export default ScheduleForms;
