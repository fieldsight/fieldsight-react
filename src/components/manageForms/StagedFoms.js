import React, { Component } from "react";
import axios from "axios";

import { DotLoader } from "../myForm/Loader";
import Modal from "../common/Modal";
import GlobalModalForm from "./GlobalModalForm";
import AddForm from "./AddForm";
import { errorToast, successToast } from "../../utils/toastHandler";
import EditFormGuide from "./EditFormGuide";
import SortableStage from "./SortableStage";
import AddStageForm from "./AddStageForm";

class StagedForms extends Component {
  _isMounted = false;
  state = {
    id: this.props.match.params ? this.props.match.params.id : "",
    data: [],
    deployStatus: false,
    editGuide: false,
    guideData: {},
    editFormId: "",
    showFormModal: false,
    activeTab: "myForms",
    formData: {},
    xf: "",
    loader: false,
    loaded: 0,
    formId: "",
    formTitle: "",
    isProjectForm: "",
    myFormList: [],
    projectFormList: [],
    sharedFormList: [],
    isEditForm: false,

    subStageData: [],
    showSubstageForm: false,
    selectedStage: {},
    loadSubStage: false,
    stageId: "",
    substageId: "",
    isStageReorder: false,
    newStageOrder: [],
    isStageReorderCancel: true,
    isSubstageReorder: false,
    isSubstageReorderCancel: true,
    newSubstageOrder: []
  };

  componentDidMount() {
    this._isMounted = true;
    const {
      match: {
        url,
        params: { id }
      }
    } = this.props;
    const splitArr = url.split("/");
    const isProjectForm = splitArr.includes("project");

    if (isProjectForm) {
      this.setState(
        {
          loader: true,
          isProjectForm
        },
        this.requestStagedData(id)
      );
    }
  }

  requestStagedData = projectId => {
    axios
      .get(`fv3/api/manage-forms/stages/?project_id=${projectId}`)
      .then(res => {
        if (this._isMounted) {
          this.setState({ data: res.data, loader: false });
        }
      })
      .catch(err => {});
  };

  handleStageReorder = () => {
    this.setState({
      isStageReorder: !this.state.isStageReorder,
      isStageReorderCancel: !this.state.isStageReorderCancel
    });
  };
  handleNewStageOrder = list => {
    this.setState({
      newStageOrder: list
    });
  };
  handleSaveStageReorder = () => {
    axios
      .post(`fv3/api/forms/reorder/stage/`, this.state.newStageOrder)
      .then(res => {
        this.setState(
          {
            data: res.data.data,
            isStageReorder: false
            // isStageReorderCancel: true
          },
          () => {
            successToast("reorder", "updated");
          }
        );
      })
      .catch(err => {
        errorToast(err);
      });
  };

  handleRequestSubStage = (stageId, order) => {
    if (stageId != this.state.stageId)
      this.setState(
        {
          loadSubStage: true,
          order: order,
          stageId,
          isSubstageReorder: false,
          isSubstageReorderCancel: true
        },
        () => {
          axios
            .get(`fv3/api/manage-forms/sub-stages/?stage_id=${stageId}`)
            .then(res => {
              this.setState({
                loadSubStage: false,
                subStageData: res.data
              });
            })
            .catch(err => {
              errorToast(err);
            });
        }
      );
  };
  handleSubstageReorder = () => {
    this.setState({
      isSubstageReorder: !this.state.isSubstageReorder,
      isSubstageReorderCancel: !this.state.isSubstageReorderCancel
    });
  };
  handleNewSubstageOrder = list => {
    this.setState({
      newSubstageOrder: list
    });
  };
  handleSaveSubstageReorder = () => {
    axios
      .post(`fv3/api/forms/reorder/substage/`, this.state.newSubstageOrder)
      .then(res => {
        this.setState(
          {
            subStageData: res.data.data,
            isSubstageReorder: false
            // isStageReorderCancel: true
          },
          () => {
            successToast("reorder", "updated");
          }
        );
      })
      .catch(err => {
        errorToast(err);
      });
  };

