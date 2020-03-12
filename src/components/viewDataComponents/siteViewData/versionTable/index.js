import React, { Component } from 'react';
import PropTypes from 'prop-types';
import VersionTable from '../../responded/Version';

class SiteVersionTable extends Component {
  constructor(props) {
    super(props);
    const {
      match: { params },
    } = this.props;
    this.state = {
      id: params && params.id,
      fid: params && params.fid,
    };
  }

  render() {
    const { id, fid } = this.state;
    return (
      <>
        <VersionTable id={id} fid={fid} />
      </>
    );
  }
}
SiteVersionTable.propTypes = {
  id: PropTypes.string,
  fid: PropTypes.string,
  match: PropTypes.shape({
    params: PropTypes.object,
  }).isRequired,
};
SiteVersionTable.defaultProps = {
  id: '',
  fid: '',
};
export default SiteVersionTable;
