import React,{Component} from "react";
import Edit  from "../common/editProject";
import axios from "axios";

export default class ProjectAdd extends Component{
    state = {
        project: {
          name:"",
          phone: "",
          email: "",
          address: "",
          website: "",
          donor: "",
          public_desc: "",
          cluster_sites: false
        },
        loaded: 0,
        sector: [],
        subSectors: [],
        selectedSector: "",
        selectedSubSector: "",
        position: {
            latitude: "28.3949",
            longitude: "-0.09"
        },
        zoom: 13,
        src: "",
        showCropper: false,
        cropResult: "",
        isLoading: false,
        redirect:false
      };
    componentDidMount(){
      
        const {match:{params:{id}}}=this.props;
        axios.get(`/fv3/api/sectors-subsectors/`)
        .then(res=>{
           this.setState({
                sector:res.data,
                id
             })
          }).catch(err=>{
            console.log(err ,"err");
          }) 
       }
   
     onSubmitHandler = e => {
        e.preventDefault(); 
        const data = {
        organization:this.state.id,
        name:this.state.project.name,
        phone:this.state.project.phone,
        email:this.state.project.email,
        address:this.state.project.address,
        website:this.state.project.website,
        donor:this.state.project.donor,
        public_desc:this.state.project.public_desc,
        cluster_sites:this.state.project.cluster_sites,
        selectedSector:this.state.selectedSector,
        selectedSubSector:this.state.selectedSubSector,
        latitude:this.state.position.latitude,
        longitude: this.state.position.longitude,
        cropResult:this.state.cropResult,
        }
        axios.post(`fv3/api/add-project/${this.state.id}/`, data)
      .then(res => {
       if(res.status === 201){
        this.setState({
          project: {
            name:"",
            phone: "",
            email: "",
            address: "",
            website: "",
            donor: "",
            public_desc: "",
            cluster_sites: false
          },
          loaded: 0,
          sector: [],
          subSectors: [],
          selectedSector: "",
          selectedSubSector: "",
          position: {
              latitude: "28.3949",
              longitude: "-0.09"
          },
          cropResult:"",
          redirect:true
        })
        this.props.history.push(`/project-dashboard/${res.data.id}`);
       }
        
       
      }).catch(err=>{
        console.log(err)
      })
  
        
       
      };
     
    
      onSelectChangeHandler = (e, subSect) => {
        const { value } = e.target;
        if (subSect) {
          const selectedSubSectorId = this.state.subSectors.find(
            subSect => subSect.id === +value
          ).id;
          return this.setState({
            selectedSubSector: selectedSubSectorId
          });
        }
        const selectedSector = this.state.sector.find(sect => sect.id === +value);
        this.setState({
          subSectors: selectedSector.subSectors,
          selectedSector: selectedSector.id
        });
      };
    
      handleCheckboxChange = e =>
        this.setState({
          project: {
            ...this.state.project,
            cluster_sites: e.target.checked
          }
        });
    
      onChangeHandler = (e, position) => {
        const { name, value } = e.target;
        if (position) {
          return this.setState({
            position: {
              ...this.state.position,
              [name]: value
            }
          });
        }
    
        this.setState({
          project: {
            ...this.state.project,
            [name]: value
          }
        });
      };
    
     
    
      readFile = file => {
        const reader = new FileReader();
        reader.onload = () => {
          this.setState({ 
            src: reader.result, 
            showCropper: true });
        };
        reader.readAsDataURL(file[0]);
      };
    
      cropImage = (image) => {
        this.setState({
            cropResult: image,
            showCropper: false,
            src: ""
          });
      };
    
      closeModal = () => {
        this.setState({
          showCropper: false
        });
      };
    
      mapClickHandler = e => {
        this.setState({
          position: {
            ...this.state.position,
            latitude: e.latlng.lat,
            longitude: e.latlng.lng
          }
        });
      };
    render(){ 
      const {
        project:  { name,
        phone,
        email,
        address,
        website,
        public_desc,
        cluster_sites,
        donor,
        logo,
        organization},
        position: {
           latitude,
            longitude },

      } =this.state
     
      
        return(
           <>
           <Edit
            context={this.state.id}
            _isMounted={false}
            onSubmitHandler={this.onSubmitHandler}
            onChangeHandler={this.onChangeHandler}
            sector={this.state.sector}
            onSelectChangeHandler={this.onSelectChangeHandler}
            name={name}
            phone={phone}
            email={email}
            address={address}
            website={website}
            donor={donor}
            public_desc={public_desc}
            cluster_sites={cluster_sites}
            selectedSector={this.state.selectedSector}
            selectedSubSector={this.state.selectedSubSector}
            selectedSubSector={this.selectedSubSector}
            handleCheckbox={this.handleCheckboxChange}
            latitude={latitude}
            longitude={longitude}
            zoom={this.state.zoom}
            mapClickHandler={this.mapClickHandler}
            cropResult={this.state.cropResult}
            showCropper ={this.state.showCropper}
            closeModal ={this.closeModal}
            src={this.state.src}
            cropImage={this.cropImage}
            isLoading={this.state.isLoading}
            subSectors={this.state.subSectors}
            readFile={this.readFile}
            title={"New Project"}
          
             />
           </> 
        )
    }
}