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
const CountContent = (props)=>{
    return (
        <React.Fragment>
            <h4>{props.CountNumber}</h4>
            <h6>{props.CountName}</h6>
        </React.Fragment>
    )
}
const countcard = [
    {
        icon:'map-marker',
        className: "pending",
        CountNumber:'20',
        CountName:'Site Visits In Last 7 Days'
    },
    {
        icon:'thumbs-up',
        CountNumber:'80',
        className: "flagged",
        CountName:'Sumbission In Last 7 Days'
    },
    {
        icon:'users',
        className: "approved",
        CountNumber:'100',
        CountName:'Active Users In Last 7 Days'
    },
]
const CountCard = (props) => {
    return(
        <div className="col-xl-4 col-md-6">
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
    );
}
class BgCounter extends Component {
  render() {
    return (
        <React.Fragment>
            {countcard.map((item,i) => <CountCard item ={item} />)}
        </React.Fragment>
    );
  }
}


export default BgCounter;