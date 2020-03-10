import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
import format from 'date-fns/format';
import TableAction from './common/TableAction';
import GetStatus, { getClass } from './common/GetStatus';
import EducationMaterial from './common/EducationMaterial';
/* eslint-disable  consistent-return */
/* eslint-disable   react/destructuring-assignment */

class GeneralFormTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmDelete: false,
      formId: '',
      isDeploy: false,
    };
  }

  handleToggle = (formId, isDeploy) => {
    this.setState(preState => ({
      confirmDelete: !preState.confirmDelete,
      formId,
      isDeploy,
    }));
  };

  handleConfirm = () => {
    const { deleteItem } = this.props;
    this.setState(
      {
        confirmDelete: false,
      },
      () => {
        deleteItem(this.state.formId, this.state.isDeploy);
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
        handleEditGuide,
        changeDeployStatus,
        handleEditForm,
        formTable,
      },
    } = this;
    const hasOrgForm = data.some(e => e.from_organization);

    return (
      <>
        {!loader && data.length === 0 ? (
          <div>No Form added yet.</div>
        ) : (
          <>
            <Table
              responsive="xl"
              className="table  table-bordered  dataTable "
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
                  data.map(item => (
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
                        <EducationMaterial
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
export default GeneralFormTable;
