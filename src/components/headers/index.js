import React, {  PureComponent } from 'react'
import Logo from '../../static/images/logo.png';
import Profile from '../../static/images/profile.png';

export class Header extends PureComponent {
    render() {
        const {toggleClass, handleToggle} = this.props
        return (
            <header className="site-header">
            <div className="container-fluid">
                <div className="header-wrapper">
                    <div className="header-left flex-between">
                        <a href="#" className="fieldsight-logo">
                            <img src={Logo} alt="fieldsight logo" />
                        </a>
                        <a className={`toggle-menu ${toggleClass? 'active' : ''}`} role="button" onClick={handleToggle}>
                            <i className="la la-bars"/>
                        </a>
                    </div>
                    <div className="header-right">
                        <ul className="nav navbar-nav">
                            <li className="dropdown notifications-menu">
                                <button className="dropdown-toggle fieldsight-btn" data-toggle="dropdown"
                                    aria-expanded="true">
                                    <i className="la la-file-alt"/>

                                </button>
                                <ul className="dropdown-menu dropdown-menu-right dropdown-animation">
                                    {/* <!-- tab nav start --> */}
                                    <ul className="nav nav-tabs " id="myTab" role="tablist">
                                        <li className="nav-item">
                                            <a className="nav-link" id="role_tab" data-toggle="tab" href="#role" role="tab"
                                                aria-controls="role" aria-selected="false">Your Task</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link active" id="activities_tab" data-toggle="tab"
                                                href="#activities" role="tab" aria-controls="activities"
                                                aria-selected="true">Other Task</a>
                                        </li>
                                    </ul>
                                    <div className="tab-content mrt-15" id="myTabContent">
                                        <div className="tab-pane fade" id="role" role="tabpanel" aria-labelledby="role_tab">
                                            <ul>
                                                <li>
                                                    <a href="#">
                                                        <figure>
                                                            <img src={Profile} alt="user" />
                                                        </figure>
                                                        <div className="notify-info">
                                                            <p className="">Site Progress Xls Report Image <b>STFC -
                                                                    Nuwakot</b>
                                                                has been started</p>
                                                            <time>Added on November, 22, 2019, 10:32 am</time>
                                                            <div className="download-file">
                                                                <b>download file</b>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                                                        <figure>
                                                            <img src={Profile} alt="user" />
                                                        </figure>
                                                        <div className="notify-info">
                                                            <p className="">
                                                                Site Progress Xls Report Image 
                                                                <b>STFC - Nuwakot</b>
                                                                has been started</p>
                                                            <time>Added on November, 22, 2019, 10:32 am</time>
                                                            <div className="download-file">
                                                                <b>download file</b>
                                                            </div>
                                                        </div>
                                                    </a>

                                                </li>
                                                <li className="dropdown-footer">
                                                    <a className="text-center" href="#">
                                                        <span>View All</span>
                                                        <span>Mark all as seen</span>
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="tab-pane fade show active" id="activities" role="tabpanel"
                                            aria-labelledby="activities_tab">
                                            <ul>
                                                <li>
                                                    <a href="#">
                                                        <figure>
                                                            <i className="la la-hourglass-2 pending"/>
                                                        </figure>
                                                        <div className="notify-info">
                                                            <p className="">Site Progress Xls Report Image <b>STFC -
                                                                    Nuwakot</b>
                                                                has been started</p>
                                                            <time>Added on November, 22, 2019, 10:32 am</time>

                                                        </div>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                                                        <figure>
                                                            <i className="la la-check-circle approved"/>
                                                        </figure>
                                                        <div className="notify-info">
                                                            <p className="">Zip Site Images of <b>Amulya House</b> is ready
                                                                to download.</p>
                                                            <time>Added on November, 22, 2019, 10:32 am</time>
                                                            <div className="download-file">
                                                                <b>download file</b>
                                                            </div>
                                                        </div>
                                                    </a>

                                                </li>
                                                <li className="dropdown-footer">
                                                    <a className="text-center" href="#">
                                                        <span>View All</span>
                                                        <span>Mark all as seen</span> </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>

                                </ul>
                            </li>
                            <li className="dropdown notifications-menu">
                                <button className="dropdown-toggle fieldsight-btn" data-toggle="dropdown"
                                    aria-expanded="true">
                                    <i className="la la-bell"/>
                                    <sup className="notify">10</sup>
                                </button>
                                <ul className="dropdown-menu dropdown-menu-right dropdown-animation">
                                    <li className="dropdown-header">You have 5 notifications</li>
                                    <li>
                                        <a href="#">
                                            <figure>
                                                <img src={Profile} alt="user" />
                                            </figure>
                                            <div className="notify-info">
                                                <p className=""><b>Santosh Kshetri </b> was assigned as a Site
                                                    Supervisor in <b>Dhan Bahadur Tamang/Dhan B. Tamang</b></p>
                                                <time>2 min ago</time>
                                            </div>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <figure>
                                                <img src={Profile} alt="user" />
                                            </figure>
                                            <div className="notify-info">
                                                <p className=""><b>Santosh Kshetri</b> was assigned as a Site
                                                    Supervisor in <b>Dhan Bahadur Tamang/Dhan B. Tamang</b></p>
                                                <time>2 min ago</time>
                                            </div>
                                        </a>

                                    </li>
                                    <li>
                                        <a href="#">
                                            <figure>
                                                <img src={Profile} alt="user" />
                                            </figure>
                                            <div className="notify-info">
                                                <p className=""><b>Santosh Kshetri </b> was assigned as a Site
                                                    Supervisor in <b>Dhan Bahadur Tamang/Dhan B. Tamang</b></p>
                                                <time>2 min ago</time>
                                            </div>
                                        </a>
                                    </li>
                                    <li className="dropdown-footer">
                                        <a className="text-center" href="#">
                                            <span>View All</span>
                                            <span>Mark all as seen</span>
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            {/* <!-- User Account --> */}
                            <li className="dropdown user-menu">
                                <button href="#" className="dropdown-toggle nav-link fieldsight-btn" data-toggle="dropdown"
                                    aria-expanded="false">
                                    <figure>
                                        <img src={Profile} className="user-image" alt="User"/>
                                    </figure>
                                    <div className="user-info">
                                        <h6>Sam Shayesta</h6>
                                    </div>
                                </button>
                                <ul className="dropdown-menu dropdown-menu-right dropdown-animation">
                                    {/* <!-- User image --> */}
                                    <li>
                                        <a href="profile.html">
                                            My Profile
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#"> Change password </a>
                                    </li>

                                    <li className="dropdown-footer">
                                        <a href="signin.html"> <i className="la la-power-off"/> Log Out
                                        </a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </header>
        )
    }
}

export default Header