  changeDeployStatus = (formId, isDeploy) => {
    const { id } = this.state;
    axios
      .post(
        `fv3/api/manage-forms/deploy/?project_id=${id}&type=substage&id=${formId}`,
        { is_deployed: !isDeploy }
      )
      .then(res => {
        this.setState(
          state => {
            const newData = this.state.subStageData;
            newData.map(each => {
              const arrItem = { ...each };

              if (each.id == formId) {
                each.is_deployed = !isDeploy;
              }
              return arrItem;
            });
            return { subStageData: newData };
          },
          () => {
            successToast("updated", "successfully");
          }
        );
      })
      .catch(err => {});
  };
  deleteItem = (formId, isDeploy) => {
    const { id } = this.state;
    axios
      .post(
        `fv3/api/manage-forms/delete/?project_id=${id}&type=substage&id=${formId}`,
        { is_deployed: isDeploy }
      )
      .then(res => {
        this.setState(
          {
            subStageData: this.state.subStageData.filter(
              each => each.id != formId
            )
          },
          () => {
            successToast("Form", "deleted");
          }
        );
      })
      .catch(err => {});
  };

  handleEditGuide = (data, formId) => {
    this.setState({
      editGuide: !this.state.editGuide,
      guideData: data ? data : {},
      editFormId: formId
    });
  };
  handleUpdateGuide = data => {
    const { id, editFormId, stageId } = this.state;
    const formData = new FormData();
    if (data.title) formData.append("title", data.title);
    if (data.text) formData.append("text", data.text);
    if (data.pdf) formData.append("pdf", data.pdf);
    if (data.is_pdf) formData.append("is_pdf", data.is_pdf);
    // if (editFormId) formData.append("fsxf", editFormId);
    if (data.images && data.images.length > 0) {
      data.images.map((each, i) => {
        if (!each.image) formData.append(`new_images_${i + 1}`, each);
      });
    }
    if (data.id) {
      formData.append("id", data.id);
    }
    formData.append("stage", editFormId);
    axios
      .post(`forms/api/save_educational_material/`, formData)
      .then(res => {
        this.setState(
          {
            editGuide: false
          },
          () => {
            this.handleRequestSubStage(stageId);
            successToast("update", "successfully");
          }
        );
      })
      .catch(err => {
        errorToast(err);
      });
  };

  handleSubStageForm = () => {
    this.setState({
      showSubstageForm: !this.state.showSubstageForm
    });
  };
  handleSubmitStageForm = data => {
    const { name, desc, selectedRegion, selectedType, order, id } = data;
    const mapRegion = selectedRegion.map(each => each.id);
    const mapType = selectedType.map(each => each.id);
    const newOrder = order > 0 ? order : this.state.data.length + 1;

    if (order > 0) {
      const body = {
        name: name,
        tags: mapType,
        regions: mapRegion,
        order: newOrder,
        description: desc,
        id: id
      };
      axios
        .put(
          `fv3/api/manage-forms/stages/${id}/?project_id=${this.state.id}`,
          body
        )
        .then(res => {
          this.setState(
            state => {
              const data = this.state.data;
              const newArr = data.map(each => {
                if (each.id == res.data.id) {
                  return (each = res.data);
                } else {
                  return each;
                }
              });
              return {
                data: newArr
              };
            },
            () => {
              this.props.closePopup();
              successToast("form", "updated");
            }
          );
        })
        .catch(err => {
          errorToast(err);
        });
    } else {
      const body = {
        name: name,
        tags: mapType,
        regions: mapRegion,
        order: newOrder,
        description: desc
      };
      axios
        .post(`fv3/api/manage-forms/stages/?project_id=${this.state.id}`, body)
        .then(res => {
          this.setState(
            {
              data: [...this.state.data, res.data]
            },
            () => {
              this.props.closePopup();
              successToast("form", "added");
            }
          );
        })
        .catch(err => {
          errorToast(err);
        });
    }
  };
  handleClickEdit = stageData => {
    this.setState(
      {
        selectedStage: stageData
      },
      () => {
        this.props.commonPopupHandler();
      }
    );
  };

