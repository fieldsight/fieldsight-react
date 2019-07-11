import React , {Component} from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
class About extends Component {
    render (){
        return(
            <React.Fragment>
                <PerfectScrollbar>
                    <div className="about-countent">
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc lacinia malesuada odio sed
                                porta. Nam sed dapibus ligula. Sed ultrices rhoncus laoreet. Quisque sed tortor nec nunc pel
                                lentesque consequat eget ac lectus. Morbi sit amet lorem vitae arcu faucibus varius. Sed in 
                                ligula sem. Sed feugiat mi eu ligula euismod, vitae fringilla mauris ullamcorper. Vestibulum 
                                ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Morbi at 
                                pellentesque est.</p>
                    </div>
                    <div className="contact">
                        <div className="card-header main-card-header sub-card-header">
                            <h5>Contact</h5>
                        </div>
                        <div className="card-body">
                            <ul>
                                <li><i className="la la-phone"></i> 9856055360</li>
                                <li><i className="la la-envelope"></i> info@naxa.com.np</li>
                                <li><i className="la la-map-marker"></i> Kathmandu , Nepal</li>
                            </ul>
                        </div>
                    </div>
                </PerfectScrollbar>
            </React.Fragment>
        )
    }
}
export default About;