import React, { useState, useEffect } from 'react';
import { Typography, TextField, Slider, Button, Box, useTheme } from "@mui/material";
import { ConstructionRounded, RestartAlt, SearchOutlined } from '@mui/icons-material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocationSearchingIcon from '@mui/icons-material/LocationSearching';
import GoogleMapReact from 'google-map-react';
import { Marker } from "@react-google-maps/api";
import LocationIcon from '../assets/blue-dot.png'


function Map(props){
    console.log(props.locations);

    if(props.locations && props.locations.shipmentChain && props.locations.shipmentChain.length)
        console.log(props.locations.shipmentChain)
    const theme = useTheme();
    const [location, setLocation] = useState({
        latitude: 22.4, //props.coordinates[0].$numberDecimal,
        longitude: 22.4 //props.coordinates[1].$numberDecimal ,
    });


    let pins = [];

    // if (props.locations && props.locations.shipmentChain) {
    //     pins = props.locations.shipmentChain.map((mock) => (
    //       <LocationSearchingIcon
    //       key={mock.id}
    //       lat={parseFloat(mock.coordinates[0].$numberDecimal)}
    //       lng={parseFloat(mock.coordinates[1].$numberDecimal)}
    //       />
    //     ));
    //   }

    //   const markers = props.locations && props.locations.shipmentChain
    // ? props.locations.shipmentChain.map((mock) => (
    //     <LocationSearchingIcon
    //       key={mock.id}
    //         lat = {parseFloat(mock.coordinates[0].$numberDecimal)}
    //         lng = {parseFloat(mock.coordinates[1].$numberDecimal)}
    //     />
    //   ))
    // : null;


    const markers = props.locations && props.locations.shipmentChain
    ? props.locations.shipmentChain.map((mock) => (
        <LocationSearchingIcon
          key={mock.id}
          lat={Math.random()*22}
          lng={Math.random()*22}
        />
      ))
    : null;

    // const markers = props.locations && props.locations.shipmentChain
    // ? props.locations.shipmentChain.map((mock) => (
    //     <p key={mock.id}>
    //         {Math.random()}
    //     </p>
    //   ))
    // : null;




    console.log(markers);
    
    return (
        <div>
            
            <Box mt="2rem">
                <div style={{ height: "80vh", width: "100%" }}>
                    {/* <GoogleMapReact
                        bootstrapURLKeys={{ key: "AIzaSyAuVjIdVnypBE451-sxt-h-_R78hQSUDPI" }}
                        defaultCenter={{
                            lat: 10.99835602,
                            lng: 77.01502627
                        }}
                        defaultZoom={1}
                        center={{
                            lat: location.latitude, 
                            lng: location.longitude
                        }}
                    >           
                
                  
                    {markers}

                </GoogleMapReact> */}

                <GoogleMapReact
                        key={JSON.stringify(props.locations)}
                        bootstrapURLKeys={{ key: "AIzaSyAuVjIdVnypBE451-sxt-h-_R78hQSUDPI" }}
                        defaultCenter={{
                            lat: 10.99835602,
                            lng: 77.01502627
                        }}
                        defaultZoom={1}
                    >           
                   
                    {markers}

                </GoogleMapReact>

                {/* {markers} */}

                </div>
            </Box>
        </div>
    );
  };
  
  export default Map;