  handleClosePopup = () => {
    this.setState({
      formTitle: "",
      formId: "",
      showFormModal: false,
      activeTab: "myForms",
      myFormList: [],
      projectFormList: [],
      sharedFormList: [],
      xf: ""
    });
    this.handleSubStageForm();
  };
  toggleFormModal = () => {
    this.setState({ showFormModal: !this.state.showFormModal });
  };

  toggleTab = tab => {
    this.setState({
      activeTab: tab,
      myFormList: this.props.myForms,
      sharedFormList: this.props.sharedForms,
      projectFormList: this.props.projectForms
    });
  };
  handleMyFormChange = (e, title) => {
    this.setState({
      formId: e.target.value,
      formTitle: title
    });
  };
  handleSaveForm = () => {
    this.setState({
      xf: this.state.formId,
      showFormModal: !this.state.showFormModal
    });
  };
  handleCreateForm = data => {
    // e.preventDefault();
    const {
      // weight,
      // formData,
      // order,
      // substageTitle,
      // substageDesc,
      stageId,
      substageId,
      xf
    } = this.state;

    if (!!substageId) {
      const body = {
        id: substageId,
        weight: data.weight,
        name: data.substageTitle,
        description: data.substageDesc,
        order: data.order,
        xf: xf,
        default_submission_status: data.status,
        setting: {
          types: data.typeSelected,
          regions: data.regionSelected,
          donor_visibility: data.isDonor,
          can_edit: data.isEdit,
          can_delete: data.isDelete
        }
      };

      axios
        .put(
          `fv3/api/manage-forms/sub-stages/${substageId}/?stage_id=${stageId}`,
          body
        )
        .then(res => {
          this.setState(
            state => {
              const data = this.state.subStageData;
              const newArr = data.map(each => {
                if (each.id == res.data.id) {
                  return (each = res.data);
                } else {
                  return each;
                }
              });
              return {
                subStageData: newArr
              };
            },
            () => {
              this.handleSubStageForm();

              successToast("form", "updated");
            }
          );
        })
        .catch(err => {
          errorToast(err);
        });
    } else {
      const body = {
        weight: data.weight,
        name: data.substageTitle,
        description: data.substageDesc,
        order: data.order,
        xf: xf,
        default_submission_status: data.status,
        setting: {
          types: data.typeSelected,
          regions: data.regionSelected,
          donor_visibility: data.isDonor,
          can_edit: data.isEdit,
          can_delete: data.isDelete
        }
      };

      axios
        .post(`fv3/api/manage-forms/sub-stages/?stage_id=${stageId}`, body)
        .then(res => {
          this.setState(
            {
              subStageData: [...this.state.subStageData, res.data]
            },
            () => {
              this.handleSubStageForm();
              successToast("form", "created");
            }
          );
        })
        .catch(err => {
          errorToast(err);
        });
    }
  };
  onChangeHandler = async e => {
    const {
      activeTab,
      myFormList,
      projectFormList,
      sharedFormList
    } = this.state;
    const searchValue = e.target.value;

    if (searchValue) {
      if (activeTab == "myForms") {
        const filteredData = await myFormList.filter(form => {
          return (
            form.title.toLowerCase().includes(searchValue.toLowerCase()) ||
            form.owner.toLowerCase().includes(searchValue.toLowerCase())
          );
        });

        this.setState({
          myFormList: filteredData
        });
      } else if (activeTab == "projectForms") {
        const awaitedData = await projectFormList.map(project => {
          const filteredData = project.forms.filter(form => {
            return (
              form.title.toLowerCase().includes(searchValue.toLowerCase()) ||
              form.owner.toLowerCase().includes(searchValue.toLowerCase())
            );
          });
          return { ...project, forms: filteredData };
        });
        this.setState({
          projectFormList: awaitedData
        });
      } else if (activeTab == "sharedForms") {
        const filteredData = await sharedFormList.filter(form => {
          return (
            form.title.toLowerCase().includes(searchValue.toLowerCase()) ||
            form.owner.toLowerCase().includes(searchValue.toLowerCase())
          );
        });

        this.setState({
          sharedFormList: filteredData
        });
      }
    } else {
      this.setState({
        myFormList: this.props.myForms,
        sharedFormList: this.props.sharedForms,
        projectFormList: this.props.projectForms
      });
    }
  };

