import React, { Component, Fragment } from "react";
import SelectElement from "../common/SelectElement";
import axios from "axios";

export default class Select extends Component {
  state = {
    selectform: [],
    selected: ""
  };

  componentDidMount() {
    this._isMounted = true;
    axios
      .get(`/fv3/api/project-sites-for-metas/${this.props.data}/`)
      .then(res => {
        if (this._isMounted) {
          this.setState({
            selectform: res.data,
            selected: this.props.value
          });
        }
      })
      .catch(err => {
        console.log(err, "err");
      });
  }
  onchange = e => {
    this.setState(
      {
        selected: e.target.value
      },
      () => this.props.selectedValue(this.state.selected, this.props.name)
    );
  };
  render() {
    return (
      <>
        <div className="col-xl-4 col-md-6">
          <SelectElement
            className="form-control"
            options={
              this.state.selectform.length > 0
                ? this.state.selectform
                : [{ value: "-", name: "-" }]
            }
            changeHandler={this.onchange}
            label={this.props.type}
            value={this.state.selected}
          />
        </div>
      </>
    );
  }
}
