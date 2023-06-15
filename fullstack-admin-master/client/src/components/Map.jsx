import React, { useState, useEffect } from 'react';
import { Typography, TextField, Slider, Button, Box, useTheme } from "@mui/material";
import { ConstructionRounded, RestartAlt, SearchOutlined } from '@mui/icons-material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocationSearchingIcon from '@mui/icons-material/LocationSearching';
import GoogleMapReact from 'google-map-react';
import { Marker } from "@react-google-maps/api";
import LocationIcon from '../assets/blue-dot.png'



const AnyReactComponent = ({ text }) => (
    <div style={{
      color: 'white', 
      background: 'grey',
      padding: '15px 10px',
      display: 'inline-flex',
      textAlign: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '100%',
      transform: 'translate(-50%, -50%)'
    }}>
      {text}
    </div>
  );


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


    const handleSearch = () => {
        let filteredMocks = props.locations.filter(x => x.name.toLowerCase().includes(searchText.toLowerCase()))
        setMocks(filteredMocks);
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
                style={{ width: "100%" }}
                onChange={(event) => setSearchText(event.target.value)}
            />

            <div>
                <Button variant="outlined" style={{ width: "50%" }}>
                    <RestartAlt />
                    Reset
                </Button>
                <Button variant="contained"
                    onClick={handleSearch}
                    style={{ width: "50%" }}>
                    <SearchOutlined />
                    Search
                </Button>
            </div>

            <Box mt="2rem">
                <div style={{ height: "80vh", width: "100%" }}>
                    <GoogleMapReact
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

                        <LocationSearchingIcon>
                            lat = {23}
                            lng = {20}
                        </LocationSearchingIcon>
                        
                        {        
                            props.locations && props.locations.shipmentChain.map((mock) => {
                                console.log(mock.coordinates[0].$numberDecimal)
                                return (
                                    <LocationOnIcon
                                        lat=  {mock.coordinates[0].$numberDecimal}//mock.coordinates[0].$numberDecimal}
                                        lng= {mock.coordinates[1].$numberDecimal}//{mock.coordinates[1].$numberDecimal}
                                        key = {mock.coordinates[0].$numberDecimal}
                                        onClick={() => setSelectedMockId(mock.id)}
                                    />
                                )
                            })
                        }                  
                    </GoogleMapReact>
                </div>
            </Box>
        </div>
    );
  };
  
  export default Map;