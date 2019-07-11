import React, { Component } from 'react';

const CountIcon = (props) => {
    return (
        <React.Fragment>
            <div className={props.className} >
             <i className= {`la la-${props.icon}`}> </i>
            </div>
        </React.Fragment>
    )
}
const CountContent = (props) => {
    return (
        <React.Fragment>
            <h4>{props.CountNumber}</h4>
            <h6>{props.CountName}</h6>
        </React.Fragment>
    )
}
const countcard = [
    {
        icon:'copy',
        className: "pending",
        CountNumber:'20',
        CountName:'Pending submissions'
    },
    {
        icon:'thumbs-up',
        CountNumber:'80',
        className: "approved",
        CountName:'approved submissions'
    },
    {
        icon:'flag',
        className: "flagged",
        CountNumber:'100',
        CountName:'flagged submissions'
    },
    {
        icon:'close',
        className: "rejected",
        CountNumber:'100',
        CountName:'rejected submissions'
    },
]
const CountCard = (props) => {
    return(
        <div className="col-xl-3 col-md-6">
            <div className="count-card">
                <div className="count-icon">
                    <CountIcon
                    className={props.item.className}
                        icon ={props.item.icon}
                    />
                </div>
                <div className="count-content">
                    <CountContent
                    CountNumber = {props.item.CountNumber}
                    CountName = {props.item.CountName}
                    />
                </div>
            </div>
        </div>
    )
}

class DashboardCounter extends Component {
  render() {
    return (
        <React.Fragment>
            {countcard.map((item,i)=> <CountCard item= {item} />)}
        </React.Fragment>
    );
  }
}


export default DashboardCounter;