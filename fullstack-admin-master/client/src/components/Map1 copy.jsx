import React from 'react';
import { TextField, Button, Box } from "@mui/material";
import { RestartAlt, SearchOutlined } from '@mui/icons-material';
import LocationSearchingIcon from '@mui/icons-material/LocationSearching';
import GoogleMap from 'google-map-react';
import CustomMarker from "components/CustomMarker";

class Map extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mapsLoaded: false,
            map: null,
            maps: null,
            location: {
                latitude: 22.4,
                longitude: 22.4,
            },
            mocks: [],
            selectedMockId: null,
            searchText: "",
            polylinePath: []
        };
    }

    onMapLoaded (map, maps) {
        this.fitBounds(map, maps)
    
        this.setState({
          ...this.state,
          mapsLoaded: true,
          map: map,
          maps: maps
        })
      }
    
      fitBounds (map, maps) {
        var bounds = new maps.LatLngBounds()
        for (let marker of this.props.markers) {
          bounds.extend(
            new maps.LatLng(marker.lat, marker.lng)
          )
        }
        map.fitBounds(bounds)
      }
    
    //   afterMapLoadChanges () {
    //     return (
    //       <div style={{display: 'none'}}>
    //         <Polyline
    //           map={this.state.map}
    //           maps={this.state.maps}
    //           markers={this.props.markers} />
    //       </div>
    //     )
    //   }
    
    getPolylinePath = (shipmentArray) => {
        let pPath = [];
        shipmentArray.map((shipment, _) => pPath.push([shipment.coordinates[0].$numberDecimal, shipment.coordinates[1].$numberDecimal]));
        return pPath;
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                console.log("rendered");
                console.log(this.props);
                if (this.props.coordinates && this.props.coordinates.length) {
                    this.setState({
                        location: {
                            latitude: this.props.coordinates[0].$numberDecimal,
                            longitude: this.props.coordinates[1].$numberDecimal,
                        }
                    });
                }
            },
            (error) => {
                console.log("Error Getting Location: " + error.message);
            }
        );
    }

    setSearchText = (event) => {
        this.setState({ searchText: event.target.value });
    }

    setSelectedMockId = (id) => {
        this.setState({ selectedMockId: id });
    }


    render() {
        const greatPlaceStyle = {
            position: 'absolute',
            transform: 'translate(-50%, -50%)'
          }
        const { location, searchText, selectedMockId } = this.state;
        const { locations } = this.props;

        return (
            <div>
                <TextField label="Search for a supplier..."
                    variant="outlined"
                    style={{ width: "40%" }}
                    onChange={this.setSearchText} />

                <div>
                    <Button variant="contained" style={{ width: "20%" }}>
                        <RestartAlt />
                        Reset
                    </Button>
                    <Button variant="contained"
                        //  onClick={handleSearch}
                        style={{ width: "20%" }}>
                        <SearchOutlined />
                        Search
                    </Button>
                </div>

                <Box mt="2rem">
                    <div style={{ height: "80vh", width: "100%" }}>
                        <GoogleMap
                            key={JSON.stringify(this.props.locations)}
                            bootstrapURLKeys={{ key: "AIzaSyAuVjIdVnypBE451-sxt-h-_R78hQSUDPI" }}
                            // style={{height: '100vh', width: '100%'}}
                            // defaultCenter={this.props.center}
                            defaultZoom={1}
                            defaultCenter={{
                                lat: -2.99835602,
                                lng: -2.01502627
                            }}
                            // onGoogleApiLoaded={({map, maps}) => this.onMapLoaded(map, maps)}
                        >
                            <LocationSearchingIcon
                                lat={23}
                                lng={20}
                            />

                            {locations && locations.shipmentChain.map((mock, index) => {
                                console.log(mock.coordinates[0].$numberDecimal);
                                return (
                                    <CustomMarker
                                        style={greatPlaceStyle}
                                        lat={mock.coordinates[0].$numberDecimal}
                                        lng={mock.coordinates[1].$numberDecimal}
                                        onClick={() => this.setSelectedMockId(mock.id)}
                                        title={`${index + 1}. ${mock.name}`} // replace mock.name with the appropriate field
                                        index={index}
                                        totalMarkers={locations.shipmentChain.length}
                                    />
                                );
                            })}
                        </GoogleMap>
                    </div>
                </Box>
            </div>
        );
    }
};

export default Map;
