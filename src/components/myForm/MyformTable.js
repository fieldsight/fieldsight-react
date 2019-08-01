import React, { Component } from "react";
import axios from "axios";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import FormShare from "./formShare";
import { DotLoader } from "./Loader";
import Modal from "../common/Modal";

const url = "fv3/api/myforms/";
const deleteUrl = "/fv3/api/form/delete/";

class MyformTable extends Component {
  _isMounted = false;
  state = {
    project_list: [],
    list: [],
    shareOption: false,
    dLoader: true,
    tblDiv: false,
    showDeleteConfirmation: false,
    delete_id: null
  };

  componentDidMount() {
    this._isMounted = true;
    axios
      .get(`${url}`)

      .then(res => {
        if (this._isMounted) {
          if (res.status === 200) {
            const modifiedList = res.data.map(user => ({
              ...user,
              share: false
            }));

            this.setState({
              list: modifiedList,
              dLoader: false
            });
          }
        }
      })
      .catch(err => {
        this.setState({
          dLoader: false
        });
      });
  }

  deleteHandler = (e, ids) => {
    this.setState({
      delete_id: ids,
      showDeleteConfirmation: true
    });
  };

  cancelHandler = () => {
    this.setState({
      showDeleteConfirmation: false
    });
  };

  shareToggle = (e, id) => {
    const formList = this.state.list.map(user =>
      user.id_string === id
        ? { ...user, share: !user.share }
        : { ...user, share: false }
    );
    this.setState({
      list: formList
    });
  };

  confirmHandler = () => {
    const id = this.state.delete_id;
    axios
      .post(`${deleteUrl}`, { id_string: id })

      .then(res => {
        const newUserList = [...this.state.list];
        const deletedForm = newUserList.filter(user => user.id_string != id);
        this.setState({
          list: deletedForm,
          showDeleteConfirmation: false
        });
      })
      .catch(err => {
        // this.setState({
        //   dLoader: false
        // });
      });
  };

  render() {
    return (
      <React.Fragment>
        <div className="myform-table">
          {/*  <div className="add-btn"><a href="#/" onClick={this.props.myFormPopup}>Add new <span><i className="la la-plus"></i></span></a></div> */}
          <div
            className="table-wrapper"
            style={{ position: "relative", height: "500px" }}
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
                      key={i + 1}
                      item={item}
                      OpenTabHandler={this.props.OpenTabHandler}
                      commonPopupHandler={this.props.commonPopupHandler}
                      deleteHandler={this.deleteHandler}
                      shareToggle={this.shareToggle}
                    />
                  ))}
                </tbody>
              </table>

              {this.state.dLoader && <DotLoader />}
            </PerfectScrollbar>
          </div>
        </div>
        {this.state.showDeleteConfirmation && (
          <Modal title="Warning" toggleModal={this.cancelHandler}>
            <div className="warning">
              <i className="la la-exclamation-triangle" />

              <p>Any submissions submitted in the form will be deleted and will be lost from project and sites associated. Are you sure you want to delete the form?</p>
            </div>
            <div className="warning-footer text-center">
              <a
                className="fieldsight-btn rejected-btn"
                onClick={this.cancelHandler}
              >
                cancel
              </a>
              <a className="fieldsight-btn" onClick={this.confirmHandler}>
                confirm
              </a>
            </div>
          </Modal>
        )}
      </React.Fragment>
    );
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
}

export default MyformTable;
