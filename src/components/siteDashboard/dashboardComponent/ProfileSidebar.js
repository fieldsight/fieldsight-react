import React , {Component} from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
class ProfileSidebar extends Component {
    render (){
        return(
            <React.Fragment>
                
                <div className="profile-content">
                    <figure>
                        <img src="/img/pf.jpg" alt="profile" />
                    </figure>
                    <div className="user-info">
                        <h4>FieldSight Superuser</h4>
                        <span>Build Change</span>
                        <div className="profile-social-icon">
                            <a href={`#/`} className="skype"><i className="la la-skype"></i></a>
                            <a href={`#/`} className="whatsapp"><i className="la la-whatsapp"></i></a>
                            <a href={`#/`} className="twitter"><i className="la la-twitter"></i></a>
                            <a href={`#/`} className="google"><i className="la la-google-plus"></i></a>
                        </div>
                    </div>
                    
                    <div className="profile-address">
                        <ul>
                            <li><i className="la la-user"></i> fsadmin</li>
                            <li><i className="la la-map-marker"></i> Kathmandu , Nepal</li>
                            <li><i className="la la-phone"></i> 9856012345</li>
                            <li><i className="la la-envelope"></i> fsadmin@fieldsight.org</li>
                        </ul>
                    </div>
                </div>
                <PerfectScrollbar>
                <div className="invite">
                    <h4>Invitation</h4>
                    <div className="normal-list">
                        <ul>
                            <li>
                                <p><a href="#">Santosh k</a> as <span>Project Mangager</span> invited to join the FieldSight.</p>
                                <div class="invite-btn">
                                    <a href="#" className="accept-btn"><i className="la la-check"></i>Accept</a>
                                    <a href="#" className="reject-btn"><i className="la la-close"></i>Accept</a>
                                </div>
                            </li>
                            <li>
                                <p><a href="#">Santosh k</a> as <span>Project Mangager</span> invited to join the FieldSight.</p>
                                <div class="invite-btn">
                                    <a href="#" className="accept-btn"><i className="la la-check"></i>Accept</a>
                                    <a href="#" className="reject-btn"><i className="la la-close"></i>Accept</a>
                                </div>
                            </li>
                        </ul>
                    </div>
                    
                </div>
                </PerfectScrollbar>
            </React.Fragment>
        )
    }
}
export default ProfileSidebar;