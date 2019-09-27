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
  <h5>
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
        stage,
        handleRequestSubStage,
        handleClickEdit,
        loadSubStage,
        handleEditGuide,
        changeDeployStatus,
        deleteItem,
        editSubStageForm,
        subStageData,
        handleSubStageForm,
        reorder
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
                  <div className="add-btn pull-left">
                    <a
                      data-tab="addSubStage-popup"
                      onClick={handleSubStageForm}
                    >
                      Add substage
                      <span>
                        <i className="la la-plus"></i>
                      </span>
                    </a>
                  </div>
                  <div className="add-btn pull-left">
                    <a
                      data-tab="addSubStage-popup"
                      onClick={() => handleClickEdit(each)}
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
                      handleEditGuide={handleEditGuide}
                      changeDeployStatus={changeDeployStatus}
                      deleteItem={deleteItem}
                      editSubStageForm={editSubStageForm}
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
