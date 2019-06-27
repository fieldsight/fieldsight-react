import React, { Component, Fragment } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import axios from "axios";
import { DotLoader } from "../common/Loader";
import RightContentCard from "../common/RightContentCard";
import Loader from "../common/Loader";
import { errorToast, successToast } from "../../utils/toastHandler";

const animatedComponents = makeAnimated();

const urls = [
  "https://fieldsight.naxa.com.np/fv3/api/geolayer/?project=137",
  "https://fieldsight.naxa.com.np/fv3/api/organization-geolayer/?project=137"
];

export default class MapLayer extends Component {
  _isMounted = false;
  state = {
    geoLayer: [],
    initialData: [],
    dropdownData: [],
    multiValue: [],
    isLoading: false
  };

  componentDidMount() {
    this._isMounted = true;
    axios.all(urls.map(url => axios.get(url))).then(
      axios.spread((initialData, dropdownData) => {
        if (this._isMounted) {
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
        }
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

  requestHandler = () => {
    const idArray = this.state.multiValue.map(item => item.id);
    axios
      .post(urls[0], { project: 137, geo_layers: idArray })
      .then(res => {
        this.setState(
          {
            isLoading: false
          },
          () => successToast("Map Layer", "added")
        );
      })
      .catch(err => {
        this.setState(
          {
            isLoading: false
          },
          errorToast()
        );
      });
  };

  onSubmitHandler = e => {
    e.preventDefault();
    this.setState(
      {
        isLoading: true
      },
      this.requestHandler
    );
  };

  render() {
    const {
      state: { initialData, dropdownData, isLoading },
      onSubmitHandler,
      handleMultiChange
    } = this;
    return (
      <Fragment>
        <RightContentCard title="Map Layer">
          {initialData.length === 0 && <DotLoader />}
          <form onSubmit={onSubmitHandler}>
            {initialData.length > 0 && (
              <Select
                closeMenuOnSelect={false}
                components={animatedComponents}
                onChange={handleMultiChange}
                defaultValue={initialData}
                isMulti
                options={dropdownData}
              />
            )}
            <div className="col-sm-12">
              <button
                type="submit"
                className="fieldsight-btn pull-right"
                style={{ marginTop: "15px" }}
              >
                Save
              </button>
            </div>
          </form>
        </RightContentCard>
        {isLoading && <Loader />}
      </Fragment>
    );
  }

  componentWillUnmount() {
    this._isMounted = false;
  }
}
