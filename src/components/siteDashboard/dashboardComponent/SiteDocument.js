import React , {Component} from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
class SiteDocument extends Component {
    render (){
        return(
            <React.Fragment>
                <PerfectScrollbar>
                    <div className="doc-body">
                        <div className="row">
                            <div className="col-lg-4 col-md-6 col-sm-4">
                                <div className="doc-item">
                                    <div className="doc-wrapper">
                                        <figure>
                                            <img src="/img/pdf.png" alt=""/>
                                        </figure>
                                        <div className="doc-content">
                                            <h6><a href={`#/`}> pdf file of site document</a></h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 col-sm-4">
                                <div className="doc-item">
                                    <div className="doc-wrapper">
                                        <figure>
                                            <img src="/img/pdf.png" alt=""/>
                                        </figure>
                                        <div className="doc-content">
                                            <h6><a href={`#/`}> pdf file of site document</a></h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 col-sm-4">
                                <div className="doc-item">
                                    <div className="doc-wrapper">
                                        <figure>
                                            <img src="/img/pdf.png" alt=""/>
                                        </figure>
                                        <div className="doc-content">
                                            <h6><a href={`#/`}> pdf file of site document</a></h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 col-sm-4">
                                <div className="doc-item">
                                    <div className="doc-wrapper">
                                        <figure>
                                            <img src="/img/pdf.png" alt=""/>
                                        </figure>
                                        <div className="doc-content">
                                            <h6><a href={`#/`}> pdf file of site document</a></h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 col-sm-4">
                                <div className="doc-item">
                                    <div className="doc-wrapper">
                                        <figure>
                                            <img src="/img/pdf.png" alt="" />
                                        </figure>
                                        <div className="doc-content">
                                            <h6><a href={`#/`}> pdf file of site document</a></h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 col-sm-4">
                                <div className="doc-item">
                                    <div className="doc-wrapper">
                                        <figure>
                                            <img src="/img/pdf.png" alt="" />
                                        </figure>
                                        <div className="doc-content">
                                            <h6><a href={`#/`}> pdf file of site document</a></h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </PerfectScrollbar>
            </React.Fragment>
        )
    }
}
export default SiteDocument;