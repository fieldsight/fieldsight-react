import React, { Component, Fragment } from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import { DotLoader } from "../myForm/Loader";

const url = "fv3/api/project-site-list/?project=137";

class ProjectSiteTable extends Component {
  _isMounted = false;
  state = {
    siteList: [],
    totalCount: 0,
    toData: 200,
    fromData: 1,
    pageNum: 0,
    dLoader: true,
    lowerPages: [],
    higerPages: [],
    totalPage:null
  };

  componentDidMount() {
    this._isMounted = true;
   
    axios
      .get(`${url}`)

      .then(res => {
        console.log(res.data);
        if (this._isMounted) {
          if (res.status === 200) {
            this.setState({
              siteList: res.data.results,
              dLoader: false,
              pageNum: this.state.pageNum+1,
              totalCount: res.data.count,
              totalPage:Math.ceil(res.data.count / 200)
            },  this.pageCounter);
          }
        }
      })
      .catch(err => {
        console.log(err)
        // this.setState({
        //   dLoader: false
        // });
      });
  }

  componentDidUpdate(props,prevstate){
    if(prevstate.pageNum!=this.state.pageNum){
    
       this.pageCounter()

    }


  } 

  requestHandler = paginateUrl => {
    axios
      .get(`${paginateUrl}`)

      .then(res => {
        if (this._isMounted) {
          if (res.status === 200) {
            this.setState({
              siteList: res.data.results,
              dLoader: false
            });
          }
        }
      })
      .catch(err => {});
  };

  paginationHandler = page_num => {
    const toNum = page_num * 200;
    const fromNum = (page_num - 1) * 200 + 1;
    const paginateUrl =
      "fv3/api/project-site-list/?page=" + page_num + "&project=137";
    console.log(paginateUrl);
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

  pageCounter = () => {
    let lowpages = [];
    let highpages = [];
    let j = 1;
    let k = 1;
    let totalPage = Math.ceil(this.state.totalCount / 200);
    if (this.state.pageNum == totalPage) {
      this.setState({
        pageNum: totalPage - 10
      });
    }
    for (let i = this.state.pageNum; i < totalPage; i++) {
      lowpages.push(i);
     
      j++;
      if (j >= 4) {
        break;
      }
    }

   

    for (let i = this.state.pageNum + 8; i < totalPage; i++) {
      highpages.push(i);
     
      k++;
      if (k >= 3) {
        break;
      }
    }

   this.setState({
     lowerPages:lowpages,
     higerPages:highpages
   })

    // return pages;
  };

  render() {
    return (
      <Fragment>
        <div className="card-header main-card-header sub-card-header">
          <h5>Sites</h5>
          <div className="dash-btn">
            <form className="floating-form">
              <div className="form-group mr-0">
                <input type="search" className="form-control" required />
                <label htmlFor="input">Search</label>
                <i className="la la-search" />
              </div>
            </form>
            <button
              className="fieldsight-btn"
              onClick={e => this.props.showPopup(e, "add")}
            >
              <i className="la la-plus" />
            </button>
            <button className="fieldsight-btn">Meta Attributes</button>
            <button
              className="fieldsight-btn"
              onClick={e => this.props.showPopup(e, "upload")}
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
                    <th>id</th>
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
                        <td>{i}</td>
                        <td>
                          <a href="#" className="pending table-profile">
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
                              style={{ width: item.progress }}
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
                            {item.status}
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
                      this.paginationHandler(this.state.pageNum - 1)
                    }
                  >
                    <i className="la la-long-arrow-left" />
                  </a>
                </li>
                {this.state.lowerPages.map(page => (
                  <li
                    key={page}
                    className={this.state.pageNum == page ? "current" : ""}
                  >
                    {" "}
                    <a onClick={e => this.paginationHandler(page)}>{page}</a>
                  </li>
                ))}

                {/* {this.pageCounter()} */}
                <li className="page-item">.....</li>

                {this.state.higerPages.map(page => (
                  <li
                    key={page}
                    className={this.state.pageNum == page ? "current" : ""}
                  >
                    {" "}
                    <a onClick={e => this.paginationHandler(page)}>{page}</a>
                  </li>
                ))}

                {this.state.totalPage && <li
                  key={this.state.totalPage}
                  className={this.state.pageNum == this.state.totalPage ? "current" : ""}
                >
                  {" "}
                  <a onClick={e => this.paginationHandler(this.state.totalPage)}>
                    {this.state.totalPage}
                  </a>
                </li>}

                <li className="page-item ">
                  <a
                    onClick={e =>
                      this.paginationHandler(this.state.pageNum + 1)
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
