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

const { BaseLayer } = LayersControl;

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
    const { clonePrimaryGeojson, colorBySelection } = this.props;
    const {
      mapRef,
      groupRef,
      projectsRegionTypes,
      projectsList,
      loaderOn,
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
      // this.loaderOn();
      const allLayers = groupRef.current.leafletElement.getLayers();
      console.log(allLayers);
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
        if (
          colorBySelection === 'site_type' ||
          colorBySelection === 'region'
        ) {
          for (let x = 0; x < extraColor.length; x += 1) {
            otherColors.push(extraColor[x]);
          }
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
              <div>
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

          this.setState(prevState => ({
            progressLegend: prevState.progressLegend.concat(Progress),
          }));
        });
      }
      if (colorBySelection === 'status') {
        clearStatusLegend();
        statusList.forEach((element, key) => {
          const Status = (
            <>
              <div>
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

          this.setState(prevState => ({
            statusLegend: prevState.statusLegend.concat(Status),
          }));
        });
      }
      if (colorBySelection === 'site_type') {
        clearSiteTypeLegend();
        const UnassignedSiteType = (
          <>
            <div>
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
          this.setState(prevState => ({
            sitetypeLegend: prevState.sitetypeLegend.concat(
              UnassignedSiteType,
            ),
          }));
        };

        siteTypes.forEach((element, key) => {
          const SiteType = (
            <>
              <div>
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

          this.setState(prevState => ({
            sitetypeLegend: prevState.sitetypeLegend.concat(SiteType),
          }));
        });
        SetUnassigned();
      }
      if (colorBySelection === 'region') {
        clearRegionLegend();
        const UnassignedRegion = (
          <>
            <div>
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
          this.setState(prevState => ({
            regionLegend: prevState.regionLegend.concat(
              UnassignedRegion,
            ),
          }));
        };

        regions.forEach((element, key) => {
          const Region = (
            <>
              <div>
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

          this.setState(prevState => ({
            regionLegend: prevState.regionLegend.concat(Region),
          }));
        });
        SetUnassigned();
      }

      Object.keys(allLayers).forEach(type => {
        // console.log(allLayers[type].options.attribution);
        if (colorBySelection === 'project') {
          // console.log(projectsList);
          // console.log(projectList.length);
          projectsList.forEach((element, key) => {
            if (
              allLayers[type].options.properties.project ===
              element.name
            ) {
              allLayers[type].setStyle({
                fillColor: otherColors[key],
              });
              const Projects = (
                <div>
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
          if (allLayers[type].options.properties.progress === 0) {
            allLayers[type].setStyle({
              fillColor: progressColor[0],
            });
          } else if (
            allLayers[type].options.properties.progress > 0 &&
            allLayers[type].options.properties.progress <= 20
          ) {
            allLayers[type].setStyle({
              fillColor: progressColor[1],
            });
          } else if (
            allLayers[type].options.properties.progress > 20 &&
            allLayers[type].options.properties.progress <= 40
          ) {
            allLayers[type].setStyle({
              fillColor: progressColor[2],
            });
          } else if (
            allLayers[type].options.properties.progress > 40 &&
            allLayers[type].options.properties.progress <= 60
          ) {
            allLayers[type].setStyle({
              fillColor: progressColor[3],
            });
          } else if (
            allLayers[type].options.properties.progress > 60 &&
            allLayers[type].options.properties.progress <= 80
          ) {
            allLayers[type].setStyle({
              fillColor: progressColor[4],
            });
          } else if (
            allLayers[type].options.properties.progress > 80 &&
            allLayers[type].options.properties.progress <= 99
          ) {
            allLayers[type].setStyle({
              fillColor: progressColor[5],
            });
          }
          if (allLayers[type].options.properties.progress === 100) {
            allLayers[type].setStyle({
              fillColor: progressColor[6],
            });
          }
        }
        if (colorBySelection === 'status') {
          if (allLayers[type].options.properties !== undefined) {
            if (allLayers[type].options.properties.status === 0) {
              allLayers[type].setStyle({
                fillColor: formStatusColor[0],
              });
            } else if (
              allLayers[type].options.properties.status === 1
            ) {
              allLayers[type].setStyle({
                fillColor: formStatusColor[1],
              });
            } else if (
              allLayers[type].options.properties.status === 2
            ) {
              allLayers[type].setStyle({
                fillColor: formStatusColor[2],
              });
            } else if (
              allLayers[type].options.properties.status === 3
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
              allLayers[type].options.properties.site_type === null
            ) {
              allLayers[type].setStyle({
                fillColor: 'white',
              });
            } else if (
              allLayers[type].options.properties.site_type === element
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
            if (allLayers[type].options.properties.region === null) {
              allLayers[type].setStyle({
                fillColor: 'white',
              });
            } else if (
              allLayers[type].options.properties.region === element
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

    return (
      <>
        <div
          className="map-sidebar left-map-sidebar"
          style={{ left: '86%', top: '471px', bottom: '20px' }}
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
              maxHeight: '251px',
              height: '182px',
            }}
          >
            <div className="panel-wrap mt-3">
              <br />
              <div className="panel-section">
                <div id="legend">
                  <div
                    id="form_legend"
                    style={{ marginTop: '-32px' }}
                  >
                    <div>
                      <div id="form_legend">
                        <div>
                          {colorBySelection === 'project'
                            ? projectsLegend
                            : ''}
                        </div>
                        <br />

                        <div style={{ marginTop: '-15px' }}>
                          {colorBySelection === 'progress'
                            ? progressLegend
                            : ''}
                        </div>

                        <div>
                          {colorBySelection === 'status'
                            ? statusLegend
                            : ''}
                        </div>

                        <div>
                          {colorBySelection === 'site_type'
                            ? sitetypeLegend
                            : ''}
                        </div>
                        <div>
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
                attribution='OpenStreetMap © Developer:<a href="http://naxa.com.np">NAXA</a>'
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
                attribution='Google Streets © Developer:<a href=" http://naxa.com.np">NAXA</a>'
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
                attribution='Google Hybrid © Developer:<a href=" http://naxa.com.np">NAXA</a>'
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
                attribution='Google Satellite © Developer:<a href=" http://naxa.com.np">NAXA</a>'
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
                attribution='Google Terrain © Developer:<a href=" http://naxa.com.np">NAXA</a>'
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
            disableClusteringAtZoom={12}
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
                    // properties={{ name: 'varun' }}
                    properties={{
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
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          label={projectName}
                          href={`/fieldsight/application/#/site-dashboard/${id}/`}
                        >
                          <label style={{ cursor: 'pointer' }}>
                            {projectName}
                          </label>
                        </a>
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
