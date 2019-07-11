import React,{Component} from 'react';
import Table from 'react-bootstrap/Table'
class FormSubmissionTable extends Component{
    render(){
        return(
            <React.Fragment>
                <Table responsive="xl" className="table  table-bordered  dataTable ">
                    <thead>
                        <tr>
                            <th row="1">Site Name</th>
                            <th row="1">Site id</th>
                            <th row="1">Submission id</th>
                            <th row="1">Submitted by</th>
                            <th row="1">Submission Date</th>
                            <th colSpan="2" row="0">Enketo</th>
                            <th row="1">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <a href={"#/"} className="pending table-profile">
                                    <figure>
                                        <img src="/img/pf.jpg" alt="site-logo" />
                                    </figure>
                                    <h5>Krishna B Mijar</h5>
                                </a>
                            </td>
                            <td>R-31-3-9-0-002</td>
                            <td><a href={`#/`}>65,391</a></td>
                            <td>Kailash Chaudhary</td>
                            <td>2019-10-10</td>
                            <td><a href={`#/`} className="td-view-btn td-btn"  title="Preview"> <i className="la la-eye"> </i> </a></td>
                            <td><a href={`#/`} className="td-edit-btn td-btn"  title="Edit"> <i className="la la-edit"> </i> </a></td>
                            <td><a href={`#/`} className="td-delete-btn td-btn"  title="Delete"> <i className="la la-trash"></i> </a></td>
                        </tr>
                        <tr>
                            <td>
                                <a href={"#/"} className="pending table-profile">
                                    <figure>
                                        <img src="/img/pf.jpg" alt="site-logo" />
                                    </figure>
                                    <h5>Krishna B Mijar</h5>
                                </a>
                            </td>
                            <td>R-31-3-9-0-002</td>
                            <td><a href={`#/`}>65,391</a></td>
                            <td>Kailash Chaudhary</td>
                            <td>2019-10-10</td>
                            <td><a href={`#/`} className="td-view-btn td-btn"  title="Preview"> <i className="la la-eye"> </i> </a></td>
                            <td><a href={`#/`} className="td-edit-btn td-btn"  title="Edit"> <i className="la la-edit"> </i> </a></td>
                            <td><a href={`#/`} className="td-delete-btn td-btn"  title="Delete"> <i className="la la-trash"></i> </a></td>
                        </tr>
                        <tr>
                            <td>
                                <a href={"#/"} className="pending table-profile">
                                    <figure>
                                        <img src="/img/pf.jpg" alt="site-logo" />
                                    </figure>
                                    <h5>Krishna B Mijar</h5>
                                </a>
                            </td>
                            <td>R-31-3-9-0-002</td>
                            <td><a href={`#/`}>65,391</a></td>
                            <td>Kailash Chaudhary</td>
                            <td>2019-10-10</td>
                            <td><a href={`#/`} className="td-view-btn td-btn"  title="Preview"> <i className="la la-eye"> </i> </a></td>
                            <td><a href={`#/`} className="td-edit-btn td-btn"  title="Edit"> <i className="la la-edit"> </i> </a></td>
                            <td><a href={`#/`} className="td-delete-btn td-btn"  title="Delete"> <i className="la la-trash"></i> </a></td>
                        </tr>
                        <tr>
                            <td>
                                <a href={"#/"} className="pending table-profile">
                                    <figure>
                                        <img src="/img/pf.jpg" alt="site-logo" />
                                    </figure>
                                    <h5>Krishna B Mijar</h5>
                                </a>
                            </td>
                            <td>R-31-3-9-0-002</td>
                            <td><a href={`#/`}>65,391</a></td>
                            <td>Kailash Chaudhary</td>
                            <td>2019-10-10</td>
                            <td><a href={`#/`} className="td-view-btn td-btn"  title="Preview"> <i className="la la-eye"> </i> </a></td>
                            <td><a href={`#/`} className="td-edit-btn td-btn"  title="Edit"> <i className="la la-edit"> </i> </a></td>
                            <td><a href={`#/`} className="td-delete-btn td-btn"  title="Delete"> <i className="la la-trash"></i> </a></td>
                        </tr>
                        <tr>
                            <td>
                                <a href={"#/"} className="pending table-profile">
                                    <figure>
                                        <img src="/img/pf.jpg" alt="site-logo" />
                                    </figure>
                                    <h5>Krishna B Mijar</h5>
                                </a>
                            </td>
                            <td>R-31-3-9-0-002</td>
                            <td><a href={`#/`}>65,391</a></td>
                            <td>Kailash Chaudhary</td>
                            <td>2019-10-10</td>
                            <td><a href={`#/`} className="td-view-btn td-btn"  title="Preview"> <i className="la la-eye"> </i> </a></td>
                            <td><a href={`#/`} className="td-edit-btn td-btn"  title="Edit"> <i className="la la-edit"> </i> </a></td>
                            <td><a href={`#/`} className="td-delete-btn td-btn"  title="Delete"> <i className="la la-trash"></i> </a></td>
                        </tr>
                        <tr>
                            <td>
                                <a href={"#/"} className="pending table-profile">
                                    <figure>
                                        <img src="/img/pf.jpg" alt="site-logo" />
                                    </figure>
                                    <h5>Krishna B Mijar</h5>
                                </a>
                            </td>
                            <td>R-31-3-9-0-002</td>
                            <td><a href={`#/`}>65,391</a></td>
                            <td>Kailash Chaudhary</td>
                            <td>2019-10-10</td>
                            <td><a href={`#/`} className="td-view-btn td-btn"  title="Preview"> <i className="la la-eye"> </i> </a></td>
                            <td><a href={`#/`} className="td-edit-btn td-btn"  title="Edit"> <i className="la la-edit"> </i> </a></td>
                            <td><a href={`#/`} className="td-delete-btn td-btn"  title="Delete"> <i className="la la-trash"></i> </a></td>
                        </tr>
                        <tr>
                            <td>
                                <a href={"#/"} className="pending table-profile">
                                    <figure>
                                        <img src="/img/pf.jpg" alt="site-logo" />
                                    </figure>
                                    <h5>Krishna B Mijar</h5>
                                </a>
                            </td>
                            <td>R-31-3-9-0-002</td>
                            <td><a href={`#/`}>65,391</a></td>
                            <td>Kailash Chaudhary</td>
                            <td>2019-10-10</td>
                            <td><a href={`#/`} className="td-view-btn td-btn"  title="Preview"> <i className="la la-eye"> </i> </a></td>
                            <td><a href={`#/`} className="td-edit-btn td-btn"  title="Edit"> <i className="la la-edit"> </i> </a></td>
                            <td><a href={`#/`} className="td-delete-btn td-btn"  title="Delete"> <i className="la la-trash"></i> </a></td>
                        </tr>
                        <tr>
                            <td>
                                <a href={"#/"} className="pending table-profile">
                                    <figure>
                                        <img src="/img/pf.jpg" alt="site-logo" />
                                    </figure>
                                    <h5>Krishna B Mijar</h5>
                                </a>
                            </td>
                            <td>R-31-3-9-0-002</td>
                            <td><a href={`#/`}>65,391</a></td>
                            <td>Kailash Chaudhary</td>
                            <td>2019-10-10</td>
                            <td><a href={`#/`} className="td-view-btn td-btn"  title="Preview"> <i className="la la-eye"> </i> </a></td>
                            <td><a href={`#/`} className="td-edit-btn td-btn"  title="Edit"> <i className="la la-edit"> </i> </a></td>
                            <td><a href={`#/`} className="td-delete-btn td-btn"  title="Delete"> <i className="la la-trash"></i> </a></td>
                        </tr>

                    </tbody>
                </Table>
            </React.Fragment>
        )
    }
}
export default FormSubmissionTable;