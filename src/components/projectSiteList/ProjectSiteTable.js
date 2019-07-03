import React, { Component } from "react";
import Table from "react-bootstrap/Table";

const url = "fv3/api/project-site-list/?project=57";

class ProjectSiteTable extends Component {
//   componentDidMount() {
//     this._isMounted = true;
//     axios
//       .get(`${url}`)

//       .then(res => {
//         if (this._isMounted) {
//           if (res.status === 200) {
//             this.setState({
//               list: res.data,
//               dLoader: false
//             });
//           }
//         }
//       })
//       .catch(err => {
//         this.setState({
//           dLoader: false
//         });
//       });
//   }

  render() {
    return (
      <React.Fragment>
        <Table responsive="xl" className="table  table-bordered  dataTable ">
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
            <tr>
              <td>
                <a href="#" className="pending table-profile">
                  <figure>
                    <img src="/img/pf.jpg" alt="site-logo" />
                  </figure>
                  <h5>Krishna B Mijar</h5>
                </a>
              </td>
              <td>28-11</td>

              <td>kathmandu,10 Nepal</td>
              <td>
                <a href="#" className="pending">
                  Gorkha
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
                    style={{ width: "10%" }}
                  >
                    <span className="progress-count">50%</span>
                  </div>
                </div>
              </td>
              <td>200</td>
              <td>
                <a href="#" className="approved">
                  Approved
                </a>
              </td>
            </tr>
          </tbody>
        </Table>
      </React.Fragment>
    );
  }
}
export default ProjectSiteTable;
