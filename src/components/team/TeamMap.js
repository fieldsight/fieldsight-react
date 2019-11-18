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
import Icon from '../../static/images/marker.png';
import 'animate.css/animate.min.css'
require('./functionss')

require('leaflet.vectorgrid/dist/Leaflet.VectorGrid.bundled');

// const WrappedVectorTileLayer = withLeaflet(VectorTileLayer);

const { BaseLayer, Overlay } = LayersControl;



class TeamMap extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            Countries: null,
            Oraganization: null,
            selectedOption: [],
            selectedOptionOrg: [],
            // countriesSelection:false,
            ProjectsData: null,
            layerGroup: L.featureGroup(),
            loader: true,
            zoom: true,
            projectcount: null,
            baselayer: false,
            clicked: true,
            vectorGrid:''
    
        };
        this.mapRef = createRef();
        this.baseLayer = createRef();
        this.maxCount = '';
        this.minCount = '';
        this.rangearay = '';
        this.bounds = [[81.95964721919566, 138.2253411577724],
        [-55.80663393131742, -118.2125923894173]]

    }

    handleChange = (e) => {
        this.state.selectedOption = []
        this.state.cpk = []

        if (e !== null) {
            e.map((el) => {
                this.state.selectedOption.push(el.value)
            })
            // console.log(this.state.selectedOption);
        }
    }

    handleChangeOrg = (e) => {
        this.state.selectedOptionOrg = []
        this.state.cpk = []

        if (e !== null) {
            e.map((el) => {
                this.state.selectedOptionOrg.push(el.value)
            })
        }

    }

    popUpClick = (e) => {
        this.props.popupCLick('detailsmap', e)

    }

    resetworldStyle = (world) => {
        for (var i = 0; i < this.state.projectcount.length; i++) {
            world.setFeatureStyle(this.state.projectcount[i].country, {
                fillColor: 'black',
                fillOpacity: 0,
                color: 'black',
                fill: true,
                opacity: 0.5,
                weight: 0.3
            })
        }
    }

    getColor = (d) => {
        var reversecolors = ['#111359', '#1C2095', '#2226B3', '#2D33EE', '#5055F8', '#9C9EF3'];
        var colors = reversecolors.reverse();
        var customrange = [0, 5, 10, 20, 50, 100]
for (var i = customrange.length - 1; i >= 0; i--) {

            if (d <= this.minCount) {
                return 'white';
            }
            if (d >= this.maxCount) {
                return colors[colors.length - 1];
            }

            if (d > customrange[i]) {
                return colors[i];
            }
        }
    }

    setVectorGridStyle=(world)=>{
        for (var i = 0; i < this.state.projectcount.length; i++) {
            // console.log(i)
            world.setFeatureStyle(this.state.projectcount[i].country, {
                fillColor: this.getColor(parseInt(this.state.projectcount[i]['projects'])),
                fillOpacity: 1,
                fill: true,
                opacity: 1,
                color: 'white',
                weight: 0.3

            })
        }
    }

    onProjectcountload = () => {
        const url = 'https://apps.naxa.com.np/geoserver/gwc/service/tms/1.0.0/Naxa:final_world@EPSG%3A900913@pbf/{z}/{x}/{-y}.pbf'
        // map.on('baselayerchange')
        const map = this.mapRef.current.leafletElement;

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
            noWrap: true,
            interactive: true, // Make sure that this VectorGrid fires mouse/pointer events
            pane: "world_shp",
            getFeatureId: function (feature) {

                return feature.properties.pk;
            }
        }

        var world = L.vectorGrid.protobuf(url, vectorTileOptions)
      
        this.setVectorGridStyle(world)

        var info = L.control({ position: 'topright' });
        info.onAdd = (map) => {

            var div1 = L.DomUtil.create('div', 'hoverinfo')

            // div1.innerHTML += "<h5>Legend</h5>"
            // div1.innerHTML += "<h6>No. of Projects</h6>"
            return div1

        }
        info.addTo(map)
        world.on('mouseover', (e) => {
            var count;
            for (var i = 0; i < this.state.projectcount.length; i++) {

                if (e.layer.properties.pk == this.state.projectcount[i]['country']) {
                    count = this.state.projectcount[i]['projects']
                }
            }
            var p = count <= 1 ? " Project" : " Projects"
            document.getElementsByClassName('hoverinfo')[0].innerHTML = "<text > <strong>" + e.layer.properties.COUNTRY + " </strong></text><br>" +
                "<text><strong> " + count + "</strong></text><h7>" + p + "</h7>"
            // L.popup().setLatLng(e.latlng).setContent("<h6>Country: " + e.layer.properties.COUNTRY + "</h6>" +
            //     "<h6>ProjectCount: " +count + "</h6>"
            // )
            //     .openOn(map)
            var filtered = this.state.projectcount.filter((i) => {

                return e.layer.properties.pk == i.country
            })

            {
                this.state.clicked && world.setFeatureStyle(e.layer.properties.pk, {
                    fillColor: this.getColor(parseInt(filtered[0]['projects'])),
                    fillOpacity: 1,
                    fill: true,
                    opacity: 0.4,
                    color: 'blue',
                    weight: 2
                })
            }

        });
        world.on('mouseout', (e) => {
            var filtered = this.state.projectcount.filter((i) => {
                return e.layer.properties.pk == i.country
            })

            var zoom = map.getZoom()

            {
                this.state.clicked && world.setFeatureStyle(e.layer.properties.pk, {
                    fillColor: this.getColor(parseInt(filtered[0]['projects'])),
                    fillOpacity: 1,
                    fill: true,
                    opacity: 1,
                    color: 'white',
                    weight: 0.3
                })
            }
        });

        world.on('click', (e) => {
            var s = eval(e.layer.properties.BBOX)
            this.setState({ clicked: false })

            var first = [];
            var second = [];
            for (var i = 0; i < s.length; i++) {
                if (i < 2) {
                    first.push(s[i])
                }
                else {
                    second.push(s[i])

                }
            }
            first.reverse();
            second.reverse();
            var bnds = [first, second]
            map.fitBounds(bnds)
            this.addCountryProject(e)
            this.resetworldStyle(world)

            world.setFeatureStyle(e.layer.properties.pk, {
                fillColor: 'grey',
                fillOpacity: 0.0,
                fill: true,
                opacity: 0.6,
                color: '#070CAA',
                weight: 1.5

            })
            map.addLayer(this.baseLayer.current.layer)


            this.setState({ baselayer: true })
        })

        this.setState({vectorGrid:world})
        world.addTo(map);

        var legend = L.control({ position: 'bottomleft' });

        legend.onAdd = (map) => {

            var div = L.DomUtil.create('div', 'info legend'),
                grades = [0, 5, 10, 20, 50, 100];
            div.innerHTML += "<h6>Legend</h6>"
            div.innerHTML += "<h7>No. of Projects</h7><br>"

            div.innerHTML +=
                '<i style="background:' + this.getColor(0) + '; border:1px solid #d5d5d5"></i> ' +
                '0' + '<br>'
            // loop through our density intervals and generate a label with a colored square for each interval
            for (var i = 0; i < grades.length - 1; i++) {
                div.innerHTML +=
                    '<i style="background:' + this.getColor(grades[i + 1]) + '"></i> ' +
                    grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
            }

            div.innerHTML +=
                '<i style="background:' + this.getColor(200) + '"></i> ' +
                '100+' + '<br>'

            return div;
        };

        legend.addTo(map);
    }

    addCountryProject = (e) => {
        const map = this.mapRef.current.leafletElement;
        map.addLayer(this.state.layerGroup)
        const newData = this.state.ProjectsData.filter((i) => i.organization__country == e.layer.properties.pk)

        this.state.layerGroup.eachLayer((l) => this.state.layerGroup.removeLayer(l))
        
        newData.map((e) => {
            var popup = "<div class='popup'>" + "<strong><h5>" + e.name + "</h5></strong>" +
                "<h6> " + e.address + "</h6>" +
                "<h6>Sites: " + e.sites_count + "</h6>" +
                "<button class='popButton'>Go to Project</button>" + "</div>"
            var mrk = L.marker(e.latlng, { icon: new L.icon({ iconUrl: '../../static/images/marker.png', iconSize: [28, 28] }) }).bindPopup(popup)
            mrk.on('click', () => {
                var classes = document.getElementsByClassName('popButton')
                for (var i = 0; i < classes.length; i++) {
                    classes[i].addEventListener('click', () => this.popUpClick(e.pk))
                }
            })

            mrk.addTo(this.state.layerGroup)
        })
    }

    onApply = () => {

        const newData = this.state.ProjectsData.filter((e) => {
            // console.log(this.state.selectedOption.includes(e.organization__country), e.organization__country)
            if (this.state.selectedOption.length > 0 && this.state.selectedOptionOrg.length > 0) {
                return this.state.selectedOption.includes(e.organization__country) || this.state.selectedOptionOrg.includes(e.organization)
            }
            else if (this.state.selectedOption.length == 0 && this.state.selectedOptionOrg.length > 0) {

                return this.state.selectedOptionOrg.includes(e.organization)
            }
            else if (this.state.selectedOption.length > 0 && this.state.selectedOptionOrg.length == 0) {

                return this.state.selectedOption.includes(e.organization__country)
            }
            else if (this.state.selectedOption.length == 0 && this.state.selectedOptionOrg.length == 0) {


                return true
            }
        })
        const map = this.mapRef.current.leafletElement;
        this.state.layerGroup.eachLayer((l) => this.state.layerGroup.removeLayer(l))

        // console.log("NEW DATA", newData)
        newData.map((e) => {
            var popup = "<div class='popup'><h6><strong>Name: </strong>" + e.name + "</h6>" +
                "<h6><strong>Address: </strong>" + e.address + "</h6>" +
                "<h6><strong>Sites: </strong> " + e.sites_count + "</h6>" +
                "<button id='popButton'>View Details</button>" + "</div>"
            var mrk = L.marker(e.latlng, { icon: new L.icon({ iconUrl: '../../static/images/marker.png', iconSize: [28, 28] }) }).bindPopup(popup)
            mrk.on('click', () => document.getElementById('popButton').addEventListener('click', () => this.popUpClick(e.pk)))


            mrk.addTo(this.state.layerGroup)
            // map.fitBounds(this.state.layerGroup.getBounds())

        })
        map.flyToBounds(this.state.layerGroup.getBounds(), { duration: 1.5 });
        // map.addLayer(this.state.layerGroup)
        // this.setState({layerGroup:layerGroup})

    }

    componentDidMount() {
        (function () {
            var originalInitTile = L.GridLayer.prototype._initTile
            L.GridLayer.include({
                _initTile: function (tile) {
                    originalInitTile.call(this, tile);

                    var tileSize = this.getTileSize();

                    tile.style.width = tileSize.x + 1 + 'px';
                    tile.style.height = tileSize.y + 1 + 'px';
                }
            });
        })()

        // console.log("DIdmountasdasdkas");
        var map = this.mapRef.current.leafletElement;
        map.createPane('world_shp');
        map.getPane('world_shp').style.zIndex = 250;
        map.addLayer(this.state.layerGroup)
        this.state.layerGroup.on('click', (e) => {
            var a = document.getElementsByClassName('popButton')

            // document.getElementsByClassName('popButton').addEventListener('click', () => {

            for (var i = 0; i < a.length; i++) {
                a[i].addEventListener('click', () => this.popUpClick(this.state.prjidtosend));
            }
        })

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
                // console.log(response.data)
                var neww = []
                response.data.map((e) => {
                    neww.push({ value: e.pk, label: e.name })

                })

                this.setState({ Oraganization: neww })
                // console.log("ORAGANIZATION", this.state.Oraganization)

            })

        axios.get('fv3/api/map/projects/')
            .then(response => {
                // console.log(response)
                this.setState({ ProjectsData: response.data.data, loader: false })
                const map = this.mapRef.current.leafletElement;
                response.data.data.map((e) => {




                    // var popup = "<div class='popup'><h6><strong>Name: </strong>" + name + "</h6>" +
                    //     "<h6><strong>Address: </strong>" + e.address + "</h6>" +
                    //     "<h6><strong>Sites: </strong> " + e.sites_count + "</h6>" +
                    //     "<button class='popButton'>View Details</button>" + "</div>"
                    // var mrk = L.marker(e.latlng, { icon: new L.icon({ iconUrl: '../../static/images/marker.png', iconSize: [28, 28] }) }).bindPopup(popup)
                    // mrk.on('click', () => {

                    //     this.setState({ prjidtosend: e.pk })
                    // })

                    // mrk.addTo(this.state.layerGroup)
                    // map.fitBounds(layerGroup.getBounds())


                })
            })

        axios.get('fv3/api/map/projects-countries/')
            .then(response => {
                var Countarray = [];
                this.setState({ projectcount: response.data })

                for (var i = 0; i < this.state.projectcount.length; i++) {
                    Countarray.push(parseInt(this.state.projectcount[i]['projects']))
                }
                this.maxCount = Math.max(...Countarray);
                this.minCount = Math.min(...Countarray);


                this.rangearay = calculaterange(this.minCount, this.maxCount, 50)

                this.onProjectcountload();
            })

        var refreshmap = L.control({ position: 'topleft' });

        refreshmap.onAdd = (map) => {

            var div = L.DomUtil.create('div', 'refreshmap')
            div.title = 'Refresh Map'

            div.innerHTML += "<img src='../../static/images/refresh.jpg'></img>"
            div.addEventListener('click', () => {

                // var mapp = this.mapRef.current.leafletElement;
                // console.log(this.state.vectorGrid,"VECTOR");

                map.eachLayer((e)=>map.removeLayer(e))
                // console.log(map);
               this.setVectorGridStyle(this.state.vectorGrid);
               this.setState({clicked:true})
               
                map.addLayer(this.state.vectorGrid)
                map.fitBounds(this.bounds)

            })
            return div;
        };

        refreshmap.addTo(map);

        // console.log(this.baseLayer)

    }

    render() {
        var height=window.innerHeight-63.547;
      
        var bounds82 = [[73.62004852294922, 18.168884277343807], [134.76846313476562, 53.55374145507807]]

        return (
            <>
                {this.state.loader && <div className='loader'>
                    <img src={require('../../static/images/ring.gif')}></img>

                </div>}
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', backgroundColor: '#07224C',display:'none' }}>

                    {this.state.Countries !== null ? <Select
                        // value={this.state.selectedOption}
                        onChange={this.handleChange}
                        options={this.state.Countries}
                        placeholder="Countries"
                        className='multiselect'
                        onSelectResetsInput={false}
                        isMulti
                    /> : <img src={require('../../static/images/giphy.gif')} style={{ height: 30, width: 30 }} alt="loading..." />}
                    {this.state.Oraganization !== null ? <Select

                        onChange={this.handleChangeOrg}
                        options={this.state.Oraganization}
                        placeholder="Organization"
                        className='multiselect'
                        isMulti
                    /> : <img src={require('../../static/images/giphy.gif')} style={{ height: 30, width: 30 }} alt="loading..." />}

                    <Button style={{ margin: 5 }} onClick={this.onApply}>Apply</Button>
                    {/* {this.state.zoom ? <h5 className='zoomfor' style={{ marginLeft: 'auto', marginBottom: 0, color: 'white', marginRight: 5 }}>Zoom in for project markers</h5> : ''} */}

                </div>
                {/* <div style={{height:500,}} ></div> */}

                <LeafletMap
                    center={[27, 85]}
                    zoom={1.4}
                    maxZoom={15}
                    attributionControl={true}
                    zoomControl={true}
                    doubleClickZoom={true}
                    scrollWheelZoom={true}
                    dragging={true}
                    animate={true}
                    easeLinearity={0.35}
                    bounds={this.bounds}
                    ref={this.mapRef}
                    style={{ height: height, width: '99.8vw',marginLeft:-22,overflow: 'hidden', }}

                    onClick={this.handleClick}
                >
                    <LayersControl position="topright">
                        <BaseLayer checked={this.state.baselayer ? true : false} ref={this.baseLayer} name="OpenStreetMap">
                            <TileLayer
                                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                noWrap={true}

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
export default TeamMap;
