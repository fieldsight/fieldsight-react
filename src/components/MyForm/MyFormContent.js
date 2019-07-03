import React, { Component } from 'react';
import 'react-perfect-scrollbar/dist/css/styles.css';
import MyformTable from './MyformTable';




class MyFormContent extends Component {
    render() {
        return (
            <React.Fragment>
            <div className="col-xl-9 col-lg-8">
                <div className="right-content">
                    <div className="tab-content">
                        <div className="tab-pane fade show active" >
                            <div className="card no-boxshadow">
                                <div className="card-header main-card-header sub-card-header">
                                    <h5>My Forms</h5>
                                    <div className="add-btn">
                                        <a href="#" data-tab="site-popup">Add new <span><i className="la la-plus"></i></span></a>
                                    </div>
                                </div>
                                <div className="card-body">
                               
                                    <MyformTable  
                                    OpenTabHandler={this.props.OpenTabHandler}
                                    commonPopupHandler={this.props.commonPopupHandler}
                                    />
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

      
    </React.Fragment>

        )
    }
}

export default MyFormContent; 