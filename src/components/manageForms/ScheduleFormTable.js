import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
import format from 'date-fns/format';
import TableAction from './common/tableAction';
import GetStatus, { getClass } from './common/getStatus';

/* eslint-disable react/destructuring-assignment */

const EducationMaterialForProject = props => {
  const { formTable, item, editForm } = props;
  if (formTable === 'project') {
    return (
      <span>
        <a
          onClick={() => editForm(item.em, item.id, item.fsxf)}
          tabIndex="0"
          role="button"
          onKeyDown={() => editForm(item.em, item.id, item.fsxf)}
        >
          <i className="la la-book" />
          {item.em ? item.em.title : ''}
        </a>
      </span>
    );
  }
  if (formTable === 'site') {
    return (
      <span>
        {item.site && (
          <a
            onClick={() => editForm(item.em, item.id, item.fsxf)}
            tabIndex="0"
            role="button"
            onKeyDown={() => editForm(item.em, item.id, item.fsxf)}
          >
            <i className="la la-book" />
            {item.em ? item.em.title : ''}
          </a>
        )}
      </span>
    );
  }
  return null;
};

class ScheduleFormTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmDelete: false,
      formId: '',
      isDeploy: false,
    };
  }

  handleToggle = (formId, isDeploy) => {
    this.setState(state => ({
      confirmDelete: !state.confirmDelete,
      formId,
      isDeploy,
    }));
  };

  handleConfirm = () => {
    const { formId, isDeploy } = this.state;
    this.setState(
      {
        confirmDelete: false,
      },
      () => {
        this.props.deleteItem(formId, isDeploy);
      },
    );
  };

  handleCancel = () => {
    this.setState({ confirmDelete: false });
  };

  render() {
    const {
      props: {
        data,
        loader,
        changeDeployStatus,
        handleEditForm,
        handleEditGuide,
        formTable,
      },
    } = this;
    const hasOrgForm = data.some(e => e.from_organization);

    return (
      <>
        {!loader && data.length === 0 ? (
          'No Form added yet.'
        ) : (
          <>
            <Table
              responsive="xl"
              className="table  table-bordered  dataTable"
            >
              <thead>
                <tr>
                  <th>Form Title</th>
                  <th>Responses</th>
                  <th>Form Guide</th>
                  <th>Assigned Date</th>
                  <th>Default status</th>
                  <th width="15%">Action</th>
                </tr>
              </thead>
              <tbody>
                {!loader &&
                  data.map((item, i) => (
                    <tr key={item.id}>
                      <td>
                        {item.xf
                          ? item.from_organization
                            ? `*${item.xf.title}`
                            : item.xf.title
                          : ''}
                      </td>
                      <td>{item.responses_count}</td>
                      <td>
                        <EducationMaterialForProject
                          formTable={formTable}
                          item={item}
                          editForm={handleEditGuide}
                        />
                      </td>
                      <td>
                        <time>
                          <i className="la la-clock-o" />
                          {format(item.date_created, 'YYYY-MM-DD')}
                        </time>
                      </td>
                      <td>
                        <span
                          className={getClass(
                            item.default_submission_status,
                          )}
                        >
                          {GetStatus(item.default_submission_status)}
                        </span>
                      </td>
                      <td>
                        <TableAction
                          formTable={formTable}
                          item={item}
                          deployAction={changeDeployStatus}
                          isDelete={this.state.confirmDelete}
                          handleConfirm={this.handleConfirm}
                          handleToggle={this.handleToggle}
                          handleCancel={this.handleCancel}
                          editAction={handleEditForm}
                        />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
            {hasOrgForm && (
              <div className="form-group pull-right no-margin">
                * denotes organization form
              </div>
            )}
          </>
        )}
      </>
    );
  }
}

export default ScheduleFormTable;
