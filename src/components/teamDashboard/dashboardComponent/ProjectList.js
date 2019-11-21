import React, { PureComponent } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';

class ProjectList extends PureComponent {
  render() {
    const { projects } = this.props;
    return (
      <div className="card-body">
        <div
          className="thumb-list mr-0"
          style={{ position: 'relative', height: '396px' }}
        >
          <PerfectScrollbar>
            <ul>
              {projects.length > 0 &&
                projects.map(each => (
                  <li key={each.id}>
                    <figure>
                      <img src={`${each.logo}`} alt="pf" />
                    </figure>
                    <div className="content">
                      <h6>
                        <a
                          href={`/fieldsight/application/#/project-dashboard/${each.id}`}
                        >
                          {each.name}
                        </a>
                      </h6>
                      {each.address && <span>{each.address}</span>}
                    </div>
                  </li>
                ))}
            </ul>
          </PerfectScrollbar>
        </div>
      </div>
    );
  }
}
ProjectList.propTypes = {
  projects: PropTypes.arrayOf.isRequired,
};
export default ProjectList;
