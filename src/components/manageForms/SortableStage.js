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
        handleSaveSubstageReorder
      }
    } = this;

    return (
      <SortableContainer onSortEnd={this.onSortEnd} useDragHandle>
        {data.length > 0 &&
          data.map((each, index) => (
            <Card key={`key_${index}`}>
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
                    <a
                      data-tab="addSubStage-popup"
                      onClick={() => handleClickEdit(each)}
                    >
                      Edit
                      <span>
                        <i className="la la-edit"></i>
                      </span>
                    </a>
                    <a onClick={handleSubstageReorder}>
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
                    {reorderSubstage && (
                      <a onClick={handleSaveSubstageReorder}>
                        Save Order
                        <span>
                          <i className="la la-save" />
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
            // <SortableCard
            //   key={`key_${index}`}
            //   index={index}
            //   each={each}
            //   handleRequestSubStage={handleRequestSubStage}
            // />
          ))}
      </SortableContainer>
    );
  }
}
export default SortableStage;
