import React, {Component} from 'react';
class Alert extends Component{
    render(){
        return(
            <React.Fragment>
                <div className="warning">
                    <i className="la la-exclamation-triangle"></i>
                    <h4>Warning</h4>
                </div>
            </React.Fragment>
        )
    }
}
export default Alert