import React, { Component } from 'react';
import axios from 'axios';
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
import FormShare from './FormShare';
import { DotLoader } from './Loader';
import Modal from '../common/Modal';
import DeleteModal from '../common/DeleteModal';
import ReplaceModal from './ReplaceModal';
/* eslint-disable react/no-unused-state */

const url = 'fv3/api/myforms/';
const deleteUrl = '/fv3/api/form/delete/';

class MyformTable extends Component {
  _isMounted = false;

  constructor(params) {
    super(params);
    this.state = {
      project_list: [],
      list: [],
      shareOption: false,
      dLoader: true,
      tblDiv: false,
      showDeleteConfirmation: false,
      delete_id: null,
      showReplace: false,
      assetUid: '',
      modalDatas: '',
    };
  }

  componentDidMount() {
    this._isMounted = true;
    axios
      .get(`${url}`)

      .then(res => {
        if (this._isMounted) {
          if (res.status === 200) {
            const modifiedList = res.data.map(user => ({
              ...user,
              share: false,
            }));

            this.setState({
              list: modifiedList,
              dLoader: false,
            });
          }
        }
      })
      .catch(() => {
        this.setState({
          dLoader: false,
        });
      });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  deleteHandler = (e, ids) => {
    this.setState({
      delete_id: ids,
      showDeleteConfirmation: true,
    });
  };

  cancelHandler = () => {
    this.setState({
      showDeleteConfirmation: false,
    });
  };

  shareToggle = (e, id) => {
    const { list } = this.state;
    const formList = list.map(user =>
      user.id_string === id
        ? { ...user, share: !user.share }
        : { ...user, share: false },
    );
    this.setState({
      list: formList,
    });
  };

  replaceOptionToggle = (id, toUrl) => {
    this.setState(state => {
      if (id && toUrl) {
        return {
          showReplace: !state.showReplace,
          assetUid: id,
          modalDatas: toUrl,
        };
      }
      return {
        showReplace: !state.showReplace,
      };
    });
  };

  confirmHandler = () => {
    const id = this.state.delete_id;
    axios
      .post(`${deleteUrl}`, { id_string: id })

      .then(() => {
        const newUserList = [...this.state.list];
        const deletedForm = newUserList.filter(
          user => user.id_string !== id,
        );
        this.setState({
          list: deletedForm,
          showDeleteConfirmation: false,
        });
      })
      .catch(() => {
        // this.setState({
        //   dLoader: false
        // });
      });
  };

  render() {
    const { OpenTabHandler, commonPopupHandler } = this.props;
    const { showReplace, assetUid, modalDatas } = this.state;

    return (
      <>
        <div className="myform-table">
          {/*  <div className="add-btn">
          <a href="#/" onClick={this.props.myFormPopup}>
          Add new
           <span>
           <i className="la la-plus"/>
           </span>
           </a>
           </div> */}
          <div
            className="table-wrapper"
            style={{ position: 'relative', height: '500px' }}
          >
            <PerfectScrollbar>
              <table
                id="myform_table"
                className="table-bordered table myform_table dataTable"
              >
                <thead>
                  <tr>
                    <th>Form Name</th>
                    <th>Create Date</th>
                    <th>Updated date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.list.map((item, i) => (
                    <FormShare
                      key={item.id_string}
                      item={item}
                      OpenTabHandler={OpenTabHandler}
                      commonPopupHandler={commonPopupHandler}
                      deleteHandler={this.deleteHandler}
                      shareToggle={this.shareToggle}
                      replaceToggleModal={this.replaceOptionToggle}
                    />
                  ))}
                </tbody>
              </table>

              {this.state.dLoader && <DotLoader />}
            </PerfectScrollbar>
          </div>
        </div>
        {showReplace && (
          <Modal toggleModal={this.replaceOptionToggle}>
            <ReplaceModal
              toggleModal={this.replaceOptionToggle}
              assetUid={assetUid}
              modalDatas={modalDatas}
            />
          </Modal>
        )}
        {this.state.showDeleteConfirmation && (
          <DeleteModal
            onConfirm={this.confirmHandler}
            onCancel={this.cancelHandler}
            onToggle={this.cancelHandler}
            message="Any submissions submitted in the form will be deleted and will be lost from project and sites associated. Are you sure you want to delete the form?"
          />
        )}
      </>
    );
  }
}

export default MyformTable;