  editSubStageForm = formData => {
    this.setState(
      {
        formData: formData,
        xf: formData.xf && formData.xf.id,
        formId: formData.xf && formData.xf.id,
        formTitle: formData.xf && formData.xf.title,
        // weight: formData.weight,
        // substageTitle: formData.name,
        // substageDesc: formData.description,
        // order: formData.order,
        // commonFormData: {
        //   ...this.state.commonFormData,
        //   status: formData.default_submission_status,
        //   isDonor: formData.setting && formData.setting.donor_visibility,
        //   isEdit: formData.setting && formData.setting.can_edit,
        //   isDelete: formData.setting && formData.setting.can_delete,
        //   regionSelected: formData.setting && formData.setting.regions,
        //   typeSelected: formData.setting && formData.setting.types,
        //   xf: formData.xf && formData.xf.id
        // },
        substageId: formData.id
      },
      () => {
        this.handleSubStageForm();
      }
    );
  };
  handleDeployAllSubstages = toDeploy => {
    const { id, stageId, subStageData } = this.state;
    axios
      .post(
        `fv3/api/manage-forms/deploy/?project_id=${id}&type=stage&id=${stageId}`,
        {
          is_deployed: toDeploy
        }
      )
      .then(res => {
        if (res.data && !!res.data.message)
          this.setState(
            state => {
              const data = subStageData;
              data.map(sub => {
                const arrItem = { ...sub };
                sub.is_deployed = toDeploy;
                return arrItem;
              });
              return {
                subStageData: data
              };
            },
            () => {
              successToast("updated", "");
            }
          );
      })
      .catch(err => {
        errorToast(err);
      });
  };
  handleDeleteAllSubstages = toDeploy => {
    const { id, stageId } = this.state;
    // console.log(toDeploy, stageId);
    axios
      .post(
        `fv3/api/manage-forms/delete/?project_id=${id}&type=stage&id=${stageId}`,
        {
          is_deployed: toDeploy
        }
      )
      .then(res => {
        // console.log("delete ko res", res.data);
        if (!!res.data)
          this.setState(
            {
              subStageData: []
            },
            () => {
              successToast("Deleted", "successfully");
            }
          );
      })
      .catch(err => {
        // console.log("err", err.text);

        errorToast(err.error);
      });
  };
  handleDeployAllStages = toDeploy => {
    const { id } = this.state;
    axios
      .post(`fv3/api/manage-forms/deploy/?project_id=${id}&type=all&id=${id}`, {
        is_deployed: toDeploy
      })
      .then(res => {
        // console.log("res", res.data);
        successToast("updated", "successfully");
      })
      .catch(err => {
        errorToast(err);
      });
  };
  handleDeleteAllStages = toDeploy => {
    // debugger;
    const { id } = this.state;
    // console.log(toDeploy, stageId);
    axios
      .post(`fv3/api/manage-forms/delete/?project_id=${id}&type=all&id=${id}`, {
        is_deployed: toDeploy
      })
      .then(res => {
        // console.log("delete ko res", res.data);
        if (!!res.data)
          this.setState(
            {
              data: []
            },
            () => {
              successToast("Deleted", "successfully");
            }
          );
      })
      .catch(err => {
        errorToast(err);
      });
  };

  render() {
    const {
      props: { regionOptions, typeOptions },
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
        isSubstageReorderCancel
      },
      handleRequestSubStage,
      handleSubmitStageForm,
      handleClickEdit,
      handleSubStageForm,
      handleClosePopup,
      handleStageReorder,
      handleSaveStageReorder,
      handleSubstageReorder,
      handleSaveSubstageReorder,
      handleDeployAllSubstages,
      handleDeleteAllSubstages,
      handleDeployAllStages,
      handleDeleteAllStages
    } = this;
    // console.log("data", data);

