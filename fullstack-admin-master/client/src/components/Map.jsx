import React, { useState, useEffect } from 'react';
import { Typography, TextField, Slider, Button, Box, useTheme } from "@mui/material";
import { ConstructionRounded, RestartAlt, SearchOutlined } from '@mui/icons-material';
import GoogleMapReact from 'google-map-react';


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
    const theme = useTheme();
    const [location, setLocation] = useState({
        latitude: props.coordinates.lat,
        longitude: props.coordinates.long ,
    });

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                // console.log("rendered");
                // console.log(position.coords);
                // console.log(props.coordinates);
                // setLocation({
                //     latitude: position.coords.latitude,
                //     longitude: position.coords.longitude,
                // }
                setLocation({
                    latitude: props.coordinates.lat,
                    longitude: props.coordinates.long,
                }
                );
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
            />
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <Typography>
                    Distance:
                </Typography>
                <Slider style={{ width: "100%" }} />
            </div>

            <div>
                <Button variant="outlined" style={{ width: "50%" }}>
                    <RestartAlt />
                    Reset
                </Button>
                <Button variant="contained" style={{ width: "50%" }}>
                    <SearchOutlined />
                    Search
                </Button>
            </div>

            <Box mt="2rem">
                <div style={{ height: "80vh", width: "100%" }}>
                    <GoogleMapReact
                        bootstrapURLKeys={{ key: "AIzaSyAuVjIdVnypBE451-sxt-h-_R78hQSUDPI"}}
                        defaultCenter={{
                            lat: 10.99835602,
                            lng: 77.01502627
                        }}
                        center={[location.latitude, location.longitude]}
                        defaultZoom={4}
                    >
                    </GoogleMapReact>
                </div>
            </Box>

        </div>
    );
  };
  
  export default Map;