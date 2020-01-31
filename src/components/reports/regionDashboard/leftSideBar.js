import React, { Component } from 'react';

export default class LeftSidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accordian: false,
      accordian2: false,
    };
  }

  accordianHandler = () => {
    this.setState(prevState => ({
      accordian: !prevState.accordian,
    }));
  };

  accordianHandler2 = () => {
    this.setState(prevState => ({
      accordian2: !prevState.accordian2,
    }));
  };

  render() {
    const teams = [
      {
        id: '1',
        title: ' Rapid Market Assessment (Philippine ShelterCluster)',
        link: '#',
      },
      {
        id: '2',
        title: ' Rapid Market Assessment (Philippine ShelterCluster)',
        link: '#',
      },
      {
        id: '3',
        title: ' Rapid Market Assessment (Philippine ShelterCluster)',
        link: '#',
      },

      {
        id: '4',
        title: ' Rapid Market Assessment (Philippine ShelterCluster)',
        link: '#',
      },
      {
        id: '5',
        title: ' Rapid Market Assessment (Philippine ShelterCluster)',
        link: '#',
      },
      {
        id: '6',
        title: ' Rapid Market Assessment (Philippine ShelterCluster)',
        link: '#',
      },
    ];
    const { accordian, accordian2 } = this.state;
    return (
      <div className="card">
        <div className="card-header main-card-header">
          <h5>Your Teams</h5>
        </div>

        <div id="accordion" className="accordion sidebar-accordion">
          <div className="card no-boxshadow">
            <div className="card-header" id="heading-2">
              <figure>
                <img src="img/pf.jpg" alt="pf" />
              </figure>
              <h5>
                <a
                  className={!accordian ? 'collapsed' : ''}
                  role="button"
                  onKeyDown={this.accordianHandler}
                  data-toggle="collapse"
                  tabIndex="0"
                  //   href="#collapse-2"
                  aria-expanded={accordian}
                  aria-controls="collapse-2"
                  onClick={this.accordianHandler}
                >
                  Housing Recovery and Reconstruction Platform Nepal
                </a>
              </h5>
              <p>
                Housing Recovery and Reconstruction Platform Nepal
              </p>
            </div>
            <div
              id="collapse-2"
              className={accordian ? 'collapse show' : 'collapse'}
              data-parent="#accordion"
              aria-labelledby="heading-2"
            >
              <div className="card-body">
                <ul>
                  {teams.map(data => (
                    <li
                      // className="active"
                      key={data.id}
                    >
                      <a href={data.link}>{data.title}</a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="card no-boxshadow">
            <div className="card-header" id="heading-3">
              <figure>
                <img src="img/pf.jpg" alt="pf" />
              </figure>
              <h5>
                <a
                  className={!accordian2 ? 'collapsed' : ''}
                  role="button"
                  onKeyDown={this.accordianHandler}
                  data-toggle="collapse"
                  tabIndex="0"
                  //   href="#collapse-2"
                  aria-expanded={accordian2}
                  aria-controls="collapse-2"
                  onClick={this.accordianHandler2}
                >
                  Housing Recovery and Reconstruction Platform Nepal
                </a>
              </h5>
              <p>
                Sein Villa – 25/E, Thirimingalar Ave. Street, Ward No.
                7, Yankin Township | Yangon Myanmar
              </p>
            </div>
            <div
              id="collapse-3"
              className={accordian2 ? 'collapse show' : 'collapse'}
              data-parent="#accordion"
              aria-labelledby="heading-3"
            >
              <div className="card-body">
                <ul>
                  {teams.map(data => (
                    <li
                      // className="active"
                      key={data.id}
                    >
                      <a href={data.link}>{data.title}</a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