    return (
      <div className="col-xl-9 col-lg-8">
        <div className="card">
          <div className="card-header main-card-header">
            <h5>Staged Forms</h5>
            <div className="add-btn">
              <a onClick={this.props.commonPopupHandler}>
                Add New
                <span>
                  <i className="la la-plus" />
                </span>
              </a>
              <a onClick={handleStageReorder}>
                {!isStageReorder ? "Reorder" : "Cancel Reorder"}
                {!isStageReorder ? (
                  <span>
                    <i className="la la-reorder" />
                  </span>
                ) : (
                  <span>
                    <i className="la la-close" />
                  </span>
                )}
              </a>
              {isStageReorder && (
                <a onClick={handleSaveStageReorder}>
                  Save Order
                  <span>
                    <i className="la la-save" />
                  </span>
                </a>
              )}
              <a onClick={() => handleDeployAllStages(true)}>
                Deploy
                <span>
                  <i className="la la-success" />
                </span>
              </a>
            </div>
          </div>
          {loader && <DotLoader />}
          {!loader && (
            <SortableStage
              stage={data}
              handleRequestSubStage={handleRequestSubStage}
              handleClickEdit={handleClickEdit}
              loadSubStage={loadSubStage}
              subStageData={subStageData}
              handleEditGuide={this.handleEditGuide}
              changeDeployStatus={this.changeDeployStatus}
              deleteItem={this.deleteItem}
              editSubStageForm={this.editSubStageForm}
              handleSubStageForm={handleSubStageForm}
              reorder={isStageReorder}
              isStageReorderCancel={isStageReorderCancel}
              handleNewStageOrder={this.handleNewStageOrder}
              reorderSubstage={isSubstageReorder}
              isSubstageReorderCancel={isSubstageReorderCancel}
              handleSubstageReorder={handleSubstageReorder}
              handleSaveSubstageReorder={handleSaveSubstageReorder}
              handleNewSubstageOrder={this.handleNewSubstageOrder}
              handleDeployAll={handleDeployAllSubstages}
              handleDeleteAll={handleDeleteAllSubstages}
            />
          )}
          {this.props.popupModal && (
            <Modal title="Stage Form" toggleModal={this.props.closePopup}>
              <AddStageForm
                regionOptions={regionOptions}
                typeOptions={typeOptions}
                handleSubmit={handleSubmitStageForm}
                stageData={selectedStage}
              />
            </Modal>
          )}
          {showSubstageForm && (
            <Modal title="SubStage Form" toggleModal={handleClosePopup}>
              <GlobalModalForm
                formType="substage"
                regionOptions={regionOptions}
                typeOptions={typeOptions}
                myForms={this.props.myForms}
                projectForms={this.props.projectForms}
                sharedForms={this.props.sharedForms}
                toggleFormModal={this.toggleFormModal}
                handleToggleForm={handleClosePopup}
                formTitle={formTitle}
                handleCreateForm={this.handleCreateForm}
                formData={formData}
                isProjectWide={false}
              />
            </Modal>
          )}
          {showFormModal && (
            <Modal
              title="Add Form"
              toggleModal={this.toggleFormModal}
              showButton={true}
              showText="Create Form"
              url="/forms/create/"
            >
              <AddForm
                activeTab={activeTab}
                toggleTab={this.toggleTab}
                onChangeHandler={this.onChangeHandler}
                formList={myFormList}
                projectList={projectFormList}
                sharedList={sharedFormList}
                handleRadioChange={this.handleMyFormChange}
                handleSaveForm={this.handleSaveForm}
              />
            </Modal>
          )}
          {editGuide && (
            <Modal title="Form Guide" toggleModal={this.handleEditGuide}>
              <EditFormGuide
                data={guideData}
                handleCancel={this.handleEditGuide}
                handleUpdateGuide={this.handleUpdateGuide}
                handleCreateGuide={this.handleCreateGuide}
              />
            </Modal>
          )}
        </div>
      </div>
    );
  }
}
export default StagedForms;
