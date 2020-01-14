import React, { Component } from 'react';
import TeamMap from './TeamMap';
import DetailsMap from './DetailsMap';

class Mapparent extends Component {

    constructor(props) {
      super(props)
    
      this.state = {
         map:'projectmap',
         projectpk:'',
         projectname:''
      };
    };
    popupCLick=(mapstr,e,name)=>{
        console.log(e,name)
        this.setState({projectpk:e})
        this.setState({map:mapstr,projectname:name})
    }
    detailstoprojects=()=>{
        this.setState({map:'projectmap'})
    }
    
    render() {
        return (
            <div>
                {this.state.map=='projectmap'?<TeamMap popupCLick={this.popupCLick} />:<DetailsMap projectname={this.state.projectname} detailstoprojects={this.detailstoprojects} projectpk={this.state.projectpk} />}
            </div>
        );
    }
}

export default Mapparent;