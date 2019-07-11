import React , {Component} from 'react';
import Table from 'react-bootstrap/Table'
class SiteDocTable extends Component{

    render(){
      return (
          <React.Fragment>
          <Table responsive="xl" className="table  table-bordered  dataTable ">
              <thead>
                  <tr>
                      <th >Name</th>
                      <th >Type</th>
                      <th >Added Date</th>
                      <th >Action</th>
                  </tr>
              </thead>
              <tbody>
              <tr>
                  <td>
                      <a href={`#/`}>
                          <span className="td-doc-icon google">
                              <i className="la la-file-pdf-o"></i>
                          </span>
                          Retrofitting Go/No-Go with Measurement
                      </a>
                  </td>
                  <td>Plan</td>
                  <td><time>2018-10-02</time></td>
                  <td>
                      <a href={`#/`} className="td-edit-btn" data-toggle="tooltip" data-placement="top" title="Edit"> <i className="la la-edit"> </i> </a>
                      <a href={`#/`} className="td-delete-btn" data-toggle="tooltip" data-placement="top" title="Delete"> <i className="la la-trash-o"> </i> </a>
                  </td>
              </tr>
              <tr>
                  <td>
                      <a href={`#/`}>
                          <span className="td-doc-icon approved">
                              <i className="la la-file-excel-o"></i>
                          </span>
                          Retrofitting Go/No-Go with Measurement
                      </a>
                  </td>
                  <td>Plan</td>
                  <td><time>2018-10-02</time></td>
                  <td>
                      <a href={`#/`}className="td-edit-btn" data-toggle="tooltip" data-placement="top" title="Edit"> <i className="la la-edit"> </i> </a>
                      <a href={`#/`} className="td-delete-btn" data-toggle="tooltip" data-placement="top" title="Delete"> <i className="la la-trash-o"> </i> </a>
                  </td>
              </tr>
              <tr>
                  <td>
                      <a href={`#/`}>
                          <span className="td-doc-icon twitter">
                              <i className="la la-file-word-o"></i>
                          </span>
                          Retrofitting Go/No-Go with Measurement
                      </a>
                  </td>
                  <td>Plan</td>
                  <td><time>2018-10-02</time></td>
                  <td>
                      <a href={`#/`}className="td-edit-btn" data-toggle="tooltip" data-placement="top" title="Edit"> <i className="la la-edit"> </i> </a>
                      <a href={`#/`} className="td-delete-btn" data-toggle="tooltip" data-placement="top" title="Delete"> <i className="la la-trash-o"> </i> </a>
                  </td>
              </tr>
              <tr>
                  <td>
                      <a href={`#/`}>
                          <span className="td-doc-icon pending">
                              <i className="la la-file-photo-o"></i>
                          </span>
                          Retrofitting Go/No-Go with Measurement
                      </a>
                  </td>
                  <td>Plan</td>
                  <td><time>2018-10-02</time></td>
                  <td>
                      <a href={`#/`} className="td-edit-btn" data-toggle="tooltip" data-placement="top" title="Edit"> <i className="la la-edit"> </i> </a>
                      <a href={`#/`} className="td-delete-btn" data-toggle="tooltip" data-placement="top" title="Delete"> <i className="la la-trash-o"> </i> </a>
                  </td>
              </tr>
              <tr>
                  <td>
                      <a href={`#/`}>
                          <span className="td-doc-icon google">
                              <i className="la la-file-pdf-o"></i>
                          </span>
                          Retrofitting Go/No-Go with Measurement
                      </a>
                  </td>
                  <td>Plan</td>
                  <td><time>2018-10-02</time></td>
                  <td>
                      <a href={`#/`} className="td-edit-btn" data-toggle="tooltip" data-placement="top" title="Edit"> <i className="la la-edit"> </i> </a>
                      <a href={`#/`} className="td-delete-btn" data-toggle="tooltip" data-placement="top" title="Delete"> <i className="la la-trash-o"> </i> </a>
                  </td>
              </tr>
              <tr>
                  <td>
                      <a href={`#/`}>
                          <span className="td-doc-icon twitter">
                              <i className="la la-file-word-o"></i>
                          </span>
                          Retrofitting Go/No-Go with Measurement
                      </a>
                  </td>
                  <td>Plan</td>
                  <td><time>2018-10-02</time></td>
                  <td>
                      <a href={`#/`} className="td-edit-btn" data-toggle="tooltip" data-placement="top" title="Edit"> <i className="la la-edit"> </i> </a>
                      <a href={`#/`} className="td-delete-btn" data-toggle="tooltip" data-placement="top" title="Delete"> <i className="la la-trash-o"> </i> </a>
                  </td>
              </tr>
  
          </tbody>
        </Table>
        </React.Fragment>
        
      );
      
    }
  
   
  }
  

  
 


export default SiteDocTable;