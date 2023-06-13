import React, { useState, useEffect } from 'react';
import { Typography, TextField, Slider, Button, Box, useTheme } from "@mui/material";
import { ConstructionRounded, RestartAlt, SearchOutlined } from '@mui/icons-material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocationSearchingIcon from '@mui/icons-material/LocationSearching';
import GoogleMapReact from 'google-map-react';

const Map = () => {
    const theme = useTheme();
    const [location, setLocation] = useState({
        latitude: 24.723456,
        longitude: 46.70095,
    });
    const [mocks, setMocks] = useState([]);
    const [selectedMockId, setSelectedMockId] = useState(null);
    const [searchText, setSearchText] = useState("");


    const handleSearch = () => {
        let filteredMocks = mockData.filter(x => x.name.toLowerCase().includes(searchText.toLowerCase()))
        setMocks(filteredMocks);
    }

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                console.log(position.coords);
                setLocation({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                });
            },
            (error) => {
                console.log("Error Getting Location: " + error.message);
            }
        );
    }, []);
    
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
                        bootstrapURLKeys={{ key: "AIzaSyAuVjIdVnypBE451-sxt-h-_R78hQSUDPI" }}
                        defaultCenter={{
                            lat: 10.99835602,
                            lng: 77.01502627
                        }}
                        defaultZoom={14}
                        center={{
                            lat: location.latitude, 
                            lng: location.longitude
                        }}
                    >
                        { /* NEED TO REPLACE mocks and mock */ }
                        {
                            mocks.map((mock) => {
                                return (
                                    <LocationOnIcon
                                        lat={mock.latitude}
                                        lng={mock.longitude}
                                        onClick={() => setSelectedMockId(mock.id)}
                                    />
                                )
                            })
                        }
                        <LocationSearchingIcon
                            lat={location.latitude}
                            lng={location.longitude}
                        />
                    </GoogleMapReact>
                </div>
            </Box>
        </div>
    );
  };
  
  export default Map;