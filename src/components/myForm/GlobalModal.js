import React, { Component } from "react";
import axios from "axios";
import "react-perfect-scrollbar/dist/css/styles.css";

class GlobalModal extends Component {
  state = {
    globalUrl: " ",
    disable: true
  };

  globalshare = e => {
    const id = this.props.modalDatas;
    const url = this.props.shareUrls;
  };

  onSubmit = e => {
    const id = this.props.modalDatas;
    const url = this.props.shareUrls;

    axios
      .post(url, { id_string: id })
      .then(res => {
        if (res.status === 201) {
          this.setState({
            globalUrl: res.data.share_link,
            disable: false
          });
        }
      })
      .catch(err => console.log("err", err));
  };

  copyHandler = () => {
    this.input.select();
    document.execCommand("copy");
  };

  render() {
    return (
      <div className="thumb-list globallist">
        <form onSubmit={this.onSubmit}>
          <div className="input-group copyurl">
            <input
              type="text"
              className="form-control"
              ref={el => (this.input = el)}
              placeholder="url"
              value={this.state.globalUrl}
              onChange={() => {}}
            />

            <div className="input-group-append">
              <button
                onClick={this.copyHandler}
                className="input-group-text"
                id="url"
                title="copy"
                disabled={this.state.disable}
              >
                copy
              </button>
            </div>
          </div>
          <button type="submit" className="fieldsight-btn mrt-30 pull-right">
            Share
          </button>
        </form>
      </div>
    );
  }
}

export default GlobalModal;
