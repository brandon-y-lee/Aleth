import React, { useState, useEffect } from 'react';
import { Typography, TextField, Slider, Button, Box, useTheme } from "@mui/material";
import { ConstructionRounded, RestartAlt, SearchOutlined } from '@mui/icons-material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocationSearchingIcon from '@mui/icons-material/LocationSearching';
import GoogleMapReact from 'google-map-react';
import GoogleMap from 'google-map-react';
import CustomMarker from "components/CustomMarker";
import Polyline from './Polyline';



function Map(props){
    console.log(props.locations);
    const theme = useTheme();
    const [location, setLocation] = useState({
        latitude: 22.4, //props.coordinates[0].$numberDecimal,
        longitude: 22.4 //props.coordinates[1].$numberDecimal ,
    });
    const [mocks, setMocks] = useState([]);
    const [selectedMockId, setSelectedMockId] = useState(null);
    const [searchText, setSearchText] = useState("");
    { /* Need to define and assign polylinePath from props */ } 
    const [polylinePath, setPolylinePath] = useState([]);
    
    { /* Mock polylinePath data
    const polylinePath = [
    { lat: 41.879, lng: -87.624 },
    { lat: 41.878, lng: -87.629 },
    ];
    */ }

    { /* Handles search for a known list of ids
    const handleSearch = () => {
        let filteredMocks = props.locations.filter(x => x.name.toLowerCase().includes(searchText.toLowerCase()))
        setMocks(filteredMocks);
    }
    */ }

    function getPolylinePath(shipmentArray){
        let pPath = []
        shipmentArray.map((shipment,_) => pPath.push([shipment.coordinates[0].$numberDecimal,shipment.coordinates[1].$numberDecimal]))
        return pPath;
    }

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                console.log("rendered");
                console.log(props);
                if(props.coordinates && props.coordinates.length)
                {
                setLocation({
                    latitude: props.coordinates[0].$numberDecimal,
                    longitude: props.coordinates[1].$numberDecimal,
                }
                )
            };
            },
            (error) => {
                console.log("Error Getting Location: " + error.message);
            }
        );
    }, [props]);
    
    return (
        <div>
            <TextField label="Search for a supplier..."
                variant="outlined"
                style={{ width: "40%" }}
                onChange={(event) => setSearchText(event.target.value)}
            />

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
                        key={JSON.stringify(props.locations)}
                        bootstrapURLKeys={{ key: "AIzaSyAuVjIdVnypBE451-sxt-h-_R78hQSUDPI" }}
                        defaultCenter={{
                            lat: -2.99835602,
                            lng: -2.01502627
                        }}
                        defaultZoom={2}
                        // center={{
                        //     lat: location.latitude, 
                        //     lng: location.longitude
                        // }}
                    >

                        <LocationSearchingIcon 
                            lat = {23}
                            lng = {20}
                        />
                        
                        {/* {        
                            props.locations && props.locations.shipmentChain.map((mock) => {
                                console.log(mock.coordinates[0].$numberDecimal)
                                return (
                                    <LocationOnIcon
                                        lat=  {mock.coordinates[0].$numberDecimal}//mock.coordinates[0].$numberDecimal}
                                        lng= {mock.coordinates[1].$numberDecimal}//{mock.coordinates[1].$numberDecimal}
                                        key = {mock.coordinates[0].$numberDecimal}
                                    />)
                                    
                                })
                        } */}

                        {        
                            props.locations && props.locations.shipmentChain.map((mock,index) => {
                                console.log(mock.coordinates[0].$numberDecimal)
                                return (
                                    <CustomMarker
                                        lat={mock.coordinates[0].$numberDecimal}
                                        lng={mock.coordinates[1].$numberDecimal}
                                        onClick={() => setSelectedMockId(mock.id)}
                                        title={`${index + 1}. ${mock.name}`} // replace mock.name with the appropriate field
                                        index={index}
                                        totalMarkers={props.locations.shipmentChain.length}
                                    />
                                    )
                                    
                                })
                        }


                        {/* {
                            
                            props.locations && 
                            <Polyline path={getPolylinePath(props.locations.shipmentChain)} />
                        
                        } */}
                    
                    </GoogleMap>
                </div>
            </Box>
        </div>
    );
  };
  
  export default Map;