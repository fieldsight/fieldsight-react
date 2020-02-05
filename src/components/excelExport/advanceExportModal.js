import React, { Component } from 'react';
import Modal from '../common/Modal';
import SelectElement from '../common/SelectElement';
import CheckBox from '../common/CheckBox';

const options = [
  { id: '/', name: '/(Slash)' },
  { id: '.', name: '.(Dot)' },
];

class AdvancedExportModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dontSplitSelectMultiples: 'no',
      groupDelimiter: '/',
    };
  }

  handleSelectChange = e => {
    const { value } = e.target;
    this.setState(() => ({
      groupDelimiter: value,
    }));
  };

  handleCheckBox = e => {
    const { checked } = e.target;
    this.setState(() => {
      if (checked) {
        return {
          dontSplitSelectMultiples: 'yes',
        };
      }
      if (!checked) {
        return {
          dontSplitSelectMultiples: 'no',
        };
      }
      return null;
    });
  };

  handleOnSave = () => {
    this.props.handleAdvanceSubmit(this.state);
  };

  render() {
    const {
      props: { handleToggleModal, modalLoader },
      state: { groupDelimiter, dontSplitSelectMultiples },
    } = this;

    return (
      <Modal title="Advanced Export" toggleModal={handleToggleModal}>
        <div className="row">
          <div className="col-xs-6">
            <div className="card-body">
              <SelectElement
                label=" Delimiter to use to separate group names from
            field names"
                className="form-control"
                options={options}
                changeHandler={this.handleSelectChange}
                value={groupDelimiter}
              />
              <CheckBox
                checked={dontSplitSelectMultiples === 'yes'}
                label="DONT split select multiple choice answers into separate columns"
                changeHandler={this.handleCheckBox}
              />
              <div className="buttons flex-end">
                <button
                  type="button"
                  className="common-button is-border"
                  onClick={() => {
                    handleToggleModal();
                  }}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="common-button is-bg"
                  onClick={() => {
                    this.handleOnSave();
                  }}
                  disabled={modalLoader}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}

export default AdvancedExportModal;
