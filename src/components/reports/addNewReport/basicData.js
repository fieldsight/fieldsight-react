import React from 'react';
import InputElement from '../../common/InputElement';
import CustomSelect from '../common/CustomSelect';

const BasicData = ({
  handleChange,
  reportName,
  desc,
  errors,
  reportType,
  selectedReportType,
  handleReportTypeChange,
  isEdit,
  handleToggleCollapse,
  collapseClass,
  reportLoader,
}) => (
  <div className="filter-all-header">
    <form
      className="floating-form "
      onSubmit={e => {
        e.preventDefault();
      }}
    >
      <div>
        <InputElement
          formType="editForm"
          tag="input"
          type="text"
          required
          label="Report Name"
          name="reportName"
          value={reportName}
          changeHandler={handleChange}
        />
        {errors && errors.reportName && (
          <small style={{ color: 'red' }}>
            {`*${errors.reportName}`}
          </small>
        )}
      </div>
      <div>
        <InputElement
          formType="editForm"
          tag="input"
          type="text"
          required
          label="Description"
          name="desc"
          value={desc}
          changeHandler={handleChange}
        />
        {errors && errors.desc && (
          <small style={{ color: 'red' }}>{`*${errors.desc}`}</small>
        )}
      </div>
      <div className="report-type">
        <div className="row">
          <div className="col-lg-3 col-md-4">
            <div className="form-group inline-form-group">
              <label className="">Report type</label>
              {!reportLoader && (
                <CustomSelect
                  name={reportType.filter(
                    each => each.id === selectedReportType,
                  )}
                  options={reportType}
                  value={selectedReportType}
                  handleSelect={handleReportTypeChange}
                  disable={isEdit}
                />
              )}
            </div>
          </div>
          <div className="col-lg-9 col-md-8">
            <button
              className={`common-button ${
                collapseClass ? '' : 'is-disable'
              } is-icon pull-right is-bg`}
              type="button"
              onClick={() => {
                handleToggleCollapse();
              }}
            >
              <i className="material-icons">filter_list</i>
              <span>collapse all</span>
              <i className="material-icons arrow-icon">
                {collapseClass ? 'expand_less' : 'expand_more'}
              </i>
            </button>
          </div>
        </div>
      </div>
    </form>
  </div>
);

export default BasicData;
