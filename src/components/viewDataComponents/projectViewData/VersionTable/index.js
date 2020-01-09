import React, { Component } from 'react';
import VersionTable from '../../responded/Version';

class ProjectVersionTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.match.params && props.match.params.id,
      fid: props.match.params && props.match.params.fid,
    };
  }

  render() {
    const { id, fid } = this.state;
    return (
      <>
        <VersionTable id={id} fid={fid} project="project" />
      </>
    );
  }
}

export default ProjectVersionTable;
