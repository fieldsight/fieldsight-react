import React,{Component, Fragment} from "react";
import SelectElement from "../common/SelectElement";
import axios from "axios";

export default class Select extends Component{
    state={
        selectform:[],
        selected:""
    }
 componentDidMount(){
    this._isMounted = true;
    axios.get(`/fieldsight/api/project/sites/${this.props.data}/`)
    .then(res=>{ 
      console.log(res,"select");
      
      if (this._isMounted) {
        this.setState({
          selectform:res.data,
          selectdata:true
        },()=>console.log(this.state.selectform,"selectform"));
      }
       
        }).catch(err=>{
        console.log(err ,"err");
        
    }) 
 }   
    onchange=e=>{
            this.setState({
                selected:e.target.value
            },() => this.props.selectedValue(this.state.selected))
            
    }
    render(){
      console.log(this.state.selectform);
      
        return(
            <div className="col-xl-4 col-md-6" >
                      
            <SelectElement
                className="form-control"
                options={this.state.selectform.map(selectform => selectform)}
                changeHandler={this.onchange}
                label={this.props.type}
                value={this.props.name}
                
              />
           
           
           </div>
           
        )
    }
}