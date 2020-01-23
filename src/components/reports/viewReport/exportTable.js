import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
import format from 'date-fns/format';
import DeleteModal from '../../common/DeleteModal';

export default class ExportTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deletebtn: false,
      id: '',
    };
  }

  handleFileName = name => {
    const fileName = name !== null ? name.split('/') : '';
    const newName =
      fileName[5] !== undefined || null || ''
        ? fileName[5] && fileName[5].split('_')
        : '';
    const newFileName =
      newName !== undefined || null || '' ? newName[2] : '';

    return name !== null ? newFileName : '';
  };

  openDeleteModal = id => {
    this.setState(prevState => ({
      deletebtn: !prevState.deletebtn,
      id,
    }));
  };

  CloseDeleteModal = () => {
    this.setState(prevState => ({
      deletebtn: !prevState.deletebtn,
    }));
  };

  ConfirmHandler = () => {
    console.log(this.state.id, 'id');
  };

  render() {
    const {
      props: { exportData },
      state: { deletebtn },
      CloseDeleteModal,
      openDeleteModal,
      ConfirmHandler,
    } = this;
    return (
      <>
        <Table
          responsive="xl"
          className="table  table-bordered  dataTable "
        >
          <thead>
            <tr>
              <th>File Name</th>
              <th>Created By</th>
              <th>Status</th>
              <th>Created Date</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {exportData.length > 0 &&
              exportData.map(expo => {
                const name = this.handleFileName(expo.file);
                return (
                  <tr key={expo.id}>
                    {expo.get_status_display !== 'Failed' && (
                      <>
                        <td>{name}</td>
                        <td>{expo.source_name}</td>

                        <td>{expo.get_status_display}</td>

                        <td>
                          {format(expo.date_added, ['YYYY-MM-DD'])}
                        </td>
                        <td>
                          <a href={expo.file}>
                            <i className="la la-download " />
                          </a>
                          <a
                            role="button"
                            onKeyDown={openDeleteModal}
                            tabIndex="0"
                            className="td-delete-btn"
                            onClick={() => {
                              openDeleteModal(expo.id);
                            }}
                          >
                            <i className="la la-trash-o" />
                          </a>
                        </td>
                      </>
                    )}
                  </tr>
                );
              })}
          </tbody>
        </Table>
        {deletebtn && (
          <DeleteModal
            onCancel={CloseDeleteModal}
            onConfirm={ConfirmHandler}
            onToggle={CloseDeleteModal}
            message="Are you sure u want to delete ?"
            title="Export table"
          />
        )}
      </>
    );
  }
}
