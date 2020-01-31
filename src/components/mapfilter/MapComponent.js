import React, { PureComponent } from 'react';
import gradstop from 'gradstop';

import {
  Map,
  TileLayer,
  Popup,
  CircleMarker,
  withLeaflet,
  LayersControl,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import PrintControlDefault from 'react-leaflet-easyprint';
import MeasureControlDefault from 'react-leaflet-measure';
import 'react-leaflet-markercluster/dist/styles.min.css';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import ReactLeafletSearch from 'react-leaflet-search';

import { getSeconds } from 'date-fns';

const { BaseLayer, Overlay } = LayersControl;

const PrintControl = withLeaflet(PrintControlDefault);
const MeasureControl = withLeaflet(MeasureControlDefault);
class MapComponent extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      lat: 27.7172,
      lng: 85.324,
      projectsLegend: null,
      progressLegend: [],
      statusLegend: [],
      sitetypeLegend: [],
      regionLegend: [],
    };
  }

  componentDidUpdate(prevProps) {
    // let allLayers = null;
    const {
      clonePrimaryGeojson,
      colorBySelection,
      progressLegend,
      statusLegend,
    } = this.props;
    const {
      mapRef,
      groupRef,
      projectsRegionTypes,
      projectsList,
    } = this.props;
    const map = mapRef.current.leafletElement;
    const clearProgressLegend = () => {
      this.setState({ progressLegend: [] });
    };
    const clearStatusLegend = () => {
      this.setState({ statusLegend: [] });
    };
    const clearSiteTypeLegend = () => {
      this.setState({ sitetypeLegend: [] });
    };
    const clearRegionLegend = () => {
      this.setState({ regionLegend: [] });
    };
    // const featuregroup = groupRef.current.leafletElement;
    // if (prevProps.geojson !== geojson) {
    //   map.fitBounds(featuregroup.getBounds());
    // }
    // let mcg = null;
    if (
      prevProps.colorBySelection !== colorBySelection ||
      (prevProps.clonePrimaryGeojson !== clonePrimaryGeojson &&
        projectsRegionTypes)
    ) {
      const allLayers = groupRef.current.leafletElement.getLayers();

      const formStatusColor = [
        '#0080ff',
        '#FF0000',
        '#FFFF00',
        '#069806',
      ];
      const progressColor = [
        '#FF0000',
        '#f66565',
        '#f4c08c',
        '#FFFF00',
        '#7FFF00',
        '#00FF00',
        '#069806',
      ];
      const otherColors = [
        '#e69109',
        '#f0e111',
        '#9ff035',
        '#34ede1',
        '#63a4ff',
        '#8629ff',
        '#e553ed',
        '#f2575f',
        '#915e0d',
        '#a1970d',
        '#4f7d14',
        '#07aba1',
        '#1d4c8f',
        '#491991',
        '#610766',
        '#6e0208',
      ];
      const getGradient = (start, middle, end, gradlength) => {
        const gradient = gradstop({
          stops: gradlength,
          inputFormat: 'hex',
          colorArray: [start, middle, end],
        });
        // console.log(gradient, "gradient");

        return gradient;
      };
      const siteTypes = projectsRegionTypes[0].site_types.map(
        data => {
          return data.name;
        },
      );
      const progressList = [
        '0%',
        '1-20%',
        '21-40%',
        '41-60%',
        '61-80%',
        '81-99%',
        '100%',
      ];
      const statusList = [
        'Pending',
        'Rejected',
        'Flagged',
        'Approved',
      ];
      const regions = projectsRegionTypes[0].regions.map(data => {
        return data.name;
      });
      const projectLists = projectsList.map(data => {
        return data.name;
      });
      // console.log(siteTypes, 'site_types');
      // console.log(regions, 'regions');
      // console.log(projectLists, 'projectList');
      // add more colors if the length is more than 16. For projects, site_types and regions
      let slength = 0;
      let rlength = 0;
      if (siteTypes != null) {
        slength = siteTypes.length;
      }
      if (regions != null) {
        rlength = regions.length;
      }
      const maxLengthValue = Math.max(
        projectLists.length,
        slength,
        rlength,
      );
      // console.log(maxLengthValue, 'maxlength');
      // console.log(otherColors, 'othercolors before loop');
      if (maxLengthValue > 16) {
        const start = '#09e609'; // '#ff6600';
        const medium = '#e67f09'; // '#b76e79';
        const end = '#b207e6'; // '#1e90ff';
        const extraColor = getGradient(
          start,
          medium,
          end,
          maxLengthValue - 16 + 2,
        );

        for (let x = 0; x < extraColor.length; x += 1) {
          otherColors.push(extraColor[x]);
        }
        // console.log(otherColors, 'othercolors after loop');
      }
      //   const v = mcg.getLayers();

      //   console.log(v, 'mcg');
      if (colorBySelection === 'progress') {
        clearProgressLegend();
        progressList.forEach((element, key) => {
          const Progress = (
            <>
              <div style={{ marginTop: '-8px' }}>
                <div
                  className="circle"
                  style={{
                    border: '1px solid black',
                    background: progressColor[key],
                  }}
                />
                <span>{element}</span>
              </div>
              <br />
            </>
          );

          this.setState((prevState, props) => ({
            progressLegend: prevState.progressLegend.concat(Progress),
          }));
        });
      }
      if (colorBySelection === 'status') {
        clearStatusLegend();
        statusList.forEach((element, key) => {
          const Status = (
            <>
              <div style={{ marginTop: '-8px' }}>
                <div
                  className="circle"
                  style={{
                    border: '1px solid black',
                    background: formStatusColor[key],
                  }}
                />
                <span>{element}</span>
              </div>
              <br />
            </>
          );

          this.setState((prevState, props) => ({
            statusLegend: prevState.statusLegend.concat(Status),
          }));
        });
      }
      if (colorBySelection === 'site_type') {
        clearSiteTypeLegend();
        const UnassignedSiteType = (
          <>
            <div style={{ marginTop: '-8px' }}>
              <div
                className="circle"
                style={{
                  border: '1px solid black',
                  background: 'white',
                }}
              />
              <span>Unassigned</span>
            </div>
            <br />
          </>
        );
        const SetUnassigned = () => {
          this.setState((prevState, props) => ({
            sitetypeLegend: prevState.sitetypeLegend.concat(
              UnassignedSiteType,
            ),
          }));
        };

        siteTypes.forEach((element, key) => {
          const SiteType = (
            <>
              <div style={{ marginTop: '-8px' }}>
                <div
                  className="circle"
                  style={{
                    border: '1px solid black',
                    background: otherColors[key],
                  }}
                />
                <span>{element}</span>
              </div>
              <br />
            </>
          );

          this.setState((prevState, props) => ({
            sitetypeLegend: prevState.sitetypeLegend.concat(SiteType),
          }));
        });
        SetUnassigned();
      }
      if (colorBySelection === 'region') {
        clearRegionLegend();
        const UnassignedRegion = (
          <>
            <div style={{ marginTop: '-8px' }}>
              <div
                className="circle"
                style={{
                  border: '1px solid black',
                  background: 'white',
                }}
              />
              <span>Unassigned</span>
            </div>
            <br />
          </>
        );
        const SetUnassigned = () => {
          this.setState((prevState, props) => ({
            regionLegend: prevState.regionLegend.concat(
              UnassignedRegion,
            ),
          }));
        };

        regions.forEach((element, key) => {
          const Region = (
            <>
              <div style={{ marginTop: '-8px' }}>
                <div
                  className="circle"
                  style={{
                    border: '1px solid black',
                    background: otherColors[key],
                  }}
                />
                <span>{element}</span>
              </div>
              <br />
            </>
          );

          this.setState((prevState, props) => ({
            regionLegend: prevState.regionLegend.concat(Region),
          }));
        });
        SetUnassigned();
      }

      Object.keys(allLayers).forEach((type, data) => {
        // console.log(allLayers[type].options.attribution);
        if (colorBySelection === 'project') {
          // console.log(projectsList);
          // console.log(projectList.length);
          projectsList.forEach((element, key) => {
            if (
              allLayers[type].options.attribution.project ===
              element.name
            ) {
              allLayers[type].setStyle({
                fillColor: otherColors[key],
              });
              const Projects = (
                <div style={{ marginTop: '-8px' }}>
                  <div
                    className="circle"
                    style={{
                      border: '1px solid black',
                      background: otherColors[key],
                    }}
                  />
                  <span>{element.name}</span>
                </div>
              );
              this.setState({ projectsLegend: Projects });
            }
          });
        }
        if (colorBySelection === 'progress') {
          if (allLayers[type].options.attribution.progress === 0) {
            allLayers[type].setStyle({
              fillColor: progressColor[0],
            });
          } else if (
            allLayers[type].options.attribution.progress > 0 &&
            allLayers[type].options.attribution.progress <= 20
          ) {
            allLayers[type].setStyle({
              fillColor: progressColor[1],
            });
          } else if (
            allLayers[type].options.attribution.progress > 20 &&
            allLayers[type].options.attribution.progress <= 40
          ) {
            allLayers[type].setStyle({
              fillColor: progressColor[2],
            });
          } else if (
            allLayers[type].options.attribution.progress > 40 &&
            allLayers[type].options.attribution.progress <= 60
          ) {
            allLayers[type].setStyle({
              fillColor: progressColor[3],
            });
          } else if (
            allLayers[type].options.attribution.progress > 60 &&
            allLayers[type].options.attribution.progress <= 80
          ) {
            allLayers[type].setStyle({
              fillColor: progressColor[4],
            });
          } else if (
            allLayers[type].options.attribution.progress > 80 &&
            allLayers[type].options.attribution.progress <= 99
          ) {
            allLayers[type].setStyle({
              fillColor: progressColor[5],
            });
          }
          if (allLayers[type].options.attribution.progress === 100) {
            allLayers[type].setStyle({
              fillColor: progressColor[6],
            });
          }
        }
        if (colorBySelection === 'status') {
          if (allLayers[type].options.attribution !== undefined) {
            if (allLayers[type].options.attribution.status === 0) {
              allLayers[type].setStyle({
                fillColor: formStatusColor[0],
              });
            } else if (
              allLayers[type].options.attribution.status === 1
            ) {
              allLayers[type].setStyle({
                fillColor: formStatusColor[1],
              });
            } else if (
              allLayers[type].options.attribution.status === 2
            ) {
              allLayers[type].setStyle({
                fillColor: formStatusColor[2],
              });
            } else if (
              allLayers[type].options.attribution.status === 3
            ) {
              allLayers[type].setStyle({
                fillColor: formStatusColor[3],
              });
            } else {
              allLayers[type].setStyle({ fillColor: 'white' });
            }
          }
        }
        if (colorBySelection === 'site_type') {
          // console.log(projectsList);
          // console.log(projectList.length);
          siteTypes.forEach((element, key) => {
            // console.log(key, 'key');
            if (
              allLayers[type].options.attribution.site_type === null
            ) {
              allLayers[type].setStyle({
                fillColor: 'white',
              });
            } else if (
              allLayers[type].options.attribution.site_type ===
              element
            ) {
              allLayers[type].setStyle({
                fillColor: otherColors[key],
              });
            }
          });
        }
        if (colorBySelection === 'region') {
          // console.log(projectsList);
          // console.log(projectList.length);
          regions.forEach((element, key) => {
            // console.log(key, 'key');
            if (allLayers[type].options.attribution.region === null) {
              allLayers[type].setStyle({
                fillColor: 'white',
              });
            } else if (
              allLayers[type].options.attribution.region === element
            ) {
              allLayers[type].setStyle({
                fillColor: otherColors[key],
              });
            }
          });
        }
        // console.log(full[type].setStyle({ fillColor: 'red' }));
      });
      //   // console.log(allLayers);
      //   // if (this.props.colorBySelection === 'status') {
      //   //   allLayers._layers.forEach(element => {
      //   //     if (this.props.mapRef.current.leafletElement._layers)
      //   //       this.props.mapRef.current.leafletElement.setStyle({
      //   //         fillColor: 'red',
      //   //       });
      //   //   });
      //   // }
    }
    if (prevProps.clonePrimaryGeojson !== clonePrimaryGeojson) {
      map.fitBounds(groupRef.current.leafletElement.getBounds());

      // console.log(clonePrimaryGeojson, 'clone');
      // // console.log(this.props.markerRef.current.leafletElement);
      // // console.log(this.props.groupRef.current.leafletElement);

      // console.log(clonePrimaryGeojson[0].features);
      // mcg = L.markerClusterGroup({
      //   chunkedLoading: true,
      //   // singleMarkerMode: true,
      //   spiderfyOnMaxZoom: false,
      // });
      // clonePrimaryGeojson[0].features.forEach(element => {
      //   const marker = L.circleMarker(
      //     [
      //       element.geometry.coordinates[1],
      //       element.geometry.coordinates[0],
      //     ],
      //     {
      //       radius: 6,
      //       fillColor: '#ff7800',
      //       color: '#000',
      //       weight: 1,
      //       opacity: 1,
      //       fillOpacity: 0.8,
      //     },
      //   );
      //   marker.bindPopup(
      //     `<strong>${element.project}</strong><br/>${element.region} ${element.progress}, ${element.status}<br/>`,
      //   );
      //   marker.feature = {
      //     properties: {
      //       project: element.project,
      //       progress: element.progress,
      //       status: element.status,
      //       site_type: element.site_type,
      //       region: element.region,
      //     },
      //     // geometry: undefined,
      //   };
      //   mcg.addLayer(marker);
      //   // console.log(marker, 'markers');
      //   return marker;
      // });
      // map.addLayer(mcg);
      // console.log(this.props.mapRef.current.leafletElement);
      // console.log(mcg.getLayers());
      // console.log(mcg.getLayers(), 'get last');
      // // allLayers = this.props.mapRef.current.leafletElement._layers;
    }
  }

  render() {
    const geojsonMarkerStyle = {
      radius: 6,
      fillColor: '#ff7800',
      color: '#000',
      weight: 1,
      opacity: 1,
      fillOpacity: 0.8,
    };

    const {
      props: {
        height,
        mapRef,
        markerRef,
        groupRef,
        clonePrimaryGeojson,
        selectedBaseLayer,
        colorBySelection,
      },
      state: {
        lat,
        lng,
        projectsLegend,
        progressLegend,
        statusLegend,
        sitetypeLegend,
        regionLegend,
      },
    } = this;
    const position = [lat, lng];
    const measureOptions = {
      position: 'topright',
      primaryLengthUnit: 'meters',
      secondaryLengthUnit: 'kilometers',
      primaryAreaUnit: 'sqmeters',
      secondaryAreaUnit: 'acres',
      activeColor: '#db4a29',
      completedColor: '#9b2d14',
    };
    const formStatusColor = [
      '#0080ff',
      '#FF0000',
      '#FFFF00',
      '#069806',
    ];
    return (
      <>
        <div
          className="map-sidebar left-map-sidebar"
          style={{ left: '93rem', top: '471px', bottom: '20px' }}
        >
          <div className="sidebar-wrapper">
            <div className="sidebar-title flex-between">
              <h4>Legend</h4>
            </div>
          </div>
          <div
            style={{
              marginLeft: '15px',
            }}
            className="panel-header"
          >
            <b
              style={{
                margin: '0 auto',
                textTransform: 'capitalize',
                // color: 'red',
                fontWeight: 200,
                // border: '2px solid',
              }}
            >
              {colorBySelection}
            </b>
          </div>
          <div
            className="whole-content"
            style={{
              margin: '15px',
              overflowY: 'scroll',
              maxHeight: '246px',
            }}
          >
            <div className="panel-wrap mt-3">
              <br />
              <div className="panel-section">
                <div id="legend">
                  <div id="form_legend">
                    <div style={{ marginTop: '-8px' }}>
                      <div id="form_legend">
                        <div style={{ marginTop: '-8px' }}>
                          {colorBySelection === 'project'
                            ? projectsLegend
                            : ''}
                        </div>
                        <br />

                        <div style={{ marginTop: '-8px' }}>
                          {colorBySelection === 'progress'
                            ? progressLegend
                            : ''}
                        </div>

                        <div style={{ marginTop: '-8px' }}>
                          {colorBySelection === 'status'
                            ? statusLegend
                            : ''}
                        </div>

                        <div style={{ marginTop: '-8px' }}>
                          {colorBySelection === 'site_type'
                            ? sitetypeLegend
                            : ''}
                        </div>
                        <div style={{ marginTop: '-8px' }}>
                          {colorBySelection === 'region'
                            ? regionLegend
                            : ''}
                        </div>
                        <br />
                      </div>
                    </div>
                    <br />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Map
          ref={mapRef}
          center={position}
          zoom={8}
          maxZoom={18}
          attributionControl
          zoomControl
          doubleClickZoom
          scrollWheelZoom
          dragging
          animate
          style={{ height, zIndex: 2 }}
        >
          {/* <MeasureControl {...measureOptions} /> */}
          <PrintControl
            position="topleft"
            sizeModes={['Current', 'A4Portrait', 'A4Landscape']}
            hideControlContainer={false}
            title="Export as PNG"
            exportOnly
          />
          <LayersControl position="topright">
            <BaseLayer
              checked={selectedBaseLayer === 'openstreet'}
              // checked={`${
              //   selectedBaseLayer !== 'openstreet' ? false : true
              // }`}
              name="OpenStreetMap"
            >
              <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
            </BaseLayer>
            <BaseLayer
              checked={selectedBaseLayer === 'googlestreet'}
              // checked={`${
              //   selectedBaseLayer === 'googlestreet' ? true : false
              // }`}
              name="Google Streets"
            >
              <TileLayer
                attribution='&amp;copy <a href="http://maps.google.com">Google Maps</a> contributors'
                url="http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
                maxZoom={20}
                subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
              />
            </BaseLayer>
            <BaseLayer
              checked={selectedBaseLayer === 'googlehybrid'}
              name="Google Hybrid"
            >
              <TileLayer
                attribution='&amp;copy <a href="http://maps.google.com">Google Maps</a> contributors'
                url="http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}"
                maxZoom={20}
                subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
              />
            </BaseLayer>
            <BaseLayer
              checked={selectedBaseLayer === 'googlesatellite'}
              name="Google Satellite"
            >
              <TileLayer
                attribution='&amp;copy <a href="http://maps.google.com">Google Maps</a> contributors'
                url="http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
                maxZoom={20}
                subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
              />
            </BaseLayer>
            <BaseLayer
              checked={selectedBaseLayer === 'googleterrain'}
              name="Google Terrain"
            >
              <TileLayer
                attribution='&amp;copy <a href="http://maps.google.com">Google Maps</a> contributors'
                url="http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}"
                maxZoom={20}
                subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
              />
            </BaseLayer>
          </LayersControl>
          {/* <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        /> */}
          {/* <FeatureGroup
          ref={groupRef}
          
          }} */}
          {/* {isfiltered === true ? ( */}
          <MarkerClusterGroup
            disableClusteringAtZoom={14}
            ref={groupRef}
          >
            {clonePrimaryGeojson[0] &&
              clonePrimaryGeojson[0].features &&
              clonePrimaryGeojson[0].features.map(each => {
                const location = each.geometry.coordinates;
                const { id } = each;
                const projectName = each.properties.name;
                return (
                  <CircleMarker
                    ref={markerRef}
                    key={id}
                    center={{
                      lat: location[1],
                      lng: location[0],
                    }}
                    attribution={{
                      project: each.project,
                      progress: each.progress,
                      status: each.status,
                      site_type: each.site_type,
                      region: each.region,
                    }}
                    radius={geojsonMarkerStyle.radius}
                    fillColor={geojsonMarkerStyle.fillColor}
                    color={geojsonMarkerStyle.color}
                    weight={geojsonMarkerStyle.weight}
                    opacity={geojsonMarkerStyle.opacity}
                    fillOpacity={geojsonMarkerStyle.fillOpacity}
                  >
                    <Popup>
                      <span>
                        <label>{projectName}</label>
                      </span>
                      <br />
                    </Popup>
                  </CircleMarker>
                );
              })}
          </MarkerClusterGroup>
          {/* {/* </FeatureGroup> */}
          <MeasureControl {...measureOptions} />
        </Map>
      </>
    );
  }
}

export default MapComponent;
