import React, { Component } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';

const Figure = (props) =>{
    return(
        <React.Fragment>
            <img
                src={props.site.avatarUrl}
                alt={props.site.alt}
            />
        </React.Fragment>
    )
}
const SiteInfo = (props) =>{
    return(
        <React.Fragment>
            <h4>{props.name}</h4>
            <p>{props.SiteName}</p>
            <time>{props.time}</time>
        </React.Fragment>
    )
}
const SiteList = (props) => {
    return(
        <React.Fragment>
            <figure>
                <Figure
                    site={SiteProfile[0].site}
                />
            </figure>
            <div className="content">
                <SiteInfo
                    name = {SiteProfile[0].name}
                    SiteName = {SiteProfile[0].SiteName}
                    time = {SiteProfile[0].time}
                />
            </div>
        </React.Fragment>
            
    )
}
const SiteProfile = [
    {
        site: {
            alt: 'Hello Kitty',
            avatarUrl: '/img/profile.jpg',
          },
          name:'Santosh khatri',
          SiteName:'khatri@fieldsight.org',
          time:'2019/04/06',
    },
]


class SubSiteDetails extends Component {
    
    render() {
        return (
            <React.Fragment>
                <PerfectScrollbar>
                    <SiteList />
                </PerfectScrollbar>
            </React.Fragment>
        );
    }
}

export default SubSiteDetails;
