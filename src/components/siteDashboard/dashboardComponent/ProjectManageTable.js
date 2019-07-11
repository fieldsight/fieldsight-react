import React,{Component} from 'react';
import Table from 'react-bootstrap/Table'
class ProjectManageTable extends Component{
    render(){
        return(
            <React.Fragment>
                <Table responsive="xl" className="table  table-bordered  dataTable ">
                    <thead>
                        <tr>
                            <th >ID</th>
                            <th >sites</th>
                            <th >Address</th>
                            <th >Regions</th>
                            <th >Progress</th>
                            <th >Submissions</th>
                            <th >status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>28-11</td>
                            <td>
                                <a href="#" className="pending table-profile">
                                    <figure>
                                        <img src="/img/pf.jpg" alt="site-logo" />
                                    </figure>
                                    <h5>Krishna B Mijar</h5>
                                </a>
                            </td>
                            <td>kathmandu,10 Nepal</td>
                            <td><a href="#" className="pending">Gorkha</a></td>
                            <td>
                                <div className="progress">
                                    <div className="progress-bar" role="progressbar" aria-valuenow="40" aria-valuemin="0"  aria-valuemax="200" style={{width:'40%'}}>
                                        <span className="progress-count">50%</span>
                                    </div>
                                </div>
                            </td>
                            <td>200</td>
                            <td><a href="#" className="approved">Approved</a></td>
                            
                        </tr>
                        <tr>
                            <td>28-11</td>
                            <td>
                                <a href="#" className="pending table-profile">
                                    <figure>
                                        <img src="/img/pf.jpg" alt="site-logo" />
                                    </figure>
                                    <h5>Krishna B Mijar</h5>
                                </a>
                            </td>
                            <td>kathmandu,10 Nepal</td>
                            <td><a href="#" className="pending">Gorkha</a></td>
                            <td>
                                <div className="progress">
                                    <div className="progress-bar" role="progressbar" aria-valuenow="40" aria-valuemin="0"  aria-valuemax="200" style={{width:'50%'}}>
                                        <span className="progress-count">50%</span>
                                    </div>
                                </div>
                            </td>
                            <td>200</td>
                            <td><a href="#" className="pending">pending</a></td>
                            
                        </tr>
                        <tr>
                            <td>28-11</td>
                            <td>
                                <a href="#" className="pending table-profile">
                                    <figure>
                                        <img src="/img/pf.jpg" alt="site-logo" />
                                    </figure>
                                    <h5>Krishna B Mijar</h5>
                                </a>
                            </td>
                            <td>kathmandu,10 Nepal</td>
                            <td><a href="#" className="pending">Gorkha</a></td>
                            <td>
                                <div className="progress">
                                    <div className="progress-bar" role="progressbar" aria-valuenow="40" aria-valuemin="0"  aria-valuemax="200" style={{width:'30%'}}>
                                        <span className="progress-count">50%</span>
                                    </div>
                                </div>
                            </td>
                            <td>200</td>
                            <td><a href="#" className="flagged">flagged</a></td>
                            
                        </tr>
                        <tr>
                            <td>28-11</td>
                            <td>
                                <a href="#" className="pending table-profile">
                                    <figure>
                                        <img src="/img/pf.jpg" alt="site-logo" />
                                    </figure>
                                    <h5>Krishna B Mijar</h5>
                                </a>
                            </td>
                            <td>kathmandu,10 Nepal</td>
                            <td><a href="#" className="pending">Gorkha</a></td>
                            <td>
                                <div className="progress">
                                    <div className="progress-bar" role="progressbar" aria-valuenow="40" aria-valuemin="0"  aria-valuemax="200" style={{width:'20%'}}>
                                        <span className="progress-count">50%</span>
                                    </div>
                                </div>
                            </td>
                            <td>200</td>
                            <td><a href="#" className="rejected">reject</a></td>
                            
                        </tr>
                        <tr>
                            <td>28-11</td>
                            <td>
                                <a href="#" className="pending table-profile">
                                    <figure>
                                        <img src="/img/pf.jpg" alt="site-logo" />
                                    </figure>
                                    <h5>Krishna B Mijar</h5>
                                </a>
                            </td>
                            <td>kathmandu,10 Nepal</td>
                            <td><a href="#" className="pending">Gorkha</a></td>
                            <td>
                                <div className="progress">
                                    <div className="progress-bar" role="progressbar" aria-valuenow="40" aria-valuemin="0"  aria-valuemax="200" style={{width:'60%'}}>
                                        <span className="progress-count">50%</span>
                                    </div>
                                </div>
                            </td>
                            <td>200</td>
                            <td><a href="#" className="approved">Approved</a></td>
                            
                        </tr>
                        <tr>
                            <td>28-11</td>
                            <td>
                                <a href="#" className="pending table-profile">
                                    <figure>
                                        <img src="/img/pf.jpg" alt="site-logo" />
                                    </figure>
                                    <h5>Krishna B Mijar</h5>
                                </a>
                            </td>
                            <td>kathmandu,10 Nepal</td>
                            <td><a href="#" className="pending">Gorkha</a></td>
                            <td>
                                <div className="progress">
                                    <div className="progress-bar" role="progressbar" aria-valuenow="40" aria-valuemin="0"  aria-valuemax="200" style={{width:'55%'}}>
                                        <span className="progress-count">50%</span>
                                    </div>
                                </div>
                            </td>
                            <td>200</td>
                            <td><a href="#" className="approved">Approved</a></td>
                            
                        </tr>
                        <tr>
                            <td>28-11</td>
                            <td>
                                <a href="#" className="pending table-profile">
                                    <figure>
                                        <img src="/img/pf.jpg" alt="site-logo" />
                                    </figure>
                                    <h5>Krishna B Mijar</h5>
                                </a>
                            </td>
                            <td>kathmandu,10 Nepal</td>
                            <td><a href="#" className="pending">Gorkha</a></td>
                            <td>
                                <div className="progress">
                                    <div className="progress-bar" role="progressbar" aria-valuenow="40" aria-valuemin="0"  aria-valuemax="200" style={{width:'80%'}}>
                                        <span className="progress-count">50%</span>
                                    </div>
                                </div>
                            </td>
                            <td>200</td>
                            <td><a href="#" className="approved">Approved</a></td>
                            
                        </tr>
                        <tr>
                            <td>28-11</td>
                            <td>
                                <a href="#" className="pending table-profile">
                                    <figure>
                                        <img src="/img/pf.jpg" alt="site-logo" />
                                    </figure>
                                    <h5>Krishna B Mijar</h5>
                                </a>
                            </td>
                            <td>kathmandu,10 Nepal</td>
                            <td><a href="#" className="pending">Gorkha</a></td>
                            <td>
                                <div className="progress">
                                    <div className="progress-bar" role="progressbar" aria-valuenow="40" aria-valuemin="0"  aria-valuemax="200" style={{width:'90%'}}>
                                        <span className="progress-count">50%</span>
                                    </div>
                                </div>
                            </td>
                            <td>200</td>
                            <td><a href="#" className="approved">Approved</a></td>
                            
                        </tr>

                    </tbody>
                </Table>
            </React.Fragment>
        )
    }
}
export default ProjectManageTable;