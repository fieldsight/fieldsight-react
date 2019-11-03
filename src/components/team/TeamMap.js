import React, { createRef } from "react";
import {
    Map as LeafletMap,
    GeoJSON,
    Marker,
    Popup,
    TileLayer,
    LayersControl
} from "react-leaflet";
import L, { latLngBounds } from "leaflet";
import 'react-bootstrap-multiselect/css/bootstrap-multiselect.css'
import { Button } from "react-bootstrap";
import Select from 'react-select';
import './teamCss.css'
import axios from 'axios'
import { List } from 'react-content-loader'


require('leaflet.vectorgrid/dist/Leaflet.VectorGrid.bundled');

// const WrappedVectorTileLayer = withLeaflet(VectorTileLayer);

const { BaseLayer, Overlay } = LayersControl;



class TeamMap extends React.Component {
    state = {
        point: [
            {
                type: "FeatureCollection",
                features: [
                    {
                        type: "Feature",
                        properties: {},
                        geometry: {
                            type: "Point",
                            coordinates: [84.90234375, 27.761329874505233]
                        }
                    },
                    {
                        type: "Feature",
                        properties: {},
                        geometry: {
                            type: "Point",
                            coordinates: [87.5390625, 27.293689224852407]
                        }
                    },
                    {
                        type: "Feature",
                        properties: {},
                        geometry: {
                            type: "Point",
                            coordinates: [81.474609375, 29.38217507514529]
                        }
                    },
                    {
                        type: "Feature",
                        properties: {},
                        geometry: {
                            type: "Point",
                            coordinates: [85.3857421875, 27.566721430409707]
                        }
                    }
                ]
            }
        ],
        Countries: null,
        Oraganization: null,
        selectedOption: [],
        selectedOptionOrg: [],
        // countriesSelection:false,
        ProjectsData: null,
        layerGroup: L.featureGroup(),
        loader: true

    };



    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.mapRef = createRef();
        this.groupRef = createRef();
    }

    handleClick(e) {

        const map = this.mapRef.current.leafletElement;
        const group = this.groupRef.current.leafletElement;
        map.fitBounds(group.getBounds());





    }
    handleChange = (e) => {
        console.log(e)
        // const newa=this.state.selectedOption.push(e[0].value);
        // e==null?this.state.selectedOption=[]:this.state.selectedOption.push(e[e.length-1].value);
        this.state.selectedOption = []
        this.state.cpk = []

        if (e !== null) {
            e.map((el) => {
                this.state.selectedOption.push(el.value)
            })
            console.log(this.state.selectedOption);
        }



    }
    handleChangeOrg = (e) => {
        console.log(e)
        // const newa=this.state.selectedOption.push(e[0].value);
        // e==null?this.state.selectedOption=[]:this.state.selectedOption.push(e[e.length-1].value);
        this.state.selectedOptionOrg = []
        this.state.cpk = []

        if (e !== null) {
            e.map((el) => {
                this.state.selectedOptionOrg.push(el.value)
            })
            console.log(this.state.selectedOptionOrg);
        }



    }

    popUpClick = (e) => {
        this.props.popupCLick('detailsmap', e)




    }

    onApply = () => {

        const newData = this.state.ProjectsData.filter((e) => {
            // console.log(this.state.selectedOption.includes(e.organization__country), e.organization__country)
            if (this.state.selectedOption.length > 0 && this.state.selectedOptionOrg.length > 0) {
                console.log("BOTH", this.state.selectedOption.includes(e.organization__country) && this.state.selectedOptionOrg.includes(e.organization))



                return this.state.selectedOption.includes(e.organization__country) || this.state.selectedOptionOrg.includes(e.organization)
            }
            else if (this.state.selectedOption.length == 0 && this.state.selectedOptionOrg.length > 0) {
                console.log("ORG")

                return this.state.selectedOptionOrg.includes(e.organization)
            }
            else if (this.state.selectedOption.length > 0 && this.state.selectedOptionOrg.length == 0) {
                console.log("CNTRY")

                return this.state.selectedOption.includes(e.organization__country)
            }
            else if (this.state.selectedOption.length == 0 && this.state.selectedOptionOrg.length == 0) {


                return true
            }
        })
        const map = this.mapRef.current.leafletElement;
        this.state.layerGroup.eachLayer((l) => this.state.layerGroup.removeLayer(l))


        // var layerGroup=L.featureGroup()

        // console.log("NEW DATA",newData)
        newData.map((e) => {
            var popup = "<div class='popup'><h6><strong>Name: </strong>" + e.name + "</h6>" +
                "<h6><strong>Address: </strong>" + e.address + "</h6>" +
                "<h6><strong>Sites: </strong> " + e.sites_count + "</h6>" +
                "<button id='popButton'>View Details</button>" + "</div>"
            var mrk = L.marker(e.latlng).bindPopup(popup)
            mrk.on('click', () => document.getElementById('popButton').addEventListener('click', () => this.popUpClick(e.pk)))


            mrk.addTo(this.state.layerGroup)
            // map.fitBounds(this.state.layerGroup.getBounds())

        })
        map.fitBounds(this.state.layerGroup.getBounds());
        // map.addLayer(this.state.layerGroup)
        // this.setState({layerGroup:layerGroup})





    }
    getColor = (d) => {
        return d > 250 ? '#800026' :
            d > 200 ? '#BD0026' :
                d > 150 ? '#E31A1C' :
                    d > 100 ? '#FC4E2A' :
                        d > 50 ? '#FD8D3C' :
                            '#FFEDA0';
    }

    componentDidMount() {
        console.log("DIdmount");
        const map = this.mapRef.current.leafletElement;
        map.createPane('world_shp');
        map.getPane('world_shp').style.zIndex = 250;
        // map.addLayer(this.state.layerGroup)
        this.state.layerGroup.on('click', (e) => {
            console.log(e, "event", document.getElementsByClassName('popButton'));
            var a = document.getElementsByClassName('popButton')


            // document.getElementsByClassName('popButton').addEventListener('click', () => {

            //     console.log("inside")
            //     this.popUpClick(this.state.prjidtosend)
            // })
            for (var i = 0; i < a.length; i++) {
                a[i].addEventListener('click', () => this.popUpClick(this.state.prjidtosend));
            }
        })



        var vectorTileOptions = {

            vectorTileLayerStyles: {
                'world': function () {
                    return {
                        fillColor: "red",
                        fillOpacity: 0.02,
                        weight: 0.3,
                        opacity: 0.0,
                        color: 'red',
                        fill: true,
                    }
                },
                zIndex: 1000

            },
            tms: true,
            interactive: true, // Make sure that this VectorGrid fires mouse/pointer events
            pane: "world_shp",
            getFeatureId: function (feature) {

                return feature.properties.id;
            }
        }

        const url = 'http://139.59.67.104:8080/geoserver/gwc/service/tms/1.0.0/Naxa:world@EPSG%3A900913@pbf/{z}/{x}/{-y}.pbf'
        // map.on('baselayerchange')

        var world = L.vectorGrid.protobuf(url, vectorTileOptions)
        for (var i = 1; i <= 252; i++) {

            world.setFeatureStyle(i, {
                fillColor: this.getColor(i),
                fillOpacity: 0.4,
                fill: true,
                opacity: 0.4,
                color: 'black',
                weight: 0.3
            })

        }


        world.addTo(map);



        axios.get('fv3/api/map/countries/')
            .then(response => {
                var neww = []
                response.data.data.map((e) => {
                    neww.push({ value: e.pk, label: e.name })

                })

                this.setState({ Countries: neww })

            })
        axios.get('fv3/api/map/organizations/')
            .then(response => {
                console.log(response.data)
                var neww = []
                response.data.map((e) => {
                    neww.push({ value: e.pk, label: e.name })

                })

                this.setState({ Oraganization: neww })
                console.log("ORAGANIZATION", this.state.Oraganization)

            })

        axios.get('fv3/api/map/projects/')
            .then(response => {
                console.log(response)
                this.setState({ ProjectsData: response.data.data })
                const map = this.mapRef.current.leafletElement;
                response.data.data.map((e) => {
                    const name = e.name



                    var popup = "<div class='popup'><h6><strong>Name: </strong>" + name + "</h6>" +
                        "<h6><strong>Address: </strong>" + e.address + "</h6>" +
                        "<h6><strong>Sites: </strong> " + e.sites_count + "</h6>" +
                        "<button class='popButton'>View Details</button>" + "</div>"
                    var mrk = L.marker(e.latlng).bindPopup(popup)
                    mrk.on('click', () => {

                        this.setState({ prjidtosend: e.pk })
                    })

                    mrk.addTo(this.state.layerGroup)
                    // map.fitBounds(layerGroup.getBounds())


                })

                this.setState({ loader: false })




            })


        var legend = L.control({ position: 'bottomright' });

        legend.onAdd =  (map) =>{

            var div = L.DomUtil.create('div', 'info legend'),
                grades = [0,50, 100,150, 200, 250],
                labels = [];
            div.innerHTML+="<h6>Legend</h6>"

            // loop through our density intervals and generate a label with a colored square for each interval
            for (var i = 0; i < grades.length; i++) {
                div.innerHTML +=
                    '<i style="background:' + this.getColor(grades[i] + 1) + '"></i> ' +
                    grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
            }

            return div;
        };

        legend.addTo(map);

        map.on('zoomend', ()=> {
            var zoomlevel = map.getZoom();
                if (zoomlevel  <= 2){
                    if (map.hasLayer(this.state.layerGroup)) {
                        map.removeLayer(this.state.layerGroup);
                    } 
                        
                        
                    }
                    else{
                        if (!map.hasLayer(this.state.layerGroup)) {
                            map.addLayer(this.state.layerGroup);
                        } 

                    }
                    
                
            });











    }
    render() {

        // this.state.point[0].features.forEach(data => {
        //     bounds.extend([
        //         data.geometry.coordinates[1],
        //         data.geometry.coordinates[0]
        //     ]);
        // });

        return (
            <>
                {this.state.loader && <div className='loader'>
                    <img src={require('./loaderr.gif')}></img>

                </div>}
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', backgroundColor: 'grey' }}>

                    {this.state.Countries !== null ? <Select
                        // value={this.state.selectedOption}
                        onChange={this.handleChange}
                        options={this.state.Countries}
                        placeholder="Countries"
                        className='multiselect'
                        onSelectResetsInput={false}
                        isMulti
                    /> : <img src={require('./giphy.gif')} style={{ height: 30, width: 30 }} alt="loading..." />}
                    {this.state.Oraganization !== null ? <Select

                        onChange={this.handleChangeOrg}
                        options={this.state.Oraganization}
                        placeholder="Organization"
                        className='multiselect'
                        isMulti
                    /> : <img src={require('./giphy.gif')} style={{ height: 30, width: 30 }} alt="loading..." />}
                    <Button style={{ margin: 5 }} onClick={this.onApply}>Apply</Button>




                </div>
                {/* <div style={{height:500,}} ></div> */}

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
                    // bounds={bounds}
                    ref={this.mapRef}
                    style={{ height: 700, width: '100%' }}

                    onClick={this.handleClick}
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
                    {/* <GeoJSON
                        ref="marker1"
                        data={this.state.point}
                        // onEachFeature={this.onEachFeaturePoint.bind(this)}
                        pointToLayer={this.pointToLayer.bind(this)}
                        ref={this.groupRef}
                        load={this.handleClick}
                    /> */}
                    {/* {   
                        this.state.ProjectsData!=null&&this.state.ProjectsData.map((e)=><Marker position={e.latlng}></Marker>)
                        } */}


                </LeafletMap>

            </>

        );
    }
}
export default TeamMap;
