import React from 'react';
import { Typography, TextField, Slider, Button, Box, useTheme } from "@mui/material";
import { ConstructionRounded, RestartAlt, SearchOutlined } from '@mui/icons-material';
import GoogleMapReact from 'google-map-react';

const Map = () => {
    const theme = useTheme();
    
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
                        bootstrapURLKeys={{ key: ""}}
                        defaultCenter={{
                            lat: 10.99835602,
                            lng: 77.01502627
                        }}
                        defaultZoom={14}
                    >

                    </GoogleMapReact>
                </div>
            </Box>

        </div>
    );
  };
  
  export default Map;