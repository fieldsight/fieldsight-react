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
import ContentLoader from "react-content-loader";


require('leaflet.markercluster')




const { BaseLayer, Overlay } = LayersControl;



class DetailsMap extends React.Component {
    state = {
        markers: L.markerClusterGroup()

    };



    constructor(props) {
        super(props);
        this.mapRef = createRef();
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
                    var mrk = L.circleMarker(e.latlng)
                    mrk.addTo(this.state.markers)
                })
                response.data.next && this.fetchigAPI(response.data.next)
                map.fitBounds(this.state.markers.getBounds())

            })

    }


    componentDidMount() {
        const map = this.mapRef.current.leafletElement;

        // map.addLayer(layerGroup)
        map.addLayer(this.state.markers)

        this.fetchigAPI(`fv3/api/map/sites/?project_id=${this.props.projectpk}`)


        console.log("1st")


    }
    render() {


        return (
            <>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', backgroundColor: 'grey' }}>
                    <Button onClick={() => this.props.popupCLick('projectmap', '')}>Back</Button>
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
