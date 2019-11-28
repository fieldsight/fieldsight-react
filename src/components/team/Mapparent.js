import React, { Component } from 'react';
import TeamMap from './TeamMap';
import DetailsMap from './DetailsMap';

class Mapparent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      map: 'projectmap',
      projectpk: '',
    };
  }

  popupCLick = (mapstr, e) => {
    this.setState({ projectpk: e });
    this.setState({ map: mapstr });
  };

  render() {
    const { map, projectpk } = this.state;
    return (
      <div>
        {map === 'projectmap' ? (
          <TeamMap popupCLick={this.popupCLick} />
        ) : (
          <DetailsMap
            popupCLick={this.popupCLick}
            projectpk={projectpk}
          />
        )}
      </div>
    );
  }
}

export default Mapparent;
