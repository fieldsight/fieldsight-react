import React, { Component } from "react";
import {
  sortableContainer,
  sortableElement,
  sortableHandle
} from "react-sortable-hoc";
import arrayMove from "array-move";
import { Accordion, Card } from "react-bootstrap";

import SubStageTable from "./subStageTable";
import { DotLoader } from "../myForm/Loader";

const DragHandle = sortableHandle(() => (
  <span style={{ cursor: "pointer" }}>#</span>
));

const SortableItem = sortableElement(({ name }) => (
  <h5 className="dragable-stage">
    <DragHandle />
    {name}
  </h5>
));

const SortableContainer = sortableContainer(({ children }) => {
  return (
    <Accordion defaultActiveKey={0} className="card no-boxshadow">
      {children}
    </Accordion>
  );
});

class SortableStage extends Component {
  state = {
    data: this.props.stage
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.stage != this.props.stage) {
      this.setState({
        data: nextProps.stage
      });
    }
    if (nextProps.isStageReorderCancel != this.props.isStageReorderCancel) {
      this.setState(state => {
        if (nextProps.isStageReorderCancel) {
          return { data: this.props.stage };
        }
      });
    }
  }
  onSortEnd = ({ oldIndex, newIndex }) => {
    this.setState(
      ({ data }) => ({
        data: arrayMove(data, oldIndex, newIndex)
      }),
      () => {
        this.props.handleNewStageOrder(this.state.data);
      }
    );
  };

  render() {
    const {
      state: { data },
      props: {
        handleRequestSubStage,
        handleClickEdit,
        loadSubStage,
        handleEditGuide,
        changeDeployStatus,
        deleteItem,
        editSubStageForm,
        subStageData,
        handleSubStageForm,
        reorder,
        reorderSubstage,
        handleSubstageReorder,
        handleSaveSubstageReorder,
        handleDeployAll,
        handleDeleteAll
      }
    } = this;
    // console.log("subStageData---", subStageData);
    let toDeploy = "";
    let toDelete = "";
    const arrDeploy = subStageData.map(sub => {
      if (sub.is_deployed) {
        return false;
      } else {
        return true;
      }
    });
    const arrDelete = subStageData.map(sub => {
      if (sub.is_deployed) {
        return true;
      } else {
        return false;
      }
    });

    toDeploy =
      arrDeploy.length > 0 ? (arrDeploy.indexOf(true) > -1 ? true : false) : "";
    toDelete =
      arrDelete.length > 0
        ? arrDelete.indexOf(false) > -1
          ? false
          : true
        : "";

    return (
      <SortableContainer onSortEnd={this.onSortEnd} useDragHandle>
        {data.length > 0 &&
          data.map((each, index) => (
            <Card key={`key_${index}`}>
              <Card.Header>
                <Accordion.Toggle
                  as={Card.Header}
                  eventKey={`${each.order}`}
                  className="card-header"
                  onClick={() => {
                    handleRequestSubStage(each.id, each.order);
                  }}
                >
                  {reorder && (
                    <SortableItem
                      key={`item-${each.id}`}
                      index={index}
                      name={each.name}
                    />
                  )}
                  {!reorder && <h5>{each.name}</h5>}
                </Accordion.Toggle>
                <div className="add-btn pull-right">
                  <a
                    data-tab="addSubStage-popup"
                    onClick={() => handleClickEdit(each)}
                  >
                    <i className="la la-edit"></i>
                  </a>
                </div>
              </Card.Header>

              <Accordion.Collapse eventKey={`${each.order}`}>
                <Card.Body>
                  <div className="add-btn pull-right">
                    <a
                      data-tab="addSubStage-popup"
                      onClick={handleSubStageForm}
                    >
                      Add substage
                      <span>
                        <i className="la la-plus"></i>
                      </span>
                    </a>

                    {subStageData && subStageData.length > 1 && (
                      <a
                        data-tab="addSubStage-popup"
                        onClick={handleSubstageReorder}
                      >
                        {!reorderSubstage ? "Reorder" : "Cancel Reorder"}
                        {!reorderSubstage ? (
                          <span>
                            <i className="la la-reorder" />
                          </span>
                        ) : (
                          <span>
                            <i className="la la-close" />
                          </span>
                        )}
                      </a>
                    )}
                    {reorderSubstage && (
                      <a
                        data-tab="addSubStage-popup"
                        onClick={handleSaveSubstageReorder}
                      >
                        Save Order
                        <span>
                          <i className="la la-save" />
                        </span>
                      </a>
                    )}
                    {subStageData && subStageData.length > 0 && toDeploy && (
                      <a
                        data-tab="addSubStage-popup"
                        onClick={() => handleDeployAll(true)}
                      >
                        Deploy Substages
                        <span>
                          <i className="badge badge-success" />
                        </span>
                      </a>
                    )}
                    {subStageData && subStageData.length > 0 && toDelete && (
                      <a
                        data-tab="addSubStage-popup"
                        onClick={() => handleDeleteAll(true)}
                      >
                        Delete Substages
                        <span>
                          <i className="badge badge-danger" />
                        </span>
                      </a>
                    )}
                    {subStageData && subStageData.length > 0 && !toDeploy && (
                      <a
                        data-tab="addSubStage-popup"
                        onClick={() => handleDeployAll(false)}
                      >
                        Undeploy Substages
                        <span>
                          <i className="badge badge-danger" />
                        </span>
                      </a>
                    )}
                  </div>
                  {!!loadSubStage && <DotLoader />}
                  {!loadSubStage && !!subStageData && (
                    <SubStageTable
                      data={subStageData}
                      handleEditGuide={handleEditGuide}
                      changeDeployStatus={changeDeployStatus}
                      deleteItem={deleteItem}
                      editSubStageForm={editSubStageForm}
                      reorderSubstage={this.props.reorderSubstage}
                      isSubstageReorderCancel={
                        this.props.isSubstageReorderCancel
                      }
                      handleNewSubstageOrder={this.props.handleNewSubstageOrder}
                    />
                  )}
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          ))}
      </SortableContainer>
    );
  }
}
export default SortableStage;
