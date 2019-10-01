import React, { Component } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";

import { DotLoader } from "../myForm/Loader";
import Modal from "../common/Modal";
import RightContentCard from "../common/RightContentCard";
import GlobalModalForm from "./GlobalModalForm";
import { errorToast, successToast } from "../../utils/toastHandler";
import ScheduleFormTable from "./ScheduleFormTable";
import EditFormGuide from "./EditFormGuide";
import AddForm from "./AddForm";
import RadioElement from "../common/RadioElement";

class ScheduleForms extends Component {
  _isMounted = false;
  state = {
    id: this.props.match.params ? this.props.match.params.id : "",
    data: [],
    loader: false,
    optionType: "",
    optionRegion: "",
    loader: false,
    isProjectForm: false,
    editGuide: false,
    editFormId: "",
    showFormModal: false,
    activeTab: "myForms",
    commonFormData: {
      status: 0,
      isDonor: true,
      isEdit: true,
      isDelete: true,
      regionSelected: [],
      typeSelected: [],
      xf: ""
    },
    formId: "",
    formTitle: "",
    isProjectForm: "",
    myFormList: [],
    projectFormList: [],
    sharedFormList: [],
    scheduleType: "",
    startDate: new Date(),
    endDate: new Date()
  };

  requestScheduleForm(id) {
    axios
      .get(`fv3/api/manage-forms/schedule/?project_id=${id}`)
      .then(res => {
        if (this._isMounted) {
          console.log("res", res.data);

          this.setState({ data: res.data, loader: false });
        }
      })
      .catch(err => {});
  }

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
        this.requestScheduleForm(id)
      );
    }
  }

  changeDeployStatus = (formId, isDeploy) => {
    const { id } = this.state;
    axios
      .post(
        `fv3/api/manage-forms/deploy/?project_id=${id}&type=schedule&id=${formId}`,
        { is_deployed: !isDeploy }
      )
      .then(res => {
        this.setState(
          state => {
            const newData = this.state.data;
            newData.map(each => {
              const arrItem = { ...each };

              if (each.id == formId) {
                each.is_deployed = !isDeploy;
              }
              return arrItem;
            });
            return { data: newData };
          },
          () => {
            successToast("Form", "updated");
          }
        );
      })
      .catch(err => {});
  };
  deleteItem = (formId, isDeploy) => {
    const { id } = this.state;
    axios
      .post(
        `fv3/api/manage-forms/delete/?project_id=${id}&type=schedule&id=${formId}`,
        { is_deployed: isDeploy }
      )
      .then(res => {
        this.setState(
          {
            data: this.state.data.filter(each => each.id != formId)
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
    const { id } = this.state;
    const formData = new FormData();
    if (data.title) formData.append("title", data.title);
    if (data.text) formData.append("text", data.text);
    if (data.pdf) {
      formData.append("is_pdf", data.pdf ? true : false);
      formData.append("pdf", data.pdf);
    }
    if (data.fsxf) formData.append("fsxf", data.fsxf);
    if (data.images && data.images.length > 0) {
      data.images.map((each, i) => {
        if (!each.image) formData.append(`new_images_${i + 1}`, each);
      });
    }
    if (data.id) {
      formData.append("id", data.id);
    }
    axios
      .post(`forms/api/save_educational_material/`, formData)
      .then(res => {
        this.setState(
          {
            editGuide: false
          },
          () => {
            this.requestGeneralForm(id);
            successToast("update", "successfully");
          }
        );
      })
      .catch(err => {
        errorToast(err);
      });
  };

  handleRadioChange = e => {
    const { name, value } = e.target;

    this.setState(state => {
      if (name == "status") {
        return {
          commonFormData: {
            ...this.state.commonFormData,
            status: value
          }
        };
      } else if (name == "donor") {
        return {
          commonFormData: {
            ...this.state.commonFormData,
            isDonor: JSON.parse(value)
          }
        };
      } else if (name == "edit") {
        return {
          commonFormData: {
            ...this.state.commonFormData,
            isEdit: JSON.parse(value)
          }
        };
      } else if (name == "delete") {
        return {
          commonFormData: {
            ...this.state.commonFormData,
            isDelete: JSON.parse(value)
          }
        };
      } else if (name == "scheduleType") {
        return {
          scheduleType: value
        };
      }
    });
  };
  handleSelectRegionChange = e => {
    e.map(region => {
      this.setState(state => {
        return {
          commonFormData: {
            ...this.state.commonFormData,
            regionSelected: [
              ...this.state.commonFormData.regionSelected,
              region.id
            ]
          }
        };
      });
    });
  };
  handleSelectTypeChange = e => {
    e.map(type => {
      this.setState(state => {
        return {
          commonFormData: {
            ...this.state.commonFormData,
            typeSelected: [...this.state.commonFormData.typeSelected, type.id]
          }
        };
      });
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
      commonFormData: {
        ...this.state.commonFormData,
        xf: this.state.formId
      },
      showFormModal: !this.state.showFormModal
    });
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
  handleStartDate = date => {
    const { endDate } = this.state;
    // this.setState(state => {
    //   if(date > endDate) {
    //     return{
    //       startDate: endDate
    //     }
    //   } else{

    //   }
    // })
  };
  handleEndDate = date => {
    const { startDate } = this.state;
  };
  render() {
    const {
      state: {
        loader,
        data,
        editGuide,
        guideData,
        showFormModal,
        activeTab,
        commonFormData,
        formTitle,
        optionRegion,
        myFormList,
        projectFormList,
        sharedFormList
      },
      props: { typeOptions, regionOptions },
      handleRadioChange,
      handleSelectRegionChange,
      handleSelectTypeChange
    } = this;
    // console.log("props", this.props);

    return (
      <div className="col-xl-9 col-lg-8">
        <RightContentCard
          title="Schedule Forms"
          addButton={true}
          toggleModal={this.props.commonPopupHandler}
          showText={true}
        >
          {loader && <DotLoader />}
          {!loader && (
            <ScheduleFormTable
              data={data}
              loader={loader}
              changeDeployStatus={this.changeDeployStatus}
              deleteItem={this.deleteItem}
              handleEditGuide={this.handleEditGuide}
            />
          )}

          {this.props.popupModal && (
            <Modal
              title="Add Schedule Form"
              toggleModal={this.props.closePopup}
            >
              {/* <form
                className="floating-form"
                onSubmit={this.handleCreateGeneralForm}
              >
                <div className="form-form">
                  <div className="selected-form">
                    <div className="add-btn flex-start">
                      <a data-tab="choose-form" onClick={this.toggleFormModal}>
                        {formTitle ? "Change form" : " Choose form"}
                        <span>
                          <i className="la la-plus"></i>
                        </span>
                      </a>
                    </div>
                    <div className="selected-text">
                      <span>{formTitle}</span>
                    </div>
                  </div>
                </div> */}
              {/* <div className="form-group checkbox-group">
                  <label>Type of schedule</label>
                  <div className="custom-checkbox display-inline">
                    <RadioElement
                      label="Daily"
                      name="scheduleType"
                      value={"daily"}
                      changeHandler={handleRadioChange}
                    />
                    <RadioElement
                      label="Weekly"
                      name="scheduleType"
                      value={weekly}
                      changeHandler={handleRadioChange}
                    />
                    <RadioElement
                      label="Monthly"
                      name="scheduleType"
                      value={"monthly"}
                      changeHandler={handleRadioChange}
                    />
                  </div>
                </div> */}
              {/* <div className="row">
                  <div className="col-xl-6">
                    <div className="form-group">
                      <DatePicker /> */}
              {/* <input type="text" className="form-control"
                          required />
                      <label for="input">Start Date</label> */}
              {/* </div>
                  </div>
                  <div className="col-xl-6">
                    <div className="form-group"> */}
              {/* <input type="text" className="form-control"
                          required />
                      <label for="input">End Date</label> */}
              {/* </div>
                  </div>
                </div> */}
              <GlobalModalForm
                regionOptions={regionOptions}
                typeOptions={typeOptions}
                myForms={this.props.myForms}
                projectForms={this.props.projectForms}
                sharedForms={this.props.sharedForms}
                // handleRadioChange={handleRadioChange}
                // handleSelectRegionChange={handleSelectRegionChange}
                // handleSelectTypeChange={handleSelectTypeChange}
                // commonFormData={commonFormData}
                // optionRegion={optionRegion}
                // optionType={optionType}
              />
              {/* <div className="form-group pull-right no-margin">
                  <button type="submit" className="fieldsight-btn">
                    Add Form
                  </button>
                </div>
              </form> */}
              {/* </div> */}
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
          {/* {showFormModal && (
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
          )} */}
        </RightContentCard>
      </div>
    );
  }
}
export default ScheduleForms;
