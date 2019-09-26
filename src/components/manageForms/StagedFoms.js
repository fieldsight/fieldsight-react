import React, { Component } from "react";
import axios from "axios";
import { Accordion, Card } from "react-bootstrap";

import { DotLoader } from "../myForm/Loader";
import Modal from "../common/Modal";
import RightContentCard from "../common/RightContentCard";
import CommonPopupForm from "./CommonPopupForm";
import { errorToast, successToast } from "../../utils/toastHandler";
import EditFormGuide from "./EditFormGuide";
import SubStageTable from "./subStageTable";
import AddStageForm from "./AddStageForm";

class StagedForms extends Component {
  _isMounted = false;
  state = {
    id: this.props.match.params ? this.props.match.params.id : "",
    data: [],
    loader: false,
    deployStatus: false,
    editGuide: false,
    guideData: {},
    editFormId: "",
    showFormModal: false,
    activeTab: "myForms",
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
    formTitle: "",
    isProjectForm: "",
    myFormList: [],
    projectFormList: [],
    sharedFormList: [],
    subStageData: [],
    loadSubStage: false,
    isStagePop: false,
    selectedStage: {}
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

  handleRequestSubStage = stageId => {
    this.setState(
      {
        loadSubStage: true
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
  changeDeployStatus = (formId, isDeploy) => {
    const { id } = this.state;
    axios
      .post(
        `fv3/api/manage-forms/deploy/?project_id=${id}&type=general&id=${formId}`,
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
        `fv3/api/manage-forms/delete/?project_id=${id}&type=general&id=${formId}`,
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
  handleStageForm = () => {
    this.setState({
      isStagePop: !this.state.isStagePop
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
              successToast("Updated", "successfully");
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
        .post(`fv3/api/manage-forms/stages/?project_id=130`, body)
        .then(res => {
          this.setState(
            {
              data: [...this.state.data, res.data]
            },
            () => {
              this.props.closePopup();
              successToast("Created", "successfully");
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
  render() {
    const {
      props: { regionOptions, typeOptions },
      state: {
        data,
        loader,
        subStageData,
        loadSubStage,
        isStagePop,
        selectedStage
      },
      handleRequestSubStage,
      handleSubmitStageForm,
      handleClickEdit
    } = this;
    return (
      <div className="col-xl-9 col-lg-8">
        <RightContentCard
          title="Staged Forms"
          addButton={true}
          toggleModal={this.props.commonPopupHandler}
          showText={true}
        >
          {loader && <DotLoader />}
          {!loader && (
            <Accordion defaultActiveKey={0} className="card no-boxshadow">
              {data.length > 0 &&
                data.map((each, index) => (
                  <Card key={`key_${index}`}>
                    <Accordion.Toggle
                      as={Card.Header}
                      eventKey={`${each.order}`}
                      className="card-header"
                      onClick={() => {
                        handleRequestSubStage(each.id);
                      }}
                    >
                      <h5>
                        #{index + 1} {each.name}
                      </h5>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey={`${each.order}`}>
                      <Card.Body>
                        <div className="add-btn pull-left">
                          <a href="#" data-tab="addSubStage-popup">
                            Add substage
                            <span>
                              <i className="la la-plus"></i>
                            </span>
                          </a>
                        </div>
                        <div className="add-btn pull-left">
                          <a
                            data-tab="addSubStage-popup"
                            onClick={() => this.handleClickEdit(each)}
                          >
                            Edit
                            <span>
                              <i className="la la-edit"></i>
                            </span>
                          </a>
                        </div>
                        {!!loadSubStage && <DotLoader />}
                        {!loadSubStage && !!subStageData && (
                          <SubStageTable
                            data={subStageData}
                            handleEditGuide={this.handleEditGuide}
                            changeDeployStatus={this.changeDeployStatus}
                            deleteItem={this.deleteItem}
                          />
                        )}
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                ))}
            </Accordion>
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
        </RightContentCard>
      </div>
    );
  }
}
export default StagedForms;
