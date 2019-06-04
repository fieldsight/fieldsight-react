import React, { Component } from 'react'

class SiteManage extends Component {
    render() {
        return (
            <div>
                <div className="card">
                    <div className="card-header main-card-header sub-card-header">
                        <h5>Site Mangage</h5>
                        <div className="add-btn">
                            <a href="#" data-tab="site-popup">Add new <span><i className="la la-plus"></i></span></a>
                        </div>
                    </div>
                    <div className="card-body">
                        <table id="manage_table" className="table  table-bordered  manage_table">
                            <thead>
                                <tr>
                                    <th >S.N</th>
                                    <th >ID</th>
                                    <th >sites</th>
                                    <th >Address</th>
                                    <th >Regions</th>
                                    <th >Role</th>
                                    <th >Progress</th>
                                    <th >Submissions</th>
                                    <th >status</th>
                                    <th >Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>28-11</td>
                                    <td><a href="#" className="pending">Krishna B Mijar</a></td>
                                    <td>kathmandu,10 Nepal</td>
                                    <td><a href="#" className="pending">Gorkha</a></td>
                                    <td>supervisor/Reviewer</td>
                                    <td>
                                        <div className="progress">
                                            <div className="progress-bar" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="200" style={{ width: "0%" }}>
                                                <span className="progress-count">50%</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>200</td>
                                    <td><a href="#" className="approved">Approved</a></td>
                                    <td>
                                        <a href="#" className="td-edit-btn" data-toggle="tooltip" data-placement="top" title="Edit"> <i className="la la-edit"> </i> </a>
                                        <a href="#" className="td-delete-btn" data-toggle="tooltip" data-placement="top" title="Delete"> <i className="la la-trash-o"> </i> </a>
                                    </td>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>28-11</td>
                                    <td><a href="#" className="pending">Krishna B Mijar</a></td>
                                    <td>kathmandu,10 Nepal</td>
                                    <td><a href="#" className="pending">Gorkha</a></td>
                                    <td>supervisor/Reviewer</td>
                                    <td>
                                        <div className="progress">
                                            <div className="progress-bar" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="200" style={{ width: "0%" }}>
                                                <span className="progress-count">50%</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>200</td>
                                    <td><a href="#" className="pending">pending</a></td>
                                    <td>
                                        <a href="#" className="td-edit-btn" data-toggle="tooltip" data-placement="top" title="Edit"> <i className="la la-edit"> </i> </a>
                                        <a href="#" className="td-delete-btn" data-toggle="tooltip" data-placement="top" title="Delete"> <i className="la la-trash-o"> </i> </a>
                                    </td>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>28-11</td>
                                    <td><a href="#" className="pending">Krishna B Mijar</a></td>
                                    <td>kathmandu,10 Nepal</td>
                                    <td><a href="#" className="pending">Gorkha</a></td>
                                    <td>supervisor/Reviewer</td>
                                    <td>
                                        <div className="progress">
                                            <div className="progress-bar" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="200" style={{ width: "0%" }}>
                                                <span className="progress-count">50%</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>200</td>
                                    <td><a href="#" className="flagged">flagged</a></td>
                                    <td>
                                        <a href="#" className="td-edit-btn" data-toggle="tooltip" data-placement="top" title="Edit"> <i className="la la-edit"> </i> </a>
                                        <a href="#" className="td-delete-btn" data-toggle="tooltip" data-placement="top" title="Delete"> <i className="la la-trash-o"> </i> </a>
                                    </td>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>28-11</td>
                                    <td><a href="#" className="pending">Krishna B Mijar</a></td>
                                    <td>kathmandu,10 Nepal</td>
                                    <td><a href="#" className="pending">Gorkha</a></td>
                                    <td>supervisor/Reviewer</td>
                                    <td>
                                        <div className="progress">
                                            <div className="progress-bar" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="200" style={{ width: "0%" }}>
                                                <span className="progress-count">50%</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>200</td>
                                    <td><a href="#" className="rejected">reject</a></td>
                                    <td>
                                        <a href="#" className="td-edit-btn" data-toggle="tooltip" data-placement="top" title="Edit"> <i className="la la-edit"> </i> </a>
                                        <a href="#" className="td-delete-btn" data-toggle="tooltip" data-placement="top" title="Delete"> <i className="la la-trash-o"> </i> </a>
                                    </td>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>28-11</td>
                                    <td><a href="#" className="pending">Krishna B Mijar</a></td>
                                    <td>kathmandu,10 Nepal</td>
                                    <td><a href="#" className="pending">Gorkha</a></td>
                                    <td>supervisor/Reviewer</td>
                                    <td>
                                        <div className="progress">
                                            <div className="progress-bar" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="200" style={{ width: "0%" }}>
                                                <span className="progress-count">50%</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>200</td>
                                    <td><a href="#" className="approved">Approved</a></td>
                                    <td>
                                        <a href="#" className="td-edit-btn" data-toggle="tooltip" data-placement="top" title="Edit"> <i className="la la-edit"> </i> </a>
                                        <a href="#" className="td-delete-btn" data-toggle="tooltip" data-placement="top" title="Delete"> <i className="la la-trash-o"> </i> </a>
                                    </td>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>28-11</td>
                                    <td><a href="#" className="pending">Krishna B Mijar</a></td>
                                    <td>kathmandu,10 Nepal</td>
                                    <td><a href="#" className="pending">Gorkha</a></td>
                                    <td>supervisor/Reviewer</td>
                                    <td>
                                        <div className="progress">
                                            <div className="progress-bar" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="200" style={{ width: "0%" }}>
                                                <span className="progress-count">50%</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>200</td>
                                    <td><a href="#" className="approved">Approved</a></td>
                                    <td>
                                        <a href="#" className="td-edit-btn" data-toggle="tooltip" data-placement="top" title="Edit"> <i className="la la-edit"> </i> </a>
                                        <a href="#" className="td-delete-btn" data-toggle="tooltip" data-placement="top" title="Delete"> <i className="la la-trash-o"> </i> </a>
                                    </td>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>28-11</td>
                                    <td><a href="#" className="pending">Krishna B Mijar</a></td>
                                    <td>kathmandu,10 Nepal</td>
                                    <td><a href="#" className="pending">Gorkha</a></td>
                                    <td>supervisor/Reviewer</td>
                                    <td>
                                        <div className="progress">
                                            <div className="progress-bar" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="200" style={{ width: "0%" }}>
                                                <span className="progress-count">50%</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>200</td>
                                    <td><a href="#" className="approved">Approved</a></td>
                                    <td>
                                        <a href="#" className="td-edit-btn" data-toggle="tooltip" data-placement="top" title="Edit"> <i className="la la-edit"> </i> </a>
                                        <a href="#" className="td-delete-btn" data-toggle="tooltip" data-placement="top" title="Delete"> <i className="la la-trash-o"> </i> </a>
                                    </td>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>28-11</td>
                                    <td><a href="#" className="pending">Krishna B Mijar</a></td>
                                    <td>kathmandu,10 Nepal</td>
                                    <td><a href="#" className="pending">Gorkha</a></td>
                                    <td>supervisor/Reviewer</td>
                                    <td>
                                        <div className="progress">
                                            <div className="progress-bar" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="200" style={{ width: "0%" }}>
                                                <span className="progress-count">50%</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>200</td>
                                    <td><a href="#" className="approved">Approved</a></td>
                                    <td>
                                        <a href="#" className="td-edit-btn" data-toggle="tooltip" data-placement="top" title="Edit"> <i className="la la-edit"> </i> </a>
                                        <a href="#" className="td-delete-btn" data-toggle="tooltip" data-placement="top" title="Delete"> <i className="la la-trash-o"> </i> </a>
                                    </td>
                                </tr>

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}


export default SiteManage;