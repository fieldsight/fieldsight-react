import React , {Component} from 'react';
import Table from 'react-bootstrap/Table'
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';

class DatatablePage extends Component{

  render(){
    return (
      <PerfectScrollbar>
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
                            <i className="fa fa-file-pdf-o"></i>
                        </span>
                        Retrofitting Go/No-Go with Measurement
                    </a>
                </td>
                <td>Plan</td>
                <td><time>2018-10-02</time></td>
                <td>
                    <a href={`#/`} className="td-edit-btn" data-toggle="tooltip" data-placement="top" title="Edit"> <i class="fa fa-edit"> </i> </a>
                    <a href={`#/`} className="td-delete-btn" data-toggle="tooltip" data-placement="top" title="Delete"> <i class="fa fa-trash-o"> </i> </a>
                </td>
            </tr>
            <tr>
                <td>
                    <a href={`#/`}>
                        <span className="td-doc-icon approved">
                            <i className="fa fa-file-excel-o"></i>
                        </span>
                        Retrofitting Go/No-Go with Measurement
                    </a>
                </td>
                <td>Plan</td>
                <td><time>2018-10-02</time></td>
                <td>
                    <a href={`#/`} className="td-edit-btn" data-toggle="tooltip" data-placement="top" title="Edit"> <i class="fa fa-edit"> </i> </a>
                    <a href={`#/`} className="td-delete-btn" data-toggle="tooltip" data-placement="top" title="Delete"> <i class="fa fa-trash-o"> </i> </a>
                </td>
            </tr>
            <tr>
                <td>
                    <a href={`#/`}>
                        <span className="td-doc-icon twitter">
                            <i className="fa fa-file-word-o"></i>
                        </span>
                        Retrofitting Go/No-Go with Measurement
                    </a>
                </td>
                <td>Plan</td>
                <td><time>2018-10-02</time></td>
                <td>
                    <a href={`#/`} className="td-edit-btn" data-toggle="tooltip" data-placement="top" title="Edit"> <i class="fa fa-edit"> </i> </a>
                    <a href={`#/`} className="td-delete-btn" data-toggle="tooltip" data-placement="top" title="Delete"> <i class="fa fa-trash-o"> </i> </a>
                </td>
            </tr>
            <tr>
                <td>
                    <a href={`#/`}>
                        <span className="td-doc-icon pending">
                            <i className="fa fa-file-photo-o"></i>
                        </span>
                        Retrofitting Go/No-Go with Measurement
                    </a>
                </td>
                <td>Plan</td>
                <td><time>2018-10-02</time></td>
                <td>
                    <a href={`#/`} className="td-edit-btn" data-toggle="tooltip" data-placement="top" title="Edit"> <i class="fa fa-edit"> </i> </a>
                    <a href={`#/`} className="td-delete-btn" data-toggle="tooltip" data-placement="top" title="Delete"> <i class="fa fa-trash-o"> </i> </a>
                </td>
            </tr>
            <tr>
                <td>
                    <a href={`#/`}>
                        <span className="td-doc-icon google">
                            <i className="fa fa-file-pdf-o"></i>
                        </span>
                        Retrofitting Go/No-Go with Measurement
                    </a>
                </td>
                <td>Plan</td>
                <td><time>2018-10-02</time></td>
                <td>
                    <a href={`#/`} className="td-edit-btn" data-toggle="tooltip" data-placement="top" title="Edit"> <i class="fa fa-edit"> </i> </a>
                    <a href={`#/`} className="td-delete-btn" data-toggle="tooltip" data-placement="top" title="Delete"> <i class="fa fa-trash-o"> </i> </a>
                </td>
            </tr>
            <tr>
                <td>
                    <a href={`#/`}>
                        <span className="td-doc-icon twitter">
                            <i className="fa fa-file-word-o"></i>
                        </span>
                        Retrofitting Go/No-Go with Measurement
                    </a>
                </td>
                <td>Plan</td>
                <td><time>2018-10-02</time></td>
                <td>
                    <a href={`#/`} className="td-edit-btn" data-toggle="tooltip" data-placement="top" title="Edit"> <i class="fa fa-edit"> </i> </a>
                    <a href={`#/`} className="td-delete-btn" data-toggle="tooltip" data-placement="top" title="Delete"> <i class="fa fa-trash-o"> </i> </a>
                </td>
            </tr>

        </tbody>
      </Table>
      </PerfectScrollbar>
    );
    
  }

 
}

export default DatatablePage;