import React, { Component } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';


const SiteInfo = (props) =>{
    return(
        <React.Fragment>
            <label>{props.label}</label>
            <span>{props.details}</span>
        </React.Fragment>
    )
}
const InfoList = (props) => {
    return(
        <React.Fragment>
            <li>
                <SiteInfo
                    label = {props.item.label}
                    details = {props.item.details}
                />
            </li>
        </React.Fragment>
            
    )
}
const InfoDetails = [
    {
          label:'District :',
          details:'Lalitpur',
    },
    {
        label:'Construction Stage :',
        details:'Lalitpur',
    },
    {
        label:'Community Messenger Visits :',
        details:'Lalitpur',
    },
    {
        label:'Card Type :',
        details:'Lalitpur',
    },
    {
        label:'Slip Number :',
        details:'Lalitpur',
    },
    {
        label:'First Installment :',
        details:'Lalitpur',
    },
    {
        label:'Slip Number :',
        details:'Lalitpur',
    },
    {
        label:'Community Messenger Visits :',
        details:'Lalitpur',
    },
    {
        label:'Card Type :',
        details:'Lalitpur',
    },
    {
        label:'Slip Number :',
        details:'Lalitpur',
    },
    {
        label:'First Installment :',
        details:'Lalitpur',
    },
    {
        label:'Slip Number :',
        details:'Lalitpur',
    },
]


class SubSiteInfo extends Component {
    
    render() {
        return (
            <React.Fragment>
                <PerfectScrollbar>
                    <ul>
                    {InfoDetails.map((item,i) => <InfoList item = {item} />)}
                    </ul>
                </PerfectScrollbar>
            </React.Fragment>
        );
    }
}

export default SubSiteInfo;
