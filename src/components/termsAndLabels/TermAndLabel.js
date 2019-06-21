import React, { Component, Fragment } from "react";
import axios from "axios";
import InputElement from "../common/InputElement";
import RightContentCard from "../common/RightContentCard";
import Table from "../common/Table";

const tableHeader = {
  termsAndLabels: ["Terms And Labels", "Changed To"]
};
const urls = ["https://fieldsight.naxa.com.np/fv3/api/project-terms-labels/"];

export default class TermAndLabel extends Component {
  state = {
    termsAndLabels: {
      donor: "",
      site: "",
      site_supervisor: "",
      site_reviewer: "",
      region: "",
      region_supervisor: "",
      region_reviewer: ""
    },
    hasData: false
  };

  onSubmitHandler = async e => {
    try {
      e.preventDefault();

      const {
        termsAndLabels: {
          id,
          donor,
          site,
          site_supervisor,
          site_reviewer,
          region,
          region_supervisor,
          region_reviewer
        }
      } = this.state;

      const termsAndLabels = {
        donor,
        site,
        site_supervisor,
        site_reviewer,
        region,
        region_supervisor,
        region_reviewer
      };

      const response = await axios.put(`${urls[0]}/${id}`, termsAndLabels, {
        headers: {
          Authorization: "91a844e62e86b6e336b8fb440340cbeaabf601fe"
        }
      });
      console.log("response", response);
    } catch (error) {
      console.log("error", error);
    }
  };

  onChangeHandler = e => {
    const { name, value } = e.target;

    this.setState({
      termsAndLabels: {
        ...this.state.termsAndLabels,
        [name]: value
      }
    });
  };

  componentDidMount() {
    axios
      .get(`${urls[0]}?project=137`, {
        headers: {
          Authorization: "91a844e62e86b6e336b8fb440340cbeaabf601fe"
        }
      })
      .then(res => {
        res.data && res.data.length > 0
          ? this.setState({
              termsAndLabels: res.data[0]
              // hasData: true
            })
          : null;
      })

      .catch(err => console.log("err", err));
  }

  editHandler = () => {
    this.setState({
      hasData: false
    });
  };

  listHandler = () => {
    this.setState({
      hasData: true
    });
  };

  render() {
    const {
      state: {
        termsAndLabels: {
          donor,
          site,
          site_supervisor,
          site_reviewer,
          region,
          region_supervisor,
          region_reviewer
        },
        hasData
      },
      listHandler,
      editHandler,
      onChangeHandler,
      onSubmitHandler
    } = this;

    const { id, project, ...restLabels } = this.state.termsAndLabels;
    return (
      <RightContentCard
        title="Edit Project"
        hideButton={hasData}
        submitHandler={onSubmitHandler}
      >
        {!hasData && (
          <Fragment>
            <form className="edit-form">
              <div className="row">
                <div className="col-xl-4 col-md-6">
                  <InputElement
                    formType="editForm"
                    tag="input"
                    type="text"
                    required={true}
                    label="Donor"
                    name="donor"
                    value={donor}
                    changeHandler={onChangeHandler}
                  />
                </div>

                <div className="col-xl-4 col-md-6">
                  <InputElement
                    formType="editForm"
                    tag="input"
                    type="text"
                    required={true}
                    label="Site"
                    name="site"
                    value={site}
                    changeHandler={onChangeHandler}
                  />
                </div>
                <div className="col-xl-4 col-md-6">
                  <InputElement
                    formType="editForm"
                    tag="input"
                    type="text"
                    required={true}
                    label="Site Supervisor"
                    name="site_supervisor"
                    value={site_supervisor}
                    changeHandler={onChangeHandler}
                  />
                </div>
                <div className="col-xl-4 col-md-6">
                  <InputElement
                    formType="editForm"
                    tag="input"
                    type="text"
                    required={true}
                    label="Site Reviewer"
                    name="site_reviewer"
                    value={site_reviewer}
                    changeHandler={onChangeHandler}
                  />
                </div>
                <div className="col-xl-4 col-md-6">
                  <InputElement
                    formType="editForm"
                    tag="input"
                    type="text"
                    required={true}
                    label="Region"
                    name="region"
                    value={region}
                    changeHandler={onChangeHandler}
                  />
                </div>
                <div className="col-xl-4 col-md-6">
                  <div className="form-group">
                    <InputElement
                      formType="editForm"
                      tag="input"
                      type="text"
                      required={true}
                      label="Region Supervisor"
                      name="region_supervisor"
                      value={region_supervisor}
                      changeHandler={onChangeHandler}
                    />
                  </div>
                </div>
                <div className="col-xl-4 col-md-6">
                  <div className="form-group">
                    <InputElement
                      formType="editForm"
                      tag="input"
                      type="text"
                      required={true}
                      label="Region Reviewer"
                      name="region_reviewer"
                      value={region_reviewer}
                      changeHandler={onChangeHandler}
                    />
                  </div>
                </div>
              </div>
            </form>
            <button className="fieldsight-btn" onClick={listHandler}>
              See List
            </button>
          </Fragment>
        )}
        {hasData && (
          <Fragment>
            <Table
              page="termsAndLabels"
              tableHeader={tableHeader.termsAndLabels}
              tableRow={Object.entries(restLabels)}
            />
            <button className="fieldsight-btn" onClick={editHandler}>
              Edit
            </button>
          </Fragment>
        )}
      </RightContentCard>
    );
  }
}
