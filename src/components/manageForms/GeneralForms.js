import React, { Component } from "react";
// import PerfectScrollbar from "react-perfect-scrollbar";
// import "react-perfect-scrollbar/dist/css/styles.css";
import axios from "axios";
import withPagination from "../../hoc/WithPagination";

import { DotLoader } from "../myForm/Loader";
import isEmpty from "../../utils/isEmpty";
import Modal from "../common/Modal";
import RightContentCard from "../common/RightContentCard";
import CommonPopupForm from "./CommonPopupForm";
import { errorToast, successToast } from "../../utils/toastHandler";
import EditFormGuide from "./EditFormGuide";
import AddForm from "./AddForm";
import GeneralFormTable from "./GeneralFormTable";

class GeneralForms extends Component {
  _isMounted = false;
  state = {
    id: this.props.match.params ? this.props.match.params.id : "",
    data: [],
    loader: false,
    urlId: this.props.match.params ? this.props.match.params.id : "",
    deployStatus: false,
    editGuide: false,
    guideData: {},
    showFormModal: false,
    activeTab: "myForms",
    searchQry: "",
    commonFormData: {
      status: 3,
      isDonor: false,
      isEdit: false,
      isDelete: false,
      regionSelected: [],
      typeSelected: [],
      xf: ""
    },
    optionType: "",
    optionRegion: "",
    loader: false,
    loaded: 0,
    formId: "",
    formTitle: ""
  };

  requestGeneralForm(id) {
    axios
      .get(`fv3/api/manage-forms/general/?project_id=${id}`)
      .then(res => {
        if (this._isMounted) {
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
          loader: true
        },
        this.requestGeneralForm(id)
      );
    }
  }

  changeDeployStatus = (id, isDeploy) => {
    const { urlId } = this.state;
    axios
      .post(
        `fv3/api/manage-forms/deploy/?project_id=${urlId}&type=general&id=${id}`,
        { is_deployed: !isDeploy }
      )
      .then(res => {
        this.setState(
          state => {
            const newData = this.state.data;
            newData.map(each => {
              const arrItem = { ...each };
              if (each.id == id) {
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
  deleteItem = (id, isDeploy) => {
    const { urlId } = this.state;
    axios
      .post(
        `fv3/api/manage-forms/delete/?project_id=${urlId}&type=general&id=${id}`,
        { is_deployed: isDeploy }
      )
      .then(res => {
        this.setState(
          {
            data: this.state.data.filter(each => each.id != id)
          },
          () => {
            successToast("Form", "deleted");
          }
        );
      })
      .catch(err => {});
  };
  handleEditGuide = data => {
    console.log("clicked");

    this.setState({
      editGuide: !this.state.editGuide,
      guideData: data ? data : {}
    });
  };
  handleUpdateGuide = data => {
    console.log("data chk", data);
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("text", data.text);
    formData.append("is_pdf", Object.keys(data.pdf).length > 0 ? true : false);
    formData.append("pdf", Object.keys(data.pdf).length > 0 ? data.pdf : null);
    formData.append("fsxf", data.fsxf);
    if (data.images.length > 0) {
      data.images.map((each, i) => {
        if (!each.image) formData.append(`new_images_${i + 1}`, each);
      });
    }
    for (var pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }
    // debugger;
    // axios
    //   .post(`forms/api/save_educational_material/`, formData)
    //   .then(res => {
    //     console.log("post res", res);
    //   })
    //   .catch(err => {
    //     errorToast(err);
    //   });
  };

  toggleFormModal = () => {
    this.setState({ showFormModal: !this.state.showFormModal });
  };

  toggleTab = tab => {
    this.setState({
      activeTab: tab
    });
  };
  onChangeHandler = e => {
    // const searchValue = e.target.value;
    // this.props.searchHandler(
    //   searchValue,
    //   `/fv3/api/project-site-list/?page=1&project=${project_id}&q=${searchValue}`,
    //   {
    //     type: "projectSiteList",
    //     projectId: project_id
    //   }
    // );

    this.setState({
      searchQry: e.target.value
    });
  };

  handleCreateGeneralForm = e => {
    e.preventDefault();
    const {
      id,
      commonFormData: {
        status,
        isDonor,
        isEdit,
        isDelete,
        regionSelected,
        typeSelected,
        xf
      }
    } = this.state;
    const payload = {
      xf: xf,
      default_submission_status: status,
      setting: {
        types: typeSelected,
        regions: regionSelected,
        donor_visibility: isDonor,
        can_edit: isEdit,
        can_delete: isDelete
      }
    };
    axios
      .post(`fv3/api/manage-forms/general/?project_id=${id}`, payload)
      .then(res => {
        this.setState(
          {
            data: this.state.data.concat(res.data)
          },
          () => {
            this.props.closePopup;
            successToast("Add ", "successfully");
          }
        );
      })
      .catch(err => {
        errorToast(err);
      });
    // console.log("general create", this.state.commonFormData);
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
        optionRegion
      },
      props: { typeOptions, regionOptions, myForms, projectForms },
      handleRadioChange,
      handleSelectRegionChange,
      handleSelectTypeChange
    } = this;
    // console.log("in drender", this.state.commonFormData);

    return (
      <RightContentCard
        title="General Forms"
        addButton={true}
        toggleModal={this.props.commonPopupHandler}
        showText={true}
      >
        {/* <div className="card-body"> */}
        {loader && <DotLoader />}
        {!loader && (
          <GeneralFormTable
            data={data}
            loader={loader}
            handleEditGuide={this.handleEditGuide}
          />
        )}
        {/* </div> */}
        {this.props.popupModal && (
          <Modal title="Add General Form" toggleModal={this.props.closePopup}>
            {/* <div className="card-body"> */}
            <form
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
              </div>
              <CommonPopupForm
                regionOptions={regionOptions}
                typeOptions={typeOptions}
                handleRadioChange={handleRadioChange}
                handleSelectRegionChange={handleSelectRegionChange}
                handleSelectTypeChange={handleSelectTypeChange}
                commonFormData={commonFormData}
                // optionRegion={optionRegion}
                // optionType={optionType}
              />
              <div className="form-group pull-right no-margin">
                <button type="submit" className="fieldsight-btn">
                  Add Form
                </button>
              </div>
            </form>
            {/* </div> */}
          </Modal>
        )}
        {editGuide && (
          <Modal title="Form Guide" toggleModal={this.handleEditGuide}>
            <EditFormGuide
              data={guideData}
              handleCancel={this.handleEditGuide}
              handleUpdateGuide={this.handleUpdateGuide}
            />
          </Modal>
        )}
        {showFormModal && (
          <Modal
            title="Add Form"
            toggleModal={this.toggleFormModal}
            showButton={true}
            showText="Create Form"
          >
            <AddForm
              activeTab={activeTab}
              toggleTab={this.toggleTab}
              onChangeHandler={this.onChangeHandler}
              formList={myForms}
              projectList={projectForms}
              handleRadioChange={this.handleMyFormChange}
              handleSaveForm={this.handleSaveForm}
            />
          </Modal>
        )}
      </RightContentCard>
    );
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
}
export default withPagination(GeneralForms);
