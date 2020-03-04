import React, { Component } from 'react';
import FilterByData from '../common/FilterByData';

export default class SurveyList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSurvey: false,
      selectedSurvey: [],
    };
  }

  handleSurveyForm = (e, item) => {
    const {
      target: { checked, id },
    } = e;
    const { surveyArr, handleSelected } = this.props;
    this.setState(
      state => {
        const { selectedSurvey } = state;
        if (checked) {
          if (id === 'all_survey_forms') {
            return {
              selectedSurvey: surveyArr,
            };
          }
          return {
            selectedSurvey: [...state.selectedSurvey, item],
          };
        }
        if (!checked) {
          if (id === 'all_survey_forms') {
            return {
              selectedSurvey: [],
            };
          }
          const filterSurvey = selectedSurvey.filter(
            s => s.id !== item.id && s.id !== 'all_survey_forms',
          );
          return {
            selectedSurvey: filterSurvey,
          };
        }
        return null;
      },
      () => {
        const { selectedSurvey } = this.state;
        handleSelected('selectedSurvey', selectedSurvey);
      },
    );
  };

  handleToggleSurveyClass = () => {
    this.setState(state => ({
      showSurvey: !state.showSurvey,
    }));
  };

  render() {
    const {
      state: { showSurvey, selectedSurvey },
      props: { surveyArr },
    } = this;
    return (
      <div className="col-lg-3 col-md-6">
        <FilterByData
          className="form-group"
          label="Survey Forms"
          toggleSelectClass={showSurvey}
          handleToggleClass={this.handleToggleSurveyClass}
          data={surveyArr}
          changeHandler={this.handleSurveyForm}
          selectedArr={selectedSurvey}
          placeholderTxt="Select Survey Forms"
        />
      </div>
    );
  }
}
