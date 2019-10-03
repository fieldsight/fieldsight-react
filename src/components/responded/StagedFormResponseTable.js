import React, { Component } from "react";
import Table from "react-bootstrap/Table";
export default class SurveyFormResponseTable extends Component {
  state = {
    stage_forms: []
  };
  static getDerivedStateFromProps(props, state) {
    return {
      stage_forms: props.stage_forms,
      deleted_forms: props.deleted_forms
    };
  }
  render() {
    return (
      <React.Fragment>
        <div>
          {this.state.stage_forms.map((stage, key) => {
            return (
              <div key={key}>
                <div style={{ display: "flex" }}>
                  <h6>{stage.name}</h6>
                  <h6>{stage.id}</h6>
                </div>
                <Table
                  responsive="xl"
                  className="table  table-bordered  dataTable "
                >
                  <thead>
                    <tr>
                      <th>form_name</th>
                      <th>Id</th>
                      <th>last_response</th>
                      <th>name</th>
                      <th>response</th>
                      <th>order</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stage.sub_stages.map((sub_stages, key) => {
                      return (
                        <tr key={key}>
                          <td>{sub_stages.id}</td>
                          <td>{sub_stages.form_name}</td>
                          <td>{sub_stages.last_response}</td>
                          <td>{sub_stages.name}</td>
                          <td>{sub_stages.response_count}</td>
                          <td>{sub_stages.order}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </div>
            );
          })}
        </div>
      </React.Fragment>
    );
  }
}
