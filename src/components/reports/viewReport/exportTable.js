import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
import format from 'date-fns/format';
import DeleteModal from '../../common/DeleteModal';

export default class ExportTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deletebtn: false,
      // id: '',
    };
  }

  handleFileName = name => {
    const fileName = name !== null ? name.split('/') : '';
    const newName =
      fileName[6] !== undefined || null || ''
        ? fileName[6] && fileName[6].split('_')
        : '';
    const FileName =
      newName !== undefined || null || '' ? newName[2] : '';
    const newFile =
      FileName !== undefined || null || '' ? FileName.split('?') : '';
    const title =
      newFile !== undefined || null || '' ? newFile[0] : '';

    return name !== null ? title : '';
  };

  openDeleteModal = () => {
    this.setState(prevState => ({
      deletebtn: !prevState.deletebtn,
      // id,
    }));
  };

  CloseDeleteModal = () => {
    this.setState(prevState => ({
      deletebtn: !prevState.deletebtn,
    }));
  };

  ConfirmHandler = () => {
    // console.log(this.state.id, 'id');
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
        {exportData && exportData.length > 0 ? (
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
                          onKeyDown={() => {
                            openDeleteModal();
                          }}
                          tabIndex="0"
                          className="td-delete-btn"
                          onClick={() => {
                            openDeleteModal();
                          }}
                        >
                          <i className="la la-trash-o" />
                        </a>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        ) : (
          <p>No data</p>
        )}
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
