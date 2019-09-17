import React,{Component} from "react";
import Edit  from "../common/editProject";
import axios from "axios";

export default class ProjectAdd extends Component{
    state = {
        project: {
          name: "",
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
            latitude: "",
            longitude: ""
        },
        zoom: 13,
        src: "",
        showCropper: false,
        cropResult: "",
        isLoading: false
      };
    componentDidMount(){
      
        const {match:{params:{id}}}=this.props;
        axios.get(`/fv3/api/sectors-subsectors/`)
        .then(res=>{
          
            this.setState({
                sector:res.data,
                id

            },()=>console.log(this.state.sector))
            
            
        }).catch(err=>{
            console.log(err ,"err");
            
        }) 
       
    }
   
     
      requestHandler = () => {
        const {
          state: {
            project: {
              name,
              phone,
              email,
              address,
              website,
              public_desc,
              cluster_sites,
              donor,
              logo,
              organization
            },
            position: { latitude, longitude },
            selectedSector,
            selectedSubSector,
            cropResult
          },
          context: { projectId }
        } = this;
    
        const project = {
          name,
          phone,
          email,
          address,
          website,
          donor,
          public_desc,
          cluster_sites,
          ...(cropResult && { logo: cropResult }),
          latitude,
          longitude,
          sector: selectedSector,
          sub_sector: selectedSubSector,
          organization
        };
    
        axios
          .get(`/fv3/api/add-project/${projectId}/`, project, {
            onUploadProgress: progressEvent => {
              this.setState({
                loaded: Math.round(
                  (progressEvent.loaded * 100) / progressEvent.total
                )
              });
            }
          })
          .then(res => {
            this.setState(
              {
                isLoading: false,
                loaded: 0
              },
              () => successToast("Project", "updated")
            );
          })
          .catch(err => {
            this.setState(
              {
                isLoading: false
              },
              errorToast
            );
          });
      };
    
      onSubmitHandler = e => {
        e.preventDefault();
        this.setState(
          {
            isLoading: true
          },
          this.requestHandler
        );
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
        },()=>console.log(this.state.project));
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
      console.log(this.state.position)
      
        return(
           <>
           <Edit
            context={this.state.id}
            _isMounted={false}
            onSubmitHandler={this.handleSubmit}
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