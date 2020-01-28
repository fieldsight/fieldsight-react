import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Dropdown } from 'react-bootstrap';
import { applyActionToReport } from '../../actions/reportActions';
import { errorToast, successToast } from '../../utils/toastHandler';

class CollapseFilterTable extends PureComponent {
  onExportCSV = () => {
    this.props.applyActionToReport(this.props.id, 'excel');
  };

  componentDidUpdate(nextProps) {
    const {
      props: {
        reportReducer: { actionResponse },
      },
    } = this;
    if (actionResponse !== nextProps.reportReducer.actionResponse) {
      successToast(actionResponse.detail);
    }
  }

  render() {
    const actions = [
      {
        id: 1,
        title: 'export',
        icon: 'save_alt',
        menu: [{ key: 1, text: 'As Excel', link: this.onExportCSV }],
      },
    ];

    const sync = [
      {
        id: 1,
        title: 'export',
        icon: 'save_alt',
        menu: [
          {
            key: 1,
            text: 'To Google Sheets',
            link: this.onExportCSV,
          },
        ],
      },
    ];
    return (
      <div className="report-table  mt-3">
        <div className="report-table-header">
          <div className="dropdown">
            <button
              type="button"
              className="common-button data-toggle is-border is-icon"
            >
              <i className="material-icons">import_export</i>
              <span>API</span>
            </button>
          </div>
          <div className="dropdown">
            <button
              type="button"
              className="common-button data-toggle is-border is-icon"
              data-toggle="dropdown"
            >
              <i className="material-icons">sync</i>
              <span>sync</span>
              <i className="material-icons arrow-icon">expand_more</i>
            </button>
            <div className="dropdown-menu dropdown-menu-right">
              <a className="dropdown-item">sync</a>
            </div>
          </div>
          {/* <div className="dropdown">
            <button
              type="button"
              className="common-button data-toggle is-border is-icon"
              data-toggle="dropdown"
            >
              <i className="material-icons">save_alt</i>
              <span>export</span>
              <i className="material-icons arrow-icon">expand_more</i>
            </button>
            <div className="dropdown-menu dropdown-menu-right">
              <a className="dropdown-item">Microsoft excel</a>
              <a className="dropdown-item">PDF Document (.pdf)</a>
              <a className="dropdown-item">
                keyhole markup zipped document(.kmz)
              </a>
            </div>
          </div> */}

          {actions.map(action => (
            <Dropdown key={action.title}>
              <Dropdown.Toggle
                drop="right"
                variant=""
                id="dropdown-Data"
                className="common-button data-toggle is-border is-icon"
              >
                {action.title}
                <i className="material-icons">{action.icon}</i>
              </Dropdown.Toggle>
              <Dropdown.Menu className="dropdown-menu dropdown-menu-right">
                {action.menu.map(item => (
                  <Dropdown.Item
                    onClick={() => {
                      item.link();
                    }}
                    key={item.key}
                    // target="_blank"
                  >
                    {item.text}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          ))}
        </div>
        <div className="table-responsive my-2">
          <table className="table ">
            <thead>
              <tr>
                <th>UID</th>
                <th>indentifier</th>
                <th>name</th>
                <th>Submitted by</th>
                <th>status</th>
                <th>Submitted on</th>
                <th>record</th>
                <th>choose</th>
                <th>Enter the eng</th>
                <th>Select const</th>
                <th>Interior</th>
                <th>exterior</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <span className="">294980</span>
                </td>
                <td>
                  <span className="">R-28-18-8-9-003</span>
                </td>
                <td>
                  <span className="">Narahari Nepal</span>
                </td>
                <td>
                  <span className="">promisha@buildchan…</span>
                </td>
                <td>
                  <span className="">Approved</span>
                </td>
                <td>
                  <span className="">2019-09-18</span>
                </td>
                <td>
                  <span className="">2019-09-18</span>
                </td>
                <td>
                  <span className="">Call1</span>
                </td>
                <td>
                  <span className="">Bishnu</span>
                </td>
                <td>
                  <span className="">Strong back</span>
                </td>
                <td>
                  <span className="">Typ4</span>
                </td>
                <td>
                  <span className="">No</span>
                </td>
              </tr>
              <tr>
                <td>
                  <span className="">294980</span>
                </td>
                <td>
                  <span className="">R-28-18-8-9-003</span>
                </td>
                <td>
                  <span className="">Narahari Nepal</span>
                </td>
                <td>
                  <span className="">promisha@buildchan…</span>
                </td>
                <td>
                  <span className="">Approved</span>
                </td>
                <td>
                  <span className="">2019-09-18</span>
                </td>
                <td>
                  <span className="">2019-09-18</span>
                </td>
                <td>
                  <span className="">Call1</span>
                </td>
                <td>
                  <span className="">Bishnu</span>
                </td>
                <td>
                  <span className="">Strong back</span>
                </td>
                <td>
                  <span className="">Typ4</span>
                </td>
                <td>
                  <span className="">No</span>
                </td>
              </tr>
              <tr>
                <td>
                  <span className="">294980</span>
                </td>
                <td>
                  <span className="">R-28-18-8-9-003</span>
                </td>
                <td>
                  <span className="">Narahari Nepal</span>
                </td>
                <td>
                  <span className="">promisha@buildchan…</span>
                </td>
                <td>
                  <span className="">Approved</span>
                </td>
                <td>
                  <span className="">2019-09-18</span>
                </td>
                <td>
                  <span className="">2019-09-18</span>
                </td>
                <td>
                  <span className="">Call1</span>
                </td>
                <td>
                  <span className="">Bishnu</span>
                </td>
                <td>
                  <span className="">Strong back</span>
                </td>
                <td>
                  <span className="">Typ4</span>
                </td>
                <td>
                  <span className="">No</span>
                </td>
              </tr>
              <tr>
                <td>
                  <span className="">294980</span>
                </td>
                <td>
                  <span className="">R-28-18-8-9-003</span>
                </td>
                <td>
                  <span className="">Narahari Nepal</span>
                </td>
                <td>
                  <span className="">promisha@buildchan…</span>
                </td>
                <td>
                  <span className="">Approved</span>
                </td>
                <td>
                  <span className="">2019-09-18</span>
                </td>
                <td>
                  <span className="">2019-09-18</span>
                </td>
                <td>
                  <span className="">Call1</span>
                </td>
                <td>
                  <span className="">Bishnu</span>
                </td>
                <td>
                  <span className="">Strong back</span>
                </td>
                <td>
                  <span className="">Typ4</span>
                </td>
                <td>
                  <span className="">No</span>
                </td>
              </tr>
              <tr>
                <td>
                  <span className="">294980</span>
                </td>
                <td>
                  <span className="">R-28-18-8-9-003</span>
                </td>
                <td>
                  <span className="">Narahari Nepal</span>
                </td>
                <td>
                  <span className="">promisha@buildchan…</span>
                </td>
                <td>
                  <span className="">Approved</span>
                </td>
                <td>
                  <span className="">2019-09-18</span>
                </td>
                <td>
                  <span className="">2019-09-18</span>
                </td>
                <td>
                  <span className="">Call1</span>
                </td>
                <td>
                  <span className="">Bishnu</span>
                </td>
                <td>
                  <span className="">Strong back</span>
                </td>
                <td>
                  <span className="">Typ4</span>
                </td>
                <td>
                  <span className="">No</span>
                </td>
              </tr>
              <tr>
                <td>
                  <span className="">294980</span>
                </td>
                <td>
                  <span className="">R-28-18-8-9-003</span>
                </td>
                <td>
                  <span className="">Narahari Nepal</span>
                </td>
                <td>
                  <span className="">promisha@buildchan…</span>
                </td>
                <td>
                  <span className="">Approved</span>
                </td>
                <td>
                  <span className="">2019-09-18</span>
                </td>
                <td>
                  <span className="">2019-09-18</span>
                </td>
                <td>
                  <span className="">Call1</span>
                </td>
                <td>
                  <span className="">Bishnu</span>
                </td>
                <td>
                  <span className="">Strong back</span>
                </td>
                <td>
                  <span className="">Typ4</span>
                </td>
                <td>
                  <span className="">No</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="report-table-footer">
          <div className="table-data-counter">
            <span>
              <b>152</b>
              rows
            </span>
            ,
            <span>
              <b>27</b>
              rows
            </span>
          </div>
          <div className="table-data-counter">
            <span>
              <b>4104</b>
              cells
            </span>
          </div>
          <div className="table-data-counter">
            <span>
              <b>3 MB</b>
              est.size
            </span>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ reportReducer }) => ({
  reportReducer,
});

export default connect(mapStateToProps, {
  applyActionToReport,
})(CollapseFilterTable);
