import React, { Component } from 'react';
import axios from 'axios';
import { FormattedMessage } from 'react-intl';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

import { DotLoader } from '../myForm/Loader';
import Modal from '../common/Modal';
import AddSubstageForm from './AddSubstageForm';
import AddForm from './common/AddForm';
import { errorToast, successToast } from '../../utils/toastHandler';
import EditFormGuide from './common/EditFormGuide';
import SortableStage from './SortableStage';
import AddStageForm from './AddStageForm';
import ManageModal from './common/ManageModal';
import Loader from '../common/Loader';

/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-did-update-set-state */

class StagedForms extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      id: props.match.params ? props.match.params.id : '',
      data: [],
      editGuide: false,
      guideData: {},
      editFormId: '',
      showFormModal: false,
      activeTab: 'myForms',
      formData: {},
      xf: '',
      loader: false,
      formId: '',
      formTitle: '',
      isProjectForm: '',
      myFormList: props.myForms,
      projectFormList: props.projectForms,
      sharedFormList: props.sharedForms,
      orgForms: props.orgLibraryForms,
      isEditForm: false,
      subStageData: [],
      showSubstageForm: false,
      selectedStage: {},
      loadSubStage: false,
      stageId: '',
      substageId: '',
      isStageReorder: false,
      newStageOrder: [],
      isStageReorderCancel: true,
      isSubstageReorder: false,
      isSubstageReorderCancel: true,
      newSubstageOrder: [],
      reOrderDisable: true,
      subStageReorderDisable: true,
      stagedRegions: [],
      stagedTypes: [],
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
          isProjectForm: true,
        },
        () => {
          this.requestStagedData(id, true);
        },
      );
    } else if (isSiteForm) {
      this.setState(
        {
          loader: true,
          isProjectForm: false,
        },
        () => {
          this.requestStagedData(id, false);
        },
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

  requestStagedData = (id, checkUrl) => {
    const apiUrl = checkUrl
      ? `fv3/api/manage-forms/stages/?project_id=${id}`
      : `fv3/api/manage-forms/stages/?site_id=${id}`;

    axios
      .get(apiUrl)
      .then(res => {
        if (this._isMounted) {
          this.setState({ data: res.data, loader: false });
        }
      })
      .catch(err => {
        const errors = err.response;
        errorToast(errors.data.error);
      });
  };

  handleSubmitStageForm = data => {
    const {
      name,
      desc,
      selectedRegion,
      selectedType,
      order,
      id,
    } = data;
    const { typeOptions, regionOptions } = this.props;

    const selectedAllRegionArr =
      selectedRegion.length > 0 &&
      selectedRegion.map(each => {
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
      : selectedRegion.length > 0 &&
        selectedRegion.map(each => each.id);

    const selectedAllTypeArr =
      selectedType.length > 0 &&
      selectedType.map(each => {
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
      : selectedType.length > 0 && selectedType.map(each => each.id);

    this.setState({ loadReq: true }, () => {
      const mapRegion =
        selectedRegionArr.length > 0 ? selectedRegionArr : [];
      const mapType =
        selectedTypeArr.length > 0 ? selectedTypeArr : [];
      const newOrder =
        typeof order === 'number'
          ? order
          : this.state.data.length + 1;
      if (this.props.popupModal && order === newOrder) {
        const updateStageApi = this.state.isProjectForm
          ? `fv3/api/manage-forms/stages/${id}/?project_id=${this.state.id}`
          : `fv3/api/manage-forms/stages/${id}/?site_id=${this.state.id}`;
        const body = {
          name,
          tags: mapType,
          regions: mapRegion,
          order: newOrder,
          description: desc,
          id,
        };
        axios
          .put(updateStageApi, body)
          .then(res => {
            this.setState(
              preState => {
                const info = preState.data;
                const newArr = info.map(each => {
                  let newData = each;
                  if (newData.id === res.data.id) {
                    newData = res.data;
                    return newData;
                    // } else {
                  }
                  return newData;
                });
                return {
                  data: newArr,
                  stagedRegions: res.data.regions,
                  stagedTypes: res.data.tags,
                  loadReq: false,
                };
              },
              () => {
                this.handleClearStageForm();
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
      } else {
        const postStageApi = this.state.isProjectForm
          ? `fv3/api/manage-forms/stages/?project_id=${this.state.id}`
          : `fv3/api/manage-forms/stages/?site_id=${this.state.id}`;
        const body = {
          name,
          tags: mapType,
          regions: mapRegion,
          order: newOrder,
          description: desc,
        };
        axios
          .post(postStageApi, body)
          .then(res => {
            this.setState(
              preState => ({
                data: [...preState.data, res.data],
                // stageRegions: res.data.regions,
                stagedTypes: res.data.tags,
                loadReq: false,
              }),
              () => {
                this.handleClearStageForm();
                successToast('form', 'added');
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

  handleClickEdit = stageData => {
    const { commonPopupHandler } = this.props;
    this.setState(
      {
        selectedStage: stageData,
      },
      () => {
        commonPopupHandler();
      },
    );
  };

  handleClearStageForm = () => {
    const { closePopup } = this.props;
    this.setState(
      {
        selectedStage: {},
      },
      () => {
        closePopup();
      },
    );
  };

  handleStageReorder = () => {
    const { isStageReorder, isStageReorderCancel } = this.state;
    this.setState({
      isStageReorder: !isStageReorder,
      isStageReorderCancel: !isStageReorderCancel,
    });
  };

  handleNewStageOrder = list => {
    this.setState({
      newStageOrder: list,
      reOrderDisable: false,
    });
  };

  handleSaveStageReorder = () => {
    const { newStageOrder } = this.state;
    axios
      .post(`fv3/api/forms/reorder/stage/`, newStageOrder)
      .then(res => {
        this.setState(
          {
            data: res.data.data,
            isStageReorder: false,
            reOrderDisable: true,
            // isStageReorderCancel: true
          },
          () => {
            successToast('reorder', 'updated');
          },
        );
      })
      .catch(err => {
        const errors = err.response;
        errorToast(errors.data.error);
      });
  };

  handleSubStageForm = () => {
    this.setState(preState => ({
      showSubstageForm: !preState.showSubstageForm,
    }));
  };

  handleClosePopup = () => {
    const {
      myForms,
      projectForms,
      sharedForms,
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
      orgForms: orgLibraryForms,
      isEditForm: false,
    });
    this.handleSubStageForm();
  };

  handleCreateForm = data => {
    const {
      stageId,
      substageId,
      xf,
      stagedRegions,
      stagedTypes,
    } = this.state;

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
      ? stagedRegions.filter(region => region.id !== 'all')
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
      ? stagedTypes.filter(type => type.id !== 'all')
      : data.typeSelected.length > 0 &&
        data.typeSelected.map(each => each.id);

    this.setState({ loadReq: true }, () => {
      if (substageId) {
        const body = {
          id: substageId,
          weight: JSON.parse(data.weight),
          name: data.substageTitle,
          description: data.substageDesc,
          order: data.order,
          xf: xf ? JSON.parse(xf) : '',
          default_submission_status: data.status,
          setting: {
            types: selectedTypeArr.length > 0 ? selectedTypeArr : [],
            regions:
              selectedRegionArr.length > 0 ? selectedRegionArr : [],
            donor_visibility: data.isDonor,
            can_edit: data.isEdit,
            can_delete: data.isDelete,
            id: data.settingId && data.settingId,
          },
        };

        axios
          .put(
            `fv3/api/manage-forms/sub-stages/${substageId}/?stage_id=${stageId}`,
            body,
          )
          .then(res => {
            this.setState(
              preState => {
                const data1 = preState.subStageData;
                const newArr = data1.map(each => {
                  let newData = each;
                  if (newData.id === res.data.id) {
                    newData = res.data;
                    return newData;
                  }
                  // else {
                  return newData;
                  // }
                });
                return {
                  subStageData: newArr,
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
      } else {
        const body = {
          weight: JSON.parse(data.weight),
          name: data.substageTitle,
          description: data.substageDesc,
          order: this.state.subStageData.length + 1,
          xf: xf ? JSON.parse(xf) : '',
          default_submission_status: data.status,
          setting: {
            types: selectedTypeArr.length > 0 ? selectedTypeArr : [],
            regions:
              selectedRegionArr.length > 0 ? selectedRegionArr : [],
            donor_visibility: data.isDonor,
            can_edit: data.isEdit,
            can_delete: data.isDelete,
          },
        };

        axios
          .post(
            `fv3/api/manage-forms/sub-stages/?stage_id=${stageId}`,
            body,
          )
          .then(res => {
            this.setState(
              prevState => ({
                subStageData: [...prevState.subStageData, res.data],
                loadReq: false,
              }),
              () => {
                this.handleClosePopup();
                successToast('form', 'created');
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

  handleRequestSubStage = stage => {
    if (stage.id !== this.state.stageId) {
      this.setState(
        {
          loadSubStage: true,
          // order: stage.order,
          stageId: stage.id,
          isSubstageReorder: false,
          isSubstageReorderCancel: true,
          stagedRegions: stage.regions,
          stagedTypes: stage.tags,
        },
        () => {
          axios
            .get(
              `fv3/api/manage-forms/sub-stages/?stage_id=${stage.id}`,
            )
            .then(res => {
              this.setState({
                loadSubStage: false,
                subStageData: res.data,
              });
            })
            .catch(err => {
              const errors = err.response;
              errorToast(errors.data.error);
            });
        },
      );
    }
  };

  handleSubstageReorder = () => {
    this.setState(preState => ({
      isSubstageReorder: !preState.isSubstageReorder,
      isSubstageReorderCancel: !preState.isSubstageReorderCancel,
    }));
  };

  handleNewSubstageOrder = list => {
    this.setState({
      newSubstageOrder: list,
      subStageReorderDisable: false,
    });
  };

  handleSaveSubstageReorder = () => {
    axios
      .post(
        `fv3/api/forms/reorder/substage/`,
        this.state.newSubstageOrder,
      )
      .then(res => {
        this.setState(
          {
            subStageData: res.data.data,
            isSubstageReorder: false,
            // isStageReorderCancel: true
          },
          () => {
            successToast('reorder', 'updated');
          },
        );
      })
      .catch(err => {
        const errors = err.response;
        errorToast(errors.data.error);
      });
  };

  changeDeployStatus = (formId, isDeploy) => {
    const { id, isProjectForm, subStageData } = this.state;
    this.setState({ loadReq: true }, () => {
      const deployUrl = isProjectForm
        ? `fv3/api/manage-forms/deploy/?project_id=${id}&type=substage&id=${formId}`
        : `fv3/api/manage-forms/deploy/?site_id=${id}&type=substage&id=${formId}`;
      axios
        .post(deployUrl, { is_deployed: !isDeploy })
        .then(() => {
          this.setState(
            () => {
              const newData = [];
              subStageData.map(each => {
                const arrItem = { ...each };
                // let newEach = each.is_deployed;
                if (each.id === formId) {
                  arrItem.is_deployed = !isDeploy;
                  return newData.push(arrItem);
                }
                return newData.push(arrItem);
              });
              return { subStageData: newData, loadReq: false };
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
    const { id, isProjectForm, subStageData } = this.state;
    this.setState({ loadReq: true }, () => {
      const deployUrl = isProjectForm
        ? `fv3/api/manage-forms/delete/?project_id=${id}&type=substage&id=${formId}`
        : `fv3/api/manage-forms/delete/?site_id=${id}&type=substage&id=${formId}`;

      axios
        .post(deployUrl, { is_deployed: isDeploy })
        .then(() => {
          this.setState(
            {
              subStageData: subStageData.filter(
                each => each.id !== formId,
              ),
              loadReq: false,
            },
            () => {
              successToast('Form', 'deleted');
            },
          );
        })
        .catch(err => {
          this.setState({ loadReq: false }, () => {
            const errors = err.response;
            errorToast(errors && errors.data.error);
          });
        });
    });
  };

  handleEditGuide = (data, formId) => {
    this.setState(state => ({
      editGuide: !state.editGuide,
      guideData: data ? data : {},
      editFormId: formId,
    }));
  };

  handleUpdateGuide = data => {
    const { editFormId } = this.state;
    this.setState({ loadReq: true }, () => {
      const formData = new FormData();
      if (data.title) formData.append('title', data.title);
      if (data.text) formData.append('text', data.text);
      if (data.pdf) formData.append('pdf', data.pdf);
      if (data.is_pdf) formData.append('is_pdf', data.is_pdf);
      // if (editFormId) formData.append("fsxf", editFormId);
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
      formData.append('stage', editFormId);
      axios
        .post(`forms/api/save_educational_material/`, formData)
        .then(res => {
          if (res.data)
            this.setState(
              state => {
                const item = [];
                state.subStageData.map(each => {
                  const newItem = { ...each };
                  // const newEach = each.em;
                  if (newItem.id === editFormId) {
                    newItem.em = res.data;
                    return item.push(newItem);
                  }
                  return item.push(newItem);
                });

                return {
                  editGuide: false,
                  subStageData: item,
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

  handleMyFormChange = (e, title) => {
    const { value } = e.target;
    this.setState({
      formId: value,
      formTitle: title,
    });
  };

  handleSaveForm = () => {
    this.setState(preState => ({
      xf: preState.formId,
      showFormModal: !preState.showFormModal,
    }));
  };

  onChangeHandler = async e => {
    const {
      state: { activeTab },
      props: { myForms, sharedForms, projectForms, orgLibraryForms },
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
        orgForms: orgLibraryForms,
        projectFormList: projectForms,
      });
    }
  };

  editSubStageForm = formData => {
    this.setState(
      {
        formData,
        xf: formData.xf && formData.xf.id,
        formId: formData.xf && formData.xf.id,
        formTitle: formData.xf && formData.xf.title,
        substageId: formData.id,
        isEditForm: true,
      },
      () => {
        this.handleSubStageForm();
      },
    );
  };

  handleDeployAllSubstages = toDeploy => {
    const { id, stageId, isProjectForm } = this.state;
    this.setState({ loadReq: true }, () => {
      const deployAllSubstageUrl = isProjectForm
        ? `fv3/api/manage-forms/deploy/?project_id=${id}&type=stage&id=${stageId}`
        : `fv3/api/manage-forms/deploy/?site_id=${id}&type=stage&id=${stageId}`;
      axios
        .post(deployAllSubstageUrl, {
          is_deployed: toDeploy,
        })
        .then(res => {
          if (res.data && !!res.data.message)
            this.setState(
              state => {
                const data = [];

                state.subStageData.map(sub => {
                  const newSub = { ...sub };
                  newSub.is_deployed = toDeploy;
                  return data.push(newSub);
                });

                return {
                  subStageData: data,
                  loadReq: false,
                };
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

  handleDeleteAllSubstages = toDeploy => {
    const { id, stageId, isProjectForm } = this.state;
    this.setState({ loadReq: true }, () => {
      const deleteAllSubstageUrl = isProjectForm
        ? `fv3/api/manage-forms/delete/?project_id=${id}&type=stage&id=${stageId}`
        : `fv3/api/manage-forms/delete/?site_id=${id}&type=stage&id=${stageId}`;
      axios
        .post(deleteAllSubstageUrl, {
          is_deployed: toDeploy,
        })
        .then(res => {
          if (res.data)
            this.setState(
              {
                subStageData: [],
                loadReq: false,
              },
              () => {
                successToast('Deleted', 'successfully');
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

  handleDeployAllStages = toDeploy => {
    const { id, isProjectForm } = this.state;
    this.setState({ loadReq: true }, () => {
      const deployAllUrl = isProjectForm
        ? `fv3/api/manage-forms/deploy/?project_id=${id}&type=all&id=${id}`
        : `fv3/api/manage-forms/deploy/?site_id=${id}&type=all&id=${id}`;
      axios
        .post(deployAllUrl, {
          is_deployed: toDeploy,
        })
        .then(() => {
          this.setState(
            {
              loadReq: false,
            },
            () => {
              if (isProjectForm) this.requestStagedData(id, true);
              else this.requestStagedData(id, false);
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

  handleDeleteAllStages = toDeploy => {
    const { id, isProjectForm } = this.state;
    const deleteAllUrl = isProjectForm
      ? `fv3/api/manage-forms/delete/?project_id=${id}&type=all&id=${id}`
      : `fv3/api/manage-forms/delete/?site_id=${id}&type=all&id=${id}`;

    axios
      .post(deleteAllUrl, {
        is_deployed: toDeploy,
      })
      .then(res => {
        if (res.data)
          this.setState(
            {
              data: [],
            },
            () => {
              successToast('form', 'deleted');
            },
          );
      })
      .catch(err => {
        const errors = err.response;
        errorToast(errors.data.error);
      });
  };

  render() {
    const {
      props: { regionOptions, typeOptions, popupModal, formLoader },
      state: {
        data,
        loader,
        subStageData,
        loadSubStage,
        showSubstageForm,
        selectedStage,
        formTitle,
        formData,
        showFormModal,
        activeTab,
        myFormList,
        projectFormList,
        sharedFormList,
        editGuide,
        guideData,
        isStageReorder,
        isStageReorderCancel,
        isSubstageReorder,
        isSubstageReorderCancel,
        isProjectForm,
        reOrderDisable,
        subStageReorderDisable,
        isEditForm,
        stagedRegions,
        stagedTypes,
        orgForms,
        loadReq,
      },
    } = this;
    let deployCount = 0;
    let canReorder = '';

    data.map(each => {
      deployCount += each.undeployed_count;
      return deployCount;
    });

    const arrToReorder = data.map(each => {
      if (each.site) {
        return true;
      }
      // } else {
      return false;
      // }
    });
    // canReorder =
    //   arrToReorder.length > 0
    //     ? arrToReorder.indexOf(false) > -1
    //       ? false
    //       : true
    //     : '';
    // let canReorder = false;
    if (arrToReorder.length > 0) {
      if (arrToReorder.indexOf(false) > -1) {
        canReorder = false;
      } else {
        canReorder = true;
      }
    }

    return (
      <div className="col-xl-9 col-lg-8">
        <div className="card">
          <div className="card-header main-card-header">
            <h5>
              <FormattedMessage
                id="app.staged-form"
                defaultMessage="Staged Forms"
              />
            </h5>
            {isProjectForm && (
              <div className="add-btn">
                <a
                  onClick={this.handleStageReorder}
                  tabIndex="0"
                  role="button"
                  onKeyDown={this.handleStageReorder}
                >
                  {!isStageReorder ? (
                    <OverlayTrigger
                      placement="top"
                      overlay={
                        <Tooltip>
                          <FormattedMessage
                            id="app.reorder"
                            defaultMessage="Reorder"
                          />
                        </Tooltip>
                      }
                    >
                      <span className="reorder">
                        <i className="la la-ellipsis-v" />
                        <i className="la la-ellipsis-v" />
                      </span>
                    </OverlayTrigger>
                  ) : (
                    <OverlayTrigger
                      placement="top"
                      overlay={
                        <Tooltip>
                          <FormattedMessage
                            id="app.cancelReorder"
                            defaultMessage="Cancel Reorder"
                          />
                        </Tooltip>
                      }
                    >
                      <span className="reorder">
                        <i className="la la-close" />
                      </span>
                    </OverlayTrigger>
                  )}
                </a>
                {isStageReorder && (
                  <a
                    onClick={this.handleSaveStageReorder}
                    className={`${reOrderDisable ? 'disabled' : ''}`}
                    tabIndex="0"
                    role="button"
                    onKeyDown={this.handleSaveStageReorder}
                  >
                    <OverlayTrigger
                      placement="top"
                      overlay={
                        <Tooltip>
                          <FormattedMessage
                            id="app.save"
                            defaultMessage="Save"
                          />
                        </Tooltip>
                      }
                    >
                      <span>
                        <i className="la la-save" />
                      </span>
                    </OverlayTrigger>
                  </a>
                )}
                {/* {deployCount > 0 && ( */}
                <a
                  className={`${
                    deployCount > 0
                      ? 'deploy-active'
                      : 'deploy-inactive'
                  }`}
                  onClick={() => this.handleDeployAllStages(true)}
                  tabIndex="0"
                  role="button"
                  onKeyDown={() => this.handleDeployAllStages(true)}
                >
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip>
                        <FormattedMessage
                          id="app.deployAllStages"
                          defaultMessage="Deploy All Stages"
                        />
                      </Tooltip>
                    }
                  >
                    <span className="">
                      <i className="la la-rocket" />
                    </span>
                  </OverlayTrigger>
                </a>
                {/* )} */}
              </div>
            )}
            {!isProjectForm && canReorder && (
              <div className="add-btn">
                <a
                  onClick={this.handleStageReorder}
                  tabIndex="0"
                  role="button"
                  onKeyDown={this.handleStageReorder}
                >
                  {!isStageReorder ? (
                    <OverlayTrigger
                      placement="top"
                      overlay={
                        <Tooltip>
                          <FormattedMessage
                            id="app.reorderStages"
                            defaultMessage="Reorder Stages"
                          />
                        </Tooltip>
                      }
                    >
                      <span className="reorder">
                        <i className="la la-ellipsis-v" />
                        <i className="la la-ellipsis-v" />
                      </span>
                    </OverlayTrigger>
                  ) : (
                    <OverlayTrigger
                      placement="top"
                      overlay={
                        <Tooltip>
                          <FormattedMessage
                            id="app.cancelReorder"
                            defaultMessage="Cancel Reorder"
                          />
                        </Tooltip>
                      }
                    >
                      <span className="reorder">
                        <i className="la la-close" />
                      </span>
                    </OverlayTrigger>
                  )}
                </a>
                {isStageReorder && (
                  <a
                    onClick={this.handleSaveStageReorder}
                    className={`${reOrderDisable ? 'disabled' : ''}`}
                    tabIndex="0"
                    role="button"
                    onKeyDown={this.handleSaveStageReorder}
                  >
                    <OverlayTrigger
                      placement="top"
                      overlay={<Tooltip> Save</Tooltip>}
                    >
                      <span>
                        <i className="la la-save" />
                      </span>
                    </OverlayTrigger>
                  </a>
                )}

                <a
                  className={`${
                    deployCount > 0
                      ? 'deploy-active'
                      : 'deploy-inactive'
                  }`}
                  onClick={() => this.handleDeployAllStages(true)}
                  tabIndex="0"
                  role="button"
                  onKeyDown={() => this.handleDeployAllStages(true)}
                >
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip>
                        <FormattedMessage
                          id="app.deployAllStages"
                          defaultMessage="Deploy All Stages"
                        />
                      </Tooltip>
                    }
                  >
                    <span className="">
                      <i className="la la-rocket" />
                    </span>
                  </OverlayTrigger>
                </a>
              </div>
            )}
          </div>
          {loader && <DotLoader />}
          {!loader && (
            <>
              <SortableStage
                stage={data}
                handleRequestSubStage={this.handleRequestSubStage}
                handleClickEdit={this.handleClickEdit}
                loadSubStage={loadSubStage}
                subStageData={subStageData}
                handleEditGuide={this.handleEditGuide}
                changeDeployStatus={this.changeDeployStatus}
                deleteItem={this.deleteItem}
                editSubStageForm={this.editSubStageForm}
                handleSubStageForm={this.handleSubStageForm}
                reorder={isStageReorder}
                isStageReorderCancel={isStageReorderCancel}
                handleNewStageOrder={this.handleNewStageOrder}
                reorderSubstage={isSubstageReorder}
                isSubstageReorderCancel={isSubstageReorderCancel}
                handleSubstageReorder={this.handleSubstageReorder}
                handleSaveSubstageReorder={
                  this.handleSaveSubstageReorder
                }
                handleNewSubstageOrder={this.handleNewSubstageOrder}
                handleDeployAll={this.handleDeployAllSubstages}
                handleDeleteAll={this.handleDeleteAllSubstages}
                isProjectForm={isProjectForm}
                subStageReorderDisable={subStageReorderDisable}
              />
              <div className="card-body pdt-0">
                <div className="add-btn  stage-add">
                  <a
                    onClick={this.props.commonPopupHandler}
                    tabIndex="0"
                    role="button"
                    onKeyDown={this.props.commonPopupHandler}
                  >
                    <FormattedMessage
                      id="app.addStage"
                      defaultMessage="Add Stage"
                    />
                    <span>
                      <i className="la la-plus" />
                    </span>
                  </a>
                </div>
              </div>
            </>
          )}
          {popupModal && (
            <Modal
              title="app.stageForm"
              toggleModal={this.handleClearStageForm}
              classname="manage-body md-body"
              // handleSubmit={this.handleSubmitStageForm}
            >
              <AddStageForm
                regionOptions={regionOptions}
                typeOptions={typeOptions}
                handleSubmit={this.handleSubmitStageForm}
                stageData={selectedStage}
              />
            </Modal>
          )}
          {showSubstageForm && (
            <Modal
              title="app.subStageForm"
              toggleModal={this.handleClosePopup}
              classname="manage-body md-body"
              // handleSubmit={this.handleCreateForm}
            >
              <AddSubstageForm
                regionOptions={regionOptions}
                typeOptions={typeOptions}
                toggleFormModal={this.toggleFormModal}
                handleToggleForm={this.handleClosePopup}
                formTitle={formTitle}
                handleCreateForm={this.handleCreateForm}
                formData={isEditForm && formData}
                isEditForm={isEditForm}
                stagedRegions={stagedRegions}
                stagedTypes={stagedTypes}
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
          {loadReq && <Loader />}
        </div>
      </div>
    );
  }
}
export default StagedForms;
