import React, { Component } from 'react';
import axios from 'axios';
import SelectElement from '../common/SelectElement';
/* eslint-disable react/destructuring-assignment */

export default class Select extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectform: [],
      selected: '',
    };
  }

  componentDidMount() {
    this._isMounted = true;
    const { data, value } = this.props;
    axios
      .get(`/fv3/api/project-sites-for-metas/${data}/`)
      .then(res => {
        if (this._isMounted) {
          this.setState({
            selectform: res.data,
            selected: value,
          });
        }
      })
      .catch(() => {
        // console.log(err, 'err');
      });
  }

  onchange = e => {
    const { onChange, name } = this.props;

    this.setState(
      {
        selected: e.target.value,
      },
      () => {
        onChange(this.state.selected, name);
      },
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
                : [{ value: '-', name: '-' }]
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
