import React, { PureComponent } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';

export default class TeamTable extends PureComponent {
  render() {
    const { teams } = this.props;

    return (
      <div className="card-body">
        <div
          className="thumb-list mr-0"
          style={{ position: 'relative', height: '396px' }}
        >
          <PerfectScrollbar>
            <ul>
              {/* <h1>hello</h1> */}
              {teams.length > 0 &&
                teams.map(each => (
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
