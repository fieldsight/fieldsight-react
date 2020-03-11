import React, { Component } from 'react';
import axios from 'axios';
import Dropzone from 'react-dropzone';
import { errorToast } from '../../utils/toastHandler';
import 'react-perfect-scrollbar/dist/css/styles.css';

const tokenVal = window.token
  ? window.token
  : '91a844e62e86b6e336b8fb440340cbeaabf601fe';

const kpiUrl = window.kpi_base_url
  ? window.kpi_base_url
  : 'https://kpi.naxa.com.np/';

class ReplaceModal extends Component {
  state = {
    file: {},
    fileName: '',
    hasFile: false,
  };

  onChangeHandler = e => {
    e.preventDefault();
    const { file } = this.state;
    if (Object.keys(file).length > 0) {
      const id = this.props.assetUid;
      const editUrl = this.props.modalDatas;
      const destinationUrl = `${kpiUrl}assets/${id}/`;
      const formData = new FormData();

      formData.append('assetUid', id);
      formData.append('name', file.name);
      formData.append('file', file);
      formData.append('destination', destinationUrl);

      axios
        .post(kpiUrl + 'imports/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: 'Token ' + tokenVal,
          },
        })
        .then(res => {
          if (res.status === 201) {
            window.open(editUrl, '_self');
            this.props.toggleModal();
          }
        })
        .catch(err => console.log('err', err));
    } else {
      errorToast('Select a file first!');
    }
  };

  readFile = file => {
    const newFile = file[0];
    this.setState({
      file: newFile,
      fileName: newFile.name,
      hasFile: true,
    });
  };

  render() {
    const { fileName, hasFile } = this.state;
    return (
      <form
        onSubmit={e => {
          this.onChangeHandler(e);
        }}
      >
        <div className="form-group">
          <label>attach file</label>
          {hasFile ? (
            <Dropzone
              accept=".xls"
              onDrop={acceptedFile => this.readFile(acceptedFile)}
            >
              {({ getRootProps, getInputProps }) => {
                return (
                  <section>
                    <div className="upload-form">
                      <i className="la la-file-o"></i>
                      <span>{fileName}</span>
                    </div>
                    <div {...getRootProps()}>
                      <input {...getInputProps()} multiple={false} />
                      <div className="upload-icon" />

                      <button className="fieldsight-btn">
                        Upload
                        <i className="la la-cloud-upload" />
                      </button>
                    </div>
                  </section>
                );
              }}
            </Dropzone>
          ) : (
            <Dropzone
              accept=".xls"
              onDrop={acceptedFile => this.readFile(acceptedFile)}
            >
              {({ getRootProps, getInputProps }) => {
                return (
                  <section>
                    <div className="upload-form">
                      <div className="upload-wrap">
                        <div className="content">
                          <div {...getRootProps()}>
                            <input
                              {...getInputProps()}
                              multiple={false}
                            />
                            <div className="upload-icon" />
                            <h3>Upload XLS file</h3>
                            <button className="fieldsight-btn">
                              Upload
                              <i className="la la-cloud-upload" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                );
              }}
            </Dropzone>
          )}
        </div>
        <div className="form-group">
          <button
            type="submit"
            className="fieldsight-btn pull-right "
          >
            Upload
          </button>
        </div>
      </form>
    );
  }
}

export default ReplaceModal;
