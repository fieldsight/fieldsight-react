import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
import { FormattedMessage } from 'react-intl';
import format from 'date-fns/format';
import TableAction from './common/tableAction';
import GetStatus, { getClass } from './common/getStatus';
import EducationMaterial from './common/educationMaterial';
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
          <div>
            <FormattedMessage
              id="app.noFormAddedYet."
              defaultMessage="No Form added yet."
            />
          </div>
        ) : (
          <>
            <Table
              responsive="xl"
              className="table  table-bordered  dataTable "
            >
              <thead>
                <tr>
                  <th>
                    <FormattedMessage
                      id="app.form-title"
                      defaultMessage="Form Title"
                    />
                  </th>
                  <th>
                    <FormattedMessage
                      id="app.response"
                      defaultMessage="Responses"
                    />
                  </th>
                  <th>
                    <FormattedMessage
                      id="app.formGuide"
                      defaultMessage="Form Guide"
                    />
                  </th>
                  <th>
                    <FormattedMessage
                      id="app.assigned-date"
                      defaultMessage="Assigned Date"
                    />
                  </th>
                  <th>
                    <FormattedMessage
                      id="app.defaultStatus"
                      defaultMessage="Default status"
                    />
                  </th>
                  <th width="15%">
                    <FormattedMessage
                      id="app.action"
                      defaultMessage="Action"
                    />
                  </th>
                </tr>
              </thead>

              <tbody>
                {/* {!loader && data.length === 0 && (
            <tr>
              <td colSpan={6}>
                <p>No Form Data Available</p>
              </td>
            </tr>
          )} */}
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
