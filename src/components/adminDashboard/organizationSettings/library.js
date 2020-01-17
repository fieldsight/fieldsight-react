import React, { Component } from 'react';
import RightContentCard from '../../common/RightContentCard';

export default class Library extends Component {
  constructor(props) {
    super(props);
    this.state = {
      popUpPage: false,
    };
  }

  handleChange = () => {
    this.setState(preveState => ({
      popUpPage: !preveState.popUpPage,
    }));
  };

  render() {
    return (
      <RightContentCard
        title="Library"
        // addButton
        // toggleModal={this.handleChange}
        // buttonName="Add"
      >
        <h1>dfsghjk</h1>
      </RightContentCard>
    );
  }
}
