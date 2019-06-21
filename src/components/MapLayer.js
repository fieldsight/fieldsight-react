import React, { Component } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import axios from "axios";
import RightContentCard from "./common/RightContentCard";
const animatedComponents = makeAnimated();

const urls = [
  "https://fieldsight.naxa.com.np/fv3/api/geolayer/?project=137",
  "https://fieldsight.naxa.com.np/fv3/api/organization-geolayer/?project=137"
];

export default class MapLayer extends Component {
  state = {
    geoLayer: [],
    initialData: [],
    dropdownData: []
  };

  componentDidMount() {
    axios
      .all(
        urls.map(url =>
          axios.get(url, {
            headers: {
              Authorization: "91a844e62e86b6e336b8fb440340cbeaabf601fe"
            }
          })
        )
      )
      .then(
        axios.spread((initialData, dropdownData) => {
          const modifiedInitialData = initialData.data.map(item => ({
            ...item,
            value: item.id,
            label: item.title
          }));

          const modifiedDropdownData = dropdownData.data.map(item => ({
            ...item,
            value: item.id,
            label: item.title
          }));
          this.setState({
            initialData: modifiedInitialData,
            dropdownData: modifiedDropdownData
          });
        })
      );
  }

  handleMultiChange = option => {
    this.setState(state => {
      return {
        multiValue: option
      };
    });
  };

  onSubmitHandler = e => {
    e.preventDefault();
    const idArray = this.state.multiValue.map(item => item.id);
    axios
      .post(
        urls[0],
        { project: 137, geo_layers: idArray },
        {
          headers: {
            Authorization: "91a844e62e86b6e336b8fb440340cbeaabf601fe"
          }
        }
      )
      .then(res => console.log("res", res))
      .catch(err => console.log("Err", err));
  };
  render() {
    return (
      <RightContentCard
        title="Map Layer"
        hideButton={false}
        submitHandler={this.onSubmitHandler}
      >
        {this.state.initialData.length === 0 && <h1>Loading...</h1>}
        {this.state.initialData.length > 0 && (
          <Select
            closeMenuOnSelect={false}
            components={animatedComponents}
            onChange={this.handleMultiChange}
            defaultValue={this.state.initialData}
            isMulti
            options={this.state.dropdownData}
          />
        )}
      </RightContentCard>
    );
  }
}
