import React, { createRef } from "react";
import {
    Map as LeafletMap,
    GeoJSON,
    Marker,
    Popup,
    TileLayer,
    LayersControl
} from "react-leaflet";
import 'react-bootstrap-multiselect/css/bootstrap-multiselect.css'
import './teamCss.css'
import Axios from "axios";
import { Button } from "react-bootstrap";
import 'leaflet.markercluster/dist/MarkerCluster.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'
import Select from 'react-select';



require('leaflet.markercluster')




const { BaseLayer, Overlay } = LayersControl;



class DetailsMap extends React.Component {
    state = {
        Data:[],
        regions:null,
        sites:null,
        selectedRegion:[],
        selectedSites:[],
        markers: L.markerClusterGroup(),


    };



    constructor(props) {
        super(props);
        this.mapRef = createRef();
        this.newdata=[]
        
    }



    popUpClick = () => {
        this.props.popupCLick()




    }
    
    // `fv3/api/map/sites/?project_id=${this.props.projectpk}`
    fetchigAPI = (url) => {

        console.log("url", url);


        Axios.get(url)
            .then(response => {
                const map = this.mapRef.current.leafletElement;

                console.log("1st", response.data.results)

                response.data.results.map((e) => {
                    var mrk = L.marker(e.latlng)
                    mrk.addTo(this.state.markers)
                    this.newdata.push(e)
                })

                response.data.next && this.fetchigAPI(response.data.next)
                map.fitBounds(this.state.markers.getBounds())
                

            })
            this.setState({Data:this.newdata})


    }
    fetchregionNsites=(url)=>{
        console.log(url)
        Axios.get(url)
        .then(response=>{console.log("REss",response.data)
        var newwregion = []
        var newwsites=[]
        response.data.regions.map((e) => {
            newwregion.push({ value: e.id, label: e.name })

        })
        response.data.site_types.map((e) => {
            newwsites.push({ value: e.id, label: e.name })

        })
        this.setState({regions:newwregion,sites:newwsites})
        
    }
        )


    }
    handleChangeRegions = (e) => {
        console.log(e)
        // const newa=this.state.selectedOption.push(e[0].value);
        // e==null?this.state.selectedOption=[]:this.state.selectedOption.push(e[e.length-1].value);
        this.state.selectedRegion=[]
     

        if (e !== null) {
            e.map((el) => {
                this.state.selectedRegion.push(el.value)
            })
            console.log(this.state.selectedRegion);
        }



    }
    handleChangeSites = (e) => {
        console.log(e)
        // const newa=this.state.selectedOption.push(e[0].value);
        // e==null?this.state.selectedOption=[]:this.state.selectedOption.push(e[e.length-1].value);
     
        this.state.selectedSites=[]

        if (e !== null) {
            this.state.selectedSites=[]
            e.map((el) => {
                this.state.selectedSites.push(el.value)
            })
            console.log(this.state.selectedSites);
        }



    }

    onApply=()=>{
        console.log('data',this.state.Data);
        
        
        const newData = this.state.Data.filter((e) => {
            
            if (this.state.selectedRegion.length > 0 && this.state.selectedSites.length > 0) {
               



                return this.state.selectedRegion.includes(e.region) || this.state.selectedSites.includes(e.type)
            }
            else if (this.state.selectedRegion.length == 0 && this.state.selectedSites.length > 0) {

                return this.state.selectedSites.includes(e.type)
            }
            else if (this.state.selectedRegion.length > 0 && this.state.selectedSites.length == 0) {
               

                return this.state.selectedRegion.includes(e.region)
            }
            else if (this.state.selectedRegion.length == 0 && this.state.selectedSites.length == 0) {


                return true
            }
        })

        const map = this.mapRef.current.leafletElement;
        this.state.markers.eachLayer((l) => this.state.markers.removeLayer(l))
        newData.map((e) => {
            
            var mrk = L.marker(e.latlng)
            mrk.addTo(this.state.markers)
            // map.fitBounds(this.state.layerGroup.getBounds())

        })
        console.log(newData)

        
        
    }

    componentDidMount() {
        const map = this.mapRef.current.leafletElement;
        map.addLayer(this.state.markers)
        this.fetchigAPI(`fv3/api/map/sites/?project_id=${this.props.projectpk}`)
        this.fetchregionNsites(`fv3/api/project-regions-types/${this.props.projectpk}/`)
    


    }
    render() {


        return (
            <>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', backgroundColor: 'grey' }}>
                <Button onClick={() => this.props.popupCLick('projectmap', '')}>Back</Button>

                    {this.state.regions !== null ? <Select
                        // value={this.state.selectedOption}
                        onChange={this.handleChangeRegions}
                        options={this.state.regions}
                        placeholder="Regions"
                        className='multiselect'
                        onSelectResetsInput={false}
                        isMulti
                    /> : <img src={require('./giphy.gif')} style={{ height: 30, width: 30 }} alt="loading..." />}
                     {this.state.sites !== null ? <Select
                        // value={this.state.selectedOption}
                        onChange={this.handleChangeSites}
                        options={this.state.sites}
                        placeholder="Sites"
                        className='multiselect'
                        onSelectResetsInput={false}
                        isMulti
                    /> : <img src={require('./giphy.gif')} style={{ height: 30, width: 30 }} alt="loading..." />}
                <Button onClick={this.onApply}>Apply</Button>

     
             
                </div>

                <LeafletMap
                    center={[27, 85]}
                    zoom={2}
                    maxZoom={15}
                    attributionControl={true}
                    zoomControl={true}
                    doubleClickZoom={true}
                    scrollWheelZoom={true}
                    dragging={true}
                    animate={true}
                    easeLinearity={0.35}
                    ref={this.mapRef}
                    style={{ height: 700, width: '100%' }}

                >
                    <LayersControl position="topright">
                        <BaseLayer checked name="OpenStreetMap">
                            <TileLayer
                                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                        </BaseLayer>
                        <BaseLayer name="Google Streets">
                            <TileLayer
                                attribution='&amp;copy <a href="http://maps.google.com">Google Maps</a> contributors'
                                url="http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
                                maxZoom={20}
                                subdomains={["mt0", "mt1", "mt2", "mt3"]}
                            />
                        </BaseLayer>
                        <BaseLayer name="Google Hybrid">
                            <TileLayer
                                attribution='&amp;copy <a href="http://maps.google.com">Google Maps</a> contributors'
                                url="http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}"
                                maxZoom={20}
                                subdomains={["mt0", "mt1", "mt2", "mt3"]}
                            />
                        </BaseLayer>
                        <BaseLayer name="Google Satellite">
                            <TileLayer
                                attribution='&amp;copy <a href="http://maps.google.com">Google Maps</a> contributors'
                                url="http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
                                maxZoom={20}
                                subdomains={["mt0", "mt1", "mt2", "mt3"]}
                            />
                        </BaseLayer>
                        <BaseLayer name="Google Terrain">
                            <TileLayer
                                attribution='&amp;copy <a href="http://maps.google.com">Google Maps</a> contributors'
                                url="http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}"
                                maxZoom={20}
                                subdomains={["mt0", "mt1", "mt2", "mt3"]}
                            />
                        </BaseLayer>
                    </LayersControl>



                </LeafletMap>

            </>

        );
    }
}
export default DetailsMap;
