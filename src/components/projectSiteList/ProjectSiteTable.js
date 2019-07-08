import React, { Component, Fragment } from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import { DotLoader } from "../myForm/Loader";

const project_id = 137;
const base_url="https://fieldsight.naxa.com.np"

class ProjectSiteTable extends Component {
  _isMounted = false;
  state = {
    siteList: [],
    totalCount: 0,
    toData: 200,
    fromData: 1,
    pageNum: 1,
    dLoader: true,
    per_page: 200,
    totalPage: null,
    textVal: null
  };

  componentDidMount() {
    this.paginationHandler(1, null);
  }

  requestHandler = paginateUrl => {
    this._isMounted = true;
    axios
      .get(`${paginateUrl}`)

      .then(res => {
        if (this._isMounted) {
          if (res.status === 200) {
            this.setState({
              siteList: res.data.results,
              dLoader: false,
              totalCount: res.data.count,
              totalPage: Math.ceil(res.data.count / 200)
            });
          }
        }
      })
      .catch(err => {});
  };

  paginationHandler = (page_num, searchUrl) => {
    console.log(page_num)
    const toNum = page_num * 200;
    const fromNum = (page_num - 1) * 200 + 1;
    let paginateUrl;

    if (searchUrl != null) {
      paginateUrl = this.state.textVal;
    } else {
      this.setState({
        textVal: null
      });
      paginateUrl =
        "fv3/api/project-site-list/?page=" +
        page_num +
        "&project=" +
        project_id;
    }

    this.setState(
      {
        toData: toNum,
        fromData: fromNum,
        pageNum: page_num,
        dLoader: true
      },
      () => this.requestHandler(paginateUrl)
    );
  };

  renderPageNumbers = () => {
    if (this.state.totalPage) {
      const pageNumbers = [];
      for (let i = 1; i <= this.state.totalPage; i++) {
        pageNumbers.push(i);
      }

      return pageNumbers.map(number => {
        let classes = this.state.pageNum === number ? "current" : "";

        if (
          number == 1 ||
          number == this.state.totalPage ||
          (number >= this.state.pageNum - 2 && number <= this.state.pageNum + 2)
        ) {
          return (
            <li key={number} className={classes}>
              {" "}
              <a
                onClick={e =>
                  this.paginationHandler(number, this.state.textVal)
                }
              >
                {number}
              </a>
            </li>
          );
        }
      });
    }
  };

  // OpenTabHandler = (e, url) => {
  //   window.open(url, "_self");
  // };

  searchHandler = e => {
    console.log("search");
    console.log(event.target.value);
    const searchValue = event.target.value;
    let searchUrl;
    if (searchValue) {
      searchUrl =
        "/fv3/api/project-site-list/?page=1&project="+project_id+"&q=" + searchValue;

      console.log(searchUrl);

      this.setState({
        textVal: searchUrl,
        pageNum: 1
      });

      this.paginationHandler(this.state.pageNum, searchUrl);
    } else {
      this.setState({
        pageNum: 1
      });
      this.paginationHandler(1, null);
    }
  };

  render() {
    return (
      <Fragment>
        <div className="card-header main-card-header sub-card-header">
          <h5>Sites</h5>
          <div className="dash-btn">
            <form className="floating-form">
              <div className="form-group mr-0">
                <input
                  type="search"
                  className="form-control"
                  onChange={e => this.searchHandler(e)}
                  required
                />
                <label htmlFor="input">Search</label>
                <i className="la la-search" />
              </div>
            </form>
            <button
              className="fieldsight-btn"
              onClick={e =>
                this.props.OpenTabHandler(
                  e,
                  base_url+"/fieldsight/site/add/" +
                    project_id +
                    "/"
                )
              }
            >
              <i className="la la-plus" />
            </button>
            <button
              className="fieldsight-btn"
              onClick={e =>
                this.props.OpenTabHandler(
                  e,
                  base_url+"/fieldsight/application/?project=" +
                    project_id +
                    "#/project-settings/site-information"
                )
              }
            >
              Site Information
            </button>
            <button
              className="fieldsight-btn"
              onClick={e =>
                this.props.OpenTabHandler(
                  e,
                  base_url+"/fieldsight/upload/" +
                    project_id +
                    "/"
                )
              }
            >
              Bulk upload/update
            </button>
          </div>
        </div>
        <div className="card-body">
          <div style={{ position: "relative", height: "800px" }}>
            <PerfectScrollbar>
              <Table
                responsive="xl"
                className="table  table-bordered  dataTable "
              >
                <thead>
                  <tr>
                    <th>Site name</th>
                    <th>id</th>
                    <th>Address</th>
                    <th>Region</th>
                    <th>Progress</th>
                    <th>Submissions</th>
                    <th>Latest status</th>
                  </tr>
                </thead>

                <tbody>
                  {!this.state.dLoader &&
                    this.state.siteList.map((item, i) => (
                      <tr key={i}>
                        <td>
                          <a  href={base_url+"/fieldsight/site-dashboard/" + item.id + "/"}  className="pending table-profile">
                            <figure>
                              <img src={item.logo} alt="site-logo" />
                            </figure>
                            <h5>{item.name}</h5>
                          </a>
                        </td>
                        <td>{item.identifier}</td>

                        <td>{item.address}</td>
                        <td>
                          <a href="#" className="pending">
                            {item.region}
                          </a>
                        </td>
                        <td>
                          <div className="progress">
                            <div
                              className="progress-bar"
                              role="progressbar"
                              aria-valuenow="40"
                              aria-valuemin="0"
                              aria-valuemax="200"
                              style={{ width: item.progress + "%" }}
                            >
                              <span className="progress-count">
                                {item.progress + "%"}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td>{item.submissions}</td>
                        <td>
                          <a
                            className={
                              item.status != null
                                ? item.status.toLowerCase()
                                : null
                            }
                          >
                            {item.status != null
                              ? item.status
                              : "No Submission Yet"}
                          </a>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </Table>
              {this.state.dLoader && <DotLoader />}
            </PerfectScrollbar>
          </div>
          <div className="table-footer">
            <div className="showing-rows">
              <p>
                Showing <span>{this.state.fromData}</span> to{" "}
                <span> {this.state.toData} </span> of{" "}
                <span>{this.state.totalCount}</span> entries.
              </p>
            </div>
            <div className="table-pagination">
              <ul>
                <li className="page-item">
                  <a
                    onClick={e =>
                      this.paginationHandler(this.state.pageNum - 1, null)
                    }
                  >
                    <i className="la la-long-arrow-left" />
                  </a>
                </li>

                {this.renderPageNumbers()}

                <li className="page-item ">
                  <a
                    onClick={e =>
                      this.paginationHandler(this.state.pageNum + 1, null)
                    }
                  >
                    <i className="la la-long-arrow-right" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}
export default ProjectSiteTable;
